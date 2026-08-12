[
  {
    "id": "d2-b04-new-005",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-005",
    "questionEN": "An inventory search agent uses the tool search_products(query: string, limit: string) to retrieve items from a warehouse database. When a user asks to 'find the top 10 items under $50', the LLM generates the arguments {\"query\": \"under 50\", \"limit\": \"10\"}. The backend service fails with a 400 Bad Request error stating TypeError: limit must be an integer, got string. What schema modification will prevent this error?",
    "question": "[d2-b04-new-005] Một agent tìm kiếm kho hàng sử dụng tool search_products(query: string, limit: string) để truy vấn vật tư từ cơ sở dữ liệu kho. Khi người dùng yêu cầu 'tìm 10 sản phẩm hàng đầu dưới $50', LLM tạo ra các đối số {\"query\": \"under 50\", \"limit\": \"10\"}. Dịch vụ backend thất bại với lỗi 400 Bad Request báo rằng TypeError: limit must be an integer, got string. Thay đổi schema nào sẽ ngăn chặn lỗi này?",
    "optionsEN": [
      "A. Change the JSON schema definition of limit from \"type\": \"string\" to \"type\": \"integer\" and specify a description indicating a numerical count.",
      "B. Add a regex pattern constraint ^[0-9]+$ to the limit parameter schema while keeping its type as \"type\": \"string\".",
      "C. Add a system prompt directive instructing the model to parse string parameters into numbers before emitting tool calls.",
      "D. Wrap the search_products function call in a client-side try-catch block to fallback to an integer limit of 10 upon failure."
    ],
    "options": [
      "A. Thay đổi định nghĩa JSON schema của limit từ \"type\": \"string\" thành \"type\": \"integer\" và bổ sung mô tả chỉ rõ giá trị số nguyên.",
      "B. Thêm ràng buộc regex pattern ^[0-9]+$ vào schema của tham số limit trong khi giữ nguyên loại dữ liệu là \"type\": \"string\".",
      "C. Thêm chỉ thị trong system prompt yêu cầu mô hình tự chuyển đổi tham số chuỗi thành số trước khi phát ra lệnh gọi tool.",
      "D. Bao bọc lời gọi hàm search_products trong một khối try-catch ở phía client để tự động dùng giá trị mặc định 10 khi gặp lỗi."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Modifying the JSON schema parameter type from string to integer forces the LLM to output a numeric JSON literal (limit: 10) instead of a string (\"10\"), directly satisfying the backend API's type requirements.",
      "Option B is incorrect: Adding a regex pattern to a string type constraint forces the string contents to be digits but still causes the LLM to output a JSON string (\"10\"), which fails backend integer type validation.",
      "Option C is incorrect: System prompt instructions are non-binding and non-deterministic, whereas the JSON schema directly governs the structured JSON generation of parameter values.",
      "Option D is incorrect: Catching runtime type errors on the client side masks the schema flaw rather than fixing the LLM's structured tool call generation at the schema source."
    ],
    "rationale": "LLMs generate tool call parameters adhering to the types defined in the JSON schema. Defining integer parameters as strings causes the LLM to output quoted strings, breaking backend typed APIs. Setting 'type': 'integer' guarantees numeric formatting in the tool call payload.",
    "explanation": "Đáp án đúng là A. Khi tham số limit được định nghĩa là \"type\": \"string\" trong JSON schema, LLM sẽ phát ra chuỗi ký tự được bọc trong dấu ngoặc kép \"10\". Việc thay đổi schema thành \"type\": \"integer\" giúp LLM sinh ra đúng định dạng số nguyên 10 trong payload JSON, giải quyết dứt điểm lỗi 400 Bad Request từ backend API.\\n\\n- Option B sai vì regex pattern chỉ kiểm tra định dạng của chuỗi, LLM vẫn sẽ sinh ra dạng string \"10\" làm backend báo lỗi type mismatch.\\n- Option C sai vì hướng dẫn trong system prompt không đảm bảo tính nhất quán bằng việc siết chặt type trong JSON schema chính thức của tool.\\n- Option D sai vì đây là giải pháp chữa cháy ở client SDK, không sửa tận gốc định nghĩa schema khiến LLM liên tục sinh sai dữ liệu.",
    "scenarioSignature": {
      "testedPrinciple": "strict parameter data typing in tool JSON schema",
      "failureMode": "backend API type error during payload processing",
      "rootCause": "parameter defined as string instead of integer in schema",
      "requiredFix": "update parameter schema type to integer with numeric constraints"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-new-006",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-006",
    "scenarioSignature": {
      "testedPrinciple": "unambiguous tool naming and description disambiguation",
      "failureMode": "model selects low-priority tool during high-severity incident",
      "rootCause": "overlapping tool names lacking operational semantic descriptions",
      "requiredFix": "add detailed tool descriptions clarifying trigger conditions and priorities"
    },
    "questionEN": "An automated DevOps incident monitoring agent has access to two tools with no description strings: send_notification(channel: string, message: string) and send_alert(target: string, message: string). During a critical database outage (P1 incident), the agent calls send_notification (which posts an asynchronous daily Slack summary) instead of send_alert (which triggers PagerDuty to wake up on-call engineers). Why did the model choose the wrong tool, and how should the schema be improved?",
    "question": "[d2-b04-new-006] Một agent giám sát sự cố DevOps tự động có quyền truy cập vào hai tool không có chuỗi mô tả (description): send_notification(channel: string, message: string) và send_alert(target: string, message: string). Trong một sự cố ngừng hoạt động cơ sở dữ liệu nghiêm trọng (sự cố P1), agent gọi send_notification (gửi tóm tắt Slack hàng ngày) thay vì send_alert (kích hoạt PagerDuty để đánh thức kỹ sư trực). Tại sao mô hình chọn sai tool và nên cải thiện schema như thế nào?",
    "optionsEN": [
      "A. The tool names are too short; rename send_notification to send_slack_message_to_channel_v1 and send_alert to send_pagerduty_alert_to_target_v2.",
      "B. The tools lack description fields to convey intent; add detailed description strings specifying that send_alert triggers urgent PagerDuty paging for P1 incidents while send_notification sends non-urgent Slack messages.",
      "C. The model requires additional few-shot examples in the system prompt for every possible severity code and infrastructure target combination.",
      "D. Combine both tools into a single monolithic manage_communications(action: string) tool without adding parameter descriptions."
    ],
    "options": [
      "A. Tên tool quá ngắn; đổi tên send_notification thành send_slack_message_to_channel_v1 và send_alert thành send_pagerduty_alert_to_target_v2.",
      "B. Các tool thiếu trường description để truyền tải mục đích; bổ sung chuỗi mô tả chi tiết nêu rõ send_alert dùng để báo động khẩn cấp PagerDuty cho sự cố P1 còn send_notification dùng cho tin nhắn Slack không khẩn cấp.",
      "C. Mô hình yêu cầu bổ sung các ví dụ few-shot trong system prompt cho mọi kết hợp giữa mã mức độ nghiêm trọng và mục tiêu hạ tầng.",
      "D. Gộp cả hai tool thành một tool duy nhất manage_communications(action: string) mà không bổ sung mô tả tham số."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Renaming tools with version suffixes does not provide the semantic intent or trigger conditions needed for the model to distinguish urgency levels.",
      "Option B is correct: Adding detailed descriptions to the JSON schema explicitly informs the model about the purpose, target system (PagerDuty vs Slack), and urgency requirements of each tool.",
      "Option C is incorrect: Relying on exhaustive few-shot examples in the prompt is unmaintainable and fails to fix the underlying ambiguity of the tool declarations in the schema.",
      "Option D is incorrect: Merging distinct actions into a single monolithic tool without clear descriptions increases ambiguity and leads to incorrect parameter choices."
    ],
    "rationale": "When tool names overlap in meaning ('notification' vs 'alert') and lack description fields, LLMs cannot infer the operational context or target downstream systems. Providing explicit, detailed descriptions detailing WHEN to use each tool and WHAT service it interacts with eliminates ambiguity.",
    "explanation": "Đáp án đúng là B. Khi hai tool có tên gọi tương tự nhau (send_notification và send_alert) và thiếu trường description, LLM không thể suy luận được mức độ ưu tiên hoặc hệ thống đích (PagerDuty vs Slack) của từng tool. Thêm mô tả chi tiết vào JSON schema chỉ rõ ngữ cảnh sử dụng (sự cố khẩn cấp P1 qua PagerDuty vs thông báo không khẩn cấp qua Slack) là cách chuẩn nhất để hướng dẫn mô hình đưa ra quyết định chính xác.\n\n- Option A sai vì đổi tên tool dài hơn kèm phiên bản v1/v2 không cung cấp được ngữ cảnh ngữ nghĩa về mức độ khẩn cấp cho LLM.\n- Option C sai vì việc viết few-shot cho mọi loại sự cố là không thực tế và không giải quyết tận gốc sự mơ hồ trong schema của tool.\n- Option D sai vì việc gom thành tool đơn khối không có mô tả càng làm tăng sự mơ hồ và dễ dẫn đến sai sót khi truyền tham số.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]