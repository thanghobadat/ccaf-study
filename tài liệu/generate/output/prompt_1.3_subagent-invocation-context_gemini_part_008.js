[
  {
    "id": "d1-b03-new-015",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-015",
    "questionEN": "An enterprise risk platform, OmniRisk Analytics Engine, uses an Orchestrator Agent to spawn a quantitative risk subagent via the Task tool call. During a portfolio stress test, the Orchestrator invokes the subagent with the payload {\"description\": \"do the analysis\"}, leaving both context and input parameters unpopulated. Consequently, the spawned subagent defaults to generating generic macroeconomic commentary rather than evaluating the credit default swap risk for portfolio PF-8821. What is the primary architectural cause of this subagent failure?",
    "question": "[d1-b03-new-015] Một nền tảng rủi ro doanh nghiệp, OmniRisk Analytics Engine, sử dụng một Orchestrator Agent để khởi tạo một subagent phân tích rủi ro định lượng thông qua công cụ Task. Trong quá trình kiểm tra ứng phó rủi ro (stress test) danh mục đầu tư, Orchestrator gọi subagent với payload {\"description\": \"do the analysis\"}, để trống cả hai tham số context và input. Kết quả là, subagent được khởi tạo mặc định tạo ra bình luận kinh tế vĩ mô chung chung thay vì đánh giá rủi ro hợp đồng hoán đổi rủi ro tín dụng (CDS) cho danh mục PF-8821. Nguyên nhân kiến trúc chính của sự thất bại subagent này là gì?",
    "optionsEN": [
      "A. The subagent failed because it was denied access to the Orchestrator's internal conversation memory history via standard tool permissions.",
      "B. The Orchestrator failed because the Task tool call emitted multiple subagent requests sequentially rather than concurrently, causing context state loss.",
      "C. The Orchestrator invoked the subagent with an ambiguous description and omitted explicit task scope and target data references in the tool call parameters.",
      "D. The subagent failed because it lacked system-level file write permissions required to store context variables before executing analysis."
    ],
    "options": [
      "A. Subagent thất bại vì nó bị từ chối truy cập vào lịch sử bộ nhớ trò chuyện nội bộ của Orchestrator thông qua quyền công cụ tiêu chuẩn.",
      "B. Orchestrator thất bại vì công cụ Task phát ra nhiều yêu cầu subagent theo trình tự thay vì đồng thời, gây mất trạng thái ngữ cảnh.",
      "C. Orchestrator đã gọi subagent với description mơ hồ và bỏ qua phạm vi nhiệm vụ chi tiết cũng như tham chiếu dữ liệu mục tiêu trong tham số gọi công cụ.",
      "D. Subagent thất bại vì thiếu quyền ghi file cấp hệ thống cần thiết để lưu trữ các biến ngữ cảnh trước khi thực thi phân tích."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Subagents execute with clean, isolated context windows and do not implicitly inherit parent conversation histories; required context must be explicitly structured within the Task parameters.",
      "Option B is incorrect: Sequential versus parallel execution mode governs operational latency and dependency handling, but does not cause a subagent to produce off-topic outputs when invoked.",
      "Option C is correct: Subagents require explicit, unambiguous task descriptions and input references in the Task tool invocation payload to ground their execution on specific target data.",
      "Option D is incorrect: Context transmission between coordinator and subagent occurs via structured tool call parameters in memory/API payloads, not by writing transient files to local filesystem storage."
    ],
    "rationale": "Subagents operate with isolated context windows and have no implicit access to parent conversation history. When invoking a subagent via the Task tool, the coordinator must provide an explicit, specific description along with necessary context and input parameters. Providing only a vague instruction like 'do the analysis' leaves the subagent without prompt grounding or target data bounds, resulting in off-topic or generic outputs.",
    "explanation": "[d1-b03-new-015]\\n- Đáp án đúng: C. Orchestrator đã gọi subagent với description mơ hồ và bỏ qua phạm vi nhiệm vụ chi tiết cũng như tham chiếu dữ liệu mục tiêu trong tham số gọi công cụ.\\n- Phân tích chi tiết:\\n - Đáp án A sai: Subagent hoạt động trong cửa sổ ngữ cảnh độc lập (isolated context window) và không tự động kế thừa lịch sử trò chuyện của agent cha. Việc cấp quyền truy cập lịch sử hội thoại của Orchestrator không phải là cơ chế truyền ngữ cảnh chuẩn của công cụ Task.\\n - Đáp án B sai: Việc gọi tuần tự hay song song ảnh hưởng đến độ trễ hệ thống và luồng phụ thuộc dữ liệu, không phải nguyên nhân khiến nội dung đầu ra bị lệch hướng khi chỉ cung cấp câu lệnh mơ hồ.\\n - Đáp án C đúng: Khi khởi tạo subagent qua công cụ Task, Orchestrator phải cung cấp mô tả mục tiêu rõ ràng (description), ngữ cảnh liên quan (context) và tham chiếu dữ liệu đầu vào (input). Yêu cầu mơ hồ \"do the analysis\" thiếu phạm vi mục tiêu (danh mục PF-8821) dẫn đến subagent tạo ra kết quả kinh tế vĩ mô chung chung.\\n - Đáp án D sai: Ngữ cảnh được truyền qua payload của công cụ trong bộ nhớ API, không yêu cầu subagent phải có quyền ghi file hệ thống để đọc ngữ cảnh.",
    "scenarioSignature": {
      "testedPrinciple": "explicit context parameter passing in subagent invocation",
      "failureMode": "subagent produces off topic generic output",
      "rootCause": "ambiguous description parameter lacking explicit context",
      "requiredFix": "pass explicit objective and scoped context in task parameters"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-016",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-016",
    "questionEN": "In the MediCare Health Platform, a Clinical Diagnostic Coordinator invokes a specialist subagent via the Task tool call to generate a dosage recommendation. The schema requires an input object containing patient_id, but the coordinator omits input and sends only {\"task\": \"calculate pediatric dosage\"}. As a result, the subagent falls back to a default sandbox identifier PT-0000 and calculates dosage for the wrong patient record instead of target PT-9402. Which architectural remediation prevents this subagent context failure?",
    "question": "[d1-b03-new-016] Trong nền tảng y tế MediCare Health Platform, một Clinical Diagnostic Coordinator gọi một subagent chuyên khoa thông qua công cụ Task để đưa ra khuyến nghị liều lượng thuốc. Schema yêu cầu đối tượng input chứa patient_id, nhưng coordinator bỏ qua input và chỉ gửi {\"task\": \"calculate pediatric dosage\"}. Kết quả là, subagent quay về sử dụng mã định danh mặc định trong môi trường thử nghiệm PT-0000 và tính toán liều lượng cho sai hồ sơ bệnh nhân thay vì mục tiêu PT-9402. Giải pháp kiến trúc nào ngăn ngừa lỗi ngữ cảnh subagent này?",
    "optionsEN": [
      "A. Configure the specialist subagent to query the parent agent's active memory buffer to infer the current patient_id during execution.",
      "B. Change the subagent invocation model from parallel execution to sequential execution to allow patient metadata synchronization.",
      "C. Add an ambient system prompt to the subagent requiring it to search local database logs for recent patient records if patient_id is omitted.",
      "D. Enforce strict schema validation on the Task tool arguments requiring a mandatory input.patient_id field before invoking the subagent."
    ],
    "options": [
      "A. Cấu hình subagent chuyên khoa để truy vấn bộ đệm bộ nhớ hoạt động của agent cha nhằm tự suy ra patient_id hiện tại trong quá trình thực thi.",
      "B. Thay đổi mô hình gọi subagent từ thực thi song song sang thực thi tuần tự để cho phép đồng bộ hóa dữ liệu đặc tả bệnh nhân.",
      "C. Thêm system prompt môi trường vào subagent yêu cầu nó tìm kiếm nhật ký cơ sở dữ liệu cục bộ cho các hồ sơ bệnh nhân gần đây nếu bỏ qua patient_id.",
      "D. Bắt buộc kiểm tra schema nghiêm ngặt đối với đối số của công cụ Task, yêu cầu trường input.patient_id là bắt buộc trước khi khởi tạo subagent."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Subagents cannot access or inspect the parent coordinator's internal context/memory buffer directly; required entities must be explicitly passed via validated tool call arguments.",
      "Option B is incorrect: Modifying execution flow between parallel and sequential modes does not resolve missing parameters in the Task tool argument payload.",
      "Option C is incorrect: Allowing subagents to query ambient logs when inputs are missing causes non-deterministic side effects and increases the risk of processing incorrect patient records.",
      "Option D is correct: Strict input schema validation on the Task tool call ensures that essential identifier fields like input.patient_id are present before invocation, preventing fallback to erroneous defaults."
    ],
    "rationale": "When invoking subagents via tool calls, critical target parameters such as patient_id within the input schema must be strictly enforced. If a coordinator omits essential identification fields, subagents may revert to default fallback states or execute on incorrect records. Implementing rigid schema validation on the Task tool parameters ensures the system fails fast when mandatory context is missing, requiring the coordinator to provide the exact context.",
    "explanation": "[d1-b03-new-016]\\n- Đáp án đúng: D. Bắt buộc kiểm tra schema nghiêm ngặt đối với đối số của công cụ Task, yêu cầu trường input.patient_id là bắt buộc trước khi khởi tạo subagent.\\n- Phân tích chi tiết:\\n - Đáp án A sai: Subagent không thể đọc trực tiếp bộ đệm bộ nhớ nội bộ của agent cha. Mọi tham số ngữ cảnh bắt buộc phải được truyền chính thức qua đối số payload của công cụ Task.\\n - Đáp án B sai: Việc chuyển đổi giữa thực thi tuần tự và song song không giải quyết được vấn đề thiếu tham số trong payload của công cụ.\\n - Đáp án C sai: Cho phép subagent tự dò tìm nhật ký khi thiếu dữ liệu đầu vào làm tăng tính không định hình (non-deterministic) và có nguy cơ truy xuất sai hồ sơ bệnh nhân nghiêm trọng hơn.\\n - Đáp án D đúng: Áp dụng ràng buộc schema nghiêm ngặt (strict schema validation) cho các đối số của công cụ Task đảm bảo rằng mọi trường dữ liệu định danh bắt buộc (input.patient_id) phải có sẵn trước khi gọi subagent, ngăn chặn việc quay về giá trị mặc định không mong muốn.",
    "scenarioSignature": {
      "testedPrinciple": "schema validation for required subagent input parameters",
      "failureMode": "subagent processes wrong entity record using default fallback",
      "rootCause": "missing required input parameter field in task tool payload",
      "requiredFix": "enforce strict parameter schema validation on task tool call"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]