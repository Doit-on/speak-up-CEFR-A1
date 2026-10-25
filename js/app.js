/**
 * Speak Up! CEFR A1 — Main Application Controller
 * Supports 12 Units, 4 Activities/Unit, Red-Text Gating, 4-Metric Speech Evaluation,
 * LocalStorage Persistence, Bilingual TH/EN, Group QR Sync, Email Reporting & Self-Diagnostics.
 */

window.SpeakUpApp = (function () {
  const STORAGE_KEY = "speakup_a1_progress_v1";

  let state = {
    lang: "th",
    unitId: 1,
    activityId: 1,
    act3Step: 0,
    act4Part: "A",
    studentName: "",
    studentEmail: "",
    roomCode: "CLASS-A1",
    vocabOpen: false,
    progress: {} // unitId -> { act1Unlocked, act1Score, act2Answers, act2Score, act3Answers, act3Score, act4Scores, act4Transcripts, redUnlocked: {} }
  };

  const I18N = {
    th: {
      appSubtitle: "ระบบฝึกฟัง-พูดภาษาอังกฤษ 12 Units • สไตล์มินิมอลอนิเมะ (LocalStorage Edition)",
      storageStatus: "บันทึกอัตโนมัติ (LocalStorage)",
      groupBtn: "เข้ากลุ่ม (QR)",
      scoreBtn: "สรุปคะแนน & ส่งเมล",
      diagBtn: "ตรวจสอบระบบ",
      selectUnit: "เลือกบทเรียน (12 Units):",
      vocabBtn: "คำศัพท์ประจำบท & ฝึกออกเสียง",
      speedLabel: "ความเร็วเสียง:",
      spdSlow: "ช้า (0.75x)",
      spdClear: "ชัดเจน (0.85x)",
      spdNormal: "ปกติ (1.0x)",
      guideTitle: "🕵️‍♂️ นักสืบเคนจิ (ผู้ช่วยแนะนำการทำแบบฝึกหัด)",
      redRuleBadge: "✨ กฎเหล็ก: ต้องฟังเสียงก่อน ข้อความสีแดงจึงจะแสดง!",
      act1TabSub: "ฟังจบจึงแสดง Text สีแดง",
      act2TabSub: "ตอบก่อนจึงแสดงโจทย์สีแดง",
      act3TabSub: "ฟัง Passage & ทำทีละข้อ",
      act4TabSub: "อัดเสียง & ประเมินพูด 4 ด้าน",
      listenFirstLock: "🔒 ซ่อนข้อความสีแดง — กรุณากดฟังเสียงให้จบก่อน",
      unlockedBadge: "✅ ปลดล็อกข้อความสีแดงแล้ว! ฝึกฟังและพูดตามได้เลย",
      playStoryBtn: "กดเพื่อฟังเสียงเนื้อเรื่อง (Listen)",
      unlockDemoBtn: "⏩ ข้ามไปดูข้อความสีแดง (สำหรับทบทวน)",
      repeatPhraseTitle: "🗣️ Listen and repeat each phrase (คลิกฟังทีละประโยคและฝึกออกเสียงตาม)",
      listenBtn: "🔊 ฟังเสียง",
      recordBtn: "🎙️ อัดเสียงพูด",
      stopRecordBtn: "⏹️ หยุดอัดเสียง",
      playMyVoiceBtn: "▶️ ฟังเสียงตัวเอง",
      act2ListenQ: "🔊 กดฟังคำถามข้อที่",
      act2LockedText: "🔒 (ข้อความคำถามสีแดงจะแสดงหลังจากที่คุณเลือกคำตอบแล้ว)",
      act3PlayPassage: "🔊 ฟังเสียงอ่าน Passage",
      act3StepLabel: "ลำดับข้อปัจจุบัน (ต้องเลือกคำตอบก่อนไปข้อถัดไป):",
      act3NextBtn: "ข้อต่อไป (Next) →",
      act3PrevBtn: "← ข้อก่อนหน้า",
      partATitle: "Part A: Listen and repeat the sentences (ฟังเสียงอ่านแล้วเว้นให้พูดตาม)",
      partASub: "กดฟังเสียงต้นฉบับก่อนเพื่อเปิดข้อความสีแดง จากนั้นกดอัดเสียงพูดตามและฟังเสียงตัวเอง",
      partBTitle: "Part B: Talk About Yourself (ฟังคำถาม → ตัวอย่างคำตอบ → คำถามอีกครั้ง → อัดเสียงตอบ)",
      partBAutoBtn: "▶️ เล่นลำดับเสียงอัตโนมัติ (คำถาม → ตัวอย่าง → ถามซ้ำ)",
      partCTitle: "Part C: Speaking Challenge (ฟังเสียงตัวอย่าง แล้วกดพูดอัดเสียงของคุณเอง)",
      evalHeader: "📊 ผลประเมินการพูดตามมาตรฐาน 4 ด้าน (คิดเป็น % จาก 100%)",
      metricAccent: "1. สำเนียงและการออกเสียง (Accent)",
      metricComplete: "2. ความครบถ้วนของเนื้อหา (Completeness)",
      metricClarity: "3. ความชัดเจนของเสียง (Clarity)",
      metricTime: "4. เวลาและจังหวะการพูด (Speaking Time)",
      recPrompt: "กดปุ่มไมโครโฟนเพื่อเริ่มพูด ระบบจะประเมินคะแนนทั้ง 4 ด้านพร้อมคำแนะนำทันที"
    },
    en: {
      appSubtitle: "12-Unit Interactive English Listening & Speaking Platform (LocalStorage Edition)",
      storageStatus: "Auto-Saved (LocalStorage)",
      groupBtn: "Group QR",
      scoreBtn: "Scores & Email",
      diagBtn: "Self-Check",
      selectUnit: "Select Unit (1–12):",
      vocabBtn: "Vocabulary & Listen",
      speedLabel: "Voice Speed:",
      spdSlow: "Slow (0.75x)",
      spdClear: "Clear (0.85x)",
      spdNormal: "Normal (1.0x)",
      guideTitle: "🕵️‍♂️ Detective Kenji (Your Activity Guide)",
      redRuleBadge: "✨ Golden Rule: Listen to the audio first to reveal Red Text!",
      act1TabSub: "Listen to unlock Red Text",
      act2TabSub: "Answer to reveal Red Question",
      act3TabSub: "Listen & complete step-by-step",
      act4TabSub: "Record & 4-Metric AI Evaluation",
      listenFirstLock: "🔒 Red Text Hidden — Please listen to the audio until the end first",
      unlockedBadge: "✅ Red Text Unlocked! Practice listening & repeating each phrase",
      playStoryBtn: "Play Audio Passage (Listen)",
      unlockDemoBtn: "⏩ Reveal Red Text (Review Mode)",
      repeatPhraseTitle: "🗣️ Listen and repeat each phrase (Click any sentence to listen & practice)",
      listenBtn: "🔊 Listen",
      recordBtn: "🎙️ Record Voice",
      stopRecordBtn: "⏹️ Stop Recording",
      playMyVoiceBtn: "▶️ Listen to My Voice",
      act2ListenQ: "🔊 Listen to Question",
      act2LockedText: "🔒 (Red question text will appear after you select an answer)",
      act3PlayPassage: "🔊 Listen to Passage Audio",
      act3StepLabel: "Current Question (Select an answer to unlock Next):",
      act3NextBtn: "Next Question →",
      act3PrevBtn: "← Previous",
      partATitle: "Part A: Listen and repeat the sentences (Listen, pause, and repeat)",
      partASub: "Listen to each sentence first to reveal Red Text, then record and listen to your own voice.",
      partBTitle: "Part B: Talk About Yourself (Question → Sample Answer → Question Again → Record)",
      partBAutoBtn: "▶️ Play Full Sequence (Question → Sample → Question Again)",
      partCTitle: "Part C: Speaking Challenge (Listen to sample, then record your own speech)",
      evalHeader: "📊 4-Standard Speaking Evaluation (% out of 100%)",
      metricAccent: "1. Accent & Pronunciation",
      metricComplete: "2. Content Completeness",
      metricClarity: "3. Voice Clarity",
      metricTime: "4. Speaking Time & Pace",
      recPrompt: "Click Record to speak. The system evaluates Accent, Completeness, Clarity, and Time (%)."
    }
  };

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.th[key] || key;
  }

  function ensureUnitProgress(uId) {
    if (!state.progress[uId]) {
      state.progress[uId] = {
        act1Unlocked: false,
        act1Score: 0,
        act2Answers: {},
        act2Score: 0,
        act3Answers: {},
        act3Score: 0,
        act4Evals: {}, // itemKey -> evaluation result object
        act4Score: 0,
        redUnlocked: {} // itemKey -> boolean
      };
    }
    return state.progress[uId];
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = Object.assign(state, parsed);
      }
    } catch (e) {}

    // Check URL parameters for Group QR / GitHub Pages link sharing (?unit=3&room=ROOM-101&lang=en)
    const params = new URLSearchParams(window.location.search);
    if (params.get("unit")) {
      const u = parseInt(params.get("unit"), 10);
      if (u >= 1 && u <= 12) state.unitId = u;
    }
    if (params.get("room")) {
      state.roomCode = params.get("room").toUpperCase();
    }
    if (params.get("lang") === "en" || params.get("lang") === "th") {
      state.lang = params.get("lang");
    }

    for (let i = 1; i <= 12; i++) ensureUnitProgress(i);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        lang: state.lang,
        unitId: state.unitId,
        studentName: state.studentName,
        studentEmail: state.studentEmail,
        roomCode: state.roomCode,
        progress: state.progress
      }));
    } catch (e) {}
    updateScoreBadges();
  }

  function getCurrentUnit() {
    return window.SPEAKUP_UNITS.find(u => u.id === Number(state.unitId)) || window.SPEAKUP_UNITS[0];
  }

  function getUnitTotalScore(uId) {
    const p = ensureUnitProgress(uId);
    return Math.round((p.act1Score + p.act2Score + p.act3Score + p.act4Score) / 4);
  }

  function getAllUnitsSummary() {
    let sum = 0;
    let completedUnits = 0;
    for (let i = 1; i <= 12; i++) {
      const s = getUnitTotalScore(i);
      sum += s;
      const p = ensureUnitProgress(i);
      if (p.act1Score > 0 && p.act2Score > 0 && p.act3Score > 0 && p.act4Score > 0) {
        completedUnits++;
      }
    }
    return {
      averageScore: Math.round(sum / 12),
      completedUnits
    };
  }

  function recalculateAct4Score(uId) {
    const unit = window.SPEAKUP_UNITS.find(u => u.id === Number(uId));
    const p = ensureUnitProgress(uId);
    const evalValues = Object.values(p.act4Evals || {});
    if (!evalValues.length) {
      p.act4Score = 0;
      return;
    }
    const avg = evalValues.reduce((acc, ev) => acc + (ev.overall || 0), 0) / evalValues.length;
    p.act4Score = Math.round(avg);
  }

  function updateScoreBadges() {
    const uId = state.unitId;
    const p = ensureUnitProgress(uId);
    const unitScore = getUnitTotalScore(uId);
    const allSummary = getAllUnitsSummary();

    const setEl = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };

    setEl("score-act1", `${p.act1Score}%`);
    setEl("score-act2", `${p.act2Score}%`);
    setEl("score-act3", `${p.act3Score}%`);
    setEl("score-act4", `${p.act4Score}%`);
    setEl("header-unit-score", `Unit ${uId}: ${unitScore}% (${allSummary.completedUnits}/12 Units)`);
    setEl("room-badge-label", `${t("groupBtn")}: ${state.roomCode}`);
  }

  function updateGuideMessage() {
    const unit = getCurrentUnit();
    const act = state.activityId;
    const guideEl = document.getElementById("guide-message");
    if (!guideEl) return;

    const msgsTh = {
      1: `"ยินดีต้อนรับสู่ <b>${unit.title}</b> ครับ! ใน <b>Activity 1 (${unit.activity1.heading})</b> ให้กดปุ่มฟังเสียงเรื่องราวจนจบก่อน แล้ว <b>ข้อความสีแดง</b> จะเปิดออกพร้อมโหมดฝึกพูดตามทีละประโยคครับ!"`,
      2: `"ใน <b>Activity 2: Check Your Understanding</b> ให้กดฟังเสียงคำถามแล้ว <b>เลือกคำตอบ a, b หรือ c ก่อน</b> จากนั้นระบบจะแสดงโจทย์ตัวอักษร <b>สีแดง</b> พร้อมเฉลยครับ!"`,
      3: `"ใน <b>Activity 3: Listen Again & Complete</b> กดฟังเสียงอ่าน Passage แล้วเลือกคำตอบเติมในช่องว่าง <b>ทีละข้อ</b> (ต้องตอบข้อปัจจุบันก่อนจึงจะกดไปข้อถัดไปได้ครับ)"`,
      4: `"ใน <b>Activity 4: Speak Up!</b> มีครบทั้ง <b>Part A, Part B และ Part C</b> กดฟังเสียงก่อนเพื่อเปิดข้อความสีแดง แล้วกดไมโครโฟนเพื่ออัดเสียงพูดและฟังเสียงตัวเอง ระบบจะประเมิน <b>สำเนียง, ความครบถ้วน, ความชัดเจน และเวลาพูด</b> ออกมาเป็น % พร้อมคำแนะนำครับ!"`
    };

    const msgsEn = {
      1: `"Welcome to <b>${unit.title}</b>! In <b>Activity 1 (${unit.activity1.heading})</b>, listen to the full passage first. Once finished, the <b>Red Text</b> and phrase-by-phrase practice will unlock!"`,
      2: `"In <b>Activity 2: Check Your Understanding</b>, listen to each question and <b>select your answer first</b> to reveal the <b>Red Question Text</b>!"`,
      3: `"In <b>Activity 3: Listen Again & Complete</b>, listen to the passage and complete each sentence <b>step-by-step</b>."`,
      4: `"In <b>Activity 4: Speak Up! (Parts A, B, C)</b>, listen to unlock the Red Text, record your voice, listen to your playback, and get a <b>4-metric score (%)</b> with feedback!"`
    };

    guideEl.innerHTML = state.lang === "th" ? msgsTh[act] : msgsEn[act];
  }

  // =========================================================================
  // RENDER UNIT HEADER & VOCABULARY
  // =========================================================================
  function renderUnitSelectorAndVocab() {
    const select = document.getElementById("unit-select");
    if (select) {
      select.innerHTML = window.SPEAKUP_UNITS.map(u => {
        const uScore = getUnitTotalScore(u.id);
        const flag = uScore >= 80 ? "✅" : uScore > 0 ? "⏳" : "📘";
        const label = state.lang === "th" ? `${u.title} — ${u.titleTh}` : u.title;
        return `<option value="${u.id}" ${u.id === Number(state.unitId) ? "selected" : ""}>${flag} ${label} (${uScore}%)</option>`;
      }).join("");
    }

    const unit = getCurrentUnit();
    const goalsList = document.getElementById("learning-goals-list");
    if (goalsList) {
      goalsList.innerHTML = unit.learningGoals.map(g => `<li class="flex items-center gap-1.5"><span>✨</span><span>${g}</span></li>`).join("");
    }

    const vocabGrid = document.getElementById("vocab-grid");
    if (vocabGrid) {
      vocabGrid.innerHTML = unit.vocabulary.map((v, idx) => `
        <div class="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between gap-2 hover:bg-sky-100/60 transition">
          <div>
            <p class="font-bold text-sm text-slate-800">${v.word} <span class="font-medium text-xs text-sky-700">(${v.meaning})</span></p>
            <p class="text-xs text-slate-600 italic mt-0.5">"${v.example}"</p>
          </div>
          <button onclick="SpeakUpApp.speakVocab(${idx})" class="px-2.5 py-1.5 rounded-xl bg-white text-sky-700 border border-sky-200 text-xs font-bold shadow-sm hover:bg-sky-50 flex-shrink-0">
            🔊 ${state.lang === "th" ? "ฟัง" : "Listen"}
          </button>
        </div>
      `).join("");
    }
  }

  // =========================================================================
  // RENDER ACTIVITY 1: LISTEN TO THE STORY (RED TEXT AFTER LISTENING)
  // =========================================================================
  function renderActivity1() {
    const unit = getCurrentUnit();
    const p = ensureUnitProgress(unit.id);
    const a1 = unit.activity1;
    const container = document.getElementById("panel-1");
    if (!container) return;

    const formattedPassage = a1.passage
      .split("\n")
      .map(line => `<p class="mb-2">${line}</p>`)
      .join("");

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-rose-500 uppercase">Activity 1 • ${a1.heading}</span>
          <h2 class="text-lg font-bold text-slate-900">${unit.themeIcon} ${a1.title}</h2>
          <p class="text-xs text-slate-500">${a1.headingTh}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold ${p.act1Unlocked ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}">
          ${p.act1Unlocked ? t("unlockedBadge") : t("listenFirstLock")}
        </span>
      </div>

      <!-- Audio Player Bar -->
      <div class="bg-gradient-to-r from-indigo-50 via-sky-50 to-rose-50 p-4 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3.5 w-full sm:w-auto">
          <button onclick="SpeakUpApp.playAct1Passage()" id="act1-play-btn" class="w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-2xl shadow-md transition flex-shrink-0">
            ▶️
          </button>
          <div class="flex-1">
            <p class="font-bold text-sm text-indigo-950">${t("playStoryBtn")}: "${a1.title}"</p>
            <p class="text-xs text-slate-600">${state.lang === "th" ? "เสียงอ่านชัดเจน ไม่เร็วเกินไป • ฟังจนจบเพื่อแสดงข้อความสีแดง" : "Clear & steady voice • Listen until the end to reveal Red Text"}</p>
            <div class="w-full sm:w-72 h-2.5 bg-white rounded-full overflow-hidden mt-2 border border-indigo-200">
              <div id="act1-progress-bar" class="h-full bg-gradient-to-r from-indigo-500 to-rose-500 transition-all duration-200" style="width: ${p.act1Unlocked ? "100%" : "0%"}"></div>
            </div>
          </div>
        </div>

        ${!p.act1Unlocked ? `
          <button onclick="SpeakUpApp.unlockAct1Now()" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 text-slate-600 border border-slate-200 hover:bg-white transition">
            ${t("unlockDemoBtn")}
          </button>
        ` : `
          <button onclick="SpeakUpApp.switchActivity(2)" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition">
            ${state.lang === "th" ? "ไปทำ Activity 2 ต่อ →" : "Continue to Activity 2 →"}
          </button>
        `}
      </div>

      ${!p.act1Unlocked ? `
        <div class="p-8 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/40 text-center space-y-2">
          <div class="text-4xl">🎧🔒</div>
          <p class="font-bold text-sm text-rose-800">${state.lang === "th" ? "เนื้อหาตัวอักษรสีแดงถูกซ่อนไว้จนกว่าจะฟังเสียงจบ" : "Red Text passage is hidden until you finish listening to the audio"}</p>
          <p class="text-xs text-rose-600">${state.lang === "th" ? "กดปุ่ม ▶️ ด้านบนเพื่อตั้งใจฟังเนื้อเรื่องรอบแรก" : "Click ▶️ above to listen carefully to the story first"}</p>
        </div>
      ` : `
        <div class="space-y-4 fade-in">
          <!-- Revealed Red Text Passage -->
          <div class="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-2 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold text-rose-700 uppercase">📖 เนื้อหาที่ปลดล็อกแล้ว (ตัวสีแดง = มีเสียงอ่านออกเสียง)</span>
              <button onclick="SpeakUpApp.playAct1Passage()" class="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">
                🔊 ${state.lang === "th" ? "ฟังทั้งเรื่องอีกครั้ง" : "Listen Again"}
              </button>
            </div>
            <h3 class="text-base font-extrabold red-voice-text">${a1.title}</h3>
            <div class="text-sm sm:text-base font-semibold red-voice-text leading-relaxed">
              ${formattedPassage}
            </div>
          </div>

          <!-- Listen and Repeat Each Phrase -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 class="text-xs font-bold text-indigo-900 uppercase">${t("repeatPhraseTitle")}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              ${a1.phrases.map((phrase, idx) => `
                <div class="p-3 rounded-xl bg-white border border-rose-200 flex items-center justify-between gap-2 shadow-sm hover:border-rose-400 transition">
                  <span class="text-xs sm:text-sm font-bold red-voice-text">${idx + 1}. ${phrase}</span>
                  <button onclick="SpeakUpApp.speakPhraseIndex(${idx})" class="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold flex-shrink-0">
                    ${t("listenBtn")}
                  </button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `}
    `;
  }

  // =========================================================================
  // RENDER ACTIVITY 2: CHECK YOUR UNDERSTANDING (RED TEXT AFTER ANSWERING)
  // =========================================================================
  function renderActivity2() {
    const unit = getCurrentUnit();
    const p = ensureUnitProgress(unit.id);
    const questions = unit.activity2;
    const container = document.getElementById("panel-2");
    if (!container) return;

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-rose-500 uppercase">Activity 2 • Check Your Understanding</span>
          <h2 class="text-lg font-bold text-slate-900">${state.lang === "th" ? "ฟังเสียงคำถาม แล้วเลือกคำตอบ (โจทย์ตัวสีแดงจะแสดงหลังจากเลือกคำตอบแล้ว)" : "Listen to each question and choose an answer to reveal the Red Question Text"}</h2>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
          Score: ${p.act2Score}%
        </span>
      </div>

      <div class="space-y-4">
        ${questions.map((qObj, qIdx) => {
          const chosen = p.act2Answers[qIdx];
          const hasAnswered = chosen !== undefined;
          const isCorrect = chosen === qObj.answerIndex;

          return `
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2.5 flex-wrap">
                  <button onclick="SpeakUpApp.speakAct2Question(${qIdx})" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
                    ${t("act2ListenQ")} ${qIdx + 1}
                  </button>
                  ${hasAnswered ? `
                    <span class="text-sm sm:text-base font-extrabold red-voice-text fade-in">
                      ${qIdx + 1}. ${qObj.question}
                    </span>
                  ` : `
                    <span class="text-xs font-semibold text-slate-400 italic">
                      ${t("act2LockedText")}
                    </span>
                  `}
                </div>
                ${hasAnswered ? `
                  <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}">
                    ${isCorrect ? "✅ Correct!" : `💡 Answer: ${qObj.options[qObj.answerIndex]}`}
                  </span>
                ` : ""}
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                ${qObj.options.map((opt, oIdx) => {
                  let btnCls = "p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 text-left text-xs sm:text-sm font-semibold transition";
                  if (hasAnswered) {
                    if (oIdx === qObj.answerIndex) {
                      btnCls = "p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 text-left text-xs sm:text-sm font-bold";
                    } else if (oIdx === chosen) {
                      btnCls = "p-3 rounded-xl border-2 border-rose-400 bg-rose-50 text-rose-900 text-left text-xs sm:text-sm font-bold";
                    } else {
                      btnCls = "p-3 rounded-xl border border-slate-200 bg-white/60 text-slate-400 text-left text-xs sm:text-sm";
                    }
                  }
                  return `
                    <button onclick="SpeakUpApp.answerAct2(${qIdx}, ${oIdx})" class="${btnCls}">
                      ${opt}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // =========================================================================
  // RENDER ACTIVITY 3: LISTEN AGAIN & COMPLETE (STEP-BY-STEP)
  // =========================================================================
  function renderActivity3() {
    const unit = getCurrentUnit();
    const p = ensureUnitProgress(unit.id);
    const items = unit.activity3;
    const container = document.getElementById("panel-3");
    if (!container) return;

    if (state.act3Step >= items.length) state.act3Step = 0;
    const step = state.act3Step;
    const curItem = items[step];
    const chosen = p.act3Answers[step];
    const hasAnswered = chosen !== undefined;
    const isCorrect = chosen === curItem.answerIndex;

    const highlightedSentence = curItem.sentence.replace(
      "___",
      hasAnswered
        ? `<span class="px-2 py-0.5 rounded bg-rose-100 red-voice-text font-extrabold underline">${curItem.options[curItem.answerIndex].replace(/^[a-c]\)\s*/, "")}</span>`
        : `<span class="px-3 py-0.5 rounded bg-rose-50 red-voice-text font-bold underline">___</span>`
    );

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-rose-500 uppercase">Activity 3 • Listen Again and Complete the Sentence</span>
          <h2 class="text-lg font-bold text-slate-900">${state.lang === "th" ? "ฟังเสียงอ่าน Passage แล้วเลือกคำตอบทีละข้อ" : "Listen to the passage and complete each sentence step-by-step"}</h2>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="SpeakUpApp.playAct1Passage()" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm">
            ${t("act3PlayPassage")}
          </button>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            Score: ${p.act3Score}%
          </span>
        </div>
      </div>

      <!-- Stepper Progress Dots -->
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-500">${t("act3StepLabel")}</span>
          ${items.map((_, idx) => {
            const ans = p.act3Answers[idx];
            let dotCls = "w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition ";
            if (idx === step) {
              dotCls += "bg-indigo-600 text-white ring-4 ring-indigo-100";
            } else if (ans !== undefined) {
              dotCls += ans === items[idx].answerIndex ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-rose-100 text-rose-800 border border-rose-300";
            } else {
              dotCls += "bg-slate-100 text-slate-400";
            }
            return `<button onclick="SpeakUpApp.jumpAct3Step(${idx})" class="${dotCls}">${idx + 1}</button>`;
          }).join("")}
        </div>
      </div>

      <!-- Current Question Card -->
      <div class="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4 fade-in">
        <p class="text-base sm:text-lg font-bold text-slate-800">
          ${highlightedSentence}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${curItem.options.map((opt, oIdx) => {
            let btnCls = "p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 font-semibold text-sm text-left transition";
            if (hasAnswered) {
              if (oIdx === curItem.answerIndex) {
                btnCls = "p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold text-sm text-left";
              } else if (oIdx === chosen) {
                btnCls = "p-3.5 rounded-xl border-2 border-rose-400 bg-rose-50 text-rose-900 font-bold text-sm text-left";
              } else {
                btnCls = "p-3.5 rounded-xl border border-slate-200 bg-white/60 text-slate-400 text-sm text-left";
              }
            }
            return `<button onclick="SpeakUpApp.answerAct3(${step}, ${oIdx})" class="${btnCls}">${opt}</button>`;
          }).join("")}
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-indigo-100">
          <div>
            ${hasAnswered ? `
              <span class="text-xs font-bold ${isCorrect ? "text-emerald-700" : "text-rose-700"}">
                ${isCorrect
                  ? (state.lang === "th" ? "✅ ถูกต้อง! กดไปข้อต่อไปได้เลย" : "✅ Correct! Click Next Question")
                  : (state.lang === "th" ? `💡 คำตอบที่ถูกคือ ${curItem.options[curItem.answerIndex]}` : `💡 Correct answer: ${curItem.options[curItem.answerIndex]}`)}
              </span>
            ` : `
              <span class="text-xs text-slate-500">${state.lang === "th" ? "กรุณาเลือกคำตอบเพื่อปลดล็อกปุ่มข้อต่อไป" : "Select an answer to unlock Next Question"}</span>
            `}
          </div>

          <div class="flex items-center gap-2">
            ${step > 0 ? `
              <button onclick="SpeakUpApp.jumpAct3Step(${step - 1})" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                ${t("act3PrevBtn")}
              </button>
            ` : ""}

            ${step < items.length - 1 ? `
              <button onclick="SpeakUpApp.jumpAct3Step(${step + 1})" ${!hasAnswered ? "disabled" : ""} class="px-4 py-2 rounded-xl text-xs font-bold transition ${hasAnswered ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" : "bg-slate-200 text-slate-400 cursor-not-allowed"}">
                ${t("act3NextBtn")}
              </button>
            ` : `
              <button onclick="SpeakUpApp.switchActivity(4)" ${!hasAnswered ? "disabled" : ""} class="px-4 py-2 rounded-xl text-xs font-bold transition ${hasAnswered ? "bg-rose-600 hover:bg-rose-700 text-white shadow-sm" : "bg-slate-200 text-slate-400 cursor-not-allowed"}">
                ${state.lang === "th" ? "ไปทำ Activity 4: Speak Up! →" : "Go to Activity 4: Speak Up! →"}
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // RENDER ACTIVITY 4: SPEAK UP! (PARTS A, B, C + 4-METRIC EVALUATOR)
  // =========================================================================
  function renderSpeakingItemCard({ itemKey, titleLabel, listenText, redDisplayHtml, targetSpeechText, keywords, mode, extraButtonsHtml }) {
    const unit = getCurrentUnit();
    const p = ensureUnitProgress(unit.id);
    const isRedUnlocked = !!p.redUnlocked[itemKey];
    const ev = p.act4Evals[itemKey];
    const hasAudio = window.VoiceEvaluator.hasRecording(itemKey);

    return `
      <div class="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 space-y-3 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold">${titleLabel}</span>
            <button onclick="SpeakUpApp.listenAndUnlockRed('${itemKey}', ${JSON.stringify(listenText).replace(/"/g, '&quot;')})" class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm">
              ${t("listenBtn")}
            </button>
            ${extraButtonsHtml || ""}
          </div>

          <div class="flex items-center gap-2">
            <button id="rec-btn-${itemKey}" onclick="SpeakUpApp.recordItem('${itemKey}', ${JSON.stringify(targetSpeechText).replace(/"/g, '&quot;')}, ${JSON.stringify(keywords || []).replace(/"/g, '&quot;')}, '${mode}')" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1">
              ${t("recordBtn")}
            </button>
            <button onclick="SpeakUpApp.playMyRecording('${itemKey}', ${JSON.stringify(ev ? ev.transcript : targetSpeechText).replace(/"/g, '&quot;')})" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold ${hasAudio || ev ? "" : "opacity-60"}">
              ${t("playMyVoiceBtn")}
            </button>
          </div>
        </div>

        <!-- Condition: Listen first before showing Red Text -->
        <div class="p-3 rounded-xl bg-white border ${isRedUnlocked ? "border-rose-200" : "border-dashed border-slate-200"}">
          ${isRedUnlocked ? `
            <div class="fade-in space-y-1">
              ${redDisplayHtml}
            </div>
          ` : `
            <p class="text-xs font-semibold text-slate-400 italic">
              🔒 ${state.lang === "th" ? "กดปุ่ม 🔊 ฟังเสียงด้านบนให้จบก่อน จึงจะแสดงประโยคข้อความสีแดง" : "Click 🔊 Listen above first to reveal the Red Text sentence"}
            </p>
          `}
        </div>

        <!-- 4-Standard Speech Evaluation Result (% from 100%) -->
        ${ev ? `
          <div class="p-3.5 rounded-2xl bg-white border-2 border-indigo-100 space-y-3 fade-in">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span class="text-xs font-bold text-indigo-900">${t("evalHeader")}</span>
                <p class="text-xs text-slate-500">Transcript: <i class="text-slate-700 font-medium">"${ev.transcript}"</i></p>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-xl bg-indigo-600 text-white font-extrabold text-sm shadow-sm">
                  Total: ${ev.overall}%
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
              <div class="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <div class="flex justify-between font-bold text-indigo-900 mb-1">
                  <span>${t("metricAccent")}</span>
                  <span>${ev.accent}%</span>
                </div>
                <div class="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div class="bg-indigo-500 h-full rounded-full" style="width:${ev.accent}%"></div>
                </div>
              </div>

              <div class="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div class="flex justify-between font-bold text-emerald-900 mb-1">
                  <span>${t("metricComplete")}</span>
                  <span>${ev.completeness}%</span>
                </div>
                <div class="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div class="bg-emerald-500 h-full rounded-full" style="width:${ev.completeness}%"></div>
                </div>
              </div>

              <div class="p-2.5 rounded-xl bg-sky-50/60 border border-sky-100">
                <div class="flex justify-between font-bold text-sky-900 mb-1">
                  <span>${t("metricClarity")}</span>
                  <span>${ev.clarity}%</span>
                </div>
                <div class="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div class="bg-sky-500 h-full rounded-full" style="width:${ev.clarity}%"></div>
                </div>
              </div>

              <div class="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <div class="flex justify-between font-bold text-amber-900 mb-1">
                  <span>${t("metricTime")}</span>
                  <span>${ev.timeScore}% (${ev.durationSec}s)</span>
                </div>
                <div class="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div class="bg-amber-500 h-full rounded-full" style="width:${ev.timeScore}%"></div>
                </div>
              </div>
            </div>

            <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
              💡 <b>${state.lang === "th" ? "คำแนะนำ:" : "Recommendation:"}</b> ${state.lang === "th" ? ev.feedbackTh : ev.feedbackEn}
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderActivity4() {
    const unit = getCurrentUnit();
    const p = ensureUnitProgress(unit.id);
    const a4 = unit.activity4;
    const container = document.getElementById("panel-4");
    if (!container) return;

    let partContentHtml = "";

    if (state.act4Part === "A") {
      partContentHtml = `
        <div class="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200">
          <p class="text-xs sm:text-sm font-bold text-rose-800">${t("partATitle")}</p>
          <p class="text-xs text-slate-600 mt-0.5">${t("partASub")}</p>
        </div>
        <div class="space-y-3">
          ${a4.partA.map((sentence, idx) =>
            renderSpeakingItemCard({
              itemKey: `u${unit.id}_partA_${idx}`,
              titleLabel: `Part A • #${idx + 1}`,
              listenText: sentence,
              redDisplayHtml: `<p class="text-sm sm:text-base font-extrabold red-voice-text">"${sentence}"</p>`,
              targetSpeechText: sentence,
              keywords: sentence.split(" "),
              mode: "repeat"
            })
          ).join("")}
        </div>
      `;
    } else if (state.act4Part === "B") {
      partContentHtml = `
        <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
          <p class="text-xs sm:text-sm font-bold text-indigo-900">${t("partBTitle")}</p>
          <p class="text-xs red-voice-text font-semibold">${a4.partB.instruction}</p>
        </div>
        <div class="space-y-3">
          ${a4.partB.items.map((item, idx) => {
            const itemKey = `u${unit.id}_partB_${idx}`;
            const seqBtn = `
              <button onclick="SpeakUpApp.playPartBSequence('${itemKey}', ${JSON.stringify(item.question).replace(/"/g, '&quot;')}, ${JSON.stringify(item.sample).replace(/"/g, '&quot;')})" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm">
                ${t("partBAutoBtn")}
              </button>
            `;
            const redHtml = `
              <p class="text-sm font-extrabold red-voice-text">Q${idx + 1}: ${item.question}</p>
              <p class="text-xs sm:text-sm font-semibold red-voice-text">Example Answer: "${item.sample}"</p>
            `;
            return renderSpeakingItemCard({
              itemKey,
              titleLabel: `Part B • Q${idx + 1}`,
              listenText: `${item.question} ... Example answer: ${item.sample} ... Now your turn: ${item.question}`,
              redDisplayHtml: redHtml,
              targetSpeechText: item.sample,
              keywords: item.keywords,
              mode: "open",
              extraButtonsHtml: seqBtn
            });
          }).join("")}
        </div>
      `;
    } else {
      partContentHtml = `
        <div class="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
          <p class="text-xs sm:text-sm font-bold text-rose-800">${a4.partC.title}</p>
          <p class="text-xs sm:text-sm font-bold red-voice-text">${a4.partC.instruction}</p>
          ${a4.partC.prompts && a4.partC.prompts.length ? `
            <div class="p-3 rounded-xl bg-white/90 border border-rose-100 text-xs space-y-1">
              <span class="font-bold text-slate-700">${state.lang === "th" ? "โครงสร้างประโยคช่วยพูด (Sentence Starters / Clues):" : "Sentence Starters / Prompts:"}</span>
              <ul class="list-disc list-inside text-slate-600 font-medium">
                ${a4.partC.prompts.map(pr => `<li>${pr}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
        </div>
        <div class="space-y-3">
          ${a4.partC.items.map((item, idx) => {
            const itemKey = `u${unit.id}_partC_${idx}`;
            const redHtml = `
              <p class="text-xs sm:text-sm font-bold red-voice-text">${item.situation}</p>
              <p class="text-xs sm:text-sm font-semibold red-voice-text mt-1">Example: "${item.sample}"</p>
            `;
            return renderSpeakingItemCard({
              itemKey,
              titleLabel: `Part C • #${idx + 1}`,
              listenText: `${item.situation} ... Example: ${item.sample}`,
              redDisplayHtml: redHtml,
              targetSpeechText: item.sample,
              keywords: item.keywords,
              mode: "open"
            });
          }).join("")}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-rose-500 uppercase">Activity 4 • Speak Up! (Parts A, B, C)</span>
          <h2 class="text-lg font-bold text-slate-900">${state.lang === "th" ? "ฝึกพูด อัดเสียง ฟังเสียงตัวเอง และรับผลประเมิน 4 มาตรฐาน (%)" : "Speak, Record, Self-Listen & Get 4-Metric Evaluation (%)"}</h2>
        </div>

        <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
          <button onclick="SpeakUpApp.switchAct4Part('A')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${state.act4Part === "A" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}">
            Part A: Repeat
          </button>
          <button onclick="SpeakUpApp.switchAct4Part('B')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${state.act4Part === "B" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}">
            Part B: Q&A
          </button>
          <button onclick="SpeakUpApp.switchAct4Part('C')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${state.act4Part === "C" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}">
            Part C: Challenge
          </button>
        </div>
      </div>

      ${partContentHtml}
    `;
  }

  // =========================================================================
  // RENDER MODALS (GROUP QR, SCORES & EMAIL, DIAGNOSTICS & VERSION)
  // =========================================================================
  function renderQRModal() {
    const shareUrl = `${window.location.origin}${window.location.pathname}?unit=${state.unitId}&room=${encodeURIComponent(state.roomCode)}&lang=${state.lang}`;
    const qrSvg = window.QRGenerator.generateSVG(shareUrl);
    const svgBox = document.getElementById("qr-svg-container");
    if (svgBox) svgBox.innerHTML = qrSvg;
    const urlInput = document.getElementById("qr-share-url");
    if (urlInput) urlInput.value = shareUrl;
    const roomInput = document.getElementById("qr-room-input");
    if (roomInput) roomInput.value = state.roomCode;
  }

  function renderScoresModal() {
    const summary = getAllUnitsSummary();
    const tbody = document.getElementById("scores-table-body");
    if (tbody) {
      tbody.innerHTML = window.SPEAKUP_UNITS.map(u => {
        const p = ensureUnitProgress(u.id);
        const total = getUnitTotalScore(u.id);
        return `
          <tr class="border-b border-slate-100 text-xs">
            <td class="py-2 font-bold text-slate-800">${u.themeIcon} Unit ${u.id}: ${u.title.replace(/^Unit \d+:\s*/, "")}</td>
            <td class="py-2 text-center">${p.act1Score}%</td>
            <td class="py-2 text-center">${p.act2Score}%</td>
            <td class="py-2 text-center">${p.act3Score}%</td>
            <td class="py-2 text-center font-semibold text-rose-600">${p.act4Score}%</td>
            <td class="py-2 text-center font-extrabold text-indigo-700">${total}%</td>
          </tr>
        `;
      }).join("");
    }
    const masterEl = document.getElementById("master-score-banner");
    if (masterEl) {
      masterEl.innerHTML = `
        <div>
          <p class="text-xs font-bold text-indigo-900">คะแนนเฉลี่ยรวมทั้ง 12 Units: <span class="text-lg text-indigo-700">${summary.averageScore}%</span></p>
          <p class="text-xs text-slate-600">ทำครบทุก Activity แล้ว: <b>${summary.completedUnits} / 12 Units</b> • ห้องเรียน: <b>${state.roomCode}</b></p>
        </div>
      `;
    }
    const nameInput = document.getElementById("student-name-input");
    if (nameInput) nameInput.value = state.studentName || "";
    const emailInput = document.getElementById("student-email-input");
    if (emailInput) emailInput.value = state.studentEmail || "";
  }

  function renderDiagnosticsModal() {
    const report = window.SelfDiagnostics.runSuite();
    const verBadge = document.getElementById("top-version-badge");
    if (verBadge) {
      verBadge.innerHTML = `v${report.version} • ${report.passedCount}/${report.totalCount} OK`;
    }

    const listEl = document.getElementById("diag-checks-list");
    if (listEl) {
      listEl.innerHTML = report.checks.map(c => `
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
          <div>
            <p class="font-bold text-slate-800">${state.lang === "th" ? c.nameTh : c.nameEn}</p>
            <p class="text-slate-500">${c.detail}</p>
          </div>
          <span class="px-2.5 py-1 rounded-full font-bold ${c.passed ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}">
            ${c.passed ? "✅ PASS" : "⚠️ WARN"}
          </span>
        </div>
      `).join("");
    }

    const metaEl = document.getElementById("diag-meta-info");
    if (metaEl) {
      metaEl.innerHTML = `Version: <b>v${report.version}</b> (${report.build}) • Checked at ${report.timestamp} (${report.elapsedMs}ms)`;
    }
  }

  function renderAll() {
    // Update static i18n labels
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    renderUnitSelectorAndVocab();
    updateGuideMessage();
    updateScoreBadges();
    renderActivity1();
    renderActivity2();
    renderActivity3();
    renderActivity4();
  }

  // =========================================================================
  // PUBLIC INTERACTIVE ACTIONS
  // =========================================================================
  return {
    init() {
      loadState();
      renderAll();
      renderDiagnosticsModal();
    },

    setLang(lang) {
      SoundFX.playClick();
      state.lang = lang;
      document.getElementById("lang-th").className = lang === "th"
        ? "px-2.5 py-1 rounded-full text-xs font-bold bg-white text-indigo-700 shadow-sm"
        : "px-2.5 py-1 rounded-full text-xs font-semibold text-slate-500";
      document.getElementById("lang-en").className = lang === "en"
        ? "px-2.5 py-1 rounded-full text-xs font-bold bg-white text-indigo-700 shadow-sm"
        : "px-2.5 py-1 rounded-full text-xs font-semibold text-slate-500";
      saveState();
      renderAll();
    },

    setSpeed(rate) {
      SoundFX.playClick();
      SpeechEngine.setRate(rate);
      ["075", "085", "100"].forEach(id => {
        const el = document.getElementById("spd-" + id);
        if (el) el.className = "px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs";
      });
      const activeId = rate === 0.75 ? "075" : rate === 0.85 ? "085" : "100";
      const activeEl = document.getElementById("spd-" + activeId);
      if (activeEl) activeEl.className = "px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold shadow-sm text-xs";
    },

    changeUnit(uId) {
      SoundFX.playClick();
      SpeechEngine.stop();
      state.unitId = Number(uId);
      state.act3Step = 0;
      saveState();
      renderAll();
    },

    toggleVocab() {
      SoundFX.playClick();
      state.vocabOpen = !state.vocabOpen;
      const box = document.getElementById("vocab-drawer");
      if (box) box.classList.toggle("hidden", !state.vocabOpen);
    },

    speakVocab(idx) {
      const unit = getCurrentUnit();
      const v = unit.vocabulary[idx];
      if (!v) return;
      SpeechEngine.speak(`${v.word}. ${v.example}`);
    },

    switchActivity(actNum) {
      SoundFX.playClick();
      SpeechEngine.stop();
      state.activityId = Number(actNum);
      [1, 2, 3, 4].forEach(n => {
        const panel = document.getElementById("panel-" + n);
        if (panel) panel.classList.toggle("hidden", n !== state.activityId);
        const tab = document.getElementById("tab-" + n);
        if (tab) {
          tab.className = n === state.activityId
            ? "p-3 rounded-2xl border-2 border-indigo-500 bg-indigo-50/90 text-left transition shadow-sm"
            : "p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-left transition";
        }
      });
      updateGuideMessage();
    },

    playAct1Passage() {
      const unit = getCurrentUnit();
      const btn = document.getElementById("act1-play-btn");
      if (btn) btn.textContent = "🔊";
      SpeechEngine.speak(`${unit.activity1.title}. ${unit.activity1.passage}`, {
        onProgress: (pct) => {
          const bar = document.getElementById("act1-progress-bar");
          if (bar) bar.style.width = `${pct}%`;
        },
        onEnd: () => {
          if (btn) btn.textContent = "▶️";
          this.unlockAct1Now();
        }
      });
    },

    unlockAct1Now() {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      if (!p.act1Unlocked) {
        SoundFX.playUnlock();
      }
      p.act1Unlocked = true;
      p.act1Score = 100;
      saveState();
      renderActivity1();
    },

    speakPhraseIndex(idx) {
      const unit = getCurrentUnit();
      const phrase = unit.activity1.phrases[idx];
      if (phrase) SpeechEngine.speak(phrase);
    },

    speakAct2Question(qIdx) {
      const unit = getCurrentUnit();
      const q = unit.activity2[qIdx];
      if (q) SpeechEngine.speak(`Question ${qIdx + 1}. ${q.question}`);
    },

    answerAct2(qIdx, oIdx) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      const q = unit.activity2[qIdx];
      p.act2Answers[qIdx] = oIdx;

      if (oIdx === q.answerIndex) {
        SoundFX.playCorrect();
      } else {
        SoundFX.playWrong();
      }

      // Calculate Activity 2 percentage
      let correct = 0;
      unit.activity2.forEach((item, idx) => {
        if (p.act2Answers[idx] === item.answerIndex) correct++;
      });
      p.act2Score = Math.round((correct / unit.activity2.length) * 100);
      saveState();
      renderActivity2();
    },

    answerAct3(stepIdx, oIdx) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      const item = unit.activity3[stepIdx];
      p.act3Answers[stepIdx] = oIdx;

      if (oIdx === item.answerIndex) {
        SoundFX.playCorrect();
      } else {
        SoundFX.playWrong();
      }

      let correct = 0;
      unit.activity3.forEach((it, idx) => {
        if (p.act3Answers[idx] === it.answerIndex) correct++;
      });
      p.act3Score = Math.round((correct / unit.activity3.length) * 100);
      saveState();
      renderActivity3();
    },

    jumpAct3Step(stepIdx) {
      SoundFX.playClick();
      state.act3Step = stepIdx;
      renderActivity3();
    },

    switchAct4Part(part) {
      SoundFX.playClick();
      SpeechEngine.stop();
      state.act4Part = part;
      renderActivity4();
    },

    listenAndUnlockRed(itemKey, text) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      SpeechEngine.speak(text, {
        onEnd: () => {
          if (!p.redUnlocked[itemKey]) {
            SoundFX.playUnlock();
            p.redUnlocked[itemKey] = true;
            saveState();
            renderActivity4();
          }
        }
      });
    },

    playPartBSequence(itemKey, question, sample) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      SpeechEngine.speak(question, {
        onEnd: () => {
          SpeechEngine.speak(`Sample answer: ${sample}`, {
            onEnd: () => {
              SpeechEngine.speak(`Listen again: ${question}`, {
                onEnd: () => {
                  SoundFX.playUnlock();
                  p.redUnlocked[itemKey] = true;
                  saveState();
                  renderActivity4();
                }
              });
            }
          });
        }
      });
    },

    recordItem(itemKey, targetText, keywords, mode) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      p.redUnlocked[itemKey] = true; // Ensure visible when recording

      const btn = document.getElementById(`rec-btn-${itemKey}`);
      if (window.VoiceEvaluator.isRecording()) {
        window.VoiceEvaluator.stopRecording();
        return;
      }

      if (btn) {
        btn.classList.add("recording-active", "bg-rose-600");
        btn.innerHTML = t("stopRecordBtn");
      }

      window.VoiceEvaluator.startRecording(
        itemKey,
        targetText,
        keywords,
        mode,
        (evalResult) => {
          p.act4Evals[itemKey] = evalResult;
          recalculateAct4Score(unit.id);
          saveState();
          renderActivity4();
        }
      );
    },

    playMyRecording(itemKey, fallbackText) {
      window.VoiceEvaluator.playRecordedVoice(itemKey, fallbackText);
    },

    openModal(id) {
      SoundFX.playClick();
      if (id === "qr-modal") renderQRModal();
      if (id === "score-modal") renderScoresModal();
      if (id === "diag-modal") renderDiagnosticsModal();
      const m = document.getElementById(id);
      if (m) m.classList.remove("hidden");
    },

    closeModal(id) {
      SoundFX.playClick();
      const m = document.getElementById(id);
      if (m) m.classList.add("hidden");
    },

    updateRoomCode() {
      const input = document.getElementById("qr-room-input");
      if (input && input.value.trim()) {
        state.roomCode = input.value.trim().toUpperCase();
        saveState();
        renderQRModal();
      }
    },

    copyShareLink() {
      const urlInput = document.getElementById("qr-share-url");
      if (!urlInput) return;
      navigator.clipboard.writeText(urlInput.value).catch(() => {});
      SoundFX.playCorrect();
      const msg = document.getElementById("qr-copy-feedback");
      if (msg) {
        msg.textContent = state.lang === "th" ? "✅ คัดลอกลิงก์เข้ากลุ่มเรียบร้อยแล้ว!" : "✅ Share link copied!";
        setTimeout(() => { msg.textContent = ""; }, 2500);
      }
    },

    sendEmailReport() {
      const nameInput = document.getElementById("student-name-input");
      const emailInput = document.getElementById("student-email-input");
      state.studentName = nameInput ? nameInput.value.trim() : "";
      state.studentEmail = emailInput ? emailInput.value.trim() : "";
      saveState();

      const summary = getAllUnitsSummary();
      const lines = [
        `Speak Up! CEFR A1 — Score Report (Version v${window.APP_VERSION.version})`,
        `Student: ${state.studentName || "Student"}`,
        `Room / Group: ${state.roomCode}`,
        `Overall Average (12 Units): ${summary.averageScore}% (${summary.completedUnits}/12 Units Completed)`,
        `----------------------------------------`
      ];

      window.SPEAKUP_UNITS.forEach(u => {
        const p = ensureUnitProgress(u.id);
        const total = getUnitTotalScore(u.id);
        lines.push(`${u.title}: Total ${total}% (Act1: ${p.act1Score}%, Act2: ${p.act2Score}%, Act3: ${p.act3Score}%, Act4 Speak: ${p.act4Score}%)`);
      });

      const subject = encodeURIComponent(`Speak Up CEFR A1 Score Report - ${state.studentName || "Student"} (${summary.averageScore}%)`);
      const body = encodeURIComponent(lines.join("\n"));
      const recipient = encodeURIComponent(state.studentEmail || "");
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    },

    resetAllProgress() {
      if (!confirm(state.lang === "th" ? "ต้องการล้างคะแนนทั้งหมดเพื่อเริ่มใหม่หรือไม่?" : "Reset all unit scores and start fresh?")) return;
      state.progress = {};
      for (let i = 1; i <= 12; i++) ensureUnitProgress(i);
      saveState();
      renderAll();
      renderScoresModal();
    }
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  window.SpeakUpApp.init();
});
