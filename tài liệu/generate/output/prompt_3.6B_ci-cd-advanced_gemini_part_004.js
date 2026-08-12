[
  {
    "id": "d3-b07-B-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-007",
    "scenarioSignature": {
      "testedPrinciple": "transient api error handling in non-interactive continuous integration pipelines",
      "failureMode": "pipeline execution failure on temporary service unavailability",
      "rootCause": "absence of retry mechanism and exponential backoff for transient network responses",
      "requiredFix": "implement wrapper retry logic with exponential backoff for transient HTTP errors"
    },
    "questionEN": "A DevOps team runs a GitHub Actions workflow that executes claude -p \"Review code diff\" --dangerously-skip-permissions on pull requests. During a network spike, the Anthropic API returns a transient HTTP 503 Service Unavailable error. Because the pipeline step executes claude directly without error handling or retry logic, the non-zero exit code immediately marks the PR commit as failed, blocking valid PR merges. Which approach best resolves this issue?",
    "question": "[d3-b07-B-007] Một đội ngũ DevOps triển khai workflow GitHub Actions để thực thi lệnh claude -p \"Review code diff\" --dangerously-skip-permissions trên các pull request. Trong quá trình gia tăng lưu lượng mạng đột biến, Anthropic API trả về lỗi tạm thời HTTP 503 Service Unavailable. Do bước pipeline gọi trực tiếp lệnh claude mà không có cơ chế xử lý lỗi hoặc thử lại (retry logic), mã thoát khác 0 ngay lập tức đánh dấu commit PR là thất bại và chặn việc merge mã nguồn hợp lệ. Giải pháp nào sau đây xử lý triệt để sự cố này?",
    "optionsEN": [
      "A. Add --ignore-errors to the claude CLI command so that HTTP 503 errors return exit code 0 automatically.",
      "B. Increase the request timeout in CLAUDE.md using timeout: 120s so the CLI waits longer before throwing HTTP 503.",
      "C. Wrap the claude -p invocation in a shell loop or retry utility that catches non-zero exit codes, applies exponential backoff for transient 5xx errors, and retries up to 3 times before returning a failure status.",
      "D. Switch from claude -p to the Message Batches API in the CI step to process PR reviews asynchronously without HTTP calls."
    ],
    "options": [
      "A. Bổ sung cờ --ignore-errors vào lệnh CLI claude để tự động chuyển các lỗi HTTP 503 thành mã thoát 0.",
      "B. Tăng thời gian chờ yêu cầu trong tệp CLAUDE.md bằng tham số timeout: 120s để CLI chờ lâu hơn trước khi báo lỗi HTTP 503.",
      "C. Bọc lệnh claude -p trong một vòng lặp shell hoặc tiện ích retry để bắt mã thoát khác 0, áp dụng thuật toán exponential backoff cho các lỗi 5xx tạm thời và thử lại tối đa 3 lần trước khi báo lỗi pipeline.",
      "D. Chuyển đổi lệnh claude -p sang sử dụng Message Batches API trong bước CI để xử lý review PR bất đồng bộ mà không cần gọi HTTP."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because --ignore-errors is not a valid CLI option for suppressing transient network errors, and ignoring errors entirely masks genuine code review failures.",
      "Option B is incorrect because HTTP 503 is a server-side Service Unavailable response rather than a client timeout, so increasing local timeouts in CLAUDE.md does not prevent transient backend outages.",
      "Option C is correct because wrapping claude -p with wrapper retry logic and exponential backoff allows the pipeline to gracefully absorb transient 5xx API errors without failing legitimate pull request builds.",
      "Option D is incorrect because the Message Batches API is designed for non-real-time asynchronous bulk processing rather than synchronous PR review blocking gates in continuous integration."
    ],
    "rationale": "Transient HTTP 5xx responses from the API represent temporary network or server issues rather than code defects. Wrapping non-interactive CLI calls in a retry script with exponential backoff ensures pipeline resiliency while preserving failure reporting for persistent errors.",
    "explanation": "Lựa chọn C là đáp án đúng vì lỗi HTTP 503 (Service Unavailable) là lỗi tạm thời phía máy chủ Anthropic API. Việc bọc lệnh claude -p trong tiện ích retry với thuật toán exponential backoff giúp pipeline tự động thử lại khi gặp sự cố mạng tạm thời, tránh việc đánh dấu thất bại sai cho PR. Option A sai vì cờ --ignore-errors không tồn tại và việc bỏ qua lỗi sẽ che giấu các lỗi nghiêm trọng thực sự. Option B sai vì tăng timeout không khắc phục được lỗi 503 từ phía server. Option D sai vì Message Batches API phù hợp cho tác vụ xử lý hàng loạt không theo thời gian thực chứ không phù hợp cho bước kiểm tra blocking PR.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-008",
    "scenarioSignature": {
      "testedPrinciple": "centralized secret management for headless continuous integration authentication",
      "failureMode": "widespread pipeline failures across repositories following credential rotation",
      "rootCause": "hardcoded static api keys duplicated across multiple pipeline configurations",
      "requiredFix": "fetch credentials dynamically from a centralized secret store at pipeline runtime"
    },
    "questionEN": "An engineering organization rotated their primary ANTHROPIC_API_KEY in AWS Secrets Manager following a security audit. Immediately after, 15 repository CI workflows running automated code reviews failed with 401 Unauthorized. Investigation reveals that each repository workflow definition contained hardcoded API tokens or static environment secret references copied across repositories. What is the recommended architectural solution to prevent this maintenance failure?",
    "question": "[d3-b07-B-008] Một tổ chức kỹ thuật tiến hành xoay vòng khóa API ANTHROPIC_API_KEY chính trên AWS Secrets Manager sau khi kiểm toán bảo mật. Ngay sau đó, 15 workflow CI thuộc các repository khác nhau chạy tự động review code đồng loạt thất bại với lỗi 401 Unauthorized. Kết quả điều tra cho thấy workflow của từng repository đều chứa khóa API cứng hoặc tham số secret tĩnh được sao chép thủ công qua nhiều nơi. Giải pháp kiến trúc nào được khuyến nghị để giải quyết triệt me vấn đề bảo trì này?",
    "optionsEN": [
      "A. Pass --api-key-env directly in the claude CLI execution string so each repository auto-discovers rotated keys.",
      "B. Store the rotated key in a shared CLAUDE.md configuration file checked into the root of each repository.",
      "C. Configure claude -p with --dangerously-skip-permissions to bypass API key authentication requirements in CI.",
      "D. Centralize secret retrieval by configuring CI pipelines to dynamically fetch ANTHROPIC_API_KEY from the central secret manager or Organization-level CI secret at runtime."
    ],
    "options": [
      "A. Truyền trực tiếp tham số --api-key-env vào chuỗi lệnh CLI claude để từng repository tự động phát hiện khóa đã xoay vòng.",
      "B. Lưu trữ khóa API mới xoay vòng trong tệp cấu hình dùng chung CLAUDE.md được commit vào thư mục gốc của từng repository.",
      "C. Cấu hình lệnh claude -p với cờ --dangerously-skip-permissions để bỏ qua yêu cầu xác thực API key trong môi trường CI.",
      "D. Tập trung hóa việc quản lý secret bằng cách cấu hình CI pipeline truy xuất động ANTHROPIC_API_KEY từ trình quản lý secret trung tâm hoặc Organization-level CI secret tại thời điểm thực thi (runtime)."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because --api-key-env does not enable dynamic fetching from a centralized secret manager and still relies on static environment variable bindings.",
      "Option B is incorrect because storing API secrets in committed repository configuration files like CLAUDE.md introduces major security vulnerabilities and perpetuates hardcoded duplication.",
      "Option C is incorrect because --dangerously-skip-permissions bypasses interactive tool approval prompts, not Anthropic API key authentication.",
      "Option D is correct because centralizing secret management via dynamic runtime retrieval from AWS Secrets Manager or Organization-level CI secrets ensures secret updates propagate instantly to all pipelines without modifying repository code."
    ],
    "rationale": "Static hardcoded credentials across multiple repositories create maintainability bottlenecks during secret rotation. Fetching secrets dynamically from a centralized store or Organization secret at runtime guarantees single-point management and instant rotation across all CI pipelines.",
    "explanation": "Lựa chọn D là đáp án đúng vì việc truy xuất ANTHROPIC_API_KEY động từ AWS Secrets Manager hoặc Organization Secret tại runtime giúp tập trung hóa quản lý secret; khi xoay vòng khóa, tất cả 15 pipeline CI đều tự động sử dụng khóa mới mà không cần cập nhật thủ công từng repo. Option A sai vì --api-key-env không giúp truy xuất động từ secret manager. Option B sai vì commit API key vào CLAUDE.md gây nguy cơ lộ secret nghiêm trọng. Option C sai vì cờ --dangerously-skip-permissions chỉ dùng để bỏ qua prompt xác nhận quyền công cụ chứ không bỏ qua xác thực API Key.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]