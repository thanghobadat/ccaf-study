[
  {
    "id": "d3-b07-new-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-009",
    "scenarioSignature": {
      "testedPrinciple": "turn count constraint impact on multi step execution",
      "failureMode": "premature execution termination with incomplete coverage",
      "rootCause": "setting max turns limit lower than required reasoning steps",
      "requiredFix": "increase max turns limit to match workload complexity"
    },
    "questionEN": "In a GitLab CI pipeline step configured with claude -p \"Review security vulnerabilities across all microservice routes\" --max-turns 1 --output-format json, the automated audit job completes with exit code 0 but only scans the initial route file (src/routes/auth.ts) out of 14 service route files before returning an incomplete JSON payload. Why did the pipeline job report clean status while failing to review the remaining 13 files?",
    "question": "[d3-b07-new-009] Trong bước pipeline GitLab CI được cấu hình với lệnh claude -p \"Review security vulnerabilities across all microservice routes\" --max-turns 1 --output-format json, công việc kiểm định tự động hoàn thành với mã thoát 0 nhưng chỉ quét tệp tuyến ban đầu (src/routes/auth.ts) trong tổng số 14 tệp tuyến dịch vụ trước khi trả về tải dữ liệu JSON không đầy đủ. Tại sao công việc pipeline lại báo cáo trạng thái thành công trong khi không kiểm tra 13 tệp còn lại?",
    "optionsEN": [
      "A. Setting --max-turns 1 limits Claude Code to a single turn of reasoning/tool execution, causing it to exit immediately after reading the first file instead of proceeding through remaining multi-file turns.",
      "B. Setting --max-turns 1 forces Claude Code to run in subagent isolation mode, preventing it from accessing filesystem paths outside src/routes/auth.ts.",
      "C. The --max-turns 1 parameter restricts the maximum HTTP request payload size to 1 KB, causing the CLI to drop remaining route file contents before invocation.",
      "D. The --max-turns 1 flag disables JSON schema verification for output formatting, causing the process to return exit code 0 on structural parser errors."
    ],
    "options": [
      "A. Việc thiết lập --max-turns 1 giới hạn Claude Code trong một lượt suy luận/thực thi công cụ duy nhất, khiến nó dừng lại ngay sau khi đọc tệp đầu tiên thay vì tiếp tục qua các lượt xử lý nhiều tệp tiếp theo.",
      "B. Việc thiết lập --max-turns 1 buộc Claude Code chạy ở chế độ cách ly subagent, ngăn nó truy cập các đường dẫn hệ thống tệp bên ngoài src/routes/auth.ts.",
      "C. Tham số --max-turns 1 giới hạn kích thước tải dữ liệu yêu cầu HTTP tối đa ở mức 1 KB, khiến CLI bỏ qua nội dung các tệp tuyến còn lại trước khi gọi API.",
      "D. Cờ --max-turns 1 vô hiệu hóa việc xác minh lược đồ JSON cho định dạng đầu ra, khiến tiến trình trả về mã thoát 0 khi gặp lỗi trình phân tích cú pháp cấu trúc."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: --max-turns 1 strictly caps execution to one turn. Once Claude Code executes the tool call to read src/routes/auth.ts, it consumes its single allocated turn and outputs its final JSON response without proceeding to analyze the remaining 13 route files.",
      "Option B is incorrect: --max-turns specifies the interaction turn budget; it does not control subagent creation or directory access permissions.",
      "Option C is incorrect: --max-turns limits conversational step iterations, not the network payload size or HTTP socket buffer limits.",
      "Option D is incorrect: --max-turns has no relationship to JSON output schema enforcement or CLI exit code evaluation logic."
    ],
    "rationale": "The --max-turns N flag sets an upper bound on the number of conversational and tool-call loops Claude Code can perform in non-interactive mode (-p). Setting --max-turns 1 forces the agent to conclude after its first turn, resulting in partial file evaluation when handling multi-file audit tasks.",
    "explanation": "Trong chế độ không tương tác (-p), cờ --max-turns N quy định số lượt suy luận và gọi công cụ tối đa mà Claude Code được phép thực hiện. Khi đặt --max-turns 1, agent bị giới hạn chỉ thực hiện 1 lượt duy nhất. Sau khi gọi công cụ để đọc tệp đầu tiên (src/routes/auth.ts), budget lượt đã hết nên tiến trình buộc phải tổng hợp phản hồi và kết thúc công việc với mã thoát 0, dẫn đến việc 13 tệp còn lại bị bỏ qua.\n\n- Lựa chọn A đúng vì phản ánh chính xác cơ chế hoạt động của --max-turns 1 đối với các tác vụ đa tệp.\n- Lựa chọn B sai vì cờ này không liên quan đến chế độ cách ly subagent hay phân quyền tệp.\n- Lựa chọn C sai vì cờ này giới hạn số lượt hội thoại chứ không phải kích thước request HTTP.\n- Lựa chọn D sai vì cờ này không vô hiệu hóa xác thực lược đồ JSON.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-010",
    "scenarioSignature": {
      "testedPrinciple": "turn limit allocation for bounded single file tasks",
      "failureMode": "excessive token consumption and workflow duration",
      "rootCause": "overallocating max turns limit without strict prompt termination boundaries",
      "requiredFix": "lower max turns limit and define strict task completion prompts"
    },
    "questionEN": "A GitHub Actions workflow executes claude -p \"Fix code formatting in src/utils/logger.ts\" --max-turns 20 --output-format json on PR commits. Although the formatting fix is completed in turn 1, Claude Code continues iterating for 19 additional turns analyzing unrelated workspace files and generating redundant validations before completing, resulting in high API token consumption and long CI job runtimes. What is the root cause of this resource inefficiency?",
    "question": "[d3-b07-new-010] Một quy trình công việc GitHub Actions thực thi lệnh claude -p \"Fix code formatting in src/utils/logger.ts\" --max-turns 20 --output-format json trên các commit PR. Mặc dù việc sửa định dạng hoàn tất ngay trong lượt 1, Claude Code vẫn tiếp tục lặp thêm 19 lượt để phân tích các tệp không liên quan trong không gian làm việc và tạo các xác nhận thừa trước khi hoàn thành, dẫn đến việc tiêu tốn nhiều token API và kéo dài thời gian chạy công việc CI. Nguyên nhân gốc rễ của sự lãng phí tài nguyên này là gì?",
    "optionsEN": [
      "A. Setting --max-turns 20 disables automatic file writing, forcing Claude Code to spend 19 turns requesting user confirmation via stdout.",
      "B. Configuring an excessively high turn limit like --max-turns 20 for a simple single-file edit allows the agent to perform unnecessary follow-up exploration and validation loops when prompt instructions lack strict completion criteria.",
      "C. The --max-turns 20 flag forces Claude Code into planning mode, requiring 19 interactive confirmation cycles before committing changes to disk.",
      "D. Specifying --max-turns 20 overrides --output-format json and redirects all response payloads into an infinite log streaming buffer."
    ],
    "options": [
      "A. Thiết lập --max-turns 20 vô hiệu hóa việc ghi tệp tự động, buộc Claude Code phải dành 19 lượt để yêu cầu xác nhận từ người dùng qua stdout.",
      "B. Việc cấu hình giới hạn lượt quá cao như --max-turns 20 cho một tác vụ chỉnh sửa tệp đơn giản cho phép agent thực hiện các vòng lặp khám phá và xác minh không cần thiết khi hướng dẫn câu lệnh thiếu tiêu chí hoàn thành nghiêm ngặt.",
      "C. Cờ --max-turns 20 buộc Claude Code chuyển sang chế độ lập kế hoạch (planning mode), yêu cầu 19 chu kỳ xác nhận tương tác trước khi ghi thay đổi vào đĩa.",
      "D. Việc chỉ định --max-turns 20 ghi đè cờ --output-format json và chuyển hướng tất cả dữ liệu phản hồi vào một vùng đệm phát luồng nhật ký vô hạn."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: --max-turns controls iteration limits and does not alter file modification capabilities or trigger stdout user prompts.",
      "Option B is correct: Allocating --max-turns 20 for a simple, single-file task gives Claude Code room to over-explore the repository and perform unnecessary sanity checks across unreferenced files unless the prompt strictly bounds its scope.",
      "Option C is incorrect: --max-turns regulates maximum turn execution budget; it does not switch headless execution into interactive planning mode.",
      "Option D is incorrect: --max-turns does not affect --output-format json schema output or cause log streaming buffer loops."
    ],
    "rationale": "When configuring headless automation in CI pipelines, --max-turns should be closely aligned with the expected complexity of the task. Setting a high turn limit (such as 20) for a trivial single-file modification allows the model to continue multi-turn autonomous exploration, resulting in token bloat and latency if prompt instructions do not strictly enforce early termination.",
    "explanation": "Trong quy trình CI/CD, cờ --max-turns cần được điều chỉnh phù hợp với phạm vi tác vụ. Đặt --max-turns 20 cho một công việc nhỏ đơn lẻ (sửa format 1 tệp) mở ra ngân sách lượt quá lớn, khiến Claude Code tự động tiếp tục các lượt kiểm tra phụ, quét dự án xung quanh hoặc xác minh thừa nếu câu lệnh không giới hạn phạm vi dừng rõ ràng.\n\n- Lựa chọn A sai vì --max-turns không vô hiệu hóa việc ghi tệp hay bắt xác nhận stdout.\n- Lựa chọn B đúng vì giải thích chính xác lý do tại sao việc đặt lượt quá cao cho tác vụ đơn giản lại dẫn đến việc tiêu tốn token và thời gian chạy qua các vòng lặp khám phá không cần thiết.\n- Lựa chọn C sai vì cờ này không kích hoạt planning mode tương tác.\n- Lựa chọn D sai vì cờ này không ghi đè định dạng JSON hay tạo bộ đệm nhật ký vô hạn.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]