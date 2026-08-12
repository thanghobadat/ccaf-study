[
  {
    "id": "d2-b05-B-011",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-011",
    "scenarioSignature": {
      "testedPrinciple": "parameterized prompt template customization via MCP Prompts protocol",
      "failureMode": "generic prompt instructions failing specific domain rules across different invocation contexts",
      "rootCause": "prompt template defined without argument parameters or dynamic client value passing",
      "requiredFix": "define prompt arguments schema in prompts list and evaluate arguments in prompts get"
    },
    "questionEN": "An enterprise engineering team implements a central MCP server providing a code_review prompt template. Different teams require code reviews formatted for specific programming languages (e.g., TypeScript vs Rust) and review styles (e.g., security-focused vs performance-focused). When developers trigger the prompt template without arguments, the LLM receives generic review instructions that fail to check language-specific idiom rules or security compliance standards. How should the team configure the MCP server's prompt definition and client request handling to dynamically adapt prompt instructions per invocation?",
    "question": "[d2-b05-B-011] Một đội ngũ kỹ thuật doanh nghiệp triển khai MCP server trung tâm cung cấp mẫu prompt code_review. Các đội ngũ khác nhau yêu cầu đánh giá mã nguồn được định dạng cho các ngôn ngữ lập trình cụ thể (ví dụ: TypeScript so với Rust) và phong cách đánh giá (ví dụ: tập trung vào bảo mật so với hiệu năng). Khi lập trình viên kích hoạt mẫu prompt mà không truyền tham số, LLM nhận được các hướng dẫn đánh giá chung chung, không kiểm tra được các quy tắc đặc thù ngôn ngữ hoặc tiêu chuẩn tuân thủ bảo mật. Đội ngũ nên cấu hình định nghĩa prompt và xử lý yêu cầu phía client của MCP server như thế nào để tùy biến linh hoạt hướng dẫn prompt theo từng lần gọi?",
    "optionsEN": [
      "A. Define code_review as a static MCP Resource returning predefined markdown files, and configure the client to load all language variations into context simultaneously.",
      "B. Register separate hardcoded MCP Tools for every language and style combination (e.g., review_typescript_security, review_rust_performance) to handle prompt formatting logic inside tool handlers.",
      "C. Define the code_review prompt in prompts/list with an arguments array specifying language and style, and use prompts/get to render customized instructions based on the client's passed argument values.",
      "D. Configure environment variables in mcp.json under env for DEFAULT_LANGUAGE and DEFAULT_STYLE so the server statically defaults all code review requests."
    ],
    "options": [
      "A. Định nghĩa code_review như một MCP Resource tĩnh trả về các file markdown có sẵn, và cấu hình client nạp tất cả biến thể ngôn ngữ vào context cùng lúc.",
      "B. Đăng ký các MCP Tool cứng riêng biệt cho mọi kết hợp ngôn ngữ và phong cách (ví dụ: review_typescript_security, review_rust_performance) để xử lý logic định dạng prompt bên trong trình xử lý tool.",
      "C. Định nghĩa prompt code_review trong prompts/list với mảng arguments chỉ định language và style, và sử dụng prompts/get để render các hướng dẫn tùy chỉnh dựa trên các giá trị tham số được client truyền vào.",
      "D. Cấu hình các biến môi trường trong mcp.json bên dưới env cho DEFAULT_LANGUAGE và DEFAULT_STYLE để server đặt mặc định tĩnh cho tất cả các yêu cầu đánh giá mã nguồn."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Static MCP Resources return fixed data payloads and loading all language variations fills the context window unnecessarily rather than customizing the prompt.",
      "Option B is incorrect: Creating individual MCP Tools for every combination creates unnecessary tool bloat and misuses Tools for prompt template generation instead of executable actions.",
      "Option C is correct: MCP Prompts support parameterized arguments defined in prompts/list (arguments schema), allowing prompts/get to accept language and style inputs to dynamically construct context-specific prompt messages for each invocation.",
      "Option D is incorrect: Configuring global environment variables in mcp.json sets static server defaults across all clients rather than allowing dynamic per-invocation customization by developers."
    ],
    "rationale": "Defining prompt arguments (language and style) in prompts/list allows the client to pass specific parameters during prompts/get, enabling the MCP server to dynamically return tailored prompt instructions without code duplication or context window clutter.",
    "explanation": "Trong giao thức MCP, khả năng MCP Prompts cho phép định nghĩa các mẫu câu lệnh có thể tham số hóa. Khi khai báo prompt trong prompts/list, server định nghĩa danh sách arguments (ví dụ: language và style). Khi client kích hoạt prompt qua prompts/get, các tham số này được truyền vào để server tổng hợp và trả về nội dung prompt tùy chỉnh phù hợp với đúng ngữ cảnh yêu cầu.\n\n- Option A sai vì MCP Resource tĩnh chỉ trả về dữ liệu cố định và việc nạp tất cả biến thể vào context làm lãng phí không gian ngữ cảnh thay vì tùy biến linh hoạt.\n- Option B sai vì việc tạo Tool riêng cho từng kết hợp gây ra bùng nổ số lượng tool và dùng sai bản chất của Tool (thực thi hành động) thay vì Prompt (mẫu chỉ dẫn).\n- Option C đúng vì giao thức MCP Prompts hỗ trợ tham số hóa qua mảng arguments trong prompts/list. Khi client gọi prompts/get với các giá trị language và style, MCP server có thể render các câu lệnh prompt được tùy chỉnh chính xác cho từng lần gọi.\n- Option D sai vì biến môi trường trong mcp.json chỉ áp dụng cấu hình tĩnh toàn cục cho server, không hỗ trợ chuyển đổi linh hoạt tham số giữa các lần gọi prompt khác nhau của người dùng.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-012",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-012",
    "scenarioSignature": {
      "testedPrinciple": "stdio transport lifecycle tied to host client session process boundaries",
      "failureMode": "loss of in-memory server state when starting a new client session",
      "rootCause": "stdio MCP server process is spawned at session initialization and killed on exit",
      "requiredFix": "persist server state to external storage or migrate to persistent SSE transport"
    },
    "questionEN": "A developer runs an in-memory caching MCP server over stdio configured in .claude/mcp.json (\"transport\": \"stdio\"). During an active Claude Code CLI terminal session, the agent uses an MCP tool to cache operational tokens and build state in server RAM. However, when the developer exits Claude Code and starts a new CLI session in a separate terminal tab, all previously cached data disappears, forcing the server to re-fetch authorization tokens from an external API. What is the root cause of this state data loss across sessions?",
    "question": "[d2-b05-B-012] Một lập trình viên vận hành MCP server lưu cache trong bộ nhớ RAM qua giao thức stdio được cấu hình trong .claude/mcp.json (\"transport\": \"stdio\"). Trong một phiên làm việc Claude Code CLI đang chạy, agent sử dụng MCP tool để lưu cache các token vận hành và trạng thái build vào RAM của server. Tuy nhiên, khi lập trình viên thoát Claude Code và mở một phiên CLI mới ở tab terminal riêng biệt, tất cả dữ liệu cache trước đó đều biến mất, buộc server phải lấy lại token xác thực từ API bên ngoài. Nguyên nhân gốc rễ của việc mất dữ liệu trạng thái giữa các phiên làm việc này là gì?",
    "optionsEN": [
      "A. The stdio transport protocol requires --mcp-config with --persist-state flag to serialize in-memory RAM variables to local disk across process restarts.",
      "B. The client process failed to issue a tools/list health check request on startup, causing the MCP server to revert to its factory initial state.",
      "C. Claude Code stores stdio tool response payloads in temporary subagent memory buffers that are purged when subagents complete execution.",
      "D. Claude Code spawns a separate child process for stdio MCP servers on session startup and terminates it on exit, destroying all in-memory process state between sessions."
    ],
    "options": [
      "A. Giao thức truyền tải stdio yêu cầu cờ --persist-state cùng với --mcp-config để tuần tự hóa các biến RAM trong bộ nhớ xuống đĩa cục bộ qua các lần khởi động lại tiến trình.",
      "B. Tiến trình client không gửi yêu cầu kiểm tra sức khỏe tools/list khi khởi động, khiến MCP server khôi phục về trạng thái khởi tạo ban đầu.",
      "C. Claude Code lưu trữ dữ liệu phản hồi của stdio tool trong bộ nhớ đệm tạm thời của subagent và bộ nhớ này sẽ bị xóa khi subagent hoàn thành tác vụ.",
      "D. Claude Code khởi chạy một tiến trình con riêng biệt cho stdio MCP server khi bắt đầu phiên làm việc và chấm dứt tiến trình đó khi thoát, làm xóa toàn bộ trạng thái trong bộ nhớ giữa các phiên."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: There is no --persist-state CLI flag for stdio MCP configuration; process lifecycles naturally reset in-memory RAM upon exit.",
      "Option B is incorrect: Failing to issue tools/list would affect tool discovery, not cause in-memory state eviction between independent process executions.",
      "Option C is incorrect: Tool output caching by subagents does not dictate the process execution scope or memory retention of the underlying stdio MCP server.",
      "Option D is correct: stdio transport binds the MCP server lifecycle directly to the Claude Code CLI session process, spawning a fresh subprocess on start and terminating it on exit, which clears any unpersisted in-memory state."
    ],
    "rationale": "stdio MCP servers run as child processes tied to the client session duration. When the Claude Code CLI session terminates, the child process is killed, destroying all in-memory cache data unless external persistent storage or an SSE transport daemon is used.",
    "explanation": "Giao thức truyền tải stdio hoạt động bằng cách khởi chạy MCP server như một tiến trình con (child process) trực thuộc tiến trình client (Claude Code CLI). Khi phiên làm việc CLI kết thúc, tiến trình con này bị tiêu hủy (SIGTERM/SIGKILL), dẫn đến toàn bộ RAM và biến lưu trong bộ nhớ của server bị giải phóng. Khi mở phiên mới, Claude Code khởi tạo một tiến trình mới hoàn toàn với trạng thái bộ nhớ sạch.\n\n- Option A sai vì không tồn tại cờ --persist-state trong cấu hình stdio MCP; việc mất RAM xảy ra tự nhiên do vòng đời tiến trình bị chấm dứt.\n- Option B sai vì lệnh tools/list chỉ dùng để khám phá danh sách tool, không liên quan đến việc duy trì hoặc khôi phục trạng thái bộ nhớ RAM của tiến trình server.\n- Option C sai vì bộ nhớ đệm của subagent không quản lý hay ảnh hưởng đến vòng đời tiến trình thực thi của MCP server chạy bên dưới.\n- Option D đúng vì giao thức stdio gắn chặt vòng đời của MCP server với phiên CLI của Claude Code. Mỗi khi mở phiên mới, Claude Code sẽ spawn một tiến trình con mới (fresh process) và kill tiến trình cũ khi thoát phiên, dẫn đến toàn bộ dữ liệu lưu trong bộ nhớ RAM bị giải phóng.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]