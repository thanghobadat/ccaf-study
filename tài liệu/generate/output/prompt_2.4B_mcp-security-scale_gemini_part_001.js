[
  {
    "id": "d2-b05-B-001",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-001",
    "scenarioSignature": {
      "testedPrinciple": "least privilege access control for mcp filesystem servers",
      "failureMode": "file modification and deletion during read-only audit task",
      "rootCause": "mcp filesystem server configured with read and write permissions",
      "requiredFix": "reconfigure mcp server launching arguments to enforce read-only directory access"
    },
    "questionEN": "A security compliance engineer configures an automated code auditing pipeline using Claude Code CLI integrated with @modelcontextprotocol/server-filesystem in .claude/mcp.json. The server is launched with args: [\"/var/log/audit\", \"/src/repo\"] without access restrictions. During an audit of untrusted pull requests, a maliciously crafted comment inside a source file tricks Claude into calling write_file and delete_file tools exposed by the server, deleting log files in /var/log/audit. Which architectural modification correctly mitigates this risk while adhering to the principle of least privilege?",
    "question": "[d2-b05-B-001] Một kỹ sư tuân thủ bảo mật cấu hình đường ống kiểm định mã nguồn tự động bằng Claude Code CLI tích hợp với @modelcontextprotocol/server-filesystem trong .claude/mcp.json. Server được khởi chạy với args: [\"/var/log/audit\", \"/src/repo\"] mà không có hạn chế quyền hạn. Trong quá trình kiểm định các pull request không tin cậy, một câu lệnh độc hại đính kèm trong tệp nguồn đã lừa Claude gọi các tool write_file và delete_file do server cung cấp, làm xóa các tệp nhật ký trong /var/log/audit. Thay đổi kiến trúc nào sau đây khắc phục đúng rủi ro này theo nguyên tắc đặc quyền tối thiểu (least privilege)?",
    "optionsEN": [
      "A. Reconfigure .claude/mcp.json to pass the --read-only flag to the @modelcontextprotocol/server-filesystem process, enforcing read-only tool registration and blocking write or delete operations at the server capability boundary.",
      "B. Add a system prompt directive instructing Claude Code CLI to filter out write_file and delete_file tool calls during compliance audit runs.",
      "C. Change local OS file ownership of /var/log/audit to root while granting the MCP server elevated process privilege to manage write exceptions dynamically.",
      "D. Implement a post-execution cleanup tool that inspects Git working tree diffs after each session and automatically restores deleted files."
    ],
    "options": [
      "A. Cấu hình lại .claude/mcp.json để truyền cờ --read-only vào tiến trình @modelcontextprotocol/server-filesystem, bắt buộc đăng ký công cụ chỉ đọc và chặn các thao tác ghi hoặc xóa tại ranh giới năng lực của server.",
      "B. Thêm chỉ thị system prompt hướng dẫn Claude Code CLI tự lọc và bỏ qua các lời gọi tool write_file và delete_file trong các phiên kiểm định tuân thủ.",
      "C. Thay đổi quyền sở hữu tệp HĐH cục bộ của /var/log/audit thành root đồng thời cấp cho tiến trình MCP server quyền nâng cao để quản lý các ngoại lệ ghi.",
      "D. Triển khai một công cụ dọn dẹp sau thi hành để kiểm tra các khác biệt Git working tree sau mỗi phiên làm việc và tự động khôi phục các tệp bị xóa."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Passing --read-only to the MCP filesystem server enforces the principle of least privilege at the tool registration layer, ensuring write and delete capabilities are not exposed to the model regardless of prompt injection attempts.",
      "Option B is incorrect: Relying on system prompt instructions to restrict tool usage is vulnerable to prompt injection attacks embedded in untrusted source files being audited.",
      "Option C is incorrect: Modifying OS file ownership while running elevated server processes introduces privilege escalation hazards and does not restrict tool availability at the MCP boundary.",
      "Option D is incorrect: Post-execution file restoration is a reactive measure that cannot prevent unauthorized file deletions or data loss occurring during tool execution."
    ],
    "rationale": "Under the principle of least privilege, an MCP server used for read-only audit tasks should never expose write or delete capabilities to the client LLM. Configuring the server with --read-only enforces security at the protocol capability boundary, rendering prompt injection attacks incapable of modifying host filesystem state.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Lựa chọn A (Đúng): Việc truyền cờ --read-only khi khởi chạy @modelcontextprotocol/server-filesystem áp dụng đúng nguyên tắc đặc quyền tối thiểu (least privilege) ngay tại ranh giới công cụ MCP. Server sẽ chỉ đăng ký các công cụ đọc (read_file, list_directory), ngăn chặn hoàn toàn khả năng ghi hoặc xóa tệp bất kể mô hình bị prompt injection lừa.\n- Lựa chọn B (Sai): Chỉ dựa vào system prompt để yêu cầu mô hình không gọi tool ghi/xóa không phải là ranh giới bảo mật tin cậy, vì các cuộc tấn công prompt injection ẩn trong tệp kiểm định có thể ghi đè hướng dẫn này.\n- Lựa chọn C (Sai): Thay đổi quyền HĐH và chạy tiến trình server với quyền cao tạo ra rủi ro leo thang đặc quyền nghiêm trọng thay vì giới hạn năng lực của MCP server.\n- Lựa chọn D (Sai): Khôi phục tệp bị xóa sau khi thi hành là giải pháp phản ứng bị động, không ngăn chặn được việc dữ liệu nhạy cảm bị ghi đè hoặc xóa mất trong quá trình chạy.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-002",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-002",
    "scenarioSignature": {
      "testedPrinciple": "mcp tool input validation and sandbox execution isolation",
      "failureMode": "arbitrary code execution on host machine via prompt injection",
      "rootCause": "mcp tool executes model generated code directly on host process without validation or sandbox isolation",
      "requiredFix": "validate tool input payload and execute code inside restricted sandbox container"
    },
    "questionEN": "A software team deploys a custom Node.js MCP server providing a tool execute_code(code: string) that executes incoming JavaScript snippets using child_process.exec() directly on the host machine. During automated data processing, untrusted input contains an embedded prompt injection payload that alters the generated code argument to run shell commands exfiltrating system environment variables. Which solution properly protects the infrastructure against code execution prompt injection risks at the MCP server layer?",
    "question": "[d2-b05-B-002] Một đội ngũ phần mềm triển khai MCP server tùy chỉnh trên Node.js cung cấp tool execute_code(code: string) để thực thi các đoạn mã JavaScript trực tiếp trên máy host bằng child_process.exec(). Trong quá trình xử lý dữ liệu tự động, dữ liệu đầu vào không tin cậy chứa một payload prompt injection làm thay đổi tham số code sinh ra bởi mô hình để chạy lệnh shell đánh cắp các biến môi trường hệ thống. Giải pháp nào giải quyết đúng rủi ro prompt injection khi thực thi mã nguồn tại tầng MCP server?",
    "optionsEN": [
      "A. Lower the LLM temperature setting to 0.0 to force deterministic code output and prevent dangerous command synthesis.",
      "B. Implement strict input validation on the MCP server combined with executing code inside an isolated, network-restricted sandbox environment with unprivileged credentials.",
      "C. Add a post-processing filter inside the Claude Code client to parse stdout string responses for malicious bash signatures.",
      "D. Switch the Node.js implementation from child_process.exec() to eval() to avoid spawning system shell child processes."
    ],
    "options": [
      "A. Giảm thiết lập temperature của LLM xuống 0.0 để bắt buộc mô hình tạo ra mã nguồn cố định và ngăn chặn tổng hợp lệnh shell nguy hiểm.",
      "B. Thực hiện kiểm tra tính hợp lệ của đầu vào (input validation) tại MCP server kết hợp thực thi mã trong một môi trường sandbox bị cô lập, giới hạn mạng và dùng quyền tối thiểu.",
      "C. Thêm bộ lọc xử lý sau tại client Claude Code để phân tích chuỗi stdout trả về và phát hiện các dấu hiệu câu lệnh bash độc hại.",
      "D. Thay thế child_process.exec() bằng hàm eval() trong tiến trình Node.js để tránh việc khởi tạo tiến trình con shell của hệ điều hành."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Lowering temperature does not prevent an LLM from following malicious instructions injected into input context payloads.",
      "Option B is correct: Validating inputs on the MCP server and isolating execution within a restricted sandbox (e.g., containerized runtime with limited privileges and network isolation) eliminates arbitrary host compromise from prompt injection.",
      "Option C is incorrect: Inspecting stdout after execution is reactive and cannot prevent malicious commands that have already altered host state or exfiltrated sensitive environment variables.",
      "Option D is incorrect: Using eval() within the host Node.js process does not provide isolation and still permits access to system modules such as fs and process."
    ],
    "rationale": "MCP tools that execute arbitrary model-generated code are high-risk entry points for prompt injection attacks. Security must be enforced at the server side by validating input payloads and isolating execution in a constrained sandbox environment (e.g., containerized runtime with limited privileges and network isolation).",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Lựa chọn A (Sai): Việc giảm temperature không ngăn được LLM tuân theo các hướng dẫn độc hại được nhúng trong dữ liệu đầu vào thông qua tấn công prompt injection.\n- Lựa chọn B (Đúng): Bắt buộc kiểm tra tính hợp lệ của đầu vào tại MCP server và cô lập môi trường thực thi trong sandbox (container không có quyền mạng/quyền ghi máy host) là giải pháp kiến trúc chuẩn để triệt tiêu nguy cơ chiếm quyền điều khiển hệ thống từ mã do LLM sinh ra.\n- Lựa chọn C (Sai): Lọc kết quả stdout sau khi thi hành là giải pháp quá muộn, không thể ngăn chặn các lệnh độc hại đã chạy làm biến đổi dữ liệu host hoặc rò rỉ secret.\n- Lựa chọn D (Sai): Việc dùng eval() không hề cô lập tiến trình và vẫn cho phép mã độc truy cập vào các module hệ thống của Node.js như fs và process.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]