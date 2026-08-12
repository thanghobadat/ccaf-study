[
  {
    "id": "d4-b09-4.5-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-007",
    "scenarioSignature": {
      "testedPrinciple": "client-side runtime schema validation after tool_use receipt",
      "failureMode": "application crash during JSON payload ingestion",
      "rootCause": "reliance on tool_use without client-side output validation",
      "requiredFix": "validate output schema programmatically before passing payload to downstream service"
    },
    "questionEN": "An e-commerce backend service, OrderIngestionService, uses Claude 3.5 Sonnet via tool_use with a tool schema defining fields like order_id and item_count. The engineering team skipped client-side runtime schema validation under the assumption that tool_use guarantees schema compliance. During high-volume processing, occasional type mismatches (such as item_count arriving as a string instead of an integer) cause TypeError exceptions that crash the pipeline. How should the team resolve this architectural vulnerability?",
    "question": "[d4-b09-4.5-007] Một dịch vụ backend thương mại điện tử, OrderIngestionService, sử dụng Claude 3.5 Sonnet thông qua tool_use với schema định nghĩa các trường như order_id và item_count. Đội ngũ kỹ thuật đã bỏ qua bước kiểm tra schema (schema validation) ở phía client vì cho rằng tool_use đã đảm bảo tuân thủ schema tuyệt đối. Trong quá trình xử lý tải cao, thỉnh thoảng xuất hiện bất đồng kiểu dữ liệu (như item_count trả về chuỗi thay vì số nguyên) gây ra ngoại lệ TypeError làm sập đường ống xử lý. Đội ngũ nên giải quyết lỗ hổng kiến trúc này như thế nào?",
    "optionsEN": [
      "A. Increase the model temperature parameter to 0.7 to enforce stricter adherence to JSON primitive data types.",
      "B. Enable prompt caching on the system prompt containing the JSON structure instructions to prevent field drift.",
      "C. Implement programmatic runtime validation (e.g., via Pydantic or JS schema validator) after receiving the tool_use response before forwarding payloads to OrderIngestionService.",
      "D. Replace tool_use schema enforcement with legacy assistant message prefilling using an opening brace '{'."
    ],
    "options": [
      "A. Tăng tham số temperature của mô hình lên 0.7 để bắt buộc tuân thủ nghiêm ngặt hơn các kiểu dữ liệu nguyên thủy trong JSON.",
      "B. Bật prompt caching cho system prompt chứa hướng dẫn cấu trúc JSON để ngăn chặn sự lệch vị trí các trường.",
      "C. Triển khai kiểm tra schema thời gian chạy bằng mã lập trình (ví dụ: qua Pydantic hoặc bộ kiểm tra JS schema) sau khi nhận phản hồi tool_use trước khi chuyển dữ liệu đến OrderIngestionService.",
      "D. Thay thế cơ chế tool_use bằng kỹ thuật cũ là điền trước (prefilling) lượt thoại của assistant bằng dấu mở ngoặc nhọn '{'."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Increasing temperature increases sampling variance and does not guarantee strict type adherence during tool call generation.",
      "Option B is incorrect: Prompt caching reduces latency and token cost for repeated system prompts but has no impact on runtime data validation or type checking.",
      "Option C is correct: While tool_use enforces structural JSON syntax, LLM outputs can still contain unexpected types or malformed values; client-side runtime validation using Pydantic or AJV ensures invalid payloads are caught before reaching OrderIngestionService.",
      "Option D is incorrect: Prefilling assistant responses with '{' is an outdated prompt technique that lacks strict schema constraints and provides weaker output validation than tool_use."
    ],
    "rationale": "tool_use provides schema guidance to the model, but client-side applications must never trust LLM outputs blindly without post-receipt validation. Implementing runtime schema validation (e.g., using Pydantic) ensures type mismatches or unexpected values are caught and safely handled before reaching OrderIngestionService.",
    "explanation": "Phân tích các phương án:\n- Phương án A sai: Việc tăng temperature tăng độ ngẫu nhiên của kết quả, không giúp đảm bảo kiểm tra kiểu dữ liệu.\n- Phương án B sai: Prompt caching giúp tối ưu chi phí và độ trễ cho system prompt nhưng không giải quyết được việc kiểm tra tính hợp lệ của dữ liệu đầu ra ở thời gian chạy.\n- Phương án C đúng: tool_use hỗ trợ ép cấu trúc JSON nhưng mô hình vẫn có thể tạo ra các giá trị bị sai kiểu dữ liệu. Việc thực hiện runtime validation phía client (như sử dụng Pydantic hay AJV) sau khi nhận phản hồi tool_use là bước bắt buộc để đảm bảo dữ liệu hợp lệ trước khi gửi đến OrderIngestionService.\n- Phương án D sai: Prefilling lượt thoại assistant bằng '{' là kỹ thuật cũ, kém tin cậy hơn nhiều so với tool_use và không hề cung cấp khả năng tự động kiểm tra schema.",
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  },
  {
    "id": "d4-b09-4.5-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-008",
    "questionEN": "A logistics platform worker, ShipmentParserWorker, passes incoming customer emails to Claude 3.5 Sonnet with three tools configured in the request: extract_order, summarize_text, and search_inventory. When customer emails include long conversational narratives, the model frequently calls summarize_text instead of extract_order, breaking downstream order processing. How should the engineering team configure the API call to guarantee that Claude calls extract_order?",
    "question": "[d4-b09-4.5-008] Một tiến trình làm việc trong nền tảng kho vận, ShipmentParserWorker, truyền email khách hàng đến Claude 3.5 Sonnet với ba công cụ được cấu hình trong yêu cầu: extract_order, summarize_text và search_inventory. Khi email khách hàng chứa các đoạn văn kể chuyện dài, mô hình thường xuyên gọi công cụ summarize_text thay vì extract_order, làm gián đoạn quy trình xử lý đơn hàng phía sau. Đội ngũ kỹ thuật nên cấu hình cuộc gọi API như thế nào để đảm bảo tuyệt đối Claude sẽ gọi công cụ extract_order?",
    "optionsEN": [
      "A. Set additionalProperties to false in all tool schemas to disable non-matching tool invocations.",
      "B. Reduce the max_tokens parameter to prevent the model from generating long summaries in summarize_text.",
      "C. Add a system prompt directive instructing the model to always prioritize extract_order over other tools.",
      "D. Pass tool_choice: {\"type\": \"tool\", \"name\": \"extract_order\"} in the API request payload."
    ],
    "options": [
      "A. Đặt additionalProperties thành false trong tất cả schema của công cụ để vô hiệu hóa việc gọi các công cụ không khớp.",
      "B. Giảm tham số max_tokens để ngăn mô hình tạo ra các bản tóm tắt dài trong công cụ summarize_text.",
      "C. Thêm chỉ thị trong system prompt yêu cầu mô hình luôn ưu tiên công cụ extract_order hơn các công cụ khác.",
      "D. Truyền tham số tool_choice: {\"type\": \"tool\", \"name\": \"extract_order\"} trong payload của cuộc gọi API."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Modifying additionalProperties affects property validation within a single tool's schema but does not govern which tool the model selects from the tools array.",
      "Option B is incorrect: Lowering max_tokens cuts off generation premature output and does not force the model to pick a specific tool call.",
      "Option C is incorrect: Relying on system prompt instructions while keeping tool_choice set to auto remains non-deterministic because semantic overlap in user inputs can still trigger other available tools.",
      "Option D is correct: Setting tool_choice to {\"type\": \"tool\", \"name\": \"extract_order\"} forces Claude to execute extract_order regardless of input text semantic cues or competing tools defined in the request."
    ],
    "rationale": "When multiple tools are provided with default tool_choice: \"auto\", Claude chooses tools dynamically based on input semantics. To guarantee that a specific tool (extract_order) is always called, the API request must explicitly set tool_choice: {\"type\": \"tool\", \"name\": \"extract_order\"}.",
    "explanation": "Phân tích các phương án:\\n- Phương án A sai: additionalProperties: false giới hạn việc không thêm các trường lạ vào trong schema của một công cụ, không ảnh hưởng đến việc mô hình chọn công cụ nào trong danh sách.\\n- Phương án B sai: Giảm max_tokens chỉ làm cắt ngắn đầu ra, không quyết định được lựa chọn công cụ của mô hình.\\n- Phương án C sai: Việc chỉ ghi hướng dẫn trong system prompt khi tham số tool_choice vẫn là \"auto\" (mặc định) vẫn không đảm bảo tính nhất quán tuyệt đối khi văn bản đầu vào có xu hướng kích hoạt công cụ khác.\\n- Phương án D đúng: Việc thiết lập tham số API tool_choice: {\"type\": \"tool\", \"name\": \"extract_order\"} ép buộc Claude phải gọi đúng công cụ extract_order, loại bỏ hoàn toàn rủi ro gọi nhầm sang công cụ khác.",
    "scenarioSignature": {
      "testedPrinciple": "explicit tool selection enforcement via tool_choice parameter",
      "failureMode": "execution of wrong tool call from multiple registered tools",
      "rootCause": "default automatic tool selection behavior with competing tool definitions",
      "requiredFix": "enforce tool execution by specifying tool_choice parameter with target tool name"
    },
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  }
]