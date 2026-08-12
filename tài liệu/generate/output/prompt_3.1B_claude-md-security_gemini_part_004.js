[
  {
    "id": "d3-b06-B-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-007",
    "scenarioSignature": {
      "testedPrinciple": "recursive inheritance of subdirectory configuration rules to deeper nested paths",
      "failureMode": "unexpected execution of parent subdirectory security guidelines inside child folders",
      "rootCause": "automatic downward propagation of subdirectory configuration files to child directories",
      "requiredFix": "rely on parent folder instructions for nested subdirectories unless explicitly overridden"
    },
    "questionEN": "A healthcare engineering team configures /src/healthcare/CLAUDE.md with the governance rule: All patient data must be de-identified before writing to log streams. An engineer runs Claude Code inside /src/healthcare/admin/reports.ts to implement logging. How does Claude Code handle the logging rule from the parent /src/healthcare/ folder during this session?",
    "question": "[d3-b06-B-007] Một đội ngũ kỹ thuật y tế cấu hình /src/healthcare/CLAUDE.md với quy tắc quản trị: All patient data must be de-identified before writing to log streams. Một kỹ sư chạy Claude Code bên trong /src/healthcare/admin/reports.ts để triển khai ghi log. Claude Code xử lý quy tắc ghi log từ thư mục cha /src/healthcare/ như thế nào trong phiên làm việc này?",
    "optionsEN": [
      "A. It ignores the rule because CLAUDE.md files located in parent subdirectories do not apply to nested subfolders unless explicitly listed in root configuration.",
      "B. It prompts the user for manual confirmation before applying /src/healthcare/CLAUDE.md rules inside the /src/healthcare/admin/ subdirectory.",
      "C. It automatically inherits and applies the de-identification rule to /src/healthcare/admin/ because subdirectory rules cascade recursively down the directory tree.",
      "D. It replaces the rule with global settings because subdirectories deeper than one level reset configuration inheritance to default values."
    ],
    "options": [
      "A. Nó bỏ qua quy tắc vì các file CLAUDE.md nằm ở thư mục con cấp cha không áp dụng cho các thư mục con lồng bên trong trừ khi được kê khai rõ ràng ở cấu hình gốc.",
      "B. Nó yêu cầu người dùng xác nhận thủ công trước khi áp dụng các quy tắc /src/healthcare/CLAUDE.md bên trong thư mục con /src/healthcare/admin/.",
      "C. Nó tự động kế thừa và áp dụng quy tắc khử nhận dạng dữ liệu cho /src/healthcare/admin/ vì các quy tắc trong thư mục con áp dụng phân tầng đệ quy xuống cây thư mục.",
      "D. Nó thay thế quy tắc bằng các cài đặt toàn cục vì các thư mục con sâu hơn một cấp sẽ đặt lại việc kế thừa cấu hình về giá trị mặc định."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Subdirectory CLAUDE.md files automatically cascade down into child subdirectories without requiring explicit registration in root config.",
      "Option B is incorrect: Rule inheritance down subdirectories is automatic and does not trigger interactive confirmation prompts.",
      "Option C is correct: CLAUDE.md rules in a subdirectory apply to all files and subfolders nested beneath it (such as /src/healthcare/admin/), unless a deeper CLAUDE.md overrides them.",
      "Option D is incorrect: Directory depth does not break or reset rule inheritance to global defaults."
    ],
    "rationale": "In Claude Code, rules specified in a subdirectory CLAUDE.md file inherit recursively down into all nested subdirectories. Therefore, /src/healthcare/CLAUDE.md governs actions within /src/healthcare/admin/.",
    "explanation": "Trong cơ chế quản lý cấu hình của Claude Code, các quy tắc được định nghĩa trong file CLAUDE.md ở một thư mục con sẽ tự động được kế thừa đệ quy xuống tất cả các thư mục con cấp thấp hơn (như /src/healthcare/admin/). Do đó, quy tắc yêu cầu khử nhận dạng dữ liệu bệnh nhân từ /src/healthcare/CLAUDE.md vẫn có hiệu lực khi thao tác trong /src/healthcare/admin/reports.ts. Lựa chọn C là chính xác. Lựa chọn A sai vì không cần khai báo ở root. Lựa chọn B sai vì hệ thống không hỏi xác nhận thủ công. Lựa chọn D sai vì độ sâu thư mục không làm vô hiệu hóa quy tắc kế thừa.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-008",
    "scenarioSignature": {
      "testedPrinciple": "distinction between behavioral guidelines in configuration files and technical tool permission enforcement",
      "failureMode": "unintended write file operations executed during automated continuous integration pipelines",
      "rootCause": "relying on text instructions in configuration files to restrict tool execution capability",
      "requiredFix": "configure tool permissions explicitly via command flags or allowedTools settings rather than markdown guidelines"
    },
    "questionEN": "A DevOps team creates /ci/CLAUDE.md containing text instructions: Only read files, never write or modify code. In GitHub Actions, Claude Code is executed in /ci/ without restricting --allowedTools command line flags. During an automated run, can Claude Code still execute write operations?",
    "question": "[d3-b06-B-008] Một đội ngũ DevOps tạo file /ci/CLAUDE.md chứa hướng dẫn văn bản: Only read files, never write or modify code. Trong GitHub Actions, Claude Code được thực thi tại /ci/ mà không hạn chế cờ dòng lệnh --allowedTools. Trong quá trình chạy tự động, Claude Code có thể vẫn thực hiện các thao tác ghi hay không?",
    "optionsEN": [
      "A. No, because text directives in CLAUDE.md act as hard security sandboxes that physically disable file write tools at the system level.",
      "B. No, because running inside a /ci/ subdirectory automatically forces Claude Code into a read-only environment regardless of tool availability.",
      "C. Yes, but only if the user manually confirms the write action through an interactive approval prompt during the pipeline run.",
      "D. Yes, because CLAUDE.md provides soft prompt guidance rather than technical tool permission enforcement; strict restrictions require configuring tool permissions."
    ],
    "options": [
      "A. Không, vì các chỉ thị văn bản trong CLAUDE.md hoạt động như một sandbox bảo mật cứng giúp vô hiệu hóa vật lý các công cụ ghi file ở cấp hệ thống.",
      "B. Không, vì việc chạy bên trong thư mục con /ci/ sẽ tự động ép buộc Claude Code vào môi trường chỉ đọc bất kể khả năng của công cụ.",
      "C. Có, nhưng chỉ khi người dùng xác nhận thủ công hành động ghi thông qua lời nhắn phê duyệt tương tác trong quá trình chạy pipeline.",
      "D. Có, vì CLAUDE.md cung cấp hướng dẫn nhắc mềm thay vì thực thi quyền hạn công cụ về mặt kỹ thuật; các hạn chế nghiêm ngặt yêu cầu cấu hình quyền hạn công cụ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: CLAUDE.md instructions serve as context/prompting guidance to the LLM and do not act as technical sandboxes or tool disablers.",
      "Option B is incorrect: Subdirectory paths like /ci/ do not automatically restrict tool execution capabilities.",
      "Option C is incorrect: Non-interactive CI environments do not support interactive confirmation prompts to gate tool execution.",
      "Option D is correct: CLAUDE.md guides model behavior via prompt instructions, but technical tool enforcement requires setting tool permission controls such as allowedTools."
    ],
    "rationale": "CLAUDE.md rules guide the AI's behavior via prompting, but do not provide programmatic permission enforcement. To strictly restrict Claude Code from writing files in CI, tool permissions (such as allowedTools or CLI parameters) must be used.",
    "explanation": "File CLAUDE.md đóng vai trò là hướng dẫn ngữ cảnh (prompt guidance) định hình hành vi của AI model, chứ không có cơ chế chặn kỹ thuật (hard security restriction) ở cấp hệ thống. Nếu các công cụ ghi (file write tools) vẫn có sẵn và không bị giới hạn qua cấu hình quyền hạn công cụ (như --allowedTools), Claude Code về mặt lý thuyết vẫn có khả năng gọi công cụ ghi. Do đó lựa chọn D là chính xác. Các lựa chọn A, B sai vì CLAUDE.md không phải sandbox kỹ thuật. Lựa chọn C sai vì trong CI không có tương tác người dùng.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]