[
  {
    "id": "d2-b04-new-013",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-013",
    "scenarioSignature": {
      "testedPrinciple": "tool description disambiguation for update semantics",
      "failureMode": "model selects full update tool for partial payload causing data loss",
      "rootCause": "tool schemas lack descriptions distinguishing full replacement from partial update",
      "requiredFix": "add schema descriptions clarifying full overwrite vs partial field modification"
    },
    "questionEN": "An e-commerce customer support AI agent connects to an MCP server exposing two tools: update_customer(customer_id: string, email: string, phone: string, status: string) and patch_customer(customer_id: string, phone: string). Neither tool schema contains descriptions explaining payload requirements or update semantics. When a user requests to change only their phone number, the agent invokes update_customer(customer_id=\"CUST-8021\", phone=\"+1-555-0199\"), resulting in the backend setting email and status to null and resetting the user account state. Why did this failure occur, and how should the tool schemas be modified?",
    "question": "[d2-b04-new-013] Một agent AI hỗ trợ khách hàng thương mại điện tử kết nối với MCP server cung cấp hai tool: update_customer(customer_id: string, email: string, phone: string, status: string) và patch_customer(customer_id: string, phone: string). Cả hai tool schema đều không có mô tả (description) giải thích yêu cầu dữ liệu hoặc ngữ nghĩa cập nhật. Khi người dùng yêu cầu chỉ đổi số điện thoại, agent lại gọi update_customer(customer_id=\"CUST-8021\", phone=\"+1-555-0199\"), dẫn đến việc backend ghi đè các trường email và status thành null và làm rủi ro trạng thái tài khoản. Tại sao lỗi này xảy ra và làm thế nào để sửa đổi các tool schema?",
    "optionsEN": [
      "A. The lack of schema descriptions clarifying PUT (full overwrite) vs PATCH (partial update) led the LLM to select the wrong tool; adding explicit descriptions to update_customer (requires full payload) and patch_customer (modifies provided fields only) guides correct model routing.",
      "B. The update_customer schema failed because phone lacked a regex pattern constraint; adding pattern: \"^\\\\+[1-9]\\\\d{1,14}$\" to both tool schemas would automatically force the model to select patch_customer.",
      "C. Having granular tools creates routing ambiguity for LLMs; both tools should be replaced with a single monolithic manage_customer(action: string) tool with an action choice parameter.",
      "D. The tool call failed because customer_id was passed as a string type instead of integer; converting customer_id to an integer in the schema fixes the backend routing error."
    ],
    "options": [
      "A. Việc thiếu mô tả schema làm rõ sự khác biệt giữa PUT (ghi đè toàn bộ) và PATCH (cập nhật một phần) khiến LLM chọn sai tool; bổ sung mô tả rõ ràng cho update_customer (yêu cầu payload đầy đủ) và patch_customer (chỉ sửa các trường được cung cấp) sẽ điều hướng mô hình chính xác.",
      "B. Schema update_customer thất bại vì phone thiếu ràng buộc regex pattern; thêm pattern: \"^\\\\+[1-9]\\\\d{1,14}$\" vào cả hai tool schema sẽ tự động buộc mô hình chọn patch_customer.",
      "C. Việc tách thành các tool nhỏ gây ra sự mơ hồ khi điều hướng cho LLM; cả hai tool nên được thay thế bằng một tool đơn khối duy nhất manage_customer(action: string) có tham số lựa chọn hành động.",
      "D. Lượt gọi tool thất bại vì customer_id được truyền ở kiểu string thay vì integer; chuyển customer_id sang kiểu integer trong schema sẽ sửa lỗi điều hướng backend."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because adding clear tool descriptions specifying that update_customer requires a full entity payload (PUT semantics) and patch_customer accepts partial field updates (PATCH semantics) enables the model to correctly reason about which tool fits a partial update request.",
      "Option B is incorrect because adding regex pattern validation for phone numbers validates format correctness but does not inform the model about payload scope or prevent it from selecting the wrong tool for partial updates.",
      "Option C is incorrect because replacing granular tools with a monolithic manage_customer tool decreases tool clarity, compromises safety controls, and violates MCP granular tool design principles.",
      "Option D is incorrect because customer_id format (string vs integer) is unrelated to the semantics of partial vs full object updates and does not address the root cause of data overwrites."
    ],
    "rationale": "Without explicit tool descriptions differentiating full payload replacement (update_customer) from partial delta updates (patch_customer), LLMs cannot distinguish their behavioral scope. Adding descriptive usage guidelines specifying input requirements and update side-effects guides the LLM to choose patch_customer for single-field modifications, preventing unintended null overwrites.",
    "explanation": "Lựa chọn A là đáp án đúng. Trong thiết kế MCP tool, LLM dựa vào description của từng tool để hiểu chức năng và ngữ nghĩa hoạt động. Khi cả hai tool update_customer và patch_customer đều tồn tại nhưng thiếu mô tả phân biệt giữa PUT (ghi đè toàn bộ dữ liệu) và PATCH (chỉ cập nhật trường thay đổi), mô hình có thể gọi sai tool dẫn đến việc các trường không được cung cấp bị ghi đè thành null. Việc thêm mô tả rõ ràng giải thích ngữ nghĩa cập nhật giúp LLM điều hướng chính xác.\n\nLựa chọn B sai vì việc thêm ràng buộc regex pattern chỉ dùng để kiểm tra định dạng dữ liệu đầu vào (ví dụ số điện thoại hợp lệ), không giải quyết được việc mô hình chọn sai tool do thiếu ngữ nghĩa cập nhật.\nLựa chọn C sai vì việc gộp thành một tool đơn khối manage_customer(action) làm giảm khả năng lý giải của mô hình, vi phạm nguyên tắc thiết kế tool nhỏ gọn (granular tools) và khó phân quyền an toàn.\nLựa chọn D sai vì kiểu dữ liệu của customer_id không liên quan đến nguyên nhân gây ghi đè dữ liệu null do gọi sai ngữ nghĩa tool.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-new-014",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-014",
    "questionEN": "A cloud operations agent uses an MCP tool to notify engineers about system alerts. The team evaluates two parameter designs: Standard A defines send_email(recipient: string, message: string, urgent: boolean), while Standard B defines send_email(recipient: string, message: string, priority: string) where priority uses enum: [\"high\", \"medium\", \"low\"]. During evaluation on multi-tiered alert prompts (such as routine status reports, warning alerts, and critical outages), Standard A frequently misclassifies moderate warnings as urgent or non-urgent binary states. Why is Standard B more effective for model reasoning?",
    "question": "[d2-b04-new-014] Một agent vận hành đám mây sử dụng MCP tool để gửi thông báo cho các kỹ sư về cảnh báo hệ thống. Nhóm thiết kế đánh giá hai phương án tham số: Standard A định nghĩa send_email(recipient: string, message: string, urgent: boolean), trong khi Standard B định nghĩa send_email(recipient: string, message: string, priority: string) trong đó priority dùng enum: [\"high\", \"medium\", \"low\"]. Khi thử nghiệm với các câu lệnh cảnh báo nhiều cấp độ (như báo cáo định kỳ, cảnh báo mức trung bình, sự cố nghiêm trọng), Standard A thường xuyên phân loại sai các cảnh báo trung bình do chỉ có hai trạng thái binary nhị phân. Tại sao Standard B lại hiệu quả hơn cho khả năng lý giải của mô hình?",
    "optionsEN": [
      "A. Standard A reduces prompt token overhead by using boolean primitives, which forces the LLM to complete tool calls with lower latency and higher context window efficiency.",
      "B. Standard B provides an explicit string enum that defines discrete categorical states (\"high\", \"medium\", \"low\"), allowing the LLM to accurately align multi-tiered user intent without hallucinating boolean threshold logic.",
      "C. Standard A fails because LLMs cannot decode boolean true/false values inside JSON schemas without explicit regex pattern constraints.",
      "D. Standard B is effective only if priority is converted to an object containing nested boolean flags for each priority level (is_high: boolean, is_medium: boolean, is_low: boolean)."
    ],
    "options": [
      "A. Standard A giảm chi phí token trong prompt bằng cách dùng kiểu primitive boolean, buộc LLM hoàn thành lượt gọi tool với độ trễ thấp hơn và hiệu quả ngữ cảnh cao hơn.",
      "B. Standard B cung cấp một string enum rõ ràng định nghĩa các trạng thái phân loại phân biệt (\"high\", \"medium\", \"low\"), cho phép LLM ánh xạ chính xác ý định người dùng nhiều cấp độ mà không phải tự đoán logic ngưỡng nhị phân.",
      "C. Standard A thất bại vì LLM không thể giải mã các giá trị boolean true/false bên trong JSON schema nếu thiếu các ràng buộc regex pattern rõ ràng.",
      "D. Standard B chỉ hiệu quả nếu priority được chuyển thành một object chứa các cờ boolean lồng nhau cho từng cấp độ ưu tiên (is_high: boolean, is_medium: boolean, is_low: boolean)."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because while boolean parameters use slightly fewer tokens, forced binary parameters obscure multi-state domain logic and reduce LLM reasoning accuracy for intermediate states.",
      "Option B is correct because defining parameters with explicit string enums (high, medium, low) constrains the LLM search space to valid semantic choices, eliminating guessing and improving alignment with nuanced user requests.",
      "Option C is incorrect because LLMs natively parse boolean JSON values; the issue stems from categorical ambiguity in domain logic rather than JSON syntax decoding failures.",
      "Option D is incorrect because creating nested mutually exclusive boolean flags increases schema verbosity and introduces risks of invalid state combinations (e.g., setting both is_high and is_low to true)."
    ],
    "rationale": "Boolean parameters (urgent: boolean) force complex multi-tiered concepts into rigid binary choices, causing model misclassification when handling intermediate user intent (like medium-severity warnings). Using string parameters with explicit enum constraints ([\"high\", \"medium\", \"low\"]) clearly communicates valid discrete choices to the LLM, enabling accurate semantic reasoning.",
    "explanation": "Lựa chọn B là đáp án đúng. Trong thiết kế JSON Schema cho MCP tool, khi một tham số biểu diễn các mức độ hoặc phân loại có nhiều hơn 2 trạng thái (như mức độ ưu tiên thông báo: cao, trung bình, thấp), việc sử dụng kiểu string kết hợp với ràng buộc enum: [\"high\", \"medium\", \"low\"] là phương án tối ưu. Điều này cung cấp phạm vi giá trị hợp lệ rõ ràng cho LLM, giúp mô hình suy luận và ánh xạ ý định từ prompt vào đúng phân loại mà không phải tự đoán ranh giới nhị phân của tham số boolean urgent.\\n\\nLựa chọn A sai vì việc tiết kiệm một số ít token không bù đắp được rủi ro mô hình phân loại sai các mức độ cảnh báo trung gian.\\nLựa chọn C sai vì LLM hoàn toàn có thể hiểu và giải mã kiểu boolean trong JSON; nguyên nhân thất bại ở đây là do hạn chế về mặt ngữ nghĩa (nhị phân vs đa cấp độ) chứ không phải lỗi cú pháp.\\nLựa chọn D sai vì tạo các cờ boolean lồng nhau (is_high, is_medium, is_low) làm schema cồng kềnh và tạo ra nguy cơ vi phạm trạng thái xung đột (ví dụ mô hình bật cả is_high và is_low thành true).",
    "scenarioSignature": {
      "testedPrinciple": "enum string constraints versus boolean parameters for tool reasoning",
      "failureMode": "model misinterprets multi-tiered priority levels due to binary parameter constraints",
      "rootCause": "boolean schema parameters restrict parameter choices for multi-state domain values",
      "requiredFix": "replace boolean flag with string schema using enum array of explicit category values"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]