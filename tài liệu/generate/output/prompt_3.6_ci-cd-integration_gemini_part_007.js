[
  {
    "id": "d3-b07-new-013",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-013",
    "scenarioSignature": {
      "testedPrinciple": "model flag fallback behavior under invalid model identifier",
      "failureMode": "unexpected model execution without explicit error emission",
      "rootCause": "misspelled model argument causing silent fallback to default model",
      "requiredFix": "specify correct model identifier parameter matching supported names"
    },
    "questionEN": "A DevOps engineer configures a GitHub Actions workflow pipeline to run automated code reviews using the command claude -p \"Audit security\" --model claude-3-5-sonnet --dangerously-skip-permissions. The team intended to lock execution to a specific model version, but due to a subtle misspelling in the --model parameter string, the CLI does not throw a syntax error. What is the operational behavior of Claude Code in this non-interactive CI step?",
    "question": "[d3-b07-new-013] Một kỹ sư DevOps cấu hình pipeline GitHub Actions để chạy đánh giá mã nguồn tự động bằng câu lệnh claude -p \"Audit security\" --model claude-3-5-sonnet --dangerously-skip-permissions. Đội ngũ muốn cố định việc thực thi với một phiên bản model cụ thể, nhưng do lỗi chính tả trong tham số --model, CLI không báo lỗi cú pháp. Hành vi hoạt động của Claude Code trong bước CI không tương tác này là gì?",
    "optionsEN": [
      "A. Claude Code silently falls back to the default model version and proceeds with the automated review without raising an error.",
      "B. The CLI immediately halts pipeline execution with exit code 1 and outputs an 'unknown model identifier' schema validation error.",
      "C. The execution hangs indefinitely awaiting interactive user confirmation to select a replacement model from the available model list.",
      "D. The pipeline fails because --model requires an accompanying --api-version parameter when executed in non-interactive mode."
    ],
    "options": [
      "A. Claude Code lặng lẽ khôi phục về phiên bản model mặc định và tiếp tục quá trình đánh giá tự động mà không phát ra lỗi.",
      "B. CLI lập tức dừng thực thi pipeline với mã thoát 1 và xuất lỗi xác thực schema 'unknown model identifier'.",
      "C. Quá trình thực thi treo vô thời hạn để chờ người dùng xác nhận tương tác nhằm chọn model thay thế từ danh sách.",
      "D. Pipeline thất bại vì --model yêu cầu một tham số --api-version đi kèm khi chạy ở chế độ không tương tác."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: When an invalid or misspelled model name is passed to --model, Claude Code falls back silently to its default model version without aborting the process or throwing an error, allowing the CI pipeline to finish using the default model.",
      "Option B is incorrect: Claude Code does not abort with exit code 1 or throw a schema validation error when encountering a misspelled model name; it defaults silently.",
      "Option C is incorrect: In headless non-interactive mode (-p), Claude Code does not prompt for user selection or hang on invalid model inputs; it falls back automatically.",
      "Option D is incorrect: --model does not require a secondary --api-version flag for non-interactive execution, nor is missing --api-version the reason for fallback."
    ],
    "rationale": "When an unsupported or misspelled model string is provided to the --model flag in Claude Code CLI execution, the system defaults silently to the standard model rather than terminating the process with an error, resulting in fallback execution in CI.",
    "explanation": "Đáp án A đúng vì khi tên model truyền vào --model bị sai chính tả hoặc không hợp lệ, Claude Code sẽ lặng lẽ chuyển về sử dụng model mặc định mà không ngắt quy trình CI hoặc báo lỗi. Đáp án B sai vì hệ thống không báo lỗi schema hay ngắt với exit code 1. Đáp án C sai vì trong chế độ không tương tác (-p), CLI sẽ không dừng lại chờ chọn model qua nhắc lệnh. Đáp án D sai vì tham số --model hoạt động độc lập và không đòi hỏi flag --api-version bổ sung.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-014",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-014",
    "scenarioSignature": {
      "testedPrinciple": "credential sanitization in non-interactive pipeline log output",
      "failureMode": "plain text API secret exposure in build output log",
      "rootCause": "explicit echo evaluation of environment credential variable in shell script step",
      "requiredFix": "remove plain text credential echo or mask sensitive environment variables"
    },
    "questionEN": "To troubleshoot authentication failures in a GitLab CI pipeline, a build engineer adds the command echo $ANTHROPIC_API_KEY immediately before running claude -p \"Run code review\" --dangerously-skip-permissions. What security vulnerability and operational consequence is directly introduced by this debugging step in the CI build logs?",
    "question": "[d3-b07-new-014] Để khắc phục lỗi xác thực trong pipeline GitLab CI, một kỹ sư build thêm câu lệnh echo $ANTHROPIC_API_KEY ngay trước khi chạy claude -p \"Run code review\" --dangerously-skip-permissions. Lỗ hổng bảo mật và hậu quả vận hành nào trực tiếp phát sinh từ bước debug này trong nhật ký (logs) build CI?",
    "optionsEN": [
      "A. The pipeline execution fails because referencing $ANTHROPIC_API_KEY unsets the variable before Claude Code can read it.",
      "B. The sensitive API key is printed in plain text to the CI stdout logs, exposing credentials to anyone with log view access.",
      "C. Claude Code detects the environment variable access in shell history and automatically invalidates the API key.",
      "D. The CI runner redacts the $ANTHROPIC_API_KEY value automatically only if --output-format json is appended to the echo command."
    ],
    "options": [
      "A. Quá trình thực thi pipeline thất bại vì việc tham chiếu $ANTHROPIC_API_KEY xóa biến môi trường trước khi Claude Code kịp đọc.",
      "B. API key nhạy cảm bị in ra dạng văn bản thuần trong nhật ký stdout của CI, làm lộ thông tin xác thực cho bất kỳ ai có quyền xem log.",
      "C. Claude Code phát hiện truy cập biến môi trường trong lịch sử shell và tự động vô hiệu hóa API key đó.",
      "D. CI runner chỉ tự động ẩn giá trị $ANTHROPIC_API_KEY nếu thêm flag --output-format json vào lệnh echo."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Executing echo $ANTHROPIC_API_KEY evaluates the environment variable without unsetting or corrupting its value for downstream CLI commands.",
      "Option B is correct: Printing environment variables directly via echo $ANTHROPIC_API_KEY writes secret credentials into stdout logs in plain text, exposing the sensitive API key to public or unauthorized log viewers.",
      "Option C is incorrect: Claude Code cannot inspect prior shell command histories or automatically revoke exposed API keys.",
      "Option D is incorrect: The standard shell echo command does not redact variables based on --output-format json flags; plain text environment printing bypasses secret masking unless explicitly handled by secrets management."
    ],
    "rationale": "Executing echo $ANTHROPIC_API_KEY prints the raw authentication credential string to standard output, causing public or job log outputs to retain exposed secrets and creating a severe credential leak vulnerability.",
    "explanation": "Đáp án B đúng vì câu lệnh echo $ANTHROPIC_API_KEY sẽ ghi trực tiếp giá trị của khóa API ra luồng đầu ra tiêu chuẩn (stdout), dẫn đến lộ lọt chứng thư bảo mật trong log của hệ thống CI. Đáp án A sai vì lệnh echo không xóa biến môi trường. Đáp án C sai vì Claude Code không thể quét lịch sử shell để tự vô hiệu hóa API key. Đáp án D sai vì lệnh echo thông thường không tự mã hóa hay ẩn dữ liệu dựa vào các flag định dạng của CLI.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]