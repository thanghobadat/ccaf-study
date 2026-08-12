[
  {
    "id": "d1-b03-B-015",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-015",
    "scenarioSignature": {
      "testedPrinciple": "Parallel subagent payload isolation",
      "failureMode": "Subagent processing incorrect tenant data due to cross-agent payload bleeding",
      "rootCause": "Shared mutable dictionary reference passed inside async parallel dispatch loop",
      "requiredFix": "Construct fresh isolated per-account payload objects for each Task invocation"
    },
    "questionEN": "An enterprise compliance platform, AuditAgent-v3, uses a coordinator agent to evaluate financial transactions for 10 corporate accounts (tenant_01 to tenant_10) in parallel. To invoke workers, the coordinator executes an asynchronous loop over AccountContext dictionary objects. Due to mutating a single shared dictionary variable across iterations in the dispatch loop, audit logs reveal that worker instance #7 received tenant_03_data payload, resulting in cross-tenant data exposure. What is the root cause of this failure and the correct architectural resolution?",
    "question": "[d1-b03-B-015] Một nền tảng tuân thủ doanh nghiệp, AuditAgent-v3, sử dụng một tác vụ điều phối viên để đánh giá các giao dịch tài chính cho 10 tài khoản doanh nghiệp (tenant_01 đến tenant_10) song song. Để gọi các tiến trình phụ, điều phối viên thực thi một vòng lặp bất đồng bộ trên các đối tượng từ điển AccountContext. Do biến đổi một biến từ điển dùng chung duy nhất qua các vòng lặp trong vòng lặp phân phối, nhật ký kiểm toán tiết lộ rằng bản thể tiến trình phụ #7 đã nhận dữ liệu tải tenant_03_data, dẫn đến lộ dữ liệu giữa các khách hàng. Nguyên nhân gốc rễ của lỗi này và giải pháp kiến trúc đúng đắn là gì?",
    "optionsEN": [
      "A. The parallel worker subagents share a global LLM key-value cache; setting temperature to 0.0 will enforce deterministic token binding.",
      "B. Spawning subagents in parallel triggers a race condition in the LLM runtime; converting the orchestration loop to a sequential execution pattern will resolve context bleeding.",
      "C. The coordinator passed a shared mutable dictionary reference across asynchronous iterations; it must create fresh, isolated payload instances per Task invocation.",
      "D. Subagent prompt templates lack explicit tenant validation; injecting a verification prompt directive into the worker system prompt will prevent cross-tenant processing."
    ],
    "options": [
      "A. Các tiến trình phụ chạy song song chia sẻ bộ nhớ tạm KV của LLM toàn cục; việc đặt temperature thành 0.0 sẽ bắt buộc liên kết token định tính.",
      "B. Việc khởi tạo các tiến trình phụ song song kích hoạt điều kiện tranh chấp trong thời gian chạy LLM; chuyển đổi vòng lặp điều phối sang mô hình thực thi tuần tự sẽ giải quyết việc rò rỉ ngữ cảnh.",
      "C. Điều phối viên đã truyền một tham chiếu từ điển có thể biến đổi dùng chung qua các vòng lặp bất đồng bộ; nó phải tạo các bản thể tải trọng độc lập, mới cho mỗi lần gọi Task.",
      "D. Mẫu lời gọi của tiến trình phụ thiếu xác thực khách hàng rõ ràng; tiêm một chỉ thị kiểm tra vào lời gọi hệ thống của tiến trình phụ sẽ ngăn chặn việc xử lý chéo giữa các khách hàng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because LLM KV-cache and sampling temperature do not control coordinator-side memory references or parameter binding during API tool dispatch.",
      "Option B is incorrect because converting to sequential execution hides the concurrency bug without addressing the root cause of shared mutable data structure modification, and destroys execution parallelism.",
      "Option C is correct because passing a shared mutable payload dictionary in an async loop causes race conditions where worker #7 accesses modified data from iteration #3; creating isolated immutable context objects ensures strict tenant isolation.",
      "Option D is incorrect because instructing the LLM worker via prompt text cannot fix a parameter injection error where the wrong data payload was passed into the Task call at the code layer."
    ],
    "rationale": "Passing a shared mutable state object across parallel subagent dispatch iterations causes race conditions during prompt context injection. Constructing explicit, isolated per-tenant payload objects for each Task invocation ensures that each subagent receives only its designated data.",
    "explanation": "Trong kiến trúc đa tiến trình phụ (multi-subagent), khi điều phối viên khởi tạo nhiều tiến trình phụ song song trong một vòng lặp bất đồng bộ, việc dùng chung một cấu trúc dữ liệu có thể biến đổi (shared mutable dictionary) dẫn đến điều kiện tranh chấp (race condition). Tiến trình phụ #7 nhận nhầm dữ liệu của tenant_03 vì dữ liệu tải trọng bị ghi đè trước khi tiến trình phụ được phân phối thực sự.\n- Lựa chọn C đúng vì việc khởi tạo các đối tượng ngữ cảnh độc lập, mới (isolated payload instances) cho mỗi lời gọi Task đảm bảo tính cô lập dữ liệu tuyệt đối giữa các tiến trình phụ.\n- Lựa chọn A sai vì KV-cache và temperature không liên quan đến việc truyền tham số từ điển ở tầng mã nguồn điều phối.\n- Lựa chọn B sai vì chuyển sang tuần tự không giải quyết tận gốc lỗi tham chiếu dữ liệu biến đổi và làm giảm hiệu năng hệ thống.\n- Lựa chọn D sai vì lời gọi prompt bên trong tiến trình phụ không thể tự sửa dữ liệu sai đã bị truyền vào từ cấp điều phối.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-016",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-016",
    "questionEN": "A healthcare assistant agent, CareFlow-AI, establishes a mandatory constraint in Turn 1 of a user session: EXPORT_FORMAT=ANONYMIZED_JSON_ONLY. At Turn 4, the user asks the coordinator to process a patient cohort audit using a specialized data-analysis subagent via Task(description=\"Analyze patient cohort records\"). The subagent outputs raw text containing unmasked patient identification numbers. What architectural principle explains this compliance failure, and how must the coordinator fix it?",
    "question": "[d1-b03-B-016] Một tác vụ trợ lý y tế, CareFlow-AI, thiết lập một ràng buộc bắt buộc ở Lượt 1 của phiên người dùng: EXPORT_FORMAT=ANONYMIZED_JSON_ONLY. Tại Lượt 4, người dùng yêu cầu điều phối viên xử lý kiểm toán nhóm bệnh nhân bằng cách sử dụng một tiến trình phụ phân tích dữ liệu chuyên biệt qua Task(description=\"Analyze patient cohort records\"). Tiến trình phụ xuất ra văn bản thô chứa mã định danh bệnh nhân chưa được che giấu. Nguyên tắc kiến trúc nào giải thích thất bại tuân thủ này, và điều phối viên phải sửa nó như thế nào?",
    "optionsEN": [
      "A. Subagents share the parent coordinator's full conversation transcript; the coordinator must increase the worker model's context window to prevent early-turn truncation.",
      "B. The worker subagent failed to query parent memory state; the coordinator must provide a custom memory-retrieval tool allowing the worker to fetch Turn 1 history dynamically.",
      "C. Subagents automatically inherit system instructions from parent prompts; the worker failed due to a missing fallback formatting schema in its execution environment.",
      "D. Subagents operate under complete context isolation from coordinator turn history; the coordinator must explicitly re-inject active Turn 1 global constraints into the subagent Task invocation prompt."
    ],
    "options": [
      "A. Các tiến trình phụ chia sẻ toàn bộ nhật ký hội thoại của điều phối viên cha; điều phối viên phải tăng cửa sổ ngữ cảnh của mô hình tiến trình phụ để ngăn chặn việc cắt gọt các lượt đầu.",
      "B. Tiến trình phụ làm việc đã thất bại trong việc truy vấn trạng thái bộ nhớ của tiến trình cha; điều phối viên phải cung cấp một công cụ truy xuất bộ nhớ tùy chỉnh cho phép tiến trình phụ lấy lịch sử Lượt 1 một cách động.",
      "C. Các tiến trình phụ tự động kế thừa các hướng dẫn hệ thống từ lời gọi của tiến trình cha; tiến trình phụ thất bại do thiếu lược đồ định dạng dự phòng trong môi trường thực thi.",
      "D. Các tiến trình phụ hoạt động theo cơ chế cô lập ngữ cảnh hoàn toàn với lịch sử các lượt của điều phối viên; điều phối viên phải tiêm lại một cách rõ ràng các ràng buộc toàn cục của Lượt 1 vào lời gọi Task của tiến trình phụ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because subagents do not inherit the coordinator's conversation history transcript; increasing context window size does not grant access to unpassed turns.",
      "Option B is incorrect because granting subagents memory search tools increases complexity and token cost compared to having the coordinator explicitly pass active constraints during invocation.",
      "Option C is incorrect because subagents do not automatically inherit turn-specific system constraints or history from parent prompt conversations.",
      "Option D is correct because subagent context isolation prevents workers from reading prior session turns; the coordinator is responsible for explicitly re-injecting turn-1 compliance rules into the worker's Task prompt on turn 4."
    ],
    "rationale": "Subagents operate with isolated context windows and cannot access the coordinator's multi-turn conversation memory. To maintain governance and compliance rules established in earlier turns, the coordinator must explicitly extract active constraints and re-inject them into the subagent's Task invocation prompt.",
    "explanation": "Trong kiến trúc agent, các tiến trình phụ (subagents) hoạt động với nguyên tắc cô lập ngữ cảnh (context isolation). Chúng không tự động chia sẻ hay truy cập được lịch sử hội thoại (conversation history) của điều phối viên cha từ các lượt trước đó.\\n- Lựa chọn D đúng vì ràng buộc EXPORT_FORMAT=ANONYMIZED_JSON_ONLY ở Lượt 1 nằm trong bộ nhớ của điều phối viên; khi gọi tiến trình phụ ở Lượt 4, điều phối viên phải tiêm lại (re-inject) ràng buộc này vào tham số Task để tiến trình phụ tuân thủ.\\n- Lựa chọn A sai vì tiến trình phụ không kế thừa nhật ký hội thoại, mở rộng cửa sổ ngữ cảnh không giải quyết được vấn đề thiếu thông tin.\\n- Lựa chọn B sai vì buộc tiến trình phụ dùng công cụ truy xuất bộ nhớ làm tăng độ phức tạp và lãng phí token không cần thiết.\\n- Lựa chọn C sai vì tiến trình phụ không tự động kế thừa các câu lệnh hệ thống hay ràng buộc của lượt trước từ tiến trình cha.",
    "scenarioSignature": {
      "testedPrinciple": "Subagent context isolation and constraint re-injection",
      "failureMode": "Subagent violating turn-1 governance constraint during turn-4 subtask execution",
      "rootCause": "Subagent context window isolation preventing access to coordinator transcript history",
      "requiredFix": "Coordinator must explicitly re-inject active turn-1 global constraints into subagent Task parameters"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]