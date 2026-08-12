[
  {
    "id": "d3-b07-B-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-003",
    "scenarioSignature": {
      "testedPrinciple": "asynchronous PR review workflow status check enforcement",
      "failureMode": "critical vulnerability merged to main branch before automated security review completes",
      "rootCause": "decoupling AI security audit execution from repository branch protection merge gates",
      "requiredFix": "configure security audit job as synchronous blocking required status check prior to merge"
    },
    "questionEN": "A DevOps team configures an asynchronous CI workflow where claude -p \"Audit PR for security flaws\" --output-format json runs as a background job with continue-on-error: true that posts review comments via the GitHub API. During a deployment, a developer opens a PR containing a critical SQL injection vulnerability in auth/login.py. The PR passes basic linting and is merged after 30 seconds by an engineer, but Claude's security analysis takes 90 seconds to complete and post its comment. Consequently, the vulnerable code is deployed to production before the audit completes. What architectural flaw in the CI/CD workflow caused this security bypass?",
    "question": "[d3-b07-B-003] Một đội ngũ DevOps cấu hình quy trình CI bất đồng bộ, trong đó lệnh claude -p \"Audit PR for security flaws\" --output-format json chạy dưới dạng một tác vụ nền với continue-on-error: true và gửi nhận xét đánh giá qua GitHub API. Trong một đợt triển khai, lập trình viên tạo PR chứa lỗ hổng SQL injection nghiêm trọng trong auth/login.py. PR vượt qua các bước kiểm tra lint cơ bản và được hợp nhất sau 30 giây bởi một kỹ sư, nhưng quá trình phân tích bảo mật của Claude mất 90 giây mới hoàn tất và đăng nhận xét. Kết quả là mã nguồn chứa lỗ hổng đã bị triển khai lên production trước khi quá trình kiểm định hoàn thành. Khuyết điểm kiến trúc nào trong quy trình CI/CD đã gây ra sự cố bỏ qua rào cản bảo mật này?",
    "optionsEN": [
      "A. Claude Code failed to process auth/login.py because --dangerously-skip-permissions was omitted from the command call.",
      "B. The Anthropic API rate limit was exceeded during pipeline execution, forcing Claude Code to output an empty JSON payload.",
      "C. The automated audit was designed as a non-blocking asynchronous task rather than a required synchronous status check in branch protection.",
      "D. GitHub Actions terminated the background job early because --max-turns was restricted to 1 on complex pull requests."
    ],
    "options": [
      "A. Claude Code không thể phân tích auth/login.py vì thiếu cờ --dangerously-skip-permissions trong câu lệnh gọi.",
      "B. Giới hạn tần suất Anthropic API bị vượt quá khi thực thi pipeline, khiến Claude Code trả về dữ liệu JSON rỗng.",
      "C. Bước kiểm tra tự động được thiết kế dạng tác vụ bất đồng bộ không chặn thay vì là quy trình kiểm tra trạng thái đồng bộ bắt buộc trong branch protection.",
      "D. GitHub Actions đã kết thúc tác vụ nền sớm hơn dự kiến do cờ --max-turns bị giới hạn bằng 1 trên các pull request phức tạp."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because omitting permission flags in headless mode causes execution hangs or explicit authorization errors, not an asynchronous timing race condition.",
      "Option B is incorrect because exceeding API rate limits returns an HTTP 429 error and fails the pipeline job rather than generating a delayed comment post-merge.",
      "Option C is correct because executing the audit asynchronously without enforcing it as a required status check in branch protection rules allows code to merge prior to review completion.",
      "Option D is incorrect because --max-turns restricts iteration steps during execution rather than controlling background job timing relative to merge gates."
    ],
    "rationale": "The security failure occurred because the CI/CD pipeline treated the Claude Code audit step as advisory and non-blocking (continue-on-error: true running asynchronously), allowing PR merge actions to proceed independently of the security evaluation lifecycle. To prevent unreviewed vulnerabilities from reaching production, automated security audits must be configured as synchronous required status checks within repository branch protection rules so that merges are blocked until Claude Code successfully completes its analysis and returns a clean result.",
    "explanation": "Sự cố bảo mật xảy ra do pipeline CI/CD xử lý bước kiểm tra của Claude Code dưới dạng nhiệm vụ khuyến nghị không chặn (continue-on-error: true chạy bất đồng bộ), cho phép hành động hợp nhất PR tiếp diễn độc lập với vòng đời đánh giá bảo mật. Để ngăn chặn các lỗ hổng chưa được kiểm duyệt lên môi trường sản xuất, các công cụ kiểm tra bảo mật tự động phải được cấu hình thành quy trình kiểm tra trạng thái đồng bộ bắt buộc (required status check) trong quy tắc bảo vệ nhánh (branch protection rules), đảm bảo việc merge bị chặn lại cho tới khi Claude Code phân tích xong và trả về kết quả đạt tiêu chuẩn.\n\n- Lựa chọn A sai vì việc thiếu cờ cấp quyền trong chế độ không tương tác sẽ khiến CLI bị treo hoặc báo lỗi ủy quyền chứ không gây ra cuộc đua thời gian bất đồng bộ.\n- Lựa chọn B sai vì lỗi rate limit sẽ trả về mã HTTP 429 và làm thất bại job chứ không tạo ra hiện tượng đăng bình luận sau khi đã merge.\n- Lựa chọn C đúng vì bước audit chạy bất đồng bộ không chặn làm cho PR có thể được hợp nhất trước khi quá trình kiểm định bảo mật của Claude kịp trả về kết quả.\n- Lựa chọn D sai vì cờ --max-turns chỉ giới hạn số lượt suy luận của agent chứ không điều khiển tiến trình chạy nền so với cổng hợp nhất branch.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-004",
    "scenarioSignature": {
      "testedPrinciple": "strict blocking CI quality gate scope calibration",
      "failureMode": "emergency production hotfix blocked by non-critical code formatting audit failure",
      "rootCause": "enforcing binary blocking status checks for cosmetic style guidelines during incident resolution",
      "requiredFix": "decouple trivial formatting checks from blocking deployment gates or implement emergency bypass rules"
    },
    "questionEN": "During a major production incident, an engineer opens an emergency hotfix PR to patch a critical memory leak in src/gateway.py. The repository's CI pipeline enforces a synchronous blocking gate using claude -p \"Audit PR and fail on any issue\" --output-format json followed by if [ $EXIT_CODE -ne 0 ]; then exit 1; fi. Claude Code identifies the memory leak fix as valid but detects two trailing whitespace violations and returns exit code 1. As a result, the blocking status check fails and prevents the deployment of the emergency patch. What flaw in the CI/CD integration design led to this operational bottleneck?",
    "question": "[d3-b07-B-004] Trong một sự cố gián đoạn dịch vụ nghiêm trọng trên môi trường production, một kỹ sư mở PR sửa lỗi khẩn cấp (hotfix) để khắc phục sự cố rò rỉ bộ nhớ trong src/gateway.py. Pipeline CI của kho chứa áp dụng một cổng kiểm tra đồng bộ dạng chặn (blocking gate) bằng lệnh claude -p \"Audit PR and fail on any issue\" --output-format json kèm theo mã if [ $EXIT_CODE -ne 0 ]; then exit 1; fi. Claude Code xác nhận bản sửa lỗi rò rỉ bộ nhớ là chính xác nhưng phát hiện 2 lỗi khoảng trắng dư thừa (trailing whitespace) và trả về exit code 1. Kết quả là quy trình kiểm tra bị thất bại và chặn việc triển khai bản sửa lỗi khẩn cấp. Khuyết điểm nào trong thiết kế tích hợp CI/CD đã dẫn đến điểm nghẽn vận hành này?",
    "optionsEN": [
      "A. The workflow failed to pass --output-format stream-json, preventing GitHub Actions from streaming raw linter logs.",
      "B. The ANTHROPIC_API_KEY environment variable was not supplied to the pull request trigger.",
      "C. Claude Code required interactive user confirmation because --allowedTools was set incorrectly.",
      "D. The blocking CI gate strictly evaluated minor cosmetic formatting issues as hard pipeline failures without severity filtering or hotfix bypass policies."
    ],
    "options": [
      "A. Quy trình CI không truyền cờ --output-format stream-json, ngăn cản GitHub Actions nhận luồng nhật ký từ linter.",
      "B. Biến môi trường ANTHROPIC_API_KEY không được cung cấp cho sự kiện kích hoạt pull request.",
      "C. Claude Code yêu cầu xác nhận tương tác từ người dùng do thiết lập tùy chọn --allowedTools không chính xác.",
      "D. Cổng CI dạng chặn đã đánh giá các lỗi định dạng nhỏ như một thất bại nghiêm trọng mà không phân loại mức độ sự cố hoặc có chính sách ngoại lệ cho hotfix."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because stream-json alters log streaming formats for real-time viewing rather than changing process exit status or gate evaluation rules.",
      "Option B is incorrect because a missing API key fails job execution at initialization with an authentication error rather than executing PR diff analysis.",
      "Option C is incorrect because missing authorization flags in headless mode freeze the process until job timeout rather than completing analysis with exit code 1.",
      "Option D is correct because treating low-severity cosmetic style flaws as hard blocking failures in deployment gates blocks critical hotfixes during production outages."
    ],
    "rationale": "While hard blocking CI gates (exit 1 on error) are critical for preventing bad code from reaching main, configuring Claude Code to return non-zero exit codes on trivial cosmetic issues (such as trailing whitespace or formatting inconsistency) creates severe operational risks during incidents. Production blocking gates should strictly filter findings by severity (e.g. failing only on security/correctness flaws) or provide emergency hotfix override mechanisms so non-critical style findings do not delay outage resolution.",
    "explanation": "Mặc dù các cổng chặn cứng trong CI (exit 1 khi phát hiện lỗi) rất cần thiết để ngăn mã lỗi đi vào nhánh chính, việc cấu hình Claude Code trả về mã thoát khác 0 cho các lỗi định dạng nhỏ (như khoảng trắng thừa hay quy chuẩn trình bày) tạo ra rủi ro vận hành nghiêm trọng trong các sự cố. Cổng kiểm tra chặn triển khai sản xuất nên phân loại mức độ nghiêm trọng (chỉ chặn với các lỗi bảo mật hoặc tính đúng đắn của ứng dụng) hoặc cung cấp cơ chế ghi đè cho quy trình sửa lỗi khẩn cấp (hotfix), tránh để các vi phạm trình bày mã nguồn không quan trọng làm trì hoãn việc xử lý sự cố.\n\n- Lựa chọn A sai vì cờ stream-json chỉ thay đổi định dạng luồng log để xem trực tiếp chứ không thay đổi exit code hay logic chặn của gate.\n- Lựa chọn B sai vì thiếu API key sẽ khiến lệnh thất bại ngay lúc bắt đầu do lỗi xác thực chứ không thể phân tích diff để báo lỗi khoảng trắng.\n- Lựa chọn C sai vì khi thiếu cờ ủy quyền trong môi trường headless, tiến trình sẽ bị treo chờ input cho tới khi timeout chứ không tự thoát với exit code 1.\n- Lựa chọn D đúng vì việc cấu hình cổng CI chặn cứng cả các lỗi trình bày nhỏ mà không phân loại mức độ nghiêm trọng đã vô tình chặn đứng bản hotfix quan trọng khi sản xuất đang gặp sự cố.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]