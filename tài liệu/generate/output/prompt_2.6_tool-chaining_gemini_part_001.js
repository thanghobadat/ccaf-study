[
  {
    "id": "d2-b06-2.6-001",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-001",
    "questionEN": "An agentic workflow in WeatherAssist receives a user request: \"What is the forecast for 100 Market St, San Francisco?\". The system provides MCP tools geocode_address(address: string) -> {lat: float, lon: float} and get_weather(lat: float, lon: float) -> {temperature: float, condition: string}. The LLM attempts to execute both tools in parallel in a single response turn, passing lat: null, lon: null to get_weather, triggering an HTTP 400 Bad Request validation error from the weather API endpoint. Why did this tool execution strategy fail, and how should the tool chain be structured?",
    "question": "[d2-b06-2.6-001] Một luồng công việc tự động trong WeatherAssist nhận yêu cầu từ người dùng: \"Dự báo thời tiết tại 100 Market St, San Francisco là gì?\". Hệ thống cung cấp các công cụ MCP: geocode_address(address: string) -> {lat: float, lon: float} và get_weather(lat: float, lon: float) -> {temperature: float, condition: string}. LLM cố gắng gọi cả hai công cụ song song trong cùng một lượt phản hồi, truyền lat: null, lon: null vào get_weather, gây ra lỗi xác thực HTTP 400 Bad Request từ endpoint API thời tiết. Tại sao chiến lược thực thi công cụ này thất bại, và chuỗi công cụ (tool chain) nên được cấu trúc như thế nào?",
    "optionsEN": [
      "A. geocode_address must be invoked first to extract coordinates from the street address, and its JSON result must be returned to the LLM context before get_weather can be called with valid parameters.",
      "B. Both tools should be called simultaneously using asynchronous promises, with get_weather dynamically reading the response buffer of geocode_address at the transport layer.",
      "C. get_weather should be configured with a higher execution priority in the MCP server config so that the tool execution runtime automatically delays parameter validation.",
      "D. The model should pass the raw address string \"100 Market St, San Francisco\" directly into the lat parameter of get_weather and allow the MCP server to perform internal type coercion."
    ],
    "options": [
      "A. geocode_address phải được gọi trước để lấy tọa độ từ địa chỉ đường phố, và kết quả JSON của nó phải được trả về ngữ cảnh LLM trước khi get_weather có thể được gọi với các tham số hợp lệ.",
      "B. Cả hai công cụ nên được gọi đồng thời bằng các promise bất đồng bộ, trong đó get_weather sẽ đọc động bộ đệm phản hồi của geocode_address ở tầng vận chuyển (transport layer).",
      "C. get_weather nên được cấu hình với mức ưu tiên thực thi cao hơn trong cấu hình MCP server để thời gian chạy thực thi công cụ tự động trì hoãn việc xác thực tham số.",
      "D. Mô hình nên truyền trực tiếp chuỗi địa chỉ gốc \"100 Market St, San Francisco\" vào tham số lat của get_weather và để MCP server tự thực hiện ép kiểu nội bộ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: geocode_address produces mandatory lat and lon coordinates required by get_weather. Because get_weather cannot execute without these output values, the tools must be chained sequentially across model turns.",
      "Option B is incorrect: MCP tool calls emitted in parallel within a single turn cannot dynamically reference or stream data into one another at the transport layer; get_weather fails immediately due to missing coordinates.",
      "Option C is incorrect: MCP priority weights cannot defer schema validation or auto-inject output values that have not yet been produced by upstream tool execution.",
      "Option D is incorrect: Passing an unparsed string into float parameter lat violates the JSON Schema for get_weather, triggering client-side or gateway validation rejection."
    ],
    "rationale": "Tool output consumption creates a strict execution dependency. geocode_address must run first so the model receives the resulting coordinates in the subsequent context turn to populate arguments for get_weather.",
    "explanation": "Lựa chọn A là đáp án đúng: Trong các luồng công việc dựa trên MCP, khi một công cụ (get_weather) yêu cầu dữ liệu đầu vào là kết quả đầu ra của một công cụ khác (geocode_address), hai công cụ này có mối phụ thuộc dữ liệu nghiêm ngặt. LLM phải gọi geocode_address trước, nhận phản hồi chứa tọa độ lat và lon trong lượt tương tác tiếp theo, sau đó mới có thể tạo lời gọi hàm get_weather với các tham số hợp lệ.\\n\\nLựa chọn B sai vì giao thức MCP không hỗ trợ đường ống dữ liệu (data streaming/pipelining) giữa các lời gọi công cụ song song trong cùng một lượt ở tầng vận chuyển.\\n\\nLựa chọn C sai vì cấu hình trọng số ưu tiên trên MCP server không thể hoãn quá trình xác thực schema tham số của API.\\n\\nLựa chọn D sai vì việc truyền một chuỗi văn bản địa chỉ vào tham số kiểu số thực (float) vi phạm JSON Schema của công cụ get_weather và sẽ bị từ chối ngay lập tức.",
    "scenarioSignature": {
      "testedPrinciple": "sequential execution dependency between data resolution and query tools",
      "failureMode": "tool invocation failure due to missing latitude and longitude coordinates",
      "rootCause": "calling dependent downstream tool before upstream coordinate resolution tool completes",
      "requiredFix": "enforce sequential tool chaining where geocode address resolves output coordinates first"
    },
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  },
  {
    "id": "d2-b06-2.6-002",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-002",
    "questionEN": "An agentic billing assistant in StripeMCP processes an onboarding request to set up a new user on a recurring plan. The server exposes create_customer(email: string, name: string) -> {customer_id: string} and create_subscription(customer_id: string, plan_id: string) -> {subscription_id: string}. The agent issues a tool call array containing both create_customer and create_subscription simultaneously, substituting customer_id: \"{{create_customer.response.customer_id}}\" in create_subscription. The payment gateway API rejects the request with HTTP 404 Not Found: Customer object does not exist. What is the root cause of this failure and how should the workflow be fixed?",
    "question": "[d2-b06-2.6-002] Một trợ lý thanh toán tự động trong StripeMCP xử lý yêu cầu đăng ký người dùng mới vào một gói dịch vụ định kỳ. Server cung cấp các công cụ: create_customer(email: string, name: string) -> {customer_id: string} và create_subscription(customer_id: string, plan_id: string) -> {subscription_id: string}. Trợ lý phát ra một mảng gọi công cụ chứa đồng thời cả create_customer và create_subscription, thay thế customer_id: \"{{ create_customer.response.customer_id }}\" trong create_subscription. API cổng thanh toán từ chối yêu cầu với lỗi HTTP 404 Not Found: Customer object does not exist. Nguyên nhân gốc rễ của lỗi này là gì và luồng công việc nên được sửa như thế nào?",
    "optionsEN": [
      "A. The MCP server runtime requires the environment variable ENABLE_DYNAMIC_JINJA_TEMPLATES=true to parse template placeholders across concurrent tool requests.",
      "B. Tool call outputs are evaluated turn-by-turn by the LLM context; create_customer must complete first so the model can receive the concrete customer_id before issuing create_subscription.",
      "C. create_subscription should be converted into an asynchronous webhook event listener that polls the database for new customer records.",
      "D. The agent should pass a deterministic client-generated UUID to both tools simultaneously so they can be processed in parallel without waiting for database primary key assignment."
    ],
    "options": [
      "A. Môi trường thực thi MCP server yêu cầu biến môi trường ENABLE_DYNAMIC_JINJA_TEMPLATES=true để phân tích các placeholder mẫu giữa các yêu cầu công cụ đồng thời.",
      "B. Kết quả xuất của cuộc gọi công cụ được đánh giá theo từng lượt bởi ngữ cảnh LLM; create_customer phải hoàn thành trước để mô hình nhận được customer_id cụ thể trước khi phát ra create_subscription.",
      "C. create_subscription nên được chuyển thành một bộ lắng nghe sự kiện webhook bất đồng bộ để truy vấn cơ sở dữ liệu tìm các bản ghi khách hàng mới.",
      "D. Trợ lý nên truyền một UUID do phía client tạo một cách xác định cho cả hai công cụ đồng thời để chúng có thể được xử lý song song mà không cần chờ gán khóa chính từ cơ sở dữ liệu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: MCP tool call specifications do not evaluate string template placeholders like {{...}} across parallel requests; tool arguments must be concrete schema values.",
      "Option B is correct: create_subscription relies on the unique customer_id generated by create_customer. The orchestrator must run create_customer first and return its response to the model before create_subscription can be constructed.",
      "Option C is incorrect: Turning tool execution into asynchronous webhook polling violates standard stateless MCP request-response patterns and obscures tool dependency architecture.",
      "Option D is incorrect: Unless the backend service explicitly supports client-assigned UUID keys during creation, payment gateways require server-generated entity identifiers before creating child subscriptions."
    ],
    "rationale": "Entity creation dependencies require sequential tool execution. The agent must execute create_customer, observe the returned customer_id in the next interaction step, and supply that value to create_subscription.",
    "explanation": "Lựa chọn B là đáp án đúng: Việc khởi tạo gói đăng ký (subscription) có mối phụ thuộc dữ liệu trực tiếp vào ID khách hàng (customer_id) được tạo từ bước khởi tạo khách hàng (create_customer). Trong mô hình tương tác MCP, LLM không thể tự động nội suy biểu thức template như {{...}} giữa các công cụ được gọi song song trong cùng một lượt. LLM phải gọi create_customer trước, nhận được chuỗi customer_id thực tế từ phản hồi của công cụ ở lượt tiếp theo, rồi mới truyền customer_id đó vào tham số của create_subscription.\\n\\nLựa chọn A sai vì giao thức MCP không có tính năng tự động parse template Jinja trong các tham số công cụ gọi song song.\\n\\nLựa chọn C sai vì việc chuyển đổi lời gọi công cụ thành cơ chế polling webhook gây phức tạp hóa kiến trúc không cần thiết và vi phạm mô hình request-response của MCP.\\n\\nLựa chọn D sai vì các hệ thống thanh toán (như Stripe API) yêu cầu ID do máy chủ tạo ra để xác minh sự tồn tại của thực thể khách hàng trước khi gán gói dịch vụ.",
    "scenarioSignature": {
      "testedPrinciple": "sequential state creation dependency in multi-step tool workflows",
      "failureMode": "foreign key constraint violation when creating dependent subscription resource",
      "rootCause": "invoking subscription creation tool before customer creation tool returns generated entity ID",
      "requiredFix": "chain tool calls sequentially by passing returned customer ID from initial tool response into subsequent tool"
    },
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  }
]