[
  {
    "id": "d2-b05-new-011",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-011",
    "scenarioSignature": {
      "testedPrinciple": "heterogeneous transport configuration in standard MCP client manifest",
      "failureMode": "connection failure when initializing remote services over stdio or local tools over SSE",
      "rootCause": "restricting configured servers to a single global transport mode instead of specifying transport per server entry",
      "requiredFix": "configure separate server entries in client manifest using sse transport for remote services and stdio for local command line tools"
    },
    "questionEN": "A software engineer is building an internal assistant that needs to interact with both a cloud-hosted Salesforce CRM API and a local PostgreSQL CLI database instance (psql). The assistant integration requires fetching live customer tickets from Salesforce and running analytical SQL queries against the local database. How should the developer configure the MCP integration in .claude/mcp.json to support both data sources reliably?",
    "question": "[d2-b05-new-011] Một kỹ sư phần mềm đang xây dựng một trợ lý nội bộ cần tương tác với cả Salesforce CRM API trên cloud và một database instance PostgreSQL CLI cục bộ (psql). Trợ lý cần lấy ticket khách hàng realtime từ Salesforce và thực thi các câu lệnh SQL phân tích trên database cục bộ. Nhà phát triển nên cấu hình tích hợp MCP trong .claude/mcp.json như thế nào để hỗ trợ cả hai nguồn dữ liệu một cách tin cậy?",
    "optionsEN": [
      "A. Define two separate mcp.json configuration files (one in project root and one in user directory) because Claude Code only supports one transport mechanism per file.",
      "B. Wrap the local PostgreSQL CLI in an external HTTP bridge service so that both Salesforce CRM and PostgreSQL can use the standard stdio transport.",
      "C. Define both servers under mcpServers in .claude/mcp.json, specifying \"transport\": \"sse\" with url for Salesforce CRM and \"command\" with \"args\" (stdio) for local PostgreSQL.",
      "D. Set the top-level transport key in mcp.json to \"hybrid\" so that Claude Code automatically negotiates transport protocols upon receiving tool requests."
    ],
    "options": [
      "A. Định nghĩa hai tệp cấu hình mcp.json riêng biệt (một ở thư mục gốc dự án và một ở thư mục người dùng) vì Claude Code chỉ hỗ trợ một cơ chế transport cho mỗi tệp.",
      "B. Bọc PostgreSQL CLI cục bộ thành một HTTP bridge service bên ngoài để cả Salesforce CRM và PostgreSQL đều có thể dùng transport stdio chuẩn.",
      "C. Định nghĩa cả hai server trong mcpServers của .claude/mcp.json, chỉ định \"transport\": \"sse\" kèm url cho Salesforce CRM và \"command\" kèm \"args\" (stdio) cho PostgreSQL cục bộ.",
      "D. Đặt key transport ở cấp cao nhất trong mcp.json thành \"hybrid\" để Claude Code tự động thương lượng giao thức transport khi nhận yêu cầu tool."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because .claude/mcp.json supports multiple server entries under mcpServers, each with its own independent transport configuration, eliminating the need to split definitions across files.",
      "Option B is incorrect because stdio transport requires launching a local subprocess with a TTY/terminal interface, making it unsuitable for direct cloud API access; forcing stdio on cloud services by wrapping local DB tools is unnecessary and incorrect.",
      "Option C is correct because MCP client configurations allow defining multiple heterogeneous servers inside mcpServers, enabling cloud web APIs to use sse transport via a remote URL while local CLI tools use stdio transport via local binary command execution.",
      "Option D is incorrect because MCP configuration schemas do not support a global \"hybrid\" transport mode; transport settings must be explicitly declared per server entry."
    ],
    "rationale": "MCP manifests allow configuring multiple servers in mcpServers, where each server explicitly declares its transport type (e.g., sse with an endpoint URL for remote HTTP APIs, and stdio with command/args for local CLI tools).",
    "explanation": "Trong Model Context Protocol (MCP), tệp cấu hình mcp.json (hoặc .claude/mcp.json) hỗ trợ khai báo nhiều MCP server độc lập dưới mục mcpServers. Mỗi server có thể áp dụng một cơ chế transport phù hợp với mô hình triển khai của nó: sse (Server-Sent Events) dành cho các dịch vụ web remote trên HTTP/HTTPS (như Salesforce CRM API) bằng cách cung cấp tham số url, và stdio dành cho các công cụ CLI cục bộ (như PostgreSQL CLI psql) bằng cách cấu hình command và args để khởi chạy subprocess.\n\n- Phương án A sai vì một tệp mcp.json có thể chứa nhiều cấu hình server với các transport khác nhau.\n- Phương án B sai vì stdio đòi hỏi một tiến trình con cục bộ có TTY; việc bọc công cụ cục bộ không giải quyết được tính chất kết nối của cloud API.\n- Phương án C đúng vì cấu hình cả hai server dưới mcpServers với transport tương ứng (sse cho Salesforce và command/stdio cho PostgreSQL) là cách chuẩn nhất trong MCP.\n- Phương án D sai vì MCP không tồn tại giá trị transport toàn cục \"hybrid\".",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-012",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-012",
    "scenarioSignature": {
      "testedPrinciple": "secure API credential substitution in MCP client configuration via environment variables",
      "failureMode": "exposure of sensitive API credentials in source controlled configuration files",
      "rootCause": "hardcoding plain text API secrets directly inside committed client configuration files",
      "requiredFix": "store sensitive credentials in system environment variables and reference them using variable expansion in configuration env section"
    },
    "questionEN": "An engineering team is configuring an MCP server in .claude/mcp.json to allow Claude Code to inspect Stripe transaction logs for PCI compliance debugging. The payment processor requires a high-privilege API key (sk_live_...) to authenticate requests. To comply with security audits and prevent credential leakage into version control, how should the API key be configured in mcp.json?",
    "question": "[d2-b05-new-012] Một đội ngũ kỹ thuật đang cấu hình một MCP server trong .claude/mcp.json để cho phép Claude Code kiểm tra các log giao dịch Stripe nhằm mục đích kiểm toán PCI compliance. Payment processor yêu cầu một API key có quyền hạn cao (sk_live_...) để xác thực các request. Để tuân thủ các quy định bảo mật và ngăn ngừa rò rỉ API key vào hệ thống quản lý phiên bản (Git), API key nên được cấu hình trong mcp.json như thế nào?",
    "optionsEN": [
      "A. Hardcode the raw API key directly inside the env dictionary of .claude/mcp.json and rely on .gitignore to prevent committing the file.",
      "B. Encrypt the API key with AES-256 and store the encrypted ciphertext string directly under the api_key key in mcp.json.",
      "C. Store the API key in a hidden .env file at the project root and reference it using include: \".env\" inside the root object of mcp.json.",
      "D. Export the secret to the environment variable STRIPE_KEY and reference it in mcp.json under \"env\" using \"STRIPE_API_KEY\": \"${STRIPE_KEY}\"."
    ],
    "options": [
      "A. Hardcode trực tiếp API key thô vào dictionary env của .claude/mcp.json và dựa vào .gitignore để ngăn việc commit tệp này.",
      "B. Mã hóa API key bằng AES-256 và lưu chuỗi ciphertext đã mã hóa trực tiếp dưới key api_key trong mcp.json.",
      "C. Lưu API key trong một tệp .env ẩn ở thư mục gốc dự án và tham chiếu nó bằng cú pháp include: \".env\" bên trong root object của mcp.json.",
      "D. Export secret vào biến môi trường STRIPE_KEY và tham chiếu nó trong mcp.json dưới phần \"env\" bằng \"STRIPE_API_KEY\": \"${STRIPE_KEY}\"."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because hardcoding plain-text API keys in configuration files creates serious security vulnerabilities, as repository configuration files like .claude/mcp.json are often shared and committed to git.",
      "Option B is incorrect because MCP configuration loaders do not include AES decryption mechanisms for raw configuration fields.",
      "Option C is incorrect because standard mcp.json schemas do not support an include directive to import .env files directly into the configuration root.",
      "Option D is correct because referencing OS or system secrets via standard environment variable syntax ${STRIPE_KEY} in the server's \"env\" object keeps secrets out of source code while injecting them safely at runtime."
    ],
    "rationale": "Security best practices for MCP integration require separating code/configuration from secrets by referencing environment variables (${VAR_NAME}) in the env dictionary of mcp.json rather than hardcoding sensitive credentials.",
    "explanation": "Nguyên tắc bảo mật cốt lõi khi tích hợp MCP server đòi hỏi không được lưu trữ trực tiếp API key hoặc credential nhạy cảm trong tệp cấu hình mcp.json (vì tệp này thường được commit vào Git hoặc chia sẻ giữa các thành viên trong đội ngũ). Cách làm chuẩn xác là lưu API key trong biến môi trường của hệ thống (ví dụ: STRIPE_KEY) và sử dụng cú pháp tham chiếu biến môi trường ${STRIPE_KEY} trong mục env của cấu hình MCP server.\n\n- Phương án A sai vì hardcode API key thô làm tăng nguy cơ rò rỉ secret vào Git repository.\n- Phương án B sai vì trình đọc cấu hình MCP không tự động giải mã AES-256 cho các chuỗi ciphertext trong JSON.\n- Phương án C sai vì mcp.json không hỗ trợ directive include: \".env\" để import tệp .env.\n- Phương án D đúng vì khai báo \"STRIPE_API_KEY\": \"${STRIPE_KEY}\" dưới mục env cho phép inject credential an toàn từ môi trường runtime mà không làm rò rỉ secret.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]