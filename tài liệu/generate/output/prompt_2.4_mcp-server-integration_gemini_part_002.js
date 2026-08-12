[
  {
    "id": "d2-b05-new-003",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-003",
    "questionEN": "A lead developer configures an MCP server exposing a staging database tool \"query_staging_db\" in their personal \"/.config/claude / mcp.json\" configuration. When other backend engineers clone the repository and run Claude Code CLI to execute database workflows, Claude Code reports \"Tool query_staging_db not found\". What configuration change makes the MCP server available to all team members collaborating on the repository?",
    "question": "[d2-b05-new-003] Một trưởng nhóm phát triển cấu hình một MCP server chứa công cụ \"query_staging_db\" để truy vấn cơ sở dữ liệu thử nghiệm trong tệp \"/.config/claude / mcp.json\" trên máy cá nhân. Khi các kỹ sư khác clone repository của dự án và khởi chạy Claude Code CLI để thực hiện các quy trình làm việc, Claude Code báo lỗi \"Tool query_staging_db not found\". Thay đổi cấu hình nào sẽ giúp công cụ MCP này khả dụng cho tất cả thành viên trong nhóm làm việc trên repository?",
    "optionsEN": [
      "A. Update the command field in \" /.config / claude / mcp.json\" from \"node\" to \"npx - y\" so Claude Code automatically fetches the MCP server binary on each developer machine.",
      "B. Change the server transport type from \"stdio\" to \"sse\" inside \" /.config / claude / mcp.json\" so the personal configuration streams over HTTP to team members.",
      "C. Move the MCP server configuration block from user-level \" /.config / claude / mcp.json\" into project-level \".claude / mcp.json\" and commit \".claude / mcp.json\" to the git repository.",
      "D. Add an \"export \": true field to the server entry in \"/.config/claude / mcp.json\" to broadcast the tool definition across the local area network."
    ],
    "options": [
      "A. Cập nhật trường \"command\" trong \" /.config / claude / mcp.json\" từ \"node\" thành \"npx - y\" để Claude Code tự động tải binary của MCP server về máy từng lập trình viên.",
      "B. Đổi loại transport của server từ \"stdio\" sang \"sse\" trong \" /.config / claude / mcp.json\" để cấu hình cá nhân phát dữ liệu qua HTTP đến các thành viên nhóm.",
      "C. Chuyển khối cấu hình MCP server từ \" /.config / claude / mcp.json\" cấp người dùng sang \".claude / mcp.json\" cấp dự án và commit file \".claude / mcp.json\" vào git repository.",
      "D. Thêm trường \"export \": true vào entry của server trong \" /.config / claude / mcp.json\" để phát tán định nghĩa công cụ qua mạng nội bộ."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because changing the command execution wrapper does not alter the configuration file scope or share user-level settings across git repositories.",
      "Option B is incorrect because SSE changes the communication protocol from stdio to HTTP/SSE, but does not solve the visibility issue caused by keeping the config in a personal user-level directory.",
      "Option C is correct because user-level \" /.config / claude / mcp.json\" is private to an individual user's machine, whereas \".claude / mcp.json\" at the project root is tracked by git and automatically loaded by Claude Code for any developer working in that workspace.",
      "Option D is incorrect because MCP configuration files do not support an \"export \" field or network broadcast mechanisms to distribute local user settings."
    ],
    "rationale": "User-level \" /.config / claude / mcp.json\" stores personal tool configurations that are isolated to a single developer's machine. To share MCP tools across a team, the configuration must be placed in \".claude / mcp.json\" at the project root and committed to version control so all collaborators inherit it.",
    "explanation": "Trong kiến trúc Claude Code và MCP, tệp cấu hình cấp người dùng (\" /.config / claude / mcp.json\" hoặc \" /.claude.json\") chỉ áp dụng cho riêng máy cá nhân của lập trình viên và không được đồng bộ qua Git. Khi cần chia sẻ các MCP server (như công cụ truy vấn database staging) cho toàn bộ thành viên dự án, khối cấu hình phải được đặt tại tệp \".claude / mcp.json\" (hoặc \"mcp.json\") ở thư mục gốc của dự án và commit vào repository. Các lựa chọn khác như thay đổi \"command\", đổi transport sang \"sse\", hay dùng thuộc tính không tồn tại \"export \": true đều không giải quyết được vấn đề phạm vi lưu trữ tệp cấu hình.",
    "scenarioSignature": {
      "testedPrinciple": "project-level versus user-level MCP configuration scoping",
      "failureMode": "teammates unable to access project MCP tools",
      "rootCause": "MCP server configured in user-level mcp.json instead of project root",
      "requiredFix": "relocate server configuration to project .claude/mcp.json and commit to git"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-004",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-004",
    "questionEN": "A DevOps engineer configures an internal MCP server in \".claude / mcp.json\" at the project root to automate code reviews. To pass credentials to the server, the engineer hardcodes \"env\": {\"ANTHROPIC_API_KEY\": \"sk - ant - api03 - live - 12345...\"} directly inside \".claude / mcp.json\" and commits the file to a shared GitHub repository. Security scanners immediately flag an active secret leak in git history. How should the configuration be refactored to securely supply sensitive credentials to the MCP server without committing secrets?",
    "question": "[d2-b05-new-004] Một kỹ sư DevOps cấu hình MCP server nội bộ trong tệp \".claude / mcp.json\" tại thư mục gốc dự án để tự động hóa việc review mã nguồn. Để truyền thông tin xác thực cho server, kỹ sư này viết trực tiếp \"env\": {\"ANTHROPIC_API_KEY\": \"sk - ant - api03 - live - 12345...\"} vào \".claude / mcp.json\" và commit tệp lên GitHub repository chung. Công cụ quét bảo mật ngay lập tức cảnh báo khóa bí mật bị rò rỉ trong lịch sử git. Cần tái cấu trúc tệp cấu hình như thế nào để cung cấp thông tin xác thực an toàn cho MCP server mà không lưu secret vào git?",
    "optionsEN": [
      "A. Move \".claude / mcp.json\" to \".claude / mcp.json.encrypted\" and add a build script that decrypts the file at runtime using a repository password.",
      "B. Replace the plaintext API key with a base64-encoded string inside the \"env\" object of \".claude / mcp.json\" so security regex scanners skip the key format.",
      "C. Change the MCP server transport from \"stdio\" to \"sse\" so the API key is passed dynamically via HTTP headers rather than environment variables.",
      "D. Remove the hardcoded secret from \".claude / mcp.json\", reference the variable as \"${ ANTHROPIC_API_KEY }\" or rely on environment variable expansion from the host shell, and revoke the exposed API key."
    ],
    "options": [
      "A. Di chuyển \".claude / mcp.json\" thành \".claude / mcp.json.encrypted\" và thêm script giải mã tệp khi chạy bằng mật khẩu chung của repository.",
      "B. Thay thế API key dạng văn bản thuần bằng chuỗi mã hóa base64 trong đối tượng \"env\" của \".claude / mcp.json\" để tránh bị phát hiện bởi công cụ quét biểu thức chính quy.",
      "C. Đổi transport của MCP server từ \"stdio\" sang \"sse\" để API key được truyền động qua các tiêu đề HTTP thay vì qua biến môi trường.",
      "D. Xóa secret viết cứng khỏi \".claude / mcp.json\", tham chiếu biến dạng \"${ ANTHROPIC_API_KEY }\" hoặc để server thừa hưởng từ môi trường shell local của lập trình viên, đồng thời thu hồi API key đã bị rò rỉ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because committing encrypted files with shared secrets into git is anti-pattern and creates decryption key management complexity without leveraging standard environment variable inheritance.",
      "Option B is incorrect because base64 is an encoding format, not encryption or secret isolation, so the credential remains easily recoverable in public git history.",
      "Option C is incorrect because changing the transport protocol to SSE does not address credentials hardcoded in version-controlled config files.",
      "Option D is correct because configuration files committed to git should never contain plaintext secrets; credentials must be injected via host environment variables (or variable substitution), and any secret committed to git must be revoked immediately."
    ],
    "rationale": "Hardcoding API keys in committed configuration files like \".claude / mcp.json\" leaks secrets into version control history. The secure design pattern is to omit literal secret values from \".claude / mcp.json\", allowing MCP servers to inherit credentials from the host shell's environment variables (or system secret manager), while revoking any exposed credentials immediately.",
    "explanation": "Trong quản lý cấu hình MCP, tệp \".claude / mcp.json\" được commit vào hệ thống quản lý phiên bản (Git) nên tuyệt đối không được chứa API key hoặc secret dạng văn bản thuần. Việc mã hóa base64 (Phương án B) không có tính bảo mật vì dễ dàng giải mã, còn mã hóa tệp (Phương án A) gây phức tạp quản lý khóa giải mã. Chuyển sang transport \"sse\" (Phương án C) cũng không giải quyết nguyên nhân gốc rễ là viết cứng credential trong config. Giải pháp chuẩn là xóa secret khỏi tệp cấu hình, tham chiếu qua biến môi trường của hệ thống/shell local, và ngay lập tức revoking khóa đã rò rỉ.",
    "scenarioSignature": {
      "testedPrinciple": "secure handling of API credentials in MCP server configuration",
      "failureMode": "sensitive API credentials exposed in version control history",
      "rootCause": "hardcoded secret keys stored directly inside committed mcp.json file",
      "requiredFix": "reference environment variables in config and manage secrets via host environment"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]