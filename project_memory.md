# 🧠 PROJECT MEMORY SNAPSHOT — CCAF LEARNING & EXAM PLATFORM

> **MACHINE READABLE MEMORY FILE FOR AGENT RESUME**  
> *Last Updated: 2026-08-17 17:22 (Local Time)*  
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
└── website/                         # Web Application Root (Python HTTP server on 3000)
    ├── favicon.ico                  # High resolution multi-size website icon
    ├── index.html                   # Auto-redirect 0s landing page pointing to mock-exam.html
    ├── domains.html                 # 5 Domain Comprehensive Overview & Technical Specs module
    ├── learn.html                   # 13 Unabridged Theory Chapters with Collapsible Part 2 Accordions & Part 3 Summary Modal
    ├── principles.html              # 67 Core Architectural Principles module (English-First + Deep Breakdown Modal)
    ├── terms.html                   # CCAF Architecture Terms Hub (40 Canonical Terms across 644Q dataset)
    ├── knowledge.html               # 🧠 47+ Master Core Knowledge Concepts Module with Real-World Analogies & Progress Tracking
    ├── mock-exam.html               # 60Q Clean Gold Standard Exam Simulator + Custom Practice + Instant Feedback Mode
    ├── css/
    │   └── style.css                # Dark/Light CSS design system, keyword badges, grid button styles (.grid-nav-btn), Mobile touch nav scroll
    └── js/
        ├── app.js                   # AppStore crash-proof state management, XP, Streak, Language state
        ├── domains.js               # Domain overview renderer & specs filter
        ├── learn.js                 # Collapsible accordion reader, Part 3 summary popup modal controls
        ├── principles.js            # Principles English-First filter & deep explanation modal trigger
        ├── terms.js                 # Render & Real-time Filter/Search Engine for 40 CCAF Terms
        ├── knowledge.js             # Controller for 47+ Core Concepts (Real-time Search, Domain Filter, TOC Scrollspy, Bookmarks)
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
- **2026-08-18**:
  - Trích xuất toàn diện 47 khái niệm kiến trúc cốt lõi từ 644 câu hỏi mock exam và 254 câu chuẩn CCAF, tạo tài liệu chuẩn mực `tài liệu/CCAF_Master_Knowledge_Reference.md`.
  - Xây dựng hoàn chỉnh trang web mới `website/knowledge.html` và module dữ liệu `website/js/data/knowledge-data.js` + `website/js/knowledge.js` với 47 concepts, đầy đủ định nghĩa, cơ chế kỹ thuật, bẫy trắc nghiệm, code mẫu và đặc biệt là **💡 Ví dụ ẩn dụ đời thường cực kỳ dễ hiểu**.
  - Tích hợp điều hướng `🧠 Kiến Thức Cốt Lõi (47+)` vào navbar của tất cả 5 trang HTML.
  - Kiểm tra cú pháp và tính toàn vẹn 100% đạt chuẩn trên Node.js.
  - Sẵn sàng triển khai trên Vercel và GitHub repo.


---

## ⚙️ 5. KEY SYSTEM FEATURES BUILT & VERIFIED

- **MCQ Option Length Normalization & Bias Elimination (`mock-exam-data.js` v19.0):**
  - Khắc phục triệt để hiện tượng thiên kiến độ dài (Length Bias) nơi 87.1% (561/644 câu) có đáp án đúng là phương án dài nhất.
  - Sau khi chuẩn hóa bằng công cụ `balance_all_dataset.py`: Tỷ lệ Rank 1 (dài nhất) giảm từ **87.1% xuống 29.8%**, rải đều tự nhiên qua 4 mức độ dài: Rank 1 (29.8%), Rank 2 (24.2%), Rank 3 (23.0%), Rank 4 (23.0%).
  - Tỷ lệ độ dài trung bình Câu Đúng / Câu Sai đạt mức lý tưởng **1.01x** (174.0 ký tự vs 171.7 ký tự).
  - Đồng bộ 100% song ngữ `optionsEN` và `options` (Tiếng Việt), bảo toàn trọn vẹn ý nghĩa kỹ thuật và tính đúng/sai của 644 câu.
  - Tích hợp công cụ kiểm định tự động `validate_option_lengths.py` và lưu trữ file sao lưu `mock-exam-data.backup.js`.
- **Instant Feedback Mode UI & Timer Optimization (`mock-exam.html` & `mock-exam.js`):**
  - Loại bỏ khối Chế độ 3 trùng lặp trên giao diện chọn đề. Thiết kế lại Chế độ 1 Ôn tập tùy chỉnh tích hợp trực tiếp 2 nút chọn: Ôn bình thường & Ôn tức thì.
  - Loại bỏ đồng hồ đếm ngược khi làm bài Ôn tức thì, thay bằng huy hiệu `⚡ ÔN TẬP TỨC THÌ (KHÔNG GIỚI HẠN THỜI GIAN)` (`⚡ INSTANT FEEDBACK (NO TIME LIMIT)`), cho phép người học tập trung nghiên cứu sâu từng câu, rationale và tài liệu chính thức mà không bị áp lực thời gian.
  - Đồng hồ 120 phút vẫn giữ nguyên hoạt động chuẩn xác cho Chế độ 2 Thi thật 60 câu Pearson VUE.
- **Question Detail Review & Report Modal Fix (`mock-exam.js`):** Resolved runtime JS exceptions (`ReferenceError: refreshReportModalState is not defined` and missing `window.closeReportModal`) upon completing an exercise or exam. Implemented `refreshReportModalState(totalScore, isPassed)` for rendering bilingual score status & details, and `window.closeReportModal()` to smoothly close score report popup and unveil interactive review arena displaying question options, correct/incorrect badges, rationale, explanation, and official Anthropic reference links.
- **Fix Mock Exam Dataset Pool Export & Navigation (`mock-exam-data.js`, `balance_all_dataset.py`, `mock-exam.js`):**
  - Khắc phục lỗi thiếu biến toàn cục `MOCK_EXAM_QUESTION_POOL` khiến trang Ôn tập & Thi mô phỏng không nạp được ngân hàng 644 câu hỏi và làm tab Ôn tập Thuật ngữ hiển thị 0 câu.
  - Cập nhật script `balance_all_dataset.py` để tự động đính kèm khai báo `MOCK_EXAM_QUESTION_POOL` và gán vào `window.MOCK_EXAM_QUESTION_POOL`.
  - Thêm tính năng tự động tích chọn Domain từ URL parameter `?domain=DX` khi chuyển từ trang Tổng quan Domain sang Ôn tập.
- **LocalStorage Exam & Practice Session Persistence (`app.js`, `mock-exam.js`):**
  - Đã xây dựng hoàn thiện cơ chế tự động lưu và khôi phục trạng thái bài thi/ôn tập dở dang qua khóa `ccaf_active_exam_session` trong `localStorage`.
  - Bảo toàn 100% dữ liệu khi người dùng reload (F5) hoặc chuyển sang các trang khác (*Lý thuyết*, *Nguyên tắc*, *Thuật ngữ*) rồi quay lại: khôi phục chính xác danh sách câu hỏi, các đáp án đã chọn, cờ cắm (flag), vị trí câu đang làm dở và thời gian còn lại.
  - Dọn dẹp session an toàn chỉ khi người dùng bấm "Dừng Thi / Hủy Bài" hoặc "Nộp Bài Thi".
- **Rule 4 Enforced:** Manual Git Push & Project Memory Sync executed upon explicit user request.
- **Git Repository Status:** Synced to `https://github.com/thanghobadat/ccaf-study.git` on branch `main`.

---

## 🚨 6. AGENT WORKFLOW MANDATES (MUST OBEY ON RESUME)
1. **Always read `d:\AI\CCAF\rule.md` first** before taking any action.
2. **Planning First:** Always present an Implementation Plan first before executing file edits.
3. **Summary Rule:** Always summarize accomplishments briefly upon completion.
4. **Manual Git Push & Memory Sync Only:** NEVER automatically `git push` or edit `project_memory.md` after editing files. ONLY run `git push` and update `project_memory.md` when the user explicitly requests it.



