[
  {
    "id": "d4-b09-B-011",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-011",
    "scenarioSignature": {
      "testedPrinciple": "oneOf vs primitive type array syntax equivalence in json schema",
      "failureMode": "misguided schema refactoring under false assumption of behavioral divergence",
      "rootCause": "misinterpreting syntax variants defining identical structural value domains",
      "requiredFix": "treat choice between syntax forms as style preference with equal compliance"
    },
    "questionEN": "An infrastructure engineering team at CloudScale Systems is designing a JSON Schema for an LLM agent that parses server provisioning requests. The team is debating how to define the optional secondary_ip_address field when secondary_ip_address must accept null when no secondary interface is requested. Engineer A insists on using \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}], claiming it forces the model to perform stricter validation, while Engineer B advocates for \"type\": [\"string\", \"null\"]. What is the technical reality regarding behavioral differences between these two syntax choices when using LLM JSON schema enforcement?",
    "question": "[d4-b09-B-011] Đội ngũ kỹ thuật hạ tầng tại CloudScale Systems đang thiết kế JSON Schema cho một LLM agent chuyên phân tích yêu cầu khởi tạo máy chủ. Đội ngũ tranh luận về cách định nghĩa trường secondary_ip_address khi trường này phải chấp nhận giá trị null nếu không có giao diện phụ nào được yêu cầu. Kỹ sư A quả quyết rằng sử dụng \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}] sẽ buộc mô hình kiểm định nghiêm ngặt hơn, trong khi Kỹ sư B ủng hộ cú pháp \"type\": [\"string\", \"null\"]. Thực tế kỹ thuật nào sau đây mô tả đúng sự khác biệt về hành vi giữa hai lựa chọn cú pháp này khi thực thi JSON Schema với LLM?",
    "optionsEN": [
      "A. The oneOf syntax forces the model to generate explicit null values 40% more consistently because JSON Schema validators evaluate branch schemas sequentially.",
      "B. The \"type\": [\"string\", \"null\"] syntax is invalid in OpenAPI 3.0 and JSON Schema Draft-07, causing raw schema rejection by the API endpoint before reaching the LLM.",
      "C. Both syntaxes are semantically equivalent in standard JSON Schema and LLM schema enforcers, representing a style preference with identical model compliance behavior.",
      "D. The oneOf syntax allows the LLM to omit the field entirely from the output JSON, whereas \"type\": [\"string\", \"null\"] forces the field to be present in the generated output."
    ],
    "options": [
      "A. Cú pháp oneOf buộc mô hình tạo ra giá trị null một cách nhất quán hơn 40% vì các công cụ kiểm định JSON Schema đánh giá các nhánh schema theo thứ tự tuyến tính.",
      "B. Cú pháp \"type\": [\"string\", \"null\"] không hợp lệ trong OpenAPI 3.0 và JSON Schema Draft-07, khiến API endpoint từ chối schema thô trước khi gửi tới LLM.",
      "C. Cả hai cú pháp đều tương đương về mặt ngữ nghĩa trong JSON Schema chuẩn và các công cụ thực thi schema của LLM, chỉ đại diện cho sở thích cú pháp với hành vi tuân thủ của mô hình hoàn toàn giống nhau.",
      "D. Cú pháp oneOf cho phép LLM bỏ qua hoàn toàn trường này khỏi JSON đầu ra, trong khi \"type\": [\"string\", \"null\"] bắt buộc trường phải xuất hiện trong đầu ra."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because oneOf and type arrays undergo identical structural schema enforcement in LLM constrained decoding engines, and oneOf does not improve null compliance rates.",
      "Option B is incorrect because \"type\": [\"string\", \"null\"] is standard syntax in JSON Schema (Draft-04/07/2020-12) and is natively supported by modern LLM structured output engines.",
      "Option C is correct because oneOf with primitive types and \"type\": [\"string\", \"null\"] define the exact same structural value domain (string OR null), resulting in identical model behavior and validation logic.",
      "Option D is incorrect because whether a field can be omitted or must be present is governed exclusively by the required schema array, not by the syntax used to declare nullability."
    ],
    "rationale": "Both oneOf: [{\"type\": \"string\"}, {\"type\": \"null\"}] and \"type\": [\"string\", \"null\"] specify the exact same value constraints in JSON Schema. LLM constrained decoding engines parse both forms into equivalent grammar rules, meaning there is zero behavioral difference in terms of model outputs or validation strictness.",
    "explanation": "Cả hai cú pháp oneOf: [{\"type\": \"string\"}, {\"type\": \"null\"}] và \"type\": [\"string\", \"null\"] đều xác định chính xác cùng một miền giá trị (hoặc là một chuỗi ký tự, hoặc là giá trị null). Trong các công cụ thực thi cấu trúc đầu ra (constrained decoding / structured output) của LLM, cả hai dạng biểu diễn này đều được chuyển đổi thành các quy tắc ngữ pháp tương đương. Việc trường xuất hiện hay bị bỏ qua phụ thuộc hoàn toàn vào mảng required của JSON Schema chứ không phụ thuộc vào cách khai báo nullability.\n- Đáp án A sai vì oneOf không làm tăng tỷ lệ tạo null hay thay đổi thứ tự đánh giá theo cách ảnh hưởng đến LLM.\n- Đáp án B sai vì cú pháp danh sách type [\"string\", \"null\"] là cú pháp chuẩn của JSON Schema Draft-04/07/2020-12 được hỗ trợ đầy đủ.\n- Đáp án C đúng vì hai cú pháp hoàn toàn tương đương về ngữ nghĩa và hành vi mô hình.\n- Đáp án D sai vì việc bắt buộc xuất hiện hay cho phép bỏ qua trường được điều khiển bởi mảng required.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-012",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-012",
    "questionEN": "A logistics software platform, ShipExpress, uses an LLM agent to extract delivery details into a JSON schema containing a non-nullable required shipping_address object (properties: street_address, city, zip_code, suite_number). In 30% of commercial orders, suite_number is not applicable. The schema defines shipping_address as required at the root level, and inside shipping_address.properties, suite_number is typed as \"type\": [\"string\", \"null\"] and included in shipping_address.required. How does the LLM behave when parsing an order without a suite number, and why?",
    "question": "[d4-b09-B-012] Nền tảng logistics ShipExpress sử dụng một LLM agent để trích xuất thông tin giao hàng vào một JSON Schema có đối tượng shipping_address là không-thể-null và bắt buộc xuất hiện (chứa các thuộc tính: street_address, city, zip_code, suite_number). Trong 30% đơn hàng thương mại, suite_number không áp dụng. Schema khai báo shipping_address thuộc mảng required ở cấp gốc, và bên trong shipping_address.properties, trường suite_number được định dạng \"type\": [\"string\", \"null\"] đồng thời đưa vào mảng shipping_address.required. LLM sẽ xử lý như thế nào khi phân tích một đơn hàng không có số phòng/căn hộ (suite number), và tại sao?",
    "optionsEN": [
      "A. The model fails schema validation because nested nullable fields inside non-nullable parent objects trigger recursive parser errors in LLM output engines.",
      "B. The model omits the shipping_address parent object entirely whenever suite_number is null because hierarchical null values invalidate top-level objects.",
      "C. The model fabricates a placeholder string such as \"N / A\" or \"Suite 0\" because nested objects cannot output explicit JSON null values.",
      "D. The model successfully generates the complete shipping_address object with \"suite_number\": null because nested JSON Schema constraints are evaluated independently per hierarchy level."
    ],
    "options": [
      "A. Mô hình thất bại khi kiểm định schema vì các trường nullable nằm trong đối tượng cha không-null sẽ kích hoạt lỗi phân tích cú pháp đệ quy trong công cụ xuất dữ liệu của LLM.",
      "B. Mô hình bỏ qua hoàn toàn đối tượng cha shipping_address bất cứ khi nào suite_number là null vì giá trị null phân cấp sẽ vô hiệu hóa toàn bộ đối tượng cấp cao hơn.",
      "C. Mô hình tự bịa ra một chuỗi ký tự giả như \"N / A\" hoặc \"Suite 0\" vì các đối tượng lồng nhau không thể xuất giá trị JSON null tường minh.",
      "D. Mô hình tạo thành công đối tượng shipping_address hoàn chỉnh với \"suite_number\": null vì các ràng buộc JSON Schema lồng nhau được đánh giá độc lập theo từng cấp phân cấp."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because modern LLM structured output engines easily evaluate nested JSON schemas without encountering recursive parser failures.",
      "Option B is incorrect because a null value for a nested property does not invalidate or cause the omission of its required parent object.",
      "Option C is incorrect because when suite_number is explicitly defined as nullable and listed in the nested required array, the LLM outputs a clean JSON null instead of placeholder strings.",
      "Option D is correct because JSON Schema enforcers evaluate rules hierarchically: shipping_address must be generated because it is required at the root, and suite_number generates null because it allows null and is required inside the nested object."
    ],
    "rationale": "Nested schema validation in LLM structured output engines operates hierarchically and independently at each level of the JSON document. Because shipping_address is required at the top level, the model produces the object structure; because suite_number is typed as [\"string\", \"null\"] and included in shipping_address.required, the model correctly outputs \"suite_number\": null when no suite number exists in the input.",
    "explanation": "Trong JSON Schema dành cho LLM, quá trình kiểm định và ép buộc cấu trúc đầu ra hoạt động theo phân cấp độc lập từng cấp. Khi đối tượng shipping_address được khai báo bắt buộc (required) ở cấp gốc, mô hình sẽ luôn khởi tạo đối tượng này. Bên trong shipping_address, khi suite_number vừa cho phép nhận giá trị null (\"type\": [\"string\", \"null\"]) vừa được đưa vào mảng required của shipping_address, LLM sẽ xuất ra giá trị \"suite_number\": null một cách chính xác khi văn bản đầu vào không đề cập đến số phòng.\\n- Đáp án A sai vì các công cụ structured output hiện đại xử lý schema lồng nhau hoàn toàn bình thường mà không bị lỗi phân tích đệ quy.\\n- Đáp án B sai vì giá trị null ở thuộc tính con không làm vô hiệu hóa hay hủy bỏ đối tượng cha.\\n- Đáp án C sai vì mô hình không cần bịa ra chuỗi giả lập khi schema đã cho phép giá trị null tường minh.\\n- Đáp án D đúng vì mô hình sẽ tạo thành công đối tượng shipping_address với \"suite_number\": null nhờ cơ chế đánh giá schema phân cấp độc lập.",
    "scenarioSignature": {
      "testedPrinciple": "hierarchical evaluation of nested nullable properties inside required objects",
      "failureMode": "unnecessary schema flattening driven by false belief that nested nulls break objects",
      "rootCause": "misunderstanding independent multi-level json schema constraint enforcement",
      "requiredFix": "configure nested optional fields as nullable and required within nested schema"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]