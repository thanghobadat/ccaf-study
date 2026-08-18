# 🧠 PROJECT MEMORY SNAPSHOT — CCAF LEARNING & EXAM PLATFORM

> **MACHINE READABLE MEMORY FILE FOR AGENT RESUME**  
> *Last Updated: 2026-08-18 17:18 (Local Time)*  
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
- **Doc 5:** `d:\AI\CCAF\tài liệu\CCAF_Master_Knowledge_Reference.md`  
  *Master Knowledge Base: 47 Core Architectural Concepts across 5 Domains with definitions, step-by-step mechanisms, usage criteria, exam anti-patterns, distinctions, code snippets, and intuitive real-world analogies (100% coverage of 254 official questions & 644 mock questions).*

---

## 📅 2. 15-DAY DUAL-LANGUAGE STRATEGY
- **Phase 1 (Days 1 - 10): 🇻🇳 Vietnamese Foundation Sprint**  
  Nạp 100% bản chất kỹ thuật bằng Tiếng Việt qua 5 Domain Sprints (D1: Ngày 1-3, D2 & D3: Ngày 4-7, D4 & D5: Ngày 8-10). Đọc trang **47+ Kiến Thức Cốt Lõi** kèm ví dụ ẩn dụ đời thường để nắm chắc 100% lý thuyết.
- **Phase 2 (Days 11 - 15): 🇬🇧 English Exam Intensive Sprint**  
  Bật **English Mode** toàn bộ hệ thống để luyện đọc 13 bài EN, 67 Nguyên tắc EN và Thi thật/Thi mô phỏng 100% Tiếng Anh gốc từ Anthropic.

---

## 🎯 3. EXAM WEIGHTINGS & 6 PRODUCTION ARCHETYPES

### 5 Exam Domains & Weights
1. **Domain 1: Agent Architecture & Orchestration (27%)** — Agent SDK, Coordinator-Worker, Task tool, Flat Hierarchy, State recovery, Turn limits, Pre/PostToolUse hooks, Deterministic State Machines, External State Store. (11 Concepts / 116 Questions)
2. **Domain 2: Tool Design & MCP Integration (18%)** — Granular tools, Resilient schemas, MCP Server/Client (stdio vs SSE), Least-Privilege tool allocation, Output projection in tool chains. (9 Concepts / 121 Questions)
3. **Domain 3: Claude Code Configuration & Workflows (20%)** — CLI flags (`--dangerously-skip-permissions`, `-p`, `--output-format json`), `CLAUDE.md` hierarchy, Plan Mode, Custom Skills `SKILL.md`, `settings.json` allowedTools, Iterative Refinement & TDD verification loop. (9 Concepts / 153 Questions)
4. **Domain 4: Prompt Engineering & Structured Output (20%)** — Few-shot examples & distribution bias mitigation, JSON Schemas with explicit null (`type: ["string","null"]` + `required`), CoT `<thinking>`, XML boundaries `<context>`, Validation & feedback injection. (9 Concepts / 169 Questions)
5. **Domain 5: Context Management & Reliability (15%)** — Context Pruning, Lost-in-the-middle, Message Batches API (50% cost saving), Circuit Breaker (Closed->Open->Half-Open), Structured Escalation Payloads, Semantic Search vs Literal Grep, HITL Review Calibration & Confidence Routing, Information Provenance & Citation Chaining. (9 Concepts / 85 Questions)

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
├── .gitignore                       # Git ignore configuration (includes __pycache__, node_modules)
├── validate_option_lengths.py       # Automated test suite for MCQ option length ranking & standard deviation
├── balance_all_dataset.py           # Core deterministic dataset normalization & length balancing engine
├── validate_exam.py                 # Core dataset schema & domain distribution validator
├── tài liệu/
│   ├── CCA_Foundations_Study_Guide.md
│   ├── The Architect's Playbook.md
│   ├── CCAF_Question_Generation_Guide.md
│   ├── CCAF_254_Official_Mock_Exam_Bank.md
│   ├── CCAF_Master_Knowledge_Reference.md   # 47 Master Core Architectural Concepts (100% CCAF Coverage)
│   ├── CCAF_Addition_Guide_for_Weak_Models.md
│   └── generate/                    # 289 Output JSON Question Batches (570 Questions)
└── website/                         # Web Application Root (Python HTTP server on 8080)
    ├── favicon.ico                  # High resolution multi-size website icon
    ├── index.html                   # Auto-redirect 0s landing page pointing to mock-exam.html
    ├── domains.html                 # 5 Domain Comprehensive Overview & Technical Specs module
    ├── learn.html                   # 13 Unabridged Theory Chapters with Collapsible Part 2 Accordions & Part 3 Summary Modal
    ├── principles.html              # 67 Core Architectural Principles module (English-First + Deep Breakdown Modal)
    ├── terms.html                   # CCAF Architecture Terms Hub (40 Canonical Terms across 644Q dataset)
    ├── knowledge.html               # 🧠 47+ Master Core Knowledge Concepts Module (Mobile Responsive + TOC Drawer + FAB)
    ├── mock-exam.html               # 60Q Clean Gold Standard Exam Simulator + Custom Practice + Instant Feedback Mode
    ├── css/
    │   └── style.css                # Dark/Light CSS design system, keyword badges, grid button styles (.grid-nav-btn), Mobile touch nav scroll
    └── js/
        ├── app.js                   # AppStore crash-proof state management, XP, Streak, Language state
        ├── domains.js               # Domain overview renderer & specs filter
        ├── learn.js                 # Collapsible accordion reader, Part 3 summary popup modal controls
        ├── principles.js            # Principles English-First filter & deep explanation modal trigger
        ├── terms.js                 # Render & Real-time Filter/Search Engine for 40 CCAF Terms
        ├── knowledge.js             # Controller for 47+ Core Concepts (Mobile Drawer, ScrollSpy, Bookmarks, Real-time Search)
        ├── mock-exam.js             # Proctored 60Q Simulator Engine, Clean Practice, Instant Feedback (Untimed) & Round-robin Repetition Algorithm
        └── data/
            ├── domains-overview.js  # Unabridged technical overview data for 5 CCAF Exam Domains (D1-D5)
            ├── chapters.js          # 13 Complete visual theory modules (English-First + VI translations for 100% of blocks)
            ├── principles.js        # 67 Core Principles data (IDs 1-67) bilingual EN+VI
            ├── terms-data.js        # 40 CCAF Architectural Terms Dataset with Domain-first badges & frequency stats
            ├── knowledge-data.js    # 47 Structured Core Architectural Concepts Dataset with Real-World Analogies & Code Snippets
            ├── keyword-glossary.js  # 35+ Technical Keyword Glossary dictionary
            ├── principles-deep-explanations.js # Structured deep 4-part explanations dataset for 67 Principles (IDs 1-67)
            ├── mock-exam-data.backup.js # 100% byte-for-byte original backup snapshot (644 questions)
            └── mock-exam-data.js    # Balanced 644 Unique Core Scenario Questions Dataset v19.0 (Eliminated MCQ Length Bias, 100% valid JSON)
```

---

## 🚀 5. RECENT ACTIONS & STATUS
- **2026-08-18 (Mobile Optimization & Live Testing)**:
  - Tối ưu hóa **Responsive Mobile toàn diện cho trang 47+ Kiến Thức Cốt Lõi (`website/knowledge.html` & `website/js/knowledge.js`)**.
  - Xây dựng **Mobile TOC Floating Action Button (FAB)** và **Bottom Sheet Drawer** trượt mượt mà, cho phép xem mục lục 44 concept và nhảy nhanh đến bất kỳ thẻ nào trên mobile.
  - Tinh chỉnh thanh Sticky Filter Bar, thanh tiến độ 100% width, hàng chip Tab Domain vuốt ngang (horizontal swipeable chips), ô tìm kiếm chuẩn 16px chống iOS auto-zoom kèm nút xóa nhanh `✕`.
  - Tối ưu thẻ bài học (Concept Cards) với Decision Grid 1 cột, khối code cuộn ngang êm ái, nút `⭐ Bookmark` và `✅ Đã hiểu` to rõ dễ bấm bằng ngón tay cái, kèm nút `⬆️ Lên đầu trang` tự động.
  - Kiểm thử trực tiếp bằng browser subagent trên iPhone 14 (390x844 px) đạt 100% tiêu chuẩn chất lượng.
  - Thực hiện đồng bộ hóa `project_memory.md` và `git push` theo yêu cầu trực tiếp từ người dùng.

---

## ⚙️ 6. KEY SYSTEM FEATURES BUILT & VERIFIED

- **Responsive Mobile Architecture (`knowledge.html`, `style.css`, `knowledge.js`):**
  - Hỗ trợ hoàn hảo mọi kích thước màn hình: iPhone SE (375px), iPhone 13/14/15 (390px-393px), Android (412px-430px), Tablet (768px-960px) và Desktop.
  - Tích hợp Mobile TOC Drawer bottom sheet, nút nổi FAB hiển thị tiến độ tức thì, Back-to-top FAB và ScrollSpy 2 chiều.
- **MCQ Option Length Normalization & Bias Elimination (`mock-exam-data.js` v19.0):**
  - Khắc phục triệt để hiện tượng thiên kiến độ dài (Length Bias) nơi 87.1% (561/644 câu) có đáp án đúng là phương án dài nhất.
  - Sau khi chuẩn hóa bằng công cụ `balance_all_dataset.py`: Tỷ lệ Rank 1 (dài nhất) giảm từ **87.1% xuống 29.8%**, rải đều tự nhiên qua 4 mức độ dài: Rank 1 (29.8%), Rank 2 (24.2%), Rank 3 (23.0%), Rank 4 (23.0%).
  - Tỷ lệ độ dài trung bình Câu Đúng / Câu Sai đạt mức lý tưởng **1.01x** (174.0 ký tự vs 171.7 ký tự).
- **Instant Feedback Mode UI & Timer Optimization (`mock-exam.html` & `mock-exam.js`):**
  - Loại bỏ khối Chế độ 3 trùng lặp trên giao diện chọn đề. Thiết kế lại Chế độ 1 Ôn tập tùy chỉnh tích hợp trực tiếp 2 nút chọn: Ôn bình thường & Ôn tức thì.
  - Loại bỏ đồng hồ đếm ngược khi làm bài Ôn tức thì, thay bằng huy hiệu `⚡ ÔN TẬP TỨC THÌ (KHÔNG GIỚI HẠN THỜI GIAN)` (`⚡ INSTANT FEEDBACK (NO TIME LIMIT)`).
- **LocalStorage Exam & Practice Session Persistence (`app.js`, `mock-exam.js`):**
  - Cơ chế tự động lưu và khôi phục trạng thái bài thi/ôn tập dở dang qua khóa `ccaf_active_exam_session` trong `localStorage`.
- **Rule 4 Enforced:** Manual Git Push & Project Memory Sync executed upon explicit user request.
- **Git Repository Status:** Synced to `https://github.com/thanghobadat/ccaf-study.git` on branch `main`.

---

## 🚨 7. AGENT WORKFLOW MANDATES (MUST OBEY ON RESUME)
1. **Always read `d:\AI\CCAF\rule.md` first** before taking any action.
2. **Planning First:** Always present an Implementation Plan first before executing file edits.
3. **Summary Rule:** Always summarize accomplishments briefly upon completion.
4. **Manual Git Push & Memory Sync Only:** NEVER automatically `git push` or edit `project_memory.md` after editing files. ONLY run `git push` and update `project_memory.md` when the user explicitly requests it.
