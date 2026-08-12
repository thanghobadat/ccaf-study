[
  {
    "id": "d4-b09-B-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-003",
    "questionEN": "An automated B2B SaaS Invoicing Pipeline extracts vendor billing details into structured JSON. The JSON schema for the optional vat_identification_number field is configured with \"type\": \"string\" and \"default\": \"N/ A\". When processing international vendors without a registered tax ID, the LLM outputs \"vat_identification_number\": \"N / A\". A downstream Python billing microservice evaluates if vendor_data[\"vat_identification_number\"] is None before executing tax verification API calls. Because \"N / A\" is a truthy non-null string, the check fails, causing the service to query the European VIES database with the invalid string \"N / A\", resulting in repeated HTTP 400 errors and transaction rollbacks. How should the JSON schema be modified to resolve this issue?",
    "question": "[d4-b09-B-003] Một đường ống xuất hóa đơn B2B SaaS tự động trích xuất thông tin thanh toán của nhà cung cấp thành JSON có cấu trúc. JSON schema cho trường không bắt buộc vat_identification_number được cấu hình với \"type\": \"string\" và \"default \": \"N / A\". Khi xử lý các nhà cung cấp quốc tế không có mã số thuế đăng ký, LLM xuất ra \"vat_identification_number\": \"N / A\". Microservice thanh toán bằng Python ở hạ nguồn kiểm tra liệu vendor_data[\"vat_identification_number\"] is None trước khi gọi API xác thực thuế. Vì \"N / A\" là một chuỗi non-null hợp lệ, phép kiểm tra bị thất bại, khiến dịch vụ truy vấn cơ sở dữ liệu VIES Châu Âu với chuỗi không hợp lệ \"N / A\", dẫn đến các lỗi HTTP 400 lặp đi lặp lại và cuộn ngược giao dịch. JSON schema nên được sửa đổi như thế nào để giải quyết vấn đề này?",
    "optionsEN": [
      "A. Implement regex pre-processing in the Python microservice to map string values like \"N / A\" and \"NONE\" to Python None prior to executing tax verification.",
      "B. Remove vat_identification_number from the JSON schema properties object and instruct the prompt to output tax IDs in raw text metadata block.",
      "C. Update the JSON schema property definition to \"type\": [\"string\", \"null\"], place vat_identification_number in the required array, and remove \"default \": \"N / A\".",
      "D. Restrict vat_identification_number to an explicit enum of [\"N / A\", \"VALID_VAT\"] and configure the JSON schema parser to force strict retry logic."
    ],
    "options": [
      "A. Triển khai tiền xử lý regex trong microservice Python để ánh xạ các giá trị chuỗi như \"N / A\" và \"NONE\" thành Python None trước khi thực thi xác thực thuế.",
      "B. Xóa vat_identification_number khỏi đối tượng properties của JSON schema và hướng dẫn prompt xuất mã số thuế trong khối metadata văn bản thô.",
      "C. Cập nhật định nghĩa thuộc tính trong JSON schema thành \"type\": [\"string\", \"null\"], đưa vat_identification_number vào mảng required, và xóa \"default \": \"N / A\".",
      "D. Giới hạn vat_identification_number thành enum rõ ràng gồm [\"N / A\", \"VALID_VAT\"] và cấu hình trình phân tích JSON schema để buộc logic thử lại nghiêm ngặt."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Modifying downstream code with regex string matching acts as a brittle workaround that fails to correct the model's output schema contract and misses edge cases in string representations.",
      "Option B is incorrect: Removing the field from schema properties disables structured schema validation entirely for vendor tax IDs, forcing unvalidated free-text extraction.",
      "Option C is correct: Replacing \"default \": \"N / A\" with \"type\": [\"string\", \"null\"] and including the field in the required array forces the model to explicitly emit native JSON null when no tax ID exists, allowing downstream is None checks to pass correctly.",
      "Option D is incorrect: Defining an enum with \"N / A\" maintains the literal string emission, continuing to bypass downstream Python None checks and perpetuating HTTP 400 failures."
    ],
    "rationale": "Using \"default \": \"N / A\" in a JSON schema prompts the LLM to emit the literal string \"N / A\" when data is absent. Downstream applications performing strict type checks (e.g., is None in Python) treat \"N / A\" as a valid, non-null string, causing logic branches to fail. Defining the field as \"type\": [\"string\", \"null\"] in combination with the required array ensures the model outputs explicit JSON null when values are absent.",
    "explanation": "Trong thiết kế JSON Schema cho LLM, việc sử dụng từ khóa \"default \": \"N / A\" khiến mô hình ngôn ngữ có xu hướng xuất ra chuỗi ký tự \"N / A\" thay vì giá trị JSON null gốc khi dữ liệu bị thiếu. Hậu quả là các hệ thống hạ nguồn (như microservice Python) thực hiện kiểm tra kiểu dữ liệu (if field is None) sẽ nhận diện chuỗi \"N / A\" là một giá trị hợp lệ (truthy), khiến luồng xử lý tiếp tục gọi API VIES với mã số thuế sai và gây ra lỗi HTTP 400. Phương án C là chính xác vì việc chuyển kiểu dữ liệu thành \"type\": [\"string\", \"null\"], đưa trường vào mảng required và loại bỏ \"default \": \"N / A\" buộc LLM phải xuất ra JSON null chuẩn khi không có mã số thuế.\\n\\n- Option A sai vì đây chỉ là giải pháp tạm thời ở hạ nguồn, không giải quyết gốc rễ việc LLM vi phạm hợp đồng dữ liệu chuẩn.\\n- Option B sai vì việc xóa trường khỏi schema làm mất đi khả năng kiểm tra cấu trúc tự động của JSON schema validator.\\n- Option D sai vì định nghĩa enum chứa \"N / A\" vẫn sẽ khiến LLM xuất ra chuỗi \"N / A\", không khắc phục được lỗi kiểm tra is None ở hạ nguồn.",
    "scenarioSignature": {
      "testedPrinciple": "schema default string values induce string literal emissions over native JSON nulls",
      "failureMode": "downstream type check bypass causing third party API validation exceptions",
      "rootCause": "JSON schema default keyword prompting text model to emit literal string instead of null",
      "requiredFix": "replace default string keyword with explicit required nullable string type definition"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-004",
    "questionEN": "An Industrial IoT Vibration Telemetry Platform uses an LLM to parse sensor metadata into JSON. The top-level schema sets \"additionalProperties\": false to block unexpected properties. The field calibration_certificate_hash is defined as \"type\": \"string\" (non-nullable). When parsing telemetry from uncalibrated machinery, the prompt asks the LLM to signal missing calibration. Because the schema forbids a null value for calibration_certificate_hash, the LLM attempts to output an unlisted field \"_nullable_flag\": true alongside the payload. The JSON Schema Validator immediately throws SchemaValidationError: Additional properties are not allowed ('_nullable_flag' was unexpected), rejecting the payload. How should the schema be refactored to resolve this error?",
    "question": "[d4-b09-B-004] Một Nền tảng Điện toán Đo đạc Rung động IoT Công nghiệp sử dụng LLM để phân tích dữ liệu cảm biến thành JSON. Schema cấp cao nhất thiết lập \"additionalProperties\": false để chặn các thuộc tính không mong muốn. Trường calibration_certificate_hash được định nghĩa là \"type\": \"string\" (không cho phép null). Khi phân tích dữ liệu từ máy móc chưa hiệu chuẩn, prompt yêu cầu LLM báo hiệu việc thiếu hiệu chuẩn. Vì schema cấm giá trị null cho calibration_certificate_hash, LLM cố gắng xuất ra một trường không có trong danh sách \"_nullable_flag\": true bên trong payload. Trình kiểm tra JSON Schema ngay lập tức ném ra SchemaValidationError: Additional properties are not allowed ('_nullable_flag' was unexpected), từ chối payload. Schema nên được tái cấu trúc như thế nào để giải quyết lỗi này?",
    "optionsEN": [
      "A. Change top-level schema configuration to \"additionalProperties\": true so the JSON validator permits the model to insert auxiliary helper fields like \"_nullable_flag\".",
      "B. Retain \"type\": \"string\" for calibration_certificate_hash and add \"_nullable_flag\": {\"type\": \"boolean\"} explicitly to the JSON schema properties dictionary.",
      "C. Remove calibration_certificate_hash from the required schema list and instruct the prompt to omit the key entirely when sensor calibration is absent.",
      "D. Update calibration_certificate_hash to \"type\": [\"string\", \"null\"] and include it in the required array, allowing native JSON null without auxiliary fields."
    ],
    "options": [
      "A. Thay đổi cấu hình schema cấp cao nhất thành \"additionalProperties\": true để trình kiểm tra JSON chấp nhận các trường hỗ trợ phụ như \"_nullable_flag\".",
      "B. Giữ nguyên \"type\": \"string\" cho calibration_certificate_hash và thêm trực tiếp \"_nullable_flag\": {\"type\": \"boolean\"} vào từ điển properties của JSON schema.",
      "C. Xóa calibration_certificate_hash khỏi danh sách required của schema và hướng dẫn prompt bỏ qua khóa này hoàn toàn khi không có hiệu chuẩn cảm biến.",
      "D. Cập nhật calibration_certificate_hash thành \"type\": [\"string\", \"null\"] và đưa nó vào mảng required, cho phép JSON null gốc mà không cần các trường phụ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Enabling additionalProperties allows arbitrary unvalidated fields into the JSON payload, compromising strict data governance and structural guarantees.",
      "Option B is incorrect: Explicitly adding helper boolean flags creates an anti-pattern that bloats the schema and complicates downstream parsing compared to native JSON nulls.",
      "Option C is incorrect: Omitting missing fields creates field absence ambiguity rather than an explicit null signal, leading to unpredictable LLM field omission behavior.",
      "Option D is correct: Configuring \"type\": [\"string\", \"null\"] in required lets the model output \"calibration_certificate_hash\": null natively, adhering to additionalProperties: false without triggering schema rejection."
    ],
    "rationale": "When schemas enforce \"additionalProperties\": false, LLMs cannot introduce auxiliary flags (such as \"_nullable_flag\": true) to communicate missing data. If a field is defined as non-nullable \"type\": \"string\", the model faces a constraint conflict. Refactoring the field to \"type\": [\"string\", \"null\"] and keeping it in required permits the model to output an explicit native null value for the exact field key, satisfying strict schema validation.",
    "explanation": "Khi JSON schema áp dụng rào cản \"additionalProperties\": false, trình validator sẽ từ chối bất kỳ thuộc tính nào không được khai báo trước. Khi trường calibration_certificate_hash được định nghĩa dạng string không-nullable nhưng dữ liệu thực tế lại thiếu, LLM cố gắng \"giải quyết\" bằng cách sinh ra trường phụ như \"_nullable_flag\": true. Điều này vi phạm quy tắc strict schema. Phương án D là giải pháp kiến trúc chuẩn: bằng cách đổi thành \"type\": [\"string\", \"null\"] và đưa vào mảng required, LLM có thể xuất trực tiếp \"calibration_certificate_hash\": null mà không vi phạm quy tắc additionalProperties.\\n\\n- Option A sai vì việc bật additionalProperties: true sẽ làm mất khả năng kiểm soát chặt chẽ cấu trúc JSON đầu ra.\\n- Option B sai vì việc tạo thêm cờ boolean phụ làm rườm rà schema và vi phạm nguyên tắc thiết kế dữ liệu chuẩn của JSON null.\\n- Option C sai vì việc bỏ qua trường khỏi required khiến việc có xuất hiện trường hay không trở nên không dự đoán được, dễ dẫn đến lỗi vắng mặt trường thay vì báo hiệu null rõ ràng.",
    "scenarioSignature": {
      "testedPrinciple": "strict schema constraints block model auxiliary helper field generation for missing data",
      "failureMode": "schema validation error triggered by unlisted metadata fields in strict JSON payloads",
      "rootCause": "non-nullable type definition forcing model to invent auxiliary helper keys forbidden by additionalProperties false",
      "requiredFix": "declare field as required with native array type string and null"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]