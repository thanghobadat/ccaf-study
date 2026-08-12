[
  {
    "id": "d4-b08-B-015",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-015",
    "scenarioSignature": {
      "testedPrinciple": "delimiter syntax isolation in XML prompt structure",
      "failureMode": "structural misparsing due to prompt tag collision",
      "rootCause": "unescaped input XML tags overlapping with prompt boundary delimiters",
      "requiredFix": "use distinct non-colliding delimiter tags or CDATA escaping for example payload content"
    },
    "questionEN": "In the DocStructureParser microservice, gemini-2.5-flash is configured to extract document components into the parsed_section JSON field. The prompt uses <example_input> and <example_output> XML boundary tags to delimit few-shot demonstrations. Production evaluation shows a 42% structural parsing failure rate on incoming technical documents that contain internal XML tags matching <example_input>. The model misinterprets input content as prompt delimiters. Which architectural fix resolves this tag collision issue?",
    "question": "Trong microservice DocStructureParser, gemini-2.5-flash được định cấu hình để trích xuất các thành phần tài liệu thành trường JSON parsed_section. Thẻ ranh giới prompt sử dụng <example_input> và <example_output> để phân tách các ví dụ few-shot. Tuy nhiên, đánh giá production cho thấy tỷ lệ lỗi phân tích cấu trúc là 42% khi tài liệu đầu vào chứa các thẻ XML trùng khớp như <example_input>. Mô hình nhầm lẫn nội dung đầu vào với các thẻ phân tách của prompt. Giải pháp kiến trúc nào giải quyết triệt để vấn đề xung đột thẻ này?",
    "optionsEN": [
      "A. Replace the few-shot prompt with a zero-shot prompt using JSON schema output definitions without any delimiters.",
      "B. Increase the system prompt temperature setting to 0.7 to force the model to ignore overlapping XML tags.",
      "C. Use distinct non-colliding XML tags (such as <sample_doc>) or wrap example payload content in CDATA blocks.",
      "D. Truncate all input documents to strip out any XML/HTML markup tags before embedding them into the few-shot examples."
    ],
    "options": [
      "A. Thay thế prompt few-shot bằng prompt zero-shot sử dụng định nghĩa JSON schema mà không dùng thẻ phân tách.",
      "B. Tăng giá trị temperature của hệ thống lên 0.7 để buộc mô hình bỏ qua các thẻ XML trùng lặp.",
      "C. Sử dụng các thẻ phân tách XML độc lập không trùng lặp (như <sample_doc>) hoặc bọc nội dung ví dụ trong khối CDATA.",
      "D. Cắt bỏ toàn bộ các thẻ markup XML/HTML khỏi tài liệu đầu vào trước khi đưa vào các ví dụ few-shot."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Removing few-shot examples eliminates necessary structural guidance for complex document extraction and fails to resolve boundary collision if user inputs contain delimiters.",
      "Option B is incorrect: Raising temperature increases generation variance but does not resolve structural token collisions caused by identical XML delimiter tags.",
      "Option C is correct: Using unique non-colliding boundary tags (or CDATA escaping) isolates payload content from prompt structural tags, preventing premature tag closing and misparsing.",
      "Option D is incorrect: Stripping XML tags destroys essential structural markup required for accurate document section parsing."
    ],
    "rationale": "When example inputs or user payload data contain markup tags identical to the prompt's boundary delimiters (e.g., <example_input>), the LLM cannot distinguish prompt structural control markers from payload content. Using distinct, reserved tags (or escaping payload content inside CDATA blocks) isolates payload text from prompt control architecture, restoring parsing reliability.",
    "explanation": "Khi dữ liệu đầu vào trong ví dụ chứa các thẻ XML trùng tên với thẻ phân tách cấu trúc của prompt (như <example_input>), mô hình ngôn ngữ sẽ bị nhầm lẫn giữa thẻ điều khiển ranh giới và nội dung dữ liệu. Phương án C đúng vì việc đổi tên thẻ phân tách sang dạng không đụng hàng (như <sample_doc>) hoặc bọc dữ liệu trong CDATA giúp cô lập hoàn toàn nội dung dữ liệu khỏi cấu trúc điều khiển của prompt. Phương án A làm giảm chất lượng trích xuất cấu trúc phức tạp. Phương án B không giải quyết được vấn đề xung đột token cấu trúc. Phương án D làm mất thông tin định dạng quan trọng của tài liệu.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-016",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-016",
    "scenarioSignature": {
      "testedPrinciple": "language parity in multilingual few-shot demonstrations",
      "failureMode": "model output language mismatch on non-English inputs",
      "rootCause": "few-shot examples restricted to single language anchoring model response language",
      "requiredFix": "include balanced multilingual few-shot pairs matching input and output languages"
    },
    "questionEN": "In the GlobalSupportAgent service, gemini-2.5-flash summarizes incoming support tickets into the resolution_summary JSON field. The system prompt specifies that output text must match the input ticket language. However, all few-shot prompt examples feature English inputs paired with English summaries. Production monitoring reveals a 54% language compliance error rate on French tickets, where the model consistently generates English summaries. Which prompt modification fixes this language bias?",
    "question": "Trong dịch vụ GlobalSupportAgent, gemini-2.5-flash tóm tắt các vé hỗ trợ thành trường JSON resolution_summary. System prompt quy định văn bản đầu ra phải khớp với ngôn ngữ của vé đầu vào. Tuy nhiên, tất cả các ví dụ few-shot trong prompt đều sử dụng đầu vào tiếng Anh đi kèm tóm tắt tiếng Anh. Đánh giá production cho thấy tỷ lệ lỗi không tuân thủ ngôn ngữ lên tới 54% trên các vé tiếng Pháp (mô hình liên tục tạo tóm tắt bằng tiếng Anh). Thay đổi prompt nào giải quyết triệt để định kiến ngôn ngữ này?",
    "optionsEN": [
      "A. Remove all few-shot examples and rely entirely on system prompt zero-shot instructions to preserve multilingual output capability.",
      "B. Translate only the input portions of the few-shot examples into French while retaining English in the output demonstration fields.",
      "C. Add a post-processing translation microservice using an external API to convert all non-English JSON outputs back to the target language.",
      "D. Include multilingual few-shot pairs representing target languages (e.g., French input with French output) so the model learns language alignment between input and output."
    ],
    "options": [
      "A. Xóa tất cả các ví dụ few-shot và phụ thuộc hoàn toàn vào hướng dẫn zero-shot trong system prompt.",
      "B. Chỉ dịch phần đầu vào của các ví dụ few-shot sang tiếng Pháp trong khi giữ nguyên đầu ra bằng tiếng Anh.",
      "C. Thêm microservice dịch thuật hậu xử lý để chuyển đổi các đầu ra JSON phi tiếng Anh về ngôn ngữ mục tiêu.",
      "D. Bổ sung các cặp ví dụ few-shot đa ngôn ngữ (đầu vào tiếng Pháp đi kèm đầu ra tiếng Pháp) để định hình quy tắc đồng nhất ngôn ngữ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Removing few-shot demonstrations discards structural schema formatting cues without guaranteeing multi-lingual instruction adherence under complex tasks.",
      "Option B is incorrect: Providing French inputs paired with English outputs explicitly teaches the model to translate non-English text into English summaries, worsening the issue.",
      "Option C is incorrect: Adding an external translation microservice adds processing latency, cost, and potential translation errors rather than resolving prompt pattern bias.",
      "Option D is correct: Providing balanced multilingual few-shot examples where the output language matches the input language anchors the model to maintain language consistency."
    ],
    "rationale": "Few-shot examples heavily anchor model behavior. When all examples show English outputs, the model infers a strong implicit pattern that outputs must always be in English, overriding system prompt instructions. Providing multilingual input-output demonstration pairs demonstrates the rule of matching output language to input language.",
    "explanation": "Các ví dụ few-shot có tác dụng định hình (anchoring) hành vi của mô hình rất mạnh. Khi tất cả các ví dụ đều có đầu ra là tiếng Anh, mô hình học được mẫu hành vi ngầm định là luôn tạo đầu ra bằng tiếng Anh, ghi đè lên hướng dẫn trong system prompt. Phương án D đúng vì việc thêm các cặp ví dụ đa ngôn ngữ đồng nhất (đầu vào tiếng Pháp -> đầu ra tiếng Pháp) sẽ dạy mô hình quy tắc giữ nguyên ngôn ngữ. Phương án A làm giảm chất lượng định dạng JSON. Phương án B dạy mô hình hành vi dịch thuật sai lệch. Phương án C làm tăng độ trễ và chi phí hệ thống.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]