[
  {
    "id": "d1-b03-1.7-005",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-005",
    "scenarioSignature": {
      "testedPrinciple": "external state drift mitigation",
      "failureMode": "agent returns outdated customer pricing after database update",
      "rootCause": "agent relies on cached query results from previous session state",
      "requiredFix": "query database directly for current pricing during session initialization"
    },
    "questionEN": "A retail support agent using PostgreSQL caches customer tier pricing (customer_tier_rates) during session startup. While the session is idle, an admin updates customer_tier_rates in the database to decrease enterprise rates by 15%. Upon resuming the session, the agent quotes the old price to a customer because it reads from its cached context. What is the root cause and recommended architecture fix for this state drift issue?",
    "question": "[d1-b03-1.7-005] Một agent hỗ trợ bán hàng sử dụng PostgreSQL lưu tạm bảng giá phân hạng khách hàng (customer_tier_rates) khi khởi tạo phiên làm việc. Trong khi phiên làm việc tạm dừng, quản trị viên cập nhật bảng customer_tier_rates trong cơ sở dữ liệu để giảm 15% giá cho khách hàng doanh nghiệp. Khi khôi phục phiên, agent báo giá cũ cho khách hàng do đọc từ ngữ cảnh đã được cache. Nguyên nhân gốc rễ và giải pháp kiến trúc khắc phục hiện tượng trôi trạng thái (state drift) này là gì?",
    "optionsEN": [
      "A. The agent relies on stale cached query results stored in session context; the system should execute a fresh database query or re-read updated records upon session resumption rather than reusing historical context.",
      "B. The session context window exceeded token limits; the system should expand the context window to prevent dropping the database update event.",
      "C. The agent failed to execute fork_session before quoting; calling fork_session creates a separate branch that automatically synchronizes with external databases.",
      "D. The tool definition lacks write permissions; grant UPDATE privileges on customer_tier_rates to allow the agent to modify external database records dynamically."
    ],
    "options": [
      "A. Agent phụ thuộc vào kết quả truy vấn cũ lưu trong ngữ cảnh phiên; hệ thống nên thực thi truy vấn cơ sở dữ liệu mới hoặc đọc lại bản ghi đã cập nhật khi khôi phục phiên thay vì tái sử dụng ngữ cảnh lịch sử.",
      "B. Cửa sổ ngữ cảnh của phiên làm việc vượt quá giới hạn token; hệ thống nên mở rộng cửa sổ ngữ cảnh để tránh bỏ lỡ sự kiện cập nhật cơ sở dữ liệu.",
      "C. Agent không thực thi lệnh fork_session trước khi báo giá; việc gọi fork_session tạo một nhánh riêng biệt tự động đồng bộ với cơ sở dữ liệu bên ngoài.",
      "D. Định nghĩa tool thiếu quyền ghi; cấp quyền UPDATE trên bảng customer_tier_rates để cho phép agent sửa đổi bản ghi cơ sở dữ liệu bên ngoài một cách linh hoạt."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: External state drift occurs when data in PostgreSQL changes outside the session context while the agent relies on stale cached tool results. Re-querying live DB state or refreshing context fixes this.",
      "Option B is incorrect: Expanding the context window does not sync external database updates into an idle agent's session memory.",
      "Option C is incorrect: fork_session is used for divergent exploration from a baseline, not for synchronizing external database state drift.",
      "Option D is incorrect: Granting UPDATE privileges does not address context staleness or force the agent to read current database values."
    ],
    "rationale": "Relying on cached tool results from a prior session state when external databases change leads to state drift. The correct architecture forces a fresh query or targeted re-read of external data upon session resumption.",
    "explanation": "Khi cơ sở dữ liệu bên ngoài (PostgreSQL) thay đổi trong lúc phiên làm việc của agent đang dừng, việc agent tiếp tục sử dụng kết quả truy vấn đã cache trong ngữ cảnh sẽ dẫn đến trôi trạng thái (state drift). Giải pháp kiến trúc đúng là thực thi truy vấn mới hoặc đọc lại dữ liệu đã cập nhật khi khôi phục phiên. Phương án B sai vì mở rộng context window không cập nhật được dữ liệu ngoại vi. Phương án C sai vì fork_session dùng để thử nghiệm các hướng đi khác nhau từ cùng điểm xuất phát, không giúp đồng bộ DB. Phương án D sai vì quyền UPDATE không giải quyết được việc đọc dữ liệu cũ.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  },
  {
    "id": "d1-b03-1.7-006",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-006",
    "scenarioSignature": {
      "testedPrinciple": "idempotent agent step execution",
      "failureMode": "agent workflow crashes on task resumption when retrying file creation",
      "rootCause": "tool execution throws unhandled error when target resource already exists",
      "requiredFix": "design tool handling to safely inspect existence and skip or overwrite idempotently"
    },
    "questionEN": "A multi-step deployment agent crashes at Step 4 due to a network timeout after creating /var/log/deploy_manifest.json. Upon session resumption, the workflow engine re-executes Step 3 (Create Manifest File). The file creation tool throws an FileExistsError: /var/log/deploy_manifest.json already exists exception, causing the resumed session to fail immediately. How should the agent tool and resumption architecture be redesigned to ensure safe execution?",
    "question": "[d1-b03-1.7-006] Một agent triển khai hệ thống đa bước gặp sự cố rớt mạng ở Bước 4 sau khi đã tạo file /var/log/deploy_manifest.json. Khi khôi phục phiên làm việc, workflow engine thực thi lại Bước 3 (Tạo file Manifest). Tool tạo file ném ra ngoại lệ FileExistsError: /var/log/deploy_manifest.json already exists, làm phiên khôi phục bị sập ngay lập tức. Tool của agent và kiến trúc khôi phục nên được thiết kế lại như thế nào để đảm bảo thực thi an toàn?",
    "optionsEN": [
      "A. Delete /var/log/deploy_manifest.json using a pre-execution hook before every tool invocation regardless of the target file path.",
      "B. Implement idempotent tool design by checking if /var/log/deploy_manifest.json exists and either skipping creation or updating the file safely without raising an unhandled exception.",
      "C. Call fork_session at Step 3 so the new session branch ignores file creation errors from the parent session.",
      "D. Suppress all exceptions globally across the execution engine so the agent ignores all tool failure codes during resumption."
    ],
    "options": [
      "A. Xóa tập tin /var/log/deploy_manifest.json bằng PreToolUse hook trước mỗi lần gọi tool bất kể đường dẫn file đích.",
      "B. Áp dụng thiết kế tool mang tính idempotency bằng cách kiểm tra sự tồn tại của /var/log/deploy_manifest.json và bỏ qua bước tạo hoặc cập nhật an toàn mà không ném ra ngoại lệ không được xử lý.",
      "C. Gọi fork_session tại Bước 3 để nhánh phiên mới bỏ qua các lỗi tạo file từ phiên cha.",
      "D. Bỏ qua toàn bộ exception trên toàn bộ execution engine để agent lờ đi mọi mã lỗi của tool trong quá trình khôi phục."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Unconditionally deleting files before tool execution can destroy valid data created in previous steps.",
      "Option B is correct: Idempotent tool design ensures re-executing steps during session resumption check state and safely skip or handle pre-existing resources without crashing.",
      "Option C is incorrect: fork_session creates divergent branches for exploration; it does not resolve unhandled file existence exceptions in tool execution.",
      "Option D is incorrect: Suppressing all exceptions globally hides critical failure modes and risks silent data corruption."
    ],
    "rationale": "Designing agent tools to be idempotent allows session resumption to re-execute steps safely without crashing when encountering resources already created prior to failure.",
    "explanation": "Thiết kế mang tính idempotency (tính đẳng tạo) đảm bảo rằng khi một phiên làm việc được khôi phục và thực thi lại một bước (như tạo file), tool sẽ kiểm tra tài nguyên đã tồn tại hay chưa để bỏ qua hoặc xử lý an toàn mà không gây ra crash. Phương án A sai vì việc chủ động xóa file vô điều kiện có thể làm mất dữ liệu hợp lệ. Phương án C sai vì fork_session dùng cho việc rẽ nhánh thử nghiệm các phương án khác nhau. Phương án D sai vì nuốt toàn bộ ngoại lệ toàn cục sẽ che giấu các lỗi nghiêm trọng khác.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  }
]