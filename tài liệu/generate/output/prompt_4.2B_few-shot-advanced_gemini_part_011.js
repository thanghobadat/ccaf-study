[
  {
    "id": "d4-b08-B-021",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-21",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-021",
    "scenarioSignature": {
      "testedPrinciple": "context window budget optimization for few-shot prompts",
      "failureMode": "context length truncation error during long document processing",
      "rootCause": "excessive context consumption by verbose static few-shot examples",
      "requiredFix": "trim few-shot example length and reduce example count to reserve token budget"
    },
    "questionEN": "In the DocClaimExtractor microservice, gemini-2.5-flash is deployed to process 35,000-word insurance policy contracts and extract structural coverage limits into JSON. The system prompt contains 8 detailed few-shot examples, each averaging 500 tokens (consuming 4,000 tokens per API call). During batch processing of full-length policy documents, request calls trigger context overflow errors or truncate input payload text. What is the most effective prompt engineering fix?",
    "question": "[d4-b08-B-021] Trong dịch vụ DocClaimExtractor, gemini-2.5-flash được triển khai để xử lý các hợp đồng bảo hiểm dài 35.000 từ và trích xuất giới hạn phạm vi bảo hiểm vào JSON. System prompt hiện chứa 8 ví dụ few-shot chi tiết, mỗi ví dụ khoảng 500 token (tiêu tốn 4.000 token mỗi yêu cầu API). Khi xử lý hàng loạt các tài liệu hợp đồng đầy đủ, các yêu cầu bị lỗi vượt quá giới hạn ngữ cảnh (context overflow) hoặc làm cắt xén văn bản đầu vào. Giải pháp kỹ thuật prompt hiệu quả nhất là gì?",
    "optionsEN": [
      "A. Reduce few-shot overhead by trimming examples to 1-2 concise input-output pairs focused strictly on schema edge cases.",
      "B. Append 4 additional detailed examples covering secondary policy clauses to improve schema adherence.",
      "C. Encode the 8 few-shot examples as base64 string metadata inside the system prompt header.",
      "D. Chunk the 35,000-word insurance contracts into 100-token isolated segments before passing them to the model."
    ],
    "options": [
      "A. Giảm chi phí ngữ cảnh few-shot bằng cách thu gọn còn 1-2 cặp đầu vào-đầu ra ngắn gọn tập trung vào các trường hợp biên của schema.",
      "B. Bổ sung thêm 4 ví dụ chi tiết phủ các điều khoản phụ để tăng độ tuân thủ schema.",
      "C. Mã hóa 8 ví dụ few-shot thành chuỗi base64 trong tiêu đề system prompt.",
      "D. Chia nhỏ hợp đồng 35.000 từ thành các đoạn độc lập 100 token trước khi truyền vào mô hình."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because reducing the few-shot payload to 1-2 concise, targeted examples frees up vital token context budget for the long insurance document input while preserving schema structural guidance.",
      "Option B is incorrect because adding 4 more detailed examples increases prompt overhead by ~2,000 additional tokens, worsening context window saturation and input truncation.",
      "Option C is incorrect because base64 encoding does not reduce token count and obfuscates example semantics for the language model.",
      "Option D is incorrect because aggressively splitting long insurance contracts into 100-token fragments destroys document-level semantic relationships required for accurate coverage limit extraction."
    ],
    "rationale": "In long-document processing tasks, context budget must prioritize the target document input. Trimming few-shot examples to 1-2 concise pairs maintains structural output formatting while preserving token capacity for long inputs.",
    "explanation": "Chi tiết giải thích cho từng lựa chọn:\n- Đáp án A đúng vì cắt giảm số lượng và độ dài ví dụ few-shot xuống 1-2 mẫu ngắn gọn giúp tiết kiệm bộ nhớ token (context budget) dành cho văn bản hợp đồng đầu vào dài, đồng thời vẫn duy trì cấu trúc JSON đầu ra mong muốn.\n- Đáp án B sai vì việc thêm 4 ví dụ sẽ tiêu tốn thêm khoảng 2.000 token, làm trầm trọng hơn tình trạng tràn ngữ cảnh và cắt xén đầu vào.\n- Đáp án C sai vì mã hóa base64 không làm giảm số lượng token và khiến mô hình không thể đọc hiểu cú pháp ví dụ.\n- Đáp án D sai vì việc chia hợp đồng thành các mảnh quá nhỏ (100 token) sẽ phá vỡ ngữ cảnh ngữ nghĩa tổng thể cần thiết để trích xuất điều khoản bảo hiểm.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-022",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-22",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-022",
    "scenarioSignature": {
      "testedPrinciple": "few-shot example output schema alignment with target production enum values",
      "failureMode": "downstream schema validation failure due to mismatched classification output format",
      "rootCause": "few-shot example outputs formatted with numeric scale instead of target string enum categories",
      "requiredFix": "relabel few-shot example output fields with exact target string enum values"
    },
    "questionEN": "In the OpsAlertClassifier microservice, gemini-2.5-flash categorizes system log anomalies into a severity field. The downstream incident management platform expects string enum values (CRITICAL, HIGH, MEDIUM, LOW). However, production validation fails because the model outputs numeric scores (1 to 5). Inspection of the system prompt reveals that all few-shot examples format outputs as {\"severity\": 5}. What is the correct resolution to enforce expected enum formatting?",
    "question": "[d4-b08-B-022] Trong dịch vụ OpsAlertClassifier, gemini-2.5-flash phân loại sự cố hệ thống vào trường severity. Nền tảng quản lý sự cố phía hạ nguồn yêu cầu các giá trị chuỗi enum (CRITICAL, HIGH, MEDIUM, LOW). Tuy nhiên, kiểm tra sản xuất thất bại do mô hình liên tục xuất ra điểm số dạng số (1 đến 5). Kiểm tra system prompt cho thấy toàn bộ các ví dụ few-shot đang định dạng đầu ra dưới dạng {\"severity\": 5}. Giải pháp khắc phục đúng nhất để áp đặt định dạng enum mong muốn là gì?",
    "optionsEN": [
      "A. Insert a system prompt directive instructing the model to multiply numeric ratings by 20 to produce percentage scores.",
      "B. Update all few-shot example outputs to display exact target string enums (CRITICAL, HIGH, MEDIUM, LOW) instead of numeric scores.",
      "C. Modify the downstream API database schema to accept integer values 1 through 5 alongside string enums.",
      "D. Update few-shot examples to output compound strings combining numbers and words like \"5 - CRITICAL\"."
    ],
    "options": [
      "A. Thêm chỉ thị vào system prompt yêu cầu mô hình nhân tỷ lệ số với 20 để tạo điểm phần trăm.",
      "B. Cập nhật tất cả đầu ra trong ví dụ few-shot sang đúng các nhãn chuỗi enum mục tiêu (CRITICAL, HIGH, MEDIUM, LOW) thay vì điểm số.",
      "C. Thay đổi schema cơ sở dữ liệu API hạ nguồn để chấp nhận các số nguyên từ 1 đến 5 song song với chuỗi enum.",
      "D. Cập nhật các ví dụ few-shot để xuất chuỗi kết hợp cả số và chữ như \"5 - CRITICAL\"."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because adding numerical multiplication instructions does not correct the output type mismatch from integers to expected string enums.",
      "Option B is correct because alignment of few-shot example outputs with the target production schema (CRITICAL, HIGH, MEDIUM, LOW) directly conditions the model to output the correct string enum values.",
      "Option C is incorrect because altering downstream enterprise database schemas to accommodate prompt formatting defects violates software architecture practices.",
      "Option D is incorrect because outputting compound strings like \"5 - CRITICAL\" fails strict enum validation on the downstream API."
    ],
    "rationale": "Few-shot examples act as implicit structural templates. When few-shot outputs use numeric scales instead of required string enums, the model mimics the example structure. Relabeling examples with target enum strings forces exact output schema compliance.",
    "explanation": "Chi tiết giải thích cho từng lựa chọn:\n- Đáp án A sai vì chỉ thị tính toán số học không giải quyết được lỗi bất đồng kiểu dữ liệu (từ số sang chuỗi enum).\n- Đáp án B đúng vì các ví dụ few-shot đóng vai trò khuôn mẫu định dạng cho mô hình; khi cập nhật các ví dụ dùng chính xác các chuỗi enum mục tiêu (CRITICAL, HIGH, MEDIUM, LOW), mô hình sẽ học theo và xuất ra định dạng chuẩn xác cho hệ thống hạ nguồn.\n- Đáp án C sai vì sửa đổi schema của hệ thống hạ nguồn để thỏa hiệp với lỗi cấu hình prompt là phương pháp sai về mặt kiến trúc phần mềm.\n- Đáp án D sai vì chuỗi kết hợp \"5 - CRITICAL\" vẫn sẽ vi phạm quy tắc kiểm tra nghiêm ngặt (strict enum validation) của API hạ nguồn.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]