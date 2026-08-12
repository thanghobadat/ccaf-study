[
  {
    "id": "d3-b06-new-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-005",
    "scenarioSignature": {
      "testedPrinciple": "missing configuration hierarchy level skipping",
      "failureMode": "unexpected rule application state during multi-level configuration resolution",
      "rootCause": "absence of project root configuration file in repository structure",
      "requiredFix": "combine active global and subdirectory rules while ignoring missing intermediate hierarchy level"
    },
    "questionEN": "A developer works inside a repository where the global configuration file ~/.claude/CLAUDE.md is present and defines user formatting preferences. Subdirectory configuration /repo/src/CLAUDE.md exists with component-specific linting rules, but the project root configuration /repo/CLAUDE.md is missing entirely. When Claude Code executes tasks within /repo/src/, how does it resolve the configuration hierarchy?",
    "question": "[d3-b06-new-005] Một lập trình viên làm việc trong kho chứa có file cấu hình toàn cục ~/.claude/CLAUDE.md xác định sở thích định dạng của người dùng. Cấu hình thư mục con /repo/src/CLAUDE.md tồn tại với các quy tắc kiểm tra mã cho thành phần cụ thể, nhưng cấu hình gốc dự án /repo/CLAUDE.md hoàn toàn không tồn tại. Khi Claude Code thực thi các tác vụ bên trong /repo/src/, nó xử lý thứ cấp cấu hình như thế nào?",
    "optionsEN": [
      "A. Claude Code combines rules from ~/.claude/CLAUDE.md and /repo/src/CLAUDE.md, seamlessly skipping the missing project root level.",
      "B. Claude Code throws an initialization error because a root /repo/CLAUDE.md file is strictly required to parse subdirectory rule files.",
      "C. Claude Code ignores /repo/src/CLAUDE.md completely unless a root /repo/CLAUDE.md file explicitly references it via @import syntax.",
      "D. Claude Code applies only /repo/src/CLAUDE.md because presence of a subdirectory rule file disables all upper-level global configurations."
    ],
    "options": [
      "A. Claude Code kết hợp các quy tắc từ ~/.claude/CLAUDE.md và /repo/src/CLAUDE.md, bỏ qua cấp gốc dự án bị thiếu một cách liền mạch.",
      "B. Claude Code báo lỗi khởi tạo vì file gốc /repo/CLAUDE.md là bắt buộc để phân tích các file quy tắc ở thư mục con.",
      "C. Claude Code hoàn toàn bỏ qua /repo/src/CLAUDE.md trừ khi file gốc /repo/CLAUDE.md tham chiếu rõ ràng đến nó qua cú pháp @import.",
      "D. Claude Code chỉ áp dụng /repo/src/CLAUDE.md vì sự tồn tại của file quy tắc thư mục con sẽ vô hiệu hóa tất cả cấu hình toàn cục cấp trên."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Missing levels in the CLAUDE.md hierarchy are skipped without error, allowing existing global and subdirectory rules to remain additive.",
      "Option B is incorrect: Project root files are optional; Claude Code does not require /repo/CLAUDE.md to exist before parsing subdirectory configurations.",
      "Option C is incorrect: Subdirectory CLAUDE.md files are discovered automatically based on target file paths and do not need explicit @import declarations from the project root.",
      "Option D is incorrect: Subdirectory configurations override conflicting settings but do not disable non-conflicting global user rules."
    ],
    "rationale": "In the CLAUDE.md hierarchy, missing files at any level (global, project root, or subdirectory) are simply skipped. All existing configuration files are additive, so Claude Code merges the global settings with the subdirectory rules.",
    "explanation": "Trong hệ thống phân cấp CLAUDE.md, bất kỳ cấp cấu hình nào bị thiếu (toàn cục, gốc dự án, hoặc thư mục con) sẽ đơn giản là bị bỏ qua mà không gây ra lỗi. Các file cấu hình hiện có mang tính cộng gộp (additive), do đó Claude Code sẽ kết hợp mượt mà các thiết lập từ ~/.claude/CLAUDE.md và /repo/src/CLAUDE.md.\n\n- Lựa chọn A đúng vì đáp ứng chính xác cơ chế bỏ qua cấp bị thiếu và cộng gộp quy tắc.\n- Lựa chọn B sai vì file root không phải là điều kiện bắt buộc để khởi tạo hệ thống.\n- Lựa chọn C sai vì các file ở thư mục con được tự động nạp theo vị trí thao tác mà không cần lệnh @import từ file root.\n- Lựa chọn D sai vì cấu hình thư mục con chỉ ghi đè quy tắc xung đột chứ không hủy bỏ toàn bộ cấu hình toàn cục.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-006",
    "scenarioSignature": {
      "testedPrinciple": "hierarchical configuration precedence and conflict resolution",
      "failureMode": "rule collision between global user preferences and project root configuration",
      "rootCause": "conflicting directive definitions across global and project scope files",
      "requiredFix": "override global configuration directives with specific project root instructions"
    },
    "questionEN": "A engineer configures a global preference in ~/.claude/CLAUDE.md stating: 'Add TODO comments for unresolved edge cases'. However, the repository root configuration /repo/CLAUDE.md explicitly specifies: 'Never add TODO comments'. When Claude Code refactors code inside this repository and encounters an unresolved edge case, which behavior does it exhibit?",
    "question": "[d3-b06-new-006] Một kỹ sư cấu hình sở thích toàn cục trong ~/.claude/CLAUDE.md với câu lệnh: 'Add TODO comments for unresolved edge cases'. Tuy nhiên, cấu hình gốc kho chứa /repo/CLAUDE.md chỉ định rõ ràng: 'Never add TODO comments'. Khi Claude Code tái cấu trúc mã nguồn trong kho chứa này và gặp một trường hợp biên chưa được xử lý, nó sẽ thể hiện hành vi nào?",
    "optionsEN": [
      "A. It inserts a TODO comment because personal global settings override repository-level guidelines.",
      "B. It omits the TODO comment because project root configuration takes precedence over global configuration for conflicting directives.",
      "C. It halts execution and prompts the user to manually select which directive should take precedence.",
      "D. It outputs both directives into context, causing non-deterministic comment creation based on model sampling."
    ],
    "options": [
      "A. Nó chèn chú thích TODO vì cài đặt toàn cục cá nhân có độ ưu tiên cao hơn hướng dẫn cấp kho chứa.",
      "B. Nó bỏ qua chú thích TODO vì cấu hình gốc dự án có độ ưu tiên cao hơn cấu hình toàn cục đối với các chỉ thị xung đột.",
      "C. Nó dừng thực thi và yêu cầu người dùng chọn thủ công chỉ thị nào được ưu tiên.",
      "D. Nó đưa cả hai chỉ thị vào ngữ cảnh, dẫn đến việc tạo chú thích không nhất quán dựa trên việc lấy mẫu của mô hình."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Global settings have the lowest priority in the hierarchy and are overridden by project root directives.",
      "Option B is correct: In the CLAUDE.md hierarchy precedence model (subdirectory > project root > global), the inner/more specific level wins when directives conflict.",
      "Option C is incorrect: Precedence rules resolve conflicts deterministically without requiring interactive user prompts.",
      "Option D is incorrect: Claude Code resolves rule collisions using hierarchy order before constructing the prompt instruction set."
    ],
    "rationale": "CLAUDE.md rules follow a strict precedence chain where more localized (innermost) configurations override broader ones (subdirectory > project root > global). Because project root rules take precedence over global rules, the instruction 'Never add TODO comments' overrides the global preference.",
    "explanation": "Các quy tắc trong CLAUDE.md tuân theo thứ tự ưu tiên nghiêm ngặt: cấp cụ thể/trong cùng sẽ ghi đè cấp rộng hơn (thư mục con > gốc dự án > toàn cục). Khi xảy ra xung đột trực tiếp giữa chỉ thị toàn cục (~/.claude/CLAUDE.md) và chỉ thị gốc dự án (/repo/CLAUDE.md), cấu hình gốc dự án sẽ chiếm ưu thế.\n\n- Lựa chọn A sai vì cài đặt toàn cục có độ ưu tiên thấp nhất chứ không phải cao nhất.\n- Lựa chọn B đúng vì cấu hình gốc dự án ưu tiên hơn cấu hình toàn cục đối với các chỉ thị bị xung đột.\n- Lựa chọn C sai vì hệ thống tự động giải quyết xung đột bằng nguyên tắc thứ bậc mà không dừng thực thi.\n- Lựa chọn D sai vì các chỉ thị bị xung đột ở cấp thấp hơn được giải quyết ghi đè thay vì nạp song song gây ra tính không định hình.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]