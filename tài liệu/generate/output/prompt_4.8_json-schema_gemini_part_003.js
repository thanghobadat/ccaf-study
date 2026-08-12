[
  {
    "id": "d4-b11-4.8-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-005",
    "questionEN": "An API health monitoring system uses an LLM to extract performance thresholds from SLA contract documents into JSON format. The JSON Schema defines \"response_time_threshold\": {\"type\": \"integer\"} without a \"description\" metadata keyword. The LLM extracts values in seconds (e.g., 5), while the downstream alert processing engine expects milliseconds (e.g., 5000), triggering false positive critical severity alerts. What is the most effective fix to ensure consistent metric unit alignment?",
    "question": "[d4-b11-4.8-005] Một hệ thống giám sát sức khỏe API sử dụng LLM để trích xuất ngưỡng hiệu năng từ tài liệu hợp đồng SLA sang định dạng JSON. JSON Schema định nghĩa \"response_time_threshold\": {\"type\": \"integer\"} nhưng thiếu thuộc tính \"description\". Kết quả là LLM trích xuất giá trị theo giây (ví dụ: 5), trong khi hệ thống cảnh báo phía sau (downstream alert engine) yêu cầu miligiây (ví dụ: 5000), làm kích hoạt các cảnh báo giả cấp độ nghiêm trọng. Giải pháp hiệu quả nhất để đảm bảo thống nhất đơn vị đo lường là gì?",
    "optionsEN": [
      "A. Add an explicit \"description\" property to \"response_time_threshold\" in the JSON Schema specifying \"Maximum allowed latency in milliseconds\", guiding the model to generate millisecond integer values.",
      "B. Set \"minimum\": 1000 in the JSON Schema for \"response_time_threshold\" so schema validation fails whenever the model outputs single-digit or double-digit values.",
      "C. Change the property data type from \"integer\" to \"string\" and rely on regex pattern \" ^ [0 - 9] + ms$\" to force the model to append a unit suffix.",
      "D. Configure \"additionalProperties\": true at the root level to allow the LLM to dynamically add a separate \"unit\" field alongside \"response_time_threshold\"."
    ],
    "options": [
      "A. Bổ sung thuộc tính \"description\" rõ ràng cho \"response_time_threshold\" trong JSON Schema chỉ định \"Maximum allowed latency in milliseconds\" để định hướng mô hình sinh ra giá trị theo miligiây.",
      "B. Thiết lập \"minimum\": 1000 trong JSON Schema cho \"response_time_threshold\" để trình kiểm tra schema báo lỗi mỗi khi mô hình xuất giá trị 1 hoặc 2 chữ số.",
      "C. Đổi kiểu dữ liệu của thuộc tính từ \"integer\" sang \"string\" và dùng regex pattern \" ^ [0 - 9] + ms$\" để bắt buộc mô hình nối thêm hậu tố đơn vị.",
      "D. Cấu hình \"additionalProperties\": true ở cấp gốc (root level) để cho phép LLM tự động thêm trường \"unit\" riêng biệt bên cạnh \"response_time_threshold\"."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because JSON Schema description fields serve as essential semantic prompt instructions for LLMs, explicitly defining units of measurement (e.g., milliseconds) so the model generates values matching downstream API expectations without needing post-processing logic.",
      "Option B is incorrect because adding a minimum numerical constraint forces validation errors when seconds are produced, but does not provide clear semantic unit context to the LLM, potentially causing model generation failures or retries rather than guided accuracy.",
      "Option C is incorrect because converting numeric fields to string regex patterns introduces unnecessary string parsing overhead downstream and breaks integer type contracts in client code.",
      "Option D is incorrect because enabling additionalProperties permits arbitrary extra keys that violate strict schema enforcement and does not guarantee the LLM will output the required unit or value format."
    ],
    "rationale": "Adding a clear unit description in the JSON Schema provides direct semantic guidance to the LLM, ensuring numerical output matches expected downstream units (milliseconds) while preserving integer schema typing.",
    "explanation": "Đáp án A đúng vì trong cấu hình JSON Schema dành cho LLM, trường \"description\" đóng vai trò là chỉ dẫn ngữ nghĩa (semantic instruction) trực tiếp cho mô hình. Bổ sung đơn vị đo lường (miligiây) vào description giúp LLM hiểu đúng đơn vị cần xuất ra mà không làm thay đổi kiểu dữ liệu số integer của schema.\\n\\nĐáp án B sai vì ràng buộc \"minimum\": 1000 chỉ chặn giá trị nhỏ ở mức cú pháp validation chứ không cung cấp bối cảnh ngữ nghĩa cho LLM, khiến mô hình có thể bị lỗi validation thay vì chủ động tạo ra số miligiây đúng.\\n\\nĐáp án C sai vì việc đổi sang dạng chuỗi với hậu tố \"ms\" làm phá vỡ hợp đồng kiểu dữ liệu integer của downstream system và bắt buộc phải bổ sung logic parse chuỗi không cần thiết.\\n\\nĐáp án D sai vì bật additionalProperties: true làm giảm tính nghiêm ngặt của schema và không đảm bảo LLM sẽ luôn sinh trường unit theo đúng chuẩn.",
    "scenarioSignature": {
      "testedPrinciple": "property description unit disambiguation",
      "failureMode": "downstream system unit mismatch false alert",
      "rootCause": "missing json schema description keyword for numeric units",
      "requiredFix": "add explicit unit specification in property description field"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  },
  {
    "id": "d4-b11-4.8-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-006",
    "questionEN": "An enterprise data ingestion service validates structured JSON outputs from an LLM using an automated JSON Schema validator. The schema header contains \"$schema\": \"http://json-schema.org/draft-04/schema#\" while using keywords such as \"const\" and numeric \"exclusiveMinimum\": 0, which were standardized in Draft 07. Consequently, the validator engine silently skips these validation rules or throws dialect mismatch warnings, leading to unvalidated invalid payloads reaching the database. What is the root cause and correct resolution?",
    "question": "[d4-b11-4.8-006] Một dịch vụ nạp dữ liệu doanh nghiệp xác thực đầu ra JSON từ LLM bằng công cụ kiểm tra JSON Schema tự động. Header của schema khai báo \"$schema\": \"http://json-schema.org/draft-04/schema#\", nhưng nội dung schema lại sử dụng các từ khóa như \"const\" và \"exclusiveMinimum\": 0 (dạng số), vốn chỉ được chuẩn hóa từ Draft 07. Kết quả là trình kiểm tra lặng lẽ bỏ qua các quy tắc này hoặc cảnh báo xung đột phiên bản, khiến dữ liệu không hợp lệ lọt vào cơ sở dữ liệu. Nguyên nhân gốc rễ và giải pháp xử lý đúng là gì?",
    "optionsEN": [
      "A. The schema lacks \"additionalProperties\": false, causing the validator engine to ignore keyword constraints across nested objects.",
      "B. The \"$schema\" URI targets Draft 04 while the schema uses Draft 07 keywords, requiring updating \"$schema\" to \"http://json-schema.org/draft-07/schema#\" to align keyword interpretation.",
      "C. The validator library requires replacing \"$schema\" with a custom \"$id\" URI parameter to force offline validation mode.",
      "D. The LLM API strips schema metadata headers before generation, so \"$schema\" must be moved inside the \"properties\" dictionary."
    ],
    "options": [
      "A. Schema thiếu cấu hình \"additionalProperties\": false, khiến trình kiểm tra bỏ qua các thuộc tính kiểm tra từ khóa trong đối tượng con.",
      "B. Trường \"$schema\" URI đang trỏ đến Draft 04 trong khi schema dùng từ khóa của Draft 07, cần cập nhật URI thành \"http://json-schema.org/draft-07/schema#\" để thống nhất cách giải thích từ khóa.",
      "C. Thư viện kiểm tra yêu cầu thay thế \"$schema\" bằng thuộc tính \"$id\" URI tùy chỉnh để ép buộc chế độ kiểm tra ngoại tuyến (offline validation mode).",
      "D. API của LLM tự động loại bỏ các header thuộc tính schema trước khi sinh dữ liệu, nên cần chuyển \"$schema\" vào bên trong đối tượng \"properties\"."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because missing additionalProperties controls unexpected property keys, but does not fix keyword interpretation mismatches caused by targeting an older draft URI.",
      "Option B is correct because the $schema keyword explicitly specifies the JSON Schema meta-schema dialect; updating the URI to Draft 07 ensures keywords like const and numeric exclusiveMinimum are correctly parsed and enforced by the validator engine.",
      "Option C is incorrect because $id specifies the schema's canonical URI identifier, whereas $schema defines the meta-schema vocabulary version; changing $id does not resolve keyword specification mismatch.",
      "Option D is incorrect because $schema belongs at the root level of the schema document for validator engine meta-parsing, not inside the properties object."
    ],
    "rationale": "Updating the $schema meta-schema URI to Draft 07 aligns the validator engine dialect with the keywords used in the schema document, ensuring syntax rules are correctly recognized and enforced.",
    "explanation": "Đáp án B đúng vì từ khóa \"$schema\" quy định dialect (phiên bản chuẩn meta-schema) mà validator engine áp dụng để phân tích cú pháp. Việc khai báo URI Draft 04 nhưng dùng từ khóa Draft 07 (như const hay exclusiveMinimum dưới dạng số) làm cho validator không nhận diện hoặc xử lý sai lệch. Cập nhật URI sang Draft 07 giúp validator áp dụng đúng bộ quy tắc tương ứng.\\n\\nĐáp án A sai vì additionalProperties điều khiển việc cho phép/chấm dứt các trường bổ sung ngoài khai báo, không giải quyết vấn đề hiểu sai cú pháp từ khóa do lệch draft version.\\n\\nĐáp án C sai vì thuộc tính \"$id\" chỉ định danh danh tính của schema trong không gian tên, chứ không xác định phiên bản cú pháp (meta-schema) như \"$schema\".\\n\\nĐáp án D sai vì trường \"$schema\" bắt buộc nằm ở cấp gốc (root level) của JSON Schema để validator engine đọc thông tin phiên bản dialect trước khi parse toàn bộ schema.",
    "scenarioSignature": {
      "testedPrinciple": "json schema draft version keyword dialect alignment",
      "failureMode": "silent validation bypass and keyword dialect mismatch warning",
      "rootCause": "schema header meta-schema URI pointing to incompatible draft version",
      "requiredFix": "update schema meta-schema URI to match keyword draft version"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  }
]