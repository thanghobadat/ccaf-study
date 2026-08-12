[
  {
    "id": "d4-b08-new-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-005",
    "scenarioSignature": {
      "testedPrinciple": "few-shot example coverage for mixed language inputs",
      "failureMode": "misclassification of primary language in code-switched text",
      "rootCause": "few-shot examples limited to pristine monolingual happy paths",
      "requiredFix": "add code-switched prompt examples showing dominant language label extraction"
    },
    "questionEN": "In the GlobalSupport routing platform, the LanguageDetectionWorker uses gemini-2.5-flash to populate the detected_language schema field for incoming tickets. The system prompt includes five happy-path few-shot examples consisting solely of pristine, single-language sentences. In production evaluation, when tickets contain code-switched text (e.g., Spanish sentences embedded with English technical terms like 'Hola, mi orden #9910 me da error ERR_TIMEOUT en el checkout'), the model misclassifies the text as 'en' instead of 'es', causing regional routing failures. What is the root cause and recommended fix for this classification error?",
    "question": "[d4-b08-new-005] Trong nền tảng điều phối GlobalSupport, LanguageDetectionWorker sử dụng gemini-2.5-flash để điền trường detected_language trong định dạng schema JSON cho các yêu cầu hỗ trợ gửi đến. System prompt hiện có năm ví dụ few-shot đường hạnh phúc (happy-path) chỉ chứa các câu đơn ngữ hoàn chỉnh. Khi đánh giá thực tế trên môi trường production, các vé hỗ trợ chứa văn bản pha trộn ngôn ngữ (code-switched, ví dụ: câu tiếng Tây Ban Nha chứa các thuật ngữ kỹ thuật tiếng Anh như 'Hola, mi orden #9910 me da error ERR_TIMEOUT en el checkout') bị mô hình phân loại sai thành 'en' thay vì 'es', gây ra lỗi điều phối vùng. Nguyên nhân gốc rễ và giải pháp khắc phục được đề xuất cho lỗi phân loại này là gì?",
    "optionsEN": [
      "A. The few-shot examples lack coverage for code-switched inputs; add examples showing text with foreign technical jargon labeled by its dominant grammatical language.",
      "B. The system prompt lacks ISO 639-1 format specifications; insert explicit prose rules defining language tag standards in the system prompt.",
      "C. The model sampling variance is set too low; raise temperature to 0.7 to allow dynamic probability sampling across language tokens.",
      "D. Pre-processing fails to isolate language tokens; add a regex dictionary pre-filter to strip English terms before passing text to the model."
    ],
    "options": [
      "A. Các ví dụ few-shot thiếu độ bao phủ cho đầu vào pha trộn ngôn ngữ; cần bổ sung các ví dụ chứa thuật ngữ kỹ thuật nước ngoài được gán nhãn theo ngôn ngữ ngữ pháp chủ đạo.",
      "B. System prompt thiếu quy định định dạng ISO 639-1; cần chèn các quy tắc văn bản mô tả tiêu chuẩn thẻ ngôn ngữ vào system prompt.",
      "C. Độ biến thiên lấy mẫu của mô hình được đặt quá thấp; cần tăng temperature lên 0.7 để cho phép lấy mẫu xác suất động trên các token ngôn ngữ.",
      "D. Quá trình tiền xử lý không tách biệt được các token ngôn ngữ; cần thêm bộ lọc regex từ điển để loại bỏ thuật ngữ tiếng Anh trước khi truyền văn bản vào mô hình."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Few-shot examples must cover the full real-world input distribution. Providing only happy-path monolingual examples leaves the model without guidance on how to weigh mixed-language inputs, whereas adding code-switched examples explicitly demonstrates that the primary grammatical structure determines the target language label.",
      "Option B is incorrect: Adding ISO 639-1 code standards in prose clarifies the output schema format but does not teach the model how to resolve linguistic ambiguity in code-switched inputs.",
      "Option C is incorrect: Increasing temperature increases output randomness and token sampling variance, which degrades classification consistency rather than solving input distribution coverage gaps.",
      "Option D is incorrect: Stripping foreign terms via regex removes critical context and fails when technical error codes or product names form an integral part of the user query."
    ],
    "rationale": "The classification error occurs because the few-shot examples do not reflect the full production distribution of input formats. Happy-path monolingual examples fail to demonstrate how the model should treat mixed-language or code-switched text. Adding representative examples containing English technical terms labeled with their dominant grammatical language (Spanish) teaches the model the required edge-case handling pattern.",
    "explanation": "Lỗi phân loại xảy ra do các ví dụ few-shot trong prompt hiện tại chỉ bao phủ trường hợp lý tưởng (happy-path với 100% câu đơn ngữ). Trong thực tế sản xuất, dữ liệu đầu vào thường chứa hiện tượng chuyển mã ngôn ngữ (code-switching) hoặc chèn thuật ngữ kỹ thuật tiếng Anh vào câu tiếng Tây Ban Nha. Đáp án A đúng vì để mô hình học được cách xác định ngôn ngữ chính dựa trên cấu trúc ngữ pháp dominant thay vì bị nhầm lẫn bởi các token thuật ngữ tiếng Anh, prompt bắt buộc phải cung cấp các ví dụ few-shot phản ánh đúng phân phối đa dạng này. Đáp án B sai vì các định nghĩa ISO bằng văn bản thuần không giúp mô hình giải quyết sự mơ hồ về mặt cú pháp trong văn bản hỗn hợp. Đáp án C sai vì tăng temperature chỉ làm tăng tính ngẫu nhiên của đầu ra chứ không khắc phục thiếu sót về ví dụ mẫu. Đáp án D sai vì việc dùng regex xóa bỏ từ tiếng Anh sẽ làm mất ngữ cảnh quan trọng của truy vấn.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-006",
    "scenarioSignature": {
      "testedPrinciple": "edge case representation in few-shot prompting",
      "failureMode": "systematic misclassification of ambiguous short inputs to fallback class",
      "rootCause": "absence of ambiguous message examples in few-shot prompt",
      "requiredFix": "add short ambiguous input few-shot examples mapped to neutral intent"
    },
    "questionEN": "The TicketTriageEngine microservice uses gemini-2.5-flash to route customer messages into inquiry, complaint, or technical_issue categories. In production analysis, incoming messages with short, ambiguous phrasing such as 'I need help' or 'Can someone check this?' are classified as 'complaint' 100% of the time, overwhelming the escalation queue. Reviewing the prompt reveals few-shot examples for detailed bug reports and explicit refund complaints, but zero examples for ambiguous low-context queries. How should the engineering team resolve this systematic misclassification?",
    "question": "[d4-b08-new-006] Microservice TicketTriageEngine sử dụng gemini-2.5-flash để phân loại tin nhắn của khách hàng vào các danh mục inquiry, complaint, hoặc technical_issue. Khi phân tích trong môi trường production, các tin nhắn gửi đến có cụm từ ngắn gọn, mơ hồ như 'I need help' hoặc 'Can someone check this?' bị phân loại là 'complaint' 100% thời gian, gây quá tải cho hàng chờ xử lý khiếu nại. Kiểm tra prompt cho thấy các ví dụ few-shot chỉ bao gồm báo cáo lỗi chi tiết và khiếu nại hoàn tiền rõ ràng, nhưng không có ví dụ nào cho các truy vấn ngắn thiếu ngữ cảnh. Đội ngũ kỹ thuật nên giải quyết lỗi phân loại hệ thống này như thế nào?",
    "optionsEN": [
      "A. Append a negative rule in the system prompt stating that short messages without angry keywords must not be labeled as complaints.",
      "B. Include few-shot examples covering short, ambiguous phrases like 'I need help' explicitly mapped to the neutral 'inquiry' category.",
      "C. Enforce structured output schema validation with an enum constraint to prevent the model from outputting unapproved label strings.",
      "D. Implement dynamic RAG retrieval to fetch 20 vector-matched historical ticket examples for every incoming prompt payload."
    ],
    "options": [
      "A. Thêm quy tắc phủ định trong system prompt quy định rằng các tin nhắn ngắn không chứa từ khóa tức giận không được dán nhãn là khiếu nại.",
      "B. Bổ sung các ví dụ few-shot bao phủ các cụm từ ngắn, mơ hồ như 'I need help' được ánh xạ rõ ràng sang danh mục 'inquiry' trung tính.",
      "C. Bắt buộc áp dụng kiểm tra schema đầu ra có cấu trúc với ràng buộc enum để ngăn mô hình xuất ra các chuỗi nhãn không hợp lệ.",
      "D. Triển khai truy xuất RAG động để lấy 20 ví dụ vé hỗ trợ lịch sử khớp vector cho mỗi payload prompt gửi đến."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Prose negative constraints ('do not label short messages as complaints') are less effective than concrete few-shot demonstrations at establishing decision boundaries for ambiguous inputs.",
      "Option B is correct: Models require explicit few-shot examples of edge cases like short, ambiguous inputs to learn how to map low-context phrasing to neutral categories rather than defaulting to aggressive classes like 'complaint'.",
      "Option C is incorrect: Schema enum validation ensures output strings conform to valid enum keys but does not fix the internal classification logic when selecting between valid enum options.",
      "Option D is incorrect: Increasing the RAG retrieval count to 20 adds prompt latency and context bloat without solving the core issue if the underlying example store lacks annotated ambiguous edge cases."
    ],
    "rationale": "LLMs often default to the most sensitive or aggressive category when encountering low-context, ambiguous inputs if no boundary examples are provided. Adding explicit few-shot examples of short, ambiguous queries like 'I need help' mapped to the neutral 'inquiry' class directly teaches the model how to resolve low-information edge cases.",
    "explanation": "Khi đối mặt với các tin nhắn ngắn và mơ hồ (thiếu ngữ cảnh cụ thể), LLM có xu hướng phân loại lệch sang danh mục có mức độ rủi ro cao hơn (complaint) nếu không được hướng dẫn ranh giới xử lý trường hợp biên. Đáp án B đúng vì việc thêm các ví dụ few-shot thực tế thể hiện cụm từ 'I need help' được gán nhãn là 'inquiry' sẽ minh họa trực quan cách mô hình cần xử lý các câu truy vấn thiếu ngữ cảnh. Đáp án A sai vì các quy tắc phủ định bằng văn bản xuôi ('không được dán nhãn là complaint') ít hiệu quả hơn ví dụ minh họa trực tiếp. Đáp án C sai vì ràng buộc enum chỉ đảm bảo chuỗi trả về đúng cú pháp chứ không điều chỉnh được logic quyết định nội bộ giữa các enum hợp lệ. Đáp án D sai vì việc tăng số lượng RAG lấy ra 20 ví dụ sẽ gây lãng phí context bloat và không giải quyết được vấn đề nếu cơ sở dữ liệu ví dụ không chứa các trường hợp biên mơ hồ này.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]