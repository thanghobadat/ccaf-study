[
  {
    "id": "d2-b05-new-009",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-009",
    "questionEN": "A developer working inside an active Claude Code CLI session adds a new GitHub Actions MCP server entry to the project's .claude/mcp.json file with command: \"npx\" and args: [\"-y\", \"@modelcontextprotocol / server - github\"]. Although the JSON configuration syntax is completely valid, attempting to invoke the github_trigger_workflow tool within the current session fails with \"Tool github_trigger_workflow not found\". What is the root cause of this failure, and how should it be resolved?",
    "question": "[d2-b05-new-009] Một lập trình viên đang chạy một phiên làm việc Claude Code CLI và thêm cấu hình server MCP mới cho GitHub Actions vào file .claude/mcp.json của dự án với command: \"npx\" và args: [\"-y\", \"@modelcontextprotocol / server - github\"]. Mặc dù cú pháp JSON hoàn toàn hợp lệ, việc gọi tool github_trigger_workflow trong phiên hiện tại vẫn báo lỗi \"Tool github_trigger_workflow not found\". Nguyên nhân cốt lõi của sự cố này là gì và làm thế nào để giải quyết?",
    "optionsEN": [
      "A. Claude Code discovers and registers MCP servers from mcp.json only during initial session startup; the active session must be restarted to parse the updated configuration and initialize the new GitHub Actions MCP server.",
      "B. The .claude/mcp.json configuration file requires a top-level reloadCapabilities: true attribute to support hot-reloading stdio servers without terminating the active session.",
      "C. MCP tools registered in .claude/mcp.json are hidden until the developer executes git commit on the file to publish the schema changes to the project repository.",
      "D. The GitHub Actions MCP server requires its transport property to be set to sse rather than stdio when declared inside a project-level mcp.json file."
    ],
    "options": [
      "A. Claude Code chỉ phát hiện và khởi tạo các MCP server từ mcp.json khi bắt đầu phiên làm việc; cần phải khởi động lại phiên làm việc để nạp cấu hình mới và đăng ký công cụ.",
      "B. File cấu hình .claude/mcp.json thiếu thuộc tính reloadCapabilities: true ở cấp cao nhất để hỗ trợ tự động tải lại các server stdio mà không cần ngắt phiên.",
      "C. Các công cụ MCP được thêm vào .claude/mcp.json sẽ bị ẩn cho đến khi lập trình viên thực hiện git commit file này để xuất bản schema lên repository của dự án.",
      "D. Server MCP cho GitHub Actions yêu cầu thuộc tính transport phải được cấu hình thành sse thay vì stdio khi khai báo trong file mcp.json cấp dự án."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Claude Code reads and parses mcp.json exclusively during session startup. Modifying mcp.json while a session is running does not dynamically register the new GitHub Actions MCP server; terminating and restarting the session is required to initialize the server process and register its tools.",
      "Option B (Incorrect): mcp.json does not support a reloadCapabilities flag. MCP client configuration loading is static at launch time, so changing configuration fields requires a full session restart regardless of JSON keys.",
      "Option C (Incorrect): mcp.json is loaded locally from the project root or user configuration without requiring Git commits or remote publishing to make tools accessible to the local session.",
      "Option D (Incorrect): stdio is the valid default transport for locally spawned MCP servers like CLI binaries or Node packages; transport type mismatch is not why the active session failed to discover the newly added entry."
    ],
    "rationale": "Claude Code inspects and initializes MCP servers listed in mcp.json only when a session starts. Adding a new MCP server configuration while a session is running does not dynamically update the active session's tool registry. Restarting the session forces Claude Code to re-read mcp.json, launch the specified GitHub Actions server process, and expose its tools.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A (Đúng): Claude Code đọc và khởi tạo danh sách MCP server được khai báo trong mcp.json duy nhất tại thời điểm bắt đầu phiên làm việc (startup). Việc chỉnh sửa mcp.json khi phiên đang chạy sẽ không tự động nạp cấu hình mới; lập trình viên phải restart phiên làm việc để Claude Code khởi chạy tiến trình server mới và đăng ký các tool của nó.\\n- Lựa chọn B (Sai): Cấu hình mcp.json không hỗ trợ cờ reloadCapabilities. Khả năng nạp MCP server của client là tĩnh ở thời điểm khởi chạy, do đó thay đổi cấu hình bắt buộc phải khởi động lại phiên.\\n- Lựa chọn C (Sai): Claude Code nạp mcp.json trực tiếp từ file hệ thống cục bộ (project root hoặc user directory), không phụ thuộc vào trạng thái git commit hay việc push lên repo.\\n- Lựa chọn D (Sai): Kiểu transport stdio là hoàn toàn chính xác cho các MCP server khởi chạy dưới dạng tiến trình con cục bộ (như npx). Nguyên nhân không phải do kiểu transport mà do thời điểm nạp cấu hình của phiên làm việc.",
    "scenarioSignature": {
      "testedPrinciple": "MCP server configuration discovery occurs exclusively during initial client session startup",
      "failureMode": "newly configured MCP server tools remain unavailable in active client session",
      "rootCause": "MCP client does not dynamically poll or hot-reload mcp.json modifications during runtime",
      "requiredFix": "restart the MCP client session to trigger mcp.json configuration parsing and server initialization"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-010",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-010",
    "questionEN": "A DevOps engineer updates the allowedTools configuration array in .claude/mcp.json for an active MCP server db-admin-server, expanding the permission list from [\"db_query\"] to [\"db_query\", \"db_execute_migration\"]. However, when prompting Claude within the active CLI session to execute a database migration, Claude reports that db_execute_migration is unavailable and displays only the previously allowed tool. What best explains this behavior, and what action will enforce the updated permissions?",
    "question": "[d2-b05-new-010] Một kỹ sư DevOps vừa cập nhật danh sách allowedTools trong file .claude/mcp.json cho server db-admin-server từ [\"db_query\"] thành [\"db_query\", \"db_execute_migration\"] để cấp thêm quyền thực thi migration. Tuy nhiên, trong phiên Claude Code đang mở, khi được yêu cầu chạy migration, Claude thông báo rằng công cụ db_execute_migration không có sẵn và vẫn chỉ hiển thị danh sách công cụ cũ. Giải thích nào đúng nhất cho hiện tượng này và giải pháp khắc phục là gì?",
    "optionsEN": [
      "A. The allowedTools filter list is cached in the remote MCP server process and requires sending an HTTP POST /mcp/reload-permissions API call to refresh the tool whitelist.",
      "B. Claude Code caches the allowedTools list from mcp.json during session initialization; session restart is required to re-read the permission array and re-filter available MCP tools.",
      "C. Updating allowedTools in project-level mcp.json requires invalidating the local vector index using claude cache clear before permission changes take effect.",
      "D. Changes to allowedTools take effect only if the developer increments the version field inside mcp.json to force dynamic schema re-validation."
    ],
    "options": [
      "A. Danh sách bộ lọc allowedTools được lưu bộ nhớ tạm tại tiến trình MCP server từ xa và yêu cầu gửi yêu cầu HTTP POST /mcp/reload-permissions để làm mới danh sách cấp phép.",
      "B. Claude Code lưu bộ nhớ tạm (cache) danh sách allowedTools từ mcp.json tại thời điểm khởi tạo phiên; cần phải khởi động lại phiên làm việc để nạp lại mảng phân quyền và cập nhật danh sách công cụ khả dụng.",
      "C. Việc thay đổi allowedTools trong mcp.json cấp dự án yêu cầu phải xóa bộ nhớ tạm chỉ mục vector bằng lệnh claude cache clear trước khi thay đổi quyền có hiệu lực.",
      "D. Thay đổi với allowedTools chỉ có hiệu lực nếu lập trình viên tăng giá trị trường version bên trong file mcp.json để kích hoạt quá trình xác thực lại schema."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A (Incorrect): allowedTools is a client-side filter enforced by Claude Code based on mcp.json, not a server-side remote cached rule, and cannot be updated via an HTTP reload endpoint.",
      "Option B (Correct): Claude Code evaluates and caches the allowedTools array in mcp.json when the session starts. Modifying allowedTools during an active session leaves the old cached tool list in memory until the session is restarted.",
      "Option C (Incorrect): Vector index cache clearing (claude cache clear) does not control MCP tool filtering logic or force dynamic reload of mcp.json permissions.",
      "Option D (Incorrect): mcp.json does not use a schema version field to trigger hot-reloading of security policies; session restart is the standard mechanism to apply config updates."
    ],
    "rationale": "allowedTools is configured inside mcp.json to restrict or permit which tools an MCP server can expose to Claude. Because Claude Code parses mcp.json only during session startup, modifications to allowedTools made mid-session are not recognized dynamically. Restarting the session re-loads mcp.json, applying the new allowedTools list to the tool registry.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A (Sai): allowedTools là bộ lọc phía client do Claude Code thực thi dựa trên file mcp.json, không phải quy tắc được cache phía MCP server từ xa và không làm mới qua endpoint HTTP.\\n- Lựa chọn B (Đáp án đúng): Claude Code đọc và lưu tạm danh sách allowedTools từ mcp.json khi bắt đầu phiên làm việc. Việc sửa đổi allowedTools khi phiên đang hoạt động không làm thay đổi danh sách tool đang chạy trong bộ nhớ; khởi động lại phiên (session restart) là thao tác cần thiết để Claude Code nạp lại file cấu hình và áp dụng bộ lọc mới.\\n- Lựa chọn C (Sai): Lệnh xóa cache chỉ mục vector (claude cache clear) không liên quan đến logic lọc công cụ MCP hay nạp lại quyền từ mcp.json.\\n- Lựa chọn D (Sai): Schema của mcp.json không dùng trường version để kích hoạt hot-reload phân quyền; khởi động lại phiên làm việc là cơ chế tiêu chuẩn duy nhất để áp dụng cấu hình sửa đổi.",
    "scenarioSignature": {
      "testedPrinciple": "MCP client caches server tool filtering configurations at session initialization",
      "failureMode": "client continues utilizing outdated tool permission filter after mcp.json allowedTools modification",
      "rootCause": "active client session does not hot-reload allowedTools permission updates from disk",
      "requiredFix": "restart the client session to reload mcp.json and apply updated allowedTools filtering"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]