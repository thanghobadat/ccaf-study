[
  {
    "id": "d3-b07-new-021",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-21",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-021",
    "scenarioSignature": {
      "testedPrinciple": "output format preservation under execution turn limit constraints",
      "failureMode": "confusion over stdout payload schema when process halts early",
      "rootCause": "misunderstanding flag orthogonality between output formatting and turn limits",
      "requiredFix": "parse structured json output containing max turn termination metadata"
    },
    "questionEN": "A DevOps engineer configures a GitHub Actions pipeline step executing claude -p \"Refactor security helper functions\" --output-format json --max-turns 3. The refactoring task requires 5 interaction turns to analyze code references and apply edits. How do the --output-format json and --max-turns 3 flags interact when execution reaches turn 3?",
    "question": "[d3-b07-new-021] Một kỹ sư DevOps cấu hình một bước trong GitHub Actions pipeline thực thi claude -p \"Refactor security helper functions\" --output-format json --max-turns 3. Tác vụ refactor này đòi hỏi 5 lượt tương tác để phân tích mã nguồn và áp dụng chỉnh sửa. Cờ --output-format json và --max-turns 3 tương tác như thế nào khi quá trình thực thi chạm mốc lượt thứ 3?",
    "optionsEN": [
      "A. --output-format json remains active, causing Claude Code to output a valid JSON structure containing execution metadata that indicates the maximum turn limit was reached.",
      "B. --max-turns 3 takes precedence and forces Claude Code to output plain text execution logs instead of JSON when terminating.",
      "C. --output-format json overrides --max-turns 3, allowing execution to continue for 5 turns until full task completion.",
      "D. Claude Code throws a command-line flag conflict error and fails to initialize because output formatting cannot be combined with turn constraints."
    ],
    "options": [
      "A. --output-format json vẫn có hiệu lực, khiến Claude Code xuất một cấu trúc JSON hợp lệ chứa dữ liệu hệ thống chỉ ra rằng đã đạt giới hạn lượt tối đa.",
      "B. --max-turns 3 chiếm ưu thế và buộc Claude Code xuất log thực thi dạng văn bản thuần (plain text) thay vì JSON khi kết thúc.",
      "C. --output-format json ghi đè --max-turns 3, cho phép quá trình thực thi tiếp tục trải qua 5 lượt cho đến khi hoàn thành toàn bộ tác vụ.",
      "D. Claude Code báo lỗi xung đột cờ lệnh trên dòng lệnh và không thể khởi tạo vì không thể kết hợp định dạng đầu ra với giới hạn lượt."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: --output-format json controls stdout formatting independently of turn controls, wrapping execution status metadata (including max turns reached) inside valid JSON.",
      "Option B is incorrect: --max-turns limits execution turns but does not alter or suppress the requested --output-format json structure.",
      "Option C is incorrect: --output-format json does not bypass --max-turns limits; execution halts strictly after 3 turns.",
      "Option D is incorrect: --output-format json and --max-turns are compatible flags designed to work together in non-interactive CI automation."
    ],
    "rationale": "In Claude Code headless execution, --output-format json specifies the output structure schema on stdout, whereas --max-turns sets the process termination boundary. When --max-turns 3 is reached before task completion, Claude Code respects both flags by terminating execution and rendering a valid JSON object containing status metadata indicating that the turn limit was exceeded.",
    "explanation": "Trong chế độ thực thi không tương tác (headless mode) của Claude Code, cờ --output-format json quy định cấu trúc xuất dữ liệu ra stdout, trong khi cờ --max-turns thiết lập giới hạn số lượt tương tác của tiến trình. Hai cờ này hoạt động độc lập và không ghi đè lẫn nhau. Khi tiến trình chạm mốc 3 lượt theo --max-turns 3 mà công việc chưa hoàn tất, Claude Code sẽ dừng lại và vẫn xuất ra một đối tượng JSON hợp lệ chứa các thông tin trạng thái chỉ ra rằng tiến trình đã đạt giới hạn lượt.\n\n- Lựa chọn A đúng vì định dạng JSON luôn được đảm bảo duy trì dù tiến trình bị dừng sớm do giới hạn lượt.\n- Lựa chọn B sai vì cờ --max-turns không hạ cấp định dạng đầu ra về plain text.\n- Lựa chọn C sai vì cờ định dạng không có khả năng bỏ qua giới hạn số lượt thực thi đã thiết lập.\n- Lựa chọn D sai vì hai cờ lệnh này hoàn toàn tương thích và thường xuyên được kết hợp trong các kịch bản tự động hóa CI/CD.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-022",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-22",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-022",
    "scenarioSignature": {
      "testedPrinciple": "process timeout boundaries in automated headless execution",
      "failureMode": "abrupt process termination mid response without structured output",
      "rootCause": "ci runner timeout threshold lower than model api execution duration",
      "requiredFix": "increase ci step timeout setting to exceed expected model latency"
    },
    "questionEN": "A GitLab CI pipeline step executes claude -p \"Generate complex multi-file end-to-end integration tests\" with a strict job step timeout configured to 30 seconds. The Anthropic API call for this generation task takes 45 seconds to synthesize and stream the complete response. What occurs when the CI runner timeout threshold is crossed?",
    "question": "[d3-b07-new-022] Một bước trong GitLab CI pipeline thực thi lệnh claude -p \"Generate complex multi-file end-to-end integration tests\" với thời gian chờ (timeout) của công việc được cấu hình nghiêm ngặt là 30 giây. Cuộc gọi Anthropic API cho tác vụ tạo mã này mất 45 giây để tổng hợp và phản hồi đầy đủ. Điều gì xảy ra khi ngưỡng timeout của CI runner bị vượt quá?",
    "optionsEN": [
      "A. Claude Code detects the runner timeout at 30 seconds, automatically reduces its context window, and retries the generation within the remaining budget.",
      "B. The CI runner forcefully terminates the claude -p process at 30 seconds, killing execution mid-response and causing the CI job to report a timeout failure.",
      "C. The Anthropic API buffers the generated output on the server side and streams the remaining content back to GitLab CI once the step is re-executed.",
      "D. claude -p detaches into a background daemon process upon reaching 30 seconds, returning exit code 0 immediately while continuing file generation."
    ],
    "options": [
      "A. Claude Code phát hiện runner timeout ở mốc 30 giây, tự động thu nhỏ cửa sổ ngữ cảnh và thử lại việc tạo mã trong khoảng thời gian còn lại.",
      "B. CI runner ép dừng tiến trình claude -p ở mốc 30 giây, hủy bỏ thực thi ngay giữa quá trình nhận phản hồi và khiến CI job thất bại do vượt quá timeout.",
      "C. Anthropic API đệm kết quả đầu ra trên máy chủ và truyền phần còn lại về GitLab CI ngay khi bước công việc được thực thi lại.",
      "D. Lệnh claude -p tách thành một tiến trình nền (daemon) khi chạm mốc 30 giây, trả về exit code 0 ngay lập tức trong khi vẫn tiếp tục tạo file."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Claude Code cannot dynamically intercept host runner SIGKILL signals or reduce API model processing time retroactively.",
      "Option B is correct: When the CI runner timeout (30s) is less than the required API response duration (45s), the runner kills the claude -p process mid-response, yielding an incomplete run and CI job failure.",
      "Option C is incorrect: Anthropic API responses are not buffered server-side for recovery across killed local CLI processes.",
      "Option D is incorrect: claude -p runs as a synchronous foreground process by default and does not spawn background daemons to bypass CI runner timeouts."
    ],
    "rationale": "When running claude -p inside a CI pipeline, the CLI executes as a foreground process bounded by the CI runner's step timeout. If API generation time (45s) exceeds the runner timeout (30s), the operating system/runner sends a termination signal (SIGKILL/SIGTERM) to kill the process. This truncates execution without emitting complete output, causing the CI pipeline step to fail.",
    "explanation": "Khi thực thi claude -p trong pipeline CI/CD, lệnh này hoạt động như một tiến trình đồng bộ ở tiền cảnh (foreground) và chịu sự kiểm soát trực tiếp bởi thời gian chờ (timeout) của CI runner. Nếu thời gian xử lý phản hồi từ Anthropic API (45 giây) vượt quá giới hạn timeout được cấu hình cho CI runner (30 giây), hệ thống runner sẽ gửi tín hiệu kết thúc (SIGKILL/SIGTERM) để buộc dừng tiến trình claude -p. Hậu quả là tiến trình bị ngắt giữa chừng, không tạo ra được kết quả hoàn chỉnh và bước CI job báo lỗi thất bại.\n\n- Lựa chọn A sai vì Claude Code không thể can thiệp vào tín hiệu dừng của hệ điều hành runner để tự động thay đổi kích thước ngữ cảnh.\n- Lựa chọn B đúng vì runner sẽ ép dừng tiến trình claude -p khi hết 30 giây, khiến job thất bại.\n- Lựa chọn C sai vì Anthropic API không lưu đệm kết quả trên server để khôi phục khi tiến trình local CLI bị hủy.\n- Lựa chọn D sai vì claude -p không tự động tách thành daemon chạy ngầm để qua mặt thời gian chờ của CI runner.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]