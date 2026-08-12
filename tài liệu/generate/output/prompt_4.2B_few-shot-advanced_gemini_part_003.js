[
  {
    "id": "d4-b08-B-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-005",
    "scenarioSignature": {
      "testedPrinciple": "target language version alignment in code generation few-shot examples",
      "failureMode": "syntax error crashes during code execution in modern runtime environment",
      "rootCause": "few-shot prompt examples contain outdated python 2 syntax patterns",
      "requiredFix": "update all few-shot prompt examples to valid python 3 syntax"
    },
    "questionEN": "In the CodeCraft-AI automated refactoring microservice, gemini-2.5-flash is configured to generate Python 3 data validation routines inside the generated_code JSON schema field. The system prompt incorporates static few-shot examples containing legacy Python 2 syntax (e.g., print \"Validation passed\" and except ValueError, e:). Runtime monitoring indicates a 42% SyntaxError execution failure rate in the Python 3.11 sandbox environment. What is the root cause and recommended remediation?",
    "question": "[d4-b08-B-005] Trong microservice tái cấu trúc mã nguồn tự động CodeCraft-AI, gemini-2.5-flash được cấu hình để tạo các hàm kiểm tra dữ liệu Python 3 trong trường JSON schema generated_code. System prompt sử dụng các ví dụ mẫu (few-shot) tĩnh chứa cú pháp Python 2 cũ (ví dụ: print \"Validation passed\" và except ValueError, e:). Giám sát runtime cho thấy tỷ lệ lỗi thực thi SyntaxError là 42% trong môi trường sandbox Python 3.11. Nguyên nhân gốc rễ và biện pháp khắc phục được đề xuất là gì?",
    "optionsEN": [
      "A. Legacy Python 2 few-shot examples anchor the model to outdated syntax patterns; updating the examples to compliant Python 3 syntax (print(...), except ValueError as e:) resolves the syntax errors.",
      "B. Few-shot examples omit explicit type annotations (x: str -> bool), causing gemini-2.5-flash to default to Python 2 dynamic typing conventions.",
      "C. Few-shot examples fail to declare runtime environment flags, leading gemini-2.5-flash to select an outdated Python 2 code generation template.",
      "D. Dynamic retrieval logic is pulling examples from non-Python codebases, injecting cross-language syntax constructs into the output string."
    ],
    "options": [
      "A. Các ví dụ few-shot Python 2 cũ làm mô hình bị định hình theo các mẫu cú pháp lỗi thời; việc cập nhật các ví dụ sang cú pháp Python 3 chuẩn (print(...), except ValueError as e:) sẽ giải quyết các lỗi cú pháp.",
      "B. Các ví dụ few-shot thiếu chú thích kiểu dữ liệu rõ ràng (x: str -> bool), khiến gemini-2.5-flash mặc định áp dụng các quy ước ép kiểu động của Python 2.",
      "C. Các ví dụ few-shot không khai báo cờ môi trường runtime, dẫn đến việc gemini-2.5-flash tự động chọn một mẫu tạo mã Python 2 cũ.",
      "D. Logic truy xuất động đang kéo các ví dụ từ các kho mã không phải Python, làm lây nhiễm các cấu trúc cú pháp đa ngôn ngữ vào chuỗi đầu ra."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because LLMs strongly mimic the exact syntax and code idioms demonstrated in few-shot examples; Python 2 examples instruct the model to produce invalid Python 3 statements like print \"text\" which fail at execution time.",
      "Option B is incorrect because type annotations are optional syntax in Python 3 and their absence does not produce SyntaxError syntax crashes like unparenthesized print statements.",
      "Option C is incorrect because LLM text generation does not read shell environment flags or switch internal interpreter modes based on environmental declarations in prompt context.",
      "Option D is incorrect because the scenario explicitly notes that static legacy Python 2 examples are included in the prompt, not cross-language dynamic vector retrieval."
    ],
    "rationale": "When using few-shot prompting for code generation tasks, the syntax, standard library calls, and idioms in the example pairs directly constrain the model's output generation. Providing Python 2 examples for a target Python 3.11 execution runtime anchors the model to obsolete constructs such as statement-style print and tuple-based exception handling, causing SyntaxError failures. Updating the few-shot demonstrations to strictly conform to Python 3 syntax eliminates syntax invalidity in the output code.",
    "explanation": "Lựa chọn A là đáp án đúng. Trong các tác vụ sinh mã nguồn (code generation), các ví dụ few-shot đóng vai trò là khuôn mẫu trực tiếp về cú pháp, cú pháp thư viện và phong cách lập trình cho mô hình ngôn ngữ lớn. Khi cung cấp các ví dụ chứa cú pháp Python 2 (như lệnh print \"text\" hoặc except ValueError, e:), mô hình sẽ học và tái tạo chính xác các cấu trúc lỗi thời này, dẫn đến lỗi SyntaxError khi chạy trong môi trường Python 3.11 sandbox. Cập nhật các ví dụ few-shot sang chuẩn Python 3 (print(...), except ValueError as e:) sẽ sửa chữa hoàn toàn vấn đề này.\n\nLựa chọn B sai vì thiếu type hint trong Python 3 không gây ra lỗi SyntaxError, cú pháp Python 3 vẫn hoàn toàn hợp lệ nếu không có type hint.\nLựa chọn C sai vì LLM không đọc cờ môi trường hệ điều hành hoặc chuyển đổi chế độ trình biên dịch nội bộ qua prompt text.\nLựa chọn D sai vì kịch bản nêu rõ lỗi bắt nguồn từ các ví dụ tĩnh thuộc Python 2 có sẵn trong system prompt chứ không phải do truy xuất động (RAG) kéo sai ngôn ngữ.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-006",
    "scenarioSignature": {
      "testedPrinciple": "complete entity coverage in extraction few-shot examples",
      "failureMode": "zero recall for specific target entity class in structured extraction",
      "rootCause": "few-shot prompt examples omit target entity type demonstrations",
      "requiredFix": "add few-shot examples demonstrating extraction of missing entity type"
    },
    "questionEN": "In the DocuMind-Extract contract processing pipeline, gemini-2.5-flash is configured to perform named entity extraction into a structured JSON schema field extracted_entities supporting entity types PERSON, ORG, and DATE. The system prompt contains 5 static few-shot examples demonstrating extractions for PERSON and ORG, but zero examples involving DATE tokens. Production evaluation shows a 0% recall rate for DATE entities across 1,000 processed legal contracts. What is the primary cause of this extraction failure and how should it be fixed?",
    "question": "[d4-b08-B-006] Trong pipeline xử lý hợp đồng DocuMind-Extract, gemini-2.5-flash được cấu hình để trích xuất thực thể có tên vào trường JSON schema extracted_entities hỗ trợ các loại thực thể PERSON, ORG, và DATE. System prompt chứa 5 ví dụ few-shot tĩnh minh họa việc trích xuất PERSON và ORG, nhưng không có ví dụ nào chứa token loại DATE. Đánh giá sản xuất cho thấy tỷ lệ gợi nhớ (recall) cho thực thể DATE là 0% trên 1.000 hợp đồng pháp lý đã xử lý. Nguyên nhân chính của sự cố trích xuất này là gì và nên sửa như thế nào?",
    "optionsEN": [
      "A. The JSON schema type property lacks explicit regex matching; adding a regex constraint for dates forces gemini-2.5-flash to extract date strings.",
      "B. Few-shot examples fail to demonstrate DATE extractions, creating an implicit output pattern bias where the model ignores unrepresented entity classes; adding examples containing DATE extractions resolves the zero recall defect.",
      "C. Excessive PERSON and ORG entity density in few-shot inputs induces token frequency bias, causing DATE tokens to be reclassified as ORG names.",
      "D. Static few-shot prompting suppresses multi-class extraction capabilities; replacing all few-shot examples with zero-shot prompting and raising temperature enables DATE recognition."
    ],
    "options": [
      "A. Thuộc tính type trong JSON schema thiếu khớp biểu thức chính quy (regex); bổ sung ràng buộc regex cho ngày tháng sẽ ép gemini-2.5-flash phải trích xuất các chuỗi ngày.",
      "B. Các ví dụ few-shot không minh họa việc trích xuất DATE, tạo ra sự thiên vị mẫu đầu ra ẩn khiến mô hình bỏ qua các lớp thực thể không được thể hiện; bổ sung các ví dụ chứa trích xuất DATE sẽ khắc phục lỗi zero recall.",
      "C. Mật độ thực thể PERSON và ORG quá cao trong đầu vào few-shot gây ra thiên vị tần suất token, khiến các token DATE bị phân loại nhầm thành tên ORG.",
      "D. Prompting few-shot tĩnh làm triệt tiêu khả năng trích xuất đa lớp; thay thế toàn bộ ví dụ few-shot bằng zero-shot prompting và tăng temperature sẽ bật khả năng nhận diện DATE."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because JSON schema constraints specify valid output syntax but cannot instruct the model on which source text spans map to the DATE entity type without prompt pattern demonstrations.",
      "Option B is correct because few-shot prompting implicitly defines the task boundary; omitting a target entity class (DATE) from the prompt examples causes the LLM to learn that only PERSON and ORG entities are valid extraction targets.",
      "Option C is incorrect because the 0% recall is caused by complete absence of DATE examples in the prompt, not by token frequency imbalance between the two present classes.",
      "Option D is incorrect because few-shot prompting is fully compatible with multi-entity extraction provided all target classes are represented; zero-shot prompting with elevated temperature degrades extraction consistency."
    ],
    "rationale": "In named entity recognition and structured slot-filling tasks, few-shot prompt examples define both the output format and the scope of target entities to extract. When a valid schema entity type (such as DATE) is omitted from all few-shot demonstration pairs, the LLM infers that the extraction rule applies exclusively to the demonstrated classes (PERSON and ORG). To achieve robust recall across all defined schema categories, few-shot sets must contain balanced demonstrations covering every entity class specified in the system instructions.",
    "explanation": "Lựa chọn B là đáp án đúng. Trong các tác vụ trích xuất thực thể có tên (NER) và điền ô thông tin (slot filling), các ví dụ few-shot xác định không chỉ định dạng đầu ra mà còn tạo ra ranh giới phạm vi trích xuất cho mô hình. Khi một loại thực thể có trong schema (như DATE) bị bỏ sót khỏi toàn bộ các ví dụ minh họa, mô hình sẽ mặc định học theo quy luật ẩn rằng chỉ trích xuất các loại thực thể xuất hiện trong ví dụ (PERSON và ORG). Việc thêm các ví dụ few-shot minh họa cách trích xuất DATE sẽ giúp mô hình nhận diện đầy đủ tất cả các loại thực thể target.\n\nLựa chọn A sai vì JSON schema chỉ áp đặt ràng buộc về định dạng dữ liệu đầu ra chứ không dạy mô hình cách nhận biết đoạn văn bản nào ứng với DATE.\nLựa chọn C sai vì nguyên nhân không phải do mật độ PERSON/ORG lấn át, mà do DATE hoàn toàn không có trong ví dụ mẫu.\nLựa chọn D sai vì few-shot hoàn toàn hỗ trợ trích xuất đa thực thể nếu cung cấp đủ các lớp; chuyển sang zero-shot và tăng temperature sẽ làm giảm tính ổn định và tăng nguy cơ ảo giác.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]