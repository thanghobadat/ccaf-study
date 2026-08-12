[
  {
    "id": "d1-b03-new-005",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-005",
    "scenarioSignature": {
      "testedPrinciple": "subagent context window isolation",
      "failureMode": "context window bloat and elevated input latency",
      "rootCause": "passing entire parent conversation history to subagents",
      "requiredFix": "provide scoped summary and explicit task payload per subagent"
    },
    "questionEN": "An e-commerce support system (CareAgent) processes complex customer refund claims. The root coordinator agent maintains a 40-turn conversation history containing order logs, user chat, and policy references. To process a claim, the coordinator spawns 5 specialized subagents via the Task tool (for inventory check, policy audit, payment gateway check, user history, and fraud scoring). Each subagent is initialized by serializing and copying the entire 40-turn parent conversation history into its prompt. Monitoring shows prompt token usage ballooning to 180,000 input tokens per claim, causing severe latency degradation (14 seconds average response time). Which architectural adjustment resolves this context bloat?",
    "question": "[d1-b03-new-005] Một hệ thống hỗ trợ thương mại điện tử (CareAgent) xử lý các yêu cầu hoàn tiền phức tạp của khách hàng. Agent điều phối gốc duy trì lịch sử hội thoại 40 lượt chứa nhật ký đơn hàng, trò chuyện của người dùng và các quy định chính sách. Để xử lý yêu cầu hoàn tiền, agent điều phối khởi tạo 5 subagent chuyên biệt thông qua công cụ Task (kiểm tra tồn kho, kiểm toán chính sách, kiểm tra cổng thanh toán, lịch sử người dùng và chấm điểm gian lận). Mỗi subagent được khởi tạo bằng cách tuần tự hóa và sao chép toàn bộ 40 lượt lịch sử hội thoại của agent cha vào prompt của nó. Giám sát cho thấy mức sử dụng token prompt tăng vọt lên 180.000 input token cho mỗi yêu cầu, gây ra suy giảm độ trễ nghiêm trọng (thời gian phản hồi trung bình 14 giây). Điều chỉnh kiến trúc nào giải quyết triệt để tình trạng phình bối cảnh này?",
    "optionsEN": [
      "A. Initialize each subagent with a fresh context window containing only a concise task description and the specific data fields required for its single scope.",
      "B. Increase the max context window token limit of the subagents so that the 40-turn conversation history processes without truncation errors.",
      "C. Convert the 5 subagent calls into a single sequential loop where each subagent appends its generated output to the 40-turn conversation history.",
      "D. Configure the root coordinator to cache tool executions in local storage and pass file path strings referencing full conversation logs to subagents."
    ],
    "options": [
      "A. Khởi tạo mỗi subagent với một cửa sổ bối cảnh mới chỉ chứa mô tả nhiệm vụ ngắn gọn và các trường dữ liệu cụ thể cần thiết cho phạm vi duy nhất của nó.",
      "B. Tăng giới hạn token tối đa của cửa sổ bối cảnh cho các subagent để lịch sử hội thoại 40 lượt được xử lý mà không gặp lỗi cắt tỉa (truncation).",
      "C. Chuyển đổi 5 lời gọi subagent thành một vòng lặp tuần tự duy nhất, trong đó mỗi subagent nối kết quả đầu ra của nó vào lịch sử hội thoại 40 lượt.",
      "D. Cấu hình agent điều phối gốc để lưu vào bộ nhớ tạm các lượt thực thi công cụ và truyền chuỗi đường dẫn file tham chiếu đến nhật ký hội thoại đầy đủ cho subagent."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Subagents operate best with isolated context windows containing only the minimal task description and relevant payload data, which eliminates unnecessary token overhead and reduces input latency.",
      "Option B is incorrect: Increasing the token limit does not eliminate context bloat; it allows even more redundant tokens to be processed, increasing cost and response latency.",
      "Option C is incorrect: Sequentially appending subagent outputs to the already bloated parent conversation history compounds the context accumulation problem rather than isolating subagent contexts.",
      "Option D is incorrect: Passing file path pointers still encourages subagents to load or process unstructured transcript data unnecessary for their specific validation tasks."
    ],
    "rationale": "Providing a fresh context window initialized only with scoped task instructions and required input data prevents parent conversation bloat from propagating into subagents, drastically reducing token consumption and processing latency.",
    "explanation": "Trong kiến trúc đa agent (multi-agent architecture), mỗi subagent nên hoạt động trong một cửa sổ bối cảnh (context window) được cô lập, chỉ nhận nhiệm vụ cụ thể và dữ liệu đầu vào cần thiết cho chức năng của nó.\n\n- Đáp án A đúng: Việc cung cấp bối cảnh sạch (fresh context) cùng mô tả nhiệm vụ ngắn gọn giúp loại bỏ toàn bộ 40 lượt hội thoại không liên quan của agent cha, giảm từ 180.000 token xuống mức tối thiểu và giảm đáng kể độ trễ.\n- Đáp án B sai: Tăng giới hạn token chỉ che giấu triệu chứng mà không giải quyết nguyên nhân gốc rễ, khiến chi phí token và độ trễ tăng cao hơn nữa.\n- Đáp án C sai: Việc gọi tuần tự và nối đầu ra vào lịch sử 40 lượt làm trầm trọng thêm sự bùng nổ bối cảnh (context bloat) và biến các tác vụ độc lập thành xử lý tuần tự chậm chạp.\n- Đáp án D sai: Việc truyền file log đầy đủ khiến các subagent phải đọc lại các dữ liệu thô không cần thiết cho nhiệm vụ chuyên biệt của chúng.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-006",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-006",
    "scenarioSignature": {
      "testedPrinciple": "subagent input payload minimization",
      "failureMode": "excessive token consumption and subagent context saturation",
      "rootCause": "passing raw unextracted tool response payloads directly to subagents",
      "requiredFix": "extract relevant key fields and summary metrics prior to subagent delegation"
    },
    "questionEN": "A cloud infrastructure monitoring system (InfraGuard) diagnoses system outages. A diagnostic coordinator agent executes a network telemetry tool that retrieves a raw 200KB JSON payload containing thousands of system metric logs, network trace packets, and interface statistics. To determine failure root cause, the coordinator passes this raw 200KB JSON response verbatim into the prompt input of three specialized subagents (database-analyst, network-analyst, security-analyst) via the Task tool. As a result, each subagent consumes over 50,000 input tokens per call, frequently exceeding context limits and incurring extreme API costs ($12 per run). Which architectural change prevents this context overload?",
    "question": "[d1-b03-new-006] Một hệ thống giám sát hạ tầng đám mây (InfraGuard) chẩn đoán sự cố hệ thống. Agent điều phối chẩn đoán thực thi một công cụ đo đạc mạng và nhận về một payload JSON thô kích thước 200KB chứa hàng nghìn nhật ký thông số hệ thống, gói tin mạng và thống kê giao diện. Để xác định nguyên nhân gốc rễ, agent điều phối truyền nguyên văn kết quả JSON 200KB này vào đầu vào prompt của 3 subagent chuyên biệt (chẩn đoán cơ sở dữ liệu, chẩn đoán mạng, chẩn đoán bảo mật) thông qua công cụ Task. Kết quả là mỗi subagent tiêu tốn hơn 50.000 input token cho mỗi lời gọi, thường xuyên vượt quá giới hạn bối cảnh và phát sinh chi phí API rất lớn ($12 cho mỗi lần chạy). Thay đổi kiến trúc nào ngăn chặn tình trạng quá tải bối cảnh này?",
    "optionsEN": [
      "A. Configure the root coordinator to convert the raw 200KB JSON payload into a compressed Base64 string before passing it into the subagent prompt.",
      "B. Have the coordinator extract only relevant summary metrics and filtered error records from the tool output before passing the scoped context to each subagent.",
      "C. Instruct each subagent to run a local JSON filtering script against the full 200KB payload after it loads the full context into its prompt.",
      "D. Enable streaming responses on the Task tool so that the 200KB JSON payload is transmitted incrementally to the subagents."
    ],
    "options": [
      "A. Cấu hình agent điều phối gốc để chuyển đổi payload JSON thô 200KB thành chuỗi Base64 nén trước khi truyền vào prompt của subagent.",
      "B. Yêu cầu agent điều phối trích xuất chỉ các thông số tóm tắt liên quan và các bản ghi lỗi đã lọc từ đầu ra công cụ trước khi truyền bối cảnh đã thu gọn cho từng subagent.",
      "C. Hướng dẫn từng subagent thực thi một script lọc JSON cục bộ trên toàn bộ payload 200KB sau khi nó tải toàn bộ bối cảnh vào prompt của mình.",
      "D. Kích hoạt phản hồi dạng streaming trên công cụ Task để payload JSON 200KB được truyền tăng dần từng phần tới các subagent."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Encoding data to Base64 does not reduce token consumption; in fact, Base64 encoding increases string length and token count while making data unreadable to the model.",
      "Option B is correct: Extracting targeted summaries and relevant key-value pairs before spawning subagents ensures subagents receive clean, minimal context tailored to their specific analytical domain, eliminating token overload.",
      "Option C is incorrect: Having subagents filter data after loading it into their prompt requires the model to process the full 200KB payload first, failing to solve the context saturation and token cost issue.",
      "Option D is incorrect: Streaming tool results affects response delivery mechanics but does not alter the total number of tokens sent into the subagent's prompt context window."
    ],
    "rationale": "Extracting essential fields and structured summaries from raw tool outputs before subagent delegation reduces prompt size from tens of thousands of tokens down to concise, relevant inputs, preventing context window saturation and reducing costs.",
    "explanation": "Trong mô hình điều phối subagent, agent coordinator chịu trách nhiệm sơ chế và lọc dữ liệu thô (raw data) từ các công cụ trước khi phân phối nhiệm vụ cho các subagent chuyên biệt.\n\n- Đáp án B đúng: Việc trích xuất chỉ các thông số tóm tắt và bản ghi lỗi có liên quan giúp thu gọn bối cảnh đầu vào của subagent, ngăn chặn quá tải cửa sổ bối cảnh và tiết kiệm chi phí token đáng kể.\n- Đáp án A sai: Mã hóa Base64 không giúp giảm token mà còn làm tăng kích thước chuỗi và khiến LLM không thể hiểu được ngữ nghĩa dữ liệu.\n- Đáp án C sai: Cho subagent tự lọc sau khi đã nạp 200KB JSON vào prompt vẫn khiến model tiêu tốn hơn 50.000 token ngay từ bước nhận đầu vào.\n- Đáp án D sai: Truyền dữ liệu dạng streaming chỉ thay đổi cách thức truyền tải mạng chứ không giảm tổng số token mà prompt của subagent phải xử lý.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]