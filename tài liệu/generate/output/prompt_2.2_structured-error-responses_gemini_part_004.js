[
  {
    "id": "d2-b04-2.2-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-007",
    "questionEN": "An automated HR assistant uses an MCP tool create_employee_record(full_name: string, date_of_birth: string, department: string) to register new hires. When submitting a record with date_of_birth=\"10/24/1992\", the backend endpoint returns HTTP 400 Bad Request with payload {\"error\": \"Invalid request parameters\"}. Because the response lacks field-level detail, the model repeatedly attempts context rewrites without fixing the date format. How should the tool response be redesigned to enable immediate self-correction?",
    "question": "[d2-b04-2.2-007] Một trợ lý HR tự động sử dụng MCP tool create_employee_record(full_name: string, date_of_birth: string, department: string) để đăng ký nhân viên mới. Khi gửi thông tin với date_of_birth=\"10/24/1992\", backend endpoint trả về HTTP 400 Bad Request với payload {\"error\": \"Invalid request parameters\"}. Do phản hồi thiếu chi tiết ở cấp độ trường thông tin, mô hình liên tục thử lại các điều chỉnh ngữ cảnh mà không sửa đúng định dạng ngày. Phản hồi của công cụ nên được thiết kế lại như thế nào để cho phép mô hình tự sửa lỗi ngay lập tức?",
    "optionsEN": [
      "A. Return HTTP 200 OK with an empty JSON object {} and log the validation error in server console logs.",
      "B. Add a retryable flag set to true in the HTTP header to instruct the agent to retry the exact same request up to 5 times.",
      "C. Structure the error payload as {\"error\": \"INVALID_INPUT\", \"field\": \"date_of_birth\", \"message\": \"Invalid date format; expected YYYY - MM - DD\"}.",
      "D. Wrap the input parameters in a base64 encoded string to prevent HTTP 400 parsing errors on date delimiters."
    ],
    "options": [
      "A. Trả về HTTP 200 OK với đối tượng JSON rỗng {} và ghi log lỗi xác thực vào server console logs.",
      "B. Thêm cờ retryable được đặt thành true trong HTTP header để chỉ thị cho agent thử lại chính xác yêu cầu ban đầu tối đa 5 lần.",
      "C. Cấu trúc payload lỗi dạng {\"error\": \"INVALID_INPUT\", \"field\": \"date_of_birth\", \"message\": \"Invalid date format; expected YYYY - MM - DD\"}.",
      "D. Gói các tham số đầu vào thành một chuỗi mã hóa base64 để ngăn lỗi phân tích cú pháp HTTP 400 trên ký tự phân cách ngày."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because returning HTTP 200 with an empty object masks errors as successful executions, preventing the model from recognizing that the record creation failed.",
      "Option B is incorrect because setting retryable to true causes the model to retry the exact same malformed date string repeatedly without fixing the formatting issue.",
      "Option C is correct because identifying the specific field date_of_birth along with the required format YYYY-MM-DD gives the model exact feedback needed to re-format the parameter and resubmit successfully.",
      "Option D is incorrect because base64 encoding parameter values obscures data structures without addressing schema validation requirements or giving field-level error feedback."
    ],
    "rationale": "When an LLM receives a generic HTTP 400 error, it cannot determine which parameter failed validation or how to format it correctly. Returning a structured validation error payload with error: INVALID_INPUT, the target field, and the required format specification (YYYY-MM-DD) enables the model to perform immediate parameter self-correction in its next iteration.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai: Trả về HTTP 200 với đối tượng rỗng sẽ che giấu lỗi, khiến mô hình nhầm tưởng là tạo hồ sơ thành công thay vì xử lý lỗi.\\n- Phương án B sai: Cờ retryable=true khiến mô hình thử lại chính xác chuỗi ngày sai định dạng ban đầu nhiều lần mà không sửa lỗi định dạng.\\n- Phương án C đúng: Trả về thông tin chi tiết chỉ rõ trường bị lỗi date_of_birth cùng định dạng mong muốn YYYY-MM-DD cung cấp phản hồi chính xác để mô hình định dạng lại tham số và gửi lại thành công ngay trong bước tiếp theo.\\n- Phương án D sai: Mã hóa base64 không giải quyết được yêu cầu xác thực schema và không cung cấp phản hồi lỗi ở cấp độ trường.",
    "scenarioSignature": {
      "testedPrinciple": "field-specific input validation error payload design",
      "failureMode": "agent repeatedly resubmits payload without correcting invalid parameter",
      "rootCause": "tool returns generic error status without indicating invalid field or expected format",
      "requiredFix": "include field identifier and expected format constraint in error response payload"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  },
  {
    "id": "d2-b04-2.2-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-008",
    "questionEN": "An automated log analysis agent calls an MCP tool fetch_server_telemetry(host_id: string) to inspect cluster metrics. During a brief network outage, the backend tool call fails and returns {\"error\": \"Connection reset by peer\"}. Lacking structural metadata about whether the failure is transient, the AI agent immediately halts workflow and escalates an urgent incident ticket to the on-call engineer. How should the tool error response be structured to prevent unnecessary human interruptions for transient errors?",
    "question": "[d2-b04-2.2-008] Một agent phân tích log tự động gọi MCP tool fetch_server_telemetry(host_id: string) để kiểm tra các chỉ số cụm máy chủ. Trong một đợt gián đoạn mạng ngắn, lệnh gọi tool thất bại và trả về {\"error\": \"Connection reset by peer\"}. Do thiếu metadata cấu trúc chỉ ra liệu sự cố có mang tính tạm thời hay không, agent lập tức dừng quy trình làm việc và leo thang (escalate) một vé sự cố khẩn cấp tới kỹ sư trực ban. Phản hồi lỗi của tool nên được cấu trúc như thế nào để ngăn chặn việc ngắt lời con người không cần thiết đối với các lỗi tạm thời?",
    "optionsEN": [
      "A. Return HTTP status 200 with an empty list {\"metrics\": []} so the agent assumes zero activity and continues execution.",
      "B. Classify all connection drops as permanent authorization failures with {\"error\": \"AUTH_FAILED\", \"retryable\": false} to force immediate agent termination.",
      "C. Append full backend stack traces to the error string so the agent can parse internal line numbers before escalating.",
      "D. Return a structured error object {\"error\": \"SERVICE_UNAVAILABLE\", \"retryable\": true, \"retry_after_seconds\": 30} to direct autonomous retries."
    ],
    "options": [
      "A. Trả về mã HTTP 200 với danh sách rỗng {\"metrics\": []} để agent giả định máy chủ không có hoạt động và tiếp tục thực thi.",
      "B. Phân loại tất cả các sự cố mất kết nối thành lỗi xác thực vĩnh viễn với {\"error\": \"AUTH_FAILED\", \"retryable\": false} để buộc agent chấm dứt ngay lập tức.",
      "C. Đính kèm toàn bộ stack trace của backend vào chuỗi lỗi để agent có thể phân tích cú pháp các dòng lệnh nội bộ trước khi leo thang.",
      "D. Trả về đối tượng lỗi có cấu trúc {\"error\": \"SERVICE_UNAVAILABLE\", \"retryable\": true, \"retry_after_seconds\": 30} để định hướng tự động thử lại."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because returning an empty metrics list masks the network failure as a valid empty response, leading to inaccurate telemetry analysis.",
      "Option B is incorrect because marking transient connection resets as non-retryable authorization errors forces permanent task failure and human escalation.",
      "Option C is incorrect because raw stack traces lack machine-readable control flow directives like retryability flags, leaving the model uncertain whether to retry.",
      "Option D is correct because explicitly defining retryable: true and supplying retry_after_seconds instructs the model to pause and attempt an autonomous retry, preventing false-alarm escalation to humans."
    ],
    "rationale": "When transient errors like network timeouts or temporary service unavailability occur, unstructured error messages leave the model unable to distinguish temporary glitches from permanent failures, causing it to escalate unnecessarily to human operators. Structuring the error response with retryable: true and a recommended retry_after_seconds backoff interval allows the model to handle transient failures autonomously via retries.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai: Trả về danh sách rỗng sẽ giả mạo sự cố mạng thành kết quả hợp lệ, khiến mô hình đưa ra kết luận phân tích sai lệch.\\n- Phương án B sai: Phân loại ngắt kết nối tạm thời thành lỗi xác thực không thể thử lại (retryable: false) sẽ hủy bỏ tác vụ vĩnh viễn và buộc phải can thiệp thủ công.\\n- Phương án C sai: Stack trace thô không chứa cờ chỉ thị luồng điều khiển mà máy tính đọc được, khiến mô hình không thể quyết định chính xác có nên thử lại hay không.\\n- Phương án D đúng: Cung cấp rõ ràng retryable: true và retry_after_seconds hướng dẫn mô hình tạm dừng và tự động thử lại, loại bỏ các thông báo báo động giả tới kỹ sư trực ban.",
    "scenarioSignature": {
      "testedPrinciple": "explicit retryability flag in structured error responses",
      "failureMode": "unnecessary human escalation on transient service error",
      "rootCause": "tool returns unstructured error without specifying retry capability or wait duration",
      "requiredFix": "include retryable flag and backoff duration in structured error payload"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  }
]