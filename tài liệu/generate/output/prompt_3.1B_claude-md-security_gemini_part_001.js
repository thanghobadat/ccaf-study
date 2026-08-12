[
  {
    "id": "d3-b06-B-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-001",
    "questionEN": "During an automated code generation session, a software developer asks Claude Code to generate a sample configuration file config.example.json based on the project's environment variables. The repository root contains an active .env file with OPENAI_API_KEY=\"sk- proj - 8a9b7c6d...\". Because .env is omitted from .claudeignore, Claude Code reads the .env file and hardcodes the live production OPENAI_API_KEY string into config.example.json. What is the canonical root cause and recommended solution to prevent Claude Code from inspecting sensitive key files?",
    "question": "[d3-b06-B-001] Trong quá trình tự động sinh mã nguồn, một lập trình viên yêu cầu Claude Code tạo tệp cấu hình mẫu config.example.json dựa trên các biến môi trường của dự án. Thư mục gốc chứa tệp .env với giá trị OPENAI_API_KEY=\"sk - proj - 8a9b7c6d...\". Do tệp .env không được khai báo trong .claudeignore, Claude Code đã đọc tệp .env và ghi cứng khóa OPENAI_API_KEY thực tế vào config.example.json. Nguyên nhân gốc rễ và giải pháp chuẩn hóa để ngăn Claude Code truy cập các tệp chứa khóa bí mật là gì?",
    "optionsEN": [
      "A. The .env file is missing from .claudeignore; adding .env to .claudeignore completely blocks Claude Code from reading or referencing the sensitive file during context ingestion.",
      "B. The root CLAUDE.md lacks a behavioral rule; adding \"Do not read.env files\" to CLAUDE.md enforces a hard file-level access block.",
      "C. The .env file is untracked in Git; adding .env to .gitignore automatically prevents Claude Code from inspecting local filesystem contents.",
      "D. Tool permissions are misconfigured; setting allowedTools: [\"!FileRead\"] in .claude/config.json is the standard pattern for restricting secret file reads."
    ],
    "options": [
      "A. Tệp .env bị thiếu trong .claudeignore; thêm .env vào .claudeignore sẽ ngăn triệt để Claude Code đọc hoặc tham chiếu tệp nhạy cảm trong quá trình thu thập ngữ cảnh.",
      "B. Tệp CLAUDE.md ở thư mục gốc thiếu quy tắc hành vi; thêm quy tắc \"Do not read.env files\" vào CLAUDE.md sẽ tạo ra rào cản truy cập tệp cấp hệ thống.",
      "C. Tệp .env chưa được theo dõi trong Git; thêm .env vào .gitignore sẽ tự động ngăn Claude Code quét nội dung tệp trên hệ thống tệp cục bộ.",
      "D. Phân quyền công cụ bị cấu hình sai; thiết lập allowedTools: [\"!FileRead\"] trong .claude/config.json là mẫu chuẩn để giới hạn việc đọc tệp bí mật."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (.env missing from .claudeignore): Correct. .claudeignore uses standard glob patterns to strip specified files from Claude's context window entirely, preventing secret leakage during repository scanning or tool operations.",
      "Option B (CLAUDE.md behavioral rule): Incorrect. CLAUDE.md provides natural language system guidance for model behavior, but it does not restrict low-level file indexing or tool visibility; sensitive files must be excluded via .claudeignore.",
      "Option C (Adding to .gitignore): Incorrect. While .gitignore prevents files from being committed to source control, Claude Code inspects local unignored workspace files unless they are explicitly listed in .claudeignore.",
      "Option D (Disabling FileRead tool): Incorrect. Disabling the file reading tool globally or via permission flags prevents normal code operation across the entire codebase rather than specifically target-masking secret files via .claudeignore."
    ],
    "rationale": ".claudeignore is the canonical mechanism designed to exclude sensitive files, secrets, and large binaries from Claude Code's visibility entirely. When a file like .env is omitted from .claudeignore, Claude Code reads its raw text when retrieving repository context, leading to secrets being exposed or embedded in generated artifacts. Adding .env to .claudeignore ensures Claude Code cannot read or reference it.",
    "explanation": "Đáp án đúng là A.\\nTệp .claudeignore sử dụng cú pháp glob tương tự .gitignore để ẩn hoàn toàn các tệp và thư mục nhạy cảm khỏi tầm nhìn của Claude Code. Khi .env không có trong .claudeignore, Claude Code có thể đọc nội dung tệp này và đưa thông tin bí mật như API key vào kết quả sinh mã.\\n\\nB sai vì CLAUDE.md chỉ định hướng hành vi bằng ngôn ngữ tự nhiên, không thể chặn kỹ thuật khả năng đọc tệp của mô hình khi tệp nằm trong không gian làm việc.\\nC sai vì .gitignore chỉ ngăn Git theo dõi tệp, Claude Code vẫn quét các tệp cục bộ nếu chúng không được liệt kê trong .claudeignore.\\nD sai vì việc tắt hoặc hạn chế công cụ FileRead sẽ làm hỏng khả năng đọc các tệp mã nguồn hợp lệ khác của Claude Code, thay vì chỉ ẩn các tệp bí mật như .claudeignore thực hiện.",
    "scenarioSignature": {
      "testedPrinciple": "file exclusion via .claudeignore to prevent secret exposure in prompt context",
      "failureMode": "sensitive API key included in generated configuration file",
      "rootCause": "absence of sensitive target file pattern in project .claudeignore",
      "requiredFix": "add target key file pattern to .claudeignore to exclude it from model context"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-002",
    "questionEN": "A security engineering team maintains a repository containing custom HTTPS backend services. Private TLS certificates and key files are stored locally in the /secrets/ directory (e.g., /secrets/server.key and /secrets/server.crt). While helping refactor an Express.js server in src/server.ts, Claude Code reads /secrets/server.crt and embeds raw PEM certificate header strings directly into the suggested TLS configuration code block. What structural configuration change is required to ensure Claude Code cannot view or process any files within /secrets/?",
    "question": "[d3-b06-B-002] Một đội ngũ kỹ sư bảo mật quản lý kho chứa mã nguồn dịch vụ backend HTTPS. Các tệp chứng chỉ TLS và khóa riêng tư được lưu cục bộ trong thư mục /secrets/ (ví dụ: /secrets/server.key và /secrets/server.crt). Trong quá trình hỗ trợ tái cấu trúc máy chủ Express.js tại src/server.ts, Claude Code đã đọc /secrets/server.crt và chèn trực tiếp các chuỗi thẻ PEM của chứng chỉ vào đoạn mã cấu hình TLS được gợi ý. Thay đổi cấu trúc nào là bắt buộc để đảm bảo Claude Code hoàn toàn không thể xem hoặc xử lý bất kỳ tệp nào trong /secrets/?",
    "optionsEN": [
      "A. Add @import /secrets/CLAUDE.md into the project root CLAUDE.md to establish secret handling directives across all subdirectories.",
      "B. Add /secrets/ to .claudeignore in the project root so that all files in that directory are completely excluded from Claude Code's file context.",
      "C. Change host OS file permissions using chmod 600 /secrets/* to deny process-level read access to Claude Code's local CLI process.",
      "D. Place a CLAUDE.md file inside /secrets/ with the rule \"Do not output PEM file strings\" to suppress secret display in code output."
    ],
    "options": [
      "A. Thêm chỉ thị @import /secrets/CLAUDE.md vào CLAUDE.md ở thư mục gốc để thiết lập hướng dẫn xử lý bí mật cho toàn bộ thư mục con.",
      "B. Thêm /secrets/ vào .claudeignore ở thư mục gốc để tất cả các tệp trong thư mục đó bị loại bỏ hoàn toàn khỏi ngữ cảnh tệp của Claude Code.",
      "C. Thay đổi quyền tệp trên hệ điều hành bằng chmod 600 /secrets/* để từ chối quyền đọc ở cấp tiến trình đối với Claude Code CLI.",
      "D. Tạo tệp CLAUDE.md bên trong /secrets/ chứa quy tắc \"Do not output PEM file strings\" để ẩn nội dung tệp bí mật khỏi mã nguồn đầu ra."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A (Adding @import directive): Incorrect. The @import directive in CLAUDE.md pulls rule text from another file into context, but it does not block file reading or directory scanning for sensitive data.",
      "Option B (Adding /secrets/ to .claudeignore): Correct. Placing directory paths like /secrets/ inside .claudeignore strips all contained files (certs, keys, tokens) from Claude Code's file search, read tools, and prompt context.",
      "Option C (Host OS chmod permissions): Incorrect. Adjusting host permissions does not address Claude's context ingestion if the user running Claude Code CLI has read access; .claudeignore is the explicit mechanism for tool visibility bounds.",
      "Option D (Subdirectory CLAUDE.md rule): Incorrect. A subdirectory CLAUDE.md provides prompt-level guidance, but does not prevent the model from loading certificate files into context during workspace analysis."
    ],
    "rationale": ".claudeignore controls file and directory visibility for Claude Code using glob syntax identical to .gitignore. To prevent secret credential leakage—such as private TLS key files or certificates located inside a /secrets/ folder—the /secrets/ pattern must be added to .claudeignore. This guarantees that Claude Code will never read, index, or output any material from that directory.",
    "explanation": "Đáp án đúng là B.\\nThêm mẫu đường dẫn thư mục /secrets/ vào .claudeignore sẽ ẩn hoàn toàn thư mục này khỏi các công cụ tìm kiếm và đọc tệp của Claude Code, đảm bảo các chứng chỉ và khóa riêng tư không bị đưa vào ngữ cảnh mô hình.\\n\\nA sai vì chỉ thị @import trong CLAUDE.md chỉ dùng để nạp các quy tắc hướng dẫn bổ sung, không có tính năng chặn khả năng đọc hoặc quét thư mục.\\nC sai vì thay đổi quyền hệ điều hành không giải quyết vấn đề ở cấp độ cấu hình của Claude Code nếu tiến trình CLI chạy dưới quyền người dùng có khả năng truy cập tệp.\\nD sai vì tệp CLAUDE.md trong thư mục con chỉ cung cấp quy tắc ứng xử bằng văn bản, không ngăn được việc Claude Code đọc nội dung tệp chứng chỉ vào ngữ cảnh khi phân tích thư mục.",
    "scenarioSignature": {
      "testedPrinciple": "directory-level isolation via .claudeignore for sensitive credential assets",
      "failureMode": "private SSL certificate contents embedded into suggested source code",
      "rootCause": "omission of credential directory path from project .claudeignore",
      "requiredFix": "add secret directory pattern to .claudeignore to exclude credential files from context"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]