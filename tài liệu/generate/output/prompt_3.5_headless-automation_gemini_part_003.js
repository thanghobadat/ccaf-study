[
  {
    "id": "d3-b07-3.5-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-005",
    "scenarioSignature": {
      "testedPrinciple": "rate limiting and retry logic in parallel headless CLI execution",
      "failureMode": "batch execution failure due to unhandled rate limit HTTP status codes",
      "rootCause": "spawning multiple background claude -p processes concurrently without exponential backoff or concurrency control",
      "requiredFix": "implement concurrency limits or exponential backoff retry loops for parallel headless calls"
    },
    "questionEN": "A DevOps engineer constructs a shell script to generate documentation across 50 microservices concurrently using for dir in repos/*; do (claude -p \"Summarize architecture\" -C \"$dir\" > \"$dir/SUMMARY.md\") & done; wait. During execution, several background tasks terminate abruptly with HTTP 429 rate-limit errors, resulting in empty or incomplete SUMMARY.md files. Why does this parallel execution fail, and what is the proper solution?",
    "question": "[d3-b07-3.5-005] Kỹ sư DevOps viết một script shell để tạo tài liệu tự động cho 50 dịch vụ microservice đồng thời bằng lệnh for dir in repos/*; do (claude -p \"Summarize architecture\" -C \"$dir\" > \"$dir/SUMMARY.md\") & done; wait. Trong quá trình chạy, nhiều tiến trình nền bị ngắt đột ngột với lỗi giới hạn tốc độ HTTP 429, dẫn đến các file SUMMARY.md bị rỗng hoặc không hoàn chỉnh. Tại sao việc thực thi song song này bị thất bại và giải pháp phù hợp là gì?",
    "optionsEN": [
      "A. Concurrently spawning 50 unthrottled claude -p requests exceeds API rate limits, failing immediately without automated retries; throttling parallelism or implementing exponential backoff retries resolves the issue.",
      "B. The wait command cancels background subshells when any child process exits with a non-zero status code, killing all remaining tasks before completion.",
      "C. claude -p fails because running in background mode (&) detaches standard input, causing Claude Code to prompt for user confirmation interactively.",
      "D. Executing claude -p across multiple directories concurrently causes workspace configuration corruption in ~/.claude.json due to concurrent lock file contention."
    ],
    "options": [
      "A. Việc khởi chạy đồng thời 50 yêu cầu claude -p không khống chế tốc độ vượt quá giới hạn rate limit của API và thất bại ngay lập tức do thiếu cơ chế thử lại tự động; việc giới hạn số lượng tiến trình song song hoặc bổ sung logic thử lại với exponential backoff sẽ khắc phục vấn đề này.",
      "B. Lệnh wait hủy các subshell nền khi có bất kỳ tiến trình con nào thoát với mã lỗi khác 0, dẫn đến việc ngắt toàn bộ các tác vụ còn lại trước khi hoàn tất.",
      "C. Lệnh claude -p thất bại vì khi chạy ở chế độ nền (&), stdin bị tách khỏi terminal khiến Claude Code yêu cầu xác nhận tương tác từ người dùng.",
      "D. Việc thực thi claude -p trên nhiều thư mục đồng thời gây xung đột ghi file khóa và làm hỏng tệp cấu hình workspace ~/.claude.json."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Launching 50 background claude -p invocations concurrently overwhelms API rate limits (HTTP 429). Because default headless CLI invocations lack automated retry loops for parallel bursts, jobs fail immediately unless execution is throttled (e.g., using GNU xargs -P or make -j) or wrapped with exponential backoff retries.",
      "Option B is incorrect: The shell wait command waits for all background processes to terminate regardless of their individual exit status; it does not kill surviving child processes when one fails.",
      "Option C is incorrect: claude -p operates headlessly without requiring interactive user confirmation on standard input unless permission prompts are triggered without appropriate flags, which is separate from rate-limiting errors.",
      "Option D is incorrect: Directory context passed via -C isolated per process does not corrupt ~/.claude.json through lock file contention; the observed HTTP 429 failures are strictly API rate-limit errors."
    ],
    "rationale": "Executing multiple claude -p CLI invocations in parallel with background operator & without concurrency control triggers API rate limits (HTTP 429). Adding throttling or exponential backoff retries ensures all calls succeed reliably.",
    "explanation": "Lựa chọn A là đúng: Việc khởi chạy 50 tiến trình claude -p nền cùng một lúc gây ra hiện tượng vượt ngưỡng rate limit API (HTTP 429). Do chế độ headless mặc định không tự động thử lại khi gặp lỗi nạp dồn dập, các tác vụ sẽ thất bại ngay. Giải pháp là giới hạn số luồng đồng thời (sử dụng GNU xargs -P hoặc make -j) hoặc bọc lệnh trong vòng lặp retry với exponential backoff.\nLựa chọn B là sai: Lệnh wait trong shell chờ tất cả tiến trình nền kết thúc bất kể mã thoát (exit status) của chúng là gì; nó không chủ động kill các tiến trình con khác khi một tiến trình thất bại.\nLựa chọn C là sai: claude -p chạy ở chế độ headless không yêu cầu nhập dữ liệu tương tác từ stdin nếu không gặp phải prompt phân quyền, và lỗi 429 xuất phát từ API rate limit chứ không phải do thiếu TTY.\nLựa chọn D là sai: Việc truyền thư mục làm việc riêng biệt qua -C cho từng tiến trình không làm hỏng file ~/.claude.json do tranh chấp khóa; nguyên nhân chính xác là do vượt quá hạn ngạch request API.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  },
  {
    "id": "d3-b07-3.5-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-006",
    "scenarioSignature": {
      "testedPrinciple": "behavioral impact of --no-tools in headless execution",
      "failureMode": "generic inaccurate output when prompt requires file context",
      "rootCause": "disabling all tools prevents file reading tools from retrieving target file contents",
      "requiredFix": "remove --no-tools or pipe file content explicitly via standard input"
    },
    "questionEN": "A developer runs a headless batch command claude -p \"Analyze the authentication flow in src/auth.ts and list potential security flaws\" --no-tools in a CI/CD code audit script. Claude Code returns a vague, generic response about general authentication best practices without referencing any actual code from src/auth.ts. What is the root cause of this inaccurate output?",
    "question": "[d3-b07-3.5-006] Một lập trình viên chạy lệnh batch headless claude -p \"Analyze the authentication flow in src/auth.ts and list potential security flaws\" --no-tools trong script kiểm thử CI/CD. Claude Code trả về phản hồi chung chung về các thực hành tốt nhất trong xác thực mà không hề dẫn chiếu tới mã nguồn thực tế trong src/auth.ts. Nguyên nhân gốc rễ của kết quả không chính xác này là gì?",
    "optionsEN": [
      "A. The --no-tools flag restricts Claude Code to reading files only within the current working directory, preventing access to subdirectories like src/.",
      "B. Passing --no-tools disables all tool access (including file reading via View/Grep), preventing Claude Code from inspecting src/auth.ts content so it responds using only the prompt text.",
      "C. Headless execution with claude -p automatically suppresses output when --no-tools is specified unless standard input is explicitly piped.",
      "D. The prompt lacks the --dangerously-skip-permissions flag, causing Claude Code to quietly skip tool execution when running non-interactively."
    ],
    "options": [
      "A. Cờ --no-tools giới hạn Claude Code chỉ được đọc các tệp nằm ở thư mục gốc hiện tại, ngăn cản việc truy cập vào các thư mục con như src/.",
      "B. Cờ --no-tools vô hiệu hóa toàn bộ công cụ (bao gồm cả công cụ đọc tệp View/Grep), khiến Claude Code không thể đọc nội dung file src/auth.ts và buộc phải trả lời dựa trên văn bản câu lệnh.",
      "C. Việc thực thi headless với claude -p tự động ẩn đầu ra stdout khi cờ --no-tools được bật trừ khi dữ liệu được truyền qua pipe từ stdin.",
      "D. Lệnh thiếu cờ --dangerously-skip-permissions, khiến Claude Code âm thầm bỏ qua việc thực thi công cụ khi chạy ở chế độ không tương tác."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: --no-tools completely disables tool capabilities across all paths, rather than restricting file system navigation to specific directory levels.",
      "Option B is correct: The --no-tools flag disables all tool integrations (such as file reading, searching, or shell commands). Because Claude Code cannot use file tools to read src/auth.ts, it must generate a response based strictly on the text provided in the prompt, resulting in a generic answer.",
      "Option C is incorrect: --no-tools does not suppress stdout or require stdin piping; it simply prevents agentic tool selection during inference.",
      "Option D is incorrect: While permission flags affect interactive confirmation in headless mode, the explicit reason Claude Code cannot read the file here is that --no-tools explicitly turned off file reading tools."
    ],
    "rationale": "Using --no-tools disables all built-in tools (including ReadFile/View/Grep). When a prompt asks Claude Code to analyze a file, disabling tools prevents it from reading the actual file content, forcing it to generate a generic response.",
    "explanation": "Lựa chọn A là sai: --no-tools vô hiệu hóa hoàn toàn công cụ trên mọi đường dẫn chứ không phải giới hạn phạm vi thư mục.\nLựa chọn B là đúng: Cờ --no-tools tắt toàn bộ khả năng gọi công cụ (như đọc file, tìm kiếm Grep, chạy shell). Khi yêu cầu phân tích một file cụ thể (src/auth.ts), Claude Code không thể mở file để xem mã nguồn nên chỉ đưa ra câu trả lời lý thuyết chung chung dựa vào ngữ cảnh văn bản trong prompt.\nLựa chọn C là sai: --no-tools không làm ẩn đầu ra stdout hay bắt buộc pipe stdin; nó chỉ ngăn agent sử dụng công cụ.\nLựa chọn D là sai: Mặc dù cờ cấp quyền ảnh hưởng đến các lệnh tương tác trong headless, lý do trực tiếp khiến Claude Code không đọc được file ở đây là do cờ --no-tools đã chủ động tắt các công cụ đọc tệp.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  }
]