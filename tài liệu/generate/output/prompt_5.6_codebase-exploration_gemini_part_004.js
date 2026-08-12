[
  {
    "id": "d5-b10-5.6-007",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-007",
    "scenarioSignature": {
      "testedPrinciple": "entry point top down exploration hierarchy",
      "failureMode": "loss of architectural context from arbitrary file order",
      "rootCause": "inspecting low level helper functions before top level entry points",
      "requiredFix": "inspect top level entry points before low level helper functions"
    },
    "questionEN": "An autonomous refactoring agent is assigned to modify the checkout retry logic inside PaymentService. Instead of locating architectural entry points, the agent reads files in arbitrary directory order, spending its first 15 tool calls viewing stringUtils.ts, mathHelpers.ts, and dateFormatter.ts. Consequently, the agent exhausts 35% of its context window on standalone helper functions and fails to understand how PaymentService interacts with PaymentGateway or handles transaction rollbacks. How should the exploration sequence be restructured?",
    "question": "[d5-b10-5.6-007] Một agent tái cấu trúc tự động được giao nhiệm vụ sửa đổi logic thử lại thanh toán bên trong PaymentService. Thay vì xác định các điểm vào kiến trúc, agent đọc các tệp theo thứ tự thư mục ngẫu nhiên, dành 15 tool call đầu tiên để xem stringUtils.ts, mathHelpers.ts và dateFormatter.ts. Kết quả là agent tiêu tốn 35% cửa sổ ngữ cảnh cho các hàm tiện ích độc lập và không thể hiểu cách PaymentService tương tác với PaymentGateway hoặc xử lý hoàn tác giao dịch. Trình tự khám phá nên được tái cấu trúc như thế nào?",
    "optionsEN": [
      "A. Run a repository-wide semantic search on all helper methods inside utils/ to build a comprehensive index before opening PaymentService.",
      "B. Load all source files from utils/ and services/ concurrently into context to ensure full visibility of low-level dependencies.",
      "C. Inspect top-level entry points such as package.json, app.ts, and the public interface of PaymentService before reading utility implementation details.",
      "D. Perform a Grep regex search across all utility files to extract exported functions and insert their signatures into the initial system prompt."
    ],
    "options": [
      "A. Chạy tìm kiếm ngữ nghĩa toàn bộ kho lưu trữ trên tất cả các phương thức tiện ích trong utils/ để xây dựng chỉ mục toàn diện trước khi mở PaymentService.",
      "B. Tải đồng thời tất cả các tệp nguồn từ utils/ và services/ vào ngữ cảnh để đảm bảo hiển thị đầy đủ các phụ thuộc cấp thấp.",
      "C. Kiểm tra các điểm vào cấp cao như package.json, app.ts và giao diện công khai của PaymentService trước khi đọc chi tiết triển khai tiện ích.",
      "D. Thực hiện tìm kiếm Grep regex trên tất cả các tệp tiện ích để trích xuất các hàm được xuất và chèn chữ ký của chúng vào system prompt ban đầu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because indexing low-level utility helpers inside utils/ first perpetuates the bottom-up anti-pattern, consuming tokens on helper methods before establishing the high-level control flow.",
      "Option B is incorrect because bulk loading all files from utils/ and services/ bloats the context window with irrelevancies instead of incrementally discovering needed dependencies top-down.",
      "Option C is correct because exploring entry points first (package.json, app.ts) and high-level service interfaces (PaymentService) builds an architectural map so utility files are read only when directly relevant.",
      "Option D is incorrect because injecting regex-extracted utility signatures into the system prompt floods the context with low-level details that do not clarify how PaymentService handles retries or state rollbacks."
    ],
    "rationale": "Reading low-level helper scripts before understanding application entry points and core domain models wastes context on peripheral details. Following a top-down exploration strategy—starting with project manifests, main router/entry files, and core service contracts—ensures the agent builds a mental map of system architecture before diving into supporting implementation files.",
    "explanation": "Trong chiến lược khám phá mã nguồn, việc đọc các tệp tiện ích cấp thấp (helper scripts) trước khi hiểu điểm vào chính của ứng dụng và các service cốt lõi là một anti-pattern (bottom-up exploration). Việc này làm lãng phí ngữ cảnh vào các chi tiết không quan trọng.\n\n- Phương án A sai vì việc index các helper trong utils/ trước vẫn tiếp tục sai lầm khám phá từ dưới lên, làm tốn token cho các tiện ích trước khi hiểu luồng điều khiển.\n- Phương án B sai vì tải hàng loạt tệp từ utils/ và services/ sẽ làm bùng nổ ngữ cảnh thay vì khám phá cuốn chiếu theo cấp bậc từ trên xuống.\n- Phương án C đúng vì kiểm tra các điểm vào cấp cao (package.json, app.ts) và interface của PaymentService giúp agent dựng sơ đồ kiến trúc trước, sau đó chỉ đọc các helper khi thực sự cần thiết.\n- Phương án D sai vì việc trích xuất signature của helper vào system prompt làm tràn ngập chi tiết cấp thấp không giúp ích cho việc hiểu logic thử lại và rollback của PaymentService.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  },
  {
    "id": "d5-b10-5.6-008",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-008",
    "scenarioSignature": {
      "testedPrinciple": "targeted incremental search over batch file reading",
      "failureMode": "massive context token consumption from batch file loading",
      "rootCause": "reading entire directory tree before identifying relevant target files",
      "requiredFix": "apply targeted pattern search to locate and read relevant files incrementally"
    },
    "questionEN": "A maintenance workflow MigrationAgent is assigned to update deprecated calls from v1/auth to v2/auth across a microservice repository. Before executing any modifications, the agent issues sequential view_file tool calls across all 150 files in the codebase. This batch exploration consumes 80,000 tokens of context memory before any code is edited, causing high latency and context truncation on downstream synthesis tasks. How should the agent's codebase exploration workflow be redesigned?",
    "question": "[d5-b10-5.6-008] Một quy trình bảo trì MigrationAgent được giao nhiệm vụ cập nhật các lời gọi không còn được hỗ trợ từ v1/auth sang v2/auth trên toàn bộ kho lưu trữ microservice. Trước khi thực hiện bất kỳ sửa đổi nào, agent phát ra các tool call view_file tuần tự trên tất cả 150 tệp trong codebase. Việc khám phá hàng loạt này tiêu tốn 80.000 token bộ nhớ ngữ cảnh trước khi bất kỳ mã nào được chỉnh sửa, gây ra độ trễ cao và cắt tỉa ngữ cảnh trong các tác vụ tổng hợp hạ nguồn. Quy trình khám phá mã nguồn của agent nên được thiết kế lại như thế nào?",
    "optionsEN": [
      "A. Expand the context window limit to 200,000 tokens to ensure all 150 files fit into the prompt without triggering truncation warnings.",
      "B. Summarize the contents of all 150 files using an auxiliary LLM pass and insert the combined summary into the main agent context.",
      "C. Execute parallel tool calls to fetch all 150 file contents simultaneously to minimize cumulative network round-trip time.",
      "D. Use file-matching globs to list directory structure, run a target Grep search for v1/auth, and selectively view_file only the matching files incrementally."
    ],
    "options": [
      "A. Mở rộng giới hạn cửa sổ ngữ cảnh lên 200.000 token để đảm bảo tất cả 150 tệp nằm gọn trong prompt mà không kích hoạt cảnh báo cắt tỉa.",
      "B. Tóm tắt nội dung của tất cả 150 tệp bằng một lượt LLM phụ và chèn bản tóm tắt kết hợp vào ngữ cảnh agent chính.",
      "C. Thực hiện các tool call song song để lấy đồng thời tất cả 150 nội dung tệp nhằm giảm thiểu tổng thời gian khứ hồi mạng.",
      "D. Sử dụng glob khớp tệp để liệt kê cấu trúc thư mục, chạy tìm kiếm Grep mục tiêu cho v1/auth và chỉ view_file có chọn lọc các tệp phù hợp theo kiểu cuốn chiếu."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because expanding the context window to 200K tokens treats the symptom of high token consumption without eliminating the waste of loading hundreds of unreferenced files.",
      "Option B is incorrect because running an auxiliary summarization pass on all 150 files still performs unnecessary upfront batch processing on files unrelated to v1/auth.",
      "Option C is incorrect because making parallel tool calls speeds up network fetch time but leaves the primary failure mode intact—consuming 80K tokens of context on irrelevant files.",
      "Option D is correct because using Glob to map structure, Grep to pinpoint exact occurrences of v1/auth, and reading only relevant target files follows the optimal incremental exploration pattern (Glob -> Grep -> Read)."
    ],
    "rationale": "Batch-reading all files in a codebase upfront wastes context tokens on irrelevant files and risks context truncation. The optimal codebase exploration strategy uses a multi-tier search funnel: Glob to discover directory layouts, Grep to locate precise symbols or references, and targeted file reads only on matching files, preserving context memory for planning and implementation.",
    "explanation": "Đọc hàng loạt tất cả các tệp trong dự án trước khi bắt đầu viết mã là một sai lầm phổ biến, dẫn đến việc lãng phí hàng chục nghìn token ngữ cảnh vào các tệp không liên quan.\n\n- Phương án A sai vì việc mở rộng cửa sổ ngữ cảnh lên 200K token chỉ xử lý phần ngọn mà không giải quyết tận gốc nguyên nhân lãng phí bộ nhớ do nạp tệp thừa.\n- Phương án B sai vì việc tóm tắt cả 150 tệp vẫn thực hiện xử lý hàng loạt trước không cần thiết đối với những tệp hoàn toàn không chứa v1/auth.\n- Phương án C sai vì các yêu cầu song song chỉ làm giảm độ trễ mạng nhưng giữ nguyên vấn đề tiêu tốn 80K token ngữ cảnh.\n- Phương án D đúng vì tuân thủ chiến lược khám phá chuẩn (Glob -> Grep -> Read): dùng Glob để nắm cấu trúc, dùng Grep tìm chính xác v1/auth, và chỉ đọc những tệp thực sự liên quan theo từng bước.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  }
]