[
  {
    "id": "d3-b06-3.2-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-009",
    "scenarioSignature": {
      "testedPrinciple": "file content expansion via file reference syntax in slash command templates",
      "failureMode": "misunderstanding prompt context assembly when custom slash commands reference workspace files",
      "rootCause": "unawareness that file references automatically inject target file content into the command context",
      "requiredFix": "utilize file references in command definitions to inject context files automatically"
    },
    "questionEN": "A DevOps engineer creates a custom slash command file .claude/commands/review-schema.md to automate Database Migration reviews. The template contains: Review the SQL migration script in @db/migrations/v2_up.sql for index performance and locking risks. When a developer executes /review-schema in Claude Code, how does the system process the @db/migrations/v2_up.sql syntax inside the slash command prompt file?",
    "question": "[d3-b06-3.2-009] Một kỹ sư DevOps tạo tệp lệnh gạch chéo tùy chỉnh .claude/commands/review-schema.md để tự động hóa việc kiểm tra Database Migration. Mẫu câu lệnh chứa nội dung: Review the SQL migration script in @db/migrations/v2_up.sql for index performance and locking risks. Khi một nhà phát triển chạy /review-schema trong Claude Code, hệ thống xử lý cú pháp @db/migrations/v2_up.sql bên trong tệp mẫu như thế nào?",
    "optionsEN": [
      "A. Claude Code resolves the @db/migrations/v2_up.sql reference and automatically injects the contents of db/migrations/v2_up.sql directly into the prompt context sent to the model.",
      "B. Claude Code ignores the @ symbol and passes the literal text string @db/migrations/v2_up.sql as prompt text without reading the file.",
      "C. Claude Code throws a syntax error because @file syntax is only permitted in interactive user prompts, not inside stored .md slash command templates.",
      "D. Claude Code creates a symbolic link between the command template and the SQL script, executing the SQL script as a background bash process before prompting."
    ],
    "options": [
      "A. Claude Code giải mã tham chiếu @db/migrations/v2_up.sql và tự động chèn nội dung của tệp db/migrations/v2_up.sql trực tiếp vào ngữ cảnh prompt gửi tới mô hình.",
      "B. Claude Code bỏ qua ký tự @ và truyền chuỗi văn bản nguyên bản @db/migrations/v2_up.sql như một văn bản prompt thông thường mà không đọc tệp.",
      "C. Claude Code báo lỗi cú pháp vì cú pháp @file chỉ được phép sử dụng trong prompt tương tác của người dùng, không được dùng trong tệp mẫu .md của lệnh gạch chéo.",
      "D. Claude Code tạo một liên kết mềm giữa tệp mẫu lệnh và kịch bản SQL, thực thi kịch bản SQL dưới dạng một tiến trình bash chạy ngầm trước khi gửi prompt."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: @file references in custom slash command markdown files are resolved by Claude Code, injecting the specified target file's content directly into the conversation prompt context.",
      "Option B is incorrect: @file references are active file expansion directives, not ignored literal text strings.",
      "Option C is incorrect: @file references are fully supported inside .md slash command definition templates.",
      "Option D is incorrect: @file does not execute scripts or create symlinks; it performs static file content injection."
    ],
    "rationale": "In Claude Code slash commands, using @filename syntax inside the prompt template instructs the system to read and inline the referenced file content into the prompt context, eliminating the need to manually pass file contents as arguments.",
    "explanation": "Lựa chọn A đúng vì khi định nghĩa một slash command trong Claude Code, việc chèn cú pháp @filepath vào tệp markdown sẽ khiến Claude Code tự động giải mã và nạp trực tiếp toàn bộ nội dung của tệp đó vào ngữ cảnh prompt khi lệnh được triệu gọi.\nLựa chọn B sai vì ký tự @ không phải là văn bản thuần túy mà là một chỉ thị tham chiếu tệp chủ động.\nLựa chọn C sai vì cú pháp @file hoàn toàn hợp lệ và được hỗ trợ trong các tệp mẫu .md của slash command.\nLựa chọn D sai vì cú pháp này chỉ nhằm mục đích inject nội dung tệp vào prompt context chứ không tạo liên kết mềm hay thực thi tiến trình bash.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  },
  {
    "id": "d3-b06-3.2-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-010",
    "scenarioSignature": {
      "testedPrinciple": "project scoped slash command precedence over personal global slash commands",
      "failureMode": "unexpected workflow execution when identical slash command names exist in personal and project locations",
      "rootCause": "unawareness that project level command definitions override user level command definitions",
      "requiredFix": "rely on project slash command definitions for repository consistent workflows"
    },
    "questionEN": "A developer has a personal slash command /deploy defined in ~/.claude/commands/deploy.md that executes deployment scripts to a personal sandbox environment. The repository they are working on also defines a project slash command /deploy in .claude/commands/deploy.md that runs pipeline validation and triggers production release staging. When the developer types /deploy in Claude Code while working inside this project workspace, which command definition is executed and why?",
    "question": "[d3-b06-3.2-010] Một nhà phát triển có một lệnh gạch chéo cá nhân /deploy được định nghĩa tại ~/.claude/commands/deploy.md để triển khai kịch bản vào môi trường sandbox cá nhân. Kho chứa mã nguồn họ đang làm việc cũng định nghĩa một lệnh gạch chéo dự án /deploy tại .claude/commands/deploy.md để kiểm tra pipeline và kích hoạt bản phát hành staging. Khi nhà phát triển gõ /deploy trong Claude Code khi đang ở không gian làm việc của dự án này, định nghĩa lệnh nào sẽ được thực thi và tại sao?",
    "optionsEN": [
      "A. The personal command (~/.claude/commands/deploy.md) takes precedence because user-level global configurations always override repository-level rules for individual developers.",
      "B. The project command (.claude/commands/deploy.md) takes precedence because project-scoped configurations override personal global definitions to guarantee repository consistency.",
      "C. Claude Code fails with an ambiguous command collision error and refuses to execute either command until one is renamed.",
      "D. Both commands are merged sequentially, executing the personal command script followed by the project command script in a single session."
    ],
    "options": [
      "A. Lệnh cá nhân (~/.claude/commands/deploy.md) được ưu tiên vì các cấu hình toàn cục cấp người dùng luôn ghi đè các quy tắc cấp kho chứa đối với từng nhà phát triển.",
      "B. Lệnh dự án (.claude/commands/deploy.md) được ưu tiên vì cấu hình phạm vi dự án ghi đè các định nghĩa toàn cục cá nhân nhằm đảm bảo tính đồng nhất trong kho chứa.",
      "C. Claude Code thất bại với lỗi xung đột lệnh mơ hồ và từ chối thực thi cả hai lệnh cho đến khi một trong hai lệnh được đổi tên.",
      "D. Cả hai lệnh được hợp nhất tuần tự, thực thi kịch bản lệnh cá nhân trước rồi đến kịch bản lệnh dự án trong cùng một phiên."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Personal global commands do not override project-level commands; project rules take precedence to maintain team standards.",
      "Option B is correct: Project commands defined in .claude/commands/ override personal global commands in ~/.claude/commands/ so that workspace-specific workflows apply consistently.",
      "Option C is incorrect: Claude Code does not raise a collision error; it deterministically resolves the name by giving project scope precedence over personal scope.",
      "Option D is incorrect: Slash commands do not merge or concatenate execution scripts when duplicate names exist."
    ],
    "rationale": "Project-scoped slash commands (.claude/commands/ or .agents/commands/) always take precedence over personal global slash commands (~/.claude/commands/) when invoked inside a project directory, ensuring standardized team workflows overriding local user settings.",
    "explanation": "Lựa chọn B đúng vì cơ chế độ ưu tiên cấu hình trong Claude Code đảm bảo rằng các định nghĩa ở cấp dự án (.claude/commands/ hoặc .agents/commands/) luôn ghi đè các định nghĩa ở cấp cá nhân/toàn cục (~/.claude/commands/). Điều này giúp đảm bảo toàn bộ thành viên trong nhóm dự án luôn thực thi các kịch bản chuẩn hóa của kho chứa mã nguồn.\nLựa chọn A sai vì cấu hình cá nhân không có độ ưu tiên cao hơn cấu hình dự án.\nLựa chọn C sai vì Claude Code không đưa ra lỗi xung đột mà giải quyết trùng tên theo quy tắc độ ưu tiên rõ ràng.\nLựa chọn D sai vì các lệnh gạch chéo không bị gộp chuỗi thực thi khi trùng tên.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  }
]