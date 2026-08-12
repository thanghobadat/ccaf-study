[
  {
    "id": "d4-b08-B-011",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-011",
    "scenarioSignature": {
      "testedPrinciple": "few-shot prompt maintenance under production distribution shift",
      "failureMode": "classification error rate increase over time on production traffic",
      "rootCause": "stale few-shot examples failing to mirror shifted mobile input distribution",
      "requiredFix": "refresh few-shot examples with recent representative production samples"
    },
    "questionEN": "In the ShopNav AI user intent routing pipeline, gemini-2.5-flash categorizes user queries into the intent_category schema field. Six months ago, system prompt few-shot examples were built using desktop web traffic consisting of long, formal sentences. Following a mobile app rollout, 82% of user requests now originate from mobile devices, featuring short text, heavy abbreviations, and emojis. Production monitoring shows the extraction error rate increased from 4.2% to 31.8% over the 6-month period despite prompt guidelines remaining unchanged. What is the root technical cause and corrective action?",
    "question": "[d4-b08-B-011] Trong đường ống định tuyến ý định người dùng ShopNav AI, gemini-2.5-flash phân loại câu truy vấn của người dùng vào trường schema intent_category. Sáu tháng trước, các ví dụ few-shot trong system prompt được xây dựng dựa trên lưu lượng web desktop gồm các câu dài và trang trọng. Sau khi triển khai ứng dụng di động, 82% yêu cầu của người dùng hiện đến từ thiết bị di động, với đặc điểm là văn bản ngắn, nhiều từ viết tắt và emoji. Giám sát sản xuất cho thấy tỷ lệ lỗi phân loại đã tăng từ 4.2% lên 31.8% trong 6 tháng qua mặc dù các hướng dẫn prompt không thay đổi. Nguyên nhân kỹ thuật gốc rễ và hành động khắc phục là gì?",
    "optionsEN": [
      "A. The model temperature parameter of 0.0 is too deterministic for mobile text; increasing temperature to 0.7 enables the model to generalize across mobile abbreviations.",
      "B. The system prompt requires an explicit rule instructing the model to treat informal mobile text and emojis as zero-shot inputs.",
      "C. The few-shot prompt examples are stale and unrepresentative of current production traffic; updating the examples with recent mobile samples resolves the distribution drift.",
      "D. The total prompt token count is insufficient for mobile intent analysis; appending 10 synthetic desktop examples expands context capacity."
    ],
    "options": [
      "A. Tham số temperature 0.0 của mô hình quá định hình cho văn bản di động; tăng temperature lên 0.7 giúp mô hình tổng quát hóa tốt hơn qua các từ viết tắt di động.",
      "B. System prompt cần một quy tắc rõ ràng chỉ đạo mô hình xử lý văn bản di động không trang trọng và emoji như các đầu vào zero-shot.",
      "C. Các ví dụ few-shot trong prompt đã cũ và không còn đại diện cho lưu lượng sản xuất hiện tại; cập nhật các ví dụ bằng các mẫu di động gần đây sẽ giải quyết sự lệch phân phối.",
      "D. Tổng số lượng token trong prompt không đủ để phân tích ý định di động; bổ sung 10 ví dụ desktop tổng hợp để mở rộng dung lượng ngữ cảnh."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Raising the temperature parameter increases output randomness rather than resolving the structural mismatch between old desktop examples and current mobile user inputs.",
      "Option B is incorrect: Adding an explicit rule telling the model to process mobile inputs as zero-shot does not fix the misleading pattern signals provided by the existing static few-shot examples.",
      "Option C is correct: Static few-shot prompts suffer from drift when production data distributions shift over time; replacing 6-month-old desktop examples with representative current mobile queries aligns few-shot guidance with actual incoming data.",
      "Option D is incorrect: Appending synthetic desktop examples further skews the prompt toward outdated desktop formatting, worsening distribution mismatch while wasting token budget."
    ],
    "rationale": "Static few-shot examples must be monitored and periodically updated when production traffic patterns change. The 6-month shift from long desktop queries to short, emoji-rich mobile queries meant the prompt examples were no longer representative of production inputs. Updating the few-shot examples with recent mobile production samples eliminates the distribution drift and restores accuracy.",
    "explanation": "Lựa chọn C là đáp án đúng.\n\nTrong các ứng dụng thực tế, phân phối dữ liệu đầu vào của người dùng có thể thay đổi đáng kể theo thời gian (ví dụ: chuyển từ web desktop sang ứng dụng di động với văn bản ngắn hơn, nhiều emoji và từ viết tắt). Các ví dụ few-shot tĩnh được nhúng trong system prompt từ 6 tháng trước không còn phản ánh đúng đặc trưng của dữ liệu sản xuất hiện tại (data distribution drift). Việc cập nhật tập ví dụ few-shot bằng các mẫu thực tế gần đây từ lưu lượng di động sẽ khôi phục độ chính xác phân loại.\n\nPhân tích các lựa chọn sai:\n- Lựa chọn A sai: Tăng temperature chỉ làm tăng tính ngẫu nhiên của phản hồi chứ không khắc phục được sự lệch phân phối dữ liệu đầu vào.\n- Lựa chọn B sai: Thêm quy tắc xử lý zero-shot không giải quyết được vấn đề các ví dụ few-shot hiện tại đang cung cấp mẫu phản hình mẫu sai cho mô hình.\n- Lựa chọn D sai: Bổ sung thêm ví dụ desktop tổng hợp càng làm tăng độ lệch về phía định dạng desktop cũ, gây lãng phí token và làm trầm trọng thêm lỗi phân loại.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-012",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-012",
    "scenarioSignature": {
      "testedPrinciple": "zero-shot baseline evaluation before adding few-shot prompt overhead",
      "failureMode": "increased API token costs and latency without accuracy gain",
      "rootCause": "adding redundant few-shot examples to a task where zero-shot performance is already high",
      "requiredFix": "revert to a concise zero-shot prompt for baseline-sufficient tasks"
    },
    "questionEN": "In the FeedbackPulse customer analytics service, gemini-2.5-flash extracts review sentiment scores into the sentiment_score JSON schema field. During prompt optimization, the engineering team added 8 detailed few-shot examples to the prompt. Benchmark testing showed that classification accuracy only shifted from 97.2% to 97.4%, while input token usage increased by 850 tokens per request and end-to-end latency increased by 320 ms. What optimization strategy should the engineering team adopt based on prompt engineering principles?",
    "question": "[d4-b08-B-012] Trong dịch vụ phân tích khách hàng FeedbackPulse, gemini-2.5-flash trích xuất điểm số cảm xúc đánh giá vào trường schema JSON sentiment_score. Trong quá trình tối ưu hóa prompt, đội ngũ kỹ thuật đã thêm 8 ví dụ few-shot chi tiết vào prompt. Kiểm thử benchmark cho thấy độ chính xác phân loại chỉ thay đổi từ 97.2% lên 97.4%, trong khi mức sử dụng token đầu vào tăng thêm 850 token mỗi yêu cầu và độ trễ end-to-end tăng thêm 320 ms. Đội ngũ kỹ thuật nên áp dụng chiến lược tối ưu hóa nào dựa trên các nguyên lý prompt engineering?",
    "optionsEN": [
      "A. Implement dynamic RAG retrieval to fetch 3 few-shot examples at runtime to maintain few-shot structure while reducing prompt length.",
      "B. Re-architect the 8 few-shot examples to include explicit Chain-of-Thought reasoning steps to attempt pushing accuracy above 99%.",
      "C. Move the 8 few-shot examples from the system prompt into the user message block to accelerate model processing speed.",
      "D. Remove the few-shot examples and rely on a concise zero-shot prompt since baseline model performance already meets production requirements without token overhead."
    ],
    "options": [
      "A. Triển khai truy xuất RAG động để lấy 3 ví dụ few-shot tại thời điểm chạy nhằm duy trì cấu trúc few-shot trong khi giảm độ dài prompt.",
      "B. Cấu trúc lại 8 ví dụ few-shot để bao gồm các bước suy luận Chain-of-Thought rõ ràng nhằm cố gắng đẩy độ chính xác lên trên 99%.",
      "C. Di chuyển 8 ví dụ few-shot từ system prompt sang khối user message để tăng tốc độ xử lý của mô hình.",
      "D. Loại bỏ các ví dụ few-shot và dựa vào prompt zero-shot súc tích vì hiệu suất cơ sở của mô hình đã đáp ứng yêu cầu sản xuất mà không tốn chi phí token."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Setting up a dynamic vector retriever introduces external infrastructure overhead and vector search latency for a task that already achieves 97.2% accuracy in zero-shot mode.",
      "Option B is incorrect: Adding Chain-of-Thought reasoning to the examples would further increase input/output token usage and latency without guaranteeing any meaningful gain on an already saturated task.",
      "Option C is incorrect: Shifting examples to the user message block does not reduce token counts or latency overhead.",
      "Option D is correct: For standard tasks where modern models demonstrate high zero-shot accuracy (e.g. 97.2%), adding few-shot examples yields negligible accuracy gains while adding substantial token cost and latency. Reverting to a zero-shot prompt is the optimal engineering decision."
    ],
    "rationale": "Before adding few-shot examples, developers must evaluate the zero-shot baseline performance. When zero-shot baseline accuracy already meets business requirements (97.2%), adding few-shot examples provides minimal benefit (+0.2%) while adding substantial cost (+850 tokens) and latency (+320 ms). Removing unnecessary few-shot examples optimizes latency and API expense without sacrificing performance.",
    "explanation": "Lựa chọn D là đáp án đúng.\n\nNguyên lý cơ bản khi áp dụng Few-Shot Prompting là phải luôn đánh giá mức cơ sở Zero-Shot (Zero-shot baseline evaluation) trước. Với các tác vụ phổ biến như phân tích cảm xúc tiêu chuẩn, các mô hình ngôn ngữ lớn hiện đại đã đạt hiệu suất rất cao ngay ở chế độ Zero-Shot (trong kịch bản là 97.2%). Việc thêm 8 ví dụ few-shot chỉ giúp tăng 0.2% độ chính xác nhưng lại tiêu tốn thêm 850 token và tăng 320ms độ trễ cho mỗi yêu cầu API. Do đó, loại bỏ tập ví dụ few-shot dư thừa và quay lại prompt Zero-shot súc tích là quyết định kỹ thuật tối ưu nhất về mặt chi phí và hiệu năng.\n\nPhân tích các lựa chọn sai:\n- Lựa chọn A sai: Triển khai RAG để lấy ví dụ động làm phức tạp hóa kiến trúc và phát sinh độ trễ tìm kiếm vector không cần thiết cho một tác vụ không cần few-shot.\n- Lựa chọn B sai: Thêm Chain-of-Thought vào ví dụ làm tăng mạnh số lượng token hơn nữa mà không đảm bảo tăng độ chính xác đáng kể khi tác vụ đã tiệm cận mức bão hòa.\n- Lựa chọn C sai: Chuyển ví dụ từ system prompt sang user message không làm giảm tổng số token hay thời gian xử lý của mô hình.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]