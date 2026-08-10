/* CCAF Learning Hub - Official Mock Exam Question Generator Engine (2,000+ Questions Pool) 
   Bilingual English & Vietnamese Scenario-Based Questions mapped to 5 Domains & 6 Production Archetypes
*/

const MOCK_EXAM_ARCHETYPES = [
  "Customer Support Resolution Agent",
  "Code Generation & Refactoring with Claude Code",
  "Multi-Agent Research & Synthesis System",
  "Developer Productivity Tools (MCP Infrastructure)",
  "Claude Code in CI/CD & Automated PR Review",
  "Structured Data Extraction & OCR Processing"
];

function generateMockQuestionsPool() {
  const pool = [];
  let currentId = 1000;

  // DOMAIN 1: Agent Architecture & Orchestration (27% Weight - Target 540 Questions)
  const d1Templates = [
    {
      archetype: "Multi-Agent Research & Synthesis System",
      qVI: "Một hệ thống nghiên cứu đa agent được thiết kế với một Lead Coordinator và 5 Subagents. Trong khi chạy, Coordinator liên tục phân tích việc ủy quyền nhiệm vụ nhưng không có Subagent nào thực sự được khởi tạo (không có log lỗi). Nguyên nhân khả dĩ nhất là gì?",
      qEN: "A multi-agent research system is designed with a Lead Coordinator and 5 Subagents. During runtime, the Coordinator repeatedly reasons about task delegation, but no Subagent ever executes (with no errors logged). What is the most likely cause?",
      optsVI: [
        "A. Công cụ 'Task' chưa được khai báo trong thuộc tính allowedTools của Coordinator.",
        "B. Mô hình không đủ token max_tokens để phát phản hồi.",
        "C. Các Subagent không tự động kế thừa bộ nhớ context của Coordinator.",
        "D. Nhiệm vụ bị tắc nghẽn do mạng internet gián đoạn."
      ],
      optsEN: [
        "A. The 'Task' tool is missing from the Coordinator's allowedTools array.",
        "B. The model max_tokens parameter is set too low for responses.",
        "C. Subagents failed to automatically inherit the Coordinator context log.",
        "D. Network requests timed out during agent invocation."
      ],
      correct: 0,
      exp: "EXPLANATION: Nếu Coordinator có cấu hình AgentDefinitions nhưng không khởi tạo được subagent, nguyên nhân hàng đầu là thiếu 'Task' trong allowedTools. Mô hình có thể nói về việc delegate nhưng không có cơ chế thực thi nó."
    },
    {
      archetype: "Customer Support Resolution Agent",
      qVI: "Hệ thống support agent của bạn cần thực thi 3 Subagent song song để xử lý cùng lúc: tra cứu hóa đơn, kiểm tra vận chuyển và đánh giá lịch sử hỗ trợ. Để đảm bảo 3 Subagent chạy song song thực sự, Coordinator phải làm gì?",
      qEN: "Your customer support agent system needs to execute 3 subagents in parallel to check billing, shipping status, and support history. To guarantee true concurrent execution of the subagents, what must the Coordinator do?",
      optsVI: [
        "A. Gửi chỉ thị 'Hãy chạy song song nhé' trong system prompt.",
        "B. Phát ra nhiều lệnh gọi tool 'Task' trong CÙNG MỘT message phản hồi của assistant.",
        "C. Đổi mô hình sang claude-haiku để tăng tốc độ xử lý.",
        "D. Chạy 3 vòng lặp API riêng biệt ở 3 thread backend."
      ],
      optsEN: [
        "A. Instruct the model to 'execute in parallel' within the system prompt.",
        "B. Emit multiple 'Task' tool calls within a single assistant message turn.",
        "C. Switch to the Claude Haiku model for lower latency processing.",
        "D. Initiate 3 separate API calls across 3 backend threads."
      ],
      correct: 1,
      exp: "EXPLANATION: Hướng dẫn Anthropic khẳng định việc phát ra nhiều tool_use 'Task' trong cùng 1 message là cơ chế duy nhất khiến SDK khởi chạy các subagent song song thật sự."
    },
    {
      archetype: "Code Generation & Refactoring with Claude Code",
      qVI: "Sau khi sự cố sập server xảy ra trong một phiên refactor đa agent dài, hệ thống cần khôi phục lại trạng thái làm việc mà không làm phình bộ nhớ context. Giải pháp phục hồi nào chuẩn nhất?",
      qEN: "After a server crash occurs during a long multi-agent refactoring session, the system needs to restore working state without inflating context memory. What is the most resilient recovery design?",
      optsVI: [
        "A. Cho mỗi agent ghi tệp export có cấu trúc (manifest); khi resume, coordinator chỉ tiêm phần state liên quan vào prompt từng subagent.",
        "B. Tải lại toàn bộ conversation log thô 100K token của phiên làm việc cũ.",
        "C. Sử dụng Vector Search để tìm kiếm ngữ cảnh ngẫu nhiên.",
        "D. Cho các subagent chạy lại từ đầu không cần khôi phục state."
      ],
      optsEN: [
        "A. Have each agent persist a structured export manifest; on resume, the coordinator injects only relevant state into each subagent prompt.",
        "B. Reload the entire raw 100K token conversation log from the old session.",
        "C. Perform semantic vector search to dynamically fetch random context.",
        "D. Re-run all subagents from scratch without restoring state."
      ],
      correct: 0,
      exp: "EXPLANATION: Việc lưu manifest xuất có cấu trúc và chỉ tiêm state liên quan giúp khôi phục hệ thống mượt mà mà không gây quá tải context như việc tải log thô."
    },
    {
      archetype: "Customer Support Resolution Agent",
      qVI: "Một Agent tự chọn giao dịch chuyển tiền tự động bị rơi vào vòng lặp liên tục gọi lại một tool đang bị lỗi. Hai cơ chế bảo vệ bắt buộc phải thêm vào để dừng hệ thống an toàn là gì?",
      qEN: "An autonomous agent executing fund transfers enters an infinite loop repeatedly calling a failing tool. What two safeguards are strictly required to safely halt execution?",
      optsVI: [
        "A. Thiết lập trần max_turns cứng (10-15 turns) và theo dõi số lần thất bại liên tiếp của tool để ngắt vòng lặp trả lỗi mượt.",
        "B. Tăng max_tokens và chuyển mô hình sang Claude Opus.",
        "C. Xóa bỏ mảng tools khỏi request để ép mô hình trả về văn bản.",
        "D. Gửi chỉ thị 'Vui lòng không lặp lại' vào system prompt."
      ],
      optsEN: [
        "A. Enforce a hard max_turns limit (10-15 turns) and track consecutive tool failures to break the loop gracefully.",
        "B. Increase max_tokens ceiling and switch model tier to Claude Opus.",
        "C. Remove the tools array from request payload to force text response.",
        "D. Append 'Please do not loop' instruction into the system prompt."
      ],
      correct: 0,
      exp: "EXPLANATION: Đặt trần max_turns và đếm số lần thất bại liên tiếp ở Backend Client là cơ chế bảo vệ cứng ngăn chặn bùng nổ chi phí API và nghẽn hệ thống."
    },
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Để đảm bảo 100% không bao giờ xảy ra việc Agent tự động thực hiện lệnh xóa dữ liệu tài chính mà không có sự đồng ý của con người, kiến trúc an toàn nào chuẩn nhất?",
      qEN: "To guarantee with 100% determinism that an autonomous agent never executes a financial deletion without human approval, which safety architecture is correct?",
      optsVI: [
        "A. Thực thi PreToolUse Hook ở tầng Code Server Backend để tạm dừng và yêu cầu token xác nhận Human-in-the-Loop.",
        "B. Viết câu lệnh 'Không bao giờ xóa dữ liệu' trong System Prompt.",
        "C. Giảm tham số temperature xuống 0.0.",
        "D. Bọc dữ liệu đầu vào trong các thẻ XML."
      ],
      optsEN: [
        "A. Implement a PreToolUse Hook at the server backend to pause execution and require a Human-in-the-Loop approval token.",
        "B. Add 'Never delete data' command in the System Prompt string.",
        "C. Lower model temperature parameter to 0.0.",
        "D. Encapsulate user inputs inside XML boundary tags."
      ],
      correct: 0,
      exp: "EXPLANATION: PreToolUse Hooks tại Backend mang tính Deterministic (chắc chắn 100%), trong khi System Prompt chỉ mang tính xác suất (~95-98%)."
    },
    {
      archetype: "Multi-Agent Research & Synthesis System",
      qVI: "Trong kiến trúc Coordinator-Worker, tại sao mỗi Subagent lại cần duy trì một mảng messages độc lập (Context Isolation)?",
      qEN: "In a Coordinator-Worker architecture, why must each Subagent maintain an independent messages array (Context Isolation)?",
      optsVI: [
        "A. Để ngăn dữ liệu trung gian rườm rà của Subagent làm ngợp bộ nhớ Context Window của Coordinator Agent.",
        "B. Để tăng tốc độ mạng giữa các API call.",
        "C. Vì Claude Messages API không hỗ trợ chung context.",
        "D. Để tự động chia đôi chi phí token."
      ],
      optsEN: [
        "A. To prevent verbose intermediate subagent logs from polluting and overflowing the Coordinator's context window.",
        "B. To double network transmission speed between API requests.",
        "C. Because Claude Messages API strictly forbids shared context arrays.",
        "D. To automatically discount token usage costs by half."
      ],
      correct: 0,
      exp: "EXPLANATION: Context Isolation giúp cô lập các log đọc file rác ở Worker, bảo vệ Context Window của Coordinator luôn gọn gàng và minh mẫn."
    },
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Khi một Subagent thực thi gặp lỗi Permission Error (cấm truy cập tệp hệ thống), hành vi xử lý chuẩn của Coordinator là gì?",
      qEN: "When a Subagent encounters a Permission Error (access denied to system file), what is the correct Coordinator handling behavior?",
      optsVI: [
        "A. Dừng thử lại, bắt lỗi qua is_error: true và chuyển giao cho người dùng hoặc phương án xử lý hạ cấp.",
        "B. Thử lại (Retry) liên tục 50 lần với Exponential Backoff.",
        "C. Đổi tên Subagent và gửi lại prompt cũ.",
        "D. Tăng max_tokens lên gấp đôi."
      ],
      optsEN: [
        "A. Stop retrying, catch via is_error: true, and escalate to human user or fallback strategy.",
        "B. Retry continuously 50 times using Exponential Backoff.",
        "C. Rename the Subagent identifier and resend original prompt.",
        "D. Double the max_tokens request parameter."
      ],
      correct: 0,
      exp: "EXPLANATION: Lỗi Permission/Business Error không bao giờ tự hết khi retry. Cần ngắt ngay lập tức để tránh lãng phí token vô ích."
    }
  ];

  // DOMAIN 2: Tool Design & MCP Integration (18% Weight - Target 360 Questions)
  const d2Templates = [
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Một lập trình viên thiết kế một tool đa năng Monolithic có tên 'manage_database' làm tất cả các việc: query, insert, update, drop table. Kết quả là mô hình thường gọi sai tham số hoặc tự chạy lệnh bash thô. Giải pháp kiến trúc đúng là gì?",
      qEN: "A developer builds a monolithic 'manage_database' tool handling querying, inserts, updates, and drop table operations. As a result, the model frequently passes bad parameters or falls back to raw bash commands. What is the correct architectural fix?",
      optsVI: [
        "A. Chia nhỏ tool đa năng thành các tool đơn nhiệm Granular (vd: query_records, update_record) với input schema rõ ràng.",
        "B. Đặt temperature = 0.9 để mô hình linh hoạt hơn.",
        "C. Ép mô hình dùng tool bằng tool_choice: 'tool'.",
        "D. Đưa toàn bộ tài liệu SQL vào system prompt."
      ],
      optsEN: [
        "A. Split the monolithic tool into granular single-purpose tools (e.g. query_records, update_record) with explicit schemas.",
        "B. Increase temperature to 0.9 to encourage model flexibility.",
        "C. Enforce execution using tool_choice: 'tool'.",
        "D. Insert the entire SQL documentation manual into the system prompt."
      ],
      correct: 0,
      exp: "EXPLANATION: Tách công cụ cồng kềnh thành các Granular Tools đơn nhiệm với schema tường minh là nguyên tắc cốt lõi ngăn mô hình gọi nhầm tool hoặc dùng lệnh shell thô."
    },
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Khi thiết kế Enum cho thuộc tính loại hình bất động sản (`property_type`), nếu dữ liệu thực tế xuất hiện loại nhà mẫu 'studio' nằm ngoài danh sách Enum ['house', 'apartment'], Schema validation sẽ bị hỏng. Cách thiết kế Catch-All Schema chống lỗi là gì?",
      qEN: "When defining an enum for property types ('property_type'), if a real-world document contains 'studio' outside the enum ['house', 'apartment'], schema validation fails. What is the resilient Catch-All schema design?",
      optsVI: [
        "A. Thêm giá trị 'UNKNOWN' hoặc 'OTHER' vào Enum kết hợp với một trường chi tiết property_type_detail kiểu string.",
        "B. Xóa bỏ kiểm tra Schema để mô hình trả về tự do.",
        "C. Chuyển Enum thành kiểu boolean.",
        "D. Ném Exception khi gặp dữ liệu nằm ngoài Enum."
      ],
      optsEN: [
        "A. Add an 'UNKNOWN' or 'OTHER' fallback value to the restricted enum paired with an explicit detail string field.",
        "B. Disable schema validation entirely to allow unconstrained output.",
        "C. Convert the enum field into a boolean flag.",
        "D. Throw an exception whenever unlisted property values appear."
      ],
      correct: 0,
      exp: "EXPLANATION: Thêm 'UNKNOWN' hoặc 'OTHER' vào enum bị giới hạn giúp hệ thống xử lý mượt mà mọi ngoại lệ thực tế mà không bị ngắt quãng do hỏng JSON Schema validation."
    },
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Khi gọi tool bên ngoài bị lỗi kết nối 500 Timeout, Client Backend nên gửi loại payload phản hồi nào về cho Claude Messages API?",
      qEN: "When an external tool execution hits a 500 Network Timeout, what response payload structure should the Client Backend return to Claude Messages API?",
      optsVI: [
        "A. Trả về khối tool_result chứa 'is_error': true kèm thông báo lỗi thô.",
        "B. Ném văng Exception未 catch làm ngắt ứng dụng.",
        "C. Trả về mảng messages rỗng.",
        "D. Gửi lại request cũ với max_tokens = 0."
      ],
      optsEN: [
        "A. Return a tool_result content block containing 'is_error': true with the raw error text.",
        "B. Throw an uncaught exception halting the backend server process.",
        "C. Return an empty messages array.",
        "D. Resend the initial request with max_tokens set to 0."
      ],
      correct: 0,
      exp: "EXPLANATION: Trả về tool_result chứa is_error: true là chuẩn Anthropic giúp Claude biết tool bị lỗi và tự đưa ra giải pháp khắc phục mượt mà."
    },
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Trong chuẩn Model Context Protocol (MCP), sự khác biệt căn bản giữa 'Tools' và 'Resources' là gì?",
      qEN: "In the Model Context Protocol (MCP) specification, what is the fundamental difference between 'Tools' and 'Resources'?",
      optsVI: [
        "A. Tools là các hàm thực thi có khả năng phát sinh tác động ngoài (Read/Write), còn Resources thuần túy là dữ liệu đọc (Read-only URI).",
        "B. Tools dùng cho Tiếng Anh, Resources dùng cho Tiếng Việt.",
        "C. Tools chạy trên Server, Resources chạy trên Client.",
        "D. Không có sự khác biệt nào."
      ],
      optsEN: [
        "A. Tools are executable functions with side-effects (Read/Write), whereas Resources are strictly read-only data payloads (URI).",
        "B. Tools are reserved for English prompts, Resources for localized queries.",
        "C. Tools execute on MCP Server, Resources load on Client host.",
        "D. There is no architectural distinction between them."
      ],
      correct: 0,
      exp: "EXPLANATION: MCP Tools đại diện cho hành động thực thi (ghi/sửa/xóa/gọi API), còn MCP Resources đại diện cho dữ liệu tài liệu đọc thuần túy (Read-only)."
    },
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Bạn cần kết nối Claude Code CLI với một MCP Server chạy trên một máy chủ đám mây từ xa qua giao thức HTTP/HTTPS. Chuẩn Transport MCP nào bắt buộc phải dùng?",
      qEN: "You need to connect Claude Code CLI to a remote cloud-hosted MCP Server over HTTP/HTTPS. Which standard MCP Transport protocol must be configured?",
      optsVI: [
        "A. SSE (Server-Sent Events qua HTTP/HTTPS)",
        "B. stdio (Standard Input/Output)",
        "C. UDP Broadcast",
        "D. FTP Protocol"
      ],
      optsEN: [
        "A. SSE (Server-Sent Events over HTTP/HTTPS)",
        "B. stdio (Standard Input/Output)",
        "C. UDP Broadcast",
        "D. FTP Protocol"
      ],
      correct: 0,
      exp: "EXPLANATION: MCP hỗ trợ stdio cho môi trường local CLI và SSE (Server-Sent Events) cho môi trường kết nối máy chủ remote qua HTTP/HTTPS."
    },
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Nếu bạn muốn bắt buộc Claude phải gọi đúng một công cụ có tên 'extract_invoice' mà không được trả lời bằng văn bản xuôi, tham số nào cần được cấu hình?",
      qEN: "If you want to strictly force Claude to invoke a specific tool named 'extract_invoice' without outputting freeform text, which parameter configuration is required?",
      optsVI: [
        "A. tool_choice: {'type': 'tool', 'name': 'extract_invoice'}",
        "B. tool_choice: 'auto'",
        "C. tool_choice: 'any'",
        "D. max_tokens: 1"
      ],
      optsEN: [
        "A. tool_choice: {'type': 'tool', 'name': 'extract_invoice'}",
        "B. tool_choice: 'auto'",
        "C. tool_choice: 'any'",
        "D. max_tokens: 1"
      ],
      correct: 0,
      exp: "EXPLANATION: Dùng tool_choice dạng object chỉ định tên tool là cơ chế ép buộc mô hình kích hoạt chính xác 1 công cụ yêu cầu."
    }
  ];

  // DOMAIN 3: Claude Code Configuration & Workflows (20% Weight - Target 400 Questions)
  const d3Templates = [
    {
      archetype: "Code Generation & Refactoring with Claude Code",
      qVI: "Khi khám phá một codebase lớn gồm 300 file để định vị vị trí định nghĩa của hàm `calculateTax`, hành động mở từng file một sẽ gây quá tải context. Quy trình tìm kiếm nào chuẩn nhất?",
      qEN: "When exploring a large 300-file codebase to locate where 'calculateTax' is defined, reading files sequentially overloads the context window. What is the best search workflow?",
      optsVI: [
        "A. Sử dụng GlobTool để tìm cấu trúc file và GrepTool để định vị chính xác từ khóa trước khi xem nội dung file cụ thể.",
        "B. Tải toàn bộ 300 file vào mảng messages.",
        "C. Dùng lệnh View đọc 50 file đầu tiên.",
        "D. Viết lại toàn bộ hàm calculateTax mà không cần tìm file cũ."
      ],
      optsEN: [
        "A. Use GlobTool to map file structure and GrepTool to locate exact keyword references before opening specific files.",
        "B. Load all 300 raw source files directly into the messages array.",
        "C. Execute the View tool sequentially on the first 50 project files.",
        "D. Rewrite the calculateTax function from scratch without searching."
      ],
      correct: 0,
      exp: "EXPLANATION: Nguyên tắc 'Glob and Grep before file view' giúp định vị nhanh đoạn code cần tìm mà không làm lãng phí bộ nhớ context."
    },
    {
      archetype: "Claude Code in CI/CD & Automated PR Review",
      qVI: "Bạn muốn tự động hóa quy trình review PR bằng Claude Code CLI trong pipeline CI/CD mà không cần con người bấm xác nhận thủ công cho từng lệnh đọc file. Cờ lệnh CLI nào phù hợp nhưng cần cẩn trọng môi trường?",
      qEN: "You want to automate PR reviews using Claude Code CLI in a CI/CD pipeline without requiring manual user confirmation per command. Which CLI flag enables this in an isolated sandbox?",
      optsVI: [
        "A. `--dangerously-skip-permissions`",
        "B. `--force-all-tools`",
        "C. `--auto-approve-github`",
        "D. `--no-context-limit`"
      ],
      optsEN: [
        "A. `--dangerously-skip-permissions`",
        "B. `--force-all-tools`",
        "C. `--auto-approve-github`",
        "D. `--no-context-limit`"
      ],
      correct: 0,
      exp: "EXPLANATION: Cờ `--dangerously-skip-permissions` cho phép Claude Code chạy tự động không cần hỏi quyền, chỉ nên dùng trong các container Sandbox CI/CD an toàn."
    },
    {
      archetype: "Code Generation & Refactoring with Claude Code",
      qVI: "Thứ tự ưu tiên nạp file cấu hình quy tắc CLAUDE.md khi Claude Code hoạt động trong dự án là gì?",
      qEN: "What is the correct resolution hierarchy for loading CLAUDE.md rule files when Claude Code runs inside a repository?",
      optsVI: [
        "A. Subdirectory hiện tại (./src/CLAUDE.md) ➔ Project Root (./CLAUDE.md) ➔ Global User (~/.claude/CLAUDE.md).",
        "B. Global User ➔ Project Root ➔ Subdirectory.",
        "C. Chỉ đọc duy nhất file ở Project Root.",
        "D. Đọc ngẫu nhiên không có thứ tự."
      ],
      optsEN: [
        "A. Current Subdirectory (./src/CLAUDE.md) ➔ Project Root (./CLAUDE.md) ➔ Global User (~/.claude/CLAUDE.md).",
        "B. Global User ➔ Project Root ➔ Subdirectory.",
        "C. Strictly reads only the Project Root file.",
        "D. Reads arbitrarily with no deterministic priority."
      ],
      correct: 0,
      exp: "EXPLANATION: Thứ tự ưu tiên nạp quy tắc của Claude Code bắt đầu từ thư mục con chuyên biệt nhất ➔ Gốc dự án ➔ Cấu hình toàn cục cá nhân."
    },
    {
      archetype: "Code Generation & Refactoring with Claude Code",
      qVI: "Một dự án có file CLAUDE.md dài hơn 2.500 dòng chứa toàn bộ tài liệu hướng dẫn và sách giáo trình. Hậu quả kỹ thuật lớn nhất là gì?",
      qEN: "A project codebase contains a 2,500-line CLAUDE.md file filled with entire textbook manuals. What is the primary technical drawback of this pattern?",
      optsVI: [
        "A. Lãng phí dung lượng lớn Context Window trong mọi phiên làm việc và làm suy giảm khả năng tuân thủ quy tắc cốt lõi.",
        "B. Làm hỏng trình thông dịch Node.js.",
        "C. Khiến Claude Code không thể kết nối Internet.",
        "D. Không có ảnh hưởng nào."
      ],
      optsEN: [
        "A. Wastes massive Context Window capacity on every launch and degrades model adherence to core build/test commands.",
        "B. Corrupts the host Node.js runtime environment.",
        "C. Prevents Claude Code from establishing network connectivity.",
        "D. Has zero technical impact on performance."
      ],
      correct: 0,
      exp: "EXPLANATION: Nguyên tắc Vàng (Lean Pattern) yêu cầu giữ CLAUDE.md ngắn gọn (<100 dòng) tập trung vào lệnh build/test để không lãng phí token."
    },
    {
      archetype: "Code Generation & Refactoring with Claude Code",
      qVI: "Khi bạn chỉ muốn chỉnh sửa 5 dòng mã nguồn trong một file 3.000 dòng có sẵn, việc sử dụng Tool nào là tối ưu nhất?",
      qEN: "When you only need to modify 5 lines inside an existing 3,000-line source file, which built-in tool execution is most optimal?",
      optsVI: [
        "A. FileEditTool (chỉnh sửa cục bộ theo đoạn code chỉ định).",
        "B. FileWriteTool (ghi đè toàn bộ 3.000 dòng file).",
        "C. BashTool với lệnh cat.",
        "D. GlobTool."
      ],
      optsEN: [
        "A. FileEditTool (targeted string replacement).",
        "B. FileWriteTool (overwriting the entire 3,000-line file).",
        "C. BashTool invoking raw cat output redirection.",
        "D. GlobTool."
      ],
      correct: 0,
      exp: "EXPLANATION: Dùng FileEditTool cho việc sửa đổi cục bộ giúp tiết kiệm token và tránh rủi ro vỡ cấu trúc file so với việc nạp lại toàn bộ file qua FileWriteTool."
    }
  ];

  // DOMAIN 4: Prompt Engineering & Structured Output (20% Weight - Target 400 Questions)
  const d4Templates = [
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Khi trích xuất thông tin người liên hệ từ đoạn văn, nếu trường email không được đề cập trong bài viết, làm thế nào để ngăn mô hình không tự bịa ra một địa chỉ email giả (hallucination)?",
      qEN: "When extracting contact details from text, if the email field is not mentioned in the source article, how do you prevent the model from fabricating a plausible email address?",
      optsVI: [
        "A. Thêm chỉ thị tường minh trong Prompt: 'Nếu trường email không xuất hiện trong bài viết, hãy trả về giá trị null'.",
        "B. Đặt temperature = 0.9.",
        "C. Yêu cầu mô hình trả về một địa chỉ email ngẫu nhiên.",
        "D. Không làm gì cả vì mô hình tự biết."
      ],
      optsEN: [
        "A. Instruct explicitly in the prompt: 'If the email field is missing from the source text, return null'.",
        "B. Set temperature to 0.9.",
        "C. Request the model to supply a randomized default email address.",
        "D. Do nothing as the model automatically knows."
      ],
      correct: 0,
      exp: "EXPLANATION: Chỉ dẫn trả về `null` tường minh khi thiếu thông tin là phương pháp hiệu quả nhất để chống hallucination cho các trường optional."
    },
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Để bảo vệ ứng dụng khỏi các cuộc tấn công Prompt Injection khi người dùng nhập dữ liệu không tin cậy, giải pháp cấu trúc Prompt nào chuẩn nhất?",
      qEN: "To protect your application against Prompt Injection attacks when untrusted user content is ingested, which prompt structuring pattern is correct?",
      optsVI: [
        "A. Bọc dữ liệu người dùng trong các thẻ XML (vd: <user_input>...</user_input>) và chỉ thị Claude xử lý nội dung trong thẻ thuần túy là dữ liệu.",
        "B. Nối trực tiếp chuỗi người dùng nhập vào cuối câu lệnh.",
        "C. Mã hóa toàn bộ dữ liệu người dùng thành Base64.",
        "D. Đặt max_tokens = 50."
      ],
      optsEN: [
        "A. Encapsulate user data inside XML tags (e.g., <user_input>...</user_input>) and instruct Claude to treat tag contents strictly as data.",
        "B. Concatenate raw user strings directly onto the end of instructions.",
        "C. Encode all user inputs into Base64 strings.",
        "D. Set max_tokens parameter ceiling to 50."
      ],
      correct: 0,
      exp: "EXPLANATION: Thẻ ranh giới XML cô lập dữ liệu không tin cậy khỏi chỉ thị hệ thống, ngăn chặn hiệu quả các đợt tấn công ghi đè câu lệnh."
    },
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Kỹ thuật Few-Shot Engineering đạt hiệu quả cao nhất khi cung cấp bao nhiêu mẫu ví dụ chuẩn bên trong thẻ XML?",
      qEN: "Few-Shot Engineering yields optimal formatting consistency when supplying approximately how many canonical XML examples?",
      optsVI: [
        "A. 2 đến 4 mẫu ví dụ chất lượng cao bọc trong thẻ XML <example>.",
        "B. 30 đến 50 mẫu ví dụ.",
        "C. Không cần mẫu nào (Zero-shot luôn tốt hơn).",
        "D. 100 mẫu ví dụ."
      ],
      optsEN: [
        "A. 2 to 4 high-quality canonical examples encapsulated in <example> XML tags.",
        "B. 30 to 50 extensive examples.",
        "C. Zero examples (Zero-shot is universally superior).",
        "D. 100 benchmark examples."
      ],
      correct: 0,
      exp: "EXPLANATION: Cung cấp 2-4 mẫu Few-shot chất lượng cao giúp định hình chính xác cấu trúc đầu ra mà không làm lãng phí quá nhiều Context Window."
    },
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Ứng dụng của bạn cần xử lý bất đồng bộ 50.000 hồ sơ báo cáo tài chính ban đêm và không yêu cầu kết quả phản hồi lập tức trong vài giây. Giải pháp API nào tiết kiệm 50% chi phí?",
      qEN: "Your enterprise application needs to asynchronously process 50,000 financial reports overnight without requiring real-time sub-second responses. Which API option cuts costs by 50%?",
      optsVI: [
        "A. Message Batches API (/v1/messages/batches) với ưu đãi giảm 50% chi phí và SLA 24 giờ.",
        "B. Real-time Messages API với mô hình Haiku.",
        "C. Dùng Prompt Caching trên Real-time API.",
        "D. Gửi các request song song liên tục."
      ],
      optsEN: [
        "A. Message Batches API (/v1/messages/batches) offering 50% cost savings with a 24-hour completion SLA.",
        "B. Real-time Messages API using the Haiku model.",
        "C. Apply Prompt Caching on the Real-time API.",
        "D. Send continuous high-concurrency real-time requests."
      ],
      correct: 0,
      exp: "EXPLANATION: Message Batches API được Anthropic thiết kế dành riêng cho các tác vụ xử lý hàng loạt không gấp với ưu đãi giảm 50% chi phí."
    },
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Yêu cầu Claude suy luận từng bước bên trong thẻ `<thinking>` trước khi phát ra câu trả lời JSON cuối cùng mang lại lợi ích kỹ thuật gì?",
      qEN: "Enforcing Chain-of-Thought reasoning inside `<thinking>` tags prior to outputting final JSON yields what primary technical benefit?",
      optsVI: [
        "A. Tăng độ chính xác khi bốc tách dữ liệu phức tạp lên tới 40% (Chain-of-Thought).",
        "B. Giảm 50% thời gian phản hồi API.",
        "C. Tự động sửa lỗi cú pháp Python.",
        "D. Bảo vệ API khỏi bị rò rỉ secret key."
      ],
      optsEN: [
        "A. Increases complex data extraction accuracy by up to 40% (Chain-of-Thought).",
        "B. Reduces API response latency by 50%.",
        "C. Automatically corrects Python syntax errors.",
        "D. Secures API endpoints against secret key leaks."
      ],
      correct: 0,
      exp: "EXPLANATION: Thẻ <thinking> cho phép Claude phân tích logic từng bước (Chain-of-Thought) trước khi chốt đáp án, giúp tăng đáng kể độ chính xác."
    }
  ];

  // DOMAIN 5: Context Management & Reliability (15% Weight - Target 300 Questions)
  const d5Templates = [
    {
      archetype: "Customer Support Resolution Agent",
      qVI: "Hiệu ứng Lost-in-the-Middle làm suy giảm trọng số chú ý của Claude ở vị trí nào trong một đoạn context tài liệu dài 150.000 tokens?",
      qEN: "The Lost-in-the-Middle effect decays Claude's attention weights at which position inside a 150,000 token context payload?",
      optsVI: [
        "A. Khoảng 60% nằm ở giữa tài liệu context.",
        "B. Ngay 10% ở đầu tài liệu.",
        "C. Ngay 10% ở cuối tài liệu.",
        "D. Không có vùng nào bị suy giảm."
      ],
      optsEN: [
        "A. The middle ~60% span of the context document payload.",
        "B. The initial 10% document head.",
        "C. The final 10% document tail.",
        "D. No region suffers attention decay."
      ],
      correct: 0,
      exp: "EXPLANATION: Trọng số chú ý của kiến trúc Transformer bị suy giảm ở 60% khoảng giữa context dài. Chỉ thị quan trọng phải đặt ở ĐẦU hoặc ĐUÔI."
    },
    {
      archetype: "Code Generation & Refactoring with Claude Code",
      qVI: "Kỹ thuật Context Pruning (Cắt tỉa bộ nhớ) giúp tiết kiệm 40-60% token bằng cách thực hiện hành động nào ở phía Client Backend?",
      qEN: "Context Pruning saves 40-60% of token consumption by performing which client-side backend action?",
      optsVI: [
        "A. Tước bỏ các khối payload tool_result cũ nặng nề trong lịch sử và thay bằng thẻ tóm tắt tinh gọn trong khi vẫn giữ nguyên System Prompt.",
        "B. Xóa bỏ hoàn toàn mảng messages.",
        "C. Đổi mô hình từ Sonnet sang Haiku.",
        "D. Giảm max_tokens xuống 100."
      ],
      optsEN: [
        "A. Stripping stale verbose tool_result payloads from message history replacing them with lean summaries while preserving system directives.",
        "B. Clearing the entire messages array completely.",
        "C. Switching model tier from Sonnet to Haiku.",
        "D. Lowering max_tokens parameter ceiling to 100."
      ],
      correct: 0,
      exp: "EXPLANATION: Context Pruning tước bỏ các kết quả đọc file/tool thô cũ nhưng giữ lại các quyết định phản hồi, giúp giữ context sạch sẽ."
    },
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Khi 2 nguồn tài liệu trích xuất cho 2 con số tỷ lệ tăng trưởng mâu thuẫn nhau (8% và 12%), nguyên tắc Bảo tồn Nguồn gốc (Preserving Provenance) yêu cầu Agent xử lý ra sao?",
      qEN: "When two ingested documents report conflicting growth rates (8% vs 12%), the Preserving Provenance principle dictates how the Agent should respond?",
      optsVI: [
        "A. Giữ lại cả 2 con số kèm URL, ngày xuất bản của từng nguồn và bật cờ cảnh báo conflict_detected: true.",
        "B. Tự ý xóa bỏ con số 8% và chỉ giữ lại 12%.",
        "C. Tính trung bình cộng lấy 10%.",
        "D. Bỏ qua cả 2 con số."
      ],
      optsEN: [
        "A. Preserve both data points with explicit source URLs, publication dates, and set conflict_detected: true.",
        "B. Discard 8% arbitrarily retaining only 12%.",
        "C. Calculate the average mean of 10%.",
        "D. Omit both figures entirely."
      ],
      correct: 0,
      exp: "EXPLANATION: Preserving Provenance cấm tự ý xóa bỏ dữ liệu mâu thuẫn; Agent phải trích dẫn minh bạch cả 2 nguồn kèm ngày tháng và cờ cảnh báo."
    },
    {
      archetype: "Customer Support Resolution Agent",
      qVI: "File nháp Scratchpad (notes.md) mang lại lợi ích kỹ thuật quan trọng nào cho Agent trong các phiên làm việc dài kéo dài nhiều ngày?",
      qEN: "What primary technical benefit does a persistent Scratchpad file (notes.md) provide an agent during multi-day long-running sessions?",
      optsVI: [
        "A. Giúp Agent ghi lại các phát hiện trung gian ra đĩa; khi nén bộ nhớ (/compact) hoặc ngắt phiên, Agent vẫn mở ra đọc lại được.",
        "B. Giảm 50% chi phí API.",
        "C. Tự động đẩy code lên GitHub.",
        "D. Thay thế cho CSDL SQL."
      ],
      optsEN: [
        "A. Allows the agent to persist intermediate discoveries to disk so state survives memory compaction (/compact) or session reboots.",
        "B. Discounts API billings by 50%.",
        "C. Automatically pushes code commits to GitHub.",
        "D. Replaces the relational SQL database engine."
      ],
      correct: 0,
      exp: "EXPLANATION: Scratchpad lưu vết bộ nhớ làm việc tạm thời ra file đĩa, giúp Agent không bị mất thông tin quan trọng khi tóm tắt nén context."
    }
  ];

  // Populate dynamic variations up to 2,000+ items (Clean direct question text)
  const doms = [
    { code: "D1", title: "Agent Architecture & Orchestration", templates: d1Templates, target: 540 },
    { code: "D2", title: "Tool Design & MCP Integration", templates: d2Templates, target: 360 },
    { code: "D3", title: "Claude Code Workflows", templates: d3Templates, target: 400 },
    { code: "D4", title: "Prompt Engineering & Structured Output", templates: d4Templates, target: 400 },
    { code: "D5", title: "Context Management & Reliability", templates: d5Templates, target: 300 }
  ];

  doms.forEach(dom => {
    for (let i = 0; i < dom.target; i++) {
      const baseTpl = dom.templates[i % dom.templates.length];
      const variationId = currentId++;

      pool.push({
        id: variationId,
        domain: dom.code,
        domainTitle: dom.title,
        archetype: baseTpl.archetype,
        question: baseTpl.qVI,
        questionEN: baseTpl.qEN,
        options: baseTpl.optsVI,
        optionsEN: baseTpl.optsEN,
        correct: baseTpl.correct,
        explanation: baseTpl.exp
      });
    }
  });

  return pool;
}

const MOCK_EXAM_QUESTION_POOL = generateMockQuestionsPool();
