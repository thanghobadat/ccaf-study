[
  {
    "id": "d2-b05-new-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-007",
    "scenarioSignature": {
      "testedPrinciple": "MCP Prompts capability for standardized parameterized client workflows",
      "failureMode": "prompt version drift and fragmented audit logic across client interfaces",
      "rootCause": "copy-pasting static prompt templates instead of using centralized client-agnostic prompt definitions",
      "requiredFix": "expose audit workflow template via MCP Prompts server capability with parameter definitions"
    },
    "questionEN": "An enterprise security platform compliance-guard maintains a standardized SOC 2 compliance audit workflow prompt (audit_soc2_compliance) requiring dynamic parameters compliance_framework and target_scope. The security team needs this prompt accessible across developer tools, including VS Code extensions, Claude Code CLI sessions, and an internal React-based management portal. Currently, teams copy-paste markdown templates, causing prompt version drift and inconsistent severity filtering. How should the architecture expose this workflow to guarantee centralized updates and client-agnostic parameter handling?",
    "question": "[d2-b05-new-007] Một nền tảng an ninh doanh nghiệp compliance-guard bảo trì một prompt quy trình kiểm toán tuân thủ SOC 2 chuẩn hóa (audit_soc2_compliance) yêu cầu các tham số động compliance_framework và target_scope. Đội ngũ an ninh cần prompt này có thể truy cập trên nhiều công cụ lập trình viên, bao gồm tiện ích mở rộng VS Code, phiên Claude Code CLI và cổng quản lý nội bộ dựa trên React. Hiện tại, các đội ngũ sao chép-dán các mẫu markdown, gây ra hiện tượng sai lệch phiên bản prompt và lọc mức độ nghiêm trọng không nhất quán. Kiến trúc nên hiển thị quy trình này như thế nào để đảm bảo cập nhật tập trung và xử lý tham số độc lập với client?",
    "optionsEN": [
      "A. Register audit_soc2_compliance as an MCP Tool execute_soc2_audit that executes the audit backend logic and returns a static JSON compliance report.",
      "B. Expose the audit prompt as an MCP Resource URI resource://audit/soc2-template.md for clients to fetch raw text content via resources/read.",
      "C. Expose the audit workflow via MCP Prompts capability (prompts/list and prompts/get) with structured argument schemas for dynamic client injection.",
      "D. Define the audit workflow inside .claude/mcp.json under an extra_prompts configuration array to inject it into client memory on startup."
    ],
    "options": [
      "A. Đăng ký audit_soc2_compliance dưới dạng một MCP Tool execute_soc2_audit để thực thi logic kiểm toán phía backend và trả về báo cáo tuân thủ JSON tĩnh.",
      "B. Hiển thị prompt kiểm toán dưới dạng một MCP Resource URI resource://audit/soc2-template.md để các client lấy nội dung văn bản thô qua resources/read.",
      "C. Hiển thị quy trình kiểm toán qua khả năng MCP Prompts (prompts/list và prompts/get) với schema đối số có cấu trúc để client chèn động.",
      "D. Định nghĩa quy trình kiểm toán bên trong .claude/mcp.json thuộc mảng cấu hình extra_prompts để chèn vào bộ nhớ client khi khởi động."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Registering an MCP Tool executes backend code autonomously, hiding the prompt template from the LLM and preventing user customization or interactive refinement before submission.",
      "Option B is incorrect: Exposing an MCP Resource (resources/read) returns raw unparsed document text without declaring structured argument schemas (compliance_framework, target_scope) for parameter auto-completion.",
      "Option C is correct: MCP Prompts (prompts/list and prompts/get) allow servers to serve standardized, versioned prompt templates with explicit parameter definitions that any MCP-compliant client (VS Code, CLI, web client) can discover, populate, and inject into context.",
      "Option D is incorrect: mcp.json is a client-side configuration file for declaring executable server transport settings (command, args, env); it does not support an extra_prompts schema array for prompt registration."
    ],
    "rationale": "MCP Prompts are specifically designed to expose reusable, parameterized prompt templates from an MCP server to any supported client interface via standardized prompts/list and prompts/get protocol endpoints.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A sai: Đăng ký dưới dạng MCP Tool (execute_soc2_audit) sẽ thực thi logic mã phía backend một cách tự động thay vì trả về một mẫu prompt có thể tùy chỉnh cho LLM và người dùng xem xét trước khi thực thi.\n- Option B sai: Sử dụng MCP Resource (resources/read) chỉ trả về văn bản tài liệu thô. Khả năng này không hỗ trợ khai báo schema đối số có cấu trúc (compliance_framework, target_scope) để client tự động gợi ý và truyền tham số.\n- Option C chính xác: MCP Prompts (thông qua protocol prompts/list và prompts/get) cung cấp cơ chế chuẩn hóa để server phân phối các prompt mẫu được đánh phiên bản tập trung kèm khai báo tham số. Mọi client tương thích MCP (VS Code, Claude CLI, web portal) đều có thể truy vấn, điền tham số và chèn vào ngữ cảnh LLM một cách đồng nhất.\n- Option D sai: File .claude/mcp.json là file cấu hình phía client dùng để khai báo cách khởi chạy MCP server (command, args, env, transport), hoàn toàn không hỗ trợ thuộc tính extra_prompts để đăng ký prompt.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-new-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-new-008",
    "scenarioSignature": {
      "testedPrinciple": "MCP Prompts capability versus static repository instruction files",
      "failureMode": "outdated review guidelines across repositories and inability to pass runtime review parameters",
      "rootCause": "relying on static repository-bound CLAUDE.md files rather than central parameterized MCP Prompts",
      "requiredFix": "migrate standardized code review templates to central MCP Prompts server endpoints"
    },
    "questionEN": "A platform team standardizes automated code reviews across 50 microservices using GitHub Actions pipelines (claude-code CLI headless mode) and interactive IDE sessions. They currently store review instructions in repository-level static CLAUDE.md files. However, updating security rules requires committing changes to 50 repositories, and CLAUDE.md cannot accept runtime parameters such as pr_number or review_depth. Why should the team migrate these code review templates to an MCP server exposing MCP Prompts?",
    "question": "[d2-b05-new-008] Một đội ngũ platform chuẩn hóa quy trình kiểm tra mã tự động trên 50 dịch vụ microservice bằng GitHub Actions pipeline (claude-code CLI ở chế độ headless) và các phiên IDE tương tác. Hiện tại họ lưu hướng dẫn kiểm tra mã trong các file CLAUDE.md tĩnh ở cấp kho lưu trữ. Tuy nhiên, việc cập nhật quy tắc an ninh yêu cầu commit thay đổi vào 50 kho lưu trữ, và CLAUDE.md không thể nhận tham số runtime như pr_number hoặc review_depth. Tại sao đội ngũ nên chuyển đổi các mẫu kiểm tra mã này sang một MCP server hiển thị MCP Prompts?",
    "optionsEN": [
      "A. MCP Prompts automatically execute code refactoring directly on project files before LLM analysis, whereas CLAUDE.md provides passive text guidelines.",
      "B. Static CLAUDE.md files are strictly restricted to IDE sessions and cannot be loaded by claude-code CLI in headless CI/CD automation pipelines.",
      "C. MCP Prompts override client-side authorization controls to execute code review tools automatically without requiring human confirmation.",
      "D. MCP Prompts enable centralized, version-controlled template updates via server endpoints (prompts/get) with structured argument schemas, eliminating repo-level drift."
    ],
    "options": [
      "A. MCP Prompts tự động thực thi tái cấu trúc mã trực tiếp trên các file dự án trước khi LLM phân tích, trong khi CLAUDE.md chỉ cung cấp hướng dẫn văn bản thụ động.",
      "B. Các file CLAUDE.md tĩnh bị giới hạn nghiêm ngặt trong phiên IDE và không thể nạp bởi claude-code CLI trong pipeline tự động hóa CI/CD headless.",
      "C. MCP Prompts ghi đè các kiểm soát ủy quyền phía client để tự động thực thi các tool kiểm tra mã mà không cần xác nhận từ con người.",
      "D. MCP Prompts cho phép cập nhật mẫu kiểm tra mã tập trung, có quản lý phiên bản qua server endpoint (prompts/get) với schema đối số có cấu trúc, loại bỏ sai lệch giữa các repository."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: MCP Prompts do not directly execute file refactoring on disk; they generate parameterized prompt messages returned to the client LLM context.",
      "Option B is incorrect: CLAUDE.md is read by both interactive IDE clients and claude-code CLI in CI/CD pipelines; its limitation is repository-bound static content without runtime parameters.",
      "Option C is incorrect: MCP Prompts define prompt templates and do not alter or bypass tool approval safety policies or client-side permissions.",
      "Option D is correct: Unlike static repository-bound CLAUDE.md files that require individual repository commits and lack argument handling, MCP Prompts provide centralized server-managed templates accessible via prompts/get with parameterized argument schemas (pr_number, review_depth)."
    ],
    "rationale": "MCP Prompts offer centralized server-side template management and structured input parameter support, solving both the multi-repository maintenance drift and static context limitations of repository-level CLAUDE.md files.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A sai: MCP Prompts không tự động thực thi sửa đổi hay tái cấu trúc mã trên đĩa; chúng chỉ trả về các mẫu thông điệp prompt có tham số để chèn vào ngữ cảnh LLM.\n- Option B sai: CLAUDE.md được đọc bởi cả IDE và claude-code CLI trong CI/CD. Hạn chế của CLAUDE.md không nằm ở khả năng hỗ trợ CLI mà ở tính chất tĩnh, bị phân tán theo từng repo và thiếu hỗ trợ tham số động.\n- Option C sai: MCP Prompts không can thiệp hay ghi đè lên hệ thống phân quyền an toàn hoặc chính sách phê duyệt tool của client.\n- Option D chính xác: Khác với file CLAUDE.md bị gắn chặt vào từng kho lưu trữ (yêu cầu commit riêng lẻ 50 lần khi thay đổi quy tắc và không truyền được tham số runtime), MCP Prompts cho phép quản lý tập trung các mẫu prompt trên server qua endpoint prompts/get kèm theo schema tham số đầu vào có cấu trúc (pr_number, review_depth), giúp các pipeline CI/CD và IDE luôn áp dụng quy tắc kiểm tra mã mới nhất mà không gây sai lệch phiên bản.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]