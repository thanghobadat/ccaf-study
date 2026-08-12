[
  {
    "id": "d4-b08-B-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-003",
    "scenarioSignature": {
      "testedPrinciple": "dynamic few-shot example domain isolation",
      "failureMode": "cross-domain term transfer in clinical output field",
      "rootCause": "vector retrieval query lacks metadata domain filtering",
      "requiredFix": "apply metadata filter to restrict vector search candidates to target domain"
    },
    "questionEN": "In the MediFlowPipeline clinical processing microservice, gemini-2.5-flash extracts patient diagnosis details into the clinical_risk_tier JSON field. The team deployed a retrieval-augmented dynamic few-shot system using a shared vector store. During testing, evaluation revealed a 38% error rate with hallucinated financial terms (e.g., 'insolvency') appearing in medical summaries. Investigation shows the vector search retrieves financial risk assessment examples due to shared vocabulary overlaps. How should the engineering team prevent this cross-domain contamination in dynamic few-shot retrieval?",
    "question": "[d4-b08-B-003] Trong vi dịch vụ xử lý lâm sàng MediFlowPipeline, gemini-2.5-flash trích xuất thông tin chẩn đoán của bệnh nhân vào trường JSON clinical_risk_tier. Nhóm phát triển đã triển khai hệ thống dynamic few-shot dựa trên truy vấn vector store dùng chung. Trong quá trình kiểm thử, đánh giá cho thấy tỷ lệ lỗi 38% với các thuật ngữ tài chính bị ảo giác (ví dụ: 'insolvency') xuất hiện trong tóm tắt y tế. Điều tra cho thấy truy vấn vector đã lấy ra các ví dụ đánh giá rủi ro tài chính do trùng lặp từ vựng chung. Nhóm kỹ thuật nên làm gì để ngăn chặn sự nhiễm chéo miền (cross-domain contamination) trong truy vấn dynamic few-shot này?",
    "optionsEN": [
      "A. Increase the vector search top-k similarity threshold from k=3 to k=10 to retrieve a larger sample of mixed-domain examples for context enrichment.",
      "B. Switch the embedding model from text-embedding-3-small to an open-source model to increase cosine similarity granularity across cross-domain corpora.",
      "C. Add a metadata filter (domain == 'clinical') to the vector database query during dynamic retrieval to isolate candidate examples to the healthcare domain.",
      "D. Append a zero-shot constraint to the system prompt telling the model to ignore any financial terms present in the retrieved few-shot examples."
    ],
    "options": [
      "A. Tăng ngưỡng độ tương đồng top-k của truy vấn vector từ k=3 lên k=10 để lấy mẫu ví dụ đa miền lớn hơn nhằm làm phong phú ngữ cảnh.",
      "B. Chuyển mô hình embedding từ text-embedding-3-small sang mô hình mã nguồn mở để tăng độ chi tiết khoảng cách cosine trên tập dữ liệu đa miền.",
      "C. Thêm bộ lọc metadata (domain == 'clinical') vào truy vấn vector database khi dynamic retrieval để giới hạn các ví dụ ứng viên trong miền y tế.",
      "D. Bổ sung ràng buộc zero-shot vào system prompt yêu cầu mô hình bỏ qua mọi thuật ngữ tài chính xuất hiện trong các ví dụ few-shot được truy xuất."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because increasing top-k from 3 to 10 without domain filtering fetches even more financial examples, worsening cross-domain prompt contamination.",
      "Option B is incorrect because replacing the embedding model does not prevent retrieving vector matches from an unfiltered shared corpus when domain-specific data is not partitioned.",
      "Option C is correct because applying a metadata filter (domain == 'clinical') forces the vector search to select top-k examples strictly from the medical dataset, preventing financial term transfer.",
      "Option D is incorrect because instructing the model in the system prompt to ignore financial terms in its own few-shot context is unreliable and does not fix the root cause of retrieving irrelevant examples."
    ],
    "rationale": "Dynamic few-shot prompting relies on retrieving semantically relevant examples from a vector database. When a shared vector store contains multiple domains, lexical overlap can cause cross-domain contamination where examples from an unrelated domain (e.g., finance) are injected into the prompt. Adding metadata filtering (e.g., domain == 'clinical') ensures retrieval is restricted strictly to the relevant domain, eliminating negative transfer and domain pollution.",
    "explanation": "Phân tích các lựa chọn:\n- Lựa chọn A sai vì việc tăng top-k từ 3 lên 10 mà không lọc theo miền sẽ khiến hệ thống lấy thêm nhiều ví dụ tài chính không liên quan, làm trầm trọng thêm sự nhiễm chéo ngữ cảnh và tăng độ trễ.\n- Lựa chọn B sai vì thay đổi mô hình embedding không giải quyết được vấn đề truy vấn trên một vector DB dùng chung chưa được phân vùng dữ liệu.\n- Lựa chọn C đúng vì bổ sung bộ lọc metadata (domain == 'clinical') buộc truy vấn vector chỉ tìm kiếm và lấy ra các ví dụ trong miền y tế, ngăn chặn hoàn toàn việc chuyển giao thuật ngữ tài chính sang kết quả đầu ra.\n- Lựa chọn D sai vì việc dùng prompt yêu cầu mô hình tự bỏ qua các từ ngữ tài chính trong ví dụ few-shot là giải pháp không ổn định, không xử lý được nguyên nhân gốc rễ là dữ liệu ví dụ đầu vào bị sai lệch.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-004",
    "scenarioSignature": {
      "testedPrinciple": "few-shot structural coverage for multi-variant JSON schemas",
      "failureMode": "JSON validation failure on alternative payload structures",
      "rootCause": "few-shot examples demonstrate only single schema variant",
      "requiredFix": "provide representative few-shot examples for all valid schema variants"
    },
    "questionEN": "In the LogiRouteDispatch logistics microservice, gemini-2.5-flash parses shipping manifests into the delivery_manifest JSON schema. The target schema supports 4 valid structural variants (single_destination, multi_stop, pickup_dropoff, return_logistics). Production monitoring indicates a 42% JSON validation failure rate on non-standard shipments. Inspection reveals that all 5 few-shot prompt examples demonstrate only the single_destination schema shape. What is the most effective prompt engineering fix to ensure consistent JSON formatting across all trip types?",
    "question": "[d4-b08-B-004] Trong vi dịch vụ logistics LogiRouteDispatch, gemini-2.5-flash phân tích chứng từ vận chuyển thành schema JSON delivery_manifest. Schema mục tiêu hỗ trợ 4 dạng cấu trúc hợp lệ (single_destination, multi_stop, pickup_dropoff, return_logistics). Hệ thống giám sát production ghi nhận tỷ lệ lỗi xác thực JSON là 42% đối với các chuyến hàng không tiêu chuẩn. Kiểm tra cho thấy cả 5 ví dụ few-shot trong prompt chỉ minh họa một cấu trúc duy nhất là single_destination. Giải pháp prompt engineering nào hiệu quả nhất để đảm bảo định dạng JSON nhất quán trên tất cả các loại chuyến hàng?",
    "optionsEN": [
      "A. Add a JSON schema validation retry loop in the client code to automatically re-prompt the LLM up to 3 times on schema mismatch errors.",
      "B. Replace the multi-variant JSON schema with a single flattened JSON object containing null values for unused fields across all trip types.",
      "C. Increase the temperature parameter from 0.0 to 0.7 to encourage the model to generate non-standard nested JSON structures.",
      "D. Include distinct, complete few-shot examples illustrating every valid schema variant (single_destination, multi_stop, pickup_dropoff, return_logistics) in the prompt."
    ],
    "options": [
      "A. Thêm vòng lặp thử lại (retry loop) xác thực JSON schema trong mã client để tự động gửi lại prompt cho LLM tối đa 3 lần khi gặp lỗi không khớp schema.",
      "B. Thay thế JSON schema đa biến bằng một đối tượng JSON phẳng duy nhất chứa các giá trị null cho những trường không sử dụng trên tất cả các loại chuyến hàng.",
      "C. Tăng tham số temperature từ 0.0 lên 0.7 để khuyến khích mô hình tạo ra các cấu trúc JSON lồng nhau không tiêu chuẩn.",
      "D. Đưa vào các ví dụ few-shot hoàn chỉnh, riêng biệt minh họa cho từng dạng schema hợp lệ (single_destination, multi_stop, pickup_dropoff, return_logistics) trong prompt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because client-side retry loops waste API calls and execution latency without teaching the model the syntax for unrepresented schema variants.",
      "Option B is incorrect because altering API schemas to a monolithic flattened structure introduces sparse null fields and breaks downstream microservice contract specifications.",
      "Option C is incorrect because raising sampling temperature increases output entropy and syntax errors, rather than resolving structural schema misalignment.",
      "Option D is correct because providing complete few-shot examples for all 4 schema variants explicitly demonstrates the expected JSON key hierarchies and array structures for each valid variant."
    ],
    "rationale": "When generating structured JSON output with multiple valid schema variants, few-shot examples must represent every structural variation the model is expected to output. Providing examples of only one schema shape causes the model to overfit to that single layout and fail when attempting to structure data for other variants. Including representative examples for all schema variants enables the model to accurately recognize input patterns and map them to the correct target JSON structure.",
    "explanation": "Phân tích các lựa chọn:\n- Lựa chọn A sai vì cơ chế thử lại (retry loop) ở phía client làm tốn chi phí API và tăng độ trễ mà không cung cấp mẫu cú pháp cho các dạng schema chưa được minh họa.\n- Lựa chọn B sai vì việc ép phẳng schema (flattening) làm thay đổi hợp đồng API downstream và tạo ra cấu trúc dữ liệu cồng kềnh chứa nhiều trường null không cần thiết.\n- Lựa chọn C sai vì tăng tham số temperature chỉ làm tăng tính ngẫu nhiên của đầu ra, dẫn đến nhiều lỗi cú pháp JSON hơn chứ không giúp mô hình hiểu đúng cấu trúc.\n- Lựa chọn D đúng vì việc cung cấp đầy đủ các ví dụ few-shot minh họa cho cả 4 dạng schema (single_destination, multi_stop, pickup_dropoff, return_logistics) giúp mô hình nắm được cấu trúc phím và mảng tương ứng với từng ngữ cảnh cụ thể.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]