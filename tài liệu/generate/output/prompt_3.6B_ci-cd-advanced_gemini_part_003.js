[
  {
    "id": "d3-b07-B-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-005",
    "scenarioSignature": {
      "testedPrinciple": "stream-json output format parsing in continuous integration pipelines",
      "failureMode": "command line json parser fails with syntax error on standard output stream",
      "rootCause": "piping newline delimited json event stream into single object parser",
      "requiredFix": "use stream compatible JSON processing or switch to single object output format"
    },
    "questionEN": "A DevOps engineer configures a GitHub Actions pipeline step to execute claude -p \"Audit pull request changes\" --output-format stream-json | jq '.' for real-time security auditing. The pipeline job fails immediately with parse error: Expected value before ',' at line 2. Which modification correctly resolves the parsing failure?",
    "question": "[d3-b07-B-005] Một kỹ sư DevOps cấu hình bước trong GitHub Actions pipeline để chạy claude -p \"Audit pull request changes\" --output-format stream-json | jq '.' nhằm kiểm tra bảo mật theo thời gian thực. Job pipeline thất bại ngay lập tức với lỗi parse error: Expected value before ',' at line 2. Thay đổi nào sau đây giải quyết đúng lỗi phân tích dữ liệu này?",
    "optionsEN": [
      "A. Change CLI flag to --output-format json for single-object parsing, or use jq -c / jq -s '.' to handle newline-delimited JSON stream events.",
      "B. Append --dangerously-skip-permissions to the command so interactive prompts do not inject raw text into the stdout stream.",
      "C. Increase --max-turns to ensure Claude Code completes all stream events before writing to stdout.",
      "D. Pipe output through cat before jq '.' to buffer the entire stream into a single shell variable."
    ],
    "options": [
      "A. Thay đổi cờ CLI thành --output-format json để phân tích đối tượng đơn, hoặc sử dụng jq -c / jq -s '.' để xử lý các sự kiện luồng JSON phân tách bằng dòng mới.",
      "B. Thêm --dangerously-skip-permissions vào lệnh để các thông báo tương tác không chèn văn bản thô vào luồng stdout.",
      "C. Tăng --max-turns để đảm bảo Claude Code hoàn thành tất cả sự kiện luồng trước khi ghi ra stdout.",
      "D. Dẫn hướng output qua cat trước jq '.' để đệm toàn bộ luồng vào một biến shell duy nhất."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: --output-format stream-json emits newline-delimited JSON (NDJSON) stream events. Standard jq '.' expects a single JSON object and fails on line 2; using --output-format json produces a single array/object, while jq -s slurps NDJSON streams into an array.",
      "Option B is incorrect: --dangerously-skip-permissions avoids permission prompts in headless environments, but does not alter the fundamental NDJSON event stream structure of stream-json.",
      "Option C is incorrect: --max-turns controls maximum agent interaction steps, not how stream-json formats stdout events during execution.",
      "Option D is incorrect: Piping NDJSON through cat buffers text but does not convert multiple JSON lines into a single JSON object required by jq '.' without the -s flag."
    ],
    "rationale": "The --output-format stream-json option outputs streaming newline-delimited JSON (NDJSON) objects per execution event. Direct piping into standard jq '.' fails because jq attempts to parse multiple root JSON entities as a single object. Switching to --output-format json returns a standard consolidated JSON object, or using jq -s (slurp) correctly ingests NDJSON streams.",
    "explanation": "Lựa chọn A đúng vì --output-format stream-json xuất dữ liệu dưới dạng luồng JSON phân tách theo dòng mới (NDJSON). Công cụ jq '.' tiêu chuẩn kỳ vọng một JSON object duy nhất nên báo lỗi cấu trúc ở dòng 2. Chuyển sang --output-format json xuất ra một JSON object hoàn chỉnh, hoặc dùng jq -s để đọc luồng NDJSON thành mảng.\nLựa chọn B sai vì cờ --dangerously-skip-permissions bỏ qua hỏi quyền tương tác nhưng không thay đổi định dạng dữ liệu đầu ra của stream-json.\nLựa chọn C sai vì --max-turns giới hạn số lượt tương tác của agent chứ không hợp nhất các sự kiện stream-json thành một JSON object đơn.\nLựa chọn D sai vì cat chỉ đệm văn bản thô mà không giải quyết việc jq '.' thất bại khi đọc nhiều root JSON object liên tiếp.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-006",
    "scenarioSignature": {
      "testedPrinciple": "conditional execution path filtering for automated pull request review workflows",
      "failureMode": "excessive api call volume and high cost from non-code commit triggers",
      "rootCause": "triggering automated code review pipeline on documentation and static asset modifications",
      "requiredFix": "implement workflow path filters to bypass automated reviews for non-code files"
    },
    "questionEN": "A team configures a GitHub Actions workflow to run claude -p \"Review pull request diff\" --dangerously-skip-permissions on every commit. Metrics show over 200 unnecessary API calls per day generated by commits containing only documentation (.md) and static asset changes. What is the most effective fix to reduce unnecessary API cost?",
    "question": "[d3-b07-B-006] Một đội ngũ cấu hình GitHub Actions workflow để chạy claude -p \"Review pull request diff\" --dangerously-skip-permissions trên mọi commit. Số liệu thống kê cho thấy hơn 200 cuộc gọi API không cần thiết mỗi ngày do các commit chỉ chứa thay đổi tài liệu (.md) và tệp tĩnh. Giải pháp hiệu quả nhất để giảm chi phí API không cần thiết này là gì?",
    "optionsEN": [
      "A. Add --max-turns 1 to the CLI step to restrict model output length on documentation commits.",
      "B. Configure workflow path filters (paths-ignore or diff path checks) to skip the Claude review job when commits affect only non-code files.",
      "C. Use Anthropic Message Batches API credentials inside the CI pipeline step to delay review execution.",
      "D. Add --output-format json to the command so Claude automatically filters non-executable source code files."
    ],
    "options": [
      "A. Thêm --max-turns 1 vào bước CLI để hạn chế độ dài đầu ra của mô hình đối với các commit tài liệu.",
      "B. Cấu hình bộ lọc đường dẫn workflow (paths-ignore hoặc kiểm tra đường dẫn diff) để bỏ qua job đánh giá của Claude khi commit chỉ ảnh hưởng đến tệp không phải mã nguồn.",
      "C. Sử dụng thông tin xác thực Anthropic Message Batches API bên trong bước pipeline CI để trì hoãn việc thực thi đánh giá.",
      "D. Thêm --output-format json vào lệnh để Claude tự động lọc các tệp mã nguồn không thể thực thi."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Setting --max-turns 1 still invokes the Anthropic API and incurs cost for every documentation commit.",
      "Option B is correct: Implementing CI path filters (e.g., GitHub Actions paths-ignore: ['**.md', 'docs/**'] or shell git diff path checks) prevents the claude -p step from firing entirely on non-code changes.",
      "Option C is incorrect: Message Batches API reduces batch cost but does not eliminate unnecessary executions triggered by trivial documentation commits.",
      "Option D is incorrect: --output-format json formats output structure but does not alter CLI file inspection or prevent API invocations."
    ],
    "rationale": "Automating Claude Code reviews without conditional triggers causes unnecessary API invocations on non-code changes (such as Markdown updates or images). Adding path filters at the CI/CD platform level (paths-ignore) or script level avoids running the claude -p command altogether when no relevant source files are modified, eliminating API consumption for those builds.",
    "explanation": "Lựa chọn B đúng vì việc cấu hình bộ lọc đường dẫn (như paths-ignore trong GitHub Actions hoặc kiểm tra git diff trong script) sẽ ngăn chặn hoàn toàn bước chạy claude -p khi thay đổi chỉ thuộc về tài liệu hay tệp tĩnh, tiêu diệt tận gốc 200 lượt gọi API lãng phí mỗi ngày.\nLựa chọn A sai vì --max-turns 1 vẫn gửi yêu cầu đến Anthropic API và phát sinh chi phí.\nLựa chọn C sai vì Message Batches API giúp giảm giá khi xử lý bất đồng bộ nhưng không ngăn được các pipeline kích hoạt thừa thãi.\nLựa chọn D sai vì --output-format json chỉ định dạng JSON đầu ra chứ không tự động bỏ qua các tệp không phải mã nguồn.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]