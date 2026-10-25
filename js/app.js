/**
 * Speak Up! CEFR A1 — Main Application Controller (v1.4.0)
 * Supports 12 Units, Pre-Activity Learning Goals & Vocabulary Table (Step 0) + 4 Activities/Unit,
 * Activity 1 Show/Hide Text Toggle, Multi-Speaker Male/Female Dialogue Voices,
 * Unit Completion Score Summary Pop-up (Item Counts + Speaking % Average),
 * Full Bilingual TH/EN, ISO/IEC 18004 Group QR Sync, Email Reporting & Self-Diagnostics.
 */

window.SpeakUpApp = (function () {
  const STORAGE_KEY = "speakup_a1_progress_v130";

  let state = {
    lang: "th",
    view: "landing", // 'landing' | 'workspace'
    unitId: 1,
    activityId: 0, // 0 = Learning Goals & Vocabulary (Default before Activity 1), 1..4 = Activities 1..4
    act1Playing: false,
    act1CurrentSentence: 0,
    act1TotalSentences: 0,
    act1CurrentSpeaker: null,
    act1CurrentGender: null,
    act3Step: 0,
    act4Part: "A",
    studentName: "",
    studentEmail: "",
    roomCode: "CLASS-A1",
    progress: {}
  };

  const I18N = {
    th: {
      homeBtn: "หน้าแรก",
      exercisesBtn: "เข้าสู่บทเรียน",
      landingVersionBadge: "🚀 เวอร์ชันระบบ: v1.4.0 (Build 2026.10.25-DIALOGUE-SUMMARY)",
      landingSubtitle: "Listening and Speaking Exercises • ระบบฝึกฟังและพูดภาษาอังกฤษครบ 12 Units (48 Activities)",
      landingDesc: "ฝึกทักษะการฟังจับใจความพร้อมเงื่อนไขปลดล็อกข้อความสีแดง และฝึกพูดอัดเสียงพร้อมระบบประเมินผล 4 มาตรฐาน (สำเนียง, ความครบถ้วน, ความชัดเจน, เวลาในการพูด) คิดเป็น %",
      landingKenjiTitle: "🕵️‍♂️ นักสืบเคนจิ • ยินดีต้อนรับเข้าสู่ระบบฝึกภาษาอังกฤษ",
      landingKenjiDesc: "ระบุชื่อผู้เรียนและรหัสห้องเรียน (ถ้ามี) หรือกดปุ่ม 'เริ่มเข้าสู่บทเรียน' ด้านล่างเพื่อดู Learning Goals, ตารางคำศัพท์ และเริ่มทำแบบฝึกหัดได้ทันที",
      landingNameLabel: "👤 ชื่อผู้เรียน (Student Name):",
      landingNamePlaceholder: "ระบุชื่อของคุณ...",
      landingRoomLabel: "🏫 รหัสห้อง / กลุ่ม (Room Code):",
      landingStartBtn: "🎧 เริ่มเข้าสู่บทเรียน (Start Speak Up! CEFR A1) →",
      landingQrBtn: "📱 สร้าง QR เข้ากลุ่มพร้อมกัน",
      landingFeat1Title: "12 Units • Goals & Vocab",
      landingFeat1Sub: "แสดงเป้าหมาย & คำศัพท์ก่อนเริ่ม",
      landingFeat2Title: "Red-Text Audio Lock",
      landingFeat2Sub: "ฟังจบแล้วกดเปิด/ปิดเนื้อหาได้",
      landingFeat3Title: "4-Metric Speech AI (%)",
      landingFeat3Sub: "สำเนียง • ครบถ้วน • ชัดเจน • เวลา",
      landingFeat4Title: "Version v1.4.0 Verified",
      landingFeat4Sub: "แยกเสียงชาย/หญิง & สรุปผลท้ายบท",
      landingUnitsHeading: "📚 เลือกบทเรียนได้ทันที (All 12 Units Overview)",
      landingUnitsSub: "คลิกที่การ์ด Unit ใดก็ได้ด้านล่างเพื่อดู Learning Goals, ตารางคำศัพท์ และเข้าสู่ Activity 1–4",
      appSubtitle: "ระบบฝึกฟัง-พูดภาษาอังกฤษ 12 Units • สไตล์มินิมอลอนิเมะ (LocalStorage Edition)",
      storageStatus: "บันทึกอัตโนมัติ (LocalStorage)",
      groupBtn: "เข้ากลุ่ม (QR)",
      scoreBtn: "สรุปคะแนน & ส่งเมล",
      diagBtn: "ตรวจสอบระบบ",
      selectUnit: "เลือกบทเรียน (12 Units):",
      vocabBtn: "Learning Goals & คำศัพท์ประจำบท",
      speedLabel: "ความเร็วเสียง:",
      spdSlow: "ช้า (0.75x)",
      spdClear: "ชัดเจน (0.85x)",
      spdNormal: "ปกติ (1.0x)",
      guideTitle: "🕵️‍♂️ นักสืบเคนจิ (ผู้ช่วยแนะนำการทำแบบฝึกหัด)",
      redRuleBadge: "✨ กฎเหล็ก: ต้องฟังเสียงก่อน ข้อความสีแดงจึงจะแสดง!",
      act0TabTitle: "0. Goals & Vocab",
      act0TabSub: "เป้าหมาย & ตารางคำศัพท์",
      act1TabTitle: "1. ฟังเนื้อเรื่อง (Story)",
      act1TabSub: "ฟังจบแล้วกดเปิด/ปิดเนื้อหาได้",
      act2TabTitle: "2. ตอบคำถาม (Quiz)",
      act2TabSub: "ตอบก่อนจึงแสดงโจทย์สีแดง",
      act3TabTitle: "3. เติมคำ (Cloze)",
      act3TabSub: "ฟัง Passage & ทำทีละข้อ",
      act4TabTitle: "4. ฝึกพูด (Speak Up!)",
      act4TabSub: "อัดเสียง & ประเมินพูด (% เฉลี่ย)",
      listenFirstLock: "🔒 ซ่อนเนื้อหา — กรุณากดฟังเสียงให้จบก่อน",
      unlockedBadge: "✅ ฟังจบแล้ว! กดปุ่มแสดงเนื้อหา หรือปิดเนื้อหาเพื่อฝึกฟังได้",
      playStoryBtn: "กดเพื่อฟังเสียงเนื้อหา",
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
      qrModalTitle: "📱 ระบบทำพร้อมกันเป็นกลุ่ม (Group QR & Link)",
      qrModalDesc: "ให้นักเรียนสแกน QR Code มาตรฐาน ISO/IEC 18004 นี้ด้วยกล้องมือถือหรือ LINE เพื่อเข้าสู่ รหัสห้อง (Room) และ Unit ปัจจุบัน พร้อมกันได้ทันที",
      qrRoomFieldLabel: "🏫 รหัสห้อง (Room):",
      qrUnitFieldLabel: "📘 บทเรียน (Unit):",
      qrUpdateBtn: "🔄 อัปเดต QR Code",
      qrShareLabel: "ลิงก์สำหรับแชร์เข้าบทเรียนเดียวกัน:",
      qrCopyBtn: "คัดลอกลิงก์",
      qrSimulateBtn: "🚀 ทดสอบเข้าสู่ Unit และห้องกลุ่มนี้ทันที (Join Group Session Now)",
      scoreModalTitle: "🏆 ตารางสรุปคะแนนทั้ง 12 Units และส่งผลคะแนนทาง Email",
      emailSectionTitle: "📧 ส่งรายงานผลคะแนนทาง Email (Send Score Report)",
      studentNamePlaceholder: "ชื่อ-นามสกุล / รหัสนักเรียน",
      studentEmailPlaceholder: "อีเมลผู้รับ (เช่น teacher@school.ac.th)",
      resetScoresBtn: "🗑️ ล้างข้อมูลคะแนนทั้งหมด",
      sendEmailBtn: "📧 เปิดโปรแกรมส่ง Email พร้อมสรุปคะแนน",
      diagModalTitle: "🛡️ ระบบตรวจสอบตัวเองอัตโนมัติ & ข้อมูลเวอร์ชัน",
      footerRight: "เวอร์ชันระบบ: v1.4.0 (Build 2026.10.25-DIALOGUE-SUMMARY) • ตรวจสอบตัวเองอัตโนมัติ"
    },
    en: {
      homeBtn: "Home",
      exercisesBtn: "Exercises",
      landingVersionBadge: "🚀 SYSTEM VERSION: v1.4.0 (Build 2026.10.25-DIALOGUE-SUMMARY)",
      landingSubtitle: "Listening and Speaking Exercises • Complete 12-Unit Interactive Platform (48 Activities)",
      landingDesc: "Practice listening comprehension with Red-Text unlock conditions and record your voice with 4-metric AI evaluation (Accent, Completeness, Clarity, Speaking Time in %).",
      landingKenjiTitle: "🕵️‍♂️ Detective Kenji • Welcome to Speak Up! CEFR A1",
      landingKenjiDesc: "Enter your name and classroom code (optional), or click 'Start Learning' below to review Learning Goals, Vocabulary, and start the activities.",
      landingNameLabel: "👤 Student Name:",
      landingNamePlaceholder: "Enter your name...",
      landingRoomLabel: "🏫 Classroom / Group Code:",
      landingStartBtn: "🎧 Start Learning (Enter Speak Up! CEFR A1) →",
      landingQrBtn: "📱 Group QR Code",
      landingFeat1Title: "12 Units • Goals & Vocab",
      landingFeat1Sub: "Goals & Vocabulary before Activity 1",
      landingFeat2Title: "Red-Text Audio Lock",
      landingFeat2Sub: "Show/Hide text after listening",
      landingFeat3Title: "4-Metric Speech AI (%)",
      landingFeat3Sub: "Accent • Completeness • Clarity • Time",
      landingFeat4Title: "Version v1.4.0 Verified",
      landingFeat4Sub: "Male/Female Dialogue & Unit Summary",
      landingUnitsHeading: "📚 Choose Any Unit to Start (All 12 Units Overview)",
      landingUnitsSub: "Click any Unit card below to open its Learning Goals, Vocabulary Table, and Activities 1–4",
      appSubtitle: "12-Unit Interactive English Listening & Speaking Platform (LocalStorage Edition)",
      storageStatus: "Auto-Saved (LocalStorage)",
      groupBtn: "Group QR",
      scoreBtn: "Scores & Email",
      diagBtn: "Self-Check",
      selectUnit: "Select Unit (1–12):",
      vocabBtn: "Learning Goals & Vocabulary",
      speedLabel: "Voice Speed:",
      spdSlow: "Slow (0.75x)",
      spdClear: "Clear (0.85x)",
      spdNormal: "Normal (1.0x)",
      guideTitle: "🕵️‍♂️ Detective Kenji (Your Activity Guide)",
      redRuleBadge: "✨ Golden Rule: Listen to the audio first to reveal Red Text!",
      act0TabTitle: "0. Goals & Vocab",
      act0TabSub: "Learning Goals & Vocab Table",
      act1TabTitle: "1. Listen to Story",
      act1TabSub: "Listen then Show/Hide Text",
      act2TabTitle: "2. Understanding",
      act2TabSub: "Answer to reveal Red Question",
      act3TabTitle: "3. Complete Sentence",
      act3TabSub: "Listen & complete step-by-step",
      act4TabTitle: "4. Speak Up! (A, B, C)",
      act4TabSub: "Record & Avg % Evaluation",
      listenFirstLock: "🔒 Text Hidden — Please listen to the audio until the end first",
      unlockedBadge: "✅ Audio Finished! Click the button to show or hide the story text",
      playStoryBtn: "Play Audio Passage",
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
      qrModalTitle: "📱 Group Classroom Session (ISO QR Code & Share Link)",
      qrModalDesc: "Students can scan this ISO/IEC 18004 QR Code with any phone camera or LINE to join the same Room Code and Unit simultaneously.",
      qrRoomFieldLabel: "🏫 Room Code:",
      qrUnitFieldLabel: "📘 Select Unit:",
      qrUpdateBtn: "🔄 Update QR Code",
      qrShareLabel: "Shareable link for this Room & Unit:",
      qrCopyBtn: "Copy Link",
      qrSimulateBtn: "🚀 Join This Unit & Group Session Now",
      scoreModalTitle: "🏆 12-Unit Score Summary & Email Report",
      emailSectionTitle: "📧 Send Score Report via Email",
      studentNamePlaceholder: "Student Name / ID",
      studentEmailPlaceholder: "Recipient Email (e.g. teacher@school.edu)",
      resetScoresBtn: "🗑️ Reset All Scores",
      sendEmailBtn: "📧 Send Score Report via Email",
      diagModalTitle: "🛡️ Automated System Self-Check & Version History",
      footerRight: "System Version: v1.4.0 (Build 2026.10.25-DIALOGUE-SUMMARY) • Self-Diagnostic Active"
    }
  };

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.th[key] || key;
  }

  function safeSound(fnName) {
    try {
      if (window.SoundFX && typeof window.SoundFX[fnName] === "function") {
        window.SoundFX[fnName]();
      }
    } catch (e) {}
  }

  function ensureUnitProgress(uId) {
    if (!state.progress[uId]) {
      state.progress[uId] = {
        act1Unlocked: false,
        act1ShowText: false,
        unitPopupShown: false,
        act1Score: 0,
        act2Answers: {},
        act2Score: 0,
        act3Answers: {},
        act3Score: 0,
        act4Evals: {},
        act4Score: 0,
        redUnlocked: {}
      };
    } else {
      if (typeof state.progress[uId].act1ShowText !== "boolean") {
        state.progress[uId].act1ShowText = false;
      }
      if (typeof state.progress[uId].unitPopupShown !== "boolean") {
        state.progress[uId].unitPopupShown = false;
      }
    }
    return state.progress[uId];
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          state.lang = parsed.lang === "en" ? "en" : "th";
          state.unitId = Number(parsed.unitId) || 1;
          state.studentName = parsed.studentName || "";
          state.studentEmail = parsed.studentEmail || "";
          state.roomCode = parsed.roomCode || "CLASS-A1";
          state.progress = parsed.progress || {};
        }
      }
    } catch (e) {}

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("unit")) {
        const u = parseInt(params.get("unit"), 10);
        if (u >= 1 && u <= 12) {
          state.unitId = u;
          state.activityId = 0; // Start at Learning Goals & Vocabulary when joining a Unit via QR!
          state.view = "workspace";
        }
      }
      if (params.get("room")) {
        state.roomCode = params.get("room").toUpperCase();
      }
      if (params.get("lang") === "en" || params.get("lang") === "th") {
        state.lang = params.get("lang");
      }
    } catch (e) {}

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

  function getUnitById(uId) {
    return window.SPEAKUP_UNITS.find(u => u.id === Number(uId)) || window.SPEAKUP_UNITS[0];
  }

  function getUnitDetailedStats(uId) {
    const unit = getUnitById(uId);
    const p = ensureUnitProgress(uId);

    const act1Done = p.act1Unlocked ? 1 : 0;
    const act1Total = 1;

    let act2Correct = 0;
    const act2Total = unit.activity2.length;
    const act2Answered = Object.keys(p.act2Answers || {}).length;
    unit.activity2.forEach((q, idx) => {
      if (p.act2Answers && p.act2Answers[idx] === q.answerIndex) act2Correct++;
    });

    let act3Correct = 0;
    const act3Total = unit.activity3.length;
    const act3Answered = Object.keys(p.act3Answers || {}).length;
    unit.activity3.forEach((it, idx) => {
      if (p.act3Answers && p.act3Answers[idx] === it.answerIndex) act3Correct++;
    });

    const evalsList = Object.values(p.act4Evals || {});
    const act4CompletedCount = evalsList.length;
    const act4TotalItems =
      (unit.activity4.partA ? unit.activity4.partA.length : 0) +
      (unit.activity4.partB && unit.activity4.partB.items ? unit.activity4.partB.items.length : 0) +
      (unit.activity4.partC && unit.activity4.partC.items ? unit.activity4.partC.items.length : 0);

    const act4AvgPercent = act4CompletedCount > 0
      ? Math.round(evalsList.reduce((acc, ev) => acc + (ev.overall || 0), 0) / act4CompletedCount)
      : 0;
    const act4AvgAccent = act4CompletedCount > 0
      ? Math.round(evalsList.reduce((acc, ev) => acc + (ev.accent || 0), 0) / act4CompletedCount)
      : 0;
    const act4AvgComplete = act4CompletedCount > 0
      ? Math.round(evalsList.reduce((acc, ev) => acc + (ev.completeness || 0), 0) / act4CompletedCount)
      : 0;
    const act4AvgClarity = act4CompletedCount > 0
      ? Math.round(evalsList.reduce((acc, ev) => acc + (ev.clarity || 0), 0) / act4CompletedCount)
      : 0;
    const act4AvgTime = act4CompletedCount > 0
      ? Math.round(evalsList.reduce((acc, ev) => acc + (ev.timeScore || 0), 0) / act4CompletedCount)
      : 0;

    p.act4Score = act4AvgPercent;

    const isUnitCompleted =
      p.act1Unlocked &&
      act2Answered >= act2Total &&
      act3Answered >= act3Total &&
      act4CompletedCount >= 1;

    return {
      act1Done,
      act1Total,
      act2Correct,
      act2Answered,
      act2Total,
      act3Correct,
      act3Answered,
      act3Total,
      exerciseCorrect: act2Correct + act3Correct,
      exerciseTotal: act2Total + act3Total,
      act4CompletedCount,
      act4TotalItems,
      act4AvgPercent,
      act4AvgAccent,
      act4AvgComplete,
      act4AvgClarity,
      act4AvgTime,
      isUnitCompleted
    };
  }

  function getUnitTotalScore(uId) {
    const p = ensureUnitProgress(uId);
    return Math.round((p.act1Score + p.act2Score + p.act3Score + p.act4Score) / 4);
  }

  function getAllUnitsSummary() {
    let sum = 0;
    let completedUnits = 0;
    let totalExerciseCorrect = 0;
    let totalExerciseQuestions = 0;
    let speakingSum = 0;
    let speakingUnitsCount = 0;

    for (let i = 1; i <= 12; i++) {
      const s = getUnitTotalScore(i);
      sum += s;
      const st = getUnitDetailedStats(i);
      totalExerciseCorrect += st.exerciseCorrect;
      totalExerciseQuestions += st.exerciseTotal;
      if (st.act4CompletedCount > 0) {
        speakingSum += st.act4AvgPercent;
        speakingUnitsCount++;
      }
      if (st.isUnitCompleted) {
        completedUnits++;
      }
    }
    return {
      averageScore: Math.round(sum / 12),
      completedUnits,
      totalExerciseCorrect,
      totalExerciseQuestions,
      overallSpeakingAvg: speakingUnitsCount > 0 ? Math.round(speakingSum / speakingUnitsCount) : 0
    };
  }

  function recalculateAct4Score(uId) {
    const p = ensureUnitProgress(uId);
    const evalValues = Object.values(p.act4Evals || {});
    if (!evalValues.length) {
      p.act4Score = 0;
      return;
    }
    const avg = evalValues.reduce((acc, ev) => acc + (ev.overall || 0), 0) / evalValues.length;
    p.act4Score = Math.round(avg);
  }

  function updateLanguageButtonsUI() {
    const isTh = state.lang === "th";
    ["lang-th", "landing-lang-th"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.className = isTh
          ? "px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white shadow-sm transition"
          : "px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-indigo-700 transition";
      }
    });
    ["lang-en", "landing-lang-en"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.className = !isTh
          ? "px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white shadow-sm transition"
          : "px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-indigo-700 transition";
      }
    });
  }

  function updateScoreBadges() {
    const uId = state.unitId;
    const st = getUnitDetailedStats(uId);
    const allSummary = getAllUnitsSummary();
    const itemUnit = state.lang === "th" ? "ข้อ" : "";

    const setEl = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };

    setEl("score-act1", `${st.act1Done}/${st.act1Total} ${itemUnit}`.trim());
    setEl("score-act2", `${st.act2Correct}/${st.act2Total} ${itemUnit}`.trim());
    setEl("score-act3", `${st.act3Correct}/${st.act3Total} ${itemUnit}`.trim());
    setEl("score-act4", `${st.act4AvgPercent}%`);
    setEl(
      "header-unit-score",
      state.lang === "th"
        ? `Unit ${uId}: ${st.exerciseCorrect}/${st.exerciseTotal} ข้อ • พูด ${st.act4AvgPercent}% (${allSummary.completedUnits}/12)`
        : `Unit ${uId}: ${st.exerciseCorrect}/${st.exerciseTotal} • Speak ${st.act4AvgPercent}% (${allSummary.completedUnits}/12)`
    );
    setEl("room-badge-label", `${t("groupBtn")}: ${state.roomCode}`);
  }

  function updateGuideMessage() {
    const unit = getCurrentUnit();
    const act = state.activityId;
    const guideEl = document.getElementById("guide-message");
    if (!guideEl) return;

    const msgsTh = {
      0: `"ยินดีต้อนรับสู่ <b>${unit.title} (${unit.titleTh})</b> ครับ! ก่อนเริ่มทำแบบฝึกหัด มาดู <b>Learning Goals</b> และฝึกฟัง <b>ตารางคำศัพท์และประโยคตัวอย่าง</b> ด้านล่างกันก่อน เมื่อพร้อมแล้วกดปุ่ม <b>'ไปที่ Activity 1'</b> ได้เลยครับ!"`,
      1: `"ใน <b>Activity 1 (${unit.activity1.heading})</b> ระบบซ่อนเนื้อหาไว้ก่อน ให้กดปุ่ม ▶️ เพื่อฟังเสียงอ่านจนจบ (บทสนทนาจะแยกเสียงผู้ชาย/ผู้หญิงตามชื่อตัวละคร) เมื่อฟังจบแล้วสามารถกดปุ่ม <b>'แสดงเนื้อหา'</b> หรือกด <b>'ปิดเนื้อหา'</b> เพื่อฝึกฟังซ้ำได้ครับ!"`,
      2: `"ใน <b>Activity 2: Check Your Understanding</b> ให้กดฟังเสียงคำถามแล้ว <b>เลือกคำตอบ a, b หรือ c ก่อน</b> จากนั้นระบบจะแสดงโจทย์ตัวอักษร <b>สีแดง</b> พร้อมนับคะแนนตามจำนวนข้อ (เต็ม ${unit.activity2.length} ข้อ) ครับ!"`,
      3: `"ใน <b>Activity 3: Listen Again & Complete</b> กดฟังเสียงอ่าน Passage แล้วเลือกคำตอบเติมในช่องว่าง <b>ทีละข้อ</b> (คะแนนเต็ม ${unit.activity3.length} ข้อ)"`,
      4: `"ใน <b>Activity 4: Speak Up!</b> มีครบทั้ง <b>Part A, Part B และ Part C</b> กดฟังเสียงก่อนเพื่อเปิดข้อความสีแดง แล้วกดไมโครโฟนเพื่ออัดเสียงพูด คะแนนการอ่านออกเสียงจะคิดเป็น <b>% เฉลี่ยจากทุกข้อที่ทำ</b> และเมื่อทำครบจะมี Pop-up สรุปคะแนนทั้ง Unit พร้อมปุ่มไปทำ Unit ต่อไปครับ!"`
    };

    const msgsEn = {
      0: `"Welcome to <b>${unit.title}</b>! Review the <b>Learning Goals</b> and practice listening to the <b>Vocabulary & Example Sentences</b> below. Click <b>'Go to Activity 1'</b> when you're ready!"`,
      1: `"In <b>Activity 1 (${unit.activity1.heading})</b>, listen to the passage until the end first (dialogues use Male and Female voices according to character names). Once finished, click <b>'Show Story Text'</b> to view the passage or <b>'Hide Story Text'</b> to practice listening!"`,
      2: `"In <b>Activity 2: Check Your Understanding</b>, listen to each question and <b>select your answer first</b> to reveal the <b>Red Question Text</b> (Scored out of ${unit.activity2.length} items)!"`,
      3: `"In <b>Activity 3: Listen Again & Complete</b>, listen to the passage and complete each sentence <b>step-by-step</b> (Scored out of ${unit.activity3.length} items)."`,
      4: `"In <b>Activity 4: Speak Up! (Parts A, B, C)</b>, record your voice to get an <b>average % speaking score</b> across all completed items, then view your Unit Summary Pop-up and proceed to the next Unit!"`
    };

    guideEl.innerHTML = state.lang === "th" ? (msgsTh[act] || msgsTh[0]) : (msgsEn[act] || msgsEn[0]);
  }

  // =========================================================================
  // RENDER LANDING PAGE & VIEW SWITCHING
  // =========================================================================
  function syncViewVisibility() {
    const landingScreen = document.getElementById("landing-screen");
    const workspaceScreen = document.getElementById("workspace-screen");
    const isLanding = state.view === "landing";

    if (landingScreen) {
      landingScreen.classList.toggle("hidden", !isLanding);
      landingScreen.style.display = isLanding ? "block" : "none";
    }
    if (workspaceScreen) {
      workspaceScreen.classList.toggle("hidden", isLanding);
      workspaceScreen.style.display = isLanding ? "none" : "block";
    }

    // Sync active panel (0..4)
    [0, 1, 2, 3, 4].forEach(n => {
      const panel = document.getElementById("panel-" + n);
      const isCurrent = n === Number(state.activityId);
      if (panel) {
        panel.classList.toggle("hidden", !isCurrent);
        panel.style.display = isCurrent ? "block" : "none";
      }
      const tab = document.getElementById("tab-" + n);
      if (tab) {
        tab.className = isCurrent
          ? "p-3 rounded-2xl border-2 border-indigo-500 bg-indigo-50/90 text-left transition shadow-sm"
          : "p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-left transition";
      }
    });
  }

  function renderLandingPage() {
    syncViewVisibility();

    const nameEl = document.getElementById("landing-student-name");
    if (nameEl && document.activeElement !== nameEl) {
      nameEl.value = state.studentName || "";
    }
    const roomEl = document.getElementById("landing-room-code");
    if (roomEl && document.activeElement !== roomEl) {
      roomEl.value = state.roomCode || "CLASS-A1";
    }

    const summary = getAllUnitsSummary();
    const overallBadge = document.getElementById("landing-overall-progress");
    if (overallBadge) {
      overallBadge.textContent = state.lang === "th"
        ? `แบบฝึกหัดรวม: ${summary.totalExerciseCorrect}/${summary.totalExerciseQuestions} ข้อ • พูดเฉลี่ย: ${summary.overallSpeakingAvg}% (${summary.completedUnits}/12 Units)`
        : `Exercises: ${summary.totalExerciseCorrect}/${summary.totalExerciseQuestions} • Speaking Avg: ${summary.overallSpeakingAvg}% (${summary.completedUnits}/12 Units)`;
    }

    const grid = document.getElementById("landing-units-grid");
    if (grid) {
      grid.innerHTML = window.SPEAKUP_UNITS.map(u => {
        const uScore = getUnitTotalScore(u.id);
        const st = getUnitDetailedStats(u.id);
        const subTitle = state.lang === "th"
          ? u.titleTh
          : `${u.learningGoals[0]}`;
        const enterLabel = state.lang === "th" ? "ดูเป้าหมาย & คำศัพท์ →" : "Goals & Vocab →";

        return `
          <div onclick="SpeakUpApp.enterWorkspace(${u.id})" role="button" tabindex="0" class="cursor-pointer p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-indigo-50/80 hover:border-indigo-400 text-left transition shadow-sm group flex flex-col justify-between gap-2">
            <div>
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="text-xs font-extrabold text-indigo-600 uppercase">UNIT ${u.id}</span>
                <span class="px-2 py-0.5 rounded-full text-xs font-bold ${st.isUnitCompleted ? "bg-emerald-100 text-emerald-800" : uScore > 0 ? "bg-amber-100 text-amber-800" : "bg-white text-slate-500 border border-slate-200"}">
                  ${st.exerciseCorrect}/${st.exerciseTotal} • ${st.act4AvgPercent}%
                </span>
              </div>
              <p class="font-bold text-sm text-slate-900 group-hover:text-indigo-950">${u.themeIcon} ${u.title.replace(/^Unit \d+:\s*/, "")}</p>
              <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${subTitle}</p>
            </div>
            <div class="pt-1 space-y-1.5">
              <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div class="bg-indigo-600 h-full rounded-full" style="width: ${uScore}%"></div>
              </div>
              <div class="flex justify-end">
                <span class="text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition">${enterLabel}</span>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // =========================================================================
  // RENDER STEP 0: LEARNING GOALS & VOCABULARY TABLE (BEFORE ACTIVITY 1)
  // =========================================================================
  function renderStep0GoalsAndVocab() {
    const select = document.getElementById("unit-select");
    if (select) {
      select.innerHTML = window.SPEAKUP_UNITS.map(u => {
        const st = getUnitDetailedStats(u.id);
        const flag = st.isUnitCompleted ? "✅" : (st.act1Done || st.act2Answered || st.act3Answered || st.act4CompletedCount) ? "⏳" : "📘";
        const label = state.lang === "th" ? `${u.title} — ${u.titleTh}` : u.title;
        return `<option value="${u.id}" ${u.id === Number(state.unitId) ? "selected" : ""}>${flag} ${label} (${st.exerciseCorrect}/${st.exerciseTotal} • ${st.act4AvgPercent}%)</option>`;
      }).join("");
    }

    const unit = getCurrentUnit();
    const container = document.getElementById("panel-0");
    if (!container) return;

    container.innerHTML = `
      <!-- Unit Title Banner + Go to Activity 1 Button -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
            ${state.lang === "th" ? `เตรียมความพร้อมก่อนเริ่มบทเรียน • Unit ${unit.id} จาก 12` : `Unit Preparation • Unit ${unit.id} of 12`}
          </span>
          <h2 class="text-xl sm:text-2xl font-extrabold text-indigo-950 mt-1">
            ${unit.themeIcon} ${unit.title} <span class="text-base font-bold text-indigo-600">(${unit.titleTh})</span>
          </h2>
        </div>

        <button type="button" onclick="SpeakUpApp.switchActivity(1)" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white text-xs sm:text-sm font-extrabold shadow-md transition flex items-center gap-2 cursor-pointer">
          <span>🎧 ${state.lang === "th" ? "ไปที่ Activity 1: Listen to the Story →" : "Go to Activity 1: Listen to the Story →"}</span>
        </button>
      </div>

      <!-- Learning Goals Box -->
      <div class="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/90 to-sky-50/90 border border-indigo-200 space-y-2.5 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-sm sm:text-base font-extrabold text-indigo-950 flex items-center gap-2">
            <span>🎯</span>
            <span>Learning Goals</span>
          </h3>
          <button type="button" onclick="SpeakUpApp.speakLearningGoals()" class="px-3 py-1.5 rounded-xl bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 text-xs font-bold shadow-sm">
            🔊 ${state.lang === "th" ? "ฟัง Learning Goals" : "Listen to Goals"}
          </button>
        </div>
        <ul class="space-y-1.5 pl-1">
          ${unit.learningGoals.map(goal => `
            <li class="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-800">
              <span class="text-indigo-600 font-extrabold">•</span>
              <span>${goal}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- 3-Column Vocabulary Table -->
      <div class="space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 class="text-sm sm:text-base font-extrabold text-slate-900">
              📖 ${state.lang === "th" ? "ตารางคำศัพท์และประโยคตัวอย่าง" : "Vocabulary & Example Sentences"}
            </h3>
            <p class="text-xs text-slate-500">
              ${state.lang === "th" ? "กดปุ่ม 🔊 ในแต่ละแถวเพื่อฟังการออกเสียงคำศัพท์และประโยคตัวอย่างก่อนเริ่มทำ Activity 1" : "Click 🔊 on any row to listen to the pronunciation and example sentence"}
            </p>
          </div>
          <button type="button" onclick="SpeakUpApp.speakAllVocab()" class="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm">
            🔊 ${state.lang === "th" ? "ฟังคำศัพท์และตัวอย่างทั้งหมด" : "Listen to All Vocabulary"}
          </button>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-indigo-50/90 border-b border-indigo-100 text-xs sm:text-sm font-extrabold text-indigo-950">
                <th class="py-3 px-4">Vocabulary / Phrase</th>
                <th class="py-3 px-4">ความหมาย</th>
                <th class="py-3 px-4">Example Sentence</th>
                <th class="py-3 px-4 text-center">${state.lang === "th" ? "ฝึกฟังเสียง" : "Audio"}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
              ${unit.vocabulary.map((v, idx) => `
                <tr class="hover:bg-sky-50/50 transition">
                  <td class="py-3 px-4 font-extrabold text-indigo-900">${v.word}</td>
                  <td class="py-3 px-4 font-semibold text-slate-700">${v.meaning}</td>
                  <td class="py-3 px-4 text-slate-800 font-medium">"${v.example}"</td>
                  <td class="py-3 px-4 text-center">
                    <button type="button" onclick="SpeakUpApp.speakVocab(${idx})" class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition">
                      🔊 ${state.lang === "th" ? "ฟังเสียง" : "Listen"}
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bottom Call-to-Action to Proceed to Activity 1 -->
      <div class="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p class="text-xs sm:text-sm font-extrabold text-emerald-950">
            ✅ ${state.lang === "th" ? "เรียนรู้เป้าหมายและคำศัพท์ประจำบทเรียบร้อยแล้วใช่ไหมครับ?" : "Ready to start the listening exercise?"}
          </p>
          <p class="text-xs text-emerald-800">
            ${state.lang === "th" ? "กดปุ่มด้านขวาเพื่อเข้าสู่ Activity 1: ฟังเสียงเนื้อหาให้จบเพื่อปลดล็อกปุ่มแสดงเนื้อหา" : "Click the button on the right to begin Activity 1: Listen to the Story"}
          </p>
        </div>
        <button type="button" onclick="SpeakUpApp.switchActivity(1)" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer flex-shrink-0">
          <span>🎧 ${state.lang === "th" ? "เริ่มทำ Activity 1: Listen to the Story →" : "Start Activity 1: Listen to the Story →"}</span>
        </button>
      </div>
    `;
  }

  // =========================================================================
  // RENDER ACTIVITY 1: LISTEN TO THE STORY (SHOW/HIDE TEXT BUTTON AFTER AUDIO)
  // =========================================================================
  function renderActivity1() {
    const unit = getCurrentUnit();
    const p = ensureUnitProgress(unit.id);
    const a1 = unit.activity1;
    const container = document.getElementById("panel-1");
    if (!container) return;

    const formattedPassage = a1.passage
      .split("\n")
      .map(line => {
        const m = line.match(/^([A-Za-z]+):\s*(.+)$/);
        if (m && window.SpeechEngine) {
          const spk = m[1];
          const textBody = m[2];
          const g = window.SpeechEngine.detectGenderByName(spk);
          const icon = g === "male" ? "👨" : "👩";
          const badgeCls = g === "male"
            ? "bg-sky-100 text-sky-900 border-sky-300"
            : "bg-pink-100 text-pink-900 border-pink-300";
          return `<p class="mb-2.5 flex items-start gap-2"><span class="px-2 py-0.5 rounded-lg text-xs font-extrabold border ${badgeCls} flex-shrink-0 mt-0.5">${icon} ${spk}:</span> <span class="red-voice-text">${textBody}</span></p>`;
        }
        return `<p class="mb-2 red-voice-text">${line}</p>`;
      })
      .join("");

    const subHeading = state.lang === "th"
      ? "ฟังเสียงอ่านเนื้อหาจนจบก่อน จึงจะสามารถกดปุ่มเปิดดูเนื้อหา หรือกดปิดเนื้อหาเพื่อฝึกฟังซ้ำได้"
      : "Listen to the full audio first to unlock the Show / Hide Story Text button.";

    const speakerBadgeText = state.act1Playing && state.act1CurrentSpeaker
      ? (state.lang === "th"
          ? ` • 🎙️ ผู้พูด: ${state.act1CurrentSpeaker} (${state.act1CurrentGender === "male" ? "เสียงผู้ชาย 👨" : "เสียงผู้หญิง 👩"})`
          : ` • 🎙️ Speaker: ${state.act1CurrentSpeaker} (${state.act1CurrentGender === "male" ? "Male Voice 👨" : "Female Voice 👩"})`)
      : "";

    const listeningStatusText = state.act1Playing
      ? (state.lang === "th"
          ? `🔊 กำลังอ่านออกเสียงประโยคที่ ${state.act1CurrentSentence} / ${state.act1TotalSentences}${speakerBadgeText}`
          : `🔊 Reading sentence ${state.act1CurrentSentence} of ${state.act1TotalSentences}${speakerBadgeText}`)
      : p.act1Unlocked
        ? (state.lang === "th"
            ? "✅ ฟังเสียงจบแล้ว! กดปุ่ม 'แสดงเนื้อหา' เพื่อดูข้อความ หรือกด 'ปิดเนื้อหา' เพื่อฝึกฟังโดยไม่ดูข้อความ"
            : "✅ Audio finished! Click 'Show Story Text' to read, or 'Hide Story Text' to listen without text")
        : (state.lang === "th"
            ? "เสียงอ่านชัดเจน (0.85x) • ต้องฟังจนจบก่อนจึงจะมีปุ่มให้กดแสดงเนื้อหา"
            : "Clear & steady voice (0.85x) • Listen until the end to unlock the Show Text button");

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-rose-500 uppercase">Activity 1 • ${a1.heading}</span>
          <h2 class="text-lg font-bold text-slate-900">
            ${unit.themeIcon} ${(p.act1Unlocked && p.act1ShowText) ? `<span class="red-voice-text">${a1.title}</span>` : (state.lang === "th" ? `บทฟังเนื้อหา Unit ${unit.id} (ซ่อนเนื้อหาไว้)` : `Unit ${unit.id} Listening Passage (Text Hidden)`)}
          </h2>
          <p class="text-xs text-slate-500">${subHeading}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold ${p.act1Unlocked ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}">
          ${p.act1Unlocked ? t("unlockedBadge") : t("listenFirstLock")}
        </span>
      </div>

      <!-- Audio Player Bar -->
      <div class="bg-gradient-to-r from-indigo-50 via-sky-50 to-rose-50 p-4 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3.5 w-full sm:w-auto">
          <button type="button" onclick="SpeakUpApp.playAct1Passage()" id="act1-play-btn" class="w-14 h-14 rounded-2xl ${state.act1Playing ? "bg-rose-600 animate-pulse" : "bg-indigo-600 hover:bg-indigo-700"} text-white flex items-center justify-center text-2xl shadow-md transition flex-shrink-0 cursor-pointer">
            ${state.act1Playing ? "🔊" : "▶️"}
          </button>
          <div class="flex-1">
            <p class="font-bold text-sm text-indigo-950">
              ${t("playStoryBtn")} ${(p.act1Unlocked && p.act1ShowText) ? `: "${a1.title}"` : ""}
            </p>
            <p id="act1-status-line" class="text-xs font-semibold ${state.act1Playing ? "text-rose-600" : "text-slate-600"}">
              ${listeningStatusText}
            </p>
            <div class="w-full sm:w-80 h-2.5 bg-white rounded-full overflow-hidden mt-2 border border-indigo-200">
              <div id="act1-progress-bar" class="h-full bg-gradient-to-r from-indigo-500 to-rose-500 transition-all duration-300" style="width: ${p.act1Unlocked ? "100%" : "0%"}"></div>
            </div>
          </div>
        </div>

        ${p.act1Unlocked ? `
          <div class="flex items-center gap-2 flex-wrap">
            ${p.act1ShowText ? `
              <button type="button" onclick="SpeakUpApp.toggleAct1Text(false)" class="px-4 py-2 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition cursor-pointer">
                🙈 ${state.lang === "th" ? "ปิดเนื้อหาเพื่อฝึกฟัง" : "Hide Story Text to Listen"}
              </button>
            ` : `
              <button type="button" onclick="SpeakUpApp.toggleAct1Text(true)" class="px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition cursor-pointer">
                📖 ${state.lang === "th" ? "แสดงเนื้อหา" : "Show Story Text"}
              </button>
            `}
            <button type="button" onclick="SpeakUpApp.switchActivity(2)" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition cursor-pointer">
              ${state.lang === "th" ? "ไปทำ Activity 2 ต่อ →" : "Continue to Activity 2 →"}
            </button>
          </div>
        ` : ""}
      </div>

      ${!p.act1Unlocked ? `
        <div class="p-8 rounded-2xl border-2 border-dashed ${state.act1Playing ? "border-indigo-400 bg-indigo-50/50" : "border-rose-200 bg-rose-50/40"} text-center space-y-2 transition">
          <div class="text-4xl">${state.act1Playing ? "🎧🎶" : "🎧🔒"}</div>
          <p class="font-extrabold text-sm sm:text-base ${state.act1Playing ? "text-indigo-900" : "text-rose-800"}">
            ${state.act1Playing
              ? (state.lang === "th" ? "กำลังอ่านเนื้อหา... กรุณาตั้งใจฟังจนจบ" : "Reading the passage aloud... Please listen until the end")
              : (state.lang === "th" ? "เนื้อหาถูกซ่อนไว้ กรุณากดฟังการอ่านเนื้อหาให้จบก่อน" : "The passage is hidden until you finish listening to the audio")}
          </p>
          <p class="text-xs ${state.act1Playing ? "text-indigo-600 font-semibold" : "text-rose-600"}">
            ${state.act1Playing
              ? (state.lang === "th" ? `ระบบกำลังอ่านประโยคที่ ${state.act1CurrentSentence} จาก ${state.act1TotalSentences} เมื่ออ่านครบแล้วจะมีปุ่มให้กดแสดงเนื้อหา` : `Reading sentence ${state.act1CurrentSentence} of ${state.act1TotalSentences}. Once finished, the 'Show Story Text' button will appear.`)
              : (state.lang === "th" ? "กดปุ่ม ▶️ ด้านบนเพื่อเริ่มฟังเสียงอ่านเนื้อหาตั้งแต่ต้นจนจบ" : "Click the ▶️ button above to start listening from start to finish")}
          </p>
        </div>
      ` : !p.act1ShowText ? `
        <!-- Unlocked but Hidden State: User must click button to reveal text, or can listen while text stays hidden -->
        <div class="p-8 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 text-center space-y-3 fade-in">
          <div class="text-4xl">✅🎧</div>
          <p class="font-extrabold text-sm sm:text-base text-emerald-950">
            ${state.lang === "th" ? "ฟังเสียงอ่านเนื้อหาจบเรียบร้อยแล้ว! (ขณะนี้ซ่อนเนื้อหาไว้)" : "Audio completed! (Story text is currently hidden)"}
          </p>
          <p class="text-xs text-slate-600 max-w-lg mx-auto">
            ${state.lang === "th"
              ? "กดปุ่ม '📖 แสดงเนื้อหา' ด้านล่างหากต้องการเปิดอ่านเนื้อหาตัวอักษรสีแดง หรือกดปุ่ม '🔊 ฟังเสียงโดยปิดเนื้อหา' เพื่อฝึกฟังอีกครั้ง"
              : "Click '📖 Show Story Text' below to reveal the passage, or click '🔊 Listen Without Text' to practice listening again."}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button type="button" onclick="SpeakUpApp.toggleAct1Text(true)" class="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition cursor-pointer">
              📖 ${state.lang === "th" ? "กดเพื่อแสดงเนื้อหา (Show Story Text)" : "Show Story Text"}
            </button>
            <button type="button" onclick="SpeakUpApp.playAct1Passage()" class="px-4 py-2.5 rounded-2xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer">
              🔊 ${state.lang === "th" ? "ฟังเสียงโดยปิดเนื้อหา" : "Listen Without Text"}
            </button>
          </div>
        </div>
      ` : `
        <div class="space-y-4 fade-in">
          <!-- Revealed Red Text Passage with Hide Text Button -->
          <div class="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-3 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200/70 pb-2.5">
              <span class="text-xs font-bold text-rose-700 uppercase">
                ${state.lang === "th" ? "📖 เนื้อหาบทอ่าน (Red Text Passage)" : "📖 Story / Conversation Text"}
              </span>
              <div class="flex items-center gap-2 flex-wrap">
                <button type="button" onclick="SpeakUpApp.playAct1Passage()" class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer">
                  🔊 ${state.lang === "th" ? "ฟังเสียงอีกครั้ง" : "Listen Again"}
                </button>
                <button type="button" onclick="SpeakUpApp.toggleAct1Text(false)" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold cursor-pointer">
                  🙈 ${state.lang === "th" ? "ปิดเนื้อหาเพื่อฟัง" : "Hide Text to Listen"}
                </button>
              </div>
            </div>
            <h3 class="text-base font-extrabold red-voice-text">${a1.title}</h3>
            <div class="text-sm sm:text-base font-semibold leading-relaxed">
              ${formattedPassage}
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
    const st = getUnitDetailedStats(unit.id);
    const questions = unit.activity2;
    const container = document.getElementById("panel-2");
    if (!container) return;

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-rose-500 uppercase">Activity 2 • Check Your Understanding</span>
          <h2 class="text-lg font-bold text-slate-900">${state.lang === "th" ? "ฟังเสียงคำถาม แล้วเลือกคำตอบ (โจทย์ตัวสีแดงจะแสดงหลังจากเลือกคำตอบแล้ว)" : "Listen to each question and choose an answer to reveal the Red Question Text"}</h2>
        </div>
        <span class="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
          ${state.lang === "th" ? `คะแนน: ${st.act2Correct} / ${st.act2Total} ข้อ` : `Score: ${st.act2Correct} / ${st.act2Total}`}
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
                  <button type="button" onclick="SpeakUpApp.speakAct2Question(${qIdx})" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5">
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
                    ${isCorrect ? (state.lang === "th" ? "✅ ถูกต้อง!" : "✅ Correct!") : `💡 ${qObj.options[qObj.answerIndex]}`}
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
                    <button type="button" onclick="SpeakUpApp.answerAct2(${qIdx}, ${oIdx})" class="${btnCls}">
                      ${opt}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      ${st.act2Answered >= st.act2Total ? `
        <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
          <p class="text-xs sm:text-sm font-extrabold text-emerald-950">
            🎉 ${state.lang === "th" ? `ทำ Activity 2 ครบแล้ว! ได้คะแนน ${st.act2Correct} / ${st.act2Total} ข้อ` : `Activity 2 Complete! Score: ${st.act2Correct} / ${st.act2Total}`}
          </p>
          <button type="button" onclick="SpeakUpApp.switchActivity(3)" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition cursor-pointer">
            ${state.lang === "th" ? "ไปทำ Activity 3 ต่อ →" : "Continue to Activity 3 →"}
          </button>
        </div>
      ` : ""}
    `;
  }

  // =========================================================================
  // RENDER ACTIVITY 3: LISTEN AGAIN & COMPLETE (STEP-BY-STEP)
  // =========================================================================
  function renderActivity3() {
    const unit = getCurrentUnit();
    const p = ensureUnitProgress(unit.id);
    const st = getUnitDetailedStats(unit.id);
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
          <button type="button" onclick="SpeakUpApp.playAct1Passage()" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm">
            ${t("act3PlayPassage")}
          </button>
          <span class="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
            ${state.lang === "th" ? `คะแนน: ${st.act3Correct} / ${st.act3Total} ข้อ` : `Score: ${st.act3Correct} / ${st.act3Total}`}
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
            return `<button type="button" onclick="SpeakUpApp.jumpAct3Step(${idx})" class="${dotCls}">${idx + 1}</button>`;
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
            return `<button type="button" onclick="SpeakUpApp.answerAct3(${step}, ${oIdx})" class="${btnCls}">${opt}</button>`;
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
              <button type="button" onclick="SpeakUpApp.jumpAct3Step(${step - 1})" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                ${t("act3PrevBtn")}
              </button>
            ` : ""}

            ${step < items.length - 1 ? `
              <button type="button" onclick="SpeakUpApp.jumpAct3Step(${step + 1})" ${!hasAnswered ? "disabled" : ""} class="px-4 py-2 rounded-xl text-xs font-bold transition ${hasAnswered ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" : "bg-slate-200 text-slate-400 cursor-not-allowed"}">
                ${t("act3NextBtn")}
              </button>
            ` : `
              <button type="button" onclick="SpeakUpApp.switchActivity(4)" ${!hasAnswered ? "disabled" : ""} class="px-4 py-2 rounded-xl text-xs font-bold transition ${hasAnswered ? "bg-rose-600 hover:bg-rose-700 text-white shadow-sm" : "bg-slate-200 text-slate-400 cursor-not-allowed"}">
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
            <button type="button" onclick="SpeakUpApp.listenAndUnlockRed('${itemKey}', ${JSON.stringify(listenText).replace(/"/g, '&quot;')})" class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm">
              ${t("listenBtn")}
            </button>
            ${extraButtonsHtml || ""}
          </div>

          <div class="flex items-center gap-2">
            <button type="button" id="rec-btn-${itemKey}" onclick="SpeakUpApp.recordItem('${itemKey}', ${JSON.stringify(targetSpeechText).replace(/"/g, '&quot;')}, ${JSON.stringify(keywords || []).replace(/"/g, '&quot;')}, '${mode}')" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1">
              ${t("recordBtn")}
            </button>
            <button type="button" onclick="SpeakUpApp.playMyRecording('${itemKey}', ${JSON.stringify(ev ? ev.transcript : targetSpeechText).replace(/"/g, '&quot;')})" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold ${hasAudio || ev ? "" : "opacity-60"}">
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
              <button type="button" onclick="SpeakUpApp.playPartBSequence('${itemKey}', ${JSON.stringify(item.question).replace(/"/g, '&quot;')}, ${JSON.stringify(item.sample).replace(/"/g, '&quot;')})" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm">
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

    const st = getUnitDetailedStats(unit.id);
    const nextUnitId = unit.id < 12 ? unit.id + 1 : null;
    const nextUnit = nextUnitId ? getUnitById(nextUnitId) : null;

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-rose-500 uppercase">Activity 4 • Speak Up! (Parts A, B, C)</span>
          <h2 class="text-lg font-bold text-slate-900">${state.lang === "th" ? "ฝึกพูด อัดเสียง ฟังเสียงตัวเอง และรับผลประเมิน (% เฉลี่ยจากทุกข้อที่ทำ)" : "Speak, Record, Self-Listen & Get Average % Evaluation"}</h2>
          <p class="text-xs font-semibold text-indigo-700 mt-0.5">
            🎙️ ${state.lang === "th"
              ? `คะแนนการอ่านออกเสียงเฉลี่ย: ${st.act4AvgPercent}% (ฝึกพูดแล้ว ${st.act4CompletedCount} / ${st.act4TotalItems} ข้อ)`
              : `Average Speaking Score: ${st.act4AvgPercent}% (${st.act4CompletedCount} / ${st.act4TotalItems} items completed)`}
          </p>
        </div>

        <div class="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
          <button type="button" onclick="SpeakUpApp.switchAct4Part('A')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${state.act4Part === "A" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}">
            Part A: Repeat
          </button>
          <button type="button" onclick="SpeakUpApp.switchAct4Part('B')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${state.act4Part === "B" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}">
            Part B: Q&A
          </button>
          <button type="button" onclick="SpeakUpApp.switchAct4Part('C')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${state.act4Part === "C" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}">
            Part C: Challenge
          </button>
        </div>
      </div>

      ${partContentHtml}

      <!-- Bottom Unit Completion Summary & Next Unit Bar -->
      <div class="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-emerald-50 to-sky-50 border-2 border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div class="space-y-1">
          <p class="text-sm sm:text-base font-extrabold text-indigo-950">
            🏆 ${state.lang === "th" ? `สรุปผลคะแนนประจำ ${unit.title}` : `${unit.title} Score Summary`}
          </p>
          <p class="text-xs text-slate-700">
            ${state.lang === "th"
              ? `แบบฝึกหัด Activity 2: <b>${st.act2Correct}/${st.act2Total} ข้อ</b> • Activity 3: <b>${st.act3Correct}/${st.act3Total} ข้อ</b> • การอ่านออกเสียงเฉลี่ย (Activity 4): <b class="text-rose-600">${st.act4AvgPercent}%</b>`
              : `Activity 2: <b>${st.act2Correct}/${st.act2Total}</b> • Activity 3: <b>${st.act3Correct}/${st.act3Total}</b> • Speaking Average (Activity 4): <b class="text-rose-600">${st.act4AvgPercent}%</b>`}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <button type="button" onclick="SpeakUpApp.openUnitCompleteModal(${unit.id})" class="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition cursor-pointer">
            📊 ${state.lang === "th" ? "เปิด Pop-up สรุปคะแนน Unit นี้" : "View Unit Summary Pop-up"}
          </button>
          ${nextUnit ? `
            <button type="button" onclick="SpeakUpApp.goToNextUnit()" class="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition cursor-pointer">
              🚀 ${state.lang === "th" ? `ไปทำ Unit ${nextUnit.id} ต่อไป →` : `Go to Unit ${nextUnit.id} →`}
            </button>
          ` : ""}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // RENDER MODALS (UNIT COMPLETION POP-UP, GROUP QR, SCORES, DIAGNOSTICS)
  // =========================================================================
  function renderUnitCompleteModal(targetUnitId) {
    const uId = targetUnitId || state.unitId;
    const unit = getUnitById(uId);
    const st = getUnitDetailedStats(uId);
    const nextUnitId = unit.id < 12 ? unit.id + 1 : null;
    const nextUnit = nextUnitId ? getUnitById(nextUnitId) : null;

    const titleEl = document.getElementById("unit-complete-title");
    if (titleEl) {
      titleEl.textContent = state.lang === "th"
        ? `สรุปผลคะแนนประจำบทเรียน — Unit ${unit.id}`
        : `Unit ${unit.id} Completion Summary`;
    }
    const subEl = document.getElementById("unit-complete-subtitle");
    if (subEl) {
      subEl.textContent = `${unit.themeIcon} ${unit.title} (${unit.titleTh})`;
    }

    const bodyEl = document.getElementById("unit-complete-body");
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Activity 1 -->
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p class="text-xs font-extrabold text-indigo-600 uppercase">Activity 1 • Listening</p>
              <p class="text-xs font-bold text-slate-800">${state.lang === "th" ? "ฟังเนื้อเรื่อง/บทสนทนา" : "Listen to the Story"}</p>
            </div>
            <span class="px-3 py-1 rounded-xl text-sm font-extrabold ${st.act1Done ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}">
              ${st.act1Done} / ${st.act1Total} ${state.lang === "th" ? "ข้อ" : ""}
            </span>
          </div>

          <!-- Activity 2 -->
          <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between">
            <div>
              <p class="text-xs font-extrabold text-indigo-700 uppercase">Activity 2 • Understanding</p>
              <p class="text-xs font-bold text-slate-800">${state.lang === "th" ? "แบบฝึกหัดตอบคำถาม" : "Comprehension Questions"}</p>
            </div>
            <span class="px-3 py-1 rounded-xl text-sm font-extrabold bg-indigo-600 text-white shadow-sm">
              ${st.act2Correct} / ${st.act2Total} ${state.lang === "th" ? "ข้อ" : ""}
            </span>
          </div>

          <!-- Activity 3 -->
          <div class="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-center justify-between">
            <div>
              <p class="text-xs font-extrabold text-sky-700 uppercase">Activity 3 • Complete Sentence</p>
              <p class="text-xs font-bold text-slate-800">${state.lang === "th" ? "แบบฝึกหัดเติมคำในประโยค" : "Sentence Completion"}</p>
            </div>
            <span class="px-3 py-1 rounded-xl text-sm font-extrabold bg-sky-600 text-white shadow-sm">
              ${st.act3Correct} / ${st.act3Total} ${state.lang === "th" ? "ข้อ" : ""}
            </span>
          </div>

          <!-- Combined Exercises (Act 2 + Act 3) -->
          <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
            <div>
              <p class="text-xs font-extrabold text-emerald-700 uppercase">${state.lang === "th" ? "รวมคะแนนแบบฝึกหัด" : "Total Exercise Score"}</p>
              <p class="text-xs font-bold text-slate-800">Activity 2 + Activity 3</p>
            </div>
            <span class="px-3 py-1 rounded-xl text-sm font-extrabold bg-emerald-600 text-white shadow-sm">
              ${st.exerciseCorrect} / ${st.exerciseTotal} ${state.lang === "th" ? "ข้อ" : ""}
            </span>
          </div>
        </div>

        <!-- Activity 4 Speaking Average % Box -->
        <div class="p-4 rounded-2xl bg-rose-50/80 border-2 border-rose-200 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-xs font-extrabold text-rose-600 uppercase">Activity 4 • Speak Up! (Parts A, B, C)</span>
              <h4 class="text-sm font-extrabold text-slate-900">
                ${state.lang === "th"
                  ? `คะแนนการอ่านออกเสียงเฉลี่ย (จากที่ทำ ${st.act4CompletedCount} ข้อ)`
                  : `Average Speaking Score (${st.act4CompletedCount} items completed)`}
              </h4>
            </div>
            <span class="px-4 py-1.5 rounded-2xl bg-rose-600 text-white font-extrabold text-base shadow-sm">
              ${st.act4AvgPercent}%
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="p-2 rounded-xl bg-white border border-rose-100 text-center">
              <p class="text-slate-500 font-semibold">${state.lang === "th" ? "สำเนียง" : "Accent"}</p>
              <p class="font-extrabold text-indigo-700 text-sm">${st.act4AvgAccent}%</p>
            </div>
            <div class="p-2 rounded-xl bg-white border border-rose-100 text-center">
              <p class="text-slate-500 font-semibold">${state.lang === "th" ? "ความครบถ้วน" : "Completeness"}</p>
              <p class="font-extrabold text-emerald-700 text-sm">${st.act4AvgComplete}%</p>
            </div>
            <div class="p-2 rounded-xl bg-white border border-rose-100 text-center">
              <p class="text-slate-500 font-semibold">${state.lang === "th" ? "ความชัดเจน" : "Clarity"}</p>
              <p class="font-extrabold text-sky-700 text-sm">${st.act4AvgClarity}%</p>
            </div>
            <div class="p-2 rounded-xl bg-white border border-rose-100 text-center">
              <p class="text-slate-500 font-semibold">${state.lang === "th" ? "เวลาในการพูด" : "Speaking Time"}</p>
              <p class="font-extrabold text-amber-700 text-sm">${st.act4AvgTime}%</p>
            </div>
          </div>
        </div>
      `;
    }

    const footerEl = document.getElementById("unit-complete-footer");
    if (footerEl) {
      footerEl.innerHTML = `
        <button type="button" onclick="SpeakUpApp.closeModal('unit-complete-modal')" class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer">
          ${state.lang === "th" ? "ทบทวนอยู่ใน Unit นี้ต่อ" : "Stay in This Unit"}
        </button>
        ${nextUnit ? `
          <button type="button" onclick="SpeakUpApp.goToNextUnit()" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition flex items-center justify-center gap-2 cursor-pointer">
            <span>🚀 ${state.lang === "th" ? `ไปทำ Unit ${nextUnit.id}: ${nextUnit.title.replace(/^Unit \d+:\s*/, "")} →` : `Go to Unit ${nextUnit.id}: ${nextUnit.title.replace(/^Unit \d+:\s*/, "")} →`}</span>
          </button>
        ` : `
          <button type="button" onclick="SpeakUpApp.closeModal('unit-complete-modal'); SpeakUpApp.openModal('score-modal');" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md transition cursor-pointer">
            🏆 ${state.lang === "th" ? "ดูตารางสรุปคะแนนรวมทั้ง 12 Units" : "View All 12 Units Score Summary"}
          </button>
        `}
      `;
    }
  }

  function checkAndTriggerUnitCompletePopup(uId) {
    const p = ensureUnitProgress(uId);
    const st = getUnitDetailedStats(uId);
    if (st.isUnitCompleted && !p.unitPopupShown) {
      p.unitPopupShown = true;
      saveState();
      safeSound("playFanfare");
      renderUnitCompleteModal(uId);
      const m = document.getElementById("unit-complete-modal");
      if (m) {
        m.classList.remove("hidden");
        m.style.display = "flex";
      }
    }
  }

  function getShareableBaseUrl() {
    try {
      if (window.location && (window.location.protocol === "http:" || window.location.protocol === "https:")) {
        return `${window.location.origin}${window.location.pathname}`;
      }
    } catch (e) {}
    return "https://doit-on.github.io/speak-up-CEFR-A1/";
  }

  function renderQRModal() {
    const qrUnitSelect = document.getElementById("qr-unit-select");
    if (qrUnitSelect) {
      qrUnitSelect.innerHTML = window.SPEAKUP_UNITS.map(u =>
        `<option value="${u.id}" ${u.id === Number(state.unitId) ? "selected" : ""}>Unit ${u.id}: ${u.title.replace(/^Unit \d+:\s*/, "")}</option>`
      ).join("");
    }
    const roomInput = document.getElementById("qr-room-input");
    if (roomInput && document.activeElement !== roomInput) {
      roomInput.value = state.roomCode;
    }

    const baseUrl = getShareableBaseUrl();
    const shareUrl = `${baseUrl}?unit=${state.unitId}&room=${encodeURIComponent(state.roomCode)}&lang=${state.lang}`;
    const qrInfo = window.QRGenerator.generateMatrix(shareUrl);
    const qrSvg = window.QRGenerator.generateSVG(shareUrl);

    const svgBox = document.getElementById("qr-svg-container");
    if (svgBox) svgBox.innerHTML = qrSvg;
    const urlInput = document.getElementById("qr-share-url");
    if (urlInput) urlInput.value = shareUrl;

    const verifyBadge = document.getElementById("qr-verify-badge");
    if (verifyBadge) {
      verifyBadge.textContent = state.lang === "th"
        ? `✅ มาตรฐาน ISO/IEC 18004 (Version ${qrInfo.version} • ${qrInfo.size}x${qrInfo.size}) สแกนเข้า Unit ${state.unitId} ได้จริง`
        : `✅ ISO/IEC 18004 Verified (Version ${qrInfo.version} • ${qrInfo.size}x${qrInfo.size}) Ready for Unit ${state.unitId}`;
    }
  }

  function renderScoresModal() {
    const summary = getAllUnitsSummary();
    const tbody = document.getElementById("scores-table-body");
    if (tbody) {
      tbody.innerHTML = window.SPEAKUP_UNITS.map(u => {
        const st = getUnitDetailedStats(u.id);
        return `
          <tr class="border-b border-slate-100 text-xs">
            <td class="py-2 font-bold text-slate-800">${u.themeIcon} Unit ${u.id}: ${u.title.replace(/^Unit \d+:\s*/, "")}</td>
            <td class="py-2 text-center">${st.act1Done}/${st.act1Total}</td>
            <td class="py-2 text-center font-semibold">${st.act2Correct}/${st.act2Total} ${state.lang === "th" ? "ข้อ" : ""}</td>
            <td class="py-2 text-center font-semibold">${st.act3Correct}/${st.act3Total} ${state.lang === "th" ? "ข้อ" : ""}</td>
            <td class="py-2 text-center font-extrabold text-rose-600">${st.act4AvgPercent}%</td>
            <td class="py-2 text-center font-extrabold text-indigo-700">${st.exerciseCorrect}/${st.exerciseTotal} (${st.act4AvgPercent}%)</td>
          </tr>
        `;
      }).join("");
    }
    const masterEl = document.getElementById("master-score-banner");
    if (masterEl) {
      masterEl.innerHTML = state.lang === "th"
        ? `<div>
            <p class="text-xs font-bold text-indigo-900">คะแนนแบบฝึกหัดรวม 12 Units: <span class="text-base text-indigo-700">${summary.totalExerciseCorrect}/${summary.totalExerciseQuestions} ข้อ</span> • อ่านออกเสียงเฉลี่ย: <span class="text-base text-rose-600">${summary.overallSpeakingAvg}%</span></p>
            <p class="text-xs text-slate-600">ทำครบทุก Activity แล้ว: <b>${summary.completedUnits} / 12 Units</b> • ห้องเรียน: <b>${state.roomCode}</b></p>
           </div>`
        : `<div>
            <p class="text-xs font-bold text-indigo-900">Total Exercises (12 Units): <span class="text-base text-indigo-700">${summary.totalExerciseCorrect}/${summary.totalExerciseQuestions}</span> • Speaking Average: <span class="text-base text-rose-600">${summary.overallSpeakingAvg}%</span></p>
            <p class="text-xs text-slate-600">Completed Units: <b>${summary.completedUnits} / 12 Units</b> • Room: <b>${state.roomCode}</b></p>
           </div>`;
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
      verBadge.innerHTML = `Version v${report.version} • ${report.passedCount}/${report.totalCount} OK`;
    }
    const landingDiag = document.getElementById("landing-diag-badge");
    if (landingDiag) {
      landingDiag.innerHTML = state.lang === "th"
        ? `✅ ระบบตรวจสอบตัวเองอัตโนมัติ (v${report.version}): ผ่านครบ ${report.passedCount}/${report.totalCount} รายการ`
        : `✅ Self-Diagnostic Suite (v${report.version}): ${report.passedCount}/${report.totalCount} Checks Passed`;
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
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(key));
    });

    updateLanguageButtonsUI();
    renderLandingPage();
    renderStep0GoalsAndVocab();
    updateGuideMessage();
    updateScoreBadges();
    renderActivity1();
    renderActivity2();
    renderActivity3();
    renderActivity4();
    renderDiagnosticsModal();
  }

  // =========================================================================
  // PUBLIC INTERACTIVE ACTIONS
  // =========================================================================
  return {
    init() {
      loadState();
      renderAll();
    },

    showLandingPage() {
      safeSound("playClick");
      if (window.SpeechEngine) window.SpeechEngine.stop();
      state.act1Playing = false;
      state.view = "landing";
      syncViewVisibility();
      renderLandingPage();
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
    },

    enterWorkspace(targetUnitId) {
      safeSound("playUnlock");
      const nameEl = document.getElementById("landing-student-name");
      const roomEl = document.getElementById("landing-room-code");
      if (nameEl && nameEl.value && nameEl.value.trim()) state.studentName = nameEl.value.trim();
      if (roomEl && roomEl.value && roomEl.value.trim()) state.roomCode = roomEl.value.trim().toUpperCase();
      if (targetUnitId) {
        state.unitId = Number(targetUnitId);
      }
      // Always start at Step 0 (Learning Goals & Vocabulary Table) before Activity 1!
      state.activityId = 0;
      state.act1Playing = false;
      state.act3Step = 0;
      state.view = "workspace";
      syncViewVisibility();
      saveState();
      renderAll();
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
    },

    setLang(lang) {
      safeSound("playClick");
      state.lang = lang === "en" ? "en" : "th";
      saveState();
      renderAll();
    },

    setSpeed(rate) {
      safeSound("playClick");
      if (window.SpeechEngine) window.SpeechEngine.setRate(rate);
      ["075", "085", "100"].forEach(id => {
        const el = document.getElementById("spd-" + id);
        if (el) el.className = "px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs";
      });
      const activeId = rate === 0.75 ? "075" : rate === 0.85 ? "085" : "100";
      const activeEl = document.getElementById("spd-" + activeId);
      if (activeEl) activeEl.className = "px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold shadow-sm text-xs";
    },

    changeUnit(uId) {
      safeSound("playClick");
      if (window.SpeechEngine) window.SpeechEngine.stop();
      state.unitId = Number(uId);
      state.activityId = 0; // Show Learning Goals & Vocabulary first whenever switching to a Unit!
      state.act1Playing = false;
      state.act3Step = 0;
      state.view = "workspace";
      saveState();
      renderAll();
    },

    goToNextUnit() {
      this.closeModal("unit-complete-modal");
      const nextId = state.unitId < 12 ? Number(state.unitId) + 1 : 1;
      this.changeUnit(nextId);
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
    },

    openUnitCompleteModal(targetUnitId) {
      safeSound("playFanfare");
      renderUnitCompleteModal(targetUnitId || state.unitId);
      const m = document.getElementById("unit-complete-modal");
      if (m) {
        m.classList.remove("hidden");
        m.style.display = "flex";
      }
    },

    speakLearningGoals() {
      const unit = getCurrentUnit();
      window.SpeechEngine.speak([`Learning Goals for ${unit.title}`, ...unit.learningGoals]);
    },

    speakVocab(idx) {
      const unit = getCurrentUnit();
      const v = unit.vocabulary[idx];
      if (!v) return;
      window.SpeechEngine.speak([v.word, v.example]);
    },

    speakAllVocab() {
      const unit = getCurrentUnit();
      const lines = [];
      unit.vocabulary.forEach(v => {
        lines.push(`${v.word}. ${v.example}`);
      });
      window.SpeechEngine.speak(lines);
    },

    switchActivity(actNum) {
      safeSound("playClick");
      if (window.SpeechEngine) window.SpeechEngine.stop();
      state.act1Playing = false;
      state.view = "workspace";
      state.activityId = Number(actNum);
      syncViewVisibility();
      updateGuideMessage();
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
    },

    playAct1Passage() {
      const unit = getCurrentUnit();
      const sentences = [unit.activity1.title, ...(unit.activity1.phrases || unit.activity1.passage.split("\n"))];
      state.act1Playing = true;
      state.act1CurrentSentence = 1;
      state.act1TotalSentences = sentences.length;
      state.act1CurrentSpeaker = null;
      state.act1CurrentGender = null;
      renderActivity1();

      window.SpeechEngine.speak(sentences, {
        onProgress: (pct, curIdx, total, curItem) => {
          state.act1CurrentSentence = curIdx || 1;
          state.act1TotalSentences = total || sentences.length;
          state.act1CurrentSpeaker = curItem && curItem.speaker ? curItem.speaker : null;
          state.act1CurrentGender = curItem && curItem.gender ? curItem.gender : null;
          const bar = document.getElementById("act1-progress-bar");
          if (bar) bar.style.width = `${pct}%`;
          const statusEl = document.getElementById("act1-status-line");
          if (statusEl) {
            const spkInfo = state.act1CurrentSpeaker
              ? (state.lang === "th"
                  ? ` • 🎙️ ผู้พูด: ${state.act1CurrentSpeaker} (${state.act1CurrentGender === "male" ? "เสียงผู้ชาย 👨" : "เสียงผู้หญิง 👩"})`
                  : ` • 🎙️ Speaker: ${state.act1CurrentSpeaker} (${state.act1CurrentGender === "male" ? "Male Voice 👨" : "Female Voice 👩"})`)
              : "";
            statusEl.textContent = state.lang === "th"
              ? `🔊 กำลังอ่านออกเสียงประโยคที่ ${state.act1CurrentSentence} / ${state.act1TotalSentences}${spkInfo}`
              : `🔊 Reading sentence ${state.act1CurrentSentence} of ${state.act1TotalSentences}${spkInfo}`;
          }
        },
        onEnd: () => {
          state.act1Playing = false;
          state.act1CurrentSpeaker = null;
          this.unlockAct1Now();
        }
      });
    },

    unlockAct1Now() {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      state.act1Playing = false;
      if (!p.act1Unlocked) {
        safeSound("playUnlock");
        p.act1Unlocked = true;
        // Require the user to click 'Show Story Text' button after listening finishes!
        p.act1ShowText = false;
      }
      p.act1Score = 100;
      saveState();
      renderActivity1();
      checkAndTriggerUnitCompletePopup(unit.id);
    },

    toggleAct1Text(show) {
      safeSound("playClick");
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      if (!p.act1Unlocked) return;
      p.act1ShowText = !!show;
      saveState();
      renderActivity1();
    },

    relockAct1() {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      if (window.SpeechEngine) window.SpeechEngine.stop();
      state.act1Playing = false;
      p.act1ShowText = false;
      saveState();
      renderActivity1();
    },

    speakAct2Question(qIdx) {
      const unit = getCurrentUnit();
      const q = unit.activity2[qIdx];
      if (q) window.SpeechEngine.speak(`Question ${qIdx + 1}. ${q.question}`);
    },

    answerAct2(qIdx, oIdx) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      const q = unit.activity2[qIdx];
      p.act2Answers[qIdx] = oIdx;

      if (oIdx === q.answerIndex) {
        safeSound("playCorrect");
      } else {
        safeSound("playWrong");
      }

      let correct = 0;
      unit.activity2.forEach((item, idx) => {
        if (p.act2Answers[idx] === item.answerIndex) correct++;
      });
      p.act2Score = Math.round((correct / unit.activity2.length) * 100);
      saveState();
      renderActivity2();
      checkAndTriggerUnitCompletePopup(unit.id);
    },

    answerAct3(stepIdx, oIdx) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      const item = unit.activity3[stepIdx];
      p.act3Answers[stepIdx] = oIdx;

      if (oIdx === item.answerIndex) {
        safeSound("playCorrect");
      } else {
        safeSound("playWrong");
      }

      let correct = 0;
      unit.activity3.forEach((it, idx) => {
        if (p.act3Answers[idx] === it.answerIndex) correct++;
      });
      p.act3Score = Math.round((correct / unit.activity3.length) * 100);
      saveState();
      renderActivity3();
      checkAndTriggerUnitCompletePopup(unit.id);
    },

    jumpAct3Step(stepIdx) {
      safeSound("playClick");
      state.act3Step = stepIdx;
      renderActivity3();
    },

    switchAct4Part(part) {
      safeSound("playClick");
      if (window.SpeechEngine) window.SpeechEngine.stop();
      state.act4Part = part;
      renderActivity4();
    },

    listenAndUnlockRed(itemKey, text) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      window.SpeechEngine.speak(text, {
        onEnd: () => {
          if (!p.redUnlocked[itemKey]) {
            safeSound("playUnlock");
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
      window.SpeechEngine.speak([question, `Sample answer: ${sample}`, `Listen again: ${question}`], {
        onEnd: () => {
          safeSound("playUnlock");
          p.redUnlocked[itemKey] = true;
          saveState();
          renderActivity4();
        }
      });
    },

    recordItem(itemKey, targetText, keywords, mode) {
      const unit = getCurrentUnit();
      const p = ensureUnitProgress(unit.id);
      p.redUnlocked[itemKey] = true;

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
          checkAndTriggerUnitCompletePopup(unit.id);
        }
      );
    },

    playMyRecording(itemKey, fallbackText) {
      window.VoiceEvaluator.playRecordedVoice(itemKey, fallbackText);
    },

    openModal(id) {
      safeSound("playClick");
      if (id === "qr-modal") renderQRModal();
      if (id === "score-modal") renderScoresModal();
      if (id === "diag-modal") renderDiagnosticsModal();
      if (id === "unit-complete-modal") renderUnitCompleteModal(state.unitId);
      const m = document.getElementById(id);
      if (m) {
        m.classList.remove("hidden");
        m.style.display = "flex";
      }
    },

    closeModal(id) {
      safeSound("playClick");
      const m = document.getElementById(id);
      if (m) {
        m.classList.add("hidden");
        m.style.display = "none";
      }
    },

    updateRoomCode() {
      const input = document.getElementById("qr-room-input");
      const unitSel = document.getElementById("qr-unit-select");
      if (input && input.value.trim()) {
        state.roomCode = input.value.trim().toUpperCase();
      }
      if (unitSel && unitSel.value) {
        state.unitId = Number(unitSel.value);
      }
      saveState();
      renderQRModal();
    },

    simulateJoinFromQR() {
      this.updateRoomCode();
      this.closeModal("qr-modal");
      this.enterWorkspace(state.unitId);
    },

    copyShareLink() {
      const urlInput = document.getElementById("qr-share-url");
      if (!urlInput) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(urlInput.value).catch(() => {});
      }
      safeSound("playCorrect");
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
        `Total Exercises (12 Units): ${summary.totalExerciseCorrect}/${summary.totalExerciseQuestions} items`,
        `Overall Speaking Average: ${summary.overallSpeakingAvg}% (${summary.completedUnits}/12 Units Completed)`,
        `----------------------------------------`
      ];

      window.SPEAKUP_UNITS.forEach(u => {
        const st = getUnitDetailedStats(u.id);
        lines.push(`${u.title}: Act1 ${st.act1Done}/${st.act1Total}, Act2 ${st.act2Correct}/${st.act2Total}, Act3 ${st.act3Correct}/${st.act3Total}, Act4 Speaking Avg: ${st.act4AvgPercent}%`);
      });

      const subject = encodeURIComponent(`Speak Up CEFR A1 Score Report - ${state.studentName || "Student"} (${summary.totalExerciseCorrect}/${summary.totalExerciseQuestions} • Speak ${summary.overallSpeakingAvg}%)`);
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.SpeakUpApp.init();
  });
} else {
  window.SpeakUpApp.init();
}
