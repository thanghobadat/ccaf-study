[
  {
    "id": "d5-b11-5.5-007",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-007",
    "scenarioSignature": {
      "testedPrinciple": "batch result storage lifecycle and retention period",
      "failureMode": "batch result retrieval returns resource expired or not found",
      "rootCause": "result access attempted after 29 day expiration window",
      "requiredFix": "retrieve and store batch output within 29 days"
    },
    "questionEN": "An automated analytics pipeline submits 8,000 document processing requests to the Anthropic Message Batches API (POST /v1/messages/batches). The batch completes successfully, but a downstream compliance audit script attempts to retrieve the output JSONL file using GET /v1/messages/batches/msgbatch_881a2b/results 32 days after the batch status transitioned to ended. The request fails with an HTTP error indicating the results are no longer accessible. Which factor explains this failure and represents the correct system design rule?",
    "question": "[d5-b11-5.5-007] Một pipeline phân tích tự động gửi 8.000 yêu cầu xử lý tài liệu đến Anthropic Message Batches API (POST /v1/messages/batches). Batch hoàn thành thành công, nhưng một kịch bản kiểm toán tuân thủ cố gắng tải xuống tệp kết quả JSONL bằng GET /v1/messages/batches/msgbatch_881a2b/results vào 32 ngày sau khi trạng thái batch chuyển sang ended. Yêu cầu thất bại với lỗi HTTP báo rằng kết quả không còn truy cập được. Yếu tố nào giải thích thất bại này và đại diện cho quy tắc thiết kế hệ thống đúng?",
    "optionsEN": [
      "A. The Anthropic API key used to query the batch results expired after 30 days of pipeline inactivity, revoking access to historical endpoint outputs.",
      "B. Batch output files require an explicit HTTP X-Archive-KeepAlive: true header during polling to prevent automatic deletion 24 hours after completion.",
      "C. Message Batches API results are stored on Anthropic servers for exactly 29 days after batch completion, after which result files are permanently purged.",
      "D. The batch results were automatically archived into cold storage, requiring a preliminary POST /v1/messages/batches/msgbatch_881a2b/unarchive request."
    ],
    "options": [
      "A. API key Anthropic được dùng để truy vấn kết quả batch đã hết hạn sau 30 ngày pipeline không hoạt động, làm mất quyền truy cập các endpoint lịch sử.",
      "B. Các tệp kết quả batch yêu cầu header HTTP X-Archive-KeepAlive: true rõ ràng trong quá trình polling để tránh bị xóa tự động sau 24 giờ hoàn thành.",
      "C. Kết quả từ Message Batches API chỉ được lưu trữ trên máy chủ Anthropic trong đúng 29 ngày sau khi hoàn thành, sau thời gian đó tệp kết quả sẽ bị xóa vĩnh viễn.",
      "D. Kết quả batch đã tự động được lưu trữ vào lưu trữ lạnh (cold storage), yêu cầu một yêu cầu POST /v1/messages/batches/msgbatch_881a2b/unarchive trước khi tải."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because API key expiration is governed by developer credential management, not inactivity timers or 30-day result retention policies.",
      "Option B is incorrect because Anthropic's Message Batches API does not use custom HTTP keep-alive headers to control result lifecycle, nor does it delete results after 24 hours.",
      "Option C is correct because Anthropic guarantees result availability for exactly 29 days following batch completion (ended status), after which output files are purged and become unretrievable.",
      "Option D is incorrect because Message Batches API does not feature an unarchive endpoint or cold-storage staging; expired results are purged rather than archived."
    ],
    "rationale": "The Anthropic Message Batches API enforces a strict 29-day retention period for batch output files following completion. Attempting to fetch results via GET /v1/messages/batches/{batch_id}/results after 29 days results in an unrecoverable failure because the output artifacts are permanently deleted. Pipelines requiring long-term data access must download and persist batch outputs to internal storage within the 29-day window.",
    "explanation": "Lựa chọn C là đáp án đúng vì Anthropic Message Batches API quy định rõ ràng rằng các tệp kết quả batch chỉ được giữ lại trên máy chủ của Anthropic trong đúng 29 ngày kể từ khi batch hoàn thành (trạng thái ended). Sau thời hạn 29 ngày, các tệp kết quả bị xóa vĩnh viễn và không thể truy xuất qua API GET /v1/messages/batches/{batch_id}/results.\n- Option A sai vì API key không tự hết hạn do không hoạt động trong 30 ngày và không liên quan đến chu kỳ lưu trữ tệp kết quả.\n- Option B sai vì hệ thống không sử dụng header custom X-Archive-KeepAlive và không xóa tệp sau 24 giờ.\n- Option D sai vì API không hỗ trợ cơ chế cold storage hay endpoint unarchive; tệp quá hạn 29 ngày sẽ bị xóa hoàn toàn.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  },
  {
    "id": "d5-b11-5.5-008",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.5 message-batches-api / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d5-b11-5.5-008",
    "scenarioSignature": {
      "testedPrinciple": "long term compliance storage for asynchronous batch outputs",
      "failureMode": "loss of historical audit logs after short term api storage expiration",
      "rootCause": "relying on ephemeral api provider storage for mandatory long term retention",
      "requiredFix": "ingest batch results into governed enterprise storage upon batch completion"
    },
    "questionEN": "A financial services platform uses the Message Batches API (POST /v1/messages/batches) to summarize 10,000 customer support logs every weekend. Regulatory compliance frameworks require that all input prompts and LLM-generated responses be retained and retrievable for 7 years for auditing purposes. The current architectural design queries Anthropic's batch status endpoint on-demand when auditors request historical reports. Why will this design fail compliance audits, and what is the required architectural modification?",
    "question": "[d5-b11-5.5-008] Một nền tảng dịch vụ tài chính sử dụng Message Batches API (POST /v1/messages/batches) để tóm tắt 10.000 nhật ký hỗ trợ khách hàng vào mỗi cuối tuần. Quy định tuân thủ yêu cầu rằng tất cả prompt đầu vào và phản hồi do LLM tạo ra phải được lưu trữ và có thể truy xuất trong 7 năm cho mục đích kiểm toán. Thiết kế kiến trúc hiện tại truy vấn endpoint trạng thái batch của Anthropic theo yêu cầu khi kiểm toán viên yêu cầu báo cáo lịch sử. Tại sao thiết kế này sẽ thất bại trong các kỳ kiểm toán tuân thủ, và thay đổi kiến trúc bắt buộc là gì?",
    "optionsEN": [
      "A. The design fails because Message Batches API responses omit prompt tokens; the architecture must convert to synchronous /v1/messages calls with prompt logging enabled.",
      "B. The design fails because batch custom_id values reset every 90 days; the architecture must store an external mapping table in a relational database.",
      "C. The design fails because Anthropic requires a dedicated Enterprise Compliance Plan to enable historical query logging beyond 30 days on batch endpoints.",
      "D. The design fails because Anthropic purges batch results after 29 days; the architecture must download completed outputs and ingest them into internal governed storage (e.g., S3/WORM)."
    ],
    "options": [
      "A. Thiết kế thất bại vì phản hồi Message Batches API loại bỏ prompt token; kiến trúc phải chuyển sang các cuộc gọi đồng bộ /v1/messages có bật ghi log prompt.",
      "B. Thiết kế thất bại vì giá trị custom_id của batch tự đặt lại sau mỗi 90 ngày; kiến trúc phải lưu trữ bảng ánh xạ bên ngoài trong cơ sở dữ liệu quan hệ.",
      "C. Thiết kế thất bại vì Anthropic yêu cầu Gói Tuân thủ Doanh nghiệp riêng để bật ghi log truy vấn lịch sử quá 30 ngày trên các endpoint batch.",
      "D. Thiết kế thất bại vì Anthropic xóa kết quả batch sau 29 ngày; kiến trúc phải tải xuống các kết quả đã hoàn thành và nạp chúng vào bộ lưu trữ quản trị nội bộ (như S3/WORM)."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because Message Batches API returns full message responses including usage details, and switching to synchronous processing increases cost by 50% without solving storage longevity.",
      "Option B is incorrect because custom_id strings are immutable metadata provided by the client and do not reset or expire on Anthropic's platform.",
      "Option C is incorrect because Anthropic does not offer extended 7-year cloud result hosting on batch API endpoints via enterprise tier settings; output retention is fixed at 29 days.",
      "Option D is correct because batch output files expire from Anthropic servers after 29 days, making reliance on Anthropic for 7-year retention non-compliant; the system must ingest results upon batch completion into governed internal storage."
    ],
    "rationale": "Anthropic's Message Batches API stores completion results for a temporary 29-day window. To fulfill multi-year compliance or regulatory retention requirements (such as 7-year audit retention), systems cannot rely on provider API endpoints for long-term storage. Instead, completion handlers must automatically retrieve result files upon batch finalization (ended status) and persist them into compliance-certified enterprise storage (e.g., Amazon S3 Object Lock / WORM storage).",
    "explanation": "Lựa chọn D là đáp án đúng vì Anthropic Message Batches API chỉ lưu trữ tệp kết quả tạm thời trong 29 ngày. Để đáp ứng các yêu cầu tuân thủ quy định lưu trữ dữ liệu dài hạn (như 7 năm cho mục đích kiểm toán), hệ thống không thể phụ thuộc vào máy chủ API của Anthropic để lưu trữ lịch sử. Quy trình phải thiết lập bộ lắng nghe webhook hoặc poller để tải xuống kết quả ngay khi batch kết thúc (ended), sau đó ghi dữ liệu vào hệ thống lưu trữ quản trị nội bộ đáp ứng chuẩn tuân thủ (như S3 WORM/Object Lock).\n- Option A sai vì batch API vẫn trả về đầy đủ nội dung phản hồi và usage metrics, chuyển sang sync làm tăng 50% chi phí mà không giải quyết vấn đề lưu trữ 7 năm.\n- Option B sai vì custom_id là chuỗi do client định nghĩa, không bị reset sau 90 ngày.\n- Option C sai vì Anthropic không cung cấp gói lưu trữ lịch sử kết quả 7 năm trực tiếp trên endpoint batch.",
    "sources": [
      {
        "label": "Lesson 5.5: Message Batches API",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-5-message-batches-api"
      }
    ]
  }
]