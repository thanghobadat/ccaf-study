[
  {
    "id": "d3-b06-B-023",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-23",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-023",
    "scenarioSignature": {
      "testedPrinciple": "hierarchical inheritance across global, project, and subdirectory CLAUDE.md files",
      "failureMode": "unexpected behavior governance persistence after deleting root configuration file",
      "rootCause": "deletion of root CLAUDE.md does not purge active global and subdirectory CLAUDE.md rules",
      "requiredFix": "inspect active rules across all hierarchy levels including global and subdirectory configurations"
    },
    "questionEN": "A developer attempting to reset Claude Code's project-level behavioral instructions deletes /repo/CLAUDE.md from a repository containing ~/.claude/CLAUDE.md and /repo/src/api/CLAUDE.md. When running Claude Code inside /repo/src/api/, the developer expects the agent to operate without any custom rules. What actually occurs regarding configuration loading?",
    "question": "[d3-b06-B-023] Một lập trình viên muốn đặt lại các chỉ thị hành vi cấp dự án của Claude Code đã xóa file /repo/CLAUDE.md trong một repository vốn có sẵn file cấu hình toàn cục ~/.claude/CLAUDE.md và file thư mục con /repo/src/api/CLAUDE.md. Khi khởi chạy Claude Code bên trong thư mục /repo/src/api/, lập trình viên mong đợi agent hoạt động mà không chịu ảnh hưởng bởi bất kỳ quy tắc tùy chỉnh nào. Điều gì thực sự xảy ra đối với việc tải cấu hình?",
    "optionsEN": [
      "A. Claude Code resets all configuration settings to default system defaults and ignores all remaining CLAUDE.md files because removing the root file invalidates the configuration tree.",
      "B. Claude Code throws a startup error because /repo/src/api/CLAUDE.md requires a root-level CLAUDE.md file to establish its parent configuration context.",
      "C. Claude Code continues enforcing rules from ~/.claude/CLAUDE.md and /repo/src/api/CLAUDE.md, as deleting /repo/CLAUDE.md only removes project-root directives without affecting global or subdirectory scopes.",
      "D. Claude Code automatically regenerates /repo/CLAUDE.md at project root by inheriting and merging rules from ~/.claude/CLAUDE.md and /repo/src/api/CLAUDE.md."
    ],
    "options": [
      "A. Claude Code đặt lại tất cả thiết lập cấu hình về mặc định hệ thống và bỏ qua tất cả các file CLAUDE.md còn lại vì việc xóa file gốc sẽ làm mất hiệu lực toàn bộ cây cấu hình.",
      "B. Claude Code báo lỗi khởi động vì /repo/src/api/CLAUDE.md bắt buộc phải có một file CLAUDE.md cấp gốc để thiết lập ngữ cảnh cấu hình cha.",
      "C. Claude Code tiếp tục áp dụng các quy tắc từ ~/.claude/CLAUDE.md và /repo/src/api/CLAUDE.md, vì việc xóa /repo/CLAUDE.md chỉ gỡ bỏ các chỉ thị cấp project root mà không ảnh hưởng tới phạm vi toàn cục hoặc thư mục con.",
      "D. Claude Code tự động tạo lại file /repo/CLAUDE.md tại gốc dự án bằng cách kế thừa và gộp các quy tắc từ ~/.claude/CLAUDE.md và /repo/src/api/CLAUDE.md."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because deleting /repo/CLAUDE.md does not clear rules loaded from user global (~/.claude/CLAUDE.md) or active subdirectory (/repo/src/api/CLAUDE.md) levels.",
      "Option B is incorrect because subdirectory CLAUDE.md files do not depend on the existence of a root CLAUDE.md file to be loaded.",
      "Option C is correct because Claude Code resolves configuration independently across global, project, and directory levels; deleting /repo/CLAUDE.md removes project-root rules but leaves global and subdirectory rules active.",
      "Option D is incorrect because Claude Code never automatically regenerates deleted CLAUDE.md files or flattens inheritance into root configuration files."
    ],
    "rationale": "Deleting /repo/CLAUDE.md removes project-root instructions, but Claude Code's hierarchical configuration system continues loading global rules from ~/.claude/CLAUDE.md and directory-scoped rules from /repo/src/api/CLAUDE.md. Developers must recognize that wiping the root configuration does not reset global or subdirectory-scoped behavioral governance.",
    "explanation": "Lựa chọn C là đáp án đúng. Trong cơ chế phân cấp cấu hình của Claude Code, các file CLAUDE.md được tải độc lập theo từng cấp độ: toàn cục (~/.claude/CLAUDE.md), thư mục gốc dự án (/repo/CLAUDE.md), và thư mục con (/repo/src/api/CLAUDE.md). Việc xóa file /repo/CLAUDE.md chỉ gỡ bỏ các chỉ thị quy định ở cấp gốc dự án. Claude Code vẫn tiếp tục đọc và áp dụng các quy tắc từ ~/.claude/CLAUDE.md và /repo/src/api/CLAUDE.md khi người dùng làm việc trong thư mục /repo/src/api/.\n\n- Lựa chọn A sai vì việc xóa file gốc không làm vô hiệu hóa cây cấu hình hay bỏ qua các file CLAUDE.md còn lại.\n- Lựa chọn B sai vì file CLAUDE.md ở thư mục con hoàn toàn có thể hoạt động độc lập mà không bắt buộc phải có file root CLAUDE.md.\n- Lựa chọn D sai vì Claude Code không có cơ chế tự động tạo lại file CLAUDE.md bị xóa bằng cách tổng hợp các cấp quy tắc khác.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]