[
  {
    "id": "d5-b10-5.3-005",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-005",
    "scenarioSignature": {
      "testedPrinciple": "partial execution reporting during human escalation",
      "failureMode": "redundant restart of completed pipeline steps",
      "rootCause": "escalation payload missing completed step state",
      "requiredFix": "include completed step execution metadata in escalation payload"
    },
    "questionEN": "An automated data migration agent on data-pipeline-v2 runs a 10-step sync process. At step 6 (executing SQL schema update ALTER TABLE orders ADD COLUMN legacy_id INT), it triggers a database lock timeout yielding error SQLSTATE 40001. The agent escalates to an on-call engineer via PagerDuty with the alert payload payload: { error: 'SQLSTATE 40001', status: 'escalated' }. Because the payload lacks completed_steps: [1, 2, 3, 4, 5], the engineer assumes total pipeline failure, manually rolls back, and restarts execution from step 1, discarding 45 minutes of completed table partitioning. Which payload modification resolves this issue?",
    "question": "[d5-b10-5.3-005] Một agent dịch chuyển dữ liệu tự động trên data-pipeline-v2 chạy quy trình đồng bộ 10 bước. Tại bước 6 (khi chạy câu lệnh SQL cập nhật schema ALTER TABLE orders ADD COLUMN legacy_id INT), agent gặp lỗi quá hạn khóa cơ sở dữ liệu SQLSTATE 40001. Agent leo thang đến kĩ sư trực ca qua PagerDuty với payload cảnh báo payload: { error: 'SQLSTATE 40001', status: 'escalated' }. Do payload thiếu trường completed_steps: [1, 2, 3, 4, 5], kĩ sư giả định toàn bộ pipeline bị thất bại, thực hiện rollback thủ công và khởi chạy lại từ bước 1, lãng phí 45 phút phân vùng dữ liệu đã hoàn thành. Sửa đổi payload nào giải quyết triệt để vấn đề này?",
    "optionsEN": [
      "A. Include a completed_steps array detailing completed step IDs, execution outputs, and state checkpoints in the escalation payload so the engineer can resume execution from step 6.",
      "B. Automatically retry the database query at step 6 with an increased timeout value in system prompt parameters without triggering PagerDuty.",
      "C. Append an unstructured text log entry stating that steps 1 through 5 passed before delegating full control back to the migration agent.",
      "D. Configure the agent to skip step 6 upon encountering SQLSTATE 40001 and proceed directly to step 7 while logging the deadlock error."
    ],
    "options": [
      "A. Bổ sung mảng completed_steps chi tiết danh sách ID các bước đã hoàn thành, output tương ứng và checkpoint trạng thái vào payload leo thang để kĩ sư có thể tiếp tục thực thi từ bước 6.",
      "B. Tự động thử lại truy vấn cơ sở dữ liệu tại bước 6 với giá trị thời gian chờ lớn hơn trong tham số system prompt mà không phát cảnh báo PagerDuty.",
      "C. Ghi thêm một dòng log văn bản không cấu trúc chỉ ra các bước từ 1 đến 5 đã thành công trước khi chuyển giao lại toàn bộ quyền điều khiển cho agent.",
      "D. Cấu hình agent bỏ qua bước 6 khi gặp lỗi SQLSTATE 40001 và chuyển trực tiếp sang bước 7 đồng thời ghi lại lỗi deadlock vào log."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because incorporating structured metadata of completed steps (completed_steps, output artifacts, and state checkpoints) in the escalation payload gives human operators the exact execution context needed to resume work from the failure point (step 6) rather than restarting from scratch.",
      "Option B is incorrect because increasing timeout parameters in the prompt does not fix payload deficiency when an escalation is triggered, nor does it guarantee deadlock resolution.",
      "Option C is incorrect because appending unstructured text to system logs does not populate the structured alert payload received by the engineer, leaving the human-in-the-loop without actionable resume state.",
      "Option D is incorrect because skipping a failed database schema migration compromises database structure and data integrity, failing to resolve the escalation payload requirement."
    ],
    "rationale": "When an agent escalates a partially completed task to a human operator, providing a structured payload containing completed steps and state checkpoints enables the operator to verify previous work and safely resume execution from the point of failure without repeating work.",
    "explanation": "Lựa chọn A đúng vì nguyên tắc leo thang khi xử lý công việc dở dang (partial completion reporting) yêu cầu payload cảnh báo phải chứa đầy đủ trạng thái các bước đã thực thi thành công (completed_steps, output, checkpoint). Điều này giúp kĩ sư vận hành biết chính xác tiến độ và tiếp tục chạy từ bước 6 thay vì phải chạy lại từ đầu.\nLựa chọn B sai vì việc tự thay đổi timeout trong prompt không giải quyết việc thiếu thông tin trong payload khi đã phát tín hiệu leo thang.\nLựa chọn C sai vì ghi log thô không cấu trúc vào hệ thống nội bộ không giúp ích cho kĩ sư nhận cảnh báo PagerDuty dạng JSON có cấu trúc.\nLựa chọn D sai vì tự ý bỏ qua bước cập nhật schema sẽ làm hỏng tính toàn vẹn của cơ sở dữ liệu ở các bước sau.",
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  },
  {
    "id": "d5-b10-5.3-006",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-006",
    "scenarioSignature": {
      "testedPrinciple": "human confirmation checkpoint for destructive actions",
      "failureMode": "unintended permanent deletion of active data",
      "rootCause": "execution of irreversible bulk operation without human approval guardrail",
      "requiredFix": "insert human approval checkpoint before destructive API invocation"
    },
    "questionEN": "An automated data maintenance agent running on cloud-storage-service evaluates inactive customer archives. Based on an erroneous downstream metadata classification sync, the agent proceeds to call DELETE /v1/storage/buckets/user-data/batch, permanently deleting 12,000 active customer storage buckets without requesting human verification. Which design change prevents this irreversible data loss?",
    "question": "[d5-b10-5.3-006] Một agent bảo trì dữ liệu tự động chạy trên cloud-storage-service đánh giá các bản lưu trữ khách hàng không hoạt động. Dựa trên bản đồng bộ phân loại metadata bị lỗi ở hạ nguồn, agent tiến hành gọi API DELETE /v1/storage/buckets/user-data/batch, xóa vĩnh viễn 12.000 bucket lưu trữ của khách hàng đang hoạt động mà không yêu cầu xác nhận từ con người. Thay đổi thiết kế nào ngăn chặn được sự mất mát dữ liệu không thể đảo ngược này?",
    "optionsEN": [
      "A. Lower the retention threshold parameter in storage_policy.json so that inactive archives are deleted in smaller, continuous daily batches.",
      "B. Enforce a human-in-the-loop confirmation checkpoint that pauses execution and emits an explicit approval request containing target bucket IDs before calling DELETE /v1/storage/buckets/user-data/batch.",
      "C. Increase the context window limit of the agent to retain raw access logs prior to executing bulk deletion commands.",
      "D. Wrap the deletion API call inside an exponential backoff retry block to catch transient HTTP 500 error responses during execution."
    ],
    "options": [
      "A. Giảm tham số ngưỡng thời gian lưu trữ trong storage_policy.json để các bản lưu trữ không hoạt động bị xóa theo các đợt nhỏ hơn hàng ngày.",
      "B. Bắt buộc một điểm kiểm tra xác nhận từ con người (human-in-the-loop) để tạm dừng thực thi và gửi yêu cầu phê duyệt chứa danh sách ID bucket trước khi gọi DELETE /v1/storage/buckets/user-data/batch.",
      "C. Tăng giới hạn cửa sổ ngữ cảnh của agent để giữ lại log truy cập thô trước khi thực thi các lệnh xóa hàng loạt.",
      "D. Bọc lời gọi API xóa trong một khối thử lại tăng theo cấp số nhân (exponential backoff) để bắt các phản hồi lỗi HTTP 500 chốc lát."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because deleting records in smaller daily batches still executes irreversible bulk deletions automatically without human verification when upstream metadata errors occur.",
      "Option B is correct because establishing a human-in-the-loop approval checkpoint before executing irreversible destructive operations (such as bulk bucket deletion) forces the agent to pause execution and require explicit human validation.",
      "Option C is incorrect because increasing context window length does not prevent the agent from autonomously invoking high-risk API endpoints based on flawed input data.",
      "Option D is incorrect because retry logic only ensures network request completion and does not add authorization guardrails prior to executing irreversible actions."
    ],
    "rationale": "Irreversible and destructive actions (such as bulk deletes or public broadcasts) must require explicit human-in-the-loop approval checkpoints where the agent pauses execution and submits an approval payload before proceeding.",
    "explanation": "Lựa chọn B đúng vì đối với các thao tác không thể đảo ngược và có tính phá hủy cao (như xóa hàng loạt dữ liệu), hệ thống bắt buộc phải thiết lập điểm kiểm tra con người (human-in-the-loop confirmation checkpoint). Agent phải tạm dừng và phát payload yêu cầu phê duyệt để con người xác nhận danh sách đối tượng bị xóa trước khi thực thi lệnh API.\nLựa chọn A sai vì việc chia nhỏ đợt xóa vẫn thực hiện tự động và không ngăn được việc xóa nhầm dữ liệu khi metadata bị lỗi.\nLựa chọn C sai vì tăng kích thước cửa sổ ngữ cảnh không ngăn chặn được hành vi tự động gọi API phá hủy của agent.\nLựa chọn D sai vì cơ chế retry chỉ giúp xử lý lỗi mạng, không tạo ra rào cản phê duyệt cho các hành động nguy hiểm.",
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  }
]