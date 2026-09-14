/* CCAF Learning Hub - Hard Scenario Questions Dataset (Level 3 & Level 4)
   Total: 140 Verified Hard Scenario Questions (Level 3: Complex Scenario & Trade-offs, Level 4: Deep Architecture Traps)
   Extracted from Master Pool (533Q) with 0 Basic Recall questions.
   Domain distribution: D1 (35), D2 (30), D3 (15), D4 (32), D5 (28)
*/

function generateMockQuestionsPoolHard() {
  return [
  {
    "id": "ccaf-001",
    "originalId": "lnq-001",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p1",
    "difficulty": "application",
    "scenarioId": "s-ccaf-001",
    "questionEN": "Your pipeline reviews every PR using a single API call with a static prompt containing the diff and full text of each changed file — unchanged files are not included. Reviews are posted asynchronously and don't block PR creation. Developers report that reviews consistently miss bugs involving cross-file interactions — for example, a PR renames a function's parameters but the review doesn't flag callers in unchanged files that still use the old argument order. Evaluation shows cross-file bugs account for 35% of production incidents from reviewed PRs. What is the most effective change to your review design?",
    "question": "Pipeline của bạn review mỗi PR bằng một lệnh gọi API duy nhất với một prompt tĩnh chứa diff và toàn bộ nội dung của từng file đã thay đổi — các file không thay đổi không được đưa vào. Các review được đăng bất đồng bộ (asynchronously) và không chặn việc tạo PR. Các developer báo cáo rằng review liên tục bỏ sót các bug liên quan đến tương tác cross-file — ví dụ, một PR đổi tên các tham số của một hàm nhưng review không gắn cờ (flag) các lời gọi (caller) trong các file không thay đổi vẫn còn sử dụng thứ tự tham số cũ. Đánh giá (evaluation) cho thấy các bug cross-file chiếm 35% số sự cố production từ các PR đã được review. Thay đổi hiệu quả nhất đối với thiết kế review của bạn là gì?",
    "optionsEN": [
      "A. Redesign the review as a turn-limited agentic task where the model can read files and search the codebase via tools, following references to verify cross-file findings.",
      "B. Add chain-of-thought instructions asking the model to list all external references in the diff, then reason step-by-step about how each change might affect callers in other files.",
      "C. Run parallel review passes per changed file with direct dependents included in each pass, then aggregate and deduplicate findings using a final summarization call.",
      "D. Use static analysis to build a dependency graph of changed code, then expand the prompt to include all files within two dependency hops of any changed file."
    ],
    "options": [
      "A. Thiết kế lại việc review thành một agentic task có giới hạn số turn, trong đó model có thể đọc file và tìm kiếm trong codebase thông qua tool, đi theo các reference để xác minh các phát hiện liên quan đến nhiều file.",
      "B. Thêm chain-of-thought instructions yêu cầu model liệt kê tất cả các external reference trong diff, sau đó suy luận từng bước (step-by-step) về việc mỗi thay đổi có thể ảnh hưởng đến các caller ở file khác như thế nào.",
      "C. Chạy song song các lượt review theo từng file đã thay đổi, kèm theo các dependent trực tiếp trong mỗi lượt, sau đó tổng hợp và loại bỏ trùng lặp các phát hiện bằng một lời gọi summarization cuối cùng.",
      "D. Dùng static analysis để xây dựng dependency graph của phần code đã thay đổi, sau đó mở rộng prompt để bao gồm tất cả các file nằm trong phạm vi hai bước dependency (two dependency hops) tính từ bất kỳ file đã thay đổi nào."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Lỗi ở đây là một vấn đề thiếu context: các caller nằm trong những file không thay đổi mà prompt tĩnh không bao giờ đưa vào, vì vậy chain-of-thought (B) không thể giúp model suy luận về code mà nó không nhìn thấy được, còn các heuristic tĩnh (C, D) làm phình to context trong khi vẫn bỏ sót các tham chiếu động hoặc đa bước (multi-hop). Hướng dẫn của Anthropic về agent ủng hộ agentic search — để model tự truy xuất chính xác context mà nó cần thông qua các tool đọc file/tìm kiếm (file-read/search tools) — và pipeline review bất đồng bộ, không chặn (nonblocking) có thể chấp nhận độ trễ tăng thêm, trong khi một giới hạn turn (turn limit) sẽ giới hạn chi phí.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "The failure is a missing-context problem: callers live in unchanged files the static prompt never includes, so chain-of-thought (B) cannot help the model reason about code it cannot see, and static heuristics (C, D) bloat context while still missing dynamic or multi-hop references. Anthropic's agent guidance favors agentic search — letting the model retrieve exactly the context it needs via file-read/search tools — and the asynchronous, nonblocking review pipeline tolerates the added latency, while a turn limit bounds cost.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nLỗi ở đây là một vấn đề thiếu context: các caller nằm trong những file không thay đổi mà prompt tĩnh không bao giờ đưa vào, vì vậy chain-of-thought (B) không thể giúp model suy luận về code mà nó không nhìn thấy được, còn các heuristic tĩnh (C, D) làm phình to context trong khi vẫn bỏ sót các tham chiếu động hoặc đa bước (multi-hop). Hướng dẫn của Anthropic về agent ủng hộ agentic search — để model tự truy xuất chính xác context mà nó cần thông qua các tool đọc file/tìm kiếm (file-read/search tools) — và pipeline review bất đồng bộ, không chặn (nonblocking) có thể chấp nhận độ trễ tăng thêm, trong khi một giới hạn turn (turn limit) sẽ giới hạn chi phí.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-003",
    "originalId": "lnq-003",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p3",
    "difficulty": "application",
    "scenarioId": "s-ccaf-003",
    "questionEN": "An engineer submits two requests: Request A: \"Rename the getUserData function to fetchUserProfile everywhere it's used.\" Request B: \"Improve error handling throughout the data processing module—add try/catch blocks, meaningful error messages, and ensure failures don't silently corrupt data.\" For which request does specifying an explicit multi-phase workflow (such as analyze → propose → implement with review) most improve outcome quality?",
    "question": "Một engineer gửi hai yêu cầu: Yêu cầu A: \"Đổi tên hàm getUserData thành fetchUserProfile ở mọi nơi nó được sử dụng.\" Yêu cầu B: \"Cải thiện việc xử lý lỗi (error handling) trong toàn bộ module xử lý dữ liệu — thêm các khối try/catch, các thông báo lỗi có ý nghĩa, và đảm bảo các lỗi (failure) không âm thầm làm hỏng dữ liệu.\" Đối với yêu cầu nào thì việc chỉ định rõ một workflow nhiều giai đoạn (multi-phase workflow) (chẳng hạn analyze → propose → implement with review) cải thiện chất lượng kết quả nhiều nhất?",
    "optionsEN": [
      "A. Request B, the error handling task",
      "B. Both requests benefit equally",
      "C. Request A, the function rename task",
      "D. Neither request benefits significantly"
    ],
    "options": [
      "A. Yêu cầu B, task xử lý lỗi (error handling)",
      "B. Cả hai yêu cầu đều được hưởng lợi như nhau",
      "C. Yêu cầu A, task đổi tên function (function rename)",
      "D. Không yêu cầu nào được hưởng lợi đáng kể"
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Yêu cầu B là mở (open-ended) và đòi hỏi nhiều phán đoán (judgment-heavy) — \"cải thiện việc xử lý lỗi\" đòi hỏi phải phân tích hành vi hiện tại, quyết định try/catch nên đặt ở đâu, và chọn các thông báo có ý nghĩa, vì vậy một workflow rõ ràng analyze → propose → implement-with-review sẽ nâng cao chất lượng đáng kể và phát hiện thiết kế sai trước khi thay đổi code. Yêu cầu A là một thao tác đổi tên (rename) máy móc, được định nghĩa rõ ràng mà một cách thực thi kiểu find-and-replace đơn giản đã xử lý tốt, vì vậy cấu trúc nhiều giai đoạn (multi-phase) không mang lại nhiều giá trị thêm.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Request B is open-ended and judgment-heavy — \"improve error handling\" requires analyzing current behavior, deciding where try/catch belongs, and choosing meaningful messages, so an explicit analyze → propose → implement-with-review workflow materially raises quality and catches bad design before code changes. Request A is a mechanical, well-defined rename that a simple find-and-replace-style execution handles fine, so the multi-phase structure adds little.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nYêu cầu B là mở (open-ended) và đòi hỏi nhiều phán đoán (judgment-heavy) — \"cải thiện việc xử lý lỗi\" đòi hỏi phải phân tích hành vi hiện tại, quyết định try/catch nên đặt ở đâu, và chọn các thông báo có ý nghĩa, vì vậy một workflow rõ ràng analyze → propose → implement-with-review sẽ nâng cao chất lượng đáng kể và phát hiện thiết kế sai trước khi thay đổi code. Yêu cầu A là một thao tác đổi tên (rename) máy móc, được định nghĩa rõ ràng mà một cách thực thi kiểu find-and-replace đơn giản đã xử lý tốt, vì vậy cấu trúc nhiều giai đoạn (multi-phase) không mang lại nhiều giá trị thêm.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-005",
    "originalId": "lnq-005",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p5",
    "difficulty": "application",
    "scenarioId": "s-ccaf-005",
    "questionEN": "Your multi-agent research pipeline crashed after processing 12 of 28 documents. The web search agent had identified relevant sources, the document analyzer had partially completed extraction, and the synthesizer had begun pattern identification. You need to resume processing without repeating work or losing fidelity of prior findings. What state management approach best balances information fidelity with context efficiency when restoring agent state?",
    "question": "Pipeline nghiên cứu multi-agent của bạn bị crash sau khi xử lý được 12 trong số 28 tài liệu. Agent web search đã xác định được các nguồn liên quan, document analyzer đã hoàn thành một phần việc extraction, và synthesizer đã bắt đầu việc xác định pattern. Bạn cần tiếp tục xử lý mà không lặp lại công việc đã làm hay mất đi độ chính xác (fidelity) của các phát hiện trước đó. Cách tiếp cận quản lý state (state management) nào cân bằng tốt nhất giữa độ chính xác thông tin (information fidelity) và hiệu quả sử dụng context khi khôi phục (restore) trạng thái agent?",
    "optionsEN": [
      "A. Have each agent maintain its own persistent state file and reload it independently at the start of each session.",
      "B. Persist the coordinator's conversation log containing all task delegations and responses, providing this to agents when resuming.",
      "C. Index all agent outputs in a shared vector store. When resuming, each agent queries the store using semantic search to retrieve relevant prior findings.",
      "D. Have each agent persist a structured export to a known location. On resume, the coordinator loads the manifest and injects relevant state into agent prompts."
    ],
    "options": [
      "A. Để mỗi agent duy trì file trạng thái (state file) riêng của nó và tự tải lại một cách độc lập vào đầu mỗi session.",
      "B. Lưu lại (persist) log hội thoại của coordinator chứa toàn bộ các lượt ủy quyền task (task delegation) và phản hồi, rồi cung cấp lại cho các agent khi resume.",
      "C. Lập chỉ mục toàn bộ output của agent vào một shared vector store. Khi resume, mỗi agent truy vấn store này bằng semantic search để lấy lại các phát hiện trước đó có liên quan.",
      "D. Để mỗi agent lưu lại một bản export có cấu trúc (structured export) vào một vị trí đã biết. Khi resume, coordinator tải manifest và đưa (inject) trạng thái liên quan vào prompt của agent."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Các best practice về multi-agent của Anthropic khuyến nghị lưu trữ bền vững (persist) các artifact có cấu trúc (structured artifact) vào external storage và để orchestrator chọn lọc chỉ đưa (re-inject) lại phần state liên quan vào context của mỗi subagent. Cách này bảo toàn được độ chính xác (các bản export có cấu trúc không mất mát dữ liệu — lossless — cùng với một manifest ghi lại công việc đã hoàn thành) trong khi vẫn hiệu quả về context, trong khi A thiếu logic resume có phối hợp, B làm ngập (flood) agent với toàn bộ conversation log, và semantic search của C có tính lossy và có thể bỏ sót hoặc làm sai lệch các phát hiện trước đó."
    ],
    "rationale": "Anthropic's multi-agent best practices recommend persisting structured artifacts to external storage and having the orchestrator selectively re-inject only the relevant state into each subagent's context. This preserves fidelity (lossless structured exports plus a manifest of completed work) while staying context-efficient, whereas A lacks coordinated resume logic, B floods agents with an entire conversation log, and C's semantic search is lossy and may miss or garble prior findings.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nCác best practice về multi-agent của Anthropic khuyến nghị lưu trữ bền vững (persist) các artifact có cấu trúc (structured artifact) vào external storage và để orchestrator chọn lọc chỉ đưa (re-inject) lại phần state liên quan vào context của mỗi subagent. Cách này bảo toàn được độ chính xác (các bản export có cấu trúc không mất mát dữ liệu — lossless — cùng với một manifest ghi lại công việc đã hoàn thành) trong khi vẫn hiệu quả về context, trong khi A thiếu logic resume có phối hợp, B làm ngập (flood) agent với toàn bộ conversation log, và semantic search của C có tính lossy và có thể bỏ sót hoặc làm sai lệch các phát hiện trước đó.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-006",
    "originalId": "lnq-006",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p6",
    "difficulty": "application",
    "scenarioId": "s-ccaf-006",
    "questionEN": "Scenario: Multi-Agent Research — Production monitoring shows the research phase takes longer than expected. Analysis reveals the coordinator invokes the web search subagent, waits for its response, then invokes the document analysis subagent and waits again. These tasks are independent—neither requires the other's output. How should you modify the system to run these subagents concurrently?",
    "question": "Tình huống: Multi-Agent Research — Giám sát production (production monitoring) cho thấy giai đoạn nghiên cứu (research phase) mất nhiều thời gian hơn dự kiến. Phân tích cho thấy coordinator gọi subagent web search, chờ phản hồi của nó, sau đó gọi subagent document analysis và lại chờ tiếp. Hai tác vụ này độc lập với nhau — không tác vụ nào cần output của tác vụ kia. Bạn nên sửa đổi hệ thống như thế nào để chạy các subagent này đồng thời (concurrently)?",
    "optionsEN": [
      "A. Switch both subagents to use a Haiku-tier model instead of Sonnet to reduce their individual execution time.",
      "B. Create an async orchestration layer outside the agent that spawns parallel threads, each running a separate coordinator-subagent pair, then aggregates results.",
      "C. Structure the coordinator to emit both Task tool calls (for web search and document analysis) in a single response message rather than across separate conversation turns.",
      "D. Add detailed instructions to the coordinator's system prompt explaining the performance benefits of parallel execution and requesting it invoke both subagents at the same time."
    ],
    "options": [
      "A. Chuyển cả hai subagent sang dùng model tier Haiku thay vì Sonnet để giảm thời gian thực thi riêng của từng subagent.",
      "B. Tạo một lớp orchestration bất đồng bộ (async) bên ngoài agent, lớp này sinh ra các thread song song, mỗi thread chạy một cặp coordinator-subagent riêng biệt, rồi tổng hợp kết quả.",
      "C. Cấu trúc coordinator để phát ra cả hai lời gọi Task tool (cho web search và document analysis) trong cùng một tin nhắn phản hồi, thay vì ở các turn hội thoại riêng biệt.",
      "D. Thêm instructions chi tiết vào system prompt của coordinator giải thích lợi ích về hiệu năng của việc thực thi song song và yêu cầu nó gọi cả hai subagent cùng một lúc."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Trong kiến trúc agent của Claude, các subagent chạy đồng thời khi coordinator phát ra nhiều lệnh gọi Task tool trong cùng một assistant message — harness sẽ thực thi song song các block tool_use trong cùng một turn. Phương án A chỉ tăng tốc từng bước tuần tự (serial), B thêm hạ tầng bên ngoài không cần thiết, lặp lại những gì agent loop đã hỗ trợ sẵn, còn D chỉ giải thích/yêu cầu tính song song mà không đảm bảo cơ chế cấu trúc (structural mechanism) (các lệnh gọi tool trong cùng một message) thực sự tạo ra việc thực thi đồng thời.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "In Claude's agent architecture, subagents run concurrently when the coordinator emits multiple Task tool calls in a single assistant message — the harness executes parallel tool_use blocks from the same turn simultaneously. Option A only speeds up each serial step, B adds unnecessary external infrastructure duplicating what the agent loop already supports, and D merely explains/requests parallelism without ensuring the structural mechanism (same-message tool calls) that actually produces concurrent execution.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTrong kiến trúc agent của Claude, các subagent chạy đồng thời khi coordinator phát ra nhiều lệnh gọi Task tool trong cùng một assistant message — harness sẽ thực thi song song các block tool_use trong cùng một turn. Phương án A chỉ tăng tốc từng bước tuần tự (serial), B thêm hạ tầng bên ngoài không cần thiết, lặp lại những gì agent loop đã hỗ trợ sẵn, còn D chỉ giải thích/yêu cầu tính song song mà không đảm bảo cơ chế cấu trúc (structural mechanism) (các lệnh gọi tool trong cùng một message) thực sự tạo ra việc thực thi đồng thời.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-007",
    "originalId": "lnq-007",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p7",
    "difficulty": "application",
    "scenarioId": "s-ccaf-007",
    "questionEN": "The coordinator agent has AgentDefinitions configured for all four specialized subagents, each with appropriate descriptions, prompts, and tool restrictions. During testing, you notice the coordinator correctly reasons about when to delegate—it generates messages like \"I'll ask the web search agent to find sources on this topic\"—but no subagent execution ever occurs. The coordinator then proceeds as if the delegation happened and continues with incomplete information. Logs show no errors. What is the most likely cause?",
    "question": "Coordinator agent có AgentDefinitions được cấu hình cho cả bốn subagent chuyên biệt, mỗi cái có description, prompt và giới hạn tool (tool restriction) phù hợp. Trong quá trình testing, bạn nhận thấy coordinator suy luận đúng về thời điểm cần delegate (ủy quyền) — nó tạo ra các message như \"Tôi sẽ nhờ web search agent tìm nguồn về chủ đề này\" — nhưng không có subagent nào thực sự được thực thi. Coordinator sau đó tiếp tục như thể việc delegate đã xảy ra và làm việc với thông tin không đầy đủ. Log không cho thấy lỗi nào. Nguyên nhân khả dĩ nhất là gì?",
    "optionsEN": [
      "A. The AgentDefinitions are configured correctly, but the coordinator's system prompt doesn't explicitly list the available subagent types, preventing the model from knowing they can be invoked.",
      "B. Subagent context isolation means task descriptions from the coordinator don't automatically reach subagents; you need to configure explicit context forwarding in ClaudeAgentOptions.",
      "C. The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent type parameter can be specified.",
      "D. The coordinator's allowedTools configuration doesn't include \"Task\", so while it can reason about delegation, it cannot invoke the tool required to spawn subagents."
    ],
    "options": [
      "A. Các AgentDefinition được cấu hình đúng, nhưng system prompt của coordinator không liệt kê rõ ràng các loại subagent khả dụng, khiến model không biết chúng có thể được gọi.",
      "B. Việc cô lập context của subagent (subagent context isolation) nghĩa là các mô tả task từ coordinator không tự động đến được subagent; bạn cần cấu hình việc chuyển tiếp context (context forwarding) rõ ràng trong ClaudeAgentOptions.",
      "C. Thiết lập max_tokens của coordinator quá thấp, khiến lời gọi Task tool bị cắt ngắn (truncated) trước khi tham số subagent type có thể được chỉ định.",
      "D. Cấu hình allowedTools của coordinator không bao gồm \"Task\", vì vậy dù nó có thể suy luận về việc ủy quyền (delegation), nó không thể gọi tool cần thiết để sinh ra các subagent."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Trong Claude Agent SDK, các subagent được định nghĩa qua AgentDefinitions được khởi chạy thông qua Task tool; nếu allowedTools bỏ sót \"Task\", coordinator vẫn có thể suy luận bằng lời về việc delegate nhưng không có cơ chế nào để thực sự spawn (khởi tạo) subagent, và nó âm thầm tiếp tục mà không có chúng — khớp với triệu chứng không có thực thi và không có lỗi. max_tokens bị cắt ngắn (truncated) (C) hoặc thiếu liệt kê prompt (A) sẽ tạo ra lỗi hoặc hành vi khác, và context isolation (B) không ngăn cản việc invocation (gọi thực thi)."
    ],
    "rationale": "In the Claude Agent SDK, subagents defined via AgentDefinitions are launched through the Task tool; if allowedTools omits \"Task\", the coordinator can still verbally reason about delegating but has no mechanism to actually spawn subagents, and it silently continues without them—matching the symptom of no execution and no errors. Truncated max_tokens (C) or missing prompt listings (A) would produce errors or different behavior, and context isolation (B) doesn't prevent invocation.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nTrong Claude Agent SDK, các subagent được định nghĩa qua AgentDefinitions được khởi chạy thông qua Task tool; nếu allowedTools bỏ sót \"Task\", coordinator vẫn có thể suy luận bằng lời về việc delegate nhưng không có cơ chế nào để thực sự spawn (khởi tạo) subagent, và nó âm thầm tiếp tục mà không có chúng — khớp với triệu chứng không có thực thi và không có lỗi. max_tokens bị cắt ngắn (truncated) (C) hoặc thiếu liệt kê prompt (A) sẽ tạo ra lỗi hoặc hành vi khác, và context isolation (B) không ngăn cản việc invocation (gọi thực thi).",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-008",
    "originalId": "lnq-008",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p8",
    "difficulty": "application",
    "scenarioId": "s-ccaf-008",
    "questionEN": "Scenario: Multi-Agent Research — When analyzing complex legal cases that cite multiple precedents, the document analysis subagent processes each sequentially. A landmark case citing 12 precedents takes over 3 minutes to analyze completely. What's the most effective way to reduce this latency while preserving the coordinator's ability to monitor and debug the system?",
    "question": "Tình huống: Multi-Agent Research — Khi phân tích các vụ án pháp lý (legal case) phức tạp có trích dẫn nhiều tiền lệ (precedent), subagent document analysis xử lý từng tiền lệ một cách tuần tự (sequentially). Một vụ án mang tính bước ngoặt (landmark case) trích dẫn 12 tiền lệ mất hơn 3 phút để phân tích xong hoàn toàn. Cách hiệu quả nhất để giảm độ trễ (latency) này trong khi vẫn giữ được khả năng giám sát (monitor) và debug hệ thống của coordinator là gì?",
    "optionsEN": [
      "A. Have the coordinator spawn parallel document analysis subagents, each handling a subset of precedents, then aggregate results before synthesis",
      "B. Enable the document analysis subagent to spawn its own specialized subagents dynamically when it encounters cases with many citations",
      "C. Create a recursive agent hierarchy where analysis agents subdivide work among child agents until reaching single-precedent granularity",
      "D. Implement a message queue where precedent analysis tasks are processed asynchronously by a pool of worker agents"
    ],
    "options": [
      "A. Để coordinator sinh ra các subagent phân tích tài liệu (document analysis) chạy song song, mỗi subagent xử lý một tập con các precedent, sau đó tổng hợp kết quả trước khi synthesis.",
      "B. Cho phép subagent phân tích tài liệu tự sinh ra các subagent chuyên biệt của riêng nó một cách động (dynamically) khi gặp các case có nhiều citation.",
      "C. Tạo một cấu trúc phân cấp agent đệ quy (recursive agent hierarchy), trong đó các agent phân tích chia nhỏ công việc cho các agent con cho đến khi đạt độ chi tiết từng precedent riêng lẻ.",
      "D. Triển khai một message queue trong đó các task phân tích precedent được xử lý bất đồng bộ (asynchronously) bởi một pool các worker agent."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Thiết kế multi-agent được Anthropic khuyến nghị là pattern orchestrator-worker với một hệ thống phân cấp phẳng (flat hierarchy): chính coordinator sẽ spawn các subagent song song và tổng hợp (aggregate) kết quả của chúng, điều này giảm latency nhờ tính song song trong khi vẫn giữ toàn bộ việc spawning, monitoring và debugging tập trung tại một nơi. Các phương án B và C tạo ra các hệ thống phân cấp agent lồng nhau/đệ quy (nested/recursive) làm suy giảm nghiêm trọng khả năng quan sát (observability) và khả năng debug, còn D đưa vào hạ tầng hàng đợi bất đồng bộ (asynchronous queue) làm tách rời công việc khỏi tầm nhìn trực tiếp (direct visibility) của coordinator.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Anthropic's recommended multi-agent design is the orchestrator-worker pattern with a flat hierarchy: the coordinator itself spawns parallel subagents and aggregates their results, which cuts latency through parallelism while keeping all spawning, monitoring, and debugging centralized in one place. Options B and C create nested/recursive agent hierarchies that severely degrade observability and debuggability, and D introduces asynchronous queue infrastructure that decouples work from the coordinator's direct visibility.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nThiết kế multi-agent được Anthropic khuyến nghị là pattern orchestrator-worker với một hệ thống phân cấp phẳng (flat hierarchy): chính coordinator sẽ spawn các subagent song song và tổng hợp (aggregate) kết quả của chúng, điều này giảm latency nhờ tính song song trong khi vẫn giữ toàn bộ việc spawning, monitoring và debugging tập trung tại một nơi. Các phương án B và C tạo ra các hệ thống phân cấp agent lồng nhau/đệ quy (nested/recursive) làm suy giảm nghiêm trọng khả năng quan sát (observability) và khả năng debug, còn D đưa vào hạ tầng hàng đợi bất đồng bộ (asynchronous queue) làm tách rời công việc khỏi tầm nhìn trực tiếp (direct visibility) của coordinator.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-009",
    "originalId": "lnq-009",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p9",
    "difficulty": "application",
    "scenarioId": "s-ccaf-009",
    "questionEN": "Scenario: Multi-Agent Research — In production, final reports frequently contain claims without proper source attribution. Investigation shows that while the web search and document analysis agents correctly attach citations to their outputs, the synthesis agent loses track of which sources support which conclusions when combining findings. What's the most effective architectural change?",
    "question": "Tình huống: Multi-Agent Research — Trong production, các báo cáo cuối cùng thường xuyên chứa các luận điểm (claim) mà không có sự quy chiếu nguồn (source attribution) phù hợp. Điều tra cho thấy trong khi các agent web search và document analysis gắn trích dẫn (citation) đúng vào output của chúng, agent synthesis lại mất dấu việc nguồn nào hỗ trợ cho kết luận nào khi kết hợp các phát hiện lại với nhau. Thay đổi kiến trúc (architectural change) hiệu quả nhất là gì?",
    "optionsEN": [
      "A. Have the coordinator inject source identifier prefixes into text before each handoff, then parse these prefixes at report generation to reconstruct citations.",
      "B. Maintain complete transcripts of all subagent interactions and add a citation-resolution agent to analyze logs and determine attributions before report generation.",
      "C. Require all subagents to output structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources.",
      "D. Add a verification step where the report generator uses semantic similarity matching against original sources to reconstruct which claims came from which documents."
    ],
    "options": [
      "A. Để coordinator chèn các tiền tố định danh nguồn (source identifier prefix) vào văn bản trước mỗi lần bàn giao (handoff), sau đó phân tích các tiền tố này khi tạo báo cáo để tái tạo lại citation.",
      "B. Duy trì bản ghi đầy đủ (complete transcript) của mọi tương tác giữa các subagent và thêm một agent giải quyết citation (citation-resolution agent) để phân tích log và xác định attribution trước khi tạo báo cáo.",
      "C. Yêu cầu tất cả subagent xuất ra các ánh xạ claim-source có cấu trúc (structured claim-source mapping) mà synthesis agent phải giữ nguyên và hợp nhất khi kết hợp các phát hiện từ nhiều nguồn.",
      "D. Thêm một bước xác minh trong đó report generator dùng semantic similarity matching so với các nguồn gốc để tái tạo lại claim nào đến từ tài liệu nào."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Lỗi ở đây là sự mất thông tin (information loss) tại giai đoạn synthesis, vì vậy cách khắc phục là mang theo attribution (quy chiếu nguồn) dưới dạng structured data xuyên suốt (end-to-end): các subagent phát ra các ánh xạ claim-source (claim-source mapping) rõ ràng và agent synthesis bắt buộc phải bảo toàn và hợp nhất (merge) chúng. Điều này khớp với best practice của Anthropic về multi-agent là dùng structured output thay vì các quy ước tiền tố văn bản (text-prefix convention) mong manh (A), phân tích log sau sự việc (post-hoc log analysis) tốn kém (B), hoặc tái tạo bằng semantic-similarity không đáng tin cậy (D).",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "The failure is information loss at the synthesis stage, so the fix is to carry attribution as structured data end-to-end: subagents emit explicit claim-source mappings and the synthesis agent is required to preserve and merge them. This matches Anthropic's multi-agent best practice of structured outputs over fragile text-prefix conventions (A), costly post-hoc log analysis (B), or unreliable semantic-similarity reconstruction (D).",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nLỗi ở đây là sự mất thông tin (information loss) tại giai đoạn synthesis, vì vậy cách khắc phục là mang theo attribution (quy chiếu nguồn) dưới dạng structured data xuyên suốt (end-to-end): các subagent phát ra các ánh xạ claim-source (claim-source mapping) rõ ràng và agent synthesis bắt buộc phải bảo toàn và hợp nhất (merge) chúng. Điều này khớp với best practice của Anthropic về multi-agent là dùng structured output thay vì các quy ước tiền tố văn bản (text-prefix convention) mong manh (A), phân tích log sau sự việc (post-hoc log analysis) tốn kém (B), hoặc tái tạo bằng semantic-similarity không đáng tin cậy (D).",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-011",
    "originalId": "lnq-011",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p11",
    "difficulty": "application",
    "scenarioId": "s-ccaf-011",
    "questionEN": "Scenario: Multi-Agent Research System. After the web search and document analysis subagents complete their tasks, the coordinator needs to spawn the synthesis subagent to synthesize the findings. What is the correct approach for providing the synthesis subagent with the information it needs?",
    "question": "Tình huống: Multi-Agent Research System. Sau khi các subagent web search và document analysis hoàn thành tác vụ của chúng, coordinator cần spawn subagent synthesis để tổng hợp (synthesize) các phát hiện. Cách tiếp cận đúng để cung cấp cho subagent synthesis những thông tin nó cần là gì?",
    "optionsEN": [
      "A. Provide the subagent with tool definitions that allow it to request outputs from other subagents via callbacks",
      "B. Include the complete findings from both subagents directly in the synthesis subagent's prompt",
      "C. Pass reference identifiers and configure the subagent with read access to a shared memory store where other subagents deposited their results",
      "D. Spawn the subagent with only a brief task description, relying on automatic context inheritance from the coordinator"
    ],
    "options": [
      "A. Cung cấp cho subagent các định nghĩa tool cho phép nó yêu cầu output từ các subagent khác thông qua callback.",
      "B. Đưa toàn bộ phát hiện từ cả hai subagent trực tiếp vào prompt của synthesis subagent.",
      "C. Truyền các định danh tham chiếu (reference identifier) và cấu hình cho subagent quyền đọc vào một shared memory store nơi các subagent khác đã lưu kết quả của chúng.",
      "D. Sinh ra subagent chỉ với một mô tả task ngắn gọn, dựa vào việc kế thừa context tự động (automatic context inheritance) từ coordinator."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Best practice về multi-agent của Anthropic là để các subagent lưu trữ (deposit) toàn bộ output của chúng dưới dạng artifact trong external/shared storage và truyền các tham chiếu (reference) nhẹ, để subagent synthesis đọc trực tiếp các kết quả trước đó thay vì nhận các bản sao lossy hoặc nặng token (token-heavy) qua prompt. Callback giữa các subagent (A) và context inheritance (kế thừa context) tự động (D) không tồn tại trong kiến trúc này, và việc chèn (inline) toàn bộ findings vào prompt (B) làm phình to context và có nguy cơ mất thông tin.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Anthropic's multi-agent best practice is for subagents to deposit their full outputs as artifacts in external/shared storage and pass lightweight references, so the synthesis subagent reads the prior results directly rather than receiving lossy or token-heavy copies through prompts. Callbacks between subagents (A) and automatic context inheritance (D) don't exist in this architecture, and inlining complete findings into the prompt (B) bloats context and risks information loss.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nBest practice về multi-agent của Anthropic là để các subagent lưu trữ (deposit) toàn bộ output của chúng dưới dạng artifact trong external/shared storage và truyền các tham chiếu (reference) nhẹ, để subagent synthesis đọc trực tiếp các kết quả trước đó thay vì nhận các bản sao lossy hoặc nặng token (token-heavy) qua prompt. Callback giữa các subagent (A) và context inheritance (kế thừa context) tự động (D) không tồn tại trong kiến trúc này, và việc chèn (inline) toàn bộ findings vào prompt (B) làm phình to context và có nguy cơ mất thông tin.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-013",
    "originalId": "lnq-013",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p13",
    "difficulty": "application",
    "scenarioId": "s-ccaf-013",
    "questionEN": "Scenario: Multi-Agent Research — In production, you observe that simple fact-checking queries (e.g., \"What year was the Paris Climate Agreement signed?\") traverse all four subagents sequentially, consuming 40+ seconds and significant tokens per query. Complex comparative research benefits from the full pipeline. Your query distribution is diverse and evolving as users discover new applications. What's the most effective approach to optimize for varying query complexity?",
    "question": "Tình huống: Multi-Agent Research — Trong production, bạn quan sát thấy các truy vấn kiểm tra sự kiện đơn giản (fact-checking query) (ví dụ: \"Hiệp định Paris về khí hậu được ký năm nào?\") đi qua cả bốn subagent một cách tuần tự, tiêu tốn hơn 40 giây và một lượng token đáng kể cho mỗi truy vấn. Các nghiên cứu so sánh phức tạp thì được hưởng lợi từ toàn bộ pipeline. Phân phối truy vấn (query distribution) của bạn đa dạng và đang thay đổi khi người dùng khám phá ra các ứng dụng mới. Cách tiếp cận hiệu quả nhất để tối ưu hóa cho độ phức tạp truy vấn khác nhau là gì?",
    "optionsEN": [
      "A. Create a fast-path for factual questions that bypasses subagents entirely, routing all other queries through the complete pipeline to ensure research thoroughness.",
      "B. Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined subagent combination.",
      "C. Train a query complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve.",
      "D. Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of query requirements."
    ],
    "options": [
      "A. Tạo một đường đi nhanh (fast-path) cho các câu hỏi mang tính sự kiện (factual question) bỏ qua hoàn toàn subagent, định tuyến tất cả các truy vấn khác qua toàn bộ pipeline để đảm bảo tính thấu đáo của nghiên cứu.",
      "B. Triển khai routing dựa trên mẫu (pattern-based routing) phân loại truy vấn theo cấu trúc (một sự kiện đơn lẻ so với so sánh so với phân tích) và ánh xạ mỗi loại đến một tổ hợp subagent định trước.",
      "C. Huấn luyện một bộ phân loại độ phức tạp truy vấn (query complexity classifier) trên dữ liệu lịch sử đã gán nhãn để dự đoán tổ hợp subagent tối ưu, huấn luyện lại định kỳ khi các mẫu truy vấn thay đổi.",
      "D. Để coordinator phân tích mỗi truy vấn và quyết định một cách động (dynamically) nên gọi subagent nào dựa trên đánh giá của nó về yêu cầu của truy vấn."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Hướng dẫn nghiên cứu multi-agent của Anthropic khuyến nghị để agent lead/orchestrator điều chỉnh mức độ nỗ lực (effort) theo độ phức tạp của truy vấn, quyết định một cách linh động (dynamically) số lượng và loại subagent nào cần gọi cho mỗi truy vấn. Các đường tắt tĩnh (static fast-path) (A), routing theo pattern lập trình cứng (hand-coded) (B), và một classifier đã huấn luyện (trained classifier) cần dữ liệu gán nhãn (labeled data) và việc huấn luyện lại (retraining) (C) đều sẽ thất bại khi phân phối truy vấn đa dạng và đang thay đổi, trong khi phán đoán dựa trên LLM (LLM-based judgment) của coordinator thích ứng một cách tự nhiên mà không cần bảo trì."
    ],
    "rationale": "Anthropic's multi-agent research guidance recommends having the lead/orchestrator agent scale effort to query complexity, dynamically deciding how many and which subagents to invoke per query. Static fast-paths (A), hand-coded pattern routing (B), and a trained classifier needing labeled data and retraining (C) all break down as the query distribution is diverse and evolving, whereas the coordinator's LLM-based judgment adapts naturally without maintenance.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nHướng dẫn nghiên cứu multi-agent của Anthropic khuyến nghị để agent lead/orchestrator điều chỉnh mức độ nỗ lực (effort) theo độ phức tạp của truy vấn, quyết định một cách linh động (dynamically) số lượng và loại subagent nào cần gọi cho mỗi truy vấn. Các đường tắt tĩnh (static fast-path) (A), routing theo pattern lập trình cứng (hand-coded) (B), và một classifier đã huấn luyện (trained classifier) cần dữ liệu gán nhãn (labeled data) và việc huấn luyện lại (retraining) (C) đều sẽ thất bại khi phân phối truy vấn đa dạng và đang thay đổi, trong khi phán đoán dựa trên LLM (LLM-based judgment) của coordinator thích ứng một cách tự nhiên mà không cần bảo trì.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-014",
    "originalId": "lnq-014",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p14",
    "difficulty": "application",
    "scenarioId": "s-ccaf-014",
    "questionEN": "The coordinator provides detailed step-by-step instructions to the web search subagent, specifying exact search queries, source priorities, and date filters. Production monitoring reveals three issues: (1) the subagent reports \"insufficient results\" rather than trying alternative approaches when pre-specified searches fail, (2) research quality drops for emerging topics that don't match expected patterns, and (3) the subagent rarely surfaces valuable tangential sources. What's the most effective way to improve subagent adaptability?",
    "question": "Coordinator cung cấp các chỉ dẫn chi tiết từng bước (step-by-step) cho subagent web search, quy định chính xác các câu truy vấn tìm kiếm (search query), thứ tự ưu tiên nguồn (source priority), và bộ lọc ngày tháng (date filter). Giám sát production cho thấy ba vấn đề: (1) subagent báo cáo \"kết quả không đủ\" (insufficient results) thay vì thử các cách tiếp cận khác khi các tìm kiếm được chỉ định trước thất bại, (2) chất lượng nghiên cứu giảm đối với các chủ đề mới nổi (emerging topic) không khớp với các pattern kỳ vọng, và (3) subagent hiếm khi phát hiện ra các nguồn liên quan gián tiếp (tangential source) có giá trị. Cách hiệu quả nhất để cải thiện khả năng thích ứng (adaptability) của subagent là gì?",
    "optionsEN": [
      "A. Specify research goals and quality criteria (coverage breadth, source diversity, recency) rather than procedural steps, letting the subagent determine its search strategy.",
      "B. Remove procedural details entirely, delegating with simple goals like \"research X thoroughly\" and relying on the subagent's general capabilities.",
      "C. Add explicit fallback directives to the detailed instructions: \"If specified searches yield fewer than N results, attempt alternative query formulations before reporting failure.\"",
      "D. Implement a topic classification step where the coordinator categorizes requests as \"well-defined\" or \"exploratory\" and uses different instruction styles for each category."
    ],
    "options": [
      "A. Chỉ định các mục tiêu nghiên cứu và tiêu chí chất lượng (độ bao phủ, sự đa dạng nguồn, tính mới) thay vì các bước quy trình, để subagent tự xác định chiến lược tìm kiếm của nó.",
      "B. Loại bỏ hoàn toàn các chi tiết quy trình, ủy quyền bằng các mục tiêu đơn giản như \"nghiên cứu X một cách kỹ lưỡng\" và dựa vào năng lực chung của subagent.",
      "C. Thêm các chỉ dẫn dự phòng (fallback directive) rõ ràng vào các instructions chi tiết: \"Nếu các tìm kiếm được chỉ định cho ra ít hơn N kết quả, hãy thử các cách diễn đạt query thay thế trước khi báo cáo thất bại.\"",
      "D. Triển khai một bước phân loại chủ đề, trong đó coordinator phân loại các yêu cầu là \"được xác định rõ\" (well-defined) hoặc \"mang tính khám phá\" (exploratory) và dùng phong cách instruction khác nhau cho mỗi loại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Hướng dẫn về agent và nghiên cứu multi-agent của Anthropic khuyến nghị delegate (ủy quyền) với các mục tiêu rõ ràng và tiêu chí thành công/chất lượng (success/quality criteria) thay vì các kịch bản quy trình mang tính áp đặt (prescriptive procedural script), để cho subagent có năng lực tự điều chỉnh chiến lược tìm kiếm của riêng nó — điều này khắc phục trực tiếp cả ba lỗi được quan sát thấy. Phương án B loại bỏ hoàn toàn hướng dẫn cần thiết (delegation thiếu chỉ định — under-specified delegation — là một failure mode đã biết), C chỉ vá lỗi (1), còn D thêm sự phức tạp cho coordinator trong khi vẫn giữ cách tiếp cận kịch bản cứng nhắc (brittle scripted approach).",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Anthropic's agent and multi-agent research guidance recommends delegating with clear objectives and success/quality criteria rather than prescriptive procedural scripts, letting the capable subagent adapt its own search strategy — which directly fixes all three observed failures. Option B removes necessary guidance entirely (under-specified delegation is a known failure mode), C patches only failure (1), and D adds coordinator complexity while keeping the brittle scripted approach.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nHướng dẫn về agent và nghiên cứu multi-agent của Anthropic khuyến nghị delegate (ủy quyền) với các mục tiêu rõ ràng và tiêu chí thành công/chất lượng (success/quality criteria) thay vì các kịch bản quy trình mang tính áp đặt (prescriptive procedural script), để cho subagent có năng lực tự điều chỉnh chiến lược tìm kiếm của riêng nó — điều này khắc phục trực tiếp cả ba lỗi được quan sát thấy. Phương án B loại bỏ hoàn toàn hướng dẫn cần thiết (delegation thiếu chỉ định — under-specified delegation — là một failure mode đã biết), C chỉ vá lỗi (1), còn D thêm sự phức tạp cho coordinator trong khi vẫn giữ cách tiếp cận kịch bản cứng nhắc (brittle scripted approach).",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-017",
    "originalId": "lnq-017",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p17",
    "difficulty": "application",
    "scenarioId": "s-ccaf-017",
    "questionEN": "Scenario: Multi-Agent Research System. Production monitoring shows that follow-up queries like \"summarize what we learned about market trends\" consistently take 40+ seconds. Investigation reveals the coordinator spawns the synthesis subagent for each summarization request, passing 80K+ tokens of accumulated findings. The coordinator already has these findings in its context from orchestrating the research. What's the most effective way to improve response time for these follow-up summaries?",
    "question": "Tình huống: Multi-Agent Research System. Giám sát production cho thấy các truy vấn tiếp nối (follow-up query) như \"tóm tắt những gì chúng ta đã tìm hiểu được về xu hướng thị trường\" liên tục mất hơn 40 giây. Điều tra cho thấy coordinator spawn subagent synthesis cho mỗi yêu cầu tóm tắt, truyền vào hơn 80K token các phát hiện đã tích lũy (accumulated findings). Coordinator đã có sẵn các phát hiện này trong context của nó từ việc điều phối (orchestrate) nghiên cứu. Cách hiệu quả nhất để cải thiện thời gian phản hồi cho các bản tóm tắt tiếp nối này là gì?",
    "optionsEN": [
      "A. Pre-generate and cache summaries at multiple granularities whenever new findings accumulate.",
      "B. Enable prompt caching on the synthesis subagent to reduce the overhead of repeatedly transferring the same research findings.",
      "C. Have the coordinator handle straightforward summarization requests directly using its existing context, reserving subagent spawning for complex analytical tasks.",
      "D. Spawn the synthesis subagent with reduced context and have it request specific findings from the coordinator on-demand."
    ],
    "options": [
      "A. Tạo trước và cache các bản tóm tắt ở nhiều mức độ chi tiết (granularity) khác nhau mỗi khi có phát hiện mới được tích lũy.",
      "B. Bật prompt caching trên synthesis subagent để giảm chi phí phát sinh (overhead) do phải truyền lặp lại cùng một kết quả nghiên cứu.",
      "C. Để coordinator tự xử lý trực tiếp các yêu cầu tóm tắt đơn giản bằng context hiện có của nó, chỉ dành việc sinh subagent cho các task phân tích phức tạp.",
      "D. Sinh ra synthesis subagent với context bị rút gọn và để nó yêu cầu các phát hiện cụ thể từ coordinator theo yêu cầu (on-demand)."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Coordinator đã có sẵn toàn bộ findings trong context của nó, vì vậy việc spawn một subagent và truyền lại hơn 80K token cho mỗi bản tóm tắt hoàn toàn chỉ là chi phí phụ trội (overhead) về latency. Best practice về multi-agent của Anthropic là chỉ delegate cho subagent khi các context window riêng biệt hoặc tính song song (parallelism) mang lại giá trị; việc tóm tắt đơn giản nên được chính orchestrator xử lý trực tiếp, loại bỏ cả chi phí spawn lẫn việc truyền token.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "The coordinator already has all the findings in its context, so spawning a subagent and re-transferring 80K+ tokens per summary is pure latency overhead. Anthropic's multi-agent best practice is to delegate to subagents only when separate context windows or parallelism add value; simple summarization should be handled directly by the orchestrator, eliminating both the spawn cost and the token transfer.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nCoordinator đã có sẵn toàn bộ findings trong context của nó, vì vậy việc spawn một subagent và truyền lại hơn 80K token cho mỗi bản tóm tắt hoàn toàn chỉ là chi phí phụ trội (overhead) về latency. Best practice về multi-agent của Anthropic là chỉ delegate cho subagent khi các context window riêng biệt hoặc tính song song (parallelism) mang lại giá trị; việc tóm tắt đơn giản nên được chính orchestrator xử lý trực tiếp, loại bỏ cả chi phí spawn lẫn việc truyền token.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-018",
    "originalId": "lnq-018",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p9",
    "difficulty": "application",
    "scenarioId": "s-ccaf-018",
    "questionEN": "The synthesis agent receives summarized findings from the web search and document analysis agents, then passes a consolidated summary to the report generator. During testing, you discover the generated reports make factual claims without proper citations—the report generator cannot attribute statements to their original sources because that metadata was lost during the summarization steps. What's the most effective approach to ensure proper source attribution in the final reports?",
    "question": "Agent synthesis nhận các phát hiện đã được tóm tắt từ các agent web search và document analysis, sau đó truyền một bản tóm tắt hợp nhất (consolidated summary) cho report generator. Trong quá trình testing, bạn phát hiện ra rằng các báo cáo được tạo ra đưa ra các luận điểm thực tế (factual claim) mà không có trích dẫn phù hợp — report generator không thể quy chiếu (attribute) các phát biểu về nguồn gốc ban đầu của chúng vì metadata đó đã bị mất trong các bước tóm tắt. Cách tiếp cận hiệu quả nhất để đảm bảo việc quy chiếu nguồn (source attribution) đúng trong các báo cáo cuối cùng là gì?",
    "optionsEN": [
      "A. Instruct the synthesis agent to embed source references inline within its summary text using a consistent citation format.",
      "B. Have the report generator query the web search agent to re-locate sources for claims in the final report.",
      "C. Skip summarization and pass full raw outputs from web search and document analysis directly to the report generator.",
      "D. Have each agent output structured data separating content summaries from source metadata (URLs, document names, page numbers)."
    ],
    "options": [
      "A. Yêu cầu synthesis agent nhúng các tham chiếu nguồn (source reference) inline trong văn bản tóm tắt của nó, dùng một định dạng citation nhất quán.",
      "B. Để report generator truy vấn web search agent để định vị lại các nguồn cho các claim trong báo cáo cuối cùng.",
      "C. Bỏ qua bước summarization và truyền toàn bộ output thô (raw output) từ web search và document analysis trực tiếp cho report generator.",
      "D. Để mỗi agent xuất ra dữ liệu có cấu trúc, tách riêng phần tóm tắt nội dung khỏi metadata nguồn (URL, tên tài liệu, số trang)."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Structured output tách biệt rõ ràng nội dung tóm tắt khỏi metadata nguồn (URL, tên tài liệu, số trang) đảm bảo nguồn gốc (provenance) được giữ nguyên qua mọi lần bàn giao (handoff) trong pipeline, đây là pattern được Anthropic khuyến nghị cho luồng dữ liệu (data flow) multi-agent. Trích dẫn nội tuyến (inline citation) trong văn bản tự do (A) dễ bị mất hoặc làm sai lệch trong quá trình tóm tắt ở các bước sau, việc xác định lại vị trí nguồn sau khi sự việc đã xảy ra (re-locating sources after the fact) (B) không đáng tin cậy và có thể quy chiếu sai luận điểm, còn việc truyền các output thô (C) làm mất đi mục đích của việc tóm tắt và làm phình to context của report generator."
    ],
    "rationale": "Structured outputs that explicitly separate summarized content from source metadata (URLs, document names, page numbers) guarantee provenance survives every handoff in the pipeline, which is the Anthropic-recommended pattern for multi-agent data flow. Inline citations in free text (A) are easily lost or mangled during downstream summarization, re-locating sources after the fact (B) is unreliable and can mis-attribute claims, and passing raw outputs (C) defeats the purpose of summarization and bloats the report generator's context.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nStructured output tách biệt rõ ràng nội dung tóm tắt khỏi metadata nguồn (URL, tên tài liệu, số trang) đảm bảo nguồn gốc (provenance) được giữ nguyên qua mọi lần bàn giao (handoff) trong pipeline, đây là pattern được Anthropic khuyến nghị cho luồng dữ liệu (data flow) multi-agent. Trích dẫn nội tuyến (inline citation) trong văn bản tự do (A) dễ bị mất hoặc làm sai lệch trong quá trình tóm tắt ở các bước sau, việc xác định lại vị trí nguồn sau khi sự việc đã xảy ra (re-locating sources after the fact) (B) không đáng tin cậy và có thể quy chiếu sai luận điểm, còn việc truyền các output thô (C) làm mất đi mục đích của việc tóm tắt và làm phình to context của report generator.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-020",
    "originalId": "lnq-020",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p19",
    "difficulty": "application",
    "scenarioId": "s-ccaf-020",
    "questionEN": "The web search agent has gathered several relevant sources for a research topic. The document analysis agent now needs to examine these sources. How does information typically flow between these two specialized subagents?",
    "question": "Agent web search đã thu thập được một số nguồn liên quan cho một chủ đề nghiên cứu. Agent document analysis giờ cần xem xét các nguồn này. Thông tin thường chảy (flow) giữa hai subagent chuyên biệt này như thế nào?",
    "optionsEN": [
      "A. The agents communicate through an event-driven message queue, with the document analysis agent subscribing to web search completion events.",
      "B. The web search agent directly invokes the document analysis agent, passing the discovered sources as parameters.",
      "C. The coordinator agent receives the web search agent's output and includes relevant findings in the prompt when invoking the document analysis agent.",
      "D. Both agents access a shared memory store where the web search agent writes findings and the document analysis agent reads them."
    ],
    "options": [
      "A. Các agent giao tiếp thông qua một message queue theo hướng sự kiện (event-driven), với document analysis agent đăng ký (subscribing) nhận các sự kiện hoàn tất của web search.",
      "B. Web search agent gọi trực tiếp document analysis agent, truyền các nguồn đã phát hiện được như các tham số.",
      "C. Coordinator agent nhận output của web search agent và đưa các phát hiện liên quan vào prompt khi gọi document analysis agent.",
      "D. Cả hai agent cùng truy cập một shared memory store, trong đó web search agent ghi các phát hiện và document analysis agent đọc chúng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Trong pattern orchestrator-worker, coordinator là trung tâm (hub): nó thu thập output của mỗi subagent và chủ động chuyển tiếp (forward) các phần liên quan vào prompt của subagent tiếp theo. Event bus (A) không phải là một phần của mô hình subagent của Claude, các subagent không thể trực tiếp gọi các subagent anh em (sibling subagent) (B) vì điều đó sẽ ràng buộc chúng quá chặt (tightly couple) và phá vỡ pattern orchestrator, còn một kho lưu trữ dùng chung (shared store) (D) có thể được thêm vào như một tối ưu hóa nhưng không phải cách các subagent thường giao tiếp và gây ra vấn đề đọc dữ liệu cũ (stale-read).",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "In an orchestrator-worker pattern the coordinator is the hub: it collects each subagent's output and explicitly forwards the relevant parts into the next subagent's prompt. Event buses (A) aren't part of the Claude subagent model, subagents can't directly call sibling subagents (B) since that would tightly couple them and defeat the orchestrator pattern, and a shared store (D) can be layered in as an optimization but isn't how subagents typically communicate and introduces stale-read problems.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTrong pattern orchestrator-worker, coordinator là trung tâm (hub): nó thu thập output của mỗi subagent và chủ động chuyển tiếp (forward) các phần liên quan vào prompt của subagent tiếp theo. Event bus (A) không phải là một phần của mô hình subagent của Claude, các subagent không thể trực tiếp gọi các subagent anh em (sibling subagent) (B) vì điều đó sẽ ràng buộc chúng quá chặt (tightly couple) và phá vỡ pattern orchestrator, còn một kho lưu trữ dùng chung (shared store) (D) có thể được thêm vào như một tối ưu hóa nhưng không phải cách các subagent thường giao tiếp và gây ra vấn đề đọc dữ liệu cũ (stale-read).",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-022",
    "originalId": "lnq-022",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p21",
    "difficulty": "application",
    "scenarioId": "s-ccaf-022",
    "questionEN": "Production reviews reveal inconsistent handling of uncertainty in final reports. Sometimes conflicting subagent findings are synthesized into a single confident statement (losing nuance), while other times reports over-hedge with excessive qualifications (becoming unhelpful). When the web search agent returns \"industry analysts estimate $50B market size (methodology varies)\" and the document analysis agent returns \"peer-reviewed study estimates $35B (±$7B, 95% CI),\" the coordinator either picks one arbitrarily or produces vague statements like \"the market may be $35B−$50B depending on factors.\" What systematic approach best addresses this?",
    "question": "Các đánh giá production cho thấy việc xử lý sự không chắc chắn (uncertainty) trong các báo cáo cuối cùng không nhất quán. Đôi khi các phát hiện mâu thuẫn nhau từ các subagent được tổng hợp thành một phát biểu chắc chắn duy nhất (làm mất đi sắc thái - nuance), trong khi những lúc khác báo cáo lại rào đón (hedge) quá mức với quá nhiều điều kiện (trở nên vô ích). Khi web search agent trả về \"các nhà phân tích ngành ước tính quy mô thị trường $50B (phương pháp luận khác nhau)\" và document analysis agent trả về \"nghiên cứu bình duyệt (peer-reviewed) ước tính $35B (±$7B, khoảng tin cậy 95%)\", coordinator hoặc chọn một cách tùy tiện hoặc đưa ra các phát biểu mơ hồ như \"thị trường có thể là $35B−$50B tùy thuộc vào các yếu tố.\" Cách tiếp cận có hệ thống nào giải quyết tốt nhất vấn đề này?",
    "optionsEN": [
      "A. Configure subagents to only report findings meeting a high-confidence threshold, filtering uncertain information before it reaches the coordinator.",
      "B. Implement a confidence calibration layer that normalizes subagent uncertainty expressions to standardized probability scores (0.0-1.0), then weight-average findings by their calibrated confidence.",
      "C. Instruct the synthesis agent to structure reports with explicit sections distinguishing well-established findings from contested ones, preserving original source characterizations and methodological context.",
      "D. Add a verification subagent that cross-references findings across sources, only passing claims to synthesis that are corroborated by at least two independent sources."
    ],
    "options": [
      "A. Cấu hình các subagent chỉ báo cáo những phát hiện đạt ngưỡng độ tin cậy cao (high-confidence threshold), lọc bỏ thông tin không chắc chắn trước khi nó đến được coordinator.",
      "B. Triển khai một lớp hiệu chỉnh độ tin cậy (confidence calibration layer) để chuẩn hóa các biểu đạt không chắc chắn của subagent thành điểm xác suất chuẩn hóa (0.0-1.0), sau đó tính trung bình có trọng số (weight-average) các phát hiện theo độ tin cậy đã hiệu chỉnh.",
      "C. Yêu cầu synthesis agent cấu trúc báo cáo với các phần rõ ràng phân biệt những phát hiện đã được xác lập vững chắc với những phát hiện còn gây tranh cãi, đồng thời giữ nguyên cách mô tả nguồn gốc ban đầu và bối cảnh phương pháp luận.",
      "D. Thêm một verification subagent để đối chiếu chéo các phát hiện giữa các nguồn, chỉ chuyển sang synthesis những nhận định (claims) được xác nhận bởi ít nhất hai nguồn độc lập."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Cấu trúc báo cáo giữ lại bối cảnh phương pháp luận (methodological context) và tách biệt các nhận định đã được xác lập với các nhận định còn tranh cãi là cách để đạt được sắc thái (nuance) mà không rào đón quá mức. Việc lọc bỏ (A) vứt đi các bằng chứng hữu ích nhưng không chắc chắn, việc gộp các phương pháp luận khác nhau thành một con số trung bình (B) phá hủy chính sự khác biệt về phương pháp luận vốn là trọng tâm của vấn đề, và yêu cầu tối thiểu hai nguồn (D) loại bỏ các phát hiện hợp lệ chỉ có một nguồn và không giải quyết được các ước tính thực sự mâu thuẫn nhau.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Report structure that keeps methodological context and separates settled vs. contested claims is how you get nuance without over-hedging. Filtering (A) throws away useful-but-uncertain evidence, collapsing different methodologies into one averaged number (B) destroys the methodological difference that's the whole point, and a two-source minimum (D) drops legitimate single-source findings and doesn't resolve genuinely conflicting estimates.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nCấu trúc báo cáo giữ lại bối cảnh phương pháp luận (methodological context) và tách biệt các nhận định đã được xác lập với các nhận định còn tranh cãi là cách để đạt được sắc thái (nuance) mà không rào đón quá mức. Việc lọc bỏ (A) vứt đi các bằng chứng hữu ích nhưng không chắc chắn, việc gộp các phương pháp luận khác nhau thành một con số trung bình (B) phá hủy chính sự khác biệt về phương pháp luận vốn là trọng tâm của vấn đề, và yêu cầu tối thiểu hai nguồn (D) loại bỏ các phát hiện hợp lệ chỉ có một nguồn và không giải quyết được các ước tính thực sự mâu thuẫn nhau.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-025",
    "originalId": "lnq-104",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "d1-p15",
    "difficulty": "application",
    "scenarioId": "s-ccaf-090",
    "questionEN": "Your agent has a log_workout tool that accepts exercise_type (string), value (number), and measurement (string). Production monitoring shows the agent frequently passes mismatched combinations-using measurement: \"reps\" for cardio exercises like running, or measurement: \"miles\" for strength exercises like bench press. Your exercises naturally divide into two categories: cardio (measured in time or distance) and strength (measured in reps and sets). 23% of tool calls have invalid combinations. What approach would most effectively reduce these errors?",
    "question": "Agent của bạn có một tool log_workout nhận exercise_type (string), value (number), và measurement (string). Giám sát production cho thấy agent thường xuyên truyền vào các tổ hợp không khớp — dùng measurement: \"reps\" cho các bài cardio như chạy bộ, hoặc measurement: \"miles\" cho các bài strength như bench press. Các bài tập của bạn tự nhiên chia thành hai nhóm: cardio (đo bằng thời gian hoặc quãng đường) và strength (đo bằng reps và sets). 23% số lần gọi tool có tổ hợp không hợp lệ. Cách tiếp cận nào sẽ giảm thiểu các lỗi này hiệu quả nhất?",
    "optionsEN": [
      "A. Implement server-side validation returning descriptive errors for invalid combinations, allowing the agent to retry with corrections.",
      "B. Add enum constraints on measurement limiting values to \"minutes\", \"miles\", \"reps\", or \"sets\" to prevent arbitrary measurement strings.",
      "C. Add explicit examples to the tool description showing valid combinations (e.g., \"For running: use minutes or miles. For push-ups: use reps\") with constraints for each exercise category.",
      "D. Split into log_cardio_workout (with duration_minutes or distance_miles parameters) and log_strength_workout (with reps and sets parameters)."
    ],
    "options": [
      "A. Triển khai validation phía server, trả về các thông báo lỗi mô tả rõ ràng cho các tổ hợp không hợp lệ, cho phép agent retry với các chỉnh sửa (corrections).",
      "B. Thêm ràng buộc enum lên measurement, giới hạn giá trị chỉ còn \"minutes\", \"miles\", \"reps\", hoặc \"sets\" để ngăn các chuỗi (string) measurement tùy ý.",
      "C. Thêm các ví dụ rõ ràng vào tool description để minh họa các tổ hợp hợp lệ (ví dụ: \"Với chạy bộ: dùng minutes hoặc miles. Với hít đất (push-ups): dùng reps\") kèm ràng buộc cho từng loại bài tập (exercise category).",
      "D. Tách thành log_cardio_workout (với tham số duration_minutes hoặc distance_miles) và log_strength_workout (với tham số reps và sets)."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế."
    ],
    "rationale": "Option D is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-026",
    "originalId": "lnq-129",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "D1 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-107",
    "questionEN": "Users frequently send ambiguous requests like \"book a venue for the party\" without specifying date, guest count, or budget. Your evaluation shows the assistant asks an average of 4 questions before taking any action, causing 35% of users to abandon mid-conversation. However, when you reduce questions, users sometimes receive recommendations that don't preferences. What's the most effective approach to improve this trade-off?",
    "question": "Người dùng thường xuyên gửi các yêu cầu mơ hồ (ambiguous) như \"đặt một địa điểm cho bữa tiệc\" mà không nêu rõ ngày, số lượng khách, hay ngân sách. Kết quả evaluation của bạn cho thấy assistant hỏi trung bình 4 câu hỏi trước khi thực hiện bất kỳ hành động nào, khiến 35% người dùng bỏ cuộc giữa chừng cuộc hội thoại. Tuy nhiên, khi bạn giảm số câu hỏi, đôi khi người dùng lại nhận được các đề xuất không phù hợp với sở thích của họ. Đâu là cách tiếp cận hiệu quả nhất để cải thiện sự đánh đổi (trade-off) này?",
    "optionsEN": [
      "A. Implement a structured intake form that collects all required parameters (date, guest count, budget, venue type) upfront before the assistant begins providing any recommendation",
      "B. Configure the assistant to proceed with reasonable defaults (medium sized venue, next weekend, moderate budget) without explicitly stating these assumptions, allowing users to corrections if results don't match expectations",
      "C. Instruct the assistant to state explicit assumptions based on conversation status proceed with recommendations while inviting corrections, and reserve clarifying questions only Irreversible actions like confirming bookings.",
      "D. Configure the assistant to consolidate all clarifying questions into a single compound question (e.g., \"What date, guest count, and budget are you considering?\") to reduce the total"
    ],
    "options": [
      "A. Triển khai một biểu mẫu thu thập thông tin có cấu trúc, thu thập trước tất cả các tham số cần thiết (ngày, số lượng khách, ngân sách, loại địa điểm) trước khi assistant bắt đầu đưa ra bất kỳ đề xuất nào.",
      "B. Cấu hình assistant để tiếp tục với các giá trị mặc định hợp lý (địa điểm cỡ trung bình, cuối tuần tới, ngân sách vừa phải) mà không nêu rõ các giả định này, cho phép user điều chỉnh nếu kết quả không khớp với mong đợi.",
      "C. Hướng dẫn assistant nêu rõ các giả định dựa trên tình trạng cuộc trò chuyện, tiếp tục đưa ra đề xuất trong khi mời user điều chỉnh, và chỉ dành các câu hỏi làm rõ (clarifying questions) cho những hành động không thể đảo ngược (irreversible) như xác nhận đặt chỗ.",
      "D. Cấu hình assistant để gộp tất cả các câu hỏi làm rõ thành một câu hỏi tổng hợp duy nhất (ví dụ: \"Bạn đang cân nhắc ngày nào, số lượng khách bao nhiêu, và ngân sách ra sao?\") nhằm giảm tổng số câu hỏi."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-030",
    "originalId": "lnq-190",
    "source": "LNQuyen",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "D1 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-138",
    "questionEN": "You're implementing a new payment processing module that must follow your project's established patterns for database transactions, error handling, and audit logging. You've identified three existing modules that exemplify these patterns: db_utils.py, error_handlers.py, and audit_logger.py. This is a one-off integration task—these patterns are well-documented in your team wiki and don't need additional project-level documentation. What's the most effective approach?",
    "question": "Bạn đang triển khai một module xử lý thanh toán mới, module này phải tuân theo các mẫu (pattern) đã được thiết lập của dự án cho các giao dịch cơ sở dữ liệu, xử lý lỗi, và ghi log kiểm toán (audit logging). Bạn đã xác định được ba module hiện có thể hiện rõ các pattern này: db_utils.py, error_handlers.py, và audit_logger.py. Đây là một tác vụ tích hợp chỉ làm một lần (one-off) — các pattern này đã được ghi chép đầy đủ trong wiki của nhóm và không cần thêm tài liệu ở cấp dự án. Đâu là cách tiếp cận hiệu quả nhất?",
    "optionsEN": [
      "A. Describe the patterns from the three modules in natural language in your prompt, explaining the transaction handling approach, error format, and logging conventions Claude should follow.",
      "B. Use @references to include the three modules directly in your prompt, giving Claude concrete code examples of the patterns to follow.",
      "C. Ask Claude to explore your codebase to find and understand the transaction, error handling, and logging patterns before generating the new module.",
      "D. Add documentation of each pattern to your CLAUDE.md file, establishing them as project conventions that Claude will apply automatically."
    ],
    "options": [
      "A. Mô tả các pattern từ ba module bằng ngôn ngữ tự nhiên trong prompt của bạn, giải thích cách xử lý transaction, định dạng lỗi, và các quy ước logging mà Claude nên tuân theo.",
      "B. Dùng @references để đưa trực tiếp ba module vào prompt của bạn, cung cấp cho Claude các ví dụ code cụ thể về các pattern cần tuân theo.",
      "C. Yêu cầu Claude khảo sát codebase của bạn để tìm và hiểu các pattern về transaction, xử lý lỗi, và logging trước khi tạo module mới.",
      "D. Thêm tài liệu về mỗi pattern vào file CLAUDE.md của bạn, thiết lập chúng như các quy ước dự án mà Claude sẽ tự động áp dụng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-033",
    "originalId": "vie-003",
    "source": "VieHub",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / attention-dilution",
    "difficulty": "application",
    "scenarioId": "s-ccaf-158",
    "questionEN": "Situation: A pull request changes 14 files in an inventory tracking module. A single-pass review of all files produces inconsistent results: detailed comments for some files but superficial ones for others, missed obvious bugs, and contradictory feedback. How should you restructure the review?",
    "question": "Tình huống: Một pull request thay đổi 14 file trong module theo dõi kho. Việc review tất cả file trong một lượt duy nhất (single-pass) mang lại kết quả không nhất quán: nhận xét rất chi tiết ở một số file đầu nhưng lại sơ sài ở các file sau, bỏ sót các bug hiển nhiên và đưa ra phản hồi mâu thuẫn nhau. Bạn nên tái cấu trúc quy trình review như thế nào?",
    "optionsEN": [
      "A. Split into focused passes: analyze each file individually for local issues, then run a separate integration pass for cross-file data flows",
      "B. Require developers to split large PRs into submissions of 3–4 files",
      "C. Switch to a higher-tier model with a larger context window to review all 14 files in one pass",
      "D. Run three independent full-PR review passes and report only issues found in at least two runs"
    ],
    "options": [
      "A. Chia thành các pass tập trung: phân tích riêng từng file để phát hiện lỗi cục bộ, sau đó chạy một integration pass riêng để kiểm tra luồng dữ liệu giữa các file.",
      "B. Yêu cầu các lập trình viên chia nhỏ PR thành các lần submit từ 3–4 file.",
      "C. Chuyển sang dùng model tier cao hơn với context window lớn hơn để review cả 14 file trong một lần.",
      "D. Chạy ba lượt review toàn bộ PR độc lập và chỉ báo cáo các vấn đề xuất hiện trong ít nhất hai lần chạy."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Kiến trúc chia nhỏ thành các pass tập trung (focused passes) giải quyết trực tiếp nguyên nhân gốc rễ là hiện tượng phân tán chú ý (attention dilution) khi xử lý quá nhiều file cùng lúc. Context window lớn hơn (C) không giúp cải thiện chất lượng chú ý của model khi tải lượng thông tin quá lớn.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Focused passes directly address the root cause—attention dilution when processing many files at once. Larger context windows (C) do not fix attention quality.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Rationale (VieHub):\nFocused passes directly address the root cause—attention dilution when processing many files at once. Larger context windows (C) do not fix attention quality.\n\n🔍 Phân tích chi tiết (Vietnamese):\nKiến trúc chia nhỏ thành các pass tập trung (focused passes) giải quyết trực tiếp nguyên nhân gốc rễ là hiện tượng phân tán chú ý (attention dilution) khi xử lý quá nhiều file cùng lúc. Context window lớn hơn (C) không giúp cải thiện chất lượng chú ý của model khi tải lượng thông tin quá lớn.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-041",
    "originalId": "vie-022",
    "source": "VieHub",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / local-recovery",
    "difficulty": "application",
    "scenarioId": "s-ccaf-176",
    "questionEN": "Situation: A document analysis subagent frequently fails when processing PDF files: corrupted sections, password-protection, or large files. Currently, any exception immediately terminates the subagent and returns an error to the coordinator. What architectural improvement is most effective?",
    "question": "Tình huống: Một document analysis subagent thường xuyên gặp lỗi khi đọc file PDF: file hỏng, có mật khẩu bảo vệ hoặc file quá lớn. Hiện tại, bất kỳ ngoại lệ nào cũng lập tức dừng subagent và trả lỗi về cho coordinator. Cải tiến kiến trúc nào hiệu quả nhất?",
    "optionsEN": [
      "A. Create a dedicated error-handling agent that monitors all failures via a shared queue.",
      "B. Configure the subagent to always return partial results with a success status.",
      "C. Make the coordinator validate all documents before sending them to the subagent.",
      "D. Implement local recovery in the subagent for transient failures and escalate to the coordinator only errors it cannot resolve."
    ],
    "options": [
      "A. Tạo một error-handling agent chuyên dụng giám sát lỗi qua một hàng đợi chung.",
      "B. Cấu hình subagent luôn trả về kết quả từng phần với trạng thái thành công.",
      "C. Bắt coordinator phải kiểm tra xác thực toàn bộ tài liệu trước khi gửi cho subagent.",
      "D. Triển khai cơ chế tự phục hồi cục bộ (local recovery) trong subagent đối với các lỗi tạm thời và chỉ chuyển tiếp lên coordinator các lỗi không thể tự giải quyết."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Nguyên tắc kiến trúc là xử lý lỗi ở cấp thấp nhất có khả năng giải quyết nó. Cơ chế phục hồi cục bộ giảm tải cho coordinator, đồng thời bảo toàn tiến độ công việc đã làm trước khi phải báo cáo lỗi nghiêm trọng."
    ],
    "rationale": "Handle errors at the lowest level capable of resolving them. Local recovery reduces coordinator workload while still escalating truly unrecoverable issues with full context and partial progress.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Rationale (VieHub):\nHandle errors at the lowest level capable of resolving them. Local recovery reduces coordinator workload while still escalating truly unrecoverable issues with full context and partial progress.\n\n🔍 Phân tích chi tiết (Vietnamese):\nNguyên tắc kiến trúc là xử lý lỗi ở cấp thấp nhất có khả năng giải quyết nó. Cơ chế phục hồi cục bộ giảm tải cho coordinator, đồng thời bảo toàn tiến độ công việc đã làm trước khi phải báo cáo lỗi nghiêm trọng.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-042",
    "originalId": "vie-024",
    "source": "VieHub",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / coverage-annotations",
    "difficulty": "application",
    "scenarioId": "s-ccaf-177",
    "questionEN": "Situation: The web-search subagent returns results for only 3 of 5 requested source categories (news archives and social feeds time out). The document analysis subagent successfully processes all provided documents. The synthesis subagent must produce a summary from mixed-quality upstream inputs. Which error-propagation strategy is most effective?",
    "question": "Tình huống: Web-search subagent chỉ trả về kết quả cho 3 trên 5 nhóm nguồn được yêu cầu (kho lưu trữ tin tức và mạng xã hội bị timeout). Document analysis subagent xử lý thành công toàn bộ tài liệu. Synthesis subagent phải tạo bản tóm tắt từ các đầu vào có chất lượng không đồng đều. Chiến lược lan truyền lỗi nào hiệu quả nhất?",
    "optionsEN": [
      "A. Continue synthesis using only successful sources and produce an output without mentioning missing data.",
      "B. The synthesis subagent returns an error to the coordinator, triggering a full retry or task failure.",
      "C. The synthesis subagent asks the coordinator to retry timed-out sources with a longer timeout.",
      "D. Structure the synthesis output with coverage annotations that indicate which conclusions are well-supported and where gaps exist."
    ],
    "options": [
      "A. Tiếp tục tổng hợp chỉ với các nguồn thành công và không đề cập đến dữ liệu bị thiếu.",
      "B. Synthesis subagent trả lỗi về cho coordinator, kích hoạt retry lại toàn bộ hoặc báo thất bại.",
      "C. Synthesis subagent yêu cầu coordinator thử lại các nguồn bị timeout với thời gian chờ dài hơn.",
      "D. Cấu trúc output của synthesis kèm theo các chú thích độ bao phủ (coverage annotations) chỉ rõ kết luận nào có cơ sở vững chắc và những điểm nào còn khoảng trống."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Chú thích độ bao phủ (coverage annotations) thực hiện cơ chế suy giảm mềm dẻo (graceful degradation) minh bạch, tận dụng giá trị công việc đã hoàn thành mà vẫn truyền đạt sự không chắc chắn để người dùng nắm rõ."
    ],
    "rationale": "Coverage annotations implement graceful degradation with transparency, preserving value from completed work while propagating uncertainty to enable informed decisions about confidence.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Rationale (VieHub):\nCoverage annotations implement graceful degradation with transparency, preserving value from completed work while propagating uncertainty to enable informed decisions about confidence.\n\n🔍 Phân tích chi tiết (Vietnamese):\nChú thích độ bao phủ (coverage annotations) thực hiện cơ chế suy giảm mềm dẻo (graceful degradation) minh bạch, tận dụng giá trị công việc đã hoàn thành mà vẫn truyền đạt sự không chắc chắn để người dùng nắm rõ.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-063",
    "originalId": "vie-102",
    "source": "VieHub",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / attention-dilution-passes",
    "difficulty": "application",
    "scenarioId": "s-ccaf-239",
    "questionEN": "A document analysis subagent frequently fails on PDFs (corrupted sections, password protection, hangs on large files). Every exception currently terminates the subagent immediately, forcing excessive coordinator involvement in routine error handling. What architectural improvement is most effective?",
    "question": "Một document analysis subagent thường xuyên gặp lỗi khi đọc các file PDF (phần nội dung bị hỏng, file có mật khẩu bảo vệ, hoặc treo trên file quá lớn). Hiện tại, mọi exception đều lập tức ngắt phiên làm việc của subagent, buộc coordinator phải can thiệp xử lý lỗi thủ công quá mức. Cải tiến kiến trúc nào mang lại hiệu quả cao nhất?",
    "optionsEN": [
      "A. Create a dedicated error-handling agent that monitors failures via a shared queue and restarts subagents directly",
      "B. Configure the subagent to always return partial results with a success status, embedding errors in metadata",
      "C. Make the coordinator pre-validate every document before sending it to the subagent",
      "D. Implement local recovery in the subagent for transient failures, escalating only unresolvable errors with attempted steps and partial results"
    ],
    "options": [
      "A. Tạo một error-handling agent chuyên trách giám sát lỗi qua một hàng đợi dùng chung và trực tiếp khởi động lại subagent.",
      "B. Cấu hình subagent luôn trả về kết quả từng phần với status thành công, và nhúng lỗi vào metadata.",
      "C. Bắt buộc coordinator phải kiểm tra xác thực trước mọi tài liệu trước khi gửi sang cho subagent.",
      "D. Triển khai cơ chế tự phục hồi cục bộ (local recovery) trong subagent đối với các lỗi tạm thời, và chỉ báo cáo lên coordinator những lỗi không thể tự giải quyết kèm theo các bước đã thử và kết quả từng phần."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Các pass tập trung giải quyết nguyên nhân gốc rễ — sự phân tán chú ý khi xử lý quá nhiều file cùng lúc — trong khi pass tích hợp riêng vẫn bắt được các vấn đề liên file."
    ],
    "rationale": "Handle errors at the lowest level capable of resolving them — local recovery reduces coordinator load while still surfacing truly unrecoverable issues with full context.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Rationale (EN):\nHandle errors at the lowest level capable of resolving them — local recovery reduces coordinator load while still surfacing truly unrecoverable issues with full context.\n\n🔍 Giải thích chi tiết (VI):\nXử lý lỗi ở cấp thấp nhất có đủ thẩm quyền và khả năng giải quyết — tự phục hồi cục bộ giúp giảm tải điều phối cho coordinator nhưng vẫn cung cấp đầy đủ ngữ cảnh đối với các lỗi nghiêm trọng thực sự.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "originalId": "q-1-2-002",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / coordinator",
    "difficulty": "application",
    "scenarioId": "s-q-1-2-002",
    "questionEN": "A consulting firm's multi-agent research system has a coordinator that always invokes the full pipeline of five subagents (web search, document analysis, data extraction, synthesis, and formatting) for every query, including simple factual lookups that only need web search. This adds unnecessary latency and cost. What is the correct architectural fix?",
    "question": "Hệ thống nghiên cứu của công ty tư vấn có coordinator luôn kích hoạt toàn bộ pipeline gồm 5 subagent (tìm kiếm web, phân tích tài liệu, trích xuất dữ liệu, tổng hợp và định dạng) cho mọi truy vấn, kể cả tra cứu thông tin đơn giản chỉ cần tìm kiếm web. Điều này gây lãng phí độ trễ và chi phí. Sửa đổi kiến trúc nào là đúng?",
    "optionsEN": [
      "A. Have the coordinator select which subagents to invoke per query, not always the full pipeline.",
      "B. Allow subagents to communicate directly with each other so they can skip unnecessary steps in the pipeline",
      "C. Add a caching layer so subagents that have no work to do return immediately",
      "D. Split into two separate systems: one for simple queries and one for complex queries"
    ],
    "options": [
      "A. Để coordinator tự chọn subagent cần kích hoạt theo từng truy vấn, thay vì luôn chạy toàn bộ pipeline.",
      "B. Cho phép các subagent giao tiếp trực tiếp với nhau để tự bỏ qua các bước không cần thiết trong pipeline.",
      "C. Thêm tầng caching để các subagent không có việc làm sẽ trả về kết quả ngay lập tức.",
      "D. Tách thành hai hệ thống riêng biệt: một cho truy vấn đơn giản và một cho truy vấn phức tạp."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): The coordinator should analyse query requirements and decide which subagents are needed. A simple factual lookup only needs the web search agent, not the full five-agent pipeline. Dynamic selection reduces latency and cost for straightforward requests.",
      "Option B ❌ (SAI): Direct subagent communication violates the hub-and-spoke architecture. All communication must flow through the coordinator. The fix is smarter coordinator routing, not bypassing the coordinator.",
      "Option C ❌ (SAI): Caching does not address the architectural issue. Invoking subagents that are not needed adds API call overhead and latency regardless of whether results are cached. The coordinator should not invoke unnecessary subagents in the first place.",
      "Option D ❌ (SAI): Maintaining two separate systems creates unnecessary complexity. The coordinator's role is precisely to analyse query requirements and make routing decisions. A single coordinator with dynamic selection handles both cases."
    ],
    "rationale": "The coordinator should analyse query requirements and decide which subagents are needed. A simple factual lookup only needs the web search agent, not the full five-agent pipeline. Dynamic selection reduces latency and cost for straightforward requests.",
    "explanation": "Coordinator nên phân tích yêu cầu của truy vấn để quyết định những subagent nào là cần thiết. Tra cứu thực tế đơn giản chỉ cần tìm kiếm web, không cần gọi 4 subagent còn lại.",
    "sources": [
      {
        "label": "Lesson 1.2: Multi-Agent Orchestration (Coordinator responsibilities)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns#coordinator-responsibilities"
      }
    ],
    "id": "ccaf-084"
  },
  {
    "originalId": "q-1-2-005",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / coordinator",
    "difficulty": "application",
    "scenarioId": "s-q-1-2-005",
    "questionEN": "A research coordinator spawns 4 subagents to investigate different aspects of a market analysis. Agent A fails with an API error, Agent B returns partial results (3 of 5 requested data points), and Agents C and D return complete results. The final report is due in 2 hours. What should the coordinator do?",
    "question": "Coordinator nghiên cứu kích hoạt 4 subagent để điều tra các khía cạnh khác nhau của một phân tích thị trường. Agent A gặp lỗi API, Agent B trả về kết quả một phần (3/5 điểm dữ liệu yêu cầu), còn Agent C và D trả về kết quả đầy đủ. Báo cáo cuối cùng phải nộp trong 2 giờ. Coordinator nên xử lý như thế nào?",
    "optionsEN": [
      "A. Retry Agent A, discard Agent B's partial results as unreliable, and wait for both agents to return fully complete data before writing the report.",
      "B. Proceed with only Agents C and D's results and produce the report without the data from Agents A and B",
      "C. Retry Agent A, incorporate Agent B's partial results, flag B's missing data points as gaps, and synthesise from all available results.",
      "D. Terminate all agents and restart the entire investigation from scratch with a simplified scope"
    ],
    "options": [
      "A. Thử lại Agent A, loại bỏ kết quả một phần của Agent B vì không đáng tin, và chờ cả hai agent hoàn thành trước khi viết báo cáo.",
      "B. Chỉ tiếp tục với kết quả của Agent C và D và tạo báo cáo mà không cần dữ liệu từ A và B.",
      "C. Thử lại Agent A, tích hợp kết quả một phần của Agent B, đánh dấu các điểm dữ liệu còn thiếu của B là lỗ hổng cần lưu ý, và tổng hợp từ tất cả kết quả có được.",
      "D. Hủy bỏ toàn bộ các agent và khởi động lại cuộc điều tra từ đầu với phạm vi thu hẹp."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Discarding Agent B's partial results wastes valid data, and waiting for full completion ignores the two-hour deadline. The coordinator should use what is available while attempting to fill gaps.",
      "Option B ❌ (SAI): This unnecessarily discards Agent B's partial results and abandons Agent A's scope entirely. A thorough coordinator should attempt recovery while incorporating all available data.",
      "Option C ✅ (ĐÚNG): The coordinator should maximise data utilisation: retry the failed agent (A), incorporate partial results from B while flagging the 2 missing data points as known gaps, and synthesise all available results from A (after retry), B (partial), C, and D. Explicit gap annotations ensure the report is transparent about its completeness.",
      "Option D ❌ (SAI): Restarting discards the complete results from Agents C and D and the partial results from Agent B. This wastes time and compute when most of the investigation has already succeeded."
    ],
    "rationale": "The coordinator should maximise data utilisation: retry the failed agent (A), incorporate partial results from B while flagging the 2 missing data points as known gaps, and synthesise all available results from A (after retry), B (partial), C, and D. Explicit gap annotations ensure the report is transparent about its completeness.",
    "explanation": "Coordinator cần tối đa hóa việc tận dụng dữ liệu: retry agent bị lỗi (A), kết hợp kết quả từng phần của B có gắn cờ cảnh báo khoảng trống, và tiến hành tổng hợp ngay để kịp deadline.",
    "sources": [
      {
        "label": "Lesson 1.2: Multi-Agent Orchestration (Coordinator responsibilities)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns#coordinator-responsibilities"
      },
      {
        "label": "Lesson 1.7: Session State and Resumption (Recovering from partial results)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption#the-stale-context-problem"
      }
    ],
    "id": "ccaf-086"
  },
  {
    "originalId": "q-1-2-007",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / context-passing",
    "difficulty": "application",
    "scenarioId": "s-q-1-2-007",
    "questionEN": "A team runs a coordinator agent that delegates refactoring work to three specialist subagents: a schema-migration agent, an API-layer agent, and a test-update agent. The test-update agent frequently produces tests that reference database schemas the schema-migration agent has already renamed. The subagents do not communicate with each other. What is the root cause?",
    "question": "Coordinator ủy quyền refactor cho 3 subagent: migration database, cập nhật tầng API và cập nhật unit test. Subagent test thường xuyên viết test dựa trên tên bảng cũ mà subagent migration đã đổi tên. Các subagent không giao tiếp với nhau. Nguyên nhân gốc rễ là gì?",
    "optionsEN": [
      "A. The subagents need a shared message bus so the test-update agent can query the schema-migration agent for the latest schema names",
      "B. The test-update agent should have read access to the schema migration files so it can discover the new names itself",
      "C. The coordinator is not passing the schema-migration agent's output (including renamed schemas) as context when delegating to the test-update agent",
      "D. The schema-migration agent and test-update agent should run sequentially rather than in parallel to avoid race conditions"
    ],
    "options": [
      "A. Các subagent cần một message bus chung để test agent có thể truy vấn migration agent về tên bảng mới.",
      "B. Test agent cần được cấp quyền đọc trực tiếp các file migration để tự tìm tên bảng mới.",
      "C. Coordinator không truyền đầu ra của migration subagent (gồm danh sách bảng đã đổi tên) làm ngữ cảnh khi ủy quyền cho test subagent.",
      "D. Migration agent và test agent nên chạy tuần tự thay vì song song để tránh race condition."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): In a hub-and-spoke multi-agent architecture, subagents must never communicate directly. All communication flows through the coordinator. Adding a message bus violates this principle and creates coordination complexity.",
      "Option B ❌ (SAI): While this might work as a workaround, it misses the architectural root cause. The coordinator is responsible for passing all necessary context to each subagent. The test-update agent should not need to discover information that the coordinator already has.",
      "Option C ✅ (ĐÚNG): In hub-and-spoke orchestration, the coordinator manages all inter-agent communication. Subagents do not inherit each other's context. The coordinator must explicitly pass relevant outputs from earlier subagents as context to downstream subagents. Here, the renamed schema mappings must be injected into the test-update agent's context.",
      "Option D ❌ (SAI): Sequencing alone does not solve the problem if the coordinator does not pass the schema-migration agent's results to the test-update agent. The issue is missing context injection, not execution order."
    ],
    "rationale": "In hub-and-spoke orchestration, the coordinator manages all inter-agent communication. Subagents do not inherit each other's context. The coordinator must explicitly pass relevant outputs from earlier subagents as context to downstream subagents. Here, the renamed schema mappings must be injected into the test-update agent's context.",
    "explanation": "Trong mô hình hub-and-spoke, coordinator chịu trách nhiệm thu thập kết quả từ subagent trước và truyền nó làm ngữ cảnh đầu vào cho subagent sau. Subagent không tự kế thừa bộ nhớ của nhau.",
    "sources": [
      {
        "label": "Lesson 1.2: Multi-Agent Orchestration (Isolation principle)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns#the-critical-isolation-principle"
      },
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing (Context passing)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context#context-passing-the-make-or-break-detail"
      }
    ],
    "id": "ccaf-088"
  },
  {
    "originalId": "q-1-2-013",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / coordinator",
    "difficulty": "application",
    "scenarioId": "s-q-1-2-013",
    "questionEN": "In a hub-and-spoke research system, a coordinator manages several search and analysis subagents. Which responsibilities sit with the coordinator rather than with individual subagents? (Select 3)",
    "question": "Trong hệ thống nghiên cứu hub-and-spoke, coordinator quản lý nhiều subagent tìm kiếm và phân tích. Những trách nhiệm nào thuộc về coordinator thay vì các subagent riêng lẻ? (Chọn 3 đáp án đúng)",
    "optionsEN": [
      "A. Sharing its full conversation history with each subagent automatically at spawn time.",
      "B. Deciding which subagents to invoke based on the complexity of each incoming query.",
      "C. Routing all inter-agent communication so subagents never exchange messages directly.",
      "D. Running every search itself first so subagents only verify its findings.",
      "E. Aggregating subagent results and re-delegating targeted follow-up queries when synthesis shows gaps."
    ],
    "options": [
      "A. Tự động chia sẻ toàn bộ lịch sử hội thoại của nó với từng subagent khi khởi tạo.",
      "B. Quyết định những subagent nào cần kích hoạt dựa trên độ phức tạp của mỗi truy vấn đầu vào.",
      "C. Định tuyến toàn bộ giao tiếp liên agent để các subagent không bao giờ trao đổi tin nhắn trực tiếp với nhau.",
      "D. Tự mình thực hiện toàn bộ việc tìm kiếm trước để các subagent chỉ cần xác minh lại phát hiện của nó.",
      "E. Tổng hợp kết quả từ các subagent và tái ủy quyền các truy vấn theo dõi có mục tiêu khi bản tổng hợp bộc lộ lỗ hổng thông tin."
    ],
    "correct": [
      1,
      2,
      4
    ],
    "optionExplanations": [
      "Option A ❌ (SAI): Subagents run with isolated context; nothing is inherited automatically, and the coordinator passes only the context each task needs.",
      "Option B ✅ (ĐÚNG): The guide places dynamic subagent selection with the coordinator, which analyses query requirements instead of always running the full pipeline.",
      "Option C ✅ (ĐÚNG): Hub-and-spoke routes every message through the coordinator for observability and consistent error handling.",
      "Option D ❌ (SAI): The coordinator delegates work rather than duplicating it; doing every search itself defeats the point of decomposition.",
      "Option E ✅ (ĐÚNG): Synthesis and follow-up delegation are the coordinator's core loop; subagents produce findings, but the coordinator decides when the investigation is complete."
    ],
    "rationale": "The coordinator handles routing, dynamic subagent selection, and iterative synthesis; subagents execute focused tasks within isolated contexts without directly communicating.",
    "explanation": "Trong kiến trúc Hub-and-spoke, Coordinator chịu trách nhiệm quyết định subagent cần gọi (B), định tuyến mọi giao tiếp để kiểm soát luồng (C), và tổng hợp kết quả cũng như giao việc bổ sung khi thiếu thông tin (E). Subagent chạy độc lập trong context cô lập, không tự động kế thừa lịch sử hay giao tiếp ngang hàng.",
    "sources": [
      {
        "label": "Lesson 1.2: Multi-Agent Orchestration (Coordinator responsibilities)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns#coordinator-responsibilities"
      },
      {
        "label": "Lesson 1.2: Multi-Agent Orchestration (Hub-and-spoke architecture)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns#hub-and-spoke-architecture"
      }
    ],
    "id": "ccaf-094",
    "multiple": true
  },
  {
    "originalId": "q-1-3-002",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / parallel-spawning",
    "difficulty": "application",
    "scenarioId": "s-q-1-3-002",
    "questionEN": "A multi-agent research system has a coordinator that spawns a web search subagent and a document analysis subagent sequentially across separate API turns. The web search completes in 8 seconds and the document analysis completes in 12 seconds, giving a total latency of 20 seconds. The two subagents are investigating independent topics and do not depend on each other's results. How should the architect reduce this latency?",
    "question": "Một hệ thống nghiên cứu đa agent có coordinator tạo web search subagent và document analysis subagent tuần tự qua các lượt API riêng biệt. Web search mất 8 giây và document analysis mất 12 giây, tổng độ trễ là 20 giây. Hai subagent điều tra hai chủ đề độc lập và không phụ thuộc vào nhau. Kiến trúc sư nên giảm độ trễ bằng cách nào?",
    "optionsEN": [
      "A. Merge the web search and document analysis into a single subagent to reduce coordination overhead",
      "B. Have the coordinator emit both Task tool calls in a single response to spawn both subagents in parallel, reducing total latency to roughly 12 seconds",
      "C. Allow the web search subagent to directly invoke the document analysis subagent after it finishes, removing the coordinator round-trip",
      "D. Use fork_session to split the coordinator into two parallel branches, one for each subagent"
    ],
    "options": [
      "A. Gộp web search và document analysis vào một subagent duy nhất để giảm chi phí điều phối.",
      "B. Cho coordinator phát ra cả hai lệnh gọi tool Task trong một phản hồi duy nhất để kích hoạt song song cả hai subagent, giảm độ trễ còn khoảng 12 giây.",
      "C. Cho phép web search subagent gọi trực tiếp document analysis subagent sau khi xong.",
      "D. Dùng fork_session để tách coordinator thành hai nhánh song song cho mỗi subagent."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Merging agents violates the principle of specialised subagents with scoped tool access. It also does not reduce total processing time — the merged agent still needs to do both tasks, and loses the benefit of parallel execution.",
      "Option B ✅ (ĐÚNG): When subagents investigate independent topics, the coordinator can emit multiple Task tool calls in a single response. Both subagents run concurrently, so total latency is determined by the slower one (12 seconds) rather than the sum (20 seconds).",
      "Option C ❌ (SAI): Direct subagent communication violates the hub-and-spoke architecture where all communication flows through the coordinator. This also would not achieve parallel execution — it would still be sequential.",
      "Option D ❌ (SAI): fork_session is for divergent exploration of the same problem from a shared baseline, not for parallel subagent invocation. Emitting multiple Task tool calls in a single coordinator response is the correct mechanism for spawning concurrent subagents."
    ],
    "rationale": "When subagents investigate independent topics, the coordinator can emit multiple Task tool calls in a single response. Both subagents run concurrently, so total latency is determined by the slower one (12 seconds) rather than the sum (20 seconds).",
    "explanation": "Khi các subagent nghiên cứu các chủ đề độc lập, coordinator có thể phát ra nhiều lệnh gọi tool Task trong cùng một phản hồi để chạy song song, giảm tổng độ trễ xuống bằng thời gian của subagent chạy lâu nhất.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing (Parallel spawning)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context#parallel-spawning"
      },
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing (Task tool)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context#the-task-tool"
      }
    ],
    "id": "ccaf-096"
  },
  {
    "originalId": "q-1-3-003",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / agent-tool",
    "difficulty": "application",
    "scenarioId": "s-q-1-3-003",
    "questionEN": "A coordinator agent should spawn specialist subagents for billing disputes and technical issues. Its system prompt describes the delegation workflow correctly, yet when it tries to invoke a subagent nothing happens: no subagent is created and no related error is thrown. What is the most likely cause?",
    "question": "Một coordinator agent cần tạo các subagent chuyên gia về thanh toán và hỗ trợ kỹ thuật. System prompt mô tả quy trình ủy quyền chính xác, nhưng khi gọi subagent thì không có gì xảy ra: không có subagent nào được tạo và không có lỗi nào được ném ra. Nguyên nhân khả dĩ nhất là gì?",
    "optionsEN": [
      "A. The coordinator's allowedTools list does not include the Task tool (renamed Agent in current Claude Code), so it cannot spawn subagents.",
      "B. The subagent's AgentDefinition is missing a description field, preventing it from being invoked",
      "C. The coordinator needs to pass the full conversation history to the subagent for it to initialise properly",
      "D. Subagents must be registered in a central agent registry that the coordinator loads at startup, and until they are, no Task call can resolve them."
    ],
    "options": [
      "A. Danh sách allowedTools của coordinator không chứa tool Task (trong Claude Code hiện nay là Agent), nên nó không thể spawn subagent.",
      "B. AgentDefinition của subagent thiếu trường description khiến nó không thể được kích hoạt.",
      "C. Coordinator cần truyền toàn bộ lịch sử hội thoại cho subagent để nó khởi tạo đúng cách.",
      "D. Subagent phải được đăng ký trong registry trung tâm mà coordinator tải lúc khởi động."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): The Task tool is the mechanism for spawning subagents. If 'Task' (or its current alias 'Agent') is not in the coordinator's allowedTools, it physically cannot create subagents regardless of what the system prompt instructs. This is a configuration issue, not a prompt issue.",
      "Option B ❌ (SAI): A missing AgentDefinition description would cause issues with the subagent's behaviour, but the problem here is that the coordinator cannot invoke the spawning mechanism at all. The issue is upstream of any subagent definition.",
      "Option C ❌ (SAI): Subagents do not inherit the coordinator's conversation history — context must be passed explicitly. However, this is not the cause of the failure to spawn. The fundamental issue is that the coordinator lacks the ability to invoke the Task tool.",
      "Option D ❌ (SAI): There is no requirement for a subagent registry. Subagents are defined via an AgentDefinition and spawned through the Task tool. The real issue is that the coordinator's allowedTools omits 'Task' (or 'Agent')."
    ],
    "rationale": "The Task tool is the mechanism for spawning subagents. If 'Task' (or its current alias 'Agent') is not in the coordinator's allowedTools, it physically cannot create subagents regardless of what the system prompt instructs. This is a configuration issue, not a prompt issue.",
    "explanation": "Tool Task (hoặc alias Agent) là cơ chế bắt buộc để coordinator có thể khởi tạo subagent. Nếu thiếu tool này trong allowedTools, coordinator không thể kích hoạt subagent.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing (Task tool)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context#the-task-tool"
      },
      {
        "label": "Anthropic: Claude Agent SDK Overview",
        "url": "https://platform.claude.com/docs/en/agent-sdk/overview"
      }
    ],
    "id": "ccaf-097"
  },
  {
    "originalId": "q-1-3-017",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / scoped-tools",
    "difficulty": "application",
    "scenarioId": "s-q-1-3-017",
    "questionEN": "A web search agent has 9 tools: `web_search`, `url_fetch`, `html_parse`, `pdf_extract`, `image_ocr`, `translate`, `summarise`, `keyword_extract`, `sentiment_analysis`. In testing it frequently calls `summarise` and `sentiment_analysis` when it should only fetch raw data. How should the architect fix this?",
    "question": "Một web search subagent được trang bị 9 tools: web_search, url_fetch, html_parse, pdf_extract, image_ocr, translate, summarise, keyword_extract, sentiment_analysis. Khi kiểm thử, nó thường xuyên tự ý gọi summarise và sentiment_analysis thay vì chỉ lấy dữ liệu thô. Kiến trúc sư nên sửa thế nào?",
    "optionsEN": [
      "A. Add system prompt instructions telling the web search agent to only use data fetching tools and ignore analysis tools",
      "B. Reduce the web search agent to the 4-5 data-fetching tools and move the analysis tools to the specialist agents.",
      "C. Keep all 9 tools but implement PreToolUse hooks that block the web search agent from calling summarise and sentiment_analysis",
      "D. Merge the web search and synthesis agents into a single agent since they share some tools"
    ],
    "options": [
      "A. Thêm hướng dẫn system prompt bảo agent chỉ dùng tool lấy dữ liệu và lờ đi các tool phân tích.",
      "B. Thu gọn web search agent xuống còn 4-5 tools lấy dữ liệu cốt lõi, chuyển các tool phân tích sang các subagent chuyên trách.",
      "C. Giữ nguyên 9 tools nhưng gắn hook PreToolUse để chặn lệnh gọi summarise và sentiment_analysis.",
      "D. Gộp web search agent với synthesis agent lại thành một."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Prompt instructions are probabilistic and the agent is already misusing tools. The architectural fix is to remove the tools it should not have, providing deterministic enforcement through scoped tool access.",
      "Option B ✅ (ĐÚNG): The recommended maximum is 4–5 tools per agent. The web search agent has 9 tools, causing it to use tools outside its intended role. Reducing to data-fetching tools enforces scoped access. The analysis tools (summarise, sentiment_analysis, keyword_extract) belong with the synthesis or analysis agents.",
      "Option C ❌ (SAI): Using hooks to block tool access is an over-engineered workaround for what should be a configuration fix. The proper solution is to remove the tools from allowedTools, not to provide them and then block their use.",
      "Option D ❌ (SAI): Merging agents violates the principle of specialised subagents. The solution is to separate tools by role, not to combine agents. Merging would create an even larger tool set on a single agent."
    ],
    "rationale": "The recommended maximum is 4–5 tools per agent. The web search agent has 9 tools, causing it to use tools outside its intended role. Reducing to data-fetching tools enforces scoped access. The analysis tools (summarise, sentiment_analysis, keyword_extract) belong with the synthesis or analysis agents.",
    "explanation": "Số lượng tool khuyến nghị tối ưu cho mỗi subagent là 4-5 tools. Trang bị quá nhiều tool ngoài phạm vi trách nhiệm dẫn đến việc agent chọn sai công cụ.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff (Scoped tool access (4-5 tools))",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff#the-enforcement-spectrum"
      },
      {
        "label": "Anthropic: Claude Agent SDK Overview",
        "url": "https://platform.claude.com/docs/en/agent-sdk/overview"
      }
    ],
    "id": "ccaf-105"
  },
  {
    "originalId": "q-1-4-007",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement-handoff / confidence-routing",
    "difficulty": "application",
    "scenarioId": "s-q-1-4-007",
    "questionEN": "The moderation system auto-removes posts classified as policy violations. Production logs reveal that 3% of auto-removed posts were legitimate content (false positives), generating user complaints and eroding platform trust. The team considers two approaches: (A) escalate all borderline cases to human reviewers, or (B) add a confidence threshold where only high-confidence violations are auto-removed and everything else goes to human review. Which approach is better and why?",
    "question": "Hệ thống kiểm duyệt tự động gỡ bài vi phạm. Log cho thấy 3% bài bị gỡ là nội dung hợp pháp (false positive), gây bức xúc cho người dùng. Nhóm cân nhắc: (A) chuyển tất cả ca nghi vấn cho người duyệt, hoặc (B) áp dụng ngưỡng tin cậy: chỉ tự gỡ khi độ tin cậy rất cao, còn lại chuyển người duyệt. Cách nào tốt hơn và vì sao?",
    "optionsEN": [
      "A. Approach A is better because human reviewers are always more accurate than automated systems",
      "B. Approach B: auto-remove only high-confidence violations, escalate uncertain cases to human review, and auto-approve high-confidence safe content.",
      "C. Neither — instead lower the classification threshold so fewer posts are flagged as violations",
      "D. Approach B, but apply a single fixed 95% confidence threshold to every category regardless of how costly a false positive is for that content type."
    ],
    "options": [
      "A. Cách A tốt hơn vì con người luôn chính xác hơn máy móc.",
      "B. Cách B tốt hơn: chỉ tự gỡ khi độ tin cậy cao, chuyển ca nghi vấn cho con người duyệt, và tự duyệt bài an toàn có độ tin cậy cao.",
      "C. Cả hai đều không nên — thay vào đó hãy hạ ngưỡng phân loại để ít bài bị gắn cờ hơn.",
      "D. Cách B, nhưng áp dụng ngưỡng cố định 95% cho mọi danh mục bất kể hậu quả."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Escalating all borderline cases overwhelms the human review queue without leveraging the system's ability to handle clear-cut cases autonomously. The goal is to route intelligently, not to defer everything.",
      "Option B ✅ (ĐÚNG): Confidence-based routing creates a tiered system: high-confidence violations are actioned immediately, high-confidence safe content passes through, and uncertain cases receive human review. This balances speed, accuracy, and reviewer workload while directly addressing the false positive problem.",
      "Option C ❌ (SAI): Lowering the threshold reduces false positives but increases false negatives (genuine violations going undetected). This trades one problem for another rather than adding an appropriate escalation path.",
      "Option D ❌ (SAI): A single fixed threshold across all categories ignores that violation types have different risk profiles. The threshold should be calibrated per category based on the cost of false positives versus false negatives."
    ],
    "rationale": "Confidence-based routing creates a tiered system: high-confidence violations are actioned immediately, high-confidence safe content passes through, and uncertain cases receive human review. This balances speed, accuracy, and reviewer workload while directly addressing the false positive problem.",
    "explanation": "Định tuyến dựa trên độ tin cậy (Cách B) tạo ra hệ thống phân tầng: xử lý tức thì các vi phạm rõ ràng, giảm tải cho nhân viên trong khi triệt tiêu các ca phạt oan sai.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff (Confidence-based escalation)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff#structured-handoff-protocols"
      },
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff (Enforcement spectrum)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff#the-enforcement-spectrum"
      }
    ],
    "id": "ccaf-111"
  },
  {
    "originalId": "q-1-4-009",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement-handoff / graceful-degradation",
    "difficulty": "application",
    "scenarioId": "s-q-1-4-009",
    "questionEN": "A customer support agent's loop terminates when cumulative token usage exceeds a budget. During a complex billing investigation the budget is exhausted mid-task, after data gathering but before resolution, with stop_reason still `tool_use`. What architectural change addresses this?",
    "question": "Vòng lặp của agent dừng lại khi lượng token tích lũy vượt quá ngân sách định mức. Trong một cuộc điều tra cước phức tạp, ngân sách cạn kiệt giữa chừng sau giai đoạn thu thập dữ liệu nhưng trước khi đưa ra kết luận, với stop_reason vẫn là `tool_use`. Thay đổi kiến trúc nào giải quyết việc này?",
    "optionsEN": [
      "A. Double the token budget to ensure the agent always has enough tokens to complete complex investigations",
      "B. When the budget is nearly gone and stop_reason is still 'tool_use', summarise progress and escalate to a human.",
      "C. Remove the token budget entirely and rely solely on the iteration cap for safety",
      "D. Switch to a cheaper model so each iteration uses fewer tokens, letting the agent fit more iterations into the same budget and finish the task."
    ],
    "options": [
      "A. Tăng gấp đôi ngân sách token để đảm bảo agent luôn đủ token hoàn thành điều tra phức tạp.",
      "B. Khi ngân sách sắp cạn và stop_reason vẫn là 'tool_use', hãy tóm tắt tiến trình đã đạt được và chuyển tiếp (escalate) cho con người xử lý tiếp.",
      "C. Xóa bỏ hoàn toàn ngân sách token và chỉ dựa vào giới hạn số lần lặp để đảm bảo an toàn.",
      "D. Chuyển sang model rẻ hơn để mỗi lần lặp tốn ít token hơn, giúp agent hoàn thành tác vụ trong cùng ngân sách."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Doubling the budget is an arbitrary fix that may still be insufficient for edge cases and wastes tokens on simple requests. The fundamental issue is that the budget terminates the loop even when stop_reason indicates the agent has more work to do.",
      "Option B ✅ (ĐÚNG): When constraints prevent completion, the agent should degrade gracefully rather than terminating abruptly. Summarising progress and performing a structured handoff (customer ID, summary, root cause so far, recommended next steps) ensures no work is lost and the human agent can continue from where the AI left off.",
      "Option C ❌ (SAI): Removing the token budget eliminates a valuable cost control mechanism. The issue is not having a budget, but how the system handles budget exhaustion during active work.",
      "Option D ❌ (SAI): A cheaper model may reduce the quality of the investigation itself. The architectural fix is graceful degradation when constraints are reached, not lowering the quality of work to fit within arbitrary limits."
    ],
    "rationale": "When constraints prevent completion, the agent should degrade gracefully rather than terminating abruptly. Summarising progress and performing a structured handoff (customer ID, summary, root cause so far, recommended next steps) ensures no work is lost and the human agent can continue from where the AI left off.",
    "explanation": "Khi các rào cản tài nguyên ngăn cản việc hoàn thành tác vụ, agent cần suy thoái một cách mềm dẻo (graceful degradation): tóm tắt các phát hiện và chuyển giao cho con người thay vì dừng đột ngột giữa chừng.",
    "sources": [
      {
        "label": "Lesson 1.1: Agentic Loops (Agentic loop lifecycle)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-1-agentic-loops#the-agentic-loop-lifecycle"
      },
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff (Structured handoff protocols)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff#structured-handoff-protocols"
      }
    ],
    "id": "ccaf-112"
  },
  {
    "originalId": "q-1-4-011",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement-handoff / ambiguity-escalation",
    "difficulty": "application",
    "scenarioId": "s-q-1-4-011",
    "questionEN": "An insurance claim agent has gathered all relevant information but the policy language admits two valid interpretations and its confidence is low. With no escalation path, the agent picks one interpretation and proceeds. What architectural improvement is needed?",
    "question": "Lập trình viên giao cho agent 2 nhiệm vụ: (1) Đổi tên hàm getUserData trên toàn bộ 40 file và (2) Tối ưu hóa thuật toán tính toán trong 1 hàm đơn lẻ. Coordinator nên xử lý việc phân bổ công việc như thế nào?",
    "optionsEN": [
      "A. Add more insurance policy documents and precedent rulings to the agent's knowledge base so it can resolve the ambiguous wording itself without escalating.",
      "B. Detect the genuine ambiguity and escalate to a human claims specialist with a structured handoff of the two interpretations and their evidence.",
      "C. Have the agent ask the customer which interpretation they prefer",
      "D. Train a fine-tuned model specifically for insurance policy interpretation"
    ],
    "options": [
      "A. Tự mình làm cả hai tác vụ trong một context duy nhất.",
      "B. Ủy quyền tác vụ (1) quy mô lớn cho subagent chuyên trách và tự mình xử lý tác vụ (2) cục bộ hẹp.",
      "C. Chạy tác vụ (2) trước, bỏ qua tác vụ (1).",
      "D. Ủy quyền cả hai tác vụ cho cùng một subagent duy nhất."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): More documents do not resolve genuinely ambiguous policy language. When the policy itself can be read two ways, the agent needs a human expert to make the judgment call, not more reference material.",
      "Option B ✅ (ĐÚNG): When the agent encounters genuine ambiguity that requires human judgment (here, policy language that admits two valid readings), it should escalate with a structured handoff. Policy ambiguity is a guide-endorsed escalation trigger, unlike a raw self-reported confidence score. The escalation payload includes everything the human specialist needs: customer ID, claim summary, both interpretations, and supporting evidence, so the human can decide without re-investigating.",
      "Option C ❌ (SAI): Customers cannot authoritatively interpret their own insurance policies. Policy interpretation is a specialist function that requires expertise in insurance contract language. This is a human-in-the-loop scenario requiring a specialist, not customer input.",
      "Option D ❌ (SAI): Fine-tuning may improve accuracy but cannot guarantee correct interpretation of genuinely ambiguous language. Cases that require human judgment should escalate to human experts. The architectural fix is an escalation path, not a more specialised model."
    ],
    "rationale": "When the agent encounters genuine ambiguity that requires human judgment (here, policy language that admits two valid readings), it should escalate with a structured handoff. Policy ambiguity is a guide-endorsed escalation trigger, unlike a raw self-reported confidence score. The escalation payload includes everything the human specialist needs: customer ID, claim summary, both interpretations, and supporting evidence, so the human can decide without re-investigating.",
    "explanation": "Coordinator nên ủy quyền các tác vụ quy mô lớn, tác động nhiều file cho subagent chuyên trách để tránh làm loãng context, trong khi có thể trực tiếp xử lý các tác vụ cục bộ đơn giản.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff (Confidence-based escalation)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff#structured-handoff-protocols"
      }
    ],
    "id": "ccaf-114"
  },
  {
    "originalId": "q-1-6-001",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / attention-dilution",
    "difficulty": "application",
    "scenarioId": "s-q-1-6-001",
    "questionEN": "A code review agent processes 14 files and produces detailed feedback for the first 5 files but misses obvious bugs in files 10-14. It also flags a pattern as problematic in one file while approving identical code in another. What is the root cause and solution?",
    "question": "Một code review agent xử lý 14 file và đưa ra nhận xét chi tiết cho 5 file đầu tiên nhưng bỏ sót các bug rõ ràng ở các file 10-14. Nó cũng gắn cờ một mẫu code là có vấn đề ở file này nhưng lại duyệt mẫu code giống hệt ở file khác. Nguyên nhân và giải pháp là gì?",
    "optionsEN": [
      "A. The model's context window is too small — upgrade to a model with a larger context window",
      "B. Split the review into per-file local analysis passes plus a separate cross-file integration pass",
      "C. Add a stronger system prompt emphasising the importance of reviewing all files equally",
      "D. Reduce the number of files reviewed per run to 5 and process in batches"
    ],
    "options": [
      "A. Context window của model quá nhỏ — nâng cấp lên model có context window lớn hơn.",
      "B. Tách quy trình review thành các lượt phân tích cục bộ từng file riêng biệt kèm một lượt tổng hợp tích hợp liên file riêng.",
      "C. Thêm system prompt mạnh hơn nhấn mạnh tầm quan trọng của việc review tất cả các file đồng đều.",
      "D. Giảm số lượng file được review mỗi lần chạy xuống còn 5 và xử lý theo từng đợt."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Context window size is not the issue. Attention dilution occurs because processing too many items in a single pass produces inconsistent depth, regardless of window size.",
      "Option B ✅ (ĐÚNG): Multi-pass architecture solves attention dilution. Per-file passes ensure consistent depth for each file. The cross-file integration pass catches data flow issues and ensures consistent pattern evaluation.",
      "Option C ❌ (SAI): Prompt improvements do not solve attention dilution. The fundamental issue is processing too many items in a single pass, which is an architectural problem requiring a structural solution.",
      "Option D ❌ (SAI): Batching is closer to the right idea but misses the cross-file integration pass. Without it, cross-file data flow issues and pattern consistency are not addressed."
    ],
    "rationale": "Multi-pass architecture solves attention dilution. Per-file passes ensure consistent depth for each file. The cross-file integration pass catches data flow issues and ensures consistent pattern evaluation.",
    "explanation": "Kiến trúc multi-pass (nhiều lượt) giải quyết triệt để vấn đề phân tán chú ý (attention dilution). Phân tích từng file đảm bảo độ sâu nhất quán, và lượt tích hợp liên file giải quyết các mối tương tác phụ thuộc.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies (Attention dilution)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition#the-attention-dilution-problem"
      },
      {
        "label": "Lesson 1.6: Task Decomposition Strategies (Sequential pipelines)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition#pattern-1-fixed-sequential-pipelines-prompt-chaining"
      }
    ],
    "id": "ccaf-127"
  },
  {
    "originalId": "q-1-6-008",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / delegation",
    "difficulty": "application",
    "scenarioId": "s-q-1-6-008",
    "questionEN": "A coordinator agent receives a request to extract a payment processing module from the monolith into a standalone microservice. The task involves creating new API endpoints, migrating database tables, updating 40+ call sites, and writing integration tests. A junior developer suggests the coordinator should handle the entire task itself to avoid subagent communication overhead. Why is this approach wrong?",
    "question": "Coordinator nhận yêu cầu bóc tách module thanh toán từ monolith thành microservice độc lập (gồm tạo API endpoint mới, di chuyển bảng DB, sửa hơn 40 vị trí gọi và viết test tích hợp). Một lập trình viên đề xuất coordinator nên tự làm hết một mình để tránh chi phí giao tiếp subagent. Tại sao đề xuất này sai?",
    "optionsEN": [
      "A. The coordinator should never write code — it should only route tasks",
      "B. Loading 40+ files into one context dilutes attention — the coordinator should delegate to scoped subagents instead",
      "C. The coordinator cannot access file system tools, so it physically cannot make code changes",
      "D. The coordinator's API rate limits would be exceeded when processing 40+ files"
    ],
    "options": [
      "A. Coordinator tuyệt đối không bao giờ được viết code — nó chỉ có thể định tuyến tác vụ.",
      "B. Nạp hơn 40 file vào cùng một context window gây suy giảm nghiêm trọng khả năng chú ý (attention dilution) — coordinator nên ủy quyền cho các subagent chuyên trách có phạm vi hẹp.",
      "C. Coordinator không thể truy cập các tool file system nên không thể sửa code.",
      "D. Giới hạn tốc độ gọi API của coordinator sẽ bị vượt ngưỡng khi xử lý trên 40 file."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): The coordinator can handle simple, well-scoped tasks directly. The issue here is not a blanket rule against the coordinator writing code, but that this specific task is too large and cross-cutting for a single agent to handle effectively.",
      "Option B ✅ (ĐÚNG): Large, multi-file tasks suffer from attention dilution when processed in a single context. Delegating to specialist subagents ensures each agent works with focused context. The coordinator should handle task decomposition and context injection, delegating implementation to specialists.",
      "Option C ❌ (SAI): There is no inherent restriction preventing a coordinator from having file system tools. The issue is architectural — a single agent processing too many files suffers from attention dilution, not tool access limitations.",
      "Option D ❌ (SAI): API rate limits are a practical concern but not the architectural reason to delegate. The root issue is attention dilution — quality degrades when one agent processes too many items in a single context, regardless of rate limits."
    ],
    "rationale": "Large, multi-file tasks suffer from attention dilution when processed in a single context. Delegating to specialist subagents ensures each agent works with focused context. The coordinator should handle task decomposition and context injection, delegating implementation to specialists.",
    "explanation": "Các tác vụ quy mô lớn tác động lên hàng chục file sẽ bị loãng ngữ cảnh và suy giảm chú ý nếu nhồi nhét vào một context duy nhất. Phân rã cho các subagent chuyên trách giúp duy trì độ tập trung và chính xác.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies (Attention dilution)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition#the-attention-dilution-problem"
      },
      {
        "label": "Lesson 1.2: Multi-Agent Orchestration (Coordinator responsibilities)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns#coordinator-responsibilities"
      }
    ],
    "id": "ccaf-130"
  },
  {
    "originalId": "q-1-6-009",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / adaptive-decomposition",
    "difficulty": "application",
    "scenarioId": "s-q-1-6-009",
    "questionEN": "You are planning how Claude should tackle a large, unfamiliar refactoring effort. Which characteristics of the work indicate dynamic adaptive decomposition rather than a fixed sequential pipeline? (Select 2)",
    "question": "Bạn đang lập kế hoạch để Claude xử lý một dự án refactoring lớn trên codebase lạ lẫm. Đặc điểm nào của công việc cho thấy cần áp dụng phân rã thích ứng động (dynamic adaptive decomposition) thay vì pipeline tuần tự cố định? (Chọn 2 đáp án đúng)",
    "optionsEN": [
      "A. The review covers the same predictable set of aspects on every run.",
      "B. The useful subtasks only become clear as intermediate findings come in.",
      "C. Each step's output feeds the next in a stable, known order.",
      "D. The task is open-ended, like adding comprehensive tests to a legacy codebase you have not yet explored."
    ],
    "options": [
      "A. Đợt rà soát bao quát cùng một tập hợp khía cạnh có thể dự đoán được trong mỗi lần chạy.",
      "B. Các nhiệm vụ phụ hữu ích chỉ trở nên rõ ràng khi nhận được các phát hiện trung gian.",
      "C. Đầu ra của mỗi bước cung cấp cho bước tiếp theo theo một thứ tự ổn định, đã biết trước.",
      "D. Nhiệm vụ mang tính mở, chẳng hạn như thêm kiểm thử toàn diện vào một codebase cũ mà bạn chưa khám phá."
    ],
    "correct": [
      1,
      3
    ],
    "optionExplanations": [
      "Option A ❌ (SAI): Predictable, identical aspects call for a fixed parallel workflow, not dynamic decomposition.",
      "Option B ✅ (ĐÚNG): When subsequent steps depend on what previous steps uncover, the decomposition must be dynamic and adaptive.",
      "Option C ❌ (SAI): Stable sequential pipelines suit predictable workflows where each stage's inputs and outputs are defined in advance.",
      "Option D ✅ (ĐÚNG): Open-ended exploration with uncertain scope requires dynamic task generation as the codebase structure is discovered."
    ],
    "rationale": "Dynamic decomposition is chosen when tasks cannot be planned upfront because discovery drives subsequent work (open-ended tasks and emergent subtasks).",
    "explanation": "Phân rã động thích ứng (Dynamic adaptive decomposition) là bắt buộc khi các bước tiếp theo phụ thuộc vào phát hiện từ bước trước (B) và phạm vi công việc mang tính mở, chưa biết trước toàn bộ codebase (D). Ngược lại, quy trình có các bước cố định hoặc thứ tự ổn định thì phù hợp với pipeline tuần tự/song song tĩnh.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies (Dynamic adaptive decomposition)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition#pattern-2-dynamic-adaptive-decomposition"
      },
      {
        "label": "Lesson 1.6: Task Decomposition Strategies (Sequential pipelines)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition#pattern-1-fixed-sequential-pipelines-prompt-chaining"
      }
    ],
    "id": "ccaf-131",
    "multiple": true
  },
  {
    "originalId": "q-1-7-005",
    "source": "Official254",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / fresh-start",
    "difficulty": "application",
    "scenarioId": "s-q-1-7-005",
    "questionEN": "A Claude Code agent has spent 30 minutes debugging a failing test suite mid-refactor, trying three different approaches that each modified configuration files. None worked, and its context now holds three sets of conflicting modifications and failed outputs. The developer wants to try a completely different strategy. What session management approach should they use?",
    "question": "Khi sử dụng Claude Code, làm thế nào một kỹ sư có thể lưu lại trạng thái phiên hiện tại trước khi thực hiện một loạt các thử nghiệm mạo hiểm trên codebase?",
    "optionsEN": [
      "A. Continue in the current session and ask the agent to ignore all previous attempts and start fresh",
      "B. Start a completely new session with no prior context at all, re-read the failing tests from scratch, and apply the new strategy fresh.",
      "C. Start a fresh session summarising the three failed approaches and why each failed, then pursue the new strategy with clean context.",
      "D. Use fork_session from the point before the first debugging attempt to explore the new strategy"
    ],
    "options": [
      "A. Sao chép toàn bộ thư mục dự án ra Desktop bằng tay.",
      "B. Sử dụng tính năng phân nhánh session (fork_session) hoặc ghi commit git để tạo điểm khôi phục an toàn.",
      "C. Xóa file cấu hình CLAUDE.md để reset trạng thái.",
      "D. Tắt terminal để ép Claude Code tự động lưu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Asking the agent to ignore context is unreliable. The three sets of conflicting modifications and failed outputs remain in the context window, and the model may still reason from them. This is a stale/polluted context problem.",
      "Option B ❌ (SAI): A completely blank session discards the useful record of what has already been tried and why it failed, which risks repeating failed approaches. Summary injection preserves that knowledge.",
      "Option C ✅ (ĐÚNG): Fresh start with summary injection preserves the knowledge of what has been tried (preventing repetition) while eliminating the polluted context from three sets of conflicting file modifications. The agent starts with clean context and the lessons learned from previous attempts.",
      "Option D ❌ (SAI): Forking from 30 minutes ago creates a branch without the knowledge of what was tried and why it failed. The new strategy benefits from knowing that three other approaches failed. Summary injection in a fresh session is more appropriate."
    ],
    "rationale": "Fresh start with summary injection preserves the knowledge of what has been tried (preventing repetition) while eliminating the polluted context from three sets of conflicting file modifications. The agent starts with clean context and the lessons learned from previous attempts.",
    "explanation": "fork_session tạo một nhánh độc lập từ phiên làm việc hiện tại, cho phép thử nghiệm các giải pháp rủi ro mà không làm mất trạng thái phiên làm việc chính.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption (Stale context)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption#the-stale-context-problem"
      },
      {
        "label": "Lesson 1.7: Session State and Resumption (Decision matrix)",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption#when-to-use-each-option-decision-matrix"
      }
    ],
    "id": "ccaf-136"
  },
  {
    "id": "ccaf-147",
    "originalId": "lnq-030",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p7",
    "difficulty": "application",
    "scenarioId": "s-ccaf-030",
    "questionEN": "After investigating a billing dispute over 25+ turns, you've identified that duplicate charges occurred due to a payment gateway timeout triggering retry logic. The required refund ($847) exceeds your $500 authorization limit. You need to call escalate_to_human, and the human agent won't have access to your conversation transcript. What context should you pass to enable effective resolution?",
    "question": "Sau khi điều tra một tranh chấp hóa đơn (billing dispute) qua hơn 25 lượt (turn), bạn đã xác định rằng các khoản tính phí trùng lặp (duplicate charges) xảy ra do một timeout của cổng thanh toán (payment gateway) kích hoạt logic thử lại (retry logic). Khoản hoàn tiền cần thiết ($847) vượt quá giới hạn ủy quyền (authorization limit) $500 của bạn. Bạn cần gọi escalate_to_human, và nhân viên con người sẽ không có quyền truy cập vào transcript cuộc hội thoại của bạn. Bạn nên truyền context nào để việc giải quyết được hiệu quả?",
    "optionsEN": [
      "A. The customer's original complaint verbatim plus the tool result excerpts showing duplicate transactions.",
      "B. A structured summary: customer ID, root cause, refund amount, and recommended action.",
      "C. The complete conversation transcript with all tool results.",
      "D. Your diagnosis and the refund amount only."
    ],
    "options": [
      "A. Nguyên văn khiếu nại ban đầu của khách hàng cộng với các đoạn trích tool result cho thấy các giao dịch trùng lặp (duplicate transactions).",
      "B. Một bản tóm tắt có cấu trúc: customer ID, nguyên nhân gốc rễ (root cause), số tiền hoàn trả (refund amount), và hành động được đề xuất.",
      "C. Toàn bộ transcript của cuộc hội thoại cùng với tất cả tool result.",
      "D. Chỉ chẩn đoán của bạn và số tiền hoàn trả."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Một bàn giao (handoff) có cấu trúc với các định danh (identifiers), nguyên nhân, số tiền, và hành động được đề xuất là những gì một nhân viên con người cần để tiếp nhận vụ việc ngay lập tức mà không cần điều tra lại. Các dữ liệu thô (raw artifacts) không qua tổng hợp (synthesis) (A) buộc nhân viên con người phải làm lại 25 lượt điều tra, việc đổ toàn bộ transcript (C) buộc nhân viên con người phải lội qua nó thay vì đọc một bản tóm tắt gọn trong một màn hình, và phương án D thiếu các định danh khách hàng và một hành động được đề xuất mà nhân viên con người không thể hành động nếu thiếu.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "A structured handoff with identifiers, cause, amount, and recommended action is what a human agent needs to pick up the case instantly without re-investigating. Raw artifacts without synthesis (A) force the human to re-do the 25 turns of investigation, dumping the whole transcript (C) forces the human to wade through it instead of reading a one-screen brief, and option D is missing customer identifiers and a recommended action that the human can't act without.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nMột bàn giao (handoff) có cấu trúc với các định danh (identifiers), nguyên nhân, số tiền, và hành động được đề xuất là những gì một nhân viên con người cần để tiếp nhận vụ việc ngay lập tức mà không cần điều tra lại. Các dữ liệu thô (raw artifacts) không qua tổng hợp (synthesis) (A) buộc nhân viên con người phải làm lại 25 lượt điều tra, việc đổ toàn bộ transcript (C) buộc nhân viên con người phải lội qua nó thay vì đọc một bản tóm tắt gọn trong một màn hình, và phương án D thiếu các định danh khách hàng và một hành động được đề xuất mà nhân viên con người không thể hành động nếu thiếu.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-148",
    "originalId": "lnq-031",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p8",
    "difficulty": "application",
    "scenarioId": "s-ccaf-031",
    "questionEN": "Compliance requires that refunds exceeding $500 must automatically escalate to a human agent—this rule cannot be left to model discretion. Despite clear system prompt instructions, production logs show the agent occasionally processes high-value refunds directly (3% failure rate). How should you achieve guaranteed compliance?",
    "question": "Tuân thủ (compliance) yêu cầu rằng các khoản hoàn tiền vượt quá $500 phải tự động chuyển tiếp (escalate) đến nhân viên con người — quy tắc này không được để cho mô hình tùy ý quyết định. Mặc dù có hướng dẫn rõ ràng trong system prompt, log production cho thấy agent đôi khi xử lý trực tiếp các khoản hoàn tiền giá trị cao (tỷ lệ thất bại 3%). Bạn nên làm gì để đạt được sự tuân thủ (compliance) được đảm bảo?",
    "optionsEN": [
      "A. Modify the refund tool to return an error with message \"Amount exceeds policy limit—please escalate\" when threshold is exceeded.",
      "B. Add few-shot examples to the prompt showing correct escalation behavior at various refund amounts ($400, $500, $600).",
      "C. Implement a hook to intercept tool calls; when the refund process amount exceeds $500, block it and invoke human escalation.",
      "D. Strengthen the system prompt with emphatic language: \"CRITICAL POLICY: Refunds over $500 MUST trigger human escalation. NEVER process these directly.\""
    ],
    "options": [
      "A. Sửa đổi refund tool để trả về lỗi với message \"Amount exceeds policy limit—please escalate\" khi vượt ngưỡng (threshold).",
      "B. Thêm few-shot example vào prompt minh họa hành vi escalation đúng ở các mức số tiền hoàn trả khác nhau ($400, $500, $600).",
      "C. Triển khai một hook để chặn (intercept) các tool call; khi số tiền của process_refund vượt quá $500, chặn nó lại và gọi human escalation.",
      "D. Tăng cường system prompt bằng ngôn ngữ nhấn mạnh: \"CRITICAL POLICY: Refunds over $500 MUST trigger human escalation. NEVER process these directly.\""
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Các quy tắc ở cấp độ tuân thủ (compliance-grade) thuộc về bên ngoài mô hình — một hook tất định (deterministic) trên lệnh gọi tool đảm bảo sẽ luôn kích hoạt mỗi lần, độc lập với hành vi của mô hình. Việc trả về một thông báo lỗi (A) vẫn phụ thuộc vào việc agent diễn giải đúng nó, các ví dụ few-shot (B) dịch chuyển phân phối (distribution) nhưng không loại bỏ tỷ lệ thất bại, và ngôn ngữ nhấn mạnh trong prompt (D) làm giảm nhưng không loại bỏ việc sử dụng sai — yêu cầu rằng điều này không được để cho mô hình tùy ý quyết định loại trừ mọi giải pháp chỉ dựa trên prompt.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Compliance-grade rules belong outside the model — a deterministic hook on the tool call is guaranteed to fire every time, independent of model behavior. Returning an error message (A) still depends on the agent interpreting it correctly, few-shot examples (B) shift the distribution but don't remove the failure rate, and emphatic prompt language (D) reduces but doesn't eliminate misuse — the requirement that this cannot be left to model discretion rules out any prompt-only solution.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nCác quy tắc ở cấp độ tuân thủ (compliance-grade) thuộc về bên ngoài mô hình — một hook tất định (deterministic) trên lệnh gọi tool đảm bảo sẽ luôn kích hoạt mỗi lần, độc lập với hành vi của mô hình. Việc trả về một thông báo lỗi (A) vẫn phụ thuộc vào việc agent diễn giải đúng nó, các ví dụ few-shot (B) dịch chuyển phân phối (distribution) nhưng không loại bỏ tỷ lệ thất bại, và ngôn ngữ nhấn mạnh trong prompt (D) làm giảm nhưng không loại bỏ việc sử dụng sai — yêu cầu rằng điều này không được để cho mô hình tùy ý quyết định loại trừ mọi giải pháp chỉ dựa trên prompt.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-149",
    "originalId": "lnq-032",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p9",
    "difficulty": "application",
    "scenarioId": "s-ccaf-032",
    "questionEN": "During a billing dispute resolution, your agent successfully retrieves customer info via get_customer and order details via lookup_order, but when attempting to call process_refund, the tool returns a timeout error. The agent has enough information to explain the charges and verify refund eligibility, but cannot actually process the refund due to the backend failure. What approach best balances first-contact resolution with appropriate error handling?",
    "question": "Trong quá trình giải quyết một tranh chấp hóa đơn (billing dispute), agent của bạn lấy thành công thông tin khách hàng qua get_customer và chi tiết đơn hàng qua lookup_order, nhưng khi cố gắng gọi process_refund, tool trả về lỗi timeout. Agent có đủ thông tin để giải thích các khoản phí và xác minh tính đủ điều kiện hoàn tiền, nhưng không thể thực sự xử lý khoản hoàn tiền do lỗi ở backend. Cách tiếp cận nào cân bằng tốt nhất giữa việc giải quyết ngay từ lần liên hệ đầu tiên (first-contact resolution) và việc xử lý lỗi phù hợp?",
    "optionsEN": [
      "A. Escalate immediately to a human agent since the refund action cannot be completed",
      "B. Implement automatic retries with exponential backoff for process_refund, keeping the conversation open until the refund is successfully processed",
      "C. Explain the billing, confirm refund eligibility, acknowledge the system issue preventing immediate processing, and offer escalation or retry later",
      "D. Confirm the refund will be processed and close the conversation, since the system has all necessary information to complete it automatically"
    ],
    "options": [
      "A. Escalate ngay lập tức cho một human agent vì hành động hoàn tiền không thể hoàn tất",
      "B. Triển khai retry tự động với exponential backoff cho process_refund, giữ cuộc hội thoại mở cho đến khi khoản hoàn tiền được xử lý thành công",
      "C. Giải thích về khoản phí (billing), xác nhận khách hàng đủ điều kiện hoàn tiền (refund eligibility), thừa nhận sự cố hệ thống đang ngăn việc xử lý ngay lập tức, và đề nghị escalation hoặc thử lại sau",
      "D. Xác nhận khoản hoàn tiền sẽ được xử lý và đóng cuộc hội thoại, vì hệ thống đã có đủ thông tin cần thiết để tự động hoàn tất việc này"
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Cung cấp giá trị một phần mà bạn có thể (giải thích + tính đủ điều kiện), trung thực về sự cố, và để khách hàng lựa chọn giữa việc chuyển tiếp cho con người hoặc thử lại — đây là kiểu graceful degradation (suy giảm graceful) kinh điển. Việc chuyển tiếp ngay lập tức (A) đẩy một sự cố backend tạm thời đi trong khi agent vẫn có thể giải thích tình huống, việc thử lại vô thời hạn (B) là trải nghiệm người dùng (UX) kém và có thể không bao giờ thành công trong một đợt gián đoạn (outage) kéo dài, và việc xác nhận một kết quả chưa thực sự xảy ra (D) đánh lừa khách hàng, một thất bại còn lớn hơn cả chính lỗi timeout.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Deliver the partial value you can (explanation + eligibility), be honest about the failure, and let the customer choose between human escalation or a retry — classic graceful degradation. Immediate escalation (A) punts a transient backend issue when the agent could still explain the situation, indefinite retries (B) is poor UX and may never succeed during a long outage, and confirming an outcome that didn't happen (D) misleads the customer, a bigger failure than the timeout itself.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nCung cấp giá trị một phần mà bạn có thể (giải thích + tính đủ điều kiện), trung thực về sự cố, và để khách hàng lựa chọn giữa việc chuyển tiếp cho con người hoặc thử lại — đây là kiểu graceful degradation (suy giảm graceful) kinh điển. Việc chuyển tiếp ngay lập tức (A) đẩy một sự cố backend tạm thời đi trong khi agent vẫn có thể giải thích tình huống, việc thử lại vô thời hạn (B) là trải nghiệm người dùng (UX) kém và có thể không bao giờ thành công trong một đợt gián đoạn (outage) kéo dài, và việc xác nhận một kết quả chưa thực sự xảy ra (D) đánh lừa khách hàng, một thất bại còn lớn hơn cả chính lỗi timeout.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-152",
    "originalId": "lnq-035",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-035",
    "questionEN": "Production logs reveal inconsistent error handling: when lookup_order fails, the agent sometimes retries 5+ times (wasteful when the order ID doesn't exist), sometimes escalates immediately (premature for temporary network issues), and sometimes asks users for clarification (inappropriate when the issue is a backend permission error). Investigation shows your MCP tool returns uniform error responses: {\"isError\": true, \"content\": [{\"type\": \"text\", \"text\": \"Operation failed\"}]}. The agent cannot distinguish between error types. What's the most effective improvement?",
    "question": "Log production cho thấy việc xử lý lỗi không nhất quán: khi lookup_order thất bại, agent đôi khi thử lại 5 lần trở lên (lãng phí khi order ID không tồn tại), đôi khi chuyển tiếp (escalate) ngay lập tức (quá sớm đối với các sự cố mạng tạm thời), và đôi khi hỏi người dùng để làm rõ (không phù hợp khi vấn đề là lỗi phân quyền backend). Điều tra cho thấy MCP tool của bạn trả về các phản hồi lỗi đồng nhất: {\"isError\": true, \"content\": [{\"type\": \"text\", \"text\": \"Operation failed\"}]}. Agent không thể phân biệt giữa các loại lỗi. Cải tiến nào hiệu quả nhất?",
    "optionsEN": [
      "A. Enhance error responses with structured metadata: include errorCategory (transient/validation/permission), isRetryable boolean, and a description of what caused the failure.",
      "B. Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action.",
      "C. Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.",
      "D. Add few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each."
    ],
    "options": [
      "A. Cải thiện error response bằng structured metadata: bao gồm errorCategory (transient/validation/permission), boolean isRetryable, và mô tả nguyên nhân gây ra lỗi.",
      "B. Tạo một MCP tool tên analyze_error mà agent gọi sau mỗi lần thất bại để xác định loại lỗi (error category) và hành động được đề xuất.",
      "C. Triển khai retry logic với exponential backoff trong MCP server của bạn cho tất cả các lỗi, chỉ trả về cho agent sau khi retry đã hết lượt.",
      "D. Thêm few-shot example vào system prompt minh họa cách diễn giải các pattern trong error message và chọn phản hồi phù hợp cho từng loại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Cung cấp cho agent thông tin nó cần để đưa ra quyết định đúng: loại lỗi (category), khả năng thử lại (retryability), và một nguyên nhân dễ đọc cho con người. Điều đó thay thế việc đoán mò bằng chính sách tất định (deterministic policy). Một tool analyze_error bổ sung (B) thêm một vòng gọi round-trip cho thông tin mà tool gốc đã biết sẵn, việc thử lại vô điều kiện (blanket retries) (C) gây hại trên các lỗi vĩnh viễn (permanent errors) và che giấu các phân biệt hữu ích, và các ví dụ few-shot (D) không thể trích xuất thông tin category không hề có mặt trong một chuỗi \"Operation failed\" đồng nhất.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Give the agent the information it needs to make the right decision: category, retryability, and a human-readable cause. That replaces guessing with deterministic policy. An extra analyze_error tool (B) adds a round-trip for information the original tool already knows, blanket retries (C) hurt on permanent errors and hide useful distinctions, and few-shot examples (D) can't extract category information that isn't present in a uniform \"Operation failed\" string.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nCung cấp cho agent thông tin nó cần để đưa ra quyết định đúng: loại lỗi (category), khả năng thử lại (retryability), và một nguyên nhân dễ đọc cho con người. Điều đó thay thế việc đoán mò bằng chính sách tất định (deterministic policy). Một tool analyze_error bổ sung (B) thêm một vòng gọi round-trip cho thông tin mà tool gốc đã biết sẵn, việc thử lại vô điều kiện (blanket retries) (C) gây hại trên các lỗi vĩnh viễn (permanent errors) và che giấu các phân biệt hữu ích, và các ví dụ few-shot (D) không thể trích xuất thông tin category không hề có mặt trong một chuỗi \"Operation failed\" đồng nhất.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-155",
    "originalId": "lnq-038",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p7",
    "difficulty": "application",
    "scenarioId": "s-ccaf-038",
    "questionEN": "Your agent is handling a billing dispute. After calling get_customer and lookup_order, it identifies that the dispute involves a promotional pricing error requiring manager approval—beyond the agent's authorization level. How should the workflow handle this mid-process escalation?",
    "question": "Agent của bạn đang xử lý một tranh chấp hóa đơn (billing dispute). Sau khi gọi get_customer và lookup_order, nó xác định rằng tranh chấp liên quan đến một lỗi định giá khuyến mãi (promotional pricing error) cần có sự phê duyệt của quản lý — vượt quá cấp độ ủy quyền (authorization level) của agent. Quy trình nên xử lý việc chuyển tiếp giữa chừng (mid-process escalation) này như thế nào?",
    "optionsEN": [
      "A. Call escalate_to_human passing only the customer's original message.",
      "B. Compile a structured handoff with customer details, order info, and the identified issue before calling escalate_to_human.",
      "C. Attempt the refund with process_refund anyway, escalating only if the system rejects the transaction.",
      "D. Persist the complete conversation and tool response history to a database, then call escalate_to_human with a reference ID."
    ],
    "options": [
      "A. Gọi escalate_to_human chỉ với message gốc của khách hàng.",
      "B. Biên soạn một bản handoff có cấu trúc gồm thông tin khách hàng, thông tin đơn hàng, và vấn đề đã xác định trước khi gọi escalate_to_human.",
      "C. Vẫn thử hoàn tiền bằng process_refund, chỉ escalate nếu hệ thống từ chối giao dịch.",
      "D. Lưu trữ toàn bộ lịch sử hội thoại và tool response vào một database, sau đó gọi escalate_to_human kèm theo một reference ID."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Một bản tóm tắt có cấu trúc (structured brief) (ai, đơn hàng nào, vấn đề gì, tại sao vượt quá thẩm quyền) cho phép nhân viên con người tiếp nhận ngay lập tức — đó là mẫu hình chuyển tiếp giữa chừng (mid-process escalation pattern). Việc chỉ chuyển tiếp tin nhắn gốc (A) bỏ mất context đã thu thập được từ tool, việc cố xử lý khoản hoàn tiền dù sao (C) là cố ý vượt quá thẩm quyền, một vi phạm chính sách, và việc lưu trữ (persist) vào một cơ sở dữ liệu với một reference ID (D) thêm hạ tầng và một bước tra cứu bổ sung trong khi một bản tóm tắt có cấu trúc nội tuyến (inline) đơn giản và nhanh hơn.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "A structured brief (who, what order, what issue, why it exceeds authorization) lets the human agent pick up instantly — that's the mid-process escalation pattern. Passing only the original message (A) drops the tool-derived context already gathered, attempting the refund anyway (C) is knowingly exceeding authorization, a policy violation, and persisting to a database with a reference ID (D) adds infrastructure and an extra lookup step when an inline structured brief is simpler and faster.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nMột bản tóm tắt có cấu trúc (structured brief) (ai, đơn hàng nào, vấn đề gì, tại sao vượt quá thẩm quyền) cho phép nhân viên con người tiếp nhận ngay lập tức — đó là mẫu hình chuyển tiếp giữa chừng (mid-process escalation pattern). Việc chỉ chuyển tiếp tin nhắn gốc (A) bỏ mất context đã thu thập được từ tool, việc cố xử lý khoản hoàn tiền dù sao (C) là cố ý vượt quá thẩm quyền, một vi phạm chính sách, và việc lưu trữ (persist) vào một cơ sở dữ liệu với một reference ID (D) thêm hạ tầng và một bước tra cứu bổ sung trong khi một bản tóm tắt có cấu trúc nội tuyến (inline) đơn giản và nhanh hơn.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-158",
    "originalId": "lnq-041",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-041",
    "questionEN": "Your process_refund tool returns two types of errors: technical errors (\"503 Service Unavailable\", \"Connection timeout\") that are transient (5% of calls), and business errors (\"Order exceeds 30-day return window\", \"Item already refunded\") that are permanent (12% of calls). Monitoring shows the agent wastes 3-4 turns retrying business errors that can never succeed. Currently, both error types return only a plain text message to Claude. What's the most effective way to reduce wasted retries while improving customer-facing response quality?",
    "question": "Tool process_refund của bạn trả về hai loại lỗi: lỗi kỹ thuật (\"503 Service Unavailable\", \"Connection timeout\") mang tính tạm thời (5% số lần gọi), và lỗi nghiệp vụ (\"Order exceeds 30-day return window\", \"Item already refunded\") mang tính vĩnh viễn (12% số lần gọi). Dữ liệu giám sát cho thấy agent lãng phí 3-4 lượt retry cho các lỗi nghiệp vụ vốn không bao giờ có thể thành công. Hiện tại, cả hai loại lỗi đều chỉ trả về một thông điệp văn bản thuần túy cho Claude. Đâu là cách hiệu quả nhất để giảm số lần retry lãng phí trong khi vẫn cải thiện chất lượng phản hồi hướng tới khách hàng?",
    "optionsEN": [
      "A. Return structured error responses with retryable: false for business errors and a customer-friendly explanation for Claude to use.",
      "B. Add few-shot examples showing how to distinguish retryable from non-retryable errors by parsing error message text.",
      "C. Add a check_refund_eligibility tool that must be called before process_refund to prevent business rule violations.",
      "D. Implement automatic retry logic at the tool level for technical errors only, passing business errors to Claude without retries."
    ],
    "options": [
      "A. Trả về structured error responses với retryable: false cho các lỗi nghiệp vụ (business errors) kèm theo lời giải thích thân thiện với khách hàng để Claude sử dụng.",
      "B. Thêm các few-shot examples minh họa cách phân biệt lỗi có thể retry với lỗi không thể retry bằng cách phân tích (parse) nội dung văn bản của thông báo lỗi.",
      "C. Thêm một tool check_refund_eligibility phải được gọi trước process_refund để ngăn chặn vi phạm quy tắc nghiệp vụ (business rule).",
      "D. Triển khai logic tự động retry ở cấp độ tool chỉ cho các lỗi kỹ thuật, còn các lỗi nghiệp vụ được chuyển cho Claude mà không thực hiện retry."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Một cờ retryable báo cho Claude biết một cách xác định rằng \"đừng retry\", còn một thông điệp thân thiện với khách hàng đã được soạn sẵn giúp cải thiện câu trả lời gửi đi — giải quyết cả hai vấn đề cùng lúc. Việc dựa vào mô hình để phân tích (text-parse) các chuỗi lỗi (phương án B) là mong manh, một tool kiểm tra điều kiện đủ điều kiện (eligibility-check, phương án C) làm tăng thêm một vòng round-trip cho mọi lần hoàn tiền và vẫn không giúp gì khi process_refund thất bại vì lý do khác, còn việc giấu các lần retry bên trong tool (phương án D) có thể che khuất độ trễ (latency) và vẫn để lại lỗi nghiệp vụ dưới dạng chuỗi văn bản thuần túy.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "A retryable flag tells Claude deterministically \"don't retry,\" and a ready-made customer-friendly message improves the outgoing reply — fixing both problems at once. Relying on the model to text-parse error strings (B) is fragile, an eligibility-check tool (C) adds a round-trip to every refund and still doesn't help when process_refund fails for other reasons, and hiding retries inside the tool (D) can mask latency and still leaves business errors as a plain string.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nMột cờ retryable báo cho Claude biết một cách xác định rằng \"đừng retry\", còn một thông điệp thân thiện với khách hàng đã được soạn sẵn giúp cải thiện câu trả lời gửi đi — giải quyết cả hai vấn đề cùng lúc. Việc dựa vào mô hình để phân tích (text-parse) các chuỗi lỗi (phương án B) là mong manh, một tool kiểm tra điều kiện đủ điều kiện (eligibility-check, phương án C) làm tăng thêm một vòng round-trip cho mọi lần hoàn tiền và vẫn không giúp gì khi process_refund thất bại vì lý do khác, còn việc giấu các lần retry bên trong tool (phương án D) có thể che khuất độ trễ (latency) và vẫn để lại lỗi nghiệp vụ dưới dạng chuỗi văn bản thuần túy.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-160",
    "originalId": "lnq-093",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-079",
    "questionEN": "Your search products tool queries an external catalog API that returns paginated results (50 items per request). Production logs show queries frequently match 200+ products, and the design that auto-fetches all pages causes 15-20 second delays. How should you redesign the pagination handling?",
    "question": "Search products tool của bạn truy vấn một external catalog API trả về kết quả phân trang (paginated results) (50 items mỗi request). Logs production cho thấy các truy vấn thường khớp với hơn 200 products, và thiết kế hiện tại tự động fetch tất cả các trang (auto-fetches all pages) gây ra độ trễ 15-20 giây. Bạn nên thiết kế lại việc xử lý pagination như thế nào?",
    "optionsEN": [
      "A. Create separate search products and fetch more results tools for pagination.",
      "B. Implement server-side relevance ranking and return only the top 50 most relevant items.",
      "C. Add a max pages parameter (default: 2) that controls how many pages are fetched internally.",
      "D. Return the first page with total match count and cursor for additional pages."
    ],
    "options": [
      "A. Tạo các tool riêng biệt là search và fetch more results để phục vụ phân trang (pagination).",
      "B. Triển khai xếp hạng mức độ liên quan (relevance ranking) ở phía server và chỉ trả về 50 mục liên quan nhất (top 50).",
      "C. Thêm một tham số max pages (mặc định: 2) để kiểm soát số trang được lấy (fetch) nội bộ.",
      "D. Trả về trang đầu tiên cùng với tổng số kết quả khớp (total match count) và cursor cho các trang tiếp theo."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế."
    ],
    "rationale": "Option D is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-162",
    "originalId": "lnq-095",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-081",
    "questionEN": "Your MCP server implements a check_availability tool that queries an external calendar API. During testing, you encounter three error conditions: (1) the tool is called with a malformed request, missing the required user_email parameter (2) the calendar API returns a 404 because the specified user doesn't exist in the calendar system (3) the calendar API returns a 503 because the service is temporarily unavailable. How should each error be reported according to MCP's error handling design?",
    "question": "MCP server của bạn triển khai một tool check_availability truy vấn một external calendar API. Trong quá trình testing, bạn gặp phải ba tình huống lỗi: (1) tool được gọi với một request bị lỗi định dạng (malformed), thiếu tham số user_email bắt buộc; (2) calendar API trả về lỗi 404 vì user được chỉ định không tồn tại trong hệ thống calendar; (3) calendar API trả về lỗi 503 vì service tạm thời không khả dụng. Mỗi lỗi nên được báo cáo như thế nào theo thiết kế xử lý lỗi (error handling design) của MCP?",
    "optionsEN": [
      "A. Report all three as tool results with isError: true",
      "B. Report errors 1 and 2 as JSON-RPC protocol errors, report error 3 as a tool result with isError: true",
      "C. Report error 1 as a JSON-RPC protocol error, report errors 2 and 3 as tool results with isError: true",
      "D. Report all three as JSON-RPC protocol errors."
    ],
    "options": [
      "A. Báo cáo cả ba lỗi dưới dạng tool result với isError: true",
      "B. Báo cáo lỗi 1 và 2 dưới dạng JSON-RPC protocol error, báo cáo lỗi 3 dưới dạng tool result với isError: true",
      "C. Báo cáo lỗi 1 dưới dạng JSON-RPC protocol error, báo cáo lỗi 2 và 3 dưới dạng tool result với isError: true",
      "D. Báo cáo cả ba lỗi dưới dạng JSON-RPC protocol error."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-165",
    "originalId": "lnq-098",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-084",
    "questionEN": "Your publish article tool calls an external CMS API that occasionally returns transient errors (network timeouts, 503s) and non-transient errors (403 permission denied, 422 validation failure). Currently, every error is returned directly to the agent, which leads to the agent retrying non-transient errors and wasting turns on failures that will never succeed. How should you partition error-handling responsibility between the tool implementation and the agent?",
    "question": "Tool publish article của bạn gọi một CMS API bên ngoài, API này thỉnh thoảng trả về các lỗi tạm thời (transient errors) (network timeout, lỗi 503) và các lỗi không tạm thời (non-transient errors) (403 permission denied, 422 validation failure). Hiện tại, mọi lỗi đều được trả trực tiếp về cho agent, khiến agent retry các lỗi non-transient và lãng phí lượt (turns) vào những lỗi sẽ không bao giờ thành công. Bạn nên phân chia trách nhiệm xử lý lỗi (error-handling) giữa phần triển khai tool và agent như thế nào?",
    "optionsEN": [
      "A. Handle all errors inside the tool: Implement retries with exponential backoff for every error type, and only surface a failure to the agent after a fixed number of retry attempts have been exhausted.",
      "B. Handle transient errors (timeouts, 503s) with automatic retries inside the tool implementation, and surface non-transient errors (permission denied, validation fallures) to the agent with descriptive messages so it can take corrective action.",
      "C. Surface all errors to the agent immediately with detailed context, and let the agent decide which errors to retry and how many times-keeping the tool implementation stateless and simple.",
      "D. Implement a universal error handler that catches all exceptions and returns a generic \"tool unavailable- try again later\" message, shielding the agent from error complexity."
    ],
    "options": [
      "A. Xử lý tất cả lỗi bên trong tool: triển khai cơ chế retry với exponential backoff cho mọi loại lỗi, và chỉ báo lỗi (failure) cho agent sau khi đã hết một số lần retry cố định.",
      "B. Xử lý các lỗi tạm thời (transient errors) (timeout, lỗi 503) bằng cách tự động retry ngay bên trong phần triển khai tool, và báo các lỗi không tạm thời (non-transient errors) (permission denied, validation failures) cho agent kèm thông báo mô tả rõ ràng để agent có thể thực hiện hành động khắc phục.",
      "C. Báo ngay tất cả lỗi cho agent kèm ngữ cảnh (context) chi tiết, để agent tự quyết định lỗi nào cần retry và retry bao nhiêu lần - giữ cho phần triển khai tool ở trạng thái stateless và đơn giản.",
      "D. Triển khai một trình xử lý lỗi (error handler) chung, bắt tất cả exception và trả về thông báo chung chung \"tool unavailable - try again later\", giúp agent không phải tiếp xúc với sự phức tạp của lỗi."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-166",
    "originalId": "lnq-099",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p8",
    "difficulty": "application",
    "scenarioId": "s-ccaf-085",
    "questionEN": "Your remove_team_member tool uses a dry_run: boolean parameter for previewing impacts before execution. Production monitoring shows the agent bypasses the preview step in 15% of calls by calling with dry_run=false directly. You need to ensure every removal is preceded by a preview that the user explicitly confirms. What is the most reliable approach?",
    "question": "Tool remove_team_member của bạn sử dụng tham số dry_run: boolean để xem trước (preview) tác động trước khi thực thi. Giám sát production cho thấy agent bỏ qua bước preview trong 15% số lần gọi bằng cách gọi trực tiếp với dry_run=false. Bạn cần đảm bảo mọi thao tác xóa (removal) đều phải được preview trước và được user xác nhận rõ ràng. Đâu là cách tiếp cận đáng tin cậy nhất?",
    "optionsEN": [
      "A. Add server-side validation that permits dry_run=false only when a dry_run=true call with identical parameters occurred within the past 60 seconds.",
      "B. Replace with two tools: preview_remove_member returns impact details and a single-use confirmation token; execute_remove_member requires that token, binding execution to the specific previewed action.",
      "C. Annotate the tool as requiring confirmation and configure the orchestration layer to prompt the user for approval before forwarding any calls to annotated tools.",
      "D. Add detailed instructions and few-shot examples to the tool description requiring the agent to always call with dry_run=true first and wait for user confirmation before calling with dry_run=false."
    ],
    "options": [
      "A. Thêm validation phía server (server-side) chỉ cho phép dry_run=false khi trước đó, trong vòng 60 giây, đã có một lệnh gọi dry_run=true với các tham số (parameters) giống hệt.",
      "B. Thay bằng hai tool: preview_remove_member trả về chi tiết tác động (impact) và một confirmation token dùng một lần; execute_remove_member yêu cầu token đó, ràng buộc việc thực thi với đúng hành động đã được xem trước (previewed).",
      "C. Gắn annotation cho tool là yêu cầu xác nhận (requiring confirmation), và cấu hình lớp điều phối (orchestration layer) để yêu cầu người dùng phê duyệt (approval) trước khi chuyển tiếp bất kỳ lệnh gọi nào đến các tool đã được annotate.",
      "D. Thêm hướng dẫn chi tiết và few-shot examples vào mô tả (description) của tool, yêu cầu agent luôn gọi với dry_run=true trước và chờ người dùng xác nhận trước khi gọi với dry_run=false."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-170",
    "originalId": "lnq-106",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-092",
    "questionEN": "Your CRM agent's delete_contact tool handles requests like \"delete the duplicate entry for Acme Corp.\" The database contains similarly named records (e.g., \"Acme Corp,\" \"Acme Corporation,\" \"ACME Corp Inc.\"), and analytics show 8% of deletions are reversed within 24 hours due to misidentified records. Users have also complained that the current multi-step confirmation flow adds too much friction to routine cleanup tasks. Which approach most effectively reduces the error rate while maintaining workflow efficiency?",
    "question": "Tool delete_contact của agent CRM của bạn xử lý các yêu cầu như \"delete the duplicate entry for Acme Corp.\" Database chứa các bản ghi có tên tương tự nhau (ví dụ: \"Acme Corp,\" \"Acme Corporation,\" \"ACME Corp Inc.\"), và số liệu phân tích cho thấy 8% các lượt xóa (deletion) bị hoàn tác (reverse) trong vòng 24 giờ do xác định nhầm bản ghi. Người dùng cũng phàn nàn rằng luồng xác nhận nhiều bước (multi-step confirmation flow) hiện tại gây quá nhiều vướng víu (friction) cho các tác vụ dọn dẹp thông thường. Cách tiếp cận nào giảm tỷ lệ lỗi hiệu quả nhất trong khi vẫn duy trì hiệu suất làm việc (workflow efficiency)?",
    "optionsEN": [
      "A. Present matched records with differentiating fields and require single-click confirmation of the intended target before executing deletion.",
      "B. Require users to supply the exact record ID from the CRM Interface rather than using natural language references to contact names.",
      "C. Deploy automated duplicate detection that identifies and merges probable duplicates, removing the need for manual deletion requests.",
      "D. Implement soft-delete with a 30-day recovery window so users can undo mistakes without slowing down the deletion workflow."
    ],
    "options": [
      "A. Hiển thị các bản ghi (record) khớp cùng các trường (field) giúp phân biệt, và yêu cầu xác nhận bằng một cú click (single-click confirmation) về đối tượng (target) dự định trước khi thực hiện xóa.",
      "B. Yêu cầu người dùng cung cấp chính xác record ID từ giao diện CRM (CRM Interface) thay vì dùng các tham chiếu bằng ngôn ngữ tự nhiên đến tên liên hệ (contact).",
      "C. Triển khai (deploy) cơ chế phát hiện trùng lặp (duplicate detection) tự động, xác định và gộp (merge) các bản ghi có khả năng trùng lặp, loại bỏ nhu cầu yêu cầu xóa thủ công.",
      "D. Triển khai soft-delete với thời gian có thể khôi phục (recovery window) 30 ngày, để người dùng có thể hoàn tác (undo) sai sót mà không làm chậm quy trình (workflow) xóa."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-173",
    "originalId": "lnq-120",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-098",
    "questionEN": "The extraction pipeline receives documents of varying types—some are invoices, others are contracts, and some are receipts. You've defined separate extraction tools, each with its own schema tailored to the document type. During testing, you observe that with tool_choice: \"auto\", Claude sometimes returns conversational text instead of calling an extraction tool, causing downstream parsing failures. You need guaranteed structured output without knowing the document type in advance. What's the most effective approach?",
    "question": "Pipeline extraction nhận các tài liệu thuộc nhiều loại khác nhau—một số là hóa đơn, một số là hợp đồng, và một số là biên lai. Bạn đã định nghĩa các extraction tool riêng biệt, mỗi tool có schema riêng phù hợp với loại tài liệu. Trong quá trình testing, bạn quan sát thấy rằng với tool_choice: \"auto\", Claude đôi khi trả về văn bản hội thoại (conversational text) thay vì gọi một extraction tool, gây ra lỗi parsing ở downstream. Bạn cần đảm bảo có structured output mà không biết trước loại tài liệu. Đâu là cách tiếp cận hiệu quả nhất?",
    "optionsEN": [
      "A. Consolidate all document types into a single unified-schema extraction tool and force that tool.",
      "B. Keep tool_choice: \"auto\" with system prompt instructions requiring tool use.",
      "C. Set tool_choice: \"any\" with all extraction tools defined.",
      "D. Add a preliminary classification call, then make a second call with tool_choice forced to the identified extraction tool."
    ],
    "options": [
      "A. Hợp nhất tất cả các loại tài liệu vào một tool trích xuất duy nhất có unified schema, và force tool đó.",
      "B. Giữ tool_choice: \"auto\" cùng với các hướng dẫn trong system prompt yêu cầu phải sử dụng tool.",
      "C. Đặt tool_choice: \"any\" với tất cả các tool trích xuất đã được định nghĩa.",
      "D. Thêm một lệnh gọi phân loại sơ bộ (preliminary classification call), sau đó thực hiện lệnh gọi thứ hai với tool_choice được force vào tool trích xuất đã xác định."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-181",
    "originalId": "lnq-143",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-115",
    "questionEN": "Production monitoring shows your search_catalog tool fails 12% of the time: 8% are network timeouts that succeed when immediately retried, while 4% are query syntax errors from malformed user-provided filters that never succeed regardless of retry attempts. Currently, both error types are returned to the agent identically, causing it to waste turns retrying syntax errors and telling users to \"try again later\" for timeouts. How should you modify the tool's error handling?",
    "question": "Giám sát production cho thấy tool search_catalog của bạn thất bại 12% số lần: 8% là do timeout mạng và sẽ thành công nếu thử lại ngay lập tức, trong khi 4% là lỗi cú pháp truy vấn (query syntax error) do các bộ lọc (filter) do người dùng cung cấp bị sai định dạng, và sẽ không bao giờ thành công dù thử lại bao nhiêu lần. Hiện tại, cả hai loại lỗi đều được trả về cho agent giống hệt nhau, khiến agent lãng phí lượt để thử lại các lỗi cú pháp và báo người dùng \"thử lại sau\" đối với các lỗi timeout. Bạn nên sửa đổi cách xử lý lỗi của tool này như thế nào?",
    "optionsEN": [
      "A. Apply exponential backoff retry logic to all errors uniformly, returning a generic \"service temporarily unavailable\" message after max retries are exhausted.",
      "B. Return all errors with a retryable boolean flag and error type details.",
      "C. Implement automatic retry with backoff for network timeouts inside the tool; return syntax errors immediately with parameter validation details.",
      "D. Add few-shot examples to your system prompt demonstrating how to distinguish network errors from syntax errors and handle each case appropriately."
    ],
    "options": [
      "A. Áp dụng logic thử lại (retry) với exponential backoff một cách đồng nhất cho tất cả các lỗi, trả về một thông báo chung \"service temporarily unavailable\" sau khi đã hết số lần thử lại tối đa.",
      "B. Trả về tất cả các lỗi kèm theo một cờ boolean retryable và thông tin chi tiết về loại lỗi.",
      "C. Triển khai tự động thử lại (retry) với backoff cho các network timeout ngay bên trong tool; trả về ngay lập tức các lỗi cú pháp (syntax error) kèm thông tin chi tiết về việc xác thực tham số (parameter validation).",
      "D. Thêm các ví dụ few-shot vào system prompt của bạn minh họa cách phân biệt lỗi mạng (network error) với lỗi cú pháp (syntax error) và xử lý phù hợp cho từng trường hợp."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-182",
    "originalId": "lnq-146",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-117",
    "questionEN": "Your agent includes an update_game_score tool that accepts game_date (string), home_team (string), and away_team (string) parameters. Production logs reveal recurring issues: the agent uses team nicknames instead of official names, applies inconsistent date formats, and selects the wrong game when teams have rematches in the same season. What tool interface change would effectively prevent these errors?",
    "question": "Agent của bạn có một tool update_game_score nhận các tham số game_date (string), home_team (string), và away_team (string). Log production cho thấy các vấn đề lặp lại: agent sử dụng biệt danh (nickname) của đội thay vì tên chính thức, áp dụng định dạng ngày không nhất quán, và chọn sai trận đấu khi các đội có trận tái đấu (rematch) trong cùng mùa giải. Thay đổi nào đối với giao diện tool sẽ ngăn chặn hiệu quả các lỗi này?",
    "optionsEN": [
      "A. Add a season parameter to disambiguate rematches, and add a confirm_before_update flag that returns the resolved game details for the agent to verify before the score is committed.",
      "B. Add detailed examples to the tool description showing the required date format and complete list of official team names.",
      "C. Add enum constraints listing valid team names for both team parameters, and add a regex pattern enforcing ISO 8601 format for the date parameter.",
      "D. Replace the three parameters with a single game_id parameter and a separate search_games lookup tool that returns matching game IDs."
    ],
    "options": [
      "A. Thêm một tham số season để làm rõ các trận đấu lại (rematch), và thêm một cờ confirm_before_update để trả về thông tin chi tiết trận đấu đã được xác định (resolved) cho agent kiểm tra trước khi tỷ số được ghi nhận.",
      "B. Thêm các ví dụ chi tiết vào mô tả tool cho thấy định dạng ngày tháng cần thiết và danh sách đầy đủ tên các đội chính thức.",
      "C. Thêm các ràng buộc enum liệt kê tên đội hợp lệ cho cả hai tham số đội, và thêm một mẫu regex bắt buộc định dạng ISO 8601 cho tham số ngày.",
      "D. Thay thế ba tham số bằng một tham số duy nhất game_id và một tool tra cứu riêng biệt search_games trả về các game ID phù hợp."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế."
    ],
    "rationale": "Option D is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-186",
    "originalId": "lnq-196",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-142",
    "questionEN": "The system needs to extract candidate information (name, contact details, skills, work experience, education) from uploaded resumes. The extracted data must strictly conform to a predefined JSON schema, as missing required fields or incorrect data types will cause downstream validation failures. What is the most reliable approach to ensure Claude's output consistently matches the schema?",
    "question": "Hệ thống cần trích xuất thông tin ứng viên (tên, thông tin liên hệ, kỹ năng, kinh nghiệm làm việc, học vấn) từ các bản resume được tải lên. Dữ liệu trích xuất phải tuân thủ nghiêm ngặt một JSON schema được định nghĩa trước, vì việc thiếu các field bắt buộc hoặc sai kiểu dữ liệu sẽ gây ra lỗi validate ở các bước xử lý tiếp theo (downstream). Đâu là cách tiếp cận đáng tin cậy nhất để đảm bảo output của Claude luôn khớp với schema?",
    "optionsEN": [
      "A. Define a tool with an input schema matching your required JSON structure and extract the data from Claude's tool_use response.",
      "B. Include detailed JSON formatting instructions and a template example in the system prompt, asking Claude to output only valid JSON.",
      "C. Parse Claude's text response with regex patterns to extract JSON objects, using retry logic for malformed responses.",
      "D. Make two separate API calls—first extracting information as text, then asking Claude to format that text as JSON."
    ],
    "options": [
      "A. Định nghĩa một tool với input schema khớp với cấu trúc JSON bạn yêu cầu, và trích xuất dữ liệu từ phản hồi tool_use của Claude.",
      "B. Đưa các hướng dẫn định dạng JSON chi tiết cùng một ví dụ mẫu (template) vào system prompt, yêu cầu Claude chỉ xuất ra JSON hợp lệ.",
      "C. Parse phản hồi dạng text của Claude bằng các mẫu regex để trích xuất các đối tượng JSON, sử dụng cơ chế retry cho các phản hồi bị lỗi định dạng.",
      "D. Thực hiện hai lượt gọi API riêng biệt — trước tiên trích xuất thông tin dưới dạng text, sau đó yêu cầu Claude định dạng đoạn text đó thành JSON."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-187",
    "originalId": "lnq-198",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p4",
    "difficulty": "application",
    "scenarioId": "s-ccaf-144",
    "questionEN": "After expanding the agent's MCP tools with delivery-specific capabilities (check_delivery_status, contact_driver, issue_credit, apply_promo_code, update_delivery_address, reschedule_delivery), the total tool count has grown from 4 to 10. Your evaluation suite shows tool selection accuracy has dropped to 71%. Log analysis reveals the majority of errors involve the agent selecting between semantically overlapping tools- calling issue_credit when process_refund is correct, and calling check_delivery_status when lookup_order already returns the needed data. Which approach structurally eliminates the semantic overlaps that are being logged as the error source?",
    "question": "Sau khi mở rộng bộ MCP tools của agent với các khả năng chuyên biệt cho giao hàng (check_delivery_status, contact_driver, issue_credit, apply_promo_code, update_delivery_address, reschedule_delivery), tổng số tool đã tăng từ 4 lên 10. Bộ evaluation của bạn cho thấy tool selection accuracy đã giảm xuống còn 71%. Phân tích log cho thấy phần lớn lỗi liên quan đến việc agent chọn nhầm giữa các tool có ý nghĩa trùng lặp về mặt ngữ nghĩa - gọi issue_credit trong khi process_refund mới là lựa chọn đúng, và gọi check_delivery_status trong khi lookup_order đã trả về dữ liệu cần thiết. Cách tiếp cận nào giúp loại bỏ tận gốc (về mặt cấu trúc) sự trùng lặp ngữ nghĩa đang được ghi nhận là nguyên nhân gây lỗi?",
    "optionsEN": [
      "A. Split the tools across two sub-agents - a \"financial resolution\" agent with process_refund, issue_credit, and apply_promo_code, and a \"delivery\" agent with the remaining delivery tools - with a coordinator routing between them.",
      "B. Add few-shot examples to the system prompt demonstrating correct selection for each ambiguous tool pair, such as showing when issue_credit or process_refund is appropriate.",
      "C. Consolidate semantically overlapping tools-merge issue_credit and process_refund into a single resolve_compensation tool with an optional include_tracking flag.",
      "D. Enable the tool search tool with defer_loading on the six new tools, keeping the original four always loaded, so the agent dynamically calls it when needed."
    ],
    "options": [
      "A. Chia các tool ra hai subagent - một agent \"financial resolution\" (giải quyết tài chính) gồm process_refund, issue_credit, và apply_promo_code, và một agent \"delivery\" (giao hàng) gồm các tool giao hàng còn lại - với một coordinator điều phối giữa chúng.",
      "B. Thêm các few-shot examples vào system prompt minh họa cách lựa chọn đúng cho từng cặp tool mơ hồ, chẳng hạn cho thấy khi nào issue_credit hay process_refund là phù hợp.",
      "C. Hợp nhất các tool trùng lặp về mặt ngữ nghĩa - gộp issue_credit và process_refund thành một tool resolve_compensation duy nhất với một flag include_tracking tùy chọn.",
      "D. Bật tool search tool với defer_loading trên sáu tool mới, giữ bốn tool ban đầu luôn được load sẵn, để agent gọi tool search một cách linh hoạt khi cần."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-188",
    "originalId": "lnq-199",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-145",
    "questionEN": "Anthropic's tool use documentation states: \"Write instructive error messages. Instead of generic errors like 'failed', include what went wrong and what Claude should try next.\" A billing dispute agent uses lookup_order, which catches all exceptions and returns a tool_result with is_error: true and the message \"execution failed\". Monitoring shows two failure modes: the agent retries the identical call until hitting the turn limit, or it immediately calls escalate_to_human without trying alternative tools. Which change follows the documented recommendation and gives Claude the information it needs to select the correct recovery action for each error type?",
    "question": "Tài liệu về tool use của Anthropic nêu rõ: \"Write instructive error messages. Instead of generic errors like 'failed', include what went wrong and what Claude should try next.\" Một agent xử lý tranh chấp hóa đơn (billing dispute) sử dụng lookup_order, tool này bắt (catch) tất cả exception và trả về một tool_result với is_error: true kèm thông báo \"execution failed\". Việc giám sát (monitoring) cho thấy hai kiểu lỗi: agent lặp lại y hệt lệnh gọi đó cho đến khi chạm giới hạn turn, hoặc nó lập tức gọi escalate_to_human mà không thử các tool thay thế. Thay đổi nào tuân theo khuyến nghị nêu trên và cung cấp cho Claude thông tin cần thiết để chọn đúng hành động khôi phục (recovery action) cho từng loại lỗi?",
    "optionsEN": [
      "A. Implement retry logic with exponential backoff inside each tool implementation so transient errors are resolved transparently within the tool before any failure result is surfaced to Claude in the agentic loop.",
      "B. Return error-type-specific messages with is_error: true, e.g., \"order not found-try get_customer to search by phone\" for data errors and \"Database timeout (transient)-retry should succeed\" for infrastructure errors.",
      "C. Remove is_error: true and return the error details as normal tool content, so Claude reasons about the response as data rather than treating it as a flagged failure condition that biases retry behavior.",
      "D. Add an error classification step in the agentic loop that intercepts tool errors before Claude sees them, tags each as \"retry\" \"try_alternative,\" or \"escalate,\" and adds that recommendation to the tool result."
    ],
    "options": [
      "A. Triển khai retry logic với exponential backoff bên trong từng tool implementation để các lỗi tạm thời (transient errors) được xử lý một cách minh bạch ngay trong tool trước khi bất kỳ kết quả lỗi nào được hiển thị cho Claude trong agentic loop.",
      "B. Trả về các thông báo riêng theo từng loại lỗi với is_error: true, ví dụ: \"order not found - try get_customer to search by phone\" cho lỗi dữ liệu và \"Database timeout (transient) - retry should succeed\" cho lỗi hạ tầng.",
      "C. Bỏ is_error: true và trả về chi tiết lỗi như nội dung tool bình thường, để Claude suy luận về phản hồi đó như dữ liệu thay vì coi đó là một điều kiện lỗi được gắn cờ làm thiên lệch hành vi retry.",
      "D. Thêm một bước phân loại lỗi trong agentic loop để chặn các lỗi tool trước khi Claude nhìn thấy, gắn nhãn mỗi lỗi là \"retry\", \"try_alternative,\" hoặc \"escalate,\" và thêm khuyến nghị đó vào tool result."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-189",
    "originalId": "lnq-205",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-148",
    "questionEN": "Production logs show that when the agent handles complex billing disputes requiring 6+ tool calls, it sometimes exhausts its max_turns limit after gathering data and before completing resolution or escalating. The team's goal is to guarantee that every customer interaction ends with either a completed resolution or a human escalation, regardless of how the agent loop terminates. Which approach achieves this guarantee?",
    "question": "Log production cho thấy khi agent xử lý các tranh chấp hóa đơn phức tạp cần từ 6 tool call trở lên, đôi khi nó chạm giới hạn max_turns sau khi đã thu thập dữ liệu nhưng trước khi hoàn tất việc giải quyết hoặc leo thang (escalate). Mục tiêu của team là đảm bảo mọi tương tác với khách hàng đều kết thúc bằng một trong hai kết quả: giải quyết hoàn tất hoặc leo thang lên con người (human escalation), bất kể agent loop kết thúc theo cách nào. Cách tiếp cận nào đạt được sự đảm bảo này?",
    "optionsEN": [
      "A. Add orchestration-layer code that checks the agent's outcome after each loop termination - if the loop ended without a completed resolution or escalation, programmatically call escalate_to_human with the accumulated conversation context and tool results.",
      "B. Implement a pre-tool-use hook that counts tool invocations and terminates the loop with an automatic escalation once the agent reaches 80% of its remaining actions.",
      "C. Add system prompt instructions telling the agent to call escalate_to_human with a summary of its findings whenever it determines it cannot resolve the dispute.",
      "D. Split the workflow into two sequential agent invocations — a first agent gathers information via get_customer and lookup_order, then the second agent uses that data and handles process_refund or escalate_to_human, each with separate turn budgets."
    ],
    "options": [
      "A. Thêm code ở lớp orchestration để kiểm tra kết quả của agent sau mỗi lần kết thúc loop - nếu loop kết thúc mà không có một resolution hoàn chỉnh hoặc escalation, gọi escalate_to_human bằng lập trình kèm theo context hội thoại tích lũy và kết quả tool.",
      "B. Triển khai một pre-tool-use hook đếm số lần gọi tool và kết thúc loop với một escalation tự động khi agent đạt 80% số hành động còn lại của nó.",
      "C. Thêm hướng dẫn vào system prompt yêu cầu agent gọi escalate_to_human kèm bản tóm tắt các phát hiện của nó bất cứ khi nào nó xác định rằng không thể giải quyết tranh chấp.",
      "D. Chia quy trình thành hai lần gọi agent tuần tự - agent đầu tiên thu thập thông tin qua get_customer và lookup_order, sau đó agent thứ hai sử dụng dữ liệu đó và xử lý process_refund hoặc escalate_to_human, mỗi agent có ngân sách lượt (turn budget) riêng."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-190",
    "originalId": "lnq-213",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "D2 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-149",
    "questionEN": "Your automated review calls the Claude API for each PR, using tool_use with a report_findings tool that returns a JSON array of finding objects (each with file_path, line_number, severity, category, and description). During testing on a large PR touching 30+ files, the response hits the max_tokens limit and the output is truncated mid-JSON, causing your pipeline's parser to fail. What is the most effective way to handle this?",
    "question": "Automated review của bạn gọi Claude API cho mỗi PR, sử dụng tool_use với một tool report_findings trả về một mảng JSON các finding object (mỗi object gồm file_path, line_number, severity, category, và description). Khi test trên một PR lớn chạm vào hơn 30 file, response đạt tới giới hạn max_tokens và output bị cắt cụt (truncated) giữa chừng JSON, khiến parser của pipeline gặp lỗi. Đâu là cách hiệu quả nhất để xử lý tình huống này?",
    "optionsEN": [
      "A. Increase max_tokens to the model's maximum and instruct Claude to keep finding descriptions under 50 words each.",
      "B. Switch from tool_use to prompting Claude to return findings as a markdown list.",
      "C. Split the review into multiple API calls that each analyze a subset of the changed files, then merge the resulting findings arrays.",
      "D. Add retry logic that detects truncated JSON and re-sends the request with instructions to report only critical and high severity findings."
    ],
    "options": [
      "A. Tăng max_tokens lên mức tối đa của model và yêu cầu Claude giữ mỗi mô tả phát hiện dưới 50 từ.",
      "B. Chuyển từ tool_use sang việc prompt Claude trả về các phát hiện dưới dạng danh sách markdown.",
      "C. Chia việc review thành nhiều lệnh gọi API, mỗi lệnh phân tích một tập con của các file đã thay đổi, sau đó gộp các mảng findings kết quả lại.",
      "D. Thêm retry logic để phát hiện JSON bị cắt cụt (truncated) và gửi lại yêu cầu kèm hướng dẫn chỉ báo cáo các phát hiện có mức độ nghiêm trọng critical và high."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-191",
    "originalId": "lnq-222",
    "source": "LNQuyen",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "d2-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-155",
    "questionEN": "Production logs reveal inconsistent error handling: when tool_code fails, the agent sometimes retries 5 times (even if the tool_id doesn't exist), sometimes escalates immediately (premature for temporary network issues), and sometimes adds user-friendly explanation (inappropriate when the issue is a backend permission error). Investigation shows four MCP tool returns uniform error responses: {\"status\": \"error\", \"content\": \"{\"type\": \"Error\", \"message\": \"Operation failed.\"}\"}. The agent learns different types. What's the most effective improvement?",
    "question": "Log production cho thấy việc xử lý lỗi không nhất quán: khi tool_code thất bại, agent đôi khi retry 5 lần (ngay cả khi tool_id không tồn tại), đôi khi escalate ngay lập tức (quá sớm đối với các vấn đề mạng tạm thời), và đôi khi thêm giải thích thân thiện với người dùng (không phù hợp khi vấn đề là lỗi permission ở backend). Điều tra cho thấy bốn MCP tool trả về các phản hồi lỗi đồng nhất: {\"status\": \"error\", \"content\": \"{\"type\": \"Error\", \"message\": \"Operation failed.\"}\"}. Agent học các loại khác nhau. Cải tiến nào hiệu quả nhất?",
    "optionsEN": [
      "A. Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.",
      "B. Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action.",
      "C. Add a few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.",
      "D. Enhance error responses with structured metadata. Include error_category (transient/retriable/permission), reason, and a description of what caused the failure."
    ],
    "options": [
      "A. Triển khai logic retry với exponential backoff trong MCP server của bạn cho mọi lỗi, chỉ trả kết quả về cho agent sau khi đã hết số lần retry.",
      "B. Tạo một MCP tool tên analyze_error mà agent gọi sau bất kỳ lỗi nào để xác định loại lỗi và hành động được đề xuất.",
      "C. Thêm các ví dụ few-shot vào system prompt minh họa cách diễn giải các mẫu thông báo lỗi và chọn phản hồi phù hợp cho từng loại.",
      "D. Tăng cường các phản hồi lỗi bằng metadata có cấu trúc. Bao gồm error_category (transient/retriable/permission), lý do (reason), và mô tả nguyên nhân gây ra lỗi."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế."
    ],
    "rationale": "Option D is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "originalId": "q-2-1-011",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / descriptions",
    "difficulty": "application",
    "scenarioId": "s-q-2-1-011",
    "questionEN": "Your federated query platform exposes several similar search tools, and Claude keeps routing requests to the wrong one. Which changes improve tool selection reliability? (Select 3)",
    "question": "Nền tảng truy vấn liên kết của bạn cung cấp nhiều công cụ tìm kiếm tương tự nhau, và Claude liên tục định tuyến yêu cầu nhầm công cụ. Những thay đổi nào giúp cải thiện độ tin cậy khi lựa chọn công cụ? (Chọn 3 đáp án đúng)",
    "optionsEN": [
      "A. Rename tools whose names overlap so each name reflects a distinct function.",
      "B. Trim every description to one short sentence so the model relies on tool names alone.",
      "C. Check the system prompt for keyword-sensitive instructions that create unintended bias.",
      "D. Rewrite each description to state the tool's purpose, inputs and outputs, and when not to use it.",
      "E. Merge the similar tools into one generic tool with a mode parameter."
    ],
    "options": [
      "A. Đổi tên các công cụ có tên trùng lặp để mỗi tên phản ánh một chức năng riêng biệt.",
      "B. Cắt giảm mọi mô tả xuống một câu ngắn để mô hình chỉ dựa vào tên công cụ.",
      "C. Kiểm tra system prompt để tìm các chỉ dẫn nhạy cảm với từ khóa tạo ra thiên kiến không mong muốn.",
      "D. Viết lại từng mô tả để nêu rõ mục đích của công cụ, đầu vào và đầu ra, và khi nào không nên dùng nó.",
      "E. Hợp nhất các công cụ tương tự thành một công cụ chung với tham số chế độ (mode)."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Distinct names reduce semantic confusion when tools have overlapping or similar domains.",
      "Option B ❌ (SAI): Shortening descriptions removes vital context for tool discrimination and hurts accuracy.",
      "Option C ✅ (ĐÚNG): System prompt phrasing can inadvertently bias Claude toward specific tool names; auditing removes unintended bias.",
      "Option D ✅ (ĐÚNG): Explaining purpose, schema, and negative guidance ('when NOT to use') is the most effective way to eliminate tool confusion.",
      "Option E ❌ (SAI): Mega-tools with mode parameters degrade reliability and complicate argument schemas."
    ],
    "rationale": "Reliable tool selection requires distinct tool names, comprehensive descriptions with negative guidance (when not to use), and eliminating prompt biases.",
    "explanation": "3 biện pháp cải thiện việc chọn tool của Claude: đổi tên công cụ rõ ràng (A), loại bỏ thiên kiến từ khóa trong prompt (C), và viết lại mô tả nêu rõ mục đích kèm hướng dẫn khi nào KHÔNG nên dùng (D). Hợp nhất thành multi-mode tool (E) là anti-pattern.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Interface Design (Misrouting)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design#the-misrouting-problem"
      },
      {
        "label": "Lesson 2.1: Tool Interface Design (Dialect-specific descriptions)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design#what-makes-a-good-tool-description"
      },
      {
        "label": "Anthropic: Tool Use Documentation",
        "url": "https://platform.claude.com/docs/en/build-with-claude/tool-use"
      }
    ],
    "id": "ccaf-217",
    "multiple": true
  },
  {
    "originalId": "q-2-2-002",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / business-error",
    "difficulty": "application",
    "scenarioId": "s-q-2-2-002",
    "questionEN": "A support agent tries to refund $850, but policy caps automated refunds at $500. The MCP tool returns 'Operation failed' as its error. The agent retries three times before escalating to a human. What change to the tool's error response would most effectively prevent this behaviour?",
    "question": "Agent hỗ trợ khách hàng thử hoàn tiền 850$, nhưng chính sách giới hạn hoàn tiền tự động tối đa là 500$. Tool MCP trả về lỗi dạng chuỗi 'Operation failed'. Agent thử lại 3 lần rồi mới chuyển cho con người. Thay đổi nào trong phản hồi lỗi của tool sẽ ngăn chặn hành vi thử lại vô ích này?",
    "optionsEN": [
      "A. Include a longer error message explaining the policy: 'Operation failed because the refund amount of $850 exceeds the $500 automated refund limit'.",
      "B. Set the MCP isError flag and add a retry-after header so the agent waits before retrying.",
      "C. Return a structured error with errorCategory: 'business', isRetryable: false, and a customer-friendly description explaining the policy limit.",
      "D. Catch the error in the agent's system prompt with an instruction: 'Never retry refund operations that fail'."
    ],
    "options": [
      "A. Đưa thông điệp lỗi dài hơn giải thích chi tiết chính sách 500$.",
      "B. Đặt cờ isError của MCP và thêm header retry-after để agent chờ trước khi thử lại.",
      "C. Trả về lỗi có cấu trúc với errorCategory: 'business', isRetryable: false kèm mô tả thân thiện giải thích giới hạn chính sách.",
      "D. Bắt lỗi trong system prompt với chỉ thị: 'Không bao giờ thử lại thao tác hoàn tiền bị thất bại'."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): A better message helps human readers but does not give the agent structured metadata to determine that retrying is futile. The agent needs machine-readable fields, not just better prose.",
      "Option B ❌ (SAI): A retry-after header implies the error is transient and will resolve with time. A business policy violation is never transient — no amount of waiting will change the refund limit. This would cause delayed retries that still fail.",
      "Option C ✅ (ĐÚNG): Business errors are never retryable — retrying a policy violation will always fail. Structured metadata with errorCategory and isRetryable: false tells the agent to stop retrying and take an alternative path, such as offering partial refund or escalating to a supervisor.",
      "Option D ❌ (SAI): Hard-coding retry rules per operation in the system prompt is brittle and does not scale. The proper fix is structured error metadata that the agent's recovery logic can interpret programmatically for any tool."
    ],
    "rationale": "Business errors are never retryable — retrying a policy violation will always fail. Structured metadata with errorCategory and isRetryable: false tells the agent to stop retrying and take an alternative path, such as offering partial refund or escalating to a supervisor.",
    "explanation": "Lỗi vi phạm chính sách nghiệp vụ (business policy) là lỗi vĩnh viễn không thể khắc phục bằng cách thử lại. Việc trả về metadata cấu trúc `isRetryable: false` giúp model dừng retry ngay lập tức.",
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses (Error categories)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses#the-four-error-categories"
      }
    ],
    "id": "ccaf-219"
  },
  {
    "originalId": "q-2-2-005",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / transient-error",
    "difficulty": "application",
    "scenarioId": "s-q-2-2-005",
    "questionEN": "A research agent calls an external API via an MCP server. After the 30th query in a batch of 50, the API starts returning HTTP 429 errors. The MCP server returns a generic 'Request failed' for every failure, so the agent abandons the batch after three consecutive failures. What MCP server change would most improve resilience?",
    "question": "Nếu một tool cơ sở dữ liệu trả về thông báo lỗi dạng: 'ERROR: relation \"orders_v2\" does not exist at character 15', model có xu hướng xử lý như thế nào?",
    "optionsEN": [
      "A. Implement automatic retry with exponential backoff inside the MCP server, hiding rate limits from the agent entirely.",
      "B. Return errorCategory: 'transient', isRetryable: true, with a retryAfterMs field telling the agent how long to wait.",
      "C. Return errorCategory: 'business', isRetryable: false to tell the agent to stop making requests entirely.",
      "D. Queue all 50 requests at the MCP server level and process them sequentially with built-in rate limiting."
    ],
    "options": [
      "A. Tự động chuyển sang gọi một tool khác hoàn toàn không liên quan.",
      "B. Phân tích lỗi cú pháp SQL và có thể cố gắng truy vấn schema để tìm tên bảng chính xác, hoặc điều chỉnh lại câu lệnh SQL cho đúng.",
      "C. Ngừng hoạt động và đóng phiên trò chuyện ngay lập tức.",
      "D. Báo cáo với người dùng rằng cơ sở dữ liệu đã bị xóa vĩnh viễn."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Hiding rate limits from the agent removes its ability to make informed decisions, such as prioritising remaining queries, switching to cached results, or reporting partial progress. The agent should receive structured metadata to decide its own recovery strategy.",
      "Option B ✅ (ĐÚNG): Rate limiting is a transient error — it will resolve after a delay. Structured metadata with the specific retry delay lets the agent space out remaining queries intelligently rather than abandoning the batch. The agent can continue processing other tasks while waiting.",
      "Option C ❌ (SAI): Rate limits are transient (they resolve after a delay), not business errors (which represent policy or rule violations the agent cannot recover from). Marking them as non-retryable causes the agent to abandon 20 remaining queries that would succeed after a brief delay.",
      "Option D ❌ (SAI): Server-side queuing removes the agent's ability to prioritise, cancel, or reorder queries based on intermediate results. It also creates a long-running blocking call that prevents the agent from doing other work."
    ],
    "rationale": "Rate limiting is a transient error — it will resolve after a delay. Structured metadata with the specific retry delay lets the agent space out remaining queries intelligently rather than abandoning the batch. The agent can continue processing other tasks while waiting.",
    "explanation": "Thông báo lỗi kỹ thuật chi tiết từ cơ sở dữ liệu cung cấp manh mối để Claude tự chẩn đoán lỗi (như tên bảng sai) và thực hiện các bước khắc phục phù hợp.",
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses (Transient errors and retry-after)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses#the-four-error-categories"
      }
    ],
    "id": "ccaf-221"
  },
  {
    "originalId": "q-2-2-006",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / error-categories",
    "difficulty": "application",
    "scenarioId": "s-q-2-2-006",
    "questionEN": "A `search_papers` MCP tool has three failure patterns: (1) the upstream academic API returns HTTP 503 during peak hours, (2) users request papers from a restricted journal the system has no licence for, and (3) the agent submits a malformed DOI like 'doi-1234' that fails the input regex. The team wants structured error metadata so agents can handle each case differently. Which `errorCategory` and `isRetryable` combination is correct for all three?",
    "question": "Khi một MCP tool gặp lỗi xác thực tham số đầu vào (ví dụ người dùng nhập ngày sinh ở tương lai), phản hồi nào là tối ưu?",
    "optionsEN": [
      "A. All three should be errorCategory: 'transient', isRetryable: true, since they all prevent the tool from completing its task.",
      "B. HTTP 503: transient/retryable; restricted journal: business/not retryable; malformed DOI: validation/retryable.",
      "C. HTTP 503: transient/retryable; restricted journal: transient/retryable; malformed DOI: transient/retryable.",
      "D. HTTP 503: validation/retryable; restricted journal: business/not retryable; malformed DOI: business/not retryable."
    ],
    "options": [
      "A. Trả về mã lỗi 500 Server Error.",
      "B. Trả về đối tượng lỗi với category: 'validation', isRetryable: false kèm thông báo rõ ràng trường nào không hợp lệ và lý do vi phạm để model điều chỉnh tham số.",
      "C. Âm thầm thay đổi ngày sinh về ngày hiện tại mà không báo cho model.",
      "D. Dừng hoàn toàn vòng lặp agent."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Lumping every failure into 'transient' is the canonical anti-pattern. The restricted journal case is a business error (licence policy); the agent must escalate, not retry. The malformed DOI is validation; the agent must repair the input format first.",
      "Option B ✅ (ĐÚNG): HTTP 503 is a temporary upstream outage (transient, will likely resolve on retry). Restricted journal is a policy limitation (business, will never resolve on retry — escalate or offer an alternative source). Malformed DOI is validation; the agent must repair the input and then retry.",
      "Option C ❌ (SAI): The restricted journal error is not transient — the system lacks a licence, and no amount of retrying will grant access. A malformed DOI is validation, not transient; the agent must repair the input rather than blindly retry the same value.",
      "Option D ❌ (SAI): HTTP 503 is transient (a temporary upstream outage), not validation — nothing is wrong with the request input. A malformed DOI is validation (fix input and retry), not business — business errors represent policy or rule violations, not input format problems."
    ],
    "rationale": "The canonical four errorCategory values map cleanly to these three failure patterns. HTTP 503 is a temporary upstream outage (transient, retryable). A restricted journal is a policy limitation (business, not retryable — the agent must escalate or pick an alternative source). A malformed DOI is a validation failure (the agent repairs the input format then retries the same call). Pairing each category with the correct isRetryable boolean lets the agent loop pick the right recovery path.",
    "explanation": "Lỗi xác thực (validation error) cần chỉ rõ trường bị lỗi và tiêu chí hợp lệ để model có thể tự sửa đổi giá trị tham số trong lượt gọi tiếp theo.",
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses (Four error categories)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses#the-four-error-categories"
      }
    ],
    "id": "ccaf-222"
  },
  {
    "originalId": "q-2-2-008",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / access-vs-empty",
    "difficulty": "application",
    "scenarioId": "s-q-2-2-008",
    "questionEN": "The data platform's fetch_api tool calls a third-party pricing API. When the API key has expired, the tool returns { \"data\": [], \"status\": \"ok\" } instead of signalling an authentication failure. The agent tells the user 'No pricing data is available for that product' and moves on. What is the root cause?",
    "question": "Tool fetch_api gọi đến một API định giá bên thứ ba. Khi API key hết hạn, tool trả về `{ \"data\": [], \"status\": \"ok\" }` thay vì báo lỗi xác thực. Agent trả lời người dùng 'Không có dữ liệu giá cho sản phẩm đó' và kết thúc. Nguyên nhân gốc rễ là gì?",
    "optionsEN": [
      "A. The agent should be instructed via the system prompt to treat empty arrays as errors and retry with exponential backoff.",
      "B. The tool cannot distinguish an access failure (expired key) from a valid empty result, so the agent treats a permission error as no data.",
      "C. The third-party API is poorly designed. The platform team should switch to a different pricing provider that returns proper HTTP error codes.",
      "D. The agent's context window is too small to hold the full API response, so it receives a truncated version that appears empty."
    ],
    "options": [
      "A. Agent nên được dặn qua system prompt phải coi mảng rỗng là lỗi và thử lại.",
      "B. Tool không phân biệt được lỗi truy cập (hết hạn key) với kết quả rỗng hợp lệ, khiến agent nhầm lẫn lỗi phân quyền thành không có dữ liệu.",
      "C. API bên thứ ba thiết kế kém và cần đổi nhà cung cấp.",
      "D. Context window của agent quá nhỏ để chứa phản hồi API."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Not all empty arrays are errors — a product with no pricing data is a valid empty result. The problem is that the tool masks an authentication failure as a successful empty response. System prompt instructions cannot reliably distinguish the two.",
      "Option B ✅ (ĐÚNG): The tool returns the same structure for two fundamentally different outcomes: 'I could not access the data' versus 'I accessed the data and found nothing.' The agent cannot distinguish these and accepts the empty result at face value. The tool must return a structured error with the MCP isError flag for authentication failures.",
      "Option C ❌ (SAI): Whilst the upstream API behaviour is unhelpful, the platform team controls the MCP tool layer. The tool should detect the authentication failure (even from the upstream response) and translate it into a structured MCP error rather than passing through the misleading response.",
      "Option D ❌ (SAI): Context window truncation would not produce a well-formed { \"data\": [], \"status\": \"ok\" } response. The problem is semantic — the tool is returning a misleading success status for an authentication failure."
    ],
    "rationale": "The tool returns the same structure for two fundamentally different outcomes: 'I could not access the data' versus 'I accessed the data and found nothing.' The agent cannot distinguish these and accepts the empty result at face value. The tool must return a structured error with the MCP isError flag for authentication failures.",
    "explanation": "Tool trả về cùng một cấu trúc `{ data: [] }` cho hai tình huống bản chất hoàn toàn khác nhau: 'không thể truy cập dữ liệu do mất quyền' và 'đã truy cập thành công nhưng không có dữ liệu'.",
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses (Access failure vs empty result)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses#access-failure-vs-valid-empty-result"
      }
    ],
    "id": "ccaf-224"
  },
  {
    "originalId": "q-2-2-010",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / access-vs-empty",
    "difficulty": "application",
    "scenarioId": "s-q-2-2-010",
    "questionEN": "A customer support agent calls a payment processing tool to check a refund status. The tool returns: {\"status\": \"success\", \"data\": [], \"message\": \"No refunds found for this transaction\"}. The agent's recovery logic treats this as an error and retries the request. What is wrong with the agent's behaviour?",
    "question": "Agent hỗ trợ khách hàng gọi tool thanh toán để kiểm tra trạng thái hoàn tiền. Tool trả về: `{\"status\": \"success\", \"data\": [], \"message\": \"Không tìm thấy khoản hoàn tiền nào cho giao dịch này\"}`. Logic phục hồi của agent coi đây là lỗi và gửi lại yêu cầu. Điều gì sai trong hành vi của agent?",
    "optionsEN": [
      "A. The agent should retry more times, as the payment system may be slow to process refund records.",
      "B. The agent wrongly treats a valid empty result as a failure, not a successful query that found no records.",
      "C. The tool should not return an empty array — it should return an error with isRetryable: false to prevent the retry.",
      "D. The agent should escalate to a human immediately instead of retrying, as payment queries should never be retried."
    ],
    "options": [
      "A. Agent nên thử lại nhiều lần hơn vì hệ thống cổng thanh toán có thể bị nghẽn.",
      "B. Agent đã xử lý sai khi coi một kết quả rỗng hợp lệ (status: success nhưng không có bản ghi) là một lỗi thất bại của hệ thống.",
      "C. Tool không được trả về mảng rỗng mà phải ném exception isRetryable: false.",
      "D. Agent nên chuyển tiếp cho con người ngay lập tức."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): The tool returned status 'success' with a clear message. This is not a slow-processing issue — the query completed successfully and found no refunds. Retrying will produce the same result.",
      "Option B ✅ (ĐÚNG): An empty array result is not a failure when the status indicates success. The tool queried the payment system, found no refund records, and returned that information correctly. The agent should inform the customer that no refund exists for this transaction, not retry.",
      "Option C ❌ (SAI): The tool response is correct — a successful query with no results should return an empty array with a success status. The problem is the agent's recovery logic failing to distinguish valid empty results from actual errors.",
      "Option D ❌ (SAI): There is nothing to escalate. The query succeeded and returned a valid result: no refunds exist. The agent should simply communicate this to the customer."
    ],
    "rationale": "An empty array result is not a failure when the status indicates success. The tool queried the payment system, found no refund records, and returned that information correctly. The agent should inform the customer that no refund exists for this transaction, not retry.",
    "explanation": "Một mảng rỗng khi status là thành công chứng minh truy vấn hoàn tất trơn tru nhưng không có dữ liệu khớp, việc thử lại chỉ làm lãng phí tài nguyên hệ thống.",
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses (Access failure vs empty result)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses#access-failure-vs-valid-empty-result"
      }
    ],
    "id": "ccaf-226"
  },
  {
    "originalId": "q-2-2-011",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / error-context",
    "difficulty": "application",
    "scenarioId": "s-q-2-2-011",
    "questionEN": "A research subagent's database query fails partway through an investigation. Which pieces of information belong in the structured error context it returns to the coordinator? (Select 3)",
    "question": "Một truy vấn cơ sở dữ liệu của research subagent bị lỗi giữa chừng trong quá trình điều tra. Những thông tin nào bắt buộc phải có trong ngữ cảnh lỗi có cấu trúc trả về cho coordinator? (Chọn 3 đáp án đúng)",
    "optionsEN": [
      "A. No report at all: the subagent should retry silently until the query succeeds.",
      "B. Partial results gathered before the failure.",
      "C. The failure type, such as transient, validation, or permission.",
      "D. What was attempted, including the query that failed.",
      "E. A plain 'no results found' message in place of the error."
    ],
    "options": [
      "A. Hoàn toàn không báo cáo gì: subagent nên tự động thử lại trong im lặng cho đến khi truy vấn thành công.",
      "B. Kết quả một phần đã thu thập được trước khi xảy ra lỗi.",
      "C. Phân loại lỗi, chẳng hạn như tạm thời (transient), xác thực (validation), hoặc quyền truy cập (permission).",
      "D. Những gì đã được cố gắng thực hiện, bao gồm cả câu truy vấn bị lỗi.",
      "E. Một thông báo chung 'không tìm thấy kết quả' thay cho thông tin lỗi."
    ],
    "correct": [
      1,
      2,
      3
    ],
    "optionExplanations": [
      "Option A ❌ (SAI): Silent retries lead to infinite loops and hide failures from the coordinator.",
      "Option B ✅ (ĐÚNG): Partial results preserve valuable work done before the failure, avoiding redundant calls.",
      "Option C ✅ (ĐÚNG): Explicit failure types (transient vs permanent vs permission) allow the coordinator to decide whether to retry or escalate.",
      "Option D ✅ (ĐÚNG): Logging what was attempted and the exact query provides actionable context for error remediation.",
      "Option E ❌ (SAI): Masking errors as 'no results' misleads the coordinator into false negative conclusions."
    ],
    "rationale": "Structured error handling in multi-agent systems requires preserving partial results, classifying the failure type, and reporting what was attempted.",
    "explanation": "Ngữ cảnh lỗi có cấu trúc phải gồm: kết quả một phần đã có (B) để không lãng phí, loại lỗi (C) để biết có nên thử lại hay không, và câu lệnh đã cố gắng thực thi (D) để coordinator điều chỉnh chiến lược.",
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses (Four error categories)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses#the-four-error-categories"
      },
      {
        "label": "Lesson 2.2: Structured Error Responses (Access failure vs empty result)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses#access-failure-vs-valid-empty-result"
      },
      {
        "label": "MCP: Tools Specification",
        "url": "https://modelcontextprotocol.io/docs/concepts/tools"
      }
    ],
    "id": "ccaf-227",
    "multiple": true
  },
  {
    "originalId": "q-2-4-010",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / config-scope",
    "difficulty": "application",
    "scenarioId": "s-q-2-4-010",
    "questionEN": "A team's shared `.mcp.json` configures a PostgreSQL MCP server. A developer adds a personal staging database MCP server to their `~/.claude.json`, so both database tools are available in their session. When they query 'check user count', the agent calls the production tool instead of staging. What is the best resolution?",
    "question": "File `.mcp.json` dùng chung của nhóm cấu hình một PostgreSQL MCP server (production). Một lập trình viên thêm một server MCP database staging cá nhân vào `~/.claude.json`. Khi họ truy vấn 'kiểm tra số lượng người dùng', agent lại gọi tool production thay vì staging. Cách giải quyết tốt nhất là gì?",
    "optionsEN": [
      "A. Remove the production database from .mcp.json during testing so only the staging server is available.",
      "B. Rename the staging tool to a distinct name, put its environment in the description, and add a session rule that staging tools take precedence.",
      "C. Move the personal staging server into the shared .mcp.json beside production and let the agent pick between them from each server's connection string.",
      "D. Use tool_choice with forced selection of the staging database tool for all turns during testing."
    ],
    "options": [
      "A. Tạm thời xóa database production khỏi .mcp.json khi test.",
      "B. Đổi tên tool staging thành một tên phân biệt rõ ràng, đưa môi trường 'staging' vào phần mô tả, và thêm quy tắc phiên rằng tool staging được ưu tiên.",
      "C. Đưa server staging vào file .mcp.json chung.",
      "D. Ép buộc tool_choice chọn tool staging cho mọi lượt gọi."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Modifying the shared .mcp.json affects all team members and removes production access for legitimate use. The configuration should not be altered for one developer's testing needs.",
      "Option B ✅ (ĐÚNG): Description tuning alone cannot route a context-free prompt like 'check user count' because the user gave the agent no environment cue. The fix is to make the two tools structurally distinguishable (distinct names, environment in the description) and to give the agent an explicit routing rule for the session. Renaming sits inside the developer's own ~/.claude.json so it does not affect the shared team configuration.",
      "Option C ❌ (SAI): Personal staging infrastructure does not belong in the shared .mcp.json, and agents route by tool name and description, not by connection strings, so this neither isolates the config nor fixes selection.",
      "Option D ❌ (SAI): Forced selection prevents the agent from calling any other tool, including production database queries that may be needed for comparison or non-test tasks during the session."
    ],
    "rationale": "When two similar tools are available, description tuning alone cannot route an ambiguous prompt — the user said 'check user count' with no environment signal. The fix combines a distinct tool name, environment-aware description, and a session-level routing instruction. All three changes live in the developer's own ~/.claude.json so the shared team configuration is untouched.",
    "explanation": "Khi có hai tool tương tự nhau, việc đổi tên công cụ rõ ràng kèm thông tin môi trường cụ thể trong mô tả sẽ giúp model định tuyến chính xác tới môi trường mong muốn.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration (User vs project scope)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration#the-scoping-hierarchy"
      },
      {
        "label": "Lesson 2.1: Tool Interface Design (Differentiating similar tools)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design#what-makes-a-good-tool-description"
      }
    ],
    "id": "ccaf-243"
  },
  {
    "originalId": "q-2-4-012",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / resources",
    "difficulty": "application",
    "scenarioId": "s-q-2-4-012",
    "questionEN": "A data-analysis agent connects to an MCP server that exposes 40 database tables. Before almost every query, the agent makes several exploratory tool calls to discover which tables exist and what columns they hold, adding latency and token cost to each task. The server author wants to remove this discovery overhead. What is the most effective change?",
    "question": "Một agent phân tích dữ liệu kết nối tới MCP server có 40 bảng cơ sở dữ liệu. Trước hầu hết mọi truy vấn, agent phải gọi nhiều lệnh tool thăm dò để khám phá xem có những bảng nào và chứa những cột gì, gây tốn độ trễ và chi phí token. Tác giả server nên làm gì để loại bỏ chi phí thăm dò này?",
    "optionsEN": [
      "A. Expose the table catalogue and column schemas as MCP resources for upfront visibility.",
      "B. Add a describe_schema tool and instruct the agent in its system prompt to call it before every query.",
      "C. Enlarge the agent's context window so it can retain the results of the discovery calls across turns.",
      "D. Reduce the server to the five most frequently queried tables so there is less to discover."
    ],
    "options": [
      "A. Xuất bản danh mục bảng và schema các cột dưới dạng MCP Resources để agent có thể nhìn thấy ngay từ đầu ngữ cảnh.",
      "B. Thêm tool describe_schema và dặn agent trong system prompt gọi nó trước mỗi truy vấn.",
      "C. Tăng context window của agent.",
      "D. Giảm số lượng bảng trên server xuống còn 5 bảng thường dùng nhất."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): MCP resources expose content catalogues such as database schemas, documentation hierarchies, and issue summaries, giving the agent visibility into available data upfront. The agent no longer needs to call list_tables and then describe_table for each table, which removes the discovery overhead entirely.",
      "Option B ❌ (SAI): This keeps an exploratory tool call on every task, which is the exact overhead the author wants to remove. Resources present the catalogue without a per-task call.",
      "Option C ❌ (SAI): A larger context window does not stop the agent making the discovery calls; it still pays the latency and token cost on each task and merely stores the results.",
      "Option D ❌ (SAI): This discards capability the agent legitimately needs and still leaves discovery calls for the remaining tables. It treats the symptom, not the discovery mechanism."
    ],
    "rationale": "MCP resources expose content catalogues (e.g. database schemas) so agents gain upfront visibility into available data without exploratory tool calls, cutting latency and token cost.",
    "explanation": "MCP Resources cho phép server phơi bày danh mục dữ liệu và cấu trúc schema ngay từ đầu, giúp agent có sẵn tầm nhìn về cấu trúc dữ liệu mà không cần tốn nhiều lượt gọi tool khám phá động.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration (MCP resources)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration#mcp-resources"
      },
      {
        "label": "Model Context Protocol: Resources",
        "url": "https://modelcontextprotocol.io/docs/concepts/resources"
      }
    ],
    "id": "ccaf-245"
  },
  {
    "originalId": "q-2-5-005",
    "source": "Official254",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / grep-then-read",
    "difficulty": "application",
    "scenarioId": "s-q-2-5-005",
    "questionEN": "A developer is investigating a production bug. They know the error message 'InvalidStateTransition' is logged somewhere in the codebase, but they do not know which files contain it or where the state machine is defined. What is the correct tool sequence to locate the bug?",
    "question": "Khi sử dụng tool Edit trong Claude Code để sửa một đoạn code, quy tắc bắt buộc nào đối với tham số `old_string` để việc thay thế thành công 100%?",
    "optionsEN": [
      "A. Use Glob for '**/*state*' to find state machine files, then Read each one to search for the error message.",
      "B. Grep for 'InvalidStateTransition' across the codebase, then Read the matching files.",
      "C. Use Read on common file locations like src/index.ts and src/app.ts to find the error manually.",
      "D. Use Edit to search for 'InvalidStateTransition' and replace it with a more descriptive error message."
    ],
    "options": [
      "A. old_string phải là biểu thức chính quy (regex).",
      "B. old_string phải khớp chính xác từng ký tự (kể cả khoảng trắng, thụt đầu dòng) với nội dung hiện có trong file và phải là duy nhất (unique) trong file đó.",
      "C. old_string chỉ cần chứa tên hàm cần sửa.",
      "D. old_string không được dài quá 10 ký tự."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Glob matches file paths, so it would find files with 'state' in the name, but the error string could appear in files without 'state' in their name. Reading every matched file wastes context tokens on files that may not contain the error.",
      "Option B ✅ (ĐÚNG): Grep searches file contents, so it locates every occurrence of the error string regardless of file name. Read then loads only the matching files to understand the surrounding code and state machine logic. This is the minimal, targeted approach.",
      "Option C ❌ (SAI): Guessing file locations is unreliable and wastes context tokens. The developer does not know where the error is defined, so a content search (Grep) is needed first.",
      "Option D ❌ (SAI): Edit is a modification tool, not a search tool. Using it to locate code is incorrect, and modifying error messages without understanding the bug first could mask the real issue."
    ],
    "rationale": "Grep searches file contents, making it the correct tool to locate all occurrences of the error string regardless of file name. Read then loads only the relevant files to understand context. This is the minimal, targeted approach.",
    "explanation": "Tool Edit yêu cầu `old_string` phải khớp chính xác tuyệt đối từng ký tự (exact string match) và phải xuất hiện duy nhất 1 lần trong file để tránh thay đổi nhầm vị trí.",
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools (Grep for content)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools#grep-vs-glob-the-core-distinction"
      },
      {
        "label": "Lesson 2.5: Built-in Tools (Read for files)",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools#read-write-and-edit"
      }
    ],
    "id": "ccaf-250"
  },
  {
    "id": "ccaf-262",
    "originalId": "lnq-051",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "d3-p9",
    "difficulty": "application",
    "scenarioId": "s-ccaf-051",
    "questionEN": "Your agent has analyzed a complex service module—reading 23 source files, tracing request flows, and identifying error handling patterns. A developer wants to compare two testing strategies before committing to one: end-to-end tests with mocked external services vs. snapshot tests capturing expected outputs. They need to independently develop both approaches to evaluate trade-offs. How should you manage the sessions?",
    "question": "Agent của bạn đã phân tích một module service phức tạp — đọc 23 file mã nguồn, theo dấu các luồng request, và xác định các mẫu xử lý lỗi. Một nhà phát triển muốn so sánh hai chiến lược kiểm thử trước khi quyết định chọn một: end-to-end test với các dịch vụ ngoài được mock so với snapshot test ghi lại kết quả đầu ra kỳ vọng. Họ cần phát triển độc lập cả hai cách tiếp cận để đánh giá sự đánh đổi (trade-offs). Bạn nên quản lý các phiên làm việc như thế nào?",
    "optionsEN": [
      "A. Export the analysis session's key findings to a file, then create two new sessions that reference this file.",
      "B. Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy.",
      "C. Start two fresh sessions, having each re-read the relevant source files before beginning.",
      "D. Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially."
    ],
    "options": [
      "A. Xuất các phát hiện chính của session phân tích ra một file, sau đó tạo hai session mới cùng tham chiếu đến file này.",
      "B. Resume session phân tích với fork_session được bật, tạo một nhánh (branch) riêng cho mỗi chiến lược kiểm thử (testing strategy).",
      "C. Bắt đầu hai session mới, mỗi session tự đọc lại các file mã nguồn liên quan trước khi bắt đầu.",
      "D. Tiếp tục trong session ban đầu, phát triển end-to-end test trước, sau đó phát triển snapshot test tuần tự."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Tiếp tục (resume) phiên phân tích bằng fork_session (CLI --fork-session / Agent SDK fork_session=True kèm resume) sẽ phân nhánh phiên làm việc thành các session ID mới trong khi vẫn giữ nguyên toàn bộ context phân tích và để phiên gốc không bị ảnh hưởng. Việc fork hai lần cho mỗi chiến lược kiểm thử toàn bộ phân tích 23 file mà không phải làm lại, và hai nhánh phát triển hoàn toàn độc lập với nhau — đúng như yêu cầu đã nêu. Xuất ra file (export) làm mất dữ liệu, các phiên mới hoàn toàn bỏ đi phần phân tích, còn một phiên tuần tự duy nhất thì không độc lập cũng không khách quan (unbiased).",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Resuming the analysis session with fork_session (CLI --fork-session / Agent SDK fork_session=True with resume) branches the session into new session IDs while preserving the full analysis context and leaving the original intact. Forking twice gives each testing strategy the complete 23-file analysis with no re-work, and the two branches develop completely independently — exactly the stated requirement. Exporting to a file is lossy, fresh sessions discard the analysis, and a single sequential session is neither independent nor unbiased.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTiếp tục (resume) phiên phân tích bằng fork_session (CLI --fork-session / Agent SDK fork_session=True kèm resume) sẽ phân nhánh phiên làm việc thành các session ID mới trong khi vẫn giữ nguyên toàn bộ context phân tích và để phiên gốc không bị ảnh hưởng. Việc fork hai lần cho mỗi chiến lược kiểm thử toàn bộ phân tích 23 file mà không phải làm lại, và hai nhánh phát triển hoàn toàn độc lập với nhau — đúng như yêu cầu đã nêu. Xuất ra file (export) làm mất dữ liệu, các phiên mới hoàn toàn bỏ đi phần phân tích, còn một phiên tuần tự duy nhất thì không độc lập cũng không khách quan (unbiased).",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-267",
    "originalId": "lnq-056",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "d3-p13",
    "difficulty": "application",
    "scenarioId": "s-ccaf-056",
    "questionEN": "A developer asks the agent to investigate why a specific API endpoint intermittently returns 500 errors. The codebase has 200+ files and the developer doesn't know which components are involved. The agent must trace the error through routing, middleware, business logic, and database layers. What task decomposition approach would be most effective?",
    "question": "Một nhà phát triển yêu cầu agent điều tra tại sao một API endpoint cụ thể thỉnh thoảng trả về lỗi 500. Codebase có hơn 200 file và nhà phát triển không biết những thành phần nào có liên quan. Agent phải theo dấu lỗi qua routing, middleware, logic nghiệp vụ, và các lớp cơ sở dữ liệu. Cách tiếp cận phân rã tác vụ (task decomposition) nào sẽ hiệu quả nhất?",
    "optionsEN": [
      "A. Have the agent first create a comprehensive plan mapping all code paths through the endpoint before beginning any file exploration or code reading.",
      "B. Have the agent dynamically generate investigation subtasks based on what it discovers at each step, adapting its exploration plan as new information about the error path emerges.",
      "C. Define a fixed sequence of investigation steps upfront—grep for error patterns, then read error handlers, then check database queries, then examine middleware—executing each step regardless of intermediate findings.",
      "D. Run parallel worker agents that simultaneously investigate all four layers, then synthesize their findings to identify where the error originates."
    ],
    "options": [
      "A. Để agent trước tiên tạo một kế hoạch toàn diện ánh xạ (mapping) tất cả các code path đi qua endpoint trước khi bắt đầu bất kỳ việc khám phá file hay đọc code nào.",
      "B. Để agent tự động sinh ra các investigation subtask theo cách động, dựa trên những gì nó phát hiện ở mỗi bước, điều chỉnh kế hoạch khám phá khi có thông tin mới về error path xuất hiện.",
      "C. Xác định trước một chuỗi bước điều tra cố định—grep tìm mẫu lỗi, sau đó đọc error handler, sau đó kiểm tra database query, sau đó xem xét middleware—thực hiện từng bước bất kể các phát hiện ở giữa chừng là gì.",
      "D. Chạy các worker agent song song, đồng thời điều tra cả bốn lớp (layer), sau đó tổng hợp các phát hiện của chúng để xác định lỗi bắt nguồn từ đâu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Debug về bản chất mang tính thích ứng (adaptive) — mỗi file bạn đọc sẽ thay đổi bước tiếp theo hữu ích nhất, vì vậy hãy để agent đi theo bằng chứng. Bạn không thể xây dựng một kế hoạch đúng cho một lỗi chưa rõ nguyên nhân mà không cần khám phá (phương án A), một pipeline cố định (phương án C) lãng phí công sức vào các lớp không liên quan và có thể khóa agent khỏi con đường tìm ra nguyên nhân gốc rễ thực sự, còn phân tán song song (fan-out, phương án D) hữu ích khi bạn đã có các tác vụ con có phạm vi rõ ràng, nhưng ở đây bạn sẽ phải trả gấp 4 lần chi phí để tìm kiếm ở ba lớp không phải là vấn đề.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Debugging is adaptive by nature — each file you read changes the most useful next step, so let the agent follow the evidence. You can't build a correct plan for an unknown error without exploration (A), a fixed pipeline (C) wastes work on layers that aren't involved and can lock the agent out of the actual root cause path, and parallel fan-out (D) is useful once you have well-scoped subtasks, but here you'd pay 4x the cost to look in three layers that aren't the problem.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nDebug về bản chất mang tính thích ứng (adaptive) — mỗi file bạn đọc sẽ thay đổi bước tiếp theo hữu ích nhất, vì vậy hãy để agent đi theo bằng chứng. Bạn không thể xây dựng một kế hoạch đúng cho một lỗi chưa rõ nguyên nhân mà không cần khám phá (phương án A), một pipeline cố định (phương án C) lãng phí công sức vào các lớp không liên quan và có thể khóa agent khỏi con đường tìm ra nguyên nhân gốc rễ thực sự, còn phân tán song song (fan-out, phương án D) hữu ích khi bạn đã có các tác vụ con có phạm vi rõ ràng, nhưng ở đây bạn sẽ phải trả gấp 4 lần chi phí để tìm kiếm ở ba lớp không phải là vấn đề.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-269",
    "originalId": "lnq-058",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "d3-p14",
    "difficulty": "application",
    "scenarioId": "s-ccaf-058",
    "questionEN": "Your agent needs to insert a new helper function into the middle of a 150-line utility module, between two existing functions. The Edit tool fails because its old_string parameter cannot find unique text to match — the file has repetitive docstrings, variable names, and structural patterns. What's the most reliable way to complete this insertion?",
    "question": "Agent của bạn cần chèn một hàm hỗ trợ (helper function) mới vào giữa một module tiện ích 150 dòng, giữa hai hàm hiện có. Tool Edit thất bại vì tham số old_string của nó không thể tìm thấy văn bản duy nhất để khớp — file có các docstring, tên biến, và mẫu cấu trúc lặp lại. Đâu là cách đáng tin cậy nhất để hoàn thành việc chèn này?",
    "optionsEN": [
      "A. Use Edit with an extremely long old_string capturing 30+ lines of context to guarantee uniqueness",
      "B. Use Edit's replace_all parameter to target a common pattern and embed the new function in the replacement text",
      "C. Use Bash to append the function definition to the end of the file using heredoc syntax",
      "D. Use Read to load the file, add the function at the appropriate location, then Write the updated file"
    ],
    "options": [
      "A. Dùng Edit với một old_string cực dài, chứa hơn 30 dòng ngữ cảnh để đảm bảo tính duy nhất (uniqueness).",
      "B. Dùng tham số replace_all của Edit để nhắm vào một mẫu (pattern) phổ biến và nhúng function mới vào trong văn bản thay thế (replacement text).",
      "C. Dùng Bash để nối thêm (append) định nghĩa function vào cuối file bằng cú pháp heredoc.",
      "D. Dùng Read để tải file, thêm function vào vị trí thích hợp, sau đó dùng Write để ghi lại file đã cập nhật."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Khi hợp đồng khớp duy nhất (unique-match contract) của Edit không thể được thỏa mãn trong một file lặp lại, hãy chuyển sang dùng Read, chỉnh sửa trong bộ nhớ tại đúng dòng mong muốn, rồi Write toàn bộ file trở lại. Các chuỗi khớp dài, mong manh (phương án A) thường bị trượt do khoảng trắng hoặc các chỉnh sửa nhỏ, replace_all (phương án B) sẽ làm biến đổi mọi lần xuất hiện của mẫu đó và làm hỏng toàn bộ file, còn việc thêm vào cuối (append, phương án C) đặt hàm sai vị trí vì yêu cầu là chèn nó giữa hai hàm hiện có."
    ],
    "rationale": "When Edit's unique-match contract can't be satisfied in a repetitive file, fall back to Read, modify in memory at the intended line, then Write the full file back. Long, brittle match strings (A) frequently miss due to whitespace or minor edits, replace_all (B) would mutate every occurrence of the pattern and corrupt the whole file, and appending (C) puts the function at the wrong location since the requirement is to insert it between two existing functions.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nKhi hợp đồng khớp duy nhất (unique-match contract) của Edit không thể được thỏa mãn trong một file lặp lại, hãy chuyển sang dùng Read, chỉnh sửa trong bộ nhớ tại đúng dòng mong muốn, rồi Write toàn bộ file trở lại. Các chuỗi khớp dài, mong manh (phương án A) thường bị trượt do khoảng trắng hoặc các chỉnh sửa nhỏ, replace_all (phương án B) sẽ làm biến đổi mọi lần xuất hiện của mẫu đó và làm hỏng toàn bộ file, còn việc thêm vào cuối (append, phương án C) đặt hàm sai vị trí vì yêu cầu là chèn nó giữa hai hàm hiện có.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-272",
    "originalId": "lnq-105",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "d3-p4",
    "difficulty": "application",
    "scenarioId": "s-ccaf-091",
    "questionEN": "Your MCP server includes archive_file(file_id) and delete_file(file_id) tools. Production logs show the agent calls delete_file when users ask to \"remove old backups,\" policy requires archiving backup files. Both tools currently have minimal descriptions: \"Archives a file\" and \"Deletes a file.\" Which change most directly improves tool selection?",
    "question": "MCP server của bạn bao gồm các tool archive_file(file_id) và delete_file(file_id). Log production cho thấy agent gọi delete_file khi user yêu cầu \"remove old backups,\" trong khi chính sách yêu cầu phải archive các file backup. Cả hai tool hiện đều có description tối giản: \"Archives a file\" và \"Deletes a file.\" Thay đổi nào cải thiện trực tiếp nhất việc lựa chọn tool (tool selection)?",
    "optionsEN": [
      "A. Add a confirmation step that requires users to type \"CONFIRM DELETE\" before delete_file executes.",
      "B. Implement server-side validation that rejects delete_file calls for files tagged as backups, returning an error message suggesting archive_file.",
      "C. Expand tool descriptions to clarify use cases, adding guidance like \"Do not use for backup files\" to delete_file.",
      "D. Add few-shot examples to the system prompt demonstrating that requests involving \"backup\" or \"old\" should use archive_file."
    ],
    "options": [
      "A. Thêm một bước xác nhận (confirmation), yêu cầu người dùng gõ \"CONFIRM DELETE\" trước khi delete_file thực thi.",
      "B. Triển khai validation phía server, từ chối các lệnh gọi delete_file đối với các file được gắn thẻ (tagged) là backup, trả về thông báo lỗi gợi ý sử dụng archive_file.",
      "C. Mở rộng tool description để làm rõ các use case, thêm hướng dẫn kiểu như \"Không dùng cho file backup\" vào delete_file.",
      "D. Thêm few-shot examples vào system prompt để minh họa rằng các yêu cầu có liên quan đến \"backup\" hoặc \"old\" nên dùng archive_file."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-280",
    "originalId": "lnq-192",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "D3 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-140",
    "questionEN": "You've documented API error handling conventions in a CLAUDE.md file at your project root, specifying that endpoint handlers should use a custom ApiError class. After several sessions, you notice Claude Code sometimes follows these conventions and sometimes uses generic try/catch blocks with string messages. The inconsistency appears random across different coding sessions. What's the most efficient first diagnostic step?",
    "question": "Bạn đã ghi lại các quy ước xử lý lỗi API trong một file CLAUDE.md tại thư mục gốc của dự án, quy định rằng các endpoint handler nên sử dụng một class ApiError tùy chỉnh. Sau vài phiên làm việc, bạn nhận thấy Claude Code đôi khi tuân theo các quy ước này và đôi khi lại dùng các khối try/catch chung chung với thông báo dạng chuỗi (string message). Sự không nhất quán này có vẻ ngẫu nhiên giữa các phiên coding khác nhau. Đâu là bước chẩn đoán đầu tiên hiệu quả nhất?",
    "optionsEN": [
      "A. Add more detailed code examples to your CLAUDE.md showing the exact ApiError usage pattern for different endpoint types.",
      "B. Run /memory to check which memory files are loaded and verify your CLAUDE.md is included.",
      "C. Search for conflicting instructions in ~/.claude/CLAUDE.md or ~/.claude/rules/ that might override your project conventions.",
      "D. Create path-specific rules in claude/rules/handlers.md with YAML frontmatter scoping the error handling instructions to your API handler files."
    ],
    "options": [
      "A. Thêm các ví dụ code chi tiết hơn vào CLAUDE.md của bạn, trình bày chính xác pattern sử dụng ApiError cho từng loại endpoint khác nhau.",
      "B. Chạy /memory để kiểm tra những file memory nào đang được nạp và xác nhận CLAUDE.md của bạn có được bao gồm hay không.",
      "C. Tìm kiếm các hướng dẫn xung đột trong ~/.claude/CLAUDE.md hoặc ~/.claude/rules/ có thể ghi đè lên các quy ước dự án của bạn.",
      "D. Tạo các quy tắc theo đường dẫn cụ thể trong claude/rules/handlers.md với YAML frontmatter giới hạn phạm vi các hướng dẫn xử lý lỗi cho các file handler API của bạn."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-282",
    "originalId": "lnq-214",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "D3 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-150",
    "questionEN": "You are setting up a non-interactive automated code review pipeline using Claude Code. You want Claude to analyze a pulled Git diff (git diff) against the main branch and apply a custom set of code review instructions. However, you notice that when you run the pipeline, Claude only looks at the raw diff text itself and completely stops using its file-reading or code navigation tools. As a result, it fails to inspect the broader codebase repository context, which is critical because the diff modifies a core function called by many other external modules. Which change to the CLI invocation will cause Claude to read related files in the repository while still successfully applying your custom review instructions?",
    "question": "Bạn đang thiết lập một pipeline automated code review non-interactive bằng Claude Code. Bạn muốn Claude phân tích một Git diff đã lấy (git diff) so với nhánh main và áp dụng một bộ hướng dẫn code review tùy chỉnh (custom). Tuy nhiên, bạn nhận thấy khi chạy pipeline, Claude chỉ nhìn vào phần văn bản diff thô và hoàn toàn ngừng sử dụng các tool đọc file hay điều hướng code của nó. Kết quả là nó không kiểm tra được bối cảnh (context) rộng hơn của repository, điều này rất quan trọng vì diff này sửa đổi một hàm cốt lõi (core function) được nhiều module bên ngoài khác gọi đến. Thay đổi nào trong lệnh gọi CLI sẽ khiến Claude đọc các file liên quan trong repository trong khi vẫn áp dụng thành công các hướng dẫn review tùy chỉnh của bạn?",
    "optionsEN": [
      "A. Replace --system-prompt with --append-system-prompt so your review instructions are added to Claude Code's default prompt instead of overwriting the built-in guidance for using file-reading and code navigation tools.",
      "B. Keep --system-prompt and add --allowedTools \"Read, Glob, Grep\" so that the non-interactive mode permits file system tools that it otherwise disables.",
      "C. Stop piping the diff via stdin and instead embed the diff contents inside the prompt string, so Claude Code treats the invocation as an agentic session rather than a stream-processing one.",
      "D. Remove --system-prompt entirely and place the review instructions in a CLAUDE.md file at the repo root, since --system-prompt is incompatible with tool use under -p."
    ],
    "options": [
      "A. Thay --system-prompt bằng --append-system-prompt để các hướng dẫn review của bạn được thêm vào prompt mặc định của Claude Code thay vì ghi đè lên hướng dẫn có sẵn cho việc dùng các tool đọc file và điều hướng code.",
      "B. Giữ --system-prompt và thêm --allowedTools \"Read, Glob, Grep\" để chế độ non-interactive cho phép các tool hệ thống file mà nó vốn tắt.",
      "C. Ngừng pipe diff qua stdin và thay vào đó nhúng nội dung diff vào trong chuỗi prompt, để Claude Code xử lý lệnh gọi này như một agentic session thay vì một phiên xử lý luồng (stream-processing).",
      "D. Bỏ hẳn --system-prompt và đặt các hướng dẫn review vào một file CLAUDE.md tại thư mục gốc repo, vì --system-prompt không tương thích với việc dùng tool khi chạy dưới -p."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-283",
    "originalId": "lnq-215",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "d3-p2",
    "difficulty": "application",
    "scenarioId": "s-ccaf-151",
    "questionEN": "Your development team is using Claude Code to automate test generation across a large codebase. However, developers are frequently rejecting the generated test suites because Claude creates a high volume of trivial assertions or tests that merely maximize line coverage without validating meaningful behavioral logic or edge cases. You want to guide Claude to generate high-quality, production-ready tests directly without introducing high latency or modifying the core pipeline script. Which strategy best ensures that high-quality, meaningful tests are generated in the first place?",
    "question": "Team phát triển của bạn đang dùng Claude Code để tự động hóa việc tạo test trên một codebase lớn. Tuy nhiên, các developer thường xuyên từ chối các bộ test được tạo ra vì Claude tạo ra một lượng lớn assertion tầm thường hoặc các test chỉ nhằm tối đa hóa line coverage mà không kiểm chứng logic hành vi có ý nghĩa hay các edge case. Bạn muốn hướng dẫn Claude tạo ra ngay từ đầu các test chất lượng cao, sẵn sàng cho production, mà không gây độ trễ (latency) cao hay phải sửa đổi pipeline script cốt lõi. Chiến lược nào đảm bảo tốt nhất rằng các test chất lượng cao, có ý nghĩa sẽ được tạo ra ngay từ đầu?",
    "optionsEN": [
      "A. Restrict test generation to directories where historical quality metrics show higher acceptance rates, disabling it for areas where generated tests consistently require heavy editing.",
      "B. Add post-generation coverage analysis that automatically filters out any generated test that doesn't increase line coverage beyond what existing tests provide.",
      "C. Document testing standards in CLAUDE.md including valuable test criteria, available fixtures with intended use cases, and examples distinguishing meaningful behavioral tests from trivial assertions.",
      "D. Implement a two-phase generation where a second Claude call scores each test against quality criteria, filtering out low-scoring tests before presenting results to developers."
    ],
    "options": [
      "A. Giới hạn việc tạo test ở các thư mục mà chỉ số chất lượng lịch sử cho thấy tỷ lệ chấp nhận cao hơn, tắt tính năng này ở các khu vực mà test được tạo ra thường xuyên cần chỉnh sửa nhiều.",
      "B. Thêm phân tích độ bao phủ (coverage) sau khi tạo test, tự động lọc bỏ bất kỳ test được tạo nào không làm tăng độ bao phủ dòng (line coverage) so với mức mà các test hiện có đã cung cấp.",
      "C. Ghi lại các tiêu chuẩn testing trong CLAUDE.md, bao gồm các tiêu chí test có giá trị, các fixture khả dụng kèm mục đích sử dụng dự kiến, và các ví dụ phân biệt giữa test hành vi có ý nghĩa (meaningful behavioral test) với các assertion tầm thường.",
      "D. Triển khai việc tạo test theo hai giai đoạn, trong đó một lệnh gọi Claude thứ hai chấm điểm từng test theo tiêu chí chất lượng, lọc bỏ các test điểm thấp trước khi trình bày kết quả cho developer."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-285",
    "originalId": "lnq-219",
    "source": "LNQuyen",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "d3-p15",
    "difficulty": "application",
    "scenarioId": "s-ccaf-153",
    "questionEN": "An engineer sees an unfamiliar error message \"SYNC_CONFLICT: entity version mismatch detected\" in production logs but doesn't know which of the 12 services in the codebase generates it. They ask the agent to help locate the source code. What exploration approach will most efficiently find the responsible code?",
    "question": "Một kỹ sư nhìn thấy một thông báo lỗi lạ \"SYNC_CONFLICT: entity version mismatch detected\" trong log production nhưng không biết dịch vụ nào trong số 12 service của codebase tạo ra nó. Họ nhờ agent giúp xác định vị trí mã nguồn. Cách tiếp cận exploration nào sẽ tìm ra mã nguồn chịu trách nhiệm một cách hiệu quả nhất?",
    "optionsEN": [
      "A. Use Grep to search for distinctive text from the error message (like \"SYNC_CONFLICT\" or \"entity version mismatch\"), then Read the matching files to understand context.",
      "B. Use Glob to find files in directories commonly associated with error handling (such as errors/, exceptions/, or handlers/) across services, then Read each matching file.",
      "C. Use Grep to find all files that import the project's error handling module, then Read those files to locate custom error definitions.",
      "D. Read the project's README and service configuration files to understand the architecture, then systematically Read source files in service directory."
    ],
    "options": [
      "A. Dùng Grep để tìm đoạn văn bản đặc trưng từ thông báo lỗi (như \"SYNC_CONFLICT\" hoặc \"entity version mismatch\"), sau đó Read các file khớp để hiểu ngữ cảnh.",
      "B. Dùng Glob để tìm các file trong những thư mục thường gắn với việc xử lý lỗi (như errors/, exceptions/, hoặc handlers/) trên tất cả các service, sau đó Read từng file khớp.",
      "C. Dùng Grep để tìm tất cả các file import module xử lý lỗi của dự án, sau đó Read các file đó để xác định các định nghĩa lỗi tùy chỉnh.",
      "D. Read file README của dự án và các file cấu hình service để hiểu kiến trúc, sau đó Read một cách có hệ thống các file mã nguồn trong thư mục service."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "originalId": "q-3-1-011",
    "source": "Official254",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / hook-types",
    "difficulty": "application",
    "scenarioId": "s-q-3-1-011",
    "questionEN": "In Claude Code, which hook fires before a tool is invoked (and can allow, deny, or modify the tool call), and which fires immediately after a tool completes successfully (and can modify the result or feed corrective context back to the model)?",
    "question": "Trong một monorepo có nhiều module độc lập (frontend, backend, infrastructure), làm thế nào để ngăn việc quy tắc của backend làm ô nhiễm ngữ cảnh khi kỹ sư chỉ thao tác trên frontend?",
    "optionsEN": [
      "A. PreToolUse runs before the tool and can allow, deny, or modify the input; PostToolUse runs after it and can modify the result",
      "B. BeforeToolCall fires before invocation; AfterToolCall fires after — both can only observe and log, not modify or block the tool call.",
      "C. UserPromptSubmit fires before the tool is invoked; Stop fires after the tool completes.",
      "D. PreCompact fires before any tool runs; PostCompact fires after each tool completes."
    ],
    "options": [
      "A. Đặt tất cả quy tắc vào root CLAUDE.md.",
      "B. Tách các quy tắc chuyên biệt vào thư mục `.claude/rules/` với trường `paths` tương ứng (ví dụ `paths: [\"backend/**\"]` cho backend và `paths: [\"frontend/**\"]` cho frontend).",
      "C. Bắt kỹ sư xóa file quy tắc backend bằng tay mỗi khi chuyển nhánh.",
      "D. Đổi tên các file backend thành file ẩn."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): PreToolUse is the gating hook on tool calls: it runs after the model emits the tool call but before execution, so it can short-circuit (allow/deny/ask) or rewrite the tool input. PostToolUse runs immediately after a successful tool call and can transform the result or feed corrective context back to the model. Claude Code exposes many other lifecycle hooks (UserPromptSubmit, SessionStart, Stop, PreCompact, Notification, and others), but PreToolUse and PostToolUse are the pair that wraps the tool call itself.",
      "Option B ❌ (SAI): The canonical names are PreToolUse and PostToolUse, not BeforeToolCall/AfterToolCall. More importantly, both hooks can modify behaviour — PreToolUse can deny or rewrite the input, and PostToolUse can transform the result and feed context back — so framing them as observe-only misses the primary use case.",
      "Option C ❌ (SAI): UserPromptSubmit and Stop are real Claude Code hooks, but they fire on different events. UserPromptSubmit fires after a user submits a prompt (before Claude processes it), not before each tool call. Stop fires when the main agent finishes responding to the user, not after every individual tool call.",
      "Option D ❌ (SAI): PreCompact and PostCompact are real hooks, but they wrap conversation-history compaction events (when the transcript is summarised to free up context), not individual tool calls. They never fire on a per-tool basis."
    ],
    "rationale": "PreToolUse is the gating hook on tool calls: it runs after the model emits the tool call but before execution, and can allow, deny, or modify the input. PostToolUse runs immediately after a successful tool call and can transform the result or feed corrective context back to the model. These are the two foundational hooks for tool automation. Claude Code also exposes many other lifecycle hooks (UserPromptSubmit, SessionStart, SubagentStop, Stop, PreCompact, PostCompact, Notification, and others), but those wrap different events in the agentic loop, not the tool call itself.",
    "explanation": "Các file rule có phạm vi đường dẫn (`paths: [...]`) trong `.claude/rules/` chỉ được nạp khi chỉnh sửa các file thuộc đường dẫn đó, giữ context luôn tinh gọn.",
    "sources": [
      {
        "label": "Claude Code: Hooks",
        "url": "https://code.claude.com/docs/en/hooks"
      },
      {
        "label": "Anthropic: Agent SDK Hooks",
        "url": "https://platform.claude.com/docs/en/agent-sdk/hooks"
      }
    ],
    "id": "ccaf-316"
  },
  {
    "originalId": "q-3-1-013",
    "source": "Official254",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / splitting-rules",
    "difficulty": "application",
    "scenarioId": "s-q-3-1-013",
    "questionEN": "A growing project's CLAUDE.md has reached 800 lines covering API design rules, testing conventions, deployment procedures, and frontend style guides. Most of those topics only matter when working in the matching part of the codebase (API rules in /api, frontend rules in /web, etc.). Developers report attention dilution: Claude Code is increasingly inconsistent on specific conventions. What is the recommended fix to reduce the per-session token load while preserving coverage?",
    "question": "File CLAUDE.md của một dự án lớn đã phình to tới 800 dòng gồm quy tắc API, quy ước test, hướng dẫn deploy và phong cách frontend. Kỹ sư phản ánh Claude Code ngày càng phản hồi thiếu nhất quán do bị loãng chú ý. Khắc phục được khuyến nghị để giảm tải token mà vẫn giữ nguyên độ bao phủ là gì?",
    "optionsEN": [
      "A. Split CLAUDE.md into per-topic files referenced with @ path imports so each topic lives in its own file",
      "B. Claude Code has a hard limit of 500 lines for CLAUDE.md files; trim the file to fit within the limit",
      "C. Move each topic's sections into a path-scoped .claude/rules/ file that loads only in the matching area",
      "D. Duplicate the CLAUDE.md content across directory-level CLAUDE.md files in each subdirectory"
    ],
    "options": [
      "A. Tách CLAUDE.md thành các file nhỏ được tham chiếu bằng lệnh import đường dẫn `@`.",
      "B. Cắt ngắn file xuống dưới 500 dòng vì Claude Code có giới hạn cứng.",
      "C. Chuyển các phần quy ước theo chủ đề vào các file rule có phạm vi đường dẫn trong `.claude/rules/` để chúng chỉ nạp khi làm việc ở khu vực tương ứng.",
      "D. Nhân bản nội dung sang các file CLAUDE.md cấp thư mục con."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): @ path imports load eagerly — Claude reads the imported file inline at load time, exactly as if its content were pasted into CLAUDE.md. The source files become smaller, but the loaded context stays the same size. This improves source-file readability and authoring ergonomics, but it does not solve the attention-dilution problem the question is asking about.",
      "Option B ❌ (SAI): There is no documented hard line limit for CLAUDE.md files. The issue is token economy and attention dilution at load time, not a technical file-size constraint.",
      "Option C ✅ (ĐÚNG): Path-scoped .claude/rules/ files are the documented way to reduce per-session context for guidance that only applies to part of the codebase. With frontmatter like `paths: [\"api/**\"]`, the API rules only load when working in /api; the frontend rules only load when working in /web; and so on. CLAUDE.md keeps only the genuinely cross-cutting standards. This actually shrinks the loaded context — unlike @ imports, which load eagerly.",
      "Option D ❌ (SAI): Directory-level CLAUDE.md files load *in addition to* the project root file, not instead of it. Duplicating content would make the problem worse and create a maintenance nightmare. Use path-scoped .claude/rules/ files instead."
    ],
    "rationale": ".claude/rules/ files with path-scoped frontmatter are the documented way to keep per-session context lean: each rule only loads when Claude is working in the matching paths. @ path imports do not help here — they load the imported file's content inline at load time, so the source is more modular but the loaded context is the same size as a single big CLAUDE.md.",
    "explanation": "Chuyển đổi các quy định chuyên biệt vào thư mục `.claude/rules/` với frontmatter `paths` là giải pháp chuẩn mực để giữ cho ngữ cảnh mỗi phiên luôn tinh gọn và tập trung cao độ.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy and Scoping (Modular Organisation with @ path imports — eager-load warning)",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy#modular-organisation-with--path-imports"
      },
      {
        "label": "Lesson 3.3: Path-scoped rules in .claude/rules/",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ],
    "id": "ccaf-318"
  },
  {
    "originalId": "q-3-1-018",
    "source": "Official254",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / precompact-hook",
    "difficulty": "application",
    "scenarioId": "s-q-3-1-018",
    "questionEN": "A documentation team wants to archive the full conversation transcript to a log file every time Claude Code runs /compact, so that context lost during compaction can be reviewed later. Which hook configuration achieves this?",
    "question": "Một nhóm tài liệu muốn lưu trữ toàn bộ bản ghi hội thoại (conversation transcript) vào một file log mỗi khi Claude Code chạy lệnh `/compact`, để có thể xem lại ngữ cảnh bị mất trong quá trình nén sau này. Cấu hình hook nào thực hiện được điều này?",
    "optionsEN": [
      "A. A PostToolUse hook on Write that snapshots the transcript whenever a file is written, on the assumption /compact will eventually run",
      "B. A PreCompact hook that writes the current transcript to a timestamped log file before /compact summarises the conversation",
      "C. A PreToolUse hook configured on a built-in 'Compact' tool, matching tool name 'Compact'",
      "D. A PostToolUse hook on all tools that appends each tool result to a running log file, creating a continuous archive"
    ],
    "options": [
      "A. Một hook PostToolUse trên tool Write để chụp snapshot transcript mỗi khi có file được ghi, dựa trên giả định rằng /compact cuối cùng cũng sẽ chạy.",
      "B. Một hook PreCompact ghi transcript hiện tại vào một file log có gắn mốc thời gian (timestamp) trước khi /compact tóm tắt cuộc hội thoại.",
      "C. Một hook PreToolUse được cấu hình trên một tool tích hợp sẵn tên là 'Compact', khớp theo tên tool 'Compact'.",
      "D. Một hook PostToolUse trên tất cả các tool để nối từng kết quả của tool vào một file log đang chạy, tạo thành một kho lưu trữ liên tục."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Thao tác ghi file và nén ngữ cảnh không liên quan đến nhau. Hook PostToolUse trên Write sẽ kích hoạt sau mọi lần ghi file bất kể lệnh /compact có chạy hay không, gây lãng phí tài nguyên và tạo log thừa.",
      "Option B ✅ (ĐÚNG): PreCompact là sự kiện hook chuẩn trong Claude Code được kích hoạt ngay trước khi /compact tóm tắt hội thoại, cho phép sao chép nguyên vẹn transcript chi tiết trước khi bị tóm tắt.",
      "Option C ❌ (SAI): Không có tool tích hợp nào tên là 'Compact' trong cơ chế gọi tool. Compaction là một thao tác vòng đời của Claude Code chứ không phải là tool do mô hình gọi.",
      "Option D ❌ (SAI): Ghi log mọi kết quả tool tạo ra file log khổng lồ nhưng lại không nắm bắt được ngữ cảnh hội thoại đầy đủ (suy luận, lập kế hoạch, tin nhắn người dùng)."
    ],
    "rationale": "PreCompact is a first-class hook event in Claude Code that fires immediately before /compact (or auto-compaction) runs. The hook receives the full pre-compaction transcript path and can copy or process it before summarisation discards detail. This is the documented mechanism for exactly this use case.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\n`PreCompact` là một sự kiện hook chính thức (first-class hook) trong Claude Code, kích hoạt ngay trước khi `/compact` hoặc quá trình tự động nén (auto-compaction) diễn ra. Hook này nhận đường dẫn đầy đủ của file transcript trước khi nén để sao lưu trước khi quá trình tóm tắt làm mất chi tiết.",
    "sources": [
      {
        "label": "Claude Code: Hooks",
        "url": "https://code.claude.com/docs/en/hooks"
      }
    ],
    "id": "ccaf-323"
  },
  {
    "originalId": "q-3-1-020",
    "source": "Official254",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / memory-command",
    "difficulty": "application",
    "scenarioId": "s-q-3-1-020",
    "questionEN": "A developer's Claude Code applies the team's API conventions correctly in some sessions but not others, on the same project. They suspect the wrong memory files are loading in the failing sessions. What is the fastest way to confirm which CLAUDE.md and rules files a session has actually loaded?",
    "question": "Claude Code của một lập trình viên áp dụng quy ước API chính xác ở một số phiên nhưng lại quên ở các phiên khác trên cùng một dự án. Cách nhanh nhất để xác nhận chính xác những file CLAUDE.md và rules nào thực sự đã được nạp trong phiên hiện tại là gì?",
    "optionsEN": [
      "A. Run /memory in the session to list the loaded memory files",
      "B. Run /compact to reload the configuration hierarchy from disk",
      "C. Delete ~/.claude/CLAUDE.md so only project-level configuration can load",
      "D. Ask Claude in the session to repeat the team's API conventions back"
    ],
    "options": [
      "A. Chạy lệnh `/memory` ngay trong phiên để liệt kê danh sách các file bộ nhớ đã được nạp.",
      "B. Chạy lệnh `/compact`.",
      "C. Xóa file `~/.claude/CLAUDE.md`.",
      "D. Hỏi Claude xem nó có nhớ quy ước hay không."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): /memory is the diagnostic command for the configuration hierarchy: it shows which user-level, project-level, and directory-level memory files the current session has loaded, which directly confirms or rules out the suspected loading difference.",
      "Option B ❌ (SAI): /compact summarises the conversation to free context; it does not reload or report configuration files. CLAUDE.md content survives compaction, so this neither diagnoses nor fixes a loading difference.",
      "Option C ❌ (SAI): Deleting user-level configuration is a destructive guess. It might mask the symptom, but it destroys the developer's personal setup without ever confirming what the failing sessions were loading.",
      "Option D ❌ (SAI): The model can paraphrase conventions from training or partial context, so a fluent answer does not prove the files loaded. /memory reports the loaded files deterministically instead of relying on the model's self-report."
    ],
    "rationale": "The guide's 3.1 skills include using the /memory command to verify which memory files are loaded and to diagnose inconsistent behaviour across sessions. /memory inspects the live hierarchy; compaction, deletion, or asking the model are indirect and unreliable.",
    "explanation": "Lệnh `/memory` là công cụ chẩn đoán trực quan nhanh nhất giúp lập trình viên kiểm tra danh sách chính xác các file bộ nhớ và rule files đang hiện diện trong ngữ cảnh của phiên.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy and Scoping (/memory and CLAUDE.md persistence)",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy#the-memory-command"
      },
      {
        "label": "Claude Code: Memory and CLAUDE.md",
        "url": "https://code.claude.com/docs/en/memory"
      }
    ],
    "id": "ccaf-325"
  },
  {
    "originalId": "q-3-2-012",
    "source": "Official254",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / allowed-tools-scoping",
    "difficulty": "application",
    "scenarioId": "s-q-3-2-012",
    "questionEN": "A junior developer is using Claude Code to refactor a payment processing module. The team lead wants to ensure Claude Code cannot accidentally delete production configuration files or modify the database migration directory during the refactoring session. What is the most appropriate approach?",
    "question": "Lập trình viên junior dùng Claude Code để refactor module thanh toán. Trưởng nhóm muốn đảm bảo Claude Code không thể vô tình xóa file cấu hình production hoặc sửa đổi thư mục migration cơ sở dữ liệu. Cách tiếp cận phù hợp nhất là gì?",
    "optionsEN": [
      "A. Instruct the developer to use plan mode so Claude Code will ask for approval before each file change",
      "B. Use allowedTools to limit the session to Read, Grep, Glob, and Write within the payment module",
      "C. Add a rule in CLAUDE.md stating 'Never modify files in the config/ or migrations/ directories'",
      "D. Set the repository to read-only mode at the filesystem level before starting the session"
    ],
    "options": [
      "A. Hướng dẫn lập trình viên dùng Plan mode để Claude Code hỏi phê duyệt trước mỗi lần sửa file.",
      "B. Dùng cấu hình phân quyền công cụ `allowedTools` để giới hạn phiên làm việc chỉ được phép thao tác trong phạm vi module thanh toán và ngăn chặn xóa file ngoài phạm vi.",
      "C. Thêm quy tắc trong CLAUDE.md dặn 'Không bao giờ sửa file trong config/ hoặc migrations/'.",
      "D. Đặt toàn bộ repository ở chế độ read-only ở cấp hệ điều hành."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Plan mode helps with evaluating strategies for complex tasks, but it does not provide file-level access control. Even in plan mode, the model can still access all tools and directories once execution begins.",
      "Option B ✅ (ĐÚNG): allowedTools provides tool-level permission control that can restrict which tools are available and their scope. By limiting write access to the payment module directory and keeping read access for context, the team lead ensures Claude Code cannot modify production config or migration files.",
      "Option C ❌ (SAI): CLAUDE.md instructions rely on the model's compliance and are not deterministic safeguards. For production-critical protection, tool-level permission restrictions provide reliable enforcement rather than natural language instructions.",
      "Option D ❌ (SAI): Making the entire repository read-only would prevent Claude Code from making any changes, including the legitimate refactoring of the payment module. The requirement is selective protection, not blanket read-only access."
    ],
    "rationale": "allowedTools provides tool-level permission control that can restrict which tools are available and their scope. By limiting write access to the payment module directory and keeping read access for context, the team lead ensures Claude Code cannot modify production config or migration files.",
    "explanation": "Kiểm soát phân quyền ở tầng công cụ (`allowedTools` / permission rules) cung cấp sự bảo vệ cơ học tất định, ngăn chặn quyền truy cập vào các đường dẫn nhạy cảm bất kể chỉ dẫn prompt.",
    "sources": [
      {
        "label": "Claude Code: Settings",
        "url": "https://code.claude.com/docs/en/settings"
      }
    ],
    "id": "ccaf-330"
  },
  {
    "originalId": "q-3-3-011",
    "source": "Official254",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / glob-patterns",
    "difficulty": "application",
    "scenarioId": "s-q-3-3-011",
    "questionEN": "Test-file conventions must apply to *.test.tsx files spread across many directories of a codebase. Why is a .claude/rules/ file with a paths glob the right mechanism? (Select 2)",
    "question": "Quy ước viết file test cần áp dụng cho các file `*.test.tsx` nằm rải rác trên nhiều thư mục của codebase. Tại sao file rule trong `.claude/rules/` với mẫu glob lại là cơ chế tối ưu? (Chọn 2 đáp án đúng)",
    "optionsEN": [
      "A. One glob such as **/*.test.tsx captures the files by type wherever they live in the directory tree.",
      "B. The rule is appended to every session's context, so the conventions are never missed.",
      "C. The rule loads only when Claude edits a matching file, keeping irrelevant context out of other sessions.",
      "D. A CLAUDE.md file in each directory would achieve the same effect with less duplication."
    ],
    "options": [
      "A. Một mẫu glob như **/*.test.tsx bắt trọn các file theo loại dù chúng nằm ở bất kỳ đâu trong cây thư mục.",
      "B. Quy tắc được nối vào ngữ cảnh của mọi phiên làm việc, nên không bao giờ bị bỏ sót quy chuẩn.",
      "C. Quy tắc chỉ được nạp khi Claude chỉnh sửa một file khớp mẫu, giữ cho ngữ cảnh không liên quan nằm ngoài các phiên khác.",
      "D. Một file CLAUDE.md trong mỗi thư mục sẽ đạt được hiệu quả tương tự với ít sự trùng lặp hơn."
    ],
    "correct": [
      0,
      2
    ],
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): A single glob pattern covers all matching files regardless of directory depth, avoiding repetitive rule files.",
      "Option B ❌ (SAI): Path-specific rules are NOT always-on; always loading them causes unnecessary context bloat.",
      "Option C ✅ (ĐÚNG): Conditional activation ensures context is only consumed when relevant files are being touched.",
      "Option D ❌ (SAI): Placing CLAUDE.md in every folder creates severe duplication and maintenance overhead."
    ],
    "rationale": "Path-scoped rules with glob patterns provide wide matching across arbitrary directories while keeping context lean through conditional activation.",
    "explanation": "File quy tắc có paths glob vừa bao quát toàn bộ file kiểm thử phân tán qua mẫu **/*.test.tsx (A), vừa chỉ nạp vào context khi chỉnh sửa đúng file đó (C), giúp tiết kiệm context window tối đa.",
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules (Path-specific rules)",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules#how-path-specific-rules-work"
      },
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy and Scoping (.claude/rules/ directory)",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy#the-clauderules-directory"
      }
    ],
    "id": "ccaf-339",
    "multiple": true
  },
  {
    "originalId": "q-3-5-010",
    "source": "Official254",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 iterative-refinement / examples",
    "difficulty": "application",
    "scenarioId": "s-q-3-5-010",
    "questionEN": "A data-transformation prompt keeps producing inconsistent output from prose instructions alone. Which refinement techniques should you apply? (Select 3)",
    "question": "Một câu lệnh prompt biến đổi dữ liệu liên tục cho ra kết quả không nhất quán khi chỉ dùng chỉ dẫn bằng văn xuôi. Những kỹ thuật tinh chỉnh nào bạn nên áp dụng? (Chọn 3 đáp án đúng)",
    "optionsEN": [
      "A. Rewrite the prose instructions as longer, more detailed paragraphs.",
      "B. Write a test suite first, then iterate by sharing the failing tests.",
      "C. Provide two or three concrete input/output examples of the expected transformation.",
      "D. Collect every independent issue into one combined message to save round trips.",
      "E. Use the interview pattern so Claude surfaces design considerations before implementation."
    ],
    "options": [
      "A. Viết lại các chỉ dẫn bằng văn xuôi thành các đoạn văn dài hơn, chi tiết hơn.",
      "B. Viết một bộ kiểm thử trước, sau đó lặp lại bằng cách chia sẻ các kiểm thử thất bại.",
      "C. Cung cấp 2 hoặc 3 ví dụ đầu vào/đầu ra cụ thể về quá trình chuyển đổi kỳ vọng.",
      "D. Thu thập mọi vấn đề độc lập vào một thông báo kết hợp để tiết kiệm lượt trao đổi.",
      "E. Sử dụng mẫu phỏng vấn (interview pattern) để Claude nêu ra các cân nhắc thiết kế trước khi thực hiện."
    ],
    "correct": [
      1,
      2,
      4
    ],
    "optionExplanations": [
      "Option A ❌ (SAI): Adding longer prose increases ambiguity and lost-in-the-middle issues instead of clarifying logic.",
      "Option B ✅ (ĐÚNG): Test-driven iteration provides objective, machine-verifiable feedback that Claude can systematically fix.",
      "Option C ✅ (ĐÚNG): Concrete few-shot input/output pairs eliminate ambiguity far more effectively than descriptive text.",
      "Option D ❌ (SAI): Batching multiple unrelated issues confuses Claude's attention; issues should be tackled incrementally.",
      "Option E ✅ (ĐÚNG): The interview pattern allows Claude to ask clarifying questions about edge cases before writing code."
    ],
    "rationale": "When prose fails, use concrete examples, test-driven validation loops, and upfront interview patterns to clarify ambiguous edge cases.",
    "explanation": "Bộ ba kỹ thuật tinh chỉnh hiệu quả nhất theo Anthropic: viết test suite trước để có phản hồi khách quan (B), cung cấp 2-3 ví dụ input/output mẫu (C), và dùng interview pattern để Claude hỏi làm rõ trước khi sinh mã (E).",
    "sources": [
      {
        "label": "Lesson 3.5: Iterative Refinement Techniques (Example-based communication)",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-iterative-refinement#example-based-communication-in-practice"
      },
      {
        "label": "Lesson 3.5: Iterative Refinement Techniques (Technique hierarchy)",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-iterative-refinement#the-technique-hierarchy"
      },
      {
        "label": "Lesson 3.5: Iterative Refinement Techniques (Batch vs sequential)",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-iterative-refinement#batch-vs-sequential-feedback"
      }
    ],
    "id": "ccaf-351",
    "multiple": true
  },
  {
    "id": "ccaf-361",
    "originalId": "lnq-061",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p1",
    "difficulty": "application",
    "scenarioId": "s-ccaf-061",
    "questionEN": "After deploying the automated review, you notice high precision but low recall — real bugs are slipping through undetected. Investigation reveals your review prompt instructs Claude to \"only report high-confidence issues you are certain about\" and \"err on the side of not commenting.\" Developers appreciate the low noise, but a race condition that caused a production outage was visible in a reviewed PR and went unreported. You need to substantially improve bug detection while keeping false positive rates manageable for your team. What is the most effective approach?",
    "question": "Sau khi triển khai review tự động, bạn nhận thấy precision cao nhưng recall thấp — các bug thật đang lọt qua mà không bị phát hiện. Điều tra cho thấy prompt review của bạn hướng dẫn Claude \"chỉ báo cáo các vấn đề có độ tin cậy cao mà bạn chắc chắn\" và \"thiên về việc không comment\". Các developer đánh giá cao mức độ nhiễu thấp, nhưng một race condition từng gây ra sự cố production đã xuất hiện trong một PR được review nhưng không được báo cáo. Bạn cần cải thiện đáng kể khả năng phát hiện bug trong khi vẫn giữ tỷ lệ false positive ở mức chấp nhận được đối với team của bạn. Đâu là cách tiếp cận hiệu quả nhất?",
    "optionsEN": [
      "A. Remove the conservative filtering instructions and prompt Claude to report all potential issues, then apply a programmatic filter to deduplicate and suppress categories that historically generate false positives.",
      "B. Add detailed few-shot examples demonstrating bug categories Claude should flag — race conditions, null dereferences, error handling gaps — while keeping the high-confidence filtering instruction to maintain current precision levels.",
      "C. Expand the context window by including related test files, recent git history, and the module's dependency graph alongside the diff, giving Claude richer signals to assess issue severity.",
      "D. Split the review into a finding stage where Claude's goal is coverage — flagging every potential issue with confidence and severity metadata — and a separate stage that thresholds those findings."
    ],
    "options": [
      "A. Loại bỏ các hướng dẫn lọc thận trọng và yêu cầu Claude báo cáo mọi vấn đề tiềm ẩn, sau đó áp dụng một bộ lọc lập trình (programmatic filter) để loại bỏ trùng lặp và ẩn các danh mục vốn thường tạo ra false positive trong lịch sử.",
      "B. Thêm các few-shot example chi tiết minh họa các danh mục lỗi mà Claude nên gắn cờ — race condition, null dereference, các lỗ hổng trong xử lý lỗi — trong khi vẫn giữ hướng dẫn lọc high-confidence để duy trì mức độ chính xác (precision) hiện tại.",
      "C. Mở rộng context window bằng cách đưa vào các test file liên quan, lịch sử git gần đây, và dependency graph của module cùng với diff, giúp Claude có thêm tín hiệu phong phú hơn để đánh giá mức độ nghiêm trọng của vấn đề.",
      "D. Chia review thành một giai đoạn phát hiện (finding stage) trong đó mục tiêu của Claude là độ bao phủ (coverage) — gắn cờ mọi vấn đề tiềm ẩn kèm metadata về confidence và severity — và một giai đoạn riêng biệt để áp ngưỡng (threshold) cho các phát hiện đó."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Hướng dẫn code review của Anthropic cho các model Claude gần đây nêu rõ rằng chỉ thị \"chỉ báo cáo các vấn đề có độ tin cậy cao\" được tuân theo một cách rất sát nghĩa đen và làm giảm recall, đồng thời khuyến nghị nói với Claude báo cáo mọi finding kèm theo confidence và severity metadata, trong khi việc filtering được chuyển sang một giai đoạn verification/thresholding riêng ở downstream. Phương án D chính là mẫu hình hai giai đoạn \"bao phủ rồi mới lọc theo ngưỡng\" (coverage-then-threshold) này; B vẫn giữ lại bộ lọc làm giảm recall, C không giải quyết chỉ thị filtering, và cách chặn thẳng theo category ở A có thể vô tình tiếp tục che giấu các bug thật và thiếu confidence/severity metadata cần thiết để filtering một cách có nguyên tắc."
    ],
    "rationale": "Anthropic's code-review guidance for recent Claude models states that \"only report high-confidence\" instructions are followed literally and depress recall, and recommends telling Claude to report every finding with confidence and severity metadata while moving filtering to a separate downstream verification/thresholding stage. Option D is exactly this two-stage coverage-then-threshold pattern; B keeps the recall-killing filter, C doesn't address the filtering instruction, and A's blunt category suppression can re-suppress real bugs and lacks the confidence/severity metadata needed for principled filtering.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nHướng dẫn code review của Anthropic cho các model Claude gần đây nêu rõ rằng chỉ thị \"chỉ báo cáo các vấn đề có độ tin cậy cao\" được tuân theo một cách rất sát nghĩa đen và làm giảm recall, đồng thời khuyến nghị nói với Claude báo cáo mọi finding kèm theo confidence và severity metadata, trong khi việc filtering được chuyển sang một giai đoạn verification/thresholding riêng ở downstream. Phương án D chính là mẫu hình hai giai đoạn \"bao phủ rồi mới lọc theo ngưỡng\" (coverage-then-threshold) này; B vẫn giữ lại bộ lọc làm giảm recall, C không giải quyết chỉ thị filtering, và cách chặn thẳng theo category ở A có thể vô tình tiếp tục che giấu các bug thật và thiếu confidence/severity metadata cần thiết để filtering một cách có nguyên tắc.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-362",
    "originalId": "lnq-062",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p2",
    "difficulty": "application",
    "scenarioId": "s-ccaf-062",
    "questionEN": "Your extraction system processes two document types: standard monthly reports (archived after processing) and urgent exception reports (must trigger business alerts within 30 minutes of receipt). Both use the same JSON schema. You want to minimize API costs while meeting latency requirements. How should you architect the processing pipeline?",
    "question": "Hệ thống extraction của bạn xử lý hai loại tài liệu: báo cáo hàng tháng tiêu chuẩn (được lưu trữ sau khi xử lý) và báo cáo ngoại lệ khẩn cấp (phải kích hoạt cảnh báo nghiệp vụ trong vòng 30 phút kể từ khi nhận). Cả hai đều dùng chung một JSON schema. Bạn muốn giảm thiểu chi phí API trong khi vẫn đáp ứng yêu cầu về latency. Bạn nên thiết kế kiến trúc pipeline xử lý như thế nào?",
    "optionsEN": [
      "A. Submit all documents to the real-time Messages API to ensure consistent processing latency across document types.",
      "B. Submit all documents to the Batch API with custom_ids for tracking. When results arrive, immediately process urgent documents and trigger delayed alerts for exceptions.",
      "C. Queue all documents and submit hourly batches, flagging urgent documents for expedited handling when batch results return.",
      "D. Route standard reports to the Batch API for 50% cost savings, and route urgent exception reports to the real-time Messages API."
    ],
    "options": [
      "A. Gửi tất cả tài liệu tới Messages API thời gian thực để đảm bảo độ trễ xử lý nhất quán giữa các loại tài liệu.",
      "B. Gửi tất cả tài liệu tới Batch API kèm theo custom_ids để theo dõi. Khi kết quả trả về, xử lý ngay các tài liệu khẩn cấp và kích hoạt cảnh báo trễ cho các ngoại lệ.",
      "C. Đưa tất cả tài liệu vào hàng đợi và gửi theo lô hàng giờ, gắn cờ các tài liệu khẩn cấp để xử lý ưu tiên khi kết quả batch trả về.",
      "D. Định tuyến các báo cáo tiêu chuẩn tới Batch API để tiết kiệm 50% chi phí, và định tuyến các báo cáo ngoại lệ khẩn cấp tới Messages API thời gian thực."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Hãy khớp latency profile với mức độ khẩn cấp của tài liệu: dùng batch cho phần lớn tài liệu (rẻ), dùng real-time cho các exception nhạy cảm về latency (nhanh) — cách này giảm thiểu chi phí trong khi vẫn đáp ứng SLA. Định tuyến mọi thứ qua real-time (A) thì nhất quán nhưng tốn kém cho những tài liệu không cần đến điều đó, cửa sổ xử lý lên đến 24 giờ của Batch API (B) không thể đáp ứng SLA cảnh báo 30 phút cho các exception, và việc chạy batch theo giờ (C) vẫn phụ thuộc vào SLO của batch và không đảm bảo được khung thời gian 30 phút."
    ],
    "rationale": "Match latency profile to document urgency: batch for the bulk (cheap), real-time for the latency-sensitive exceptions (fast) — this minimizes cost while meeting the SLA. Routing everything to real-time (A) is consistent but expensive for documents that don't need it, the Batch API's up-to-24-hour window (B) can't meet a 30-minute alerting SLA for exceptions, and hourly batches (C) still ride the batch SLO and don't guarantee the 30-minute window.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nHãy khớp latency profile với mức độ khẩn cấp của tài liệu: dùng batch cho phần lớn tài liệu (rẻ), dùng real-time cho các exception nhạy cảm về latency (nhanh) — cách này giảm thiểu chi phí trong khi vẫn đáp ứng SLA. Định tuyến mọi thứ qua real-time (A) thì nhất quán nhưng tốn kém cho những tài liệu không cần đến điều đó, cửa sổ xử lý lên đến 24 giờ của Batch API (B) không thể đáp ứng SLA cảnh báo 30 phút cho các exception, và việc chạy batch theo giờ (C) vẫn phụ thuộc vào SLO của batch và không đảm bảo được khung thời gian 30 phút.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-363",
    "originalId": "lnq-063",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p3",
    "difficulty": "application",
    "scenarioId": "s-ccaf-063",
    "questionEN": "Your schema includes a skills: string[] field. Production monitoring reveals three consistency issues: (1) compound phrases like \"Python and SQL\" are sometimes kept as one entry, sometimes split; (2) implied but unstated skills occasionally appear in extractions; (3) similar documents produce wildly different array lengths (5-10 vs 40+ entries). Your prompt currently says \"Extract all skills mentioned.\" What's the most effective improvement?",
    "question": "Schema của bạn có một field skills: string[]. Giám sát production cho thấy ba vấn đề về tính nhất quán: (1) các cụm từ ghép như \"Python and SQL\" đôi khi được giữ nguyên là một entry, đôi khi bị tách ra; (2) các kỹ năng được ngụ ý nhưng không được nêu rõ đôi khi vẫn xuất hiện trong kết quả extraction; (3) các tài liệu tương tự nhau lại cho ra độ dài mảng khác nhau rất nhiều (5-10 so với hơn 40 entry). Prompt hiện tại của bạn ghi \"Extract all skills mentioned.\" Cải tiến nào là hiệu quả nhất?",
    "optionsEN": [
      "A. Add few-shot examples demonstrating compound phrase handling, explicit mention criteria, and appropriate entry granularity.",
      "B. Add constraints: \"Extract 10-20 skills maximum, one skill per entry, only explicitly named skills.\"",
      "C. Add post-extraction normalization that maps skills to a canonical taxonomy and deduplicates similar entries.",
      "D. Enrich the schema to {skill: string, confidence: float, source_quote: string}[] to capture extraction metadata."
    ],
    "options": [
      "A. Thêm các few-shot example minh họa cách xử lý cụm từ ghép, tiêu chí đề cập rõ ràng, và mức độ chi tiết (granularity) phù hợp cho mỗi entry.",
      "B. Thêm các ràng buộc: \"Trích xuất tối đa 10-20 kỹ năng, mỗi entry một kỹ năng, chỉ những kỹ năng được nêu tên rõ ràng.\"",
      "C. Thêm bước chuẩn hóa sau khi trích xuất (post-extraction normalization) để ánh xạ các kỹ năng vào một hệ phân loại (taxonomy) chuẩn và loại bỏ các entry tương tự trùng lặp.",
      "D. Bổ sung schema thành {skill: string, confidence: float, source_quote: string}[] để nắm bắt metadata trích xuất."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Cả ba vấn đề đều xoay quanh cách model diễn giải thế nào được tính là \"một kỹ năng\". Few-shot examples dạy cho model mẫu hình một cách cụ thể — tách hay không tách, được nêu rõ hay chỉ được suy luận, mức độ chi tiết (granularity) phù hợp. Việc giới hạn cứng số lượng (B) mang tính tùy tiện và có thể buộc phải bỏ sót các kỹ năng thật hoặc bịa ra để lấp đầy, post-processing (C) không thể sửa được các kỹ năng chỉ được suy luận chứ không được nêu rõ, cũng như không thể chọn đúng cách tách cho các cụm từ ghép, còn enriched metadata (D) là một tín hiệu hữu ích nhưng không giải quyết sự thiếu nhất quán từ gốc tại thời điểm extraction.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "All three issues are about the model's interpretation of what counts as \"a skill.\" Few-shot examples teach the pattern concretely — split vs. not-split, mentioned vs. inferred, appropriate granularity. Hard count caps (B) are arbitrary and can force dropping real skills or inventing filler, post-processing (C) can't fix inferred-but-not-mentioned skills or choose the right split for compound phrases, and enriched metadata (D) is useful signal but doesn't address the underlying inconsistency at extraction time.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nCả ba vấn đề đều xoay quanh cách model diễn giải thế nào được tính là \"một kỹ năng\". Few-shot examples dạy cho model mẫu hình một cách cụ thể — tách hay không tách, được nêu rõ hay chỉ được suy luận, mức độ chi tiết (granularity) phù hợp. Việc giới hạn cứng số lượng (B) mang tính tùy tiện và có thể buộc phải bỏ sót các kỹ năng thật hoặc bịa ra để lấp đầy, post-processing (C) không thể sửa được các kỹ năng chỉ được suy luận chứ không được nêu rõ, cũng như không thể chọn đúng cách tách cho các cụm từ ghép, còn enriched metadata (D) là một tín hiệu hữu ích nhưng không giải quyết sự thiếu nhất quán từ gốc tại thời điểm extraction.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-366",
    "originalId": "lnq-066",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p6",
    "difficulty": "application",
    "scenarioId": "s-ccaf-066",
    "questionEN": "Your extraction system implements automatic retries when validation fails. On each retry, the specific validation error is appended to the prompt. This retry-with-error-feedback approach resolves most failures within 2-3 attempts. For which failure pattern would additional retries be LEAST effective?",
    "question": "Hệ thống extraction của bạn triển khai cơ chế tự động retry khi validation thất bại. Ở mỗi lần retry, lỗi validation cụ thể được thêm vào prompt. Cách tiếp cận retry-with-error-feedback này giải quyết được hầu hết các lỗi trong vòng 2-3 lần thử. Với mẫu lỗi (failure pattern) nào thì việc retry thêm sẽ ÍT hiệu quả nhất?",
    "optionsEN": [
      "A. The model extracts keywords as a nested object organized by category when the schema requires a flat array of strings",
      "B. The model extracts citation counts as locale-formatted strings (\"1,234\") when the schema requires integers",
      "C. The model extracts dates as ISO 8601 datetime strings (\"2023-03-15T00:00:00Z\") when the schema requires only the date portion (YYYY-MM-DD)",
      "D. The model extracts \"et al.\" for co-authors when the full list exists only in an external document not in the input"
    ],
    "options": [
      "A. Model trích xuất từ khóa (keywords) dưới dạng một object lồng nhau được tổ chức theo danh mục trong khi schema yêu cầu một mảng phẳng (flat array) các chuỗi",
      "B. Model trích xuất số lượng trích dẫn (citation counts) dưới dạng chuỗi theo định dạng locale (\"1,234\") trong khi schema yêu cầu số nguyên (integer)",
      "C. Model trích xuất ngày tháng dưới dạng chuỗi datetime ISO 8601 (\"2023-03-15T00:00:00Z\") trong khi schema chỉ yêu cầu phần ngày (YYYY-MM-DD)",
      "D. Model trích xuất \"et al.\" cho các đồng tác giả trong khi danh sách đầy đủ chỉ tồn tại trong một tài liệu bên ngoài không có trong input"
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Dù retry bao nhiêu lần cũng không thể dạy cho model thông tin vốn không có trong input. Retry-with-error-feedback chỉ sửa được những lỗi mà lẽ ra model đã có thể làm đúng dựa trên nguồn tài liệu. Các phương án A, B và C đều là những sai lệch về cấu trúc hoặc định dạng mà model có thể sửa được khi nhận phản hồi về shape hoặc format mong muốn, vì thông tin cơ sở đúng vẫn hiện diện trong tài liệu; còn thông tin ở phương án D thì đơn giản là không tồn tại trong những gì model có thể nhìn thấy."
    ],
    "rationale": "No amount of retrying teaches the model information that isn't in the input. Retry-with-error-feedback only fixes mistakes the model could have gotten right from the source. Options A, B, and C are all structural or formatting mismatches the model can correct given feedback about the expected shape or format, since the correct underlying information is present in the document; D's information simply doesn't exist in what the model can see.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nDù retry bao nhiêu lần cũng không thể dạy cho model thông tin vốn không có trong input. Retry-with-error-feedback chỉ sửa được những lỗi mà lẽ ra model đã có thể làm đúng dựa trên nguồn tài liệu. Các phương án A, B và C đều là những sai lệch về cấu trúc hoặc định dạng mà model có thể sửa được khi nhận phản hồi về shape hoặc format mong muốn, vì thông tin cơ sở đúng vẫn hiện diện trong tài liệu; còn thông tin ở phương án D thì đơn giản là không tồn tại trong những gì model có thể nhìn thấy.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-369",
    "originalId": "lnq-069",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p8",
    "difficulty": "application",
    "scenarioId": "s-ccaf-069",
    "questionEN": "After implementing tool use with strict schema definitions, JSON syntax errors are eliminated, but 5% of extractions still have valid JSON with empty arrays or null values for required fields like citations and methodology. Spot-checking reveals that source documents contain this information, but in varied formats—inline citations vs. bibliographies, methodology sections vs. details embedded in introductions. What's the most effective way to address these failures?",
    "question": "Sau khi triển khai tool use với các định nghĩa schema nghiêm ngặt, lỗi cú pháp JSON đã được loại bỏ hoàn toàn, nhưng 5% số extraction vẫn cho ra JSON hợp lệ với mảng rỗng hoặc giá trị null cho các field bắt buộc như citations và methodology. Kiểm tra ngẫu nhiên cho thấy tài liệu nguồn có chứa thông tin này, nhưng ở nhiều định dạng khác nhau — trích dẫn inline so với danh mục tài liệu tham khảo (bibliography), các mục methodology riêng biệt so với chi tiết được lồng trong phần giới thiệu (introduction). Đâu là cách hiệu quả nhất để giải quyết các lỗi này?",
    "optionsEN": [
      "A. Implement retry logic that re-sends requests when validation detects empty required fields.",
      "B. Build a regex-based post-processing layer that scans source documents for citation patterns and methodology keywords, populating empty fields when the model fails to extract.",
      "C. Modify your schema to make citations and methodology optional, and flag incomplete records for manual review rather than failing validation.",
      "D. Add few-shot examples demonstrating extractions from documents with varied structures—showing how to identify citations in different formats and locate methodology details across section types."
    ],
    "options": [
      "A. Triển khai logic thử lại (retry logic) để gửi lại request khi việc xác thực (validation) phát hiện các field bắt buộc bị rỗng.",
      "B. Xây dựng một lớp xử lý hậu kỳ dựa trên regex, quét các tài liệu nguồn để tìm các mẫu trích dẫn (citation) và từ khóa phương pháp luận (methodology), điền vào các field rỗng khi model không trích xuất được.",
      "C. Sửa đổi schema của bạn để làm cho citations và methodology trở thành tùy chọn (optional), và gắn cờ các bản ghi không đầy đủ để xem xét thủ công thay vì làm cho validation thất bại.",
      "D. Thêm các few-shot example minh họa việc trích xuất từ các tài liệu có cấu trúc đa dạng — cho thấy cách nhận diện citation ở các định dạng khác nhau và xác định vị trí chi tiết methodology trên các loại section khác nhau."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Nguyên nhân gốc của lỗi là model không nhận diện được các định dạng khác nhau. Các ví dụ cụ thể trải rộng qua các dạng phân bố định dạng sẽ trực tiếp nâng recall cho phần 5% này. Retry với cùng một prompt (A) không dạy được cho model cách nhận ra methodology được lồng trong phần giới thiệu, dùng regex trên văn xuôi (B) rất dễ vỡ và có thể âm thầm cho ra dữ liệu sai, còn việc biến các field thành optional (C) chỉ che giấu triệu chứng bằng cách đẩy vấn đề sang khối lượng công việc của reviewer thay vì sửa tận gốc việc extraction."
    ],
    "rationale": "The failure mode is the model not recognizing varied formats. Concrete examples across the format distribution directly raise recall on the 5%. Retrying on the same prompt (A) won't teach the model to recognize methodology embedded in an intro, regex over prose (B) is brittle and ships silently wrong data, and making fields optional (C) papers over the symptom by routing the problem to reviewer workload instead of fixing extraction.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Giải thích:\nNguyên nhân gốc của lỗi là model không nhận diện được các định dạng khác nhau. Các ví dụ cụ thể trải rộng qua các dạng phân bố định dạng sẽ trực tiếp nâng recall cho phần 5% này. Retry với cùng một prompt (A) không dạy được cho model cách nhận ra methodology được lồng trong phần giới thiệu, dùng regex trên văn xuôi (B) rất dễ vỡ và có thể âm thầm cho ra dữ liệu sai, còn việc biến các field thành optional (C) chỉ che giấu triệu chứng bằng cách đẩy vấn đề sang khối lượng công việc của reviewer thay vì sửa tận gốc việc extraction.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-370",
    "originalId": "lnq-070",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p9",
    "difficulty": "application",
    "scenarioId": "s-ccaf-070",
    "questionEN": "Your extraction pipeline processes invoices and extracts line items, subtotals, tax amounts, and grand totals. During evaluation, you discover that in 18% of extractions, the sum of extracted line item amounts doesn't match the extracted grand total—sometimes due to OCR errors in the source document, sometimes due to extraction mistakes by the model. Downstream accounting systems reject records with mismatched totals. What's the most effective approach to improve extraction reliability?",
    "question": "Pipeline extraction của bạn xử lý hóa đơn và trích xuất line items (các mục hàng hóa/dịch vụ), subtotal, số tiền thuế, và grand total. Trong quá trình evaluation, bạn phát hiện rằng trong 18% số extraction, tổng của các line item amount được trích xuất không khớp với grand total được trích xuất — đôi khi do lỗi OCR trong tài liệu nguồn, đôi khi do lỗi extraction của model. Các hệ thống kế toán downstream từ chối các bản ghi có tổng số không khớp. Đâu là cách tiếp cận hiệu quả nhất để cải thiện độ tin cậy của extraction?",
    "optionsEN": [
      "A. Add a \"calculated_total\" field where the model sums extracted line items alongside a \"stated_total\" field. Flag records for human review when values differ.",
      "B. Extract line items and totals independently, then use a separate validation model to reconcile discrepancies by determining which extracted values are most likely correct.",
      "C. Add few-shot examples demonstrating invoices where extracted line items sum correctly to the stated total, encouraging the model to produce mathematically consistent extractions.",
      "D. Implement post-processing that automatically adjusts line item amounts proportionally when their sum doesn't match the stated total."
    ],
    "options": [
      "A. Thêm một field \"calculated_total\" trong đó model tính tổng các mục hàng (line item) đã trích xuất cùng với một field \"stated_total\". Gắn cờ các bản ghi để con người xem xét khi các giá trị khác nhau.",
      "B. Trích xuất các line item và tổng số một cách độc lập, sau đó sử dụng một model xác thực riêng để đối chiếu (reconcile) các sai lệch bằng cách xác định giá trị trích xuất nào có khả năng đúng nhất.",
      "C. Thêm các few-shot example minh họa các hóa đơn trong đó tổng các line item được trích xuất khớp chính xác với stated total, khuyến khích model đưa ra các kết quả trích xuất nhất quán về mặt toán học.",
      "D. Triển khai xử lý hậu kỳ tự động điều chỉnh tỷ lệ các số tiền line item khi tổng của chúng không khớp với stated total."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Việc thu thập cả calculated_total lẫn stated_total biến sự chênh lệch (discrepancy) thành một tín hiệu chính thức (first-class signal) — bạn bắt được cả lỗi OCR lẫn lỗi extraction theo cùng một cách thống nhất, và chỉ cần định tuyến phần 18% không khớp đến con người. Một reconciliation model (B) có thể che giấu lỗi OCR bằng cách âm thầm chọn con số này thay vì con số kia, few-shot examples (C) không giúp được gì khi bản thân nguồn tài liệu đã tự mâu thuẫn nội tại, còn việc âm thầm ghi đè lại các line item amount (D) rất nguy hiểm vì nó bịa ra dữ liệu tài chính cho một hệ thống kế toán downstream.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Capturing both a calculated_total and a stated_total makes the discrepancy a first-class signal — you catch OCR errors and extraction mistakes uniformly, and you can route only the mismatched 18% to humans. A reconciliation model (B) can mask OCR errors by silently picking one number over another, few-shot examples (C) can't help when the source itself is internally inconsistent, and silently rewriting line item amounts (D) is dangerous since it fabricates financial data for a downstream accounting system.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nViệc thu thập cả calculated_total lẫn stated_total biến sự chênh lệch (discrepancy) thành một tín hiệu chính thức (first-class signal) — bạn bắt được cả lỗi OCR lẫn lỗi extraction theo cùng một cách thống nhất, và chỉ cần định tuyến phần 18% không khớp đến con người. Một reconciliation model (B) có thể che giấu lỗi OCR bằng cách âm thầm chọn con số này thay vì con số kia, few-shot examples (C) không giúp được gì khi bản thân nguồn tài liệu đã tự mâu thuẫn nội tại, còn việc âm thầm ghi đè lại các line item amount (D) rất nguy hiểm vì nó bịa ra dữ liệu tài chính cho một hệ thống kế toán downstream.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-371",
    "originalId": "lnq-071",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p10",
    "difficulty": "application",
    "scenarioId": "s-ccaf-071",
    "questionEN": "Your pipeline uses a tool called extract_metadata with a JSON schema for paper details. You've also defined lookup_citations and verify_doi tools for enrichment. During testing, you notice that when users include requests like \"extract the metadata and tell me how cited it is,\" Claude sometimes calls lookup_citations first, which fails because it needs the DOI that extract_metadata would provide. What's the most effective way to ensure structured metadata extraction happens first?",
    "question": "Pipeline của bạn sử dụng một tool tên là extract_metadata với một JSON schema cho thông tin chi tiết của bài báo. Bạn cũng đã định nghĩa các tool lookup_citations và verify_doi để làm giàu dữ liệu (enrichment). Trong quá trình testing, bạn nhận thấy rằng khi người dùng đưa ra các yêu cầu như \"extract the metadata and tell me how cited it is\" (trích xuất metadata và cho tôi biết nó được trích dẫn bao nhiêu), Claude đôi khi gọi lookup_citations trước, và việc này thất bại vì nó cần đến DOI mà lẽ ra extract_metadata phải cung cấp. Đâu là cách hiệu quả nhất để đảm bảo việc trích xuất structured metadata diễn ra trước?",
    "optionsEN": [
      "A. Set tool_choice to \"any\" so Claude must use a tool, combined with system prompt instructions prioritizing extract_metadata.",
      "B. Set tool_choice to \"auto\" and reorder the tool definitions so extract_metadata appears first in the tools array, since Claude prioritizes earlier-listed tools.",
      "C. Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_metadata\"} and process the enrichment requests in subsequent turns after receiving the extracted metadata.",
      "D. Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_metadata\"} for every API call in the pipeline, ensuring Claude always extracts metadata before any enrichment can occur."
    ],
    "options": [
      "A. Đặt tool_choice thành \"any\" để buộc Claude phải sử dụng một tool, kết hợp với hướng dẫn trong system prompt ưu tiên extract_metadata.",
      "B. Đặt tool_choice thành \"auto\" và sắp xếp lại thứ tự định nghĩa tool sao cho extract_metadata xuất hiện đầu tiên trong mảng tools, vì Claude ưu tiên các tool được liệt kê trước.",
      "C. Đặt tool_choice thành {\"type\": \"tool\", \"name\": \"extract_metadata\"} và xử lý các yêu cầu enrichment ở các lượt (turn) tiếp theo sau khi nhận được metadata đã trích xuất.",
      "D. Đặt tool_choice thành {\"type\": \"tool\", \"name\": \"extract_metadata\"} cho mọi lệnh gọi API trong pipeline, đảm bảo Claude luôn trích xuất metadata trước khi bất kỳ enrichment nào có thể diễn ra."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đặt tool_choice trỏ vào tool cụ thể sẽ buộc extract_metadata phải được gọi ở lượt đầu tiên một cách xác định (deterministic). Sau đó, quyền kiểm soát được trả lại về \"auto\" để model có thể dùng citations/DOI enrichment với metadata đã sẵn có trong context. \"any\" (A) buộc phải có một lệnh gọi tool nhưng không nhất thiết là đúng tool, không có tài liệu nào ghi nhận rằng thứ tự ưu tiên phụ thuộc vào vị trí trong mảng (array position) (B), và việc ghim (pin) extract_metadata ở mọi lệnh gọi (D) khiến các tool enrichment không bao giờ được sử dụng.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Setting tool_choice to the specific tool deterministically forces extract_metadata on the first turn. Then control is handed back to \"auto\" to let the model use citations/DOI enrichment with the metadata already in context. \"any\" (A) forces a tool call but not the right one, there's no documented ordering preference based on array position (B), and pinning extract_metadata on every call (D) prevents the enrichment tools from ever being used.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nĐặt tool_choice trỏ vào tool cụ thể sẽ buộc extract_metadata phải được gọi ở lượt đầu tiên một cách xác định (deterministic). Sau đó, quyền kiểm soát được trả lại về \"auto\" để model có thể dùng citations/DOI enrichment với metadata đã sẵn có trong context. \"any\" (A) buộc phải có một lệnh gọi tool nhưng không nhất thiết là đúng tool, không có tài liệu nào ghi nhận rằng thứ tự ưu tiên phụ thuộc vào vị trí trong mảng (array position) (B), và việc ghim (pin) extract_metadata ở mọi lệnh gọi (D) khiến các tool enrichment không bao giờ được sử dụng.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-372",
    "originalId": "lnq-072",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p11",
    "difficulty": "application",
    "scenarioId": "s-ccaf-072",
    "questionEN": "Your extraction uses tool use with a JSON schema where property_type is defined as an enum: ['house', 'apartment', 'condo', 'townhouse']. After deployment, 8% of extractions fail schema validation. Investigation reveals listings mention many uncommon property types—\"studio\", \"loft\", \"duplex\", \"mobile home\", \"tiny house\", \"converted warehouse\"—and new types continue appearing regularly. What's the most effective long-term solution?",
    "question": "Extraction của bạn sử dụng tool use với một JSON schema trong đó property_type được định nghĩa là một enum: ['house', 'apartment', 'condo', 'townhouse']. Sau khi triển khai, 8% số extraction thất bại validation schema. Điều tra cho thấy các tin đăng đề cập đến nhiều loại bất động sản không phổ biến — \"studio\", \"loft\", \"duplex\", \"mobile home\", \"tiny house\", \"converted warehouse\" — và các loại mới vẫn tiếp tục xuất hiện đều đặn. Đâu là giải pháp dài hạn hiệu quả nhất?",
    "optionsEN": [
      "A. Continuously expand the enum to include newly observed property types and add monitoring for additional edge cases.",
      "B. Add an \"other\" value to your enum with a separate property_type_detail string field for specifics when \"other\" is selected.",
      "C. Change property_type from an enum to a free-form string and implement a normalization step in post-processing.",
      "D. Add few-shot examples to your prompt demonstrating how to map unexpected property types to the closest existing enum value."
    ],
    "options": [
      "A. Liên tục mở rộng enum để bao gồm các loại property mới được quan sát và thêm giám sát cho các trường hợp biên (edge case) bổ sung.",
      "B. Thêm một giá trị \"other\" vào enum của bạn cùng với một field string riêng property_type_detail để ghi chi tiết cụ thể khi \"other\" được chọn.",
      "C. Đổi property_type từ enum sang chuỗi tự do (free-form string) và triển khai một bước chuẩn hóa trong xử lý hậu kỳ.",
      "D. Thêm các few-shot example vào prompt của bạn minh họa cách ánh xạ các loại property không mong đợi tới giá trị enum hiện có gần nhất."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Thêm một giá trị enum \"other\" kèm theo một field detail riêng vẫn giữ được enum chặt chẽ cho các trường hợp phổ biến (giúp các phép join downstream sạch sẽ), đồng thời cung cấp một lối thoát có kiểu (well-typed escape hatch) để bảo toàn chi tiết — ổn định về lâu dài. Liên tục mở rộng enum (A) giống như trò chơi đập chuột (whack-a-mole) trong việc bảo trì, chuyển sang string tự do (free-form string) (C) đánh mất hoàn toàn đảm bảo về validation và đẩy việc chuẩn hóa xuống downstream mà không có một bộ từ vựng chuẩn (canonical vocabulary) nào, còn việc ép các loại bất thường vào giá trị hiện có gần nhất (D) làm mất đi những khác biệt thật sự và âm thầm gây mất dữ liệu (lossy).",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Adding an \"other\" enum value with a separate detail field keeps the strong enum for common cases (clean downstream joins) while giving a well-typed escape hatch that preserves detail — stable long-term. Continuously expanding the enum (A) is whack-a-mole maintenance, switching to a free-form string (C) loses the validation guarantee entirely and pushes normalization downstream with no canonical vocabulary, and forcing unusual types into the closest existing value (D) drops real distinctions and is silently lossy.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nThêm một giá trị enum \"other\" kèm theo một field detail riêng vẫn giữ được enum chặt chẽ cho các trường hợp phổ biến (giúp các phép join downstream sạch sẽ), đồng thời cung cấp một lối thoát có kiểu (well-typed escape hatch) để bảo toàn chi tiết — ổn định về lâu dài. Liên tục mở rộng enum (A) giống như trò chơi đập chuột (whack-a-mole) trong việc bảo trì, chuyển sang string tự do (free-form string) (C) đánh mất hoàn toàn đảm bảo về validation và đẩy việc chuẩn hóa xuống downstream mà không có một bộ từ vựng chuẩn (canonical vocabulary) nào, còn việc ép các loại bất thường vào giá trị hiện có gần nhất (D) làm mất đi những khác biệt thật sự và âm thầm gây mất dữ liệu (lossy).",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-374",
    "originalId": "lnq-074",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-074",
    "questionEN": "After deployment, you find that 12% of extractions contain semantic errors that pass JSON schema validation (e.g., a duration like \"30 minutes\" incorrectly placed in an ingredient quantity field). Human reviewers have capacity to check only 20% of extractions. Which approach most effectively allocates reviewer attention?",
    "question": "Sau khi triển khai, bạn phát hiện rằng 12% số extraction chứa lỗi ngữ nghĩa (semantic error) nhưng vẫn vượt qua được validation của JSON schema (ví dụ: một khoảng thời gian như \"30 minutes\" bị đặt nhầm vào một field số lượng nguyên liệu). Các reviewer con người chỉ có khả năng kiểm tra được 20% số extraction. Cách tiếp cận nào phân bổ sự chú ý của reviewer hiệu quả nhất?",
    "optionsEN": [
      "A. Have the model output field-level confidence scores, then calibrate review thresholds using a labeled validation set.",
      "B. Randomly sample 20% of extractions for review, using corrections to track accuracy and identify error patterns.",
      "C. Prioritize review of all extractions where required fields are empty or explicitly marked as not found.",
      "D. Review all extractions from documents with formatting anomalies such as unusual layouts or mixed content types."
    ],
    "options": [
      "A. Cho model xuất ra điểm confidence ở cấp độ field, sau đó hiệu chỉnh (calibrate) các ngưỡng xem xét bằng một tập validation đã được gán nhãn.",
      "B. Lấy mẫu ngẫu nhiên 20% các trích xuất để xem xét, sử dụng các chỉnh sửa để theo dõi độ chính xác và xác định các mẫu lỗi.",
      "C. Ưu tiên xem xét tất cả các trích xuất mà các field bắt buộc bị rỗng hoặc được đánh dấu rõ ràng là không tìm thấy.",
      "D. Xem xét tất cả các trích xuất từ những tài liệu có bất thường về định dạng, chẳng hạn như bố cục khác thường hoặc loại nội dung hỗn hợp."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Confidence ở cấp field cho phép bạn định tuyến phần 20% có confidence thấp — nơi tập trung phần lớn 12% lỗi ngữ nghĩa — đến con người, và việc calibration giúp việc chọn ngưỡng (threshold) dựa trên dữ liệu thực tế. Random sampling (B) tốt cho việc đo lường nhưng kém về độ bao phủ, chỉ bắt được một phần nhỏ trong số các lỗi thực tế. Việc review các field rỗng (C) bỏ sót vấn đề 12% về các giá trị sai trong những field đã được điền, còn việc review các bất thường về định dạng (D) không dự đoán một cách đáng tin cậy nơi các field bị nhầm lẫn với nhau.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Field-level confidence lets you route the low-confidence 20% — which is where the 12% semantic errors concentrate — to humans, and calibration makes the threshold choice data-driven. Random sampling (B) is good for measurement but poor for coverage, catching only a fraction of the actual errors. Empty-field review (C) misses the 12% problem of wrong values in populated fields, and reviewing formatting anomalies (D) doesn't reliably predict where fields got confused with each other.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nConfidence ở cấp field cho phép bạn định tuyến phần 20% có confidence thấp — nơi tập trung phần lớn 12% lỗi ngữ nghĩa — đến con người, và việc calibration giúp việc chọn ngưỡng (threshold) dựa trên dữ liệu thực tế. Random sampling (B) tốt cho việc đo lường nhưng kém về độ bao phủ, chỉ bắt được một phần nhỏ trong số các lỗi thực tế. Việc review các field rỗng (C) bỏ sót vấn đề 12% về các giá trị sai trong những field đã được điền, còn việc review các bất thường về định dạng (D) không dự đoán một cách đáng tin cậy nơi các field bị nhầm lẫn với nhau.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-376",
    "originalId": "lnq-110",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p6",
    "difficulty": "application",
    "scenarioId": "s-ccaf-094",
    "questionEN": "Your invoice extraction uses tool use with strict JSON schemas. JSON syntax errors never occur, but 12% of extractions fail semantic validation--for example, line Item amounts don't extracted total, or vendor IDs don't match valid formats. These failures currently route to manual review. What's the most effective approach to reduce manual review volume while m accuracy?",
    "question": "Hệ thống extraction hóa đơn (invoice extraction) của bạn sử dụng tool use với các JSON schema nghiêm ngặt. Lỗi cú pháp JSON không bao giờ xảy ra, nhưng 12% lượt extraction thất bại ở bước validation ngữ nghĩa (semantic validation) — ví dụ, tổng các line item amount không khớp với total, hoặc vendor ID không đúng định dạng hợp lệ. Các trường hợp lỗi này hiện đang được chuyển sang manual review. Đâu là cách tiếp cận hiệu quả nhất để giảm khối lượng manual review trong khi vẫn duy trì độ chính xác?",
    "optionsEN": [
      "A. Retry the extraction up to 3 times when validation fallis, accepting the first result that passes validation.",
      "B. Implement post-processing logic that automatically corrects common amors, such as recalculating totais from line items when sums don't match.",
      "C. When validation falls, make a follow-up request with the document, extraction, and validation errors for model correction.",
      "D. Add stricter schema constraints with detailed field descriptions to prevent the model from generating invalid values initially."
    ],
    "options": [
      "A. Retry việc trích xuất tối đa 3 lần khi validation thất bại (fail), chấp nhận kết quả đầu tiên vượt qua (pass) validation.",
      "B. Triển khai logic xử lý hậu kỳ (post-processing) để tự động sửa các lỗi phổ biến, chẳng hạn như tính lại (recalculate) tổng (total) từ các dòng chi tiết (line item) khi tổng không khớp.",
      "C. Khi validation thất bại, gửi một yêu cầu tiếp theo (follow-up) kèm tài liệu, kết quả trích xuất, và các lỗi validation để model tự sửa (correction).",
      "D. Thêm các ràng buộc (constraint) schema chặt chẽ hơn kèm mô tả trường (field description) chi tiết để ngăn model tạo ra các giá trị không hợp lệ ngay từ đầu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-378",
    "originalId": "lnq-125",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "D4 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-103",
    "questionEN": "Your fitness coaching assistant uses a system prompt with detailed conditional logic: \"If the user mentions being a beginner, provide step-by-step form instructions. If they use term 'progressive overload' or 'superset', respond concisely. If they ask about injury history, always recommend consulting a physician.\" During evaluation, you find the assistant correct explicit expertise declarations but struggles when users don't clearly state their level-often defaulting to overly detailed responses regardless of contextual cues like technical te Which change to the system prompt would most directly address this failure to pick up on implicit expertise signals?",
    "question": "Trợ lý huấn luyện thể hình (fitness coaching assistant) của bạn sử dụng một system prompt với logic điều kiện chi tiết: \"Nếu người dùng đề cập rằng họ là người mới bắt đầu, hãy cung cấp hướng dẫn form từng bước. Nếu họ dùng thuật ngữ 'progressive overload' hoặc 'superset', hãy trả lời ngắn gọn. Nếu họ hỏi về tiền sử chấn thương, luôn khuyên họ tham khảo ý kiến bác sĩ.\" Trong quá trình evaluation, bạn nhận thấy assistant xử lý đúng các trường hợp người dùng khai báo rõ ràng trình độ chuyên môn của mình, nhưng gặp khó khăn khi người dùng không nêu rõ trình độ—thường mặc định đưa ra các phản hồi quá chi tiết bất kể các contextual cue như thuật ngữ kỹ thuật. Thay đổi nào đối với system prompt sẽ giải quyết trực tiếp nhất tình trạng không nhận biết được các tín hiệu ngầm (implicit) về trình độ chuyên môn này?",
    "optionsEN": [
      "A. Replace most conditionals with a general principle: \"Adapt explanation depth to match user expertise, mirroring their terminology.\" Keep only the safety-critical conditional abou consultations.",
      "B. Add more conditional branches to cover additional expertise signals, such as \"If user mentions specific rep ranges or asks about periodization, treat as advanced.\"",
      "C. Implement a pre-conversation intake that asks users to rate their experience level, then inject that rating into the system prompt as context for all subsequent responses.",
      "D. Add an explicit instruction for the model to ask a clarifying question about experience level whenever the user's expertise isn't immediately clear from their first message."
    ],
    "options": [
      "A. Thay thế hầu hết các điều kiện (conditionals) bằng một nguyên tắc chung: \"Điều chỉnh mức độ chi tiết của giải thích cho phù hợp với trình độ chuyên môn của user, phản ánh theo thuật ngữ mà họ sử dụng.\" Chỉ giữ lại điều kiện quan trọng về an toàn liên quan đến việc tham vấn (consultations).",
      "B. Thêm nhiều nhánh điều kiện hơn để bao quát các tín hiệu về trình độ chuyên môn khác, chẳng hạn như \"Nếu user đề cập đến các rep ranges cụ thể hoặc hỏi về periodization, coi là người có trình độ nâng cao (advanced).\"",
      "C. Triển khai một bước thu thập thông tin (intake) trước khi trò chuyện, yêu cầu user tự đánh giá mức độ kinh nghiệm của họ, sau đó chèn đánh giá đó vào system prompt như context cho tất cả các phản hồi tiếp theo.",
      "D. Thêm một hướng dẫn rõ ràng để model đặt một câu hỏi làm rõ (clarifying question) về mức độ kinh nghiệm bất cứ khi nào trình độ chuyên môn của user không rõ ràng ngay từ tin nhắn đầu tiên của họ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-381",
    "originalId": "lnq-145",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-116",
    "questionEN": "Your document extraction tool uses ML models to extract invoice fields (vendor, amount, date). The models return confidence scores (0.0-1.0) for each extracted field. In production, you observe: (1) the agent proceeds with low-confidence extractions that are incorrect 23% of the time, and (2) the agent requests unnecessary human review for 31% of extractions that were actually correct. How should you restructure the tool's output?",
    "question": "Tool trích xuất tài liệu (document extraction) của bạn sử dụng các mô hình ML để trích xuất các trường trên hóa đơn (nhà cung cấp, số tiền, ngày tháng). Các mô hình trả về điểm tin cậy (confidence score, từ 0.0 đến 1.0) cho mỗi trường được trích xuất. Trong production, bạn quan sát thấy: (1) agent tiếp tục xử lý với các kết quả trích xuất có độ tin cậy thấp, và các kết quả này sai 23% số lần, và (2) agent yêu cầu con người xem xét (human review) một cách không cần thiết đối với 31% các trường hợp trích xuất mà thực ra là chính xác. Bạn nên tái cấu trúc đầu ra của tool này như thế nào?",
    "optionsEN": [
      "A. Return fields with their raw confidence scores and add detailed few-shot examples to your system prompt demonstrating how to interpret different confidence ranges and when to request human review.",
      "B. Compute an aggregate extraction quality score across all fields and return it alongside the extracted values. Include a text summary describing the overall extraction reliability.",
      "C. Return fields with confidence scores, plus a requires_review boolean computed using your tested confidence thresholds, along with a review_reasons array explaining which fields triggered review.",
      "D. Return fields organized into verified and needs_verification objects based on confidence thresholds."
    ],
    "options": [
      "A. Trả về các field kèm theo confidence score thô của chúng, và thêm các ví dụ few-shot chi tiết vào system prompt minh họa cách diễn giải các khoảng confidence khác nhau và khi nào cần yêu cầu con người xem xét lại (human review).",
      "B. Tính toán một điểm chất lượng trích xuất (extraction quality score) tổng hợp trên tất cả các field và trả về kèm theo các giá trị đã trích xuất. Kèm theo một bản tóm tắt dạng văn bản mô tả độ tin cậy tổng thể của việc trích xuất.",
      "C. Trả về các field kèm confidence score, cùng với một boolean requires_review được tính toán dựa trên các ngưỡng confidence (confidence threshold) đã được kiểm chứng, cùng với một mảng review_reasons giải thích field nào đã kích hoạt việc xem xét lại.",
      "D. Trả về các field được sắp xếp thành các object verified và needs_verification dựa trên các ngưỡng confidence."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option C is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-385",
    "originalId": "lnq-166",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p4, d4-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-126",
    "questionEN": "The system routes documents with extraction confidence below 85% to human review. A quarterly audit reveals that 12% of high-confidence extractions (>85%) also contain errors—cases where the model finds plausible-but-incorrect values. Error sources vary: comparison tables showing competitor specs, appendices referencing different product variants, and ambiguous phrasing the model misinterprets. You need a sustainable strategy to catch these high-confidence errors and measure whether improvements reduce the error rate over time. What approach is most effective?",
    "question": "Hệ thống định tuyến các tài liệu có độ tin cậy extraction (extraction confidence) dưới 85% sang review bởi con người. Một cuộc audit hàng quý cho thấy 12% các extraction có độ tin cậy cao (>85%) cũng chứa lỗi—các trường hợp mà model tìm ra các giá trị nghe có vẻ hợp lý nhưng không chính xác. Nguồn gốc lỗi rất đa dạng: các bảng so sánh hiển thị thông số kỹ thuật của đối thủ cạnh tranh, các phụ lục tham chiếu đến các biến thể sản phẩm khác nhau, và cách diễn đạt mơ hồ mà model hiểu sai. Bạn cần một chiến lược bền vững để phát hiện các lỗi có độ tin cậy cao này và đo lường xem các cải tiến có làm giảm tỷ lệ lỗi theo thời gian hay không. Cách tiếp cận nào là hiệu quả nhất?",
    "optionsEN": [
      "A. Implement heuristic rules that flag documents containing comparison tables or appendices for review regardless of confidence score.",
      "B. Implement stratified random sampling reviewing a fixed percentage of high-confidence extractions weekly, enabling error rate measurement and novel pattern detection.",
      "C. Add a verification pass that re-extracts from each high-confidence document, flagging cases where the two extraction attempts produce different results.",
      "D. Lower the confidence threshold from 85% to 70%, routing a larger volume of extractions to human review."
    ],
    "options": [
      "A. Triển khai các quy tắc heuristic đánh dấu các tài liệu chứa bảng so sánh hoặc phụ lục để đưa vào rà soát, bất kể điểm confidence.",
      "B. Triển khai lấy mẫu ngẫu nhiên phân tầng (stratified random sampling), rà soát một tỷ lệ phần trăm cố định các kết quả trích xuất có confidence cao hằng tuần, giúp đo lường tỷ lệ lỗi và phát hiện các mẫu mới.",
      "C. Thêm một bước xác minh, trích xuất lại từ mỗi tài liệu có confidence cao, đánh dấu các trường hợp mà hai lần trích xuất cho kết quả khác nhau.",
      "D. Hạ ngưỡng confidence từ 85% xuống 70%, chuyển một khối lượng lớn hơn các kết quả trích xuất sang rà soát thủ công."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-387",
    "originalId": "lnq-200",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p8",
    "difficulty": "application",
    "scenarioId": "s-ccaf-146",
    "questionEN": "Your code review prompts include both implementation changes and the corresponding test file, but the LLM's review comments fail to point out untested code paths. Analysis reveals the model correctly flags functions that have no tests at all, but fails to identify when conditional branches or error-handling paths within tested functions that have no tests at all, but fails to identify when conditional branches or error-handling paths within tested functio lack coverage. What's the most effective way to improve detection of branch-level coverage gaps without overcomplicating the pipeline?",
    "question": "Prompt code review của bạn bao gồm cả các thay đổi implementation lẫn file test tương ứng, nhưng các nhận xét review của LLM lại không chỉ ra được các đường thực thi (code path) chưa được test. Phân tích cho thấy model xác định đúng các hàm hoàn toàn không có test nào, nhưng lại không phát hiện được khi các nhánh điều kiện (conditional branch) hoặc đường xử lý lỗi (error-handling path) bên trong các hàm đã có test vẫn thiếu coverage. Đâu là cách hiệu quả nhất để cải thiện khả năng phát hiện các lỗ hổng coverage ở cấp độ nhánh (branch-level) mà không làm pipeline trở nên quá phức tạp?",
    "optionsEN": [
      "A. Implement a multi-pass pipeline where separate LLM calls first extract all conditional branches, then cross-reference each against test assertions in a second pass.",
      "B. Include few-shot examples showing code with an uncovered branch paired with the review comment identifying the specific missing test case.",
      "C. Add explicit instructions directing the model to enumerate each conditional branch and exception path, then verify each has a corresponding test assertion.",
      "D. Restructure the prompt to interleave implementation and tests, presenting each function followed immediately by its test cases"
    ],
    "options": [
      "A. Triển khai một pipeline nhiều bước (multi-pass), trong đó các lệnh gọi LLM riêng biệt trước tiên trích xuất tất cả các nhánh điều kiện (conditional branches), sau đó đối chiếu từng nhánh với các test assertion trong bước thứ hai.",
      "B. Bao gồm các few-shot examples cho thấy đoạn code có một nhánh chưa được kiểm thử (uncovered branch) đi kèm với bình luận review xác định cụ thể test case còn thiếu.",
      "C. Thêm các hướng dẫn rõ ràng chỉ đạo model liệt kê từng nhánh điều kiện và đường dẫn ngoại lệ (exception path), sau đó xác minh mỗi nhánh có một test assertion tương ứng.",
      "D. Tái cấu trúc prompt để xen kẽ implementation và test, trình bày mỗi function ngay sau đó là các test case của nó."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-388",
    "originalId": "lnq-202",
    "source": "LNQuyen",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "D4 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-147",
    "questionEN": "Your automated reviewer uses a single prompt covering security issues, API design, and business logic correctness. Your evaluation suite shows strong recall findings (82%) but poor recall for business logic edge cases in quiz scoring (34%). When you add few-shot examples of logic bugs to the prompt, logic recall is 41% but API design recall drops to 68%. How should you address this trade-off to improve detection across both categories?",
    "question": "Automated reviewer của bạn dùng một prompt duy nhất bao quát các vấn đề security, API design, và business logic correctness. Bộ evaluation của bạn cho thấy recall mạnh cho các phát hiện về API design (82%) nhưng recall kém cho các edge case về business logic trong quiz scoring (34%). Khi bạn thêm các few-shot example về logic bug vào prompt, logic recall tăng lên 41% nhưng API design recall lại giảm xuống 68%. Bạn nên xử lý sự đánh đổi (trade-off) này như thế nào để cải thiện khả năng phát hiện ở cả hai hạng mục?",
    "optionsEN": [
      "A. Split the review into separate focused prompts - one for security and API design, another for business logic - each with dedicated examples, then combine findings before posting.",
      "B. Upgrade to a more capable model tier, since its stronger reasoning will handle both concern types in a single prompt and eliminate the recall trade-off.",
      "C. Provide the full repository as context instead of just the changed files and surrounding code, giving the model deeper visibility into business logic.",
      "D. Replace the few-shot examples with a detailed checklist of specific logic edge cases to verify, such as division-by-zero in score calculation or grading thresholds."
    ],
    "options": [
      "A. Chia việc review thành các prompt tập trung riêng biệt - một cho bảo mật và thiết kế API, một cho logic nghiệp vụ - mỗi prompt có các ví dụ riêng, sau đó gộp các phát hiện lại trước khi đăng.",
      "B. Nâng cấp lên một model tier mạnh hơn, vì khả năng suy luận mạnh hơn của nó sẽ xử lý được cả hai loại vấn đề trong một prompt duy nhất và loại bỏ đánh đổi về recall.",
      "C. Cung cấp toàn bộ repository làm context thay vì chỉ các file đã thay đổi và đoạn code xung quanh, giúp model có cái nhìn sâu hơn về logic nghiệp vụ.",
      "D. Thay thế các few-shot examples bằng một checklist chi tiết các trường hợp biên (edge case) cụ thể của logic cần kiểm tra, chẳng hạn như chia cho 0 (division-by-zero) trong tính điểm hoặc các ngưỡng xếp loại (grading thresholds)."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-396",
    "originalId": "vie-063",
    "source": "VieHub",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / keyword-bias-steering",
    "difficulty": "application",
    "scenarioId": "s-ccaf-212",
    "questionEN": "Adding error-handling wrappers across a 120-file codebase has 3 phases: discovery, design, implementation. Phase 1's discovery output (hundreds of call sites) quickly fills the context window before discovery even finishes. What is most effective?",
    "question": "Việc bổ sung các wrapper xử lý lỗi trên codebase gồm 120 file được chia thành 3 giai đoạn: khám phá (discovery), thiết kế, và triển khai. Lượng output của Giai đoạn 1 (hàng trăm vị trí gọi hàm) nhanh chóng làm đầy context window trước cả khi bước khám phá hoàn thành. Giải pháp nào mang lại hiệu quả cao nhất?",
    "optionsEN": [
      "A. Use an Explore subagent for Phase 1 to isolate verbose output and return a summary, then continue Phases 2-3 in the main conversation",
      "B. Do all phases in the main conversation, periodically running /compact",
      "C. Switch to headless mode with --continue, passing explicit summaries between batch calls",
      "D. Define the pattern in CLAUDE.md and process files across sessions relying on a shared memory file"
    ],
    "options": [
      "A. Sử dụng một Explore subagent riêng cho Giai đoạn 1 để cô lập phần output chi tiết và chỉ trả về một bản tóm tắt, sau đó tiếp tục Giai đoạn 2 và 3 trong phiên hội thoại chính.",
      "B. Thực hiện toàn bộ các giai đoạn trong phiên chính và định kỳ gõ lệnh `/compact`.",
      "C. Chuyển sang headless mode với cờ `--continue`, truyền các bản tóm tắt tường minh giữa các lần gọi batch.",
      "D. Định nghĩa pattern trong CLAUDE.md và xử lý các file qua nhiều phiên độc lập dựa trên một file memory dùng chung."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Sự chênh lệch mang tính hệ thống dựa trên sự xuất hiện của từ khóa phản ánh rằng trong system prompt có logic điều hướng quá mức nhạy cảm với từ 'account', lấn át cả phần mô tả chức năng của tool.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "An Explore subagent absorbs the verbose discovery noise in an isolated context, preserving the main context window for the design and implementation phases that need it most.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Rationale (EN):\nAn Explore subagent absorbs the verbose discovery noise in an isolated context, preserving the main context window for the design and implementation phases that need it most.\n\n🔍 Giải thích chi tiết (VI):\nSử dụng một Explore subagent giúp hấp thụ toàn bộ độ nhiễu và output dài dòng trong một context cô lập, giữ cho context window của phiên chính luôn thông thoáng cho các giai đoạn thiết kế và viết code quan trọng.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-397",
    "originalId": "vie-070",
    "source": "VieHub",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "d4-p4, d4-p12",
    "difficulty": "application",
    "scenarioId": "s-ccaf-219",
    "questionEN": "Situation: When resolving complex billing disputes, the agent provides accurate solutions but inconsistently explains rationale (missing policy details, timelines). What approach is most effective?",
    "question": "Tình huống: Khi giải quyết các tranh chấp hóa đơn phức tạp, agent đưa ra giải pháp chính xác nhưng phần giải thích lý do lại không nhất quán (thường thiếu chi tiết chính sách, mốc thời gian giải quyết). Cách tiếp cận nào hiệu quả nhất để giải quyết vấn đề này?",
    "optionsEN": [
      "A. Add a self-critique stage where the agent evaluates a draft response for completeness—ensuring it resolves the issue, includes context, and anticipates follow-ups.",
      "B. Add a confirmation stage asking 'Does this fully resolve your issue?'.",
      "C. Upgrade the model from Haiku to Sonnet for complex cases.",
      "D. Implement few-shot examples showing complete explanations."
    ],
    "options": [
      "A. Thêm một bước tự phản biện (self-critique stage) trong đó agent tự đánh giá bản nháp phản hồi của mình theo các tiêu chí hoàn chỉnh — đảm bảo giải quyết hết vấn đề, nêu đủ ngữ cảnh chính sách và dự đoán trước các câu hỏi tiếp theo.",
      "B. Thêm một bước xác nhận hỏi người dùng: 'Phương án này đã giải quyết hoàn toàn vấn đề của bạn chưa?'.",
      "C. Nâng cấp mô hình từ Haiku lên Sonnet cho các trường hợp phức tạp.",
      "D. Bổ sung các ví dụ few-shot minh họa các câu giải thích hoàn chỉnh."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "A self-critique stage (evaluator-optimizer pattern) forces the agent to assess its own draft against concrete criteria (policy context, timelines) before presenting it, catching case-specific gaps.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Rationale (EN):\nA self-critique stage (evaluator-optimizer pattern) forces the agent to assess its own draft against concrete criteria (policy context, timelines) before presenting it, catching case-specific gaps.\n\n🔍 Giải thích chi tiết (VI):\nMột bước tự phản biện (mô hình evaluator-optimizer) buộc agent phải rà soát lại bản nháp theo các tiêu chí cụ thể (ngữ cảnh chính sách, mốc thời gian) trước khi xuất kết quả cuối cùng, giúp phát hiện và lấp đầy các khoảng trống thông tin.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-406",
    "originalId": "vie-125",
    "source": "VieHub",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 evaluator-optimizer / self-critique-stage",
    "difficulty": "application",
    "scenarioId": "s-ccaf-258",
    "questionEN": "Satisfaction is 15% lower on complex billing disputes even when the resolution is technically correct, because explanations inconsistently omit policy details, timelines, or next steps in varying, case-specific ways. What approach improves quality without adding human oversight?",
    "question": "Độ hài lòng của khách hàng thấp hơn 15% đối với các tranh chấp hóa đơn phức tạp ngay cả khi kết quả xử lý đúng về mặt kỹ thuật, do phần giải thích thường bỏ sót chi tiết chính sách, mốc thời gian hoặc các bước tiếp theo. Cách tiếp cận nào nâng cao chất lượng mà không cần người giám sát?",
    "optionsEN": [
      "A. Add a self-critique stage where the agent evaluates its draft for completeness (context, timelines, next steps) before sending",
      "B. Add a confirmation stage asking 'Does this fully resolve your issue?'",
      "C. Upgrade the model for complex cases based on a complexity metric",
      "D. Add few-shot examples for five common complex case types"
    ],
    "options": [
      "A. Thêm một bước tự phản biện (self-critique stage) trong đó agent tự đánh giá bản nháp về độ đầy đủ (ngữ cảnh, mốc thời gian, bước tiếp theo) trước khi gửi cho khách hàng.",
      "B. Thêm bước xác nhận hỏi 'Điều này đã giải quyết hoàn toàn vấn đề của bạn chưa?'.",
      "C. Nâng cấp model cho các ca phức tạp dựa trên chỉ số đo lường độ phức tạp.",
      "D. Thêm các ví dụ few-shot cho năm dạng ca tranh chấp phức tạp phổ biến."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Giai đoạn tự phản biện (evaluator-optimizer pattern) bắt trọn các khoảng trống thông tin đặc thù theo từng ca mà một tập hợp ví dụ cố định không thể bao quát hết.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "A self-critique (evaluator-optimizer) stage catches case-specific completeness gaps that vary too much for a fixed set of examples to cover.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Rationale (VieHub):\nA self-critique (evaluator-optimizer) stage catches case-specific completeness gaps that vary too much for a fixed set of examples to cover.\n\n🔍 Phân tích chi tiết (Vietnamese):\nGiai đoạn tự phản biện (evaluator-optimizer pattern) bắt trọn các khoảng trống thông tin đặc thù theo từng ca mà một tập hợp ví dụ cố định không thể bao quát hết.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "originalId": "q-4-2-006",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / construction",
    "difficulty": "application",
    "scenarioId": "s-q-4-2-006",
    "questionEN": "Your Claude Code agent generates API endpoint implementations. You provide detailed instructions specifying error handling conventions, but the generated code inconsistently handles async errors: sometimes using try/catch, sometimes using .catch(), and sometimes omitting error handling entirely. Adding more detailed instructions did not resolve the inconsistency. What is the most effective next step?",
    "question": "Agent Claude Code sinh mã nguồn API endpoint. Để đảm bảo tất cả các endpoint đều xử lý lỗi theo một định dạng JSON thống nhất chuẩn của công ty, phương pháp prompt nào là hiệu quả nhất?",
    "optionsEN": [
      "A. Add a linting rule that flags and rejects generated code whose error handling deviates from the target style, catching nonconforming output after generation.",
      "B. Add 2-4 few-shot examples demonstrating the correct error handling pattern across varied async scenarios, with reasoning for each choice.",
      "C. Set temperature to 0 to eliminate the randomness causing inconsistent error handling styles",
      "D. Add a post-generation review step that rewrites any incorrect error handling patterns"
    ],
    "options": [
      "A. Chỉ nhắc nhở chung chung 'Hãy xử lý lỗi cẩn thận'.",
      "B. Đưa vào 2-4 ví dụ few-shot minh họa các API endpoint hoàn chỉnh với cấu trúc `try-catch` và định dạng phản hồi lỗi chuẩn tắc của công ty.",
      "C. Tắt tính năng xử lý lỗi trong code.",
      "D. Bắt buộc lập trình viên phải tự viết phần xử lý lỗi."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Rejecting nonconforming output gates results after generation but never teaches the model to produce the consistent style itself, so novel cases keep failing. Few-shot examples with reasoning fix the inconsistency at source.",
      "Option B ✅ (ĐÚNG): When detailed instructions alone fail to produce consistent formatting, few-shot examples with reasoning are the correct escalation. Covering varied async scenarios prevents the model from pattern-matching only the specific cases shown and teaches it to generalise the error handling style.",
      "Option C ❌ (SAI): Temperature does not fix ambiguous criteria. If the instructions do not clearly demonstrate the preferred pattern, low temperature just makes the model consistently pick the same ambiguous interpretation, not necessarily the correct one.",
      "Option D ❌ (SAI): Post-processing adds cost and complexity. It is more effective to teach the model the correct pattern upfront with few-shot examples than to fix incorrect output afterwards."
    ],
    "rationale": "When detailed instructions alone fail to produce consistent formatting, few-shot examples with reasoning are the correct escalation. Covering varied async scenarios prevents the model from pattern-matching only the specific cases shown and teaches it to generalise the error handling style.",
    "explanation": "Các ví dụ few-shot cụ thể minh họa chính xác cấu trúc hàm và định dạng khối lỗi giúp model sao chép chuẩn mực phong cách thiết kế của nhóm một cách hoàn hảo.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting (Effective examples)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting#how-to-construct-effective-examples"
      },
      {
        "label": "Anthropic: Multishot (Few-Shot) Prompting",
        "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
    ],
    "id": "ccaf-423"
  },
  {
    "originalId": "q-4-2-007",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / few-shot-ambiguity",
    "difficulty": "application",
    "scenarioId": "s-q-4-2-007",
    "questionEN": "An invoice-extraction pipeline mislabels fields on documents where the correct interpretation is ambiguous. Which few-shot practices should you apply? (Select 2)",
    "question": "Pipeline trích xuất hóa đơn gắn nhãn sai các trường trên các tài liệu có cấu trúc mơ hồ. Những phương pháp Few-shot nào bạn nên áp dụng? (Chọn 2 đáp án đúng)",
    "optionsEN": [
      "A. Add an example for every document variant seen in production so far.",
      "B. Use examples showing correct extraction from varied document structures to fix empty or null extraction of required fields.",
      "C. Replace the examples with a longer natural-language description of each field.",
      "D. Create two to four targeted examples for the ambiguous cases, showing why one interpretation is chosen."
    ],
    "options": [
      "A. Thêm ví dụ cho mọi biến thể tài liệu đã thấy trong môi trường production cho đến nay.",
      "B. Sử dụng các ví dụ thể hiện việc trích xuất chính xác từ các cấu trúc tài liệu đa dạng để sửa lỗi trích xuất rỗng hoặc null cho các trường bắt buộc.",
      "C. Thay thế các ví dụ bằng một mô tả ngôn ngữ tự nhiên dài hơn về từng trường.",
      "D. Tạo từ 2 đến 4 ví dụ có mục tiêu cho các trường hợp mơ hồ, giải thích lý do tại sao một cách hiểu được chọn."
    ],
    "correct": [
      1,
      3
    ],
    "optionExplanations": [
      "Option A ❌ (SAI): Adding examples for every variant causes token bloat and distribution bias; targeted examples work better.",
      "Option B ✅ (ĐÚNG): Showing diverse document layouts teaches the model structural invariance and prevents null extractions.",
      "Option C ❌ (SAI): Natural language descriptions cannot replace concrete structural examples when layout ambiguity exists.",
      "Option D ✅ (ĐÚNG): A small set (2-4) of targeted edge-case examples demonstrating the reasoning clarifies ambiguous boundaries."
    ],
    "rationale": "Effective few-shot prompting uses structurally diverse examples alongside targeted edge cases with explicit reasoning, rather than exhaustive memorization.",
    "explanation": "Thay vì nhồi nhét mọi biến thể, hãy dùng ví dụ đa dạng cấu trúc tài liệu (B) và tập trung 2-4 ví dụ vào các ca mơ hồ có kèm lập luận tại sao lại trích xuất như vậy (D).",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting (Few-shot construction)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting#how-to-construct-effective-examples"
      },
      {
        "label": "Anthropic: Multishot (Few-Shot) Prompting",
        "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      }
    ],
    "id": "ccaf-424",
    "multiple": true
  },
  {
    "originalId": "q-4-3-004",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.3 structured-output / enum-fields",
    "difficulty": "application",
    "scenarioId": "s-q-4-3-004",
    "questionEN": "The moderation system's classification schema has a 'category' field defined as a free-text string. Auditors find 47 different category values in production data, including 'hate speech', 'Hate Speech', 'hate-speech', 'hateful content', and 'hate_speech' — all intended to be the same category. This makes downstream analytics and routing unreliable. What is the best schema fix?",
    "question": "Khi thiết kế một trường danh mục (category) trong schema trích xuất, lựa chọn thiết kế nào ngăn chặn hoàn toàn việc model sinh ra các biến thể chính tả khác nhau (như 'Hate Speech', 'hate-speech', 'hate_speech')?",
    "optionsEN": [
      "A. Add a post-processing normalisation step that maps all variations to canonical category names",
      "B. Change 'category' from free-text to an enum with values like 'hate_speech', 'spam', and 'harassment', plus an 'other' option.",
      "C. Add detailed instructions to the prompt listing the exact category names and their capitalisation so the model always emits the canonical string.",
      "D. Add few-shot examples showing the correct category formatting for each type"
    ],
    "options": [
      "A. Thêm bước chuẩn hóa văn bản sau xử lý để tự map các biến thể về một từ chuẩn.",
      "B. Chuyển trường category từ dạng văn bản tự do (`type: 'string'`) sang kiểu dữ liệu liệt kê có giới hạn (`enum: ['hate_speech', 'spam', 'harassment', 'other']`).",
      "C. Hướng dẫn chi tiết trong prompt về cách viết hoa chữ cái.",
      "D. Thêm ví dụ few-shot minh họa."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Post-processing normalisation adds complexity and requires constant maintenance as new variations appear. The schema should prevent the problem at the source rather than patching it downstream.",
      "Option B ✅ (ĐÚNG): Enum fields constrain the model to predefined values, eliminating spelling and formatting variations. Including 'other' as an enum value handles edge cases without allowing free-text drift. With strict: true, the schema guarantees only valid enum values are returned.",
      "Option C ❌ (SAI): Prompt instructions are probabilistic. The model may still produce variations despite instructions. Schema-level enforcement via enums is deterministic and cannot be overridden.",
      "Option D ❌ (SAI): Few-shot examples improve consistency but cannot guarantee exact string matching. Schema enums are the correct mechanism for constraining categorical output to a fixed set of values."
    ],
    "rationale": "Enum fields constrain the model to predefined values, eliminating spelling and formatting variations. Including 'other' as an enum value handles edge cases without allowing free-text drift. With strict: true, the schema guarantees only valid enum values are returned.",
    "explanation": "Định nghĩa `enum` trong JSON Schema ràng buộc model ở mức cú pháp chỉ được chọn trong danh sách giá trị cố định, triệt tiêu hoàn toàn sự sai lệch về chính tả hay định dạng.",
    "sources": [
      {
        "label": "Lesson 4.2: Structured Output with Tool Use (Enum schema)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-3-structured-output#schema-design-for-production"
      }
    ],
    "id": "ccaf-428"
  },
  {
    "originalId": "q-4-4-002",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 validation-retry / retry-with-error",
    "difficulty": "application",
    "scenarioId": "s-q-4-4-002",
    "questionEN": "Your extraction pipeline retries failed documents, but the retry simply resends the original document with the same prompt. Success rates on retries are only marginally better than the first attempt. Developers have identified that most failures are format mismatches where the model places values in the wrong fields. How should you improve the retry mechanism?",
    "question": "Pipeline trích xuất thử lại các tài liệu bị lỗi bằng cách gửi lại đúng tài liệu gốc với cùng câu prompt ban đầu. Tỷ lệ thành công khi thử lại hầu như không cải thiện. Đa số lỗi là do model đặt nhầm giá trị vào sai trường. Bạn nên cải tiến cơ chế thử lại như thế nào?",
    "optionsEN": [
      "A. Increase the number of retries from 1 to 3, since extraction is non-deterministic and more attempts improve odds",
      "B. Switch to a different model for retries so a fresh perspective catches the errors",
      "C. Skip retries and route all failures directly to human review to avoid wasting API costs",
      "D. Send the original document, the failed extraction, and the validation error naming the misplaced fields."
    ],
    "options": [
      "A. Tăng số lần thử lại từ 1 lên 3 lần.",
      "B. Đổi model khác khi thử lại.",
      "C. Bỏ qua việc thử lại và chuyển thẳng cho con người.",
      "D. Gửi lại tài liệu gốc, kết quả trích xuất bị lỗi trước đó, kèm thông báo lỗi xác thực chỉ rõ đích danh những trường bị đặt sai giá trị."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Naive retries without error feedback produce the same mistakes. More attempts at the same flawed approach yield diminishing returns. The model needs to see what went wrong.",
      "Option B ❌ (SAI): The issue is not the model but the absence of error context. Any model retrying without seeing the specific validation error will likely repeat the same mistakes.",
      "Option C ❌ (SAI): Format mismatches are fixable errors. The model can self-correct when given proper error feedback. Skipping retries wastes the model's self-correction capability for errors that are resolvable.",
      "Option D ✅ (ĐÚNG): Retry-with-error-feedback is dramatically more effective than naive retries. Sending the original document, the failed extraction, and the specific validation error allows the model to self-correct. Format mismatches are fixable errors that respond well to this approach."
    ],
    "rationale": "Retry-with-error-feedback is dramatically more effective than naive retries. Sending the original document, the failed extraction, and the specific validation error allows the model to self-correct. Format mismatches are fixable errors that respond well to this approach.",
    "explanation": "Cơ chế thử lại kèm phản hồi lỗi (retry-with-error-feedback) cung cấp thông tin ngữ cảnh chính xác về điểm sai sót, giúp model tự sửa lỗi với tỷ lệ thành công vượt trội so với thử lại mù quáng (naive retry).",
    "sources": [
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Retry with error feedback)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#retry-with-error-feedback"
      },
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Self-correction flow)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#self-correction-flow-design"
      }
    ],
    "id": "ccaf-433"
  },
  {
    "originalId": "q-4-4-003",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 validation-retry / retry-boundary",
    "difficulty": "application",
    "scenarioId": "s-q-4-4-003",
    "questionEN": "The moderation system validates that every classification includes a 'reasoning' field explaining the decision. When validation fails (empty reasoning), the system retries. For most posts, the retry succeeds after feeding back the error 'reasoning field was empty — provide a brief justification for the classification.' However, for posts in unfamiliar languages, retries consistently fail. What should the system do?",
    "question": "Hệ thống kiểm duyệt xác thực rằng mọi phân loại bài đăng phải có trường `reasoning` giải thích quyết định. Khi trường này bị rỗng, hệ thống thử lại kèm thông báo lỗi và thành công với các bài viết tiếng Anh. Tuy nhiên, với bài viết bằng ngôn ngữ hiếm, việc thử lại luôn thất bại. Hệ thống nên làm gì?",
    "optionsEN": [
      "A. Increase the retry count from 1 to 5 for unfamiliar language posts since the model may succeed with more attempts",
      "B. Retry format errors on analysable posts; route capability gaps like unfamiliar languages to human review.",
      "C. Add the unfamiliar language to the system prompt as a supported language to encourage the model to try harder",
      "D. Remove the reasoning validation requirement for posts in unfamiliar languages"
    ],
    "options": [
      "A. Tăng số lần thử lại từ 1 lên 5 lần cho các ngôn ngữ hiếm.",
      "B. Thử lại lỗi định dạng đối với các bài có thể phân tích được; chuyển tiếp các lỗ hổng năng lực (như ngôn ngữ hiếm mà model không hiểu) sang cho con người rà soát.",
      "C. Thêm ngôn ngữ hiếm vào system prompt và bảo model cố gắng hơn.",
      "D. Bỏ qua yêu cầu giải thích reasoning đối với ngôn ngữ hiếm."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): More retries are ineffective when the model lacks the capability to analyse content in that language. The failure is not a transient format issue — the model genuinely cannot provide reasoning for content it cannot understand.",
      "Option B ✅ (ĐÚNG): The retry boundary distinguishes between fixable format issues and unfixable capability gaps. Empty reasoning on analysable posts is a format error that retries with error feedback can fix. Unfamiliar languages represent absent capability — no amount of retrying will create language understanding. Route these to human review.",
      "Option C ❌ (SAI): Listing an unsupported language in the prompt does not give the model language understanding. This may actually worsen the problem by encouraging fabricated analysis of content the model cannot read.",
      "Option D ❌ (SAI): Removing the validation requirement means these posts would receive classifications without any justification, which undermines auditability. The correct approach is human review, not lower standards."
    ],
    "rationale": "The retry boundary distinguishes between fixable format issues and unfixable capability gaps. Empty reasoning on analysable posts is a format error that retries with error feedback can fix. Unfamiliar languages represent absent capability — no amount of retrying will create language understanding. Route these to human review.",
    "explanation": "Ranh giới thử lại (retry boundary) phân biệt rõ: lỗi định dạng trên bài phân tích được thì sửa được bằng retry; lỗ hổng về năng lực nền tảng (ngôn ngữ không hỗ trợ) thì retry vô ích và phải chuyển cho con người.",
    "sources": [
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Retry boundary)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#the-retry-effectiveness-boundary"
      }
    ],
    "id": "ccaf-434"
  },
  {
    "originalId": "q-4-4-006",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 validation-retry / inter-step-validation",
    "difficulty": "application",
    "scenarioId": "s-q-4-4-006",
    "questionEN": "Your document processing pipeline chains three steps: (1) extract raw text, (2) classify document type, (3) extract structured fields based on type. Step 2 occasionally misclassifies invoices as purchase orders, causing step 3 to extract the wrong fields. The team proposes combining steps 2 and 3 into a single prompt to reduce errors. What is the better approach?",
    "question": "Pipeline xử lý tài liệu liên kết 3 bước: (1) trích xuất dữ liệu, (2) xác thực nghiệp vụ, (3) lưu trữ cơ sở dữ liệu. Nếu bước (2) phát hiện dữ liệu thiếu trường bắt buộc, hành động kiến trúc nào là đúng?",
    "optionsEN": [
      "A. Combine steps 2 and 3 as proposed, since fewer steps means fewer failure points",
      "B. Keep steps separate and validate the classification between steps 2 and 3 before extraction",
      "C. Add more few-shot classification examples to step 2's prompt so misclassifications stop occurring",
      "D. Run step 2 three times and use majority voting to determine the document type"
    ],
    "options": [
      "A. Vẫn ghi dữ liệu rỗng vào database.",
      "B. Kích hoạt lượt thử lại có định hướng (targeted retry) gửi lại tài liệu kèm thông báo lỗi cụ thể về trường bị thiếu cho bước (1), nếu vẫn thất bại thì chuyển cho con người xử lý.",
      "C. Tự động sinh dữ liệu ngẫu nhiên để điền vào.",
      "D. Xóa vĩnh viễn tài liệu khỏi hệ thống."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Combining steps creates a less focused prompt that must handle both classification and extraction simultaneously. This increases attention dilution and makes it harder to diagnose which part fails.",
      "Option B ✅ (ĐÚNG): Keeping steps separate maintains focused prompts. Adding validation between steps catches misclassifications before they cascade into wrong-field extraction. This is the core principle of prompt chaining: focused steps with inter-step validation.",
      "Option C ❌ (SAI): Better examples may help, but without validation between steps, misclassifications still cascade silently into step 3. Inter-step validation is the structural fix.",
      "Option D ❌ (SAI): Majority voting adds cost and latency without addressing the root cause. Validation between steps is more efficient and catches the specific failure mode."
    ],
    "rationale": "Keeping steps separate maintains focused prompts. Adding validation between steps catches misclassifications before they cascade into wrong-field extraction. This is the core principle of prompt chaining: focused steps with inter-step validation.",
    "explanation": "Mô hình xác thực và thử lại có kiểm soát: phản hồi lỗi cụ thể cho bước trích xuất để model quét lại tài liệu nguồn, và suy thoái mềm dẻo sang người duyệt nếu dữ liệu thực sự vắng mặt.",
    "sources": [
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Self-correction flow)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#self-correction-flow-design"
      },
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Retry boundary)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#the-retry-effectiveness-boundary"
      }
    ],
    "id": "ccaf-437"
  },
  {
    "originalId": "q-4-4-007",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 validation-retry / retry-with-error",
    "difficulty": "application",
    "scenarioId": "s-q-4-4-007",
    "questionEN": "Your extraction pipeline has a validation step that checks extracted financial data. When validation fails, the system retries by sending just the original document with the same prompt. Retry success rates are below 10%. The most common failure is the model placing the 'net amount' value in the 'gross amount' field and vice versa. How should the retry be restructured?",
    "question": "Pipeline trích xuất có bước xác thực dữ liệu tài chính. Khi xác thực thất bại, hệ thống gửi lại đúng tài liệu gốc với cùng câu prompt ban đầu nhưng tỷ lệ thành công dưới 10%. Lỗi phổ biến nhất là model đổi chỗ giá trị 'net amount' vào 'gross amount' và ngược lại. Lượt thử lại nên được tái cấu trúc thế nào?",
    "optionsEN": [
      "A. Increase retries from 1 to 5, since more attempts at the same prompt will eventually produce the correct field mapping by chance",
      "B. Send the original document, the failed extraction, and the specific validation error naming the swapped fields.",
      "C. Add a post-processing rule that automatically swaps net and gross amounts when validation detects the pattern",
      "D. Switch to a different model for the retry, since the original model has a persistent field-mapping bias"
    ],
    "options": [
      "A. Tăng số lần thử lại từ 1 lên 5 lần.",
      "B. Gửi lại tài liệu gốc, kết quả trích xuất bị sai trước đó, kèm thông báo lỗi xác thực cụ thể nêu rõ hai trường bị tráo đổi giá trị để model sửa chữa.",
      "C. Thêm code tự động tráo đổi hai giá trị.",
      "D. Đổi sang model khác khi thử lại."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): If the model consistently maps fields incorrectly with the same prompt, more retries without feedback will produce the same incorrect mapping. The model needs to see its specific error.",
      "Option B ✅ (ĐÚNG): Retry-with-error-feedback is dramatically more effective than naive retries. The model seeing its specific mistake (net and gross amounts swapped) and the validation error allows targeted self-correction rather than repeating the same misinterpretation.",
      "Option C ❌ (SAI): Hard-coded swap rules are brittle and mask the underlying extraction error. They also fail if the issue manifests differently in other documents. Error feedback teaches the model to extract correctly.",
      "Option D ❌ (SAI): The issue is the absence of error context in the retry, not a model-specific bias. Any model retrying without seeing the specific validation error will have a low success rate."
    ],
    "rationale": "Retry-with-error-feedback is dramatically more effective than naive retries. The model seeing its specific mistake (net and gross amounts swapped) and the validation error allows targeted self-correction rather than repeating the same misinterpretation.",
    "explanation": "Cung cấp phản hồi lỗi cụ thể chỉ rõ điểm sai sót (Retry with targeted error feedback) giúp model hiểu chính xác nguyên nhân thất bại và tự hoán đổi lại trường dữ liệu một cách thông minh.",
    "sources": [
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Retry with error feedback)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#retry-with-error-feedback"
      },
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Self-correction flow)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#self-correction-flow-design"
      }
    ],
    "id": "ccaf-438"
  },
  {
    "originalId": "q-4-4-008",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 validation-retry / retry-boundary",
    "difficulty": "application",
    "scenarioId": "s-q-4-4-008",
    "questionEN": "A validation-retry loop still fails on the same documents after three attempts each. In which situations will further retries not help? (Select 2)",
    "question": "Một vòng lặp xác thực và thử lại (validation-retry loop) vẫn thất bại trên cùng một tài liệu sau 3 lần thử. Trong những tình huống nào thì việc thử lại thêm sẽ KHÔNG có tác dụng? (Chọn 2 đáp án đúng)",
    "optionsEN": [
      "A. The model placed a correct value in the wrong field on the last attempt.",
      "B. The required information is simply absent from the source document.",
      "C. The validation service timed out on the last attempt.",
      "D. The information exists only in an external document that is not provided in context."
    ],
    "options": [
      "A. Mô hình đã đặt một giá trị đúng vào sai trường ở lần thử cuối cùng.",
      "B. Thông tin được yêu cầu đơn giản là không tồn tại trong tài liệu nguồn.",
      "C. Dịch vụ xác thực đã hết thời gian chờ (timeout) ở lần thử cuối cùng.",
      "D. Thông tin chỉ tồn tại trong một tài liệu bên ngoài không được cung cấp trong ngữ cảnh."
    ],
    "correct": [
      1,
      3
    ],
    "optionExplanations": [
      "Option A ❌ (SAI): Misplaced fields are fixable formatting errors that retry feedback with schema guidance can correct.",
      "Option B ✅ (ĐÚNG): When data is absent from the input, retries cannot conjure it up and only cause hallucinations.",
      "Option C ❌ (SAI): Timeouts are transient errors where another retry often succeeds.",
      "Option D ✅ (ĐÚNG): The model cannot access data outside its context window; retrying without providing the document is futile."
    ],
    "rationale": "Retries succeed on transient failures and correctable reasoning/formatting mistakes, but fail when information is fundamentally absent from the input context.",
    "explanation": "Thử lại vô ích khi thông tin hoàn toàn không có trong tài liệu nguồn (B) hoặc thông tin nằm ở tài liệu bên ngoài chưa được cung cấp trong ngữ cảnh (D). Trong các trường hợp này phải trả về null hoặc bổ sung ngữ cảnh.",
    "sources": [
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Retry boundary)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#the-retry-effectiveness-boundary"
      },
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Retry with error feedback)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#retry-with-error-feedback"
      }
    ],
    "id": "ccaf-439",
    "multiple": true
  },
  {
    "originalId": "q-4-4-009",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 validation-retry / pydantic-validation",
    "difficulty": "application",
    "scenarioId": "s-q-4-4-009",
    "questionEN": "Your extraction pipeline uses tool_use with a JSON schema, so outputs always parse. Finance still reports invoices where line items do not sum to the stated total, and where the due date precedes the invoice date. The team wants retries to receive precise, per-field error messages. What should you add?",
    "question": "Pipeline trích xuất dùng tool_use với JSON schema nên đầu ra luôn đúng cú pháp. Tuy nhiên, kế toán báo cáo nhiều hóa đơn có tổng các mục không khớp tổng tiền ghi trên hóa đơn, và ngày đến hạn lại trước ngày xuất hóa đơn. Nhóm muốn cơ chế thử lại nhận được thông báo lỗi chi tiết theo từng trường. Bạn nên bổ sung thành phần gì?",
    "optionsEN": [
      "A. Tighter JSON schema constraints: numeric minimum and maximum bounds on every amount field and format checks on every date field",
      "B. An instruction telling the model to double-check its own extraction in the same request before responding",
      "C. A Pydantic model whose validators encode the sum and date-order rules, feeding its validation errors into retries",
      "D. A more capable model, since semantic errors indicate the current one is under-powered"
    ],
    "options": [
      "A. Ràng buộc JSON schema chặt chẽ hơn về số min/max.",
      "B. Chỉ thị trong prompt yêu cầu model tự kiểm tra lại trước khi phản hồi.",
      "C. Một mô hình Pydantic với các hàm validator mã hóa quy tắc tính tổng và thứ tự ngày tháng, truyền các thông báo lỗi xác thực này vào lượt thử lại.",
      "D. Nâng cấp lên model mạnh hơn."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Range and format constraints check fields in isolation; both reported failures are relationships between fields, which a JSON schema cannot express.",
      "Option B ❌ (SAI): Same-session self-review retains the generation context and its bias, and produces no machine-readable error for the retry loop to feed back.",
      "Option C ✅ (ĐÚNG): Cross-field semantic rules live in validation code; Pydantic validators express them and raise per-field errors the retry request can quote verbatim.",
      "Option D ❌ (SAI): No model tier guarantees semantic correctness; the fix is validation logic around the model, and an upgrade is the maximum-cost non-answer."
    ],
    "rationale": "The schema already eliminated syntax errors; what remains is semantic validation. Cross-field rules (sums must match, dates must be ordered) cannot be expressed in a JSON schema, so they live in validation code. A Pydantic model with custom validators encodes them and raises specific, per-field error messages that feed the retry-with-error-feedback loop.",
    "explanation": "JSON schema chỉ kiểm tra được cú pháp tầng mặt; các ràng buộc ngữ nghĩa liên trường (tổng các dòng phải bằng grand total, ngày đến hạn > ngày lập) đòi hỏi Pydantic model validator để sinh mã lỗi chính xác cho vòng retry.",
    "sources": [
      {
        "label": "Lesson 4.4: Validation, Retry, and Feedback Loops (Pydantic as the validation layer)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-validation-retry-loops#pydantic-as-the-validation-layer"
      }
    ],
    "id": "ccaf-440"
  },
  {
    "originalId": "q-4-5-002",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 batch-processing / batch-failure",
    "difficulty": "application",
    "scenarioId": "s-q-4-5-002",
    "questionEN": "Your CI/CD pipeline generates nightly security audit reports using the Message Batches API. A batch of 200 documents completes overnight, but 15 documents fail due to exceeding the context window. The team proposes resubmitting the entire batch of 200 documents. What is the correct failure handling strategy?",
    "question": "Trong Message Batches API của Anthropic, trường nào cho phép ứng dụng của bạn đối chiếu và khớp từng kết quả trả về trong file đầu ra batch với yêu cầu gốc ban đầu?",
    "optionsEN": [
      "A. Resubmit the entire batch since you cannot identify which documents failed",
      "B. Resubmit only the 15 failed documents identified by custom_id, chunking the oversized documents before resubmission",
      "C. Switch the entire pipeline to synchronous processing to avoid batch failures",
      "D. Increase the batch processing timeout to give the system more time to handle large documents"
    ],
    "options": [
      "A. `batch_id`",
      "B. `custom_id` (mã định danh duy nhất do phía client tự gán cho mỗi yêu cầu trong file batch)",
      "C. `index`",
      "D. `timestamp`"
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): The batch API uses custom_id fields to correlate request/response pairs. Failed documents can be identified by their custom_id, making full resubmission unnecessary and wasteful.",
      "Option B ✅ (ĐÚNG): Identify failed documents by custom_id, then resubmit only failures with modifications (chunking oversized documents). This is the correct batch failure handling pattern — it avoids reprocessing the 185 successful documents and addresses the root cause of the failures.",
      "Option C ❌ (SAI): Nightly security audits are latency-tolerant workloads perfectly suited for batch processing. Switching to synchronous forfeits the 50% cost savings without solving the oversized document problem.",
      "Option D ❌ (SAI): The failure is due to documents exceeding the context window, not a timeout issue. The documents need to be chunked to fit within the model's context limits."
    ],
    "rationale": "Identify failed documents by custom_id, then resubmit only failures with modifications (chunking oversized documents). This is the correct batch failure handling pattern — it avoids reprocessing the 185 successful documents and addresses the root cause of the failures.",
    "explanation": "Trường `custom_id` được client định nghĩa cho mỗi request trong batch và được giữ nguyên vẹn trong kết quả trả về, cho phép ứng dụng ghép nối chính xác dữ liệu mà không phụ thuộc vào thứ tự xử lý.",
    "sources": [
      {
        "label": "Lesson 4.5: Batch Processing and Prompt Optimisation (Batch failure handling)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-batch-processing#batch-failure-handling"
      },
      {
        "label": "Lesson 4.5: Batch Processing and Prompt Optimisation (custom_id matching)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-batch-processing#the-matching-rule"
      }
    ],
    "id": "ccaf-443"
  },
  {
    "originalId": "q-4-6-001",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 multi-pass-review / multi-pass",
    "difficulty": "application",
    "scenarioId": "s-q-4-6-001",
    "questionEN": "A PR modifying 14 files receives inconsistent review: detailed feedback on some files, superficial comments on others, and contradictory findings (flagging a pattern in one file while approving identical code elsewhere). What is the best restructuring?",
    "question": "Một PR sửa đổi 14 file nhận được kết quả review thiếu nhất quán: nhận xét chi tiết ở một số file, hời hợt ở các file khác, và có mâu thuẫn (gắn cờ cảnh báo mẫu code ở file này nhưng duyệt mẫu code giống hệt ở file khác). Tái cấu trúc nào là tốt nhất?",
    "optionsEN": [
      "A. Switch to a higher-tier model with a larger context window",
      "B. Run three independent passes on the full PR and only flag issues found in at least two passes",
      "C. Split into per-file local analysis passes plus a separate cross-file integration pass",
      "D. Require developers to split large PRs into smaller submissions of 3-4 files"
    ],
    "options": [
      "A. Chuyển sang model tier cao hơn với context window lớn hơn.",
      "B. Chạy 3 lượt độc lập trên toàn bộ PR và chỉ báo cáo các vấn đề xuất hiện ở ít nhất 2 lượt.",
      "C. Tách thành các lượt phân tích cục bộ trên từng file riêng biệt kèm theo một lượt tích hợp riêng rà soát tương tác liên file.",
      "D. Yêu cầu lập trình viên chia nhỏ PR thành các PR 3-4 file."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Larger context windows do not solve attention quality issues. The problem is attention dilution, not context size.",
      "Option B ❌ (SAI): This suppresses real bug detection by requiring consensus on issues that may only be caught intermittently.",
      "Option C ✅ (ĐÚNG): Per-file analysis ensures consistent depth. The integration pass catches cross-file data flow issues. This directly addresses attention dilution.",
      "Option D ❌ (SAI): This shifts burden to developers without improving the review system itself."
    ],
    "rationale": "Per-file analysis ensures consistent depth. The integration pass catches cross-file data flow issues. This directly addresses attention dilution.",
    "explanation": "Kiến trúc multi-pass (rà soát từng file trước, sau đó tích hợp liên file) giải quyết triệt để sự suy giảm chú ý (attention dilution) và đảm bảo độ sâu phân tích đồng đều trên mọi file.",
    "sources": [
      {
        "label": "Lesson 4.6: Multi-Instance Review and Output Validation (Multi-pass review)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-multi-pass-review#multi-pass-review-architecture"
      }
    ],
    "id": "ccaf-448"
  },
  {
    "originalId": "q-4-6-004",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 multi-pass-review / multi-pass",
    "difficulty": "application",
    "scenarioId": "s-q-4-6-004",
    "questionEN": "Your CI/CD code review system analyses pull requests averaging 8-12 files. Reviews are thorough on the first few files but become increasingly superficial on later files, sometimes missing obvious issues. What architectural change best addresses this pattern?",
    "question": "Hệ thống review code trong CI/CD phân tích các PR có quy mô trung bình 20 file. Phương pháp nào đảm bảo chất lượng review đồng đều nhất?",
    "optionsEN": [
      "A. Randomise the file order before each review run so a different subset of files receives the thorough early-pass attention each time.",
      "B. Increase the model's context window to give it more space to analyse all files",
      "C. Split the review into per-file passes so each file gets dedicated attention, then a cross-file integration pass.",
      "D. Add a second full-PR review pass and merge findings from both passes"
    ],
    "options": [
      "A. Nhồi toàn bộ 20 file vào một prompt duy nhất.",
      "B. Kiến trúc multi-pass: chạy các lượt phân tích cục bộ trên từng file riêng biệt trước, sau đó dùng một lượt tích hợp liên file riêng để đánh giá sự tương tác giữa các module.",
      "C. Chỉ review ngẫu nhiên 3 file.",
      "D. Chỉ kiểm tra xem code có compile được hay không."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Randomising order means different files get superficial treatment each time, but does not ensure all files receive thorough review. The root cause — attention dilution — remains.",
      "Option B ❌ (SAI): Attention dilution is not a context window size problem. The model has enough space but distributes attention unevenly across many files.",
      "Option C ✅ (ĐÚNG): Per-file analysis ensures each file receives consistent, thorough attention. The cross-file integration pass then catches issues that span multiple files, such as inconsistent interfaces or data flow problems. This directly solves attention dilution.",
      "Option D ❌ (SAI): A second pass on the full PR suffers from the same attention dilution. Both passes will likely be thorough on early files and superficial on later ones."
    ],
    "rationale": "Per-file analysis ensures each file receives consistent, thorough attention. The cross-file integration pass then catches issues that span multiple files, such as inconsistent interfaces or data flow problems. This directly solves attention dilution.",
    "explanation": "Kiến trúc multi-pass (phân tích từng file rồi tích hợp liên file) ngăn chặn hiện tượng loãng chú ý trên các PR lớn, đảm bảo độ sâu kiểm tra chất lượng đồng đều từ file đầu tiên đến file cuối cùng.",
    "sources": [
      {
        "label": "Lesson 4.6: Multi-Instance Review and Output Validation (Multi-pass review)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-multi-pass-review#multi-pass-review-architecture"
      },
      {
        "label": "Lesson 4.6: Multi-Instance Review and Output Validation (Why context windows do not fix it)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-multi-pass-review#why-larger-context-windows-do-not-fix-this"
      }
    ],
    "id": "ccaf-451"
  },
  {
    "originalId": "q-4-6-005",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 multi-pass-review / self-review-bias",
    "difficulty": "application",
    "scenarioId": "s-q-4-6-005",
    "questionEN": "The moderation team asks a single Claude session to classify a post, then immediately asks the same session to independently review its own classification for quality assurance. The 'review' agrees with the original classification 98% of the time, including cases that human auditors later identify as errors. Why is this self-review ineffective?",
    "question": "Đội ngũ kiểm duyệt yêu cầu một phiên Claude duy nhất phân loại bài đăng, sau đó ngay lập tức yêu cầu chính phiên đó tự đánh giá lại quyết định của mình để đảm bảo chất lượng (QA). Lượt 'tự review' này đồng tình với quyết định ban đầu tới 98% trường hợp, kể cả những ca sau đó kiểm toán con người chỉ ra là sai. Tại sao việc tự review này không hiệu quả?",
    "optionsEN": [
      "A. The model needs a stronger review prompt with explicit instructions to look for errors in the original classification",
      "B. The same session retains the model's reasoning, so it stays anchored to its classification; use a fresh independent instance to review.",
      "C. The model's temperature is too low, producing deterministic agreement — increase temperature for the review pass",
      "D. Self-review is effective but the 98% agreement rate simply reflects high initial accuracy — the 2% disagreement is the expected error rate"
    ],
    "options": [
      "A. Cần viết prompt review mạnh hơn yêu cầu tìm lỗi gắt gao hơn.",
      "B. Cùng một phiên làm việc vẫn giữ nguyên chuỗi suy luận trước đó trong context nên model bị neo giữ (anchored) vào định kiến ban đầu; cần dùng một instance độc lập mới tinh để review.",
      "C. Temperature quá thấp nên gây ra sự đồng thuận tất định.",
      "D. Tự review rất hiệu quả và 98% phản ánh độ chính xác cao."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Stronger instructions do not overcome the fundamental limitation. The same session retains the reasoning context from the original classification, biasing the review toward agreement.",
      "Option B ✅ (ĐÚNG): Self-review within the same session is fundamentally limited because the model's conversation context includes the original reasoning. It will naturally be anchored to its prior conclusions. An independent instance with no access to the original decision evaluates the content fresh, providing genuine quality assurance.",
      "Option C ❌ (SAI): Temperature affects sampling randomness, not reasoning independence. Higher temperature may occasionally produce different outputs but does not create genuine independent review. The model is still anchored to its own prior reasoning in the same session.",
      "Option D ❌ (SAI): Human auditors found errors in cases where the self-review agreed, proving the 98% agreement does not reflect accuracy. The self-review is confirming errors, not catching them, due to same-session reasoning bias."
    ],
    "rationale": "Self-review within the same session is fundamentally limited because the model's conversation context includes the original reasoning. It will naturally be anchored to its prior conclusions. An independent instance with no access to the original decision evaluates the content fresh, providing genuine quality assurance.",
    "explanation": "Tự phê bình trong cùng một phiên bị hạn chế do thiên kiến xác nhận (anchoring bias): model đọc lại lập luận của chính mình trong lịch sử hội thoại và có xu hướng bảo vệ quyết định cũ. Cần một instance mới không mang ngữ cảnh cũ.",
    "sources": [
      {
        "label": "Lesson 4.6: Multi-Instance Review and Output Validation (Self-review limitation)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-multi-pass-review#the-self-review-limitation"
      }
    ],
    "id": "ccaf-452"
  },
  {
    "originalId": "q-4-6-007",
    "source": "Official254",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 multi-pass-review / attention-dilution",
    "difficulty": "application",
    "scenarioId": "s-q-4-6-007",
    "questionEN": "An extraction pipeline processes 50-page legal contracts in a single API call. It captures parties and dates from the first few pages but misses key financial terms in later pages, and occasionally contradicts itself across fields. A colleague suggests simply increasing the context window. What is the correct diagnosis and fix?",
    "question": "Pipeline xử lý hợp đồng pháp lý dài 50 trang trong một lần gọi API duy nhất. Model trích xuất tốt các bên tham gia ở những trang đầu nhưng bỏ sót các điều khoản tài chính quan trọng ở các trang cuối, và đôi khi tự mâu thuẫn giữa các trường. Chẩn đoán và cách khắc phục đúng là gì?",
    "optionsEN": [
      "A. The context window is too small; upgrading to a larger context model will fix the inconsistency",
      "B. This is attention dilution; split into per-section extraction passes plus a cross-section reconciliation pass.",
      "C. Run the full extraction three times and take the most common value for each field",
      "D. Add more detailed instructions about the importance of financial terms to increase the model's focus on those sections"
    ],
    "options": [
      "A. Context window quá nhỏ; chỉ cần đổi sang model lớn hơn.",
      "B. Đây là hiện tượng suy giảm chú ý (attention dilution) trên tài liệu dài; cần chia nhỏ thành các lượt trích xuất theo từng phần (per-section passes) kèm một lượt đối chiếu tổng hợp (cross-section reconciliation pass).",
      "C. Chạy toàn bộ tài liệu 3 lần và lấy giá trị phổ biến nhất.",
      "D. Thêm chỉ thị nhấn mạnh tầm quan trọng của điều khoản tài chính."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): If the document fits in the context window, a larger window does not improve attention quality. The problem is attention dilution over a long document, not context capacity.",
      "Option B ✅ (ĐÚNG): Long documents cause attention dilution: the model attends thoroughly to early content but loses focus on later sections. Per-section passes ensure each part gets dedicated attention, and the integration pass catches contradictions and reconciles fields across sections.",
      "Option C ❌ (SAI): Multiple passes on the full document suffer from the same attention dilution pattern. The model will repeatedly extract early-page data well and miss later-page data.",
      "Option D ❌ (SAI): Instructions cannot override the attention dilution effect of processing a 50-page document in one pass. The structural fix is breaking the extraction into focused per-section passes."
    ],
    "rationale": "Long documents cause attention dilution: the model attends thoroughly to early content but loses focus on later sections. Per-section passes ensure each part gets dedicated attention, and the integration pass catches contradictions and reconciles fields across sections.",
    "explanation": "Tài liệu quá dài gây ra hiện tượng suy giảm chú ý (Lost in the Middle / Attention Dilution). Kiến trúc multi-pass phân tích từng đoạn rồi tổng hợp giúp duy trì độ tập trung tối đa trên toàn bộ 50 trang.",
    "sources": [
      {
        "label": "Lesson 4.6: Multi-Instance Review and Output Validation (Multi-pass architecture)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-multi-pass-review#multi-pass-review-architecture"
      },
      {
        "label": "Lesson 4.6: Multi-Instance Review and Output Validation (Why bigger context does not fix it)",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-multi-pass-review#why-larger-context-windows-do-not-fix-this"
      }
    ],
    "id": "ccaf-454"
  },
  {
    "id": "ccaf-456",
    "originalId": "lnq-076",
    "source": "LNQuyen",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "d5-p2",
    "difficulty": "application",
    "scenarioId": "s-ccaf-076",
    "questionEN": "Documents arrive continuously throughout business hours and need structured data extracted. To reduce costs, you want to use the Message Batches API (50% discount, up-to-24-hour processing window). Your SLA specifies that extraction results must be available within 30 hours of document arrival with 99.9% reliability. Which batching strategy is most appropriate?",
    "question": "Tài liệu liên tục đến trong suốt giờ làm việc và cần được trích xuất dữ liệu có cấu trúc. Để giảm chi phí, bạn muốn dùng Message Batches API (giảm giá 50%, cửa sổ xử lý lên đến 24 giờ). SLA của bạn quy định rằng kết quả extraction phải sẵn có trong vòng 30 giờ kể từ khi tài liệu đến, với độ tin cậy 99.9%. Chiến lược batching nào là phù hợp nhất?",
    "optionsEN": [
      "A. Submit batches every 6 hours containing documents from that window",
      "B. Submit a single batch at end of day containing all documents from that day",
      "C. Submit batches every 4 hours containing documents from that window",
      "D. Use the real-time API for all documents instead of batch processing"
    ],
    "options": [
      "A. Gửi các batch mỗi 6 giờ chứa các tài liệu trong khung thời gian đó",
      "B. Gửi một batch duy nhất vào cuối ngày chứa tất cả tài liệu của ngày hôm đó",
      "C. Gửi các batch mỗi 4 giờ chứa các tài liệu trong khung thời gian đó",
      "D. Sử dụng real-time API cho tất cả tài liệu thay vì xử lý theo batch"
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Thời gian chờ tối đa 4 giờ cộng với SLO xử lý batch lên đến 24 giờ cho ra kịch bản xấu nhất là 28 giờ, để lại một khoảng đệm 2 giờ so với SLA 30 giờ nhằm hấp thụ sự biến động của batch và đạt được 99.9%. Gửi batch mỗi 6 giờ (A) cho ra kịch bản xấu nhất đúng bằng 30 giờ, không có biên độ an toàn nào; một batch duy nhất vào cuối ngày (B) có thể khiến một tài liệu đến sớm phải chờ vượt xa mốc 30 giờ; và việc dùng real-time API cho tất cả (D) đáp ứng SLA một cách hiển nhiên nhưng lại từ bỏ khoản tiết kiệm chi phí 50% mà câu hỏi yêu cầu bạn phải đạt được.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Max 4-hour wait plus up to 24-hour batch SLO gives a 28-hour worst case, leaving a 2-hour cushion under the 30-hour SLA to absorb batch variance and hit 99.9%. Submitting every 6 hours (A) gives a worst-case of exactly 30 hours with no safety margin, a single end-of-day batch (B) can leave an early document waiting well over 30 hours, and using the real-time API for everything (D) meets the SLA trivially but throws away the 50% cost saving the question asks you to capture.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Giải thích:\nThời gian chờ tối đa 4 giờ cộng với SLO xử lý batch lên đến 24 giờ cho ra kịch bản xấu nhất là 28 giờ, để lại một khoảng đệm 2 giờ so với SLA 30 giờ nhằm hấp thụ sự biến động của batch và đạt được 99.9%. Gửi batch mỗi 6 giờ (A) cho ra kịch bản xấu nhất đúng bằng 30 giờ, không có biên độ an toàn nào; một batch duy nhất vào cuối ngày (B) có thể khiến một tài liệu đến sớm phải chờ vượt xa mốc 30 giờ; và việc dùng real-time API cho tất cả (D) đáp ứng SLA một cách hiển nhiên nhưng lại từ bỏ khoản tiết kiệm chi phí 50% mà câu hỏi yêu cầu bạn phải đạt được.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-458",
    "originalId": "lnq-111",
    "source": "LNQuyen",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "d5-p3",
    "difficulty": "application",
    "scenarioId": "s-ccaf-095",
    "questionEN": "Your team is extracting structured data from 50,000 legacy legal contracts under a two-week deadline. Initial testing with 500 sample documents shows 82% pass JSON schema first attempt, while the remaining 18% fall due to diverse issues—missing required fields, malformed dates, and incorrectly identified parties. Documents that fail typically need refinements targeting their specific failure modes before extraction succeeds. Which batch processing strategy is the most cost-efficient while still meeting the deadline?",
    "question": "Nhóm của bạn đang trích xuất dữ liệu có cấu trúc (structured data) từ 50.000 hợp đồng pháp lý cũ (legacy legal contracts) trong thời hạn hai tuần. Testing ban đầu với 500 tài liệu mẫu cho thấy 82% pass JSON schema ngay ở lần thử đầu tiên, trong khi 18% còn lại thất bại vì nhiều vấn đề khác nhau — thiếu các field bắt buộc, ngày tháng sai định dạng (malformed dates), và xác định sai các bên liên quan (parties). Các tài liệu thất bại thường cần những điều chỉnh (refinement) nhắm đúng vào failure mode cụ thể của chúng trước khi extraction thành công. Chiến lược batch processing nào là tiết kiệm chi phí nhất trong khi vẫn đáp ứng được deadline?",
    "optionsEN": [
      "A. Split documents into 10 sequential batches of 5,000 each, analysing results and refining prompts between batches to improve extraction quality progressively.",
      "B. Submit all 50,000 documents via batch API, then submit failed extractions in successive batches— refining prompts between each batch—until all documents pass validation.",
      "C. Use the real-time API for all 50,000 documents since the batch API's 24-hour processing window creates unacceptable deadline risk.",
      "D. Process 2,000 sample documents via real time API to identify failure patterns and refine prompts, then batch process all 50,000 with the optimized prompts."
    ],
    "options": [
      "A. Chia tài liệu thành 10 batch tuần tự, mỗi batch 5.000 tài liệu, phân tích kết quả và tinh chỉnh (refine) prompt giữa các batch để cải thiện chất lượng trích xuất một cách tăng dần.",
      "B. Gửi toàn bộ 50.000 tài liệu qua batch API, sau đó gửi các trích xuất thất bại trong các batch kế tiếp - tinh chỉnh prompt giữa mỗi batch - cho đến khi tất cả tài liệu vượt qua validation.",
      "C. Dùng real-time API cho toàn bộ 50.000 tài liệu vì cửa sổ xử lý (processing window) 24 giờ của batch API tạo ra rủi ro về deadline không thể chấp nhận được.",
      "D. Xử lý 2.000 tài liệu mẫu (sample) qua real-time API để xác định các mẫu lỗi (failure pattern) và tinh chỉnh prompt, sau đó xử lý toàn bộ 50.000 tài liệu bằng batch với các prompt đã được tối ưu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-462",
    "originalId": "lnq-151",
    "source": "LNQuyen",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "D5 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-122",
    "questionEN": "Your conversational AI tutor has a 2,800-token system prompt containing teaching methodology, persona guidelines, and detailed written instructions for adapting explanations to different proficiency levels. User testing reveals that in conversations exceeding 12 turns (approximately 4,000 tokens of conversation history), the assistant increasingly ignores the proficiency-adaptation guidelines, defaulting to intermediate-level explanations regardless of the learner's stated level. What's the most effective approach to ensure consistent adherence to these guidelines throughout extended conversations?",
    "question": "Trợ lý gia sư hội thoại AI (conversational AI tutor) của bạn có một system prompt dài 2.800 token chứa phương pháp giảng dạy, hướng dẫn về persona, và các hướng dẫn chi tiết bằng văn bản để điều chỉnh cách giải thích theo các trình độ khác nhau. Kiểm thử người dùng cho thấy trong các cuộc hội thoại vượt quá 12 turn (khoảng 4.000 token lịch sử hội thoại), assistant ngày càng bỏ qua các hướng dẫn điều chỉnh theo trình độ, mặc định về các giải thích ở mức trung cấp bất kể trình độ mà người học đã nêu. Cách tiếp cận nào hiệu quả nhất để đảm bảo tuân thủ nhất quán các hướng dẫn này trong suốt các cuộc hội thoại kéo dài?",
    "optionsEN": [
      "A. Inject a condensed reminder of the proficiency requirements into the conversation as a system message every 4-5 turns.",
      "B. Replace the verbose proficiency guidelines with few-shot examples demonstrating appropriate responses at each proficiency level, showing concrete differences in vocabulary, complexity, and explanation depth.",
      "C. Restructure the system prompt to place the proficiency-adaptation rules in a clearly-marked final section immediately before the conversation history begins.",
      "D. After each assistant response, make a separate API call to evaluate whether the difficulty level matched the learner's profile, regenerating responses that don't align."
    ],
    "options": [
      "A. Chèn một lời nhắc cô đọng về các yêu cầu về trình độ (proficiency) vào cuộc hội thoại dưới dạng một system message sau mỗi 4-5 turn.",
      "B. Thay thế các hướng dẫn về trình độ (proficiency) dài dòng bằng các ví dụ few-shot minh họa phản hồi phù hợp ở từng cấp độ trình độ, thể hiện rõ sự khác biệt cụ thể về từ vựng, độ phức tạp, và mức độ giải thích chi tiết.",
      "C. Tái cấu trúc system prompt để đặt các quy tắc điều chỉnh theo trình độ (proficiency-adaptation) vào một phần cuối được đánh dấu rõ ràng, ngay trước khi lịch sử hội thoại bắt đầu.",
      "D. Sau mỗi phản hồi của assistant, thực hiện một lệnh gọi API riêng để đánh giá xem mức độ khó có phù hợp với hồ sơ (profile) của người học hay không, tạo lại các phản hồi không phù hợp."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-464",
    "originalId": "lnq-172",
    "source": "LNQuyen",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "D5 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-127",
    "questionEN": "Your research assistant helps users analyze academic papers over extended conversations. User testing reveals a recurring issue: after conversations exceed 60K tokens, users ask follow-up questions requiring precise numerical details from papers discussed earlier—sample sizes, exact p-values, specific inclusion criteria. Your current approach summarizes paper discussions after 8 turns to stay within context limits. Users report that responses to these precision-dependent questions are often hedged or inaccurate. What's the most effective architectural change?",
    "question": "Trợ lý nghiên cứu của bạn giúp người dùng phân tích các bài báo học thuật qua các cuộc hội thoại kéo dài. Kiểm thử người dùng cho thấy một vấn đề lặp lại: sau khi cuộc hội thoại vượt quá 60K token, người dùng đặt các câu hỏi tiếp nối đòi hỏi các chi tiết số liệu chính xác từ các bài báo đã thảo luận trước đó—cỡ mẫu, giá trị p chính xác, các tiêu chí lựa chọn cụ thể. Cách tiếp cận hiện tại của bạn là tóm tắt các cuộc thảo luận về bài báo sau mỗi 8 lượt (turns) để duy trì trong giới hạn context. Người dùng báo cáo rằng các phản hồi cho những câu hỏi đòi hỏi độ chính xác này thường bị rào đón (hedged) hoặc không chính xác. Thay đổi kiến trúc nào là hiệu quả nhất?",
    "optionsEN": [
      "A. Implement retrieval that re-injects relevant paper sections when the user's question suggests they need specific numerical details.",
      "B. Maintain a structured database of key facts extracted from each paper (sample sizes, statistics, methods) and retrieve relevant entries into context when precision-dependent questions are detected.",
      "C. Keep source text from methodology and results sections in context permanently, while summarizing only the conversational discussion and interpretation portions.",
      "D. Use a separate Claude call with explicit instructions to generate higher-fidelity summaries that preserve all numerical details and statistical values."
    ],
    "options": [
      "A. Triển khai cơ chế retrieval để chèn lại (re-inject) các phần liên quan của bài báo khi câu hỏi của người dùng cho thấy họ cần các chi tiết số liệu cụ thể.",
      "B. Duy trì một cơ sở dữ liệu có cấu trúc chứa các sự kiện chính được trích xuất từ mỗi bài báo (cỡ mẫu, số liệu thống kê, phương pháp) và truy xuất các mục liên quan vào context khi phát hiện các câu hỏi phụ thuộc vào độ chính xác.",
      "C. Giữ nguyên văn bản nguồn từ các phần phương pháp (methodology) và kết quả (results) trong context vĩnh viễn, trong khi chỉ tóm tắt các phần thảo luận và diễn giải mang tính hội thoại.",
      "D. Sử dụng một lệnh gọi Claude riêng với chỉ dẫn rõ ràng để tạo ra các bản tóm tắt có độ trung thực cao hơn, giữ lại toàn bộ chi tiết số liệu và giá trị thống kê."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option B is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-465",
    "originalId": "lnq-184",
    "source": "LNQuyen",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "D5 Core Concepts",
    "difficulty": "application",
    "scenarioId": "s-ccaf-133",
    "questionEN": "You're implementing a caching layer for API responses to speed up the /products endpoint. You have a rough idea—Redis with a 5-minute TTL—but you're new to production caching and aren't sure what other considerations a robust implementation requires. What's the most effective way to start your iterative workflow?",
    "question": "Bạn đang triển khai một lớp caching cho các API response nhằm tăng tốc endpoint /products. Bạn có một ý tưởng sơ bộ — dùng Redis với TTL 5 phút — nhưng bạn còn mới trong việc caching cho môi trường production và chưa chắc còn những cân nhắc nào khác mà một triển khai vững chắc (robust) cần có. Đâu là cách hiệu quả nhất để bắt đầu quy trình làm việc lặp (iterative workflow) của bạn?",
    "optionsEN": [
      "A. Ask Claude to interview you about the caching requirements before implementing, surfacing considerations like invalidation strategies, cache layers, consistency guarantees, and failure modes.",
      "B. Use plan mode to analyze the current/products endpoint implementation, then provide your caching requirements once Claude explains how the existing code is structured.",
      "C. Start with a minimal request: \"Add Redis caching to/products with 5-minute TTL.\" Add features and fix issues through follow-up prompts as problems surface during testing.",
      "D. Write a specification with your known requirements and \"TBD\" markers for uncertain areas, having Claude propose solutions for each TBD as it implements."
    ],
    "options": [
      "A. Yêu cầu Claude phỏng vấn bạn về các yêu cầu caching trước khi triển khai, làm nổi bật các cân nhắc như chiến lược invalidation, các lớp cache, đảm bảo tính nhất quán, và các trường hợp lỗi (failure modes).",
      "B. Dùng plan mode để phân tích cách triển khai hiện tại của endpoint /products, sau đó cung cấp yêu cầu caching của bạn sau khi Claude giải thích cấu trúc code hiện có.",
      "C. Bắt đầu với một yêu cầu tối giản: \"Add Redis caching to /products with 5-minute TTL.\" Bổ sung tính năng và sửa lỗi qua các prompt tiếp theo khi vấn đề xuất hiện trong quá trình kiểm thử.",
      "D. Viết một bản đặc tả với các yêu cầu đã biết của bạn và các đánh dấu \"TBD\" cho những phần chưa chắc chắn, để Claude đề xuất giải pháp cho từng TBD khi triển khai."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Đáp án chính xác theo nguyên tắc thiết kế.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Option A is correct per Anthropic guidelines.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Giải thích:\nTheo tài liệu chuẩn Claude Certified Architect của Anthropic, phương án này đáp ứng đúng yêu cầu kiến trúc và thực tiễn thiết kế.",
    "sources": [
      {
        "label": "Anthropic Claude Certified Architect Study Guide",
        "url": "https://claudecertificationguide.com"
      }
    ]
  },
  {
    "id": "ccaf-467",
    "originalId": "vie-009",
    "source": "VieHub",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 message-batches-api / failure-handling",
    "difficulty": "application",
    "scenarioId": "s-ccaf-164",
    "questionEN": "Situation: You need to extract financial data from 10,000 invoices overnight. You want to save API costs, but 5% of the invoices are very long and might exceed the context limit. You decide to use the Message Batches API. How should you handle the 5% that fail the batch processing?",
    "question": "Tình huống: Bạn cần trích xuất dữ liệu tài chính từ 10.000 hóa đơn qua đêm. Bạn muốn tiết kiệm chi phí API, nhưng 5% hóa đơn rất dài và có thể vượt quá context limit. Bạn quyết định sử dụng Message Batches API. Bạn nên xử lý 5% số hóa đơn bị lỗi như thế nào?",
    "optionsEN": [
      "A. You cannot retry them; batch processing is 'all or nothing'.",
      "B. Parse the assistant text to find the word 'Error', then process those manually.",
      "C. Identify the failures using their `custom_id`, split the long documents, and re-submit only the failed ones.",
      "D. Use synchronous API calls as a fallback inside the batch request."
    ],
    "options": [
      "A. Không thể thử lại; batch processing là cơ chế 'được tất cả hoặc mất tất cả' (all or nothing).",
      "B. Phân tích text của assistant để tìm từ 'Error', sau đó xử lý thủ công các hóa đơn đó.",
      "C. Xác định các request thất bại bằng trường `custom_id`, chia nhỏ tài liệu dài và chỉ submit lại những request bị lỗi.",
      "D. Sử dụng lệnh gọi API đồng bộ làm fallback ngay bên trong batch request."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ✅ (ĐÚNG): Message Batches API sử dụng trường `custom_id` để liên kết chính xác giữa request gửi đi và response trả về. Bạn nên dùng `custom_id` để lọc ra đúng các hóa đơn thất bại, chia nhỏ chúng và gửi lại một batch mới thay vì chạy lại toàn bộ 10.000 tài liệu.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "The Message Batches API uses `custom_id` to correlate requests and responses. You should use this ID to identify failed requests and re-submit only those, rather than re-running the entire batch.",
    "explanation": "✅ Đáp án đúng: C\n\n💡 Rationale (VieHub):\nThe Message Batches API uses `custom_id` to correlate requests and responses. You should use this ID to identify failed requests and re-submit only those, rather than re-running the entire batch.\n\n🔍 Phân tích chi tiết (Vietnamese):\nMessage Batches API sử dụng trường `custom_id` để liên kết chính xác giữa request gửi đi và response trả về. Bạn nên dùng `custom_id` để lọc ra đúng các hóa đơn thất bại, chia nhỏ chúng và gửi lại một batch mới thay vì chạy lại toàn bộ 10.000 tài liệu.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-471",
    "originalId": "vie-028",
    "source": "VieHub",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / structured-data-pruning",
    "difficulty": "application",
    "scenarioId": "s-ccaf-181",
    "questionEN": "Situation: You gave the document analysis agent access to a general-purpose tool `fetch_url`. Production logs show this agent now frequently downloads search engine results pages to perform ad hoc web search—behavior that should be routed through the web-search agent. Which fix is most effective?",
    "question": "Tình huống: Bạn cấp cho document analysis agent một tool đa năng `fetch_url`. Logs môi trường production cho thấy agent này thường xuyên tự tiện tải các trang kết quả tìm kiếm để tự làm web search — hành vi vốn dĩ phải đi qua web-search agent chuyên trách. Giải pháp khắc phục nào hiệu quả nhất?",
    "optionsEN": [
      "A. Replace `fetch_url` with a `load_document` tool that validates that URLs point to document formats.",
      "B. Remove `fetch_url` from the document analysis agent and route all URL fetching through the coordinator.",
      "C. Implement filtering that blocks `fetch_url` calls to known search engine domains.",
      "D. Add instructions to the document analysis agent prompt that `fetch_url` should only be used to download documents."
    ],
    "options": [
      "A. Thay thế `fetch_url` bằng một tool chuyên dụng `load_document` có xác thực kiểm tra URL phải trỏ đúng đến các định dạng tài liệu hợp lệ (như PDF, DOCX).",
      "B. Xóa bỏ tool `fetch_url` khỏi document analysis agent và định tuyến toàn bộ thao tác tải URL qua coordinator.",
      "C. Triển khai bộ lọc để chặn các lệnh gọi `fetch_url` trỏ đến các domain tìm kiếm đã biết.",
      "D. Thêm chỉ dẫn vào prompt của document analysis agent cấm không được dùng `fetch_url` vào mục đích khác ngoài tải tài liệu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Xử lý ngay tại nguồn bằng cách yêu cầu upstream subagents chỉ trả về dữ liệu cấu trúc súc tích thay vì nội dung thô và chuỗi chain-of-thought giúp giảm đáng kể lượng token mà không làm mất thông tin cốt lõi.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Replacing a general-purpose tool with a document-specific tool that validates URLs against document formats fixes the root cause by constraining capability at the interface level (principle of least privilege).",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Rationale (EN):\nReplacing a general-purpose tool with a document-specific tool that validates URLs against document formats fixes the root cause by constraining capability at the interface level (principle of least privilege).\n\n🔍 Giải thích chi tiết (VI):\nThay thế công cụ đa năng bằng một công cụ chuyên biệt có xác thực định dạng tài liệu giúp ngăn chặn hành vi sai lệch ngay từ cấp độ giao diện (nguyên tắc đặc quyền tối thiểu - least privilege), tin cậy hơn nhiều so với dặn dò qua prompt.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-473",
    "originalId": "vie-033",
    "source": "VieHub",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 message-batches-api / sync-vs-batch-routing",
    "difficulty": "application",
    "scenarioId": "s-ccaf-186",
    "questionEN": "Situation: The synthesis agent often needs to verify specific claims while merging results. Currently, it returns control to the coordinator, which calls the web-search agent. This adds latency. 85% of verifications are simple fact checks. Which approach is most effective to reduce overhead?",
    "question": "Tình huống: Synthesis agent thường xuyên cần xác minh các tuyên bố cụ thể trong khi tổng hợp kết quả. Hiện tại, nó phải trả quyền điều khiển về cho coordinator để gọi web-search agent, gây tăng thêm độ trễ. 85% các nhu cầu xác minh chỉ là kiểm tra dữ liệu sự thật đơn giản. Cách tiếp cận nào giảm thiểu chi phí điều phối tốt nhất?",
    "optionsEN": [
      "A. Give the synthesis agent access to all web-search tools.",
      "B. Have the synthesis agent accumulate all verification needs and return them as a batch.",
      "C. Have the web-search agent proactively cache extra context around each source.",
      "D. Give the synthesis agent a limited-scope `verify_fact` tool for simple checks, while routing complex verifications through the coordinator."
    ],
    "options": [
      "A. Cấp cho synthesis agent toàn quyền truy cập vào tất cả các công cụ của web-search.",
      "B. Yêu cầu synthesis agent tích lũy toàn bộ các nhu cầu xác minh và gửi về cho coordinator trong một batch duy nhất.",
      "C. Yêu cầu web-search agent chủ động lưu thêm ngữ cảnh mở rộng xung quanh từng nguồn tài liệu vào cache.",
      "D. Cấp cho synthesis agent một tool `verify_fact` giới hạn phạm vi cho các kiểm tra đơn giản, và chỉ định tuyến các xác minh phức tạp qua coordinator."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ✅ (ĐÚNG): Các tác vụ chặn quy trình (blocking checks) cần phản hồi đồng bộ tức thì; các tác vụ lên lịch có hạn chót linh hoạt (hàng tuần, hàng đêm) có thể hấp thụ độ trễ lên đến 24 giờ của Batch API để tiết kiệm 50% chi phí."
    ],
    "rationale": "A limited-scope fact-verification tool lets the synthesis agent handle 85% of simple checks directly, eliminating most loops, while applying the principle of least privilege.",
    "explanation": "✅ Đáp án đúng: D\n\n💡 Rationale (EN):\nA limited-scope fact-verification tool lets the synthesis agent handle 85% of simple checks directly, eliminating most loops, while applying the principle of least privilege.\n\n🔍 Giải thích chi tiết (VI):\nMột tool kiểm tra dữ liệu có phạm vi giới hạn cho phép synthesis agent tự xử lý 85% các trường hợp đơn giản mà không cần gọi qua coordinator, vừa giảm độ trễ vừa đảm bảo nguyên tắc đặc quyền tối thiểu.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "id": "ccaf-482",
    "originalId": "vie-101",
    "source": "VieHub",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 message-batches-api / premerge-vs-overnight",
    "difficulty": "application",
    "scenarioId": "s-ccaf-238",
    "questionEN": "A 14-file PR review produces inconsistent results: detailed comments on some files, superficial on others, missed bugs, and contradictory feedback across near-identical code. How should you restructure the review?",
    "question": "Một lượt review PR thay đổi 14 file đem lại kết quả không ổn định: nhận xét chi tiết ở một số file nhưng hời hợt ở các file khác, bỏ sót bug thật, và đưa ra phản hồi mâu thuẫn trên các đoạn code tương tự nhau. Bạn nên tái cấu trúc quy trình review này như thế nào?",
    "optionsEN": [
      "A. Split into focused passes: per-file local analysis, then a separate integration pass for cross-file data flows",
      "B. Require developers to split large PRs into 3-4 file chunks",
      "C. Switch to a higher-tier model with a larger context window",
      "D. Run three full-PR passes and only report issues found in at least two"
    ],
    "options": [
      "A. Chia thành các pass tập trung: phân tích cục bộ từng file trước, sau đó chạy một pass tích hợp riêng để kiểm tra luồng dữ liệu liên file (cross-file data flows).",
      "B. Yêu cầu developer bắt buộc phải chia nhỏ PR lớn thành các PR nhỏ chỉ từ 3–4 file.",
      "C. Chuyển sang sử dụng model tier cao hơn với context window lớn hơn để review toàn bộ 14 file trong một lần.",
      "D. Chạy ba lượt review độc lập trên toàn bộ PR và chỉ báo cáo những phát hiện xuất hiện trong ít nhất hai lượt chạy."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Batch processing có thể mất tới 24 giờ và không cam kết SLA về độ trễ — không thể chấp nhận đối với kiểm tra chặn pre-merge nhưng cực kỳ lý tưởng cho báo cáo qua đêm.",
      "Option B ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option C ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic.",
      "Option D ❌ (SAI): Không phải là giải pháp kiến trúc tối ưu theo tài liệu Anthropic."
    ],
    "rationale": "Focused passes address the root cause — attention dilution across many files at once — while a separate integration pass still catches cross-file issues.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Rationale (EN):\nFocused passes address the root cause — attention dilution across many files at once — while a separate integration pass still catches cross-file issues.\n\n🔍 Giải thích chi tiết (VI):\nChia thành các pass tập trung giải quyết tận gốc hiện tượng suy giảm chú ý (attention dilution) khi xử lý quá nhiều file cùng lúc, trong khi pass tích hợp riêng biệt vẫn đảm bảo bắt được các lỗi tương tác giữa các file.",
    "sources": [
      {
        "label": "VieHub CCAF Luyện Thi (Study Guide + Practice Exam)",
        "url": "https://viehub.io.vn/hoc-tap/ccaf-luyen-thi"
      }
    ]
  },
  {
    "originalId": "q-5-1-005",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / tool-result-trimming",
    "difficulty": "application",
    "scenarioId": "s-q-5-1-005",
    "questionEN": "An analytics agent queries Snowflake and receives 40+ columns per row, only 5 of which are relevant to the user's question about quarterly revenue. The agent appends the full result set to context. After three such queries the window is nearly full and follow-up questions fail. What is the most effective fix?",
    "question": "Biện pháp phòng thủ hiệu quả nhất để ngăn chặn tấn công Prompt Injection gián tiếp (Indirect Prompt Injection) khi agent đọc dữ liệu từ các trang web bên ngoài là gì?",
    "optionsEN": [
      "A. Upgrade to a model with a larger context window so that full result sets can be accommodated across more queries.",
      "B. Trim tool results to only the relevant columns before appending them to the conversation context.",
      "C. Store all query results in an external database and have the agent retrieve specific values on demand instead of keeping results in context.",
      "D. Limit the number of rows returned by each query to reduce the total data volume in context."
    ],
    "options": [
      "A. Tắt kết nối internet của máy chủ.",
      "B. Bọc nội dung dữ liệu bên ngoài vào các thẻ XML rõ ràng (ví dụ: `<external_content>...</external_content>`), và chỉ thị rõ cho model rằng nội dung bên trong thẻ chỉ là dữ liệu để phân tích, không bao giờ được coi là hướng dẫn thực thi.",
      "C. Xóa bỏ toàn bộ các thẻ HTML khỏi trang web.",
      "D. Đổi sang model có kích thước nhỏ hơn."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): A larger context window postpones the problem but does not solve it. Each full result set still wastes tokens on 35+ irrelevant columns, and the context will eventually fill regardless of size.",
      "Option B ✅ (ĐÚNG): Tool result trimming removes irrelevant fields before they enter the context window. Keeping only the 5 relevant columns from each 40+ column result set dramatically reduces token consumption, allowing the agent to handle many more queries within the same context budget.",
      "Option C ❌ (SAI): External storage adds infrastructure complexity without addressing the core issue. The agent still needs some result data in context to reason about it. Trimming irrelevant fields is simpler and directly reduces context consumption.",
      "Option D ❌ (SAI): Row limits reduce data volume but may exclude relevant rows. The problem is column-level verbosity (35+ irrelevant columns per row), not row count. Trimming columns preserves all relevant rows whilst eliminating irrelevant fields."
    ],
    "rationale": "Tool result trimming removes irrelevant fields before they enter the context window. Keeping only the 5 relevant columns from each 40+ column result set dramatically reduces token consumption, allowing the agent to handle many more queries within the same context budget.",
    "explanation": "Phân định ranh giới ngữ cảnh bằng thẻ XML và thiết lập chỉ thị rào chắn nghiêm ngặt giúp model nhận thức rõ dữ liệu bên ngoài chỉ là đối tượng để phân tích, không phải lệnh chỉ đạo hệ thống.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management (Tool result trimming)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management#tool-result-trimming"
      },
      {
        "label": "Lesson 5.1: Context Window Management (Upstream optimisation)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management#upstream-agent-optimisation"
      }
    ],
    "id": "ccaf-493"
  },
  {
    "originalId": "q-5-1-009",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / progressive-summarisation",
    "difficulty": "application",
    "scenarioId": "s-q-5-1-009",
    "questionEN": "A docs team processes a 500,000-line codebase by having Claude Code read files and generate docs, instructing it to 'summarise each module after documenting it, then discard the detailed source from context.' After processing 20 modules, the docs for module 21 reference class names from module 3 that were renamed in module 12. What caused this failure?",
    "question": "Nhóm tài liệu xử lý codebase 500.000 dòng bằng cách cho Claude Code đọc file và dặn: 'Tóm tắt mỗi module sau khi viết xong tài liệu, sau đó loại bỏ mã nguồn chi tiết khỏi ngữ cảnh'. Sau khi xử lý 20 module, tài liệu của module 21 lại viện dẫn tên class cũ từ module 3 vốn đã được đổi tên ở module 12. Điều gì đã gây ra lỗi này?",
    "optionsEN": [
      "A. Progressive summarisation lost the rename detail: when module 12's summary replaced its source code, the rename was condensed to 'various refactoring changes', so the agent retained module 3's original class names from its earlier summary",
      "B. The agent's context window overflowed, causing it to hallucinate class names from earlier modules",
      "C. Claude Code cached module 3's source code and served the stale version instead of the updated file on disk",
      "D. The model confused similar class names because it processed too many modules in a single session"
    ],
    "options": [
      "A. Việc tóm tắt lũy tiến (progressive summarisation) làm mất chi tiết đổi tên: khi bản tóm tắt của module 12 thay thế code nguồn của nó, hành động đổi tên bị nén thành 'các thay đổi refactoring khác nhau', do đó agent vẫn giữ tên class cũ từ module 3.",
      "B. Context window của agent bị tràn ngầm.",
      "C. Claude Code cache lại file cũ.",
      "D. Model bị nhầm lẫn tên class."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Progressive summarisation is lossy. The summary of module 12 likely compressed the rename into a generic phrase, while module 3's summary still referenced the original class names. When the agent documented module 21, it found conflicting names across summaries and defaulted to the earlier, more prominent reference. Critical cross-module changes like renames must be tracked in a persistent facts block outside summarised context.",
      "Option B ❌ (SAI): The team explicitly manages context by summarising and discarding source code, so the context window is not overflowing. The problem is the quality of information retained in summaries, not context overflow.",
      "Option C ❌ (SAI): Claude Code does not cache file contents between reads. Each Read tool call fetches the current file from disk. The issue is that summarised context retained old class names, not that file reads returned stale data.",
      "Option D ❌ (SAI): The question specifies the exact failure: module 21 references class names from module 3 that were renamed in module 12. This is not a confusion issue but a direct consequence of losing the rename detail during progressive summarisation."
    ],
    "rationale": "Progressive summarisation is lossy. The summary of module 12 likely compressed the rename into a generic phrase, while module 3's summary still referenced the original class names. When the agent documented module 21, it found conflicting names across summaries and defaulted to the earlier, more prominent reference. Critical cross-module changes like renames must be tracked in a persistent facts block outside summarised context.",
    "explanation": "Tóm tắt lũy tiến làm thất thoát thông tin chi tiết (lossy compression). Việc nén sự kiện đổi tên thành một câu chung chung khiến agent không biết rằng tên class cũ đã bị thay thế.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management (Progressive summarisation)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management#the-progressive-summarisation-trap"
      },
      {
        "label": "Lesson 5.1: Context Window Management (Persistent facts)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management#tool-result-trimming"
      }
    ],
    "id": "ccaf-497"
  },
  {
    "originalId": "q-5-1-010",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / position-effects",
    "difficulty": "application",
    "scenarioId": "s-q-5-1-010",
    "questionEN": "A multi-agent system runs a 45-minute deep research workflow. Around the 30-minute mark, the coordinator's synthesis quality drops: it refers to 'the key findings' instead of specific statistics it cited earlier, and misattributes a claim from the financial subagent to the news subagent. No token limits or errors have been hit. What is the most likely diagnosis and correct mitigation?",
    "question": "Hệ thống đa tác nhân chạy quy trình nghiên cứu sâu kéo dài 45 phút. Đến phút thứ 30, chất lượng tổng hợp của coordinator giảm sút rõ rệt: nó viện dẫn 'các phát hiện chính' chung chung thay vì số liệu thống kê cụ thể và gán nhầm nhận định từ agent tài chính sang agent tin tức. Giới hạn token chưa bị chạm. Chẩn đoán và cách khắc phục là gì?",
    "optionsEN": [
      "A. The model is experiencing 'fatigue' from a long session and needs a cooldown period before continuing",
      "B. Context degradation: early results are buried deep in a long context. Consolidate key findings into a structured block near the end.",
      "C. The token limit has been silently exceeded and the API is truncating early messages. Upgrade to a larger context window model",
      "D. The subagents are returning inconsistent data, confusing the coordinator. Add data validation to each subagent's output before it reaches the coordinator"
    ],
    "options": [
      "A. Model bị mệt mỏi sau phiên làm việc dài và cần nghỉ ngơi.",
      "B. Hiện tượng suy thoái ngữ cảnh (Context Degradation): các kết quả ban đầu bị chôn sâu trong lịch sử hội thoại dài; cần hợp nhất các phát hiện cốt lõi vào một khối dữ liệu có cấu trúc đặt ở gần cuối ngữ cảnh (hoặc lưu ra scratchpad).",
      "C. Token đã bị tràn ngầm và API tự cắt bớt tin nhắn.",
      "D. Subagent trả về dữ liệu mâu thuẫn."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): LLMs do not experience fatigue. Each inference is independent. The degradation is caused by context window dynamics, not model tiredness.",
      "Option B ✅ (ĐÚNG): Context degradation occurs when important information is buried deep in a long conversation. The model's attention to early content diminishes as new content accumulates. Consolidating key findings into a recent, structured block keeps them in the model's effective attention window without losing the specifics.",
      "Option C ❌ (SAI): The question states no token limits have been hit. Context degradation occurs well before token limits are reached — it is an attention quality issue, not a capacity issue.",
      "Option D ❌ (SAI): The coordinator previously cited these same findings correctly earlier in the session. The issue is not data quality from subagents but the coordinator's degrading attention to that data over time."
    ],
    "rationale": "Context degradation occurs when important information is buried deep in a long conversation. The model's attention to early content diminishes as new content accumulates. Consolidating key findings into a recent, structured block keeps them in the model's effective attention window without losing the specifics.",
    "explanation": "Khi hội thoại kéo dài, các thông tin chi tiết ban đầu bị chôn sâu vào giữa ngữ cảnh và chịu ảnh hưởng của hiện tượng lost-in-the-middle / context degradation. Cần tái hợp nhất các phát hiện quan trọng vào một khối cấu trúc ở gần cuối context.",
    "sources": [
      {
        "label": "Lesson 5.4: Codebase Exploration and Context Degradation (Context degradation)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-codebase-exploration#context-degradation"
      },
      {
        "label": "Lesson 5.4: Codebase Exploration and Context Degradation (Summary injection)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-codebase-exploration#summary-injection-between-phases"
      }
    ],
    "id": "ccaf-498"
  },
  {
    "originalId": "q-5-2-007",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 escalation-ambiguity / escalation-triggers",
    "difficulty": "application",
    "scenarioId": "s-q-5-2-007",
    "questionEN": "Which conditions are valid triggers for escalating a support conversation to a human agent? (Select 3)",
    "question": "Những điều kiện nào sau đây là các chỉ dấu kích hoạt hợp lệ để chuyển tiếp cuộc hội thoại hỗ trợ sang cho nhân viên con người? (Chọn 3 đáp án đúng)",
    "optionsEN": [
      "A. The customer's messages show negative sentiment.",
      "B. The customer explicitly asks for a human.",
      "C. Policy is silent or ambiguous on the customer's specific request.",
      "D. The agent's self-reported confidence drops below a threshold.",
      "E. The agent cannot make meaningful progress on the case."
    ],
    "options": [
      "A. Tin nhắn của khách hàng thể hiện cảm xúc tiêu cực.",
      "B. Khách hàng yêu cầu rõ ràng được nói chuyện với con người.",
      "C. Chính sách của công ty im lặng hoặc mơ hồ về yêu cầu cụ thể của khách hàng.",
      "D. Điểm tin cậy tự báo cáo của agent tụt xuống dưới ngưỡng.",
      "E. Agent không thể tạo ra tiến triển có ý nghĩa sau nhiều lượt trao đổi."
    ],
    "correct": [
      1,
      2,
      4
    ],
    "optionExplanations": [
      "Option A ❌ (SAI): Sentiment is an unreliable proxy for complexity; frustrated users can often be resolved with straightforward policy answers.",
      "Option B ✅ (ĐÚNG): Explicit customer requests for a human must always be honored immediately without obstruction.",
      "Option C ✅ (ĐÚNG): Policy gaps or ambiguities require human judgment so the agent does not improvise rules.",
      "Option D ❌ (SAI): LLM self-reported confidence scores are poorly calibrated and make unreliable escalation triggers.",
      "Option E ✅ (ĐÚNG): Inability to make meaningful progress (looping or stagnation) is an authoritative escalation trigger."
    ],
    "rationale": "Anthropic defines three valid escalation triggers: explicit human requests, policy ambiguity/gaps, and inability to make meaningful progress. Sentiment and self-reported confidence are unreliable proxies.",
    "explanation": "3 điều kiện kích hoạt chuyển tiếp hợp lệ theo tài liệu Anthropic: khách hàng yêu cầu gặp người (B), chính sách công ty im lặng hoặc mơ hồ (C), và agent bế tắc không tạo được tiến triển (E). Cảm xúc tiêu cực và điểm tin cậy tự báo cáo là các chỉ số không đáng tin cậy.",
    "sources": [
      {
        "label": "Lesson 5.2: Escalation and Ambiguity (The three valid escalation triggers)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-escalation-ambiguity#the-three-valid-escalation-triggers"
      },
      {
        "label": "Lesson 5.2: Escalation and Ambiguity Resolution (Explicit escalation criteria)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-escalation-ambiguity#explicit-escalation-criteria-in-system-prompts"
      }
    ],
    "id": "ccaf-503",
    "multiple": true
  },
  {
    "originalId": "q-5-3-005",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 error-propagation / silent-suppression",
    "difficulty": "application",
    "scenarioId": "s-q-5-3-005",
    "questionEN": "A multi-agent system has subagents for web search, academic database, and industry reports. The academic database subagent hits a 403 Forbidden on a specific journal, catches the error, and returns an empty result set marked as successful. The coordinator produces a final report with no academic sources. What is the critical failure in this design?",
    "question": "Khi phát hiện một subagent trong hệ thống đa tác nhân bị rơi vào vòng lặp vô tận (infinite loop) do gọi tool liên tục không dừng, cơ chế an toàn cấp bách nhất cần được kích hoạt là gì?",
    "optionsEN": [
      "A. The coordinator should validate that all subagents return non-empty results before producing the final report.",
      "B. The subagent silently suppressed the access failure by returning empty results as success, preventing the coordinator from attempting recovery or noting the gap in coverage.",
      "C. The subagent should have retried the request with exponential backoff, as 403 errors are often transient.",
      "D. The entire workflow should have been terminated when the academic database subagent encountered the 403 error."
    ],
    "options": [
      "A. Chờ cho đến khi máy chủ hết tiền trong tài khoản thẻ tín dụng.",
      "B. Thiết lập giới hạn cứng về ngân sách vòng lặp (Iteration Cap / Step Budget) và thời gian thực thi tối đa (Timeout), cưỡng chế dừng subagent và kích hoạt quy trình xử lý lỗi khi chạm ngưỡng.",
      "C. Tự động xóa mã nguồn của subagent.",
      "D. Gửi thông báo cho toàn bộ người dùng trong công ty."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Requiring non-empty results from all subagents would cause the workflow to fail when a subagent legitimately finds no matching data. The issue is that the error was suppressed, not that the coordinator failed to validate result volume.",
      "Option B ✅ (ĐÚNG): Silent suppression — returning empty results marked as success — is the worst error propagation anti-pattern. The coordinator believes the academic search succeeded and found nothing, so it produces a report without academic sources and without noting the coverage gap. The subagent should have returned structured error context with the failure type, what was attempted, and potential alternatives.",
      "Option C ❌ (SAI): 403 Forbidden is a permission error, not a transient error. Retrying will not resolve it — the subagent lacks the required access credentials. The correct response is to propagate the error with its type so the coordinator knows the failure is not retryable.",
      "Option D ❌ (SAI): Workflow termination on a single subagent failure wastes partial results from the web search and industry reports subagents that may have completed successfully. The coordinator should proceed with available results and annotate the coverage gap."
    ],
    "rationale": "Silent suppression — returning empty results marked as success — is the worst error propagation anti-pattern. The coordinator believes the academic search succeeded and found nothing, so it produces a report without academic sources and without noting the coverage gap. The subagent should have returned structured error context with the failure type, what was attempted, and potential alternatives.",
    "explanation": "Giới hạn số lần lặp tối đa (Iteration Cap / Max Turns) và thời gian timeout là chốt an toàn cơ học bắt buộc trong mọi hệ thống agentic để ngăn chặn tình trạng cạn kiệt tài nguyên.",
    "sources": [
      {
        "label": "Lesson 5.3: Error Propagation in Multi-Agent Systems (Silent suppression anti-pattern)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-error-propagation#the-two-anti-patterns"
      },
      {
        "label": "Lesson 5.3: Error Propagation in Multi-Agent Systems (Access failure vs empty)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-error-propagation#access-failure-vs-valid-empty-result"
      }
    ],
    "id": "ccaf-505"
  },
  {
    "originalId": "q-5-3-006",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 error-propagation / silent-suppression",
    "difficulty": "application",
    "scenarioId": "s-q-5-3-006",
    "questionEN": "The data platform agent queries three sources in sequence: Snowflake (succeeds), PostgreSQL (returns a connection timeout), and a pricing API (succeeds). The agent silently skips the PostgreSQL failure and produces a report using only Snowflake and API data, without informing the user that customer data is missing. What is the critical design failure?",
    "question": "Một công cụ phân tích cơ sở dữ liệu lớn đôi khi mất hơn 60 giây để chạy xong. Để ngăn chặn việc client bị ngắt kết nối do HTTP timeout, giải pháp thiết kế nào là phù hợp nhất?",
    "optionsEN": [
      "A. The agent should retry the PostgreSQL query automatically with exponential backoff before producing the report.",
      "B. The agent silently suppresses the error instead of propagating structured error context that annotates which data sources failed and what coverage the report actually has.",
      "C. The agent should abort the entire report if any single data source fails, to avoid producing incomplete results.",
      "D. The orchestrator should pre-check all data source connections before allowing the agent to begin querying."
    ],
    "options": [
      "A. Tăng timeout của trình duyệt lên 1 giờ.",
      "B. Chuyển đổi công cụ sang mô hình xử lý bất đồng bộ (Asynchronous job pattern): trả về ngay một `job_id` và cung cấp một công cụ phụ trợ để kiểm tra trạng thái tiến độ (`check_job_status`).",
      "C. Hủy bỏ tác vụ nếu quá 5 giây.",
      "D. Giảm dung lượng cơ sở dữ liệu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Automatic retries are appropriate for transient errors, but the critical failure is that the agent silently suppresses the error. Even after retries exhaust, the agent must surface the failure to the user rather than producing an incomplete report without disclosure.",
      "Option B ✅ (ĐÚNG): Silent error suppression is one of the most dangerous anti-patterns in multi-source systems. The agent must propagate structured error context — identifying which sources failed, what data is missing, and what coverage the final report represents — so the user can make informed decisions about the report's completeness.",
      "Option C ❌ (SAI): Aborting on any failure is overly conservative. Partial results with clear coverage annotations are often more useful than no results. The fix is transparency about what is missing, not refusing to produce anything.",
      "Option D ❌ (SAI): Pre-checking connections does not prevent runtime failures (a source can become unavailable between the check and the query). The agent must handle failures gracefully at query time with structured error propagation."
    ],
    "rationale": "Silent error suppression is one of the most dangerous anti-patterns in multi-source systems. The agent must propagate structured error context — identifying which sources failed, what data is missing, and what coverage the final report represents — so the user can make informed decisions about the report's completeness.",
    "explanation": "Async Job Pattern (khởi tạo job trả về ID và kiểm tra trạng thái định kỳ) là mẫu thiết kế tiêu chuẩn cho các thao tác tốn thời gian, ngăn ngừa triệt để hiện tượng timeout mạng.",
    "sources": [
      {
        "label": "Lesson 5.3: Error Propagation in Multi-Agent Systems (Silent suppression anti-pattern)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-error-propagation#the-two-anti-patterns"
      },
      {
        "label": "Lesson 5.3: Error Propagation in Multi-Agent Systems (Structured error context)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-error-propagation#structured-error-context"
      }
    ],
    "id": "ccaf-506"
  },
  {
    "originalId": "q-5-3-007",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 error-propagation / coverage-annotations",
    "difficulty": "application",
    "scenarioId": "s-q-5-3-007",
    "questionEN": "A documentation generation pipeline uses Claude Code to produce docs from three sources: source code comments, existing wiki pages, and API schema files. During a run, the wiki page retrieval fails with a timeout, but the source code and API schema are available. The pipeline currently halts entirely on any source failure. What is the best error handling strategy?",
    "question": "Pipeline sinh tài liệu tổng hợp từ 3 nguồn: comment trong code, trang wiki nội bộ và schema API. Trong quá trình chạy, việc lấy dữ liệu wiki bị timeout nhưng code và schema API vẫn khả dụng. Pipeline hiện dừng hoàn toàn khi có bất kỳ nguồn nào bị lỗi. Chiến lược xử lý lỗi tốt nhất là gì?",
    "optionsEN": [
      "A. Retry the wiki retrieval three times with exponential backoff. If all retries fail, halt the pipeline to prevent incomplete documentation",
      "B. Return structured error context for the wiki failure, proceed with available sources, and mark the gaps that lack wiki content.",
      "C. Silently skip the wiki source and generate documentation from the remaining two sources without noting the omission",
      "D. Use the source code comments to infer what the wiki pages would have contained, filling in the gaps with generated content"
    ],
    "options": [
      "A. Thử lại việc lấy wiki 3 lần rồi dừng pipeline nếu vẫn thất bại.",
      "B. Trả về ngữ cảnh lỗi có cấu trúc cho sự cố wiki, tiếp tục sinh tài liệu từ các nguồn khả dụng hiện có, và đánh dấu rõ ràng các khoảng trống thông tin do thiếu nội dung wiki.",
      "C. Âm thầm bỏ qua wiki và không ghi chú gì.",
      "D. Tự động suy đoán nội dung wiki từ code."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Halting the entire pipeline because one of three sources is unavailable wastes the successful results from the other two sources. Documentation from source code and API schemas is still valuable even without wiki content.",
      "Option B ✅ (ĐÚNG): This produces maximum value from available sources while maintaining transparency about what is missing. Structured error context enables intelligent recovery (retry later, alert the team). Explicit gap markers prevent users from trusting incomplete documentation as complete.",
      "Option C ❌ (SAI): Silent omission hides the failure. Users would trust the documentation as complete, not knowing that wiki-sourced context (which may contain critical operational notes or caveats) is missing.",
      "Option D ❌ (SAI): Inferring wiki content from source code produces hallucinated documentation that appears authoritative. Wiki pages often contain operational context, known issues, and tribal knowledge that cannot be inferred from code."
    ],
    "rationale": "This produces maximum value from available sources while maintaining transparency about what is missing. Structured error context enables intelligent recovery (retry later, alert the team). Explicit gap markers prevent users from trusting incomplete documentation as complete.",
    "explanation": "Nguyên tắc suy thoái mềm dẻo (graceful degradation): tận dụng tối đa các nguồn dữ liệu khả dụng để tạo ra giá trị, đồng thời minh bạch gắn nhãn các phần dữ liệu bị khuyết thiếu.",
    "sources": [
      {
        "label": "Lesson 5.3: Error Propagation in Multi-Agent Systems (Structured error context)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-error-propagation#structured-error-context"
      },
      {
        "label": "Lesson 5.3: Error Propagation in Multi-Agent Systems (Coverage annotations)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-error-propagation#coverage-annotations"
      }
    ],
    "id": "ccaf-507"
  },
  {
    "originalId": "q-5-4-011",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 codebase-exploration / crash-recovery",
    "difficulty": "application",
    "scenarioId": "s-q-5-4-011",
    "questionEN": "A coordinator spawns four Claude Code subagents to explore a large codebase overnight: one maps the data layer, one traces API routes, one audits tests, one catalogues dependencies. Three hours in, the machine restarts. On rerun, the coordinator starts every exploration again from zero. What design change lets a restarted run continue from where the crash left off?",
    "question": "Coordinator kích hoạt 4 subagent Claude Code để khảo sát codebase qua đêm. Sau 3 giờ, máy tính bị khởi động lại đột ngột. Khi chạy lại, coordinator bắt đầu mọi thứ từ con số 0. Thay đổi thiết kế nào giúp tiến trình chạy tiếp từ điểm bị gián đoạn?",
    "optionsEN": [
      "A. Resume the coordinator's previous session so the conversation history is restored",
      "B. Have each agent export structured state to a manifest the coordinator loads on resume",
      "C. Run the four explorations sequentially in one session so all findings stay in a single context",
      "D. Wrap each subagent in automatic retries so transient failures cannot end the run"
    ],
    "options": [
      "A. Resume phiên cũ của coordinator để khôi phục lịch sử chat.",
      "B. Cho mỗi agent xuất trạng thái có cấu trúc ra một file manifest mà coordinator sẽ đọc nạp khi khởi động lại.",
      "C. Chạy tuần tự 4 tác vụ trong một phiên duy nhất.",
      "D. Bọc mỗi subagent trong một vòng lặp retry tự động."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Session resumption restores the coordinator's own conversation, not the subagents' accumulated findings: their contexts were separate and are gone. The coordinator would still have to re-run the explorations to regain that knowledge.",
      "Option B ✅ (ĐÚNG): Structured state exports are the crash-recovery pattern: each agent persists its findings to a known location as it progresses, so after a failure the coordinator loads the manifest, sees what is complete, and seeds the remaining agents with prior findings instead of starting from zero.",
      "Option C ❌ (SAI): Serialising the work gives up parallelism and pushes every verbose discovery into one context window, and a crash still loses the lot: an in-memory context is not durable state, however it is arranged.",
      "Option D ❌ (SAI): Retries help an agent survive a failed tool call; they do nothing for a machine restart that kills the whole run. Recovery needs durable state that outlives the process, not more attempts within it."
    ],
    "rationale": "The guide's 5.4 bullets name structured state persistence for crash recovery: each agent exports state to a known location, and the coordinator loads a manifest on resume and injects it into agent prompts. Session resumption, single-context serialisation, and retries all leave the findings inside process memory that a crash destroys.",
    "explanation": "Cơ chế duy trì trạng thái có cấu trúc (Structured state persistence): mỗi agent lưu tiến độ và kết quả ra file manifest trên đĩa, cho phép khôi phục tức thì sau sự cố sập nguồn mà không phải chạy lại.",
    "sources": [
      {
        "label": "Lesson 5.4: Codebase Exploration (Crash recovery via structured state manifests)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-codebase-exploration#crash-recovery-via-structured-state-manifests"
      },
      {
        "label": "Claude Docs: Agent SDK Sessions",
        "url": "https://code.claude.com/docs/en/agent-sdk/sessions"
      }
    ],
    "id": "ccaf-515"
  },
  {
    "originalId": "q-5-5-004",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 human-review-calibration / aggregate-metrics-trap",
    "difficulty": "application",
    "scenarioId": "s-q-5-5-004",
    "questionEN": "A structured data extraction system processes invoices, purchase orders, and contracts. The monitoring dashboard shows 97% overall extraction accuracy and the team considers the system production-ready. A detailed audit reveals: invoices 99.5% accuracy (80% of volume), purchase orders 98% accuracy (15% of volume), contracts 72% accuracy (5% of volume). What does this reveal and what action is required?",
    "question": "Một hệ thống AI đánh giá rủi ro tín dụng. Đội ngũ muốn xác minh tính ổn định của hệ thống trước khi triển khai. Phương pháp kiểm thử nào sau đây là quan trọng nhất?",
    "optionsEN": [
      "A. The system is performing well. 72% on contracts is acceptable since contracts represent only 5% of volume and barely affect the overall metric",
      "B. The aggregate metric is masking a severe per-type disparity. Give contracts mandatory review and report per-type metrics.",
      "C. The training data needs rebalancing so that contracts represent a larger proportion, which will naturally improve contract accuracy",
      "D. The 97% threshold should be raised to 99% overall to force improvement across all document types"
    ],
    "options": [
      "A. Chỉ kiểm tra trên 10 hồ sơ khách hàng quen thuộc.",
      "B. Đánh giá phân tầng (stratified evaluation) trên các phân khúc nhân khẩu học, mức thu nhập và vùng miền khác nhau để phát hiện các sai lệch tiềm ẩn đối với từng nhóm đối tượng.",
      "C. Chạy kiểm tra hiệu năng tốc độ mạng.",
      "D. Đếm số lượng dòng code của prompt."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Acceptability depends on the business impact, not volume percentage. Contract extraction errors may have severe financial or legal consequences despite low volume. A 28% error rate on any document type is significant.",
      "Option B ✅ (ĐÚNG): This is a textbook case of aggregate metrics hiding per-type problems. 97% overall is misleading because high-volume invoice accuracy (99.5%) overwhelms the poor contract performance (72%). Per-type metrics would have surfaced this immediately. Contracts need different treatment until the extraction quality is acceptable.",
      "Option C ❌ (SAI): LLMs used for extraction are not retrained on production data this way. The issue is monitoring visibility and operational response, not model training data distribution.",
      "Option D ❌ (SAI): Raising the aggregate threshold does not address per-type disparities. Even at 99% overall, contract accuracy could remain low if invoice volume continues to dominate the metric. The solution is per-type metrics, not a higher aggregate bar."
    ],
    "rationale": "This is a textbook case of aggregate metrics hiding per-type problems. 97% overall is misleading because high-volume invoice accuracy (99.5%) overwhelms the poor contract performance (72%). Per-type metrics would have surfaced this immediately. Contracts need different treatment until the extraction quality is acceptable.",
    "explanation": "Đánh giá phân tầng trên nhiều nhóm đối tượng đảm bảo mô hình hoạt động công bằng và chính xác đồng đều trên toàn bộ các phân khúc, tránh thiên kiến cục bộ.",
    "sources": [
      {
        "label": "Lesson 5.5: Human Review and Confidence Calibration (Aggregate metrics trap)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration#the-aggregate-metrics-trap"
      }
    ],
    "id": "ccaf-519"
  },
  {
    "originalId": "q-5-5-005",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 human-review-calibration / per-field-calibration",
    "difficulty": "application",
    "scenarioId": "s-q-5-5-005",
    "questionEN": "A contract extraction system reports 96% overall accuracy. The team plans to auto-approve all extractions where model confidence exceeds 90%. A pilot reveals party name extraction achieves 99% accuracy but indemnification clause extraction only 71%, even though the model reports high confidence on both. What should they implement before automating?",
    "question": "Nguyên tắc 'Human-in-the-loop' (con người can thiệp trong vòng lặp) nên được áp dụng bắt buộc trong tình huống nào sau đây?",
    "optionsEN": [
      "A. Raise the automation confidence threshold from 90% to 99% to ensure only the most reliable extractions are automated.",
      "B. Calibrate confidence thresholds per field type using labelled validation sets, and implement stratified sampling to continuously monitor accuracy by document type and field segment.",
      "C. Exclude indemnification clauses from automation entirely and continue automating all other field types at the 90% threshold.",
      "D. Train a separate classification model to predict extraction accuracy before deciding whether to automate each extraction."
    ],
    "options": [
      "A. Khi trích xuất tiêu đề của một bài báo công khai.",
      "B. Khi thực hiện các hành động có tác động lớn không thể đảo ngược (như xóa cơ sở dữ liệu, chuyển khoản tài chính trên ngưỡng an toàn, hoặc triển khai code lên môi trường production).",
      "C. Khi dịch một đoạn văn bản ngắn.",
      "D. Khi đếm số lượng ký tự trong file."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Raising the threshold does not fix the calibration problem. The model reports high confidence even for indemnification clauses where it achieves only 71% accuracy. Raw confidence scores are unreliable without calibration.",
      "Option B ✅ (ĐÚNG): Field-level confidence calibration using ground truth data exposes the discrepancy between reported confidence and actual accuracy. Stratified sampling provides ongoing monitoring to detect novel error patterns. Together, these ensure automation is only applied where validated accuracy justifies it.",
      "Option C ❌ (SAI): This addresses the known problem but does not detect future calibration issues with other field types. Without systematic calibration and monitoring, other fields with hidden accuracy problems will be automated incorrectly.",
      "Option D ❌ (SAI): A separate model adds infrastructure complexity when the solution is to calibrate the existing confidence scores against labelled data. Calibration directly addresses the unreliable confidence outputs without requiring additional ML infrastructure."
    ],
    "rationale": "Field-level confidence calibration using ground truth data exposes the discrepancy between reported confidence and actual accuracy. Stratified sampling provides ongoing monitoring to detect novel error patterns. Together, these ensure automation is only applied where validated accuracy justifies it.",
    "explanation": "Các thao tác có rủi ro cao, bán kính ảnh hưởng lớn (blast radius) hoặc không thể hoàn tác bắt buộc phải có sự phê duyệt trực tiếp của con người để đảm bảo an toàn tuyệt đối.",
    "sources": [
      {
        "label": "Lesson 5.5: Human Review and Confidence Calibration (Field-level calibration)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration#field-level-confidence-calibration"
      },
      {
        "label": "Lesson 5.5: Human Review and Confidence Calibration (Stratified sampling)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration#stratified-random-sampling"
      }
    ],
    "id": "ccaf-520"
  },
  {
    "originalId": "q-5-5-006",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 human-review-calibration / aggregate-metrics-trap",
    "difficulty": "application",
    "scenarioId": "s-q-5-5-006",
    "questionEN": "The data platform team runs a human review of the agent's federated query reports. Reviewers sample 50 reports and find an overall accuracy rate of 97%. Management approves the system for production. Three weeks later, users report that currency conversion calculations in cross-border revenue reports are wrong 40% of the time. How did the review process fail?",
    "question": "Một đội ngũ tạo tài liệu API cho 150 endpoint với Claude Code. Để kiểm soát chất lượng, họ nên áp dụng chiến lược lấy mẫu review như thế nào?",
    "optionsEN": [
      "A. The sample size of 50 reports was too small to detect a 40% error rate in currency conversions.",
      "B. The reviewers used aggregate accuracy metrics that masked category-specific failures such as the 40% currency error rate.",
      "C. The reviewers were not domain experts in currency conversion and could not identify the errors.",
      "D. The agent's accuracy degraded over time due to model drift, and the initial 97% rate was genuinely correct at the time of review."
    ],
    "options": [
      "A. Lấy mẫu ngẫu nhiên đồng đều 15% tổng số endpoint.",
      "B. Sử dụng phương pháp lấy mẫu phân tầng (stratified sampling): rà soát 100% các tài liệu về cổng thanh toán và bảo mật tài chính (nhóm rủi ro cao), 10% các tài liệu truy vấn dữ liệu công khai và 5% các tài liệu công cụ nội bộ.",
      "C. Chỉ review duy nhất 1 endpoint đầu tiên.",
      "D. Không cần review con người vì Claude Code rất thông minh."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): A 40% error rate in any category should be detectable in 50 reports — but only if the sample includes enough reports from that category. The problem is sampling strategy, not sample size.",
      "Option B ✅ (ĐÚNG): This is the aggregate metrics trap. When a low-frequency report type (cross-border revenue) has high error rates, the overall accuracy metric is dominated by high-frequency, easy report types. Stratified random sampling across report categories would have caught the currency conversion failures.",
      "Option C ❌ (SAI): Reviewer expertise is a valid concern but is not the structural failure. Even expert reviewers would miss the problem if the sample did not include enough cross-border reports. The sampling methodology is the root cause.",
      "Option D ❌ (SAI): LLMs served via API do not experience gradual model drift within a three-week window. The error pattern was present during the review but hidden by aggregate metrics that did not stratify by report category."
    ],
    "rationale": "This is the aggregate metrics trap. When a low-frequency report type (cross-border revenue) has high error rates, the overall accuracy metric is dominated by high-frequency, easy report types. Stratified random sampling across report categories would have caught the currency conversion failures.",
    "explanation": "Lấy mẫu phân tầng phân bổ công sức review tương xứng với mức độ rủi ro nghiệp vụ: các endpoint tài chính có hậu quả pháp lý nghiêm trọng cần kiểm tra 100%, trong khi các endpoint ít rủi ro có thể lấy mẫu tỷ lệ thấp.",
    "sources": [
      {
        "label": "Lesson 5.5: Human Review and Confidence Calibration (Aggregate metrics trap)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration#the-aggregate-metrics-trap"
      }
    ],
    "id": "ccaf-521"
  },
  {
    "originalId": "q-5-5-009",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 human-review-calibration / stratified-sampling",
    "difficulty": "application",
    "scenarioId": "s-q-5-5-009",
    "questionEN": "Your extraction pipeline reports 97% aggregate accuracy, and you want to automate high-confidence extractions. Which safeguards should be in place before you reduce human review? (Select 3)",
    "question": "Pipeline trích xuất báo cáo độ chính xác gộp 97%, và nhóm muốn bật tự động hóa cho các trích xuất có độ tin cậy cao. Những biện pháp bảo vệ nào bắt buộc phải có trước khi cắt giảm người duyệt? (Chọn 3 đáp án đúng)",
    "optionsEN": [
      "A. Calibrate field-level confidence thresholds against a labelled validation set.",
      "B. Rely on the aggregate accuracy figure once it has held steady for a full quarter.",
      "C. Verify accuracy separately by document type and field segment, not just in aggregate.",
      "D. Keep stratified random samples of high-confidence extractions under review to measure error rates and catch novel patterns.",
      "E. Expand the review team until every extraction can be checked by hand."
    ],
    "options": [
      "A. Hiệu chuẩn các ngưỡng độ tin cậy ở cấp trường trên một tập dữ liệu kiểm chứng đã được gán nhãn.",
      "B. Tin tưởng vào con số độ chính xác gộp một khi nó đã giữ ổn định trong một quý đầy đủ.",
      "C. Xác minh độ chính xác riêng biệt theo từng loại tài liệu và từng phân khúc trường dữ liệu, thay vì chỉ xem xét tổng thể.",
      "D. Duy trì việc lấy mẫu ngẫu nhiên phân tầng đối với các trích xuất có độ tin cậy cao để đánh giá tỷ lệ lỗi và phát hiện các mẫu dị thường mới.",
      "E. Mở rộng đội ngũ đánh giá cho đến khi mọi trích xuất đều có thể được kiểm tra thủ công."
    ],
    "correct": [
      0,
      2,
      3
    ],
    "optionExplanations": [
      "Option A ✅ (ĐÚNG): Field-level calibration against ground-truth validation data ensures confidence thresholds accurately separate high-accuracy from error-prone outputs.",
      "Option B ❌ (SAI): Aggregate metrics conceal catastrophic errors in rare document types or mission-critical fields.",
      "Option C ✅ (ĐÚNG): Disaggregated evaluation by document category and field segment exposes blind spots before automation is enabled.",
      "Option D ✅ (ĐÚNG): Stratified ongoing spot-checking ensures drift and novel edge cases are caught even in automated batches.",
      "Option E ❌ (SAI): 100% manual review completely contradicts automation goals and does not scale."
    ],
    "rationale": "Automating high-confidence extraction safely requires calibrated field-level thresholds, disaggregated segmentation checks, and ongoing stratified spot-auditing.",
    "explanation": "3 biện pháp bảo vệ cốt lõi trước khi tự động hóa: hiệu chuẩn ngưỡng tin cậy theo từng trường trên tập kiểm chứng (A), phân tích độ chính xác theo từng loại tài liệu/phân khúc (C), và duy trì lấy mẫu phân tầng kiểm tra định kỳ (D).",
    "sources": [
      {
        "label": "Lesson 5.5: Human Review and Confidence Calibration (Aggregate metrics trap)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration#the-aggregate-metrics-trap"
      },
      {
        "label": "Lesson 5.5: Human Review and Confidence Calibration (Stratified sampling)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration#stratified-random-sampling"
      },
      {
        "label": "Lesson 5.5: Human Review and Confidence Calibration (Field-level calibration)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-human-review-calibration#field-level-confidence-calibration"
      }
    ],
    "id": "ccaf-524",
    "multiple": true
  },
  {
    "originalId": "q-5-6-001",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 information-provenance / conflict-handling",
    "difficulty": "application",
    "scenarioId": "s-q-5-6-001",
    "questionEN": "A multi-agent research system produces a synthesis report on market trends. Two credible sources report different growth rates for the same sector: Source A reports 12% growth (2023 data) and Source B reports 8% growth (2024 data). The synthesis agent currently selects the more recent value. What is the correct approach?",
    "question": "Hệ thống nghiên cứu đa agent tổng hợp báo cáo xu hướng thị trường. Hai nguồn uy tín báo cáo tỷ lệ tăng trưởng khác nhau cho cùng một lĩnh vực: Nguồn A báo cáo tăng 12% (dữ liệu 2023) và Nguồn B báo cáo tăng 8% (dữ liệu 2024). Synthesis agent nên xử lý thế nào?",
    "optionsEN": [
      "A. Always use the most recent source as it reflects the latest data",
      "B. Average the two values and report 10% growth with a note about source variance",
      "C. Annotate both values with source and publication dates, letting the consumer interpret them.",
      "D. Flag the conflict and escalate to a human researcher for resolution before including in the report"
    ],
    "options": [
      "A. Luôn dùng giá trị mới nhất vì nó phản ánh dữ liệu gần nhất.",
      "B. Tính trung bình hai giá trị là 10% và ghi chú có sự chênh lệch nguồn.",
      "C. Chú thích rõ ràng cả hai con số kèm tên nguồn trích dẫn và thời điểm công bố, để người đọc tự đánh giá và hiểu bối cảnh thời gian giải thích cho sự khác biệt.",
      "D. Đánh dấu xung đột và chuyển tiếp cho nhà nghiên cứu con người giải quyết."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): This silently discards valid historical context. The difference may reflect an actual trend, not a contradiction.",
      "Option B ❌ (SAI): Averaging conflicting statistics is mathematically misleading and destroys the temporal context that explains the difference.",
      "Option C ✅ (ĐÚNG): This preserves provenance, temporal context, and both data points. The consumer can see that different dates explain different numbers.",
      "Option D ❌ (SAI): This is unnecessary — the values are not contradictory, they reflect different time periods. Proper annotation resolves the ambiguity."
    ],
    "rationale": "This preserves provenance, temporal context, and both data points. The consumer can see that different dates explain different numbers.",
    "explanation": "Bảo tồn nguồn gốc (provenance) và bối cảnh thời gian (temporal context) cho cả hai số liệu là nguyên tắc chuẩn mực: việc Nguồn A (2023) và Nguồn B (2024) khác nhau là do thời điểm đo lường khác nhau.",
    "sources": [
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Conflict handling)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#conflict-handling"
      },
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Temporal awareness)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#temporal-awareness"
      }
    ],
    "id": "ccaf-525"
  },
  {
    "originalId": "q-5-6-004",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 information-provenance / conflict-handling",
    "difficulty": "application",
    "scenarioId": "s-q-5-6-004",
    "questionEN": "A multi-agent research system finds conflicting data on a pharmaceutical compound's efficacy. A 2022 peer-reviewed clinical trial reports 78% efficacy, while a 2024 preprint reports 45% efficacy with a larger sample size. The synthesis agent must produce a recommendation for a medical advisory board. Which approach correctly handles the conflicting sources?",
    "question": "Khi hai tài liệu nội bộ trong cùng công ty đưa ra hai quy trình hướng dẫn xử lý sự cố trái ngược nhau, agent hỗ trợ kỹ thuật nên làm gì?",
    "optionsEN": [
      "A. Use the 2024 preprint as it has a larger sample size and is more recent, noting it supersedes the 2022 study",
      "B. Average the two values (61.5%) and present it as the best estimate with a note about variance between studies",
      "C. Present both findings with full provenance: source identity, publication date, peer-review status, sample size, methodology, and any methodological differences that may explain the discrepancy. Let the advisory board weigh the evidence",
      "D. Exclude both findings and report that no reliable consensus exists, recommending further research before any conclusions"
    ],
    "options": [
      "A. Tự ý chọn quy trình ngắn hơn để xử lý nhanh.",
      "B. Báo cáo rõ ràng về sự mâu thuẫn giữa hai tài liệu kèm trích dẫn đường dẫn cụ thể, cảnh báo rủi ro và yêu cầu người vận hành xác nhận quy trình chuẩn xác.",
      "C. Kết hợp ngẫu nhiên các bước của cả hai quy trình.",
      "D. Xóa bỏ một trong hai tài liệu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Recency and sample size alone do not determine reliability. The preprint has not undergone peer review, and simply picking one source discards valuable context that the advisory board needs for informed decision-making.",
      "Option B ❌ (SAI): Averaging conflicting scientific results is methodologically invalid. The studies may have different populations, methodologies, or endpoints. The average has no scientific meaning and obscures the actual disagreement.",
      "Option C ✅ (ĐÚNG): For a medical advisory board, preserving full provenance is critical. The board needs to weigh peer-review status, sample size, methodology differences, and temporal context. Annotating both sources with complete metadata enables informed human judgment on conflicting scientific evidence.",
      "Option D ❌ (SAI): Excluding available evidence is unhelpful. The advisory board can make informed decisions with properly attributed conflicting data. Withholding findings because they conflict reduces the board's ability to assess the situation."
    ],
    "rationale": "For a medical advisory board, preserving full provenance is critical. The board needs to weigh peer-review status, sample size, methodology differences, and temporal context. Annotating both sources with complete metadata enables informed human judgment on conflicting scientific evidence.",
    "explanation": "Khi phát hiện mâu thuẫn tài liệu nội bộ có rủi ro vận hành, agent phải minh bạch chỉ ra sự không nhất quán và chuyển giao quyết định cho con người.",
    "sources": [
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Conflict handling)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#conflict-handling"
      },
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Conflicts intact)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#completing-analysis-with-conflicts-intact"
      }
    ],
    "id": "ccaf-528"
  },
  {
    "originalId": "q-5-6-005",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 information-provenance / conflict-handling",
    "difficulty": "application",
    "scenarioId": "s-q-5-6-005",
    "questionEN": "A synthesis agent receives findings from three subagents: solar investment grew 15% (Bloomberg, January 2024), solar investment grew 22% (IEA, March 2024), and cost-per-watt data. The synthesis agent currently picks the IEA figure because it is more recent. What is the correct approach?",
    "question": "Khi xây dựng báo cáo kiến trúc từ nhiều nguồn thông tin khác nhau, metadata nào giúp duy trì khả năng truy vết nguồn gốc (provenance traceability) bền vững nhất?",
    "optionsEN": [
      "A. Always use the most authoritative source (IEA as an international agency) and discard the Bloomberg figure.",
      "B. Average the two values (18.5%) and cite both sources to present a balanced view.",
      "C. Present both figures with source attribution and dates, noting what may explain the difference.",
      "D. Flag the conflicting figures and pause report generation until a human researcher resolves the discrepancy."
    ],
    "options": [
      "A. Màu sắc chữ trong tài liệu.",
      "B. Metadata có cấu trúc liên kết mỗi nhận định (claim) với file nguồn cụ thể, số dòng code, và thời điểm trích xuất dữ liệu.",
      "C. Tên của model AI đã tạo ra văn bản.",
      "D. Độ dài của file văn bản đích."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Discarding a credible source based on perceived authority silently removes valid data. Both sources are credible, and the difference may reflect different methodologies, scopes, or time periods.",
      "Option B ❌ (SAI): Averaging conflicting statistics is mathematically misleading. The two figures may measure different scopes (e.g., different regions or investment types), making an average meaningless. The difference needs to be preserved, not merged.",
      "Option C ✅ (ĐÚNG): Preserving both data points with provenance — source, date, and potential explanations for the difference — lets the consumer interpret the data correctly. Different publication dates and methodologies explain the discrepancy without requiring the synthesis agent to judge which is 'right'.",
      "Option D ❌ (SAI): Pausing for human resolution is unnecessary when the difference can be explained by temporal or methodological factors. Proper annotation with provenance resolves the ambiguity without blocking the workflow."
    ],
    "rationale": "Preserving both data points with provenance — source, date, and potential explanations for the difference — lets the consumer interpret the data correctly. Different publication dates and methodologies explain the discrepancy without requiring the synthesis agent to judge which is 'right'.",
    "explanation": "Metadata có cấu trúc liên kết chặt chẽ từng nhận định với nguồn gốc cụ thể và thời gian trích xuất đảm bảo tính minh bạch và cho phép xác minh lại dữ liệu sau này.",
    "sources": [
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Conflict handling)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#conflict-handling"
      },
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Temporal awareness)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#temporal-awareness"
      }
    ],
    "id": "ccaf-529"
  },
  {
    "originalId": "q-5-6-006",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 information-provenance / dual-attribution",
    "difficulty": "application",
    "scenarioId": "s-q-5-6-006",
    "questionEN": "The data platform agent produces a report combining Snowflake revenue data and a third-party market sizing API. The Snowflake data shows the company's market share at 12%, whilst the API reports it at 8%. What is the correct provenance approach for the agent's report?",
    "question": "Khi hai chuyên gia tư vấn đưa ra hai giải pháp kiến trúc trái ngược nhau trong tài liệu tham chiếu, agent tư vấn kiến trúc nên làm gì để hỗ trợ đội ngũ tốt nhất?",
    "optionsEN": [
      "A. Use the higher figure (12%) as it comes from the company's own authoritative data source.",
      "B. Average the two figures to 10% and report it as the consensus estimate, noting the range spanned by both sources.",
      "C. Present both figures with dual attribution, identifying the source, methodology, and time period for each.",
      "D. Flag the discrepancy as an error and refuse to include either figure until the data team resolves the conflict."
    ],
    "options": [
      "A. Chọn giải pháp có số từ dài hơn.",
      "B. Trình bày cả hai phương án dưới dạng bảng so sánh đối chiếu: phân tích ưu/nhược điểm, điều kiện tiên quyết và sự đánh đổi (trade-offs) của từng cách tiếp cận, để kiến trúc sư trưởng đưa ra quyết định.",
      "C. Tự ý bác bỏ một trong hai phương án.",
      "D. Không đưa ra bất kỳ thông tin nào."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Selecting one figure based on source authority silently discards conflicting information. The user needs both figures with source attribution to make their own judgement.",
      "Option B ❌ (SAI): Averaging conflicting figures from different methodologies produces a number that neither source supports. This obscures the disagreement rather than surfacing it.",
      "Option C ✅ (ĐÚNG): Dual attribution for conflicting data is the correct provenance pattern. The agent must surface both figures with clear claim-source mappings, including the data source, methodology, and temporal context, rather than silently resolving the conflict.",
      "Option D ❌ (SAI): Conflicting sources are not necessarily errors — different methodologies legitimately produce different results. Refusing to report either figure leaves the user with no actionable data when both figures are informative."
    ],
    "rationale": "Dual attribution for conflicting data is the correct provenance pattern. The agent must surface both figures with clear claim-source mappings, including the data source, methodology, and temporal context, rather than silently resolving the conflict.",
    "explanation": "Phân tích sự đánh đổi đa chiều (trade-off analysis) giúp khách hàng hiểu rõ mặt lợi và mặt hại của từng trường phái kiến trúc mà không bị áp đặt phán đoán chủ quan.",
    "sources": [
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Dual attribution)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#conflict-handling"
      },
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Structured claim-source mappings)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#structured-claim-source-mappings"
      }
    ],
    "id": "ccaf-530"
  },
  {
    "originalId": "q-5-6-007",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 information-provenance / temporal-awareness",
    "difficulty": "application",
    "scenarioId": "s-q-5-6-007",
    "questionEN": "The data platform agent generates a quarterly business review report that includes claims such as 'Revenue grew 15% YoY' sourced from Snowflake and 'Market expanded by 22%' sourced from a third-party API. The Snowflake data was last refreshed yesterday, whilst the API data is from a report published six months ago. What provenance metadata must accompany these claims?",
    "question": "Trong kiểm toán bảo mật và tuân thủ dữ liệu (Audit & Compliance), tại sao việc lưu vết chuỗi hành động của agent (Action Audit Trail) lại là yêu cầu bắt buộc?",
    "optionsEN": [
      "A. The name of each data source (Snowflake, third-party API) so the user knows where the data came from.",
      "B. A confidence score (high/medium/low) for each claim based on the agent's assessment of data quality.",
      "C. Claim-source mappings that include the data source and its date or refresh timestamp, showing temporal relevance.",
      "D. A footnote at the end of the report listing all data sources used, without linking specific claims to specific sources."
    ],
    "options": [
      "A. Để tính tiền thưởng cho nhân viên.",
      "B. Để có thể tái hiện chính xác trình tự các quyết định, tham số gọi công cụ và nguồn dữ liệu mà AI đã sử dụng khi xảy ra sự cố hoặc khi cơ quan quản lý yêu cầu giải trình.",
      "C. Để làm đẹp báo cáo tháng.",
      "D. Để huấn luyện lại model từ đầu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A ❌ (SAI): Source names alone are insufficient. Without temporal context, the user cannot judge whether the data is current enough for a quarterly review. The six-month-old market data may be misleading if presented without its publication date.",
      "Option B ❌ (SAI): LLM-generated confidence scores are poorly calibrated and do not substitute for factual provenance metadata. The user needs objective source information to make their own quality assessment.",
      "Option C ✅ (ĐÚNG): Provenance requires claim-source mappings with temporal awareness. Each claim must be linked to its source with date context — the user must see that '15% YoY revenue growth' is from yesterday's Snowflake refresh whilst '22% market expansion' is from a six-month-old third-party report — to assess whether each figure is current enough for the quarterly review.",
      "Option D ❌ (SAI): A generic source list does not create claim-source mappings. The user cannot determine which specific claim came from which source, making it impossible to assess the reliability or currency of individual data points."
    ],
    "rationale": "Provenance requires claim-source mappings with temporal awareness. Each claim must be linked to its source with date context — the user must see that '15% YoY revenue growth' is from yesterday's Snowflake refresh whilst '22% market expansion' is from a six-month-old third-party report — to assess whether each figure is current enough for the quarterly review.",
    "explanation": "Audit Trail cung cấp bằng chứng minh bạch về mọi hành vi của agent (ai kích hoạt, gọi tool nào, tham số gì, tại thời điểm nào), đảm bảo tính giải trình và tuân thủ các quy định bảo mật.",
    "sources": [
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Temporal awareness)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#temporal-awareness"
      },
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Structured claim-source mappings)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#structured-claim-source-mappings"
      }
    ],
    "id": "ccaf-531"
  },
  {
    "originalId": "q-5-6-008",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 information-provenance / structured-provenance",
    "difficulty": "application",
    "scenarioId": "s-q-5-6-008",
    "questionEN": "A docs team has Claude Code generate architecture guides by synthesising source code, inline comments, commit messages, and ADRs. After several edits, the guides no longer indicate which statements came from which source. A developer later questions whether a specific architectural constraint in a guide is still valid. What approach preserves source attribution?",
    "question": "Nhóm tài liệu để Claude Code tạo hướng dẫn kiến trúc bằng cách tổng hợp mã nguồn, comment trong code, commit message và các tài liệu quyết định kiến trúc (ADR). Sau vài lần sửa, tài liệu không còn rõ nhận định nào đến từ nguồn nào. Cách tiếp cận nào bảo tồn nguồn gốc?",
    "optionsEN": [
      "A. Instruct Claude Code to add footnotes to the generated documentation citing the original source for each statement",
      "B. Maintain structured provenance metadata that maps each claim to its source file, line number, and retrieval date.",
      "C. Keep all original source files unchanged in a reference directory so developers can manually trace any claim back to its origin",
      "D. Version-control the documentation and use git blame to trace each line back to the commit that created it"
    ],
    "options": [
      "A. Hướng dẫn Claude Code thêm footnote cuối trang.",
      "B. Duy trì metadata nguồn gốc có cấu trúc (structured provenance metadata) ánh xạ từng nhận định tới file nguồn, số dòng và thời điểm truy xuất.",
      "C. Giữ nguyên tất cả các file nguồn gốc trong một thư mục tham chiếu.",
      "D. Dùng git blame trên file tài liệu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Prose footnotes are fragile — they are lost or degraded during subsequent editing passes, summarisation, or reformatting. The team has already experienced this problem through 'several iterations of editing.'",
      "Option B ✅ (ĐÚNG): Structured provenance metadata survives editing because it is stored as data fields (e.g., JSON or YAML frontmatter) separate from the prose. When a developer questions a claim, they can trace it to the exact source file and line number. The retrieval date indicates whether the source was current when the documentation was generated.",
      "Option C ❌ (SAI): Preserving source files without explicit mappings forces developers to manually search through potentially hundreds of files to verify a single claim. This is not scalable and does not indicate which specific source informed which specific documentation statement.",
      "Option D ❌ (SAI): git blame traces authorship of documentation lines to commits, not to the source material that informed those lines. A commit message might say 'update architecture guide' without indicating that a specific statement came from ADR-047 or a comment in auth-service/src/middleware.ts."
    ],
    "rationale": "Structured provenance metadata survives editing because it is stored as data fields (e.g., JSON or YAML frontmatter) separate from the prose. When a developer questions a claim, they can trace it to the exact source file and line number. The retrieval date indicates whether the source was current when the documentation was generated.",
    "explanation": "Metadata nguồn gốc có cấu trúc được lưu trữ dưới dạng trường dữ liệu độc lập (như YAML frontmatter hoặc JSON metadata) không bị mất đi khi nội dung văn bản được biên tập lại.",
    "sources": [
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Attribution preservation)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#attribution-preservation-through-multi-step-synthesis"
      },
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Structured claim-source mappings)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#structured-claim-source-mappings"
      }
    ],
    "id": "ccaf-532"
  },
  {
    "originalId": "q-5-6-009",
    "source": "Official254",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 information-provenance / structured-provenance",
    "difficulty": "application",
    "scenarioId": "s-q-5-6-009",
    "questionEN": "A docs team has Claude Code synthesise an API reference guide from source across 50 modules. The guide states 'the authentication service supports OAuth2, SAML, and API key authentication' with no indication of which source files informed this. Six months later, after a major refactor, the team needs to verify whether the statement is still accurate. What is the core provenance failure and how should it be prevented?",
    "question": "Tài liệu kiến trúc ghi: 'Hệ thống xác thực hỗ trợ OAuth2, SAML và API key' nhưng không ghi chú file nào nói lên điều này. Sau 6 tháng, nhóm muốn kiểm tra xem nhận định này còn đúng không nhưng phải lục lại toàn bộ codebase. Thất bại cốt lõi ở đây là gì?",
    "optionsEN": [
      "A. The failure is that the guide was not version-controlled. Storing it in git would allow the team to trace the statement back to the commit that generated it",
      "B. Loss of claim-to-source traceability during synthesis. Each claim should carry structured provenance linking it to specific source files and retrieval timestamps.",
      "C. The failure is that Claude Code hallucinated the authentication methods. The team should run a separate verification pass to confirm each claim against the source code",
      "D. The failure is that the documentation was generated in a single pass. Processing modules incrementally with human review after each module would catch inaccuracies before synthesis"
    ],
    "options": [
      "A. Tài liệu không được quản lý bằng Git.",
      "B. Mất khả năng truy vết từ nhận định về nguồn (loss of claim-to-source traceability) trong quá trình tổng hợp; cần có metadata nguồn gốc liên kết nhận định với file nguồn và mốc thời gian cụ thể.",
      "C. Claude Code đã bịa đặt thông tin.",
      "D. Tài liệu được sinh trong một lần duy nhất."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (SAI): Version control tracks when documentation was written, not which source code files informed a specific claim. Knowing that the statement was generated on a certain date does not help the team identify which files to re-check after refactoring.",
      "Option B ✅ (ĐÚNG): Without claim-to-source mappings, the team must re-audit the entire codebase to verify a single statement. Structured provenance (source file, line range, retrieval date) makes verification targeted: check whether auth-service/src/providers/ still contains OAuth2, SAML, and API key implementations. The retrieval timestamp signals when the claim was last verified.",
      "Option C ❌ (SAI): The question does not indicate the claim was hallucinated — it may have been accurate when generated. The problem is that six months later, the team has no way to efficiently verify or update the claim because they cannot trace it back to specific source files.",
      "Option D ❌ (SAI): Incremental review improves generation-time accuracy but does not solve the six-months-later verification problem. Without provenance metadata linking claims to sources, the team still cannot efficiently determine which files to re-check after refactoring."
    ],
    "rationale": "Without claim-to-source mappings, the team must re-audit the entire codebase to verify a single statement. Structured provenance (source file, line range, retrieval date) makes verification targeted: check whether auth-service/src/providers/ still contains OAuth2, SAML, and API key implementations. The retrieval timestamp signals when the claim was last verified.",
    "explanation": "Thiếu ánh xạ truy vết nguồn gốc khiến việc kiểm chứng một nhận định kiến trúc trở nên vô cùng tốn kém và buộc phải quét lại toàn bộ mã nguồn từ đầu.",
    "sources": [
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Structured claim-source mappings)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#structured-claim-source-mappings"
      },
      {
        "label": "Lesson 5.6: Information Provenance and Multi-Source Synthesis (Attribution preservation)",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-information-provenance#attribution-preservation-through-multi-step-synthesis"
      }
    ],
    "id": "ccaf-533"
  }
];
}

const MOCK_EXAM_POOL_HARD = generateMockQuestionsPoolHard();

if (typeof window !== 'undefined') {
  window.MOCK_EXAM_POOL_HARD = MOCK_EXAM_POOL_HARD;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMockQuestionsPoolHard,
    MOCK_EXAM_POOL_HARD
  };
}
