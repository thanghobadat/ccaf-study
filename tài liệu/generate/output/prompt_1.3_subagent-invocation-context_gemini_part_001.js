[
  {
    "id": "d1-b03-new-001",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-001",
    "questionEN": "A customer analytics system uses a primary agent named CustomerRetentionOrchestrator configured with allowedTools: [\"churn_query\", \"cohort_filter\"]. When tasked with calculating churn risk across multiple customer segments, the orchestrator attempts to delegate segment analysis by outputting intent text, but enters a loop until max_steps=50 is reached with 0 subagents spawned. What modification is required to enable subagent execution?",
    "question": "[d1-b03-new-001] Một hệ thống phân tích khách hàng sử dụng agent chính tên là CustomerRetentionOrchestrator được cấu hình với allowedTools: [\"churn_query\", \"cohort_filter\"]. Khi được giao nhiệm vụ tính toán nguy cơ rời bỏ dịch vụ trên nhiều phân khúc khách hàng, orchestrator cố gắng ủy quyền phân tích phân khúc bằng cách xuất văn bản ý định, nhưng rơi vào vòng lặp cho đến khi đạt max_steps=50 với 0 subagent được khởi tạo. Cần điều chỉnh gì để kích hoạt việc thực thi subagent?",
    "optionsEN": [
      "A. Add \"Task\" to the allowedTools configuration of CustomerRetentionOrchestrator.",
      "B. Increase max_steps to 100 to allow the orchestrator additional iterations for context resolution.",
      "C. Update cohort_filter parameters to support parallel execution within the main loop.",
      "D. Change the main agent prompt to forbid generating intent text prior to tool calls."
    ],
    "options": [
      "A. Thêm \"Task\" vào cấu hình allowedTools của CustomerRetentionOrchestrator.",
      "B. Tăng max_steps lên 100 để cho phép orchestrator có thêm các vòng lặp xử lý ngữ cảnh.",
      "C. Cập nhật các tham số của cohort_filter để hỗ trợ thực thi song song trong vòng lặp chính.",
      "D. Thay đổi prompt của agent chính để cấm tạo văn bản ý định trước khi gọi tool."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because subagent invocation requires the Task tool to be explicitly included in the coordinator's allowedTools list; without it, the model cannot issue structural delegation calls.",
      "Option B is incorrect because increasing max_steps merely prolongs the looping failure mode without granting the agent permission to invoke subagent tasks.",
      "Option C is incorrect because modifying query parameters in cohort_filter does not address the missing subagent invocation tool capability.",
      "Option D is incorrect because modifying prompt instructions does not grant the runtime tool permissions required to execute subagent calls."
    ],
    "rationale": "In subagent architecture, a coordinator agent must have the Task tool explicitly enabled in its allowedTools parameter to programmatically spawn subagents. Without Task, the coordinator falls back to generating natural language intentions and looping until reaching step limits.",
    "explanation": "Trong kiến trúc agentic, agent điều phối (coordinator) phải được cấp quyền truy cập cụ thể vào công cụ Task trong danh sách allowedTools để có thể khởi tạo subagent một cách lập trình.\\n\\n- Option A đúng: Khi thiếu Task trong allowedTools, model không thể phát ra tool call để tạo subagent, dẫn đến việc chỉ tạo ra văn bản ý định và rơi vào vòng lặp lặp đi lặp lại. Việc thêm Task cho phép coordinator gọi subagent thành công.\\n- Option B sai: Việc tăng max_steps chỉ làm kéo dài thời gian chạy và tiêu tốn token vô ích chứ không giải quyết được nguyên nhân gốc rễ là thiếu quyền công cụ.\\n- Option C sai: Điều chỉnh tham số cohort_filter không ảnh hưởng đến khả năng phân phát và ủy quyền subagent của coordinator.\\n- Option D sai: Thay đổi prompt không thể cung cấp khả năng hoặc quyền truy cập runtime cho công cụ Task nếu nó không có trong allowedTools.",
    "scenarioSignature": {
      "testedPrinciple": "Subagent invocation tool registration",
      "failureMode": "Coordinator agent enters infinite execution loop failing subagent delegation",
      "rootCause": "Missing Task tool in coordinator allowed tools list",
      "requiredFix": "Add Task tool to coordinator allowed tools declaration"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-002",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-002",
    "questionEN": "A logistics platform deploys SupplyChainDispatcher with tools: [\"supplier_lookup\", \"route_evaluator\"] to orchestrate inventory updates across distribution hubs. Monitoring alerts show that while the dispatcher outputs log messages stating \"Delegating hub lead- time calculation to subagent\", zero subagent tasks are registered in the execution pipeline and work remains unfulfilled. What is the root cause and fix for this issue?",
    "question": "[d1-b03-new-002] Một nền tảng logistics triển khai SupplyChainDispatcher với tools: [\"supplier_lookup\", \"route_evaluator\"] để điều phối cập nhật kho hàng qua các trung tâm phân phối. Cảnh báo giám sát cho thấy mặc dù dispatcher xuất các log message có nội dung \"Delegating hub lead - time calculation to subagent\", không có task subagent nào được ghi nhận trong pipeline thực thi và công việc vẫn chưa hoàn thành. Nguyên nhân gốc rễ và cách khắc phục cho sự cố này là gì?",
    "optionsEN": [
      "A. The worker subagents lack execution tokens; increase the API concurrency quota for downstream workers.",
      "B. The SupplyChainDispatcher lacks the Task tool in its tools configuration; add Task to allow formal subagent invocation calls.",
      "C. The subagents require direct communication channels; configure a shared event broker between subagents.",
      "D. The dispatcher context window is overflowing; clear history before triggering delegation instructions."
    ],
    "options": [
      "A. Các subagent worker thiếu token thực thi; tăng quota API đồng thời cho các worker phía sau.",
      "B. SupplyChainDispatcher thiếu công cụ Task trong cấu hình tools; thêm Task để cho phép các lời gọi khởi tạo subagent chính thức.",
      "C. Các subagent yêu cầu kênh giao tiếp trực tiếp; cấu hình một event broker chia sẻ giữa các subagent.",
      "D. Cửa sổ ngữ cảnh của dispatcher bị tràn; xóa lịch sử trước khi kích hoạt các hướng dẫn ủy quyền."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because worker API concurrency quota does not prevent the dispatcher from issuing subagent creation calls.",
      "Option B is correct because without Task in its tools schema, the model cannot invoke the subagent creation mechanism and instead produces plain text describing what it intends to delegate.",
      "Option C is incorrect because subagents communicate via the hub-and-spoke coordinator model, not direct inter-subagent event channels.",
      "Option D is incorrect because context overflow causes truncation or errors, not valid text outputs containing unexecuted delegation plans."
    ],
    "rationale": "When a coordinator/dispatcher agent lacks the Task tool in its schema, it cannot emit structured tool calls for delegation. Instead, it outputs conversational text stating its intention to delegate, but no subagents are spawned.",
    "explanation": "Khi agent điều phối/dispatcher không được cung cấp công cụ Task trong danh sách tools, mô hình ngôn ngữ không thể thực hiện các cuộc gọi công cụ có cấu trúc để tạo subagent. Kết quả là nó chỉ xuất ra văn bản tự nhiên diễn tả ý định ủy quyền mà không kích hoạt được bất kỳ worker nào.\\n\\n- Option A sai: Quota API của worker không ngăn cản dispatcher tạo cuộc gọi khởi tạo subagent.\\n- Option B đúng: Đăng ký Task vào danh sách tools của SupplyChainDispatcher cấp quyền cho mô hình gọi công cụ khởi tạo subagent lập trình thay vì chỉ xuất văn bản thuần túy.\\n- Option C sai: Trong mô hình Hub-and-Spoke, subagents không giao tiếp trực tiếp với nhau thông qua event broker mà thông qua agent điều phối.\\n- Option D sai: Tràn ngữ cảnh sẽ gây ra lỗi hoặc cắt tỉa văn bản chứ không tạo ra log văn bản hợp lệ giải thích kế hoạch ủy quyền.",
    "scenarioSignature": {
      "testedPrinciple": "Subagent invocation tool authorization",
      "failureMode": "Dispatcher emits text instructions without subagent task creation",
      "rootCause": "Missing Task tool in dispatcher tool declaration schema",
      "requiredFix": "Register Task tool in dispatcher tools schema"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]