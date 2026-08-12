[
  {
    "id": "d3-b06-new-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-007",
    "scenarioSignature": {
      "testedPrinciple": "additive rule inheritance across project root and subdirectory configuration files",
      "failureMode": "incorrect assumption that subdirectory configuration replaces root configuration entirely",
      "rootCause": "misunderstanding that non-conflicting rules across configuration levels merge additively rather than overriding completely",
      "requiredFix": "apply all non-conflicting rules from both root and subdirectory configuration files simultaneously"
    },
    "questionEN": "In a backend repository, the root configuration file /repo/CLAUDE.md specifies Rule A (use explicit type annotations) and Rule B (use structlog for logging). The subdirectory file /repo/src/api/CLAUDE.md specifies Rule C only (require @pytest.mark.asyncio on async test cases). When a developer opens a Claude Code session to edit /repo/src/api/auth.py, which set of rules will Claude Code enforce?",
    "question": "[d3-b06-new-007] Trong một kho lưu trữ backend, tệp cấu hình gốc /repo/CLAUDE.md quy định Quy tắc A (sử dụng chú thích kiểu rõ ràng) và Quy tắc B (sử dụng structlog cho ghi log). Tệp thư mục con /repo/src/api/CLAUDE.md chỉ quy định Quy tắc C (yêu cầu decorator @pytest.mark.asyncio trên các test case bất đồng bộ). Khi nhà phát triển mở một phiên Claude Code để chỉnh sửa /repo/src/api/auth.py, quy tắc nào sẽ được Claude Code áp dụng?",
    "optionsEN": [
      "A. Only Rule C applies, because /repo/src/api/CLAUDE.md completely overrides the root configuration.",
      "B. Only Rule A and Rule B apply, because the root /repo/CLAUDE.md blocks subdirectory configurations unless @import is used.",
      "C. All three rules (Rule A, Rule B, and Rule C) apply simultaneously, because non-conflicting rules from root and subdirectory files merge additively.",
      "D. None of the rules apply to auth.py, because subdirectory CLAUDE.md files only affect test files defined in .claudeignore."
    ],
    "options": [
      "A. Chỉ Quy tắc C được áp dụng, vì /repo/src/api/CLAUDE.md ghi đè hoàn toàn cấu hình gốc.",
      "B. Chỉ Quy tắc A và Quy tắc B được áp dụng, vì tệp gốc /repo/CLAUDE.md chặn cấu hình thư mục con trừ khi sử dụng @import.",
      "C. Cả ba quy tắc (Quy tắc A, Quy tắc B và Quy tắc C) đều áp dụng đồng thời, vì các quy tắc không xung đột từ tệp gốc và thư mục con hợp nhất theo cơ chế cộng dồn.",
      "D. Không có quy tắc nào áp dụng cho auth.py, vì các tệp CLAUDE.md thư mục con chỉ ảnh hưởng đến các tệp kiểm thử được định nghĩa trong .claudeignore."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because subdirectory CLAUDE.md files do not replace root configuration files unless individual rules directly conflict.",
      "Option B is incorrect because root configuration files do not block subdirectory configurations; rules merge automatically without requiring @import statements.",
      "Option C is correct because Claude Code's configuration system is additive, combining Rule A and Rule B from the root with Rule C from the subdirectory since there are no conflicts.",
      "Option D is incorrect because subdirectory CLAUDE.md files apply to all source files within their directory subtree and .claudeignore is used for ignoring files rather than scoping rules."
    ],
    "rationale": "Claude Code evaluates configuration files hierarchically and merges rules additively across all active parent and subdirectory levels. Because Rule A, Rule B, and Rule C do not conflict with each other, all three apply when editing files inside /repo/src/api/.",
    "explanation": "Trong cơ chế cấu hình của Claude Code, các tệp CLAUDE.md ở các cấp độ khác nhau (thư mục gốc và các thư mục con) được kết hợp theo nguyên tắc cộng dồn (additive). Khi chỉnh sửa tệp /repo/src/api/auth.py, Claude Code sẽ tải cả /repo/CLAUDE.md (chứa Quy tắc A và B) và /repo/src/api/CLAUDE.md (chứa Quy tắc C). Do 3 quy tắc này không có xung đột, tất cả 3 quy tắc sẽ cùng có hiệu lực đồng thời.\n\n- Lựa chọn A sai vì tệp thư mục con không thay thế hoàn toàn tệp gốc trừ khi có quy tắc xung đột trực tiếp.\n- Lựa chọn B sai vì tệp gốc không chặn tệp thư mục con và không cần dùng @import để kế thừa quy tắc.\n- Lựa chọn C đúng vì cơ chế cộng dồn hợp nhất tất cả quy tắc không xung đột từ cấp gốc và thư mục con.\n- Lựa chọn D sai vì CLAUDE.md trong thư mục con áp dụng cho tất cả các tệp bên trong thư mục đó, và .claudeignore dùng để ẩn tệp khỏi Claude chứ không quản lý phạm vi quy tắc.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-008",
    "scenarioSignature": {
      "testedPrinciple": "additive merging of non-conflicting rules across multi-level configuration hierarchy",
      "failureMode": "misdiagnosing active rule scope by assuming isolated single-level rule evaluation",
      "rootCause": "unawareness of the additive merging mechanism combining global, project, and subdirectory rules",
      "requiredFix": "recognize additive rule merging where non-conflicting rules across all active levels combine concurrently"
    },
    "questionEN": "In an enterprise project, three configuration rules exist: Rule G in ~/.claude/CLAUDE.md (enforce 4-space indentation), Rule P in /repo/CLAUDE.md (require mypy strict type checking), and Rule S in /repo/services/api/CLAUDE.md (require Google-style docstrings). None of these rules conflict. When editing /repo/services/api/users.py, Claude Code enforces all three rules simultaneously. What is the technical name for this hierarchical rule evaluation behavior?",
    "question": "[d3-b06-new-008] Trong một dự án doanh nghiệp, có ba quy tắc cấu hình: Quy tắc G trong ~/.claude/CLAUDE.md (bắt buộc thụt lề 4 khoảng trắng), Quy tắc P trong /repo/CLAUDE.md (yêu cầu kiểm tra kiểu nghiêm ngặt bằng mypy), và Quy tắc S trong /repo/services/api/CLAUDE.md (yêu cầu docstring theo chuẩn Google). Không có quy tắc nào xung đột. Khi chỉnh sửa /repo/services/api/users.py, Claude Code áp dụng cả ba quy tắc cùng một lúc. Tên kỹ thuật của hành vi đánh giá quy tắc phân cấp này là gì?",
    "optionsEN": [
      "A. Cascading Override Resolution, where lower-level files discard all rules from higher-level configuration files.",
      "B. Explicit Import Transclusion, where rules from outer scopes must be referenced with @import to remain active.",
      "C. Isolated Scope Execution, where global, project, and subdirectory rules run in separate independent agent instances.",
      "D. Additive Rule Merging, where non-conflicting rules across global, project, and subdirectory levels are combined into a single unified scope."
    ],
    "options": [
      "A. Cascading Override Resolution (Phân giải ghi đè phân cấp), trong đó tệp cấp thấp hơn hủy bỏ tất cả quy tắc từ các tệp cấu hình cấp cao hơn.",
      "B. Explicit Import Transclusion (Gộp nhập tệp rõ ràng), trong đó các quy tắc từ phạm vi bên ngoài phải được tham chiếu bằng @import mới có hiệu lực.",
      "C. Isolated Scope Execution (Thực thi phạm vi cô lập), trong đó các quy tắc toàn cục, dự án và thư mục con chạy trong các phiên bản agent độc lập riêng biệt.",
      "D. Additive Rule Merging (Hợp nhất quy tắc cộng dồn), trong đó các quy tắc không xung đột ở các cấp toàn cục, dự án và thư mục con được kết hợp thành một phạm vi thống nhất."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because lower-level files do not discard non-conflicting outer rules; rules from all levels are retained.",
      "Option B is incorrect because rules across the hierarchy are merged automatically without requiring @import declarations.",
      "Option C is incorrect because Claude Code evaluates all active hierarchical rules in a single session rather than running isolated instances.",
      "Option D is correct because Additive Rule Merging describes how Claude Code aggregates non-conflicting configuration instructions from global (~/.claude/CLAUDE.md), project root, and subdirectory levels concurrently."
    ],
    "rationale": "Additive Rule Merging is the fundamental principle in Claude Code's configuration hierarchy where all applicable files (global, project root, subdirectory) contribute their non-conflicting rules simultaneously to form the active session instructions.",
    "explanation": "Hành vi kết hợp tất cả các quy tắc không xung đột từ cấp toàn cục (~/.claude/CLAUDE.md), cấp gốc dự án (/repo/CLAUDE.md) và cấp thư mục con (/repo/services/api/CLAUDE.md) được gọi là Additive Rule Merging (Hợp nhất quy tắc cộng dồn). Tất cả các quy tắc áp dụng được gộp lại với nhau để hình thành bộ hướng dẫn hoạt động cho phiên làm việc hiện tại.\n\n- Lựa chọn A sai vì tệp cấp thấp hơn không loại bỏ quy tắc từ cấp cao hơn nếu chúng không xung đột.\n- Lựa chọn B sai vì việc hợp nhất phân cấp diễn ra tự động mà không cần khai báo lệnh @import.\n- Lựa chọn C sai vì Claude Code xử lý các quy tắc trong cùng một phiên làm việc duy nhất thay vì chạy các agent riêng biệt.\n- Lựa chọn D đúng vì mô tả chính xác cơ chế Hợp nhất quy tắc cộng dồn (Additive Rule Merging) kết hợp quy tắc từ toàn bộ phân cấp cấu hình.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]