[
  {
    "id": "d3-b07-3.7-013",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-013",
    "scenarioSignature": {
      "testedPrinciple": "permission evaluation precedence rule",
      "failureMode": "required tool execution blocked by safety flag",
      "rootCause": "deny flag precedence overriding explicit allow configuration",
      "requiredFix": "remove conflicting tool from disallowed list"
    },
    "questionEN": "A DevOps automation script launches a Claude Code CLI session for database schema verification in the Payment Gateway repository using --allowedTools \"Edit,Bash\" alongside --disallowedTools \"Bash\". During the run, the agent fails to run validation scripts, throwing an error Tool 'Bash' is disabled by disallowedTools configuration. Which configuration change resolves this conflict to make the required tool available?",
    "question": "[d3-b07-3.7-013] Một kịch bản tự động hóa DevOps khởi chạy phiên Claude Code CLI để xác minh schema cơ sở dữ liệu trong kho lưu trữ Payment Gateway bằng cách dùng --allowedTools \"Edit,Bash\" cùng với --disallowedTools \"Bash\". Trong quá trình chạy, agent không thể thực thi kịch bản kiểm tra và báo lỗi Tool 'Bash' is disabled by disallowedTools configuration. Thay đổi cấu hình nào sẽ giải quyết xung đột này để công cụ cần thiết khả dụng?",
    "optionsEN": [
      "A. Remove --disallowedTools \"Bash\" from the execution parameters, because deny flags strictly take precedence over allow flags when a tool appears in both.",
      "B. Append --force-enable \"Bash\" to the CLI command to grant an explicit override for blacklisted tools.",
      "C. Place Bash inside .claudeignore to prevent rule collision between permissions flags.",
      "D. Reorder the CLI command arguments so --allowedTools \"Edit,Bash\" is evaluated after --disallowedTools \"Bash\"."
    ],
    "options": [
      "A. Loại bỏ --disallowedTools \"Bash\" khỏi các tham số thực thi, vì cờ từ chối (deny) có độ ưu tiên tuyệt đối so với cờ cho phép (allow) khi một công cụ xuất hiện ở cả hai.",
      "B. Thêm --force-enable \"Bash\" vào lệnh CLI để cấp quyền ghi đè đối với các công cụ trong danh sách đen.",
      "C. Đưa Bash vào file .claudeignore để tránh va chạm quy tắc giữa các cờ phân quyền.",
      "D. Sắp xếp lại thứ tự đối số lệnh CLI sao cho --allowedTools \"Edit,Bash\" được đánh giá sau --disallowedTools \"Bash\"."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: In Claude Code CLI safety evaluation, --disallowedTools overrides --allowedTools. When Bash is declared in both, the deny rule wins and blocks execution. Removing Bash from --disallowedTools resolves the conflict.",
      "Option B is incorrect: Claude Code CLI does not feature a --force-enable flag, and deny security constraints cannot be overridden by adding CLI modifier parameters.",
      "Option C is incorrect: .claudeignore controls file visibility context for Claude, not CLI tool permission whitelists or blacklists.",
      "Option D is incorrect: CLI argument ordering does not change flag evaluation priority; --disallowedTools always takes precedence over --allowedTools regardless of order."
    ],
    "rationale": "In Claude Code CLI permission handling, explicit deny flags (--disallowedTools) strictly take precedence over explicit allow flags (--allowedTools). Removing the conflicting tool from --disallowedTools allows --allowedTools to grant execution rights.",
    "explanation": "Trong Claude Code CLI, cơ chế đánh giá quyền tuân theo nguyên tắc từ chối tuyệt đối (deny takes precedence): cờ --disallowedTools luôn có độ ưu tiên cao hơn cờ --allowedTools. Khi công cụ Bash được khai báo ở cả hai cờ, hệ thống sẽ ưu tiên áp dụng từ chối và chặn việc gọi công cụ Bash.\n\n- Đáp án A đúng vì việc xóa Bash khỏi --disallowedTools giúp giải phóng xung đột, cho phép cờ --allowedTools \"Edit,Bash\" cấp quyền thực thi công cụ cho agent.\n- Đáp án B sai vì Claude Code CLI không hỗ trợ cờ --force-enable để ghi đè quy tắc bảo mật từ chối.\n- Đáp án C sai vì .claudeignore chỉ quản lý danh sách ẩn file khỏi ngữ cảnh của Claude, không điều khiển quyền gọi công cụ CLI.\n- Đáp án D sai vì vị trí xuất hiện của các đối số trên dòng lệnh không làm thay đổi thứ tự ưu tiên của các cờ phân quyền.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  },
  {
    "id": "d3-b07-3.7-014",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-014",
    "scenarioSignature": {
      "testedPrinciple": "ignore rule scope limitation",
      "failureMode": "secret credential leakage in repository history",
      "rootCause": "confusing model context ignore rules with repository history sanitization",
      "requiredFix": "purge secret from git history using history rewrite tools"
    },
    "questionEN": "A developer working on the AuthService repository discovers a plaintext secret AWS_SECRET_ACCESS_KEY committed in config/credentials.env. To protect the secret, the developer adds config/credentials.env to .claudeignore and commits the change. However, a subsequent Automated Security Scanner alert reports that the credential remains exposed in the remote repository. Why did adding the file to .claudeignore fail to remediate this security risk?",
    "question": "[d3-b07-3.7-014] Một nhà phát triển làm việc trên kho lưu trữ AuthService phát hiện một secret dạng văn bản thuần AWS_SECRET_ACCESS_KEY đã được commit trong config/credentials.env. Để bảo vệ secret, nhà phát triển đã thêm config/credentials.env vào .claudeignore và commit thay đổi. Tuy nhiên, cảnh báo từ Automated Security Scanner sau đó báo rằng credential vẫn bị lộ trên kho lưu trữ từ xa. Tại sao việc thêm file vào .claudeignore không khắc phục được rủi ro bảo mật này?",
    "optionsEN": [
      "A. .claudeignore requires absolute file paths; relative paths like config/credentials.env are ignored, leaving the file readable to Claude.",
      "B. .claudeignore only hides files from Claude's context window; it does not un-track files or purge historical secret commits from Git history.",
      "C. Claude Code automatically bypasses .claudeignore rules whenever environment variables or .env file patterns are specified.",
      "D. Adding paths to .claudeignore un-tracks files in Git locally, but requires git push --force to delete the commits from remote branches."
    ],
    "options": [
      "A. .claudeignore yêu cầu đường dẫn tuyệt đối; đường dẫn tương đối như config/credentials.env bị bỏ qua, khiến file vẫn có thể đọc bởi Claude.",
      "B. .claudeignore chỉ ẩn file khỏi cửa sổ ngữ cảnh của Claude; nó không hủy theo dõi (un-track) file hoặc xóa các commit lịch sử chứa secret khỏi Git history.",
      "C. Claude Code tự động bỏ qua quy tắc .claudeignore bất cứ khi nào các biến môi trường hoặc mẫu file .env được chỉ định.",
      "D. Thêm đường dẫn vào .claudeignore sẽ hủy theo dõi file trong Git ở máy cục bộ, nhưng cần git push --force để xóa các commit khỏi nhánh từ xa."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: .claudeignore supports relative paths and glob patterns relative to the project root.",
      "Option B is correct: .claudeignore controls model visibility during Claude Code interaction only. It does not alter Git repository commits or purge existing secrets from Git history.",
      "Option C is incorrect: Claude Code strictly respects .claudeignore rules regardless of file extensions or content types.",
      "Option D is incorrect: .claudeignore has no integration with Git tracking operations; it does not un-track files or modify Git staging/commits."
    ],
    "rationale": "Ignore files (.claudeignore) only filter what Claude Code can read or inspect during session interactions. They do not interact with Git tracking, un-track files, or clean historical commits containing secrets.",
    "explanation": "Cơ chế .claudeignore được thiết kế độc lập nhằm kiểm soát dữ liệu đầu vào được nạp vào context window của Claude Code trong các phiên làm việc. File này hoàn toàn không có tác động đến Git index hay lịch sử commit của hệ thống quản lý phiên bản Git.\n\n- Đáp án B đúng vì .claudeignore chỉ chặn Claude đọc/sửa file trong phiên làm việc, chứ không thể xóa các commit lịch sử đã chứa secret AWS_SECRET_ACCESS_KEY trong Git repo.\n- Đáp án A sai vì .claudeignore hỗ trợ đầy đủ đường dẫn tương đối và mẫu glob theo thư mục gốc dự án.\n- Đáp án C sai vì Claude Code tuân thủ tuyệt đối quy tắc .claudeignore mà không tự động bỏ qua đối với file .env.\n- Đáp án D sai vì .claudeignore không can thiệp vào việc un-track file trong Git hay tạo thao tác với Git repository.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  }
]