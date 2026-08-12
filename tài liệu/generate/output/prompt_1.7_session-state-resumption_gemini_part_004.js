[
  {
    "id": "d1-b03-1.7-007",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-007",
    "scenarioSignature": {
      "testedPrinciple": "state externalization and context summary injection across multi-day sessions",
      "failureMode": "context window saturation and redundant API tool re-executions",
      "rootCause": "persisting raw conversation transcripts across separate task phases instead of externalizing structured state",
      "requiredFix": "externalize findings into structured storage and inject condensed state summary at session initialization"
    },
    "questionEN": "On Day 1, an autonomous refactoring agent running via anthropic.Client scanned 400 microservice databases to audit legacy VARCHAR(255) primary keys, executing 6 hours of tool calls and saving findings to a local state dictionary. On Day 2, the team starts a new session to generate target migration DDL scripts, but re-loading Day 1's turn-by-turn prompt transcript consumes 180,000 / 200,000 tokens of the context window. Which architecture pattern efficiently transfers Day 1 findings into Day 2 without context bloat or re-executing INSPECT_SCHEMA RPCs?",
    "question": "[d1-b03-1.7-007] Vào Ngày 1, một agent tái cấu trúc tự động chạy qua anthropic.Client đã quét 400 cơ sở dữ liệu microservice để kiểm tra khóa chính VARCHAR(255) cũ, tiêu tốn 6 giờ gọi tool và lưu phát hiện vào file dữ liệu cục bộ. Sang Ngày 2, đội ngũ khởi tạo session mới để sinh các kịch bản DDL migration, nhưng nếu nạp lại toàn bộ transcript đối thoại Ngày 1 thì chiếm tới 180.000 / 200.000 tokens context window. Mô hình kiến trúc nào truyền thông tin Ngày 1 sang session Ngày 2 hiệu quả nhất mà không gây tràn context hay phải chạy lại các lệnh INSPECT_SCHEMA RPCs?",
    "optionsEN": [
      "A. Re-load the complete raw turn-by-turn conversation transcript from Day 1 into Day 2's system context window to preserve exact diagnostic history.",
      "B. Execute fork_session on the final message of Day 1's thread to resume execution directly within the active multi-turn memory buffer.",
      "C. Externalize Day 1 audit findings into a structured state artifact (schema_audit_v1.json) and initialize Day 2's session by injecting a condensed state summary alongside current task goals.",
      "D. Configure Day 2's agent to automatically re-run all INSPECT_SCHEMA RPC calls using parallel batching to reconstruct the baseline state before DDL generation."
    ],
    "options": [
      "A. Tải toàn bộ conversation transcript thô dạng lượt-qua-lượt từ Ngày 1 vào context window của session Ngày 2 để giữ nguyên lịch sử chẩn đoán.",
      "B. Gọi hàm fork_session từ tin nhắn cuối cùng của thread Ngày 1 để tiếp tục thực thi trực tiếp trên memory buffer hiện tại.",
      "C. Externalize kết quả audit Ngày 1 thành artifact schema_audit_v1.json và khởi tạo session Ngày 2 bằng cách inject bản tóm tắt trạng thái tinh gọn kèm mục tiêu tác vụ vào prompt context.",
      "D. Cấu hình agent Ngày 2 tự động thực thi lại toàn bộ lệnh INSPECT_SCHEMA RPCs bằng parallel batching để dựng lại baseline trước khi sinh DDL."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because loading 180,000 tokens of raw turn-by-turn conversation transcripts quickly saturates the context window, leaving minimal headroom for Day 2 tool execution and causing high latency and attention dilution.",
      "Option B is incorrect because fork_session duplicates the existing conversation thread for divergent path exploration; it retains the bloated context history rather than providing a clean budget-friendly state transfer.",
      "Option C is correct because externalizing structured findings to a persistence artifact (schema_audit_v1.json) and injecting a condensed summary (< 2K tokens) at Day 2 session start preserves key discoveries without re-executing tools or flooding the context window.",
      "Option D is incorrect because re-executing all INSPECT_SCHEMA RPCs duplicates 6 hours of compute and tool budget unnecessarily when Day 1 findings are static and can be reused via external state."
    ],
    "rationale": "Persisting state in external artifacts and injecting a summarized key state baseline (< 2K tokens) into a fresh session prevents context window bloat while eliminating redundant API calls for multi-day workflows.",
    "explanation": "Phương án C là chính xác vì theo nguyên lý State Externalization & Injection, đối với các dự án kéo dài qua nhiều session, ta nên lưu trữ kết quả phân tích dưới dạng file/artifact cấu trúc (như schema_audit_v1.json). Khi khởi tạo session Ngày 2, chỉ cần inject tóm tắt thông số quan trọng (dưới 2.000 tokens) vào prompt context, giúp agent nắm bắt kết quả Ngày 1 mà không tiêu tốn context budget (180.000 tokens) hay phải chạy lại các API rà soát.\n\n- Phương án A sai vì nạp transcript thô 180K tokens gây nghẽn context window và giảm chất lượng suy luận do nhiễu.\n- Phương án B sai vì fork_session dùng cho việc rẽ nhánh thử nghiệm (divergent exploration), vẫn mang theo toàn bộ bộ nhớ thoại cồng kềnh từ Ngày 1.\n- Phương án D sai vì việc chạy lại toàn bộ tool INSPECT_SCHEMA làm lãng phí tài nguyên và thời gian API 6 tiếng không cần thiết.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  },
  {
    "id": "d1-b03-1.7-008",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-008",
    "scenarioSignature": {
      "testedPrinciple": "cross-developer session state handoff via structured external checkpoints",
      "failureMode": "environment-dependent session restoration failure and context saturation during team handoffs",
      "rootCause": "relying on machine-bound local session databases or raw terminal logs for inter-developer state transfer",
      "requiredFix": "externalize structured session checkpoints containing task state and git working tree snapshot"
    },
    "questionEN": "Developer Alice spends 4 hours using Claude Code CLI to diagnose a complex microservice race condition, completing 3 of 5 failing integration tests. At shift end, Alice needs to hand off the session to Developer Bob so Bob can resolve the remaining 2 tests on his workstation without repeating Alice's diagnostic steps or leaking local in-memory process paths. Which mechanism correctly implements session handoff between team members?",
    "question": "[d1-b03-1.7-008] Lập trình viên Alice dành 4 giờ dùng Claude Code CLI để sửa lỗi race condition và đã hoàn thành 3/5 integration test. Cuối ca làm việc, Alice cần bàn giao trạng thái cho Bob làm tiếp 2 test còn lại trên máy trạm của Bob mà không lặp lại các bước chẩn đoán hoặc chuyển giao bộ nhớ process nội bộ. Cơ chế nào triển khai đúng chuẩn bàn giao session (session handoff) giữa các thành viên?",
    "optionsEN": [
      "A. Copy Alice's local SQLite session database (~/.claude/history.db) to Bob's machine so Bob can resume directly via --resume-session-id.",
      "B. Instruct Bob to check out Alice's branch and run claude --fork-session connected remotely to Alice's active session UUID over SSH.",
      "C. Export Alice's raw terminal log history to a markdown file and require Bob to paste the entire 200-page log file into his prompt context on session start.",
      "D. Save Alice's agent state (passed test IDs, architectural findings, pending task backlog) into a version-controlled .agent_checkpoint.json file in git, allowing Bob to initialize a fresh CLI session that loads this checkpoint summary."
    ],
    "options": [
      "A. Sao chép file cơ sở dữ liệu SQLite cục bộ ~/.claude/history.db từ máy Alice sang máy Bob để Bob resume trực tiếp qua tham số --resume-session-id.",
      "B. Hướng dẫn Bob checkout branch của Alice và chạy claude --fork-session kết nối từ xa tới UUID session của Alice qua SSH.",
      "C. Xuất toàn bộ log terminal thô của Alice ra file markdown và yêu cầu Bob dán toàn bộ file log 200 trang vào prompt khi bắt đầu session.",
      "D. Lưu trạng thái agent của Alice (các test đã pass, quyết định kiến trúc, task backlog) vào file .agent_checkpoint.json trên git, giúp Bob khởi tạo session mới nạp checkpoint tóm tắt này."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because copying machine-bound SQLite session databases causes file path mismatches, environment leakage, and session ID collisions on another developer's environment.",
      "Option B is incorrect because fork-session is intended for local process branching on the same host and cannot properly reconcile cross-machine state or environment variations.",
      "Option C is incorrect because pasting raw terminal logs consumes tens of thousands of tokens with unformatted text and CLI formatting, blowing the context budget and introducing prompt noise.",
      "Option D is correct because externalizing key session state (completed milestones, pending tasks, decisions) into a version-controlled checkpoint file (.agent_checkpoint.json) enables clean cross-machine handoffs into a fresh context."
    ],
    "rationale": "Cross-developer handoff requires serializing agent decisions and pending tasks into a structured, environment-agnostic checkpoint artifact that can be loaded into a fresh session alongside git code state.",
    "explanation": "Phương án D là chính xác vì để bàn giao trạng thái agent giữa các lập trình viên (cross-developer session handoff), ta cần externalize thông tin (các milestone đã pass, quyết định thiết kế, các task còn lại) vào một file artifact chuẩn hóa như .agent_checkpoint.json được quản lý bởi Git. Bob chỉ cần khởi tạo một session mới trên máy của mình và inject file checkpoint này, giúp giữ context sạch, không bị phụ thuộc vào môi trường cục bộ.\n\n- Phương án A sai vì file DB history.db chứa đường dẫn tuyệt đối và ID tiến trình cục bộ trên máy Alice, gây lỗi khi chuyển sang máy Bob.\n- Phương án B sai vì fork-session dùng để rẽ nhánh tiến trình trên cùng một máy trạm, không thiết kế cho giao tiếp qua SSH/máy khác.\n- Phương án C sai vì dán 200 trang log thô làm tràn context window của Bob với dữ liệu không cần thiết và nhiễu định dạng CLI.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  }
]