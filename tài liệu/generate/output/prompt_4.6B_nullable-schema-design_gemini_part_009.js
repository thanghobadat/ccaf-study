[
  {
    "id": "d4-b09-B-017",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-017",
    "questionEN": "A telecommunications subscription service uses Claude to extract plan parameters into JSON. Originally, roaming_pass_id was optional (type: \"string\"). The downstream Node.js consumer used if (result.roaming_pass_id !== undefined) to detect if a roaming pass existed. To prevent hallucinated pass IDs, the team updated the schema so roaming_pass_id is required and nullable (type: [\"string\", \"null\"]). When processing plans without roaming, the pipeline crashes with TypeError: Cannot read properties of null. Why did this failure occur?",
    "question": "[d4-b09-B-017] Một dịch vụ đăng ký viễn thông sử dụng Claude để trích xuất các tham số gói cước sang JSON. Ban đầu, roaming_pass_id là trường tùy chọn (type: \"string\"). Dịch vụ xử lý downstream viết bằng Node.js dùng if (result.roaming_pass_id !== undefined) để kiểm tra sự tồn tại của gói chuyển vùng. Để tránh mô hình tự tạo ID gói, nhóm phát triển đã cập nhật schema để roaming_pass_id trở thành bắt buộc và có thể nullable (type: [\"string\", \"null\"]). Khi xử lý các gói không có chuyển vùng, pipeline bị sập với lỗi TypeError: Cannot read properties of null. Tại sao sự cố này xảy ra?",
    "optionsEN": [
      "A. The schema change guarantees roaming_pass_id is present as null when inactive, causing !== undefined to evaluate to true and pass null into code expecting a string.",
      "B. JavaScript's strict inequality operator automatically coerces null to undefined, leading to unhandled logic branches in downstream utilities.",
      "C. Claude ignores the required array when a field is nullable, causing result.roaming_pass_id to randomly evaluate to undefined.",
      "D. JSON.parse() converts JSON null literals directly into JavaScript undefined, bypassing the conditional check entirely."
    ],
    "options": [
      "A. Thay đổi schema đảm bảo roaming_pass_id luôn xuất hiện dưới dạng null khi không kích hoạt, khiến phép so sánh !== undefined trả về true và truyền null vào đoạn mã chờ nhận chuỗi.",
      "B. Toán tử so sánh nghiêm ngặt của JavaScript tự động ép kiểu null thành undefined, dẫn đến việc bỏ qua các nhánh xử lý lỗi downstream.",
      "C. Claude bỏ qua mảng required khi một trường có kiểu nullable, khiến result.roaming_pass_id xuất hiện ngẫu nhiên dưới dạng undefined.",
      "D. Hàm JSON.parse() tự động chuyển đổi giá trị JSON null thành undefined trong JavaScript, làm vô hiệu hóa điều kiện kiểm tra."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: When roaming_pass_id is promoted to required with type [\"string\", \"null\"], Claude outputs {\"roaming_pass_id\": null} instead of omitting the key. In JS, null !== undefined evaluates to true, executing the conditional block where calling string methods on null triggers a TypeError.",
      "Option B is incorrect: Strict inequality (!==) does not perform type coercion; null and undefined are distinct primitive values in JavaScript.",
      "Option C is incorrect: Claude adheres to JSON Schema required constraints during structured output generation, ensuring the field key is always emitted.",
      "Option D is incorrect: JSON.parse() parses JSON null values into JavaScript null primitives, not undefined."
    ],
    "rationale": "Promoting an optional field to a required nullable field alters the output JSON structure from key omission (which evaluates to undefined in JS) to explicit key presence with a null value. Conditional checks relying solely on field !== undefined evaluate to true for null, leading downstream logic to attempt property access on null.",
    "explanation": "Trong JavaScript, null và undefined là hai giá trị primitive khác nhau. Phép so sánh result.roaming_pass_id !== undefined trả về true khi roaming_pass_id có giá trị null. Khi trường được đổi từ tùy chọn sang bắt buộc+nullable, Claude sẽ xuất {\"roaming_pass_id\": null} thay vì bỏ qua khóa đó. Kết quả là điều kiện if bị kích hoạt và mã nguồn thực thi các thao tác xử lý chuỗi trên null, dẫn đến lỗi runtime TypeError. Phương án A giải thích chính xác cơ chế này.",
    "scenarioSignature": {
      "testedPrinciple": "javascript strict inequality evaluation of null vs undefined in structured JSON responses",
      "failureMode": "downstream service runtime type error when handling required nullable fields",
      "rootCause": "checking undefined presence instead of explicit null value on required nullable response properties",
      "requiredFix": "update downstream conditional checks to validate non-null value before string property access"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-018",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-018",
    "questionEN": "An industrial equipment management platform upgraded its JSON Schema for asset inspection logs. In v1, calibration_certificate_id was optional (type: \"string\") and omitted from JSON output when uncalibrated. In v2, to enforce structured nulls, calibration_certificate_id was promoted to required and nullable (type: [\"string\", \"null\"]). However, running the v2 strict JSON Schema validator against historical v1 inspection records stored in PostgreSQL JSONB columns triggers widespread validation errors. What caused this backward compatibility failure?",
    "question": "[d4-b09-B-018] Một nền tảng quản lý thiết bị công nghiệp đã nâng cấp JSON Schema cho nhật ký kiểm định tài sản. Trong v1, calibration_certificate_id là tùy chọn (type: \"string\") và bị lược bỏ khỏi JSON output khi thiết bị chưa hiệu chuẩn. Trong v2, để bắt buộc xuất tín hiệu null rõ ràng, calibration_certificate_id được chuyển thành bắt buộc và nullable (type: [\"string\", \"null\"]). Tuy nhiên, khi chạy bộ kiểm tra v2 strict JSON Schema validator đối với các bản ghi kiểm định v1 lịch sử lưu trong cơ sở dữ liệu PostgreSQL (cột JSONB), hệ thống báo lỗi hàng loạt. Nguyên nhân dẫn đến sự cố tương thích ngược này là gì?",
    "optionsEN": [
      "A. Legacy v1 payloads automatically populate omitted keys as null during database retrieval, rendering schema validation redundant.",
      "B. Promoting an optional omitted field to required causes legacy payloads lacking the key to fail v2 validation, breaking backward compatibility.",
      "C. Strict JSON Schema v2 validators force historical string values to cast into null primitives, corrupting existing record indexes.",
      "D. Claude API endpoints reject historical JSON records included in few-shot prompts if their field names do not match v2 schema specifications."
    ],
    "options": [
      "A. Các payload v1 cũ tự động bổ sung các khóa bị thiếu dưới dạng null khi truy vấn từ cơ sở dữ liệu, khiến quá trình kiểm tra schema bị thừa.",
      "B. Việc chuyển một trường tùy chọn (vốn bị lược bỏ) thành bắt buộc khiến các payload lịch sử thiếu khóa đó không vượt qua được kiểm tra validation của v2.",
      "C. Bộ kiểm tra JSON Schema v2 ép kiểu các chuỗi ký tự cũ thành giá trị primitive null, làm hỏng các chỉ mục bản ghi hiện có.",
      "D. API Claude từ chối các bản ghi JSON lịch sử được đưa vào vài ví dụ (few-shot) nếu tên trường của chúng không khớp với đặc tả schema v2."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Standard JSON Schema validators inspect payload structure and do not automatically inject null for omitted properties unless explicit migration middleware is executed.",
      "Option B is correct: In v1, uncalibrated records omitted calibration_certificate_id entirely. When validated against v2 (where calibration_certificate_id is listed in required), strict validators reject legacy payloads for missing a required key, breaking backward compatibility.",
      "Option C is incorrect: Schema validation evaluates data structure without mutating existing stored string values.",
      "Option D is incorrect: Claude API prompt processing does not validate historical records in few-shot examples against output schemas; validation errors occur when application code validates stored v1 records against v2."
    ],
    "rationale": "Promoting a field from optional (omitted when absent) to required+nullable requires every compliant payload to include the key. Legacy serialized payloads produced under v1 lack the key completely, causing strict v2 schema validation to fail when processing historical records.",
    "explanation": "Khi một trường thay đổi từ tùy chọn (optional, bị bỏ qua khi không có dữ liệu) sang bắt buộc (required+nullable), mọi JSON payload tuân thủ v2 đều phải chứa khóa đó. Các bản ghi lịch sử v1 được tạo trước đó hoàn toàn không có khóa calibration_certificate_id. Do đó, khi đưa dữ liệu v1 qua bộ kiểm tra v2 strict JSON Schema validator, bộ kiểm tra sẽ báo lỗi thiếu trường bắt buộc (required property missing), làm phá vỡ tính tương thích ngược. Phương án B giải thích chính xác vấn đề này.",
    "scenarioSignature": {
      "testedPrinciple": "schema versioning backward compatibility when promoting optional fields to required nullable fields",
      "failureMode": "strict validation failure when parsing legacy serialized payloads under updated schema",
      "rootCause": "omitted properties in historical payloads failing required property checks in newer schema version",
      "requiredFix": "apply payload migration transformers or support versioned schema validation for historical records"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]