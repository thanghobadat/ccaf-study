[
  {
    "id": "d2-b05-new-001",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-001",
    "questionEN": "A DevOps team attempts to connect Claude Code CLI to an Atlassian Jira Cloud instance using an MCP server config in .claude/mcp.json. The configuration specifies \"command\": \"node\", \"args\": [\"jira - mcp - server.js\"], \"transport\": \"stdio\", and points to https://company.atlassian.net/rest/api/3. Upon startup, the client fails with ENOTTY / process exit code 1 because stdio transport expects to launch and stream standard I/O to a local subprocess executable rather than communicating with an HTTP endpoint directly. Which configuration modification resolves this integration failure?",
    "question": "[d2-b05-new-001] Một đội ngũ DevOps cố gắng kết nối Claude Code CLI với một instance Atlassian Jira Cloud bằng file cấu hình MCP .claude/mcp.json. Cấu hình chỉ định \"command\": \"node\", \"args\": [\"jira - mcp - server.js\"], \"transport\": \"stdio\", và hướng tới endpoint https://company.atlassian.net/rest/api/3. Khi khởi động, client báo lỗi ENOTTY / process exit code 1 vì transport stdio yêu cầu thực thi và luồng dữ liệu I/O với một tiến trình con (subprocess) cục bộ thay vì giao tiếp trực tiếp với một HTTP endpoint. Thay đổi cấu hình nào sau đây giải quyết triệt để lỗi tích hợp này?",
    "optionsEN": [
      "A. Change \"transport\" to \"sse\" and specify \"url\": \"https://company.atlassian.net/mcp/sse\" in .claude/mcp.json so the client establishes a persistent HTTP Server-Sent Events connection rather than invoking a local subprocess.",
      "B. Add \"tty\": true and \"interactive\": true flags to the args array in .claude/mcp.json to force the stdio stream to emulate an interactive shell terminal for HTTP requests.",
      "C. Replace the Jira API token with an SSH private key in the \"env\" block of .claude/mcp.json so stdio can tunnel HTTP REST commands over standard input.",
      "D. Move .claude/mcp.json from the project root directory to ~/.config/claude/mcp.json so stdio transport gains system-level network socket permissions."
    ],
    "options": [
      "A. Đổi \"transport\" thành \"sse\" và chỉ định \"url\": \"https://company.atlassian.net/mcp/sse\" trong .claude/mcp.json để client thiết lập kết nối HTTP Server-Sent Events thay vì gọi tiến trình con cục bộ.",
      "B. Thêm các cờ \"tty\": true và \"interactive\": true vào mảng args trong .claude/mcp.json để buộc luồng stdio giả lập một terminal shell tương tác cho các yêu cầu HTTP.",
      "C. Thay thế Jira API token bằng SSH private key trong khối \"env\" của .claude/mcp.json để stdio có thể đường hầm (tunnel) các lệnh HTTP REST qua standard input.",
      "D. Di chuyển file .claude/mcp.json từ thư mục gốc dự án sang ~/.config/claude/mcp.json để transport stdio nhận được quyền truy cập network socket ở cấp hệ thống."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Remote HTTP API endpoints like Jira Cloud require the SSE (Server-Sent Events) transport type with a target URL in mcp.json. stdio transport strictly requires launching a local binary/executable subprocess via standard input/output streams.",
      "Option B is incorrect: Adding terminal emulation flags like tty to process arguments does not allow the stdio transport to communicate over remote HTTP REST protocols.",
      "Option C is incorrect: Providing SSH authentication keys inside environment variables does not enable stdio standard stream pipes to directly handle cloud HTTPS network calls.",
      "Option D is incorrect: Moving mcp.json to user-level configuration changes server availability scope across projects but does not modify the underlying transport protocol execution mechanism."
    ],
    "rationale": "Configuring a cloud-hosted REST API with stdio transport fails because stdio requires spawning and communicating with a local binary via stdin/stdout. Switching transport to SSE with an explicit HTTP URL enables remote API integration over network sockets.",
    "explanation": "Đáp án đúng là A.\\n- Option A đúng: Transport stdio chỉ dành cho các công cụ dạng CLI/binary chạy cục bộ như một subprocess trên máy người dùng. Để kết nối với dịch vụ API từ xa qua HTTP như Jira Cloud, cấu hình MCP phải sử dụng transport sse kết hợp với tham số url trỏ tới endpoint HTTP SSE.\\n- Option B sai: Việc thêm cờ emulated TTY vào đối số tiến trình không thể biến cơ chế giao tiếp I/O luồng tiêu chuẩn (stdio) thành một HTTP client truyền nhận gói tin mạng.\\n- Option C sai: SSH key trong biến môi trường không giúp luồng stdio tự đóng gói và mở kết nối HTTPS REST tới máy chủ đám mây.\\n- Option D sai: Việc chuyển mcp.json từ project scope sang user scope (~/.config/claude/mcp.json) chỉ thay đổi phạm vi chia sẻ cấu hình giữa các dự án chứ không thay đổi giao thức transport bên dưới.",
    "scenarioSignature": {
      "testedPrinciple": "MCP stdio transport local binary execution requirement",
      "failureMode": "MCP server initialization connection error for remote cloud API",
      "rootCause": "cloud REST API configured with stdio transport instead of SSE transport",
      "requiredFix": "reconfigure MCP server transport to SSE with HTTP URL endpoint"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-002",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-002",
    "questionEN": "A developer configures a fast codebase search MCP tool using a locally compiled ripgrep binary in mcp.json. The configuration specifies \"command\": \"/usr/local/bin/rg\", \"args\": [\"--json\"], \"transport\": \"sse\", and \"url\": \"http://localhost:8080/mcp\". Upon launching the MCP client, connection fails immediately with ECONNREFUSED 127.0.0.1:8080 because SSE transport attempts to establish an HTTP stream with a remote web server, whereas ripgrep is a CLI executable subprocess operating via stdin/stdout. Which configuration change correctly resolves this issue?",
    "question": "[d2-b05-new-002] Một lập trình viên cấu hình công cụ MCP tìm kiếm mã nguồn bằng binary ripgrep biên dịch cục bộ trong file mcp.json. Cấu hình ghi rõ \"command\": \"/usr/local/bin/rg\", \"args\": [\"--json\"], \"transport\": \"sse\", và \"url\": \"http://localhost:8080/mcp\". Khi khởi chạy MCP client, kết nối thất bại ngay lập tức với lỗi ECONNREFUSED 127.0.0.1:8080 vì transport SSE cố gắng mở một HTTP stream tới máy chủ web từ xa, trong khi ripgrep là một tiến trình CLI thực thi qua stdin/stdout. Thay đổi cấu hình nào sau đây giải quyết đúng vấn đề này?",
    "optionsEN": [
      "A. Start a local Nginx reverse proxy listening on port 8080 to map incoming SSE HTTP requests directly to standard input pipes of /usr/local/bin/rg.",
      "B. Change \"transport\" to \"stdio\" and remove the \"url\" field in mcp.json so the MCP client spawns the ripgrep binary directly as a local subprocess.",
      "C. Add \"headers\": {\"Content-Type\": \"text/event-stream\"} to the mcp.json environment block to instruct the ripgrep binary to output SSE event streams.",
      "D. Update \"command\" to /usr/bin/curl with args set to [\"http://localhost:8080/mcp\"] so sse transport can execute local terminal searches."
    ],
    "options": [
      "A. Khởi chạy một Nginx reverse proxy cục bộ lắng nghe trên cổng 8080 để ánh xạ các yêu cầu HTTP SSE tới luồng standard input của /usr/local/bin/rg.",
      "B. Thay đổi \"transport\" thành \"stdio\" và xóa trường \"url\" trong mcp.json để MCP client khởi tạo trực tiếp binary ripgrep như một tiến trình con cục bộ.",
      "C. Thêm \"headers\": {\"Content-Type\": \"text/event-stream\"} vào khối môi trường của mcp.json để hướng dẫn binary ripgrep xuất ra dữ liệu luồng sự kiện SSE.",
      "D. Cập nhật \"command\" thành /usr/bin/curl với args đặt là [\"http://localhost:8080/mcp\"] để transport sse có thể thực thi tìm kiếm terminal cục bộ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Configuring an external reverse proxy like Nginx adds unnecessary infrastructure complexity and does not address the native MCP standard pattern of executing local CLI binaries via stdio.",
      "Option B is correct: Local CLI binaries (like ripgrep) communicate via standard input/output streams (stdin/stdout) and must be configured with \"transport\": \"stdio\" without an HTTP url field.",
      "Option C is incorrect: Adding HTTP headers to environment variables does not transform a command-line binary into an HTTP web server capable of serving Server-Sent Events.",
      "Option D is incorrect: Replacing the ripgrep command with curl fails to run local search operations and does not resolve the missing HTTP service on port 8080."
    ],
    "rationale": "Configuring a local CLI binary with SSE transport fails because SSE expects an active HTTP web server endpoint. Local binaries communicate via standard input/output streams and require stdio transport.",
    "explanation": "Đáp án đúng là B.\\n- Option A sai: Cấu hình thêm Nginx reverse proxy gây phức tạp hóa hạ tầng không cần thiết và không tuân thủ chuẩn MCP dành cho công cụ dòng lệnh cục bộ.\\n- Option B đúng: Các công cụ dòng lệnh/binary chạy cục bộ (như ripgrep) giao tiếp qua các luồng I/O tiêu chuẩn (stdin/stdout). Do đó, cấu hình MCP phải sử dụng \"transport\": \"stdio\" và không chứa trường url dành cho kết nối mạng HTTP.\\n- Option C sai: Khai báo HTTP header trong biến môi trường không thể biến một file thực thi CLI thành một web server phát sự kiện SSE qua giao thức HTTP.\\n- Option D sai: Đổi lệnh thành curl làm mất khả năng tìm kiếm mã nguồn của ripgrep và vẫn thất bại do cổng 8080 không có dịch vụ nào lắng nghe.",
    "scenarioSignature": {
      "testedPrinciple": "MCP SSE transport HTTP endpoint requirement for local binaries",
      "failureMode": "MCP server startup network connection refusal error for local CLI binary",
      "rootCause": "local CLI binary executable configured with SSE transport expecting HTTP listener",
      "requiredFix": "reconfigure MCP server transport to stdio specifying local binary command"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]