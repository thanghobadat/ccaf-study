[
  {
    "id": "d5-b10-5.2-005",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-005",
    "scenarioSignature": {
      "testedPrinciple": "Preservation of critical user constraints across window rotations",
      "failureMode": "Model output violates compliance policy set in early turn",
      "rootCause": "Fixed sliding window drops initial constraint turn outside active window",
      "requiredFix": "Pin critical policies into system prompt or persistent metadata block"
    },
    "questionEN": "A multi-turn financial advisory agent using LangChain's ConversationBufferWindowMemory with k=5 operates on interaction turn 12. In turn 2, the user explicitly set a critical policy constraint compliance_mode=\"STRICT_FINRA\". Because turn 2 aged out of the active 5-turn sliding window, the model generates recommendations using default relaxed rules, causing compliance violations. Which architectural solution correctly resolves this context loss?",
    "question": "[d5-b10-5.2-005] Một agent tư vấn tài chính dùng LangChain với ConversationBufferWindowMemory (k=5) đang xử lý lượt 12. Ở lượt 2, người dùng đã thiết lập ràng buộc compliance_mode=\"STRICT_FINRA\". Do lượt 2 đã bị đẩy khỏi cửa sổ trượt 5 lượt gần nhất, mô hình đưa ra tư vấn theo quy tắc mặc định gây vi phạm quy định. Giải pháp kiến trúc nào giải quyết triệt để vấn đề mất ngữ cảnh này?",
    "optionsEN": [
      "A. Extract and maintain critical system constraints and user policies in a persistent system prompt or pinned metadata block preserved across window rotations.",
      "B. Dynamically increase the sliding window size k whenever a compliance violation flag is returned in API responses.",
      "C. Append the last 3 tool execution outputs to the conversation history prior to processing turn 12.",
      "D. Enable automatic text summarization on the last 5 conversation turns to compress context length."
    ],
    "options": [
      "A. Trích xuất và duy trì các ràng buộc chính sách của người dùng trong system prompt cố định hoặc khối metadata ghim sẵn qua mọi lượt xoay cửa sổ.",
      "B. Tăng kích thước cửa sổ trượt k một cách động khi phát hiện cờ vi phạm tuân thủ trong kết quả API.",
      "C. Chèn thêm kết quả thực thi của 3 tool gần nhất vào lịch sử hội thoại trước khi xử lý lượt 12.",
      "D. Bật tính năng tóm tắt văn bản tự động cho 5 lượt hội thoại gần nhất để nén độ dài ngữ cảnh."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because pinning system policies into a persistent system prompt or metadata header ensures critical constraints remain in context across all turns, independent of sliding window memory limits.",
      "Option B is incorrect because dynamically increasing k after a failure is reactive and does not guarantee early constraints will remain in context as conversation length grows indefinitely.",
      "Option C is incorrect because appending recent tool outputs only adds recent operational logs and does not recover user constraints established in turn 2.",
      "Option D is incorrect because summarizing recent turns compresses memory within the active window but cannot retrieve turn 2 data that has already been purged."
    ],
    "rationale": "A sliding window strategy purges older turns to save tokens, which risks dropping critical baseline constraints. Pinned system prompts or metadata blocks ensure vital rules persist across all window shifts.",
    "explanation": "Đáp án A đúng vì việc ghi nhận các quy tắc và ràng buộc cố định vào system prompt hoặc khối metadata được ghim sẽ bảo đảm mô hình luôn tuân thủ chính sách dù cửa sổ trượt xoay qua bao nhiêu lượt hội thoại. Đáp án B sai vì việc tăng k phản ứng chậm và không bền vững khi hội thoại kéo dài. Đáp án C sai vì dữ liệu tool gần nhất không chứa thông tin ràng buộc ở lượt 2. Đáp án D sai vì tóm tắt các lượt gần đây không thể khôi phục dữ liệu đã bị xóa khỏi cửa sổ.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  },
  {
    "id": "d5-b10-5.2-006",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-006",
    "scenarioSignature": {
      "testedPrinciple": "Selective summarize-before-prune preserving exact structural schemas",
      "failureMode": "Invalid SQL syntax generation due to missing column mapping",
      "rootCause": "Over-summarization of precise DDL schema into high-level summary facts",
      "requiredFix": "Isolate structural schema definitions from aggressive summarization pruning"
    },
    "questionEN": "A PostgreSQL text-to-SQL agent ingests a 40-table DDL schema containing exact column names, data types, and foreign keys. To manage token budget, a summarize-before-prune component distills the entire DDL into 3 general summary facts before dropping the raw schema text. On a complex analytical user query, the agent generates invalid SQL (column \"user_id\" does not exist) because exact column structures were lost. How should the context pruning pipeline be refactored?",
    "question": "[d5-b10-5.2-006] Một agent chuyển đổi văn bản sang SQL cho PostgreSQL nạp DDL schema 40 bảng chứa chính xác tên cột, kiểu dữ liệu và khóa ngoại. Để tiết kiệm token, thành phần summarize-before-prune đã tóm tắt toàn bộ DDL thành 3 câu thông tin chung rồi xóa văn bản DDL thô. Khi xử lý câu truy vấn phức tạp, agent tạo ra câu SQL lỗi (column \"user_id\" does not exist) do mất cấu trúc cột chi tiết. Pipeline tỉa ngữ cảnh nên được tái cấu trúc như thế nào?",
    "optionsEN": [
      "A. Raise the LLM temperature parameter to 0.7 so the model can dynamically project missing column identifiers from the high-level summary.",
      "B. Preserve exact DDL structural definitions in a dedicated schema registry or pinned context block, limiting summarize-before-prune strictly to conversational history.",
      "C. Truncate raw DDL strings directly after 500 characters without running the summarization routine.",
      "D. Replace summarize-before-prune with a tail-pruning strategy that removes the oldest 10 database tables from context."
    ],
    "options": [
      "A. Tăng tham số temperature của LLM lên 0.7 để mô hình tự suy luận tên cột bị thiếu từ bản tóm tắt cao cấp.",
      "B. Giữ nguyên cấu trúc DDL chính xác trong một schema registry riêng hoặc khối ngữ cảnh ghim, chỉ áp dụng summarize-before-prune cho lịch sử hội thoại.",
      "C. Cắt ngắn chuỗi DDL thô trực tiếp sau 500 ký tự mà không chạy quy trình tóm tắt.",
      "D. Thay thế summarize-before-prune bằng chiến lược tail-pruning xóa 10 bảng cơ sở dữ liệu cũ nhất khỏi ngữ cảnh."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because increasing temperature adds randomness to token sampling and cannot reconstruct exact database schema column names that were discarded.",
      "Option B is correct because exact structural metadata (DDL schemas, code definitions, API specs) requires verbatim precision and must not be lossily summarized; pruning/summarization should target conversational text instead.",
      "Option C is incorrect because raw string truncation cuts off DDL definitions arbitrarily, leaving missing syntax and incomplete schemas.",
      "Option D is incorrect because tail-pruning table definitions removes necessary database tables required for complex SQL JOIN statements."
    ],
    "rationale": "Summarize-before-prune is effective for conversational history but destructive for exact technical schemas (DDL, API contracts). Structural details must remain intact or be fetched on demand via schema retrieval.",
    "explanation": "Đáp án B đúng vì các dữ liệu kỹ thuật mang tính cấu trúc chính xác (như DDL schema) tuyệt đối không được nén tóm tắt làm mất chi tiết; chỉ áp dụng nén tóm tắt cho nhật ký hội thoại. Đáp án A sai vì tăng temperature gây ngẫu nhiên hóa chứ không khôi phục tên cột. Đáp án C sai vì cắt ngắn xâu làm mất dữ liệu thô ngẫu nhiên. Đáp án D sai vì xóa bảng cũ làm hỏng các câu lệnh JOIN liên quan.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  }
]