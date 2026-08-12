[
  {
    "id": "d2-b04-2.2-003",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-003",
    "questionEN": "An enterprise HR management AI assistant uses an MCP tool search_employee(query: string, department: string). Currently, when a search yields no records because the employee does not exist, the tool returns an empty JSON object {}. However, when the calling hiring manager lacks RBAC clearance to view records in a restricted department (such as Executive Leadership), the tool also returns {}. As a result, the AI agent informs hiring managers that requested employees do not exist in the company database, causing erroneous recruitment decisions. How should search_employee() be redesigned to resolve this ambiguity?",
    "question": "[d2-b04-2.2-003] Một trợ lý AI quản lý nhân sự doanh nghiệp sử dụng MCP tool search_employee(query: string, department: string). Hiện tại, khi tìm kiếm không có bản ghi nào vì nhân viên không tồn tại, công cụ trả về đối tượng JSON rỗng {}. Tuy nhiên, khi quản lý tuyển dụng gọi công cụ mà không có quyền truy cập RBAC để xem bản ghi trong các phòng ban bị hạn chế (như Executive Leadership), công cụ cũng trả về {}. Kết quả là agent báo cáo sai rằng nhân viên không tồn tại trong hệ thống. Cần tái thiết kế công cụ search_employee() như thế nào để khắc phục sự mơ hồ này?",
    "optionsEN": [
      "A. Modify the system prompt to instruct the AI agent to assume any {} response for executive departments is a permission failure rather than a missing record.",
      "B. Wrap search_employee() with a retry loop that executes up to 3 times whenever {} is returned before reporting a result.",
      "C. Return {\"results\": [], \"count\": 0} for non-existent employees, and return {\"error\": \"INSUFFICIENT_CLEARANCE\", \"retryable\": false, \"message\": \"User lacks RBAC permissions for restricted department\"} when authorization fails.",
      "D. Throw a generic HTTP 500 Internal Server Error string whenever permission is denied so the MCP server supervisor catches it."
    ],
    "options": [
      "A. Chỉnh sửa system prompt để hướng dẫn agent AI mặc định coi bất kỳ phản hồi {} nào từ các phòng ban điều hành là lỗi phân quyền thay vì bản ghi bị thiếu.",
      "B. Bọc công cụ search_employee() bằng vòng lặp thử lại tối đa 3 lần mỗi khi nhận được {} trước khi đưa ra kết quả.",
      "C. Trả về {\"results\": [], \"count\": 0} khi không tìm thấy nhân viên, và trả về {\"error\": \"INSUFFICIENT_CLEARANCE\", \"retryable\": false, \"message\": \"User lacks RBAC permissions for restricted department\"} khi thất bại phân quyền.",
      "D. Ném ra chuỗi lỗi generic HTTP 500 Internal Server Error mỗi khi bị từ chối quyền truy cập để tiến trình giám sát MCP server xử lý."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Prompting the model to guess authorization status based on department names relies on heuristic assumptions, which fail when permissions change or non-executive searches are restricted.",
      "Option B is incorrect: Adding retries for an empty object {} cannot resolve permission failures or missing records because neither state is transient, leading to unnecessary API latency.",
      "Option C is correct: Returning a structured empty result payload for zero matches while returning a dedicated INSUFFICIENT_CLEARANCE error object with retryable: false allows the AI agent to explicitly differentiate non-existence from permission denial.",
      "Option D is incorrect: Raising an unhandled generic HTTP 500 exception breaks tool execution and provides no machine-readable authorization details for the agent to inform the user properly."
    ],
    "rationale": "Option C provides distinct, structured JSON payloads for empty results versus permission failures. By returning explicit error codes and retryable=false, the agent can accurately inform the user of access denial rather than incorrectly reporting that an employee does not exist.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n\\n- Lựa chọn A sai vì việc dùng prompt để đoán lỗi phân quyền dựa trên tên phòng ban chỉ là giả định cảm tính, dễ dẫn đến đoán sai khi chính sách RBAC thay đổi hoặc áp dụng cho phòng ban khác.\\n- Lựa chọn B sai vì lỗi thiếu quyền truy cập hay nhân viên không tồn tại đều là lỗi cố định (non-transient). Việc retry 3 lần không giải quyết được vấn đề mà chỉ làm tăng độ trễ không cần thiết.\\n- Lựa chọn C chính xác vì nó phân biệt rõ ràng hai trạng thái ngữ nghĩa khác nhau: kết quả rỗng hợp lệ (trả về array rỗng kèm count: 0) và lỗi truy cập (trả về mã lỗi INSUFFICIENT_CLEARANCE và retryable: false), giúp agent đưa ra phản hồi chính xác cho người dùng.\\n- Lựa chọn D sai vì việc ném lỗi chuỗi generic HTTP 500 làm sập luồng xử lý của tool và không cung cấp thông tin có cấu trúc để agent hiểu và thông báo cho người dùng.",
    "scenarioSignature": {
      "testedPrinciple": "distinguishing empty search results from access permission errors in MCP tool responses",
      "failureMode": "agent misinterprets access clearance denial as resource non-existence",
      "rootCause": "tool returns identical empty payload for both zero search matches and authorization failure",
      "requiredFix": "return explicit status payload with error code and non-retryable boolean for permission denial"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  },
  {
    "id": "d2-b04-2.2-004",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-004",
    "questionEN": "An e-commerce customer support AI agent uses an MCP tool get_order_status(order_id: string) to advise customers. Currently, the tool returns {\"status\": \"pending\"} both when an order is awaiting warehouse dispatch (normal processing) and when payment authorization has been declined by the gateway. Because both states return \"pending\", the agent tells customers with declined payments that their orders are processing normally, causing delayed orders and customer dissatisfaction. How should get_order_status() be structured to enable proper agent decision-making?",
    "question": "[d2-b04-2.2-004] Một agent AI hỗ trợ khách hàng thương mại điện tử sử dụng MCP tool get_order_status(order_id: string). Hiện tại, công cụ trả về {\"status\": \"pending\"} trong cả hai trường hợp: khi đơn hàng đang chờ xuất kho (đang xử lý bình thường) và khi ủy quyền thanh toán bị cổng thanh toán từ chối. Vì cả hai trạng thái đều trả về \"pending\", agent báo với khách hàng bị từ chối thanh toán rằng đơn hàng đang được xử lý bình thường, dẫn đến đơn hàng bị trễ. Cần cấu trúc phản hồi của get_order_status() như thế nào để agent đưa ra quyết định đúng đắn?",
    "optionsEN": [
      "A. Return {\"status\": \"pending\"} in both cases, but append a text string \"Note: check gateway logs if delayed\" inside the existing status message field.",
      "B. Increase the agent's LLM context window so it can infer whether payment declined by reading previous chat history messages.",
      "C. Raise an unhandled server exception whenever payment status is declined so the workflow crashes and alerts an engineer.",
      "D. Return {\"status\": \"PROCESSING\", \"fulfillment_stage\": \"warehouse\"} for active orders, and return {\"error\": \"PAYMENT_DECLINED\", \"retryable\": false, \"action_required\": \"UPDATE_PAYMENT_METHOD\"} for failed payments."
    ],
    "options": [
      "A. Trả về {\"status\": \"pending\"} cho cả hai trường hợp, nhưng đính kèm chuỗi văn bản \"Ghi chú: kiểm tra log gateway nếu bị trễ\" vào trường message có sẵn.",
      "B. Tăng kích thước context window của LLM để agent tự suy luận xem thanh toán có bị từ chối hay không bằng cách đọc lại lịch sử trò chuyện.",
      "C. Ném ra ngoại lệ server không được xử lý mỗi khi thanh toán bị từ chối để làm gián đoạn luồng làm việc và báo cáo kỹ sư.",
      "D. Trả về {\"status\": \"PROCESSING\", \"fulfillment_stage\": \"warehouse\"} cho đơn hàng hoạt động, và trả về {\"error\": \"PAYMENT_DECLINED\", \"retryable\": false, \"action_required\": \"UPDATE_PAYMENT_METHOD\"} khi thanh toán thất bại."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Appending an informal text note to a shared status string leaves the response ambiguous for machine parsing and fails to provide structured failure metrics.",
      "Option B is incorrect: Expanding the LLM context window does not fix tool output ambiguity if the tool response itself conflates payment rejection with normal processing.",
      "Option C is incorrect: Raising an unhandled server exception breaks the execution pipeline instead of returning a structured error response that the agent can handle gracefully.",
      "Option D is correct: Returning distinct status fields for normal processing and a structured PAYMENT_DECLINED error payload with retryable: false enables the agent to immediately prompt the customer to update their payment method."
    ],
    "rationale": "Option D explicitly separates operational fulfillment status from transaction failure codes. By providing a structured error code PAYMENT_DECLINED and action_required metadata, the AI agent can promptly instruct the customer to resolve their payment issue instead of waiting indefinitely.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n\\n- Lựa chọn A sai vì việc đính kèm chuỗi ghi chú tự do vào cùng một giá trị status vẫn làm cho dữ liệu bị mơ hồ khi agent phân tích máy (machine parsing).\\n- Lựa chọn B sai vì việc tăng context window không thể khắc phục được sự mơ hồ trong phản hồi của công cụ khi công cụ trả về dữ liệu bị gộp nhóm sai ngay từ gốc.\\n- Lựa chọn C sai vì ném ngoại lệ không xử lý làm sập luồng thực thi thay vì trả về lỗi có cấu trúc để agent xử lý khéo léo với người dùng.\\n- Lựa chọn D chính xác vì nó phân tách rõ ràng trạng thái xử lý đơn hàng bình thường và lỗi thanh toán bằng các mã lỗi có cấu trúc (PAYMENT_DECLINED, action_required: UPDATE_PAYMENT_METHOD), giúp agent ngay lập tức hướng dẫn khách hàng cập nhật phương thức thanh toán.",
    "scenarioSignature": {
      "testedPrinciple": "differentiating normal workflow states from actionable failure states in MCP tool responses",
      "failureMode": "agent misclassifies payment failure as normal order processing",
      "rootCause": "tool returns identical status string for both benign waiting state and payment rejection",
      "requiredFix": "return distinct structured status and explicit payment failure error code with required action"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  }
]