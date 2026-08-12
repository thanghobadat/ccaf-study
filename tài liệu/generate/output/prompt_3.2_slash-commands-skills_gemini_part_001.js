[
  {
    "id": "d3-b06-3.2-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-001",
    "scenarioSignature": {
      "testedPrinciple": "slash command directory scoping and repository version control distribution",
      "failureMode": "command execution failure for team members on custom workflow slash command",
      "rootCause": "slash command file stored in user home directory instead of project repository directory",
      "requiredFix": "relocate slash command file to project root command directory and commit to version control"
    },
    "questionEN": "A lead engineer created a custom slash command at ~/.claude/commands/run-integration-tests.md to automate running integration tests for the auth-service project. When team members clone the repo and type /run-integration-tests in Claude Code CLI, they receive an unknown command error, even though it works for the lead engineer. What is the root cause and required fix?",
    "question": "[d3-b06-3.2-001] Một kỹ sư trưởng đã tạo một lệnh gạch chéo tùy chỉnh tại ~/.claude/commands/run-integration-tests.md để tự động hóa việc chạy các kiểm thử tích hợp cho dự án auth-service. Khi các thành viên trong nhóm clone repository và nhập /run-integration-tests trong Claude Code CLI, họ nhận được lỗi không tìm thấy lệnh (unknown command), mặc dù lệnh vẫn hoạt động bình thường với kỹ sư trưởng. Nguyên nhân gốc rễ và giải pháp khắc phục là gì?",
    "optionsEN": [
      "A. Personal commands in ~/.claude/commands/ are only available to the local user account; relocate the file to .claude/commands/run-integration-tests.md inside the repository and commit it to git.",
      "B. Custom slash commands stored in ~/.claude/commands/ require explicit execution permissions chmod +x; grant execution rights to allow shared user access across local environments.",
      "C. Personal slash command definitions must be explicitly referenced in /repo/CLAUDE.md using the @import directive before teammates can inherit them in active sessions.",
      "D. Slash commands placed outside the repository must be declared in .claude.json under shared_slash_commands with public: true to enable cross-developer synchronization."
    ],
    "options": [
      "A. Lệnh cá nhân trong ~/.claude/commands/ chỉ khả thi đối với tài khoản người dùng cục bộ; di chuyển tệp vào .claude/commands/run-integration-tests.md bên trong kho lưu trữ và commit vào git.",
      "B. Các lệnh gạch chéo tùy chỉnh được lưu trữ trong ~/.claude/commands/ yêu cầu quyền thực thi rõ ràng chmod +x; cấp quyền thực thi để cho phép truy cập người dùng dùng chung qua các môi trường cục bộ.",
      "C. Các định nghĩa lệnh gạch chéo cá nhân phải được tham chiếu rõ ràng trong /repo/CLAUDE.md bằng chỉ thị @import trước khi các đồng nghiệp có thể thừa hưởng chúng trong các phiên hoạt động.",
      "D. Các lệnh gạch chéo được đặt bên ngoài kho lưu trữ phải được khai báo trong .claude.json bên dưới shared_slash_commands với public: true để bật đồng bộ hóa giữa các nhà phát triển."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Files placed in ~/.claude/commands/ are scoped strictly to the local user's home directory and are not shared via git. Moving the file to .claude/commands/ (or .agents/commands/) within the repository allows all team members to access /run-integration-tests once committed.",
      "Option B is incorrect: File permissions do not broadcast home directory contents to other users' machines; slash commands are plain Markdown files loaded by location, not executed as standalone binaries requiring executable bits.",
      "Option C is incorrect: The @import syntax in CLAUDE.md imports instruction rules, not slash command files from user home directories across different workstations.",
      "Option D is incorrect: .claude.json does not support a shared_slash_commands key with public: true for syncing home folder commands."
    ],
    "rationale": "Claude Code distinguishes between personal slash commands (~/.claude/commands/) and project-level slash commands (.claude/commands/ or .agents/commands/). Personal commands reside in the user's home folder and are not tracked by version control. Moving the command file into the project's .claude/commands/ folder ensures it is version-controlled and shared with all repository contributors.",
    "explanation": "Trong Claude Code, các lệnh gạch chéo (slash commands) có hai phạm vi lưu trữ chính: phạm vi cá nhân và phạm vi dự án. Lệnh lưu tại ~/.claude/commands/ nằm trong thư mục trang chủ của người dùng cá nhân nên không được quản lý bởi git và các thành viên khác trong nhóm không thể truy cập. Để chia sẻ lệnh /run-integration-tests cho toàn bộ nhóm, tệp Markdown định nghĩa lệnh phải được di chuyển vào thư mục .claude/commands/ (hoặc .agents/commands/) nằm ngay trong kho lưu trữ mã nguồn của dự án và được commit lên git.\n\n- Lựa chọn A đúng vì di chuyển tệp vào .claude/commands/ của dự án và commit lên repository giúp mọi thành viên đều có thể sử dụng lệnh.\n- Lựa chọn B sai vì việc thay đổi quyền file chmod +x không giúp chia sẻ tệp cá nhân từ thư mục home của máy này sang máy khác.\n- Lựa chọn C sai vì chỉ thị @import trong CLAUDE.md dùng để nạp quy tắc hướng dẫn, không dùng để nạp slash command từ thư mục home cá nhân.\n- Lựa chọn D sai vì .claude.json không có thuộc tính shared_slash_commands hay public: true để đồng bộ lệnh cá nhân.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  },
  {
    "id": "d3-b06-3.2-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-002",
    "scenarioSignature": {
      "testedPrinciple": "skill activation scoping via frontmatter file glob matching",
      "failureMode": "unexpected skill activation across non-target file extensions",
      "rootCause": "missing applyTo glob property in skill definition YAML frontmatter",
      "requiredFix": "configure applyTo file pattern in skill YAML frontmatter to scope activation"
    },
    "questionEN": "A developer configured a database optimization skill in .agents/skills/db-optimizer/SKILL.md to analyze query performance for the inventory-api project. However, Claude Code automatically activates this skill and injects database linting guidelines whenever developers edit React components (*.tsx) or documentation (*.md), causing irrelevant prompt context overhead. The SKILL.md frontmatter currently contains only name and description. What addition to the frontmatter resolves this issue?",
    "question": "[d3-b06-3.2-002] Một nhà phát triển đã cấu hình một kỹ năng tối ưu hóa cơ sở dữ liệu tại .agents/skills/db-optimizer/SKILL.md để phân tích hiệu suất truy vấn cho dự án inventory-api. Tuy nhiên, Claude Code tự động kích hoạt kỹ năng này và nạp các hướng dẫn kiểm tra DB mỗi khi nhà phát triển chỉnh sửa các thành phần React (*.tsx) hoặc tài liệu (*.md), gây ra tình trạng thừa ngữ cảnh không liên quan. Frontmatter của SKILL.md hiện tại chỉ chứa name và description. Sự bổ sung nào vào frontmatter sẽ giải quyết vấn đề này?",
    "optionsEN": [
      "A. Add autoTrigger: false to the YAML frontmatter to force developers to invoke the skill manually.",
      "B. Add applyTo: \"**/*.sql\" to the YAML frontmatter to restrict automatic activation to matching SQL file patterns.",
      "C. Add scope: \"database\" to the YAML frontmatter to override global skill inheritance across non-database subdirectories.",
      "D. Add excludePatterns: [\"**/*.tsx\", \"**/*.md\"] to .claude.json to block skills from reading frontend files."
    ],
    "options": [
      "A. Thêm autoTrigger: false vào YAML frontmatter để buộc các nhà phát triển phải gọi kỹ năng này một cách thủ công.",
      "B. Thêm applyTo: \"**/*.sql\" vào YAML frontmatter để giới hạn việc kích hoạt tự động chỉ cho các mẫu tệp SQL phù hợp.",
      "C. Thêm scope: \"database\" vào YAML frontmatter để ghi đè việc kế thừa kỹ năng toàn cục qua các thư mục con không phải cơ sở dữ liệu.",
      "D. Thêm excludePatterns: [\"**/*.tsx\", \"**/*.md\"] vào .claude.json để chặn kỹ năng đọc các tệp frontend."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: autoTrigger is not a valid standard Claude Code skill frontmatter field for controlling file-pattern activation.",
      "Option B is correct: The applyTo field in a SKILL.md YAML frontmatter accepts glob patterns (such as **/*.sql) that restrict automatic skill activation strictly to sessions where matching files are active or being modified.",
      "Option C is incorrect: scope: \"database\" is an invalid frontmatter attribute and does not restrict file-level activation matching.",
      "Option D is incorrect: .claude.json does not use excludePatterns to control skill triggering behavior; file scoping for skills is defined directly inside SKILL.md frontmatter via applyTo."
    ],
    "rationale": "Skills in Claude Code use YAML frontmatter metadata to define their execution context. The applyTo property takes a file glob pattern (e.g., **/*.sql). When specified, Claude Code only activates the skill when working with files matching that glob pattern, preventing unnecessary context injection when editing unrelated file types like TypeScript or Markdown.",
    "explanation": "Trong Claude Code, các Kỹ năng (Skills) được định nghĩa bằng tệp SKILL.md chứa phần YAML frontmatter ở đầu tệp. Thuộc tính applyTo trong frontmatter được sử dụng để chỉ định mẫu đường dẫn tệp (glob pattern) mà kỹ năng đó sẽ áp dụng (ví dụ: applyTo: \"**/*.sql\"). Khi thiếu applyTo, Claude Code có thể kích hoạt kỹ năng này dựa trên khớp tên/mô tả bất kể loại tệp đang chỉnh sửa, dẫn đến tràn ngữ cảnh không cần thiết. Việc khai báo applyTo giúp giới hạn kỹ năng chỉ tự động kích hoạt khi nhà phát triển đang làm việc với các tệp khớp với glob pattern đó.\n\n- Lựa chọn A sai vì autoTrigger không phải là thuộc tính chuẩn trong frontmatter của SKILL.md để kiểm soát khớp tệp.\n- Lựa chọn B đúng vì applyTo: \"**/*.sql\" giới hạn việc tự động kích hoạt kỹ năng chỉ khi tương tác với các tệp SQL.\n- Lựa chọn C sai vì scope: \"database\" là thuộc tính không hợp lệ trong frontmatter.\n- Lựa chọn D sai vì cấu hình loại trừ tệp cho kỹ năng nằm trực tiếp trong frontmatter của SKILL.md thông qua applyTo, không nằm trong .claude.json.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  }
]