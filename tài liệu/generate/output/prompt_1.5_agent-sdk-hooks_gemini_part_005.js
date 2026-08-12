[
  {
    "id": "d1-b03-1.5-009",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-009",
    "scenarioSignature": {
      "testedPrinciple": "PreToolUse hook chain execution order and short-circuit evaluation",
      "failureMode": "Unexpected short-circuiting of subsequent hook evaluations",
      "rootCause": "Sequential execution of hooks in registration order where the first blocking hook halts the chain",
      "requiredFix": "Evaluate hook registration order to ensure critical validation hooks run first"
    },
    "questionEN": "An enterprise financial agent pipeline, FinData-Agent, registers three PreToolUse lifecycle hooks in the SDK harness in the following exact sequence: InputSanitizerHook (1st), TenantQuotaHook (2nd), and RBACPolicyHook (3rd). During a tool call invocation to query_financial_db with payload {\"tenant_id\": \"t_4091\", \"query_payload\": \"SELECT * FROM transactions WHERE id=1; DROP TABLE logs;\"}, the payload contains a forbidden SQL injection pattern (violating InputSanitizerHook) and tenant t_4091 also exceeds its API rate limit (violating TenantQuotaHook). Which hook is executed first by the framework runtime, and what is the resulting behavior of the hook execution chain?",
    "question": "[d1-b03-1.5-009] Một pipeline agent tài chính doanh nghiệp, FinData-Agent, đăng ký ba hook vòng đời PreToolUse trong SDK harness theo đúng thứ tự sau: InputSanitizerHook (thứ 1), TenantQuotaHook (thứ 2), và RBACPolicyHook (thứ 3). Trong một lời gọi công cụ đến query_financial_db với payload {\"tenant_id\": \"t_4091\", \"query_payload\": \"SELECT * FROM transactions WHERE id=1; DROP TABLE logs;\"}, payload vừa chứa mẫu SQL injection bị cấm (vi phạm InputSanitizerHook) vừa vượt quá giới hạn API của tenant t_4091 (vi phạm TenantQuotaHook). Hook nào được runtime của framework thực thi đầu tiên và hành vi kết quả của chuỗi thực thi hook này là gì?",
    "optionsEN": [
      "A. InputSanitizerHook executes first because PreToolUse hooks run sequentially in registration order; since it returns a block decision, TenantQuotaHook and RBACPolicyHook are short-circuited and the tool execution is halted immediately.",
      "B. TenantQuotaHook executes first because rate-limiting hooks are assigned higher internal framework priority over validation hooks regardless of registration order.",
      "C. RBACPolicyHook executes first because authorization policy checks run asynchronously prior to input sanitization in standard SDK tool execution hooks.",
      "D. All three hooks execute concurrently in parallel worker threads, and the framework aggregates their return errors into a combined validation exception."
    ],
    "options": [
      "A. InputSanitizerHook thực thi đầu tiên vì các hook PreToolUse chạy tuần tự theo thứ tự đăng ký; vì nó trả về quyết định chặn (block), TenantQuotaHook và RBACPolicyHook bị ngắt mạch (short-circuited) và việc thực thi công cụ bị dừng ngay lập tức.",
      "B. TenantQuotaHook thực thi đầu tiên vì các hook giới hạn tốc độ được gán ưu tiên nội bộ khung cao hơn các hook xác thực bất kể thứ tự đăng ký.",
      "C. RBACPolicyHook thực thi đầu tiên vì các kiểm tra phân quyền chạy bất đồng bộ trước khi làm sạch dữ liệu đầu vào trong các hook thực thi công cụ SDK tiêu chuẩn.",
      "D. Cả ba hook thực thi đồng thời trong các luồng worker song song và framework tổng hợp các lỗi trả về của chúng thành một ngoại lệ xác thực kết hợp."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because SDK PreToolUse hooks are executed synchronously in the exact order they were registered. The first hook (InputSanitizerHook) runs first, detects the SQL injection payload, and returns a block result, which immediately short-circuits the remaining hooks (TenantQuotaHook, RBACPolicyHook) and prevents tool invocation.",
      "Option B is incorrect because standard Agent SDKs do not dynamically reorder hooks based on implicit feature types like rate limiting; registration order dictates execution hierarchy.",
      "Option C is incorrect because RBAC policy hooks do not execute out of order or asynchronously before sanitization unless explicitly registered first in the chain.",
      "Option D is incorrect because PreToolUse hooks in standard agent frameworks run in a sequential lifecycle chain to allow deterministic parameter mutation and short-circuiting, rather than parallel execution."
    ],
    "rationale": "In Agent SDK hook architecture, multiple PreToolUse hooks form a sequential processing pipeline ordered by registration. When the first hook returns a blocking status or error, the execution chain short-circuits, preventing subsequent hooks from firing and blocking the target tool call.",
    "explanation": "Trong kiến trúc hook của Agent SDK, khi nhiều hook PreToolUse được đăng ký, framework sẽ thực thi chúng theo đúng thứ tự đăng ký (registration order). Hook đầu tiên trong chuỗi (InputSanitizerHook) sẽ chạy trước. Khi hook này phát hiện truy vấn không an toàn và trả về kết quả chặn (block), framework sẽ ngay lập tức ngắt mạch (short-circuit) chuỗi thực thi. Do đó, các hook phía sau (TenantQuotaHook và RBACPolicyHook) không được triệu gọi và công cụ query_financial_db bị hủy thực thi.\n\n- Lựa chọn A đúng vì phản ánh chính xác nguyên tắc thực thi tuần tự theo thứ tự đăng ký và cơ chế short-circuit khi hook trước chặn thành công.\n- Lựa chọn B sai vì SDK không tự sắp xếp lại ưu tiên của hook dựa trên tính năng (như rate limit) ngoại trừ thứ tự đã đăng ký.\n- Lựa chọn C sai vì hook kiểm tra phân quyền không tự động chạy trước hay chạy bất đồng bộ nếu nó được đăng ký ở vị trí thứ 3.\n- Lựa chọn D sai vì các hook PreToolUse không chạy song song bất đồng bộ, mà chạy tuần tự để đảm bảo tính xác định và cho phép chỉnh sửa tham số/chặn theo quy trình.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  },
  {
    "id": "d1-b03-1.5-010",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-010",
    "scenarioSignature": {
      "testedPrinciple": "SDK hook unhandled exception propagation and agent execution failure",
      "failureMode": "Agent invocation crash and tool execution suppression",
      "rootCause": "Unhandled exception thrown inside PreToolUse hook callback bubbling up to SDK harness",
      "requiredFix": "Wrap hook logic in exception handling block returning explicit hook error result"
    },
    "questionEN": "An autonomous warehouse management agent, LogiRoute-Agent, uses a custom PreToolUse hook named ValidateWarehouseLocation to inspect tool calls to dispatch_shipment with payload {\"warehouse_id\": \"wh_7812\", \"sku\": \"item_9921\"}. When the external location validation API service drops and returns a 503 Service Unavailable error, ValidateWarehouseLocation throws an unhandled ConnectionError exception. Instead of catching the error and returning a structured HookResult.block(\"Service unavailable\"), the uncaught exception escapes the hook callback. What is the immediate impact on the agent lifecycle execution?",
    "question": "[d1-b03-1.5-010] Một agent quản lý kho vận tự động, LogiRoute-Agent, cấu hình một hook PreToolUse tùy chỉnh tên là ValidateWarehouseLocation để kiểm tra các lời gọi công cụ đến dispatch_shipment với payload {\"warehouse_id\": \"wh_7812\", \"sku\": \"item_9921\"}. Khi dịch vụ API tra cứu vị trí bên ngoài gặp sự cố và phản hồi lỗi 503 Service Unavailable, ValidateWarehouseLocation ném ra một ngoại lệ ConnectionError không được xử lý (unhandled). Thay vì bắt ngoại lệ và trả về HookResult.block(\"Service unavailable\") có cấu trúc, ngoại lệ không được xử lý này thoát ra khỏi callback của hook. Tác động trực tiếp đến vòng đời thực thi của agent là gì?",
    "optionsEN": [
      "A. The SDK framework automatically catches the unhandled exception, bypasses the failing hook, and executes dispatch_shipment with default parameters.",
      "B. The unhandled exception inside the PreToolUse hook bubbles up to the SDK execution loop, causing the framework to crash the agent execution turn and prevent dispatch_shipment from running.",
      "C. The tool dispatch_shipment executes normally, but the SDK automatically converts the hook exception into a PostToolUse audit entry.",
      "D. The LLM receives the raw Python exception traceback directly in its context window as a successful tool response and continues generating the next tool call."
    ],
    "options": [
      "A. SDK framework tự động bắt ngoại lệ không được xử lý, bỏ qua hook bị lỗi và thực thi dispatch_shipment với các tham số mặc định.",
      "B. Ngoại lệ không được xử lý bên trong hook PreToolUse lan truyền lên vòng lặp thực thi của SDK, khiến framework làm sập lượt thực thi (turn) của agent và ngăn dispatch_shipment chạy.",
      "C. Công cụ dispatch_shipment vẫn thực thi bình thường, nhưng SDK tự động chuyển đổi ngoại lệ của hook thành một bản ghi nhật ký kiểm toán PostToolUse.",
      "D. LLM nhận được traceback ngoại lệ Python thô trực tiếp trong cửa sổ ngữ cảnh dưới dạng phản hồi công cụ thành công và tiếp tục tạo lời gọi công cụ tiếp theo."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because SDK harnesses prioritize security and compliance integrity; they never silently ignore unhandled hook exceptions to execute tools with default options.",
      "Option B is correct because uncaught runtime exceptions in lifecycle hooks break the execution loop of the SDK harness, causing the agent turn to fail immediately and suppressing the execution of dispatch_shipment.",
      "Option C is incorrect because a failure in PreToolUse prevents the tool from executing in the first place, meaning no PostToolUse phase is ever reached or logged.",
      "Option D is incorrect because uncaught exceptions at the framework level halt the orchestrator process rather than formatting the traceback into a standard tool execution result message for the model."
    ],
    "rationale": "Agent SDK hooks run within the framework runtime context. An unhandled exception inside a PreToolUse hook interrupts the control flow, causing the framework execution engine to abort the current turn and preventing tool execution entirely. Developers must catch external service exceptions inside hooks and return explicit blocking responses.",
    "explanation": "Trong kiến trúc Agent SDK, các lifecycle hook chạy trực tiếp trong luồng điều khiển của framework harness. Nếu một hook PreToolUse ném ra ngoại lệ không được xử lý (unhandled exception), ngoại lệ này sẽ lan truyền (bubble up) lên vòng lặp thực thi chính của SDK. Điều này khiến toàn bộ lượt thực thi (turn) của agent bị hỏng và công cụ dispatch_shipment bị hủy chạy hoàn toàn.\n\n- Lựa chọn A sai vì SDK không tự động bỏ qua các lỗi kiểm soát an toàn/xác thực không được xử lý để cho phép công cụ chạy bừa bãi.\n- Lựa chọn B đúng vì giải thích chính xác hậu quả của việc không bắt ngoại lệ trong callback hook: làm gián đoạn vòng đời thực thi SDK và sập lượt chạy của agent.\n- Lựa chọn C sai vì công cụ đã không được thực thi thì giai đoạn PostToolUse sẽ không bao giờ được kích hoạt.\n- Lựa chọn D sai vì lỗi ngoại lệ ở mức framework làm hỏng tiến trình orchestrator chứ không được biến đổi thành một chuỗi kết quả công cụ thành công trả về cho LLM.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  }
]