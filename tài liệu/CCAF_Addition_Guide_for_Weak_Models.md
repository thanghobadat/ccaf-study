# 📌 CCAF MOCK EXAM — ADDITION GUIDE v1.0
> **Mục đích:** File này cần được đọc CÙNG với `CCA_Foundations_Study_Guide.md` và `CCAF_Question_Generation_Guide.md` trước khi sinh câu hỏi.
> **Dành cho:** AI model yếu hơn (Flash tier) để tránh 100% các lỗi đã xác nhận trong batch trước.

---

## 🚨 PHẦN 1 — 7 LỖI ĐÃ XẢY RA TRONG THỰC TẾ (BẮT BUỘC ĐỌC)

Đây là các lỗi thực tế đã xảy ra khi sinh 20 câu hỏi đầu tiên. **Phải tránh tuyệt đối.**

---

### ❌ LỖI #1 — Cross-Contamination (LỖI NGHIÊM TRỌNG NHẤT)

**Mô tả:** `question` (tiếng Việt) và `questionEN` (tiếng Anh) là **hai câu hỏi khác nhau hoàn toàn**, không phải bản dịch của nhau. Tương tự `options` (VI) và `optionsEN` (EN) không khớp với nhau.

**Ví dụ lỗi thực tế:**
```
BAD — câu d2-b04-001:
  question (VI): "Tool check_stock trả về [] cho cả hết hàng lẫn không có quyền..."
  questionEN (EN): "Agent gọi get_customer thay vì lookup_order..."
  → Hai câu hỏi hoàn toàn khác nhau!
```

**Quy tắc bắt buộc:**
```
✅ ĐÚNG:
  question (VI) = BẢN DỊCH CHÍNH XÁC của questionEN (EN)
  options[0] (VI) = BẢN DỊCH CHÍNH XÁC của optionsEN[0] (EN)
  options[1] (VI) = BẢN DỊCH CHÍNH XÁC của optionsEN[1] (EN)
  options[2] (VI) = BẢN DỊCH CHÍNH XÁC của optionsEN[2] (EN)
  options[3] (VI) = BẢN DỊCH CHÍNH XÁC của optionsEN[3] (EN)
```

**Cách tránh:** Sinh `questionEN` và `optionsEN` TRƯỚC. Sau đó dịch sang `question` và `options`. Không bao giờ làm ngược lại hay độc lập.

---

### ❌ LỖI #2 — optionExplanations Generic (Template Rỗng)

**Mô tả:** Tất cả các `optionExplanations` đều copy-paste cùng một câu generic vô nghĩa.

**Ví dụ lỗi thực tế:**
```
BAD:
  "Option A ❌ (SAI): Phương án không tối ưu, gây lỗi hoặc tăng độ trễ trên môi trường sản xuất."
  "Option B ✅ (ĐÚNG): Áp dụng chuẩn Anthropic Best Practice cho D1 (1.1...)."
```

**Chuẩn bắt buộc (xem ví dụ trong Study Guide):**
```
✅ ĐÚNG:
  "Option A ❌ (SAI): Đặt iteration cap không giải quyết root cause. Agent đã 
   dừng sai vì kiểm tra content type, không phải vì thiếu iteration. Dùng cap 
   làm tín hiệu dừng là anti-pattern theo Anthropic."
  
  "Option B ✅ (ĐÚNG): stop_reason là tín hiệu xác định và có thẩm quyền để 
   điều khiển vòng lặp. Claude có thể trả về text cùng với tool_use blocks, 
   nên kiểm tra content type là không đáng tin cậy."
```

**Quy tắc:** Mỗi explanation PHẢI:
1. Gọi tên failure mode cụ thể (không phải "không tối ưu")
2. Giải thích TẠI SAO nó thất bại cho ĐÚNG tình huống này
3. Đối với đáp án đúng: nêu Anthropic principle cụ thể nào được áp dụng

---

### ❌ LỖI #3 — rationale Generic Copy-Paste

**Mô tả:** Tất cả 20 câu dùng cùng 1 rationale: *"Ưu tiên deterministic patterns hơn probabilistic guidance."*

**Chuẩn bắt buộc — viết rationale RIÊNG cho từng câu:**
```
BAD (dùng cho mọi câu):
  "Ưu tiên các giải pháp thiết kế kiến trúc xác định hơn là các câu nhắc xác suất."

✅ ĐÚNG (riêng cho từng câu, ví dụ):
  Q về stop_reason:
    "stop_reason là tín hiệu có thẩm quyền duy nhất để kết thúc agentic loop. 
     Checking content type là unreliable vì Claude có thể trả về text song song 
     với tool_use blocks."
  
  Q về parallel subagents:
    "Coordinator phát nhiều Task tool calls trong cùng một response turn để chạy 
     subagents song song. Total latency = max(individual times), không phải sum."
  
  Q về prerequisite gate:
    "Financial operations yêu cầu deterministic enforcement. Prerequisite gate 
     physically block tool execution cho đến khi điều kiện tiên quyết được thỏa 
     mãn — không thể bypass bằng prompt."
```

---

### ❌ LỖI #4 — explanation Lặp Lại optionExplanations

**Mô tả:** Field `explanation` chỉ lặp lại y nguyên nội dung `optionExplanations`, thậm chí lặp đôi ký hiệu.

**Ví dụ lỗi thực tế:**
```
BAD:
  explanation: "🔍 Phân tích Anti-Pattern:
  - Option A ❌: Option A ❌ (SAI): Phương án không tối ưu..."
  (Lặp đôi "Option A ❌" và "Option A ❌ (SAI)")
```

**Chuẩn bắt buộc:**
```
✅ ĐÚNG — explanation là VĂN BẢN TỔNG HỢP MẠCH LẠC:
  "✅ Đáp án đúng: B

  💡 Rationale: stop_reason là tín hiệu có thẩm quyền...

  🔍 Phân tích:
  - Option A ❌: Đặt iteration cap không giải quyết root cause...
  - Option B ✅: stop_reason='end_turn' xác nhận task hoàn thành...
  - Option C ❌: Natural language parsing không đáng tin cậy...
  - Option D ❌: tool_choice='any' tạo infinite loop..."
```

**Lưu ý quan trọng:** Trong `explanation`, mỗi dòng phân tích bắt đầu bằng "- Option X ❌:" (không lặp lại "Option X ❌ (SAI): Option X ❌").

---

### ❌ LỖI #5 — Stem Câu Hỏi Generic Template

**Mô tả:** Một câu (d4-b09-001) dùng stem hoàn toàn là template không có tình huống thực tế.

**Lỗi thực tế:**
```
BAD:
  questionEN: "A production prompt engineering & structured output system encounters 
  an edge case where execution fails during high concurrency. The monitoring log shows 
  specific API call failures. What is the canonical Anthropic architecture fix?"
```
→ Đây chính xác là lỗi #1 trong Generation Guide: không có tên hệ thống, không có code, không có metrics.

**Chuẩn bắt buộc — stem PHẢI có ≥ 2 yếu tố:**
```
✅ (a) Code/API field cụ thể: stop_reason, response.content[0].type, PreToolUse, 
       allowedTools, mcp.json, CLAUDE.md, .claudeignore, tool_choice='any'
✅ (b) Số liệu quan sát được: "8% of cases", "40 seconds", "35% of PRs", 
       "120K tokens", "3% skip rate", "40% false positive"
✅ (c) Tên hệ thống cụ thể: "customer support agent", "PR review pipeline", 
       "AML compliance system", "multi-agent research system"
```

---

### ❌ LỖI #6 — Sao Chép Nguyên Câu Từ Study Guide / 254 Mẫu

**Mô tả:** Một số câu (d1-b01-002, d1-b01-003) sao chép nguyên xi `questionEN` và `optionsEN` từ bộ 254 câu mẫu.

**Quy tắc:** Mỗi câu phải là **tình huống MỚI** dựa trên cùng nguyên tắc.
```
BAD: Copy nguyên câu Q1.2 từ 254 mẫu vào file mới

✅ ĐÚNG: Đọc Study Guide để hiểu nguyên tắc, tạo tình huống hoàn toàn mới.
  Ví dụ: thay "renewable energy" thành "pharmaceutical supply chain taxonomy"
  với context và metrics khác — cùng nguyên tắc, tình huống mới.
```

---

### ❌ LỖI #7 — taskStatement Không Khớp với questionEN

**Mô tả:** `taskStatement` ghi "1.3 subagent-invocation-context" nhưng câu hỏi thực ra test về "1.4 workflow-enforcement". Gây ra sự không nhất quán giữa metadata và nội dung.

**Quy tắc:** Sau khi viết questionEN, đọc lại và chọn đúng subtopic trong taskStatement.

---

## 📐 PHẦN 2 — QUY TRÌNH SINH TỪNG CÂU (10 BƯỚC BẮT BUỘC)

**Áp dụng chính xác quy trình này cho TỪNG CÂU một. Không bỏ bước nào.**

```
BƯỚC 1 — Chọn subtopic
  Ví dụ: "1.5 Agent SDK Hooks — PreToolUse enforcement"
  Đọc phần tương ứng trong Study Guide + Generation Guide để hiểu nguyên tắc.

BƯỚC 2 — Tạo TÌNH HUỐNG sản xuất mới (KHÔNG copy từ mẫu)
  Nghĩ ra: Tên hệ thống gì? Lỗi cụ thể gì? Số liệu gì?
  Ví dụ: "An AML compliance system at a fintech company processes 
  international wire transfers. Logs show 3% of transfers skip the 
  mandatory sanction check when the compliance API times out."

BƯỚC 3 — Viết questionEN (tiếng Anh, đầy đủ ngữ cảnh)
  Kiểm tra: Có ≥ 2 yếu tố (code/metrics/tên hệ thống) không?

BƯỚC 4 — Viết 4 optionsEN (tiếng Anh)
  - Tất cả 4 options PHẢI cùng domain kỹ thuật
  - Đáp án đúng PHẢI là Anthropic best practice
  - 3 distractor PHẢI plausible nhưng có failure mode cụ thể

BƯỚC 5 — Dịch sang question (tiếng Việt)
  PHẢI là bản dịch chính xác của questionEN. KHÔNG viết nội dung khác.

BƯỚC 6 — Dịch sang options (tiếng Việt)
  PHẢI là bản dịch chính xác của từng optionsEN tương ứng:
    options[0] = dịch optionsEN[0]
    options[1] = dịch optionsEN[1]
    options[2] = dịch optionsEN[2]
    options[3] = dịch optionsEN[3]

BƯỚC 7 — Viết optionExplanations (4 giải thích RIÊNG BIỆT)
  Mỗi explanation PHẢI:
  - Bắt đầu bằng "Option X ✅ (ĐÚNG):" hoặc "Option X ❌ (SAI):"
  - Gọi tên failure mode cụ thể (1-3 câu)
  - Giải thích TẠI SAO nó fail/succeed cho ĐÚNG tình huống này
  - KHÔNG dùng "Phương án không tối ưu, gây lỗi hoặc tăng độ trễ"

BƯỚC 8 — Viết rationale (1-2 câu ĐẶC THÙ cho câu này)
  KHÔNG dùng generic: "Ưu tiên deterministic patterns hơn probabilistic"
  PHẢI nêu nguyên tắc cụ thể liên quan đến nội dung câu hỏi.

BƯỚC 9 — Viết explanation (văn bản mạch lạc, KHÔNG lặp đôi ký hiệu)
  Format chuẩn:
    "✅ Đáp án đúng: [A/B/C/D]
    
    💡 Rationale: [copy từ rationale]
    
    🔍 Phân tích:
    - Option A [✅/❌]: [1-2 câu, không lặp lại "Option A ❌ (SAI):" ở đây]
    - Option B [✅/❌]: [1-2 câu]
    - Option C [✅/❌]: [1-2 câu]
    - Option D [✅/❌]: [1-2 câu]"

BƯỚC 10 — Self-check (tick từng ô trước khi output câu này)
  □ question (VI) là translation của questionEN (EN)?
  □ options[0..3] (VI) là translation của optionsEN[0..3] (EN)?
  □ Mỗi optionExplanation có failure mode cụ thể?
  □ rationale đặc thù cho câu này, không generic?
  □ explanation không lặp đôi ký hiệu?
  □ questionEN có ≥ 2 yếu tố cụ thể?
  □ 4 optionsEN cùng domain kỹ thuật?
  □ questionEN là câu MỚI, không copy từ Study Guide?
```

---

## 📖 PHẦN 3 — ĐỌC STUDY GUIDE ĐÚNG CÁCH

File `CCA_Foundations_Study_Guide.md` có 77 câu với đáp án và explanation. Đây là nguồn **nguyên tắc kỹ thuật**, không phải nguồn **copy câu hỏi**.

### Cách đọc đúng:

**Đọc Explanation của Study Guide** → Hiểu nguyên tắc Anthropic → Tạo tình huống MỚI áp dụng nguyên tắc đó.

**Ví dụ cụ thể:**

Study Guide Q7 (Domain 1):
```
Stem: Coordinator logs show "I'll ask the web search agent" but no subagent execution occurs.
Correct: D — coordinator's allowedTools doesn't include "Task"
Explanation: "if allowedTools omits 'Task', the coordinator can still verbally 
reason about delegating but has no mechanism to actually spawn subagents"
```

→ **Nguyên tắc rút ra:** *"Task tool phải được thêm vào allowedTools của coordinator để spawn subagents. Thiếu Task → silent failure, không có error"*

→ **Tình huống mới có thể tạo:**
```
"A coordinator agent for a legal research system has AgentDefinitions for 
case-law-search, statute-lookup, and precedent-analysis agents. During testing, 
the coordinator outputs 'Delegating to case-law-search agent for this query' 
but no search results are ever returned and no errors appear in logs. 
What is the most likely configuration error?"
```
Cùng nguyên tắc, tình huống hoàn toàn khác.

---

## 🔢 PHẦN 4 — PHÂN BỔ CHUẨN CHO MỖI BATCH 20 CÂU

### Phân bổ Domain:
| Domain | Số câu | % |
|---|---|---|
| D1 Agentic Architecture | 4 câu | 20% |
| D2 Tool Design | 4 câu | 20% |
| D3 Claude Code | 4 câu | 20% |
| D4 Prompt Engineering | 4 câu | 20% |
| D5 Context & Reliability | 4 câu | 20% |

### Phân bổ đáp án đúng (PLAN TRƯỚC KHI VIẾT):
```
Trong 20 câu phải có chính xác: 5 A, 5 B, 5 C, 5 D
Ví dụ plan:
  D1-Q1: A  D1-Q2: B  D1-Q3: C  D1-Q4: D
  D2-Q1: B  D2-Q2: C  D2-Q3: D  D2-Q4: A
  D3-Q1: C  D3-Q2: D  D3-Q3: A  D3-Q4: B
  D4-Q1: D  D4-Q2: A  D4-Q3: B  D4-Q4: C
  D5-Q1: A  D5-Q2: B  D5-Q3: C  D5-Q4: D
```

### Phân bổ difficulty:
- `recall`: ~20% (4/20 câu) — hỏi trực tiếp fact/definition
- `application`: ~50% (10/20 câu) — áp dụng nguyên tắc vào tình huống
- `scenario-analysis`: ~30% (6/20 câu) — phân tích root cause phức tạp

---

## ✅ PHẦN 5 — VÍ DỤ SINH CÂU HOÀN CHỈNH (GOLD STANDARD)

Đây là 1 câu hoàn chỉnh đúng chuẩn, sinh từ Study Guide Q7 (Domain 1):

```json
{
  "id": "d1-b01-007",
  "domain": "D1",
  "domainTitle": "Agent Architecture & Orchestration",
  "taskStatement": "1.3 subagent-invocation-context / allowedTools",
  "difficulty": "scenario-analysis",
  "scenarioId": "s107",
  "questionEN": "A coordinator agent for a legal research system has AgentDefinitions configured for three specialists: case-law-search, statute-lookup, and precedent-analysis, each with appropriate system prompts and tool restrictions. During testing, the coordinator generates messages like 'I will delegate this query to the case-law-search agent' but no subagent execution occurs. No errors are logged, and the coordinator continues with incomplete information. What is the most likely cause?",
  "question": "[d1-b01-007] Một coordinator agent cho hệ thống nghiên cứu pháp lý đã cấu hình AgentDefinitions cho ba chuyên gia: case-law-search, statute-lookup và precedent-analysis, với system prompt và tool restrictions phù hợp. Trong quá trình test, coordinator sinh message 'I will delegate this query to the case-law-search agent' nhưng không có subagent nào được thực thi, không có lỗi được log, và coordinator tiếp tục xử lý với thông tin thiếu. Nguyên nhân phổ biến nhất là gì?",
  "optionsEN": [
    "A. The AgentDefinitions descriptions are too vague, preventing the coordinator from selecting the correct subagent for each query type.",
    "B. The coordinator's max_tokens is set too low, causing the Task tool call to be truncated before the subagent type parameter is included.",
    "C. Subagent context isolation requires explicit ClaudeAgentOptions configuration to forward task descriptions — without it, subagents receive empty prompts and reject the invocation.",
    "D. The coordinator's allowedTools list does not include 'Task', so while it can reason about delegation it cannot invoke the tool required to spawn subagents."
  ],
  "options": [
    "A. Descriptions trong AgentDefinitions quá mơ hồ, ngăn coordinator chọn đúng subagent cho từng loại truy vấn.",
    "B. max_tokens của coordinator đặt quá thấp, làm Task tool call bị cắt ngắn trước khi tham số subagent type được đưa vào.",
    "C. Cô lập context của subagent yêu cầu cấu hình ClaudeAgentOptions explicit để forward task descriptions — không có nó, subagents nhận prompt rỗng và từ chối invocation.",
    "D. Danh sách allowedTools của coordinator không bao gồm 'Task', vì vậy tuy có thể lập luận về việc ủy quyền nhưng không thể gọi tool cần thiết để spawn subagents."
  ],
  "correct": 3,
  "optionExplanations": [
    "Option A ❌ (SAI): AgentDefinitions descriptions ảnh hưởng đến cách model CHỌN agent nào để delegate, không phải khả năng GỌI agent. Coordinator đã chọn đúng agent bằng lời ('case-law-search') — vấn đề là ở cơ chế invocation (allowedTools), không phải quality of descriptions.",
    "Option B ❌ (SAI): Truncated max_tokens sẽ sinh ra API error hoặc response bị cắt ngắn rõ ràng — không phải silent failure với 'no errors logged'. Triệu chứng không có lỗi ghi log loại trừ truncation là nguyên nhân.",
    "Option C ❌ (SAI): Context isolation giữa subagents là hành vi bình thường và yêu cầu coordinator explicitly inject context vào subagent prompt — nhưng đây là điều xảy ra SAU KHI invocation thành công. Nó không ngăn invocation xảy ra.",
    "Option D ✅ (ĐÚNG): Trong Claude Agent SDK, subagents được spawn thông qua Task tool. Nếu 'Task' không có trong allowedTools của coordinator, model có thể lập luận bằng lời về việc ủy quyền nhưng không có tool mechanism để thực sự spawn subagent — kết quả là silent continuation không có execution và không có error."
  ],
  "rationale": "Subagents trong Claude Agent SDK chỉ được spawn thông qua Task tool. Thiếu 'Task' trong allowedTools coordinator là configuration error ngăn execution xảy ra mà không sinh error — coordinator tiếp tục silently với thông tin thiếu.",
  "explanation": "✅ Đáp án đúng: D\n\n💡 Rationale: Subagents trong Claude Agent SDK chỉ được spawn thông qua Task tool. Thiếu 'Task' trong allowedTools coordinator là configuration error ngăn execution xảy ra mà không sinh error — coordinator tiếp tục silently với thông tin thiếu.\n\n🔍 Phân tích:\n- Option A ❌: Descriptions ảnh hưởng đến CHỌN agent nào, không phải GỌI agent. Coordinator đã chọn đúng bằng lời — vấn đề ở allowedTools.\n- Option B ❌: Truncated tokens gây error hoặc response bị cắt rõ ràng. 'No errors logged' loại trừ truncation.\n- Option C ❌: Context isolation là behavior bình thường SAU invocation thành công, không ngăn invocation xảy ra.\n- Option D ✅: Task tool không trong allowedTools → coordinator lập luận được bằng lời nhưng không có cơ chế tool để spawn → silent failure không có error.",
  "sources": [
    {
      "label": "Lesson 1.3: Subagent Invocation and Context Passing (Task tool)",
      "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context#the-task-tool"
    },
    {
      "label": "Anthropic: Claude Agent SDK Overview",
      "url": "https://platform.claude.com/docs/en/agent-sdk/overview"
    }
  ]
}
```

---

## 🔍 PHẦN 6 — CHECKLIST TỰ KIỂM TRA CUỐI CÙNG

Trước khi output batch JSON, chạy checklist này cho TỪNG câu:

```
□ [QUAN TRỌNG NHẤT] question (VI) = translation chính xác của questionEN (EN)?
□ [QUAN TRỌNG NHẤT] options[i] (VI) = translation chính xác của optionsEN[i] (EN) cùng index?
□ Mỗi optionExplanation gọi failure mode cụ thể (không phải "không tối ưu")?
□ rationale đặc thù cho câu này (không phải generic template)?
□ explanation không có lặp đôi ký hiệu ("Option A ❌: Option A ❌ (SAI):")?
□ questionEN có ≥ 2 yếu tố: code/metrics/tên hệ thống?
□ 4 optionsEN cùng domain kỹ thuật?
□ questionEN là câu MỚI, không copy từ Study Guide / 254 mẫu?
□ Phân bổ đáp án đúng (A/B/C/D) trong batch đã cân bằng?
□ difficulty field (recall/application/scenario-analysis) khớp với loại câu hỏi?
```

Nếu BẤT KỲ checkbox nào KHÔNG tick được → **VIẾT LẠI câu đó** trước khi output.
