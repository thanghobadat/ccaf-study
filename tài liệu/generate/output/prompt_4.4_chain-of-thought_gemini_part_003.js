[
  {
    "id": "d4-b08-4.4-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-005",
    "scenarioSignature": {
      "testedPrinciple": "chain-of-thought demonstration in few-shot exemplars",
      "failureMode": "model omits step-by-step reasoning and outputs incorrect classification",
      "rootCause": "few-shot exemplars contain only input and final output without intermediate thinking steps",
      "requiredFix": "update few-shot exemplars to explicitly demonstrate step-by-step reasoning prior to final output"
    },
    "questionEN": "In the CreditRiskProcessor microservice, gemini-2.5-flash is configured to evaluate corporate loan applications and output a structured JSON response containing the credit_risk_rating field. To guide the model, the system prompt includes five few-shot exemplars presenting complete financial applications paired directly with final risk classification JSON outputs. During evaluation on complex multi-tiered loan applications, the model exhibits a 39% classification error rate, and logs show it generates the final risk score immediately without evaluating debt-to-income or collateral ratios first. How should the engineering team modify the few-shot prompt structure to fix this failure?",
    "question": "[d4-b08-4.4-005] Trong vi dịch vụ CreditRiskProcessor, gemini-2.5-flash được cấu hình để đánh giá đơn xin vay vốn doanh nghiệp và xuất phản hồi JSON có cấu trúc chứa trường credit_risk_rating. Để hướng dẫn mô hình, system prompt bao gồm 5 ví dụ few-shot hiển thị đơn đăng ký tài chính hoàn chỉnh được ghép trực tiếp với kết quả phân loại rủi ro JSON cuối cùng. Trong quá trình đánh giá trên các đơn xin vay nhiều tầng phức tạp, mô hình gặp tỷ lệ lỗi phân loại 39%, và nhật ký cho thấy nó tạo ra điểm rủi ro cuối cùng ngay lập tức mà không đánh giá tỷ lệ nợ trên thu nhập hoặc tài sản đảm bảo trước. Đội ngũ kỹ thuật nên sửa đổi cấu trúc vài ví dụ few-shot như thế nào để khắc phục sự cố này?",
    "optionsEN": [
      "A. Modify the few-shot exemplars to explicitly include step-by-step reasoning blocks prior to the final JSON output, teaching the model the intermediate analysis pattern before decision output.",
      "B. Increase the system prompt temperature parameter to 0.9 to encourage the model to explore alternate reasoning pathways during inference.",
      "C. Wrap the target application input in <thinking> XML tags while keeping the exemplars unchanged so the model treats the user input as an active reasoning prompt.",
      "D. Add a system directive instruction setting do_not_use_examples=true to force the model to bypass the few-shot exemplars and rely solely on zero-shot reasoning."
    ],
    "options": [
      "A. Sửa đổi các ví dụ few-shot để bao gồm rõ ràng các khối suy luận từng bước trước đầu ra JSON cuối cùng, dạy mô hình mô hình phân tích trung gian trước khi ra quyết định.",
      "B. Tăng tham số temperature của system prompt lên 0.9 để khuyến khích mô hình khám phá các đường hướng suy luận thay thế trong quá trình suy luận.",
      "C. Bao bọc đầu vào ứng dụng mục tiêu trong các thẻ XML <thinking> trong khi giữ nguyên các ví dụ để mô hình xử lý đầu vào của người dùng như một prompt suy luận chủ động.",
      "D. Thêm chỉ thị hệ thống thiết lập do_not_use_examples=true để buộc mô hình bỏ qua các ví dụ few-shot và chỉ dựa vào suy luận zero-shot."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because including step-by-step intermediate reasoning inside few-shot exemplars explicitly demonstrates the chain-of-thought pattern to gemini-2.5-flash, instructing it to analyze financial metrics prior to populating credit_risk_rating.",
      "Option B is incorrect because raising temperature introduces token sampling variability without providing structural examples of step-by-step reasoning.",
      "Option C is incorrect because enclosing the user input in <thinking> tags incorrectly frames incoming payload data as thinking steps rather than providing exemplar reasoning demonstrations.",
      "Option D is incorrect because disabling or bypassing few-shot exemplars removes domain context without instantiating a structured reasoning process."
    ],
    "rationale": "Few-shot prompting with Chain-of-Thought requires showing intermediate reasoning steps inside exemplar demonstrations. When exemplars present only input-to-output mappings, the model learns to skip reasoning and emit direct predictions, degrading accuracy on complex multi-step analysis.",
    "explanation": "Lựa chọn A là đáp án đúng vì khi sử dụng Few-Shot Prompting kết hợp với Chain-of-Thought (CoT), mô hình học hỏi pattern suy luận thông qua các ví dụ minh họa. Nếu các ví dụ few-shot chỉ cung cấp đầu vào và kết quả đầu ra trực tiếp mà không trình bày các bước suy luận trung gian (step-by-step reasoning), mô hình sẽ bắt chước cấu trúc đó và bỏ qua bước suy luận, dẫn đến tỷ lệ lỗi cao khi xử lý các hồ sơ phức tạp. Thêm các khối suy luận vào ví dụ giúp gemini-2.5-flash học cách phân tích các chỉ số tài chính trước khi xuất trường credit_risk_rating.\n\nLựa chọn B sai vì việc tăng temperature lên 0.9 chỉ làm tăng tính ngẫu nhiên trong việc lấy mẫu token chứ không hướng dẫn mô hình phương pháp suy luận từng bước.\n\nLựa chọn C sai vì việc bọc dữ liệu đầu vào của người dùng trong thẻ <thinking> bị gắn nhầm nhãn dữ liệu đầu vào thành nội dung suy luận chứ không cung cấp ví dụ mẫu về quy trình suy luận.\n\nLựa chọn D sai vì việc bỏ qua các ví dụ few-shot sẽ làm mất đi bối cảnh nghiệp vụ được định hình trước mà không kích hoạt được quy trình suy luận có cấu trúc.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  },
  {
    "id": "d4-b08-4.4-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-006",
    "scenarioSignature": {
      "testedPrinciple": "token budget sizing for extended thinking",
      "failureMode": "excessive latency and token billing cost on simple classification task",
      "rootCause": "unreasonably high token budget allocated to low-complexity task",
      "requiredFix": "reduce or eliminate reasoning token budget for simple single-step tasks"
    },
    "questionEN": "In the MailFilterGateway pipeline, gemini-2.5-flash is invoked to classify incoming customer emails and output a JSON object with the boolean field is_spam. To maximize reasoning accuracy, the lead developer configured the extended thinking API parameter budget_tokens: 100000. Production telemetry shows that classification accuracy remained steady at 98%, but average endpoint response latency increased from 350ms to 14.2 seconds, and monthly token consumption costs inflated by 850%. Inspection reveals the model routinely generates thousands of internal reasoning tokens evaluating basic email greetings. Which architectural change resolves the latency and cost crisis?",
    "question": "[d4-b08-4.4-006] Trong đường ống MailFilterGateway, gemini-2.5-flash được gọi để phân loại các email đến của khách hàng và xuất một đối tượng JSON với trường boolean is_spam. Để tối đa hóa độ chính xác suy luận, lập trình viên trưởng đã cấu hình tham số API extended thinking budget_tokens: 100000. Đo đạc thực tế cho thấy độ chính xác phân loại giữ nguyên ở mức 98%, nhưng độ trễ phản hồi trung bình của endpoint tăng từ 350ms lên 14.2 giây, và chi phí tiêu thụ token hàng tháng tăng 850%. Kiểm tra cho thấy mô hình thường xuyên tạo ra hàng nghìn token suy luận nội bộ để đánh giá cả những lời chào cơ bản trong email. Thay đổi kiến trúc nào giải quyết khủng hoảng độ trễ và chi phí này?",
    "optionsEN": [
      "A. Increase the thinking_budget_multiplier parameter to 2.0 so the model completes spam detection heuristics in earlier execution passes.",
      "B. Reduce or remove the budget_tokens allocation for the email filtering pipeline to align token budget with the low complexity of binary classification.",
      "C. Update the target output JSON schema to redefine is_spam as an array of detected spam keyword strings to utilize the generated reasoning output.",
      "D. Enable response streaming with stream_thinking=true to reclassify extended thinking tokens as unbilled metadata."
    ],
    "options": [
      "A. Tăng tham số thinking_budget_multiplier lên 2.0 để mô hình hoàn thành các quy tắc phân loại spam trong các đợt thực thi sớm hơn.",
      "B. Giảm hoặc loại bỏ việc cấp phát budget_tokens cho đường ống lọc email để điều chỉnh ngân sách token phù hợp với độ phức tạp thấp của tác vụ phân loại nhị phân.",
      "C. Cập nhật JSON schema đầu ra để định nghĩa lại is_spam thành một mảng chứa các chuỗi từ khóa spam phát hiện được nhằm tận dụng đầu ra suy luận đã tạo.",
      "D. Bật streaming phản hồi với stream_thinking=true để phân loại lại các token suy luận mở rộng thành dữ liệu siêu dữ liệu không tính phí."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because increasing thinking budget multipliers further expands token generation and aggravates cost and latency.",
      "Option B is correct because binary spam classification is a low-complexity single-step task that does not require deep extended reasoning; reducing or eliminating budget_tokens eliminates unnecessary internal deliberation tokens, lowering latency and cost while preserving classification performance.",
      "Option C is incorrect because altering the schema to return keyword arrays changes contract requirements without addressing the core problem of excessive token generation.",
      "Option D is incorrect because enabling streaming alters how token chunks are delivered to clients but does not change billable token counts or reduce execution latency."
    ],
    "rationale": "Extended thinking token budgets must be proportioned to task complexity. Allocating a huge token budget (such as 100,000 tokens) to simple binary classification tasks forces the model to expend tens of thousands of tokens on trivial internal deliberation, resulting in massive latency and cost overhead without any gain in accuracy.",
    "explanation": "Lựa chọn B là đáp án đúng vì tham số budget_tokens trong extended thinking dùng để kiểm soát độ sâu suy luận của mô hình. Với các tác vụ phân loại nhị phân đơn giản như kiểm tra email spam (is_spam), mô hình không cần đến quy trình suy luận chuyên sâu nhiều bước. Việc cấp ngân sách quá lớn (budget_tokens: 100000) khiến mô hình sinh ra hàng nghìn token suy luận thừa thãi cho các phân tích đơn giản, gây ra độ trễ lớn (từ 350ms lên 14.2s) và lãng phí chi phí token nghiêm trọng. Giảm hoặc loại bỏ budget_tokens về mức tối thiểu sẽ đưa thời gian xử lý và chi phí trở lại bình thường mà không ảnh hưởng tới độ chính xác 98%.\n\nLựa chọn A sai vì việc tăng hệ số nhân ngân sách suy luận sẽ làm tăng lượng token sinh ra, khiến vấn đề độ trễ và chi phí tồi tệ hơn.\n\nLựa chọn C sai vì thay đổi schema đầu ra không giải quyết được nguyên nhân gốc rễ là việc mô hình đang tiêu tốn ngân sách suy luận vô ích.\n\nLựa chọn D sai vì việc bật streaming (stream_thinking=true) chỉ thay đổi phương thức truyền dữ liệu về client theo dạng stream chứ không làm miễn phí các token suy luận hay giảm thời gian mô hình cần để xử lý.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  }
]