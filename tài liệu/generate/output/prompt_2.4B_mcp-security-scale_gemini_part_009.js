[
  {
    "id": "d2-b05-B-017",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-017",
    "questionEN": "A backend engineer tests a custom database-migration MCP server locally by configuring .claude/mcp.json with standard I/O (\"command\": \"node\", \"args\": [\"./ dist / index.js\"]). Local interactive Claude Code CLI sessions work perfectly. However, when deploying the automated workflow into a Kubernetes staging container where the MCP server is hosted as a standalone containerized service exposing an HTTP SSE endpoint at http://db-mcp-service.internal:8080/sse, the automated agent pipeline fails immediately during startup with \"MCP server connection error: failed to spawn process / dist / index.js(ENOENT)\". Which configuration change in .claude/mcp.json resolves the transport mismatch for the containerized production environment?",
    "question": "[d2-b05-B-017] Một kỹ sư backend thử nghiệm MCP server chuyển đổi cơ sở dữ liệu ở môi trường local bằng cách cấu hình .claude/mcp.json với chuẩn I/O (\"command\": \"node\", \"args\": [\"./ dist / index.js\"]). Các phiên làm việc Claude Code CLI tương tác trên local hoạt động bình thường. Tuy nhiên, khi triển khai quy trình tự động vào container staging trên Kubernetes — nơi MCP server được chạy như một dịch vụ container hóa độc lập lắng nghe HTTP SSE endpoint tại http://db-mcp-service.internal:8080/sse — pipeline của agent thất bại ngay khi khởi động với lỗi \"MCP server connection error: failed to spawn process / dist / index.js(ENOENT)\". Thay đổi cấu hình nào trong .claude/mcp.json sẽ khắc phục lỗi bất đồng transport này cho môi trường production container hóa?",
    "optionsEN": [
      "A. Change the server definition under mcpServers from command execution (command/args) to SSE transport (url: \"http://db-mcp-service.internal:8080/sse\").",
      "B. Add \"env\": {\"TRANSPORT\": \"sse\"} inside the local stdio server definition under mcpServers so the spawned process converts its own stdout stream to HTTP SSE format.",
      "C. Pass --mcp-transport=sse to the Claude Code CLI startup command while retaining the local executable path (command: \"node\") in mcp.json.",
      "D. Mount the local ./dist/index.js file into the Kubernetes pod's root directory and grant execute permissions so stdio process spawning works across container boundaries."
    ],
    "options": [
      "A. Thay đổi định nghĩa server trong mcpServers từ thực thi lệnh (command/args) sang SSE transport (url: \"http://db-mcp-service.internal:8080/sse\").",
      "B. Thêm \"env\": {\"TRANSPORT\": \"sse\"} vào bên trong định nghĩa stdio server ở mcpServers để tiến trình con tự chuyển đổi luồng stdout sang định dạng HTTP SSE.",
      "C. Truyền cờ --mcp-transport=sse vào lệnh khởi chạy Claude Code CLI trong khi vẫn giữ nguyên đường dẫn thực thi local (command: \"node\") trong mcp.json.",
      "D. Mount file ./dist/index.js từ máy local vào thư mục gốc của Kubernetes pod và cấp quyền thực thi để cơ chế stdio process spawn hoạt động qua ranh giới container."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because switching the server entry in mcpServers to specify url rather than command/args instructs the Claude Code client to establish a persistent HTTP/SSE connection to the containerized service rather than attempting to execute a local process.",
      "Option B is incorrect because adding an environment variable inside a stdio block does not alter the client's transport mechanism, so Claude Code still attempts to spawn a local binary.",
      "Option C is incorrect because Claude Code CLI does not support a --mcp-transport=sse command-line flag to dynamically convert command-based process definitions into remote HTTP clients.",
      "Option D is incorrect because mounting local binary files into containers does not connect the client to the remote SSE service and violates container architecture best practices."
    ],
    "rationale": "In MCP architecture, stdio transport is designed for locally spawned subprocesses where Claude Code manages process lifecycle via stdin/stdout streams. When an MCP server is deployed as a remote/containerized service, the client must be configured with url (and SSE transport type) to connect via Server-Sent Events. The failure occurs because the production client configuration retained the development command/args stdio structure instead of referencing the HTTP SSE endpoint.",
    "explanation": "Trong kiến trúc Model Context Protocol (MCP), transport kiểu stdio yêu cầu client (Claude Code) khởi chạy một tiến trình con (subprocess) local và giao tiếp qua stdin/stdout. Khi MCP server được đóng gói và chạy thành một microservice độc lập trong môi trường container (Kubernetes), nó lắng nghe qua giao thức Server-Sent Events (SSE) tại một địa chỉ HTTP endpoint (url). Nếu .claude/mcp.json trên production vẫn dùng thuộc tính command và args của môi trường local, Claude Code sẽ cố tạo tiến trình local bên trong container client và gặp lỗi ENOENT (không tìm thấy file). Để khắc phục, cần cập nhật .claude/mcp.json sử dụng cấu hình transport HTTP SSE bằng thuộc tính url trỏ tới endpoint http://db-mcp-service.internal:8080/sse.",
    "scenarioSignature": {
      "testedPrinciple": "MCP server transport compatibility across local CLI and containerized production environments",
      "failureMode": "MCP server initialization failure due to stdio process execution in non-interactive containerized endpoint",
      "rootCause": "local development mcp.json config uses stdio command execution while production architecture exposes remote server via SSE endpoint",
      "requiredFix": "update production client configuration to use SSE transport url instead of local command stdio spawn"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-018",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-018",
    "questionEN": "A DevOps team creates a custom Git workflow MCP server with a tool defined as create_branch taking an input parameter name: string. During an automated refactoring task, the Claude Code agent calls create_branch with name: \"feature/user auth refactor\". The MCP server executes execSync(git checkout -b ${input.name}), resulting in a runtime failure \"fatal: 'auth' is not a valid branch name\" due to unexpected shell argument splitting. Which engineering implementation on the MCP server side correctly prevents this failure and enforces tool safety?",
    "question": "[d2-b05-B-018] Một đội ngũ DevOps phát triển MCP server cho quy trình Git tự động với một tool có tên create_branch nhận tham số name: string. Trong quá trình refactor tự động, agent Claude Code gọi create_branch với tham số name: \"feature/user auth refactor\". MCP server xử lý bằng câu lệnh execSync(git checkout -b ${input.name}), dẫn đến lỗi runtime \"fatal: 'auth' is not a valid branch name\" do phân tách đối số shell không mong muốn. Giải pháp kỹ thuật nào phía MCP server ngăn chặn lỗi này một cách triệt để và đảm bảo an toàn cho tool?",
    "optionsEN": [
      "A. Rely on prompt engineering by adding system prompt instructions telling Claude to never include spaces in name parameter values.",
      "B. Implement server-side input validation using a strict regex (e.g., /^[a-zA-Z0-9_\\-\\/]+$/) and pass sanitized arguments using array-based execution (execFile/spawn) rather than shell string interpolation.",
      "C. Update mcp.json to wrap the MCP server command in a shell wrapper script that automatically replaces spaces with underscores in all CLI arguments before process launch.",
      "D. Modify the inputSchema description field in the MCP tool definition to mark the name field as deprecated_has_spaces."
    ],
    "options": [
      "A. Phụ thuộc vào prompt engineering bằng cách thêm câu lệnh vào system prompt yêu cầu Claude không bao giờ được chèn khoảng trắng trong giá trị của tham số name.",
      "B. Thực thi kiểm tra đầu vào (input validation) phía server dùng regex nghiêm ngặt (ví dụ: /^[a-zA-Z0-9_\\-\\/]+$/) và truyền tham số đã làm sạch qua cơ chế gọi tiến trình dạng mảng (execFile/spawn) thay vì nối chuỗi shell.",
      "C. Cập nhật mcp.json để bọc lệnh chạy MCP server trong một script shell wrapper nhằm tự động thay thế khoảng trắng thành dấu gạch dưới cho mọi argument CLI khi khởi chạy tiến trình.",
      "D. Sửa đổi trường mô tả inputSchema trong định nghĩa MCP tool để đánh dấu trường name thành deprecated_has_spaces."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because LLM prompts do not guarantee strict deterministic formatting, leaving server execution vulnerable to unexpected inputs.",
      "Option B is correct because MCP servers must sanitize all tool inputs via server-side schema/regex validation and execute subprocesses via parameterized array invocation (execFile/spawn) to prevent argument splitting and command injection.",
      "Option C is incorrect because client-level launch wrappers in mcp.json only modify server startup parameters, not JSON-RPC tool payloads sent dynamically during conversation turns.",
      "Option D is incorrect because modifying schema descriptions provides advice to the model but does not programmatically block invalid string parameters from reaching shell commands."
    ],
    "rationale": "Models (LLMs) can generate invalid or hostile parameter values (such as branch names with spaces or shell metacharacters). MCP server implementation best practices strictly dictate that tool handlers must validate and sanitize all inputs before calling external binaries or shell commands. Additionally, passing arguments as separate elements in array-based process calls (e.g., execFile(\"git\", [\"checkout\", \"-b\", sanitizedName])) prevents shell interpolation errors and command injection.",
    "explanation": "Trong kiến trúc MCP, các dữ liệu tham số do mô hình LLM truyền vào tool handler luôn phải được coi là dữ liệu không tin cậy (untrusted input). Khi mô hình truyền một tên branch có chứa khoảng trắng (\"feature/user auth refactor\"), việc MCP server sử dụng nối chuỗi trực tiếp trong shell (execSync) sẽ khiến shell phân tách tham số thành các từ riêng biệt (git checkout -b feature/user auth refactor), dẫn đến lỗi thực thi CLI Git. Để khắc phục triệt để:\\n1. Thực hiện server-side validation phía MCP server: Sử dụng regex để kiểm tra định dạng hợp lệ của tên branch (chỉ cho phép chữ cái, số, dấu gạch ngang, gạch dưới, dấu xuyệt).\\n2. Sử dụng cơ chế gọi tiến trình an toàn bằng mảng tham số (ví dụ: execFile('git', ['checkout', '-b', sanitizedName])) để tránh việc shell tự ý phân tách chuỗi hoặc nguy cơ Command Injection.",
    "scenarioSignature": {
      "testedPrinciple": "MCP tool input validation and sanitization for command execution safety",
      "failureMode": "git command failure or command injection caused by unvalidated string argument with whitespace",
      "rootCause": "MCP server relies on model output formatting and passes raw tool arguments directly into shell command",
      "requiredFix": "implement server-side input schema validation and string sanitization prior to subprocess execution"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]