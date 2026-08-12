[
  {
    "id": "d4-b09-new-013",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-013",
    "questionEN": "An event management platform processes attendee registration notes using an LLM to populate a structured JSON payload for catering services. When an attendee registration form contains no dietary preferences, the model outputs {\"dietary_restrictions\": \"None\"} instead of {\"dietary_restrictions\": null}. Downstream SQL database validation rejects string values other than standardized restriction codes, causing 14% of clean registration imports to throw validation errors. How should the JSON Schema and prompt be modified to enforce explicit null values for absent dietary restrictions?",
    "question": "[d4-b09-new-013] Nền tảng quản lý sự kiện xử lý ghi chú đăng ký người tham dự bằng LLM để điền payload JSON có cấu trúc cho dịch vụ ăn uống. Khi biểu mẫu đăng ký không có yêu cầu ăn uống đặc biệt nào, mô hình xuất ra {\"dietary_restrictions\": \"None\"} thay vì {\"dietary_restrictions\": null}. Cơ sở dữ liệu SQL phía sau từ chối các giá trị chuỗi không thuộc mã chuẩn hóa, khiến 14% số bản ghi sạch bị lỗi validation. Schema JSON và prompt nên được chỉnh sửa thế nào để bắt buộc giá trị null rõ ràng khi không có chế độ ăn đặc biệt?",
    "optionsEN": [
      "A. Add dietary_restrictions to the required list and set its schema type to [\"string\", \"null\"], instructing the model to return explicit null when no restrictions are mentioned.",
      "B. Remove dietary_restrictions from the required list so the model completely omits the key when no dietary restrictions exist in the input text.",
      "C. Add a string enum rule [\"Vegan\", \"Gluten - Free\", \"Nut - Free\", \"None\"] so \"None\" becomes a valid recognized string in downstream catering schemas.",
      "D. Enable additionalProperties: false at the root object schema level to force the model to purge missing string fields during extraction."
    ],
    "options": [
      "A. Thêm dietary_restrictions vào danh sách required và đặt kiểu schema thành [\"string\", \"null\"], hướng dẫn mô hình trả về null rõ ràng khi không đề cập đến hạn chế ăn uống.",
      "B. Xóa dietary_restrictions khỏi danh sách required để mô hình bỏ qua hoàn toàn khóa này khi không có hạn chế ăn uống trong văn bản đầu vào.",
      "C. Thêm quy tắc enum chuỗi [\"Vegan\", \"Gluten - Free\", \"Nut - Free\", \"None\"] để \"None\" trở thành chuỗi hợp lệ trong schema phía sau.",
      "D. Bật additionalProperties: false ở cấp root schema để buộc mô hình loại bỏ các trường chuỗi còn thiếu trong quá trình trích xuất."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because placing dietary_restrictions into the required array while specifying type [\"string\", \"null\"] forces the model to generate the field with an explicit JSON null when no restriction is present, preventing placeholder string output like \"None\".",
      "Option B is incorrect because removing the field from the required array allows the model to omit the field key altogether, introducing structural non-determinism across downstream API contracts.",
      "Option C is incorrect because masking missing data as a string enum value (\"None\") violates database normalization practices where null signifies non-existence or non-applicability.",
      "Option D is incorrect because additionalProperties: false only restricts undeclared extra keys; it does not control value generation for declared optional string attributes."
    ],
    "rationale": "To prevent models from hallucinating or defaulting to string placeholders like \"None\" when data is missing, the field must be explicitly listed in the required array and its type defined as a union including null ([\"string\", \"null\"]).",
    "explanation": "Lựa chọn A là đáp án đúng: Trong JSON Schema dành cho LLM, để xử lý các trường dữ liệu tùy chọn mà không bị mô hình tự điền chuỗi giả lập như \"None\", giải pháp chuẩn là đưa trường đó (dietary_restrictions) vào danh sách required và đặt kiểu dữ liệu dạng union [\"string\", \"null\"] (hoặc oneOf). Điều này buộc mô hình luôn sinh ra khóa đó nhưng gán giá trị null khi không có dữ liệu đầu vào.\\n\\nLựa chọn B sai vì nếu bỏ trường khỏi required, mô hình có thể không sinh ra khóa này trong JSON, gây bất định về cấu trúc đối với parser phía sau.\\n\\nLựa chọn C sai vì biến \"None\" thành enum chuỗi làm lẫn lộn giữa dữ liệu thực và trạng thái không có dữ liệu, vi phạm chuẩn thiết kế CSDL.\\n\\nLựa chọn D sai vì additionalProperties: false chỉ ngăn mô hình sinh thêm trường lạ không định nghĩa, chứ không giải quyết cách điền giá trị cho trường có sẵn.",
    "scenarioSignature": {
      "testedPrinciple": "explicit nullability enforcement in JSON schema",
      "failureMode": "model emits string literal representation instead of null for absent attributes",
      "rootCause": "schema lacks explicit null type allowance for required optional fields",
      "requiredFix": "declare field in required array and specify union type string null"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-014",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-014",
    "questionEN": "A subscription management system uses an LLM to parse account status notes and generate customer records. For active subscribers who have not submitted a cancellation request, the model generates {\"cancellation_reason\": \"\"} (an empty string) instead of {\"cancellation_reason\": null}. Downstream analytics pipelines count empty strings as valid cancellation events, artificially inflating monthly subscriber churn by 8.5%. How should the JSON Schema and prompt be configured to ensure active accounts accurately record null?",
    "question": "[d4-b09-new-014] Hệ thống quản lý đăng ký sử dụng LLM để phân tích ghi chú trạng thái tài khoản và tạo bản ghi khách hàng. Đối với người dùng đang hoạt động chưa gửi yêu cầu hủy, mô hình tạo {\"cancellation_reason\": \"\"} (chuỗi rỗng) thay vì {\"cancellation_reason\": null}. Pipeline phân tích phía sau tính chuỗi rỗng là sự kiện hủy hợp lệ, làm tăng nhân tạo tỷ lệ rời bỏ hàng tháng lên 8.5%. Schema JSON và prompt nên được cấu hình thế nào để đảm bảo các tài khoản đang hoạt động ghi nhận chính xác null?",
    "optionsEN": [
      "A. Set a default: null property on cancellation_reason in the JSON Schema so missing values automatically convert to null during parsing.",
      "B. Include cancellation_reason in the schema's required array with type [\"string\", \"null\"], prompting the model to explicitly return null when no cancellation reason exists.",
      "C. Add a post-processing filter script to clean empty strings \"\" into null before database insertion while keeping the schema type as \"string\".",
      "D. Omit cancellation_reason from the required array and rely on model sampling temperature parameters to suppress output for active users."
    ],
    "options": [
      "A. Đặt thuộc tính default: null cho cancellation_reason trong JSON Schema để các giá trị thiếu tự động chuyển thành null trong quá trình parse.",
      "B. Đưa cancellation_reason vào mảng required của schema với kiểu [\"string\", \"null\"], hướng dẫn mô hình trả về null rõ ràng khi không có lý do hủy.",
      "C. Thêm script xử lý hậu kỳ để lọc chuỗi rỗng \"\" thành null trước khi lưu vào cơ sở dữ liệu trong khi giữ nguyên kiểu schema là \"string\".",
      "D. Loại bỏ cancellation_reason khỏi mảng required và phụ thuộc vào tham số temperature của mô hình để triệt tiêu đầu ra cho người dùng đang hoạt động."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because JSON Schema default keywords are annotations not strictly enforced by LLM output generation engines like Claude.",
      "Option B is correct because specifying cancellation_reason as required and setting type to [\"string\", \"null\"] instructs the model to explicitly emit JSON null for active users rather than falling back to empty string creation.",
      "Option C is incorrect because post-processing scripts are fragile workarounds that fail to solve structural generation root causes within the prompt-schema contract.",
      "Option D is incorrect because removing the field from required leads to unpredictable key omission or arbitrary string generation independent of sampling temperature."
    ],
    "rationale": "When a field is required by contract but may legally have no value (such as a cancellation reason for active subscribers), the schema must mandate its presence in required and allow null via [\"string\", \"null\"] to prevent the model from generating empty strings.",
    "explanation": "Lựa chọn B là đáp án đúng: Khi một trường là bắt buộc trong contract nhưng có thể không có dữ liệu thực tế (như lý do hủy tài khoản đối với khách hàng đang hoạt động), schema cần khai báo trường đó trong mảng required đồng thời quy định kiểu [\"string\", \"null\"]. Cấu hình này buộc LLM xuất ra null một cách tường minh thay vì tạo chuỗi rỗng \"\" để thỏa mãn kiểu chuỗi đơn thuần.\\n\\nLựa chọn A sai vì từ khóa default trong JSON Schema chỉ là metadata annotation và không được các LLM như Claude tự động thực thi khi sinh dữ liệu.\\n\\nLựa chọn C sai vì xử lý hậu kỳ bằng script chỉ là biện pháp tình thế, không khắc phục được nguyên nhân gốc rễ ở cấp độ sinh dữ liệu có cấu trúc.\\n\\nLựa chọn D sai vì bỏ trường khỏi required sẽ khiến mô hình bỏ hẳn khóa hoặc sinh đầu ra không đồng nhất, không đảm bảo tính ổn định của JSON.",
    "scenarioSignature": {
      "testedPrinciple": "distinguishing empty string from null in structured json",
      "failureMode": "model emits empty string instead of null for inactive optional attributes",
      "rootCause": "schema string constraint forces model to fill non-existent value with empty string",
      "requiredFix": "declare attribute in required array with union type string null"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]