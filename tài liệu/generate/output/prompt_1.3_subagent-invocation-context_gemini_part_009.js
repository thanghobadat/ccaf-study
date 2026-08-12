[
  {
    "id": "d1-b03-new-017",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-017",
    "scenarioSignature": {
      "testedPrinciple": "multi-tool call parallel subagent spawning",
      "failureMode": "increased latency due to multi-turn sequential execution",
      "rootCause": "coordinator issuing subagent tool calls across separate turns",
      "requiredFix": "emit independent task tool calls simultaneously in one turn"
    },
    "questionEN": "An OmniChannel Inventory Sync Pipeline uses an InventoryAuditCoordinator agent to query three independent subagents: warehouse_stock_checker, supplier_lead_checker, and shipping_rate_estimator. Although the three tasks have no data dependencies, telemetry shows the coordinator emits one Task tool call per turn over 3 consecutive turns, causing overall execution latency to triple from 4.2 seconds to 12.8 seconds. What is the root cause and recommended solution for this performance bottleneck?",
    "question": "[d1-b03-new-017] Một OmniChannel Inventory Sync Pipeline sử dụng agent InventoryAuditCoordinator để truy vấn ba subagent độc lập: warehouse_stock_checker, supplier_lead_checker, và shipping_rate_estimator. Mặc dù ba tác vụ không có sự phụ thuộc dữ liệu, hệ thống telemetry cho thấy coordinator phát ra từng tool call Task trên 3 turn liên tiếp, khiến tổng độ trễ thực thi tăng gấp ba lần từ 4,2 giây lên 12,8 giây. Nguyên nhân gốc rễ và giải pháp khuyến nghị cho nút thắt hiệu năng này là gì?",
    "optionsEN": [
      "A. The coordinator prompt causes turn-by-turn tool invocation; update prompt instructions to emit all three independent Task tool calls concurrently within a single LLM response turn.",
      "B. The worker subagents lack execution budget; increase the maximum token limit of warehouse_stock_checker so it processes all three domains internally.",
      "C. Subagents are missing direct channel connections; enable parallel_execution: true in the worker subagent configurations to allow inter-agent communication.",
      "D. The orchestration engine blocks parallel execution; replace the Task subagent tool calls with a single blocking RPC request executed inside a Python code sandbox."
    ],
    "options": [
      "A. Prompt của coordinator gây ra việc gọi tool theo từng turn; cập nhật hướng dẫn prompt để phát tất cả ba tool call Task độc lập đồng thời trong một response turn duy nhất của LLM.",
      "B. Các worker subagent thiếu ngân sách thực thi; tăng giới hạn token tối đa của warehouse_stock_checker để nó xử lý cả ba miền dữ liệu bên trong.",
      "C. Các subagent thiếu kết nối kênh trực tiếp; bật parallel_execution: true trong cấu hình worker subagent để cho phép giao tiếp giữa các agent.",
      "D. Engine điều phối chặn thực thi song song; thay thế các tool call subagent Task bằng một RPC request chặn duy nhất được thực thi bên trong sandbox mã Python."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: When subagents are independent, the coordinator must emit multiple Task tool calls in a single assistant response turn to execute them concurrently and avoid a 3x latency multiplier.",
      "Option B is incorrect: Increasing the token budget of a worker subagent does not fix turn-by-turn tool dispatching in the coordinator and violates task scoping.",
      "Option C is incorrect: In a hub-and-spoke architecture, subagents operate independently and do not communicate directly; worker configuration flags do not alter how the coordinator generates tool calls.",
      "Option D is incorrect: Replacing subagents with a synchronous RPC call bypasses agent delegation entirely rather than resolving parallel tool call invocation logic in the LLM."
    ],
    "rationale": "Spawning subagents in parallel requires the coordinator LLM to emit all independent Task tool calls in a single response turn. Emitting calls across 3 separate turns forces sequential turn-taking and multiplies latency by 3.",
    "explanation": "Lời giải chi tiết:\n\n- Option A (Đúng): Để thực thi các subagent song song, coordinator phải phát tất cả các tool call Task độc lập cùng một lúc trong một response turn của LLM. Việc phát tool call qua 3 turn riêng biệt bắt buộc hệ thống phải chờ từng subagent hoàn thành trước khi phát call tiếp theo, làm tổng độ trễ tăng gấp ba từ 4.2s lên 12.8s.\n- Option B (Sai): Việc tăng giới hạn token của worker subagent không giải quyết được việc coordinator phát tool call theo từng turn và làm vi phạm nguyên tắc phân chia context.\n- Option C (Sai): Trong mô hình hub-and-spoke, các subagent làm việc độc lập và không giao tiếp trực tiếp với nhau; cài đặt flag ở worker subagent không thay đổi cách coordinator tạo tool call.\n- Option D (Sai): Thay thế subagent bằng gọi RPC đồng bộ sẽ bỏ qua cơ chế ủy quyền của agent và không giải quyết đúng bản chất kỹ thuật của việc gọi tool song song trong coordinator.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-018",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-018",
    "scenarioSignature": {
      "testedPrinciple": "parallel subagent partial failure handling",
      "failureMode": "uncaught workflow failure during rate limit burst",
      "rootCause": "coordinator unhandled subagent error responses",
      "requiredFix": "implement subagent retry backoff and partial output aggregation"
    },
    "questionEN": "A ThreatAnalysisCoordinator agent spawns 8 vulnerability_scanner subagents in parallel to audit 8 separate cloud regions. During a burst invocation, the downstream API hits a rate limit (HTTP 429), causing 3 subagents to return error payloads immediately. The coordinator crashes because its prompt and output parser assume all 8 subagents return valid analysis. How should the architecture be updated to handle this scenario?",
    "question": "[d1-b03-new-018] Một agent ThreatAnalysisCoordinator khởi tạo 8 subagent vulnerability_scanner song song để kiểm định 8 vùng cloud riêng biệt. Trong quá trình khởi tạo đồng thời, API phía sau gặp phải giới hạn tốc độ (HTTP 429), khiến 3 subagent lập tức trả về payload lỗi. Coordinator bị crash do prompt và parser kết quả của nó mặc định cả 8 subagent đều trả về phân tích hợp lệ. Kiến trúc nên được cập nhật như thế nào để xử lý kịch bản này?",
    "optionsEN": [
      "A. Bypass subagent spawning by embedding all raw cloud region logs directly into the coordinator's initial system prompt context window.",
      "B. Equip the coordinator with subagent error handling and retry mechanisms to catch HTTP 429 failures, retry with exponential backoff, or synthesize partial results from successful subagents.",
      "C. Consolidate the 8 subagents into a single monolithic worker subagent that sequentially iterates over all regions within a single context window.",
      "D. Enable direct peer-to-peer failover so the 5 successful subagent workers can dynamically intercept and re-execute the failed tasks of the 3 rate-limited workers."
    ],
    "options": [
      "A. Bỏ qua việc khởi tạo subagent bằng cách chèn trực tiếp toàn bộ log thô của các vùng cloud vào context window prompt hệ thống ban đầu của coordinator.",
      "B. Trang bị cho coordinator cơ chế xử lý lỗi và thử lại subagent để bắt các lỗi HTTP 429, thử lại với exponential backoff, hoặc tổng hợp kết quả một phần từ các subagent thành công.",
      "C. Hợp nhất 8 subagent thành một worker subagent đơn khối duy nhất thực hiện lặp tuần tự qua tất cả các vùng trong một context window đơn lẻ.",
      "D. Bật tính năng chuyển đổi dự phòng ngang hàng (peer-to-peer) để 5 worker subagent thành công có thể chủ động đánh chặn và thực thi lại các tác vụ thất bại của 3 worker bị giới hạn tốc độ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Embedding raw logs directly into the coordinator prompt causes severe context window bloat and eliminates subagent delegation.",
      "Option B is correct: Spawning multiple subagents concurrently increases rate-limiting risks; the coordinator must implement partial failure resiliency with retry backoffs and synthesize partial worker outputs.",
      "Option C is incorrect: Merging subagents into a single sequential worker eliminates parallel execution performance gains and risks context window limits.",
      "Option D is incorrect: Subagents in a hub-and-spoke pattern cannot communicate or reassign tasks peer-to-peer; failure handling must reside in the coordinator."
    ],
    "rationale": "When spawning multiple subagents concurrently, rate limits can cause partial failures. The coordinator must gracefully manage subagent tool errors using retries with exponential backoff and partial result synthesis instead of crashing.",
    "explanation": "Lời giải chi tiết:\n\n- Option A (Sai): Việc đưa toàn bộ log thô vào coordinator prompt sẽ gây quá tải context window và phá vỡ nguyên tắc ủy quyền subagent.\n- Option B (Đúng): Khi khởi tạo nhiều subagent song song, nguy cơ chạm trần rate limit (HTTP 429) là rất cao. Coordinator cần được thiết kế với cơ chế xử lý lỗi linh hoạt (partial failure handling), áp dụng exponential backoff khi retry và có khả năng tổng hợp dữ liệu từ các subagent thành công thay vì bị crash hoàn toàn.\n- Option C (Sai): Chuyển thành một subagent đơn khối xử lý tuần tự sẽ làm mất hoàn toàn lợi thế xử lý song song và dễ gây vượt quá giới hạn context window.\n- Option D (Sai): Kiến trúc agent chuẩn là hub-and-spoke, trong đó các subagent không giao tiếp hay chuyển đổi dự phòng trực tiếp với nhau (peer-to-peer); mọi việc điều phối và xử lý lỗi phải đi qua coordinator.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]