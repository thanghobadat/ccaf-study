[
  {
    "id": "d3-b07-3.7-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-005",
    "scenarioSignature": {
      "testedPrinciple": "explicit tool whitelisting via allowedTools flag",
      "failureMode": "tool invocation failure during automated workflow execution",
      "rootCause": "omission of required directory inspection tool from allowedTools whitelist",
      "requiredFix": "append required inspection tool to allowedTools command line argument"
    },
    "questionEN": "A CI automated auditing job executes claude -p \"Audit legacy database schemas\" --allowedTools \"FileRead,Grep\" against an enterprise repository db-services. During execution, the agent discovers an imported SQL module inside a nested subfolder and attempts to list directory contents using LS to discover hidden migration scripts. Because LS is not specified in --allowedTools, Claude Code cannot list the directory contents, throwing a tool invocation permission error and causing the workflow build to fail. How should the DevOps engineer resolve this capability failure while maintaining minimum privilege?",
    "question": "[d3-b07-3.7-005] Một công việc kiểm tra tự động trên CI thực thi claude -p \"Audit legacy database schemas\" --allowedTools \"FileRead,Grep\" đối với kho lưu trữ doanh nghiệp db-services. Trong quá trình thực thi, agent phát hiện một module SQL được nhập trong thư mục con lồng nhau và cố gắng liệt kê nội dung thư mục bằng LS để tìm các script migration ẩn. Vì LS không được chỉ định trong --allowedTools, Claude Code không thể liệt kê nội dung thư mục, gây ra lỗi quyền gọi tool và khiến công việc workflow thất bại. Kỹ sư DevOps nên giải quyết lỗi năng lực này như thế nào trong khi vẫn duy trì quyền tối thiểu?",
    "optionsEN": [
      "A. Include LS in the --allowedTools flag parameter (e.g., --allowedTools \"FileRead,Grep,LS\") to explicitly authorize directory listing.",
      "B. Replace --allowedTools with --dangerously-skip-permissions to disable tool authorization prompts across the CI worker environment.",
      "C. Add subfolder paths to .claudeignore so Claude Code automatically infers file locations without querying the file system.",
      "D. Pass --disallowedTools \"Bash\" to implicitly enable all non-shell tools including LS without explicit tool enumeration."
    ],
    "options": [
      "A. Bổ sung LS vào tham số cờ --allowedTools (ví dụ: --allowedTools \"FileRead,Grep,LS\") để cấp quyền liệt kê thư mục một cách rõ ràng.",
      "B. Thay thế --allowedTools bằng --dangerously-skip-permissions để tắt tất cả các yêu cầu xác nhận quyền của tool trong môi trường CI worker.",
      "C. Thêm các đường dẫn thư mục con vào .claudeignore để Claude Code tự động suy luận vị trí tệp mà không cần truy vấn hệ thống tệp.",
      "D. Truyền --disallowedTools \"Bash\" để ngầm bật tất cả các tool không phải shell bao gồm cả LS mà không cần liệt kê tool rõ ràng."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Adding LS to --allowedTools grants the specific missing directory listing capability required for script discovery while keeping all write and shell execution capabilities restricted according to least privilege.",
      "Option B is incorrect: --dangerously-skip-permissions completely bypasses permission enforcement across the entire process, exposing write and shell execution capabilities and violating least-privilege principles.",
      "Option C is incorrect: .claudeignore excludes files from the model's context window and cannot grant missing tool execution capabilities or enable filesystem directory traversal.",
      "Option D is incorrect: --disallowedTools acts as a blacklist and cannot override an explicit whitelist pattern or implicitly grant missing read tools in a restricted non-interactive session."
    ],
    "rationale": "When using --allowedTools, Claude Code operates under a strict explicit whitelist. Omitted tools generate permission failure errors when invoked. Adding the specific missing inspection tool LS satisfies the task requirements while maintaining strict least privilege.",
    "explanation": "Trong Claude Code CLI, cờ --allowedTools hoạt động như một danh sách trắng (whitelist) nghiêm ngặt cho các công cụ được phép thực thi trong các phiên không tương tác. Khi agent cố gắng thực thi một công cụ không nằm trong whitelist (như LS để duyệt thư mục), phiên làm việc sẽ bị từ chối quyền và thất bại.\n\n- Phương án A đúng vì bổ sung trực tiếp LS vào danh sách --allowedTools \"FileRead,Grep,LS\" sẽ cấp đúng quyền truy vấn cấu trúc thư mục mà không làm mở rộng các quyền nguy hiểm khác như sửa đổi tệp hay thực thi shell.\n- Phương án B sai vì --dangerously-skip-permissions sẽ bỏ qua toàn bộ rào cản bảo mật, mở ra nguy cơ thực thi lệnh shell hoặc sửa đổi tệp ngoài ý muốn.\n- Phương án C sai vì .claudeignore chỉ có tác dụng ẩn tệp khỏi ngữ cảnh của mô hình, không thể cấp quyền cho công cụ bị thiếu.\n- Phương án D sai vì việc dùng --disallowedTools không thể bổ sung quyền một cách an toàn và rõ ràng khi quy trình đang cần danh sách cho phép cụ thể cho môi trường CI.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  },
  {
    "id": "d3-b07-3.7-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-006",
    "scenarioSignature": {
      "testedPrinciple": "least privilege tool authorization for automated read tasks",
      "failureMode": "unnecessary exposure of shell execution capabilities in automated workflow",
      "rootCause": "inclusion of broad shell execution tool when specialized search tools suffice",
      "requiredFix": "replace broad shell execution tool with specific search tools in allowedTools whitelist"
    },
    "questionEN": "A security engineer reviews an automated workflow step that runs claude -p \"Extract API docstrings and inline parameters\" --allowedTools \"FileRead,Bash\" on the repository api-gateway. The workflow only needs to scan code files and extract matching function signatures. However, granting Bash permits the model to execute arbitrary shell commands inside the build environment, creating a security exposure if untrusted pull request code contains prompt injection. Which configuration change implements least privilege while retaining all required functionality?",
    "question": "[d3-b07-3.7-006] Một kỹ sư bảo mật xem xét một bước workflow tự động chạy claude -p \"Extract API docstrings and inline parameters\" --allowedTools \"FileRead,Bash\" trên kho lưu trữ api-gateway. Workflow này chỉ cần quét các tệp mã nguồn và trích xuất các chữ ký hàm phù hợp. Tuy nhiên, việc cấp quyền Bash cho phép mô hình thực thi các lệnh shell tùy ý bên trong môi trường build, tạo ra rủi ro bảo mật nếu mã pull request không đáng tin cậy chứa prompt injection. Thay đổi cấu hình nào thực thi quyền tối thiểu trong khi vẫn giữ nguyên tất cả các chức năng cần thiết?",
    "optionsEN": [
      "A. Retain Bash in --allowedTools but append --disallowedTools \"FileEdit\" to prevent file modifications.",
      "B. Replace Bash with Grep,Glob in --allowedTools so the agent can search and discover code files without shell execution capabilities.",
      "C. Add environment variable files to .claudeignore so shell commands spawned by Bash cannot view host secrets.",
      "D. Append --dangerously-skip-permissions to restrict Bash executions strictly to non-destructive shell commands."
    ],
    "options": [
      "A. Giữ nguyên Bash trong --allowedTools nhưng bổ sung --disallowedTools \"FileEdit\" để ngăn chặn việc sửa đổi tệp.",
      "B. Thay thế Bash bằng Grep,Glob trong --allowedTools để agent có thể tìm kiếm và khám phá các tệp mã nguồn mà không cần quyền thực thi shell.",
      "C. Thêm các tệp biến môi trường vào .claudeignore để các lệnh shell được gọi bởi Bash không thể xem bí mật của hệ thống.",
      "D. Bổ sung --dangerously-skip-permissions để giới hạn các lệnh Bash chỉ ở chế độ thực thi shell không phá hoại."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Disallowing FileEdit does not prevent Bash from running arbitrary shell commands, exfiltrating environment variables, or executing network calls.",
      "Option B is correct: Replacing Bash with targeted search tools (Grep,Glob) enables full code scanning and extraction capabilities while eliminating the risk of arbitrary shell execution.",
      "Option C is incorrect: .claudeignore controls what files Claude Code views in its context window, but it does not prevent system shell commands executed via Bash from accessing environment variables or file systems.",
      "Option D is incorrect: --dangerously-skip-permissions bypasses all interactive confirmation prompts and does not restrict Bash to read-only shell commands."
    ],
    "rationale": "Principle of least privilege dictates using specialized non-mutating tools like Grep and Glob for search tasks instead of broad system execution tools like Bash. This eliminates shell execution attack vectors while fully preserving search capabilities.",
    "explanation": "Nguyên tắc quyền tối thiểu (least privilege) yêu cầu chỉ cấp đúng các công cụ hẹp cần thiết để hoàn thành nhiệm vụ. Trong kịch bản trích xuất API docstring, agent chỉ cần tìm kiếm và đọc tệp mã nguồn.\n\n- Phương án B đúng vì việc thay thế Bash bằng Grep,Glob trong --allowedTools \"FileRead,Grep,Glob\" cung cấp đầy đủ khả năng tìm kiếm mẫu chuỗi và khớp đường dẫn tệp mà loại bỏ hoàn toàn khả năng thực thi lệnh shell bất kỳ.\n- Phương án A sai vì Bash vẫn có thể thực thi các lệnh nguy hiểm (như đọc biến môi trường, gửi dữ liệu ra ngoài) ngay cả khi FileEdit bị cấm.\n- Phương án C sai vì .claudeignore chỉ giới hạn các tệp hiển thị trong ngữ cảnh của mô hình Claude Code, không ngăn được lệnh shell dưới lớp hệ điều hành truy cập hệ thống tệp hoặc biến môi trường.\n- Phương án D sai vì --dangerously-skip-permissions loại bỏ hoàn toàn việc hỏi quyền chứ không thể giới hạn Bash thành chỉ đọc.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  }
]