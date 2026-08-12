[
  {
    "id": "d3-b06-B-017",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-017",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory CLAUDE.md contextual loading based on active working directory or targeted path",
      "failureMode": "inconsistent output formatting between local root execution and subpath CI pipeline execution",
      "rootCause": "subdirectory rule requiring valid JSON output is only evaluated when operating inside that subdirectory context",
      "requiredFix": "execute Claude Code within the specific subdirectory or replicate the rule in root configuration"
    },
    "questionEN": "A GitHub Actions workflow executes Claude Code in headless mode with CLI command claude --print from the /ci directory, where /ci/CLAUDE.md contains the rule 'output must be valid JSON'. A developer executing claude locally from the repository root directory /repo observes that Claude outputs unformatted plain text instead of JSON. What explains this difference in behavior?",
    "question": "Một workflow GitHub Actions thực thi Claude Code ở chế độ headless với lệnh CLI claude --print từ thư mục /ci, nơi /ci/CLAUDE.md chứa quy tắc 'output must be valid JSON'. Một lập trình viên thực thi claude tại địa phương từ thư mục gốc của repository /repo nhận thấy Claude xuất văn bản thuần không được định dạng thay vì JSON. Điều gì giải thích sự khác biệt về hành vi này?",
    "optionsEN": [
      "A. Subdirectory rules in /ci/CLAUDE.md are loaded only when Claude Code operates within or targets files under /ci, so execution from the repository root omits the rule.",
      "B. Claude Code automatically detects environment variables such as CI=true and ignores all local CLAUDE.md files unless --ci-mode is passed.",
      "C. Rules in /ci/CLAUDE.md require non-interactive CLI flags to take effect, which are absent during interactive local terminal sessions.",
      "D. The local execution engine overrides subdirectory rules with personal configuration cached in ~/.claude.json."
    ],
    "options": [
      "A. Các quy tắc trong thư mục con /ci/CLAUDE.md chỉ được tải khi Claude Code hoạt động bên trong hoặc thao tác với các tệp thuộc /ci, do đó việc thực thi từ thư mục gốc repository sẽ bỏ qua quy tắc này.",
      "B. Claude Code tự động phát hiện các biến môi trường như CI=true và bỏ qua tất cả các tệp CLAUDE.md địa phương trừ khi truyền --ci-mode.",
      "C. Các quy tắc trong /ci/CLAUDE.md yêu cầu các cờ CLI không tương tác để có hiệu lực, các cờ này không có mặt trong các phiên terminal tương tác địa phương.",
      "D. Engine thực thi địa phương ghi đè các quy tắc thư mục con bằng cấu hình cá nhân được lưu trong bộ nhớ đệm ~/.claude.json."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Claude Code dynamically loads CLAUDE.md files along the path of the current working directory or active files; executing from repository root without targeting /ci does not load /ci/CLAUDE.md.",
      "Option B is incorrect: Environment variables like CI=true do not cause Claude Code to ignore directory CLAUDE.md files nor is there a --ci-mode flag required for configuration parsing.",
      "Option C is incorrect: CLAUDE.md directory scoping applies based on path context, not based on interactive vs non-interactive session modes.",
      "Option D is incorrect: Global configuration files do not automatically disable project or subdirectory CLAUDE.md rules."
    ],
    "rationale": "Claude Code evaluates hierarchy and scoping based on the active path context. When executed from the repository root, /ci/CLAUDE.md is outside the current directory scope unless files inside /ci are directly targeted, resulting in standard root configuration behavior.",
    "explanation": "Trong Claude Code, các tệp CLAUDE.md tại thư mục con chỉ được đưa vào ngữ cảnh (context) khi người dùng chạy lệnh bên trong thư mục đó hoặc khi thao tác trực tiếp với các tệp thuộc thư mục đó. Khi chạy từ thư mục gốc /repo, Claude Code chỉ tải cấu hình từ thư mục gốc mà không tự động đọc tệp /ci/CLAUDE.md. Do đó, quy tắc bắt buộc định dạng JSON nằm trong /ci/CLAUDE.md sẽ bị bỏ qua khi lập trình viên thực thi lệnh từ thư mục gốc.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-018",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-018",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory CLAUDE.md behavioral restriction enforcement",
      "failureMode": "unintended modification or feature addition in legacy module directory",
      "rootCause": "explicit policy in subdirectory CLAUDE.md prohibiting new feature additions and restricting scope to bug fixes",
      "requiredFix": "adhere to subdirectory CLAUDE.md constraints by declining feature additions and restricting changes to bug fixes"
    },
    "questionEN": "A codebase contains a deprecated legacy module with a dedicated configuration file /src/legacy/CLAUDE.md stating: 'This code is deprecated. Do not add new features. Only apply bug fixes.' A developer starts a Claude Code session and prompts: 'Add a new caching layer to /src/legacy/auth_provider.py.' How does Claude Code respond?",
    "question": "Một codebase chứa một module cũ đã bị phản đối (deprecated) với tệp cấu hình riêng /src/legacy/CLAUDE.md ghi: 'This code is deprecated. Do not add new features. Only apply bug fixes.' Một lập trình viên bắt đầu một phiên Claude Code và yêu cầu: 'Add a new caching layer to /src/legacy/auth_provider.py.' Claude Code sẽ xử lý như thế nào?",
    "optionsEN": [
      "A. Claude Code overrides the subdirectory instruction because direct user prompts take absolute precedence over repository markdown guidance.",
      "B. Claude Code reads /src/legacy/CLAUDE.md upon accessing /src/legacy/auth_provider.py and declines the request to add a new feature, explaining that only bug fixes are allowed in this directory.",
      "C. Claude Code automatically creates a replacement file under /src/v2/auth_provider.py and implements the caching layer there without modifying the legacy file.",
      "D. Claude Code prompts the user to delete /src/legacy/CLAUDE.md before it can execute file edits on deprecated paths."
    ],
    "options": [
      "A. Claude Code ghi đè hướng dẫn của thư mục con vì các yêu cầu trực tiếp từ người dùng luôn có ưu tiên tuyệt đối so với tài liệu hướng dẫn markdown trong repository.",
      "B. Claude Code đọc /src/legacy/CLAUDE.md khi truy cập /src/legacy/auth_provider.py và từ chối yêu cầu thêm tính năng mới, giải thích rằng chỉ cho phép sửa lỗi (bug fixes) trong thư mục này.",
      "C. Claude Code tự động tạo một tệp thay thế tại /src/v2/auth_provider.py và triển khai tầng caching ở đó mà không sửa đổi tệp cũ.",
      "D. Claude Code yêu cầu người dùng xóa /src/legacy/CLAUDE.md trước khi có thể thực hiện chỉnh sửa tệp trên các đường dẫn bị hạn chế."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Claude Code adheres to behavioral governance instructions specified in scoped CLAUDE.md files rather than blindly overriding safety/deprecation constraints.",
      "Option B is correct: Subdirectory CLAUDE.md rules govern agent behavior when operating within that path; Claude Code reads the deprecation rule and declines adding new features.",
      "Option C is incorrect: Claude Code does not arbitrarily refactor or move files to non-existent new paths like /src/v2/ unless explicitly instructed by the developer.",
      "Option D is incorrect: Claude Code does not request deletion of configuration files to bypass scoped repository policy constraints."
    ],
    "rationale": "Scoped CLAUDE.md files enforce behavioral guardrails for specific directories. When asked to modify files inside /src/legacy/, Claude Code loads /src/legacy/CLAUDE.md, recognizes the restriction against adding new features, and rejects the task while offering to perform bug fixes if needed.",
    "explanation": "Các tệp CLAUDE.md tại thư mục con đóng vai trò quy định hành vi (behavioral rules) cho Claude Code khi thao tác trong phạm vi đường dẫn đó. Khi đọc/chỉnh sửa tệp /src/legacy/auth_provider.py, Claude Code tự động tải quy tắc từ /src/legacy/CLAUDE.md. Nhận thấy quy tắc cấm thêm tính năng mới ('Do not add new features. Only apply bug fixes'), Claude Code tuân thủ hướng dẫn quản trị này và từ chối yêu cầu thêm tầng caching, đồng thời thông báo rõ lý do cho lập trình viên.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]