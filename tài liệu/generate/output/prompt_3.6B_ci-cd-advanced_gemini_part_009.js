[
  {
    "id": "d3-b07-B-017",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-017",
    "scenarioSignature": {
      "testedPrinciple": "sanitization of null byte characters in cli stdout before ci log ingestion",
      "failureMode": "ci job output log is truncated and displays blank code review results",
      "rootCause": "presence of unescaped null byte characters in generated review output breaking binary-unsafe shell parsers",
      "requiredFix": "strip or sanitize null byte character sequences prior to writing output to log artifacts"
    },
    "questionEN": "A GitHub Actions workflow executes claude -p \"Review diff\" > review.log on pull request commits. When inspecting the review step in the GitHub Actions runner log, the output appears truncated immediately after a code snippet containing binary string literals, causing the posted PR comment to be blank. Analysis shows the LLM output contained explicit \\u0000 (null byte) sequences, which caused standard shell string handling and runner logging streams to truncate at the first NUL character. What is the correct approach to prevent review truncation when capturing Claude Code output in CI pipelines?",
    "question": "[d3-b07-B-017] Một quy trình GitHub Actions chạy lệnh claude -p \"Review diff\" > review.log cho các commit pull request. Khi kiểm tra bước review trên nhật ký runner GitHub Actions, đầu ra bị cắt ngắn ngay sau một đoạn mã chứa các chuỗi literal nhị phân, khiến nhận xét PR tạo ra bị trống. Phân tích chỉ ra rằng đầu ra LLM có chứa các chuỗi byte null (\\u0000), khiến các bộ xử lý chuỗi shell tiêu chuẩn và luồng ghi log bị dừng lại tại ký tự NUL đầu tiên. Phương pháp đúng để ngăn chặn việc bị cắt ngắn khi thu thập đầu ra Claude Code trong CI pipeline là gì?",
    "optionsEN": [
      "A. Pipe stdout through tr -d '\\000' to strip null bytes before writing output to log files or PR comments.",
      "B. Add ACTIONS_STEP_DEBUG=true to the workflow environment variables to force the log parser to bypass null bytes.",
      "C. Pass --output-format json to claude -p so that null byte characters are automatically removed from stdout.",
      "D. Append --dangerously-skip-permissions to disable character encoding checks during non-interactive execution."
    ],
    "options": [
      "A. Lọc stdout qua tr -d '\\000' để loại bỏ các byte null trước khi ghi đầu ra vào tệp log hoặc nhận xét PR.",
      "B. Thêm ACTIONS_STEP_DEBUG=true vào các biến môi trường của workflow để buộc bộ phân tích log bỏ qua byte null.",
      "C. Truyền --output-format json vào claude -p để các ký tự byte null tự động được loại bỏ khỏi stdout.",
      "D. Thêm --dangerously-skip-permissions để tắt kiểm tra mã hóa ký tự trong quá trình thực thi không tương tác."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Sanitizing stdout with tr -d '\\000' removes NUL bytes (\\u0000) before they reach shell builtins or CI log output handlers that treat NUL as an end-of-string terminator.",
      "Option B: ACTIONS_STEP_DEBUG=true increases step execution log verbosity but does not modify standard C-string termination behavior in shell log parsers.",
      "Option C: Outputting JSON preserves data format but does not strip NUL byte characters if raw binary characters are present in the output stream.",
      "Option D: --dangerously-skip-permissions bypasses interactive tool confirmation prompts and has no relationship to character encoding or byte sanitization."
    ],
    "rationale": "Piping stdout through tr -d '\\000' removes null bytes from the CLI output before redirection, preventing C-style string functions in shell environments and CI log formatters from truncating the output at \\u0000.",
    "explanation": "Lựa chọn A là đáp án đúng vì việc chuyển hướng và lọc stdout qua tr -d '\\000' sẽ loại bỏ ký tự byte null (\\u0000) trước khi ghi vào tệp log hoặc truyền tới API của PR. Các công cụ xử lý chuỗi tiêu chuẩn trong shell (dựa trên C-string) coi byte null là ký tự kết thúc chuỗi, dẫn đến việc log bị cắt ngắn.\nLựa chọn B sai vì ACTIONS_STEP_DEBUG=true chỉ tăng chi tiết nhật ký gỡ lỗi chứ không thay đổi quy tắc xử lý kết thúc chuỗi của bộ phân tích log.\nLựa chọn C sai vì cờ --output-format json định dạng lại đầu ra thành cấu trúc JSON nhưng không tự động lọc bỏ các byte null nhị phân nếu xuất hiện trong nội dung review.\nLựa chọn D sai vì --dangerously-skip-permissions chỉ dùng để bỏ qua các câu lệnh hỏi quyền tương tác khi chạy headless CI, không can thiệp vào mã hóa ký tự.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-018",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-018",
    "scenarioSignature": {
      "testedPrinciple": "cost-optimized model routing across multi-stage ci automated review workflows",
      "failureMode": "excessive api consumption cost from running high-cost models on low-complexity automated checks",
      "rootCause": "uniform model selection applied indiscriminately across light formatting and deep security analysis steps",
      "requiredFix": "configure tier-appropriate model flags for specific pipeline stages based on task complexity"
    },
    "questionEN": "An engineering department runs automated Claude Code reviews across 200 pull requests daily. Currently, every PR build executes a single generic step using --model claude-3-5-sonnet for both fast style/lint validation and deep architectural security audits, resulting in high monthly API costs. The team wants to optimize CI spending without degrading security vulnerability detection. Which pipeline configuration strategy achieves the optimal balance of cost and review quality?",
    "question": "[d3-b07-B-018] Một bộ phận công nghệ vận hành quy trình đánh giá Claude Code tự động trên 200 pull request mỗi ngày. Hiện tại, mỗi build PR chạy một bước chung dùng --model claude-3-5-sonnet cho cả việc kiểm tra style/lint nhanh lẫn kiểm tra bảo mật kiến trúc sâu, dẫn đến chi phí API hàng tháng rất cao. Đội ngũ muốn tối ưu hóa chi phí CI mà không làm giảm khả năng phát hiện lỗ hổng bảo mật. Chiến lược cấu hình pipeline nào đạt được sự cân bằng tối ưu giữa chi phí và chất lượng đánh giá?",
    "optionsEN": [
      "A. Execute all CI workflow steps with --model claude-3-5-haiku and set --max-turns 30 during security reviews to let the lighter model retry complex analysis.",
      "B. Configure routine syntax and style check pipeline steps with --model claude-3-5-haiku, reserving expensive flagship models like --model claude-3-5-sonnet exclusively for security audit steps.",
      "C. Pass --dangerously-skip-permissions to all CI steps to automatically qualify for Anthropic's non-interactive automated workflow pricing tier.",
      "D. Set CLAUDE_COST_SAVINGS=true in the workflow environment variables to dynamically restrict token usage across pull request builds."
    ],
    "options": [
      "A. Thực thi tất cả các bước workflow CI với --model claude-3-5-haiku và đặt --max-turns 30 khi đánh giá bảo mật để mô hình nhẹ hơn thử lại các phân tích phức tạp.",
      "B. Cấu hình các bước kiểm tra cú pháp và style định kỳ với --model claude-3-5-haiku, và chỉ dành các mô hình cao cấp như --model claude-3-5-sonnet cho các bước đánh giá bảo mật.",
      "C. Truyền --dangerously-skip-permissions vào tất cả các bước CI để tự động đủ điều kiện hưởng mức giá quy trình tự động không tương tác của Anthropic.",
      "D. Đặt CLAUDE_COST_SAVINGS=true trong các biến môi trường của workflow để thu hẹp lượng token tiêu thụ một cách động trên các build pull request."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A: Lighter models lack frontier reasoning for deep architectural security vulnerabilities, and increasing turn limits on simple models increases token volume without improving security detection.",
      "Option B (Correct): Assigning cost-effective models (e.g., Haiku) to high-volume linting/style checks while routing complex security audits to flagship models (e.g., Sonnet) optimizes pipeline costs without compromising audit depth.",
      "Option C: --dangerously-skip-permissions bypasses interactive permission prompts in headless CI environments and does not alter API model pricing.",
      "Option D: CLAUDE_COST_SAVINGS is an invented configuration variable with no function in Claude Code CLI environment settings."
    ],
    "rationale": "Using --model claude-3-5-haiku for high-frequency linting and routine code style checks while reserving --model claude-3-5-sonnet for deep security audits aligns model capabilities with task complexity, significantly reducing API costs while maintaining security coverage.",
    "explanation": "Lựa chọn B là đáp án đúng vì việc phân chia mô hình theo độ phức tạp công việc cho phép tối ưu chi phí hiệu quả. Các bước kiểm tra style/lint diễn ra thường xuyên chỉ cần mô hình nhanh và rẻ như --model claude-3-5-haiku, trong khi các phân tích bảo mật sâu đòi hỏi khả năng suy luận cao của mô hình như --model claude-3-5-sonnet.\nLựa chọn A sai vì mô hình nhỏ hơn không có đủ khả năng suy luận sâu cho các lỗ hổng bảo mật phức tạp, việc tăng số lượt turn chỉ làm tốn thêm token mà không giải quyết được chất lượng.\nLựa chọn C sai vì cờ --dangerously-skip-permissions chỉ dùng để chạy chế độ tự động không cần xác nhận quyền, không áp dụng bất kỳ mức giảm giá API nào.\nLựa chọn D sai vì CLAUDE_COST_SAVINGS là một biến giả định không tồn tại trong Claude Code CLI.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]