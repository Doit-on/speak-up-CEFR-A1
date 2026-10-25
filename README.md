# 🎧 Speak Up! CEFR A1 — Interactive Listening & Speaking Platform (12 Units)

**Version:** `v1.3.0 (Build 2026.10.25-GOALS-QR)`  
**Live GitHub Pages URL:** [https://doit-on.github.io/speak-up-CEFR-A1/](https://doit-on.github.io/speak-up-CEFR-A1/)

## ✨ Features
- **TWP (ทวพ.) Landing Page**: Welcomes students with the official **โลโก้ ทวพ.**, bold **"Speak Up! CEFR A1"** title, clear **System Version (`v1.3.0`) & Self-Diagnostic (`8/8 OK`)** banner, and 12-Unit quick-launch cards.
- **Complete 12 Units (48 Activities, 219 Interactive Items)** based on the *Speak Up: Listening and Speaking Exercises (CEFR A1)* curriculum.
- **Pre-Activity Learning Goals & Vocabulary Table (Step 0)**:
  - Displayed immediately upon entering any of the 12 Units before starting Activity 1.
  - Shows unit-specific **Learning Goals** and the 3-column **Vocabulary Table (`Vocabulary | ความหมาย | Example`)** with individual & sequential audio playback and a direct **"Go to Activity 1"** launch button.
- **Red-Text Listen-First Condition**:
  - **Activity 1 (Listen to the Story / Conversation / Fun Facts)**: Strictly hides both the title and passage text until the full audio narration completes (`0.85x`). Once finished, reveals the Red Text and an interactive **Listen and repeat each phrase** practice list.
  - **Activity 2 (Check Your Understanding)**: Question audio plays first; the red question text appears after an answer is selected.
  - **Activity 3 (Listen Again & Complete the Sentence)**: Passage audio + step-by-step question progression.
  - **Activity 4 (Speak Up! — Parts A, B, C)**:
    - **Part A**: Listen and repeat sentences + voice recording & self-playback.
    - **Part B**: Automated sequence (*Question → Sample Answer → Question Again*) + voice recording & self-playback.
    - **Part C**: Speaking Challenge / My Daily Routine + sentence starters & voice recording.
- **4-Standard Speech Evaluation (% out of 100%)**:
  1. **Accent & Pronunciation (สำเนียงและการออกเสียง — 30%)**
  2. **Content Completeness (ความครบถ้วนของเนื้อหา — 30%)**
  3. **Voice Clarity (ความชัดเจนของเสียง — 20%)**
  4. **Speaking Time & Pace (เวลาและจังหวะในการพูด — 20%)**
  - Includes personalized bilingual feedback (`TH / EN`).
- **Minimalist Pastel Anime UI** with Detective Kenji guide character.
- **ISO/IEC 18004 Scannable Group QR Code & Classroom Link Sync**: Encodes `?unit=1&room=CLASS-A1&lang=th` using Reed-Solomon GF(256) ECC Level L so real smartphone cameras & LINE QR scanners can scan and join the same Unit & Room simultaneously.
- **LocalStorage Score Tracking & Email Report**: Saves progress per Activity, per Unit, and across all 12 Units with 1-click Email report generation.
- **Automated Self-Diagnostic Suite**: Runs 8 system integrity checks on startup and every version update.
