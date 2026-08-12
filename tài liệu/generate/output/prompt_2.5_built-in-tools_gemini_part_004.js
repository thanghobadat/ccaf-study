[
  {
    "id": "d2-b05-2.5-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-007",
    "questionEN": "An AI developer agent task requires updating an internal microservice authentication module. The agent invokes WebSearch with the query \"internal OAuth2 token exchange protocol specification v2 site: company.internal\" to locate internal architectural documentation. The search call returns external marketing pages, irrelevant public forum posts, and generic OAuth tutorials, resulting in hallucinated local API signatures and invalid function calls. Which root cause and remediation strategy correctly addresses this tool invocation failure?",
    "question": "[d2-b05-2.5-007] Một tác vụ của agent AI cần cập nhật một module xác thực microservice nội bộ. Agent thực thi công cụ WebSearch với câu truy vấn \"internal OAuth2 token exchange protocol specification v2 site: company.internal\" để tìm tài liệu kiến trúc nội bộ. Trả về từ tìm kiếm chứa các trang marketing bên ngoài, bài viết diễn đàn công cộng không liên quan và bài hướng dẫn OAuth chung, dẫn đến việc agent tự tạo các API signature nội bộ không chính xác và gọi hàm thất bại. Nguyên nhân gốc rễ và chiến lược khắc phục nào sau đây giải quyết đúng sự cố gọi công cụ này?",
    "optionsEN": [
      "A. WebSearch failed because the query lacked public domain filtering flags like filetype:pdf; adding search API credentials to the agent environment enables indexing of private corporate subdomains.",
      "B. The agent should execute a Bash command running curl -s https://internal.wiki/auth-spec to fetch internal documentation over HTTP, bypassing WebSearch indexing limitations.",
      "C. The agent incorrectly selected an external web search tool for internal repository documentation; internal architecture specifications must be located directly using Glob or Grep on codebase files.",
      "D. The system prompt must instruct the agent to run WebSearch with a higher sampling temperature and retry up to five times when corporate intranet pages are missing from search engine indexes."
    ],
    "options": [
      "A. WebSearch thất bại vì câu truy vấn thiếu cờ lọc tên miền công cộng như filetype:pdf; việc thêm API key tìm kiếm vào môi trường agent sẽ cho phép đánh chỉ mục các subdomain nội bộ riêng tư.",
      "B. Agent nên thực thi lệnh Bash chạy curl -s https://internal.wiki/auth-spec để lấy tài liệu nội bộ qua HTTP, bỏ qua các giới hạn đánh chỉ mục của WebSearch.",
      "C. Agent đã chọn sai công cụ tìm kiếm web bên ngoài cho tài liệu nằm trong repository nội bộ; các đặc tả kiến trúc nội bộ phải được tìm trực tiếp bằng Glob hoặc Grep trên các file mã nguồn.",
      "D. System prompt phải hướng dẫn agent chạy WebSearch với nhiệt độ lấy mẫu (temperature) cao hơn và thử lại tối đa 5 lần khi các trang intranet doanh nghiệp bị thiếu trong chỉ mục của máy tìm kiếm."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: WebSearch queries public search engine indexes which cannot access or index private corporate intranet repositories; adding domain flags or API keys to WebSearch will not expose non-public codebase files.",
      "Option B is incorrect: Executing raw HTTP requests via Bash to unverified internal endpoints introduces security risks and fragility when authoritative documentation already exists as markdown files within the local repository.",
      "Option C is correct: WebSearch is designed for external, public information. Internal repository documentation and architecture specs reside directly within the local codebase directory and should be searched using built-in Glob or Grep tools.",
      "Option D is incorrect: Modifying LLM sampling temperature or retrying WebSearch queries cannot force public web search engines to retrieve unindexed, private internal codebase documentation."
    ],
    "rationale": "WebSearch is intended for external, real-time public web information. Internal repository documentation and architecture specs reside within the local codebase directory and must be discovered using Glob or Grep rather than querying external web search engines.",
    "explanation": "Lựa chọn C là đáp án chính xác vì WebSearch là công cụ được thiết kế để tìm kiếm thông tin công cộng bên ngoài trên internet. Các tài liệu kiến trúc nội bộ, hướng dẫn kỹ thuật và mã nguồn thuộc về dự án hiện tại đều nằm trực tiếp trong repository địa phương. Việc sử dụng WebSearch cho tài liệu nội bộ dẫn đến kết quả trả về không liên quan và làm agent sinh ra thông tin ảo (hallucination). Cách khắc phục đúng là yêu cầu agent sử dụng các công cụ tích hợp sẵn như Glob hoặc Grep để tìm kiếm trực tiếp các file tài liệu (ví dụ: docs//*.md) trong codebase.\\n\\n- Lựa chọn A sai vì công cụ tìm kiếm web công cộng không thể truy cập hoặc đánh chỉ mục các tài liệu nằm trong mạng intranet riêng tư hoặc repo nội bộ.\\n- Lựa chọn B sai vì việc chạy lệnh Bash curl để tải tài liệu qua HTTP là không cần thiết và tiềm ẩn rủi ro khi tài liệu đã có sẵn dưới dạng file địa phương trong repository.\\n- Lựa chọn D sai vì thay đổi temperature hay retry không thể giúp máy tìm kiếm web hiển thị các dữ liệu riêng tư không được đánh chỉ mục.",
    "scenarioSignature": {
      "testedPrinciple": "local file retrieval over external web search for repository documentation",
      "failureMode": "agent invoking WebSearch for internal repository architecture documentation",
      "rootCause": "misdirected tool selection using external web search instead of built-in Grep or Glob on local codebase",
      "requiredFix": "restricted tool scope to Glob and Grep for repository docs search"
    },
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  },
  {
    "id": "d2-b05-2.5-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-008",
    "questionEN": "An agent running inside a large Node.js enterprise monorepo executes the built-in Glob tool with pattern \" /.js\" to locate legacy service entry points. Because the repository contains nested node_modules directories across forty packages, the tool call returns over 50,000 file paths, exhausting context token limits and causing the tool response payload to truncate. Which root cause and remediation strategy correctly addresses this performance failure?",
    "question": "[d2-b05-2.5-008] Một agent chạy trong monorepo doanh nghiệp Node.js lớn thực thi công cụ Glob tích hợp sẵn với mẫu (pattern) \" ** /.js\" để định vị các file điểm vào của dịch vụ cũ. Do repository chứa các thư mục node_modules lồng nhau trên 40 package, cuộc gọi công cụ trả về hơn 50.000 đường dẫn file, làm cạn kiệt giới hạn token ngữ cảnh và khiến payload phản hồi của công cụ bị cắt ngắn (truncate). Nguyên nhân gốc rễ và chiến lược khắc phục nào sau đây giải quyết đúng sự cố hiệu năng này?",
    "optionsEN": [
      "A. Glob failed because JavaScript files require content-based searching; replacing Glob with Grep using pattern \".js\" across the filesystem correctly limits results to source code.",
      "B. Glob tool execution timed out because wildcards cannot scan nested subdirectories; running a recursive Bash command find . -name \".js\" must be used for monorepo file discovery.",
      "C. The monorepo directory layout is invalid; all node_modules folders must be temporarily deleted from disk prior to agent initialization so that recursive \"/*.js\" queries can succeed.",
      "D. The Glob pattern \"/.js\" recursively traversed third-party dependencies in node_modules; the pattern must be scoped to source directories like \"src/**/.js\" or include dependency exclusion patterns."
    ],
    "options": [
      "A. Glob thất bại vì các file JavaScript yêu cầu tìm kiếm dựa trên nội dung; thay thế Glob bằng Grep với mẫu \".js\" trên toàn bộ hệ thống file sẽ giới hạn kết quả về mã nguồn một cách chính xác.",
      "B. Công cụ Glob bị quá hạn thời gian vì các ký tự đại diện không thể quét thư mục con lồng nhau; phải dùng lệnh Bash đệ quy find . -name \".js\" để khám phá file trong monorepo.",
      "C. Cấu trúc thư mục monorepo không hợp lệ; tất cả các thư mục node_modules phải bị xóa tạm thời khỏi đĩa trước khi khởi tạo agent để các câu truy vấn đệ quy \"/*.js\" thành công.",
      "D. Mẫu Glob \"/.js\" đã duyệt đệ quy qua các thư viện phụ thuộc của bên thứ ba trong node_modules; mẫu tìm kiếm phải được giới hạn vào các thư mục mã nguồn như \"src/**/.js\" hoặc bao gồm các mẫu loại trừ phụ thuộc."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Grep searches text content inside files rather than file path patterns; running Grep across all files would still inspect node_modules content and exacerbate performance degradation.",
      "Option B is incorrect: Built-in Glob supports recursive directory wildcard matching; substituting Bash find does not prevent traversing node_modules unless explicit exclusion flags are added, while introducing portability and safety risks.",
      "Option C is incorrect: Deleting node_modules breaks package dependencies and application build capability, representing an unacceptable destructive workaround instead of fixing the tool search pattern.",
      "Option D is correct: Unbounded recursive pattern /*.js matches every JavaScript file inside third-party dependency trees (node_modules), generating tens of thousands of irrelevant paths. Scoping the pattern to src//.js or adding ignore rules prevents payload bloat."
    ],
    "rationale": "Recursive globbing with **/.js traverses all subdirectories including node_modules, returning tens of thousands of third- party dependency files.Scoping Glob patterns to project source directories(e.g., src//*.js) or configuring ignore rules prevents tool payload bloat and token exhaustion.",
    "explanation": "Lựa chọn D là đáp án chính xác vì mẫu Glob đệ quy không giới hạn \"/.js\" sẽ quét qua tất cả các thư mục con, bao gồm toàn bộ các gói phụ thuộc bên thứ ba trong node_modules. Trong một monorepo lớn, điều này làm quét hàng chục nghìn file không liên quan, làm quá tải ngữ cảnh (context window) và dẫn đến phản hồi bị cắt đứt. Việc giới hạn đường dẫn tìm kiếm vào thư mục mã nguồn cụ thể như \"src/**/.js\" hoặc cấu hình các mẫu loại trừ (exclude pattern như \"!/node_modules/\") là giải pháp chuẩn xác.\\n\\n- Lựa chọn A sai vì Grep dùng để tìm kiếm nội dung văn bản bên trong file chứ không phải tìm đường dẫn file; chạy Grep quét nội dung node_modules càng làm tăng tải hệ thống.\\n- Lựa chọn B sai vì Glob hỗ trợ tốt việc duyệt đệ quy; dùng lệnh Bash find mà không loại trừ node_modules vẫn gặp lại đúng sự cố đó và làm giảm tính an toàn/di động.\\n- Lựa chọn C sai vì xóa node_modules làm hỏng môi trường chạy/build của dự án, là một giải pháp phá hoại không hợp lý.",
    "scenarioSignature": {
      "testedPrinciple": "scoped pattern matching for built-in Glob execution",
      "failureMode": "tool execution payload truncation and context window exhaustion from excessive returned file paths",
      "rootCause": "unbounded recursive wildcard matching node_modules directory",
      "requiredFix": "adding directory exclusion patterns or specific subdirectory targets in Glob pattern"
    },
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  }
]