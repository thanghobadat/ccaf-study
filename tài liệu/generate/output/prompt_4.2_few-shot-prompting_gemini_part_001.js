[
  {
    "id": "d4-b08-new-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-001",
    "scenarioSignature": {
      "testedPrinciple": "complete output class representation in exemplars",
      "failureMode": "ambiguous inputs forcibly assigned to binary extremes",
      "rootCause": "omission of neutral class examples in classification exemplars",
      "requiredFix": "include neutral class exemplars in few-shot prompt"
    },
    "questionEN": "An e-commerce telemetry pipeline utilizes ReviewAnalysisEngine to classify user feedback into a sentiment_label field using a few-shot prompt. The prompt includes only POSITIVE and NEGATIVE exemplar pairs. In production monitoring, ambiguous reviews such as 'The battery life is acceptable for the price point, though delivery was delayed' result in a 34% misclassification error rate because the model forces all mixed feedback into binary extremes. How should the team adjust the few-shot prompt to resolve this issue?",
    "question": "[d4-b08-new-001] Một hệ thống đo lường telemetry thương mại điện tử sử dụng ReviewAnalysisEngine để phân loại phản hồi của người dùng vào trường sentiment_label bằng cách sử dụng few-shot prompt. Prompt hiện tại chỉ chứa các cặp ví dụ mẫu POSITIVE và NEGATIVE. Trong quá trình giám sát vận hành, các đánh giá mơ hồ như 'Thời lượng pin chấp nhận được so với giá tiền, mặc dù giao hàng bị chậm' dẫn đến tỷ lệ lỗi phân loại sai 34% do mô hình ép buộc tất cả phản hồi hỗn hợp vào các cực nhị phân. Đội ngũ kỹ thuật nên điều chỉnh few-shot prompt như thế nào để khắc phục sự cố này?",
    "optionsEN": [
      "A. Add NEUTRAL exemplar pairs to the few-shot prompt that explicitly demonstrate how ambiguous or mixed feedback maps to the NEUTRAL class.",
      "B. Increase the temperature parameter to 0.7 in the API payload so the model can output continuous probability distributions.",
      "C. Add a system prompt instruction explicitly prohibiting the model from assigning the NEGATIVE label to reviews with mild complaints.",
      "D. Add 10 additional POSITIVE few-shot examples featuring minor product praise to help the model learn subtle sentiment distinctions."
    ],
    "options": [
      "A. Bổ sung các cặp ví dụ mẫu NEUTRAL vào few-shot prompt nhằm thể hiện rõ cách ánh xạ các phản hồi mơ hồ hoặc hỗn hợp sang nhãn NEUTRAL.",
      "B. Tăng tham số temperature lên 0.7 trong API payload để mô hình có thể xuất ra phân phối xác suất liên tục.",
      "C. Thêm hướng dẫn trong system prompt cấm mô hình gán nhãn NEGATIVE cho các đánh giá có phàn nàn nhẹ.",
      "D. Bổ sung 10 ví dụ few-shot POSITIVE chứa lời khen sản phẩm nhẹ nhàng để giúp mô hình học sự khác biệt tinh tế trong cảm xúc."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Few-shot prompting teaches the model the distribution of allowed target classes. Adding NEUTRAL exemplars establishes clear boundary guidance for ambiguous text.",
      "Option B is incorrect: Adjusting temperature affects output randomness but does not teach the model a missing target class schema.",
      "Option C is incorrect: Prohibiting NEGATIVE labels creates artificial bias toward POSITIVE without addressing the underlying lack of a NEUTRAL label representation.",
      "Option D is incorrect: Adding more POSITIVE examples exacerbates class imbalance and fails to define how mixed reviews should be categorized."
    ],
    "rationale": "Few-shot examples must cover the full distribution of expected target classes. Without NEUTRAL exemplars, an LLM defaults to forcing ambiguous inputs into the only demonstrated classes (POSITIVE or NEGATIVE). Providing NEUTRAL exemplars teaches the model the formatting and semantic boundaries required for mixed feedback.",
    "explanation": "Trong kỹ thuật prompt few-shot, mô hình học các nhãn phân loại hợp lệ và ranh giới quyết định thông qua các ví dụ mẫu (exemplars). Khi một nhiệm vụ phân loại có nhãn trung tính (NEUTRAL) nhưng prompt chỉ cung cấp ví dụ POSITIVE và NEGATIVE, mô hình sẽ bị cưỡng ép phân loại các đầu vào mơ hồ hoặc hỗn hợp vào hai cực nhị phân, gây ra sai số lớn.\n\n- Option A đúng: Việc bổ sung ví dụ mẫu NEUTRAL giúp mô hình thấy rõ mẫu đầu vào hỗn hợp được ánh xạ tới nhãn NEUTRAL như thế nào, giải quyết dứt điểm ranh giới phân loại.\n- Option B sai: Việc tăng temperature chỉ làm tăng tính ngẫu nhiên của từ được sinh ra chứ không cung cấp thông tin về lớp dữ liệu NEUTRAL.\n- Option C sai: Cấm gán nhãn NEGATIVE chỉ làm cho mô hình bị lệch hướng gán nhãn sang POSITIVE chứ không giúp mô hình nhận biết lớp NEUTRAL.\n- Option D sai: Thêm nhiều ví dụ POSITIVE hơn chỉ làm mất cân bằng lớp trầm trọng hơn mà không cung cấp cách xử lý cho phản hồi hỗn hợp.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-002",
    "scenarioSignature": {
      "testedPrinciple": "full class coverage across exemplar set",
      "failureMode": "complete omission of severe class predictions",
      "rootCause": "zero representative examples for target severe class",
      "requiredFix": "add target severe class exemplars to few-shot demonstrations"
    },
    "questionEN": "An automated SOC incident responder uses SecurityAlertProcessor to categorize incoming SIEM log alerts into an alert_severity schema with values CRITICAL, MODERATE, or LOW. The few-shot prompt contains 4 LOW exemplars and 4 MODERATE exemplars, but zero CRITICAL exemplars. Telemetry shows that even when critical ransomware execution patterns are fed into the prompt, the classifier outputs CRITICAL 0% of the time, downgrading them all to MODERATE. What is the root cause and correct resolution for this issue?",
    "question": "[d4-b08-new-002] Một hệ thống tự động ứng phó sự cố SOC sử dụng SecurityAlertProcessor để phân loại các cảnh báo nhật ký SIEM vào schema alert_severity với các giá trị CRITICAL, MODERATE, hoặc LOW. Few-shot prompt hiện tại chứa 4 ví dụ LOW và 4 ví dụ MODERATE, nhưng không có ví dụ CRITICAL nào. Dữ liệu đo lường telemetry cho thấy ngay cả khi các chuỗi hành vi ransomware nguy hiểm được đưa vào, bộ phân loại xuất ra CRITICAL 0% số lần và hạ cấp toàn bộ xuống MODERATE. Nguyên nhân gốc rễ và giải pháp khắc phục đúng cho vấn đề này là gì?",
    "optionsEN": [
      "A. Increase the max_tokens request parameter to 1024 so the model has enough output budget to reason through complex threats.",
      "B. The model lacks exemplar coverage for the CRITICAL class; add representative input-output exemplar pairs demonstrating CRITICAL alerts.",
      "C. Add a directive in the system prompt forcing the classifier to default to CRITICAL whenever the input alert text contains more than 500 characters.",
      "D. Reduce the prompt to a 1-shot example of a LOW alert so the model relies purely on its pre-trained zero-shot safety alignment."
    ],
    "options": [
      "A. Tăng tham số yêu cầu max_tokens lên 1024 để mô hình có đủ ngân sách đầu ra suy luận qua các mối đe dọa phức tạp.",
      "B. Mô hình thiếu độ bao phủ ví dụ cho lớp CRITICAL; hãy bổ sung các cặp ví dụ mẫu đầu vào-đầu ra đại diện thể hiện các cảnh báo CRITICAL.",
      "C. Thêm chỉ thị trong system prompt buộc bộ phân loại mặc định trả về CRITICAL bất cứ khi nào văn bản cảnh báo đầu vào dài hơn 500 ký tự.",
      "D. Rút gọn prompt thành 1 ví dụ single-shot duy nhất cho nhãn LOW để mô hình phụ thuộc hoàn toàn vào tinh chỉnh zero-shot có sẵn."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Modifying max_tokens does not address missing class exemplars in the few-shot context.",
      "Option B is correct: Each class in a multi-class classification prompt must have at least one representative exemplar; zero CRITICAL examples cause zero recall for that label.",
      "Option C is incorrect: Adding length-based heuristics creates fragile rule overrides instead of fixing the underlying exemplar distribution.",
      "Option D is incorrect: Reducing to a single LOW example eliminates MODERATE coverage as well, exacerbating overall classification failure."
    ],
    "rationale": "Every target class in a classification task must be represented by at least one exemplar in a few-shot prompt. When a class has zero exemplars, the model heavily disfavors emitting that class string due to lack of output schema formatting context and pattern matching. Adding CRITICAL exemplars restores complete class coverage.",
    "explanation": "Để mô hình LLM phân loại chính xác trong bài toán nhiều lớp (multi-class classification), tập ví dụ mẫu few-shot phải bao phủ toàn bộ các nhãn đầu ra có thể có (full distribution coverage). Nếu một lớp (như CRITICAL) hoàn toàn không có ví dụ minh họa (zero exemplars), mô hình sẽ không nhận được kích hoạt khuôn mẫu đầu ra cho nhãn đó và dẫn đến tỷ lệ dự đoán nhãn này gần như bằng 0%.\n\n- Option A sai: Tham số max_tokens giới hạn độ dài câu trả lời, không liên quan đến việc thiếu nhãn phân loại trong ví dụ mẫu.\n- Option B đúng: Bổ sung các ví dụ minh họa rõ ràng cho lớp CRITICAL giúp mô hình hiểu cấu trúc và điều kiện để kích hoạt nhãn CRITICAL.\n- Option C sai: Quy tắc cứng dựa trên số ký tự làm mất đi khả năng phân tích ngữ nghĩa của LLM và tạo ra vô số cảnh báo giả.\n- Option D sai: Giảm xuống 1 ví dụ LOW duy nhất sẽ tiếp tục làm mất ví dụ của lớp MODERATE, khiến khả năng phân loại tệ hơn.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]