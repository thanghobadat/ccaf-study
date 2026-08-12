[
  {
    "id": "d5-b10-5.3-007",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-007",
    "scenarioSignature": {
      "testedPrinciple": "distinguishing transient network errors from escalation triggers",
      "failureMode": "excessive human alerts for temporary connection failures",
      "rootCause": "immediate human escalation without automated retry mechanism",
      "requiredFix": "implement exponential backoff retries before escalating"
    },
    "questionEN": "A payment processing agent calling payment-gateway-v1 receives a transient HTTP 503 Service Unavailable error due to a 200ms network micro-burst. The agent is configured to immediately construct an escalation payload and trigger a high-severity PagerDuty incident whenever any API call returns a non-200 HTTP status code. As a result, on-call engineers receive over 40 false-alarm notifications per night for transient glitches that recover immediately. Which architectural modification correctly handles this scenario?",
    "question": "[d5-b10-5.3-007] Một agent xử lý thanh toán khi gọi API payment-gateway-v1 nhận được lỗi tạm thời HTTP 503 Service Unavailable do hiện tượng nghẽn mạng micro-burst kéo dài 200ms. Agent được cấu hình để lập tức tạo payload leo thang và kích hoạt sự cố PagerDuty mức độ cao bất kể khi nào lời gọi API trả về mã trạng thái khác 200. Kết quả là các kĩ sư trực ca nhận hơn 40 cảnh báo báo động giả mỗi đêm cho các lỗi tạm thời vốn tự phục hồi ngay sau đó. Sửa đổi kiến trúc nào xử lý đúng đắn kịch bản này?",
    "optionsEN": [
      "A. Reduce the human response SLA timeout from 30 minutes to 5 minutes so on-call engineers handle connection tickets faster.",
      "B. Configure the agent to silently catch HTTP 503 errors and return a default zero-value transaction object without retrying or alerting.",
      "C. Implement an automated exponential backoff retry policy for idempotent requests and only escalate to human operators if retries are exhausted.",
      "D. Route HTTP 503 error logs to a secondary LLM agent to re-analyze and re-prompt the request payload before notifying humans."
    ],
    "options": [
      "A. Giảm thời gian SLA phản hồi của con người từ 30 phút xuống 5 phút để kĩ sư trực ca xử lý các ticket kết nối nhanh hơn.",
      "B. Cấu hình agent âm thầm bắt lỗi HTTP 503 và trả về đối tượng giao dịch mặc định giá trị 0 mà không cần thử lại hoặc cảnh báo.",
      "C. Triển khai chính sách thử lại tự động với số mũ (exponential backoff retry) cho các yêu cầu đẳng phản và chỉ leo thang đến con người khi đã hết lượt thử lại.",
      "D. Điều hướng log lỗi HTTP 503 sang một LLM agent phụ để phân tích lại và tạo lại prompt cho payload yêu cầu trước khi thông báo cho con người."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because shortening the human response SLA does not resolve the root cause of escalating transient network blips and severely increases on-call fatigue.",
      "Option B is incorrect because silently returning a zero-value transaction object swallows potential infrastructure failures and corrupts transaction state integrity.",
      "Option C is correct because transient network errors should be handled via automated retries with exponential backoff; human escalation must be reserved for persistent failures after retry exhaustion.",
      "Option D is incorrect because routing transport-level socket timeouts to another LLM adds latency and cost without addressing underlying network connectivity issues."
    ],
    "rationale": "Transient errors such as network timeouts or HTTP 503 blips should be resolved through automated retry policies with exponential backoff before triggering human escalation, preserving human attention for non-transient failures.",
    "explanation": "Lựa chọn C đúng vì theo nguyên tắc thiết kế luồng leo thang, các lỗi mạng tạm thời (transient errors như HTTP 503 hay connection timeout) phải được xử lý tự động bằng cơ chế thử lại với số mũ (exponential backoff retry) cho các thao tác đẳng phản (idempotent). Luồng leo thang đến con người chỉ nên kích hoạt khi số lần thử lại đã vượt ngưỡng tối đa mà hệ thống vẫn không thể kết nối.\nLựa chọn A sai vì việc giảm SLA chỉ tăng tải cho kĩ sư trực ca mà không khắc phục được nguyên nhân gốc rễ là báo động giả.\nLựa chọn B sai vì âm thầm bỏ qua lỗi và trả về dữ liệu giả 0 đồng sẽ làm sai lệch dữ liệu tài chính và che giấu sự cố hệ thống.\nLựa chọn D sai vì LLM không thể giải quyết được sự cố đường truyền hạ tầng mạng, việc gửi log cho LLM chỉ làm tăng chi phí token và độ trễ.",
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  },
  {
    "id": "d5-b10-5.3-008",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.3 escalation-paths / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.3-008",
    "scenarioSignature": {
      "testedPrinciple": "escalation calibration to prevent alert fatigue",
      "failureMode": "critical incidents missed due to notification muting",
      "rootCause": "uncalibrated low-priority alert flooding leading to human desensitization",
      "requiredFix": "calibrate triggers with auto-clarification deduplication and severity filtering"
    },
    "questionEN": "An enterprise customer service agent, support-agent-v1, posts every ambiguous customer prompt directly into a Slack channel #ops-alerts. Generating over 200 low-priority escalation alerts per day, the operations team experiences severe alert fatigue and sets the channel notifications to 'Muted'. Consequently, a critical security vulnerability report flagged by a customer is ignored for 14 hours. Which escalation architecture strategy prevents this alert fatigue while ensuring critical issues are promptly addressed?",
    "question": "[d5-b10-5.3-008] Một agent dịch vụ khách hàng doanh nghiệp, support-agent-v1, gửi mọi câu hỏi mập mờ của khách hàng trực tiếp vào kênh Slack #ops-alerts. Việc phát sinh hơn 200 cảnh báo leo thang độ ưu tiên thấp mỗi ngày khiến đội vận hành bị quá tải cảnh báo (alert fatigue) và chuyển thông báo của kênh sang chế độ 'Muted' (Tắt tiếng). Kết quả là một báo cáo lỗ hổng bảo mật nghiêm trọng do khách hàng gửi đã bị bỏ qua suốt 14 giờ. Chiến lược kiến trúc leo thang nào giúp ngăn ngừa tình trạng quá tải cảnh báo này trong khi vẫn đảm bảo các sự cố critical được xử lý kịp thời?",
    "optionsEN": [
      "A. Increase the Slack webhook API rate limits and distribute the 200 daily alerts across 10 sub-channels using timestamp hashing.",
      "B. Replace human operators with a second high-temperature LLM reviewer configured to automatically resolve and approve all escalated tickets.",
      "C. Disable the escalation webhook entirely and archive all failed customer queries into an unmonitored S3 log bucket for weekly audit.",
      "D. Calibrate escalation triggers by attempting one clarifying question for solvable ambiguities, deduplicating repetitive alerts, and enforcing strict severity thresholds."
    ],
    "options": [
      "A. Tăng giới hạn tốc độ (rate limit) của Slack webhook API và phân bổ 200 cảnh báo hàng ngày sang 10 kênh phụ bằng cơ chế băm nhãn thời gian.",
      "B. Thay thế con người bằng một LLM reviewer thứ hai với nhiệt độ (temperature) cao để tự động đóng và phê duyệt mọi ticket được leo thang.",
      "C. Tắt hoàn toàn webhook leo thang và lưu trữ tất cả câu hỏi thất bại của khách hàng vào một bucket S3 không được giám sát để kiểm toán hàng tuần.",
      "D. Hiệu chuẩn lại các điều kiện kích hoạt leo thang bằng cách thử đặt 1 câu hỏi làm rõ cho các mơ hồ có thể giải quyết, khử trùng lặp cảnh báo và áp đặt ngưỡng mức độ nghiêm trọng nghiêm ngặt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because partitioning uncalibrated alerts across multiple channels merely scatters alert fatigue without filtering out non-actionable notifications.",
      "Option B is incorrect because relying on a second LLM to auto-approve escalated cases bypasses human oversight and risks approving dangerous security incidents.",
      "Option C is incorrect because suppressing alerts into an unmonitored log bucket eliminates human-in-the-loop intervention for genuine high-severity incidents.",
      "Option D is correct because calibrating escalation paths through initial self-clarification, alert deduplication, and strict severity filtering ensures human operators receive only actionable, high-priority issues."
    ],
    "rationale": "Preventing escalation fatigue requires calibrating triggers so agents attempt single-step clarification on solvable ambiguities, deduplicate repeated alerts, and restrict human notifications to high-severity actionable events.",
    "explanation": "Lựa chọn D đúng vì để khắc phục tình trạng quá tải cảnh báo (escalation fatigue), hệ thống cần phải hiệu chuẩn (calibrate) quy trình leo thang: agent nên tự thử đặt 1 câu hỏi làm rõ đối với các yêu cầu mập mờ có thể tự giải quyết, khử trùng lặp (deduplicate) các cảnh báo giống nhau và chỉ gửi thông báo cho con người khi sự cố đạt ngưỡng nghiêm trọng thực sự cần can thiệp.\nLựa chọn A sai vì việc chia nhỏ 200 cảnh báo sang 10 kênh chỉ làm phân tán sự chú ý chứ không làm giảm lượng thông báo rác.\nLựa chọn B sai vì dùng LLM tự động duyệt mọi ticket leo thang sẽ bỏ qua hoàn toàn sự kiểm soát của con người, gây rủi ro cực lớn cho các sự cố an ninh.\nLựa chọn C sai vì tắt cảnh báo và đẩy vào kho lưu trữ không giám sát sẽ loại bỏ hoàn toàn khả năng ứng phó sự cố khẩn cấp.",
    "sources": [
      {
        "label": "Lesson 5.3: Escalation Paths",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-3-escalation-paths"
      }
    ]
  }
]