[
  {
    "id": "d5-b10-5.1-009",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-009",
    "scenarioSignature": {
      "testedPrinciple": "auto-compaction context summarization precision loss",
      "failureMode": "subsequent step failure after context compaction",
      "rootCause": "tool output dropped during context summarization",
      "requiredFix": "persist essential raw tool results to disk before compaction"
    },
    "questionEN": "During an automated CLI session in Claude Code, an agent runs psql -c 'SELECT schema_name FROM information_schema.schemata' producing a list of 40 database schemas. As the conversation token count approaches the context limit, Claude Code triggers auto-compaction. On the next step, when asked to alter a specific schema retrieved in the query, the agent fails because the exact schema name was summarized away into a generic summary ('query returned 40 database schemas'). What architectural change prevents this state loss?",
    "question": "[d5-b10-5.1-009] Trong một phiên CLI tự động trên Claude Code, agent chạy lệnh psql -c 'SELECT schema_name FROM information_schema.schemata' và nhận được danh sách 40 schema cơ sở dữ liệu. Khi số lượng token của cuộc hội thoại tiệm cận giới hạn ngữ cảnh, Claude Code kích hoạt tính năng tự động nén (auto-compaction). Ở bước tiếp theo, khi được yêu cầu sửa đổi một schema cụ thể vừa truy vấn, agent thất bại vì tên schema chính xác đã bị tóm tắt thành mô tả chung ('truy vấn đã trả về 40 database schema'). Thay đổi kiến trúc nào sẽ ngăn ngừa tình trạng mất dữ liệu này?",
    "optionsEN": [
      "A. Persist large or critical tool outputs to a local scratchpad file before compaction occurs, allowing the agent to re-read exact values on demand.",
      "B. Increase the maximum token limit of the database tool output parameter so auto-compaction bypasses summarizing tool responses.",
      "C. Disable context window monitoring and rely on API retries to replay the entire multi-turn execution transcript upon truncation.",
      "D. Append a system prompt instruction requesting the model to never summarize text blocks longer than 500 tokens."
    ],
    "options": [
      "A. Ghi lại đầu ra lớn hoặc quan trọng của công cụ vào một file scratchpad cục bộ trước khi nén diễn ra, cho phép agent đọc lại các giá trị chính xác khi cần.",
      "B. Tăng giới hạn token tối đa của tham số đầu ra công cụ cơ sở dữ liệu để quá trình tự động nén bỏ qua việc tóm tắt phản hồi từ công cụ.",
      "C. Tắt tính năng theo dõi cửa sổ ngữ cảnh và dựa vào cơ chế thử lại của API để phát lại toàn bộ lịch sử thực thi nhiều lượt khi bị cắt giảm.",
      "D. Thêm chỉ dẫn vào system prompt yêu cầu mô hình không bao giờ tóm tắt các khối văn bản dài hơn 500 token."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because saving detailed tool responses into persistent files outside the main context ensures exact data remains accessible via explicit file reading even after context compaction condenses prior turns.",
      "Option B is incorrect because auto-compaction is managed by the client harness based on context window fullness, not individual tool output limits.",
      "Option C is incorrect because disabling context monitoring leads to API context overflow errors (context_length_exceeded) rather than preserving uncompacted state.",
      "Option D is incorrect because system prompt requests cannot reliably override client-side automated compaction algorithms when context limits are reached."
    ],
    "rationale": "Auto-compaction replaces verbose history (including detailed tool call outputs) with lossy summaries. Writing critical verbatim outputs (like database schema names or API payload details) to a dedicated local scratchpad file allows the agent to re-read precise details as needed without risking information loss during automatic context condensation.",
    "explanation": "Phương án A đúng vì việc ghi lại kết quả công cụ chi tiết vào tệp scratchpad cục bộ trước khi nén xảy ra giúp dữ liệu nguyên bản được lưu trữ an toàn ngoài cửa sổ ngữ cảnh chính, cho phép agent đọc lại chính xác khi cần. Phương án B sai vì tính năng nén tự động được quản lý dựa trên dung lượng tổng thể của cửa sổ ngữ cảnh, không phụ thuộc vào giới hạn token của tham số đầu ra công cụ. Phương án C sai vì tắt theo dõi cửa sổ ngữ cảnh sẽ gây ra lỗi tràn ngữ cảnh API thay vì duy trì trạng thái. Phương án D sai vì chỉ dẫn trong system prompt không thể thay đổi thuật toán nén tự động phía client khi cuộc hội thoại đạt ngưỡng giới hạn.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  },
  {
    "id": "d5-b10-5.1-010",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-010",
    "scenarioSignature": {
      "testedPrinciple": "pre-request token counting verification",
      "failureMode": "intermittent context window overflow errors in batch pipeline",
      "rootCause": "estimating payload sizes using string character count heuristics",
      "requiredFix": "validate batch token size via count_tokens endpoint before payload dispatch"
    },
    "questionEN": "A backend document processing pipeline batches PDF extracts using a fixed character count heuristic (10,000 characters per request) before sending them to the Anthropic API. However, batch requests containing complex table markdown, code snippets, or non-Latin Unicode characters randomly fail with HTTP 400 invalid_request_error (prompt is too long). What design revision guarantees no batch exceeds the model context limit?",
    "question": "[d5-b10-5.1-010] Một pipeline xử lý tài liệu backend phân chia các đoạn trích xuất từ PDF thành các batch dựa trên quy tắc ước tính số ký tự cố định (10.000 ký tự mỗi yêu cầu) trước khi gửi tới API Anthropic. Tuy nhiên, các yêu cầu chứa bảng biểu markdown phức tạp, đoạn mã nguồn, hoặc ký tự Unicode phi-Latin bị lỗi ngẫu nhiên với HTTP 400 invalid_request_error (prompt is too long). Sửa đổi thiết kế nào đảm bảo không có batch nào vượt quá giới hạn ngữ cảnh của mô hình?",
    "optionsEN": [
      "A. Wrap the API call in an exponential backoff retry loop that reduces character batch sizes by 50% upon encountering an HTTP 400 error.",
      "B. Pass candidate document batches to the token counting endpoint prior to dispatch, dynamically splitting batches that exceed the target token budget.",
      "C. Set the max_tokens API request parameter to 200,000 to automatically scale the input context window capacity.",
      "D. Truncate all input documents to the median character length observed across historical successful requests."
    ],
    "options": [
      "A. Bao bọc lời gọi API trong vòng lặp thử lại exponential backoff để giảm 50% số ký tự của batch khi gặp lỗi HTTP 400.",
      "B. Truyền các batch tài liệu dự kiến qua endpoint đếm token trước khi gửi đi, và phân tách động các batch vượt quá ngân sách token mục tiêu.",
      "C. Thiết lập tham số max_tokens trong yêu cầu API thành 200.000 để tự động mở rộng dung lượng cửa sổ ngữ cảnh đầu vào.",
      "D. Cắt ngắn tất cả tài liệu đầu vào theo độ dài ký tự trung vị được ghi nhận từ các yêu cầu thành công trong lịch sử."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because reactive retries after API errors waste latency and API quota compared to deterministic pre-validation.",
      "Option B is correct because using the official token counting endpoint provides exact input token counts regardless of content type (code, tables, non-Latin text), allowing proactive dynamic splitting before sending.",
      "Option C is incorrect because max_tokens controls maximum generated output tokens, not input context window capacity.",
      "Option D is incorrect because character-length truncation based on historical medians is arbitrary and will still overflow on high token-density documents."
    ],
    "rationale": "Character-to-token ratios vary significantly across text formats (code, tables, and Unicode produce more tokens per character than standard prose). Calling the dedicated /v1/messages/count_tokens endpoint prior to dispatch provides exact token counts, ensuring batches can be dynamically split before encountering prompt length API errors.",
    "explanation": "Phương án B đúng vì việc sử dụng endpoint đếm token chính thức trước khi gửi lời gọi API sẽ cung cấp chính xác số lượng token đầu vào bất kể loại dữ liệu (code, bảng biểu, ký tự Unicode), từ đó cho phép chia nhỏ batch một cách chủ động. Phương án A sai vì việc thử lại phản ứng sau lỗi gây lãng phí thời gian xử lý và quota API. Phương án C sai vì max_tokens quy định giới hạn token đầu ra được tạo ra, không mở rộng dung lượng cửa sổ ngữ cảnh đầu vào. Phương án D sai vì việc cắt ngắn dựa trên số ký tự trung vị là suy đoán không chính xác và vẫn có thể thất bại khi gặp tài liệu có mật độ token cao.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  }
]