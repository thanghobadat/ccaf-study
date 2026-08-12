[
  {
    "id": "d3-b07-B-009",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-009",
    "scenarioSignature": {
      "testedPrinciple": "persisting headless code review outputs as CI pipeline artifacts for compliance auditing",
      "failureMode": "inability to retrieve historical code review reports during regulatory compliance audit",
      "rootCause": "executing code review CLI step without uploading stdout or report files to workflow artifact storage",
      "requiredFix": "pipe review output to file and register upload-artifact action in pipeline definition"
    },
    "questionEN": "A DevOps team configures a GitHub Actions workflow running claude -p \"Audit PR for security vulnerabilities\" > audit_report.txt during pull request builds. During a compliance audit, auditors request proof of automated security reviews performed on merged pull requests over the past quarter. However, the team discovers that none of the review reports are accessible because job console logs expired and no file artifacts were persisted. Which modification to the workflow job step correctly preserves the review evidence for compliance audit retention?",
    "question": "[d3-b07-B-009] Một đội ngũ DevOps cấu hình quy trình GitHub Actions chạy claude -p \"Audit PR for security vulnerabilities\" > audit_report.txt trong các đợt build pull request. Trong đợt kiểm toán tuân thủ, kiểm toán viên yêu cầu bằng chứng về các bản đánh giá bảo mật tự động đã thực hiện trên các PR đã merge trong quý trước. Tuy nhiên, đội ngũ phát hiện ra không thể truy cập bất kỳ báo cáo kiểm toán nào vì console log của job đã hết hạn và không có artifact nào được lưu trữ. Thay đổi nào đối với quy trình công việc sẽ bảo lưu chính xác bằng chứng đánh giá cho mục đích lưu trữ kiểm toán?",
    "optionsEN": [
      "A. Add actions/upload-artifact@v4 after the review step to upload audit_report.txt with appropriate retention policies.",
      "B. Pass --output-format json without redirecting output so review results are written exclusively to standard output.",
      "C. Rely on default GitHub Actions job log retention without configuring workflow artifact storage actions.",
      "D. Append --dangerously-skip-permissions to the Claude CLI command so audit findings bypass repository file permissions."
    ],
    "options": [
      "A. Thêm step actions/upload-artifact@v4 ngay sau step đánh giá để tải lên audit_report.txt với chính sách lưu trữ phù hợp.",
      "B. Truyền cờ --output-format json mà không điều hướng đầu ra để kết quả đánh giá chỉ ghi trực tiếp ra console log.",
      "C. Phụ thuộc vào thời gian lưu trữ log mặc định của GitHub Actions mà không cấu hình các action lưu trữ artifact.",
      "D. Thêm --dangerously-skip-permissions vào câu lệnh Claude CLI để phát hiện kiểm toán bỏ qua quyền truy cập file của repository."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because saving audit_report.txt and configuring actions/upload-artifact@v4 ensures review artifacts are persisted independently of job console logs for compliance retention.",
      "Option B is incorrect because outputting JSON to standard console logs still leaves the evidence subject to console log expiration and does not store a dedicated artifact.",
      "Option C is incorrect because standard job execution logs are ephemeral and automatically purged according to retention limits, failing audit requirements.",
      "Option D is incorrect because --dangerously-skip-permissions bypasses interactive prompt confirmations in headless mode and does not handle artifact storage or file retention."
    ],
    "rationale": "Configuring an artifact upload action (such as actions/upload-artifact) to store the generated review report file ensures that evidence of security audits is preserved for compliance verification independently of transient console logs.",
    "explanation": "Đáp án A đúng vì việc xuất kết quả ra audit_report.txt và sử dụng actions/upload-artifact@v4 đảm bảo báo cáo đánh giá được lưu trữ dài hạn độc lập với console log của CI/CD.\nĐáp án B sai vì việc in JSON ra console log vẫn khiến dữ liệu bị xóa khi log hết hạn, không tạo ra file artifact lưu trữ bền vững.\nĐáp án C sai vì log mặc định của job CI/CD mang tính tạm thời và sẽ bị xóa tự động theo chính sách lưu trữ log, không đáp ứng yêu cầu kiểm toán.\nĐáp án D sai vì cờ --dangerously-skip-permissions dùng để bỏ qua các câu hỏi xác nhận quyền trong môi trường không tương tác, không giải quyết việc lưu trữ báo cáo.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-B-010",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-B-010",
    "scenarioSignature": {
      "testedPrinciple": "context passing in reusable CI/CD workflows for custom workspace rules",
      "failureMode": "headless review process ignoring repository-specific coding guidelines in centralized workflow",
      "rootCause": "reusable workflow executing CLI commands outside repository checkout context without loading calling repository CLAUDE.md",
      "requiredFix": "checkout calling repository code and pass local project configuration context to headless review CLI"
    },
    "questionEN": "An enterprise platform team maintains a centralized reusable GitHub Actions workflow shared across multiple microservice repositories to run automated Claude Code reviews. Developers notice that while individual microservices define project-specific coding standards in their root CLAUDE.md, the centralized workflow executes Claude using default system instructions and ignores all repository-specific rules. Investigation shows the reusable workflow checks out its own repository rather than the caller's repository. How should the pipeline configuration be modified so Claude respects each microservice's CLAUDE.md?",
    "question": "[d3-b07-B-010] Đội ngũ nền tảng doanh nghiệp duy trì một reusable workflow tập trung trong GitHub Actions được chia sẻ cho nhiều repository microservice để chạy đánh giá tự động bằng Claude Code. Các nhà phát triển nhận thấy dù mỗi microservice có quy chuẩn mã nguồn riêng trong file CLAUDE.md ở thư mục gốc, workflow tập trung vẫn thực thi Claude bằng hướng dẫn mặc định và bỏ qua toàn bộ quy tắc riêng của dự án. Kiểm tra cho thấy reusable workflow đang checkout repository của chính nó thay vì repository gọi workflow. Cần điều chỉnh cấu hình pipeline như thế nào để Claude tuân thủ file CLAUDE.md của từng microservice?",
    "optionsEN": [
      "A. Hardcode the root CLAUDE.md content of one microservice into the centralized reusable workflow repository.",
      "B. Configure actions/checkout in the reusable workflow to check out the calling repository's workspace before invoking claude -p.",
      "C. Pass --dangerously-skip-permissions to claude -p so Claude bypasses local file system permission checks for CLAUDE.md.",
      "D. Change the prompt argument in claude -p to explicitly state 'Ignore local CLAUDE.md files in working directory'."
    ],
    "options": [
      "A. Ghi cứng nội dung CLAUDE.md của một microservice vào repository chứa reusable workflow tập trung.",
      "B. Cấu hình actions/checkout trong reusable workflow để checkout mã nguồn của repository gọi workflow trước khi thực thi claude -p.",
      "C. Truyền --dangerously-skip-permissions vào claude -p để Claude bỏ qua kiểm tra quyền truy cập hệ thống file đối với CLAUDE.md.",
      "D. Sửa câu lệnh trong claude -p thành 'Bỏ qua các file CLAUDE.md cục bộ trong thư mục làm việc'."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because hardcoding one microservice's rules into the shared workflow applies incorrect constraints to all other microservices.",
      "Option B is correct because checking out the calling repository ensures claude -p executes in a workspace containing the caller's local CLAUDE.md configuration file.",
      "Option C is incorrect because --dangerously-skip-permissions skips tool execution approval prompts in headless execution, not file configuration resolution.",
      "Option D is incorrect because instructing Claude to ignore CLAUDE.md produces the exact opposite of the desired behavior, enforcing default prompts instead."
    ],
    "rationale": "Claude Code automatically reads CLAUDE.md from the root of the current working directory. In reusable CI workflows, checking out the calling repository ensures that the working directory contains the caller's specific CLAUDE.md rules.",
    "explanation": "Đáp án A sai vì việc ghi cứng quy tắc của một dịch vụ vào workflow chung sẽ áp dụng sai quy chuẩn cho các microservice còn lại.\nĐáp án B đúng vì việc checkout repository gọi workflow giúp claude -p chạy trong thư mục làm việc chứa file CLAUDE.md của chính microservice đó, cho phép đọc cấu hình dự án.\nĐáp án C sai vì cờ --dangerously-skip-permissions dùng để tự động chấp nhận quyền thực thi công cụ trong CI/CD, không liên quan đến việc nạp cấu hình CLAUDE.md.\nĐáp án D sai vì việc yêu cầu bỏ qua CLAUDE.md sẽ khiến Claude tiếp tục làm việc theo mặc định thay vì áp dụng quy tắc riêng của dự án.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]