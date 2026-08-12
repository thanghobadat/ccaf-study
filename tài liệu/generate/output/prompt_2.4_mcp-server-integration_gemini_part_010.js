[
  {
    "id": "d2-b05-new-019",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-019",
    "questionEN": "A software engineer configures a custom Python-based MCP server in .claude/mcp.json using the stdio transport with \"command\": \"python\" and \"args\": [\"mcp_server.py\"]. The MCP tools initialize successfully on the developer's local workstation. However, when the repository's integration pipeline executes claude code --non-interactive inside a headless CI runner container, the agent fails during startup with \"ENOENT: failed to spawn process python\". Diagnostics reveal that Python 3 is installed at /usr/local/bin/python3 in the CI container while python is not in the system $PATH. What is the root cause and recommended configuration fix?",
    "question": "[d2-b05-new-019] Một kỹ sư phần mềm cấu hình một MCP server tùy chỉnh viết bằng Python trong .claude/mcp.json sử dụng stdio transport với \"command\": \"python\" và \"args\": [\"mcp_server.py\"]. Các MCP tool khởi tạo thành công trên máy trạm cục bộ của nhà phát triển. Tuy nhiên, khi đường ống tích hợp của kho lưu trữ thực thi claude code --non-interactive bên trong container CI runner không có giao diện, agent thất bại ngay lúc khởi động với lỗi \"ENOENT: failed to spawn process python\". Chẩn đoán cho thấy Python 3 được cài đặt tại /usr/local/bin/python3 trong CI container trong khi lệnh python không có trong $PATH của hệ thống. Nguyên nhân gốc rễ và giải pháp cấu hình được đề xuất là gì?",
    "optionsEN": [
      "A. The stdio transport is unsupported in headless CI runners; the developer must switch the server definition to use HTTP SSE transport in mcp.json.",
      "B. Claude Code CLI requires the python process to be registered in ~/.claude.json user-level configuration rather than project-level .claude/mcp.json.",
      "C. The command field relies on shell path resolution for an unqualified executable name (python); configuring the explicit path (such as /usr/local/bin/python3 or a virtual environment binary path) resolves environment discrepancy.",
      "D. The MCP server process requires interactive TTY input when spawned via stdio; adding \"env\": {\"TTY\": \"true\"} to mcp.json allows headless execution."
    ],
    "options": [
      "A. Stdio transport không được hỗ trợ trong các CI runner không có giao diện (headless); nhà phát triển phải chuyển đổi định nghĩa server sang sử dụng HTTP SSE transport trong mcp.json.",
      "B. Claude Code CLI yêu cầu tiến trình python phải được đăng ký trong cấu hình cấp người dùng ~/.claude.json thay vì .claude/mcp.json cấp dự án.",
      "C. Trường command phụ thuộc vào việc tìm kiếm đường dẫn shell cho tên file thực thi không đầy đủ (python); việc cấu hình đường dẫn tuyệt đối rõ ràng (như /usr/local/bin/python3 hoặc đường dẫn venv) sẽ khắc phục sự bất đồng môi trường.",
      "D. Tiến trình MCP server yêu cầu đầu vào TTY tương tác khi được khởi tạo qua stdio; việc thêm \"env\": {\"TTY\": \"true\"} vào mcp.json sẽ cho phép thực thi headless."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because stdio transport works in headless CI environments as long as the parent process can spawn the subprocess directly; switching to SSE is unnecessary and overcomplicates local process management.",
      "Option B is incorrect because .claude/mcp.json at the project level is valid and recommended for repository-wide server definitions; moving the configuration to user-level ~/.claude.json does not resolve binary PATH lookup failures.",
      "Option C is correct because specifying a bare binary name like python in command relies on the host environment's $PATH. In CI containers where python isn't aliased or present in $PATH, specifying the explicit path to the interpreter or virtual environment executable guarantees deterministic process spawning across all execution environments.",
      "Option D is incorrect because stdio transport for MCP operates via standard input/output streams between parent and child processes and does not require an interactive TTY device or a TTY environment variable."
    ],
    "rationale": "Specifying relative binary names in the command field of an MCP server configuration causes deployment fragility across environments with differing $PATH configurations. Providing an explicit, fully-qualified executable path (or virtual environment python path) ensures the client can spawn the stdio subprocess deterministically regardless of system aliases or container environment variables.",
    "explanation": "Khi cấu hình MCP server với stdio transport trong mcp.json, trường command xác định lệnh thực thi để khởi tạo tiến trình con. Nếu chỉ dùng tên lệnh ngắn gọn như python, hệ thống sẽ phụ thuộc vào biến môi trường $PATH của hệ điều hành để tìm nạp file thực thi.\\n\\n- Option A sai vì stdio transport hoàn toàn hoạt động bình thường trong môi trường CI headless (miễn là tiến trình cha khởi tạo được tiến trình con qua stdin/stdout), không bắt buộc phải chuyển sang SSE transport.\\n- Option B sai vì file .claude/mcp.json ở cấp dự án là chuẩn mực để chia sẻ cấu hình MCP trong cùng một repository; việc chuyển sang ~/.claude.json không giải quyết được vấn đề tìm kiếm file thực thi.\\n- Option C đúng vì việc chỉ định đường dẫn tuyệt đối (ví dụ: /usr/local/bin/python3 hoặc đường dẫn trong virtual environment) đảm bảo tiến trình claude code luôn tìm và khởi chạy đúng trình thông dịch Python dù môi trường CI runner có $PATH khác biệt so với máy local.\\n- Option D sai vì stdio transport trao đổi dữ liệu qua pipe stdin/stdout tiêu chuẩn, không đòi hỏi TTY tương tác hay biến môi trường TTY.",
    "scenarioSignature": {
      "testedPrinciple": "executable path resolution in stdio mcp transport configuration",
      "failureMode": "mcp server process spawn failure in automated runner",
      "rootCause": "unqualified command relying on runner environment path variable",
      "requiredFix": "specify explicit executable path or virtual environment path in server configuration command"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]