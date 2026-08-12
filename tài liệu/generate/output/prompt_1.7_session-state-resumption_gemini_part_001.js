[
  {
    "id": "d1-b03-1.7-001",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-001",
    "scenarioSignature": {
      "testedPrinciple": "external state drift validation on session resumption",
      "failureMode": "agent resuming execution with stale database schema context causing runtime errors",
      "rootCause": "agent relies on cached schema state across session restarts without validating schema updates",
      "requiredFix": "validate database schema version against checkpoint before executing queries in resumed session"
    },
    "questionEN": "An ETL data migration agent processes a 50,000-record migration from legacy_users to users_v2 in PostgreSQL. At batch 20/100, an external DevOps DDL script alters users_v2 by renaming column phone_num to contact_phone. The agent process crashes due to a transient network timeout at batch 25 and resumes execution from its saved session state context. Because the session context contains stale cached schema metadata from information_schema.columns retrieved before batch 1, the resumed agent attempts to insert data using phone_num, producing UndefinedColumn errors on batch 26. Which architectural modification best prevents this state drift failure upon session resumption?",
    "question": "[d1-b03-1.7-001] Một agent chuyển đổi dữ liệu ETL đang xử lý di chuyển 50.000 bản ghi từ legacy_users sang users_v2 trong PostgreSQL. Tại batch 20/100, một kịch bản DDL DevOps bên ngoài đã thay đổi bảng users_v2 bằng cách đổi tên cột phone_num thành contact_phone. Tiến trình agent bị gián đoạn do lỗi mạng tạm thời ở batch 25 và khôi phục thực thi từ ngữ cảnh trạng thái phiên (session state) đã lưu. Do ngữ cảnh phiên chứa bộ nhớ đệm thông tin lược đồ bị lỗi thời lấy từ information_schema.columns trước batch 1, agent sau khi khôi phục tiếp tục chèn dữ liệu bằng cột phone_num, gây ra lỗi UndefinedColumn ở batch 26. Giải pháp kiến trúc nào giải quyết tốt nhất sự cố lệch trạng thái (state drift) này khi khôi phục phiên?",
    "optionsEN": [
      "A. Implement a session resumption hook that validates the current database schema migration version against the session checkpoint state before issuing batch queries.",
      "B. Call fork_session upon network recovery to branch the existing in-memory conversation context into duplicate parallel worker sessions.",
      "C. Configure the agent context budget to retain all raw historical SQL query results from previous batches across session restarts.",
      "D. Wrap database insertion tools with an automated fallback that silently ignores missing column exceptions and retries with default values."
    ],
    "options": [
      "A. Triển khai hook khôi phục phiên (session resumption hook) để kiểm tra phiên bản lược đồ cơ sở dữ liệu hiện tại so với trạng thái checkpoint của phiên trước khi phát lệnh truy vấn batch.",
      "B. Gọi fork_session ngay khi phục hồi kết nối mạng để phân nhánh ngữ cảnh hội thoại hiện tại thành các phiên làm việc song song.",
      "C. Cấu hình ngân sách ngữ cảnh (context budget) của agent để giữ lại toàn bộ kết quả truy vấn SQL lịch sử từ các batch trước qua các lần khởi động lại phiên.",
      "D. Bao bọc các công cụ chèn dữ liệu bằng cơ chế tự động bỏ qua ngoại lệ thiếu cột và thử lại với giá trị mặc định."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Validating the database schema version against the session checkpoint before re-executing tool calls detects external schema modifications and prevents the agent from running queries based on stale metadata.",
      "Option B is incorrect: fork_session duplicates the existing session history, including the stale cached schema metadata, leading to identical UndefinedColumn errors in spawned sessions.",
      "Option C is incorrect: Retaining raw query logs increases token consumption without verifying whether the external database schema changed during session interruption.",
      "Option D is incorrect: Silently swallowing column exceptions masks structural data migration failures and risks writing corrupt or incomplete data."
    ],
    "rationale": "External state drift occurs when persistent resources change while an agent is offline or paused. Validating schema versioning against checkpoint state during session resumption ensures the agent invalidates stale cached schema metadata before generating new batch insertion queries.",
    "explanation": "Giải thích chi tiết:\n- Đáp án A đúng: Việc sử dụng hook khôi phục phiên để đối chiếu phiên bản lược đồ thực tế của cơ sở dữ liệu với trạng thái checkpoint giúp phát hiện sự lệch trạng thái (state drift) do các lệnh DDL bên ngoài gây ra, từ đó cập nhật lại thông tin lược đồ trước khi thực thi truy vấn.\n- Đáp án B sai: fork_session tạo ra một nhánh mới kế thừa toàn bộ bộ nhớ hội thoại cũ, do đó vẫn giữ nguyên dữ liệu lược đồ bị lỗi thời và tiếp tục gặp lỗi UndefinedColumn.\n- Đáp án C sai: Giữ lại toàn bộ nhật ký truy vấn SQL làm tăng chi phí token mà không giải quyết được việc kiểm tra trạng thái thực tế của cơ sở dữ liệu bên ngoài.\n- Đáp án D sai: Tự động bỏ qua lỗi thiếu cột khiến tiến trình ghi dữ liệu bị sai lệch hoặc mất mát dữ liệu mà không khắc phục được nguyên nhân gốc rễ.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  },
  {
    "id": "d1-b03-1.7-002",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.7 session-state-resumption / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.7-002",
    "scenarioSignature": {
      "testedPrinciple": "fork_session semantics vs stale context reset",
      "failureMode": "agent providing invalid recommendations after fork_session due to inherited stale tool outputs",
      "rootCause": "misunderstanding fork_session as context clearing tool rather than divergent exploration tool",
      "requiredFix": "initialize fresh session with injected summary and targeted re-read of modified files"
    },
    "questionEN": "A backend engineer maintains an automated code refactoring agent. During a session analyzing a 40-file repository, a developer manually modifies src/auth.py and src/config.py in the workspace while the agent is paused. To address stale tool outputs cached in the agent's context, the engineer invokes fork_session to spawn a new branch from the paused session. However, the agent continues generating code recommendations based on obsolete auth.py function signatures. Why did fork_session fail to resolve this stale context issue, and what is the correct architecture?",
    "question": "[d1-b03-1.7-002] Một kỹ sư phần mềm vận hành một agent tái cấu trúc mã nguồn tự động. Trong một phiên phân tích kho mã 40 tệp, nhà phát triển đã chỉnh sửa thủ công src/auth.py và src/config.py trong không gian làm việc khi agent đang tạm dừng. Để xử lý các kết quả công cụ bị lỗi thời được lưu trong ngữ cảnh của agent, kỹ sư đã gọi fork_session để tạo một nhánh mới từ phiên tạm dừng. Tuy nhiên, agent vẫn tiếp tục tạo các đề xuất mã dựa trên chữ ký hàm cũ của auth.py. Tại sao fork_session không giải quyết được vấn đề ngữ cảnh lỗi thời này, và kiến trúc đúng là gì?",
    "optionsEN": [
      "A. fork_session requires increasing the context window token limit to force re-evaluation; the correct approach is allocating a 200K context window to fit full file contents.",
      "B. fork_session duplicates the exact context history including stale tool outputs; the correct approach is starting a fresh session, injecting a summary of findings, and performing targeted re-reads.",
      "C. fork_session is intended only for checkpointing database migrations; the correct approach is executing re-read on all 40 repository files within the existing session.",
      "D. fork_session purges tool call history entirely; the correct approach is resuming the original session and running an automated git diff check after every step."
    ],
    "options": [
      "A. fork_session yêu cầu tăng giới hạn token của cửa sổ ngữ cảnh để ép buộc đánh giá lại; giải pháp đúng là cấp cửa sổ ngữ cảnh 200K token để chứa toàn bộ nội dung tệp.",
      "B. fork_session sao chép toàn bộ lịch sử ngữ cảnh bao gồm các kết quả công cụ bị lỗi thời; giải pháp đúng là khởi tạo một phiên mới hoàn toàn, nạp tóm tắt các phát hiện trước đó và chỉ đọc lại các tệp đã thay đổi.",
      "C. fork_session chỉ phục vụ việc lưu checkpoint cho quá trình di chuyển cơ sở dữ liệu; giải pháp đúng là thực thi đọc lại toàn bộ 40 tệp trong phiên hiện tại.",
      "D. fork_session xóa sạch lịch sử gọi công cụ; giải pháp đúng là tiếp tục phiên ban đầu và chạy kiểm tra git diff tự động sau mỗi bước."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Expanding the context window size does not clear the stale tool execution results inherited by fork_session and leads to excessive token costs.",
      "Option B is correct: fork_session clones the conversation context verbatim for divergent decision branching; to handle stale state caused by external file edits, an agent must launch a fresh session, inject a high-level summary of prior analysis, and target re-reads to modified files.",
      "Option C is incorrect: Re-reading all 40 files in the existing session wastes context budget and leaves obsolete tool outputs in the prompt history.",
      "Option D is incorrect: fork_session does not purge tool history; retaining the original session retains stale cached observations regardless of git diff triggers."
    ],
    "rationale": "fork_session is designed for divergent path exploration from a common baseline, not for clearing stale context. When local files change while an agent is paused, the optimal strategy is opening a clean session, injecting a concise context summary (< 2K tokens), and explicitly re-reading only the affected files.",
    "explanation": "Giải thích chi tiết:\n- Đáp án A sai: Việc tăng kích thước cửa sổ ngữ cảnh không làm sạch các kết quả công cụ cũ bị lỗi thời mà fork_session đã sao chép sang.\n- Đáp án B đúng: fork_session được thiết kế để phân nhánh thử nghiệm các hướng tiếp cận khác nhau từ cùng một mốc lịch sử, nên nó giữ nguyên lịch sử ngữ cảnh chứa các dữ liệu tệp cũ. Khi tệp bị thay đổi bên ngoài, kiến trúc đúng là tạo phiên mới (fresh session), nạp tóm tắt thông tin đã phân tích và đọc lại có định hướng các tệp đã sửa (auth.py và config.py).\n- Đáp án C sai: Việc đọc lại toàn bộ 40 tệp trong phiên cũ gây lãng phí lượng lớn token và vẫn giữ lại rác dữ liệu từ các lượt gọi công cụ trước.\n- Đáp án D sai: fork_session không xóa lịch sử gọi công cụ; duy trì phiên cũ sẽ tiếp tục kéo theo các kết quả công cụ lỗi thời.",
    "sources": [
      {
        "label": "Lesson 1.7: Session State and Resumption",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-7-session-state-resumption"
      }
    ]
  }
]