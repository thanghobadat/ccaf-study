[
  {
    "id": "d1-b03-new-007",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-007",
    "scenarioSignature": {
      "testedPrinciple": "structured context preservation in subagent invocation",
      "failureMode": "subagent execution fails due to missing context metadata",
      "rootCause": "coordinator passes natural language summary without structured schema attributes",
      "requiredFix": "explicitly include key-value metadata in subagent task invocation payload"
    },
    "questionEN": "In the CareFlow Medical Intake System, a coordinator agent receives patient triage notes and delegates specialized follow-up by invoking a Cardiology Referral Subagent via the Task tool. However, the coordinator passes only a natural language instruction ('patient needs cardiology referral') in the subagent prompt. When executed, the referral subagent fails with a ValidationError: Missing required parameters because essential metadata fields (patient_id, referral_date, and insurance_provider) are missing from the subagent's execution context. How should the architecture be modified to resolve this context stripping failure?",
    "question": "[d1-b03-new-007] Trong Hệ thống Tiếp nhận Y tế CareFlow, agent coordinator nhận ghi chú phân loại bệnh nhân và ủy quyền xử lý chuyên sâu bằng cách gọi Subagent Chuyển khoa Tim mạch thông qua tool Task. Tuy nhiên, coordinator chỉ truyền một câu lệnh bằng ngôn ngữ tự nhiên ('patient needs cardiology referral') trong prompt của subagent. Khi thực thi, subagent chuyển khoa báo lỗi ValidationError: Missing required parameters do các trường metadata thiết yếu (patient_id, referral_date, và insurance_provider) bị thiếu trong ngữ cảnh thực thi. Kiến trúc cần được sửa đổi như thế nào để khắc phục lỗi mất mát ngữ cảnh này?",
    "optionsEN": [
      "A. Configure the referral subagent to parse the coordinator's audit logs at runtime to dynamically infer missing patient metadata.",
      "B. Pass the entire raw conversation context of the intake coordinator into the subagent's prompt window.",
      "C. Update the coordinator to explicitly pass structured metadata fields (patient_id, referral_date, insurance_provider) in the Task tool invocation payload.",
      "D. Share the intake coordinator's private session memory store directly with the referral subagent."
    ],
    "options": [
      "A. Cấu hình subagent chuyển khoa truy vấn log kiểm toán của coordinator tại thời điểm thực thi để tự suy luận metadata bệnh nhân còn thiếu.",
      "B. Truyền toàn bộ ngữ cảnh hội thoại thô của coordinator tiếp nhận vào cửa sổ prompt của subagent.",
      "C. Cập nhật coordinator để truyền rõ ràng các trường metadata có cấu trúc (patient_id, referral_date, insurance_provider) trong payload gọi tool Task.",
      "D. Chia sẻ trực tiếp bộ nhớ phiên làm việc riêng tư của coordinator tiếp nhận cho subagent chuyển khoa."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because requiring the subagent to parse database or audit logs via natural language introduces non-deterministic queries and fails to pass required structured parameters at invocation time.",
      "Option B is incorrect because passing the entire intake conversation log overloads the subagent's context window with conversational noise and does not guarantee that the subagent receives structured schema fields like patient_id.",
      "Option C is correct because explicitly passing structured fields (patient_id, referral_date, insurance_provider) in the Task tool payload provides the subagent with the exact metadata required to execute the referral workflow deterministically.",
      "Option D is incorrect because granting direct access to coordinator session memory violates subagent context isolation boundaries and causes state corruption risks."
    ],
    "rationale": "When invoking subagents via the Task tool, the coordinator must pass essential contextual attributes as explicit structured metadata fields rather than embedding summaries in natural language prose. Including patient_id, referral_date, and insurance_provider in the Task payload ensures deterministic schema validation and reliable subagent execution without relying on context inference.",
    "explanation": "Lựa chọn C là đáp án đúng vì khi điều phối công việc cho subagent qua Task tool, coordinator cần truyền đầy đủ các trường dữ liệu định dạng cấu trúc (patient_id, referral_date, insurance_provider) cùng với mô tả nhiệm vụ thay vì chỉ gửi câu văn tự nhiên. Điều này đảm bảo subagent nhận đủ thông tin để thực thi quy trình mà không gặp lỗi thiếu trường dữ liệu.\nLựa chọn A không đúng vì việc để subagent tự truy vấn log bằng ngôn ngữ tự nhiên làm tăng độ phức tạp, tính không xác định và không giải quyết đúng nguyên tắc truyền context khi gọi subagent.\nLựa chọn B không đúng vì truyền toàn bộ lịch sử hội thoại thô sẽ gây lãng phí context window, làm nhiễu thông tin và không đảm bảo subagent trích xuất chính xác các thuộc tính hệ thống cần thiết.\nLựa chọn D không đúng vì chia sẻ bộ nhớ phiên làm việc riêng tư của coordinator vi phạm nguyên tắc cô lập ngữ cảnh (context isolation) giữa các agent và dễ dẫn đến lỗi đồng bộ trạng thái.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-008",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-008",
    "scenarioSignature": {
      "testedPrinciple": "explicit metadata propagation during agent delegation",
      "failureMode": "subagent input validation error from missing operational attributes",
      "rootCause": "coordinator strips structured parameters when constructing subagent prompt",
      "requiredFix": "pass explicit structured parameters within task tool invocation context"
    },
    "questionEN": "An e-commerce order management agent named OmniOrder delegates fulfillment tasks to a warehouse subagent using the Task tool. When delegating, the coordinator passes only a brief prose summary ('order needs fulfillment'). Consequently, the warehouse subagent throws an UnprocessableEntityError due to missing order_id, sku_list, and shipping_address properties in its incoming context. What is the correct architectural pattern to fix this metadata stripping issue?",
    "question": "[d1-b03-new-008] Một agent quản lý đơn hàng thương mại điện tử có tên OmniOrder ủy quyền nhiệm vụ hoàn tất đơn hàng cho subagent kho hàng bằng tool Task. Khi ủy quyền, coordinator chỉ truyền một đoạn tóm tắt vắn tắt ('order needs fulfillment'). Do đó, subagent kho hàng ném ra lỗi UnprocessableEntityError vì thiếu các thuộc tính order_id, sku_list, và shipping_address trong ngữ cảnh nhận được. Mô hình kiến trúc nào là đúng để khắc phục sự cố mất metadata này?",
    "optionsEN": [
      "A. Authorize the warehouse subagent to perform web searches and parse system logs to reconstruct the order details.",
      "B. Implement background polling logic in the warehouse subagent to query the customer directly for missing order parameters.",
      "C. Embed the entire global e-commerce database snapshot inside the warehouse subagent's system instructions.",
      "D. Modify the OmniOrder coordinator to supply explicit structured key-value attributes (order_id, sku_list, shipping_address) within the Task invocation payload."
    ],
    "options": [
      "A. Cấp quyền cho subagent kho hàng thực hiện tìm kiếm web và đọc log hệ thống để tự khôi phục chi tiết đơn hàng.",
      "B. Triển khai logic vòng lặp truy vấn chạy ngầm trong subagent kho hàng để hỏi trực tiếp khách hàng về các tham số đơn hàng còn thiếu.",
      "C. Nhúng toàn bộ bản chụp cơ sở dữ liệu thương mại điện tử toàn cục vào hướng dẫn hệ thống của subagent kho hàng.",
      "D. Sửa đổi coordinator OmniOrder để cung cấp các thuộc tính khóa-giá trị có cấu trúc rõ ràng (order_id, sku_list, shipping_address) trong payload gọi Task."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because encouraging autonomous web search or log searching does not supply missing internal order metadata deterministically and introduces unpredictable latency.",
      "Option B is incorrect because placing background polling logic on the subagent to query customers directly violates coordinator delegation boundaries and creates customer friction.",
      "Option C is incorrect because embedding the full database snapshot into system prompt instructions causes severe token bloat and security vulnerabilities.",
      "Option D is correct because populating explicit JSON metadata fields (order_id, sku_list, shipping_address) in the Task payload provides the fulfillment subagent with exact, structured input parameters necessary for order execution."
    ],
    "rationale": "Subagent delegation requires structured context passing. When an e-commerce coordinator delegates a task, passing concise prose like 'order needs fulfillment' strips essential operational attributes. Supplying explicit key-value attributes (order_id, sku_list, shipping_address) in the Task invocation parameters guarantees that the subagent receives complete, valid context required for order processing.",
    "explanation": "Lựa chọn D là đáp án đúng vì coordinator cần truyền các thuộc tính JSON cấu trúc (order_id, sku_list, shipping_address) trực tiếp trong tham số gọi Task tool cho fulfillment subagent. Việc này khắc phục triệt để lỗi thiếu metadata và đảm bảo subagent có đủ dữ liệu đầu vào xác định để xử lý đơn hàng.\nLựa chọn A không đúng vì việc để subagent tự tìm kiếm thông tin đơn hàng trên web hoặc log không giải quyết được vấn đề thiếu dữ liệu trong payload gọi hàm và gây ra độ trễ không kiểm soát.\nLựa chọn B không đúng vì subagent không nên tự động hỏi lại khách hàng thông tin đơn hàng, làm sai lệch vai trò điều phối của coordinator và gây ảnh hưởng xấu đến trải nghiệm người dùng.\nLựa chọn C không đúng vì nhồi nhét toàn bộ cơ sở dữ liệu đơn hàng vào system prompt làm bùng nổ số lượng token (token bloat) và tăng nguy cơ rò rỉ dữ liệu.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]