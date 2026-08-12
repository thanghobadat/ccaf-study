[
  {
    "id": "d4-b08-B-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-001",
    "scenarioSignature": {
      "testedPrinciple": "dynamic few-shot embedding representation selection",
      "failureMode": "retrieval of identical few-shot examples for disparate inputs",
      "rootCause": "lexical TF-IDF vector similarity failing to capture semantic meaning",
      "requiredFix": "replace lexical TF-IDF retriever with dense neural embedding retriever"
    },
    "questionEN": "In the DocQueryService microservice, gemini-2.5-flash uses a dynamic few-shot retrieval pipeline to route incoming customer queries to the target_department schema field. The retriever computes cosine similarity using sparse TF-IDF vectors over a 10,000-example database. Production telemetry reveals that despite varying customer intents (such as billing disputes versus API bug reports), the pipeline retrieves the exact same 3 few-shot examples in 98% of requests, causing a 38% misclassification rate. What is the root cause and recommended architectural fix for this retrieval failure?",
    "question": "[d4-b08-B-001] Trong vi dịch vụ DocQueryService, gemini-2.5-flash sử dụng đường ống truy xuất few-shot động để định tuyến các câu hỏi của khách hàng vào trường schema target_department. Bộ truy xuất tính toán độ tương đồng cosine sử dụng các vectơ TF-IDF thưa trên cơ sở dữ liệu 10.000 ví dụ. Nhật ký vận hành cho thấy mặc dù ý định của khách hàng khác nhau (khiếu nại hóa đơn so với báo lỗi API), đường ống vẫn truy xuất cùng 3 ví dụ few-shot cố định trong 98% số yêu cầu, dẫn đến tỷ lệ phân loại sai 38%. Nguyên nhân gốc rễ và giải pháp kiến trúc được đề xuất cho sự cố truy xuất này là gì?",
    "optionsEN": [
      "A. TF-IDF sparse vector representations rely on exact lexical word overlaps rather than dense semantic embeddings, causing high-frequency domain keywords to dominate similarity scores across different inputs; migrate to a dense neural embedding model (e.g., text-embedding-004) for vector search.",
      "B. The vector database top-k parameter is set too low at k=3; increase top-k to k=15 so that the prompt context window includes a broader spectrum of examples.",
      "C. Cosine similarity cannot measure distance between vector representations; replace cosine similarity with Euclidean distance over the existing TF-IDF index.",
      "D. Few-shot example retrieval should occur after model generation; implement a post-hoc reranking filter using system prompt rules to swap examples in the output response."
    ],
    "options": [
      "A. Các biểu diễn vectơ thưa TF-IDF phụ thuộc vào sự trùng lặp từ vựng chính xác thay vì nhúng ngữ nghĩa dày đặc, khiến các từ khóa tần suất cao áp đảo điểm tương đồng trên các đầu vào khác nhau; chuyển sang mô hình nhúng thần kinh dày đặc (như text-embedding-004) cho tìm kiếm vectơ.",
      "B. Tham số top-k của cơ sở dữ liệu vectơ được đặt quá thấp ở k=3; tăng top-k lên k=15 để cửa sổ bối cảnh prompt chứa một tập hợp ví dụ rộng hơn.",
      "C. Độ tương đồng cosine không thể đo khoảng cách giữa các biểu diễn vectơ; thay thế độ tương đồng cosine bằng khoảng cách Euclidean trên chỉ mục TF-IDF hiện tại.",
      "D. Việc truy xuất ví dụ few-shot nên diễn ra sau khi mô hình tạo phản hồi; triển khai bộ lọc xếp hạng lại sau khi tạo để thay thế các ví dụ trong phản hồi đầu ra."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A correctly identifies that sparse TF-IDF vectors fail to capture semantic context and are biased by word frequency, causing retrieval collapse, which is resolved by dense neural embeddings.",
      "Option B falsely assumes increasing top-k solves sparse vector lexical collapse, which only inflates token usage without improving semantic relevance.",
      "Option C incorrectly claims cosine similarity is invalid for vector comparison; changing the distance metric does not fix sparse lexical representation limitations.",
      "Option D proposes performing few-shot retrieval after generation, which is architecturally invalid as few-shot examples must be included in the prompt context before inference."
    ],
    "rationale": "Sparse TF-IDF vectors rely on word frequencies and exact token matches, which leads to retrieval collapse when repetitive high-frequency keywords dominate similarity calculations. Dense neural embeddings capture deep semantic context, ensuring dynamic few-shot retrieval selects truly relevant examples based on meaning rather than surface word overlap.",
    "explanation": "A đúng: Vectơ thưa TF-IDF chỉ dựa trên tần suất từ vựng và sự trùng lặp từ chính xác. Khi một số từ khóa chung xuất hiện thường xuyên trong tập dữ liệu, điểm tương đồng TF-IDF bị chi phối bởi các từ này, dẫn đến việc bộ truy xuất luôn chọn cùng một nhóm ví dụ bất kể ý định ngữ nghĩa của đầu vào. Việc chuyển sang mô hình dense embedding (như text-embedding-004) giúp bắt được ngữ nghĩa sâu sắc và truy xuất các ví dụ thực sự tương đồng về mặt ý nghĩa.\nB sai: Tăng top-k chỉ làm tăng lượng token sử dụng trong prompt mà không giải quyết được vấn đề các ví dụ được chọn bị lệch về từ vựng do TF-IDF.\nC sai: Độ tương đồng cosine là thước đo tiêu chuẩn cho tìm kiếm vectơ. Việc đổi sang khoảng cách Euclidean không khắc phục được hạn chế bản chất của vectơ thưa TF-IDF.\nD sai: Few-shot prompting bắt buộc phải đưa ví dụ vào prompt trước khi gửi đến LLM để định hướng mô hình; không thể truy xuất ví dụ sau khi mô hình đã hoàn tất quá trình sinh văn bản.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-002",
    "scenarioSignature": {
      "testedPrinciple": "dynamic few-shot retrieval latency overhead vs static prompt baseline",
      "failureMode": "doubled end-to-end request latency violating SLA",
      "rootCause": "synchronous runtime embedding generation and vector database lookup delay",
      "requiredFix": "transition to static few-shot system prompt for standard traffic with conditional dynamic fallback"
    },
    "questionEN": "In the RealTimeFraudProcessor service, gemini-2.5-flash evaluates payment payloads against a risk_score JSON schema. To improve tail accuracy on rare fraud types, engineers implemented dynamic few-shot retrieval. Production telemetry shows p99 inference latency increased from 220ms to 450ms, breaching the 300ms SLA. Profiling reveals that embedding the incoming transaction payload takes 180ms via API and vector database retrieval takes 50ms before the LLM prompt can even be constructed. Which optimization strategy reduces latency below SLA while retaining standard classification performance?",
    "question": "[d4-b08-B-002] Trong dịch vụ RealTimeFraudProcessor, gemini-2.5-flash đánh giá dữ liệu thanh toán so với JSON schema risk_score. Để cải thiện độ chính xác trên các loại gian lận hiếm gặp, các kỹ sư đã triển khai truy xuất few-shot động. Đo đạc thực tế cho thấy độ trễ p99 tăng từ 220ms lên 450ms, vi phạm SLA 300ms. Phân tích chi tiết chỉ ra rằng việc tạo embedding cho dữ liệu giao dịch đầu vào mất 180ms qua API và tìm kiếm cơ sở dữ liệu vectơ mất 50ms trước khi prompt có thể được khởi tạo. Chiến lược tối ưu hóa nào giảm độ trễ xuống dưới mức SLA mà vẫn duy trì hiệu suất phân loại tiêu chuẩn?",
    "optionsEN": [
      "A. Upgrade the vector database index from HNSW to brute-force flat search to reduce the 50ms lookup time.",
      "B. Revert to a static system prompt with 4 curated representative few-shot examples for standard transactions, falling back to dynamic retrieval only when confidence scoring or rare transaction flags require it.",
      "C. Increase the LLM generation temperature parameter from 0.0 to 0.7 to accelerate token generation speed and offset the 230ms retrieval overhead.",
      "D. Compress the few-shot examples by stripping all JSON key names and structural quotes to speed up vector embedding computation."
    ],
    "options": [
      "A. Nâng cấp chỉ mục cơ sở dữ liệu vectơ từ HNSW sang tìm kiếm phẳng thô (brute-force flat) để giảm 50ms thời gian truy vấn.",
      "B. Chuyển về prompt hệ thống cố định với 4 ví dụ few-shot đại diện được chọn lọc cho các giao dịch tiêu chuẩn, chỉ kích hoạt truy xuất động khi điểm tin cậy thấp hoặc cờ giao dịch hiếm yêu cầu.",
      "C. Tăng tham số temperature của LLM từ 0.0 lên 0.7 để đẩy nhanh tốc độ sinh token nhằm bù đắp cho 230ms chi phí truy xuất.",
      "D. Nén các ví dụ few-shot bằng cách xóa tất cả tên khóa JSON và dấu ngoặc kép cấu trúc để tăng tốc độ tính toán embedding vectơ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A incorrectly proposes brute-force flat vector search, which increases lookup latency compared to graph-based HNSW indexing.",
      "Option B correctly eliminates the 230ms synchronous retrieval overhead for standard requests by using pre-baked static few-shot examples, reserving dynamic RAG retrieval for edge cases.",
      "Option C falsely claims increasing temperature speeds up model token generation, which actually degrades deterministic schema adherence without reducing retrieval time.",
      "Option D misunderstands that payload embedding latency (180ms) stems from encoding the incoming request text, not formatting of static database examples."
    ],
    "rationale": "Dynamic few-shot retrieval adds synchronous network overhead (embedding generation + vector DB search) before sending the request to the LLM. Using static few-shot prompts for high-throughput baseline traffic eliminates this retrieval latency, achieving sub-SLA performance while retaining dynamic RAG for edge cases.",
    "explanation": "A sai: Tìm kiếm phẳng thô (brute-force flat search) có độ phức tạp O(N) cao hơn nhiều so với chỉ mục đồ thị HNSW O(log N), làm tăng thêm chứ không phải giảm thời gian tìm kiếm 50ms.\nB đúng: Việc chuyển sang dùng static few-shot prompt cố định cho phần lớn giao dịch thông thường sẽ loại bỏ hoàn toàn 230ms chi phí tính embedding và tìm kiếm vectơ ở runtime, đưa tổng độ trễ trở lại mức ~220ms (đạt SLA < 300ms). Việc chỉ gọi dynamic retrieval đối với các trường hợp ngoại lệ/giao dịch hiếm giúp cân bằng tối ưu giữa hiệu năng và độ chính xác.\nC sai: Tham số temperature kiểm soát tính ngẫu nhiên của phân phối xác suất token đầu ra, không ảnh hưởng đến tốc độ tính toán hay thời gian sinh token của GPU/TPU, và tăng temperature còn gây nguy cơ vi phạm schema JSON.\nD sai: Thời gian 180ms là chi phí tạo embedding cho văn bản giao dịch mới gửi vào (payload đầu vào), không liên quan đến cách định dạng chuỗi của các ví dụ lưu trong cơ sở dữ liệu.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]