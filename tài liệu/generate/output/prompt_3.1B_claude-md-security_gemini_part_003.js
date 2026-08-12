[
  {
    "id": "d3-b06-B-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-005",
    "scenarioSignature": {
      "testedPrinciple": "functional distinction between file exclusion via .claudeignore and behavioral guidance via CLAUDE.md",
      "failureMode": "exposure of sensitive files or ignored instructions due to file role conflation",
      "rootCause": "misunderstanding that .claudeignore controls file visibility while CLAUDE.md governs LLM behavioral instructions",
      "requiredFix": "place security and file exclusion patterns in .claudeignore and workflow behavioral rules in CLAUDE.md"
    },
    "questionEN": "A software engineering team is configuring privacy and workflow boundaries in a repository containing API keys in .env.local and strict code formatting conventions. The lead developer needs to ensure that Claude Code cannot inspect or reference sensitive secret files under any circumstances, while also ensuring that Claude Code formats all TypeScript files using 2-space indentation when editing. Which configuration file strategy properly separates file exclusion from agent behavior instruction?",
    "question": "[d3-b06-B-005] Một đội ngũ phát triển phần mềm đang cấu hình các ranh giới bảo mật và quy trình làm việc trong kho chứa có file khóa API .env.local và các quy tắc định dạng mã nguồn nghiêm ngặt. Trưởng nhóm cần đảm bảo Claude Code hoàn toàn không thể đọc hoặc tham chiếu các file bí mật trong bất kỳ trường hợp nào, đồng thời đảm bảo Claude Code tự động áp dụng quy tắc thụt lề 2 khoảng trống khi chỉnh sửa các file TypeScript. Chiến lược cấu hình nào phân tách đúng giữa việc loại trừ file và hướng dẫn hành vi của AI agent?",
    "optionsEN": [
      "A. Add .env.local to .claudeignore to prevent Claude Code from reading or indexing the secrets, and specify the 2-space indentation rule inside CLAUDE.md to govern Claude's editing behavior.",
      "B. Add both .env.local and the 2-space indentation rule to .claudeignore, as .claudeignore handles all project-level restrictions.",
      "C. Specify both file exclusion patterns and code formatting rules inside CLAUDE.md, as CLAUDE.md overrides repository access controls.",
      "D. Add .env.local to CLAUDE.md under an [ignore] block, and add formatting rules to .claudeignore using style: directives."
    ],
    "options": [
      "A. Thêm .env.local vào .claudeignore để ngăn Claude Code đọc hoặc lập chỉ mục thông tin bí mật, và khai báo quy tắc thụt lề 2 khoảng trống trong CLAUDE.md để điều hướng hành vi chỉnh sửa của Claude.",
      "B. Thêm cả .env.local và quy tắc thụt lề 2 khoảng trống vào .claudeignore, vì .claudeignore quản lý toàn bộ các hạn chế ở cấp độ dự án.",
      "C. Khai báo cả mẫu loại trừ file và quy tắc định dạng mã nguồn bên trong CLAUDE.md, vì CLAUDE.md có quyền ghi đè kiểm soát truy cập kho chứa.",
      "D. Thêm .env.local vào CLAUDE.md dưới khối [ignore], và thêm quy tắc định dạng vào .claudeignore bằng các chỉ thị style:."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because .claudeignore prevents Claude Code from reading, indexing, or referencing specified files entirely, while CLAUDE.md provides behavioral instructions for working with accessible code.",
      "Option B is incorrect because .claudeignore only supports gitignore-style file patterns for excluding context; it cannot interpret LLM behavioral instructions like formatting conventions.",
      "Option C is incorrect because placing file paths in CLAUDE.md advises the model on workflow rules but does not block Claude Code from reading or retrieving file contents if requested.",
      "Option D is incorrect because CLAUDE.md does not support an [ignore] block for access control, and .claudeignore does not support custom directives like style: for formatting."
    ],
    "rationale": ".claudeignore strictly controls file visibility and access by masking matching patterns from Claude Code's view. Conversely, CLAUDE.md defines instructions and guidelines that shape Claude Code's behavior during code generation and maintenance.",
    "explanation": "File .claudeignore được sử dụng để loại trừ hoàn toàn các file hoặc thư mục khỏi phạm vi xem, đọc và lập chỉ mục của Claude Code (sử dụng cú pháp tương tự .gitignore). Trong khi đó, file CLAUDE.md được thiết kế để chứa các hướng dẫn, quy tắc lập trình và hành vi khi Claude Code làm việc với các file trong kho chứa. Việc phân tách rõ ràng giữa loại trừ dữ liệu nhạy cảm bằng .claudeignore và định hướng hành vi bằng CLAUDE.md đảm bảo cả khía cạnh bảo mật lẫn chất lượng mã nguồn.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-006",
    "questionEN": "A fintech application repository has a subfolder structure where /src/payments/CLAUDE.md defines the security compliance rule: \"Never log full credit card numbers.Mask to last 4 digits.\" An engineer prompts Claude Code to modify /src/payments/charge.ts to log transaction details during payment processing. How does Claude Code handle this subfolder-scoped rule?",
    "question": "[d3-b06-B-006] Một kho chứa ứng dụng công nghệ tài chính có cấu trúc thư mục con với file /src/payments/CLAUDE.md định nghĩa quy tắc tuân thủ bảo mật: \"Never log full credit card numbers.Mask to last 4 digits.\" Một kỹ sư yêu cầu Claude Code sửa đổi /src/payments/charge.ts để ghi nhật ký chi tiết giao dịch trong quá trình xử lý thanh toán. Claude Code áp dụng quy tắc được phạm vi hóa trong thư mục con này như thế nào?",
    "optionsEN": [
      "A. Claude Code ignores the rule in /src/payments/CLAUDE.md because security policies must be defined in the root CLAUDE.md to take effect.",
      "B. Claude Code applies the rule automatically because edits inside /src/payments/charge.ts fall within the directory scope of /src/payments/CLAUDE.md.",
      "C. Claude Code prompts the user for explicit confirmation before executing the charge function, but logs full card numbers in debug mode.",
      "D. Claude Code raises a hard CLI error and halts execution because subdirectory CLAUDE.md files are only valid for test configurations."
    ],
    "options": [
      "A. Claude Code bỏ qua quy tắc trong /src/payments/CLAUDE.md vì các chính sách bảo mật bắt buộc phải được khai báo ở CLAUDE.md gốc mới có hiệu lực.",
      "B. Claude Code tự động áp dụng quy tắc vì việc chỉnh sửa /src/payments/charge.ts nằm trong phạm vi thư mục của /src/payments/CLAUDE.md.",
      "C. Claude Code yêu cầu người dùng xác nhận rõ ràng trước khi thực thi hàm tính phí, nhưng vẫn ghi toàn bộ số thẻ tín dụng vào nhật ký gỡ lỗi.",
      "D. Claude Code tạo lỗi CLI nghiêm trọng và dừng thực thi vì các file CLAUDE.md trong thư mục con chỉ hợp lệ cho cấu hình kiểm thử."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because subdirectory CLAUDE.md files are automatically loaded and applied to all file modifications occurring within their subfolder tree.",
      "Option B is correct because /src/payments/charge.ts is located inside /src/payments/, so Claude Code inherits and strictly respects the compliance rule defined in /src/payments/CLAUDE.md.",
      "Option C is incorrect because Claude Code integrates the masking rule directly into the updated code logic rather than logging unmasked sensitive credit card data.",
      "Option D is incorrect because nested CLAUDE.md files are valid for all module types across the codebase, not limited to test directories."
    ],
    "rationale": "Claude Code loads hierarchical CLAUDE.md configuration files, inheriting and applying rules from parent directories down to specific subdirectories. Rules placed in /src/payments/CLAUDE.md automatically govern any file modifications inside /src/payments/, including charge.ts.",
    "explanation": "Hệ thống cấu hình CLAUDE.md hỗ trợ phân cấp theo cây thư mục. Các file CLAUDE.md nằm ở các thư mục con (như /src/payments/CLAUDE.md) sẽ tự động áp dụng các quy tắc bảo mật và hướng dẫn cho tất cả các thao tác mã nguồn diễn ra bên trong thư mục đó và các thư mục con cấp thấp hơn. Do đó, khi chỉnh sửa /src/payments/charge.ts, Claude Code sẽ tuân thủ nguyên tắc ẩn bớt số thẻ tín dụng (masking) được quy định trong /src/payments/CLAUDE.md.",
    "scenarioSignature": {
      "testedPrinciple": "scoped behavioral rule application from subdirectory CLAUDE.md files",
      "failureMode": "incorrect assumption that subdirectory security rules are ignored or restricted to root files",
      "rootCause": "hierarchical configuration loading where nested CLAUDE.md rules automatically apply to files within their directory subtree",
      "requiredFix": "enforce scoped compliance rules via subdirectory CLAUDE.md files for matching target path operations"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]