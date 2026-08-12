[
  {
    "id": "d2-b06-2.6-013",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-013",
    "scenarioSignature": {
      "testedPrinciple": "partial failure tolerance in dynamic DAG tool execution",
      "failureMode": "entire workflow halt when tool returns partial errors alongside valid items",
      "rootCause": "treating top-level tool response error array as terminal failure without parsing success payloads",
      "requiredFix": "filter valid item payloads from partial tool responses and chain downstream tools only for successful branches"
    },
    "questionEN": "An AI workflow manager processes incoming telemetry data using batch_query_sensors(device_ids). The tool returns a JSON response containing valid_records (an array of telemetry payload objects with sensor_id and metric_val) alongside an errors array listing failed device lookups (e.g., ERR_OFFLINE_503). When errors is non-empty, the default orchestrator halts execution with an unhandled exception, preventing normalize_telemetry(payload) from running for valid devices. How should the tool chaining logic handle this partial failure response?",
    "question": "[d2-b06-2.6-013] Một trình quản lý quy trình AI xử lý dữ liệu đo xa telemetry bằng cách gọi batch_query_sensors(device_ids). Công cụ này trả về phản hồi JSON chứa valid_records (mảng đối tượng telemetry với sensor_id và metric_val) cùng với mảng errors liệt kê các thiết bị bị lỗi truy vấn (ví dụ: ERR_OFFLINE_503). Khi mảng errors không rỗng, bộ điều phối mặc định dừng thực thi với một ngoại lệ chưa được xử lý, ngăn normalize_telemetry(payload) chạy cho các thiết bị hợp lệ. Logic chuỗi công cụ (tool chaining) nên xử lý phản hồi thất bại một phần này như thế nào?",
    "optionsEN": [
      "A. Filter valid_records from the response payload, dispatch normalize_telemetry in parallel only for the successful branches, and append the errors array to the final report context without failing the pipeline.",
      "B. Retry batch_query_sensors with the full device_ids list until errors is empty before invoking normalize_telemetry for any returned items.",
      "C. Halt the entire execution graph immediately and emit a system-wide exception whenever the errors array contains at least one entry.",
      "D. Pass both valid_records and errors raw arrays directly into normalize_telemetry, allowing the downstream tool to parse and filter out invalid data."
    ],
    "options": [
      "A. Lọc valid_records từ payload phản hồi, kích hoạt normalize_telemetry song song chỉ cho các nhánh thành công, và đính kèm mảng errors vào ngữ cảnh báo cáo cuối cùng mà không làm hỏng pipeline.",
      "B. Thử lại batch_query_sensors với danh sách device_ids đầy đủ cho đến khi errors rỗng trước khi gọi normalize_telemetry cho bất kỳ mục nào.",
      "C. Tạm dừng ngay lập tức toàn bộ luồng thực thi và phát ra ngoại lệ trên toàn hệ thống bất cứ khi nào mảng errors chứa ít nhất một mục.",
      "D. Truyền trực tiếp cả mảng thô valid_records và errors vào normalize_telemetry, để công cụ hạ nguồn tự phân tích và lọc dữ liệu không hợp lệ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because isolating valid records allows downstream normalize_telemetry calls to process successful device data while logging errors separately, preventing partial failures from halting the entire workflow.",
      "Option B is incorrect because retrying offline devices repeatedly causes unnecessary API latency and blockages when devices remain unresponsive, delaying valid processing.",
      "Option C is incorrect because throwing a terminal error on partial failure discards usable data from valid devices, reducing operational availability and throughput.",
      "Option D is incorrect because passing unvalidated errors objects into normalize_telemetry breaks its input contract schema, causing downstream validation crashes."
    ],
    "rationale": "When an upstream tool returns partial results alongside an error array, the orchestrator must inspect the payload, isolate valid entity records, and proceed with downstream tool calls (normalize_telemetry) exclusively for valid branches. Non-fatal errors should be collected for context without aborting the entire execution DAG.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A đúng vì việc tách các bản ghi hợp lệ cho phép công cụ normalize_telemetry ở hạ nguồn xử lý dữ liệu thiết bị thành công trong khi ghi nhận các lỗi riêng biệt, ngăn chặn thất bại một phần làm dừng toàn bộ quy trình.\n- Option B sai vì việc thử lại các thiết bị ngoại tuyến (như ERR_OFFLINE_503) một cách lặp đi lặp lại gây ra độ trễ API và tắc nghẽn không cần thiết khi thiết bị vẫn không phản hồi.\n- Option C sai vì việc ném lỗi dừng hệ thống khi thất bại một phần sẽ hủy bỏ dữ liệu có thể sử dụng từ các thiết bị hợp lệ, làm giảm tính sẵn sàng và hiệu suất hoạt động.\n- Option D sai vì việc truyền các đối tượng errors chưa qua kiểm tra vào normalize_telemetry sẽ vi phạm hợp đồng đầu vào schema của công cụ hạ nguồn, gây ra lỗi crash kiểm tra dữ liệu.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  },
  {
    "id": "d2-b06-2.6-014",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-014",
    "questionEN": "An AI automated financial reporting pipeline chains two enterprise tools: get_transaction_history(account_id), which outputs timestamps in Unix epoch seconds (timestamp: 1718000000) and monetary amounts in USD cents (amount_cents: 15500), and generate_ledger_entry(iso_timestamp, amount_usd), which expects ISO 8601 strings (\"2024-06 - 10T06: 13: 20Z\") and float USD values (155.00). When the orchestrator passes raw outputs from get_transaction_history directly to generate_ledger_entry, the ledger service rejects calls with a 400 Validation Error. How should the boundary between these chained tools be designed?",
    "question": "[d2-b06-2.6-014] Một pipeline báo cáo tài chính tự động AI liên kết hai công cụ doanh nghiệp: get_transaction_history(account_id), xuất dấu thời gian ở dạng Unix epoch seconds (timestamp: 1718000000) và số tiền ở dạng cent USD (amount_cents: 15500), và generate_ledger_entry(iso_timestamp, amount_usd), công cụ yêu cầu chuỗi ISO 8601 (\"2024-06 - 10T06: 13: 20Z\") và giá trị USD số thực (155.00). Khi bộ điều phối truyền kết quả thô từ get_transaction_history trực tiếp sang generate_ledger_entry, dịch vụ sổ cái từ chối lời gọi với lỗi 400 Validation Error. Ranh giới giữa các công cụ trong chuỗi này nên được thiết kế như thế nào?",
    "optionsEN": [
      "A. Modify generate_ledger_entry schema to accept untyped union inputs so it auto-detects Unix epoch seconds and integer cents inside its core execution block.",
      "B. Insert an explicit format boundary transformer between the tools that converts Unix epoch seconds to ISO 8601 and converts USD cents to decimal USD values prior to invoking generate_ledger_entry.",
      "C. Prompt the LLM to output a floating-point string in its tool call arguments directly, skipping structural parameter validation on get_transaction_history.",
      "D. Execute generate_ledger_entry continuously in a retry loop until the backend ledger service automatically casts integer cents into floating-point dollars."
    ],
    "options": [
      "A. Sửa đổi schema của generate_ledger_entry để chấp nhận các đầu vào union không định kiểu nhằm tự động phát hiện Unix epoch seconds và số tiền cent bên trong khối thực thi chính.",
      "B. Chèn một bộ chuyển đổi ranh giới định dạng rõ ràng giữa các công cụ để chuyển đổi Unix epoch seconds sang ISO 8601 và chuyển đổi cent USD sang giá trị USD thập phân trước khi gọi generate_ledger_entry.",
      "C. Yêu cầu LLM xuất trực tiếp chuỗi số thực trong các tham số gọi công cụ của nó, bỏ qua việc kiểm tra tham số cấu trúc trên get_transaction_history.",
      "D. Thực thi generate_ledger_entry liên tục trong một vòng lặp thử lại cho đến khi dịch vụ sổ cái phía backend tự động ép kiểu số nguyên cent thành số thực dollar."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because altering downstream tool internal schemas to accept ambiguous untyped inputs weakens tool contracts and introduces hidden type errors.",
      "Option B is correct because normalizing mismatched units (USD cents to decimal USD) and date formats (epoch seconds to ISO 8601) at an explicit intermediary boundary preserves clean API schemas and prevents 400 validation failures.",
      "Option C is incorrect because forcing the LLM to guess unit conversions in prompt generation is unreliable and bypasses deterministic adapter transformations.",
      "Option D is incorrect because retrying requests with incompatible schema payloads will repeatedly fail with HTTP 400 validation errors without resolving the schema mismatch."
    ],
    "rationale": "When chained tools operate under incompatible unit or format contracts (e.g. epoch timestamps vs ISO 8601, cents vs dollars), data must be normalized at an explicit adapter/boundary stage between the tools. This guarantees schema compatibility without polluting individual tool responsibilities or relying on non-deterministic LLM formatting.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Option A sai vì việc sửa đổi schema của công cụ hạ nguồn để chấp nhận các đầu vào không định kiểu mơ hồ làm yếu hợp đồng công cụ và dễ dẫn đến lỗi kiểu dữ liệu ẩn.\\n- Option B đúng vì việc chuẩn hóa các đơn vị không tương thích (cent USD sang USD thập phân) và định dạng ngày tháng (epoch seconds sang ISO 8601) tại một ranh giới chuyển đổi trung gian rõ ràng giúp đảm bảo tính tương thích của schema và ngăn ngừa lỗi xác thực 400.\\n- Option C sai vì việc ép LLM tự đoán và chuyển đổi đơn vị trong prompt không đảm bảo tính tin cậy và bỏ qua các phép biến đổi adapter xác định.\\n- Option D sai vì việc thử lại các yêu cầu với payload schema không tương thích sẽ liên tục thất bại với lỗi 400 validation error mà không giải quyết được xung đột định dạng.",
    "scenarioSignature": {
      "testedPrinciple": "boundary normalization for incompatible data units and date formats in tool chains",
      "failureMode": "downstream tool schema rejection with HTTP 400 validation error",
      "rootCause": "direct forwarding of upstream outputs containing incompatible units and timestamps",
      "requiredFix": "apply explicit data normalization at tool chain boundaries before invoking downstream tools"
    },
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  }
]