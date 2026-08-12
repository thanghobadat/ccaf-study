[
  {
    "id": "d1-b03-new-009",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-009",
    "scenarioSignature": {
      "testedPrinciple": "parallel subagent execution for independent tasks",
      "failureMode": "excessive processing latency",
      "rootCause": "sequential execution of independent subagents",
      "requiredFix": "emit multiple task tool calls in a single coordinator response turn"
    },
    "questionEN": "In an enterprise HR onboarding pipeline named PeopleOps-Orchestrator, candidate processing requires executing a resume-parse subagent (takes 6.5s) to extract work history and a benefits-calc subagent (takes 6.0s) to calculate compensation tier options. Both subagents require only the candidate's initial candidate_id payload and do not depend on each other's outputs. Currently, the orchestrator invokes resume-parse via the Task tool, waits for the response tool message, and then invokes benefits-calc in a subsequent turn, resulting in a total pipeline execution time of 12.5s per candidate. Which architectural modification eliminates this unnecessary latency bottleneck?",
    "question": "[d1-b03-new-009] Trong một pipeline tuyển dụng nhân sự doanh nghiệp có tên PeopleOps-Orchestrator, quy trình xử lý ứng viên yêu cầu thực thi một subagent resume-parse (mất 6.5s) để trích xuất lịch sử làm việc và một subagent benefits-calc (mất 6.0s) để tính toán các gói phúc lợi. Cả hai subagent chỉ cần payload candidate_id ban đầu và không phụ thuộc vào kết quả của nhau. Hiện tại, điều phối viên gọi resume-parse thông qua tool Task, chờ tin nhắn phản hồi, sau đó mới gọi benefits-calc ở lượt tiếp theo, dẫn đến tổng thời gian xử lý là 12.5s cho mỗi ứng viên. Thay đổi kiến trúc nào sau đây giải quyết triệt để nút thắt cổ chai về độ trễ này?",
    "optionsEN": [
      "A. Modify the coordinator logic to issue two Task tool calls (resume-parse and benefits-calc) within a single model response turn, enabling parallel subagent execution and reducing batch latency to ~6.5s.",
      "B. Configure the resume-parse subagent to directly call the Task tool to invoke benefits-calc upon completing its parsing, passing its results along with the original candidate ID.",
      "C. Merge resume-parse and benefits-calc into a single monolith tool definition so that both operations execute inside a single subagent context window.",
      "D. Increase the max_tokens parameter and context window limit for the coordinator agent so it can process both subagents' tool responses in a single model turn."
    ],
    "options": [
      "A. Cấu hình logic điều phối viên phát ra hai lời gọi tool Task (resume-parse và benefits-calc) trong cùng một lượt phản hồi duy nhất của mô hình, cho phép thực thi song song các subagent và giảm độ trễ xuống ~6.5s.",
      "B. Cấu hình subagent resume-parse trực tiếp gọi tool Task để kích hoạt benefits-calc ngay khi hoàn thành việc trích xuất, truyền kết quả trích xuất cùng với candidate ID ban đầu.",
      "C. Gộp subagent resume-parse và benefits-calc thành một định nghĩa tool đơn khối (monolith) duy nhất để cả hai thao tác chạy trong cùng một cửa sổ ngữ cảnh subagent.",
      "D. Tăng tham số max_tokens và giới hạn cửa sổ ngữ cảnh cho mô hình điều phối viên để nó có thể xử lý các phản hồi tool của cả hai subagent trong một lượt duy nhất."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because emitting multiple Task tool calls in a single turn allows the runtime to execute independent subagents concurrently, reducing latency from the sum (12.5s) to the maximum single execution time (~6.5s).",
      "Option B is incorrect because subagents in a hub-and-spoke architecture must not invoke each other directly; peer-to-peer delegation breaks coordinator state management and result aggregation.",
      "Option C is incorrect because merging unrelated capabilities (resume parsing and benefits calculation) violates subagent domain isolation and overcomplicates context and tool boundaries.",
      "Option D is incorrect because adjusting max_tokens or context window limits affects generation length and memory capacity, not the turn-by-turn sequential execution schedule of subagents."
    ],
    "rationale": "Emitting multiple Task tool calls in a single assistant response turn allows the orchestration framework to spawn both subagents concurrently. Because resume parsing and benefits calculation depend only on the candidate_id and not on each other, parallel execution reduces total processing time from sum(T1 + T2) to max(T1, T2).",
    "explanation": "Lựa chọn A là đáp án đúng vì việc phát ra nhiều lời gọi tool Task trong một lượt phản hồi duy nhất cho phép khung điều phối (orchestration framework) thực thi đồng thời các subagent độc lập, giảm tổng thời gian xử lý từ tổng hai tác vụ (12.5s) xuống thời gian tác vụ lâu nhất (max(6.5s, 6.0s) = ~6.5s).\n\nLựa chọn B sai vì trong kiến trúc Hub-and-Spoke, các subagent không bao giờ giao tiếp hoặc gọi trực tiếp lẫn nhau; giao tiếp ngang hàng làm phá vỡ khả năng quản lý trạng thái và tổng hợp kết quả của điều phối viên.\n\nLựa chọn C sai vì việc gộp các trách nhiệm thuộc các miền khác nhau (phân tích hồ sơ và tính toán tài chính/phúc lợi) vi phạm nguyên tắc phân tách phạm vi tool và cô lập ngữ cảnh của subagent.\n\nLựa chọn D sai vì việc tăng max_tokens hoặc giới hạn ngữ cảnh chỉ ảnh hưởng đến độ dài văn bản sinh ra và dung lượng bộ nhớ, không làm thay đổi luồng thực thi tuần tự theo lượt của mô hình.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-010",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-010",
    "scenarioSignature": {
      "testedPrinciple": "concurrent subagent dispatch for independent document processing workflows",
      "failureMode": "excessive document review pipeline latency",
      "rootCause": "sequential orchestration of independent document analysis subagents",
      "requiredFix": "dispatch independent document subagents concurrently via parallel task calls"
    },
    "questionEN": "An enterprise document review system named DocInsight-Processor processes incoming application packets consisting of pre-processed attachment files. The coordinator invokes three subagents sequentially: identity-ocr (takes 15s), tax-classification (takes 15s), and income-extraction (takes 15s). Because each subagent operates on dedicated, non-overlapping attachment files in the packet, their executions are completely independent. However, because the coordinator dispatches each Task tool call in separate conversational turns, total packet processing takes 45s instead of 15s. Which design change resolves this performance issue?",
    "question": "[d1-b03-new-010] Một hệ thống xét duyệt tài liệu doanh nghiệp có tên DocInsight-Processor xử lý các gói hồ sơ đầu vào chứa các tệp đính kèm đã qua tiền xử lý. Điều phối viên hiện đang gọi lần lượt ba subagent: identity-ocr (mất 15s), tax-classification (mất 15s), và income-extraction (mất 15s). Do mỗi subagent hoạt động trên các tệp đính kèm riêng biệt, không chồng chéo trong gói hồ sơ, việc thực thi của chúng hoàn toàn độc lập. Tuy nhiên, do điều phối viên kích hoạt từng lời gọi tool Task ở các lượt hội thoại riêng biệt, tổng thời gian xử lý gói hồ sơ mất 45s thay vì 15s. Thay đổi thiết kế nào sau đây giải quyết vấn đề hiệu năng này?",
    "optionsEN": [
      "A. Direct each subagent to append its output directly to a shared system prompt memory block so that the next subagent in the sequence can skip reading raw attachment files.",
      "B. Update the coordinator agent to emit three Task tool calls concurrently in a single response turn, enabling parallel execution of identity-ocr, tax-classification, and income-extraction subagents to reduce total processing latency to 15s.",
      "C. Remove the Task tool authorization from the subagents and grant all document processing tools directly to the primary coordinator agent to eliminate subagent spawning overhead.",
      "D. Modify the subagents to communicate peer-to-peer over a local WebSocket mesh network, bypassing the coordinator agent during intermediate extraction steps."
    ],
    "options": [
      "A. Hướng dẫn từng subagent ghi trực tiếp kết quả vào một khối bộ nhớ system prompt chung để subagent tiếp theo trong chuỗi có thể bỏ qua bước đọc các tệp đính kèm thô.",
      "B. Cập nhật agent điều phối viên để phát ra đồng thời ba lời gọi tool Task trong một lượt phản hồi duy nhất, kích hoạt thực thi song song các subagent identity-ocr, tax-classification và income-extraction nhằm giảm tổng độ trễ xử lý xuống 15s.",
      "C. Thu hồi quyền sử dụng tool Task khỏi các subagent và cấp toàn bộ các tool xử lý tài liệu trực tiếp cho agent điều phối viên chính để loại bỏ chi phí khởi tạo subagent.",
      "D. Sửa đổi các subagent để chúng giao tiếp ngang hàng (peer-to-peer) qua mạng lưới WebSocket nội bộ, bỏ qua agent điều phối viên trong các bước trích xuất trung gian."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because mutating system prompts or shared memory blocks does not alter the sequential dispatch mechanism of the coordinator and introduces race conditions across independent tasks.",
      "Option B is correct because issuing multiple Task tool calls in a single coordinator output turn triggers concurrent subagent invocation, reducing total latency for independent tasks from sum(15s + 15s + 15s = 45s) to max(15s) = 15s.",
      "Option C is incorrect because loading all document processing tools into the root coordinator creates context bloat and tool choice ambiguity, destroying the specialized subagent architecture.",
      "Option D is incorrect because peer-to-peer WebSocket messaging between subagents violates hub-and-spoke orchestration principles where all context routing and aggregation must be handled by the coordinator."
    ],
    "rationale": "When subagents perform independent operations on separate components of a document packet, sequential invocation creates unnecessary end-to-end latency equal to the sum of individual execution times (45s). By updating the coordinator to emit all three Task tool calls in a single response turn, the runtime executes the subagents in parallel, bringing latency down to the maximum single subagent duration (15s).",
    "explanation": "Lựa chọn A sai vì việc sửa đổi system prompt hoặc khối bộ nhớ chung không làm thay đổi cơ chế gọi tuần tự của điều phối viên và dễ gây xung đột dữ liệu (race conditions) giữa các tác vụ độc lập.\n\nLựa chọn B là đáp án đúng vì việc phát ra nhiều lời gọi tool Task trong cùng một lượt phát xuất của điều phối viên sẽ kích hoạt thực thi subagent song song, giảm tổng độ trễ của các tác vụ độc lập từ tổng thời gian (15s + 15s + 15s = 45s) xuống thời gian của subagent đơn lẻ dài nhất (15s).\n\nLựa chọn C sai vì việc đưa tất cả tool xử lý tài liệu vào agent điều phối viên gốc sẽ làm quá tải ngữ cảnh và gây nhầm lẫn khi chọn tool, làm sụp đổ kiến trúc subagent chuyên biệt.\n\nLựa chọn D sai vì việc giao tiếp ngang hàng qua WebSocket giữa các subagent vi phạm nguyên tắc điều phối Hub-and-Spoke, nơi mọi việc định tuyến ngữ cảnh và tổng hợp kết quả bắt buộc phải do điều phối viên xử lý.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]