[
  {
    "id": "d2-b04-B-003",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-003",
    "scenarioSignature": {
      "testedPrinciple": "tool return schema error code documentation",
      "failureMode": "agent misinterprets rate limit response as non-retriable failure",
      "rootCause": "tool schema description omits possible HTTP status codes and transient error handling instructions",
      "requiredFix": "document transient error codes and retry behavior in tool return schema description"
    },
    "questionEN": "An e-commerce order tracking agent uses an MCP tool get_order_status(order_id: string) to check order progress. During peak sales events, the backend REST API responds with HTTP 429 (Rate limit exceeded). Because the tool's output schema description only documents HTTP 200 (order status object) and HTTP 404 (order not found), the LLM misinterprets the 429 JSON error object as a permanent system failure and terminates customer support workflows immediately. How should the tool schema be updated to ensure proper retry behavior?",
    "question": "[d2-b04-B-003] Một AI agent theo dõi đơn hàng thương mại điện tử sử dụng tool MCP get_order_status(order_id: string) để kiểm tra tiến trình đơn hàng. Trong các đợt khuyến mãi cao điểm, REST API phía backend trả về HTTP status 429 (Rate limit exceeded). Do mô tả schema đầu ra của tool chỉ tài liệu hóa mã HTTP 200 (order status object) và HTTP 404 (order not found), LLM giải thích nhầm đối tượng lỗi JSON 429 là sự cố hệ thống vĩnh viễn và chấm dứt ngay quy trình hỗ trợ khách hàng. Cần cập nhật tool schema như thế nào để bảo đảm hành vi thử lại (retry) đúng đắn?",
    "optionsEN": [
      "A. Increase the global LLM completion retry limit in the agent framework config to force repeated tool calls whenever any error JSON is received.",
      "B. Modify the tool parameter schema to make order_id an array so the model can batch multiple order requests into a single API invocation.",
      "C. Expand the tool description and return schema documentation to explicitly define HTTP 429 as a transient rate-limit response requiring exponential backoff retries.",
      "D. Implement a client-side circuit breaker inside the tool handler that converts HTTP 429 status codes into empty HTTP 200 status objects."
    ],
    "options": [
      "A. Tăng giới hạn thử lại completion LLM toàn cục trong cấu hình agent framework để bắt buộc gọi lại tool mỗi khi nhận được bất kỳ JSON lỗi nào.",
      "B. Sửa đổi parameter schema của tool để chuyển order_id thành một mảng nhằm cho phép mô hình gộp nhiều yêu cầu đơn hàng vào một lần gọi API.",
      "C. Mở rộng mô tả tool và tài liệu return schema để định nghĩa rõ ràng HTTP 429 là phản hồi giới hạn tần suất tạm thời yêu cầu thử lại với thuật toán exponential backoff.",
      "D. Triển khai circuit breaker phía client bên trong tool handler để chuyển đổi mã trạng thái HTTP 429 thành đối tượng HTTP 200 rỗng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A (Incorrect): Increasing global agent retry limits forces blind retries across all tools without teaching the model how to interpret 429 status codes vs non-retriable errors like 400 or 404.",
      "Option B (Incorrect): Changing order_id to an array addresses request batching but does not resolve how the model interprets HTTP 429 responses returned by the single-order or batch endpoints.",
      "Option C (Correct): Documenting HTTP 429 as a transient rate-limit status code within the return schema description explicitly instructs the model that the failure is temporary and should be retried after a backoff delay.",
      "Option D (Incorrect): Masking HTTP 429 as an empty HTTP 200 object deceives the model into thinking an order exists without data, causing false order status reporting to users."
    ],
    "rationale": "Documenting return error structures (such as HTTP 429 rate limiting) in the tool schema equips the model to distinguish transient operational failures from permanent errors (like 404), enabling it to initiate appropriate retry backoff strategies.",
    "explanation": "Phân tích các phương án:\n- Phương án A sai: Tăng số lần thử lại toàn cục của LLM không giúp mô hình hiểu sự khác biệt giữa lỗi tạm thời (429) và lỗi vĩnh viễn (400, 404), dẫn đến việc thử lại vô ích với các lỗi vĩnh viễn.\n- Phương án B sai: Việc chuyển order_id thành mảng hỗ trợ gom batch request nhưng không giải quyết được cách LLM giải thích và xử lý khi API trả về mã lỗi HTTP 429.\n- Phương án C đúng: Việc bổ sung tài liệu về cấu trúc phản hồi lỗi và định nghĩa rõ mã HTTP 429 trong return schema giúp LLM nhận biết đây là lỗi giới hạn tần suất tạm thời, từ đó thực hiện chiến lược chờ và thử lại (exponential backoff) thay vì hủy bỏ tác vụ.\n- Phương án D sai: Việc giấu lỗi 429 bằng cách trả về HTTP 200 rỗng khiến mô hình hiểu sai rằng đơn hàng không tồn tại hoặc không có dữ liệu, dẫn đến thông báo sai lệch cho khách hàng.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-B-004",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-004",
    "scenarioSignature": {
      "testedPrinciple": "tool granularity optimization for schema context efficiency",
      "failureMode": "high token consumption and tool selection ambiguity from over-fragmented schemas",
      "rootCause": "exposing thirty individual property getter tools instead of single parameter-filtered retrieval tool",
      "requiredFix": "consolidate atomic getter tools into single retrieval tool with field filter array parameter"
    },
    "questionEN": "An enterprise customer support MCP server exposes 30 individual tools (get_user_name, get_user_email, get_user_phone, get_user_address, etc.) for querying distinct user profile attributes. As a result, the tool schema definitions consume over 8,000 prompt tokens per turn, and the agent frequently selects multiple unnecessary tools sequentially to gather a single user's profile. Which refactoring strategy best optimizes tool granularity and context window efficiency?",
    "question": "[d2-b04-B-004] Một MCP server hỗ trợ khách hàng doanh nghiệp cung cấp 30 tool riêng lẻ (get_user_name, get_user_email, get_user_phone, get_user_address, v.v.) để truy vấn các thuộc tính hồ sơ người dùng khác nhau. Hệ quả là định nghĩa schema của các tool này tiêu tốn hơn 8.000 prompt token mỗi lượt thoại, và agent thường xuyên chọn nối tiếp nhiều tool không cần thiết để thu thập thông tin một người dùng. Chiến lược tái cấu trúc nào tối ưu nhất độ mịn (granularity) của tool và hiệu quả cửa số ngữ cảnh?",
    "optionsEN": [
      "A. Combine all 30 properties into a single mandatory get_all_user_data(user_id: string) tool that always returns the complete enterprise user database record.",
      "B. Group the 30 tools into 5 sub-category tools (get_user_contact, get_user_billing, etc.) while retaining fixed individual return fields.",
      "C. Add a prompt instruction asking the agent to strictly limit its tool invocations to a maximum of 2 calls per customer turn.",
      "D. Consolidate the getters into a single get_user(user_id: string, fields: string[]) tool where the fields array allows selecting specific attributes."
    ],
    "options": [
      "A. Gộp cả 30 thuộc tính thành một tool bắt buộc duy nhất get_all_user_data(user_id: string) luôn trả về toàn bộ bản ghi người dùng trong cơ sở dữ liệu.",
      "B. Nhóm 30 tool thành 5 tool theo danh mục phụ (get_user_contact, get_user_billing, v.v.) nhưng vẫn giữ nguyên các trường trả về cố định.",
      "C. Thêm một chỉ thị prompt yêu cầu agent giới hạn nghiêm ngặt việc gọi tool tối đa 2 lần mỗi lượt tương tác với khách hàng.",
      "D. Hợp nhất các getter thành một tool duy nhất get_user(user_id: string, fields: string[]) trong đó tham số mảng fields cho phép chọn các thuộc tính cụ thể."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A (Incorrect): Always returning the full user database record creates payload bloat and wastes downstream context window space when only 1 or 2 fields are needed.",
      "Option B (Incorrect): Sub-category grouping reduces the total tool count to 5 but still forces rigid payload structures and does not provide fine-grained field selection flexibility.",
      "Option C (Incorrect): Prompting the model to limit tool calls does not reduce the 8,000-token overhead of 30 tool definitions in the system context nor solve multi-attribute data retrieval.",
      "Option D (Correct): Consolidating 30 atomic getter tools into a single get_user tool with a fields array parameter drastically lowers tool schema prompt tokens while allowing the model to request precise attributes in one turn."
    ],
    "rationale": "Consolidating excessively granular tools into a single entity retrieval tool with dynamic field selection (fields: string[]) reduces schema definition overhead in prompt context while giving the model precise control over returned data payloads.",
    "explanation": "Phân tích các phương án:\n- Phương án A sai: Trả về toàn bộ bản ghi dữ liệu người dùng tạo ra payload quá lớn và lãng phí dung lượng context window khi người dùng chỉ cần 1 hoặc 2 trường thông tin.\n- Phương án B sai: Việc nhóm thành 5 tool phụ tuy giảm bớt số lượng tool nhưng vẫn duy trì các cấu trúc phản hồi cố định, không linh hoạt và không giải quyết triệt để bài toán chọn trường dữ liệu.\n- Phương án C sai: Chỉ thị prompt giới hạn số lần gọi tool không làm giảm 8.000 token tiêu tốn do 30 định nghĩa schema trong ngữ cảnh và không giúp agent lấy đủ nhiều thuộc tính trong một lần gọi.\n- Phương án D đúng: Việc hợp nhất 30 tool getter nguyên tử thành duy nhất một tool get_user với tham số fields dạng mảng giúp giảm mạnh số token định nghĩa tool trong system prompt, đồng thời cho phép agent lấy chính xác các thuộc tính cần thiết trong một lượt gọi.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]