[
  {
    "id": "d5-b10-5.2-001",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-001",
    "scenarioSignature": {
      "testedPrinciple": "Immutable protection of user intent during context pruning",
      "failureMode": "Agent loses task objective and requests goal clarification mid-session",
      "rootCause": "Unpinned sliding window pruning evicts initial user prompt turns",
      "requiredFix": "Anchor user goal and task constraints in non-prunable context blocks"
    },
    "questionEN": "An autonomous backend agent OrderReconciliationAgent processes multi-step invoice auditing tasks. To manage memory overhead, the developer implemented an automated pruning policy that trims context whenever context_tokens exceeds 8,000 tokens by discarding the oldest messages from session_history. After 22 execution turns involving multiple API calls, the agent suddenly stops analyzing order discrepancies and begins asking the user what task it should perform. Inspection shows the initial prompt containing user_intent and specific audit constraints was deleted during turn 20. What is the root cause of this context amnesia, and how should the pruning strategy be refactored?",
    "question": "[d5-b10-5.2-001] Một agent backend tự động OrderReconciliationAgent thực hiện các tác vụ đối soát hóa đơn qua nhiều bước. Để quản lý chi phí bộ nhớ, lập trình viên đã triển khai chính sách cắt tỉa tự động nhằm thu gọn bối cảnh bất cứ khi nào context_tokens vượt quá 8.000 token bằng cách loại bỏ các tin nhắn cũ nhất khỏi session_history. Sau 22 lượt thực thi liên quan đến nhiều lời gọi API, agent đột ngột dừng phân tích sự sai lệch đơn hàng và bắt đầu hỏi người dùng xem nó nên thực hiện tác vụ nào. Kiểm tra cho thấy prompt ban đầu chứa user_intent và các ràng buộc đối soát cụ thể đã bị xóa ở lượt 20. Nguyên nhân gốc rễ của hiện tượng mất nhớ bối cảnh này là gì và chiến lược cắt tỉa nên được cấu trúc lại như thế nào?",
    "optionsEN": [
      "A. The pruning policy indiscriminately removed system-level goal definitions along with conversational history; user intent and primary constraints must be anchored in non-prunable system context or explicit metadata blocks.",
      "B. The sliding window threshold of 8,000 tokens is too restrictive for tool-heavy workflows; expanding the sliding window size to 50 turns will retain historical messages in context.",
      "C. The agent failed to execute a secondary call to summarize recent tool outputs; adding an automated summarizer step after turn 15 will restore the original prompt instructions.",
      "D. Old messages were deleted before tool output payloads were trimmed; reversing the pruning sequence to delete tool JSON outputs first will permanently retain initial prompt turns."
    ],
    "options": [
      "A. Chính sách cắt tỉa đã xóa nhầm định nghĩa mục tiêu cấp hệ thống cùng với lịch sử hội thoại; ý định người dùng và các ràng buộc chính phải được ghim vào bối cảnh hệ thống không thể cắt tỉa hoặc block metadata rõ ràng.",
      "B. Ngưỡng cửa sổ trượt 8.000 token quá hạn chế đối với workflow sử dụng nhiều tool; việc mở rộng kích thước cửa sổ trượt lên 50 lượt sẽ giữ lại các tin nhắn lịch sử trong bối cảnh.",
      "C. Agent đã không thực hiện cuộc gọi phụ để tóm tắt các kết quả tool gần đây; việc thêm bước tóm tắt tự động sau lượt 15 sẽ khôi phục các hướng dẫn prompt ban đầu.",
      "D. Các tin nhắn cũ đã bị xóa trước khi các payload kết quả tool được thu gọn; việc đảo ngược trình tự cắt tỉa để xóa JSON kết quả tool trước sẽ giữ lại vĩnh viễn các lượt prompt ban đầu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: The pruning algorithm treated the initial turn containing task objectives as standard conversational history in a naive FIFO queue. When context length exceeded the limit, the agent's core intent was evicted, causing task drift. Protecting user_intent and system goal constraints from pruning prevents context amnesia.",
      "Option B is incorrect: Expanding the sliding window size merely postpones eviction for longer tasks but does not protect the initial goal from eventually being pruned when long-running sessions exceed the higher threshold.",
      "Option C is incorrect: Adding an intermediate tool summarizer compresses tool outputs but does not prevent a FIFO sliding window policy from evicting early prompt turns once token limits are reached.",
      "Option D is incorrect: Trimming tool JSON payloads reduces token footprint temporarily, but without pinning task goals, subsequent pruning cycles will still delete the original user_intent prompt once capacity is reached."
    ],
    "rationale": "In context pruning strategies, user intent, task objectives, and core system constraints must never be pruned. Naive sliding window algorithms that evict early turns based strictly on age delete the initial goal, leading to agent drift and amnesia. Anchoring goals in protected context blocks ensures execution continuity across long-running turns.",
    "explanation": "Lựa chọn A là đáp án đúng vì thuật toán cắt tỉa đã xử lý lượt hội thoại đầu tiên chứa mục tiêu tác vụ như lịch sử trò chuyện thông thường trong hàng đợi FIFO. Khi độ dài bối cảnh vượt quá giới hạn, ý định cốt lõi của agent bị xóa bỏ, dẫn đến trôi tác vụ (task drift). Việc bảo vệ user_intent và các ràng buộc mục tiêu trong bối cảnh không thể cắt tỉa (non-prunable) giúp ngăn chặn hiện tượng mất nhớ này.\n\nLựa chọn B sai vì chỉ tăng kích thước cửa sổ trượt chỉ hoãn thời điểm xóa tin nhắn đối với các tác vụ dài hơn chứ không bảo vệ mục tiêu ban đầu khỏi việc bị xóa khi phiên làm việc tiếp tục kéo dài.\n\nLựa chọn C sai vì tóm tắt kết quả tool làm giảm số lượng token của các đầu ra API nhưng không ngăn được chính sách cửa sổ trượt FIFO loại bỏ các lượt prompt đầu tiên khi chạm ngưỡng token.\n\nLựa chọn D sai vì thu gọn JSON của tool chỉ giúp giảm dung lượng tạm thời; nếu không ghim mục tiêu tác vụ, các chu kỳ cắt tỉa tiếp theo vẫn sẽ xóa prompt user_intent ban đầu.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  },
  {
    "id": "d5-b10-5.2-002",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-002",
    "scenarioSignature": {
      "testedPrinciple": "Proactive capacity-based context pruning timing",
      "failureMode": "Model accuracy drop and instruction failure prior to context eviction",
      "rootCause": "Pruning trigger set at maximum capacity causing context saturation",
      "requiredFix": "Execute context pruning proactively at seventy to eighty percent capacity threshold"
    },
    "questionEN": "A developer configures an automated context pruning trigger in TelemetryDiagnosisAgent to fire only when context_utilization reaches 100% of the model's 128k max_context_length. During long log analysis sessions, monitoring reveals that before pruning executes, the model's reasoning accuracy drops sharply, instruction compliance degrades, and response latency spikes. Even after pruning reduces memory usage back to 50k tokens, subsequent turns exhibit persistent quality degradation. What explains this system failure, and what is the proper architectural fix?",
    "question": "[d5-b10-5.2-002] Một lập trình viên cấu hình trình kích hoạt cắt tỉa bối cảnh tự động trong TelemetryDiagnosisAgent chỉ chạy khi context_utilization đạt 100% max_context_length 128k của mô hình. Trong các phiên phân tích log dài, hệ thống giám sát phát hiện ra rằng trước khi việc cắt tỉa được thực thi, độ chính xác suy luận của mô hình giảm mạnh, khả năng tuân thủ hướng dẫn bị suy giảm và độ trễ phản hồi tăng vọt. Ngay cả sau khi cắt tỉa giúp giảm mức sử dụng bộ nhớ xuống còn 50k token, các lượt tiếp theo vẫn thể hiện sự suy giảm chất lượng kéo dài. Điều gì giải thích cho thất bại hệ thống này và giải pháp kiến trúc phù hợp là gì?",
    "optionsEN": [
      "A. The pruning algorithm failed to flush the model's internal key-value attention cache; issuing an explicit cache invalidation command after memory reduction restores baseline accuracy.",
      "B. Triggering pruning at 100% capacity allows context saturation and attention dilution to degrade model reasoning before pruning occurs; pruning must trigger proactively at 70-80% capacity to maintain generation quality.",
      "C. The pruning trigger evaluated cumulative character count instead of token count; updating the monitoring metric to count raw prompt tokens recalculates capacity accurately.",
      "D. Pruning at 100% capacity deletes recent log context instead of past turns; modifying the eviction algorithm to prune exclusively from the exact midpoint of context resolves degradation."
    ],
    "options": [
      "A. Thuật toán cắt tỉa đã không xóa bộ nhớ đệm attention key-value nội bộ của mô hình; việc phát lệnh vô hiệu hóa cache rõ ràng sau khi giảm bộ nhớ sẽ khôi phục độ chính xác cơ sở.",
      "B. Kích hoạt cắt tỉa ở mức 100% dung lượng khiến sự bão hòa bối cảnh và pha loãng chú ý làm giảm khả năng suy luận của mô hình trước khi việc cắt tỉa diễn ra; việc cắt tỉa phải kích hoạt chủ động ở mức 70-80% dung lượng để duy trì chất lượng tạo ra.",
      "C. Trình kích hoạt cắt tỉa đã đánh giá số lượng ký tự tích lũy thay vì số lượng token; việc cập nhật chỉ số giám sát để đếm các token prompt thô sẽ tính toán lại dung lượng một cách chính xác.",
      "D. Cắt tỉa ở mức 100% dung lượng sẽ xóa bối cảnh log gần đây thay vì các lượt cũ; việc sửa đổi thuật toán loại bỏ để chỉ cắt tỉa chính xác từ điểm giữa của bối cảnh sẽ giải quyết sự suy giảm."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Context saturation degradation in stateless LLM APIs is driven by context bloat in the prompt payload sent per turn, not a manual KV-cache flush failure.",
      "Option B is correct: Waiting until context utilization hits 100% means the model operates under extreme prompt bloat and attention dilution during critical turns prior to pruning. Triggering pruning proactively at 70-80% capacity keeps context clean and prevents quality degradation.",
      "Option C is incorrect: While token counting accuracy is important, changing character counting to token counting does not change the fact that a 100% capacity trigger threshold allows context bloat and attention degradation before eviction occurs.",
      "Option D is incorrect: Changing the deletion offset to the middle of the context does not fix the fundamental timing issue of delaying pruning until 100% capacity is reached."
    ],
    "rationale": "Pruning context at 100% capacity is an anti-pattern because LLMs suffer from performance degradation, attention dilution, and lost-in-the-middle phenomena well before reaching maximum context limits. Operating near 100% capacity compromises generation quality on turns leading up to pruning. Best practice mandates proactive pruning at 70-80% capacity threshold to ensure stable reasoning quality.",
    "explanation": "Lựa chọn B là đáp án đúng vì việc chờ đến khi mức sử dụng bối cảnh đạt 100% sẽ khiến mô hình phải hoạt động trong tình trạng phình bối cảnh (context bloat) và pha loãng sự chú ý (attention dilution) ở các lượt quan trọng ngay trước khi cắt tỉa. Kích hoạt cắt tỉa chủ động ở ngưỡng 70-80% dung lượng giữ cho bối cảnh luôn gọn gàng và duy trì chất lượng suy luận.\n\nLựa chọn A sai vì sự suy giảm chất lượng trong các API LLM không trạng thái xuất phát từ dung lượng prompt quá lớn gửi trong mỗi lượt, không phải do lỗi không xóa KV-cache thủ công.\n\nLựa chọn C sai vì mặc dù việc đếm chính xác token là quan trọng, đổi từ đếm ký tự sang đếm token không thay đổi được thực tế là ngưỡng 100% vẫn cho phép tình trạng quá tải bối cảnh xảy ra trước khi loại bỏ tin nhắn.\n\nLựa chọn D sai vì việc đổi vị trí xóa tin nhắn sang giữa bối cảnh không giải quyết được vấn đề thời điểm (timing) cơ bản khi trì hoãn cắt tỉa cho đến khi đạt 100% dung lượng.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  }
]