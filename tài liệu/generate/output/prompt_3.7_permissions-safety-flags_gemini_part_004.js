[
  {
    "id": "d3-b07-3.7-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-007",
    "scenarioSignature": {
      "testedPrinciple": "path glob matching scope in ignore configurations",
      "failureMode": "sensitive test fixture ingested into model context",
      "rootCause": "unconventional nested directory path missing from exclusion pattern",
      "requiredFix": "update ignore pattern with recursive glob matching target directory"
    },
    "questionEN": "A security audit of a microservice repository reveals that mock JWT signing keys located in tests/stubs/fixtures/legacy_auth/keys.pem were indexed into Claude Code's context window. The team's .claudeignore file only excludes secrets/, *.pem, and tests/fixtures/. Why did the sensitive key file evade the standard exclusion pattern, and what is the proper fix?",
    "question": "[d3-b07-3.7-007] Một cuộc kiểm tra bảo mật trong kho lưu trữ microservice phát hiện rằng các khóa ký JWT mẫu nằm trong tests/stubs/fixtures/legacy_auth/keys.pem đã bị nạp vào ngữ cảnh của Claude Code. File .claudeignore của nhóm chỉ loại trừ secrets/, *.pem, và tests/fixtures/. Tại sao file khóa nhạy cảm lại vượt qua được quy tắc loại trừ tiêu chuẩn và giải pháp đúng là gì?",
    "optionsEN": [
      "A. The .claudeignore file is ignored because Git tracks tests/stubs/fixtures/legacy_auth/keys.pem; run git rm --cached to force .claudeignore evaluation.",
      "B. .claudeignore does not support wildcards for file extensions; replace *.pem with explicit path rules for each key file.",
      "C. The standard exclusion tests/fixtures/ does not match the nested path tests/stubs/fixtures/; update .claudeignore to include tests/**/fixtures/ or **/keys.pem.",
      "D. Claude Code automatically bypasses .claudeignore rules for files inside subdirectories under tests/; add --disallowedTools ReadFile to restrict file access."
    ],
    "options": [
      "A. File .claudeignore bị bỏ qua vì Git đang theo dõi tests/stubs/fixtures/legacy_auth/keys.pem; chạy git rm --cached để buộc đánh giá .claudeignore.",
      "B. .claudeignore không hỗ trợ ký tự đại diện cho phần mở rộng file; thay thế *.pem bằng các quy tắc đường dẫn rõ ràng cho từng file khóa.",
      "C. Quy tắc loại trừ tiêu chuẩn tests/fixtures/ không khớp với đường dẫn lồng nhau tests/stubs/fixtures/; cập nhật .claudeignore thành tests/**/fixtures/ hoặc **/keys.pem.",
      "D. Claude Code tự động bỏ qua các quy tắc .claudeignore đối với các file nằm trong thư mục con dưới tests/; thêm --disallowedTools ReadFile để hạn chế truy cập file."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because .claudeignore functions independently of Git tracking state and applies directly to Claude Code file access.",
      "Option B is incorrect because .claudeignore fully supports standard glob patterns including wildcard extensions like *.pem.",
      "Option C is correct because directory path patterns like tests/fixtures/ require exact path matching from the root, failing to match unconventional nested locations like tests/stubs/fixtures/ unless glob patterns like **/ are used.",
      "Option D is incorrect because Claude Code does not automatically bypass .claudeignore for test directories."
    ],
    "rationale": "Directory exclusion rules without recursive wildcards fail to match non-standard or deeply nested paths. Updating .claudeignore with glob patterns ensures unconventional fixture locations are correctly excluded from Claude Code's context window.",
    "explanation": "Chi tiết giải thích: Option C đúng vì đường dẫn tests/fixtures/ chỉ khớp với thư mục trực tiếp cấp đầu tiên, không khớp với thư mục lồng nhau tests/stubs/fixtures/. Việc sử dụng mẫu glob tests/**/fixtures/ hoặc **/keys.pem giúp loại trừ chính xác các file nhạy cảm ở mọi độ sâu. Option A sai vì .claudeignore hoạt động độc lập với Git tracking. Option B sai vì .claudeignore hỗ trợ wildcard *.pem. Option D sai vì Claude Code tuân thủ nghiêm ngặt .claudeignore và không tự động bỏ qua cho thư mục test.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  },
  {
    "id": "d3-b07-3.7-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-008",
    "scenarioSignature": {
      "testedPrinciple": "context window optimization via generated artifact exclusion",
      "failureMode": "context window exhaustion and degradation of model suggestions",
      "rootCause": "indexing large vendor dependencies and auto-generated build files",
      "requiredFix": "exclude build outputs and third-party vendor directories in ignore configuration"
    },
    "questionEN": "Developers working on a large web application notice that Claude Code frequently hits context window limits and provides inaccurate refactoring suggestions. Diagnostic logs reveal that Claude Code is reading compiled assets in dist/, generated protobuf stubs in src/generated/, and third-party dependencies in node_modules/. What .claudeignore strategy should be implemented to resolve this performance and quality degradation?",
    "question": "[d3-b07-3.7-008] Các lập trình viên làm việc trên một ứng dụng web lớn nhận thấy Claude Code thường xuyên chạm giới hạn cửa sổ ngữ cảnh và đưa ra gợi ý tái cấu trúc không chính xác. Nhật ký chẩn đoán cho thấy Claude Code đang đọc các tệp đã biên dịch trong dist/, mã stub protobuf được tạo tự động trong src/generated/, và thư viện bên thứ ba trong node_modules/. Chiến lược .claudeignore nào cần triển khai để khắc phục tình trạng suy giảm hiệu năng và chất lượng này?",
    "optionsEN": [
      "A. Pass --allowedTools ReadFile during invocation to limit Claude Code's reading speed across build directories.",
      "B. Delete dist/ and node_modules/ from local disk before running Claude Code sessions.",
      "C. Configure .gitignore to track dist/ so that Claude Code treats compiled binaries as high-priority source code.",
      "D. Add dist/, src/generated/, and node_modules/ to .claudeignore to exclude auto-generated and vendor code from indexing."
    ],
    "options": [
      "A. Truyền --allowedTools ReadFile khi gọi lệnh để giới hạn tốc độ đọc của Claude Code trên các thư mục build.",
      "B. Xóa dist/ và node_modules/ khỏi đĩa cục bộ trước khi chạy các phiên Claude Code.",
      "C. Cấu hình .gitignore để theo dõi dist/ nhằm giúp Claude Code xử lý các tệp nhị phân đã biên dịch như mã nguồn ưu tiên cao.",
      "D. Thêm dist/, src/generated/, và node_modules/ vào .claudeignore để loại trừ mã tự động tạo và mã vendor khỏi quá trình đánh chỉ mục."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because --allowedTools ReadFile controls tool permission status, not file selection scope or indexing limits.",
      "Option B is incorrect because deleting operational build directories disrupts local development and build workflows.",
      "Option C is incorrect because tracking build artifacts in Git further clutters workspace history and does not prevent Claude Code from indexing them.",
      "Option D is correct because adding generated files and vendor directories (dist/, src/generated/, node_modules/) to .claudeignore prevents Claude Code from consuming tokens on irrelevant code, preserving context space for actual source logic."
    ],
    "rationale": "Excluding auto-generated artifacts and third-party vendor directories via .claudeignore prevents irrelevant code from consuming model context tokens, improving retrieval efficiency and response quality.",
    "explanation": "Chi tiết giải thích: Option D đúng vì các thư mục được tạo tự động như dist/, src/generated/ và thư viện vendor node_modules/ chứa lượng lớn mã nguồn không cần thiết, làm lãng phí token ngữ cảnh và giảm độ chính xác của mô hình. Thêm chúng vào .claudeignore giải quyết triệt để vấn đề. Option A sai vì --allowedTools quản lý quyền chạy công cụ chứ không lọc nội dung file. Option B sai vì xóa các thư mục này làm hỏng môi trường phát triển cục bộ. Option C sai vì việc theo dõi chúng trong .gitignore không giải quyết được vấn đề quá tải ngữ cảnh.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  }
]