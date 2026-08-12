[
  {
    "id": "d3-b07-new-007",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-007",
    "scenarioSignature": {
      "testedPrinciple": "tool whitelisting for read-only CI pipeline execution",
      "failureMode": "arbitrary command execution inside automated runner",
      "rootCause": "granting bash tool permission in headless automated mode",
      "requiredFix": "restrict allowed tools to non-destructive file inspection tools"
    },
    "questionEN": "A security audit pipeline in GitHub Actions runs Claude Code in headless mode to inspect pull request diffs for vulnerability patterns using claude -p \"Audit PR code changes\" --dangerously-skip-permissions --allowedTools bash. Security audits reveal that during automated reviews, Claude Code generated and executed unvetted shell commands (curl, rm -rf, npm install) inside the CI runner container. To enforce strict read-only file system inspection while blocking arbitrary shell command execution, how should the CLI configuration be updated?",
    "question": "[d3-b07-new-007] Một pipeline kiểm tra bảo mật trên GitHub Actions chạy Claude Code ở chế độ headless để kiểm tra diff của pull request nhằm tìm kiếm các lỗ hổng mã nguồn bằng lệnh claude -p \"Audit PR code changes\" --dangerously-skip-permissions --allowedTools bash. Cuộc kiểm toán an toàn thông tin phát hiện trong quá trình đánh giá tự động, Claude Code đã tự khởi tạo và thực thi các câu lệnh shell không được kiểm duyệt (curl, rm -rf, npm install) bên trong container của CI runner. Để áp dụng chính sách chỉ đọc mã nguồn và ngăn chặn hoàn toàn việc thực thi lệnh shell tùy ý, cấu hình CLI cần được cập nhật như thế nào?",
    "optionsEN": [
      "A. Replace --allowedTools bash with --allowedTools bash(read_file,grep) to constrain the shell wrapper sub-commands.",
      "B. Keep --allowedTools bash and pass --disallowedTools exec to block root shell execution privileges.",
      "C. Replace --allowedTools bash with --allowedTools read_file,grep to restrict tool access strictly to non-destructive inspection tools.",
      "D. Remove --allowedTools completely so Claude Code falls back to its default read-only interactive execution profile."
    ],
    "options": [
      "A. Thay thế --allowedTools bash bằng --allowedTools bash(read_file,grep) để giới hạn các câu lệnh con trong công cụ shell.",
      "B. Giữ nguyên --allowedTools bash và thêm --disallowedTools exec để chặn quyền thực thi shell cấp cao nhất.",
      "C. Thay thế --allowedTools bash bằng --allowedTools read_file,grep để chỉ cho phép các công cụ đọc và tìm kiếm tệp không gây rủi ro sửa đổi.",
      "D. Xóa bỏ hoàn toàn cờ --allowedTools để Claude Code tự động quay về cấu hình chỉ đọc mặc định ở chế độ tương tác."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because --allowedTools expects exact tool identifiers like read_file and grep, not sub-command filter syntax inside parenthetical function calls.",
      "Option B is incorrect because exec is not a valid tool name in Claude Code CLI, and granting bash permission overrides restrictive intent by opening full terminal access.",
      "Option C is correct because replacing bash with read_file,grep restricts Claude Code strictly to passive file reading and searching, eliminating shell command execution risks in CI.",
      "Option D is incorrect because removing --allowedTools leaves tool permissions unconstrained, allowing Claude Code to access all default tools including command execution in headless mode."
    ],
    "rationale": "Replacing --allowedTools bash with --allowedTools read_file,grep explicitly restricts Claude Code's capabilities to passive read-only operations, preventing it from spawning arbitrary terminal commands during CI analysis.",
    "explanation": "Lựa chọn C là đáp án đúng. Trong các môi trường CI/CD tự động, việc cấp quyền cho công cụ bash thông qua --allowedTools bash mở ra nguy cơ thực thi các câu lệnh shell tùy ý trên CI runner. Để đảm bảo tác vụ phân tích mã nguồn diễn ra an toàn chỉ ở chế độ đọc (read-only), cần loại bỏ bash và liệt kê chính xác các công cụ an toàn như --allowedTools read_file,grep.\n- Lựa chọn A sai vì --allowedTools không hỗ trợ cú pháp lọc lệnh con dạng bash(...).\n- Lựa chọn B sai vì exec không phải tên công cụ hợp lệ trong Claude Code và việc giữ bash vẫn cho phép chạy shell command.\n- Lựa chọn D sai vì khi bỏ --allowedTools kết hợp với --dangerously-skip-permissions, Claude Code sẽ được phép sử dụng toàn bộ các công cụ mặc định (bao gồm thực thi lệnh).",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  },
  {
    "id": "d3-b07-new-008",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.6 ci-cd-integration / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d3-b07-new-008",
    "scenarioSignature": {
      "testedPrinciple": "tool blacklisting impact on command execution capabilities",
      "failureMode": "automated test execution failure in CI runner",
      "rootCause": "blacklisting bash tool required for running test commands",
      "requiredFix": "grant targeted bash execution permissions instead of completely blacklisting bash"
    },
    "questionEN": "A CI pipeline in GitLab CI executes automated bug verification using Claude Code via claude -p \"Fix test failure and run npm test\" --dangerously-skip-permissions --disallowedTools bash. The DevOps team added --disallowedTools bash to enforce a strict security policy blocking terminal command execution. As a result, the pipeline job fails during the verification step with an error indicating that Claude Code cannot execute npm test or evaluate candidate bug fixes. Why does this configuration fail to achieve automated test verification?",
    "question": "[d3-b07-new-008] Một pipeline CI trên GitLab CI thực hiện việc kiểm tra và sửa lỗi tự động bằng lệnh claude -p \"Fix test failure and run npm test\" --dangerously-skip-permissions --disallowedTools bash. Nhóm DevOps đã thêm --disallowedTools bash để áp dụng chính sách bảo mật nghiêm ngặt nhằm ngăn chặn việc thực thi lệnh trên terminal. Kết quả là công việc trong pipeline bị thất bại ở bước xác minh với lỗi thông báo rằng Claude Code không thể thực thi npm test hoặc kiểm tra các bản sửa lỗi. Tại sao cấu hình này lại thất bại trong việc đạt được mục tiêu xác minh kiểm thử tự động?",
    "optionsEN": [
      "A. --disallowedTools bash overrides --dangerously-skip-permissions, causing Claude Code to hang indefinitely waiting for interactive prompt approval.",
      "B. Claude Code requires --allowedTools test_runner to execute test suites when --disallowedTools bash is active.",
      "C. --disallowedTools only accepts file manipulation tools like write_file, making the CLI argument invalid and crashing early.",
      "D. --disallowedTools bash completely disables shell invocation, preventing Claude Code from running npm test or any CLI commands necessary for test verification."
    ],
    "options": [
      "A. Cờ --disallowedTools bash ghi đè --dangerously-skip-permissions, khiến Claude Code dừng hoạt động vô thời hạn để chờ xác nhận từ người dùng.",
      "B. Claude Code yêu cầu cờ --allowedTools test_runner để chạy bộ kiểm thử khi --disallowedTools bash đang bật.",
      "C. Cờ --disallowedTools chỉ chấp nhận các công cụ thao tác tệp như write_file, khiến tham số CLI không hợp lệ và gây sập ngay từ đầu.",
      "D. Cờ --disallowedTools bash vô hiệu hóa hoàn toàn khả năng gọi shell, ngăn Claude Code chạy npm test hoặc bất kỳ lệnh CLI nào cần thiết cho việc xác minh."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because --dangerously-skip-permissions continues to suppress prompts, but the command fails because the requested tool capability is blacklisted.",
      "Option B is incorrect because Claude Code does not possess a native test_runner tool; running external tools like npm test depends entirely on bash access.",
      "Option C is incorrect because --disallowedTools validly accepts bash as a parameter; the syntax is valid but functionally over-restrictive for test automation tasks.",
      "Option D is correct because blacklisting bash completely removes Claude Code's ability to invoke terminal commands, making automated test suite execution via npm test impossible."
    ],
    "rationale": "Blacklisting bash via --disallowedTools bash removes the fundamental capability Claude Code needs to run terminal commands such as npm test, causing the verification workflow in CI to fail.",
    "explanation": "Lựa chọn D là đáp án đúng. Trong Claude Code, việc thực thi các câu lệnh terminal như npm test, pytest, hoặc các công cụ dòng lệnh khác phụ thuộc hoàn toàn vào công cụ bash. Khi đặt --disallowedTools bash, Claude Code bị vô hiệu hóa hoàn toàn khả năng gọi lệnh shell, khiến nó không thể chạy test runner để xác minh mã nguồn trong pipeline CI.\n- Lựa chọn A sai vì --dangerously-skip-permissions vẫn hoạt động để bỏ qua prompt, lỗi xảy ra do thiếu công cụ chứ không phải do treo chờ phản hồi.\n- Lựa chọn B sai vì Claude Code không có công cụ tích hợp tên là test_runner; mọi tác vụ chạy test đều phải thông qua bash.\n- Lựa chọn C sai vì --disallowedTools nhận bất kỳ tên công cụ hợp lệ nào (bao gồm cả bash), câu lệnh CLI hợp lệ về mặt cú pháp nhưng bị quá nghiêm ngặt về mặt chức năng.",
    "sources": [
      {
        "label": "Lesson 3.6: CI/CD Integration",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-6-ci-cd-integration"
      }
    ]
  }
]