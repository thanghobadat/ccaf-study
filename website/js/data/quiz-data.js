/* CCAF Learning Hub - 77 Exam Practice Questions Data (Bilingual EN + VI) */

const QUIZ_DATA = [
  {
    id: 1,
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    question: "Pipeline của bạn xem xét mọi PR bằng cách gọi API 1 lần với prompt tĩnh chứa thông tin diff và văn bản đầy đủ của từng file thay đổi. Đánh giá cho thấy các lỗi liên quan đến tương tác liên file (cross-file interactions) chiếm 35% sự cố Production từ các PR đã review. Thay đổi hiệu quả nhất đối với thiết kế review của bạn là gì?",
    questionEN: "Your pipeline reviews every PR using a single API call with a static prompt containing the diff and full text of each changed file — unchanged files are not included. Reviews are posted asynchronously and don't block PR creation. Developers report that reviews consistently miss bugs involving cross-file interactions — for example, a PR renames a function's parameters but the review doesn't flag callers in unchanged files that still use the old argument order. Evaluation shows cross-file bugs account for 35% of production incidents from reviewed PRs. What is the most effective change to your review design?",
    options: [
      "A. Thiết kế lại review thành một task agentic có giới hạn lượt, nơi mô hình có thể đọc file và tìm kiếm codebase qua các tool (View, Grep, Glob) để kiểm tra các phụ thuộc liên file.",
      "B. Thêm chỉ dẫn Chain-of-Thought yêu cầu mô hình liệt kê tất cả tham chiếu bên ngoài trong diff rồi suy luận từng bước.",
      "C. Chạy các đợt review song song cho từng file thay đổi cùng với các file phụ thuộc trực tiếp, sau đó tổng hợp bằng một bước tóm tắt cuối.",
      "D. Sử dụng phân tích tĩnh để xây dựng đồ thị phụ thuộc của code đã thay đổi, sau đó mở rộng prompt để bao gồm tất cả các file trong phạm vi 2 hop phụ thuộc."
    ],
    optionsEN: [
      "A. Redesign the review as a turn-limited agentic task where the model can read files and search the codebase via tools, following references to verify cross-file findings.",
      "B. Add chain-of-thought instructions asking the model to list all external references in the diff and reason step-by-step.",
      "C. Run parallel review turns for each changed file alongside its immediate dependency files, then aggregate with a final summary step.",
      "D. Use static analysis to build a dependency graph for changed code, then expand the prompt to include all files within 2 dependency hops."
    ],
    correct: 0,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là A. Sự thất bại ở đây là bài toán thiếu ngữ cảnh (missing-context problem): những nơi gọi hàm nằm ở các file không thay đổi nên prompt tĩnh không bao giờ bao gồm chúng. Do đó, chỉ dẫn Chain-of-Thought (B) không thể giúp mô hình suy luận về đoạn code mà nó không nhìn thấy được. Các phương pháp heuristic phân tích tĩnh (C, D) sẽ làm phình đại context nhưng vẫn bỏ sót các tham chiếu động. Hướng dẫn của Anthropic ưu tiên Agentic Search — cho phép mô hình tự truy xuất chính xác context cần thiết qua các tool đọc/tìm kiếm file — và pipeline review bất đồng bộ không chặn tạo PR có thể chấp nhận độ trễ tăng thêm này, trong khi giới hạn lượt sẽ kiểm soát được chi phí."
  },
  {
    id: 2,
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    question: "Một lập trình viên yêu cầu agent thêm bài test toàn diện cho một codebase cũ gồm 200 file với rất ít bài test hiện có và không chỉ định ưu tiên module nào. Agent nên phân rã nhiệm vụ mở này như thế nào?",
    questionEN: "A developer asks an agent to add comprehensive test coverage to a legacy codebase with 200 files, minimal existing tests, and no specified priority modules. How should the agent decompose this open-ended task?",
    options: [
      "A. Đọc lần lượt toàn bộ 200 file để lập danh sách hàm đầy đủ trước khi viết test.",
      "B. Tạo một lịch trình testing cố định dựa trên cấu trúc thư mục, phân bổ công sức bằng nhau cho mỗi thư mục.",
      "C. Bắt đầu viết test cho module đầu tiên theo thứ tự bảng chữ cái, dùng lỗi test và import để khám phá các file liên quan.",
      "D. Sử dụng Glob và Grep để lập bản đồ cấu trúc codebase, xác định các module liên kết chặt chẽ (heavily-coupled), lập kế hoạch ưu tiên cho các khu vực tác động cao và điều chỉnh khi phát hiện thêm phụ thuộc."
    ],
    optionsEN: [
      "A. Exhaustively read all 200 files to build a complete function inventory before writing any tests.",
      "B. Create a fixed testing schedule based on directory structure, splitting effort evenly across each folder.",
      "C. Start writing tests for the first module alphabetically, using test failures and imports to discover related files.",
      "D. Use Glob and Grep to map the codebase structure, identify heavily-coupled modules, form a prioritized plan for high-impact areas, and revise the plan as new dependencies are discovered."
    ],
    correct: 3,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là D. Hướng dẫn thực hành tốt nhất cho agent của Anthropic ưu tiên thu thập context hiệu quả bằng các công cụ tìm kiếm (Glob/Grep) hơn là đọc cạn kệt từng file (A - lãng phí context và thời gian). Ưu tiên các module có tác động cao, liên kết chặt chẽ và lặp lại điều chỉnh kế hoạch khi các phụ thuộc xuất hiện là cách phân rã bài toán mở chuẩn xác; A lãng phí, B bỏ qua độ phức tạp/tác động thực tế, C mang tính ngẫu nhiên và không có kế hoạch."
  },
  {
    id: 3,
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    question: "Yêu cầu nào dưới đây thu được nhiều lợi ích nhất khi áp dụng quy trình làm việc nhiều bước rõ ràng (chẳng hạn: Phân tích → Đề xuất → Triển khai kèm Đánh giá)?",
    questionEN: "Which of the following requests gains the MOST value from an explicit multi-phase workflow (e.g., analyze → propose → implement with review)?",
    options: [
      "A. Yêu cầu B: 'Cải thiện xử lý lỗi trong module xử lý dữ liệu—thêm try/catch, thông báo lỗi có ý nghĩa và đảm bảo thất bại không làm hỏng dữ liệu âm thầm.'",
      "B. Cả hai yêu cầu đều thu được lợi ích ngang nhau.",
      "C. Yêu cầu A: 'Đổi tên hàm getUserData thành fetchUserProfile ở tất cả những nơi nó được sử dụng.'",
      "D. Không yêu cầu nào thu được lợi ích đáng kể."
    ],
    optionsEN: [
      "A. Request B: 'Improve error handling across the data pipeline module—add try/catch blocks, meaningful error messages, and ensure failures don't silently corrupt data.'",
      "B. Both requests gain equal value.",
      "C. Request A: 'Rename the function getUserData to fetchUserProfile across all files where it is used.'",
      "D. Neither request gains meaningful value."
    ],
    correct: 0,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là A. Yêu cầu B là một bài toán mở, đòi hỏi nhiều phán đoán và thiết kế — 'cải thiện xử lý lỗi' yêu cầu phân tích hành vi hiện tại, quyết định nơi cần try/catch và chọn thông báo có ý nghĩa. Quy trình Phân tích → Đề xuất → Triển khai kèm Đánh giá giúp nâng cao chất lượng và bắt được thiết kế sai trước khi sửa code. Yêu cầu A là thao tác đổi tên máy móc đã rõ ràng, một lệnh find-and-replace xử lý tốt nên quy trình nhiều bước không mang lại thêm nhiều giá trị."
  },
  {
    id: 4,
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    question: "Hệ thống review code của bạn cần phân tích PR và đưa ra phản hồi về 3 khía cạnh: tuân thủ code style, bảo mật và tài liệu. Quy trình review tuân theo cùng một luồng 3 bước giống hệt nhau cho MỌI PR. Mô hình phân rã nào phù hợp nhất?",
    questionEN: "Your code review system needs to analyze a PR and provide feedback across 3 areas: code style compliance, security vulnerabilities, and documentation completeness. The review workflow follows the exact same 3-step sequence for EVERY PR. Which decomposition pattern is most appropriate?",
    options: [
      "A. Single comprehensive prompt — đưa tất cả chỉ dẫn vào 1 prompt duy nhất.",
      "B. Routing — phân loại PR theo loại (feature, bugfix) rồi chuyển hướng.",
      "C. Prompt chaining — chia review thành các bước tuần tự xử lý từng khía cạnh riêng biệt, sau đó tổng hợp ở bước cuối cùng.",
      "D. Orchestrator-workers — sử dụng LLM trung tâm để quyết định động kiểm tra nào cần thiết rồi phân công."
    ],
    optionsEN: [
      "A. Single comprehensive prompt — put all review instructions into one prompt.",
      "B. Routing — classify PR type first then route to specialized handlers.",
      "C. Prompt chaining — chain sequential steps processing each area separately, then combine in a final synthesis step.",
      "D. Orchestrator-workers — use a central LLM to dynamically decide which checks are needed per PR and dispatch workers."
    ],
    correct: 2,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là C. Kịch bản nêu rõ review 'tuân theo cùng một luồng 3 bước giống hệt nhau cho mọi PR'. Theo tài liệu 'Building Effective Agents' của Anthropic, đây là trường hợp điển hình cho Prompt Chaining (chuỗi prompt cố định tuần tự). Orchestrator-workers (D) chỉ cần thiết khi các subtask thay đổi không đoán trước được per input, và Routing (B) áp dụng khi các đầu vào rơi vào các nhóm riêng biệt cần cách xử lý khác nhau."
  },
  {
    id: 5,
    domain: "D2",
    domainTitle: "Tool Design & MCP Integration",
    question: "Khi trích xuất dữ liệu hóa đơn, 18% hóa đơn gặp lỗi bất nhất giữa tổng các dòng sản phẩm (Line Items) và Tổng tiền (Grand Total) ghi trên hóa đơn do lỗi OCR. Giải pháp thiết kế Schema nào tốt nhất để xử lý?",
    questionEN: "When extracting invoice data, 18% of invoices have discrepancies between line item sums and the printed grand total due to OCR errors. Which schema design best handles this edge case?",
    options: [
      "A. Chỉ yêu cầu mô hình tính toán lại tổng tiền từ các dòng sản phẩm.",
      "B. Thêm cả hai trường `calculated_total` (mô hình tự cộng) và `stated_total` (trích xuất trực tiếp từ trang) vào Schema, sau đó gắn cờ (flag) đẩy sang con người duyệt NẾU `calculated_total != stated_total`.",
      "C. Yêu cầu mô hình cố gắng sửa lại dòng sản phẩm bị lỗi cho bằng tổng tiền.",
      "D. Đổi sang mô hình Opus để tăng độ chính xác trích xuất."
    ],
    optionsEN: [
      "A. Ask the model to recalculate the grand total solely from line items.",
      "B. Include both calculated_total and stated_total fields in the schema, flagging discrepancies for human review when they do not match.",
      "C. Instruct the model to adjust faulty line items to equal the stated grand total.",
      "D. Switch to the Opus model to increase extraction accuracy."
    ],
    correct: 1,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là B. Thiết kế Schema dự phòng (Redundancy Schema) trích xuất cả 2 giá trị và so sánh là giải pháp kiến trúc chuẩn để phát hiện lỗi OCR và đưa sang Human-in-the-loop duyệt khi có sai lệch."
  },
  {
    id: 6,
    domain: "D3",
    domainTitle: "Claude Code Configuration & Workflows",
    question: "Tệp cấu hình nào dưới đây được Claude Code CLI tự động đọc khi khởi chạy trong một dự án để nắm bắt các quy tắc build, lệnh test và quy chuẩn code?",
    questionEN: "Which configuration file is automatically read by Claude Code CLI upon launch to ingest build rules, test commands, and coding standards for a project?",
    options: [
      "A. `.claude-config.json`",
      "B. `CLAUDE.md`",
      "C. `SYSTEM_PROMPT.txt`",
      "D. `package.json`"
    ],
    optionsEN: [
      "A. `.claude-config.json`",
      "B. `CLAUDE.md`",
      "C. `SYSTEM_PROMPT.txt`",
      "D. `package.json`"
    ],
    correct: 1,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là B. `CLAUDE.md` là file cấu hình tiêu chuẩn ở cấp dự án dành riêng cho Claude Code CLI."
  },
  {
    id: 7,
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    question: "Khi trích xuất thông tin người tham dự sự kiện từ tài liệu, nếu số lượng người tham dự không được nhắc đến trong bài viết, làm thế nào để ngăn Claude không tự bịa ra một con số có vẻ hợp lý (hallucination)?",
    questionEN: "When extracting event attendee numbers from text, if the attendee count is not mentioned in the source article, how do you prevent Claude from hallucinating a plausible number?",
    options: [
      "A. Đặt temperature = 0.",
      "B. Yêu cầu mô hình trả về chuỗi 'Không rõ'.",
      "C. Thêm chỉ thị rõ ràng trong Prompt: 'Nếu số lượng người tham dự không được đề cập trong bài viết, hãy trả về giá trị null'.",
      "D. Sử dụng mô hình lớn hơn như Claude Opus."
    ],
    optionsEN: [
      "A. Set temperature = 0.",
      "B. Ask the model to return the string 'Unknown'.",
      "C. Add explicit prompt instructions: 'If attendee count is not mentioned in the text, return null'.",
      "D. Use a larger model like Claude Opus."
    ],
    correct: 2,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là C. Chỉ dẫn trả về `null` tường minh khi thiếu dữ liệu là pattern hiệu quả nhất để chống hallucination cho các trường optional."
  },
  {
    id: 8,
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    question: "Hệ thống của bạn cần xử lý 50.000 hồ sơ khách hàng hàng đêm để trích xuất dữ liệu. Công việc không đòi hỏi phản hồi ngay lập tức. Giải pháp nào tối ưu chi phí nhất?",
    questionEN: "Your system processes 50,000 customer records nightly for data extraction. The job does not require real-time responses. Which solution is most cost-effective?",
    options: [
      "A. Sử dụng Real-time Messages API với mô hình Haiku.",
      "B. Sử dụng Message Batches API để nhận ưu đãi giảm 50% chi phí với cam kết xử lý trong 24h.",
      "C. Gửi các câu hỏi song song với max_tokens nhỏ hơn.",
      "D. Dùng Prompt Caching trên Real-time API."
    ],
    optionsEN: [
      "A. Use Real-time Messages API with the Haiku model.",
      "B. Use the Message Batches API for a 50% cost discount with a 24-hour SLA.",
      "C. Send parallel queries with a smaller max_tokens limit.",
      "D. Use Prompt Caching on the Real-time API."
    ],
    correct: 1,
    explanation: "EXPLANATION CHI TIẾT GỐC TỪ ANTHROPIC: Đáp án đúng là B. Message Batches API sinh ra dành riêng cho các tác vụ xử lý bất đồng bộ hàng loạt với chi phí rẻ hơn 50%."
  }
];
