[
  {
    "id": "d5-b10-5.4-005",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-005",
    "scenarioSignature": {
      "testedPrinciple": "structured error context propagation",
      "failureMode": "batch operation aborted due to missing failure details",
      "rootCause": "generic error string stripping execution context",
      "requiredFix": "structured error payload with contextual failure metadata"
    },
    "questionEN": "In an automated order fulfillment pipeline, a payment subagent processing multi-item orders encounters a failure. It raises a generic exception string 'Error: Payment failed' back to the orchestrating OrderCoordinator subagent. When OrderCoordinator attempts to triage or alert support, it cannot determine which transaction_id or charge amount failed, forcing it to abort the entire batch of 50 orders rather than retrying the affected item or notifying the specific customer. What structural change to the error response payload prevents this loss of operational context?",
    "question": "[d5-b10-5.4-005] Trong một pipeline xử lý đơn hàng tự động, một subagent thanh toán gặp lỗi khi xử lý danh sách đơn hàng. Nó chỉ trả về một ngoại lệ dạng chuỗi chung chung 'Error: Payment failed' cho subagent OrderCoordinator. Khi OrderCoordinator nhận được lỗi này, nó không thể xác định transaction_id hoặc amount nào bị lỗi, dẫn đến việc phải hủy toàn bộ lô 50 đơn hàng thay vì thử lại giao dịch bị lỗi. Thay đổi cấu trúc nào đối với payload phản hồi lỗi giúp ngăn chặn việc mất ngữ cảnh vận hành này?",
    "optionsEN": [
      "A. Return a structured error object containing standard failure metadata including { error_code, message, retryable, context: { transaction_id, amount, failed_input } }.",
      "B. Enable verbose logging on the payment subagent stdout so the OrderCoordinator can parse text logs using regex patterns.",
      "C. Configure the OrderCoordinator to execute an immediate retry loop up to 5 times whenever a generic string exception is caught.",
      "D. Catch all payment errors within the payment subagent and return an empty HTTP 200 payload so the OrderCoordinator ignores individual transaction failures."
    ],
    "options": [
      "A. Trả về một đối tượng lỗi có cấu trúc chứa các metadata chuẩn gồm { error_code, message, retryable, context: { transaction_id, amount, failed_input } }.",
      "B. Bật verbose logging trên stdout của subagent thanh toán để OrderCoordinator phân tích cú pháp log bằng regex.",
      "C. Cấu hình OrderCoordinator thực hiện vòng lặp thử lại ngay lập tức tối đa 5 lần mỗi khi bắt được ngoại lệ dạng chuỗi chung.",
      "D. Bắt tất cả lỗi thanh toán bên trong subagent thanh toán và trả về payload HTTP 200 rỗng để OrderCoordinator bỏ qua thất bại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because returning a structured error payload with an explicit context field containing transaction_id, amount, and failed_input preserves critical execution metadata across agent boundaries, allowing OrderCoordinator to make targeted remediation decisions.",
      "Option B is incorrect because parsing unstructured stdout logs with regex across agent boundaries is brittle, unstandardized, and fails if log formats change or logs are buffered asynchronously.",
      "Option C is incorrect because retrying blindly without context or checking retryable status risks repeating non-retryable failures or triggering duplicate billing actions without knowing which transaction failed.",
      "Option D is incorrect because masking failures as successful empty responses hides critical errors, leading to downstream data corruption and missing payment processing."
    ],
    "rationale": "Returning a structured error object with an explicit context field ensures that key execution details like transaction_id and amount are preserved during inter-agent propagation, enabling targeted retries or targeted user notifications rather than total workflow aborts.",
    "explanation": "Lựa chọn A là đáp án đúng vì việc trả về một payload lỗi có cấu trúc chứa trường context cụ thể (bao gồm transaction_id, amount, và failed_input) giúp duy trì các metadata thực thi quan trọng qua ranh giới giữa các agent, cho phép OrderCoordinator đưa ra quyết định xử lý chính xác cho từng mục. Lựa chọn B sai vì việc trích xuất log stdout bằng regex rất dễ vỡ và không đảm bảo chuẩn hóa. Lựa chọn C sai vì thử lại mù quáng mà không biết giao dịch nào thất bại có thể gây ra rủi ro thanh toán lặp lại. Lựa chọn D sai vì việc che giấu lỗi bằng phản hồi rỗng sẽ dẫn đến sai lệch dữ liệu ở các bước tiếp theo.",
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  },
  {
    "id": "d5-b10-5.4-006",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-006",
    "questionEN": "An AnalyticsSubagent queries a PostgreSQL database to count active sessions for an executive reporting dashboard. When the database encounters a connection pool timeout error (57P01), the subagent's internal try/catch block catches the exception and silently returns an empty dictionary {} to avoid throwing an exception. Consequently, the dashboard subagent consumes {} as {\"active_users\": 0} and displays zero active users with 100% confidence, triggering false system health alerts. How should the AnalyticsSubagent handle database failure to prevent silent reporting errors?",
    "question": "[d5-b10-5.4-006] Một AnalyticsSubagent truy vấn cơ sở dữ liệu PostgreSQL để đếm số phiên hoạt động cho dashboard báo cáo. Khi cơ sở dữ liệu gặp lỗi hết thời gian chờ kết nối pool (57P01), khối try/catch của subagent bắt ngoại lệ và âm thầm trả về một dictionary rỗng {} để tránh văng lỗi. Do đó, subagent hiển thị dashboard xử lý {} thành {\"active_users\": 0} và hiển thị 0 người dùng đang hoạt động với độ tin cậy 100%, kích hoạt cảnh báo sai. AnalyticsSubagent nên xử lý lỗi cơ sở dữ liệu như thế nào để ngăn chặn sai sót báo cáo âm thầm này?",
    "optionsEN": [
      "A. Catch the database exception and return a cached result from yesterday's execution without indicating data freshness.",
      "B. Propagate a structured error payload containing error_type: \"DATABASE_TIMEOUT\" and retryable: true so downstream consumers can render a degraded or retry state instead of treating missing data as zero.",
      "C. Log the error internally and return {\"active_users\": null} while marking the HTTP status code as 200 Success.",
      "D. Implement an inline fallback that automatically sets active_users to the historical average whenever a query fails."
    ],
    "options": [
      "A. Bắt ngoại lệ cơ sở dữ liệu và trả về kết quả được cache từ ngày hôm trước mà không gắn nhãn độ tươi của dữ liệu.",
      "B. Lan truyền payload lỗi có cấu trúc chứa error_type: \"DATABASE_TIMEOUT\" và retryable: true để phía hạ nguồn hiển thị trạng thái suy giảm hoặc thử lại thay vì coi dữ liệu thiếu là 0.",
      "C. Ghi log lỗi nội bộ và trả về {\"active_users\": null} đồng thời đặt mã trạng thái HTTP thành 200 Success.",
      "D. Triển khai fallback tự động đặt active_users thành giá trị trung bình lịch sử mỗi khi truy vấn thất bại."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because returning stale cached metrics silently without error signaling misleads operators into assuming current system stability when data is outdated.",
      "Option B is correct because explicitly propagating a structured error with error_type: \"DATABASE_TIMEOUT\" and retryable: true alerts the downstream dashboard agent that a system failure occurred, allowing it to display a degraded status banner or initiate a retry rather than interpreting an empty response as valid zero count.",
      "Option C is incorrect because returning an HTTP 200 status code with null can still cause downstream reporting components to default null values to 0 or crash during numeric aggregation.",
      "Option D is incorrect because generating synthetic metrics from historical averages masks real database infrastructure failures and presents fake operational data to stakeholders."
    ],
    "rationale": "Propagating a structured error payload instead of masking database exceptions with empty objects guarantees downstream components distinguish technical infrastructure failures from legitimate zero metrics.",
    "explanation": "Lựa chọn B là đáp án đúng vì việc lan truyền một payload lỗi có cấu trúc với error_type: \"DATABASE_TIMEOUT\" và retryable: true giúp cảnh báo cho agent dashboard hạ nguồn rằng hệ thống gặp sự cố kỹ thuật, từ đó hiển thị trạng thái cảnh báo thay vì hiểu lầm dữ liệu rỗng thành số liệu 0. Lựa chọn A sai vì việc trả về dữ liệu cache cũ một cách âm thầm làm sai lệch thông tin về độ khả dụng hiện tại. Lựa chọn C sai vì HTTP 200 cùng với giá trị null vẫn có thể bị phía hạ nguồn mặc định chuyển thành 0. Lựa chọn D sai vì việc tự tạo ra số liệu trung bình lịch sử sẽ che giấu sự cố cơ sở dữ liệu thực sự.",
    "scenarioSignature": {
      "testedPrinciple": "explicit error signaling over silent fallbacks",
      "failureMode": "dashboard displays zero metrics confidently during outage",
      "rootCause": "subagent catching exception and returning empty object payload",
      "requiredFix": "propagating structured error payload to indicate component failure"
    },
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  }
]