[
  {
    "id": "d3-b06-3.3-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-007",
    "questionEN": "A developer team configured /repo/CLAUDE.md with two glob section headers: [rules for \"src/**\"] specifying \"Format all logging using JSON objects(logger.info({ event: name })) \", and [rules for \"src/services/**\"] specifying \"Format all logging using plain strings(logger.info('message')) \". When Claude Code modifies src/services/payment.ts, it outputs inconsistent logs that alternate between JSON objects and plain strings. Why does Claude Code produce this mixed output?",
    "question": "[d3-b06-3.3-007] Một đội ngũ phát triển đã cấu hình /repo/CLAUDE.md với hai tiêu đề phần glob: [rules for \"src/**\"] chỉ định \"Định dạng tất cả nhật ký bằng đối tượng JSON(logger.info({ event: name })) \", và [rules for \"src/services/**\"] chỉ định \"Định dạng tất cả nhật ký bằng chuỗi thuần(logger.info('message')) \". Khi Claude Code chỉnh sửa src/services/payment.ts, nó tạo ra nhật ký không nhất quán, luân phiên giữa đối tượng JSON và chuỗi thuần. Tại sao Claude Code lại tạo ra kết quả hỗn hợp này?",
    "optionsEN": [
      "A. The more specific src/services/** glob header overrides and disables all parent rules from src/**.",
      "B. Claude Code only parses the first matching glob pattern in CLAUDE.md and ignores subsequent section headers.",
      "C. Path-specific rules across overlapping glob patterns are additive; both conflicting instructions are loaded into context, causing inconsistent model adherence.",
      "D. Glob matching requires an explicit precedence attribute in CLAUDE.md to prevent syntax parsing errors."
    ],
    "options": [
      "A. Tiêu đề glob cụ thể hơn src/services/** sẽ ghi đè và vô hiệu hóa tất cả các quy tắc cha từ src/**.",
      "B. Claude Code chỉ phân tích mẫu glob phù hợp đầu tiên trong CLAUDE.md và bỏ qua các tiêu đề phần tiếp theo.",
      "C. Các quy tắc theo đường dẫn trên các mẫu glob chồng chéo có tính chất cộng dồn; cả hai hướng dẫn xung đột đều được tải vào ngữ cảnh, gây ra sự tuân thủ quy tắc không nhất quán.",
      "D. Việc khớp glob yêu cầu một thuộc tính độ ưu tiên rõ ràng trong CLAUDE.md để ngăn lỗi phân tích cú pháp."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because path-specific rules in CLAUDE.md do not unassign or override earlier sections; all matching globs contribute rules additively.",
      "Option B is incorrect because Claude Code evaluates all matching glob sections in CLAUDE.md independently rather than stopping at the first match.",
      "Option C is correct because path-specific rules are additive; when multiple glob sections match a target file path, all instructions from matching sections are injected into context, creating prompt ambiguity if they directly contradict each other.",
      "Option D is incorrect because CLAUDE.md uses standard markdown section headers with glob strings and does not support or require a custom precedence attribute."
    ],
    "rationale": "Path-specific rules in CLAUDE.md are evaluated additively. When a file matches multiple glob headers (such as src/** and src/services/**), Claude Code ingests rules from both sections. If these sections contain contradictory guidelines, Claude receives ambiguous prompt instructions, leading to mixed behavioral adherence.",
    "explanation": "Trong Claude Code, các quy tắc dành riêng cho đường dẫn (path-specific rules) trong CLAUDE.md có tính chất cộng dồn (additive). Khi một tệp như src/services/payment.ts khớp với cả hai mẫu glob src/** và src/services/**, Claude Code sẽ tải hướng dẫn từ cả hai phần vào ngữ cảnh prompt.\\n\\n- Option A sai vì phần glob cụ thể không tự động thay thế hay ghi đè hoàn toàn phần glob rộng hơn.\\n- Option B sai vì Claude Code kiểm tra tất cả các tiêu đề glob độc lập chứ không dừng lại ở mẫu đầu tiên.\\n- Option C đúng vì tính chất cộng dồn khiến cả hai hướng dẫn mâu thuẫn (JSON vs plain text) cùng hiện diện trong ngữ cảnh, dẫn đến kết quả không nhất quán.\\n- Option D sai vì CLAUDE.md là tệp Markdown tiêu chuẩn và không có cú pháp khai báo thuộc tính độ ưu tiên (precedence attribute).",
    "scenarioSignature": {
      "testedPrinciple": "additive path-specific rule evaluation across overlapping glob patterns",
      "failureMode": "inconsistent code formatting and mixed rule adherence across file edits",
      "rootCause": "overlapping glob sections both injecting conflicting instructions into prompt context",
      "requiredFix": "reconcile conflicting instructions or eliminate overlapping glob pattern conflicts"
    },
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  },
  {
    "id": "d3-b06-3.3-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-008",
    "questionEN": "A technical writing team maintains API reference documentation under the /docs/** directory. They want to ensure that when Claude Code refactors markdown files in /docs/**, it only edits prose formatting and document structure, without generating or suggesting executable code blocks. How should this restriction be configured?",
    "question": "[d3-b06-3.3-008] Một đội ngũ viết tài liệu kỹ thuật quản lý tài liệu tham khảo API trong thư mục /docs/**. Họ muốn đảm bảo rằng khi Claude Code tái cấu trúc các tệp markdown trong /docs/**, nó chỉ chỉnh sửa định dạng văn bản và cấu trúc tài liệu, mà không tạo hoặc đề xuất các khối mã có thể thực thi. Hạn chế này nên được cấu hình như thế nào?",
    "optionsEN": [
      "A. Add /docs/** to .claudeignore to force Claude Code into markdown-only text editing mode.",
      "B. Set CLAUDE_DISABLE_CODE_GEN=true in .claude/config.json scoped to the /docs/ folder path.",
      "C. Register a slash command /docs-only that blocks write operations on any file containing code syntax.",
      "D. Add a section [rules for \"docs/**\"] in CLAUDE.md specifying \"Only edit prose and markdown formatting; do not generate or suggest executable code blocks.\""
    ],
    "options": [
      "A. Thêm /docs/** vào .claudeignore để buộc Claude Code chuyển sang chế độ chỉ chỉnh sửa văn bản markdown.",
      "B. Đặt CLAUDE_DISABLE_CODE_GEN=true trong .claude/config.json được giới hạn cho đường dẫn thư mục /docs/.",
      "C. Đăng ký một lệnh gạch chéo /docs-only để chặn các thao tác ghi vào bất kỳ tệp nào có chứa cú pháp mã.",
      "D. Thêm phần [rules for \"docs/**\"] trong CLAUDE.md chỉ định \"Chỉ chỉnh sửa văn bản thuần và định dạng markdown; không tạo hoặc đề xuất các khối mã có thể thực thi.\""
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because .claudeignore completely hides matching files from Claude Code's visibility, preventing Claude from viewing or editing the /docs/** directory at all.",
      "Option B is incorrect because CLAUDE_DISABLE_CODE_GEN is not a valid Claude Code configuration key, and path-based behavioral rules are configured in CLAUDE.md.",
      "Option C is incorrect because slash commands provide reusable user prompts or manual tools, rather than enforcing persistent automatic path restrictions during editing.",
      "Option D is correct because adding [rules for \"docs/**\"] in CLAUDE.md establishes a path-specific rule that applies exclusively when Claude Code operates on files matching the docs/** glob pattern."
    ],
    "rationale": "Path-specific rules in CLAUDE.md using glob pattern section headers (such as [rules for \"docs/**\"]) allow developers to apply custom behavioral constraints—such as enforcing prose-only documentation editing without code generation—to targeted repository subdirectories.",
    "explanation": "Trong Claude Code, để áp dụng các hướng dẫn hành vi cho một đường dẫn thư mục cụ thể (như /docs/**), giải pháp chuẩn là sử dụng phần tiêu đề quy tắc glob trong CLAUDE.md dạng [rules for \"docs/**\"].\\n\\n- Option A sai vì thêm vào .claudeignore sẽ ẩn hoàn toàn tệp khỏi Claude Code, khiến nó không thể đọc hay chỉnh sửa tài liệu.\\n- Option B sai vì CLAUDE_DISABLE_CODE_GEN không phải là một thuộc tính cấu hình hợp lệ của Claude Code.\\n- Option C sai vì lệnh gạch chéo (slash command) là công cụ kích hoạt thủ công, không dùng để áp dụng quy tắc đường dẫn tự động.\\n- Option D đúng vì tiêu đề quy tắc glob [rules for \"docs/**\"] trong CLAUDE.md định cấu hình chính xác các ràng buộc chỉ chỉnh sửa văn bản cho thư mục tài liệu.",
    "scenarioSignature": {
      "testedPrinciple": "path-specific rule scoping for documentation directory constraint enforcement",
      "failureMode": "unwanted code generation and technical implementation blocks inside documentation files",
      "rootCause": "lack of path-scoped guidelines restricting Claude Code behavior within documentation paths",
      "requiredFix": "configure glob section for documentation paths in CLAUDE.md with prose-only rules"
    },
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  }
]