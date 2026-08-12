[
  {
    "id": "d4-b09-new-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-003",
    "scenarioSignature": {
      "testedPrinciple": "explicit field nullability in required JSON schemas",
      "failureMode": "hallucination of entity names for absent history",
      "rootCause": "required non-nullable schema constraint without null option",
      "requiredFix": "include field in required array with union null type"
    },
    "questionEN": "An HR onboarding service, TalentStream AI, uses Claude to parse candidate resumes into structured JSON schema objects. In the JSON schema, the previous_employer string field is included in the required array to ensure downstream background-check services receive full candidate records. However, for entry-level applicants with no prior job history, Claude fabricates fictitious company names like 'Acme Solutions' to satisfy the schema requirement, triggering high background verification error rates. Which JSON Schema modification correctly prevents hallucination for candidates without previous work history?",
    "question": "[d4-b09-new-003] Dịch vụ onboarding nhân sự TalentStream AI sử dụng Claude để phân tích sơ yếu lý lịch của ứng viên thành các đối tượng JSON schema. Trong JSON schema, trường chuỗi previous_employer được đưa vào mảng required để đảm bảo các dịch vụ xác minh lý lịch phía sau nhận đủ hồ sơ ứng viên. Tuy nhiên, đối với những ứng viên mới tốt nghiệp chưa có kinh nghiệm làm việc, Claude tự bịa ra các tên công ty giả như 'Acme Solutions' để đáp ứng yêu cầu schema, dẫn đến tỷ lệ lỗi xác minh lý lịch cao. Thay đổi JSON Schema nào sau đây giải quyết chính xác hiện tượng ảo giác cho các ứng viên chưa có lịch sử làm việc?",
    "optionsEN": [
      "A. Remove previous_employer from the required array entirely, allowing Claude to omit the key when parsing resumes of entry-level applicants.",
      "B. Set \"additionalProperties\": false on the root schema object and specify a default string value \"N/A\" for previous_employer.",
      "C. Retain previous_employer in the required array and define its type as {\"type\": [\"string\", \"null\"]}.",
      "D. Wrap previous_employer inside a nested previous_experience object while leaving the inner field typed as \"type\": \"string\"."
    ],
    "options": [
      "A. Loại bỏ previous_employer khỏi mảng required, cho phép Claude bỏ qua khóa này khi phân tích sơ yếu lý lịch của ứng viên mới tốt nghiệp.",
      "B. Đặt \"additionalProperties\": false trên đối tượng schema gốc và chỉ định giá trị mặc định \"N/A\" cho previous_employer.",
      "C. Giữ previous_employer trong mảng required và định nghĩa kiểu dữ liệu của nó là {\"type\": [\"string\", \"null\"]}.",
      "D. Bọc previous_employer bên trong đối tượng lồng nhau previous_experience trong khi vẫn giữ nguyên kiểu của trường bên trong là \"type\": \"string\"."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because omitting optional keys from the required array causes unpredictable model behavior and prevents downstream systems from distinguishing unparsed data from absent history.",
      "Option B is incorrect because default schema keywords are not enforced by Claude during structured generation, so the model will still hallucinate string values to satisfy the non-nullable string schema.",
      "Option C is correct because retaining previous_employer in the required array while defining its type as [\"string\", \"null\"] forces Claude to explicitly emit null for entry-level candidates without fabricating company names.",
      "Option D is incorrect because nesting the field inside a sub-object without changing its primitive type to union null still forces Claude to fabricate a string value."
    ],
    "rationale": "When a field is in the required array and strictly typed as a non-nullable string, Claude will fabricate placeholder string data when source information is missing. Adding \"null\" to the type definition ({\"type\": [\"string\", \"null\"]}) while keeping the field in required signals to Claude that null is a valid, validatable response, eliminating hallucinated company names.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A sai: Việc loại bỏ trường khỏi mảng required khiến Claude có thể bỏ qua khóa này hoàn toàn (omitted field). Hệ thống phía sau không thể phân biệt giữa việc dữ liệu bị thiếu do lỗi phân tích hay do ứng viên thực sự không có kinh nghiệm làm việc.\n- Option B sai: Từ khóa default trong JSON Schema không được Claude hoặc công cụ sinh cấu trúc bắt buộc áp dụng khi tạo đầu ra, nên mô hình vẫn sẽ ảo giác ra tên công ty dạng chuỗi để thỏa mãn kiểu string.\n- Option C đúng: Giữ previous_employer trong mảng required kết hợp với kiểu hợp [\"string\", \"null\"] buộc Claude phải xuất ra giá trị null một cách tường minh khi ứng viên không có kinh nghiệm làm việc, ngăn chặn triệt để hành vi bịa đặt tên công ty.\n- Option D sai: Việc lồng trường vào đối tượng con mà không thay đổi kiểu dữ liệu thành nullable vẫn buộc mô hình phải tạo ra một chuỗi tên công ty giả bên trong đối tượng đó.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-004",
    "scenarioSignature": {
      "testedPrinciple": "explicit field nullability in required JSON schemas",
      "failureMode": "fabrication of personal names when entity is absent",
      "rootCause": "required non-nullable schema constraint without null option",
      "requiredFix": "include field in required array with union null type"
    },
    "questionEN": "A court filing automation platform, LexiParse AI, uses Claude to extract legal entities from divorce petitions. The JSON Schema specifies opposing_counsel as a required string field. When processing uncontested divorce petitions where no opposing counsel exists, Claude fabricates fictitious attorney names (e.g., 'Jane Doe, Esq.'), resulting in invalid legal service notices dispatched by downstream automated systems. What is the correct schema implementation to ensure Claude returns an explicit null signal without fabricating attorney names?",
    "question": "[d4-b09-new-004] Nền tảng tự động hóa hồ sơ pháp lý LexiParse AI sử dụng Claude để trích xuất các thực thể pháp lý từ đơn ly hôn. JSON Schema quy định opposing_counsel (luật sư đối phương) là một trường chuỗi bắt buộc (required). Khi xử lý các đơn ly hôn thuận tình không có luật sư đối phương, Claude tự bịa ra tên luật sư giả (ví dụ: 'Jane Doe, Esq.'), dẫn đến các thông báo pháp lý tự động bị gửi sai. Cấu hình schema nào là chính xác để đảm bảo Claude trả về tín hiệu null tường minh mà không bịa đặt tên luật sư?",
    "optionsEN": [
      "A. Use \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"object\"}] for opposing_counsel and remove it from the schema's required properties list.",
      "B. Set opposing_counsel type to \"string\" and add \"pattern\": \"^(N/A|None|null)$\" to constrain valid non-attorney responses.",
      "C. Remove opposing_counsel from the JSON Schema entirely and instruct Claude in the prompt text to add \"opposing_counsel\": null if found.",
      "D. Keep opposing_counsel in the required list and define its schema using \"type\": [\"string\", \"null\"] or \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]."
    ],
    "options": [
      "A. Sử dụng \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"object\"}] cho opposing_counsel và xóa trường này khỏi danh sách required của schema.",
      "B. Đặt kiểu của opposing_counsel là \"string\" và thêm \"pattern\": \"^(N/A|None|null)$\" để giới hạn các câu trả lời không phải luật sư.",
      "C. Xóa hoàn toàn opposing_counsel khỏi JSON Schema và hướng dẫn Claude trong prompt tự thêm \"opposing_counsel\": null nếu tìm thấy.",
      "D. Giữ opposing_counsel trong danh sách required và khai báo schema của nó bằng \"type\": [\"string\", \"null\"] hoặc \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"]}."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because omitting opposing_counsel from required leads to missing keys, and unioning with object type does not allow JSON null values.",
      "Option B is incorrect because adding regex patterns for fallback text like 'N/A' still treats the field as a string rather than leveraging standard JSON null types, and can lead to validation issues.",
      "Option C is incorrect because removing the field from the schema prevents the structured output engine from enforcing or emitting the property at all.",
      "Option D is correct because keeping opposing_counsel in required while permitting [\"string\", \"null\"] forces Claude to output an explicit null when no opposing attorney exists, preventing name fabrication."
    ],
    "rationale": "In structured output parsing for legal filings, optional entities (like opposing counsel in uncontested proceedings) must be explicitly represented as nullable. By retaining opposing_counsel in the schema's required array and specifying \"type\": [\"string\", \"null\"] (or \"oneOf\": [{\"type\": \"string\"}, {\"type\": \"null\"}]), Claude is forced to choose between a string name or a literal null, preventing hallucination of fake attorney names.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A sai: Loại bỏ trường khỏi required dẫn đến việc thiếu khóa trong JSON đầu ra, và việc mở rộng kiểu sang object không hỗ trợ giá trị null chuẩn của JSON.\n- Option B sai: Việc dùng regex pattern để khớp các chuỗi như 'N/A' vẫn coi trường đó là string thay vì tận dụng kiểu null bản địa của JSON, dễ gây lỗi validation nếu mô hình sinh chuỗi khác.\n- Option C sai: Nếu xóa trường khỏi JSON Schema, bộ công cụ structured output sẽ không cho phép mô hình tạo ra trường đó trong đối tượng JSON trả về.\n- Option D đúng: Giữ opposing_counsel trong required đồng thời cho phép kiểu [\"string\", \"null\"] sẽ ép Claude phải trả về \"opposing_counsel\": null một cách rõ ràng khi đơn ly hôn là thuận tình (không có luật sư đối phương), loại bỏ hoàn toàn việc ảo giác tên luật sư.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]