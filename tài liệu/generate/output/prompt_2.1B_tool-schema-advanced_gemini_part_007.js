[
  {
    "id": "d2-b04-B-013",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-013",
    "scenarioSignature": {
      "testedPrinciple": "rate limit constraints documentation in tool schema",
      "failureMode": "tool execution fails with HTTP 429 Too Many Requests errors",
      "rootCause": "tool description omits concurrency limits and request rate bounds",
      "requiredFix": "document rate limit constraints and batch execution guidelines in tool description"
    },
    "questionEN": "An automated bulk data-enrichment pipeline uses an MCP tool fetch_company_metrics(ticker: string). The external financial API enforces a strict rate limit of 10 requests per minute, but this constraint is omitted from the tool schema description. During a batch audit, an AI agent issues 40 concurrent tool calls in parallel for 40 ticker symbols, triggering HTTP 429 Too Many Requests errors and terminating the workflow. How should the tool schema be updated to prevent this rate limit failure?",
    "question": "[d2-b04-B-013] Một đường ống làm giàu dữ liệu hàng loạt tự động sử dụng công cụ MCP fetch_company_metrics(ticker: string). API tài chính bên ngoài áp dụng giới hạn tốc độ nghiêm ngặt 10 yêu cầu/phút, nhưng ràng buộc này bị bỏ qua trong mô tả schema của công cụ. Trong một đợt kiểm tra hàng loạt, agent AI phát ra 40 lệnh gọi công cụ song song cho 40 mã cổ phiếu, dẫn đến lỗi HTTP 429 Too Many Requests và làm thất bại toàn bộ quy trình. Cần cập nhật schema công cụ như thế nào để ngăn ngừa lỗi giới hạn tốc độ này?",
    "optionsEN": [
      "A. Add rate limit constraints (10 requests/minute) and batch execution guidelines directly into the tool description so the model plans sequential or throttled calls.",
      "B. Modify the parameter ticker from a single string to an enum containing all allowable stock ticker symbols.",
      "C. Increase the client timeout parameter in the tool definition from 30 seconds to 300 seconds to buffer backpressure.",
      "D. Change the return schema from a JSON object to a raw string containing formatted CSV metrics."
    ],
    "options": [
      "A. Thêm các ràng buộc giới hạn tốc độ (10 yêu cầu/phút) và hướng dẫn thực thi theo lô trực tiếp vào mô tả công cụ để mô hình lập kế hoạch gọi tuần tự hoặc điều tiết.",
      "B. Sửa đổi tham số ticker từ một string đơn lẻ thành một enum chứa tất cả các mã cổ phiếu hợp lệ.",
      "C. Tăng tham số thời gian chờ client trong định nghĩa công cụ từ 30 giây lên 300 giây để đệm áp lực ngược.",
      "D. Thay đổi schema trả về từ một đối tượng JSON thành một chuỗi thô chứa các chỉ số dạng CSV."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Documenting rate limits (10 calls/min) in the tool description informs the model of execution constraints, prompting it to process tickers sequentially or insert delay intervals rather than issuing 40 parallel calls.",
      "Option B (Incorrect): Restricting ticker symbols to an enum list validates ticker validity but does not address execution frequency or parallel HTTP 429 rate limit breaches.",
      "Option C (Incorrect): Increasing the socket timeout buffers slow HTTP responses but does not prevent rate limiter rejection when 40 requests hit the API simultaneously within one minute.",
      "Option D (Incorrect): Altering the return schema format from JSON to CSV does not lower call concurrency or change how many requests the model dispatches to the rate-limited endpoint."
    ],
    "rationale": "Documenting rate limits and concurrency expectations in the tool description gives the LLM the required context to throttle or sequence tool invocations, avoiding rate limit errors (HTTP 429).",
    "explanation": "Đáp án đúng là A. Khi công cụ tương tác với API có giới hạn tốc độ (rate limit), mô hình LLM cần biết ranh giới này trong phần mô tả công cụ (tool description) để tự điều tiết việc phát lệnh gọi (ví dụ: gọi tuần tự hoặc chia nhỏ đợt). Bỏ qua thông tin này khiến mô hình phát 40 cuộc gọi song song gây lỗi HTTP 429.\n\n- B sai vì enum chỉ giới hạn giá trị tham số đầu vào chứ không hạn chế tần suất gọi API.\n- C sai vì tăng thời gian chờ (timeout) không giải quyết được việc API chặn ngay lập tức do vượt quá 10 req/phút.\n- D sai vì định dạng trả về CSV không làm giảm số lượng yêu cầu gửi tới server.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-B-014",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-014",
    "scenarioSignature": {
      "testedPrinciple": "output field emphasis in tool return schema documentation",
      "failureMode": "agent ignores essential standardized output fields returned by tool",
      "rootCause": "tool description fails to highlight key return fields intended for downstream consumption",
      "requiredFix": "update tool description to explicitly highlight corrected address output fields"
    },
    "questionEN": "An e-commerce fulfillment AI assistant calls an MCP tool validate_address(address: object) which returns {valid: boolean, corrected_address: object}. Although both fields exist in the return schema, the model continuously re-uses the original user-provided unstandardized address for shipping labels because the tool description does not highlight corrected_address as the primary payload field to consume when valid is true. How should the tool schema description be revised to resolve this issue?",
    "question": "[d2-b04-B-014] Một trợ lý AI xử lý đơn hàng thương mại điện tử gọi công cụ MCP validate_address(address: object) trả về {valid: boolean, corrected_address: object}. Mặc dù cả hai trường đều tồn tại trong schema trả về, mô hình liên tục tái sử dụng địa chỉ thô chưa chuẩn hóa do người dùng cung cấp để tạo nhãn vận chuyển vì mô tả công cụ không nhấn mạnh corrected_address là trường đầu ra quan trọng cần ưu tiên sử dụng khi valid bằng true. Cần chỉnh sửa mô tả schema công cụ như thế nào để khắc phục vấn đề này?",
    "optionsEN": [
      "A. Remove the valid boolean field from the return schema and force the tool to raise an HTTP 400 error whenever an address requires correction.",
      "B. Update the tool description to explicitly clarify that corrected_address contains the standardized delivery payload and must be used for downstream shipment creation.",
      "C. Convert address in the input schema from an object to a single raw formatted text string.",
      "D. Mark all fields inside corrected_address as required in the input parameter JSON schema definition."
    ],
    "options": [
      "A. Xóa trường boolean valid khỏi schema trả về và bắt buộc công cụ bắn lỗi HTTP 400 bất cứ khi nào địa chỉ cần sửa đổi.",
      "B. Cập nhật mô tả công cụ để làm rõ ràng rằng corrected_address chứa dữ liệu giao hàng đã chuẩn hóa và phải được dùng cho bước tạo đơn vận chuyển tiếp theo.",
      "C. Chuyển đổi tham số đầu vào address từ một đối tượng object thành một chuỗi văn bản thô string.",
      "D. Đánh dấu tất cả các trường bên trong corrected_address là bắt buộc (required) trong định nghĩa JSON schema của tham số đầu vào."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A (Incorrect): Raising errors for correctable addresses breaks normal workflow validation and treats standard address formatting as a system failure.",
      "Option B (Correct): Explicitly documenting in the tool description that corrected_address is the primary output field ensures the LLM recognizes its downstream role and passes the standardized payload to shipping APIs.",
      "Option C (Incorrect): Changing the input parameter schema structure does not affect how the model interprets or extracts return fields from the tool output.",
      "Option D (Incorrect): Applying required constraints to input schema definitions does not instruct the model on how to select or prioritize output fields returned by the tool execution."
    ],
    "rationale": "Highlighting key output fields in the tool description directs the LLM to extract and rely on normalized return attributes (corrected_address) for subsequent steps.",
    "explanation": "Đáp án đúng là B. Mô hình ngôn ngữ lớn (LLM) không chỉ cần schema cấu trúc mà còn cần sự hướng dẫn trong phần mô tả công cụ để hiểu ý nghĩa nghiệp vụ của các trường trả về. Nếu mô tả không làm rõ corrected_address là dữ liệu đầu ra chuẩn hóa cần sử dụng, mô hình có thể vô tình bỏ qua nó và dùng địa chỉ ban đầu.\n\n- A sai vì địa chỉ cần điều chỉnh là trạng thái xử lý bình thường, bắn lỗi HTTP 400 sẽ phá hỏng luồng vận hành.\n- C sai vì thay đổi cấu trúc tham số đầu vào không giúp mô hình đọc đúng trường trả về.\n- D sai vì cấu hình schema đầu vào không thể điều khiển cách mô hình ưu tiên các trường trong kết quả đầu ra (return schema).",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]