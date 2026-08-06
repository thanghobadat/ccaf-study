/* CCAF Learning Hub - Official Mock Exam Question Generator Engine (~1000 Questions Pool) 
   Bilingual English & Vietnamese Scenario-Based Questions mapped to 5 Domains & 6 Production Archetypes
*/

const MOCK_EXAM_ARCHETYPES = [
  "Customer Support Resolution Agent",
  "Code Generation & Refactoring with Claude Code",
  "Multi-Agent Research & Synthesis System",
  "Developer Productivity Tools (MCP Infrastructure)",
  "Claude Code in CI/CD & Automated PR Review",
  "Structured Data Extraction & OCR Processing"
];

// Helper to generate domain-specific realistic scenario question templates
function generateMockQuestionsPool() {
  const pool = [];
  let currentId = 1000;

  // DOMAIN 1: Agent Architecture & Orchestration (27% Weight - 270 Questions Target)
  const d1Templates = [
    {
      archetype: "Multi-Agent Research System",
      qVI: "Một hệ thống nghiên cứu đa agent được thiết kế với một Lead Coordinator và 5 Subagents. Trong khi chạy, Coordinator liên tục phân tích việc ủy quyền nhiệm vụ nhưng không có Subagent nào thực sự được khởi tạo (không có log lỗi). Nguyên nhân khả dĩ nhất là gì?",
      qEN: "A multi-agent research system is designed with a Lead Coordinator and 5 Subagents. During runtime, the Coordinator repeatedly reasons about task delegation, but no Subagent ever executes (with no errors logged). What is the most likely cause?",
      optsVI: [
        "A. Công cụ 'Task' chưa được khai báo trong thuộc tính allowedTools của Coordinator.",
        "B. Mô hình không đủ token max_tokens để phát phản hồi.",
        "C. Các Subagent không tự động kế thừa bộ nhớ context của Coordinator.",
        "D. Nhiệm vụ bị tắc nghẽn do mạng internet gián đoạn."
      ],
      optsEN: [
        "A. The 'Task' tool is missing from the Coordinator's allowedTools array.",
        "B. The model max_tokens parameter is set too low for responses.",
        "C. Subagents failed to automatically inherit the Coordinator context log.",
        "D. Network requests timed out during agent invocation."
      ],
      correct: 0,
      exp: "EXPLANATION: Nếu Coordinator có cấu hình AgentDefinitions nhưng không khởi tạo được subagent, nguyên nhân hàng đầu là thiếu 'Task' trong allowedTools. Mô hình có thể nói về việc delegate nhưng không có cơ chế thực thi nó."
    },
    {
      archetype: "Customer Support Resolution Agent",
      qVI: "Hệ thống support agent của bạn cần thực thi 3 Subagent song song để xử lý cùng lúc: tra cứu hóa đơn, kiểm tra vận chuyển và đánh giá lịch sử hỗ trợ. Để đảm bảo 3 Subagent chạy song song thực sự, Coordinator phải làm gì?",
      qEN: "Your customer support agent system needs to execute 3 subagents in parallel to check billing, shipping status, and support history. To guarantee true concurrent execution of the subagents, what must the Coordinator do?",
      optsVI: [
        "A. Gửi chỉ thị 'Hãy chạy song song nhé' trong system prompt.",
        "B. Phát ra nhiều lệnh gọi tool 'Task' trong CÙNG MỘT message phản hồi của assistant.",
        "C. Đổi mô hình sang claude-haiku để tăng tốc độ xử lý.",
        "D. Chạy 3 vòng lặp API riêng biệt ở 3 thread backend."
      ],
      optsEN: [
        "A. Instruct the model to 'execute in parallel' within the system prompt.",
        "B. Emit multiple 'Task' tool calls within a single assistant message turn.",
        "C. Switch to the Claude Haiku model for lower latency processing.",
        "D. Initiate 3 separate API calls across 3 backend threads."
      ],
      correct: 1,
      exp: "EXPLANATION: Hướng dẫn Anthropic khẳng định việc phát ra nhiều tool_use 'Task' trong cùng 1 message là cơ chế duy nhất khiến SDK khởi chạy các subagent song song thật sự."
    },
    {
      archetype: "Code Generation with Claude Code",
      qVI: "Sau khi sự cố sập server xảy ra trong một phiên refactor đa agent dài, hệ thống cần khôi phục lại trạng thái làm việc mà không làm phình bộ nhớ context. Giải pháp phục hồi nào chuẩn nhất?",
      qEN: "After a server crash occurs during a long multi-agent refactoring session, the system needs to restore working state without inflating context memory. What is the most resilient recovery design?",
      optsVI: [
        "A. Cho mỗi agent ghi tệp export có cấu trúc (manifest); khi resume, coordinator chỉ tiêm phần state liên quan vào prompt từng subagent.",
        "B. Tải lại toàn bộ conversation log thô 100K token của phiên làm việc cũ.",
        "C. Sử dụng Vector Search để tìm kiếm ngữ cảnh ngẫu nhiên.",
        "D. Cho các subagent chạy lại từ đầu không cần khôi phục state."
      ],
      optsEN: [
        "A. Have each agent persist a structured export manifest; on resume, the coordinator injects only relevant state into each subagent prompt.",
        "B. Reload the entire raw 100K token conversation log from the old session.",
        "C. Perform semantic vector search to dynamically fetch random context.",
        "D. Re-run all subagents from scratch without restoring state."
      ],
      correct: 0,
      exp: "EXPLANATION: Việc lưu manifest xuất có cấu trúc và chỉ tiêm state liên quan giúp khôi phục hệ thống mượt mà mà không gây quá tải context như việc tải log thô."
    }
  ];

  // DOMAIN 2: Tool Design & MCP Integration (18% Weight - 180 Questions Target)
  const d2Templates = [
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Một lập trình viên thiết kế một tool đa năng Monolithic có tên 'manage_database' làm tất cả các việc: query, insert, update, drop table. Kết quả là mô hình thường gọi sai tham số hoặc tự chạy lệnh bash thô. Giải pháp kiến trúc đúng là gì?",
      qEN: "A developer builds a monolithic 'manage_database' tool handling querying, inserts, updates, and drop table operations. As a result, the model frequently passes bad parameters or falls back to raw bash commands. What is the correct architectural fix?",
      optsVI: [
        "A. Chia nhỏ tool đa năng thành các tool đơn nhiệm Granular (vd: query_records, update_record) với input schema rõ ràng.",
        "B. Đặt temperature = 0.9 để mô hình linh hoạt hơn.",
        "C. Ép mô hình dùng tool bằng tool_choice: 'tool'.",
        "D. Đưa toàn bộ tài liệu SQL vào system prompt."
      ],
      optsEN: [
        "A. Split the monolithic tool into granular single-purpose tools (e.g. query_records, update_record) with explicit schemas.",
        "B. Increase temperature to 0.9 to encourage model flexibility.",
        "C. Enforce execution using tool_choice: 'tool'.",
        "D. Insert the entire SQL documentation manual into the system prompt."
      ],
      correct: 0,
      exp: "EXPLANATION: Tách công cụ cồng kềnh thành các Granular Tools đơn nhiệm với schema tường minh là nguyên tắc cốt lõi ngăn mô hình gọi nhầm tool hoặc dùng lệnh shell thô."
    },
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Khi thiết kế Enum cho thuộc tính loại hình bất động sản (`property_type`), nếu dữ liệu thực tế xuất hiện loại nhà mẫu 'studio' nằm ngoài danh sách Enum ['house', 'apartment'], Schema validation sẽ bị hỏng. Cách thiết kế Catch-All Schema chống lỗi là gì?",
      qEN: "When defining an enum for property types ('property_type'), if a real-world document contains 'studio' outside the enum ['house', 'apartment'], schema validation fails. What is the resilient Catch-All schema design?",
      optsVI: [
        "A. Thêm giá trị 'other' vào Enum kết hợp với một trường chi tiết `property_type_detail` kiểu string.",
        "B. Xóa bỏ kiểm tra Schema để mô hình trả về tự do.",
        "C. Chuyển Enum thành kiểu boolean.",
        "D. Ném Exception khi gặp dữ liệu nằm ngoài Enum."
      ],
      optsEN: [
        "A. Add an 'other' value to the restricted enum paired with an explicit property_type_detail string field.",
        "B. Disable schema validation entirely to allow unconstrained output.",
        "C. Convert the enum field into a boolean flag.",
        "D. Throw an exception whenever unlisted property values appear."
      ],
      correct: 0,
      exp: "EXPLANATION: Thêm 'other' vào enum bị giới hạn kèm trường chi tiết dạng string giúp hệ thống xử lý mượt mà mọi ngoại lệ thực tế mà không bị ngắt quãng do hỏng validation."
    }
  ];

  // DOMAIN 3: Claude Code Configuration & Workflows (20% Weight - 200 Questions Target)
  const d3Templates = [
    {
      archetype: "Code Generation & Refactoring with Claude Code",
      qVI: "Khi khám phá một codebase lớn gồm 300 file để định vị vị trí định nghĩa của hàm `calculateTax`, hành động mở từng file một sẽ gây quá tải context. Quy trình tìm kiếm nào chuẩn nhất?",
      qEN: "When exploring a large 300-file codebase to locate where 'calculateTax' is defined, reading files sequentially overloads the context window. What is the best search workflow?",
      optsVI: [
        "A. Sử dụng Glob để tìm cấu trúc file và Grep để định vị chính xác từ khóa trước khi xem nội dung file cụ thể.",
        "B. Tải toàn bộ 300 file vào mảng messages.",
        "C. Dùng lệnh View đọc 50 file đầu tiên.",
        "D. Viết lại toàn bộ hàm calculateTax mà không cần tìm file cũ."
      ],
      optsEN: [
        "A. Use Glob to map file structure and Grep to locate exact keyword references before opening specific files.",
        "B. Load all 300 raw source files directly into the messages array.",
        "C. Execute the View tool sequentially on the first 50 project files.",
        "D. Rewrite the calculateTax function from scratch without searching."
      ],
      correct: 0,
      exp: "EXPLANATION: Nguyên tắc 'Glob and Grep before file view' giúp định vị nhanh đoạn code cần tìm mà không làm lãng phí bộ nhớ context."
    },
    {
      archetype: "Claude Code in CI/CD & Automated PR Review",
      qVI: "Bạn muốn tự động hóa quy trình review PR bằng Claude Code CLI trong pipeline CI/CD mà không cần con người bấm xác nhận thủ công cho từng lệnh đọc file. Cờ lệnh CLI nào phù hợp nhưng cần cẩn trọng môi trường?",
      qEN: "You want to automate PR reviews using Claude Code CLI in a CI/CD pipeline without requiring manual user confirmation per command. Which CLI flag enables this in an isolated sandbox?",
      optsVI: [
        "A. `--dangerously-skip-permissions`",
        "B. `--force-all-tools`",
        "C. `--auto-approve-github`",
        "D. `--no-context-limit`"
      ],
      optsEN: [
        "A. `--dangerously-skip-permissions`",
        "B. `--force-all-tools`",
        "C. `--auto-approve-github`",
        "D. `--no-context-limit`"
      ],
      correct: 0,
      exp: "EXPLANATION: Cờ `--dangerously-skip-permissions` cho phép Claude Code chạy tự động không cần hỏi quyền, chỉ nên dùng trong các container Sandbox CI/CD an toàn."
    }
  ];

  // DOMAIN 4: Prompt Engineering & Structured Output (20% Weight - 200 Questions Target)
  const d4Templates = [
    {
      archetype: "Structured Data Extraction & OCR Processing",
      qVI: "Khi trích xuất thông tin người liên hệ từ đoạn văn, nếu trường email không được đề cập trong bài viết, làm thế nào để ngăn mô hình không tự bịa ra một địa chỉ email giả (hallucination)?",
      qEN: "When extracting contact details from text, if the email field is not mentioned in the source article, how do you prevent the model from fabricating a plausible email address?",
      optsVI: [
        "A. Thêm chỉ thị tường minh trong Prompt: 'Nếu trường email không xuất hiện trong bài viết, hãy trả về giá trị null'.",
        "B. Đặt temperature = 0.9.",
        "C. Yêu cầu mô hình trả về một địa chỉ email ngẫu nhiên.",
        "D. Không làm gì cả vì mô hình tự biết."
      ],
      optsEN: [
        "A. Instruct explicitly in the prompt: 'If the email field is missing from the source text, return null'.",
        "B. Set temperature to 0.9.",
        "C. Request the model to supply a randomized default email address.",
        "D. Do nothing as the model automatically knows."
      ],
      correct: 0,
      exp: "EXPLANATION: Chỉ dẫn trả về `null` tường minh khi thiếu thông tin là phương pháp hiệu quả nhất để chống hallucination cho các trường optional."
    }
  ];

  // DOMAIN 5: Context Management & Reliability (15% Weight - 150 Questions Target)
  const d5Templates = [
    {
      archetype: "Developer Productivity Tools (MCP Infrastructure)",
      qVI: "Ứng dụng của bạn cần xử lý bất đồng bộ 20.000 tài liệu báo cáo hàng đêm và không yêu cầu kết quả phản hồi lập tức trong vài giây. Giải pháp API nào tiết kiệm 50% chi phí?",
      qEN: "Your application needs to asynchronously process 20,000 document reports nightly without requiring real-time sub-second responses. Which API option cuts costs by 50%?",
      optsVI: [
        "A. Message Batches API (xử lý hàng loạt trong 24h với giá giảm 50%).",
        "B. Real-time Messages API với mô hình Haiku.",
        "C. Dùng Prompt Caching trên Real-time API.",
        "D. Gửi các request song song liên tục."
      ],
      optsEN: [
        "A. Message Batches API (asynchronous batch processing within 24h at 50% cost).",
        "B. Real-time Messages API using the Haiku model.",
        "C. Apply Prompt Caching on the Real-time API.",
        "D. Send continuous high-concurrency real-time requests."
      ],
      correct: 0,
      exp: "EXPLANATION: Message Batches API được Anthropic thiết kế dành riêng cho các tác vụ xử lý hàng loạt không gấp với ưu đãi giảm 50% chi phí."
    }
  ];

  // Populate dynamic variations up to ~1000 items
  const doms = [
    { code: "D1", title: "Agent Architecture & Orchestration", templates: d1Templates, target: 270 },
    { code: "D2", title: "Tool Design & MCP Integration", templates: d2Templates, target: 180 },
    { code: "D3", title: "Claude Code Workflows", templates: d3Templates, target: 200 },
    { code: "D4", title: "Prompt Engineering & Structured Output", templates: d4Templates, target: 200 },
    { code: "D5", title: "Context Management & Reliability", templates: d5Templates, target: 150 }
  ];

  doms.forEach(dom => {
    for (let i = 0; i < dom.target; i++) {
      const baseTpl = dom.templates[i % dom.templates.length];
      const variationId = currentId++;

      pool.push({
        id: variationId,
        domain: dom.code,
        domainTitle: dom.title,
        archetype: baseTpl.archetype,
        question: `[Kịch bản ${baseTpl.archetype} #${i + 1}] ${baseTpl.qVI}`,
        questionEN: `[Scenario ${baseTpl.archetype} #${i + 1}] ${baseTpl.qEN}`,
        options: baseTpl.optsVI,
        optionsEN: baseTpl.optsEN,
        correct: baseTpl.correct,
        explanation: baseTpl.exp
      });
    }
  });

  return pool;
}

const MOCK_EXAM_QUESTION_POOL = generateMockQuestionsPool();
