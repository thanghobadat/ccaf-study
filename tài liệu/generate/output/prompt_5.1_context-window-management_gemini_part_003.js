[
  {
    "id": "d5-b10-5.1-005",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-005",
    "scenarioSignature": {
      "testedPrinciple": "tool result trimming",
      "failureMode": "context window depletion from accumulated API responses",
      "rootCause": "retaining unneeded raw JSON payloads across tool execution steps",
      "requiredFix": "prune or summarize raw tool outputs once target fields are extracted"
    },
    "questionEN": "A customer support assistant uses an orchestrator loop that invokes backend APIs for orders and shipping. After calling tools 15 times, the prompt context size increases to 118,000 tokens due to storing raw JSON API payloads, leaving only 10,000 tokens remaining in the model context window. Which optimization directly prevents this token exhaustion?",
    "question": "[d5-b10-5.1-005] Một trợ lý hỗ trợ khách hàng sử dụng vòng lặp điều phối để gọi các API phía backend cho đơn hàng và vận chuyển. Sau khi gọi công cụ 15 lần, kích thước ngữ cảnh prompt tăng lên 118.000 token do lưu trữ tải dữ liệu JSON API thô, chỉ còn lại 10.000 token trong cửa sổ ngữ cảnh mô hình. Tối ưu hóa nào trực tiếp ngăn chặn tình trạng cạn kiệt token này?",
    "optionsEN": [
      "A. Extract required fields from raw tool responses and replace full JSON payloads with minimal summaries in history before the next turn.",
      "B. Switch the primary LLM model to a higher output token limit to accommodate larger API response payloads.",
      "C. Implement an automatic retry mechanism whenever the API tool returns responses larger than 5,000 tokens.",
      "D. Store full JSON tool responses in system prompt variables rather than message history to bypass context window counts."
    ],
    "options": [
      "A. Trích xuất các trường dữ liệu cần thiết từ phản hồi công cụ thô và thay thế JSON đầy đủ bằng tóm tắt tối giản trong lịch sử trước lượt tiếp theo.",
      "B. Chuyển sang mô hình LLM chính có giới hạn token đầu ra cao hơn để chứa các tải dữ liệu phản hồi API lớn hơn.",
      "C. Triển khai cơ chế tự động thử lại bất cứ khi nào công cụ API trả về phản hồi lớn hơn 5.000 token.",
      "D. Lưu trữ đầy đủ phản hồi công cụ JSON trong biến prompt hệ thống thay vì lịch sử tin nhắn để bỏ qua tính toán cửa sổ ngữ cảnh."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Extracting essential fields and trimming raw tool execution payloads frees context budget while retaining essential information for subsequent reasoning steps.",
      "Option B is incorrect: Increasing output max_tokens does not expand or manage the input context window token capacity.",
      "Option C is incorrect: Retrying large API calls will not reduce context usage and will increase latency and token consumption.",
      "Option D is incorrect: System prompt tokens are counted as part of the total input context window token limit and cannot bypass context bounds."
    ],
    "rationale": "Raw API tool outputs contain verbose metadata that quickly saturates the context window. Trimming raw responses to minimal required key-value pairs before appending to conversation history preserves headroom for future turns and model completion.",
    "explanation": "Lựa chọn A đúng vì việc lọc bỏ các phần dư thừa của phản hồi API và chỉ giữ lại thông tin cần thiết giúp tiết kiệm dung lượng cửa sổ ngữ cảnh mà vẫn giữ đủ thông tin cho các lượt xử lý tiếp theo. Lựa chọn B sai vì max_tokens chỉ áp dụng cho đầu ra chứ không mở rộng cửa sổ ngữ cảnh đầu vào. Lựa chọn C sai vì việc thử lại không làm giảm kích thước của dữ liệu API. Lựa chọn D sai vì token trong prompt hệ thống vẫn tính vào tổng giới hạn cửa sổ ngữ cảnh.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  },
  {
    "id": "d5-b10-5.1-006",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-006",
    "scenarioSignature": {
      "testedPrinciple": "verbatim context preservation",
      "failureMode": "invalid SQL queries from summarized database schema",
      "rootCause": "applying progressive summarization to structured technical metadata",
      "requiredFix": "exclude database schema from text summarization pipelines"
    },
    "questionEN": "An enterprise BI assistant uses progressive summarization to manage context length over long user sessions. After multiple turns, the automated summarizer condenses the exact database SQL schema definitions, omitting table column names and foreign key types, causing the model to output invalid SQL queries with non-existent columns. What is the cause and proper fix for this issue?",
    "question": "[d5-b10-5.1-006] Một trợ lý BI doanh nghiệp sử dụng tóm tắt lũy tiến để quản lý độ dài ngữ cảnh qua các phiên người dùng kéo dài. Sau nhiều lượt, bộ tóm tắt tự động rút gọn các định nghĩa schema SQL cơ sở dữ liệu chính xác, làm mất tên cột và kiểu khóa ngoại, khiến mô hình tạo ra các truy vấn SQL không hợp lệ với các cột không tồn tại. Nguyên nhân và giải pháp khắc phục phù hợp cho vấn đề này là gì?",
    "optionsEN": [
      "A. The system context limit was set too low; double the input context budget so all turns remain uncompressed.",
      "B. Progressive summarization lost precise technical metadata; database schemas must be preserved verbatim or retrieved via dynamic tool calls.",
      "C. The model lacks SQL query generation capabilities; replace progressive summarization with fine-tuning on SQL DDL data.",
      "D. Summarization was triggered too early; compress the session history only when total token count reaches 99% capacity."
    ],
    "options": [
      "A. Giới hạn ngữ cảnh hệ thống được đặt quá thấp; gấp đôi ngân sách ngữ cảnh đầu vào để tất cả các lượt không bị nén.",
      "B. Tóm tắt lũy tiến làm mất siêu dữ liệu kỹ thuật chính xác; schema cơ sở dữ liệu phải được giữ nguyên văn hoặc truy xuất qua gọi công cụ động.",
      "C. Mô hình thiếu khả năng tạo truy vấn SQL; thay thế tóm tắt lũy tiến bằng cách fine-tuning trên dữ liệu DDL SQL.",
      "D. Việc tóm tắt được kích hoạt quá sớm; chỉ nén lịch sử phiên khi tổng số lượng token đạt 99% dung lượng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Increasing context budget only delays context saturation and does not prevent loss of schema precision when summarization eventually occurs.",
      "Option B (Correct): Text summarization naturally discards exact details; structured technical references like SQL schemas require verbatim preservation or just-in-time retrieval.",
      "Option C is incorrect: Fine-tuning does not provide the runtime awareness of specific, evolving database schemas required to construct valid queries.",
      "Option D is incorrect: Waiting until 99% context capacity increases the risk of context overflow errors and does not solve the fundamental precision loss when summarizing schemas."
    ],
    "rationale": "Progressive summarization is suitable for conversational state but destructive for exact technical specifications like database schemas or API definitions. Schema definitions must be excluded from summarization and kept verbatim or retrieved dynamically.",
    "explanation": "Lựa chọn B đúng vì quá trình tóm tắt văn bản làm mất đi các chi tiết chính xác như tên cột và kiểu dữ liệu trong SQL schema; các tài liệu kỹ thuật mang tính chính xác cao cần được giữ nguyên văn hoặc truy xuất qua công cụ khi cần. Lựa chọn A sai vì chỉ tăng ngân sách không giải quyết được việc nén làm mất thông tin khi tóm tắt xảy ra. Lựa chọn C sai vì fine-tuning không thay thế được việc cung cấp schema chính xác ở thời điểm thực thi. Lựa chọn D sai vì nén ở mức 99% dễ gây rủi ro tràn ngữ cảnh và không tránh được sự mất mát dữ liệu kỹ thuật.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  }
]