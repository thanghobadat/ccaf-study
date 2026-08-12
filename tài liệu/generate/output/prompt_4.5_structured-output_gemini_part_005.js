[
  {
    "id": "d4-b09-4.5-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-009",
    "scenarioSignature": {
      "testedPrinciple": "tool_use schema enforcement compatibility with assistant prefilling",
      "failureMode": "malformed JSON and tool call rejection",
      "rootCause": "conflicting prefix injection during tool_use structured generation",
      "requiredFix": "remove assistant message prefilling when tool_use schema is active"
    },
    "questionEN": "A backend engineer at FinTech Analytics configures an API request to Claude 3.5 Sonnet to output financial reports using tool_use with a report_schema function definition. To ensure the model starts immediately with valid JSON, the engineer prefills the assistant turn with {\"status\": \"success\". When executing the API call, the model output breaks, returning a raw text block mixed with partial tool call blocks that fail validation in the SDK response parser. What is the root cause of this failure?",
    "question": "[d4-b09-4.5-009] Một kỹ sư backend tại FinTech Analytics cấu hình yêu cầu API gửi tới Claude 3.5 Sonnet để xuất báo cáo tài chính bằng tool_use với định nghĩa hàm report_schema. Để đảm bảo mô hình bắt đầu ngay bằng JSON hợp lệ, kỹ sư này đã prefill lượt của assistant bằng {\"status\": \"success\". Khi thực thi lời gọi API, đầu ra của mô hình bị lỗi, trả về một khối văn bản thô lẫn lộn với các khối tool call một phần gây thất bại khi parser SDK kiểm tra. Nguyên nhân gốc rễ của sự cố này là gì?",
    "optionsEN": [
      "A. Prefilling the assistant response with custom JSON tokens conflicts with tool_use schema enforcement mechanisms, leading to protocol mismatch and output format corruption.",
      "B. Claude models do not support tool_use schema enforcement unless temperature is explicitly locked to 0.0.",
      "C. The report_schema definition contained fields with scalar string types, which automatically disables assistant turn prefilling.",
      "D. The API endpoint requires setting additionalProperties: true whenever prefilling is combined with defined tools."
    ],
    "options": [
      "A. Việc prefill phản hồi của assistant bằng các token JSON tùy chỉnh gây xung đột với cơ chế thực thi schema của tool_use, dẫn đến bất đồng bộ giao thức và làm hỏng định dạng đầu ra.",
      "B. Các mô hình Claude không hỗ trợ thực thi schema qua tool_use trừ khi tham số temperature được khóa cố định ở mức 0.0.",
      "C. Định nghĩa report_schema chứa các trường dạng chuỗi đơn giản, điều này tự động vô hiệu hóa tính năng prefill của lượt assistant.",
      "D. Endpoint API yêu cầu bật additionalProperties: true bất cứ khi nào kết hợp prefill với các công cụ đã được định nghĩa."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: When using tool_use for structured output, the API constructs a structured tool call payload rather than raw text JSON; prefixing the assistant response with { interferes with the tool call serialization syntax and causes undefined output behavior.",
      "Option B is incorrect: tool_use schema enforcement functions independently of temperature settings, making temperature irrelevant to this prefill syntax collision.",
      "Option C is incorrect: Field datatypes inside the tool schema have no impact on whether assistant message prefilling is permitted or how it interacts with tool calls.",
      "Option D is incorrect: additionalProperties controls schema strictness for unlisted fields and does not resolve or relate to the prefill collision with tool call blocks."
    ],
    "rationale": "Prefilling assistant turns with { was a legacy technique for raw text JSON output. When combined with tool_use schema enforcement, it breaks the API protocol because tool calls follow a distinct payload block format rather than standard assistant text completions.",
    "explanation": "Lựa chọn A là đúng: Kỹ thuật prefill lượt assistant bằng ký tự { là phương pháp cũ dành cho việc sinh văn bản thô JSON. Khi kết hợp với tool_use, API kỳ vọng mô hình tạo ra khối tool_use chuyên biệt thay vì phản hồi văn bản thông thường; việc chèn trước văn bản làm xung đột giao thức và gây ra lỗi định dạng.\nLựa chọn B sai: Cơ chế thực thi schema qua tool_use hoạt động độc lập với tham số temperature.\nLựa chọn C sai: Kiểu dữ liệu của các trường trong schema không ảnh hưởng hay vô hiệu hóa tính năng prefill.\nLựa chọn D sai: Thuộc tính additionalProperties kiểm soát các trường không được liệt kê trong schema, không liên quan đến lỗi xung đột giữa prefill và tool call.",
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  },
  {
    "id": "d4-b09-4.5-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-010",
    "scenarioSignature": {
      "testedPrinciple": "schema depth optimization for tool_use structured output",
      "failureMode": "schema compliance degradation and field hallucinations in deep JSON structures",
      "rootCause": "high structural complexity exceeding depth threshold (> 3 levels) in LLM attention",
      "requiredFix": "flatten deeply nested object hierarchies into underscored key names"
    },
    "questionEN": "An AI developer building an e-commerce order processing pipeline with Claude 3.5 Sonnet defines a submit_order tool schema with a 5-level nested JSON structure (order.customer.shipping.address.zip). During production integration, the model regularly omits deeply nested required fields or fails schema validation retries. Why should the developer flatten this schema to top-level key names (e.g., address_city_zip)?",
    "question": "[d4-b09-4.5-010] Một nhà phát triển AI xây dựng đường ống xử lý đơn hàng thương mại điện tử với Claude 3.5 Sonnet định nghĩa một schema công cụ submit_order có cấu trúc JSON lồng ghép 5 cấp (order.customer.shipping.address.zip). Trong quá trình tích hợp thực tế, mô hình thường xuyên bỏ sót các trường bắt buộc nằm ở cấp sâu hoặc thất bại khi thử lại việc kiểm định schema. Tại sao nhà phát triển nên làm phẳng schema này thành các tên key cấp hàng đầu (ví dụ: address_city_zip)?",
    "optionsEN": [
      "A. Top-level keys eliminate the need for the required array in the JSON schema specification.",
      "B. Object nesting depth greater than 3 degrades model attention and schema adherence, whereas flattened schemas reduce generation complexity and field omissions.",
      "C. API request payloads enforce a hard limit of 2 nested levels for all custom tool_use schemas.",
      "D. Flattening schemas automatically converts invalid field datatypes into string format during tool invocation."
    ],
    "options": [
      "A. Các key ở cấp hàng đầu (top-level) giúp loại bỏ hoàn toàn nhu cầu khai báo mảng required trong định nghĩa JSON schema.",
      "B. Độ sâu lồng ghép đối tượng vượt quá 3 cấp làm giảm khả năng tập trung và tuân thủ schema của mô hình, trong khi schema được làm phẳng giúp giảm độ phức tạp sinh dữ liệu và hạn chế bỏ sót trường.",
      "C. Payload của yêu cầu API áp đặt giới hạn cứng tối đa 2 cấp lồng ghép cho tất cả các tool_use schema tùy chỉnh.",
      "D. Việc làm phẳng schema tự động chuyển đổi các kiểu dữ liệu trường không hợp lệ thành định dạng chuỗi trong quá trình gọi công cụ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: The required array is still necessary in flattened schemas to ensure the model produces mandatory key-value pairs.",
      "Option B is correct: Schema performance and structural compliance degrade when JSON nesting depth exceeds 3 levels; flattening keys like address_city_zip simplifies attention mechanisms and significantly lowers validation retry rates.",
      "Option C is incorrect: The Anthropic API permits arbitrary nesting depths; the issue is model compliance quality rather than an API hard rejection limit.",
      "Option D is incorrect: Schema flattening alters hierarchy and key naming, but does not perform dynamic runtime type casting or type conversion."
    ],
    "rationale": "Deeply nested JSON schemas (depth > 3) impose extra cognitive/attentional load on LLMs during tool generation, leading to missing keys or validation failures. Flattening hierarchy into key paths like address_city_zip preserves schema semantics while guaranteeing higher adherence.",
    "explanation": "Lựa chọn A sai: Mảng required vẫn cần thiết đối với schema đã làm phẳng để đảm bảo mô hình bắt buộc phải trả về các cặp key-value quan trọng.\nLựa chọn B là đúng: Tuân thủ schema và hiệu suất sinh của mô hình sẽ suy giảm khi độ sâu lồng ghép JSON vượt quá 3 cấp; việc làm phẳng cấu trúc thành các key dạng address_city_zip giúp đơn giản hóa phân bổ chú ý của mô hình và giảm đáng kể tỷ lệ lỗi kiểm định.\nLựa chọn C sai: API Anthropic không giới hạn cứng 2 cấp lồng ghép; vấn đề nằm ở chất lượng tuân thủ của mô hình chứ không phải giới hạn kỹ thuật từ API.\nLựa chọn D sai: Làm phẳng schema chỉ thay đổi phân cấp và tên key, không thực hiện chuyển đổi kiểu dữ liệu động lúc runtime.",
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  }
]