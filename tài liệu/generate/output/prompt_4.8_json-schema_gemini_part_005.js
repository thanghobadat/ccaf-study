[
  {
    "id": "d4-b11-4.8-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-009",
    "questionEN": "A banking pipeline AccountIngestionService uses a JSON Schema to extract customer records from unstructured text. The account_number field is defined as type: \"integer\". During processing, account identifiers like \"000482910\" are parsed into JSON as integer 482910, dropping critical leading zeros and breaking routing in the downstream core ledger API. Why does this truncation occur, and what is the correct JSON Schema fix?",
    "question": "[d4-b11-4.8-009] Một đường ống ngân hàng AccountIngestionService sử dụng JSON Schema để trích xuất hồ sơ khách hàng từ văn bản không cấu trúc. Trường account_number được định nghĩa là type: \"integer\". Trong quá trình xử lý, các mã định danh tài khoản như \"000482910\" được parse vào JSON thành số nguyên 482910, làm mất các chữ số 0 ở đầu và gây lỗi điều hướng trong API sổ cái lõi phía sau. Tại sao sự mất mát này xảy ra và giải pháp điều chỉnh JSON Schema đúng là gì?",
    "optionsEN": [
      "A. Defining semantic identifiers with type: \"integer\" forces JSON parsers and LLM decoders to treat the value as a numeric scalar, stripping leading zeros; changing the schema definition to type: \"string\" preserves the exact character formatting.",
      "B. The LLM tokenizer automatically truncates leading zeros when numeric tokens exceed 6 digits; setting minimum: 100000000 in the schema forces the model to pad zeroes.",
      "C. JSON Schema integers require format: \"padded - int\" to retain leading zeros; without this format specifier, parsers convert strings to IEEE 754 float values.",
      "D. Setting additionalProperties: false at the top level forces integer fields to retain text formatting, so modifying the root schema strictness resolves leading zero truncation."
    ],
    "options": [
      "A. Khai báo các mã định danh có ý nghĩa cú pháp bằng type: \"integer\" buộc các trình parse JSON và bộ giải mã LLM xử lý giá trị dưới dạng số nguyên, làm mất các chữ số 0 ở đầu; việc đổi định nghĩa schema thành type: \"string\" sẽ giữ nguyên định dạng ký tự chính xác.",
      "B. Bộ phân tách token của LLM tự động cắt bỏ các chữ số 0 ở đầu khi token số vượt quá 6 chữ số; việc thiết lập minimum: 100000000 trong schema sẽ bắt buộc mô hình đệm thêm số 0.",
      "C. Số nguyên trong JSON Schema yêu cầu format: \"padded - int\" để giữ lại các chữ số 0 ở đầu; nếu không có thuộc tính format này, trình parse sẽ chuyển đổi chuỗi thành giá trị số thực IEEE 754.",
      "D. Việc thiết lập additionalProperties: false ở cấp cao nhất bắt buộc các trường số nguyên giữ nguyên định dạng văn bản, do đó sửa đổi tính nghiêm ngặt của root schema sẽ khắc phục việc mất số 0 ở đầu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because semantic identifiers containing numeric characters (e.g., account numbers, postal codes, routing IDs) must be defined as type: \"string\" to prevent JSON serialization and numeric parsers from casting the value to a scalar integer and dropping leading zeros.",
      "Option B is incorrect because minimum constrains numeric value magnitude rather than zero padding, and LLM tokenizers emit bytes according to the JSON Schema type contract.",
      "Option C is incorrect because JSON Schema does not have a padded-int format specifier, and JSON integers are distinct from float conversions.",
      "Option D is incorrect because additionalProperties: false restricts unlisted property keys, having no effect on primitive type parsing or scalar zero stripping."
    ],
    "rationale": "Semantic identifiers that consist of numeric digits (such as account numbers, phone numbers, or zip codes) carry positional formatting meaning including leading zeros. Defining these fields as type: \"number\" or type: \"integer\" causes JSON spec compliance engines and LLMs to emit scalar numeric literals, stripping any leading zeroes (e.g., 000482910 becomes 482910). To preserve exact string representation, the schema must explicitly define the property as type: \"string\".",
    "explanation": "Phân tích các phương án:\\n- Phương án A đúng vì các mã định danh có nghĩa ngữ pháp/chức năng chứa các chữ số (như số tài khoản, mã bưu chính, mã ngân hàng) phải được định nghĩa bằng type: \"string\". Điều này ngăn trình parse JSON và LLM coi đó là giá trị số nguyên nguyên thủy và cắt bỏ các chữ số 0 ở đầu.\\n- Phương án B sai vì minimum chỉ giới hạn giá trị số tối thiểu chứ không xử lý đệm chữ số 0 ở đầu, và tokenizer tuân theo kiểu dữ liệu quy định trong schema.\\n- Phương án C sai vì JSON Schema không tồn tại chuẩn format padded-int, và kiểu integer hoàn toàn khác với việc chuyển đổi số thực IEEE 754.\\n- Phương án D sai vì additionalProperties: false chỉ ngăn chặn thuộc tính lạ chứ không làm thay đổi cách parse kiểu dữ liệu nguyên thủy.",
    "scenarioSignature": {
      "testedPrinciple": "semantic identifier data type schema specification",
      "failureMode": "numeric account identifier truncates leading zeros during JSON parsing",
      "rootCause": "defining numerical identifier field as integer or number instead of string type",
      "requiredFix": "set property type to string in JSON Schema with description of semantic ID"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  },
  {
    "id": "d4-b11-4.8-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-010",
    "questionEN": "A fintech audit service AuditLogExtractor utilizes a JSON Schema to parse transaction timestamps from customer support tickets. The event_date property in the schema is configured simply as type: \"string\". In production, the LLM outputs arbitrary date representations across requests, such as \"10 / 12 / 2026\", \"October 12, 2026\", and \"12-Oct - 26\", which causes SQL insertion failures in PostgreSQL timestamp columns. Why does defining type: \"string\" alone allow these incompatible date formats, and what is the effective schema remedy?",
    "question": "[d4-b11-4.8-010] Một dịch vụ kiểm toán tài chính AuditLogExtractor sử dụng JSON Schema để trích xuất mốc thời gian giao dịch từ các yêu cầu hỗ trợ của khách hàng. Thuộc tính event_date trong schema chỉ được cấu hình đơn giản là type: \"string\". Trong môi trường production, LLM tạo ra các định dạng ngày tháng tùy ý giữa các lần gọi, chẳng hạn như \"10 / 12 / 2026\", \"October 12, 2026\", và \"12-Oct - 26\", gây ra lỗi chèn dữ liệu SQL vào các cột timestamp của PostgreSQL. Tại sao việc chỉ định nghĩa type: \"string\" lại cho phép các định dạng ngày không tương thích này và giải pháp schema hiệu quả là gì?",
    "optionsEN": [
      "A. Generic string fields require top-level patternProperties to match regex patterns; without root regex matching, JSON parsers strip ISO 8601 formatting.",
      "B. Specifying type: \"string\" without a format attribute (such as \"date\" or \"date - time\") or descriptive ISO 8601 format guidance leaves character structure unconstrained; adding \"format\": \"date\" and an explicit description enforces standardized temporal formatting.",
      "C. The model requires additionalProperties: \"iso - 8601\" at the property level to enforce ISO date parsing during token generation.",
      "D. JSON Schema strings automatically default to Unix epoch timestamps unless minimum: 0 is specified, causing textual dates to fail relational database validation."
    ],
    "options": [
      "A. Các trường chuỗi chung yêu cầu patternProperties ở cấp cao nhất để khớp với mẫu regex; nếu không có regex ở cấp root, các trình parse JSON sẽ xóa bỏ định dạng ISO 8601.",
      "B. Việc chỉ định type: \"string\" mà không có thuộc tính format (như \"date\" hoặc \"date - time\") hoặc hướng dẫn định dạng ISO 8601 trong mô tả sẽ để ngỏ cấu trúc ký tự; việc thêm \"format\": \"date\" và description rõ ràng sẽ bắt buộc định dạng thời gian chuẩn hóa.",
      "C. Mô hình yêu cầu additionalProperties: \"iso - 8601\" ở cấp thuộc tính để bắt buộc parse ngày ISO trong quá trình sinh token.",
      "D. Chuỗi trong JSON Schema tự động mặc định thành mốc thời gian Unix epoch trừ khi chỉ định minimum: 0, khiến các ngày dạng văn bản không qua được xác thực cơ sở dữ liệu quan hệ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because patternProperties is used to match property key names via regex rather than validating temporal string property values.",
      "Option B is correct because type: \"string\" places no boundary on character patterns; incorporating JSON Schema \"format\": \"date\" (or \"date - time\") alongside clear description directives informs the LLM to emit strict ISO 8601 formatted date strings.",
      "Option C is incorrect because additionalProperties governs unrecognized object properties, not string value format constraints, and \"iso - 8601\" is not a valid value for it.",
      "Option D is incorrect because JSON Schema strings do not default to Unix timestamps, and minimum is a numeric keyword that is invalid on string properties."
    ],
    "rationale": "A property defined as type: \"string\" without constraints allows any valid sequence of characters. In LLM structured outputs, unless given explicit semantic guidance via the \"format\" keyword (e.g., \"date\" or \"date - time\") and property description specifying ISO 8601 (YYYY-MM-DD), the model will output dates in inconsistent natural-language or localized formats that break downstream database ingestions.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai vì patternProperties dùng để khớp tên thuộc tính bằng regex chứ không dùng để xác thực giá trị chuỗi thời gian.\\n- Phương án B đúng vì type: \"string\" đơn thuần không đặt ra giới hạn nào cho cấu trúc ký tự. Việc kết hợp từ khóa \"format\": \"date\" (hoặc \"date - time\") cùng với description quy định rõ chuẩn ISO 8601 (YYYY-MM-DD) giúp LLM tạo ra chuỗi ngày tháng đúng định dạng chuẩn hóa cho cơ sở dữ liệu.\\n- Phương án C sai vì additionalProperties kiểm soát các thuộc tính không được khai báo của đối tượng, không dùng để ràng buộc định dạng chuỗi và không chấp nhận giá trị \"iso - 8601\".\\n- Phương án D sai vì JSON Schema không tự chuyển chuỗi thành Unix timestamp, và minimum là từ khóa của kiểu số chứ không áp dụng cho chuỗi.",
    "scenarioSignature": {
      "testedPrinciple": "schema format keyword and prompt description for temporal attributes",
      "failureMode": "model emits non-standard ambiguous date string representations",
      "rootCause": "defining temporal property as unconstrained generic string without format or description",
      "requiredFix": "add format specifier and explicit ISO date format instructions in property description"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  }
]