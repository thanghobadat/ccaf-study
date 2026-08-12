[
  {
    "id": "d4-b08-new-015",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-015",
    "questionEN": "In the SQLQueryGenService platform, a microservice uses gemini-2.5-flash to generate raw SQL strings into the generated_query field for downstream execution. Although the system prompt instructs the model never to include markdown formatting, preamble text, or destructive DDL queries, evaluation logs show a 34% failure rate where the model still outputs markdown code blocks (sql ... ) and conversational introductions (\"Here is the query: \"). The current prompt includes six positive few-shot examples showing natural language requests mapped to clean SELECT queries. What is the root cause of this failure and the most effective fix?",
    "question": "[d4-b08-new-015] Trong nền tảng SQLQueryGenService, một dịch vụ vi mô sử dụng gemini-2.5-flash để tạo các chuỗi SQL thô vào trường payload generated_query cho việc thực thi phía hạ nguồn. Mặc dù system prompt đã hướng dẫn mô hình không được bao gồm định dạng markdown, văn bản dẫn dắt (preamble) hoặc các truy vấn DDL phá hủy, nhật ký đánh giá cho thấy tỷ lệ thất bại 34% khi mô hình vẫn tạo ra các khối mã markdown (sql ... ) và lời giới thiệu hội thoại (\"Here is the query: \"). Prompt hiện tại bao gồm 6 ví dụ few-shot tích cực thể hiện yêu cầu ngôn ngữ tự nhiên được ánh xạ thành các truy vấn SELECT sạch. Nguyên nhân gốc rễ của thất bại này là gì và giải pháp khắc phục hiệu quả nhất là gì?",
    "optionsEN": [
      "A. The few-shot prompt contains too few positive examples to anchor the output schema. Increase the number of positive SELECT examples from six to fifteen to cover additional JOIN clauses.",
      "B. The system prompt context window is overloaded by examples. Remove all few-shot examples and rely entirely on a system prompt instruction with high temperature settings.",
      "C. The few-shot prompt lacks negative examples demonstrating prohibited anti-patterns, preventing the model from learning boundaries on what NOT to generate.",
      "D. The output schema field generated_query is defined as a string scalar instead of an array of tokens. Modify the API schema definition to return token indexes."
    ],
    "options": [
      "A. Few-shot prompt chứa quá ít ví dụ tích cực để định hình schema đầu ra. Tăng số lượng ví dụ SELECT tích cực từ 6 lên 15 để bao phủ thêm các câu lệnh JOIN.",
      "B. Cửa sổ ngữ cảnh của system prompt bị quá tải bởi các ví dụ. Xóa tất cả các ví dụ few-shot và chỉ dựa vào chỉ thị trong system prompt với thiết lập temperature cao.",
      "C. Few-shot prompt thiếu các ví dụ tiêu cực (negative examples) minh họa các anti-pattern bị cấm, khiến mô hình không học được ranh giới về những gì KHÔNG ĐƯỢC tạo ra.",
      "D. Trường schema đầu ra generated_query được định nghĩa là một chuỗi thay vì một mảng token. Thay đổi định nghĩa API schema để trả về danh sách chỉ số token."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because adding more positive examples only demonstrates valid SQL queries but does not teach the model to suppress unwanted formatting behaviors like markdown blocks or preambles.",
      "Option B is incorrect because deleting few-shot examples and raising temperature will worsen generation output consistency and increase unwanted conversational artifacts.",
      "Option C is correct because for generation tasks, negative examples (explicitly demonstrating forbidden output patterns alongside positive ones) are critical for establishing clear output boundaries when text instructions alone fail to stop unwanted patterns.",
      "Option D is incorrect because changing string fields to token arrays does not address prompt instruction adherence or format generation boundaries."
    ],
    "rationale": "In generation tasks, models often struggle to recognize strict negative constraints from prose instructions alone. Adding negative examples that explicitly showcase prohibited outputs (such as code blocks or introductory prose) alongside valid examples defines clear generation boundaries, ensuring the model avoids creating unwanted markdown artifacts.",
    "explanation": "Trong các tác vụ tạo sinh (generation tasks), việc chỉ cung cấp các ví dụ tích cực (positive examples) cho biết kết quả đúng trông như thế nào là chưa đủ khi mô hình liên tục vi phạm các quy tắc định dạng. Các ví dụ tiêu cực (negative examples) giúp thiết lập ranh giới rõ ràng về những gì KHÔNG NÊN tạo ra (như cú pháp markdown ```sql hoặc lời thoại dẫn dắt).\\n- Lựa chọn A sai vì thêm nhiều ví dụ tích cực chỉ dạy mô hình viết SQL đúng chứ không giải quyết được việc loại bỏ định dạng thừa.\\n- Lựa chọn B sai vì xóa ví dụ few-shot và tăng temperature sẽ làm giảm tính ổn định và làm tăng hội thoại thừa.\\n- Lựa chọn C đúng vì bổ sung các ví dụ tiêu cực minh họa rõ ràng anti-pattern cần tránh giúp mô hình hiểu chính xác ranh giới định dạng đầu ra.\\n- Lựa chọn D sai vì việc thay đổi kiểu dữ liệu API schema sang mảng token không liên quan đến khả năng tuân thủ định dạng của prompt.",
    "scenarioSignature": {
      "testedPrinciple": "negative few-shot examples establish generation boundaries",
      "failureMode": "model generates forbidden formatting and preamble text",
      "rootCause": "absence of negative examples showing prohibited generation anti-patterns",
      "requiredFix": "add negative counter-examples demonstrating disallowed output formats"
    },
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-016",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-016",
    "scenarioSignature": {
      "testedPrinciple": "input to output paired structure in few shot examples",
      "failureMode": "high extraction error rate and field hallucination",
      "rootCause": "few shot examples provide outputs only without corresponding input text",
      "requiredFix": "reformat few shot examples into explicit paired input to output examples"
    },
    "questionEN": "In the InvoiceParserWorker microservice, an AI pipeline uses gemini-2.5-flash to extract structured JSON data containing vendor_name, invoice_total, and tax_amount from unstructured invoice text. During evaluation on benchmark datasets, the pipeline exhibits a 58% failure rate, generating hallucinated vendor names and mismatched invoice totals. Inspection of the prompt reveals that the few-shot section contains four formatted JSON objects demonstrating valid target outputs, but omits the raw invoice text that generated each JSON object. Why is this few-shot prompt failing, and how should it be modified?",
    "question": "[d4-b08-new-016] Trong dịch vụ vi mô InvoiceParserWorker, một đường ống AI sử dụng gemini-2.5-flash để trích xuất dữ liệu JSON cấu trúc chứa vendor_name, invoice_total và tax_amount từ văn bản hóa đơn không cấu trúc. Trong quá trình đánh giá trên tập dữ liệu benchmark, đường ống gặp tỷ lệ thất bại 58%, tạo ra các tên nhà cung cấp ảo (hallucinated) và tổng tiền hóa đơn không khớp. Kiểm tra prompt cho thấy phần few-shot chứa 4 đối tượng JSON được định dạng thể hiện các đầu ra mục tiêu hợp lệ, nhưng bỏ qua văn bản hóa đơn thô đã tạo ra từng đối tượng JSON đó. Tại sao few-shot prompt này thất bại và nên sửa đổi như thế nào?",
    "optionsEN": [
      "A. The few-shot prompt contains invalid JSON formatting inside the output payloads. Validate the JSON objects with a strict schema validator before including them in the prompt.",
      "B. The target JSON schema is too complex for gemini-2.5-flash. Flatten the schema into a single string scalar field and rely on regex post-processing to extract numbers.",
      "C. The model requires a higher sampling temperature to correlate output-only JSON examples with user inputs. Increase the temperature parameter to 1.0.",
      "D. The few-shot examples present outputs without corresponding input texts, preventing the model from learning the input-to-output mapping function; reformat examples as explicit input-output pairs."
    ],
    "options": [
      "A. Few-shot prompt chứa định dạng JSON không hợp lệ bên trong các payload đầu ra. Kiểm tra các đối tượng JSON bằng một trình xác thực schema nghiêm ngặt trước khi đưa vào prompt.",
      "B. Schema JSON mục tiêu quá phức tạp đối với gemini-2.5-flash. Phẳng hóa (flatten) schema thành một trường chuỗi đơn lẻ và dựa vào xử lý hậu kỳ bằng regex để trích xuất các con số.",
      "C. Mô hình yêu cầu temperature lấy mẫu cao hơn để liên kết các ví dụ JSON chỉ có đầu ra với đầu vào của người dùng. Tăng tham số temperature lên 1.0.",
      "D. Các ví dụ few-shot chỉ đưa ra đầu ra mà không có văn bản đầu vào tương ứng, khiến mô hình không thể học được hàm ánh xạ từ đầu vào sang đầu ra; định dạng lại các ví dụ thành các cặp đầu vào-đầu ra rõ ràng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because the issue stems from missing input context in the examples, not syntax errors within the target JSON objects.",
      "Option B is incorrect because flattening the schema avoids fixing the prompt mapping structure and introduces unnecessary regex parsing brittle code.",
      "Option C is incorrect because increasing sampling temperature increases output randomness rather than establishing relationship context between inputs and outputs.",
      "Option D is correct because few-shot prompting requires paired input-to-output examples so the model can learn the conditional mapping between input invoice patterns and extracted output schema fields."
    ],
    "rationale": "Few-shot examples function by teaching the LLM the transformation function between inputs and outputs. Providing target JSON outputs without their corresponding input texts deprives the model of the input context required to learn field extraction patterns, causing high extraction error and hallucination rates. Including paired input-to-output examples restores the necessary learning signal.",
    "explanation": "Trong few-shot prompting, bản chất của các ví dụ là dạy mô hình quy luật ánh xạ (transformation function) từ dữ liệu đầu vào sang kết quả đầu ra. Việc chỉ cung cấp các cấu trúc JSON đầu ra mà bỏ qua văn bản hóa đơn đầu vào tương ứng khiến mô hình không thể học được mối liên hệ giữa văn bản thô và các trường dữ liệu cần trích xuất, dẫn đến ảo giác và trích xuất sai 58%.\n- Lựa chọn A sai vì sự cố không xuất phát từ cú pháp JSON bị lỗi mà do thiếu văn bản đầu vào trong ví dụ.\n- Lựa chọn B sai vì việc làm phẳng schema không giải quyết nguyên nhân gốc rễ là thiếu ánh xạ ví dụ và gây rủi ro khi dùng regex.\n- Lựa chọn C sai vì tăng temperature chỉ làm tăng tính ngẫu nhiên của câu trả lời, không giúp mô hình tự suy ra mối quan hệ đầu vào-đầu ra.\n- Lựa chọn D đúng vì định dạng lại ví dụ dưới dạng các cặp đầu vào-đầu ra (input-output pairs) cung cấp đầy đủ tín hiệu ngữ cảnh để mô hình học chính xác cách trích xuất dữ liệu.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]