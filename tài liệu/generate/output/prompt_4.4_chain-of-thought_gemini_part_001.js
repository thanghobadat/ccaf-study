[
  {
    "id": "d4-b08-4.4-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-001",
    "scenarioSignature": {
      "testedPrinciple": "chain of thought applicability to deterministic simple lookup tasks",
      "failureMode": "latency amplification with zero accuracy gain in production endpoint",
      "rootCause": "forcing step by step reasoning on single field keyword extraction",
      "requiredFix": "disable chain of thought prompting for direct field retrieval"
    },
    "questionEN": "In the UserProfileExtractor pipeline, gemini-2.5-flash extracts a single integer field user_id from standardized log payload headers. The team enabled zero-shot Chain-of-Thought (CoT) by adding 'Think step by step before outputting JSON' to the prompt. Benchmark telemetry indicates latency increased from 180ms to 580ms with 0% change in extraction accuracy (99.8%). What is the primary architectural cause of this outcome?",
    "question": "[d4-b08-4.4-001] Trong đường ống UserProfileExtractor, gemini-2.5-flash trích xuất một trường số nguyên duy nhất user_id từ tiêu đề log payload đã chuẩn hóa. Nhóm phát triển đã bật Chain-of-Thought (CoT) zero-shot bằng cách thêm 'Think step by step before outputting JSON' vào prompt. Đo đạc đếm từ xa cho thấy độ trễ tăng từ 180ms lên 580ms mà không có thay đổi nào về độ chính xác trích xuất (99.8%). Nguyên nhân kiến trúc chính của kết quả này là gì?",
    "optionsEN": [
      "A. CoT introduces token generation overhead without improving accuracy on simple deterministic single-field lookups.",
      "B. The model requires few-shot exemplars rather than zero-shot instructions to execute fast chain-of-thought reasoning.",
      "C. The system prompt lacks explicit budget_tokens allocation to throttle the intermediate reasoning length.",
      "D. Gemini models suppress JSON schema validation whenever step-by-step thinking tokens are generated."
    ],
    "options": [
      "A. CoT tạo ra chi phí tạo token bổ sung mà không cải thiện độ chính xác trên các tác vụ tra cứu đơn giản, xác định một trường.",
      "B. Mô hình yêu cầu các ví dụ few-shot thay vì hướng dẫn zero-shot để thực thi lý luận chuỗi tư duy nhanh.",
      "C. Prompt hệ thống thiếu phân bổ budget_tokens rõ ràng để tiết chế độ dài lý luận trung gian.",
      "D. Các mô hình Gemini bỏ qua kiểm tra cú pháp JSON schema bất cứ khi nào các token tư duy từng bước được tạo ra."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: CoT is beneficial for complex, multi-step reasoning or ambiguous tasks, but adds unnecessary latency and token cost without precision gain for simple direct lookups.",
      "Option B is incorrect: Adding few-shot exemplars would add even more prompt tokens without fixing the fundamental mismatch of using reasoning on simple lookups.",
      "Option C is incorrect: Setting budget_tokens throttles extended thinking parameters, but zero-shot text prompting of CoT on simple tasks is an inappropriate prompt design pattern.",
      "Option D is incorrect: Structured output enforcement via JSON schema operates independently of whether CoT tokens are generated."
    ],
    "rationale": "Chain-of-Thought is designed for complex reasoning, math, legal/medical evidence weighing, and multi-step logic. Applying it to trivial single-field lookups incurs substantial latency overhead without providing accuracy benefits.",
    "explanation": "Chain-of-Thought (CoT) mang lại lợi ích lớn nhất cho các tác vụ cần lý luận nhiều bước, giải quyết mâu thuẫn hoặc tính toán phức tạp. Đối với tác vụ tra cứu thông tin đơn giản một trường từ cấu trúc chuẩn hóa, mô hình không cần các bước trung gian để suy luận. Việc ép mô hình suy luận từng bước chỉ làm tăng số lượng token đầu ra, khiến độ trễ tăng (từ 180ms lên 580ms) mà không mang lại bất kỳ sự cải thiện nào về độ chính xác.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  },
  {
    "id": "d4-b08-4.4-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-002",
    "scenarioSignature": {
      "testedPrinciple": "extended thinking token budget allocation for multi factor analysis",
      "failureMode": "truncated reasoning block leading to incorrect classification output",
      "rootCause": "insufficient thinking token budget parameter setting for complex task depth",
      "requiredFix": "increase budget tokens parameter to accommodate full reasoning trajectory"
    },
    "questionEN": "The LegalComplianceAnalyzer pipeline uses gemini-2.5-flash with extended thinking enabled to evaluate 50-page commercial leases across 12 regulatory compliance clauses, returning a boolean is_compliant schema field. Developers set budget_tokens: 512 in the API configuration. In production, 42% of complex multi-clause evaluations fail with false positive compliance determinations. Log analysis shows the model's thinking block cuts off mid-sentence during clause 4 analysis right before the final answer payload. What configuration change resolves this error?",
    "question": "[d4-b08-4.4-002] Đường ống LegalComplianceAnalyzer sử dụng gemini-2.5-flash với tính năng extended thinking được bật để đánh giá các hợp đồng thuê thương mại 50 trang qua 12 điều khoản tuân thủ pháp lý, trả về trường schema boolean is_compliant. Các nhà phát triển đã cấu hình budget_tokens: 512 trong cấu hình API. Trong sản xuất, 42% các đánh giá đa điều khoản phức tạp thất bại với kết quả tuân thủ dương tính giả. Phân tích log cho thấy khối tư duy (thinking block) của mô hình bị cắt ngang giữa chừng khi đang phân tích điều khoản 4 ngay trước dữ liệu câu trả lời cuối cùng. Thay đổi cấu hình nào sẽ giải quyết lỗi này?",
    "optionsEN": [
      "A. Replace extended thinking with a zero-shot prompt directive requesting a concise one-line compliance summary.",
      "B. Increase the budget_tokens parameter to allow sufficient context length for multi-factor lease clause evaluation.",
      "C. Enable response streaming so that truncated thinking blocks automatically resume during output payload generation.",
      "D. Move the thinking block specification from system parameters into the user message JSON schema definition."
    ],
    "options": [
      "A. Thay thế extended thinking bằng chỉ thị prompt zero-shot yêu cầu tóm tắt tuân thủ ngắn gọn trong một dòng.",
      "B. Tăng tham số budget_tokens để cho phép đủ độ dài ngữ cảnh cho việc đánh giá các điều khoản hợp đồng đa yếu tố.",
      "C. Bật response streaming để các khối tư duy bị cắt ngang tự động tiếp tục trong quá trình tạo dữ liệu đầu ra.",
      "D. Di chuyển định nghĩa thinking block từ tham số hệ thống vào định nghĩa JSON schema của tin nhắn người dùng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Eliminating reasoning depth on complex legal multi-factor analysis will degrade accuracy further by removing necessary step-by-step verification.",
      "Option B is correct: Setting budget_tokens too low causes early truncation of the thinking block during complex multi-step reasoning, leading to premature and incorrect final conclusions.",
      "Option C is incorrect: Streaming streams the thinking blocks progressively but does not alter or increase the token limit enforced by budget_tokens.",
      "Option D is incorrect: Extended thinking depth is governed by API execution parameters (budget_tokens), not JSON schema properties."
    ],
    "rationale": "When complex tasks (like multi-clause legal compliance analysis) require deep step-by-step evaluation, setting budget_tokens too low truncates the reasoning trace mid-analysis. Truncated thinking blocks deprive the model of completing its verification before generating the final answer, causing incorrect conclusions equivalent to non-CoT failures.",
    "explanation": "Tính năng Extended thinking được điều khiển bởi tham số API budget_tokens. Đối với các tác vụ phân tích pháp lý phức tạp gồm nhiều yếu tố và điều khoản, mô hình cần một lượng token tư duy đủ lớn để duyệt qua toàn bộ bằng chứng. Khi budget_tokens bị đặt quá thấp (512 token), khối lý luận (thinking block) bị ngắt giữa chừng, khiến mô hình phải đưa ra kết luận cuối cùng mà chưa hoàn tất suy luận, dẫn đến sai sót. Việc tăng budget_tokens sẽ cho phép mô hình hoàn thành toàn bộ chuỗi lý luận.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  }
]