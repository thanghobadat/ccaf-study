[
  {
    "id": "d1-b03-B-017",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-017",
    "scenarioSignature": {
      "testedPrinciple": "Multi-round subagent convergence control",
      "failureMode": "Unbounded multi-round subagent execution loop",
      "rootCause": "Convergence evaluation condition lacks maximum iteration limit or delta progress check",
      "requiredFix": "Implement hard iteration limit and plateau threshold for multi-round coordinator loop"
    },
    "questionEN": "A market intelligence platform, MarketIntel-v3, uses a multi-round coordinator pattern to synthesize competitive research. In each round, the coordinator spawns ResearchWorker subagents and computes a confidence_score aggregate from the gathered source documents. The coordinator loop is configured to continue spawning research rounds until confidence_score > 0.90. However, due to contradictory source data across repositories, the achievable confidence score is capped at 0.84. The system enters an infinite loop of subagent re-invocations, breaching API token quotas and causing gateway timeouts. How should the orchestrator architecture be modified to resolve this failure?",
    "question": "[d1-b03-B-017] Một hệ thống phân tích thị trường, MarketIntel-v3, sử dụng mô hình điều phối đa vòng (multi-round coordinator) để tổng hợp báo cáo cạnh tranh. Ở mỗi vòng, coordinator khởi tạo các subagent ResearchWorker và tính toán giá trị confidence_score dựa trên các tài liệu thu thập được. Vòng lặp điều phối được thiết lập chạy cho đến khi confidence_score > 0.90. Tuy nhiên, do dữ liệu nguồn có các thông tin mâu thuẫn, confidence_score tối đa chỉ đạt 0.84. Hệ thống rơi vào vòng lặp vô hạn liên tục khởi tạo lại các subagent, làm vượt định ngạch API token và dẫn đến gateway timeout. Kiến trúc điều phối cần thay đổi như thế nào để khắc phục sự cố này?",
    "optionsEN": [
      "A. Introduce a strict maximum round limit (max_rounds) along with a confidence delta check to terminate execution when confidence plateaus.",
      "B. Increase the timeout_seconds configuration parameter on subagent tasks to allow deeper web crawling per round.",
      "C. Modify the subagent system prompt to append an incremental +0.05 confidence boost for each consecutive round executed.",
      "D. Forward the entire accumulated prompt transcript from prior rounds into each new subagent context to force re-evaluation of conflicting data."
    ],
    "options": [
      "A. Bổ sung giới hạn số vòng tối đa nghiêm ngặt (max_rounds) kết hợp kiểm tra độ thay đổi (delta) của điểm tin cậy để dừng tiến trình khi confidence bị chững lại.",
      "B. Tăng tham số cấu hình timeout_seconds cho các subagent task để cho phép cào dữ liệu web sâu hơn trong mỗi vòng.",
      "C. Điều chỉnh system prompt của subagent để tự động cộng thêm +0.05 vào điểm tin cậy sau mỗi vòng thực thi tiếp theo.",
      "D. Chuyển toàn bộ lịch sử hội thoại tích lũy từ các vòng trước vào context của subagent mới để buộc nó đánh giá lại các dữ liệu mâu thuẫn."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Setting a hard max_rounds limit and checking for confidence score convergence plateaus ensures the coordinator terminates gracefully or escalates to fallback logic when conflicting data prevents reaching the target threshold.",
      "Option B is incorrect because increasing timeout_seconds per task only extends execution duration of individual subagents but does not break the infinite multi-round loop triggered by the unachievable confidence threshold.",
      "Option C is incorrect because artificially boosting confidence_score tricks the coordinator into exiting with inaccurate confidence metrics, masking underlying data contradictions rather than properly controlling convergence.",
      "Option D is incorrect because injecting the full raw transcript bloats the context window and increases token costs without establishing a termination condition for the multi-round loop."
    ],
    "rationale": "Enforcing a hard maximum round cap (max_rounds) and detecting score plateaus prevents infinite subagent spawning loops when target confidence thresholds cannot be satisfied due to conflicting source data.",
    "explanation": "Lựa chọn A là đáp án đúng vì trong mô hình điều phối đa vòng (multi-round orchestration), việc thiết lập điều kiện dừng chỉ dựa trên điểm tin cậy (confidence threshold) mà không có giới hạn số vòng tối đa (max_rounds) hoặc kiểm tra độ chênh lệch (delta plateau) sẽ gây ra rủi ro vòng lặp vô hạn khi dữ liệu nguồn mâu thuẫn. Việc áp dụng giới hạn max_rounds và dừng sớm khi điểm tin cậy không tăng thêm giúp coordinator kiểm soát tài nguyên và xử lý hạ cấp (fallback) an toàn. Lựa chọn B sai vì tăng timeout không khắc phục được điều kiện dừng của vòng lặp điều phối. Lựa chọn C sai vì tự cộng điểm tin cậy làm méo mó chỉ số đánh giá và che giấu sai số dữ liệu. Lựa chọn D sai vì chuyển toàn bộ transcript làm quá tải context window mà không giải quyết được vấn đề lặp.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-018",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-018",
    "scenarioSignature": {
      "testedPrinciple": "Structured subagent result aggregation",
      "failureMode": "Redundant duplicated information in aggregated output",
      "rootCause": "Coordinator concatenates unstructured prose summaries without entity deduplication",
      "requiredFix": "Require structured subagent outputs and programmatically deduplicate canonical entities before synthesis"
    },
    "questionEN": "A cybersecurity auditing tool, SecurityAudit-v2, spawns 5 parallel subagents to analyze separate microservice repositories. Each subagent returns its findings as a freeform text string via the response_text field. The coordinator synthesizes the final security report by directly concatenating these 5 prose strings into a single output document. Because 3 subagents independently discovered the same shared library vulnerability (CVE-2024-3094), the final report repeats the identical finding 3 separate times across different sections. What is the optimal architectural pattern to resolve this duplication issue?",
    "question": "[d1-b03-B-018] Một hệ thống kiểm tra an ninh mạng, SecurityAudit-v2, khởi tạo 5 subagent song song để phân tích các kho mã nguồn microservice độc lập. Mỗi subagent trả về kết quả dưới dạng văn bản tự do (prose string) qua trường response_text. Coordinator tổng hợp báo cáo cuối cùng bằng cách nối (concatenate) 5 chuỗi văn bản này lại với nhau. Do 3 subagent cùng phát hiện một lỗ hổng thư viện dùng chung (CVE-2024-3094), báo cáo cuối cùng xuất ra bị lặp lại cùng một nội dung phát hiện đến 3 lần. Giải pháp kiến trúc nào là tốt nhất để giải quyết triệt để vấn đề này?",
    "optionsEN": [
      "A. Reconfigure the coordinator to run subagents sequentially, passing prior prose summaries so each subagent can manually avoid writing about previously reported vulnerabilities.",
      "B. Require subagents to return structured JSON arrays with normalized fields (vulnerability_id, severity, affected_component) so the coordinator can programmatically deduplicate entries before synthesis.",
      "C. Set the coordinator's generation temperature to 0.9 during output concatenation to rephrase repeated paragraphs with varied phrasing.",
      "D. Apply a regex-based string length filter on the response_text field to drop subagent prose summaries that exceed 500 words prior to aggregation."
    ],
    "options": [
      "A. Cấu hình lại coordinator để chạy các subagent tuần tự, chuyển tóm tắt dạng văn bản của các vòng trước để subagent sau tự bỏ qua lỗ hổng đã được báo cáo.",
      "B. Yêu cầu subagent trả về mảng JSON có cấu trúc với các trường chuẩn hóa (vulnerability_id, severity, affected_component) để coordinator có thể lập trình lọc trùng (deduplicate) trước khi tổng hợp.",
      "C. Thiết lập tham số temperature của coordinator lên 0.9 khi nối đầu ra để diễn đạt lại các đoạn văn bị lặp bằng các mẫu câu khác nhau.",
      "D. Áp dụng bộ lọc độ dài chuỗi dựa trên regex đối với trường response_text để loại bỏ các tóm tắt văn bản vượt quá 500 từ trước khi gom nhóm."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because passing raw prose sequentially introduces latency, bloats context windows, and relies on LLM self-censorship rather than reliable programmatic deduplication.",
      "Option B (Correct): Enforcing structured JSON responses with canonical key fields (e.g., vulnerability_id) enables the coordinator to perform deterministic entity deduplication and merging before aggregating findings into the final report.",
      "Option C is incorrect because increasing temperature merely alters wording without eliminating the duplicate security finding, making the report misleading and inconsistent.",
      "Option D is incorrect because dropping outputs based strictly on word count risks discarding unique critical findings while failing to deduplicate shorter repeated entries."
    ],
    "rationale": "Programmatic result synthesis requires subagents to output structured schema data rather than freeform prose, allowing the coordinator to deterministically deduplicate identical entities (such as CVE identifiers) before generating the consolidated report.",
    "explanation": "Lựa chọn B là đáp án đúng vì trong bài toán tổng hợp kết quả (result synthesis), việc thu thập văn bản tự do (prose summaries) rồi nối trực tiếp làm coordinator không thể lọc trùng dữ liệu một cách tin cậy. Bằng cách ép buộc subagent trả về định dạng JSON có cấu trúc chứa các trường định danh chuẩn (như vulnerability_id), coordinator có thể thực hiện deduplication theo lập trình (programmatic deduplication) chính xác tuyệt đối trước khi tạo báo cáo. Lựa chọn A sai vì chạy tuần tự và truyền prose gây lãng phí tài nguyên, tốn context và không đảm bảo lọc sạch trùng lặp. Lựa chọn C sai vì tăng temperature chỉ làm thay đổi cách viết câu chứ không xóa được thông tin trùng. Lựa chọn D sai vì lọc theo độ dài từ có nguy cơ làm mất các phát hiện quan trọng khác.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]