[
  {
    "id": "d2-b05-2.5-009",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-009",
    "scenarioSignature": {
      "testedPrinciple": "multi-stage tool composition for efficient codebase navigation",
      "failureMode": "excessive latency and token consumption when inspecting large codebases",
      "rootCause": "unscoped search operations scanning entire filesystem before filtering file types",
      "requiredFix": "filter file paths with glob then search content with grep before reading target file"
    },
    "questionEN": "An AI coding agent is tasked with fixing a failing integration test asserting payment_webhook_retry_count in a monorepo containing over 15,000 files under packages/checkout-billing/. To efficiently locate and examine the relevant test code while minimizing token usage and latency, which tool sequence should the agent follow?",
    "question": "[d2-b05-2.5-009] Một AI coding agent được giao nhiệm vụ sửa một integration test bị lỗi có kiểm tra assertion payment_webhook_retry_count trong một monorepo chứa hơn 15.000 file tại thư mục packages/checkout-billing/. Để định vị và kiểm tra mã test liên quan một cách hiệu quả đồng thời giảm thiểu lượng token tiêu thụ và độ trễ, agent nên thực hiện chuỗi công cụ nào sau đây?",
    "optionsEN": [
      "A. Execute Glob with pattern packages/checkout-billing/**/*.test.ts to locate test files, execute Grep with query payment_webhook_retry_count restricted to those files, and then execute Read on the matching file.",
      "B. Execute Grep across the root directory **/* for payment_webhook_retry_count, then execute Glob to verify if candidate files reside in packages/checkout-billing/, and execute Read on all matches.",
      "C. Execute Read sequentially on every file returned by listing packages/checkout-billing/ until the string payment_webhook_retry_count appears in the tool output.",
      "D. Execute Bash to execute find packages/checkout-billing -name \"*.test.ts\" -exec grep -H \"payment_webhook_retry_count\" {} + to bypass built-in tool execution."
    ],
    "options": [
      "A. Thực thi Glob với mẫu packages/checkout-billing/**/*.test.ts để định vị danh sách file test, thực thi Grep với từ khóa payment_webhook_retry_count giới hạn trong các file đó, và sau đó thực thi Read trên file trùng khớp.",
      "B. Thực thi Grep trên toàn bộ thư mục gốc **/* để tìm payment_webhook_retry_count, sau đó thực thi Glob để xác minh xem file có thuộc packages/checkout-billing/ hay không, và thực thi Read trên tất cả các kết quả.",
      "C. Thực thi Read tuần tự trên mọi file thu được từ việc liệt kê packages/checkout-billing/ cho đến khi chuỗi payment_webhook_retry_count xuất hiện trong đầu ra của công cụ.",
      "D. Thực thi Bash để chạy lệnh find packages/checkout-billing -name \"*.test.ts\" -exec grep -H \"payment_webhook_retry_count\" {} + nhằm bỏ qua việc thực thi các công cụ tích hợp sẵn."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A correctly pipelines Glob (filtering candidate test file paths), Grep (searching content within targeted files), and Read (examining exact line boundaries), optimizing token efficiency and search performance.",
      "Option B runs an unconstrained Grep search across 15,000+ files first, causing unnecessary disk scanning and high execution latency before path scoping occurs.",
      "Option C attempts to read raw file contents sequentially into context memory, exhausting context window capacity and incurring prohibitive token costs.",
      "Option D invokes a shell subprocess via Bash instead of standard built-in tools, bypassing structured tool permissions and parameter validation interfaces."
    ],
    "rationale": "Combining tools in a progressive filter sequence (Glob for path matching -> Grep for internal text content -> Read for specific context) represents the most efficient pattern for codebase navigation.",
    "explanation": "Lựa chọn A đúng vì việc kết hợp chuỗi công cụ theo thứ tự phân tầng: Glob (lọc đường dẫn file test) -> Grep (tìm từ khóa nội dung trong các file đã lọc) -> Read (đọc đoạn mã cụ thể) giúp tối ưu hóa số lượng token tiêu thụ và tốc độ xử lý. Lựa chọn B sai vì thực thi Grep trên toàn bộ 15.000 file trước khi lọc đường dẫn gây lãng phí tài nguyên IO và tăng độ trễ. Lựa chọn C sai vì đọc trực tiếp toàn bộ nội dung file làm nổ cửa sổ ngữ cảnh (context window). Lựa chọn D sai vì lạm dụng lệnh Bash thay vì dùng các tool tích hợp sẵn có kiểm soát phân quyền.",
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  },
  {
    "id": "d2-b05-2.5-010",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-010",
    "scenarioSignature": {
      "testedPrinciple": "bounded regex scoping in code search operations",
      "failureMode": "context window overflow from excessive search results",
      "rootCause": "unanchored regex pattern matching thousands of lines",
      "requiredFix": "constrain search pattern and filter file path scope"
    },
    "questionEN": "An AI agent attempts to audit log parsing logic in a large repository by executing Grep with the unanchored regular expression .*error.* across the logs/ directory. The search execution results in an immediate agent failure. What is the technical cause of this failure and how does it affect the agent session?",
    "question": "[d2-b05-2.5-010] Một AI agent cố gắng kiểm tra logic phân tích log trong một repository lớn bằng cách thực thi Grep với biểu thức chính quy không có giới hạn .*error.* trên toàn bộ thư mục logs/. Việc thực thi tìm kiếm dẫn đến lỗi thất bại ngay lập tức cho agent. Nguyên nhân kỹ thuật của lỗi này là gì và nó ảnh hưởng như thế nào đến phiên làm việc của agent?",
    "optionsEN": [
      "A. The Grep engine throws a regex compilation syntax error because dot wildcard syntax is restricted in built-in search tools.",
      "B. The overly broad regex pattern matches over 10,000 lines across log files, flooding the model's context window and triggering a context overflow.",
      "C. The system automatically redirects the request to WebSearch when Grep outputs exceed 100 matches, causing an unhandled API error.",
      "D. The file system rejects the tool call because Grep can only search file paths instead of text content within files."
    ],
    "options": [
      "A. Engine Grep ném lỗi cú pháp biên dịch regex vì cú pháp đại diện dấu chấm bị hạn chế trong các công cụ tìm kiếm tích hợp sẵn.",
      "B. Mẫu regex quá rộng khớp với hơn 10.000 dòng trong các file log, làm tràn cửa sổ ngữ cảnh (context window) của mô hình và kích hoạt lỗi context overflow.",
      "C. Hệ thống tự động chuyển hướng yêu cầu sang WebSearch khi đầu ra của Grep vượt quá 100 kết quả trùng khớp, gây ra lỗi API không được xử lý.",
      "D. Hệ thống tệp từ chối cuộc gọi công cụ vì Grep chỉ có thể tìm kiếm đường dẫn file thay vì nội dung văn bản bên trong file."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because standard wildcard regex syntax is fully supported; the failure stems from result volume rather than syntax syntax error.",
      "Option B correctly identifies that an unanchored regex pattern yields tens of thousands of matching lines, overwhelming the agent's context window buffer.",
      "Option C is incorrect because built-in tools do not feature automatic cross-tool fallback behavior to WebSearch when result thresholds are breached.",
      "Option D is incorrect because Grep is explicitly designed to search file text content, whereas Glob searches file path patterns."
    ],
    "rationale": "Unanchored regex patterns in Grep over large directories can match thousands of lines, exceeding context window response limits and causing context overflow crashes.",
    "explanation": "Lựa chọn B đúng vì việc sử dụng regex quá rộng không có giới hạn phạm vi sẽ khớp với hàng chục nghìn dòng dữ liệu, dẫn đến đầu ra của tool quá lớn làm tràn cửa sổ ngữ cảnh (context overflow) của LLM. Lựa chọn A sai vì cú pháp regex tiêu chuẩn hoàn toàn hợp lệ. Lựa chọn C sai vì các tool hoạt động độc lập và không tự động chuyển sang WebSearch. Lựa chọn D sai vì Grep chính là công cụ dùng để tìm kiếm nội dung văn bản bên trong file.",
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  }
]