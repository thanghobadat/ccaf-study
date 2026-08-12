[
  {
    "id": "d1-b02-1.2-005",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-005",
    "scenarioSignature": {
      "testedPrinciple": "parallelization orchestration pattern for independent subtasks",
      "failureMode": "excessive end-to-end latency from sequential execution of independent compliance checks",
      "rootCause": "emitting independent subtask invocations across consecutive LLM turns instead of batching tool calls",
      "requiredFix": "configure orchestrator to invoke independent compliance workers in parallel within a single execution turn"
    },
    "questionEN": "A global fintech platform uses an LLM coordinator to run regional compliance audits (gdpr_checker, ccpa_checker, pdpa_checker) for international wire transfers. Although the three regional compliance rules operate on independent payload schema fields (eu_vat_id, us_ssn_hash, sg_nric_hash), the coordinator emits each worker call sequentially across three separate LLM completion turns. This increases total p99 verification latency from 600 ms to 2,400 ms. Which orchestration architectural change resolves this latency issue while keeping the checks independent?",
    "question": "[d1-b02-1.2-005] Một nền tảng fintech toàn cầu sử dụng một agent điều phối LLM để chạy các kiểm tra tuân thủ khu vực (gdpr_checker, ccpa_checker, pdpa_checker) cho các giao dịch chuyển tiền quốc tế. Mặc dù ba quy tắc tuân thủ khu vực hoạt động trên các trường payload schema độc lập (eu_vat_id, us_ssn_hash, sg_nric_hash), agent điều phối lại phát từng lời gọi worker tuần tự qua ba lượt (turn) phản hồi LLM riêng biệt. Điều này làm tăng tổng độ trễ kiểm tra p99 từ 600 ms lên 2.400 ms. Thay đổi kiến trúc điều phối nào giải quyết vấn đề độ trễ này trong khi vẫn giữ các bước kiểm tra độc lập?",
    "optionsEN": [
      "A. Implement a Parallelization Orchestrator pattern that issues tool calls for gdpr_checker, ccpa_checker, and pdpa_checker simultaneously in a single LLM turn, executing all three regional checks concurrently.",
      "B. Implement a Prompt Chaining pattern that pipes the output of gdpr_checker into ccpa_checker and then into pdpa_checker to consolidate validation logs into a single context window.",
      "C. Implement an Evaluator-Optimizer loop pattern where a central compliance evaluator continuously checks audit logs after each individual regional worker finishes.",
      "D. Implement a Router Orchestrator pattern that uses an LLM classification step to select only one regional compliance checker per transaction based on primary user location."
    ],
    "options": [
      "A. Triển khai mô hình Parallelization Orchestrator để phát các lời gọi công cụ cho gdpr_checker, ccpa_checker và pdpa_checker đồng thời trong một lượt LLM duy nhất, thực thi cả ba kiểm tra khu vực song song.",
      "B. Triển khai mô hình Prompt Chaining để dẫn đầu ra của gdpr_checker vào ccpa_checker và sau đó vào pdpa_checker nhằm hợp nhất log xác thực vào một context window duy nhất.",
      "C. Triển khai mô hình vòng lặp Evaluator-Optimizer trong đó một agent đánh giá tuân thủ trung tâm liên tục kiểm tra log sau khi từng worker khu vực hoàn tất.",
      "D. Triển khai mô hình Router Orchestrator sử dụng bước phân loại LLM để chỉ chọn một kiểm tra tuân thủ khu vực cho mỗi giao dịch dựa trên vị trí người dùng chính."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Parallelization allows independent tasks to execute concurrently in a single turn, collapsing sequential network latency and reducing total runtime from three round-trips to one.",
      "Option B: Prompt chaining forces sequential dependency between independent workers, preserving the high latency overhead and adding unnecessary token context passing between stages.",
      "Option C: An evaluator-optimizer loop introduces iterative round-trips for quality refinement rather than solving parallel execution for independent compliance checks.",
      "Option D: Routing to a single regional checker violates global compliance requirements whenever a transaction touches multiple legal jurisdictions."
    ],
    "rationale": "The Parallelization Orchestrator pattern is specifically designed to execute independent subtasks concurrently in a single execution turn, reducing overall system latency when tasks have no data dependencies.",
    "explanation": "Phương án A là đáp án đúng vì mô hình Parallelization Orchestrator cho phép thực thi đồng thời các tác vụ độc lập trong cùng một lượt duy nhất, giảm độ trễ tổng thể từ ba lượt khứ hồi xuống còn một lượt.\n- Phương án B sai vì Prompt Chaining bắt buộc các worker độc lập phải chạy tuần tự, tiếp tục duy trì độ trễ cao và chuyển tiếp ngữ cảnh không cần thiết.\n- Phương án C sai vì vòng lặp Evaluator-Optimizer dành cho việc tinh chỉnh chất lượng lặp đi lặp lại chứ không giải quyết việc thực thi song song các bước kiểm tra độc lập.\n- Phương án D sai vì việc điều hướng đến duy nhất một worker khu vực sẽ vi phạm yêu cầu tuân thủ khi giao dịch liên quan đến nhiều quốc gia/vùng tài phán.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  },
  {
    "id": "d1-b02-1.2-006",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-006",
    "scenarioSignature": {
      "testedPrinciple": "centralized orchestration communication topology for auditability",
      "failureMode": "coordinator audit log missing state transitions due to sideband messaging",
      "rootCause": "worker agents communicating directly with each other bypassing central orchestrator",
      "requiredFix": "enforce strict hub and spoke topology where all worker outputs return to coordinator"
    },
    "questionEN": "In an enterprise fraud detection pipeline, a central orchestrator delegates tasks to risk_assessment_worker and account_blocker_worker. To reduce latency, risk_assessment_worker sends an HTTP POST trigger directly to account_blocker_worker when detecting risk_level: critical, bypassing the coordinator. As a result, the centralized compliance logger audit_events shows zero record of account blocks, creating an untraceable discrepancy in system state logs. Which architectural remediation enforces proper logging and state centralization?",
    "question": "[d1-b02-1.2-006] Trong một pipeline phát hiện gian lận doanh nghiệp, agent điều phối trung tâm ủy quyền tác vụ cho risk_assessment_worker và account_blocker_worker. Để giảm độ trễ, risk_assessment_worker phát trực tiếp một HTTP POST trigger tới account_blocker_worker khi phát hiện risk_level: critical, bỏ qua agent điều phối. Kết quả là hệ thống ghi log tuân thủ tập trung audit_events không ghi nhận được lịch sử khóa tài khoản, tạo ra sự sai lệch không thể truy vết trong log trạng thái. Biện pháp khắc phục kiến trúc nào đảm bảo ghi log chính xác và tập trung hóa trạng thái?",
    "optionsEN": [
      "A. Configure risk_assessment_worker to write direct peer-to-peer communication payloads to a shared distributed Redis cache.",
      "B. Re-architect the system into a strict Hub-and-Spoke Orchestrator-Workers pattern where workers return results exclusively to the central orchestrator, which logs all state changes before delegating downstream actions.",
      "C. Transition the system to an Autonomous Swarm architecture where workers dynamically register events on an unmonitored message bus.",
      "D. Implement a dynamic Evaluator-Optimizer loop where an independent auditor agent periodically inspects the local filesystem logs of account_blocker_worker."
    ],
    "options": [
      "A. Cấu hình risk_assessment_worker để ghi các payload giao tiếp ngang hàng (peer-to-peer) trực tiếp vào một bộ nhớ đệm chia sẻ Redis.",
      "B. Tái cấu trúc hệ thống thành mô hình Orchestrator-Workers dạng Hub-and-Spoke nghiêm ngặt, trong đó các worker chỉ trả kết quả về agent điều phối trung tâm để ghi log toàn bộ thay đổi trước khi ủy quyền hành động tiếp theo.",
      "C. Chuyển đổi hệ thống sang kiến trúc Autonomous Swarm trong đó các worker tự động đăng ký sự kiện trên một bus tin nhắn không được giám sát.",
      "D. Triển khai vòng lặp Evaluator-Optimizer động trong đó một agent kiểm toán độc lập định kỳ thu thập log từ hệ thống tệp cục bộ của account_blocker_worker."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A: Writing peer messages to Redis maintains decentralized sideband communication and does not enforce central coordinator state management or unified audit logging.",
      "Option B (Correct): Enforcing a hub-and-spoke topology ensures all inter-worker data flows through the central orchestrator, guaranteeing complete state visibility, consistent logging, and controlled execution.",
      "Option C: Autonomous swarm messaging decentralizes control further, aggravating the lack of centralized logging and audit trace visibility.",
      "Option D: Periodic local log scraping is an unreliable offline fallback that does not fix real-time coordinator state drift or unmonitored action execution."
    ],
    "rationale": "In an Orchestrator-Workers pattern, strict hub-and-spoke communication requires all subtask results to flow back to the orchestrator, preserving auditability and central state integrity.",
    "explanation": "Phương án B là đáp án đúng vì kiến trúc Hub-and-Spoke trong mô hình Orchestrator-Workers bắt buộc mọi luồng dữ liệu trung gian phải thông qua agent điều phối trung tâm, đảm bảo khả năng quan sát trạng thái toàn diện và ghi log tuân thủ đầy đủ.\n- Phương án A sai vì việc ghi tin nhắn vào Redis vẫn duy trì giao tiếp kênh phụ phân tán, không giải quyết việc tập trung quản lý trạng thái tại agent điều phối.\n- Phương án C sai vì mô hình Autonomous Swarm càng phân tán quyền kiểm soát, khiến việc theo dõi và ghi log tuân thủ thêm bất khả thi.\n- Phương án D sai vì việc quét log cục bộ định kỳ chỉ là giải pháp tạm thời, không ngăn chặn được tình trạng mất đồng bộ trạng thái thời gian thực của agent điều phối.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  }
]