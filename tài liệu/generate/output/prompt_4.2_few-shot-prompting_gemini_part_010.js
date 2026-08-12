[
  {
    "id": "d4-b08-new-019",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-019",
    "scenarioSignature": {
      "testedPrinciple": "pii sanitization in prompt examples",
      "failureMode": "regulatory compliance violation from prompt exposure",
      "rootCause": "hardcoded real customer sensitive attributes in system prompt examples",
      "requiredFix": "replace real pii with synthetic anonymized tokens in few-shot prompt"
    },
    "questionEN": "In the PatientRecordProcessor microservice, engineers hardcoded 5 real patient records (including actual Social Security Numbers and full names) into few-shot examples within the system prompt to guide gemini-2.5-flash in extracting the patient_summary schema field. During a compliance audit, security logging flagged these prompts as exposing real customer PII to external endpoints. How should the engineering team remediate the prompt while preserving extraction accuracy?",
    "question": "[d4-b08-new-019] Trong vi dịch vụ PatientRecordProcessor, các kỹ sư đã hardcode 5 hồ sơ bệnh nhân thực tế (bao gồm Số An sinh Xã hội SSN và tên đầy đủ) vào các ví dụ few-shot nằm trong system prompt nhằm hướng dẫn gemini-2.5-flash trích xuất trường schema patient_summary. Trong quá trình kiểm toán tuân thủ (compliance audit), hệ thống ghi log bảo mật đã cảnh báo rằng các prompt này làm rò rỉ dữ liệu cá nhân (PII) thực tế tới các endpoint bên ngoài. Đội ngũ kỹ thuật nên khắc phục prompt này như thế nào để vừa đảm bảo tính tuân thủ vừa duy trì độ chính xác trích xuất?",
    "optionsEN": [
      "A. Move the hardcoded real patient examples into the user prompt body to prevent the system prompt from being cached.",
      "B. Wrap the real patient SSNs and names in XML tags like <private_data> so the model hides them during inference.",
      "C. Replace all real customer PII in the few-shot examples with synthetic, realistic anonymized placeholder values.",
      "D. Remove all few-shot examples and increase the temperature parameter to 0.7 to compensate for lost context."
    ],
    "options": [
      "A. Chuyển các ví dụ chứa dữ liệu bệnh nhân thực tế từ system prompt sang body của user prompt để tránh việc system prompt bị lưu vào cache.",
      "B. Bọc các số SSN và tên bệnh nhân thực tế trong các thẻ XML như <private_data> để mô hình tự động ẩn chúng trong quá trình suy luận.",
      "C. Thay thế toàn bộ dữ liệu PII thực tế của khách hàng trong các ví dụ few-shot bằng các giá trị giả lập (synthetic) đã được ẩn danh hóa.",
      "D. Xóa bỏ hoàn toàn các ví dụ few-shot và tăng tham số temperature lên 0.7 để bù đắp cho phần ngữ cảnh bị thiếu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because moving real PII from the system prompt to the user prompt still transmits sensitive patient data over the API and exposes it in application logs, failing regulatory compliance.",
      "Option B is incorrect because enclosing real PII in XML tags like <private_data> does not sanitize or encrypt the payload, leaving sensitive patient data visible in API requests and log aggregators.",
      "Option C is correct because substituting real customer PII with synthetic, anonymized placeholders removes compliance and privacy risks while maintaining identical format and structural guidance for gemini-2.5-flash.",
      "Option D is incorrect because increasing model temperature adds stochastic variability to outputs rather than providing formatting pattern guidance, and removing examples degrades extraction quality."
    ],
    "rationale": "Replacing real PII in few-shot examples with synthetic anonymized tokens completely removes privacy compliance risks while fully retaining the structural and formatting guidance needed by gemini-2.5-flash.",
    "explanation": "Việc đưa thông tin định danh cá nhân (PII) thực tế vào prompt (dù ở system prompt hay user prompt) là vi phạm nghiêm trọng các quy định tuân thủ bảo mật (như HIPAA, GDPR) do dữ liệu bị gửi qua API và lưu vết trong log. Phương án C là đúng vì việc sử dụng dữ liệu giả lập (synthetic anonymized data) giúp loại bỏ rủi ro lộ PII mà vẫn giữ nguyên cấu trúc và khuôn mẫu hướng dẫn cho mô hình. Các phương án A và B không giải quyết được gốc rễ vấn đề rò rỉ PII. Phương án D làm giảm chất lượng đầu ra do thiếu ví dụ mẫu và tăng tính ngẫu nhiên không cần thiết.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-020",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-020",
    "questionEN": "In the OrderIntentClassifier service, gemini-2.5-flash classifies customer inquiries into the intent_category schema field. Code review shows that the system prompt contains 6 few-shot examples, but 3 of them are exact duplicate pairs of a standard cancellation request (Input: \"Cancel order #1029\" -> Output: {\"intent_category\": \"CANCEL\"}). This prompt inflates token consumption by 1,200 tokens per request without improving edge-case accuracy. What is the correct refactoring strategy for these few-shot examples?",
    "question": "[d4-b08-new-020] Trong dịch vụ OrderIntentClassifier, gemini-2.5-flash thực hiện phân loại các yêu cầu của khách hàng vào trường schema intent_category. Kiểm tra mã nguồn cho thấy system prompt chứa 6 ví dụ few-shot, nhưng 3 trong số đó là các cặp ví dụ trùng lặp hoàn toàn về yêu cầu hủy đơn hàng (Input: \"Cancel order #1029\" -> Output: {\"intent_category\": \"CANCEL\"}). Việc này làm lãng phí 1.200 token cho mỗi yêu cầu mà không làm tăng độ chính xác trên các trường hợp biên. Chiến lược tối ưu hóa prompt nào là đúng cho các ví dụ few-shot này?",
    "optionsEN": [
      "A. Keep all duplicate examples but convert their JSON formatting into YAML to compress prompt token length.",
      "B. Move the 3 duplicate examples to the end of the prompt so they act as reinforcement memory during decoding.",
      "C. Increase the duplicate count to 5 identical examples to strongly anchor the model's output formatting.",
      "D. Deduplicate the repeated examples into a single instance and replace the redundant slots with distinct edge-case examples."
    ],
    "options": [
      "A. Giữ nguyên cả 3 ví dụ trùng lặp nhưng chuyển định dạng JSON của chúng sang YAML để nén số lượng token trong prompt.",
      "B. Di chuyển 3 ví dụ trùng lặp xuống cuối prompt để chúng đóng vai trò là bộ nhớ củng cố (reinforcement memory) trong quá trình giải mã.",
      "C. Tăng số lượng ví dụ trùng lặp lên 5 lần để khắc ghi mạnh mẽ định dạng đầu ra cho mô hình.",
      "D. Loại bỏ các ví dụ trùng lặp chỉ giữ lại 1 bản thể, và thay thế các vị trí dư thừa bằng các ví dụ về những trường hợp biên đa dạng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because changing data syntax from JSON to YAML fails to eliminate structural duplication and provides zero additional coverage for unrepresented intent classes.",
      "Option B is incorrect because reordering identical duplicate examples still consumes context window tokens unnecessarily without introducing any new semantic variations or edge cases.",
      "Option C is incorrect because increasing duplicate examples amplifies frequency bias toward a single intent tier while wasting prompt context capacity.",
      "Option D is correct because deduplicating identical input-output pairs frees up context tokens and replacing them with diverse edge cases enhances model generalization."
    ],
    "rationale": "Deduplicating identical input-output pairs eliminates context bloat and replacing redundant slots with distinct edge-case scenarios maximizes model diversity and classification accuracy.",
    "explanation": "Việc lặp lại cùng một cặp input-output nhiều lần trong prompt không mang lại lợi ích về mặt tri thức hay độ đa dạng, mà chỉ làm lãng phí dung lượng cửa sổ ngữ cảnh (context window) và tăng chi phí token. Phương án D là đúng vì loại bỏ trùng lặp sẽ tiết kiệm token và việc bổ sung các ví dụ về trường hợp biên (edge cases) giúp mô hình bao quát được nhiều tình huống thực tế hơn. Phương án A chỉ thay đổi cú pháp mà không giải quyết vấn đề thiếu đa dạng. Phương án B và C tiếp tục lãng phí token và thậm chí gây lệch (bias) mô hình về một lớp dữ liệu duy nhất.",
    "scenarioSignature": {
      "testedPrinciple": "few-shot example diversity over redundant repetitions",
      "failureMode": "excessive context token usage without performance improvement",
      "rootCause": "identical input output example pairs repeated in system prompt",
      "requiredFix": "deduplicate redundant examples and replace with distinct input variations"
    },
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]