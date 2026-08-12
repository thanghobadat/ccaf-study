[
  {
    "id": "d1-b03-1.5-001",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-001",
    "scenarioSignature": {
      "testedPrinciple": "PreToolUse execution interception vs PostToolUse execution observation",
      "failureMode": "Unauthorized data export occurs before lifecycle check runs",
      "rootCause": "Configuring access control validation inside PostToolUse lifecycle hook instead of PreToolUse",
      "requiredFix": "Migrate data access policy enforcement to PreToolUse hook to block tool execution before API call"
    },
    "questionEN": "An European healthcare customer portal, EU-DataVault-v2, utilizes an export_user_data(user_id, region) tool to extract user profiles. To comply with GDPR, the engineering team attached a privacy compliance check inside the SDK's PostToolUse hook that returns { status: \"BLOCKED\", reason: \"GDPR Violation\" } when consent is missing. However, system audit logs show external HTTP requests were dispatched and storage files were generated before the hook executed. Which architectural change correctly prevents non-compliant execution before any external API payload is dispatched?",
    "question": "[d1-b03-1.5-001] Cổng thông tin khách hàng y tế Châu Âu EU-DataVault-v2 sử dụng công cụ export_user_data(user_id, region) để trích xuất hồ sơ người dùng. Để tuân thủ GDPR, nhóm kỹ thuật đã gắn một bộ lọc kiểm tra quyền riêng tư trong hook PostToolUse của SDK và trả về { status: \"BLOCKED\", reason: \"GDPR Violation\" } khi phát hiện thiếu sự đồng ý. Tuy nhiên, nhật ký hệ thống cho biết các yêu cầu HTTP ra bên ngoài vẫn được phát đi và tệp dữ liệu đã được tạo trên bộ nhớ trước khi hook chạy. Thay đổi kiến trúc nào ngăn chặn chính xác việc thực thi không tuân thủ trước khi bất kỳ payload API bên ngoài nào được phát đi?",
    "optionsEN": [
      "A. Implement the consent check inside a PreToolUse hook that intercepts tool execution and returns a blocking error signal prior to invoking export_user_data.",
      "B. Maintain the check in the PostToolUse hook but throw an unhandled exception to force the framework to rollback completed side effects.",
      "C. Add a system prompt instruction requiring the agent to query a check_consent tool before calling export_user_data.",
      "D. Configure a response normalization filter in PostToolUse that deletes generated files from storage after execution completes."
    ],
    "options": [
      "A. Triển khai kiểm tra sự đồng ý bên trong hook PreToolUse để chặn thực thi công cụ và trả về tín hiệu lỗi ngăn gọi export_user_data.",
      "B. Giữ lại logic kiểm tra trong hook PostToolUse nhưng ném ra unhandled exception để buộc framework hoàn tác các tác dụng phụ đã hoàn thành.",
      "C. Thêm hướng dẫn system prompt yêu cầu agent gọi công cụ check_consent trước khi thực thi export_user_data.",
      "D. Cấu hình bộ lọc chuẩn hóa phản hồi trong PostToolUse để xóa các tệp đã tạo khỏi bộ nhớ sau khi quá trình thực thi hoàn tất."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): PreToolUse hooks run prior to tool execution, allowing the hook to return a blocking error signal that halts export_user_data and prevents any outbound HTTP requests or side effects.",
      "Option B: PostToolUse hooks run strictly after the underlying tool code has executed, meaning HTTP payloads and storage writes have already occurred and cannot be rolled back by throwing an exception.",
      "Option C: System prompt instructions are non-deterministic lifecycle controls and cannot guarantee that the agent will execute check_consent in every scenario.",
      "Option D: Deleting generated files post-execution in PostToolUse fails to prevent the initial unauthorized data access and outbound HTTP transmission from taking place."
    ],
    "rationale": "PostToolUse hooks run strictly after tool execution completes, meaning external API calls and side effects cannot be prevented at that lifecycle stage. Enforcing GDPR blocking policies requires a PreToolUse hook, which intercepts the tool call prior to execution and returns a blocking response to stop parameter invocation.",
    "explanation": "Trong kiến trúc Agent SDK, hook PostToolUse chỉ chạy SAU KHI công cụ đã thực thi xong. Do đó, nó không thể ngăn chặn các tác dụng phụ (như phát yêu cầu HTTP ra bên ngoài hoặc ghi tệp dữ liệu) đã xảy ra. Để ngăn chặn thực thi không tuân thủ quy định (GDPR), kiểm tra quyền riêng tư phải được chuyển sang hook PreToolUse. Hook PreToolUse can thiệp TRƯỚC KHI công cụ được gọi và có thể trả về phản hồi chặn (blocking signal) để hủy lệnh gọi công cụ.\n\n- Option A đúng vì PreToolUse can thiệp trước thực thi và ngăn chặn hoàn toàn tác dụng phụ.\n- Option B sai vì PostToolUse chạy sau khi công cụ đã thực thi, ném exception không thể hoàn tác các yêu cầu HTTP đã gửi.\n- Option C sai vì hướng dẫn trong prompt mang tính xác suất (probabilistic), không thể thay thế cơ chế chặn xác định (deterministic) ở mức SDK.\n- Option D sai vì việc xóa tệp sau khi đã tạo không ngăn được hành vi truy xuất dữ liệu trái phép ban đầu.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  },
  {
    "id": "d1-b03-1.5-002",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-002",
    "scenarioSignature": {
      "testedPrinciple": "PreToolUse parameter mutation for sensitive data sanitization",
      "failureMode": "Unmasked credit card numbers exposed in outbound API payload traces",
      "rootCause": "Relying on probabilistic prompt instructions instead of deterministic SDK parameter sanitization",
      "requiredFix": "Register PreToolUse hook to sanitize tool input arguments before API execution"
    },
    "questionEN": "A financial processing assistant, PayFlow-Agent, incorporates a process_card_payment(account_id, raw_card_number, amount) tool. Audit logs reveal unmasked 16-digit Primary Account Numbers (PAN) appearing in plain text inside third-party gateway traces, causing a PCI-DSS compliance violation. System prompt instructions directing the model to mask inputs as XXXX-XXXX-XXXX-1234 failed intermittently across non-standard formatting variants. How should the engineering team configure SDK lifecycle hooks to deterministically enforce input sanitization prior to tool invocation?",
    "question": "[d1-b03-1.5-002] Trợ lý xử lý tài chính PayFlow-Agent tích hợp công cụ process_card_payment(account_id, raw_card_number, amount). Nhật ký kiểm toán phát hiện số tài khoản chính (PAN) 16 chữ số không được che đậy xuất hiện dưới dạng văn bản rõ trong dấu vết cổng thanh toán bên thứ ba, vi phạm tiêu chuẩn PCI-DSS. Hướng dẫn system prompt yêu cầu mô hình che dữ liệu đầu vào thành XXXX-XXXX-XXXX-1234 bị thất bại chập chờn khi người dùng nhập số thẻ ở các định dạng khác nhau. Nhóm kỹ thuật nên cấu hình các hook vòng đời của SDK như thế nào để bắt buộc làm sạch dữ liệu đầu vào một cách xác định trước khi thực thi?",
    "optionsEN": [
      "A. Configure a PostToolUse hook to parse execution logs and mask the raw_card_number parameter string before persisting audit traces.",
      "B. Register a PreToolUse hook that intercepts process_card_payment arguments, replaces unmasked card numbers with sanitized tokens, and returns modified inputs prior to execution.",
      "C. Define an inline validation rule in the system prompt instructing the LLM to apply regex masking on raw_card_number before emitting tool calls.",
      "D. Implement a PostToolUse hook that modifies the returned transaction payload to mask card numbers before presenting results to the user."
    ],
    "options": [
      "A. Cấu hình hook PostToolUse để phân tích nhật ký thực thi và che chuỗi raw_card_number trước khi lưu dấu vết kiểm toán.",
      "B. Đăng ký hook PreToolUse để chặn các đối số process_card_payment, thay thế số thẻ chưa che bằng token đã làm sạch, và trả về đầu vào đã chỉnh sửa trước khi thực thi công cụ.",
      "C. Định nghĩa một quy tắc xác thực nội dòng trong system prompt hướng dẫn LLM áp dụng regex che raw_card_number trước khi phát ra lệnh gọi công cụ.",
      "D. Triển khai hook PostToolUse để chỉnh sửa payload phản hồi trả về nhằm che số thẻ trước khi hiển thị kết quả cho người dùng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A: PostToolUse executes after the tool has executed, meaning unmasked card numbers will already have been sent in plain text over the network to the gateway API.",
      "Option B (Correct): PreToolUse hooks can inspect and mutate tool input arguments prior to tool execution, guaranteeing that sensitive card numbers are sanitized before being passed to external services.",
      "Option C: System prompt instructions are probabilistic and fail to reliably sanitize inputs across diverse input variants or edge-case formatting.",
      "Option D: Modifying the response payload in PostToolUse only sanitizes agent outputs returned to the user, leaving the raw card number unmasked during tool input execution."
    ],
    "rationale": "SDK PreToolUse hooks provide deterministic input interception and modification capability before a tool executes. By mutating parameters inside PreToolUse, unmasked card numbers are sanitized into safe tokens before any network payload is dispatched, satisfying PCI-DSS compliance.",
    "explanation": "Trong Agent SDK, hook PreToolUse không chỉ có khả năng chặn cuộc gọi công cụ mà còn có thể can thiệp và chỉnh sửa (mutate) các tham số đầu vào của công cụ TRƯỚC KHI công cụ được thực thi. Để tuân thủ PCI-DSS, việc làm sạch thông tin nhạy cảm (như số thẻ PAN) phải diễn ra ở cấp độ mã đính kèm (harness level) thông qua PreToolUse để đảm bảo tính xác định (deterministic), thay vì dựa vào hướng dẫn prompt mang tính xác suất (probabilistic).\n\n- Option B đúng vì PreToolUse có thể sửa các đối số đầu vào, thay số thẻ bằng token đã che trước khi API bên ngoài nhận được payload.\n- Option A sai vì PostToolUse chạy sau khi công cụ đã gửi dữ liệu nhạy cảm dạng văn bản rõ ra ngoài mạng.\n- Option C sai vì quy tắc trong system prompt không đảm bảo 100% độ tin cậy đối với mọi biến thể định dạng đầu vào.\n- Option D sai vì việc che kết quả phản hồi trong PostToolUse không giải quyết được việc số thẻ thô đã bị truyền đi trong tham số đầu vào.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  }
]