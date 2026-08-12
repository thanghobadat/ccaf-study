[
  {
    "id": "d3-b06-B-021",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-21",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-021",
    "scenarioSignature": {
      "testedPrinciple": "additive hierarchy evaluation of root glob section rules and subdirectory CLAUDE.md rules",
      "failureMode": "misunderstanding rule scope when editing matched files in subdirectories",
      "rootCause": "assuming subdirectory CLAUDE.md disables root glob pattern rules or vice versa",
      "requiredFix": "apply both root glob section rules and subdirectory CLAUDE.md rules concurrently with local precedence"
    },
    "questionEN": "A database engineering team maintains a repository with /repo/CLAUDE.md containing a glob section [rules for \"*.sql\"] mandating formatted transaction blocks and index checks. In addition, /repo/migrations/CLAUDE.md exists with general rules requiring explicit schema rollback blocks for all files inside the migrations/ folder without any glob section. An engineer uses Claude Code to edit /repo/migrations/0045.sql to modify a table schema. How does Claude Code evaluate and apply the configuration rules for this file editing operation?",
    "question": "[d3-b06-B-021] Một đội ngũ kỹ sư cơ sở dữ liệu duy trì một kho lưu trữ với file /repo/CLAUDE.md chứa phần glob [rules for \"*.sql\"] yêu cầu các khối giao dịch phải được định dạng và kiểm tra index. Ngoài ra, file /repo/migrations/CLAUDE.md cũng tồn tại với các quy tắc chung yêu cầu khối rollback schema rõ ràng cho tất cả các file trong thư mục migrations/ mà không có phần glob. Một lập trình viên sử dụng Claude Code để chỉnh sửa file /repo/migrations/0045.sql nhằm thay đổi schema của một bảng. Claude Code đánh giá và áp dụng các quy tắc cấu hình cho thao tác chỉnh sửa file này như thế nào?",
    "optionsEN": [
      "A. Both the glob section rules from /repo/CLAUDE.md and the general rules from /repo/migrations/CLAUDE.md apply concurrently, with subdirectory rules overriding any conflicting directives.",
      "B. Only the rules in /repo/migrations/CLAUDE.md apply, because the presence of a subdirectory CLAUDE.md completely suppresses root CLAUDE.md glob sections.",
      "C. Only the glob section rules in /repo/CLAUDE.md apply, because file-matching glob headers override directory-level CLAUDE.md files.",
      "D. Neither rule set applies because glob matching in root CLAUDE.md is disabled whenever a target file resides within a nested directory containing its own CLAUDE.md."
    ],
    "options": [
      "A. Cả quy tắc thuộc phần glob từ /repo/CLAUDE.md và các quy tắc chung từ /repo/migrations/CLAUDE.md đều được áp dụng đồng thời, trong đó các quy tắc của thư mục con sẽ ghi đè nếu có mâu thuẫn.",
      "B. Chỉ các quy tắc trong /repo/migrations/CLAUDE.md được áp dụng, vì sự xuất hiện của CLAUDE.md ở thư mục con sẽ bỏ qua hoàn toàn các phần glob trong CLAUDE.md ở thư mục gốc.",
      "C. Chỉ các quy tắc trong phần glob của /repo/CLAUDE.md được áp dụng, vì các tiêu đề glob khớp file cụ thể có độ ưu tiên cao hơn file CLAUDE.md cấp thư mục.",
      "D. Không có bộ quy tắc nào được áp dụng vì việc khớp glob ở CLAUDE.md gốc bị vô hiệu hóa bất cứ khi nào file mục tiêu nằm trong thư mục con có file CLAUDE.md riêng."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Claude Code evaluates configuration hierarchically and additively. The target file /repo/migrations/0045.sql matches the *.sql glob in /repo/CLAUDE.md, so those rules are loaded. It also resides in /repo/migrations/, so rules from /repo/migrations/CLAUDE.md are loaded as well, with local subdirectory directives overriding root directives in case of direct conflict.",
      "Option B is incorrect: Subdirectory CLAUDE.md files do not suppress root glob rules; configurations across the hierarchy are merged additively unless specific directives directly contradict each other.",
      "Option C is incorrect: Root glob matches do not invalidate subdirectory CLAUDE.md files; both rule sources are combined during context assembly.",
      "Option D is incorrect: Nested directory CLAUDE.md files do not disable root glob matching for files located within those subdirectories."
    ],
    "rationale": "Claude Code processes configuration files hierarchically and additively. When editing /repo/migrations/0045.sql, it matches both the *.sql glob pattern in /repo/CLAUDE.md and the directory-scoped rules in /repo/migrations/CLAUDE.md. Both sets of instructions are merged into the session prompt, with subdirectory rules taking precedence over root rules if any direct conflict arises.",
    "explanation": "Trong Claude Code, hệ thống cấu hình CLAUDE.md hoạt động theo cơ chế cộng dồn (additive) và phân cấp (hierarchical). Khi người dùng chỉnh sửa file /repo/migrations/0045.sql:\n- File này thỏa mãn mẫu glob *.sql định nghĩa tại phần [rules for \"*.sql\"] trong /repo/CLAUDE.md gốc, nên các quy tắc này được nạp vào ngữ cảnh.\n- File này cũng nằm trong thư mục /repo/migrations/, do đó các quy tắc chung trong /repo/migrations/CLAUDE.md cũng được nạp vào ngữ cảnh.\n- Cả hai bộ quy tắc cùng có hiệu lực đồng thời. Nếu có xung đột trực tiếp giữa hai bộ quy tắc, các chỉ thị ở file CLAUDE.md thư mục con (/repo/migrations/CLAUDE.md) sẽ ghi đè chỉ thị tương ứng từ thư mục gốc.\n\nPhân tích chi tiết từng phương án:\n- Phương án A đúng vì phản ánh chính xác cơ chế hợp nhất ngữ cảnh phân cấp và tính cộng dồn của mẫu glob với file cấu hình thư mục con.\n- Phương án B sai vì CLAUDE.md thư mục con không làm vô hiệu hóa hoàn toàn các phần quy tắc glob ở cấp gốc.\n- Phương án C sai vì khớp quy tắc glob cấp gốc không hủy bỏ hiệu lực của file CLAUDE.md cấp thư mục con.\n- Phương án D sai vì sự tồn tại của file cấu hình ở thư mục con không vô hiệu hóa tính năng khớp glob của thư mục gốc.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-022",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-22",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-022",
    "questionEN": "A project's /repo/CLAUDE.md file contains a general code style section stating: \"Use snake_case for Python function names, and camelCase for JavaScript function names.\" A developer launches a Claude Code session to refactor a Python file at /repo/src/auth.py. How are these style rules ingested and applied during the editing session?",
    "question": "[d3-b06-B-022] File /repo/CLAUDE.md của một dự án chứa phần quy tắc phong cách code chung ghi: \"Use snake_case for Python function names, and camelCase for JavaScript function names.\" Một lập trình viên khởi tạo phiên Claude Code để tái cấu trúc một file Python tại /repo/src/auth.py. Các quy tắc phong cách này được nạp và áp dụng như thế nào trong phiên chỉnh sửa?",
    "optionsEN": [
      "A. Only the Python rule is loaded into context because Claude Code automatically strips out non-matching language instructions before building the system prompt.",
      "B. Both language rules are loaded into context because the full CLAUDE.md file is ingested, and Claude Code relies on model instruction-following to apply the Python snake_case convention to auth.py.",
      "C. Neither style rule is loaded because mixing instructions for different programming languages in a single CLAUDE.md file causes a validation error.",
      "D. Both rules are loaded, but the JavaScript camelCase rule overrides the Python rule because instructions listed later in the file take strict priority regardless of specified target language."
    ],
    "options": [
      "A. Chỉ quy tắc Python được nạp vào ngữ cảnh vì Claude Code tự động lọc bỏ các chỉ thị ngôn ngữ không khớp trước khi tạo prompt hệ thống.",
      "B. Cả hai quy tắc ngôn ngữ đều được nạp vào ngữ cảnh vì toàn bộ file CLAUDE.md được nạp, và Claude Code dựa vào khả năng tuân thủ chỉ thị của mô hình để áp dụng quy tắc snake_case cho auth.py.",
      "C. Không quy tắc nào được nạp vì việc trộn lẫn các chỉ thị cho nhiều ngôn ngữ lập trình trong một file CLAUDE.md duy nhất sẽ gây ra lỗi xác thực (validation error).",
      "D. Cả hai quy tắc đều được nạp, nhưng quy tắc camelCase của JavaScript sẽ ghi đè quy tắc Python vì chỉ thị nằm bên dưới trong file có độ ưu tiên tuyệt đối bất chấp ngôn ngữ mục tiêu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Claude Code loads CLAUDE.md files as complete markdown text into the prompt context; it does not parse prose sentences line-by-line to filter out other programming languages based on file extensions.",
      "Option B is correct: The entire contents of CLAUDE.md are added to the session context. The LLM processes the full prompt and uses its natural language understanding to select and enforce the Python-specific rule (snake_case) when generating or editing Python code (auth.py).",
      "Option C is incorrect: Combining guidelines for multiple languages in a single CLAUDE.md file is fully valid and standard practice.",
      "Option D is incorrect: Rules with explicit domain/language predicates (e.g. \"for Python\", \"for JavaScript\") are applied based on context matching rather than literal line ordering."
    ],
    "rationale": "Claude Code ingests CLAUDE.md files in their entirety into the model's system prompt context. It does not perform pre-processing or regex filtering on standard markdown text based on the current file extension. Because both language rules exist within the ingested prompt, Claude uses instruction-following capabilities to apply the snake_case rule specifically when working on .py files like auth.py.",
    "explanation": "Khi Claude Code nạp file CLAUDE.md, toàn bộ nội dung của file markdown này được đưa vào ngữ cảnh (system prompt) của mô hình. Claude Code không thực hiện quá trình tiền xử lý hoặc lọc bỏ văn bản mô tả theo dòng dựa trên phần mở rộng của file đang chỉnh sửa.\\n\\nKhi chỉnh sửa file auth.py:\\n- Cả hai quy tắc (dành cho Python và JavaScript) đều nằm trong prompt ngữ cảnh của phiên làm việc.\\n- Mô hình ngôn ngữ (Claude) sử dụng khả năng hiểu văn bản tự nhiên và tuân thủ chỉ thị để nhận biết rằng file đang thao tác là Python (.py), từ đó áp dụng đúng quy chuẩn snake_case dành cho Python.\\n\\nPhân tích chi tiết từng phương án:\\n- Phương án A sai vì Claude Code không tự động trích xuất hay loại bỏ các câu chỉ thị không thuộc ngôn ngữ của file hiện tại.\\n- Phương án B đúng vì mô tả chính xác cơ chế nạp toàn bộ file CLAUDE.md vào ngữ cảnh và cậy nhờ khả năng lập luận của mô hình để áp dụng đúng quy tắc ngôn ngữ phù hợp.\\n- Phương án C sai vì việc viết quy tắc cho nhiều ngôn ngữ trong cùng một file CLAUDE.md là hoàn toàn hợp lệ.\\n- Phương án D sai vì vị trí xuất hiện của chỉ thị trong văn bản không làm ghi đè quy tắc khi chỉ thị đã ghi rõ điều kiện áp dụng cho từng ngôn ngữ cụ thể (\"for Python\", \"for JavaScript\").",
    "scenarioSignature": {
      "testedPrinciple": "full ingestion of rule files into prompt context with model-driven language instruction targeting",
      "failureMode": "incorrectly assuming line-by-line file extension filtering of general rule directives",
      "rootCause": "misunderstanding that CLAUDE.md is loaded as complete context rather than parsed into file-type predicates",
      "requiredFix": "rely on explicit language qualifiers within single rule files or use glob headers for strict targeting"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]