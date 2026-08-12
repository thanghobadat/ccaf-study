[
  {
    "id": "d3-b07-new-011",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-011",
    "scenarioSignature": {
      "testedPrinciple": "CLI exit code propagation for CI pipeline gate enforcement",
      "failureMode": "CI job succeeds and merges pull request despite review process failure",
      "rootCause": "shell execution masks non-zero CLI return code with fault masking fallback",
      "requiredFix": "propagate non-zero process exit codes directly to the CI step runner"
    },
    "questionEN": "A DevOps engineer at a fintech company adds a security audit step to a GitLab CI pipeline running claude -p \"Audit auth module\" --dangerously-skip-permissions. During a policy check failure, Claude Code outputs a failure summary and exits with status code 1. However, the runner executes the command inside a wrapped shell script that evaluates claude -p ... || true, causing the CI job to report success (exit code 0) and automatically merging compromised pull requests. What pipeline modification ensures the CI gate fails when Claude Code returns a non-zero exit code?",
    "question": "[d3-b07-new-011] Một kỹ sư DevOps tại một công ty công nghệ tài chính thêm một bước kiểm tra bảo mật vào đường ống GitLab CI chạy claude -p \"Audit auth module\" --dangerously-skip-permissions. Khi phát hiện lỗi chính sách, Claude Code đưa ra tóm tắt lỗi và kết thúc với mã trạng thái 1. Tuy nhiên, trình chạy (runner) thực thi lệnh bên trong một kịch bản shell được bọc bằng claude -p ... || true, khiến job CI báo cáo thành công (mã thoát 0) và tự động hợp nhất các pull request bị lỗi. Thay đổi cấu hình đường ống nào đảm bảo cổng CI thất bại khi Claude Code trả về mã thoát khác 0?",
    "optionsEN": [
      "A. Append --output-format json to the command and configure jq to parse the output string for error keywords, overriding the shell exit status.",
      "B. Add --max-turns 1 to force Claude Code to exit with code 0 regardless of whether security violations were detected in the codebase.",
      "C. Remove the || true fallback or check $? explicitly, allowing the shell to propagate Claude Code's non-zero exit code directly to the CI runner.",
      "D. Set the environment variable ANTHROPIC_API_KEY to an empty string so the shell interpreter forces a step termination before execution."
    ],
    "options": [
      "A. Thêm --output-format json vào lệnh và cấu hình jq để phân tích chuỗi đầu ra nhằm tìm từ khóa lỗi, ghi đè mã trạng thái shell.",
      "B. Thêm --max-turns 1 để buộc Claude Code thoát với mã 0 bất kể có phát hiện vi phạm bảo mật trong mã nguồn hay không.",
      "C. Loại bỏ logic || true hoặc kiểm tra $? một cách rõ ràng, cho phép shell truyền trực tiếp mã thoát khác 0 của Claude Code tới CI runner.",
      "D. Đặt biến môi trường ANTHROPIC_API_KEY thành chuỗi rỗng để trình thông dịch shell buộc chấm dứt bước xử lý trước khi thực thi."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Parsing text output with jq does not fix shell status code suppression if || true forces exit status 0 before the pipeline engine evaluates step status.",
      "Option B is incorrect: Setting --max-turns 1 limits execution depth but does not alter exit code handling or stop || true from hiding exit code 1.",
      "Option C is correct: Removing || true ensures that when Claude Code returns exit code 1 upon finding violations or encountering runtime failures, the shell script immediately exits with a non-zero status, failing the CI build gate.",
      "Option D is incorrect: Clearing ANTHROPIC_API_KEY breaks API authentication entirely rather than handling Claude Code's exit code correctly in the pipeline step."
    ],
    "rationale": "Claude Code signals failure or rule violation by exiting with code 1. Using shell constructs like || true masks non-zero exit codes, causing CI pipeline runners to treat failed steps as successful. Removing || true or checking $? allows the non-zero status code to propagate to the CI runner and break the pipeline build gate.",
    "explanation": "Claude Code báo hiệu sự cố hoặc vi phạm quy tắc bằng cách thoát với mã 1. Việc sử dụng các cấu trúc shell như || true sẽ che đứt mã thoát khác 0, khiến các runner trong đường ống CI xử lý bước thất bại thành thành công. Việc loại bỏ || true hoặc kiểm tra $? cho phép mã trạng thái khác 0 truyền trực tiếp đến CI runner và đánh hỏng bước kiểm tra tự động.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-012",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-012",
    "scenarioSignature": {
      "testedPrinciple": "explicit CLI output format flag requirement for JSON stream parsing",
      "failureMode": "downstream pipeline parsing step crashes with jq invalid json error",
      "rootCause": "omitting output format flag defaults headless execution output to plain text",
      "requiredFix": "specify explicit json output format flag in headless CLI execution step"
    },
    "questionEN": "A release engineer configures a GitHub Actions pipeline step executing RESULT=$(claude -p \"Analyze diff for breaking changes\"). The next step attempts to parse the response using echo \"$RESULT\" | jq '.has_breaking_changes', but the step crashes with jq: parse error: Invalid numeric literal at line 1, column 1. Why does jq fail to process the output string?",
    "question": "[d3-b07-new-012] Một kỹ sư phát hành cấu hình một bước trong đường ống GitHub Actions thực thi RESULT=$(claude -p \"Analyze diff for breaking changes\"). Bước tiếp theo cố gắng phân tích phản hồi bằng echo \"$RESULT\" | jq '.has_breaking_changes', nhưng bước này bị lỗi với thông báo jq: parse error: Invalid numeric literal at line 1, column 1. Tại sao jq không thể xử lý chuỗi đầu ra này?",
    "optionsEN": [
      "A. The environment variable ANTHROPIC_API_KEY was passed as plaintext rather than base64-encoded, causing Claude Code to output raw trace logs instead of text.",
      "B. Claude Code encountered a permission prompt timeout because --dangerously-skip-permissions was enabled in interactive mode.",
      "C. The stdin input stream was exceeded because diff.patch was piped into jq rather than directly into the claude -p prompt execution.",
      "D. Omitting --output-format json causes claude -p to emit plain text by default, which jq cannot parse as valid JSON structure."
    ],
    "options": [
      "A. Biến môi trường ANTHROPIC_API_KEY được truyền dưới dạng văn bản thuần thay vì mã hóa base64, khiến Claude Code xuất ra nhật ký vết thô thay vì văn bản.",
      "B. Claude Code gặp phải sự cố hết thời gian chờ yêu cầu quyền vì --dangerously-skip-permissions đã được bật ở chế độ tương tác.",
      "C. Luồng đầu vào stdin bị quá giới hạn dung lượng vì diff.patch được truyền qua ống dẫn vào jq thay vì truyền trực tiếp vào lệnh claude -p.",
      "D. Việc bỏ qua --output-format json khiến claude -p phát ra văn bản thuần theo mặc định, khiến jq không thể phân tích dưới dạng cấu trúc JSON hợp lệ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: API key encoding does not determine output structure; invalid keys trigger authentication exit errors rather than formatted plain text responses.",
      "Option B is incorrect: Omitting --dangerously-skip-permissions causes pipeline execution to hang on interactive prompts rather than producing unparsed text output.",
      "Option C is incorrect: Pipe buffer limits or input positioning do not dictate the output payload format emitted by Claude Code.",
      "Option D is correct: By default, claude -p outputs plain text (--output-format text). Downstream command utilities like jq require --output-format json to receive structured JSON objects."
    ],
    "rationale": "By default, claude -p produces plain human-readable markdown text (--output-format text). Piping plain text into JSON tools like jq causes parse errors. Specifying --output-format json instructs Claude Code to output structured JSON formatted for automated CI pipeline evaluation.",
    "explanation": "Theo mặc định, claude -p tạo ra văn bản định dạng markdown thuần cho người đọc (--output-format text). Việc truyền văn bản thuần vào các công cụ xử lý JSON như jq sẽ gây ra lỗi phân tích cú pháp. Việc chỉ định --output-format json yêu cầu Claude Code xuất cấu trúc JSON được định dạng sẵn để đánh giá tự động trong đường ống CI.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]