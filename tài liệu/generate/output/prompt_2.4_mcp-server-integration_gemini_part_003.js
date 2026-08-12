[
  {
    "id": "d2-b05-new-005",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-005",
    "scenarioSignature": {
      "testedPrinciple": "MCP resource URI mapping for static readable documentation data",
      "failureMode": "context window overload and tool selection latency due to excessive tool definitions",
      "rootCause": "exposing static documentation pages as executable MCP tools instead of readable resources",
      "requiredFix": "convert documentation pages into MCP resources accessed via URI templates"
    },
    "questionEN": "A technical documentation team integrates an internal SDK reference containing 500 REST API endpoint specification pages into Claude Code via MCP. The developer configured the MCP server to register each documentation page as an individual executable tool (e.g., get_user_v2_doc(), create_payment_v1_doc()), causing tools/list responses to return 500 tool JSON schemas. Consequently, every model call incurs an additional 110,000 tokens of schema overhead in the context window and tool selection latency increases by 12 seconds. How should the MCP architecture be refactored?",
    "question": "[d2-b05-new-005] Đội ngũ tài liệu kỹ thuật tích hợp 500 trang hướng dẫn API SDK nội bộ vào Claude Code thông qua MCP. Lập trình viên đã cấu hình MCP server để đăng ký mỗi trang tài liệu thành một MCP Tool riêng biệt (ví dụ: get_user_v2_doc(), create_payment_v1_doc()), khiến phản hồi từ tools/list trả về 500 JSON schema công cụ. Hậu quả là mỗi yêu cầu tới mô hình bị tốn thêm 110.000 token trong context window và độ trễ lựa chọn tool tăng 12 giây. Kiến trúc MCP nên được tái cấu trúc như thế nào?",
    "optionsEN": [
      "A. Re-implement the documentation pages as MCP Resources identified by URI templates (e.g., docs://api/{endpoint}) so that data is read only on demand without bloating tools/list.",
      "B. Group the 500 tools into 5 batch tool definitions that accept an endpoint_name parameter and return standard Markdown text via stdout.",
      "C. Convert the stdio transport connection to SSE transport with dynamic tool pagination enabled in mcp.json.",
      "D. Define an MCP Prompt template for each document page to auto-inject the documentation into the user message history during initialization."
    ],
    "options": [
      "A. Tái cấu trúc các trang tài liệu thành các MCP Resource được định danh bằng URI template (ví dụ: docs://api/{endpoint}) để dữ liệu chỉ được đọc khi cần thay vì làm phình tools/list.",
      "B. Nhóm 500 công cụ thành 5 định nghĩa công cụ dạng batch nhận tham số endpoint_name và trả về văn bản Markdown qua stdout.",
      "C. Chuyển đổi kết nối stdio transport sang SSE transport và bật tính năng phân trang tool (tool pagination) trong mcp.json.",
      "D. Định nghĩa một MCP Prompt template cho từng trang tài liệu để tự động chèn nội dung tài liệu vào lịch sử tin nhắn người dùng khi khởi tạo."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because static documentation pages represent readable reference data rather than executable state-changing actions. Converting them to MCP Resources with URI templates (such as docs://api/{endpoint}) allows the model to inspect specific docs on demand without populating tools/list schemas into the system prompt context window.",
      "Option B is incorrect because while batching tools reduces tool count, static documentation remains read-only reference data that should be exposed as MCP Resources rather than executable tool calls.",
      "Option C is incorrect because switching from stdio to SSE transport alters network transport rather than capability declaration, and does not prevent loaded tool schemas from consuming context window tokens.",
      "Option D is incorrect because MCP Prompts are designed to standardize prompt templates and workflows across client interfaces, not to serve as an access mechanism for retrieving dynamic or large documentation sets."
    ],
    "rationale": "Static documentation represents readable reference data, which should be modeled as MCP Resources (accessed via URI templates) rather than executable MCP Tools. This avoids bloating the tools/list payload and saves context window space.",
    "explanation": "Phân tích chi tiết từng phương án cho tình huống cấu hình MCP server:\n- Phương án A (ĐÚNG): Các trang tài liệu tĩnh là dữ liệu tham chiếu chỉ đọc (readable data), không phải các hành động thực thi làm thay đổi trạng thái (executable actions). Việc chuyển đổi chúng thành MCP Resources với URI templates (ví dụ: docs://api/{endpoint}) cho phép mô hình AI truy vấn tài liệu chính xác khi cần thông qua giao thức đọc Resource, loại bỏ hoàn toàn 500 JSON schema khỏi phản hồi tools/list và tiết kiệm dung lượng context window.\n- Phương án B (SAI): Việc gộp thành 5 batch tools tuy giảm số lượng công cụ nhưng vẫn duy trì sai bản chất mô hình hóa: tài liệu tĩnh vẫn đang bị xử lý dưới dạng Tool thực thi thay vì cấu hình thành Resource tĩnh native của MCP.\n- Phương án C (SAI): Việc đổi transport từ stdio sang SSE chỉ thay đổi phương thức giao tiếp mạng (network transport), không làm thay đổi việc khai báo capability. tools/list vẫn sẽ gửi toàn bộ schema sang client khiến context window bị quá tải.\n- Phương án D (SAI): MCP Prompts được thiết kế để chuẩn hóa các mẫu câu lệnh (prompt templates) và quy trình làm việc giữa các client, không phải là cơ chế phù hợp để lưu trữ và truy xuất 500 trang tài liệu tham chiếu.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-006",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-006",
    "scenarioSignature": {
      "testedPrinciple": "MCP resource vs tool semantic separation for static documents",
      "failureMode": "unnecessary tool schema overhead for passive reference documents",
      "rootCause": "misclassifying static read-only knowledge base document as an executable tool",
      "requiredFix": "declare static reference document as an MCP resource URI"
    },
    "questionEN": "An engineering team is integrating a single 45KB internal architectural guidelines document into Claude Code via MCP. The document is updated weekly by lead architects, contains read-only Markdown rules, and requires no input parameters or backend database queries to read. A developer argues whether to expose this document as an MCP Tool (fetch_architecture_guide()) or as an MCP Resource (URI file:///docs/architecture.md). Which design approach is correct and why?",
    "question": "[d2-b05-new-006] Một đội ngũ kỹ thuật đang tích hợp một tài liệu hướng dẫn kiến trúc nội bộ dung lượng 45KB vào Claude Code thông qua MCP. Tài liệu này được cập nhật hàng tuần bởi các kiến trúc sư trưởng, chứa các quy tắc Markdown chỉ đọc và không yêu cầu tham số đầu vào hay truy vấn cơ sở dữ liệu để đọc. Lập trình viên đang tranh luận nên phân phối tài liệu này dưới dạng MCP Tool (fetch_architecture_guide()) hay MCP Resource (URI file:///docs/architecture.md). Cách thiết kế nào dưới đây là đúng và tại sao?",
    "optionsEN": [
      "A. Implement it as an MCP Tool (fetch_architecture_guide()) because tools enable LLMs to invoke stateful execution logic and return dynamic JSON payloads.",
      "B. Implement it as an MCP Resource (URI file:///docs/architecture.md) because static, read-only reference documents represent passive data that the LLM reads on demand without needing executable function definitions in tools/list.",
      "C. Implement it as an MCP Prompt because large single documents must be injected into the system prompt context during client initialization.",
      "D. Implement it as an MCP Tool with stdio transport and an MCP Resource with SSE transport to provide fallback compatibility across local CLI and remote HTTP clients."
    ],
    "options": [
      "A. Triển khai dưới dạng MCP Tool (fetch_architecture_guide()) vì Tool cho phép các mô hình LLM gọi logic thực thi có trạng thái và trả về các payload JSON động.",
      "B. Triển khai dưới dạng MCP Resource (URI file:///docs/architecture.md) vì các tài liệu tham chiếu tĩnh, chỉ đọc đại diện cho dữ liệu bị động mà LLM đọc khi cần mà không cần khai báo định nghĩa hàm thực thi trong tools/list.",
      "C. Triển khai dưới dạng MCP Prompt vì các tài liệu đơn có dung lượng lớn bắt buộc phải được chèn vào context của system prompt khi khởi tạo client.",
      "D. Triển khai dưới dạng cả MCP Tool với stdio transport và MCP Resource với SSE transport để đảm bảo khả năng tương thích dự phòng giữa CLI cục bộ và client HTTP từ xa."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because MCP Tools are designed for executable actions that perform operations or accept dynamic arguments, whereas a static read-only document requires no parameter input or execution logic.",
      "Option B is correct because static reference documentation is passive readable data, which maps directly to MCP Resources. This allows the client/LLM to read the document content via resource URIs on demand without cluttering tools/list with function call definitions.",
      "Option C is incorrect because MCP Prompts are meant for reusable interactive prompt templates and workflows, not for serving passive static knowledge base files.",
      "Option D is incorrect because transport choice (stdio vs SSE) is orthogonal to capability declaration, and exposing duplicate definitions across capabilities introduces unnecessary configuration complexity."
    ],
    "rationale": "Static knowledge base documents are passive read-only data and must be implemented as MCP Resources. This adheres to MCP capability design rules (Tools for executable actions vs Resources for readable context data) and avoids adding unnecessary tool schemas to tools/list.",
    "explanation": "Phân tích chi tiết từng phương án cho bài toán chọn MCP Tool vs MCP Resource:\n- Phương án A (SAI): MCP Tools được thiết kế cho các hành động có thể thực thi (executable actions) hoặc nhận tham số đầu vào để thực hiện logic xử lý/thay đổi trạng thái. Một tài liệu tĩnh chỉ đọc không cần tham số hay logic thực thi nên việc dùng Tool là không đúng ngữ nghĩa thiết kế của MCP.\n- Phương án B (ĐÚNG): Dữ liệu tri thức tĩnh, chỉ đọc (passive reference data) hoàn toàn phù hợp với mô hình MCP Resource. Việc khai báo qua URI Resource cho phép LLM hoặc client đọc dữ liệu khi cần thông qua resources/read mà không phải chèn thêm các định nghĩa hàm thực thi không cần thiết vào tools/list.\n- Phương án C (SAI): MCP Prompts dùng để định nghĩa các mẫu câu lệnh tái sử dụng (prompt templates) nhằm hỗ trợ quy trình tương tác của người dùng, không phải cơ chế lưu trữ tài liệu tri thức tĩnh.\n- Phương án D (SAI): Việc chọn transport (stdio vs SSE) là độc lập với việc định nghĩa capability (Tool vs Resource). Việc nhân đôi thành cả Tool và Resource vừa gây ra dư thừa cấu hình vừa vi phạm nguyên tắc tách biệt ngữ nghĩa capability của MCP.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]