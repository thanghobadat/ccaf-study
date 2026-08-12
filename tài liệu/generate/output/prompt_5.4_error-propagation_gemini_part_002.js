[
  {
    "id": "d5-b10-5.4-003",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-003",
    "scenarioSignature": {
      "testedPrinciple": "retry idempotency for side effect operations",
      "failureMode": "duplicate customer notifications dispatched during retry",
      "rootCause": "non idempotent network request reexecuted without transaction deduplication key",
      "requiredFix": "attach deterministic idempotency key to payload for request deduplication"
    },
    "questionEN": "During a payment workflow, an AI subagent invokes the send_email tool via REST POST /v1/notifications/send to notify a user of order completion. The network connection drops right after the email service receives the payload but before sending back an HTTP 200 response, throwing an ETIMEDOUT exception. The subagent retries the send_email call without an Idempotency-Key header, causing the email service to send a duplicate confirmation message to the customer. How should the agent pipeline be modified to prevent duplicate notifications during retries?",
    "question": "[d5-b10-5.4-003] Trong một quy trình xử lý thanh toán, một subagent AI gọi tool send_email qua REST POST /v1/notifications/send để thông báo cho người dùng về việc hoàn tất đơn hàng. Kết nối mạng bị ngắt ngay sau khi dịch vụ email nhận payload nhưng trước khi trả về phản hồi HTTP 200, ném ra ngoại lệ ETIMEDOUT. Subagent thử lại (retry) cuộc gọi send_email mà không có header Idempotency-Key, dẫn đến việc dịch vụ email gửi thông báo xác nhận bị trùng lặp cho khách hàng. Pipeline của agent nên được sửa đổi thế nào để ngăn chặn thông báo trùng lặp trong quá trình retry?",
    "optionsEN": [
      "A. Configure the agent retry logic to convert all ETIMEDOUT exceptions into PERMANENT errors so that the tool call fails immediately without any retries.",
      "B. Increase the request timeout on /v1/notifications/send from 5 seconds to 60 seconds to eliminate ETIMEDOUT exceptions completely.",
      "C. Attach a deterministic Idempotency-Key header (such as order_id + step name) to the payload so the email gateway rejects duplicate executions during retries.",
      "D. Suppress ETIMEDOUT exceptions in the subagent handler and return a default status of unknown to the coordinator without executing retries."
    ],
    "options": [
      "A. Cấu hình logic retry của agent để chuyển đổi tất cả ngoại lệ ETIMEDOUT thành lỗi PERMANENT nhằm dừng gọi tool ngay lập tức mà không retry.",
      "B. Tăng timeout của request trên /v1/notifications/send từ 5 giây lên 60 giây để loại bỏ hoàn toàn các ngoại lệ ETIMEDOUT.",
      "C. Đính kèm một header Idempotency-Key mang tính định hình (như order_id + tên bước) vào payload để gateway email từ chối thực thi trùng lặp khi retry.",
      "D. Bắt và ẩn ngoại lệ ETIMEDOUT trong trình xử lý subagent và trả về trạng thái mặc định unknown cho coordinator mà không thực hiện retry."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because converting transient ETIMEDOUT errors into PERMANENT errors prevents automatic recovery from temporary network drops, causing unnecessary workflow failures.",
      "Option B is incorrect because increasing socket timeout to 60 seconds reduces timeout frequency but cannot prevent packet loss or client disconnects, nor does it guarantee idempotency when timeouts do occur.",
      "Option C is correct because attaching a deterministic Idempotency-Key allows the notification service to de-duplicate incoming requests and return the cached result of the initial call without dispatching a second email.",
      "Option D is incorrect because suppressing the exception and returning a default unknown status masks the failure, causing downstream coordinator steps to operate on unconfirmed state."
    ],
    "rationale": "Side-effect tool operations (such as sending emails or processing payments) are inherently non-idempotent. When a network timeout occurs after the remote server processes the request but before sending an HTTP response, retrying the call without a unique deduplication identifier causes duplicate side effects. Providing a deterministic Idempotency-Key header enables the downstream API service to identify retry attempts and safely return the original execution result.",
    "explanation": "Trong thiết kế hệ thống agentic reliability, các tác vụ gây ra tác động phụ (side effects) như send_email cần được đảm bảo tính trùng lặp (idempotency). Khi kết nối mạng bị gián đoạn (ngoại lệ ETIMEDOUT) sau khi máy chủ nhận được request, việc retry không có định danh duy nhất sẽ làm dịch vụ gửi email lần thứ hai.\n\n- Phương án A sai vì việc biến lỗi tạm thời (transient ETIMEDOUT) thành lỗi vĩnh viễn (PERMANENT) sẽ phá vỡ khả năng tự phục hồi của agent khi gặp sự cố mạng ngắn hạn.\n- Phương án B sai vì việc tăng timeout không giải quyết triệt để vấn đề mất gói tin và không đảm bảo an toàn nếu timeout vẫn xảy ra.\n- Phương án C ĐÚNG vì việc sử dụng header Idempotency-Key cho phép dịch vụ phía backend phát hiện request retry và trả về kết quả đã lưu cached mà không thực thi lại hành động gửi email.\n- Phương án D sai vì việc ẩn lỗi và trả về trạng thái mặc định sẽ khiến coordinator nhận thông tin sai lệch về trạng thái thực tế.",
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  },
  {
    "id": "d5-b10-5.4-004",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.4 error-propagation / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.4-004",
    "scenarioSignature": {
      "testedPrinciple": "exponential backoff with jitter for transient retry management",
      "failureMode": "rate limit exhaustion leading to permanent pipeline failure",
      "rootCause": "high frequency tight loop retries without delay or backoff",
      "requiredFix": "implement exponential backoff with randomized delay jitter"
    },
    "questionEN": "An agentic workflow monitors microservice health by calling GET /api/v1/health upon receiving a 503 Service Unavailable status. The retry loop executes immediately without delay, sending 200 retry requests within 10 seconds. The API gateway triggers an IP rate-limiting rule (HTTP 429), resulting in account suspension and a permanent pipeline failure. What is the correct resilience design to handle these transient 503 errors without triggering rate limits?",
    "question": "[d5-b10-5.4-004] Một quy trình agentic giám sát sức khỏe microservice bằng cách gọi GET /api/v1/health khi nhận được trạng thái 503 Service Unavailable. Vòng lặp retry thực thi ngay lập tức mà không có độ trễ, gửi 200 request retry trong vòng 10 giây. API gateway kích hoạt quy tắc giới hạn tốc độ IP (HTTP 429), dẫn đến đình chỉ tài khoản và thất bại pipeline vĩnh viễn. Thiết kế tính khôi phục (resilience design) nào là chính xác để xử lý các lỗi 503 tạm thời này mà không kích hoạt giới hạn tốc độ?",
    "optionsEN": [
      "A. Catch HTTP 429 status codes and immediately escalate the task to a human operator via PagerDuty without retrying.",
      "B. Wrap the GET /api/v1/health call in an un-throttled while-loop that ignores non-200 responses until the microservice recovers.",
      "C. Modify the agent context to strip error payloads so downstream subagents process the 503 Service Unavailable response as a successful ping.",
      "D. Implement exponential backoff with delays starting at 1s and doubling (1s, 2s, 4s, 8s) combined with randomized jitter between retry attempts."
    ],
    "options": [
      "A. Bắt mã trạng thái HTTP 429 và ngay lập tức leo thang tác vụ tới người vận hành qua PagerDuty mà không retry.",
      "B. Bọc cuộc gọi GET /api/v1/health trong một vòng lặp while không giới hạn tốc độ, bỏ qua các phản hồi khác 200 cho đến khi microservice phục hồi.",
      "C. Sửa đổi context của agent để loại bỏ payload lỗi sao cho các subagent hạ nguồn xử lý phản hồi 503 Service Unavailable như một ping thành công.",
      "D. Triển khai exponential backoff với độ trễ bắt đầu từ 1s và tăng gấp đôi (1s, 2s, 4s, 8s) kết hợp với jitter ngẫu nhiên giữa các lần retry."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because immediately escalating HTTP 429 errors to human operators creates alert fatigue without fixing the underlying un-throttled retry policy.",
      "Option B is incorrect because an un-throttled while-loop worsens request congestion against a failing service and guarantees immediate rate limiting.",
      "Option C is incorrect because suppressing error payloads causes silent failures, leading downstream subagents to make invalid decisions based on missing service data.",
      "Option D is correct because exponential backoff (1s, 2s, 4s, 8s) with randomized jitter spaces out retry requests, giving the upstream service time to recover without violating API gateway rate limits."
    ],
    "rationale": "Retrying transient network failures (like HTTP 503) without delay causes retry storms that rapidly consume client rate-limiting quotas (HTTP 429). Implementing exponential backoff progressively increases the wait time between attempts (e.g., 1s, 2s, 4s, 8s), while adding randomized jitter prevents synchronized retry spikes from multiple agent instances.",
    "explanation": "Khi xử lý lỗi mạng tạm thời (transient error như HTTP 503), việc thực hiện retry liên tục trong thời gian ngắn (tight loop retry) sẽ gây ra hiện tượng retry storm, dẫn đến bị API gateway chặn IP do vượt ngưỡng rate limit (HTTP 429).\n\n- Phương án A sai vì việc leo thang lên con người khi bị HTTP 429 gây ra hiện tượng báo động giả (alert fatigue) mà không sửa tận gốc chiến lược retry.\n- Phương án B sai vì vòng lặp while không kiểm soát tốc độ sẽ làm trầm trọng thêm tình trạng quá tải của dịch vụ.\n- Phương án C sai vì loại bỏ payload lỗi sẽ gây ra lỗi ẩn (silent failure), khiến hệ thống hoạt động sai dựa trên dữ liệu không hợp lệ.\n- Phương án D ĐÚNG vì kỹ thuật exponential backoff với độ trễ tăng dần (1s, 2s, 4s, 8s) kết hợp với jitter ngẫu nhiên giúp giãn khoảng cách giữa các lần gọi, giúp dịch vụ có thời gian phục hồi và không vi phạm giới hạn rate limit.",
    "sources": [
      {
        "label": "Lesson 5.4: Error Propagation",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-4-error-propagation"
      }
    ]
  }
]