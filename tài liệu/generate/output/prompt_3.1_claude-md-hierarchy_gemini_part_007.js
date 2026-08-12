[
  {
    "id": "d3-b06-new-013",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-013",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory configuration file precedence over root glob scoped rules",
      "failureMode": "incorrect library adoption caused by misinterpreting root glob rule override authority",
      "rootCause": "failing to recognize that innermost subdirectory configuration files supersede root level configuration rules",
      "requiredFix": "apply subdirectory configuration file instructions over project root glob section rules"
    },
    "questionEN": "In an e-commerce microservices repository, the project root configuration file /repo/CLAUDE.md contains a path-scoped rule section [rules for \"src/payments/**\"] specifying that all monetary values must use dinero.js data structures. Simultaneously, a dedicated component configuration file exists at /repo/src/payments/CLAUDE.md mandating bignumber.js for all financial operations. When a developer prompts Claude Code to refactor transaction logging in /repo/src/payments/processor.ts, which rule hierarchy evaluation determines the library choice?",
    "question": "[d3-b06-new-013] Trong một kho mã nguồn vi dịch vụ thương mại điện tử, tệp cấu hình gốc dự án /repo/CLAUDE.md chứa phần quy tắc phạm vi đường dẫn [rules for \"src/payments/**\"] quy định tất cả giá trị tiền tệ phải sử dụng cấu trúc dữ liệu dinero.js. Đồng thời, tệp cấu hình thành phần riêng biệt tồn tại tại /repo/src/payments/CLAUDE.md bắt buộc sử dụng bignumber.js cho mọi thao tác tài chính. Khi nhà phát triển yêu cầu Claude Code tái cấu trúc ghi nhật ký giao dịch trong /repo/src/payments/processor.ts, đánh giá thứ tự ưu tiên cấu hình nào sẽ quyết định thư viện được chọn?",
    "optionsEN": [
      "A. The rule in /repo/src/payments/CLAUDE.md takes precedence because a standalone subdirectory CLAUDE.md overrides conflicting rules from the project root CLAUDE.md, including glob-scoped sections.",
      "B. The section [rules for \"src/payments/**\"] in /repo/CLAUDE.md takes precedence because path-scoped glob headers override generic directory-level files regardless of directory depth.",
      "C. Claude Code combines both directives into an additive constraint requiring processor.ts to instantiate both dinero.js and bignumber.js for all transaction objects.",
      "D. Claude Code halts execution and returns a path rule collision error because glob path patterns cannot overlap with subdirectory configuration files."
    ],
    "options": [
      "A. Quy tắc trong /repo/src/payments/CLAUDE.md được ưu tiên vì tệp CLAUDE.md trong thư mục con ghi đè các quy tắc xung đột từ tệp CLAUDE.md ở gốc dự án, bao gồm cả các phần có phạm vi glob.",
      "B. Phần [rules for \"src/payments/**\"] trong /repo/CLAUDE.md được ưu tiên vì tiêu đề glob có phạm vi đường dẫn sẽ ghi đè các tệp cấp thư mục thông thường bất kể độ sâu thư mục.",
      "C. Claude Code kết hợp cả hai chỉ thị thành một ràng buộc bổ sung yêu cầu processor.ts khởi tạo đồng thời cả dinero.js và bignumber.js cho mọi đối tượng giao dịch.",
      "D. Claude Code dừng thực thi và trả về lỗi xung đột quy tắc đường dẫn vì các mẫu đường dẫn glob không thể chồng chéo với tệp cấu hình thư mục con."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because in the Claude Code configuration hierarchy, an innermost subdirectory CLAUDE.md takes precedence over project root rules, including glob-scoped sections defined within the root file, when operating on target files inside that subdirectory.",
      "Option B is incorrect because glob pattern headers in the root CLAUDE.md do not override the strict structural precedence of a more localized subdirectory CLAUDE.md file.",
      "Option C is incorrect because when configuration instructions explicitly conflict on library selection, lower precedence level rules are overridden rather than merged into dual redundant dependencies.",
      "Option D is incorrect because Claude Code deterministically resolves hierarchical precedence without throwing configuration parsing or collision errors."
    ],
    "rationale": "Under Claude Code's three-level hierarchy (Subdirectory > Project root > Global), the innermost directory file (/repo/src/payments/CLAUDE.md) is more specific than the root file (/repo/CLAUDE.md). Even if the root file uses a glob section header such as [rules for \"src/payments/**\"], the subdirectory CLAUDE.md takes precedence for conflicts within its scope.",
    "explanation": "Trong hệ thống thứ tự ưu tiên của Claude Code (Thư mục con > Gốc dự án > Toàn cục), tệp CLAUDE.md ở thư mục con trong cùng (/repo/src/payments/CLAUDE.md) luôn mang tính cụ thể cao hơn tệp ở gốc dự án (/repo/CLAUDE.md). Cho dù tệp gốc có định nghĩa phần glob [rules for \"src/payments/**\"], quy tắc trong tệp CLAUDE.md thư mục con vẫn ghi đè quy tắc ở gốc khi có xung đột.\n\n- Đáp án A đúng vì tệp CLAUDE.md thư mục con ghi đè các quy tắc xung đột từ mức gốc dự án.\n- Đáp án B sai vì cú pháp glob ở gốc không ghi đè được ưu tiên phân cấp của tệp cấu hình thư mục con.\n- Đáp án C sai vì khi quy tắc xung đột trực tiếp, quy tắc cấp thấp hơn bị ghi đè chứ không kết hợp tạo ra mã trùng lặp.\n- Đáp án D sai vì Claude Code giải quyết thứ tự ưu tiên một cách xác định mà không báo lỗi xung đột đường dẫn.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-014",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-014",
    "scenarioSignature": {
      "testedPrinciple": "session initialization configuration caching for CLAUDE.md",
      "failureMode": "unexpected fallback to initial rules when assuming mid-session configuration hot reloading",
      "rootCause": "CLAUDE.md instructions being evaluated and loaded into context exclusively at session startup",
      "requiredFix": "start a new CLI session to apply updated CLAUDE.md configuration rules"
    },
    "questionEN": "While working inside an active Claude Code interactive CLI session in an analytics repository, a lead developer edits /repo/CLAUDE.md in a separate editor window to add a mandatory rule: [rules for \"**/*.ts\"] must use bun:test instead of jest. Immediately after saving the file, the developer issues a prompt in the active CLI session: 'Write a unit test suite for src/aggregator.ts'. Which testing framework will Claude Code select for the generated test file during this session turn?",
    "question": "[d3-b06-new-014] Trong khi đang làm việc bên trong một phiên CLI tương tác Claude Code đang hoạt động ở kho mã nguồn phân tích dữ liệu, nhà phát triển chỉnh sửa /repo/CLAUDE.md ở tệp soạn thảo bên ngoài để thêm quy tắc bắt buộc: [rules for \"**/*.ts\"] phải sử dụng bun:test thay vì jest. Ngay sau khi lưu tệp, nhà phát triển đưa ra câu lệnh trong phiên CLI hiện tại: 'Write a unit test suite for src/aggregator.ts'. Khung thử nghiệm nào sẽ được Claude Code lựa chọn cho tệp thử nghiệm được tạo ra trong lượt phiên này?",
    "optionsEN": [
      "A. Claude Code uses bun:test because /repo/CLAUDE.md is re-read from disk dynamically before every tool execution turn.",
      "B. Claude Code uses jest because configuration files are loaded into context at session initialization and mid-session edits to CLAUDE.md require starting a new session to take effect.",
      "C. Claude Code prompts the developer with an interactive confirmation dialog detecting that /repo/CLAUDE.md modified timestamp changed.",
      "D. Claude Code fails the code generation task with an unhandled state inconsistency exception when disk contents differ from memory context."
    ],
    "options": [
      "A. Claude Code sử dụng bun:test vì /repo/CLAUDE.md được đọc lại từ đĩa một cách động trước mỗi lượt thực thi công cụ.",
      "B. Claude Code sử dụng jest vì các tệp cấu hình được tải vào ngữ cảnh khi khởi tạo phiên làm việc và các chỉnh sửa CLAUDE.md giữa phiên cần khởi chạy một phiên mới để có hiệu lực.",
      "C. Claude Code hiển thị hộp thoại xác nhận tương tác cho nhà phát triển để thông báo rằng mốc thời gian sửa đổi của /repo/CLAUDE.md đã thay đổi.",
      "D. Claude Code thất bại khi tạo mã nguồn với ngoại lệ không nhất quán trạng thái do nội dung trên đĩa khác với ngữ cảnh bộ nhớ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because Claude Code does not dynamically re-parse CLAUDE.md from disk on every prompt turn within an active CLI session.",
      "Option B is correct because CLAUDE.md rules are evaluated and loaded into context during session start; mid-session edits take effect only after exiting and initiating a new session.",
      "Option C is incorrect because Claude Code does not display file modification prompt dialogs for configuration file changes during active sessions.",
      "Option D is incorrect because differences between on-disk files and session context do not trigger unhandled state inconsistency errors."
    ],
    "rationale": "CLAUDE.md configuration files are read and cached into context when a Claude Code session initializes. Changes made to CLAUDE.md while a session is active are not loaded automatically mid-session; the active session retains the original instructions until a new session is started.",
    "explanation": "Tệp cấu hình CLAUDE.md được đọc và nạp vào ngữ cảnh hệ thống ngay khi phiên tương tác của Claude Code được khởi tạo. Việc chỉnh sửa CLAUDE.md trong khi phiên CLI đang chạy sẽ không tự động làm mới ngữ cảnh trong phiên đó; nhà phát triển phải kết thúc và khởi chạy một phiên mới để quy tắc mới có hiệu lực.\n\n- Đáp án A sai vì Claude Code không đọc lại CLAUDE.md từ đĩa ở mỗi lượt tương tác.\n- Đáp án B đúng vì các quy tắc được nạp khi khởi tạo phiên và chỉ cập nhật khi bắt đầu một phiên mới.\n- Đáp án C sai vì Claude Code không bật hộp thoại xác nhận thay đổi mốc thời gian tệp cấu hình.\n- Đáp án D sai vì sự khác biệt giữa nội dung tệp đĩa và bộ nhớ ngữ cảnh không gây ra ngoại lệ hệ thống.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]