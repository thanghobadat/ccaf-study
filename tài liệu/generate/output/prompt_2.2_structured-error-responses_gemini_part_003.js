[
  {
    "id": "d2-b04-2.2-005",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-005",
    "questionEN": "An enterprise document retrieval service uses an MCP tool find_document(query: string, user_id: string) to search internal security files. When a search query matches zero documents, the tool returns {\"documents\": [], \"status\": 200}. However, when user_id has revoked permissions or insufficient classification clearance for requested documents, the backend handler catches the 403 Forbidden error and also returns {\"documents\": [], \"status\": 200} to prevent leaking document metadata. As a consequence, an AI compliance agent infers that sensitive compliance reports do not exist and incorrectly reports non-compliance to auditors. How should find_document be redesigned to solve this security ambiguity while adhering to structured error response patterns?",
    "question": "[d2-b04-2.2-005] Một dịch vụ truy xuất tài liệu doanh nghiệp sử dụng MCP tool find_document(query: string, user_id: string) để tìm kiếm tài liệu bảo mật nội bộ. Khi truy vấn không tìm thấy tài liệu nào, tool trả về {\"documents\": [], \"status\": 200}. Tuy nhiên, khi user_id bị thu hồi quyền hoặc không đủ cấp độ bảo mật cho tài liệu yêu cầu, backend handler bắt lỗi 403 Forbidden và cũng trả về {\"documents\": [], \"status\": 200} nhằm tránh rò rỉ metadata. Hậu quả là AI compliance agent diễn giải rằng báo cáo tuân thủ không tồn tại và báo cáo sai cho kiểm toán viên. Tool find_document nên được thiết kế lại như thế nào để xử lý sự mơ hồ bảo mật này theo đúng mẫu structured error response?",
    "optionsEN": [
      "A. Return {\"error_code\": \"ACCESS_DENIED\", \"retryable\": false, \"message\": \"User lacks clearance for requested classification tags\"} for permission errors, and {\"documents\": [], \"total_count\": 0} only for valid zero matches.",
      "B. Return {\"documents\": null, \"status\": \"ERROR\"} for both missing documents and permission errors, requiring system prompt rules to interpret null.",
      "C. Return a generic HTTP 500 payload {\"status\": 500, \"message\": \"Internal Server Error\"} whenever authorization fails or document counts are zero.",
      "D. Automatically escalate user privilege levels in the backend whenever find_document returns an empty array [] during retrieval."
    ],
    "options": [
      "A. Trả về {\"error_code\": \"ACCESS_DENIED\", \"retryable\": false, \"message\": \"User lacks clearance for requested classification tags\"} cho lỗi phân quyền, và chỉ trả về {\"documents\": [], \"total_count\": 0} khi tìm kiếm thực sự không có bản ghi.",
      "B. Trả về {\"documents\": null, \"status\": \"ERROR\"} cho cả lỗi không thấy tài liệu lẫn lỗi phân quyền, yêu cầu system prompt giải thích giá trị null.",
      "C. Trả về HTTP 500 payload chung {\"status\": 500, \"message\": \"Internal Server Error\"} bất cứ khi nào ủy quyền thất bại hoặc số lượng tài liệu bằng 0.",
      "D. Tự động nâng cấp cấp độ truy cập người dùng ở backend bất cứ khi nào find_document trả về mảng rỗng [] trong quá trình truy xuất."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Explicitly separating authorization failures (ACCESS_DENIED, retryable: false) from zero-result queries (documents: []) eliminates the security gap, allowing the compliance agent to distinguish between non-existent documents and restricted access.",
      "Option B is incorrect because returning a vague documents: null with status: ERROR for both cases maintains semantic ambiguity and relies on system prompt guesswork instead of explicit structured errors.",
      "Option C is incorrect because returning a generic HTTP 500 string conflates server crashes with permission denials and empty results, leaving the model unable to handle access control failures.",
      "Option D is incorrect because escalating user privileges dynamically introduces a massive security vulnerability without fixing the error response contract."
    ],
    "rationale": "Returning identical empty arrays for both 'not found' and 'access denied' causes the AI agent to falsely assume requested files do not exist. Structuring permission denials as explicit non-retryable errors (error_code: ACCESS_DENIED, retryable: false) ensures the agent correctly recognizes security barriers and refrains from making false claims.",
    "explanation": "Khi MCP tool sử dụng cùng một phản hồi mảng rỗng [] cho cả hai trường hợp không tìm thấy dữ liệu và bị từ chối truy cập (Access Denied), agent không thể phân biệt được giữa việc tài liệu thực sự không tồn tại hay tài liệu có tồn tại nhưng người dùng không có quyền xem. Điều này gây ra rủi ro bảo mật và nghiệp vụ nghiêm trọng khi agent kết luận sai.\\n\\n- Phương án A (Đúng): Phân tách rõ ràng giữa mảng kết quả rỗng (khi tìm kiếm hợp lệ nhưng không có kết quả) và phản hồi lỗi cấu trúc có error_code: ACCESS_DENIED cùng retryable: false. Cấu trúc này giúp agent nhận biết chính xác rào cản phân quyền để báo cáo phù hợp.\\n- Phương án B (Sai): Trả về null kèm status ERROR vẫn giữ nguyên sự mơ hồ và buộc LLM phải đoán ngữ cảnh dựa vào prompt thay vì schema chuẩn.\\n- Phương án C (Sai): Gộp lỗi ủy quyền và mảng rỗng thành lỗi chung HTTP 500 khiến agent không thể đưa ra nhánh xử lý chính xác.\\n- Phương án D (Sai): Tự động cấp quyền truy cập tạo ra lỗ hổng bảo mật nghiêm trọng và không giải quyết bản chất của việc thiết kế API error response.",
    "scenarioSignature": {
      "testedPrinciple": "distinction between empty search results and security permission errors",
      "failureMode": "agent incorrectly assumes non-existence of resources when authorization is revoked",
      "rootCause": "tool returns identical empty array response for both zero matching records and access denied errors",
      "requiredFix": "return structured ACCESS_DENIED error payload for authorization failures and distinct empty list schema for valid zero matches"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  },
  {
    "id": "d2-b04-2.2-006",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.2 structured-error-responses / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.2-006",
    "questionEN": "An automated billing integration agent uses an MCP tool charge_invoice(invoice_id: string, payment_token: string) to process payments against a payment gateway API. When payment_token is expired or revoked, the backend gateway returns HTTP 401 Unauthorized with an unstructured text payload \"Error: Authentication failed\". Because the response lacks a machine-readable flag, the agent interprets the failure as a transient connection issue and retries charge_invoice 3 times in a loop before failing, consuming rate limits and wasting API calls. How should the charge_invoice error schema be updated to prevent wasted retries on authentication failures?",
    "question": "[d2-b04-2.2-006] Một agent tích hợp thanh toán tự động sử dụng MCP tool charge_invoice(invoice_id: string, payment_token: string) để xử lý hóa đơn qua API payment gateway. Khi payment_token bị hết hạn hoặc thu hồi, backend gateway trả về lỗi HTTP 401 Unauthorized kèm payload văn bản không cấu trúc \"Error: Authentication failed\". Vì phản hồi thiếu cờ mà máy có thể đọc được, agent diễn giải thất bại này là sự cố kết nối tạm thời và thử lại charge_invoice 3 lần trong vòng lặp trước khi dừng hẳn, gây lãng phí quota API. Schema lỗi của charge_invoice nên được cập nhật như thế nào để ngăn chặn việc thử lại vô ích đối với lỗi xác thực?",
    "optionsEN": [
      "A. Implement a mandatory 30-second sleep timer inside the agent execution loop between consecutive tool calls.",
      "B. Return {\"error_code\": \"AUTH_INVALID_TOKEN\", \"retryable\": false, \"message\": \"Payment token is expired or revoked\"} so the agent immediately stops retrying and requests credential renewal.",
      "C. Return HTTP 200 OK containing {\"success\": false, \"message\": \"Authentication failed\"} to suppress HTTP exceptions in the agent runner.",
      "D. Update the tool description to instruct the agent to increase retries to 5 attempts whenever authentication fails."
    ],
    "options": [
      "A. Thêm bộ đếm thời gian chờ 30 giây bắt buộc trong vòng lặp thực thi của agent giữa các lần gọi tool liên tiếp.",
      "B. Trả về {\"error_code\": \"AUTH_INVALID_TOKEN\", \"retryable\": false, \"message\": \"Payment token is expired or revoked\"} để agent dừng thử lại ngay lập tức và yêu cầu làm mới thông tin xác thực.",
      "C. Trả về HTTP 200 OK chứa {\"success\": false, \"message\": \"Authentication failed\"} để bỏ qua ngoại lệ HTTP trong agent runner.",
      "D. Cập nhật mô tả tool để hướng dẫn agent tăng số lần thử lại lên 5 lần bất cứ khi nào xác thực thất bại."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because adding a sleep timer delays execution but does not solve the root cause: the agent still executes redundant calls for non-retryable authentication errors.",
      "Option B (Correct): Including retryable: false and a machine-readable error_code explicitly informs the agent model that the failure is permanent, causing it to halt retries instantly and request token renewal.",
      "Option C is incorrect because wrapping errors in HTTP 200 OK without explicit retry metadata hides failure signals and can confuse agent execution flows.",
      "Option D is incorrect because increasing retry attempts on invalid authentication tokens compounds API rate limit waste and will never succeed."
    ],
    "rationale": "Non-transient errors like expired authentication tokens cannot be resolved by retrying. Providing an explicit retryable: false field alongside a machine-readable error_code allows the model's tool execution logic to immediately halt retries, avoiding wasted API calls and enabling prompt credential re-authorization.",
    "explanation": "Khi một lỗi không thể tự phục hồi (non-retryable error) như payment_token bị hết hạn xảy ra, việc thử lại (retry) chỉ làm lãng phí cước phí API và dính rate limit mà không bao giờ thành công. Trả về văn bản lỗi không cấu trúc khiến agent không thể nhận biết đây là lỗi vĩnh viễn hay lỗi mạng tạm thời.\\n\\n- Phương án B (Đúng): Sử dụng cấu trúc phản hồi lỗi chuẩn với error_code định danh máy đọc và cờ retryable: false. Cờ này trực tiếp ra lệnh cho agent dừng ngay lập tức việc thử lại và chuyển sang bước xử lý làm mới token hoặc báo cho người dùng.\\n- Phương án A (Sai): Việc đặt timer hoãn 30 giây chỉ kéo dài thời gian chờ chứ không ngăn agent thực hiện các cuộc gọi thử lại vô ích.\\n- Phương án C (Sai): Trả về HTTP 200 OK với thông điệp chung làm ẩn đi tín hiệu lỗi thực sự và làm rối loạn luồng điều khiển của agent.\\n- Phương án D (Sai): Tăng số lần thử lại lên 5 lần chỉ làm tăng mức độ lãng phí tài nguyên và cước phí API.",
    "scenarioSignature": {
      "testedPrinciple": "structured error response retryability flags for automated agent control flow",
      "failureMode": "agent repeatedly retries non-retryable authentication failure wasting API quota",
      "rootCause": "tool returns unstructured text error without explicit machine readable retryable boolean",
      "requiredFix": "include explicit retryable false flag in structured error response payload for non-transient auth errors"
    },
    "sources": [
      {
        "label": "Lesson 2.2: Structured Error Responses",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-2-structured-error-responses"
      }
    ]
  }
]