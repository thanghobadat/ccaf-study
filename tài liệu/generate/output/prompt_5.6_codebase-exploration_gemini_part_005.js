[
  {
    "id": "d5-b10-5.6-009",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-009",
    "questionEN": "A software agent tasked with refactoring resilience logic in a legacy repository executes an exact string search tool: grep -rn \"error handling patterns\" src/. The command returns zero matching lines because the codebase implements error handling via custom exception classes like PaymentProcessingException and RetryableNetworkError without using the exact phrase \"error handling patterns\". Why is the agent's exploration strategy ineffective, and how should it be modified?",
    "question": "[d5-b10-5.6-009] Một agent được giao nhiệm vụ tái cấu trúc logic khôi phục lỗi trong kho lưu trữ legacy đã thực hiện công cụ tìm kiếm chuỗi chính xác: grep -rn \"error handling patterns\" src/. Câu lệnh trả về 0 dòng khớp vì codebase triển khai xử lý lỗi thông qua các lớp ngoại lệ tùy chỉnh như PaymentProcessingException và RetryableNetworkError mà không dùng cụm từ chính xác \"error handling patterns\". Tại sao chiến lược khám phá của agent không hiệu quả và cần sửa đổi như thế nào?",
    "optionsEN": [
      "A. The exact string grep tool is inappropriate for high-level architectural queries because concepts are expressed through varied syntax; the agent should use semantic code search to locate conceptually related error-handling implementations.",
      "B. The grep command failed because the search path src/ excluded root configuration files; the agent should rerun grep at root level with --ignore-case enabled.",
      "C. Grep cannot traverse nested directory structures by default; the agent must first build a full AST index of src/ using a language compiler before searching for regex patterns.",
      "D. Conceptual patterns require sequential line-by-line reading of every file in src/ to identify try-catch blocks rather than relying on automated search utilities."
    ],
    "options": [
      "A. Công cụ grep tìm kiếm chuỗi chính xác không phù hợp cho các truy vấn kiến trúc cấp cao vì các khái niệm được thể hiện qua cú pháp đa dạng; agent nên sử dụng tìm kiếm ngữ nghĩa (semantic search) để định vị các triển khai xử lý lỗi liên quan về mặt khái niệm.",
      "B. Câu lệnh grep thất bại vì đường dẫn tìm kiếm src/ bỏ qua các file cấu hình ở thư mục gốc; agent nên chạy lại grep ở cấp thư mục gốc với cờ --ignore-case.",
      "C. Grep không thể duyệt qua cấu trúc thư mục lồng nhau theo mặc định; agent trước tiên phải xây dựng chỉ mục AST đầy đủ của src/ bằng trình biên dịch trước khi tìm kiếm mẫu regex.",
      "D. Các mẫu khái niệm yêu cầu đọc tuần tự từng dòng của mọi file trong src/ để xác định các khối try-catch thay vì dựa vào các công cụ tìm kiếm tự động."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct) accurately identifies that grep looks for literal string matches, whereas conceptual inquiries like error handling patterns require semantic code search to find diverse exception implementations.",
      "Option B incorrectly attributes the failure to search scope or case sensitivity, but expanding grep scope still fails because the literal phrase does not exist in code comments or identifiers.",
      "Option C incorrectly claims grep cannot search nested directories recursively or requires an AST index, whereas grep -r handles nested directories but cannot perform semantic intent matching.",
      "Option D incorrectly suggests reading every file sequentially, which leads to context window saturation rather than using targeted semantic search."
    ],
    "rationale": "Grep is an exact text matching tool designed for explicit symbols or literals. When searching for architectural concepts or patterns (such as error handling), code implementations vary widely in naming and structure. Semantic search embeds code context to retrieve relevant logic regardless of exact phrasing, making it the appropriate tool for conceptual exploration.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A (Đúng): Grep hoạt động bằng cách tìm kiếm chính xác từng ký tự (literal text matching). Các truy vấn mang tính khái niệm như 'error handling patterns' không xuất hiện trực tiếp dưới dạng chuỗi văn bản trong code mà được thể hiện qua các cấu trúc lệnh, lớp ngoại lệ tùy chỉnh. Tìm kiếm ngữ nghĩa (semantic search) sử dụng vector embeddings để hiểu ý nghĩa khái niệm và trả về các đoạn code xử lý lỗi liên quan.\\n- Lựa chọn B (Sai): Việc mở rộng phạm vi lên thư mục gốc hay bật cờ không phân biệt hoa thường (--ignore-case) vẫn sẽ trả về 0 kết quả vì cụm từ 'error handling patterns' hoàn toàn không tồn tại trong mã nguồn.\\n- Lựa chọn C (Sai): Cờ -r trong grep đã duyệt đệ quy qua tất cả thư mục con; thất bại không phải do duyệt thư mục hay thiếu chỉ mục AST mà do bản chất của tìm kiếm chuỗi chính xác.\\n- Lựa chọn D (Sai): Đọc tuần tự toàn bộ file sẽ nhanh chóng làm quá tải cửa sổ ngữ cảnh (context window explosion) và lãng phí tài nguyên token; phương pháp tối ưu là sử dụng semantic search để khoanh vùng file cần đọc.",
    "scenarioSignature": {
      "testedPrinciple": "semantic search for conceptual code exploration",
      "failureMode": "zero search results when querying architectural concepts",
      "rootCause": "using exact substring search for conceptual inquiry",
      "requiredFix": "execute semantic search to retrieve conceptually relevant code"
    },
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  },
  {
    "id": "d5-b10-5.6-010",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-010",
    "scenarioSignature": {
      "testedPrinciple": "exclusion of generated build artifacts during codebase exploration",
      "failureMode": "modifications overwritten during automated build process",
      "rootCause": "unignored build output directory allowed agent to target compiled JavaScript instead of TypeScript source",
      "requiredFix": "add build output directories to ignore configuration files"
    },
    "questionEN": "An AI coding agent working on a TypeScript project receives a task to fix a calculation bug in PaymentService. During search, the agent's file list includes dist/services/PaymentService.js because dist/ is omitted from .gitignore and .claudeignore. The agent modifies dist/services/PaymentService.js directly, passing unit tests temporarily, but the changes are erased during the next tsc build step. What is the root cause of this exploration failure and the correct fix?",
    "question": "[d5-b10-5.6-010] Một agent lập trình AI làm việc trên dự án TypeScript nhận nhiệm vụ sửa lỗi tính toán trong PaymentService. Trong quá trình tìm kiếm, danh sách file của agent bao gồm dist/services/PaymentService.js vì thư mục dist/ bị bỏ quên không thêm vào .gitignore và .claudeignore. Agent sửa trực tiếp file dist/services/PaymentService.js, vượt qua unit test tạm thời, nhưng các thay đổi bị xóa sạch trong bước build tsc tiếp theo. Nguyên nhân gốc rễ của thất bại khám phá này và biện pháp khắc phục đúng là gì?",
    "optionsEN": [
      "A. The agent failed to execute npm run build with the --watch flag before editing; the fix is to enable hot reloading so changes in dist/ sync back to .ts files automatically.",
      "B. The agent explored generated build artifacts because dist/ was not excluded from context configuration; .gitignore or ignore rules must include dist/ so the agent targets TypeScript source files in src/.",
      "C. TypeScript compiler tsc requires explicit write permissions to edit .js files; the agent must run chmod +w on dist/ before making edits.",
      "D. Generated .js files require source map files (.js.map) to be committed alongside them; adding source maps allows the agent to update .ts and .js files simultaneously."
    ],
    "options": [
      "A. Agent đã không thực hiện npm run build với cờ --watch trước khi chỉnh sửa; cách khắc phục là bật hot reloading để thay đổi trong dist/ tự động đồng bộ ngược lại các file .ts.",
      "B. Agent đã khám phá các artifact build được tạo ra do dist/ không bị loại trừ khỏi cấu hình ngữ cảnh; cần cấu hình .gitignore hoặc quy tắc ignore để thêm dist/, đảm bảo agent chỉ nhắm vào mã nguồn TypeScript trong src/.",
      "C. Trình biên dịch TypeScript tsc yêu cầu quyền ghi rõ ràng để chỉnh sửa file .js; agent phải chạy chmod +w trên dist/ trước khi thực hiện thay đổi.",
      "D. Các file .js được tạo ra yêu cầu file source map (.js.map) phải được commit cùng; việc thêm source map cho phép agent cập nhật đồng thời cả file .ts và .js."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A incorrectly suggests watching build output will sync compiled JavaScript back to TypeScript source, which is impossible as compilation is a one-way transformation from .ts to .js.",
      "Option B (Correct) accurately identifies that unignored build artifacts in dist/ led the agent to modify compiled code instead of source files, and adding dist/ to ignore rules prevents editing ephemeral output.",
      "Option C incorrectly blames file system permissions for the build overwrite, whereas tsc routinely overwrites dist/ contents regardless of manual edits.",
      "Option D incorrectly claims source maps allow simultaneous bidirectional editing, when source maps are debugging metadata rather than a mechanism for editing source code through compiled artifacts."
    ],
    "rationale": "Build output directories (like dist/, build/, or node_modules/) contain derived artifacts generated from source code. When ignore rules like .gitignore or .claudeignore are missing these paths, an AI agent may read and modify compiled output instead of the primary source code. Manual edits to compiled artifacts are silently overwritten during compilation. Explicitly excluding generated directories ensures the agent operates strictly on editable source code.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Lựa chọn A (Sai): Trình biên dịch không thể đồng bộ ngược từ JavaScript đã biên dịch về TypeScript nguồn. Cờ --watch chỉ biên dịch lại từ .ts sang .js khi mã nguồn thay đổi.\n- Lựa chọn B (Đúng): Khi các thư mục chứa artifact tự động (như dist/, build/, out/) không được khai báo trong .gitignore hoặc .claudeignore, agent sẽ coi chúng là mã nguồn hợp lệ và sửa trực tiếp file compiled .js. Kết quả là khi lệnh build (tsc) chạy, toàn bộ file trong dist/ bị ghi đè và mất thay đổi. Việc cấu hình loại trừ dist/ buộc agent chỉ tìm kiếm và sửa đổi mã nguồn trong src/.\n- Lựa chọn C (Sai): Nguyên nhân thay đổi bị mất là do tsc ghi đè lại file dist/ khi biên dịch, không liên quan đến quyền ghi tệp chmod +w trong hệ thống tệp.\n- Lựa chọn D (Sai): Source map (.js.map) phục vụ mục đích debug giúp ánh xạ dòng lệnh Javascript về dòng lệnh TypeScript tương ứng, không có tính năng cho phép đồng bộ chỉnh sửa hai chiều.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  }
]