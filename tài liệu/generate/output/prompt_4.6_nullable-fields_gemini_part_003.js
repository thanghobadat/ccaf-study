[
  {
    "id": "d4-b09-new-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-005",
    "scenarioSignature": {
      "testedPrinciple": "nullable schema field enforcement",
      "failureMode": "model fabricates identifier for non existent entity",
      "rootCause": "optional field required in schema without explicit null type support",
      "requiredFix": "define field as nullable type and retain in required list"
    },
    "questionEN": "An automated loan processing API uses an LLM to extract applicant data into JSON. For individual applications without a joint applicant, co_borrower_id is missing. However, because co_borrower_id is listed in the JSON Schema required array typed as \"type\": \"string\", the LLM hallucinates a synthetic 9-digit borrower ID, causing 14% of individual applications to fail downstream CreditCheckService validation. How should the schema be modified to prevent this hallucination while maintaining explicit signaling?",
    "question": "[d4-b09-new-005] Một API xử lý khoản vay tự động sử dụng LLM để trích xuất dữ liệu người nộp đơn sang JSON. Đối với các đơn xin vay cá nhân không có người đồng vay, trường co_borrower_id không tồn tại. Tuy nhiên, vì co_borrower_id được liệt kê trong mảng required của JSON Schema với kiểu \"type\": \"string\", LLM đã ảo giác tự tạo ra một mã định danh 9 chữ số giả lập, khiến 14% đơn vay cá nhân thất bại khi xác thực qua CreditCheckService downstream. Cần sửa đổi schema như thế nào để ngăn chặn hành vi ảo giác này mà vẫn đảm bảo tín hiệu tường minh?",
    "optionsEN": [
      "A. Change the property type to \"type\": [\"string\", \"null\"] while keeping co_borrower_id in the required array.",
      "B. Remove co_borrower_id from the required array while keeping \"type\": \"string\".",
      "C. Add \"default\": \"\" to the co_borrower_id schema property without modifying required.",
      "D. Set \"additionalProperties\": false at the root object level of the schema."
    ],
    "options": [
      "A. Thay đổi kiểu thuộc tính thành \"type\": [\"string\", \"null\"] trong khi vẫn giữ co_borrower_id trong mảng required.",
      "B. Loại bỏ co_borrower_id khỏi mảng required trong khi vẫn giữ \"type\": \"string\".",
      "C. Thêm \"default\": \"\" vào thuộc tính schema co_borrower_id mà không thay đổi required.",
      "D. Thiết lập \"additionalProperties\": false ở cấp đối tượng gốc của schema."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because defining co_borrower_id as [\"string\", \"null\"] and keeping it in required forces the LLM to emit \"co_borrower_id\": null for individual applicants, eliminating ID fabrication while providing explicit status downstream.",
      "Option B is incorrect because removing the field from required allows the model to omit it entirely, which leads to unpredictable presence/absence behavior in LLM responses rather than explicit null signaling.",
      "Option C is incorrect because JSON schema default values are not strictly honored by generative LLMs during schema enforcement, leading the model to continue generating random strings to satisfy the string type requirement.",
      "Option D is incorrect because additionalProperties: false restricts key names outside the schema but does not prevent the model from generating fabricated values for required properties already defined."
    ],
    "rationale": "When an optional domain concept is missing from input data but mandated as a non-nullable required string in JSON Schema, LLMs fabricate realistic values to satisfy the schema constraint. Making the field explicitly nullable ([\"string\", \"null\"]) while keeping it in the required list forces the LLM to output null explicitly, preventing downstream credit validation failures.",
    "explanation": "Lựa chọn A đúng vì việc cấu hình kiểu thuộc tính co_borrower_id thành [\"string\", \"null\"] kết hợp giữ nguyên trường trong mảng required sẽ bắt buộc LLM xuất ra \"co_borrower_id\": null khi không có người đồng vay, loại bỏ việc tự tạo mã định danh giả mà vẫn cung cấp tín hiệu rõ ràng cho hệ thống downstream.\nLựa chọn B sai vì việc xóa trường khỏi mảng required cho phép mô hình bỏ qua trường, dẫn đến hành vi xuất dữ liệu không nhất quán thay vì trả về tín hiệu null tường minh.\nLựa chọn C sai vì các giá trị default trong JSON Schema không được mô hình ngôn ngữ tuân thủ một cách nghiêm ngặt khi tạo cấu trúc JSON, mô hình vẫn sẽ ảo giác chuỗi ký tự để đáp ứng ràng buộc string.\nLựa chọn D sai vì additionalProperties: false chỉ ngăn mô hình thêm các trường nằm ngoài schema, không ngăn mô hình ảo giác giá trị cho các trường bắt buộc đã khai báo.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-006",
    "scenarioSignature": {
      "testedPrinciple": "explicit null value JSON schema signaling",
      "failureMode": "model fabricates return date for one-way flight booking",
      "rootCause": "non nullable schema requirement for optional contextual attribute",
      "requiredFix": "mark field as explicitly nullable and keep in required array"
    },
    "questionEN": "A travel itinerary extractor parses flight details into structured JSON for booking microservices. When parsing a one-way flight ticket, no return flight exists. Because the schema specifies return_date in required with \"type\": \"string\", the model hallucinates a return_date exactly 7 days after departure, creating invalid round-trip reservations in the Global Distribution System (GDS). Which schema adjustment correctly resolves this issue?",
    "question": "[d4-b09-new-006] Một hệ thống trích xuất lịch trình du lịch phân tích chi tiết chuyến bay thành JSON có cấu trúc cho microservice đặt vé. Khi phân tích vé máy bay một chiều, không có ngày về. Vì schema quy định return_date nằm trong required với \"type\": \"string\", mô hình đã tự ảo giác ra một return_date đúng 7 ngày sau ngày khởi hành, tạo ra các đặt chỗ khứ hồi không hợp lệ trên Global Distribution System (GDS). Điều chỉnh schema nào sau đây giải quyết đúng vấn đề này?",
    "optionsEN": [
      "A. Omit return_date from the required array and rely on the model to exclude the field entirely.",
      "B. Define return_date as \"type\": [\"string\", \"null\"] and retain it in the schema's required array.",
      "C. Specify a JSON Schema regex pattern matching ISO dates to reject fabricated values.",
      "D. Set \"default\": null in the return_date property definition without changing required."
    ],
    "options": [
      "A. Bỏ return_date khỏi mảng required và phụ thuộc vào việc mô hình tự loại bỏ hoàn toàn trường này.",
      "B. Định nghĩa return_date thành \"type\": [\"string\", \"null\"] và giữ nguyên trong mảng required của schema.",
      "C. Quy định một mẫu regex trong JSON Schema khớp với định dạng ngày ISO để từ chối các giá trị ảo giác.",
      "D. Thiết lập \"default\": null trong định nghĩa thuộc tính return_date mà không thay đổi required."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because omitting return_date from required makes field inclusion arbitrary, causing inconsistent JSON payloads where missing fields are omitted rather than explicitly set to null.",
      "Option B is correct because making return_date explicitly nullable ([\"string\", \"null\"]) while requiring its presence forces the model to emit \"return_date\": null for one-way tickets, avoiding hallucinated flight dates.",
      "Option C is incorrect because a regex pattern enforces date format syntax (e.g. YYYY-MM-DD), which fabricated valid dates like '2026-08-19' will easily satisfy.",
      "Option D is incorrect because setting a schema default of null without updating the type constraint to accept null will trigger schema validation errors when null is supplied, or be ignored during generation."
    ],
    "rationale": "For contextual attributes like return dates on one-way tickets, requiring a non-nullable string forces the LLM to invent plausible dates. Making return_date explicitly nullable ([\"string\", \"null\"]) and keeping it required ensures the model outputs \"return_date\": null, unambiguously signaling a one-way trip to downstream booking microservices.",
    "explanation": "Lựa chọn A sai vì việc bỏ return_date khỏi mảng required khiến việc xuất hiện của trường trở nên không cố định, khiến dữ liệu JSON thiếu tính nhất quán do trường bị ẩn thay vì báo hiệu null rõ ràng.\nLựa chọn B đúng vì khai báo return_date cho phép nhận giá trị null ([\"string\", \"null\"]) kết hợp việc duy trì trong mảng required buộc mô hình phải xuất ra \"return_date\": null đối với vé một chiều, ngăn ngừa hoàn toàn hành vi tạo ngày ảo.\nLựa chọn C sai vì mẫu regex chỉ kiểm tra định dạng ngày (như YYYY-MM-DD), các ngày tự tạo hợp lệ về cú pháp như '2026-08-19' vẫn sẽ vượt qua kiểm tra regex này.\nLựa chọn D sai vì việc đặt default: null mà không thay đổi khai báo type hỗ trợ null sẽ gây ra lỗi xác thực schema hoặc bị mô hình bỏ qua trong quá trình sinh dữ liệu.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]