[
  {
    "id": "d3-b06-new-011",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-011",
    "scenarioSignature": {
      "testedPrinciple": "glob section scope evaluation for source versus test files in configuration",
      "failureMode": "applying testing guidelines to non-matching source code files",
      "rootCause": "misunderstanding glob pattern filter evaluation in section headers",
      "requiredFix": "evaluate targeted file path against glob patterns to ignore non-matching blocks"
    },
    "questionEN": "A developer configures /repo/CLAUDE.md with a scoped section [rules for \"**/*.test.ts\"] containing the instruction Always mock external API endpoints using MSW. When Claude Code refactors /repo/src/auth.ts to implement OAuth token refresh logic, how does Claude Code evaluate the rules within this section?",
    "question": "[d3-b06-new-011] Một lập trình viên cấu hình /repo/CLAUDE.md với một section giới hạn phạm vi [rules for \"**/*.test.ts\"] chứa chỉ thị Always mock external API endpoints using MSW. Khi Claude Code refactor file /repo/src/auth.ts để triển khai logic làm mới token OAuth, Claude Code đánh giá các quy tắc bên trong section này như thế nào?",
    "optionsEN": [
      "A. Claude Code applies the MSW mocking rule because CLAUDE.md rules at the project root apply universally to all files regardless of glob headers.",
      "B. Claude Code rejects /repo/src/auth.ts and raises a session validation error because non-test files cannot be edited when test glob rules exist.",
      "C. Claude Code skips the MSW mocking rule for /repo/src/auth.ts because the file path does not match the **/*.test.ts glob pattern.",
      "D. Claude Code prompts the developer interactively to confirm whether to apply the test mocking rule to /repo/src/auth.ts before modifying the file."
    ],
    "options": [
      "A. Claude Code áp dụng quy tắc giả lập MSW vì các quy tắc CLAUDE.md ở gốc dự án áp dụng toàn cục cho tất cả các file bất kể header glob.",
      "B. Claude Code từ chối /repo/src/auth.ts và tạo lỗi xác thực phiên vì không thể chỉnh sửa file không phải test khi tồn tại các quy tắc glob test.",
      "C. Claude Code bỏ qua quy tắc giả lập MSW cho /repo/src/auth.ts vì đường dẫn file không khớp với mẫu glob **/*.test.ts.",
      "D. Claude Code yêu cầu lập trình viên xác nhận tương tác xem có áp dụng quy tắc giả lập test cho /repo/src/auth.ts trước khi sửa đổi file hay không."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because glob section headers in CLAUDE.md explicitly filter rule applicability, preventing test-specific rules from polluting regular source file edits.",
      "Option B is incorrect because the presence of glob sections does not restrict editing non-matching files; unmatched files simply execute without those specific scoped instructions.",
      "Option C is correct because Claude Code matches the target file /repo/src/auth.ts against **/*.test.ts, evaluates the glob match as false, and omits the MSW mocking rule during generation.",
      "Option D is incorrect because glob matching failure is resolved automatically at context evaluation time without pausing for manual interactive prompts."
    ],
    "rationale": "Claude Code evaluates file-scoped glob headers in CLAUDE.md against the path of the file currently being edited. Since /repo/src/auth.ts does not match **/*.test.ts, the rules inside [rules for \"**/*.test.ts\"] are ignored for this edit.",
    "explanation": "Trong Claude Code, các tiêu đề section có dạng [rules for \"<glob>\"] trong file CLAUDE.md cho phép áp dụng quy tắc có điều kiện dựa trên đường dẫn file đang được làm việc.\n\n- Option A sai vì các section glob giới hạn phạm vi áp dụng thay vì áp dụng toàn cục.\n- Option B sai vì việc tồn tại section glob không ngăn cản việc sửa đổi các file không thuộc mẫu glob đó.\n- Option C đúng vì đường dẫn /repo/src/auth.ts không khớp với **/*.test.ts, do đó các chỉ thị bên trong khối glob đó bị bỏ qua khi Claude Code thao tác trên auth.ts.\n- Option D sai vì hệ thống tự động lọc các khối quy tắc dựa trên đường dẫn mà không cần hỏi người dùng.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-012",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-012",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory glob pattern evaluation for directory scoped database migration rules",
      "failureMode": "generating foreign key constraints in database migration scripts despite scoped rule",
      "rootCause": "matching target file path against directory wildcard section headers",
      "requiredFix": "enforce migration restriction rules because file path satisfies directory glob pattern"
    },
    "questionEN": "In a repository, /repo/CLAUDE.md includes a glob section [rules for \"migrations/**\"] stating never add foreign keys. When a developer asks Claude Code to generate a SQL schema update file located at /repo/migrations/0012_add_fk.sql, how does Claude Code process this rule?",
    "question": "[d3-b06-new-012] Trong một kho lưu trữ, /repo/CLAUDE.md chứa một section glob [rules for \"migrations/**\"] ghi never add foreign keys. Khi một lập trình viên yêu cầu Claude Code tạo một file cập nhật schema SQL tại /repo/migrations/0012_add_fk.sql, Claude Code xử lý quy tắc này như thế nào?",
    "optionsEN": [
      "A. Claude Code ignores the rule because glob sections targeting subdirectories must be placed inside a separate migrations/CLAUDE.md file to take effect.",
      "B. Claude Code bypasses the rule because .sql files are non-executable text scripts that fall outside CLAUDE.md glob pattern scoping.",
      "C. Claude Code overrides the rule automatically because the target filename 0012_add_fk.sql explicitly requests a foreign key operation.",
      "D. Claude Code enforces the rule and avoids adding foreign keys because /repo/migrations/0012_add_fk.sql matches the migrations/** glob pattern."
    ],
    "options": [
      "A. Claude Code bỏ qua quy tắc vì các section glob nhắm mục tiêu đến thư mục con phải được đặt trong một file migrations/CLAUDE.md riêng biệt mới có hiệu lực.",
      "B. Claude Code bỏ qua quy tắc vì các file .sql là kịch bản văn bản không thể thực thi nằm ngoài phạm vi mẫu glob CLAUDE.md.",
      "C. Claude Code tự động ghi đè quy tắc vì tên file mục tiêu 0012_add_fk.sql yêu cầu rõ ràng một thao tác khóa ngoại.",
      "D. Claude Code áp dụng quy tắc và tránh thêm khóa ngoại vì /repo/migrations/0012_add_fk.sql khớp với mẫu glob migrations/**."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because project root CLAUDE.md files can specify directory glob sections (such as [rules for \"migrations/**\"]) without requiring nested CLAUDE.md files.",
      "Option B is incorrect because CLAUDE.md glob matching evaluates raw file paths regardless of file extension or executability.",
      "Option C is incorrect because explicit target file names or prompt instructions do not silently bypass active restriction rules defined in CLAUDE.md glob blocks.",
      "Option D is correct because /repo/migrations/0012_add_fk.sql matches the wildcard pattern migrations/**, triggering the rule constraint prohibiting foreign keys."
    ],
    "rationale": "Project-root CLAUDE.md glob section headers like [rules for \"migrations/**\"] match any file path under the migrations/ directory. Since /repo/migrations/0012_add_fk.sql falls under migrations/**, Claude Code enforces the prohibition on adding foreign keys.",
    "explanation": "Khi cấu hình CLAUDE.md tại thư mục gốc của dự án chứa tiêu đề [rules for \"migrations/**\"], mẫu glob migrations/** sẽ khớp với bất kỳ file nào nằm trong thư mục migrations/ và các thư mục con của nó.\n\n- Option A sai vì CLAUDE.md ở gốc hoàn toàn hỗ trợ cấu hình quy tắc cho thư mục con thông qua đường dẫn glob mà không bắt buộc tạo file migrations/CLAUDE.md phụ.\n- Option B sai vì kiểm tra glob áp dụng cho mọi định dạng tập tin dựa trên đường dẫn.\n- Option C sai vì tên tập tin hoặc yêu cầu người dùng không mặc định vô hiệu hóa quy tắc ràng buộc đã đặt trong cấu hình.\n- Option D đúng vì file /repo/migrations/0012_add_fk.sql nằm trong thư mục migrations/, khớp với migrations/**, do đó chỉ thị cấm khóa ngoại sẽ được tuân thủ nghiêm ngặt.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]