[
  {
    "id": "d3-b06-new-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-001",
    "scenarioSignature": {
      "testedPrinciple": "hierarchical precedence of repository configuration over global user configuration",
      "failureMode": "code style mismatch during automated refactoring",
      "rootCause": "conflicting formatting directives across global and repository configuration files",
      "requiredFix": "apply project root configuration rules to override global preferences"
    },
    "questionEN": "A software developer working on the fintech-ledger project has a global configuration file ~/.claude/CLAUDE.md containing indentation: 4 spaces. However, the repository contains a project-root configuration file /repo/CLAUDE.md specifying indentation: 2 spaces. When executing Claude Code CLI to refactor src/services/payment.ts, which indentation policy takes precedence during automated code generation?",
    "question": "[d3-b06-new-001] Một nhà phát triển phần mềm đang làm việc trên dự án fintech-ledger có tệp cấu hình toàn cục ~/.claude/CLAUDE.md quy định indentation: 4 spaces. Tuy nhiên, thư mục gốc của kho lưu trữ chứa tệp /repo/CLAUDE.md quy định indentation: 2 spaces. Khi chạy Claude Code CLI để tái cấu trúc src/services/payment.ts, quy tắc thụt lề nào sẽ được ưu tiên áp dụng trong quá trình sinh mã tự động?",
    "optionsEN": [
      "A. The 2-space indentation rule from /repo/CLAUDE.md takes precedence because project-level configurations override global configuration files.",
      "B. The 4-space indentation rule from ~/.claude/CLAUDE.md takes precedence because global user preferences override repository-level rules.",
      "C. Claude Code throws a configuration conflict error ERR_CLAUDE_CONFIG_MERGE_FAILED and halts session execution until duplicate rules are removed.",
      "D. Both rules are concatenated, causing Claude Code to randomly toggle between 2-space and 4-space indentation per generated file."
    ],
    "options": [
      "A. Quy tắc thụt lề 2 khoảng trắng từ /repo/CLAUDE.md được ưu tiên vì tệp cấu hình cấp dự án ghi đè tệp cấu hình toàn cục.",
      "B. Quy tắc thụt lề 4 khoảng trắng từ ~/.claude/CLAUDE.md được ưu tiên vì ưu đãi cá nhân toàn cục ghi đè các quy tắc cấp kho lưu trữ.",
      "C. Claude Code báo lỗi xung đột cấu hình ERR_CLAUDE_CONFIG_MERGE_FAILED và dừng phiên làm việc cho đến khi các quy tắc trùng lặp bị xóa bỏ.",
      "D. Cả hai quy tắc được hợp nhất bằng cách nối chuỗi, khiến Claude Code ngẫu nhiên chuyển đổi giữa thụt lề 2 khoảng trắng và 4 khoảng trắng theo tệp được sinh."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because Claude Code's configuration hierarchy enforces that project-level configuration files (e.g., /repo/CLAUDE.md) take precedence over global user-level configuration files (e.g., ~/.claude/CLAUDE.md) when conflicting rules are detected.",
      "Option B is incorrect because global configuration files represent baseline user preferences that are strictly overridden by repository-specific project rules.",
      "Option C is incorrect because Claude Code resolves configuration conflicts using deterministic hierarchy rules rather than raising a runtime merge error or halting the CLI session.",
      "Option D is incorrect because Claude Code does not concatenate conflicting style instructions or randomize code generation formatting; the project-level file deterministically supersedes the global file."
    ],
    "rationale": "Claude Code follows a strict 3-level precedence hierarchy: Subdirectory > Project Root > Global. When a formatting conflict occurs between the global file (~/.claude/CLAUDE.md) and the project root file (/repo/CLAUDE.md), the project root configuration overrides the global configuration. Therefore, Claude Code applies the 2-space indentation rule defined at the project root.",
    "explanation": "Claude Code áp dụng cơ chế phân cấp độ ưu tiên rõ ràng theo thứ tự: Subdirectory > Project Root > Global (tệp cấu hình ở vị trí sâu nhất trong thư mục sẽ có quyền ưu tiên cao nhất khi xảy ra xung đột). Tệp quy tắc cấp dự án (/repo/CLAUDE.md) đại diện cho tiêu chuẩn chung của nhóm và sẽ ghi đè thiết lập cá nhân toàn cục (~/.claude/CLAUDE.md). Do đó, quy tắc 2 khoảng trắng từ cấp dự án sẽ thắng.\n\n- Tùy chọn A đúng vì cấu hình cấp dự án ghi đè cấu hình toàn cục khi có xung đột.\n- Tùy chọn B sai vì cấu hình toàn cục có độ ưu tiên thấp hơn cấu hình cấp kho lưu trữ.\n- Tùy chọn C sai vì Claude Code giải quyết xung đột bằng thứ tự ưu tiên xác định thay vì ném lỗi dừng CLI.\n- Tùy chọn D sai vì các quy tắc xung đột không bị xen kẽ ngẫu nhiên mà tuân theo quy tắc ghi đè.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-002",
    "questionEN": "In a backend microservice repository order-fulfillment-service, the global developer settings file ~/.claude/CLAUDE.md defines always add JSDoc docstrings to exported functions. Conversely, the repository root file /repo/CLAUDE.md defines never add docstrings to TypeScript files. When an engineer uses Claude Code to edit /repo/src/api/controllers/orderController.ts (where /repo/src/api/ has no separate CLAUDE.md), which docstring rule is active?",
    "question": "[d3-b06-new-002] Trong kho lưu trữ dịch vụ microservice order-fulfillment-service, tệp thiết lập toàn cục của kỹ sư ~/.claude/CLAUDE.md quy định always add JSDoc docstrings to exported functions. Ngược lại, tệp gốc của kho lưu trữ /repo/CLAUDE.md quy định never add docstrings to TypeScript files. Khi một kỹ sư dùng Claude Code để chỉnh sửa /repo/src/api/controllers/orderController.ts (nơi thư mục /repo/src/api/ không có tệp CLAUDE.md riêng), quy tắc docstring nào sẽ có hiệu lực?",
    "optionsEN": [
      "A. The global rule applies (\"always add JSDoc docstrings\") because docstring directives are classified as user-level personal styling preferences that take top precedence.",
      "B. The project root rule applies (\"never add docstrings\") because the repository-level CLAUDE.md overrides the global ~/.claude/CLAUDE.md for all subdirectories lacking a local CLAUDE.md.",
      "C. Both rules apply sequentially, causing Claude Code to add JSDoc docstrings to function signatures but strip comments inside the function body.",
      "D. Neither rule applies because missing a CLAUDE.md file in /repo/src/api/ causes Claude Code to fallback to default LLM pre-training assumptions."
    ],
    "options": [
      "A. Quy tắc toàn cục có hiệu lực (\"always add JSDoc docstrings\") vì các chỉ thị docstring được phân loại là ưu đãi phong cách cá nhân có độ ưu tiên cao nhất.",
      "B. Quy tắc gốc dự án có hiệu lực (\"never add docstrings\") vì CLAUDE.md cấp kho lưu trữ ghi đè ~/.claude/CLAUDE.md toàn cục cho tất cả các thư mục con không có tệp CLAUDE.md riêng.",
      "C. Cả hai quy tắc đều áp dụng tuần tự, khiến Claude Code thêm JSDoc docstrings vào chữ ký hàm nhưng xóa các chú thích bên trong thân hàm.",
      "D. Không quy tắc nào áp dụng vì việc thiếu tệp CLAUDE.md trong /repo/src/api/ khiến Claude Code quay về các mặc định từ quá trình tiền huấn luyện LLM."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because global configuration directives do not override project-level rules, regardless of whether the rule touches code documentation or formatting.",
      "Option B is correct because project-level configuration files (/repo/CLAUDE.md) override global configurations (~/.claude/CLAUDE.md), and in the absence of a subdirectory CLAUDE.md in /repo/src/api/, the project root rules govern all child paths.",
      "Option C is incorrect because Claude Code does not split or combine conflicting docstring directives into contradictory partial actions.",
      "Option D is incorrect because the absence of a local subdirectory CLAUDE.md causes Claude Code to inherit rules from the project root rather than falling back to unguided model defaults."
    ],
    "rationale": "Claude Code configuration files follow a hierarchical precedence chain (Subdirectory > Project Root > Global). When modifying a file at /repo/src/api/controllers/orderController.ts, Claude Code searches up the directory tree for configuration files. Finding no local CLAUDE.md in /repo/src/api/, it uses /repo/CLAUDE.md, which explicitly overrides ~/.claude/CLAUDE.md. Therefore, the project root rule ('never add docstrings') is applied.",
    "explanation": "Theo cơ chế kế thừa và ưu tiên cấu hình của Claude Code, khi làm việc với một tệp nằm trong thư mục con (/repo/src/api/controllers/orderController.ts), CLI sẽ tìm kiếm tệp CLAUDE.md từ thư mục hiện tại ngược lên gốc kho lưu trữ và đến thư mục toàn cục người dùng. Do /repo/src/api/ không có CLAUDE.md riêng, nó kế thừa trực tiếp quy tắc từ gốc dự án (/repo/CLAUDE.md). Quy tắc gốc dự án này ghi đè hoàn toàn quy tắc toàn cục (~/.claude/CLAUDE.md).\\n\\n- Tùy chọn A sai vì cấu hình toàn cục không bao giờ ghi đè cấu hình gốc của dự án.\\n- Tùy chọn B đúng vì quy tắc cấp gốc dự án áp dụng cho các thư mục con chưa có file cấu hình riêng và ghi đè cấp toàn cục.\\n- Tùy chọn C sai vì Claude Code áp dụng quy tắc thắng thế duy nhất thay vì kết hợp các chỉ thị mâu thuẫn.\\n- Tùy chọn D sai vì khi thiếu tệp ở thư mục con, hệ thống sẽ kế thừa tệp cấp gốc dự án chứ không bỏ qua cấu hình dự án.",
    "scenarioSignature": {
      "testedPrinciple": "project root configuration override across nested subdirectories lacking dedicated configuration files",
      "failureMode": "unwanted docstring generation violating project styling standard",
      "rootCause": "misunderstanding fallback precedence between global configuration and project root configuration",
      "requiredFix": "enforce project root configuration rules across all target subdirectories"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]