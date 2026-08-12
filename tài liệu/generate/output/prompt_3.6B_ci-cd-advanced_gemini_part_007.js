[
  {
    "id": "d3-b07-B-013",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-013",
    "scenarioSignature": {
      "testedPrinciple": "differentiating non-retryable authentication errors from transient errors in CI retry logic",
      "failureMode": "delayed pipeline failure wasting execution time",
      "rootCause": "blanket retry logic re-executing 401 unauthorized responses",
      "requiredFix": "fail fast on authentication failure while retrying transient status codes"
    },
    "questionEN": "A DevOps team wraps headless Claude Code commands (claude -p \"...\") in a custom Bash retry loop that attempts up to 3 retries with exponential backoff whenever the command exits with a non-zero status. When ANTHROPIC_API_KEY expires, the CLI receives HTTP status code 401 (Unauthorized) and exits immediately with status 1. However, the wrapper retries the command 3 times, delaying pipeline escalation by 30 seconds. Which modification to the retry logic resolves this inefficiency?",
    "question": "[d3-b07-B-013] Một đội ngũ DevOps bọc các lệnh Claude Code ở chế độ headless (claude -p \"...\") trong một vòng lặp Bash retry tự động thử lại tối đa 3 lần với exponential backoff mỗi khi lệnh trả về exit code khác 0. Khi ANTHROPIC_API_KEY hết hạn, CLI nhận được mã trạng thái HTTP 401 (Unauthorized) và thoát ngay với status code 1. Tuy nhiên, script wrapper vẫn cố gắng thử lại 3 lần, làm chậm thời gian báo lỗi pipeline mất 30 giây. Điều chỉnh nào với logic retry giải quyết triệt để sự lãng phí này?",
    "optionsEN": [
      "A. Update the retry wrapper to inspect the error response or HTTP status code, failing immediately (fail-fast) on 401 Unauthorized while applying retry logic only to transient 429 rate limit or 5xx server errors.",
      "B. Increase the retry delay from 30 seconds to 120 seconds between attempts to allow secret synchronization across CI nodes.",
      "C. Pass --dangerously-skip-permissions to the headless command so HTTP authorization failures are ignored by the CLI runtime.",
      "D. Set --max-turns 1 in the command arguments to terminate the session before the API authentication check fails."
    ],
    "options": [
      "A. Cập nhật script retry để kiểm tra mã lỗi HTTP hoặc response header, thất bại ngay lập tức (fail-fast) nếu gặp lỗi 401 Unauthorized và chỉ áp dụng retry cho các lỗi tạm thời như 429 (rate limit) hoặc 5xx (server error).",
      "B. Tăng khoảng thời gian chờ retry từ 30 giây lên 120 giây giữa các lần thử để chờ đồng bộ hóa secret giữa các runner CI.",
      "C. Truyền cờ --dangerously-skip-permissions vào lệnh headless để bộ thực thi CLI bỏ qua các lỗi xác thực HTTP authorization.",
      "D. Đặt --max-turns 1 trong tham số lệnh để kết thúc phiên làm việc trước khi bước kiểm tra xác thực API thất bại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: HTTP 401 Unauthorized indicates invalid or expired credentials, which cannot succeed on retry without updating the key. Evaluating error status codes to fail fast on 401 eliminates unnecessary 30-second delays while retaining retries for transient 429/5xx errors.",
      "Option B is incorrect: Increasing the backoff interval prolongs total pipeline duration without fixing the root cause of using invalid credentials.",
      "Option C is incorrect: --dangerously-skip-permissions bypasses local tool execution prompts, not API authentication headers or server-side HTTP 401 credentials validation.",
      "Option D is incorrect: --max-turns restricts conversational interactions and has no bearing on API key credential authentication."
    ],
    "rationale": "Authentication errors (HTTP 401) are deterministic failures that cannot be resolved by retrying the exact same request. A well-designed CI retry mechanism must differentiate non-retryable authentication errors from transient errors (like HTTP 429 or 5xx) and fail fast on 401 to prevent unnecessary pipeline delay.",
    "explanation": "Trong quy trình CI/CD, logic retry được thiết kế để xử lý các lỗi tạm thời (transient errors) như trễ mạng, server quá tải (HTTP 5xx) hoặc chạm giới hạn lưu lượng (HTTP 429). Ngược lại, lỗi xác thực HTTP 401 Unauthorized xảy ra khi ANTHROPIC_API_KEY bị thiếu, sai hoặc hết hạn. Đây là lỗi cố định (non-retryable failure), dù thử lại bao nhiêu lần cũng không thể thành công nếu không thay đổi API key.\n\n- Phương án A chính xác vì việc phân loại mã lỗi giúp script thất bại ngay (fail-fast) khi gặp 401, tiết kiệm 30 giây lãng phí, trong khi vẫn giữ cơ chế retry cho lỗi 429/5xx.\n- Phương án B sai vì tăng thời gian chờ chỉ làm tăng tổng thời gian lãng phí của pipeline.\n- Phương án C sai vì --dangerously-skip-permissions chỉ dùng để bỏ qua prompt cấp quyền thực thi công cụ (tools/commands) ở chế độ headless, không có tác dụng bỏ qua xác thực API key.\n- Phương án D sai vì --max-turns giới hạn số lượt hội thoại của Claude Code, không can thiệp vào quá trình xác thực HTTP request.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-014",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-014",
    "scenarioSignature": {
      "testedPrinciple": "rate limit concurrency management for shared API credentials in CI matrix jobs",
      "failureMode": "intermittent pipeline job failure due to HTTP 429 rate limits",
      "rootCause": "uncontrolled parallel execution exceeding per-key API request limits",
      "requiredFix": "serialize or limit max parallel execution of matrix jobs sharing an API key"
    },
    "questionEN": "A GitHub Actions workflow uses a matrix strategy to execute 10 parallel jobs, each running claude -p \"...\" against a target repository module. All jobs share a single ANTHROPIC_API_KEY stored in repository secrets. Because the concurrent requests exceed the per-key Tier rate limit, multiple matrix jobs fail intermittently with HTTP status code 429 (Too Many Requests). What is the most effective architecture to resolve these rate limit failures?",
    "question": "[d3-b07-B-014] Một workflow GitHub Actions sử dụng chiến lược ma trận (matrix strategy) để thực thi 10 job song song, mỗi job chạy claude -p \"...\" trên một module mã nguồn khác nhau. Tất cả các job đều dùng chung một ANTHROPIC_API_KEY lưu trong repository secrets. Do tổng số yêu cầu đồng thời vượt quá giới hạn tần suất (rate limit) của API key, nhiều job bị thất bại ngắt quãng với mã trạng thái HTTP 429 (Too Many Requests). Kiến trúc nào hiệu quả nhất để giải quyết triệt để vấn đề này?",
    "optionsEN": [
      "A. Increase --max-turns across all matrix jobs so that Claude Code groups all multi-file operations into a single API invocation per runner.",
      "B. Restrict workflow matrix concurrency using max-parallel or concurrency groups combined with retry backoff to serialize request volume under the API key rate limit.",
      "C. Add --dangerously-skip-permissions to the CLI flags in each job to bypass rate limit throttling headers at the CLI layer.",
      "D. Duplicate ANTHROPIC_API_KEY into 10 separate secret names (KEY_1, KEY_2, etc.) pointing to the same token string to distribute environmental load."
    ],
    "options": [
      "A. Tăng giá trị --max-turns ở tất cả các job ma trận để Claude Code gộp toàn bộ thao tác đa file thành một API request duy nhất trên mỗi runner.",
      "B. Giới hạn độ song song của matrix bằng max-parallel hoặc concurrency groups kết hợp với retry backoff để tuần tự hóa lưu lượng yêu cầu nằm dưới ngưỡng rate limit của API key.",
      "C. Bổ sung cờ --dangerously-skip-permissions vào lệnh CLI ở từng job để bỏ qua kiểm tra tiêu đề rate limit tại tầng CLI.",
      "D. Nhân bản ANTHROPIC_API_KEY thành 10 tên secret riêng biệt (KEY_1, KEY_2, ...) cùng trỏ đến chuỗi token ban đầu để phân tán tải môi trường."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Increasing --max-turns allows more turn iterations per job, which increases total API requests rather than reducing concurrent request spikes.",
      "Option B is correct: Controlling concurrency via max-parallel limits simultaneous calls using the same API key. Combining serialization with exponential retry backoff ensures requests remain within per-key HTTP 429 rate limit thresholds.",
      "Option C is incorrect: --dangerously-skip-permissions controls local command execution approval and has no impact on API server-side HTTP 429 throttling.",
      "Option D is incorrect: Assigning the same API key string under different environment variable names still routes all requests to the same API key account bucket, failing to bypass the underlying per-key rate limit."
    ],
    "rationale": "API rate limits (HTTP 429) apply per API key. Running multiple parallel matrix jobs using the same key triggers concurrent rate limits. Enforcing serialization or limiting concurrency via CI matrix controls (max-parallel) alongside backoff retry ensures total throughput stays within per-key limits.",
    "explanation": "Giới hạn tần suất API (rate limit) của Anthropic được áp dụng trên từng API key. Khi một CI matrix job mở ra 10 runner đồng thời cùng gọi API bằng chung một ANTHROPIC_API_KEY, tổng lưu lượng yêu cầu vượt quá hạn ngạch (Tier rate limit) dẫn đến lỗi HTTP 429 (Too Many Requests).\n\n- Phương án B chính xác vì thiết lập max-parallel (ví dụ max-parallel: 2) hoặc dùng concurrency group giúp kiểm soát số lượng job chạy song song tại một thời điểm, tuần tự hóa request để giữ lưu lượng nằm trong ngưỡng cho phép của API key.\n- Phương án A sai vì tăng --max-turns khiến mỗi job thực hiện nhiều lượt trao đổi API hơn, làm trầm trọng thêm vấn đề quá tải request.\n- Phương án C sai vì --dangerously-skip-permissions chỉ áp dụng cho quyền chạy công cụ local, không can thiệp vào rate limit của Anthropic API gateway.\n- Phương án D sai vì việc tạo 10 tên biến môi trường khác nhau nhưng chứa cùng một chuỗi API key vẫn khiến hệ thống Anthropic tính tổng lưu lượng vào đúng một tài khoản key đó.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]