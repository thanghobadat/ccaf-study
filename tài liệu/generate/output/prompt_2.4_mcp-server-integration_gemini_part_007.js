[
  {
    "id": "d2-b05-new-013",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-013",
    "scenarioSignature": {
      "testedPrinciple": "remote MCP server configuration via SSE transport",
      "failureMode": "connection failure when initializing remote MCP server",
      "rootCause": "configuring remote HTTP SSE endpoint as local stdio command entry",
      "requiredFix": "switch configuration to SSE transport with explicit URL parameter"
    },
    "questionEN": "A developer attempts to integrate a remote Slack notification MCP server hosted at https://slack-alerts.internal.net/sse into Claude Code. In .claude/mcp.json, the engineer configures the server under mcpServers using standard process execution syntax with \"command\": \"https://slack-alerts.internal.net/sse\". Upon launching Claude Code, the client fails during initialization with an error spawn https://slack-alerts.internal.net/sse ENOENT and connection refused on localhost:0. Which configuration change resolves this issue and establishes proper connectivity?",
    "question": "[d2-b05-new-013] Một lập trình viên cố gắng tích hợp MCP server thông báo Slack từ xa được lưu trữ tại https://slack-alerts.internal.net/sse vào Claude Code. Trong tệp .claude/mcp.json, kỹ sư này đã cấu hình server dưới mục mcpServers bằng cú pháp thực thi tiến trình chuẩn với \"command\": \"https://slack-alerts.internal.net/sse\". Khi khởi chạy Claude Code, client gặp lỗi khởi tạo spawn https://slack-alerts.internal.net/sse ENOENT và connection refused on localhost:0. Thay đổi cấu hình nào sau đây sẽ giải quyết sự cố và thiết lập kết nối chính xác?",
    "optionsEN": [
      "A. Reconfigure the Slack MCP entry in mcp.json to use SSE transport by providing \"url\": \"https://slack-alerts.internal.net/sse\" instead of a local process command.",
      "B. Add \"args\": [\"--port\", \"443\"] to the existing stdio configuration so the local subprocess transport redirects stdio pipes over HTTPS.",
      "C. Move mcp.json from the project root .claude/ directory to ~/.claude.json so Claude Code automatically switches stdio commands to HTTP requests.",
      "D. Grant interactive TTY terminal access to the background Claude Code daemon so stdio transport can bridge network sockets to local ports."
    ],
    "options": [
      "A. Cấu hình lại mục Slack MCP trong mcp.json để sử dụng transport SSE bằng cách cung cấp \"url\": \"https://slack-alerts.internal.net/sse\" thay vì dùng command tiến trình cục bộ.",
      "B. Thêm \"args\": [\"--port\", \"443\"] vào cấu hình stdio hiện tại để subprocess transport cục bộ điều hướng luồng stdio qua HTTPS.",
      "C. Di chuyển mcp.json từ thư mục gốc dự án .claude/ sang ~/.claude.json để Claude Code tự động chuyển đổi lệnh stdio thành các yêu cầu HTTP.",
      "D. Cấp quyền truy cập TTY terminal tương tác cho daemon background của Claude Code để stdio transport có thể bắc cầu network socket tới port cục bộ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because remote MCP servers exposing HTTP endpoints must be configured using SSE transport with a url parameter, allowing Claude Code to establish a Server-Sent Events HTTP connection instead of executing a local binary.",
      "Option B is incorrect because adding command-line arguments to a stdio process execution block does not convert local process launching into an HTTP client connection.",
      "Option C is incorrect because changing the configuration file location alters server availability scope (project vs user) but has no effect on transport protocol handling.",
      "Option D is incorrect because TTY permissions affect interactive terminal access for local stdio binaries, but cannot enable stdio transport to parse remote HTTPS endpoints."
    ],
    "rationale": "Remote MCP servers operate over HTTP via Server-Sent Events (SSE) and require an explicit URL configuration rather than a local command executable used by stdio transport.",
    "explanation": "Lựa chọn A là chính xác vì các MCP server từ xa chạy qua kết nối HTTP/SSE yêu cầu tham số cấu hình url thay vì cấu hình command dành cho tiến trình stdio cục bộ. Lựa chọn B sai vì thêm đối số không thay đổi được cơ chế transport từ stdio sang HTTP. Lựa chọn C sai vì vị trí tệp cấu hình chỉ ảnh hưởng đến phạm vi chia sẻ (dự án hay người dùng) chứ không sửa được lỗi giao thức transport. Lựa chọn D sai vì quyền TTY không thể giúp giao thức stdio thực hiện kết nối mạng tới một URL từ xa.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-014",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-014",
    "scenarioSignature": {
      "testedPrinciple": "architectural separation of MCP tools for write operations and MCP resources for read operations",
      "failureMode": "inefficient tool execution overhead for data retrieval and missing side-effect protections",
      "rootCause": "misunderstanding MCP capability boundaries between read-only data context and executable tool actions",
      "requiredFix": "expose write operations as MCP tools and queryable data backlogs as MCP resources"
    },
    "questionEN": "An engineering team is configuring an MCP integration for their Linear project management system inside Claude Code. They need to expose both ticket creation capabilities (create_issue) and project backlog query capabilities (get_issues). According to MCP architectural best practices, how should these two capabilities be exposed to the AI agent?",
    "question": "[d2-b05-new-014] Một đội ngũ kỹ thuật đang cấu hình tích hợp MCP cho hệ thống quản lý dự án Linear trong Claude Code. Họ cần cung cấp cả khả năng tạo ticket (create_issue) và khả năng truy vấn danh sách công việc dự án (get_issues). Theo các thực hành kiến trúc tốt nhất của MCP, hai khả năng này nên được cung cấp cho AI agent như thế nào?",
    "optionsEN": [
      "A. Expose both create_issue and get_issues as MCP Tools because MCP Resources are strictly restricted to local static files.",
      "B. Expose create_issue as an MCP Tool for executable state mutations and get_issues as an MCP Resource for readable data context.",
      "C. Expose create_issue as an MCP Resource with write capabilities and get_issues as an MCP Prompt template for report generation.",
      "D. Expose get_issues as an MCP Tool for model interaction and create_issue as an MCP Prompt template to enforce user confirmation."
    ],
    "options": [
      "A. Cung cấp cả create_issue và get_issues dưới dạng MCP Tools vì MCP Resources bị giới hạn nghiêm ngặt cho các tệp tĩnh cục bộ.",
      "B. Cung cấp create_issue dưới dạng MCP Tool cho các thao tác thay đổi trạng thái và get_issues dưới dạng MCP Resource cho ngữ cảnh dữ liệu có thể đọc.",
      "C. Cung cấp create_issue dưới dạng MCP Resource có khả năng ghi và get_issues dưới dạng MCP Prompt template để tạo báo cáo.",
      "D. Cung cấp get_issues dưới dạng MCP Tool cho tương tác của mô hình và create_issue dưới dạng MCP Prompt template để bắt buộc xác nhận từ người dùng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because MCP Resources can dynamically fetch and stream data from remote APIs (like Linear REST endpoints) and are not limited to local files.",
      "Option B is correct because state-mutating actions with side effects (create_issue) belong in MCP Tools, whereas read-only data feeds (get_issues) belong in MCP Resources so the agent can attach background context efficiently without tool calls.",
      "Option C is incorrect because MCP Resources are strictly read-only primitives and cannot perform state mutations like ticket creation, while Prompts are template strings rather than data fetchers.",
      "Option D is incorrect because retrieving data via tools introduces unnecessary invocation overhead, and Prompts cannot execute server-side write operations."
    ],
    "rationale": "MCP Tools represent executable functions that perform side-effect mutations, while MCP Resources represent readable data sources that provide context to the LLM.",
    "explanation": "Lựa chọn B là chính xác vì các hành động thay đổi trạng thái có tác dụng phụ (create_issue) thuộc về MCP Tools, trong khi các luồng dữ liệu chỉ đọc (get_issues) thuộc về MCP Resources để agent có thể đính kèm dữ liệu ngữ cảnh mà không cần gọi tool. Lựa chọn A sai vì MCP Resources không bị giới hạn ở tệp cục bộ mà có thể truy vấn API từ xa. Lựa chọn C sai vì Resources là đối tượng chỉ đọc không thể thực hiện ghi dữ liệu. Lựa chọn D sai vì Prompts không thể tự thực hiện các thao tác ghi phía server.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]