[
  {
    "id": "d1-b03-1.6-007",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-007",
    "scenarioSignature": {
      "testedPrinciple": "Multi-pass architecture with explicit cross-item integration pass",
      "failureMode": "Inconsistent cross-file entity references despite valid local file analysis",
      "rootCause": "Absence of global integration pass following parallel local analysis passes",
      "requiredFix": "Implement two-pass pipeline with local item extraction followed by global cross-item consolidation"
    },
    "questionEN": "An infrastructure-as-code governance agent, TerraGuard-v2, evaluates multi-file Terraform configuration modules across several infrastructure repositories. Each worker subagent parses individual .tf files (main.tf, variables.tf, outputs.tf) to verify local resource definitions (such as aws_s3_bucket and aws_iam_role). While local syntax and resource properties pass verification independently, cross-file reference links (such as IAM role ARN exports matched against bucket policy imports) suffer from mismatched naming conventions (prod-app-role vs prod_app_role_arn), resulting in deployment validation failure ERR_IAM_ROLE_NOT_FOUND. What architectural modification best resolves this cross-file validation failure?",
    "question": "[d1-b03-1.6-007] Một agent quản trị hạ tầng dưới dạng mã (IaC), TerraGuard-v2, đánh giá các module cấu hình Terraform gồm nhiều file trên nhiều kho lưu trữ hạ tầng. Mỗi worker subagent phân tích từng file .tf riêng lẻ (main.tf, variables.tf, outputs.tf) để xác minh định nghĩa tài nguyên cục bộ (như aws_s3_bucket và aws_iam_role). Mặc dù cú pháp cục bộ và thuộc tính tài nguyên vượt qua xác minh một cách độc lập, các liên kết tham chiếu chéo giữa các file (như export IAM role ARN so với import policy của bucket) gặp lỗi không đồng nhất về quy tắc đặt tên (prod-app-role so với prod_app_role_arn), dẫn đến thất bại xác minh triển khai ERR_IAM_ROLE_NOT_FOUND. Thay đổi kiến trúc nào giải quyết tốt nhất lỗi xác minh chéo giữa các file này?",
    "optionsEN": [
      "A. Increase the context window allocation per subagent so that each local analyzer receives all repository files simultaneously.",
      "B. Replace parallel local analyzers with a single sequential pipeline where each subagent overwrites the main configuration file after analyzing one module.",
      "C. Restructure the workflow into a two-pass pipeline: run parallel local analysis to extract file-level schema mappings, followed by a dedicated cross-item integration pass that validates global entity cross-references.",
      "D. Implement an automated retry loop with high temperature parameters when ERR_IAM_ROLE_NOT_FOUND is raised during deployment validation."
    ],
    "options": [
      "A. Tăng dung lượng cửa sổ ngữ cảnh cho mỗi subagent để mỗi bộ phân tích cục bộ nhận tất cả các file trong kho lưu trữ cùng một lúc.",
      "B. Thay thế các bộ phân tích cục bộ song song bằng một pipeline tuần tự duy nhất, trong đó mỗi subagent ghi đè file cấu hình chính sau khi phân tích một module.",
      "C. Tái cấu trúc quy trình thành pipeline hai pha (two-pass pipeline): chạy phân tích cục bộ song song để trích xuất ánh xạ schema ở cấp file, tiếp theo là pha tích hợp chéo chuyên dụng để xác minh các tham chiếu chéo của thực thể trên toàn hệ thống.",
      "D. Triển khai một vòng lặp thử lại tự động với tham số temperature cao khi xuất hiện lỗi ERR_IAM_ROLE_NOT_FOUND trong quá trình xác minh triển khai."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Injecting all repository files into a single subagent context causes context overload and attention dilution, degrading local analysis quality without enforcing explicit cross-file validation logic.",
      "Option B is incorrect: A single sequential pipeline creates a severe processing bottleneck and risks context degradation as early module details get overwritten or truncated during later module processing.",
      "Option C is correct: Decomposing the validation into a two-pass pipeline ensures that local syntax/properties are extracted cleanly in parallel pass 1, while global cross-file dependencies and reference naming consistency are explicitly reconciled in pass 2.",
      "Option D is incorrect: Adding retries with high temperature introduces non-deterministic sampling without addressing the underlying structural omission of a cross-file reference consolidation phase."
    ],
    "rationale": "When processing multi-file systems, local analysis of individual files cannot detect cross-file inconsistencies if no integration step exists. A two-pass architecture separates per-file item extraction (pass 1) from cross-item entity and reference reconciliation (pass 2), preventing both attention dilution and missed cross-file errors.",
    "explanation": "Lựa chọn C là chính xác vì việc chia quy trình kiểm tra thành pipeline hai pha (two-pass pipeline) giúp giải quyết triệt để vấn đề: Pha 1 phân tích cục bộ song song từng file để trích xuất thuộc tính và cú pháp, trong khi Pha 2 tập trung hợp nhất và đối soát các tham chiếu chéo giữa các file (như export/import ARN). Lựa chọn A sai vì việc nạp tất cả file vào một context gây pha loãng chú ý (attention dilution). Lựa chọn B sai vì quy trình tuần tự đơn lẻ tạo ra nút thắt cổ chai và mất thông tin khi xử lý chuỗi file dài. Lựa chọn D sai vì thử lại ngẫu nhiên không thể sửa được lỗi thiếu hụt kiến trúc tích hợp.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  },
  {
    "id": "d1-b03-1.6-008",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-008",
    "scenarioSignature": {
      "testedPrinciple": "External scratchpad pattern for complex iterative investigation",
      "failureMode": "Loss of early intermediate findings when context window fills during multi-step investigation",
      "rootCause": "Relying on short-term agent conversation context without persisting findings to external storage",
      "requiredFix": "Implement file-backed scratchpad pattern to persist key findings across investigation steps"
    },
    "questionEN": "An automated incident triage agent, TraceSleuth-v4, conducts multi-step root-cause analysis across Kubernetes pod logs (/var/log/pods) and Prometheus metrics (container_cpu_cgroup_error). During a 15-step investigation involving log tailing, stack trace parsing, and memory dump analysis, the agent correctly identifies critical baseline CPU spikes at step 3. However, as extensive diagnostic log outputs fill the context window, older context is evicted. By step 14, the agent re-executes earlier CLI diagnostic commands and outputs a report containing hallucinated root causes with failure ERR_TRUNCATED_CONTEXT_MISSING_ROOT. What design pattern prevents this loss of early investigation findings?",
    "question": "[d1-b03-1.6-008] Một agent xử lý sự cố tự động, TraceSleuth-v4, thực hiện phân tích nguyên nhân gốc rễ qua nhiều bước trên log của Kubernetes pod (/var/log/pods) và metric Prometheus (container_cpu_cgroup_error). Trong quá trình điều tra kéo dài 15 bước bao gồm xem log, phân tích stack trace và kiểm tra memory dump, agent đã xác định chính xác các đợt tăng CPU cơ sở quan trọng ở bước 3. Tuy nhiên, khi kết quả log chẩn đoán lớn làm đầy cửa sổ ngữ cảnh, ngữ cảnh cũ bị đẩy ra ngoài. Đến bước 14, agent chạy lại các lệnh chẩn đoán CLI ban đầu và đưa ra báo cáo chứa các nguyên nhân gốc rễ bị bịa đặt với lỗi ERR_TRUNCATED_CONTEXT_MISSING_ROOT. Mẫu thiết kế nào ngăn chặn việc mất các phát hiện điều tra ban đầu này?",
    "optionsEN": [
      "A. Truncate incoming CLI log outputs to 100 characters before appending them to the agent conversation transcript.",
      "B. Enforce a strict workflow constraint limiting the agent to maximum 5 diagnostic tool calls per incident investigation.",
      "C. Isolate each CLI diagnostic command into a separate worker subagent execution with no shared context storage.",
      "D. Implement a file-backed scratchpad pattern where the agent writes validated findings to disk at each step and re-reads the summary before final report generation."
    ],
    "options": [
      "A. Cắt ngắn đầu ra log của lệnh CLI xuống 100 ký tự trước khi nối vào nhật ký hội thoại của agent.",
      "B. Áp dụng ràng buộc quy trình nghiêm ngặt giới hạn agent tối đa 5 lần gọi công cụ chẩn đoán cho mỗi lần điều tra sự cố.",
      "C. Cô lập từng lệnh chẩn đoán CLI thành một lượt thực thi subagent riêng biệt mà không có bộ nhớ ngữ cảnh chia sẻ.",
      "D. Triển khai mẫu scratchpad lưu trữ trên file, trong đó agent ghi các phát hiện đã xác minh vào đĩa ở mỗi bước và đọc lại tóm tắt trước khi tạo báo cáo cuối cùng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Arbitrarily truncating CLI log outputs to 100 characters strips vital error trace details and stack traces, causing immediate diagnostic errors without solving context accumulation.",
      "Option B is incorrect: Restricting total tool calls to 5 halts complex investigations prematurely, preventing the agent from executing necessary downstream memory dump analysis.",
      "Option C is incorrect: Running tool executions in completely isolated subagents prevents cross-tool data synthesis, causing subagents to operate blindly without awareness of step 3 CPU metrics.",
      "Option D is correct: Utilizing a file-backed scratchpad pattern allows the agent to persist key structured findings (e.g., step 3 CPU baseline metrics) to an external file on disk, ensuring intermediate discoveries survive context eviction across lengthy investigations."
    ],
    "rationale": "Complex multi-step investigations generate high context volume that eventually evicts early findings from short-term memory. The scratchpad pattern solves this by persisting intermediate discoveries to external storage (e.g., a file), allowing the agent to maintain state continuity regardless of context window truncation.",
    "explanation": "Lựa chọn D là chính xác vì mẫu thiết kế scratchpad dựa trên file (file-backed scratchpad pattern) cho phép agent ghi lại các phát hiện quan trọng (như metric CPU ở bước 3) vào đĩa sau mỗi bước chẩn đoán. Khi cửa sổ ngữ cảnh bị đầy và cuộn mất dữ liệu cũ, agent chỉ cần đọc lại file scratchpad để duy trì bức tranh toàn cảnh mà không bị lặp lại lệnh hay sinh ra hallucination. Lựa chọn A sai vì cắt ngắn log làm mất dữ liệu chẩn đoán quan trọng. Lựa chọn B sai vì giới hạn 5 bước sẽ ngắt sớm cuộc điều tra chưa hoàn thành. Lựa chọn C sai vì các subagent cô lập hoàn toàn không thể chia sẻ ngữ cảnh với nhau.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  }
]