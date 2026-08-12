[
  {
    "id": "d4-b09-new-011",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-011",
    "questionEN": "In an automated insurance system using Claude 3.5 Sonnet, claims data is extracted into a ClaimExtraction JSON Schema where witness_statement is listed under required with \"type\": \"string\". When processing single-vehicle collision claims with no third-party witnesses, the model repeatedly hallucinates fabricated witness quotes, triggering false audit flags in 18% of claims. What is the root cause of this failure and the correct schema-level resolution?",
    "question": "[d4-b09-new-011] Trong hệ thống bảo hiểm tự động sử dụng Claude 3.5 Sonnet, dữ liệu bồi thường được trích xuất vào JSON Schema ClaimExtraction trong đó witness_statement được liệt kê trong danh sách required với \"type\": \"string\". Khi xử lý các yêu cầu liên quan đến tai nạn đơn xe không có nhân chứng bên thứ ba, mô hình liên tục ảo giác bịa ra lời khai nhân chứng, dẫn đến cờ cảnh báo kiểm toán sai trong 18% hồ sơ. Nguyên nhân gốc rễ và giải pháp khắc phục ở cấp độ schema là gì?",
    "optionsEN": [
      "A. Remove witness_statement from the JSON Schema required array while keeping \"type\": \"string\", allowing the model to omit the key entirely during single-vehicle extractions.",
      "B. Add a prompt directive: \"If no witness statement is present, return an empty string \"\" for witness_statement\", keeping \"type\": \"string\" in required.",
      "C. Update witness_statement in the JSON Schema to \"type\": [\"string\", \"null\"] (or \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]) and retain witness_statement in the required array.",
      "D. Add a \"default\": null attribute to the witness_statement field definition in JSON Schema without altering the \"type\": \"string\" constraint."
    ],
    "options": [
      "A. Loại bỏ witness_statement khỏi mảng required trong JSON Schema nhưng giữ nguyên \"type\": \"string\", cho phép mô hình bỏ qua hoàn toàn key này khi xử lý tai nạn đơn xe.",
      "B. Thêm chỉ thị vào prompt: \"Nếu không có lời khai nhân chứng, hãy trả về chuỗi rỗng \"\" cho witness_statement\", giữ nguyên \"type\": \"string\" trong required.",
      "C. Cập nhật witness_statement trong JSON Schema thành \"type\": [\"string\", \"null\"] (hoặc \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]) và duy trì witness_statement trong mảng required.",
      "D. Thêm thuộc tính \"default \": null vào định nghĩa trường witness_statement trong JSON Schema mà không thay đổi ràng buộc \"type\": \"string\"."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Removing witness_statement from required without enabling explicit nullability leads to non-deterministic key inclusion and persistent hallucination.",
      "Option B is incorrect: Prompting for empty strings does not override JSON Schema type constraints requiring non-null string generation when data is missing.",
      "Option C is correct: Retaining witness_statement in required forces key emission while setting type to string or null lets the model output null for single-car accidents.",
      "Option D is incorrect: JSON Schema default keywords are not enforced as output generation constraints by the Claude API."
    ],
    "rationale": "When a field is required in JSON Schema but defined strictly as a string, the LLM is forced to generate string content even if the underlying source document lacks relevant data, resulting in fabricated statements. The correct architectural fix is making the field explicitly nullable with [\"string\", \"null\"] while keeping it in required so the model outputs null instead of inventing data.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai vì loại bỏ trường khỏi danh sách required mà không khai báo nullable sẽ dẫn đến hành vi không nhất quán của LLM (lúc xuất hiện key lúc không, hoặc vẫn tự sinh dữ liệu giả).\\n- Phương án B sai vì chỉ dùng prompt mà không có ràng buộc nullability ở cấp độ schema vẫn sẽ khiến mô hình ảo giác dữ liệu khi schema ép buộc phải là kiểu string non-null.\\n- Phương án C đúng vì khi trường nằm trong mảng required, mô hình bắt buộc phải xuất ra key witness_statement. Đồng thời việc khai báo \"type\": [\"string\", \"null\"] cho phép mô hình chọn giá trị null một cách hợp lệ khi dữ liệu nhân chứng không tồn tại, thay vì ảo giác bịa ra trích dẫn.\\n- Phương án D sai vì thuộc tính default trong JSON Schema không được API Claude bắt buộc thực thi như một ràng buộc đầu ra; mô hình vẫn bị ràng buộc bởi kiểu \"type\": \"string\".",
    "scenarioSignature": {
      "testedPrinciple": "explicit nullability in schema required array",
      "failureMode": "model fabricates witness quote for single vehicle incident",
      "rootCause": "required schema field constrained to non nullable string",
      "requiredFix": "set field type to string or null and retain required"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-012",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-012",
    "questionEN": "A recruitment automation parser uses a CandidateProfile JSON Schema to process candidate resumes. For candidates who opted out of providing a public network profile, the model generates synthetic URLs (e.g. \"https://www.linkedin.com/in/john-doe-12345\") because linkedin_url is defined as \"type\": \"string\" in the required array. This causes downstream verification webhooks to fail with HTTP 404 errors. How should the schema be modified to stop URL fabrication?",
    "question": "[d4-b09-new-012] Bộ phân tích tự động tuyển dụng sử dụng JSON Schema CandidateProfile để xử lý sơ yếu lý lịch. Đối với các ứng viên chủ động từ chối cung cấp trang cá nhân, mô hình tự động tạo ra các URL giả định (ví dụ: \"https://www.linkedin.com/in/john-doe-12345\") do trường linkedin_url được khai báo là \"type\": \"string\" trong mảng required. Điều này khiến webhook xác minh phía sau bị lỗi HTTP 404. Cần sửa đổi schema như thế nào để chấm dứt tình trạng bịa đặt URL này?",
    "optionsEN": [
      "A. Configure additionalProperties: false on the CandidateProfile schema root to forbid unexpected field generation.",
      "B. Move linkedin_url out of the required list and handle key missing checks in downstream Python code.",
      "C. Add \"format\": \"uri\" to the linkedin_url field specification in the JSON Schema to reject synthetic links.",
      "D. Update linkedin_url schema definition to \"type\": [\"string\", \"null\"] and maintain linkedin_url inside the required array."
    ],
    "options": [
      "A. Cấu hình additionalProperties: false trên root schema CandidateProfile để cấm việc tự sinh các trường ngoài mong muốn.",
      "B. Chuyển linkedin_url ra khỏi danh sách required và xử lý logic kiểm tra thiếu key trong mã nguồn Python phía sau.",
      "C. Bổ sung \"format\": \"uri\" vào khai báo trường linkedin_url trong JSON Schema để từ chối các đường link giả lập.",
      "D. Cập nhật khai báo schema cho linkedin_url thành \"type\": [\"string\", \"null\"] và tiếp tục duy trì linkedin_url trong mảng required."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: additionalProperties false prevents undeclared JSON keys but does not stop hallucinated values within declared schema fields.",
      "Option B is incorrect: Omitting linkedin_url from required creates key presence unpredictability rather than forcing an explicit missing signal.",
      "Option C is incorrect: The URI format constraint enforces valid syntax but does not prevent the model from hallucinating syntactically valid fake web links.",
      "Option D is correct: Defining linkedin_url as a string or null union while keeping it required forces the model to emit null when candidates opt out."
    ],
    "rationale": "When contextual attributes like social URLs are absent due to candidate opt-out, demanding a non-nullable string forces the LLM to hallucinate realistic links to satisfy schema syntax. Marking the field as nullable with [\"string\", \"null\"] and keeping it required ensures explicit representation of absence (linkedin_url: null) without syntax validation errors or hallucinated URLs.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai vì additionalProperties: false chỉ ngăn mô hình thêm các key lạ ngoài schema, chứ không ngăn mô hình bịa giá trị chuỗi cho một key đã khai báo trong schema.\\n- Phương án B sai vì loại bỏ trường khỏi required khiến đầu ra của mô hình không ổn định (key có thể bị thiếu ngẫu nhiên) thay vì ép mô hình phản ánh rõ ràng trạng thái thiếu dữ liệu.\\n- Phương án C sai vì \"format\": \"uri\" chỉ bắt buộc cú pháp đúng chuẩn URI, chứ không ngăn mô hình tạo ra một URL giả lập nhưng đúng cú pháp.\\n- Phương án D đúng vì khai báo kiểu union chứa null và giữ trường trong danh sách required sẽ ép mô hình luôn phải sinh ra key linkedin_url nhưng phải gán giá trị null khi ứng viên không cung cấp link.",
    "scenarioSignature": {
      "testedPrinciple": "nullable union type for voluntary candidate opt out data",
      "failureMode": "model generates synthetic profile URL causing webhook failure",
      "rootCause": "non nullable string requirement on optional contextual attribute",
      "requiredFix": "define field as nullable string union and keep required"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]