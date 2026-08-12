[
  {
    "id": "d1-b03-1.5-003",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-003",
    "scenarioSignature": {
      "testedPrinciple": "PreToolUse authorization and audit lifecycle hooks",
      "failureMode": "Unauthorized PHI data access before compliance evaluation",
      "rootCause": "Post-execution callback or probabilistic prompt gate instead of pre-execution lifecycle interceptor",
      "requiredFix": "Register PreToolUse hook to log access and block unauthorized tool execution"
    },
    "questionEN": "An enterprise medical application, HealthPulse-AI, uses an Agent SDK to process patient queries. When accessing protected health information (PHI) via the tool fetch_patient_record(patient_id, requester_role), compliance requires logging all access attempts and immediately blocking calls where requester_role lacks HIPAA authorization. In initial testing, an unauthorized user with role billing_clerk triggered fetch_patient_record, and the sensitive patient record was transmitted to the model before a compliance error was raised. How should the engineering team reconfigure the SDK callback architecture to enforce zero-trust access control and complete audit logging?",
    "question": "[d1-b03-1.5-003] Một ứng dụng y tế doanh nghiệp, HealthPulse-AI, sử dụng Agent SDK để xử lý các truy vấn của bệnh nhân. Khi truy cập thông tin sức khỏe được bảo vệ (PHI) qua công cụ fetch_patient_record(patient_id, requester_role), quy định tuân thủ yêu cầu phải ghi log mọi lần truy cập và chặn ngay lập tức các lệnh gọi nếu requester_role không có quyền HIPAA. Trong đợt kiểm thử ban đầu, một người dùng không có quyền với vai trò billing_clerk đã kích hoạt fetch_patient_record, và hồ sơ bệnh nhân nhạy cảm đã bị truyền tới mô hình trước khi ngoại lệ tuân thủ được nâng lên. Đội ngũ kỹ thuật nên cấu hình lại kiến trúc callback của SDK như thế nào để thực thi kiểm soát truy cập zero-trust và ghi log kiểm toán đầy đủ?",
    "optionsEN": [
      "A. Attach a PostToolUse hook that inspects requester_role and throws a PermissionDeniedError if the user is unauthorized.",
      "B. Update system prompt instructions directing the model to evaluate user role permissions before calling fetch_patient_record.",
      "C. Register a PreToolUse hook that logs the access attempt, inspects requester_role, and cancels tool execution if HIPAA authorization criteria are not met.",
      "D. Implement inline authorization checks inside the main API router prior to initializing the Agent SDK execution harness."
    ],
    "options": [
      "A. Gắn một hook PostToolUse để kiểm tra requester_role và ném ra PermissionDeniedError nếu người dùng không được cấp quyền.",
      "B. Cập nhật hướng dẫn system prompt chỉ định mô hình tự đánh giá quyền của vai trò người dùng trước khi gọi fetch_patient_record.",
      "C. Đăng ký một hook PreToolUse để ghi log nỗ lực truy cập, kiểm tra requester_role, và hủy thực thi công cụ nếu không đạt tiêu chuẩn phân quyền HIPAA.",
      "D. Triển khai các kiểm tra phân quyền nội hàm (inline) bên trong API router chính trước khi khởi tạo execution harness của Agent SDK."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because PostToolUse hooks execute after fetch_patient_record has already retrieved PHI from the database and transmitted it, failing to prevent the HIPAA data breach.",
      "Option B is incorrect because system prompt instructions are non-deterministic, allowing the agent to bypass role checks under complex multi-step reasoning.",
      "Option C is correct because a PreToolUse hook intercepts execution before fetch_patient_record runs, allowing deterministic audit logging and immediate blocking of unauthorized roles.",
      "Option D is incorrect because router-level checks run prior to harness initialization and cannot intercept autonomous tool calls generated dynamically during agent execution."
    ],
    "rationale": "HIPAA compliance requires deterministic access control and auditing before sensitive PHI is accessed. Only a PreToolUse hook executes prior to tool execution, providing the ability to log the request parameters and abort execution if requester_role is unauthorized. PostToolUse callbacks run after execution when data has already been fetched, while prompt instructions lack deterministic enforcement.",
    "explanation": "Lựa chọn C là đáp án đúng vì hook PreToolUse chạy TRƯỚC KHI công cụ fetch_patient_record được thực thi. Điều này cho phép SDK kiểm tra requester_role một cách định tính, ghi log yêu cầu truy cập và ngăn chặn lệnh gọi trước khi dữ liệu y tế nhạy cảm (PHI) bị truy xuất từ cơ sở dữ liệu.\nLựa chọn A sai vì PostToolUse chỉ chạy SAU KHI công cụ đã thực thi xong; lúc này dữ liệu PHI đã bị đọc và gửi về mô hình, không thể ngăn chặn vi phạm tuân thủ HIPAA.\nLựa chọn B sai vì câu lệnh prompt có tính xác suất (probabilistic), agent vẫn có thể bỏ qua quy tắc phân quyền trong các chuỗi suy luận phức tạp.\nLựa chọn D sai vì việc kiểm tra ở router chỉ diễn ra ở cấp độ khởi tạo yêu cầu ban đầu, không thể can thiệp vào các công cụ được agent gọi một cách tự động trong suốt quá trình suy luận.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  },
  {
    "id": "d1-b03-1.5-004",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-004",
    "scenarioSignature": {
      "testedPrinciple": "PreToolUse lifecycle rate limiting and outbound request throttling",
      "failureMode": "Third-party API rate limit exhaustion and HTTP 429 errors",
      "rootCause": "Executing unthrottled outbound tool calls without pre-execution frequency control",
      "requiredFix": "Register PreToolUse hook to enforce token-bucket rate limits before tool execution"
    },
    "questionEN": "A financial analytics platform, FinData-Stream, deploys an autonomous agent that queries high-frequency market depth using the tool query_market_depth(ticker, depth_level). The external data provider strictly enforces a rate limit of 50 requests per minute, returning HTTP 429 Too Many Requests and temporarily banning the API key when exceeded. During peak market volatility, the agent executes query_market_depth repeatedly in a rapid reasoning loop, triggering an HTTP 429 lockout. How should the team configure the Agent SDK harness to prevent request throttling without modifying the agent's core model prompt?",
    "question": "[d1-b03-1.5-004] Một nền tảng phân tích tài chính, FinData-Stream, triển khai một agent tự động truy vấn độ sâu thị trường tần suất cao bằng công cụ query_market_depth(ticker, depth_level). Nhà cung cấp dữ liệu bên ngoài thực thi nghiêm ngặt giới hạn tốc độ 50 yêu cầu/phút, trả về HTTP 429 Too Many Requests và tạm thời khóa API key nếu vượt quá. Trong giai đoạn thị trường biến động mạnh, agent liên tục thực thi query_market_depth trong một vòng lặp suy luận nhanh, dẫn đến sự cố bị khóa do HTTP 429. Đội ngũ phát triển nên cấu hình Agent SDK harness như thế nào để ngăn chặn giới hạn tốc độ mà không cần sửa đổi prompt cốt lõi của agent?",
    "optionsEN": [
      "A. Register a PostToolUse hook that catches HTTP 429 error responses from query_market_depth and executes an exponential backoff retry.",
      "B. Modify the system prompt to explicitly instruct the agent to wait 1.2 seconds between consecutive invocations of query_market_depth.",
      "C. Deploy an external proxy server between the agent harness and the API provider to return stale cached market data when request volume spikes.",
      "D. Register a PreToolUse hook attached to query_market_depth that evaluates a token-bucket rate limiter and delays or halts execution before sending outbound requests."
    ],
    "options": [
      "A. Đăng ký một hook PostToolUse để bắt phản hồi lỗi HTTP 429 từ query_market_depth và thực thi chiến lược thử lại với exponential backoff.",
      "B. Sửa đổi system prompt để hướng dẫn rõ ràng agent tạm dừng 1,2 giây giữa các lần gọi liên tiếp công cụ query_market_depth.",
      "C. Triển khai một proxy server trung gian giữa agent harness và nhà cung cấp API để trả về dữ liệu thị trường cũ từ cache khi lưu lượng yêu cầu tăng đột biến.",
      "D. Đăng ký một hook PreToolUse gắn với query_market_depth để kiểm tra bộ giới hạn tốc độ token-bucket và trì hoãn hoặc dừng thực thi trước khi gửi yêu cầu ra ngoài."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because PostToolUse hooks handle responses after the API request has already hit the remote provider and triggered the rate-limit penalty.",
      "Option B is incorrect because system prompts cannot deterministically guarantee timing intervals or sliding-window rate limit state across dynamic execution loops.",
      "Option C is incorrect because external caching hides rate limits at the network layer without throttling the agent's internal tool invocation frequency or addressing quota exhaustion.",
      "Option D is correct because a PreToolUse hook intercepts query_market_depth prior to execution, enforcing token-bucket rate limits deterministically before outbound network calls occur."
    ],
    "rationale": "Preventing external API rate limit penalties (HTTP 429) requires inspecting and throttling tool calls before network transmission. A PreToolUse hook integrates directly into the SDK tool execution pipeline to check rate limiter state (e.g., token bucket) and delay or block calls before query_market_depth runs. PostToolUse hooks fire after the error has already occurred.",
    "explanation": "Lựa chọn D là đáp án đúng vì hook PreToolUse can thiệp trực tiếp trước khi công cụ query_market_depth gửi yêu cầu ra mạng bên ngoài. Bằng cách tích hợp thuật toán token-bucket hoặc sliding-window vào PreToolUse hook, hệ thống có thể tạm dừng hoặc hoãn việc thực thi công cụ một cách xác định nhằm tuân thủ giới hạn 50 yêu cầu/phút.\nLựa chọn A sai vì PostToolUse chỉ hoạt động khi yêu cầu đã được gửi đi và lỗi HTTP 429 đã xảy ra ở phía server bên ngoài, dẫn đến API key đã bị khóa.\nLựa chọn B sai vì prompt không thể kiểm soát chính xác khoảng thời gian tính bằng miligiây hoặc duy trì trạng thái đếm số lượng yêu cầu trong cửa sổ thời gian (window rate limit).\nLựa chọn C sai vì proxy caching chỉ che giấu dữ liệu cũ ở tầng mạng nhưng không giải quyết được việc kiểm soát chu kỳ thực thi công cụ bên trong của agent.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  }
]