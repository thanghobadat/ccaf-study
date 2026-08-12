[
  {
    "id": "d3-b07-new-015",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-015",
    "scenarioSignature": {
      "testedPrinciple": "structured output field verification in continuous integration pipelines",
      "failureMode": "pipeline stage silently passes unreviewed code changes",
      "rootCause": "missing target property in json response payload resolving to null string",
      "requiredFix": "enforce strict check for property existence and non null content in output script"
    },
    "questionEN": "A continuous integration pipeline uses claude -p \"Audit codebase changes\" --output-format json to run non-interactive security reviews. The pipeline step evaluates the command output using jq -r '.result' to inspect finding details. However, when an execution anomaly occurs and the returned JSON structure lacks the .result field, jq outputs null. The pipeline script checks if [ \"$RESULT\" != \"null\" ] but fails to handle empty or missing properties, resulting in a silent pipeline pass without executing the review logic. What is the root cause of this false-positive CI approval?",
    "question": "[d3-b07-new-015] Một đường ống tích hợp liên tục (CI) sử dụng claude -p \"Audit codebase changes\" --output-format json để thực hiện đánh giá bảo mật phi tương tác. Bước đường ống đánh giá đầu ra của lệnh bằng cách sử dụng jq -r '.result' để kiểm tra chi tiết phát hiện. Tuy nhiên, khi xảy ra bất thường trong quá trình thực thi và cấu trúc JSON trả về thiếu trường .result, jq sẽ trả về null. Kịch bản đường ống kiểm tra if [ \"$RESULT\" != \"null\" ] nhưng không xử lý các thuộc tính rỗng hoặc bị thiếu, dẫn đến việc đường ống âm thầm vượt qua mà không thực hiện logic đánh giá. Nguyên nhân gốc rễ của phê duyệt CI báo động giả này là gì?",
    "optionsEN": [
      "A. Claude Code exited with code 1, but --output-format json suppressed the exit status and forced the pipeline to return exit code 0.",
      "B. The CLI command omitted --dangerously-skip-permissions, causing the job to stall until the pipeline timeout threshold was reached.",
      "C. The parsing script relied on .result without verifying field existence, causing jq to return null and bypassing validation logic.",
      "D. The secret key configuration expired during runtime, causing Claude Code to output an raw text error block directly to stderr."
    ],
    "options": [
      "A. Claude Code đã thoát với mã lỗi 1, nhưng --output-format json đã ẩn trạng thái thoát và buộc đường ống trả về mã 0.",
      "B. Lệnh CLI đã bỏ qua --dangerously-skip-permissions, khiến công việc bị treo cho đến khi đạt ngưỡng hết giờ của đường ống.",
      "C. Kịch bản phân tích phụ thuộc vào .result mà không xác minh sự tồn tại của trường, khiến jq trả về null và bỏ qua logic xác thực.",
      "D. Cấu trúc khóa bí mật đã hết hạn trong quá trình thực thi, khiến Claude Code xuất khối lỗi văn bản thuần trực tiếp ra stderr."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because --output-format json formats the response structure and does not override process exit status codes.",
      "Option B is incorrect because omitting --dangerously-skip-permissions causes non-interactive sessions to hang at permission prompts rather than producing missing JSON fields.",
      "Option C is correct because when --output-format json output lacks the expected .result field, jq outputs the literal string 'null', which bypasses simple non-null presence checks if empty payload structures are not validated.",
      "Option D is incorrect because authentication errors prevent CLI execution entirely and result in a non-zero exit code rather than malformed result JSON."
    ],
    "rationale": "When parsing structured CLI output in CI pipelines using tools like jq, scripts must validate that the expected top-level field (such as .result) actually exists and contains valid payload data. If the field is missing from the JSON payload, jq outputs null, which can cause improperly constructed status checks to pass silently.",
    "explanation": "Trong các đường ống CI/CD, khi cấu hình Claude Code xuất kết quả dạng JSON với --output-format json, kịch bản phân tích downstream (như jq) cần kiểm tra sự tồn tại thực sự của thuộc tính mong đợi. Nếu cấu trúc JSON trả về thiếu trường .result (ví dụ do phản hồi không chuẩn hoặc lỗi hệ thống), lệnh jq -r '.result' sẽ trả về chuỗi null. Nếu kịch bản kiểm tra logic không xử lý trường hợp giá trị bị thiếu/null này một cách chặt chẽ, bước kiểm tra sẽ bị bỏ qua và ghi nhận thành công giả (false-positive).\n\n- Phương án A sai vì cờ --output-format json chỉ định dạng dữ liệu xuất ra, không can thiệp hay ghi đè mã thoát (exit code) của tiến trình.\n- Phương án B sai vì việc thiếu cờ --dangerously-skip-permissions sẽ khiến lệnh bị treo chờ tương tác người dùng chứ không tạo ra kết quả JSON thiếu trường .result.\n- Phương án C đúng vì kịch bản phân tích dựa vào trường .result mà không kiểm tra tính tồn tại của trường, khiến jq xuất chuỗi null và vô tình vượt qua bước kiểm soát chất lượng.\n- Phương án D sai vì lỗi xác thực khóa bí mật sẽ làm tiến trình thất bại ngay lập tức với mã thoát khác 0 chứ không trả về kết quả JSON bị thiếu thuộc tính.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-016",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-016",
    "scenarioSignature": {
      "testedPrinciple": "api key environment variable binding for automated process execution",
      "failureMode": "automated pipeline job fails immediately with authentication error",
      "rootCause": "misconfigured environment variable identifier in pipeline step settings",
      "requiredFix": "export api secret using standard environment variable identifier expected by executable"
    },
    "questionEN": "A DevOps engineer configures a GitHub Actions workflow step to execute headless code reviews using claude -p \"Review PR diff\". In the workflow file, the secret secrets.ANTHROPIC_API_KEY is mapped inside the step's environment block as env: ANTHROPIC_KEY: ${{ secrets.ANTHROPIC_API_KEY }}. During workflow execution, the job fails immediately with an authentication error stating that no valid API key was found. What configuration mistake caused this failure?",
    "question": "[d3-b07-new-016] Một kỹ sư DevOps cấu hình một bước workflow GitHub Actions để thực hiện đánh giá mã tự động bằng claude -p \"Review PR diff\". Trong file workflow, secret secrets.ANTHROPIC_API_KEY được ánh xạ bên trong khối môi trường của bước dạng env: ANTHROPIC_KEY: ${{ secrets.ANTHROPIC_API_KEY }}. Trong quá trình chạy workflow, job thất bại ngay lập tức với lỗi xác thực báo rằng không tìm thấy API key hợp lệ. Lỗi cấu hình nào đã gây ra thất bại này?",
    "optionsEN": [
      "A. GitHub Actions secrets must be referenced using env.ANTHROPIC_API_KEY instead of secrets.ANTHROPIC_API_KEY.",
      "B. Claude Code in non-interactive mode requires the API key to be passed via the --api-key command-line argument.",
      "C. Step-level env: blocks cannot access repository secrets in GitHub Actions workflows.",
      "D. Claude Code looks specifically for ANTHROPIC_API_KEY, so mapping the secret to ANTHROPIC_KEY left the required environment variable unset."
    ],
    "options": [
      "A. Bí mật của GitHub Actions phải được tham chiếu bằng env.ANTHROPIC_API_KEY thay vì secrets.ANTHROPIC_API_KEY.",
      "B. Claude Code ở chế độ phi tương tác yêu cầu API key phải được truyền qua đối số dòng lệnh --api-key.",
      "C. Các khối env: ở cấp độ bước không thể truy cập bí mật của kho lưu trữ trong workflow GitHub Actions.",
      "D. Claude Code tìm kiếm chính xác biến ANTHROPIC_API_KEY, do đó việc ánh xạ secret tới ANTHROPIC_KEY đã khiến biến môi trường bắt buộc bị bỏ trống."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because secrets.ANTHROPIC_API_KEY is the standard and correct GitHub Actions context syntax for accessing repository secrets.",
      "Option B is incorrect because Claude Code reads API credentials from the standard ANTHROPIC_API_KEY environment variable rather than requiring a command-line flag.",
      "Option C is incorrect because step-level env: blocks are fully capable of injecting repository secrets into command environments.",
      "Option D is correct because Claude Code specifically inspects the ANTHROPIC_API_KEY environment variable for authentication; supplying ANTHROPIC_KEY causes the CLI to find no API key and fail authentication."
    ],
    "rationale": "Claude Code requires the standard environment variable name ANTHROPIC_API_KEY to authenticate API calls in CI/CD environments. If a CI pipeline configures an alternative variable name like ANTHROPIC_KEY, Claude Code will fail to locate the credentials.",
    "explanation": "Khi chạy Claude Code trong môi trường CI/CD (như GitHub Actions), công cụ CLI tự động tìm kiếm thông tin xác thực API từ biến môi trường tiêu chuẩn có tên là ANTHROPIC_API_KEY. Nếu trong tệp workflow, kỹ sư đặt tên biến môi trường trong khối env: là ANTHROPIC_KEY (thiếu chữ _API), Claude Code sẽ không nhận diện được khóa xác thực và báo lỗi không tìm thấy API key ngay khi khởi chạy.\n\n- Phương án A sai vì cú pháp ${{ secrets.ANTHROPIC_API_KEY }} là cú pháp chuẩn của GitHub Actions để truy cập bí mật kho lưu trữ.\n- Phương án B sai vì Claude Code đọc thông tin xác thực từ biến môi trường tiêu chuẩn chứ không yêu cầu tham số dòng lệnh --api-key.\n- Phương án C sai vì các khối env: ở cấp độ bước hoàn toàn có quyền truy cập và gán các secret của kho lưu trữ vào môi trường thực thi.\n- Phương án D đúng vì Claude Code yêu cầu chính xác tên biến môi trường ANTHROPIC_API_KEY; việc gán vào ANTHROPIC_KEY khiến biến môi trường mà CLI tìm kiếm bị rỗng.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]