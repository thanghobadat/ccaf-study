[
  {
    "id": "d2-b05-2.5-005",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-005",
    "questionEN": "An AI development agent is tasked with modifying error handling logic in PaymentGatewayService inside a large TypeScript monorepo containing over 150,000 files, including heavy node_modules/, dist/, and legacy build/ directories. The agent immediately executes a global Grep search for PaymentGatewayError across the entire workspace root (/). This operation triggers a context latency spike of over 60 seconds and returns 45MB of compiled artifact text before hitting output bounds. How should the agent tool chain be optimized to locate target files efficiently?",
    "question": "[d2-b05-2.5-005] Một agent phát triển AI được giao nhiệm vụ sửa đổi logic xử lý lỗi trong PaymentGatewayService bên trong một monorepo TypeScript lớn chứa hơn 150.000 tệp, bao gồm các thư mục node_modules/, dist/ và build/ nặng. Agent ngay lập tức thực hiện tìm kiếm Grep toàn cục cho từ khóa PaymentGatewayError trên toàn bộ thư mục gốc workspace (/), gây ra hiện tượng tăng độ trễ ngữ cảnh trên 60 giây và trả về 45MB văn bản artifact biên dịch trước khi chạm giới hạn đầu ra. Agent nên tối ưu hóa chuỗi công cụ (tool chain) như thế nào để định vị các tệp mục tiêu một cách hiệu quả?",
    "optionsEN": [
      "A. Execute Glob first with the path pattern services/payment/**/*.ts to narrow target file paths, then run Grep restricted only to those filtered files.",
      "B. Replace Grep with an unrestricted Bash command grep -r \"PaymentGatewayError\" . using PAGER=cat to force full terminal output bypassing limits.",
      "C. Increase the execution timeout of Grep tool calls to 300 seconds and disable token limit truncations in the agent system settings.",
      "D. Execute WebSearch to query external documentation for PaymentGatewayError usage patterns across public open-source repositories."
    ],
    "options": [
      "A. Chạy công cụ Glob trước với mẫu đường dẫn services/payment//*.ts để lọc các đường dẫn tệp nguồn có liên quan, sau đó chạy Grep giới hạn trong danh sách tệp đã lọc đó.",
      "B. Thay thế Grep bằng lệnh Bash không giới hạn grep -r \"PaymentGatewayError\" . kèm theo PAGER=cat để ép buộc xuất toàn bộ kết quả mà không bị giới hạn ngữ cảnh.",
      "C. Tăng thời gian chờ (timeout) thực thi của công cụ Grep lên 300 giây và tắt tính năng cắt giảm giới hạn token trong cấu hình hệ thống agent.",
      "D. Sử dụng công cụ WebSearch để truy vấn tài liệu bên ngoài về các mẫu sử dụng PaymentGatewayError trên các kho lưu trữ mã nguồn mở."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because executing Glob first using a scoped directory wildcard pattern efficiently relies on filesystem index metadata to narrow target paths down to relevant source files, allowing Grep to execute only against those files and eliminating context latency and output limits.",
      "Option B is incorrect because running shell grep via Bash across the root directory still scans the entire directory tree including heavy build artifacts and node_modules, worsening context token consumption while bypassing agent environment safety controls.",
      "Option C is incorrect because increasing execution timeouts and removing output truncation limits fails to resolve the underlying inefficiency of unconstrained searching, causing the agent to waste context window capacity on compiled binary artifacts.",
      "Option D is incorrect because WebSearch fetches public web documentation, which cannot discover internal codebase files or locate specific class implementations inside the local PaymentGatewayService directory structure."
    ],
    "rationale": "Using Glob prior to Grep applies directory-level path filtering first, reducing the candidate file set from hundreds of thousands of files down to relevant source paths and preventing context overload.",
    "explanation": "Thực thi Glob trước với mẫu đường dẫn như services/payment//*.ts giúp lọc các tệp mã nguồn cần thiết dựa trên chỉ mục hệ thống tệp. Sau đó, Grep chỉ cần tìm kiếm nội dung văn bản trên tập hợp tệp nhỏ đã qua sàng lọc, loại bỏ việc quét hàng trăm nghìn tệp không liên quan trong node_modules/ hoặc dist/. Lựa chọn B dùng lệnh grep thông qua Bash vẫn làm quá tải tài nguyên. Lựa chọn C không giải quyết gốc rễ vấn đề lãng phí ngữ cảnh. Lựa chọn D dùng WebSearch là sai vì cần tìm mã nguồn nội bộ.",
    "scenarioSignature": {
      "testedPrinciple": "hierarchical tool chaining using Glob before Grep for large codebases",
      "failureMode": "excessive latency and output truncation during unconstrained codebase search",
      "rootCause": "executing content Grep across entire workspace root without directory scope filtering",
      "requiredFix": "use path pattern Glob filtering to constrain target paths prior to running content Grep"
    },
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  },
  {
    "id": "d2-b05-2.5-006",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-006",
    "questionEN": "An automated cleanup subagent executing in a CI runner environment receives a task to purge temporary build artifacts from /tmp/pipeline-builds/. The agent invokes the Bash tool with CommandLine: \"cd temp_dir && rm -rf *\" without checking the tool's working directory (Cwd). Because temp_dir does not exist in the current root working directory, cd fails and the shell proceeds to execute rm -rf * inside the repository root, deleting source files and causing job termination with Exit Code 127. Which architectural fix prevents this catastrophic file deletion behavior?",
    "question": "[d2-b05-2.5-006] Một subagent dọn dẹp tự động chạy trong môi trường CI runner nhận nhiệm vụ xóa các artifact build tạm thời khỏi thư mục /tmp/pipeline-builds/. Agent gọi công cụ Bash với CommandLine: \"cd temp_dir && rm - rf * \" mà không kiểm tra thư mục làm việc (Cwd) của công cụ. Vì temp_dir không tồn tại trong thư mục gốc hiện tại, lệnh cd thất bại và shell tiếp tục thực hiện rm -rf * ngay tại thư mục gốc kho lưu trữ, xóa sạch các tệp nguồn và khiến công việc bị dừng với Exit Code 127. Giải pháp kiến trúc nào ngăn ngừa hành vi xóa tệp thảm họa này?",
    "optionsEN": [
      "A. Pass --dangerously-skip-permissions to the Bash tool call to ensure the shell ignores missing directory errors and continues execution without stopping.",
      "B. Pass explicit absolute target paths directly to tool arguments instead of relying on cd string chaining, or enforce directory validation checks before executing destructive terminal commands.",
      "C. Use WebSearch to query standard shell command syntax guidelines before emitting destructive terminal commands.",
      "D. Replace the rm -rf command with Grep matching filename regex patterns to automatically remove matched files from the filesystem."
    ],
    "options": [
      "A. Truyền cờ --dangerously-skip-permissions vào lệnh gọi công cụ Bash để đảm bảo shell bỏ qua các lỗi thư mục không tồn tại và tiếp tục thực thi.",
      "B. Truyền trực tiếp đường dẫn tuyệt đối rõ ràng vào các tham số công cụ thay vì phụ thuộc vào việc nối chuỗi lệnh cd, hoặc bắt buộc kiểm tra xác thực thư mục mục tiêu trước khi thực thi các lệnh terminal có tính phá hủy.",
      "C. Sử dụng WebSearch để truy vấn các quy chuẩn cú pháp lệnh shell tiêu chuẩn trước khi phát ra các lệnh terminal nguy hiểm.",
      "D. Thay thế lệnh rm -rf bằng công cụ Grep khớp với mẫu regex tên tệp để tự động xóa các tệp trùng khớp khỏi hệ thống tệp."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because --dangerously-skip-permissions bypasses prompt confirmation hooks in CI environments but does not validate command directory state, allowing failed cd commands to execute destructive deletions in the current working directory.",
      "Option B is correct because avoiding shell command chaining with cd and supplying explicit absolute paths directly—or verifying directory existence prior to deletion—ensures destructive operations execute strictly within the intended directory target.",
      "Option C is incorrect because WebSearch retrieves external shell documentation rather than validating runtime directory context or protecting local workspace files from accidental execution failure.",
      "Option D is incorrect because Grep is designed exclusively for pattern matching inside file content and cannot perform file deletion operations on the underlying filesystem."
    ],
    "rationale": "Chaining cd with destructive commands like rm -rf in shell scripts risks executing deletions in unintended directories if cd fails; enforcing absolute paths or explicit pre-checks guarantees execution boundaries.",
    "explanation": "Khi thực hiện các lệnh shell nguy hiểm như rm -rf, việc nối chuỗi lệnh cd temp_dir && rm -rf * sẽ dẫn đến thảm họa nếu lệnh cd thất bại, vì shell vẫn sẽ chạy rm -rf * tại thư mục gốc hiện tại (Cwd). Giải pháp an toàn là truyền đường dẫn tuyệt đối trực tiếp hoặc xác minh sự tồn tại của thư mục mục tiêu trước khi xóa. Lựa chọn A không sửa lỗi logic chuyển thư mục. Lựa chọn C dùng WebSearch không ngăn được lỗi runtime. Lựa chọn D sai vì Grep chỉ tìm kiếm nội dung tệp, không có chức năng xóa tệp.",
    "scenarioSignature": {
      "testedPrinciple": "defensive execution scope for destructive shell commands in automated agents",
      "failureMode": "catastrophic workspace file deletion due to failed directory change in shell command chain",
      "rootCause": "combining unsafe directory change commands with destructive rm -rf actions using relative paths",
      "requiredFix": "use explicit absolute paths and validate target directory existence prior to shell deletion"
    },
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  }
]