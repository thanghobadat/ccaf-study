[
  {
    "id": "d3-b06-B-013",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-013",
    "scenarioSignature": {
      "testedPrinciple": "mitigating attention degradation and context loss in bloated configuration files",
      "failureMode": "omission of behavioral instructions located in the middle of a bloated file",
      "rootCause": "excessive token length in claudemd causing attention loss during prompt assembly",
      "requiredFix": "prune outdated project memory and refactor rules into concise modular files"
    },
    "questionEN": "Over 6 months of active development on the order-processing-service repository, the project root CLAUDE.md file has grown to 8,000 tokens due to auto-accumulated session notes and verbose build history. During recent code refactoring tasks, engineers observe that Claude Code consistently follows rules listed at the top and bottom of CLAUDE.md but silently skips mid-file coding standards such as mandatory input sanitization for SQL queries. What is the recommended architectural remedy to restore consistent rule adherence across all instructions?",
    "question": "[d3-b06-B-013] Sau 6 tháng phát triển dự án order-processing-service, tệp CLAUDE.md tại thư mục gốc đã tích tụ lên đến 8,000 token do ghi chép bộ nhớ phiên tự động và lịch sử build chi tiết. Trong các phiên refactor gần đây, các kỹ sư nhận thấy Claude Code tuân thủ tốt các quy tắc ở đầu và cuối tệp CLAUDE.md nhưng lại bỏ qua các tiêu chuẩn mã nguồn ở giữa tệp như yêu cầu làm sạch dữ liệu đầu vào SQL. Giải pháp kiến trúc được khuyến nghị để khắc phục hiện tượng này là gì?",
    "optionsEN": [
      "A. Prune accumulated session memory from CLAUDE.md and refactor core instructions into concise, focused markdown files referenced via modular @import directives.",
      "B. Append a duplicate copy of the mid-file input sanitization rules to the end of .claudeignore to ensure high-priority parsing during tool initialization.",
      "C. Move the entire 8,000-token file content into a subfolder named /src/CLAUDE.md so that subdirectory inheritance overrides context length constraints.",
      "D. Define an allowedTools parameter inside CLAUDE.md to grant elevated context window privileges for mid-file instruction extraction."
    ],
    "options": [
      "A. Cắt tỉa ghi chép bộ nhớ cũ khỏi CLAUDE.md và tái cấu trúc các chỉ thị cốt lõi thành các tệp markdown ngắn gọn, tập trung được liên kết qua chỉ thị @import.",
      "B. Nối thêm một bản sao của các quy tắc làm sạch dữ liệu ở giữa tệp vào cuối .claudeignore để đảm bảo ưu tiên phân tích khi khởi tạo công cụ.",
      "C. Di chuyển toàn bộ nội dung tệp 8,000 token vào thư mục con /src/CLAUDE.md để kế thừa thư mục con ghi đè các giới hạn độ dài ngữ cảnh.",
      "D. Định nghĩa tham số allowedTools bên trong CLAUDE.md để cấp quyền cửa sổ ngữ cảnh mở rộng cho việc trích xuất chỉ thị ở giữa tệp."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Trimming bloat and splitting extensive rules into modular files via @import keeps context files concise, preventing the 'lost-in-the-middle' prompt degradation where LLMs overlook rules buried inside long configuration files.",
      "Option B is incorrect: .claudeignore handles file visibility exclusion, not behavioral instruction parsing or priority weighting.",
      "Option C is incorrect: Relocating an oversized configuration file to a subdirectory does not reduce its token footprint or resolve attention degradation when editing files under that path.",
      "Option D is incorrect: allowedTools manages permission constraints for tool execution and has no functionality for altering context window privileges or context parsing."
    ],
    "rationale": "Pruning bloated session notes and refactoring extensive instructions into modular imported files reduces token bloat, ensuring that all behavioral instructions remain concise and within the high-attention context window of Claude Code.",
    "explanation": "Lựa chọn A là đáp án đúng vì các tệp cấu hình CLAUDE.md quá dài (như 8,000 token trong kịch bản) sẽ gặp phải hiện tượng suy giảm chú ý ở giữa tệp (lost-in-the-middle phenomenon) của mô hình ngôn ngữ lớn. Việc xóa bỏ các ghi chép bộ nhớ phiên không cần thiết và chia nhỏ quy tắc thành các tệp ngắn gọn kết hợp với chỉ thị @import giữ cho ngữ cảnh luôn tinh gọn và đảm bảo mô hình tuân thủ đầy đủ các chỉ thị. Lựa chọn B sai vì .claudeignore dùng để ẩn tệp khỏi tầm nhìn của Claude Code chứ không có chức năng phân tích hay ưu tiên quy tắc hành vi. Lựa chọn C sai vì việc di chuyển tệp 8,000 token vào thư mục con không làm giảm dung lượng token và vẫn gây ra suy giảm chú ý khi làm việc trong thư mục con đó. Lựa chọn D sai vì allowedTools nằm trong cấu hình settings để quản lý quyền thực thi công cụ, không thể điều chỉnh cửa sổ ngữ cảnh hay mức độ ưu tiên chỉ thị trong CLAUDE.md.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-014",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-014",
    "scenarioSignature": {
      "testedPrinciple": "distinction between prompt behavioral guidance and programmatic tool access control",
      "failureMode": "misattributing tool access governance to text instruction configuration files",
      "rootCause": "confusing natural language guidance in claudemd with tool execution permission rules in settings",
      "requiredFix": "rely on allowedTools settings for system boundary enforcement and claudemd for behavioral guidance"
    },
    "questionEN": "A security audit of the fintech-api project revealed two database safety configurations: the project CLAUDE.md contains the rule 'Always execute database updates via parameterized SQL queries using db_query tool', while .claude/settings.json specifies 'allowedTools': ['Bash(npm test)', 'Bash(git status)'] which excludes direct database access tools. When a developer asks Claude Code to run an ad-hoc unparameterized SQL script directly against the staging database, which mechanism acts as the actual programmatic enforcement boundary that blocks execution?",
    "question": "[d3-b06-B-014] Một buổi kiểm toán bảo mật cho dự án fintech-api đã ghi nhận hai cấu hình an toàn cơ sở dữ liệu: tệp CLAUDE.md của dự án chứa quy tắc 'Luôn thực thi cập nhật cơ sở dữ liệu qua truy vấn SQL tham số hóa bằng công cụ db_query', trong khi .claude/settings.json chỉ định 'allowedTools': ['Bash(npm test)', 'Bash(git status)'] loại trừ các công cụ truy cập CSDL trực tiếp. Khi nhà phát triển yêu cầu Claude Code chạy một kịch bản SQL không tham số hóa trực tiếp trên cơ sở dữ liệu staging, cơ chế nào đóng vai trò là ranh giới thực thi lập trình thực tế để chặn lệnh?",
    "optionsEN": [
      "A. CLAUDE.md acts as the primary programmatic enforcement layer because its behavioral instructions actively block unauthorized command strings before reaching the system shell.",
      "B. allowedTools in settings.json acts as the actual enforcement mechanism by restricting tool execution at the system boundary, whereas CLAUDE.md only provides prompt-level behavioral guidance.",
      "C. Both CLAUDE.md and allowedTools provide equal programmatic enforcement, with CLAUDE.md taking precedence when database operation keywords are detected.",
      "D. .claudeignore acts as the enforcement boundary by intercepting tool execution requests and converting unparameterized SQL queries into parameterized calls."
    ],
    "options": [
      "A. CLAUDE.md đóng vai trò là lớp thực thi lập trình chính vì các chỉ thị hành vi của nó chủ động chặn các chuỗi lệnh không hợp lệ trước khi đến shell hệ thống.",
      "B. allowedTools trong settings.json đóng vai trò là cơ chế thực thi thực tế bằng cách giới hạn quyền gọi công cụ tại ranh giới hệ thống, trong khi CLAUDE.md chỉ cung cấp hướng dẫn hành vi cấp prompt.",
      "C. Cả CLAUDE.md và allowedTools đều cung cấp mức độ thực thi lập trình ngang nhau, trong đó CLAUDE.md chiếm ưu thế khi phát hiện các từ khóa thao tác cơ sở dữ liệu.",
      "D. .claudeignore đóng vai trò là ranh giới thực thi bằng cách đánh chặn các yêu cầu thực thi công cụ và chuyển đổi truy vấn SQL không tham số thành các lệnh tham số hóa."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: CLAUDE.md contains natural language instructions included in the prompt context, which guides model behavior but cannot programmatically block tool calls at the system layer.",
      "Option B (Correct): allowedTools strictly enforces permissions at the tool invocation boundary by rejecting disallowed tools, whereas CLAUDE.md serves solely as context guidance for prompt generation.",
      "Option C is incorrect: CLAUDE.md does not share equal programmatic enforcement capabilities with settings files and cannot block tool execution.",
      "Option D is incorrect: .claudeignore controls workspace file visibility and indexed file paths, not tool execution permissions or SQL query parameterization."
    ],
    "rationale": "allowedTools in settings.json enforces strict tool permissions programmatically at the platform layer, whereas instructions in CLAUDE.md only guide the LLM's intent via prompt context without technical enforcement capabilities.",
    "explanation": "Lựa chọn B là đáp án đúng vì cấu hình allowedTools trong settings.json là cơ chế phân quyền lập trình cấp hệ thống, trực tiếp chặn hoặc cho phép việc thực thi các công cụ (tools). Trong khi đó, các quy tắc trong CLAUDE.md chỉ là các chỉ thị ngôn ngữ tự nhiên được đưa vào ngữ cảnh prompt để hướng dẫn hành vi của LLM, không thể đảm bảo ngăn chặn về mặt kỹ thuật nếu LLM cố gắng gọi công cụ. Lựa chọn A và C sai vì CLAUDE.md không có khả năng thực thi lập trình hay chặn các lệnh ở cấp shell/hệ thống. Lựa chọn D sai vì .claudeignore chỉ kiểm soát việc ẩn tệp/thư mục khỏi tầm nhìn của Claude Code chứ không tham gia vào việc quản lý quyền công cụ hay chuyển đổi câu lệnh SQL.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]