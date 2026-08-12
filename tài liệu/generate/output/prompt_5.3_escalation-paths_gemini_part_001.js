[
  {
    "id": "d5-b10-5.3-001",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-001",
    "scenarioSignature": {
      "testedPrinciple": "complete structured escalation payload design",
      "failureMode": "operator resolution blocked by missing contextual metadata",
      "rootCause": "escalation payload schema omits unique entity identifiers",
      "requiredFix": "enforce structured schema with entity id failure reason and resolution"
    },
    "questionEN": "An automated order reconciliation workflow using OrderReconcilerService triggers human escalation via OpsDeskWebhook whenever settlement validation fails. On escalation, human operators receive a notification containing failure_reason: \"discrepancy detected\" and attempted_action: \"settle_invoice\". However, operators report they cannot investigate or act on tickets without re-querying backend databases because the payload omits customer_account_id and transaction_ref. Which architectural change directly resolves this operational bottleneck?",
    "question": "[d5-b10-5.3-001] Quy trình đối soát đơn hàng tự động sử dụng OrderReconcilerService kích hoạt leo thang thủ công qua OpsDeskWebhook mỗi khi xác thực thanh toán thất bại. Khi leo thang, nhân viên vận hành nhận được thông báo chứa failure_reason: \"discrepancy detected\" và attempted_action: \"settle_invoice\". Tuy nhiên, nhân viên báo cáo họ không thể điều tra hoặc xử lý ticket nếu không truy vấn lại cơ sở dữ liệu backend vì payload thiếu customer_account_id và transaction_ref. Thay đổi kiến trúc nào giải quyết trực tiếp điểm nghẽn vận hành này?",
    "optionsEN": [
      "A. Enforce a structured escalation payload schema containing entity_id, attempted_action, failure_reason, and recommended_resolution so tickets are self-contained.",
      "B. Configure the workflow to automatically retry settlement three times before escalating, reducing total ticket volume.",
      "C. Pass the full raw database query log in the ticket body to avoid schema constraints.",
      "D. Implement an auto-approval override if the settlement discrepancy amount is below a fixed threshold."
    ],
    "options": [
      "A. Bắt buộc áp dụng schema payload leo thang có cấu trúc chứa entity_id, attempted_action, failure_reason và recommended_resolution để ticket tự chứa đủ ngữ cảnh.",
      "B. Cấu hình quy trình tự động thử lại thanh toán ba lần trước khi leo thang nhằm giảm tổng số lượng ticket.",
      "C. Truyền toàn bộ nhật ký truy vấn cơ sở dữ liệu thô vào nội dung ticket để tránh ràng buộc schema.",
      "D. Triển khai cơ chế tự động phê duyệt nếu số tiền chênh lệch thanh toán nằm dưới một ngưỡng cố định."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Enforcing a structured payload schema requiring entity identifiers (customer_account_id), state context, failure reason, and recommended actions ensures operators receive self-contained tickets, eliminating manual database re-queries.",
      "Option B is incorrect: Retrying settlement may handle transient failures, but it does not fix incomplete payloads for tickets that still escalate.",
      "Option C is incorrect: Sending raw query logs creates unparsed noise and cognitive fatigue rather than providing a clean, structured entity-based payload.",
      "Option D is incorrect: Auto-approving small discrepancies changes the escalation threshold policy but fails to address missing entity metadata when an escalation actually occurs."
    ],
    "rationale": "An effective escalation payload must be self-contained and structured, providing operators with the specific entity ID, failure reason, attempted action, and recommended resolution needed to take immediate action without manual data gathering.",
    "explanation": "Lựa chọn A là đáp án đúng vì việc đưa các trường định danh thực thể (customer_account_id), trạng thái tác vụ, lý do thất bại và giải pháp khuyến nghị vào schema payload leo thang có cấu trúc sẽ giúp nhân viên có đầy đủ thông tin để xử lý ngay mà không cần truy vấn lại hệ thống.\nLựa chọn B không đúng vì việc tự động thử lại chỉ giải quyết các lỗi tạm thời, không khắc phục được việc thiếu thông tin khi sự cố thực sự leo thang.\nLựa chọn C không đúng vì đẩy toàn bộ log SQL thô gây ra hiện tượng nhiễu thông tin thay vì cung cấp các trường dữ liệu có cấu trúc cần thiết.\nLựa chọn D không đúng vì việc tự động phê duyệt chênh lệch nhỏ chỉ thay đổi ngưỡng leo thang chứ không sửa được payload thiếu dữ liệu thực thể.",
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  },
  {
    "id": "d5-b10-5.3-002",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-002",
    "scenarioSignature": {
      "testedPrinciple": "escalation alert deduplication and aggregation",
      "failureMode": "alert storm causing human fatigue and ignored notifications",
      "rootCause": "absence of failure fingerprinting and suppression windows",
      "requiredFix": "aggregate identical failure signatures and log counts while firing single alert"
    },
    "questionEN": "During an infrastructure outage where SupportAgentService experiences ConnectionTimeoutException against its primary Redis cache, the escalation engine fires a high-priority PagerDuty incident for every failed user request. This produces 47 redundant escalation alerts within 5 minutes, causing severe alert fatigue and leading on-call engineers to ignore a subsequent real payment failure alert. Which architectural mechanism prevents this alert storm while preserving incident visibility?",
    "question": "[d5-b10-5.3-002] Trong một sự cố hạ tầng nơi SupportAgentService gặp lỗi ConnectionTimeoutException kết nối tới Redis cache chính, engine leo thang phát một sự cố PagerDuty ưu tiên cao cho mọi yêu cầu người dùng bị thất bại. Điều này tạo ra 47 cảnh báo leo thang trùng lặp trong 5 phút, gây ra tình trạng mệt mỏi vì cảnh báo (alert fatigue) và khiến kỹ sư trực ca bỏ qua cảnh báo lỗi thanh toán thực sự diễn ra ngay sau đó. Cơ chế kiến trúc nào ngăn chặn trận bão cảnh báo này mà vẫn đảm bảo tính hiển thị của sự cố?",
    "optionsEN": [
      "A. Escalate incident severity from HIGH to CRITICAL in PagerDuty so notification chimes continuously bypass engineer do-not-disturb settings.",
      "B. Implement failure fingerprint deduplication with a suppression window that logs recurrent failure counts while emitting only a single alert.",
      "C. Disable human escalation entirely when downstream component error rates exceed a preset percentage threshold.",
      "D. Buffer all escalation payloads into a low-priority queue that digests and emails notifications once every 24 hours."
    ],
    "options": [
      "A. Tăng mức độ nghiêm trọng của sự cố từ HIGH lên CRITICAL trong PagerDuty để tiếng chuông thông báo liên tục vượt qua chế độ không làm phiền của kỹ sư.",
      "B. Triển khai cơ chế khử trùng lặp theo vân tay lỗi (failure fingerprint) với cửa sổ ẩn cảnh báo (suppression window), ghi nhận số lần lặp lại và chỉ phát một cảnh báo duy nhất.",
      "C. Tắt hoàn toàn việc leo thang thủ công khi tỷ lệ lỗi của thành phần phía sau vượt quá một ngưỡng phần trăm cố định.",
      "D. Gom tất cả payload leo thang vào hàng đợi độ ưu tiên thấp và gửi email tổng hợp một lần mỗi 24 giờ."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Escalating severity makes alerts noisier and worsens operator fatigue without eliminating redundant notification events.",
      "Option B is correct: Deduplicating alerts using error fingerprints and suppression windows prevents alert storms by aggregating count telemetry while ensuring engineers receive one actionable notification.",
      "Option C is incorrect: Disabling escalations during high error rates leaves critical outages unmonitored and risks undetected system failures.",
      "Option D is incorrect: Digesting alerts into a 24-hour batch email destroys incident responsiveness for real-time operational failures."
    ],
    "rationale": "To prevent alert fatigue caused by repeating system errors, the escalation engine must deduplicate alerts using failure signatures and aggregation windows, logging total counts while emitting a single actionable alert.",
    "explanation": "Lựa chọn A không đúng vì việc tăng mức độ ưu tiên chỉ khiến thông báo trở nên phiền nhiễu hơn và làm trầm trọng thêm tình trạng kiệt sức cảnh báo của nhân viên mà không giải quyết gốc rễ sự trùng lặp.\nLựa chọn B là đáp án đúng vì việc khử trùng lặp theo dấu vết lỗi (fingerprint) kết hợp với cửa sổ thời gian nén cảnh báo sẽ giúp nhóm các lỗi giống nhau lại, ghi vết số lượng xuất hiện và chỉ phát ra duy nhất 1 cảnh báo đầu tiên cho kỹ sư.\nLựa chọn C không đúng vì tắt hoàn toàn leo thang khi hệ thống gặp tỷ lệ lỗi cao sẽ bỏ sót các sự cố nghiêm trọng không được giám sát.\nLựa chọn D không đúng vì gom email 24 giờ sẽ làm mất tính thời gian thực (real-time) cần thiết để xử lý sự cố vận hành.",
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  }
]