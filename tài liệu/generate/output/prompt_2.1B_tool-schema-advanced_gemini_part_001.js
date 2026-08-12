[
  {
    "id": "d2-b04-B-001",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-001",
    "scenarioSignature": {
      "testedPrinciple": "tool return schema explicit field documentation",
      "failureMode": "model field hallucination on tool output",
      "rootCause": "tool return schema omitted field property names",
      "requiredFix": "document return object properties in tool schema"
    },
    "questionEN": "An AI financial assistant calls an MCP tool get_customer(customer_id: string). The tool returns {\"id\": \"C102\", \"name\": \"Acme Corp\", \"status\": \"active\", \"account_balance\": 4500.00}. However, the tool schema does not define the output response fields. When asked to report the user's current funds, the model attempts to read customer.balance instead of customer.account_balance, resulting in a runtime evaluation failure. What tool schema update resolves this issue?",
    "question": "[d2-b04-B-001] Một trợ lý tài chính AI gọi công cụ MCP get_customer(customer_id: string). Công cụ trả về {\"id\": \"C102\", \"name\": \"Acme Corp\", \"status\": \"active\", \"account_balance\": 4500.00}. Tuy nhiên, schema của công cụ không định nghĩa các trường trong dữ liệu trả về. Khi được yêu cầu báo cáo số dư tài khoản hiện tại, mô hình cố gắng truy cập customer.balance thay vì customer.account_balance, dẫn đến lỗi truy cập trường dữ liệu không tồn tại. Cập nhật schema công cụ nào giải quyết triệt để vấn đề này?",
    "optionsEN": [
      "A. Add an explicit output return schema definition mapping exact object key names, including account_balance.",
      "B. Rename the backend database table column from account_balance to balance.",
      "C. Instruct the user to explicitly specify account_balance in their natural language prompt.",
      "D. Wrap the tool call in a client retry loop until the model guesses the field name correctly."
    ],
    "options": [
      "A. Thêm định nghĩa schema đầu ra (return schema) rõ ràng ánh xạ chính xác các tên khóa của đối tượng, bao gồm account_balance.",
      "B. Đổi tên cột trong bảng cơ sở dữ liệu backend từ account_balance thành balance.",
      "C. Hướng dẫn người dùng chỉ định rõ ràng account_balance trong câu lệnh tự nhiên của họ.",
      "D. Bọc lời gọi công cụ trong một vòng lặp thử lại phía client cho đến khi mô hình đoán đúng tên trường."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Documenting return schema fields explicitly in the tool definition informs the LLM of exact return key names (e.g., account_balance), preventing key name hallucinations.",
      "Option B is incorrect: Changing database columns alters backend storage without guaranteeing the model understands undocumented response structures.",
      "Option C is incorrect: Relying on end-user prompt instructions for API response schemas is fragile and fails when users use natural phrasing like 'current balance'.",
      "Option D is incorrect: Retrying without providing schema context will cause the model to repeatedly make the same key access error."
    ],
    "rationale": "Defining the return schema structure in the tool manifest gives the LLM explicit context on exact output payload keys, eliminating field hallucination.",
    "explanation": "Khi schema của công cụ MCP không mô tả cấu trúc dữ liệu trả về (return schema), mô hình ngôn ngữ lớn (LLM) phải tự suy đoán tên các trường dữ liệu. Điều này dẫn đến việc mô hình truy cập sai tên trường (ví dụ: customer.balance thay vì customer.account_balance).\n\n- Đáp án A đúng: Khai báo chi tiết return schema trong định nghĩa công cụ MCP giúp mô hình biết chính xác cấu trúc và tên các trường của dữ liệu trả về.\n- Đáp án B sai: Việc thay đổi schema của CSDL backend không giải quyết được vấn đề thiếu thông tin mô tả ở tầng MCP tool schema.\n- Đáp án C sai: Người dùng không nên và không thể biết trước tên biến internal API trong hệ thống để đưa vào prompt.\n- Đáp án D sai: Thử lại nhiều lần mà không cung cấp thông tin schema mới sẽ không thay đổi được suy luận của mô hình và gây tốn chi phí token.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-B-002",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-002",
    "scenarioSignature": {
      "testedPrinciple": "tool return schema error response structure documentation",
      "failureMode": "model type error on conditional response payload",
      "rootCause": "undocumented error payload shape in return schema",
      "requiredFix": "document error structure and union return types in schema"
    },
    "questionEN": "An MCP tool search_inventory(category: string) returns {\"items\": [...]} when products are found, but returns {\"error\": \"no_results\"} when no items match. Because the schema does not document possible return payload shapes or error structures, the model attempts to execute an array.map() operation on response.items when error is returned, causing a runtime crash. How should the tool design be improved?",
    "question": "[d2-b04-B-002] Một công cụ MCP search_inventory(category: string) trả về {\"items\": [...]} khi tìm thấy sản phẩm, nhưng lại trả về {\"error\": \"no_results\"} khi không có mặt hàng nào phù hợp. Vì schema không mô tả các dạng dữ liệu trả về hoặc cấu trúc báo lỗi, mô hình cố gắng thực thi thao tác duyệt response.items khi gặp kết quả error, gây ra lỗi crash hệ thống. Thiết kế công cụ nên được cải tiến như thế nào?",
    "optionsEN": [
      "A. Return an HTTP 500 server error stack trace whenever no inventory items are found.",
      "B. Document the output response structure and return an empty array {\"items\": []} for empty results instead of an ambiguous error payload.",
      "C. Modify the prompt to instruct the AI agent to ignore all execution errors from search_inventory.",
      "D. Force the client code to retry search_inventory with different search parameters automatically."
    ],
    "options": [
      "A. Trả về HTTP 500 kèm theo server error stack trace bất cứ khi nào không tìm thấy sản phẩm trong kho.",
      "B. Document cấu trúc đầu ra trong schema và trả về mảng rỗng {\"items\": []} cho kết quả rỗng thay vì một payload lỗi bất ngờ.",
      "C. Thay đổi prompt để hướng dẫn AI agent bỏ qua tất cả các lỗi thực thi từ search_inventory.",
      "D. Bắt buộc code phía client tự động gọi lại search_inventory với các tham số tìm kiếm khác."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Throwing HTTP 500 internal server errors for valid zero-result queries breaks standard REST practices and degrades system stability.",
      "Option B is correct: Standardizing the return payload to consistently output an empty array {\"items\": []} when no results match eliminates shape polymorphic runtime crashes and aligns with clean tool schema design.",
      "Option C is incorrect: Telling the model to ignore tool execution errors swallows legitimate failures without addressing structural data mismatch.",
      "Option D is incorrect: Automatically retrying with different criteria alters user intent and does not fix the underlying schema return shape problem."
    ],
    "rationale": "Consistent payload structures (e.g., empty arrays {\"items\": []}) and clearly documented return schemas prevent polymorphic type crashes during model tool parsing.",
    "explanation": "Khi một công cụ trả về các dạng dữ liệu không nhất quán (lúc là object chứa mảng items, lúc là object chứa chuỗi error), LLM dễ bị nhầm lẫn và áp dụng sai thao tác xử lý dữ liệu (như cố lặp qua một biến undefined).\n\n- Đáp án B đúng: Thiết kế công cụ chuẩn hóa sẽ luôn trả về đúng cấu trúc mong đợi (mảng items, có thể rỗng [] khi không tìm thấy kết quả) và mô tả đầy đủ cấu trúc đầu ra trong tool schema.\n- Đáp án A sai: Việc ném lỗi HTTP 500 khi query rỗng là thiết kế sai về mặt API REST, khiến hệ thống hoạt động không ổn định.\n- Đáp án C sai: Hướng dẫn AI bỏ qua lỗi không giúp nó hiểu được cách đọc cấu trúc dữ liệu trả về.\n- Đáp án D sai: Thử lại tự động với tham số khác không giải quyết bản chất của việc sai lệch cấu trúc dữ liệu trả về từ tool.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]