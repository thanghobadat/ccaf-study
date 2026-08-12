[
  {
    "id": "d3-b07-3.4-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-007",
    "scenarioSignature": {
      "testedPrinciple": "interactive dry-run plan inspection before destructive file system mutation",
      "failureMode": "unintended file deletion targeted by broad prompt matcher",
      "rootCause": "agent generating file deletion operations for active configuration files in plan mode",
      "requiredFix": "review plan mode output list and cancel execution before filesystem modification"
    },
    "questionEN": "During a cleanup of billing-service, a software engineer asks Claude Code in Plan Mode to remove unreferenced legacy adapters under src/legacy/. Claude Code parses references and outputs an interactive execution plan displaying [DELETE] src/legacy/v1_billing.py and [DELETE] src/config/vault_creds.json. What technical mechanism allows the developer to prevent the unintended deletion of vault_creds.json?",
    "question": "[d3-b07-3.4-007] Trong quá trình dọn dẹp dự án billing-service, một kỹ sư phần mềm sử dụng Claude Code ở chế độ Plan Mode để xóa các adapter cũ không còn dùng trong src/legacy/. Claude Code phân tích các tham chiếu và xuất ra một kế hoạch thực thi tương tác hiển thị [DELETE] src/legacy/v1_billing.py và [DELETE] src/config/vault_creds.json. Cơ chế kỹ thuật nào cho phép nhà phát triển ngăn chặn việc xóa nhầm tệp vault_creds.json?",
    "optionsEN": [
      "A. Claude Code executes the file deletions in a hidden snapshot buffer upon plan creation, requiring git checkout to reverse vault_creds.json.",
      "B. Plan Mode prompts for permission after files are unlinked from the file system tree, forcing a restoration from temporary backup cache.",
      "C. Plan Mode generates a proposed set of file operations purely in memory without making API file modification calls or disk mutations, allowing the developer to review diffs and reject execution.",
      "D. Claude Code defaults to moving deleted files into .claude/trash/ during plan generation, where the developer must manually edit the manifest file to restore items."
    ],
    "options": [
      "A. Claude Code thực hiện xóa tệp trong một bộ đệm snapshot ẩn ngay khi tạo kế hoạch, yêu cầu lệnh git checkout để khôi phục vault_creds.json.",
      "B. Chế độ Plan Mode đưa ra yêu cầu cấp quyền sau khi các tệp đã bị hủy liên kết (unlink) khỏi cây hệ thống tệp, buộc phải khôi phục từ bộ nhớ tạm.",
      "C. Chế độ Plan Mode chỉ đề xuất các thao tác tệp hoàn toàn trong bộ nhớ mà không gọi API sửa đổi tệp hay thay đổi đĩa, cho phép nhà phát triển xem diff và hủy thực thi.",
      "D. Claude Code mặc định chuyển các tệp bị xóa vào thư mục .claude/trash/ trong quá trình tạo kế hoạch, nơi nhà phát triển phải sửa tệp manifest để khôi phục."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because Plan Mode operates entirely in memory without staging deleted files into snapshot buffers or modifying local git history prior to developer authorization.",
      "Option B is incorrect because Plan Mode does not unlink or delete files from disk before prompting the user; no filesystem modifications occur during plan synthesis.",
      "Option C is correct because Plan Mode generates proposed file operations as an interactive preview without executing API calls or disk writes, giving the developer full visibility to cancel execution prior to file deletion.",
      "Option D is incorrect because Plan Mode does not move files into a .claude/trash/ directory or rely on manifest file edits for restoration; no file relocation occurs during plan output."
    ],
    "rationale": "Plan Mode generates proposed file changes purely as an interactive plan without invoking tool actions that modify the local filesystem. This dry-run preview allows developers to inspect all targeted file paths (including deletions) and reject execution before any destructive disk operations occur.",
    "explanation": "Chế độ Plan Mode của Claude Code hoạt động như một quá trình xem trước (dry-run) thuần túy mà không thực hiện bất kỳ lệnh gọi API hay thao tác ghi/xóa tệp thực tế nào trên đĩa cứng. Khi tạo kế hoạch, Claude Code hiển thị danh sách các thay đổi đề xuất (bao gồm cả các lệnh xóa tệp như [DELETE] src/config/vault_creds.json). Nhà phát triển có thể kiểm tra danh sách này và từ chối/hủy bỏ kế hoạch trước khi bất kỳ tác động nào diễn ra trên hệ thống tệp. Lựa chọn A sai vì không có bộ đệm snapshot ẩn nào được tạo ra hay ghi đè. Lựa chọn B sai vì không có tệp nào bị hủy liên kết (unlink) trên đĩa trong quá trình tạo kế hoạch. Lựa chọn D sai vì Plan Mode không di chuyển tệp vào thư mục rác .claude/trash/.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  },
  {
    "id": "d3-b07-3.4-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-008",
    "scenarioSignature": {
      "testedPrinciple": "explicit developer review of proposed shell commands in plan mode output",
      "failureMode": "execution of destructive shell commands during environment reconfiguration",
      "rootCause": "agent embedding arbitrary bash execution steps inside interactive plans",
      "requiredFix": "inspect proposed shell commands in plan output prior to granting bash tool execution approval"
    },
    "questionEN": "While reconfiguring local test environments for the data-ingestion-pipeline repository using /plan mode, Claude Code generates an execution plan outlining file modifications along with a proposed shell command: bash -c \"pkill -f redis-server && rm -rf /tmp/redis-data\". What describes how Plan Mode handles this shell command to safeguard the developer environment?",
    "question": "[d3-b07-3.4-008] Khi định cấu hình lại môi trường kiểm thử cục bộ cho kho lưu trữ data-ingestion-pipeline bằng chế độ /plan, Claude Code tạo ra một kế hoạch thực thi chi tiết các tệp cần sửa đổi kèm theo lệnh shell đề xuất: bash -c \"pkill -f redis-server && rm -rf /tmp/redis-data\". Điều gì mô tả đúng cách Plan Mode xử lý lệnh shell này để bảo vệ môi trường của nhà phát triển?",
    "optionsEN": [
      "A. Plan Mode automatically executes all read-only bash commands during plan generation and prompts only when running binaries with sudo permissions.",
      "B. Claude Code executes shell commands inside an isolated subshell upon plan creation, prompting the developer to commit process side effects afterwards.",
      "C. Shell commands listed in a Plan Mode output are automatically sanitized to strip rm and pkill flags before displaying the plan summary.",
      "D. Plan Mode presents proposed shell commands as explicit text steps in the generated plan output, enabling the developer to inspect the exact script payload before authorizing execution."
    ],
    "options": [
      "A. Plan Mode tự động chạy tất cả các lệnh bash chỉ đọc trong quá trình tạo kế hoạch và chỉ yêu cầu xác nhận khi thực thi các tệp nhị phân bằng quyền sudo.",
      "B. Claude Code thực thi các lệnh shell bên trong một subshell cô lập ngay khi tạo kế hoạch, sau đó yêu cầu nhà phát triển commit các tác dụng phụ của tiến trình.",
      "C. Các lệnh shell hiển thị trong kế hoạch của Plan Mode tự động được làm sạch (sanitize) để loại bỏ các cờ rm và pkill trước khi hiển thị tóm tắt kế hoạch.",
      "D. Plan Mode hiển thị các lệnh shell đề xuất dưới dạng các bước văn bản rõ ràng trong đầu ra kế hoạch, cho phép nhà phát triển xem xét chính xác mã lệnh trước khi cho phép thực thi."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because Plan Mode does not auto-execute any bash commands during plan drafting, regardless of whether they are read-only or privileged.",
      "Option B is incorrect because Plan Mode does not run proposed commands in background subshells or isolated environments prior to explicit developer authorization.",
      "Option C is incorrect because Plan Mode displays the raw proposed shell commands without mutating or stripping parameters like rm or pkill.",
      "Option D is correct because Plan Mode explicitly renders proposed shell execution steps within the plan text preview so developers can evaluate security risks before granting command execution approval."
    ],
    "rationale": "Plan Mode includes all proposed shell execution steps in the generated execution plan without running them. This enables the developer to carefully inspect the exact command lines (such as process terminations or directory purges) before giving approval to execute the Bash tool.",
    "explanation": "Trong chế độ Plan Mode, tất cả các câu lệnh shell (như lệnh bash pkill hoặc rm) mà Claude Code dự định chạy đều được hiển thị minh bạch dưới dạng văn bản trong bản xem trước kế hoạch trước khi bất kỳ công cụ thực thi nào (Bash tool) được kích hoạt. Điều này giúp nhà phát triển xem xét và đánh giá toàn bộ rủi ro kỹ thuật cũng như tác động của lệnh shell trước khi quyết định phê duyệt hoặc từ chối thực thi kế hoạch. Lựa chọn A sai vì Plan Mode không tự động thực thi bất kỳ lệnh shell nào trong quá trình khởi tạo kế hoạch. Lựa chọn B sai vì câu lệnh không được chạy thử trong subshell cô lập. Lựa chọn C sai vì Plan Mode không tự động cắt xén hoặc sửa đổi nội dung lệnh shell đề xuất.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  }
]