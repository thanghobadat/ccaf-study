[
  {
    "id": "d2-b05-B-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-007",
    "scenarioSignature": {
      "testedPrinciple": "multi-tenant data isolation in MCP servers",
      "failureMode": "unauthorized cross-project resource access during tool execution",
      "rootCause": "tool handler executes queries without tenant session scoping or project identification",
      "requiredFix": "bind tenant context to request credentials and enforce project-scoped data queries"
    },
    "questionEN": "A centralized Model Context Protocol (MCP) server enterprise-data-mcp is deployed to serve 10 distinct software development projects. When a developer working on Project A executes the tool call fetch_project_document(doc_id: \"DOC-8841\"), the tool handler retrieves the document using a shared, global database connection without evaluating project-level authorization or tenant context. Consequently, developers in Project A can query and view restricted design documents belonging to Project B. What is the correct architectural fix to ensure strict tenant isolation?",
    "question": "[d2-b05-B-007] Một MCP server trung tâm enterprise-data-mcp được triển khai để phục vụ 10 dự án phát triển phần mềm khác nhau. Khi lập trình viên làm việc trên Dự án A thực thi tool call fetch_project_document(doc_id: \"DOC-8841\"), tool handler truy vấn tài liệu bằng một kết nối database toàn cục dùng chung mà không đánh giá ngữ cảnh tenant hoặc quyền hạn cấp dự án. Kết quả là lập trình viên ở Dự án A có thể truy vấn và xem các tài liệu thiết kế bảo mật thuộc về Dự án B. Đâu là giải pháp kiến trúc đúng để đảm bảo cô lập dữ liệu (tenant isolation) nghiêm ngặt?",
    "optionsEN": [
      "A. Configure separate mcp.json files in each project repository to specify distinct HTTP port numbers while sharing the backend server process.",
      "B. Convert the fetch_project_document tool into a static MCP Resource using the URI template document://{doc_id} to delegate access control to the client.",
      "C. Pass tenant authentication tokens in the tool request context and modify the MCP server handlers to scope all database queries strictly by project identity.",
      "D. Increase the standard MCP request timeout from 30 seconds to 120 seconds inside .claude/mcp.json to prevent concurrent cross-tenant race conditions."
    ],
    "options": [
      "A. Cấu hình các file mcp.json riêng biệt trong từng repository dự án để chỉ định các cổng HTTP khác nhau trong khi vẫn chia sẻ server process phía backend.",
      "B. Chuyển đổi tool fetch_project_document thành một MCP Resource tĩnh sử dụng URI template document://{doc_id} để ủy quyền kiểm soát truy cập cho phía client.",
      "C. Truyền token xác thực tenant trong request context của tool và chỉnh sửa handler của MCP server để rà soát mọi truy vấn database nghiêm ngặt theo danh tính dự án.",
      "D. Tăng thời gian chờ (timeout) mặc định của MCP request từ 30 giây lên 120 giây trong file .claude/mcp.json để tránh race condition giữa các tenant."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Changing HTTP port configurations in client-side mcp.json files does not establish backend tenant authorization boundaries or prevent cross-project data leaks in a shared MCP server process.",
      "Option B is incorrect: Converting a Tool to an MCP Resource with a URI scheme does not enforce authorization or data isolation, as resource URIs can still be fetched directly if the server lacks backend access control.",
      "Option C is correct: Multi-tenant MCP servers must validate tenant identity from authenticated session headers or request context and scope all database operations by tenant ID to enforce strict data isolation.",
      "Option D is incorrect: Increasing the MCP call timeout parameter in .claude/mcp.json addresses request duration limits but has no effect on tenant security or authorization logic."
    ],
    "rationale": "In a multi-tenant MCP architecture where a single server handles requests from multiple projects, security isolation requires backend authorization checks. The MCP server must extract tenant context (such as project IDs or authorization tokens) passed during request execution and enforce project-scoped data access (e.g., filtering database queries by project identity). Client configurations or transport port tweaks cannot substitute for server-side access control.",
    "explanation": "Trong kiến trúc MCP multi-tenant (một MCP server phục vụ nhiều dự án), việc bảo mật và cô lập dữ liệu (tenant isolation) bắt buộc phải được xử lý ở phía server backend:\n- Option C đúng vì MCP server phải tiếp nhận thông tin xác thực/ngữ cảnh dự án (tenant context) từ request và thực thi các câu lệnh truy vấn dữ liệu được ràng buộc chặt chẽ theo project_id (project-scoped queries).\n- Option A sai vì thay đổi cổng kết nối ở client trong file mcp.json không giải quyết được bài toán phân quyền dữ liệu bên trong logic xử lý của backend MCP server.\n- Option B sai vì chuyển đổi sang MCP Resource với URI template không tự động tạo ra cơ chế authorization hay ngăn chặn việc truy cập dữ liệu chéo giữa các project.\n- Option D sai vì tăng timeout chỉ xử lý vấn đề thời gian phản hồi của request, hoàn toàn không có hiệu lực đối với việc cô lập dữ liệu tenant.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-008",
    "scenarioSignature": {
      "testedPrinciple": "MCP tool interface versioning and schema compatibility",
      "failureMode": "silent tool execution failures after server upgrade due to breaking parameter changes",
      "rootCause": "MCP server upgraded tool parameter signatures without updating client invocation payload schema or maintaining backward compatibility",
      "requiredFix": "update client tool call parameters to match the upgraded JSON schema or implement a legacy parameter adapter"
    },
    "questionEN": "An engineering team upgrades their internal Issue Tracking MCP server from version v1.2.0 to v2.0.0. In v2.0.0, the get_issues tool replaces the deprecated parameter issue_id: string with a required parameter issue_key: string. Following the server deployment, developers notice that tool calls to get_issues fail silently or return schema validation errors because the client configurations and prompt instructions still emit issue_id. How should this interface incompatibility be resolved?",
    "question": "[d2-b05-B-008] Một đội ngũ kỹ thuật nâng cấp MCP server theo dõi sự cố (Issue Tracking) từ phiên bản v1.2.0 lên v2.0.0. Trong phiên bản v2.0.0, tool get_issues thay thế tham số cũ issue_id: string bằng tham số bắt buộc mới issue_key: string. Sau khi triển khai server, các lập trình viên nhận thấy các lệnh gọi tool get_issues thất bại trong im lặng hoặc báo lỗi kiểm định schema vì cấu hình client và câu lệnh hướng dẫn vẫn truyền issue_id. Bất đồng giao diện này nên được xử lý như thế nào?",
    "optionsEN": [
      "A. Change the transport configuration in mcp.json from stdio to SSE to automatically transform legacy JSON parameter keys.",
      "B. Add the --ignore-schema-errors CLI flag to the server execution arguments in mcp.json to bypass argument verification.",
      "C. Register a secondary MCP server entry in mcp.json under a different name to force automatic parameter alias translation.",
      "D. Update the client tool invocation schema to pass issue_key according to the v2.0.0 specification, or add a backward-compatibility translation layer inside the MCP server."
    ],
    "options": [
      "A. Thay đổi cấu hình transport trong mcp.json từ stdio sang SSE để tự động chuyển đổi các khóa tham số JSON cũ.",
      "B. Thêm cờ lệnh --ignore-schema-errors vào danh sách đối số khởi chạy server trong mcp.json để bỏ qua bước kiểm tra tham số.",
      "C. Đăng ký một mảng MCP server thứ hai trong mcp.json với một tên khác để ép buộc cơ chế tự động dịch bí danh tham số.",
      "D. Cập nhật schema gọi tool phía client để truyền issue_key theo đúng đặc tả của phiên bản v2.0.0, hoặc thêm một lớp adapter tương thích ngược bên trong MCP server."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Switching transport layer protocol from stdio to SSE does not modify or translate JSON Schema parameter validation logic.",
      "Option B is incorrect: Adding non-existent CLI flags like --ignore-schema-errors will not resolve signature mismatches and would risk passing invalid arguments to the tool backend.",
      "Option C is incorrect: Registering duplicate MCP server entries under different names does not perform automatic parameter schema translation or alias mapping.",
      "Option D is correct: When an MCP server tool signature undergoes breaking changes, clients must update their call signatures to match the new JSON Schema, or the server must maintain a compatibility layer mapping legacy parameters."
    ],
    "rationale": "When an MCP server updates its tool schema (such as renaming or making parameters required in major version upgrades like v1.2 to v2.0), client invocations failing JSON Schema validation will fail. To fix breaking API changes in MCP tools, either client call patterns must be updated to conform to the new JSON schema (issue_key), or the MCP server handler must implement backward-compatible parameter mapping (accepting issue_id as an alias and mapping it to issue_key).",
    "explanation": "Khi một MCP server thực hiện nâng cấp phiên bản lớn (major version release) có những thay đổi phá vỡ giao diện (breaking API changes) trong chữ ký của Tool (tool signature):\n- Option D đúng vì cách xử lý chuẩn đối với breaking schema changes là cập nhật phía client truyền đúng tham số theo JSON Schema mới (issue_key), hoặc viết thêm lớp adapter tương thích ngược (backward compatibility) ở server để hỗ trợ tham số cũ issue_id.\n- Option A sai vì việc chuyển đổi giao thức truyền tải (transport layer) từ stdio sang SSE không thay đổi hay chuyển đổi các thuộc tính trong JSON Schema payload.\n- Option B sai vì cờ --ignore-schema-errors không tồn tại và việc bỏ qua kiểm định schema sẽ khiến backend nhận tham số không hợp lệ và gây lỗi runtime.\n- Option C sai vì việc khai báo lại MCP server với tên khác trong mcp.json không có chức năng tự động ánh xạ hay dịch tham số giữa hai phiên bản.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]