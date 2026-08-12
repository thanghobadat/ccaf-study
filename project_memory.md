# 🧠 PROJECT MEMORY SNAPSHOT — CCAF LEARNING & EXAM PLATFORM

> **MACHINE READABLE MEMORY FILE FOR AGENT RESUME**  
> *Last Updated: 2026-08-12 09:35 (Local Time)*  
> *Target Goal: Pass Claude Certified Architect - Foundations (CCAF) exam in 15 Days in 100% English Mode.*

---

## 📌 1. KEY REFERENCE LINKS & DOCUMENTATION SOURCES

### 🌐 Web Links
- **Reference Web:** `https://ccaflearning.vercel.app/` (Original 5-domain community reference site).
- **Active Local Web:** `http://localhost:8080` (Current live platform running locally at `d:\AI\CCAF\website` via `python -m http.server 8080`).
- **GitHub Repository:** `https://github.com/thanghobadat/ccaf-study.git` (Remote origin repo).

### 📄 Documentation Files (Root Knowledge)
- **Doc 1:** `d:\AI\CCAF\tài liệu\CCA_Foundations_Study_Guide.md`  
  *Contains official Anthropic exam structure (60 questions / 120 mins, 720/1000 pass score), 5 domain weightings, 6 production archetypes, and 77 official scenario sample questions with Anthropic explanations.*
- **Doc 2:** `d:\AI\CCAF\tài liệu\The Architect's Playbook.md`  
  *Contains unabridged technical theory: System Prompt design, Context Window management, Message Roles (system, user, assistant, tool_use, tool_result), Agent loops, MCP protocols, and architectural tradeoffs.*
- **Doc 3:** `d:\AI\CCAF\tài liệu\CCAF_Question_Generation_Guide.md`  
  *Version 2.0 Gold Standard question generation guide: 5 domain breakdowns, 10 batches allocation, 14-field JSON schema, and 3 Gold Standard Principles.*
- **Doc 4:** `d:\AI\CCAF\tài liệu\CCAF_254_Official_Mock_Exam_Bank.md`  
  *254 unabridged scenario questions from Claude Certification Guide.*

---

## 📅 2. 15-DAY DUAL-LANGUAGE STRATEGY
- **Phase 1 (Days 1 - 10): 🇻🇳 Vietnamese Foundation Sprint**  
  Nạp 100% bản chất kỹ thuật bằng Tiếng Việt qua 5 Domain Sprints (D1: Ngày 1-3, D2 & D3: Ngày 4-7, D4 & D5: Ngày 8-10).
- **Phase 2 (Days 11 - 15): 🇬🇧 English Exam Intensive Sprint**  
  Bật **English Mode** toàn bộ hệ thống để luyện đọc 13 bài EN, 67 Nguyên tắc EN và Thi thật/Thi mô phỏng 100% Tiếng Anh gốc từ Anthropic.

---

## 🎯 3. EXAM WEIGHTINGS & 6 PRODUCTION ARCHETYPES

### 5 Exam Domains & Weights
1. **Domain 1: Agent Architecture & Orchestration (27%)** — Agent SDK, Coordinator-Worker, Task tool, Flat Hierarchy, State recovery, Turn limits. (116 Questions)
2. **Domain 2: Tool Design & MCP Integration (18%)** — Granular tools, Resilient schemas, MCP Server/Client (stdio vs SSE), Redundancy schemas. (121 Questions)
3. **Domain 3: Claude Code Configuration & Workflows (20%)** — CLI flags (`--dangerously-skip-permissions`), `CLAUDE.md` hierarchy, Glob/Grep before View, CI/CD pipelines. (153 Questions)
4. **Domain 4: Prompt Engineering & Structured Output (20%)** — Few-shot examples, JSON Schemas, Explicit Null, CoT `<thinking>`, XML boundaries `<context>`. (169 Questions)
5. **Domain 5: Context Management & Reliability (15%)** — Context Pruning, Lost-in-the-middle, Message Batches API (50% cost saving), Escalation hooks. (85 Questions)

### 6 Production Archetypes
1. Customer Support Resolution Agent
2. Code Generation & Refactoring with Claude Code
3. Multi-Agent Research & Synthesis System
4. Developer Productivity Tools (MCP Infrastructure)
5. Claude Code in CI/CD & Automated PR Review
6. Structured Data Extraction & OCR Processing

---

## 🗂️ 4. FILE TREE & CODEBASE MAP

```
d:\AI\CCAF\
├── rule.md                          # Mandatory project rules (Planning First, Summary Rule, Rule 4 Manual Push)
├── .agents/AGENTS.md                # Agent workspace customization rules
├── project_memory.md                # This machine-readable state snapshot
├── vercel.json                      # Vercel deployment configuration (cleanUrls & website rewrites)
├── .gitignore                       # Git ignore configuration
├── tài liệu/
│   ├── CCA_Foundations_Study_Guide.md
│   ├── The Architect's Playbook.md
│   ├── CCAF_Question_Generation_Guide.md
│   ├── CCAF_254_Official_Mock_Exam_Bank.md
│   ├── CCAF_Addition_Guide_for_Weak_Models.md
│   └── generate/                    # 289 Output JSON Question Batches (570 Questions)
└── website/                         # Web Application Root (Python HTTP server on 8080)
    ├── favicon.ico                  # High resolution multi-size website icon
    ├── index.html                   # Auto-redirect 0s landing page pointing to mock-exam.html
    ├── domains.html                 # 5 Domain Comprehensive Overview & Technical Specs module
    ├── learn.html                   # 13 Unabridged Theory Chapters with Collapsible Part 2 Accordions & Part 3 Summary Modal
    ├── principles.html              # 67 Core Architectural Principles module (English-First + Deep Breakdown Modal)
    ├── mock-exam.html               # 60Q Clean Gold Standard Exam Simulator + Custom Practice + Instant Stop Exam Button
    ├── css/
    │   └── style.css                # Dark/Light CSS design system, keyword badges, grid button styles (.grid-nav-btn)
    └── js/
        ├── app.js                   # AppStore crash-proof state management, XP, Streak, Language state
        ├── domains.js               # Domain overview renderer & specs filter
        ├── learn.js                 # Collapsible accordion reader, Part 3 summary popup modal controls
        ├── principles.js            # Principles English-First filter & deep explanation modal trigger
        ├── mock-exam.js             # Proctored 60Q Simulator Engine, Clean Practice, Instant cancelMockExam
        └── data/
            ├── domains-overview.js  # Unabridged technical overview data for 5 CCAF Exam Domains (D1-D5)
            ├── chapters.js          # 13 Complete visual theory modules (English-First + VI translations for 100% of blocks)
            ├── principles.js        # 67 Core Principles data (IDs 1-67) bilingual EN+VI
            ├── keyword-glossary.js  # 35+ Technical Keyword Glossary dictionary
            ├── principles-deep-explanations.js # Structured deep 4-part explanations dataset for 67 Principles (IDs 1-67)
            └── mock-exam-data.js    # Expanded 644 Unique Core Scenario Questions Dataset v18.0 (100% valid JSON)
```

---

## ⚙️ 5. KEY SYSTEM FEATURES BUILT & VERIFIED

- **Expanded 644 Unique Questions Dataset v18.0 (`mock-exam-data.js`):** Formatted all 289 output files in `tài liệu/generate/output` and merged 570 unique Gold Standard questions into `mock-exam-data.js`, expanding the pool from 74 to 644 scenario questions (D1: 116, D2: 121, D3: 153, D4: 169, D5: 85). Verified 100% valid JS/JSON syntax, 0 duplicate IDs, 0 duplicate scenarios, and balanced answer spread (178 A / 175 B / 148 C / 143 D).
- **Fixed 0-Score Exam Grading Bug (`mock-exam.js`):** Fixed `selectOption` inline onclick parameter escaping by quoting `'${q.id}'`, ensuring user choices save properly to `mockExamAnswers` and scoring operates with 100% precision.
- **Enhanced Grid Navigator CSS (`style.css` & `mock-exam.html`):** Added clear visual indicators for Active (Cyan ring), Answered (Emerald glow), Active+Answered (Cyan ring + Emerald fill), and Flagged (Amber) questions, with updated legend.
- **Review Mode Header Controls (`mock-exam.js` & `mock-exam.html`):** Dynamically transformed top sticky bar buttons upon exam submission from "🛑 Dừng Thi / Hủy Bài" to "🏠 Về Trang Chọn Đề" and "✓ Nộp Bài" to "📊 Xem Báo Cáo Score".
- **Navigation & Page Cleanup:** Completely deleted deprecated Copy Raw Docs page (`raw-docs.html`, `js/raw-docs.js`, `js/data/raw-docs-data.js`) and cleaned up all navigation links across `domains.html`, `learn.html`, `principles.html`, and `mock-exam.html`.
- **Interactive Practice Arena & Simulator (`mock-exam.html` & `mock-exam.js`):** Supports practice filtering and exam simulation across 644 scenario questions.
- **Rule 4 Enforced:** Manual Git Push & Project Memory Sync executed upon explicit user request.
- **Git Repository Status:** Synced to `https://github.com/thanghobadat/ccaf-study.git` on branch `main`.

---

## 🚨 6. AGENT WORKFLOW MANDATES (MUST OBEY ON RESUME)
1. **Always read `d:\AI\CCAF\rule.md` first** before taking any action.
2. **Planning First:** Always present an Implementation Plan first before executing file edits.
3. **Summary Rule:** Always summarize accomplishments briefly upon completion.
4. **Manual Git Push & Memory Sync Only:** NEVER automatically `git push` or edit `project_memory.md` after editing files. ONLY run `git push` and update `project_memory.md` when the user explicitly requests it.
