[
  {
    "id": "d4-b09-new-015",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-015",
    "questionEN": "An admissions processing pipeline at EduEnroll uses Claude to parse transcripts and extract student metadata into JSON. In the schema, transfer_gpa is defined as a non-nullable required number (\"type\": \"number\"), but first-time freshman applicants have no transfer history. When processing 1,200 freshman transcripts, Claude fabricates synthetic scores (e.g., 3.25 or 3.40) for transfer_gpa to satisfy the schema requirement, corrupting the university's scholarship eligibility evaluation engine. How should the JSON Schema be restructured to prevent GPA fabrication for non-transfer applicants?",
    "question": "[d4-b09-new-015] Một đường ống xử lý tuyển sinh tại EduEnroll sử dụng Claude để phân tích học bạ và trích xuất dữ liệu sinh viên sang dạng JSON. Trong schema, trường transfer_gpa được định nghĩa là một số bắt buộc không thể null (\"type\": \"number\"), nhưng các thí sinh là sinh viên năm nhất lần đầu nhập học không có lịch sử chuyển trường. Khi xử lý 1.200 hồ sơ sinh viên năm nhất, Claude tự tạo các điểm số giả (ví dụ: 3.25 hoặc 3.40) cho transfer_gpa để thỏa mãn yêu cầu của schema, làm sai lệch hệ thống đánh giá xét học bổng của trường. Cần tái cấu trúc JSON Schema như thế nào để ngăn chặn tình trạng ảo giác GPA cho thí sinh không phải sinh viên chuyển trường?",
    "optionsEN": [
      "A. Remove transfer_gpa from the JSON Schema required array and rely on model prompt instructions to omit the key for first-time applicants.",
      "B. Define a default property of 0.0 for transfer_gpa in the JSON Schema so Claude uses zero when no transfer transcript is found.",
      "C. Define transfer_gpa with \"type\": [\"number\", \"null\"] and keep it inside the required array to force an explicit null token when transfer history is absent.",
      "D. Add an additionalProperties: false flag to the root schema and instruct Claude to insert a custom string \"N / A\" for non-transfer records."
    ],
    "options": [
      "A. Loại bỏ transfer_gpa khỏi mảng required của JSON Schema và dựa vào câu lệnh prompt để mô hình tự bỏ qua khóa này đối với thí sinh năm nhất.",
      "B. Định nghĩa thuộc tính default là 0.0 cho transfer_gpa trong JSON Schema để Claude tự động điền số 0 khi không tìm thấy học bạ chuyển trường.",
      "C. Định nghĩa transfer_gpa với \"type\": [\"number\", \"null\"] và giữ nó trong mảng required để bắt buộc mô hình trả về giá trị null rõ ràng khi không có lịch sử chuyển trường.",
      "D. Thêm thuộc tính additionalProperties: false vào root schema và hướng dẫn Claude điền chuỗi ký tự \"N / A\" cho các hồ sơ không chuyển trường."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A removes transfer_gpa from required, allowing Claude to omit the key, but models handle optional un-required fields inconsistently and downstream parsers cannot distinguish absent keys from extraction failures.",
      "Option B sets a schema default of 0.0, but the Claude API does not natively enforce schema default values during generation, and assigning 0.0 mischaracterizes a missing transfer history as a failing academic grade.",
      "Option C defines transfer_gpa as type [\"number\", \"null\"] while retaining it in required, forcing Claude to output JSON null explicitly when no transfer history exists, eliminating numeric fabrication while satisfying schema validation.",
      "Option D instructs the model to return \"N / A\" for a numeric field, creating a schema validation error against type number, while additionalProperties false only restricts unexpected schema keys rather than allowing null values."
    ],
    "rationale": "Configuring optional domain attributes like transfer_gpa as nullable types ([\"number\", \"null\"]) within the required array forces Claude to emit an explicit JSON null when source data is missing, preventing hallucinated numeric scores while ensuring deterministic downstream schema validation.",
    "explanation": "Phân tích chi tiết các phương án:\\n- Phương án C (Chính xác): Khi một trường dữ liệu không bắt buộc phải có trong dữ liệu đầu vào (như điểm transfer_gpa của sinh viên mới), việc khai báo \"type\": [\"number\", \"null\"] và giữ trường đó trong mảng required sẽ buộc mô hình phải xuất ra giá trị null thay vì tự sáng tạo điểm số giả để khớp với kiểu số.\\n- Phương án A (Sai): Nếu chỉ xóa transfer_gpa khỏi mảng required, Claude vẫn có thể ngầm định tự sinh trường này hoặc bỏ qua một cách không nhất quán. Hệ thống phía sau sẽ gặp khó khăn khi phân biệt giữa dữ liệu thực sự thiếu và lỗi trích xuất.\\n- Phương án B (Sai): Từ khóa default trong JSON Schema không được kiểm soát hoặc ép buộc trực tiếp bởi mô hình Claude. Ngoài ra, gán 0.0 làm bóp méo dữ liệu học thuật, biến một thí sinh không chuyển trường thành người có điểm trung bình yếu kém.\\n- Phương án D (Sai): Chuỗi \"N / A\" vi phạm kiểu dữ liệu number đã định nghĩa, dẫn đến lỗi schema validator. additionalProperties: false chỉ ngăn các trường ngoài danh sách chứ không giải quyết được việc xử lý giá trị rỗng của trường hiện có.",
    "scenarioSignature": {
      "testedPrinciple": "nullable type definition with required array placement for absent optional fields",
      "failureMode": "model fabricates synthetic numeric values for absent historical fields to fulfill strict type requirements",
      "rootCause": "optional field is enforced as non-nullable required type in json schema",
      "requiredFix": "configure field as union with null type and include it in required array"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-016",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-016",
    "questionEN": "An automated real estate audit workflow at PropInspect uses Claude to extract structural issues from building inspection reports into JSON. The schema defines defect_description as a required string (\"type\": \"string\"). For defect-free properties, Claude populates defect_description with text strings like \"No defects observed\" or \"Property in perfect condition\" rather than returning null. This breaks downstream SQL analytics that filter for structural risks using WHERE defect_description IS NOT NULL, resulting in 100% false-positive risk alerts across 450 clean property audits. What is the correct JSON Schema pattern to enforce explicit null output for defect-free inspections?",
    "question": "[d4-b09-new-016] Một quy trình kiểm định bất động sản tự động tại PropInspect sử dụng Claude để trích xuất các sự cố kết cấu từ báo cáo kiểm tra nhà vào định dạng JSON. Schema định nghĩa defect_description là một chuỗi bắt buộc (\"type\": \"string\"). Đối với các bất động sản không có lỗi, Claude tự động điền vào defect_description các chuỗi văn bản như \"No defects observed\" hoặc \"Property in perfect condition\" thay vì trả về null. Điều này làm hỏng bộ lọc truy vấn SQL phân tích rủi ro WHERE defect_description IS NOT NULL, dẫn đến 100% cảnh báo rủi ro giả trên 450 báo cáo nhà hoàn toàn sạch sẽ. Mẫu JSON Schema nào là chính xác để bắt buộc mô hình trả về giá trị null rõ ràng cho các kiểm định không có lỗi?",
    "optionsEN": [
      "A. Set defect_description to \"type\": \"string\" with a minLength: 0 constraint so empty text strings are accepted as defect-free markers.",
      "B. Remove defect_description from the schema entirely and use prompt engineering to request text notes in a separate unstructured response field.",
      "C. Add an enum constraint containing [\"No defects observed\", \"Structural crack\", \"Water leak\"] to restrict Claude's output options.",
      "D. Define defect_description with \"type\": [\"string\", \"null\"] and place it in the required array while prompting the model to use null when no defects exist."
    ],
    "options": [
      "A. Thiết lập defect_description thành \"type\": \"string\" kèm ràng buộc minLength: 0 để các chuỗi văn bản rỗng được chấp nhận làm dấu hiệu không có lỗi.",
      "B. Loại bỏ hoàn toàn defect_description khỏi schema và sử dụng prompt engineering để yêu cầu các ghi chú văn bản trong một trường phản hồi không cấu trúc riêng biệt.",
      "C. Thêm ràng buộc enum chứa [\"No defects observed\", \"Structural crack\", \"Water leak\"] để giới hạn các tùy chọn đầu ra của Claude.",
      "D. Định nghĩa defect_description với \"type\": [\"string\", \"null\"] và đặt nó trong mảng required, đồng thời hướng dẫn prompt sử dụng null khi không có lỗi."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A allows empty strings via minLength: 0, but empty strings in SQL database queries still evaluate as NOT NULL, leaving the false-positive risk alert bug unresolved.",
      "Option B removes defect_description from the schema, which destroys structured extraction capability for actual property defects and forces downstream applications to parse unstructured text.",
      "Option C restricts output via an enum containing \"No defects observed\", but this still emits a non-null string token, continuing to cause SQL filters like WHERE defect_description IS NOT NULL to treat clean properties as flagged risks.",
      "Option D configures defect_description as [\"string\", \"null\"] inside required, allowing Claude to output JSON null when no defects exist so SQL databases store true NULL values and accurately filter clean audit records."
    ],
    "rationale": "Using \"type\": [\"string\", \"null\"] in combination with the required array enables Claude to return null instead of conversational filler strings (like \"No defects observed\"), ensuring downstream database queries (WHERE defect_description IS NOT NULL) function accurately without false positives.",
    "explanation": "Phân tích chi tiết các phương án:\\n- Phương án D (Chính xác): Trong các trường quan sát có tính chất nhị phân (có lỗi hoặc không có lỗi), nếu trường defect_description chỉ mang kiểu \"string\", Claude sẽ cố gắng tạo ra các chuỗi văn bản diễn giải như \"No defects observed\". Định nghĩa \"type\": [\"string\", \"null\"] và đưa vào mảng required cho phép Claude xuất trực tiếp giá trị null, giúp các câu truy vấn SQL (WHERE defect_description IS NOT NULL) hoạt động chính xác mà không bị nổ cảnh báo giả.\\n- Phương án A (Sai): Chuỗi rỗng \"\" vẫn là một chuỗi văn bản có tồn tại, do đó điều kiện SQL IS NOT NULL vẫn trả về giá trị TRUE, không sửa được lỗi logic trong cơ sở dữ liệu.\\n- Phương án B (Sai): Loại bỏ trường khỏi schema làm mất khả năng trích xuất dữ liệu có cấu trúc cho những bất động sản thực sự có sự cố kết cấu.\\n- Phương án C (Sai): Sử dụng enum với chuỗi \"No defects observed\" vẫn trả về một chuỗi phi-null, khiến hệ thống quản lý rủi ro tiếp tục coi tất cả các căn nhà đều có nguy cơ bị lỗi.",
    "scenarioSignature": {
      "testedPrinciple": "explicit nullable string schema design for binary present or absent observations",
      "failureMode": "model outputs descriptive filler text for absent domain conditions breaking database null queries",
      "rootCause": "string field mandatory type constraint prevents natural null emission for negative findings",
      "requiredFix": "declare string union with null type inside required array with explicit prompt instruction for null"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]