[
  {
    "id": "d2-b04-B-005",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-005",
    "scenarioSignature": {
      "testedPrinciple": "optional parameter default semantics documentation",
      "failureMode": "unbounded date range query retrieving excess historical records",
      "rootCause": "omitted optional end date defaults implicitly to current time",
      "requiredFix": "explicitly document default parameter boundary behavior in schema"
    },
    "questionEN": "An enterprise audit log tool fetch_audit_logs defines required: [\"start_date\"] while end_date is marked optional without further description. When an AI agent handles a user request to analyze historical logs for Q1, it omits end_date because the field is optional, causing the backend service to return all records from start_date up to the current timestamp and overflowing the context window. Which schema design change best prevents this issue?",
    "question": "[d2-b04-B-005] Một công cụ nhật ký kiểm toán doanh nghiệp fetch_audit_logs định nghĩa required: [\"start_date\"] trong khi end_date được đánh dấu là tùy chọn mà không có thêm mô tả. Khi AI agent xử lý yêu cầu của người dùng để phân tích nhật ký lịch sử cho Quý 1, nó bỏ qua end_date vì trường này là tùy chọn, khiến dịch vụ backend trả về tất cả bản ghi từ start_date cho đến thời điểm hiện tại và làm tràn cửa sổ ngữ cảnh. Thay đổi thiết kế schema nào ngăn chặn hiệu quả nhất vấn đề này?",
    "optionsEN": [
      "A. Document in end_date's description that omitting it defaults to the current timestamp, and instruct the model to provide both bounds for specific historical range queries.",
      "B. Convert start_date and end_date into string enums containing static financial quarter labels such as Q1_2026.",
      "C. Increase the agent's context window limit to accommodate millions of unpartitioned log records returned by open-ended queries.",
      "D. Add a PreToolUse hook to automatically append end_date = start_date + 30 days whenever end_date is missing from the arguments."
    ],
    "options": [
      "A. Mô tả rõ trong phần mô tả của end_date rằng việc bỏ qua nó sẽ mặc định lấy thời điểm hiện tại, và hướng dẫn mô hình cung cấp cả hai mốc cho truy vấn khoảng lịch sử cụ thể.",
      "B. Chuyển đổi start_date và end_date thành các string enum chứa nhãn quý tài chính cố định như Q1_2026.",
      "C. Tăng giới hạn cửa sổ ngữ cảnh của agent để chứa hàng triệu bản ghi nhật ký không phân đoạn được trả về từ các truy vấn mở.",
      "D. Thêm hook PreToolUse để tự động bổ sung end_date = start_date + 30 ngày bất cứ khi nào thiếu end_date trong đối số."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Explicitly documenting that omitting end_date defaults to the current timestamp alerts the model that leaving it out creates an open-ended query, prompting it to supply both boundaries for specific date ranges.",
      "Option B: Restricting dates to static quarter enums prevents users from querying arbitrary or fine-grained date ranges outside preset quarters.",
      "Option C: Expanding the context window does not fix the root schema ambiguity and causes high cost and latency overhead.",
      "Option D: Automatically injecting a 30-day window via runtime hooks overrides intent when the user intended a single-day or multi-month analysis."
    ],
    "rationale": "Documenting optional parameter default behavior ensures the model understands the structural implications of omitting optional arguments like date bounds.",
    "explanation": "Khi một tham số tùy chọn như end_date có giá trị mặc định ẩn là thời điểm hiện tại (now), việc thiếu mô tả trong schema khiến mô hình không nhận ra truy vấn sẽ bị kéo dài đến hiện tại. Việc bổ sung mô tả rõ ràng về giá trị mặc định giúp mô hình chủ động truyền đủ cả hai mốc thời gian khi người dùng yêu cầu khoảng dữ liệu lịch sử cụ thể.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-B-006",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-006",
    "scenarioSignature": {
      "testedPrinciple": "deep object nesting schema complexity reduction",
      "failureMode": "model omits essential inner properties during tool execution",
      "rootCause": "deeply nested parameter structure exceeds structural generation reliability",
      "requiredFix": "flatten nested schema parameters into top-level primitive fields"
    },
    "questionEN": "An analytics reporting tool create_report(config: object) uses a 5-level deeply nested JSON schema to encapsulate report layouts, data queries, metric filters, export targets, and delivery schedules. In production, the AI agent frequently generates incomplete tool calls that omit required nested sub-fields, triggering JSON validation failures. Which schema refactoring approach best resolves this reliability problem?",
    "question": "[d2-b04-B-006] Một công cụ báo cáo phân tích create_report(config: object) sử dụng JSON schema lồng nhau sâu 5 cấp để bao đóng bố cục báo cáo, truy vấn dữ liệu, bộ lọc chỉ số, mục tiêu xuất và lịch giao hàng. Trong sản xuất, AI agent thường xuyên tạo ra các cuộc gọi công cụ không đầy đủ và bỏ qua các trường con lồng sâu bắt buộc, gây ra lỗi xác thực JSON. Cách tiếp cận tái cấu trúc schema nào giải quyết tốt nhất vấn đề độ tin cậy này?",
    "optionsEN": [
      "A. Add a detailed system prompt instruction containing full 5-level JSON example structures for every report type.",
      "B. Flatten the deeply nested configuration schema into top-level parameters or split the schema into focused composite properties.",
      "C. Implement an automatic retry loop that passes backend schema validation error messages back to the agent for self-correction.",
      "D. Mark all properties across all 5 nesting levels as required in the JSON schema without modifying the structural hierarchy."
    ],
    "options": [
      "A. Thêm hướng dẫn system prompt chi tiết chứa các cấu trúc ví dụ JSON 5 cấp đầy đủ cho từng loại báo cáo.",
      "B. Phẳng hóa (flatten) schema cấu hình bị lồng sâu thành các tham số cấp cao nhất hoặc chia schema thành các thuộc tính tổng hợp tập trung.",
      "C. Triển khai vòng lặp thử lại tự động gửi lại thông báo lỗi xác thực schema của backend cho agent để tự sửa lỗi.",
      "D. Đánh dấu tất cả các thuộc tính ở cả 5 cấp lồng nhau là bắt buộc (required) trong JSON schema mà không thay đổi cấu trúc phân cấp."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A: Providing complex JSON examples in prompts consumes token quota and does not solve the LLM's structural generation weakness on deeply nested object hierarchies.",
      "Option B (Correct): Flattening deeply nested schemas reduces structural depth and cognitive complexity, significantly improving the model's accuracy when emitting tool parameters.",
      "Option C: Relying on runtime retries introduces latency, cost, and fragile error parsing without fixing the underlying flawed schema architecture.",
      "Option D: Marking all deep properties as required increases API validation failures because the model still struggles to format 5-level deep JSON objects."
    ],
    "rationale": "LLMs experience higher parameter hallucination and omission rates with deeply nested structures. Flattening schemas into top-level properties improves structural formatting reliability.",
    "explanation": "Các mô hình ngôn ngữ lớn gặp khó khăn khi duy trì cú pháp và cung cấp đầy đủ các thuộc tính trong cấu trúc JSON lồng quá sâu (như 5 cấp). Việc phẳng hóa (flattening) schema thành các tham số cấp cao nhất giúp mô hình dễ dàng hiểu và tạo chính xác đối số cho công cụ mà không bị sót trường.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]