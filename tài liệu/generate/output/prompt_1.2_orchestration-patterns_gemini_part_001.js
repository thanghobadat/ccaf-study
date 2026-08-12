[
  {
    "id": "d1-b02-1.2-001",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-001",
    "scenarioSignature": {
      "testedPrinciple": "routing orchestration pattern for mutually exclusive worker delegation",
      "failureMode": "misrouting incoming tickets to multiple non-isolated specialist agents",
      "rootCause": "using broadcast orchestration instead of single-destination classification routing",
      "requiredFix": "implement router pattern that evaluates ticket context and dispatches to one specialized worker"
    },
    "questionEN": "In an enterprise customer support platform, incoming tickets containing payload fields like `billing_status: overdue` or `auth_error: token_expired` must be processed by specialized agent workflows (`billing-agent`, `identity-agent`, or `tech-support-agent`). Previously, a broadcast pipeline sent every ticket to all three agents simultaneously, causing duplicate refund processing and conflicting user notifications. Which orchestration architecture correctly resolves this issue?",
    "question": "[d1-b02-1.2-001] Trong một nền tảng hỗ trợ khách hàng doanh nghiệp, các thẻ hỗ trợ (ticket) đầu vào chứa các trường payload như `billing_status: overdue` hoặc `auth_error: token_expired` phải được xử lý bởi các workflow agent chuyên trách (`billing-agent`, `identity-agent`, hoặc `tech-support-agent`). Trước đây, một pipeline phát sóng (broadcast) đã gửi mọi ticket đến cả ba agent cùng lúc, gây ra hiện tượng xử lý hoàn tiền trùng lặp và thông báo xung đột cho người dùng. Kiến trúc điều phối nào giải quyết chính xác vấn đề này?",
    "optionsEN": [
      "A. A Router Orchestrator pattern that classifies incoming ticket payloads using a lightweight router node and delegates execution to exactly one specialist agent workflow based on category.",
      "B. A Prompt Chaining pattern where the ticket sequentially passes through `billing-agent`, then `identity-agent`, and finally `tech-support-agent` to accumulate actions.",
      "C. An Evaluator-Optimizer loop pattern where a critique agent iteratively refines the ticket response until all three specialists approve the final message.",
      "D. An Autonomous Swarm pattern where all three agents independently query `ticket_payload` and claim tasks using lock mechanisms without a central classification step."
    ],
    "options": [
      "A. Mô hình Router Orchestrator phân loại payload thẻ hỗ trợ bằng một nút điều hướng gọn nhẹ và ủy quyền xử lý cho chính xác một workflow agent chuyên trách dựa trên phân loại.",
      "B. Mô hình Prompt Chaining trong đó thẻ hỗ trợ được chuyển tuần tự qua `billing-agent`, sau đó đến `identity-agent`, và cuối cùng là `tech-support-agent` để tích lũy hành động.",
      "C. Mô hình vòng lặp Evaluator-Optimizer nơi một agent đánh giá tinh chỉnh câu trả lời phản hồi thẻ hỗ trợ cho đến khi cả ba agent chuyên trách phê duyệt.",
      "D. Mô hình Autonomous Swarm nơi cả ba agent độc lập truy vấn `ticket_payload` và tranh giành xử lý tác vụ bằng cơ chế khóa mà không cần bước phân loại trung tâm."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): A router pattern evaluates the input intent and dispatches execution to a single dedicated specialist, preventing redundant processing, state conflicts, and duplicate user notifications.",
      "Option B: Sequential prompt chaining forces unnecessary execution of billing and identity checks for purely technical tickets, increasing latency and latency costs without isolating domain logic.",
      "Option C: An evaluator-optimizer loop is designed for iterative quality refinement of a single output, not for directing discrete domain-specific tasks to targeted worker agents.",
      "Option D: Autonomous task claiming without central routing creates race conditions and unpredictable specialist execution for structured ticket triage."
    ],
    "rationale": "The Router pattern is explicitly designed for dynamic routing where an input must be classified and directed to exactly one specialized agent branch based on payload metadata.",
    "explanation": "Phương án A là đáp án đúng vì mô hình Router Orchestrator được thiết kế nhằm phân loại yêu cầu đầu vào và điều hướng tác vụ đến đúng một agent chuyên trách duy nhất, giải quyết triệt để vấn đề xử lý trùng lặp và xung đột thông báo.\n- Phương án B sai vì Prompt Chaining ép buộc mọi ticket phải đi qua lần lượt cả 3 agent, gây lãng phí tài nguyên và tăng độ trễ không cần thiết.\n- Phương án C sai vì vòng lặp Evaluator-Optimizer dùng để tối ưu hóa chất lượng văn bản qua các vòng lặp đánh giá, không phải để điều hướng phân loại tác vụ.\n- Phương án D sai vì mô hình Autonomous Swarm không có bộ điều hướng trung tâm sẽ dễ dẫn đến tranh chấp tài nguyên (race condition) và không đảm bảo tính nhất quán trong phân loại ticket.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  },
  {
    "id": "d1-b02-1.2-002",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-002",
    "scenarioSignature": {
      "testedPrinciple": "prompt chaining orchestration pattern for deterministic linear workflows",
      "failureMode": "unpredictable release notes output due to flexible routing in a fixed step pipeline",
      "rootCause": "using dynamic orchestrator routing for a standardized sequential task sequence",
      "requiredFix": "implement fixed prompt chaining sequence passing structured state sequentially"
    },
    "questionEN": "A DevOps platform generates automated release notes from Git commit logs. The workflow always follows a strict three-step sequence: first parse commit messages and pull request metadata (`commit_log_parser`), second classify changes into breaking changes vs features (`change_classifier`), and third format markdown release notes according to standard templates (`markdown_formatter`). Developers notice that an experimental router agent occasionally skips classification or re-runs parsing mid-flow. Which orchestration pattern provides the required determinism and cost efficiency for this workflow?",
    "question": "[d1-b02-1.2-002] Một nền tảng DevOps tự động tạo ghi chú phát hành (release notes) từ lịch sử git commit. Workflow này luôn tuân theo một chuỗi ba bước nghiêm ngặt: đầu tiên phân tích tin nhắn commit và metadata của pull request (`commit_log_parser`), thứ hai phân loại thay đổi thành breaking changes hoặc features (`change_classifier`), và thứ ba định dạng release notes dưới dạng markdown theo mẫu chuẩn (`markdown_formatter`). Các kỹ sư nhận thấy rằng một agent điều khiển linh hoạt thỉnh thoảng bỏ qua bước phân loại hoặc chạy lại bước phân tích ở giữa luồng. Mô hình điều phối nào cung cấp tính xác định (determinism) và hiệu quả chi phí cần thiết cho workflow này?",
    "optionsEN": [
      "A. An Orchestrator-Workers pattern where a central manager agent dynamically assigns each step based on runtime LLM decisions after inspecting intermediate outputs.",
      "B. A Prompt Chaining pattern that connects `commit_log_parser`, `change_classifier`, and `markdown_formatter` into a fixed, deterministic linear pipeline where each step consumes the prior step's output.",
      "C. A Parallelization Orchestrator pattern that executes `commit_log_parser`, `change_classifier`, and `markdown_formatter` concurrently and merges their independent outputs.",
      "D. An Evaluator-Optimizer pattern that continuously loops the raw git commit log through an optimizer agent until a discriminator confirms markdown compliance."
    ],
    "options": [
      "A. Mô hình Orchestrator-Workers nơi một agent quản lý trung tâm linh hoạt giao từng bước dựa trên quyết định LLM runtime sau khi kiểm tra kết quả trung gian.",
      "B. Mô hình Prompt Chaining kết nối `commit_log_parser`, `change_classifier`, và `markdown_formatter` thành một đường ống tuyến tính cố định, xác định, nơi mỗi bước nhận đầu ra của bước trước đó.",
      "C. Mô hình Parallelization Orchestrator thực thi đồng thời `commit_log_parser`, `change_classifier`, và `markdown_formatter` rồi hợp nhất các đầu ra độc lập.",
      "D. Mô hình Evaluator-Optimizer lặp lại liên tục git commit log thô qua một agent tối ưu cho đến khi agent phân biệt xác nhận tuân thủ định dạng markdown."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A: Dynamic orchestration introduces non-deterministic routing overhead and LLM reasoning latency for a workflow whose step sequence is completely fixed and predictable.",
      "Option B (Correct): Prompt chaining enforces a fixed, linear progression of discrete steps where the output of step N is passed as context to step N+1, ensuring exact execution order and maximum determinism.",
      "Option C: Parallel execution fails because `change_classifier` strictly depends on parsed metadata from `commit_log_parser`, and `markdown_formatter` depends on classified changes.",
      "Option D: An evaluator-optimizer loop creates unnecessary iterative cost and token usage when each transformation step in the pipeline can be executed deterministically in one pass."
    ],
    "rationale": "Prompt chaining is the ideal orchestration pattern when a task can be cleanly decomposed into a fixed sequence of dependent subtasks that require deterministic processing.",
    "explanation": "Phương án B là đáp án đúng vì chuỗi kỹ thuật (Prompt Chaining) liên kết các bước xử lý phụ thuộc theo tuyến tính xác định (extract -> classify -> format), đảm bảo thứ tự thực thi chính xác 100% và tiết kiệm chi phí token.\n- Phương án A sai vì việc dùng Orchestrator linh hoạt cho một quy trình cố định gây ra sự không xác định (non-deterministic) và tăng chi phí suy luận LLM không cần thiết.\n- Phương án C sai vì các bước trong quy trình này phụ thuộc dữ liệu nối tiếp nhau (`change_classifier` cần đầu ra của `commit_log_parser`), không thể chạy song song.\n- Phương án D sai vì Evaluator-Optimizer tạo ra vòng lặp phản hồi lãng phí khi quy trình vốn chỉ cần thực thi tuyến tính một lần duy nhất.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  }
]