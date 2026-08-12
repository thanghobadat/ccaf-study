[
  {
    "id": "d3-b07-3.4-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-009",
    "scenarioSignature": {
      "testedPrinciple": "plan mode session timeout lifecycle",
      "failureMode": "session expiration discarding pending plan",
      "rootCause": "developer inactivity during interactive review",
      "requiredFix": "regenerate plan and provide prompt approval"
    },
    "questionEN": "A Lead Engineer at a fintech company initiates an interactive session in Claude Code using /plan to perform a database migration script refactor on services/payment-vault. Claude Code analyzes the codebase and generates an interactive execution plan detailing edits across 14 files and 3 CLI commands. During the plan review step, the engineer steps away for a meeting, leaving the interactive terminal idle for 45 minutes, causing an interactive session timeout. What happens to the generated plan and repository state upon session expiration?",
    "question": "[d3-b07-3.4-009] Một Lead Engineer tại công ty fintech khởi tạo phiên tương tác trong Claude Code bằng /plan để tái cấu trúc script migration cơ sở dữ liệu trên services/payment-vault. Claude Code phân tích codebase và tạo ra kế hoạch thực thi tương tác mô tả chi tiết các chỉnh sửa trên 14 file và 3 lệnh CLI. Trong bước xem xét kế hoạch, kỹ sư rời đi họp và để terminal tương tác treo trong 45 phút, dẫn đến hết thời gian chờ phiên (session timeout). Điều gì xảy ra với kế hoạch đã tạo và trạng thái kho chứa khi phiên hết hạn?",
    "optionsEN": [
      "A. The interactive session terminates, discarding the unapproved plan in memory without making any changes to the codebase, requiring the plan to be regenerated.",
      "B. Claude Code automatically executes all proposed modifications in auto-approve mode upon reaching the session timeout threshold.",
      "C. The proposed plan is automatically saved to .claude/plans/pending.json and automatically executed as soon as the terminal re-establishes a connection.",
      "D. Claude Code partially commits the file modifications that had no dependencies while discarding the remaining proposed file diffs."
    ],
    "options": [
      "A. Phiên tương tác kết thúc, hủy bỏ kế hoạch chưa được phê duyệt trong bộ nhớ mà không thực hiện bất kỳ thay đổi nào đối với codebase, yêu cầu phải tạo lại kế hoạch.",
      "B. Claude Code tự động thực thi tất cả các thay đổi được đề xuất ở chế độ tự động phê duyệt (auto-approve) khi đạt ngưỡng hết giờ phiên.",
      "C. Kế hoạch đề xuất được tự động lưu vào .claude/plans/pending.json và tự động thực thi ngay khi terminal kết nối lại.",
      "D. Claude Code cam kết (commit) một phần các thay đổi file không có phụ thuộc trong khi hủy bỏ các diff file đề xuất còn lại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because when an interactive Plan Mode session times out waiting for developer review, the pending plan exists only in transient memory and is discarded without modifying any codebase files, necessitating regeneration.",
      "Option B is incorrect because Claude Code never automatically executes pending plans upon timeout; unapproved changes are discarded to prevent unintended repository mutations.",
      "Option C is incorrect because pending interactive plans are not persisted to .claude/plans/pending.json for auto-execution upon reconnection.",
      "Option D is incorrect because Plan Mode is atomic in review state—it does not execute partial modifications when a session expires."
    ],
    "rationale": "Plan Mode is an interactive operational state where generated plans remain unapplied until explicit user approval. When an interactive session times out due to prolonged inactivity, the ephemeral plan state is discarded without executing any file modifications or shell commands, requiring the user to re-evaluate or re-generate the prompt.",
    "explanation": "Đáp án đúng là A.\n- A đúng: Trong Claude Code, kế hoạch được tạo ở chế độ Plan Mode chỉ tồn tại trong bộ nhớ phiên tương tác chừng nào người dùng chưa bấm phê duyệt. Khi phiên tương tác bị timeout do người dùng không phản hồi trong thời gian dài, phiên làm việc sẽ kết thúc và kế hoạch chưa phê duyệt bị hủy hoàn toàn, kho chứa (repository) giữ nguyên trạng thái ban đầu và người dùng phải chạy lại câu lệnh để tạo lại kế hoạch.\n- B sai: Claude Code không bao giờ tự động thực thi kế hoạch chưa phê duyệt khi hết giờ nhằm đảm bảo tính an toàn và tránh gây ảnh hưởng ngoài ý muốn cho dự án.\n- C sai: Kế hoạch tương tác tạm thời không được tự động lưu vào file JSON đệm để tự động chạy lại khi kết nối lại.\n- D sai: Plan Mode không thực hiện ghi một phần các thay đổi dở dang khi phiên bị hủy bỏ hoặc timeout.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  },
  {
    "id": "d3-b07-3.4-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-010",
    "scenarioSignature": {
      "testedPrinciple": "plan mode draft versus execution output distinction",
      "failureMode": "discrepancy between static plan and live execution output",
      "rootCause": "plan mode generates static preview while execution runs dynamic tools",
      "requiredFix": "distinguish static proposed plan from dynamic live tool execution"
    },
    "questionEN": "A DevOps engineer uses Claude Code with /plan mode to refactor a deployment script deploy/k8s-manifest.yaml. The Plan Mode draft outlines proposed changes to update image tags and environment variable mappings across 5 manifest blocks. After reviewing and approving the plan, the engineer observes the execution logs. Why does the final execution output contain specific runtime line modifications and tool invocation logs that were not explicitly itemized in the initial Plan Mode draft?",
    "question": "[d3-b07-3.4-010] Một kỹ sư DevOps sử dụng Claude Code với chế độ /plan để tái cấu trúc script triển khai deploy/k8s-manifest.yaml. Bản nháp Plan Mode phác thảo các thay đổi đề xuất để cập nhật tag image và ánh xạ biến môi trường trên 5 khối manifest. Sau khi xem xét và phê duyệt kế hoạch, kỹ sư quan sát nhật ký thực thi (execution logs). Tại sao kết quả thực thi thực tế lại chứa các chỉnh sửa dòng chi tiết và nhật ký gọi tool (tool invocation logs) không xuất hiện từng mục một trong bản nháp Plan Mode ban đầu?",
    "optionsEN": [
      "A. Plan Mode executes a dry-run API call that writes temporary hidden git branches, while actual execution merges those branches into main.",
      "B. Plan Mode provides a high-level proposed draft of intent without making file modifications, whereas actual execution dynamically invokes tools, applies live changes, and streams real-time execution feedback.",
      "C. Plan Mode generates an immutable binary diff that forces the execution phase to strictly output only pre-compiled patch files without streaming stdout.",
      "D. Plan Mode executes all code in an isolated sandbox to record actual output, while execution mode merely replays the pre-recorded output logs."
    ],
    "options": [
      "A. Plan Mode thực thi lệnh gọi API chạy thử (dry-run) tạo các nhánh git ẩn tạm thời, trong khi giai đoạn thực thi thực tế hợp nhất (merge) các nhánh đó vào main.",
      "B. Plan Mode cung cấp một bản nháp phác thảo ý định cấp cao mà không thực hiện thay đổi file, trong khi giai đoạn thực thi gọi công cụ động, áp dụng thay đổi thực tế và phát luồng phản hồi thời gian thực.",
      "C. Plan Mode tạo ra một file diff nhị phân bất biến buộc giai đoạn thực thi chỉ xuất các file patch đã biên dịch trước mà không phát stdout.",
      "D. Plan Mode thực thi tất cả mã trong một sandbox cô lập để ghi lại kết quả thực tế, trong khi chế độ thực thi chỉ phát lại nhật ký output đã ghi trước."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because Plan Mode does not create temporary hidden git branches or execute dry-run commits behind the scenes.",
      "Option B is correct because Plan Mode generates a static proposed draft without making state changes or invoking write tools, while the execution phase dynamically executes tools against the live filesystem, generating detailed real-time execution logs and dynamic output.",
      "Option C is incorrect because Plan Mode drafts are human-readable plan outlines, not compiled binary diffs that constrain stdout output.",
      "Option D is incorrect because Plan Mode does not run code in a sandbox; it only reads context to outline planned actions."
    ],
    "rationale": "Plan Mode serves as an interactive blueprinting phase that outputs a static proposed draft of modifications without executing write tools or modifying repository state. Once approved, the execution phase actively invokes tools against the live file system, producing dynamic execution output, step-by-step tool invocation logs, and adaptive changes based on real-time feedback.",
    "explanation": "Đáp án đúng là B.\n- B đúng: Plan Mode chỉ phác thảo bản kế hoạch đề xuất (draft/proposal) ở dạng văn bản mô tả ý định mà không thực sự gọi các công cụ ghi file hay sửa đổi trạng thái hệ thống. Khi người dùng phê duyệt kế hoạch, Claude Code bước vào giai đoạn thực thi (execution phase), lúc này các tool mới được gọi thực tế trên kho chứa, tạo ra nhật ký gọi công cụ (tool invocation logs), phản hồi thời gian thực và chi tiết kết quả thực thi động.\n- A sai: Plan Mode không tạo các nhánh git ẩn hay thực hiện các thao tác dry-run commit ngầm.\n- C sai: Bản nháp của Plan Mode là văn bản đọc được cho con người chứ không phải diff nhị phân cố định giới hạn output.\n- D sai: Plan Mode không chạy mã trong môi trường sandbox cô lập để ghi lại output trước, mà chỉ phân tích ngữ cảnh để đề xuất kế hoạch.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  }
]