[
  {
    "id": "d4-b08-B-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-009",
    "scenarioSignature": {
      "testedPrinciple": "delimiter isolation in few-shot example formatting",
      "failureMode": "example blending and output concatenation",
      "rootCause": "omission of explicit structural boundary separators between few-shot prompt blocks",
      "requiredFix": "insert standardized multi-character or XML delimiter boundaries between individual few-shot pairs"
    },
    "questionEN": "In the DocParse microservice, gemini-2.5-flash extracts metadata into a document_summary JSON payload using a static five-example prompt. Production logs show that the model frequently concatenates text from Example 2 into the output of Example 3 and fails to generate structured JSON for target user inputs. Prompt audit reveals that inputs and outputs across examples are concatenated as plain text without structural delimiters like --- or <example> XML tags. What is the root cause and recommended solution for this parsing failure?",
    "question": "[d4-b08-B-009] Trong microservice DocParse, gemini-2.5-flash trích xuất dữ liệu đặc tả vào payload JSON document_summary bằng cách sử dụng prompt tĩnh chứa 5 ví dụ. Nhật ký hệ thống cho thấy mô hình thường xuyên nối văn bản từ Ví dụ 2 vào đầu ra của Ví dụ 3 và không thể tạo ra JSON có cấu trúc cho đầu vào của người dùng. Kiểm tra prompt cho thấy đầu vào và đầu ra giữa các ví dụ được nối dưới dạng văn bản thuần túy mà không có ranh giới cấu trúc như --- hoặc thẻ XML <example>. Nguyên nhân gốc rễ và giải pháp kiến trúc được khuyến nghị cho sự cố trích xuất này là gì?",
    "optionsEN": [
      "A. The lack of explicit boundary delimiters causes the model to perceive adjacent prompt pairs as a continuous text stream; inserting clear XML <example> boundaries prevents example boundary blending.",
      "B. Static few-shot prompts cause token overflow when combined with JSON schemas; migrating the prompt architecture to dynamic similarity retrieval fixes token boundary alignment.",
      "C. The model's temperature parameter is set too low for multi-shot generation; increasing temperature from 0.0 to 0.7 enforces structural separation across input blocks.",
      "D. Schema field descriptions contradict plain text inputs; removing field constraints from system instructions resolves example boundary parsing issues."
    ],
    "options": [
      "A. Việc thiếu các bộ phân cách ranh giới rõ ràng khiến mô hình coi các cặp ví dụ liền kề là một luồng văn bản liên tục; việc chèn các ranh giới XML <example> rõ ràng sẽ ngăn chặn sự hòa trộn ranh giới giữa các ví dụ.",
      "B. Các prompt few-shot tĩnh gây ra hiện tượng tràn token khi kết hợp với JSON schema; việc chuyển đổi kiến trúc prompt sang truy xuất độ tương đồng động sẽ khắc phục hiện tượng căn chỉnh ranh giới token.",
      "C. Tham số temperature của mô hình được đặt quá thấp cho việc tạo multi-shot; việc tăng temperature từ 0.0 lên 0.7 sẽ thực thi phân tách cấu trúc giữa các khối đầu vào.",
      "D. Mô tả trường trong schema mâu thuẫn với đầu vào văn bản thuần túy; việc xóa các ràng buộc trường khỏi hướng dẫn hệ thống sẽ giải quyết các vấn đề phân tích ranh giới ví dụ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because LLMs rely on explicit structural boundary delimiters (such as XML tags or Markdown horizontal rules) to parse distinct input-output prompt pairs; without them, tokens blend across boundaries.",
      "Option B is incorrect because shifting from static to dynamic retrieval does not fix delimiter formatting within the prompt template itself.",
      "Option C is incorrect because adjusting temperature affects output randomness, not prompt-token segmentation or delimiter boundary recognition.",
      "Option D is incorrect because modifying schema descriptions does not address structural text stream concatenation between few-shot prompt pairs."
    ],
    "rationale": "Without explicit delimiters separating few-shot examples, LLMs process the examples as a single unsegmented text stream, blending adjacent inputs and outputs together.",
    "explanation": "Lựa chọn A là đáp án chính xác vì các mô hình ngôn ngữ lớn (LLM) phụ thuộc vào các bộ phân cách ranh giới rõ ràng như thẻ XML hoặc đường kẻ ngang để phân định giữa các cặp ví dụ. Nếu thiếu các ranh giới này, mô hình sẽ coi toàn bộ ví dụ là một luồng văn bản liên tục, dẫn đến việc hòa trộn dữ liệu giữa các ví dụ.\n\nLựa chọn B sai vì việc chuyển đổi sang RAG/dynamic retrieval không giải quyết được lỗi định dạng ranh giới trong bản thân template của prompt.\nLựa chọn C sai vì tham số temperature chỉ ảnh hưởng đến tính ngẫu nhiên của kết quả đầu ra, không giúp mô hình nhận biết ranh giới phân tách cấu trúc.\nLựa chọn D sai vì việc xóa mô tả trường trong schema không liên quan đến việc xử lý trích xuất ranh giới văn bản giữa các ví dụ few-shot.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-010",
    "scenarioSignature": {
      "testedPrinciple": "domain alignment in few-shot prompt retrieval",
      "failureMode": "incorrect field key and format extraction",
      "rootCause": "cross-domain prompt example leakage transferring mismatched structural schema patterns",
      "requiredFix": "filter few-shot example selection to match target input domain schema"
    },
    "questionEN": "In the CareRecordExtract service, gemini-2.5-flash extracts medical patient histories into a target clinical_entities JSON array. During a microservice consolidation, engineers populated the dynamic few-shot prompt repository with verified auto-insurance claim extraction examples. Production evaluation shows a 52% schema validation failure rate because the model emits fields like policy_number and claim_amount instead of medical entity keys. What is the root cause and remediation for this failure?",
    "question": "[d4-b08-B-010] Trong dịch vụ CareRecordExtract, gemini-2.5-flash trích xuất tiền sử bệnh nhân vào mảng JSON mục tiêu clinical_entities. Trong quá trình hợp nhất microservice, các kỹ sư đã bổ sung kho lưu trữ few-shot động bằng các ví dụ trích xuất hồ sơ bồi thường bảo hiểm ô tô đã xác minh. Đánh giá vận hành thực tế cho thấy tỷ lệ thất bại kiểm định schema lên tới 52% do mô hình xuất ra các trường như policy_number và claim_amount thay vì các khóa thực thể y tế. Nguyên nhân gốc rễ và giải pháp khắc phục cho sự cố này là gì?",
    "optionsEN": [
      "A. The system prompt missing explicit JSON schema syntax causes key hallucination; replacing schema definitions with standard Pydantic models solves cross-domain validation errors.",
      "B. Cross-domain prompt contamination causes the model to transfer insurance field structures to medical inputs; filtering few-shot examples strictly to the medical domain restores correct key extraction.",
      "C. High context length from few-shot examples triggers context truncation; reducing example input length from 500 to 100 tokens aligns schema keys.",
      "D. Semantic vector retrieval returned exact match strings; disabling embedding model normalization forces the LLM to ignore insurance schema structures."
    ],
    "options": [
      "A. Hướng dẫn hệ thống thiếu cú pháp JSON schema rõ ràng gây ra hiện tượng ảo giác về khóa; việc thay thế định nghĩa schema bằng mô hình Pydantic chuẩn sẽ giải quyết lỗi kiểm định chéo domain.",
      "B. Sự nhiễm bẩn prompt chéo domain (cross-domain) khiến mô hình chuyển giao cấu trúc trường bảo hiểm sang đầu vào y tế; việc lọc các ví dụ few-shot nghiêm ngặt theo đúng domain y tế sẽ khôi phục việc trích xuất khóa chính xác.",
      "C. Độ dài ngữ cảnh lớn từ các ví dụ few-shot kích hoạt hiện tượng cắt gọt ngữ cảnh; việc giảm độ dài đầu vào của ví dụ từ 500 xuống 100 token sẽ làm căn chỉnh các khóa schema.",
      "D. Truy xuất vectơ ngữ nghĩa đã trả về các chuỗi khớp khép kín; việc tắt chuẩn hóa mô hình embedding sẽ buộc LLM bỏ qua các cấu trúc schema bảo hiểm."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because the issue stems from cross-domain prompt contents, not the formal schema syntax representation.",
      "Option B is correct because providing few-shot examples from an unrelated domain (insurance) causes the model to learn and reproduce structural patterns and field names specific to that wrong domain.",
      "Option C is incorrect because shortening token length does not remove the mismatched domain entity concepts contained within the prompt.",
      "Option D is incorrect because embedding normalization settings do not address the architectural mismatch of using insurance examples for clinical extraction tasks."
    ],
    "rationale": "Using few-shot examples from an incorrect domain causes cross-domain contamination, where the model learns unwanted structural patterns and output fields from the mismatched context.",
    "explanation": "Lựa chọn B là đáp án chính xác vì việc cung cấp các ví dụ few-shot từ một domain không liên quan (bảo hiểm ô tô) sẽ gây ra hiện tượng ô nhiễm chéo domain (cross-domain contamination). Mô hình LLM sẽ học và tái tạo lại các cấu trúc trường và định dạng từ các ví dụ đó, dẫn đến việc xuất ra các khóa sai như policy_number cho một tác vụ y tế.\n\nLựa chọn A sai vì sự cố bắt nguồn từ nội dung ví dụ trong prompt chứ không phải do thiếu cú pháp JSON schema.\nLựa chọn C sai vì việc thu ngắn token không loại bỏ được bản chất sai lệch domain của các ví dụ.\nLựa chọn D sai vì cấu hình chuẩn hóa embedding không thể sửa lỗi kiến trúc khi cung cấp sai tập dữ liệu mẫu cho bài toán."
  }
]