[
  {
    "id": "d5-b10-5.4-007",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-007",
    "scenarioSignature": {
      "testedPrinciple": "resource isolation and retry circuit breaking",
      "failureMode": "unrelated service failure during connection pool starvation",
      "rootCause": "unbounded retries on shared infrastructure connection pool",
      "requiredFix": "isolate service connection pools and enforce retry circuit breakers"
    },
    "questionEN": "A payment agent service (payment-worker) experiences upstream latency when calling POST /v1/charges. To recover, the agent executes aggressive retries without a circuit breaker or jittered backoff. Because payment-worker and auth-service share a PostgreSQL connection pool (max pool size 100), the influx of retries exhausts all connections (DBPoolExhaustedException), triggering HTTP 500 spikes and auth token validation failures across all active sessions. Which architectural change prevents this cascading failure?",
    "question": "[d5-b10-5.4-007] Một dịch vụ agent xử lý thanh toán (payment-worker) gặp sự cố trễ tạm thời từ API upstream POST /v1/charges. Agent liên tục gửi các yêu cầu thử lại (retry) dồn dập mà không có cơ chế ngắt mạch (circuit breaker) hay lùi thời gian (backoff). Do payment-worker và auth-service dùng chung một PostgreSQL connection pool (kích thước tối đa 100 kết nối), đợt retry dồn dập làm cạn kiệt toàn bộ kết nối (DBPoolExhaustedException), dẫn đến lỗi HTTP 500 hàng loạt và khiến auth-service không thể xác thực token cho các phiên làm việc của agent. Thay đổi kiến trúc nào sẽ ngăn chặn sự cố sụp đổ dây chuyền (cascading failure) này?",
    "optionsEN": [
      "A. Configure payment-worker to increase retry frequency to resolve transient latency faster.",
      "B. Expand the shared PostgreSQL connection pool limit to absorb the increased retry traffic.",
      "C. Implement a circuit breaker on payment-worker calls and establish separate connection pools for payment-worker and auth-service.",
      "D. Configure auth-service to bypass database validation checks when connection acquisition times out during payment retries."
    ],
    "options": [
      "A. Cấu hình payment-worker tăng tần suất thử lại để nhanh chóng xử lý xong các lỗi trễ từ API thanh toán.",
      "B. Nâng giới hạn kết nối của PostgreSQL connection pool dùng chung để đáp ứng lượng yêu cầu thử lại gia tăng.",
      "C. Triển khai circuit breaker cho các lời gọi payment-worker và tách riêng connection pool cho từng dịch vụ payment-worker và auth-service.",
      "D. Cấu hình auth-service bỏ qua bước kiểm tra cơ sở dữ liệu khi không lấy được kết nối trong thời gian retry thanh toán."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A incorrect: Increasing retry frequency worsens connection pool contention, accelerating the outage of auth-service.",
      "Option B incorrect: Expanding the shared pool size only postpones exhaustion and risks crashing the underlying database instance under heavy load without isolating auth-service.",
      "Option C correct: Isolating connection pools guarantees auth-service retains database access during payment outages, while the circuit breaker stops payment-worker from generating excessive retries.",
      "Option D incorrect: Skipping database authentication checks introduces a severe security flaw by bypassing user authorization during database pressure."
    ],
    "rationale": "Isolating database connection pools prevents payment retry storms from starving the authentication service of database connections, while a circuit breaker halts repeated failing requests to upstream payment APIs.",
    "explanation": "Phân tích các phương án:\n- Phương án A sai vì tăng tần suất thử lại càng đẩy nhanh việc chiếm dụng connection pool, khiến auth-service bị sụp đổ nhanh hơn.\n- Phương án B sai vì việc mở rộng pool dùng chung chỉ trì hoãn thời điểm cạn kiệt và có thể làm sụp đổ toàn bộ cở sở dữ liệu khi bị tải quá mức mà không giải quyết được gốc rễ việc thiếu cô lập tài nguyên.\n- Phương án C đúng vì tách riêng connection pool giúp đảm bảo auth-service luôn có tài nguyên kết nối độc lập, kết hợp với circuit breaker để dừng ngay các yêu cầu retry vô ích khi dịch vụ thanh toán gặp sự cố.\n- Phương án D sai vì bỏ qua xác thực dữ liệu khi gặp lỗi kết nối sẽ tạo ra lỗ hổng bảo mật nghiêm trọng trong hệ thống.",
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  },
  {
    "id": "d5-b10-5.4-008",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-008",
    "scenarioSignature": {
      "testedPrinciple": "accurate network timeout error classification for retry eligibility",
      "failureMode": "valid operation permanent failure on client execution timeout",
      "rootCause": "misclassifying transient client timeouts as permanent nonretryable errors",
      "requiredFix": "categorize client timeouts as retryable transient errors with backoff"
    },
    "questionEN": "An AI data indexing agent executes long-running batch extraction jobs via POST /v2/analytics/aggregate. The client HTTP timeout is configured at 29 seconds (request_timeout_ms: 29000). When a complex aggregation query takes 31 seconds on the server, the client throws ClientTimeoutException. The agent error handler misclassifies ClientTimeoutException as a non-retryable PERMANENT_FAILURE, causing the agent to drop the task entirely even though retrying with backoff would succeed. How should the error propagation mechanism be corrected?",
    "question": "[d5-b10-5.4-008] Một agent phân tích dữ liệu thực hiện lệnh tổng hợp hàng loạt qua POST /v2/analytics/aggregate. Thời gian chờ phía client được thiết lập ở mức 29 giây (request_timeout_ms: 29000). Khi một truy vấn phức tạp mất 31 giây để xử lý trên backend, client HTTP ném ra ClientTimeoutException. Trình xử lý lỗi của agent phân loại nhầm ClientTimeoutException thành lỗi vĩnh viễn không thể retry (PERMANENT_FAILURE), khiến agent hủy luôn tác vụ thay vì thử lại. Kết quả là các thao tác hợp lệ mất hơn 29 giây bị hủy bỏ hoàn toàn. Cơ chế lan truyền lỗi cần được khắc phục như thế nào?",
    "optionsEN": [
      "A. Map ClientTimeoutException to VALIDATION_ERROR so the agent rewrites request query parameters before resubmitting.",
      "B. Increase request_timeout_ms to 60000 while maintaining the PERMANENT_FAILURE classification logic.",
      "C. Suppress ClientTimeoutException in the client adapter and return an empty result set (HTTP 200 OK).",
      "D. Reclassify ClientTimeoutException as a TRANSIENT_ERROR retryable with backoff and dynamic timeout adjustment."
    ],
    "options": [
      "A. Chuyển mã ClientTimeoutException thành VALIDATION_ERROR để agent tự động chỉnh sửa cú pháp truy vấn trước khi gửi lại.",
      "B. Tăng cấu hình request_timeout_ms lên 60000 giây nhưng giữ nguyên logic phân loại PERMANENT_FAILURE.",
      "C. Thắt chặt xử lý ngoại lệ bằng cách bắt ClientTimeoutException và trả về kết quả rỗng (HTTP 200 OK).",
      "D. Phân loại lại ClientTimeoutException thành TRANSIENT_ERROR cho phép retry kèm lùi thời gian (backoff) và điều chỉnh timeout linh hoạt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A incorrect: Timeout is an execution duration issue, not an invalid request payload or syntax error, so rewriting the query syntax is invalid.",
      "Option B incorrect: Increasing static timeout hides the classification logic bug; any transient delay exceeding 60s will still wrongly trigger non-retryable job cancellation.",
      "Option C incorrect: Returning an empty dataset on timeout causes a silent failure where downstream decision steps process invalid empty data confidently.",
      "Option D correct: Classifying timeouts as transient errors allows the agent to retry the request with exponential backoff or dynamic timeout extensions when temporary backend load slows queries down."
    ],
    "rationale": "Timeouts represent temporary delays or high server load rather than permanent contract failures; classifying them as transient errors allows retries to complete valid long-running requests successfully.",
    "explanation": "Phân tích các phương án:\n- Phương án A sai vì lỗi timeout là do thời gian xử lý kéo dài, không phải lỗi tham số hay cú pháp (VALIDATION_ERROR), việc sửa truy vấn là không phù hợp.\n- Phương án B sai vì nâng timeout tĩnh chỉ che giấu lỗi phân loại; nếu hệ thống gặp trễ vượt quá 60 giây thì lỗi vẫn bị coi là không thể retry và gây hủy bỏ tác vụ.\n- Phương án C sai vì trả về kết quả rỗng khi timeout tạo ra sai sót ngầm (silent failure), làm cho các bước phía sau xử lý trên dữ liệu sai lệch.\n- Phương án D đúng vì phân loại timeout là lỗi tạm thời (TRANSIENT_ERROR) cho phép agent thực hiện retry có giãn cách (backoff) hoặc gia hạn timeout để hoàn thành tác vụ hợp lệ.",
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  }
]