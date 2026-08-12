[
  {
    "id": "d4-b08-4.4-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-007",
    "scenarioSignature": {
      "testedPrinciple": "stream content block segregation",
      "failureMode": "internal reasoning exposed to end users",
      "rootCause": "frontend stream handler rendering thinking blocks alongside text blocks",
      "requiredFix": "filter streaming deltas by block type to render only text blocks"
    },
    "questionEN": "In an enterprise customer support portal built on gemini-2.5-flash with extended thinking enabled, the API integration streams responses directly to the frontend. During streaming, internal reasoning steps containing draft policy evaluations and confidential refund criteria are displayed in the customer chat window. Inspection reveals that the web app appends all incoming stream chunks directly to the UI buffer. How should the engineering team prevent raw reasoning from leaking into the user interface?",
    "question": "[d4-b08-4.4-007] Trong cổng hỗ trợ khách hàng doanh nghiệp sử dụng gemini-2.5-flash với tính năng suy luận mở rộng (extended thinking), tích hợp API phát luồng (stream) phản hồi trực tiếp tới giao diện người dùng. Trong quá trình stream, các bước suy luận nội bộ chứa đánh giá chính sách bản nháp và tiêu chí hoàn tiền bảo mật bị hiển thị công khai trên khung chat. Kiểm tra cho thấy ứng dụng web nối tất cả mảnh stream nhận được trực tiếp vào bộ đệm UI. Đội ngũ kỹ thuật nên làm gì để ngăn các khối suy luận thô bị rò rỉ lên giao diện?",
    "optionsEN": [
      "A. Add prompt instructions directing the model never to output thinking blocks when handling support queries.",
      "B. Increase the budget_tokens parameter so that all thinking operations finish before any response payload is sent.",
      "C. Update the frontend stream consumer to inspect chunk block types, routing thinking blocks to internal logs and rendering only text blocks in the UI.",
      "D. Enclose all system prompt instructions in XML tags so the model API automatically strips thinking content before streaming."
    ],
    "options": [
      "A. Thêm hướng dẫn vào prompt yêu cầu mô hình không được xuất ra các khối suy luận khi xử lý truy vấn hỗ trợ.",
      "B. Tăng tham số budget_tokens để tất cả công đoạn suy luận hoàn tất trước khi bất kỳ dữ liệu phản hồi nào được gửi đi.",
      "C. Cập nhật trình tiêu thụ luồng ở frontend để kiểm tra loại khối (block type) của từng chunk, chuyển khối thinking vào log nội bộ và chỉ hiển thị khối text lên UI.",
      "D. Bọc tất cả hướng dẫn prompt hệ thống trong thẻ XML để API của mô hình tự động loại bỏ nội dung suy luận trước khi stream."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Extended thinking mechanisms generate thinking blocks independently via API configuration; system prompt directives cannot disable API-level thinking block generation.",
      "Option B is incorrect: Adjusting budget_tokens changes the maximum token limit allocated for reasoning, but does not alter how streaming chunks are structured or emitted.",
      "Option C is correct: When extended thinking is enabled, streaming responses contain typed blocks (e.g., thinking vs text); filtering chunks by block type ensures reasoning remains internal while only text is rendered to users.",
      "Option D is incorrect: XML tags in system prompts do not override API-level response streaming structures or force automated stripping of reasoning blocks."
    ],
    "rationale": "Extended thinking model APIs output response streams with separate content block types. Client applications must inspect stream chunk metadata to segregate internal thinking blocks from user-visible text blocks.",
    "explanation": "Khi bật tính năng extended thinking, API mô hình phát ra luồng chứa nhiều loại khối nội dung khác nhau (chẳng hạn như thinking block và text block). Việc hiển thị nhầm suy luận nội bộ xảy ra do frontend xử lý tất cả các chunk như văn bản hiển thị. Giải pháp chuẩn kiến trúc là cập nhật trình nhận stream (stream consumer) để phân loại từng delta/chunk theo block type: loại bỏ hoặc ghi log các khối suy luận (thinking) và chỉ chuyển các khối văn bản (text) lên giao diện người dùng.\n\n- Lựa chọn A sai vì câu lệnh prompt không thể vô hiệu hóa cơ chế tạo khối suy luận ở cấp độ API.\n- Lựa chọn B sai vì budget_tokens chỉ điều chỉnh giới hạn dung lượng token suy luận chứ không thay đổi định dạng phát luồng.\n- Lựa chọn C đúng vì lọc chunk theo block type giải quyết đúng căn nguyên rò rỉ dữ liệu.\n- Lựa chọn D sai vì các thẻ XML trong prompt không ảnh hưởng đến cấu trúc khung stream của API.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  },
  {
    "id": "d4-b08-4.4-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-008",
    "scenarioSignature": {
      "testedPrinciple": "self-verification during chain-of-thought reasoning",
      "failureMode": "incorrect output calculations due to immediate token commitment",
      "rootCause": "absence of intermediate reasoning space for multi-step verification",
      "requiredFix": "enable chain-of-thought to allow step-by-step verification before committing to final answer"
    },
    "questionEN": "A financial audit engine processes multi-subsidiary tax compliance rules to output a structured JSON field withholding_tax_pct. Without step-by-step reasoning, the model frequently miscalculates tax rates when treaty overrides apply, outputting incorrect percentages directly in the final JSON. Which design strategy enables the model to self-verify calculation steps and correct intermediate mistakes before emitting the final value?",
    "question": "[d4-b08-4.4-008] Một công cụ kiểm toán tài chính xử lý các quy tắc tuân thủ thuế đa quốc gia để xuất ra trường JSON có cấu trúc withholding_tax_pct. Khi không có bước suy luận từng bước, mô hình thường xuyên tính sai thuế suất khi áp dụng các điều khoản miễn trừ hiệp định, xuất ra phần trăm không chính xác trực tiếp trong JSON cuối cùng. Chiến lược thiết kế nào cho phép mô hình tự kiểm tra các bước tính toán và sửa lỗi trung gian trước khi đưa ra kết quả cuối cùng?",
    "optionsEN": [
      "A. Implement client-side retry logic that re-prompts the model whenever the emitted withholding_tax_pct fails basic numeric bounds checks.",
      "B. Set model temperature to 0.0 to guarantee deterministic calculation logic across complex tax treaty hierarchy rules.",
      "C. Inject dynamic few-shot examples that show wrong tax calculations corrected inside the assistant final output string.",
      "D. Enable Chain-of-Thought reasoning to provide dedicated token space for step-by-step verification, allowing the model to detect calculation errors and output the corrected final value."
    ],
    "options": [
      "A. Triển khai logic thử lại (retry) ở phía client để prompt lại mô hình mỗi khi withholding_tax_pct vi phạm kiểm tra giới hạn số cơ bản.",
      "B. Đặt temperature của mô hình về 0.0 để đảm bảo logic tính toán mang tính xác định qua các quy tắc hiệp định thuế phức tạp.",
      "C. Chèn các ví dụ few-shot động thể hiện việc tính thuế sai được tự sửa lại ngay bên trong chuỗi đầu ra cuối cùng của assistant.",
      "D. Kích hoạt suy luận Chain-of-Thought để cung cấp không gian token riêng cho việc kiểm tra từng bước, cho phép mô hình phát hiện lỗi tính toán và xuất ra giá trị cuối cùng đã sửa đúng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Client-side retries fail to address the root cause of zero-shot calculation errors and add latency/cost without guaranteeing mathematical correctness.",
      "Option B is incorrect: Setting temperature to 0.0 enforces determinism but does not increase computational depth or prevent logic errors in multi-step reasoning.",
      "Option C is incorrect: Showing bad-then-good outputs in prompt examples confuses target response formats rather than allocating dedicated private reasoning space.",
      "Option D is correct: Enabling Chain-of-Thought allows the model to compute intermediate steps in a thinking phase, catch logic/arithmetic discrepancies, and rectify errors prior to generating the final structured JSON."
    ],
    "rationale": "Chain-of-Thought provides a scratchpad for intermediate computation and self-verification. By reasoning step-by-step before producing final tokens, models identify calculation flaws during the thinking phase, avoiding premature commitment to invalid outputs.",
    "explanation": "Khi xử lý các bài toán suy luận hoặc tính toán nhiều bước phức tạp, việc yêu cầu mô hình sinh ngay giá trị JSON cuối cùng (zero-shot structured output) dễ dẫn đến sai sót vì mô hình bị buộc phải cam kết giá trị token đầu ra trước khi hoàn tất tính toán. Việc bật Chain-of-Thought (hoặc extended thinking) cung cấp không gian token riêng để mô hình phân tích từng bước, tự đối chiếu điều khoản hiệp định thuế, phát hiện lỗi tính toán trung gian và sửa lại trước khi ghi giá trị chính xác vào trường withholding_tax_pct.\n\n- Lựa chọn A sai vì việc retry từ phía client chỉ tốn thêm chi phí/độ trễ và không giúp mô hình tính toán đúng hơn.\n- Lựa chọn B sai vì temperature=0 chỉ làm cho đầu ra mang tính xác định chứ không bổ sung năng lực suy luận nhiều bước.\n- Lựa chọn C sai vì đưa ví dụ chứa đầu ra sai vào few-shot có thể làm nhiễu định dạng phản hồi của mô hình.\n- Lựa chọn D đúng vì giải quyết trực tiếp nhu cầu tự kiểm tra (self-verification) bằng cách cấp bù không gian suy luận trước khi chốt kết quả.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  }
]