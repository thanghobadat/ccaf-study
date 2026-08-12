[
  {
    "id": "d5-b11-5.5-013",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-013",
    "questionEN": "An enterprise monitoring system, DataSyncHub, submits nightly document summaries to POST /v1/messages/batches. Upon receiving an HTTP 200 response with processing_status: \"in_progress\", DataSyncHub instantly updates its UI telemetry to report job status as \"Completed\". Downstream ETL jobs triggered by this UI status fail with missing file errors because result files are not yet generated. Which architectural fix correctly models the batch lifecycle?",
    "question": "[d5-b11-5.5-013] Một hệ thống giám sát doanh nghiệp, DataSyncHub, gửi các tóm tắt tài liệu hàng đêm đến POST /v1/messages/batches. Khi nhận được phản hồi HTTP 200 với processing_status: \"in_progress\", DataSyncHub lập tức cập nhật đo đạc UI để báo cáo trạng thái công việc là \"Hoàn thành\". Các công việc ETL hạ nguồn được kích hoạt bởi trạng thái UI này bị lỗi thiếu tập tin vì các tập tin kết quả chưa được tạo. Sửa đổi kiến trúc nào phản ánh đúng vòng đời xử lý lô?",
    "optionsEN": [
      "A. Update DataSyncHub to treat in_progress as an active state, polling GET /v1/messages/batches/{batch_id} or listening for batch.ended webhooks until processing_status reaches ended before declaring completion.",
      "B. Include X-Sync-Mode: true in the request header of POST /v1/messages/batches to force synchronous processing and hold the socket connection open until results are finalized.",
      "C. Configure DataSyncHub to reduce batch request counts from 10,000 to 50 items so the API automatically transitions processing_status directly from submitted to completed in a single synchronous call.",
      "D. Set an internal timeout of 60 seconds after HTTP submission to automatically invoke DELETE /v1/messages/batches/{batch_id} if results are not available in memory."
    ],
    "options": [
      "A. Cập nhật DataSyncHub để xử lý in_progress như một trạng thái đang hoạt động, thực hiện poll GET /v1/messages/batches/{batch_id} hoặc lắng nghe webhook batch.ended cho đến khi processing_status chuyển sang ended trước khi công bố hoàn thành.",
      "B. Bổ sung header X-Sync-Mode: true trong yêu cầu POST /v1/messages/batches để ép buộc xử lý đồng bộ và giữ kết nối socket mở cho đến khi kết quả hoàn tất.",
      "C. Cấu hình DataSyncHub để giảm số lượng yêu cầu trong lô từ 10.000 xuống 50 mục để API tự động chuyển processing_status trực tiếp từ đã gửi sang hoàn thành trong một cuộc gọi đồng bộ duy nhất.",
      "D. Thiết lập thời gian chờ nội bộ 60 giây sau khi gửi HTTP để tự động gọi DELETE /v1/messages/batches/{batch_id} nếu kết quả chưa có sẵn trong bộ nhớ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Message Batches API operations are asynchronous. An HTTP 200 response with processing_status: \"in_progress\" signifies successful creation and queuing, not final execution completion. The client must explicitly track the state until processing_status shifts to ended.",
      "Option B is incorrect: The Message Batches API is strictly asynchronous for handling large bulk workloads; there is no header flag to convert batch processing into a synchronous HTTP request.",
      "Option C is incorrect: Small batch sizes do not bypass the asynchronous lifecycle; all batches undergo asynchronous queuing and execution regardless of item count.",
      "Option D is incorrect: Issuing a DELETE request cancels the batch processing altogether rather than waiting for results or correctly reflecting the lifecycle."
    ],
    "rationale": "The Message Batches API executes asynchronously. Receiving processing_status: \"in_progress\" indicates accepted queuing, not completed execution. Systems must explicitly monitor status transitions until reaching ended before triggering downstream consumers.",
    "explanation": "Đáp án A đúng vì Message Batches API là một dịch vụ bất đồng bộ. Phản hồi HTTP 200 chứa processing_status: \"in_progress\" chỉ xác nhận rằng lô đã được tiếp nhận và đưa vào hàng chờ thành công, chứ chưa hoàn thành xử lý. Hệ thống cần theo dõi vòng đời bất đồng bộ bằng cách kiểm tra định kỳ (polling) hoặc nhận webhook batch.ended cho đến khi processing_status đạt trạng thái ended trước khi báo hoàn thành cho các tác vụ hạ nguồn.\\n\\nĐáp án B sai vì API không hỗ trợ header đồng bộ để chuyển đổi một xử lý lô bất đồng bộ thành phản hồi đồng bộ.\\nĐáp án C sai vì kích thước lô nhỏ vẫn tuân theo quy trình xử lý bất đồng bộ tiêu chuẩn.\\nĐáp án D sai vì việc gửi lệnh hủy DELETE sẽ chấm dứt việc xử lý lô thay vì thu thập kết quả.",
    "scenarioSignature": {
      "testedPrinciple": "asynchronous message batch lifecycle tracking",
      "failureMode": "downstream consumers read missing payload while dashboard displays completed status",
      "rootCause": "treating API batch submission acceptance response as job execution completion",
      "requiredFix": "model explicit status transitions across in progress and ended states before marking complete"
    },
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  },
  {
    "id": "d5-b11-5.5-014",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-014",
    "scenarioSignature": {
      "testedPrinciple": "comprehensive batch API total cost of ownership analysis",
      "failureMode": "unexpected high operational costs despite headline token price discount",
      "rootCause": "omitting whole batch re execution retries and result retrieval expiration overhead from cost calculations",
      "requiredFix": "account for retry amplification and storage retention windows when modeling net financial savings"
    },
    "questionEN": "A financial platform, FinTechAnalyzer, migrates 100,000 daily document analysis workloads from synchronous POST /v1/messages to POST /v1/messages/batches expecting a net 50% cost reduction based on token pricing. However, month-end billing shows only a 15% net cost reduction. Investigation reveals that single-item validation failures trigger pipeline retries that re-submit entire 10,000-request batches, and un-archived results expired after the 29-day availability limit, requiring complete re-processing. Which factor explains why actual savings fell short of the headline discount?",
    "question": "[d5-b11-5.5-014] Một nền tảng tài chính, FinTechAnalyzer, chuyển đổi 100.000 tác vụ phân tích tài liệu hàng ngày từ POST /v1/messages đồng bộ sang POST /v1/messages/batches với kỳ vọng giảm 50% chi phí dựa trên giá token. Tuy nhiên, hóa đơn cuối tháng chỉ ghi nhận mức giảm chi phí ròng 15%. Điều tra cho thấy lỗi xác thực ở một mục đơn lẻ đã kích hoạt cơ chế retry của đường ống để gửi lại toàn bộ lô 10.000 yêu cầu, và các kết quả chưa lưu trữ bị hết hạn sau giới hạn 29 ngày khiến phải xử lý lại từ đầu. Yếu tố nào giải thích tại sao tiết kiệm thực tế thấp hơn mức giảm giá niêm yết?",
    "optionsEN": [
      "A. The Message Batches API automatically charges standard synchronous rates whenever batch processing completion takes longer than 6 hours.",
      "B. The cost model failed to incorporate total cost of ownership factors, such as whole-batch re-execution fees from poor retry granularity and re-run costs from failing to retrieve results within the 29-day retention window.",
      "C. Submitting request items without setting explicit custom_id strings incurs a 35% processing surcharge on every batch item.",
      "D. The headline 50% discount applies strictly to input prompt tokens, whereas output tokens generated within batch responses are billed at double synchronous rates."
    ],
    "options": [
      "A. Message Batches API tự động tính phí theo mức giá đồng bộ tiêu chuẩn bất cứ khi nào thời gian hoàn thành xử lý lô vượt quá 6 giờ.",
      "B. Mô hình chi phí đã không tính đến các yếu tố tổng chi phí sở hữu (TCO), chẳng hạn như phí thực thi lại toàn bộ lô do độ mịn retry kém và chi phí chạy lại do không tải kết quả trong cửa sổ lưu trữ 29 ngày.",
      "C. Việc gửi các mục yêu cầu mà không thiết lập chuỗi custom_id rõ ràng sẽ chịu khoản phụ phí xử lý 35% trên mỗi mục lô.",
      "D. Mức giảm giá niêm yết 50% chỉ áp dụng nghiêm ngặt cho các token đầu vào (input prompt tokens), trong khi các token đầu ra tạo ra trong phản hồi lô bị tính phí gấp đôi so với giá đồng bộ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: The Message Batches API maintains the 50% discount regardless of how long the batch takes within its processing SLA; pricing does not revert to synchronous rates based on duration.",
      "Option B is correct: Evaluating batch savings requires considering total operational overhead beyond headline token discounts. Resubmitting full batches due to un-isolated item errors and re-running expired batches past the 29-day storage window generate redundant token requests that diminish net cost savings.",
      "Option C is incorrect: Omitting or supplying custom_id does not incur a monetary surcharge, though custom_id is required for request tracking within a batch.",
      "Option D is incorrect: The 50% batch discount applies to both input and output tokens; output tokens are not billed at double rate."
    ],
    "rationale": "Achieving expected batch cost benefits requires factoring in full lifecycle operational expenses. Retry amplification (re-submitting whole batches) and missing retention windows (re-executing expired results) consume extra API tokens that offset the 50% discount.",
    "explanation": "Đáp án B đúng vì việc đánh giá hiệu quả kinh tế của Message Batches API đòi hỏi phải tính toán Tổng chi phí sở hữu (TCO) thay vì chỉ nhìn vào mức giảm 50% giá token niêm yết. Việc retry toàn bộ lô 10.000 yêu cầu chỉ vì lỗi nhỏ và việc phải chạy lại các lô đã hết hạn 29 ngày do không tải kết quả kịp thời sẽ làm phát sinh một lượng lớn token thừa, từ đó làm giảm đáng kể mức tiết kiệm ròng thực tế.\n\nĐáp án A sai vì thời gian xử lý lô không làm thay đổi chính sách giảm giá thành giá đồng bộ.\nĐáp án C sai vì custom_id là trường định danh không phát sinh phụ phí tài chính.\nĐáp án D sai vì chính sách giảm giá 50% của Message Batches API áp dụng cho cả token đầu vào và token đầu ra.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  }
]