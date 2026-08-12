[
  {
    "id": "d4-b09-B-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-007",
    "scenarioSignature": {
      "testedPrinciple": "null vs empty string schema distinction",
      "failureMode": "empty string triggers downstream string length validation error",
      "rootCause": "empty string evaluated as string type violating minLength",
      "requiredFix": "explicitly set union type string null to allow valid null representation"
    },
    "questionEN": "An equipment inspection service uses Claude to parse field reports into structured JSON. The downstream ingestion service enforces a minLength: 5 rule on string fields to reject low-quality text. When an equipment item passes without any observed issues, the model outputs notes: \"\". This causes the downstream JSON validator to throw a validation error because an empty string of length 0 fails minLength: 5. Which JSON Schema configuration correctly handles items with no notes while allowing text notes to pass downstream string length validation?",
    "question": "[d4-b09-B-007] Một dịch vụ kiểm định thiết bị sử dụng Claude để phân tích báo cáo hiện trường thành JSON có cấu trúc. Dịch vụ nạp dữ liệu phía hạ nguồn áp dụng quy tắc minLength: 5 trên các trường chuỗi để loại bỏ văn bản chất lượng kém. Khi một thiết bị đạt kiểm định mà không có sự cố nào được ghi nhận, mô hình xuất ra notes: \"\". Điều này khiến trình xác thực JSON phía hạ nguồn báo lỗi vì chuỗi rỗng độ dài 0 vi phạm minLength: 5. Cấu hình JSON Schema nào xử lý đúng các mục không có ghi chú trong khi vẫn cho phép các ghi chú dạng văn bản vượt qua kiểm tra độ dài chuỗi?",
    "optionsEN": [
      "A. Remove minLength: 5 from downstream validation and allow empty strings for all text attributes in the schema.",
      "B. Define notes as \"type\": \"string\" with \"default\": \"\" so the model automatically defaults missing items to empty strings without validation errors.",
      "C. Define notes as \"type\": [\"string\", \"null\"] with minLength: 5 on the string schema, using null for items with no notes to bypass string length validation cleanly.",
      "D. Set notes as optional by removing it from the required array, allowing the model to omit the key completely when no notes exist."
    ],
    "options": [
      "A. Loại bỏ minLength: 5 khỏi quá trình xác thực phía hạ nguồn và cho phép chuỗi rỗng đối với tất cả các thuộc tính văn bản trong schema.",
      "B. Định nghĩa notes là \"type\": \"string\" với \"default\": \"\" để mô hình tự động mặc định các mục thiếu thành chuỗi rỗng mà không bị lỗi xác thực.",
      "C. Định nghĩa notes là \"type\": [\"string\", \"null\"] kết hợp minLength: 5, sử dụng null cho các mục không có ghi chú để bỏ qua kiểm tra độ dài chuỗi một cách hợp lệ.",
      "D. Đặt notes thành tùy chọn bằng cách xóa nó khỏi mảng required, cho phép mô hình bỏ qua khóa này hoàn toàn khi không có ghi chú."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because removing minLength disables string quality enforcement across all valid string notes, allowing single-character noise downstream rather than distinguishing missing notes.",
      "Option B is incorrect because setting default to empty string does not make null valid and still produces empty strings that fail downstream minLength checks when populated.",
      "Option C is correct because defining a union type of string and null allows the model to output null when no notes exist, which bypasses minLength string validation rules while ensuring present string notes satisfy minLength.",
      "Option D is incorrect because removing notes from required causes unpredictable field omission, leading to missing key errors downstream rather than an explicit null representation."
    ],
    "rationale": "In JSON Schema, string constraints like minLength only apply when the value is of type string. By declaring notes as {\"type\": [\"string\", \"null\"]}, a value of null explicitly signals 'no notes exist' without violating minLength: 5, whereas \"\" is evaluated as a string of length 0 and fails validation.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Đáp án A sai vì việc gỡ bỏ minLength: 5 sẽ vô hiệu hóa hoàn toàn cơ chế kiểm soát chất lượng dữ liệu văn bản, khiến các ghi chú ngắn hoặc nhiễu không bị lọc bỏ.\n- Đáp án B sai vì thiết lập default: \"\" vẫn tạo ra giá trị chuỗi rỗng \"\". Giá trị này vẫn mang kiểu dữ liệu string nên tiếp tục thất bại trước quy tắc minLength: 5 ở phía hạ nguồn.\n- Đáp án C đúng vì khi định nghĩa \"type\": [\"string\", \"null\"], giá trị null đại diện cho việc 'không có ghi chú' và sẽ không bị áp dụng ràng buộc minLength (vốn chỉ áp dụng cho kiếu string). Điều này giúp mô hình trả về null hợp lệ mà không phá vỡ quy tắc độ dài chuỗi.\n- Đáp án D sai vì việc xóa trường khỏi required khiến mô hình bỏ qua khóa (omit key), tạo ra sự thiếu ổn định về mặt cấu trúc hạ nguồn thay vì khai báo rõ ràng giá trị vắng mặt bằng null.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-008",
    "scenarioSignature": {
      "testedPrinciple": "semantic distinction between null and numeric zero",
      "failureMode": "audit log records false promo redemptions due to zero value substitution",
      "rootCause": "schema enforces non nullable number causing model to output zero for missing data",
      "requiredFix": "configure union type number null and schema description defining distinct semantics"
    },
    "questionEN": "An e-commerce order processing pipeline uses Claude to extract invoice metadata into structured JSON. In the billing audit system, discount_amount: null signifies that no promotional code was attached to the order, whereas discount_amount: 0 signifies that a valid promotional code was applied but resulted in a $0 discount deduction (e.g., threshold not met). The engineering team notices the model outputs discount_amount: 0 for orders with no promotion code, causing audit reports to falsely log zero-dollar promotion redemptions. How should the JSON Schema and prompt documentation be configured to preserve this business distinction?",
    "question": "[d4-b09-B-008] Quy trình xử lý đơn hàng thương mại điện tử sử dụng Claude để trích xuất dữ liệu hóa đơn thành JSON có cấu trúc. Trong hệ thống kiểm toán thanh toán, discount_amount: null biểu thị không có mã khuyến mãi nào được gắn vào đơn hàng, trong khi discount_amount: 0 biểu thị một mã khuyến mãi hợp lệ đã được áp dụng nhưng khấu trừ $0 (ví dụ: chưa đạt ngưỡng). Đội ngũ kỹ thuật nhận thấy mô hình xuất ra discount_amount: 0 cho các đơn hàng không có mã khuyến mãi, khiến báo cáo kiểm toán ghi nhận sai các lượt đổi khuyến mãi 0 đô la. Schema JSON và tài liệu prompt nên được cấu hình như thế nào để giữ nguyên sự khác biệt về mặt nghiệp vụ này?",
    "optionsEN": [
      "A. Configure discount_amount with \"type\": \"number\" and a minimum: 0 constraint, allowing the downstream parser to treat 0 and null as semantically identical.",
      "B. Define discount_amount as \"type\": \"number\" with \"default\": 0, enabling the model to fallback to 0 whenever promotional details are absent from the invoice.",
      "C. Remove discount_amount from the JSON Schema entirely and pass promotional discounts as un-validated key-value pairs in a metadata string.",
      "D. Define discount_amount as \"type\": [\"number\", \"null\"] in schema, combined with clear prompt descriptions specifying null for unapplied promos versus 0 for applied zero-value promos."
    ],
    "options": [
      "A. Cấu hình discount_amount với \"type\": \"number\" và ràng buộc minimum: 0, cho phép bộ phân tích phía hạ nguồn xử lý 0 và null như hai giá trị có nghĩa giống nhau.",
      "B. Định nghĩa discount_amount là \"type\": \"number\" với \"default\": 0, cho phép mô hình mặc định về 0 bất cứ khi nào chi tiết khuyến mãi không có trong hóa đơn.",
      "C. Loại bỏ hoàn toàn discount_amount khỏi Schema JSON và truyền các khoản giảm giá dưới dạng các cặp key-value không được xác thực trong chuỗi metadata.",
      "D. Định nghĩa discount_amount là \"type\": [\"number\", \"null\"] trong schema, kết hợp với mô tả rõ ràng trong prompt quy định null cho khuyến mãi không áp dụng và 0 cho khuyến mãi áp dụng giá trị bằng 0."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because enforcing minimum 0 on numeric type prevents null values and forces the model to emit 0 for absent discounts, conflating unapplied promos with zero-value promos.",
      "Option B is incorrect because setting default to 0 automatically coerces missing promotional data to numeric zero, corrupting audit trails by logging false promo redemptions.",
      "Option C is incorrect because removing the field from schema eliminates structural validation and structured output guarantees, forcing downstream code to parse unstructured text.",
      "Option D is correct because defining a union type of number and null alongside precise description guidance allows the model to output explicit null when no promo exists versus numeric 0 when a zero-dollar promo is processed, preserving business semantics."
    ],
    "rationale": "In financial domain engineering, null represents the absence of an applicable concept (no promotion code attached), while 0 represents a valid numerical measurement (a promotion code attached that calculated $0 deduction). Supporting [\"number\", \"null\"] combined with schema description guidelines enables the model to accurately maintain this semantic boundary.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Đáp án A sai vì việc áp đặt minimum: 0 trên kiểu number không cho phép mô hình xuất giá trị null, ép buộc mô hình phải dùng 0 cho cả trường hợp không có mã khuyến mãi, làm mất đi sự khác biệt về nghiệp vụ.\n- Đáp án B sai vì default: 0 tự động ép các dữ liệu thiếu về số 0, gây sai lệch báo cáo kiểm toán khi ghi nhận các giao dịch không dùng mã thành giao dịch có đổi mã 0 đô la.\n- Đáp án C sai vì loại bỏ trường khỏi schema làm hỏng tính toàn vẹn dữ liệu có cấu trúc và vô hiệu hóa khả năng kiểm tra kiểu tự động.\n- Đáp án D đúng vì việc sử dụng kiểu hợp [\"number\", \"null\"] kết hợp với mô tả trường (description) rõ ràng giúp mô hình phân biệt chính xác giữa null (không áp dụng chương trình khuyến mãi) và 0 (có áp dụng khuyến mãi nhưng giá trị giảm bằng 0).",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]