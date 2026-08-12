[
  {
    "id": "d4-b08-B-017",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-017",
    "questionEN": "In the IdentityClaimProcessor microservice, gemini-2.5-flash extracts user profile attributes into a JSON schema containing primary_email and tax_identifier (type: string | null). Downstream Pydantic validators report a 42% missing-key validation error when tax_identifier is missing in input documents. Inspection reveals that all few-shot prompt examples representing users without a tax identifier omit the tax_identifier key entirely ({\"primary_email\": \"user@example.com\"}) instead of setting \"tax_identifier\": null. How should the engineering team remediate this issue?",
    "question": "[d4-b08-B-017] Trong microservice IdentityClaimProcessor, gemini-2.5-flash trích xuất thuộc tính hồ sơ người dùng vào JSON schema có chứa primary_email và tax_identifier (kiểu: string | null). Các bộ xác thực Pydantic ở hạ nguồn báo lỗi thiếu khóa (missing-key validation error) 42% khi tax_identifier không có trong tài liệu đầu vào. Kiểm tra cho thấy tất cả các ví dụ few-shot đại diện cho người dùng không có mã số thuế đều bỏ qua hoàn toàn khóa tax_identifier ({\"primary_email\": \"user@example.com\"}) thay vì đặt \"tax_identifier\": null. Đội ngũ kỹ thuật nên khắc phục sự cố này như thế nào?",
    "optionsEN": [
      "A. Update all few-shot prompt examples representing missing data to explicitly include \"tax_identifier\": null, training the model to maintain key presence across missing values.",
      "B. Increase the top_p sampling parameter from 0.7 to 0.95 to encourage the model to generate missing keys during decoding.",
      "C. Modify the Pydantic schema definition to make tax_identifier optional while leaving the few-shot prompt examples unchanged.",
      "D. Add a generic system instruction stating \"Always output all schema keys\" while retaining few-shot examples that omit the key."
    ],
    "options": [
      "A. Cập nhật tất cả ví dụ few-shot đại diện cho dữ liệu thiếu để bao gồm rõ ràng \"tax_identifier\": null, huấn luyện mô hình duy trì sự hiện diện của khóa đối với các giá trị bị thiếu.",
      "B. Tăng tham số lấy mẫu top_p từ 0,7 lên 0,95 để khuyến khích mô hình tạo ra các khóa còn thiếu trong quá trình giải mã.",
      "C. Sửa đổi định nghĩa Pydantic schema để làm cho tax_identifier trở thành tùy chọn trong khi giữ nguyên các ví dụ few-shot.",
      "D. Thêm chỉ thị hệ thống chung \"Lưu ý luôn xuất tất cả các khóa schema\" trong khi vẫn giữ lại các ví dụ few-shot thiếu khóa."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: When few-shot examples omit keys for absent values, LLMs infer that key omission is the canonical pattern for null states. Explicitly providing \"tax_identifier\": null in prompt examples enforces schema key presence.",
      "Option B is incorrect: Adjusting top_p alters sampling randomness but cannot correct structural field omission learned from few-shot patterns.",
      "Option C is incorrect: Changing downstream validation masks the model's pattern failure rather than fixing prompt alignment, causing inconsistent data payloads across downstream consumers.",
      "Option D is incorrect: Few-shot demonstration patterns often override text instructions when conflicting, so leaving key-omitted examples will cause the model to continue omitting keys."
    ],
    "rationale": "When a JSON schema requires explicit null values for missing attributes, providing few-shot examples that omit the keys causes the LLM to learn key omission as the default missing-value pattern. Adding explicit null assignments in all prompt examples trains the model to emit missing keys with explicit null values.",
    "explanation": "Phương án A là đáp án đúng vì khi các ví dụ few-shot bỏ qua các khóa đối với các giá trị bị thiếu, LLM học được mẫu hình là bỏ qua khóa thay vì xuất giá trị null. Việc cập nhật các ví dụ few-shot để ghi rõ \"tax_identifier\": null giúp định hình hành vi của mô hình tuân thủ đúng yêu cầu cấu trúc schema.\\nPhương án B sai vì điều chỉnh top_p chỉ làm thay đổi tính ngẫu nhiên của việc lấy mẫu token chứ không sửa được lỗi cấu trúc xuất khóa đã học từ few-shot.\\nPhương án C sai vì việc nới lỏng Pydantic schema chỉ che giấu lỗi chứ không sửa nguyên nhân gốc rễ trong prompt, dẫn tới dữ liệu không đồng nhất.\\nPhương án D sai vì các mẫu hình thực hành trong few-shot ví dụ thường có trọng số ảnh hưởng mạnh hơn các câu chỉ thị văn bản chung trong system prompt khi có sự xung đột.",
    "scenarioSignature": {
      "testedPrinciple": "explicit null representation in structured few-shot prompts",
      "failureMode": "missing JSON key error in downstream validation pipeline",
      "rootCause": "few-shot prompt examples omit optional keys instead of outputting explicit null values",
      "requiredFix": "update prompt examples to include all schema keys with explicit null values when absent"
    },
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-018",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-018",
    "scenarioSignature": {
      "testedPrinciple": "completeness of output demonstrations in few-shot prompt engineering",
      "failureMode": "premature output termination and incomplete array generation",
      "rootCause": "few-shot prompt examples truncate demonstration outputs to save prompt tokens",
      "requiredFix": "replace truncated prompt examples with fully expanded complete response outputs"
    },
    "questionEN": "In the IncidentReportGen microservice, gemini-2.5-flash is configured to extract operational outages into an array field named timeline_events. Production monitoring reveals a 58% incomplete response rate where output arrays contain only 2 events despite inputs documenting 10+ log entries. Prompt analysis shows developers truncated few-shot example outputs using [..., {\"event\": \"...truncated for brevity\"}] to reduce prompt token usage. Why is the model emitting incomplete outputs, and how should it be fixed?",
    "question": "[d4-b08-B-018] Trong microservice IncidentReportGen, gemini-2.5-flash được cấu hình để trích xuất các sự cố vận hành vào một trường mảng có tên timeline_events. Giám sát sản xuất phát hiện tỷ lệ phản hồi không đầy đủ là 58%, trong đó các mảng đầu ra chỉ chứa 2 sự kiện mặc dù đầu vào ghi nhận hơn 10 nhật ký. Phân tích prompt cho thấy các nhà phát triển đã cắt ngắn các ví dụ few-shot bằng [..., {\"event\": \"...cắt ngắn để rút gọn\"}] để giảm lượng token của prompt. Tại sao mô hình lại kết xuất đầu ra không đầy đủ và nên khắc phục như thế nào?",
    "optionsEN": [
      "A. The model hit the API max_output_tokens limit; increase max_output_tokens from 2048 to 8192 in the call configuration.",
      "B. The model learned to prematurely terminate array generation from truncated few-shot examples; replace truncated examples with fully expanded complete output arrays.",
      "C. The embedding retriever selected irrelevant few-shot examples; modify vector search distance metric from cosine to dot product.",
      "D. The system prompt lacks explicit count constraints; add a dynamic rule specifying the exact number of input log entries to extract."
    ],
    "options": [
      "A. Mô hình đã vượt quá giới hạn max_output_tokens của API; hãy tăng max_output_tokens từ 2048 lên 8192 trong cấu hình cuộc gọi.",
      "B. Mô hình đã học cách kết thúc sớm việc tạo mảng từ các ví dụ few-shot bị cắt ngắn; hãy thay thế các ví dụ bị cắt ngắn bằng các mảng đầu ra hoàn chỉnh được mở rộng đầy đủ.",
      "C. Bộ truy xuất embedding đã chọn các ví dụ few-shot không liên quan; hãy thay đổi độ đo khoảng cách tìm kiếm vector từ cosine sang dot product.",
      "D. System prompt thiếu các ràng buộc số lượng rõ ràng; hãy thêm một quy tắc động chỉ định số lượng chính xác các mục nhật ký đầu vào cần trích xuất."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: The model is terminating generation naturally based on learned stop patterns from few-shot truncation, not reaching the max_output_tokens cutoff boundary.",
      "Option B is correct: Few-shot examples demonstrating truncated outputs teach the model that omitting later list items is correct syntax. Providing full, complete output examples restores complete extraction behavior.",
      "Option C is incorrect: Vector similarity distance metric tuning addresses retriever accuracy, which is irrelevant to output truncation caused by hardcoded truncated prompt examples.",
      "Option D is incorrect: Adding count directives does not override format patterns established by truncated few-shot demonstrations."
    ],
    "rationale": "When prompt engineers truncate output examples in few-shot prompts to save input tokens, the LLM learns that terminating array generation early or inserting truncation placeholders is the expected format behavior. Providing fully expanded, complete output demonstrations in few-shot examples teaches the model to exhaustively extract all items.",
    "explanation": "Phương án B là đáp án đúng vì việc sử dụng các ví dụ few-shot bị cắt ngắn (để tiết kiệm token) khiến LLM học được rằng việc dừng sớm mảng xuất ra hoặc bỏ dở danh sách là định dạng hợp lệ. Việc cung cấp đầy đủ các ví dụ đầu ra mở rộng hoàn chỉnh sẽ giúp mô hình trích xuất toàn bộ dữ liệu.\nPhương án A sai vì mô hình chủ động dừng tạo chuỗi theo mẫu đã học chứ không phải do chạm giới hạn max_output_tokens của API.\nPhương án C sai vì điều chỉnh chỉ số khoảng cách tìm kiếm vector liên quan tới bộ truy xuất RAG chứ không giải quyết được việc các ví dụ bị cắt ngắn thủ công.\nPhương án D sai vì chỉ thị số lượng trong system prompt không thể ghi đè được khuôn mẫu đầu ra bị cắt ngắn do các ví dụ few-shot minh họa.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]