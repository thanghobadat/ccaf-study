[
  {
    "id": "d5-b11-5.5-001",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-001",
    "scenarioSignature": {
      "testedPrinciple": "asynchronous batch routing for latency tolerant bulk workloads",
      "failureMode": "excessive api cost and rate limit exhaustion from synchronous bulk processing",
      "rootCause": "routing latency tolerant processing through synchronous real time endpoint",
      "requiredFix": "separate latency tolerant backfill to batch endpoint while retaining synchronous endpoint for interactive chat"
    },
    "questionEN": "An enterprise support system handles real-time customer chats via POST /v1/messages with a strict SLA of under 2 seconds response time. The data team needs to process a backfill of 8,000 historical support transcripts for sentiment analysis without depleting the real-time rate limit tier (RPM/TPM) or inflating API spending. Which architecture strategy correctly handles both workloads?",
    "question": "[d5-b11-5.5-001] Một hệ thống hỗ trợ doanh nghiệp xử lý hội thoại khách hàng thời gian thực qua POST /v1/messages với SLA thời gian phản hồi nghiêm ngặt dưới 2 giây. Đội ngũ dữ liệu cần xử lý backfill 8.000 bản ghi hội thoại lịch sử để phân tích thái độ (sentiment analysis) mà không làm cạn kiệt hạn ngạch giới hạn tốc độ (RPM/TPM) thời gian thực hoặc tăng chi phí API. Chiến lược kiến trúc nào giải quyết chính xác cả hai khối lượng công việc?",
    "optionsEN": [
      "A. Route the 8,000 archived transcripts to the Message Batches API (POST /v1/messages/batches) for asynchronous processing at 50% lower cost, while continuing to route live customer chat requests directly to POST /v1/messages.",
      "B. Route both live chat requests and the 8,000 historical transcripts into a single high-priority batch job via POST /v1/messages/batches to take advantage of bulk pricing for all incoming traffic.",
      "C. Wrap the 8,000 backfill requests in a synchronous parallel worker pool sending requests to POST /v1/messages during off-peak hours to receive the 50% latency-tolerant discount.",
      "D. Execute the 8,000 backfill requests using POST /v1/messages/batches while configuring the batch payload header x-latency-mode: synchronous to force sub-second completion for live support integration."
    ],
    "options": [
      "A. Định tuyến 8.000 bản ghi lịch sử tới Message Batches API (POST /v1/messages/batches) để xử lý bất đồng bộ với chi phí thấp hơn 50%, trong khi tiếp tục gửi các yêu cầu chat trực tiếp của khách hàng đến POST /v1/messages.",
      "B. Định tuyến cả hội thoại thời gian thực và 8.000 bản ghi lịch sử vào một tác vụ batch ưu tiên cao qua POST /v1/messages/batches để áp dụng đơn giá ưu đãi hàng loạt cho toàn bộ lưu lượng.",
      "C. Đóng gói 8.000 yêu cầu backfill trong một luồng worker song song đồng bộ gửi tới POST /v1/messages vào giờ thấp điểm để nhận mức giảm giá 50% xử lý chấp nhận độ trễ.",
      "D. Thực thi 8.000 yêu cầu backfill bằng POST /v1/messages/batches đồng thời cấu hình header x-latency-mode: synchronous trong payload để ép buộc hoàn thành dưới 1 giây cho việc tích hợp hỗ trợ trực tiếp."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because the Message Batches API (POST /v1/messages/batches) provides a 50% cost reduction and separate batch rate limits for latency-tolerant bulk processing like 8,000 archived transcripts, while interactive live chat requires synchronous POST /v1/messages calls to maintain its sub-2-second SLA.",
      "Option B is incorrect because routing real-time customer chats into an asynchronous batch job violates the sub-2-second SLA since batch completion is asynchronous and can take up to 24 hours.",
      "Option C is incorrect because synchronous calls to POST /v1/messages do not qualify for the 50% batch discount regardless of whether they are executed during off-peak hours.",
      "Option D is incorrect because the Message Batches API is strictly asynchronous and does not support an x-latency-mode: synchronous header to override batch processing into synchronous real-time execution."
    ],
    "rationale": "Routing the 8,000 latency-tolerant archived transcripts to POST /v1/messages/batches unlocks a 50% price reduction and uses separate batch rate limits, avoiding quota contention with real-time customer chat traffic on POST /v1/messages.",
    "explanation": "Lựa chọn A là đáp án đúng vì Message Batches API (POST /v1/messages/batches) được thiết kế riêng cho các tác vụ xử lý hàng loạt không yêu cầu thời gian thực, mang lại mức giảm giá 50% và tách biệt giới hạn tốc độ khỏi lưu lượng đồng bộ POST /v1/messages của ứng dụng chat trực tiếp.\nLựa chọn B sai vì việc đẩy các tin nhắn chat thời gian thực vào batch bất đồng bộ sẽ vi phạm SLA phản hồi dưới 2 giây của hệ thống trực tiếp.\nLựa chọn C sai vì việc gọi đồng bộ đến POST /v1/messages vào giờ thấp điểm không kích hoạt chính sách giảm giá 50% (chỉ áp dụng khi sử dụng Message Batches API).\nLựa chọn D sai vì Message Batches API không hỗ trợ header x-latency-mode: synchronous để chuyển đổi tác vụ batch thành xử lý thời gian thực.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  },
  {
    "id": "d5-b11-5.5-002",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-002",
    "scenarioSignature": {
      "testedPrinciple": "maximum request count limit per batch submission",
      "failureMode": "batch creation payload rejected by API",
      "rootCause": "submitting a single batch containing more requests than the enforced limit",
      "requiredFix": "split request payload into multiple batches under the maximum request limit"
    },
    "questionEN": "A data pipeline script generates a single JSON request body containing 12,400 prompt evaluation requests to submit to the Message Batches API (POST /v1/messages/batches). Upon invocation, the API rejects the payload. What is the root cause of this failure, and how must the architecture be modified?",
    "question": "[d5-b11-5.5-002] Một script pipeline dữ liệu tạo ra một JSON request body duy nhất chứa 12.400 yêu cầu đánh giá prompt để gửi tới Message Batches API (POST /v1/messages/batches). Khi gọi API, request bị từ chối. Nguyên nhân gốc rễ của lỗi này là gì và kiến trúc cần được điều chỉnh như thế nào?",
    "optionsEN": [
      "A. The batch contains non-unique custom_id values; assign a single global batch_id to all 12,400 requests and re-submit as a single unified payload.",
      "B. The submission exceeds the maximum limit of 10,000 requests per batch; chunk the 12,400 requests into multiple smaller batches (e.g., 10,000 and 2,400) while ensuring each request retains a unique custom_id.",
      "C. The total context window of 12,400 requests exceeds the maximum batch payload size of 100 MB; increase the system HTTP chunking buffer and stream the payload over a long-lived gRPC connection.",
      "D. The batch endpoint only accepts up to 5,000 requests for Tier 1 organization accounts; submit an API rate limit increase request via the developer portal to enable 12,400 single-batch capacity."
    ],
    "options": [
      "A. Batch chứa các giá trị custom_id không duy nhất; gán một batch_id toàn cục duy nhất cho tất cả 12.400 yêu cầu và gửi lại thành một payload hợp nhất.",
      "B. Yêu cầu gửi vượt quá giới hạn tối đa 10.000 request cho mỗi batch; chia nhỏ (chunk) 12.400 request thành nhiều batch nhỏ hơn (ví dụ: 10.000 và 2.400) trong khi đảm bảo mỗi request giữ một custom_id duy nhất.",
      "C. Tổng context window của 12.400 request vượt quá kích thước payload batch tối đa 100 MB; tăng bộ đệm HTTP chunking của hệ thống và stream payload qua kết nối gRPC.",
      "D. Batch endpoint chỉ chấp nhận tối đa 5.000 request đối với tài khoản doanh nghiệp Tier 1; gửi yêu cầu tăng rate limit qua cổng nhà phát triển để cho phép dung lượng 12.400 request trong một batch."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because using a single global ID across requests destroys response correlation and fails to address the batch request count limit.",
      "Option B is correct because the Message Batches API enforces a strict maximum limit of 10,000 requests per batch submission; processing 12,400 requests requires splitting them across multiple batches while preserving unique custom_id strings for response ingestion.",
      "Option C is incorrect because the API rejection is caused by violating the 10,000 request item limit per batch object rather than payload buffer/gRPC streaming constraints.",
      "Option D is incorrect because 10,000 requests per batch is a fixed API structural limit for all accounts, not an account tier limit adjustable via rate limit increase requests."
    ],
    "rationale": "The Message Batches API imposes a hard maximum constraint of 10,000 requests per batch submission. Submitting 12,400 requests requires dividing the input into separate batch API calls, each under 10,000 requests, while assigning unique custom_id strings to ensure reliable response tracking.",
    "explanation": "Lựa chọn B là đáp án đúng vì Message Batches API giới hạn tối đa 10.000 request cho một lần khởi tạo batch. Để xử lý 12.400 request, hệ thống bắt buộc phải chia nhỏ payload thành nhiều đợt gửi (ví dụ: một batch 10.000 và một batch 2.400) và duy trì custom_id duy nhất cho từng request để ghép nối kết quả.\nLựa chọn A sai vì việc dùng chung một custom_id cho tất cả request sẽ làm mất khả năng định danh kết quả từng câu hỏi riêng biệt và không giải quyết được giới hạn kích thước batch.\nLựa chọn C sai vì nguyên nhân từ chối là vượt giới hạn số lượng 10.000 request, không phải lỗi streaming HTTP/gRPC.\nLựa chọn D sai vì 10.000 request/batch là giới hạn cứng của API thiết kế cho mọi tài khoản, không phải giới hạn có thể mở rộng theo Tier qua phiếu hỗ trợ.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  }
]