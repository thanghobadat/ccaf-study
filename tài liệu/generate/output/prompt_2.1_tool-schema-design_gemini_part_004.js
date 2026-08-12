[
  {
    "id": "d2-b04-new-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-007",
    "questionEN": "An automated financial reporting agent uses an MCP tool schedule_report to generate scheduled analytics outputs. In the tool's JSON schema, the format parameter is defined with \"type\": \"boolean\" (intended as true for PDF and false for CSV). When users request reports in Excel (xlsx), the model consistently outputs schedule_report(format=true) and generates a PDF, because a boolean field cannot express three distinct output states. How should the tool schema be redesigned to support all required formats?",
    "question": "[d2-b04-new-007] Một agent báo cáo tài chính tự động sử dụng công cụ MCP schedule_report để tạo đầu ra phân tích theo lịch trình. Trong JSON schema của công cụ, tham số format được định nghĩa với \"type\": \"boolean\" (với ý định true cho PDF và false cho CSV). Khi người dùng yêu cầu báo cáo dưới dạng Excel (xlsx), mô hình liên tục xuất ra schedule_report(format=true) và tạo tệp PDF, do trường boolean không thể biểu thị ba trạng thái đầu ra riêng biệt. Schema của công cụ nên được thiết kế lại như thế nào để hỗ trợ tất cả các định dạng được yêu cầu?",
    "optionsEN": [
      "A. Change the parameter description of format to state that true represents PDF, false represents CSV, and omitting the field represents Excel.",
      "B. Keep format as boolean in the JSON schema and add prompt instructions directing the model to pass a string value \"excel\" when Excel format is requested.",
      "C. Redefine the format parameter in the tool schema to \"type\": \"string\" with an \"enum\": [\"pdf\", \"csv\", \"excel\"] constraint.",
      "D. Split schedule_report into three distinct tools without parameters: schedule_pdf_report, schedule_csv_report, and schedule_excel_report."
    ],
    "options": [
      "A. Thay đổi mô tả tham số format để ghi rõ true là PDF, false là CSV và bỏ qua trường này đại diện cho Excel.",
      "B. Giữ nguyên format là boolean trong JSON schema và thêm hướng dẫn vào prompt để chỉ dẫn mô hình truyền giá trị chuỗi \"excel\" khi yêu cầu định dạng Excel.",
      "C. Định nghĩa lại tham số format trong schema của công cụ thành \"type\": \"string\" kèm theo ràng buộc \"enum\": [\"pdf\", \"csv\", \"excel\"].",
      "D. Tách schedule_report thành ba công cụ riêng biệt không có tham số: schedule_pdf_report, schedule_csv_report và schedule_excel_report."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Relying on omitting a boolean parameter to represent a third state creates ambiguous schema semantics and does not provide explicit validation for Excel format requests.",
      "Option B is incorrect: Prompting the model to send a string \"excel\" when the schema enforces \"type\": \"boolean\" causes runtime JSON Schema validation failures.",
      "Option C is correct: Changing the schema type to string and defining an enum with [\"pdf\", \"csv\", \"excel\"] allows the model to select among all three valid format states with strict schema validation.",
      "Option D is incorrect: Creating separate tools for every format parameter variation causes tool definition bloat and redundant implementations when a single parameter with enum constraints handles the choice cleanly."
    ],
    "rationale": "When a tool parameter requires selecting from a fixed set of more than two values, a boolean type is insufficient. Using a string type with an explicit enum constraint in the JSON schema enables the model to reason about all available choices and ensures runtime validation blocks invalid format selections.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A sai: Việc dựa vào việc bỏ qua một tham số boolean để biểu thị trạng thái thứ ba tạo ra ngữ nghĩa schema mơ hồ và không cung cấp xác thực rõ ràng cho yêu cầu định dạng Excel.\\n- Lựa chọn B sai: Đưa hướng dẫn trong prompt bảo mô hình gửi một chuỗi \"excel\" khi schema đang ép kiểu \"type\": \"boolean\" sẽ gây ra lỗi xác thực JSON Schema ở thời điểm thực thi (runtime error).\\n- Lựa chọn C đúng: Thay đổi kiểu schema thành string và định nghĩa một enum với [\"pdf\", \"csv\", \"excel\"] cho phép mô hình chọn chính xác một trong ba trạng thái định dạng hợp lệ với xác thực schema nghiêm ngặt.\\n- Lựa chọn D sai: Việc tách thành các công cụ riêng biệt cho từng biến thể tham số định dạng gây phình to danh sách công cụ và dư thừa mã nguồn không cần thiết khi một tham số duy nhất chứa ràng buộc enum có thể xử lý việc này một cách sạch sẽ.",
    "scenarioSignature": {
      "testedPrinciple": "enum schema constraint for multi-option parameters",
      "failureMode": "model defaults to single state when schema uses boolean for multi-state choice",
      "rootCause": "parameter schema uses boolean type for a choice requiring three supported formats",
      "requiredFix": "replace boolean parameter with string enum declaring all valid format choices"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-new-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-008",
    "questionEN": "An e-commerce customer support agent integrates an MCP payment gateway tool defined as process_payment(amount: number, currency: string, payment_method_id: string) with the schema description set to \"description\": \"processes a payment\". During checkout resolution workflows, the agent frequently hesitates to call the tool or fails to recover from declined transactions, causing a 34% drop in automated checkout completions because the model lacks context on required input formats, expected return structures, and potential error codes like CARD_DECLINED. How should the tool schema description be improved to resolve this issue?",
    "question": "[d2-b04-new-008] Một agent hỗ trợ khách hàng thương mại điện tử tích hợp công cụ cổng thanh toán MCP được định nghĩa là process_payment(amount: number, currency: string, payment_method_id: string) với mô tả schema được đặt là \"description\": \"processes a payment\". Trong các quy trình xử lý thanh toán, agent thường xuyên ngần ngại không gọi công cụ hoặc không thể phục hồi từ các giao dịch bị từ chối, dẫn đến tỷ lệ hoàn tất thanh toán tự động giảm 34% do mô hình thiếu ngữ cảnh về định dạng đầu vào bắt buộc, cấu trúc trả về kỳ vọng và các mã lỗi có thể xảy ra như CARD_DECLINED. Mô tả schema của công cụ nên được cải thiện như thế nào để giải quyết vấn đề này?",
    "optionsEN": [
      "A. Append instructions to the agent's system prompt stating: 'Always invoke process_payment during checkout and handle any returned failures.'",
      "B. Rename the tool identifier from process_payment to process_credit_card_or_debit_card_payment_v2 while retaining the existing description string.",
      "C. Add server-side console logging inside the backend process_payment execution code to record input arguments and HTTP status codes.",
      "D. Update the schema description to state what the tool does, when to use it, required input formats, return payload structure, and possible error codes."
    ],
    "options": [
      "A. Thêm hướng dẫn vào system prompt của agent: 'Luôn gọi process_payment trong quá trình thanh toán và xử lý mọi thất bại trả về.'",
      "B. Đổi tên định danh công cụ từ process_payment thành process_credit_card_or_debit_card_payment_v2 trong khi vẫn giữ nguyên chuỗi mô tả hiện tại.",
      "C. Thêm ghi log phía server bên trong mã thực thi backend của process_payment để ghi lại các tham số đầu vào và mã trạng thái HTTP.",
      "D. Cập nhật mô tả schema để nêu rõ công cụ làm gì, khi nào nên sử dụng, định dạng đầu vào bắt buộc, cấu trúc dữ liệu trả về và các mã lỗi có thể xảy ra."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Modifying the system prompt does not fix the circular, context-poor tool description, and fails to inform the model about exact error structures or parameter constraints inside the tool schema.",
      "Option B is incorrect: Renaming the function name to a longer identifier does not provide the model with essential information regarding parameter rules, output schemas, or failure modes.",
      "Option C is incorrect: Server-side execution logs assist backend developers with debugging but provide zero schema-level guidance to the LLM during model inference.",
      "Option D is correct: Providing a comprehensive tool description detailing purpose, operational context, parameter constraints, return payload shape, and potential error codes enables the LLM to call the tool correctly and handle exceptions gracefully."
    ],
    "rationale": "A circular tool description like 'processes a payment' provides no meaningful semantic context to the LLM. High-quality tool schema descriptions must explicitly state the tool's core function, prerequisite conditions, input formatting rules, output payload structure, and possible error status codes so the model can invoke the tool correctly and execute fallback logic upon error.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A sai: Việc sửa đổi system prompt không khắc phục được mô tả công cụ mang tính vòng lặp, thiếu ngữ cảnh, và không thể cung cấp cho mô hình thông tin về cấu trúc lỗi hoặc ràng buộc tham số bên trong tool schema.\\n- Lựa chọn B sai: Việc đổi tên hàm thành một định danh dài hơn không cung cấp cho mô hình các thông tin thiết yếu về quy tắc tham số, schema đầu ra hoặc các chế độ thất bại.\\n- Lựa chọn C sai: Nhật ký thực thi phía server giúp các lập trình viên backend gỡ lỗi nhưng không cung cấp bất kỳ hướng dẫn cấp schema nào cho LLM trong quá trình suy luận của mô hình.\\n- Lựa chọn D đúng: Việc cung cấp mô tả công cụ toàn diện chi tiết về mục đích, ngữ cảnh vận hành, ràng buộc tham số, hình dạng dữ liệu trả về và các mã lỗi có thể xảy ra cho phép LLM gọi công cụ một cách chính xác và xử lý các ngoại lệ một cách êm đẹp.",
    "scenarioSignature": {
      "testedPrinciple": "comprehensive tool schema description design",
      "failureMode": "model fails to invoke tool or passes improper arguments due to vague description",
      "rootCause": "tool description contains circular definition missing purpose inputs outputs and error states",
      "requiredFix": "rewrite tool description to explicitly detail purpose parameter constraints output structure and potential error codes"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]