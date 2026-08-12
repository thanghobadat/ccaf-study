[
  {
    "id": "d1-b03-1.6-003",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-003",
    "scenarioSignature": {
      "testedPrinciple": "Parallel fan-out chunk decomposition for large logs",
      "failureMode": "Incomplete anomaly detection across long input streams",
      "rootCause": "Single-pass context saturation and attention dilution",
      "requiredFix": "Partition log input into smaller chunks for parallel worker analysis"
    },
    "questionEN": "A SecOps log analysis agent, LogPulse-v2, processes syslog-ng audit streams to identify infrastructure security anomalies. When tasked with analyzing a single 10,000-line log payload in one monolithic prompt, the agent correctly identifies 12 critical anomaly events in the first 500 lines but completely misses 45 identical privilege escalation events across the remaining 9,500 lines. Which architectural task decomposition change directly addresses the root cause of this failure?",
    "question": "[d1-b03-1.6-003] Một agent phân tích log SecOps tên là LogPulse-v2 xử lý các luồng audit syslog-ng để phát hiện các bất thường an ninh hạ tầng. Khi được giao phân tích một luồng log gồm 10.000 dòng trong một prompt đơn lẻ duy nhất, agent nhận diện chính xác 12 sự kiện bất thường nghiêm trọng ở 500 dòng đầu tiên nhưng lại bỏ sót hoàn toàn 45 sự kiện leo thang quyền hạn tương tự nằm ở 9.500 dòng còn lại. Thay đổi kiến trúc phân rã tác vụ nào giải quyết trực tiếp nguyên nhân gốc rễ của thất bại này?",
    "optionsEN": [
      "A. Increase the max_output_tokens parameter to 8192 and append a system instruction forcing the agent to read all 10,000 log lines before emitting output.",
      "B. Implement an iterative single-agent loop where the coordinator prompts the model to re-scan the full 10,000-line context until zero new anomalies are reported.",
      "C. Partition the log payload into 500-line chunks and execute parallel fan-out subagents to inspect each chunk, merging candidate anomalies in an integration pass.",
      "D. Restructure the agent into a sequential pipeline where Agent 1 filters severity keywords, Agent 2 checks syntax, and Agent 3 extracts anomaly timestamps from the payload."
    ],
    "options": [
      "A. Tăng tham số max_output_tokens lên 8192 và bổ sung chỉ thị hệ thống buộc agent phải đọc toàn bộ 10.000 dòng log trước khi đưa ra kết quả.",
      "B. Triển khai một vòng lặp đơn-agent lặp lại, trong đó coordinator yêu cầu model quét lại toàn bộ ngữ cảnh 10.000 dòng cho đến khi không tìm thấy bất thường mới.",
      "C. Phân chia dữ liệu log thành các đoạn 500 dòng và thực thi các subagent song song (fan-out) để kiểm tra từng đoạn, sau đó hợp nhất các bất thường trong bước tích hợp.",
      "D. Cấu trúc lại agent thành một pipeline tuần tự, trong đó Agent 1 lọc từ khóa mức độ nghiêm trọng, Agent 2 kiểm tra cú pháp và Agent 3 trích xuất mốc thời gian từ toàn bộ dữ liệu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Increasing max output tokens or updating system prompts does not prevent attention dilution when a single model context is saturated with 10,000 lines.",
      "Option B is incorrect: Re-prompts over the exact same saturated 10,000-line context suffer from persistent attention degradation on later lines.",
      "Option C is correct: Partitioning input into 500-line chunks for parallel subagents eliminates context saturation, guaranteeing uniform anomaly detection quality across all log entries.",
      "Option D is incorrect: Passing the complete 10,000-line stream through sequential pipeline agents leaves the initial filtering stage vulnerable to the exact same attention dilution."
    ],
    "rationale": "Under-decomposing large log analysis tasks into a single prompt leads to attention dilution, where attention and accuracy degrade over later input items. Decomposing the workload into parallel fan-out subagents processing manageable 500-line chunks ensures high recall across the entire log file.",
    "explanation": "Nguyên nhân gốc rễ của việc bỏ sót lỗi ở 9.500 dòng log phía sau là do hiện tượng pha loãng sự chú ý (attention dilution) và quá tải ngữ cảnh khi nhồi nhét 10.000 dòng log vào một prompt duy nhất.\n- Lựa chọn A sai vì việc tăng token đầu ra hay chỉ thị đọc hết không giải quyết được giới hạn chú ý nội tại của mô hình đối với ngữ cảnh đầu vào quá lớn.\n- Lựa chọn B sai vì việc lặp lại prompt trên cùng một ngữ cảnh 10.000 dòng vẫn lặp lại chính sự suy giảm chú ý ở đoạn sau của file log.\n- Lựa chọn C đúng vì chiến lược phân rã fan-out chia nhỏ dữ liệu thành các đoạn 500 dòng giúp từng subagent xử lý trong ngữ cảnh tối ưu, đảm bảo độ chính xác đồng đều trên toàn bộ 10.000 dòng trước khi tổng hợp kết quả.\n- Lựa chọn D sai vì việc chuyển sang pipeline tuần tự nhưng vẫn truyền toàn bộ 10.000 dòng cho agent đầu tiên thì agent đó vẫn bị lặp lại lỗi pha loãng sự chú ý.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  },
  {
    "id": "d1-b03-1.6-004",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-004",
    "scenarioSignature": {
      "testedPrinciple": "Glob Grep Read workflow for codebase exploration",
      "failureMode": "Context window explosion during multi-file refactoring initialization",
      "rootCause": "Eager full-codebase file loading into model context window",
      "requiredFix": "Execute structural mapping and targeted content search before reading specific files"
    },
    "questionEN": "A code refactoring agent, RefactorBot-v3, is tasked with renaming a core interface across a TypeScript project containing 80 source files. During initialization, RefactorBot-v3 executes a loop reading every .ts file into its active prompt context upfront, triggering a context_length_exceeded error before generating an execution plan. Which task decomposition strategy prevents this context explosion while ensuring all target interface references are refactored?",
    "question": "[d1-b03-1.6-004] Một agent tái cấu trúc mã nguồn tên là RefactorBot-v3 được giao nhiệm vụ đổi tên một interface cốt lõi trên một dự án TypeScript gồm 80 file nguồn. Trong giai đoạn khởi tạo, RefactorBot-v3 thực thi một vòng lặp đọc trước toàn bộ file .ts vào ngữ cảnh prompt đang hoạt động, gây ra lỗi context_length_exceeded trước khi kịp tạo kế hoạch thực thi. Chiến lược phân rã tác vụ nào giúp ngăn ngừa sự bùng nổ ngữ cảnh này mà vẫn đảm bảo mọi tham chiếu interface mục tiêu đều được refactor?",
    "optionsEN": [
      "A. Upgrade context limits to a 1M token tier and request a single monolithic patch covering all 80 files in one prompt turn.",
      "B. Spawn 80 concurrent subagents during initialization, giving each subagent one raw source file to rewrite independently without dependency checks.",
      "C. Compress source code files using AST minification before loading all compressed files simultaneously into the primary agent context window.",
      "D. Adopt a Glob -> Grep -> Read workflow to map file paths via glob, isolate interface occurrences via grep, and selectively read only affected dependency files."
    ],
    "options": [
      "A. Nâng cấp giới hạn ngữ cảnh lên mức 1M token và yêu cầu một bản patch đơn lẻ duy nhất cho cả 80 file trong một turn prompt.",
      "B. Khởi tạo song song 80 subagent ngay từ đầu, giao cho mỗi subagent một file nguồn thô để tự chỉnh sửa độc lập mà không kiểm tra phụ thuộc.",
      "C. Nén mã nguồn bằng kỹ thuật rút gọn AST trước khi nạp đồng thời toàn bộ các file đã nén vào cửa sổ ngữ cảnh của agent chính.",
      "D. Áp dụng quy trình Glob -> Grep -> Read để đọc cấu trúc file bằng glob, tìm các điểm xuất hiện interface bằng grep và chỉ đọc có chọn lọc các file bị ảnh hưởng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Expanding the context window size does not fix eager file loading and leads to attention dilution and high cost when refactoring cross-file dependencies.",
      "Option B is incorrect: Spawning 80 subagents without upfront dependency mapping causes over-decomposition, high overhead, and broken cross-file interface contracts.",
      "Option C is incorrect: AST minification still loads the entire codebase upfront into context rather than exploring incrementally.",
      "Option D is correct: Following Glob -> Grep -> Read allows the agent to locate interface usages efficiently using grep search before selectively viewing affected files, eliminating context explosion."
    ],
    "rationale": "Eagerly loading an entire codebase into context leads to token window exhaustion and context explosion. The Glob -> Grep -> Read pattern provides systematic progressive disclosure: Glob lists directory structure, Grep identifies precise call sites, and Read targets only relevant files needed for dependency analysis and code modification.",
    "explanation": "Việc đọc háo hức (eager reading) toàn bộ 80 file vào ngữ cảnh ngay lập tức dẫn đến bùng nổ ngữ cảnh (context explosion) và vượt quá giới hạn token.\n- Lựa chọn A sai vì nâng ngưỡng context chỉ trì hoãn vấn đề chứ không sửa thói quen nạp dữ liệu thừa, đồng thời làm giảm chất lượng chú ý của model.\n- Lựa chọn B sai vì chia quá nhỏ thành 80 subagent độc lập (over-decomposition) khi chưa xây dựng đồ thị phụ thuộc sẽ gây lãng phí tài nguyên và làm vỡ liên kết mã nguồn giữa các file.\n- Lựa chọn C sai vì nén AST vẫn nạp toàn bộ dữ liệu dự án lên ngữ cảnh cùng lúc thay vì khám phá từng bước.\n- Lựa chọn D đúng vì quy trình chuẩn Glob -> Grep -> Read giúp agent định vị sơ đồ file (Glob), tìm chính xác vị trí chứa interface (Grep) và chỉ đọc các file thực sự liên quan (Read), duy trì ngữ cảnh gọn nhẹ và chính xác.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  }
]