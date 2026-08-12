[
  {
    "id": "d2-b05-B-009",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-009",
    "scenarioSignature": {
      "testedPrinciple": "large resource context window management",
      "failureMode": "context window token exhaustion during document retrieval",
      "rootCause": "unpaginated resource reader returning complete file into prompt context",
      "requiredFix": "implement offset and limit parameters or convert to chunked search tool"
    },
    "questionEN": "A developer connects an internal documentation MCP server that exposes architectural specifications via an MCP Resource URI docs://enterprise/architecture-spec.md. When Claude Code requests this resource, the server returns the complete 5 MB file via resources/read. Consequently, the prompt consumes over 180,000 tokens, leaving only 2,000 tokens in the context window for response generation and causing truncation. What is the correct architectural fix to prevent context exhaustion?",
    "question": "[d2-b05-B-009] Một lập trình viên kết nối MCP server tài liệu nội bộ để cung cấp thông số kiến trúc qua MCP Resource URI docs://enterprise/architecture-spec.md. Khi Claude Code yêu cầu resource này, server trả về toàn bộ file 5 MB qua resources/read. Kết quả là prompt ngốn hơn 180.000 token, chỉ còn 2.000 token trong context window cho lượt phản hồi và gây ra lỗi tràn context. Giải pháp kiến trúc nào là đúng để tránh cạn kiệt context?",
    "optionsEN": [
      "A. Refactor the MCP server to support paginated URI parameters (e.g., docs://enterprise/architecture-spec.md?offset=0&limit=2000) or replace full resource loading with a parameterized search tool that returns targeted excerpts.",
      "B. Increase the client-side timeout setting toolTimeoutMs in .claude/mcp.json to allow the model more time to process the 5 MB payload.",
      "C. Change the MCP transport from stdio to SSE so stream compression automatically compresses the 5 MB document payload before entering the context window.",
      "D. Wrap the resource payload in an MCP Prompt template that instructs the model to ignore all text beyond the first 2,000 tokens."
    ],
    "options": [
      "A. Refactor MCP server để hỗ trợ các tham số URI phân trang (ví dụ: docs://enterprise/architecture-spec.md?offset=0&limit=2000) hoặc thay thế việc tải full resource bằng một tool tìm kiếm có tham số để trả về các đoạn trích dẫn mục tiêu.",
      "B. Tăng cấu hình timeout phía client toolTimeoutMs trong .claude/mcp.json để mô hình có thêm thời gian xử lý payload 5 MB.",
      "C. Chuyển đổi MCP transport từ stdio sang SSE để tính năng nén luồng tự động nén payload 5 MB trước khi nạp vào context window.",
      "D. Bọc resource payload trong một MCP Prompt template với hướng dẫn mô hình bỏ qua toàn bộ văn bản sau 2.000 token đầu tiên."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: MCP Resources returning massive payloads directly dump all bytes into the client's context window. Supporting URI query parameters for pagination/range reading or exposing a search tool keeps token consumption bounded.",
      "Option B is incorrect: Increasing toolTimeoutMs addresses execution latency, not context window space; the 5 MB file will still consume ~180k tokens regardless of timeout.",
      "Option C is incorrect: SSE transport compression compresses network wire data during transport, but once parsed by the MCP client, raw text is expanded and injected directly into the LLM context window.",
      "Option D is incorrect: MCP Prompts structure the text sent to the model, but sending the entire 5 MB file inside a Prompt template still consumes context window tokens regardless of system instructions."
    ],
    "rationale": "Loading raw multi-megabyte documents via MCP Resources fills the context window directly. Bounding context usage requires pagination query parameters on resource URIs or switching to a search tool that retrieves specific chunks.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Lựa chọn A (Đúng): MCP Resource khi được đọc (resources/read) sẽ nạp toàn bộ nội dung trực tiếp vào context window của LLM. Với file dung lượng lớn (5 MB ~180k tokens), giải pháp kiến trúc chuẩn trong MCP là phân trang URI (range/offset/limit) hoặc chuyển sang dùng MCP Tool cho phép tìm kiếm và trả về đoạn trích (excerpts) thay vì nạp thô toàn bộ file.\n- Lựa chọn B (Sai): Tăng toolTimeoutMs chỉ giải quyết thời gian chờ network/xử lý, không giảm bớt số lượng token được nạp vào context window.\n- Lựa chọn C (Sai): Nén dữ liệu của SSE transport chỉ có tác dụng trên đường truyền mạng (wire protocol). Khi client nhận dữ liệu và chuyển thành text để gửi cho LLM, toàn bộ 5 MB text vẫn giải nén và chiếm trọn context window.\n- Lựa chọn D (Sai): Đưa file 5 MB vào MCP Prompt template vẫn tính toàn bộ token của file đó vào context window, việc dặn LLM 'bỏ qua' không ngăn được việc token đã bị nạp vào context.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-010",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-010",
    "scenarioSignature": {
      "testedPrinciple": "architectural separation between mcp tools and resources",
      "failureMode": "inappropriate abstraction selection for dynamic search operations",
      "rootCause": "attempting to model parameterized search queries as static resource uris",
      "requiredFix": "expose dynamic search endpoints as mcp tools with schema parameters"
    },
    "questionEN": "A developer is designing an MCP server to integrate an enterprise GitHub instance into Claude Code. They need to provide a capability allowing the agent to find issues using arbitrary search queries, status filters, and label criteria. Should this capability be implemented as an MCP Resource or an MCP Tool, and what is the underlying architectural justification?",
    "question": "[d2-b05-B-010] Một lập trình viên đang thiết kế MCP server để tích hợp hệ thống GitHub doanh nghiệp vào Claude Code. Họ cần cung cấp tính năng cho phép agent tìm kiếm các issue dựa trên từ khóa truy vấn bất kỳ, bộ lọc trạng thái và nhãn. Tính năng này nên được triển khai dưới dạng MCP Resource hay MCP Tool, và lý do kiến trúc cốt lõi là gì?",
    "optionsEN": [
      "A. It should be an MCP Resource, because GitHub issues are read-only data entities that do not mutate repository state.",
      "B. It should be an MCP Tool, because search requires active parameterization (queries, filters) and computation, whereas MCP Resources are passive data items identified by direct URIs.",
      "C. It should be an MCP Resource, because MCP Tools can only be used for operations that write or delete data on remote APIs.",
      "D. It should be an MCP Tool, because MCP Resources cannot return JSON formatted text responses to Claude Code."
    ],
    "options": [
      "A. Nên là MCP Resource, vì các GitHub issue là các thực thể dữ liệu chỉ đọc (read-only) và không thay đổi trạng thái của repository.",
      "B. Nên là MCP Tool, vì thao tác tìm kiếm đòi hỏi truyền tham số động (truy vấn, bộ lọc) và tính toán, trong khi MCP Resource là các mục dữ liệu thụ động được định danh bằng URI trực tiếp.",
      "C. Nên là MCP Resource, vì MCP Tool chỉ được sử dụng cho các thao tác ghi hoặc xóa dữ liệu trên API từ xa.",
      "D. Nên là MCP Tool, vì MCP Resource không thể trả về phản hồi văn bản định dạng JSON cho Claude Code."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Read-only nature alone does not make an operation a Resource; dynamic search taking runtime parameters requires a Tool abstraction.",
      "Option B is correct: In MCP architecture, Tools represent active functions taking dynamic arguments (like search query strings, state filters), whereas Resources represent passive, addressable data content identified by direct URIs (e.g., github://issue/42).",
      "Option C is incorrect: MCP Tools are not limited to write operations; read-only operations requiring parameterization (like search or DB queries) are properly implemented as Tools.",
      "Option D is incorrect: MCP Resources can return JSON, plaintext, binary, or structured MIME types; format capability is not the distinction between Tools and Resources."
    ],
    "rationale": "MCP Tools are designed for parameterized actions and queries where the model passes arguments to execute a function. MCP Resources represent passive data files or endpoints identified by fixed URIs.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Lựa chọn A (Sai): Việc thao tác chỉ đọc (read-only) không đồng nghĩa với việc nó phải là MCP Resource. Nếu thao tác cần nhận các tham số động từ model để thực hiện tìm kiếm, nó thuộc về Tool.\n- Lựa chọn B (Đúng): Trong kiến trúc MCP, Tools dùng cho các hành động/chức năng chủ động nhận tham số đầu vào (arguments schema như search keywords, filters), còn Resources đại diện cho dữ liệu thụ động được gắn định danh bằng URI cố định (như github://repo/issue/123). Tìm kiếm issue là một thao tác nhận tham số tính toán nên phải là Tool.\n- Lựa chọn C (Sai): MCP Tool không chỉ giới hạn cho thao tác ghi/xóa (write/delete). Các thao tác đọc có tham số như SQL query, API search đều là MCP Tool.\n- Lựa chọn D (Sai): MCP Resource hoàn toàn có thể trả về dữ liệu JSON, text hoặc binary qua MIME type; định dạng dữ liệu trả về không phải là yếu tố phân biệt giữa Tool và Resource.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]