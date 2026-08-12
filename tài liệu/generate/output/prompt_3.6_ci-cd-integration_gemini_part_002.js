[
  {
    "id": "d3-b07-new-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-003",
    "questionEN": "A CI/CD automation step runs 'claude -p \"Review code diff\" --output-format json' and stores the standard output in a workflow variable 'REVIEW_RESULT'. The pipeline then posts '${REVIEW_RESULT}' directly as a pull request comment. However, instead of a formatted code review summary, the comment displays a raw JSON object string containing metadata keys like 'type', 'result', and 'usage'. What is the root cause and correct resolution for this issue?",
    "question": "[d3-b07-new-003] Một bước tự động hóa CI/CD chạy 'claude -p \"Review code diff\" --output-format json' và lưu đầu ra tiêu chuẩn vào biến workflow 'REVIEW_RESULT'. Pipeline sau đó đăng trực tiếp '${REVIEW_RESULT}' làm nhận xét pull request. Tuy nhiên, thay vì bản tóm tắt đánh giá mã được định dạng, nhận xét lại hiển thị chuỗi đối tượng JSON thô chứa các khóa metadata như 'type', 'result', và 'usage'. Nguyên nhân gốc rễ và giải pháp khắc phục đúng cho vấn đề này là gì?",
    "optionsEN": [
      "A. The '--output-format json' flag requires '--dangerously-skip-permissions' to render markdown text output when executed inside CI pipelines.",
      "B. The '--output-format json' option is incompatible with non-interactive mode '-p' and falls back to emitting internal debugging telemetry payload strings.",
      "C. The pipeline script posts the entire structured JSON envelope directly without using a JSON parser like 'jq -r .result' to extract the completion text.",
      "D. Claude Code encrypts the JSON output payload in headless mode, requiring a pipeline invocation of 'claude decrypt' before posting to GitHub API."
    ],
    "options": [
      "A. Cờ '--output-format json' bắt buộc phải có '--dangerously-skip-permissions' để tạo ra đầu ra văn bản markdown khi chạy trong pipeline CI.",
      "B. Tùy chọn '--output-format json' không tương thích với chế độ phi tương tác '-p' và tự động chuyển về dạng xuất chuỗi telemetry kiểm lỗi nội bộ.",
      "C. Script pipeline đăng toàn bộ bao bọc JSON cấu trúc trực tiếp mà không dùng trình phân tích JSON như 'jq -r .result' để trích xuất văn bản hoàn thành.",
      "D. Claude Code mã hóa payload đầu ra JSON trong chế độ headless, yêu cầu gọi 'claude decrypt' trong pipeline trước khi đăng tới GitHub API."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because '--dangerously-skip-permissions' bypasses CLI permission confirmation prompts in headless environments, but does not alter JSON response structure parsing.",
      "Option B is incorrect because '--output-format json' is explicitly designed for headless '-p' execution to enable programmatic extraction of model results.",
      "Option C is correct because '--output-format json' wraps the output in a JSON object envelope containing metadata and the '.result' field; posting raw stdout directly displays the entire JSON envelope as text.",
      "Option D is incorrect because Claude Code output is standard unencrypted JSON text, not encrypted ciphertext requiring a decryption command."
    ],
    "rationale": "When '--output-format json' is specified, Claude Code emits a structured JSON envelope containing metadata along with the completion string in the '.result' field. CI pipeline steps must parse the output using tools like 'jq -r .result' to extract the text content before sending it downstream to PR comment APIs.",
    "explanation": "Khi sử dụng cờ '--output-format json', Claude Code trả về một bao bọc (envelope) JSON có cấu trúc chứa thông tin metadata (như 'type', 'session_id', 'usage') cùng với kết quả văn bản nằm trong trường '.result'. Nếu script CI/CD chuyển thẳng toàn bộ stdout vào API đăng comment, toàn bộ chuỗi JSON thô sẽ hiển thị công khai. Để khắc phục, script cần sử dụng trình phân tích JSON như 'jq -r .result' để trích xuất nội dung văn bản thực sự trước khi đăng.\\n\\n- Option A sai vì '--dangerously-skip-permissions' chỉ bỏ qua các hộp thoại xác nhận quyền trong CI chứ không làm thay đổi việc phân tích cấu trúc JSON.\\n- Option B sai vì '--output-format json' được thiết kế chính xác để dùng chung với '-p' cho việc xử lý lập trình trong CI/CD.\\n- Option C đúng vì pipeline đăng toàn bộ bao bọc JSON thô thay vì trích xuất trường '.result' bằng 'jq'.\\n- Option D sai vì đầu ra của Claude Code là văn bản JSON tiêu chuẩn không bị mã hóa.",
    "scenarioSignature": {
      "testedPrinciple": "structured output parsing requirement in automation pipelines",
      "failureMode": "raw metadata envelope rendered in pull request comments",
      "rootCause": "direct string posting of output payload without field extraction",
      "requiredFix": "extract text payload from response envelope using json parser"
    },
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-004",
    "questionEN": "A DevOps engineer writes a CI/CD workflow step executing 'claude -p \"Generate release notes\" --output-format stream-json | jq -r .result'. During pipeline execution, the step crashes with the error 'jq: error (at :1): Cannot index string with string \"result\"'. What is the technical reason for this failure?",
    "question": "[d3-b07-new-004] Một kỹ sư DevOps viết một bước workflow CI/CD thực thi 'claude -p \"Generate release notes\" --output-format stream-json | jq -r .result'. Trong quá trình thực thi pipeline, bước này bị lỗi với thông báo 'jq: error (at :1): Cannot index string with string \"result\"'. Lý do kỹ thuật cho sự thất bại này là gì?",
    "optionsEN": [
      "A. Stream outputs are binary gzipped streams that must be decompressed with 'zcat' before passing stdout to 'jq'.",
      "B. Running Claude Code in CI without '--dangerously-skip-permissions' causes 'stream-json' to format output as raw plain text instead of JSON.",
      "C. The 'jq' tool requires the '--stream' flag to process any CLI JSON output emitted during non-interactive execution.",
      "D. '--output-format stream-json' emits a stream of multiple newline-delimited JSON event objects rather than a single top-level JSON envelope object containing '.result'."
    ],
    "options": [
      "A. Đầu ra dạng stream là luồng nhị phân nén gzipped cần phải giải nén bằng 'zcat' trước khi truyền stdout sang 'jq'.",
      "B. Chạy Claude Code trong CI mà không có '--dangerously-skip-permissions' khiến 'stream-json' định dạng đầu ra thành văn bản thô thay vì JSON.",
      "C. Công cụ 'jq' bắt buộc phải có cờ '--stream' để xử lý bất kỳ đầu ra JSON CLI nào được phát ra trong quá trình thực thi phi tương tác.",
      "D. '--output-format stream-json' phát ra luồng gồm nhiều đối tượng sự kiện JSON phân tách bằng dòng mới thay vì một đối tượng bao bọc JSON duy nhất chứa '.result'."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because stream-json produces plain text newline-delimited JSON lines (NDJSON/JSON lines), not binary gzip streams.",
      "Option B is incorrect because permission flags do not change the structural output format of stream-json.",
      "Option C is incorrect because standard 'jq' can parse JSON objects directly without '--stream'; the failure is caused by expecting a single '.result' field on line-by-line event objects like message deltas.",
      "Option D is correct because '--output-format stream-json' streams separate event chunks on each line; attempting 'jq -r .result' on the entire stream fails because individual streaming event chunks do not match the single envelope schema of '--output-format json'."
    ],
    "rationale": "'--output-format stream-json' emits newline-delimited JSON (NDJSON) streaming events representing real-time token deltas and event lifecycle states rather than a single consolidated JSON object. Attempting to query '.result' directly across the raw stream fails on event lines that lack that top-level field or structure. To receive a single consolidated JSON object with '.result', the pipeline must use '--output-format json'.",
    "explanation": "Cờ '--output-format stream-json' tạo ra luồng JSON phân tách theo dòng mới (NDJSON), nơi mỗi dòng đại diện cho một sự kiện riêng biệt (như chunk token, bắt đầu/kết thúc sự kiện) chứ không phải là một đối tượng JSON duy nhất chứa thuộc tính '.result'. Khi 'jq -r .result' cố gắng xử lý dòng sự kiện đầu tiên không có trường '.result' hoặc chứa kiểu dữ liệu khác, 'jq' sẽ báo lỗi. Để lấy một đối tượng JSON tổng hợp duy nhất chứa '.result', pipeline phải sử dụng '--output-format json'.\\n\\n- Option A sai vì stream-json trả về các dòng văn bản JSON phân cách bằng dòng mới, không phải luồng nhị phân nén.\\n- Option B sai vì cờ cấp quyền không thay đổi định dạng cấu trúc của stream-json.\\n- Option C sai vì 'jq' xử lý đối tượng JSON thông thường không bắt buộc dùng cờ '--stream'; nguyên nhân là do cấu trúc dữ liệu không khớp.\\n- Option D đúng vì '--output-format stream-json' phát ra các dòng đối tượng sự kiện JSON riêng lẻ thay vì một bao bọc JSON duy nhất.",
    "scenarioSignature": {
      "testedPrinciple": "streaming versus buffered output format mechanics in headless execution",
      "failureMode": "parser error when extracting single field from output stream",
      "rootCause": "applying single object json query to newline delimited event stream",
      "requiredFix": "switch output format to standard json or filter streaming event lines"
    },
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]