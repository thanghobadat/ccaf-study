[
  {
    "id": "d2-b05-new-015",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-015",
    "scenarioSignature": {
      "testedPrinciple": "credential isolation using environment variables in MCP server configuration",
      "failureMode": "exposure of plain text credentials in version controlled configuration",
      "rootCause": "hardcoding database connection strings inside command arguments within mcp.json",
      "requiredFix": "extract secrets into environment variables referenced by mcp.json env block"
    },
    "questionEN": "A backend team configures a PostgreSQL MCP server in .claude/mcp.json to allow Claude Code CLI to inspect database schemas. In the configuration file, the connection string is specified directly in command arguments: args: [\"--db-url\", \"postgresql://db_admin:P@ssw0rd2026@db.internal:5432/prod_db\"]. During a repository security audit, git-secret scanning flags this configuration as a high-severity vulnerability because .claude/mcp.json is committed to git. What is the recommended architectural fix to resolve this credential leakage vulnerability while maintaining database access for Claude Code?",
    "question": "[d2-b05-new-015] Một nhóm backend cấu hình MCP server PostgreSQL trong .claude/mcp.json để cho phép Claude Code CLI kiểm tra cấu trúc cơ sở dữ liệu. Trong file cấu hình, chuỗi kết nối được chỉ định trực tiếp trong tham số args: args: [\"--db-url\", \"postgresql://db_admin:P@ssw0rd2026@db.internal:5432/prod_db\"]. Khi quét an ninh kho chứa mã nguồn, công cụ phát hiện lộ bí mật cảnh báo đây là lỗ hổng mức độ cao vì .claude/mcp.json được commit lên git. Giải pháp kiến trúc nào được khuyến nghị để khắc phục lỗ hổng rò rỉ thông tin xác thực này trong khi vẫn duy trì quyền truy cập CSDL cho Claude Code?",
    "optionsEN": [
      "A. Encrypt the connection string inside .claude/mcp.json using AES-256 and pass the decryption key as a command-line argument when executing Claude Code CLI.",
      "B. Move the connection string from args to transport parameter within .claude/mcp.json so Claude Code automatically redacts database credentials during git commits.",
      "C. Replace the hardcoded connection string in args with an environment variable parameter, passing DATABASE_URL via the env block in mcp.json sourced from local developer environment secrets.",
      "D. Convert the PostgreSQL MCP server from stdio transport to SSE transport so credentials are dynamically retrieved via TLS handshake instead of stored in configuration."
    ],
    "options": [
      "A. Mã hóa chuỗi kết nối bên trong .claude/mcp.json bằng thuật toán AES-256 và truyền khóa giải mã dưới dạng đối số dòng lệnh khi khởi chạy Claude Code CLI.",
      "B. Di chuyển chuỗi kết nối từ args sang tham số transport trong .claude/mcp.json để Claude Code tự động che giấu thông tin xác thực CSDL khi commit vào git.",
      "C. Loại bỏ chuỗi kết nối ghi cứng khỏi args, truyền DATABASE_URL thông qua khối env trong mcp.json tham chiếu từ biến môi trường hệ thống của nhà phát triển.",
      "D. Chuyển đổi PostgreSQL MCP server từ stdio transport sang SSE transport để thông tin xác thực được lấy động qua truy xuất TLS thay vì lưu trong file cấu hình."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A encrypting the string inside mcp.json and passing a decryption key on the CLI adds operational complexity and fails to follow standard MCP configuration secret management.",
      "Option B moving the database string to the transport field is invalid because transport handles communication protocols (such as stdio or sse) without providing secret sanitization.",
      "Option C replacing hardcoded secrets with environment variable references in the env block prevents leaking plain-text credentials in repository configuration files while allowing runtime access.",
      "Option D converting transport protocol from stdio to SSE changes how messages are transported over network sockets but does not solve hardcoded credential leaks embedded in configuration parameters."
    ],
    "rationale": "The MCP specification requires that sensitive credentials and database connection strings never be hardcoded into version-controlled mcp.json files. Storing credentials in environment variables referenced via the env block prevents security leaks while maintaining dynamic runtime resolution.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n\n- Option A sai vì việc tự mã hóa file cấu hình và truyền khóa giải mã qua CLI làm tăng độ phức tạp vận hành mà không tuân theo chuẩn quản lý cấu hình của MCP.\n- Option B sai vì trường transport chỉ định giao thức truyền thông (như stdio hoặc sse), không hỗ trợ tính năng che giấu dữ liệu nhạy cảm tự động khi commit git.\n- Option C đúng vì theo nguyên tắc bảo mật MCP, không được ghi cứng thông tin xác thực nhạy cảm trong mcp.json. Thay vào đó, cần tách riêng mật khẩu ra biến môi trường và tham chiếu qua khối env hoặc môi trường hệ thống local, tránh lưu trữ mật khẩu trên kho mã nguồn.\n- Option D sai vì thay đổi giao thức truyền tải từ stdio sang SSE không giúp giải quyết vấn đề nếu chuỗi kết nối vẫn bị ghi cứng trong file cấu hình.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-016",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-016",
    "scenarioSignature": {
      "testedPrinciple": "tool namespace uniqueness across multiple configured MCP servers",
      "failureMode": "non deterministic tool invocation when multiple tools share identical names",
      "rootCause": "unnamespaced tool definitions creating name collisions across independent servers",
      "requiredFix": "apply unique names or server specific prefixes to eliminate tool collision"
    },
    "questionEN": "An enterprise development platform configures two MCP servers in .claude/mcp.json: an internal-docs server for querying technical wikis and an elastic-logs server for searching cluster telemetry. Both MCP servers register a tool named search with overlapping schema properties (query: string). During execution, when a user asks Claude Code to find error logs or documentation, Claude selects between the two search tools randomly, causing non-deterministic query execution. What is the root cause of this issue and the correct architectural resolution?",
    "question": "[d2-b05-new-016] Một nền tảng phát triển doanh nghiệp cấu hình hai MCP server trong .claude/mcp.json: server internal-docs để truy vấn wiki kỹ thuật và server elastic-logs để tìm kiếm nhật ký cụm máy chủ. Cả hai MCP server đều đăng ký một tool tên là search với các thuộc tính schema trùng lặp (query: string). Trong quá trình thực thi, khi người dùng yêu cầu Claude Code tìm kiếm nhật ký lỗi hoặc tài liệu, Claude chọn ngẫu nhiên giữa hai tool search, dẫn đến kết quả truy vấn không ổn định (non-deterministic). Nguyên nhân gốc rễ và giải pháp kiến trúc đúng cho sự cố này là gì?",
    "optionsEN": [
      "A. MCP servers do not support running concurrently; the internal-docs server must be converted to an SSE transport while elastic-logs uses stdio.",
      "B. Claude Code CLI ignores duplicate tool names by executing only the first tool listed in mcp.json; the position of internal-docs must be moved to the top.",
      "C. The LLM context window is overflowing due to duplicate schemas; the search tools must be merged into a single MCP Prompt capability.",
      "D. Tool name collision across separate MCP servers causes non-deterministic tool selection; the tools must be renamed or namespaced to convey distinct intents."
    ],
    "options": [
      "A. Các MCP server không hỗ trợ chạy đồng thời; server internal-docs phải được chuyển sang SSE transport trong khi elastic-logs sử dụng stdio transport.",
      "B. Claude Code CLI bỏ qua các tool trùng tên bằng cách chỉ nạp tool đầu tiên được liệt kê trong mcp.json; thứ tự của internal-docs cần được chuyển lên đầu.",
      "C. Cửa sổ ngữ cảnh LLM bị quá tải do các schema trùng lặp; hai tool search phải được hợp nhất thành một năng lực MCP Prompt duy nhất.",
      "D. Xung đột tên tool (tool name collision) giữa các MCP server độc lập gây ra việc chọn tool không ổn định; các tool cần được đổi tên hoặc phân không gian tên (namespace) rõ ràng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A incorrect transport protocol mixing does not address name collisions and MCP clients fully support concurrent servers regardless of transport mechanisms.",
      "Option B incorrect placement order in mcp.json does not resolve runtime name collision because all exposed tools are loaded into the tool choice space.",
      "Option C incorrect duplicate tool names create namespace selection ambiguity rather than context window overflow, and MCP Prompts cannot substitute for executable tools.",
      "Option D correct when multiple MCP servers register identical tool names, the model cannot distinguish between their intended domains, causing unpredictable execution; renaming or namespacing tools ensures deterministic routing."
    ],
    "rationale": "When multiple MCP servers expose tools with identical identifiers, the LLM tool routing mechanism encounters a namespace collision. To guarantee deterministic tool invocation, each tool must have a unique identifier or prefix (namespacing) across all configured servers.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n\n- Option A sai vì MCP client hỗ trợ kết nối đồng thời nhiều MCP server thuộc các transport khác nhau mà không bị hạn chế.\n- Option B sai vì Claude Code nạp tất cả các tool được khai báo bởi các MCP server hoạt động; việc đổi thứ tự trong file cấu hình không giải quyết được xung đột tên runtime.\n- Option C sai vì xung đột tên tool là vấn đề định danh không gian tên trong không gian chọn tool của LLM, không phải do giới hạn context window, và MCP Prompts không thay thế được tool thực thi.\n- Option D đúng vì khi nhiều MCP server công khai các tool trùng tên (search), mô hình LLM không thể phân biệt chính xác tool nào thuộc server nào, dẫn đến hành vi gọi ngẫu nhiên. Giải pháp là đặt tên riêng biệt hoặc dùng namespace (ví dụ: search_internal_docs và search_elastic_logs) để định tuyến chính xác.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]