[
  {
    "id": "d4-b08-new-011",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-011",
    "scenarioSignature": {
      "testedPrinciple": "few-shot input format alignment with production data",
      "failureMode": "high field extraction failure rate on unstructured input",
      "rootCause": "few-shot examples demonstrate structured input format instead of production freeform text",
      "requiredFix": "reformat few-shot input sections to use unstructured freeform text matching production payload"
    },
    "questionEN": "In the ClaimExtractorWorker service, an LLM pipeline uses gemini-2.5-flash to convert incoming insurance claims into JSON. The prompt includes five few-shot examples where the input is formatted as structured key-value pairs (e.g., {\"policy_id\": \"...\", \"description\": \"...\"}). In production, incoming requests pass raw, unstructured customer emails into the raw_claim_text field. Evaluation shows a 48% extraction failure rate because the model hallucinates missing keys or fails to parse freeform text. What is the most effective prompt engineering fix?",
    "question": "[d4-b08-new-011] Trong dịch vụ ClaimExtractorWorker, một pipeline LLM sử dụng gemini-2.5-flash để chuyển đổi các yêu cầu bồi thường bảo hiểm thành định dạng JSON. Prompt bao gồm 5 ví dụ few-shot trong đó đầu vào được định dạng dưới dạng các cặp key-value có cấu trúc (ví dụ: {\"policy_id\": \"...\", \"description\": \"...\"}). Tuy nhiên, trên môi trường production, các yêu cầu đến lại truyền văn bản email thô, không có cấu trúc vào trường raw_claim_text. Đánh giá cho thấy tỷ lệ thất bại khi trích xuất lên tới 48% do mô hình suy đoán sai các key bị thiếu hoặc không phân tích được văn bản tự do. Giải pháp prompt engineering nào hiệu quả nhất?",
    "optionsEN": [
      "A. Add a system prompt directive requiring the model to run internal regex pattern matching on the freeform text before generating output.",
      "B. Increase the temperature parameter to 0.7 to give the model greater flexibility when reading unstructured inputs.",
      "C. Update the few-shot examples so that the input format matches the unstructured freeform text of production raw_claim_text payloads.",
      "D. Wrap the production freeform email in a top-level JSON key string before concatenating it into the user prompt."
    ],
    "options": [
      "A. Thêm chỉ thị trong system prompt yêu cầu mô hình chạy khớp mẫu regex nội bộ trên văn bản tự do trước khi tạo đầu ra.",
      "B. Tăng tham số temperature lên 0.7 để mô hình có độ linh hoạt cao hơn khi đọc các đầu vào không có cấu trúc.",
      "C. Cập nhật các ví dụ few-shot sao cho định dạng đầu vào khớp với văn bản tự do không có cấu trúc của payload raw_claim_text trên production.",
      "D. Bọc đoạn email tự do từ production vào một chuỗi key JSON cấp cao nhất trước khi nối nó vào user prompt."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because LLMs perform token-based generation and cannot execute internal regex pattern matching logic; a system prompt directive cannot compensate for structural mismatches in prompt examples.",
      "Option B is incorrect because increasing the temperature parameter introduces sampling randomness, which exacerbates extraction errors rather than teaching the model how to parse unstructured inputs.",
      "Option C is correct because few-shot prompting requires example inputs to faithfully reflect the syntax, layout, and structure of production inputs (in this case, raw freeform text in raw_claim_text), enabling the model to learn the mapping from unstructured text to structured JSON schema.",
      "Option D is incorrect because wrapping freeform text inside a top-level JSON string key does not teach the model how to extract sub-fields from unformatted body text; the model still lacks examples demonstrating how to parse narrative text into target schema attributes."
    ],
    "rationale": "Few-shot examples guide the model's pattern recognition for both input processing and output formatting. When example inputs use structured key-value pairs but production inputs contain unstructured freeform text (raw_claim_text), the model struggles to locate and extract attributes from unstructured narrative. Aligning the few-shot input format with actual production payloads allows the model to learn the exact transformation from freeform text to structured JSON schema.",
    "explanation": "Kỹ thuật few-shot prompting yêu cầu các ví dụ mẫu phải phản ánh chính xác cả định dạng đầu vào (input) lẫn định dạng đầu ra (output) thực tế trên production.\n- Đáp án A sai vì mô hình ngôn ngữ không thể tự thực thi cú pháp regex nội bộ; bổ sung chỉ thị này không giải quyết được việc thiếu ví dụ mẫu.\n- Đáp án B sai vì tăng temperature chỉ làm tăng tính ngẫu nhiên của phản hồi, khiến tỷ lệ lỗi trích xuất JSON gia tăng.\n- Đáp án C ĐÚNG vì việc thay đổi các ví dụ few-shot để phần input nhận văn bản tự do (khớp với trường raw_claim_text trên production) giúp mô hình học được cách trích xuất dữ liệu từ văn bản không cấu trúc sang schema JSON mong muốn.\n- Đáp án D sai vì chỉ bọc văn bản vào một key JSON ngoài cùng không giúp mô hình hiểu cách trích xuất các trường thông tin bên trong đoạn văn tự do.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-012",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-012",
    "scenarioSignature": {
      "testedPrinciple": "complete class representation in multi-class few-shot prompts",
      "failureMode": "classification bias toward single modeled class across multi-class taxonomy",
      "rootCause": "few-shot prompt contains only one example covering one of six target classes",
      "requiredFix": "expand few-shot prompt to include at least one representative example per target class"
    },
    "questionEN": "The ITOpsTicketRouter service uses gemini-2.5-flash to classify IT support tickets into 6 target categories under the category schema field: HARDWARE, SOFTWARE, NETWORK, ACCESS, BILLING, and OTHER. The developer provided only 1 few-shot example in the prompt, which demonstrates a SOFTWARE classification. In production evaluation, tickets belonging to the other 5 categories are misclassified as SOFTWARE 83% of the time. What is the root cause of this failure and the correct fix?",
    "question": "[d4-b08-new-012] Dịch vụ ITOpsTicketRouter sử dụng gemini-2.5-flash để phân loại các yêu cầu hỗ trợ IT vào 6 danh mục mục tiêu thuộc trường schema category: HARDWARE, SOFTWARE, NETWORK, ACCESS, BILLING, và OTHER. Lập trình viên chỉ cung cấp 1 ví dụ few-shot trong prompt, minh họa cho phân loại SOFTWARE. Trên môi trường production, các yêu cầu thuộc 5 danh mục còn lại bị phân loại sai thành SOFTWARE tới 83% thời gian. Nguyên nhân gốc rễ của sự cố này là gì và giải pháp khắc phục đúng là gì?",
    "optionsEN": [
      "A. The model context length is insufficient for multi-class tasks; reduce max_output_tokens to force concise multi-class evaluation.",
      "B. The JSON output schema constraints conflict with few-shot learning; remove the structured schema to allow freeform label generation.",
      "C. The single example triggers a prompt injection vulnerability; wrap the example in safety guardrail tags to prevent label bias.",
      "D. The prompt provides insufficient label space coverage; include at least one representative few-shot example for each of the 6 target categories."
    ],
    "options": [
      "A. Độ dài ngữ cảnh của mô hình không đủ cho các tác vụ đa lớp; giảm max_output_tokens để buộc mô hình đánh giá đa lớp ngắn gọn.",
      "B. Ràng buộc JSON output schema xung đột với học few-shot; loại bỏ schema có cấu trúc để cho phép tạo nhãn tự do.",
      "C. Ví dụ duy nhất kích hoạt lỗ hổng prompt injection; bọc ví dụ trong các thẻ guardrail an toàn để ngăn chặn định kiến nhãn.",
      "D. Prompt cung cấp không đủ phạm vi bao phủ không gian nhãn; bổ sung ít nhất một ví dụ few-shot đại diện cho mỗi danh mục trong 6 danh mục mục tiêu."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because max_output_tokens controls token generation limits, not classification label coverage or multi-class decision boundaries.",
      "Option B is incorrect because removing the JSON output schema breaks output formatting and does not resolve the lack of class examples for the unmodeled target categories.",
      "Option C is incorrect because classification bias resulting from missing examples is a prompt coverage issue, not a prompt injection security vulnerability.",
      "Option D is correct because multi-class classification prompts require full label space coverage—providing at least one clear, representative example for each target category (all 6 classes) prevents model anchoring on a single demonstrated class."
    ],
    "rationale": "In multi-class classification tasks, providing a single few-shot example anchors the model to that demonstrated class (SOFTWARE) because the LLM lacks formatting and decision-boundary patterns for the remaining unmodeled classes. To ensure accurate classification across a 6-class taxonomy, the few-shot prompt must provide complete coverage of the label space by including at least one clear, representative example for each of the 6 categories.",
    "explanation": "Trong các tác vụ phân loại đa lớp (multi-class classification), mô hình cần thấy các ví dụ đại diện cho toàn bộ các nhãn trong không gian phân loại.\n- Đáp án A sai vì max_output_tokens chỉ giới hạn độ dài đầu ra, không ảnh hưởng đến khả năng nhận diện các lớp nhãn bị thiếu.\n- Đáp án B sai vì xóa JSON schema sẽ làm hỏng định dạng đầu ra có cấu trúc và không giải quyết được vấn đề thiếu ví dụ.\n- Đáp án C sai vì đây là vấn đề bao phủ nhãn (label space coverage), không phải sự cố an ninh prompt injection.\n- Đáp án D ĐÚNG vì việc chỉ cung cấp 1 ví dụ làm cho mô hình bị lệch (anchored) về nhãn SOFTWARE. Để phân loại chính xác trên cả 6 lớp (HARDWARE, SOFTWARE, NETWORK, ACCESS, BILLING, OTHER), prompt cần cung cấp ít nhất 1 ví dụ đại diện cho mỗi lớp.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]