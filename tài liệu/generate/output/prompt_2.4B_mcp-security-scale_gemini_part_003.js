[
  {
    "id": "d2-b05-B-005",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-005",
    "scenarioSignature": {
      "testedPrinciple": "stdio protocol isolation and stderr log redirection for MCP servers",
      "failureMode": "interleaved log entries and transport decoding errors in client stdout",
      "rootCause": "MCP server logging directly to stdout reserved for stdio JSON-RPC transport framing",
      "requiredFix": "redirect all server diagnostic logs to stderr stream"
    },
    "questionEN": "A platform team integrates a custom Python-based FastMCP service into Claude Code via .claude/mcp.json using stdio transport (command: \"python\", args: [\"server.py\"]). During debugging of database queries, developers notice that standard print() statements from server.py pollute the terminal output, causing JSON-RPC framing errors in Claude Code and preventing engineers from tracing which specific tool invocation produced each log entry. What architectural logging change resolves this transport collision and restores clean log tracing?",
    "question": "[d2-b05-B-005] Một nhóm phát triển tích hợp một MCP server viết bằng Python vào Claude Code qua .claude/mcp.json sử dụng transport stdio (command: \"python\", args: [\"server.py\"]). Trong quá trình kiểm tra lỗi truy vấn cơ sở dữ liệu, các kỹ sư nhận thấy các câu lệnh print() tiêu chuẩn từ server.py làm xáo trộn đầu ra terminal, gây ra lỗi framing JSON-RPC trong Claude Code và khiến họ không thể xác định được lệnh gọi tool nào đã tạo ra từng dòng log. Thay đổi kiến trúc ghi log nào giải quyết được sự xung đột transport này và khôi phục khả năng theo dõi log sạch sẻ?",
    "optionsEN": [
      "A. Redirect all MCP server diagnostic logging output to stderr (or use logging frameworks configured for stderr), reserving stdout exclusively for stdio JSON-RPC protocol framing.",
      "B. Enable verbose: true inside .claude/mcp.json under the server configuration block to force Claude Code to automatically filter stdout logs.",
      "C. Switch the command configuration from python server.py to python -u server.py to unbuffer stdout streams.",
      "D. Increase the timeout parameter in mcp.json to allow Claude Code extra time to parse interleaved stdout log strings."
    ],
    "options": [
      "A. Chuyển hướng tất cả nhật ký chẩn đoán của MCP server sang stderr (hoặc sử dụng logging framework được cấu hình cho stderr), dành riêng stdout cho việc truyền tin theo giao thức JSON-RPC của stdio.",
      "B. Bật thiết lập verbose: true bên trong khối cấu hình server của file .claude/mcp.json để buộc Claude Code tự động lọc các dòng log trong stdout.",
      "C. Thay đổi lệnh cấu hình từ python server.py thành python -u server.py để bỏ bộ đệm (unbuffer) cho luồng xuất stdout.",
      "D. Tăng thông số timeout trong mcp.json để cho phép Claude Code có thêm thời gian phân tích các chuỗi log bị xen kẽ trong stdout."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: In MCP stdio transport, stdout is strictly reserved for JSON-RPC message framing between client and server. Redirecting logs to stderr prevents protocol corruption and allows Claude Code to capture logs separately without breaking JSON-RPC communication.",
      "Option B is incorrect: mcp.json does not support a verbose: true setting to parse or separate stdout logs that violate stdio protocol framing.",
      "Option C is incorrect: Unbuffering stdout (python -u) flushes output instantly but still sends logs to stdout, which corrupts JSON-RPC framing messages.",
      "Option D is incorrect: Increasing tool call timeouts does not resolve syntax and protocol framing errors caused by stdout stream interleaving."
    ],
    "rationale": "In stdio MCP transport, stdout is exclusively owned by the JSON-RPC framing protocol. Any unformatted stdout writes (like print statements) corrupt transport framing and mix into client streams. Routing logs to stderr isolates diagnostics cleanly from the protocol channel.",
    "explanation": "Phân tích các phương án:\n- Phương án A đúng: Trong giao thức stdio của MCP, stdout được dành riêng tuyệt đối cho việc truyền nhận thông điệp JSON-RPC giữa client và server. Việc ghi log ra stderr giúp bảo vệ tính toàn vẹn của giao thức stdio, cho phép Claude Code thu thập log tách biệt mà không làm gián đoạn kênh truyền dữ liệu chính.\n- Phương án B sai: File mcp.json không hỗ trợ tùy chọn verbose: true để phân tách hay lọc các dòng log vi phạm quy chuẩn stdio từ stdout.\n- Phương án C sai: Tùy chọn -u trong Python chỉ có tác dụng đẩy dữ liệu ra stdout ngay lập tức mà không qua bộ đệm, nhưng dữ liệu vẫn xuất ra stdout nên vẫn gây xáo trộn và lỗi định dạng JSON-RPC.\n- Phương án D sai: Tăng thời gian chờ (timeout) không giải quyết được lỗi cú pháp và lỗi giao thức do log bị trộn lẫn vào luồng dữ liệu stdout.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-006",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-006",
    "scenarioSignature": {
      "testedPrinciple": "secure credential management in MCP client configuration files",
      "failureMode": "plaintext database password exposure in tracked git repositories",
      "rootCause": "hardcoding static secret values inside project level configuration",
      "requiredFix": "reference external host environment variables using expansion syntax in configuration"
    },
    "questionEN": "A software engineer configures a PostgreSQL MCP server in project-level .claude/mcp.json by defining \"env\": {\"DB_PASSWORD\": \"secretpass123\"} so the server command can access the target database. During a Git security audit, a secret scanner flags mcp.json because the plaintext password was committed to public repository history. Which configuration practice securely provisions database credentials to the MCP server without exposing secrets in version control?",
    "question": "[d2-b05-B-006] Một lập trình viên cấu hình PostgreSQL MCP server trong file .claude/mcp.json ở cấp dự án bằng cách định nghĩa \"env\": {\"DB_PASSWORD\": \"secretpass123\"} để lệnh chạy server truy cập được cơ sở dữ liệu. Trong quá trình kiểm tra bảo mật Git, công cụ quét mã độc gắn cảnh báo file mcp.json vì mật khẩu văn bản thuần đã bị commit vào lịch sử repository. Phương pháp cấu hình nào cung cấp thông tin xác thực cơ sở dữ liệu cho MCP server một cách an toàn mà không làm lộ bí mật trong hệ thống quản lý phiên bản?",
    "optionsEN": [
      "A. Encrypt the mcp.json file using AES-256 before committing and configure Claude Code to decrypt it at session initialization using --decrypt-key.",
      "B. Replace the hardcoded string in mcp.json with host environment variable reference syntax like \"DB_PASSWORD\": \"${DB_PASSWORD}\" (or pass it through from host shell environment), ensuring .env files containing secrets are added to .gitignore.",
      "C. Move the DB_PASSWORD parameter from the env object into the args array of mcp.json as --password=secretpass123.",
      "D. Store the password directly in the user-level global configuration file ~/.claude.json and grant chmod 777 permissions to the repository directory."
    ],
    "options": [
      "A. Mã hóa file mcp.json bằng thuật toán AES-256 trước khi commit và cấu hình Claude Code giải mã lúc khởi tạo phiên làm việc bằng cờ --decrypt-key.",
      "B. Thay thế chuỗi mật khẩu cứng trong mcp.json bằng cú pháp tham chiếu biến môi trường hệ thống như \"DB_PASSWORD\": \"${DB_PASSWORD}\" (hoặc truyền trực tiếp từ môi trường shell), đồng thời đảm bảo các file .env chứa bí mật được thêm vào .gitignore.",
      "C. Chuyển tham số DB_PASSWORD từ đối tượng env sang mảng args của mcp.json dưới dạng --password=secretpass123.",
      "D. Lưu trực tiếp mật khẩu vào file cấu hình toàn cục ~/.claude.json của người dùng và cấp quyền chmod 777 cho thư mục repository."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Claude Code does not support custom file decryption flags like --decrypt-key for reading mcp.json.",
      "Option B is correct: Utilizing environment variable expansion (e.g. ${DB_PASSWORD}) allows mcp.json to remain safe for source control while dynamically inheriting secret values from host environment variables.",
      "Option C is incorrect: Passing credentials via command-line args still hardcodes the secret in mcp.json and exposes it in system process lists (ps).",
      "Option D is incorrect: Storing plaintext secrets in global config without gitignore does not fix secret leakage and chmod 777 creates severe system permission vulnerabilities."
    ],
    "rationale": "Hardcoding secrets directly into project-level mcp.json files exposes credentials whenever code is committed. Referencing environment variables keeps configuration files clean and allows runtime injection from secured local environments or CI secrets.",
    "explanation": "Phân tích các phương án:\n- Phương án B đúng: Sử dụng cú pháp tham chiếu biến môi trường (ví dụ ${DB_PASSWORD}) giúp file mcp.json an toàn khi commit lên Git, vì giá trị bí mật thực tế sẽ được nạp động từ môi trường của máy host mà không bị lưu thành văn bản thuần trong mã nguồn.\n- Phương án A sai: Claude Code không hỗ trợ cờ giải mã cấu hình tự động như --decrypt-key cho file mcp.json.\n- Phương án C sai: Việc đưa mật khẩu vào mảng args vẫn lưu trực tiếp bí mật dưới dạng văn bản thuần trong mcp.json và còn làm lộ mật khẩu trong danh sách tiến trình hệ thống (ps).\n- Phương án D sai: Lưu mật khẩu dạng plain text vào file cấu hình toàn cục không giải quyết tận gốc nguy cơ lộ bí mật và việc dùng chmod 777 tạo ra lỗ hổng bảo mật nghiêm trọng trên hệ thống.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]