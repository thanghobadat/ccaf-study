# 🧠 PROJECT MEMORY SNAPSHOT — CCAF LEARNING & EXAM PLATFORM

> **MACHINE READABLE MEMORY FILE FOR AGENT RESUME**  
> *Last Updated: 2026-08-09 22:33 (Local Time)*  
> *Target Goal: Pass Claude Certified Architect - Foundations (CCAF) exam in 15 Days in 100% English Mode.*

---

## 📌 1. KEY REFERENCE LINKS & DOCUMENTATION SOURCES

### 🌐 Web Links
- **Reference Web:** `https://ccaflearning.vercel.app/` (Original 5-domain community reference site).
- **Active Local Web:** `http://localhost:3000` (Current live platform running locally at `d:\AI\CCAF\website` via `python -m http.server 3000`).
- **GitHub Repository:** `https://github.com/thanghobadat/ccaf-study.git` (Remote origin repo).

### 📄 Documentation Files (Root Knowledge)
- **Doc 1:** `d:\AI\CCAF\tài liệu\CCA_Foundations_Study_Guide.md`  
  *Contains official Anthropic exam structure (60 questions / 120 mins, 720/1000 pass score), 5 domain weightings, 6 production archetypes, and 77 official scenario sample questions with Anthropic explanations.*
- **Doc 2:** `d:\AI\CCAF\tài liệu\The Architect's Playbook.md`  
  *Contains unabridged technical theory: System Prompt design, Context Window management, Message Roles (system, user, assistant, tool_use, tool_result), Agent loops, MCP protocols, and architectural tradeoffs.*

---

## 📅 2. 15-DAY DUAL-LANGUAGE STRATEGY
- **Phase 1 (Days 1 - 10): 🇻🇳 Vietnamese Foundation Sprint**  
  Nạp 100% bản chất kỹ thuật bằng Tiếng Việt qua 5 Domain Sprints (D1: Ngày 1-3, D2 & D3: Ngày 4-7, D4 & D5: Ngày 8-10).
- **Phase 2 (Days 11 - 15): 🇬🇧 English Exam Intensive Sprint**  
  Bật **English Mode** toàn bộ hệ thống để luyện đọc 13 bài EN, 67 Nguyên tắc EN, Flashcards EN và Thi thử/Thi mô phỏng 100% Tiếng Anh gốc từ Anthropic.

---

## 🎯 3. EXAM WEIGHTINGS & 6 PRODUCTION ARCHETYPES

### 5 Exam Domains & Weights
1. **Domain 1: Agent Architecture & Orchestration (27%)** — Agent SDK, Coordinator-Worker, Task tool, Flat Hierarchy, State recovery, Turn limits.
2. **Domain 2: Tool Design & MCP Integration (18%)** — Granular tools, Resilient schemas, MCP Server/Client, Redundancy schemas.
3. **Domain 3: Claude Code Configuration & Workflows (20%)** — CLI flags (`--dangerously-skip-permissions`), `CLAUDE.md`, Glob/Grep before View, CI/CD pipelines.
4. **Domain 4: Prompt Engineering & Structured Output (20%)** — Few-shot examples, JSON Schemas, Explicit Null, CoT `<thinking>`, XML boundaries.
5. **Domain 5: Context Management & Reliability (15%)** — Context Pruning, Lost-in-the-middle, Message Batches API (50% cost saving), Escalation hooks.

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
│   └── The Architect's Playbook.md
└── website/                         # Web Application Root (Python HTTP server on 3000)
    ├── index.html                   # Homepage (5 Domain Sprints & Resource hub)
    ├── domains.html                 # [NEW] 5 Domain Comprehensive Overview & Technical Specs module
    ├── learn.html                   # 13 Unabridged Theory Chapters with Collapsible Part 2 Accordions & Part 3 Summary Modal
    ├── principles.html              # 67 Core Architectural Principles module (IDs 1-67 + Anti-pattern filter)
    ├── quiz.html                    # 10-Question Custom Checkbox Quiz module + History Log + Review
    ├── mock-exam.html               # 60Q / 120M Official Proctored Exam Simulator + 2 Modes + History Log
    ├── flashcards.html              # 3D Flip Flashcards module
    ├── plan.html                    # Interactive 15-Day Roadmap Progress Tracker
    ├── css/
    │   └── style.css                # Dark/Light CSS design system, accordion components & modal popup styles
    └── js/
        ├── app.js                   # AppStore crash-proof state management, XP, Streak
        ├── domains.js               # [NEW] Domain overview renderer & specs filter
        ├── learn.js                 # Collapsible accordion reader, Part 3 summary popup modal controls
        ├── principles.js            # Principles filter & Anti-pattern mode logic
        ├── quiz.js                  # 10-Question Quiz Engine & Attempt Review Modal
        ├── mock-exam.js             # Proctored 60Q Simulator Engine & Domain Score Breakdown
        ├── flashcards.js            # 3D Flashcard flip & rating engine
        ├── plan.js                  # 15-day roadmap progress renderer
        └── data/
            ├── domains-overview.js  # [NEW] Complete technical overview data for 5 CCAF Exam Domains
            ├── chapters.js          # 13 Complete visual theory modules (English-First + VI translations for 100% of blocks)
            ├── principles.js        # 67 Core Principles data (IDs 1-67) bilingual EN+VI
            ├── quiz-data.js        # 77 Official sample questions bilingual EN+VI + Explanations
            └── mock-exam-data.js    # ~1,000 Scenario questions pool bilingual EN+VI
```

---

## ⚙️ 5. KEY SYSTEM FEATURES BUILT & VERIFIED
- **New Domain Overview Page (`domains.html`):** Built a dedicated 5-domain overview module with technical specs, API schemas, good vs bad patterns, common exam traps, and production archetype mappings.
- **Collapsible Theory Page Redesign (`learn.html`):** Upgraded 13 theory chapters to a clean single-column layout with collapsible Part 2 technical explanations underneath each section, and a Part 3 Summary Modal Popup ("💡 Tóm Tắt Tổng Kết Bài Học").
- **100% Technical Depth Overhaul across All 13 Theory Chapters:** Fully upgraded `website/js/data/chapters.js` with complete technical depth for Chapters 1-13.
- **Crash-Proof LocalStorage:** Wrapped all `AppStore` JSON parsing methods in `try...catch` blocks to prevent browser storage corruption crashes.
- **Header Navigation Standardization:** 8 items (`Trang Chủ`, `🌐 Tổng Quan Domain`, `Lý Thuyết`, `67 Nguyên Tắc`, `Thi Thử 10 Câu`, `Thi Mô Phỏng`, `Flashcards`, `Lịch 15 Ngày`) hardcoded across 100% of HTML files.
- **Rule 4 Enforced:** Manual Git Push & Project Memory Sync executed upon explicit user request.
- **Git Repository Status:** Synced to `https://github.com/thanghobadat/ccaf-study.git` on branch `main`.

---

## 🚨 6. AGENT WORKFLOW MANDATES (MUST OBEY ON RESUME)
1. **Always read `d:\AI\CCAF\rule.md` first** before taking any action.
2. **Planning First:** Always present an Implementation Plan first before executing file edits.
3. **Summary Rule:** Always summarize accomplishments briefly upon completion.
4. **Manual Git Push & Memory Sync Only:** NEVER automatically `git push` or edit `project_memory.md` after editing files. ONLY run `git push` and update `project_memory.md` when the user explicitly requests it.
