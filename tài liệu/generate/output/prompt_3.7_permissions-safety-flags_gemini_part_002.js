[
  {
    "id": "d3-b07-3.7-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-003",
    "scenarioSignature": {
      "testedPrinciple": "shell execution tool privilege boundary enforcement",
      "failureMode": "unintended infrastructure mutation through unrestricted shell tool access",
      "rootCause": "tool-level whitelist granting raw command shell execution without command restriction",
      "requiredFix": "enforce command policy validation hooks or containerized execution boundaries"
    },
    "questionEN": "An SRE team configures Claude Code in an incident support session to execute unit tests using the Bash tool. They run claude --allowedTools Bash FileRead to allow test execution while keeping file edits disabled. During the session, Claude Code reads a troubleshooting guide and executes kubectl apply -f k8s/deploy.yaml via Bash, mutating a live Kubernetes cluster. Why did --allowedTools Bash fail to block the deployment command, and how should privilege boundaries be enforced?",
    "question": "[d3-b07-3.7-003] Đội ngũ SRE cấu hình Claude Code trong một phiên hỗ trợ xử lý sự cố để thực thi các bài kiểm thử đơn vị bằng công cụ Bash. Họ chạy lệnh claude --allowedTools Bash FileRead để cho phép chạy kiểm thử trong khi vẫn vô hiệu hóa quyền sửa đổi tệp. Trong phiên làm việc, Claude Code đọc một hướng dẫn xử lý sự cố và thực thi kubectl apply -f k8s/deploy.yaml thông qua Bash, làm thay đổi cụm Kubernetes đang hoạt động. Tại sao --allowedTools Bash không thể chặn lệnh triển khai, và ranh giới quyền hạn nên được thực thi như thế nào?",
    "optionsEN": [
      "A. The --allowedTools flag parses terminal binary names, so adding kubectl to .claudeignore automatically blocks its execution in Bash.",
      "B. Specifying --disallowedTools kubectl terraform alongside Bash restricts specific shell commands while keeping test scripts functional.",
      "C. Whitelisting the Bash tool enables unrestricted shell command execution; blocking deployment commands requires shell command validation hooks or environment-level privilege isolation.",
      "D. The Bash tool operates in a default read-only shell mode unless the --enable-write-shell flag is explicitly declared."
    ],
    "options": [
      "A. Cờ --allowedTools tự động phân tích tên các tệp nhị phân terminal, nên việc thêm kubectl vào .claudeignore sẽ tự động chặn việc thực thi nó trong Bash.",
      "B. Việc khai báo --disallowedTools kubectl terraform cùng với Bash sẽ giới hạn các lệnh shell cụ thể trong khi vẫn giữ cho kịch bản kiểm thử hoạt động.",
      "C. Việc đưa công cụ Bash vào danh sách cho phép (whitelist) sẽ cấp quyền thực thi lệnh shell không hạn chế; việc chặn các lệnh triển khai đòi hỏi phải có hook kiểm tra lệnh shell hoặc cô lập quyền hạn ở cấp môi trường.",
      "D. Công cụ Bash hoạt động mặc định ở chế độ shell chỉ đọc trừ khi cờ --enable-write-shell được khai báo rõ ràng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: .claudeignore excludes files from being read into context, but it does not intercept or restrict command binaries executed inside a Bash subshell.",
      "Option B is incorrect: --disallowedTools accepts Claude Code tool identifiers (such as FileEdit or Bash), not arbitrary system CLI command names like kubectl or terraform.",
      "Option C is correct: Granting access to the Bash tool allows any valid shell command to execute within the session environment; preventing unauthorized deployment commands requires enforcing command validation hooks or stripping deployment credentials/binaries from the host environment.",
      "Option D is incorrect: The Bash tool does not feature a default read-only mode or require an --enable-write-shell flag; any shell command executed via Bash has standard subshell privileges."
    ],
    "rationale": "The --allowedTools parameter controls tool invocation at the Claude Code protocol level. Granting access to 'Bash' allows the model to run arbitrary shell commands. To block harmful operations like infrastructure deployment, organizations cannot rely solely on tool whitelisting; they must implement shell execution validation hooks or isolate OS credentials.",
    "explanation": "Cờ --allowedTools kiểm soát việc cấp quyền cho các công cụ ở cấp giao thức Claude Code. Khi công cụ Bash được đưa vào danh sách phép (--allowedTools Bash), Claude Code có quyền chạy bất kỳ lệnh shell nào trong môi trường hệ thống. Cờ --allowedTools không phân tích cú pháp bên trong câu lệnh shell để chặn các lệnh như kubectl hay terraform.\n\n- Lựa chọn C đúng vì cấp quyền Bash đồng nghĩa với cấp quyền thực thi shell tổng quát. Để ngăn chặn các lệnh triển khai hạ tầng nguy hiểm, cần sử dụng hook kiểm tra lệnh shell hoặc loại bỏ quyền/thông tin đăng nhập triển khai khỏi môi trường thực thi.\n- Lựa chọn A sai vì .claudeignore chỉ ẩn tệp khỏi ngữ cảnh mô hình chứ không chặn thực thi lệnh nhị phân trong terminal.\n- Lựa chọn B sai vì --disallowedTools chỉ chấp nhận tên công cụ của Claude Code (như FileEdit, Bash) chứ không nhận tên tệp nhị phân của hệ thống.\n- Lựa chọn D sai vì Bash không có chế độ chỉ đọc mặc định hay cờ --enable-write-shell.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  },
  {
    "id": "d3-b07-3.7-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-004",
    "scenarioSignature": {
      "testedPrinciple": "read-only tool whitelisting for documentation tasks",
      "failureMode": "unintended file modification or script execution during read-only task",
      "rootCause": "relying on prompt instructions instead of protocol-level tool restriction",
      "requiredFix": "explicitly configure allowedTools whitelist with read and search tools only"
    },
    "questionEN": "A DevOps engineer configures an automated documentation generator using Claude Code in a CI pipeline. The pipeline scans repository markdown files and codebase annotations. To adhere to least privilege, the session must be restricted strictly to inspecting code and searching files without any risk of modifying source code or running shell scripts. Why is relying on a system prompt directive such as 'Do not edit files or run commands' insufficient, and how should permissions be configured?",
    "question": "[d3-b07-3.7-004] Một kỹ sư DevOps cấu hình trình tạo tài liệu tự động bằng Claude Code trong đường ống CI. Đường ống này quét các tệp markdown và chú thích mã nguồn trong kho lưu trữ. Để tuân thủ nguyên tắc quyền tối thiểu (least privilege), phiên làm việc phải được giới hạn nghiêm ngặt ở việc kiểm tra mã và tìm kiếm tệp mà không có rủi ro sửa đổi mã nguồn hoặc chạy kịch bản shell. Tại sao việc chỉ dựa vào chỉ thị trong prompt hệ thống như 'Do not edit files or run commands' lại không đủ, và quyền hạn nên được cấu hình như thế nào?",
    "optionsEN": [
      "A. System prompt directives enforce hardware-level security sandboxing, making CLI tool permission flags redundant.",
      "B. Setting --disallowedTools FileEdit FileWrite is sufficient, as Bash is automatically disabled whenever documentation prompts are detected.",
      "C. Configuring --read-only-mode true disables all file writes while bypassing .claudeignore rules for repository docs.",
      "D. Prompt instructions are non-deterministic soft constraints; enforcing strict read-only access requires explicitly setting --allowedTools FileRead Grep Glob to restrict available capabilities at the protocol level."
    ],
    "options": [
      "A. Các chỉ thị trong prompt hệ thống áp dụng cơ chế sandbox an ninh ở cấp phần cứng, khiến các cờ quyền hạn công cụ CLI trở nên dư thừa.",
      "B. Việc thiết lập --disallowedTools FileEdit FileWrite là đủ, vì Bash sẽ tự động bị vô hiệu hóa bất cứ khi nào phát hiện prompt tạo tài liệu.",
      "C. Việc cấu hình --read-only-mode true sẽ vô hiệu hóa mọi thao tác ghi tệp trong khi bỏ qua các quy tắc .claudeignore đối với tài liệu kho lưu trữ.",
      "D. Các hướng dẫn trong prompt chỉ là ràng buộc mềm không định tính; việc thực thi truy cập chỉ đọc nghiêm ngặt đòi hỏi phải thiết lập rõ ràng --allowedTools FileRead Grep Glob để giới hạn các khả năng khả dụng ở cấp giao thức."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: System prompts are soft model instructions processed by LLMs and do not construct hardware sandboxes or protocol-level guards.",
      "Option B is incorrect: Claude Code does not automatically disable Bash based on prompt intent analysis; omitting Bash from disallowedTools leaves shell execution available.",
      "Option C is incorrect: --read-only-mode is not a valid Claude Code CLI flag for tool permissions, and .claudeignore is never bypassed by permission settings.",
      "Option D is correct: Prompt instructions cannot guarantee zero tool calls to write or shell tools. Explicitly passing --allowedTools FileRead Grep Glob enforces an immutable whitelist at the protocol layer, guaranteeing that FileWrite, FileEdit, and Bash cannot be invoked."
    ],
    "rationale": "Prompt instructions are advisory soft constraints processed by the LLM and cannot offer deterministic security guarantees. To guarantee that a documentation workflow cannot mutate files or execute arbitrary shell scripts, engineers must enforce least privilege at the tool boundary using --allowedTools FileRead Grep Glob.",
    "explanation": "Hướng dẫn trong prompt hệ thống chỉ mang tính chất gợi ý cho mô hình ngôn ngữ (LLM) và không tạo ra ranh giới bảo mật tuyệt đối. Nếu chỉ dùng lời dặn trong prompt, mô hình vẫn có thể gọi các công cụ ghi tệp hoặc chạy shell khi gặp tình huống bất ngờ.\n\n- Lựa chọn D đúng vì thiết lập --allowedTools FileRead Grep Glob áp dụng danh sách trắng (whitelist) cứng ở cấp giao thức. Điều này đảm bảo các công cụ như FileWrite, FileEdit hay Bash hoàn toàn không có sẵn để mô hình triệu gọi.\n- Lựa chọn A sai vì prompt hệ thống không tạo ranh giới sandbox cấp phần cứng.\n- Lựa chọn B sai vì Claude Code không tự động phân tích ý định để ẩn Bash nếu không được cấu hình loại trừ.\n- Lựa chọn C sai vì --read-only-mode không phải là cờ hợp lệ để quản lý quyền công cụ trong Claude Code CLI và .claudeignore luôn được áp dụng.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  }
]