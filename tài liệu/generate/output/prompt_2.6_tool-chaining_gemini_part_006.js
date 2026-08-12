[
  {
    "id": "d2-b06-2.6-011",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-011",
    "scenarioSignature": {
      "testedPrinciple": "hybrid sequential page iteration and parallel item fan-out tool execution",
      "failureMode": "high end-to-end latency during paginated data processing",
      "rootCause": "sequential execution of independent item-level processing tools within paginated iterations",
      "requiredFix": "sequence page token requests serially while executing item-level processing tools in parallel per page"
    },
    "questionEN": "An AI automated compliance agent processes audit logs by calling fetch_audit_page(page_token) which returns items (array of record IDs) and next_page_token. For each log ID in items, the agent must invoke analyze_log_entry(entry_id) to extract anomaly metrics. When processing a dataset spanning 100 pages, the orchestrator experiences high end-to-end execution latency because it executes analyze_log_entry sequentially for every record before requesting the next page. How should the tool chaining workflow be optimized to ensure correct data dependencies and minimal latency?",
    "question": "[d2-b06-2.6-011] Một agent tuân thủ tự động xử lý các nhật ký kiểm toán bằng cách gọi fetch_audit_page(page_token) trả về items (mảng ID bản ghi) và next_page_token. Đối với mỗi ID nhật ký trong items, agent phải gọi analyze_log_entry(entry_id) để trích xuất chỉ số bất thường. Khi xử lý tập dữ liệu kéo dài 100 trang, bộ điều phối gặp độ trễ thực thi đầu-cuối cao vì nó thực thi analyze_log_entry tuần tự cho từng bản ghi trước khi yêu cầu trang tiếp theo. Quy trình chuỗi công cụ (tool chaining) nên được tối ưu hóa như thế nào để đảm bảo đúng phụ thuộc dữ liệu và độ trễ tối thiểu?",
    "optionsEN": [
      "A. Issue fetch_audit_page calls in parallel for pre-calculated numeric page tokens while executing analyze_log_entry sequentially for returned items.",
      "B. Defer calling analyze_log_entry until all pages are fetched, storing all items in memory and processing all log records in a single batch tool call.",
      "C. Chain fetch_audit_page calls sequentially using the returned next_page_token, while issuing parallel fan-out tool calls for analyze_log_entry across all items within each fetched page.",
      "D. Execute both fetch_audit_page and analyze_log_entry in parallel batches by predicting future page tokens using timestamp offsets."
    ],
    "options": [
      "A. Phát các lời gọi fetch_audit_page song song dựa trên các page token dạng số tính trước, trong khi thực thi analyze_log_entry tuần tự cho các mục trả về.",
      "B. Hoãn việc gọi analyze_log_entry cho đến khi tất cả các trang được tải xong, lưu tất cả các mục vào bộ nhớ và xử lý toàn bộ bản ghi nhật ký trong một lời gọi công cụ theo lô duy nhất.",
      "C. Chuỗi các lời gọi fetch_audit_page tuần tự bằng cách sử dụng next_page_token trả về, đồng thời phát các lời gọi công cụ song song (fan-out) cho analyze_log_entry trên tất cả các mục trong mỗi trang đã lấy.",
      "D. Thực thi cả fetch_audit_page và analyze_log_entry theo các lô song song bằng cách dự đoán các page token tương lai dựa trên độ lệch mốc thời gian (timestamp offsets)."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because opaque cursor-based page tokens cannot be pre-calculated or fetched in parallel without receiving upstream responses, causing HTTP 400 errors, while serial item processing fails to resolve the latency bottleneck.",
      "Option B is incorrect because accumulating all items in memory across all pages before processing increases memory overhead and prevents streaming results, without leveraging per-page parallelism during fetch transitions.",
      "Option C is correct because fetch_audit_page must be called sequentially as each next_page_token depends on the previous API response, but analyze_log_entry calls for items within a single page are mutually independent and should be executed in parallel to minimize total latency.",
      "Option D is incorrect because opaque pagination cursors cannot be accurately predicted via timestamp offsets; speculative token generation leads to API validation errors."
    ],
    "rationale": "Pagination tokens form an unskippable sequential dependency chain because next_page_token is unknown until fetch_audit_page responds. However, records returned within a single page are independent and can be processed concurrently via analyze_log_entry fan-out calls, balancing dependency constraints with parallel latency optimization.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A sai vì các page token dạng cursor không thể tính trước hay lấy song song mà không nhận phản hồi từ trang trước (dẫn đến lỗi HTTP 400), trong khi việc xử lý mục tuần tự gây ra độ trễ cao.\n- Option B sai vì việc lưu trữ toàn bộ dữ liệu của tất cả các trang vào bộ nhớ trước khi xử lý làm tăng tải bộ nhớ và ngăn cản việc streaming kết quả mà không khai thác tính song song theo từng trang.\n- Option C đúng vì fetch_audit_page bắt buộc phải gọi tuần tự do next_page_token phụ thuộc vào kết quả của trang trước, nhưng các lời gọi analyze_log_entry cho các mục trong cùng một trang hoàn toàn độc lập và nên được thực thi song song để giảm tối đa độ trễ.\n- Option D sai vì các cursor phân trang không thể dự đoán chính xác qua mốc thời gian; việc tạo token phỏng đoán sẽ dẫn đến lỗi xác thực API.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  },
  {
    "id": "d2-b06-2.6-012",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-012",
    "scenarioSignature": {
      "testedPrinciple": "scoped authentication refresh in tool chains with unblocked parallel public calls",
      "failureMode": "unnecessary pipeline cancellation or retry looping upon tool authentication failure",
      "rootCause": "failure to isolate auth refresh dependencies to protected tool calls while continuing independent public executions",
      "requiredFix": "invoke token refresh prior to retrying the protected tool while allowing unauthenticated tools to proceed in parallel"
    },
    "questionEN": "An AI operations assistant executes a multi-tool plan containing an unauthenticated tool get_system_health(component_id) and an authenticated tool deploy_service_patch(service_id, patch_data). During execution, deploy_service_patch fails with an HTTP 401 Unauthorized error due to an expired OAuth access token. Simultaneously, the orchestrator needs to process ongoing health checks. How should the agent handle authentication refresh and tool chaining to resolve the failure efficiently?",
    "question": "[d2-b06-2.6-012] Một trợ lý vận hành AI thực thi một kế hoạch đa công cụ gồm công cụ không yêu cầu xác thực get_system_health(component_id) và công cụ yêu cầu xác thực deploy_service_patch(service_id, patch_data). Trong quá trình thực thi, deploy_service_patch thất bại với lỗi HTTP 401 Unauthorized do token truy cập OAuth đã hết hạn. Đồng thời, bộ điều phối cần xử lý các kiểm tra sức khỏe đang diễn ra. Agent nên xử lý việc làm mới xác thực và chuỗi công cụ (tool chaining) như thế nào để khắc phục lỗi một cách hiệu quả?",
    "optionsEN": [
      "A. Abort the entire plan immediately, invalidate all pending tool execution promises, and wait for manual user re-authentication.",
      "B. Retry deploy_service_patch immediately with an exponential backoff strategy while pausing get_system_health until the retry succeeds.",
      "C. Execute refresh_oauth_token and deploy_service_patch in parallel while cancelling unauthenticated get_system_health calls.",
      "D. Call refresh_oauth_token sequentially before retrying deploy_service_patch, while allowing independent get_system_health calls to continue execution in parallel."
    ],
    "options": [
      "A. Hủy bỏ toàn bộ kế hoạch ngay lập tức, vô hiệu hóa tất cả các promise thực thi công cụ đang chờ và đợi người dùng xác thực lại thủ công.",
      "B. Thử lại deploy_service_patch ngay lập tức với chiến lược exponential backoff trong khi tạm dừng get_system_health cho đến khi thử lại thành công.",
      "C. Thực thi refresh_oauth_token và deploy_service_patch song song trong khi hủy bỏ các lời gọi get_system_health không yêu cầu xác thực.",
      "D. Gọi refresh_oauth_token tuần tự trước khi thử lại deploy_service_patch, đồng thời cho phép các lời gọi get_system_health độc lập tiếp tục thực thi song song."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because aborting the entire plan on a recoverable HTTP 401 error creates unnecessary system downtime and ignores available token refresh mechanisms.",
      "Option B is incorrect because retrying deploy_service_patch without refreshing the expired token will repeatedly fail with HTTP 401, and pausing unauthenticated health checks introduces unnecessary latency to independent tasks.",
      "Option C is incorrect because retrying deploy_service_patch in parallel with refresh_oauth_token causes a race condition where the retry uses the old expired token before the refresh completes, and cancelling public calls is unneeded.",
      "Option D is correct because refresh_oauth_token must be executed sequentially prior to retrying deploy_service_patch so the retry receives the new credential, while get_system_health is unauthenticated and independent, allowing it to continue running in parallel without interruption."
    ],
    "rationale": "When an authenticated tool encounters token expiration (HTTP 401), refresh_oauth_token must strictly precede the retried deploy_service_patch request to establish valid credentials. Meanwhile, unauthenticated operations like get_system_health have no auth dependency and should continue executing in parallel without being blocked or cancelled.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A sai vì việc hủy bỏ toàn bộ kế hoạch khi gặp lỗi HTTP 401 có thể khắc phục được sẽ tạo ra thời gian chết không cần thiết và bỏ qua các công cụ làm mới token sẵn có.\n- Option B sai vì việc thử lại deploy_service_patch mà không làm mới token đã hết hạn sẽ liên tục thất bại với lỗi HTTP 401, đồng thời việc tạm dừng kiểm tra sức khỏe không yêu cầu xác thực làm tăng độ trễ không cần thiết.\n- Option C sai vì thực thi deploy_service_patch song song với refresh_oauth_token gây ra tình trạng race condition (thử lại bằng token cũ trước khi làm mới xong), và việc hủy các lời gọi công khai là không cần thiết.\n- Option D đúng vì refresh_oauth_token phải được thực thi tuần tự trước khi thử lại deploy_service_patch để lời gọi thử lại nhận được token mới, trong khi get_system_health không cần xác thực và độc lập nên tiếp tục chạy song song mà không bị gián đoạn.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  }
]