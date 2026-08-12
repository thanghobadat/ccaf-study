[
  {
    "id": "d4-b08-new-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-009",
    "scenarioSignature": {
      "testedPrinciple": "few-shot labeling consistency across prompt examples",
      "failureMode": "non-deterministic output classification for identical input patterns",
      "rootCause": "contradictory target labels assigned to identical input patterns across prompt examples",
      "requiredFix": "audit prompt examples to enforce consistent label assignment for identical input patterns"
    },
    "questionEN": "In the ClaimEvaluator automated insurance processing service, a worker node uses gemini-2.5-flash to populate the disposition schema field with either APPROVE or REJECT. During production deployment, monitoring shows non-deterministic classification on claims with missing receipt line items, resulting in a 50% split variance across identical payloads. Prompt inspection reveals that example 2 labels a claim missing receipts as APPROVE, while example 5 labels the same missing-receipt pattern as REJECT. Which modification to the prompt will resolve the decision instability?",
    "question": "[d4-b08-new-009] Trong dịch vụ xử lý bảo hiểm tự động ClaimEvaluator, một worker node sử dụng gemini-2.5-flash để điền trường schema disposition với giá trị APPROVE hoặc REJECT. Trong quá trình triển khai thực tế, giám sát ghi nhận việc phân loại không nhất quán đối với các yêu cầu bồi thường thiếu hóa đơn, dẫn đến tỷ lệ phân tán 50% trên các payload giống hệt nhau. Kiểm tra prompt cho thấy ví dụ 2 gán nhãn một yêu cầu thiếu hóa đơn là APPROVE, trong khi ví dụ 5 lại gán nhãn mẫu thiếu hóa đơn tương tự là REJECT. Thay đổi nào đối với prompt sẽ giải quyết được sự không ổn định trong quyết định này?",
    "optionsEN": [
      "A. Audit and harmonize the few-shot examples so that identical input patterns (missing receipts) consistently map to the single intended label (REJECT) across all prompt examples.",
      "B. Add a system directive specifying that when example labels conflict, the model must default to the label provided in the later example (example 5).",
      "C. Append 10 additional contradictory examples to the prompt so that the model can dynamically average out the label probabilities during inference.",
      "D. Remove all labels from the few-shot examples and rely entirely on zero-shot inference with a high temperature setting."
    ],
    "options": [
      "A. Kiểm tra và đồng bộ hóa các ví dụ few-shot sao cho các mẫu đầu vào giống hệt nhau (thiếu hóa đơn) nhất quán ánh xạ tới một nhãn duy nhất (REJECT) trên tất cả các ví dụ trong prompt.",
      "B. Thêm một chỉ thị hệ thống quy định rằng khi các nhãn ví dụ xung đột, mô hình phải mặc định sử dụng nhãn được cung cấp trong ví dụ xuất hiện sau (ví dụ 5).",
      "C. Bổ sung thêm 10 ví dụ mâu thuẫn vào prompt để mô hình có thể tính trung bình động xác suất nhãn trong quá trình suy luận.",
      "D. Xóa tất cả các nhãn khỏi các ví dụ few-shot và phụ thuộc hoàn toàn vào suy luận zero-shot với thiết lập temperature cao."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because eliminating contradictory annotations between example 2 and example 5 enforces deterministic label mapping for missing receipt patterns in the disposition field.",
      "Option B is incorrect because adding system prompt directives to override bad examples does not resolve attention vector noise caused by conflicting few-shot demonstrations.",
      "Option C is incorrect because appending more contradictory examples inflates context token overhead and worsens classification variance.",
      "Option D is incorrect because removing all labels converts the prompt to zero-shot with high temperature, eliminating essential formatting guidance and increasing randomness."
    ],
    "rationale": "Conflicting labels in few-shot examples create ambiguous decision boundaries in the model's attention space, leading to non-deterministic classifications on identical inputs. Standardizing the labels across all prompt examples restores consistent label mapping.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Lựa chọn A (Đúng): Việc gán nhãn không nhất quán trong các ví dụ few-shot (ví dụ 2 gán APPROVE nhưng ví dụ 5 gán REJECT cho cùng một mẫu) tạo ra sự mơ hồ trong không gian chú ý của mô hình, dẫn đến kết quả đầu ra không định tính. Đồng bộ hóa tất cả các ví dụ để cùng áp dụng một quy tắc nhãn thống nhất là giải pháp triệt để duy nhất.\n- Lựa chọn B (Sai): Việc viết chỉ thị hệ thống yêu cầu ưu tiên ví dụ đứng sau không giải quyết được căn nguyên dữ liệu huấn luyện trong prompt bị nhiễu và khiến mô hình phản ứng kém tin cậy.\n- Lựa chọn C (Sai): Thêm các ví dụ mâu thuẫn làm tăng dung lượng context không cần thiết và làm trầm trọng thêm tình trạng phân tán xác suất của mô hình.\n- Lựa chọn D (Sai): Loại bỏ hoàn toàn nhãn và chuyển sang zero-shot cùng temperature cao sẽ làm mất đi khả năng định hướng từ few-shot và làm tăng độ hỗn loạn của dữ liệu đầu ra.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-010",
    "questionEN": "In the SecurityAlertWorker incident analysis pipeline, gemini-2.5-flash is tasked with formatting threat assessments into the threat_level JSON schema. Downstream parsing services report a 38% unparseable payload error rate because the model randomly switches between valid JSON objects and unstructured plain text strings. Audit of the prompt reveals that few-shot examples 1 and 3 provide plain text outputs (HIGH - rate limit exceeded), whereas examples 2 and 4 provide structured JSON ({\"threat_level\": \"HIGH\", \"reason\": \"rate limit exceeded\"}). Which action will permanently resolve the output formatting instability?",
    "question": "[d4-b08-new-010] Trong đường ống phân tích sự cố SecurityAlertWorker, gemini-2.5-flash được giao nhiệm vụ định dạng các đánh giá mối đe dọa vào JSON schema chứa trường threat_level. Các dịch vụ parse phía sau ghi nhận tỷ lệ lỗi payload không thể parse lên tới 38% do mô hình chuyển đổi ngẫu nhiên giữa đối tượng JSON hợp lệ và chuỗi plain text không cấu trúc. Kiểm tra prompt cho thấy các ví dụ few-shot 1 và 3 trả về đầu ra plain text (HIGH - rate limit exceeded), trong khi ví dụ 2 và 4 trả về JSON có cấu trúc ({\"threat_level\": \"HIGH\", \"reason\": \"rate limit exceeded\"}). Hành động nào sẽ giải quyết dứt điểm sự không ổn định về định dạng đầu ra?",
    "optionsEN": [
      "A. Implement a retry loop in the client code that catches parsing failures and re-prompts the model with a higher temperature until JSON is returned.",
      "B. Standardize all few-shot examples to strictly follow the identical target JSON structure so every demonstration reinforces the expected JSON schema shape.",
      "C. Convert the plain text examples to YAML syntax while keeping the JSON examples intact to diversify acceptable formatting styles.",
      "D. Move the JSON schema specification from the system prompt to a user prompt prefix while leaving the mixed plain text and JSON examples unchanged."
    ],
    "options": [
      "A. Triển khai vòng lặp thử lại (retry loop) ở mã phía client để bắt các lỗi parse và gửi lại prompt cho mô hình với temperature cao hơn cho đến khi nhận được JSON.",
      "B. Chuẩn hóa tất cả các ví dụ few-shot để tuân thủ nghiêm ngặt cấu trúc JSON mục tiêu giống hệt nhau, đảm bảo mỗi ví dụ đều củng cố dạng schema JSON mong muốn.",
      "C. Chuyển đổi các ví dụ plain text sang cú pháp YAML trong khi giữ nguyên các ví dụ JSON để đa dạng hóa các kiểu định dạng được chấp nhận.",
      "D. Di chuyển định nghĩa JSON schema từ system prompt sang phần tiền tố của user prompt trong khi giữ nguyên các ví dụ hỗn hợp giữa plain text và JSON."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because client-side retry loops introduce network latency and token waste without fixing the conflicting format patterns in the prompt.",
      "Option B is correct because standardizing all few-shot demonstrations to output the exact target JSON schema eliminates competing format patterns and guarantees structural consistency.",
      "Option C is incorrect because introducing YAML adds a third competing format representation, further increasing formatting ambiguity.",
      "Option D is incorrect because relocating schema instructions does not fix the format contradictions present in the few-shot output demonstrations."
    ],
    "rationale": "Few-shot examples teach output format structure through pattern repetition. Mixing plain text and JSON in demonstration outputs creates competing formatting patterns, causing the model to alternate formats unpredictably. Enforcing uniform JSON output formatting across all examples guarantees output schema adherence.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A (Sai): Việc triển khai vòng lặp retry ở client chỉ là giải pháp tạm thời gây tốn chi phí token và tăng độ trễ hệ thống mà không khắc phục được nguyên nhân gốc rễ là prompt bị xung đột định dạng.\\n- Lựa chọn B (Đúng): Các ví dụ few-shot đóng vai trò dạy định dạng đầu ra cho mô hình thông qua sự lặp lại của mẫu. Việc trộn lẫn plain text và JSON khiến mô hình học các mẫu định dạng cạnh tranh nhau. Chuẩn hóa 100% các ví dụ theo đúng cấu trúc JSON mục tiêu đảm bảo mô hình luôn tạo ra đầu ra đúng schema.\\n- Lựa chọn C (Sai): Thêm cú pháp YAML sẽ tạo ra kiểu định dạng thứ 3 gây nhiễu thêm cho mô hình và tăng tỷ lệ lỗi parse.\\n- Lựa chọn D (Sai): Thay đổi vị trí đặt schema không giải quyết được xung đột về kiểu dáng trình bày được thể hiện trực tiếp trong các ví dụ few-shot.",
    "scenarioSignature": {
      "testedPrinciple": "structural output consistency in few-shot demonstrations",
      "failureMode": "unpredictable format switching between JSON and plain text",
      "rootCause": "mixed output formatting styles across few-shot prompt examples",
      "requiredFix": "standardize all few-shot examples to follow the single target JSON output schema"
    },
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]