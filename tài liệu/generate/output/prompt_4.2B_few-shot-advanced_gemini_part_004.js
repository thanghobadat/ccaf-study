[
  {
    "id": "d4-b08-B-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-007",
    "questionEN": "In the ClaimRuleProcessor microservice, gemini-2.5-flash evaluates complex healthcare claims against policy limits to populate the is_approved schema field. The system prompt instructs the model to verify policy clauses prior to deciding, but all five few-shot prompt examples display raw inputs paired directly with final JSON outputs (e.g., Input: claim details -> Output: {\"is_approved\": false}). In production evaluation across 1,000 ambiguous claims, the error rate reaches 42% because gemini-2.5-flash skips the policy verification logic and outputs immediate binary verdicts. Which prompt modification correctly resolves this failure?",
    "question": "[d4-b08-B-007] Trong microservice ClaimRuleProcessor, gemini-2.5-flash đánh giá các yêu cầu bồi thường bảo hiểm y tế phức tạp so với hạn mức hợp đồng để điền vào trường schema is_approved. System prompt chỉ dẫn mô hình kiểm tra các điều khoản hợp đồng trước khi đưa ra quyết định, nhưng cả 5 ví dụ few-shot trong prompt đều hiển thị đầu vào thô đi kèm trực tiếp với đầu ra JSON cuối cùng (ví dụ: Đầu vào: chi tiết bồi thường -> Đầu ra: {\"is_approved\": false}). Trong thử nghiệm sản xuất trên 1.000 yêu cầu bồi thường mơ hồ, tỷ lệ lỗi lên tới 42% do gemini-2.5-flash bỏ qua logic kiểm tra điều khoản và đưa ra phán quyết nhị phân ngay lập tức. Sửa đổi prompt nào giải quyết đúng thất bại này?",
    "optionsEN": [
      "A. Increase temperature parameter to 0.9 to encourage deeper exploration of policy clause paths.",
      "B. Structure the system prompt instructions as numbered markdown steps while leaving few-shot examples unchanged.",
      "C. Reformat few-shot examples to include intermediate verification reasoning blocks before emitting final JSON verdict.",
      "D. Implement a dynamic vector retriever to query similar past claims based on cosine similarity."
    ],
    "options": [
      "A. Tăng tham số temperature lên 0.9 để khuyến khích khám phá sâu hơn các nhánh điều khoản hợp đồng.",
      "B. Cấu trúc các hướng dẫn trong system prompt thành các bước đánh số dạng markdown trong khi giữ nguyên các ví dụ few-shot.",
      "C. Định dạng lại các ví dụ few-shot để bao gồm các khối lý luận kiểm tra trung gian trước khi xuất ra kết quả JSON cuối cùng.",
      "D. Triển khai truy xuất vector động để tìm kiếm các yêu cầu bồi thường tương tự trong quá khứ dựa trên độ tương đồng cosine."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Increasing temperature increases sampling randomness but does not force the model to perform multi-step verification logic when few-shot patterns demonstrate direct answer outputs.",
      "Option B is incorrect: Modifying system prompt formatting fails to override the strong structural pattern established by few-shot examples, which show direct final outputs without reasoning steps.",
      "Option C is correct: Standardizing few-shot examples to demonstrate chain-of-thought reasoning step-by-step before producing the final JSON schema forces gemini-2.5-flash to replicate the verification process, directly eliminating premature answer skips.",
      "Option D is incorrect: Dynamic retrieval selects different examples based on similarity but does not fix the underlying structural issue where examples lack intermediate reasoning steps."
    ],
    "rationale": "Large language models infer output structure directly from few-shot examples. When few-shot demonstrations provide only direct answers, the model mimics this pattern and bypasses system prompt instructions requiring internal reasoning. Incorporating explicit intermediate reasoning steps within the few-shot examples aligns model behavior with the required verification workflow.",
    "explanation": "Các mô hình ngôn ngữ lớn học mẫu cấu trúc từ các ví dụ few-shot. Khi các ví dụ few-shot chỉ đưa ra câu trả lời trực tiếp mà không có các bước suy luận trung gian (Chain-of-Thought), mô hình sẽ bắt chước mẫu này và bỏ qua chỉ dẫn trong system prompt về việc phải phân tích điều khoản. Việc định dạng lại ví dụ few-shot để thể hiện các bước lý luận từng bước trước khi xuất kết quả JSON cuối cùng ép buộc gemini-2.5-flash phải thực hiện quá trình kiểm tra logic đầy đủ.\\n\\nOption A sai: Tăng temperature chỉ làm tăng tính ngẫu nhiên của từ ngữ chứ không bắt buộc mô hình suy luận đa bước.\\nOption B sai: Thay đổi định dạng system prompt không ghi đè được khuôn mẫu đầu ra mạnh mẽ từ các ví dụ few-shot.\\nOption C đúng: Bổ sung chuỗi lý luận (CoT) vào các ví dụ few-shot giúp mô hình học cách kiểm tra logic trước khi đưa ra phán quyết.\\nOption D sai: Truy xuất động chỉ chọn các ví dụ tương tự hơn nhưng nếu các ví dụ đó vẫn thiếu bước lý luận thì lỗi vẫn tồn tại.",
    "scenarioSignature": {
      "testedPrinciple": "few-shot chain-of-thought formatting integrity",
      "failureMode": "model skips verification logic and outputs direct answer",
      "rootCause": "few-shot examples emit target payload directly without intermediate reasoning tokens",
      "requiredFix": "format few-shot examples to demonstrate step-by-step reasoning prior to final answer"
    },
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-008",
    "questionEN": "In the LogTriageWorker microservice, gemini-2.5-flash parses infrastructure log streams into structured alerts. The system prompt specifies: \"You MUST respond strictly in valid JSON format matching schema { \"severity\": string, \"category\": string}\".However, legacy few- shot prompt examples demonstrate plain text responses(e.g., Output: Severity is HIGH and Category is Network).Production monitoring reports a 35 % JSONDecodeError rate because gemini - 2.5 - flash frequently emits unstructured plain text strings.Which architectural change resolves this prompt contradiction ?",
    "question": "[d4 - b08 - B -008] Trong microservice LogTriageWorker, gemini - 2.5 - flash phân tích luồng nhật ký hạ tầng thành các cảnh báo có cấu trúc.System prompt quy định: \"You MUST respond strictly in valid JSON format matching schema {\"severity\": string, \"category\": string}\".Tuy nhiên, các ví dụ few - shot legacy trong prompt lại hiển thị phản hồi dạng văn bản thuần(ví dụ: Output: Severity is HIGH and Category is Network).Giám sát sản xuất ghi nhận tỷ lệ lỗi JSONDecodeError là 35 % do gemini - 2.5 - flash thường xuyên xuất ra chuỗi văn bản không có cấu trúc.Thay đổi kiến trúc nào giải quyết mâu thuẫn prompt này ?",
    "optionsEN": [
      "A.Upgrade the model deployment from gemini - 2.5 - flash to a larger parameter model using identical prompt templates.",
      "B.Append a reminder directive at the end of the user payload emphasizing the JSON system rule.",
      "C.Increase the number of plain text few - shot examples from 3 to 10 to stabilize label classification accuracy.",
      "D.Align all few - shot demonstration outputs to match the target JSON schema format defined in the system prompt."
    ],
    "options": [
      "A.Nâng cấp mô hình triển khai từ gemini - 2.5 - flash lên mô hình có tham số lớn hơn với nguyên template prompt cũ.",
      "B.Thêm chỉ thị nhắc lại ở cuối user payload nhấn mạnh quy tắc JSON trong system prompt.",
      "C.Tăng số lượng ví dụ few - shot dạng văn bản thuần từ 3 lên 10 để ổn định độ chính xác phân loại nhãn.",
      "D.Đồng bộ toàn bộ đầu ra trong các ví dụ few - shot trùng khớp với định dạng schema JSON mục tiêu được định nghĩa trong system prompt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Model scaling does not resolve fundamental prompt conflicts between system prompt directives and incompatible few - shot formatting.",
      "Option B is incorrect: Adding redundant instructions to the user prompt does not eliminate the structural contradiction between system directives and plain text prompt examples.",
      "Option C is incorrect: Adding more plain text examples reinforces the plain text output pattern, escalating the JSON format violation rate.",
      "Option D is correct: Updating few - shot output examples to valid JSON objects removes format ambiguity and aligns example context directly with system prompt requirements."
    ],
    "rationale": "When system prompts mandate a specific output format(JSON) but few - shot examples demonstrate a conflicting format(plain text), LLMs prioritize the concrete pattern shown in the examples.Aligning few - shot outputs to valid JSON matching the system prompt schema resolves the format conflict and guarantees downstream parsing success.",
    "explanation": "Khi system prompt yêu cầu một định dạng đầu ra cụ thể(JSON) nhưng các ví dụ few - shot lại thể hiện một định dạng xung đột(văn bản thuần), LLM thường có xu hướng bắt chước cấu trúc thực tế trong các ví dụ few - shot hơn là tuân thủ chỉ thị văn bản.Việc chỉnh sửa các ví dụ few - shot để chúng xuất ra đúng JSON phù hợp với schema trong system prompt sẽ xóa bỏ sự xung đột này và đảm bảo mô hình luôn trả về JSON hợp lệ.\\n\\nOption A sai: Nâng cấp mô hình lớn hơn không giải quyết được mâu thuẫn cấu trúc trong prompt.\\nOption B sai: Thêm câu nhắc ở cuối user prompt không triệt tiêu được xung đột giữa system prompt và ví dụ few - shot.\\nOption C sai: Tăng thêm ví dụ văn bản thuần càng làm mô hình tạo ra nhiều văn bản không phải JSON hơn.\\nOption D đúng: Đồng bộ định dạng đầu ra của các ví dụ few - shot về chuẩn JSON giúp mô hình tuân thủ tuyệt đối định dạng mong muốn.",
    "scenarioSignature": {
      "testedPrinciple": "system prompt instruction alignment with few-shot examples",
      "failureMode": "unpredictable plain text formatting and parsing errors in downstream consumer",
      "rootCause": "system prompt enforces strict JSON output while few-shot examples demonstrate plain text responses",
      "requiredFix": "align few-shot example output format with system prompt JSON directive"
    },
    "sources": [
      {
        "label": "Lesson 4.2: Few - Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]