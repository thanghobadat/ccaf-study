[
  {
    "id": "d3-b07-3.4-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-003",
    "scenarioSignature": {
      "testedPrinciple": "plan mode efficiency trade-offs for trivial edits",
      "failureMode": "increased latency and redundant token expenditure for single line fixes",
      "rootCause": "activating plan mode planning cycle for deterministic single file typo correction",
      "requiredFix": "execute simple single file edits directly without plan mode"
    },
    "questionEN": "A developer working on auth-service notices a typo in a log string within src/utils/logger.ts where 'succesful' is misspelled. The developer enters Plan Mode (/plan) to replace the string. Why is using Plan Mode considered an anti-pattern for this task?",
    "question": "[d3-b07-3.4-003] Một nhà phát triển làm việc trên auth-service phát hiện một lỗi chính tả trong chuỗi log tại src/utils/logger.ts (từ 'succesful' bị viết sai). Nhà phát triển bật Plan Mode (/plan) để thay đổi chuỗi này. Tại sao việc sử dụng Plan Mode lại bị coi là anti-pattern cho tác vụ này?",
    "optionsEN": [
      "A. Plan Mode makes live edits immediately without showing a diff preview, risking unintended overwrites on single-line changes.",
      "B. Plan Mode automatically bypasses local git hooks, preventing linting rules from running on the edited logger file.",
      "C. Plan Mode incurs unnecessary prompt processing latency and token overhead by generating an architectural execution plan for a deterministic, low-risk single-file edit.",
      "D. Plan Mode requires escalated root permissions (sudo) when modifying utility modules like logger.ts."
    ],
    "options": [
      "A. Plan Mode thực hiện chỉnh sửa trực tiếp ngay lập tức mà không hiển thị bản xem trước diff, dẫn đến rủi ro ghi đè ngoài ý muốn đối với các thay đổi đơn dòng.",
      "B. Plan Mode tự động bỏ qua các git hook cục bộ, ngăn cản các quy tắc linter chạy trên file logger đã sửa.",
      "C. Plan Mode gây ra độ trễ xử lý prompt và chi phí token không cần thiết khi tạo một kế hoạch thực thi kiến trúc cho một chỉnh sửa đơn file có độ rủi ro thấp và xác định.",
      "D. Plan Mode yêu cầu quyền root cao hơn (sudo) khi sửa đổi các module tiện ích như logger.ts."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because Plan Mode does not execute edits immediately; it explicitly generates a plan diff and awaits approval before modifying files.",
      "Option B is incorrect because Plan Mode does not skip local git hooks or linter validations during file modification.",
      "Option C is correct because running Plan Mode on a single-line typo fix introduces unnecessary latency, API cost, and planning token overhead for a straightforward, safe change.",
      "Option D is incorrect because Plan Mode runs within the user's shell session permissions and does not demand escalated administrative rights for utility files."
    ],
    "rationale": "Plan Mode is designed for multi-file refactors, ambiguous scopes, or high-risk operations. Using it for a simple, single-line typo fix introduces unnecessary token usage, latency, and extra user prompts without providing safety benefits.",
    "explanation": "Plan Mode (/plan hoặc Shift+Tab) được thiết kế cho các thao tác phức tạp, ảnh hưởng nhiều file hoặc có rủi ro cao. Đối với các chỉnh sửa đơn giản trên một file duy nhất như sửa lỗi chính tả, việc bật Plan Mode gây ra lãng phí token và tạo độ trễ không cần thiết do Claude phải phân tích toàn bộ ngữ cảnh để lập kế hoạch.\n\n- Option A sai vì Plan Mode không sửa file ngay mà tạo plan và chờ xác nhận.\n- Option B sai vì Plan Mode không can thiệp hay loại bỏ git hook.\n- Option C đúng vì việc lập kế hoạch cho tác vụ đơn giản chỉ làm tăng chi phí token và thời gian phản hồi mà không đem lại lợi ích quản trị rủi ro.\n- Option D sai vì Plan Mode chạy dưới quyền hạn người dùng hiện tại của phiên làm việc shell.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  },
  {
    "id": "d3-b07-3.4-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.4 plan-mode-execution / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.4-004",
    "scenarioSignature": {
      "testedPrinciple": "partial execution approval in plan mode interactive feedback loops",
      "failureMode": "inability to selectively execute sub-actions of an generated execution plan",
      "rootCause": "assuming plan mode forces an all-or-nothing binary execution approval",
      "requiredFix": "provide feedback to revise plan and approve specific steps before execution"
    },
    "questionEN": "During a refactoring session in payment-gateway, Claude Code enters Plan Mode and proposes 6 distinct actions, including updating database schemas, adding 2 new API endpoints, and deleting a legacy helper file src/legacy/utils.ts. The developer wants to execute the schema changes and API additions (4 actions) but keep src/legacy/utils.ts and skip the legacy cleanup (2 actions). How should the developer handle this plan review in Claude Code?",
    "question": "[d3-b07-3.4-004] Trong một phiên refactor ứng dụng payment-gateway, Claude Code bật Plan Mode và đề xuất 6 hành động riêng biệt, bao gồm cập nhật database schema, thêm 2 API endpoint mới và xóa file hỗ trợ cũ src/legacy/utils.ts. Nhà phát triển muốn thực thi các thay đổi schema và thêm API (4 hành động) nhưng muốn giữ lại src/legacy/utils.ts và bỏ qua việc xóa file cũ (2 hành động). Nhà phát triển nên xử lý bước xem xét plan này trong Claude Code như thế nào?",
    "optionsEN": [
      "A. Accept the full plan immediately, then manually use git checkout to restore src/legacy/utils.ts after Claude Code finishes executing all 6 steps.",
      "B. Exit Plan Mode using Ctrl+C, run --auto-approve mode, and specify file exclusion globs in CLAUDE.md before re-running.",
      "C. Reject the plan completely and manually execute all 4 desired actions in standard terminal shell commands.",
      "D. Provide text feedback instructing Claude Code to modify the plan by removing the 2 deletion steps, then approve the revised 4-step plan for execution."
    ],
    "options": [
      "A. Chấp nhận toàn bộ plan ngay lập tức, sau đó sử dụng git checkout thủ công để khôi phục src/legacy/utils.ts sau khi Claude Code hoàn thành việc thực thi cả 6 bước.",
      "B. Thoát Plan Mode bằng Ctrl+C, chạy chế độ --auto-approve và khai báo các glob loại trừ file trong CLAUDE.md trước khi chạy lại.",
      "C. Từ chối toàn bộ plan và tự thực hiện thủ công 4 hành động mong muốn bằng các lệnh terminal shell thông thường.",
      "D. Phản hồi bằng văn bản hướng dẫn Claude Code chỉnh sửa plan để loại bỏ 2 bước xóa file, sau đó phê duyệt plan đã được sửa đổi gồm 4 bước để thực thi."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because approving unwanted file deletions and relying on post-execution git checkout risks unrecoverable side effects or broken references during execution.",
      "Option B is incorrect because --auto-approve bypasses plan review entirely and cannot dynamically reject specific plan steps during an interactive review.",
      "Option C is incorrect because rejecting the entire plan abandons automated assistance instead of leveraging Plan Mode's interactive plan adjustment capability.",
      "Option D is correct because developers can provide direct prompt feedback during plan review to remove specific unapproved steps before authorizing final execution."
    ],
    "rationale": "Plan Mode supports interactive iteration before execution. When a developer agrees with a subset of proposed changes (e.g., 4 out of 6), they can provide conversational feedback to remove the unwanted steps, updating the plan before approving execution.",
    "explanation": "Plan Mode của Claude Code cho phép người dùng tương tác và điều chỉnh kế hoạch trước khi cho phép thực thi. Khi gặp một plan có 6 đề xuất nhưng chỉ muốn thực hiện 4 bước, người dùng có thể nhập phản hồi trực tiếp để yêu cầu Claude loại bỏ 2 bước không mong muốn. Claude Code sẽ cập nhật lại plan và người dùng duyệt plan mới trước khi bắt đầu thực thi.\n\n- Option A sai vì việc duyệt plan xóa file rồi khôi phục thủ công bằng git là rủi ro và không tận dụng tính năng của Plan Mode.\n- Option B sai vì --auto-approve sẽ bỏ qua bước duyệt plan và thực thi tất cả các bước tự động.\n- Option C sai vì việc bỏ toàn bộ plan gây lãng phí công sức phân tích của agent.\n- Option D đúng vì người dùng có thể phản hồi trực tiếp để tùy chỉnh và phê duyệt một phần (partial approval) đối với kế hoạch trước khi thực thi.",
    "sources": [
      {
        "label": "Lesson 3.4: Plan Mode",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-4-plan-mode-execution"
      }
    ]
  }
]