[
  {
    "id": "d3-b06-new-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-009",
    "scenarioSignature": {
      "testedPrinciple": "imported rule inheritance and precedence scoping",
      "failureMode": "developer confusion over precedence of rules included via import directives",
      "rootCause": "misunderstanding that imported rules inherit the precedence level of the importing file",
      "requiredFix": "apply imported rules at the importing file hierarchy level"
    },
    "questionEN": "A development team working on payment-service adds the directive @import ../../standards/company-style.md inside their project-root CLAUDE.md to reference shared organizational formatting guidelines. The global ~/.claude/CLAUDE.md defines 4-space indentations, whereas company-style.md defines 2-space indentations, and a nested src/controllers/CLAUDE.md defines tabs. When Claude Code executes a refactoring task inside src/controllers/, how are the imported rules evaluated within the configuration precedence hierarchy?",
    "question": "[d3-b06-new-009] Một nhóm phát triển dịch vụ payment-service thêm chỉ thị @import ../../standards/company-style.md bên trong file CLAUDE.md ở thư mục gốc dự án để tham chiếu các quy chuẩn định dạng chung của công ty. File toàn cục ~/.claude/CLAUDE.md quy định thụt lề 4 khoảng trắng, trong khi company-style.md quy định 2 khoảng trắng, và file thư mục con src/controllers/CLAUDE.md quy định dùng phím Tab. Khi Claude Code thực thi tác vụ refactor bên trong src/controllers/, các quy tắc được import sẽ được đánh giá như thế nào trong thứ tự ưu tiên cấu hình?",
    "optionsEN": [
      "A. The imported company-style.md rules execute at project-root precedence, overriding global ~/.claude/CLAUDE.md settings but yielding to src/controllers/CLAUDE.md.",
      "B. The imported rules are downgraded to global precedence because company-style.md resides outside the immediate project repository directory.",
      "C. The @import directive elevates company-style.md rules to top priority, overriding all local subdirectory CLAUDE.md configurations.",
      "D. The @import syntax is invalid in project-level CLAUDE.md files and will cause Claude Code to ignore the referenced file entirely."
    ],
    "options": [
      "A. Các quy tắc từ company-style.md được thực thi ở cấp độ ưu tiên của gốc dự án (project-root precedence), ghi đè cấu hình toàn cục ~/.claude/CLAUDE.md nhưng nhường ưu tiên cho src/controllers/CLAUDE.md.",
      "B. Các quy tắc được import bị hạ xuống cấp độ ưu tiên toàn cục vì file company-style.md nằm bên ngoài thư mục chứa kho mã nguồn của dự án.",
      "C. Chỉ thị @import nâng các quy tắc trong company-style.md lên độ ưu tiên cao nhất, ghi đè tất cả cấu hình CLAUDE.md ở các thư mục con.",
      "D. Cú pháp @import không hợp lệ trong các file CLAUDE.md cấp dự án và sẽ khiến Claude Code bỏ qua hoàn toàn file được tham chiếu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Rules included via @import in a project-root CLAUDE.md inherit project-root precedence. They override global user preferences (~/.claude/CLAUDE.md) but yield to more specific inner subdirectory configurations (src/controllers/CLAUDE.md).",
      "Option B is incorrect: The physical storage location of the imported file does not alter its precedence; rules take on the precedence level of the file that imports them.",
      "Option C is incorrect: @import inserts rules inline into the importing file and does not override lower-level subdirectory configurations.",
      "Option D is incorrect: @import is a fully supported directive in project-level CLAUDE.md files for modular configuration reuse."
    ],
    "rationale": "When a file is imported via @import in CLAUDE.md, its rules are merged inline into the host configuration file. Consequently, rules imported into project-root CLAUDE.md assume project-root precedence. They override global settings but remain subject to override by subdirectory-specific rules.",
    "explanation": "Trong Claude Code, chỉ thị @import cho phép nhúng nội dung quy tắc từ một file markdown khác vào file cấu hình hiện tại. Các quy tắc được nạp qua @import sẽ kế thừa đúng cấp độ ưu tiên của file chứa chỉ thị import đó.\n\n- Trong kịch bản này, file gốc dự án CLAUDE.md thực hiện @import file company-style.md. Do đó, các quy tắc trong company-style.md sẽ có độ ưu tiên ở cấp Gốc dự án (Project root precedence).\n- Thứ tự ưu tiên đầy đủ là: Subdirectory (src/controllers/CLAUDE.md) > Project root (CLAUDE.md bao gồm file @import) > Global (~/.claude/CLAUDE.md).\n- Do đó, quy tắc 2 khoảng trắng từ file import sẽ ghi đè quy tắc 4 khoảng trắng toàn cục, nhưng sẽ nhường ưu tiên cho quy tắc dùng phím Tab trong src/controllers/CLAUDE.md.\n\nPhân tích phương án:\n- Đáp án A đúng: Giải thích đúng cơ chế kế thừa độ ưu tiên của chỉ thị @import theo vị trí của file gọi import.\n- Đáp án B sai: Vị trí lưu trữ file không làm giảm độ ưu tiên của quy tắc xuống mức global.\n- Đáp án C sai: @import không tạo ra độ ưu tiên đặc biệt cao nhất để đè lên các thư mục con.\n- Đáp án D sai: Cú pháp @import hoàn toàn hợp lệ và được hỗ trợ trong CLAUDE.md cấp dự án.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-010",
    "scenarioSignature": {
      "testedPrinciple": "fault tolerance for missing imported configuration files",
      "failureMode": "unresolvable import directive target path during CLI startup",
      "rootCause": "imported markdown file path referenced in CLAUDE.md does not exist on disk",
      "requiredFix": "silently ignore missing import file while preserving execution of remaining rules"
    },
    "questionEN": "A developer initializes a Claude Code CLI session in the auth-service repository. The project-root CLAUDE.md contains the directive @import ./legacy-guidelines.md, but legacy-guidelines.md was recently deleted from disk during a cleanup. How does Claude Code handle this unresolvable import path during session startup?",
    "question": "[d3-b06-new-010] Một kỹ sư khởi tạo phiên làm việc Claude Code CLI trong kho lưu trữ auth-service. File CLAUDE.md ở thư mục gốc dự án chứa chỉ thị @import ./legacy-guidelines.md, nhưng file legacy-guidelines.md vừa bị xóa khỏi đĩa trong một đợt dọn dẹp. Claude Code xử lý đường dẫn import không tồn tại này như thế nào khi khởi động phiên làm việc?",
    "optionsEN": [
      "A. It aborts session initialization with a fatal file resolution error ERR_CLAUDE_IMPORT_NOT_FOUND.",
      "B. It silently skips the missing file and proceeds to load all other valid rules from CLAUDE.md and the configuration hierarchy.",
      "C. It disables the entire project-root CLAUDE.md file and reverts strictly to global ~/.claude/CLAUDE.md rules.",
      "D. It automatically creates a blank legacy-guidelines.md file at the specified location to resolve the reference."
    ],
    "options": [
      "A. Bỏ dở khởi tạo phiên làm việc với lỗi nghiêm trọng không tìm thấy file ERR_CLAUDE_IMPORT_NOT_FOUND.",
      "B. Bỏ qua file bị thiếu một cách âm thầm và tiếp tục tải tất cả các quy tắc hợp lệ khác từ CLAUDE.md cũng như các cấp cấu hình còn lại.",
      "C. Vô hiệu hóa toàn bộ file CLAUDE.md ở thư mục gốc dự án và chỉ áp dụng nghiêm ngặt các quy tắc toàn cục từ ~/.claude/CLAUDE.md.",
      "D. Tự động tạo một file legacy-guidelines.md rỗng tại vị trí đã chỉ định để giải quyết tham chiếu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Claude Code design prioritizes non-blocking execution and does not crash when an imported markdown file is missing.",
      "Option B is correct: When an @import target path cannot be resolved, Claude Code silently ignores the missing file and continues parsing all other valid rules across the configuration hierarchy.",
      "Option C is incorrect: A broken import directive does not invalidate or disable the host CLAUDE.md file or parent/child configurations.",
      "Option D is incorrect: Claude Code reads configurations strictly as read-only operations and will not write or generate missing files automatically."
    ],
    "rationale": "Claude Code implements fault tolerance for external file imports. If an @import directive specifies a file path that cannot be resolved, the engine silently skips the reference without aborting session initialization or disabling remaining configuration rules.",
    "explanation": "Khi Claude Code nạp cấu hình và gặp một chỉ thị @import dẫn tới một đường dẫn không tồn tại trên đĩa, hệ thống sẽ áp dụng cơ chế tự phục hồi lỗi (fault-tolerant):\n\n- Claude Code bỏ qua (silent skip) file bị thiếu đó mà không báo lỗi chết ứng dụng (fatal error) hay dừng khởi tạo phiên CLI.\n- Các quy tắc còn lại trong file CLAUDE.md chứa đường dẫn import đó, cùng với các quy tắc từ các cấp độ khác (Global, Subdirectory), vẫn được nạp và áp dụng bình thường.\n\nPhân tích phương án:\n- Đáp án A sai: Claude Code không ném ra lỗi chết ứng dụng hay dừng phiên làm việc.\n- Đáp án B đúng: Mô tả chính xác cơ chế bỏ qua âm thầm file import bị thiếu và giữ nguyên các quy tắc hợp lệ khác.\n- Đáp án C sai: File CLAUDE.md hiện tại không bị vô hiệu hóa toàn bộ chỉ vì một chỉ thị import hỏng.\n- Đáp án D sai: Claude Code không tự động tạo file mới trên đĩa khi nạp cấu hình.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]