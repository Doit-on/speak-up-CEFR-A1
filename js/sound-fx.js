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
    'emma', 'maya', 'sara', 'mia', 'lily', 'joy', 'tara', 'nina',
    'anna', 'may', 'lisa', 'amy', 'kate', 'lucy', 'jane', 'sarah',
    'girl', 'woman', 'mother', 'sister', 'ms', 'mrs', 'miss'
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
      if (speaker && speaker.toLowerCase() === 'tara') {
        pitch = 1.26;
        isAltFemale = true;
      } else {
        pitch = 1.18; // Distinct feminine voice register
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
  // COMMUNICATIVE CONCEPT SLOTS (Question-Answer Relevance Map for Part B & C)
  // Evaluates whether the learner's response answers what the question asks,
  // WITHOUT requiring verbatim words from the sample answer.
  // ============================================================================
  const COMMON_TIME_WORDS = ['1','2','3','4','5','6','7','8','9','10','11','12','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirty','half','quarter','am','pm','oclock','morning','afternoon','evening','night','noon','midnight','early','late','at'];
  const COMMON_FREQ_WORDS = ['always','usually','often','sometimes','rarely','never','every','daily','week','weekend','monday','tuesday','wednesday','thursday','friday','saturday','sunday','once','twice'];
  const COMMON_OPINION_WORDS = ['like','love','enjoy','favorite','prefer','good','great','nice','fun','delicious','tasty','yummy','healthy','sweet','spicy','fresh','comfortable','beautiful','cool','best','awesome','interesting','exciting','relaxing'];

  const QUESTION_CONCEPT_MAP = {
    // ---------------- UNIT 1: Daily Routine ----------------
    u1_partB_0: [
      { labelTh: 'กริยาตื่นนอน (Wake up / Get up)', labelEn: 'Wake up action', words: ['wake','get','up','awake','rise'] },
      { labelTh: 'เวลาหรือช่วงเวลา (Time / Morning)', labelEn: 'Time expression', words: COMMON_TIME_WORDS }
    ],
    u1_partB_1: [
      { labelTh: 'กิจกรรมยามเช้า (Morning activity)', labelEn: 'Morning routine action', words: ['brush','wash','shower','bath','eat','have','drink','breakfast','dress','dressed','exercise','walk','run','make','read','pray','coffee','tea','milk','water','toast','eggs','rice'] },
      { labelTh: 'รูปประโยคเล่าเรื่อง (I + Verb / Time)', labelEn: 'First-person statement', words: ['i','my','then','after','first','usually','always','every','morning'] }
    ],
    u1_partB_2: [
      { labelTh: 'การเดินทางไปทำงาน/เรียน (Go to work/school)', labelEn: 'Go / Leave / Start', words: ['go','leave','start','walk','drive','take','ride','bus','car','train','bts','mrt','taxi','bike','work','school','office','university','college','study','class'] },
      { labelTh: 'การระบุเวลา (Time)', labelEn: 'Time expression', words: COMMON_TIME_WORDS }
    ],
    u1_partB_3: [
      { labelTh: 'กิจกรรมช่วงเย็น/หลังเลิกงาน (Evening activity)', labelEn: 'Evening activity', words: ['dinner','eat','have','cook','watch','tv','television','movie','youtube','read','book','play','game','music','relax','rest','talk','family','exercise','gym','homework','shower'] },
      { labelTh: 'คำเชื่อมหรือช่วงเวลาเย็น (Evening / After)', labelEn: 'Evening context', words: ['evening','night','after','home','usually','often','sometimes','with','my','i'] }
    ],
    u1_partB_4: [
      { labelTh: 'การเข้านอน (Go to bed / Sleep)', labelEn: 'Sleep / Go to bed', words: ['sleep','bed','asleep','rest','night'] },
      { labelTh: 'การระบุเวลาเข้านอน (Time)', labelEn: 'Time expression', words: COMMON_TIME_WORDS }
    ],
    u1_partC_0: [
      { labelTh: '1. กิจกรรมช่วงเช้าและการตื่นนอน (Morning / Wake up)', labelEn: 'Morning routine', words: ['wake','get','up','morning','breakfast','shower','brush','wash','coffee','eat'] },
      { labelTh: '2. กิจกรรมระหว่างวัน/ทำงาน/เรียน (Daytime / Work / Study)', labelEn: 'Daytime / Work or School', words: ['go','work','school','study','office','lunch','start','class','drive','bus','train','afternoon'] },
      { labelTh: '3. กิจกรรมช่วงเย็นและการเข้านอน (Evening / Dinner / Bedtime)', labelEn: 'Evening & Bedtime', words: ['dinner','evening','home','watch','tv','read','relax','sleep','bed','night'] },
      { labelTh: '4. การระบุเวลาหรือลำดับเหตุการณ์ (Time & Sequence)', labelEn: 'Time or Sequence markers', words: [...COMMON_TIME_WORDS, 'then','after','next','finally','usually','every'] }
    ],

    // ---------------- UNIT 2: Food & Drinks ----------------
    u2_partB_0: [
      { labelTh: 'การบอกความชอบ (Favorite / Like / Love)', labelEn: 'Preference expression', words: ['favorite','like','love','prefer','enjoy','best','food','dish','meal','eat'] },
      { labelTh: 'ชื่ออาหาร (Food item)', labelEn: 'Food vocabulary', words: ['rice','fried','chicken','pork','beef','fish','seafood','shrimp','noodles','noodle','pasta','spaghetti','pizza','burger','salad','soup','curry','pad','thai','tom','yum','som','tam','papaya','sushi','steak','egg','omelet','bread','sandwich','fruit','meat','vegetable'] }
    ],
    u2_partB_1: [
      { labelTh: 'ชื่อเครื่องดื่ม (Drink / Beverage)', labelEn: 'Beverage vocabulary', words: ['water','coffee','tea','milk','juice','orange','apple','smoothie','soda','cola','coke','lemonade','iced','hot','green','thai','drink','drinking'] },
      { labelTh: 'การบอกความชอบหรือเวลาที่ดื่ม (Preference / Meal context)', labelEn: 'Preference or context', words: ['like','love','prefer','favorite','usually','every','morning','lunch','dinner','day','with','cold','warm','sweet','fresh'] }
    ],
    u2_partB_2: [
      { labelTh: 'ความถี่หรือการทำอาหาร (Cooking & Frequency)', labelEn: 'Cooking & Frequency', words: ['cook','make','prepare','kitchen','home','yes','no','sometimes','often','always','usually','never','rarely','every','weekend','day','buy','eat','out'] },
      { labelTh: 'รายละเอียดอาหารหรือมื้ออาหาร (Meal / Food detail)', labelEn: 'Meal or food detail', words: ['breakfast','lunch','dinner','food','meal','rice','egg','noodles','soup','salad','family','myself','mom','mother','wife','husband','easy','simple','delicious'] }
    ],
    u2_partC_0: [
      { labelTh: 'ระบุอาหารเช้า (Breakfast food/drink)', labelEn: 'Breakfast item', words: ['breakfast','morning','eat','have','drink','bread','toast','egg','eggs','milk','coffee','tea','rice','porridge','soup','cereal','sandwich','fruit','banana','yogurt','water','juice'] },
      { labelTh: 'บอกเหตุผลหรือความรู้สึก (Reason / Quality)', labelEn: 'Reason or description', words: ['because','good','healthy','easy','fast','quick','delicious','tasty','yummy','energy','warm','fresh','full','like','love','favorite'] }
    ],
    u2_partC_1: [
      { labelTh: 'ระบุอาหารหรือเครื่องดื่มที่ชอบ (Favorite food/drink)', labelEn: 'Food or drink item', words: ['food','drink','rice','chicken','noodles','pizza','salad','soup','curry','fish','meat','fruit','coffee','tea','juice','milk','water','smoothie','pad','thai','sushi','steak','burger'] },
      { labelTh: 'อธิบายรสชาติหรือเหตุผลที่ชอบ (Taste / Reason)', labelEn: 'Taste or reason why', words: ['because','delicious','tasty','yummy','sweet','spicy','sour','salty','fresh','healthy','good','great','refreshing','cold','hot','love','like','favorite','make','feel'] }
    ],

    // ---------------- UNIT 3: Shopping & Clothes ----------------
    u3_partB_0: [
      { labelTh: 'ระบุเสื้อผ้าที่สวมใส่ (Clothing items)', labelEn: 'Clothing vocabulary', words: ['wear','wearing','shirt','tshirt','blouse','pants','trousers','jeans','shorts','skirt','dress','jacket','coat','sweater','uniform','suit','shoes','sneakers','sandals','hat','cap','glasses','socks'] },
      { labelTh: 'ระบุสีหรือลักษณะ (Color / Style)', labelEn: 'Color or description', words: ['white','black','blue','red','green','yellow','pink','brown','gray','grey','purple','orange','navy','dark','light','cotton','comfortable','casual','formal','new','nice','favorite','today','now'] }
    ],
    u3_partB_1: [
      { labelTh: 'ระบุสีที่ชอบ (Favorite color)', labelEn: 'Color name', words: ['blue','red','green','black','white','yellow','pink','purple','orange','brown','gray','grey','gold','silver','navy','sky','light','dark','color','colour'] },
      { labelTh: 'บอกความชอบหรือเหตุผล (Preference / Feeling)', labelEn: 'Preference expression', words: ['favorite','like','love','prefer','bright','calm','cool','nice','beautiful','clean','good','happy','relaxing','match','wear'] }
    ],
    u3_partB_2: [
      { labelTh: 'บอกความชอบเรื่องการช้อปปิ้ง (Shopping preference)', labelEn: 'Shopping attitude', words: ['yes','no','like','love','enjoy','sometimes','often','usually','shopping','shop','buy','buying'] },
      { labelTh: 'สถานที่หรือสิ่งที่ซื้อ (Place / Items / Frequency)', labelEn: 'Where, when, or what you buy', words: ['mall','market','online','store','shop','department','weekend','saturday','sunday','month','clothes','shoes','food','things','friends','family','sale','discount','cheap'] }
    ],
    u3_partC_0: [
      { labelTh: '1. สอบถามเสื้อผ้า/สี/ขนาด (Item, Color, or Size)', labelEn: 'Item, color, or size', words: ['shirt','tshirt','jacket','dress','pants','jeans','shoes','skirt','sweater','coat','size','small','medium','large','xl','color','blue','black','white','red','green','have','looking','want','need','try','on'] },
      { labelTh: '2. สอบถามราคาหรือการชำระเงิน (Price / How much / Buy)', labelEn: 'Price or buying expression', words: ['how','much','price','cost','baht','dollars','cheap','expensive','discount','sale','take','buy','pay','card','cash','thank','please','excuse'] }
    ],

    // ---------------- UNIT 4: Places & Directions ----------------
    u4_partB_0: [
      { labelTh: 'ระบุสถานที่ใกล้บ้าน (Places near home)', labelEn: 'Neighborhood places', words: ['near','around','close','next','by','home','house','condo','apartment','park','supermarket','market','mall','store','shop','seven','eleven','school','hospital','clinic','bank','station','restaurant','cafe','coffee','temple','street','road'] },
      { labelTh: 'โครงสร้างการบอกสิ่งที่มีอยู่ (There is / There are / Have)', labelEn: 'Existence structure', words: ['there','is','are','have','has','many','some','two','three','big','small','convenient','quiet','nice'] }
    ],
    u4_partB_1: [
      { labelTh: 'ระบุสถานที่ที่ชอบไปในเมือง (Favorite place)', labelEn: 'Place in town', words: ['park','mall','shopping','center','cafe','coffee','shop','library','cinema','movie','theater','beach','market','night','restaurant','museum','gym','temple','river','zoo','place'] },
      { labelTh: 'บอกกิจกรรมหรือเหตุผลที่ชอบ (Activity / Reason)', labelEn: 'Activity or reason', words: ['like','love','favorite','go','visit','walk','relax','read','eat','drink','watch','buy','meet','friends','family','quiet','beautiful','fun','cool','air','fresh','nice','because'] }
    ],
    u4_partB_2: [
      { labelTh: 'ระบุสถานที่ที่ไปสุดสัปดาห์ (Weekend destination)', labelEn: 'Weekend place', words: ['weekend','saturday','sunday','go','visit','stay','home','mall','market','park','cafe','restaurant','cinema','beach','temple','countryside','province','parents','friends','gym','supermarket'] },
      { labelTh: 'บอกกิจกรรมที่ทำหรือคนที่ไปด้วย (Activity / Companion)', labelEn: 'Activity or companion', words: ['with','family','friends','my','eat','shop','shopping','watch','movie','relax','rest','clean','cook','play','exercise','walk','drive','usually','often','sometimes'] }
    ],
    u4_partC_0: [
      { labelTh: '1. คำบอกทิศทางและการเดิน (Direction verbs)', labelEn: 'Direction commands', words: ['go','walk','straight','turn','left','right','pass','past','cross','follow','along','down','up','take','first','second'] },
      { labelTh: '2. คำบุพบทบอกตำแหน่ง/จุดสังเกต (Prepositions & Landmarks)', labelEn: 'Location prepositions & landmarks', words: ['next','to','opposite','across','from','between','behind','front','near','corner','street','road','block','light','traffic','intersection','bank','park','school','station','supermarket','hospital','building','left','right','side'] }
    ],

    // ---------------- UNIT 5: Free Time & Hobbies ----------------
    u5_partB_0: [
      { labelTh: 'ระบุงานอดิเรก/กิจกรรมยามว่าง (Hobby / Free-time activity)', labelEn: 'Hobby or activity', words: ['free','time','hobby','hobbies','like','love','enjoy','read','reading','book','books','watch','watching','movie','movies','tv','series','youtube','listen','listening','music','songs','play','playing','game','games','sport','sports','cook','cooking','draw','paint','travel','garden','walk','run','exercise','sleep','rest','shop','photo'] }
    ],
    u5_partB_1: [
      { labelTh: 'ระบุชนิดกีฬาหรือการออกกำลังกาย (Sport / Exercise)', labelEn: 'Sport or exercise', words: ['sport','football','soccer','basketball','badminton','tennis','table','ping','pong','volleyball','swimming','swim','running','run','jogging','cycling','bike','yoga','gym','fitness','walk','walking','golf','boxing','aerobics','dance'] },
      { labelTh: 'การบอกความชอบหรือความถี่ (Preference / Frequency)', labelEn: 'Preference or frequency', words: ['favorite','like','love','play','watch','do','go','every','weekend','week','day','sometimes','often','usually','with','friends','healthy','fun','exciting','dont'] }
    ],
    u5_partB_2: [
      { labelTh: 'ระบุแนวเพลง/ภาพยนตร์/รายการที่ชอบ (Music / Movie / Show)', labelEn: 'Music or movie genre', words: ['music','song','songs','pop','rock','jazz','classical','country','thai','korean','kpop','hip','hop','dance','easy','listening','movie','movies','film','action','comedy','romance','horror','sci','fi','drama','cartoon','anime','series','show','news','youtube','netflix','listen','watch','like','love','favorite'] }
    ],
    u5_partC_0: [
      { labelTh: '1. ระบุงานอดิเรกที่ชอบทำ (Hobby / Activity)', labelEn: 'Hobby or activity', words: ['hobby','free','time','like','love','enjoy','favorite','read','book','watch','movie','tv','listen','music','play','game','sport','football','badminton','run','swim','cook','bake','travel','photo','draw','plant','garden','yoga','exercise'] },
      { labelTh: '2. บอกความถี่หรือช่วงเวลาที่ทำ (When / How often)', labelEn: 'Time or frequency', words: [...COMMON_TIME_WORDS, ...COMMON_FREQ_WORDS, 'after','work','school','holiday','free','time','home','park','gym','with','friends','family','alone'] },
      { labelTh: '3. บอกเหตุผลหรือความรู้สึก (Why you like it)', labelEn: 'Reason or feeling', words: ['because','make','makes','feel','happy','relax','relaxed','relaxing','fun','interesting','healthy','strong','good','great','easy','stress','learn','new','enjoy','exciting'] }
    ],

    // ---------------- UNIT 6: Family & Friends ----------------
    u6_partB_0: [
      { labelTh: 'ระบุจำนวนสมาชิกในครอบครัว (Number of people)', labelEn: 'Number of family members', words: ['1','2','3','4','5','6','7','8','9','10','one','two','three','four','five','six','seven','eight','nine','ten','small','big','large','people','persons','members','family','there','are','have'] },
      { labelTh: 'ระบุสมาชิกในครอบครัว (Family members)', labelEn: 'Family member nouns', words: ['father','dad','mother','mom','parents','brother','sister','son','daughter','children','kids','husband','wife','grandmother','grandma','grandfather','grandpa','grandparents','uncle','aunt','cousin','me','myself','and'] }
    ],
    u6_partB_1: [
      { labelTh: 'การพูดถึงพี่น้องหรือสมาชิกครอบครัว (Siblings / Family)', labelEn: 'Brothers, sisters, or family', words: ['yes','no','have','dont','only','child','brother','brothers','sister','sisters','older','younger','big','little','one','two','three','four','none','single','son','daughter','parents','family'] }
    ],
    u6_partB_2: [
      { labelTh: 'ระบุเพื่อนสนิทหรือลักษณะนิสัย (Best friend / Personality)', labelEn: 'Friend & personality/description', words: ['friend','best','name','is','he','she','we','kind','nice','friendly','funny','smart','clever','helpful','good','polite','quiet','talkative','happy','tall','short','work','school','together','like','love','help','talk','play'] }
    ],
    u6_partC_0: [
      { labelTh: '1. แนะนำสมาชิกในครอบครัวหรือเพื่อน (Who they are)', labelEn: 'Family member or friend', words: ['family','father','dad','mother','mom','parents','brother','sister','husband','wife','son','daughter','friend','people','there','are','have','my','name','is','he','she','they'] },
      { labelTh: '2. บอกลักษณะ อาชีพ หรือกิจกรรมที่ทำร่วมกัน (Details / Jobs / Activities)', labelEn: 'Characteristics, jobs, or shared activities', words: ['kind','nice','friendly','funny','helpful','good','happy','love','like','work','teacher','doctor','nurse','engineer','office','business','student','cook','eat','dinner','travel','watch','talk','together','weekend','home','years','old','live'] }
    ],

    // ---------------- UNIT 7: Weather & Seasons ----------------
    u7_partB_0: [
      { labelTh: 'ระบุสภาพอากาศ (Weather condition)', labelEn: 'Weather vocabulary', words: ['sunny','hot','warm','cool','cold','rainy','raining','rain','cloudy','windy','stormy','clear','nice','good','bad','humid','dry','weather','today','now','outside','sky','sun','degrees'] }
    ],
    u7_partB_1: [
      { labelTh: 'ระบุฤดูกาลหรือสภาพอากาศที่ชอบ (Season / Weather)', labelEn: 'Season or weather type', words: ['winter','summer','rainy','spring','autumn','fall','cool','cold','warm','hot','sunny','season','weather'] },
      { labelTh: 'บอกความชอบหรือเหตุผล (Preference / Reason)', labelEn: 'Preference or reason', words: ['favorite','like','love','prefer','enjoy','because','nice','comfortable','fresh','air','travel','holiday','beach','mountain','wear','sweater','jacket','eat','ice','cream','rain','trees','green','flowers'] }
    ],
    u7_partB_2: [
      { labelTh: 'ระบุกิจกรรมหรือสิ่งที่ทำเมื่อฝนตก (Rainy day activity)', labelEn: 'Rainy day action', words: ['rain','rainy','raining','when','stay','home','inside','umbrella','raincoat','read','book','watch','movie','tv','series','sleep','nap','rest','drink','hot','coffee','tea','chocolate','soup','cook','eat','listen','music','play','game'] }
    ],
    u7_partC_0: [
      { labelTh: '1. บรรยายสภาพอากาศหรือฤดูกาล (Weather / Season)', labelEn: 'Weather or season description', words: ['weather','today','season','sunny','hot','warm','cool','cold','rainy','rain','cloudy','windy','nice','clear','sky','summer','winter','rainy','spring','autumn'] },
      { labelTh: '2. บอกเสื้อผ้าที่ใส่หรือสิ่งที่พกพา (Clothes / Items for weather)', labelEn: 'Clothing or weather gear', words: ['wear','wearing','put','on','take','bring','carry','tshirt','shirt','shorts','hat','cap','sunglasses','jacket','coat','sweater','scarf','pants','jeans','umbrella','raincoat','boots','shoes','comfortable','light','warm'] },
      { labelTh: '3. บอกกิจกรรมที่ทำในสภาพอากาศนั้น (Activities)', labelEn: 'Activities for that weather', words: ['go','walk','park','beach','swim','travel','outside','stay','home','inside','drink','cold','hot','water','coffee','tea','ice','cream','read','watch','movie','play','exercise','relax','enjoy','like','love'] }
    ],

    // ---------------- UNIT 8: Health & Body ----------------
    u8_partB_0: [
      { labelTh: 'บอกอาการหรือความรู้สึกวันนี้ (How you feel today)', labelEn: 'Health or feeling state', words: ['feel','feeling','am','im','good','great','fine','well','okay','ok','healthy','happy','strong','fresh','tired','sleepy','sick','ill','not','bad','headache','cold','fever','stomachache','sore','pain','today','now','very'] }
    ],
    u8_partB_1: [
      { labelTh: 'วิธีดูแลตัวเองเมื่อไม่สบาย (What you do when sick/cold)', labelEn: 'Remedy or self-care action', words: ['when','sick','cold','ill','fever','headache','take','medicine','pill','pills','vitamin','drink','warm','hot','water','tea','soup','rest','sleep','bed','stay','home','see','visit','go','doctor','hospital','clinic','pharmacy','mask'] }
    ],
    u8_partB_2: [
      { labelTh: 'วิธีรักษาสุขภาพให้แข็งแรง (Healthy habits)', labelEn: 'Healthy lifestyle habits', words: ['healthy','health','keep','stay','eat','good','food','vegetables','fruit','fruits','salad','drink','water','milk','exercise','run','walk','jog','swim','sport','gym','yoga','sleep','early','enough','hours','rest','wash','hands','dont','smoke'] }
    ],
    u8_partC_0: [
      { labelTh: '1. บอกอาการเจ็บป่วยหรือไม่สบาย (Symptoms / Illness)', labelEn: 'Symptom or health problem', words: ['have','feel','got','sick','ill','headache','fever','cold','cough','sore','throat','stomachache','toothache','backache','pain','hurt','hurts','tired','weak','dizzy','runny','nose','temperature','body','head','stomach','throat','doctor'] },
      { labelTh: '2. การขอคำแนะนำหรือวิธีดูแลรักษา (Advice / Treatment / Rest)', labelEn: 'Treatment, medicine, or rest', words: ['should','need','can','what','do','take','medicine','pill','aspirin','vitamin','drink','water','warm','rest','sleep','stay','bed','home','see','doctor','hospital','clinic','help','better','days','since','yesterday','today'] }
    ],

    // ---------------- UNIT 9: Past Experiences ----------------
    u9_partB_0: [
      { labelTh: 'บอกกิจกรรมที่ทำเมื่อวานนี้ (Yesterday activity)', labelEn: 'Past action / Yesterday context', words: ['yesterday','last','went','worked','studied','stayed','watched','played','cooked','ate','had','saw','met','visited','walked','cleaned','read','bought','did','was','were','home','work','school','office','market','mall','movie','tv','dinner','lunch','friends','family'] }
    ],
    u9_partB_1: [
      { labelTh: 'บอกสถานที่หรือกิจกรรมช่วงสุดสัปดาห์ที่ผ่านมา (Last weekend)', labelEn: 'Last weekend place or activity', words: ['last','weekend','saturday','sunday','went','stayed','visited','was','were','had','ate','watched','played','shopped','cleaned','rested','slept','drove','traveled','home','mall','park','market','beach','cafe','restaurant','temple','cinema','movie','family','friends','parents'] }
    ],
    u9_partB_2: [
      { labelTh: 'เล่าเรื่องทริปหรือการเดินทางที่ผ่านมา (Last trip / Holiday)', labelEn: 'Past trip details', words: ['trip','holiday','vacation','last','year','month','went','traveled','visited','flew','drove','took','stayed','saw','ate','bought','was','were','had','fun','good','great','beautiful','nice','happy','beach','sea','mountain','chiang','mai','phuket','bangkok','pattaya','hua','hin','krabi','japan','hotel','food','photos','family','friends'] }
    ],
    u9_partC_0: [
      { labelTh: '1. ระบุสถานที่หรือช่วงเวลาในอดีต (Where & When in the past)', labelEn: 'Past time & destination', words: ['last','yesterday','weekend','month','year','holiday','vacation','trip','summer','winter','ago','went','traveled','visited','stayed','beach','sea','mountain','park','temple','city','province','chiang','mai','phuket','pattaya','hua','hin','bangkok','hotel','country','with','family','friends'] },
      { labelTh: '2. เล่าสิ่งที่ทำด้วยกริยาช่อง 2 (Past tense actions)', labelEn: 'Past activities (saw, ate, took, etc.)', words: ['went','saw','ate','had','took','bought','walked','swam','played','watched','visited','stayed','drove','flew','rode','met','talked','relaxed','enjoyed','photos','pictures','food','seafood','shopping','market','view','weather'] },
      { labelTh: '3. บอกความรู้สึกต่อประสบการณ์นั้น (Feelings / Impression)', labelEn: 'Past feeling (was/were + adjective)', words: ['was','were','felt','had','good','great','fun','wonderful','amazing','awesome','beautiful','nice','happy','excited','relaxed','delicious','fantastic','memorable','best','time','loved','liked','enjoyed'] }
    ],

    // ---------------- UNIT 10: Future Plans ----------------
    u10_partB_0: [
      { labelTh: 'โครงสร้างการบอกแผนในอนาคต (Going to / Will / Tonight)', labelEn: 'Future expression or tonight context', words: ['going','to','will','plan','want','tonight','evening','after','work','school','home','im','i'] },
      { labelTh: 'กิจกรรมที่จะทำคืนนี้ (Evening activity)', labelEn: 'Planned activity', words: ['eat','have','cook','dinner','watch','movie','tv','series','youtube','read','book','study','do','homework','exercise','play','game','talk','call','family','friends','relax','rest','sleep','early','shower'] }
    ],
    u10_partB_1: [
      { labelTh: 'โครงสร้างอนาคตหรือช่วงสุดสัปดาห์หน้า (Next weekend / Going to / Will)', labelEn: 'Future weekend marker', words: ['going','to','will','plan','next','this','weekend','saturday','sunday','tomorrow','want','would','like'] },
      { labelTh: 'กิจกรรมหรือสถานที่ที่จะไป (Planned place or action)', labelEn: 'Planned activity or destination', words: ['go','visit','stay','home','clean','wash','cook','eat','shop','shopping','mall','market','park','beach','cafe','restaurant','cinema','movie','see','meet','parents','family','friends','travel','rest','relax','exercise','play'] }
    ],
    u10_partB_2: [
      { labelTh: 'ระบุเป้าหมายหรือสถานที่ที่อยากไปในอนาคต (Future goal / Dream trip)', labelEn: 'Future goal or travel wish', words: ['want','would','like','hope','plan','going','to','will','future','next','year','someday','visit','travel','go','see','learn','study','speak','english','buy','house','car','save','money','healthy','new','job','japan','korea','europe','america','china','chiang','mai','phuket','beach','mountain'] }
    ],
    u10_partC_0: [
      { labelTh: '1. ใช้โครงสร้างบอกแผนในอนาคต (Going to / Will / Plan to / Want to)', labelEn: 'Future grammar marker', words: ['going','to','will','plan','planning','want','would','like','hope','tomorrow','tonight','next','this','weekend','week','month','year','holiday','vacation','future'] },
      { labelTh: '2. ระบุกิจกรรมหรือสถานที่ที่วางแผนไว้ (Planned activities & places)', labelEn: 'Planned activities or places', words: ['go','visit','travel','stay','meet','see','eat','cook','watch','play','study','learn','work','buy','clean','relax','rest','exercise','home','family','parents','friends','beach','mountain','park','mall','market','temple','cafe','movie','trip','english'] },
      { labelTh: '3. บอกเหตุผลหรือความตั้งใจ (Reason / Feeling / Goal)', labelEn: 'Reason, companion, or expectation', words: ['because','with','my','family','friends','fun','happy','relax','relaxing','excited','exciting','good','great','nice','beautiful','delicious','important','improve','better','enjoy','time','together'] }
    ],

    // ---------------- UNIT 11: Work & Jobs ----------------
    u11_partB_0: [
      { labelTh: 'ระบุอาชีพหรือสถานที่ทำงาน (Job / Occupation / Workplace)', labelEn: 'Job title or workplace', words: ['am','work','working','job','my','as','in','at','for','company','office','school','hospital','bank','store','shop','factory','hotel','restaurant','government','officer','staff','employee','worker','manager','engineer','teacher','student','doctor','nurse','accountant','sales','driver','chef','cook','it','computer','business','owner','freelance','telecom','nt','twp'] }
    ],
    u11_partB_1: [
      { labelTh: 'ระบุเวลาเริ่มงานหรือเลิกงาน (Work / Study hours)', labelEn: 'Start/finish work & time', words: ['start','begin','finish','end','leave','work','working','office','school','study','class','from','to','until','at','around','hour','hours','day', ...COMMON_TIME_WORDS] }
    ],
    u11_partB_2: [
      { labelTh: 'บอกสิ่งที่ชอบเกี่ยวกับงานหรือการเรียน (What you like about work/study)', labelEn: 'Positive aspect of work/study', words: ['like','love','enjoy','best','good','great','nice','interesting','fun','happy','job','work','study','because','colleagues','coworkers','friends','team','boss','manager','people','customers','help','helping','learn','learning','new','things','skills','office','near','home','salary','environment'] }
    ],
    u11_partC_0: [
      { labelTh: '1. แนะนำอาชีพและสถานที่ทำงาน (Job title & Workplace)', labelEn: 'Job & workplace', words: ['am','work','working','job','occupation','company','office','department','hospital','school','bank','store','hotel','factory','government','nt','twp','officer','employee','staff','manager','engineer','teacher','doctor','nurse','accountant','technician','sales','service','student'] },
      { labelTh: '2. อธิบายหน้าที่หรือสิ่งที่ทำในงาน (Daily duties & tasks)', labelEn: 'Job duties or schedule', words: ['do','make','help','check','write','send','email','emails','call','talk','speak','meet','customers','clients','people','team','computer','report','reports','data','system','project','manage','fix','teach','care','sell','service','start','finish','every','day'] },
      { labelTh: '3. บอกความรู้สึกต่ออาชีพหรืองานที่ทำ (Feelings about the job)', labelEn: 'Attitude toward the job', words: ['like','love','enjoy','proud','happy','good','great','interesting','important','useful','helpful','nice','friendly','colleagues','team','learn','because'] }
    ],

    // ---------------- UNIT 12: Skills & Abilities ----------------
    u12_partB_0: [
      { labelTh: 'การใช้ Can/Can\'t เพื่อบอกความสามารถ (Can + Skill/Ability)', labelEn: 'Ability marker (can) + verb', words: ['can','able','know','how','good','at','well','swim','cook','bake','drive','ride','car','bike','motorcycle','speak','english','thai','chinese','japanese','play','football','badminton','tennis','guitar','piano','music','sing','dance','draw','paint','use','computer','type','fix','run'] }
    ],
    u12_partB_1: [
      { labelTh: 'ตอบรับหรือปฏิเสธเรื่องการทำอาหาร/ว่ายน้ำ (Cook / Swim ability)', labelEn: 'Yes/No + can/can\'t + cook/swim', words: ['yes','no','can','cant','cannot','cook','swim','both','little','bit','very','well','good','food','rice','egg','noodles','pool','sea','water','learn','but'] }
    ],
    u12_partB_2: [
      { labelTh: 'ระบุทักษะที่อยากเรียนรู้เพิ่มเติม (Skill you want to learn)', labelEn: 'Want to learn + new skill', words: ['want','would','like','hope','plan','learn','study','practice','improve','how','to','speak','english','chinese','japanese','korean','language','cook','bake','swim','drive','play','guitar','piano','music','dance','sing','computer','coding','ai','photo','draw','tennis','golf','yoga'] }
    ],
    u12_partC_0: [
      { labelTh: '1. บอกสิ่งที่สามารถทำได้ดี (What you CAN do well)', labelEn: 'Things you can do (can + verb)', words: ['can','good','at','well','able','cook','swim','drive','ride','speak','english','use','computer','play','sport','football','badminton','guitar','piano','sing','dance','draw','work','help','make','fix'] },
      { labelTh: '2. บอกสิ่งที่ยังทำไม่ได้หรือทักษะที่อยากฝึกเพิ่ม (What you CAN\'T do or WANT to learn)', labelEn: 'Cannot do or want to learn', words: ['cant','cannot','not','very','good','but','want','would','like','learn','practice','improve','try','study','future','better','more','how','to','speak','swim','cook','drive','play','piano','guitar','english','language','new','skill'] }
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

    // Minimum meaningful words check
    const minWordsRequired = mode === 'challenge' ? 5 : 3;
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
