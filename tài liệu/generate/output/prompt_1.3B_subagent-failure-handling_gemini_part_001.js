[
  {
    "id": "d1-b03-B-001",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-001",
    "scenarioSignature": {
      "testedPrinciple": "subagent timeout handling and fallback strategy",
      "failureMode": "subagent timeout during data retrieval",
      "rootCause": "unhandled execution timeout causing pipeline stall",
      "requiredFix": "fallback to cached data rather than immediate retry"
    },
    "questionEN": "In a real-time financial data pipeline using an agentic coordinator, the subagent invoked via Task(name='FetchStockPrice', args={'ticker': 'AAPL'}) encounters an API timeout after 15 seconds. The pipeline has a strict 3-second end-to-end SLA for order execution risk checks. How should the coordinator handle this subagent failure?",
    "question": "[d1-b03-B-001] Trong một pipeline dữ liệu tài chính thời gian thực sử dụng agentic coordinator, subagent được gọi qua Task(name='FetchStockPrice', args={'ticker': 'AAPL'}) gặp sự cố timeout API sau 15 giây. Pipeline có cam kết SLA xử lý dưới 3 giây cho kiểm tra rủi ro lệnh. Coordinator nên xử lý sự thất bại của subagent này như thế nào?",
    "optionsEN": [
      "A. Immediately fall back to the last known valid price stored in the Redis cache with a stale_data: true flag, allowing downstream risk checks to finish within SLA limits.",
      "B. Execute up to 3 exponential backoff retries of the FetchStockPrice subagent to ensure fresh price accuracy regardless of total pipeline latency.",
      "C. Spawn a secondary subagent with full coordinator context to re-analyze the historical price trends and calculate an estimated current price.",
      "D. Terminate the coordinator execution immediately and raise an unhandled exception to prevent downstream steps from processing any data."
    ],
    "options": [
      "A. Sử dụng ngay giá hợp lệ gần nhất trong Redis cache kèm cờ stale_data: true, cho phép các bước kiểm tra rủi ro phía sau hoàn tất trong hạn mức SLA.",
      "B. Thử lại subagent FetchStockPrice tối đa 3 lần với thuật toán exponential backoff để bảo đảm lấy được giá mới nhất bất kể độ trễ toàn pipeline.",
      "C. Khởi tạo một subagent phụ với toàn bộ ngữ cảnh của coordinator để phân tích lại lịch sử giá và tính toán giá ước lượng hiện tại.",
      "D. Dừng ngay lập tức tiến trình của coordinator và ném ngoại lệ chưa được xử lý để ngăn các bước phía sau xử lý dữ liệu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because falling back to cached price data with a staleness indicator guarantees the financial pipeline stays within strict SLA limits while maintaining operational continuity.",
      "Option B is incorrect because executing 3 retries on a timed-out subagent multiplies latency (up to 45 seconds), severely breaching the 3-second SLA.",
      "Option C is incorrect because spawning another subagent for trend calculation introduces high computational latency and violates subagent context isolation.",
      "Option D is incorrect because halting the coordinator immediately causes complete system failure when a valid cached fallback exists."
    ],
    "rationale": "When a subagent execution times out in a latency-sensitive workflow, the coordinator must prioritize pipeline resilience and SLA compliance by falling back to cached state rather than repeating expensive or failing subagent calls.",
    "explanation": "Trong kiến trúc agentic orchestrator, việc xử lý thất bại của subagent (subagent failure handling) đòi hỏi chiến lược cân bằng giữa độ tươi dữ liệu và cam kết thời gian phản hồi (SLA). Khi một subagent truy xuất dữ liệu bị timeout, việc cố gắng thử lại (retry) nhiều lần sẽ làm gia tăng đáng kể độ trễ tổng thể, gây phá vỡ SLA hệ thống. Lựa chọn A là đáp án đúng vì việc chuyển sang dữ liệu đã lưu đệm (cached data) kèm đánh dấu trạng thái dữ liệu cũ (stale_data: true) giúp duy trì tính liên tục của luồng công việc mà vẫn tuân thủ SLA. Lựa chọn B thất bại vì làm tăng latency gấp nhiều lần. Lựa chọn C không phù hợp vì tạo subagent mới để dự đoán giá gây tốn chi phí và trễ thêm. Lựa chọn D thất bại vì làm gián đoạn toàn bộ hệ thống thay vì hạ cấp mềm dẻo (graceful degradation).",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-002",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-002",
    "questionEN": "A localization coordinator spawns 4 parallel subagents via Task(name='TranslateDoc', args={'lang': target_lang}) to translate a product manual into Spanish, French, German, and Japanese. The German subagent fails due to an upstream model rate limit (HTTP 429), while the other 3 subagents return valid translated documents. How should the coordinator handle this partial subagent failure?",
    "question": "[d1-b03-B-002] Một localization coordinator khởi tạo 4 subagent song song qua Task(name='TranslateDoc', args={'lang': target_lang}) để dịch một tài liệu sản phẩm sang tiếng Tây Ban Nha, Pháp, Đức và Nhật. Subagent dịch tiếng Đức thất bại do lỗi rate limit (HTTP 429), trong khi 3 subagent còn lại hoàn thành và trả về bản dịch hợp lệ. Coordinator nên xử lý sự thất bại một phần của subagent này như thế nào?",
    "optionsEN": [
      "A. Abort the entire localization task, discarding all 3 completed translations, and throw a fatal exception to force a complete restart of all 4 subagents.",
      "B. Aggregate the 3 successful translations into the final response while marking the German section with an explicit error state (status: 'failed', reason: 'HTTP 429') for partial delivery.",
      "C. Pass the full raw error stack trace of the German subagent to the 3 completed subagents so they can auto-correct and retry the German translation internally.",
      "D. Re-invoke the German translation subagent synchronously in a blocking loop until it succeeds, suspending all coordinator output."
    ],
    "options": [
      "A. Hủy toàn bộ tác vụ dịch thuật, loại bỏ cả 3 bản dịch đã hoàn thành và ném ra ngoại lệ nghiêm trọng để buộc chạy lại từ đầu cả 4 subagent.",
      "B. Thống kê và tổng hợp 3 bản dịch thành công vào kết quả cuối cùng, đồng thời đánh dấu phần tiếng Đức với trạng thái lỗi rõ ràng (status: 'failed', reason: 'HTTP 429') để phân phối một phần.",
      "C. Truyền toàn bộ stack trace lỗi của subagent tiếng Đức sang 3 subagent đã hoàn thành để chúng tự sửa lỗi và thử lại bản dịch tiếng Đức.",
      "D. Gọi lại subagent dịch tiếng Đức theo chế độ đồng bộ trong một vòng lặp nghẽn (blocking loop) cho đến khi thành công, tạm dừng mọi đầu ra của coordinator."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because discarding 3 successful parallel subagent outputs wastes tokens and needlessly delays delivery of unaffected languages.",
      "Option B is correct because aggregating partial successful results with explicit itemized error statuses maximizes efficiency and supports graceful partial degradation.",
      "Option C is incorrect because subagents are context-isolated and cannot communicate with each other or manage sibling subagent execution.",
      "Option D is incorrect because indefinite blocking in the coordinator loop can trigger system-level execution timeouts and resource exhaustion."
    ],
    "rationale": "In parallel subagent architectures where tasks are independent, coordinators should aggregate partial successful results and report targeted failures rather than discarding completed work in an all-or-nothing failure cascade.",
    "explanation": "Khi thực thi các subagent song song (parallel subagent batch) cho các nhiệm vụ độc lập như dịch đa ngôn ngữ, nguyên tắc thiết kế quan trọng là xử lý thất bại một phần (partial failure handling). coordinator không nên áp dụng tư duy \"được tất cả hoặc mất tất cả\" (all-or-nothing) vì việc loại bỏ kết quả của các subagent đã thành công sẽ gây lãng phí tài nguyên tính toán và API token. Lựa chọn B là đáp án đúng vì coordinator gom nhóm các kết quả đã thành công và ghi nhận rõ trạng thái lỗi của phần bị thất bại (status: 'failed'), giúp hệ thống đạt tính khả dụng cao (high availability). Lựa chọn A gây lãng phí kết quả hợp lệ. Lựa chọn C vi phạm nguyên tắc cô lập ngữ cảnh và mô hình hub-and-spoke (subagent không thể trao đổi trực tiếp với nhau). Lựa chọn D có rủi ro gây treo tiến trình coordinator.",
    "scenarioSignature": {
      "testedPrinciple": "partial failure handling in parallel subagent batches",
      "failureMode": "single subagent failure in parallel batch execution",
      "rootCause": "all-or-nothing pipeline failure on isolated subtask error",
      "requiredFix": "aggregate partial successful outputs and report targeted error state"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]