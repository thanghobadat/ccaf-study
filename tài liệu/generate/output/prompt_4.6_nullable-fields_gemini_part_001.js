[
  {
    "id": "d4-b09-new-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-001",
    "scenarioSignature": {
      "testedPrinciple": "Nullable required schema fields prevent hallucination of non-applicable values",
      "failureMode": "Model fabricates domain code when required string field is not applicable",
      "rootCause": "Schema requires string type without allowing null for missing diagnostic context",
      "requiredFix": "Define field as nullable string and include it in required array"
    },
    "questionEN": "An EHR ingestion pipeline uses Claude 3.5 Sonnet to extract structured JSON data from clinical chart notes. The JSON Schema defines diagnostic_code as \"type\": \"string\" and lists it in the required array. During routine wellness visits where no diagnosis applies, the system experiences a 14% billing error rate because the model fabricates valid ICD-10 codes (such as Z00.00) to fulfill the schema constraint. Which schema modification reliably prevents diagnostic code hallucination while ensuring downstream processors explicitly recognize non-applicable cases?",
    "question": "[d4-b09-new-001] Một đường ống xử lý dữ liệu EHR sử dụng Claude 3.5 Sonnet để trích xuất dữ liệu JSON từ ghi chú lâm sàng. JSON Schema định nghĩa diagnostic_code là \"type\": \"string\" và liệt kê nó trong mảng required. Trong các lần khám sức khỏe định kỳ không có mã bệnh lý phù hợp, hệ thống gặp tỷ lệ lỗi thanh toán 14% do mô hình tự tạo mã ICD-10 giả (như Z00.00) để thỏa mãn ràng buộc schema. Thay đổi schema nào sau đây giúp ngăn chặn triệt để hành vi bịa đặt mã chẩn đoán đồng thời đảm bảo hệ thống xử lý phía sau nhận biết rõ ràng các trường hợp không áp dụng?",
    "optionsEN": [
      "A. Change diagnostic_code schema to \"type\": [\"string\", \"null\"] while keeping it in required, allowing the model to return explicit null for wellness visits.",
      "B. Remove diagnostic_code from the schema's required array so the model omits the key completely when no diagnosis is recorded.",
      "C. Add default: \"N/A\" to the diagnostic_code schema definition so the model automatically falls back to string defaults.",
      "D. Set additionalProperties: false on the root object schema to block the model from generating optional clinical fields."
    ],
    "options": [
      "A. Thay đổi schema của diagnostic_code thành \"type\": [\"string\", \"null\"] và giữ nguyên trong mảng required, cho phép mô hình trả về null rõ ràng cho các lần khám định kỳ.",
      "B. Loại bỏ diagnostic_code khỏi mảng required của schema để mô hình bỏ qua khóa này hoàn toàn khi không có chẩn đoán nào được ghi nhận.",
      "C. Thêm default: \"N/A\" vào định nghĩa schema diagnostic_code để mô hình tự động chuyển về giá trị mặc định kiểu chuỗi.",
      "D. Thiết lập additionalProperties: false ở root object schema để chặn mô hình sinh ra các trường lâm sàng không bắt buộc."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because configuring diagnostic_code with \"type\": [\"string\", \"null\"] and maintaining it inside required instructs the model that returning null is valid syntax, resolving the hallucination without omitting the key.",
      "Option B is incorrect because removing the field from required permits omission, which results in unpredictable model behavior where it may still fabricate ICD-10 codes or break downstream parsers expecting key presence.",
      "Option C is incorrect because JSON Schema default values are not strictly enforced during Claude token sampling, allowing the model to continue hallucinating realistic diagnostic strings.",
      "Option D is incorrect because additionalProperties: false restricts undeclared object properties but does not change how the model populates explicitly declared properties like diagnostic_code."
    ],
    "rationale": "In JSON Schema enforcement for LLMs, requiring a non-nullable string field when no real-world value applies forces the model to invent plausible string tokens (e.g., ICD-10 code Z00.00). By unioning the string type with null ([\"string\", \"null\"]) while leaving the field in required, the model is constrained to generate \"diagnostic_code\": null cleanly.",
    "explanation": "Trong việc kiểm soát đầu ra JSON Schema cho LLM, khi một trường được đánh dấu là required với kiểu dữ liệu \"string\" mà thực tế dữ liệu không có sẵn (như khám sức khỏe định kỳ), mô hình buộc phải bịa ra chuỗi hợp lệ (như mã ICD-10 Z00.00) để không vi phạm schema. Phương pháp giải quyết chuẩn kiến trúc là định nghĩa trường là kiểu nullable \"type\": [\"string\", \"null\"] đồng thời giữ trường đó trong mảng required. Điều này cho phép mô hình xuất giá trị null một cách hợp lệ và rõ ràng.\n- Đáp án A đúng vì kết hợp kiểu null và khai báo required giúp mô hình chủ động sinh \"diagnostic_code\": null khi không có chẩn đoán.\n- Đáp án B sai vì xóa khỏi required khiến mô hình có thể bỏ qua trường hoặc vẫn tiếp tục bịa ra mã tùy theo token sampling.\n- Đáp án C sai vì từ khóa default trong JSON Schema không được mô hình Claude tự động áp dụng bắt buộc khi sinh dữ liệu.\n- Đáp án D sai vì additionalProperties: false chỉ ngăn chặn các trường chưa được định nghĩa trong schema, không ảnh hưởng đến cách sinh giá trị cho trường diagnostic_code đã khai báo.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-002",
    "scenarioSignature": {
      "testedPrinciple": "Nullable types in schema prevent fabrication of missing optional attributes",
      "failureMode": "Model invents string promo code when optional field is absent",
      "rootCause": "Required string field schema lacks null variant for non-discounted transactions",
      "requiredFix": "Declare field as nullable union type and require explicit null output"
    },
    "questionEN": "An e-commerce order processing pipeline uses Claude 3.5 Sonnet to parse customer checkout transcripts into structured JSON. In the JSON Schema, coupon_code is defined as \"type\": \"string\" and included in the required list. On full-price purchases where no discount was applied, the system incurs a 22% checkout processing failure rate because the model invents promo codes (such as \"WELCOME10\" or \"DISCOUNT\") to satisfy the required non-null string type. How should the schema be modified to ensure the model outputs \"coupon_code\": null for full-price orders instead of inventing discount strings?",
    "question": "[d4-b09-new-002] Tự động hóa xử lý đơn hàng thương mại điện tử sử dụng Claude 3.5 Sonnet để chuyển đổi hội thoại thanh toán thành JSON cấu trúc. Trong JSON Schema, coupon_code được khai báo là \"type\": \"string\" và nằm trong danh sách required. Với các đơn hàng nguyên giá không dùng giảm giá, hệ thống chịu tỷ lệ lỗi xử lý 22% do mô hình tự bịa ra mã khuyến mãi (như \"WELCOME10\" hoặc \"DISCOUNT\") nhằm đáp ứng kiểu chuỗi không được null. Schema cần được chỉnh sửa thế nào để đảm bảo mô hình trả về \"coupon_code\": null cho đơn hàng nguyên giá thay vì tự tạo mã giảm giá?",
    "optionsEN": [
      "A. Set additionalProperties: false on the order schema to stop the model from generating unrequested coupon strings.",
      "B. Define coupon_code as \"type\": [\"string\", \"null\"] (or \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]) and retain coupon_code in the required array.",
      "C. Remove coupon_code from the required array so the model omits the key whenever a discount is absent.",
      "D. Specify \"default\": null inside the coupon_code property schema while keeping \"type\": \"string\"."
    ],
    "options": [
      "A. Thiết lập additionalProperties: false trong schema đơn hàng để dừng mô hình tự sinh các chuỗi coupon không được yêu cầu.",
      "B. Khai báo coupon_code có kiểu \"type\": [\"string\", \"null\"] (hoặc \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]) và giữ nguyên coupon_code trong mảng required.",
      "C. Loại bỏ coupon_code khỏi mảng required để mô hình chủ động bỏ qua khóa này khi đơn hàng không có giảm giá.",
      "D. Chỉ định \"default\": null bên trong thuộc tính coupon_code nhưng giữ nguyên \"type\": \"string\"."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because additionalProperties: false only prevents properties not defined in the schema, whereas coupon_code is already a defined property.",
      "Option B is correct because configuring coupon_code as \"type\": [\"string\", \"null\"] while keeping it required explicitly instructs the model that null is a valid payload when no coupon was applied.",
      "Option C is incorrect because making coupon_code optional via removal from required permits key omission, which leads to inconsistent model outputs where it may still invent promo strings.",
      "Option D is incorrect because \"default\": null violates the \"type\": \"string\" definition in strict JSON Schema validation and does not force the model to choose null during token sampling."
    ],
    "rationale": "When a field like coupon_code is mandatory (required) and non-nullable (type: \"string\"), the LLM will hallucinate realistic string values when no actual code exists in the input context. Allowing null via \"type\": [\"string\", \"null\"] while keeping the property in required signals to the LLM that emitting null satisfies the schema constraint.",
    "explanation": "Khi một trường như coupon_code bắt buộc xuất hiện (required) nhưng chỉ nhận kiểu chuỗi (type: \"string\"), LLM sẽ tự động bịa ra chuỗi hợp lệ (như WELCOME10) nếu dữ liệu đầu vào không có thông tin giảm giá. Việc mở rộng kiểu dữ liệu thành nullable \"type\": [\"string\", \"null\"] kết hợp việc duy trì trong mảng required cho phép mô hình xuất giá trị null rõ ràng và chính xác cho các đơn hàng nguyên giá.\n- Đáp án A sai vì additionalProperties: false chỉ cấm các trường ngoài định nghĩa schema, không ảnh hưởng đến trường coupon_code đã định nghĩa.\n- Đáp án B đúng vì việc khai báo kiểu nullable và giữ trong required bắt buộc mô hình trả về \"coupon_code\": null khi không có mã giảm giá.\n- Đáp án C sai vì loại bỏ khỏi required làm cho thuộc tính có thể bị bỏ qua, nhưng không ngăn được mô hình vẫn tiếp tục tự tạo ra giá trị ngẫu nhiên.\n- Đáp án D sai vì chỉ định \"default\": null cho một thuộc tính có \"type\": \"string\" gây ra lỗi vi phạm kiểu trong JSON Schema và không bắt buộc mô hình chọn null khi sinh chuỗi.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]