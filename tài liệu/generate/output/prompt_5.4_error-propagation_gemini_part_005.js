[
  {
    "id": "d5-b10-5.4-009",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-009",
    "questionEN": "A batch processing system, \"DocExtract- Pipeline\", processes a request containing 10 PDF documents. During execution, 7 documents successfully parse into structured JSON, but 3 documents fail due to malformed font encodings, producing \"ParsingException\". The current system throws a top-level error and aborts the entire job, discarding the 7 successful extractions. Which error handling strategy properly balances reliability and partial data availability?",
    "question": "[d5-b10-5.4-009] Hệ thống xử lý hàng loạt \"DocExtract - Pipeline\" xử lý một yêu cầu gồm 10 tài liệu PDF. Trong quá trình thực thi, 7 tài liệu được trích xuất thành công thành JSON cấu trúc, nhưng 3 tài liệu thất bại do lỗi mã hóa phông chữ, phát ra \"ParsingException\". Hệ thống hiện tại ném lỗi cấp cao nhất và hủy bỏ toàn bộ tác vụ, loại bỏ 7 kết quả trích xuất thành công. Chiến lược xử lý lỗi nào cân bằng đúng giữa độ tin cậy và khả năng cung cấp dữ liệu một phần?",
    "optionsEN": [
      "A. Return a \"207 Multi - Status\" payload containing the 7 successful document extractions along with an \"errors\" array specifying the failed document IDs, error types, and input contexts.",
      "B. Throw an unhandled \"BatchProcessingException\" immediately upon the first document error to ensure transaction atomicity and force upstream retry.",
      "C. Replace the 3 failed document outputs with empty JSON objects \"{}\" and return a \"200 OK\" status without adding error metadata.",
      "D. Automatically re-queue the entire 10-document batch in an infinite exponential backoff loop until all 10 documents succeed."
    ],
    "options": [
      "A. Trả về payload \"207 Multi - Status\" chứa 7 kết quả trích xuất tài liệu thành công cùng với mảng \"errors\" chỉ định rõ ID tài liệu thất bại, loại lỗi và ngữ cảnh đầu vào.",
      "B. Ném ngoại lệ \"BatchProcessingException\" ngay khi gặp lỗi tài liệu đầu tiên để đảm bảo tính nguyên tố của giao dịch và bắt buộc phía gọi thử lại.",
      "C. Thay thế 3 đầu ra tài liệu thất bại bằng các đối tượng JSON rỗng \"{}\" và trả về trạng thái \"200 OK\" mà không thêm siêu dữ liệu lỗi.",
      "D. Tự động đưa toàn bộ lô 10 tài liệu vào lại hàng đợi xử lý trong vòng lặp lùi mũ vô hạn cho đến khi cả 10 tài liệu cùng thành công."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because delivering partial results alongside explicit per-item failure metadata prevents total data loss for valid work while giving downstream systems complete diagnostic visibility.",
      "Option B is incorrect because a hard abort discards 7 valid extractions, wasting compute resources and delaying data availability unnecessarily.",
      "Option C is incorrect because masking failures behind empty objects and a 200 OK creates a silent failure where downstream systems operate confidently on corrupted/missing data.",
      "Option D is incorrect because re-queueing permanent parsing failures for malformed documents causes infinite retry loops without resolving the underlying encoding issue."
    ],
    "rationale": "In multi-item batch processing operations where items are independent, a partial results policy with structured error reporting (e.g., HTTP 207 Multi-Status) ensures valid work is retained and exposed immediately, while failed items are isolated and explicitly reported with contextual error metadata.",
    "explanation": "Trong xử lý lô đa tài liệu độc lập, chiến lược kết quả một phần (partial results policy) cho phép trả về các phần tử trích xuất thành công kèm theo siêu dữ liệu lỗi chi tiết đối với các phần tử thất bại. Lựa chọn A sử dụng phản hồi dạng \"207 Multi - Status\" giúp phía tiêu thụ dữ liệu nhận được 7 kết quả hợp lệ ngay lập tức và biết rõ lý do 3 tài liệu thất bại. Lựa chọn B hủy bỏ toàn bộ khiến 7 kết quả thành công bị lãng phí. Lựa chọn C giấu lỗi (silent failure) gây rủi ro cho hệ thống downstream. Lựa chọn D thử lại vô hạn gây lãng phí tài nguyên do lỗi mã hóa phông chữ là lỗi cố định.",
    "scenarioSignature": {
      "testedPrinciple": "partial result aggregation and delivery",
      "failureMode": "all-or-nothing pipeline failure discarding valid extracted data",
      "rootCause": "hard failure abort on partial batch errors without status metadata",
      "requiredFix": "return partial success payload with aggregated results and per-item error logs"
    },
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  },
  {
    "id": "d5-b10-5.4-010",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-010",
    "questionEN": "An autonomous agent coordinator calls \"VendorAPI\" at endpoint \"/v1/analyze\" using expired credentials. The remote service returns \"HTTP 401 Unauthorized\". The coordinator's generic retry middleware executes 5 retries with exponential backoff (1s, 2s, 4s, 8s, 16s), resulting in 5 wasted network requests and 31 seconds of latency before escalating the error. What is the correct architectural fix to resolve this retry waste?",
    "question": "[d5-b10-5.4-010] Một coordinator agent tự động gọi \"VendorAPI\" tại endpoint \"/v1/analyze\" sử dụng thông tin xác thực đã hết hạn. Dịch vụ từ xa trả về \"HTTP 401 Unauthorized\". Middleware thử lại chung của coordinator thực hiện 5 lần thử lại với cơ chế lùi mũ (1s, 2s, 4s, 8s, 16s), dẫn đến 5 yêu cầu mạng bị lãng phí và độ trễ 31 giây trước khi leo thang lỗi. Giải pháp kiến trúc đúng để khắc phục việc lãng phí thử lại này là gì?",
    "optionsEN": [
      "A. Increase the exponential backoff initial delay to 5 seconds and maximum retries to 10 to give the auth server time to sync.",
      "B. Classify \"HTTP 401 Unauthorized\" as a \"PERMANENT\" non-retryable error type in the retry policy to trigger immediate escalation and credential refresh.",
      "C. Intercept \"401 Unauthorized\" errors in middleware and swallow them by returning a default empty response \"{}\".",
      "D. Configure a circuit breaker that trips after 20 consecutive HTTP 401 failures to stop retries at the agent pool level."
    ],
    "options": [
      "A. Tăng thời gian hoãn ban đầu của lùi mũ lên 5 giây và số lần thử lại tối đa lên 10 để cấp thêm thời gian cho máy chủ xác thực đồng bộ.",
      "B. Phân loại \"HTTP 401 Unauthorized\" thành loại lỗi vĩnh viễn \"PERMANENT\" không thể thử lại trong chính sách retry để kích hoạt leo thang ngay lập tức và làm mới thông tin xác thực.",
      "C. Chặn các lỗi \"401 Unauthorized\" trong middleware và nuốt lỗi bằng cách trả về phản hồi rỗng mặc định \"{}\".",
      "D. Cấu hình circuit breaker ngắt mạch sau 20 lỗi HTTP 401 liên tiếp để dừng thử lại ở cấp độ nhóm agent."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because increasing retry delays and attempts further increases latency and API resource waste for invalid credentials that will never succeed without re-authentication.",
      "Option B is correct because classifying authentication failures as PERMANENT prevents unnecessary network retries, allowing the system to immediately trigger credential refresh or human escalation.",
      "Option C is incorrect because swallowing the auth error returns invalid empty data (silent failure), causing downstream subagents to make decisions based on missing context.",
      "Option D is incorrect because circuit breakers protect against downstream service outages, not per-request authentication failures; waiting for 20 failures still causes massive wasted API retries."
    ],
    "rationale": "Authentication errors (401 Unauthorized, 403 Forbidden) are non-transient, permanent errors. Retrying them with exponential backoff wastes API quota and introduces severe latency without changing the outcome. They must be classified as non-retryable PERMANENT errors to fail fast and escalate immediately.",
    "explanation": "Lỗi xác thực (HTTP 401 / 403) là lỗi vĩnh viễn (PERMANENT) do thông tin xác thực không hợp lệ hoặc đã hết hạn, không thể tự phục hồi nếu chỉ đơn thuần gửi lại cùng một yêu cầu. Việc áp dụng retry với lùi mũ (exponential backoff) chỉ làm tăng độ trễ và lãng phí băng thông/API calls. Lựa chọn B phân loại lỗi 401 thành lỗi PERMANENT để dùng cơ chế fail-fast và kích hoạt làm mới token/leo thang ngay lập tức. Lựa chọn A làm trầm trọng thêm độ trễ. Lựa chọn C gây lỗi ngầm (silent failure). Lựa chọn D dùng sai công dụng của Circuit Breaker.",
    "scenarioSignature": {
      "testedPrinciple": "authentication error classification and immediate escalation",
      "failureMode": "wasted API calls and delayed error escalation from retrying authorization failures",
      "rootCause": "treating non-retryable auth errors as transient network failures",
      "requiredFix": "classify authentication errors as permanent failures to halt retries immediately"
    },
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  }
]