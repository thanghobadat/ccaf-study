[
  {
    "id": "d1-b03-1.4-003",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-003",
    "scenarioSignature": {
      "testedPrinciple": "Programmatic prerequisite gate for legal compliance tool execution",
      "failureMode": "Bypass of identity verification prior to contract signature",
      "rootCause": "Reliance on prompt instructions for mandatory multi-step legal workflow",
      "requiredFix": "Enforce deterministic prerequisite state check in tool execution layer"
    },
    "questionEN": "An automated enterprise contract manager, DocuSign-Agent, executes binding agreements via the /v1/contracts/execute_signature endpoint. System guidelines mandate that verify_signatory_identity must run and validate signatory credentials before signing. Production metrics indicate that in 6.4% of high-urgency user requests, the agent invokes /v1/contracts/execute_signature directly without triggering identity verification. How should the engineering team modify the system architecture to guarantee identity verification is never bypassed?",
    "question": "[d1-b03-1.4-003] Một hệ thống quản lý hợp đồng tự động, DocuSign-Agent, thực thi các thỏa thuận pháp lý thông qua API endpoint /v1/contracts/execute_signature. Quy định hệ thống bắt buộc hàm verify_signatory_identity phải chạy và xác thực thông tin người ký trước khi ký hợp đồng. Chỉ số sản xuất cho thấy trong 6.4% yêu cầu khẩn cấp từ người dùng, agent đã gọi trực tiếp /v1/contracts/execute_signature mà không qua bước xác thực danh tính. Đội ngũ kỹ thuật nên sửa đổi kiến trúc hệ thống như thế nào để đảm bảo bước xác thực danh tính không bao giờ bị bỏ qua?",
    "optionsEN": [
      "A. Add few-shot prompt examples demonstrating high-urgency user requests where the agent explicitly invokes verify_signatory_identity prior to signing.",
      "B. Deploy a fine-tuned binary routing classifier to detect urgent user prompts and redirect them to a specialized compliance prompt template.",
      "C. Implement a programmatic prerequisite gate in the tool execution middleware that rejects calls to execute_signature unless a verified identity_token_hash is active in the session state.",
      "D. Configure an asymmetric retry mechanism on execute_signature that prompts the LLM to inspect preceding tool call history whenever a signature succeeds."
    ],
    "options": [
      "A. Bổ sung các ví dụ few-shot vào prompt minh họa các yêu cầu khẩn cấp mà trong đó agent luôn gọi verify_signatory_identity trước khi ký.",
      "B. Triển khai một routing classifier nhị phân đã fine-tune để phát hiện các prompt khẩn cấp và chuyển hướng chúng sang một template prompt tuân thủ chuyên biệt.",
      "C. Triển khai một cổng điều kiện tiên quyết bằng mã lập trình (programmatic prerequisite gate) ở tầng middleware thực thi tool, từ chối lệnh gọi execute_signature trừ khi một identity_token_hash đã xác thực tồn tại trong session state.",
      "D. Cấu hình cơ chế retry bất đối xứng cho execute_signature yêu cầu LLM kiểm tra lại lịch sử gọi tool ngay sau khi ký hợp đồng thành công."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Few-shot examples modify LLM generation probabilities but remain probabilistic, leaving the system vulnerable to compliance bypasses under edge-case user prompts.",
      "Option B is incorrect: Fine-tuning a routing classifier changes prompt routing logic but fails to establish a deterministic execution barrier between identity verification and contract execution.",
      "Option C is correct: A programmatic prerequisite gate enforces a non-bypassable code check at the tool execution layer, ensuring execute_signature cannot run without a valid identity_token_hash from verify_signatory_identity.",
      "Option D is incorrect: Post-execution verification triggers after the binding contract signature has already been applied to the API endpoint, failing to prevent the unauthorized legal action."
    ],
    "rationale": "Legal and compliance workflows mandate 100% enforcement determinism. Prompt-based instructions and classifiers are inherently probabilistic. Placing a programmatic prerequisite gate in the tool execution layer guarantees that destructive or legally binding API actions cannot execute without verified prerequisite state variables.",
    "explanation": "Trong các quy trình nghiệp vụ tuân thủ pháp lý và tài chính, việc dựa vào prompt instructions hoặc few-shot examples (Lựa chọn A) hay routing classifier (Lựa chọn B) chỉ mang tính xác suất (probabilistic) và vẫn chịu rủi ro bỏ qua quy trình khi gặp prompt phức tạp. Lựa chọn D thực hiện kiểm tra sau khi hợp đồng đã ký xong, không ngăn chặn được vi phạm. Lựa chọn C đúng vì triển khai programmatic prerequisite gate ở tầng middleware thực thi tool sẽ chặn đứng lệnh gọi API ký hợp đồng nếu chưa có token xác thực danh tính hợp lệ trong session state, giảm tỷ lệ vi phạm về 0%.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  },
  {
    "id": "d1-b03-1.4-004",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-004",
    "scenarioSignature": {
      "testedPrinciple": "Human-in-the-loop approval workflow for sensitive system mutation",
      "failureMode": "Salary modification executed without prior manager approval gate",
      "rootCause": "Direct execution of mutation tool instead of staged proposal generation",
      "requiredFix": "Require signed authorization ticket from approval request prior to payload execution"
    },
    "questionEN": "An automated HR operations assistant, PeopleOps-Agent, processes employee compensation changes using the /v3/payroll/update_compensation tool. Organizational policy requires that all salary adjustments undergo human manager approval before payroll execution. During quarterly review cycles, logs reveal that the agent directly calls /v3/payroll/update_compensation upon receiving user input, bypassing the approval workflow. Which architectural revision enforces the required Human-in-the-Loop approval gate?",
    "question": "[d1-b03-1.4-004] Một trợ lý vận hành nhân sự tự động, PeopleOps-Agent, xử lý thay đổi lương nhân viên thông qua tool /v3/payroll/update_compensation. Quy định doanh nghiệp yêu cầu mọi điều chỉnh lương phải được quản lý con người phê duyệt trước khi cập nhật vào hệ thống payroll. Trong kỳ đánh giá quý, nhật ký hệ thống cho thấy agent đã trực tiếp gọi /v3/payroll/update_compensation ngay khi nhận đầu vào từ người dùng, bỏ qua quy trình phê duyệt. Thay đổi kiến trúc nào sẽ bắt buộc thực thi cổng phê duyệt Human-in-the-Loop?",
    "optionsEN": [
      "A. Insert a PreToolUse hook that uses an LLM evaluator to scan the user prompt history and score manager consensus before permitting payroll updates.",
      "B. Shift to an asynchronous review model where /v3/payroll/update_compensation executes immediately and posts a notification event for post-hoc manager review.",
      "C. Increase the context window size to retain historical manager conversation turns across multi-batch compensation adjustment runs.",
      "D. Restructure the tool design into a proposal-execution pattern where the agent invokes create_approval_request to produce a pending ticket, requiring a signed approval_ticket_id before the tool handler allows /v3/payroll/update_compensation."
    ],
    "options": [
      "A. Thêm một PreToolUse hook sử dụng LLM evaluator để quét lịch sử prompt và chấm điểm sự đồng thuận của quản lý trước khi cho phép cập nhật lương.",
      "B. Chuyển sang mô hình rà soát bất đồng bộ, trong đó /v3/payroll/update_compensation được thực thi ngay lập tức và gửi sự kiện thông báo để quản lý rà soát sau.",
      "C. Tăng kích thước context window để giữ lại lịch sử hội thoại của quản lý qua các đợt điều chỉnh lương hàng loạt.",
      "D. Cấu trúc lại thiết kế tool theo mô hình đề xuất - thực thi (proposal-execution pattern), trong đó agent gọi create_approval_request để tạo vé chờ duyệt, và handler chỉ cho phép gọi /v3/payroll/update_compensation khi có approval_ticket_id đã được ký duyệt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Utilizing an LLM evaluator inside a PreToolUse hook relies on non-deterministic context analysis, which can still hallucinate manager consent.",
      "Option B is incorrect: Post-hoc review executes payload changes before human authorization, violating the core compliance rule of approval prior to mutation.",
      "Option C is incorrect: Expanding context retention does not enforce state dependencies or prevent the agent from selecting mutation tools autonomously.",
      "Option D is correct: The proposal-execution pattern forces the agent to issue a pending approval request (create_approval_request), requiring an explicit signed approval_ticket_id from a human manager before the payroll modification tool can be physically executed."
    ],
    "rationale": "High-risk mutations like financial salary updates must follow an 'agent proposes -> human approves -> system executes' lifecycle. Requiring a signed approval ticket at the tool execution handler level guarantees that human authorization is a physical prerequisite for state modification.",
    "explanation": "Trong thiết kế workflow an toàn cho các thao tác nhạy cảm (như thay đổi lương nhân viên), kiến trúc bắt buộc phải tuân theo luồng: Agent tạo đề xuất (proposal) -> Con người phê duyệt (approval) -> System/Agent thực thi (execution). Lựa chọn A dùng LLM đánh giá vẫn mang tính xác suất. Lựa chọn B vi phạm quy tắc vì cập nhật trước rồi duyệt sau. Lựa chọn C chỉ tăng bộ nhớ context chứ không chặn được lệnh gọi tool. Lựa chọn D đúng vì chia tách quy trình thành 2 bước: agent chỉ tạo create_approval_request, và tool update_compensation đòi hỏi approval_ticket_id hợp lệ được ký bởi người quản lý mới cho phép chạy.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  }
]