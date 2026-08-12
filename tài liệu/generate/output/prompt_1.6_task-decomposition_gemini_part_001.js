[
  {
    "id": "d1-b03-1.6-001",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-001",
    "scenarioSignature": {
      "testedPrinciple": "Multi-pass chunked analysis vs single-pass monolithic context processing",
      "failureMode": "Shallow analysis and missed risk clauses on later document pages",
      "rootCause": "Attention dilution caused by single-pass processing of lengthy multi-page documents",
      "requiredFix": "Decompose into local chunked analysis subtasks followed by global integration"
    },
    "questionEN": "A legal tech platform, ClauseGuard-v2, uses a single-pass agent to review 50-page commercial lease contracts within one context window. Telemetry shows that while risk extraction for pages 1–15 achieves 98% accuracy, analysis for pages 35–50 exhibits severe degradation, missing non-compete violations and indemnity caps. Which architectural redesign best mitigates this failure?",
    "question": "[d1-b03-1.6-001] Nền tảng công nghệ pháp lý ClauseGuard-v2 sử dụng một tác vụ xử lý đơn thẻ (single-pass agent) để xem xét hợp đồng thuê thương mại dài 50 trang trong một cửa sổ bối cảnh duy nhất. Dữ liệu đo đạc cho thấy trong khi việc trích xuất rủi ro cho các trang 1–15 đạt độ chính xác 98%, việc phân tích cho các trang 35–50 gặp sự suy giảm nghiêm trọng, bỏ sót các vi phạm điều khoản không cạnh tranh và giới hạn bồi thường. Thiết kế lại kiến trúc nào giải quyết tốt nhất thất bại này?",
    "optionsEN": [
      "A. Implement a multi-pass architecture that processes document sections via chunked local analysis subtasks before running a cross-section compliance integration pass.",
      "B. Increase the model context window size and add explicit prompt instructions demanding equal attention to all 50 pages.",
      "C. Convert the workflow into a single sequential pipeline where each page output is directly appended to the running context prompt for the next page.",
      "D. Deploy 50 parallel worker agents that independently analyze one page each and write directly to the main legal database without a coordinator review pass."
    ],
    "options": [
      "A. Triển khai kiến trúc đa thẻ (multi-pass) xử lý từng phần tài liệu qua các tác vụ con phân tích cục bộ trước khi thực hiện bước tích hợp tuân thủ giữa các phần.",
      "B. Tăng kích thước cửa sổ bối cảnh của mô hình và thêm hướng dẫn nhắc nhở rõ ràng yêu cầu chú ý bình đẳng đến tất cả 50 trang.",
      "C. Chuyển đổi quy trình làm việc thành một đường ống tuần tự đơn lẻ, nơi đầu ra của mỗi trang được nối trực tiếp vào lời nhắc bối cảnh đang chạy cho trang tiếp theo.",
      "D. Triển khai 50 tác vụ độc lập phân tích mỗi trang một cách riêng biệt và ghi trực tiếp vào cơ sở dữ liệu pháp lý chính mà không qua bước xem xét của tác vụ điều phối."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because splitting long contract analysis into local section passes prevents attention dilution across 50 pages, while the final integration pass reconciles cross-section dependencies like indemnity caps.",
      "Option B fails because expanding the context window or prompting for equal attention does not resolve underlying self-attention degradation over long sequence lengths.",
      "Option C fails because appending prior outputs into a continuous running context causes context bloat and exacerbates attention dilution on later pages.",
      "Option D fails because isolated page analyses without a coordinator integration pass miss cross-referencing clauses that span multiple pages."
    ],
    "rationale": "Processing a 50-page document in a single LLM pass suffers from attention dilution, causing degradation on later pages. A multi-pass strategy (per-item chunk analysis followed by cross-item integration) guarantees focused attention per section while maintaining global context integrity.",
    "explanation": "Lỗi giảm độ chính xác ở các trang sau của tài liệu 50 trang là biểu hiện đặc trưng của sự suy giảm chú ý (attention dilution) khi xử lý khối lượng lớn thông tin trong một cửa sổ bối cảnh đơn lẻ. Lựa chọn A giải quyết triệt để bằng cách áp dụng mẫu phân rã đa thẻ (multi-pass pattern): bước 1 phân tích từng đoạn/trang cục bộ để đảm bảo độ sâu, bước 2 tổng hợp tích hợp toàn cục. Lựa chọn B không giải quyết được hạn chế cốt lõi của cơ chế chú ý. Lựa chọn C làm gia tăng phình bối cảnh. Lựa chọn D bỏ sót sự tương tác và phụ thuộc điều khoản giữa các trang.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  },
  {
    "id": "d1-b03-1.6-002",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.6 task-decomposition / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.6-002",
    "scenarioSignature": {
      "testedPrinciple": "Parallel fan-out decomposition for bulk item processing",
      "failureMode": "Inconsistent annotation quality and output formatting errors after item 40",
      "rootCause": "Under-decomposition resulting in contextual saturation across 200 images",
      "requiredFix": "Fan out dataset into bounded parallel sub-batches with a centralized validation merger"
    },
    "questionEN": "An automated diagnostic vision pipeline, VisionAnnotate-X, processes batches of 200 medical images in a single agent context. Quality audits reveal high precision for items 1–40, but after item 40, labeling consistency drops dramatically and formatting schema violations spike. Which architectural decomposition strategy resolves this root cause?",
    "question": "[d1-b03-1.6-002] Quy trình xử lý thị giác chẩn đoán tự động VisionAnnotate-X xử lý các lô 200 hình ảnh y tế trong một bối cảnh tác vụ duy nhất. Kiểm toán chất lượng cho thấy độ chính xác cao cho các mục 1–40, nhưng sau mục 40, tính nhất quán của nhãn giảm mạnh và các lỗi vi phạm cấu trúc định dạng tăng vọt. Chiến lược phân rã kiến trúc nào giải quyết nguyên nhân gốc rễ này?",
    "optionsEN": [
      "A. Expand the batch payload size to 400 images per request while setting temperature to 0.0 to enforce deterministic output formatting.",
      "B. Fan out the dataset into parallel sub-batches of 20 images per subagent worker, followed by a centralized validation subagent to merge and verify annotations.",
      "C. Enforce a single-threaded loop where the agent processes each image and appends all prior 199 annotations into its system message context.",
      "D. Remove subagent orchestration entirely and replace the pipeline with a monolithic prompt containing 50 visual formatting examples."
    ],
    "options": [
      "A. Mở rộng kích thước gói dữ liệu lên 400 hình ảnh mỗi yêu cầu đồng thời đặt nhiệt độ (temperature) thành 0.0 để bắt buộc định dạng đầu ra nhất quán.",
      "B. Phân tán tập dữ liệu (fan-out) thành các gói nhỏ song song gồm 20 hình ảnh cho mỗi tác vụ phụ, sau đó sử dụng một tác vụ phụ xác minh trung tâm để gộp và kiểm tra nhãn.",
      "C. Bắt buộc một vòng lặp đơn luồng trong đó tác vụ xử lý từng hình ảnh và nối tất cả 199 nhãn trước đó vào bối cảnh tin nhắn hệ thống của nó.",
      "D. Loại bỏ hoàn toàn sự điều phối tác vụ phụ và thay thế đường ống bằng một lời nhắc đơn khối duy nhất chứa 50 ví dụ định dạng minh họa."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A fails because increasing batch size exacerbates context saturation, and setting temperature to 0.0 does not fix capacity limits of prompt attention.",
      "Option B is correct because fanning out 200 items into smaller sub-batches of 20 keeps each worker within its optimal attention window, while a validation merger maintains output integrity.",
      "Option C fails because accumulating historical annotations linearly bloats the prompt context, leading to faster quality degradation.",
      "Option D fails because adding 50 visual examples into a monolithic prompt consumes valuable context tokens and worsens item attention dilution."
    ],
    "rationale": "Under-decomposition (placing 200 images into one agent context) causes context saturation and quality degradation past item 40. Fanning out the workload into bounded parallel sub-batches (e.g., 20 items per worker) maintains high annotation accuracy across the entire dataset.",
    "explanation": "Việc xử lý 200 hình ảnh trong một ngữ cảnh duy nhất là lỗi thiếu phân rã (under-decomposition), dẫn đến tình trạng quá tải ngữ cảnh làm suy giảm chất lượng gán nhãn sau mục thứ 40. Lựa chọn B khắc phục triệt để bằng mô hình phân tán song song (parallel fan-out) chia nhỏ dữ liệu thành các lô 20 hình ảnh cho các tác vụ phụ, sau đó hợp nhất qua bước kiểm tra trung tâm. Lựa chọn A và D làm trầm trọng thêm tình trạng quá tải bối cảnh. Lựa chọn C tích tụ bộ nhớ làm phình bối cảnh theo thời gian.",
    "sources": [
      {
        "label": "Lesson 1.6: Task Decomposition Strategies",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-6-task-decomposition"
      }
    ]
  }
]