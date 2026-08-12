[
  {
    "id": "d4-b08-new-023",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-23",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-023",
    "scenarioSignature": {
      "testedPrinciple": "domain distribution coverage in few-shot examples",
      "failureMode": "misclassification of cross-border legal contract clauses",
      "rootCause": "few-shot prompt examples sampled exclusively from single jurisdiction training data",
      "requiredFix": "expand prompt context with representative examples from all target legal jurisdictions"
    },
    "questionEN": "In the LexiContractParser service, gemini-2.5-flash extracts legal governing law provisions into the jurisdiction_type schema field (GOVERNING_LAW, VENUE, ARBITRATION). During a European expansion rollout, the misclassification rate on EU commercial contracts rose to 58%, misidentifying clauses referencing civil law concepts (such as 'jurisdiction of Munich courts' or 'GDPR dispute escalation') as general liability provisions. Inspection reveals that all 6 static few-shot examples in the system prompt were drawn from US Delaware/New York corporate agreements. Which prompt engineering modification will resolve the EU contract misclassifications?",
    "question": "[d4-b08-new-023] Trong dịch vụ LexiContractParser, gemini-2.5-flash được sử dụng để trích xuất các điều khoản luật điều chỉnh vào trường schema jurisdiction_type (GOVERNING_LAW, VENUE, ARBITRATION). Khi triển khai mở rộng tại châu Âu, tỷ lệ phân loại sai trên các hợp đồng thương mại EU tăng lên 58%, do mô hình nhận diện nhầm các điều khoản dẫn chiếu đến khái niệm luật dân sự (như 'thẩm quyền tòa án Munich' hoặc 'leo thang tranh chấp GDPR') thành các điều khoản trách nhiệm chung. Kiểm tra cho thấy toàn bộ 6 ví dụ few-shot cố định trong system prompt đều được trích xuất từ các hợp đồng doanh nghiệp bang Delaware/New York của Mỹ. Thay đổi prompt engineering nào sẽ giải quyết triệt để lỗi phân loại sai trên hợp đồng EU?",
    "optionsEN": [
      "A. Reorder the existing US Delaware and New York contract examples by placing complex arbitration clauses at the beginning of the prompt.",
      "B. Remove all few-shot examples from the prompt and rely solely on system prompt instructions defining EU civil law legal terms.",
      "C. Update the few-shot dataset by replacing several US contract examples with representative EU and UK contract clauses that demonstrate civil law jurisdiction syntax.",
      "D. Increase the temperature configuration from 0.0 to 0.7 to enable greater generation flexibility when processing unfamiliar European contract phrasing."
    ],
    "options": [
      "A. Thay đổi thứ tự các ví dụ hợp đồng Mỹ hiện có bằng cách đưa các điều khoản trọng tài phức tạp lên đầu prompt.",
      "B. Xóa toàn bộ các ví dụ few-shot khỏi prompt và chỉ dựa vào hướng dẫn trong system prompt để định nghĩa các thuật ngữ luật dân sự EU.",
      "C. Cập nhật tập ví dụ few-shot bằng cách thay thế một số ví dụ hợp đồng Mỹ bằng các điều khoản hợp đồng đại diện của EU và Anh nhằm minh họa cú pháp thẩm quyền luật dân sự.",
      "D. Tăng tham số temperature từ 0.0 lên 0.7 để cho phép mô hình linh hoạt hơn khi gặp các cụm từ pháp lý châu Âu lạ."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because reordering US-only examples does not provide the model with exposure to European legal phrasing or civil law court selection syntax.",
      "Option B is incorrect because replacing concrete few-shot examples with prose rules fails to demonstrate how subtle civil law contract language maps to the schema.",
      "Option C is correct because diversifying the few-shot examples to cover the full target domain distribution (including EU/UK contract terminology) enables the model to accurately classify European legal clauses.",
      "Option D is incorrect because adjusting temperature does not solve data distribution gaps in prompt context and will increase non-deterministic classification errors."
    ],
    "rationale": "The failure occurs because the few-shot prompt distribution is biased toward US common law contracts, failing to cover European civil law terminology. Replacing a portion of the US examples with representative EU/UK contract clauses aligns the prompt's example coverage with the real-world input distribution, allowing the model to accurately map EU jurisdiction clauses to the target schema.",
    "explanation": "Phân tích các phương án:\n- Phương án A sai vì việc sắp xếp lại thứ tự các ví dụ thuộc luật Mỹ không giải quyết được vấn đề thiếu hụt dữ liệu cú pháp luật dân sự EU trong ngữ cảnh prompt.\n- Phương án B sai vì việc loại bỏ ví dụ few-shot và chỉ dùng hướng dẫn bằng văn bản thường không đủ để mô hình nắm bắt được cách ánh ánh các mẫu câu pháp lý thực tế phức tạp vào schema.\n- Phương án C đúng vì nguyên tắc few-shot prompting yêu cầu ví dụ phải bao phủ toàn bộ phân phối dữ liệu đầu vào thực tế (full distribution coverage). Việc bổ sung các ví dụ đại diện từ thị trường EU/Anh giúp mô hình học được các mẫu câu luật dân sự và phân loại chính xác.\n- Phương án D sai vì tăng temperature không bổ sung được tri thức phân phối còn thiếu, đồng thời làm tăng tính ngẫu nhiên và nguy cơ gây lỗi phân loại.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]