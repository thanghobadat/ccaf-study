[
  {
    "id": "d3-b07-new-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-005",
    "scenarioSignature": {
      "testedPrinciple": "stdin input limits versus file path references in CLI automation",
      "failureMode": "pipeline execution failure due to buffer overflow on large input stream",
      "rootCause": "piping large file content directly into standard input pipe",
      "requiredFix": "pass file path references directly to allow native file reading"
    },
    "questionEN": "A DevOps team configures a GitHub Actions pipeline step to review large pull request changes using the shell command cat pr_diff.patch | claude -p \"Review this patch for security issues\". When developers submit a PR containing a major refactor (a 45MB patch file), the pipeline job crashes with a stdin pipe buffer overflow and memory allocation error. What is the root cause of this failure and how should the pipeline step be refactored?",
    "question": "[d3-b07-new-005] Một đội ngũ DevOps cấu hình bước GitHub Actions pipeline để xem xét các thay đổi pull request lớn bằng lệnh shell cat pr_diff.patch | claude -p \"Review this patch for security issues\". Khi các lập trình viên gửi một PR chứa đợt tái cấu trúc lớn (file patch 45MB), công việc pipeline bị crash với lỗi stdin pipe buffer overflow và cấp phát bộ nhớ. Nguyên nhân gốc rễ của lỗi này là gì và bước pipeline nên được viết lại như thế nào?",
    "optionsEN": [
      "A. Piping large file content into stdin exceeds process stream buffer limits; the step should pass the file path in the prompt or command context so Claude Code reads the file directly.",
      "B. The -p flag disables memory caching for piped inputs; the step should use --dangerously-skip-permissions to allow stdin streaming to bypass buffer limits.",
      "C. Stdin pipes require interactive terminal TTY allocation; the step should append --output-format text to convert the stream buffer into an asynchronous queue.",
      "D. Claude Code limits standard input payloads to 100KB by default; the step should pass --max-turns 45 to split the stdin buffer across multiple execution turns."
    ],
    "options": [
      "A. Việc pipe nội dung file lớn vào stdin vượt quá giới hạn bộ đệm luồng tiến trình; bước này nên truyền đường dẫn file trong prompt hoặc ngữ cảnh lệnh để Claude Code đọc trực tiếp từ hệ thống file.",
      "B. Cờ -p vô hiệu hóa bộ nhớ đệm cho đầu vào piped; bước này nên dùng --dangerously-skip-permissions để cho phép luồng stdin bỏ qua giới hạn bộ đệm.",
      "C. Luồng pipe Stdin yêu cầu cấp phát terminal TTY tương tác; bước này nên thêm --output-format text để chuyển đổi bộ đệm luồng thành hàng đợi bất đồng bộ.",
      "D. Claude Code giới hạn dung lượng đầu vào tiêu chuẩn mặc định là 100KB; bước này nên truyền --max-turns 45 để chia nhỏ bộ đệm stdin qua nhiều lượt thực thi."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because piping large binary or text diffs via stdin causes shell process pipe buffer overflows; referencing the file path allows Claude Code to read the file directly from the filesystem.",
      "Option B is incorrect because --dangerously-skip-permissions bypasses interactive permission prompts, not OS/process pipe stream buffer boundaries.",
      "Option C is incorrect because --output-format text controls stdout response formatting, not stdin input stream buffer handling or TTY requirements.",
      "Option D is incorrect because --max-turns limits conversation turns in multi-turn interactions and does not expand shell pipe buffer capacity."
    ],
    "rationale": "Piping large content through shell stdin streams can encounter buffer limitations or allocation crashes. Passing the file path directly in the prompt or referencing it in the workspace allows Claude Code to open and inspect the file efficiently via standard file system operations.",
    "explanation": "Phương án A là chính xác vì việc chuyển dữ liệu file dung lượng lớn qua pipe stdin (cat diff.patch | claude ...) khiến tiến trình shell dễ vượt quá giới hạn bộ đệm (buffer overflow) của OS/process stream. Giải pháp đúng là truyền trực tiếp đường dẫn file trong câu lệnh/prompt để Claude Code tự đọc nội dung qua hệ thống file.\nPhương án B sai vì --dangerously-skip-permissions chỉ dùng để bỏ qua các yêu cầu xác nhận quyền tương tác trong môi trường CI/CD, không liên quan đến giới hạn bộ đệm stdin.\nPhương án C sai vì --output-format text chỉ định dạng đầu ra của kết quả trả về (stdout), không giải quyết vấn đề luồng dữ liệu đầu vào (stdin).\nPhương án D sai vì --max-turns giới hạn số lượt hội thoại của mô hình trong headless mode chứ không có chức năng mở rộng bộ đệm stdin của tiến trình.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-006",
    "scenarioSignature": {
      "testedPrinciple": "structured output format selection for automated pipeline parsing",
      "failureMode": "downstream pipeline step parsing failure from natural language response variation",
      "rootCause": "using plain text output format with regex matching for programmatic control flow",
      "requiredFix": "specify structured json output format and parse payload with structured query tool"
    },
    "questionEN": "A CI/CD engineer creates a GitLab CI job to parse security recommendations from Claude Code using claude -p \"Audit dependencies\" --output-format text. The job uses a regex grep -E \"Vulnerability: (HIGH|CRITICAL)\" to fail the pipeline gate. After a model update changes the output text phrasing from 'Vulnerability: HIGH' to 'Severity Level: High', the regex fails to match and critical vulnerabilities bypass the gate. How should the command be restructured to make the pipeline parsing resilient?",
    "question": "[d3-b07-new-006] Một kỹ sư CI/CD tạo công việc GitLab CI để phân tích các đề xuất bảo mật từ Claude Code bằng lệnh claude -p \"Audit dependencies\" --output-format text. Công việc này sử dụng biểu thức chính quy grep -E \"Vulnerability: (HIGH|CRITICAL)\" để làm thất bại bước kiểm duyệt pipeline. Sau khi bản cập nhật mô hình thay đổi cách diễn đạt văn bản đầu ra từ 'Vulnerability: HIGH' thành 'Severity Level: High', regex không khớp được dữ liệu và các lỗ hổng nghiêm trọng bị lọt qua bước kiểm duyệt. Câu lệnh nên được tái cấu trúc như thế nào để việc phân tích của pipeline hoạt động bền vững?",
    "optionsEN": [
      "A. Append --disallowedTools \"grep\" to force Claude Code to format its plain text output using standardized RFC-compliant security markers.",
      "B. Change the flag to --output-format json and parse the structured JSON payload using jq rather than relying on regex over plain text response wording.",
      "C. Add --max-turns 1 to guarantee that Claude Code retains identical natural language phrasing across model updates.",
      "D. Replace -p with --dangerously-skip-permissions to output raw terminal control sequences that prevent string refactoring."
    ],
    "options": [
      "A. Thêm --disallowedTools \"grep\" để bắt buộc Claude Code định dạng văn bản thô của nó bằng các nhãn bảo mật chuẩn hóa tuân thủ RFC.",
      "B. Đổi cờ thành --output-format json và phân tích dữ liệu cấu trúc JSON bằng jq thay vì phụ thuộc vào regex trên văn bản phản hồi tự nhiên.",
      "C. Thêm --max-turns 1 để đảm bảo Claude Code duy trì cách diễn đạt ngôn ngữ tự nhiên giống hệt nhau qua các bản cập nhật mô hình.",
      "D. Thay thế -p bằng --dangerously-skip-permissions để xuất các chuỗi điều khiển terminal thô nhằm ngăn chặn việc tái cấu trúc chuỗi."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because --disallowedTools prevents Claude Code from invoking specific CLI tools, but does not standardize plain text output formatting.",
      "Option B is correct because --output-format json returns structured JSON data containing explicit status and result fields that can be robustly parsed with jq in CI scripts.",
      "Option C is incorrect because --max-turns limits execution turns but cannot enforce deterministic natural language phrasing across model updates.",
      "Option D is incorrect because --dangerously-skip-permissions bypasses interactive prompts and has no bearing on response text structure or string refactoring."
    ],
    "rationale": "Using plain text output (--output-format text) for programmatic CI parsing is fragile because LLM natural language phrasing can change between model versions. Specifying --output-format json provides a stable schema that can be reliably parsed using jq or JSON parsers.",
    "explanation": "Phương án B là chính xác vì việc sử dụng --output-format text kết hợp với regex để phân tích kết quả trong CI/CD rất dễ bị lỗi (brittle) khi mô hình thay đổi cách diễn đạt ngôn ngữ tự nhiên. Việc đổi sang --output-format json sẽ trả về dữ liệu cấu trúc JSON ổn định, cho phép các công cụ như jq trích xuất thông tin chính xác và bền vững.\nPhương án A sai vì --disallowedTools dùng để cấm Claude Code sử dụng công cụ nhất định, không có khả năng chuẩn hóa văn bản đầu ra theo chuẩn RFC.\nPhương án C sai vì --max-turns chỉ giới hạn số lượt tương tác trong headless mode, không thể bắt buộc mô hình giữ nguyên văn phong tự nhiên giữa các phiên bản.\nPhương án D sai vì --dangerously-skip-permissions dùng để bỏ qua các phản hồi xác nhận quyền trong CI/CD, không liên quan đến cấu trúc dữ liệu hoặc chuỗi điều khiển terminal.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]