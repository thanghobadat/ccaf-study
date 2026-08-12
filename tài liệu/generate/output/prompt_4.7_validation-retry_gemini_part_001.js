[
  {
    "id": "d4-b10-4.7-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-001",
    "scenarioSignature": {
      "testedPrinciple": "Pre-persistence output validation",
      "failureMode": "Database corruption from invalid model outputs",
      "rootCause": "Persisting LLM responses prior to schema validation",
      "requiredFix": "Validate structured payload before executing database write"
    },
    "questionEN": "An enterprise telemetry pipeline uses an LLM to extract structured events with fields 'event_severity' and 'latency_ms' from raw server logs and immediately writes the parsed JSON into a ClickHouse analytics database prior to executing Pydantic schema validation. This causes invalid payloads with negative latency values or invalid severity strings to pollute analytics dashboards. How should the engineering team restructure the ingestion pipeline to prevent database contamination?",
    "question": "[d4-b10-4.7-001] Một đường ống tiếp nhận dữ liệu giám sát hệ thống sử dụng LLM để trích xuất các sự kiện có cấu trúc với các trường event_severity và latency_ms từ nhật ký máy chủ thô và ghi trực tiếp dữ liệu JSON thu được vào cơ sở dữ liệu phân tích ClickHouse trước khi chạy kiểm tra Pydantic. Điều này dẫn đến việc các giá trị latency_ms bị âm hoặc giá trị event_severity không hợp lệ bị lưu vào cơ sở dữ liệu, gây sai lệch báo cáo phân tích. Đội ngũ kỹ thuật nên tái cấu trúc quy trình tiếp nhận này như thế nào để ngăn chặn tình trạng ô nhiễm dữ liệu phân tích?",
    "optionsEN": [
      "A. Run Pydantic schema and range validation on the model output immediately upon receipt, writing to the analytics database only after validation succeeds and staging invalid payloads in a quarantine queue for retry or review.",
      "B. Write all incoming model responses to the analytics database first with an 'is_validated=false' flag, running an asynchronous nightly batch job to scan and clean invalid entries.",
      "C. Increase the model sampling temperature and lengthen system instructions so that fewer out-of-bounds fields are generated before database insertion.",
      "D. Implement a ClickHouse database trigger that automatically coerces out-of-range numerical fields to zero whenever an insert failure occurs."
    ],
    "options": [
      "A. Chạy kiểm tra Pydantic và ràng buộc miền giá trị đối với đầu ra của mô hình ngay khi nhận được, chỉ ghi vào cơ sở dữ liệu phân tích sau khi xác thực thành công và đưa các dữ liệu không hợp lệ vào hàng đợi cách ly để thử lại hoặc xem xét.",
      "B. Ghi tất cả phản hồi từ mô hình vào cơ sở dữ liệu phân tích trước với cờ 'is_validated=false', sau đó chạy một tác vụ lô ban đêm để quét và dọn dẹp các bản ghi không hợp lệ.",
      "C. Tăng nhiệt độ lấy mẫu (temperature) của mô hình và kéo dài hướng dẫn trong prompt để mô hình ít tạo ra các trường ngoài phạm vi hơn trước khi ghi vào cơ sở dữ liệu.",
      "D. Cấu hình một trigger trong ClickHouse để tự động ép kiểu các trường số ngoài phạm vi về giá trị 0 bất cứ khi nào xảy ra lỗi chèn dữ liệu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because validating outputs before persisting guarantees that invalid payloads never enter the analytics datastore, isolating bad data into a quarantine queue for controlled retries.",
      "Option B is incorrect because writing unvalidated records directly into the analytical table pollutes real-time query results and introduces data cleanup debt despite the boolean flag.",
      "Option C is incorrect because adjusting prompt hyper-parameters does not provide programmatic schema enforcement and fails to address the flaw of unvalidated database persistence.",
      "Option D is incorrect because database triggers silently mutate bad data (e.g., changing negative latencies to zero), creating misleading telemetry metrics instead of preventing unvalidated persistence."
    ],
    "rationale": "Validating model outputs programmatically prior to database persistence isolates invalid extractions, preventing analytical storage contamination while preserving unvalidated payloads for safe retry.",
    "explanation": "Lựa chọn A là đáp án đúng vì việc thực hiện xác thực Schema và phạm vi dữ liệu trước khi ghi vào cơ sở dữ liệu đảm bảo rằng dữ liệu chưa hợp lệ không bao giờ làm ô nhiễm kho phân tích ClickHouse, đồng thời cách ly bản lỗi để xử lý lại. Lựa chọn B sai vì ghi dữ liệu lỗi vào cơ sở dữ liệu chính sẽ gây nhiễu cho các truy vấn thời gian thực và tạo nợ kỹ thuật cho việc dọn dẹp. Lựa chọn C sai vì thay đổi tham số prompt/temperature không đảm bảo 100% tuân thủ schema và không khắc phục được lỗi kiến trúc của việc lưu dữ liệu chưa xác thực. Lựa chọn D sai vì các trigger tự động ép kiểu sẽ làm biến đổi dữ liệu lỗi một cách âm thầm (ví dụ: chuyển độ trễ âm thành 0ms), tạo ra báo cáo sai lệch thay vì chặn dữ liệu từ nguồn.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  },
  {
    "id": "d4-b10-4.7-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-002",
    "questionEN": "A financial document processing service uses an LLM to parse loan application PDFs into a JSON schema containing mandatory fields 'applicant_income', 'tax_id', and 'employer_name'. When Pydantic validation fails due to a missing 'tax_id' field, the retry logic appends only a generic message: \"Your previous response was invalid.Please try again.\" The model repeatedly outputs JSON omitting 'tax_id' across retry attempts. How should the team restructure the retry prompt to resolve this recurring validation error?",
    "question": "[d4-b10-4.7-002] Một dịch vụ xử lý tài liệu tài chính sử dụng LLM để trích xuất hồ sơ vay tiền thành JSON chứa các trường bắt buộc applicant_income, tax_id, và employer_name. Khi trình xác thực Pydantic thất bại do thiếu trường tax_id trong kết quả đầu ra, logic thử lại (retry) chỉ gửi thêm thông báo chung chung: \"Kết quả trước đó không hợp lệ.Vui lòng thử lại.\" Kết quả là mô hình tiếp tục tạo ra JSON thiếu trường tax_id trong các lượt thử tiếp theo. Đội ngũ nên thay đổi cách xây dựng prompt thử lại như thế nào để khắc phục lỗi xác thực lặp lại này?",
    "optionsEN": [
      "A. Append the entire conversation prompt history and double max_tokens so the model has more space to generate all mandatory fields.",
      "B. Pass the rejected JSON output along with the exact validation error string (e.g., \"Field 'tax_id' is required but missing\") in the retry feedback prompt.",
      "C. Clear the conversation history entirely and reissue the original user prompt with a higher temperature setting to encourage structural variation.",
      "D. Fall back immediately to a regex extractor without providing feedback to the LLM whenever any validation error occurs."
    ],
    "options": [
      "A. Nối toàn bộ lịch sử prompt và tăng gấp đôi tham số max_tokens để mô hình có nhiều không gian hơn tạo đầy đủ các trường.",
      "B. Gửi lại chuỗi JSON bị từ chối cùng với thông báo lỗi xác thực cụ thể (ví dụ: \"Trường 'tax_id' là bắt buộc nhưng bị thiếu\") trong prompt phản hồi thử lại.",
      "C. Xóa hoàn toàn lịch sử trò chuyện và gửi lại prompt ban đầu với giá trị temperature cao hơn nhằm khuyến khích sự biến đổi cấu trúc.",
      "D. Chuyển sang trích xuất bằng biểu thức chính quy (regex) ngay khi xảy ra lỗi xác thực mà không cần gửi phản hồi cho LLM."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because increasing token limits or duplicating history without exact error context does not signal which schema field was omitted.",
      "Option B is correct because injecting the rejected payload and exact validator error message provides the model with actionable feedback needed to repair the missing 'tax_id' field.",
      "Option C is incorrect because clearing context and boosting temperature increases output randomness without telling the model what specific field needs to be generated.",
      "Option D is incorrect because abandoning retry attempts immediately skips schema-guided self-correction, breaking the validation-retry architectural pattern."
    ],
    "rationale": "Effective LLM retries require supplying the rejected output alongside the exact validator error message so the model can pinpoint and correct specific schema violations.",
    "explanation": "Lựa chọn B là đáp án đúng vì để mô hình sửa lỗi cấu trúc hiệu quả trong cơ chế retry, prompt phản hồi phải cung cấp cả chuỗi đầu ra bị từ chối và thông báo lỗi cụ thể từ validator (ví dụ: thiếu tax_id), giúp LLM xác định chính xác phần cần bổ sung. Lựa chọn A sai vì tăng max_tokens hoặc nối thêm lịch sử không cung cấp ngữ cảnh về trường bị thiếu, dẫn đến việc mô hình lặp lại lỗi cũ. Lựa chọn C sai vì xóa lịch sử và tăng temperature làm tăng tính ngẫu nhiên chứ không cung cấp phản hồi sửa lỗi có định hướng. Lựa chọn D sai vì việc từ bỏ LLM ngay ở lỗi đầu tiên sẽ bỏ qua mẫu thiết kế validation-retry và khả năng tự sửa lỗi của mô hình.",
    "scenarioSignature": {
      "testedPrinciple": "Schema validation error feedback retry",
      "failureMode": "Recurring schema validation failure on model retry",
      "rootCause": "Generic error prompt missing rejected payload and specific validation error",
      "requiredFix": "Include rejected output and specific validator error message in retry feedback"
    },
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  }
]