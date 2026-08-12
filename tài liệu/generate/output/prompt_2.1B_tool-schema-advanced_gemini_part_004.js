[
  {
    "id": "d2-b04-B-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-007",
    "questionEN": "An automated document tagging service exposes an MCP tool tag_document(document_id: string, tags: string) to label legal contracts. In the JSON schema, the tags parameter is defined as type string. When an AI agent needs to assign multiple tags such as urgent and compliance to document DOC-8921, it passes tags: \"urgent, compliance\". The backend database query treats \"urgent, compliance\" as a single string, failing to match separate tag filters. How should the tool schema be updated to ensure the model passes structured multiple tags correctly?",
    "question": "[d2-b04-B-007] Một dịch vụ gắn thẻ tài liệu tự động cung cấp công cụ MCP tag_document(document_id: string, tags: string) để gắn nhãn cho hợp đồng pháp lý. Trong JSON schema, tham số tags được định nghĩa dưới dạng type string. Khi mô hình AI cần gắn nhiều thẻ như urgent và compliance cho tài liệu DOC-8921, nó truyền tags: \"urgent, compliance\". Truy vấn cơ sở dữ liệu backend xử lý \"urgent, compliance\" thành một chuỗi duy nhất, khiến bộ lọc thẻ riêng lẻ bị thất bại. Schema của công cụ nên được cập nhật như thế nào để đảm bảo mô hình truyền đúng cấu trúc danh sách thẻ?",
    "optionsEN": [
      "A. Add a regular expression pattern ^[a-zA-Z0-9,]+$ to the tags string schema so the model formats commas properly.",
      "B. Add an instruction in the tool description stating 'Pass multiple tags as a comma-separated string without spaces'.",
      "C. Update the tags parameter schema to type: array with items: { type: string } so the model supplies an array of strings.",
      "D. Implement a backend wrapper script that automatically splits any string parameter on commas before calling the database API."
    ],
    "options": [
      "A. Thêm mẫu biểu thức chính quy ^[a-zA-Z0-9,]+$ vào schema dạng string của tags để mô hình định dạng dấu phẩy chính xác.",
      "B. Thêm hướng dẫn vào mô tả công cụ chỉ định 'Truyền nhiều thẻ dưới dạng chuỗi phân tách bằng dấu phẩy không có khoảng trắng'.",
      "C. Cập nhật schema của tham số tags thành type: array với items: { type: string } để mô hình cung cấp một mảng các chuỗi.",
      "D. Triển khai một kịch bản bọc ở backend để tự động tách bất kỳ tham số chuỗi nào theo dấu phẩy trước khi gọi API cơ sở dữ liệu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because adding a regex pattern keeps the schema type as string, so the backend still receives a single concatenated string rather than distinct array elements.",
      "Option B is incorrect because natural language prompt instructions do not change the structural schema parsing; models may still fail or pass malformed strings under complex context.",
      "Option C is correct because updating the schema to type array with string items explicitly dictates the JSON structure, forcing the model to emit a valid array such as [\"urgent\", \"compliance\"].",
      "Option D is incorrect because modifying backend logic with string splitting creates fragile side-effects for legitimate strings containing commas and does not enforce schema correctness at the tool boundary."
    ],
    "rationale": "Declaring array parameters as string in JSON schema forces the model to resort to string concatenation (e.g., comma separation). Explicitly specifying type: array with items: { type: string } ensures the model emits structured JSON arrays, matching backend expectations and enabling precise filtering.",
    "explanation": "Phân tích chi tiết cho d2-b04-B-007:\\n- Phương án A sai vì việc thêm pattern regex chỉ kiểm tra định dạng chuỗi chứ không thay đổi kiểu dữ liệu thành mảng. Backend vẫn nhận được một chuỗi duy nhất \"urgent, compliance\".\\n- Phương án B sai vì việc dùng prompt hướng dẫn trong mô tả không đảm bảo tính toàn vẹn cấu trúc dữ liệu và dễ bị vi phạm khi mô hình xử lý ngữ cảnh phức tạp.\\n- Phương án C ĐÚNG vì khai báo type: array với items: { type: string } theo chuẩn JSON Schema / OpenAPI sẽ buộc mô hình AI sinh ra cấu trúc mảng chuẩn [\"urgent\", \"compliance\"], giúp backend xử lý đúng từng thẻ riêng biệt.\\n- Phương án D sai vì việc tự động split chuỗi ở backend là giải pháp tình thế (workaround) thiếu tin cậy, có thể gây lỗi nếu nội dung thẻ bản thân nó có chứa dấu phẩy.",
    "scenarioSignature": {
      "testedPrinciple": "array parameter type specification in tool schema",
      "failureMode": "model concatenates multiple values into single string",
      "rootCause": "parameter declared as string instead of array of strings in JSON schema",
      "requiredFix": "change parameter schema type to array of strings"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-B-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-008",
    "scenarioSignature": {
      "testedPrinciple": "tool side effects and idempotency documentation",
      "failureMode": "duplicate financial transactions charged during tool retry execution",
      "rootCause": "tool description lacks idempotency key specification and retry safety documentation",
      "requiredFix": "document idempotency behavior and add mandatory idempotency key parameter to tool schema"
    },
    "questionEN": "An AI customer support agent uses an MCP tool send_payment(account_id: string, amount: number) to process customer refunds. During execution for account ACC-4491 with amount 150.00, a network latency delay triggers a client-side timeout error before receiving a response. Because the tool description does not specify idempotency safety or retry behavior, the agent retries send_payment three times, causing three separate charges totaling 450.00 to the account. How should the tool design be modified to prevent duplicate payment execution on retries?",
    "question": "[d2-b04-B-008] Một tác vụ hỗ trợ khách hàng AI sử dụng công cụ MCP send_payment(account_id: string, amount: number) để xử lý hoàn tiền. Trong quá trình thực thi cho tài khoản ACC-4491 với số tiền 150.00, sự cố trễ mạng kích hoạt lỗi client-side timeout trước khi nhận được phản hồi. Do mô tả công cụ không chỉ định tính an toàn lặp (idempotency) hoặc hành vi thử lại (retry), tác vụ đã thử lại send_payment ba lần, dẫn đến ba khoản tính phí riêng biệt tổng cộng 450.00. Thiết kế công cụ nên được sửa đổi như thế nào để ngăn ngừa việc thực thi thanh toán trùng lặp khi thử lại?",
    "optionsEN": [
      "A. Increase the HTTP client connection timeout setting on the payment service wrapper from 5 seconds to 60 seconds.",
      "B. Wrap the send_payment backend call inside a local database transaction to roll back payment processing upon timeout.",
      "C. Modify the send_payment tool schema to swallow timeout errors and return an empty HTTP 200 response.",
      "D. Document side-effect non-idempotency in the description and require a unique idempotency_key parameter in the tool schema."
    ],
    "options": [
      "A. Tăng thời gian chờ kết nối HTTP client trên service wrapper thanh toán từ 5 giây lên 60 giây.",
      "B. Bọc lệnh gọi backend send_payment trong một transaction cơ sở dữ liệu cục bộ để hoàn tác xử lý thanh toán khi hết giờ.",
      "C. Sửa đổi schema công cụ send_payment để bỏ qua lỗi timeout và trả về phản hồi HTTP 200 rỗng.",
      "D. Trong mô tả công cụ ghi rõ tác dụng phụ (side-effect) và yêu cầu tham số idempotency_key duy nhất trong schema công cụ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because increasing timeouts reduces latency failures but does not solve duplicate billing when timeouts do occur and retries take place.",
      "Option B is incorrect because local database transactions cannot roll back external third-party payment gateway calls once HTTP requests have been transmitted.",
      "Option C is incorrect because suppressing timeout errors hides real infrastructure failures and misinforms the model about the true transaction execution state.",
      "Option D is correct because adding an idempotency_key parameter and explicitly documenting non-idempotent side effects enables the payment gateway to deduplicate retried requests safely."
    ],
    "rationale": "Tools with non-idempotent side effects (e.g., financial transactions) must explicitly document retry safety in their description and require an idempotency key in their schema. This allows the model to pass a unique key on initial execution and reuse the same key on retries, preventing duplicate transactions.",
    "explanation": "Phân tích chi tiết cho d2-b04-B-008:\n- Phương án A sai vì việc tăng timeout chỉ giảm tần suất gặp trễ mạng chứ không giải quyết được vấn đề xử lý trùng lặp khi rủi ro timeout vẫn xảy ra.\n- Phương án B sai vì transaction của cơ sở dữ liệu cục bộ không thể rollback các lệnh gọi API đã gửi tới cổng thanh toán bên ngoài.\n- Phương án C sai vì việc nuốt lỗi (suppress error) làm sai lệch trạng thái thực tế của giao dịch, khiến tác vụ giả định thanh toán thành công trong khi hệ thống gặp sự cố.\n- Phương án D ĐÚNG vì việc tài liệu hóa tác dụng phụ (side-effect) và bổ sung tham số idempotency_key trong schema giúp cổng thanh toán nhận biết các yêu cầu thử lại có cùng key, từ đó ngăn chặn việc trừ tiền trùng lặp.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]