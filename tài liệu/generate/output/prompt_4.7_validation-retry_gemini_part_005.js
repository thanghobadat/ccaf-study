[
  {
    "id": "d4-b10-4.7-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-009",
    "scenarioSignature": {
      "testedPrinciple": "enumeration schema validation feedback",
      "failureMode": "invalid enum value rejection loop",
      "rootCause": "generic error message lacks permitted enum values",
      "requiredFix": "include explicit set of permitted enum strings in feedback prompt"
    },
    "questionEN": "An automated order dispatch pipeline uses Gemini Flash to extract shipping_carrier from customer support tickets into a JSON schema containing an enum field shipping_carrier: [\"FEDEX\", \"UPS\", \"DHL\", \"USPS\"]. When the model returns \"FedEx Express\", the validator rejects it. The system currently sends a retry prompt containing \"Validation error: shipping_carrier value is invalid\". The retry attempt fails 40% of the time because the model continues to guess non-standard string variants. How should the retry feedback prompt be modified to reliably fix this validation failure?",
    "question": "[d4-b10-4.7-009] Một đường ống điều phối đơn hàng tự động sử dụng Gemini Flash để trích xuất shipping_carrier từ phiếu hỗ trợ khách hàng vào JSON schema có chứa trường enum shipping_carrier: [\"FEDEX\", \"UPS\", \"DHL\", \"USPS\"]. Khi mô hình trả về \"FedEx Express\", trình xác thực từ chối dữ liệu. Hệ thống hiện gửi một prompt thử lại chứa \"Validation error: shipping_carrier value is invalid\". Lần thử lại thất bại 40% số lần vì mô hình tiếp tục đoán các biến thể chuỗi không chuẩn. Prompt phản hồi thử lại nên được sửa đổi như thế nào để khắc phục lỗi xác thực này một cách đáng tin cậy?",
    "optionsEN": [
      "A. Include the exact permitted string values from the JSON schema enum in the retry feedback prompt (e.g., Validation failed for shipping_carrier: 'FedEx Express'. Allowed values are strictly [\"FEDEX\", \"UPS\", \"DHL\", \"USPS\"]).",
      "B. Send only the raw JSON schema definition without any specific error message or field location so the model re-evaluates all fields from scratch.",
      "C. Append a general instruction saying \"Please fix all invalid fields and ensure all extracted values strictly conform to industry standard formatting guidelines\".",
      "D. Increase the model temperature parameter to 0.9 during the retry call to encourage the model to generate alternative capitalization formats."
    ],
    "options": [
      "A. Đưa các giá trị chuỗi được phép chính xác từ JSON schema enum vào prompt phản hồi thử lại (ví dụ: Validation failed for shipping_carrier: 'FedEx Express'. Allowed values are strictly [\"FEDEX\", \"UPS\", \"DHL\", \"USPS\"]).",
      "B. Chỉ gửi định nghĩa JSON schema thô mà không có thông báo lỗi cụ thể hoặc vị trí trường để mô hình tự đánh giá lại tất cả các trường từ đầu.",
      "C. Thêm một hướng dẫn chung ghi \"Please fix all invalid fields and ensure all extracted values strictly conform to industry standard formatting guidelines\".",
      "D. Tăng tham số nhiệt độ (temperature) của mô hình lên 0.9 trong cuộc gọi thử lại để khuyến khích mô hình tạo ra các định dạng viết hoa thay thế."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because providing the exact list of allowed enum strings in the retry prompt directly targets the root cause, giving the model precise constraints to correct 'FedEx Express' to 'FEDEX'.",
      "Option B is incorrect because sending only the raw JSON schema without pointing out the specific failing field or invalid value leaves the model guessing what went wrong, leading to repeated validation failures.",
      "Option C is incorrect because adding a generic instruction without listing the actual allowed enum options fails to inform the model of the exact string constants expected by the validator.",
      "Option D is incorrect because increasing temperature increases randomness and output variance, which makes non-compliant enum string generation even more likely rather than fixing schema alignment."
    ],
    "rationale": "When an enum field fails schema validation, generic error messages force the LLM to guess the expected value space. Including the exact set of permitted enum values directly in the retry payload provides clear feedback that allows the model to map its invalid extraction to an allowed constant.",
    "explanation": "Phân tích các phương án:\n- Phương án A (Đúng): Cung cấp danh sách chính xác các giá trị enum được cho phép trong prompt thử lại giúp mô hình nhận biết ngay lỗi sai cụ thể ('FedEx Express') và sửa thành một trong các hằng số hợp lệ ('FEDEX').\n- Phương án B (Sai): Việc chỉ gửi lại schema gốc mà không chỉ rõ trường bị lỗi hoặc các giá trị hợp lệ buộc mô hình phải đoán mò lý do thất bại.\n- Phương án C (Sai): Hướng dẫn chung chung không cung cấp tập hợp giá trị hợp lệ cụ thể, khiến mô hình khó có thể tự suy ra định dạng chuỗi chính xác mà validator yêu cầu.\n- Phương án D (Sai): Tăng nhiệt độ (temperature) làm tăng tính ngẫu nhiên của đầu ra, khiến nguy cơ sinh ra các chuỗi không khớp với enum càng cao hơn.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  },
  {
    "id": "d4-b10-4.7-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-010",
    "scenarioSignature": {
      "testedPrinciple": "full object revalidation post correction",
      "failureMode": "secondary field regression during targeted retry",
      "rootCause": "validating only modified fields allows newly introduced schema errors to bypass checks",
      "requiredFix": "execute full schema and business logic revalidation on the complete regenerated object"
    },
    "questionEN": "A microservice parses medical intake forms using Gemini Flash to output a JSON payload containing patient_age, dob, and insurance_id. The initial extraction failed validation because dob was formatted as 10/24/1990 instead of ISO 8601 (1990-10-24). The application sends a retry request to correct dob. In the retry response, dob is successfully fixed to 1990-10-24, but the model altered patient_age from 33 to \"thirty-three\" (string instead of integer). If the system only re-checks the targeted dob field before persisting to PostgreSQL, what architectural defect occurs, and how must it be fixed?",
    "question": "[d4-b10-4.7-010] Một microservice phân tích biểu mẫu tiếp nhận y tế bằng Gemini Flash để xuất ra payload JSON chứa patient_age, dob và insurance_id. Lần trích xuất đầu tiên thất bại khi xác thực do dob được định dạng là 10/24/1990 thay vì ISO 8601 (1990-10-24). Ứng dụng gửi yêu cầu thử lại để sửa dob. Trong phản hồi thử lại, dob đã được sửa thành công thành 1990-10-24, nhưng mô hình đã thay đổi patient_age từ 33 thành \"thirty-three\" (chuỗi thay vì số nguyên). Nếu hệ thống chỉ kiểm tra lại trường mục tiêu dob trước khi lưu vào PostgreSQL, khiếm khuyết kiến trúc nào xảy ra và phải khắc phục như thế nào?",
    "optionsEN": [
      "A. The system will throw an unhandled database exception because dob remains invalid; the system should only validate fields that were unchanged in the retry response.",
      "B. The system persists corrupted data because patient_age escaped validation; every retry response must undergo complete end-to-end schema revalidation across all fields.",
      "C. The retry loop will enter an infinite recursion; the system must strip patient_age from the JSON payload prior to triggering the retry call.",
      "D. The model will fail to parse future prompts; the retry handler should merge only the modified field into the original object without re-parsing the response."
    ],
    "options": [
      "A. Hệ thống sẽ ném một ngoại lệ cơ sở dữ liệu không được xử lý vì dob vẫn không hợp lệ; hệ thống chỉ nên xác thực các trường không thay đổi trong phản hồi thử lại.",
      "B. Hệ thống lưu trữ dữ liệu bị hỏng vì patient_age thoát khỏi việc xác thực; mọi phản hồi thử lại đều phải trải qua quá trình xác thực lại toàn bộ schema từ đầu đến cuối trên tất cả các trường.",
      "C. Vòng lặp thử lại sẽ đi vào đệ quy vô tận; hệ thống phải loại bỏ patient_age khỏi payload JSON trước khi kích hoạt cuộc gọi thử lại.",
      "D. Mô hình sẽ thất bại khi phân tích các prompt tương lai; Trình xử lý thử lại chỉ nên hợp nhất trường đã sửa đổi vào đối tượng ban đầu mà không cần phân tích lại phản hồi."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because dob was successfully corrected to ISO 8601 format; validating unchanged fields instead of newly generated ones reverses proper retry validation principles.",
      "Option B is correct because models frequently introduce regressions in previously valid fields when regenerating responses; revalidating the entire payload prevents invalid data like 'thirty-three' from being written to persistence storage.",
      "Option C is incorrect because stripping unrelated fields like patient_age breaks schema integrity and contextual dependencies required by the model during generation, and does not address the validation gap.",
      "Option D is incorrect because merging targeted fields without re-validating the full regenerated payload risks accepting corrupted values or partial updates that violate multi-field domain constraints."
    ],
    "rationale": "LLM retry generations are non-deterministic and can introduce new schema or semantic regressions in fields that were previously valid. Performing full-object revalidation after every retry ensures that side-effect corruptions are caught before data persistence.",
    "explanation": "Phân tích các phương án:\n- Phương án A (Sai): Trường dob đã được sửa đúng định dạng ISO 8601, lỗi không nằm ở dob mà nằm ở trường patient_age bị thoái hóa dữ liệu.\n- Phương án B (Đúng): Các lần tạo lại của LLM có tính không xác định, mô hình có thể làm sai một trường vốn đã đúng trước đó. Việc chỉ xác thực lại trường mục tiêu khiến dữ liệu lỗi của patient_age chui qua kiểm tra và lưu vào CSDL. Cần phải xác thực toàn bộ đối tượng sau mỗi lần sửa đổi.\n- Phương án C (Sai): Loại bỏ trường patient_age làm hỏng tính toàn vẹn của schema và ngữ cảnh đầu ra của mô hình.\n- Phương án D (Sai): Hợp nhất trực tiếp mà không kiểm tra lại toàn bộ đối tượng vẫn dẫn đến nguy cơ ghi nhận dữ liệu bị hỏng nếu mô hình thay đổi cấu trúc hoặc giá trị các trường liên quan.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  }
]