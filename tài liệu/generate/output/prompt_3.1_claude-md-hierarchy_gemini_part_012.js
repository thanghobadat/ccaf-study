[
  {
    "id": "d3-b06-new-023",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-23",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-023",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory configuration precedence over project root configuration",
      "failureMode": "misapplication of root formatting rule to subdirectory file",
      "rootCause": "ignoring local subdirectory CLAUDE.md rule override for nested files",
      "requiredFix": "apply inner subdirectory rule over root rule when editing subdirectory file"
    },
    "questionEN": "A repository contains a project root /repo/CLAUDE.md defining Python indentation as 4 spaces, while a subdirectory configuration /repo/src/CLAUDE.md specifies 2 spaces for Python files. An engineer prompts Claude Code to refactor /repo/src/utils/helper.py. Which indentation style will Claude Code apply to helper.py and why?",
    "question": "[d3-b06-new-023] Một kho lưu trữ có tệp gốc dự án /repo/CLAUDE.md quy định thụt lề Python là 4 khoảng trắng, trong khi tệp cấu hình thư mục con /repo/src/CLAUDE.md chỉ định 2 khoảng trắng cho các tệp Python. Kỹ sư yêu cầu Claude Code tái cấu trúc /repo/src/utils/helper.py. Quy tắc thụt lề nào sẽ được Claude Code áp dụng cho helper.py và tại sao?",
    "optionsEN": [
      "A. 4 spaces, because project root configurations take precedence over nested subdirectory configurations.",
      "B. A configuration error is thrown, because conflicting formatting rules between CLAUDE.md levels halt execution.",
      "C. 2 spaces, because subdirectory CLAUDE.md rules override project root CLAUDE.md rules for files within that subdirectory.",
      "D. 4 spaces, because Claude Code ignores conflicting instructions and defaults to standard PEP 8 formatting."
    ],
    "options": [
      "A. 4 khoảng trắng, vì cấu hình gốc dự án có độ ưu tiên cao hơn cấu hình thư mục con lồng bên trong.",
      "B. Báo lỗi cấu hình, vì các quy tắc định dạng xung đột giữa các cấp CLAUDE.md làm dừng quá trình thực thi.",
      "C. 2 khoảng trắng, vì các quy tắc CLAUDE.md ở thư mục con ghi đè quy tắc CLAUDE.md ở gốc dự án đối với các tệp nằm trong thư mục con đó.",
      "D. 4 khoảng trắng, vì Claude Code bỏ qua các hướng dẫn xung đột và mặc định dùng chuẩn định dạng PEP 8."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because root CLAUDE.md configurations are overridden by subdirectory CLAUDE.md files, not the other way around.",
      "Option B is incorrect because rule conflicts across hierarchy levels do not trigger errors; Claude Code resolves them using directory proximity.",
      "Option C is correct because /repo/src/CLAUDE.md is more specific and located closer in the filesystem hierarchy to /repo/src/utils/helper.py than /repo/CLAUDE.md.",
      "Option D is incorrect because Claude Code does not discard project rules to fall back on defaults when a valid hierarchical precedence exists."
    ],
    "rationale": "Claude Code follows a strict three-level configuration hierarchy: global < project root < subdirectory. When editing /repo/src/utils/helper.py, both /repo/CLAUDE.md and /repo/src/CLAUDE.md are evaluated. Where rules conflict, the innermost file (/repo/src/CLAUDE.md) takes precedence, resulting in 2-space indentation.",
    "explanation": "Trong cơ chế phân cấp cấu hình của Claude Code, quy tắc tại thư mục con (subdirectory) có độ ưu tiên cao nhất so với thư mục gốc dự án (project root) và cấu hình toàn cục (global). Khi chỉnh sửa tệp /repo/src/utils/helper.py, Claude Code tải cả /repo/CLAUDE.md và /repo/src/CLAUDE.md. Do có sự xung đột về quy tắc thụt lề (4 khoảng trắng vs 2 khoảng trắng), quy tắc tại tệp gần hơn với mục tiêu là /repo/src/CLAUDE.md sẽ ghi đè quy tắc ở gốc dự án. Do đó, Claude Code sẽ áp dụng 2 khoảng trắng.\n\n- Lựa chọn A sai vì cấu hình gốc dự án không ghi đè cấu hình thư mục con.\n- Lựa chọn B sai vì hệ thống không báo lỗi mà tự động giải quyết xung đột dựa trên độ ưu tiên phân cấp.\n- Lựa chọn C đúng vì tệp CLAUDE.md ở thư mục con ghi đè tệp ở gốc cho tất cả các tệp nằm trong thư mục con đó.\n- Lựa chọn D sai vì Claude Code không bỏ qua quy tắc cấu hình để quay về mặc định PEP 8 khi cơ chế ghi đè hoạt động bình thường.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]