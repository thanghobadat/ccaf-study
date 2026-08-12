[
  {
    "id": "d1-b03-new-003",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-003",
    "scenarioSignature": {
      "testedPrinciple": "Hub-and-spoke subagent communication model",
      "failureMode": "Worker subagent attempts direct invocation of another worker subagent",
      "rootCause": "Subagent granted Task tool permission allowing peer-to-peer invocation",
      "requiredFix": "Restrict subagent tool scope and route communication strictly through coordinator"
    },
    "questionEN": "A media application deploys a ContentModerationPipeline coordinator to evaluate user submissions. After SentimentAnalyzer flags negative sentiment, it attempts to directly execute Task(target=\"toxicity_detector\") to check for offensive language, triggering a 403 Forbidden: DirectSubagentInvocation exception. Why did this execution fail, and how should the system be re-architected?",
    "question": "[d1-b03-new-003] Một ứng dụng truyền thông triển khai coordinator ContentModerationPipeline để đánh giá nội dung người dùng gửi lên. Sau khi SentimentAnalyzer phát hiện cảm xúc tiêu cực, nó cố gắng thực thi trực tiếp Task(target=\"toxicity_detector\") để kiểm tra ngôn ngữ xúc phạm, làm kích hoạt ngoại lệ 403 Forbidden: DirectSubagentInvocation. Tại sao lần thực thi này thất bại và hệ thống nên được tái cấu trúc như thế nào?",
    "optionsEN": [
      "A. Configure peer-to-peer RPC permissions in the deployment manifest to allow direct subagent calls.",
      "B. Increase container memory for SentimentAnalyzer to execute toxicity evaluation in-process.",
      "C. Remove Task invocation permission from SentimentAnalyzer and route output back to ContentModerationPipeline to invoke toxicity_detector.",
      "D. Use a shared Redis queue for SentimentAnalyzer to push moderation jobs directly to toxicity_detector."
    ],
    "options": [
      "A. Cấu hình quyền RPC ngang hàng trong manifest triển khai để cho phép gọi trực tiếp giữa các subagent.",
      "B. Tăng bộ nhớ container cho SentimentAnalyzer để thực thi đánh giá độc hại trực tiếp trong tiến trình.",
      "C. Xóa quyền khởi tạo Task khỏi SentimentAnalyzer và định tuyến đầu ra trở lại ContentModerationPipeline để gọi toxicity_detector.",
      "D. Sử dụng Redis queue chia sẻ để SentimentAnalyzer đẩy công việc kiểm duyệt trực tiếp tới toxicity_detector."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because permitting direct inter-subagent RPC calls violates the hub-and-spoke model and breaks coordinator state control.",
      "Option B is incorrect because increasing container memory does not resolve the architectural violation of direct subagent invocation.",
      "Option C is correct because subagents must never invoke other subagents directly; all work must return to the coordinator agent (ContentModerationPipeline), which manages workflow routing.",
      "Option D is incorrect because bypassing the coordinator via a shared Redis queue retains the direct peer-to-peer coupling violation."
    ],
    "rationale": "In a hub-and-spoke subagent architecture, subagents are strictly isolated and must return control and results to the central coordinator. Subagents must never call other subagents directly.",
    "explanation": "Trong kiến trúc subagent Hub-and-Spoke, các subagent được cô lập nghiêm ngặt và không được phép gọi trực tiếp lẫn nhau. Mọi giao tiếp và điều phối workflow phải thông qua agent điều phối trung tâm.\n\n- Option A sai: Việc bật RPC ngang hàng vi phạm mô hình Hub-and-Spoke và phá vỡ khả năng kiểm soát trạng thái của coordinator.\n- Option B sai: Tăng bộ nhớ container không giải quyết được lỗi vi phạm kiến trúc ủy quyền subagent.\n- Option C đúng: Loại bỏ công cụ Task khỏi subagent SentimentAnalyzer và bắt buộc trả kết quả về ContentModerationPipeline để coordinator thực hiện cuộc gọi tiếp theo đúng theo mô hình Hub-and-Spoke.\n- Option D sai: Sử dụng Redis queue để liên lạc trực tiếp giữa các worker vẫn vi phạm nguyên tắc điều phối trung tâm."
  },
  {
    "id": "d1-b03-new-004",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-004",
    "scenarioSignature": {
      "testedPrinciple": "Coordinator audit trail compliance in hub-and-spoke architecture",
      "failureMode": "Missing audit trail records due to bypassed coordinator logging",
      "rootCause": "Direct subagent-to-subagent task delegation bypassing central orchestrator",
      "requiredFix": "Enforce strict hub-and-spoke routing where workers return outputs to coordinator"
    },
    "questionEN": "A multilingual documentation system utilizes DocumentProcessingOrchestrator to manage translation and summarization. Security compliance checks reveal missing audit_trace_id records because TranslationSubagent invokes SummarizationSubagent directly upon completing a translation. Which architectural change resolves the compliance gap?",
    "question": "[d1-b03-new-004] Một hệ thống tài liệu đa ngôn ngữ sử dụng DocumentProcessingOrchestrator để quản lý việc dịch thuật và tóm tắt. Các kiểm tra tuân thủ bảo mật phát hiện thiếu các bản ghi audit_trace_id vì TranslationSubagent gọi trực tiếp SummarizationSubagent ngay khi hoàn thành bản dịch. Thay đổi kiến trúc nào sẽ giải quyết được lỗ hổng tuân thủ này?",
    "optionsEN": [
      "A. Attach an audit logging sidecar to TranslationSubagent to record outbound API calls to peer agents.",
      "B. Cryptographically sign payload parameters with JWT tokens before invoking the summarization worker.",
      "C. Extend the timeout setting on DocumentProcessingOrchestrator to capture background subagent events.",
      "D. Restrict subagents from calling each other directly; force TranslationSubagent to return results to DocumentProcessingOrchestrator so it can log the audit trace before spawning SummarizationSubagent."
    ],
    "options": [
      "A. Gắn một sidecar ghi log kiểm toán vào TranslationSubagent để ghi lại các cuộc gọi API đầu ra tới các agent ngang hàng.",
      "B. Ký mã hóa các tham số payload bằng JWT token trước khi gọi worker tóm tắt.",
      "C. Kéo dài cài đặt timeout trên DocumentProcessingOrchestrator để ghi lại các sự kiện subagent chạy nền.",
      "D. Ngăn cấm các subagent gọi trực tiếp lẫn nhau; bắt buộc TranslationSubagent trả kết quả về DocumentProcessingOrchestrator để nó ghi log kiểm toán trước khi tạo SummarizationSubagent."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because adding a sidecar logger does not fix the hub-and-spoke architectural bypass; subagents must communicate exclusively through the coordinator.",
      "Option B is incorrect because token signing validates data integrity but does not restore coordinator orchestration or central audit trail tracking.",
      "Option C is incorrect because increasing orchestrator timeouts cannot capture calls that bypass the coordinator entirely.",
      "Option D is correct because returning results to DocumentProcessingOrchestrator enforces the hub-and-spoke topology, ensuring complete central logging and audit trail preservation."
    ],
    "rationale": "Direct communication between subagents bypasses the coordinator's centralized state management and auditing controls. Enforcing hub-and-spoke flow ensures all inter-step data passes through the coordinator where audit metadata can be accurately recorded.",
    "explanation": "Việc giao tiếp trực tiếp giữa các subagent làm bỏ qua khả năng ghi log kiểm toán trung tâm và quản lý trạng thái của coordinator. Bắt buộc luồng làm việc tuân theo Hub-and-Spoke giúp coordinator duy trì đầy đủ nhật ký kiểm toán.\n\n- Option A sai: Việc thêm sidecar không giải quyết được việc vi phạm kiến trúc Hub-and-Spoke và làm tăng sự phức tạp hạ tầng.\n- Option B sai: Ký JWT chỉ xác thực tính toàn vẹn dữ liệu chứ không tạo bản ghi audit central tại coordinator.\n- Option C sai: Tăng timeout của coordinator không thể giúp nó bắt được các cuộc gọi bỏ qua nó hoàn toàn.\n- Option D đúng: Ngăn chặn giao tiếp trực tiếp giữa các subagent và bắt buộc TranslationSubagent phải hoàn trả kết quả về DocumentProcessingOrchestrator để coordinator ghi audit_trace_id trước khi khởi tạo SummarizationSubagent."
  }
]