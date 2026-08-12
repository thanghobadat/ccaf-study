[
  {
    "id": "d1-b03-1.5-005",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-005",
    "scenarioSignature": {
      "testedPrinciple": "PreToolUse input validation and payload sanitization",
      "failureMode": "Tool execution crash due to malformed LLM argument types",
      "rootCause": "Tool execution triggered without prior parameter schema validation",
      "requiredFix": "Implement a PreToolUse hook to validate and sanitize parameter payloads before execution"
    },
    "questionEN": "An automated infrastructure management agent invokes the db_migrate tool with parameters target_version and timeout_seconds. The LLM generates the string \"thirty\" for timeout_seconds instead of an integer 30, causing the underlying tool handler to throw an unhandled TypeError during execution. Which SDK hook strategy prevents this execution crash before the tool runs?",
    "question": "[d1-b03-1.5-005] Một agent quản lý hạ tầng tự động gọi công cụ db_migrate với các tham số target_version và timeout_seconds. LLM tạo ra chuỗi \"thirty\" cho timeout_seconds thay vì số nguyên 30, khiến trình xử lý công cụ bên dưới ném ra ngoại lệ TypeError không được xử lý trong quá trình thực thi. Chiến lược SDK hook nào ngăn ngừa lỗi thực thi này trước khi công cụ chạy?",
    "optionsEN": [
      "A. Register a PreToolUse hook to validate parameter types against the JSON schema and reject or coerce invalid payloads before tool invocation.",
      "B. Implement a PostToolUse hook to catch the thrown TypeError and re-run the tool with parsed integer fallback parameters.",
      "C. Append a prompt instruction commanding the LLM to strictly output integer data types for all numerical parameters.",
      "D. Configure an asynchronous background logging service to intercept and fix malformed parameters after tool invocation fails."
    ],
    "options": [
      "A. Đăng ký một PreToolUse hook để kiểm tra kiểu tham số so với JSON schema và từ chối hoặc ép kiểu các payload không hợp lệ trước khi gọi công cụ.",
      "B. Triển khai một PostToolUse hook để bắt TypeError được ném ra và chạy lại công cụ với các tham số số nguyên dự phòng đã được phân tích.",
      "C. Thêm một hướng dẫn trong prompt yêu cầu LLM xuất ra đúng kiểu dữ liệu số nguyên cho tất cả các tham số dạng số.",
      "D. Cấu hình một dịch vụ ghi log chạy ngầm bất đồng bộ để chặn và sửa các tham số bị lỗi sau khi việc gọi công cụ thất bại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because PreToolUse hooks intercept tool calls prior to execution, allowing deterministic schema validation and payload normalization before bad data reaches the tool function.",
      "Option B is incorrect because PostToolUse hooks execute after the tool attempt and cannot prevent an unhandled exception thrown during execution from breaking the primary execution pipeline.",
      "Option C is incorrect because system prompts are non-deterministic and cannot guarantee parameter type safety under high concurrency or model drift.",
      "Option D is incorrect because asynchronous background services run out-of-band and cannot fix runtime execution failures retroactively."
    ],
    "rationale": "PreToolUse hooks provide a deterministic boundary to inspect and validate tool call arguments before invocation, preventing malformed LLM outputs from causing runtime crashes in tool code.",
    "explanation": "Lựa chọn A đúng vì PreToolUse hook can thiệp trước khi công cụ được thực thi, cho phép kiểm tra schema và ép kiểu hoặc từ chối dữ liệu không hợp lệ một cách xác định. Lựa chọn B sai vì PostToolUse hook chạy sau khi công cụ đã gọi, không thể ngăn chặn ngoại lệ phát sinh trong quá trình chạy. Lựa chọn C sai vì các hướng dẫn prompt mang tính xác suất, không đảm bảo tuyệt đối an toàn kiểu dữ liệu. Lựa chọn D sai vì các dịch vụ bất đồng bộ không can thiệp trực tiếp vào luồng xử lý đồng bộ để sửa lỗi runtime.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  },
  {
    "id": "d1-b03-1.5-006",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-006",
    "scenarioSignature": {
      "testedPrinciple": "PostToolUse observation and telemetry logging",
      "failureMode": "High latency in tool pipeline caused by synchronous blocking audit logging in PreToolUse",
      "rootCause": "Using PreToolUse for non-blocking telemetry instead of PostToolUse post-execution capture",
      "requiredFix": "Deploy a PostToolUse hook to record execution outcomes and latency metrics asynchronously after tool completion"
    },
    "questionEN": "A cloud administration agent executes iam_policy_update tools across multiple staging environments. Security compliance requires logging execution latency, return status codes, and output payloads to a central audit repository without blocking or delaying active tool execution. Which SDK hook implementation correctly fulfills this audit requirement?",
    "question": "[d1-b03-1.5-006] Một agent quản trị cloud thực thi các công cụ iam_policy_update trên nhiều môi trường staging. Yêu cầu tuân thủ an ninh đòi hỏi phải ghi log độ trễ thực thi, mã trạng thái trả về và payload kết quả vào hệ thống lưu trữ kiểm toán trung tâm mà không làm chặn hoặc chậm trễ việc thực thi công cụ. Triển khai SDK hook nào đáp ứng đúng yêu cầu kiểm toán này?",
    "optionsEN": [
      "A. Implement a PreToolUse hook that synchronously writes execution intent to the audit log and blocks execution until write confirmation is received.",
      "B. Implement a PostToolUse hook that extracts execution status, returned payloads, and duration metrics after tool completion to populate the audit log.",
      "C. Add inline logging statements inside the prompt instructions to instruct the model to echo audit log entries in its response text.",
      "D. Configure a PreToolUse validator hook to ping the central audit log repository and block tool execution if the logging service latency exceeds 100ms."
    ],
    "options": [
      "A. Triển khai một PreToolUse hook ghi đồng bộ ý định thực thi vào audit log và chặn thực thi cho đến khi nhận được xác nhận ghi.",
      "B. Triển khai một PostToolUse hook trích xuất trạng thái thực thi, payload trả về và số đo thời gian sau khi công cụ hoàn thành để ghi vào audit log.",
      "C. Thêm các câu lệnh ghi log trực tiếp vào hướng dẫn prompt để yêu cầu mô hình phản hồi kèm theo các dòng audit log.",
      "D. Cấu hình một PreToolUse validator hook để kiểm tra dịch vụ audit log trung tâm và chặn thực thi công cụ nếu độ trễ ghi log vượt quá 100ms."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because PreToolUse hooks run prior to execution and cannot access final return payloads or execution latency metrics, and synchronous blocking degrades performance.",
      "Option B is correct because PostToolUse hooks run after tool execution, granting access to return statuses, output data, and accurate duration metrics without blocking tool execution.",
      "Option C is incorrect because prompt instructions cannot reliably format or guarantee telemetry transmission to external storage services.",
      "Option D is incorrect because blocking tool execution based on audit log ping latency violates the requirement for non-blocking observation."
    ],
    "rationale": "PostToolUse hooks execute after tool completion, making them the optimal lifecycle location for capturing telemetry, output payloads, and duration metrics for auditing without blocking tool execution.",
    "explanation": "Lựa chọn B đúng vì PostToolUse hook chạy sau khi công cụ đã hoàn thành, cho phép truy cập kết quả trả về, độ trễ và dữ liệu đầu ra để ghi audit log mà không làm cản trở quá trình chạy của công cụ. Lựa chọn A sai vì PreToolUse chưa có thông tin về kết quả và độ trễ thực thi. Lựa chọn C sai vì prompt không thể ghi log tin cậy ra hệ thống lưu trữ bên ngoài. Lựa chọn D sai vì việc chặn công cụ dựa trên độ trễ của dịch vụ log vi phạm yêu cầu không gây gián đoạn luồng thực thi.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  }
]