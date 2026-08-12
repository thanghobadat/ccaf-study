[
  {
    "id": "d2-b04-new-001",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-001",
    "scenarioSignature": {
      "testedPrinciple": "ambiguous tool descriptions cause misrouted tool calls",
      "failureMode": "write tool executed instead of read tool",
      "rootCause": "vague description shared across tools with distinct side effects",
      "requiredFix": "differentiate tool descriptions with explicit action intents and side effects"
    },
    "questionEN": "In a Zendesk IT Desk integration, an automated support agent frequently invokes create_ticket(summary: string, priority: string) instead of get_ticket(ticket_id: string) when users ask to 'Check the status of INC-9042', causing duplicate ticket creation and high HTTP 201 response spikes. Inspecting the JSON schema reveals both tools share the description \"description\": \"handles tickets\". Which schema modification best resolves this misrouting failure?",
    "question": "[d2-b04-new-001] Trong tích hợp Zendesk IT Desk, AI agent hỗ trợ kỹ thuật thường xuyên gọi nhầm công cụ create_ticket(summary: string, priority: string) thay vì get_ticket(ticket_id: string) khi người dùng yêu cầu 'Kiểm tra trạng thái của INC-9042', dẫn đến việc tạo nhiều vé trùng lặp và tăng đột biến phản hồi HTTP 201. Kiểm tra JSON schema cho thấy cả hai công cụ đều dùng chung mô tả \"description\": \"handles tickets\". Thay đổi schema nào giải quyết tốt nhất sự cố gọi nhầm công cụ này?",
    "optionsEN": [
      "A. Update the description field in each tool's JSON schema to state its specific action, side-effects, and usage intent: define get_ticket as a read-only fetch tool and create_ticket as a write action for creating new tickets.",
      "B. Add a regex pattern parameter constraint to create_ticket requiring ticket_id to prevent the model from calling it during read operations.",
      "C. Consolidate get_ticket and create_ticket into a single monolithic tool manage_tickets(action: string) while retaining the description \"handles tickets\".",
      "D. Add system prompt instructions telling the model to execute create_ticket twice before retrying get_ticket upon encountering ticket queries."
    ],
    "options": [
      "A. Cập nhật trường description trong JSON schema của từng công cụ để nêu rõ hành động cụ thể, hiệu ứng phụ (side-effects) và mục đích sử dụng: khai báo get_ticket là công cụ chỉ đọc lấy dữ liệu vé và create_ticket là thao tác ghi để tạo vé mới.",
      "B. Thêm ràng buộc mẫu regex vào tham số của create_ticket yêu cầu ticket_id để ngăn model gọi công cụ này trong các thao tác đọc.",
      "C. Gộp get_ticket và create_ticket thành một công cụ đơn khối manage_tickets(action: string) nhưng giữ nguyên mô tả \"handles tickets\".",
      "D. Thêm hướng dẫn vào system prompt yêu cầu model luôn gọi create_ticket hai lần trước khi thử lại get_ticket khi gặp các truy vấn về vé."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because establishing clear functional boundaries, side-effect notes, and read vs write intent in the JSON schema descriptions enables the model to accurately select get_ticket for status checks.",
      "Option B is incorrect because create_ticket creates new tickets and does not accept ticket_id; adding parameter constraints to the wrong tool does not clarify tool selection intent.",
      "Option C is incorrect because wrapping both operations inside a monolithic tool while keeping the vague description retains ambiguity and risks executing unwanted write actions.",
      "Option D is incorrect because instructing the model to attempt writes before reads worsens duplicate ticket creation and ignores schema-level description fixes."
    ],
    "rationale": "Updating tool descriptions to explicitly delineate read vs. write actions and side-effects provides the LLM with unambiguous semantics, ensuring it selects get_ticket for read queries instead of trigger-happy write tools.",
    "explanation": "Lựa chọn A đúng vì việc cập nhật description trong JSON schema giải thích rõ ràng mục đích (read-only vs write) và hiệu ứng phụ (side-effects) giúp LLM phân biệt chính xác khi nào cần truy vấn dữ liệu (get_ticket) và khi nào cần tạo dữ liệu mới (create_ticket). Lựa chọn B sai vì việc thêm tham số không liên quan vào create_ticket không giúp LLM phân biệt intent gọi công cụ. Lựa chọn C sai vì gộp thành công cụ monolithic với mô tả mơ hồ không giải quyết được gốc rễ vấn đề định hướng LLM. Lựa chọn D sai vì việc tự động gọi công cụ ghi trước khi đọc làm trầm trọng thêm việc tạo vé trùng lặp.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-new-002",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-002",
    "scenarioSignature": {
      "testedPrinciple": "enum constraints restrict model input to strict permissible values",
      "failureMode": "backend API rejection due to invalid string formatting",
      "rootCause": "missing enum constraint in parameter JSON schema",
      "requiredFix": "add enum constraint defining exact valid string literals"
    },
    "questionEN": "In a Shopify Order Management MCP tool integration, the update_order(order_id: string, status: string) tool fails with HTTP 422 Unprocessable Entity because the automated agent passes status=\"Pending\". The backend API strictly requires lowercase values (\"pending\", \"shipped\", \"delivered\"). The current JSON schema defines status as {\"type\": \"string\", \"description\": \"The order status\"}. Which schema enhancement prevents the model from generating invalid status string formats?",
    "question": "[d2-b04-new-002] Trong tích hợp công cụ Shopify Order Management MCP, công cụ update_order(order_id: string, status: string) thất bại với lỗi HTTP 422 Unprocessable Entity do agent tự động truyền status=\"Pending\". Backend API bắt buộc các giá trị chữ thường (\"pending\", \"shipped\", \"delivered\"). JSON schema hiện tại định nghĩa status là {\"type\": \"string\", \"description\": \"The order status\"}. Cải tiến schema nào ngăn model tạo ra các định dạng chuỗi status không hợp lệ?",
    "optionsEN": [
      "A. Change the parameter type of status from string to integer with minimum: 1 and maximum: 3.",
      "B. Add an enum constraint [\"pending\", \"shipped\", \"delivered\"] to the status parameter definition in the tool's JSON schema.",
      "C. Update the description field of update_order to state that status accepts any string casing and convert casing in backend logic.",
      "D. Add a regex pattern ^[A-Z][a-z]+$ to the status parameter schema to enforce TitleCase status values."
    ],
    "options": [
      "A. Thay đổi kiểu tham số của status từ string sang integer với minimum: 1 và maximum: 3.",
      "B. Thêm ràng buộc enum với danh sách [\"pending\", \"shipped\", \"delivered\"] vào định nghĩa tham số status trong JSON schema của công cụ.",
      "C. Cập nhật trường description của update_order để ghi nhận status chấp nhận mọi kiểu chữ và xử lý chuyển đổi chữ hoa/thường ở backend logic.",
      "D. Thêm mẫu regex ^[A-Z][a-z]+$ vào schema của tham số status để bắt buộc định dạng chữ hoa đầu từ (TitleCase)."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because converting the parameter to integer breaks the string API contract expected by the Shopify backend.",
      "Option B is correct because defining an enum constraint in the parameter schema restricts LLM generation to exact string literals (\"pending\", \"shipped\", \"delivered\"), eliminating invalid casing like \"Pending\".",
      "Option C is incorrect because updating the description without schema-level value enforcement fails to restrict model output tokens, and changing backend contracts is outside tool schema validation.",
      "Option D is incorrect because enforcing TitleCase with regex explicitly forces invalid strings like \"Pending\" that violate the backend API requirements."
    ],
    "rationale": "Adding an enum constraint directly into the tool parameter's JSON schema forces the model to choose strictly from allowed string literals, eliminating hallucinated or misformatted string variations like 'Pending'.",
    "explanation": "Lựa chọn B đúng vì việc bổ sung ràng buộc enum [\"pending\", \"shipped\", \"delivered\"] trực tiếp vào JSON schema của tham số sẽ giới hạn không gian sinh của LLM vào đúng các giá trị chuỗi hợp lệ mà backend API yêu cầu, ngăn chặn hoàn toàn việc sinh chữ hoa đầu từ như \"Pending\". Lựa chọn A sai vì thay đổi kiểu dữ liệu thành integer vi phạm hợp đồng API chuỗi. Lựa chọn C sai vì chỉ mô tả trong description mà không có ràng buộc schema cứng vẫn khiến LLM tạo giá trị sai. Lựa chọn D sai vì mẫu regex TitleCase ép buộc định dạng sai mà backend từ chối.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]