[
  {
    "id": "d3-b06-new-019",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-019",
    "scenarioSignature": {
      "testedPrinciple": "additive rule merging and inner scope precedence in configuration hierarchy",
      "failureMode": "unintended logging of payment sensitive data from root rule enforcement",
      "rootCause": "misunderstanding rule override behavior when subdirectory rules contradict root rules",
      "requiredFix": "apply subdirectory rule overrides for conflicting constraints while retaining additive non-conflicting rules"
    },
    "questionEN": "An enterprise repository contains /repo/CLAUDE.md with the instruction 'Log all API request payloads and response statuses for auditability'. The subdirectory /repo/src/payments/CLAUDE.md contains the instruction 'Never log payment card data, tokens, or PII in function parameters or outputs'. When Claude Code edits /repo/src/payments/process.py to add transaction handling, how does it resolve these two instructions?",
    "question": "[d3-b06-new-019] Một kho chứa mã nguồn doanh nghiệp có file /repo/CLAUDE.md chứa chỉ thị 'Log tất cả API request payload và response status để phục vụ audit'. Thư mục con /repo/src/payments/CLAUDE.md chứa chỉ thị 'Không bao giờ log dữ liệu thẻ thanh toán, token, hoặc PII trong tham số hàm hoặc output'. Khi Claude Code chỉnh sửa /repo/src/payments/process.py để thêm xử lý giao dịch, nó sẽ giải quyết hai chỉ thị này như thế nào?",
    "optionsEN": [
      "A. The root rule overrides the subdirectory rule completely, so Claude Code logs all API payloads including payment card details.",
      "B. The subdirectory rule invalidates /repo/CLAUDE.md entirely for payments/process.py, causing Claude Code to ignore all general repo rules.",
      "C. The rules are additive, but the subdirectory rule takes precedence for conflicts; non-payment API calls are logged while payment data is strictly excluded from logs.",
      "D. Claude Code prompts the user to select which file takes priority before performing any edits in payments/process.py."
    ],
    "options": [
      "A. Quy tắc tại root ghi đè hoàn toàn quy tắc thư mục con, do đó Claude Code ghi log tất cả API payload bao gồm cả thông tin thẻ thanh toán.",
      "B. Quy tắc thư mục con làm mất hiệu lực /repo/CLAUDE.md hoàn toàn đối với payments/process.py, khiến Claude Code bỏ qua tất cả các quy tắc chung của repository.",
      "C. Các quy tắc có tính cộng dồn (additive), nhưng quy tắc thư mục con được ưu tiên khi có xung đột; các cuộc gọi API không chứa thông tin thanh toán vẫn được ghi log trong khi dữ liệu thanh toán bị nghiêm cấm ghi log.",
      "D. Claude Code sẽ yêu cầu người dùng chọn file nào được ưu tiên trước khi thực hiện bất kỳ chỉnh sửa nào trong payments/process.py."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because subdirectory configuration rules override conflicting root rules rather than being overridden by root rules.",
      "Option B is incorrect because non-conflicting root rules remain active; subdirectory files do not invalidate the entire root file.",
      "Option C is correct because CLAUDE.md rules merge additively across levels, with the subdirectory rule overriding the root rule specifically where they conflict regarding payment data logging.",
      "Option D is incorrect because Claude Code automatically resolves rule precedence hierarchically without pausing for manual user selection."
    ],
    "rationale": "CLAUDE.md files are additive across directory hierarchies. When instructions conflict, the most specific (innermost/subdirectory) rule takes precedence for files inside that subdirectory, while non-conflicting rules from higher levels continue to apply.",
    "explanation": "Trong kiến trúc cấu hình của Claude Code, các file CLAUDE.md có tính chất cộng dồn (additive) từ cấp toàn cục, thư mục gốc (root), đến thư mục con (subdirectory). Khi có xung đột trực tiếp giữa các cấp, quy tắc ở cấp sâu hơn (innermost/subdirectory) sẽ ưu tiên ghi đè quy tắc ở cấp cao hơn. Do đó, yêu cầu cấm ghi log dữ liệu thanh toán trong /repo/src/payments/CLAUDE.md sẽ ghi đè yêu cầu ghi log API chung của /repo/CLAUDE.md đối với các file trong thư mục payments/, trong khi các chỉ thị không xung đột khác vẫn được áp dụng đồng thời. Phương án A sai vì root không ghi đè subdirectory. Phương án B sai vì file cấp thư mục con không làm mất hiệu lực toàn bộ file root. Phương án D sai vì quá trình hợp nhất cấu hình diễn ra tự động theo thứ tự ưu tiên mà không cần can thiệp thủ công.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-020",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-020",
    "scenarioSignature": {
      "testedPrinciple": "equivalence of project root configuration directory locations",
      "failureMode": "misconfiguration from assuming hidden folder project settings are personal or ignored",
      "rootCause": "unawareness of equal recognition between root configuration file and hidden configuration folder path",
      "requiredFix": "place project configuration in hidden directory location to keep repository root clean"
    },
    "questionEN": "A software team is structuring the repository configuration for Claude Code. They are deciding between placing the project instructions at CLAUDE.md in the root directory versus .claude/CLAUDE.md. How does Claude Code handle these two project root paths, and why might a team choose .claude/CLAUDE.md?",
    "question": "[d3-b06-new-020] Một nhóm phát triển phần mềm đang cấu hình cấu trúc kho chứa mã nguồn cho Claude Code. Họ đang cân nhắc giữa việc đặt hướng dẫn dự án tại CLAUDE.md ở thư mục gốc so với .claude/CLAUDE.md. Claude Code xử lý hai đường dẫn cấu hình cấp root này như thế nào và tại sao một nhóm có thể chọn .claude/CLAUDE.md?",
    "optionsEN": [
      "A. Claude Code only loads configuration from CLAUDE.md at the root; .claude/CLAUDE.md is ignored unless explicitly referenced via an @import statement.",
      "B. .claude/CLAUDE.md is treated as personal global configuration that is automatically excluded from git, whereas root CLAUDE.md is committed.",
      "C. CLAUDE.md at the root takes precedence over .claude/CLAUDE.md, so placing files in .claude/ disables inherited rules from root.",
      "D. Both paths are recognized as valid project-level configurations, but .claude/CLAUDE.md is preferred to keep the repository root directory organized and uncluttered."
    ],
    "options": [
      "A. Claude Code chỉ tải cấu hình từ CLAUDE.md ở root; .claude/CLAUDE.md bị bỏ qua trừ khi được tham chiếu rõ ràng qua câu lệnh @import.",
      "B. .claude/CLAUDE.md được coi là cấu hình cá nhân toàn cục tự động bị loại khỏi git, trong khi root CLAUDE.md được commit vào repository.",
      "C. CLAUDE.md ở root có độ ưu tiên cao hơn .claude/CLAUDE.md, nên việc đặt file trong .claude/ sẽ vô hiệu hóa các quy tắc thừa kế từ root.",
      "D. Cả hai đường dẫn đều được công nhận là cấu hình cấp dự án hợp lệ, nhưng .claude/CLAUDE.md được ưu tiên chọn để giữ cho thư mục gốc của repository gọn gàng và không bị lộn xộn."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because Claude Code natively checks both root CLAUDE.md and .claude/CLAUDE.md without requiring an @import statement.",
      "Option B is incorrect because .claude/CLAUDE.md is project-scoped and meant to be committed to version control, unlike global user settings in ~/.claude/CLAUDE.md.",
      "Option C is incorrect because both paths serve as project root configuration locations rather than creating conflicting precedence tiers between themselves.",
      "Option D is correct because Claude Code supports both .claude/CLAUDE.md and root CLAUDE.md as equivalent project root configuration locations, allowing teams to keep the root folder clean by grouping settings inside .claude/."
    ],
    "rationale": "Claude Code supports project configuration at both CLAUDE.md and .claude/CLAUDE.md in the project root. Using .claude/CLAUDE.md provides an equivalent project-scoped configuration while avoiding root folder clutter.",
    "explanation": "Claude Code hỗ trợ cả hai vị trí tệp cấu hình cấp dự án ở gốc repository: CLAUDE.md hoặc .claude/CLAUDE.md. Cả hai đều được nhận diện tương đương là cấu hình cấp project và đều nên được commit vào hệ thống quản lý phiên bản (git). Việc sử dụng .claude/CLAUDE.md thường được ưu tiên lựa chọn để giữ cho thư mục gốc của dự án gọn gàng, tránh làm tăng số lượng file cấu hình nằm trực tiếp tại root. Phương án A sai vì .claude/CLAUDE.md được phát hiện tự động mà không cần @import. Phương án B sai vì file này là cấu hình cấp dự án, không phải cấu hình cá nhân ~/.claude/CLAUDE.md. Phương án C sai vì hai đường dẫn này đại diện cho cùng một cấp độ ưu tiên cấu hình dự án.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]