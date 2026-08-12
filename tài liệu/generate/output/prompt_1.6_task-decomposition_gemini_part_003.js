[
  {
    "id": "d1-b03-1.6-005",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-005",
    "scenarioSignature": {
      "testedPrinciple": "Parallel task decomposition for independent subtasks",
      "failureMode": "Increased processing latency from serial execution",
      "rootCause": "Sequential pipeline applied to independent tasks with no dependencies",
      "requiredFix": "Parallel fan-out execution with concurrent subtask invocation"
    },
    "questionEN": "A telemetry analysis agent, LogAuditor-v3, evaluates 10 independent microservice log files stored in /var/log/services/*.log. The current workflow uses a sequential pipeline where the coordinator agent waits for Log 1 parsing to complete before starting Log 2, taking 50 seconds in total (5s per log). There are no shared states or cross-file dependencies between logs. Which architectural modification best eliminates this throughput bottleneck?",
    "question": "[d1-b03-1.6-005] Agent phân tích dữ liệu từ xa, LogAuditor-v3, đánh giá 10 tệp log vi dịch vụ độc lập được lưu trữ trong /var/log/services/*.log. Quy trình hiện tại sử dụng một pipeline tuần tự trong đó agent điều phối chờ hoàn tất phân tích Log 1 trước khi bắt đầu Log 2, tổng cộng mất 50 giây (5 giây mỗi log). Không có trạng thái chia sẻ hoặc phụ thuộc chéo giữa các tệp log. Sự điều chỉnh kiến trúc nào giải quyết tốt nhất nút thắt cổ chai về hiệu suất này?",
    "optionsEN": [
      "A. Re-architect the workflow to use a parallel fan-out pattern, spawning concurrent evaluation subagents per log file and merging their JSON outputs.",
      "B. Load all 10 log files into a single agent prompt context to process them in a single monolithic LLM completion pass.",
      "C. Wrap each log evaluation step in an iterative refinement loop that repeatedly validates parsing rules until a confidence threshold is met.",
      "D. Insert a pre-execution cache check step between each log file processing stage in the sequential chain."
    ],
    "options": [
      "A. Tái cấu trúc quy trình công việc để sử dụng mô hình parallel fan-out, khởi tạo các subagent đánh giá đồng thời cho mỗi tệp log và hợp nhất đầu ra JSON của chúng.",
      "B. Nạp toàn bộ 10 tệp log vào ngữ cảnh prompt của một agent duy nhất để xử lý chúng trong một lượt gọi LLM đơn khối.",
      "C. Bọc từng bước đánh giá log trong một vòng lặp tinh chỉnh lặp đi lặp lại để xác thực liên tục các quy tắc phân tích cho đến khi đạt ngưỡng tin cậy.",
      "D. Chèn một bước kiểm tra bộ đệm trước khi thực thi giữa từng giai đoạn xử lý tệp log trong chuỗi tuần tự."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Independent subtasks with zero dependencies should be executed concurrently via parallel fan-out rather than sequentially, reducing total execution time from 50s to ~5s plus aggregation overhead.",
      "Option B is incorrect: Loading all log files into a single context causes severe context window bloat and attention dilution, degrading analysis accuracy for downstream log entries.",
      "Option C is incorrect: Adding iterative loops to a sequential chain exacerbates the latency bottleneck rather than introducing concurrency.",
      "Option D is incorrect: Pre-execution cache checks do not address the fundamental serial blocking bottleneck when processing uncached independent files."
    ],
    "rationale": "When subtasks have no data dependencies or ordering constraints, decomposing them into a sequential pipeline introduces artificial latency. Transitioning to a parallel fan-out pattern allows independent subagents to evaluate log files concurrently, reducing runtime by orders of magnitude.",
    "explanation": "Lựa chọn A là đúng: Các tác vụ phụ độc lập không có sự phụ thuộc dữ liệu nên được thực thi đồng thời thông qua mô hình parallel fan-out thay vì tuần tự, giảm tổng thời gian xử lý từ 50s xuống còn khoảng 5s cộng với thời gian tổng hợp.\nLựa chọn B là sai: Nhập toàn bộ log vào một ngữ cảnh duy nhất gây phình ngữ cảnh và pha loãng sự chú ý (attention dilution).\nLựa chọn C là sai: Vòng lặp tinh chỉnh lặp lại chỉ làm tăng thêm độ trễ cho chuỗi tuần tự mà không tận dụng được tính song song.\nLựa chọn D is sai: Kiểm tra cache không giải quyết được nút thắt cổ chai thực thi tuần tự đối với các tệp mới chưa có trong cache.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  },
  {
    "id": "d1-b03-1.6-006",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-006",
    "scenarioSignature": {
      "testedPrinciple": "Optimal granularity in task decomposition",
      "failureMode": "High latency and overhead from excessive subagent spawning",
      "rootCause": "Over-decomposition of fine-grained items into micro-agents",
      "requiredFix": "Chunking subtasks into larger cohesive batches to balance concurrency and overhead"
    },
    "questionEN": "A document processing pipeline, DocTranslator-v1, decomposes a 50-sentence technical specification document by spawning 50 individual micro-agents (one agent per sentence). Execution telemetry reveals that orchestration overhead, subagent initialization, and prompt-response serialization account for 90% of the total 45-second latency. What is the most effective task decomposition adjustment to resolve this overhead?",
    "question": "[d1-b03-1.6-006] Một pipeline xử lý tài liệu, DocTranslator-v1, phân rã tài liệu đặc tả kỹ thuật 50 câu bằng cách khởi tạo 50 micro-agent riêng biệt (mỗi agent xử lý một câu). Dữ liệu đo đạc thực thi cho thấy chi phí điều phối (coordination overhead), khởi tạo subagent và tuần tự hóa prompt-response chiếm 90% tổng độ trễ 45 giây. Điều chỉnh phân rã tác vụ nào hiệu quả nhất để giải quyết chi phí bổ sung này?",
    "optionsEN": [
      "A. Increase the per-agent token generation ceiling from 256 to 4096 tokens for each sentence micro-agent.",
      "B. Re-group sentences into cohesive section-level chunks (e.g., 5-10 sentences per subagent) to optimize the balance between parallelism and coordination overhead.",
      "C. Revert to a single-threaded sequential pipeline processing sentences one by one in a loop inside a single worker agent.",
      "D. Implement an exponential backoff retry policy for the subagent coordinator's RPC call stack."
    ],
    "options": [
      "A. Tăng giới hạn token tạo ra của mỗi agent từ 256 lên 4096 token cho từng micro-agent xử lý câu.",
      "B. Nhóm lại các câu thành các khối cấp mục hợp lý (ví dụ: 5-10 câu cho mỗi subagent) để tối ưu hóa sự cân bằng giữa tính song song và chi phí điều phối.",
      "C. Trở lại pipeline tuần tự đơn luồng xử lý từng câu một trong vòng lặp bên trong một worker agent duy nhất.",
      "D. Triển khai chính sách thử lại với độ trễ tăng theo cấp số nhân (exponential backoff retry) cho tầng gọi RPC của agent điều phối."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Increasing token limits for sentence micro-agents does not reduce the IPC network latency or agent instantiation overhead.",
      "Option B is correct: Over-decomposition creates excessive coordination overhead relative to actual work. Chunking fine-grained items into logical section-level units dramatically lowers agent lifecycle overhead while preserving parallel execution benefits.",
      "Option C is incorrect: Completely eliminating parallelism forces single-threaded execution, which may unnecessarily prolong runtime compared to balanced batching.",
      "Option D is incorrect: Retry policies handle network fault tolerance but do not resolve baseline architectural overhead caused by over-decomposition."
    ],
    "rationale": "Over-decomposition occurs when tasks are broken down into granular units so small that the framework coordination overhead outweighs computation benefits. Aggregating micro-tasks into medium-sized batches restores processing efficiency while retaining parallel performance.",
    "explanation": "Lựa chọn B là đúng: Phân rã quá mức (Over-decomposition) tạo ra chi phí điều phối khổng lồ so với khối lượng công việc thực tế. Việc gom nhóm các phần tử nhỏ thành các đoạn có kích thước hợp lý (như cấp mục/đoạn văn) làm giảm chi phí vòng đời agent trong khi vẫn duy trì hiệu quả thực thi song song.\nLựa chọn A là sai: Tăng hạn ngạch token không làm giảm chi phí giao tiếp IPC hay chi phí khởi tạo agent.\nLựa chọn C là sai: Loại bỏ hoàn toàn tính song song sẽ biến hệ thống thành thực thi tuần tự đơn luồng không tối ưu.\nLựa chọn D là sai: Cơ chế retry chỉ xử lý lỗi mạng chứ không sửa được thiết kế phân rã quá mịn.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  }
]