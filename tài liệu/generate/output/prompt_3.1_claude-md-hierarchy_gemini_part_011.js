[
  {
    "id": "d3-b06-new-021",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-21",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-021",
    "scenarioSignature": {
      "testedPrinciple": "version control scope of project level versus global configuration files",
      "failureMode": "inability to share project rules across team members due to missing repository configuration",
      "rootCause": "storing shared rules in personal global settings instead of project repository",
      "requiredFix": "commit project configuration file inside repository to version control"
    },
    "questionEN": "An engineering team establishes shared coding guidelines and test commands (npm run test) for a multi-developer repository. Developer A adds personal response formatting preferences to ~/.claude/CLAUDE.md, while Developer B creates project instructions in /repo/.claude/CLAUDE.md. When onboarding a new engineer to the team, the team lead notices that project build and test instructions are missing from the cloned workspace. Which file should be committed to Git to ensure project rules are shared across all team members, and why?",
    "question": "[d3-b06-new-021] Một đội ngũ kỹ sư thiết lập các hướng dẫn lập trình chung và lệnh kiểm thử (npm run test) cho một kho chứa có nhiều nhà phát triển. Lập trình viên A thêm các tùy chọn định dạng phản hồi cá nhân vào ~/.claude/CLAUDE.md, trong khi Lập trình viên B tạo hướng dẫn dự án tại /repo/.claude/CLAUDE.md. Khi hướng dẫn một kỹ sư mới gia nhập đội, trưởng nhóm nhận thấy các hướng dẫn build và test của dự án bị thiếu trong không gian làm việc vừa nhân bản (clone). Tệp nào nên được commit vào Git để đảm bảo các quy tắc của dự án được chia sẻ cho tất cả thành viên trong đội, và tại sao?",
    "optionsEN": [
      "A. /repo/.claude/CLAUDE.md should be committed because repository-level configuration files inside the project tree are version-controlled and shared across the team, whereas ~/.claude/CLAUDE.md is personal to the user's home directory and tracked outside Git.",
      "B. ~/.claude/CLAUDE.md should be committed because global configuration files override project-level instructions and must be stored in the root git branch to take effect.",
      "C. Both /repo/.claude/CLAUDE.md and ~/.claude/CLAUDE.md must be committed using a symbolic link to ensure individual preferences and project rules stay synchronized across remote clones.",
      "D. Neither file can be committed to Git because Claude Code configuration files are restricted to local session memory and must be configured using environment variables in CI/CD pipelines."
    ],
    "options": [
      "A. /repo/.claude/CLAUDE.md nên được commit vì các tệp cấu hình cấp kho chứa bên trong cây thư mục dự án nằm dưới sự quản lý phiên bản và được chia sẻ cho cả đội, trong khi ~/.claude/CLAUDE.md là cá nhân thuộc thư mục trang chủ người dùng và nằm ngoài Git.",
      "B. ~/.claude/CLAUDE.md nên được commit vì tệp cấu hình toàn cục ghi đè các hướng dẫn cấp dự án và phải được lưu ở nhánh git gốc để có hiệu lực.",
      "C. Cả /repo/.claude/CLAUDE.md và ~/.claude/CLAUDE.md đều phải được commit bằng liên kết mềm (symbolic link) để đảm bảo tùy chọn cá nhân và quy tắc dự án luôn đồng bộ trên các bản clone từ xa.",
      "D. Không tệp nào có thể commit vào Git vì tệp cấu hình Claude Code bị giới hạn trong bộ nhớ phiên cục bộ và phải được cấu hình bằng biến môi trường trong đường ống CI/CD."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Files placed inside the repository hierarchy (/repo/CLAUDE.md or /repo/.claude/CLAUDE.md) are intended to be checked into version control so all collaborators inherit project conventions. In contrast, ~/.claude/CLAUDE.md is stored in the individual developer's home directory for user-specific preferences and is never committed to project repositories.",
      "Option B is incorrect: Global settings in ~/.claude/CLAUDE.md do not override project-level rules (project rules win on conflict) and cannot be tracked by git inside a project repository.",
      "Option C is incorrect: Symlinking user home directory configurations into git is improper practice and breaks versioning across different developers' local environments.",
      "Option D is incorrect: Project-level CLAUDE.md files are designed specifically to be committed to version control and read directly by Claude Code CLI during repository sessions."
    ],
    "rationale": "Project-level Claude Code configuration files located in /repo/CLAUDE.md or /repo/.claude/CLAUDE.md reside within the working tree of the repository and are designed to be committed to Git. This allows team-wide conventions, build scripts, and workflow rules to be shared across all developers. Global configurations in ~/.claude/CLAUDE.md reside outside the git working tree in the user's home folder and contain personal preferences that should not be shared or committed.",
    "explanation": "Tệp cấu hình Claude Code cấp dự án nằm tại /repo/CLAUDE.md hoặc /repo/.claude/CLAUDE.md nằm trong cây thư mục của kho chứa và được thiết kế để commit vào hệ thống quản lý phiên bản Git. Điều này giúp chia sẻ các quy chuẩn dự án, kịch bản build và quy trình làm việc cho tất cả lập trình viên. Ngược lại, tệp toàn cục ~/.claude/CLAUDE.md nằm ngoài kho chứa Git (trong thư mục cá nhân của người dùng) chứa các tùy chọn cá nhân và không nên được commit vào dự án.\n\n- Lựa chọn A đúng vì phản ánh chính xác phạm vi quản lý của Git đối với cấu hình dự án so với cấu hình cá nhân toàn cục.\n- Lựa chọn B sai vì cấu hình toàn cục không ghi đè quy tắc dự án và tệp thuộc home directory không thể commit trực tiếp vào git dự án.\n- Lựa chọn C sai vì việc symlink cấu hình cá nhân vào git gây xung đột môi trường cục bộ giữa các nhà phát triển.\n- Lựa chọn D sai vì các tệp CLAUDE.md dự án hoàn toàn có thể và nên được commit vào Git.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-022",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-22",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-022",
    "scenarioSignature": {
      "testedPrinciple": "hierarchy resolution handling of empty configuration files",
      "failureMode": "incorrect expectation of rule suppression due to empty global configuration file",
      "rootCause": "assumption that empty configuration level overrides downstream project rules",
      "requiredFix": "skip empty configuration levels and apply active project rules directly"
    },
    "questionEN": "A developer initializes Claude Code on a new machine, creating an empty ~/.claude/CLAUDE.md file (0 bytes) in their home directory. In their working repository, /repo/CLAUDE.md specifies strict conventions requiring unit tests to be executed via pytest tests/unit before submitting code changes. When launching a Claude Code session inside /repo, how does the configuration resolution engine handle the empty global file, and what rules apply during the session?",
    "question": "[d3-b06-new-022] Một lập trình viên khởi tạo Claude Code trên máy tính mới, tạo một tệp ~/.claude/CLAUDE.md rỗng (0 bytes) trong thư mục cá nhân. Tại kho chứa đang làm việc, tệp /repo/CLAUDE.md chỉ định các quy chuẩn nghiêm ngặt yêu cầu chạy kiểm thử đơn vị qua pytest tests/unit trước khi gửi thay đổi mã nguồn. Khi khởi chạy một phiên Claude Code bên trong /repo, bộ công cụ xử lý cấu hình xử lý tệp toàn cục rỗng như thế nào, và quy tắc nào sẽ áp dụng trong phiên làm việc?",
    "optionsEN": [
      "A. The empty global file acts as a baseline reset mask, suppressing all project-level rules in /repo/CLAUDE.md and disabling automated test execution requirements.",
      "B. The empty global file has no effect and is simply skipped during rule merging, allowing all project-level rules in /repo/CLAUDE.md to load and apply normally.",
      "C. The configuration parser fails with a fatal error because empty configuration files violate schema validation requirements during session startup.",
      "D. The empty global file forces Claude Code to fall back to generic system prompts, ignoring both global and project directory configurations."
    ],
    "options": [
      "A. Tệp toàn cục rỗng đóng vai trò như một mặt nạ đặt lại baseline, xóa bỏ tất cả các quy tắc cấp dự án trong /repo/CLAUDE.md và vô hiệu hóa yêu cầu chạy kiểm thử tự động.",
      "B. Tệp toàn cục rỗng không có ảnh hưởng và đơn giản bị bỏ qua trong quá trình hợp nhất quy tắc, cho phép tất cả các quy tắc cấp dự án trong /repo/CLAUDE.md nạp và áp dụng bình thường.",
      "C. Bộ phân tích cấu hình báo lỗi nghiêm trọng vì các tệp cấu hình rỗng vi phạm yêu cầu xác thực lược đồ (schema validation) khi khởi chạy phiên.",
      "D. Tệp toàn cục rỗng buộc Claude Code phải quay về các prompt hệ thống mặc định, bỏ qua cả cấu hình toàn cục lẫn cấu hình thư mục dự án."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: An empty file at any level of the CLAUDE.md hierarchy does not suppress or mask rules defined at other hierarchy levels.",
      "Option B is correct: Missing or completely empty configuration files in the hierarchy hierarchy are simply skipped during evaluation. The rules are additive, so non-conflicting rules from available levels (in this case /repo/CLAUDE.md) load and apply without interference.",
      "Option C is incorrect: Claude Code tolerates empty or missing CLAUDE.md files gracefully without raising configuration or schema errors.",
      "Option D is incorrect: An empty global file does not clear downstream project configuration files or revert the model to uncustomized defaults."
    ],
    "rationale": "Claude Code evaluates CLAUDE.md hierarchy rules additively across global, project root, and subdirectory levels. Missing or completely empty files (0 bytes) at any level are simply ignored and skipped during resolution. An empty global file ~/.claude/CLAUDE.md does not suppress, override, or clear project rules defined in /repo/CLAUDE.md; the project-level rules remain fully active.",
    "explanation": "Claude Code đánh giá các quy tắc trong phân cấp CLAUDE.md theo cơ chế cộng dồn (additive) qua các cấp toàn cục, gốc dự án và thư mục con. Các tệp bị thiếu hoặc hoàn toàn rỗng (0 bytes) ở bất kỳ cấp nào sẽ đơn giản bị bỏ qua trong quá trình nạp cấu hình. Tệp toàn cục rỗng ~/.claude/CLAUDE.md không xóa bỏ hay đè nén các quy tắc dự án trong /repo/CLAUDE.md; các quy tắc cấp dự án vẫn giữ nguyên hiệu lực đầy đủ.\n\n- Lựa chọn A sai vì tệp rỗng không hoạt động như một mặt nạ để xóa bỏ quy tắc cấp thấp hơn.\n- Lựa chọn B đúng vì tệp rỗng được bỏ qua mà không làm gián đoạn việc nạp quy tắc từ /repo/CLAUDE.md.\n- Lựa chọn C sai vì Claude Code xử lý an toàn đối với các tệp cấu hình rỗng mà không gây lỗi parser.\n- Lựa chọn D sai vì tệp toàn cục rỗng không làm hủy bỏ cấu hình dự án để về prompt mặc định.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]