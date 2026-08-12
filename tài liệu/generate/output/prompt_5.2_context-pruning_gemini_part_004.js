[
  {
    "id": "d5-b10-5.2-007",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-007",
    "scenarioSignature": {
      "testedPrinciple": "Exclusion of unresolved dependencies from context pruning",
      "failureMode": "Agent executes unauthorized action due to evicted gate",
      "rootCause": "Pruner treats pending approval status as prunable turn",
      "requiredFix": "Mark pending dependencies as immutable context nodes"
    },
    "questionEN": "An autonomous deployment agent managing a Kubernetes cluster is executing a multi-step database schema migration. In turn 4, the agent generated a execution plan requiring an explicit human approval flag (approval_status=\"PENDING_SECURITY_REVIEW\"). During context pruning at 80% context utilization, a naive heuristic pruned turn 4 as an older intermediate step. Lacking the pending gate in its active context, the agent assumed authorization was completed and executed kubectl apply -f prod-db-migration.yaml. Which context management rule prevents this unauthorized action?",
    "question": "[d5-b10-5.2-007] Một agent tự động triển khai hạ tầng trên Kubernetes đang thực thi quy trình nâng cấp cơ sở dữ liệu. Ở lượt 4, agent tạo kế hoạch yêu cầu duyệt từ con người (approval_status=\"PENDING_SECURITY_REVIEW\"). Khi dung lượng ngữ cảnh đạt 80%, bộ cắt tỉa (pruner) đã xóa lượt 4 do coi đó là bước trung gian cũ. Vì mất cờ phê duyệt trong ngữ cảnh, agent lầm tưởng đã được cho phép và tự động chạy kubectl apply -f prod-db-migration.yaml. Quy tắc quản lý ngữ cảnh nào giải quyết triệt để vấn đề này?",
    "optionsEN": [
      "A. Configure an automated retry loop with exponential backoff when API execution latency exceeds 2000 ms during token pruning.",
      "B. Apply lossy summarization to condense all conversation turns prior to turn 10 into a high-level text summary block.",
      "C. Mark pending dependency objects and unfulfilled approval gates as immutable context items that are excluded from pruning until resolved.",
      "D. Expand the context window budget from 32k to 128k tokens so that pruning is deferred until later stages of execution."
    ],
    "options": [
      "A. Cấu hình vòng lặp thử lại tự động với gia tăng thời gian chờ khi độ trễ API vượt quá 2000 ms trong quá trình cắt tỉa token.",
      "B. Áp dụng tóm tắt mất thông tin (lossy summarization) để nén toàn bộ các lượt trước lượt 10 thành một khối tóm tắt văn bản tổng quát.",
      "C. Đánh dấu các đối tượng phụ thuộc chưa giải quyết và cờ phê duyệt chưa hoàn tất là các mục ngữ cảnh bất biến không được phép xóa cho đến khi hoàn thành.",
      "D. Mở rộng ngân sách cửa sổ ngữ cảnh từ 32k lên 128k token để trì hoãn việc kích hoạt cắt tỉa ngữ cảnh sang các giai đoạn sau."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because retry backoffs address network latency and API timeouts, failing to protect unfulfilled approval flags from context eviction.",
      "Option B is incorrect because lossy summarization risks collapsing or omitting critical pending approval metadata during text condensation.",
      "Option C is correct because marking pending dependencies and security sign-off gates as immutable context nodes prevents the pruner from deleting unfulfilled constraints before authorization.",
      "Option D is incorrect because scaling the token limit only delays when pruning occurs without modifying the dangerous eviction policy that removes pending gates."
    ],
    "rationale": "Unresolved dependencies (such as pending human authorization or prerequisite step outputs) are non-negotiable state variables. Removing them from context creates execution hazards where the model assumes past steps succeeded or were waived.",
    "explanation": "Đáp án C đúng vì các phụ thuộc chưa giải quyết (như cờ phê duyệt từ con người) là ngữ cảnh bắt buộc không bao giờ được cắt tỉa cho đến khi hoàn tất. Đáp án A sai vì retry chỉ xử lý độ trễ mạng chứ không giữ cờ phê duyệt. Đáp án B sai vì nén tóm tắt văn bản vẫn có nguy cơ làm mất dữ liệu phê duyệt. Đáp án D sai vì tăng dung lượng cửa sổ chỉ trì hoãn thời điểm cắt tỉa chứ không sửa logic xóa cờ sai lầm.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  },
  {
    "id": "d5-b10-5.2-008",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.2 context-pruning / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.2-008",
    "scenarioSignature": {
      "testedPrinciple": "Context checkpointing before aggressive context pruning",
      "failureMode": "Irreversible loss of multi-hour analytical context",
      "rootCause": "Executing destructive pruning without saving checkpoint",
      "requiredFix": "Serialize context checkpoint snapshot prior to pruning"
    },
    "questionEN": "A log analytics agent runs a 3-hour audit pipeline on an AWS CloudWatch log stream using get_log_events(). To prevent context window exhaustion at 90% capacity, the system triggers an aggressive context pruning routine that purges raw log payloads and intermediate reasoning turns. Shortly after pruning, a downstream parsing exception occurs, requiring the agent to inspect the original log structures. Because no context checkpoint was written before pruning, the accumulated 3-hour analysis was irreversibly lost, requiring a full pipeline re-run. Which architecture prevents this loss?",
    "question": "[d5-b10-5.2-008] Một agent phân tích log chạy quy trình kiểm toán kéo dài 3 giờ trên AWS CloudWatch qua API get_log_events(). Để tránh tràn cửa sổ ngữ cảnh ở ngưỡng 90%, hệ thống kích hoạt quy trình cắt tỉa ngữ cảnh nâng cao (aggressive pruning) để xóa dữ liệu log thô và các lượt suy luận trung gian. Ngay sau khi cắt tỉa, một ngoại lệ phân tích dữ liệu xảy ra ở bước sau đòi hỏi agent phải xem lại cấu trúc log gốc. Do không ghi checkpoint ngữ cảnh trước khi cắt tỉa, toàn bộ 3 giờ phân tích bị mất vĩnh viễn và phải chạy lại từ đầu. Kiến trúc nào ngăn chặn tổn thất này?",
    "optionsEN": [
      "A. Strip JSON formatting whitespace and structural line breaks from all tool outputs before adding them to the context buffer.",
      "B. Configure a strict 5-turn sliding window memory that immediately deletes raw tool outputs as soon as they are processed.",
      "C. Replace context pruning entirely with an external vector database retrieval mechanism for log querying.",
      "D. Serialize and save a context checkpoint snapshot to persistent storage prior to executing aggressive pruning to enable state recovery."
    ],
    "options": [
      "A. Loại bỏ khoảng trắng định dạng JSON và ngắt dòng cấu trúc khỏi tất cả kết quả đầu ra của công cụ trước khi đưa vào bộ nhớ ngữ cảnh.",
      "B. Cấu hình bộ nhớ cửa sổ trượt 5 lượt nghiêm ngặt tự động xóa ngay kết quả thô của công cụ ngay sau khi chúng được xử lý.",
      "C. Thay thế hoàn toàn việc cắt tỉa ngữ cảnh bằng cơ chế truy xuất cơ sở dữ liệu vector bên ngoài để truy vấn nhật ký.",
      "D. Tuần tự hóa và lưu bản chụp (checkpoint) ngữ cảnh vào bộ lưu trữ vĩnh viễn trước khi cắt tỉa nâng cao để cho phép khôi phục trạng thái."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because stripping whitespace yields minimal token savings and does not enable state restoration when downstream processing fails.",
      "Option B is incorrect because immediately deleting tool outputs exacerbates context amnesia and breaks multi-step log auditing.",
      "Option C is incorrect because external vector databases store static documents, failing to capture or restore the agent's live runtime analytical session state.",
      "Option D is correct because writing a full context checkpoint to disk prior to aggressive pruning creates a recovery point, allowing the agent to roll back and restore state if downstream execution fails."
    ],
    "rationale": "Aggressive context pruning is a destructive operation. Saving a complete context checkpoint snapshot to disk before executing aggressive pruning provides a fallback recovery point, ensuring multi-hour analytical progress is not irreversibly lost if downstream errors occur.",
    "explanation": "Đáp án D đúng vì tạo và lưu checkpoint ngữ cảnh trước khi cắt tỉa nâng cao giúp tạo điểm khôi phục (recovery point), cho phép khôi phục lại toàn bộ trạng thái phân tích 3 giờ nếu bước tiếp theo gặp sự cố. Đáp án A sai vì xóa khoảng trắng chỉ tiết kiệm ít token và không giúp khôi phục trạng thái. Đáp án B sai vì xóa ngay kết quả công cụ sẽ gây mất ngữ cảnh nhanh hơn. Đáp án C sai vì cơ sở dữ liệu vector không thể lưu trữ hay khôi phục trạng thái phiên làm việc runtime của agent.",
    "sources": [
      {
        "label": "Lesson 5.2: Context Pruning",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-2-context-pruning"
      }
    ]
  }
]