[
  {
    "id": "d4-b09-4.5-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-005",
    "scenarioSignature": {
      "testedPrinciple": "strict schema validation via additionalProperties constraint",
      "failureMode": "downstream payload parsing failure due to unexpected fields",
      "rootCause": "omitting additionalProperties false in JSON tool schema definition",
      "requiredFix": "explicitly configure additionalProperties false in schema object"
    },
    "questionEN": "An engineering team configured a structured tool output schema defining specific JSON properties for customer ticket metadata extraction. During production processing, the model periodically injects an unrequested field confidence_score into the output JSON, causing strict downstream Pydantic parsers to raise unexpected key validation errors. Which configuration change directly prevents the model from introducing fields omitted from the declared schema?",
    "question": "[d4-b09-4.5-005] Đội ngũ kỹ thuật cấu hình tool schema cho output dạng cấu trúc để trích xuất metadata từ vé hỗ trợ khách hàng. Trong quá trình vận hành production, mô hình thỉnh thoảng tự ý chèn thêm trường confidence_score không được khai báo vào JSON output, khiến parser Pydantic ở phía downstream báo lỗi validation key không xác định. Thay đổi cấu hình nào sau đây ngăn chặn trực tiếp việc mô hình bổ sung các trường nằm ngoài schema đã khai báo?",
    "optionsEN": [
      "A. Set additionalProperties: false in the tool result schema definition.",
      "B. Append all key names to the required array in the JSON schema object.",
      "C. Add a system prompt directive stating 'Never generate extra JSON keys'.",
      "D. Wrap the tool parameters in an array container schema structure."
    ],
    "options": [
      "A. Thiết lập additionalProperties: false trong định nghĩa result schema của tool.",
      "B. Bổ sung toàn bộ tên key vào mảng required trong đối tượng JSON schema.",
      "C. Thêm chỉ thị trong system prompt yêu cầu 'Không bao giờ tạo các key JSON thừa'.",
      "D. Đóng gói các thông số của tool vào trong một cấu trúc schema mảng."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because setting additionalProperties: false strictly instructs the model and API validator that no keys beyond those explicitly listed in properties are permitted.",
      "Option B is incorrect because adding fields to required ensures declared mandatory keys are present, but it does not prohibit the inclusion of extra undeclared keys.",
      "Option C is incorrect because system prompt instructions are non-deterministic and can be ignored by the model, whereas schema validation constraints enforce strict formatting.",
      "Option D is incorrect because wrapping parameters in an array alters the root data structure rather than restricting key creation within the object schema."
    ],
    "rationale": "By default, JSON Schema allows object instances to contain properties not explicitly named in the properties keyword. Setting additionalProperties: false strictly restricts the output structure to declared keys only, preventing downstream parser validation failures caused by unexpected hallucinated properties.",
    "explanation": "Trong JSON Schema, mặc định đối tượng vẫn cho phép chứa các thuộc tính bổ sung chưa được định nghĩa trong properties. Việc thiết lập additionalProperties: false bắt buộc mô hình và bộ kiểm tra schema tuân thủ nghiêm ngặt chỉ xuất các trường đã khai báo, ngăn chặn triệt để lỗi parse dữ liệu do các trường tự khởi tạo như confidence_score gây ra.\n- Phương án A đúng vì additionalProperties: false cấm bổ sung các key ngoài danh sách.\n- Phương án B sai vì required chỉ đảm bảo tính hiện diện của các key bắt buộc chứ không cấm thêm key mới.\n- Phương án C sai vì lời nhắc trong system prompt mang tính ngẫu nhiên, không thể cưỡng chế về mặt cú pháp schema.\n- Phương án D sai vì việc chuyển đổi root schema sang mảng không giúp giới hạn thuộc tính của đối tượng."
  },
  {
    "id": "d4-b09-4.5-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-006",
    "scenarioSignature": {
      "testedPrinciple": "root array type enforcement in structured tool output",
      "failureMode": "downstream type exception due to single object returned instead of list",
      "rootCause": "top-level schema defined as object rather than array type with items",
      "requiredFix": "define root schema type as array with explicit item object properties"
    },
    "questionEN": "A batch processing service relies on a model tool call to extract key entities from documents into a list. In production, when a document contains only one entity, the model returns a raw JSON object {...} instead of an array containing one object [{...}], causing downstream code calling .map() to throw a type exception. How should the tool schema be defined to guarantee an array output structure regardless of item count?",
    "question": "[d4-b09-4.5-006] Một dịch vụ xử lý hàng loạt phụ thuộc vào tool call để trích xuất danh sách các thực thể từ văn bản. Khi văn bản chỉ chứa một thực thể duy nhất, mô hình lại trả về một đối tượng JSON đơn {...} thay vì một mảng chứa một phần tử [{...}], khiến đoạn mã downstream khi gọi hàm .map() bị lỗi type exception. Schema của tool cần được định nghĩa như thế nào để đảm bảo đầu ra luôn là mảng bất kể số lượng phần tử?",
    "optionsEN": [
      "A. Set the tool schema top-level type to object with a required field containing entity keys.",
      "B. Set the top-level schema type to array and specify the entity object schema inside items.",
      "C. Pass a few-shot message showing single items formatted as JSON objects inside curly braces.",
      "D. Enable response format prefilling with a opening bracket character [ in the assistant turn."
    ],
    "options": [
      "A. Đặt type ở cấp cao nhất của tool schema là object với trường required chứa các key của thực thể.",
      "B. Đặt type ở cấp cao nhất của schema là array và định nghĩa schema của thực thể bên trong items.",
      "C. Truyền mẫu few-shot hiển thị các thực thể đơn lẻ dưới dạng đối tượng JSON trong dấu ngoặc nhọn.",
      "D. Bật prefill định dạng phản hồi với ký tự mở ngoặc vuông [ trong lượt của assistant."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because setting the root type to object forces the output to be a single dictionary object rather than an array structure.",
      "Option B is correct because establishing a root type: array with an items definition explicitly instructs the model tool enforcement engine to wrap outputs in array brackets [...] regardless of whether 1 or many items are generated.",
      "Option C is incorrect because few-shot prompting does not guarantee schema-level structural constraints when extracting variable amounts of items.",
      "Option D is incorrect because assistant message prefilling is an outdated prompt technique that is superseded by explicit tool schema configuration and may not be supported across all modern API tool endpoints."
    ],
    "rationale": "To enforce a list collection format, the root level of the schema must declare type: \"array\" along with items: { type: \"object\", properties: {...} }. This schema definition forces the model output validation mechanism to construct a JSON array, preventing type mismatch errors in client-side iterate/map calls.",
    "explanation": "Để đảm bảo mô hình luôn trả về cấu trúc danh sách kể cả khi chỉ có 1 phần tử, schema ở cấp cao nhất phải được thiết lập dạng mảng type: \"array\" kết hợp với thuộc tính items chứa định nghĩa đối tượng thực thể. Điều này giúp hệ thống ép kiểu đầu ra luôn bọc trong ngoặc vuông [...] hợp lệ.\n- Phương án A sai vì cấu hình root là object sẽ khiến mô hình trả về một đối tượng đơn duy nhất.\n- Phương án B đúng vì khai báo type: array đi kèm items đảm bảo định dạng mảng thống nhất ở phía downstream.\n- Phương án C sai vì lời nhắn few-shot không thể thay thế cơ chế ràng buộc kỹ thuật của JSON schema.\n- Phương án D sai vì kỹ thuật prefill ký tự không mang lại tính ràng buộc chặt chẽ như tool_use schema."
  }
]