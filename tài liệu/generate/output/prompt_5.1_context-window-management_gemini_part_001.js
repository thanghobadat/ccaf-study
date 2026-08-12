[
  {
    "id": "d5-b10-5.1-001",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-001",
    "scenarioSignature": {
      "testedPrinciple": "lost-in-the-middle retrieval degradation in long contexts",
      "failureMode": "omission of critical information located in middle document pages",
      "rootCause": "attention mechanism bias toward start and end of context window",
      "requiredFix": "reposition critical sections to context boundaries or use multi-pass sectioned reads"
    },
    "questionEN": "An automated specification review engine, SpecAnalyzerEngine, processes a 200-page microservices technical specification document in a single LLM API call to detect breaking REST endpoint changes. Benchmark validation shows 98% recall for breaking changes documented in pages 1-20 and pages 180-200, but recall drops to 0% for API signature modifications located in pages 80-120. Which context management strategy best addresses this specific failure?",
    "question": "[d5-b10-5.1-001] Một công cụ đánh giá đặc tả tự động, SpecAnalyzerEngine, xử lý tài liệu đặc tả kỹ thuật kiến trúc microservices dài 200 trang trong một lời gọi LLM API duy nhất để phát hiện các thay đổi gây phá vỡ (breaking changes) của REST endpoint. Kiểm thử benchmark cho thấy tỷ lệ thu hồi (recall) đạt 98% đối với các thay đổi ở trang 1-20 và trang 180-200, nhưng giảm xuống 0% đối với các chỉnh sửa chữ ký API nằm ở trang 80-120. Chiến lược quản lý ngữ cảnh nào giải quyết tốt nhất thất bại cụ thể này?",
    "optionsEN": [
      "A. Reposition high-priority extraction instructions and key spec sections to the context boundaries (start/end) or use multi-pass sectioned reading for pages 80-120.",
      "B. Increase the request parameter max_tokens to its maximum limit so the model allocates more attention capacity to middle text blocks.",
      "C. Compress the entire 200-page document into a single generic summary block appended at the end of the input messages payload.",
      "D. Enable tool result trimming on the response parser to remove middle document tokens after initial prompt tokenization."
    ],
    "options": [
      "A. Tái bố trí các hướng dẫn trích xuất ưu tiên cao và các phần đặc tả quan trọng vào ranh giới ngữ cảnh (đầu/cuối) hoặc sử dụng cơ chế đọc phân đoạn nhiều lượt (multi-pass) cho trang 80-120.",
      "B. Tăng tham số yêu cầu max_tokens lên mức tối đa để mô hình phân bổ thêm dung lượng chú ý cho các khối văn bản ở giữa.",
      "C. Nén toàn bộ tài liệu 200 trang thành một khối tóm tắt tổng quát duy nhất và gắn vào cuối payload danh sách tin nhắn đầu vào.",
      "D. Kích hoạt cắt tỉa kết quả công cụ (tool result trimming) trên trình phân tích phản hồi để loại bỏ các token trang giữa sau khi token hóa prompt."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Addresses the lost-in-the-middle phenomenon by moving critical information to context boundaries (start/end) where attention weights are highest, or breaking pages 80-120 into targeted multi-pass extraction calls.",
      "Option B is incorrect: The max_tokens parameter controls the maximum token count of the output response, not the model's internal attention distribution across input prompt tokens.",
      "Option C is incorrect: Compressing the entire 200-page specification into a high-level summary discards fine-grained API signature details needed for breaking change identification.",
      "Option D is incorrect: Tool result trimming removes past execution outputs in agent sessions; it does not alter how the model processes static input text during prompt evaluation."
    ],
    "rationale": "The observed failure is a classic example of 'lost-in-the-middle' performance degradation where LLMs attend far more effectively to tokens at the beginning and end of long prompts. Repositioning key information to prompt boundaries or executing multi-pass reads targeting middle sections ensures full recall of critical API specifications.",
    "explanation": "Thất bại trong kịch bản là hiện tượng 'lost-in-the-middle' điển hình, khi mô hình ngôn ngữ lớn chú ý tốt hơn nhiều đến các token ở đầu và cuối ngữ cảnh so với các token ở giữa. Lựa chọn A đúng vì việc chuyển nội dung quan trọng về ranh giới đầu/cuối prompt hoặc áp dụng đọc multi-pass theo từng đoạn sẽ khắc phục suy giảm thu hồi ở trang 80-120. Lựa chọn B sai vì max_tokens chỉ giới hạn số lượng token đầu ra của câu trả lời, không thay đổi trọng số chú ý đầu vào. Lựa chọn C sai vì tóm tắt toàn bộ 200 trang sẽ làm mất các chi tiết kỹ thuật nguyên bản cần thiết. Lựa chọn D sai vì tool result trimming dùng để cắt bớt lịch sử gọi công cụ trong agent, không giải quyết việc trích xuất văn bản tĩnh.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  },
  {
    "id": "d5-b10-5.1-002",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-002",
    "scenarioSignature": {
      "testedPrinciple": "multi-turn context growth constraint survival",
      "failureMode": "violation of early conversational constraints in late turns",
      "rootCause": "dilution and truncation of early turn context as message history grows",
      "requiredFix": "maintain persistent key-facts block at context start with progressive updates"
    },
    "questionEN": "A multi-turn customer service agent, SupportBotAgent, maintains conversation state via an appending messages array. At turn 3, the customer specifies a strict restriction: billing_preference: manual_invoice_only. By turn 45, following extensive diagnostic chat history, the agent executes an automated card charge API call. Inspection reveals turn 3 was truncated from the context window. Which architectural fix guarantees early user constraints persist throughout long conversations?",
    "question": "[d5-b10-5.1-002] Một agent dịch vụ khách hàng nhiều lượt, SupportBotAgent, duy trì trạng thái hội thoại thông qua mảng tin nhắn messages tích lũy. Ở lượt thứ 3, khách hàng đưa ra một ràng buộc nghiêm ngặt: billing_preference: manual_invoice_only. Đến lượt thứ 45, sau lịch sử trò chuyện chẩn đoán kéo dài, agent thực hiện một lời gọi API thanh toán thẻ tự động. Kiểm tra cho thấy lượt thứ 3 đã bị cắt tỉa khỏi cửa sổ ngữ cảnh. Giải pháp kiến trúc nào đảm bảo các ràng buộc ban đầu của người dùng tồn tại xuyên suốt các hội thoại dài?",
    "optionsEN": [
      "A. Expand the max_tokens output budget parameter on turn 45 to force the API to scan deeper into previous conversation items.",
      "B. Maintain a persistent key-facts block at the top of the context window that explicitly stores active constraints and progressively condenses older turns.",
      "C. Apply automatic compaction on every turn to summarize all preceding dialog into a raw code snippet before sending to the model.",
      "D. Remove token counting pre-checks so the API request payload can dynamically bypass maximum context window size limits."
    ],
    "options": [
      "A. Mở rộng tham số ngân sách đầu ra max_tokens ở lượt 45 để buộc API quét sâu hơn vào các mục hội thoại trước đó.",
      "B. Duy trì một khối thông tin cốt lõi (key-facts block) cố định ở đầu cửa sổ ngữ cảnh để lưu trữ rõ ràng các ràng buộc đang hoạt động và cô đọng dần các lượt thoại cũ.",
      "C. Áp dụng cô đọng tự động (compaction) ở mỗi lượt để tóm tắt toàn bộ hội thoại trước đó thành một đoạn mã thô trước khi gửi tới mô hình.",
      "D. Loại bỏ kiểm tra số lượng token trước khi gọi API để payload yêu cầu có thể tự động vượt qua giới hạn kích thước cửa sổ ngữ cảnh."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: max_tokens controls maximum output response length, not the memory scope or retrieval depth of historical input messages.",
      "Option B (Correct): Keeping a dedicated key-facts block at the start of the context preserves critical constraints across multi-turn context expansion and progressive summarization.",
      "Option C is incorrect: Summarizing all dialog into code snippets causes loss of natural language precision and non-code business constraints.",
      "Option D is incorrect: Removing token counting pre-checks will cause the API to throw context length overflow errors (HTTP 400) when historical tokens exceed model limits."
    ],
    "rationale": "In long multi-turn conversations, early user constraints risk being lost due to context truncation or dilution. A key-facts block positioned at the start of the context array acts as a persistent memory space that survives progressive summarization and message window sliding.",
    "explanation": "Trong các cuộc hội thoại nhiều lượt dài, các ràng buộc ban đầu dễ bị mất do bị cắt tỉa (truncation) hoặc pha loãng ngữ cảnh. Lựa chọn B đúng vì việc duy trì khối key-facts block cố định ở đầu ngữ cảnh giúp các ràng buộc quan trọng tồn tại qua các chu kỳ tóm tắt lũy tiến (progressive summarization). Lựa chọn A sai vì max_tokens chỉ quy định độ dài đầu ra, không giúp khôi phục các tin nhắn đã bị xóa khỏi đầu vào. Lựa chọn C sai vì ép buộc tóm tắt hội thoại thành mã nguồn sẽ làm mất thông tin ngữ nghĩa kinh doanh tinh tế. Lựa chọn D sai vì bỏ kiểm tra token sẽ dẫn đến lỗi vượt quá giới hạn cửa sổ ngữ cảnh (Context Overflow Error - HTTP 400).",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  }
]