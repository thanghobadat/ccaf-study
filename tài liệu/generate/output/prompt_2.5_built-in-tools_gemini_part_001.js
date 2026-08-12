[
  {
    "id": "d2-b05-2.5-001",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-001",
    "scenarioSignature": {
      "testedPrinciple": "built-in glob safety over arbitrary bash execution for file discovery",
      "failureMode": "elevated privilege security warning in automated execution pipeline",
      "rootCause": "spawning shell subprocesses via bash for simple filename pattern matching",
      "requiredFix": "replace bash find commands with native glob path pattern tool"
    },
    "questionEN": "An automated architecture validation agent running inside a CI/CD pipeline needs to discover all configuration schema files matching src/config/**/*.schema.json across a 50,000-file repository. The agent invokes Bash with command find src/config -name '*.schema.json' to locate the paths. Security policy audits flag this execution because spawning subshells requires elevated shell permissions (--dangerously-skip-permissions). How should the agent tool selection be refactored?",
    "question": "[d2-b05-2.5-001] Một agent tự động kiểm tra kiến trúc chạy trong pipeline CI/CD cần tìm tất cả các file schema cấu hình khớp với src/config/**/*.schema.json trên một repository 50.000 file. Agent gọi tool Bash với lệnh find src/config -name '*.schema.json' để xác định các đường dẫn file. Đội ngũ kiểm toán chính sách bảo mật đã cảnh báo lượt thực thi này vì việc khởi tạo subshell yêu cầu quyền shell mở rộng (--dangerously-skip-permissions). Lựa chọn tool của agent nên được tái cấu trúc như thế nào?",
    "optionsEN": [
      "A. Replace the Bash command with the built-in Glob tool using pattern: \"src/config/**/*.schema.json\", which matches file paths safely without shell execution or elevated permissions.",
      "B. Modify the Bash tool invocation to run ls -R src/config | grep \"\\.schema\\.json$\" with sanitized input arguments to bypass privilege flags.",
      "C. Switch from Bash to Grep tool using regex ^.*\\.schema\\.json$ targeting directory src/config to discover the schema paths.",
      "D. Configure WebSearch to query the GitHub repository tree search API endpoint to dynamically retrieve matching schema file paths."
    ],
    "options": [
      "A. Thay thế lệnh Bash bằng tool tích hợp Glob với pattern: \"src/config/**/*.schema.json\", giúp khớp đường dẫn file an toàn mà không cần thực thi shell hay cấp quyền mở rộng.",
      "B. Sửa đổi lệnh tool Bash thành ls -R src/config | grep \"\\.schema\\.json$\" với các đối số được làm sạch để loại bỏ cảnh báo quyền truy cập.",
      "C. Chuyển từ Bash sang tool Grep với regex ^.*\\.schema\\.json$ trỏ vào thư mục src/config để phát hiện đường dẫn schema.",
      "D. Cấu hình WebSearch để truy vấn API endpoint tìm kiếm cây repository GitHub nhằm lấy danh sách đường dẫn file schema."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Built-in Glob performs file and directory path pattern matching natively within the agent sandbox without spawning subshells or requiring dangerous shell execution permissions.",
      "Option B is incorrect: Using ls piped to grep inside Bash still relies on shell execution, retaining shell injection risks and requiring elevated shell execution flags.",
      "Option C is incorrect: Grep is designed to search for text patterns inside file contents, not for finding file names or paths by wildcard glob matching.",
      "Option D is incorrect: Using WebSearch for internal repository file discovery introduces latency, security leakage, and external dependency when codebase tools exist."
    ],
    "rationale": "Using Glob for file path matching eliminates the security risks of arbitrary command execution associated with Bash while achieving precise filename matching.",
    "explanation": "Đáp án đúng là A. Tool tích hợp Glob được thiết kế chuyên biệt để tìm kiếm file và thư mục theo mẫu đường dẫn (path pattern). Việc dùng Glob hoạt động an toàn bên trong môi trường sandbox của agent mà không cần khởi tạo subshell hoặc yêu cầu quyền shell nâng cao (--dangerously-skip-permissions).\n- Phương án B sai vì việc dùng Bash với ls và grep vẫn khởi tạo lệnh shell và tiềm ẩn rủi ro bảo mật.\n- Phương án C sai vì Grep tìm kiếm nội dung văn bản bên trong file, không dùng để duyệt danh sách đường dẫn file.\n- Phương án D sai vì WebSearch dành cho dữ liệu web công khai bên ngoài, không dùng để duyệt repository nội bộ.",
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  },
  {
    "id": "d2-b05-2.5-002",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.5 built-in-tools / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-2.5-002",
    "scenarioSignature": {
      "testedPrinciple": "distinction between filename pattern matching and internal text content searching",
      "failureMode": "false negative search audit results returning zero matching file paths",
      "rootCause": "using glob tool path pattern matching to locate text strings inside file contents",
      "requiredFix": "use native grep tool for inspecting string occurrences within file content bodies"
    },
    "questionEN": "A security compliance agent is auditing a TypeScript microservice repository to find all code locations processing the deprecated header string X-Legacy-Auth-Token. The agent calls Glob with pattern: \"**/*X-Legacy-Auth-Token*\" under src/services/ and returns 0 matching results, causing the automated compliance check to pass incorrectly even though 40+ handler files contain the string. Why did Glob fail, and what is the correct remediation?",
    "question": "[d2-b05-2.5-002] Một agent kiểm tra tuân thủ bảo mật đang rà soát repository microservice TypeScript để tìm tất cả các vị trí code xử lý chuỗi header đã hỏng X-Legacy-Auth-Token. Agent gọi Glob với pattern: \"**/*X-Legacy-Auth-Token*\" trong src/services/ và nhận về 0 kết quả, khiến bước kiểm tra tự động báo qua sai sót dù hơn 40 file handler đang chứa chuỗi này. Tại sao Glob thất bại và giải pháp khắc phục đúng là gì?",
    "optionsEN": [
      "A. Glob failed because it requires the optional parameter contentFilter: \"X-Legacy-Auth-Token\" to inspect text inside files; updating Glob schema parameters resolves the issue.",
      "B. Glob failed because it only matches file path names, not text inside file bodies; the agent should use Grep with pattern: \"X-Legacy-Auth-Token\" and path: \"src/services/\".",
      "C. Glob failed due to missing file extensions; setting pattern: \"src/services/**/*.ts\" with query parameter token: \"X-Legacy-Auth-Token\" enables deep text indexing.",
      "D. Glob failed because internal strings require elevated permissions; the agent should execute WebSearch to query internal GitHub code search indexes."
    ],
    "options": [
      "A. Glob thất bại vì yêu cầu tham số tùy chọn contentFilter: \"X-Legacy-Auth-Token\" để đọc văn bản bên trong file; cập nhật tham số schema của Glob sẽ giải quyết vấn đề.",
      "B. Glob thất bại vì nó chỉ khớp với tên đường dẫn file chứ không đọc nội dung bên trong file; agent nên sử dụng Grep với pattern: \"X-Legacy-Auth-Token\" và path: \"src/services/\".",
      "C. Glob thất bại do thiếu đuôi file; thiết lập pattern: \"src/services/**/*.ts\" kèm tham số truy vấn token: \"X-Legacy-Auth-Token\" sẽ bật chỉ mục văn bản sâu.",
      "D. Glob thất bại vì các chuỗi nội bộ yêu cầu quyền nâng cao; agent nên thực thi WebSearch để truy vấn chỉ mục tìm kiếm code GitHub nội bộ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Glob schema does not support content filtering parameters; it operates strictly on directory paths and filenames.",
      "Option B is correct: Glob matches file paths against wildcard patterns, whereas Grep searches for text string occurrences within file contents.",
      "Option C is incorrect: Adding token parameters to Glob is invalid because Glob cannot inspect or filter file contents regardless of file extension patterns.",
      "Option D is incorrect: WebSearch is intended for public web pages and cannot replace local code content inspection performed by Grep."
    ],
    "rationale": "Glob only searches file path patterns, while Grep searches text content inside files; searching for internal code tokens requires Grep.",
    "explanation": "Đáp án đúng là B. Tool Glob chỉ tìm kiếm dựa trên cấu trúc đường dẫn và tên file (path patterns). Vì chuỗi X-Legacy-Auth-Token nằm bên trong nội dung các file .ts chứ không nằm trong tên file, Glob trả về 0 kết quả. Tool đúng cần dùng để tìm văn bản bên trong file là Grep.\n- Phương án A sai vì Glob không có tham số contentFilter để đọc nội dung file.\n- Phương án C sai vì Glob không thể đọc nội dung file ngay cả khi thêm đuôi file hay tham số tùy chỉnh.\n- Phương án D sai vì WebSearch dùng cho dữ liệu web công khai, không phù hợp và không bảo mật để kiểm tra nội dung nguồn code nội bộ.",
    "sources": [
      {
        "label": "Lesson 2.5: Built-in Tools",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-5-built-in-tools"
      }
    ]
  }
]