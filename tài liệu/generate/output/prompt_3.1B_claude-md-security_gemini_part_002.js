[
  {
    "id": "d3-b06-B-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-003",
    "questionEN": "An engineering team uses an OpenAPI code generator that outputs TypeScript API client files into /generated/api_client/ based on OpenAPI specs in /schemas/. During a feature refactoring request, Claude Code directly modifies several files inside /generated/api_client/ to fix type mismatches instead of editing the source templates in /schemas/. The team's CI build subsequently overwrites Claude's modifications during the pre-build code generation step. Which configuration change prevents Claude Code from targeting or editing files in the generated directory?",
    "question": "[d3-b06-B-003] Một đội ngũ phát triển sử dụng công cụ sinh mã OpenAPI để xuất các tệp TypeScript API client vào thư mục /generated/api_client/ dựa trên các lược đồ OpenAPI trong /schemas/. Khi nhận yêu cầu tái cấu trúc tính năng, Claude Code đã sửa đổi trực tiếp các tệp bên trong /generated/api_client/ để sửa lỗi bất đồng kiểu thay vì chỉnh sửa tệp nguồn trong /schemas/. Tiến trình CI sau đó đã ghi đè toàn bộ thay đổi của Claude trong bước tự động sinh mã. Thay đổi cấu hình nào sẽ ngăn Claude Code can thiệp hoặc chỉnh sửa các tệp trong thư mục sinh tự động?",
    "optionsEN": [
      "A. Add a rule in CLAUDE.md stating [rules for \"generated / \"] ignore = true to instruct the model to skip modifications.",
      "B. Define allowedTools: [\"Edit\"] inside /generated/CLAUDE.md to restrict edit permissions strictly to source schemas.",
      "C. Add /generated/api_client/ to .claudeignore at the repository root so the generated files are excluded from Claude Code's file context and tools.",
      "D. Configure READONLY=true in /generated/api_client/CLAUDE.md so Claude Code treats the directory as read-only."
    ],
    "options": [
      "A. Thêm quy tắc vào CLAUDE.md với nội dung [rules for \"generated / \"] ignore = true để yêu cầu mô hình bỏ qua các tệp này.",
      "B. Khai báo allowedTools: [\"Edit\"] bên trong /generated/CLAUDE.md để giới hạn quyền chỉnh sửa chỉ áp dụng cho tệp nguồn schema.",
      "C. Thêm /generated/api_client/ vào tệp .claudeignore ở gốc kho chứa để loại bỏ các tệp sinh tự động khỏi ngữ cảnh và công cụ của Claude Code.",
      "D. Cấu hình READONLY=true trong /generated/api_client/CLAUDE.md để Claude Code coi thư mục này là chỉ đọc."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because CLAUDE.md glob headers do not support an ignore = true directive to exclude files from tool access or indexing.",
      "Option B is incorrect because allowedTools controls tool invocation permissions, not file visibility, and placing it in a target subdirectory does not redirect Claude Code to source templates.",
      "Option C is correct because adding /generated/api_client/ to .claudeignore completely removes those files from Claude Code's visibility and tool capabilities, forcing it to inspect and modify the source templates in /schemas/.",
      "Option D is incorrect because READONLY=true is an invalid CLAUDE.md configuration property and does not prevent Claude Code from reading or modifying files."
    ],
    "rationale": ".claudeignore uses .gitignore glob syntax to completely remove matched files and directories from Claude Code's file tree and tool access. Adding /generated/api_client/ ensures Claude Code cannot view or edit generated artifacts, directing it to work on source templates instead.",
    "explanation": "Tệp .claudeignore hoạt động tương tự .gitignore, có tác dụng ẩn hoàn toàn các thư mục hoặc tệp được chỉ định khỏi tầm nhìn và các công cụ (như View, Edit, Grep) của Claude Code. Khi đưa /generated/api_client/ vào .claudeignore, Claude Code sẽ không thể đọc hoặc chỉnh sửa các tệp mã được sinh tự động, buộc nó phải thao tác trên các tệp nguồn schema trong /schemas/.\\n\\n- Option A sai vì CLAUDE.md không hỗ trợ cú pháp ignore = true để ẩn tệp khỏi công cụ.\\n- Option B sai vì allowedTools chỉ quản lý danh sách công cụ được phép dùng, không ẩn tệp hay chuyển hướng thao tác sang thư mục khác.\\n- Option C đúng vì .claudeignore ẩn triệt để các tệp sinh ra tự động khỏi ngữ cảnh mô hình.\\n- Option D sai vì READONLY=true không phải là thuộc tính cấu hình hợp lệ trong CLAUDE.md.",
    "scenarioSignature": {
      "testedPrinciple": ".claudeignore file exclusion for auto-generated code directories",
      "failureMode": "direct modification of generated artifacts instead of source templates",
      "rootCause": "missing generated output paths in .claudeignore allowing file mutation",
      "requiredFix": "add generated artifact directory patterns to .claudeignore"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-004",
    "scenarioSignature": {
      "testedPrinciple": ".claudeignore file masking for high-volume dependency trees",
      "failureMode": "context window saturation from scanning external dependency directories",
      "rootCause": "absence of node_modules exclusion pattern in repository .claudeignore",
      "requiredFix": "add node_modules pattern to root .claudeignore to restrict file indexing"
    },
    "questionEN": "During an automated codebase search on a Node.js project, Claude Code attempts to locate a custom authentication middleware. Because node_modules is listed in .gitignore but missing from .claudeignore, Claude Code indexes over 40,000 third-party dependency files, resulting in context window saturation and severe performance degradation. What is the root cause of this behavior and how should it be resolved?",
    "question": "[d3-b06-B-004] Trong quá trình tìm kiếm mã nguồn tự động trên một dự án Node.js, Claude Code cố gắng định vị một middleware xác thực tùy chỉnh. Do thư mục node_modules có tên trong .gitignore nhưng lại thiếu trong .claudeignore, Claude Code đã quét hơn 40.000 tệp thư viện bên thứ ba, dẫn đến quá tải cửa sổ ngữ cảnh (context explosion) và suy giảm hiệu năng nghiêm trọng. Nguyên nhân gốc rễ của hiện tượng này là gì và cần xử lý như thế nào?",
    "optionsEN": [
      "A. .gitignore rules automatically apply to Claude Code, but subdirectories require explicit glob patterns in CLAUDE.md to prevent multi-file indexing.",
      "B. Claude Code ignores .claudeignore when executing search tools unless the max_files parameter is set in the global ~/.claude.json file.",
      "C. node_modules should be set as indexing: false inside the root CLAUDE.md file under the [memory] block to bypass dependency parsing.",
      "D. .claudeignore operates independently of .gitignore; without node_modules/ explicitly listed in .claudeignore, Claude Code treats dependency files as part of the project context."
    ],
    "options": [
      "A. Các quy tắc trong .gitignore tự động áp dụng cho Claude Code, nhưng các thư mục con đòi hỏi quy tắc glob cụ thể trong CLAUDE.md để ngăn quét nhiều tệp.",
      "B. Claude Code bỏ qua .claudeignore khi chạy công cụ tìm kiếm trừ khi tham số max_files được thiết lập trong tệp toàn cục ~/.claude.json.",
      "C. Thư mục node_modules cần được khai báo indexing: false bên trong CLAUDE.md gốc bên dưới mục [memory] để bỏ qua phân tích thư viện.",
      "D. .claudeignore hoạt động độc lập với .gitignore; nếu không liệt kê node_modules/ trong .claudeignore, Claude Code sẽ coi các tệp thư viện là một phần ngữ cảnh dự án."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because .claudeignore is the dedicated configuration mechanism for hiding files from Claude Code, independent of .gitignore auto-inheritance or CLAUDE.md globs.",
      "Option B is incorrect because Claude Code's file discovery tools strictly honor .claudeignore, and max_files in ~/.claude.json is not a valid constraint mechanism for file indexing.",
      "Option C is incorrect because CLAUDE.md does not support an indexing: false property or [memory] block for file exclusion.",
      "Option D is correct because Claude Code checks .claudeignore to determine file visibility; missing node_modules/ allows Claude Code to crawl thousands of dependency files, requiring explicit addition of node_modules/ to .claudeignore."
    ],
    "rationale": ".claudeignore determines which files are visible to Claude Code tools and context indexing. If dependencies like node_modules/ are omitted from .claudeignore, Claude Code traverses all third-party files, flooding the context window. Adding node_modules/ to .claudeignore excludes these files entirely.",
    "explanation": "Claude Code duy trì cơ chế ẩn tệp riêng biệt thông qua .claudeignore. Nếu thư mục nặng như node_modules/ không được thêm vào .claudeignore, Claude Code sẽ đọc và quét toàn bộ hàng chục ngàn tệp phụ thuộc bên thứ ba vào cửa sổ ngữ cảnh, gây ra hiện tượng tràn ngữ cảnh (context explosion). Giải pháp triệt để là thêm node_modules/ vào tệp .claudeignore.\n\n- Option A sai vì .gitignore không tự động thay thế cho các cấu hình ẩn tệp của Claude Code nếu không khai báo trong .claudeignore.\n- Option B sai vì công cụ tìm kiếm luôn tuân thủ .claudeignore và không có tham số max_files trong ~/.claude.json.\n- Option C sai vì CLAUDE.md không hỗ trợ cú pháp indexing: false hay phần [memory] để loại trừ tệp.\n- Option D đúng vì giải thích chính xác nguyên nhân độc lập của .claudeignore và cách khắc phục.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]