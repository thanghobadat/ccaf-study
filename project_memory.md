# 🧠 PROJECT MEMORY SNAPSHOT — CCAF LEARNING & EXAM PLATFORM

> **MACHINE READABLE MEMORY FILE FOR AGENT RESUME**  
> *Last Updated: 2026-08-07 10:51 (Local Time)*  
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
    ├── learn.html                   # 13 Unabridged Theory Chapters reading module
    ├── principles.html              # 67 Core Architectural Principles module (IDs 1-67 + Anti-pattern filter)
    ├── quiz.html                    # 10-Question Custom Checkbox Quiz module + History Log + Review
    ├── mock-exam.html               # 60Q / 120M Official Proctored Exam Simulator + 2 Modes + History Log
    ├── flashcards.html              # 3D Flip Flashcards module
    ├── plan.html                    # Interactive 15-Day Roadmap Progress Tracker
    ├── css/
    │   └── style.css                # Dark/Light CSS design system & visual pedagogy UI components
    └── js/
        ├── app.js                   # AppStore state management, XP, Streak, Global Lang Switcher
        ├── learn.js                 # Chapter reader logic & Flash QA reveal handler
        ├── principles.js            # Principles filter & Anti-pattern mode logic
        ├── quiz.js                  # 10-Question Quiz Engine & Attempt Review Modal
        ├── mock-exam.js             # Proctored 60Q Simulator Engine & Domain Score Breakdown
        ├── flashcards.js            # 3D Flashcard flip & rating engine
        ├── plan.js                  # 15-day roadmap progress renderer
        └── data/
            ├── chapters.js          # 13 Complete visual theory modules (Analogies, Flow diagrams, BAD vs GOOD, Decision matrices, QA Flash)
            ├── principles.js        # 67 Core Principles data (IDs 1-67) bilingual EN+VI
            ├── quiz-data.js        # 77 Official sample questions bilingual EN+VI + Explanations
            └── mock-exam-data.js    # ~1,000 Scenario questions pool bilingual EN+VI
```

---

## ⚙️ 5. KEY SYSTEM FEATURES BUILT & VERIFIED
- **100% Unabridged Theory Overhaul:** All 13 chapters in `website/js/data/chapters.js` upgraded with real-world analogies, step-by-step CSS flow diagrams (`.diagram-flow`), side-by-side BAD vs GOOD comparison cards (`.comparison-grid`), decision matrix tables (`.decision-matrix`), and interactive Knowledge Check QA cards (`.knowledge-check`).
- **Responsive System & Zero Overflow:** Optimized header nav flex-wrap, table card stacking, `pre` line wrapping, and `min-width: 0` grid container fixes across PC, Tablet, iPhone X (375px), and iPhone 15 (393px).
- **Header Menu Standardization:** 7 items (`Trang Chủ`, `Lý Thuyết`, `67 Nguyên Tắc`, `Thi Thử 10 Câu`, `Thi Mô Phỏng (Kho 1,000 Câu)`, `Flashcards`, `Lịch 15 Ngày`) hardcoded across 100% of HTML files.
- **Rule 4 Enforced:** Manual Git Push & Project Memory Sync only executed when explicitly requested by user.
- **Git Repository Status:** Synced to `https://github.com/thanghobadat/ccaf-study.git` on branch `main`.

---

## 🚨 6. AGENT WORKFLOW MANDATES (MUST OBEY ON RESUME)
1. **Always read `d:\AI\CCAF\rule.md` first** before taking any action.
2. **Always present an `Implementation Plan` first** before making file edits.
3. **Always summarize accomplishments briefly** upon task completion.
4. **Manual Git Push & Memory Sync Only**: Never auto-push or edit `project_memory.md` unless explicitly requested by the user.

