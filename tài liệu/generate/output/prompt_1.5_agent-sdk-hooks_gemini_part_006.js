[
  {
    "id": "d1-b03-1.5-011",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-011",
    "scenarioSignature": {
      "testedPrinciple": "Dual SDK lifecycle hooks for prevention and auditing",
      "failureMode": "Unauthorized database tool execution and missing response audit metrics",
      "rootCause": "Relying on a single lifecycle hook phase for pre-execution enforcement and post-execution telemetry",
      "requiredFix": "Pair PreToolUse hook for authorization blocking with PostToolUse hook for audit logging"
    },
    "questionEN": "An enterprise customer agent, DataVault-Agent, invokes the export_customer_records tool to extract user data. Security compliance dictates two strict requirements: zero unauthorized calls must execute against the database (0% unauthorized access), and all completed executions must record the returned row count in the SIEM audit log (100% audit coverage). The team currently relies on a single hook, leading to either unblocked execution or missing response metrics. How should the SDK hooks be configured to satisfy both requirements?",
    "question": "[d1-b03-1.5-011] Một agent khách hàng doanh nghiệp, DataVault-Agent, gọi tool export_customer_records để trích xuất dữ liệu người dùng. Tuân thủ bảo mật yêu cầu hai điều kiện nghiêm ngặt: không có cuộc gọi không được phép nào được thực thi tới cơ sở dữ liệu (0% truy cập trái phép) và tất cả các lần thực thi hoàn tất phải ghi lại số lượng dòng trả về vào audit log SIEM (100% bao phủ kiểm toán). Đội ngũ hiện chỉ dựa vào một hook duy nhất, dẫn đến việc các cuộc gọi bị thực thi mà không được chặn hoặc thiếu chỉ số phản hồi. Cấu hình SDK hooks như thế nào để đáp ứng cả hai yêu cầu?",
    "optionsEN": [
      "A. Implement a single PreToolUse hook that validates authorization credentials and captures the returned database row count upon completion.",
      "B. Implement a single PostToolUse hook that evaluates authorization rights, throwing an exception to cancel the tool call if unauthorized.",
      "C. Register a PreToolUse hook to validate permissions and block unauthorized executions, alongside a PostToolUse hook to record execution outcome and row count metrics.",
      "D. Replace SDK hooks with system prompt constraints requiring the model to verify user roles and output audit logs before calling tools."
    ],
    "options": [
      "A. Triển khai một PreToolUse hook duy nhất để xác thực quyền truy cập và ghi lại số lượng dòng cơ sở dữ liệu trả về sau khi hoàn thành.",
      "B. Triển khai một PostToolUse hook duy nhất để đánh giá quyền truy cập, ném ra ngoại lệ để hủy cuộc gọi tool nếu không có quyền.",
      "C. Đăng ký một PreToolUse hook để xác thực quyền và chặn các lượt thực thi không hợp lệ, cùng với một PostToolUse hook để ghi lại kết quả thực thi và chỉ số số lượng dòng.",
      "D. Thay thế SDK hooks bằng các ràng buộc trong system prompt yêu cầu mô hình tự kiểm tra vai trò người dùng và xuất audit log trước khi gọi tool."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because PreToolUse executes before the tool runs, so it cannot inspect the database response or calculate the final returned row count.",
      "Option B is incorrect because PostToolUse runs only after the tool has already executed, making it impossible to prevent unauthorized database access prior to execution.",
      "Option C is correct because PreToolUse guarantees zero unauthorized execution by intercepting and aborting calls before tool invocation, while PostToolUse ensures 100% audit coverage by logging the execution results and response metrics after completion.",
      "Option D is incorrect because system prompt instructions operate probabilistically and cannot guarantee 100% compliance or enforce deterministic access control at the SDK harness level."
    ],
    "rationale": "To satisfy both requirements (0% unauthorized access and 100% audit logging), the system requires both hook phases: PreToolUse acts as a gateway to intercept and abort unauthorized requests prior to execution, whereas PostToolUse captures actual execution metrics and returned row counts after completion.",
    "explanation": "Chi tiết giải thích các lựa chọn:\n- Lựa chọn A sai vì PreToolUse hook chạy trước khi tool thực thi, do đó nó không thể kiểm tra kết quả trả về từ cơ sở dữ liệu hay ghi nhận số lượng dòng đã trả về.\n- Lựa chọn B sai vì PostToolUse hook chỉ chạy sau khi tool đã thực thi xong, không thể ngăn chặn hành vi truy cập trái phép vào cơ sở dữ liệu trước đó.\n- Lựa chọn C đúng vì việc đăng ký đồng thời PreToolUse hook (để xác thực và chặn cuộc gọi trước khi thực thi) và PostToolUse hook (để thu thập chỉ số và số dòng trả về sau khi hoàn tất) là giải pháp duy nhất đáp ứng cả hai mục tiêu: 0% truy cập trái phép và 100% ghi log kiểm toán.\n- Lựa chọn D sai vì prompt instruction mang tính xác suất, không thể đảm bảo 100% tuân thủ hoặc thay thế cơ chế chặn chắc chắn ở cấp độ SDK framework.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  },
  {
    "id": "d1-b03-1.5-012",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-012",
    "scenarioSignature": {
      "testedPrinciple": "PreToolUse prevention versus PostToolUse telemetry lifecycle separation",
      "failureMode": "Attempting to prevent side-effects post-execution or record response data pre-execution",
      "rootCause": "Misunderstanding the execution sequence boundary between PreToolUse and PostToolUse SDK hooks",
      "requiredFix": "Assign PreToolUse for execution interception and PostToolUse for response telemetry"
    },
    "questionEN": "An infrastructure management system, CloudOps-Orchestrator, exposes the delete_production_cluster tool. The engineering team is designing two hooks: Requirement 1 must PREVENT execution if environment == 'production' and no approval_token is present in the payload. Requirement 2 must RECORD execution duration and returned status codes for telemetry dashboards. Which hook selection strategy correctly aligns with the technical capabilities of SDK lifecycle hooks?",
    "question": "[d1-b03-1.5-012] Một hệ thống quản lý hạ tầng, CloudOps-Orchestrator, cung cấp tool delete_production_cluster. Đội ngũ kỹ thuật đang thiết kế hai hook: Yêu cầu 1 phải NGĂN CHẶN (PREVENT) việc thực thi nếu environment == 'production' và không có approval_token trong payload. Yêu cầu 2 phải GHI LẠI (RECORD) thời gian thực thi và mã trạng thái trả về cho dashboard đo đạc. Chiến lược chọn hook nào phản ánh đúng khả năng kỹ thuật của SDK lifecycle hooks?",
    "optionsEN": [
      "A. Assign Requirement 1 to PostToolUse to analyze output and issue rollback commands, and Requirement 2 to PreToolUse to start latency timers.",
      "B. Assign both Requirement 1 and Requirement 2 to PreToolUse by intercepting arguments and synthesizing dummy telemetry data before tool invocation.",
      "C. Assign both Requirement 1 and Requirement 2 to PostToolUse, using post-execution exception throwing to suppress unauthorized resource deletions.",
      "D. Assign Requirement 1 to PreToolUse because prevention requires intercepting calls before execution, and Requirement 2 to PostToolUse because recording telemetry requires completed execution outputs."
    ],
    "options": [
      "A. Phân công Yêu cầu 1 cho PostToolUse để phân tích đầu ra và phát lệnh rollback, và Yêu cầu 2 cho PreToolUse để bắt đầu bộ đếm thời gian độ trễ.",
      "B. Phân công cả Yêu cầu 1 và Yêu cầu 2 cho PreToolUse bằng cách chặn tham số và tổng hợp dữ liệu telemetry giả trước khi gọi tool.",
      "C. Phân công cả Yêu cầu 1 và Yêu cầu 2 cho PostToolUse, sử dụng việc ném ngoại lệ sau thực thi để triệt tiêu các hành động xóa tài nguyên không hợp lệ.",
      "D. Phân công Yêu cầu 1 cho PreToolUse vì việc ngăn chặn đòi hỏi phải can thiệp cuộc gọi trước khi thực thi, và Yêu cầu 2 cho PostToolUse vì việc ghi nhận telemetry yêu cầu kết quả đầu ra sau khi thực thi hoàn tất."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because PostToolUse cannot prevent execution or guarantee rollback of destructive infrastructure API operations, and PreToolUse cannot measure total execution duration on its own.",
      "Option B is incorrect because PreToolUse cannot capture actual execution duration or genuine response status codes because the tool has not yet executed at the PreToolUse stage.",
      "Option C is incorrect because PostToolUse executes after delete_production_cluster has already run, meaning cloud resources would already be destroyed before the hook evaluates the authorization condition.",
      "Option D is correct because PreToolUse intercepts tool invocations prior to execution to deterministically prevent unauthorized infrastructure destruction, while PostToolUse receives execution metadata and return values required to record telemetry."
    ],
    "rationale": "The key distinction between PreToolUse and PostToolUse is interception timing: PREVENT operations must occur in PreToolUse before any side effects take place, whereas RECORD operations rely on PostToolUse to access the actual response status and timing metrics of completed operations.",
    "explanation": "Chi tiết giải thích các lựa chọn:\n- Lựa chọn A sai vì PostToolUse không thể ngăn chặn cuộc gọi đã xảy ra và không thể đảm bảo tự động rollback tài nguyên hạ tầng đã xóa; đồng thời PreToolUse đơn lẻ không đo được tổng thời gian chạy thực tế.\n- Lựa chọn B sai vì PreToolUse không thể ghi lại thời gian thực thi thực tế hay mã trạng thái thật của kết quả vì tool chưa được chạy.\n- Lựa chọn C sai vì PostToolUse chạy sau khi delete_production_cluster đã thực hiện xong, tài nguyên sản xuất đã bị xóa nên việc ném ngoại lệ lúc này là quá trễ.\n- Lựa chọn D đúng vì phân định rõ ràng vai trò: PreToolUse dùng để chặn (PREVENT) các cuộc gọi vi phạm điều kiện trước khi thi hành, còn PostToolUse dùng để ghi nhận (RECORD) telemetry dựa trên kết quả trả về thực tế của tool.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  }
]