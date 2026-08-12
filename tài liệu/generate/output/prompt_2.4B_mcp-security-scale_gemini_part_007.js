[
  {
    "id": "d2-b05-B-013",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-013",
    "questionEN": "A DevOps engineering team operates a remote infrastructure management MCP server using Server-Sent Events (transport: \"sse\" at http://mcp-internal.net:8080/sse). During an incident investigation spanning 15 conversation turns, Claude Code issues multiple tool calls. Developers observe that authentication context and session state created in turn 1 remain active in turn 15 without requiring re-authentication. Which architectural mechanism explains why session state persists across multiple turns?",
    "question": "[d2-b05-B-013] Một đội ngũ kỹ thuật vận hành một server MCP quản lý hạ tầng từ xa thông qua Server-Sent Events (với cấu hình transport: \"sse\" tại endpoint http://mcp-internal.net:8080/sse). Trong một phiên xử lý sự cố gồm 15 lượt tương tác (turns), Claude Code thực hiện liên tục các lời gọi tool. Các kỹ sư nhận thấy rằng token xác thực và trạng thái session được khởi tạo ở turn 1 vẫn tồn tại và hoạt động mượt mà ở turn 15 mà không cần xác thực lại. Cơ chế nào giải thích tại sao session state duy trì được qua nhiều turn tương tác?",
    "optionsEN": [
      "A. The SSE transport operates over a long-lived HTTP connection managed by an independent server process, preserving server-side session memory across multiple Claude Code turns.",
      "B. Claude Code automatically serializes stdout/stdin streams into local disk storage between turns and re-hydrates subprocess RAM on every tool call.",
      "C. The .claude/mcp.json configuration file snapshots server memory state to a local database after each tool invocation and reinjects it.",
      "D. SSE transport requires Claude Code to spawn a fresh remote binary process on every model turn while storing temporary session state inside prompt tokens."
    ],
    "options": [
      "A. SSE transport hoạt động trên một kết nối HTTP duy trì lâu dài do một server process độc lập quản lý, giúp giữ lại session state trong bộ nhớ phía server qua nhiều turn của Claude Code.",
      "B. Claude Code tự động tuần tự hóa stdout/stdin stream vào ổ đĩa cục bộ giữa các turn và khôi phục bộ nhớ subprocess mỗi khi gọi tool.",
      "C. File cấu hình .claude/mcp.json tự động chụp ảnh bộ nhớ của server vào cơ sở dữ liệu cục bộ sau mỗi lần gọi tool để nạp lại.",
      "D. SSE transport bắt buộc Claude Code phải khởi tạo lại binary process từ xa trên mỗi turn của mô hình và lưu trạng thái tạm thời vào prompt context window."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: SSE MCP servers run independently from the client lifecycle and maintain long-lived HTTP/SSE connections, allowing server-side state (such as auth tokens, cached DB pools, or session context) to persist across turns.",
      "Option B is incorrect: Stdio transport communicates via standard input/output streams of a child process; Claude Code does not serialize process memory to disk.",
      "Option C is incorrect: The mcp.json file is a static configuration file specifying command paths or endpoints; it does not snapshot server RAM.",
      "Option D is incorrect: SSE transport does not spawn a new process per model turn or store session state in context tokens; it relies on the persistent running HTTP service."
    ],
    "rationale": "The assigned answer (A) correctly identifies that SSE transport maintains a long-lived HTTP connection to an independently running server process, allowing server-side session memory to survive across multiple conversation turns.",
    "explanation": "Phương án A là chính xác vì SSE MCP server hoạt động như một dịch vụ độc lập duy trì kết nối HTTP lâu dài (long-lived HTTP/SSE connection), cho phép lưu trữ trạng thái phiên (session state, cache, auth token) trong bộ nhớ server qua nhiều lượt tương tác (turns) của Claude Code.\\nPhương án B sai vì transport stdio quản lý luồng đầu vào/ra của tiến trình con và không có cơ chế tự động serialize bộ nhớ RAM vào ổ đĩa.\\nPhương án C sai vì mcp.json chỉ là file cấu hình khai báo endpoint/command chứ không chụp snapshot bộ nhớ RAM của server.\\nPhương án D sai vì SSE không khởi tạo lại tiến trình ở mỗi turn và không lưu session state vào context window của model.",
    "scenarioSignature": {
      "testedPrinciple": "persistent session state in sse transport",
      "failureMode": "state loss across interactive turns",
      "rootCause": "subprocess termination per session in stdio transport vs persistent http connection in sse",
      "requiredFix": "leverage long lived sse http connections for stateful server instances"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-014",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-014",
    "scenarioSignature": {
      "testedPrinciple": "centralized mcp server deployment for cloud saas apis",
      "failureMode": "credential sprawl and rate limit exhaustion across distributed local environments",
      "rootCause": "local stdio transport requiring individual api tokens and uncoordinated client calls",
      "requiredFix": "deploy centralized sse mcp server wrapping cloud saas rest api"
    },
    "questionEN": "An enterprise organization plans to integrate GitHub SaaS management tools (pull request inspection and repo searching) into Claude Code for 200 developers. The architecture team evaluates distributing a local stdio binary (npx -y @modelcontextprotocol/server-github) to every workstation versus hosting a centralized SSE MCP server (https://mcp.internal.company.com/github/sse) that wraps the GitHub REST API. Which architectural tradeoff makes hosting the centralized SSE MCP server the superior approach for this enterprise SaaS integration?",
    "question": "[d2-b05-B-014] Một doanh nghiệp muốn tích hợp các tính năng GitHub SaaS (như tự động hóa Pull Request, tra cứu repository) vào Claude Code cho 200 nhà phát triển. Đội ngũ kiến trúc đánh giá hai phương án: phân phối ứng dụng stdio binary cục bộ (npx -y @modelcontextprotocol/server-github) tới máy từng nhà phát triển, hoặc triển khai một SSE MCP server tập trung (https://mcp.internal.company.com/github/sse) bọc quanh GitHub REST API. Đánh giá nào thể hiện đúng ưu thế kiến trúc của phương án triển khai tập trung qua SSE MCP server?",
    "optionsEN": [
      "A. Deploying a local stdio binary eliminates all network latency by avoiding HTTP calls to external GitHub REST API endpoints.",
      "B. Hosting a centralized SSE MCP server enables centralized management of API rate-limiting, token rotation, and credential isolation without distributing sensitive API keys to local developer environments.",
      "C. Stdio transport allows local Claude Code clients to bypass GitHub REST API permission scopes and run privileged administrative tasks without API tokens.",
      "D. SSE MCP server architecture mandates that Claude Code perform local git clones inside sandboxed containers for every tool call instead of making REST API requests."
    ],
    "options": [
      "A. Triển khai stdio binary cục bộ giúp loại bỏ hoàn toàn độ trễ mạng bằng cách tránh các lời gọi HTTP tới REST API endpoint của GitHub.",
      "B. Triển khai SSE MCP server tập trung cho phép quản lý tập trung giới hạn rate-limit API, luân chuyển token và cách ly thông tin xác thực mà không cần phân phối API key nhạy cảm tới môi trường máy cục bộ của lập trình viên.",
      "C. Transport dạng stdio cho phép Claude Code client cục bộ bỏ qua phạm vi quyền (scopes) của GitHub REST API và thực hiện công việc quản trị mà không cần API token.",
      "D. Kiến trúc SSE MCP server bắt buộc Claude Code phải thực hiện git clone cục bộ trong container sandbox cho mỗi lời gọi tool thay vì gửi request tới REST API."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: A local stdio binary still makes outbound HTTP calls to the GitHub REST API over the network.",
      "Option B is correct: Hosting a centralized SSE server isolates sensitive SaaS credentials in a backend service, allows shared API rate-limit monitoring, and avoids distributing individual API keys to workstation configuration files.",
      "Option C is incorrect: Stdio transport does not bypass OAuth scopes or authorization checks on external SaaS APIs.",
      "Option D is incorrect: SSE MCP servers proxy JSON-RPC tool calls to REST endpoints; they do not require local containerized git cloning."
    ],
    "rationale": "The assigned answer (B) correctly identifies that deploying an SSE MCP server for a SaaS API centralizes credentials and rate-limit governance, avoiding the security risks of scattering personal API tokens across developer devices.",
    "explanation": "Phương án B là chính xác vì việc triển khai SSE MCP server tập trung cho ứng dụng SaaS giúp bảo vệ API key nhạy cảm, tập trung quản lý rate limit và token refresh mà không phải chia sẻ credential tới từng máy cục bộ của 200 lập trình viên.\nPhương án A sai vì stdio binary cục bộ vẫn phải thực hiện lời gọi HTTP qua internet tới REST API của GitHub, không giúp loại bỏ độ trễ mạng.\nPhương án C sai vì stdio transport không thể bỏ qua quy trình xác thực hay phân quyền scope của GitHub API.\nPhương án D sai vì SSE MCP server đóng vai trò proxy lời gọi JSON-RPC tới REST API chứ không bắt buộc thực hiện git clone trong container cục bộ.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]