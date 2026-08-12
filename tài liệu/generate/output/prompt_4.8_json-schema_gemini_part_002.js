[
  {
    "id": "d4-b11-4.8-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-003",
    "scenarioSignature": {
      "testedPrinciple": "Array length constraint validation using JSON Schema minItems and maxItems keywords",
      "failureMode": "Language model returns variable length recommendation array violating interface contract",
      "rootCause": "JSON Schema missing explicit minItems and maxItems properties for array validation",
      "requiredFix": "Add minItems and maxItems constraints to JSON Schema recommendation array definition"
    },
    "questionEN": "The ShopFlow mobile app interface requires a structured output from Gemini Flash containing product recommendations to populate a fixed 3-card layout. The JSON schema defines recommendations as an array of objects, but the API response returns anywhere between 1 and 5 items, causing client-side rendering layout overflow. How should the backend engineer update the JSON schema to guarantee that the output array contains exactly three items?",
    "question": "[d4-b11-4.8-003] Giao diện ứng dụng di động ShopFlow yêu cầu đầu ra có cấu trúc từ Gemini Flash chứa danh sách gợi ý sản phẩm để hiển thị trên bố cục cố định 3 thẻ. JSON schema định nghĩa recommendations là một mảng các đối tượng, nhưng phản hồi API lại trả về ngẫu nhiên từ 1 đến 5 mục, gây ra lỗi vỡ giao diện phía client. Kỹ sư backend nên cập nhật JSON schema như thế nào để đảm bảo mảng đầu ra luôn chứa chính xác ba mục?",
    "optionsEN": [
      "A. Add prompt instructions asking the model to strictly produce 3 items while leaving items unconstrained.",
      "B. Set additionalItems: false on the recommendations array property in the JSON schema.",
      "C. Set minItems: 3 and maxItems: 3 on the recommendations array property in the JSON schema.",
      "D. Add items.length: 3 inside the recommendations array property schema definition."
    ],
    "options": [
      "A. Bổ sung hướng dẫn vào prompt yêu cầu mô hình tạo đúng 3 mục trong khi giữ nguyên JSON schema không ràng buộc.",
      "B. Đặt additionalItems: false trên thuộc tính mảng recommendations trong JSON schema.",
      "C. Đặt minItems: 3 và maxItems: 3 trên thuộc tính mảng recommendations trong JSON schema.",
      "D. Thêm items.length: 3 bên trong định nghĩa thuộc tính mảng recommendations của JSON schema."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because natural language prompt instructions alone do not enforce strict structural boundaries on model outputs when generating JSON Schema-constrained data.",
      "Option B is incorrect because additionalItems controls tuple validation when items is an array of distinct schemas, rather than bounding the cardinality of a single-schema array.",
      "Option C is correct because configuring both minItems: 3 and maxItems: 3 in the JSON Schema strictly forces the model response to contain exactly three items in the recommendations array.",
      "Option D is incorrect because items.length is not a recognized JSON Schema keyword for array length constraints."
    ],
    "rationale": "To enforce an exact array length in JSON Schema, both minItems and maxItems must be set to the target count (3). Model-level prompt instructions do not provide strict schema guarantees, and items.length or additionalItems are incorrect keywords for array cardinality.",
    "explanation": "Trong JSON Schema, để ràng buộc số lượng phần tử của một mảng thành một số lượng chính xác (như 3 phần tử), chúng ta phải sử dụng đồng thời hai từ khóa minItems và maxItems với giá trị tương ứng (minItems: 3, maxItems: 3).\n\n- Lựa chọn A sai vì hướng dẫn bằng văn bản trong prompt không đảm bảo tính tuân thủ tuyệt đối về mặt cấu trúc JSON Schema khi mô hình sinh dữ liệu.\n- Lựa chọn B sai vì additionalItems được dùng cho tuple validation (khi items là mảng các schema khác nhau), không dùng để giới hạn độ dài mảng đồng nhất.\n- Lựa chọn C đúng vì minItems: 3 kết hợp với maxItems: 3 tạo ra ràng buộc độ dài chính xác là 3 cho mảng recommendations.\n- Lựa chọn D sai vì items.length không phải là từ khóa hợp lệ trong chuẩn JSON Schema để giới hạn số lượng phần tử.",
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  },
  {
    "id": "d4-b11-4.8-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-004",
    "scenarioSignature": {
      "testedPrinciple": "Mandatory field enforcement in JSON Schema required array property definition",
      "failureMode": "Structured API output omits key identifier property leading to downstream routing null errors",
      "rootCause": "Property defined in JSON Schema properties object but missing from required array",
      "requiredFix": "Add property key name to JSON Schema root required array"
    },
    "questionEN": "An event-tracking ingestion pipeline at LogiPulse relies on structured outputs from Gemini Flash to format incoming audit logs. The JSON schema lists request_id, event_type, and timestamp under properties. However, the API output frequently omits request_id entirely, causing downstream event correlation services to throw null reference exceptions. How should the schema be modified to ensure request_id is always generated?",
    "question": "[d4-b11-4.8-004] Đường ống tiếp nhận nhật ký sự kiện tại LogiPulse phụ thuộc vào đầu ra có cấu trúc từ Gemini Flash để định dạng các log kiểm toán. JSON schema hiện tại liệt kê request_id, event_type, và timestamp dưới mục properties. Tuy nhiên, kết quả từ API thường xuyên bỏ qua thuộc tính request_id, gây ra ngoại lệ tham chiếu null ở dịch vụ liên kết sự kiện phía sau. Schema cần được chỉnh sửa như thế nào để đảm bảo request_id luôn xuất hiện trong mọi kết quả sinh ra?",
    "optionsEN": [
      "A. Mark request_id as non-nullable by adding \"nullable\": false inside its property definition.",
      "B. Set \"additionalProperties\": false at the top level of the JSON schema.",
      "C. Assign a fallback string by adding \"default\": \"UNKNOWN_ID\" inside the request_id property definition.",
      "D. Add \"request_id\" to the top-level \"required\" string array in the JSON schema."
    ],
    "options": [
      "A. Đánh dấu request_id không được null bằng cách thêm \"nullable\": false vào trong định nghĩa thuộc tính.",
      "B. Đặt \"additionalProperties\": false ở cấp cao nhất (top-level) của JSON schema.",
      "C. Gán giá trị mặc định bằng cách thêm \"default\": \"UNKNOWN_ID\" vào trong định nghĩa thuộc tính request_id.",
      "D. Bổ sung tên chuỗi \"request_id\" vào mảng \"required\" cấp cao nhất trong JSON schema."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because setting \"nullable\": false only dictates that the field value cannot be null when present, but does not force the field key to exist in the output.",
      "Option B is incorrect because \"additionalProperties\": false forbids undeclared keys from appearing, but does not mandate the presence of keys defined in properties.",
      "Option C is incorrect because providing a \"default\" value guides schema parsers upon missing inputs but does not force Gemini structured generation to emit omitted key names.",
      "Option D is correct because explicitly listing \"request_id\" in the top-level \"required\" array obligates the language model to generate that property key in every valid output object."
    ],
    "rationale": "Defining a key inside properties only declares its expected schema structure. To force the LLM to emit the key in every response, its name must be explicitly included in the JSON Schema's required array.",
    "explanation": "Trong JSON Schema, việc chỉ khai báo thuộc tính trong mục properties chỉ mới định nghĩa kiểu dữ liệu và mô tả cho thuộc tính đó, chứ không bắt buộc mô hình phải xuất thuộc tính đó trong kết quả JSON sinh ra. Để bắt buộc một thuộc tính phải luôn hiện diện (mandatory field), tên thuộc tính đó phải được đưa vào mảng \"required\" ở cấp chứa thuộc tính đó.\n\n- Lựa chọn A sai vì \"nullable\": false chỉ ngăn thuộc tính mang giá trị null khi nó xuất hiện, chứ không ép buộc khóa đó phải có mặt.\n- Lựa chọn B sai vì \"additionalProperties\": false cấm xuất hiện các khóa lạ ngoài properties, nhưng không bắt buộc các khóa đã khai báo phải xuất hiện.\n- Lựa chọn C sai vì từ khóa \"default\" dùng để cung cấp giá trị mặc định cho trình giải mã/kiểm tra schema, không đóng vai trò bắt buộc mô hình LLM phải sinh ra khóa bị thiếu.\n- Lựa chọn D đúng vì thêm \"request_id\" vào mảng \"required\" sẽ đưa ra ràng buộc bắt buộc mô hình luôn phải sinh khóa request_id trong phản hồi JSON.",
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  }
]