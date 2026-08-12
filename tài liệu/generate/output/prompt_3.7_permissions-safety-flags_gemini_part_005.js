[
  {
    "id": "d3-b07-3.7-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-009",
    "scenarioSignature": {
      "testedPrinciple": "file mutation tool blacklisting does not constrain execution capability of shell tools",
      "failureMode": "unintended code modification during read-only inspection workflow",
      "rootCause": "disallowed write tools bypass via unrestricted shell command tool",
      "requiredFix": "restrict shell execution tools or enforce mandatory tool approval policies"
    },
    "questionEN": "A DevOps team configures an automated pull-request review bot running Claude Code CLI with --disallowedTools \"FileEdit,FileWrite\" to prevent any source code modifications during automated checks. During a pipeline run on repository auth-service, Claude encounters a failing test in src/config.ts. To fix the test, Claude calls Bash with sed -i 's/ENABLE_MOCK=true/ENABLE_MOCK=false/' src/config.ts, successfully modifying the file. Why did --disallowedTools fail to prevent file modification?",
    "question": "[d3-b07-3.7-009] Một đội ngũ DevOps cấu hình một bot đánh giá pull-request chạy Claude Code CLI với --disallowedTools \"FileEdit,FileWrite\" nhằm ngăn chặn mọi sửa đổi mã nguồn trong quá trình kiểm tra tự động. Trong một lượt chạy pipeline trên repository auth-service, Claude phát hiện một kiểm thử thất bại trong src/config.ts. Để sửa kiểm thử, Claude gọi công cụ Bash với lệnh sed -i 's/ENABLE_MOCK=true/ENABLE_MOCK=false/' src/config.ts và sửa đổi file thành công. Tại sao tham số --disallowedTools lại không ngăn chặn được việc sửa đổi file này?",
    "optionsEN": [
      "A. Disallowing file writing tools does not restrict shell commands run via Bash, which retains host privileges to modify the filesystem.",
      "B. The --disallowedTools flag only takes effect if .claudeignore explicitly marks src/config.ts as read-only.",
      "C. Claude Code automatically converts sed commands into memory-only virtual diffs when file modification tools are blacklisted.",
      "D. The FileEdit tool blacklist automatically revokes Bash tool execution permissions only when Git working directory is dirty."
    ],
    "options": [
      "A. Việc cấm các công cụ ghi file không giới hạn các lệnh shell chạy qua Bash, công cụ vẫn giữ quyền trên hệ thống lưu trữ để sửa đổi filesystem.",
      "B. Cờ --disallowedTools chỉ có hiệu lực nếu .claudeignore đánh dấu rõ ràng src/config.ts là chỉ đọc.",
      "C. Claude Code tự động chuyển đổi các lệnh sed thành diff ảo chỉ lưu trong bộ nhớ khi các công cụ sửa đổi file bị đưa vào danh sách đen.",
      "D. Danh sách đen công cụ FileEdit tự động thu hồi quyền thực thi công cụ Bash chỉ khi thư mục làm việc Git có thay đổi chưa commit."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Disallowing higher-level file edit tools like FileEdit does not sandbox execution within the Bash tool, allowing shell utilities like sed or echo to mutate disk files directly.",
      "Option B (Incorrect): .claudeignore controls file context visibility for the model, not tool permission enforcement or file write locks.",
      "Option C (Incorrect): Claude Code does not intercept or virtualize shell sub-processes spawned inside the Bash tool into memory diffs.",
      "Option D (Incorrect): Blacklisting file tools does not dynamically revoke Bash execution privileges based on Git status."
    ],
    "rationale": "Blacklisting higher-level file edit tools like FileEdit via --disallowedTools does not isolate or restrict command execution in Bash. If Bash remains enabled, Claude can still execute shell commands (e.g., sed, echo, rm) to modify files directly on the host filesystem.",
    "explanation": "Trong Claude Code CLI, tham số --disallowedTools được dùng để cấm các công cụ cụ thể như FileEdit hoặc FileWrite. Tuy nhiên, nếu công cụ Bash vẫn được cho phép mà không bị giới hạn, mô hình vẫn có thể thực thi các lệnh hệ điều hành (như sed, echo, cat >) để thay đổi nội dung file trực tiếp trên đĩa.\n\n- Option A (Đúng): Cấm các công cụ chỉnh sửa file cấp cao không ngăn chặn được các lệnh shell chạy qua Bash, vì Bash chạy với quyền của tiến trình hiện tại trên hệ thống lưu trữ.\n- Option B (Sai): .claudeignore giới hạn tầm nhìn dữ liệu của mô hình, không quản lý quyền thực thi công cụ hay khóa ghi file.\n- Option C (Sai): Claude Code không can thiệp hay ảo hóa các lệnh shell thành diff trong bộ nhớ khi ghi đĩa.\n- Option D (Sai): Danh sách đen FileEdit không tự động thu hồi quyền Bash dựa trên trạng thái làm việc của Git.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  },
  {
    "id": "d3-b07-3.7-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-010",
    "scenarioSignature": {
      "testedPrinciple": "privilege escalation must occur across explicit session boundaries to maintain auditability",
      "failureMode": "unauthorized remediation execution inside audit logged environment",
      "rootCause": "in-place session privilege modification without process isolation",
      "requiredFix": "terminate audit session and spawn isolated process for write operations"
    },
    "questionEN": "A SOC team runs a security audit workflow using Claude Code CLI initialized with --allowedTools \"View,Grep,Glob\" to inspect payment-api for hardcoded keys. Upon detecting an exposed secret in server.js, a custom orchestrator script dynamically modifies the active session configuration to inject FileEdit and Bash without terminating the process or spawning a new isolated subprocess. What security vulnerability or design failure does this mid-session privilege escalation introduce?",
    "question": "[d3-b07-3.7-010] Một đội ngũ SOC vận hành quy trình kiểm tra an ninh mạng sử dụng Claude Code CLI được khởi tạo với --allowedTools \"View,Grep,Glob\" để kiểm tra các khóa cứng trong payment-api. Khi phát hiện một secret bị lộ trong server.js, một script điều phối tùy chỉnh đã thay đổi động cấu hình phiên đang hoạt động để bổ sung FileEdit và Bash mà không kết thúc tiến trình hay khởi tạo một tiến trình con độc lập. Việc leo thang đặc quyền giữa phiên này gây ra lỗ hổng an ninh hoặc lỗi thiết kế nào?",
    "optionsEN": [
      "A. It causes Claude Code CLI to crash with a fatal runtime schema error because --allowedTools cannot be parsed after process startup.",
      "B. It bypasses audit boundaries by executing state-modifying remediation actions within a log context recorded as a read-only inspection session.",
      "C. It automatically purges the .claudeignore exclusion patterns, exposing previously hidden .env files to the audit agent.",
      "D. It prevents the model from generating structured JSON output because tool declarations must remain static across model turns."
    ],
    "options": [
      "A. Nó khiến Claude Code CLI bị treo với lỗi schema runtime nghiêm trọng vì --allowedTools không thể được phân tích cú pháp sau khi tiến trình đã khởi chạy.",
      "B. Nó bỏ qua ranh giới kiểm toán bằng cách thực hiện các hành động khắc phục làm thay đổi trạng thái ngay trong bối cảnh nhật ký được ghi nhận là phiên kiểm tra chỉ đọc.",
      "C. Nó tự động xóa bỏ các mẫu loại trừ trong .claudeignore, làm lộ các file .env bị ẩn trước đó cho agent kiểm toán.",
      "D. Nó ngăn cản mô hình tạo đầu ra JSON có cấu trúc vì các khai báo công cụ phải duy trì cố định qua các lượt tương tác của mô hình."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A (Incorrect): The primary security issue is architectural governance and auditability, not process runtime schema crashes.",
      "Option B (Correct): Dynamically escalating tool privileges within an active audit session violates isolation boundaries, allowing mutating remediation actions to take place under a session logged as read-only.",
      "Option C (Incorrect): Tool permission changes do not reset or clear file ignore rules configured in .claudeignore.",
      "Option D (Incorrect): Tool availability does not prevent or corrupt structured JSON response formatting from the LLM."
    ],
    "rationale": "Privilege escalation should strictly occur at explicit session/workflow boundaries. Modifying privileges mid-session to add write tools (e.g., FileEdit, Bash) while remaining in an audit-logged session breaks auditability and least privilege isolation, allowing mutating actions under a read-only session identity.",
    "explanation": "Quy tắc nguyên tắc đặc quyền tối thiểu yêu cầu việc nâng quyền (privilege elevation) phải diễn ra ở ranh giới phiên/quy trình rõ ràng (ví dụ: kết thúc phiên audit và khởi tạo một phiên remediation mới với cờ xác thực riêng). Việc nâng quyền trực tiếp mid-session làm mất tính minh bạch của log kiểm toán, dẫn đến việc các hành động sửa đổi dữ liệu bị ghi nhận dưới danh nghĩa một phiên kiểm tra chỉ đọc.\n\n- Option A (Sai): Vấn đề cốt lõi là sự phá vỡ ranh giới kiểm toán và quản trị an ninh, không phải lỗi sụp đổ tiến trình hay schema runtime.\n- Option B (Đúng): Leo thang đặc quyền mid-session cho phép các thao tác sửa đổi hệ thống diễn ra bên trong phiên đang được ghi nhận nhật ký là chỉ đọc, làm mất tính toàn vẹn của nhật ký kiểm toán.\n- Option C (Sai): Thay đổi quyền công cụ không làm xóa hay thay đổi các quy tắc loại trừ trong .claudeignore.\n- Option D (Sai): Quyền công cụ không làm ảnh hưởng đến khả năng định dạng JSON trong phản hồi của mô hình.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  }
]