[
  {
    "id": "d3-b06-new-017",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-017",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory CLAUDE.md rule precedence over project root CLAUDE.md for specific directory files",
      "failureMode": "incorrect execution of root test execution rule on generated code files",
      "rootCause": "failing to apply innermost directory CLAUDE.md override rule for conflicting directives",
      "requiredFix": "override root test execution rule with subdirectory test exclusion rule when editing target file"
    },
    "questionEN": "A project repository contains /repo/CLAUDE.md with the rule Always run npm test after code changes, and a nested subdirectory /repo/src/generated/CLAUDE.md with the rule skip tests for generated files. A developer instructs Claude Code to update response parsing in /repo/src/generated/api_client.ts. How does Claude Code determine its test execution behavior after making the code modification?",
    "question": "[d3-b06-new-017] Một repository dự án chứa /repo/CLAUDE.md với quy tắc Always run npm test after code changes, và thư mục con /repo/src/generated/CLAUDE.md với quy tắc skip tests for generated files. Lập trình viên yêu cầu Claude Code cập nhật logic phân tích response trong /repo/src/generated/api_client.ts. Claude Code xác định hành vi chạy test như thế nào sau khi thực hiện sửa đổi code?",
    "optionsEN": [
      "A. Claude Code skips running npm test because /repo/src/generated/CLAUDE.md takes precedence over the root rule for files inside src/generated/.",
      "B. Claude Code executes npm test because root /repo/CLAUDE.md directives take strict precedence over nested subdirectory files.",
      "C. Claude Code halts execution with a configuration conflict error because opposing test policies between root and subdirectories are disallowed.",
      "D. Claude Code prompts the user to manually choose a test policy whenever root and subdirectory CLAUDE.md files conflict."
    ],
    "options": [
      "A. Claude Code bỏ qua việc chạy npm test vì /repo/src/generated/CLAUDE.md có độ ưu tiên cao hơn quy tắc root đối với các file bên trong src/generated/.",
      "B. Claude Code thực thi npm test vì các chỉ thị trong root /repo/CLAUDE.md có độ ưu tiên tuyệt đối so với các file ở thư mục con.",
      "C. Claude Code dừng thực thi với lỗi xung đột cấu hình vì các chính sách test mâu thuẫn giữa root và thư mục con không được phép.",
      "D. Claude Code hiển thị thông báo yêu cầu người dùng chọn thủ công chính sách test mỗi khi file CLAUDE.md ở root và thư mục con xung đột."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because Claude Code resolves configuration conflicts by scope proximity; rules in /repo/src/generated/CLAUDE.md override root /repo/CLAUDE.md rules when editing src/generated/api_client.ts.",
      "Option B is incorrect because project root rules do not override subdirectory rules; nested CLAUDE.md files take precedence for their local file tree.",
      "Option C is incorrect because Claude Code uses standard inheritance hierarchy precedence rather than throwing errors on conflicting instructions.",
      "Option D is incorrect because Claude Code deterministically applies innermost rule precedence automatically without requesting manual user intervention."
    ],
    "rationale": "In Claude Code's configuration hierarchy (Global > Project Root > Subdirectory), innermost directory files have the highest precedence. When editing src/generated/api_client.ts, the rule skip tests for generated files in /repo/src/generated/CLAUDE.md overrides the root /repo/CLAUDE.md rule Always run npm test after code changes.",
    "explanation": "Trong hệ thống phân cấp cấu hình của Claude Code (Global > Project Root > Subdirectory), file cấu hình nằm ở thư mục con gần nhất (innermost) có độ ưu tiên cao nhất khi giải quyết các quy tắc xung đột đối với các file trong thư mục đó. Do đó, khi chỉnh sửa file src/generated/api_client.ts, quy tắc skip tests for generated files trong /repo/src/generated/CLAUDE.md sẽ ghi đè quy tắc Always run npm test after code changes ở root /repo/CLAUDE.md.\n- Option A đúng vì quy tắc thư mục con ghi đè quy tắc root mâu thuẫn.\n- Option B sai vì quy tắc root không ghi đè được quy tắc cấp thư mục con trong phạm vi thư mục đó.\n- Option C sai vì Claude Code xử lý xung đột theo thứ tự ưu tiên chứ không báo lỗi hệ thống.\n- Option D sai vì hệ thống tự động áp dụng quy tắc ưu tiên mà không cần can thiệp thủ công từ người dùng.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-new-018",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-new-018",
    "questionEN": "In a monorepo setup, /repo/services/auth/CLAUDE.md specifies use JWT, while /repo/services/payment/CLAUDE.md specifies use OAuth. A developer asks Claude Code to implement authentication handling while modifying /repo/services/auth/login.py. Which authentication protocol will Claude Code apply and why?",
    "question": "[d3-b06-new-018] Trong thiết lập monorepo, /repo/services/auth/CLAUDE.md chỉ định use JWT, trong khi /repo/services/payment/CLAUDE.md chỉ định use OAuth. Lập trình viên yêu cầu Claude Code triển khai xử lý xác thực khi đang sửa đổi /repo/services/auth/login.py. Claude Code sẽ áp dụng giao thức xác thực nào và tại sao?",
    "optionsEN": [
      "A. Claude Code attempts to implement a hybrid OAuth-JWT system because all sibling service CLAUDE.md files are merged across the repository.",
      "B. Claude Code applies JWT because /repo/services/auth/CLAUDE.md exclusively scopes its rules to files under the auth/ directory tree.",
      "C. Claude Code applies OAuth because monorepo rules are evaluated in alphabetical order of subdirectory paths.",
      "D. Claude Code halts with a multi-definition error because sibling CLAUDE.md files cannot specify conflicting architectural directives."
    ],
    "options": [
      "A. Claude Code cố gắng triển khai hệ thống kết hợp OAuth-JWT vì tất cả các file CLAUDE.md thuộc các dịch vụ ngang hàng đều được gộp lại trên toàn repository.",
      "B. Claude Code áp dụng JWT vì /repo/services/auth/CLAUDE.md chỉ áp dụng các quy tắc của nó cho các file thuộc cây thư mục auth/.",
      "C. Claude Code áp dụng OAuth vì các quy tắc trong monorepo được đánh giá theo thứ tự bảng chữ cái của đường dẫn thư mục con.",
      "D. Claude Code dừng lại với lỗi đa định nghĩa vì các file CLAUDE.md ngang hàng không được chỉ định các chỉ thị kiến trúc mâu thuẫn."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because sibling subdirectory CLAUDE.md files are not merged globally across unrelated directories.",
      "Option B is correct because CLAUDE.md rules in a subdirectory only apply to files within that directory's tree, so editing auth/login.py strictly activates /repo/services/auth/CLAUDE.md.",
      "Option C is incorrect because path alphabetical ordering plays no role in scoping resolution.",
      "Option D is incorrect because sibling subdirectories in a monorepo are isolated; conflicting directives across different service components are completely valid."
    ],
    "rationale": "Subdirectory CLAUDE.md rules are scoped exclusively to files within their respective directory trees. When editing services/auth/login.py, Claude Code only evaluates parent directory configurations (/repo, /repo/services, /repo/services/auth), so /repo/services/auth/CLAUDE.md (\"use JWT\") applies, while /repo/services/payment/CLAUDE.md (\"use OAuth\") is out of scope and ignored.",
    "explanation": "Cấu hình CLAUDE.md ở thư mục con chỉ áp dụng cho các file nằm trong cây thư mục tương ứng của nó. Khi Claude Code thao tác trên file services/auth/login.py, hệ thống chỉ thu thập cấu hình dọc theo nhánh đường dẫn thư mục cha (/repo, /repo/services, /repo/services/auth). Do đó, chỉ quy tắc use JWT trong /repo/services/auth/CLAUDE.md có hiệu lực, trong khi quy tắc trong /repo/services/payment/CLAUDE.md thuộc nhánh khác nên hoàn toàn bị bỏ qua.\\n- Option A sai vì quy tắc ở các thư mục con ngang hàng không bị gộp lại với nhau.\\n- Option B đúng vì quy tắc trong auth/CLAUDE.md chỉ có phạm vi áp dụng cho cây thư mục auth/.\\n- Option C sai vì thứ tự bảng chữ cái của đường dẫn không ảnh hưởng đến việc đánh giá quy tắc.\\n- Option D sai vì các dịch vụ ngang hàng có thể có các quy tắc độc lập mà không gây lỗi xung đột cấu hình.",
    "scenarioSignature": {
      "testedPrinciple": "subdirectory CLAUDE.md scoping isolation across distinct service directories in monorepo",
      "failureMode": "incorrectly applying sibling subdirectory rules or reporting configuration conflicts",
      "rootCause": "misunderstanding that subdirectory rules only apply within their target folder hierarchy",
      "requiredFix": "apply active subdirectory rules exclusively based on target file filesystem location"
    },
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]