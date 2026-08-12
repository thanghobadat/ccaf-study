[
  {
    "id": "d4-b11-4.8-011",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-011",
    "scenarioSignature": {
      "testedPrinciple": "Enum taxonomy completeness for edge cases",
      "failureMode": "Forced misclassification of novel input queries",
      "rootCause": "Enum definition lacks explicit catch-all fallback value",
      "requiredFix": "Expand enum array with explicit fallback category"
    },
    "questionEN": "In the TicketRouting-Engine platform, the JSON Schema defines the ticket_category property using an enum array [\"billing\", \"technical_support\", \"account_security\", \"feature_request\"]. When processing novel customer requests (such as account inheritance or legacy system data exports), the LLM forces these edge cases into billing or technical_support, causing an observable 18% routing error rate to tier-2 engineering teams. What is the root cause and the correct JSON Schema fix?",
    "question": "[d4-b11-4.8-011] Trong nền tảng TicketRouting-Engine, JSON Schema định nghĩa thuộc tính ticket_category bằng một mảng enum bao gồm [\"billing\", \"technical_support\", \"account_security\", \"feature_request\"]. Khi xử lý các yêu cầu mới lạ của khách hàng (như thừa kế tài khoản hoặc xuất dữ liệu hệ thống cũ), LLM bị ép buộc xếp các trường hợp biên này vào billing hoặc technical_support, gây ra tỷ lệ lỗi định tuyến 18% đến các đội ngũ kỹ thuật cấp 2. Nguyên nhân gốc rễ và giải pháp JSON Schema đúng nhất là gì?",
    "optionsEN": [
      "A. Set additionalProperties: true at the object root so the model can output dynamic string values outside the enum array.",
      "B. Increase the inference temperature to 0.7 and remove enum from ticket_category to rely on downstream regex classification.",
      "C. Add an explicit fallback value such as \"uncategorized\" to the ticket_category enum array so unexpected inquiries are not forced into wrong categories.",
      "D. Change ticket_category schema type from \"string\" to \"array\" with minItems: 1 to allow selecting multiple existing categories."
    ],
    "options": [
      "A. Thiết lập additionalProperties: true ở cấp đối tượng gốc để mô hình có thể xuất các giá trị chuỗi động nằm ngoài mảng enum.",
      "B. Tăng nhiệt độ suy luận (temperature) lên 0.7 và xóa enum khỏi ticket_category để phụ thuộc vào phân loại regex ở hạ nguồn.",
      "C. Thêm một giá trị dự phòng rõ ràng như \"uncategorized\" vào mảng enum của ticket_category để các yêu cầu bất ngờ không bị ép vào sai danh mục.",
      "D. Thay đổi kiểu schema của ticket_category từ \"string\" sang \"array\" với minItems: 1 để cho phép chọn đồng thời nhiều danh mục hiện có."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A setting additionalProperties: true allows unlisted object keys but does not expand the permitted values for the existing ticket_category enum string, leaving edge cases misclassified.",
      "Option B removing the enum constraint eliminates structural validation, increasing prompt drift and causing downstream parsing failures.",
      "Option C adding a fallback enum entry provides a valid schema-compliant category for novel edge cases, preventing forced misclassification into incorrect operational queues.",
      "Option D converting ticket_category to an array permits multiple selections but fails to address missing taxonomy coverage for unlisted inquiry types."
    ],
    "rationale": "When a strict enum lacks an intentional catch-all category (e.g., 'uncategorized' or 'other'), structured outputs force edge-case inputs into incorrect categories. Expanding the enum with an explicit fallback category provides a schema-valid target for unclassified inputs.",
    "explanation": "Khi định nghĩa thuộc tính danh mục theo dạng mảng enum nghiêm ngặt mà không bao gồm một danh mục dự phòng (catch-all) như \"uncategorized\" hoặc \"other\", các đầu vào là trường hợp biên không thuộc các nhãn sẵn có sẽ bị mô hình ép buộc xếp sai vào các danh mục không phù hợp.\n- Lựa chọn A sai vì additionalProperties: true chỉ cho phép thêm các khóa (keys) mới ở đối tượng cấp cao nhất, chứ không làm thay đổi tập hợp giá trị chuỗi được phép của thuộc tính ticket_category hiện tại.\n- Lựa chọn B sai vì việc xóa ràng buộc enum sẽ làm mất đi khả năng kiểm soát cấu trúc của JSON Schema, dẫn đến việc mô hình sinh các chuỗi ngẫu nhiên gây lỗi cho hệ thống hạ nguồn.\n- Lựa chọn C đúng vì thêm giá trị dự phòng \"uncategorized\" vào mảng enum cung cấp một nhãn hợp lệ theo schema cho các trường hợp ngoại lệ, tránh việc ép sai danh mục vận hành.\n- Lựa chọn D sai vì chuyển sang mảng cho phép chọn nhiều danh mục nhưng vẫn không giải quyết được việc thiếu nhãn đại diện cho các yêu cầu mới lạ.",
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  },
  {
    "id": "d4-b11-4.8-012",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-012",
    "scenarioSignature": {
      "testedPrinciple": "Property exclusivity in schema evolution",
      "failureMode": "Redundant and conflicting output from simultaneous field generation",
      "rootCause": "Schema defines canonical and deprecated keys without structural exclusion",
      "requiredFix": "Remove deprecated property from schema definition"
    },
    "questionEN": "During an API schema update in the InventoryIngestion-Service pipeline, the JSON Schema defines both the canonical property unit_price_usd and the legacy property legacy_price under properties without structural mutual exclusion constraints. In production, the LLM frequently generates both properties simultaneously with inconsistent numeric values, leading to a 15% transactional data mismatch rate in database ingestion. How should the JSON Schema be corrected?",
    "question": "[d4-b11-4.8-012] Trong quá trình cập nhật API schema của đường ống InventoryIngestion-Service, JSON Schema định nghĩa cả thuộc tính chuẩn unit_price_usd và thuộc tính cũ legacy_price trong mục properties mà không có ràng buộc loại trừ tương hỗ về mặt cấu trúc. Trong môi trường thực tế, LLM thường xuyên sinh ra cả hai thuộc tính đồng thời với các giá trị số không nhất quán, dẫn đến tỷ lệ bất đồng dữ liệu giao dịch 15% khi nạp vào cơ sở dữ liệu. JSON Schema nên được sửa đổi như thế nào?",
    "optionsEN": [
      "A. Add additionalProperties: false to the parent object schema while retaining both properties in the properties map.",
      "B. Include both unit_price_usd and legacy_price in the object's required array to mandate identical outputs for both fields.",
      "C. Add a property description on legacy_price instructing the model to populate it only when unit_price_usd is null.",
      "D. Remove legacy_price from properties (or mandate mutual exclusion via oneOf) so the schema prevents simultaneous output of deprecated and canonical keys."
    ],
    "options": [
      "A. Thêm additionalProperties: false vào schema của đối tượng cha trong khi vẫn giữ cả hai thuộc tính trong bản đồ properties.",
      "B. Đưa cả unit_price_usd và legacy_price vào mảng required của đối tượng để bắt buộc xuất dữ liệu giống nhau cho cả hai trường.",
      "C. Thêm mô tả (description) cho legacy_price hướng dẫn mô hình chỉ điền dữ liệu khi unit_price_usd nhận giá trị null.",
      "D. Loại bỏ legacy_price khỏi mục properties (hoặc bắt buộc loại trừ tương hỗ qua oneOf) để schema ngăn chặn việc sinh đồng thời các khóa cũ và chuẩn."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A adding additionalProperties: false disallows undeclared keys but still permits the model to generate both explicitly declared canonical and legacy keys simultaneously.",
      "Option B putting both keys in required forces the model to generate both fields on every completion, escalating redundancy and risk of conflicting price values.",
      "Option C relying on property descriptions provides soft natural language guidance that JSON Schema validation tools cannot enforcement-bind at the structural level.",
      "Option D removing the deprecated field from properties structurally prevents the LLM from emitting the legacy key alongside the canonical unit_price_usd key."
    ],
    "rationale": "When a schema lists both canonical and deprecated property names simultaneously without strict exclusion constraints, models can generate both fields with conflicting values. Removing deprecated fields from the active output schema forces strict adherence to canonical keys.",
    "explanation": "Khi một schema liệt kê cả thuộc tính chuẩn (canonical) và thuộc tính cũ đã bỏ (deprecated) đồng thời mà không có cơ chế loại trừ cấu trúc nghiêm ngặt, LLM có thể xuất ra cả hai trường với các giá trị mâu thuẫn nhau.\n- Lựa chọn A sai vì additionalProperties: false chỉ ngăn chặn các khóa chưa được khai báo, trong khi cả unit_price_usd và legacy_price đều đã được khai báo trong properties nên mô hình vẫn sinh ra cả hai.\n- Lựa chọn B sai vì việc đưa cả hai trường vào mảng required sẽ ép mô hình luôn luôn phải sinh ra cả hai thuộc tính, làm trầm trọng thêm vấn đề dư thừa và mâu thuẫn dữ liệu.\n- Lựa chọn C sai vì câu mô tả description chỉ là hướng dẫn bằng ngôn ngữ tự nhiên, không thể cung cấp khả năng cưỡng chế cấu trúc cứng như trình kiểm định JSON Schema yêu cầu.\n- Lựa chọn D đúng vì việc loại bỏ thuộc tính đã cũ khỏi mục properties sẽ ngăn chặn về mặt cấu trúc việc LLM sinh ra trường dữ liệu cũ song song với trường chuẩn unit_price_usd.",
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  }
]