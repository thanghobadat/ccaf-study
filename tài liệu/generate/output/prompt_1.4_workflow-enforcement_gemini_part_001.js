[
  {
    "id": "d1-b03-1.4-001",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-001",
    "scenarioSignature": {
      "testedPrinciple": "Deterministic PreToolUse hook enforcement for critical safety workflows",
      "failureMode": "Agent skips drug interaction verification tool and issues prescription directly",
      "rootCause": "Relying on probabilistic prompt instructions for safety-critical tool sequencing",
      "requiredFix": "Implement a PreToolUse hook that programmatically blocks prescription issuance until interaction check verification succeeds"
    },
    "questionEN": "A clinical assistant agent, MedRx-Agent, processes prescription requests by calling check_drug_interaction and issue_prescription via /api/v2/prescriptions/issue. Despite system prompt instructions strictly requiring interaction checks before issuing any prescription, production logs reveal a 6.5% failure rate where issue_prescription is invoked directly without running check_drug_interaction. How should the platform architecture be modified to guarantee 100% compliance with safety protocols?",
    "question": "[d1-b03-1.4-001] Trợ lý lâm sàng MedRx-Agent xử lý các yêu cầu kê đơn bằng cách gọi hai tool check_drug_interaction và issue_prescription qua /api/v2/prescriptions/issue. Mặc dù prompt hệ thống quy định nghiêm ngặt rằng phải kiểm tra tương tác thuốc trước khi phát hành đơn, nhật ký sản xuất ghi nhận tỷ lệ thất bại 6.5% khi issue_prescription bị gọi trực tiếp mà không qua check_drug_interaction. Kiến trúc nền tảng nên được sửa đổi như thế nào để đảm bảo tuân thủ 100% các giao thức an toàn?",
    "optionsEN": [
      "A. Implement a PreToolUse hook in the orchestration layer that intercepts issue_prescription calls and programmatically aborts execution if a valid interaction check token is missing from the session context.",
      "B. Append few-shot trajectory examples in the system prompt demonstrating the required sequence of calling check_drug_interaction before issue_prescription.",
      "C. Train a fine-tuned routing classifier to analyze input user requests and enforce sequential step-by-step tool generation.",
      "D. Deploy an asynchronous post-execution logging service that checks issued prescriptions against interaction databases and alerts medical staff upon detecting conflicts."
    ],
    "options": [
      "A. Triển khai một hook PreToolUse trong lớp điều phối để chặn các cuộc gọi issue_prescription và dừng thực thi bằng chương trình nếu thiếu token xác thực tương tác thuốc trong session context.",
      "B. Bổ sung các ví dụ vài lượt (few-shot) vào system prompt minh họa đúng trình tự gọi check_drug_interaction trước issue_prescription.",
      "C. Huấn luyện một bộ phân loại định tuyến (routing classifier) được tinh chỉnh để phân tích yêu cầu đầu vào và áp đặt thứ tự sinh tool theo từng bước.",
      "D. Triển khai dịch vụ ghi log bất đồng bộ sau thực thi để kiểm tra các đơn thuốc đã phát hành với cơ sở dữ liệu tương tác và cảnh báo nhân viên y tế khi phát hiện xung đột."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Medical safety checks require deterministic programmatic enforcement. A PreToolUse hook intercepts tool calls at the orchestrator layer, physically preventing issue_prescription execution unless a verified interaction check token exists in context.",
      "Option B is incorrect: Prompt modifications like few-shot prompting remain probabilistic and cannot guarantee 100% enforcement, which is unacceptable for safety-critical medical operations.",
      "Option C is incorrect: Fine-tuned classifiers influence generation probability but still operate probabilistically without providing an unbypassable programmatic guardrail.",
      "Option D is incorrect: Asynchronous post-execution auditing detects violations after the prescription has already been issued, failing to prevent the harmful action before execution."
    ],
    "rationale": "In medical compliance and high-risk domain operations, probabilistic controls like prompt instructions or few-shot examples fail to eliminate edge-case execution skips. Implementing a programmatic PreToolUse hook at the orchestrator level enforces an unbypassable prerequisite check that physically blocks high-risk tool execution until prerequisite verification returns a valid state.",
    "explanation": "Trong các hệ thống y tế và vận hành rủi ro cao, các biện pháp kiểm soát mang tính xác suất như system prompt hay few-shot prompting không thể loại bỏ hoàn toàn các trường hợp bỏ sót công đoạn (tỷ lệ lỗi 6.5%).\n- Lựa chọn A đúng: Sử dụng hook PreToolUse tại lớp điều phối (orchestration layer) giúp can thiệp trực tiếp trước khi tool issue_prescription được thực thi. Nếu chưa có token xác nhận từ check_drug_interaction trong session context, hệ thống sẽ từ chối gọi tool theo cách lập trình tuyệt đối (deterministic).\n- Lựa chọn B sai: Bổ sung few-shot prompt vẫn là giải pháp mang tính xác suất (probabilistic), không đảm bảo tuân thủ 100%.\n- Lựa chọn C sai: Bộ phân loại định tuyến (routing classifier) chỉ định hướng mô hình sinh ra tool nhưng không thể ngăn chặn cứng khi mô hình dự đoán sai.\n- Lựa chọn D sai: Kiểm tra bất đồng bộ sau khi phát hành đơn thuốc chỉ phát hiện lỗi khi thiệt hại đã xảy ra, không ngăn chặn được hành vi vi phạm ngay từ đầu.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  },
  {
    "id": "d1-b03-1.4-002",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.4 workflow-enforcement / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-1.4-002",
    "scenarioSignature": {
      "testedPrinciple": "Idempotency gate enforcement for multi-step fulfillment workflows",
      "failureMode": "Duplicate physical shipments dispatched due to un-deduplicated tool retries",
      "rootCause": "Executing non-idempotent dispatch tools without verifying order state or idempotency keys",
      "requiredFix": "Implement an idempotency gate with unique payload keys and state checks before tool execution"
    },
    "questionEN": "An e-commerce order processing agent, FulfillBot-v3, calls dispatch_warehouse_order to submit fulfillment requests to /v1/shipping/dispatch. During network retries caused by HTTP 504 gateway timeouts, FulfillBot-v3 re-issues identical dispatch calls, resulting in 142 duplicate warehouse shipments. How should the engineering team prevent duplicate dispatches during retry scenarios?",
    "question": "[d1-b03-1.4-002] Tác vụ xử lý đơn hàng thương mại điện tử FulfillBot-v3 gọi tool dispatch_warehouse_order để gửi yêu cầu hoàn tất đơn hàng tới /v1/shipping/dispatch. Khi gặp lỗi mạng tạm thời (HTTP 504 gateway timeout), FulfillBot-v3 phát lại các cuộc gọi dispatch trùng lặp, dẫn đến 142 đơn hàng bị gửi đi hai lần từ kho. Đội ngũ kỹ thuật nên làm gì để ngăn chặn hiện tượng gửi trùng lặp này khi xảy ra thử lại (retry)?",
    "optionsEN": [
      "A. Increase the HTTP client connection timeout from 5000ms to 30000ms so network requests complete before the agent initiates retries.",
      "B. Implement an idempotency gate prior to tool invocation that generates a deterministic idempotency_key based on order_id and verifies state in the database before proceeding.",
      "C. Add a system prompt instruction directing the agent to pause 60 seconds before re-attempting any failed dispatch_warehouse_order call.",
      "D. Configure a post-dispatch cron job that checks the warehouse fulfillment table hourly and sends cancellation requests for duplicate records."
    ],
    "options": [
      "A. Tăng thời gian chờ kết nối (timeout) của HTTP client từ 5000ms lên 30000ms để các yêu cầu mạng hoàn thành trước khi tác vụ bắt đầu thử lại.",
      "B. Triển khai một cổng tính đẳng kháng (idempotency gate) trước khi gọi tool để tạo idempotency_key cố định dựa trên order_id và kiểm tra trạng thái đơn trong cơ sở dữ liệu trước khi thực hiện.",
      "C. Thêm hướng dẫn vào system prompt yêu cầu agent tạm dừng 60 giây trước khi thử lại bất kỳ cuộc gọi dispatch_warehouse_order nào bị thất bại.",
      "D. Cấu hình một công việc định kỳ (cron job) chạy hàng giờ để kiểm tra bảng hoàn tất đơn hàng và gửi yêu cầu hủy cho các bản ghi trùng lặp."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Increasing network client timeout parameters reduces timeout frequency but fails to prevent duplicate dispatches when actual network drops or retries occur.",
      "Option B is correct: An idempotency gate ensures that retried tool calls submit a unique idempotency key or query database state first, allowing downstream shipping APIs to safely deduplicate execution and return previous responses.",
      "Option C is incorrect: Delaying retry execution via prompt instructions does not establish state idempotency, as retried requests will still execute twice at the warehouse once the timer expires.",
      "Option D is incorrect: Hourly post-processing cleanup runs after physical warehouse items have already been picked and packed, causing unnecessary operational costs and shipment conflicts."
    ],
    "rationale": "Retrying non-idempotent fulfillment operations without state checks or idempotency keys leads to double-execution in production systems. Implementing an idempotency gate using deterministic keys (order_id) and pre-execution state validation guarantees that retried tool calls are safely deduplicated at both the orchestrator and downstream API layers.",
    "explanation": "Trong xử lý đơn hàng, các hành vi giao hàng hay thanh toán mang tính chất làm thay đổi trạng thái thực tế và không được phép lặp lại (non-idempotent).\n- Lựa chọn B đúng: Cổng tính đẳng kháng (idempotency gate) kết hợp việc gửi idempotency_key duy nhất dựa trên order_id và kiểm tra trạng thái đơn trong DB trước khi gọi tool. Nếu request trùng được gửi lại do timeout, API downstream sẽ nhận diện key đã xử lý và trả về kết quả cũ thay vì tạo thêm lệnh xuất kho mới.\n- Lựa chọn A sai: Tăng timeout chỉ làm giảm khả năng hết giờ chờ chứ không giải quyết tận gốc việc xử lý trùng lặp khi mạng thực sự bị đứt gãy và retry xảy ra.\n- Lựa chọn C sai: Thêm khoảng chờ vào prompt không giúp công cụ nhận biết đơn hàng đã được tạo hay chưa, request gửi sau 60s vẫn tạo lệnh xuất kho trùng lặp.\n- Lựa chọn D sai: Xử lý định kỳ sau 1 giờ là quá muộn vì hàng hóa trong kho có thể đã được đóng gói và xuất đi, gây tổn thất chi phí vận chuyển.",
    "sources": [
      {
        "label": "Lesson 1.4: Workflow Enforcement and Handoff",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-4-workflow-enforcement-handoff"
      }
    ]
  }
]