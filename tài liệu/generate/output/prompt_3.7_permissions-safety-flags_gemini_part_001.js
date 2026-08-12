[
  {
    "id": "d3-b07-3.7-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-001",
    "scenarioSignature": {
      "testedPrinciple": "glob pattern matching in ignore files for environment files",
      "failureMode": "exposure of sensitive credentials in variant environment files",
      "rootCause": "exact string matching rule omitting wildcards for environment extensions",
      "requiredFix": "update ignore rule using wildcard glob pattern"
    },
    "questionEN": "A software engineer configures .claudeignore in a repository with the entry .env to prevent Claude Code from reading environment secrets. During an automated refactoring session, Claude Code reads .env.production and embeds live database credentials into a generated test file. Why did .claudeignore fail to block access to .env.production, and what is the correct fix?",
    "question": "[d3-b07-3.7-001] Một kỹ sư phần mềm cấu hình .claudeignore trong kho lưu trữ với quy tắc .env để ngăn Claude Code đọc các bí mật môi trường. Trong một phiên tự động refactor, Claude Code đã đọc .env.production và nhúng thông tin đăng nhập CSDL live vào tệp kiểm thử được tạo ra. Tại sao .claudeignore không thể ngăn truy cập vào .env.production, và giải pháp khắc phục đúng là gì?",
    "optionsEN": [
      "A. The literal entry .env matches only exact file paths named .env; changing the pattern to .env* or .env.* ensures all environment variants are ignored.",
      "B. .claudeignore only processes file exclusions if the --strict-ignore CLI flag is explicitly passed during invocation.",
      "C. Claude Code automatically bypasses .claudeignore rules for files contained in root-level directories unless --disallowedTools FileRead is set.",
      "D. Files containing the string .production require explicit authorization in settings.json under protectedPaths to be hidden from context."
    ],
    "options": [
      "A. Quy tắc chuỗi .env chỉ khớp chính xác các đường dẫn tệp có tên .env; việc đổi mẫu thành .env* hoặc .env.* sẽ đảm bảo tất cả biến thể môi trường bị bỏ qua.",
      "B. .claudeignore chỉ xử lý các quy tắc loại trừ tệp nếu cờ CLI --strict-ignore được truyền rõ ràng khi khởi chạy.",
      "C. Claude Code tự động bỏ qua các quy tắc .claudeignore đối với tệp ở thư mục gốc trừ khi cờ --disallowedTools FileRead được thiết lập.",
      "D. Các tệp chứa chuỗi .production yêu cầu ủy quyền rõ ràng trong settings.json tại mục protectedPaths để ẩn khỏi ngữ cảnh."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Ignore patterns in .claudeignore follow gitignore glob syntax where .env strictly matches files named .env, while .env* covers variants like .env.production and .env.local.",
      "Option B is incorrect: .claudeignore is parsed automatically by default without requiring any special CLI flags like --strict-ignore.",
      "Option C is incorrect: .claudeignore rules apply equally to root-level and nested files, and --disallowedTools controls tool execution rather than ignore list matching.",
      "Option D is incorrect: Claude Code uses standard .claudeignore glob patterns to hide context, not a protectedPaths setting in settings.json."
    ],
    "rationale": "In .claudeignore (which uses standard gitignore pattern syntax), specifying .env only ignores a file named exactly .env. Files like .env.production or .env.local are not matched unless a wildcard pattern like .env* or .env.* is specified.",
    "explanation": "Trong .claudeignore (sử dụng cú pháp glob tương tự .gitignore), mục khai báo .env chỉ khớp chính xác tệp có tên là .env. Các tệp như .env.production hay .env.staging sẽ không bị loại trừ trừ khi sử dụng mẫu thẻ đại diện (wildcard) như .env* hoặc .env.*.\n\n- Lựa chọn A đúng vì mẫu .env* mở rộng khớp với mọi tệp bắt đầu bằng .env.\n- Lựa chọn B sai vì .claudeignore được đọc tự động mà không cần cờ CLI bổ sung.\n- Lựa chọn C sai vì quy tắc bỏ qua áp dụng chung cho mọi cấp thư mục chứ không tự bỏ qua ở root.\n- Lựa chọn D sai vì Claude Code không dùng trường protectedPaths trong settings.json để ẩn tệp khỏi ngữ cảnh.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  },
  {
    "id": "d3-b07-3.7-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.7 permissions-safety-flags / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-3.7-002",
    "scenarioSignature": {
      "testedPrinciple": "directory scoped ignore patterns vs extension glob rules",
      "failureMode": "exposure of cryptographic key files across unmanaged directories",
      "rootCause": "restricting ignore rule to single path directory instead of file extensions",
      "requiredFix": "apply recursive secret file extension patterns in ignore file"
    },
    "questionEN": "A security audit reveals that while .claudeignore contains private-keys/ to ignore SSL certificate keys in that folder, an RSA key file deploy_key.pem stored in config/deploy/ was ingested into Claude Code's context window during a codebase review. How should the engineering team update .claudeignore to prevent any .pem key file from being read regardless of its location?",
    "question": "[d3-b07-3.7-002] Một cuộc kiểm tra an ninh phát hiện rằng mặc dù .claudeignore chứa private-keys/ để bỏ qua các khóa chứng chỉ SSL trong thư mục đó, một tệp khóa RSA deploy_key.pem nằm trong config/deploy/ vẫn bị tải vào cửa sổ ngữ cảnh của Claude Code khi rà soát mã nguồn. Đội ngũ kỹ thuật nên cập nhật .claudeignore như thế nào để ngăn mọi tệp khóa .pem bị đọc bất kể vị trí của chúng?",
    "optionsEN": [
      "A. Add individual directory paths like config/deploy/ to .claudeignore alongside private-keys/.",
      "B. Add recursive extension patterns like *.pem or **/*.pem to .claudeignore to exclude matching secret files repository-wide.",
      "C. Specify --disallowedTools ReadFile:*.pem when launching Claude Code in headless mode.",
      "D. Move all .pem files to a system-level temp directory because .claudeignore cannot match binary or key formats."
    ],
    "options": [
      "A. Thêm các đường dẫn thư mục riêng lẻ như config/deploy/ vào .claudeignore bên cạnh private-keys/.",
      "B. Thêm các mẫu phần mở rộng đệ quy như *.pem hoặc **/*.pem vào .claudeignore để loại trừ các tệp bí mật phù hợp trên toàn bộ kho lưu trữ.",
      "C. Khai báo --disallowedTools ReadFile:*.pem khi khởi chạy Claude Code ở chế độ không giao diện (headless).",
      "D. Di chuyển tất cả tệp .pem sang thư mục tạm thời của hệ thống vì .claudeignore không thể khớp các định dạng nhị phân hoặc tệp khóa."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Directory-specific rules like config/deploy/ require manual maintenance whenever keys are moved or added to new subdirectories.",
      "Option B is correct: Adding *.pem or **/*.pem uses glob patterns to recursively match and exclude all .pem private key files across any repository directory.",
      "Option C is incorrect: --disallowedTools disables tools by name (e.g. FileRead or Bash), but does not accept path-based pattern matching parameters.",
      "Option D is incorrect: .claudeignore handles text and key files perfectly using glob patterns, so moving files out of the repository is unnecessary for context masking."
    ],
    "rationale": "Using directory-specific paths like private-keys/ only ignores files within that exact folder. To prevent sensitive cryptographic keys from leaking when located elsewhere in the repository, glob extension patterns such as *.pem or **/*.pem must be added to .claudeignore to cover all current and future subdirectories recursively.",
    "explanation": "Sử dụng đường dẫn cụ thể như private-keys/ chỉ vô hiệu hóa quyền truy cập tệp trong thư mục đó. Để đảm bảo an toàn tuyệt đối cho các tệp khóa bí mật nằm ở bất kỳ đâu trong dự án, cần sử dụng các mẫu phần mở rộng như *.pem hoặc **/*.pem trong .claudeignore.\n\n- Lựa chọn B đúng vì quy tắc dạng glob *.pem sẽ đệ quy quét và loại bỏ mọi tệp khóa chứng chỉ bất kể cấu trúc thư mục.\n- Lựa chọn A sai vì việc liệt kê từng thư mục sẽ dễ bỏ sót khi dự án phát triển và mở rộng các đường dẫn mới.\n- Lựa chọn C sai vì --disallowedTools dùng để chặn công cụ (như FileRead hoặc Bash) chứ không hỗ trợ lọc theo đường dẫn hay phần mở rộng tệp.\n- Lựa chọn D sai vì .claudeignore hỗ trợ đầy đủ các dạng tệp văn bản/khóa mã hóa thông qua mẫu glob mà không cần di chuyển tệp ra khỏi dự án.",
    "sources": [
      {
        "label": "Lesson 3.7: Permissions & Safety Flags",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-7-permissions-safety-flags"
      }
    ]
  }
]