# 🧠 PROJECT MEMORY SNAPSHOT — CCAF LEARNING & EXAM PLATFORM

> **MACHINE READABLE MEMORY FILE FOR AGENT RESUME**  
> *Last Updated: 2026-09-01 08:38 (Local Time)*  
> *Target Goal: Pass Claude Certified Architect - Foundations (CCAF) exam in 15 Days in 100% English Mode.*

---

## 📌 1. KEY REFERENCE LINKS & DOCUMENTATION SOURCES

### 🌐 Web Links
- **Reference Web:** `https://ccaflearning.vercel.app/` (Original 5-domain community reference site).
- **Active Local Web:** `http://localhost:8899` (Current live platform running locally at `d:\AI\CCAF\website`).
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
1. **Domain 1: Agent Architecture & Orchestration (26%)** — Agent SDK, Coordinator-Worker, Task tool, Flat Hierarchy, State recovery, Turn limits, Pre/PostToolUse hooks, Deterministic State Machines, External State Store.
2. **Domain 2: Tool Design & MCP Integration (18%)** — Granular tools, Resilient schemas, MCP Server/Client (stdio vs SSE), Least-Privilege tool allocation, Output projection in tool chains.
3. **Domain 3: Claude Code Configuration & Workflows (20%)** — CLI flags (`--dangerously-skip-permissions`, `-p`, `--output-format json`), `CLAUDE.md` hierarchy, Plan Mode, Custom Skills `SKILL.md`, `settings.json` allowedTools, Iterative Refinement & TDD verification loop.
4. **Domain 4: Prompt Engineering & Structured Output (18%)** — Few-shot examples & distribution bias mitigation, JSON Schemas with explicit null (`type: ["string","null"]` + `required`), CoT `<thinking>`, XML boundaries `<context>`, Validation & feedback injection.
5. **Domain 5: Context Management & Reliability (18%)** — Context Pruning, Lost-in-the-middle, Message Batches API (50% cost saving), Circuit Breaker (Closed->Open->Half-Open), Structured Escalation Payloads, Semantic Search vs Literal Grep, HITL Review Calibration & Confidence Routing, Information Provenance & Citation Chaining.

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
│   └── generate/
│       └── ver2/                    # 10 TXT files & merged mock-exam-data_ver2.js (1,000 Questions)
└── website/                         # Web Application Root (Python HTTP server on 8899)
    ├── favicon.ico                  # High resolution multi-size website icon
    ├── index.html                   # Auto-redirect 0s landing page pointing to mock-exam.html
    ├── domains.html                 # 5 Domain Comprehensive Overview & Technical Specs module
    ├── learn.html                   # 13 Unabridged Theory Chapters with Collapsible Part 2 Accordions & Part 3 Summary Modal
    ├── principles.html              # 67 Core Architectural Principles module (English-First + Deep Breakdown Modal)
    ├── knowledge.html               # 🧠 47+ Master Core Knowledge Concepts Module (Mobile Responsive + TOC Drawer + FAB)
    ├── mock-exam.html               # 60Q Simulator + Dataset Switcher (V1/V2/BOTH: 1,644+ Qs) + Core Concepts Practice + Instant Feedback
    ├── css/
    │   └── style.css                # Dark/Light CSS design system, keyword badges, grid button styles (.grid-nav-btn), Mobile touch nav scroll
    └── js/
        ├── app.js                   # AppStore crash-proof state management, XP, Streak, Language state
        ├── domains.js               # Domain overview renderer & specs filter
        ├── learn.js                 # Collapsible accordion reader, Part 3 summary popup modal controls
        ├── principles.js            # Principles English-First filter & deep explanation modal trigger
        ├── knowledge.js             # Controller for 47+ Core Concepts (Mobile Drawer, ScrollSpy, Bookmarks, Real-time Search)
        ├── mock-exam.js             # Proctored 60Q Simulator Engine, Dataset Switcher (V1/V2/BOTH), 47+ Concepts Practice Mode, Instant Feedback
        └── data/
            ├── domains-overview.js  # Unabridged technical overview data for 5 CCAF Exam Domains (D1-D5)
            ├── chapters.js          # 13 Complete visual theory modules (English-First + VI translations for 100% of blocks)
            ├── principles.js        # 67 Core Principles data (IDs 1-67) bilingual EN+VI
            ├── knowledge-data.js    # 47 Structured Core Architectural Concepts Dataset with Real-World Analogies & Code Snippets
            ├── keyword-glossary.js  # 35+ Technical Keyword Glossary dictionary
            ├── principles-deep-explanations.js # Structured deep 4-part explanations dataset for 67 Principles (IDs 1-67)
            ├── mock-exam-data.js    # Dataset V1: 644 Unique Scenario Questions (MOCK_EXAM_POOL_V1)
            ├── mock-exam-data_ver2.backup.js # Backup of original V2 dataset
            └── mock-exam-data_ver2.js # Dataset V2: 1,000 Questions Clean Blueprint-Standard Dataset (Natural Phrasing)
```

---

## 🚀 5. RECENT ACTIONS & STATUS
- **2026-09-01 (Dataset V2 Phrasing Restoration & Clean 1,000 Questions Reinstatement)**:
  - Khôi phục bộ 1,000 câu chuẩn nguyên bản từ `mock-exam-data_ver2.backup.js` sang `mock-exam-data_ver2.js`, loại bỏ toàn bộ các câu bị chắp vá cụm từ đệm khó hiểu.
  - Đảm bảo câu văn tự nhiên, mạch lạc, chính xác 100% về kiến thức kỹ thuật Anthropic.
  - Kiểm thử tự động trên Node.js và Browser Subagent (1,000 câu load hoàn hảo trên giao diện thi thử và ôn tập).
  - Cập nhật `project_memory.md` và thực hiện `git push` theo yêu cầu trực tiếp từ người dùng.
- **2026-08-30 (Option Length Balancing & Length-Bias Elimination on Dataset V2 - 1,000 Questions)**:
  - Phát hiện và xử lý triệt để hiện tượng thiên kiến phương án dài nhất (Length Bias) trên bộ đề V2 (1,000 câu).
  - Tạo backup an toàn tại [mock-exam-data_ver2.backup.js](file:///d:/AI/CCAF/website/js/data/mock-exam-data_ver2.backup.js).
  - Tối ưu hóa thuật toán cân bằng độ dài trong [balance_all_dataset.py](file:///d:/AI/CCAF/balance_all_dataset.py) với cơ chế 4 bậc độ dài (4-Rank Balancing).
  - Đưa tỷ lệ câu đúng là phương án dài nhất (Rank 1) từ 51.8% (EN) và 57.8% (VI) về mức chuẩn xác lý tưởng **25.0% (250/1,000 câu)** trên cả EN và VI, và đạt đúng **25.0% cho từng Domain D1–D5**.
  - Phân bổ đều các bậc độ dài khác: Rank 2 (18.9% - 20.6%), Rank 3 (24.0% - 25.2%), Rank 4 (29.2% - 32.1%).
  - Kiểm tra tính toàn vẹn dữ liệu bằng [validate_option_lengths.py](file:///d:/AI/CCAF/validate_option_lengths.py).
  - Đồng bộ `project_memory.md` và thực hiện `git push` theo yêu cầu trực tiếp từ người dùng.
- **2026-08-29 (Dataset V2 Integration & Multi-Dataset Switcher for Mode 1 Practice)**:
  - Gộp thành công 10 file text trong thư mục `ver2` thành file JavaScript hoàn chỉnh [mock-exam-data_ver2.js](file:///d:/AI/CCAF/t%C3%A0i%20li%E1%BB%87u/generate/ver2/mock-exam-data_ver2.js) (1,000 câu hỏi chuẩn hóa toàn diện theo CCAF Blueprint, 250 câu/domain weightings, cân bằng đáp án tuyệt đối 25% A/B/C/D).
  - Tích hợp bộ đề V2 vào hệ thống website tại [mock-exam-data_ver2.js](file:///d:/AI/CCAF/website/js/data/mock-exam-data_ver2.js) dưới định danh `window.MOCK_EXAM_POOL_V2`.
  - Nâng cấp **Chế độ 1: Ôn tập tùy chỉnh** trên [mock-exam.html](file:///d:/AI/CCAF/website/mock-exam.html) & [mock-exam.js](file:///d:/AI/CCAF/website/js/mock-exam.js) với bộ chuyển đổi 3 nguồn đề:
    1. 📘 **Bộ 1**: 644 câu hỏi tình huống chuyên sâu
    2. 🚀 **Bộ 2**: 1,000 câu hỏi chuẩn hóa Blueprint CCAF
    3. ⚡ **Kết Hợp**: Siêu ngân hàng 1,644 câu hỏi không trùng lặp
  - Đồng bộ cập nhật số lượng câu hỏi per-domain (D1..D5) và số câu hỏi khớp per-concept (47+ Core Concepts) theo thời gian thực khi chuyển đổi bộ đề.
  - Đã kiểm thử tự động toàn diện qua Node.js & Browser subagent.
  - Đồng bộ `project_memory.md` và thực hiện `git push` theo yêu cầu trực tiếp từ người dùng.
- **2026-08-19 (Terms Page Removal & Global Navbar Cleanup)**:
  - Xoá bỏ hoàn toàn trang **Từ Điển Thuật Ngữ cũ (`terms.html`)**, script điều khiển `website/js/terms.js`, và dữ liệu `website/js/data/terms-data.js`.
  - Đồng bộ cập nhật thanh điều hướng (navbar) trên tất cả 5 trang chính (`domains.html`, `learn.html`, `principles.html`, `knowledge.html`, `mock-exam.html`), làm sạch các import script thừa.
  - Cập nhật `project_memory.md` và thực hiện `git push` theo yêu cầu trực tiếp từ người dùng.
- **2026-08-19 (47+ Core Concepts Practice Mode Migration & Live Testing)**:
  - Chuyển đổi toàn diện cơ chế **Ôn tập theo Thuật ngữ cũ (40 terms)** thành **Ôn tập Chuyên sâu theo 47+ Kiến Thức Cốt Lõi (Core Concepts)** trong `website/mock-exam.html` và `website/js/mock-exam.js`.
  - Tích hợp **Domain Filter Chips** (`Tất cả Domain`, `D1`, `D2`, `D3`, `D4`, `D5`) cho phép duyệt và lọc nhanh 47 Concept trực quan.
  - Xây dựng thuật toán ánh xạ câu hỏi thông minh dựa trên `domain`, `taskStatement` prefix và keywords của từng Concept, đảm bảo 100% Concept có bộ câu hỏi ôn tập tương ứng.
  - Kiểm thử tự động bằng Browser subagent trên cả 2 chế độ Ôn bình thường & Ôn tức thì (Instant feedback) đạt chuẩn 100%.
  - Đánh giá chất lượng bộ 644 câu hỏi: Đạt 100% giải thích chi tiết từng option, song ngữ EN/VI, độ sâu stem trung bình 501 ký tự.
  - Đồng bộ `project_memory.md` và `git push` theo yêu cầu trực tiếp từ người dùng.

---

## ⚙️ 6. KEY SYSTEM FEATURES BUILT & VERIFIED

- **Multi-Dataset Practice Engine (`mock-exam.html`, `mock-exam.js`, `mock-exam-data_ver2.js`):**
  - Hỗ trợ linh hoạt 3 nguồn đề thi: Bộ 1 (644 câu), Bộ 2 (1,000 câu), và Kết hợp cả 2 bộ (1,644 câu không trùng lặp).
  - Tự động cập nhật số câu hỏi theo Domain và số câu hỏi theo 47+ Chủ đề kiến thức cốt lõi.
- **Core Concepts Practice Mode (`mock-exam.html`, `mock-exam.js`):**
  - Tích hợp 47+ Master Core Concepts vào giao diện chọn đề ôn tập.
  - Phân loại Domain Chips nhanh, đếm số câu hỏi thực chiến cho từng Concept, hỗ trợ song song Ôn bình thường và Ôn tức thì không giới hạn thời gian.
- **Responsive Mobile Architecture (`knowledge.html`, `style.css`, `knowledge.js`):**
  - Hỗ trợ hoàn hảo mọi kích thước màn hình: iPhone SE (375px), iPhone 13/14/15 (390px-393px), Android (412px-430px), Tablet (768px-960px) và Desktop.
  - Tích hợp Mobile TOC Drawer bottom sheet, nút nổi FAB hiển thị tiến độ tức thì, Back-to-top FAB và ScrollSpy 2 chiều.
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
