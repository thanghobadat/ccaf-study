[
  {
    "id": "d3-b07-new-019",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-019",
    "scenarioSignature": {
      "testedPrinciple": "allowed tools flag empty string whitelist evaluation",
      "failureMode": "pipeline execution unable to invoke file or bash tools",
      "rootCause": "empty string whitelist explicitly restricts tool availability to zero tools",
      "requiredFix": "omit allowed tools flag to restore default tool permissions"
    },
    "questionEN": "A DevOps engineer configures a headless automated code review step in GitHub Actions using claude -p \"Analyze repository security\" --dangerously-skip-permissions --allowedTools \"\". The pipeline step fails to perform file inspections or run local scanner scripts. What is the fundamental difference in tool execution behavior between passing --allowedTools \"\" and omitting the --allowedTools flag entirely?",
    "question": "[d3-b07-new-019] Một kỹ sư DevOps cấu hình bước kiểm tra mã tự động không tương tác trong GitHub Actions bằng lệnh claude -p \"Analyze repository security\" --dangerously-skip-permissions --allowedTools \"\". Bước pipeline không thể thực hiện kiểm tra tệp hoặc chạy các kịch bản quét nội bộ. Sự khác biệt căn bản về hành vi thực thi công cụ giữa việc truyền --allowedTools \"\" và bỏ qua hoàn toàn cờ --allowedTools là gì?",
    "optionsEN": [
      "A. Omitting --allowedTools disables all tool execution, while passing --allowedTools \"\" enables all standard default tools.",
      "B. Both configurations behave identically because an empty string parameter defaults to enabling the full standard toolset.",
      "C. Omitting --allowedTools permits standard default tool usage, whereas --allowedTools \"\" explicitly sets a zero-tool whitelist, blocking all tool execution.",
      "D. Passing --allowedTools \"\" causes Claude Code to prompt interactively for tool authorization, while omitting it grants silent permission to read-only tools."
    ],
    "options": [
      "A. Bỏ qua --allowedTools sẽ vô hiệu hóa thực thi tất cả công cụ, trong khi truyền --allowedTools \"\" sẽ bật tất cả công cụ mặc định.",
      "B. Cả hai cấu hình đều hoạt động giống hệt nhau vì tham số chuỗi rỗng mặc định sẽ bật toàn bộ tập công cụ tiêu chuẩn.",
      "C. Bỏ qua --allowedTools cho phép sử dụng các công cụ mặc định tiêu chuẩn, trong khi --allowedTools \"\" chỉ định danh sách trắng 0 công cụ, chặn mọi thực thi công cụ.",
      "D. Truyền --allowedTools \"\" khiến Claude Code đưa ra yêu cầu xác nhận công cụ theo cách tương tác, trong khi bỏ qua cờ này sẽ cấp quyền yên lặng cho các công cụ chỉ đọc."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: It reverses the actual behavior; omitting --allowedTools retains standard default tool permissions, whereas passing an empty string strips all tool access.",
      "Option B is incorrect: An empty string --allowedTools \"\" is parsed as an explicit whitelist of zero tools rather than falling back to default tool availability.",
      "Option C is correct: Omitting --allowedTools leaves default tool permissions intact, while passing --allowedTools \"\" explicitly restricts the allowed tool whitelist to zero tools, preventing Claude Code from invoking any tools.",
      "Option D is incorrect: Running in headless mode (-p) with --dangerously-skip-permissions bypasses interactive prompts regardless of tool restriction flags."
    ],
    "rationale": "Omitting --allowedTools permits Claude Code to access standard built-in tools under default rules, whereas passing an empty string --allowedTools \"\" configures an empty tool whitelist, preventing Claude Code from invoking any tools.",
    "explanation": "Trong Claude Code, việc truyền --allowedTools \"\" sẽ thiết lập danh sách trắng (whitelist) các công cụ được phép thành danh sách rỗng, dẫn đến việc tất cả các công cụ (như Bash, Edit, View) bị chặn hoàn toàn trong quá trình thực thi.\n- Phương án A sai vì đảo ngược hành vi: việc bỏ qua cờ vẫn cho phép dùng công cụ mặc định, còn chuỗi rỗng mới là nguyên nhân tước bỏ mọi công cụ.\n- Phương án B sai vì cờ --allowedTools \"\" không mặc định chuyển về tập công cụ tiêu chuẩn mà ghi đè bằng danh sách rỗng.\n- Phương án C đúng vì bỏ cờ --allowedTools cho phép sử dụng công cụ theo mặc định, trong khi truyền chuỗi rỗng chỉ định danh sách trắng 0 công cụ, ngăn chặn hoàn toàn việc gọi công cụ.\n- Phương án D sai vì chế độ headless (-p) cùng --dangerously-skip-permissions không đưa ra câu hỏi tương tác bất kể cấu hình cờ công cụ.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-020",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-020",
    "scenarioSignature": {
      "testedPrinciple": "ansi escape sequence suppression for structured json output parsing",
      "failureMode": "automated parser step throws syntax error on structured json payload",
      "rootCause": "terminal color escape codes embedded within raw stdout output stream",
      "requiredFix": "append no color flag or environment variable to disable color formatting"
    },
    "questionEN": "A Jenkins pipeline executes RESULT=$(claude -p \"Perform static analysis on src/\" --output-format json) and attempts to extract findings using echo \"$RESULT\" | jq '.result'. The pipeline stage fails with parse error: Invalid numeric literal at line 1, column 5. Log inspection reveals raw ANSI escape codes (\\u001b[31m) embedded within the output stream. How should the CI pipeline configuration be modified to resolve this JSON parsing failure?",
    "question": "[d3-b07-new-020] Một pipeline Jenkins thực thi RESULT=$(claude -p \"Perform static analysis on src/\" --output-format json) và cố gắng trích xuất kết quả bằng echo \"$RESULT\" | jq '.result'. Giai đoạn pipeline thất bại với lỗi parse error: Invalid numeric literal at line 1, column 5. Kiểm tra nhật ký cho thấy các mã thoát ANSI thô (\\u001b[31m) bị nhúng vào luồng đầu ra. Cấu hình pipeline CI cần được sửa đổi như thế nào để khắc phục lỗi phân tích cú pháp JSON này?",
    "optionsEN": [
      "A. Increase the --max-turns limit so Claude Code can automatically strip ANSI escape sequences before emitting the response payload.",
      "B. Switch --output-format json to --output-format text so jq can parse raw unformatted plain-text streams directly.",
      "C. Include --dangerously-skip-permissions to suppress ANSI color control characters from being emitted into standard output.",
      "D. Append the --no-color flag (or export NO_COLOR=1) to suppress ANSI escape code formatting in headless execution output."
    ],
    "options": [
      "A. Tăng giới hạn --max-turns để Claude Code tự động loại bỏ các chuỗi thoát ANSI trước khi phát ra tải trọng phản hồi.",
      "B. Chuyển --output-format json thành --output-format text để jq có thể phân tích trực tiếp các luồng văn bản thuần không định dạng.",
      "C. Thêm cờ --dangerously-skip-permissions để ngăn chặn các ký tự điều khiển màu ANSI xuất ra luồng đầu ra tiêu chuẩn.",
      "D. Thêm cờ --no-color (hoặc xuất NO_COLOR=1) để vô hiệu hóa định dạng mã màu ANSI trong đầu ra thực thi không tương tác."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: The --max-turns flag controls turn limits in conversation iterations and has no effect on terminal color formatting or ANSI sequence generation.",
      "Option B is incorrect: Changing output format to plain text produces unstructured output, which makes it impossible for jq to parse as valid JSON.",
      "Option C is incorrect: The --dangerously-skip-permissions flag bypasses permission prompts, but does not modify or suppress terminal output color formatting.",
      "Option D is correct: Passing --no-color (or setting NO_COLOR=1) disables ANSI color code output, enabling downstream tools like jq to clean-parse the structured JSON payload without syntax errors."
    ],
    "rationale": "ANSI escape sequences corrupt structured output when colorization is active in terminal environments. Adding --no-color (or setting NO_COLOR=1) strips ANSI escape codes, allowing jq to parse raw JSON output successfully.",
    "explanation": "Khi chạy trong môi trường CI/CD, các mã màu ANSI (ANSI escape codes) có thể làm hỏng cấu trúc JSON trả về nếu không được tắt, khiến các công cụ như jq báo lỗi phân tích cú pháp (parse error).\n- Phương án A sai vì --max-turns chỉ giới hạn số lượt hội thoại chứ không can thiệp vào định dạng ANSI của đầu ra.\n- Phương án B sai vì đổi sang --output-format text sẽ tạo ra văn bản không có cấu trúc, jq vẫn không thể phân tích được thành JSON.\n- Phương án C sai vì --dangerously-skip-permissions dùng để bỏ qua các câu hỏi cấp quyền, không có tác dụng loại bỏ mã định dạng màu.\n- Phương án D đúng vì việc thêm cờ --no-color (hoặc đặt biến môi trường NO_COLOR=1) sẽ vô hiệu hóa việc tạo mã màu ANSI, đảm bảo đầu ra JSON sạch và hợp lệ cho jq.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]