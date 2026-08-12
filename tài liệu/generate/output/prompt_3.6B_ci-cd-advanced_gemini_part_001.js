[
  {
    "id": "d3-b07-B-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-001",
    "scenarioSignature": {
      "testedPrinciple": "exponential backoff and concurrency control for matrix API calls",
      "failureMode": "simultaneous matrix job failures from HTTP 429 rate limits",
      "rootCause": "unthrottled concurrent API requests across parallel runner nodes",
      "requiredFix": "apply CLI retry with exponential backoff or restrict matrix concurrency"
    },
    "questionEN": "A GitHub Actions workflow uses a matrix strategy with 12 parallel runner jobs executing claude -p \"Audit code quality\". During build triggers, all 12 jobs fail simultaneously with HTTP 429 Too Many Requests because the headless CLI instances send unthrottled API requests concurrently. How should the pipeline architecture be adjusted to prevent these simultaneous rate limit failures?",
    "question": "[d3-b07-B-001] Một workflow GitHub Actions sử dụng chiến lược matrix với 12 job runner song song thực thi claude -p \"Audit code quality\". Khi build được kích hoạt, cả 12 job đều thất bại đồng thời với mã lỗi HTTP 429 Too Many Requests do các instance CLI headless gửi request API đồng thời mà không được điều tiết. Kiến trúc pipeline nên được điều chỉnh như thế nào để ngăn ngừa các lỗi rate limit đồng thời này?",
    "optionsEN": [
      "A. Implement retry wrapper logic with exponential backoff and jitter around the CLI step, or cap matrix concurrency using max-parallel.",
      "B. Append --max-turns 50 to the CLI command so Claude Code internal turn retries handle the API rate limits automatically.",
      "C. Add --dangerously-skip-permissions to skip permission prompt checks that generate extra API request overhead.",
      "D. Change --output-format to stream-json so API response tokens stream in real time without counting toward rate limits."
    ],
    "options": [
      "A. Triển khai logic wrapper retry với exponential backoff và jitter xung quanh bước CLI, hoặc giới hạn độ song song matrix bằng max-parallel.",
      "B. Thêm --max-turns 50 vào lệnh CLI để cơ chế retry turn nội bộ của Claude Code tự động xử lý API rate limit.",
      "C. Thêm --dangerously-skip-permissions để bỏ qua việc kiểm tra câu hỏi cấp quyền vốn tạo thêm overhead request API.",
      "D. Thay đổi --output-format thành stream-json để các token phản hồi API stream theo thời gian thực mà không tính vào quota rate limit."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A correctly addresses rate limiting by retrying failed requests with exponential backoff jitter and throttling parallel execution using matrix concurrency controls.",
      "Option B is incorrect because --max-turns limits conversation turn count in a session rather than handling HTTP 429 network rate limit retries.",
      "Option C is incorrect because --dangerously-skip-permissions bypasses tool confirmation prompts and has no impact on API rate limits.",
      "Option D is incorrect because streaming response formats still invoke the API and consume rate limit quota identically to non-streaming requests."
    ],
    "rationale": "When parallel CI runner jobs trigger API rate limits (HTTP 429), the standard solution is to implement exponential backoff retries with random jitter or limit concurrency (e.g., using max-parallel in GitHub Actions) to prevent synchronized request bursts.",
    "explanation": "Trong môi trường CI/CD, khi nhiều job matrix chạy song song đồng thời gọi Claude Code API, hệ thống có thể chạm ngưỡng rate limit (HTTP 429). Giải pháp kiến trúc chuẩn là áp dụng logic retry với exponential backoff và jitter (để phân tán thời gian gửi lại request) hoặc sử dụng chỉ thị max-parallel trong GitHub Actions để giới hạn số lượng runner hoạt động đồng thời.\n- Đáp án A đúng vì nó giải quyết trực tiếp nguyên nhân quá tải API bằng cách giãn cách và thử lại request.\n- Đáp án B sai vì --max-turns quy định số lượt hội thoại tối đa trong một phiên làm việc, không phải là cơ chế retry cho HTTP 429.\n- Đáp án C sai vì --dangerously-skip-permissions chỉ dùng để bỏ qua các câu hỏi xác nhận công cụ trong môi trường non-interactive, không liên quan đến rate limit API.\n- Đáp án D sai vì --output-format stream-json thay đổi định dạng đầu ra thành stream newline-delimited JSON chứ không làm giảm bớt hay bỏ qua quota rate limit.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-002",
    "scenarioSignature": {
      "testedPrinciple": "async batch processing cost optimization via Message Batches API",
      "failureMode": "excessive API cost for non-real-time bulk code reviews",
      "rootCause": "invoking synchronous real-time Messages API for delayed bulk tasks",
      "requiredFix": "leverage Message Batches API for half token cost reduction"
    },
    "questionEN": "An engineering team runs a scheduled nightly CI pipeline that audits 200 pull requests using claude -p \"Review diff\". The team notices high monthly API costs, while the review feedback is only read by developers the next morning. Which architectural change optimizes API expense for this scheduled non-real-time workflow?",
    "question": "[d3-b07-B-002] Một đội ngũ kỹ thuật chạy pipeline CI định kỳ hàng đêm để kiểm tra (audit) 200 pull request bằng lệnh claude -p \"Review diff\". Đội ngũ nhận thấy chi phí API hàng tháng quá cao, trong khi phản hồi review chỉ được các lập trình viên đọc vào sáng hôm sau. Thay đổi kiến trúc nào tối ưu hóa chi phí API cho workflow định kỳ không yêu cầu thời gian thực này?",
    "optionsEN": [
      "A. Use --output-format json in the Messages API pipeline to reduce payload bandwidth costs by 50%.",
      "B. Shift the nightly bulk review pipeline from the synchronous Messages API to the Message Batches API, reducing API token costs by 50% in exchange for asynchronous execution.",
      "C. Pass --max-turns 1 to force the Messages API to process the entire PR diff in a single turn without background processing.",
      "D. Run --dangerously-skip-permissions across all 200 PR review jobs to bypass batch queue processing overhead."
    ],
    "options": [
      "A. Sử dụng --output-format json trong pipeline Messages API để giảm 50% chi phí băng thông payload.",
      "B. Chuyển pipeline review hàng đêm từ Messages API đồng bộ sang Message Batches API, giảm 50% chi phí API token để đổi lấy việc xử lý bất đồng bộ.",
      "C. Truyền --max-turns 1 để buộc Messages API xử lý toàn bộ diff của PR trong một turn duy nhất mà không cần xử lý nền.",
      "D. Chạy --dangerously-skip-permissions trên tất cả 200 job review PR để bỏ qua overhead xử lý hàng đợi batch."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because --output-format json only changes local output formatting and does not reduce Anthropic API token pricing.",
      "Option B correctly identifies that Message Batches API offers a 50% cost discount for asynchronous bulk processing where real-time response latency is not required.",
      "Option C is incorrect because --max-turns 1 restricts interaction turns but does not provide batch pricing discounts or handle asynchronous batch queueing.",
      "Option D is incorrect because --dangerously-skip-permissions disables tool confirmation prompts and has no bearing on batch API pricing or asynchronous processing."
    ],
    "rationale": "The Message Batches API provides a 50% cost discount compared to standard Messages API calls when requests can be processed asynchronously within 24 hours, making it ideal for non-real-time nightly bulk PR reviews.",
    "explanation": "Đối với các tác vụ xử lý hàng loạt theo lịch (như review 200 PR hàng đêm) không yêu cầu kết quả tức thì trong thời gian thực, việc chuyển sang sử dụng Message Batches API giúp giảm 50% chi phí token API so với Messages API đồng bộ thông thường.\n- Đáp án A sai vì --output-format json chỉ thay đổi cấu trúc dữ liệu trả về local chứ không ảnh hưởng đến đơn giá token API.\n- Đáp án B đúng vì Message Batches API được thiết kế chính xác cho bài toán đánh đổi độ trễ lấy việc tối ưu 50% chi phí cho công việc theo lô.\n- Đáp án C sai vì --max-turns 1 chỉ giới hạn số lượt trao đổi của agent, không tạo ra mức giảm giá theo lô bất đồng bộ.\n- Đáp án D sai vì --dangerously-skip-permissions dùng để tự động bỏ qua quyền tương tác trong môi trường CI headless, không hỗ trợ xử lý batch hay hạ chi phí API.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]