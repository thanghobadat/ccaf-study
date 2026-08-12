[
  {
    "id": "d4-b08-4.1-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-009",
    "questionEN": "A customer support automation service uses Claude 3.5 Sonnet via the Anthropic API /v1/messages. The system parameter defines a dual persona: \"You are a strict Billing Compliance Officer enforcing non- refundable terms, and an empathetic Customer Success Advocate maximizing retention.\" In automated evaluation tests on billing dispute requests, the model demonstrates a 42% decision variance—approving partial refunds for some users while rejecting identical requests for others. Which prompt engineering refactoring resolves this ambiguous behavior?",
    "question": "[d4-b08-4.1-009] Một dịch vụ tự động hóa chăm sóc khách hàng sử dụng Claude 3.5 Sonnet qua Anthropic API /v1/messages. Tham số system định nghĩa hai vai trò song song: \"Bạn là một Cán bộ Tuân thủ Thanh toán nghiêm ngặt thực thi điều khoản không hoàn tiền, đồng thời là một Chuyên viên Hỗ trợ Khách hàng tận tâm nhằm tối đa hóa tỷ lệ giữ chân.\" Trong các bài kiểm tra đánh giá tự động đối với khiếu nại thanh toán, mô hình xuất hiện độ biến động quyết định 42%—chấp nhận hoàn tiền một phần cho một số người dùng nhưng lại từ chối yêu cầu tương tự của những người khác. Cách tái cấu trúc prompt nào giải quyết triệt để hành vi mơ hồ này?",
    "optionsEN": [
      "A. Separate the system prompt into two dedicated single-role agents: a Billing Compliance Officer agent that evaluates refund eligibility, followed by a Customer Success Advocate agent that crafts the response based on the decision.",
      "B. Set the API request temperature parameter to 0.9 so the model can dynamically balance policy enforcement and empathy based on query context.",
      "C. Relocate the dual persona definition from the system parameter to the first message in the messages array under the user role.",
      "D. Append an instruction at the end of the system prompt stating: \"Maintain an equal balance between compliance rules and customer satisfaction in every decision.\""
    ],
    "options": [
      "A. Tách system prompt thành hai agent đơn vai trò riêng biệt: một agent Cán bộ Tuân thủ Thanh toán để đánh giá điều kiện hoàn tiền, sau đó đến agent Chuyên viên Hỗ trợ Khách hàng để soạn thảo câu trả lời dựa trên kết quả quyết định.",
      "B. Đặt tham số temperature của API request thành 0.9 để mô hình tự động cân bằng giữa việc tuân thủ chính sách và sự thấu hiểu dựa trên ngữ cảnh truy vấn.",
      "C. Chuyển định nghĩa vai trò kép từ tham số system sang tin nhắn đầu tiên trong mảng messages dưới vai trò user.",
      "D. Bổ sung một chỉ dẫn ở cuối system prompt: \"Hãy duy trì sự cân bằng bình đẳng giữa quy tắc tuân thủ và sự hài lòng của khách hàng trong mọi quyết định.\""
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Defining multiple conflicting roles in a single system prompt causes competing behavioral priorities and high output variance. Splitting the roles into distinct single-role agents establishes clear task boundaries and deterministic decision logic.",
      "Option B is incorrect: Increasing the temperature parameter introduces higher sampling randomness, which exacerbates output variance rather than resolving prompt ambiguity.",
      "Option C is incorrect: Moving system directives to user messages does not eliminate the internal contradiction between roles and reduces prompt authority against input injection.",
      "Option D is incorrect: Adding vague meta-instructions to balance conflicting roles fails to establish explicit evaluation criteria, leaving the model to arbitrarily choose between rules."
    ],
    "rationale": "Assigning competing roles within a single system prompt leads to ambiguous instructions and inconsistent execution. Separating logic into single-role agents ensures unambiguous rule evaluation before generating customer responses.",
    "explanation": "Khi một system prompt chứa nhiều vai trò có mục tiêu đối lập (ví dụ: vừa thực thi quy tắc nghiêm ngặt vừa tối đa hóa sự hài lòng), mô hình không có tiêu chí rõ ràng để ưu tiên vai trò nào, dẫn đến quyết định thiếu nhất quán.\\n\\n- Option A đúng: Việc phân tách các vai trò thành các agent độc lập với một vai trò duy nhất (single-role) đảm bảo tính xác định (deterministic evaluation). Agent kiểm tra điều kiện xử lý logic kinh doanh trước, sau đó pass kết quả cho agent giao tiếp để phản hồi.\\n- Option B sai: Tăng temperature chỉ làm tăng tính ngẫu nhiên trong việc lấy mẫu token, khiến độ biến động (variance) của câu trả lời còn tăng cao hơn.\\n- Option C sai: Chuyển vai trò sang user message không giải quyết được xung đột logic giữa hai vai trò và làm giảm tính ràng buộc của system prompt.\\n- Option D sai: Thêm chỉ thị mơ hồ như 'duy trì sự cân bằng' không cung cấp tiêu chí phân định rõ ràng (explicit criteria) cho mô hình khi xử lý các trường hợp biên.",
    "scenarioSignature": {
      "testedPrinciple": "single role assignment per system prompt",
      "failureMode": "high output decision variance across identical inputs",
      "rootCause": "competing role directives defined within single system prompt payload",
      "requiredFix": "segregate conflicting roles into distinct single-role agent components"
    },
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  },
  {
    "id": "d4-b08-4.1-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-010",
    "scenarioSignature": {
      "testedPrinciple": "system prompt token budget optimization",
      "failureMode": "rule non-compliance for trailing prompt instructions",
      "rootCause": "oversized system prompt payload causing context saturation and constraint attenuation",
      "requiredFix": "externalize static documentation to context retrieval and maintain focused system instructions"
    },
    "questionEN": "A security team builds an automated code review bot using the Anthropic API /v1/messages. To ensure comprehensive analysis, they include 140,000 tokens of static API documentation, coding style standards, and compliance guidelines inside the system parameter, placing core security constraints at the very bottom. During pull request reviews, the bot consistently violates security rules located at the end of the system prompt, resulting in a 0% detection rate for exposed secrets in config/database.yml. Which architectural modification resolves this system prompt failure?",
    "question": "[d4-b08-4.1-010] Một đội ngũ bảo mật xây dựng bot đánh giá mã nguồn tự động qua Anthropic API /v1/messages. Để đảm bảo phân tích toàn diện, họ đưa 140.000 token gồm tài liệu API tĩnh, chuẩn mực style code và hướng dẫn tuân thủ vào bên trong tham số system, đồng thời đặt các quy tắc bảo mật cốt lõi ở tận cuối cùng. Trong các đợt review pull request, bot liên tục vi phạm các quy tắc bảo mật nằm ở cuối system prompt, dẫn đến tỷ lệ phát hiện secret bị lộ trong config/database.yml là 0%. Sửa đổi kiến trúc nào giải quyết triệt để sự cố system prompt này?",
    "optionsEN": [
      "A. Surround the trailing security rules with <critical_rule> XML tags inside the system prompt parameter to increase transformer attention prioritization.",
      "B. Offload static style guides and documentation to external RAG retrieval or tool definitions, keeping the system parameter concise and focused on high-priority security constraints.",
      "C. Pass the 140,000-token system instruction block inside the tool_choice API parameter so the model evaluates system rules prior to analyzing code diffs.",
      "D. Increase the max_tokens parameter in the API request payload to expand the model's system prompt processing budget."
    ],
    "options": [
      "A. Bao bọc các quy tắc bảo mật ở cuối bằng các thẻ XML <critical_rule> bên trong tham số system prompt để tăng mức độ ưu tiên chú ý (attention prioritization) của mô hình.",
      "B. Chuyển tài liệu tĩnh và hướng dẫn style code sang truy vấn RAG bên ngoài hoặc định nghĩa tool, giữ cho tham số system ngắn gọn và tập trung vào các quy tắc bảo mật ưu tiên cao.",
      "C. Truyền khối chỉ thị system 140.000 token vào bên trong tham số API tool_choice để mô hình đánh giá quy tắc system trước khi phân tích diff mã nguồn.",
      "D. Tăng tham số max_tokens trong request payload API để mở rộng ngân sách xử lý system prompt của mô hình."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Adding XML tags does not overcome context degradation or token budget issues caused by an oversized system prompt.",
      "Option B is correct: Removing static reference content from the system prompt reduces context saturation and ensures critical security instructions receive full model attention without attenuation.",
      "Option C is incorrect: tool_choice is designed for function calling enforcement and cannot accommodate or parse system instruction text.",
      "Option D is incorrect: max_tokens controls response generation output length, not the input system prompt context capacity or attention distribution."
    ],
    "rationale": "Extremely large system prompts dilute attention and risk truncating or weakening instructions placed near the end of the context window. Moving static documentation to RAG or tools keeps the system prompt concise and enforces security constraints reliably.",
    "explanation": "Khi system prompt quá lớn (140.000 token), mô hình gặp phải hiện tượng suy giảm sự chú ý (attention attenuation/lost in the middle), dẫn đến việc các chỉ thị quan trọng đặt ở cuối prompt bị bỏ qua.\n\n- Option A sai: Việc thêm thẻ XML không giải quyết được vấn đề quá tải ngữ cảnh (context saturation) do độ dài token quá lớn.\n- Option B đúng: Loại bỏ các tài liệu tĩnh (style guide, API docs) khỏi system prompt và chuyển chúng sang RAG hoặc định nghĩa tool giúp thu gọn system prompt. Điều này đảm bảo các quy tắc bảo mật cốt lõi nhận được sự chú ý tối đa từ mô hình.\n- Option C sai: Tham số tool_choice được sử dụng để bắt buộc gọi hàm (function call), không dùng để chứa khối chỉ thị hướng dẫn hệ thống.\n- Option D sai: Tham số max_tokens quy định số lượng token tối đa cho đầu ra (output generation), không ảnh hưởng đến khả năng xử lý ngữ cảnh đầu vào của system prompt.",
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  }
]