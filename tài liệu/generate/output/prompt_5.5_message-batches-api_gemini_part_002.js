[
  {
    "id": "d5-b11-5.5-003",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-003",
    "scenarioSignature": {
      "testedPrinciple": "batch processing cost optimization for asynchronous workloads",
      "failureMode": "excessive api expenditure on batch jobs",
      "rootCause": "using synchronous endpoints for offline processing",
      "requiredFix": "migrating offline operations to message batches api"
    },
    "questionEN": "An e-commerce backend service, CatalogLocalizer, translates 100,000 product descriptions every night within a 12-hour completion window. Currently, it invokes the synchronous POST /v1/messages endpoint for each item, generating high API costs and consuming standard concurrency quota. Which architecture modification achieves a 50% cost reduction without violating completion SLA?",
    "question": "[d5-b11-5.5-003] Dịch vụ backend thương mại điện tử CatalogLocalizer dịch 100.000 mô tả sản phẩm mỗi đêm trong khung thời gian hoàn tất 12 giờ. Hiện tại, dịch vụ gọi endpoint đồng bộ POST /v1/messages cho từng mục, phát sinh chi phí API cao và tiêu tốn quota concurrency tiêu chuẩn. Thay đổi kiến trúc nào đạt được mức giảm 50% chi phí mà không vi phạm SLA hoàn thành?",
    "optionsEN": [
      "A. Increase the client concurrency limit on POST /v1/messages to execute all translation requests faster.",
      "B. Store translated strings in a Redis cache without altering the upstream API endpoint.",
      "C. Migrate the localization pipeline to POST /v1/messages/batches, submitting requests asynchronously to utilize the 50% batch discount.",
      "D. Enable response streaming with stream: true on POST /v1/messages to process description chunks immediately."
    ],
    "options": [
      "A. Tăng giới hạn concurrency ở phía client trên POST /v1/messages để thực thi tất cả yêu cầu dịch nhanh hơn.",
      "B. Lưu trữ các chuỗi đã dịch trong bộ nhớ đệm Redis mà không thay đổi endpoint API thượng nguồn.",
      "C. Chuyển đổi pipeline địa phương hóa sang POST /v1/messages/batches, gửi các yêu cầu bất đồng bộ để áp dụng mức giảm giá 50% cho batch.",
      "D. Bật phản hồi streaming với stream: true trên POST /v1/messages để xử lý các block mô tả ngay lập tức."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A increases request concurrency on the synchronous API, which speeds up processing time but continues charging standard token prices without providing cost savings.",
      "Option B fails to address new or updated product catalog descriptions that require model inference, offering no API cost reduction for unprocessed nightly items.",
      "Option C correctly utilizes POST /v1/messages/batches, which processes latency-tolerant asynchronous requests within 24 hours at a 50% discount compared to standard synchronous endpoints.",
      "Option D leverages streaming to reduce time-to-first-token for individual requests, but streaming on the synchronous Messages API still incurs standard baseline pricing."
    ],
    "rationale": "The Message Batches API (POST /v1/messages/batches) is specifically designed for latency-tolerant, bulk processing workloads like nightly localization. It offers a 50% discount on token pricing in exchange for asynchronous execution within 24 hours.",
    "explanation": "Phương án C đúng vì Message Batches API (POST /v1/messages/batches) cung cấp mức giảm giá 50% cho các tác vụ xử lý hàng loạt không yêu cầu thời gian thực (latency-tolerant) hoàn tất trong vòng 24 giờ. Vì công việc dịch thuật danh mục diễn ra ban đêm với khung thời gian 12 giờ, nó hoàn toàn phù hợp với mô hình bất đồng bộ này.\n\nPhương án A sai vì việc tăng concurrency trên endpoint đồng bộ chỉ giúp hoàn thành nhanh hơn nhưng vẫn tính giá chuẩn.\nPhương án B sai vì các mô tả sản phẩm mới hoặc cập nhật hàng đêm bắt buộc phải qua model inference, Redis cache không giúp giảm chi phí API cho nội dung mới.\nPhương án D sai vì stream: true chỉ giảm latency phản hồi đầu tiên cho cuộc gọi đồng bộ, không hề giảm 50% chi phí token.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  },
  {
    "id": "d5-b11-5.5-004",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-004",
    "questionEN": "To save costs, an engineering team refactored AutoCompleteService—an interactive user search suggestion feature with a 200ms latency SLA—to submit single-item batches via POST /v1/messages/batches. Users report that search suggestions now take several minutes or fail to appear. What is the root cause and required architectural fix?",
    "question": "[d5-b11-5.5-004] Để tiết kiệm chi phí, đội ngũ kỹ thuật đã refactor AutoCompleteService—một tính năng gợi ý tìm kiếm tương tác của người dùng với SLA độ trễ 200ms—để gửi các batch đơn lẻ qua POST /v1/messages/batches. Người dùng phản ánh rằng gợi ý tìm kiếm hiện mất vài phút hoặc không xuất hiện. Nguyên nhân gốc rễ và giải pháp kiến trúc cần thiết là gì?",
    "optionsEN": [
      "A. Reduce the max batch request size to 1 item so the Batch API instantly executes requests without queuing delay.",
      "B. Implement a 100ms polling loop on GET /v1/messages/batches/{batch_id} to force prompt batch completion.",
      "C. Add processing_tier: \"urgent\" to the batch creation payload to bypass the standard 24-hour asynchronous queue.",
      "D. Revert AutoCompleteService to synchronous POST /v1/messages calls, using Message Batches API strictly for non-interactive workloads."
    ],
    "options": [
      "A. Giảm kích thước batch tối đa xuống 1 mục để Batch API thực thi ngay lập tức mà không có độ trễ hàng đợi.",
      "B. Triển khai vòng lặp short-polling 100ms trên GET /v1/messages/batches/{batch_id} để thúc đẩy batch hoàn thành nhanh.",
      "C. Thêm processing_tier: \"urgent\" vào payload tạo batch để vượt qua hàng đợi bất đồng bộ 24 giờ tiêu chuẩn.",
      "D. Khôi phục AutoCompleteService về các lời gọi đồng bộ POST /v1/messages, chỉ sử dụng Message Batches API cho công việc không tương tác."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A fails because setting a single-item batch payload does not change the asynchronous processing model or the 24-hour SLA of the Message Batches API.",
      "Option B fails because polling the status endpoint rapidly does not accelerate batch execution scheduling and creates excessive rate-limit consumption.",
      "Option C fails because the Message Batches API does not provide a parameter or tier to bypass asynchronous scheduling for real-time latency needs.",
      "Option D is correct because interactive features requiring sub-second user responses must use the synchronous Messages API, reserving batch processing exclusively for latency-tolerant operations."
    ],
    "rationale": "The Message Batches API is designed exclusively for asynchronous, latency-tolerant workloads with up to a 24-hour processing SLA. Real-time interactive applications requiring sub-second response times must remain on synchronous endpoints.",
    "explanation": "Phương án D đúng vì Message Batches API chỉ dành cho các tác vụ bất đồng bộ chịu được độ trễ lên tới 24 giờ. Tính năng tương tác như gợi ý tìm kiếm yêu cầu phản hồi theo thời gian thực (SLA 200ms) bắt buộc phải dùng endpoint đồng bộ POST /v1/messages.\\n\\nPhương án A sai vì việc tạo batch có 1 item vẫn phải đi qua quy trình scheduling bất đồng bộ của Batch API.\\nPhương án B sai vì short-polling liên tục không làm tăng tốc độ xử lý ngầm của hệ thống batch mà còn làm lãng phí quota API.\\nPhương án C sai vì Message Batches API không hỗ trợ tham số hay cấp độ priority nào để biến đổi công việc bất đồng bộ thành xử lý tức thì theo thời gian thực.",
    "scenarioSignature": {
      "testedPrinciple": "workload latency requirement segregation",
      "failureMode": "unacceptable user interface latency degradation",
      "rootCause": "routing real-time interactive requests to asynchronous batch api",
      "requiredFix": "reverting real-time user requests to synchronous messages api endpoint"
    },
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  }
]