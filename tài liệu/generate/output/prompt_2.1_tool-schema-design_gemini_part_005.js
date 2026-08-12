[
  {
    "id": "d2-b04-new-009",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-009",
    "questionEN": "An automated supply chain agent in LogisticsHub has access to two tools: fetch_live_inventory(sku: string) (description: \"call this to get data\") and get_cached_inventory(sku: string) (description: \"fetches cached stock levels\"). During routine catalog browsing queries, the agent consistently calls fetch_live_inventory, causing database connection pool exhaustion (HTTP 503) and bypassing the Redis cache entirely. How should the schema for fetch_live_inventory be updated to resolve this issue?",
    "question": "[d2-b04-new-009] Một agent chuỗi cung ứng tự động trong LogisticsHub có truy cập vào hai tool: fetch_live_inventory(sku: string) (mô tả: \"call this to get data\") và get_cached_inventory(sku: string) (mô tả: \"fetches cached stock levels\"). Trong các truy vấn duyệt danh mục thông thường, agent liên tục gọi fetch_live_inventory, gây cạn kiệt connection pool của cơ sở dữ liệu (HTTP 503) và bỏ qua hoàn toàn Redis cache. Schema của fetch_live_inventory nên được cập nhật như thế nào để giải quyết vấn đề này?",
    "optionsEN": [
      "A. Update the description of fetch_live_inventory to state: \"Fetch real - time stock from PostgreSQL only during checkout verification when exact inventory is required; use get_cached_inventory for routine catalog browsing.\"",
      "B. Add a regex pattern constraint ^SKU-[0-9]{6}$ to the sku parameter of fetch_live_inventory to force the agent to query cached data first.",
      "C. Refactor fetch_live_inventory into a monolithic manage_inventory(action: string) tool so the model cannot invoke live database queries directly.",
      "D. Change the parameter type of sku in fetch_live_inventory from string to an enum listing all current warehouse stock items."
    ],
    "options": [
      "A. Cập nhật description của fetch_live_inventory thành: \"Fetch real - time stock from PostgreSQL only during checkout verification when exact inventory is required; use get_cached_inventory for routine catalog browsing.\"",
      "B. Thêm ràng buộc regex pattern ^SKU-[0-9]{6}$ vào tham số sku của fetch_live_inventory để buộc agent phải truy vấn dữ liệu cache trước.",
      "C. Tái cấu trúc fetch_live_inventory thành một tool đơn khối manage_inventory(action: string) để model không thể gọi trực tiếp các truy vấn cơ sở dữ liệu trực tiếp.",
      "D. Thay đổi kiểu tham số của sku trong fetch_live_inventory từ string thành một enum liệt kê tất cả các mặt hàng tồn kho hiện tại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Providing explicit operational context defining WHEN to use fetch_live_inventory versus get_cached_inventory resolves ambiguous selection rationale and prevents unnecessary live database calls.",
      "Option B is incorrect: Adding regex pattern validation ensures valid SKU string structure but does not give the LLM operational guidance on selecting between live and cached tools.",
      "Option C is incorrect: Combining functions into a monolithic tool degrades tool reasoning clarity and does not solve the underlying ambiguity regarding when live database access is appropriate.",
      "Option D is incorrect: Converting sku to an enum restricts parameter values to known SKUs but does not inform the model when to choose live queries over cache."
    ],
    "rationale": "Tool descriptions must state clear operational guidance, including WHAT the tool does and WHEN to use it relative to alternative tools. Clarifying the trigger conditions for live vs cached data prevents incorrect tool selection and system performance degradation.",
    "explanation": "Lựa chọn A đúng vì định nghĩa rõ ràng bối cảnh vận hành (WHEN) trong description giúp LLM phân biệt chính xác khi nào cần truy vấn live DB (khi thanh toán) và khi nào dùng cache (khi duyệt sản phẩm). Lựa chọn B sai vì regex pattern chỉ kiểm tra định dạng SKU chứ không chỉ dẫn agent chọn tool nào. Lựa chọn C sai vì biến tool thành đơn khối (monolithic) làm giảm khả năng suy luận của model và không giải quyết được vấn đề chọn sai tool. Lựa chọn D sai vì kiểu enum cho SKU chỉ giới hạn danh sách SKU hợp lệ chứ không hướng dẫn bối cảnh chọn tool.",
    "scenarioSignature": {
      "testedPrinciple": "tool description operational context for tool selection",
      "failureMode": "agent invokes live tool instead of cache tool",
      "rootCause": "tool description lacks explicit criteria specifying when to use vs alternative tool",
      "requiredFix": "update tool description with explicit usage conditions distinguishing it from cached alternative"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-new-010",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-new-010",
    "questionEN": "A financial analytics agent in MetricsEngine uses an MCP tool execute_query(sql: string) where sql is defined as an unconstrained string with description \"Executes SQL queries against the metrics database\". When instructed to remove outdated daily aggregation tables, the LLM generates and executes DROP TABLE temp_daily_metrics, causing catastrophic schema corruption in production. How should the tool schema be constrained to prevent execution of DDL statements?",
    "question": "[d2-b04-new-010] Một agent phân tích tài chính trong MetricsEngine sử dụng MCP tool execute_query(sql: string) trong đó sql được định nghĩa là chuỗi không có ràng buộc với description \"Executes SQL queries against the metrics database\". Khi được hướng dẫn xóa các bảng tổng hợp hàng ngày đã cũ, LLM tạo và thực thi DROP TABLE temp_daily_metrics, gây hỏng schema nghiêm trọng trong môi trường production. Schema của tool nên được ràng buộc như thế nào để ngăn chặn việc thực thi các câu lệnh DDL?",
    "optionsEN": [
      "A. Change the sql parameter type from string to object and define property query_type with description \"SQL statement type\".",
      "B. Apply a regex pattern constraint (?i)^\\s*SELECT\\b to the sql parameter schema and explicitly update its description to state that only read-only SELECT queries are allowed.",
      "C. Implement a secondary verification tool check_table_exists(table_name: string) that the agent must invoke prior to calling execute_query.",
      "D. Add an optional boolean parameter enable_ddl: boolean defaulting to true to let the database driver authorize DDL execution."
    ],
    "options": [
      "A. Thay đổi kiểu tham số sql từ string thành object và định nghĩa thuộc tính query_type với description \"SQL statement type\".",
      "B. Áp dụng ràng buộc regex pattern (?i)^\\s*SELECT\\b vào schema của tham số sql và cập nhật rõ ràng description rằng chỉ cho phép các truy vấn SELECT đọc dữ liệu.",
      "C. Triển khai một tool xác minh phụ check_table_exists(table_name: string) mà agent phải gọi trước khi gọi execute_query.",
      "D. Thêm một tham số tùy chọn boolean enable_ddl: boolean mặc định là true để cho phép database driver ủy quyền thực thi DDL."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Changing parameter type to object invalidates standard SQL string inputs without preventing DDL statements inside object properties.",
      "Option B is correct: Adding a regex pattern constraint enforcing that queries begin with SELECT restricts parameter values to read-only DML at the schema validation layer, preventing destructive DDL commands like DROP TABLE.",
      "Option C is incorrect: Adding a table check tool does not constrain execute_query's parameter schema and still allows the LLM to submit DDL statements.",
      "Option D is incorrect: Adding a boolean enable_ddl defaulting to true maintains DDL execution capabilities and fails to prevent destructive schema changes."
    ],
    "rationale": "Tool parameter schemas must use pattern constraints (such as regex matching) to enforce structural limitations on free-form string inputs. Enforcing a SELECT-only pattern prevents the model from generating dangerous DDL operations like DROP TABLE.",
    "explanation": "Lựa chọn B đúng vì việc thêm ràng buộc regex pattern (?i)^\\s*SELECT\\b vào schema giúp chặn các câu lệnh DDL phá hủy (như DROP TABLE) ngay từ bước kiểm tra tính hợp lệ của schema parameter, chỉ cho phép lệnh SELECT đọc dữ liệu. Lựa chọn A sai vì thay đổi kiểu thành object khiến đầu vào SQL sai cấu trúc và không chặn được DDL. Lựa chọn C sai vì tool kiểm tra bảng không hạn chế được schema của execute_query. Lựa chọn D sai vì tham số enable_ddl mặc định là true vẫn cho phép thực thi DDL.",
    "scenarioSignature": {
      "testedPrinciple": "schema pattern constraints for SQL parameter validation",
      "failureMode": "destructive DDL statement execution causing table drop",
      "rootCause": "unconstrained string parameter allowing arbitrary DDL commands",
      "requiredFix": "apply regex pattern constraint restricting parameter to read only SELECT statements"
    },
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]