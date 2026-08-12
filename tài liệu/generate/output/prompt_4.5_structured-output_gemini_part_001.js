[
  {
    "id": "d4-b09-4.5-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-001",
    "scenarioSignature": {
      "testedPrinciple": "tool_use schema enforcement over text prompt instructions",
      "failureMode": "unstructured conversational prose preceding json output payload",
      "rootCause": "relying on text instruction instead of strict schema tool constraint",
      "requiredFix": "define result_schema tool and enforce model call"
    },
    "questionEN": "A developer configured an API client for an automated customer support triage system using a system prompt stating 'Respond only with valid JSON containing category and urgency fields'. In production monitoring across 10,000 requests, 15% of responses include conversational explanation prose before the JSON string, causing JSON.parse() syntax errors in the backend parser. Which modification guarantees strictly valid JSON output without conversational prefix text?",
    "question": "[d4-b09-4.5-001] Một nhà phát triển đã cấu hình API client cho hệ thống phân loại hỗ trợ khách hàng tự động bằng cách sử dụng system prompt chứa câu lệnh 'Respond only with valid JSON containing category and urgency fields'. Trong quá trình giám sát sản xuất qua 10,000 yêu cầu, 15% số phản hồi chứa văn bản giải thích dạng hội thoại trước chuỗi JSON, gây ra lỗi cú pháp JSON.parse() ở parser phía backend. Sửa đổi nào sau đây đảm bảo đầu ra luôn là JSON hợp lệ mà không có văn bản tiền tố hội thoại?",
    "optionsEN": [
      "A. Define a tool with a result_schema specifying category and urgency fields and enforce tool execution, forcing the model to emit a structured tool call.",
      "B. Add negative constraint 'Do not include any introductory text or explanation' to the system prompt and append 'Result:' at the end of the user message.",
      "C. Wrap the expected output format in custom <json_response> XML tags and instruct the model to put JSON inside the tags.",
      "D. Increase the temperature parameter to 0.0 and enable top_p sampling to eliminate non-deterministic markdown generation."
    ],
    "options": [
      "A. Định nghĩa một tool với result_schema chỉ định các trường category và urgency và bắt buộc thực thi tool, buộc mô hình xuất ra tool call có cấu trúc.",
      "B. Thêm ràng buộc tiêu cực 'Do not include any introductory text or explanation' vào system prompt và thêm 'Result:' ở cuối user message.",
      "C. Bọc định dạng đầu ra mong muốn trong các thẻ XML tùy chỉnh <json_response> và hướng dẫn mô hình đặt JSON bên trong các thẻ này.",
      "D. Tăng tham số temperature lên 0.0 và bật lấy mẫu top_p để loại bỏ việc sinh markdown không xác định."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Defining a tool schema via tool_use forces the model to emit arguments as pure structured JSON within a tool call payload, completely bypassing prose generation.",
      "Option B (Incorrect): Adding negative instructions in the system prompt remains a natural language prompt directive, which fails to guarantee syntax compliance and cannot eliminate the 15% conversational prose occurrence rate.",
      "Option C (Incorrect): Using XML tag wrappers still relies on text parsing and prompt adherence, which does not prevent conversational preamble text from being generated before or inside the tags.",
      "Option D (Incorrect): Adjusting temperature to 0.0 makes model sampling deterministic but does not enforce structural schema constraints or prevent prose generation before JSON output."
    ],
    "rationale": "Configuring tool_use with a defined tool schema is the strongest mechanism to guarantee structured JSON output. Unlike prompt instructions ('Return JSON') which are subject to conversational preamble generation, tool calls force the model to output arguments strictly compliant with the schema.",
    "explanation": "Phương án A đúng vì việc sử dụng tool_use với schema (result_schema) bắt buộc mô hình phải trả về dữ liệu dưới dạng tham số hàm (tool call) tuân thủ chính xác định dạng JSON, loại bỏ hoàn toàn khả năng sinh ra văn bản hội thoại dẫn dắt.\nPhương án B sai vì việc thêm câu lệnh cấm vào system prompt chỉ là hướng dẫn ngôn ngữ tự nhiên, không thể đảm bảo 100% về mặt cú pháp và không giải quyết triệt để 15% lỗi sinh prose.\nPhương án C sai vì dùng thẻ XML vẫn phụ thuộc vào việc mô hình tuân thủ prompt tự do và backend vẫn phải tự parse chuỗi văn bản, không ngăn được prose xuất hiện trước thẻ.\nPhương án D sai vì đặt temperature = 0.0 chỉ làm cho kết quả đầu ra mang tính xác định (deterministic) chứ không áp đặt ràng buộc cấu trúc cú pháp JSON.",
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  },
  {
    "id": "d4-b09-4.5-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-002",
    "scenarioSignature": {
      "testedPrinciple": "schema nesting depth limits in structured output tool definitions",
      "failureMode": "omission of required inner object fields in deep schema hierarchy",
      "rootCause": "complex schema depth exceeding model structural tracking capability",
      "requiredFix": "flatten object hierarchy to depth three or lower"
    },
    "questionEN": "An enterprise auditing system defines a result_schema tool with a nested JSON schema of depth 4 (report -> sections -> metrics -> historical_data). During validation against the JSON schema, backend logs show that the model frequently omits inner object fields such as timestamp and variance_score at the 4th nesting level. What is the recommended architectural refactoring to ensure reliable field completion?",
    "question": "[d4-b09-4.5-002] Một hệ thống kiểm toán doanh nghiệp định nghĩa tool result_schema với JSON schema lồng nhau có độ sâu 4 (report -> sections -> metrics -> historical_data). Trong quá trình xác thực với JSON schema, log ở backend cho thấy mô hình thường xuyên bỏ sót các trường đối tượng bên trong như timestamp và variance_score ở cấp lồng thứ 4. Giải pháp tái cấu trúc kiến trúc nào được khuyến nghị để đảm bảo việc điền trường dữ liệu đáng tin cậy?",
    "optionsEN": [
      "A. Add an explicit additionalProperties: true setting to all level 4 schemas to allow dynamic property injection during inference.",
      "B. Flatten the JSON schema hierarchy to a depth of 3 or less by replacing deeply nested sub-objects with top-level key-value references.",
      "C. Set the max_tokens API parameter to a higher limit so the model does not truncate output before reaching deep properties.",
      "D. Append a few-shot array containing 10 raw JSON examples directly into the system prompt without altering the schema structure."
    ],
    "options": [
      "A. Thêm thiết lập additionalProperties: true rõ ràng vào tất cả các schema cấp 4 để cho phép chèn thuộc tính động trong quá trình suy luận.",
      "B. Làm phẳng (flatten) hệ thống phân cấp JSON schema xuống độ sâu từ 3 trở xuống bằng cách thay thế các đối tượng con lồng sâu bằng các tham chiếu khóa-giá trị ở cấp cao hơn.",
      "C. Tăng tham số max_tokens API lên giới hạn cao hơn để mô hình không cắt tỉa đầu ra trước khi truy cập các thuộc tính sâu.",
      "D. Thêm một mảng few-shot chứa 10 ví dụ JSON thô trực tiếp vào system prompt mà không thay đổi cấu trúc schema."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A (Incorrect): Setting additionalProperties to true allows unlisted fields to pass validation but does not prevent the model from missing required defined inner fields like timestamp.",
      "Option B (Correct): Schema adherence degrades significantly when nesting depth exceeds 3 levels; flattening the schema to depth 3 or below restores reliable schema compliance for all inner fields.",
      "Option C (Incorrect): Increasing max_tokens addresses token truncation issues, whereas field omission in deep schemas is caused by cognitive complexity in structural tracking rather than token budget limits.",
      "Option D (Incorrect): Adding text few-shot examples into the system prompt does not resolve the structural complexity of a depth-4 schema in tool_use definitions and may introduce context bloat."
    ],
    "rationale": "Structured output tool schemas perform reliably up to nesting depth 3. When schema depth reaches level 4 or deeper, LLMs exhibit degraded field tracking and frequently omit inner object properties. Flattening the schema hierarchy to depth 3 or below solves this structural reliability issue.",
    "explanation": "Phương án B đúng vì khả năng tuân thủ schema của mô hình giảm mạnh khi độ sâu lồng nhau vượt quá 3 cấp (depth > 3). Việc làm phẳng (flatten) schema xuống độ sâu <= 3 giúp mô hình theo dõi và sinh đầy đủ các trường dữ liệu một cách đáng tin cậy.\nPhương án A sai vì additionalProperties: true chỉ cho phép bổ sung các trường ngoài danh sách chứ không ép mô hình phải sinh các trường bắt buộc đã bị bỏ sót.\nPhương án C sai vì tăng max_tokens xử lý việc bị cắt ngắn token chứ không giải quyết được nguyên nhân gốc rễ là mô hình làm mất khả năng theo dõi cấu trúc khi lồng quá sâu.\nPhương án D sai vì bổ sung ví dụ few-shot vào system prompt không thay đổi độ phức tạp của định nghĩa tool schema ở độ sâu cấp 4 và có thể gây lãng phí context window.",
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  }
]