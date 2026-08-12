[
  {
    "id": "d4-b10-4.7-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-003",
    "scenarioSignature": {
      "testedPrinciple": "targeted feedback retry mechanism",
      "failureMode": "schema validation error in nested address field",
      "rootCause": "model output missing exact regex pattern formatting",
      "requiredFix": "include specific field path and regex rule in retry prompt"
    },
    "questionEN": "An e-commerce order processing pipeline in Logistics Core Service validates LLM-extracted customer details against a JSON Schema. When processing international shipping labels, 14% of payloads fail JSON Schema validation with a SchemaValidationError because customer.address.postcode does not match the UK postal format regex ^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$. Which retry strategy provides the model with the exact information needed to correct the validation failure on the subsequent turn?",
    "question": "[d4-b10-4.7-003] Quy trình xử lý đơn hàng e-commerce trong Logistics Core Service xác thực thông tin khách hàng do LLM trích xuất dựa trên JSON Schema. Khi xử lý nhãn vận chuyển quốc tế, 14% payload thất bại khi kiểm tra JSON Schema với lỗi SchemaValidationError do trường customer.address.postcode không khớp với regex định dạng mã bưu chính Vương quốc Anh ^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$. Chiến lược thử lại (retry) nào cung cấp cho mô hình chính xác thông tin cần thiết để khắc phục lỗi xác thực ở lượt tiếp theo?",
    "optionsEN": [
      "A. Append a prompt statement reading 'The generated JSON failed validation; please fix formatting errors in address fields' without citing field paths or rules, and re-execute inference.",
      "B. Raise the model temperature parameter from 0.0 to 0.7 during the retry turn to encourage variation in the generated postal code string.",
      "C. Include the invalid JSON snippet in the retry turn alongside a message specifying that customer.address.postcode failed regex ^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$, prompting the model to fix the target field.",
      "D. Catch the SchemaValidationError, set customer.address.postcode to null via a schema sanitizer script, and bypass LLM re-execution completely."
    ],
    "options": [
      "A. Thêm một câu lệnh vào prompt với nội dung 'JSON được tạo không vượt qua xác thực; vui lòng sửa các lỗi định dạng trong trường địa chỉ' mà không chỉ ra đường dẫn trường hay quy tắc cụ thể, rồi thực thi lại mô hình.",
      "B. Tăng tham số temperature của mô hình từ 0.0 lên 0.7 trong lượt retry để khuyến khích sự biến thiên trong chuỗi mã bưu chính được tạo.",
      "C. Đưa đoạn JSON không hợp lệ vào lượt retry cùng với thông điệp chỉ rõ trường customer.address.postcode vi phạm regex ^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$, yêu cầu mô hình sửa lại đúng trường mục tiêu.",
      "D. Bắt lỗi SchemaValidationError, gán trường customer.address.postcode thành null thông qua script làm sạch schema và bỏ qua việc gọi lại LLM."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because generic retry feedback without the exact field path customer.address.postcode and regex pattern forces the model to guess which field failed, leading to repeated validation errors.",
      "Option B is incorrect because raising temperature increases output randomness rather than guiding the model toward adhering to the specific regex pattern for UK postcodes.",
      "Option C is correct because providing the invalid output along with the exact target field customer.address.postcode and the regex ^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$ allows the LLM to pinpoint its error and format the postcode correctly.",
      "Option D is incorrect because dropping the field into null avoids fixing the model's extraction error, causing valid shipping postcodes to be lost downstream."
    ],
    "rationale": "Effective validation retry loops require pinpointing the specific field path (customer.address.postcode) and providing the exact regex rule (^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$) along with the rejected output, allowing the LLM to correct the precise error in context.",
    "explanation": "Đáp án C là đúng vì một cơ chế retry hiệu quả cần cung cấp phản hồi chính xác bao gồm giá trị/đoạn output bị từ chối, đường dẫn trường cụ thể (customer.address.postcode), và quy tắc xác thực (regex ^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$). Điều này giúp mô hình nhận diện chính xác vị trí và nguyên nhân lỗi để điều chỉnh.\n- Lựa chọn A sai vì phản hồi chung chung không cung cấp tên trường hay quy tắc regex, khiến mô hình phải tự đoán lỗi và dễ tái phạm.\n- Lựa chọn B sai vì việc tăng temperature làm tăng độ ngẫu nhiên thay vì hướng dẫn mô hình tuân thủ đúng định dạng regex.\n- Lựa chọn D sai vì việc tự động gán null làm mất dữ liệu địa chỉ hợp lệ của khách hàng thay vì sửa lỗi trích xuất.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  },
  {
    "id": "d4-b10-4.7-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-004",
    "scenarioSignature": {
      "testedPrinciple": "context requirement for model self-correction",
      "failureMode": "repeated validation failure across retry loops",
      "rootCause": "omission of rejected model output in retry prompt",
      "requiredFix": "append invalid model output alongside validation error message"
    },
    "questionEN": "In the FinRisk Analytics Pipeline, an automated agent extracts risk data from loan applications into a structured object containing risk_score_matrix. When validation fails, the application sends a retry request to Gemini Flash containing only the original system prompt and the error string 'ValidationError: risk_score_matrix elements must be floats between 0.0 and 1.0'. Despite 3 retry attempts, 32% of requests trigger MaxRetryExceededException because the model repeatedly generates identical non-compliant outputs. What is the root cause of this persistent retry failure?",
    "question": "[d4-b10-4.7-004] Trong FinRisk Analytics Pipeline, một agent tự động trích xuất dữ liệu rủi ro từ hồ sơ vay vốn vào một đối tượng có cấu trúc chứa trường risk_score_matrix. Khi xác thực thất bại, ứng dụng gửi một yêu cầu retry đến Gemini Flash chỉ chứa prompt hệ thống ban đầu và chuỗi thông báo lỗi 'ValidationError: risk_score_matrix elements must be floats between 0.0 and 1.0'. Dù đã thử lại 3 lần, 32% yêu cầu vẫn gặp lỗi MaxRetryExceededException do mô hình lặp lại các output không tuân thủ giống hệt nhau. Nguyên nhân gốc rễ của thất bại retry kéo dài này là gì?",
    "optionsEN": [
      "A. The model requires a higher context window limit to parse float validation errors in long financial documents.",
      "B. The system prompt lacks a few-shot example demonstrating how floats should be formatted inside risk_score_matrix.",
      "C. The validation service is failing to parse valid float representations such as strings containing numbers.",
      "D. The retry prompt omitted the model's rejected output, preventing the model from seeing what values it produced and identifying its specific mistake."
    ],
    "options": [
      "A. Mô hình yêu cầu giới hạn cửa sổ ngữ cảnh (context window) cao hơn để phân tích các lỗi xác thực số thực trong tài chính.",
      "B. Prompt hệ thống thiếu ví dụ few-shot minh họa cách định dạng các số thực bên trong risk_score_matrix.",
      "C. Dịch vụ xác thực không thể parse các biểu diễn số thực hợp lệ như các chuỗi chứa chữ số.",
      "D. Prompt retry đã bỏ qua output bị từ chối của mô hình, khiến mô hình không thể thấy phản hồi trước đó của nó và không xác định được lỗi cụ thể."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because context window size does not address why the model reproduces the same invalid format when retrying without viewing its previous output.",
      "Option B is incorrect because while few-shot examples improve initial compliance, the failure across multiple retries stems specifically from not providing the generated output for self-correction.",
      "Option C is incorrect because the issue lies in the retry mechanism's context state rather than a bug in the external validation service itself.",
      "Option D is correct because omitting the rejected output leaves the model unaware of its previous response, causing it to regenerate the same erroneous output across retry attempts."
    ],
    "rationale": "Without including the previously generated invalid output in the retry context, the model cannot identify what mistake it made or how to fix it, causing it to repeat the same error on subsequent turns.",
    "explanation": "Đáp án D là đúng vì để mô hình có thể tự sửa lỗi (self-correction) trong một vòng lặp retry, prompt retry bắt buộc phải bao gồm cả output bị từ chối ở lượt trước cùng với thông báo lỗi. Nếu chỉ gửi thông báo lỗi mà bỏ qua output cũ, mô hình không có ngữ cảnh về những gì nó đã tạo ra và dễ tái diễn lại cùng một câu trả lời sai.\n- Lựa chọn A sai vì dung lượng cửa sổ ngữ cảnh không liên quan đến việc mô hình không biết kết quả cũ của chính mình.\n- Lựa chọn B sai vì mặc dù few-shot trợ giúp ở lượt đầu, nguyên nhân khiến vòng lặp retry thất bại liên tục là do thiếu output cũ trong ngữ cảnh phản hồi.\n- Lựa chọn C sai vì đây là lỗi thiết kế luồng retry prompt chứ không phải do dịch vụ validator bị hỏng.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  }
]