[
  {
    "id": "d1-b02-1.2-003",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-003",
    "scenarioSignature": {
      "testedPrinciple": "orchestrator-workers pattern for dynamic task expansion",
      "failureMode": "incomplete corporate due diligence due to uninvestigated newly discovered entities",
      "rootCause": "using static predefined workflow for open ended discovery",
      "requiredFix": "implement dynamic orchestrator workers pattern that spawns worker agents for newly discovered entities"
    },
    "questionEN": "An M&A due diligence platform (M&A_Diligence_Pipeline) investigates corporate acquisition targets. Initially, the system runs a fixed static pipeline that parses corporate filings and stops after querying named executive officers. During an investigation of a target firm, intermediate outputs reveal nested shell companies in subsidiary_list with entity_type: offshore_holding. Because the fixed pipeline cannot expand its task queue dynamically, it completes with uninvestigated_entity_count: 5, missing hidden financial liabilities. Which orchestration architecture correctly supports this open-ended discovery workflow?",
    "question": "[d1-b02-1.2-003] Một nền tảng thẩm định sáp nhập doanh nghiệp (M&A_Diligence_Pipeline) điều tra các công ty mục tiêu thâu tóm. Ban đầu, hệ thống chạy một pipeline cố định phân tích hồ sơ doanh nghiệp và dừng lại sau khi truy vấn các giám đốc điều hành được đặt tên. Trong một cuộc điều tra, kết quả trung gian phát hiện các công ty vỏ bọc lồng nhau trong subsidiary_list với entity_type: offshore_holding. Do pipeline cố định không thể mở rộng hàng đợi tác vụ cách động, nó hoàn thành với uninvestigated_entity_count: 5, bỏ sót các nghĩa vụ tài chính ẩn. Kiến trúc điều phối nào hỗ trợ chính xác workflow khám phá mở này?",
    "optionsEN": [
      "A. A Prompt Chaining pattern that pre-allocates five fixed sequential LLM steps to process a maximum of five corporate entities in order.",
      "B. A Parallelization Orchestrator pattern that pre-splits the target company record into four static quadrant workers before executing any document parsing.",
      "C. An Orchestrator-Workers pattern where a central orchestrator dynamically parses worker results, identifies new entity references in subsidiary_list, and continuously spawns new dedicated worker agents until no uninvestigated entities remain.",
      "D. An Evaluator-Optimizer loop pattern where a critique agent continuously evaluates the final due diligence text report and requests rewritten summaries."
    ],
    "options": [
      "A. Mô hình Prompt Chaining cấp phát trước 5 bước LLM tuần tự cố định để xử lý tối đa 5 thực thể doanh nghiệp theo thứ tự.",
      "B. Mô hình Parallelization Orchestrator chia trước bản ghi công ty mục tiêu cho 4 worker phân vùng cố định trước khi thực thi phân tích tài liệu.",
      "C. Mô hình Orchestrator-Workers trong đó agent điều phối trung tâm phân tích kết quả trung gian, phát hiện các tham chiếu thực thể mới trong subsidiary_list và tự động khởi tạo các worker agent chuyên trách mới cho đến khi không còn thực thể chưa điều tra.",
      "D. Mô hình vòng lặp Evaluator-Optimizer trong đó một agent đánh giá liên tục kiểm tra báo cáo thẩm định cuối cùng và yêu cầu viết lại bản tóm tắt."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A: Prompt chaining requires a fixed, predetermined sequence of steps, making it incapable of dynamically expanding when an arbitrary number of nested entities is uncovered at runtime.",
      "Option B: Static parallelization requires knowing all work items up front before fan-out, which fails when subtasks are discovered iteratively during document parsing.",
      "Option C (Correct): The Orchestrator-Workers pattern allows a central orchestrator to dynamically synthesize intermediate outputs, generate new subtasks on the fly, and delegate worker agents adaptively for open-ended exploration.",
      "Option D: Evaluator-optimizer loops refine output quality iteratively, but cannot dynamically discover and queue new external data-gathering subtasks."
    ],
    "rationale": "The Orchestrator-Workers pattern excels at open-ended tasks where the full scope of subtasks is unknown upfront, allowing the central orchestrator to dynamically spawn worker agents as new entities are discovered during runtime execution.",
    "explanation": "Phương án C là đáp án đúng vì mô hình Orchestrator-Workers cho phép agent điều phối trung tâm tổng hợp kết quả trung gian, phát sinh các tác vụ phụ mới một cách linh hoạt và ủy quyền cho các worker agent khi xuất hiện thực thể mới trong quá trình thực thi.\n- Phương án A sai vì Prompt Chaining đòi hỏi chuỗi bước cố định trước, không thể mở rộng linh hoạt khi số lượng thực thể biến đổi ngẫu nhiên ở runtime.\n- Phương án B sai vì phân tách song song cố định yêu cầu biết trước toàn bộ danh sách tác vụ trước khi phân tán (fan-out), thất bại khi tác vụ xuất hiện nối tiếp.\n- Phương án D sai vì Evaluator-Optimizer dùng để tinh chỉnh chất lượng văn bản chứ không thể tự động phát hiện và thêm các tác vụ thu thập dữ liệu mới.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  },
  {
    "id": "d1-b02-1.2-004",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-004",
    "scenarioSignature": {
      "testedPrinciple": "evaluator-optimizer loop pattern for iterative quality refinement",
      "failureMode": "generated compliance plan fails accessibility threshold standards on first pass",
      "rootCause": "single pass generation without critique feedback loop",
      "requiredFix": "implement evaluator-optimizer pattern looping generator output back with detailed evaluator feedback until score threshold met"
    },
    "questionEN": "An enterprise web accessibility tool (A11y_Plan_Engine) produces WCAG 2.1 AA remediation plans (wcag_compliance_plan). Single-pass LLM generation frequently yields incomplete plans with compliance_score: 72 (below the required threshold of 90), leaving critical gaps like missing_alt_text_policy. To fix this, an automated wcag_evaluator node must inspect the candidate plan, generate specific feedback in violations, and trigger the generator to revise the document iteratively until compliance_score >= 90. Which orchestration pattern explicitly implements this feedback-driven revision loop?",
    "question": "[d1-b02-1.2-004] Một công cụ truy cập web doanh nghiệp (A11y_Plan_Engine) tạo các kế hoạch khắc phục tuân thủ WCAG 2.1 AA (wcag_compliance_plan). Việc tạo LLM một lượt duy nhất thường tạo ra kế hoạch không đầy đủ với compliance_score: 72 (dưới ngưỡng yêu cầu là 90), bỏ sót các lỗi quan trọng như missing_alt_text_policy. Để khắc phục, một nút wcag_evaluator tự động phải kiểm tra kế hoạch ứng viên, tạo phản hồi chi tiết trong violations và yêu cầu generator sửa lại văn bản lặp đi lặp lại cho đến khi compliance_score >= 90. Mô hình điều phối nào triển khai chính xác vòng lặp sửa đổi dựa trên phản hồi này?",
    "optionsEN": [
      "A. A Parallelization Orchestrator pattern that runs three independent generator agents concurrently and concatenates their outputs.",
      "B. A Router Orchestrator pattern that routes the accessibility prompt to either a basic generator or an advanced generator based on web app complexity.",
      "C. A Prompt Chaining pattern that sequentially passes the prompt through a research node, a drafting node, and a final PDF rendering node without feedback.",
      "D. An Evaluator-Optimizer pattern that establishes a two-node loop where a generator node creates/revises the plan and an evaluator node checks it against compliance criteria, looping feedback until the target threshold is met."
    ],
    "options": [
      "A. Mô hình Parallelization Orchestrator chạy 3 agent generator độc lập song song và nối các đầu ra của chúng lại với nhau.",
      "B. Mô hình Router Orchestrator điều hướng prompt truy cập đến generator cơ bản hoặc generator nâng cao dựa trên độ phức tạp của ứng dụng web.",
      "C. Mô hình Prompt Chaining chuyền tuần tự prompt qua nút nghiên cứu, nút soạn thảo và nút xuất bản PDF cuối cùng mà không có phản hồi.",
      "D. Mô hình Evaluator-Optimizer thiết lập vòng lặp hai nút, trong đó nút generator tạo/sửa kế hoạch và nút evaluator kiểm tra dựa trên tiêu chí tuân thủ, lặp lại phản hồi cho đến khi đạt ngưỡng mục tiêu."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A: Running multiple parallel generators without critique feedback produces three unverified plans, wasting tokens without ensuring any plan passes the score threshold.",
      "Option B: Routing selects an initial execution path based on input classification, but cannot perform multi-turn iterative feedback revisions on intermediate outputs.",
      "Option C: Linear prompt chaining executes fixed steps sequentially, but lacks conditional feedback loops required to reject and refine subpar drafts iteratively.",
      "Option D (Correct): The Evaluator-Optimizer pattern is designed for feedback-driven iterative refinement, looping candidate outputs through evaluation and rejection/revision cycles until predefined quality thresholds are satisfied."
    ],
    "rationale": "The Evaluator-Optimizer pattern explicitly models iterative feedback loops where an evaluator model or tool critiques candidate outputs against quantitative criteria, instructing the generator to refine the draft until quality thresholds are met.",
    "explanation": "Phương án D là đáp án đúng vì mô hình Evaluator-Optimizer được thiết kế riêng cho các công việc cần tinh chỉnh lặp đi lặp lại dựa trên phản hồi đánh giá, tiếp tục vòng lặp cho đến khi đầu ra đạt ngưỡng chất lượng đề ra.\n- Phương án A sai vì chạy song song nhiều generator không có cơ chế đánh giá/phản hồi sẽ tạo ra nhiều bản thảo không được kiểm chứng, gây lãng phí token.\n- Phương án B sai vì Router chỉ có chức năng phân loại đầu vào để chọn luồng xử lý ban đầu, không thể thực hiện tinh chỉnh nhiều vòng lặp.\n- Phương án C sai vì Prompt Chaining chạy tuyến tính một chiều, thiếu vòng lặp phản hồi điều kiện để từ chối và yêu cầu sửa đổi bản thảo chưa đạt yêu cầu.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  }
]