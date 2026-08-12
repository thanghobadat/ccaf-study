[
  {
    "id": "d5-b11-5.5-009",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-009",
    "questionEN": "A financial transaction system, LedgerAuditEngine, processes month-end workloads containing both time-critical exception disputes (requiring immediate SLA responses < 2s) and 50,000 routine ledger verification records. Under the current architecture, all items are queued together into the Message Batches API (POST /v1/messages/batches), causing urgent disputes to suffer a 45-minute processing delay. How should the architecture be refactored to satisfy latency requirements while maintaining cost efficiency?",
    "question": "[d5-b11-5.5-009] Một hệ thống giao dịch tài chính, LedgerAuditEngine, xử lý khối lượng công việc cuối tháng bao gồm cả các tranh chấp ngoại lệ khẩn cấp về thời gian (yêu cầu phản hồi SLA tức thì < 2 giây) và 50.000 bản ghi xác minh sổ cái định kỳ. Theo kiến trúc hiện tại, tất cả các mục được đưa vào hàng đợi cùng nhau tới Message Batches API (POST /v1/messages/batches), khiến các tranh chấp khẩn cấp bị trễ xử lý tới 45 phút. Kiến trúc nên được tái cấu trúc như thế nào để đáp ứng yêu cầu về độ trễ trong khi vẫn duy trì hiệu quả chi phí?",
    "optionsEN": [
      "A. Separate the ingestion pipeline to send time-critical exception disputes synchronously via POST /v1/messages and stream routine verification records asynchronously via POST /v1/messages/batches.",
      "B. Keep all records in POST /v1/messages/batches but append processing_priority: \"urgent\" to the batch submission body for high-priority items.",
      "C. Migrate all 50,000 ledger records and exception disputes to synchronous POST /v1/messages calls executed across 100 concurrent worker threads.",
      "D. Buffer time-critical exception disputes into mini-batches of 100 requests and submit them to POST /v1/messages/batches with a 5-second polling interval."
    ],
    "options": [
      "A. Tách biệt đường ống tiếp nhận để gửi các tranh chấp ngoại lệ khẩn cấp theo phương thức đồng bộ qua POST /v1/messages và truyền các bản ghi xác minh định kỳ theo phương thức bất đồng bộ qua POST /v1/messages/batches.",
      "B. Giữ tất cả bản ghi trong POST /v1/messages/batches nhưng thêm processing_priority: \"urgent\" vào nội dung gửi batch cho các mục có độ ưu tiên cao.",
      "C. Chuyển đổi toàn bộ 50.000 bản ghi sổ cái và các tranh chấp ngoại lệ sang các cuộc gọi đồng bộ POST /v1/messages được thực thi trên 100 luồng công nhân đồng thời.",
      "D. Gom nhóm các tranh chấp ngoại lệ khẩn cấp thành các lô nhỏ 100 yêu cầu và gửi chúng tới POST /v1/messages/batches với khoảng thời gian truy vấn (polling) 5 giây."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Time-sensitive workloads require synchronous API endpoints (POST /v1/messages) to guarantee immediate SLA compliance, while high-volume latency-tolerant workloads belong in the 50% cheaper Message Batches API (POST /v1/messages/batches).",
      "Option B is incorrect: The Message Batches API does not support priority preempting parameters like processing_priority, as batch processing is designed for asynchronous completion.",
      "Option C is incorrect: Sending all 50,000 bulk items via synchronous endpoints exhausts API rate limits (429 Too Many Requests) and incurs full price without leveraging batch discounts.",
      "Option D is incorrect: Submitting time-critical exception disputes to the batch API still introduces queueing delays inherent to asynchronous batch processing regardless of polling frequency."
    ],
    "rationale": "Routing latency-sensitive exceptions through the synchronous endpoint guarantees immediate response times, while dispatching bulk ledger records through the Message Batches API retains 50% cost savings and prevents queue head-of-line blocking.",
    "explanation": "Đáp án A đúng vì các công việc nhạy cảm với độ trễ (như xử lý ngoại lệ khẩn cấp) bắt buộc phải sử dụng điểm cuối đồng bộ POST /v1/messages để đảm bảo SLA thời gian thực, trong khi các công việc số lượng lớn chấp nhận độ trễ nên gửi qua Message Batches API (POST /v1/messages/batches) để tiết kiệm 50% chi phí. Đáp án B sai vì Message Batches API không hỗ trợ thuộc tính ưu tiên lượt chạy thời gian thực. Đáp án C sai vì chuyển toàn bộ khối lượng lớn sang đồng bộ sẽ làm vượt ngưỡng rate limit và tốn gấp đôi chi phí. Đáp án D sai vì việc dùng batch API cho tác vụ khẩn cấp vẫn chịu trễ do bản chất bất đồng bộ của hàng đợi.",
    "scenarioSignature": {
      "testedPrinciple": "hybrid synchronous and asynchronous request routing",
      "failureMode": "excessive latency on time sensitive exception processing during high volume operations",
      "rootCause": "unified queuing of interactive requests and latency tolerant bulk workloads",
      "requiredFix": "route interactive traffic synchronously while dispatching bulk records to message batches api"
    },
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  },
  {
    "id": "d5-b11-5.5-010",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-010",
    "scenarioSignature": {
      "testedPrinciple": "client side batch manifest tracking for submission recovery",
      "failureMode": "inability to identify unsubmitted records following batch initialization failures",
      "rootCause": "missing pre submission manifest logging before calling batch creation API",
      "requiredFix": "persist local request manifest with custom id mappings prior to batch submission"
    },
    "questionEN": "An insurance claim processing system, ClaimBatchIngest, constructs batch requests containing thousands of individual claims and posts them to POST /v1/messages/batches. During a network partition event, the worker process crashed while creating a 5,000-item batch. Upon recovery, the system cannot determine which claims were included in the aborted payload versus which were never submitted. What design pattern prevents this unsubmitted request tracking failure?",
    "question": "[d5-b11-5.5-010] Một hệ thống xử lý bồi thường bảo hiểm, ClaimBatchIngest, xây dựng các yêu cầu theo lô chứa hàng nghìn đơn bồi thường cá nhân và gửi chúng tới POST /v1/messages/batches. Trong một sự cố phân đoạn mạng, tiến trình worker bị sập khi đang tạo lô 5.000 mục. Sau khi phục hồi, hệ thống không thể xác định đơn bồi thường nào đã nằm trong payload bị hủy so với đơn nào chưa từng được gửi. Mô hình thiết kế nào ngăn chặn thất bại trong việc theo dõi yêu cầu chưa gửi này?",
    "optionsEN": [
      "A. Call GET /v1/messages/batches/{batch_id}/results after worker reboot to reconstruct the list of unsubmitted claims from the returned results file.",
      "B. Persist a client-side submission manifest mapping each claim ID to a stable custom_id in a local database before sending POST /v1/messages/batches.",
      "C. Configure automatic HTTP retries with exponential backoff on POST /v1/messages/batches without writing local state.",
      "D. Poll GET /v1/messages/batches to retrieve aggregate item counts and subtract processed items from the primary claims database table."
    ],
    "options": [
      "A. Gọi GET /v1/messages/batches/{batch_id}/results sau khi worker khởi động lại để dựng lại danh sách đơn chưa gửi từ tệp kết quả trả về.",
      "B. Lưu trữ manifest gửi phía client ánh xạ từng ID bồi thường với một custom_id ổn định vào cơ sở dữ liệu cục bộ trước khi gửi POST /v1/messages/batches.",
      "C. Cấu hình tự động thử lại HTTP với lùi mũ (exponential backoff) cho POST /v1/messages/batches mà không cần ghi trạng thái cục bộ.",
      "D. Truy vấn GET /v1/messages/batches để lấy tổng số mục và trừ các mục đã xử lý khỏi bảng cơ sở dữ liệu bồi thường chính."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: If the batch submission crashed before receiving a successful HTTP response, no batch_id exists, making result retrieval impossible.",
      "Option B is correct: Writing a local submission manifest with stable custom_id mappings prior to network transmission ensures the system can audit state and identify unsubmitted requests if worker crashes occur.",
      "Option C is incorrect: Automated HTTP retries on connection failure do not preserve record-level tracking if the process crashes in-flight before payload dispatch.",
      "Option D is incorrect: The batch list endpoint only returns top-level batch metadata (e.g. request_counts), which cannot identify specific unsubmitted record IDs."
    ],
    "rationale": "Persisting a local client manifest before API invocation provides deterministic reconciliation between local database entity IDs and batch request custom_id entries, allowing full recovery of unsubmitted items if batch creation is interrupted.",
    "explanation": "Đáp án B đúng vì việc ghi lại manifest gửi phía client chứa ánh xạ giữa ID bản ghi và custom_id trước khi thực hiện cuộc gọi API giúp hệ thống đối soát chính xác các mục nào đã gửi và mục nào chưa gửi nếu tiến trình bị sập. Đáp án A sai vì nếu cuộc gọi tạo lô bị sập trước đó, sẽ không tạo ra batch_id để lấy kết quả. Đáp án C sai vì cơ chế thử lại HTTP không giúp phục hồi thông tin ghi nhận ở cấp độ bản ghi khi tiến trình bị sập. Đáp án D sai vì API danh sách lô chỉ trả về tổng số thống kê chứ không cung cấp ID chi tiết của các đơn chưa gửi.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  }
]