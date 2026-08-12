[
  {
    "id": "d3-b06-3.2-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-007",
    "scenarioSignature": {
      "testedPrinciple": "slash command storage directory scope distinction",
      "failureMode": "accidental exposure of private credentials in shared repository",
      "rootCause": "storing personal secret workflow in project command directory instead of user home directory",
      "requiredFix": "relocate personal slash command to user level commands directory"
    },
    "questionEN": "A principal DevOps engineer created a custom slash command /deploy-prod containing developer-specific authentication tokens and internal staging endpoints. Intending to keep this command exclusive to their personal environment, the engineer saved the file at .claude/commands/deploy-prod.md inside the project root directory. During a routine git commit and push, the file was tracked and published to the shared team repository, exposing personal secrets. Which mistake in slash command organization caused this credential leak?",
    "question": "[d3-b06-3.2-007] Một kỹ sư DevOps chính đã tạo một slash command tùy chỉnh /deploy-prod chứa token xác thực cá nhân của nhà phát triển và các endpoint nội bộ. Với ý định chỉ giữ command này cho môi trường cá nhân, kỹ sư này đã lưu file tại .claude/commands/deploy-prod.md bên trong thư mục gốc của dự án. Trong đợt git commit và push định kỳ, file đã bị theo dõi và xuất bản lên repository dùng chung của team, làm lộ bí mật cá nhân. Sai sót nào trong việc tổ chức slash command đã gây ra sự cố rò rỉ thông tin xác thực này?",
    "optionsEN": [
      "A. Slash commands require an explicit .claudeignore rule; saving them inside .claude/commands/ automatically marks them as public git untracked files unless registered in CLAUDE.md.",
      "B. Personal slash commands must be configured with scope: private in YAML frontmatter inside .claude/commands/, which prevents git tracking.",
      "C. Project-level slash commands placed in .claude/commands/ are committed and shared with all repository contributors; personal commands must be stored in ~/.claude/commands/.",
      "D. Custom slash commands containing bash scripts require dynamic secret injection via $ARGUMENTS rather than hardcoded markdown text inside project directories."
    ],
    "options": [
      "A. Các slash command yêu cầu một quy tắc .claudeignore rõ ràng; việc lưu chúng bên trong .claude/commands/ sẽ tự động đánh dấu chúng là file không được git theo dõi trừ khi được đăng ký trong CLAUDE.md.",
      "B. Các slash command cá nhân phải được cấu hình với scope: private trong YAML frontmatter bên trong .claude/commands/ để ngăn git theo dõi.",
      "C. Các slash command cấp dự án được đặt trong .claude/commands/ sẽ được commit và chia sẻ cho tất cả thành viên trong repository; các command cá nhân phải được lưu trong ~/.claude/commands/.",
      "D. Các slash command tùy chỉnh chứa bash script yêu cầu truyền secret động qua $ARGUMENTS thay vì hardcode văn bản markdown bên trong các thư mục dự án."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because .claude/commands/ files are standard repository files that git tracks by default, and .claudeignore controls Claude Code file reading rather than git commits.",
      "Option B is incorrect because Claude Code slash commands do not support a scope: private frontmatter field to prevent git from tracking files in .claude/commands/.",
      "Option C is correct because files placed in .claude/commands/ (or .agents/commands/) are project-scoped and intended for git tracking, whereas personal slash commands must be stored in ~/.claude/commands/ in the user's home directory.",
      "Option D is incorrect because while parameterizing secrets is good security practice, the root organizational flaw is storing a personal workflow file in the shared project directory instead of ~/.claude/commands/."
    ],
    "rationale": "Claude Code distinguishes between project-scoped slash commands (.claude/commands/ or .agents/commands/) which are version-controlled and shared across the team, and user-scoped personal commands (~/.claude/commands/) which reside in the developer's home directory. Storing personal workflows with developer credentials in .claude/commands/ causes git to track and share them, leading to security leaks.",
    "explanation": "Trong Claude Code, việc phân định phạm vi (scope) của slash command được xác định bởi đường dẫn lưu trữ:\n- Project-scoped slash commands: Được lưu tại .claude/commands/{name}.md (hoặc .agents/commands/{name}.md) trong thư mục dự án. Các file này được thiết kế để theo dõi bởi Git và chia sẻ quy trình làm việc cho toàn bộ đội ngũ phát triển.\n- Personal/User-scoped slash commands: Được lưu tại ~/.claude/commands/{name}.md trong thư mục cá nhân của người dùng. Các command này chỉ hiển thị và hoạt động trên máy của lập trình viên đó.\n\nPhân tích từng lựa chọn:\n- Đáp án A sai: .claudeignore quản lý các file Claude Code không được đọc/index, không liên quan đến việc ngăn chặn Git tracking mặc định của các file trong thư mục dự án.\n- Đáp án B sai: Slash command không hỗ trợ thuộc tính YAML frontmatter scope: private để chặn Git tracking.\n- Đáp án C ĐÚNG: Đặt file vào .claude/commands/ biến nó thành project command và bị Git commit. Để giữ workflow và secret cá nhân không bị lộ, phải lưu ở ~/.claude/commands/.\n- Đáp án D sai: Mặc dù dùng $ARGUMENTS hoặc biến môi trường là giải pháp tốt cho secret, nguyên nhân cốt lõi về mặt tổ chức là lưu sai thư mục khiến file bị đưa vào VCS.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  },
  {
    "id": "d3-b06-3.2-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-008",
    "scenarioSignature": {
      "testedPrinciple": "skill frontmatter description matching mechanism",
      "failureMode": "skill failing to activate upon relevant user prompt",
      "rootCause": "vague description metadata in skill frontmatter failing intent resolution",
      "requiredFix": "update skill description frontmatter with explicit trigger conditions and domain intent"
    },
    "questionEN": "A backend team created a custom Skill in .claude/skills/db-migrate/SKILL.md to automatically generate and validate database migration scripts. The frontmatter was configured as:\n---\nname: db-migrate\ndescription: Utility script tool\n---\nDuring development, when engineers prompt Claude Code with 'Generate a schema migration script to add the user_preferences table', Claude Code consistently uses general LLM knowledge instead of activating the custom db-migrate Skill. What is the root cause of this failure?",
    "question": "[d3-b06-3.2-008] Một đội ngũ backend đã tạo một Skill tùy chỉnh tại .claude/skills/db-migrate/SKILL.md để tự động tạo và kiểm tra các script migration cơ sở dữ liệu. Frontmatter của Skill được cấu hình như sau:\n---\nname: db-migrate\ndescription: Utility script tool\n---\nTrong quá trình phát triển, khi các lập trình viên yêu cầu Claude Code bằng câu lệnh 'Generate a schema migration script to add the user_preferences table', Claude Code liên tục sử dụng tri thức tổng quát của LLM thay vì kích hoạt Skill db-migrate tùy chỉnh. Nguyên nhân gốc rễ của sự cố này là gì?",
    "optionsEN": [
      "A. The Skill is missing an explicit applyTo: \"*.sql\" field, which prevents Claude Code from indexing Skill files prior to prompt execution.",
      "B. The name field must match the user prompt keywords exactly, so the prompt should have explicitly included /db-migrate.",
      "C. Claude Code requires all Skills in .claude/skills/ to be imported manually in CLAUDE.md via an @import directive before intent matching works.",
      "D. The description field is too vague for Claude Code's semantic matcher to align the user's migration request with the Skill's purpose."
    ],
    "options": [
      "A. Skill thiếu trường applyTo: \"*.sql\" rõ ràng, khiến Claude Code không thể index các file Skill trước khi thực thi prompt.",
      "B. Trường name phải khớp chính xác với các từ khóa trong prompt của người dùng, nên câu lệnh bắt buộc phải bao gồm /db-migrate một cách rõ ràng.",
      "C. Claude Code yêu cầu tất cả các Skill trong .claude/skills/ phải được import thủ công trong CLAUDE.md thông qua chỉ thị @import trước khi việc khớp ý định hoạt động.",
      "D. Trường description quá mơ hồ khiến bộ khớp ngữ nghĩa của Claude Code không thể liên kết yêu cầu migration của người dùng với mục đích của Skill."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because applyTo restricts file context matching when editing specific files, but its absence does not block Skill discovery based on prompt intent.",
      "Option B is incorrect because Skills are designed to trigger automatically based on semantic description matching, without requiring explicit slash command syntax.",
      "Option C is incorrect because Skills inside .claude/skills/ are automatically discovered by Claude Code and do not require @import directives in CLAUDE.md.",
      "Option D is correct because Claude Code relies on the frontmatter description field to match user prompt intent to the Skill; a generic description fails semantic evaluation, preventing activation."
    ],
    "rationale": "Claude Code matches user prompts to Skills using the name and description fields defined in the Skill's YAML frontmatter (SKILL.md). When the description is overly vague (such as 'Utility script tool'), Claude Code's semantic router cannot determine that the Skill is relevant to specific tasks like database migrations, causing it to bypass the Skill entirely.",
    "explanation": "Cơ chế kích hoạt Skill trong Claude Code phụ thuộc trực tiếp vào phần YAML frontmatter của file SKILL.md:\n- Claude Code quét tiêu đề name và đặc biệt là nội dung trường description để thực hiện khớp ý định ngữ nghĩa (semantic intent matching) với yêu cầu từ người dùng.\n- Khi description chỉ được ghi chung chung như description: Utility script tool, bộ định tuyến ý định của Claude Code không đủ thông tin ngữ nghĩa để nhận biết Skill này liên quan đến các tác vụ như 'generate database migration script'. Kết quả là Skill không bao giờ được tự động kích hoạt.\n\nPhân tích từng lựa chọn:\n- Đáp án A sai: applyTo dùng để giới hạn phạm vi áp dụng theo file pattern khi thao tác, không phải điều kiện tiên quyết để Claude Code phát hiện/index Skill theo intent.\n- Đáp án B sai: Skill được thiết kế để tự động kích hoạt dựa trên semantic matching từ câu lệnh tự nhiên, không bắt buộc người dùng phải gõ tên lệnh dưới dạng /db-migrate.\n- Đáp án C sai: Các Skill đặt trong .claude/skills/ tự động được quét và phát hiện, không cần khai báo chỉ thị @import trong CLAUDE.md.\n- Đáp án D ĐÚNG: Trường description quá mơ hồ khiến hệ thống khớp ý định không thể liên kết câu hỏi của người dùng với Skill, làm cho Skill bị bỏ qua.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  }
]