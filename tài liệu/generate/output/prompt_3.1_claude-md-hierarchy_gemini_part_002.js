[
  {
    "id": "d3-b06-new-003",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-003",
    "scenarioSignature": {
      "testedPrinciple": "innermost directory file configuration precedence over global user configuration",
      "failureMode": "unexpected code formatting applied when editing source file in specific component directory",
      "rootCause": "unaware that subdirectory CLAUDE.md overrides global configuration for matching paths",
      "requiredFix": "respect local subdirectory rule over global user default formatting preferences"
    },
    "questionEN": "A developer configures global preferences in ~/.claude/CLAUDE.md with the instruction: 'Use double quotes for all Python string literals'. However, the repository contains a subdirectory configuration file at /repo/src/payments/CLAUDE.md with the rule: 'Use single quotes for Python string literals'. When Claude Code edits /repo/src/payments/charge.py, which formatting rule is enforced?",
    "question": "[d3-b06-new-003] Lập trình viên đã cấu hình tùy chọn toàn cục trong ~/.claude/CLAUDE.md với quy tắc: 'Sử dụng dấu ngoặc kép cho tất cả chuỗi Python'. Tuy nhiên, kho lưu trữ chứa một tệp cấu hình thư mục con tại /repo/src/payments/CLAUDE.md với quy tắc: 'Sử dụng dấu ngoặc đơn cho chuỗi Python'. Khi Claude Code chỉnh sửa tệp /repo/src/payments/charge.py, quy tắc định dạng nào sẽ được áp dụng?",
    "optionsEN": [
      "A. The global rule ('use double quotes') takes precedence because ~/.claude/CLAUDE.md sets system-wide default formatting across all projects.",
      "B. Both rules conflict, causing Claude Code to halt execution with a configuration merge error.",
      "C. The subdirectory rule ('use single quotes') in /repo/src/payments/CLAUDE.md takes precedence because closer directory scopes override broader global settings.",
      "D. The project root rules govern all subdirectories, so subdirectory rules are ignored unless explicitly imported into the root CLAUDE.md."
    ],
    "options": [
      "A. Quy tắc toàn cục ('sử dụng dấu ngoặc kép') được ưu tiên vì ~/.claude/CLAUDE.md thiết lập định dạng mặc định cho toàn bộ hệ thống.",
      "B. Cả hai quy tắc xung đột với nhau, khiến Claude Code dừng thực thi và báo lỗi hợp nhất cấu hình.",
      "C. Quy tắc thư mục con ('sử dụng dấu ngoặc đơn') trong /repo/src/payments/CLAUDE.md được ưu tiên vì phạm vi thư mục gần nhất ghi đè cấu hình toàn cục rộng hơn.",
      "D. Quy tắc gốc dự án chi phối tất cả thư mục con, do đó các quy tắc thư mục con bị bỏ qua trừ khi được import rõ ràng vào CLAUDE.md gốc."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because global configuration (~/.claude/CLAUDE.md) has the lowest precedence in the hierarchy and is overridden by more localized CLAUDE.md files.",
      "Option B is incorrect because Claude Code does not crash on conflicting formatting instructions; it resolves conflicts using standard directory-depth precedence rules.",
      "Option C is correct because the standard CLAUDE.md hierarchy precedence dictates that subdirectory configuration (/repo/src/payments/CLAUDE.md) overrides both project root and global configurations for files inside that subdirectory.",
      "Option D is incorrect because subdirectory CLAUDE.md files automatically take precedence for their path hierarchy without requiring explicit import directives in the root file."
    ],
    "rationale": "In Claude Code's three-level hierarchy (subdirectory > project root > global), localized subdirectory configuration (/repo/src/payments/CLAUDE.md) has higher precedence than global user settings (~/.claude/CLAUDE.md), so single quotes are enforced when editing payments/charge.py.",
    "explanation": "Trong hệ thống thứ bậc 3 cấp của Claude Code (Thư mục con > Gốc dự án > Toàn cục), quy tắc ở vị trí càng gần với tệp đang được chỉnh sửa sẽ có độ ưu tiên càng cao (innermost wins). Tại tệp /repo/src/payments/charge.py, quy tắc trong tệp thư mục con /repo/src/payments/CLAUDE.md ('sử dụng dấu ngoặc đơn') sẽ ghi đè quy tắc toàn cục trong ~/.claude/CLAUDE.md ('sử dụng dấu ngoặc kép'). Phương án A sai vì cấu hình toàn cục có độ ưu tiên thấp nhất. Phương án B sai vì hệ thống tự phân giải xung đột theo cấp bậc chứ không báo lỗi. Phương án D sai vì tệp thư mục con tự động có hiệu lực cho phạm vi của nó mà không cần import ở root.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-004",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-004",
    "scenarioSignature": {
      "testedPrinciple": "additive evaluation of hierarchy levels with graceful fallback when intermediate config levels are absent",
      "failureMode": "misunderstanding configuration availability when project root configuration file is missing",
      "rootCause": "assuming missing project root configuration invalidates lower or higher hierarchy levels",
      "requiredFix": "continue applying global user settings and subdirectory rules additively when project root file is absent"
    },
    "questionEN": "A developer works in a microservice codebase where no project root CLAUDE.md file exists (it was deleted or never initialized). However, the developer has defined user preferences in ~/.claude/CLAUDE.md and component-specific guidelines in /repo/src/billing/CLAUDE.md. Is the statement 'Global rules and subdirectory rules both still apply additively when editing files in /repo/src/billing/' True or False?",
    "question": "[d3-b06-new-004] Một lập trình viên làm việc trong một cơ sở mã dịch vụ nhỏ mà không có tệp CLAUDE.md ở gốc dự án (đã bị xóa hoặc chưa bao giờ khởi tạo). Tuy nhiên, lập trình viên đã định nghĩa các tùy chọn cá nhân trong ~/.claude/CLAUDE.md và hướng dẫn riêng cho thành phần trong /repo/src/billing/CLAUDE.md. Phát biểu 'Cả quy tắc toàn cục và quy tắc thư mục con vẫn được áp dụng cộng dồn khi chỉnh sửa các tệp trong /repo/src/billing/' là Đúng hay Sai?",
    "optionsEN": [
      "A. False; deleting the project root CLAUDE.md disables all configuration loading and causes Claude Code to fail with a missing root configuration error.",
      "B. False; only global rules apply because subdirectory configuration files require an active project root CLAUDE.md manifest to be indexed.",
      "C. False; subdirectory rules apply, but global user preferences are disabled whenever a project lacks a root configuration file.",
      "D. True; missing hierarchy levels are skipped gracefully, so non-conflicting global rules (~/.claude/CLAUDE.md) and subdirectory rules (/repo/src/billing/CLAUDE.md) both apply simultaneously."
    ],
    "options": [
      "A. Sai; việc xóa CLAUDE.md ở gốc dự án sẽ vô hiệu hóa tất cả việc tải cấu hình và khiến Claude Code báo lỗi thiếu tệp cấu hình gốc.",
      "B. Sai; chỉ các quy tắc toàn cục có hiệu lực vì các tệp cấu hình thư mục con bắt buộc phải có CLAUDE.md ở gốc dự án để làm tệp khai báo chỉ mục.",
      "C. Sai; các quy tắc thư mục con được áp dụng, nhưng các tùy chọn toàn cục bị vô hiệu hóa bất cứ khi nào dự án thiếu tệp cấu hình gốc.",
      "D. Đúng; các cấp độ cấu hình bị thiếu sẽ được bỏ qua một cách linh hoạt, do đó các quy tắc toàn cục (~/.claude/CLAUDE.md) và quy tắc thư mục con (/repo/src/billing/CLAUDE.md) không xung đột sẽ đồng thời áp dụng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because Claude Code does not require a project root CLAUDE.md to operate, and missing hierarchy levels do not trigger configuration errors.",
      "Option B is incorrect because subdirectory CLAUDE.md files are evaluated based on directory structure independently of whether a root CLAUDE.md exists.",
      "Option C is incorrect because global configuration (~/.claude/CLAUDE.md) is always loaded for the user session regardless of project root status.",
      "Option D is correct because Claude Code treats hierarchy levels additively and skips missing levels gracefully, allowing global and subdirectory rules to remain fully active and combined."
    ],
    "rationale": "Claude Code configuration hierarchy is additive and fault-tolerant: if a level (such as project root CLAUDE.md) is absent, that level is simply skipped while existing levels (~/.claude/CLAUDE.md and /repo/src/billing/CLAUDE.md) continue to apply additively.",
    "explanation": "Trong Claude Code, thứ bậc cấu hình hoạt động theo nguyên tắc cộng dồn (additive) và bỏ qua linh hoạt các cấp bị thiếu. Nếu tệp CLAUDE.md ở gốc dự án không tồn tại, Claude Code sẽ bỏ qua cấp này và áp dụng tất cả các tệp cấu hình hiện có: cấu hình toàn cục ~/.claude/CLAUDE.md và tệp cấu hình thư mục con /repo/src/billing/CLAUDE.md. Do đó, phát biểu trên là Đúng. Các phương án A, B, C sai vì đưa ra các giả định không chính xác về sự phụ thuộc giữa tệp gốc và các tệp ở cấp khác.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]