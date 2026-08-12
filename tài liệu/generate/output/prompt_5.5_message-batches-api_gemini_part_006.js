[
  {
    "id": "d5-b11-5.5-011",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-011",
    "scenarioSignature": {
      "testedPrinciple": "idempotent batch result ingestion",
      "failureMode": "duplicate record insertion from duplicate webhook delivery",
      "rootCause": "lack of deduplication or unique constraints on batch result records",
      "requiredFix": "implement atomic upsert or deduplication key tracking during ingestion"
    },
    "questionEN": "An enterprise integration component CustomerSyncWorker listens for batch.completed webhook events emitted by the processing engine. Due to network retries, the webhook receiver receives duplicate HTTP POST deliveries for batch ID msgbatch_99x22a. The worker reads the JSONL results stream via GET /v1/messages/batches/msgbatch_99x22a/results and inserts extracted records into a PostgreSQL database table without deduplication logic, causing metric inflation. How should the downstream worker be refactored to ensure idempotent ingestion when duplicate batch completion webhooks arrive?",
    "question": "[d5-b11-5.5-011] Một worker doanh nghiệp CustomerSyncWorker lắng nghe các webhook event batch.completed được phát ra bởi hệ thống xử lý batch. Do chính sách thử lại mạng, endpoint webhook nhận được các lần chuyển HTTP POST trùng lặp cho batch.completed của batch ID msgbatch_99x22a. Worker đọc file kết quả JSONL từ GET /v1/messages/batches/msgbatch_99x22a/results và chèn bản tóm tắt bản ghi thu được vào bảng PostgreSQL customer_enrichment mà không khử trùng lặp, gây ra các bản ghi trùng lặp và làm sai lệch chỉ số. Kỹ sư nên tái cấu trúc worker phía hạ nguồn như thế nào để việc nạp kết quả batch có tính idempotent khi nhận webhook trùng lặp?",
    "optionsEN": [
      "A. Reject duplicate webhook HTTP POST requests with 400 Bad Request whenever batch.completed is received more than once for the same batch ID.",
      "B. Delete the batch resource via DELETE /v1/messages/batches/msgbatch_99x22a immediately after processing the first event so retries receive 404 Not Found.",
      "C. Track processed batch IDs or use custom_id as a unique database constraint during ingestion to atomically skip or upsert already ingested record results.",
      "D. Re-submit the batch request payload whenever a duplicate batch.completed event is delivered to invalidate the original result stream."
    ],
    "options": [
      "A. Từ chối các yêu cầu HTTP POST webhook trùng lặp bằng 400 Bad Request bất cứ khi nào nhận được batch.completed nhiều hơn một lần cho cùng một batch ID.",
      "B. Xóa batch bằng cách gọi DELETE /v1/messages/batches/msgbatch_99x22a ngay sau khi nhận được event webhook đầu tiên để các lần thử lại sau trả về 404 Not Found.",
      "C. Theo dõi các batch ID đã xử lý hoặc sử dụng custom_id làm khóa chính/khóa duy nhất trong quá trình nạp để bỏ qua hoặc upsert nguyên tử các kết quả bản ghi đã nạp.",
      "D. Gửi lại batch với body yêu cầu mới bất cứ khi nào event batch.completed trùng lặp được chuyển đến để vô hiệu hóa luồng kết quả ban đầu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because returning an HTTP 400 status to the webhook provider signals a client validation error, causing delivery services to continually retry or mark notification delivery as failed without preventing downstream data duplication.",
      "Option B is incorrect because deleting the batch via DELETE /v1/messages/batches/msgbatch_99x22a removes metadata accessibility and prevents administrative auditing without cleaning up records already inserted into the downstream database.",
      "Option C is correct because recording completed batch processing states or relying on custom_id unique key constraints in the database enables atomic upserts or skips, ensuring identical data ingestion regardless of duplicate webhook deliveries.",
      "Option D is incorrect because re-submitting the batch creates an entirely new batch execution with redundant API costs, exacerbating data duplication rather than establishing idempotent ingestion."
    ],
    "rationale": "Webhooks guarantee at-least-once delivery, meaning network retries can trigger duplicate delivery of batch.completed events. To ensure idempotency, downstream consumers must track processed batch status or enforce database unique constraints on custom_id values so duplicate event processing skips redundant record insertions.",
    "explanation": "Lựa chọn C đúng vì webhook có cơ chế phân phối ít nhất một lần (at-least-once delivery), do đó hệ thống nhận có thể nhận trùng lặp sự kiện batch.completed do nỗ lực gửi lại trên mạng. Việc theo dõi trạng thái batch ID đã xử lý hoặc áp dụng ràng buộc duy nhất (unique constraint) trên custom_id trong cơ sở dữ liệu hạ nguồn cho phép thực hiện thao tác upsert hoặc bỏ qua các bản ghi trùng lặp một cách nguyên tử, đảm bảo dữ liệu không bị nhân đôi.\nLựa chọn A sai vì việc trả về HTTP 400 sẽ làm dịch vụ phát webhook coi đó là lỗi yêu cầu và tiếp tục thử lại hoặc đánh dấu thất bại, không giải quyết được bài toán idempotent.\nLựa chọn B sai vì xóa tài nguyên batch trên API không loại bỏ các bản ghi đã chèn trước đó trong cơ sở dữ liệu và làm mất dữ liệu kiểm toán batch.\nLựa chọn D sai vì gửi lại batch tạo thêm tác vụ xử lý mới với chi phí gia tăng và khiến tình trạng trùng lặp dữ liệu nghiêm trọng hơn.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  },
  {
    "id": "d5-b11-5.5-012",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-012",
    "scenarioSignature": {
      "testedPrinciple": "batch size request limit compliance",
      "failureMode": "batch submission validation error exceeding max requests",
      "rootCause": "exceeding batch capacity threshold of 10,000 requests",
      "requiredFix": "chunk payload into multiple batch submissions within limit"
    },
    "questionEN": "A nightly log analysis pipeline LogProcessor prepares a JSONL payload of 9,500 message requests to submit via POST /v1/messages/batches. Right before submission, an automated trigger appends 700 urgent audit log requests, bringing the total to 10,200 items. The Message Batches API enforces a maximum capacity of 10,000 requests per submission batch. How should the engineering team design the batch submission architecture to process all 10,200 requests successfully?",
    "question": "[d5-b11-5.5-012] Một dịch vụ phân tích log ban đêm LogProcessor chuẩn bị một file JSONL chứa 9,500 yêu cầu tin nhắn để gửi qua POST /v1/messages/batches. Ngay trước khi gửi, một bản vá khẩn cấp bổ sung 700 mục audit log cấp thiết vào hàng chờ xử lý, nâng tổng số lượng yêu cầu lên 10,200. Quy định kỹ thuật của API bắt buộc giới hạn tối đa 10,000 yêu cầu cho mỗi lần gửi message batch. Đội ngũ kỹ thuật nên cấu trúc việc gửi batch như thế nào để đảm bảo toàn bộ 10,200 mục log đều được xử lý mà không gặp lỗi xác thực API?",
    "optionsEN": [
      "A. Submit all 10,200 items in a single POST /v1/messages/batches request and configure the client to allow the API to silently drop excess items.",
      "B. Convert all 10,200 requests to real-time synchronous POST /v1/messages calls to bypass batch API constraints.",
      "C. Increase max_tokens per request in the batch payload so that all 10,200 items remain below a combined token limit instead of item count.",
      "D. Partition the JSONL payload into two distinct batch submissions (e.g., 9,500 and 700) to keep each request below the 10,000 item limit."
    ],
    "options": [
      "A. Gửi tất cả 10,200 mục trong một yêu cầu POST /v1/messages/batches duy nhất và dựa vào API để tự động bỏ qua 200 mục vượt quá.",
      "B. Chuyển sang gọi đồng bộ POST /v1/messages trong thời gian thực cho toàn bộ 10,200 mục để bỏ qua giới hạn batch, chấp nhận mất chiết khấu batch.",
      "C. Tăng max_tokens cho mỗi yêu cầu trong payload batch duy nhất để 10,200 mục nằm dưới ngưỡng token kết hợp thay vì số lượng yêu cầu.",
      "D. Chia payload thành hai lần gửi batch riêng biệt (ví dụ: 9,500 và 700 mục) để tuân thủ giới hạn 10,000 yêu cầu trên mỗi batch."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because submitting a batch payload containing 10,200 requests violates the hard limit of 10,000 requests per batch, causing immediate HTTP 400 validation failure for the entire request payload.",
      "Option B is incorrect because routing 10,200 bulk background requests through synchronous calls forfeits the 50% batch discount and risks hitting concurrency limits or HTTP timeouts under heavy load.",
      "Option C is incorrect because token configurations do not modify the hard request count constraint of 10,000 individual requests enforced by the Message Batches API.",
      "Option D is correct because chunking the 10,200 requests into separate batch files (such as 9,500 and 700) respects the 10,000 request maximum limit per batch submission while retaining 50% batch processing cost savings."
    ],
    "rationale": "The Message Batches API enforces a strict limit of 10,000 requests per batch submission. When processing workloads exceeding this limit (10,200 items), the application must partition the requests into multiple batch submissions, each containing <= 10,000 requests.",
    "explanation": "Lựa chọn D đúng vì Message Batches API quy định giới hạn nghiêm ngặt tối đa 10,000 yêu cầu cho mỗi lần khởi tạo batch. Khi khối lượng xử lý đạt 10,200 mục, giải pháp đúng đắn là chia nhỏ file JSONL thành hai lần gửi riêng biệt (chẳng hạn 9,500 và 700) để cả hai đều nằm dưới ngưỡng 10,000, vừa tuân thủ API vừa giữ được lợi ích giảm 50% chi phí.\nLựa chọn A sai vì gửi 10,200 yêu cầu trong một request duy nhất sẽ bị API từ chối ngay lập tức với lỗi xác thực HTTP 400 chứ không tự động loại bỏ các yêu cầu dư thừa.\nLựa chọn B sai vì chuyển sang các cuộc gọi đồng bộ thời gian thực cho dữ liệu nền số lượng lớn sẽ làm mất chiết khấu 50% chi phí batch và nguy cơ vượt quá giới hạn concurrency.\nLựa chọn C sai vì giới hạn 10,000 áp dụng cho tổng số lượng yêu cầu (item count) trong batch, việc điều chỉnh max_tokens không làm thay đổi hay tăng giới hạn số yêu cầu này.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  }
]