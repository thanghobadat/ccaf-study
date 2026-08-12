[
  {
    "id": "d3-b07-B-015",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-015",
    "scenarioSignature": {
      "testedPrinciple": "pre-merge code review gate positioning in CI pipeline",
      "failureMode": "security vulnerabilities introduced into production main branch post-merge",
      "rootCause": "automated review step executes after code merge rather than during pull request validation",
      "requiredFix": "configure review workflow to run on pull request events as a blocking status check before merge"
    },
    "questionEN": "A DevOps team configures a GitHub Actions workflow .github/workflows/deploy.yml with a job post-merge-audit triggered on push events to main. The job executes claude -p \"Audit security vulnerabilities\" after pull request code has already been merged into production. During a security audit, 14 high-severity vulnerability alerts were reported post-deployment. Why does executing the audit step after merge fail to act as a security control?",
    "question": "[d3-b07-B-015] Một đội ngũ DevOps cấu hình workflow GitHub Actions .github/workflows/deploy.yml với job post-merge-audit kích hoạt trên sự kiện push vào nhánh main. Job này thực thi lệnh claude -p \"Audit security vulnerabilities\" sau khi mã từ Pull Request đã được hợp nhất. Trong một đợt kiểm tra hệ thống, 14 lỗ hổng bảo mật mức độ cao đã lọt vào nhánh chính và được phát hiện sau khi triển khai. Tại sao việc chạy bước đánh giá sau khi merge lại gây ra thất bại trong việc ngăn ngừa lỗ hổng bảo mật?",
    "optionsEN": [
      "A. Running post-merge prevents claude -p from accessing git diff context, generating empty audit reports.",
      "B. Executing post-merge forces Claude Code to use synchronous API retries, causing GitHub Actions runner timeout.",
      "C. The post-merge review executes after code is merged into main, allowing security vulnerabilities into production rather than acting as a preventative gate.",
      "D. Claude Code automatically suppresses security violation reports when executed on push triggers instead of pull_request triggers."
    ],
    "options": [
      "A. Chạy sau khi merge khiến lệnh claude -p không thể truy cập ngữ cảnh git diff của PR nên tạo ra kết quả kiểm tra rỗng.",
      "B. Việc thực thi post-merge buộc Claude Code chuyển sang cơ chế retry đồng bộ, dẫn đến quá thời gian chờ (timeout) của GitHub Actions runner.",
      "C. Bước đánh giá sau khi merge chạy khi code đã được hợp nhất vào nhánh main, khiến các lỗ hổng bảo mật đi vào môi trường sản xuất thay vì bị chặn lại bởi cổng bảo vệ trước khi merge.",
      "D. Claude Code tự động ẩn các báo cáo vi phạm bảo mật khi được thực thi trên sự kiện kích hoạt push thay vì pull_request."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because claude -p can inspect commits on main; the failure is due to post-merge execution timing, not missing diff context.",
      "Option B is incorrect because post-merge execution timing does not change API retry strategies or trigger runner timeouts.",
      "Option C is correct because executing the audit step on post-merge push events allows vulnerable code into main and production, failing to act as a preventative merge gate.",
      "Option D is incorrect because Claude Code output is determined by the prompt and configuration flags, not suppressed by the GitHub Actions trigger event type."
    ],
    "rationale": "Running an automated security review post-merge detects flaws reactively after they have already landed in the main branch and production deployment pipeline. To function as a preventative control gate, the audit step must execute on pre-merge pull_request events and block merging when vulnerabilities are identified.",
    "explanation": "Giải thích chi tiết:\n- Option A sai vì claude -p vẫn có thể làm việc với commit trên nhánh main, vấn đề không phải do thiếu ngữ cảnh diff mà do thời điểm chạy.\n- Option B sai vì thời điểm thực thi công việc trong CI/CD không làm thay đổi cơ chế retry của API hay gây timeout cho runner.\n- Option C đúng vì việc đặt bước kiểm tra Claude Code chạy sau khi hợp nhất (post-merge) làm mất đi vai trò của cổng kiểm soát chất lượng (merge gate), khiến các mã nguồn chứa lỗ hổng nguy hại bị đẩy lên main và sản xuất trước khi bị phát hiện.\n- Option D sai vì lệnh claude -p hoạt động dựa trên prompt và tham số cấu hình, không bị ẩn hay bỏ qua kết quả dựa vào loại trigger của GitHub Actions.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-016",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-016",
    "scenarioSignature": {
      "testedPrinciple": "streaming JSON output processing in automated CI scripts",
      "failureMode": "high latency and memory buffering when consuming CLI stream output",
      "rootCause": "consumer script buffers entire NDJSON stream into memory before parsing",
      "requiredFix": "process stream-json events line-by-line incrementally using stream parser"
    },
    "questionEN": "A CI automation script executes claude -p \"Analyze repository architecture\" --output-format stream-json to process large codebase audits in a Jenkins pipeline. The pipeline log parser node uses cat output.txt | jq -s '.' to read the entire output stream into a single JSON array before extracting status events. Developers notice that pipeline step latency and memory footprint are identical to using --output-format json. Why does this consumer pattern defeat the performance purpose of stream-json?",
    "question": "[d3-b07-B-016] Một script tự động hóa CI chạy lệnh claude -p \"Analyze repository architecture\" --output-format stream-json để kiểm tra codebase lớn trong pipeline Jenkins. Node xử lý log trong pipeline sử dụng lệnh cat output.txt | jq -s '.' để đọc toàn bộ luồng đầu ra vào một mảng JSON duy nhất trước khi trích xuất các sự kiện trạng thái. Các nhà phát triển nhận thấy độ trễ bước pipeline và mức sử dụng bộ nhớ hoàn toàn giống hệt như khi dùng --output-format json. Tại sao mô hình tiêu thụ này lại làm mất đi mục đích hiệu năng của stream-json?",
    "optionsEN": [
      "A. stream-json requires --dangerously-skip-permissions to emit incremental events, failing back to standard JSON when omitted.",
      "B. Jenkins log parser nodes fail to allocate sub-processes for NDJSON lines, causing automatic HTTP response buffer overflow.",
      "C. --output-format stream-json generates encrypted payload chunks that must be decrypted in bulk before line parsing.",
      "D. Buffering the entire NDJSON stream into memory via jq -s before parsing forces the consumer to wait for process completion, neutralizing the real-time processing and low-memory benefits of streaming."
    ],
    "options": [
      "A. stream-json yêu cầu phải thiết lập --dangerously-skip-permissions để phát ra sự kiện theo thời gian thực, nếu thiếu flag sẽ tự động fallback về dạng JSON tiêu chuẩn.",
      "B. Jenkins log parser không thể cấp phát tiến trình con cho các dòng NDJSON, dẫn đến tràn bộ nhớ đệm HTTP response tự động.",
      "C. Định dạng --output-format stream-json tạo ra các khối dữ liệu mã hóa bắt buộc phải giải mã hàng loạt trước khi có thể phân tích từng dòng.",
      "D. Việc gom toàn bộ luồng NDJSON vào bộ nhớ bằng jq -s trước khi xử lý buộc trình tiêu thụ phải chờ tiến trình kết thúc, làm mất hoàn toàn lợi ích xử lý thời gian thực và tiết kiệm bộ nhớ của việc streaming."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because stream-json output format functions independently of permission flags.",
      "Option B is incorrect because stream buffering is caused by jq -s slurp mode in the consumer script, not Jenkins process allocation or HTTP response buffers.",
      "Option C is incorrect because --output-format stream-json outputs plain text newline-delimited JSON events, not encrypted payloads.",
      "Option D is correct because using jq -s slurps the entire NDJSON stream into memory and waits for completion, eliminating both time-to-first-event latency improvements and low memory usage benefits."
    ],
    "rationale": "The purpose of --output-format stream-json is to stream newline-delimited JSON (NDJSON) events incrementally so consumers can process output immediately as it arrives with low memory footprint. Using jq -s (slurp) buffers all stream lines into memory and blocks until the command completes, effectively converting the streaming output back into a monolithic batch processing operation equivalent to --output-format json.",
    "explanation": "Giải thích chi tiết:\n- Option A sai vì định dạng đầu ra stream-json hoàn toàn độc lập với các cờ cấp quyền CLI.\n- Option B sai vì nguyên nhân gây ra đệm bộ nhớ là do việc dùng cờ -s (slurp) của jq trong script, không phải do cách Jenkins phân bổ tiến trình hay lỗi đệm HTTP.\n- Option C sai vì stream-json xuất ra các sự kiện JSON phân tách bằng dòng mới (NDJSON) ở dạng văn bản thuần, không phải dữ liệu mã hóa.\n- Option D đúng vì bản chất của streaming (stream-json) là cho phép xử lý từng sự kiện ngay khi nó xuất hiện để giảm thời gian phản hồi ban đầu (time-to-first-event) và tiết kiệm bộ nhớ. Khi script sử dụng jq -s (slurp) để đọc toàn bộ stream vào một mảng duy nhất trước khi xử lý, script phải chờ lệnh kết thúc và nạp toàn bộ dữ liệu vào RAM, biến luồng streaming thành xử lý theo lô (batch parsing) giống hệt cờ --output-format json.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]