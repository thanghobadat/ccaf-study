[
  {
    "id": "d3-b06-B-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-009",
    "questionEN": "In a microservice repository fintech-ledger, the test directory /tests/ contains a scoped configuration file /tests/CLAUDE.md with the explicit rule: \"Never use production database credentials in tests; always use local test container connections.\" A developer prompts Claude Code to generate a new integration test helper /tests/helpers/db_setup.ts to establish PostgreSQL connections. How does Claude Code evaluate the rules in /tests/CLAUDE.md during this task?",
    "question": "[d3-b06-B-009] Trong kho lưu trữ microservice fintech-ledger, thư mục kiểm thử /tests/ chứa tệp cấu hình phạm vi /tests/CLAUDE.md với quy tắc rõ ràng: \"Never use production database credentials in tests; always use local test container connections.\" Một nhà phát triển yêu cầu Claude Code tạo tệp hỗ trợ kiểm thử tích hợp mới /tests/helpers/db_setup.ts để thiết lập kết nối PostgreSQL. Claude Code đánh giá các quy tắc trong /tests/CLAUDE.md như thế nào trong tác vụ này?",
    "optionsEN": [
      "A. Claude Code automatically loads /tests/CLAUDE.md into its context when operating under /tests/ and follows the directive by using mock or local container database credentials in db_setup.ts.",
      "B. Claude Code ignores /tests/CLAUDE.md because security restrictions on database credentials can only be enforced using .claudeignore patterns.",
      "C. Claude Code ignores /tests/CLAUDE.md unless the root /CLAUDE.md explicitly includes an @import ./tests/CLAUDE.md reference.",
      "D. Claude Code bypasses /tests/CLAUDE.md directives if the prompt mentions PostgreSQL, defaulting to standard production connection string templates from pre-training data."
    ],
    "options": [
      "A. Claude Code tự động tải /tests/CLAUDE.md vào ngữ cảnh khi hoạt động trong /tests/ và tuân thủ chỉ thị bằng cách sử dụng thông tin xác thực cơ sở dữ liệu mô phỏng hoặc container cục bộ trong db_setup.ts.",
      "B. Claude Code bỏ qua /tests/CLAUDE.md vì các hạn chế bảo mật đối với thông tin xác thực cơ sở dữ liệu chỉ có thể được thực thi bằng các mẫu .claudeignore.",
      "C. Claude Code bỏ qua /tests/CLAUDE.md trừ khi tệp gốc /CLAUDE.md chứa tham chiếu @import ./tests/CLAUDE.md một cách rõ ràng.",
      "D. Claude Code bỏ qua các chỉ thị /tests/CLAUDE.md nếu lời gọi đề cập đến PostgreSQL, mặc định sử dụng các mẫu chuỗi kết nối sản xuất tiêu chuẩn từ dữ liệu huấn luyện."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because Claude Code automatically reads subdirectory CLAUDE.md files when working within their directory hierarchy, applying the rules as contextual constraints to guide code generation.",
      "Option B is incorrect because .claudeignore controls file visibility to prevent Claude from reading sensitive files, whereas CLAUDE.md governs agent behavior and coding conventions.",
      "Option C is incorrect because subdirectory CLAUDE.md files do not require @import statements in root CLAUDE.md to take effect; they are scoped and loaded automatically by directory proximity.",
      "Option D is incorrect because Claude Code prioritizes explicit local instructions in CLAUDE.md files over default model pre-training code generation patterns."
    ],
    "rationale": "Subdirectory CLAUDE.md files provide scoped instructions for any operations performed within that directory tree. When generating code in /tests/helpers/, Claude Code automatically loads /tests/CLAUDE.md and follows its behavioral rule to avoid production credentials.",
    "explanation": "Claude Code tự động phát hiện và tải các tệp CLAUDE.md ở cấp thư mục con khi làm việc trên các tệp thuộc cây thư mục đó. Quy tắc trong /tests/CLAUDE.md định hướng mô hình không được sử dụng thông tin xác thực sản xuất. Lựa chọn A đúng. Lựa chọn B sai vì .claudeignore ẩn tệp chứ không đưa ra quy tắc ứng xử. Lựa chọn C sai vì các tệp CLAUDE.md thư mục con tự động có hiệu lực mà không cần @import. Lựa chọn D sai vì cấu hình CLAUDE.md cục bộ luôn được ưu tiên hơn tri thức huấn luyện mặc định.",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory CLAUDE.md security instruction scoping",
      "failureMode": "accidental inclusion of production database credentials in test helpers",
      "rootCause": "unclear understanding of how subdirectory CLAUDE.md behavioral rules guide code generation",
      "requiredFix": "rely on subdirectory CLAUDE.md rules to enforce mock credentials in test helpers"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-010",
    "questionEN": "In a relational database project banking-core, the database migration directory /migrations/ contains a component configuration /migrations/CLAUDE.md stating: \"Never edit existing migration files; only create new timestamped migration files.\" A developer prompts Claude Code: \"Fix a column typo in /migrations/0045_add_users.sql\". How does Claude Code handle this request?",
    "question": "[d3-b06-B-010] Trong dự án cơ sở dữ liệu quan hệ banking-core, thư mục di chuyển cơ sở dữ liệu /migrations/ chứa cấu hình thành phần /migrations/CLAUDE.md quy định: \"Never edit existing migration files; only create new timestamped migration files.\" Một nhà phát triển yêu cầu Claude Code: \"Fix a column typo in /migrations/0045_add_users.sql\". Claude Code xử lý yêu cầu này như thế nào?",
    "optionsEN": [
      "A. Claude Code edits /migrations/0045_add_users.sql directly because explicit user prompts take priority over subdirectory CLAUDE.md rules.",
      "B. Claude Code refuses to edit /migrations/0045_add_users.sql directly because /migrations/CLAUDE.md prohibits modifying existing migrations, and instead proposes creating a new migration file.",
      "C. Claude Code automatically deletes /migrations/0045_add_users.sql and recreates it under a new filename to bypass the modification restriction.",
      "D. Claude Code prompts for administrator credentials to override .claudeignore restrictions before modifying the file."
    ],
    "options": [
      "A. Claude Code chỉnh sửa trực tiếp /migrations/0045_add_users.sql vì lời gọi trực tiếp từ người dùng luôn có quyền ưu tiên cao hơn các quy tắc trong CLAUDE.md thư mục con.",
      "B. Claude Code từ chối chỉnh sửa trực tiếp /migrations/0045_add_users.sql vì /migrations/CLAUDE.md cấm sửa đổi các tệp di chuyển hiện có, và đề xuất tạo một tệp di chuyển mới thay thế.",
      "C. Claude Code tự động xóa /migrations/0045_add_users.sql và tạo lại nó dưới một tên tệp mới để bỏ qua hạn chế sửa đổi.",
      "D. Claude Code yêu cầu thông tin xác thực quản trị viên để ghi đè lên các hạn chế của .claudeignore trước khi sửa đổi tệp."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because Claude Code treats guardrail safety and workflow rules defined in CLAUDE.md as strict constraints, refusing direct edits that violate immutability rules.",
      "Option B is correct because Claude Code adheres to component rules in /migrations/CLAUDE.md, declining to modify historical migration scripts and advising the compliant workflow of adding a new migration.",
      "Option C is incorrect because deleting and recreating existing migration files violates the immutability principle and alters repository history without authorization.",
      "Option D is incorrect because CLAUDE.md rules are prompt governance policies, not permissions system errors involving admin credentials or .claudeignore."
    ],
    "rationale": "Rules defined in /migrations/CLAUDE.md govern operations within the migrations directory. When asked to perform an action violating these guardrails (editing an existing migration), Claude Code respects the policy by refusing the direct edit and suggesting a compliant solution (creating a new migration).",
    "explanation": "Các quy tắc trong tệp CLAUDE.md ở thư mục con hoạt động như rào chắn quy trình làm việc cho các tệp thuộc phạm vi đó. Khi nhận được yêu cầu sửa tệp di chuyển đã tồn tại trái với chỉ thị trong /migrations/CLAUDE.md, Claude Code sẽ tuân thủ rào chắn, từ chối sửa tệp cũ và đề xuất giải pháp đúng quy trình là tạo tệp di chuyển mới. Lựa chọn B đúng. Lựa chọn A sai vì người dùng không thể vô tình ghi đè rào chắn CLAUDE.md nếu không sửa cấu hình. Lựa chọn C sai vì xóa và tạo lại vẫn vi phạm tính bất biến. Lựa chọn D sai vì đây không phải vấn đề phân quyền quản trị hay .claudeignore.",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory CLAUDE.md immutability policy enforcement",
      "failureMode": "unauthorized editing of immutable database migration files",
      "rootCause": "direct user prompt attempting to override subdirectory CLAUDE.md guardrails",
      "requiredFix": "refuse direct edits to existing migration files and propose creating a new migration"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]