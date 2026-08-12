[
  {
    "id": "d3-b07-3.5-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-003",
    "scenarioSignature": {
      "testedPrinciple": "headless stream-json vs monolithic json output formatting",
      "failureMode": "json parse error when consuming streaming CLI output in standard json parser",
      "rootCause": "newline delimited streaming json chunks emitted to non streaming parser",
      "requiredFix": "replace stream-json with standard json output format flag"
    },
    "questionEN": "A DevOps engineer configures a nightly security audit pipeline in GitLab CI using claude -p \"Audit dependencies\" --output-format stream-json. The pipeline script pipes stdout directly into jq '.summary' to extract the security report object. However, the job fails during execution with jq: parse error: Expected JSON value at line 2. What is the root cause of this parsing failure and the correct resolution?",
    "question": "[d3-b07-3.5-003] Một kỹ sư DevOps cấu hình pipeline kiểm tra bảo mật hàng đêm trong GitLab CI bằng lệnh claude -p \"Audit dependencies\" --output-format stream-json. Script pipeline điều hướng trực tiếp stdout vào jq '.summary' để trích xuất đối tượng báo cáo bảo mật. Tuy nhiên, job thất bại khi chạy với lỗi jq: parse error: Expected JSON value at line 2. Nguyên nhân gốc rễ của lỗi phân tích cú pháp này là gì và giải pháp xử lý đúng là gì?",
    "optionsEN": [
      "A. The --output-format stream-json flag requires --dangerously-skip-permissions to suppress interactive terminal approval banners before stream output begins.",
      "B. The CLI execution process terminated unexpectedly before closing stdout, causing jq to read incomplete binary chunk buffers.",
      "C. The --output-format stream-json option emits line-delimited JSON stream chunk events rather than a single monolithic JSON document, requiring --output-format json for standard parsers like jq.",
      "D. The --output-format stream-json flag redirects the structured JSON payload to stderr while sending raw text to stdout, causing jq to evaluate an empty input stream."
    ],
    "options": [
      "A. Cờ --output-format stream-json bắt buộc phải đi kèm với --dangerously-skip-permissions để ẩn các banner phê duyệt terminal tương tác trước khi bắt đầu luồng đầu ra.",
      "B. Tiến trình thực thi CLI bị chấm dứt đột ngột trước khi đóng stdout, khiến jq đọc phải các vùng đệm buffer nhị phân không hoàn chỉnh.",
      "C. Tùy chọn --output-format stream-json xuất ra các sự kiện dòng JSON phân tách bằng ký tự xuống dòng (NDJSON stream chunks) thay vì một tài liệu JSON đơn khối, do đó yêu cầu phải dùng --output-format json đối với các trình phân tích tiêu chuẩn như jq.",
      "D. Cờ --output-format stream-json chuyển hướng dữ liệu JSON cấu trúc sang stderr trong khi gửi văn bản thuần sang stdout, khiến jq nhận phải luồng đầu vào rỗng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Interactive permissions banners do not format stdout as streaming JSON; suppressed flags prevent prompt hangs but do not alter stream chunk structure.",
      "Option B is incorrect: Unexpected process termination or closed pipes produce unexpected EOF or broken pipe error codes, not structured NDJSON line parsing syntax errors.",
      "Option C is correct: --output-format stream-json produces progressive line-delimited JSON events intended for streaming consumers. Standard single-document JSON parsers like jq fail when attempting to parse multiple root JSON objects unless --output-format json is specified or stream processing is implemented.",
      "Option D is incorrect: Claude Code outputs stream-json events to standard output (stdout), not standard error (stderr)."
    ],
    "rationale": "Using --output-format stream-json streams newline-delimited JSON objects over stdout as execution progresses. Standard JSON utilities like jq expect a single valid JSON document when parsing standard input, leading to parse errors when encountering subsequent JSON chunk objects. Switching to --output-format json causes Claude Code to buffer and emit a single monolithic JSON payload upon completion.",
    "explanation": "Khi chạy lệnh trong chế độ headless, cờ --output-format stream-json làm cho Claude Code trả về dữ liệu dưới dạng các đoạn event JSON phân tách theo dòng (newline-delimited JSON - NDJSON) theo tiến trình thực thi. Khi truyền trực tiếp đầu ra này vào các công cụ phân tích JSON đơn khối tiêu chuẩn như jq, jq đọc xong đối tượng JSON đầu tiên trên dòng 1 và sẽ báo lỗi parse error khi gặp đối tượng JSON tiếp theo trên dòng 2. Để sửa lỗi này, pipeline cần đổi cờ sang --output-format json để thu được một đối tượng JSON tổng hợp duy nhất sau khi tác vụ hoàn thành.\n\n- Option A sai vì --dangerously-skip-permissions chỉ dùng để bỏ qua các câu hỏi cấp quyền tương tác, không thay đổi cấu trúc định dạng dữ liệu stream.\n- Option B sai vì việc tiến trình kết thúc đột ngột gây ra lỗi ngắt pipe hoặc EOF, không tạo ra lỗi phân tích cú pháp dòng tiếp theo trong NDJSON.\n- Option C đúng vì giải thích chính xác bản chất của stream-json tạo ra chuỗi nhiều object JSON theo dòng gây lỗi cho trình parser đơn khối.\n- Option D sai vì stream-json ghi dữ liệu ra stdout bình thường chứ không ghi sang stderr.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  },
  {
    "id": "d3-b07-3.5-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-004",
    "scenarioSignature": {
      "testedPrinciple": "headless agentic iteration limits via max-turns flag",
      "failureMode": "premature task termination with partial code refactoring",
      "rootCause": "agentic turn budget consumed before task completion steps finish",
      "requiredFix": "increase max-turns limit or allow unconstrained agentic iterations"
    },
    "questionEN": "A platform engineer implements an automated refactoring workflow in GitHub Actions executing claude -p \"Refactor API endpoints to v2 spec\" --max-turns 3 --dangerously-skip-permissions. When executed against a repository with 8 distinct controller files, Claude Code successfully refactors the first 2 controllers but halts execution with exit code 0 without modifying the remaining 6 files or running verification tests. What caused this incomplete execution, and how can it be resolved?",
    "question": "[d3-b07-3.5-004] Một kỹ sư nền tảng triển khai quy trình refactor tự động trong GitHub Actions chạy lệnh claude -p \"Refactor API endpoints to v2 spec\" --max-turns 3 --dangerously-skip-permissions. Khi chạy trên một repository chứa 8 file controller độc lập, Claude Code refactor thành công 2 controller đầu tiên nhưng dừng thực thi với exit code 0 mà không chỉnh sửa 6 file còn lại hay chạy các bài test kiểm tra. Điều gì đã gây ra tình trạng thực thi không hoàn chỉnh này và làm thế nào để khắc phục?",
    "optionsEN": [
      "A. The --dangerously-skip-permissions flag expires after 3 tool calls, forcing Claude Code to silently exit when subsequent file edit approvals are required.",
      "B. The repository experienced file lock contention after modifying 2 files, triggering an automatic fallback mechanism that terminates headless execution.",
      "C. The API context window size exceeded maximum limits after editing 2 controllers, causing Claude Code to truncate remaining tool invocations.",
      "D. The --max-turns 3 parameter restricted the agentic loop to 3 turns, truncating execution before multi-file refactoring completed, requiring --max-turns to be increased or omitted."
    ],
    "options": [
      "A. Cờ --dangerously-skip-permissions hết hiệu lực sau 3 lệnh gọi tool, buộc Claude Code phải thoát trong im lặng khi yêu cầu phê duyệt sửa file tiếp theo.",
      "B. Repository gặp sự cố tranh chấp khóa file (file lock) sau khi sửa 2 file, kích hoạt cơ chế tự động dừng thực thi trong chế độ headless.",
      "C. Kích thước ngữ cảnh API vượt quá giới hạn tối đa sau khi sửa 2 controller, khiến Claude Code cắt bỏ các lệnh gọi tool còn lại.",
      "D. Tham số --max-turns 3 đã giới hạn vòng lặp agentic trong 3 lượt thực thi, làm ngừng tiến trình trước khi việc refactor nhiều file hoàn tất, đòi hỏi phải tăng giá trị hoặc bỏ --max-turns."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: --dangerously-skip-permissions remains active throughout the entire headless CLI session and does not expire based on turn count.",
      "Option B is incorrect: Claude Code does not silently abort execution due to file locks; file access issues produce explicit tool error responses.",
      "Option C is incorrect: Reaching context limits results in context truncation or auto-compaction messages, not a clean exit code 0 after exactly 3 execution steps.",
      "Option D is correct: --max-turns N caps the maximum number of agentic execution turns (tool calls and responses) in a headless -p session. Setting --max-turns 3 forced Claude Code to exit after 3 turns (e.g., searching codebase, editing file 1, editing file 2) before it could complete the remaining file edits and tests. Increasing or removing --max-turns allows the agent to complete all required steps."
    ],
    "rationale": "The --max-turns parameter sets an explicit limit on how many interaction turns (loops of reading context, making tool calls, receiving tool responses) Claude Code can execute during a headless -p prompt run. Complex multi-file refactoring tasks require multiple turns to inspect, edit, and test across the codebase. When --max-turns 3 is reached, Claude Code gracefully finishes its current turn and exits cleanly with code 0, leaving the remainder of the task unexecuted. Increasing --max-turns or omitting it provides sufficient turns to complete the entire agentic task.",
    "explanation": "Trong chế độ headless (claude -p), tham số --max-turns N thiết lập giới hạn số lượt tương tác (vòng lặp gọi tool và xử lý phản hồi) mà agent được phép thực hiện. Một công việc refactor phức tạp trên nhiều file cần nhiều lượt tương tác để đọc mã nguồn, sửa từng file và chạy test xác nhận. Khi đặt --max-turns 3, Claude Code dừng thực thi ngay sau khi hết 3 lượt (ví dụ: lượt 1 đọc cấu trúc, lượt 2 sửa controller 1, lượt 3 sửa controller 2) và thoát bình thường (exit code 0). Để khắc phục, cần tăng giá trị --max-turns lên đủ lớn hoặc bỏ cờ này để Claude Code tự hoàn thành toàn bộ công việc.\n\n- Option A sai vì --dangerously-skip-permissions có hiệu lực trong toàn bộ phiên làm việc chứ không hết hạn sau 3 lần gọi tool.\n- Option B sai vì tranh chấp file sẽ trả về lỗi công cụ cụ thể chứ không lặng lẽ thoát thành công.\n- Option C sai vì vượt giới hạn context window sẽ kích hoạt cơ chế nén ngữ cảnh (compaction) hoặc báo lỗi context, không dừng đúng ở lượt thứ 3 với exit code 0.\n- Option D đúng vì giải thích chính xác vai trò của --max-turns trong việc giới hạn vòng lặp agentic của phiên headless.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  }
]