[
  {
    "id": "d3-b06-3.2-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-003",
    "scenarioSignature": {
      "testedPrinciple": "slash command runtime argument substitution via arguments variable",
      "failureMode": "command ignores trailing positional input parameters during execution",
      "rootCause": "command markdown template lacks arguments placeholder tag",
      "requiredFix": "insert arguments placeholder into slash command markdown body"
    },
    "questionEN": "A DevOps team created a custom slash command at .claude/commands/review-pr.md for their git-review-pipeline tool. The command file contains instructions for fetching pull request diffs and checking test coverage. Developers invoke the command by running /review-pr 402 target-branch. However, when executed, Claude Code processes the prompt without incorporating 402 target-branch, causing review generation to default to local unstaged git changes instead of the specified pull request. What modification to .claude/commands/review-pr.md fixes this parameter passing failure?",
    "question": "[d3-b06-3.2-003] Một đội ngũ DevOps tạo một slash command tùy chỉnh tại .claude/commands/review-pr.md cho công cụ git-review-pipeline. File lệnh chứa các hướng dẫn lấy PR diff và kiểm tra độ bao phủ kiểm thử. Các lập trình viên gọi lệnh bằng cách chạy /review-pr 402 target-branch. Tuy nhiên, khi thực thi, Claude Code xử lý prompt mà không chèn 402 target-branch, dẫn đến việc tạo review mặc định dựa trên thay đổi local git chưa commit thay vì pull request chỉ định. Thay đổi nào đối với .claude/commands/review-pr.md sẽ khắc phục lỗi truyền tham số này?",
    "optionsEN": [
      "A. Replace .claude/commands/review-pr.md with a JSON configuration file specifying \"args\": [\"pr_number\", \"target_branch\"] under the root schema.",
      "B. Add @arguments at the header of .claude/commands/review-pr.md to map command line options to system environment variables before execution.",
      "C. Include the $ARGUMENTS placeholder inside .claude/commands/review-pr.md where the runtime parameters 402 target-branch should be substituted into the prompt.",
      "D. Define an applyTo glob pattern in .claude/commands/review-pr.md matching pull_requests/* to capture input positional arguments automatically."
    ],
    "options": [
      "A. Thay thế .claude/commands/review-pr.md bằng một file cấu hình JSON chỉ định \"args\": [\"pr_number\", \"target_branch\"] dưới root schema.",
      "B. Thêm @arguments vào phần header của .claude/commands/review-pr.md để ánh xạ các tùy chọn dòng lệnh thành biến môi trường hệ thống trước khi thực thi.",
      "C. Chèn placeholder $ARGUMENTS vào bên trong .claude/commands/review-pr.md tại vị trí mà các tham số runtime 402 target-branch cần được chèn vào prompt.",
      "D. Định nghĩa một glob pattern applyTo trong .claude/commands/review-pr.md khớp với pull_requests/* để tự động ghi lại các tham số vị trí đầu vào."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Slash commands in Claude Code are defined using Markdown files rather than JSON schema files with an args array.",
      "Option B is incorrect: @arguments is not a valid directive or file reference tag for environment variable mapping in Claude Code slash command files.",
      "Option C is correct: In Claude Code custom slash commands, $ARGUMENTS acts as a placeholder that automatically receives all text passed after the command call (e.g., 402 target-branch) and injects it into the prompt.",
      "Option D is incorrect: applyTo is a YAML frontmatter property reserved for Skills (SKILL.md) to restrict automatic activation by file pattern, not for reading CLI positional arguments in slash commands."
    ],
    "rationale": "In Claude Code slash commands, $ARGUMENTS serves as the dynamic placeholder that is automatically substituted with any positional arguments passed after the command name when invoked (such as 402 target-branch). Without $ARGUMENTS in the command template markdown, command line parameters are not injected into the prompt context.",
    "explanation": "Trong Claude Code, khi định nghĩa slash command tùy chỉnh bằng file Markdown trong .claude/commands/, chuỗi $ARGUMENTS được sử dụng làm placeholder để chèn các tham số truyền vào từ dòng lệnh khi gọi lệnh (ví dụ /review-pr 402 target-branch).\n- Option A sai vì slash command không sử dụng định dạng JSON hay trường args.\n- Option B sai vì @arguments không phải là cú pháp hợp lệ để ánh xạ biến môi trường trong slash command.\n- Option C đúng vì việc thêm $ARGUMENTS vào template của slash command cho phép Claude Code chèn các giá trị tham số runtime vào vị trí mong muốn trong prompt.\n- Option D sai vì applyTo là trường frontmatter của Skills (SKILL.md) dùng để khớp file pattern, không phải để nhận tham số dòng lệnh cho slash command.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  },
  {
    "id": "d3-b06-3.2-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-004",
    "scenarioSignature": {
      "testedPrinciple": "tool restriction via skill frontmatter tools attribute",
      "failureMode": "skill execution fails when model attempts unauthorized tool invocation",
      "rootCause": "omission or misconfiguration of tools field in skill yaml frontmatter",
      "requiredFix": "specify explicit allowed tool list in skill frontmatter tools array"
    },
    "questionEN": "A security team built an automated security auditing skill in .claude/skills/security-audit/SKILL.md for their audit-sec-tool. The skill includes YAML frontmatter with name: sec-audit and description: Audit code vulnerability patterns. During execution, when Claude Code attempts to run a security scanner via bash command, the invocation fails because Claude Code is restricted from calling shell utilities. What YAML frontmatter configuration in SKILL.md controls and permits tool execution for the skill?",
    "question": "[d3-b06-3.2-004] Một đội ngũ bảo mật xây dựng một skill kiểm tra an toàn tự động trong .claude/skills/security-audit/SKILL.md cho công cụ audit-sec-tool. Skill chứa YAML frontmatter với name: sec-audit và description: Audit code vulnerability patterns. Trong quá trình thực thi, khi Claude Code cố gắng chạy một công cụ quét bảo mật thông qua lệnh bash, tác vụ thất bại vì Claude Code bị hạn chế gọi các công cụ shell. Cấu hình YAML frontmatter nào trong SKILL.md kiểm soát và cho phép thực thi công cụ cho skill này?",
    "optionsEN": [
      "A. Define allowedCmds: [\"bash\", \"grep\"] in the YAML frontmatter of SKILL.md to whitelist shell execution binaries.",
      "B. Add permissions: { executeShell: true } under the metadata block of SKILL.md to override CLI restrictions.",
      "C. Include applyTo: [\"scripts/*.sh\"] in SKILL.md frontmatter to grant script execution rights to matching file paths.",
      "D. Specify tools: [\"Bash\", \"FileView\"] in the YAML frontmatter of SKILL.md to explicitly define allowed tools for the skill."
    ],
    "options": [
      "A. Định nghĩa allowedCmds: [\"bash\", \"grep\"] trong YAML frontmatter của SKILL.md để đưa các file thực thi shell vào danh sách trắng.",
      "B. Thêm permissions: { executeShell: true } bên dưới khối metadata của SKILL.md để ghi đè các hạn chế CLI.",
      "C. Khai báo applyTo: [\"scripts/*.sh\"] trong frontmatter của SKILL.md để cấp quyền thực thi script cho các đường dẫn file phù hợp.",
      "D. Chỉ định tools: [\"Bash\", \"FileView\"] trong YAML frontmatter của SKILL.md để khai báo rõ ràng danh sách các công cụ được phép cho skill."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: allowedCmds is not a valid schema key in Skill YAML frontmatter; tool constraints are set via the tools array.",
      "Option B is incorrect: permissions object blocks do not exist in standard Skill frontmatter metadata for controlling tool execution.",
      "Option C is incorrect: applyTo is used to match file paths for auto-activating the skill, not for enabling or scoping tool execution rights.",
      "Option D is correct: In Claude Code Skills (SKILL.md), the tools YAML frontmatter field defines the exact array of permitted tools (e.g., [\"Bash\", \"FileView\"]), authorizing required tools while constraining others."
    ],
    "rationale": "In Claude Code Skills (SKILL.md), the tools list in the YAML frontmatter explicitly specifies which tools (e.g., Bash, FileView, Grep) the model is permitted to execute during skill execution. Setting tools: [\"Bash\", \"FileView\"] grants access to bash commands while maintaining security boundaries by restricting unlisted tools.",
    "explanation": "Trong Claude Code Skills (SKILL.md), trường tools trong phần YAML frontmatter được dùng để giới hạn hoặc cấp quyền cho danh sách các công cụ (như Bash, FileView, Grep, FileEdit) mà Claude Code được phép gọi trong quá trình thực thi skill đó.\n- Option A sai vì allowedCmds không phải là thuộc tính frontmatter hợp lệ trong tiêu chuẩn SKILL.md.\n- Option B sai vì thuộc tính permissions không tồn tại trong schema frontmatter của skill.\n- Option C sai vì applyTo dùng để tự động kích hoạt skill dựa trên glob pattern của file làm việc, không cấp quyền công cụ.\n- Option D đúng vì tools: [\"Bash\", \"FileView\"] xác định chính xác danh sách các tool được phép sử dụng, cho phép lệnh Bash chạy bình thường.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  }
]