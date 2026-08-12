[
  {
    "id": "d3-b07-B-019",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-019",
    "scenarioSignature": {
      "testedPrinciple": "matrix job artifact persistence and fail-fast configuration in distributed ci pipelines",
      "failureMode": "partial job failure causing loss of completed parallel code review outputs",
      "rootCause": "enabled matrix fail-fast strategy without individual step artifact uploads",
      "requiredFix": "disable matrix fail-fast and upload review artifacts in step post-execution blocks"
    },
    "questionEN": "A DevOps engineering team configures a GitHub Actions matrix strategy with 12 parallel jobs running claude -p \"Audit changes in $MODULE_DIR\" --output-format json > audit-$MODULE_DIR.json. Midway through execution, job 7 encounters an unhandled API error, causing the entire matrix workflow to cancel immediately. As a result, 6 completed module reviews are discarded and 6 remain unexecuted. Which pipeline architecture change prevents losing completed review results when individual matrix jobs fail?",
    "question": "[d3-b07-B-019] Một nhóm kỹ sư DevOps cấu hình chiến lược matrix trong GitHub Actions với 12 job song song chạy claude -p \"Audit changes in $MODULE_DIR\" --output-format json > audit-$MODULE_DIR.json. Giữa chừng khi đang thực thi, job 7 gặp lỗi API không được xử lý, khiến cho toàn bộ workflow matrix bị hủy ngay lập tức. Kết quả là 6 đánh giá module đã hoàn thành bị loại bỏ và 6 module chưa được thực thi. Thay đổi kiến trúc pipeline nào giúp ngăn chặn việc mất các kết quả đánh giá đã hoàn thành khi một job matrix cá thể bị lỗi?",
    "optionsEN": [
      "A. Increase --max-turns to 30 on the claude -p invocation to allow each matrix node to process complex code diffs faster without timing out.",
      "B. Wrap the execution in an infinite retry shell loop so that failed matrix jobs never return a non-zero exit code to the workflow runner.",
      "C. Set strategy.fail-fast: false in the workflow file and include an if: always() step to upload audit-$MODULE_DIR.json as a job artifact.",
      "D. Replace claude -p with --output-format stream-json to stream real-time events directly to an external database instead of generating artifact files."
    ],
    "options": [
      "A. Tăng --max-turns lên 30 trong câu lệnh claude -p để cho phép mỗi nút matrix xử lý các diff mã nguồn phức tạp nhanh hơn mà không bị quá giờ.",
      "B. Bọc câu lệnh thực thi trong một vòng lặp shell retry vô hạn để các job matrix bị lỗi không bao giờ trả về mã thoát khác 0 cho workflow runner.",
      "C. Thiết lập strategy.fail-fast: false trong file workflow và thêm bước if: always() để tải file audit-$MODULE_DIR.json lên làm artifact của job.",
      "D. Thay thế claude -p bằng --output-format stream-json để truyền phát sự kiện thời gian thực trực tiếp đến cơ sở dữ liệu bên ngoài thay vì tạo file artifact."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A incorrect: Modifying --max-turns changes the maximum agent interaction depth but does not modify GitHub Actions matrix cancellation rules or preserve output artifacts when a node fails.",
      "Option B incorrect: Retrying indefinitely inside a shell loop can lead to infinite resource consumption and rate-limit exhaustion without addressing proper matrix failure handling and artifact persistence.",
      "Option C correct: Setting strategy.fail-fast: false prevents GitHub Actions from terminating remaining matrix jobs when one fails, and uploading artifacts with if: always() guarantees completed review files are saved.",
      "Option D incorrect: Using --output-format stream-json alters event output format for log streaming, but does not stop matrix job cancellation or resolve CI artifact retention."
    ],
    "rationale": "In GitHub Actions matrix builds, strategy.fail-fast: true (the default) automatically cancels all active and pending matrix jobs if any single matrix node fails. Setting fail-fast: false ensures that all 12 jobs run to completion independently. Adding an artifact upload step with if: always() guarantees that every completed job's output file (audit-$MODULE_DIR.json) is captured and persisted regardless of sibling failures, enabling full partial result recovery.",
    "explanation": "Trong các build matrix của GitHub Actions, mặc định strategy.fail-fast được đặt là true, khiến cho toàn bộ các job matrix đang chạy hoặc đang chờ xử lý bị hủy ngay lập tức nếu có một job đơn lẻ thất bại. Để khắc phục triệt để vấn đề mất dữ liệu này, việc thiết lập strategy.fail-fast: false sẽ cho phép tất cả 12 job hoạt động độc lập và hoàn tất công việc của mình dù có job khác bị lỗi. Đồng thời, việc bổ sung bước tải artifact với điều kiện if: always() giúp lưu trữ lại file kết quả audit-$MODULE_DIR.json của các job đã hoàn thành thành công, đảm bảo chiến lược thu hồi kết quả một phần (partial result recovery) cho hệ thống CI/CD.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-020",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-020",
    "scenarioSignature": {
      "testedPrinciple": "error handling and failure visibility in non-blocking automated code review pipelines",
      "failureMode": "execution errors and compliance failures silently masked as successful build steps",
      "rootCause": "using continue-on-error directive on CLI invocation step without inspection logic",
      "requiredFix": "capture exit status explicitly and post advisory summary annotations without masking errors"
    },
    "questionEN": "To prevent PR build pipelines from failing while testing an experimental automated review feature, a team adds continue-on-error: true to their GitHub Actions step: run: claude -p \"Audit PR for vulnerabilities\". Later, they notice that API authentication failures, rate limits, and model errors are completely ignored, reporting green checkmarks for failed audits. Which implementation pattern properly supports advisory review execution while maintaining visibility into step failures?",
    "question": "[d3-b07-B-020] Để ngăn pipeline build của PR bị thất bại trong khi thử nghiệm tính năng đánh giá tự động mới, một nhóm phát triển đã thêm continue-on-error: true vào bước GitHub Actions: run: claude -p \"Audit PR for vulnerabilities\". Sau đó, họ nhận thấy rằng các lỗi xác thực API, lỗi vượt giới hạn rate limit và lỗi từ mô hình đều bị bỏ qua hoàn toàn, hiển thị dấu tích xanh thành công cho cả các lượt audit thất bại. Mô hình triển khai nào hỗ trợ đúng việc đánh giá mang tính tư vấn (advisory review) mà vẫn duy trì khả năng quan sát các lỗi của bước thực thi?",
    "optionsEN": [
      "A. Add --dangerously-skip-permissions to the claude -p CLI invocation to automatically grant all tool execution requests without throwing step exceptions.",
      "B. Configure timeout-minutes: 5 on the action step to ensure any frozen or errored Claude Code execution is forcefully terminated by the runner.",
      "C. Pass --output-format stream-json and pipe the stream directly into jq so GitHub Actions converts CLI non-zero exit codes into runner annotations.",
      "D. Remove continue-on-error: true, capture the execution exit code explicitly using set +e, and write diagnostic errors to $GITHUB_STEP_SUMMARY or PR comments."
    ],
    "options": [
      "A. Thêm --dangerously-skip-permissions vào câu lệnh claude -p để tự động cấp quyền cho tất cả yêu cầu công cụ mà không tạo ngoại lệ bước.",
      "B. Cấu hình timeout-minutes: 5 trên bước action để đảm bảo bất kỳ lượt thực thi Claude Code nào bị treo hoặc lỗi sẽ bị runner cưỡng chế dừng.",
      "C. Truyền --output-format stream-json và pipe luồng trực tiếp vào jq để GitHub Actions tự động chuyển mã thoát khác 0 thành chú thích của runner.",
      "D. Loại bỏ continue-on-error: true, ghi nhận mã thoát thực thi một cách tường minh bằng set +e, và ghi các lỗi chẩn đoán vào $GITHUB_STEP_SUMMARY hoặc nhận xét PR."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A incorrect: Adding --dangerously-skip-permissions bypasses permission prompts in headless mode, but does not fix continue-on-error: true masking API failures, network errors, or policy violations.",
      "Option B incorrect: Setting timeout-minutes: 5 prevents stuck jobs from running indefinitely, but continue-on-error: true would still mark a timed-out step as successful.",
      "Option C incorrect: Changing to stream-json output alters log parsing format but does not alter GitHub Actions step status overriding caused by continue-on-error: true.",
      "Option D correct: Removing continue-on-error: true and using set +e allows the script to capture EXIT_CODE=$?, publish clear failure diagnostics to $GITHUB_STEP_SUMMARY or PR comments, and handle advisory outcomes explicitly without masking underlying errors."
    ],
    "rationale": "Using continue-on-error: true in GitHub Actions causes the runner to treat a failing step as a success, masking API authentication errors, rate limit drops, and non-zero CLI exit codes under a false green checkmark. The correct pattern for advisory steps is to disable continue-on-error: true, control error propagation using shell primitives (set +e), store the exit status (EXIT_CODE=$?), and explicitly report errors through GitHub Step Summaries ($GITHUB_STEP_SUMMARY) or PR comments so failure state is transparently visible.",
    "explanation": "Khi sử dụng continue-on-error: true trong GitHub Actions, runner sẽ bỏ qua mã thoát rác/lỗi và đánh dấu bước đó là thành công (dấu tích xanh), làm che khuất các lỗi nguy hại như sai API key, chạm hạn ngạch rate limit hoặc vi phạm quy tắc. Mô hình chuẩn để triển khai các bước tư vấn (non-blocking advisory reviews) là gỡ bỏ continue-on-error: true, sử dụng set +e trong shell script để tự kiểm soát luồng xử lý lỗi, bắt mã thoát EXIT_CODE=$?, và chủ động ghi báo cáo lỗi chi tiết ra $GITHUB_STEP_SUMMARY hoặc nhận xét trên Pull Request. Cách làm này vừa đảm bảo pipeline không bị sập ngoài ý muốn, vừa công khai minh bạch trạng thái thất bại của công cụ.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]