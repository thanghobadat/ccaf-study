[
  {
    "id": "d4-b11-4.8-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-001",
    "questionEN": "An automated transaction routing system (TxRouterService) uses Claude to extract settlement payloads with fields transaction_id, amount_cents, and currency. The JSON schema defines type: \"object\", properties, and required, but omits additionalProperties: false. Claude occasionally inserts extra helper fields like internal_reasoning or confidence_score into the JSON response payload. Downstream strict Pydantic parsers reject the payload with an extra key validation error, causing transaction processing retries to spike by 18%. Which JSON Schema modification resolves this issue?",
    "question": "[d4-b11-4.8-001] Hệ thống điều hướng giao dịch (TxRouterService) sử dụng Claude để trích xuất payload thanh toán gồm các trường transaction_id, amount_cents và currency. Schema JSON định nghĩa type: \"object\", properties, và required, nhưng bỏ qua additionalProperties: false. Claude thỉnh thoảng chèn thêm các trường phụ trợ như internal_reasoning hoặc confidence_score vào payload JSON trả về. Bộ phân tích Pydantic nghiêm ngặt ở phía sau từ chối payload do lỗi extra key validation, khiến tỷ lệ thử lại xử lý giao dịch tăng thêm 18%. Thay đổi nào trong JSON Schema giải quyết triệt để vấn đề này?",
    "optionsEN": [
      "A. Set \"additionalProperties\": false at the top level of the JSON Schema to explicitly prohibit non-declared properties in the output payload.",
      "B. Add \"internal_reasoning\" and \"confidence_score\" to the required array of the JSON Schema.",
      "C. Change the top-level type from \"object\" to an \"array\" of key-value property objects.",
      "D. Add system prompt instructions telling the model not to include unlisted JSON keys."
    ],
    "options": [
      "A. Đặt \"additionalProperties\": false ở cấp cao nhất của JSON Schema để cấm rõ ràng các thuộc tính không được khai báo trong payload.",
      "B. Thêm \"internal_reasoning\" và \"confidence_score\" vào mảng required của JSON Schema.",
      "C. Thay đổi type cấp cao nhất từ \"object\" sang \"array\" chứa các đối tượng thuộc tính key-value.",
      "D. Thêm hướng dẫn trong system prompt yêu cầu mô hình không bao gồm các JSON key không liệt kê."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because specifying additionalProperties: false in the top-level object schema forces strict validation compliance, preventing the model from including undeclared fields like internal_reasoning and eliminating downstream Pydantic parsing errors in TxRouterService.",
      "Option B is incorrect because adding internal_reasoning and confidence_score to required makes those helper fields mandatory for every request, altering the target domain payload contract rather than prohibiting undeclared fields.",
      "Option C is incorrect because changing the root data structure to an array alters the API schema layout completely without enforcing property restrictions on individual element objects.",
      "Option D is incorrect because natural language prompt directives lack strict structural enforcement guarantees provided by schema validation at the API parameter boundary."
    ],
    "rationale": "By default, JSON Schema objects allow extra properties unless additionalProperties is explicitly set to false. Setting additionalProperties: false enforces strict structural boundaries, ensuring the model output contains only declared fields.",
    "explanation": "Lựa chọn A là đáp án đúng vì theo mặc định trong JSON Schema, một object vẫn cho phép chứa các thuộc tính bổ sung trừ khi bổ sung thuộc tính \"additionalProperties\": false. Việc cấu hình thuộc tính này ở cấp cao nhất ép buộc mô hình tuân thủ chính xác cấu trúc khai báo và loại bỏ hoàn toàn các trường phụ trợ không khai báo như internal_reasoning hay confidence_score, giải quyết lỗi phân tích Pydantic trong TxRouterService.\\n\\nLựa chọn B sai vì việc thêm các trường này vào mảng required chỉ khiến chúng trở thành bắt buộc trong mọi payload, làm thay đổi cấu trúc dữ liệu thanh toán thay vì cấm các trường lạ.\\n\\nLựa chọn C sai vì chuyển đổi kiểu dữ liệu sang array thay đổi hoàn toàn hợp đồng API mà không giải quyết được việc giới hạn thuộc tính của đối tượng.\\n\\nLựa chọn D sai vì các câu lệnh trong prompt bằng ngôn ngữ tự nhiên không thể đảm bảo tính ép buộc cấu trúc ở cấp độ kiểm tra schema của API.",
    "scenarioSignature": {
      "testedPrinciple": "top level schema strict object evaluation",
      "failureMode": "unexpected payload keys causing downstream schema parser rejection",
      "rootCause": "omission of strict schema additional properties restriction",
      "requiredFix": "explicit configuration of additional properties set to false"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  },
  {
    "id": "d4-b11-4.8-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-002",
    "questionEN": "An Infrastructure-as-Code automation service (CloudDeployer) uses Claude to generate provisioning configurations containing an environment string field. The JSON Schema specifies type: \"string\" for environment without value constraints. Consequently, Claude outputs diverse string variants like \"prod\", \"Production\", \"prd - east\", and \"staging - v2\", causing downstream Terraform dispatchers to fail with invalid workspace errors on 24% of automated deployments. Which JSON Schema modification fixes this error?",
    "question": "[d4-b11-4.8-002] Dịch vụ tự động hóa Infrastructure-as-Code (CloudDeployer) sử dụng Claude để tạo cấu hình triển khai cơ sở hạ tầng chứa trường chuỗi environment. Schema JSON chỉ định type: \"string\" cho environment mà không có ràng buộc giá trị. Do đó, Claude tạo ra nhiều biến thể chuỗi khác nhau như \"prod\", \"Production\", \"prd - east\", và \"staging - v2\", khiến bộ điều phối Terraform phía sau thất bại với lỗi invalid workspace trên 24% lần triển khai tự động. Thay đổi JSON Schema nào khắc phục triệt để lỗi này?",
    "optionsEN": [
      "A. Set \"pattern\": \" ^ [a - z] + $\" under the environment property schema to restrict inputs to lowercase alphabet letters.",
      "B. Replace the unconstrained string definition under environment with an enum array of valid values such as [\"development\", \"staging\", \"production\"].",
      "C. Add \"minLength\": 4 and \"maxLength\": 10 constraints to the environment string property schema.",
      "D. Change environment to type: \"array\" with items set to {\"type\": \"string\"}."
    ],
    "options": [
      "A. Đặt \"pattern\": \" ^ [a - z] + $\" dưới schema thuộc tính environment để giới hạn đầu vào thành các chữ cái thường.",
      "B. Thay thế định nghĩa chuỗi không ràng buộc dưới environment bằng mảng enum chứa các giá trị hợp lệ xác định như [\"development\", \"staging\", \"production\"].",
      "C. Thêm các ràng buộc \"minLength\": 4 và \"maxLength\": 10 vào schema thuộc tính environment.",
      "D. Thay đổi environment thành type: \"array\" với items được đặt thành {\"type\": \"string\"}."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because regex pattern constraints restricting characters to lowercase letters still permit unexpected string values like prdeast or sandbox that cause Terraform workspace errors.",
      "Option B is correct because adding an enum array restricts environment to an exact set of allowed target environment strings, preventing downstream Terraform dispatcher failures in CloudDeployer.",
      "Option C is incorrect because string length constraints only check character counts and will still allow unhandled strings like prod1 or stage to pass validation.",
      "Option D is incorrect because changing environment to an array alters the single-target string schema structure while failing to constrain the internal array element strings."
    ],
    "rationale": "When a field represents a discrete set of allowed values, using unconstrained type: \"string\" permits formatting variations. Specifying an enum array enforces strict adherence to exact canonical value strings.",
    "explanation": "Lựa chọn B là đáp án đúng vì khi một trường chỉ nhận một tập hợp các giá trị hữu hạn cố định, việc chỉ định mảng enum trong JSON Schema ép buộc mô hình lựa chọn chính xác một trong các chuỗi hợp lệ đã khai báo (như [\"development\", \"staging\", \"production\"]), loại bỏ hoàn toàn các biến thể không tương thích trong CloudDeployer.\\n\\nLựa chọn A sai vì biểu thức chính quy chỉ kiểm tra ký tự chữ thường nhưng vẫn cho phép các chuỗi không hợp lệ như prdeast hay sandbox đi qua.\\n\\nLựa chọn C sai vì giới hạn độ dài chuỗi chỉ kiểm tra số lượng ký tự, các chuỗi không hợp lệ như prod1 hay stage vẫn vượt qua kiểm tra.\\n\\nLựa chọn D sai vì chuyển trường này thành mảng làm thay đổi cấu trúc dữ liệu từ chuỗi đơn sang mảng mà vẫn không giới hạn được giá trị của các phần tử bên trong mảng.",
    "scenarioSignature": {
      "testedPrinciple": "finite categorical field value enforcement",
      "failureMode": "unconstrained string variants breaking downstream dispatcher validation",
      "rootCause": "use of unconstrained string schema for discrete categorical values",
      "requiredFix": "enumeration restriction using schema enum array"
    },
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  }
]