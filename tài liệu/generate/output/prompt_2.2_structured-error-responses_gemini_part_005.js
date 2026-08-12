[
  {
    "id": "d2-b04-2.2-009",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-009",
    "questionEN": "An automated loan onboarding pipeline uses an LLM agent to execute a multi-step workflow. In Step 1, validate_user_identity succeeds. In Step 2, fetch_credit_score(user_id: string) fails due to an upstream database timeout, but the tool catches the exception and returns {\"score\": 0, \"status\": \"ok\"}. In Step 3, the agent calls evaluate_credit_risk(score: 0), which interprets the score of 0 as an extreme default risk and automatically rejects the loan application in risk_assessment_table. How should fetch_credit_score be redesigned to prevent Step 3 from proceeding under false assumptions?",
    "question": "[d2-b04-2.2-009] Một đường ống tự động hóa quy trình mở tài khoản sử dụng LLM agent để thực hiện quy trình nhiều bước. Ở Bước 1, validate_user_identity thành công. Ở Bước 2, fetch_credit_score(user_id: string) bị lỗi do truy vấn database hết thời gian chờ (timeout), nhưng tool lại bắt ngoại lệ và trả về {\"score\": 0, \"status\": \"ok\"}. Ở Bước 3, agent gọi evaluate_credit_risk(score: 0) dẫn đến hệ thống hiểu lầm mức điểm 0 là rủi ro vỡ nợ cực cao và tự động từ chối hồ sơ vay trong risk_assessment_table. Tool fetch_credit_score nên được thiết kế lại như thế nào để ngăn Bước 3 chạy dựa trên giả định sai lầm?",
    "optionsEN": [
      "A. Modify fetch_credit_score to return a structured error payload {\"error\": \"DATABASE_TIMEOUT\", \"retryable\": true, \"message\": \"Upstream credit DB connection timed out\"} so the pipeline halts or retries Step 2 instead of passing a sentinel score to Step 3.",
      "B. Update evaluate_credit_risk to check if score equals 0 and prompt the user to manually verify whether the score is genuinely zero or caused by an upstream system failure.",
      "C. Increase the execution timeout of fetch_credit_score to 60 seconds and add a secondary fallback database connection inside the tool backend logic.",
      "D. Modify the system prompt of the Step 3 agent to assume any credit score of 0 is a tool error and automatically skip the risk evaluation step."
    ],
    "options": [
      "A. Sửa fetch_credit_score để trả về phản hồi lỗi cấu trúc {\"error\": \"DATABASE_TIMEOUT\", \"retryable\": true, \"message\": \"Upstream credit DB connection timed out\"} giúp pipeline dừng hoặc thử lại Bước 2 thay vì truyền giá trị sentinel cho Bước 3.",
      "B. Cập nhật evaluate_credit_risk để kiểm tra nếu score bằng 0 thì yêu cầu người dùng xác nhận thủ công xem điểm đó là thật hay do lỗi hệ thống phía trên.",
      "C. Tăng timeout xử lý của fetch_credit_score lên 60 giây và bổ sung kết nối database dự phòng bên trong logic backend của tool.",
      "D. Sửa system prompt của agent ở Bước 3 để mặc định xem bất kỳ điểm credit nào bằng 0 là lỗi và tự động bỏ qua bước đánh giá rủi ro."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because returning an explicit, structured error payload ({\"error\": \"DATABASE_TIMEOUT\", \"retryable\": true}) prevents Step 2 from producing an ambiguous sentinel return value ({\"score\": 0}), ensuring Step 3 is never executed with invalid assumptions.",
      "Option B is incorrect because attempting to detect upstream errors in Step 3 by inspecting valid domain values (0 credit score) creates ambiguity, as a real credit score could legitimately be zero or near zero.",
      "Option C is incorrect because increasing timeouts or adding internal fallbacks does not address the fundamental issue of masking database exceptions with successful response structures (\"status\": \"ok\").",
      "Option D is incorrect because modifying prompt heuristics to guess system states from ambiguous data leads to brittle pipeline logic and does not replace proper tool error reporting."
    ],
    "rationale": "Returning structured error responses with clear error codes and retry flags allows the agent orchestrator to detect step failures immediately, avoiding cascade failures where downstream steps process invalid sentinel outputs as valid domain data.",
    "explanation": "Trong quy trình nhiều bước, việc trả về phản hồi thành công kèm giá trị mặc định (sentinel value như score=0) khi gặp lỗi backend là anti-pattern nguy hiểm. Phương án A đúng vì ném phản hồi lỗi có cấu trúc (DATABASE_TIMEOUT, retryable: true) giúp agent nhận biết Bước 2 thất bại, dừng quy trình hoặc thực hiện retry thay vì chuyển dữ liệu sai sang Bước 3. Phương án B sai vì điểm 0 có thể là giá trị hợp lệ, không thể dựa vào đó để đoán lỗi. Phương án C sai vì chỉ giải quyết phần ngọn mà không sửa cơ chế báo lỗi. Phương án D sai vì sửa prompt để đoán lỗi từ dữ liệu mơ hồ sẽ làm hệ thống thiếu tin cậy.",
    "scenarioSignature": {
      "testedPrinciple": "explicit structured error propagation in multi-step tool pipelines",
      "failureMode": "downstream step executes incorrect business logic based on ambiguous sentinel response",
      "rootCause": "tool masks upstream backend timeout by returning success payload with zero default value",
      "requiredFix": "return structured error object with failure code and retryable flag to halt pipeline execution"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  },
  {
    "id": "d2-b04-2.2-010",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-010",
    "questionEN": "An enterprise MCP server hosts several internal microservice integration tools. When a downstream service dependency fails, the server logs raw text strings such as \"ERROR 2026-08 - 12 04: 12:01 Connection failed: task failed unexpectedly at line 42\". The telemetry platform (Datadog dashboard) monitors system reliability metrics but fails to aggregate or categorize error rates by specific error types or tool names because the logs lack machine-readable structure. How should the MCP server's error logging mechanism be restructured to support automated telemetry and dashboard filtering?",
    "question": "[d2-b04-2.2-010] Một máy chủ MCP đóng vai trò gateway tích hợp các microservice doanh nghiệp. Khi xảy ra sự cố kết nối microservice, máy chủ ghi log chuỗi văn bản thô và stack trace như \"ERROR 2026-08 - 12 04: 12:01 Connection failed: task failed unexpectedly at line 42\". Hệ thống giám sát (bảng điều khiển Datadog) theo dõi chỉ số độ tin cậy nhưng không thể phân loại tỷ lệ lỗi theo từng loại lỗi hoặc theo tên tool cụ thể vì log thiếu cấu trúc đọc được bằng máy. Cơ chế ghi log lỗi của máy chủ MCP nên được tái cấu trúc như thế nào để hỗ trợ giám sát và lọc dashboard tự động?",
    "optionsEN": [
      "A. Configure Datadog regex ingestion rules to parse free-form text stack traces into custom log facets.",
      "B. Format all MCP tool error responses and internal logs as structured JSON objects containing standard fields such as error_code, tool_name, retryable, and duration_ms.",
      "C. Add a post-processing LLM agent script that reads raw log files and periodically generates summary reports of system errors.",
      "D. Wrap each tool execution in a generic try/catch block that suppresses stack traces and returns a uniform HTTP 500 status code to the monitoring platform."
    ],
    "options": [
      "A. Cấu hình quy tắc regex trong pipeline của Datadog để trích xuất các chuỗi stack trace tự do thành các trường log tuỳ chỉnh.",
      "B. Định dạng tất cả phản hồi lỗi và log nội bộ của MCP tool thành đối tượng JSON có cấu trúc chứa các trường chuẩn như error_code, tool_name, retryable và duration_ms.",
      "C. Bổ sung script LLM agent hậu xử lý để đọc file log thô của máy chủ và định kỳ tạo báo cáo tổng hợp lỗi hệ thống.",
      "D. Bọc mỗi lượt thực thi tool trong khối try/catch chung để ẩn toàn bộ stack trace và chỉ trả về mã lỗi HTTP 500 đồng nhất cho hệ thống giám sát."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because relying on fragile regex log parsing for free-form text strings is brittle and breaks whenever log message formats or stack traces change.",
      "Option B is correct because returning and logging standardized JSON objects with explicit fields (error_code, tool_name, retryable, duration_ms) allows monitoring dashboards to easily ingest, parse, group, and alert on system errors without complex parsing rules.",
      "Option C is incorrect because running an asynchronous LLM agent to parse raw unstructured log files introduces latency, cost, and non-deterministic summary outputs for real-time observability metrics.",
      "Option D is incorrect because suppressing stack traces and returning a uniform HTTP 500 error code completely hides error root causes and prevents granular metrics collection."
    ],
    "rationale": "Standardized structured JSON error responses enable observability platforms to index error attributes directly, allowing automated metric aggregation, alerting, and failure analysis without relying on brittle log scrapers.",
    "explanation": "Để phục vụ giám sát (observability) và tạo dashboard đo lường hệ thống, log và error response của MCP tool cần được cấu trúc hóa dưới dạng JSON chuẩn. Phương án B đúng vì việc định dạng log chứa các trường chuẩn (error_code, tool_name, retryable, duration_ms) cho phép Datadog tự động phân loại, nhóm chỉ số và phát cảnh báo lỗi chính xác. Phương án A sai vì parser regex rất dễ gãy khi định dạng stack trace thay đổi. Phương án C sai vì dùng LLM agent đọc log thô tốn chi phí, độ trễ cao và không đảm bảo tính xác định cho telemetry thời gian thực. Phương án D sai vì ẩn chi tiết lỗi và chỉ trả HTTP 500 khiến dashboard mất đi khả năng phân tích nguyên nhân gốc rễ.",
    "scenarioSignature": {
      "testedPrinciple": "structured error payload design for observability and log telemetry",
      "failureMode": "telemetry dashboard fails to parse and aggregate tool error metrics across microservices",
      "rootCause": "tool error logging emits unstructured free-form text strings and stack traces",
      "requiredFix": "emit structured JSON log events with explicit error codes tool metadata and severity fields"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  }
]