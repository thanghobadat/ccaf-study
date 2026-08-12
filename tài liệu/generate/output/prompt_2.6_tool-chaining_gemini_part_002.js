[
  {
    "id": "d2-b06-2.6-003",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-003",
    "scenarioSignature": {
      "testedPrinciple": "parallel execution of independent read tools in single turn",
      "failureMode": "excessive workflow latency from serial execution of independent queries",
      "rootCause": "sequential tool chaining applied to non-dependent tool invocations",
      "requiredFix": "emit concurrent tool call requests in a single turn before downstream aggregation"
    },
    "questionEN": "An automated risk evaluation assistant in RiskEngine-V4 processes high-value transactions by querying three independent databases: check_internal_blacklist(tax_id), check_ofac_sanctions(entity_name), and check_device_reputation(ip_address). Currently, the assistant executes these tools in three consecutive turns sequentially before passing the collected records to aggregate_risk_score(score_list), resulting in an end-to-end latency of 850ms that violates the target p99 latency SLA of 350ms. How should the tool chaining architecture be redesigned to optimize execution without altering the underlying APIs?",
    "question": "[d2-b06-2.6-003] Một trợ lý đánh giá rủi ro tự động trong hệ thống RiskEngine-V4 xử lý các giao dịch giá trị cao bằng cách truy vấn ba cơ sở dữ liệu độc lập: check_internal_blacklist(tax_id), check_ofac_sanctions(entity_name), và check_device_reputation(ip_address). Hiện tại, trợ lý thực thi các công cụ này tuần tự qua ba lượt liên tiếp trước khi chuyển các bản ghi thu được cho aggregate_risk_score(score_list), dẫn đến độ trễ tổng thể 850ms vi phạm cam kết SLA độ trễ p99 là 350ms. Kiến trúc chuỗi công cụ (tool chaining) nên được thiết kế lại như thế nào để tối ưu hóa việc thực thi mà không thay đổi các API bên dưới?",
    "optionsEN": [
      "A. Wrap check_ofac_sanctions and check_device_reputation to consume the response object of check_internal_blacklist as a required parameter, forcing strict dependency ordering.",
      "B. Consolidate the three databases into a single MCP resource endpoint and replace tool calls with a polling HTTP GET client.",
      "C. Configure the model host to issue all three independent tool calls (check_internal_blacklist, check_ofac_sanctions, check_device_reputation) simultaneously in a single turn, then invoke aggregate_risk_score in the next turn using the combined outputs.",
      "D. Execute check_internal_blacklist synchronously, and delegate the remaining two lookups to an asynchronous background worker that writes results directly into a shared database table."
    ],
    "options": [
      "A. Bọc check_ofac_sanctions và check_device_reputation để tiêu thụ đối tượng phản hồi của check_internal_blacklist dưới dạng tham số bắt buộc, buộc thứ tự phụ thuộc nghiêm ngặt.",
      "B. Hợp nhất ba cơ sở dữ liệu thành một endpoint tài nguyên MCP duy nhất và thay thế các lời gọi công cụ bằng một HTTP GET client truy vấn định kỳ.",
      "C. Cấu hình host ứng dụng để mô hình phát ra cả ba lời gọi công cụ độc lập (check_internal_blacklist, check_ofac_sanctions, check_device_reputation) đồng thời trong một lượt duy nhất, sau đó gọi aggregate_risk_score ở lượt tiếp theo bằng các kết quả kết hợp.",
      "D. Thực thi check_internal_blacklist đồng bộ và giao hai truy vấn còn lại cho một worker chạy ngầm bất đồng bộ để ghi trực tiếp kết quả vào bảng cơ sở dữ liệu chung."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because creating artificial data dependencies between independent tools forces serial execution, compounding latency to 850ms rather than reducing it.",
      "Option B is incorrect because replacing tool calls with polling MCP resources breaks the tool-use interface protocol and prevents dynamic model-driven invocation of individual databases.",
      "Option C is correct because issuing three non-dependent tool calls in a single turn allows the orchestrator to execute the database queries concurrently (fan-out), reducing total lookup latency to the duration of the slowest query (~250ms) before executing the downstream aggregate_risk_score tool (fan-in).",
      "Option D is incorrect because writing evaluation state to an external database table bypasses the LLM execution context, preventing aggregate_risk_score from receiving the required parameters in the tool chain."
    ],
    "rationale": "When tool calls do not depend on each other's outputs, the model orchestrator should issue multi-tool call requests within a single execution turn (fan-out). This enables concurrent tool execution by the client application, reducing cumulative latency to max(t1, t2, t3) before passing the aggregated results to the downstream dependent tool in the next turn (fan-in).",
    "explanation": "Phân tích chi tiết từng lựa chọn trong ngữ cảnh của hệ thống RiskEngine-V4:\n\n- Lựa chọn A sai vì việc tạo phụ thuộc dữ liệu nhân tạo giữa các công cụ độc lập sẽ ép buộc thực thi tuần tự, làm trầm trọng thêm độ trễ tổng thể (850ms) thay vì giảm bớt.\n- Lựa chọn B sai vì thay thế các lời gọi công cụ bằng truy vấn MCP resource phá vỡ giao thức tool-use và ngăn mô hình gọi linh hoạt từng cơ sở dữ liệu khi cần.\n- Lựa chọn C đúng vì khi ba công cụ không có sự phụ thuộc lẫn nhau, mô hình có thể phát ra nhiều yêu cầu gọi công cụ song song (fan-out) trong cùng một lượt. Điều này cho phép client thực thi các truy vấn cơ sở dữ liệu đồng thời, giảm tổng thời gian chờ xuống bằng thời gian của truy vấn chậm nhất (~250ms), trước khi chuyển kết quả thu được sang công cụ tổng hợp aggregate_risk_score ở lượt tiếp theo (fan-in).\n- Lựa chọn D sai vì việc ghi trạng thái đánh giá vào cơ sở dữ liệu bên ngoài bỏ qua ngữ cảnh của LLM, khiến công cụ aggregate_risk_score không nhận được các tham số cần thiết trong chuỗi công cụ.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  },
  {
    "id": "d2-b06-2.6-004",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-004",
    "questionEN": "In the TalentMatch-AI recruitment pipeline, an agent executes search_candidates(skill_matrix, min_experience_years) followed by fetch_candidate_details(candidate_ids). When a query returns zero matches (candidate_ids: []), the agent unconditionally calls fetch_candidate_details(candidate_ids: []), causing the endpoint to throw a HTTP 400 Invalid Argument: candidate_ids cannot be empty error. How should the tool chaining control logic handle this empty search result?",
    "question": "[d2-b06-2.6-004] Trong quy trình tuyển dụng của TalentMatch-AI, một agent thực thi search_candidates(skill_matrix, min_experience_years) theo sau là fetch_candidate_details(candidate_ids). Khi một truy vấn không tìm thấy kết quả phù hợp (candidate_ids: []), agent vẫn gọi fetch_candidate_details(candidate_ids: []) một cách vô điều kiện, khiến endpoint ném ra lỗi HTTP 400 Invalid Argument: candidate_ids cannot be empty. Luồng điều khiển chuỗi công cụ nên xử lý kết quả tìm kiếm rỗng này như thế nào?",
    "optionsEN": [
      "A. Inject dummy candidate IDs such as [\"ID-0000\"] into candidate_ids so fetch_candidate_details executes without throwing a schema validation error.",
      "B. Configure an automatic retry policy on search_candidates that re-runs the search up to 5 times until non-empty candidate_ids are returned.",
      "C. Wrap fetch_candidate_details in a try-catch block that swallows the HTTP 400 exception and returns an empty profile dictionary.",
      "D. Intercept the valid empty response candidate_ids: [] to short-circuit the execution chain, skipping fetch_candidate_details and returning a definitive 'no candidates found' response."
    ],
    "options": [
      "A. Chèn các ID ứng viên giả định như [\"ID-0000\"] vào candidate_ids để fetch_candidate_details thực thi mà không gây ra lỗi kiểm tra schema.",
      "B. Cấu hình chính sách thử lại (retry policy) tự động cho search_candidates để chạy lại truy vấn tối đa 5 lần cho đến khi nhận được danh sách candidate_ids không rỗng.",
      "C. Bọc fetch_candidate_details trong khối try-catch để nuốt ngoại lệ HTTP 400 và trả về một từ điển hồ sơ rỗng.",
      "D. Chặn kết quả hợp lệ candidate_ids: [] để ngắt mạch (short-circuit) chuỗi thực thi, bỏ qua fetch_candidate_details và trả về phản hồi xác nhận 'không tìm thấy ứng viên nào'."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because passing synthetic dummy IDs creates corrupt lookups and risks returning invalid candidate profiles to the end user.",
      "Option B is incorrect because returning zero matching candidates is a valid successful search result, not a transient network error, so retrying will not produce new candidates and only wastes API credits.",
      "Option C is incorrect because suppressing the HTTP 400 error still incurs unnecessary API network round-trips and fails to address the root problem of invoking downstream tools with empty inputs.",
      "Option D is correct because an empty search result is a valid terminal state; short-circuiting the chain avoids calling downstream tools with invalid parameters (candidate_ids: []), saving API latency and preventing validation exceptions."
    ],
    "rationale": "Tool chaining control flows must check for valid zero-result conditions returned by upstream retrieval tools. When an upstream tool returns an empty set of identifiers, the orchestrator must short-circuit the chain to prevent calling downstream tools with empty payload parameters, which causes schema validation failures and unnecessary API overhead.",
    "explanation": "Phân tích chi tiết từng lựa chọn trong ngữ cảnh của hệ thống TalentMatch-AI:\\n\\n- Lựa chọn A sai vì việc chèn ID giả định sẽ tạo ra truy vấn sai lệch và có nguy cơ trả về thông tin ứng viên không hợp lệ cho người dùng.\\n- Lựa chọn B sai vì trả về 0 ứng viên là một kết quả tìm kiếm thành công và hợp lệ chứ không phải lỗi mạng tạm thời, nên việc thử lại nhiều lần chỉ lãng phí tài nguyên API mà không thay đổi kết quả.\\n- Lựa chọn C sai vì việc nuốt lỗi HTTP 400 vẫn gây ra các lượt gọi API không cần thiết và không giải quyết tận gốc vấn đề gọi công cụ phía sau với dữ liệu đầu vào rỗng.\\n- Lựa chọn D đúng vì kết quả tìm kiếm rỗng là một trạng thái dừng (terminal state) hợp lệ. Việc ngắt mạch (short-circuit) luồng thực thi giúp bỏ qua việc gọi fetch_candidate_details với tham số rỗng (candidate_ids: []), tránh gây ra lỗi validation và giảm thiểu độ trễ cũng như chi phí gọi API.",
    "scenarioSignature": {
      "testedPrinciple": "conditional chain execution on empty upstream search results",
      "failureMode": "downstream schema validation error from executing tool with empty ID list",
      "rootCause": "unconditional tool invocation after valid empty search response",
      "requiredFix": "short-circuit execution chain when upstream query returns zero matching identifiers"
    },
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  }
]