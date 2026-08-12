[
  {
    "id": "d2-b06-2.6-005",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-005",
    "scenarioSignature": {
      "testedPrinciple": "fan-out fan-in parallel tool execution for list processing",
      "failureMode": "orchestration context timeout due to sequential execution latency",
      "rootCause": "calling detail retrieval tools sequentially for each item in list",
      "requiredFix": "fan out parallel detail tool invocations and join payloads before aggregation"
    },
    "questionEN": "An incident response assistant uses search_security_alerts(severity=\"CRITICAL\", status=\"OPEN\") which returns an array of 20 alert IDs ([\"ALT-8901\", \"ALT-8902\", ..., \"ALT-8920\"]). To generate an executive summary, detailed metadata for each alert must be fetched using get_alert_details(alert_id). Executing get_alert_details sequentially takes 450 ms per call, causing the total workflow duration to exceed 9 seconds and triggering an orchestration timeout threshold of 8000 ms. How should the tool chaining workflow be designed to eliminate this bottleneck?",
    "question": "[d2-b06-2.6-005] Một trợ lý ứng phó sự cố sử dụng search_security_alerts(severity=\"CRITICAL\", status=\"OPEN\") trả về một mảng 20 ID cảnh báo ([\"ALT-8901\", \"ALT-8902\", ..., \"ALT-8920\"]). Để tạo báo cáo tóm tắt cho cấp quản lý, thông tin chi tiết của từng cảnh báo phải được lấy qua get_alert_details(alert_id). Việc gọi get_alert_details tuần tự tốn 450 ms mỗi lần, khiến tổng thời gian thực thi vượt quá 9 giây và kích hoạt ngưỡng timeout 8000 ms của orchestration engine. Quy trình chuỗi công cụ (tool chaining) nên được thiết kế như thế nào để loại bỏ nút thắt cổ chai này?",
    "optionsEN": [
      "A. Execute search_security_alerts to retrieve the ID list, issue parallel tool call requests for get_alert_details across all 20 IDs simultaneously in a fan-out pattern, and join all returned detail payloads before synthesizing the final report.",
      "B. Pass all 20 alert IDs as a comma-separated string into a single invocation of get_alert_details(alert_id=\"ALT-8901,ALT-8902,...\") to bypass multiple network round trips.",
      "C. Enforce strict sequential execution turns across separate conversation turns to preserve deterministic model memory, accepting the 9-second execution latency.",
      "D. Replace the individual tool calls with a direct database streaming query component that renders raw unformatted SQL records into the client UI."
    ],
    "options": [
      "A. Thực thi search_security_alerts để lấy danh sách ID, phát các yêu cầu gọi công cụ song song cho get_alert_details đối với cả 20 ID cùng lúc theo mô hình fan-out, và hợp nhất (join) tất cả dữ liệu trả về trước khi tổng hợp báo cáo cuối cùng.",
      "B. Truyền toàn bộ 20 ID cảnh báo dưới dạng một chuỗi phân tách bằng dấu phẩy vào một lần gọi get_alert_details(alert_id=\"ALT-8901,ALT-8902,...\") duy nhất để tránh nhiều vòng truyền nhận mạng.",
      "C. Bắt buộc thực thi tuần tự nghiêm ngặt qua các lượt hội thoại riêng biệt để bảo toàn bộ nhớ mô hình xác định, chấp nhận độ trễ thực thi 9 giây.",
      "D. Thay thế các lời gọi công cụ riêng lẻ bằng một thành phần truy vấn luồng cơ sở dữ liệu trực tiếp để hiển thị các bản ghi SQL thô chưa định dạng lên UI của client."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Utilizing a fan-out/fan-in pattern allows independent get_alert_details requests to execute concurrently, reducing overall execution time from 9,000 ms to approximately ~450 ms (the duration of the single slowest parallel call), which easily fits within the 8,000 ms timeout window.",
      "Option B is incorrect: Passing a comma-separated string violates the parameter schema of get_alert_details, which expects a single string alert_id, causing API validation failures.",
      "Option C is incorrect: Maintaining sequential execution perpetuates the high latency bottleneck and results in persistent orchestration timeout failures.",
      "Option D is incorrect: Bypassing tool chaining with raw database streaming bypasses the model's capacity to summarize, categorize, and format alert metadata into an executive summary."
    ],
    "rationale": "When a search tool returns a collection of entity identifiers that require further detail enrichment, fanning out parallel tool calls across all identifiers concurrently and joining their responses drastically reduces total turn latency compared to sequential execution.",
    "explanation": "Trong mô hình Tool Chaining với số lượng phần tử cần xử lý lớn, khi công cụ tìm kiếm trả về danh sách nhiều ID độc lập ([\"ALT-8901\", ...]):\n\n- Đáp án A đúng: Áp dụng mô hình Fan-out/Fan-in cho phép orchestrator đưa ra 20 yêu cầu gọi công cụ get_alert_details song song trong một lượt duy nhất. Thời gian hoàn thành giảm từ 9.000 ms (gọi tuần tự) xuống còn ~450 ms (bằng thời gian của lời gọi duy nhất), giải quyết dứt điểm lỗi timeout 8.000 ms.\n- Đáp án B sai: Việc nén danh sách ID thành chuỗi phân tách dấu phẩy vi phạm schema đầu vào của công cụ get_alert_details (chỉ chấp nhận một ID đơn lẻ), dẫn đến lỗi validation API.\n- Đáp án C sai: Việc duy trì gọi tuần tự khiến tổng thời gian vượt quá ngưỡng timeout 8.000 ms, làm sụp đổ workflow.\n- Đáp án D sai: Truy vấn dữ liệu thô bỏ qua vai trò của LLM trong việc tổng hợp, phân tích và định dạng thông tin thành báo cáo cho cấp quản lý.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  },
  {
    "id": "d2-b06-2.6-006",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-006",
    "scenarioSignature": {
      "testedPrinciple": "adapter tool pattern for entity format resolution",
      "failureMode": "downstream api validation error due to invalid string uuid format",
      "rootCause": "passing upstream display name directly to parameter requiring canonical identifier format",
      "requiredFix": "insert entity resolver adapter tool to map display names to uuid"
    },
    "questionEN": "An automated IT workflow chains get_user_profile(username) to assign_jira_issue(issue_key, assignee_uuid). get_user_profile returns a JSON object containing \"displayName\": \"Jane Doe\" and \"department\": \"DevOps\", but assign_jira_issue requires assignee_uuid to strictly match a 36-character UUID string format. When the assistant passes \"Jane Doe\" directly into assignee_uuid, Jira API rejects the call with HTTP 400 Bad Request: Invalid UUID format. How should the tool chaining architecture be modified to resolve this parameter type incompatibility?",
    "question": "[d2-b06-2.6-006] Một workflow IT tự động kết nối chuỗi công cụ get_user_profile(username) với assign_jira_issue(issue_key, assignee_uuid). Công cụ get_user_profile trả về một đối tượng JSON chứa \"displayName\": \"Jane Doe\" và \"department\": \"DevOps\", nhưng assign_jira_issue yêu cầu assignee_uuid phải khớp chính xác với định dạng chuỗi UUID 36 ký tự. Khi trợ lý truyền trực tiếp \"Jane Doe\" vào assignee_uuid, Jira API từ chối lời gọi với lỗi HTTP 400 Bad Request: Invalid UUID format. Kiến trúc tool chaining nên được sửa đổi như thế nào để giải quyết sự không tương thích định dạng tham số này?",
    "optionsEN": [
      "A. Modify assign_jira_issue tool schema to accept string display names and perform internal SQL fuzzy searches against the identity database inside the issue tracker tool.",
      "B. Insert an entity resolution adapter tool resolve_user_id(display_name) into the chain to map human-readable display names to canonical UUIDs before invoking assign_jira_issue.",
      "C. Direct the LLM system prompt to generate a pseudo-random UUID v4 string deterministically derived from the display name string whenever assignee_uuid is required.",
      "D. Pass the entire user profile payload object directly into the assignee_uuid parameter so the target API can perform dynamic field extraction."
    ],
    "options": [
      "A. Sửa đổi schema của công cụ assign_jira_issue để chấp nhận tên hiển thị dạng chuỗi và thực hiện tìm kiếm mờ SQL nội bộ trong cơ sở dữ liệu định danh bên trong công cụ quản lý issue.",
      "B. Chèn một công cụ adapter giải quyết định danh (entity resolution) resolve_user_id(display_name) vào chuỗi để chuyển đổi tên hiển thị dễ đọc sang UUID chuẩn trước khi gọi assign_jira_issue.",
      "C. Hướng dẫn system prompt của LLM tự tạo một chuỗi UUID v4 ngẫu nhiên được dẫn xuất xác định từ chuỗi tên hiển thị mỗi khi tham số assignee_uuid được yêu cầu.",
      "D. Truyền toàn bộ đối tượng payload thông tin người dùng trực tiếp vào tham số assignee_uuid để API đích tự giải xuất dữ liệu động."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Altering the downstream tool contract to perform internal fuzzy database lookups breaks clean separation of concerns and introduces non-deterministic assignment errors when duplicate display names exist.",
      "Option B is correct: Inserting an adapter tool (resolve_user_id) bridges entity mismatches between human-readable tool outputs and strict system UUID requirements while maintaining modular tool design.",
      "Option C is incorrect: Hallucinating or deriving synthetic UUID strings on the client/LLM side yields unmapped UUIDs that fail foreign key constraints in the downstream Jira service.",
      "Option D is incorrect: Supplying a full JSON object payload to a string parameter triggers JSON-RPC schema validation failures before the request reaches the endpoint."
    ],
    "rationale": "When upstream tools output human-centric labels or display names but downstream tools enforce canonical identifier formats (such as UUIDs), inserting an intermediary resolver/adapter tool preserves strict API contracts and modular architecture without resorting to fuzzy matching or schema corruption.",
    "explanation": "Khi liên kết các công cụ (tool chaining), trường hợp công cụ phía trước (Tool A) trả về dữ liệu hiển thị thân thiện với con người (displayName: \"Jane Doe\") nhưng công cụ phía sau (Tool B) yêu cầu mã định danh hệ thống chuẩn (assignee_uuid dạng UUID 36 ký tự):\n\n- Đáp án B đúng: Áp dụng mô hình Adapter/Entity Resolver bằng cách thêm công cụ resolve_user_id(display_name) vào giữa chuỗi. Công cụ trung gian này chuyển đổi \"Jane Doe\" thành UUID hợp lệ một cách chính xác trước khi truyền vào assign_jira_issue, giải quyết triệt để lỗi HTTP 400 mà không vi phạm nguyên tắc thiết kế công cụ.\n- Đáp án A sai: Sửa đổi công cụ phía sau để tự tìm kiếm mờ (fuzzy search) vi phạm nguyên tắc tách biệt trách nhiệm (separation of concerns) và dễ gây nhầm lẫn nếu có nhiều người trùng tên.\n- Đáp án C sai: Yêu cầu LLM tự sinh UUID giả lập từ chuỗi tên sẽ tạo ra các UUID không tồn tại trong hệ thống, dẫn đến lỗi cơ sở dữ liệu ở Jira.\n- Đáp án D sai: Truy vấn truyền nguyên JSON object vào tham số yêu cầu string UUID sẽ vi phạm kiểu dữ liệu (type mismatch) ngay ở bước validation schema.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  }
]