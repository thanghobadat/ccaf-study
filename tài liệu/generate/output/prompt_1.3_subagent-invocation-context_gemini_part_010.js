[
  {
    "id": "d1-b03-new-019",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-019",
    "scenarioSignature": {
      "testedPrinciple": "Subagent context scoping and concurrent token limit management",
      "failureMode": "Total API token quota exceeded during batch subagent execution",
      "rootCause": "Unfiltered context propagation across multiple concurrent subagents exceeding token throughput limits",
      "requiredFix": "Inject minimal task-specific context into subagents and batch invocations to keep active token load below quota limits"
    },
    "questionEN": "A DocAnalysisOrchestrator in an automated document processing pipeline spawns 20 subagents in parallel by calling the Task tool. The coordinator copies its full 50,000-token context into the context parameter for each subagent call. When all 20 Task calls are emitted in a single turn, the system fails with HTTP 429 RateLimitError: Token limit exceeded because aggregate context usage spikes to 1,000,000 tokens simultaneously, exceeding the account rate limit. Which architectural modification resolves the quota failure while preserving parallel execution efficiency?",
    "question": "[d1-b03-new-019] Một DocAnalysisOrchestrator trong hệ thống xử lý tài liệu tự động khởi chạy 20 subagent xử lý song song bằng cách gọi công cụ Task. Coordinator sao chép toàn bộ ngữ cảnh 50,000 token của nó vào tham số context cho mỗi subagent. Khi cả 20 yêu cầu Task được phát ra đồng thời trong một lượt phản hồi, hệ thống gặp lỗi HTTP 429 RateLimitError: Token limit exceeded do tổng lượng token ngữ cảnh tăng đột biến lên 1,000,000 token cùng lúc, vượt quá hạn ngạch tài khoản. Phương án kiến trúc nào giải quyết sự cố hạn ngạch mà vẫn đảm bảo hiệu suất xử lý song song?",
    "optionsEN": [
      "A. Configure the coordinator to execute the 20 subagent calls sequentially using standard async/await loops to maintain a constant context load of 50,000 tokens.",
      "B. Increase the model context window parameter max_input_tokens on each subagent definition to 100,000 tokens so the API can handle larger payloads.",
      "C. Filter the context passed to each subagent to minimal task-relevant snippets and limit maximum concurrency using a throttled worker queue.",
      "D. Combine all 20 subagent tasks into a single prompt call executed directly by the coordinator agent to eliminate subagent overhead."
    ],
    "options": [
      "A. Cấu hình coordinator để thực thi 20 subagent theo thứ tự tuần tự bằng các lệnh async/await chuẩn nhằm giữ tổng dung lượng ngữ cảnh luôn ở mức 50,000 token.",
      "B. Tăng tham số cửa sổ ngữ cảnh max_input_tokens trên mỗi subagent lên 100,000 token để API có thể xử lý lượng token lớn hơn.",
      "C. Lọc ngữ cảnh truyền vào mỗi subagent thành các đoạn trích yếu tối thiểu cần thiết cho nhiệm vụ và giới hạn mức độ song song bằng hàng đợi làm việc (worker queue) có kiểm soát.",
      "D. Gộp toàn bộ 20 nhiệm vụ subagent thành một câu lệnh duy nhất do coordinator trực tiếp xử lý để loại bỏ chi phí khởi tạo subagent."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Switching to purely sequential execution eliminates parallelism and increases overall pipeline runtime from seconds to minutes without addressing the underlying issue of passing 50K redundant tokens per task.",
      "Option B is incorrect: Expanding the model parameter max_input_tokens only increases per-request limits and does not decrease the aggregate account-level token throughput rate that triggered the 429 error.",
      "Option C is correct: Scoping subagent context to only task-essential snippets dramatically reduces per-subagent token payload, while throttling parallel concurrency via a worker queue keeps aggregate token usage safely below account rate limits.",
      "Option D is incorrect: Merging 20 distinct subagent tasks into a single prompt causes prompt context saturation, leads to performance degradation, and loses the benefit of isolated subagent execution."
    ],
    "rationale": "Why Option C is correct: Passing full coordinator history to 20 subagents redundantly replicates 50,000 tokens per subagent, causing aggregate token consumption to spike to 1,000,000 tokens simultaneously. The proper architectural pattern requires scoping subagent context to minimal task-specific data and using concurrency controls (such as a worker pool or dynamic queue) to limit simultaneous active subagents, thereby staying within account rate limits while maintaining high throughput.",
    "explanation": "Giải thích chi tiết:\n- Đáp án C đúng: Khi phát 20 subagent song song với 50,000 token ngữ cảnh thừa hưởng từ coordinator cho mỗi subagent, tổng lượng token gửi tới API trong một thời điểm đạt 1,000,000 token, gây lỗi vượt hạn ngạch tài khoản (HTTP 429 RateLimitError). Giải pháp đúng là cô lập và thu gọn ngữ cảnh truyền qua tham số context của công cụ Task chỉ chứa thông tin tối thiểu cần thiết cho từng nhiệm vụ, đồng thời kết hợp hàng đợi (worker queue) để khống chế số lượng subagent chạy đồng thời.\n- Đáp án A sai: Việc chuyển hoàn toàn sang xử lý tuần tự (sequential) làm mất hoàn toàn ưu điểm xử lý song song, kéo dài thời gian hoàn thành công việc và vẫn lãng phí token do không thu gọn ngữ cảnh.\n- Đáp án B sai: Thay đổi max_input_tokens trên từng subagent không giải quyết được giới hạn rate limit về tổng số token trên cấp độ tài khoản (account quota).\n- Đáp án D sai: Gộp 20 nhiệm vụ phức tạp vào một prompt duy nhất cho coordinator sẽ gây quá tải ngữ cảnh (context overload), suy giảm chất lượng đầu ra và mất đi tính cô lập của subagent.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]