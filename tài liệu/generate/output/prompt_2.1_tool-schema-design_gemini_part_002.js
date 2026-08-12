[
  {
    "id": "d2-b04-new-003",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-003",
    "questionEN": "An electronic health record (EHR) agent uses the get_patient(dob: string) tool to query backend records in MedRecord-API. When a user asks for medical records for a patient born on March 5, 1990, the LLM invokes get_patient with dob set to \"March 5th 1990\". The backend service expects ISO format (YYYY-MM-DD) and returns an HTTP 400 error with message \"Invalid date syntax\". Which tool schema modification prevents this formatting failure?",
    "question": "[d2-b04-new-003] Một agent trong hệ thống hồ sơ sức khỏe điện tử (EHR) sử dụng công cụ get_patient(dob: string) để truy vấn bản ghi backend trong MedRecord-API. Khi người dùng yêu cầu hồ sơ y tế của bệnh nhân sinh ngày 5 tháng 3 năm 1990, LLM gọi get_patient với tham số dob là \"March 5th 1990\". Dịch vụ backend yêu cầu định dạng ISO (YYYY-MM-DD) nên trả về lỗi HTTP 400 với thông báo \"Invalid date syntax\". Thay đổi nào trong schema của tool giúp ngăn chặn lỗi định dạng này?",
    "optionsEN": [
      "A. Update the get_patient tool description with free-form text instructing the model to format dates as YYYY-MM-DD.",
      "B. Modify the backend MedRecord-API endpoint handler to parse natural language date strings dynamically.",
      "C. Define a pattern regex constraint ^\\d{4}-\\d{2}-\\d{2}$ on the dob parameter in the tool JSON schema.",
      "D. Change the dob parameter type in the JSON schema from string to an integer Unix timestamp."
    ],
    "options": [
      "A. Cập nhật mô tả (description) của tool get_patient bằng văn bản tự do hướng dẫn model định dạng ngày thành YYYY-MM-DD.",
      "B. Sửa đổi handler của endpoint MedRecord-API trên backend để phân tích cú pháp chuỗi ngày ngôn ngữ tự nhiên một cách linh hoạt.",
      "C. Định nghĩa ràng buộc regex pattern ^\\d{4}-\\d{2}-\\d{2}$ cho tham số dob trong JSON schema của tool.",
      "D. Thay đổi kiểu dữ liệu của tham số dob trong JSON schema từ string sang integer dạng Unix timestamp."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A (Incorrect): Adding text instructions in the description encourages proper formatting but cannot syntactically prevent the model from generating non-standard date strings when prompt context is crowded.",
      "Option B (Incorrect): Adding server-side string parsing shifts error handling to the backend implementation rather than validating and constraining inputs at the MCP tool schema boundary.",
      "Option C (Correct): Adding a pattern regex constraint (^\\d{4}-\\d{2}-\\d{2}$) directly in the parameter JSON schema strictly validates the string input on the client side and guides model sampling toward valid ISO YYYY-MM-DD dates.",
      "Option D (Incorrect): Changing the date parameter to an integer Unix timestamp forces the LLM to calculate epoch seconds, introducing high risk of arithmetic miscalculation without addressing string pattern validation."
    ],
    "rationale": "Adding a pattern regex constraint (^\\d{4}-\\d{2}-\\d{2}$) to the parameter JSON schema enforces strict validation on date inputs, instructing the model to generate correctly formatted ISO 8601 strings and rejecting invalid formats prior to backend invocation.",
    "explanation": "Phân tích chi tiết các lựa chọn:\\n\\n- Lựa chọn A (Sai): Mô tả bằng văn bản tự do chỉ cung cấp gợi ý ngữ cảnh nhưng không thể thực thi việc kiểm tra cú pháp khắt khe ở tầng schema, khiến LLM vẫn có thể sinh chuỗi sai định dạng khi ngõ vào phức tạp.\\n- Lựa chọn B (Sai): Xử lý chuỗi ngày tự nhiên ở backend làm tăng độ phức tạp của API server và không giải quyết tận gốc việc khai báo ràng buộc rõ ràng ở tầng giao tiếp tool schema.\\n- Lựa chọn C (Đúng): Khai báo ràng buộc pattern với biểu thức chính quy ^\\d{4}-\\d{2}-\\d{2}$ trong JSON schema của tham số dob sẽ ép buộc model phải tạo ra chuỗi đúng định dạng ISO YYYY-MM-DD và cho phép kiểm tra tính hợp lệ trước khi gửi yêu cầu.\\n- Lựa chọn D (Sai): Chuyển tham số sang Unix timestamp bắt buộc LLM phải thực hiện phép tính đổi ngày thành số giây epoch, dễ dẫn đến sai số tính toán số học.",
    "scenarioSignature": {
      "testedPrinciple": "string parameter pattern constraint validation",
      "failureMode": "tool invocation failure due to unstandardized date string format",
      "rootCause": "tool schema lacking pattern regular expression constraint for date format",
      "requiredFix": "add pattern constraint enforcing standard ISO date regex in parameter schema"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-new-004",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-004",
    "questionEN": "An enterprise CRM system provides a monolithic manage_record(action: string, record_id: string) tool to handle customer files, where action supports \"read\", \"update\", or \"delete \". A read-only audit subagent is equipped with manage_record to inspect records. During an audit task, the subagent incorrectly calls manage_record(action=\"delete\", record_id=\"REC- 9041\"), permanently removing a customer record. How should the tool architecture be redesigned to eliminate this vulnerability?",
    "question": "[d2-b04-new-004] Một hệ thống CRM doanh nghiệp cung cấp tool đơn khối manage_record(action: string, record_id: string) để xử lý hồ sơ khách hàng, trong đó action hỗ trợ \"read\", \"update\", hoặc \"delete \". Một subagent kiểm toán chỉ có quyền đọc (read-only) được cấp tool manage_record để kiểm tra dữ liệu. Trong quá trình kiểm toán, subagent đã gọi nhầm manage_record(action=\"delete \", record_id=\"REC - 9041\"), xóa vĩnh viễn một bản ghi khách hàng. Kiến trúc tool nên được thiết kế lại như thế nào để loại bỏ lỗ hổng này?",
    "optionsEN": [
      "A. Add a system prompt directive instructing read-only subagents never to pass \"delete \" as the action parameter value.",
      "B. Update the JSON schema of manage_record to set enum: [\"read\"] for all agents across the system.",
      "C. Add a runtime confirmation dialog check inside the manage_record function code whenever action equals \"delete \".",
      "D. Split manage_record into distinct tools (get_record, update_record, delete_record) and assign only get_record to the read-only subagent."
    ],
    "options": [
      "A. Thêm chỉ thị trong system prompt hướng dẫn các read-only subagent không bao giờ truyền giá trị \"delete \" vào tham số action.",
      "B. Cập nhật JSON schema của manage_record để cài đặt enum: [\"read\"] cho tất cả các agent trong hệ thống.",
      "C. Thêm bước kiểm tra hộp thoại xác nhận khi thực thi hàm manage_record mỗi khi action có giá trị \"delete \".",
      "D. Tách manage_record thành các tool riêng biệt (get_record, update_record, delete_record) và chỉ cấp get_record cho read-only subagent."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A (Incorrect): Relying on prompt instructions to enforce access control is insecure because LLMs can bypass system prompt directives under adversarial inputs or reasoning confusion.",
      "Option B (Incorrect): Restricting the action parameter enum to [\"read\"] globally in the shared tool definition disables delete and update functionality for authorized administrative agents.",
      "Option C (Incorrect): Embedding confirmation logic within a monolithic backend tool function relies on runtime dynamic checks rather than isolating tool privileges statically at the schema definition boundary.",
      "Option D (Correct): Decomposing the monolithic tool into granular single-purpose tools (get_record, update_record, delete_record) enables strict role-based tool permissioning, ensuring read-only subagents cannot access delete capabilities."
    ],
    "rationale": "Replacing monolithic tools with granular tools (such as separate get_record, update_record, and delete_record tools) allows developers to grant minimum required privileges per subagent role, fundamentally preventing read-only agents from executing destructive actions.",
    "explanation": "Phân tích chi tiết các lựa chọn:\\n\\n- Lựa chọn A (Sai): Việc sử dụng prompt để kiểm soát truy cập không đảm bảo an toàn vì LLM vẫn có thể vi phạm chỉ thị prompt khi gặp ngữ cảnh phức tạp hoặc bị suy luận lệch hướng.\\n- Lựa chọn B (Sai): Đặt enum: [\"read\"] trên tool chung manage_record sẽ làm mất khả năng cập nhật và xóa dữ liệu của các agent quản trị có thẩm quyền khác.\\n- Lựa chọn C (Sai): Thêm thủ tục xác nhận trong mã nguồn hàm backend xử lý runtime không giải quyết được gốc rễ vấn đề phân quyền tĩnh ở tầng khai báo giao diện công cụ (tool definition).\\n- Lựa chọn D (Đúng): Tách công cụ đơn khối thành các công cụ nhỏ tinh gọn (granular tools) như get_record, update_record, delete_record cho phép áp dụng nguyên tắc đặc quyền tối thiểu (least privilege), chỉ cấp get_record cho subagent chỉ đọc và loại bỏ hoàn toàn nguy cơ gọi nhầm các tác vụ ghi/xóa.",
    "scenarioSignature": {
      "testedPrinciple": "granular tool schema design for role access control",
      "failureMode": "unauthorized record deletion by read-only agent component",
      "rootCause": "monolithic tool design combining read update and delete actions",
      "requiredFix": "split monolithic tool into separate granular read update and delete tools"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]