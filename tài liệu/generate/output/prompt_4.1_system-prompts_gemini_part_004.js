[
  {
    "id": "d4-b08-4.1-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-007",
    "scenarioSignature": {
      "testedPrinciple": "domain-specific criteria injection",
      "failureMode": "failure to detect domain regulatory violations in data pipeline",
      "rootCause": "lack of explicit compliance evaluation criteria in system prompt",
      "requiredFix": "inject explicit regulatory criteria and rules into system prompt"
    },
    "questionEN": "The HealthSync Ingestion Pipeline uses Claude to inspect incoming electronic health record (EHR) JSON objects via the patient_record_payload field. The system prompt instructs the model to 'Scan EHR payloads for regulatory non-compliance,' but lacks detailed domain rules. During a compliance audit, the pipeline produces a 0% detection rate for unencrypted protected health information (PHI) stored in free-text fields (notes_text), leading to audit failures under HIPAA Safe Harbor standards. Which system prompt update resolves this compliance failure?",
    "question": "[d4-b08-4.1-007] HealthSync Ingestion Pipeline sử dụng Claude để kiểm tra các đối tượng JSON hồ sơ sức khỏe điện tử (EHR) đến thông qua trường patient_record_payload. System prompt hướng dẫn mô hình 'Quét các payload EHR để tìm sự không tuân thủ quy định', nhưng thiếu các quy tắc miền chi tiết. Trong một đợt kiểm toán tuân thủ, pipeline đạt tỷ lệ phát hiện 0% đối với thông tin sức khỏe được bảo vệ (PHI) không được mã hóa nằm trong các trường văn bản tự do (notes_text), dẫn đến thất bại kiểm toán theo tiêu chuẩn HIPAA Safe Harbor. Cập nhật system prompt nào sau đây giải quyết thất bại tuân thủ này?",
    "optionsEN": [
      "A. Append a directive to the per-request user prompt: 'Please act as a HIPAA auditor and carefully analyze all JSON string fields.'",
      "B. Retain the general system prompt and add a post-processing regex filter on the API response to search for 9-digit patterns matching SSNs.",
      "C. Inject explicit HIPAA Safe Harbor compliance criteria into the system prompt, defining mandatory identification and flagging rules for 18 designated PHI categories (such as SSNs and medical record numbers) inside notes_text.",
      "D. Increase the API request parameters from temperature: 0.0 to temperature: 0.7 to encourage creative identification of implicit compliance violations."
    ],
    "options": [
      "A. Thêm một chỉ thị vào user prompt theo từng yêu cầu: 'Hãy đóng vai trò là kiểm toán viên HIPAA và phân tích kỹ tất cả các trường chuỗi JSON.'",
      "B. Giữ nguyên system prompt chung và thêm bộ lọc regex xử lý sau trên phản hồi API để tìm kiếm các mẫu 9 chữ số khớp với SSN.",
      "C. Tiêm (inject) các tiêu chí tuân thủ HIPAA Safe Harbor rõ ràng vào system prompt, định nghĩa các quy tắc bắt buộc để nhận diện và gắn cờ 18 danh mục PHI chỉ định (như SSN và số hồ sơ y tế) bên trong notes_text.",
      "D. Tăng tham số yêu cầu API từ temperature: 0.0 lên temperature: 0.7 để khuyến khích việc nhận diện sáng tạo các vi phạm tuân thủ ẩn."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Modifying the per-request user prompt fails to enforce persistent baseline evaluation criteria across all requests, leaving the system prompt vague and unstructured.",
      "Option B is incorrect: Adding post-processing regex only catches fixed pattern formats like SSNs and misses other unstructured PHI elements such as names, dates, or medical record numbers in free text.",
      "Option C is correct: Injecting explicit domain-specific HIPAA Safe Harbor criteria directly into the system prompt provides the model with mandatory evaluation rules for identifying all 18 PHI categories within unstructured fields.",
      "Option D is incorrect: Increasing the temperature parameter introduces randomness and hallucination risk without providing the necessary domain criteria to detect compliance violations."
    ],
    "rationale": "System prompts must define explicit domain-specific evaluation criteria rather than generic directives. By injecting explicit HIPAA Safe Harbor criteria specifying all 18 PHI categories into the system prompt, the model receives precise rules to consistently detect unencrypted PHI in unstructured fields like notes_text.",
    "explanation": "Trong Prompt Engineering, system prompt đóng vai trò thiết lập phạm vi, quy tắc và các tiêu chí đánh giá cụ thể (explicit criteria) cho toàn bộ phiên tương tác.\n- Option A không hiệu quả vì việc đưa chỉ thị chung vào user prompt từng yêu cầu không thay thế được việc thiết lập tiêu chí đánh giá chuẩn xác ở cấp độ system prompt.\n- Option B không đủ vì regex xử lý sau chỉ phát hiện được các định dạng cố định (như SSN) và sẽ bỏ sót các dạng dữ liệu PHI phi cấu trúc khác như tên bệnh nhân, ngày sinh hay chẩn đoán y tế.\n- Option C đúng vì việc đưa các tiêu chí tuân thủ HIPAA Safe Harbor rõ ràng (định nghĩa cụ thể 18 loại PHI) vào system prompt giúp mô hình có quy tắc đánh giá nhất quán để quét và gắn cờ chính xác các trường dữ liệu phi cấu trúc như notes_text.\n- Option D sai vì tăng temperature chỉ làm gia tăng tính ngẫu nhiên và nguy cơ ảo giác (hallucination), không giúp mô hình hiểu được tiêu chí tuân thủ cần kiểm tra.",
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  },
  {
    "id": "d4-b08-4.1-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-008",
    "scenarioSignature": {
      "testedPrinciple": "prompt threshold calibration",
      "failureMode": "excessive low quality findings saturating downstream queue",
      "rootCause": "overly permissive confidence threshold in system instructions",
      "requiredFix": "raise confidence threshold and require strict supporting evidence criteria"
    },
    "questionEN": "An automated financial audit service, FinAudit Engine, parses raw transaction logs (tx_payload) using Claude to detect anomalies. The system prompt configures structured output extraction with a low threshold instruction: 'Report any anomaly if confidence_score >= 0.5.' Due to this loose calibration, 85% of output findings are low-quality speculative formatting warnings, which saturates downstream buffer limits in ReconciliationQueue and increases API processing latency by 3x. Which system prompt adjustment correctly calibrates the threshold to eliminate low-quality noise?",
    "question": "[d4-b08-4.1-008] Tự động hóa dịch vụ kiểm toán tài chính FinAudit Engine phân tích các nhật ký giao dịch thô (tx_payload) bằng Claude để phát hiện bất thường. System prompt cấu hình trích xuất đầu ra có cấu trúc với hướng dẫn ngưỡng thấp: 'Báo cáo bất kỳ bất thường nào nếu confidence_score >= 0.5.' Do hiệu chuẩn lỏng lẻo này, 85% kết quả đầu ra là các cảnh báo định dạng mang tính suy đoán chất lượng thấp, làm quá tải giới hạn bộ đệm hạ nguồn trong ReconciliationQueue và tăng độ trễ xử lý API lên 3 lần. Điều chỉnh system prompt nào sau đây hiệu chuẩn chính xác ngưỡng để loại bỏ nhiễu chất lượng thấp?",
    "optionsEN": [
      "A. Remove the confidence_score property from the JSON output schema and instruct the model to summarize all transaction logs in prose.",
      "B. Lower the system prompt threshold requirement to confidence_score >= 0.3 to capture a wider range of edge-case transaction events.",
      "C. Provide a few-shot user prompt example demonstrating a transaction anomaly extracted at a confidence_score of 0.5.",
      "D. Calibrate the system prompt criteria by raising the threshold to confidence_score >= 0.8 and requiring explicit supporting evidence (such as schema violation or monetary mismatch) before flagging."
    ],
    "options": [
      "A. Xóa thuộc tính confidence_score khỏi JSON output schema và hướng dẫn mô hình tóm tắt tất cả nhật ký giao dịch bằng văn bản tự do.",
      "B. Hạ yêu cầu ngưỡng trong system prompt xuống confidence_score >= 0.3 để bắt được nhiều sự kiện giao dịch biên hơn.",
      "C. Cung cấp một ví dụ few-shot trong user prompt minh họa một bất thường giao dịch được trích xuất ở mức confidence_score là 0.5.",
      "D. Hiệu chuẩn tiêu chí trong system prompt bằng cách nâng ngưỡng lên confidence_score >= 0.8 và yêu cầu bằng chứng hỗ trợ rõ ràng (như vi phạm schema hoặc lệch số tiền) trước khi gắn cờ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Removing structured confidence scores and switching to prose summaries breaks automated downstream ingestion in ReconciliationQueue without solving false positives.",
      "Option B is incorrect: Lowering the confidence threshold to 0.3 worsens the problem by allowing even more low-quality speculative noise into the queue.",
      "Option C is incorrect: Adding a few-shot example for confidence 0.5 reinforces the low-quality extraction pattern rather than calibrating strict criteria.",
      "Option D is correct: Raising the confidence threshold to 0.8 and requiring concrete evidence criteria in the system prompt filters out speculative low-quality findings while preserving high-precision actionable anomalies."
    ],
    "rationale": "Threshold calibration in system prompts requires balancing precision and noise. Raising the numerical confidence threshold (e.g., to >= 0.8) combined with strict evidence criteria ensures that only high-confidence, actionable findings pass into downstream queues like ReconciliationQueue, eliminating low-quality false positive noise.",
    "explanation": "Trong kỹ thuật thiết kế system prompt, việc hiệu chuẩn ngưỡng (threshold calibration) đóng vai trò quyết định để kiểm soát độ chính xác của đầu ra.\n- Option A sai vì việc xóa confidence_score và chuyển sang tóm tắt văn bản tự do làm hỏng khả năng xử lý tự động của ReconciliationQueue mà không giải quyết được vấn đề nhiễu dữ liệu.\n- Option B sai vì hạ ngưỡng xuống 0.3 sẽ làm trầm trọng thêm tình trạng quá tải bộ đệm bằng cách cho phép nhiều phát hiện suy đoán chất lượng thấp hơn nữa tràn vào hệ thống.\n- Option C sai vì việc cung cấp ví dụ few-shot với ngưỡng 0.5 sẽ củng cố hành vi trích xuất lỏng lẻo hiện tại thay vì khắc phục nó.\n- Option D đúng vì việc nâng ngưỡng tin cậy lên confidence_score >= 0.8 kết hợp với yêu cầu bằng chứng cụ thể (như vi phạm schema hoặc lệch số tiền) trong system prompt sẽ lọc bỏ các phát hiện nhiễu chất lượng thấp, chỉ giữ lại các bất thường có độ chính xác cao.",
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  }
]