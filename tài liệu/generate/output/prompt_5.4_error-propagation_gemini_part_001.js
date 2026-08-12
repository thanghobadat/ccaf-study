[
  {
    "id": "d5-b10-5.4-001",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-001",
    "scenarioSignature": {
      "testedPrinciple": "Circuit breaker protection against retry storms on degraded services",
      "failureMode": "High volume retry requests cascading failure to degraded downstream dependency",
      "rootCause": "Lack of circuit breaker mechanism to trip and short-circuit calls during downstream degradation",
      "requiredFix": "Implement circuit breaker to fail fast after consecutive failures and shed load"
    },
    "questionEN": "An automated fraud analysis pipeline uses an LLM coordinator that delegates sub-tasks to PaymentProcessingService via POST /v1/settlements. During a database connection pool exhaustion event, PaymentProcessingService starts returning HTTP 503 Service Unavailable with a latency spike from 45ms to 12,000ms. The coordinator agent is configured with exponential backoff retries but lacks a circuit breaker pattern. As a result, 1,000 concurrent retry attempts flood the degraded service, preventing connection pool recovery and triggering a cascading crash across dependent microservices. Which architectural modification prevents this retry storm while allowing the service time to recover?",
    "question": "[d5-b10-5.4-001] Một đường ống phân tích gian lận tự động sử dụng coordinator LLM để giao nhiệm vụ phụ cho PaymentProcessingService qua endpoint POST /v1/settlements. Trong một sự kiện cạn kiệt connection pool của cơ sở dữ liệu, PaymentProcessingService bắt đầu trả về lỗi HTTP 503 Service Unavailable cùng với độ trễ tăng đột biến từ 45ms lên 12,000ms. Agent coordinator được cấu hình cơ chế thử lại theo lũy thừa (exponential backoff) nhưng thiếu mô hình circuit breaker. Kết quả là 1,000 yêu cầu thử lại đồng thời đã làm quá tải dịch vụ đang suy thoái, ngăn cản sự phục hồi của connection pool và gây ra sự cố sụp đổ dây chuyền (cascading crash) trên các dịch vụ vi mô phụ thuộc. Thay đổi kiến trúc nào sau đây ngăn chặn được cơn bão thử lại (retry storm) này và cho phép dịch vụ có thời gian phục hồi?",
    "optionsEN": [
      "A. Implement a circuit breaker that transitions to an Open state after N consecutive failures, immediately failing fast and shedding load to give the downstream service time to recover.",
      "B. Increase the maximum exponential backoff cap from 8 seconds to 64 seconds so that retries are spaced further apart during high load events.",
      "C. Modify the coordinator to catch HTTP 503 responses and convert them into PERMANENT error classifications so that retries are executed synchronously.",
      "D. Wrap the downstream HTTP requests in jittered linear retries while maintaining the maximum concurrency pool size at 1,000 requests."
    ],
    "options": [
      "A. Triển khai mô hình circuit breaker chuyển sang trạng thái Open sau N lần thất bại liên tiếp, lập tức ngắt lệnh (fail fast) và giảm tải để dịch vụ phía sau có thời gian phục hồi.",
      "B. Tăng giới hạn thời gian chờ tối đa của exponential backoff từ 8 giây lên 64 giây để các lần thử lại được giãn cách xa hơn trong điều kiện tải cao.",
      "C. Chỉnh sửa coordinator để bắt các phản hồi HTTP 503 và chuyển đổi chúng thành phân loại lỗi PERMANENT để các lần thử lại được thực thi đồng bộ.",
      "D. Bọc các yêu cầu HTTP phía sau trong cơ chế thử lại tuyến tính có bổ sung jitter trong khi vẫn giữ nguyên kích thước pool đồng thời ở mức 1,000 yêu cầu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Implementing a circuit breaker pattern allows the coordinator to monitor failure thresholds and transition to an Open state, instantly returning errors without making outbound HTTP calls to PaymentProcessingService. This sheds traffic immediately and allows the database connection pool to recover.",
      "Option B is incorrect: Increasing the backoff cap merely delays individual retry execution times but does not stop aggregate request volume from eventually hitting the degraded service and sustaining connection pool exhaustion.",
      "Option C is incorrect: Reclassifying HTTP 503 transient errors as PERMANENT bypasses retry logic altogether rather than managing recovery gracefully, and executing retries synchronously would block coordinator threads without protecting the downstream dependency.",
      "Option D is incorrect: Adding jitter to linear retries smooths request arrival times slightly but failing to limit concurrent attempts or trip outbound requests ensures that 1,000 retries continue to overwhelm the recovering service."
    ],
    "rationale": "Without a circuit breaker, retrying against an already-degraded dependency creates a retry storm that sustains downstream exhaustion. A circuit breaker trips to an Open state after N failures, short-circuiting requests (failing fast) to shed load and grant the dependency time to clear backlogs and recover.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n\n- Option A (Đúng): Khi dịch vụ phía sau (PaymentProcessingService) bị suy thoái do cạn kiệt connection pool, việc liên tục gửi yêu cầu thử lại sẽ tạo ra bão thử lại (retry storm). Mô hình circuit breaker theo dõi số lỗi liên tiếp và chuyển sang trạng thái Open khi vượt ngưỡng N lỗi. Khi ở trạng thái Open, mọi yêu cầu mới sẽ báo lỗi ngay lập tức (fail fast) mà không gửi request thực tế qua mạng, giúp hạ tải hoàn toàn và cho phép hệ thống phía sau giải phóng tài nguyên để phục hồi.\n- Option B (Sai): Tăng thời gian chờ tối đa của exponential backoff chỉ làm giãn khoảng cách giữa các lần thử lại của từng request riêng lẻ nhưng không giảm tổng lưu lượng truy cập tích tụ đang đè nặng lên dịch vụ.\n- Option C (Sai): Chuyển lỗi HTTP 503 thành PERMANENT sẽ hủy bỏ hoàn toàn khả năng tự phục hồi của tác vụ transient error, đồng thời việc chạy thử lại đồng bộ sẽ gây nghẽn luồng xử lý của coordinator mà không giúp hạ tải dịch vụ.\n- Option D (Sai): Thêm jitter vào thử lại tuyến tính chỉ hỗ trợ rải đều thời điểm gửi request để tránh hiện tượng thắt nút cổ chai đồng thời (thundering herd), nhưng nếu duy trì 1,000 kết nối đồng thời mà không ngắt mạch thì vẫn tiếp tục làm sụp đổ connection pool đang phục hồi.",
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  },
  {
    "id": "d5-b10-5.4-002",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-002",
    "questionEN": "A multi-agent market intelligence platform deploys five parallel subagents to analyze different financial sectors using the SubagentTaskResult schema (agent_id, status, payload, error_details). During execution, 3 out of 5 subagents encounter HTTP 504 Gateway Timeout errors due to third-party API rate limits and return status: \"FAILED\". The remaining 2 subagents successfully complete their analysis and return populated payload objects. However, the MarketIntelligenceCoordinator throws an uncaught AggregateExecutionException, discards the 2 valid subagent payloads, and aborts the entire workflow with a zero-result output. Which implementation adjustment enables the coordinator to preserve partial progress and safely complete the report?",
    "question": "[d5-b10-5.4-002] Một nền tảng phân tích thị trường đa agent triển khai 5 subagent song song để phân tích các lĩnh vực tài chính khác nhau dựa trên schema SubagentTaskResult (agent_id, status, payload, error_details). Trong quá trình thực thi, 3 trong số 5 subagent gặp lỗi HTTP 504 Gateway Timeout do vượt giới hạn tốc độ API của bên thứ ba và trả về status: \"FAILED\". 2 subagent còn lại hoàn thành phân tích thành công và trả về các đối tượng payload có đầy đủ dữ liệu. Tuy nhiên, MarketIntelligenceCoordinator lại kích hoạt ngoại lệ AggregateExecutionException không được xử lý, loại bỏ dữ liệu từ 2 subagent thành công và hủy bỏ toàn bộ quy trình làm việc khiến kết quả trả về bằng rỗng. Điều chỉnh triển khai nào giúp coordinator giữ lại tiến trình một phần và hoàn thành báo cáo một cách an toàn?",
    "optionsEN": [
      "A. Configure the coordinator to automatically retry all 5 subagents in a single batch whenever any subagent returns an HTTP 504 error code.",
      "B. Implement partial result aggregation in the coordinator to harvest completed subagent payloads, set partial_success: true, and attach error context for the 3 failed subagents.",
      "C. Suppress all subagent exceptions in the worker nodes and return empty payload objects so the coordinator perceives a 100% success rate.",
      "D. Increase the subagent execution timeout limit to 300 seconds to guarantee that all 5 subagents finish before the coordinator evaluates results."
    ],
    "options": [
      "A. Cấu hình coordinator để tự động thử lại toàn bộ 5 subagent theo batch duy nhất bất cứ khi nào có bất kỳ subagent nào trả về mã lỗi HTTP 504.",
      "B. Triển khai cơ chế gom nhóm kết quả một phần (partial result aggregation) trong coordinator để thu thập các payload subagent đã hoàn thành, gắn cờ partial_success: true và đính kèm ngữ cảnh lỗi cho 3 subagent bị thất bại.",
      "C. Nuốt tất cả ngoại lệ của subagent tại các nút worker và trả về các đối tượng payload rỗng để coordinator ghi nhận tỉ lệ thành công 100%.",
      "D. Tăng giới hạn thời gian chờ thực thi của subagent lên 300 giây để đảm bảo cả 5 subagent đều hoàn tất trước khi coordinator đánh giá kết quả."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Retrying all 5 subagents in a single batch re-executes operations that already succeeded, increasing latency and API costs without resolving the root cause of discarding partial results.",
      "Option B is correct: Implementing partial result aggregation allows the coordinator to extract valid payloads from successful subagents, mark the report with partial execution flags, and log failure context for uncompleted branches instead of aborting completely.",
      "Option C is incorrect: Suppressing exceptions and returning empty payloads creates silent failures, leading downstream analysis systems to interpret missing data as valid zero-value findings.",
      "Option D is incorrect: Increasing timeouts does not address the architectural failure of all-or-nothing error handling when external subagents suffer persistent HTTP 504 timeouts."
    ],
    "rationale": "When parallel subagents operate independently, an all-or-nothing failure policy wastes valid work. Implementing partial result aggregation allows the coordinator to extract available data payloads, set explicit partial success metadata, and preserve useful outputs despite individual subagent failures.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n\\n- Option A (Sai): Việc thử lại toàn bộ 5 subagent theo batch sẽ ép các subagent đã thành công phải chạy lại từ đầu, gây lãng phí tài nguyên, tăng độ trễ và có nguy cơ chạm rào cản rate limit của API bên thứ ba nhiều hơn.\\n- Option B (Đúng): Trong kiến trúc phân tán nhiều subagent song song, mô hình xử lý lỗi kiên cường (resilience pattern) yêu cầu áp dụng chiến lược gom nhóm kết quả một phần (partial result aggregation). Coordinator thu thập dữ liệu hợp lệ từ 2 subagent thành công, đánh dấu trạng thái partial_success: true trong báo cáo đầu ra và ghi nhận ngữ cảnh lỗi của 3 subagent thất bại, tránh lãng phí công việc đã hoàn thành.\\n- Option C (Sai): Nuốt ngoại lệ và trả về payload rỗng sẽ tạo ra lỗi im lặng (silent failure), khiến các hệ thống tiêu thụ dữ liệu phía sau nhầm tưởng dữ liệu rỗng là kết quả phân tích thực tế.\\n- Option D (Sai): Tăng thời gian chờ (timeout) không giải quyết triệt để vấn đề kiến trúc của việc hủy bỏ tất cả khi có lỗi partial failure, đặc biệt khi API bên thứ ba gặp sự cố sụp đổ kéo dài.",
    "scenarioSignature": {
      "testedPrinciple": "Partial result aggregation and error reporting in multi-agent orchestration",
      "failureMode": "All-or-nothing pipeline abort discarding successful parallel execution outputs",
      "rootCause": "Coordinator exception handler dropping valid subagent payloads upon partial failure",
      "requiredFix": "Aggregate successful subagent outputs and propagate partial results alongside failure context"
    },
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  }
]