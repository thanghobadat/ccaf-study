[
  {
    "id": "d4-b08-new-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-003",
    "scenarioSignature": {
      "testedPrinciple": "balanced target class representation in few-shot prompt examples",
      "failureMode": "skewed intent classification recall for minority category",
      "rootCause": "few-shot example class distribution imbalance biased toward overrepresented labels",
      "requiredFix": "equalize few-shot example distribution across all valid classification output classes"
    },
    "questionEN": "In the OmniSupportRouter customer service system using gemini-2.5-flash, tickets are classified into 5 categories: BILLING, TECHNICAL, ACCOUNT, GENERAL_QUERY, and ESCALATE. The system prompt contains 17 few-shot examples: 4 examples for each of the first four categories, but only 1 example for ESCALATE. Production evaluation shows that the model misclassifies 58% of urgent escalation requests into GENERAL_QUERY due to class imbalance in the prompt. How should the prompt engineering team update the prompt to restore balanced recall across all categories?",
    "question": "[d4-b08-new-003] Trong hệ thống chăm sóc khách hàng OmniSupportRouter sử dụng gemini-2.5-flash, các yêu cầu trợ giúp được phân loại vào 5 danh mục: BILLING, TECHNICAL, ACCOUNT, GENERAL_QUERY, và ESCALATE. System prompt chứa 17 ví dụ few-shot: 4 ví dụ cho mỗi danh mục trong 4 danh mục đầu, nhưng chỉ có 1 ví dụ cho ESCALATE. Đánh giá production cho thấy mô hình phân loại sai 58% các yêu cầu leo thang khẩn cấp thành GENERAL_QUERY do sự mất cân bằng lớp trong prompt. Đội ngũ prompt engineering nên cập nhật prompt như thế nào để khôi phục độ gợi nhớ (recall) cân bằng cho tất cả danh mục?",
    "optionsEN": [
      "A. Add 10 additional few-shot examples to the GENERAL_QUERY section to explicitly demonstrate non-escalation patterns.",
      "B. Reorder the existing few-shot examples so that the single ESCALATE example is placed at the top of the prompt.",
      "C. Rebalance the few-shot dataset by providing equal representation (e.g., 3-4 diverse examples) for each of the 5 categories including ESCALATE.",
      "D. Remove all few-shot examples and set the temperature parameter to 0.0 to enforce strict classification boundaries."
    ],
    "options": [
      "A. Thêm 10 ví dụ few-shot bổ sung vào phần GENERAL_QUERY để thể hiện rõ các mẫu không phải leo thang.",
      "B. Sắp xếp lại thứ tự các ví dụ few-shot hiện có để ví dụ ESCALATE duy nhất được đưa lên đầu prompt.",
      "C. Tái cân bằng bộ dữ liệu few-shot bằng cách cung cấp tỷ lệ đại diện đồng đều (ví dụ: 3-4 ví dụ đa dạng) cho mỗi danh mục trong 5 danh mục bao gồm cả ESCALATE.",
      "D. Xóa tất cả các ví dụ few-shot và thiết lập tham số temperature thành 0.0 để thực thi các ranh giới phân loại nghiêm ngặt."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because adding more examples to GENERAL_QUERY worsens the existing class imbalance, further biasing the model toward GENERAL_QUERY.",
      "Option B is incorrect because reordering existing examples without adding new ones leaves ESCALATE severely underrepresented in linguistic variance and edge cases.",
      "Option C is correct because providing balanced representation across all target classes (3-4 examples per class) establishes fair decision boundaries and restores recall for the minority ESCALATE class.",
      "Option D is incorrect because removing few-shot examples strips away structural guidance, and setting temperature to 0.0 does not fix missing class pattern knowledge."
    ],
    "rationale": "Few-shot classification prompts are sensitive to class distribution imbalance among examples. When one category has significantly fewer examples than others, the model's output prior shifts toward the overrepresented classes, degrading recall for the minority class. Balancing the example count across all target classes establishes unbiased classification boundaries.",
    "explanation": "Trong kỹ thuật few-shot prompting cho các bài toán phân loại (classification), tỷ lệ phân bổ các ví dụ giữa các lớp (class distribution) ảnh hưởng trực tiếp đến xác suất ưu tiên (prior bias) của mô hình. Khi lớp ESCALATE chỉ có 1 ví dụ trong khi các lớp khác có 4 ví dụ, mô hình Gemini có xu hướng thiên vị (bias) chọn các lớp có nhiều ví dụ hơn, dẫn đến 58% yêu cầu khẩn cấp bị phân loại nhầm thành GENERAL_QUERY.\n\n- Option A sai vì việc thêm ví dụ cho GENERAL_QUERY càng làm trầm trọng thêm tình trạng mất cân bằng lớp.\n- Option B sai vì thay đổi thứ tự không giải quyết được gốc rễ vấn đề thiếu hụt mẫu dữ liệu đa dạng cho lớp ESCALATE.\n- Option C đúng vì việc tái cân bằng số lượng ví dụ đồng đều (3-4 ví dụ cho mỗi lớp) sẽ giúp mô hình xây dựng ranh giới quyết định (decision boundary) chính xác và công bằng giữa 5 lớp.\n- Option D sai vì xóa bỏ ví dụ few-shot sẽ làm mất đi ngữ cảnh định dạng và quy tắc phân loại, còn temperature = 0.0 chỉ làm đầu ra mang tính quyết định (deterministic) chứ không bù đắp được tri thức phân loại bị thiếu.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-004",
    "questionEN": "In the ClaimIntakePipeline web service using gemini-2.5-flash, an automated module parses user incident notes into a JSON schema containing severity and claims fields. The prompt relies on 5 happy-path few-shot examples containing detailed narrative input text. When web form submissions contain an empty string \"\" or whitespace-only in the raw_user_note field, gemini-2.5-flash generates hallucinated injury details or non-JSON text, causing downstream JSON parser crashes (SyntaxError: Unexpected token). How should the prompt be updated to eliminate these production crashes?",
    "question": "[d4-b08-new-004] Trong dịch vụ web ClaimIntakePipeline sử dụng gemini-2.5-flash, một mô-đun tự động phân tích các ghi chú sự cố của người dùng thành một JSON schema chứa các trường severity và claims. Prompt dựa vào 5 ví dụ few-shot thuộc trường hợp lý tưởng (happy-path) chứa văn bản đầu vào chi tiết. Khi các mẫu đăng ký trên web gửi vào một chuỗi rỗng \"\" hoặc chỉ chứa khoảng trắng trong trường raw_user_note, gemini-2.5-flash tạo ra chi tiết chấn thương bị ảo giác hoặc văn bản không phải JSON, gây ra lỗi crash trình phân tích JSON ở phía sau (SyntaxError: Unexpected token). Prompt nên được cập nhật như thế nào để loại bỏ hoàn toàn các sự cố crash trong production?",
    "optionsEN": [
      "A. Enable response_mime_type: \"application / json\" in GenerationConfig without modifying the prompt text or few-shot examples.",
      "B. Add a system instruction stating \"Do not fail on empty inputs\" while keeping the existing happy-path few-shot examples.",
      "C. Double the number of happy-path few-shot examples in the prompt to strengthen the model's alignment on valid narrative formatting.",
      "D. Add edge-case few-shot examples explicitly showing empty input \"\" mapping to a standard default JSON schema structure."
    ],
    "options": [
      "A. Bật response_mime_type: \"application / json\" trong GenerationConfig mà không chỉnh sửa văn bản prompt hoặc các ví dụ few-shot.",
      "B. Thêm một câu hướng dẫn hệ thống chỉ định \"Do not fail on empty inputs\" trong khi vẫn giữ nguyên các ví dụ few-shot happy-path hiện có.",
      "C. Tăng gấp đôi số lượng ví dụ few-shot happy-path trong prompt để củng cố khả năng căn chỉnh của mô hình trên định dạng tự sự hợp lệ.",
      "D. Bổ sung các ví dụ few-shot thuộc trường hợp biên (edge-case) thể hiện rõ ràng đầu vào rỗng \"\" được ánh xạ sang cấu trúc JSON schema mặc định chuẩn."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because while response_mime_type forces valid JSON syntax, it does not prevent the model from hallucinating fictional data fields when presented with empty inputs.",
      "Option B is incorrect because negative text directives without concrete behavioral examples fail to teach the model what structured fallback payload to produce for empty inputs.",
      "Option C is incorrect because adding more happy-path examples reinforces the assumption that inputs are always populated and does not address empty input behavior.",
      "Option D is correct because few-shot examples must cover the full distribution of operational inputs, including null/empty edge cases, demonstrating the precise default schema mapping required."
    ],
    "rationale": "Few-shot examples define the mapping behavior across all expected input patterns. If examples only demonstrate happy-path inputs with rich narrative text, the model lacks guidance for handling empty or boundary inputs, leading to hallucination or format deviation. Adding explicit edge-case examples demonstrating empty input to default output schema mapping ensures deterministic runtime stability.",
    "explanation": "Các ví dụ few-shot đóng vai trò hướng dẫn mô hình cách xử lý trên toàn bộ dải phân phối dữ liệu đầu vào thực tế (input distribution). Khi bộ ví dụ chỉ toàn các trường hợp lý tưởng (happy-path) có văn bản chi tiết, mô hình không biết cách suy luận khi gặp chuỗi đầu vào rỗng \"\", dẫn đến việc tự bịa ra thông tin (hallucination) hoặc trả về định dạng sai làm crash JSON parser.\\n\\n- Option A sai vì response_mime_type: \"application/json\" chỉ bắt buộc đầu ra tuân thủ cú pháp JSON nhưng không ngăn được mô hình bịa ra dữ liệu giả khi đầu vào rỗng.\\n- Option B sai vì các hướng dẫn dạng văn bản chung chung không cung cấp ví dụ minh họa cụ thể cho cấu trúc fallback mà mô hình cần trả về.\\n- Option C sai vì tăng thêm các ví dụ happy-path chỉ làm mô hình học sâu hơn giả định rằng đầu vào luôn có dữ liệu, không giải quyết được edge-case chuỗi rỗng.\\n- Option D đúng vì việc bổ sung ví dụ few-shot trường hợp biên (edge-case) thể hiện rõ đầu vào rỗng \"\" được ánh xạ thành cấu trúc JSON mặc định (như {\"severity\": \"NONE\", \"claims\": []}) sẽ dạy mô hình cách xử lý nhất quán và an toàn.",
    "scenarioSignature": {
      "testedPrinciple": "edge-case and null-input coverage in few-shot prompt examples",
      "failureMode": "downstream json parsing failure on empty input string",
      "rootCause": "few-shot examples limited exclusively to happy-path populated inputs",
      "requiredFix": "add explicit edge-case few-shot examples for empty inputs mapping to default schema structure"
    },
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]