[
  {
    "id": "d1-b03-1.4-005",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-005",
    "scenarioSignature": {
      "testedPrinciple": "Programmatic prerequisite gate for logistics compliance enforcement",
      "failureMode": "Shipment dispatched prior to customs clearance confirmation",
      "rootCause": "Reliance on prompt instructions for sequential cross-border logistics workflow",
      "requiredFix": "Enforce deterministic status check in tool execution middleware prior to dispatch"
    },
    "questionEN": "An automated logistics agent, FreightFlow-Agent, manages international cargo dispatches via dispatch_freight_manifest. Operational policy mandates that check_customs_clearance must return CUSTOMS_CLEARED before dispatching shipments. Production logs show that in 11.2% of high-volume dispatch runs, the agent invokes dispatch_freight_manifest directly after container booking without verifying customs clearance, causing cargo impoundment. How should the system architecture be modified to ensure uncleared shipments are never dispatched?",
    "question": "[d1-b03-1.4-005] Một agent vận tải tự động, FreightFlow-Agent, quản lý việc điều phối hàng hóa quốc tế thông qua tool dispatch_freight_manifest. Quy định vận hành bắt buộc hàm check_customs_clearance phải trả về trạng thái CUSTOMS_CLEARED trước khi xuất kho. Nhật ký vận hành cho thấy trong 11.2% các lượt xử lý khối lượng lớn, agent đã gọi trực tiếp dispatch_freight_manifest ngay sau khi đặt container mà không xác nhận thông quan, dẫn đến hàng hóa bị tịch thu. Kiến trúc hệ thống nên được sửa đổi như thế nào để đảm bảo không bao giờ xuất kho các lô hàng chưa thông quan?",
    "optionsEN": [
      "A. Implement a programmatic prerequisite gate in the dispatch_freight_manifest tool handler that checks customs_clearance_status in the operational database and blocks execution if the status is not CUSTOMS_CLEARED.",
      "B. Add system prompt guidelines instructing the LLM to inspect customs clearance status prior to generating dispatch tool parameters.",
      "C. Deploy an LLM-based output validator that evaluates the agent's chain-of-thought trace for customs verification keywords before forwarding the dispatch request.",
      "D. Configure an automated rollback workflow that issues a recall event to dispatch trucks whenever customs clearance errors occur post-departure."
    ],
    "options": [
      "A. Triển khai một cổng điều kiện tiên quyết bằng mã lập trình (programmatic prerequisite gate) trong handler của tool dispatch_freight_manifest để kiểm tra customs_clearance_status trong cơ sở dữ liệu và chặn thực thi nếu trạng thái không phải CUSTOMS_CLEARED.",
      "B. Bổ sung các quy tắc trong system prompt chỉ dẫn LLM kiểm tra trạng thái thông quan hải quan trước khi tạo tham số gọi tool xuất kho.",
      "C. Triển khai một LLM output validator đánh giá chuỗi suy luận (chain-of-thought) của agent xem có từ khóa xác minh hải quan hay không trước khi chuyển tiếp yêu cầu xuất kho.",
      "D. Cấu hình quy trình rollback tự động gửi sự kiện triệu hồi xe vận chuyển bất cứ khi nào phát sinh lỗi thông quan hải quan sau khi xe đã xuất phát."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: A programmatic prerequisite gate deterministically verifies customs_clearance_status == 'CUSTOMS_CLEARED' in the backend middleware before executing dispatch_freight_manifest, reducing premature dispatches to zero.",
      "Option B is incorrect: Prompt instructions are probabilistic and fail under high-volume operations or complex prompt inputs, leading to continued compliance failures.",
      "Option C is incorrect: An LLM-based output validator inspecting natural language thought chains lacks deterministic enforcement and can be bypassed by hallucinated reasoning.",
      "Option D is incorrect: Post-dispatch rollback operates after physical shipment departure, failing to prevent customs penalties or cargo impoundment."
    ],
    "rationale": "For regulatory compliance in logistics, prompt-based rules and LLM-based validators are insufficient because they remain probabilistic. Placing a deterministic programmatic prerequisite gate inside the execution handler of the dispatch tool ensures physical compliance checks execute before payload dispatch.",
    "explanation": "Trong logistics quốc tế và tuân thủ pháp lý, việc kiểm tra điều kiện tiên quyết phải mang tính xác định tuyệt đối (deterministic). Việc dùng prompt instruction (Lựa chọn B) hoặc LLM validator (Lựa chọn C) đều mang tính xác suất (probabilistic) và vẫn chịu rủi ro gọi tool sai khi quá tải. Lựa chọn D thực hiện triệu hồi sau khi đã điều xe xuất kho thì hàng hóa đã bị giữ tại cảng và chịu phạt. Lựa chọn A đúng vì xây dựng programmatic prerequisite gate ngay trong handler của dispatch_freight_manifest sẽ trực tiếp kiểm tra dữ liệu backend và chặn đứng lệnh gọi API xuất kho nếu chưa có trạng thái CUSTOMS_CLEARED.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  },
  {
    "id": "d1-b03-1.4-006",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-006",
    "scenarioSignature": {
      "testedPrinciple": "Structured handoff payload contract for human escalation",
      "failureMode": "Human specialist unable to resolve escalated ticket without re-investigation",
      "rootCause": "Escalation tool passing raw unstructured transcript without mandatory metadata fields",
      "requiredFix": "Enforce mandatory schema contract requiring entity ID root cause summary and recommended action"
    },
    "questionEN": "A customer support agent, FinTier-Agent, escalates complex billing disputes to Tier-2 human specialists using the escalate_to_human_tier2 tool. In production, 42% of escalated tickets force human specialists to re-contact customers or manually search database logs because the agent submits raw chat transcripts without structured context. Which architectural change enforces a complete handoff protocol so human specialists can resolve issues immediately?",
    "question": "[d1-b03-1.4-006] Một agent hỗ trợ khách hàng, FinTier-Agent, leo thang (escalate) các tranh chấp hóa đơn phức tạp lên chuyên viên con người Tier-2 bằng tool escalate_to_human_tier2. Trong thực tế vận hành, 42% số vé leo thang buộc chuyên viên con người phải liên hệ lại khách hàng hoặc tìm kiếm nhật ký thủ công do agent chỉ gửi transcript hội thoại thô mà thiếu ngữ cảnh có cấu trúc. Thay đổi kiến trúc nào sẽ bắt buộc thực thi giao thức bàn giao (handoff protocol) đầy đủ để chuyên viên con người xử lý được ngay?",
    "optionsEN": [
      "A. Insert prompt instructions requiring the agent to apologize to the customer and mention the escalation reason in the final chat message.",
      "B. Enforce a mandatory JSON schema contract in escalate_to_human_tier2 requiring customer_id, root_cause_summary, recommended_action, and pruned conversation_history before payload submission.",
      "C. Configure the escalation tool to forward the raw LLM context memory buffer directly to the human specialist UI dashboard.",
      "D. Implement an automated retry loop that forces the agent to attempt billing resolution three additional times before unlocking the escalation tool."
    ],
    "options": [
      "A. Chèn hướng dẫn vào prompt yêu cầu agent xin lỗi khách hàng và nêu lý do leo thang trong tin nhắn hội thoại cuối cùng.",
      "B. Bắt buộc một JSON schema contract trong escalate_to_human_tier2 yêu cầu đầy đủ các trường customer_id, root_cause_summary, recommended_action và conversation_history đã cắt gọt trước khi gửi dữ liệu.",
      "C. Cấu hình tool escalation chuyển tiếp trực tiếp toàn bộ bộ nhớ context thô của LLM lên giao diện làm việc của chuyên viên con người.",
      "D. Triển khai một vòng lặp retry tự động buộc agent phải thử giải quyết tranh chấp thêm 3 lần nữa trước khi mở khóa tool escalation."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Conversational apologies to the user do not populate the structured telemetry fields required for human specialists to diagnose billing issues.",
      "Option B is correct: A complete handoff protocol requires mandatory structured fields (customer_id, root_cause_summary, recommended_action, and context) so human specialists can resolve issues immediately without re-investigating.",
      "Option C is incorrect: Forwarding unparsed raw context buffers forces human operators to spend time extracting entity IDs and diagnosing root causes manually.",
      "Option D is incorrect: Retrying failed automated steps does not rectify the missing payload schema fields when escalation eventually occurs."
    ],
    "rationale": "Effective human-in-the-loop escalation requires a strict handoff contract containing the entity identifier, root cause synthesis, proposed resolution, and relevant context. Passing unstructured chat history causes high context load and forces human agents to duplicate diagnostic effort.",
    "explanation": "Giao thức bàn giao (handoff protocol) chuẩn từ AI Agent sang con người đòi hỏi phải truyền đầy đủ 4 thành phần bắt buộc: ID đối tượng (customer_id), tóm tắt nguyên nhân gốc (root_cause_summary), hành động đề xuất (recommended_action), và ngữ cảnh hội thoại đã lọc. Lựa chọn A chỉ tương tác với người dùng mà không cung cấp dữ liệu cho hệ thống backend. Lựa chọn C gửi transcript thô khiến con người phải mất thời gian đọc lại từ đầu để tìm thông tin. Lựa chọn D không khắc phục được thiếu sót về mặt cấu trúc dữ liệu khi bàn giao. Lựa chọn B đúng vì áp dụng JSON schema contract bắt buộc agent phải trích xuất đầy đủ các trường dữ liệu cấu trúc này trước khi lệnh chuyển cuộc gọi lên Tier-2 được thực thi.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  }
]