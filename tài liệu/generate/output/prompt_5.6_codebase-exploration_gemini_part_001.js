[
  {
    "id": "d5-b10-5.6-001",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-001",
    "scenarioSignature": {
      "testedPrinciple": "symbol search strategy selection",
      "failureMode": "high false positive search results diluting context window",
      "rootCause": "using semantic embedding search for exact symbol identifier instead of literal grep",
      "requiredFix": "switch to exact text or symbol grep search for known identifier"
    },
    "questionEN": "An AI coding agent executing tasks on a multi-repo service OrderBillingEngine needs to inspect the implementation of a known function named calculateTaxWithholding. The agent invokes semantic_search_codebase(query=\"calculateTaxWithholding\") which returns 47 vector-similarity matches (including applyTaxDiscount, calculateVAT, and withholdingRules), overwhelming the context window while burying the single target definition in tax_calculator.py. What exploration strategy should the agent adopt to efficiently isolate exact symbol definitions?",
    "question": "[d5-b10-5.6-001] Một AI coding agent thực thi tác vụ trên dịch vụ đa kho lưu trữ OrderBillingEngine cần kiểm tra việc triển khai của một hàm đã biết tên là calculateTaxWithholding. Agent gọi semantic_search_codebase(query=\"calculateTaxWithholding\") và nhận về 47 kết quả khớp dựa trên độ tương đồng vector (bao gồm applyTaxDiscount, calculateVAT, và withholdingRules), làm quá tải ngữ cảnh trong khi làm ẩn định nghĩa mục tiêu duy nhất trong tax_calculator.py. Agent nên áp dụng chiến lược khám phá nào để tách biệt hiệu quả các định nghĩa ký hiệu chính xác?",
    "optionsEN": [
      "A. Use literal pattern matching tools (grep_search) or symbol index queries instead of semantic search when searching for exact function identifiers.",
      "B. Increase the semantic search embedding threshold from 0.7 to 0.95 to eliminate related function returns.",
      "C. Read all files in the repository sequentially to locate where calculateTaxWithholding is defined.",
      "D. Execute a semantic search with longer natural language queries describing the internal tax calculation logic."
    ],
    "options": [
      "A. Sử dụng các công cụ khớp mẫu nguyên bản (grep_search) hoặc truy vấn chỉ mục ký hiệu thay vì tìm kiếm ngữ nghĩa khi tìm kiếm các định danh hàm chính xác.",
      "B. Tăng ngưỡng nhúng (embedding threshold) của tìm kiếm ngữ nghĩa từ 0.7 lên 0.95 để loại bỏ các hàm liên quan được trả về.",
      "C. Đọc tuần tự tất cả các tệp trong kho lưu trữ để xác định vị trí calculateTaxWithholding được định nghĩa.",
      "D. Thực thi tìm kiếm ngữ nghĩa với các truy vấn ngôn ngữ tự nhiên dài hơn mô tả logic tính thuế nội bộ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: When searching for known exact symbols like function or class names, exact string matching tools (such as Grep or AST symbol indexes) directly return precise locations without false positives, avoiding context window bloat.",
      "Option B is incorrect: Adjusting embedding similarity thresholds still relies on vector closeness, which cannot guarantee exact token matching for identifiers and may exclude the actual target if embedding distances vary.",
      "Option C is incorrect: Reading all files sequentially causes a context window explosion anti-pattern and wastes tokens on unrelated code.",
      "Option D is incorrect: Lengthening natural language prompts for semantic search increases vector conceptual scope and fails to target literal string instances of exact symbol names."
    ],
    "rationale": "Semantic search is designed for conceptual or natural language queries (e.g., 'where is tax calculated?'), whereas literal grep or symbol search is optimal for known exact identifier strings, avoiding context dilution.",
    "explanation": "Lựa chọn A là đáp án đúng. Khi đã biết chính xác tên định danh (như tên hàm calculateTaxWithholding), việc sử dụng các công cụ tìm kiếm chuỗi chính xác (Grep hoặc AST symbol index) sẽ trả về ngay lập tức vị trí tệp chính xác mà không tạo ra các kết quả nhiễu. Lựa chọn B sai vì thay đổi ngưỡng nhúng ngữ nghĩa vẫn dựa trên độ tương đồng vector, không đảm bảo tìm chính xác ký hiệu tên. Lựa chọn C sai vì đọc tất cả các tệp gây bùng nổ ngữ cảnh (context explosion). Lựa chọn D sai vì mở rộng câu truy vấn ngữ nghĩa làm tăng độ nhiễu chứ không giúp tìm kiếm chuỗi ký tự cố định.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  },
  {
    "id": "d5-b10-5.6-002",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-002",
    "scenarioSignature": {
      "testedPrinciple": "cross-file refactoring dependency graph analysis",
      "failureMode": "runtime AttributeError across decoupled callers after symbol rename",
      "rootCause": "refactoring function symbol without building cross-file dependency graph or caller reference graph",
      "requiredFix": "generate cross-module call/import dependency graph before renaming function symbols"
    },
    "questionEN": "An automated refactoring task in PaymentGatewayService requires an agent to rename processPaymentV2 to processPaymentV3 inside checkout.py. The agent edits checkout.py immediately without building a cross-module dependency graph. After deployment, integration tests fail with AttributeError across 9 caller files located in distant billing/, notifications/, and analytics/ directories. Which action would have prevented these broken caller references?",
    "question": "[d5-b10-5.6-002] Tác vụ tái cấu trúc tự động trong PaymentGatewayService yêu cầu agent đổi tên processPaymentV2 thành processPaymentV3 bên trong checkout.py. Agent đã chỉnh sửa checkout.py ngay lập tức mà không xây dựng biểu đồ phụ thuộc giữa các module (cross-module dependency graph). Sau khi triển khai, các bài kiểm thử tích hợp thất bại với lỗi AttributeError trên 9 tệp gọi nằm ở các thư mục billing/, notifications/, và analytics/ riêng biệt. Hành động nào lẽ ra đã ngăn chặn được các tham chiếu bị hỏng này?",
    "optionsEN": [
      "A. Run unit tests only on checkout.py after renaming the method to confirm local file syntactical correctness.",
      "B. Map import and call references across the codebase to locate all incoming dependencies before modifying the target symbol.",
      "C. Increase the LLM context window limit so the entire codebase fits into memory during edit generation.",
      "D. Replace the renamed function with a dynamic fallback wrapper using __getattr__ to swallow invalid attribute calls."
    ],
    "options": [
      "A. Chỉ chạy unit test trên checkout.py sau khi đổi tên phương thức để xác nhận tính đúng đắn về cú pháp của tệp cục bộ.",
      "B. Lập bản đồ tham chiếu import và lời gọi hàm trên toàn bộ codebase để xác định tất cả phụ thuộc đầu vào trước khi sửa đổi ký hiệu mục tiêu.",
      "C. Tăng giới hạn ngữ cảnh LLM để toàn bộ codebase nằm trong bộ nhớ khi tạo các thay đổi.",
      "D. Thay thế hàm đã đổi tên bằng một wrapper fallback động sử dụng __getattr__ để nuốt các lời gọi thuộc tính không hợp lệ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Running unit tests restricted to the modified target file ignores cross-module callers in external directories, failing to catch widespread runtime breaking changes.",
      "Option B is correct: Constructing an import and caller graph (via grep or language server reference searches) prior to symbol refactoring identifies every cross-file location requiring concurrent updating.",
      "Option C is incorrect: Simply increasing context length does not guarantee that the agent will discover or update hidden callers without explicit dependency tracing.",
      "Option D is incorrect: Using dynamic fallback wrappers masks root cause refactoring flaws and introduces unmaintainable runtime anti-patterns."
    ],
    "rationale": "Before undertaking cross-file refactoring, an agent must construct a dependency graph (import and call references) to ensure all caller sites across decoupled modules are identified and updated.",
    "explanation": "Lựa chọn B là đáp án đúng. Khi tái cấu trúc các ký hiệu (symbol) được chia sẻ giữa nhiều module, agent bắt buộc phải lập biểu đồ phụ thuộc (xác định tất cả nơi import và gọi hàm) trước khi tiến hành sửa đổi. Điều này đảm bảo 9 nơi gọi hàm ở các thư mục khác cũng được cập nhật đồng bộ. Lựa chọn A sai vì chỉ kiểm thử tệp cục bộ sẽ bỏ qua các lỗi liên tệp. Lựa chọn C sai vì tăng dung lượng context không tự động phát hiện các tham chiếu ẩn nếu không chủ động tìm kiếm phụ thuộc. Lựa chọn D sai vì việc dùng wrapper nuốt lỗi là anti-pattern che giấu lỗi thực sự.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  }
]