[
  {
    "id": "d3-b07-B-011",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-011",
    "scenarioSignature": {
      "testedPrinciple": "cost management and spending alerts for automated headlessly executed prompts in continuous integration",
      "failureMode": "unexpected accumulation of api usage charges over recurring pull request triggers",
      "rootCause": "absence of spending limit alerts and unmonitored automated execution in build pipelines",
      "requiredFix": "configure budget threshold alerts and automated execution quotas in cloud console"
    },
    "questionEN": "A software engineering team configures a GitHub Actions workflow that executes claude -p \"Review pull request diff\" --dangerously-skip-permissions on every pull_request event. The team processes an average of 80 PRs/day, generating roughly $4/day in API charges ($120/month). Because no spending monitoring or budget notifications were configured on the Anthropic API account, the monthly bill unexpectedly exceeds the team's operational budget without warning. Which architectural measure should the team implement to prevent unmonitored spending while maintaining PR code reviews?",
    "question": "[d3-b07-B-011] Một đội ngũ phát triển phần mềm cấu hình một GitHub Actions workflow để thực hiện claude -p \"Review pull request diff\" --dangerously-skip-permissions mỗi khi có sự kiện pull_request. Đội xử lý trung bình 80 PR/ngày, phát sinh khoảng $4/ngày chi phí API ($120/tháng). Do không cấu hình giám sát chi tiêu hay cảnh báo ngân sách trên tài khoản Anthropic API, hóa đơn hàng tháng tăng bất ngờ vượt quá ngân sách hoạt động mà không có cảnh báo. Biện pháp kiến trúc nào đội ngũ nên triển khai để ngăn chặn chi tiêu không được giám sát trong khi vẫn duy trì đánh giá mã nguồn PR?",
    "optionsEN": [
      "A. Replace the Anthropic API key with an OAuth user access token so that individual developer accounts absorb the API usage costs.",
      "B. Add --max-turns 100 to the CLI invocation command so that Claude Code automatically throttles API billing on each PR run.",
      "C. Set up budget alerts and spend thresholds in the Anthropic Console alongside workflow path filtering to avoid running reviews on minor commits.",
      "D. Pass --dangerously-skip-permissions with a --cost-limit flag to terminate the build process when daily workspace billing exceeds $2.00."
    ],
    "options": [
      "A. Thay thế Anthropic API key bằng OAuth user access token để tài khoản cá nhân của nhà phát triển tự gánh chịu chi phí sử dụng API.",
      "B. Thêm --max-turns 100 vào lệnh gọi CLI để Claude Code tự động giới hạn tính phí API trên mỗi lượt chạy PR.",
      "C. Thiết lập cảnh báo ngân sách (budget alerts) và ngưỡng chi tiêu trên Anthropic Console kết hợp với bộ lọc đường dẫn (path filtering) trong workflow để tránh chạy đánh giá trên các commit nhỏ.",
      "D. Truyền --dangerously-skip-permissions cùng với cờ --cost-limit để chấm dứt quy trình build khi chi phí workspace hàng ngày vượt quá $2.00."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because modifying authentication mechanism to OAuth tokens does not provide organization-level cost monitoring or stop total usage accumulation across continuous integration runs.",
      "Option B is incorrect because configuring a high turn limit on individual CLI invocations does not restrict total daily execution volume or notify administrators when monthly spend limits are reached.",
      "Option C is correct because setting budget alerts in the Anthropic Console provides early notification when API spend approaches limits, and adding CI path filtering reduces overall trigger frequency by skipping non-code changes.",
      "Option D is incorrect because Claude Code CLI does not support a --cost-limit flag, and client-side command flags cannot track cumulative billing across distributed pipeline instances."
    ],
    "rationale": "Configuring billing budget alerts in the Anthropic Console ensures administrators are notified when API consumption exceeds predetermined thresholds, while CI path filtering prevents unnecessary workflow triggers on minor or non-code PR updates.",
    "explanation": "Trong kịch bản này, việc chạy tự động Claude Code trên 80 PR/ngày tích lũy chi phí API đáng kể ($120/tháng) mà không được giám sát:\n- Lựa chọn C đúng vì việc cấu hình budget alerts trên Anthropic Console mang lại khả năng cảnh báo sớm khi chi phí chạm ngưỡng, đồng thời kết hợp path filtering (ví dụ: bỏ qua file .md, file cấu hình) trong CI/CD giúp giảm số lần kích hoạt API không cần thiết.\n- Lựa chọn A sai vì việc đổi sang OAuth token không giải quyết bài toán quản trị chi phí cấp tổ chức và không ngăn được việc tích lũy chi phí từ pipeline.\n- Lựa chọn B sai vì cờ --max-turns chỉ giới hạn số lượt hội thoại trong một câu lệnh đơn lẻ chứ không quản lý tổng ngân sách chi tiêu hàng ngày/hàng tháng.\n- Lựa chọn D sai vì Claude Code CLI không hỗ trợ cờ --cost-limit và một lệnh CLI không thể theo dõi chi phí tích lũy toàn hệ thống trên nhiều runner.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-012",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-012",
    "scenarioSignature": {
      "testedPrinciple": "custom configuration file path resolution in non-interactive continuous integration execution",
      "failureMode": "automated code reviews executing without applying project-specific guidelines and rules",
      "rootCause": "specifying an invalid file path in command line configuration parameter",
      "requiredFix": "provide correct path to repository configuration file in command line options"
    },
    "questionEN": "A DevOps team sets up a CI pipeline job to audit code style using claude -p \"Audit codebase\" --config .github/config/CLAUDE.md --dangerously-skip-permissions. During code review runs, Claude Code runs successfully and returns zero exit code, but ignores all project-specific formatting guidelines defined in .claude/CLAUDE.md. Inspection reveals that .github/config/CLAUDE.md does not exist. Why did Claude Code ignore the project rules during the CI run, and how should the team resolve this?",
    "question": "[d3-b07-B-012] Một đội ngũ DevOps thiết lập job trong CI pipeline để kiểm tra quy chuẩn mã nguồn bằng lệnh claude -p \"Audit codebase\" --config .github/config/CLAUDE.md --dangerously-skip-permissions. Trong các lượt chạy đánh giá mã nguồn, Claude Code chạy thành công và trả về mã thoát 0 (exit code 0), nhưng bỏ qua tất cả các quy tắc định dạng riêng của dự án được định nghĩa trong .claude/CLAUDE.md. Kiểm tra cho thấy đường dẫn .github/config/CLAUDE.md không tồn tại. Tại sao Claude Code lại bỏ qua các quy tắc dự án trong lượt chạy CI và đội ngũ nên khắc phục như thế nào?",
    "optionsEN": [
      "A. Claude Code required the --rules-file flag instead of --config to load custom project governance files in headless mode.",
      "B. Claude Code failed to parse the file because CLAUDE.md files must reside in the root directory and cannot be specified via command-line arguments.",
      "C. The missing file path caused Claude Code to fall back to an internal web search to attempt downloading repository rules dynamically.",
      "D. Specifying a non-existent path to --config caused Claude Code to silently ignore the custom file argument and fall back to default behavior without project rules."
    ],
    "options": [
      "A. Claude Code yêu cầu cờ --rules-file thay vì --config để tải các file quản trị dự án tùy chỉnh trong chế độ headless.",
      "B. Claude Code không thể phân tích cú pháp file vì file CLAUDE.md bắt buộc phải nằm ở thư mục gốc và không thể chỉ định qua đối số dòng lệnh.",
      "C. Đường dẫn file bị thiếu khiến Claude Code tự động chuyển sang tìm kiếm web nội bộ để cố gắng tải xuống các quy tắc repository một cách động.",
      "D. Việc chỉ định đường dẫn không tồn tại cho --config khiến Claude Code âm thầm bỏ qua tham số cấu hình tùy chỉnh và dùng hành vi mặc định không có quy tắc dự án."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because --rules-file is not the standard flag for overriding project configuration file paths in the Claude Code CLI.",
      "Option B is incorrect because custom configuration file locations can be passed to Claude Code via CLI flags and are not hardcoded to root-level locations.",
      "Option C is incorrect because missing configuration files do not trigger web search behaviors or external repository retrieval mechanisms.",
      "Option D is correct because specifying an invalid path for the --config parameter causes Claude Code to proceed without applying the target guidelines; pointing --config to the actual location .claude/CLAUDE.md ensures rules are loaded."
    ],
    "rationale": "When the --config flag points to a non-existent file path, Claude Code silently bypasses project-specific guidelines and executes using baseline behavior. Correcting the --config argument to the valid filepath .claude/CLAUDE.md restores rule enforcement in CI.",
    "explanation": "Trong kịch bản này, việc truyền một đường dẫn sai không tồn tại cho cờ --config khiến quy trình kiểm tra bị sai lệch:\n- Lựa chọn D đúng vì khi truyền đường dẫn file không tồn tại cho --config, Claude Code bỏ qua file cấu hình tùy chỉnh đó và thực thi lệnh bằng các quy tắc mặc định mà không áp dụng các quy chuẩn riêng của dự án. Để khắc phục, cần cập nhật đối số cờ --config trỏ đúng tới .claude/CLAUDE.md.\n- Lựa chọn A sai vì --rules-file không phải là cờ chuẩn để truyền file cấu hình dự án cho Claude Code CLI.\n- Lựa chọn B sai vì Claude Code cho phép chỉ định vị trí file cấu hình tùy chỉnh thông qua tham số dòng lệnh chứ không bắt buộc cố định ở root directory.\n- Lựa chọn C sai vì Claude Code không tự động thực hiện web search hay tải file từ bên ngoài khi đường dẫn cục bộ bị chỉ định sai.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]