[
  {
    "id": "d1-b02-1.2-009",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-009",
    "scenarioSignature": {
      "testedPrinciple": "ambiguous router routing clarification gate",
      "failureMode": "redundant multi-agent invocation and resource waste",
      "rootCause": "router lacks ambiguity detection and fallback threshold",
      "requiredFix": "implement router confidence threshold to clarify before dispatch"
    },
    "questionEN": "In an enterprise support orchestrator, the router agent processes an incoming ticket containing the underspecified user query 'payment process failed with error 500'. Instead of identifying missing parameters, the router broadcasts the payload to BillingSpecialist, DatabaseSpecialist, and NetworkSpecialist simultaneously. All three subagents execute heavy diagnostic queries, causing DB IOPS to spike by 300% and generating three conflicting resolution plans. What is the root cause and correct architectural remediation?",
    "question": "[d1-b02-1.2-009] Trong một hệ thống enterprise support orchestrator, router agent xử lý một ticket có yêu cầu mơ hồ từ người dùng: 'payment process failed with error 500'. Thay vì xác định thông tin thiếu, router đã broadcast payload đến đồng thời cả ba subagent: BillingSpecialist, DatabaseSpecialist và NetworkSpecialist. Cả ba subagent đều thực thi các câu truy vấn chẩn đoán nặng, khiến DB IOPS tăng vọt 300% và tạo ra ba kế hoạch xử lý xung đột nhau. Root cause và cách khắc phục kiến trúc đúng là gì?",
    "optionsEN": [
      "A. Implement an explicit routing confidence threshold in the router node; when intent ambiguity is detected (confidence < 0.85), halt broad dispatch and route to a clarification state to ask the user for specific error context before specialist allocation.",
      "B. Add system prompt rules to each specialist subagent instructing them to self-evaluate query relevance and return an empty response if the ticket falls outside their primary domain.",
      "C. Switch the router to a sequential execution pipeline where subagents are invoked one after another until one specialist successfully returns a diagnostic result.",
      "D. Expand the context window of the router agent by injecting historical system logs so it can resolve missing transaction details autonomously."
    ],
    "options": [
      "A. Triển khai ngưỡng routing confidence rõ ràng tại router node; khi phát hiện câu hỏi mơ hồ (confidence < 0.85), tạm dừng broadcast và chuyển sang trạng thái làm rõ (clarification state) để hỏi người dùng ngữ cảnh lỗi cụ thể trước khi phân bổ specialist.",
      "B. Thêm quy tắc trong system prompt của từng specialist subagent hướng dẫn chúng tự đánh giá độ liên quan và trả về response rỗng nếu ticket không thuộc domain chính của mình.",
      "C. Chuyển router sang pipeline thực thi tuần tự, trong đó các subagent được gọi lần lượt cho đến khi một specialist trả về kết quả chẩn đoán thành công.",
      "D. Mở rộng context window của router agent bằng cách nhúng log hệ thống lịch sử để nó tự giải quyết các chi tiết giao dịch còn thiếu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A ✅ (CORRECT): Setting a confidence threshold on the router ensures ambiguous queries trigger a clarification step rather than fan-out broadcasting. This prevents unnecessary tool calls, reduces DB load spikes, and stops conflicting output generation.",
      "Option B ❌ (INCORRECT): Relying on subagents to filter themselves still consumes LLM tokens and execution latency for fanning out requests, and models may unreliably hallucinate diagnoses instead of dropping the request.",
      "Option C ❌ (INCORRECT): Sequential execution reduces concurrent resource spikes but still executes unnecessary subagents for ambiguous queries, failing to address the router's root failure to clarify ambiguity.",
      "Option D ❌ (INCORRECT): Expanding context with historical logs does not clarify specific real-time user intent or missing payload fields, increasing prompt cost without solving ambiguous routing."
    ],
    "rationale": "When a router agent encounters ambiguous or underspecified requests, broadcasting to all specialists causes resource waste and conflicting responses. A robust router pattern enforces a confidence threshold that routes ambiguous requests to a clarification flow before dispatching to specialized workers.",
    "explanation": "✅ Đáp án đúng: A\n\n💡 Rationale: Khi router agent gặp các yêu cầu mơ hồ hoặc thiếu thông tin, việc broadcast tới tất cả các specialist sẽ gây lãng phí tài nguyên và tạo ra phản hồi xung đột. Mẫu router chuẩn cần triển khai ngưỡng tin cậy (confidence threshold) để chuyển yêu cầu mơ hồ sang luồng làm rõ (clarification flow) trước khi phân bổ việc cho các worker chuyên biệt.\n\n🔍 Phân tích các phương án:\n- Option A ✅ (ĐÚNG): Thiết lập confidence threshold giúp router phát hiện câu hỏi mơ hồ và chuyển sang luồng làm rõ thông tin thay vì fan-out broadcast. Điều này ngăn chặn việc thực thi tool call không cần thiết, giảm tải cho DB và tránh xung đột kế hoạch xử lý.\n- Option B ❌ (SAI): Việc trông cậy vào subagent tự lọc vẫn tiêu tốn token và latency cho việc fan-out, đồng thời LLM có thể phỏng đoán vô căn cứ thay vì tự bỏ qua yêu cầu.\n- Option C ❌ (SAI): Chạy tuần tự chỉ làm giảm đỉnh tải tài nguyên tức thời nhưng vẫn chạy các subagent không liên quan, không giải quyết triệt để vấn đề phân loại mơ hồ của router.\n- Option D ❌ (SAI): Mở rộng context với log lịch sử không thể thay thế việc xác nhận ý định người dùng trong thời gian thực khi thông tin đầu vào bị thiếu.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  },
  {
    "id": "d1-b02-1.2-010",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-010",
    "scenarioSignature": {
      "testedPrinciple": "evaluator-generator independence and blind spot prevention",
      "failureMode": "systematic approval of flawed outputs in feedback loop",
      "rootCause": "evaluator shares identical prompt state and model bias with generator",
      "requiredFix": "decouple evaluator using distinct prompts or deterministic test harness"
    },
    "questionEN": "In an automated SQL generation system, a CodeGenerator agent and a CodeEvaluator agent share the same base system prompt and state configuration. During a benchmark run, the CodeGenerator consistently emits deprecated PostgreSQL functions like jsonb_extract_path() without explicit casting, and the CodeEvaluator grants a 100% approval score across 20 iterations. In production execution against PostgreSQL 16, every query fails with syntax errors. What is the root cause and correct architectural remediation?",
    "question": "[d1-b02-1.2-010] Trong một hệ thống tự động sinh SQL, CodeGenerator agent và CodeEvaluator agent chia sẻ cùng một base system prompt và cấu hình state. Trong quá trình chạy benchmark, CodeGenerator liên tục tạo ra các hàm PostgreSQL đã bị phản đối (deprecated) như jsonb_extract_path() mà không cast kiểu dữ liệu rõ ràng, và CodeEvaluator cấp điểm phê duyệt 100% qua 20 lần lặp. Khi chạy thực tế trên PostgreSQL 16, mọi query đều thất bại với lỗi cú pháp. Root cause và cách khắc phục kiến trúc đúng là gì?",
    "optionsEN": [
      "A. Increase the temperature parameter of the generator agent from 0.2 to 0.8 so it generates a broader variety of query implementations across evaluation cycles.",
      "B. Decouple the evaluator from the generator's state by using distinct system prompts focused on strict DB compliance, or integrate a deterministic linter/sandbox execution step into the evaluation loop.",
      "C. Configure a multi-pass loop allowing the evaluator agent to re-evaluate the generator output up to five consecutive times before finalizing approval.",
      "D. Combine the generator and evaluator into a single unified self-correcting agent prompt within one context window to streamline error feedback."
    ],
    "options": [
      "A. Tăng tham số temperature của generator agent từ 0.2 lên 0.8 để nó tạo ra nhiều biến thể triển khai query phong phú hơn qua các chu kỳ đánh giá.",
      "B. Tách rời evaluator khỏi state của generator bằng cách sử dụng system prompt riêng biệt tập trung vào tuân thủ chuẩn DB nghiêm ngặt, hoặc tích hợp bước thực thi sandbox/linter xác định vào vòng lặp đánh giá.",
      "C. Cấu hình vòng lặp multi-pass cho phép evaluator agent đánh giá lại output của generator tối đa 5 lần liên tiếp trước khi hoàn tất phê duyệt.",
      "D. Kết hợp generator và evaluator thành một prompt agent tự sửa lỗi duy nhất trong cùng một context window để rút ngắn phản hồi lỗi."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A ❌ (INCORRECT): Raising temperature increases output randomness but does not solve the evaluator's blind spot; the evaluator will still share the same evaluation bias and approve incorrect queries.",
      "Option B ✅ (CORRECT): Decoupling the evaluator's prompt/state or replacing/augmenting it with deterministic validation (linter or database sandbox execution) breaks the shared bias and catches non-compliant syntax before deployment.",
      "Option C ❌ (INCORRECT): Re-running the identical evaluator multiple times with the same prompt and state yields the exact same confirmation bias and will continue to pass flawed code.",
      "Option D ❌ (INCORRECT): Merging both into a single agent context exacerbates self-confirmation bias, making the model even more prone to missing its own errors."
    ],
    "rationale": "When an evaluator agent shares identical prompts, state, or model context with the generator, it replicates the generator's biases and blind spots (evaluator-generator collusion). Effective evaluator-optimizer patterns require decoupled evaluation criteria, distinct prompt perspectives, or deterministic ground-truth verification (such as linters or test execution).",
    "explanation": "✅ Đáp án đúng: B\n\n💡 Rationale: Khi evaluator agent dùng chung prompt, state hoặc context với generator, nó sẽ lặp lại chính các định kiến và điểm mù của generator (hiện tượng evaluator-generator collusion). Pattern Evaluator-Optimizer hiệu quả đòi hỏi tiêu chí đánh giá tách biệt, góc nhìn prompt độc lập, hoặc công cụ kiểm chứng thực tế mang tính xác định (như linter hoặc sandbox test execution).\n\n🔍 Phân tích các phương án:\n- Option A ❌ (SAI): Tăng temperature chỉ làm ngẫu nhiên hóa output sinh ra nhưng không sửa được điểm mù của evaluator — evaluator vẫn sẽ duyệt các cú pháp sai do giữ nguyên định kiến đánh giá.\n- Option B ✅ (ĐÚNG): Tách biệt prompt/state của evaluator hoặc bổ sung công cụ kiểm tra thực tế (linter / db sandbox execution) sẽ phá vỡ điểm mù dùng chung và phát hiện cú pháp không tuân thủ trước khi triển khai.\n- Option C ❌ (SAI): Chạy lại cùng một evaluator nhiều lần với cùng state không đổi chỉ tạo ra kết quả duyệt sai trùng lặp do confirmation bias.\n- Option D ❌ (SAI): Gộp hai agent làm một trong cùng context window càng làm tăng tự xác nhận định kiến (self-confirmation bias), khiến agent càng khó nhận ra lỗi của chính mình.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  }
]