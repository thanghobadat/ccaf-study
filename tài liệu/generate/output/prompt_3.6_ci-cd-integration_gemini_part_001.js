[
  {
    "id": "d3-b07-new-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-001",
    "scenarioSignature": {
      "testedPrinciple": "permission bypass execution environment scoping",
      "failureMode": "credential exposure and persistent workstation tampering risk",
      "rootCause": "executing unprompted headless flags on non isolated persistent host systems",
      "requiredFix": "restrict permission bypass flags strictly to isolated disposable runner containers"
    },
    "questionEN": "A lead engineer notices a developer running CLI commands on their local macOS workstation with --dangerously-skip-permissions to streamline batch refactoring scripts. The security team mandates removing the flag locally, even though it is permitted in the company's GitHub Actions pipeline. Why is --dangerously-skip-permissions acceptable in ephemeral CI runners but considered a critical security vulnerability on local developer workstations?",
    "question": "[d3-b07-new-001] Một kỹ sư trưởng phát hiện một lập trình viên đang chạy các lệnh CLI trên máy trạm macOS cá nhân với cờ --dangerously-skip-permissions để đơn giản hóa các kịch bản refactor hàng loạt. Đội ngũ an ninh mạng yêu cầu xóa cờ này trên máy trạm nội bộ, mặc dù cờ này vẫn được phép sử dụng trong pipeline GitHub Actions của công ty. Tại sao --dangerously-skip-permissions có thể chấp nhận được trong các CI runner ngắn hạn (ephemeral) nhưng lại bị coi là lỗ hổng an ninh nghiêm trọng trên máy trạm của lập trình viên?",
    "optionsEN": [
      "A. Ephemeral CI runners operate in isolated, short-lived containers where unprompted file mutations affect only disposable environment states, whereas developer workstations contain persistent local credentials, SSH keys, and uncommitted code accessible without isolation.",
      "B. CI runners automatically sandbox all shell command tool executions at the kernel level, whereas local workstations execute commands directly in user space without process isolation.",
      "C. --dangerously-skip-permissions automatically disables network access in CI pipelines to prevent data exfiltration, but retains full internet access when run on local machines.",
      "D. Local developer workstations require OAuth refresh tokens that are invalidated whenever interactive permission checks are bypassed, causing local authentication session drops."
    ],
    "options": [
      "A. Các CI runner ngắn hạn hoạt động trong môi trường container độc lập, tự hủy sau khi hoàn thành nhiệm vụ, nơi các thao tác ghi tệp không qua xác nhận chỉ ảnh hưởng đến trạng thái dùng một lần; trong khi máy trạm của lập trình viên chứa credential cá nhân, SSH key và mã nguồn chưa commit có thể truy cập mà không có sự cách ly.",
      "B. Các CI runner tự động đóng gói tất cả các công cụ lệnh shell ở cấp nhân hệ điều hành, trong khi máy trạm nội bộ thực thi trực tiếp ở vùng nhớ người dùng mà không có sự cách ly tiến trình.",
      "C. --dangerously-skip-permissions tự động vô hiệu hóa truy cập mạng trong CI pipeline để ngăn chặn rò rỉ dữ liệu, nhưng vẫn giữ nguyên kết nối internet khi chạy trên máy cục bộ.",
      "D. Máy trạm của lập trình viên yêu cầu các OAuth refresh token và chúng sẽ bị thu hồi bất cứ khi nào trình kiểm tra quyền tương tác bị bỏ qua, dẫn đến việc mất phiên đăng nhập nội bộ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because ephemeral CI runners execute inside disposable, sandboxed environments where untrusted tool executions cannot alter persistent host assets. On local workstations, bypassing permission prompts exposes sensitive local files, SSH credentials, and long-lived API tokens to potential execution risks.",
      "Option B is incorrect because --dangerously-skip-permissions does not change kernel-level process isolation; CI isolation is provided by the container infrastructure itself, not by the Claude CLI flag.",
      "Option C is incorrect because --dangerously-skip-permissions only bypasses tool confirmation prompts and does not disable network access or restrict internet telemetry in CI.",
      "Option D is incorrect because bypassing permission prompts does not invalidate OAuth tokens or drop authentication sessions on local machines."
    ],
    "rationale": "The --dangerously-skip-permissions flag bypasses all safety verification prompts before executing shell commands or editing files. In disposable CI runners, execution scope is confined to isolated ephemeral containers. On local workstations, unprompted execution presents severe security risks to persistent host resources, user credentials, and SSH keys.",
    "explanation": "Đáp án A đúng vì các CI runner ngắn hạn (ephemeral) hoạt động trong môi trường container cách ly hoàn toàn và bị hủy bỏ sau khi workflow kết thúc. Do đó, việc bỏ qua các bước xác nhận bằng cờ --dangerously-skip-permissions chỉ tác động đến môi trường tạm thời. Ngược lại, trên máy trạm cá nhân của lập trình viên, cờ này cho phép AI thực hiện các thao tác đọc/ghi tệp hoặc chạy lệnh shell mà không cần con người xác nhận, đe dọa trực tiếp đến các dữ liệu nhạy cảm như SSH key, token cá nhân và mã nguồn chưa commit.\nĐáp án B sai vì cờ CLI không can thiệp vào cơ chế cách ly nhân (kernel sandbox) của hệ điều hành.\nĐáp án C sai vì cờ này không quản lý hay ngắt kết nối mạng của công cụ.\nĐáp án D sai vì việc bỏ qua xác nhận quyền không tác động làm hủy bỏ hay vô hiệu hóa OAuth token của người dùng.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-002",
    "scenarioSignature": {
      "testedPrinciple": "headless pipeline authentication requirement",
      "failureMode": "pipeline execution abort with authentication error",
      "rootCause": "missing api key environment variable in pipeline secret settings",
      "requiredFix": "configure api key as masked secret variable in pipeline settings"
    },
    "questionEN": "A DevOps team deploys a new GitLab CI pipeline to run automated code reviews using claude -p 'Review changed files' --output-format json. Upon execution, the pipeline stage immediately fails during the command invocation step with an HTTP 401 Unauthorized error, despite Claude Code functioning correctly on local developer machines. What is the root cause of this pipeline failure?",
    "question": "[d3-b07-new-002] Một đội ngũ DevOps triển khai pipeline GitLab CI mới để thực hiện tự động hóa review mã nguồn bằng lệnh claude -p 'Review changed files' --output-format json. Khi chạy, bước thực thi pipeline thất bại ngay lập tức ở câu lệnh Claude với lỗi HTTP 401 Unauthorized, mặc dù Claude Code vẫn hoạt động bình thường trên máy tính cá nhân của các lập trình viên. Nguyên nhân gốc rễ của thất bại này là gì?",
    "optionsEN": [
      "A. The --output-format json flag requires an explicit enterprise license key passed via --license-key in headless environments.",
      "B. The ANTHROPIC_API_KEY environment variable was not configured in the repository's CI/CD secret variables, preventing the headless CLI process from authenticating with the API.",
      "C. GitLab CI runner IP addresses are blocked by default unless --allow-ci-origin is included in the non-interactive CLI parameters.",
      "D. The non-interactive prompt -p flag defaults to an invalid mock authentication context if the user configuration file ~/.claude.json is missing from the container image."
    ],
    "options": [
      "A. Cờ --output-format json yêu cầu khóa bản quyền doanh nghiệp được truyền qua --license-key khi hoạt động trong môi trường headless.",
      "B. Biến môi trường ANTHROPIC_API_KEY chưa được cấu hình trong mục bí mật (CI/CD secrets) của repository, khiến tiến trình CLI không thể xác thực với API.",
      "C. Địa chỉ IP của GitLab CI runner bị chặn theo mặc định trừ khi cờ --allow-ci-origin được thêm vào các tham số CLI phi tương tác.",
      "D. Cờ câu lệnh phi tương tác -p mặc định sử dụng bối cảnh xác thực giả lập bị lỗi nếu tệp cấu hình người dùng ~/.claude.json không tồn tại trong container image."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because --output-format json is a standard CLI flag that does not require an enterprise license key.",
      "Option B is correct because non-interactive headless CLI execution in CI environments relies on the ANTHROPIC_API_KEY environment variable. If the variable is missing from CI secrets, API requests return HTTP 401 Unauthorized.",
      "Option C is incorrect because Claude Code does not restrict CI runner IP addresses or require an --allow-ci-origin flag.",
      "Option D is incorrect because -p does not create mock authentication; it fails cleanly with HTTP 401 when valid credentials/API keys are missing from the environment."
    ],
    "rationale": "In headless CI/CD environments where interactive OAuth login (claude login) cannot take place, Claude Code relies on the ANTHROPIC_API_KEY environment variable to authenticate requests. Without this secret variable set in the CI runner environment, requests to Anthropic endpoints return an HTTP 401 Unauthorized error.",
    "explanation": "Đáp án B đúng vì trong các môi trường CI/CD không có giao diện tương tác (headless), Claude Code phụ thuộc hoàn toàn vào biến môi trường ANTHROPIC_API_KEY được truyền vào runner để xác thực các yêu cầu API. Khi thiếu biến này trong phần cấu hình bí mật (CI/CD secrets) của dự án, mọi yêu cầu gửi tới dịch vụ Anthropic sẽ bị từ chối với lỗi HTTP 401 Unauthorized.\nĐáp án A sai vì cờ --output-format json là tính năng mặc định để trả về kết quả JSON, không yêu cầu cờ bản quyền doanh nghiệp.\nĐáp án C sai vì Anthropic không chặn IP của các CI runner cũng như không có cờ --allow-ci-origin.\nĐáp án D sai vì cờ -p không giả lập xác thực; nó yêu cầu API key hợp lệ được cung cấp qua môi trường hệ thống.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]