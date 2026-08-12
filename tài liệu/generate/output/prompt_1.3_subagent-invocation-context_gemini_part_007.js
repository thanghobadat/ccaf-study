[
  {
    "id": "d1-b03-new-013",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-013",
    "scenarioSignature": {
      "testedPrinciple": "subagent result aggregation completeness",
      "failureMode": "silent missing data in synthesis report",
      "rootCause": "coordinator array slicing truncates aggregated subagent results before context injection",
      "requiredFix": "pass complete aggregated array of subagent outputs to synthesis context"
    },
    "questionEN": "An enterprise audit platform FinAudit-Engine spawns 6 parallel subagents via Task tool to audit financial compliance across 6 regulatory regions. Each subagent returns a JSON payload with region status. However, the ResultAggregator component truncates the collected array to 4 elements due to a hardcoded array slice (results[:4]) before passing subagent_outputs to the SynthesisAgent. Consequently, compliance reports for 2 regions are missing without triggering exceptions. What is the root cause and correct architectural fix for this silent data loss?",
    "question": "[d1-b03-new-013] Một nền tảng kiểm toán doanh nghiệp FinAudit-Engine khởi tạo đồng thời 6 subagent thông qua công cụ Task để kiểm tra tuân thủ tài chính tại 6 khu vực pháp lý. Mỗi subagent trả về một đối tượng JSON chứa trạng thái khu vực. Tuy nhiên, thành phần ResultAggregator của coordinator cắt mảng kết quả thu được xuống còn 4 phần tử do logic cắt mảng bị giới hạn cứng (results[:4]) trước khi truyền subagent_outputs cho SynthesisAgent. Hệ quả là báo cáo tuân thủ bị thiếu mất 2 khu vực mà không hề phát sinh lỗi exception nào. Nguyên nhân gốc rễ và giải pháp kiến trúc đúng cho tình trạng mất dữ liệu âm thầm này là gì?",
    "optionsEN": [
      "A. The coordinator fails to forward all subagent outputs to the synthesis subagent context payload; the coordinator payload builder must pass the full list of 6 subagent result objects.",
      "B. The synthesis subagent has restricted tool permissions; update allowedTools to include file read permissions for the missing 2 region files.",
      "C. Parallel execution corrupted subagent memory buffers; re-architect the 6 subagents to execute sequentially to prevent race conditions.",
      "D. The subagents emitted unstructured text instead of JSON; configure strict output schemas on the 6 worker agents to prevent parsing dropouts."
    ],
    "options": [
      "A. Coordinator không chuyển đầy đủ đầu ra của tất cả subagent vào payload ngữ cảnh của synthesis subagent; bộ dựng payload của coordinator phải truyền toàn bộ danh sách 6 đối tượng kết quả subagent.",
      "B. Synthesis subagent bị giới hạn quyền công cụ; cập nhật allowedTools để bổ sung quyền đọc file cho 2 tệp khu vực còn thiếu.",
      "C. Việc thực thi song song làm hỏng bộ nhớ đệm của subagent; tái kiến trúc 6 subagent để thực thi tuần tự nhằm tránh tình trạng race condition.",
      "D. Các subagent trả về văn bản không cấu trúc thay vì JSON; cấu hình output schema nghiêm ngặt cho 6 worker agent để tránh bỏ sót dữ liệu khi parse."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A correctly identifies that silent data loss occurred because the coordinator payload builder sliced the aggregated results and failed to pass all 6 subagent outputs to the synthesis subagent context.",
      "Option B incorrectly attributes the issue to tool permissions; the subagents executed successfully and returned data, so synthesis tool access is not the cause.",
      "Option C erroneously suggests switching to sequential execution; subagent execution was complete and independent, so race conditions did not cause array truncation.",
      "Option D wrongly blames worker output formatting; the worker JSON outputs were returned properly to the coordinator before the array slicing occurred."
    ],
    "rationale": "The synthesis subagent relies entirely on the context payload provided by the coordinator. Slicing the aggregated results array before constructing the synthesis context payload silently drops 2 regions' data. Forwarding the complete array of 6 subagent result objects ensures complete synthesis.",
    "explanation": "Đáp án A đúng: Sự cố mất dữ liệu xảy ra do coordinator cắt gọt mảng kết quả đã tổng hợp trước khi truyền vào ngữ cảnh của synthesis subagent. Để đảm bảo tính toàn vẹn, coordinator phải đóng gói toàn bộ 6 kết quả subagent vào payload truyền cho synthesis agent.\nĐáp án B sai: Các subagent đã thực thi và trả kết quả thành công cho coordinator; lỗi không đến từ quyền truy cập công cụ đọc file của synthesis agent.\nĐáp án C sai: Việc thực thi song song của các subagent diễn ra độc lập và thành công; nguyên nhân cắt giảm mảng xảy ra ở tầng tổng hợp ngữ cảnh của coordinator chứ không phải do race condition bộ nhớ.\nĐáp án D sai: Dữ liệu từ các worker agent đã ở dạng JSON hợp lệ; lỗi xảy ra ở bước coordinator lọc/chuyển tiếp dữ liệu chứ không phải do định dạng đầu ra của worker agent.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-014",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-014",
    "questionEN": "An automated incident triage system OpsGuard-Orchestrator aggregates metrics from multiple log-analysis subagents. The coordinator wraps the collected subagent responses into a nested dictionary structured as {\"results\": {\"worker_1\": {...}, \"worker_2\": {...}}} within the context_data parameter. However, the downstream ReportSynthesisAgent system prompt and input parser expect a flat JSON array of worker result objects [{\"worker_1\": ...}, {\"worker_2\": ...}]. Upon invocation, ReportSynthesisAgent throws a TypeError parse error during JSON extraction. What is the root cause and the required architectural resolution?",
    "question": "[d1-b03-new-014] Một hệ thống xử lý sự cố tự động OpsGuard-Orchestrator tổng hợp chỉ số từ nhiều subagent phân tích log. Coordinator đóng gói các phản hồi của subagent thành một dictionary lồng nhau có cấu trúc {\"results\": {\"worker_1\": {...}, \"worker_2\": {...}}} trong tham số context_data. Tuy nhiên, prompt hệ thống và trình parse đầu vào của ReportSynthesisAgent lại yêu cầu một mảng JSON phẳng chứa các đối tượng kết quả [{\"worker_1\": ...}, {\"worker_2\": ...}]. Khi được kích hoạt, ReportSynthesisAgent đưa ra lỗi parse TypeError. Nguyên nhân gốc rễ và giải pháp kiến trúc bắt buộc là gì?",
    "optionsEN": [
      "A. The log-analysis subagents were invoked sequentially instead of in parallel, causing a context buffer timeout before the dictionary could be serialized.",
      "B. The coordinator passed subagent results in a nested dictionary format ({\"results\": {...}}) while the synthesis subagent expected a flat list array, leading to a schema parsing crash.",
      "C. The coordinator failed to include the Task tool in the synthesis agent's allowedTools list, preventing it from calling log extraction functions.",
      "D. The log-analysis subagents lacked isolated context windows, causing variable name collisions across worker result payloads."
    ],
    "options": [
      "A. Các subagent phân tích log được gọi tuần tự thay vì song song, gây ra lỗi quá thời hạn bộ nhớ đệm ngữ cảnh trước khi dictionary được chuỗi hóa.",
      "B. Coordinator đã truyền kết quả subagent dưới dạng dictionary lồng nhau ({\"results\": {...}}) trong khi synthesis subagent yêu cầu dạng mảng danh sách phẳng, dẫn đến lỗi parse schema.",
      "C. Coordinator không đưa công cụ Task vào danh sách allowedTools của synthesis agent, ngăn cản nó gọi các hàm trích xuất log.",
      "D. Các subagent phân tích log thiếu không gian ngữ cảnh cô lập, gây ra tranh chấp tên biến giữa các payload kết quả của worker."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A incorrectly attributes the failure to execution order and timeouts; the error is a schema parsing crash caused by payload structural mismatch.",
      "Option B correctly identifies that the schema structural mismatch between the coordinator's nested object serialization and the synthesis subagent's expected flat array format caused the parse error.",
      "Option C wrongly points to tool authorization; the error occurs during input payload parsing within the synthesis agent, not during subagent tool invocation.",
      "Option D misdiagnoses the issue as context leakage between workers; the workers executed independently and returned valid data, but the coordinator structured the combined payload incorrectly."
    ],
    "rationale": "Subagent invocation context must conform exactly to the input schema expected by the receiving agent. When the coordinator wraps worker outputs into a nested dictionary structure {\"results\": {...}} instead of the expected flat array [...], the synthesis agent's context parser fails to deserialize the payload, triggering a runtime parse error. Flattening the context payload array aligns the coordinator's output with the synthesis agent's input specification.",
    "explanation": "Đáp án A sai: Sự cố là do xung đột cấu trúc dữ liệu payload (mảng phẳng vs đối tượng lồng nhau), không liên quan đến thứ tự thực thi tuần tự hay timeout.\\nĐáp án B đúng: Trình parse của synthesis subagent được thiết kế để nhận danh sách phẳng các đối tượng kết quả, nên việc coordinator truyền vào một dictionary lồng nhau khiến việc đọc dữ liệu bị lỗi schema parsing.\\nĐáp án C sai: Lỗi xảy ra ngay ở bước parse ngữ cảnh đầu vào của synthesis subagent chứ không phải do thiếu công cụ thực thi Task.\\nĐáp án D sai: Các worker subagent hoạt động độc lập và trả về kết quả hợp lệ; lỗi xảy ra ở cách coordinator cấu trúc lại dữ liệu trước khi gửi cho synthesis subagent.",
    "scenarioSignature": {
      "testedPrinciple": "subagent input schema context formatting",
      "failureMode": "runtime parse error during context deserialization",
      "rootCause": "structural mismatch between coordinator nested context dictionary and synthesis agent flat array expectation",
      "requiredFix": "format coordinator aggregated output as a flat list matching synthesis agent schema"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]