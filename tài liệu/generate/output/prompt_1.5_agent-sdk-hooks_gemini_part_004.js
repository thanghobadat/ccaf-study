[
  {
    "id": "d1-b03-1.5-007",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-007",
    "scenarioSignature": {
      "testedPrinciple": "PostToolUse caching of tool outputs",
      "failureMode": "Redundant external API calls causing latency spikes and rate limiting",
      "rootCause": "Absence of post-execution result caching for expensive deterministic tools",
      "requiredFix": "Save successful tool execution payloads in cache within a PostToolUse SDK hook"
    },
    "questionEN": "A financial analytics system, MarketDataAgent, frequently calls the query_ticker_quote tool (hitting https://api.fintech-feed.com/v2/quotes) with identical ticker parameters, causing latency spikes exceeding 450ms and frequent HTTP 429 rate-limit errors. Developers need to cache successful execution results in a shared Redis store so identical subsequent queries can return instantly without re-calling the API. Where in the agent SDK lifecycle should the caching save logic be implemented?",
    "question": "[d1-b03-1.5-007] Hệ thống phân tích tài chính MarketDataAgent thường xuyên gọi công cụ query_ticker_quote (truy cập https://api.fintech-feed.com/v2/quotes) với cùng các tham số mã chứng khoán, gây ra độ trễ vượt quá 450ms và lỗi giới hạn tần suất HTTP 429. Các nhà phát triển cần lưu bộ nhớ đệm (cache) kết quả thực thi thành công vào Redis để các truy vấn trùng lặp tiếp theo có thể trả về tức thì mà không cần gọi lại API. Logic lưu cache này nên được triển khai tại vị trí nào trong vòng đời SDK hook của agent?",
    "optionsEN": [
      "A. Inside a prompt modifier, instructing the model to store tool output JSON in context history before triggering additional queries.",
      "B. Inside a PreToolUse hook, intercepting the invocation arguments to write the anticipated output to Redis prior to API call execution.",
      "C. Inside a PostToolUse hook, capturing the executed tool's output payload and writing it to Redis mapped against the input arguments.",
      "D. Inside the tool declaration schema, embedding a caching wrapper function directly within the JSON Schema description provided to the model."
    ],
    "options": [
      "A. Bên trong một prompt modifier, hướng dẫn model lưu JSON kết quả công cụ vào lịch sử ngữ cảnh trước khi kích hoạt các truy vấn tiếp theo.",
      "B. Bên trong một PreToolUse hook, chặn các tham số gọi công cụ để ghi kết quả dự kiến vào Redis trước khi cuộc gọi API được thực thi.",
      "C. Bên trong một PostToolUse hook, bắt lấy payload kết quả đã thực thi của công cụ và ghi vào Redis ánh xạ theo các tham số đầu vào.",
      "D. Bên trong schema khai báo công cụ, nhúng một hàm bọc cache trực tiếp vào mô tả JSON Schema được cung cấp cho model."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: System prompt instructions are probabilistic and operate inside the LLM context, making them incapable of directly executing deterministic Redis write operations.",
      "Option B is incorrect: PreToolUse hooks execute prior to tool invocation, meaning the actual response payload from the external API does not exist yet to be stored in cache.",
      "Option C is correct: PostToolUse hooks execute after the tool has run, providing access to both invocation parameters and the resulting output payload required to store valid entries in Redis.",
      "Option D is incorrect: Tool schemas define metadata and input parameters for LLM function calling, not runtime execution lifecycle callbacks."
    ],
    "rationale": "PostToolUse hooks run after a tool completes execution and receive the tool output payload alongside invocation inputs. This makes PostToolUse the exact lifecycle phase to capture successful API responses and persist them to an external cache (like Redis) for subsequent lookup.",
    "explanation": "PostToolUse hook được thiết kế để chạy sau khi công cụ đã hoàn tất thực thi. Tại thời điểm này, hook nhận được cả tham số đầu vào lẫn payload kết quả trả về từ công cụ, cho phép lưu trữ kết quả vào Redis cache một cách chính xác.\n- Option A sai vì chỉ dẫn prompt mang tính xác suất và không thể trực tiếp thực thi thao tác ghi dữ liệu vào Redis.\n- Option B sai vì PreToolUse hook chạy trước khi công cụ thực thi, lúc này chưa có dữ liệu kết quả từ API để lưu cache.\n- Option C đúng vì PostToolUse hook là nơi duy nhất trong vòng đời SDK nhận được output kết quả thực thi để tiến hành caching.\n- Option D sai vì JSON Schema chỉ dùng để định nghĩa cấu trúc tham số cho LLM, không quản lý logic thực thi trong vòng đời agent SDK.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  },
  {
    "id": "d1-b03-1.5-008",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.5 agent-sdk-hooks / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.5-008",
    "scenarioSignature": {
      "testedPrinciple": "Output normalization via PostToolUse hook",
      "failureMode": "Schema validation failures due to inconsistent date formats in tool responses",
      "rootCause": "Heterogeneous external APIs returning non-standardized timestamp schemas",
      "requiredFix": "Transform raw tool response fields to standardized format using a PostToolUse SDK hook"
    },
    "questionEN": "A telemetry diagnostic agent, LogAggregatorAgent, queries two legacy database tools: fetch_syslog_events (returning created_at as Unix epoch integer) and fetch_cloud_audit (returning created_at as MM/DD/YYYY HH:mm:ss). The inconsistent schemas cause downstream parsing failures during timeline synthesis. Developers need to enforce uniform ISO-8601 formatting on all date fields without altering the legacy database APIs. Which SDK hook architecture resolves this issue?",
    "question": "[d1-b03-1.5-008] Một agent chẩn đoán telemetry, LogAggregatorAgent, truy vấn hai công cụ cơ sở dữ liệu cũ: fetch_syslog_events (trả về created_at dưới dạng số nguyên Unix epoch) và fetch_cloud_audit (trả về created_at dưới dạng MM/DD/YYYY HH:mm:ss). Việc bất đồng bộ schema này gây ra lỗi phân tích chuỗi sự kiện. Nhà phát triển cần bắt buộc định dạng ISO-8601 đồng nhất trên tất cả các trường ngày tháng mà không được sửa đổi API của cơ sở dữ liệu cũ. Kiến trúc SDK hook nào giải quyết được vấn đề này?",
    "optionsEN": [
      "A. A PreToolUse hook that intercepts incoming tool invocation parameters and mutates the created_at field prior to backend API dispatch.",
      "B. A system prompt instruction directing the LLM to perform inline string parsing and date format conversion within its scratchpad reasoning.",
      "C. A custom tool validator gate embedded within the function declaration schema that rejects non-conforming responses at the HTTP transport layer.",
      "D. A PostToolUse hook that intercepts raw tool outputs, transforms diverse created_at timestamp values into ISO-8601 strings, and returns the normalized payload to the agent runtime."
    ],
    "options": [
      "A. Một PreToolUse hook chặn các tham số gọi công cụ đầu vào và biến đổi trường created_at trước khi gửi đến API backend.",
      "B. Một chỉ dẫn system prompt yêu cầu LLM tự thực hiện phân tích chuỗi và chuyển đổi định dạng ngày tháng trong quá trình suy luận scratchpad.",
      "C. Một cổng kiểm tra validator công cụ tùy chỉnh nhúng trong schema khai báo hàm nhằm từ chối các phản hồi không hợp lệ ở tầng vận chuyển HTTP.",
      "D. Một PostToolUse hook chặn payload kết quả thô của công cụ, chuyển đổi các giá trị thời gian created_at thành chuỗi ISO-8601 đồng nhất, và trả về payload đã chuẩn hóa cho agent runtime."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: PreToolUse hooks run before the tool executes on input arguments, so the tool's output payload containing inconsistent timestamp fields is not available yet.",
      "Option B is incorrect: Prompt instructions rely on LLM text generation, which is probabilistic and prone to formatting errors, whereas deterministic data normalization belongs in code hooks.",
      "Option C is incorrect: Function schema declarations specify input parameter expectations for the model, not output response transformation routines.",
      "Option D is correct: PostToolUse hooks execute after tool completion and can inspect and mutate the output payload, making them ideal for normalizing inconsistent date formats into standard ISO-8601 strings."
    ],
    "rationale": "PostToolUse hooks run after tool execution and have access to the raw tool response payload. Modifying the output inside a PostToolUse hook allows deterministic transformation and normalization of inconsistent data fields (such as converting legacy timestamp formats to ISO-8601) before handing the data back to the agent runtime.",
    "explanation": "PostToolUse hook chạy ngay sau khi công cụ thực thi xong và có khả năng can thiệp, chỉnh sửa payload kết quả trước khi đưa lại cho LLM agent. Việc chuẩn hóa định dạng ngày tháng từ các hệ thống legacy về dạng ISO-8601 chuẩn trong PostToolUse hook đảm bảo tính xác định và nhất quán.\n- Option A sai vì PreToolUse hook can thiệp trước khi gọi công cụ, lúc đó chưa có dữ liệu kết quả từ API để chuyển đổi.\n- Option B sai vì dựa vào chỉ dẫn prompt để chuẩn hóa dữ liệu mang tính xác suất, tốn token ngữ cảnh và dễ gặp sai sót.\n- Option C sai vì schema khai báo chỉ định nghĩa cấu trúc đầu vào cho model gọi hàm, không phải nơi xử lý payload trả về của công cụ.\n- Option D đúng vì PostToolUse hook cung cấp cơ chế can thiệp và chuẩn hóa payload kết quả thô một cách deterministic.",
    "sources": [
      {
        "label": "Lesson 1.5: Agent SDK Hooks",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-5-agent-sdk-hooks"
      }
    ]
  }
]