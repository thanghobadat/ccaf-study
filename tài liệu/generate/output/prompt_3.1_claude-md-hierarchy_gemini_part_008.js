[
  {
    "id": "d3-b06-new-015",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-015",
    "scenarioSignature": {
      "testedPrinciple": "session lifecycle configuration loading for project rules",
      "failureMode": "persistence of obsolete project instructions during active interactive session",
      "rootCause": "in-memory caching of configuration files established at session launch",
      "requiredFix": "pull remote repository updates and launch a new session"
    },
    "questionEN": "A software engineering team updates the repository root /repo/CLAUDE.md on the main branch to enforce biome check instead of eslint. Developer Alice executes git pull in her terminal while maintaining an active interactive Claude Code CLI session. When she prompts Claude Code to reformat a modified source file, Claude continues invoking eslint. What is the primary cause of this behavior and the required resolution?",
    "question": "[d3-b06-new-015] Nhóm kỹ thuật phần mềm cập nhật tệp /repo/CLAUDE.md trên nhánh main để thực thi biome check thay vì eslint. Lập trình viên Alice thực hiện git pull trong terminal trong khi đang mở một phiên làm việc Claude Code CLI tương tác. Khi cô ấy yêu cầu Claude Code định dạng lại một tệp mã nguồn vừa sửa đổi, Claude vẫn tiếp tục gọi eslint. Nguyên nhân chính của hành vi này và giải pháp cần thiết là gì?",
    "optionsEN": [
      "A. CLAUDE.md changes require updating ~/.claude/CLAUDE.md to trigger a global sync; Alice must copy the new rules to her local directory.",
      "B. git pull invalidates the local repository configuration index; Alice must execute claude --reload-config within her running session.",
      "C. Claude Code loads CLAUDE.md rules into memory only at session initialization; Alice must run git pull AND restart her Claude session to load the updated rules.",
      "D. Project root configuration changes apply dynamically, but local file locks prevent CLAUDE.md updates; Alice must run git checkout main -- CLAUDE.md to release the lock."
    ],
    "options": [
      "A. Các thay đổi trong CLAUDE.md yêu cầu cập nhật ~/.claude/CLAUDE.md để kích hoạt đồng bộ toàn cục; Alice phải sao chép quy tắc mới vào thư mục cục bộ của mình.",
      "B. Lệnh git pull làm mất hiệu lực chỉ mục cấu hình kho lưu trữ cục bộ; Alice phải chạy claude --reload-config trong phiên làm việc đang chạy.",
      "C. Claude Code chỉ tải các quy tắc CLAUDE.md vào bộ nhớ khi khởi tạo phiên làm việc; Alice phải chạy git pull VÀ khởi động lại phiên Claude để tải các quy tắc mới.",
      "D. Các thay đổi cấu hình gốc dự án được áp dụng động, nhưng khóa tệp cục bộ ngăn cản cập nhật CLAUDE.md; Alice phải chạy git checkout main -- CLAUDE.md để giải phóng khóa."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because project root rules do not require duplication in global configuration ~/.claude/CLAUDE.md to take effect.",
      "Option B is incorrect because Claude Code does not feature a claude --reload-config CLI flag; configuration files are cached in memory for the duration of the interactive session.",
      "Option C is correct because Claude Code reads and parses CLAUDE.md files upon session start; updates pulled via Git after session launch are ignored until a new session is initialized.",
      "Option D is incorrect because file locking is not what prevents rule adoption; the active session simply does not re-read disk configuration mid-session."
    ],
    "rationale": "Claude Code evaluates and caches configuration files such as CLAUDE.md only at session launch. Pulling updated rules via git pull during an active session leaves the old configuration in memory. To apply the new rules, the developer must restart the session.",
    "explanation": "Giải thích chi tiết về hệ thống cấu hình trong Claude Code:\n\n- Option A sai: Quy tắc cấp project root trong CLAUDE.md hoạt động độc lập và không yêu cầu phải sao chép vào cấu hình toàn cục ~/.claude/CLAUDE.md mới có hiệu lực.\n- Option B sai: Claude Code không hỗ trợ cờ lệnh claude --reload-config để làm mới cấu hình trong phiên đang chạy; các tệp cấu hình được đọc cố định khi bắt đầu phiên.\n- Option C đúng: Tệp CLAUDE.md chỉ được đọc và nạp vào bộ nhớ tại thời điểm khởi tạo phiên làm việc (session start). Khi có cập nhật mới từ remote, developer cần chạy git pull để tải tệp về đĩa và khởi động lại phiên Claude Code để hệ thống đọc lại cấu hình mới.\n- Option D sai: Không có chế độ khóa tệp (file lock) nào ngăn cản việc áp dụng quy tắc; vấn đề nằm ở cơ chế nạp cấu hình theo vòng đời phiên làm việc (session lifecycle caching).",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-016",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-016",
    "scenarioSignature": {
      "testedPrinciple": "hierarchical rule precedence resolution across global and project levels",
      "failureMode": "incorrect assumption that global configuration overrides project root instructions",
      "rootCause": "project root configuration overriding broader global configuration rules",
      "requiredFix": "apply project root rule over global rule for repository files"
    },
    "questionEN": "A developer has a global configuration ~/.claude/CLAUDE.md stating 'use var for hoisting performance in JavaScript/TypeScript'. However, the cloned repository contains /repo/CLAUDE.md which specifies 'never use var; always use const or let'. When asking Claude Code to refactor a file located at /repo/src/service.ts, which variable declaration rule will Claude Code follow and why?",
    "question": "[d3-b06-new-016] Lập trình viên có tệp cấu hình toàn cục ~/.claude/CLAUDE.md quy định 'sử dụng var để tối ưu hiệu năng hoisting trong JavaScript/TypeScript'. Tuy nhiên, kho lưu trữ được clone chứa /repo/CLAUDE.md quy định 'không bao giờ sử dụng var; luôn sử dụng const hoặc let'. Khi yêu cầu Claude Code tái cấu trúc một tệp tại /repo/src/service.ts, quy tắc khai báo biến nào sẽ được Claude Code tuân theo và tại sao?",
    "optionsEN": [
      "A. It will follow the global rule because global user configuration always takes precedence over repository-level rules across all file types.",
      "B. It will merge both rules and randomly alternate between var and const/let based on function block scope nesting.",
      "C. It will ignore both rules because TypeScript files .ts are exempt from JavaScript variable declaration rules unless explicitly specified in a glob section.",
      "D. It will follow the project root rule ('never use var') because project-level CLAUDE.md overrides global ~/.claude/CLAUDE.md for files inside the repository."
    ],
    "options": [
      "A. Nó sẽ tuân theo quy tắc toàn cục vì cấu hình người dùng toàn cục luôn ưu tiên hơn quy tắc cấp kho lưu trữ trên tất cả các loại tệp.",
      "B. Nó sẽ hợp nhất cả hai quy tắc và luân phiên ngẫu nhiên giữa var và const/let dựa trên mức độ đóng khối hàm.",
      "C. Nó sẽ bỏ qua cả hai quy tắc vì các tệp TypeScript .ts được miễn trừ khỏi quy tắc khai báo biến JavaScript trừ khi được chỉ định rõ trong mục glob.",
      "D. Nó sẽ tuân theo quy tắc gốc dự án ('không bao giờ sử dụng var') vì CLAUDE.md cấp dự án đè lên ~/.claude/CLAUDE.md toàn cục cho các tệp bên trong kho lưu trữ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because global configuration ~/.claude/CLAUDE.md has lower precedence than project root configuration CLAUDE.md.",
      "Option B is incorrect because conflicting rules are not combined or randomly selected; the higher precedence level completely overrides conflicting lower-level rules.",
      "Option C is incorrect because project root styling rules apply broadly to language variants like TypeScript unless explicitly scoped otherwise by glob patterns.",
      "Option D is correct because in the Claude Code hierarchy, project root rules override global rules for all files within the repository tree."
    ],
    "rationale": "In the Claude Code configuration hierarchy, more specific local levels override broader parent levels. Project root configuration (/repo/CLAUDE.md) takes precedence over global configuration (~/.claude/CLAUDE.md). Therefore, the project-level rule ('never use var') overrides the global rule for files within the repository.",
    "explanation": "Giải thích chi tiết về thứ tự ưu tiên cấu hình CLAUDE.md:\n\n- Option A sai: Cấu hình toàn cục ~/.claude/CLAUDE.md có độ ưu tiên thấp hơn cấu hình gốc dự án CLAUDE.md. Khi có xung đột, quy tắc cấp dự án sẽ ghi đè quy tắc toàn cục.\n- Option B sai: Claude Code không hợp nhất hoặc thay đổi ngẫu nhiên các quy tắc xung đột; quy tắc ở cấp cao hơn trong hệ thống thứ bậc sẽ ghi đè hoàn toàn quy tắc ở cấp thấp hơn.\n- Option C sai: Các quy tắc chung về phong cách mã trong CLAUDE.md áp dụng cho toàn bộ tệp mã nguồn trong dự án (bao gồm cả TypeScript) trừ khi được loại trừ cụ thể.\n- Option D đúng: Thứ tự ưu tiên của Claude Code là Subdirectory > Project Root > Global. Do tệp /repo/src/service.ts nằm trong kho lưu trữ, tệp /repo/CLAUDE.md (cấp project root) sẽ ghi đè ~/.claude/CLAUDE.md (cấp global), do đó quy tắc 'không bao giờ sử dụng var' sẽ được áp dụng.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]