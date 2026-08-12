[
  {
    "id": "d3-b07-3.5-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-007",
    "scenarioSignature": {
      "testedPrinciple": "headless pipeline output parsing validation",
      "failureMode": "downstream steps receive empty strings due to unhandled extraction failures",
      "rootCause": "extracting missing json key without error checking when jq evaluates raw output",
      "requiredFix": "validate raw output structure and verify jq extraction results before variable assignment"
    },
    "questionEN": "A DevOps team runs a nightly CI script executing OUTPUT=$(claude -p \"Analyze dependencies\" --output-format json) and extracts the status using STATUS=$(echo \"$OUTPUT\" | jq -r '.result.status'). When a non-JSON warning message is written to stdout due to an environment misconfiguration, jq fails to match the expected schema and evaluates to null or an empty string, causing downstream deployment steps to execute with empty arguments instead of failing fast. Which modification ensures pipeline failure on output parsing mismatches?",
    "question": "[d3-b07-3.5-007] Một đội ngũ DevOps chạy kịch bản CI hàng đêm thực thi OUTPUT=$(claude -p \"Analyze dependencies\" --output-format json) và trích xuất trạng thái bằng STATUS=$(echo \"$OUTPUT\" | jq -r '.result.status'). Khi một thông báo cảnh báo không phải JSON được ghi vào stdout do cấu hình sai môi trường, jq không khớp được với schema mong đợi và trả về null hoặc chuỗi rỗng, khiến các bước triển khai phía sau chạy với đối số rỗng thay vì dừng lại ngay (fail fast). Thay đổi nào sau đây đảm bảo đường ống thất bại khi có lỗi không tương thích trong phân tích đầu ra?",
    "optionsEN": [
      "A. Add --max-turns 1 to the CLI invocation so Claude Code suppresses diagnostic warnings during analysis.",
      "B. Append || true to the jq command so that shell execution errors are caught and logged into a file.",
      "C. Pass jq -e '.result.status // empty' and set set -e in the shell script to terminate immediately when parsing yields missing or invalid data.",
      "D. Replace --output-format json with --output-format stream-json so stdout is automatically piped line-by-line into jq."
    ],
    "options": [
      "A. Thêm --max-turns 1 vào lời gọi CLI để Claude Code ẩn các cảnh báo chẩn đoán trong quá trình phân tích.",
      "B. Thêm || true vào lệnh jq để các lỗi thực thi shell được ghi nhận và lưu vào tệp nhật ký.",
      "C. Sử dụng jq -e '.result.status // empty' và thiết lập set -e trong kịch bản shell để dừng lập tức khi phân tích ra dữ liệu thiếu hoặc không hợp lệ.",
      "D. Thay thế --output-format json bằng --output-format stream-json để stdout tự động được đẩy theo dòng vào jq."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because --max-turns 1 restricts turn count but does not suppress stderr/stdout diagnostic output or schema parsing failures.",
      "Option B is incorrect because adding || true ignores non-zero exit codes from jq, escalating silent failures rather than stopping execution.",
      "Option C is correct because the -e flag causes jq to set a non-zero exit code when the output is false or null, allowing shell strict mode (set -e) to halt pipeline execution upon invalid data extraction.",
      "Option D is incorrect because --output-format stream-json outputs line-delimited JSON objects which require dedicated streaming processing and would break standard jq schema extraction."
    ],
    "rationale": "Using jq -e forces jq to exit with status 1 when the extracted expression evaluates to null or false. In combination with set -e, this stops shell execution immediately when Claude Code output does not contain the expected JSON key structure, preventing silent empty-variable propagation.",
    "explanation": "Lựa chọn C chính xác vì cờ -e trong jq sẽ khiến lệnh trả về exit code khác 0 nếu kết quả phân tích là null hoặc false. Kết hợp với set -e ở đầu script shell, đường ống sẽ dừng ngay lập tức khi cấu trúc JSON không đúng kỳ vọng.\n\n- Option A sai vì --max-turns 1 chỉ giới hạn số lượt hội thoại chứ không ngăn chặn tin nhắn chẩn đoán hoặc lỗi định dạng.\n- Option B sai vì || true sẽ bỏ qua mã lỗi của jq, khiến lỗi im lặng trở nên nghiêm trọng hơn.\n- Option D sai vì --output-format stream-json phát ra JSON theo từng dòng (NDJSON), khiến việc parse theo schema cố định của jq bị hỏng nếu không có logic xử lý luồng phù hợp.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  },
  {
    "id": "d3-b07-3.5-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.5 headless-automation / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.5-008",
    "scenarioSignature": {
      "testedPrinciple": "model selection suitability for complex headless tasks",
      "failureMode": "task failure or improper tool calling during autonomous code restructuring",
      "rootCause": "specifying a lightweight model for complex reasoning and repository modifying automation",
      "requiredFix": "configure high capability flagship model for multi-file autonomous headless tasks"
    },
    "questionEN": "An automated refactoring job runs claude -p \"Restructure multi-file dependency injection framework\" --model claude-3-5-haiku --dangerously-skip-permissions. The pipeline consistently fails to generate valid refactoring steps, missing key architectural cross-references and producing truncated edits. What root cause accounts for this failure and how should the workflow be updated?",
    "question": "[d3-b07-3.5-008] Một công việc tái cấu trúc tự động chạy lệnh claude -p \"Restructure multi-file dependency injection framework\" --model claude-3-5-haiku --dangerously-skip-permissions. Đường ống liên tục thất bại trong việc tạo ra các bước refactor hợp lệ, bỏ lỡ các tham chiếu chéo kiến trúc quan trọng và tạo ra các đoạn sửa đổi bị cắt xén. Nguyên nhân gốc rễ nào giải thích cho thất bại này và quy trình cần được cập nhật như thế nào?",
    "optionsEN": [
      "A. The command lacks --no-tools, causing Haiku to attempt manual file edits without standard permission grants.",
      "B. claude -p requires interactive TTY input when executing code modifications regardless of flags provided.",
      "C. The --output-format json flag was omitted, preventing the model from calling structural refactoring APIs.",
      "D. The assigned model lacks sufficient reasoning capacity for complex multi-file architectural tasks; the pipeline should be configured with a flagship model like claude-3-7-sonnet."
    ],
    "options": [
      "A. Lệnh thiếu cờ --no-tools, khiến Haiku cố gắng chỉnh sửa tệp thủ công mà không có quyền chuẩn.",
      "B. Lệnh claude -p yêu cầu đầu vào TTY tương tác khi thực hiện sửa đổi mã nguồn dù có cờ nào đi nữa.",
      "C. Cờ --output-format json bị thiếu, ngăn mô hình gọi các API tái cấu trúc theo cấu trúc.",
      "D. Mô hình được chỉ định thiếu năng lực suy luận cho các nhiệm vụ kiến trúc phức tạp trên nhiều tệp; đường ống nên được cấu hình với mô hình cao cấp như claude-3-7-sonnet."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because --no-tools disables tool usage completely, which would prevent any file edits rather than resolving quality issues.",
      "Option B is incorrect because --dangerously-skip-permissions combined with non-interactive -p correctly allows headless file modifications without requiring a TTY.",
      "Option C is incorrect because --output-format json formats output structured text but does not enable tool capabilities or fix reasoning deficiencies.",
      "Option D is correct because smaller models like Haiku are intended for fast, simple tasks; complex multi-file codebase refactoring requires high-capacity reasoning models like Sonnet in headless pipelines."
    ],
    "rationale": "Selecting lightweight models like Haiku for complex, multi-file architectural refactoring results in task failure due to limited reasoning capability for large-scale agentic workflows. High-complexity autonomous tasks require setting --model to a flagship model such as Sonnet.",
    "explanation": "Lựa chọn D chính xác vì các mô hình thuộc phân khúc nhỏ/nhanh như Haiku không phù hợp cho nhiệm vụ suy luận phức tạp và tái cấu trúc kiến trúc trên nhiều tệp. Với công việc agentic tự động phức tạp trong chế độ headless, cần chỉ định mô hình có năng lực suy luận cao như Sonnet.\n\n- Option A sai vì --no-tools sẽ tắt hoàn toàn khả năng sử dụng công cụ (như sửa tệp), không giúp giải quyết vấn đề chất lượng.\n- Option B sai vì --dangerously-skip-permissions trong claude -p cho phép chạy sửa đổi mã không cần TTY tương tác.\n- Option C sai vì --output-format json chỉ định dạng đầu ra thành JSON chứ không liên quan đến khả năng refactor hay gọi tool.",
    "sources": [
      {
        "label": "Lesson 3.5: Headless Automation",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-5-headless-automation"
      }
    ]
  }
]