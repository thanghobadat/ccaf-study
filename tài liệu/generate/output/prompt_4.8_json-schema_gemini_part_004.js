[
  {
    "id": "d4-b11-4.8-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-007",
    "questionEN": "An enterprise billing pipeline BillingIngestionService validates incoming JSON payloads using a JSON Schema where the top-level object includes required: [\"customer_id\", \"address\"] and additionalProperties: false. The address property is defined as type \"object\" with properties street, city, and postal_code. However, downstream microservices crash with a KeyError during invoice generation because the model frequently emits {} for address or injects arbitrary fields like geolocation_metadata. What is the root cause of this schema validation leak, and how should it be resolved?",
    "question": "[d4-b11-4.8-007] Một đường ống thanh toán doanh nghiệp BillingIngestionService xác thực dữ liệu JSON đầu vào bằng JSON Schema, trong đó đối tượng cấp cao nhất bao gồm required: [\"customer_id\", \"address\"] và additionalProperties: false. Thuộc tính address được định nghĩa là kiểu \"object\" với các thuộc tính street, city, và postal_code. Tuy nhiên, các microservice phía sau bị lỗi KeyError trong quá trình tạo hóa đơn vì mô hình thường xuyên tạo ra {} cho address hoặc chèn các trường tùy ý như geolocation_metadata. Nguyên nhân gốc rễ của lỗ hổng xác thực schema này là gì và nên khắc phục như thế nào?",
    "optionsEN": [
      "A. The top-level additionalProperties: false rule is leaking into sub-objects, so adding unevaluatedProperties: false to the root schema will automatically enforce strictness on all nested objects.",
      "B. The root required array only enforces the presence of customer_id, so moving address into a top-level patternProperties definition will force subfield validation.",
      "C. JSON Schema validation constraints do not automatically inherit recursively; the nested address object definition must explicitly declare its own required array and additionalProperties: false.",
      "D. The LLM provider ignores nested schema properties unless strict: true is declared at the top-level API payload, which overrides JSON Schema keywords."
    ],
    "options": [
      "A. Quy tắc additionalProperties: false ở cấp cao nhất tự động áp dụng đệ quy cho các đối tượng con, nên việc thêm unevaluatedProperties: false vào root schema sẽ tự động áp đặt tính nghiêm ngặt cho tất cả đối tượng lồng nhau.",
      "B. Mảng required ở cấp gốc chỉ bắt buộc sự có mặt của customer_id, do đó việc chuyển address vào định nghĩa patternProperties ở cấp cao nhất sẽ bắt buộc xác thực các trường con.",
      "C. Các ràng buộc xác thực JSON Schema không tự động thừa kế đệ quy; định nghĩa đối tượng address lồng nhau phải khai báo rõ ràng mảng required riêng và additionalProperties: false của chính nó.",
      "D. Nhà cung cấp LLM bỏ qua các thuộc tính schema lồng nhau trừ khi strict: true được khai báo ở API payload cấp cao nhất, điều này ghi đè lên các từ khóa JSON Schema."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because top-level additionalProperties: false does not apply recursively to nested objects, and adding unevaluatedProperties does not enforce missing inner required fields.",
      "Option B is incorrect because patternProperties matches property names via regex and does not enforce required keys within nested objects.",
      "Option C is correct because JSON Schema keywords apply only to the immediate object level where they are defined; the nested address object schema must explicitly specify its own required list and additionalProperties: false.",
      "Option D is incorrect because API flags like strict: true do not alter JSON Schema inheritance rules; schema constraints for nested objects must be declared explicitly within the object schema."
    ],
    "rationale": "JSON Schema constraints such as required and additionalProperties: false operate strictly at the level where they are declared. Defining required on the parent object ensures that the address key exists, but permits {} (an empty object) or an object with unknown properties unless address itself specifies required: [\"street\", \"city\", \"postal_code\"] and additionalProperties: false.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai vì additionalProperties: false ở cấp gốc không áp dụng đệ quy cho đối tượng lồng nhau, và unevaluatedProperties không giải quyết được việc thiếu mảng required bên trong.\\n- Phương án B sai vì patternProperties dùng để khớp tên thuộc tính bằng regex chứ không áp đặt các khóa bắt buộc trong đối tượng con.\\n- Phương án C đúng vì các từ khóa JSON Schema chỉ có hiệu lực ở cấp đối tượng được khai báo. Để ngăn address bị rỗng hoặc chứa trường thừa, schema của address phải định nghĩa rõ mảng required và additionalProperties: false riêng.\\n- Phương án D sai vì cờ API như strict: true không làm thay đổi nguyên tắc thừa kế schema; các ràng buộc của đối tượng lồng nhau luôn phải được định nghĩa trực tiếp trong schema của đối tượng đó.",
    "scenarioSignature": {
      "testedPrinciple": "nested object json schema strictness requirement",
      "failureMode": "nested object accepts unvalidated extra fields or missing mandatory child properties",
      "rootCause": "top-level schema defines nested object without inner required array and additionalProperties false",
      "requiredFix": "define inner required array and additionalProperties false within nested object schema"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  },
  {
    "id": "d4-b11-4.8-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-008",
    "questionEN": "An automated logistics platform OrderFulfillmentEngine uses JSON Schema to structure LLM extraction of warehouse shipments. The line_items array in the schema specifies type: \"array\", minItems: 1, and maxItems: 50. During production runs, downstream data processing fails with a TypeError: unhashable type or missing attribute because the model occasionally returns line_items containing mixed types, such as raw text strings \"SKU - 9921\" mixed with structured {\"sku\": \"SKU - 9921\", \"qty\": 2} objects. Why does the schema allow these non-uniform array elements, and how can it be fixed?",
    "question": "[d4-b11-4.8-008] Một nền tảng logistics tự động OrderFulfillmentEngine sử dụng JSON Schema để cấu trúc hóa dữ liệu trích xuất hàng tồn kho từ LLM. Mảng line_items trong schema chỉ định type: \"array\", minItems: 1, và maxItems: 50. Trong quá trình vận hành production, việc xử lý dữ liệu phía sau bị lỗi TypeError: unhashable type or missing attribute vì mô hình thỉnh thoảng trả về line_items chứa các kiểu dữ liệu hỗn hợp, chẳng hạn như chuỗi văn bản thô \"SKU - 9921\" xen kẽ với các đối tượng cấu trúc {\"sku\": \"SKU - 9921\", \"qty\": 2}. Tại sao schema lại cho phép các phần tử mảng không đồng nhất này và làm thế nào để khắc phục?",
    "optionsEN": [
      "A. minItems and maxItems restrict string length rather than array element counts, so changing the field type to type: \"list\" is required to enforce item uniformity.",
      "B. JSON Schema arrays require additionalItems: false at the top level whenever minItems is declared to reject primitive values.",
      "C. The model requires an explicit uniqueItems: true flag in the array schema to prevent emitting strings alongside structured dictionary objects.",
      "D. The schema specifies array cardinality constraints (minItems/maxItems) but lacks an items keyword, allowing elements of any data type; adding items with an explicit type: \"object\" and sub-properties enforces element uniformity."
    ],
    "options": [
      "A. minItems và maxItems hạn chế độ dài chuỗi thay vì số lượng phần tử mảng, vì vậy cần đổi kiểu trường thành type: \"list\" để bắt buộc tính đồng nhất của phần tử.",
      "B. Mảng trong JSON Schema yêu cầu additionalItems: false ở cấp cao nhất bất cứ khi nào minItems được khai báo để từ chối các giá trị nguyên thủy.",
      "C. Mô hình yêu cầu cờ uniqueItems: true rõ ràng trong schema của mảng để ngăn chặn việc tạo ra chuỗi cùng với các đối tượng dictionary có cấu trúc.",
      "D. Schema chỉ định các ràng buộc số lượng mảng (minItems/maxItems) nhưng thiếu từ khóa items, cho phép các phần tử thuộc bất kỳ kiểu dữ liệu nào; việc thêm items với type: \"object\" rõ ràng và các thuộc tính con sẽ bắt buộc tính đồng nhất của phần tử."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because minItems and maxItems strictly validate array element counts, not string lengths, and list is not a valid JSON Schema type.",
      "Option B is incorrect because additionalItems applies to tuple schemas with positional item definitions and does not constrain element types when items is omitted.",
      "Option C is incorrect because uniqueItems: true validates element uniqueness rather than enforcing a specific object type for array items.",
      "Option D is correct because cardinality constraints (minItems/maxItems) regulate array size but do not validate element content; an items schema block defining type: \"object\" and its sub-properties is required to enforce uniform item shapes."
    ],
    "rationale": "In JSON Schema, array cardinality constraints (minItems and maxItems) validate only the count of array elements. Without an explicit items schema keyword defining the structure of array elements (such as type: \"object\" with specified properties), elements default to accepting any JSON data type (strings, numbers, objects, arrays, booleans, or null).",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai vì minItems và maxItems đo số lượng phần tử mảng chứ không đo độ dài chuỗi, và JSON Schema không có kiểu list.\\n- Phương án B sai vì additionalItems dành cho kiểm tra tuple mảng theo vị trí và không giới hạn kiểu phần tử khi bỏ qua items.\\n- Phương án C sai vì uniqueItems: true chỉ đảm bảo các phần tử không bị trùng lặp giá trị chứ không bắt buộc kiểu dữ liệu của phần tử.\\n- Phương án D đúng vì các từ khóa số lượng mảng chỉ kiểm soát số lượng phần tử mà không kiểm tra nội dung bên trong. Phải khai báo từ khóa items kèm theo định nghĩa type: \"object\" và các thuộc tính chi tiết để đảm bảo mọi phần tử trong mảng đều có cấu trúc đồng nhất.",
    "scenarioSignature": {
      "testedPrinciple": "array element schema definition enforcement",
      "failureMode": "array accepts elements with inconsistent or primitive data types",
      "rootCause": "specifying array cardinality constraints without defining item schema type",
      "requiredFix": "add items property specifying element object schema"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  }
]