[
  {
    "id": "d4-b09-new-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-007",
    "questionEN": "A commercial real estate management system, EstateFlow, extracts property listing details using JSON Schema structured outputs. In the schema, tenant_name is defined as {\"type\": \"string\"} and listed in required. When processing vacant office spaces where no active lease exists, the model routinely outputs \"TBD\" or \"Vacant\" to satisfy the mandatory string type constraint, corrupting SQL queries that filter for active tenants. Which schema modification prevents placeholder generation while ensuring vacant properties pass validation?",
    "question": "[d4-b09-new-007] Một hệ thống quản lý bất động sản thương mại, EstateFlow, trích xuất chi tiết tin đăng bằng JSON Schema structured output. Trong schema, tenant_name được định nghĩa là {\"type\": \"string\"} và có tên trong mảng required. Khi xử lý các văn phòng đang trống không có hợp đồng thuê, mô hình thường xuyên tạo ra chuỗi \"TBD\" hoặc \"Vacant\" để thỏa mãn ràng buộc kiểu string bắt buộc, làm sai lệch các truy vấn SQL lọc người thuê đang hoạt động. Sự thay đổi schema nào giúp ngăn chặn việc tạo dữ liệu giữ chỗ trong khi vẫn đảm bảo danh sách bất động sản trống vượt qua kiểm tra hợp lệ?",
    "optionsEN": [
      "A. Remove tenant_name from the required array entirely so the model omits the key when no tenant is listed in the document.",
      "B. Add \"default\": \"N/A\" to the tenant_name schema property while leaving the type definition as {\"type\": \"string\"}.",
      "C. Change tenant_name type definition to {\"type\": [\"string\", \"null\"]} and maintain tenant_name inside the required array.",
      "D. Set additionalProperties: false at the top level of the JSON Schema to prevent the model from introducing unknown string values."
    ],
    "options": [
      "A. Xóa hoàn toàn tenant_name khỏi mảng required để mô hình bỏ qua khóa này khi không có người thuê trong tài liệu.",
      "B. Thêm \"default\": \"N/A\" vào thuộc tính schema tenant_name trong khi vẫn giữ nguyên định nghĩa kiểu là {\"type\": \"string\"}.",
      "C. Thay đổi định nghĩa kiểu của tenant_name thành {\"type\": [\"string\", \"null\"]} và giữ tenant_name bên trong mảng required.",
      "D. Đặt additionalProperties: false ở cấp cao nhất của JSON Schema để ngăn mô hình đưa vào các giá trị chuỗi không xác định."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Removing tenant_name from required allows the model to omit the key entirely, causing schema inconsistency in downstream SQL query mappers.",
      "Option B is incorrect: Adding a schema default does not prevent model hallucination of text like \"TBD\" because default values in JSON Schema are not enforced during LLM generation.",
      "Option C is correct: Updating tenant_name to {\"type\": [\"string\", \"null\"]} while keeping it in required forces the model to emit {\"tenant_name\": null} for vacant spaces.",
      "Option D is incorrect: Setting additionalProperties: false prevents undeclared keys but does not stop valid declared string fields from receiving unwanted placeholder values."
    ],
    "rationale": "By updating the JSON Schema to include \"null\" in the allowed types ({\"type\": [\"string\", \"null\"]}) and keeping tenant_name in the required array, the model is explicitly instructed that null is a valid response when no active tenant exists. This eliminates the pressure to hallucinate placeholder strings like \"TBD\" while ensuring deterministic schema validation.",
    "explanation": "Lựa chọn A không đúng vì việc xóa tenant_name khỏi mảng required cho phép mô hình bỏ qua khóa này hoàn toàn, dẫn đến sự không đồng nhất trong hệ thống downstream khi không phân biệt được giữa dữ liệu bị thiếu và dữ liệu không áp dụng.\\nLựa chọn B không đúng vì thuộc tính default trong JSON Schema không được mô hình LLM tự động áp dụng hoặc tuân thủ trong quá trình sinh dữ liệu structured output.\\nLựa chọn C là ĐÚNG vì khai báo {\"type\": [\"string\", \"null\"]} và giữ tenant_name trong mảng required sẽ cho phép mô hình trả về giá trị null hợp lệ khi bất động sản còn trống, ngăn chặn việc mô hình tự bịa ra các chuỗi tạm như \"TBD\".\\nLựa chọn D không đúng vì additionalProperties: false chỉ ngăn mô hình thêm các trường không được định nghĩa trong schema, chứ không hạn chế giá trị của trường tenant_name đã có.",
    "scenarioSignature": {
      "testedPrinciple": "nullable json schema type enforcement for absent entity fields",
      "failureMode": "placeholder string generation when non-nullable required field lacks source data",
      "rootCause": "string schema constraint without null option forcing arbitrary non-empty value",
      "requiredFix": "configure field type as union with null and retain in required list"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-008",
    "questionEN": "CarePulse intake service parses patient referral forms into structured JSON. The schema defines referring_physician_npi with {\"type\": \"string\", \"pattern\": \"^[0-9]{10}$\"} inside the required list. During self-referral intake where no doctor referred the patient, the model fabricates a synthetic 10-digit NPI number to satisfy regex constraints, triggering insurance claim rejections. What is the correct schema fix to eliminate NPI fabrication for self-referrals?",
    "question": "[d4-b09-new-008] Dịch vụ tiếp nhận bệnh nhân CarePulse phân tích mẫu giới thiệu y tế thành JSON có cấu trúc. Schema định nghĩa referring_physician_npi với {\"type\": \"string\", \"pattern\": \"^[0-9]{10}$\"} trong danh sách required. Trong trường hợp bệnh nhân tự đến khám (không có bác sĩ giới thiệu), mô hình đã tự tạo ra một mã NPI 10 chữ số giả để thỏa mãn biểu thức chính quy (regex), dẫn đến việc yêu cầu thanh toán bảo hiểm bị từ chối. Đâu là giải pháp chỉnh sửa schema đúng để loại bỏ việc bịa đặt mã NPI khi bệnh nhân tự giới thiệu?",
    "optionsEN": [
      "A. Remove referring_physician_npi from the schema required list so the model omits the key for self-referrals.",
      "B. Modify the regex pattern to ^[0-9]{0,10}$ to allow an empty string \"\" while maintaining string type.",
      "C. Add system prompt instructions stating: \"If self - referral, do not include referring_physician_npi in the JSON output.\"",
      "D. Update the field schema to {\"oneOf\": [{\"type\": \"string\", \"pattern\": \"^[0-9]{10}$\"}, {\"type\": \"null\"}]} and keep referring_physician_npi in the required array."
    ],
    "options": [
      "A. Xóa referring_physician_npi khỏi danh sách required của schema để mô hình bỏ qua khóa này đối với trường hợp tự đến khám.",
      "B. Sửa đổi biểu thức regex thành ^[0-9]{0,10}$ để cho phép chuỗi rỗng \"\" trong khi vẫn giữ nguyên kiểu string.",
      "C. Thêm hướng dẫn trong system prompt: \"Nếu bệnh nhân tự giới thiệu, không đưa referring_physician_npi vào đầu ra JSON.\"",
      "D. Cập nhật schema của trường thành {\"oneOf\": [{\"type\": \"string\", \"pattern\": \"^[0-9]{10}$\"}, {\"type\": \"null\"}]} và giữ referring_physician_npi trong mảng required."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Omitting the field from required allows unpredictable key omission, creating payload inconsistency for downstream claim processors expecting explicit keys.",
      "Option B is incorrect: Allowing empty string \"\" violates clean data typing where absent references must be null, and risks model hallucination of valid-length numeric strings.",
      "Option C is incorrect: System prompt instructions cannot override strict JSON Schema requirements when the field remains mandatory in the required array.",
      "Option D is correct: Configuring oneOf with regex string or null type while keeping referring_physician_npi required forces explicit null output for self-referrals."
    ],
    "rationale": "When a field has a strict regex pattern constraint like a 10-digit NPI number, the model will synthesize fake digits to avoid validation errors if the real value is absent. Using oneOf to allow either the valid regex string OR null, combined with keeping the field in required, forces the model to output null deterministically for self-referrals.",
    "explanation": "Lựa chọn A không đúng vì việc xóa trường khỏi required sẽ khiến mô hình bỏ qua thuộc tính một cách không dự đoán được, khiến hệ thống xử lý bảo hiểm không phân biệt được giữa lỗi thiếu thông tin và trường hợp tự đến khám.\\nLựa chọn B không đúng vì việc cho phép chuỗi rỗng \"\" không đúng chuẩn thiết kế dữ liệu (chuỗi rỗng khác với giá trị null) và vẫn có rủi ro mô hình sinh chuỗi số giả để khớp độ dài.\\nLựa chọn C không đúng vì chỉ dùng câu lệnh trong system prompt không thể ghi đè ràng buộc cứng của JSON Schema nếu danh sách required vẫn bắt buộc trường đó.\\nLựa chọn D là ĐÚNG vì cấu hình oneOf cho phép trường nhận giá trị chuỗi 10 chữ số HOẶC giá trị null, kết hợp giữ trường trong mảng required buộc mô hình xuất ra {\"referring_physician_npi\": null} một cách minh bạch cho trường hợp tự giới thiệu.",
    "scenarioSignature": {
      "testedPrinciple": "explicit nullability pattern matching for conditional entity identifiers",
      "failureMode": "synthetic identifier fabrication when mandatory pattern constraint lacks null option",
      "rootCause": "strict regex constraint without null alternative forcing compliance with fake string",
      "requiredFix": "wrap schema with union or oneOf allowing null type while maintaining required inclusion"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]