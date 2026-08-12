[
  {
    "id": "d4-b08-B-013",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-013",
    "scenarioSignature": {
      "testedPrinciple": "retrieval dataset curation in dynamic few-shot prompting",
      "failureMode": "classification errors caused by conflicting prompt examples",
      "rootCause": "unfiltered vector index retrieving legacy noisy and contradictory labels",
      "requiredFix": "clean vector database labels and apply quality filtering to retrieved prompt examples"
    },
    "questionEN": "In the SupportTicketClassifier microservice, gemini-2.5-flash uses a dynamic RAG retriever over a vector database of 10,000 historical tickets to construct few-shot prompts for the ticket_category JSON field. Production metrics reveal a 46% error rate on incoming billing queries. Debugging shows the top-5 retrieved examples frequently contain 3 contradictory edge cases where identical user phrasing was assigned opposing categories due to legacy annotation noise. What is the most effective architectural fix?",
    "question": "[d4-b08-B-013] Trong microservice SupportTicketClassifier, gemini-2.5-flash sử dụng bộ truy xuất RAG động trên cơ sở dữ liệu vector gồm 10.000 vé hỗ trợ lịch sử để dựng prompt few-shot cho trường JSON ticket_category. Các chỉ số sản xuất ghi nhận tỷ lệ lỗi 46% đối với các truy vấn thanh toán đầu vào. Quá trình kiểm lỗi cho thấy 5 ví dụ hàng đầu được truy xuất thường xuyên chứa 3 trường hợp biên mâu thuẫn, trong đó các cụm từ người dùng giống hệt nhau lại được gán cho các danh mục đối lập do nhiễu gán nhãn cũ. Đâu là giải pháp kiến trúc hiệu quả nhất?",
    "optionsEN": [
      "A. Audit and clean the vector database repository to remove contradictory annotations, and implement quality re-ranking before prompt injection.",
      "B. Increase the top-k retrieval parameter from 5 to 15 examples to override contradictory edge cases with higher example volume.",
      "C. Change the vector database index distance metric from cosine similarity to Euclidean distance to alter nearest-neighbor selection.",
      "D. Remove explicit system prompt instructions and rely solely on top-5 retrieved context examples to guide classification logic."
    ],
    "options": [
      "A. Kiểm toán và làm sạch kho cơ sở dữ liệu vector để loại bỏ các chú thích mâu thuẫn, đồng thời triển khai bước xếp hạng lại chất lượng (re-ranking) trước khi chèn vào prompt.",
      "B. Tăng tham số truy xuất top-k từ 5 lên 15 ví dụ để ghi đè các trường hợp biên mâu thuẫn bằng khối lượng ví dụ lớn hơn.",
      "C. Thay đổi thước đo khoảng cách chỉ mục vector từ cosine similarity sang Euclidean distance để thay đổi cách chọn hàng xóm gần nhất.",
      "D. Loại bỏ các hướng dẫn hệ thống rõ ràng và chỉ dựa vào 5 ví dụ truy xuất hàng đầu để định hướng logic phân loại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Cleaning legacy annotation noise in the vector database and applying quality re-ranking ensures that retrieved few-shot context contains consistent, high-quality exemplars rather than conflicting rules.",
      "Option B is incorrect: Increasing top-k from 5 to 15 adds more context tokens and latency while increasing the likelihood of including even more noisy or contradictory examples.",
      "Option C is incorrect: Changing vector distance metrics does not resolve underlying label contradictions in historical training data.",
      "Option D is incorrect: Omitting system instructions forces the model to rely entirely on flawed context examples, worsening classification ambiguity."
    ],
    "rationale": "When dynamic few-shot retrieval fetches contradictory examples from an uncurated vector database, the conflicting demonstrations confuse the LLM during in-context learning. Removing noisy legacy annotations and adding a quality re-ranking layer guarantees that only coherent, correctly labeled exemplars populate the prompt context.",
    "explanation": "Trong kỹ thuật dynamic few-shot prompting, chất lượng của ngữ cảnh được truy xuất quyết định độ chính xác của mô hình. Khi cơ sở dữ liệu vector chứa các nhãn nhiễu hoặc mâu thuẫn từ lịch sử, truy xuất k-NN thuần túy sẽ chèn các ví dụ trái ngược nhau vào prompt, làm suy giảm khả năng in-context learning của gemini-2.5-flash.\n\n- Phương án A đúng: Việc kiểm toán/làm sạch tập dữ liệu vector kết hợp với re-ranking giúp đảm bảo các ví dụ few-shot được chèn vào prompt luôn nhất quán và đạt chất lượng cao.\n- Phương án B sai: Tăng số lượng ví dụ truy xuất (top-k) từ 5 lên 15 chỉ làm tăng nhiễu ngữ cảnh, tốn thêm token và chi phí mà không giải quyết được các nhãn mâu thuẫn.\n- Phương án C sai: Thay đổi thước đo khoảng cách (cosine sang Euclidean) không xử lý được bản chất dữ liệu gán nhãn mâu thuẫn trong DB.\n- Phương án D sai: Loại bỏ system prompt khiến mô hình hoàn toàn phụ thuộc vào các ví dụ lỗi, làm tăng tỷ lệ sai sót.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-014",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-014",
    "scenarioSignature": {
      "testedPrinciple": "entity format diversity in slot-filling few-shot examples",
      "failureMode": "extraction failure on natural language city names",
      "rootCause": "few-shot prompt examples exclusively demonstrate airport code entity representations",
      "requiredFix": "update prompt examples to include diverse natural language entity variations alongside codes"
    },
    "questionEN": "In the FlightBookingParser microservice, gemini-2.5-flash extracts travel parameters into a JSON schema containing departure_city. In production, when users input natural language city names like 'New York', slot extraction fails with a 62% error rate. Prompt inspection reveals that all few-shot examples exclusively demonstrate 3-letter IATA airport codes (e.g., 'JFK', 'LAX') for departure_city. What is the correct resolution to ensure accurate entity extraction?",
    "question": "[d4-b08-B-014] Trong microservice FlightBookingParser, gemini-2.5-flash trích xuất các tham số chuyến bay vào schema JSON chứa trường departure_city. Trong môi trường sản xuất, khi người dùng nhập tên thành phố bằng ngôn ngữ tự nhiên như 'New York', việc trích xuất slot thất bại với tỷ lệ lỗi 62%. Kiểm tra prompt cho thấy toàn bộ các ví dụ few-shot chỉ trình bày mã sân bay IATA 3 ký tự (ví dụ: 'JFK', 'LAX') cho trường departure_city. Đâu là giải pháp đúng để đảm bảo trích xuất thực thể chính xác?",
    "optionsEN": [
      "A. Enforce a JSON schema regular expression pattern constraint ^[A-Z]{3}$ on the departure_city property.",
      "B. Diversify few-shot prompt examples to demonstrate both full city names (e.g., 'New York') and airport codes in the target slot.",
      "C. Raise the model temperature parameter to 0.8 to encourage flexible entity formatting during slot extraction.",
      "D. Remove the departure_city property from few-shot examples and extract it using Python regex post-processing."
    ],
    "options": [
      "A. Bắt buộc áp dụng ràng buộc mô hình regex ^[A-Z]{3}$ trong schema JSON cho thuộc tính departure_city.",
      "B. Đa dạng hóa các ví dụ few-shot trong prompt để minh họa cả tên thành phố đầy đủ (ví dụ: 'New York') và mã sân bay trong slot mục tiêu.",
      "C. Tăng tham số temperature của mô hình lên 0.8 để khuyến khích định dạng thực thể linh hoạt hơn trong quá trình trích xuất slot.",
      "D. Loại bỏ thuộc tính departure_city khỏi các ví dụ few-shot và trích xuất nó bằng bước xử lý hậu kỳ với regex trong Python."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Applying a 3-letter uppercase regex schema constraint strictly rejects valid full city names like 'New York'.",
      "Option B is correct: Providing few-shot demonstrations with diverse entity formats (both city names and airport codes) teaches the model that full city strings are valid extractions for the departure_city slot.",
      "Option C is incorrect: Increasing temperature introduces randomness and formatting drift without correcting the model's pattern bias learned from homogeneous few-shot examples.",
      "Option D is incorrect: Relying on post-processing regex fails to capture unstructured natural language variations that an LLM extracts cleanly when properly prompted."
    ],
    "rationale": "Few-shot examples bias LLM output generation toward the specific formats demonstrated. When examples only show 3-letter airport codes, the model learns that departure_city must always be formatted as an IATA code, resulting in null or failed extractions for natural language city names like 'New York'. Adding diverse examples showing both formats eliminates this structural bias.",
    "explanation": "Trong các tác vụ trích xuất thực thể (slot-filling), mô hình ngôn ngữ sẽ học theo định dạng dữ liệu (formatting pattern) được trình bày trong các ví dụ few-shot. Khi tất cả các ví dụ minh họa cho trường departure_city đều chỉ sử dụng mã sân bay 3 ký tự (IATA codes), mô hình bị định kiến rằng giá trị hợp lệ duy nhất của slot này phải là mã 3 chữ cái, dẫn đến thất bại khi gặp tên thành phố tự nhiên như 'New York'.\n\n- Phương án B đúng: Cung cấp các ví dụ few-shot đa dạng thể hiện cả tên thành phố tự nhiên ('New York') lẫn mã sân bay giúp xóa bỏ định kiến định dạng và dạy mô hình trích xuất đúng mọi dạng dữ liệu.\n- Phương án A sai: Áp ràng buộc regex 3 chữ cái viết hoa ^[A-Z]{3}$ sẽ vô hiệu hóa và từ chối toàn bộ tên thành phố hợp lệ.\n- Phương án C sai: Tăng temperature chỉ làm ngẫu nhiên hóa kết quả chứ không giải quyết được định kiến mẫu học được từ few-shot.\n- Phương án D sai: Xóa thuộc tính khỏi few-shot và dùng regex hậu kỳ không thể xử lý tốt các biến thể ngôn ngữ tự nhiên phong phú mà LLM làm rất tốt khi có prompt đúng.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]