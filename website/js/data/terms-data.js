/* CCAF Learning Hub - 40 CCAF Architectural Terms & Concepts Dataset (Fully Covered Across 644Q & 254Q Bank) */

const TERMS_DATA = [
  // ==========================================
  // DOMAIN 1: Agent Architecture & Orchestration
  // ==========================================
  {
    "id": "term-d1-prerequisite-gate",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "Deterministic / Programmatic Prerequisite Gate",
    "nameVI": "Cổng kiểm soát điều kiện tiên quyết bằng mã lập trình",
    "frequency": "6 câu (0.9%)",
    "type": "Safety Gate",
    "explanation": "Một đoạn mã kiểm tra cứng (if/else) được cài đặt trực tiếp trong Tool Handler hoặc tầng Middleware phía Backend. Nó chủ động từ chối và chặn không cho Tool B (ví dụ: xóa dữ liệu, thanh toán, xuất kho) kích hoạt nếu điều kiện tiên quyết ở Tool A chưa được xác thực thành công.",
    "applicationCases": [
      "Quản lý giao dịch tài chính: Chặn API thanh toán thẻ tín dụng nếu thiếu token xác minh gian lận.",
      "Hệ thống pháp lý & ký hợp đồng: Từ chối lệnh gọi API ký hợp đồng nếu người dùng chưa qua bước xác thực danh tính.",
      "Thao tác nguy cơ phá hủy dữ liệu: Từ chối API xóa document nếu chưa có snapshot_id trong sổ đăng ký sao lưu.",
      "Vận tải & Logistics: Chặn điều xe xuất kho nếu dữ liệu hải quan chưa chuyển sang trạng thái CUSTOMS_CLEARED."
    ],
    "contrast": "Deterministic Code Check (Giảm rủi ro về 0%) vs Probabilistic Prompt Instruction (LLM vẫn có 5-10% xác suất bỏ qua).",
    "examTip": "Khi đề thi hỏi cách ngăn chặn 100% vi phạm quy trình cho thao tác tài chính/pháp lý/xóa dữ liệu, luôn chọn Prerequisite Gate bằng code thay vì Prompt."
  },
  {
    "id": "term-d1-sdk-hooks",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "PreToolUse & PostToolUse SDK Hooks",
    "nameVI": "Hook vòng đời can thiệp trước/sau khi gọi Tool trong Agent SDK",
    "frequency": "18 câu (2.8%)",
    "type": "SDK Lifecycle Hook",
    "explanation": "Các hàm callback được đăng ký ở tầng Agent Framework SDK (như Anthropic Agent SDK). PreToolUse Hook được kích hoạt ngay trước khi Tool thực thi để kiểm tra quyền hoặc biến đổi tham số. PostToolUse Hook chạy ngay sau khi Tool hoàn tất để ghi log audit hoặc lọc dữ liệu nhạy cảm.",
    "applicationCases": [
      "Kiểm tra tuân thủ pháp lý & lệnh cấm vận (AML/Sanction checks) trước khi chuyển tiền quốc tế.",
      "Ghi nhật ký kiểm toán (Audit Logging) tự động cho mọi hành vi sửa đổi dữ liệu.",
      "Sanitize và che giấu thông tin định danh cá nhân (PII) trước khi gửi kết quả về cho LLM."
    ],
    "contrast": "SDK Hook (Can thiệp tự động ở tầng SDK Framework) vs Manual Code in Tool Handler (Viết code thủ công ở từng tool).",
    "examTip": "PreToolUse Hook là giải pháp mạnh nhất ở tầng SDK để intercept và reject các cuộc gọi tool không hợp lệ trước khi chạm tới API backend."
  },
  {
    "id": "term-d1-coordinator-worker",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "Coordinator-Worker Architecture & Sub-Agent Delegation",
    "nameVI": "Kiến trúc Điều phối - Công nhân & Ủy quyền cho Sub-Agent",
    "frequency": "8 câu (1.2%)",
    "type": "Architectural Pattern",
    "explanation": "Mẫu thiết kế chia nhỏ hệ thống thành một Agent điều phối chính (Coordinator) đóng vai trò lập kế hoạch, phân chia bài toán và nhiều Agent công nhân chuyên biệt (Worker Sub-Agents) thực thi song song độc lập. Kết quả từ các Worker được tổng hợp lại tại Coordinator.",
    "applicationCases": [
      "Hệ thống nghiên cứu đa nguồn: Coordinator phân công Worker 1 tìm tin tức, Worker 2 tra cứu tài chính, Worker 3 tổng hợp báo cáo.",
      "Phân tích & Refactor mã nguồn lớn: Giao mỗi module cho một Sub-agent xử lý độc lập để không làm tràn bối cảnh chính."
    ],
    "contrast": "Flat Coordinator-Worker (Mỗi Worker 1 nhiệm vụ chuyên biệt) vs Deep Nesting / Monolithic Agent (Dễ bùng nổ độ phức tạp và tràn context).",
    "examTip": "Luôn giữ kiến trúc dạng Phẳng (Flat Hierarchy - 1 Coordinator gọi nhiều Worker) thay vì phân cấp lồng nhau quá sâu (Deep Nesting)."
  },
  {
    "id": "term-d1-state-recovery",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "State Recovery & Turn Limits (max_turns)",
    "nameVI": "Khôi phục trạng thái & Giới hạn số lượt vòng lặp Agent",
    "frequency": "8 câu (1.2%)",
    "type": "Reliability & Safety",
    "explanation": "Cơ chế thiết lập trần giới hạn số lượt hội thoại/gọi tool (max_turns) để ngắt các vòng lặp vô tận (infinite loop), kết hợp lưu trữ checkpoint trạng thái vào cơ sở dữ liệu để có thể khôi phục lại phiên làm việc nếu hệ thống bị crash.",
    "applicationCases": [
      "Ngăn chặn Agent tự động sửa code lặp đi lặp lại không dừng khi gặp lỗi biên dịch liên tục.",
      "Khôi phục lại tiến trình công việc của Agent từ điểm sụp đổ gần nhất mà không phải chạy lại từ đầu."
    ],
    "contrast": "Bounded Execution with Checkpointing vs Unbounded Execution Loop (Chạy vô hạn gây tốn chi phí API và tràn tài nguyên).",
    "examTip": "Mọi Agentic Loop trên sản xuất bắt buộc phải có trần `max_turns` và cơ chế ghi Checkpoint trạng thái."
  },
  {
    "id": "term-d1-hitl-escalation",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "Human-in-the-Loop (HITL) & Escalation Handoff",
    "nameVI": "Can thiệp của con người & Chuyển giao leo thang khi gặp sự cố",
    "frequency": "41 câu (6.4%)",
    "type": "Workflow Pattern",
    "explanation": "Quy trình chuyển giao quyền kiểm soát từ Agent tự động sang chuyên viên con người khi gặp giao dịch giá trị cao, yêu cầu nhạy cảm, hoặc khi Agent bị tắc nghẽn. Bản thông điệp chuyển giao (Handoff payload) bắt buộc phải đóng gói đầy đủ ngữ cảnh.",
    "applicationCases": [
      "Hệ thống chăm sóc khách hàng: Tự động chuyển giao cho nhân viên hỗ trợ khi khách hàng giận dữ hoặc yêu cầu hoàn tiền lớn.",
      "Duyệt chi tiêu tài chính: Agent đề xuất lệnh thanh toán -> Con người duyệt -> Agent mới tiến hành bấm nút thực thi."
    ],
    "contrast": "Complete Handoff Context (Đóng gói ID, nguyên nhân gốc, tóm tắt và hành động đề xuất) vs Incomplete Handoff (Bắt con người phải điều tra lại từ đầu).",
    "examTip": "Thông điệp Handoff gửi cho con người bắt buộc phải có 4 thành phần: Entity ID, Tóm tắt nguyên nhân, Lịch sử hội thoại, và Hành động đề xuất."
  },
  {
    "id": "term-d1-idempotency-gate",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "Idempotency Gate & Duplicate Execution Prevention",
    "nameVI": "Cổng chống trùng lặp giao dịch & Đảm bảo tính Idempotent",
    "frequency": "9 câu (1.4%)",
    "type": "Safety Gate",
    "explanation": "Cơ chế gắn mã định danh giao dịch duy nhất (Idempotency Key / UUID) cho mỗi yêu cầu. Nếu Agent gọi lại cùng một API (do bị timeout hoặc retry), backend sẽ nhận diện key đã xử lý và trả về kết quả cũ thay vì thực thi lại.",
    "applicationCases": [
      "Thanh toán trực tuyến: Tránh trừ tiền 2 lần khi mạng bị lag làm Agent phát lệnh gửi lại request.",
      "Xuất kho & Đặt xe: Tránh đặt trùng 2 chuyến xe vận chuyển cho cùng một đơn hàng."
    ],
    "contrast": "Idempotency Key Enforcement vs Naive Retries (Dễ gây hậu quả nghiêm trọng như double-charge, double-dispatch).",
    "examTip": "Khi làm việc với các API có tác động ghi (POST/PUT/DELETE), luôn sử dụng Idempotency Key khi cấu hình retry."
  },
  {
    "id": "term-d1-asymmetric-retry",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "Asymmetric Retry & Fallback Routing",
    "nameVI": "Thử lại bất đối xứng & Chuyển hướng dự phòng khi sự cố",
    "frequency": "125 câu (19.4%)",
    "type": "Reliability Pattern",
    "explanation": "Chiến lược xử lý sự cố trong đó khi gặp lỗi transient (như 429 Rate Limit hoặc 503 Service Unavailable), hệ thống sẽ retry với thời gian chờ tăng dần theo cấp số nhân kết hợp độ lệch ngẫu nhiên (Exponential Backoff with Jitter), hoặc chuyển hướng sang mô hình/endpoint dự phòng.",
    "applicationCases": [
      "Xử lý quá tải API: Tự động lùi thời gian chờ (jitter) trước khi gọi lại API Claude.",
      "Fallback Model: Chuyển từ Claude 3.5 Sonnet sang Claude 3.5 Haiku nếu gặp sự cố hạ tầng."
    ],
    "contrast": "Exponential Backoff with Jitter vs Immediate Fixed Retries (Làm trầm trọng thêm tình trạng nghẽn mạng Thundering Herd).",
    "examTip": "Không bao giờ retry liên tục ngay lập tức; luôn kết hợp Exponential Backoff và Jitter."
  },
  {
    "id": "term-d1-state-machine",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "State Machine Control & stop_reason Parsing",
    "nameVI": "Điều khiển máy trạng thái & Phân tích cờ stop_reason",
    "frequency": "55 câu (8.5%)",
    "type": "API Control Flow",
    "explanation": "Bản chất các ứng dụng tích hợp Claude Messages API hoạt động như một Máy trạng thái (State Machine) được thúc đẩy bởi trường `stop_reason` trong API response (`end_turn`, `tool_use`, `max_tokens`, `stop_sequence`).",
    "applicationCases": [
      "Khi `stop_reason == 'tool_use'`: Tạm dừng render câu trả lời, đọc tool input, thực thi mã backend và trả về `tool_result`.",
      "Khi `stop_reason == 'max_tokens'`: Nhận diện câu trả lời bị ngắt dở để phát lệnh yêu cầu sinh tiếp."
    ],
    "contrast": "Client-side State Machine driven by stop_reason vs Treating LLM response as a static text string.",
    "examTip": "Trường `stop_reason` chính là cờ điều hướng luồng máy trạng thái chính thức của Claude API."
  },
  {
    "id": "term-d1-rollback-checkpoint",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "nameEN": "Rollback Workflow & Transactional Checkpoints",
    "nameVI": "Quy trình hoàn tác & Điểm kiểm tra giao dịch transactional",
    "frequency": "15 câu (2.3%)",
    "type": "Workflow Pattern",
    "explanation": "Cấu trúc quy trình đa bước cho phép hoàn tác (rollback) hoặc phát động các giao dịch bù trừ (compensating transactions) để đưa hệ thống về trạng thái an toàn ban đầu nếu một bước trong chuỗi bị thất bại giữa chừng.",
    "applicationCases": [
      "Đặt vé máy bay + khách sạn: Nếu đặt khách sạn thất bại, tự động phát lệnh hủy vé máy bay đã đặt trước đó.",
      "Sửa đổi file dự án: Lưu snapshot git trước khi cho Agent sửa code để khôi phục nếu build lỗi."
    ],
    "contrast": "Transactional Checkpoint with Rollback vs Partial Execution Failure (Để lại dữ liệu rác hoặc trạng thái dở dang).",
    "examTip": "Mọi quy trình sửa đổi đa hệ thống phức tạp đều cần thiết lập Checkpoint để khôi phục khi lỗi."
  },

  // ==========================================
  // DOMAIN 2: Tool Design & MCP Integration
  // ==========================================
  {
    "id": "term-d2-granular-tool",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "nameEN": "Granular Tool Design (Single Responsibility Principle)",
    "nameVI": "Thiết kế Tool đơn chức năng & Tách nhỏ trách nhiệm",
    "frequency": "8 câu (1.2%)",
    "type": "Tool Architecture",
    "explanation": "Nguyên tắc thiết kế các Tool của Agent theo dạng mô-đun hóa cao, mỗi Tool chỉ đảm nhận đúng một chức năng duy nhất (Single Responsibility) thay vì gộp nhiều logic phức tạp vào một Tool khổng lồ (Monolithic Tool).",
    "applicationCases": [
      "Tách thành 3 tool riêng: `search_users`, `get_user_details`, `update_user_status` thay vì 1 tool `manage_users` quá tải tham số.",
      "Giúp LLM dễ dàng chọn đúng tool và ít bị nhầm lẫn tham số đầu vào."
    ],
    "contrast": "Granular Specialized Tools vs Monolithic Multi-purpose Tools (Dễ gây hallucination tham số và khó kiểm thử).",
    "examTip": "Tool càng đơn chức năng và tên/mô tả càng rõ ràng thì LLM chọn công cụ càng chính xác."
  },
  {
    "id": "term-d2-resilient-schema",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "nameEN": "Resilient Tool Schemas & Input Schema Redundancy",
    "nameVI": "Schema công cụ chịu lỗi & Dự phòng mô tả tham số",
    "frequency": "58 câu (9.0%)",
    "type": "Tool Specification",
    "explanation": "Kỹ thuật viết JSON Schema cho Tool với các thuộc tính mô tả (description) cực kỳ rõ ràng, quy định kiểu dữ liệu nghiêm ngặt (`type`, `enum`, `required`), đồng thời thêm ví dụ hoặc mô tả dự phòng để LLM không truyền sai định dạng.",
    "applicationCases": [
      "Khai báo rõ trường ngày tháng: `\"date\": {\"type\": \"string\", \"description\": \"YYYY-MM-DD format, e.g. 2026-08-12\"}`.",
      "Sử dụng `enum` để giới hạn danh sách giá trị hợp lệ cho trường trạng thái."
    ],
    "contrast": "Strict Resilient Schema with Descriptions vs Vague Minimalist Schema (Khiến LLM dễ truyền sai kiểu string/int).",
    "examTip": "Schema càng mô tả chi tiết định dạng mong muốn và dùng `enum` thì tỷ lệ gọi tool lỗi càng thấp."
  },
  {
    "id": "term-d2-mcp-transport",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "nameEN": "MCP Transport Layer (stdio vs SSE)",
    "nameVI": "Tầng truyền tải MCP (stdio cho Local Process vs SSE cho Remote Network)",
    "frequency": "290 câu (45.0%)",
    "type": "MCP Protocol Standard",
    "explanation": "Chuẩn Model Context Protocol (MCP) quy định 2 cơ chế truyền tải dữ liệu giữa MCP Client và MCP Server: `stdio` (Standard Input/Output) dùng cho các tiến trình chạy cục bộ trên cùng máy tính; `SSE` (Server-Sent Events qua HTTP) dùng cho các dịch vụ kết nối qua mạng từ xa.",
    "applicationCases": [
      "Dùng `stdio`: Khi Claude Code CLI kết nối với MCP Server chạy local (`node build/index.js`).",
      "Dùng `SSE`: Khi kết nối với MCP Server chạy trên hạ tầng Cloud / Remote Docker Container qua HTTPS."
    ],
    "contrast": "stdio (Local IPC, zero network overhead) vs SSE (Remote HTTP/HTTPS streaming, network traversal).",
    "examTip": "Đây là chủ đề chiếm tần suất cao nhất D2. Nhớ quy tắc: Local = stdio, Remote/Cloud = SSE."
  },
  {
    "id": "term-d2-tool-error-feedback",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "nameEN": "Tool Error Handling & Feedback Loops (is_error)",
    "nameVI": "Xử lý lỗi Tool & Vòng phản hồi tự sửa lỗi (is_error)",
    "frequency": "32 câu (5.0%)",
    "type": "Tool Design Pattern",
    "explanation": "Khi một Tool gặp lỗi thực thi backend, thay vì văng exception làm crash ứng dụng, backend nên đóng gói thông báo lỗi chi tiết vào khối `tool_result` với cờ `is_error: true`. LLM sẽ đọc thông báo lỗi này và tự động sửa tham số để gọi lại.",
    "applicationCases": [
      "Khi truy vấn SQL lỗi cú pháp: Trả về `{\"is_error\": true, \"content\": \"Syntax error near WHERE at line 2\"}` để LLM sửa lại câu SQL.",
      "Khi tìm file không thấy: Trả về gợi ý các file tương tự trong cùng thư mục."
    ],
    "contrast": "Informative Error Payload with is_error: true vs Swallowing Exceptions / Crashing the Agent Runtime.",
    "examTip": "Trả về thông tin lỗi rõ ràng giúp Agent tự sửa lỗi (Self-Correction) thành công mà không bị đứt luồng."
  },
  {
    "id": "term-d2-tool-choice",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "nameEN": "Tool Choice Constraints (auto / any / tool)",
    "nameVI": "Ràng buộc lựa chọn công cụ (auto, any, forced tool)",
    "frequency": "12 câu (1.9%)",
    "type": "API Parameter",
    "explanation": "Tham số `tool_choice` trong Claude Messages API cho phép điều khiển cách LLM chọn tool: `{\"type\": \"auto\"}` (LLM tự quyết định), `{\"type\": \"any\"}` (Bắt buộc phải chọn 1 tool bất kỳ), `{\"type\": \"tool\", \"name\": \"...\"}` (Ép buộc phải gọi đúng tool chỉ định).",
    "applicationCases": [
      "Ép buộc trích xuất dữ liệu: Dùng `tool_choice: {type: 'tool', name: 'extract_schema'}` để đảm bảo LLM luôn trả về JSON đúng cấu trúc.",
      "Chế độ tự do: Dùng `auto` cho đối thoại thông thường."
    ],
    "contrast": "Forced tool_choice (Đảm bảo 100% kích hoạt tool) vs Auto tool_choice (LLM có thể trả về văn bản thường thay vì gọi tool).",
    "examTip": "Muốn đảm bảo LLM luôn gọi một Tool cụ thể ngay ở lượt đầu tiên, chọn `tool_choice: {type: 'tool', name: '...'}`."
  },
  {
    "id": "term-d2-tool-poisoning",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "nameEN": "Tool Poisoning & Input Sanitization",
    "nameVI": "Độc hại dữ liệu công cụ & Làm sạch dữ liệu đầu vào",
    "frequency": "3 câu (0.5%)",
    "type": "Security Pattern",
    "explanation": "Nguy cơ an ninh khi dữ liệu độc hại từ bên ngoài (như email không tin cậy hoặc website bị chèn mã) chứa các câu lệnhPrompt Injection lừa Agent gọi các tool phá hoại. Cần làm sạch (sanitize) dữ liệu trước khi đưa vào bối cảnh.",
    "applicationCases": [
      "Sanitize nội dung HTML/Markdown đọc từ web trước khi cho Agent phân tích.",
      "Chặn các lệnh shell injection trong tham số truyền vào tool `execute_bash`."
    ],
    "contrast": "Input Sanitization & Boundary Isolation vs Direct Execution of Untrusted Content.",
    "examTip": "Dữ liệu từ bên ngoài luôn phải xem là không tin cậy và cần bọc trong thẻ XML hoặc làm sạch trước khi cho Tool dùng."
  },

  // ==========================================
  // DOMAIN 3: Claude Code Configuration & Workflows
  // ==========================================
  {
    "id": "term-d3-cli-permissions",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "nameEN": "CLI Permission Controls & Flag Overrides (--dangerously-skip-permissions)",
    "nameVI": "Kiểm soát phân quyền CLI & Cờ bỏ qua xác nhận tự động",
    "frequency": "63 câu (9.8%)",
    "type": "CLI Configuration Flag",
    "explanation": "Các cờ cấu hình phân quyền chạy lệnh của Claude Code CLI. Trong môi trường tự động hóa không có tương tác người dùng (CI/CD hoặc Headless Sandbox), cờ `--dangerously-skip-permissions` cho phép Claude Code chạy mọi lệnh file/shell mà không dừng lại chờ con người bấm đồng ý.",
    "applicationCases": [
      "Chạy pipeline GitHub Actions tự động sửa lỗi và chạy unit test mà không bị treo do chờ xác nhận.",
      "Cấu hình file `~/.claude.json` với danh sách các lệnh được phép tự động chạy (Auto-approved commands)."
    ],
    "contrast": "--dangerously-skip-permissions in CI/CD vs Interactive Approval Prompt (Treo pipeline nếu thiếu người bấm y/n).",
    "examTip": "Trong môi trường tự động hóa CI/CD không có người ngồi trực (headless), bắt buộc phải dùng cờ `--dangerously-skip-permissions`."
  },
  {
    "id": "term-d3-claude-md-hierarchy",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "nameEN": "CLAUDE.md Hierarchy & Workspace Discovery",
    "nameVI": "Phân cấp file quy tắc CLAUDE.md & Cơ chế tự động phát hiện",
    "frequency": "82 câu (12.7%)",
    "type": "Project Configuration Standard",
    "explanation": "Hệ thống file hướng dẫn quy chuẩn dự án của Claude Code. Claude Code tự động tìm kiếm và nạp quy tắc từ cấp toàn cục người dùng (`~/.claude/CLAUDE.md`), thư mục gốc dự án (`./CLAUDE.md`), đến thư mục con (`./src/CLAUDE.md`). Quy tắc ở thư mục sâu hơn sẽ ghi đè quy tắc ở ngoài.",
    "applicationCases": [
      "Thiết lập quy chuẩn format code, lệnh build, lệnh test chung cho cả team trong file `./CLAUDE.md` ở gốc repo.",
      "Thiết lập quy tắc riêng cho thư mục module backend trong `./backend/CLAUDE.md`."
    ],
    "contrast": "Hierarchical CLAUDE.md Discovery (Tự động nạp bối cảnh dự án) vs Manual System Prompt Injection.",
    "examTip": "File `CLAUDE.md` đặt tại gốc dự án là nơi chuẩn nhất để lưu vết quy tắc build, test và style guide cho Claude Code."
  },
  {
    "id": "term-d3-glob-grep-navigation",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "nameEN": "Tool Discovery & Navigation (Glob/Grep before View)",
    "nameVI": "Quy tắc tìm kiếm file (Dùng Glob/Grep trước khi dùng View_file)",
    "frequency": "121 câu (18.8%)",
    "type": "Workflow Best Practice",
    "explanation": "Quy tắc định hướng không gian làm việc của Claude Code: Luôn luôn sử dụng `GlobTool` (tìm file theo pattern) và `GrepTool` (tìm kiếm từ khóa/chuỗi trong code) để định vị đúng vị trí dòng code trước, sau đó mới dùng `ViewFile` để đọc đoạn code nhỏ đó. Tuyệt đối không đọc tràn lan toàn bộ file lớn.",
    "applicationCases": [
      "Khi cần sửa hàm `calculateTax`: Dùng `grep_search` để tìm chính xác file và số dòng, sau đó dùng `view_file` xem từ dòng 100 đến 140.",
      "Tránh làm bùng nổ token bối cảnh bằng cách đọc các file 5000 dòng."
    ],
    "contrast": "Targeted Grep/Glob Search -> Selective View vs Indiscriminate Full-File Reading (Tốn token và tràn Context Window).",
    "examTip": "Khi làm việc với dự án mã nguồn lớn, quy trình chuẩn luôn là: Glob/Grep trước $\rightarrow$ View đoạn ngắn sau."
  },
  {
    "id": "term-d3-cicd-pipeline",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "nameEN": "CI/CD Integration & Automated PR Review Pipelines",
    "nameVI": "Tích hợp CI/CD & Pipeline tự động kiểm tra Pull Request",
    "frequency": "228 câu (35.4%)",
    "type": "CI/CD Integration Pattern",
    "explanation": "Tích hợp Claude Code CLI vào các luồng kiểm thử tự động (như GitHub Actions, GitLab CI). Claude Code tự động checkout nhánh PR, phân tích diff thay đổi, chạy test suite, và đăng comment đánh giá mã nguồn lên PR.",
    "applicationCases": [
      "Tự động review bảo mật và style guide cho mọi Pull Request được tạo.",
      "Tự động phát hiện lỗi regression và gợi ý patch sửa lỗi ngay trên giao diện GitHub."
    ],
    "contrast": "Automated Non-interactive CI/CD Runner vs Manual Developer Local Code Review.",
    "examTip": "Tận dụng Claude Code trong CI/CD giúp tự động hóa khâu Code Review và giảm 80% thời gian kiểm thử thủ công."
  },
  {
    "id": "term-d3-headless-mode",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "nameEN": "Headless Claude Code & Non-interactive Mode",
    "nameVI": "Chế độ chạy ngầm Headless & Không tương tác",
    "frequency": "65 câu (10.1%)",
    "type": "CLI Execution Mode",
    "explanation": "Phương thức khởi chạy Claude Code CLI qua lệnh terminal bằng cách truyền câu thoại trực tiếp (như `claude -p \"refactor auth module\"`) mà không mở giao diện chat tương tác TUI.",
    "applicationCases": [
      "Nhúng câu lệnh Claude Code vào các file bash script tự động hóa hàng đêm.",
      "Chạy các tác vụ quét mã nguồn định kỳ trên Server."
    ],
    "contrast": "Headless Scripted Execution (`claude -p \"...\"`) vs Interactive Terminal TUI Session.",
    "examTip": "Dùng cờ `-p` hoặc `--print` để thực thi tác vụ đơn lẻ ở dạng Headless trong script."
  },

  // ==========================================
  // DOMAIN 4: Prompt Engineering & Structured Output
  // ==========================================
  {
    "id": "term-d4-structured-output",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "nameEN": "Structured Output & JSON Schema Validation",
    "nameVI": "Đầu ra có cấu trúc & Xác thực theo JSON Schema",
    "frequency": "222 câu (34.5%)",
    "type": "Output Generation Pattern",
    "explanation": "Kỹ thuật ép buộc Claude phát sinh kết quả dạng dữ liệu cấu trúc (thường là JSON) tuân thủ chính xác một JSON Schema cho trước. Yêu cầu các trường không có dữ liệu phải được trả về giá trị `null` rõ ràng (Explicit Null) thay vì bỏ qua trường.",
    "applicationCases": [
      "Bốc tách thông tin từ hóa đơn: Trả về JSON đúng cấu trúc `{vendor, total_amount, tax, items: [...]}`.",
      "Trích xuất hồ sơ bệnh án: Trả về đối tượng JSON với các giá trị `null` minh bạch cho các chỉ số không được đề cập."
    ],
    "contrast": "Strict JSON Schema with Explicit Null vs Unstructured Natural Language Text (Gây lỗi khi parse ở backend).",
    "examTip": "Khi trích xuất dữ liệu, luôn yêu cầu JSON Schema và chỉ thị rõ: 'Return explicit null for missing fields'."
  },
  {
    "id": "term-d4-temperature-control",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "nameEN": "Temperature & Randomness Determinism (0.0 vs 0.7+)",
    "nameVI": "Kiểm soát nhiệt độ & Tính nhất quán (0.0 cho dữ liệu/code vs 0.7+ cho sáng tạo)",
    "frequency": "89 câu (13.8%)",
    "type": "Model Parameter",
    "explanation": "Tham số `temperature` kiểm soát mức độ ngẫu nhiên của các token được sinh ra. Khi đặt `temperature = 0.0`, mô hình hoạt động ở chế độ gần như nhất quán tuyệt đối (Deterministic), phù hợp nhất cho viết mã nguồn, trích xuất dữ liệu và toán học. Khi đặt `0.7 - 1.0`, mô hình sinh văn bản sáng tạo hơn.",
    "applicationCases": [
      "Đặt `temperature: 0.0`: Khi viết code, trích xuất JSON, giải toán hoặc phân tích cú pháp.",
      "Đặt `temperature: 0.8`: Khi viết blogpost, ý tưởng marketing hoặc sáng tạo kịch bản."
    ],
    "contrast": "Temperature 0.0 (Deterministic, reproducible) vs High Temperature (Creative, variable outputs).",
    "examTip": "Tất cả các câu hỏi liên quan đến code, JSON extraction hoặc bài toán logic đúng/sai tuyệt đối đều yêu cầu `temperature = 0.0`."
  },
  {
    "id": "term-d4-few-shot-prompting",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "nameEN": "Few-shot Prompting & Exemplar Steering",
    "nameVI": "Prompt vài ví dụ mẫu & Định hướng bằng ví dụ minh họa",
    "frequency": "63 câu (9.8%)",
    "type": "Prompt Engineering Technique",
    "explanation": "Kỹ thuật cung cấp từ 2 đến 5 cặp ví dụ mẫu (Input -> Expected Output) ngay trong prompt trước khi đưa ra câu hỏi thực tế. Giúp LLM nắm bắt chính xác style, định dạng và quy luật suy luận mà không cần giải thích dài dòng bằng văn bản.",
    "applicationCases": [
      "Định dạng lại địa chỉ: Đưa 3 ví dụ chuyển đổi chuỗi thô thành đối tượng JSON địa chỉ.",
      "Phân loại cảm xúc văn bản: Đưa ví dụ câu + nhãn phân loại tương ứng."
    ],
    "contrast": "Few-shot Exemplars (Cho thấy trực quan cách làm) vs Zero-shot Instruction Only (Chỉ mô tả bằng lời dễ gây mơ hồ).",
    "examTip": "Few-shot là phương pháp cực kỳ hiệu quả để định hình cấu trúc đầu ra complex mà quy tắc văn bản khó diễn đạt."
  },
  {
    "id": "term-d4-cot-thinking",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "nameEN": "Chain-of-Thought (CoT) & <thinking> Tags",
    "nameVI": "Chuỗi suy luận từng bước & Thẻ phân tích <thinking>",
    "frequency": "24 câu (3.7%)",
    "type": "Reasoning Pattern",
    "explanation": "Phương pháp yêu cầu mô hình tự trình bày các bước lập luận, tính toán và phân tích logic bên trong các thẻ XML (như `<thinking>...</thinking>`) trước khi đưa ra câu trả lời chính thức ở ngoài. Giúp giảm thiểu lỗi tư duy logic trên các bài toán phức tạp.",
    "applicationCases": [
      "Giải bài toán kiến trúc nhiều bước: Phân tích các phương án trong `<thinking>` rồi mới chốt đáp án.",
      "Phân tích lỗ hổng bảo mật: Suy luận từng dòng code trước khi kết luận có lỗi hay không."
    ],
    "contrast": "CoT in <thinking> tags (Tách biệt phần suy luận nội bộ với kết quả sạch trả cho user) vs Direct Answer Generation.",
    "examTip": "Dùng thẻ `<thinking>` giúp Claude nâng cao độ chính xác lập luận mà vẫn giữ kết quả đầu ra gọn gàng."
  },
  {
    "id": "term-d4-xml-boundaries",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "nameEN": "XML Boundaries & Tag Scoping (<context>, <doc>)",
    "nameVI": "Ranh giới thẻ XML & Phân vùng bối cảnh dữ liệu",
    "frequency": "21 câu (3.3%)",
    "type": "Prompt Structure Standard",
    "explanation": "Khuyến nghị chính thức của Anthropic về việc bọc các phần dữ liệu đầu vào không tin cậy hoặc các tài liệu tham khảo trong các thẻ XML tùy chỉnh (ví dụ: `<documents>`, `<user_query>`, `<instructions>`). Giúp Claude phân định rõ đâu là lệnh hệ thống, đâu là dữ liệu tham khảo.",
    "applicationCases": [
      "Chống Prompt Injection: Bọc nội dung tin nhắn người dùng trong `<user_input>` để Claude không bị đánh lừa bởi lệnh độc hại.",
      "Phân tách tài liệu: Bọc 5 tài liệu tham khảo trong các thẻ `<doc id=\"1\">`."
    ],
    "contrast": "Structured XML Scoping vs Plain Raw Text Concatenation (Dễ bị nhầm lẫn giữa lời dặn và dữ liệu).",
    "examTip": "Anthropic cực kỳ ưu chuộng thẻ XML. Khi viết Prompt cho Claude, luôn bọc dữ liệu trong các thẻ XML."
  },
  {
    "id": "term-d4-conditional-directives",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "nameEN": "System Prompt Conditional Directives vs Over-Instruction",
    "nameVI": "Chỉ thị System Prompt có điều kiện vs Sai lầm chỉ thị quá đà",
    "frequency": "174 câu (27.0%)",
    "type": "Prompt Design Pattern",
    "explanation": "Kỹ thuật viết System Prompt thông minh bằng cách dùng các chỉ thị có điều kiện (*'Khi người dùng hỏi về tài khoản, hãy gọi tool X'*) thay vì các chỉ thị ép buộc quá đà (*'Luôn luôn gọi tool X trước mọi câu hỏi'* - Over-instruction trap).",
    "applicationCases": [
      "Tránh kích hoạt Tool vô cớ: Chỉ kích hoạt tool tra cứu khách hàng khi câu hỏi thực sự liên quan tới thông tin cá nhân.",
      "Giữ câu trả lời tự nhiên cho các câu hỏi giao tiếp thông thường."
    ],
    "contrast": "Conditional Directive (Chỉ gọi tool khi thỏa mãn điều kiện) vs Over-Instruction (Gọi tool tràn lan làm tốn chi phí).",
    "examTip": "Cảnh giác với các phương án System Prompt chứa từ 'Luôn luôn' (Always) ép buộc gọi tool trong mọi trường hợp."
  },

  // ==========================================
  // DOMAIN 5: Context Management & Reliability
  // ==========================================
  {
    "id": "term-d5-lost-in-the-middle",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "nameEN": "Context Window & Lost-in-the-Middle Attention Decay",
    "nameVI": "Cửa số bối cảnh & Suy giảm chú ý ở vị trí giữa (Lost-in-the-Middle)",
    "frequency": "119 câu (18.5%)",
    "type": "Attention Architecture Mechanic",
    "explanation": "Hiện tượng trọng số chú ý (Attention) của mô hình Transformer bị suy giảm khi xử lý thông tin nằm ở khoảng 60% giữa của một Context Window quá dài (100k+ token). Để khắc phục, các chỉ thị hoặc thông số quan trọng bắt buộc phải đặt ở ngay ĐẦU (System Prompt) hoặc ĐUÔI (User Turn mới nhất).",
    "applicationCases": [
      "Đặt chỉ thị quan trọng: Đưa các câu dặn nghiêm ngặt xuống cuối cùng của prompt trước khi gọi API.",
      "Sắp xếp tài liệu: Đặt các tài liệu tham khảo quan trọng nhất ở đầu hoặc cuối danh sách."
    ],
    "contrast": "Placement at Extremes (Top / Bottom of Payload) vs Middle Placement (Dễ bị Claude bỏ quên hoặc làm sai).",
    "examTip": "Khi làm việc với bối cảnh dài, luôn nhớ quy tắc: Đặt chỉ thị quan trọng ở ĐẦU hoặc ĐUÔI bối cảnh."
  },
  {
    "id": "term-d5-prompt-caching",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "nameEN": "Prompt Caching (Ephemeral Cache & cache_control)",
    "nameVI": "Bộ nhớ đệm Prompt Caching & Thẻ kiểm soát bộ đệm tạm thời",
    "frequency": "6 câu (0.9%)",
    "type": "Performance & Cost Optimization",
    "explanation": "Tính năng cho phép lưu đệm (cache) các đoạn prompt dài cố định (như System Prompt lớn, tập tài liệu tham khảo hay danh sách Tool Schemas) bằng thuộc tính `cache_control: {\"type\": \"ephemeral\"}`. Giúp giảm **90% chi phí** và **85% độ trễ** cho các lượt gọi sau.",
    "applicationCases": [
      "Cache danh sách 50 tool schemas lớn không thay đổi giữa các lượt hội thoại.",
      "Cache cuốn sách hướng dẫn 100k token để hỏi đáp nhiều lần liên tiếp."
    ],
    "contrast": "Cached Prompt Hits (Giảm 90% chi phí token đầu vào) vs Uncached Prompt Resending (Tốn chi phí x5-x10 lần).",
    "examTip": "Prompt Caching là vũ khí tối thượng để tối ưu chi phí và tốc độ cho các hệ thống Agent có System Prompt / Context dài."
  },
  {
    "id": "term-d5-message-batches",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "nameEN": "Message Batches API (50% Cost Discount)",
    "nameVI": "API xử lý lô tin nhắn không đồng bộ (Giảm 50% chi phí)",
    "frequency": "29 câu (4.5%)",
    "type": "API Feature",
    "explanation": "Endpoint `/v1/messages/batches` cho phép gửi một tập hợp hàng nghìn request xử lý không đồng bộ (Asynchronous Batch Processing). Kết quả được trả về trong vòng 24 giờ với mức giá **giảm 50% chi phí token** so với gọi API thời gian thực.",
    "applicationCases": [
      "Trích xuất dữ liệu từ 10,000 file PDF hóa đơn hàng đêm.",
      "Đánh giá chất lượng 5,000 cuộc hội thoại chăm sóc khách hàng cuối tuần."
    ],
    "contrast": "Async Batches API (Tiết kiệm 50% chi phí cho công việc không gấp) vs Real-time Standard API (Giá gốc).",
    "examTip": "Khi đề bài đề cập đến các tác vụ xử lý khối lượng lớn dữ liệu ngầm không yêu cầu phản hồi ngay lập tức, luôn chọn Message Batches API."
  },
  {
    "id": "term-d5-context-pruning",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "nameEN": "Context Pruning & Sliding Window Truncation",
    "nameVI": "Chiến lược cắt gọt bối cảnh & Cửa sổ trượt thu gọn",
    "frequency": "26 câu (4.0%)",
    "type": "Context Management Strategy",
    "explanation": "Kỹ thuật chủ động lọc bỏ hoặc loại cắt các lượt tin nhắn cũ, các `tool_result` quá dài không còn giá trị, hoặc duy trì một cửa sổ trượt (Sliding Window) N lượt gần nhất để giữ cho Context Window luôn gọn gàng dưới ngưỡng giới hạn.",
    "applicationCases": [
      "Xóa bớt các dữ liệu file thô đã đọc từ 10 lượt trước chỉ giữ lại tóm tắt.",
      "Giữ lại 6 lượt tin nhắn mới nhất trong mảng `messages`."
    ],
    "contrast": "Context Pruning (Giữ lại thông tin tinh túy) vs Unchecked Memory Accumulation (Dẫn tới nghẽn token và tăng chi phí).",
    "examTip": "Cắt gọt bối cảnh dư thừa (Pruning) giúp duy trì tốc độ phản hồi và độ chính xác của Agent."
  },
  {
    "id": "term-d5-state-summarization",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "nameEN": "State Summarization & Compact Context Injection",
    "nameVI": "Tóm tắt trạng thái & Bơm bối cảnh cô đọng vào phiên làm việc mới",
    "frequency": "20 câu (3.1%)",
    "type": "Context Compression Pattern",
    "explanation": "Khi lịch sử hội thoại quá dài, hệ thống sử dụng một mô hình phụ để tóm tắt lại toàn bộ tiến trình công việc, kết quả đã làm và các bước tiếp theo thành một bản tóm tắt ngắn, sau đó khởi tạo một phiên hội thoại mới và bơm bản tóm tắt này vào đầu bối cảnh.",
    "applicationCases": [
      "Agent lập trình làm việc qua 50 bước: Tóm tắt tiến trình sửa code và mở session mới để tiếp tục công việc.",
      "Chăm sóc khách hàng kéo dài nhiều ngày: Tóm tắt tiền sử hỗ trợ."
    ],
    "contrast": "State Summarization + Fresh Session vs Carrying 150k Stale Context Tokens (Vừa tốn tiền vừa dễ bị Lost-in-the-middle).",
    "examTip": "Khi Agent bị xung đột thông tin cũ (Stale Context) hoặc tràn bối cảnh, giải pháp tốt nhất là Tóm tắt + Khởi tạo Session mới."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TERMS_DATA };
}
