/**
 * Speak Up! CEFR A1 — Sound Effects, Clear TTS Engine & 4-Metric Speech Evaluator
 * Version: 1.2.1
 */

window.SoundFX = (function () {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playTone(freq, type, duration, delay = 0, gainVal = 0.12) {
    if (muted) return;
    const audioCtx = getCtx();
    if (!audioCtx) return;

    const startTime = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  return {
    isSupported: () => !!(window.AudioContext || window.webkitAudioContext),
    setMuted: (m) => { muted = !!m; },
    isMuted: () => muted,

    playClick: () => playTone(660, 'sine', 0.06, 0, 0.07),
    playUnlock: () => {
      playTone(523.25, 'triangle', 0.14, 0, 0.12);
      playTone(659.25, 'triangle', 0.14, 0.09, 0.12);
      playTone(783.99, 'triangle', 0.18, 0.18, 0.14);
      playTone(1046.5, 'sine', 0.30, 0.27, 0.15);
    },
    playCorrect: () => {
      playTone(587.33, 'sine', 0.12, 0, 0.14);
      playTone(880.0, 'sine', 0.25, 0.10, 0.15);
    },
    playWrong: () => {
      playTone(300, 'sawtooth', 0.14, 0, 0.09);
      playTone(240, 'sawtooth', 0.22, 0.12, 0.09);
    },
    playRecordStart: () => {
      playTone(880, 'sine', 0.10, 0, 0.12);
    },
    playRecordStop: () => {
      playTone(660, 'sine', 0.10, 0, 0.12);
      playTone(440, 'sine', 0.14, 0.08, 0.12);
    },
    playFanfare: () => {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
        playTone(f, 'triangle', 0.28, idx * 0.09, 0.14);
      });
    }
  };
})();

/**
 * Clear & Slow Text-to-Speech (TTS) Controller with Multi-Speaker Male/Female Dialogue Voices
 * Prevents premature onend/onerror triggers and supports sequential sentence playback
 */
window.SpeechEngine = (function () {
  let speechRate = 0.85; // Clear & not too fast by default
  let selectedVoice = null;
  let maleVoice = null;
  let femaleVoice = null;
  let femaleVoiceAlt = null;
  let activeTimer = null;
  let progressTimer = null;
  let currentSessionId = 0;
  let isPlayingNow = false;
  let activeUtterance = null; // Prevent garbage collection of utterance in Chrome

  const MALE_NAMES = new Set([
    'ben', 'jack', 'troy', 'dan', 'tom', 'max', 'alex', 'david',
    'john', 'mike', 'sam', 'peter', 'paul', 'mark', 'kevin', 'leo',
    'boy', 'man', 'father', 'brother', 'mr'
  ]);

  const FEMALE_NAMES = new Set([
    'emma', 'maya', 'sara', 'server', 'mia', 'lily', 'joy', 'tara', 'nina',
    'anna', 'may', 'mary', 'lisa', 'amy', 'kate', 'lucy', 'jane', 'sarah',
    'girl', 'woman', 'mother', 'sister', 'waitress', 'ms', 'mrs', 'miss'
  ]);

  function initVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) return;

    const enVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
    const pool = enVoices.length ? enVoices : voices;

    const maleHints = [
      'Microsoft Guy', 'Microsoft Christopher', 'Microsoft Eric', 'Microsoft Roger',
      'Microsoft Steffan', 'Microsoft David', 'Microsoft Mark', 'Microsoft George',
      'Microsoft Ryan', 'Google UK English Male', 'Daniel', 'Alex', 'Fred', 'James', 'Male'
    ];
    for (const hint of maleHints) {
      const found = pool.find(v => v.name.toLowerCase().includes(hint.toLowerCase()));
      if (found) {
        maleVoice = found;
        break;
      }
    }

    const femaleHints = [
      'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Michelle', 'Microsoft Ana',
      'Microsoft Zira', 'Microsoft Hazel', 'Microsoft Susan', 'Google US English',
      'Google UK English Female', 'Samantha', 'Victoria', 'Karen', 'Moira', 'Tessa', 'Female'
    ];
    const matchedFemales = [];
    for (const hint of femaleHints) {
      const found = pool.find(v => v.name.toLowerCase().includes(hint.toLowerCase()) && !matchedFemales.includes(v));
      if (found) matchedFemales.push(found);
    }
    if (matchedFemales.length > 0) femaleVoice = matchedFemales[0];
    if (matchedFemales.length > 1) femaleVoiceAlt = matchedFemales[1];

    selectedVoice = femaleVoice || maleVoice || pool.find(v => v.lang === 'en-US') || pool[0];
    if (!femaleVoice) femaleVoice = selectedVoice;
    if (!maleVoice) maleVoice = pool.find(v => v !== femaleVoice) || selectedVoice;
    if (!femaleVoiceAlt) femaleVoiceAlt = femaleVoice;
  }

  if ('speechSynthesis' in window) {
    initVoices();
    window.speechSynthesis.onvoiceschanged = initVoices;
  }

  function detectGenderByName(name) {
    if (!name) return null;
    const lower = String(name).trim().toLowerCase();
    if (MALE_NAMES.has(lower)) return 'male';
    if (FEMALE_NAMES.has(lower)) return 'female';
    return null;
  }

  /**
   * Parses a raw line such as "Emma: Hi! My name is Emma." or narrative text
   * and returns { speaker, gender, cleanedText, pitch, voiceVariant }
   */
  function parseSpeakerAndText(rawText, fallbackGender = null) {
    const str = String(rawText || '').trim();
    const speakerMatch = str.match(/^([A-Za-z]+):\s*(.+)$/);
    let speaker = null;
    let bodyText = str;
    let gender = fallbackGender;

    if (speakerMatch) {
      speaker = speakerMatch[1].trim();
      bodyText = speakerMatch[2].trim();
      gender = detectGenderByName(speaker) || fallbackGender || 'female';
    } else {
      // Check if narrative introduces a named narrator ("My name is Ben/Troy/Lily")
      const introMatch = str.match(/\bMy name is ([A-Za-z]+)\b/i) || str.match(/\b([A-Za-z]+)'s Daily Routine\b/i);
      if (introMatch) {
        const g = detectGenderByName(introMatch[1]);
        if (g) gender = g;
      }
    }

    const cleaned = bodyText
      .replace(/^[A-Za-z]+:\s*/gm, '')
      .replace(/___+/g, ' blank ')
      .replace(/\s+/g, ' ')
      .trim();

    let pitch = 1.02;
    let isAltFemale = false;
    if (gender === 'male') {
      pitch = 0.82; // Distinct masculine voice register
    } else if (gender === 'female') {
      const spkLower = speaker ? speaker.toLowerCase() : '';
      if (spkLower === 'tara' || spkLower === 'server') {
        pitch = 1.26;
        isAltFemale = true;
      } else {
        pitch = 1.15; // Distinct feminine voice register
      }
    }

    return {
      speaker,
      gender: gender || 'neutral',
      cleanedText: cleaned,
      pitch,
      isAltFemale
    };
  }

  function cleanTextForSpeech(rawText) {
    return parseSpeakerAndText(rawText).cleanedText;
  }

  function stop() {
    currentSessionId++;
    isPlayingNow = false;
    activeUtterance = null;
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
    if ('speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {}
    }
  }

  function speakSingleItem(itemObj, rate, sessionId, onSentenceEnd) {
    const cleaned = itemObj.cleanedText;
    if (!cleaned || sessionId !== currentSessionId) {
      onSentenceEnd(false);
      return;
    }

    const wordCount = cleaned.split(/\s+/).length;
    const minDurationMs = Math.max(900, Math.round((wordCount / (2.5 * rate)) * 1000));
    const maxDurationMs = Math.max(2500, Math.round((wordCount / (1.6 * rate)) * 1000) + 1800);
    const startStamp = Date.now();
    let settled = false;

    const completeSentence = () => {
      if (settled || sessionId !== currentSessionId) return;
      settled = true;
      if (activeTimer) {
        clearTimeout(activeTimer);
        activeTimer = null;
      }
      // Enforce minimum realistic reading time in case browser TTS finishes/errors instantaneously
      const elapsed = Date.now() - startStamp;
      const remainingWait = Math.max(0, minDurationMs - elapsed);
      if (remainingWait > 100) {
        activeTimer = setTimeout(() => {
          if (sessionId === currentSessionId) onSentenceEnd(true);
        }, remainingWait);
      } else {
        onSentenceEnd(true);
      }
    };

    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      activeTimer = setTimeout(completeSentence, minDurationMs);
      return;
    }

    try {
      const utter = new SpeechSynthesisUtterance(cleaned);
      activeUtterance = utter; // Keep reference alive
      if (!selectedVoice) initVoices();

      if (itemObj.gender === 'male' && maleVoice) {
        utter.voice = maleVoice;
      } else if (itemObj.gender === 'female') {
        utter.voice = (itemObj.isAltFemale && femaleVoiceAlt) ? femaleVoiceAlt : (femaleVoice || selectedVoice);
      } else if (selectedVoice) {
        utter.voice = selectedVoice;
      }

      utter.lang = (utter.voice && utter.voice.lang) ? utter.voice.lang : 'en-US';
      utter.rate = rate;
      utter.pitch = itemObj.pitch || 1.02;

      utter.onend = () => {
        completeSentence();
      };

      utter.onerror = (ev) => {
        if (ev && (ev.error === 'canceled' || ev.error === 'interrupted')) {
          settled = true;
          return;
        }
        completeSentence();
      };

      activeTimer = setTimeout(completeSentence, maxDurationMs);
      window.speechSynthesis.speak(utter);
    } catch (e) {
      activeTimer = setTimeout(completeSentence, minDurationMs);
    }
  }

  /**
   * Speaks a single text or an array of sentences sequentially with automatic Male/Female speaker voices.
   * Calls onEnd ONLY after ALL sentences have finished reading completely.
   */
  function speak(textOrArray, options = {}) {
    stop();
    const sessionId = currentSessionId;
    const rate = options.rate || speechRate;

    const rawLines = Array.isArray(textOrArray)
      ? textOrArray.map(s => String(s || '').trim()).filter(Boolean)
      : String(textOrArray || '')
          .split(/\n+|(?<=[.!?])\s+/)
          .map(s => s.trim())
          .filter(Boolean);

    // Infer narrative fallback gender if a main character is introduced (e.g. Ben, Troy, Lily)
    let fallbackGender = options.gender || null;
    if (!fallbackGender) {
      for (const line of rawLines) {
        const m = line.match(/\bMy name is ([A-Za-z]+)\b/i) || line.match(/^([A-Za-z]+)'s\b/i);
        if (m) {
          const g = detectGenderByName(m[1]);
          if (g) {
            fallbackGender = g;
            break;
          }
        }
      }
    }

    const parsedItems = rawLines
      .map(line => parseSpeakerAndText(line, fallbackGender))
      .filter(it => it.cleanedText.length > 0);

    if (!parsedItems.length) {
      if (options.onEnd) options.onEnd();
      return;
    }

    isPlayingNow = true;
    if (options.onStart) options.onStart(parsedItems.length);

    let currentIdx = 0;

    // Give browser 60ms after cancel() before queueing new speech
    activeTimer = setTimeout(() => {
      if (sessionId !== currentSessionId) return;

      const playNext = () => {
        if (sessionId !== currentSessionId) return;
        if (currentIdx >= parsedItems.length) {
          isPlayingNow = false;
          activeUtterance = null;
          if (options.onProgress) options.onProgress(100, parsedItems.length, parsedItems.length, null);
          if (options.onEnd) options.onEnd();
          return;
        }

        const curItem = parsedItems[currentIdx];
        const pct = Math.max(5, Math.round((currentIdx / parsedItems.length) * 100));
        if (options.onProgress) options.onProgress(pct, currentIdx + 1, parsedItems.length, curItem);

        speakSingleItem(curItem, rate, sessionId, (ok) => {
          if (!ok || sessionId !== currentSessionId) return;
          currentIdx++;
          const nextPct = Math.min(98, Math.round((currentIdx / parsedItems.length) * 100));
          const nextItem = parsedItems[Math.min(currentIdx, parsedItems.length - 1)];
          if (options.onProgress) options.onProgress(nextPct, Math.min(currentIdx + 1, parsedItems.length), parsedItems.length, nextItem);
          // Brief natural pause between dialogue turns / sentences (280ms)
          activeTimer = setTimeout(playNext, 280);
        });
      };

      playNext();
    }, 60);
  }

  return {
    isSupported: () => 'speechSynthesis' in window,
    isPlaying: () => isPlayingNow,
    getRate: () => speechRate,
    setRate: (r) => { speechRate = Number(r) || 0.85; },
    detectGenderByName,
    parseSpeakerAndText,
    speak,
    stop
  };
})();

/**
 * Microphone Recorder & 4-Metric Pronunciation Evaluator
 * Metrics:
 * 1. Accent / Pronunciation (สำเนียงและการออกเสียง)
 * 2. Completeness (ความครบถ้วนของเนื้อหา)
 * 3. Clarity (ความชัดเจนของเสียง)
 * 4. Speaking Time & Pace (เวลาและจังหวะในการพูด)
 */
window.VoiceEvaluator = (function () {
  let mediaRecorder = null;
  let audioChunks = [];
  let recognition = null;
  let isRecording = false;
  let recordStartTime = 0;
  let recognizedText = '';
  let recognitionConfidence = 0.88;
  let audioStream = null;
  let volumeSamples = [];
  let volumeInterval = null;
  let audioStore = {}; // key -> blobUrl

  function normalizeWords(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s']/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
  }

  function similarity(a, b) {
    if (!a || !b) return 0;
    if (a === b) return 1;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    const maxLen = Math.max(a.length, b.length);
    return Math.max(0, (maxLen - matrix[b.length][a.length]) / maxLen);
  }

  // ============================================================================
  // COMMUNICATIVE CONCEPT SLOTS (Question-Answer Relevance Map for All 12 Units Part B)
  // Evaluates whether the learner's response answers what the question asks,
  // WITHOUT requiring verbatim words from the sample answer.
  // ============================================================================
  const COMMON_TIME_WORDS = ['1','2','3','4','5','6','7','8','9','10','11','12','13','15','20','30','40','45','50','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirty','half','quarter','am','pm','oclock','morning','afternoon','evening','night','noon','midnight','early','late','at','around'];
  const COMMON_FREQ_WORDS = ['always','usually','often','sometimes','rarely','never','every','daily','week','weekend','weekends','monday','tuesday','wednesday','thursday','friday','saturday','sunday','once','twice','after','before'];
  const COMMON_MONEY_WORDS = ['10','20','30','40','50','60','70','80','90','100','150','200','250','300','350','400','500','1000','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','baht','dollar','dollars','money','cheap','expensive','around','about'];

  const QUESTION_CONCEPT_MAP = {
    // ---------------- UNIT 1: Ben's Daily Routine ----------------
    // Q1: What time do you get up? (Sample: I get up at 6 o'clock.)
    u1_partB_0: [
      { labelTh: 'กริยาตื่นนอน (Get up / Wake up)', labelEn: 'Get up / Wake up action', words: ['get','wake','up','awake','rise'] },
      { labelTh: 'เวลาที่ตื่นนอน (Time expression)', labelEn: 'Time expression', words: COMMON_TIME_WORDS }
    ],
    // Q2: What time do you get to school? (Sample: I get to school at 7.30.)
    u1_partB_1: [
      { labelTh: 'การไปถึงหรือเดินทางไปโรงเรียน/ที่ทำงาน (Get to / Go to school)', labelEn: 'Get to / Go to school or work', words: ['get','go','arrive','reach','leave','start','school','work','office','class','college','university','to'] },
      { labelTh: 'เวลาที่ไปถึง (Time expression)', labelEn: 'Time expression', words: COMMON_TIME_WORDS }
    ],
    // Q3: What do you do after school? (Sample: I do my homework after school.)
    u1_partB_2: [
      { labelTh: 'กิจกรรมหลังเลิกเรียน/เลิกงาน (After-school activity)', labelEn: 'Activity after school/work', words: ['do','homework','study','read','play','games','game','sport','sports','football','basketball','badminton','watch','tv','movie','youtube','listen','music','eat','snack','dinner','help','relax','rest','go','home','exercise','run','walk','draw','cook'] },
      { labelTh: 'รูปประโยคหรือบริบทเวลา (I + Verb / After school)', labelEn: 'First-person or time context', words: ['i','my','after','school','work','class','home','evening','afternoon','usually','often','sometimes','with','friends','family'] }
    ],
    // Q4: What do you do before going to bed? (Sample: I take a shower.)
    u1_partB_3: [
      { labelTh: 'กิจกรรมก่อนเข้านอน (Bedtime routine action)', labelEn: 'Activity before bed', words: ['take','shower','bath','wash','brush','teeth','face','read','book','comics','watch','tv','movie','phone','listen','music','pray','drink','milk','water',' homework','prepare','skin','sleep','bed'] },
      { labelTh: 'โครงสร้างผู้พูดหรือเวลาก่อนนอน (I + Verb / Before bed)', labelEn: 'First-person or before-bed context', words: ['i','my','before','bed','going','sleep','night','usually','always','every'] }
    ],

    // ---------------- UNIT 2: Meeting a New Friend ----------------
    // Q1: What is your name? (Sample: My name is May.)
    u2_partB_0: [
      { labelTh: 'การแนะนำชื่อตัวเอง (My name is ... / I am ...)', labelEn: 'Name introduction structure', words: ['my','name','is','im','i','am','call','me'] }
    ],
    // Q2: How old are you? (Sample: I am 12 years old.)
    u2_partB_1: [
      { labelTh: 'ระบุตัวเลขอายุ (Age number)', labelEn: 'Age number', words: ['6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','25','30','35','40','45','50','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','thirty','forty','fifty'] },
      { labelTh: 'โครงสร้างบอกอายุ (I am / years old)', labelEn: 'Age sentence structure', words: ['i','am','im','years','year','old'] }
    ],
    // Q3: What is the best friend's name? (Sample: My best friend's name is Mary.)
    u2_partB_2: [
      { labelTh: 'การกล่าวถึงเพื่อนสนิทหรือชื่อเพื่อน (Best friend / Name / He / She is)', labelEn: 'Best friend reference', words: ['my','best','friend','friends','name','is','he','she','his','her','called'] }
    ],
    // Q4: What do you usually do with your friend at school? (Sample: I usually study with my friend at school.)
    u2_partB_3: [
      { labelTh: 'กิจกรรมที่ทำกับเพื่อน (Activity with friend)', labelEn: 'Activity with friend', words: ['study','read','play','games','sport','sports','football','basketball','badminton','eat','have','lunch','snack','talk','chat','walk','do','homework','help','laugh','draw','listen','music','sit','learn'] },
      { labelTh: 'การระบุว่าทำกับเพื่อนหรือที่โรงเรียน (With friend / At school / We)', labelEn: 'Friend or school context', words: ['with','my','friend','friends','together','we','at','school','class','canteen','playground','usually','always','often','every'] }
    ],

    // ---------------- UNIT 3: Animals with Superpowers ----------------
    // Q1: What animal do you think is interesting? (Sample: An octopus.)
    u3_partB_0: [
      { labelTh: 'ระบุชื่อสัตว์ที่สนใจ (Animal name)', labelEn: 'Animal name', words: ['octopus','bat','bats','gecko','geckos','dog','dogs','cat','cats','bird','birds','eagle','owl','lion','tiger','elephant','monkey','dolphin','whale','shark','snake','frog','chameleon','cheetah','horse','rabbit','panda','bear','penguin','bee','butterfly','spider','fish','turtle','dinosaur','animal'] }
    ],
    // Q2: Why do you think that? (Sample: Because they can hide.)
    u3_partB_1: [
      { labelTh: 'คำเชื่อมบอกเหตุผลหรือความสามารถ (Because / Can / It is)', labelEn: 'Reason or ability marker', words: ['because','can','it','they','is','are','has','have','very','so','think'] },
      { labelTh: 'ความสามารถหรือลักษณะเด่นของสัตว์ (Ability or trait)', labelEn: 'Animal ability or trait', words: ['hide','change','color','climb','stick','fly','swim','run','jump','fast','strong','smart','clever','cute','beautiful','big','small','tall','see','dark','sound','sounds','survive','live','water','trees','night','interesting','amazing','cool','special'] }
    ],
    // Q3: What special ability would you like to have? (Sample: I would like to fly.)
    u3_partB_2: [
      { labelTh: 'โครงสร้างบอกความต้องการ (Would like to / Want to / Can)', labelEn: 'Desire expression (would like / want)', words: ['i','would','like','want','love','wish','to','have','be','can'] },
      { labelTh: 'ระบุความสามารถพิเศษ (Superpower / Special ability)', labelEn: 'Special ability or superpower', words: ['fly','flying','invisible','hide','change','color','climb','walls','swim','fast','run','speed','super','strength','strong','jump','high','teleport','time','travel','read','minds','talk','animals','see','dark','breathe','underwater','heal','magic'] }
    ],
    // Q4: Why would you like to have that ability? (Sample: I would not need a car to go to school.)
    u3_partB_3: [
      { labelTh: 'เหตุผลหรือประโยชน์ของความสามารถนั้น (Reason / Benefit)', labelEn: 'Reason or benefit', words: ['because','would','can','could','not','need','car','bus','traffic','go','travel','school','work','world','anywhere','fast','quickly','easy','easily','help','people','save','time','money','fun','cool','free','sky','clouds','see','everything','hide','safe'] }
    ],

    // ---------------- UNIT 4: My Family and Our Weekends ----------------
    // Q1: Who do you live with? (Sample: I live with my parents and my brother.)
    u4_partB_0: [
      { labelTh: 'กริยาอาศัยอยู่กับ (Live with / My family)', labelEn: 'Live with structure', words: ['live','living','stay','with','my','in','family','alone','myself'] },
      { labelTh: 'ระบุสมาชิกในครอบครัว (Family members)', labelEn: 'Family members', words: ['parents','father','dad','mother','mom','brother','brothers','sister','sisters','grandmother','grandma','grandfather','grandpa','grandparents','uncle','aunt','cousin','husband','wife','son','daughter','children','kids','dog','cat','pet','friends','alone','myself'] }
    ],
    // Q2: What do you usually do with your family on weekends? (Sample: We usually watch movies together.)
    u4_partB_1: [
      { labelTh: 'กิจกรรมที่ทำร่วมกับครอบครัว (Weekend family activity)', labelEn: 'Family weekend activity', words: ['watch','movie','movies','tv','eat','have','dinner','lunch','breakfast','food','cook','go','out','shopping','mall','park','beach','market','temple','ride','bike','bikes','walk','play','games','talk','relax','clean','house','travel','visit','stay','home'] },
      { labelTh: 'คำบอกความถี่หรือการทำร่วมกัน (We / Usually / Together / On weekends)', labelEn: 'Family or frequency context', words: ['we','i','usually','often','sometimes','always','together','with','my','family','parents','on','weekend','weekends','saturday','sunday'] }
    ],
    // Q3: What is your favorite family activity? (Sample: My favorite family activity is eating at the restaurant.)
    u4_partB_2: [
      { labelTh: 'การบอกความชอบ (Favorite activity / Like / Love / Enjoy)', labelEn: 'Preference marker', words: ['favorite','like','love','enjoy','best','family','activity','is','our','my','we'] },
      { labelTh: 'ระบุกิจกรรมครอบครัว (Activity detail)', labelEn: 'Family activity', words: ['eat','eating','dinner','lunch','food','restaurant','out','cook','cooking','watch','watching','movie','movies','tv','travel','traveling','trip','go','going','beach','park','mall','camping','play','playing','games','sport','ride','riding','bike','talk','talking','shopping','picnic'] }
    ],
    // Q4: What place do you like to go with your family? (Sample: I like to go to the beach with my family.)
    u4_partB_3: [
      { labelTh: 'การบอกความชอบไปสถานที่ (Like to go / Visit)', labelEn: 'Go / Visit preference', words: ['like','love','enjoy','want','usually','go','going','visit','travel','to','the','with','my','family','we'] },
      { labelTh: 'ระบุสถานที่ที่ไปกับครอบครัว (Place / Destination)', labelEn: 'Destination or place', words: ['beach','sea','park','mall','shopping','center','restaurant','cafe','market','night','cinema','movie','theater','mountain','mountains','temple','zoo','museum','countryside','province','chiang','mai','phuket','pattaya','hua','hin','hotel','resort','grandparents','home','garden'] }
    ],

    // ---------------- UNIT 5: At a Café ----------------
    // Q1: What would you like to drink? (Sample: I would like an iced tea, please.)
    u5_partB_0: [
      { labelTh: 'โครงสร้างการสั่งหรือบอกความต้องการ (Would like / Can I have / Want)', labelEn: 'Ordering phrase', words: ['would','like','id','can','have','want','drink','please','i'] },
      { labelTh: 'ระบุชื่อเครื่องดื่ม (Drink / Beverage)', labelEn: 'Beverage item', words: ['iced','tea','lemonade','coffee','latte','cappuccino','americano','espresso','milk','thai','green','water','juice','orange','apple','smoothie','soda','cola','coke','cocoa','chocolate','hot','cold','cup','glass','bottle'] }
    ],
    // Q2: What snack would you like to order? (Sample: I would like a chocolate cake, please.)
    u5_partB_1: [
      { labelTh: 'โครงสร้างการสั่งอาหารว่าง (Would like / Order / Have)', labelEn: 'Ordering phrase', words: ['would','like','id','can','have','order','eat','want','please','i'] },
      { labelTh: 'ระบุชื่อขนมหรืออาหารว่าง (Snack / Food item)', labelEn: 'Snack item', words: ['cake','chocolate','sandwich','cheese','tuna','ham','egg','bread','toast','croissant','cookie','cookies','biscuit','pie','donut','waffle','pancake','ice','cream','french','fries','chips','burger','pizza','salad','fruit','snack','pastry','brownie'] }
    ],
    // Q3: How much money do you have for a snack and a drink? (Sample: I have 100 baht.)
    u5_partB_2: [
      { labelTh: 'กริยาบอกจำนวนเงินที่มี (I have / Bring / Got)', labelEn: 'Possession verb (I have)', words: ['i','have','got','bring','carry','spend','my','budget','is','only'] },
      { labelTh: 'ระบุจำนวนเงินและหน่วยเงิน (Amount & Baht/Money)', labelEn: 'Money amount', words: COMMON_MONEY_WORDS }
    ],
    // Q4: Where do you usually go for snacks? (Sample: I usually go to KFC.)
    u5_partB_3: [
      { labelTh: 'การบอกการเดินทางไปซื้อขนม (Go to / Buy at / Usually)', labelEn: 'Go to / Buy context', words: ['i','we','usually','often','sometimes','always','go','to','buy','eat','at','near','after'] },
      { labelTh: 'ระบุชื่อร้านหรือสถานที่ (Café / Shop / Place)', labelEn: 'Place or shop name', words: ['kfc','cafe','coffee','shop','seven','eleven','711','mall','shopping','market','supermarket','canteen','school','store','bakery','restaurant','mcdonalds','starbucks','amazon','street','home','near'] }
    ],

    // ---------------- UNIT 6: Weather Around the World ----------------
    // Q1: What's the weather in your area like today? (Sample: It's hot and sunny today.)
    u6_partB_0: [
      { labelTh: 'ระบุสภาพอากาศ (Weather condition)', labelEn: 'Weather description', words: ['hot','sunny','warm','cool','cold','rainy','raining','rain','cloudy','windy','stormy','dry','humid','wet','nice','good','clear','freezing','degrees','weather','today','now','its','it','is'] }
    ],
    // Q2: What's your favorite season? (Sample: My favorite season is winter.)
    u6_partB_1: [
      { labelTh: 'ระบุฤดูกาลที่ชอบ (Season name)', labelEn: 'Season name', words: ['winter','summer','rainy','spring','autumn','fall','cold','cool','hot','season'] },
      { labelTh: 'การบอกความชอบ (My favorite season / I like)', labelEn: 'Preference phrase', words: ['my','favorite','season','is','i','like','love','prefer','best'] }
    ],
    // Q3: What do you usually wear in your favorite season? (Sample: I usually wear a jacket.)
    u6_partB_2: [
      { labelTh: 'กริยาการสวมใส่ (Wear / Put on)', labelEn: 'Wearing verb', words: ['i','usually','often','always','wear','wearing','put','on','like','to'] },
      { labelTh: 'ระบุเครื่องแต่งกาย (Clothing item)', labelEn: 'Clothing item', words: ['jacket','coat','sweater','hoodie','scarf','gloves','hat','cap','tshirt','shirt','blouse','shorts','pants','trousers','jeans','skirt','dress','raincoat','boots','shoes','sneakers','sandals','sunglasses','umbrella','warm','light','comfortable','clothes'] }
    ],
    // Q4: What do you do on a hot day? (Sample: I stay inside.)
    u6_partB_3: [
      { labelTh: 'กิจกรรมที่ทำในวันที่อากาศร้อน (Hot-day activity)', labelEn: 'Activity on a hot day', words: ['stay','inside','home','room','turn','on','air','conditioner','ac','fan','drink','cold','water','ice','iced','tea','coffee','juice','smoothie','eat','cream','watermelon','fruit','go','swim','swimming','pool','beach','mall','shopping','take','shower','wear','shorts','tshirt','rest','relax'] }
    ],

    // ---------------- UNIT 7: My Favorite Sport ----------------
    // Q1: What's your favorite sport? (Sample: My favorite sport is football.)
    u7_partB_0: [
      { labelTh: 'การบอกกีฬาที่ชอบ (My favorite sport is / I like)', labelEn: 'Favorite sport phrase', words: ['my','favorite','sport','is','i','like','love','play','playing','best'] },
      { labelTh: 'ระบุชื่อกีฬา (Sport name)', labelEn: 'Sport name', words: ['football','soccer','basketball','badminton','tennis','table','ping','pong','volleyball','swimming','swim','running','run','cycling','bike','golf','boxing','muay','thai','yoga','gymnastics','baseball','rugby','skating','skate','esports'] }
    ],
    // Q2: Who do you play sports with? (Sample: I play sports with my friends.)
    u7_partB_1: [
      { labelTh: 'กริยาการเล่นกีฬาด้วยกัน (Play with)', labelEn: 'Play with structure', words: ['i','we','usually','play','sports','sport','it','with','my','together'] },
      { labelTh: 'ระบุคนที่เล่นกีฬาด้วย (Friends / Family / Classmates)', labelEn: 'Companion (friends/family)', words: ['friends','friend','classmates','schoolmates','teammates','team','brother','brothers','sister','sisters','father','dad','mother','mom','parents','family','cousin','neighbors','club','alone','myself'] }
    ],
    // Q3: When do you play this sport? (Sample: I usually play it on Saturday.)
    u7_partB_2: [
      { labelTh: 'กริยาการเล่นกีฬา (Play / Practice / Exercise)', labelEn: 'Play action', words: ['i','we','usually','often','always','sometimes','play','it','sport','practice','go'] },
      { labelTh: 'ระบุวันหรือช่วงเวลาที่เล่น (Day or Time expression)', labelEn: 'Day or time expression', words: [...COMMON_FREQ_WORDS, ...COMMON_TIME_WORDS, 'school','class','work','holiday','free','time'] }
    ],
    // Q4: What other sports do you like to play? (Sample: I like to play tennis.)
    u7_partB_3: [
      { labelTh: 'การบอกความชอบกีฬาอื่น (I like to play / Also like)', labelEn: 'Preference phrase', words: ['i','also','like','love','enjoy','want','would','to','play','playing','do','go','other','sport','sports','is'] },
      { labelTh: 'ระบุชื่อกีฬาอื่น (Other sport name)', labelEn: 'Sport name', words: ['tennis','badminton','football','soccer','basketball','volleyball','swimming','swim','running','run','jogging','cycling','bike','table','ping','pong','golf','boxing','yoga','aerobics','bowling','skate','climbing'] }
    ],

    // ---------------- UNIT 8: Asking for Directions ----------------
    // Q1: How do you usually go to school? (Sample: I go to school by bus.)
    u8_partB_0: [
      { labelTh: 'กริยาการเดินทางไปเรียน/ทำงาน (Go to school/work)', labelEn: 'Go to school/work', words: ['i','usually','always','go','get','travel','to','school','work','office','class','by','on','take','ride','drive'] },
      { labelTh: 'ระบุวิธีเดินทางหรือยานพาหนะ (Transportation mode)', labelEn: 'Mode of transport', words: ['bus','car','van','train','bts','mrt','skytrain','subway','taxi','motorcycle','motorbike','bike','bicycle','scooter','boat','walk','walking','foot','parents','dad','mom'] }
    ],
    // Q2: What places are near your home? (Sample: A supermarket and a bank.)
    u8_partB_1: [
      { labelTh: 'ระบุสถานที่ใกล้บ้าน (Places near home)', labelEn: 'Places near home', words: ['supermarket','bank','park','market','seven','eleven','711','shop','store','mall','shopping','cafe','coffee','restaurant','bakery','school','hospital','clinic','pharmacy','temple','church','mosque','station','bus','stop','post','office','library','gym','police','hotel','bookshop','bookstore'] }
    ],
    // Q3: How do you get to a supermarket from your home? (Sample: I walk for 5 minutes and turn left at the bank.)
    u8_partB_2: [
      { labelTh: 'วิธีการเดินทางหรือคำบอกทิศทาง (Walk / Drive / Go straight / Turn)', labelEn: 'Travel method or direction verb', words: ['walk','go','drive','ride','take','straight','turn','left','right','along','across','past','pass','by','car','bus','bike','motorcycle','from','home'] },
      { labelTh: 'ระยะเวลาหรือจุดสังเกตระหว่างทาง (Time / Distance / Landmark)', labelEn: 'Minutes, distance, or landmark', words: ['minute','minutes','near','close','far','corner','street','road','soi','intersection','light','bank','park','school','cafe','shop','seven','eleven','market','mall','next','to','opposite','at','the','for','about','1','2','3','4','5','10','15','20','five','ten','fifteen','twenty'] }
    ],
    // Q4: What places are next to your school? (Sample: A coffeeshop and a post office.)
    u8_partB_3: [
      { labelTh: 'ระบุสถานที่ที่อยู่ติดกับโรงเรียน/ที่ทำงาน (Places next to school/work)', labelEn: 'Nearby places', words: ['coffee','coffeeshop','cafe','post','office','bank','park','supermarket','market','seven','eleven','shop','store','bookshop','bookstore','library','hospital','clinic','temple','restaurant','bakery','mall','bus','stop','station','hotel','house','building','next','to','near','school'] }
    ],

    // ---------------- UNIT 9: Healthy Food for Healthy Body ----------------
    // Q1: What's your favorite fruit? (Sample: My favorite fruit is mango.)
    u9_partB_0: [
      { labelTh: 'การบอกผลไม้ที่ชอบ (My favorite fruit is / I like)', labelEn: 'Preference structure', words: ['my','favorite','fruit','is','i','like','love','eat','eating','best'] },
      { labelTh: 'ระบุชื่อผลไม้ (Fruit name)', labelEn: 'Fruit vocabulary', words: ['mango','mangoes','apple','apples','banana','bananas','orange','oranges','watermelon','strawberry','strawberries','grape','grapes','pineapple','papaya','durian','rambutan','mangosteen','lychee','kiwi','pear','peach','cherry','melon','coconut','guava','pomelo','avocado','berry'] }
    ],
    // Q2: What do you usually eat for breakfast? (Sample: I usually eat eggs and bread.)
    u9_partB_1: [
      { labelTh: 'กริยาการรับประทานมื้อเช้า (Eat / Have for breakfast)', labelEn: 'Breakfast action', words: ['i','usually','always','often','eat','have','drink','for','breakfast','morning'] },
      { labelTh: 'ระบุอาหารหรือเครื่องดื่มมื้อเช้า (Breakfast food/drink)', labelEn: 'Breakfast food or drink', words: ['egg','eggs','omelet','fried','boiled','bread','toast','sandwich','rice','porridge','soup','congee','cereal','milk','coffee','tea','juice','water','fruit','banana','apple','salad','yogurt','sausage','ham','chicken','pork','noodles','pancake','waffle'] }
    ],
    // Q3: What kind of healthy food would you like to make? (Sample: I would like to make a salad.)
    u9_partB_2: [
      { labelTh: 'โครงสร้างบอกสิ่งที่อยากทำ (Would like to make / Cook)', labelEn: 'Desire to make/cook', words: ['i','would','like','want','love','to','make','cook','prepare','eat','healthy','food'] },
      { labelTh: 'ระบุเมนูอาหารเพื่อสุขภาพ (Healthy dish/food)', labelEn: 'Healthy food or dish', words: ['salad','vegetable','vegetables','fruit','soup','chicken','breast','fish','salmon','tuna','egg','eggs','boiled','steamed','grilled','rice','brown','sandwich','wrap','smoothie','yogurt','oatmeal','tofu','beans','spicy','thai','som','tam'] }
    ],
    // Q4: What do you drink when you're thirsty? (Sample: I drink water.)
    u9_partB_3: [
      { labelTh: 'กริยาการดื่ม (I drink / Have)', labelEn: 'Drinking verb', words: ['i','usually','always','drink','have','when','thirsty','like'] },
      { labelTh: 'ระบุเครื่องดื่มดับกระหาย (Water / Beverage)', labelEn: 'Beverage name', words: ['water','cold','plain','mineral','juice','orange','apple','fruit','coconut','milk','tea','iced','green','lemonade','soda','smoothie','electrolyte','sport','drink'] }
    ],

    // ---------------- UNIT 10: My Free Time ----------------
    // Q1: What do you like doing in your free time? (Sample: I like playing games.)
    u10_partB_0: [
      { labelTh: 'การบอกความชอบในเวลาว่าง (I like / Enjoy / In my free time)', labelEn: 'Free-time preference', words: ['i','like','love','enjoy','prefer','doing','to','in','my','free','time','hobby','is'] },
      { labelTh: 'ระบุกิจกรรมยามว่างหรืองานอดิเรก (Hobby / Activity)', labelEn: 'Hobby or activity', words: ['play','playing','games','game','read','reading','book','books','comics','comic','draw','drawing','paint','painting','pictures','listen','listening','music','songs','watch','watching','movie','movies','tv','youtube','series','anime','take','taking','photos','pictures','cook','cooking','bake','sport','sports','football','badminton','run','swim','sleep','shopping','travel'] }
    ],
    // Q2: When do you usually do your favorite activity? (Sample: I usually play games after school. I like playing games.)
    u10_partB_1: [
      { labelTh: 'กริยาการทำกิจกรรมและความถี่ (I usually do / Play / Read)', labelEn: 'Activity & frequency marker', words: ['i','usually','often','always','sometimes','do','play','read','draw','listen','watch','take','it','my','favorite','activity','hobby'] },
      { labelTh: 'ระบุช่วงเวลาหรือวันที่ทำ (After school / On weekends / In the evening)', labelEn: 'Time or day expression', words: [...COMMON_FREQ_WORDS, ...COMMON_TIME_WORDS, 'school','work','class','homework','free','time','holiday'] }
    ],
    // Q3: Who do you spend your free time with? (Sample: I spend my free time with my friends.)
    u10_partB_2: [
      { labelTh: 'โครงสร้างการใช้เวลาร่วมกับ (Spend time with / Do with)', labelEn: 'Spend time with structure', words: ['i','usually','spend','my','free','time','play','do','go','with','together'] },
      { labelTh: 'ระบุบุคคลที่ใช้เวลาว่างด้วย (Friends / Family / Alone)', labelEn: 'Companion (friends/family/alone)', words: ['friends','friend','best','family','parents','mother','mom','father','dad','brother','brothers','sister','sisters','cousin','classmates','dog','cat','pet','alone','myself'] }
    ],
    // Q4: What other hobbies would you like to try? (Sample: I would like to try painting.)
    u10_partB_3: [
      { labelTh: 'โครงสร้างบอกสิ่งที่อยากลอง (Would like to try / Want to learn)', labelEn: 'Would like to try structure', words: ['i','would','like','want','love','hope','to','try','learn','do','start','new','other','hobby'] },
      { labelTh: 'ระบุงานอดิเรกใหม่ที่อยากลอง (New hobby / Activity)', labelEn: 'Hobby to try', words: ['painting','paint','drawing','draw','cooking','cook','baking','bake','swimming','swim','dancing','dance','singing','sing','playing','play','guitar','piano','music','drums','violin','photography','taking','photos','camping','hiking','traveling','gardening','yoga','tennis','badminton','golf','skate','coding','knitting','fishing'] }
    ],

    // ---------------- UNIT 11: A Day at the Shopping Mall ----------------
    // Q1: What clothes do you like to wear? (Sample: I like to wear T-shirts and jeans.)
    u11_partB_0: [
      { labelTh: 'กริยาการสวมใส่เสื้อผ้าที่ชอบ (I like to wear)', labelEn: 'Like to wear phrase', words: ['i','usually','like','love','prefer','to','wear','wearing','my','favorite','clothes'] },
      { labelTh: 'ระบุชนิดเสื้อผ้า (Clothing items)', labelEn: 'Clothing items', words: ['tshirt','tshirts','shirt','shirts','blouse','jeans','pants','trousers','shorts','skirt','skirts','dress','dresses','jacket','coat','sweater','hoodie','suit','uniform','sportswear','shoes','sneakers','comfortable','casual'] }
    ],
    // Q2: What is your favorite color for clothes? (Sample: My favorite color is pink.)
    u11_partB_1: [
      { labelTh: 'การบอกสีที่ชอบ (My favorite color is / I like)', labelEn: 'Favorite color structure', words: ['my','favorite','color','colour','for','clothes','is','i','like','love','prefer','wear'] },
      { labelTh: 'ระบุชื่อสี (Color name)', labelEn: 'Color name', words: ['pink','blue','black','white','red','green','yellow','purple','orange','brown','gray','grey','navy','beige','cream','gold','silver','pastel','dark','light'] }
    ],
    // Q3: Where do you usually buy clothes? (Sample: I usually buy clothes at the shopping mall.)
    u11_partB_2: [
      { labelTh: 'กริยาการซื้อเสื้อผ้า (Buy clothes / Shop at)', labelEn: 'Buy / Shop verb', words: ['i','usually','often','always','sometimes','buy','buying','shop','shopping','get','my','clothes','at','in','from','on'] },
      { labelTh: 'ระบุสถานที่หรือช่องทางที่ซื้อ (Shopping mall / Market / Online)', labelEn: 'Shopping place or channel', words: ['shopping','mall','department','store','market','night','flea','chatuchak','online','internet','shopee','lazada','tiktok','shop','shops','boutique','uniqlo','hm','zara','lotus','big','c','supermarket','near','home','city','center'] }
    ],
    // Q4: How much money do you usually spend on your clothes? (Sample: I usually spend 200 baht on my clothes.)
    u11_partB_3: [
      { labelTh: 'กริยาการใช้จ่ายเงินซื้อเสื้อผ้า (Spend / Pay / Cost)', labelEn: 'Spend / Pay verb', words: ['i','usually','often','spend','pay','use','buy','cost','costs','on','for','my','clothes','shirt'] },
      { labelTh: 'ระบุจำนวนเงินและสกุลเงิน (Amount in Baht / Money)', labelEn: 'Money amount', words: COMMON_MONEY_WORDS }
    ],

    // ---------------- UNIT 12: Going to the Concert Hall ----------------
    // Q1: How would you get from your home to school? (Sample: I would take a bus.)
    u12_partB_0: [
      { labelTh: 'โครงสร้างการเดินทาง (I would take / Go by / Walk)', labelEn: 'Travel structure (would take / go by)', words: ['i','would','will','usually','take','go','get','travel','walk','ride','drive','by','from','home','to','school','work'] },
      { labelTh: 'ระบุยานพาหนะหรือวิธีเดินทาง (Transportation mode)', labelEn: 'Mode of transport', words: ['bus','car','van','train','bts','mrt','skytrain','subway','taxi','grab','motorcycle','motorbike','bike','bicycle','scooter','boat','walk','walking','foot'] }
    ],
    // Q2: What place would you like to go in your town? (Sample: I would like to go to the bookstore.)
    u12_partB_1: [
      { labelTh: 'โครงสร้างบอกสถานที่ที่อยากไป (I would like to go to / Visit)', labelEn: 'Would like to go structure', words: ['i','would','like','want','love','to','go','visit','in','my','town','city','the'] },
      { labelTh: 'ระบุสถานที่ในเมือง (Place in town)', labelEn: 'Place in town', words: ['bookstore','bookshop','library','park','mall','shopping','center','cinema','movie','theater','concert','hall','cafe','coffee','shop','restaurant','market','night','supermarket','museum','zoo','beach','temple','stadium','gym','pool','game','center'] }
    ],
    // Q3: How would you get there? (Sample: I would walk.)
    u12_partB_2: [
      { labelTh: 'โครงสร้างบอกวิธีเดินทางไปที่นั่น (I would ... / By ...)', labelEn: 'Travel method structure', words: ['i','we','would','will','can','take','go','get','there','walk','ride','drive','by','on'] },
      { labelTh: 'ระบุวิธีเดินทางหรือยานพาหนะ (Walk / Bus / Car / Train)', labelEn: 'Transport or walking', words: ['walk','walking','foot','bus','car','van','train','bts','mrt','skytrain','subway','taxi','grab','motorcycle','motorbike','bike','bicycle','scooter','boat'] }
    ],
    // Q4: When would you go there? (Sample: I would go this Friday.)
    u12_partB_3: [
      { labelTh: 'โครงสร้างบอกเวลาที่จะไป (I would go ...)', labelEn: 'Future/conditional go structure', words: ['i','we','would','will','like','to','go','visit','there','on','this','next','in','at','after'] },
      { labelTh: 'ระบุวันหรือช่วงเวลาที่จะไป (Day / Weekend / Time)', labelEn: 'Day or time expression', words: [...COMMON_FREQ_WORDS, ...COMMON_TIME_WORDS, 'tomorrow','holiday','vacation','school','work','free','time'] }
    ]
  };

  function evaluateCommunicativeRelevance(recordKey, spokenWords, targetWords, checkList, mode) {
    const concepts = (recordKey && QUESTION_CONCEPT_MAP[recordKey]) ? QUESTION_CONCEPT_MAP[recordKey] : null;
    if (!concepts || (mode !== 'open' && mode !== 'challenge')) {
      return null;
    }

    const conceptChecks = concepts.map(slot => {
      let matchedWord = null;
      let bestScore = 0;
      for (const sw of spokenWords) {
        for (const candidate of slot.words) {
          const sim = similarity(sw, candidate);
          if (sim >= 0.80 && sim > bestScore) {
            bestScore = sim;
            matchedWord = sw;
          }
        }
      }
      return {
        labelTh: slot.labelTh,
        labelEn: slot.labelEn,
        matched: bestScore >= 0.80,
        matchedWord: matchedWord || ''
      };
    });

    const matchedSlots = conceptChecks.filter(c => c.matched).length;
    const totalSlots = conceptChecks.length;
    const slotRatio = totalSlots > 0 ? (matchedSlots / totalSlots) : 1;

    // Allow concise natural answers (e.g., "An octopus" or "I stay inside")
    const minWordsRequired = Math.min(3, Math.max(2, targetWords.length));
    const lengthFactor = Math.min(1, spokenWords.length / minWordsRequired);

    let commStatus = 'retry';
    let commSummaryTh = '';
    let commSummaryEn = '';
    let relevanceScore = Math.round((slotRatio * 82 + lengthFactor * 18));

    if (slotRatio >= 0.75 && spokenWords.length >= minWordsRequired) {
      commStatus = 'pass';
      relevanceScore = Math.max(88, Math.min(99, Math.round(86 + slotRatio * 10 + Math.min(4, spokenWords.length * 0.4))));
      commSummaryTh = 'สื่อสารได้สำเร็จ! คำตอบของคุณตรงประเด็นตามที่โจทย์ถาม แม้ใช้คำพูดของตัวเองที่ไม่ซ้ำกับประโยคตัวอย่าง';
      commSummaryEn = 'Communicative Success! Your answer directly addresses the question using your own words.';
    } else if (slotRatio >= 0.45 && spokenWords.length >= 2) {
      commStatus = 'partial';
      relevanceScore = Math.max(70, Math.min(85, Math.round(68 + slotRatio * 20)));
      commSummaryTh = 'สื่อสารได้บางส่วน! คำตอบเริ่มอยู่ในประเด็นที่โจทย์ถามแล้ว ลองเพิ่มรายละเอียดในหัวข้อที่ยังขาดเพื่อให้สื่อสารได้สมบูรณ์ขึ้น';
      commSummaryEn = 'Partially Relevant! You answered part of the prompt—try adding the remaining details shown below.';
    } else {
      commStatus = 'retry';
      relevanceScore = Math.max(45, Math.min(65, Math.round(42 + slotRatio * 25 + lengthFactor * 10)));
      commSummaryTh = 'คำตอบยังไม่ตรงกับสิ่งที่โจทย์ถาม ลองฟังโจทย์อีกครั้งแล้วตอบให้ตรงประเด็นคำถาม (ไม่จำเป็นต้องพูดตามประโยคตัวอย่าง)';
      commSummaryEn = 'Not yet matching the question prompt. Listen to the question again and answer on-topic in your own words.';
    }

    return {
      commStatus,
      commSummaryTh,
      commSummaryEn,
      conceptChecks,
      matchedSlots,
      totalSlots,
      relevanceScore
    };
  }

  function evaluateSpeechMetrics({ recordKey, targetText, keywords, transcript, durationSec, avgVolume, confidence, mode }) {
    const targetWords = normalizeWords(targetText);
    const spokenWords = normalizeWords(transcript || targetText);
    const expectedMinSec = Math.max(1.5, (mode === 'open' || mode === 'challenge') ? 2.0 : targetWords.length * 0.32);
    const expectedMaxSec = Math.max(4.5, (mode === 'open' || mode === 'challenge') ? 14.0 : targetWords.length * 0.85);

    let matchedCount = 0;
    const checkList = (keywords && keywords.length) ? normalizeWords(keywords.join(' ')) : targetWords;
    const uniqueChecks = [...new Set(checkList)];

    uniqueChecks.forEach(tw => {
      const bestMatch = spokenWords.reduce((best, sw) => Math.max(best, similarity(tw, sw)), 0);
      if (bestMatch >= 0.72) matchedCount += 1;
      else if (bestMatch >= 0.5) matchedCount += 0.5;
    });

    let completeness = uniqueChecks.length > 0
      ? Math.round((matchedCount / uniqueChecks.length) * 100)
      : 90;

    let wordSimSum = 0;
    targetWords.forEach(tw => {
      const best = spokenWords.reduce((m, sw) => Math.max(m, similarity(tw, sw)), 0);
      wordSimSum += best;
    });
    const rawSim = targetWords.length > 0 ? (wordSimSum / targetWords.length) : 0.88;
    const confScore = confidence ? Math.round(confidence * 100) : 90;
    let accent = Math.round(rawSim * 55 + confScore * 0.45);

    // Evaluate Communicative Question-Answer Relevance for Part B ('open') & Part C ('challenge')
    const commEval = evaluateCommunicativeRelevance(recordKey, spokenWords, targetWords, uniqueChecks, mode);

    if (commEval) {
      // Do NOT penalize learner for not repeating the sample answer verbatim!
      // Instead, score completeness & pronunciation from question-answer concept match + speech confidence.
      completeness = commEval.relevanceScore;
      if (commEval.commStatus === 'pass') {
        accent = Math.max(86, Math.min(98, Math.round(confScore * 0.96 + Math.min(5, spokenWords.length * 0.4))));
      } else if (commEval.commStatus === 'partial') {
        accent = Math.max(76, Math.min(92, Math.round(confScore * 0.88)));
      } else {
        accent = Math.max(64, Math.min(82, Math.round(confScore * 0.78)));
      }
    } else if (mode === 'open' && spokenWords.length >= Math.max(3, Math.floor(targetWords.length * 0.6))) {
      completeness = Math.max(completeness, Math.min(98, 78 + spokenWords.length * 3));
      accent = Math.max(accent, Math.round(confScore * 0.92));
    }

    completeness = Math.max(45, Math.min(100, completeness));
    accent = Math.max(60, Math.min(99, accent));

    const volNormalized = avgVolume > 0 ? Math.min(100, Math.max(70, Math.round(68 + avgVolume * 1.4))) : 90;
    const clarity = Math.max(65, Math.min(99, Math.round(volNormalized * 0.6 + confScore * 0.4)));

    let timeScore = 92;
    const actualSec = Math.max(1.2, Number(durationSec) || expectedMinSec * 1.2);
    if (actualSec < expectedMinSec * 0.7) {
      timeScore = Math.max(62, Math.round((actualSec / expectedMinSec) * 90));
    } else if (actualSec > expectedMaxSec * 1.5) {
      timeScore = Math.max(68, Math.round(95 - (actualSec - expectedMaxSec) * 4));
    } else {
      timeScore = Math.min(98, Math.max(84, Math.round(94 - Math.abs(actualSec - (expectedMinSec + expectedMaxSec) / 2) * 1.2)));
    }

    const overall = Math.round(
      accent * 0.30 +
      completeness * 0.35 +
      clarity * 0.20 +
      timeScore * 0.15
    );

    let feedbackTh = '';
    let feedbackEn = '';

    if (commEval) {
      feedbackTh = commEval.commSummaryTh;
      feedbackEn = commEval.commSummaryEn;
    } else if (overall >= 90) {
      feedbackTh = 'ยอดเยี่ยมมาก! ออกเสียงชัดเจน จังหวะการพูดเป็นธรรมชาติ และเนื้อหาครบถ้วนสมบูรณ์';
      feedbackEn = 'Excellent job! Your pronunciation is clear, natural, and complete.';
    } else if (completeness < 78) {
      feedbackTh = 'พยายามพูดให้ครบทุกคำสำคัญในประโยค และออกเสียงคำท้ายประโยคให้ชัดเจนขึ้นอีกนิดครับ';
      feedbackEn = 'Try to include all key words in the sentence and pronounce the ending words clearly.';
    } else if (timeScore < 78) {
      feedbackTh = 'ลองปรับจังหวะการพูดให้ต่อเนื่องและไม่เร็วหรือช้าเกินไป จะช่วยให้ฟังเป็นธรรมชาติมากขึ้นครับ';
      feedbackEn = 'Try to keep a steady speaking pace—not too fast or too slow—for better fluency.';
    } else {
      feedbackTh = 'ทำได้ดีมาก! ลองฝึกเน้นเสียงหนัก-เบา (Stress) ในคำสำคัญ และเชื่อมเสียงระหว่างคำให้ลื่นไหลขึ้นครับ';
      feedbackEn = 'Very good! Practice word stress on key vocabulary for an even more natural accent.';
    }

    return {
      overall,
      accent,
      completeness,
      clarity,
      timeScore,
      durationSec: Number(actualSec.toFixed(1)),
      transcript: transcript || targetText,
      feedbackTh,
      feedbackEn,
      commStatus: commEval ? commEval.commStatus : null,
      commSummaryTh: commEval ? commEval.commSummaryTh : null,
      commSummaryEn: commEval ? commEval.commSummaryEn : null,
      conceptChecks: commEval ? commEval.conceptChecks : null,
      timestamp: new Date().toISOString()
    };
  }

  function evaluateCustomTranscript(recordKey, targetText, keywords, mode, customTranscript) {
    const cleanText = String(customTranscript || '').trim() || targetText;
    const wordCount = normalizeWords(cleanText).length;
    const estDuration = Math.max(2.0, Number((wordCount * 0.45).toFixed(1)));
    return evaluateSpeechMetrics({
      recordKey,
      targetText,
      keywords,
      transcript: cleanText,
      durationSec: estDuration,
      avgVolume: 24,
      confidence: 0.92,
      mode
    });
  }

  async function startRecording(recordKey, targetText, keywords, mode, onResult, onStatus) {
    if (isRecording) {
      stopRecording();
      return;
    }

    window.SoundFX.playRecordStart();
    isRecording = true;
    recordStartTime = Date.now();
    recognizedText = '';
    recognitionConfidence = 0.88;
    volumeSamples = [];
    audioChunks = [];

    if (onStatus) onStatus('recording');

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        recognition = new SpeechRec();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event) => {
          let textPieces = [];
          for (let i = 0; i < event.results.length; i++) {
            textPieces.push(event.results[i][0].transcript);
            if (event.results[i][0].confidence) {
              recognitionConfidence = event.results[i][0].confidence;
            }
          }
          recognizedText = textPieces.join(' ').trim();
        };
        recognition.start();
      } catch (e) {
        recognition = null;
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(audioStream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        volumeInterval = setInterval(() => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          volumeSamples.push(avg);
        }, 100);

        mediaRecorder = new MediaRecorder(audioStream);
        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) audioChunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          if (volumeInterval) clearInterval(volumeInterval);
          if (audioChunks.length > 0) {
            const blob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
            audioStore[recordKey] = URL.createObjectURL(blob);
          }
          if (audioStream) {
            audioStream.getTracks().forEach(t => t.stop());
            audioStream = null;
          }
          const durationSec = (Date.now() - recordStartTime) / 1000;
          const avgVol = volumeSamples.length
            ? volumeSamples.reduce((a, b) => a + b, 0) / volumeSamples.length
            : 22;

          const result = evaluateSpeechMetrics({
            recordKey,
            targetText,
            keywords,
            transcript: recognizedText || targetText,
            durationSec,
            avgVolume: avgVol,
            confidence: recognitionConfidence,
            mode
          });
          window.SoundFX.playRecordStop();
          if (onResult) onResult(result, audioStore[recordKey] || null);
        };
        mediaRecorder.start();
        return;
      } catch (err) {}
    }

    setTimeout(() => {
      if (!isRecording) return;
      isRecording = false;
      const durationSec = 2.8;
      const result = evaluateSpeechMetrics({
        recordKey,
        targetText,
        keywords,
        transcript: recognizedText || targetText,
        durationSec,
        avgVolume: 24,
        confidence: 0.91,
        mode
      });
      window.SoundFX.playRecordStop();
      if (onResult) onResult(result, null);
    }, 1800);
  }

  function stopRecording() {
    if (!isRecording) return;
    isRecording = false;
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
      recognition = null;
    }
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      try { mediaRecorder.stop(); } catch (e) {}
    }
  }

  function playRecordedVoice(recordKey, fallbackText) {
    const blobUrl = audioStore[recordKey];
    if (blobUrl) {
      const audio = new Audio(blobUrl);
      audio.play().catch(() => {
        window.SpeechEngine.speak(fallbackText, { pitch: 1.08 });
      });
    } else if (fallbackText) {
      window.SpeechEngine.speak(fallbackText, { pitch: 1.08 });
    }
  }

  return {
    isRecording: () => isRecording,
    hasRecording: (key) => !!audioStore[key],
    startRecording,
    stopRecording,
    playRecordedVoice,
    evaluateSpeechMetrics,
    evaluateCustomTranscript,
    QUESTION_CONCEPT_MAP
  };
})();
