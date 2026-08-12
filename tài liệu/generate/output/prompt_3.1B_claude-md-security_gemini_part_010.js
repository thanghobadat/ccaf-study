[
  {
    "id": "d3-b06-B-019",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-019",
    "questionEN": "A software team working on the order-processing-service codebase added a rule in /repo/CLAUDE.md: \"Always include '// Author: Alice Smith' in the header comment of every new or modified file\". Three months later, Alice transfers to another team, and Bob takes over maintaining the repository without updating CLAUDE.md. When Bob instructs Claude Code to refactor PaymentGateway.kt and create TaxCalculator.kt, what issue occurs in the codebase?",
    "question": "[d3-b06-B-019] Một đội ngũ phát triển làm việc trên kho mã nguồn order-processing-service đã thêm một quy tắc vào /repo/CLAUDE.md: \"Always include '// Author: Alice Smith' in the header comment of every new or modified file\". Ba tháng sau, Alice chuyển sang đội khác và Bob tiếp quản duy trì kho mã nguồn mà không cập nhật CLAUDE.md. Khi Bob yêu cầu Claude Code tái cấu trúc PaymentGateway.kt và tạo mới TaxCalculator.kt, sự cố nào xảy ra trong kho mã nguồn?",
    "optionsEN": [
      "A. Claude Code detects that Alice is no longer the active git user and automatically updates CLAUDE.md with Bob's name.",
      "B. Claude Code fails with a configuration validation error because CLAUDE.md metadata rules must match the active git config user.name.",
      "C. Claude Code injects '// Author: Alice Smith' into TaxCalculator.kt and updated headers, misattributing Bob's code changes to Alice.",
      "D. Claude Code ignores the rule because .claudeignore automatically filters out author metadata guidelines during file editing sessions."
    ],
    "options": [
      "A. Claude Code phát hiện Alice không còn là người dùng git hiện tại và tự động cập nhật CLAUDE.md với tên của Bob.",
      "B. Claude Code báo lỗi xác thực cấu hình vì các quy tắc metadata trong CLAUDE.md bắt buộc phải khớp với git config user.name đang hoạt động.",
      "C. Claude Code chèn '// Author: Alice Smith' vào TaxCalculator.kt và các header được cập nhật, ghi nhận sai tác giả các thay đổi do Bob thực hiện thành Alice.",
      "D. Claude Code bỏ qua quy tắc này vì .claudeignore tự động lọc bỏ các hướng dẫn metadata về tác giả trong các phiên chỉnh sửa file."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because Claude Code reads CLAUDE.md as static instructions and does not automatically edit configuration files based on active git user identity.",
      "Option B is incorrect because CLAUDE.md instructions are plain text guidelines and do not undergo runtime validation against git config user.name.",
      "Option C is correct because Claude Code strictly follows instructions in CLAUDE.md; since the rule specifies Alice Smith, Claude Code appends '// Author: Alice Smith' to files regardless of who runs the session.",
      "Option D is incorrect because .claudeignore controls file reading visibility and does not parse or override behavioral rules defined in CLAUDE.md."
    ],
    "rationale": "Claude Code follows instructions provided in CLAUDE.md strictly as text guidelines. Hardcoding developer identity rules in CLAUDE.md causes stale attribution when team members change, as Claude Code will continue applying the written prompt rule rather than dynamically resolving git author identity.",
    "explanation": "Lựa chọn C là đáp án đúng vì Claude Code tuân thủ nghiêm ngặt các chỉ thị văn bản trong file CLAUDE.md. Khi CLAUDE.md chứa quy tắc cứng yêu cầu ghi tên một tác giả cụ thể (Alice Smith), Claude Code sẽ tiếp tục chèn nhận diện này vào mọi file được tạo hoặc sửa đổi bất kể ai là người đang vận hành phiên làm việc. Lựa chọn A sai vì Claude Code không tự động sửa đổi CLAUDE.md dựa trên thông tin git user. Lựa chọn B sai vì CLAUDE.md không thực hiện kiểm tra đối chiếu thời gian thực với git config user.name. Lựa chọn D sai vì .claudeignore chỉ quản lý quyền truy cập file chứ không bỏ qua các hướng dẫn hành vi trong CLAUDE.md.",
    "scenarioSignature": {
      "testedPrinciple": "staleness of explicit developer identity rules in project instructions",
      "failureMode": "attribution of modified code to incorrect author in inline comments",
      "rootCause": "hardcoded static rule in configuration file remaining unupdated across team rotations",
      "requiredFix": "remove static author metadata rules and rely on git commit history for ownership tracking"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-020",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-020",
    "scenarioSignature": {
      "testedPrinciple": "file exclusion impact on contextual documentation awareness",
      "failureMode": "generation of code violating documented architectural API contracts",
      "rootCause": "excluding documentation directory in claudeignore file",
      "requiredFix": "remove documentation directory path from claudeignore to restore context access"
    },
    "questionEN": "An engineering team configured /repo/.claudeignore with the entry docs/ to reduce workspace context overhead. The docs/api-spec.md file defines a strict REST API contract requiring x-correlation-id in HTTP headers and ISO-8601 timestamps for OrderClient. When an engineer asks Claude Code to implement a new endpoint client in src/clients/OrderClient.ts, Claude Code generates code using Unix epoch timestamps and missing the custom header. Why does this failure occur?",
    "question": "[d3-b06-B-020] Một đội ngũ kỹ sư cấu hình /repo/.claudeignore với dòng docs/ nhằm giảm dung lượng context của workspace. File docs/api-spec.md định nghĩa một hợp đồng REST API nghiêm ngặt yêu cầu header x-correlation-id và định dạng thời gian ISO-8601 cho OrderClient. Khi một kỹ sư yêu cầu Claude Code triển khai client endpoint mới trong src/clients/OrderClient.ts, Claude Code tạo mã nguồn sử dụng mốc thời gian Unix epoch và thiếu header tùy chỉnh. Tại sao sự cố này xảy ra?",
    "optionsEN": [
      "A. CLAUDE.md rules in src/clients/ override .claudeignore and force Claude Code to use default legacy timestamp formats.",
      "B. Claude Code read docs/api-spec.md but prioritized its internal default REST patterns over the project documentation.",
      "C. Claude Code encountered a permission error when attempting to bypass .claudeignore to read docs/api-spec.md.",
      "D. .claudeignore completely hides the docs/ folder from Claude Code, rendering the API specifications invisible during code generation."
    ],
    "options": [
      "A. Các quy tắc CLAUDE.md trong src/clients/ ghi đè .claudeignore và buộc Claude Code sử dụng định dạng thời gian cũ mặc định.",
      "B. Claude Code đã đọc docs/api-spec.md nhưng ưu tiên các mẫu REST mặc định nội bộ của nó hơn tài liệu dự án.",
      "C. Claude Code gặp lỗi phân quyền khi cố gắng bỏ qua .claudeignore để đọc file docs/api-spec.md.",
      "D. .claudeignore ẩn hoàn toàn thư mục docs/ khỏi tầm nhìn của Claude Code, khiến các đặc tả API không thể được tham chiếu trong quá trình sinh mã."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because CLAUDE.md cannot unignore paths blocked by .claudeignore, nor does it default to legacy formats unless explicitly configured.",
      "Option B is incorrect because Claude Code cannot read files matching .claudeignore patterns at all, so it never parsed docs/api-spec.md.",
      "Option C is incorrect because .claudeignore prevents file access quietly without triggering system permission exception errors.",
      "Option D is correct because .claudeignore hides matching files completely from Claude Code; since docs/ was excluded, Claude Code generated OrderClient.ts without awareness of the documented API contract."
    ],
    "rationale": "Files matching patterns in .claudeignore are completely invisible to Claude Code. Because docs/ was excluded, Claude Code could not read or reference docs/api-spec.md, leading to code generation that violates the documented API contract.",
    "explanation": "Lựa chọn D là đáp án đúng vì các file hoặc thư mục nằm trong .claudeignore bị ẩn hoàn toàn khỏi tầm nhìn của Claude Code (không thể đọc, tìm kiếm hoặc tham chiếu). Do docs/ bị loại trừ, Claude Code không biết tới sự tồn tại của docs/api-spec.md và sinh mã nguồn dựa trên tri thức mặc định, dẫn đến vi phạm hợp đồng API. Lựa chọn A sai vì CLAUDE.md không thể ghi đè quy tắc ẩn file của .claudeignore. Lựa chọn B sai vì Claude Code hoàn toàn không đọc được file bị ignore. Lựa chọn C sai vì .claudeignore hoạt động ở mức lọc phạm vi truy cập file chứ không gây ra lỗi phân quyền hệ thống.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]