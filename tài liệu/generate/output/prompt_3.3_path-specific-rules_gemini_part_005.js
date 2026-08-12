[
  {
    "id": "d3-b06-3.3-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-009",
    "questionEN": "A software engineering team managing checkout-service uses Jest integration tests with baseline API payload files stored in test/fixtures/. During test suite refactoring, Claude Code frequently updates test/fixtures/order_response.json to make failing tests pass rather than correcting implementation logic, resulting in corrupted baseline snapshots during CI runs (npm run test:ci). The team needs to prevent Claude Code from modifying any files in test/fixtures/ while still allowing it to read fixture contents to draft accurate test assertions. Which configuration correctly enforces this requirement in CLAUDE.md?",
    "question": "[d3-b06-3.3-009] Một đội ngũ kỹ thuật phần mềm quản lý dịch vụ checkout-service sử dụng các bài kiểm thử tích hợp Jest với các tệp dữ liệu payload mẫu được lưu trữ trong test/fixtures/. Trong quá trình tái cấu trúc bộ kiểm thử, Claude Code thường xuyên tự ý cập nhật tệp test/fixtures/order_response.json để làm cho các kiểm thử thất bại vượt qua thay vì sửa logic thực thi, dẫn đến việc làm sai lệch dữ liệu snapshot cơ sở trong các lượt chạy CI (npm run test:ci). Đội ngũ cần ngăn Claude Code sửa đổi bất kỳ tệp nào trong test/fixtures/ nhưng vẫn cho phép đọc nội dung tệp để viết các khẳng định kiểm thử chính xác. Cấu hình nào trong CLAUDE.md thực thi đúng yêu cầu này?",
    "optionsEN": [
      "A. Add a section header [rules for \"test / fixtures / \"] in CLAUDE.md with \"Do not edit or modify fixture files in test / fixtures /; fixtures are read - only baseline data.\"",
      "B. Add test/fixtures/** to .claudeignore at the workspace root to prevent Claude Code from making edits to the directory.",
      "C. Add a general rule under the root CLAUDE.md header stating \"Never modify files containing the phrase fixture in their filename or path.\"",
      "D. Configure \"readOnly\": true inside .claude/config.json under the \"test\" environment block to block file writes."
    ],
    "options": [
      "A. Thêm tiêu đề phần [rules for \"test / fixtures / \"] trong CLAUDE.md với chỉ thị \"Do not edit or modify fixture files in test / fixtures /; fixtures are read - only baseline data.\"",
      "B. Thêm test/fixtures/** vào .claudeignore ở thư mục gốc workspace để ngăn Claude Code thực hiện chỉnh sửa đối với thư mục này.",
      "C. Thêm một quy tắc chung dưới tiêu đề gốc của CLAUDE.md với nội dung \"Never modify files containing the phrase fixture in their filename or path.\"",
      "D. Cấu hình \"readOnly\": true bên trong .claude/config.json dưới khối môi trường \"test\" để chặn việc ghi tệp."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Adding a glob section [rules for \"test / fixtures / \"] in CLAUDE.md enforces path-specific instructions that instruct Claude Code to treat matching files as read-only baseline data while preserving full read access so Claude can analyze payload structures when writing tests.",
      "Option B is incorrect because adding test/fixtures/ to .claudeignore completely hides the directory from Claude Code, preventing it from reading fixture payloads to construct valid mock objects or test assertions.",
      "Option C is incorrect because general un-scoped rules in CLAUDE.md apply globally to all interactions and lack path-matching reliability, potentially restricting modification of active test files like fixture_builder.ts while failing to strictly bound file edits by directory path.",
      "Option D is incorrect because .claude/config.json does not support a path-scoped readOnly parameter under environment blocks, and blocking all file writes globally would prevent Claude Code from modifying actual test files or source code."
    ],
    "rationale": "Using a Glob section header [rules for \"test/ fixtures / \"] in CLAUDE.md allows project maintainers to declare path-specific constraints. This preserves read access for context while explicitly instructing Claude Code not to mutate baseline fixture files.",
    "explanation": "Trong Claude Code, cấu hình CLAUDE.md hỗ trợ phân vùng quy tắc theo đường dẫn bằng cú pháp thẻ Glob dạng [rules for \"\"]. Khi làm việc trên các tệp khớp với mô hình đường dẫn này, Claude Code sẽ áp dụng các quy tắc được định nghĩa trong phân vùng đó bổ sung vào quy tắc chung.\\n\\n- Đáp án A đúng vì [rules for \"test / fixtures / \"] áp dụng quy tắc trực tiếp cho các tệp dữ liệu mẫu. Việc quy định chỉ đọc/không sửa đổi giúp giữ nguyên nội dung dữ liệu cơ sở (baseline) đồng thời vẫn cho phép Claude Code đọc nội dung tệp để hiểu cấu trúc payload và tạo bài kiểm thử đúng.\\n- Đáp án B sai vì .claudeignore sẽ ẩn toàn bộ tệp khỏi tầm nhìn của Claude Code (tương tự .gitignore). Việc này khiến Claude không thể đọc dữ liệu mẫu để tham chiếu cấu trúc schema khi viết test.\\n- Đáp án C sai vì các quy tắc tổng quan không có phạm vi đường dẫn (un-scoped) có tính mơ hồ cao, vừa dễ bị bỏ sót vừa có thể vô tình hạn chế việc sửa đổi các tệp kiểm thử chứa từ khóa 'fixture' (như fixture_helper.ts).\\n- Đáp án D sai vì .claude/config.json không hỗ trợ trường cấu hình 'readOnly' theo đường dẫn thư mục hay theo môi trường.",
    "scenarioSignature": {
      "testedPrinciple": "read-only path scoping via glob sections in project configuration",
      "failureMode": "baseline test fixtures corrupted during automated test writing sessions",
      "rootCause": "absence of path-specific mutation restrictions for test fixture directories",
      "requiredFix": "configure path-specific glob section for fixture directory preventing file modifications"
    },
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  },
  {
    "id": "d3-b06-3.3-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-010",
    "questionEN": "A front-end development team working on portal-webapp uses react-i18next with localization files stored under src/i18n//*.json (such as en.json, es.json, and ja.json). When creating new UI components, Claude Code needs to register new translation keys across all locale files. However, team policy prohibits AI tools from editing or retranslating existing localized values, which are managed by native language translators. Which CLAUDE.md configuration correctly enforces key additions while preventing modifications to existing values for these paths?",
    "question": "[d3-b06-3.3-010] Một đội ngũ phát triển front-end đang làm việc trên portal-webapp sử dụng react-i18next với các tệp đa ngôn ngữ được lưu trữ trong src/i18n//.json (như en.json, es.json, và ja.json). Khi tạo các thành phần giao diện mới, Claude Code cần đăng ký các khóa dịch mới vào tất cả các tệp ngôn ngữ. Tuy nhiên, quy định của đội ngũ cấm các công cụ AI chỉnh sửa hoặc dịch lại các chuỗi giá trị hiện có, vốn do các biên dịch viên bản ngữ quản lý. Cấu hình CLAUDE.md nào thực thi chính xác việc cho phép thêm khóa mới nhưng ngăn chặn chỉnh sửa các giá trị hiện có cho các đường dẫn này?",
    "optionsEN": [
      "A. Add src/i18n/**/.json to .claudeignore to restrict Claude Code from modifying existing translation entries.",
      "B. Add a section header [rules for \"src / i18n//.json\"] in CLAUDE.md with \"When updating locale files, only add missing translation keys; do not modify or retranslate existing string values.\"",
      "C. Create a nested CLAUDE.md inside src/i18n/ with [rules for \".json\"] containing \"ReadOnly: true\".",
      "D. Configure \"i18nAppendOnly\": true inside .claude/config.json to restrict JSON modifications in localization paths."
    ],
    "options": [
      "A. Thêm src/i18n//.json vào .claudeignore để hạn chế Claude Code chỉnh sửa các mục dịch hiện có.",
      "B. Thêm tiêu đề phần [rules for \"src/i18n/**/.json\"] trong CLAUDE.md với chỉ thị \"When updating locale files, only add missing translation keys; do not modify or retranslate existing string values.\"",
      "C. Tạo một tệp CLAUDE.md lồng nhau bên trong src/i18n/ với tiêu đề [rules for \".json\"] chứa chỉ thị \"ReadOnly: true\".",
      "D. Cấu hình \"i18nAppendOnly\": true bên trong .claude/config.json để hạn chế việc sửa đổi tệp JSON trong các đường dẫn đa ngôn ngữ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because listing src/i18n/**/.json in .claudeignore hides the localization files entirely, rendering Claude Code unable to read existing keys or append new translation key-value pairs.",
      "Option B (Correct): Using a glob section header [rules for \"src/i18n//*.json\"] in CLAUDE.md allows defining granular behavioral boundaries for matching paths, permitting key additions while explicitly forbidding edits to existing translation string values.",
      "Option C is incorrect because setting ReadOnly: true in a nested CLAUDE.md prevents Claude Code from making any edits, which blocks the requirement to add new translation keys when introducing new UI features.",
      "Option D is incorrect because .claude/config.json does not feature an i18nAppendOnly schema attribute, as path-scoped behavioral guardrails must be configured using Glob sections in CLAUDE.md."
    ],
    "rationale": "Glob section headers in CLAUDE.md allow teams to scope specific behavioral rules to targeted file paths. Setting explicit path-scoped rules for src/i18n//.json ensures Claude Code appends new translation keys without altering existing translation strings.",
    "explanation": "Trong dự án sử dụng Claude Code, các tiêu đề phân vùng Glob [rules for \"\"] trong tệp CLAUDE.md cho phép thiết lập các quy tắc hành vi chi tiết dành riêng cho các tệp phù hợp với mô hình đường dẫn được chỉ định.\\n\\n- Đáp án B đúng vì phân vùng [rules for \"src/i18n/**/.json\"] định nghĩa chính xác phạm vi tác động lên các tệp i18n, chỉ thị cho Claude Code chỉ được phép bổ sung các khóa dịch còn thiếu và nghiêm cấm việc chỉnh sửa hay tự dịch lại các chuỗi giá trị đa ngôn ngữ đã có sẵn.\\n- Đáp án A sai vì việc đưa các tệp ngôn ngữ vào .claudeignore sẽ làm ẩn hoàn toàn các tệp này khỏi Claude Code, khiến mô hình không thể đọc các khóa hiện tại hay thêm các khóa mới khi tạo giao diện.\\n- Đáp án C sai vì việc đặt chỉ thị ReadOnly: true ngăn cản toàn bộ thao tác ghi tệp, làm thất bại yêu cầu phải thêm khóa dịch mới.\\n- Đáp án D sai vì .claude/config.json không sở hữu thuộc tính cấu hình 'i18nAppendOnly', mọi quy tắc kiểm soát hành vi theo đường dẫn tệp phải được khai báo trong CLAUDE.md.",
    "scenarioSignature": {
      "testedPrinciple": "path-scoped partial editing restrictions via glob sections",
      "failureMode": "existing localization string values accidentally overwritten or retranslated",
      "rootCause": "lack of path-specific governance specifying key-addition-only behavior for locale files",
      "requiredFix": "add glob section in claudemd for locale paths permitting key additions while prohibiting existing string mutations"
    },
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  }
]