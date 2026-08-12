[
  {
    "id": "d2-b04-new-011",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-011",
    "questionEN": "An AI agent relies on an MCP tool get_user(id: string) with the description \"Returns user by ID\". When queried for a non-existent account usr_9999, the tool backend returns HTTP status 404 with body {\"error\": \"User not found\"} instead of an empty payload. Because the tool schema description does not specify error behavior for non-existent users, the agent interprets the HTTP error as a system breakdown and retries repeatedly until hitting timeout. How should the tool schema be updated to fix this issue?",
    "question": "[d2-b04-new-011] Một AI agent sử dụng MCP tool get_user(id: string) với mô tả \"Returns user by ID\". Khi được truy vấn cho một tài khoản không tồn tại usr_9999, backend của tool trả về mã HTTP 404 với body {\"error\": \"User not found\"} thay vì payload rỗng. Do mô tả schema của tool không chỉ rõ hành vi lỗi khi không tìm thấy người dùng, agent coi lỗi HTTP này là sự cố hệ thống và liên tục thử lại cho đến khi hết thời gian chờ (timeout). Schema của tool nên được cập nhật như thế nào để khắc phục vấn đề này?",
    "optionsEN": [
      "A. Change the parameter type of id from string to an integer schema constraint.",
      "B. Wrap the tool call in a retry wrapper with an exponential backoff policy of 5 seconds.",
      "C. Update the tool description to explicitly document that non-existent IDs return HTTP 404 error payloads rather than empty objects.",
      "D. Rename the tool to fetch_user_record_by_identifier without altering its return schema description."
    ],
    "options": [
      "A. Thay đổi kiểu tham số của id từ string sang ràng buộc schema integer.",
      "B. Bọc lệnh gọi tool trong một retry wrapper với chính sách lùi thời gian lũy thừa (exponential backoff) 5 giây.",
      "C. Cập nhật mô tả của tool để ghi rõ rằng các ID không tồn tại sẽ trả về payload lỗi HTTP 404 thay vì các đối tượng rỗng.",
      "D. Đổi tên tool thành fetch_user_record_by_identifier mà không thay đổi mô tả return schema của nó."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Changing id to an integer fails to resolve the missing-user behavior ambiguity and breaks valid string user IDs like usr_9999.",
      "Option B is incorrect: Adding a retry policy with exponential backoff causes repeated 404 failures and unnecessary latency because non-existent users will not appear on retries.",
      "Option C is correct: Explicitly documenting the HTTP 404 error payload for missing IDs in the schema description enables the agent to correctly recognize non-existent users without treating 404 responses as unexpected failures.",
      "Option D is incorrect: Renaming the tool changes its name but leaves the return schema and non-existent resource behavior completely undocumented."
    ],
    "rationale": "Documenting return schemas and error conditions (such as HTTP 404 vs empty object responses for missing resources) in the tool description ensures the model understands expected error payloads and handles missing data gracefully rather than misinterpreting errors.",
    "explanation": "Option A sai vì việc chuyển id sang kiểu integer không giải quyết được sự mơ hồ về hành vi khi không tìm thấy người dùng và sẽ làm hỏng các ID dạng chuỗi như usr_9999.\\nOption B sai vì chính sách retry với exponential backoff chỉ làm lặp lại lỗi 404 và gây ra độ trễ không cần thiết do người dùng không tồn tại sẽ không tự xuất hiện khi thử lại.\\nOption C đúng vì việc ghi rõ trong mô tả schema rằng ID không tồn tại trả về lỗi HTTP 404 sẽ giúp agent nhận biết chính xác trạng thái không tìm thấy dữ liệu thay vì coi đó là lỗi sự cố hệ thống.\\nOption D sai vì đổi tên tool chỉ thay đổi định danh mà vẫn để trống thông tin tài liệu về return schema và xử lý lỗi.",
    "scenarioSignature": {
      "testedPrinciple": "error handling documentation in tool return schema",
      "failureMode": "agent hallucination on missing user record",
      "rootCause": "tool description omits behavior for missing resources",
      "requiredFix": "document return schema for non-existent resource in tool description"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-new-012",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-012",
    "questionEN": "An enterprise billing assistant features an MCP tool delete_invoice(invoice_id: string) with the description \"Deletes an invoice record by ID\". The underlying API requires administrative privileges (admin scope). When a standard user asks to delete invoice inv_4021, the AI agent immediately invokes delete_invoice without verifying the user's role, resulting in an HTTP 403 Forbidden exception from the API endpoint. How should the tool schema be revised to prevent premature invocation by unauthorized users?",
    "question": "[d2-b04-new-012] Một trợ lý thanh toán doanh nghiệp có MCP tool delete_invoice(invoice_id: string) với mô tả \"Deletes an invoice record by ID\". API bên dưới yêu cầu quyền quản trị (scope admin). Khi một người dùng thông thường yêu cầu xóa hóa đơn inv_4021, AI agent lập tức gọi delete_invoice mà không kiểm tra vai trò của người dùng, dẫn đến ngoại lệ HTTP 403 Forbidden từ API endpoint. Schema của tool nên được sửa đổi như thế nào để ngăn việc gọi không hợp lệ bởi người dùng không có quyền?",
    "optionsEN": [
      "A. Convert invoice_id into an optional array of string identifiers.",
      "B. Increase the API rate limit on the delete_invoice backend service to bypass permission checks.",
      "C. Implement a client-side retry loop that suppresses HTTP 403 errors and logs them silently.",
      "D. Update the tool description to state that delete_invoice requires administrative scope (admin role) and must only be called after confirming user permissions."
    ],
    "options": [
      "A. Chuyển đổi invoice_id thành một mảng tùy chọn chứa các định danh kiểu chuỗi.",
      "B. Tăng giới hạn tốc độ API (rate limit) trên dịch vụ backend delete_invoice để bỏ qua việc kiểm tra quyền.",
      "C. Triển khai một vòng lặp thử lại phía client nhằm bỏ qua lỗi HTTP 403 và ghi log một cách âm thầm.",
      "D. Cập nhật mô tả tool để ghi rõ rằng delete_invoice yêu cầu scope quản trị (vai trò admin) và chỉ được gọi sau khi xác nhận quyền của người dùng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Converting invoice_id to an optional array changes input parameters but does not inform the model about administrative permission requirements.",
      "Option B is incorrect: Increasing API rate limits modifies capacity controls rather than access control, so unauthorized calls will still trigger HTTP 403 Forbidden errors.",
      "Option C is incorrect: Suppressing HTTP 403 errors in a retry loop hides security authorization failures instead of preventing invalid tool calls.",
      "Option D is correct: Explicitly stating administrative scope requirements in the tool description guides the model to verify user permissions before attempting restricted invoice deletion calls."
    ],
    "rationale": "Tool descriptions must clearly specify prerequisites, including required security scopes (e.g., admin role), so the model can reason about authorization constraints and avoid executing privileged operations for unauthorized users.",
    "explanation": "Option A sai vì việc chuyển invoice_id thành mảng chỉ thay đổi kiểu đầu vào chứ không cung cấp thông tin về yêu cầu quyền quản trị cho model.\\nOption B sai vì tăng rate limit chỉ thay đổi dung lượng xử lý chứ không thay đổi cơ chế kiểm soát truy cập, các cuộc gọi không có quyền vẫn sẽ thất bại với HTTP 403 Forbidden.\\nOption C sai vì bỏ qua lỗi HTTP 403 trong vòng lặp retry chỉ che giấu thất bại bảo mật thay vì ngăn chặn các cuộc gọi tool không hợp lệ ngay từ đầu.\\nOption D đúng vì việc ghi rõ yêu cầu scope quản trị trong mô tả tool giúp model hiểu được các ràng buộc về phân quyền và chủ động kiểm tra quyền người dùng trước khi thực hiện thao tác xóa hóa đơn.",
    "scenarioSignature": {
      "testedPrinciple": "security scope documentation in tool descriptions",
      "failureMode": "unauthorized tool execution attempt",
      "rootCause": "tool description omits required permission scope",
      "requiredFix": "specify administrative permission prerequisites in tool schema description"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]