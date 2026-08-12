[
  {
    "id": "d3-b07-B-021",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-21",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-021",
    "questionEN": "A DevOps team configures a GitHub Actions workflow triggered by on: pull_request to execute automated code reviews using claude -p \"Review this PR diff: $(git diff HEAD)\". Every workflow run completes successfully with exit code 0, but Claude Code consistently outputs \"No changes detected; review complete.\" even on pull requests containing hundreds of line modifications. Inspection reveals actions/checkout checks out the synthetic merge commit created for the pull request. What is the root cause of this behavior, and how should the workflow step be updated?",
    "question": "[d3-b07-B-021] Một đội ngũ DevOps cấu hình workflow GitHub Actions được kích hoạt bởi sự kiện on: pull_request để thực hiện đánh giá mã nguồn tự động bằng cách chạy claude -p \"Review this PR diff: $(git diff HEAD)\". Mỗi lần PR chạy đều hoàn tất thành công với exit code 0, nhưng Claude Code liên tục xuất ra \"No changes detected; review complete.\" ngay cả trên các PR chứa hàng trăm dòng thay đổi. Kiểm tra kỹ hơn cho thấy actions/checkout tạo ra một merge commit tổng hợp cho pull request. Nguyên nhân gốc rễ của hiện tượng này là gì và workflow cần được cập nhật như thế nào?",
    "optionsEN": [
      "A. actions/checkout checks out a clean merge commit where git diff HEAD evaluates against a clean working tree; the workflow must explicitly compare against the base branch using git diff origin/${{ github.base_ref }}...HEAD to pass the actual PR diff to claude -p.",
      "B. Claude Code requires the --git-context flag to automatically inspect pull request branches; without this flag, non-interactive mode suppresses git diff parsing.",
      "C. The github.event.pull_request payload automatically strips diff content for security reasons unless permissions: pull-requests: read is declared in the workflow step.",
      "D. The API endpoint receives truncated commit hashes during merge events, causing claude -p to fall back to an empty response mode."
    ],
    "options": [
      "A. actions/checkout thực hiện checkout một merge commit sạch trong đó git diff HEAD so sánh thư mục làm việc hiện tại với HEAD gây ra diff rỗng; workflow phải truy xuất rõ ràng git diff origin/${{ github.base_ref }}...HEAD để truyền diff thực sự của PR cho claude -p.",
      "B. Claude Code yêu cầu cờ --git-context để tự động kiểm tra các branch pull request; nếu không có cờ này, chế độ non-interactive sẽ bỏ qua việc phân tích git diff.",
      "C. Payload github.event.pull_request tự động cắt bỏ nội dung diff vì lý do bảo mật trừ khi quyền permissions: pull-requests: read được khai báo trong bước workflow.",
      "D. API endpoint nhận các mã commit hash bị rút gọn trong quá trình xử lý sự kiện merge, khiến claude -p chuyển sang chế độ phản hồi rỗng mặc định."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: In GitHub Actions pull_request workflows, actions/checkout by default checks out a synthetic merge commit (refs/pull/PR_NUMBER/merge) with a clean working tree. Running 'git diff HEAD' compares the working directory against HEAD, yielding an empty diff. Comparing target branch to HEAD using 'git diff origin/${{ github.base_ref }}...HEAD' properly captures the PR changes.",
      "Option B is incorrect: Claude Code does not feature a '--git-context' flag for automated diff extraction; git diffs must be provided explicitly via shell substitution or stdin.",
      "Option C is incorrect: GitHub workflow permission blocks control GitHub REST/GraphQL API access, not local git binary commands executing against checked-out code.",
      "Option D is incorrect: Truncated git hashes would cause git CLI commands to fail with invalid object errors rather than producing clean empty output."
    ],
    "rationale": "In CI pull request pipelines, actions/checkout checks out a synthetic merge commit with a clean working tree. Executing git diff HEAD evaluates zero changes. To pass the actual PR diff to claude -p, the workflow must explicitly compare the base branch against HEAD (git diff origin/${{ github.base_ref }}...HEAD).",
    "explanation": "Trong các workflow CI cho Pull Request trên GitHub Actions, hành động actions/checkout mặc định tải về một merge commit tổng hợp (refs/pull/PR_NUMBER/merge) với working directory sạch. Do đó, việc chạy git diff HEAD sẽ so sánh working directory hiện tại với HEAD của merge commit, dẫn đến kết quả diff hoàn toàn rỗng và Claude Code báo cáo không tìm thấy thay đổi.\\n\\nPhân tích chi tiết từng lựa chọn:\\n- Lựa chọn A (Đúng): Để lấy đúng các thay đổi trong PR, workflow cần fetch branch đích (base_ref) và so sánh rõ ràng bằng lệnh git diff origin/${{ github.base_ref }}...HEAD trước khi truyền vào claude -p.\\n- Lựa chọn B (Sai): Claude Code không có cờ --git-context để tự động trích xuất git diff trong CI; nội dung diff phải được tạo ra và truyền trực tiếp thông qua shell hoặc stdin.\\n- Lựa chọn C (Sai): Cấu hình permissions trong GitHub Actions quản lý quyền truy cập GitHub API Token chứ không ảnh hưởng đến các lệnh git CLI nội bộ chạy trong container build.\\n- Lựa chọn D (Sai): Commit hash ngắn hoặc lỗi tham chiếu hash sẽ khiến lệnh git báo lỗi (invalid object) chứ không tạo ra đầu ra rỗng một cách hợp lệ.",
    "scenarioSignature": {
      "testedPrinciple": "pull request diff calculation in automated ci workflows",
      "failureMode": "automated review process reports empty change set despite modified files",
      "rootCause": "diff command evaluates working tree of pre-merged commit state rather than target branch ref",
      "requiredFix": "explicitly diff head commit against target branch reference before passing to review process"
    },
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]