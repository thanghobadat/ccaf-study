[
  {
    "id": "d1-b02-1.2-007",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-007",
    "scenarioSignature": {
      "testedPrinciple": "flat worker delegation over recursive sub-coordinator hierarchies",
      "failureMode": "deeply nested context trees preventing effective failure tracing",
      "rootCause": "recursive coordinator spawning per directory layer",
      "requiredFix": "central coordinator queue dispatching directly to workers"
    },
    "questionEN": "In a repository analysis system (RepoScan Agent) processing a 50,000-file codebase, the main coordinator recursively spawns child coordinator agents for each subdirectory encountered. When a subtask fails deep in a nested subfolder, OpenTelemetry trace contexts report 14 nested coordinator levels, causing developers to spend 45 minutes manually unwinding context trees to find the failing subagent. Which architectural refactoring best resolves this observability breakdown?",
    "question": "[d1-b02-1.2-007] Trong một hệ thống phân tích kho mã nguồn (RepoScan Agent) xử lý codebase 50.000 tệp, coordinator chính tạo đệ quy các agent coordinator con cho mỗi thư mục con gặp phải. Khi một tác vụ con thất bại sâu bên trong thư mục lồng nhau, ngữ cảnh vết OpenTelemetry báo cáo 14 cấp coordinator lồng nhau, khiến các nhà phát triển mất 45 phút gỡ lỗi để tìm ra subagent bị lỗi. Tái cấu trúc kiến trúc nào giải quyết tốt nhất sự cố về khả năng quan sát (observability) này?",
    "optionsEN": [
      "A. Increase OpenTelemetry log level from INFO to DEBUG and attach the full filesystem path to every child coordinator log payload.",
      "B. Wrap recursive sub-coordinator calls in a global try/except block that catches exceptions and re-raises them with appended directory names.",
      "C. Refactor to a flat architecture where a single central coordinator inspects the directory structure, builds an explicit file manifest task queue, and delegates worker tasks directly without intermediate nested coordinators.",
      "D. Configure a static recursion depth limit of 3 levels in the coordinator configuration schema and fall back to sequential execution for deeper paths."
    ],
    "options": [
      "A. Tăng mức độ log OpenTelemetry từ INFO lên DEBUG và đính kèm đường dẫn hệ thống tệp đầy đủ vào mỗi tải dữ liệu log của coordinator con.",
      "B. Bọc các lệnh gọi sub-coordinator đệ quy trong một khối try/except toàn cục để bắt ngoại lệ và tái ném ngoại lệ kèm theo tên thư mục.",
      "C. Tái cấu trúc sang kiến trúc phẳng trong đó một coordinator trung tâm kiểm tra cấu trúc thư mục, xây dựng hàng đợi tác vụ tệp rõ ràng và ủy quyền trực tiếp cho các worker mà không cần coordinator con lồng nhau.",
      "D. Cấu hình giới hạn độ sâu đệ quy tĩnh là 3 cấp trong schema cấu hình coordinator và chuyển sang thực thi tuần tự cho các đường dẫn sâu hơn."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Increasing OpenTelemetry log verbosity adds log volume but does not resolve the complex 14-level nested coordinator call stack that masks failure lineage.",
      "Option B is incorrect: Re-raising exceptions with directory names improves exception strings but retains the deeply nested coordinator hierarchy, leaving distributed tracing difficult.",
      "Option C is correct: Eliminating recursive coordinator spawning in favor of a single coordinator that dispatches task manifests directly to worker agents flattens the execution tree and makes distributed traces immediately actionable.",
      "Option D is incorrect: Imposing an arbitrary depth limit creates inconsistent orchestration behavior between shallow and deep directories rather than eliminating recursive call complexity."
    ],
    "rationale": "Replacing recursive sub-coordinator generation with a flat single-coordinator design eliminates deep call stack nesting, creating a transparent 1-to-1 trace parentage between coordinator and workers.",
    "explanation": "Phân tích chi tiết từng phương án:\n- Phương án A sai vì việc tăng log level lên DEBUG chỉ tăng khối lượng dữ liệu log chứ không làm giảm bớt độ phức tạp 14 cấp coordinator lồng nhau.\n- Phương án B sai vì bọc ngoại lệ bằng tên thư mục không giải quyết tận gốc cây điều phối lồng nhau phức tạp.\n- Phương án C đúng vì tái cấu trúc sang coordinator đơn cấp phân phát danh sách tệp thẳng tới worker giúp làm phẳng cây thực thi, giúp vết OpenTelemetry dễ theo dõi.\n- Phương án D sai vì giới hạn độ sâu tĩnh 3 cấp chỉ tạo ra hai luồng xử lý không nhất quán mà không giải quyết dứt điểm mô hình đệ quy lãng phí.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  },
  {
    "id": "d1-b02-1.2-008",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-008",
    "scenarioSignature": {
      "testedPrinciple": "deterministic in-process execution over agent spawning",
      "failureMode": "excessive latency and token cost for simple arithmetic",
      "rootCause": "spawning LLM workers for deterministic unit conversion",
      "requiredFix": "replace sub-agent invocation with in-process code transform"
    },
    "questionEN": "In an IoT data pipeline processing 50,000 sensor payloads daily, the orchestrator agent spawns a dedicated UnitConversionWorker sub-agent to transform telemetry values (temperature_f to temperature_c). Telemetry logs show agent_spawn_latency_ms averages 450ms per conversion, consuming $120 in unnecessary LLM API tokens per day for deterministic math. What architectural change best eliminates this overhead?",
    "question": "[d1-b02-1.2-008] Trong một đường ống dữ liệu IoT xử lý 50.000 dữ liệu cảm biến hàng ngày, agent điều phối tạo một sub-agent UnitConversionWorker riêng để chuyển đổi các giá trị đo đạc (temperature_f sang temperature_c). Log ghi nhận agent_spawn_latency_ms trung bình 450ms cho mỗi lượt chuyển đổi, tiêu tốn $120 chi phí token LLM API không cần thiết mỗi ngày cho phép toán định hình. Thay đổi kiến trúc nào loại bỏ tốt nhất chi phí phụ trội này?",
    "optionsEN": [
      "A. Implement a caching layer in UnitConversionWorker to store previously converted temperature pairs in Redis.",
      "B. Batch 500 temperature conversion requests into a single prompt sent to a high-throughput lightweight model like Claude 3 Haiku.",
      "C. Replace UnitConversionWorker with an asynchronous tool call that sends the conversion formula prompt to a centralized pool of 5 persistent sub-agents.",
      "D. Replace UnitConversionWorker with an in-process deterministic Python transform function executed directly by the orchestrator before downstream agent processing."
    ],
    "options": [
      "A. Triển khai một lớp bộ đệm (cache) trong UnitConversionWorker để lưu trữ các cặp nhiệt độ đã chuyển đổi trước đó vào Redis.",
      "B. Gom nhóm 500 yêu cầu chuyển đổi nhiệt độ thành một prompt duy nhất gửi tới mô hình nhẹ có băng thông cao như Claude 3 Haiku.",
      "C. Thay thế UnitConversionWorker bằng một lệnh gọi tool bất đồng bộ gửi prompt công thức chuyển đổi tới một nhóm 5 sub-agent duy trì sẵn.",
      "D. Thay thế UnitConversionWorker bằng một hàm biến đổi Python định hình trong tiến trình (in-process) được thực thi trực tiếp bởi agent điều phối trước khi xử lý hạ nguồn."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Redis caching avoids repeated LLM calls for identical floating-point values but still incurs agent invocation overhead for novel inputs.",
      "Option B is incorrect: Batching conversion prompts to a smaller model reduces token cost per item but still wastes LLM latency and tokens on deterministic calculations.",
      "Option C is incorrect: Maintaining a pool of persistent sub-agents reduces initialization latency but continues to route basic mathematical operations through expensive LLM inference.",
      "Option D is correct: Executing deterministic mathematical operations directly via in-process code eliminates sub-agent instantiation delay, network calls, and LLM token expenditures entirely."
    ],
    "rationale": "Deterministic transformations (such as unit conversions) should be executed via standard code functions within the runtime process rather than delegating to LLM agents, avoiding zero-value LLM overhead.",
    "explanation": "Phân tích chi tiết từng phương án:\n- Phương án A sai vì caching Redis chỉ giúp với giá trị trùng lặp, vẫn phải trả chi phí tạo agent cho các giá trị nhiệt độ mới.\n- Phương án B sai vì gom batch gửi cho model nhỏ như Haiku vẫn dùng LLM không cần thiết cho phép toán số học cố định.\n- Phương án C sai vì dùng pool sub-agent duy trì sẵn chỉ giảm latency khởi tạo chứ không giải quyết việc lãng phí token LLM cho phép tính đơn giản.\n- Phương án D đúng vì thực hiện chuyển đổi đơn vị bằng mã lệnh deterministic trong tiến trình giúp loại bỏ hoàn toàn 450ms latency khởi tạo agent và $120 chi phí token API.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  }
]