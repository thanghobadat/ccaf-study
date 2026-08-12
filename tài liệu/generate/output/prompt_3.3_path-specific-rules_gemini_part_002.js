[
  {
    "id": "d3-b06-3.3-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-003",
    "scenarioSignature": {
      "testedPrinciple": "path-specific glob rules for database migration immutability",
      "failureMode": "historical migration script mutation causing database checksum mismatch failure",
      "rootCause": "absence of glob path rule restricting modification of existing migration files",
      "requiredFix": "configure path-specific glob section in CLAUDE.md forbidding edits to existing migrations"
    },
    "questionEN": "During automated schema updates in a relational database project, Claude Code modified an existing migration file src/migrations/20240115_create_users.sql to add a new column instead of generating a new timestamped migration file. Running npm run db:migrate in the CI pipeline failed with ERR_MIGRATION_CHECKSUM_MUTATED. How should the team configure CLAUDE.md to prevent Claude Code from editing existing migration scripts while preserving schema awareness for new migrations?",
    "question": "[d3-b06-3.3-003] Trong quá trình cập nhật schema tự động cho một dự án cơ sở dữ liệu quan hệ, Claude Code đã sửa đổi tệp migration hiện có src/migrations/20240115_create_users.sql để thêm cột mới thay vì tạo một tệp migration có gắn nhãn thời gian mới. Việc chạy npm run db:migrate trong CI pipeline bị thất bại với lỗi ERR_MIGRATION_CHECKSUM_MUTATED. Đội ngũ phát triển nên cấu hình CLAUDE.md như thế nào để ngăn Claude Code chỉnh sửa các kịch bản migration hiện có trong khi vẫn giữ nhận thức về schema để tạo migration mới?",
    "optionsEN": [
      "A. Add src/migrations/** to .claudeignore so Claude Code completely skips reading migration files during execution.",
      "B. Add a top-level general rule in CLAUDE.md: 'Never edit any SQL files located anywhere in the workspace repository.'",
      "C. Add a path-specific section [rules for \"src/migrations/**\"] in CLAUDE.md stating: 'Never modify existing migration files — create new migration files only.'",
      "D. Place a .claude.json file inside src/migrations/ with the configuration flag \"readOnly\": true for SQL extensions."
    ],
    "options": [
      "A. Thêm src/migrations/** vào .claudeignore để Claude Code bỏ qua hoàn toàn việc đọc các tệp migration trong quá trình thực thi.",
      "B. Thêm quy tắc chung cấp cao nhất trong CLAUDE.md: 'Never edit any SQL files located anywhere in the workspace repository.'",
      "C. Thêm phần quy tắc theo đường dẫn [rules for \"src/migrations/**\"] trong CLAUDE.md với nội dung: 'Never modify existing migration files — create new migration files only.'",
      "D. Đặt tệp .claude.json bên trong src/migrations/ với cờ cấu hình \"readOnly\": true cho các tệp mở rộng SQL."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because adding src/migrations/** to .claudeignore makes existing migration files completely invisible to Claude Code, preventing it from understanding the current database schema structure when drafting new migrations.",
      "Option B is incorrect because a top-level un-scoped rule banning all SQL file edits prevents creating new SQL migrations across the workspace and lacks target path-scoping via Glob headers.",
      "Option C is correct because a path-specific Glob header [rules for \"src/migrations/**\"] in CLAUDE.md keeps historical migrations visible for context while enforcing strict append-only rules that instruct Claude Code to create new files rather than modifying existing ones.",
      "Option D is incorrect because Claude Code does not support per-directory .claude.json files for path-based immutability rules; path-specific instructions must be defined in CLAUDE.md using Glob sections."
    ],
    "rationale": "Path-specific rules using Glob headers like [rules for \"src/migrations/**\"] in CLAUDE.md allow teams to enforce strict operational constraints (such as append-only behavior) on target directories. This preserves visibility of historical migrations for schema context while preventing checksum corruption caused by altering existing files.",
    "explanation": "Để giải quyết vấn đề sửa đổi kịch bản migration lịch sử gây ra lỗi checksum trong CI pipeline, giải pháp chính xác là sử dụng quy tắc theo đường dẫn (path-specific rules) trong CLAUDE.md.\n\n- Option A sai: Thêm đường dẫn vào .claudeignore sẽ ẩn hoàn toàn các tệp này khỏi tầm nhìn của Claude Code, khiến Claude không thể đọc và hiểu được cấu trúc schema hiện tại để viết migration mới chính xác.\n- Option B sai: Quy tắc tổng thể không được giới hạn bằng Glob pattern sẽ vô hiệu hóa việc chỉnh sửa mọi tệp SQL trong toàn bộ dự án, ngăn cản việc tạo các tệp migration mới.\n- Option C đúng: Thêm phần quy tắc theo đường dẫn [rules for \"src/migrations/**\"] trong CLAUDE.md cho phép Claude Code vẫn đọc và tham chiếu các tệp migration hiện có để hiểu schema, nhưng tuân thủ chỉ thị không được sửa đổi tệp cũ mà chỉ tạo tệp migration mới.\n- Option D sai: Claude Code không hỗ trợ tệp .claude.json đặt trong từng thư mục con để thiết lập cờ readOnly; các chỉ thị hành vi theo đường dẫn phải được định nghĩa trong CLAUDE.md bằng phần tiêu đề Glob.",
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  },
  {
    "id": "d3-b06-3.3-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-004",
    "scenarioSignature": {
      "testedPrinciple": "path-specific glob rules for third-party dependency immutability",
      "failureMode": "unwanted inspection and mutation of third-party vendor code breaking package integrity",
      "rootCause": "absence of path-scoped instructions restricting operations in third-party vendor directories",
      "requiredFix": "add vendor path glob section in CLAUDE.md instructing Claude to abstain from editing vendor files"
    },
    "questionEN": "Engineers working on a Go service noticed that when asking Claude Code to update an API endpoint, it analyzed packages in the vendor/ directory and attempted to modify vendor/github.com/pkg/errors/errors.go to fix a type mismatch. Modifying vendor dependencies violates repository rules. How should the team configure CLAUDE.md so Claude Code refrains from reading or editing third-party code in vendor/ while retaining standard editing capabilities for application code?",
    "question": "[d3-b06-3.3-004] Các kỹ sư làm việc trên một dịch vụ Go nhận thấy rằng khi yêu cầu Claude Code cập nhật một endpoint API, công cụ này đã phân tích các package trong thư mục vendor/ và cố gắng sửa đổi vendor/github.com/pkg/errors/errors.go để khắc phục lỗi không tương thích kiểu dữ liệu. Việc sửa đổi các phụ thuộc trong vendor vi phạm quy tắc kho chứa. Đội ngũ phát triển nên cấu hình CLAUDE.md như thế nào để Claude Code không đọc hoặc sửa đổi mã nguồn của bên thứ ba trong vendor/ trong khi vẫn giữ khả năng chỉnh sửa tiêu chuẩn cho mã ứng dụng?",
    "optionsEN": [
      "A. Configure a custom hook in CLAUDE.md under [hooks] that automatically runs go mod vendor before every Claude Code file modification.",
      "B. Add vendor/ to the root .gitignore file so Claude Code automatically ignores the path during codebase operations.",
      "C. Add an @import vendor/CLAUDE.md directive at the top of the root CLAUDE.md file to inherit write-protection flags.",
      "D. Add a Glob section [rules for \"vendor/**\"] in CLAUDE.md specifying: 'Do not read or modify files in this directory; treat third-party vendor code as immutable.'"
    ],
    "options": [
      "A. Cấu hình hook tùy chỉnh trong CLAUDE.md bên dưới [hooks] để tự động chạy go mod vendor trước mỗi lần Claude Code sửa đổi tệp.",
      "B. Thêm vendor/ vào tệp .gitignore ở thư mục gốc để Claude Code tự động bỏ qua đường dẫn trong các thao tác codebase.",
      "C. Thêm chỉ thị @import vendor/CLAUDE.md ở đầu tệp CLAUDE.md gốc để kế thừa các cờ bảo vệ chống ghi.",
      "D. Thêm phần Glob [rules for \"vendor/**\"] trong CLAUDE.md quy định: 'Do not read or modify files in this directory; treat third-party vendor code as immutable.'"
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because pre-edit hooks cannot govern Claude's model behavior or path access boundaries, and go mod vendor rebuilds vendor files rather than prohibiting model interaction.",
      "Option B is incorrect because adding vendor/ to .gitignore affects version control tracking (and might hide vendor files if uncommitted), but does not specifically configure path-scoped model instructions in CLAUDE.md for tracked dependency files.",
      "Option C is incorrect because @import is used to include external CLAUDE.md files, not to apply path-specific Glob rules, and vendor/CLAUDE.md does not exist by default.",
      "Option D is correct because adding a Glob section [rules for \"vendor/**\"] in CLAUDE.md explicitly scopes behavior rules to the vendor/ directory, directing Claude Code to treat third-party dependencies as read-only or no-touch artifacts."
    ],
    "rationale": "Path-specific rules in CLAUDE.md using Glob patterns like [rules for \"vendor/**\"] enable targeted behavioral restrictions for specific directory paths. This prevents Claude Code from attempting to edit or inspect immutable third-party libraries while preserving normal model operations across the rest of the application codebase.",
    "explanation": "Để ngăn Claude Code can thiệp hoặc sửa đổi mã nguồn thư viện bên thứ ba nằm trong thư mục vendor/, giải pháp chuẩn trong quy trình cấu hình Claude Code là định nghĩa quy tắc theo đường dẫn (path-specific rules) bằng phần tiêu đề Glob.\n\n- Option A sai: Cấu hình hooks không quyết định quy tắc truy cập tệp hay hướng dẫn hành vi LLM cho từng thư mục, và lệnh go mod vendor chỉ sao chép lại phụ thuộc chứ không ngăn Claude sửa tệp.\n- Option B sai: Thêm vào .gitignore chỉ ảnh hưởng đến quản lý phiên bản Git, không phải là cơ chế định nghĩa quy tắc chỉ thị hành vi theo đường dẫn trong CLAUDE.md.\n- Option C sai: Direct @import dùng để chèn nội dung tệp CLAUDE.md khác chứ không thiết lập quy tắc giới hạn theo Glob pattern cho thư mục vendor/.\n- Option D đúng: Tạo phần tiêu đề Glob [rules for \"vendor/**\"] trong CLAUDE.md thiết lập quy tắc rõ ràng áp dụng riêng cho thư mục vendor, chỉ thị cho Claude Code không đọc hoặc chỉnh sửa mã nguồn bên thứ ba trong thư mục này.",
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  }
]