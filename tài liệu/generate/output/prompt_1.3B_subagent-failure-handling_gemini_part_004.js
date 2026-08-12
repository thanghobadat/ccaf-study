[
  {
    "id": "d1-b03-B-007",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-007",
    "scenarioSignature": {
      "testedPrinciple": "multi-round context propagation via targeted coordinator payload injection",
      "failureMode": "context pollution and token limit exhaustion in multi-stage subagent execution",
      "rootCause": "passing complete multi-stage execution history instead of isolated subtask payloads",
      "requiredFix": "coordinator parses round-1 structured output and injects single-document context per round-2 subagent task"
    },
    "questionEN": "A knowledge discovery pipeline built on DocuMind-Hub uses a two-round subagent architecture to process compliance audits. In Round 1, three parallel discovery subagents scan a 5,000-file repository and identify 3 highly relevant PDF files, returning a structured JSON payload containing {doc_id, relevance_score, raw_file_uri}. The coordinator must now spawn Round 2 subagents to perform exhaustive rule extraction on each identified document. Which context-passing design correctly orchestrates Round 2 while enforcing context isolation and preventing token overflow?",
    "question": "[d1-b03-B-007] Một đường ống khám phá trí thức xây dựng trên DocuMind-Hub sử dụng kiến trúc subagent hai vòng để xử lý kiểm toán tuân thủ. Trong Vòng 1, ba subagent khám phá chạy song song để quét kho 5.000 tệp và xác định được 3 tệp PDF có độ liên quan cao nhất, trả về payload JSON có cấu trúc chứa {doc_id, relevance_score, raw_file_uri}. Coordinator hiện phải khởi tạo các subagent Vòng 2 để trích xuất quy tắc chuyên sâu trên từng tài liệu đã chọn. Thiết kế truyền ngữ cảnh nào điều phối đúng Vòng 2 mà vẫn đảm bảo cô lập ngữ cảnh và ngăn chặn tràn giới hạn token?",
    "optionsEN": [
      "A. Pass the entire Round 1 execution history, raw discovery logs, and all 3 document references as a single shared context block to each Round 2 subagent.",
      "B. Allow Round 1 discovery subagents to directly instantiate Round 2 subagents via peer-to-peer invocation, bypassing coordinator aggregation.",
      "C. Have the coordinator parse the Round 1 JSON response, extract each document's {doc_id, raw_file_uri} payload, and spawn individual Round 2 subagents with isolated Task prompts containing only their assigned document context.",
      "D. Persist Round 1 discovery outputs into the coordinator's main conversation context and rely on subagents inheriting the coordinator's active history automatically."
    ],
    "options": [
      "A. Truyền toàn bộ lịch sử thực thi Vòng 1, nhật ký khám phá thô và cả 3 tham chiếu tài liệu dưới dạng một khối ngữ cảnh chung duy nhất cho mỗi subagent Vòng 2.",
      "B. Cho phép các subagent khám phá Vòng 1 trực tiếp khởi tạo các subagent Vòng 2 thông qua gọi ngang hàng (peer-to-peer), bỏ qua bước tổng hợp của coordinator.",
      "C. Yêu cầu coordinator phân tích phản hồi JSON từ Vòng 1, trích xuất payload {doc_id, raw_file_uri} của từng tài liệu và khởi tạo các subagent Vòng 2 riêng biệt với prompt Task được cô lập chỉ chứa ngữ cảnh tài liệu được phân công.",
      "D. Lưu kết quả khám phá Vòng 1 vào ngữ cảnh hội thoại chính của coordinator và dựa vào việc subagent tự động thừa hưởng toàn bộ lịch sử đang hoạt động của coordinator."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Passing the unparsed complete Round 1 transcript and all 3 documents to every Round 2 subagent causes severe context pollution, wastes input tokens on irrelevant documents, and risks exceeding model context limits.",
      "Option B is incorrect: Direct subagent-to-subagent invocation breaks the central hub-and-spoke coordination model, resulting in loss of audit trace, failure visibility, and centralized state control.",
      "Option C is correct: The coordinator acts as a context router by parsing Round 1 structured output and launching individual Round 2 subagents with strictly isolated Task context containing only the specific document parameters needed.",
      "Option D is incorrect: Subagents operate in isolated invocation environments and do not implicitly inherit the coordinator's ambient chat history unless explicit payload context is passed in the Task tool call."
    ],
    "rationale": "In multi-round subagent workflows, the coordinator must act as an explicit context boundary and payload router. By parsing Round 1's structured JSON output and passing only target-specific parameters ({doc_id, raw_file_uri}) to individual Round 2 subagents, the system maintains strict context isolation, avoids context bloat/token overflow, and preserves the hub-and-spoke architectural control.",
    "explanation": "Trong kiến trúc điều phối subagent nhiều vòng (multi-round subagent orchestration), coordinator đóng vai trò là ranh giới cô lập ngữ cảnh và bộ định tuyến dữ liệu.\n- Lựa chọn C đúng: Coordinator nhận kết quả dạng JSON có cấu trúc từ Vòng 1, trích xuất dữ liệu của từng tài liệu (doc_id, raw_file_uri), sau đó khởi tạo từng subagent Vòng 2 với prompt được cô lập hoàn toàn chỉ cho tệp đó. Điều này tối ưu số lượng token và tránh nhiễu ngữ cảnh giữa các tài liệu.\n- Lựa chọn A sai: Truyền toàn bộ lịch sử Vòng 1 và cả 3 tài liệu cho từng subagent Vòng 2 sẽ gây tràn bộ nhớ token (token overflow), lãng phí chi phí và làm giảm độ chính xác trích xuất của mô hình.\n- Lựa chọn B sai: Cho phép subagent Vòng 1 gọi trực tiếp subagent Vòng 2 (peer-to-peer) vi phạm nguyên tắc Hub-and-Spoke, làm coordinator mất khả năng theo dõi trạng thái, ghi log kiểm toán và quản lý lỗi tập trung.\n- Lựa chọn D sai: Subagent không tự động truy cập hay thừa hưởng lịch sử hội thoại nội bộ của coordinator ngoại trừ các thông tin được truyền tường minh qua tham số của công cụ Task.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-008",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-008",
    "scenarioSignature": {
      "testedPrinciple": "dynamic iterative decomposition of variable runtime subtasks",
      "failureMode": "inability to scale analysis or context window exhaustion when processing runtime-discovered items",
      "rootCause": "using fixed pre-planned worker allocation or monolithic bundling instead of dynamic fan-out",
      "requiredFix": "coordinator dynamically spawns parallel subagent instances based on discovery array length"
    },
    "questionEN": "An enterprise legal research agent built on LexiSearch-AI processes precedent analysis for complex litigation. The coordinator first executes a discovery subagent that queries a case database and dynamically returns a list of 12 relevant case precedents containing {case_id, statute_citation, brief_uri}. Because the number of precedents cannot be predicted before query execution, how should the coordinator orchestrate the detailed analysis stage while preserving context purity and execution scalability?",
    "question": "[d1-b03-B-008] Một tác vụ nghiên cứu pháp lý doanh nghiệp xây dựng trên LexiSearch-AI xử lý phân tích án lệ cho các vụ tranh tụng phức tạp. Coordinator trước tiên thực thi một subagent khám phá để truy vấn cơ sở dữ liệu án lệ và trả về động một danh sách 12 án lệ liên quan chứa {case_id, statute_citation, brief_uri}. Vì số lượng án lệ không thể dự đoán trước khi truy vấn thực thi, coordinator nên điều phối giai đoạn phân tích chi tiết như thế nào để vừa duy trì sự tinh sạch ngữ cảnh vừa đảm bảo khả năng mở rộng thực thi?",
    "optionsEN": [
      "A. Hardcode a fixed pool of 4 analysis subagents during initial system prompt design, truncating any discovered cases beyond 4 to fit pre-allocated worker threads.",
      "B. Bundle all 12 case records into a single multi-document prompt and invoke one monolithic analysis subagent to process all cases in a single pass.",
      "C. Sequentially invoke a single subagent across 12 consecutive dialogue turns, appending each case report to the subagent's ongoing context window.",
      "D. Parse the 12-element case array from the discovery output and dynamically instantiate 12 parallel per-case analysis subagents, passing individual case metadata into each Task call."
    ],
    "options": [
      "A. Cố định cứng một nhóm 4 subagent phân tích trong thiết kế prompt hệ thống ban đầu, cắt bỏ mọi án lệ tìm thấy vượt quá 4 để vừa với các luồng xử lý đã cấp phát trước.",
      "B. Gộp toàn bộ 12 bản ghi án lệ vào một prompt đa tài liệu duy nhất và gọi một subagent phân tích đơn khối để xử lý tất cả án lệ trong một lượt.",
      "C. Gọi tuần tự một subagent duy nhất qua 12 lượt hội thoại liên tiếp, nối thêm báo cáo của từng án lệ vào cửa sổ ngữ cảnh đang chạy của subagent đó.",
      "D. Phân tích mảng 12 án lệ từ kết quả khám phá và khởi tạo động 12 subagent phân tích từng án lệ song song, truyền siêu dữ liệu của từng án lệ vào từng lệnh gọi Task."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Hardcoding a fixed worker count forces arbitrary truncation of discovered evidence, destroying pipeline accuracy when dynamic results exceed pre-allocated limits.",
      "Option B is incorrect: Combining 12 legal precedents into a single subagent prompt creates massive context overload, degrading model reasoning performance and increasing risk of hallucination or context cutoff.",
      "Option C is incorrect: Running a single subagent sequentially across 12 turns creates an expensive performance bottleneck and continuously inflates context size, reducing speed and quality.",
      "Option D is correct: Iterative decomposition requires inspecting runtime discovery results and dynamically spawning one subagent per item in parallel, ensuring isolated subagent context and scalable execution."
    ],
    "rationale": "Iterative decomposition handles variable runtime workloads by separating discovery from processing. When dynamic discovery returns N items (e.g., 12 cases), the coordinator iterates over the output array and spawns N concurrent subagents. Each subagent receives targeted parameters for a single item, maximizing context purity, parallel speed, and processing accuracy.",
    "explanation": "Phân rã lặp (Iterative decomposition) là mẫu thiết kế tối ưu cho các bài toán mà số lượng tác vụ con không thể biết trước ở thời điểm thiết kế hệ thống.\n- Lựa chọn D đúng: Coordinator nhận danh sách 12 án lệ được trả về động từ subagent khám phá, sau đó lập lặp qua mảng 12 phần tử này để khởi tạo động 12 subagent phân tích song song. Mỗi subagent nhận siêu dữ liệu của riêng 1 án lệ trong công cụ Task, giúp cô lập ngữ cảnh, tối đa hóa tốc độ thực thi song song và duy trì chất lượng phân tích cao nhất.\n- Lựa chọn A sai: Cố định cứng (hardcode) số lượng subagent và cắt bỏ kết quả vượt quá sẽ làm mất dữ liệu án lệ quan trọng, gây sai lệch kết quả nghiên cứu pháp lý.\n- Lựa chọn B sai: Gộp cả 12 án lệ vào một subagent duy nhất làm quá tải cửa sổ ngữ cảnh (context overload), dẫn đến suy giảm khả năng suy luận chuyên sâu của mô hình.\n- Lựa chọn C sai: Chạy tuần tự 1 subagent qua 12 lượt sẽ làm tăng thời gian xử lý tổng thể và khiến ngữ cảnh tích lũy ngày càng phình to, lãng phí tài nguyên và làm chậm hệ thống.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]