[
  {
    "id": "d5-b10-5.3-003",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-003",
    "questionEN": "An IT management agent receives an executive request via Slack: \"Deactivate account for John Smith.\" The backend API GET /api/v1/users?name=John+Smith returns two active accounts (user_id: 1042 in Sales and user_id: 8891 in Engineering). Instead of asking the requesting user which account to target, the agent immediately logs a P2 support ticket in Jira for human IT admins. Why is this escalation workflow flawed, and how should it be modified?",
    "question": "[d5-b10-5.3-003] Một agent quản trị IT nhận được yêu cầu từ lãnh đạo qua Slack: \"Deactivate account for John Smith.\" API backend GET /api/v1/users?name=John+Smith trả về hai tài khoản đang hoạt động (user_id: 1042 thuộc Sales và user_id: 8891 thuộc Engineering). Thay vì hỏi người dùng đưa ra yêu cầu xem cần chọn tài khoản nào, agent lập tức tạo một ticket P2 trên Jira cho đội IT admin xử lý thủ công. Tại sao quy trình leo thang này bị lỗi và nên được sửa như thế nào?",
    "optionsEN": [
      "A. Increase LLM sampling temperature to force a deterministic single entity selection from Postgres.",
      "B. Automatically select the account with the older created_at timestamp to eliminate workflow delay.",
      "C. Prompt the requesting user with a single targeted clarifying question containing candidate metadata before escalating to human support.",
      "D. Perform regex matching on user email addresses and automatically process deactivation if a unique sub-domain is matched."
    ],
    "options": [
      "A. Tăng sampling temperature của LLM để ép mô hình chọn ra một bản ghi duy nhất từ Postgres.",
      "B. Tự động chọn tài khoản có mốc thời gian created_at cũ hơn để loại bỏ độ trễ của quy trình.",
      "C. Hỏi người dùng đang tương tác một câu làm rõ có mục tiêu kèm metadata của các ứng viên trước khi chuyển giao cho con người.",
      "D. Thực hiện khớp regex trên địa chỉ email người dùng và tự động vô hiệu hóa nếu tìm thấy sub-domain duy nhất."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A incorrect: Increasing sampling temperature introduces generation randomness and does not resolve database ambiguity or user intent.",
      "Option B incorrect: Automatically picking the older account risks deactivating the wrong user without confirmation, causing severe access disruptions.",
      "Option C correct: Agents should attempt one targeted clarifying question to resolve solvable ambiguity with the user before creating human support tickets.",
      "Option D incorrect: Heuristic regex matching on email suffixes makes unsafe assumptions about user intent rather than requesting explicit clarification."
    ],
    "rationale": "Solvable ambiguity should be resolved by asking the user a single targeted clarifying question before escalating to human operators. Escalating immediately for easily resolvable entity ambiguity causes unnecessary human ticket fatigue and workflow latency.",
    "explanation": "Đáp án đúng là C. Khi gặp mơ hồ có thể tự giải quyết (solvable ambiguity) như trùng tên hai tài khoản user_id: 1042 và user_id: 8891, nguyên tắc thiết kế escalation paths quy định agent phải thử hỏi 1 câu làm rõ kèm metadata (phòng ban, email) tới người dùng trước khi chuyển giao (escalate) cho con người. Điều này tránh gây lãng phí nguồn lực hỗ trợ thủ công.\\n\\nLý do các lựa chọn khác sai:\\n- Option A sai: Tăng temperature làm tăng tính ngẫu nhiên của mô hình, không giúp giải quyết sự trùng lặp bản ghi dưới database.\\n- Option B sai: Tự động chọn bản ghi cũ hơn là hành vi đoán mò nguy hiểm, có thể vô hiệu hóa nhầm tài khoản của nhân viên khác.\\n- Option D sai: Khớp regex email không đảm bảo đúng ý định người dùng và vẫn vi phạm nguyên tắc kiểm chứng thông tin trước khi thực thi.",
    "scenarioSignature": {
      "testedPrinciple": "resolving solvable ambiguity via direct user clarification before human escalation",
      "failureMode": "unnecessary escalation to human support for easily resolvable entity ambiguity",
      "rootCause": "agent routes entity disambiguation directly to human ticket queue without asking user",
      "requiredFix": "ask one targeted clarifying question to active user before invoking human escalation"
    },
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  },
  {
    "id": "d5-b10-5.3-004",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-004",
    "scenarioSignature": {
      "testedPrinciple": "timeout handling and safe default fallback in human in the loop workflows",
      "failureMode": "agent process blocks pipeline execution indefinitely while awaiting human approval",
      "rootCause": "missing timeout handler for asynchronous human approval state in workflow engine",
      "requiredFix": "implement workflow timeout handler to trigger safe default fallback or abort action"
    },
    "questionEN": "A database maintenance agent triggers a human-in-the-loop approval step before executing DROP TABLE legacy_user_archive. The agent dispatches an interactive approval request via Slack Webhook, transitioning the workflow task state to WAITING_HUMAN_APPROVAL. However, the designated approver is offline. Because no timeout handler is configured, the worker process blocks execution for 4 hours, halting downstream deployment pipelines. How should the architecture be corrected?",
    "question": "[d5-b10-5.3-004] Một agent bảo trì cơ sở dữ liệu kích hoạt bước phê duyệt con người (human-in-the-loop) trước khi chạy lệnh DROP TABLE legacy_user_archive. Agent gửi yêu cầu phê duyệt qua Slack Webhook và chuyển trạng thái công việc sang WAITING_HUMAN_APPROVAL. Tuy nhiên, người phê duyệt đang offline. Do không cấu hình bộ xử lý timeout, worker process bị nghẽn trong 4 giờ, làm dừng toàn bộ pipeline triển khai phía sau. Kiến trúc này nên được khắc phục như thế nào?",
    "optionsEN": [
      "A. Extend the HTTP request connection timeout on the Slack Webhook client to 24 hours.",
      "B. Configure a fall-through policy that automatically executes DROP TABLE if no approval is received within 15 minutes.",
      "C. Implement an infinite retry loop that re-sends the Slack approval notification every 60 seconds.",
      "D. Define a workflow timeout handler that automatically rolls back the task to a safe cancelled state after a set period."
    ],
    "options": [
      "A. Mở rộng HTTP connection timeout trên Slack Webhook client lên 24 giờ.",
      "B. Cấu hình quy tắc mặc định tự động chạy lệnh DROP TABLE nếu không nhận được phản hồi sau 15 phút.",
      "C. Triển khai một vòng lặp retry vô hạn để gửi lại thông báo phê duyệt trên Slack mỗi 60 giây.",
      "D. Định nghĩa một timeout handler cho workflow để tự động hủy công việc và đưa về trạng thái an toàn sau một khoảng thời gian."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A incorrect: Extending HTTP connection timeout keeps the underlying network socket open but does not handle workflow logic timeouts when humans are absent.",
      "Option B incorrect: Executing a destructive, irreversible database operation (DROP TABLE) as a default timeout fallback creates critical data loss risks.",
      "Option C incorrect: Continuous notification polling floods communication channels and causes alert fatigue while failing to unblock stalled execution processes.",
      "Option D correct: Human-in-the-loop checkpoints must feature dedicated timeout handlers that fallback to non-destructive safe defaults (e.g., abort task and alert admin) when approvals expire."
    ],
    "rationale": "When human approval is required, workflows must implement explicit timeout handling. If a human fails to respond within the designated window, the system must trigger a non-destructive safe default action (such as aborting or cancelling the task) rather than blocking execution indefinitely or executing high-risk destructive actions.",
    "explanation": "Đáp án đúng là D. Trong các điểm kiểm soát human-in-the-loop, nếu con người không phản hồi trong thời gian quy định, hệ thống phải có timeout handler để chuyển sang hành động mặc định an toàn (safe default), chẳng hạn như tự động hủy (cancel/abort) công việc và gửi cảnh báo, thay vì treo tiến trình vô hạn.\n\nLý do các lựa chọn khác sai:\n- Option A sai: Việc tăng HTTP connection timeout chỉ giữ kết nối mạng mà không giải quyết logic workflow bị tắc nghẽn do người phê duyệt vắng mặt.\n- Option B sai: Tự động thực thi hành động phá hủy (DROP TABLE) khi hết giờ là vi phạm nghiêm trọng quy tắc an toàn (không bao giờ chọn worst-case/destructive action làm mặc định).\n- Option C sai: Gửi lại thông báo liên tục gây ra tình trạng kiệt sức vì cảnh báo (alert fatigue) và vẫn làm nghẽn tài nguyên của CI/CD pipeline.",
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  }
]