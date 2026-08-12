[
  {
    "id": "d1-b03-B-003",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-003",
    "questionEN": "A medical records coordinator agent invokes a lab-result subagent to retrieve panel data for Patient ID PAT-8821. The lab-result subagent encounters a lookup failure and returns {\"status\": \"failure\", \"error\": \"patient_not_found\"}. However, the coordinator agent checks only the tool execution status code (status: 200 OK) and directly appends the raw JSON payload into the final clinical summary, reporting to the physician that lab data was successfully fetched. What is the root failure in this coordinator architecture?",
    "question": "[d1-b03-B-003] Một agent coordinator trong hệ thống hồ sơ y tế gọi một subagent kết quả xét nghiệm để truy xuất dữ liệu bảng điều khiển cho Bệnh nhân ID PAT-8821. Subagent kết quả xét nghiệm gặp lỗi tìm kiếm và trả về {\"status\": \"failure\", \"error\": \"patient_not_found\"}. Tuy nhiên, coordinator agent chỉ kiểm tra mã trạng thái thực thi công cụ (status: 200 OK) và trực tiếp chèn payload JSON thô vào bản tóm tắt lâm sàng cuối cùng, báo cáo với bác sĩ rằng dữ liệu xét nghiệm đã được lấy thành công. Lỗi gốc trong kiến trúc coordinator này là gì?",
    "optionsEN": [
      "A. The lab-result subagent failed to retry its internal database query when patient_not_found was raised.",
      "B. The coordinator failed to grant the lab-result subagent write permissions to create a missing patient record.",
      "C. The coordinator treated tool execution completion as functional success without evaluating the internal error schema (error: patient_not_found) in the subagent output payload.",
      "D. The coordinator should have passed the full patient medical history in the initial subagent prompt to avoid the lookup failure."
    ],
    "options": [
      "A. Subagent kết quả xét nghiệm đã không thử lại truy vấn cơ sở dữ liệu nội bộ khi patient_not_found được tạo ra.",
      "B. Coordinator đã không cấp quyền ghi cho subagent kết quả xét nghiệm để tạo hồ sơ bệnh nhân còn thiếu.",
      "C. Coordinator đã coi việc hoàn tất thực thi công cụ là thành công về mặt chức năng mà không đánh giá schema lỗi nội bộ (error: patient_not_found) trong payload đầu ra của subagent.",
      "D. Coordinator lẽ ra nên truyền toàn bộ lịch sử y tế của bệnh nhân trong prompt ban đầu của subagent để tránh lỗi tìm kiếm."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Internal retries by the subagent cannot resolve a non-existent patient ID error (patient_not_found), nor does it fix the coordinator's misinterpretation of error payloads.",
      "Option B is incorrect: Read-only query subagents should not create patient records, and granting write permissions does not address the error parsing flaw.",
      "Option C is correct: The coordinator mistook the successful execution of the subagent tool invocation for business/functional success, failing to inspect the payload's error field before treating the result as valid lab data.",
      "Option D is incorrect: Passing full patient history inflates context unnecessarily and does not prevent or fix the missing payload validation when patient_not_found occurs."
    ],
    "rationale": "The coordinator must inspect the structured response payload returned by subagents for explicit error flags (such as error: patient_not_found) rather than assuming that successful subagent execution equates to functional success.",
    "explanation": "Lựa chọn A sai vì việc tự động thử lại của subagent không thể giải quyết được mã lỗi bệnh nhân không tồn tại và không sửa được lỗi coordinator đọc sai kết quả.\\nLựa chọn B sai vì subagent truy vấn chỉ đọc không nên có quyền ghi tạo bệnh nhân mới, và điều này không khắc phục được lỗi phân tích dữ liệu.\\nLựa chọn C đúng vì coordinator đã nhầm lẫn giữa việc công cụ thực thi thành công (HTTP status 200) với kết quả nghiệp vụ thành công. Coordinator cần kiểm tra trường error trong payload JSON trước khi hợp nhất dữ liệu.\\nLựa chọn D sai vì truyền toàn bộ lịch sử bệnh nhân gây lãng phí context và không giải quyết được việc thiếu bước kiểm tra lỗi trong dữ liệu trả về.",
    "scenarioSignature": {
      "testedPrinciple": "subagent error payload verification",
      "failureMode": "coordinator processes error response payload as valid functional success",
      "rootCause": "evaluating execution status code instead of domain error fields in subagent payload",
      "requiredFix": "inspect subagent payload error fields before aggregating results into coordinator output"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-004",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-004",
    "questionEN": "An e-discovery coordinator agent spawns 10 document-review subagents in parallel to analyze legal evidence files. Each subagent returns a JSON response containing analyzed_pages, total_pages, and a status field (\"COMPLETE\" vs \"PARTIAL_TIMEOUT\"). Subagent #4 times out after analyzing 45 out of 100 pages and returns status: \"PARTIAL_TIMEOUT\". The coordinator directly concatenates all subagent summaries into the final court compliance report without inspecting the status or page count fields, leading to undisclosed missing evidence analysis. Which architectural modification fixes this vulnerability?",
    "question": "[d1-b03-B-004] Một agent coordinator e-discovery khởi chạy 10 subagent xem xét tài liệu song song để phân tích các tệp bằng chứng pháp lý. Mỗi subagent trả về một phản hồi JSON chứa analyzed_pages, total_pages và một trường status (\"COMPLETE\" so với \"PARTIAL_TIMEOUT\"). Subagent thứ 4 bị hết giờ sau khi phân tích 45 trên 100 trang và trả về status: \"PARTIAL_TIMEOUT\". Coordinator trực tiếp nối tất cả các tóm tắt của subagent vào báo cáo tuân thủ tòa án cuối cùng mà không kiểm tra trường status hoặc số lượng trang, dẫn đến việc thiếu phân tích bằng chứng mà không được phát hiện. Sự thay đổi kiến trúc nào sẽ khắc phục lỗ hổng này?",
    "optionsEN": [
      "A. Increase the execution timeout limit for all document-review subagents to ensure every document completes in a single run.",
      "B. Configure the document-review subagents to write their findings directly into a shared global database to bypass coordinator aggregation.",
      "C. Switch the coordinator from parallel subagent invocation to sequential execution to prevent subagent process timeouts.",
      "D. Implement completion status validation in the coordinator to detect partial outputs, triggering targeted retries or explicit completeness flags in the final report."
    ],
    "options": [
      "A. Tăng thời gian chờ (timeout) thực thi cho tất cả các subagent xem xét tài liệu để đảm bảo mọi tài liệu hoàn thành trong một lần chạy.",
      "B. Cấu hình các subagent xem xét tài liệu để ghi trực tiếp kết quả vào cơ sở dữ liệu chung nhằm bỏ qua bước tổng hợp của coordinator.",
      "C. Chuyển coordinator từ gọi subagent song song sang thực thi tuần tự để ngăn ngừa lỗi quá thời gian của tiến trình subagent.",
      "D. Triển khai bước xác thực trạng thái hoàn thành trong coordinator để phát hiện đầu ra một phần, kích hoạt thử lại có mục tiêu hoặc gắn cờ hoàn thành rõ ràng trong báo cáo cuối cùng."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Increasing timeouts does not guarantee completion for larger files or resource bottlenecks and fails to handle unexpected runtime cutoffs.",
      "Option B is incorrect: Direct database writes violate the subagent context isolation and hub-and-spoke architecture, while failing to inform the coordinator of incomplete documents.",
      "Option C is incorrect: Sequential execution significantly degrades pipeline throughput and does not solve the root cause of unvalidated subagent completion flags.",
      "Option D is correct: The coordinator must validate the subagent output metadata (status, analyzed_pages vs total_pages) to detect partial completions before synthesizing the final output, ensuring unanalyzed document chunks are retried or reported."
    ],
    "rationale": "Coordinators aggregating batch subagent responses must inspect completion metadata (such as completion flags or processed page counts) to ensure all subtasks succeeded completely before declaring batch task completion.",
    "explanation": "Lựa chọn A sai vì tăng timeout không đảm bảo xử lý xong với các tệp lớn hơn hoặc sự cố tài nguyên, và không giải quyết được việc phát hiện phản hồi chưa hoàn tất.\\nLựa chọn B sai vì ghi trực tiếp vào cơ sở dữ liệu vi phạm mô hình hub-and-spoke và cách ly context, đồng thời không thông báo cho coordinator về các tài liệu bị dở dang.\\nLựa chọn C sai vì thực thi tuần tự làm giảm đáng kể hiệu năng và không giải quyết tận gốc việc thiếu bước kiểm tra cờ hoàn thành từ subagent.\\nLựa chọn D đúng vì coordinator bắt buộc phải kiểm tra metadata trạng thái (status, số trang đã phân tích so với tổng số trang) để phát hiện các tác vụ chỉ hoàn thành một phần, từ đó thực hiện retry hoặc báo cáo chính xác.",
    "scenarioSignature": {
      "testedPrinciple": "subagent batch completion metadata verification",
      "failureMode": "coordinator aggregates incomplete subagent outputs into final deliverable",
      "rootCause": "omitting verification of completion status flags in subagent response metadata",
      "requiredFix": "validate subagent completion status fields before aggregating batch results"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]