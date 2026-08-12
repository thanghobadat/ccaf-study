[
  {
    "id": "d4-b09-B-015",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-015",
    "scenarioSignature": {
      "testedPrinciple": "required array inclusion for nullable fields",
      "failureMode": "omitted optional keys causing validation pipeline ambiguity",
      "rootCause": "un-required optional schema fields allowing structural key omission",
      "requiredFix": "enforce nullable types and complete required list inclusion"
    },
    "questionEN": "An enterprise document extraction pipeline processes 500 PDF invoices where approximately 8% of documents lack a purchase order number. When extracting structured JSON using Claude, the model frequently omits the po_number key entirely ({}) rather than returning null, causing 40 downstream validation pipeline failures due to missing key errors. How should the JSON Schema be designed to ensure reliable, deterministic multi-round extraction validation?",
    "question": "[d4-b09-B-015] Một pipeline trích xuất tài liệu doanh nghiệp xử lý 500 hóa đơn PDF, trong đó khoảng 8% tài liệu không có số đơn đặt hàng (po_number). Khi trích xuất JSON cấu trúc bằng Claude, mô hình thường xuyên bỏ qua hoàn toàn khóa po_number ({}) thay vì trả về null, dẫn đến 40 thất bại trong pipeline xác thực downstream do lỗi thiếu khóa. Nền tảng thiết kế JSON Schema nào sẽ đảm bảo việc xác thực trích xuất nhiều vòng diễn ra tin cậy và nhất quán?",
    "optionsEN": [
      "A. Set additionalProperties: true in the JSON Schema so downstream validators accept objects with variable key structures across extraction rounds.",
      "B. Implement a Python post-extraction step that automatically populates missing keys with an empty string \"\" prior to schema validation.",
      "C. Define po_number as \"type\": [\"string\", \"null\"] and list po_number in the schema's required array to force an explicit null output.",
      "D. Remove all fields from the required array and configure an automated prompt retry loop whenever a key is absent in the raw JSON response."
    ],
    "options": [
      "A. Thiết lập additionalProperties: true trong JSON Schema để các trình xác thực downstream chấp nhận các đối tượng có cấu trúc khóa thay đổi qua các vòng trích xuất.",
      "B. Triển khai bước hậu xử lý bằng Python tự động điền chuỗi rỗng \"\" cho các khóa bị thiếu trước khi thực hiện xác thực schema.",
      "C. Định nghĩa po_number có \"type\": [\"string\", \"null\"] và liệt kê po_number trong mảng required của schema để bắt buộc đầu ra null rõ ràng.",
      "D. Loại bỏ tất cả các trường khỏi mảng required và cấu hình vòng lặp thử lại prompt tự động bất cứ khi nào thiếu khóa trong phản hồi JSON thô."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Setting additionalProperties: true permits unspecified fields but does not force the model to output omitted optional keys, failing to resolve the missing key errors in the 8% of documents.",
      "Option B is incorrect: Substituting missing keys with empty strings (\"\") conflates missing/unapplicable data (null) with empty text values (\"\"), corrupting downstream database analytics.",
      "Option C is correct: Defining \"type\": [\"string\", \"null\"] while including po_number in required forces Claude to output {\"po_number\": null} explicitly when data is absent, enabling deterministic downstream validation across all 500 documents.",
      "Option D is incorrect: Removing required constraints exacerbates key omission, while automated prompt retry loops waste API tokens and latency without guaranteeing schema compliance."
    ],
    "rationale": "To achieve deterministic extraction across large document batches where certain fields are missing in ~8% of cases, optional fields must be declared as nullable (\"type\": [\"string\", \"null\"]) and explicitly included in the required array. This forces Claude to emit {\"field\": null} rather than omitting the key ({}), allowing downstream pipelines to validate schema compliance reliably.",
    "explanation": "Đáp án đúng là C.\n\n- Option A sai: Việc đặt additionalProperties: true cho phép chấp nhận các khóa không được định nghĩa trước, nhưng không ép buộc mô hình phải xuất ra khóa bị thiếu, do đó không giải quyết được lỗi thiếu khóa trong 8% tài liệu.\n- Option B sai: Việc thay thế khóa bị thiếu bằng chuỗi rỗng \"\" làm nhầm lẫn giữa dữ liệu không tồn tại/không áp dụng (null) với dữ liệu là chuỗi văn bản rỗng (\"\"), làm sai lệch ngữ nghĩa dữ liệu trong cơ sở dữ liệu downstream.\n- Option C đúng: Việc kết hợp \"type\": [\"string\", \"null\"] và đưa po_number vào mảng required bắt buộc Claude phải xuất ra {\"po_number\": null} một cách rõ ràng khi thiếu dữ liệu, giúp pipeline xác thực downstream hoạt động định hình và nhất quán trên toàn bộ 500 tài liệu.\n- Option D sai: Loại bỏ mảng required làm tăng tình trạng bỏ sót khóa, trong khi việc retry tự động gây tốn chi phí token và tăng độ trễ mà không đảm bảo mô hình sẽ xuất ra đúng cấu trúc schema.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-016",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-016",
    "scenarioSignature": {
      "testedPrinciple": "selective application of required nullable pattern",
      "failureMode": "schema over-engineering and unnecessary type loosening",
      "rootCause": "indiscriminate nullability enforcement on strictly present fields",
      "requiredFix": "restrict nullable required pattern to truly context-dependent fields"
    },
    "questionEN": "A software architecture team applied the required + nullable pattern (\"type\": [\"string\", \"null\"] listed in required) to all 12 metadata fields in an API log extraction schema. However, production telemetry reveals that 6 of these fields (such as timestamp, trace_id, and service_name) are guaranteed to be present in 100% of event logs. What is the technical consequence of this over-engineered schema design, and how should it be refactored?",
    "question": "[d4-b09-B-016] Một đội ngũ kiến trúc phần mềm đã áp dụng mô hình required + nullable (\"type\": [\"string\", \"null\"] nằm trong mảng required) cho toàn bộ 12 trường dữ liệu siêu dữ liệu (metadata) trong schema trích xuất log API. Tuy nhiên, dữ liệu đo đạc sản xuất cho thấy 6 trong số các trường này (như timestamp, trace_id, và service_name) luôn luôn hiện diện trong 100% log sự kiện. Hậu quả kỹ thuật của việc thiết kế schema quá đà (over-engineered) này là gì, và nó nên được tái cấu trúc như thế nào?",
    "optionsEN": [
      "A. Remove all 12 fields from the required array and make them plain optional strings to minimize schema validation strictness.",
      "B. Convert all 12 fields into oneOf schema definitions to dynamically support string and null types at runtime.",
      "C. Move the 6 guaranteed fields into additionalProperties so they are excluded from formal schema enforcement.",
      "D. Reserve \"type\": [\"string\", \"null\"] in required only for the 6 contextually optional fields, while specifying strictly non-nullable types (e.g., \"type\": \"string\") in required for the 6 guaranteed fields."
    ],
    "options": [
      "A. Loại bỏ toàn bộ 12 trường khỏi mảng required và chuyển chúng thành các chuỗi tùy chọn đơn giản để giảm bớt tính nghiêm ngặt khi xác thực schema.",
      "B. Chuyển đổi cả 12 trường thành định nghĩa schema oneOf để hỗ trợ động cả kiểu chuỗi và kiểu null tại thời điểm thực thi (runtime).",
      "C. Chuyển 6 trường chắc chắn có mặt vào additionalProperties để chúng không cần phải thực thi xác thực schema chính thức.",
      "D. Chỉ giữ lại \"type\": [\"string\", \"null\"] trong required cho 6 trường thực sự có thể thiếu, đồng thời chỉ định kiểu không-nullable nghiêm ngặt (như \"type\": \"string\") trong required cho 6 trường chắc chắn luôn hiện diện."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Removing required constraints reintroduces key omission ambiguity for the optional fields and weakens structural guarantees for mandatory system fields.",
      "Option B is incorrect: Using oneOf for all fields adds schema complexity and retains unnecessary nullability on guaranteed fields without providing type precision.",
      "Option C is incorrect: Moving guaranteed fields to additionalProperties bypasses schema validation entirely, breaking type safety for core system attributes.",
      "Option D is correct: Restricting the required + nullable pattern strictly to fields that can actually be missing maintains explicit null signaling where needed while enforcing strong non-null typing (\"type\": \"string\") and preventing over-engineering for guaranteed fields."
    ],
    "rationale": "Applying the required nullable pattern indiscriminately across fields that are statically guaranteed to exist creates schema over-engineering, unnecessarily relaxes type safety, and forces downstream consumers to write redundant null checks. Schema design should apply \"type\": [\"string\", \"null\"] inside required only to context-dependent optional fields, while enforcing strict non-nullable types for fields guaranteed to be present.",
    "explanation": "Đáp án đúng là D.\n\n- Option A sai: Loại bỏ mảng required sẽ làm tái diễn tình trạng bỏ sót khóa đối với các trường tùy chọn và làm yếu đi cam kết cấu trúc đối với các trường hệ thống bắt buộc.\n- Option B sai: Việc sử dụng oneOf cho tất cả các trường chỉ làm tăng độ phức tạp của schema và giữ lại tính chất null không cần thiết trên các trường chắc chắn có mặt mà không cải thiện độ chính xác kiểu dữ liệu.\n- Option C sai: Chuyển các trường chắc chắn có mặt vào additionalProperties sẽ bỏ qua hoàn toàn việc xác thực schema, làm hỏng tính an toàn kiểu dữ liệu (type safety) cho các thuộc tính hệ thống cốt lõi.\n- Option D đúng: Chỉ áp dụng mô hình required + nullable cho những trường thực sự có thể thiếu giúp duy trì tín hiệu null rõ ràng khi cần thiết, đồng thời áp đặt kiểu dữ liệu không-null nghiêm ngặt (\"type\": \"string\") trong mảng required cho các trường luôn hiện diện, tránh việc over-engineering schema và loại bỏ các kiểm tra null thừa thãi ở downstream.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]