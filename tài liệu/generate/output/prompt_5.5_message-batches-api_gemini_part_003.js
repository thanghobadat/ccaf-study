[
  {
    "id": "d5-b11-5.5-005",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-005",
    "scenarioSignature": {
      "testedPrinciple": "batch completion discovery efficiency",
      "failureMode": "excessive network traffic and rate limit exhaustion",
      "rootCause": "tight polling loop against batch status endpoint",
      "requiredFix": "asynchronous event notification via webhook with low frequency polling fallback"
    },
    "questionEN": "A batch log analysis system named BatchLogAnalyzer submits overnight processing jobs via POST /v1/messages/batches. To monitor when processing finishes, a background worker polls GET /v1/messages/batches/{batch_id} inside a tight while loop at 1-second intervals (sleep(1)). During 4-hour batch runs, this generates over 14,000 HTTP requests per batch, leading to API rate-limit errors and unnecessary network bandwidth consumption. How should the engineering team refactor the batch status tracking architecture?",
    "question": "[d5-b11-5.5-005] Một hệ thống phân tích log theo lô có tên BatchLogAnalyzer gửi các tác vụ xử lý qua đêm bằng POST /v1/messages/batches. Để theo dõi khi nào việc xử lý hoàn tất, một worker chạy ngầm thực hiện poll GET /v1/messages/batches/{batch_id} trong một vòng lặp while chặt chẽ với chu kỳ 1 giây (sleep(1)). Trong các đợt xử lý kéo dài 4 giờ, cơ chế này tạo ra hơn 14.000 yêu cầu HTTP cho mỗi batch, dẫn đến lỗi vượt giới hạn tốc độ API (rate-limit) và tiêu tốn băng thông mạng không cần thiết. Đội ngũ kỹ thuật nên tái cấu trúc kiến trúc theo dõi trạng thái batch như thế nào?",
    "optionsEN": [
      "A. Implement a webhook receiver endpoint to process asynchronous batch completion events, while replacing high-frequency polling with an exponential backoff fallback.",
      "B. Increase the HTTP client connection timeout in POST /v1/messages/batches requests so the initial connection blocks until all batch items complete.",
      "C. Poll GET /v1/messages/batches/{batch_id}/results continuously every second to retrieve output data immediately upon completion.",
      "D. Split the workload into mini-batches of 10 items each to ensure completion within seconds while maintaining 1-second polling intervals."
    ],
    "options": [
      "A. Triển khai một endpoint webhook để xử lý các sự kiện hoàn tất batch bất đồng bộ, đồng thời thay thế việc polling tần suất cao bằng cơ chế fallback lùi thời gian lũy thừa (exponential backoff).",
      "B. Tăng thời gian chờ (timeout) của kết nối HTTP client trong yêu cầu POST /v1/messages/batches để kết nối ban đầu chặn cho đến khi tất cả mục trong batch xử lý xong.",
      "C. Thực hiện poll GET /v1/messages/batches/{batch_id}/results liên tục mỗi giây để tải xuống dữ liệu đầu ra ngay khi hoàn thành.",
      "D. Chia nhỏ khối lượng công việc thành các mini-batch 10 mục để đảm bảo hoàn thành trong vài giây trong khi vẫn giữ nguyên chu kỳ poll 1 giây."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Webhooks notify the client when processing_status reaches ended, eliminating aggressive polling traffic. Using an exponential backoff or low-frequency poll as a fallback ensures reliable state synchronization without exhausting rate limits.",
      "Option B is incorrect: The Message Batches API is strictly asynchronous and designed for latency-tolerant processing; holding an HTTP connection open is unsupported and causes gateway timeouts.",
      "Option C is incorrect: Polling the /results endpoint at 1-second intervals before processing finishes returns errors or unready states and fails to reduce overall network overhead.",
      "Option D is incorrect: Breaking 5,000-item workloads into tiny 10-item batches increases overhead, invalidates bulk processing benefits, and creates excessive batch creation calls."
    ],
    "rationale": "The assigned scenario highlights unnecessary network traffic and rate limiting caused by 1-second polling on asynchronous batches. Replacing tight polling loops with webhook event notifications (backed up by low-frequency exponential backoff polling) eliminates overhead while reliably detecting batch completion.",
    "explanation": "Phương án A là chính xác vì Message Batches API được thiết kế để xử lý bất đồng bộ. Việc sử dụng Webhook cho phép API tự động thông báo cho client khi processing_status chuyển sang 'ended', giúp loại bỏ hoàn toàn việc gửi yêu cầu HTTP liên tục mỗi giây. Việc kết hợp với cơ chế fallback polling tần suất thấp giúp hệ thống vừa tiết kiệm tài nguyên vừa đảm bảo độ tin cậy.\n\nPhương án B sai vì API Batches không hỗ trợ kết nối đồng bộ giữ nguyên (blocking synchronous connection) trong nhiều giờ; việc giữ kết nối HTTP sẽ gây ra lỗi gateway timeout.\n\nPhương án C sai vì việc poll trực tiếp vào endpoint /results khi chưa xử lý xong vẫn gây ra lượng lưu lượng mạng khổng lồ và không giải quyết được vấn đề vượt rate limit.\n\nPhương án D sai vì việc chia nhỏ batch thành 10 item làm mất đi lợi ích của xử lý lô (bulk batching), tăng chi phí quản lý và số lượng yêu cầu tạo batch.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  },
  {
    "id": "d5-b11-5.5-006",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-006",
    "scenarioSignature": {
      "testedPrinciple": "reliable batch completion event handling",
      "failureMode": "stuck batch jobs from unhandled webhook delivery failure",
      "rootCause": "single point of failure in push notification delivery",
      "requiredFix": "idempotent webhook receiver with periodic polling fallback"
    },
    "questionEN": "A financial transaction auditing platform uses webhooks to receive batch completion notifications for batch_id jobs sent to Message Batches API. During an edge network outage, several HTTP POST webhook delivery attempts failed and were dropped, leaving batch execution states out of sync in the auditor database. How should the architecture be modified to handle webhook failures reliably without processing duplicate batch results?",
    "question": "[d5-b11-5.5-006] Một nền tảng kiểm toán giao dịch tài chính sử dụng webhook để nhận thông báo hoàn tất batch cho các tác vụ batch_id gửi đến Message Batches API. Trong một sự cố gián đoạn mạng trung gian, nhiều nỗ lực giao webhook HTTP POST đã thất bại và bị hủy, khiến trạng thái thực thi batch bị lệch trong cơ sở dữ liệu kiểm toán. Kiến trúc nên được điều chỉnh như thế nào để xử lý thất bại webhook một cách tin cậy mà không xử lý trùng lặp kết quả batch?",
    "optionsEN": [
      "A. Disable webhook endpoints entirely and switch to a 5-second continuous polling loop against GET /v1/messages/batches/{batch_id} to prevent dropped event notifications.",
      "B. Implement an idempotent webhook event handler to safely ignore duplicate deliveries, backed by a periodic reconciliation process that polls unconfirmed batch statuses.",
      "C. Configure the API client to re-submit the full batch request with a new custom_id whenever a webhook is not received within 15 minutes of submission.",
      "D. Configure the webhook endpoint to return HTTP 302 Redirect to move undelivered webhook notification payloads directly into an Amazon S3 bucket."
    ],
    "options": [
      "A. Vô hiệu hóa hoàn toàn webhook endpoint và chuyển sang vòng lặp polling liên tục 5 giây tới GET /v1/messages/batches/{batch_id} để tránh mất thông báo sự kiện.",
      "B. Triển khai webhook event handler có tính idempotent để bỏ qua an toàn các thông báo trùng lặp, kết hợp với quy trình đối soát định kỳ poll trạng thái các batch chưa được xác nhận.",
      "C. Cấu hình API client để gửi lại toàn bộ yêu cầu batch với custom_id mới bất kỳ khi nào không nhận được webhook trong vòng 15 phút kể từ khi gửi.",
      "D. Cấu hình webhook endpoint trả về HTTP 302 Redirect để chuyển hướng trực tiếp các payload thông báo webhook chưa giao vào Amazon S3 bucket."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Completely disabling webhooks and polling every 5 seconds reintroduces heavy network overhead and rate-limiting risks for long-running batches.",
      "Option B is correct: Idempotent handlers ensure duplicate webhook deliveries cause no side effects, while periodic fallback polling against GET /v1/messages/batches/{batch_id} recovers status updates lost during network drops.",
      "Option C is incorrect: Re-submitting the batch with a new custom_id creates duplicate batch jobs, doubling compute costs and output generation instead of resolving status sync.",
      "Option D is incorrect: Webhooks require a 2xx HTTP response status to confirm delivery; returning HTTP 302 does not save data to S3 and causes webhook senders to treat the delivery as failed."
    ],
    "rationale": "When webhook notifications fail due to transient network drops, relying strictly on push notifications risks missed completions. The standard resilient pattern combines an idempotent webhook receiver (to handle retries safely) with periodic polling fallback for unconfirmed active batches.",
    "explanation": "Phương án B là chính xác vì thiết kế hệ thống sự kiện tin cậy (resilient event handling) đòi hỏi hai yếu tố: tính Idempotent ở handler để xử lý an toàn khi webhook gửi lặp lại (retry), và cơ chế đối soát (reconciliation loop) định kỳ poll trạng thái từ GET /v1/messages/batches/{batch_id} cho các batch chưa ghi nhận hoàn tất nhằm khôi phục các sự kiện bị rơi do sự cố mạng.\n\nPhương án A sai vì việc loại bỏ hoàn toàn webhook và quay lại polling 5 giây làm tăng lưu lượng mạng và nguy cơ chạm ngưỡng rate limit.\n\nPhương án C sai vì việc gửi lại toàn bộ batch với custom_id mới tạo ra các tác vụ trùng lặp, gây lãng phí chi phí xử lý thay vì giải quyết vấn đề đồng bộ trạng thái.\n\nPhương án D sai vì webhook provider yêu cầu phản hồi HTTP 2xx để xác nhận đã nhận thông báo; trả về HTTP 302 sẽ bị coi là giao hàng thất bại và không hỗ trợ ghi dữ liệu vào S3.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  }
]