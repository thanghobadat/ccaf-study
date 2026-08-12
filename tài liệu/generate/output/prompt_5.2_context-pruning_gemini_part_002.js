[
  {
    "id": "d5-b10-5.2-003",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-003",
    "scenarioSignature": {
      "testedPrinciple": "summarize tool outputs before pruning raw data",
      "failureMode": "permanent loss of metric data during report generation",
      "rootCause": "pruning raw tool results prior to extracting key facts into context",
      "requiredFix": "distill key metrics into persistent state before purging raw tool output"
    },
    "questionEN": "A telemetry agent queries Prometheus API via query_range to fetch CPU and memory usage metrics across microservices. The pruning pipeline immediately deletes raw tool_result blocks upon tool completion, prior to running an LLM distillation step. Consequently, downstream report generation fails with missing metric figures. What is the root cause of this failure?",
    "question": "[d5-b10-5.2-003] Một agent giám sát đo đạc truy vấn Prometheus API thông qua query_range để lấy số liệu sử dụng CPU và bộ nhớ của các microservice. Pipeline cắt tỉa ngữ cảnh lập tức xóa các khối tool_result thô ngay khi công cụ thực thi xong, trước khi chạy bước chắt lọc LLM. Kết quả là quá trình tạo báo cáo phía sau bị thiếu số liệu metric. Nguyên nhân gốc rễ của lỗi này là gì?",
    "optionsEN": [
      "A. The pruning module dropped system prompts prior to calculating token usage against context capacity limits.",
      "B. The memory window lacked a sliding window policy over user turns, causing context overflow during execution.",
      "C. Raw tool outputs were removed before executing a summarization step that distills key numerical metrics into context.",
      "D. The local telemetry logger saved tool outputs to disk without configuring a Time-To-Live (TTL) retention rule."
    ],
    "options": [
      "A. Module cắt tỉa đã xóa system prompt trước khi tính toán mức tiêu thụ token so với giới hạn dung lượng ngữ cảnh.",
      "B. Bộ nhớ ngữ cảnh thiếu chính sách sliding window cho các lượt của người dùng, gây ra tràn ngữ cảnh khi chạy công cụ.",
      "C. Kết quả công cụ thô đã bị xóa trước khi thực hiện bước tóm tắt để chắt lọc các số liệu metric quan trọng vào ngữ cảnh.",
      "D. Trình ghi log đo đạc cục bộ đã lưu kết quả công cụ vào đĩa mà không cấu hình quy tắc thời gian sống (TTL)."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because purging system prompts alters system behavior and safety guidelines, but does not explain the loss of tool-returned metrics.",
      "Option B is incorrect because sliding window token overflow leads to context truncation or API context length errors, not the premature deletion of unsummarized tool outputs.",
      "Option C is correct because deleting raw tool results prior to summarizing or extracting key facts leaves the context devoid of metric data, rendering downstream generation impossible.",
      "Option D is incorrect because local disk logging TTL dictates file storage retention on disk and has no direct effect on the active in-memory LLM context."
    ],
    "rationale": "The summarize-before-prune pattern dictates that raw, token-heavy tool results must first be condensed into 2-3 key factual data points within context state before the raw output block is safely purged.",
    "explanation": "Trong chiến lược cắt tỉa ngữ cảnh (Context Pruning Strategies), kết quả công cụ (tool results) thô thường chiếm dung lượng token rất lớn. Tuy nhiên, trước khi xóa bỏ khối tool_result thô để giải phóng bộ nhớ, hệ thống bắt buộc phải thực hiện bước tóm tắt/chắt lọc (summarize-before-prune) để trích xuất 2-3 dữ kiện hoặc số liệu quan trọng nhất đưa vào trạng thái ngữ cảnh duy trì. Việc xóa tool_result trước khi tóm tắt làm mất vĩnh viễn dữ liệu metric, khiến LLM không thể tạo báo cáo chính xác ở các bước sau. Lựa chọn A sai vì liên quan đến system prompt. Lựa chọn B sai vì tràn cửa sổ sliding window dẫn đến lỗi quá tải token chứ không gây mất dữ liệu metric do xóa sớm. Lựa chọn D sai vì TTL lưu trữ trên đĩa không ảnh hưởng đến bộ nhớ ngữ cảnh active của LLM.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  },
  {
    "id": "d5-b10-5.2-004",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-004",
    "scenarioSignature": {
      "testedPrinciple": "error history preservation during context pruning",
      "failureMode": "repeated execution of identical failed action loop",
      "rootCause": "pruning past error logs and failure responses from context window",
      "requiredFix": "tag error history as non-prunable content to preserve action outcome memory"
    },
    "questionEN": "A Kubernetes deployment agent executes kubectl apply -f deployment.yaml, which fails with CreateContainerConfigError due to a missing secret. The pruning module categorizes error responses as redundant context and removes them. On the next iteration, the agent executes kubectl apply -f deployment.yaml again with unchanged parameters, creating a retry loop. What pruning flaw caused this behavior?",
    "question": "[d5-b10-5.2-004] Một agent triển khai Kubernetes thực thi lệnh kubectl apply -f deployment.yaml, lệnh này thất bại với lỗi CreateContainerConfigError do thiếu secret. Module cắt tỉa phân loại các phản hồi lỗi là ngữ cảnh dư thừa và xóa chúng đi. Trong vòng lặp tiếp theo, agent lại thực thi kubectl apply -f deployment.yaml với tham số không đổi, tạo thành vòng lặp thử lại vô tận. Lỗi cắt tỉa nào đã gây ra hành vi này?",
    "optionsEN": [
      "A. The pruning manager failed to delete intermediate reasoning steps, causing token exhaustion in the plan buffer.",
      "B. The sliding window algorithm evicted system instructions detailing Kubernetes manifest validation rules.",
      "C. The execution pipeline discarded raw command output logs without storing a context checkpoint to disk.",
      "D. The pruning manager treated error history as safe to prune, removing the failure evidence required to avoid repeating identical actions."
    ],
    "options": [
      "A. Trình quản lý cắt tỉa không xóa các bước suy luận trung gian, gây kiệt token trong bộ đệm kế hoạch.",
      "B. Thuật toán sliding window đã xóa các chỉ dẫn hệ thống quy định quy tắc kiểm tra manifest Kubernetes.",
      "C. Pipeline thực thi đã bỏ qua log đầu ra lệnh thô mà không lưu điểm kiểm tra ngữ cảnh (checkpoint) vào đĩa.",
      "D. Trình quản lý cắt tỉa đã xử lý lịch sử lỗi như nội dung an toàn để xóa, loại bỏ bằng chứng thất bại cần thiết để tránh lặp lại cùng một hành động."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because keeping intermediate reasoning steps consumes token budget but does not cause the model to forget previous command failures.",
      "Option B is incorrect because evicting system instructions leads to syntax errors or invalid output formatting, not repetition of a specific failed command.",
      "Option C is incorrect because lacking disk checkpoints affects disaster recovery after system crashes, not the agent's immediate awareness of its prior failed attempt.",
      "Option D is correct because error history must NEVER be pruned; removing failure logs deprives the agent of feedback, causing context amnesia and infinite retry loops."
    ],
    "rationale": "Error history is categorized as NEVER-prune content in LLM context management because agents rely on recorded failure feedback to alter their strategy and avoid repeating invalid tool calls.",
    "explanation": "Trong nguyên tắc quản lý ngữ cảnh, lịch sử lỗi (error history) và kết quả thất bại là loại thông tin KHÔNG BAO GIỜ ĐƯỢC XÓA (NEVER prune). Khi cắt tỉa lịch sử lỗi, agent rơi vào trạng thái 'mất trí nhớ ngữ cảnh' (context amnesia), không còn ghi nhận rằng lệnh kubectl apply vừa thất bại, do đó sẽ liên tục thử lại cùng một hành động hỏng. Lựa chọn A sai vì không xóa bước suy luận chỉ làm tốn token chứ không giấu lịch sử lỗi. Lựa chọn B sai vì mất system prompt gây sai định dạng chứ không gây lặp lại lệnh lỗi. Lựa chọn C sai vì điểm kiểm tra đĩa (checkpoint) phục vụ khôi phục khi sập hệ thống chứ không điều khiển nhận thức trực tiếp trong bộ nhớ LLM.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  }
]