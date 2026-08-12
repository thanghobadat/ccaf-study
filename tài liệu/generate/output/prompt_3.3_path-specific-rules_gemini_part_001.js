[
  {
    "id": "d3-b06-3.3-001",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-001",
    "questionEN": "In a gRPC service repository grpc-user-service, developers notice that Claude Code frequently modifies *.pb.go files directly when adding new struct fields, causing those manual edits to be overwritten whenever the protoc --go_out=. ./proto/*.proto build command runs in CI. The team wants Claude Code to recognize generated files and refrain from editing them directly, directing edits to .proto schema definitions instead. Which CLAUDE.md configuration correctly enforces this rule for generated protobuf files?",
    "question": "[d3-b06-3.3-001] Trong kho lưu trữ dịch vụ gRPC grpc-user-service, các nhà phát triển nhận thấy Claude Code thường xuyên sửa đổi trực tiếp các tệp *.pb.go khi thêm các trường struct mới, dẫn đến các chỉnh sửa thủ công đó bị ghi đè bất cứ khi nào lệnh build protoc --go_out=. ./proto/*.proto chạy trong CI. Nhóm muốn Claude Code nhận biết các tệp được tạo tự động (generated files) và không chỉnh sửa trực tiếp chúng, thay vào đó hướng các chỉnh sửa đến định nghĩa schema .proto. Cấu hình CLAUDE.md nào sau đây thực thi chính xác quy tắc này đối với các tệp protobuf được tạo ra?",
    "optionsEN": [
      "A. Add a Glob section [rules for \"**/*.pb.go\"] in CLAUDE.md stating: \"Do not edit generated protobuf files directly; modify.proto files and run buf generate instead.\"",
      "B. Add *.pb.go to .claudeignore so Claude Code automatically runs buf generate whenever .proto schema files are modified.",
      "C. Add a global section [rules for \"*\"] in CLAUDE.md forcing protoc execution after editing any repository file.",
      "D. Add a Glob section [rules for \"proto/\"] instructing Claude Code to monitor generated *.pb.go outputs and recompile them on demand."
    ],
    "options": [
      "A. Thêm một phần Glob [rules for \"**/*.pb.go\"] trong CLAUDE.md quy định: \"Không chỉnh sửa trực tiếp các tệp protobuf được tạo tự động; hãy sửa đổi tệp.proto và chạy buf generate thay thế.\"",
      "B. Thêm *.pb.go vào .claudeignore để Claude Code tự động chạy buf generate bất cứ khi nào các tệp schema .proto bị thay đổi.",
      "C. Thêm một phần toàn cục [rules for \"*\"] trong CLAUDE.md buộc thực thi protoc sau khi chỉnh sửa bất kỳ tệp nào trong kho lưu trữ.",
      "D. Thêm một phần Glob [rules for \"proto/\"] hướng dẫn Claude Code giám sát các đầu ra *.pb.go được tạo và biên dịch lại chúng theo yêu cầu."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because [rules for \"**/*.pb.go\"] defines a path-specific Glob rule in CLAUDE.md that strictly targets generated protobuf files, instructing Claude Code to avoid direct file edits and direct modifications to .proto source files instead.",
      "Option B is incorrect because .claudeignore completely hides matching files from Claude Code's context, preventing Claude from inspecting generated outputs altogether, and does not trigger automated command executions.",
      "Option C is incorrect because [rules for \"*\"] applies globally to all files across the repository, forcing unnecessary build steps for unrelated files rather than scoping rules specifically to generated protobuf outputs.",
      "Option D is incorrect because [rules for \"proto/\"] scopes rules to source .proto schema files rather than target *.pb.go generated output files, failing to restrict direct edits when Claude operates on generated code."
    ],
    "rationale": "Glob section headers such as [rules for \"**/*.pb.go\"] in CLAUDE.md allow teams to scope specific behavioral guidelines exclusively to files matching that pattern. When Claude Code edits or inspects *.pb.go files, it ingests these path-specific rules, preventing accidental direct edits on auto-generated code and directing changes to .proto source files.",
    "explanation": "Lựa chọn A là đáp án đúng vì thẻ phần Glob [rules for \"**/*.pb.go\"] trong CLAUDE.md cho phép định nghĩa các quy tắc hành vi dành riêng cho đường dẫn tệp khớp với mẫu. Khi Claude Code thao tác trên các tệp *.pb.go, nó sẽ áp dụng quy tắc này và tránh sửa đổi trực tiếp các tệp tự động sinh ra.\\n\\nLựa chọn B sai vì .claudeignore ẩn hoàn toàn tệp khỏi ngữ cảnh của Claude Code khiến mô hình không thể đọc hay kiểm tra code, và tệp ignore không có tính năng kích hoạt chạy lệnh tự động.\\n\\nLựa chọn C sai vì mẫu toàn cục [rules for \"*\"] sẽ áp dụng quy tắc cho mọi tệp trong dự án thay vì khoanh vùng cho tệp protobuf.\\n\\nLựa chọn D sai vì đường dẫn proto/ chỉ áp dụng cho tệp nguồn .proto chứ không bảo vệ các tệp đầu ra *.pb.go khỏi bị chỉnh sửa trực tiếp.",
    "scenarioSignature": {
      "testedPrinciple": "path specific rules for generated code prohibition",
      "failureMode": "manual edits in generated code overwritten during build",
      "rootCause": "absence of glob pattern rule restricting modifications on generated files",
      "requiredFix": "configure path specific glob section instructing model to edit source schema and run generator command"
    },
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  },
  {
    "id": "d3-b06-3.3-002",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.3 path-specific-rules / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.3-002",
    "questionEN": "In a fintech repository auth-vault-service, company compliance requires that every code change inside src/security/** must include an inline header comment formatted as // Security-Justification: <reason>. Pull request builds currently fail on check-sec-comments.sh with exit code ERR_MISSING_SEC_JUSTIFICATION because Claude Code modifies authentication helpers without adding these comments. How should the team configure CLAUDE.md so that Claude Code strictly appends security justification comments when editing files in src/security/**, while keeping general repository files unencumbered by this requirement?",
    "question": "[d3-b06-3.3-002] Trong kho lưu trữ công nghệ tài chính auth-vault-service, quy định tuân thủ của công ty yêu cầu mọi thay đổi mã nguồn bên trong src/security/** phải bao gồm một chú thích đầu tệp dạng // Security-Justification: <lý do>. Các lượt build pull request hiện bị lỗi ở check-sec-comments.sh với mã lỗi ERR_MISSING_SEC_JUSTIFICATION do Claude Code sửa đổi các hàm hỗ trợ xác thực mà không thêm các chú thích này. Nhóm nên cấu hình CLAUDE.md như thế nào để Claude Code bắt buộc thêm chú thích giải trình an ninh khi chỉnh sửa tệp trong src/security/**, trong khi các tệp chung khác của kho lưu trữ không bị ảnh hưởng bởi yêu cầu này?",
    "optionsEN": [
      "A. Add a global rule under [rules for \"*\"] in CLAUDE.md requiring // Security-Justification: comments for every modified file across the entire repository.",
      "B. Add a Glob section [rules for \"src/security/**\"] in CLAUDE.md specifying: \"All changes to files in this directory require a // Security-Justification: comment explaining the change.\"",
      "C. Include src/security/** in .claudeignore so Claude Code automatically appends security comments during file write operations.",
      "D. Create src/security/CLAUDE.md with YAML frontmatter security_comment_required: true and an @import link to the root configuration."
    ],
    "options": [
      "A. Thêm một quy tắc toàn cục dưới phần [rules for \"*\"] trong CLAUDE.md yêu cầu chú thích // Security-Justification: cho mọi tệp bị sửa đổi trên toàn bộ kho lưu trữ.",
      "B. Thêm một phần Glob [rules for \"src/security/**\"] trong CLAUDE.md chỉ định: \"Tất cả thay đổi đối với các tệp trong thư mục này yêu cầu chú thích // Security-Justification: giải thích thay đổi.\"",
      "C. Đưa src/security/** vào .claudeignore để Claude Code tự động chèn các chú thích an ninh trong quá trình ghi tệp.",
      "D. Tạo tệp src/security/CLAUDE.md với YAML frontmatter security_comment_required: true và liên kết @import tới cấu hình gốc."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because defining the requirement under [rules for \"*\"] imposes mandatory security comments on all repository files universally, causing unnecessary friction and rule noise for non-security modules.",
      "Option B is correct because [rules for \"src/security/**\"] creates a path-specific Glob rule in CLAUDE.md that triggers only when Claude Code works on files under src/security/**, enforcing the justification comment requirement strictly where required.",
      "Option C is incorrect because listing src/security/** in .claudeignore completely hides those files from Claude Code, rendering the tool unable to access or modify them rather than guiding comment generation.",
      "Option D is incorrect because CLAUDE.md does not support YAML frontmatter keys like security_comment_required: true for path scoping, and path-specific rules should be specified using standard Glob headers in CLAUDE.md."
    ],
    "rationale": "Glob section headers like [rules for \"src/security/**\"] in CLAUDE.md allow developers to scope strict compliance rules to security-sensitive directories. These rules are additive and only evaluated when Claude Code operates on files matching the glob pattern, ensuring compliance checks pass in CI without cluttering non-sensitive code files.",
    "explanation": "Lựa chọn B là đáp án đúng vì thẻ phần Glob [rules for \"src/security/**\"] trong CLAUDE.md định nghĩa quy tắc chỉ kích hoạt khi Claude Code làm việc với các tệp nằm trong thư mục src/security/**. Điều này đảm bảo yêu cầu chú thích giải trình an ninh được thực thi nghiêm ngặt tại đúng vị trí mà không ảnh hưởng tới các thư mục khác.\\n\\nLựa chọn A sai vì việc dùng mẫu [rules for \"*\"] sẽ bắt buộc thêm chú thích an ninh cho toàn bộ tệp trong dự án, gây phiền hà cho các phần code không liên quan.\\n\\nLựa chọn C sai vì .claudeignore sẽ ẩn hoàn toàn thư mục khỏi Claude Code khiến nó không thể đọc hay chỉnh sửa các tệp này.\\n\\nLựa chọn D sai vì CLAUDE.md không hỗ trợ thuộc tính YAML frontmatter như security_comment_required: true để phân vùng quy tắc.",
    "scenarioSignature": {
      "testedPrinciple": "scoped rule enforcement for security sensitive directories",
      "failureMode": "ci compliance pipeline failure due to missing mandatory justification comments",
      "rootCause": "absence of path specific glob rule in project configuration for sensitive paths",
      "requiredFix": "add path specific glob section targeting sensitive directory with required comment directive"
    },
    "sources": [
      {
        "label": "Lesson 3.3: Path-Specific Rules",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-3-path-specific-rules"
      }
    ]
  }
]