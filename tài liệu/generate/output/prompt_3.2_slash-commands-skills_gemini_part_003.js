[
  {
    "id": "d3-b06-3.2-005",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-005",
    "scenarioSignature": {
      "testedPrinciple": "slash command file discovery during interactive cli session initialization",
      "failureMode": "unrecognized custom slash command error during active session execution",
      "rootCause": "custom slash command definitions loaded into session memory at startup without mid-session hot reloading",
      "requiredFix": "restart the interactive cli session after pulling updated project command files"
    },
    "questionEN": "A software team working on order-service commits a new team slash command file at .claude/commands/deploy-staging.md to their shared Git repository. Developer A runs git pull in their shell while maintaining an active interactive Claude Code CLI session. Developer B opens a brand new terminal window and starts a new Claude Code CLI session after the pull. When Developer A attempts to run /deploy-staging in their existing session, Claude Code returns a 'Command /deploy-staging not recognized' error, whereas Developer B's invocation succeeds. Why does Developer A encounter this error, and who needs to restart their session?",
    "question": "[d3-b06-3.2-005] Một đội ngũ phát triển làm việc trên dịch vụ order-service vừa commit một file slash command nhóm mới tại vị trí .claude/commands/deploy-staging.md vào kho chứa Git chung. Lập trình viên A thực hiện lệnh git pull trên terminal trong khi đang mở một phiên làm việc interactive Claude Code CLI active. Lập trình viên B mở một cửa sổ terminal mới và khởi tạo một phiên Claude Code CLI mới sau khi pull code. Khi Lập trình viên A thử thực thi lệnh /deploy-staging trong phiên làm việc hiện tại, Claude Code trả về lỗi 'Command /deploy-staging not recognized', trong khi Lập trình viên B thực thi thành công. Tại sao Lập trình viên A gặp lỗi này, và ai cần phải khởi động lại phiên làm việc?",
    "optionsEN": [
      "A. Developer A must restart their active Claude Code CLI session because project slash commands in .claude/commands/ are indexed into session memory at startup and are not dynamically hot-reloaded mid-session.",
      "B. Developer A must execute /clear inside their session to refresh the project's slash command directory index without restarting the process.",
      "C. Developer B must restart their session because project slash commands committed to Git require explicit global registration in ~/.claude/commands/ before team use.",
      "D. Both developers must restart their sessions because project slash commands are cached in system environment variables that only refresh upon system reboot."
    ],
    "options": [
      "A. Lập trình viên A phải khởi động lại phiên Claude Code CLI active của mình vì các slash command dự án trong .claude/commands/ được nạp vào bộ nhớ phiên làm việc khi khởi chạy và không tự động hot-reload giữa phiên.",
      "B. Lập trình viên A phải thực thi lệnh /clear trong phiên làm việc để làm mới chỉ mục thư mục slash command của dự án mà không cần khởi động lại tiến trình.",
      "C. Lập trình viên B phải khởi động lại phiên làm việc vì các slash command dự án được commit lên Git yêu cầu đăng ký toàn cục thủ công tại ~/.claude/commands/ trước khi nhóm sử dụng.",
      "D. Cả hai lập trình viên đều phải khởi động lại phiên làm việc vì slash command của dự án được lưu đệm trong biến môi trường hệ thống chỉ làm mới khi khởi động lại máy."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Claude Code scans and loads custom slash commands from project directories like .claude/commands/ during CLI session startup. Active sessions running prior to a git pull do not dynamically detect newly added command files, requiring the developer with the active session to exit and restart the session.",
      "Option B is incorrect: /clear only resets conversation history context within the LLM memory buffer; it does not trigger a disk rescan or reload custom slash command definitions from .claude/commands/.",
      "Option C is incorrect: Project-level commands placed in .claude/commands/ are automatically available to all team members upon pulling the repo without requiring global setup in ~/.claude/commands/, and Developer B's new session already loaded it successfully.",
      "Option D is incorrect: Slash commands are file-based configuration artifacts managed directly by Claude Code per workspace session, not system environment variables requiring an OS reboot."
    ],
    "rationale": "Custom project slash commands located in .claude/commands/ are discovered and loaded into memory when a Claude Code CLI session initializes. If new command files are pulled from Git during an active session, that session remains unaware of the new commands until restarted. Therefore, Developer A must restart their active session to load /deploy-staging.",
    "explanation": "Lựa chọn A là đáp án đúng.\n\nTrong Claude Code, các custom slash command cấp dự án được lưu tại .claude/commands/ (hoặc .agents/commands/) chỉ được quét và nạp vào bộ nhớ tiến trình khi phiên làm việc interactive CLI khởi tạo. Khi đồng đội commit câu lệnh mới và Lập trình viên A thực hiện git pull trong khi phiên CLI đang chạy, phiên đó không tự động hot-reload các file lệnh mới từ đĩa. Do đó, Lập trình viên A cần thoát và mở lại phiên CLI (exit sau đó gõ claude) để phiên mới đọc được câu lệnh /deploy-staging.\n\nPhân tích các lựa chọn sai:\n- Lựa chọn B sai vì lệnh /clear chỉ xóa bộ nhớ đệm hội thoại (conversation context window) chứ không thực hiện quét lại các file lệnh trên ổ đĩa.\n- Lựa chọn C sai vì câu lệnh dự án nằm trong .claude/commands/ là file dùng chung của nhóm được theo dõi bởi Git, không đòi hỏi đăng ký thủ công vào thư mục cá nhân ~/.claude/commands/.\n- Lựa chọn D sai vì slash command không phải là biến môi trường hệ điều hành và không yêu cầu khởi động lại máy tính.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  },
  {
    "id": "d3-b06-3.2-006",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.2 slash-commands-skills / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-3.2-006",
    "scenarioSignature": {
      "testedPrinciple": "conversation context buffer resetting versus project configuration retention across session commands",
      "failureMode": "misunderstanding state retention and rule enforcement after executing clear command",
      "rootCause": "clear command purging conversation turn history while keeping project configuration files active in memory",
      "requiredFix": "use clear command to reset token context buffer while relying on session restart to re-read updated configuration files"
    },
    "questionEN": "During an extended refactoring session on auth-service, a lead developer runs the /clear command in Claude Code to eliminate context window token bloat. Following the execution of /clear, the developer notices that Claude Code continues to enforce code formatting constraints specified in the project's root CLAUDE.md and retains custom slash commands loaded from .claude/commands/. How does executing /clear differ technically from ending the session (exiting the CLI process)?",
    "question": "[d3-b06-3.2-006] Trong một phiên refactor kéo dài trên dịch vụ auth-service, một lập trình viên chính thực thi lệnh /clear trong Claude Code để giải phóng dung lượng bộ nhớ context window. Sau khi chạy /clear, lập trình viên nhận thấy Claude Code vẫn tiếp tục tuân thủ các quy tắc định dạng mã nguồn trong file CLAUDE.md ở gốc dự án và duy trì các slash command tùy chỉnh nạp từ .claude/commands/. Về mặt kỹ thuật, việc thực thi lệnh /clear khác biệt như thế nào so với việc kết thúc phiên làm việc (thoát tiến trình CLI)?",
    "optionsEN": [
      "A. /clear purges all loaded project configuration files (CLAUDE.md and skills) while preserving conversation message history, whereas ending the session clears conversation history while persisting project rules.",
      "B. /clear resets only the active conversation message history buffer while keeping project context like CLAUDE.md loaded in memory, whereas ending the session terminates the process and unloads all session state.",
      "C. /clear forces an immediate re-fetch of git remote repository configuration, whereas ending the session resets local workspace permissions.",
      "D. /clear archives the session history to .claudeignore and deletes project slash commands, whereas ending the session preserves custom commands across future sessions."
    ],
    "options": [
      "A. /clear dọn sạch tất cả các file cấu hình dự án đã nạp (CLAUDE.md và skill) nhưng giữ lại lịch sử tin nhắn hội thoại, trong khi kết thúc phiên xóa lịch sử hội thoại nhưng duy trì quy tắc dự án.",
      "B. /clear chỉ đặt lại bộ đệm lịch sử tin nhắn hội thoại active trong khi vẫn duy trì ngữ cảnh dự án như CLAUDE.md trong bộ nhớ, trong khi kết thúc phiên sẽ chấm dứt tiến trình và giải phóng toàn bộ trạng thái phiên.",
      "C. /clear buộc tải lại cấu hình kho chứa Git từ xa ngay lập tức, trong khi kết thúc phiên làm việc sẽ đặt lại quyền truy cập workspace cục bộ.",
      "D. /clear lưu trữ lịch sử phiên làm việc vào .claudeignore và xóa các slash command của dự án, trong khi kết thúc phiên làm việc bảo tồn các command tùy chỉnh cho các phiên tương lai."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: /clear does the exact opposite—it purges conversation message turns while retaining project rules from CLAUDE.md and custom slash commands in memory.",
      "Option B is correct: /clear empties the active conversation history context to free token space without terminating the CLI session or unloading project-level configurations like CLAUDE.md and .claude/commands/. Terminating the session completely kills the process and unloads memory state.",
      "Option C is incorrect: /clear operates entirely within the local CLI context window management; it does not communicate with Git remotes or modify local filesystem permissions.",
      "Option D is incorrect: /clear does not modify .claudeignore or delete slash command files on disk."
    ],
    "rationale": "The /clear command in Claude Code is specifically designed to reset the in-memory conversation history context window, enabling developers to start a fresh prompt conversation without token overhead. However, because the CLI process remains alive, project-level configurations such as CLAUDE.md rules and loaded custom slash commands remain active. Ending the session terminates the process entirely.",
    "explanation": "Lựa chọn B là đáp án đúng.\n\nTrong Claude Code, lệnh /clear có chức năng giải phóng bộ đệm ngữ cảnh (conversation context window) bằng cách xóa toàn bộ lịch sử các lượt hội thoại trước đó nhằm tiết kiệm token và tránh làm nhiễu mô hình. Tuy nhiên, do tiến trình CLI vẫn đang chạy, tất cả các cấu hình dự án như quy tắc trong CLAUDE.md, quy định kiểm thử, và các slash command/skill đã nạp vào bộ nhớ từ .claude/commands/ vẫn được duy trì nguyên vẹn.\nNgược lại, việc kết thúc phiên làm việc (exit) sẽ chấm dứt toàn bộ tiến trình CLI và giải phóng trạng thái bộ nhớ. Khi khởi chạy phiên mới, Claude Code sẽ quét và nạp lại từ đầu tất cả cấu hình từ đĩa.\n\nPhân tích các lựa chọn sai:\n- Lựa chọn A phát biểu ngược hoàn toàn với cơ chế thực tế của /clear.\n- Lựa chọn C đưa ra thông tin sai về việc tương tác với Git remote hay quyền truy cập tập tin.\n- Lựa chọn D đưa ra các giả thiết vô lý như ghi lịch sử vào file .claudeignore hay xóa file command.",
    "sources": [
      {
        "label": "Lesson 3.2: Slash Commands and Skills",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-2-slash-commands-skills"
      }
    ]
  }
]