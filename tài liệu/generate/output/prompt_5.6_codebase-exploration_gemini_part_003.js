[
  {
    "id": "d5-b10-5.6-005",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-005",
    "scenarioSignature": {
      "testedPrinciple": "interface contract review before internal implementation analysis",
      "failureMode": "breaking changes introduced to public api consumers",
      "rootCause": "reading low-level internal helper logic before public interface specifications",
      "requiredFix": "inspect public type definitions and exported interfaces before internal logic"
    },
    "questionEN": "An AI development agent tasked with modifying the PaymentGateway module in BillingService immediately opens and reads the internal implementation helper file src/internal/stripe_adapter.ts (1,200 lines of low-level HTTP retry and payload transformation logic) without inspecting the public interface file src/interfaces/IPaymentProvider.ts. The agent observes that processPayment() returns an internal RawStripeResponse struct and refactors the method signature to return StripeChargeId string directly. When deployed, downstream consumer services crash with TypeError: Cannot read properties of undefined (reading 'status') because external consumers relied on the IPaymentProvider interface contract wrapping the response in PaymentResult. What exploration anti-pattern caused this failure?",
    "question": "[d5-b10-5.6-005] Một AI agent được giao nhiệm vụ chỉnh sửa module PaymentGateway trong dịch vụ BillingService đã lập tức mở và đọc file triển khai nội bộ src/internal/stripe_adapter.ts (1.200 dòng xử lý retry HTTP và chuyển đổi payload) mà không kiểm tra file giao diện công khai src/interfaces/IPaymentProvider.ts. Agent nhận thấy processPayment() trả về một struct nội bộ RawStripeResponse và đã refactor chữ ký phương thức để trả về chuỗi StripeChargeId trực tiếp. Khi triển khai, các dịch vụ tiêu thụ phía hạ nguồn bị sập với lỗi TypeError: Cannot read properties of undefined (reading 'status') do các dịch vụ bên ngoài phụ thuộc vào hợp đồng interface IPaymentProvider đóng gói kết quả trong PaymentResult. Anti-pattern khám phá nào đã gây ra thất bại này?",
    "optionsEN": [
      "A. Reading internal implementation code before reviewing the public interface definition, leading the agent to misunderstand the exposed API contract.",
      "B. Failing to run semantic search across src/internal/ to discover unexported helper methods before modifying the interface contract.",
      "C. Inspecting .gitignore rules before viewing src/interfaces/IPaymentProvider.ts, causing dependency resolution errors during compilation.",
      "D. Reading the root package.json file prior to examining stripe_adapter.ts, which loaded redundant module definitions into context."
    ],
    "options": [
      "A. Đọc mã triển khai chi tiết nội bộ trước khi xem xét định nghĩa giao diện công khai, khiến agent hiểu sai hợp đồng API được công bố.",
      "B. Không chạy tìm kiếm ngữ nghĩa (semantic search) trên thư mục src/internal/ để phát hiện các phương thức helper chưa được export trước khi sửa đổi hợp đồng interface.",
      "C. Kiểm tra các quy tắc .gitignore trước khi xem src/interfaces/IPaymentProvider.ts, gây ra lỗi phân giải phụ thuộc trong quá trình biên dịch.",
      "D. Đọc file package.json ở thư mục gốc trước khi kiểm tra stripe_adapter.ts, làm tải các định nghĩa module dư thừa vào ngữ cảnh."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: By diving straight into the internal implementation file (stripe_adapter.ts) instead of reading the public interface contract (IPaymentProvider.ts) first, the agent assumed internal helper return types represented the public contract, resulting in a breaking signature change.",
      "Option B is incorrect: Semantic search locates conceptually related code across files but does not establish API contract boundaries; reading public interface definitions first is required to understand contract expectations.",
      "Option C is incorrect: Viewing .gitignore affects file exclusion rules during directory traversal but has no bearing on contract understanding or method signature compatibility.",
      "Option D is incorrect: Reading package.json is a recommended first step to understand high-level project dependencies and entry points; it did not cause the breaking signature change."
    ],
    "rationale": "Diving into internal implementation code first blinds the agent to abstract interface guarantees. Reading public interface contracts before implementation details ensures that modifications preserve external API expectations and prevent breaking downstream consumers.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n\n- Đáp án A đúng (Đáp án phân công: A): Việc đi thẳng vào file triển khai nội bộ (stripe_adapter.ts) thay vì xem xét hợp đồng interface công khai (IPaymentProvider.ts) trước đã khiến agent nhầm lẫn giữa kiểu trả về nội bộ và hợp đồng công khai được export. Đọc interface/contract trước là nguyên tắc cốt lõi trong khám phá codebase để đảm bảo tính tương thích với các service tiêu thụ.\n- Đáp án B sai: Tìm kiếm ngữ nghĩa giúp tìm mã nguồn liên quan theo khái niệm nhưng không đưa ra bức tranh về ranh giới hợp đồng API; việc đọc định nghĩa interface công khai mới quyết định cấu trúc dữ liệu xuất ra.\n- Đáp án C sai: Việc xem file .gitignore chỉ ảnh hưởng đến việc bỏ qua file khi duyệt thư mục, không liên quan đến việc hiểu sai chữ ký phương thức API.\n- Đáp án D sai: Đọc package.json là bước khởi đầu chuẩn để nắm bắt điểm vào (entry point) và thư viện phụ thuộc của dự án, không phải nguyên nhân gây ra lỗi phá vỡ chữ ký API.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  },
  {
    "id": "d5-b10-5.6-006",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-006",
    "scenarioSignature": {
      "testedPrinciple": "exclusion of generated and dependency directories during pattern matching",
      "failureMode": "context exhaustion from scanning massive dependency directories",
      "rootCause": "omitting dependency exclusion patterns like node_modules in file discovery queries",
      "requiredFix": "configure ignore patterns to exclude third-party dependency directories"
    },
    "questionEN": "An automated coding assistant running inside the ECommerceWeb repository attempts to map all TypeScript source files using the unconstrained pattern **/.ts. Because the query did not specify exclusion filters or check .claudeignore, the tool returned 84,200 file paths by recursively matching every package inside node_modules/ alongside project sources. This flooded the agent's context window with third-party library files, leading to a context length limit error (400 context_length_exceeded) before any actual application code could be inspected. How should the exploration command be structured to avoid scanning external dependencies?",
    "question": "[d5-b10-5.6-006] Một trợ lý lập trình tự động chạy trong kho mã nguồn ECommerceWeb cố gắng lập bản đồ toàn bộ các file nguồn TypeScript bằng cách sử dụng pattern không giới hạn **/.ts. Do câu truy vấn không chỉ định bộ lọc loại trừ và không kiểm tra .claudeignore, công cụ đã trả về 84.200 đường dẫn file bằng cách khớp đệ quy mọi gói phụ thuộc bên trong node_modules/ cùng với mã nguồn dự án. Điều này làm tràn cửa sổ ngữ cảnh của agent với các file thư viện bên thứ ba, dẫn đến lỗi vượt quá giới hạn ngữ cảnh (400 context_length_exceeded) trước khi bất kỳ mã ứng dụng thực tế nào được kiểm tra. Lệnh khám phá nên được cấu trúc như thế nào để tránh quét các thư viện phụ thuộc bên ngoài?",
    "optionsEN": [
      "A. Replace Glob pattern matching with sequential file reading (view_file) starting from the root directory down to each nested folder.",
      "B. Exclude dependency directories like node_modules/ and build outputs using exclusion patterns or configuration files such as .claudeignore.",
      "C. Switch from Glob file pattern search to exact text search (grep) across the entire repository without ignoring any directories.",
      "D. Increase the context window limit of the model to accommodate all 84,200 dependency paths in a single prompt context."
    ],
    "options": [
      "A. Thay thế việc khớp pattern Glob bằng cách đọc từng file tuần tự (view_file) bắt đầu từ thư mục gốc xuống các thư mục con.",
      "B. Loại trừ các thư mục phụ thuộc như node_modules/ và các đầu ra build bằng cách sử dụng các pattern loại trừ hoặc file cấu hình như .claudeignore.",
      "C. Chuyển từ tìm kiếm pattern file bằng Glob sang tìm kiếm văn bản chính xác (grep) trên toàn bộ kho mã nguồn mà không bỏ qua thư mục nào.",
      "D. Tăng giới hạn cửa sổ ngữ cảnh của mô hình để chứa toàn bộ 84.200 đường dẫn phụ thuộc trong một prompt đơn lẻ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Reading files sequentially without a map exacerbates context exhaustion and fails to provide a structural overview of project sources.",
      "Option B is correct: Adding explicit exclusion rules for generated artifacts and dependency paths (such as node_modules/ or dist/) ensures Glob matching targets only first-party source code, preventing context flooding.",
      "Option C is incorrect: Running grep across node_modules/ without exclusion filters will still search tens of thousands of third-party files, causing severe performance degradation and noise.",
      "Option D is incorrect: Expanding context limits is a brute-force approach that introduces massive token latency and noise without solving the root exploration anti-pattern."
    ],
    "rationale": "Excluding generated folders and third-party dependency directories (such as node_modules/ or build outputs) prevents directory exploration tools from returning tens of thousands of irrelevant file paths, preserving context window budget for project source code.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n\n- Đáp án A sai: Việc đọc từng file tuần tự mà không có bản đồ cấu trúc sẽ làm cạn kiệt ngữ cảnh nhanh hơn nữa và không cung cấp được cái nhìn tổng quan về kiến trúc dự án.\n- Đáp án B đúng (Đáp án phân công: B): Bổ sung các quy tắc loại trừ rõ ràng cho các artifact được sinh ra tự động và thư mục phụ thuộc (như node_modules/ hoặc dist/) thông qua pattern loại trừ hoặc file cấu hình (.claudeignore) đảm bảo lệnh Glob chỉ nhắm vào mã nguồn dự án, tránh làm tràn cửa sổ ngữ cảnh.\n- Đáp án C sai: Chạy grep trên toàn bộ kho mã nguồn bao gồm node_modules/ mà không loại trừ sẽ tiếp tục quét hàng chục nghìn file bên thứ ba, gây suy giảm hiệu năng nghiêm trọng và nhiễu kết quả.\n- Đáp án D sai: Tăng giới hạn ngữ cảnh là giải pháp brute-force tốn kém token, làm tăng độ trễ và nhiễu thông tin mà không giải quyết gốc rễ của anti-pattern khám phá.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  }
]