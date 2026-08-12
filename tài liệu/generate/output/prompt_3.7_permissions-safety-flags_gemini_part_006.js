[
  {
    "id": "d3-b07-3.7-011",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-011",
    "scenarioSignature": {
      "testedPrinciple": "project level safety exclusion configuration",
      "failureMode": "sensitive file exposure in team context logs",
      "rootCause": "exclusion pattern defined in user level configuration",
      "requiredFix": "commit project root level ignore file"
    },
    "questionEN": "In the PaymentGateway repository, developer Alice added sensitive test environment credentials in config/local_keys.json to her personal user configuration (/.claude/config.json) to prevent Claude Code from reading them. When developer Bob clones the repository and runs claude to review a pull request, Claude reads config/local_keys.json and includes raw API secret strings in context logs. What is the root cause of this exposure, and how should the team enforce safety exclusions project-wide?",
    "question": "[d3-b07-3.7-011] Trong kho lưu trữ PaymentGateway, nhà phát triển Alice đã thêm các thông số xác thực môi trường kiểm thử nhạy cảm trong config/local_keys.json vào cấu hình người dùng cá nhân của cô ấy (/.claude/config.json) để ngăn Claude Code đọc chúng. Khi nhà phát triển Bob nhân bản kho lưu trữ và chạy claude để xem xét một pull request, Claude đã đọc config/local_keys.json và đưa các chuỗi bí mật API thô vào nhật ký ngữ cảnh. Nguyên nhân gốc rễ của sự cố lộ thông tin này là gì và đội ngũ nên thực thi các loại trừ an toàn trên toàn dự án như thế nào?",
    "optionsEN": [
      "A. Bob failed to set the environment variable CLAUDE_SAFETY_MODE=strict, which defaults to inheriting root directory access permissions.",
      "B. The user-level configuration overrides repository settings, requiring Bob to manually sync user configuration files from Alice's workstation.",
      "C. The exclusion rule was stored in user-level configuration rather than committed project policy; the team must commit a root-level .claudeignore file containing config/local_keys.json.",
      "D. Git tracking was enabled on config/local_keys.json, which automatically bypasses all Claude Code file exclusion rules regardless of configuration scope."
    ],
    "options": [
      "A. Bob đã không thiết lập biến môi trường CLAUDE_SAFETY_MODE=strict, mặc định kế thừa quyền truy cập thư mục gốc.",
      "B. Cấu hình cấp người dùng ghi đè lên thiết lập kho lưu trữ, yêu cầu Bob phải đồng bộ thủ công các tệp cấu hình người dùng từ máy làm việc của Alice.",
      "C. Quy tắc loại trừ được lưu trong cấu hình cấp người dùng thay vì chính sách dự án được cam kết; đội ngũ phải cam kết tệp .claudeignore ở cấp thư mục gốc chứa config/local_keys.json.",
      "D. Theo dõi Git đã được bật trên config/local_keys.json, điều này tự động bỏ qua tất cả các quy tắc loại trừ tệp của Claude Code bất kể phạm vi cấu hình."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because CLAUDE_SAFETY_MODE=strict is not a valid Claude Code environment variable for file exclusion scoping.",
      "Option B is incorrect because user-level configuration does not take precedence over committed project rules for other users, nor should team members manually sync user config files.",
      "Option C is correct because user configuration in ~/.claude/config.json is isolated to Alice's local machine; committing a root-level .claudeignore ensures all team members and automated runs enforce the safety exclusion.",
      "Option D is incorrect because .claudeignore rules successfully hide files from Claude Code's context window even if those files are tracked in Git."
    ],
    "rationale": "User configuration in /.claude/config.json applies only to the individual developer's machine and is not shared when teammates clone the repository. To establish project-wide safety exclusions that protect all developers and automated workflows, exclusion patterns like config/local_keys.json must be placed in a committed .claudeignore file at the repository root.",
    "explanation": "Nguồn gốc của vấn đề là việc thiết lập loại trừ trong tệp cấu hình cá nhân (/.claude/config.json) chỉ áp dụng cho máy tính của Alice và không được chia sẻ khi các thành viên khác nhân bản kho lưu trữ.\n\n- Option A sai vì CLAUDE_SAFETY_MODE=strict không phải là biến môi trường hợp lệ để điều khiển phạm vi bỏ qua tệp của Claude Code.\n- Option B sai vì cấu hình cá nhân không áp dụng cho người dùng khác, và việc chia sẻ thủ công tệp cấu hình cá nhân không phải là phương pháp quản lý chính sách nhóm.\n- Option C đúng vì để áp dụng chính sách loại trừ an toàn cho toàn bộ đội ngũ và quy trình tự động, loại trừ phải được định nghĩa trong tệp .claudeignore ở thư mục gốc của dự án và được commit vào VCS.\n- Option D sai vì .claudeignore ngăn Claude Code đọc tệp bất kể tệp đó có đang được Git theo dõi hay không.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  },
  {
    "id": "d3-b07-3.7-012",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-012",
    "questionEN": "A DevOps engineer configures a GitHub Actions workflow in the AuthService repository to automatically run claude for pull request code reviews. The engineer copies the local development invocation command line claude --allowedTools \"Bash,Write,Edit,Read\" into the workflow step. During a pull request execution from a third-party contribution, the CI agent uses Bash to run shell commands that modify .github/workflows/deploy.yml. What principle was violated, and how should the workflow command line be corrected?",
    "question": "[d3-b07-3.7-012] Một kỹ sư DevOps cấu hình quy trình GitHub Actions trong kho lưu trữ AuthService để tự động chạy claude nhằm đánh giá mã nguồn pull request. Kỹ sư đã sao chép dòng lệnh gọi phát triển cục bộ claude --allowedTools \"Bash,Write,Edit,Read\" vào bước quy trình. Trong quá trình thực thi pull request từ một đóng góp bên thứ ba, tác vụ CI đã sử dụng Bash để chạy các lệnh shell làm thay đổi .github/workflows/deploy.yml. Nguyên tắc nào đã bị vi phạm và dòng lệnh quy trình nên được sửa lại như thế nào?",
    "optionsEN": [
      "A. The workflow violated Git branch protection rules; enable enforcement of signed commits on the default branch to block file edits.",
      "B. The agent lacked explicit directory scoping; add --root-dir .github/workflows to lock file access to workflow definitions.",
      "C. The execution environment omitted timeout flags; append --max-steps 5 to terminate the agent before tool execution completes.",
      "D. The CI pipeline violated least privilege by inheriting interactive developer write/exec flags; scope the automated step to read-only analysis using --allowedTools \"Read\"."
    ],
    "options": [
      "A. Quy trình đã vi phạm các quy tắc bảo vệ nhánh Git; bật bắt buộc commit có chữ ký số trên nhánh mặc định để chặn chỉnh sửa tệp.",
      "B. Tác vụ thiếu phạm vi thư mục rõ ràng; thêm --root-dir .github/workflows để khóa quyền truy cập tệp vào các định nghĩa quy trình.",
      "C. Môi trường thực thi thiếu các cờ thời hạn; thêm --max-steps 5 để chấm dứt tác vụ trước khi việc thực thi công cụ hoàn tất.",
      "D. Quy trình CI đã vi phạm nguyên tắc quyền tối thiểu bằng cách kế thừa các cờ ghi/thực thi của nhà phát triển; giới hạn bước tự động hóa ở phân tích chỉ đọc bằng --allowedTools \"Read\"."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because Git branch protection rules operate at git push time, not during local agent file modifications inside a CI runner environment.",
      "Option B is incorrect because --root-dir is not a valid tool restriction flag and restricting to .github/workflows would not prevent modifying workflow files if write tools are allowed.",
      "Option C is incorrect because limiting execution steps (--max-steps) does not restrict the agent's capability to invoke dangerous mutation tools like Bash or Write.",
      "Option D is correct because non-interactive CI review steps should operate under the principle of least privilege, replacing broad developer flags with read-only whitelist controls like --allowedTools \"Read\" to prevent code modifications."
    ],
    "rationale": "Automated CI agents, especially those reviewing untrusted input or pull requests, must adhere to the principle of least privilege. Copying developer flags like --allowedTools \"Bash, Write, Edit, Read\" gives the agent write and execution capabilities, allowing it to modify codebase files or pipeline definitions. Restricting the agent to --allowedTools \"Read\" ensures it can perform code analysis without mutating any files.",
    "explanation": "Tác vụ tự động hóa trong CI (đặc biệt khi xem xét pull request từ các đóng góp bên ngoài) phải luôn áp dụng nguyên tắc quyền tối thiểu (Least Privilege). Việc kế thừa các cờ của nhà phát triển cá nhân bao gồm Bash và Write cho phép agent sửa đổi tệp mã nguồn hoặc cấu hình quy trình.\\n\\n- Option A sai vì quy tắc bảo vệ nhánh Git hoạt động ở thao tác push, không ngăn được agent sửa tệp cục bộ trên CI runner.\\n- Option B sai vì --root-dir không phải là cờ hạn chế công cụ hợp lệ và không ngăn được việc sửa đổi tệp nếu các công cụ ghi vẫn được cấp phép.\\n- Option C sai vì việc giới hạn số bước (--max-steps) không loại bỏ được khả năng agent gọi các công cụ thực thi shell nguy hiểm.\\n- Option D đúng vì quy trình CI tự động đánh giá mã nguồn chỉ cần quyền đọc, do đó phải giới hạn danh sách công cụ whitelisted thành chỉ đọc bằng --allowedTools \"Read\".",
    "scenarioSignature": {
      "testedPrinciple": "principle of least privilege in automated CI execution",
      "failureMode": "unauthorized pipeline configuration file modification",
      "rootCause": "ci workflow inherited broad interactive developer flags",
      "requiredFix": "restrict automated flags strictly to read only tools"
    },
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  }
]