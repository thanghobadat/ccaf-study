[
  {
    "id": "d3-b06-B-011",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-011",
    "scenarioSignature": {
      "testedPrinciple": "dynamic importing of external security rules via @import directive",
      "failureMode": "project failing to apply newly published security guidelines during current active session",
      "rootCause": "imported CLAUDE.md directives being evaluated and cached upon session initialization",
      "requiredFix": "restart the Claude Code session to load updated imported rule files"
    },
    "questionEN": "An enterprise platform team configures /repo/CLAUDE.md with @import ../../company-standards/security.md across multiple service repositories. The security team updates security.md to mandate TLS 1.3 and ban insecure http:// API calls. A developer working in an active Claude Code CLI session notices that Claude Code still generates http:// client calls when refactoring /repo/src/api.ts. Why does the updated security rule fail to take effect immediately in the active session, and how should it be applied?",
    "question": "[d3-b06-B-011] Một đội ngũ nền tảng doanh nghiệp cấu hình /repo/CLAUDE.md với chỉ thị @import ../../company-standards/security.md cho nhiều kho lưu trữ dịch vụ. Đội ngũ an ninh cập nhật file security.md để bắt buộc dùng TLS 1.3 và cấm các lời gọi API http:// không an toàn. Lập trình viên đang làm việc trong phiên Claude Code CLI hiện tại nhận thấy Claude Code vẫn tạo ra các lời gọi client http:// khi tái cấu trúc /repo/src/api.ts. Tại sao quy tắc an ninh mới cập nhật không có hiệu lực ngay lập tức trong phiên đang hoạt động, và làm thế nào để áp dụng nó?",
    "optionsEN": [
      "A. The @import directive is re-evaluated dynamically on every prompt, but imported rules are ignored until explicitly committed to /repo/CLAUDE.md.",
      "B. Imported security updates only propagate to active CLI sessions if the developer runs claude config reload --force in the terminal.",
      "C. Configuration files linked via @import are read and cached upon session startup, requiring a session restart for updated imported rules to take effect.",
      "D. Claude Code ignores @import paths containing relative parent traversal (../../), causing the session to permanently fallback to global settings."
    ],
    "options": [
      "A. Chỉ thị @import được đánh giá lại một cách động trên mỗi prompt, nhưng các quy tắc được nạp sẽ bị bỏ qua cho đến khi được commit trực tiếp vào /repo/CLAUDE.md.",
      "B. Các cập nhật an ninh được nạp chỉ lan truyền tới các phiên CLI đang hoạt động nếu lập trình viên thực thi lệnh claude config reload --force trên terminal.",
      "C. Các file cấu hình liên kết qua @import được đọc và ghi nhớ (cache) khi khởi tạo phiên làm việc, yêu cầu khởi động lại phiên để các quy tắc mới cập nhật có hiệu lực.",
      "D. Claude Code bỏ qua các đường dẫn @import chứa phép duyệt cấp cha tương đối (../../), khiến phiên làm việc vĩnh viễn rơi vào cấu hình mặc định toàn cục."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because @import directives are processed when loading CLAUDE.md files at session start rather than dynamically re-evaluated per prompt, and git commits are not required for local file changes to take effect.",
      "Option B is incorrect because claude config reload --force is not a valid Claude Code command; session state reloading is accomplished by exiting and starting a new CLI session.",
      "Option C is correct because Claude Code parses and caches all CLAUDE.md directives and their @import targets when a session is initialized, so changes in imported external files will only be loaded after starting a new session.",
      "Option D is incorrect because relative parent path traversals in @import directives are fully supported and properly resolved by Claude Code."
    ],
    "rationale": "Claude Code loads and caches configuration files, including those referenced by @import directives, when a CLI session initializes. Updating an imported file like security.md on disk does not immediately mutate the in-memory rules of an existing active session. To pick up newly updated imported standards, the user must restart the Claude Code session.",
    "explanation": "Trong Claude Code, tất cả các tệp cấu hình CLAUDE.md và các tệp được liên kết thông qua chỉ thị @import đều được nạp và lưu vào bộ nhớ (cache) tại thời điểm khởi tạo phiên làm việc (session startup).\n\n- Option A sai vì @import không được đánh giá lại sau mỗi prompt và không yêu cầu file phải được git commit mới có hiệu lực.\n- Option B sai vì không tồn tại lệnh claude config reload --force trong CLI của Claude Code.\n- Option C đúng vì việc thay đổi nội dung file được nạp security.md bên ngoài sẽ không làm thay đổi trực tiếp bộ nhớ của phiên CLI đang chạy. Lập trình viên phải khởi động lại phiên làm việc (session restart) để Claude Code nạp lại toàn bộ cây cấu hình mới nhất.\n- Option D sai vì Claude Code hỗ trợ đầy đủ các đường dẫn tương đối như ../../ trong câu lệnh @import.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-012",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-012",
    "scenarioSignature": {
      "testedPrinciple": "sequential evaluation order and conflict resolution among multiple imported configuration files",
      "failureMode": "uncertainty regarding which formatting policy applies when imported files contain conflicting directives",
      "rootCause": "sequential parsing of import directives in CLAUDE.md where later imports override earlier imported rules",
      "requiredFix": "place higher-precedence import directives after lower-precedence ones in CLAUDE.md"
    },
    "questionEN": "In a repository root /repo/CLAUDE.md, a team includes two consecutive import statements:\nLine 1: @import company-standards.md (which contains the directive 'Indent using 4 tabs')\nLine 2: @import team-standards.md (which contains the directive 'Indent using 2 spaces')\n\nWhen Claude Code generates new source code files in /repo/src/, which indentation rule takes precedence and why?",
    "question": "[d3-b06-B-012] Trong file gốc của kho lưu trữ /repo/CLAUDE.md, một đội ngũ thêm vào hai câu lệnh import liên tiếp:\nDòng 1: @import company-standards.md (chứa quy tắc 'Indent using 4 tabs')\nDòng 2: @import team-standards.md (chứa quy tắc 'Indent using 2 spaces')\n\nKhi Claude Code tạo các file mã nguồn mới trong /repo/src/, quy tắc thụt lề nào sẽ được ưu tiên áp dụng và tại sao?",
    "optionsEN": [
      "A. company-standards.md wins because enterprise-level imports automatically override team-level imports regardless of statement ordering.",
      "B. Neither rule wins; Claude Code detects a conflicting import error and halts execution until one @import directive is removed.",
      "C. Both rules are discarded due to directive collision, causing Claude Code to fall back to global default indentation settings.",
      "D. team-standards.md wins because @import directives are evaluated sequentially, allowing later imports in CLAUDE.md to override earlier imported rules."
    ],
    "options": [
      "A. company-standards.md thắng vì các tệp import ở cấp doanh nghiệp tự động ghi đè các tệp import cấp đội ngũ bất kể thứ tự câu lệnh.",
      "B. Không quy tắc nào thắng; Claude Code phát hiện lỗi xung đột import và dừng thực thi cho đến khi một chỉ thị @import bị xóa.",
      "C. Cả hai quy tắc bị hủy bỏ do xung đột chỉ thị, khiến Claude Code rơi vào cấu hình thụt lề mặc định toàn cục.",
      "D. team-standards.md thắng vì các chỉ thị @import được đánh giá theo thứ tự tuyến tính, cho phép các tệp import sau trong CLAUDE.md ghi đè các quy tắc được import trước."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because Claude Code does not assign implicit structural hierarchy based on file naming like 'company' vs 'team'; resolution order within a single CLAUDE.md file is strictly governed by line sequence.",
      "Option B is incorrect because conflicting imports do not trigger a CLI crash or execution halt.",
      "Option C is incorrect because conflicting directives do not invalidate both files; the configuration engine applies sequential precedence.",
      "Option D is correct because @import directives within a CLAUDE.md file are processed sequentially in top-to-bottom line order. Later imported rules overwrite conflicting rules parsed earlier in the same configuration level."
    ],
    "rationale": "When multiple @import directives are listed within a single CLAUDE.md file, Claude Code parses them sequentially in line order. If two imported files specify conflicting instructions (such as tabs vs spaces), the rule encountered later in the file stream (team-standards.md on Line 2) overrides the earlier rule (company-standards.md on Line 1).",
    "explanation": "Khi một file CLAUDE.md chứa nhiều chỉ thị @import, Claude Code sẽ nạp và phân tích các chỉ thị này theo thứ tự tuyến tính từ trên xuống dưới.\n\n- Option A sai vì tên tệp ('company' hay 'team') không tự động tạo ra thứ tự ưu tiên; thứ tự xử lý phụ thuộc hoàn toàn vào vị trí dòng lệnh trong CLAUDE.md.\n- Option B sai vì xung đột cấu hình không làm ngắt thực thi hay gây lỗi dừng chương trình CLI.\n- Option C sai vì xung đột không làm vô hiệu hóa cả hai tệp nạp.\n- Option D đúng vì team-standards.md được khai báo ở Dòng 2 (sau Dòng 1), nên quy tắc '2 spaces' nạp sau sẽ ghi đè quy tắc '4 tabs' nạp trước từ company-standards.md.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]