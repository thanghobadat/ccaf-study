[
  {
    "id": "d4-b09-B-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-001",
    "scenarioSignature": {
      "testedPrinciple": "Schema required array enforcement for nullable fields",
      "failureMode": "Downstream service receives missing key payload instead of explicit null",
      "rootCause": "Nullable field present in properties definition but missing from required array",
      "requiredFix": "Add nullable field name to required array in schema"
    },
    "questionEN": "An inventory ingestion pipeline uses a JSON Schema to extract product attributes from supplier invoices. The field serial_number is defined as \"type\": [\"string\", \"null\"] in properties, but it is excluded from the schema's required array. When parsing invoices for non-serialized bulk items, how does Claude behave and what problem occurs downstream?",
    "question": "[d4-b09-B-001] Một đường ống xử lý kho hàng sử dụng JSON Schema để trích xuất thuộc tính sản phẩm từ hóa đơn nhà cung cấp. Trường serial_number được định nghĩa là \"type\": [\"string\", \"null\"] trong properties, nhưng bị loại khỏi mảng required của schema. Khi xử lý hóa đơn cho các mặt hàng bán sỉ không có số sê-ri, Claude sẽ ứng xử như thế nào và sự cố gì xảy ra ở hệ thống phía sau?",
    "optionsEN": [
      "A. Claude silently omits the serial_number key from the output JSON, causing downstream ingestion to receive {} for that key instead of explicit null.",
      "B. Claude raises a JSON schema validation error because nullable fields must always be declared in the required array.",
      "C. Claude automatically hallucinates a synthetic 10-digit serial number to satisfy the schema definition.",
      "D. Claude outputs \"serial_number\": \"\" (an empty string), which causes downstream type casting exceptions."
    ],
    "options": [
      "A. Claude âm thầm bỏ qua khóa serial_number khỏi JSON đầu ra, khiến hệ thống phía sau nhận được {} thay vì giá trị null rõ ràng.",
      "B. Claude tạo ra lỗi xác thực JSON schema vì các trường nullable bắt buộc phải khai báo trong mảng required.",
      "C. Claude tự động tạo ra một số sê-ri giả định 10 chữ số để đáp ứng định nghĩa schema.",
      "D. Claude xuất ra \"serial_number\": \"\" (chuỗi rỗng), gây ra ngoại lệ ép kiểu ở hệ thống phía sau."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because omitting a field from the required array makes it optional, leading Claude to omit the key entirely when non-applicable, delivering an absent field {} rather than explicit null.",
      "Option B is incorrect because JSON Schema allows fields in properties to be omitted from required; this is a schema logic gap, not a schema parser syntax error.",
      "Option C is incorrect because Claude does not hallucinate a value when the field is optional; it simply omits the key.",
      "Option D is incorrect because Claude omits the key rather than emitting an empty string when the field is optional and not forced into the required array."
    ],
    "rationale": "When a nullable field is defined under properties but omitted from required, the model treats it as optional and silently omits the key when no value applies. Downstream consumers expecting {\"serial_number\": null} receive an absent key {} instead, breaking downstream contract logic.",
    "explanation": "Lựa chọn A là đáp án đúng. Trong JSON Schema, một trường được khai báo dạng nullable \"type\": [\"string\", \"null\"] nhưng không nằm trong mảng required sẽ được mô hình xem là một trường tùy chọn (optional). Khi gặp dữ liệu không áp dụng (như hàng không có sê-ri), Claude sẽ âm thầm bỏ qua khóa đó thay vì trả về \"serial_number\": null. Hệ thống phía sau sẽ nhận được JSON thiếu khóa thay vì giá trị null tường minh.\n\nLựa chọn B sai vì JSON Schema cho phép trường thuộc properties không có trong required, đây không phải lỗi cú pháp schema.\nLựa chọn C sai vì khi trường là tùy chọn, Claude chọn cách bỏ qua khóa chứ không ảo giác dữ liệu giả.\nLựa chọn D sai vì mô hình sẽ bỏ qua khóa hoàn toàn thay vì tự ý trả về chuỗi rỗng \"\".",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-002",
    "scenarioSignature": {
      "testedPrinciple": "Deterministic model behavior for optional nullable JSON fields",
      "failureMode": "Inconsistent output structure across identical requests",
      "rootCause": "Nullable field omitted from required array causing non-deterministic output selection",
      "requiredFix": "Place nullable field in required array to force explicit null output"
    },
    "questionEN": "A customer support automation service uses a JSON schema to extract ticket metadata. The field resolution_summary is defined as \"type\": [\"string\", \"null\"], but it is not listed in the required array. When processing tickets that are currently open and unresolved, automated tests show inconsistent JSON outputs across repeated API runs. What causes this non-deterministic behavior?",
    "question": "[d4-b09-B-002] Dịch vụ tự động hóa hỗ trợ khách hàng sử dụng JSON schema để trích xuất dữ liệu thẻ hỗ trợ. Trường resolution_summary được định nghĩa là \"type\": [\"string\", \"null\"], nhưng không được liệt kê trong mảng required. Khi xử lý các thẻ hỗ trợ đang mở và chưa được giải quyết, các bài kiểm thử tự động ghi nhận kết quả JSON không đồng nhất giữa các lần gọi API lặp lại. Nguyên nhân gây ra hành vi không định tính (non-deterministic) này là gì?",
    "optionsEN": [
      "A. The API temperature setting is too low, forcing the model to switch between string types and object types.",
      "B. Because resolution_summary is nullable but not required, Claude arbitrarily alternates between outputting \"resolution_summary\": null and omitting the key entirely.",
      "C. The JSON Schema parser fails randomly when encountering union types containing \"null\".",
      "D. Claude defaults to using an empty string \"\" unless additionalProperties: false is added to the schema root."
    ],
    "options": [
      "A. Thiết lập temperature của API quá thấp, buộc mô hình phải chuyển đổi giữa kiểu string và kiểu object.",
      "B. Vì resolution_summary cho phép null nhưng không bắt buộc (not required), Claude biến đổi ngẫu nhiên giữa việc xuất \"resolution_summary\": null và việc bỏ qua hoàn toàn khóa đó.",
      "C. Trình phân tích JSON Schema thất bại ngẫu nhiên khi gặp các kiểu hợp (union types) có chứa \"null\".",
      "D. Claude mặc định sử dụng chuỗi rỗng \"\" trừ khi thuộc tính additionalProperties: false được thêm vào root schema."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because low temperature increases determinism, and temperature does not cause structural type switching between objects and strings.",
      "Option B is correct because leaving a nullable field out of the required array gives the model two valid ways to satisfy the schema when data is missing: emitting explicit null or omitting the field, causing non-deterministic outputs across API invocations.",
      "Option C is incorrect because union types like [\"string\", \"null\"] are valid standard JSON Schema constructs and do not cause random parser failures.",
      "Option D is incorrect because additionalProperties: false restricts unlisted keys; it does not force empty strings or fix missing required field specifications."
    ],
    "rationale": "When a field is nullable (\"type\": [\"string\", \"null\"]) but not in the required array, both emitting \"field\": null and omitting field entirely satisfy the JSON Schema contract. This ambiguity leads to non-deterministic model output across identical API calls on missing values.",
    "explanation": "Lựa chọn B là đáp án đúng. Khi một trường được định nghĩa dạng nullable (\"type\": [\"string\", \"null\"]) nhưng không thuộc mảng required, cả hai cách xuất dữ liệu: trả về \"resolution_summary\": null hoặc bỏ qua luôn khóa resolution_summary đều hợp lệ về mặt JSON Schema. Sự thiếu ràng buộc này khiến Claude có hành vi ngẫu nhiên (non-deterministic), lúc thì xuất null, lúc lại thiếu khóa giữa các lần gọi API đối với cùng một loại dữ liệu chưa giải quyết.\n\nLựa chọn A sai vì temperature thấp tăng tính định tính chứ không gây đổi kiểu dữ liệu.\nLựa chọn C sai vì kiểu hợp [\"string\", \"null\"] là chuẩn JSON Schema hợp lệ, không gây lỗi parser.\nLựa chọn D sai vì additionalProperties: false dùng để chặn các khóa không khai báo, không giải quyết việc ép mô hình xuất giá trị null tường minh.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]