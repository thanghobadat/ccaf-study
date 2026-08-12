[
  {
    "id": "d3-b07-new-017",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-017",
    "questionEN": "A DevOps engineer configures a GitLab CI job script with AUDIT_PROMPT=\"Analyze test coverage and suggest missing unit tests\". The script executes claude -p $AUDIT_PROMPT --dangerously-skip-permissions. However, the job fails because Claude Code receives only \"Analyze\" as the argument to -p, while the remaining words are treated as unexpected positional arguments. What is the root cause of this failure and how should the script be modified?",
    "question": "[d3-b07-new-017] Một kỹ sư DevOps cấu hình kịch bản job trong GitLab CI với AUDIT_PROMPT=\"Analyze test coverage and suggest missing unit tests\". Kịch bản thực thi lệnh claude -p $AUDIT_PROMPT --dangerously-skip-permissions. Tuy nhiên, job thất bại vì Claude Code chỉ nhận được \"Analyze\" làm tham số cho -p, trong khi các từ còn lại bị đối xử như các đối số vị trí không mong muốn. Nguyên nhân gốc rễ của lỗi này là gì và kịch bản nên được sửa như thế nào?",
    "optionsEN": [
      "A. Unquoted variable expansion causes shell word splitting, passing only the first token to -p; the variable must be quoted as claude -p \"$AUDIT_PROMPT\" --dangerously-skip-permissions.",
      "B. The -p flag requires base64 encoding when prompt strings contain spaces in headless execution; the script must pipe echo \"$AUDIT_PROMPT\" | base64 to the CLI.",
      "C. Claude Code requires multi-word prompt variables in CI pipelines to use snake_case underscores instead of space delimiters.",
      "D. The --dangerously-skip-permissions flag must precede the -p prompt argument when expanding shell variables in non-interactive mode."
    ],
    "options": [
      "A. Khai triển biến không bọc trong dấu ngoặc kép gây ra phân tách từ (word splitting) của shell, chỉ truyền token đầu tiên vào -p; biến phải được bọc thành claude -p \"$AUDIT_PROMPT\" --dangerously-skip-permissions.",
      "B. Cờ -p yêu cầu mã hóa base64 khi chuỗi prompt chứa khoảng trắng trong chế độ headless; kịch bản phải pipe echo \"$AUDIT_PROMPT\" | base64 vào CLI.",
      "C. Claude Code yêu cầu các biến prompt nhiều từ trong pipeline CI phải sử dụng dấu gạch dưới snake_case thay vì ký tự khoảng trắng.",
      "D. Cờ --dangerously-skip-permissions phải đứng trước tham số prompt -p khi khai triển các biến shell trong chế độ non-interactive."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: In POSIX shell / Bash, expanding $AUDIT_PROMPT without double quotes triggers word splitting, so -p only receives 'Analyze' as its parameter while remaining words become extra command-line arguments. Enclosing in double quotes preserves the full string as a single argument.",
      "Option B is incorrect: Claude Code accepts plain-text strings for -p directly and does not expect or decode base64 input for prompt parameters.",
      "Option C is incorrect: Prompts are natural language text; replacing spaces with underscores is unnecessary and alters the semantic meaning of the prompt.",
      "Option D is incorrect: Argument order between flags like --dangerously-skip-permissions and -p does not affect how the shell expands unquoted variables."
    ],
    "rationale": "In Bash/POSIX shell scripts, expanding an environment variable without surrounding double quotes ($AUDIT_PROMPT) causes the shell to perform word splitting on whitespace. Consequently, -p receives only the first word ('Analyze'), while subsequent words are parsed as positional file arguments or invalid CLI options. Wrapping the variable in double quotes (\"$AUDIT_PROMPT\") ensures the entire prompt string is passed to -p as a single argument.",
    "explanation": "Phân tích chi tiết từng phương án:\\n- Phương án A (Đúng): Trong shell Bash/POSIX, việc mở rộng biến môi trường không dùng dấu ngoặc kép ($AUDIT_PROMPT) sẽ kích hoạt cơ chế word splitting của shell dựa trên ký tự phân cách IFS (mặc định là khoảng trắng). Do đó, -p chỉ nhận token đầu tiên ('Analyze') làm prompt, trong khi các từ phía sau trở thành các đối số CLI riêng lẻ gây ra lỗi. Việc bọc ngoặc kép \"$AUDIT_PROMPT\" bảo toàn toàn bộ chuỗi làm đối số duy nhất cho -p.\\n- Phương án B (Sai): Claude Code nhận trực tiếp chuỗi văn bản thuần túy cho tham số -p và không yêu cầu mã hóa base64.\\n- Phương án C (Sai): Prompt là câu lệnh ngôn ngữ tự nhiên; việc thay khoảng trắng bằng gạch dưới là sai về mặt cú pháp và làm thay đổi ý nghĩa của prompt.\\n- Phương án D (Sai): Thứ tự cờ không làm thay đổi cách shell phân tách từ đối với các biến chưa được bọc ngoặc kép.",
    "scenarioSignature": {
      "testedPrinciple": "shell variable quoting in non-interactive cli invocation",
      "failureMode": "cli receiving truncated prompt string and unexpected trailing arguments",
      "rootCause": "unquoted environment variable expansion undergoing shell word splitting",
      "requiredFix": "wrap target prompt environment variable in double quotes during command invocation"
    },
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-018",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-018",
    "scenarioSignature": {
      "testedPrinciple": "permission bypass flag safety context scoping",
      "failureMode": "unintended local system file modification during automated git hook execution",
      "rootCause": "applying automated permission bypass on persistent developer workstation instead of isolated ephemeral runner",
      "requiredFix": "restrict permission bypass flag to ephemeral ci runners and require interactive prompts on developer machines"
    },
    "questionEN": "A security architect reviews two proposed implementations of headless Claude Code execution: (1) a local Git pre-commit hook running on developer laptops, and (2) an automated GitHub Actions PR review workflow running on ephemeral Docker containers. The engineering team proposes adding --dangerously-skip-permissions to both scripts. How should the architect evaluate the appropriateness of --dangerously-skip-permissions across these two execution contexts?",
    "question": "[d3-b07-new-018] Một kiến trúc sư bảo mật xem xét hai đề xuất triển khai thực thi headless Claude Code: (1) một Git hook pre-commit cục bộ chạy trên máy tính cá nhân của nhà phát triển, và (2) một workflow đánh giá PR trên GitHub Actions tự động chạy trên các container Docker tạm thời (ephemeral). Nhóm kỹ thuật đề xuất thêm cờ --dangerously-skip-permissions vào cả hai kịch bản. Kiến trúc sư nên đánh giá mức độ phù hợp của --dangerously-skip-permissions giữa hai ngữ cảnh thực thi này như thế nào?",
    "optionsEN": [
      "A. The flag is appropriate for local pre-commit hooks to ensure fast commit execution, but inappropriate for CI runners where all agent actions must be interactively confirmed by a reviewer.",
      "B. The flag is appropriate for ephemeral CI runners executing in isolated sandboxed environments, but unsafe for local pre-commit hooks because it bypasses safety protections on persistent developer workstations.",
      "C. The flag is mandatory in both execution contexts whenever claude -p is used, as headless non-interactive mode throws a fatal runtime error if prompt confirmation is active.",
      "D. The flag is insecure in both contexts and should be replaced by configuring --allowedTools \"*\" in both local git hooks and CI runner scripts."
    ],
    "options": [
      "A. Cờ này phù hợp cho pre-commit hook cục bộ để đảm bảo tốc độ commit nhanh, nhưng không phù hợp cho CI runner nơi mọi hành động của agent phải được người duyệt xác nhận tương tác.",
      "B. Cờ này phù hợp cho các CI runner tạm thời thực thi trong môi trường sandbox cô lập, nhưng không an toàn cho pre-commit hook cục bộ vì nó bỏ qua các cơ chế bảo vệ an toàn trên máy trạm cố định của nhà phát triển.",
      "C. Cờ này là bắt buộc trong cả hai ngữ cảnh thực thi bất cứ khi nào dùng claude -p, vì chế độ headless non-interactive sẽ gặp lỗi fatal runtime nếu xác nhận prompt vẫn kích hoạt.",
      "D. Cờ này không an toàn ở cả hai ngữ cảnh và nên được thay thế bằng cách cấu hình --allowedTools \"*\" trong cả git hook cục bộ lẫn kịch bản CI runner."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Ephemeral CI runners cannot answer interactive prompts and run in disposable sandboxes where automated execution is expected; conversely, local hooks shouldn't bypass workstation safety controls.",
      "Option B is correct: --dangerously-skip-permissions bypasses all confirmation checks. This is designed for sandboxed ephemeral CI runners where file changes are disposable, but dangerous on local developer workstations where unvetted AI actions could modify persistent system files or execute dangerous commands.",
      "Option C is incorrect: claude -p can run without --dangerously-skip-permissions if tool execution permissions are managed via project configuration or restricted tool lists.",
      "Option D is incorrect: --allowedTools \"*\" grants permission to all tools but does not replace the requirement for permission bypass in non-interactive CI environments, nor does it make local bypass safe."
    ],
    "rationale": "The --dangerously-skip-permissions flag bypasses all interactive confirmation prompts before tool execution. In ephemeral, isolated CI runners (like GitHub Actions containers), file changes are disposable and non-interactive automation is required, making the flag appropriate. However, on local developer workstations, bypassing permission prompts exposes the persistent local filesystem, credentials, and host environment to unvetted LLM execution risks. Therefore, local pre-commit hooks should maintain interactive or strictly scoped tool permissions, whereas CI runners utilize the flag safely within sandboxed boundaries.",
    "explanation": "Phân tích chi tiết từng phương án:\n- Phương án A (Sai): CI runner là môi trường tự động hóa không có người dùng tương tác để xác nhận prompt; do đó cờ này là cần thiết cho CI chứ không phải ngược lại.\n- Phương án B (Đúng): Cờ --dangerously-skip-permissions bỏ qua toàn bộ các bước xác nhận quyền trước khi thực thi công cụ. Mức độ an toàn của nó phụ thuộc vào ngữ cảnh môi trường: trên CI runner tạm thời (ephemeral) được cô lập trong container, mọi thay đổi tệp chỉ tồn tại trong thời gian chạy của job nên việc bỏ qua xác nhận là an toàn và cần thiết để tự động hóa pipeline. Ngược lại, trên máy trạm cục bộ của lập trình viên (chạy pre-commit hook), môi trường chứa dữ liệu nhạy cảm cố định; việc bỏ qua xác nhận có thể khiến LLM thực thi các lệnh hệ thống hoặc sửa đổi tệp không mong muốn mà không được phê duyệt.\n- Phương án C (Sai): claude -p vẫn có thể hoạt động mà không cần cờ này nếu các công cụ được phê duyệt trước qua cấu hình dự án hoặc danh sách cho phép cụ thể.\n- Phương án D (Sai): Cấu hình --allowedTools \"*\" cấp quyền cho tất cả các công cụ nhưng không thay thế hoàn toàn cơ chế bypass permission trong môi trường CI headless, và cũng không làm cho việc chạy bypass cục bộ trở nên an toàn.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]