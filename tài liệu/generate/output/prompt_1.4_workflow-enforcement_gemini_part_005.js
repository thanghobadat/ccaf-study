[
  {
    "id": "d1-b03-1.4-009",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-009",
    "scenarioSignature": {
      "testedPrinciple": "Deterministic programmatic prerequisite enforcement for financial actions",
      "failureMode": "Direct execution of payment transaction without required risk assessment",
      "rootCause": "Relying on probabilistic prompt instructions for multi-step tool dependencies",
      "requiredFix": "Enforcing a signed verification token gate within the payment tool implementation"
    },
    "questionEN": "An automated payment processing agent, PayGuard-Agent, processes e-commerce checkout commands via the Stripe-Relay API. System prompt instructions require the agent to call calculate_fraud_score before calling execute_credit_card_charge. However, in 4.2% of high-volume transactions, LLM non-determinism causes PayGuard-Agent to execute POST /v2/charges directly without passing fraud_score verification, resulting in high chargeback losses. Which architectural change deterministically guarantees that credit cards are never charged without prior fraud scoring?",
    "question": "[d1-b03-1.4-009] Một agent xử lý thanh toán tự động, PayGuard-Agent, xử lý các lệnh thanh toán thương mại điện tử thông qua Stripe-Relay API. Hướng dẫn prompt hệ thống yêu cầu agent gọi calculate_fraud_score trước khi gọi execute_credit_card_charge. Tuy nhiên, trong 4.2% giao dịch lưu lượng cao, tính phi định hướng của LLM khiến PayGuard-Agent thực thi POST /v2/charges trực tiếp mà không qua xác minh fraud_score, dẫn đến tổn thất rủi ro bồi hoàn cao. Thay đổi kiến trúc nào đảm bảo một cách định hướng rằng thẻ tín dụng không bao giờ bị tính phí mà không có điểm số gian lận trước đó?",
    "optionsEN": [
      "A. Implement a programmatic prerequisite gate in the execute_credit_card_charge tool wrapper that inspects a cryptographically signed risk_evaluation_id returned by calculate_fraud_score before invoking POST /v2/charges.",
      "B. Add high-priority few-shot examples to the prompt system prompt illustrating step-by-step calls to calculate_fraud_score prior to POST /v2/charges.",
      "C. Deploy a secondary routing classifier model to inspect agent action outputs and warn the agent if execute_credit_card_charge is called in the same turn without calculate_fraud_score.",
      "D. Update the prompt to require PayGuard-Agent to output an inner monologue confirmation string [FRAUD_SCORE_VERIFIED: TRUE] before issuing tool calls."
    ],
    "options": [
      "A. Triển khai một cổng tiền điều kiện bằng mã chương trình trong wrapper của công cụ execute_credit_card_charge để kiểm tra risk_evaluation_id được ký mã hóa do calculate_fraud_score trả về trước khi gọi POST /v2/charges.",
      "B. Thêm các ví dụ few-shot có độ ưu tiên cao vào prompt hệ thống để minh họa từng bước việc gọi calculate_fraud_score trước POST /v2/charges.",
      "C. Triển khai một mô hình phân loại định tuyến phụ để kiểm tra đầu ra hành động của agent và cảnh báo agent nếu execute_credit_card_charge được gọi trong cùng lượt mà không có calculate_fraud_score.",
      "D. Cập nhật prompt yêu cầu PayGuard-Agent xuất chuỗi xác nhận suy luận nội bộ [FRAUD_SCORE_VERIFIED: TRUE] trước khi phát hành các cuộc gọi công cụ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Programmatically enforcing the prerequisite gate inside the tool execution layer guarantees zero unauthorized charges because the charge API cannot physically execute without a valid risk_evaluation_id.",
      "Option B is incorrect: Few-shot prompting reduces probabilistic skipping but does not eliminate non-determinism, leaving high-risk financial calls vulnerable to occasional prompt rule bypasses.",
      "Option C is incorrect: A secondary routing classifier inspects agent output probabilistically or asynchronously and does not hard-block the execution of the destructive financial tool call.",
      "Option D is incorrect: Requiring an LLM inner monologue tag relies on model adherence to prompt rules and remains subject to compliance failure during complex or high-volume generation."
    ],
    "rationale": "For high-risk financial operations, prompt instructions and few-shot examples remain probabilistic (yielding non-zero error rates). Deterministic execution enforcement requires a programmatic prerequisite gate embedded directly in the tool code that blocks execution unless a cryptographically signed prerequisite proof is present.",
    "explanation": "Lựa chọn A đúng vì với các giao dịch tài chính quan trọng, hướng dẫn trong prompt hoặc few-shot examples đều mang tính xác suất và không thể loại bỏ hoàn toàn lỗi bỏ qua bước. Việc triển khai cổng tiền điều kiện (prerequisite gate) bằng mã chương trình ở tầng thực thi tool để kiểm tra mã xác nhận risk_evaluation_id từ bước đánh giá gian lận sẽ ngăn chặn 100% việc gọi API thanh toán trực tiếp.\nLựa chọn B sai vì ví dụ few-shot chỉ giảm tỷ lệ bỏ qua nhưng không đảm bảo tính định hướng (deterministic).\nLựa chọn C sai vì mô hình phân loại phụ vẫn hoạt động dựa trên xác suất và không can thiệp trực tiếp để chặn mã API thanh toán.\nLựa chọn D sai vì yêu cầu chuỗi xác nhận nội bộ vẫn phụ thuộc vào việc LLM tuân thủ prompt, vốn có thể bị vi phạm khi xử lý lưu lượng cao.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  },
  {
    "id": "d1-b03-1.4-010",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-010",
    "scenarioSignature": {
      "testedPrinciple": "Programmatic precondition enforcement for destructive operations",
      "failureMode": "Deletion of storage objects without mandatory backup verification",
      "rootCause": "Relying on LLM prompt adherence to sequence prerequisite query tools before destructive tools",
      "requiredFix": "Embedding a server-side backup snapshot check inside the deletion tool execution wrapper"
    },
    "questionEN": "An enterprise document lifecycle agent, DocManager-Agent, is tasked with pruning expired files using the S3-Vault Storage API. System instructions require the agent to query verify_backup_status and confirm backup_status == \"VERIFIED\" before executing DELETE /v1/documents/{doc_id}. During a batch retention cleanup, DocManager-Agent skipped the backup check for 12 critical files and executed DELETE /v1/documents/{doc_id} directly, causing unrecoverable data loss. Which mechanism ensures that document deletion cannot occur unless backup verification has completed successfully?",
    "question": "[d1-b03-1.4-010] Một agent quản lý vòng đời tài liệu doanh nghiệp, DocManager-Agent, được giao nhiệm vụ dọn dẹp các tệp hết hạn bằng API S3-Vault Storage. Hướng dẫn hệ thống yêu cầu agent truy vấn verify_backup_status và xác nhận backup_status == \"VERIFIED\" trước khi thực thi DELETE /v1/documents/{doc_id}. Trong đợt dọn dẹp lưu trữ hàng loạt, DocManager-Agent đã bỏ qua bước kiểm tra sao lưu cho 12 tệp quan trọng và thực thi DELETE /v1/documents/{doc_id} trực tiếp, gây ra mất dữ liệu không thể phục hồi. Cơ chế nào đảm bảo rằng việc xóa tài liệu không thể xảy ra trừ khi quá trình xác minh sao lưu đã hoàn tất thành công?",
    "optionsEN": [
      "A. Configure a PreToolUse prompt filter that re-injects a warning message to the LLM when DELETE /v1/documents/{doc_id} is selected.",
      "B. Implement a deterministic prerequisite gate inside the delete_document tool handler that queries the backup registry for a valid snapshot_id and rejects the execution request if unverified.",
      "C. Adjust the model temperature parameter to 0.0 and add strict system prompt rules forbidding document deletion without explicit backup confirmation logs.",
      "D. Require DocManager-Agent to perform document deletion in two sequential LLM turns, requesting confirmation from itself in turn two."
    ],
    "options": [
      "A. Cấu hình bộ lọc prompt PreToolUse để chèn lại tin nhắn cảnh báo tới LLM khi DELETE /v1/documents/{doc_id} được chọn.",
      "B. Triển khai một cổng tiền điều kiện định hướng bên trong trình xử lý công cụ delete_document để truy vấn sổ đăng ký sao lưu tìm snapshot_id hợp lệ và từ chối yêu cầu thực thi nếu chưa được xác minh.",
      "C. Điều chỉnh tham số temperature của mô hình xuống 0.0 và thêm các quy tắc prompt hệ thống nghiêm ngặt cấm xóa tài liệu nếu không có nhật ký xác nhận sao lưu rõ ràng.",
      "D. Yêu cầu DocManager-Agent thực hiện xóa tài liệu trong hai lượt LLM nối tiếp, tự yêu cầu xác nhận từ chính nó ở lượt thứ hai."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: PreToolUse prompt re-injection still relies on the LLM's probabilistic decision to alter its tool execution payload and can still be bypassed during automated tool runs.",
      "Option B is correct: Placing a programmatic prerequisite gate inside the delete_document tool code guarantees that the underlying DELETE /v1/documents/{doc_id} API call fails deterministically unless a valid snapshot exists in the backup registry.",
      "Option C is incorrect: Setting temperature to 0.0 reduces output variance but does not guarantee strict workflow ordering when complex multi-step tool call sequences are generated.",
      "Option D is incorrect: Self-confirmation across multiple LLM turns maintains probabilistic reasoning without hard programmatic enforcement at the API execution layer."
    ],
    "rationale": "Destructive operations like permanent data deletion must be protected by programmatic prerequisite gates in code rather than probabilistic LLM prompt instructions. Enforcing a backup registry verification check directly inside the deletion tool handler prevents unbacked-up deletion regardless of LLM behavior.",
    "explanation": "Lựa chọn B đúng vì các thao tác phá hủy (xóa dữ liệu) bắt buộc phải sử dụng cổng tiền điều kiện định hướng (deterministic prerequisite gate) được cài đặt trực tiếp trong trình xử lý của công cụ backend. Việc kiểm tra snapshot_id trong sổ đăng ký sao lưu trước khi cho phép gọi API xóa sẽ ngăn chặn triệt để nguy cơ mất dữ liệu.\nLựa chọn A sai vì việc chèn lại cảnh báo bằng prompt PreToolUse vẫn mang tính xác suất và LLM vẫn có thể bỏ qua.\nLựa chọn C sai vì giảm temperature xuống 0.0 chỉ làm giảm biến thiên đầu ra chứ không đảm bảo thứ tự gọi tool luôn chính xác.\nLựa chọn D sai vì việc tự xác nhận qua nhiều lượt LLM vẫn phụ thuộc vào lập luận xác suất của mô hình chứ không có cơ chế chặn cứng ở tầng thực thi API.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  }
]