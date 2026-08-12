[
  {
    "id": "d3-b06-3.3-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-005",
    "scenarioSignature": {
      "testedPrinciple": "CLAUDE.md glob section pattern specificity and scoping",
      "failureMode": "refusal to edit standard source code files during refactoring tasks",
      "rootCause": "overly broad glob pattern matching all typescript files instead of generated sub-pattern",
      "requiredFix": "narrow glob section pattern to explicitly match generated file naming conventions"
    },
    "questionEN": "A development team working on payment-service uses auto-generated GraphQL SDK files named with the suffix .generated.ts alongside regular business logic files (.ts). To prevent Claude Code from manually editing generated code, an engineer adds [rules for \"**/*.ts\"] with the instruction 'Do not edit directly; run npm run codegen instead' to CLAUDE.md. Consequently, Claude Code refuses to modify any hand-written TypeScript file in src/services/. Which change resolves this issue while preserving the generation rule?",
    "question": "[d3-b06-3.3-005] Đội ngũ phát triển dự án payment-service sử dụng các file GraphQL SDK tự động tạo có hậu tố .generated.ts song song với các file logic nghiệp vụ thông thường (.ts). Để ngăn Claude Code chỉnh sửa thủ công code tự động tạo, một kỹ sư đã thêm mục [rules for \"**/*.ts\"] kèm hướng dẫn 'Không chỉnh sửa trực tiếp; hãy chạy npm run codegen để tạo lại' vào CLAUDE.md. Kết quả là Claude Code từ chối sửa bất kỳ file TypeScript viết tay nào trong src/services/. Thay đổi nào giúp khắc phục sự cố này mà vẫn giữ nguyên quy tắc bảo vệ file tự động tạo?",
    "optionsEN": [
      "A. Change the Glob section header from [rules for \"**/*.ts\"] to [rules for \"**/*.generated.ts\"].",
      "B. Add .generated.ts entries into .claudeignore at the repository root.",
      "C. Add @import CLAUDE.generated.md inside src/graphql/CLAUDE.md.",
      "D. Replace the Glob section header with [rules for \"src/graphql/*\"]."
    ],
    "options": [
      "A. Thay đổi tiêu đề section Glob từ [rules for \"**/*.ts\"] thành [rules for \"**/*.generated.ts\"].",
      "B. Thêm các mục .generated.ts vào file .claudeignore tại thư mục gốc của repository.",
      "C. Thêm chỉ thị @import CLAUDE.generated.md vào bên trong src/graphql/CLAUDE.md.",
      "D. Thay thế tiêu đề section Glob bằng [rules for \"src/graphql/*\"]."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because **/*.ts is overly broad and matches all TypeScript source files, causing Claude to treat hand-written business logic as read-only generated code. Changing the glob to **/*.generated.ts precisely scopes the rule to auto-generated files.",
      "Option B is incorrect because adding generated files to .claudeignore completely hides them from Claude's view, preventing Claude from reading type definitions or inspecting generated artifacts during compilation analysis.",
      "Option C is incorrect because @import directives are used to include other rule files globally or locally, but do not solve the root cause of an over-broad glob pattern matching standard source files.",
      "Option D is incorrect because single star src/graphql/* only matches files directly in that top-level folder and does not match subdirectories, while still misapplying rules to hand-written files in that folder."
    ],
    "rationale": "Glob patterns in CLAUDE.md path-specific sections must be narrowly specified to avoid unintentionally applying behavioral restrictions (such as prohibiting edits) to standard application source files.",
    "explanation": "Đáp án đúng là A.\n- A đúng: Mẫu glob **/*.ts quá rộng nên khớp với toàn bộ các file TypeScript trong dự án (bao gồm cả file logic viết tay), khiến Claude áp dụng quy tắc cấm sửa cho tất cả file .ts. Đổi sang **/*.generated.ts sẽ giới hạn chính xác phạm vi áp dụng quy tắc cho các file được sinh tự động.\n- B sai: Thêm vào .claudeignore sẽ ẩn hoàn toàn file khỏi tầm nhìn của Claude, khiến Claude không thể đọc type definition hoặc kiểm tra mã được sinh ra khi phân tích dự án.\n- C sai: Chỉ thị @import được dùng để nạp thêm nội dung file cấu hình khác chứ không giải quyết triệt để lỗi khớp mẫu glob quá rộng.\n- D sai: Mẫu src/graphql/* chỉ khớp các file nằm trực tiếp trong thư mục src/graphql/ (không khớp thư mục con) và vẫn áp dụng nhầm quy tắc cho các file viết tay nằm ở thư mục đó.",
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  },
  {
    "id": "d3-b06-3.3-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-006",
    "scenarioSignature": {
      "testedPrinciple": "distinction between context visibility exclusion via claudeignore and behavior governance via claudemd glob rules",
      "failureMode": "unintended file exclusion preventing context analysis or accidental exposure of sensitive key files",
      "rootCause": "confusing file visibility exclusion mechanism with in-context behavioral modification guidelines",
      "requiredFix": "exclude credential paths in claudeignore and govern read-only library paths via claudemd glob sections"
    },
    "questionEN": "A team maintaining order-processing-api needs to configure Claude Code for two distinct sets of files: (1) High-security API credentials and private key files in config/keys/ must NEVER be read, indexed, or accessed by Claude Code under any circumstances; (2) External third-party library source code in vendor/ needs to be read and analyzed by Claude Code for API signatures and type checking, but Claude Code must NEVER modify or edit any files in vendor/. Which configuration strategy correctly satisfies both requirements?",
    "question": "[d3-b06-3.3-006] Một nhóm phát triển hệ thống order-processing-api cần cấu hình Claude Code cho hai nhóm file riêng biệt: (1) Các file chứa API credential và private key bảo mật cao trong config/keys/ tuyệt đối KHÔNG được để Claude Code đọc, đánh chỉ mục hoặc truy cập dưới bất kỳ hình thức nào; (2) Mã nguồn thư viện bên thứ ba trong vendor/ cần để Claude Code đọc và phân tích chữ ký hàm cũng như định kiểu (type check), nhưng Claude Code KHÔNG được phép sửa đổi bất kỳ file nào trong vendor/. Chiến lược cấu hình nào đúng chuẩn nhất?",
    "optionsEN": [
      "A. Add both config/keys/ and vendor/ to .claudeignore at the repository root.",
      "B. Add config/keys/ to .claudeignore, and add a Glob section [rules for \"vendor/**\"] with 'Do not edit or modify these files' to CLAUDE.md.",
      "C. Add vendor/ to .claudeignore, and add a Glob section [rules for \"config/keys/**\"] with 'Read-only access permitted' to CLAUDE.md.",
      "D. Add Glob sections for both paths in CLAUDE.md: [rules for \"config/keys/**\"] with 'Never open files' and [rules for \"vendor/**\"] with 'Never open files'."
    ],
    "options": [
      "A. Thêm cả config/keys/ và vendor/ vào file .claudeignore ở thư mục gốc của repository.",
      "B. Thêm config/keys/ vào file .claudeignore, và thêm tiêu đề Glob [rules for \"vendor/**\"] kèm hướng dẫn 'Không chỉnh sửa hoặc thay đổi các file này' vào CLAUDE.md.",
      "C. Thêm vendor/ vào file .claudeignore, và thêm tiêu đề Glob [rules for \"config/keys/**\"] kèm hướng dẫn 'Chỉ cho phép truy cập đọc' vào CLAUDE.md.",
      "D. Thêm tiêu đề Glob cho cả hai đường dẫn trong CLAUDE.md: [rules for \"config/keys/**\"] với hướng dẫn 'Không bao giờ mở file' và [rules for \"vendor/**\"] với hướng dẫn 'Không bao giờ mở file'."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because placing vendor/ in .claudeignore hides third-party library source code completely, preventing Claude Code from inspecting function signatures or type definitions needed for code analysis.",
      "Option B is correct because .claudeignore completely excludes config/keys/ from being read or indexed, securing sensitive keys, while a CLAUDE.md Glob rule allows Claude to read vendor/ files for type context while prohibiting edits.",
      "Option C is incorrect because placing vendor/ in .claudeignore breaks context analysis for vendor APIs, and putting config/keys/ in CLAUDE.md still allows Claude to read key contents into context.",
      "Option D is incorrect because CLAUDE.md rules cannot guarantee complete privacy or file hiding; instructions in CLAUDE.md guide model behavior but do not block file indexing or retrieval like .claudeignore does."
    ],
    "rationale": ".claudeignore controls file visibility and index exclusion (ideal for secrets), whereas CLAUDE.md Glob sections govern model editing behavior while keeping files visible for context inspection.",
    "explanation": "Đáp án đúng là B.\n- B đúng: .claudeignore hoạt động giống .gitignore, giúp ẩn hoàn toàn thư mục config/keys/ khỏi tầm nhìn của Claude Code (không đọc, không index, không đưa vào context), đảm bảo an toàn tuyệt đối cho secret. Ngược lại, quy tắc Glob [rules for \"vendor/**\"] trong CLAUDE.md cho phép Claude vẫn đọc được mã nguồn trong vendor/ để hiểu API/types nhưng bị cấm thực hiện thao tác sửa đổi file.\n- A sai: Đưa vendor/ vào .claudeignore sẽ khiến Claude hoàn toàn không thấy mã nguồn thư viện, gây lỗi khi phân tích hoặc tự động hoàn thiện code phụ thuộc vào thư viện đó.\n- C sai: Đưa vendor/ vào .claudeignore làm mất ngữ cảnh thư viện, còn đặt config/keys/ trong CLAUDE.md vẫn khiến Claude có thể đọc nội dung secret vào context.\n- D sai: Các quy tắc trong CLAUDE.md chỉ đóng vai trò hướng dẫn hành vi model chứ không thể ngăn chặn việc tìm kiếm/đánh chỉ mục file như .claudeignore.",
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  }
]