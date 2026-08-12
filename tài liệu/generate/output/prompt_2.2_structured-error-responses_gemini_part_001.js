[
  {
    "id": "d2-b04-2.2-001",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-001",
    "questionEN": "An EHR integration system provides an MCP tool get_patient_records(patient_id: string). The tool returns null both when a patient ID does not exist in the database and when the requesting practitioner lacks EMR access permissions. During an urgent triage evaluation, an agent queried get_patient_records for an existing patient, received null, assumed no medical history existed, and recommended a medication that triggered a severe allergy. How should the tool response schema be redesigned to prevent this clinical decision error?",
    "question": "[d2-b04-2.2-001] Một hệ thống tích hợp hồ sơ sức khỏe điện tử (EHR) cung cấp công cụ MCP get_patient_records(patient_id: string). Công cụ trả về null trong cả hai trường hợp: ID bệnh nhân không tồn tại trong cơ sở dữ liệu và bác sĩ yêu cầu thiếu quyền truy cập EMR. Trong quá trình phân loại cấp cứu, agent đã truy vấn get_patient_records cho một bệnh nhân hiện có, nhận được null, giả định bệnh nhân không có tiền sử bệnh lý và đề xuất thuốc gây dị ứng nghiêm trọng. Cấu trúc phản hồi của công cụ nên được thiết kế lại như thế nào để ngăn chặn lỗi ra quyết định lâm sàng này?",
    "optionsEN": [
      "A. Return explicit structured payloads distinguishing status, such as {\"status\": \"error\", \"error_code\": \"ACCESS_DENIED\", \"retryable\": false} for permission failures and {\"status\": \"success\", \"data\": null} for missing patient records.",
      "B. Throw an unhandled HTTP 500 internal server exception whenever EMR access permissions are missing so the agent execution runtime halts immediately.",
      "C. Update the system prompt instructing the agent to execute a second tool verify_patient_exists() before calling get_patient_records().",
      "D. Modify get_patient_records() to return an empty JSON object {} for missing records and null for permission access failures."
    ],
    "options": [
      "A. Trả về cấu trúc JSON rõ ràng phân biệt trạng thái, chẳng hạn như {\"status\": \"error\", \"error_code\": \"ACCESS_DENIED\", \"retryable\": false} cho lỗi quyền truy cập và {\"status\": \"success\", \"data\": null} khi không tìm thấy hồ sơ bệnh nhân.",
      "B. Ném ra ngoại lệ HTTP 500 internal server chưa được xử lý bất cứ khi nào thiếu quyền truy cập EMR để thời gian chạy của agent dừng lại ngay lập tức.",
      "C. Cập nhật prompt hệ thống hướng dẫn agent thực thi công cụ thứ hai verify_patient_exists() trước khi gọi get_patient_records().",
      "D. Sửa đổi get_patient_records() để trả về một đối tượng JSON rỗng {} khi không có bản ghi và null khi thất bại về quyền truy cập."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because returning explicit structured JSON payloads with machine-readable error codes (ACCESS_DENIED vs missing data) enables the LLM to differentiate permission authorization failures from non-existent patient records, preventing false clinical assumptions.",
      "Option B is incorrect because throwing unhandled 500 exceptions crashes tool execution abruptly rather than allowing the model to process structured error information or request permission escalation.",
      "Option C is incorrect because relying on multi-tool prompting workarounds does not resolve the root schema ambiguity in get_patient_records().",
      "Option D is incorrect because substituting {} for null still relies on weak implicit conventions rather than explicit, machine-readable error payloads."
    ],
    "rationale": "Conflating authorization errors with non-existent data under a single null value causes downstream agents to misinterpret access restriction as an empty record. Returning structured JSON error objects with explicit error_code and status fields allows the LLM to take correct operational branches.",
    "explanation": "Lựa chọn A là đáp án đúng vì việc trả về các đối tượng lỗi có cấu trúc như {\"status\": \"error\", \"error_code\": \"ACCESS_DENIED\", \"retryable\": false} cho phép LLM phân biệt chính xác giữa lỗi phân quyền và việc dữ liệu không tồn tại. Lựa chọn B sai vì việc ném ngoại lệ 500 sẽ làm gãy luồng thực thi thay vì cho phép agent xử lý lỗi. Lựa chọn C sai vì prompt không thể giải quyết sự mơ hồ ở cấp độ API return schema. Lựa chọn D sai vì việc dùng {} vẫn là quy ước ngầm định mơ hồ thay vì thông báo lỗi rõ ràng.",
    "scenarioSignature": {
      "testedPrinciple": "semantic error distinction in tool return values",
      "failureMode": "model prescribes wrong treatment due to ambiguous null return value",
      "rootCause": "function conflates non-existent patient with access permission failure under single null return",
      "requiredFix": "return structured error object distinguishing resource absence from authorization denial"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  },
  {
    "id": "d2-b04-2.2-002",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-002",
    "questionEN": "A core banking MCP integration exposes get_account_balance(account_id: string). The underlying API returns -1 for both frozen accounts (regulatory hold) and non-existent account numbers. An automated compliance workflow agent called get_account_balance(), received -1, treated it as a valid negative balance (overdraft), and automatically initiated debt collection actions against a customer whose account was actually frozen. What structured error design fixes this flaw?",
    "question": "[d2-b04-2.2-002] Một hệ thống tích hợp ngân hàng lõi MCP cung cấp công cụ get_account_balance(account_id: string). API bên dưới trả về -1 cho cả tài khoản bị phong tỏa (do yêu cầu pháp lý) và số tài khoản không tồn tại. Một agent xử lý quy trình tuân thủ tự động đã gọi get_account_balance(), nhận được -1, xử lý giá trị này như một số dư âm hợp lệ (thấu chi) và tự động kích hoạt quy trình thu hồi nợ đối với khách hàng có tài khoản thực chất chỉ đang bị phong tỏa. Thiết kế lỗi có cấu trúc nào giải quyết triệt để vấn đề này?",
    "optionsEN": [
      "A. Wrap the integer return value inside a string format such as \"BALANCE: -1\" to ensure the agent parses it as text rather than a numeric balance.",
      "B. Redesign the response to return a structured payload such as {\"status\": \"error\", \"error_code\": \"ACCOUNT_FROZEN\", \"retryable\": false} for frozen accounts and {\"status\": \"error\", \"error_code\": \"ACCOUNT_NOT_FOUND\", \"retryable\": false} for invalid IDs.",
      "C. Modify the tool schema to return 0 instead of -1 whenever an account is frozen or not found.",
      "D. Add a retry mechanism to automatically re-invoke get_account_balance() up to three times whenever -1 is returned."
    ],
    "options": [
      "A. Bọc giá trị số nguyên trả về trong một định dạng chuỗi như \"BALANCE: -1\" để đảm bảo agent phân tích cú pháp nó dưới dạng văn bản thay vì số dư.",
      "B. Thiết kế lại phản hồi để trả về cấu trúc dữ liệu như {\"status\": \"error\", \"error_code\": \"ACCOUNT_FROZEN\", \"retryable\": false} cho tài khoản bị phong tỏa và {\"status\": \"error\", \"error_code\": \"ACCOUNT_NOT_FOUND\", \"retryable\": false} cho ID không hợp lệ.",
      "C. Sửa đổi schema của công cụ để trả về 0 thay vì -1 bất cứ khi nào tài khoản bị phong tỏa hoặc không tìm thấy.",
      "D. Thêm cơ chế thử lại để tự động gọi lại get_account_balance() tối đa ba lần bất cứ khi nào nhận được giá trị -1."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because formatting sentinel numbers as text strings still conflates errors and does not provide structured branching cues to the model.",
      "Option B is correct because separating domain state errors (ACCOUNT_FROZEN vs ACCOUNT_NOT_FOUND) into explicit structured JSON objects with machine-readable error codes prevents numeric sentinel confusion and incorrect downstream workflow triggers.",
      "Option C is incorrect because returning 0 masks errors as valid zero balances, causing alternate financial logic flaws.",
      "Option D is incorrect because retrying deterministically frozen or non-existent account calls will simply return -1 repeatedly and waste token/API quota."
    ],
    "rationale": "Using numeric sentinel values (like -1) to represent multiple error states causes LLMs to misinterpret error indicators as quantitative domain data. Providing structured JSON error objects with explicit error_code fields disambiguates functional state from numeric output.",
    "explanation": "Lựa chọn B là đáp án đúng vì phân tách các trạng thái lỗi hệ thống thành các đối tượng JSON có cấu trúc rõ ràng với mã lỗi (ACCOUNT_FROZEN và ACCOUNT_NOT_FOUND) ngăn ngừa việc LLM nhầm lẫn giá trị cờ (sentinel value) thành dữ liệu số dư tài khoản. Lựa chọn A sai vì bọc chuỗi không giải quyết được việc gộp nhiều loại lỗi. Lựa chọn C sai vì gán số dư bằng 0 sẽ làm sai lệch thông tin tài khoản. Lựa chọn D sai vì việc thử lại không thể thay đổi bản chất của tài khoản bị phong tỏa hoặc không tồn tại.",
    "scenarioSignature": {
      "testedPrinciple": "structured error payload design for domain state boundaries",
      "failureMode": "agent incorrectly processes balance calculation using sentinel error value",
      "rootCause": "function uses sentinel numeric value -1 for multiple distinct failure conditions",
      "requiredFix": "return distinct machine-readable error codes for account status versus missing resource"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  }
]