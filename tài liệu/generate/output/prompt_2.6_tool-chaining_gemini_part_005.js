[
  {
    "id": "d2-b06-2.6-009",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-009",
    "scenarioSignature": {
      "testedPrinciple": "strict sequential gating for data-dependent tool execution",
      "failureMode": "data corruption from executing downstream side effects before validation completes",
      "rootCause": "speculative parallel invocation of dependent tool before prerequisite input validation",
      "requiredFix": "enforce strict sequential turn barriers where downstream tools emit only upon prerequisite success"
    },
    "questionEN": "An AI agent orchestrating database schema migrations receives a request to update table definitions. The pipeline includes validate_schema_spec(schema_json) to check column constraints and execute_schema_migration(migration_id, schema_json) to apply physical database DDL statements. To reduce overall latency, the orchestration engine speculatively invokes execute_schema_migration in parallel alongside validate_schema_spec. When validate_schema_spec fails with error ERR_INVALID_CONSTRAINT, execute_schema_migration has already executed partial schema changes, causing database state corruption (ERR_CORRUPTED_DDL). How should the tool chaining architecture be structured to eliminate this speculative failure?",
    "question": "[d2-b06-2.6-009] Một agent AI điều phối chuyển đổi schema cơ sở dữ liệu nhận được yêu cầu cập nhật định nghĩa bảng. Quy trình bao gồm validate_schema_spec(schema_json) để kiểm tra các ràng buộc cột và execute_schema_migration(migration_id, schema_json) để áp dụng các câu lệnh DDL vật lý. Để giảm độ trễ tổng thể, engine điều phối thực thi suy đoán execute_schema_migration song song cùng lúc với validate_schema_spec. Khi validate_schema_spec thất bại với lỗi ERR_INVALID_CONSTRAINT, execute_schema_migration đã thực thi một phần thay đổi schema, gây ra sai hỏng trạng thái cơ sở dữ liệu (ERR_CORRUPTED_DDL). Kiến trúc chuỗi công cụ (tool chaining architecture) nên được cấu trúc như thế nào để loại bỏ lỗi thực thi suy đoán này?",
    "optionsEN": [
      "A. Enforce strict sequential turn barriers where execute_schema_migration is invoked only after validate_schema_spec completes and returns a successful validation status.",
      "B. Increase the speculative execution priority of validate_schema_spec while allowing execute_schema_migration to execute concurrently with standard transaction locks.",
      "C. Retain parallel execution of both tools but configure execute_schema_migration to execute an automated rollback tool whenever validate_schema_spec returns failure.",
      "D. Replace validate_schema_spec with an async polling loop that validates schema logs after execute_schema_migration finishes applying DDL modifications."
    ],
    "options": [
      "A. Áp dụng rào cản tuần tự nghiêm ngặt (strict sequential turn barriers), trong đó execute_schema_migration chỉ được gọi sau khi validate_schema_spec hoàn thành và trả về trạng thái xác thực thành công.",
      "B. Tăng ưu tiên thực thi suy đoán của validate_schema_spec đồng thời cho phép execute_schema_migration thực thi đồng thời với khóa giao dịch tiêu chuẩn.",
      "C. Giữ nguyên việc thực thi song song cả hai công cụ nhưng cấu hình execute_schema_migration kích hoạt công cụ hoàn tác tự động (automated rollback tool) bất cứ khi nào validate_schema_spec trả về thất bại.",
      "D. Thay thế validate_schema_spec bằng một vòng lặp truy vấn bất đồng bộ (async polling loop) để xác thực log schema sau khi execute_schema_migration hoàn tất áp dụng sửa đổi DDL."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because tools with mutation side effects must not execute speculatively before validation completes; gating downstream calls until prerequisite validation succeeds prevents state corruption.",
      "Option B is incorrect because increasing execution priority or setting concurrency locks does not fix the race condition of running dependent state-mutating actions prior to validation.",
      "Option C is incorrect because running speculative side effects and relying on compensation/rollback is error-prone, inefficient, and can leave corrupted states if the rollback fails.",
      "Option D is incorrect because post-execution asynchronous validation allows invalid schema changes to affect production database tables prior to detection."
    ],
    "rationale": "In data-dependent tool chains where a prerequisite tool validates inputs for a downstream tool with side effects, speculative parallel execution risks executing invalid operations that corrupt state. Enforcing strict sequential turn barriers guarantees that downstream calls are dispatched only after validation succeeds.",
    "explanation": "Lựa chọn A đúng vì trong chuỗi công cụ có phụ thuộc dữ liệu, công cụ có tác dụng phụ (side effects) như sửa đổi schema cơ sở dữ liệu không được thực thi suy đoán trước khi công cụ tiền đề hoàn tất xác thực dữ liệu đầu vào. Việc thiết lập rào cản tuần tự (sequential turn barriers) đảm bảo công cụ phía sau chỉ được kích hoạt khi xác thực thành công.\nLựa chọn B sai vì việc điều chỉnh ưu tiên thực thi hay dùng khóa giao dịch không xử lý được race condition do gọi công cụ sửa đổi dữ liệu trước khi biết kết quả xác thực.\nLựa chọn C sai vì thực thi suy đoán gây ra tác dụng phụ rồi dựa vào công cụ hoàn tác (rollback) là giải pháp dễ phát sinh lỗi và có thể để lại trạng thái hỏng nếu rollback thất bại.\nLựa chọn D sai vì xác thực sau khi thực thi cho phép các câu lệnh DDL không hợp lệ can thiệp và làm hỏng cơ sở dữ liệu trước khi lỗi được phát hiện.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  },
  {
    "id": "d2-b06-2.6-010",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-010",
    "scenarioSignature": {
      "testedPrinciple": "mixed DAG tool chaining with parallel fan-out acquisition and sequential fan-in reconciliation",
      "failureMode": "high overall end to end latency from sequential execution of independent acquisition branches",
      "rootCause": "failing to execute independent data acquisition branches concurrently before dependent reconciliation",
      "requiredFix": "invoke independent branch tools in parallel then gate dependent tool on completion of both inputs"
    },
    "questionEN": "An automated accounting assistant reconciles enterprise user accounts by querying an internal CRM service get_crm_profile(account_id) and an external billing gateway get_billing_invoices(account_id). The outputs from both independent acquisitions are then fed into reconcile_discrepancies(crm_data, billing_data) to generate audit reports. The current orchestration engine executes the three tools serially (get_crm_profile -> get_billing_invoices -> reconcile_discrepancies), resulting in an elevated P99 latency of 4,800 ms (LATENCY_HIGH). How should this mixed DAG (Directed Acyclic Graph) workflow be chained to minimize execution latency while preserving data dependencies?",
    "question": "[d2-b06-2.6-010] Một trợ lý kế toán tự động đối soát tài khoản doanh nghiệp bằng cách truy vấn dịch vụ CRM nội bộ get_crm_profile(account_id) và cổng thanh toán bên ngoài get_billing_invoices(account_id). Đầu ra từ cả hai lần thu thập độc lập này sau đó được đưa vào reconcile_discrepancies(crm_data, billing_data) để tạo báo cáo kiểm toán. Engine điều phối hiện tại thực thi ba công cụ này theo chuỗi tuần tự (get_crm_profile -> get_billing_invoices -> reconcile_discrepancies), dẫn đến độ trễ P99 tăng cao lên 4,800 ms (LATENCY_HIGH). Quy trình DAG (Directed Acyclic Graph) hỗn hợp này nên được nối chuỗi như thế nào để tối thiểu hóa độ trễ thực thi mà vẫn bảo toàn các phụ thuộc dữ liệu?",
    "optionsEN": [
      "A. Launch all three tools concurrently in a single parallel execution turn, supplying null placeholders to reconcile_discrepancies while fetching acquisition payloads.",
      "B. Execute get_crm_profile and get_billing_invoices concurrently in a parallel fan-out turn, wait for both inputs to return (fan-in), and then sequentially invoke reconcile_discrepancies.",
      "C. Restructure the chain into serial execution based on estimated latency: execute get_billing_invoices first, forward its metadata to get_crm_profile, and finally call reconcile_discrepancies.",
      "D. Execute get_crm_profile serially, pass its payload directly to reconcile_discrepancies, and run get_billing_invoices asynchronously without awaiting its final result."
    ],
    "options": [
      "A. Chạy đồng thời cả ba công cụ trong một lượt thực thi song song duy nhất, cung cấp các giá trị giữ chỗ null cho reconcile_discrepancies trong khi truy xuất payload dữ liệu.",
      "B. Thực thi get_crm_profile và get_billing_invoices đồng thời trong một lượt phân nhánh song song (parallel fan-out), chờ cả hai đầu vào trả về (fan-in), sau đó gọi tuần tự reconcile_discrepancies.",
      "C. Cấu trúc lại chuỗi thành thực thi tuần tự dựa trên độ trễ ước tính: thực thi get_billing_invoices trước, chuyển tiếp metadata của nó tới get_crm_profile, và cuối cùng gọi reconcile_discrepancies.",
      "D. Thực thi tuần tự get_crm_profile, chuyển trực tiếp payload của nó tới reconcile_discrepancies, và chạy get_billing_invoices bất đồng bộ mà không cần chờ kết quả cuối cùng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because reconcile_discrepancies strictly depends on the output of both data sources; calling it concurrently with placeholder values will cause payload errors.",
      "Option B is correct because get_crm_profile and get_billing_invoices are independent branches that can run concurrently (fan-out); once both return, reconcile_discrepancies can execute with full data (fan-in), minimizing total execution latency.",
      "Option C is incorrect because reordering serial execution does not reduce total latency since independent acquisitions are still run sequentially instead of in parallel.",
      "Option D is incorrect because running get_billing_invoices asynchronously without awaiting its completion deprives reconcile_discrepancies of required billing data, breaking reconciliation logic."
    ],
    "rationale": "A mixed DAG workflow containing independent data retrieval branches followed by an aggregation/reconciliation step should execute independent tasks in parallel (fan-out) and join their results before invoking the dependent downstream tool (fan-in). This maximizes concurrency while adhering to strict data dependency requirements.",
    "explanation": "Lựa chọn B đúng vì get_crm_profile và get_billing_invoices là hai nhánh thu thập dữ liệu độc lập, có thể chạy song song (fan-out). Khi cả hai hoàn thành, công cụ phụ thuộc reconcile_discrepancies mới được gọi tuần tự với đầy đủ dữ liệu (fan-in), giúp giảm tối đa thời gian chờ tổng thể mà vẫn đảm bảo tính đúng đắn của dữ liệu.\nLựa chọn A sai vì reconcile_discrepancies phụ thuộc trực tiếp vào kết quả của cả hai công cụ; chạy đồng thời với giá trị giữ chỗ (null) sẽ gây ra lỗi thiếu dữ liệu.\nLựa chọn C sai vì thay đổi thứ tự gọi tuần tự không làm giảm tổng độ trễ do hai nhánh độc lập vẫn bị thực thi nối tiếp nhau.\nLựa chọn D sai vì chạy bất đồng bộ get_billing_invoices mà không chờ kết quả sẽ làm cho reconcile_discrepancies bị thiếu dữ liệu hóa đơn cần thiết.",
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  }
]