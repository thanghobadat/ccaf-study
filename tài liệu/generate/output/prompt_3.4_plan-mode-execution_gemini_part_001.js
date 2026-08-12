[
  {
    "id": "d3-b07-3.4-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-001",
    "scenarioSignature": {
      "testedPrinciple": "auto-approve mode restriction to non-interactive automated environments",
      "failureMode": "unintended execution of hazardous local file changes without plan review",
      "rootCause": "enabling auto-approve flags during interactive local developer sessions",
      "requiredFix": "reserve auto-approve mode for non-interactive ci pipelines and enforce manual plan confirmation locally"
    },
    "questionEN": "A senior software engineer working interactively on the billing-api microservice enables the --dangerously-skip-permissions flag in their local terminal session to bypass interactive prompt checks and speed up repetitive feature iterations. During a complex refactoring task, Claude Code proposes a plan that includes deleting local fallback configuration files and overwriting shared mock fixtures. Because auto-approve mode is active, Claude Code immediately executes these destructive edits without displaying a plan confirmation prompt. What design intent or operational risk does this violate regarding Claude Code execution modes?",
    "question": "[d3-b07-3.4-001] Một kỹ sư phần mềm cao cấp làm việc tương tác trên dịch vụ microservice billing-api bật cờ --dangerously-skip-permissions trong phiên terminal cục bộ để bỏ qua các bước xác nhận tương tác và tăng tốc các vòng lặp tính năng. Trong một tác vụ tái cấu trúc phức tạp, Claude Code đề xuất một kế hoạch bao gồm việc xóa các file cấu hình dự phòng cục bộ và ghi đè các fixture mock dùng chung. Do chế độ tự động phê duyệt (auto-approve) đang hoạt động, Claude Code thực thi ngay lập tức các chỉnh sửa phá hủy này mà không hiển thị yêu cầu xác nhận kế hoạch. Ý định thiết kế hoặc rủi ro vận hành nào đã bị vi phạm liên quan đến các chế độ thực thi của Claude Code?",
    "optionsEN": [
      "A. Auto-approve mode is intended exclusively for non-interactive CI/CD pipelines, and applying it to interactive developer sessions bypasses essential human plan validation.",
      "B. Auto-approve mode restricts Claude Code to read-only operations, which prevented the tool from generating an explicit rollback script before executing.",
      "C. Auto-approve mode disables telemetry logging in local environments, preventing the audit trail from capturing file deletion events.",
      "D. Auto-approve mode automatically switches Claude Code into headless Plan Mode, which forces all file modifications into a temporary git branch without user intervention."
    ],
    "options": [
      "A. Chế độ tự động phê duyệt (auto-approve mode) được thiết kế dành riêng cho các đường ống CI/CD không tương tác, và việc áp dụng nó vào các phiên phát triển tương tác sẽ bỏ qua bước kiểm tra xác nhận kế hoạch thiết yếu của con người.",
      "B. Chế độ tự động phê duyệt giới hạn Claude Code ở các thao tác chỉ đọc (read-only), điều này ngăn công cụ tự động tạo kịch bản khôi phục (rollback script) trước khi thực thi.",
      "C. Chế độ tự động phê duyệt tắt nhật ký ghi nhận từ xa (telemetry logging) ở môi trường cục bộ, làm mất dấu vết kiểm toán ghi nhận sự kiện xóa file.",
      "D. Chế độ tự động phê duyệt tự động chuyển Claude Code sang Chế độ Kế hoạch không giao diện (headless Plan Mode), buộc tất cả sửa đổi file phải đưa vào một nhánh git tạm thời mà không cần can thiệp."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Auto-approve mode skips all interactive prompts and plan confirmation steps. It is specifically designed for unattended automated environments like CI/CD, so using it in interactive local sessions removes the developer review safeguard.",
      "Option B is incorrect because auto-approve mode does not restrict execution to read-only operations; it grants immediate execution permissions without human approval.",
      "Option C is incorrect because auto-approve mode governs prompt confirmation behavior, not telemetry or audit logging capabilities.",
      "Option D is incorrect because auto-approve mode does not switch execution into Plan Mode or create temporary git branches; it executes commands and edits directly without asking."
    ],
    "rationale": "Auto-approve mode (e.g., --dangerously-skip-permissions) completely disables human confirmation prompts and plan review checks. In an interactive developer workflow, this bypasses the safety net intended to prevent unauthorized or destructive operations. Therefore, auto-approve mode must only be used in non-interactive CI/CD or batch environments where inputs and steps are strictly pre-defined.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Phương án A (Đúng): Chế độ tự động phê duyệt (auto-approve mode / --dangerously-skip-permissions) loại bỏ hoàn toàn các bước xác nhận từ con người. Ý định thiết kế của chế độ này là dành cho các môi trường tự động hóa không có sự tương tác trực tiếp của con người (như CI/CD pipeline). Khi sử dụng trong luồng làm việc tương tác của nhà phát triển, nó loại bỏ lớp bảo vệ đánh giá kế hoạch, dẫn đến việc thực thi ngay lập tức các thay đổi không mong muốn hoặc có hại.\n- Phương án B (Sai): Chế độ tự động phê duyệt không giới hạn ở thao tác chỉ đọc mà cấp quyền thực thi ngay các thay đổi.\n- Phương án C (Sai): Chế độ này quản lý cơ chế xác nhận lệnh và kế hoạch, không liên quan đến cơ chế telemetry hay audit log.\n- Phương án D (Sai): Auto-approve không chuyển sang Plan Mode hay tự động tạo nhánh git tạm thời; nó thực thi trực tiếp các câu lệnh và sửa đổi file trên thư mục làm việc hiện tại.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  },
  {
    "id": "d3-b07-3.4-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-002",
    "scenarioSignature": {
      "testedPrinciple": "mandatory plan review before executing high-risk schema operations",
      "failureMode": "irreversible production data loss during database schema migration",
      "rootCause": "bypassing interactive plan inspection before authorizing file execution",
      "requiredFix": "thoroughly review proposed plan diffs and execution steps prior to approval"
    },
    "questionEN": "A developer uses Claude Code to refactor the relational database layer of orders-db, requesting a migration script to rename legacy customer attributes. Claude Code activates Plan Mode and generates a multi-step plan containing a destructive DROP COLUMN legacy_user_id statement instead of a non-breaking deprecation pattern. The developer approves the plan without reviewing the detailed execution proposal diffs. Upon execution, the migration runs against the staging database, resulting in unrecoverable column data loss. Which workflow failure directly caused this outcome?",
    "question": "[d3-b07-3.4-002] Một nhà phát triển sử dụng Claude Code để tái cấu trúc lớp cơ sở dữ liệu quan hệ của orders-db, yêu cầu tạo script chuyển đổi (migration) để đổi tên các thuộc tính khách hàng cũ. Claude Code kích hoạt Chế độ Kế hoạch (Plan Mode) và tạo ra một kế hoạch nhiều bước có chứa câu lệnh phá hủy DROP COLUMN legacy_user_id thay vì mô hình đánh dấu lỗi thời (deprecation) không làm hỏng dữ liệu. Nhà phát triển phê duyệt kế hoạch mà không đọc kỹ các diff đề xuất thực thi chi tiết. Sau khi thực thi, script chạy trên cơ sở dữ liệu staging dẫn đến mất dữ liệu cột không thể khôi phục. Lỗi quy trình làm việc nào đã trực tiếp gây ra kết quả này?",
    "optionsEN": [
      "A. Claude Code failed to convert the SQL migration plan into a dry-run transaction, which automatically executes destructive DDL commands upon prompt generation.",
      "B. The developer bypassed inspecting the proposed Plan Mode execution diffs and command list prior to explicit authorization, failing to catch the destructive schema modification.",
      "C. Plan Mode automatically commits file changes to the git index before displaying the confirmation dialog, preventing table recovery.",
      "D. The developer executed Claude Code in read-only mode, which suppressed schema validation warnings during SQL generation."
    ],
    "options": [
      "A. Claude Code đã không chuyển đổi kế hoạch migration SQL thành một giao dịch chạy thử (dry-run transaction), điều này tự động thực thi các lệnh DDL phá hủy ngay khi tạo prompt.",
      "B. Nhà phát triển đã bỏ qua việc kiểm tra danh sách lệnh và diff thực thi được đề xuất trong Plan Mode trước khi xác nhận cấp phép, dẫn đến việc không phát hiện ra sửa đổi schema mang tính phá hủy.",
      "C. Plan Mode tự động commit các thay đổi file vào git index trước khi hiển thị hộp thoại xác nhận, ngăn cản việc khôi phục bảng.",
      "D. Nhà phát triển đã thực thi Claude Code ở chế độ chỉ đọc (read-only), điều này đã làm ẩn các cảnh báo xác thực schema trong quá trình tạo SQL."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because Plan Mode only proposes changes and does not execute any SQL commands or file edits until the user explicitly reviews and approves the plan.",
      "Option B (Correct): Plan Mode is specifically designed so developers can thoroughly inspect proposed edits, diffs, and terminal commands before execution. By approving the plan without reviewing the proposal, the developer missed the destructive DROP COLUMN step.",
      "Option C is incorrect because Plan Mode does not write files or execute git commits prior to approval; it only drafts proposals in memory.",
      "Option D is incorrect because executing in read-only mode would prevent file modifications altogether rather than executing destructive migrations."
    ],
    "rationale": "The core safety guarantee of Plan Mode is that proposed file modifications and shell commands are displayed as a diff or list for human review before execution. Bypassing the review step and blindly confirming the plan directly negates Plan Mode's safeguard, allowing dangerous or unintended operations (such as dropping database columns) to be executed irreversibly.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Phương án A (Sai): Plan Mode chỉ đề xuất các thay đổi dưới dạng bản thảo và không hề tự động thực thi bất kỳ câu lệnh SQL hay lệnh DDL nào cho đến khi người dùng chủ động xem xét và chấp thuận.\n- Phương án B (Đúng): Mục đích cốt lõi của Plan Mode là hiển thị toàn bộ diff và danh sách lệnh đề xuất để con người rà soát trước khi thực thi. Việc nhà phát triển duyệt kế hoạch một cách mù quáng mà không kiểm tra chi tiết diff đề xuất đã bỏ qua lớp bảo mật này, khiến câu lệnh phá hủy DROP COLUMN được thực thi.\n- Phương án C (Sai): Plan Mode không ghi file hay tạo git commit trước khi được phê duyệt; nó chỉ duy trì đề xuất trong bộ nhớ/giao diện tương tác.\n- Phương án D (Sai): Chế độ chỉ đọc ngăn cản việc ghi file hay thay đổi dữ liệu hoàn toàn, không phải là nguyên nhân gây thực thi migration phá hủy.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  }
]