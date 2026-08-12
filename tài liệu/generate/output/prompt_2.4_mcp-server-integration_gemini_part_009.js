[
  {
    "id": "d2-b05-new-017",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-017",
    "scenarioSignature": {
      "testedPrinciple": "server-side data normalization for MCP tool responses",
      "failureMode": "unreliable structured data extraction by model",
      "rootCause": "MCP server returning raw unstructured HTML markup instead of typed fields",
      "requiredFix": "parse HTML server-side and return structured JSON object schema"
    },
    "questionEN": "A developer builds an MCP server wrapping a supplier portal to fetch inventory data. The MCP tool get_product_status executes an HTTP request to the supplier portal and returns a JSON payload containing raw unstructured HTML: {\"status\": 200, \"result\": \"<html><body><div id='stock'>In Stock</div><span class='price'>$49.99</span></body></html>\"}. When the AI agent calls get_product_status to extract numerical prices and availability flags, parsing frequently fails or yields hallucinated values due to complex DOM markup. Which architectural change to the MCP server best ensures reliable structured data extraction by the model?",
    "question": "[d2-b05-new-017] Một nhà phát triển xây dựng MCP server bọc portal của nhà cung cấp để lấy dữ liệu tồn kho. MCP tool get_product_status thực thi một yêu cầu HTTP đến portal nhà cung cấp và trả về payload JSON chứa HTML thô không cấu trúc: {\"status\": 200, \"result\": \"<html><body><div id='stock'>In Stock</div><span class='price'>$49.99</span></body></html>\"}. Khi AI agent gọi get_product_status để trích xuất giá dạng số và cờ trạng thái tồn kho, việc phân tích thường xuyên thất bại hoặc tạo ra giá trị bịa đặt do cấu trúc DOM phức tạp. Thay đổi kiến trúc nào đối với MCP server giúp đảm bảo trích xuất dữ liệu có cấu trúc đáng tin cậy nhất cho mô hình?",
    "optionsEN": [
      "A. Update the MCP server tool code to parse the raw HTML using a server-side DOM parser and return clean, typed fields in the JSON response schema.",
      "B. Increase the model's max token limit and add system prompt instructions directing the agent to run regex patterns on raw HTML strings.",
      "C. Switch the MCP server transport configuration in mcp.json from stdio to Server-Sent Events (SSE) to stream HTML chunks asynchronously.",
      "D. Expose the supplier portal URL as an MCP Resource URI instead of an MCP Tool so the agent reads the HTML directly into context."
    ],
    "options": [
      "A. Cập nhật mã nguồn MCP server tool để phân tích HTML thô bằng thư viện phân tích DOM phía server và trả về các trường dữ liệu sạch có kiểu rõ ràng trong schema phản hồi JSON.",
      "B. Tăng giới hạn token tối đa của mô hình và thêm hướng dẫn vào system prompt yêu cầu agent chạy các chuỗi regex trên chuỗi HTML thô.",
      "C. Chuyển đổi cấu hình transport của MCP server trong mcp.json từ stdio sang Server-Sent Events (SSE) để truyền các đoạn HTML bất đồng bộ.",
      "D. Bố trí URL portal nhà cung cấp dưới dạng MCP Resource URI thay vì MCP Tool để agent đọc trực tiếp HTML vào ngữ cảnh."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because normalizing raw HTML on the MCP server using DOM parsing (such as Cheerio or BeautifulSoup) converts unstructured markup into typed JSON attributes (e.g., {\"in_stock\": true, \"unit_price\": 49.99}), guaranteeing reliable model consumption.",
      "Option B is incorrect because forcing the LLM to extract data from raw HTML strings client-side via prompt engineering or regex increases token consumption and remains prone to parsing hallucinations when HTML structures change.",
      "Option C is incorrect because changing the MCP transport protocol from stdio to SSE alters payload streaming delivery over network sockets but does not structure or transform the underlying payload data.",
      "Option D is incorrect because converting the tool to an MCP Resource still loads raw, unstructured HTML markup directly into the LLM context window, failing to solve the structured extraction reliability problem."
    ],
    "rationale": "MCP tools should return structured, clean, and normalized data schemas rather than raw HTML or unstructured web markup. By performing server-side DOM parsing within the MCP server handler and exposing explicitly typed properties (such as boolean cờ tồn kho and float đơn giá), the LLM receives deterministic JSON inputs, eliminating extraction hallucinations and minimizing context token overhead.",
    "explanation": "Lựa chọn A là đáp án đúng vì chuẩn hóa HTML thô ngay tại MCP server bằng các thư viện DOM parser phía server giúp chuyển đổi dữ liệu không cấu trúc thành payload JSON sạch có định dạng và kiểu dữ liệu rõ ràng (ví dụ: {\"in_stock\": true, \"unit_price\": 49.99}). Việc này giúp mô hình đọc dữ liệu một cách chính xác tuyệt đối mà không lo tái lập lỗi phân tích DOM. Lựa chọn B sai vì ép mô hình phân tích HTML thô qua prompt hoặc regex làm tốn token và không đảm bảo tính ổn định khi cấu trúc web thay đổi. Lựa chọn C sai vì thay đổi transport layer (stdio sang SSE) chỉ liên quan đến phương thức giao tiếp mạng chứ không làm thay đổi cấu trúc dữ liệu payload. Lựa chọn D sai vì việc chuyển sang MCP Resource vẫn nạp toàn bộ HTML thô chưa xử lý vào ngữ cảnh của LLM, không giải quyết được vấn đề trích xuất dữ liệu có cấu trúc.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-018",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-018",
    "scenarioSignature": {
      "testedPrinciple": "MCP server configuration scoping between user level and project level",
      "failureMode": "personal utility tools improperly exposed in enterprise project sessions",
      "rootCause": "MCP server configured in global user settings inherits across all local repositories",
      "requiredFix": "remove tool from global user configuration and scope to project level config"
    },
    "questionEN": "A software engineer configures a personal pomodoro-timer MCP server under mcpServers inside their global user configuration file ~/.claude.json. Later, while working on an enterprise healthcare codebase containing sensitive HIPAA PII, the developer runs /tools in Claude Code CLI and notices start_pomodoro and get_timer_status listed alongside production database inspection tools. An automated enterprise compliance scanner flags the presence of unauthorized third-party tool definitions in the active security context. What is the root cause of this exposure, and how should it be resolved?",
    "question": "[d2-b05-new-018] Một kỹ sư phần mềm cấu hình MCP server cá nhân pomodoro-timer trong mục mcpServers thuộc file cấu hình người dùng toàn cục ~/.claude.json. Sau đó, khi đang làm việc trên codebase y tế doanh nghiệp chứa dữ liệu PII nhạy cảm theo chuẩn HIPAA, lập trình viên chạy lệnh /tools trong Claude Code CLI và nhận thấy các công cụ start_pomodoro và get_timer_status xuất hiện bên cạnh các tool kiểm tra cơ sở dữ liệu production. Hệ thống quét tuân thủ tự động của doanh nghiệp cảnh báo sự xuất hiện của định nghĩa tool bên thứ ba chưa được cấp phép trong ngữ cảnh bảo mật hiện tại. Nguyên nhân gốc rễ của vấn đề này là gì và làm thế nào để khắc phục?",
    "optionsEN": [
      "A. The pomodoro-timer server binary path lacks a matching exclusion pattern in .claudeignore; add node_modules/pomodoro-timer to .claudeignore in the project root.",
      "B. The MCP server was registered in global user configuration (~/.claude.json), making it load into all sessions; remove it from global settings and scope tools using project-level .claude/mcp.json.",
      "C. The pomodoro-timer server uses stdio transport instead of sse; change the transport protocol to sse in ~/.claude.json to isolate its process execution context.",
      "D. The CLI session lacks workspace environment isolation; set env.DISABLE_PII_LOGGING = \"true\" inside the pomodoro-timer configuration block within ~/.claude.json."
    ],
    "options": [
      "A. Đường dẫn binary của pomodoro-timer thiếu mẫu loại trừ tương ứng trong .claudeignore; hãy thêm node_modules/pomodoro-timer vào .claudeignore ở thư mục gốc dự án.",
      "B. MCP server được đăng ký trong file cấu hình người dùng toàn cục (~/.claude.json), khiến nó tự động nạp vào mọi phiên làm việc; hãy xóa nó khỏi cấu hình toàn cục và giới hạn tool bằng file .claude/mcp.json cấp dự án.",
      "C. Server pomodoro-timer sử dụng transport stdio thay vì sse; hãy đổi giao thức transport thành sse trong ~/.claude.json để cô lập ngữ cảnh thực thi tiến trình.",
      "D. Phiên CLI thiếu sự cô lập môi trường workspace; hãy thiết lập env.DISABLE_PII_LOGGING = \"true\" bên trong khối cấu hình pomodoro-timer trong ~/.claude.json."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because .claudeignore prevents Claude Code from reading specific local files into context, but has no effect on registered MCP server tool definitions.",
      "Option B is correct because configuring MCP servers in global user configuration (~/.claude.json or ~/.config/claude/mcp.json) exposes those tools across all local repositories regardless of project boundaries; personal utilities must be removed from global settings and kept out of enterprise project contexts or scoped via project .claude/mcp.json.",
      "Option C is incorrect because changing transport protocols from stdio to sse affects communication mechanisms but does not change configuration scoping or prevent globally defined servers from loading into active sessions.",
      "Option D is incorrect because setting an arbitrary environment variable does not prevent the MCP server tool schema from being loaded into the agent session or satisfy compliance requirements."
    ],
    "rationale": "MCP server configurations defined at the user level (~/.claude.json or ~/.config/claude/mcp.json) are globally inherited by all Claude Code CLI sessions across all projects on that machine. To prevent personal utility tools from polluting enterprise or compliance-sensitive projects (which may process PII), personal tools must be removed from global configuration and managed at the project level using .claude/mcp.json or isolated dedicated sessions.",
    "explanation": "Lựa chọn B là đáp án đúng vì việc khai báo MCP server trong file cấu hình người dùng toàn cục (~/.claude.json hoặc ~/.config/claude/mcp.json) sẽ khiến các tool đó được tự động nạp vào tất cả các phiên làm việc của Claude Code trên máy tính, bất kể ranh giới dự án. Để tránh rò rỉ hoặc làm bẩn ngữ cảnh trong các dự án doanh nghiệp nhạy cảm, cần xóa các tool cá nhân khỏi cấu hình toàn cục và quản lý tool theo từng dự án thông qua .claude/mcp.json. Lựa chọn A sai vì .claudeignore chỉ bỏ qua các tệp văn bản khi đọc codebase chứ không thể chặn việc nạp định nghĩa MCP tool. Lựa chọn C sai vì giao thức transport (stdio hay sse) không làm thay đổi phạm vi nạp (scoping) của file cấu hình. Lựa chọn D sai vì việc thêm biến môi trường không giải quyết được việc định nghĩa tool cá nhân vẫn bị đưa vào ngữ cảnh an toàn của dự án.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]