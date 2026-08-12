[
  {
    "id": "d4-b09-B-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-005",
    "questionEN": "An Enterprise Resource Planning (ERP) pipeline uses an LLM to parse vendor invoices into JSON. The schema defines vendor_tax_id with \"type\": \"string\" without making it nullable. When an invoice lacks a tax ID, the LLM generates \"vendor_tax_id\": \"unknown\". Downstream validation accepts this string, recording \"unknown\" as a legitimate tax identifier in PostgreSQL database records. Which schema adjustment prevents this data corruption?",
    "question": "[d4-b09-B-005] Một đường ống ERP sử dụng LLM để trích xuất hóa đơn nhà cung cấp thành JSON. Schema định nghĩa vendor_tax_id với \"type\": \"string\" mà không cho phép nullable. Khi hóa đơn thiếu mã thuế, LLM tạo \"vendor_tax_id\": \"unknown\". Hệ thống kiểm tra phía sau chấp nhận chuỗi này, ghi nhận \"unknown\" như một mã số thuế hợp lệ trong cơ sở dữ liệu PostgreSQL. Điều chỉnh schema nào giải quyết triệt để sự cố ghi nhận dữ liệu sai này?",
    "optionsEN": [
      "A. Change vendor_tax_id definition to \"type\": [\"string\", \"null\"] and include it in the required array, instructing the model to output null when missing.",
      "B. Add a system prompt instruction explicitly stating \"Never output the word unknown for missing tax IDs.\"",
      "C. Set a default property \"default\": \"N/A\" in the JSON schema for vendor_tax_id.",
      "D. Remove vendor_tax_id from the required array and keep \"type\": \"string\" so the model omits the key entirely."
    ],
    "options": [
      "A. Thay đổi định nghĩa vendor_tax_id thành \"type\": [\"string\", \"null\"] và đưa nó vào mảng required, hướng dẫn model xuất null khi thiếu thông tin.",
      "B. Thêm hướng dẫn vào system prompt ghi rõ \"Không bao giờ xuất từ unknown cho mã số thuế còn thiếu\".",
      "C. Đặt thuộc tính mặc định \"default\": \"N/A\" trong JSON schema cho trường vendor_tax_id.",
      "D. Xóa vendor_tax_id khỏi mảng required và giữ \"type\": \"string\" để model bỏ qua hoàn toàn key này."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Defining \"type\": [\"string\", \"null\"] alongside mandatory presence in required explicitly forces the model to emit a native null JSON value when tax ID is absent, avoiding arbitrary string fallbacks like \"unknown\".",
      "Option B is incorrect: Negative system prompt instructions do not resolve the structural constraint of a strict string schema, often causing the model to substitute another string like \"none\" or \"N / A\".",
      "Option C is incorrect: The default keyword in JSON Schema is ignored by LLM API decoders during generation and does not solve non-nullable type restrictions.",
      "Option D is incorrect: Omitting the field from required makes key presence unpredictable and does not guarantee the model won't output \"unknown\" when it chooses to include the key."
    ],
    "rationale": "When a field is optional in reality but enforced as pure \"type\": \"string\" in JSON schema without null capability, models invent placeholder strings like \"unknown\" or \"N / A\" to satisfy the string type constraint. Making the field explicitly nullable ([\"string\", \"null\"]) and keeping it in required forces structural output of literal null.",
    "explanation": "Trong thiết kế JSON Schema cho mô hình ngôn ngữ, khi một trường dữ liệu có thể thiếu thực tế (như mã số thuế hóa đơn) nhưng lại được định nghĩa bắt buộc kiểu chuỗi \"type\": \"string\" mà không cho phép null, mô hình sẽ tự bị ép phải sinh ra một chuỗi văn bản như \"unknown\", \"N / A\" hoặc \"NONE\" để thỏa mãn kiểu dữ liệu. Điều này dẫn đến dữ liệu rác đi vào hệ thống phía sau.\\n\\n- Đáp án A đúng: Việc đổi thành \"type\": [\"string\", \"null\"] kết hợp đưa trường vào mảng required buộc mô hình phải trả về giá trị null chuẩn trong JSON khi không tìm thấy thông tin, loại bỏ hoàn toàn việc tạo chuỗi giả định.\\n- Đáp án B sai: Việc cấm từ \"unknown\" bằng câu nhắc không thay đổi được hạn chế cấu trúc của schema; mô hình chỉ chuyển sang dùng chuỗi khác như \"not available\".\\n- Đáp án C sai: Từ khóa default trong JSON Schema không được hỗ trợ để tự động điền bởi trình tạo structured output của LLM.\\n- Đáp án D sai: Việc bỏ khỏi required khiến sự hiện diện của key không ổn định và không ngăn được mô hình sinh ra chuỗi \"unknown\" nếu nó chọn xuất trường đó.",
    "scenarioSignature": {
      "testedPrinciple": "non-nullable optional field schema forces string fallback outputs",
      "failureMode": "model outputs sentinel string like unknown instead of null signal",
      "rootCause": "schema defines string type without null option for optional data",
      "requiredFix": "define type as array with string and null in schema"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-006",
    "scenarioSignature": {
      "testedPrinciple": "multi-field nullable schema consistency across personal attributes",
      "failureMode": "model fails or omits fields when multiple nullable attributes are present",
      "rootCause": "inconsistent schema definitions across optional personal metadata fields",
      "requiredFix": "mark all optional metadata fields as explicitly nullable and required"
    },
    "questionEN": "An identity verification service parses unstructured ID records to extract three optional fields: middle_name, suffix, and title. In the initial JSON schema, middle_name was set to \"type\": [\"string\", \"null\"] and included in required, but suffix and title were omitted from required and typed only as \"string\". The pipeline experiences inconsistent extractions where middle_name outputs null correctly, while suffix and title trigger validation drops or hallucinates honorifics. What pattern guarantees reliable handling across all three fields?",
    "question": "[d4-b09-B-006] Một dịch vụ xác minh danh tính phân tích hồ sơ cá nhân để trích xuất 3 trường tùy chọn: middle_name, suffix, và title. Trong JSON schema ban đầu, middle_name được thiết lập \"type\": [\"string\", \"null\"] và thuộc mảng required, nhưng suffix và title bị bỏ khỏi required và chỉ có kiểu \"string\". Hệ thống gặp hiện tượng trích xuất bất ổn: middle_name trả về null chính xác, trong khi suffix và title gây ra lỗi validation hoặc tự bịa danh xưng. Mô hình thiết kế nào bảo đảm xử lý nhất quán cho cả 3 trường?",
    "optionsEN": [
      "A. Group middle_name, suffix, and title into a single combined string field full_name_decorations with \"type\": \"string\".",
      "B. Apply \"type\": [\"string\", \"null\"] uniformly to middle_name, suffix, and title, and add all three fields to the schema's required array.",
      "C. Set additionalProperties: true at the root schema to allow the model to drop missing fields dynamically.",
      "D. Use oneOf schema blocks separating person objects with titles from person objects without titles."
    ],
    "options": [
      "A. Gom middle_name, suffix, và title thành một trường chuỗi kết hợp full_name_decorations với kiểu \"type\": \"string\".",
      "B. Áp dụng đồng nhất \"type\": [\"string\", \"null\"] cho cả middle_name, suffix, và title, đồng thời đưa cả ba trường vào mảng required của schema.",
      "C. Đặt additionalProperties: true ở root schema để cho phép mô hình tự động bỏ bớt các trường bị thiếu.",
      "D. Sử dụng các khối schema oneOf phân chia riêng giữa đối tượng có danh xưng và đối tượng không có danh xưng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Concatenating distinct attribute fields into a single string degrades structured data extraction quality and downstream search capability.",
      "Option B is correct: Applying the nullable pattern (\"type\": [\"string\", \"null\"]) uniformly across all three fields and requiring their presence in the required array guarantees structural clarity, forcing deterministic null emission when attributes are absent.",
      "Option C is incorrect: Allowing additionalProperties: true increases schema ambiguity and permits hallucinated key names rather than enforcing explicit missing data signals.",
      "Option D is incorrect: Using combinatorial oneOf branches for multiple independent optional fields creates exponential schema branching (2^3 = 8 combinations), making schema compilation inefficient and error-prone."
    ],
    "rationale": "When extracting multiple optional attributes simultaneously (such as name metadata), applying an asymmetrical schema pattern causes mixed failure modes. The robust engineering solution requires applying \"type\": [\"string\", \"null\"] consistently to all optional fields and enforcing their inclusion in the required list.",
    "explanation": "Khi trích xuất đồng thời nhiều trường dữ liệu tùy chọn (như tên lót, hậu tố, danh xưng), việc áp dụng schema không đồng nhất giữa các trường sẽ gây ra lỗi bất định. Trường được khai báo nullable chuẩn sẽ hoạt động đúng, trong khi các trường không nullable còn lại sẽ bị mô hình tự điền chuỗi giả hoặc bỏ qua không kiểm soát.\n\n- Đáp án B đúng: Thiết kế chuẩn hóa bằng cách áp dụng kiểu [\"string\", \"null\"] đồng bộ cho cả 3 trường và yêu cầu xuất hiện trong mảng required buộc LLM phải kiểm tra và phát tín hiệu null rõ ràng cho từng trường khi thiếu thông tin.\n- Đáp án A sai: Gộp các thuộc tính riêng biệt thành một chuỗi duy nhất làm mất tính cấu trúc của dữ liệu trích xuất.\n- Đáp án C sai: Cho phép additionalProperties: true làm tăng nguy cơ mô hình tự bịa thêm các key không nằm trong định nghĩa.\n- Đáp án D sai: Dùng oneOf cho 3 trường độc lập sẽ tạo ra 2^3 = 8 tổ hợp schema phức tạp không cần thiết, làm giảm độ chính xác tuân thủ của mô hình.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]