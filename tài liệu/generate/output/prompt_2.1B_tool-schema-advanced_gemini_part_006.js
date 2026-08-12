[
  {
    "id": "d2-b04-B-011",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-011",
    "questionEN": "An enterprise billing integration exposes two tools in its MCP server: process_payment_v1(order_id: string, amount: number) and process_payment_v2(order_id: string, amount: number, currency: string, payment_method: string). Both tool descriptions simply state \"Process customer order payment\". When users request processing payments for newly created orders, the AI agent consistently selects process_payment_v1, causing payments to fail downstream due to missing multi-currency routing fields. Which schema modification best resolves this version selection error?",
    "question": "[d2-b04-B-011] Một hệ thống thanh toán doanh nghiệp cung cấp hai công cụ trong MCP server: process_payment_v1(order_id: string, amount: number) và process_payment_v2(order_id: string, amount: number, currency: string, payment_method: string). Mô tả của cả hai công cụ đều chỉ ghi \"Process customer order payment\". Khi người dùng yêu cầu thanh toán cho các đơn hàng mới tạo, AI agent liên tục chọn process_payment_v1, dẫn đến thất bại thanh toán hệ thống do thiếu các trường định tuyến đa tiền tệ. Thay đổi schema nào giải quyết tốt nhất lỗi chọn phiên bản này?",
    "optionsEN": [
      "A. Increase the LLM temperature parameter to 0.7 so the model dynamically selects between process_payment_v1 and process_payment_v2.",
      "B. Remove process_payment_v2 from the exposed MCP tool list so the agent is forced to use the simpler process_payment_v1 interface.",
      "C. Update the description of process_payment_v1 to explicitly state \"[DEPRECATED] Legacy payment processor for pre - 2024 orders only\" and document process_payment_v2 as \"Primary payment processor for all active and multi- currency orders\".",
      "D. Combine both tools into a single process_payment(version: string) tool without updating parameter descriptions or deprecation warnings."
    ],
    "options": [
      "A. Tăng tham số temperature của LLM lên 0.7 để mô hình tự động chọn ngẫu nhiên giữa process_payment_v1 và process_payment_v2.",
      "B. Xóa process_payment_v2 khỏi danh sách MCP tool để ép agent sử dụng giao diện process_payment_v1 đơn giản hơn.",
      "C. Cập nhật mô tả của process_payment_v1 thành \"[DEPRECATED] Legacy payment processor for pre - 2024 orders only\" và mô tả process_payment_v2 là \"Primary payment processor for all active and multi - currency orders\".",
      "D. Gộp cả hai công cụ thành một công cụ duy nhất process_payment(version: string) mà không cập nhật mô tả tham số hoặc cảnh báo deprecation."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Adjusting temperature introduces output randomness but does not provide semantic clarity regarding API version capabilities or deprecation state.",
      "Option B is incorrect: Removing v2 forces the model to use the deprecated v1 endpoint, worsening downstream failures by omitting required modern fields like currency and payment method.",
      "Option C is correct: Explicitly marking v1 as deprecated in its tool description and declaring v2 as the primary interface for active orders provides clear semantic guidance that steers the LLM to the correct version.",
      "Option D is incorrect: Merging endpoints into a version parameter without documenting usage requirements leaves the selection ambiguity unresolved and exposes invalid parameters to the model."
    ],
    "rationale": "Updating tool descriptions to document version lifecycle state and explicit migration paths (marking v1 as deprecated and v2 as current primary) gives the model necessary semantic context to select the correct API version.",
    "explanation": "Khi hai phiên bản của cùng một công cụ xuất hiện đồng thời trong MCP tool manifest mà không có mô tả phân biệt, mô hình ngôn ngữ không thể biết phiên bản nào là mới nhất hoặc phù hợp cho yêu cầu hiện tại.\\n\\n- Option A sai: Tăng temperature chỉ làm tăng tính ngẫu nhiên của đầu ra chứ không cung cấp thông tin ngữ nghĩa về phiên bản API.\\n- Option B sai: Xóa v2 sẽ buộc agent dùng v1 đã lỗi thời, khiến các giao dịch cần đa tiền tệ thất bại hoàn toàn.\\n- Option C đúng: Đánh dấu rõ v1 là deprecated và hướng dẫn mô hình dùng v2 cho các đơn hàng hiện tại giúp LLM đưa ra quyết định chọn công cụ chính xác dựa trên ngữ nghĩa.\\n- Option D sai: Gộp hai API vào một tham số version mà không làm rõ quy tắc chọn phiên bản sẽ không giải quyết được sự mơ hồ ban đầu.",
    "scenarioSignature": {
      "testedPrinciple": "tool versioning and deprecation description guidance",
      "failureMode": "model invokes deprecated tool version for new transactions",
      "rootCause": "tool schema lacks version distinction and lifecycle state documentation",
      "requiredFix": "mark deprecated tools explicitly and document version migration guidance in descriptions"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-B-012",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-012",
    "questionEN": "An automated customer onboarding workflow includes an MCP tool send_welcome_email(user_id: string, template_id: string). The tool description reads \"Sends welcome email package to new user\". When an upstream database query timed out after the email service call, the AI agent inferred a step failure and retried the onboarding pipeline 5 times, resulting in 5 duplicate welcome emails sent to the same customer. Which tool schema design change prevents this non-idempotent duplicate action failure?",
    "question": "[d2-b04-B-012] Quy trình đăng ký khách hàng tự động bao gồm công cụ MCP send_welcome_email(user_id: string, template_id: string). Mô tả công cụ ghi \"Sends welcome email package to new user\". Khi một truy vấn cơ sở dữ liệu phía trên bị timeout sau khi cuộc gọi dịch vụ email đã được thực hiện, AI agent suy luận rằng bước làm việc bị thất bại và đã thử lại (retry) quy trình 5 lần, dẫn đến 5 email chào mừng bị gửi trùng lặp tới cùng một khách hàng. Thay đổi thiết kế tool schema nào ngăn ngừa thất bại do hành vi không có tính đẳng quản (non-idempotent) này?",
    "optionsEN": [
      "A. Modify the template_id parameter type from string to an enum containing allowed email template identifiers.",
      "B. Add a client-side timeout of 500ms to send_welcome_email so the tool fails immediately before downstream steps execute.",
      "C. Change user_id to an array parameter user_ids: string[] to force batch processing for all welcome emails.",
      "D. Update the tool description to state \"Non - idempotent: sends external email immediately.Do NOT retry on workflow timeout without checking delivery status first\", and add an optional idempotency_key: string parameter."
    ],
    "options": [
      "A. Thay đổi kiểu của tham số template_id từ string sang enum chứa danh sách các định danh mẫu email hợp lệ.",
      "B. Thêm thời gian timeout phía client 500ms cho send_welcome_email để công cụ thất bại ngay lập tức trước khi các bước phía sau chạy.",
      "C. Chuyển user_id thành một mảng tham số user_ids: string[] để ép buộc xử lý hàng loạt cho tất cả email chào mừng.",
      "D. Cập nhật mô tả công cụ để ghi rõ \"Non - idempotent: sends external email immediately.Do NOT retry on workflow timeout without checking delivery status first\", và thêm tham số tùy chọn idempotency_key: string."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Changing template_id to an enum validates parameter syntax but does not inform the model about external side effects or control retry behavior during timeouts.",
      "Option B is incorrect: Shortening the tool execution timeout increases the likelihood of transient timeouts and subsequent retry loops, exacerbating duplicate email dispatch.",
      "Option C is incorrect: Converting user_id to an array does not document side effects or prevent retries when network/database timeouts occur mid-execution.",
      "Option D is correct: Explicitly documenting non-idempotent side effects in the tool description and providing an idempotency_key warns the model against blind retries and enables backend deduplication."
    ],
    "rationale": "Documenting non-idempotent side effects in the tool description informs the agent's decision loop, while introducing an idempotency key enables downstream deduplication to prevent accidental repeat execution during retries.",
    "explanation": "Khi một công cụ tạo ra tác dụng phụ (side effect) bên ngoài như gửi email hoặc tính tiền, việc thiếu thông tin về tính không đẳng quản (non-idempotent) khiến AI agent tự động thử lại khi gặp sự cố ở các bước liên quan.\\n\\n- Option A sai: Giới hạn enum cho template_id chỉ kiểm tra tính hợp lệ của cú pháp, không ngăn được việc gọi lại công cụ khi retry.\\n- Option B sai: Giảm timeout làm tăng nguy cơ timeout giả, khiến agent thử lại nhiều lần hơn và gửi thêm nhiều email trùng lặp.\\n- Option C sai: Chuyển sang mảng không cung cấp thông tin ngữ nghĩa về side-effect và không giải quyết được vấn đề retry khi xảy ra timeout.\\n- Option D đúng: Khai báo rõ tác dụng phụ non-idempotent trong description giúp agent tránh tự ý retry khi chưa kiểm tra trạng thái, đồng thời idempotency_key cho phép hệ thống backend loại bỏ các yêu cầu trùng lặp.",
    "scenarioSignature": {
      "testedPrinciple": "side effects and idempotency documentation in tool schemas",
      "failureMode": "duplicate non-idempotent operations executed during agent retry loop",
      "rootCause": "tool description omits side effects and idempotency constraints",
      "requiredFix": "document side effects and non-idempotent nature in tool description or mandate idempotency key"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]