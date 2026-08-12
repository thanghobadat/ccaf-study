[
  {
    "id": "d4-b08-4.3-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.3 xml-boundaries / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.3-007",
    "scenarioSignature": {
      "testedPrinciple": "XML container scoping for few-shot demonstrations",
      "failureMode": "model execution of demonstration text as top-level instructions",
      "rootCause": "unescaped few-shot examples lacking explicit delimiter boundary tags",
      "requiredFix": "wrap example pairs inside explicit examples tags"
    },
    "questionEN": "In the FinReportExtractor microservice, Claude 3.5 Sonnet is configured to extract financial indicators into the financial_metrics schema field. The prompt provides 5 few-shot demonstration pairs directly following system instructions without container tags. During production evaluation, evaluation logs reveal a 34% task derailment rate because the model interprets query questions inside demonstration inputs as active top-level task instructions. What is the root cause and recommended structural fix?",
    "question": "Trong microservice FinReportExtractor, Claude 3.5 Sonnet được cấu hình để trích xuất các chỉ số tài chính vào trường schema financial_metrics. Hệ thống cung cấp 5 cặp ví dụ vài lượt (few-shot demonstration pairs) ngay sau hướng dẫn hệ thống mà không dùng thẻ bao bọc (container tags). Khi đánh giá thực tế, nhật ký đánh giá ghi nhận tỷ lệ chệch hướng nhiệm vụ lên tới 34% do mô hình nhầm lẫn nội dung câu hỏi trong ví dụ là chỉ thị nhiệm vụ cần thực thi. Nguyên nhân gốc rễ và giải pháp cấu trúc được khuyến nghị là gì?",
    "optionsEN": [
      "A. Wrap the target document in tags and move system directives into <system_context> tags.",
      "B. Add a system prompt directive explicitly listing demonstration example IDs for the model to ignore during execution.",
      "C. Enclose all few-shot demonstration pairs within ... XML tags to establish an explicit structural boundary that isolates example content from prompt instructions.",
      "D. Convert all demonstration examples into JSON string arrays inside markdown code blocks to prevent semantic instruction parsing."
    ],
    "options": [
      "A. Bọc tài liệu mục tiêu trong thẻ và chuyển hướng dẫn hệ thống vào thẻ <system_context>.",
      "B. Bổ sung một câu lệnh trong system prompt liệt kê danh sách ID của các ví dụ để mô hình bỏ qua trong quá trình thực thi.",
      "C. Bọc tất cả các cặp ví dụ few-shot bên trong cặp thẻ XML ... để thiết lập ranh giới cấu trúc rõ ràng, phân biệt nội dung ví dụ với chỉ thị nhiệm vụ.",
      "D. Chuyển đổi toàn bộ ví dụ đầu vào thành mảng chuỗi JSON bên trong khối mã markdown để ngăn mô hình phân tích cú pháp chỉ thị."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Wrapping target documents in tags misidentifies data as prompt instructions and fails to resolve the missing structural isolation around few-shot demonstration pairs.",
      "Option B is incorrect: Adding text directives listing example IDs relies on weak semantic instructions rather than hard XML delimiter boundaries, which does not prevent instruction leakage.",
      "Option C is correct: Enclosing few-shot pairs within ... tags provides explicit XML boundaries, instructing Claude to process contained text strictly as structural demonstrations rather than active system instructions.",
      "Option D is incorrect: Converting examples to markdown JSON string arrays alters the format but lacks native XML container scoping in Claude, which can still lead to instruction confusion."
    ],
    "rationale": "Without explicit XML boundaries, LLMs like Claude can interpret text inside demonstration pairs as current task instructions. Wrapping few-shot demonstrations within ... establishes a clear structural boundary, ensuring the model recognizes the content purely as illustrative patterns rather than executable system commands.",
    "explanation": "Khi phân tích cú pháp prompt, Claude xử lý văn bản theo luồng tuần tự. Nếu các cặp ví dụ few-shot được đặt trực tiếp sau hướng dẫn hệ thống mà không có thẻ ranh giới XML bao bọc (container tags), mô hình có thể bị nhầm lẫn giữa chỉ thị thực thi thực sự và nội dung tình huống trong ví dụ.\n\n- Option A sai vì việc bọc tài liệu mục tiêu trong thẻ <instructions> sẽ gán nhầm dữ liệu thành hướng dẫn và không giải quyết được ranh giới cho các ví dụ.\n- Option B sai vì việc dùng văn bản liệt kê ID phụ thuộc vào sự suy luận ngữ nghĩa yếu thay vì ranh giới XML cứng, không ngăn được việc rò rỉ chỉ thị.\n- Option C đúng vì cặp thẻ <examples>...</examples> phân định rõ vùng chứa ví dụ minh họa, giúp Claude cách ly hoàn toàn nội dung ví dụ khỏi tập chỉ thị hệ thống.\n- Option D sai vì khối mã markdown JSON chỉ thay đổi định dạng dữ liệu chứ không cung cấp ranh giới thẻ XML chuẩn cho Claude.",
    "sources": [
      {
        "label": "Lesson 4.3: XML Boundaries",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-3-xml-boundaries"
      }
    ]
  },
  {
    "id": "d4-b08-4.3-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.3 xml-boundaries / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.3-008",
    "questionEN": "In the LegalDocIngestion pipeline, engineers need to pass document metadata including source registry, publication timestamp, and classification level alongside raw text. An engineer proposes using XML attributes on boundary tags directly, such as <document source=\"sec_filing\" date=\"2026-04-01\" classification=\"restricted\">. What is the technical impact of this design on Claude 3.5 Sonnet's XML boundary parsing capabilities?",
    "question": "Trong đường ống LegalDocIngestion, đội ngũ kỹ sư cần truyền thông tin ngữ cảnh (metadata) gồm nguồn tài liệu, ngày phát hành và mức độ bảo mật kèm theo văn bản phân tích. Một kỹ sư đề xuất sử dụng thuộc tính XML trực tiếp trên thẻ ranh giới như <document source=\"sec_filing\" date=\"2026-04-01\" classification=\"restricted\">. Tác động kỹ thuật của thiết kế này đối với khả năng xử lý ranh giới XML của Claude 3.5 Sonnet là gì?",
    "optionsEN": [
      "A. XML attributes trigger syntax parsing errors in Claude, requiring metadata to be extracted into nested child tags inside the element body.",
      "B. Attributes are ignored by Claude's attention mechanism, so metadata must be converted into dedicated system prompt variables.",
      "C. Using XML attributes requires escaping all quotes as \" to prevent the parser from confusing attribute boundaries with prompt string literals.",
      "D.Claude natively parses XML attributes inside structural tags, allowing developers to contextualize data directly at tag boundaries without breaking delimiter isolation or instruction compliance."
    ],
    "options": [
      "A.Thuộc tính XML gây ra lỗi phân tích cú pháp trong Claude, bắt buộc phải tách metadata vào các thẻ con bên trong thẻ chính.",
      "B.Các thuộc tính bị cơ chế chú ý của Claude bỏ qua hoàn toàn, do đó metadata phải được chuyển thành các biến hệ thống chuyên biệt trong system prompt.",
      "C.Việc sử dụng thuộc tính XML yêu cầu phải mã hóa tất cả dấu ngoặc kép thành \" để tránh mô hình nhầm lẫn ranh giới thuộc tính với chuỗi ký tự.",
      "D. Claude hỗ trợ mặc định việc đọc và hiểu thuộc tính XML trong thẻ ranh giới, cho phép truyền metadata trực tiếp tại ranh giới mà không làm hỏng cấu trúc phân tách hay giảm độ chính xác của mô hình."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Claude natively supports XML attributes; splitting metadata into separate nested child tags adds unnecessary structural overhead without technical benefit.",
      "Option B is incorrect: Claude actively attends to XML tag attributes and incorporates them into contextual understanding during prompt processing.",
      "Option C is incorrect: Standard double quotes within XML attributes are parsed correctly by Claude without requiring XML entity escaping such as \".",
      "Option D is correct: Claude natively understands XML attributes within tags(e.g., <document source=\"web\" date=\"2026\">), allowing engineers to bind contextual metadata directly to structural containers without degrading tag boundaries."
    ],
    "rationale": "Claude's prompt architecture naturally supports XML tag attributes. Utilizing attributes inside boundary tags (such as <document source=\"web\" date=\"2026\">) allows developers to inject contextual metadata cleanly at the container level without introducing extra XML boilerplate or breaking tag boundaries.",
    "explanation": "Claude được thiết kế để xử lý cấu trúc XML linh hoạt và tự nhiên, bao gồm cả các thuộc tính nằm trong thẻ mở (ví dụ: <document source=\"web\" date=\"2026\">).\\n\\n- Option A sai vì Claude không bị lỗi phân tích cú pháp khi gặp thuộc tính XML, việc tạo thẻ con <metadata> là không bắt buộc và tốn bộ nhớ ngữ cảnh.\\n- Option B sai vì cơ chế chú ý của Claude nhận biết và sử dụng dữ liệu trong thuộc tính XML để bổ sung ngữ cảnh cho nội dung thẻ.\\n- Option C sai vì Claude phân tích cú pháp thuộc tính chứa dấu ngoặc kép tiêu chuẩn một cách chính xác mà không cần mã hóa thành &quot;.\\n- Option D đúng vì việc đính kèm thuộc tính trực tiếp vào thẻ XML giúp gắn kết metadata chính xác vào vị trí của văn bản mà vẫn giữ nguyên ranh giới phân tách dữ liệu an toàn.",
    "scenarioSignature": {
      "testedPrinciple": "metadata encoding via XML attributes in prompt tags",
      "failureMode": "uncertainty or incorrect stripping of tag attributes in structured prompts",
      "rootCause": "misunderstanding of Claude native support for XML attribute parsing",
      "requiredFix": "leverage XML tag attributes for passing contextual metadata cleanly"
    },
    "sources": [
      {
        "label": "Lesson 4.3: XML Boundaries",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-3-xml-boundaries"
      }
    ]
  }
]