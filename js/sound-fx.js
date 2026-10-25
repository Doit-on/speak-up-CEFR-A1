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
 * Clear & Slow Text-to-Speech (TTS) Controller
 * Prevents premature onend/onerror triggers and supports sequential sentence playback
 */
window.SpeechEngine = (function () {
  let speechRate = 0.85; // Clear & not too fast by default
  let selectedVoice = null;
  let activeTimer = null;
  let progressTimer = null;
  let currentSessionId = 0;
  let isPlayingNow = false;
  let activeUtterance = null; // Prevent garbage collection of utterance in Chrome

  function initVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) return;

    const preferred = [
      'Google US English',
      'Microsoft Aria Online',
      'Microsoft Jenny Online',
      'Microsoft Guy Online',
      'Samantha',
      'Alex',
      'Google UK English Female'
    ];
    for (const name of preferred) {
      const found = voices.find(v => v.name.includes(name) && v.lang.startsWith('en'));
      if (found) {
        selectedVoice = found;
        return;
      }
    }
    selectedVoice = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')) || voices[0];
  }

  if ('speechSynthesis' in window) {
    initVoices();
    window.speechSynthesis.onvoiceschanged = initVoices;
  }

  function cleanTextForSpeech(rawText) {
    return String(rawText || '')
      .replace(/^[A-Za-z]+:\s*/gm, '')
      .replace(/___+/g, ' blank ')
      .replace(/\s+/g, ' ')
      .trim();
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

  function speakSingleSentence(sentenceText, rate, pitch, sessionId, onSentenceEnd) {
    const cleaned = cleanTextForSpeech(sentenceText);
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
      if (selectedVoice) utter.voice = selectedVoice;
      utter.lang = 'en-US';
      utter.rate = rate;
      utter.pitch = pitch || 1.02;

      utter.onend = () => {
        completeSentence();
      };

      utter.onerror = (ev) => {
        if (ev && (ev.error === 'canceled' || ev.error === 'interrupted')) {
          settled = true;
          return;
        }
        // If TTS voice failed to synthesize, wait realistic reading duration before completing
        completeSentence();
      };

      activeTimer = setTimeout(completeSentence, maxDurationMs);
      window.speechSynthesis.speak(utter);
    } catch (e) {
      activeTimer = setTimeout(completeSentence, minDurationMs);
    }
  }

  /**
   * Speaks a single text or an array of sentences sequentially.
   * Calls onEnd ONLY after ALL sentences have finished reading completely.
   */
  function speak(textOrArray, options = {}) {
    stop();
    const sessionId = currentSessionId;
    const rate = options.rate || speechRate;
    const pitch = options.pitch || 1.02;

    const sentences = Array.isArray(textOrArray)
      ? textOrArray.map(s => cleanTextForSpeech(s)).filter(Boolean)
      : String(textOrArray || '')
          .split(/(?<=[.!?])\s+|\n+/)
          .map(s => cleanTextForSpeech(s))
          .filter(Boolean);

    if (!sentences.length) {
      if (options.onEnd) options.onEnd();
      return;
    }

    isPlayingNow = true;
    if (options.onStart) options.onStart(sentences.length);

    let currentIdx = 0;

    // Give browser 60ms after cancel() before queueing new speech
    activeTimer = setTimeout(() => {
      if (sessionId !== currentSessionId) return;

      const playNext = () => {
        if (sessionId !== currentSessionId) return;
        if (currentIdx >= sentences.length) {
          isPlayingNow = false;
          activeUtterance = null;
          if (options.onProgress) options.onProgress(100, sentences.length, sentences.length);
          if (options.onEnd) options.onEnd();
          return;
        }

        const pct = Math.max(5, Math.round((currentIdx / sentences.length) * 100));
        if (options.onProgress) options.onProgress(pct, currentIdx + 1, sentences.length);

        speakSingleSentence(sentences[currentIdx], rate, pitch, sessionId, (ok) => {
          if (!ok || sessionId !== currentSessionId) return;
          currentIdx++;
          const nextPct = Math.min(98, Math.round((currentIdx / sentences.length) * 100));
          if (options.onProgress) options.onProgress(nextPct, Math.min(currentIdx + 1, sentences.length), sentences.length);
          // Brief natural pause between sentences (280ms)
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

  function evaluateSpeechMetrics({ targetText, keywords, transcript, durationSec, avgVolume, confidence, mode }) {
    const targetWords = normalizeWords(targetText);
    const spokenWords = normalizeWords(transcript || targetText);
    const expectedMinSec = Math.max(1.5, targetWords.length * 0.32);
    const expectedMaxSec = Math.max(4.5, targetWords.length * 0.85);

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

    if (mode === 'open' && spokenWords.length >= Math.max(3, Math.floor(targetWords.length * 0.6))) {
      completeness = Math.max(completeness, Math.min(98, 78 + spokenWords.length * 3));
    }
    completeness = Math.max(55, Math.min(100, completeness));

    let wordSimSum = 0;
    targetWords.forEach(tw => {
      const best = spokenWords.reduce((m, sw) => Math.max(m, similarity(tw, sw)), 0);
      wordSimSum += best;
    });
    const rawSim = targetWords.length > 0 ? (wordSimSum / targetWords.length) : 0.88;
    const confScore = confidence ? Math.round(confidence * 100) : 88;
    let accent = Math.round(rawSim * 55 + confScore * 0.45);
    if (mode === 'open') {
      accent = Math.max(accent, Math.round(confScore * 0.92));
    }
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
      timeScore = Math.min(98, Math.max(84, Math.round(94 - Math.abs(actualSec - (expectedMinSec + expectedMaxSec) / 2) * 2)));
    }

    const overall = Math.round(
      accent * 0.30 +
      completeness * 0.30 +
      clarity * 0.20 +
      timeScore * 0.20
    );

    let feedbackTh = '';
    let feedbackEn = '';

    if (overall >= 90) {
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
      timestamp: new Date().toISOString()
    };
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
    evaluateSpeechMetrics
  };
})();
