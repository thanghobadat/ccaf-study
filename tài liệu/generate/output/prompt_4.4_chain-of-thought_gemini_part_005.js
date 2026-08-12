[
  {
    "id": "d4-b08-4.4-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-009",
    "scenarioSignature": {
      "testedPrinciple": "selective chain-of-thought application based on task complexity",
      "failureMode": "excessive latency and token cost from unnecessary reasoning blocks",
      "rootCause": "uniform extended thinking applied to both simple lookups and complex multi-step reasoning",
      "requiredFix": "isolate reasoning-heavy subtasks to use extended thinking while executing simple retrieval and formatting zero-shot"
    },
    "questionEN": "The ClaimProcessingPipeline executes a five-step automated workflow using gemini-2.5-flash: (1) Policy ID lookup, (2) Date reformatting to ISO-8601, (3) Multi-clause coverage eligibility determination, (4) Tiered deductible payout calculation, and (5) Fraud risk anomaly assessment. The team currently applies extended thinking uniformly (thinking_config: { thinking_budget: 2048 }) across all workflow steps. Monitoring reveals that pipeline P99 latency increased by 380% because non-reasoning steps generate unnecessary reasoning tokens. How should the engineering team restructure the pipeline to optimize both accuracy and latency?",
    "question": "[d4-b08-4.4-009] Quy trình ClaimProcessingPipeline thực hiện luồng công việc tự động gồm 5 bước sử dụng gemini-2.5-flash: (1) Tra cứu Policy ID, (2) Định dạng lại ngày theo ISO-8601, (3) Xác định điều khoản hợp lệ của hợp đồng đa điều khoản, (4) Tính toán khấu trừ và số tiền bồi thường phân tầng, và (5) Đánh giá rủi ro gian lận. Nhóm hiện áp dụng suy luận mở rộng đồng nhất (thinking_config: { thinking_budget: 2048 }) trên tất cả các bước. Giám sát cho thấy độ trễ P99 tăng 380% do các bước không cần suy luận vẫn tạo ra các token suy luận không cần thiết. Nhóm kỹ thuật nên tái cấu trúc quy trình như thế nào để tối ưu hóa cả độ chính xác lẫn độ trễ?",
    "optionsEN": [
      "A. Enable extended thinking via thinking_config exclusively on the coverage eligibility, payout calculation, and fraud risk subtasks, while calling Gemini without extended thinking for policy ID lookup and date reformatting.",
      "B. Increase thinking_budget to 8192 uniformly across all five subtasks to ensure structural schema compliance across simple lookups and complex reasoning steps.",
      "C. Disable thinking_config across all subtasks and rely solely on static JSON schema constraints to enforce deterministic formatting and logical deductions.",
      "D. Apply extended thinking only to the policy ID lookup and date reformatting subtasks to pre-validate input data before executing zero-shot reasoning on the remaining three tasks."
    ],
    "options": [
      "A. Bật suy luận mở rộng qua thinking_config duy nhất cho các tác vụ phụ về xác định hợp lệ, tính toán bồi thường và rủi ro gian lận, đồng thời gọi Gemini không dùng suy luận mở rộng cho tra cứu Policy ID và định dạng ngày.",
      "B. Tăng thinking_budget lên 8192 đồng nhất cho cả 5 tác vụ phụ để đảm bảo tuân thủ schema cấu trúc giữa tra cứu đơn giản và các bước suy luận phức tạp.",
      "C. Tắt thinking_config trên toàn bộ các tác vụ phụ và chỉ dựa vào ràng buộc JSON schema tĩnh để thực thi định dạng định hình và suy luận logic.",
      "D. Chỉ áp dụng suy luận mở rộng cho tác vụ tra cứu Policy ID và định dạng ngày để xác thực dữ liệu đầu vào trước khi chạy suy luận zero-shot cho 3 tác vụ còn lại."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Chain-of-Thought (CoT) and extended thinking provide major accuracy improvements for complex multi-step reasoning, mathematical calculations, and ambiguous classifications (subtasks 3, 4, 5). However, simple lookups and formatting transformations (subtasks 1, 2) do not benefit from CoT and incur unnecessary latency and token costs when reasoning blocks are enabled. Selectively applying CoT yields optimal speed and precision.",
      "Option B is incorrect: Increasing thinking_budget across simple tasks compounds token waste and latency without improving accuracy for deterministic lookups and format conversions.",
      "Option C is incorrect: Disabling extended thinking on multi-step logic (coverage, payouts, fraud) degrades model accuracy and increases hallucination on complex analytical tasks.",
      "Option D is incorrect: Applying thinking blocks to simple retrieval while executing zero-shot on complex reasoning tasks is the exact inverse of effective prompt architecture."
    ],
    "rationale": "Chain-of-Thought (CoT) and extended thinking should be applied selectively based on subtask complexity. Multi-step logic, math, and compliance evaluations require step-by-step reasoning tokens to prevent hallucinations, while single-step lookups and formatting should execute zero-shot to avoid unnecessary latency and token consumption.",
    "explanation": "Phương án A đúng vì Suy luận mở rộng (Extended Thinking / CoT) mang lại lợi ích vượt trội về độ chính xác cho các tác vụ đòi hỏi suy luận nhiều bước, tính toán toán học và phân tích điều khoản (bước 3, 4, 5). Tuy nhiên, với các tác vụ đơn giản như tra cứu thông tin hoặc định dạng chuỗi (bước 1, 2), mô hình không cần các bước suy luận trung gian. Áp dụng suy luận mở rộng một cách có chọn lọc (selective CoT) giúp loại bỏ độ trễ thừa ở các bước đơn giản mà vẫn đảm bảo độ chính xác cho các bước phức tạp.\n\nPhương án B sai vì việc tăng thinking_budget cho các bước đơn giản chỉ làm tăng thêm chi phí token và độ trễ P99 mà không đem lại cải thiện nào về mặt chính xác.\n\nPhương án C sai vì tắt suy luận mở rộng ở các bước tính toán và đánh giá rủi ro sẽ khiến mô hình dễ gặp lỗi suy luận hoặc ảo giác (hallucination).\n\nPhương án D sai vì đây là chiến lược ngược hoàn toàn với nguyên lý tối ưu hóa CoT.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  },
  {
    "id": "d4-b08-4.4-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.4 chain-of-thought / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.4-010",
    "scenarioSignature": {
      "testedPrinciple": "thinking token budget calibration for extended thinking",
      "failureMode": "tradeoff between reasoning truncation at low budgets and latency cost inflation at high budgets",
      "rootCause": "misconfigured thinking budget parameter failing to align with actual task reasoning token requirements",
      "requiredFix": "calibrate thinking budget parameter to optimal ceiling matching task complexity without over-provisioning"
    },
    "questionEN": "The ContractAnalysisService evaluates multi-page vendor agreements to produce an audit_finding_matrix JSON payload using gemini-2.5-flash. Benchmark testing with thinking_config.thinking_budget at 1,024, 8,192, and 32,768 tokens yields the following results:\n- At 1,024 tokens: Reasoning truncates mid-sentence before analyzing liability clauses, causing a 42% accuracy drop.\n- At 8,192 tokens: Achieves 98% extraction accuracy with complete reasoning using ~4,500 thinking tokens.\n- At 32,768 tokens: Maintains identical 98% accuracy, but P99 latency increases by 310% and token costs quadruple due to allocation overhead.\nWhich calibration strategy should the team implement for production?",
    "question": "[d4-b08-4.4-010] Service ContractAnalysisService đánh giá các hợp đồng nhà cung cấp nhiều trang để tạo ra dữ liệu JSON audit_finding_matrix sử dụng gemini-2.5-flash. Kiểm thử hiệu năng với thinking_config.thinking_budget ở các mức 1,024, 8,192 và 32,768 tokens cho kết quả:\n- Ở 1,024 tokens: Suy luận bị cắt giữa chừng trước khi phân tích các điều khoản trách nhiệm, gây giảm 42% độ chính xác.\n- Ở 8,192 tokens: Đạt 98% độ chính xác trích xuất với suy luận đầy đủ sử dụng ~4,500 thinking tokens.\n- Ở 32,768 tokens: Giữ nguyên 98% độ chính xác, nhưng độ trễ P99 tăng 310% và chi phí token tăng gấp 4 lần do chi phí quản lý phân bổ.\nChiến lược hiệu chỉnh nào nhóm nên triển khai cho môi trường production?",
    "optionsEN": [
      "A. Set thinking_budget to 1,024 tokens and append SYSTEM PROMPT: summarize thinking under 50 words to force concise reasoning without truncating analysis.",
      "B. Calibrate thinking_budget to 8,192 tokens for production contracts, establishing a budget ceiling that fully covers complex reasoning paths while preventing excessive latency and token spend from unconstrained allocations.",
      "C. Set thinking_budget to 32,768 tokens permanently because unused allocated budget tokens are automatically refunded by the API and carry zero cost or latency impact.",
      "D. Remove thinking_config completely and instead increase max_output_tokens to 32,768 to let the model decide its own reasoning length without explicit API constraints."
    ],
    "options": [
      "A. Thiết lập thinking_budget thành 1,024 tokens và thêm SYSTEM PROMPT: summarize thinking under 50 words để buộc suy luận ngắn gọn mà không làm cắt đứt phân tích.",
      "B. Hiệu chỉnh thinking_budget thành 8,192 tokens cho các hợp đồng production, thiết lập trần ngân sách bao phủ hoàn toàn luồng suy luận phức tạp mà không gây ra độ trễ dư thừa và lãng phí chi phí token từ việc phân bổ không hạn chế.",
      "C. Thiết lập thinking_budget thành 32,768 tokens cố định vì các token ngân sách không sử dụng hết sẽ tự động hoàn tiền bởi API và không gây ảnh hưởng đến chi phí hay độ trễ.",
      "D. Loại bỏ hoàn toàn thinking_config và thay vào đó tăng max_output_tokens lên 32,768 để mô hình tự quyết định độ dài suy luận mà không cần ràng buộc API trực tiếp."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: System prompt instructions cannot override API token budget truncations when complex multi-clause synthesis exceeds 1,024 tokens.",
      "Option B is correct: Setting thinking_budget to 8,192 provides sufficient capacity for complete contract reasoning (~4,500 tokens) while preventing latency bloat and financial cost inflation associated with uncalibrated oversized ceilings like 32,768 tokens.",
      "Option C is incorrect: Excessively high budgets increase latency and token costs because generated thinking tokens are billed as output tokens and high upper limits encourage verbose reasoning traces.",
      "Option D is incorrect: max_output_tokens limits total response length (including final JSON payload), but without configuring thinking_config.thinking_budget, the model cannot perform extended thinking reasoning step-by-step."
    ],
    "rationale": "Calibrating the thinking_budget API parameter requires balancing reasoning completeness against latency and token cost. Setting the budget too low causes truncated reasoning mid-analysis, while setting it unnecessarily high inflates execution time and billed token costs with zero precision gain.",
    "explanation": "Phương án B đúng vì việc hiệu chỉnh thinking_budget lên 8,192 tokens cung cấp đủ hạn mức cho mô hình thực hiện suy luận phức tạp (~4,500 tokens) để đạt độ chính xác tối đa (98%), đồng thời khống chế được độ trễ và chi phí token so với mức 32,768 tokens.\n\nPhương án A sai vì hướng dẫn trong system prompt không thể khắc phục được giới hạn cứng của tham số thinking_budget ở cấp API khi nhu cầu suy luận thực tế vượt quá 1,024 tokens.\n\nPhương án C sai vì các token suy luận được tính vào lượng output tokens tính phí; việc đặt hạn mức quá cao như 32,768 tokens có thể khiến mô hình sinh ra các luồng suy luận dài dòng không cần thiết, làm tăng độ trễ và chi phí.\n\nPhương án D sai vì max_output_tokens kiểm soát tổng số token đầu ra chứ không kích hoạt cơ chế suy luận mở rộng (Extended Thinking) nếu không cấu hình thinking_config.",
    "sources": [
      {
        "label": "Lesson 4.4: Chain-of-Thought",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-4-chain-of-thought"
      }
    ]
  }
]