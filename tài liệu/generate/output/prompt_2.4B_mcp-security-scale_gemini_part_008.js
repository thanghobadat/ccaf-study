[
  {
    "id": "d2-b05-B-015",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-015",
    "scenarioSignature": {
      "testedPrinciple": "headless CLI execution configuration scoping via dedicated config flag",
      "failureMode": "automated pipeline executing unauthorized destructive mutations during automated workflow",
      "rootCause": "headless test process inheriting ambient local development configuration with full write permissions",
      "requiredFix": "specify isolated read-only configuration file path using explicit command flag in pipeline step"
    },
    "questionEN": "A DevOps team configures a GitHub Actions workflow to execute claude code non-interactively for automated code reviews and database schema checks on pull requests. During execution, the runner executes destructive database drop operations because claude code defaults to loading .claude/mcp.json from the repository root, which connects to a read-write database MCP server. The team needs to ensure the CI runner executes with a restricted configuration without modifying the developer configuration file. Which approach correctly restricts MCP server privileges in the CI pipeline?",
    "question": "[d2-b05-B-015] Một đội ngũ DevOps cấu hình một GitHub Actions workflow để chạy claude code ở chế độ headless nhằm tự động hóa code review và kiểm tra database schema trên các pull request. Trong quá trình chạy, runner đã thực thi các thao tác drop database gây mất dữ liệu vì claude code mặc định tải .claude/mcp.json từ thư mục gốc repository, vốn đang chứa cấu hình MCP server kết nối database với quyền read-write. Đội ngũ cần đảm bảo CI runner chạy với cấu hình bị giới hạn mà không làm thay đổi file cấu hình của môi trường local dev. Phương pháp nào giải quyết đúng yêu cầu này trong CI pipeline?",
    "optionsEN": [
      "A. Append --read-only to the claude code command line invocation so that all connected MCP tool endpoints automatically drop mutation requests.",
      "B. Define MCP_READONLY_MODE=true in the GitHub Actions runner environment variables so the MCP client enforces read-only tool permissions.",
      "C. Pass --mcp-config /ci/mcp-readonly.json in the CI step execution command to force Claude Code to load an isolated configuration containing read-only tool arguments.",
      "D. Set the file permissions of .claude/mcp.json to 444 (read-only) in the git repository before initiating the automated workflow step."
    ],
    "options": [
      "A. Thêm --read-only vào câu lệnh thực thi claude code để tất cả các MCP tool endpoint tự động từ chối các yêu cầu ghi hoặc sửa đổi dữ liệu.",
      "B. Định nghĩa biến môi trường MCP_READONLY_MODE=true trong GitHub Actions runner để MCP client áp dụng chính sách phân quyền read-only cho mọi tool.",
      "C. Truyền tham số --mcp-config /ci/mcp-readonly.json trong câu lệnh của CI step để buộc Claude Code tải file cấu hình cô lập chứa các tham số server chỉ có quyền read-only.",
      "D. Đổi quyền file .claude/mcp.json thành 444 (read-only) trong repository trước khi bắt đầu bước chạy tự động của workflow."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because --read-only is not a valid Claude Code CLI flag for dynamically restricting arbitrary MCP tool capabilities.",
      "Option B is incorrect because MCP_READONLY_MODE is not a supported environment variable for enforcing read-only behavior across MCP servers.",
      "Option C is correct because the --mcp-config <path> flag overrides default mcp.json discovery, forcing Claude Code to load the restricted server configuration specified for CI workflows.",
      "Option D is incorrect because changing filesystem permission bits on .claude/mcp.json only prevents writing to the config file itself and does not restrict server execution arguments."
    ],
    "rationale": "Claude Code supports overriding default MCP configuration discovery (.claude/mcp.json or user-level config) by passing the --mcp-config <path> flag. In automated non-interactive environments like GitHub Actions, providing a restricted config path (e.g., /ci/mcp-readonly.json) ensures that the CLI connects only to MCP servers with read-only tools or scope, preventing unintended data mutations without altering developer config files.",
    "explanation": "Option A sai vì claude code không hỗ trợ flag --read-only để tự động chuyển đổi tất cả MCP tools tùy ý sang chế độ read-only.\nOption B sai vì MCP_READONLY_MODE không phải là biến môi trường chuẩn của Claude Code dùng để lọc hoặc giới hạn quyền thực thi của MCP servers.\nOption C đúng vì flag --mcp-config <path> cho phép chỉ định chính xác đường dẫn file mcp.json thay thế trong môi trường headless/CI, từ đó nạp cấu hình MCP server đã được hạ quyền (ví dụ chỉ có quyền đọc) tách biệt hoàn toàn với file .claude/mcp.json của local dev.\nOption D sai vì thay đổi quyền truy cập file trên hệ thống tệp (chmod 444) chỉ ngăn sửa đổi nội dung file JSON chứ không làm thay đổi các tham số hoặc tài khoản kết nối read-write được khai báo bên trong file đó.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-016",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-016",
    "questionEN": "An enterprise MCP server exposes a search_knowledge_base tool to query internal technical documentation. When querying broad topics like \"deployment architecture\", the tool retrieves hundreds of document chunks in a single response payload, causing Claude Code to hit context window limits and fail during response generation as the model attempts to ingest and concatenate all chunks at once. What architectural update to the MCP tool implementation best resolves this context window saturation issue?",
    "question": "[d2-b05-B-016] Một MCP server doanh nghiệp cung cấp tool search_knowledge_base để truy vấn tài liệu kỹ thuật nội bộ. Khi tìm kiếm các chủ đề rộng như \"deployment architecture\", tool này trả về hàng trăm chunk tài liệu trong một response payload duy nhất, khiến Claude Code bị tràn context window và thất bại trong quá trình tạo phản hồi do mô hình phải xử lý và nối toàn bộ các chunk cùng lúc. Thay đổi kiến trúc nào đối với MCP tool giải quyết triệt để vấn đề quá tải context window này?",
    "optionsEN": [
      "A. Convert search_knowledge_base from an MCP Tool to a static MCP Resource URI kb://documents/all to bypass token limitations.",
      "B. Increase the max_tokens configuration parameter in the local .claude/mcp.json file to allow larger tool output payloads.",
      "C. Configure the MCP server transport from stdio to Server-Sent Events (SSE) so responses are split into smaller network packets.",
      "D. Update the search_knowledge_base tool schema to accept limit and cursor (or page) input parameters to paginate chunk retrieval."
    ],
    "options": [
      "A. Chuyển đổi search_knowledge_base từ một MCP Tool thành một MCP Resource tĩnh với URI kb://documents/all để vượt qua giới hạn token.",
      "B. Tăng tham số cấu hình max_tokens trong file .claude/mcp.json ở môi trường local để cho phép nhận các payload kết quả tool lớn hơn.",
      "C. Cấu hình lại transport của MCP server từ stdio sang Server-Sent Events (SSE) để các phản hồi được chia nhỏ thành nhiều gói tin mạng.",
      "D. Cập nhật schema của tool search_knowledge_base để tiếp nhận các tham số đầu vào limit và cursor (hoặc page) giúp phân trang kết quả trả về."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because dynamic querying requires an interactive Tool rather than a static Resource, and reading a massive resource URI would still overwhelm the context window.",
      "Option B is incorrect because max_tokens controls LLM response generation output length, not the incoming context payload size allowed from tool calls.",
      "Option C is incorrect because changing the network transport protocol (stdio vs SSE) does not reduce the number of tokens ingested into the LLM context window.",
      "Option D is correct because adding pagination parameters (limit and cursor or page) enables the client model to retrieve document chunks in small, manageable batches without exceeding context bounds."
    ],
    "rationale": "When an MCP tool searches a large internal knowledge base, returning all matched document chunks simultaneously can easily exceed the client's context window. Designing the tool schema with pagination parameters (such as limit, offset, or cursor) allows the model to request small, relevant batches of document chunks on demand, keeping token consumption within safe limits and enabling iterative retrieval.",
    "explanation": "Option A sai vì chức năng tìm kiếm linh hoạt theo truy vấn là một hành động động (Tool) chứ không phải tài liệu tĩnh (Resource), đồng thời việc đọc toàn bộ resource tĩnh vẫn gây quá tải context window.\\nOption B sai vì max_tokens điều chỉnh giới hạn token tối đa cho phản hồi đầu ra của LLM chứ không ngăn được việc payload đầu vào từ tool làm đầy context window.\\nOption C sai vì việc thay đổi transport từ stdio sang SSE chỉ ảnh hưởng tới phương thức truyền dữ liệu qua mạng/process, không làm giảm số lượng token mà mô hình phải nạp vào context.\\nOption D đúng vì việc bổ sung các tham số phân trang (limit và cursor/page) vào schema của tool cho phép mô hình truy vấn từng tập nhỏ các chunk tài liệu theo nhu cầu, kiểm soát được lượng token nạp vào context window trong mỗi lần gọi.",
    "scenarioSignature": {
      "testedPrinciple": "large result set pagination control in search tool design",
      "failureMode": "context window overflow when fetching multi-chunk internal knowledge base search results",
      "rootCause": "tool returning all document matches in a single payload forcing client token exhaustion",
      "requiredFix": "implement page size and offset parameters in tool schema to stream chunks incrementally"
    },
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]