[
  {
    "id": "d1-b02-1.2-013",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-013",
    "scenarioSignature": {
      "testedPrinciple": "Dynamic routing vs static sequential pipeline for uncertain workflows",
      "failureMode": "Pipeline executes irrelevant diagnostic steps and omits crucial investigation branches when intermediate findings reveal new error types",
      "rootCause": "Hardcoded sequential execution graph cannot dynamically adapt downstream task selection based on runtime tool discoveries",
      "requiredFix": "Transition from rigid sequential pipeline to dynamic orchestrator router that decides downstream workflow branches dynamically"
    },
    "questionEN": "In an automated incident response system for microservices, an agent is configured with a static sequential pipeline: Log Analyzer -> DB Inspector -> Incident Summarizer. When a production outage occurs with an HTTP 504 Gateway Timeout error code from downstream service payment-gateway-v2, the agent still executes the DB Inspector to check database connection pools (which is unrelated) while completely skipping network trace analysis for vpc-peering. As a result, the incident report misses the root cause and wastes LLM tokens. How should the system architect redesign the orchestration pattern to solve this issue?",
    "question": "[d1-b02-1.2-013] Trong một hệ thống xử lý sự cố tự động cho dịch vụ microservice, agent được cấu hình theo đường ống cố định chuỗi (static sequential pipeline): Log Analyzer -> DB Inspector -> Incident Summarizer. Khi xảy ra sự cố production với mã lỗi HTTP 504 Gateway Timeout xuất phát từ dịch vụ thanh toán downstream payment-gateway-v2, agent vẫn buộc phải chạy step DB Inspector kiểm tra database connection pool (không liên quan) và hoàn toàn bỏ qua bước phân tích network trace log của vpc-peering. Kết quả là báo cáo sự cố thiếu nguyên nhân gốc rễ và tiêu tốn token không cần thiết. Kiến trúc sư nên thay đổi mô hình điều phối (orchestration pattern) như thế nào để khắc phục vấn đề này?",
    "optionsEN": [
      "A. Refactor from a static sequential pipeline to a Dynamic Router/Evaluator pattern, allowing the coordinator to evaluate initial Log Analyzer output and dynamically select downstream diagnostic branches.",
      "B. Increase the context window for the DB Inspector and include all raw CloudWatch metrics in the initial system prompt.",
      "C. Convert the architecture to a parallel Fan-out/Fan-in pipeline that executes Log, DB, and Network trace workers simultaneously for every incident.",
      "D. Implement retry logic with exponential backoff for the DB Inspector step when trace information is missing from the database."
    ],
    "options": [
      "A. Chuyển đổi từ static sequential pipeline sang mô hình Dynamic Router/Evaluator, cho phép coordinator đánh giá kết quả từ Log Analyzer để quyết định động bước điều tra tiếp theo dựa trên phát hiện ban đầu.",
      "B. Tăng context window cho DB Inspector và truyền toàn bộ CloudWatch metric payload vào prompt ban đầu để agent tự suy luận.",
      "C. Chuyển đổi hệ thống sang kiến trúc Fan-out/Fan-in song song, cho phép tất cả các worker (Log, DB, Network trace) luôn chạy đồng thời cùng lúc cho mọi incident.",
      "D. Thêm cơ chế retry với exponential backoff cho DB Inspector khi không tìm thấy thông tin trace liên quan trong database."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Incident investigation requires dynamic task graph generation based on runtime evidence, which a Dynamic Router pattern provides by evaluating intermediate discoveries.",
      "Option B is incorrect: Expanding prompt context does not fix the architectural flaw of executing irrelevant static pipeline stages when the workflow topology itself is fixed.",
      "Option C is incorrect: Running all diagnostic workers in parallel for every incident wastes compute and API cost, as most incidents only require targeted diagnostic branches based on initial evidence.",
      "Option D is incorrect: Retrying an irrelevant diagnostic worker does not address the inability of the orchestrator to dynamically trigger network diagnostic tools."
    ],
    "rationale": "Static sequential pipelines are unsuitable for incident root-cause analysis because diagnostic pathways depend unpredictably on intermediate discoveries. Implementing a dynamic router pattern allows the orchestrator to adapt downstream execution branches according to findings at runtime.",
    "explanation": "Phân tích chi tiết từng đáp án:\n- Đáp án A (Đúng): Với các tác vụ có tính bất định cao như điều tra sự cố, luồng xử lý phụ thuộc vào kết quả của các bước trung gian. Mô hình Dynamic Router cho phép coordinator linh hoạt chọn nhánh xử lý (ví dụ: chuyển sang Network Tracer thay vì DB Inspector) dựa trên mã lỗi 504 phát hiện từ Log Analyzer.\n- Đáp án B (Sai): Mở rộng context window không giải quyết được vấn đề thiết kế đường ống cố định (static topology); bước DB Inspector vẫn sẽ bị kích hoạt vô ích.\n- Đáp án C (Sai): Chạy tất cả worker song song (Fan-out) cho mọi sự cố sẽ gây lãng phí tài nguyên và chi phí API không cần thiết khi đa số sự cố chỉ cần phân tích một nhánh cụ thể.\n- Đáp án D (Sai): Thử lại (retry) một worker không liên quan (DB Inspector) không thể giúp hệ thống tự động kích hoạt công cụ phân tích network trace.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  },
  {
    "id": "d1-b02-1.2-014",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-014",
    "scenarioSignature": {
      "testedPrinciple": "Scoped context delegation in hub-and-spoke agent architecture",
      "failureMode": "Sub-workers experience high latency, token bloat, and parameter hallucination when receiving complete conversation state",
      "rootCause": "Hub coordinator forwards entire raw chat transcript history instead of extracting targeted parameters for specialized worker execution",
      "requiredFix": "Enforce strict input scoping where coordinator constructs isolated task payloads with only necessary schema fields"
    },
    "questionEN": "In a customer support multi-agent system using a Hub-and-Spoke architecture, a 45-turn conversation contains transaction logs and shipping details. When delegating a refund subtask to the StripeRefundWorker, the Hub Coordinator passes the entire raw 85KB messages array containing full chat history. Consequently, the StripeRefundWorker latency jumps from 1.2s to 9.8s, consumes 48,000 input tokens per call, and occasionally extracts an incorrect charge_id due to noise from shipping chat turns. Which architectural modification best resolves this issue?",
    "question": "[d1-b02-1.2-014] Một hệ thống CSKH e-commerce sử dụng kiến trúc Hub-and-Spoke. Khi xử lý một ca hỗ trợ kéo dài 45 lượt hội thoại chứa đầy đủ log giao dịch và thông tin vận chuyển, Hub Coordinator chuyển toàn bộ mảng messages chứa 85KB lịch sử hội thoại thô tới StripeRefundWorker để thực hiện thao tác hoàn tiền. Thao tác này khiến thời gian phản hồi của StripeRefundWorker tăng từ 1.2s lên 9.8s, tiêu tốn 48,000 input tokens mỗi lần gọi và thỉnh thoảng trích xuất sai charge_id do nhiễu thông tin từ đoạn chat vận chuyển. Giải pháp kiến trúc nào tối ưu nhất để giải quyết vấn đề này?",
    "optionsEN": [
      "A. Apply sliding window truncation on the Hub Coordinator to retain only the last 5 messages in the messages array before sending to StripeRefundWorker.",
      "B. Refactor the Hub Coordinator delegation protocol to pass scoped inputs containing only explicit parameters (charge_id, refund_amount_cents, reason) matching the worker JSON Schema.",
      "C. Transition to a peer-to-peer agent mesh so workers directly query state from each other rather than routing through the Hub Coordinator.",
      "D. Enable LLM prompt caching for the entire transcript across all sub-worker API requests to reduce API latency and cost."
    ],
    "options": [
      "A. Áp dụng kỹ thuật Sliding Window Truncation trên Hub Coordinator để chỉ giữ lại 5 tin nhắn gần nhất trong mảng messages trước khi gửi cho StripeRefundWorker.",
      "B. Thay đổi giao thức ủy quyền (delegation protocol) của Hub Coordinator để chỉ truyền thông tin được khoanh vùng (scoped inputs) chứa các trường dữ liệu cần thiết (charge_id, refund_amount_cents, reason) theo đúng JSON Schema của worker.",
      "C. Chuyển sang mô hình Peer-to-Peer agent mesh để các worker tự truy vấn trạng thái lẫn nhau thay vì thông qua Hub Coordinator.",
      "D. Bật tính năng Prompt Caching trên LLM provider cho toàn bộ transcript hội thoại nhằm giảm chi phí API cho các lần gọi worker tiếp theo."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Sliding window truncation may drop critical context (like the original payment authorization ID from turn 2) while still sending unneeded conversation chatter.",
      "Option B is correct: Passing tightly scoped inputs matching the worker's specific domain schema prevents context dilution, reduces latency/cost, and eliminates parameter extraction errors.",
      "Option C is incorrect: Switching to peer-to-peer worker communication increases system complexity and state coupling without solving context bloat.",
      "Option D is incorrect: Prompt caching reduces financial cost and prefill latency slightly, but does not solve context dilution or hallucination risks caused by irrelevant prompt content."
    ],
    "rationale": "In hub-and-spoke agent architectures, workers should receive tightly scoped task payloads containing only the parameters relevant to their dedicated responsibility. Passing complete conversation state bloats token usage, increases latency, and degrades parameter extraction accuracy through context dilution.",
    "explanation": "Phân tích chi tiết từng đáp án:\n- Đáp án A (Sai): Truncate theo cửa sổ trượt (sliding window) có nguy cơ làm mất thông tin quan trọng ở các lượt chat đầu (ví dụ: mã giao dịch gốc ở lượt thứ 2) trong khi vẫn truyền các đoạn chat không liên quan ở 5 lượt cuối.\n- Đáp án B (Đúng): Thiết kế chuẩn cho mô hình Hub-and-Spoke đòi hỏi Coordinator phải thực hiện khoanh vùng ngữ cảnh (context scoping), chỉ trích xuất đúng các tham số đầu vào (charge_id, refund_amount_cents, reason) gửi cho worker. Điều này giúp loại bỏ nhiễu, giảm latency/chi phí token và tránh suy luận sai.\n- Đáp án C (Sai): Chuyển sang Peer-to-Peer agent mesh làm tăng độ phức tạp trong quản lý trạng thái và không giải quyết bản chất của việc phình to ngữ cảnh (context bloat).\n- Đáp án D (Sai): Prompt Caching chỉ giúp giảm một phần chi phí/latency prefill trên API provider, không khắc phục được tình trạng nhiễu ngữ cảnh (context dilution) dẫn đến trích xuất sai dữ liệu của LLM.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  }
]