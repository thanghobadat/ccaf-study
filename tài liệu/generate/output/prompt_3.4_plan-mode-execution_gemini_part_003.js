[
  {
    "id": "d3-b07-3.4-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-005",
    "scenarioSignature": {
      "testedPrinciple": "plan mode read-only proposal isolation under permission bypass flags",
      "failureMode": "unexpected block waiting for manual plan review",
      "rootCause": "assuming permission bypass flag forces auto-execution of plan mode proposals",
      "requiredFix": "review and approve plan manually or switch to headless non-interactive execution"
    },
    "questionEN": "A DevOps engineer executes Claude Code using claude --dangerously-skip-permissions and enters Plan Mode using /plan to refactor services/payment-db/migrate.ts. The engineer expects that passing --dangerously-skip-permissions will automatically execute the generated plan upon creation without requiring manual review. How do Plan Mode and --dangerously-skip-permissions actually interact in this context?",
    "question": "[d3-b07-3.4-005] Một kỹ sư DevOps khởi chạy Claude Code với cờ claude --dangerously-skip-permissions và kích hoạt Plan Mode bằng lệnh /plan để tái cấu trúc file services/payment-db/migrate.ts. Kỹ sư này kỳ vọng rằng cờ --dangerously-skip-permissions sẽ tự động thực thi kế hoạch được tạo ra mà không cần phê duyệt thủ công. Plan Mode và --dangerously-skip-permissions tương tác thực sự như thế nào trong ngữ cảnh này?",
    "optionsEN": [
      "A. Plan Mode strictly limits Claude Code to generating a proposed execution plan without making file modifications or running commands; --dangerously-skip-permissions remains inactive during planning and only bypasses approval prompts after the developer manually approves the plan for execution.",
      "B. Passing --dangerously-skip-permissions overrides Plan Mode safety controls, causing Claude Code to immediately apply all proposed diffs and execute bash commands without presenting an interactive plan review.",
      "C. Plan Mode disables --dangerously-skip-permissions globally for the session, forcing individual tool permission prompts even after the user approves the execution phase.",
      "D. --dangerously-skip-permissions converts Plan Mode into a non-interactive headless background process that writes changes directly to disk while suppressing terminal plan output."
    ],
    "options": [
      "A. Plan Mode giới hạn nghiêm ngặt Claude Code ở việc tạo kế hoạch đề xuất mà không thay đổi file hoặc chạy lệnh; --dangerously-skip-permissions không có hiệu lực trong giai đoạn lập kế hoạch và chỉ bỏ qua các yêu cầu phê duyệt công cụ sau khi nhà phát triển phê duyệt kế hoạch để thực thi thủ công.",
      "B. Việc truyền --dangerously-skip-permissions ghi đè các cơ chế kiểm soát an toàn của Plan Mode, khiến Claude Code áp dụng ngay lập tức tất cả các diff đề xuất và thực thi lệnh bash mà không trình bày giao diện xem lại kế hoạch.",
      "C. Plan Mode vô hiệu hóa --dangerously-skip-permissions trên toàn bộ phiên làm việc, buộc phải đưa ra yêu cầu phê duyệt từng công cụ ngay cả sau khi người dùng đã chấp thuận giai đoạn thực thi.",
      "D. --dangerously-skip-permissions chuyển đổi Plan Mode thành một tiến trình chạy ngầm headless không tương tác, ghi trực tiếp các thay đổi xuống đĩa trong khi ẩn đầu ra của kế hoạch trên terminal."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Plan Mode is purely proposal generation and makes zero system modifications regardless of permission flags. --dangerously-skip-permissions takes effect only during the execution phase following manual plan approval.",
      "Option B is incorrect: --dangerously-skip-permissions bypasses tool execution confirmations, but it does not bypass the Plan Mode interactive review barrier or trigger automatic plan execution.",
      "Option C is incorrect: Plan Mode does not disable session-level CLI flags; once execution is manually approved, --dangerously-skip-permissions functions normally.",
      "Option D is incorrect: --dangerously-skip-permissions does not convert interactive Plan Mode into headless execution mode (-p / --print)."
    ],
    "rationale": "Plan Mode enforces a complete separation between proposing changes and executing them. --dangerously-skip-permissions applies to tool permissions during execution, but it cannot force Plan Mode to execute proposed diffs without explicit manual user approval.",
    "explanation": "Lựa chọn A là đáp án đúng. Plan Mode (/plan) hoạt động như một giai đoạn chỉ đọc để phân tích ngữ cảnh và đề xuất kế hoạch thực thi (bao gồm các thay đổi file và lệnh bash) mà không thực sự áp dụng bất kỳ thay đổi nào xuống đĩa hay chạy lệnh. Cờ --dangerously-skip-permissions chỉ áp dụng để bỏ qua các hộp thoại xác nhận khi Claude Code gọi công cụ trong giai đoạn thực thi (execution phase). Nó không thay đổi bản chất của Plan Mode và không tự động thực thi kế hoạch mà không có sự chấp thuận thủ công của nhà phát triển. Lựa chọn B sai vì cờ này không ghi đè rào cản xem lại kế hoạch của Plan Mode. Lựa chọn C sai vì cờ không bị vô hiệu hóa sau khi chuyển sang giai đoạn thực thi. Lựa chọn D sai vì việc chuyển sang chế độ không tương tác headless yêu cầu cờ -p (--print), không phải --dangerously-skip-permissions.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  },
  {
    "id": "d3-b07-3.4-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-006",
    "scenarioSignature": {
      "testedPrinciple": "headless mode requirement for non-interactive automated ci pipelines",
      "failureMode": "ci job timeout due to indefinite hanging on stdin approval prompt",
      "rootCause": "invoking interactive plan mode inside headless non-tty pipeline step",
      "requiredFix": "replace plan mode with non-interactive headless execution flag"
    },
    "questionEN": "A Site Reliability Engineer configures a GitHub Actions pipeline step in .github/workflows/deploy.yml executing claude /plan \"Update API schema in src/schema.ts\" to automate daily schema synchronization. The workflow job hangs indefinitely until it hits a 60-minute job timeout. What is the root cause of this failure and the correct remediation?",
    "question": "[d3-b07-3.4-006] Một kỹ sư Site Reliability (SRE) cấu hình một bước trong pipeline GitHub Actions tại .github/workflows/deploy.yml chạy lệnh claude /plan \"Update API schema in src/schema.ts\" để tự động hóa việc đồng bộ hóa schema hàng ngày. Job của workflow bị treo vô thời hạn cho đến khi chạm ngưỡng timeout 60 phút. Nguyên nhân gốc rễ của sự cố này và biện pháp khắc phục đúng là gì?",
    "optionsEN": [
      "A. Plan Mode requires explicit root privileges inside Docker CI containers; the workflow step must prefix the command with sudo claude /plan.",
      "B. Plan Mode is designed for interactive sessions and blocks indefinitely waiting for user plan review on stdin; the pipeline must use headless mode with claude -p \"Update API schema in src/schema.ts\".",
      "C. Plan Mode cannot parse multi-line schema files in CI environments; the pipeline must export CLAUDE_NON_INTERACTIVE=true while keeping /plan.",
      "D. Plan Mode requires network webhooks to post diff approvals to GitHub PRs; the pipeline must configure a GitHub App token before issuing /plan."
    ],
    "options": [
      "A. Plan Mode yêu cầu quyền root rõ ràng bên trong container Docker CI; bước workflow phải thêm tiền tố sudo claude /plan.",
      "B. Plan Mode được thiết kế cho các phiên làm việc tương tác và sẽ treo vô thời hạn để chờ người dùng xem xét kế hoạch trên stdin; pipeline phải sử dụng chế độ headless với claude -p \"Update API schema in src/schema.ts\".",
      "C. Plan Mode không thể phân tích các file schema nhiều dòng trong môi trường CI; pipeline phải xuất biến CLAUDE_NON_INTERACTIVE=true trong khi vẫn giữ nguyên /plan.",
      "D. Plan Mode yêu cầu các webhook mạng để gửi phê duyệt diff tới GitHub PR; pipeline phải cấu hình token GitHub App trước khi gọi /plan."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Root privileges do not alter the interactive nature of Plan Mode or supply input to stdin in headless environments.",
      "Option B is correct: Plan Mode requires interactive user intervention (stdin) to review and accept the plan before execution. Automated non-interactive environments like CI pipelines must use headless mode (-p / --print).",
      "Option C is incorrect: CLAUDE_NON_INTERACTIVE=true is not a valid environment variable to bypass Plan Mode's interactive prompt; headless mode (-p) is required.",
      "Option D is incorrect: Webhooks and GitHub App tokens do not unblock interactive terminal stdin prompts in CI runners."
    ],
    "rationale": "Plan Mode is fundamentally an interactive developer workflow feature that blocks execution waiting for manual approval on stdin. In automated CI/CD pipelines where no interactive TTY exists, Claude Code must be run using headless mode (-p), which processes prompts non-interactively to completion.",
    "explanation": "Lựa chọn B là đáp án đúng. Plan Mode (/plan) là một tính năng tương tác được thiết kế cho lập trình viên xem và duyệt kế hoạch trực tiếp trong terminal. Khi chạy trong môi trường tự động hóa như CI/CD (GitHub Actions), không có TTY/người dùng nhập liệu qua stdin, lệnh sẽ bị treo vô hạn chờ phê duyệt dẫn đến timeout. Để tự động hóa trong CI/CD, phải dùng chế độ headless không tương tác với cờ -p (claude -p \"...\"). Lựa chọn A sai vì sudo không giải quyết được vấn đề thiếu tương tác qua stdin. Lựa chọn C sai vì không có biến môi trường nào biến /plan thành không tương tác. Lựa chọn D sai vì webhook không phải nguyên nhân khiến terminal bị treo ở bước nhập liệu stdin.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  }
]