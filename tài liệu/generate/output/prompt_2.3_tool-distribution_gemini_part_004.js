[
  {
    "id": "d2-b04-2.3-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.3 tool-distribution / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.3-007",
    "scenarioSignature": {
      "testedPrinciple": "dynamic contextual tool distribution during system maintenance",
      "failureMode": "failed write tool calls during scheduled backend maintenance window",
      "rootCause": "static tool registry exposing write capabilities regardless of backend state",
      "requiredFix": "filter out write tools from tool list response during maintenance mode"
    },
    "questionEN": "An enterprise e-commerce platform StorefrontMCP sets sys_status = MAINTENANCE on its database cluster during nightly backups. During this 30-minute window, the AI assistant InventorySyncAgent is still served its standard tool list containing update_stock_level(item_id: string, quantity: int). When user queries trigger stock modifications during maintenance, the tool fails with ERR_DB_LOCKED_MAINTENANCE and HTTP 500 errors, causing agent retry cascades. Which architectural pattern prevents the agent from attempting write operations during maintenance?",
    "question": "[d2-b04-2.3-007] Nền tảng thương mại điện tử StorefrontMCP thiết lập trạng thái sys_status = MAINTENANCE trên cụm cơ sở dữ liệu trong quá trình sao lưu hàng đêm. Trong khoảng thời gian 30 phút này, trợ lý AI InventorySyncAgent vẫn nhận được danh sách công cụ tiêu chuẩn chứa update_stock_level(item_id: string, quantity: int). Khi các truy vấn của người dùng kích hoạt việc chỉnh sửa kho trong lúc bảo trì, công cụ thất bại với lỗi ERR_DB_LOCKED_MAINTENANCE và mã HTTP 500, gây ra chuỗi thử lại thất bại của agent. Mẫu kiến trúc nào ngăn agent thực hiện các thao tác ghi trong thời gian bảo trì?",
    "optionsEN": [
      "A. Configure InventorySyncAgent to retry update_stock_level using exponential backoff whenever ERR_DB_LOCKED_MAINTENANCE occurs.",
      "B. Add prompt instructions directing InventorySyncAgent to invoke get_system_status and check sys_status before calling update_stock_level.",
      "C. Implement dynamic tool discovery where the MCP server filters out write tools like update_stock_level from tools/list responses while in maintenance mode.",
      "D. Configure an in-memory queue fallback inside update_stock_level to buffer write payloads without changing the exposed tool list."
    ],
    "options": [
      "A. Cấu hình InventorySyncAgent thử lại update_stock_level bằng exponential backoff bất cứ khi nào xảy ra lỗi ERR_DB_LOCKED_MAINTENANCE.",
      "B. Thêm hướng dẫn prompt chỉ định InventorySyncAgent gọi get_system_status và kiểm tra sys_status trước khi gọi update_stock_level.",
      "C. Triển khai cơ chế phát hiện công cụ động (dynamic tool discovery) trong đó MCP server lọc bỏ các công cụ ghi như update_stock_level khỏi phản hồi tools/list khi ở chế độ bảo trì.",
      "D. Cấu hình hàng đợi bộ nhớ tạm fallback bên trong update_stock_level để lưu các tham số ghi mà không thay đổi danh sách công cụ được cung cấp."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A (retry logic): Retrying write calls during an active database maintenance window fails repeatedly, depleting connection pools and increasing latency.",
      "Option B (prompt instructions): Relying on prompt instructions to check system state relies on LLM compliance, which can be bypassed or ignored under complex user prompts.",
      "Option C (dynamic tool discovery): Dynamically omitting write tools from tools/list during maintenance strictly enforces read-only access at the protocol layer, preventing write attempts entirely.",
      "Option D (in-memory buffer): Buffering writes silently introduces data inconsistency between reported and actual inventory without resolving the root cause of exposing invalid tools."
    ],
    "rationale": "Dynamic tool distribution allows the MCP server to alter the exposed tool schema based on operational context (e.g., system maintenance windows). By excluding write tools from the tools/list response when sys_status = MAINTENANCE, the model only sees read-only capabilities, avoiding execution failures and error cascades.",
    "explanation": "Lựa chọn C chính xác vì triển khai dynamic tool discovery cho phép MCP server thay đổi danh sách công cụ được cung cấp dựa trên ngữ cảnh vận hành của hệ thống. Khi cơ sở dữ liệu ở chế độ bảo trì (sys_status = MAINTENANCE), việc lọc bỏ các công cụ ghi như update_stock_level khỏi kết quả trả về của tools/list sẽ ngăn LLM nhìn thấy và gọi các công cụ này ở cấp độ giao thức.\n\nLựa chọn A không đúng vì việc thử lại (retry) trong suốt cửa sổ bảo trì sẽ chỉ gây lãng phí tài nguyên và tạo ra các chuỗi lỗi lặp đi lặp lại.\nLựa chọn B không đúng vì phụ thuộc vào prompt để kiểm tra trạng thái hệ thống không đảm bảo tính tuân thủ tuyệt đối của LLM và vẫn để lộ công cụ ghi nguy hiểm.\nLựa chọn D không đúng vì việc lưu đệm ghi âm thầm gây sai lệch trạng thái dữ liệu kho hàng giữa thực tế và giao diện hiển thị cho người dùng.",
    "sources": [
      {
        "label": "Lesson 2.3: Tool Distribution",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-3-tool-distribution"
      }
    ]
  },
  {
    "id": "d2-b04-2.3-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.3 tool-distribution / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.3-008",
    "scenarioSignature": {
      "testedPrinciple": "disjoint write tool assignments across subagents",
      "failureMode": "concurrent database record overwrites and state corruption",
      "rootCause": "multiple subagents provisioned with write tools to the same table",
      "requiredFix": "restrict write tools to a single dedicated managing agent"
    },
    "questionEN": "In OrderFulfillmentSystem, two parallel subagents—PaymentSettlementAgent and WarehouseDispatchAgent—are both provisioned with the write tool update_order_status(order_id: string, status: string) modifying customer_orders. During peak load, concurrent updates to the same order_id cause race conditions where WarehouseDispatchAgent overwrites SHIPPED back to PROCESSING, triggering duplicate shipments and PostgreSQL SQLState 40001 serialization errors. Which architectural change resolves this race condition?",
    "question": "[d2-b04-2.3-008] Trong OrderFulfillmentSystem, hai subagent chạy song song—PaymentSettlementAgent và WarehouseDispatchAgent—đều được cấp công cụ ghi update_order_status(order_id: string, status: string) sửa đổi bảng customer_orders. Trong thời gian cao điểm, các cập nhật đồng thời cho cùng một order_id gây ra race condition khiến WarehouseDispatchAgent ghi đè trạng thái SHIPPED ngược về PROCESSING, kích hoạt giao hàng trùng lặp và lỗi PostgreSQL SQLState 40001 serialization. Thay đổi kiến trúc nào giải quyết tình trạng race condition này?",
    "optionsEN": [
      "A. Implement a distributed mutex lock inside update_order_status forcing subagents to wait sequentially during execution.",
      "B. Elevate database isolation levels to SERIALIZABLE so concurrent tool writes automatically abort and retry until success.",
      "C. Introduce an optimistic locking field version_id to customer_orders and require subagents to pass version_id in update_order_status.",
      "D. Enforce disjoint tool assignment by revoking update_order_status from PaymentSettlementAgent and channeling all status updates through a single dedicated status coordinator agent."
    ],
    "options": [
      "A. Triển khai distributed mutex lock bên trong update_order_status bắt các subagent phải chờ đợi tuần tự trong quá trình thực thi.",
      "B. Nâng mức cô lập cơ sở dữ liệu lên SERIALIZABLE để các thao tác ghi đồng thời tự động hủy và thử lại cho đến khi thành công.",
      "C. Thêm trường optimistic locking version_id vào customer_orders và yêu cầu các subagent truyền version_id trong update_order_status.",
      "D. Áp dụng nguyên tắc tập công cụ rời rạc (disjoint tool assignment) bằng cách thu hồi update_order_status khỏi PaymentSettlementAgent và định tuyến tất cả cập nhật qua một status coordinator agent chuyên trách duy nhất."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A (distributed lock): Distributed locks manage execution timing but preserve shared write permissions across subagents, leading to potential deadlocks and performance bottlenecks.",
      "Option B (SERIALIZABLE isolation): Elevating transaction isolation handles database concurrency but causes frequent serialization aborts and LLM tool execution failure loops without solving overlapping write scopes.",
      "Option C (optimistic locking): Optimistic locking forces update retries when version mismatches occur, which causes complex error handling overhead in subagents rather than separating concerns.",
      "Option D (disjoint tool assignment): Ensuring subagent tool sets are disjoint for write operations eliminates concurrent write conflicts at the architectural boundary by granting write capability to only one dedicated agent."
    ],
    "rationale": "When multiple AI subagents have write access to the same database resource, parallel execution leads to race conditions and state corruption. The principle of least privilege and tool scoping dictates that subagent write tool sets must be disjoint. Centralizing write access to a single dedicated manager or coordinator agent eliminates write conflicts entirely.",
    "explanation": "Lựa chọn D chính xác vì nguyên tắc phân bổ công cụ cho subagent quy định rằng các tập công cụ ghi (write tools) phải rời rạc (disjoint). Việc thu hồi update_order_status khỏi PaymentSettlementAgent và giao quyền ghi duy nhất cho một coordinator agent chuyên trách sẽ triệt tiêu khả năng xảy ra ghi đè đồng thời (race condition) từ kiến trúc ban đầu.\n\nLựa chọn A không đúng vì lock phân tán chỉ giải quyết thời gian thực thi nhưng vẫn giữ nguyên phạm vi ghi chồng chéo giữa các agent, dễ gây nghẽn và deadlock.\nLựa chọn B không đúng vì mức cô lập SERIALIZABLE sẽ khiến các giao dịch ghi đồng thời bị abort liên tục, tạo ra chuỗi lỗi cho LLM.\nLựa chọn C không đúng vì optimistic locking buộc agent phải xử lý ngoại lệ xung đột phiên bản và thử lại nhiều lần thay vì phân định rõ trách nhiệm ghi.",
    "sources": [
      {
        "label": "Lesson 2.3: Tool Distribution",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-3-tool-distribution"
      }
    ]
  }
]