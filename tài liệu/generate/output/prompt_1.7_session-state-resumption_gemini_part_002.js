[
  {
    "id": "d1-b03-1.7-003",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-003",
    "scenarioSignature": {
      "testedPrinciple": "checkpoint pattern for long multi-step agent workflows",
      "failureMode": "agent restarting execution from initial stage after mid-pipeline crash losing completed work",
      "rootCause": "absence of durable external state checkpoints between execution stages",
      "requiredFix": "persist intermediate stage state checkpoints to external storage to enable incremental resumption"
    },
    "questionEN": "A batch data enrichment agent executes a 20-stage pipeline processing financial transactions across S3 buckets. The pipeline runs for 4 hours. At stage 18/20, an out-of-memory (OOM) error crashes the agent host container. Because the agent system only maintains transient in-memory state without persisting intermediate artifacts or state checkpoints, restarting the agent forces it to re-execute from stage 1, losing 3.5 hours of completed work and incurring redundant API costs. What is the correct architectural pattern to ensure efficient recovery from transient mid-execution failures?",
    "question": "[d1-b03-1.7-003] Một agent làm giàu dữ liệu (data enrichment) thực thi quy trình 20 giai đoạn xử lý giao dịch tài chính trên các S3 bucket trong thời gian 4 giờ. Tại giai đoạn 18/20, lỗi hết bộ nhớ (OOM) làm sập container lưu trữ agent. Do hệ thống agent chỉ duy trì trạng thái tạm thời trong bộ nhớ mà không lưu lại các sản phẩm trung gian hoặc điểm kiểm soát (checkpoint), việc khởi động lại agent buộc nó phải thực thi lại từ giai đoạn 1, làm mất 3,5 giờ làm việc đã hoàn thành và phát sinh chi phí API trùng lặp. Mô hình kiến trúc nào là đúng để đảm bảo khôi phục hiệu quả sau các sự cố gián đoạn giữa chừng?",
    "optionsEN": [
      "A. Implement a session retry loop that automatically restarts the container with double the RAM quota whenever an OOM crash is detected.",
      "B. Call fork_session before launching each pipeline step to maintain parallel execution threads across isolated worker nodes.",
      "C. Implement external state checkpointing after each stage completion, allowing the resumed session to restore the last verified state checkpoint and skip completed stages.",
      "D. Increase the agent context window token limit to store the raw input data payload for all 20 stages in prompt memory."
    ],
    "options": [
      "A. Triển khai vòng lặp thử lại phiên (session retry loop) tự động khởi động lại container với gấp đôi dung lượng RAM bất cứ khi nào phát hiện sập OOM.",
      "B. Gọi fork_session trước khi khởi chạy mỗi bước trong quy trình để duy trì các luồng thực thi song song trên các nút worker cô lập.",
      "C. Triển khai cơ chế checkpoint trạng thái ra lưu trữ bên ngoài sau khi hoàn thành mỗi giai đoạn, cho phép phiên được khôi phục tải lại checkpoint đã xác minh gần nhất và bỏ qua các giai đoạn đã hoàn thành.",
      "D. Tăng giới hạn cửa sổ ngữ cảnh của agent để lưu trữ toàn bộ dữ liệu đầu vào thô của 20 giai đoạn trong bộ nhớ prompt."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Doubling RAM addresses container memory constraints but fails to persist progress; any crash still triggers a complete restart from stage 1.",
      "Option B is incorrect: fork_session creates parallel context branches for divergent path exploration; it does not persist execution progress across host container crashes.",
      "Option C is correct: External state checkpointing persists verified stage progress to external storage (e.g., database or S3), allowing the agent on resumption to inspect checkpoints and skip already completed work.",
      "Option D is incorrect: Prompt memory relies on volatile in-memory state that is completely wiped when the host container experiences an OOM crash."
    ],
    "rationale": "For multi-hour, multi-step workflows, saving intermediate checkpoints to durable external storage ensures that agent failures at step 18/20 resume from the last successful checkpoint (step 17) rather than re-running the entire pipeline from step 1.",
    "explanation": "Giải thích chi tiết:\n- Đáp án A sai: Việc tăng RAM giúp giảm nguy cơ OOM nhưng không giải quyết vấn đề lưu trữ tiến trình; nếu xảy ra sập hệ thống, agent vẫn phải chạy lại từ đầu.\n- Đáp án B sai: fork_session phục vụ việc phân nhánh hội thoại để thử nghiệm các hướng đi khác nhau, không có chức năng ghi dữ liệu trạng thái ra bộ nhớ bền vững để sống sót qua sự cố sập container.\n- Đáp án C đúng: Mô hình checkpoint trạng thái ghi nhận kết quả từng giai đoạn ra bộ nhớ ngoài (S3/DB). Khi khởi động lại, agent đọc checkpoint và tiếp tục từ giai đoạn 18 thay vì làm lại từ giai đoạn 1, giúp tiết kiệm tài nguyên và chi phí API.\n- Đáp án D sai: Ngữ cảnh prompt chỉ nằm trong bộ nhớ tạm thời của tiến trình, toàn bộ dữ liệu này sẽ bị mất hoàn toàn khi container sập.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  },
  {
    "id": "d1-b03-1.7-004",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-004",
    "scenarioSignature": {
      "testedPrinciple": "concise state injection budget optimization",
      "failureMode": "agent latency spike and attention dilution from bloated session state injection",
      "rootCause": "injecting full raw transcript history into session prompt instead of condensed summary",
      "requiredFix": "summarize prior session state into concise key findings payload before injecting into new session"
    },
    "questionEN": "An incident triage agent crashes during a multi-turn troubleshooting session on a Kubernetes cluster. To resume the agent, a developer restores the state by prepending the entire raw execution history from the previous 50,000-token session into the system prompt of a new session. Consequently, the agent exhibits high response latency, exceeds API context budgets, and experiences attention dilution that causes it to miss critical error logs in recent tool calls. Which state injection refactoring resolves this context overload issue?",
    "question": "[d1-b03-1.7-004] Một agent xử lý sự cố gặp lỗi sập trong phiên chẩn đoán nhiều lượt trên cụm Kubernetes. Để khôi phục agent, nhà phát triển tái tạo trạng thái bằng cách chèn toàn bộ lịch sử thực thi thô 50.000 token từ phiên trước vào system prompt của phiên mới. Kết quả là agent gặp độ trễ phản hồi cao, vượt ngân sách token API và bị suy giảm sự chú ý (attention dilution) dẫn đến bỏ sót các nhật ký lỗi quan trọng trong các lượt gọi công cụ gần đây. Tái cấu trúc nạp trạng thái (state injection) nào sẽ giải quyết triệt me sự cố quá tải ngữ cảnh này?",
    "optionsEN": [
      "A. Use fork_session on the 50,000-token context history to automatically truncate older tool execution outputs before spawning new sessions.",
      "B. Increase the model context window to 200,000 tokens so the entire raw historical context can be processed without latency penalties.",
      "C. Store the raw 50,000-token transcript in an external database and require the agent to issue full SQL SELECT queries to fetch conversation turns before every action.",
      "D. Summarize the prior session state into a structured payload under 2,000 tokens—containing key findings, system state changes, and active goals—and inject only this summary at session start."
    ],
    "options": [
      "A. Sử dụng fork_session trên lịch sử ngữ cảnh 50.000 token để tự động cắt gọt các kết quả công cụ cũ trước khi tạo phiên mới.",
      "B. Tăng cửa sổ ngữ cảnh của mô hình lên 200.000 token để xử lý toàn bộ lịch sử thô mà không bị ảnh hưởng độ trễ.",
      "C. Lưu bản ghi 50.000 token thô vào cơ sở dữ liệu bên ngoài và yêu cầu agent phát lệnh SQL SELECT để lấy toàn bộ lịch sử hội thoại trước mỗi hành động.",
      "D. Tóm tắt trạng thái phiên trước thành một cấu trúc dữ liệu dưới 2.000 token — bao gồm các phát hiện chính, thay đổi hệ thống và mục tiêu hiện tại — và chỉ nạp bản tóm tắt này khi khởi tạo phiên."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: fork_session clones conversation history verbatim without summarizing or truncating past tool outputs.",
      "Option B is incorrect: Expanding context limits does not eliminate latency overhead or attention dilution caused by unsummarized historical clutter.",
      "Option C is incorrect: Querying full raw transcripts repeatedly reintroduces prompt bloat and adds tool invocation latency.",
      "Option D is correct: Summarizing prior state into a concise payload (< 2K tokens) retains vital context while keeping prompt size minimal, eliminating attention dilution and reducing costs."
    ],
    "rationale": "State injection must balance state awareness with context budget. Injecting full raw session histories (> 50K tokens) leads to attention dilution and high latency. Best practices dictate distilling prior state into a concise summary (< 2K tokens) containing key facts, completed progress, and current objectives.",
    "explanation": "Giải thích chi tiết:\n- Đáp án A sai: fork_session chỉ sao chép nguyên văn toàn bộ hội thoại cũ chứ không tự động tóm tắt hay cắt bỏ các kết quả công cụ.\n- Đáp án B sai: Tăng giới hạn cửa sổ ngữ cảnh không giải quyết được hiện tượng suy giảm sự chú ý (attention dilution) và chi phí/độ trễ cao do prompt quá lớn.\n- Đáp án C sai: Việc đọc lại 50.000 token thô từ cơ sở dữ liệu trước mỗi bước hành động tiếp tục làm phình ngữ cảnh và tăng thời gian phản hồi.\n- Đáp án D đúng: Việc nạp trạng thái hiệu quả đòi hỏi tóm tắt phiên trước thành gói dữ liệu tinh gọn (< 2.000 token) chứa các sự thật chính, các bước đã làm và mục tiêu tiếp theo, giúp agent nắm đủ thông tin mà vẫn duy trì tốc độ và độ chính xác.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  }
]