[
  {
    "id": "d4-b09-new-019",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-019",
    "questionEN": "In a medical trial report parsing pipeline (MedTrial Extract), clinical notes are converted to JSON according to a defined JSON Schema. The adverse_event_date field is defined as \"type\": \"string\" and listed in required. When a patient record notes no adverse events, the LLM consistently hallucinates an arbitrary date (such as '2024-03-15') instead of leaving it empty, triggering false alarms in downstream safety monitoring. How should the JSON Schema be modified to prevent date fabrication while maintaining structured output compliance?",
    "question": "[d4-b09-new-019] Trong một đường ống trích xuất báo cáo thử nghiệm lâm sàng (MedTrial Extract), hệ thống chuyển đổi ghi chú y khoa thành JSON theo JSON Schema. Trường adverse_event_date được định nghĩa là \"type\": \"string\" và nằm trong mảng required. Khi bệnh nhân không gặp biến cố bất lợi, mô hình liên tục bịa ra các ngày giả định (như '2024-03-15') thay vì để trống, gây ra cảnh báo sai trong hệ thống giám sát an toàn. Cần điều chỉnh JSON Schema như thế nào để ngăn chặn việc bịa đặt ngày này mà vẫn đảm bảo tính tuân thủ của cấu trúc đầu ra?",
    "optionsEN": [
      "A. Remove adverse_event_date from the required array so the model can omit the key completely when no adverse event is present in the record.",
      "B. Add a system prompt instruction explicitly forbidding the model from outputting adverse_event_date if no adverse event occurred, keeping \"type\": \"string\" in schema.",
      "C. Change the schema type definition to \"type\": [\"string\", \"null\"] and keep adverse_event_date in the required array to force the model to explicitly output null when no adverse event occurs.",
      "D. Add \"default\": \"N/A\" to the adverse_event_date property definition in the JSON Schema so the model defaults to \"N/A\" for non-events."
    ],
    "options": [
      "A. Xóa adverse_event_date khỏi mảng required để mô hình tự động bỏ qua (omit) key này khi không tìm thấy biến cố bất lợi trong bản ghi.",
      "B. Bổ sung chỉ thị trong system prompt cấm mô hình đầu ra adverse_event_date nếu không có biến cố, giữ nguyên \"type\": \"string\" trong schema.",
      "C. Thay đổi kiểu của trường thành \"type\": [\"string\", \"null\"] và vẫn giữ adverse_event_date trong mảng required để bắt buộc mô hình xuất ra null khi không có biến cố.",
      "D. Thêm thuộc tính \"default\": \"N/A\" vào định nghĩa adverse_event_date trong JSON Schema để mô hình tự động trả về giá trị mặc định cho trường hợp không có biến cố."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A removing adverse_event_date from the required list allows the model to omit the field, but missing keys lead to inconsistent JSON payloads and unpredictable schema parsing in clinical databases.",
      "Option B relying on system prompt instructions fails because hard schema constraints requiring a string override natural language directives, forcing the model to generate a dummy date string.",
      "Option C defining type as [string, null] while keeping the field in required forces the LLM to output an explicit null for non-events without hallucinating dates or omitting keys.",
      "Option D using schema default properties does not guarantee model compliance during structured generation and breaks ISO date validation downstream."
    ],
    "rationale": "In structured generation, when a contextual field like adverse_event_date is marked as a required string, the model is strictly constrained to output a non-null string value. When no adverse event exists in the text, this constraint causes date hallucination. Updating the schema to type: ['string', 'null'] while keeping the field required enables the model to explicitly generate null, satisfying both the schema structure and domain logic.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai vì việc loại bỏ trường khỏi mảng required khiến mô hình có thể bỏ qua key hoàn toàn, dẫn đến cấu trúc JSON không nhất quán và gây lỗi ở hệ thống nhận dữ liệu lâm sàng.\\n- Phương án B sai vì các ràng buộc cứng của JSON Schema (yêu cầu kiểu string) sẽ đè lên chỉ thị bằng ngôn ngữ tự nhiên trong prompt, buộc mô hình phải tạo ra một chuỗi ngày giả để thỏa mãn schema.\\n- Phương án C đúng vì việc đặt \"type\": [\"string\", \"null\"] kết hợp với việc giữ trường trong mảng required buộc mô hình phải xuất ra giá trị null một cách rõ ràng khi không có sự cố, loại bỏ tình trạng tạo ngày giả mà không làm thay đổi cấu trúc payload JSON.\\n- Phương án D sai vì thuộc tính default trong JSON Schema không được các cơ chế structured output của API thực thi bắt buộc khi lấy mẫu, đồng thời giá trị \"N/ A\" sẽ làm hỏng trình phân tích ngày chuẩn ISO ở hạ nguồn.",
    "scenarioSignature": {
      "testedPrinciple": "nullable field schema definition for conditional attributes",
      "failureMode": "model fabricates date string when event is absent",
      "rootCause": "non-nullable required string type forces value generation",
      "requiredFix": "define field as nullable string and retain in required array"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-020",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-020",
    "scenarioSignature": {
      "testedPrinciple": "nullable field schema configuration for perpetual contracts",
      "failureMode": "model invents expiry date one year out for perpetual license",
      "rootCause": "non-nullable string attribute forced by required list",
      "requiredFix": "configure field as nullable type and keep inside required list"
    },
    "questionEN": "In an automated license contract ingestion engine (LicenseOps), corporate software agreements are converted into JSON models. The expiration_date field is configured as \"type\": \"string\" and listed in required. For perpetual licenses without an expiration date, the LLM hallucinates an expiration date exactly 1 year from sign date (such as '2025-10-01'), causing billing systems to trigger premature renewal alerts. Which schema modification correctly resolves this date fabrication?",
    "question": "[d4-b09-new-020] Trong hệ thống xử lý hợp đồng tự động (LicenseOps), công cụ trích xuất dữ liệu chuyển các thỏa thuận phần mềm doanh nghiệp thành dạng JSON. Trường expiration_date được cấu hình là \"type\": \"string\" thuộc mảng required. Đối với các hợp đồng bản quyền vĩnh viễn (perpetual license) không có thời hạn, LLM tự bịa ra ngày hết hạn sau đó 1 năm (như '2025-10-01'), khiến hệ thống thanh toán phát lệnh thông báo gia hạn sai lầm. Phương án sửa đổi schema nào giải quyết triệt để lỗi bịa đặt dữ liệu này?",
    "optionsEN": [
      "A. Set \"additionalProperties\": false at the root schema level to block the LLM from appending unmentioned fields like expiration_date during parsing.",
      "B. Remove expiration_date from the JSON Schema entirely and instruct the model in the prompt to write expiration details into a generic notes text block.",
      "C. Use \"oneOf\": [{\"type\": \"string\"}] without adding \"null\" to allow flexible string representation for perpetual licenses.",
      "D. Define expiration_date using \"type\": [\"string\", \"null\"] (or \"oneOf\" containing null) and retain expiration_date inside required so perpetual contracts explicitly return null."
    ],
    "options": [
      "A. Thiết lập \"additionalProperties\": false ở cấp root schema để ngăn LLM tự thêm các trường không được đề cập như expiration_date khi trích xuất.",
      "B. Bỏ hẳn trường expiration_date khỏi JSON Schema và hướng dẫn mô hình trong prompt ghi thông tin hết hạn vào trường văn bản notes chung.",
      "C. Sử dụng cấu hình \"oneOf\": [{\"type\": \"string\"}] mà không có \"null\" để cho phép biểu diễn linh hoạt chuỗi ngày cho các loại hợp đồng vĩnh viễn.",
      "D. Cấu hình expiration_date thành \"type\": [\"string\", \"null\"] (hoặc \"oneOf\" chứa null) và giữ expiration_date trong required để hợp đồng vĩnh viễn trả về null một cách rõ ràng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A setting additionalProperties to false prevents undeclared JSON keys, but does not stop value hallucination for properties already defined in the schema.",
      "Option B moving expiration data to an unstructured notes string destroys schema strictness and breaks automated downstream billing workflows.",
      "Option C specifying oneOf with only a string schema still forbids null values, continuing to force date string generation for perpetual contracts.",
      "Option D configuring type as [string, null] while preserving required status forces the LLM to output null for perpetual licenses, eliminating artificial expiry dates."
    ],
    "rationale": "When extracting contract metadata, perpetual licenses naturally lack an expiration date. If expiration_date is typed strictly as a string and included in required, the model is compelled to fabricate a valid date string. Setting type to ['string', 'null'] (or using oneOf with null) while keeping the property required allows the model to signal perpetual status via explicit null without violating schema validation or breaking downstream automation.",
    "explanation": "Phân tích các phương án:\n- Phương án A sai vì additionalProperties: false chỉ ngăn chặn mô hình thêm các key nằm ngoài định nghĩa schema, chứ không ngăn được việc tạo ra giá trị ảo cho một thuộc tính đã được khai báo sẵn.\n- Phương án B sai vì việc xóa trường cấu trúc và đẩy vào ghi chú tự do làm mất tính chặt chẽ của schema, khiến hệ thống quản lý thanh toán hạ nguồn không thể truy vấn tự động.\n- Phương án C sai vì oneOf chỉ chứa kiểu string vẫn không cho phép giá trị null, do đó mô hình vẫn bị ép phải bịa ra một chuỗi ngày tháng.\n- Phương án D đúng vì việc khai báo \"type\": [\"string\", \"null\"] và duy trì trường trong mảng required cho phép hợp đồng vĩnh viễn biểu diễn trạng thái không hết hạn bằng giá trị null chuẩn xác, chấm dứt hoàn toàn hiện tượng tự bịa ngày hết hạn.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]