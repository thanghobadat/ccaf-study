[
  {
    "id": "d3-b07-3.5-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-001",
    "scenarioSignature": {
      "testedPrinciple": "stdin file type validation in headless pipelines",
      "failureMode": "garbled unicode stream corruption on binary stdin",
      "rootCause": "uncaught binary payload piped directly to CLI stdin",
      "requiredFix": "pre-validate file encoding before piping stdin stream"
    },
    "questionEN": "A DevOps team uses a bash pipeline script process_uploads.sh that iterates over uploaded artifacts and feeds them to Claude Code via cat \"$FILE\" | claude -p \"Extract key parameters from this file\". When an engineer uploads a compressed .tar.gz archive into the processing directory, claude -p receives binary bytes over stdin, emitting garbled UTF-8 sequences and unreadable terminal output that breaks downstream logging. Which action resolves this pipeline failure?",
    "question": "[d3-b07-3.5-001] Một nhóm DevOps sử dụng kịch bản bash pipeline process_uploads.sh để duyệt qua các tập tin artifact tải lên và truyền chúng vào Claude Code qua lệnh cat \"$FILE\" | claude -p \"Extract key parameters from this file\". Khi một kỹ sư tải lên tệp nén .tar.gz vào thư mục xử lý, claude -p nhận các byte nhị phân qua stdin, tạo ra chuỗi UTF-8 bị lỗi (garbled) và đầu ra không thể đọc làm gián đoạn hệ thống ghi log phía sau. Hành động nào giải quyết triệt để lỗi pipeline này?",
    "optionsEN": [
      "A. Add a pre-check using file --mime-type or is_text to validate that $FILE is plain text before piping it to claude -p stdin.",
      "B. Pass --dangerously-skip-permissions to claude -p so the CLI automatically converts binary stdin streams into Base64 encoded strings.",
      "C. Add --output-format stream-json to the claude -p command to force binary byte streams to be parsed as JSON stream chunks.",
      "D. Append --max-turns 1 to claude -p to stop the CLI from attempting iterative character decoding when binary data is detected."
    ],
    "options": [
      "A. Thêm bước kiểm tra trước bằng file --mime-type hoặc is_text để xác nhận $FILE là văn bản thuần trước khi truyền vào stdin của claude -p.",
      "B. Truyền cờ --dangerously-skip-permissions vào claude -p để CLI tự động chuyển đổi luồng stdin nhị phân thành chuỗi mã hóa Base64.",
      "C. Thêm cờ --output-format stream-json vào lệnh claude -p để ép buộc luồng byte nhị phân được phân tích thành các chunk JSON stream.",
      "D. Thêm --max-turns 1 vào claude -p để ngăn CLI cố gắng giải mã ký tự lặp đi lặp lại khi phát hiện dữ liệu nhị phân."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: claude -p expects valid text input over stdin. Piping binary files causes UTF-8 decoding errors or garbled output; pre-validating input file types (e.g., using file --mime-type to verify text format) ensures non-text files are rejected before reaching the LLM pipeline.",
      "Option B is incorrect: --dangerously-skip-permissions bypasses interactive confirmation prompts for tool use in non-TTY environments; it has no effect on input MIME type validation or binary data handling.",
      "Option C is incorrect: --output-format stream-json formats CLI stdout as newline-delimited JSON events during streaming; it cannot sanitize or decode binary bytes received on stdin.",
      "Option D is incorrect: --max-turns 1 restricts agentic tool iteration loops; it does not handle stdin stream encoding or prevent invalid byte sequence errors."
    ],
    "rationale": "Validating file MIME types before executing cat \"$FILE\" | claude -p prevents invalid binary payloads from corrupting stdin, ensuring headless pipelines only process valid text artifacts.",
    "explanation": "Lựa chọn A là đúng vì claude -p yêu cầu dữ liệu đầu vào stdin ở dạng văn bản thuần (plain text / UTF-8). Khi truyền dữ liệu nhị phân (như file .tar.gz), luồng dữ liệu bị lỗi mã hóa UTF-8 dẫn đến garbled output. Việc kiểm tra định dạng MIME của file trước (sử dụng file --mime-type hoặc công cụ tương đương) là giải pháp tiêu chuẩn để ngăn ngừa file nhị phân đi vào pipeline.\n\nLựa chọn B sai vì cờ --dangerously-skip-permissions được dùng để bỏ qua các nhắc nhở xác nhận quyền công cụ trong môi trường không có TTY (headless), không có chức năng tự động chuyển nhị phân thành Base64.\n\nLựa chọn C sai vì --output-format stream-json quản lý cấu trúc định dạng stdout đầu ra ở dạng JSON streaming, không thể xử lý hay chuyển đổi luồng nhị phân đầu vào ở stdin.\n\nLựa chọn D sai vì --max-turns giới hạn số lượt thực thi công cụ agentic, không can thiệp vào quá trình giải mã ký tự ở stdin.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  },
  {
    "id": "d3-b07-3.5-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-002",
    "scenarioSignature": {
      "testedPrinciple": "exit status handling in headless CLI pipelines",
      "failureMode": "downstream script execution on failed CLI output",
      "rootCause": "missing exit code verification after headless invocation",
      "requiredFix": "evaluate return code with conditional shell execution"
    },
    "questionEN": "A CI/CD deployment pipeline in GitHub Actions runs a step script: claude -p \"Generate production deployment manifest\" > deployment.yaml; kubectl apply -f deployment.yaml. During an execution, claude -p fails due to an expired ANTHROPIC_API_KEY, returning a non-zero exit code (1). However, the runner immediately attempts to execute kubectl apply -f deployment.yaml using an empty artifact file, causing a deployment failure. Which modification prevents downstream execution when claude -p fails?",
    "question": "[d3-b07-3.5-002] Một pipeline triển khai CI/CD trong GitHub Actions chạy kịch bản: claude -p \"Generate production deployment manifest\" > deployment.yaml; kubectl apply -f deployment.yaml. Trong một lần thực thi, claude -p bị lỗi do ANTHROPIC_API_KEY hết hạn, trả về mã thoát khác không (exit code 1). Tuy nhiên, runner vẫn lập tức thực hiện kubectl apply -f deployment.yaml với tệp artifact rỗng, dẫn đến lỗi triển khai hệ thống. Sửa đổi nào ngăn chặn các lệnh phía sau chạy khi claude -p thất bại?",
    "optionsEN": [
      "A. Update the script to use claude -p \"...\" --output-format json > deployment.yaml so that API authentication errors are converted into exit code 0 status messages.",
      "B. Replace the command separator ; with logical AND && (or configure set -e in the shell) to halt script execution if claude -p exits with a non-zero code.",
      "C. Append --max-turns 50 to the claude -p command to force the CLI process to complete successfully even when authentication tokens expire.",
      "D. Pipe stdout into tee deployment.yaml so that errors are redirected to stderr while stdout remains clean for downstream commands."
    ],
    "options": [
      "A. Cập nhật kịch bản sử dụng claude -p \"...\" --output-format json > deployment.yaml để các lỗi xác thực API được chuyển thành thông báo có exit code 0.",
      "B. Thay thế dấu phân cách ; bằng toán tử logic && (hoặc cấu hình set -e trong shell) để dừng kịch bản ngay lập tức nếu claude -p thoát với mã khác 0.",
      "C. Thêm cờ --max-turns 50 vào lệnh claude -p để ép buộc tiến trình CLI hoàn thành thành công ngay cả khi token xác thực bị hết hạn.",
      "D. Pipe stdout sang tee deployment.yaml để các lỗi được chuyển sang stderr trong khi stdout giữ sạch cho các lệnh phía sau."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: --output-format json structures the command response as JSON when successful, but claude -p still returns a non-zero exit code on API failure (such as missing/invalid authentication tokens).",
      "Option B is correct: In shell scripts, using ; executes commands sequentially regardless of prior success. Replacing ; with && or setting set -e ensures kubectl apply only executes if claude -p returns exit code 0 (success).",
      "Option C is incorrect: --max-turns limits maximum agentic turns for tool use; it cannot bypass authentication failures or change exit code logic.",
      "Option D is incorrect: Redirecting output with tee does not evaluate the process return code $?, so downstream execution will still occur even if an error occurred."
    ],
    "rationale": "Checking CLI exit status via logical && or set -e ensures that headless pipelines abort immediately on non-zero exit codes, preventing downstream deployment steps from processing broken or empty artifacts.",
    "explanation": "Lựa chọn B là đúng vì trong shell script, dấu phân cách ; sẽ chạy các lệnh nối tiếp bất kể lệnh trước đó thành công hay thất bại. Khi claude -p thất bại (exit code khác 0 do lỗi API key), tệp deployment.yaml sẽ rỗng hoặc chứa thông báo lỗi. Việc sử dụng && (hoặc bật set -e) đảm bảo lệnh kubectl apply chỉ được thực thi khi claude -p trả về exit code 0 (thành công).\n\nLựa chọn A sai vì --output-format json chỉ thay đổi định dạng đầu ra khi thành công; các lỗi xác thực API vẫn sẽ khiến CLI trả về exit code khác 0.\n\nLựa chọn C sai vì --max-turns quản lý giới hạn số vòng lặp agentic, không thể khắc phục được lỗi hết hạn token xác thực hay thay đổi luồng xử lý mã thoát.\n\nLựa chọn D sai vì việc dùng tee không hề kiểm tra mã trả về $? của lệnh trước đó, do đó lệnh kubectl apply vẫn tiếp tục chạy khi có lỗi.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  }
]