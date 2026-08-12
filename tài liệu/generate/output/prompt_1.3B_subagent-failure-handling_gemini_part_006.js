[
  {
    "id": "d1-b03-B-011",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-011",
    "scenarioSignature": {
      "testedPrinciple": "Subagent audit trail tracking and output attribution",
      "failureMode": "Merged final report contains factual errors that cannot be traced back to the responsible subagent",
      "rootCause": "Coordinator concatenates raw prose output from subagents without preserving subagent ID metadata mapping",
      "requiredFix": "Coordinator must wrap each subagent output in a structured payload containing subagent_id and output content before merging"
    },
    "questionEN": "In a financial document auditing platform, FinDoc-Auditor-v2, the coordinator agent invokes 6 specialized subagents (tax_compliance, esg_metrics, debt_covenants, revenue_recognition, asset_valuation, audit_risk) in parallel to review a quarterly report. Each subagent returns free-form markdown prose. The coordinator concatenates these text blocks into a single final report. During compliance audit, a major error in EBITDA covenant compliance is flagged, but security auditors cannot determine which subagent produced the faulty statement because all subagent identifiers were stripped during text concatenation. Which coordinator modification resolves this auditability failure?",
    "question": "[d1-b03-B-011] Trong hệ thống phân tích báo cáo tài chính FinDoc-Auditor-v2, coordinator kích hoạt song song 6 subagent chuyên môn (tax_compliance, esg_metrics, debt_covenants, revenue_recognition, asset_valuation, audit_risk). Mỗi subagent trả về văn bản tự do dạng markdown. Coordinator nối các đoạn văn bản này lại thành một báo cáo tổng hợp. Khi phát hiện thông tin sai lệch về chỉ số EBITDA covenant, nhóm kiểm toán không thể xác định subagent nào đã tạo ra thông tin sai do metadata định danh subagent đã bị mất trong quá trình nối chuỗi prose. Thay đổi nào trong logic kích hoạt và tổng hợp của coordinator giải quyết triệt để lỗi mất vết kiểm toán (audit trail) này?",
    "optionsEN": [
      "A. Configure each subagent to directly write its section into a shared PostgreSQL database table with timestamp logs instead of returning prose to the coordinator.",
      "B. Lower the subagent model temperature to 0.0 and require all 6 subagents to perform cross-validation of each other's prose before submitting.",
      "C. Enforce a response schema where each subagent returns a structured payload { subagent_id, section_type, content, confidence_score } and have the coordinator maintain a structured provenance map in the final report metadata.",
      "D. Re-run the multi-agent workflow sequentially so that each subagent can append its name to the global system prompt transcript of the next subagent."
    ],
    "options": [
      "A. Cấu hình cho mỗi subagent ghi trực tiếp phần phân tích của mình vào bảng cơ sở dữ liệu PostgreSQL kèm timestamp thay vì trả prose về cho coordinator.",
      "B. Giảm nhiệt độ (temperature) của subagent xuống 0.0 và yêu cầu 6 subagent thực hiện kiểm tra chéo (cross-validation) văn bản của nhau trước khi gửi.",
      "C. Quy định schema phản hồi của subagent trả về định dạng structured payload { subagent_id, section_type, content, confidence_score } và coordinator duy trì ma trận nguồn gốc (provenance map) trong báo cáo.",
      "D. Chuyển toàn bộ quy trình multi-agent sang chạy tuần tự để mỗi subagent có thể nối thêm tên của mình vào system prompt transcript của subagent kế tiếp."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Having subagents write directly to a database bypasses coordinator aggregation, creates race conditions, and breaks subagent context isolation without solving in-memory provenance tracking.",
      "Option B is incorrect: Adjusting model temperature or requesting cross-validation does not establish an explicit metadata audit trail linking generated output blocks back to specific subagent IDs.",
      "Option C is correct: Requiring structured payloads with explicit subagent_id metadata allows the coordinator to build a deterministic provenance map, providing full auditability for every section of the aggregate output.",
      "Option D is incorrect: Sequential execution with transcript accumulation bloats the context window and relies on fragile prose parsing rather than robust structured metadata."
    ],
    "rationale": "When aggregating contributions from multiple subagents into a final output, concatenating raw prose discards execution metadata. To maintain auditability and trace errors back to specific subagents, the system must enforce a structured output schema containing subagent identifiers (subagent_id) and maintain a structured provenance map during synthesis.",
    "explanation": "Trong kiến trúc multi-agent, khi nhiều subagent cùng đóng góp vào báo cáo cuối cùng, việc ghép nối văn bản tự do (raw prose) làm thất lạc thông tin ngữ cảnh và định danh tác giả. Để khắc phục:\n- Đáp án A sai vì việc cho subagent ghi trực tiếp vào cơ sở dữ liệu làm phá vỡ mô hình hub-and-spoke của coordinator và không giải quyết được bài toán tổng hợp dữ liệu kèm provenance.\n- Đáp án B sai vì thay đổi temperature hay yêu cầu cross-validation không tạo ra cơ chế lưu vết metadata một cách xác thực.\n- Đáp án C đúng vì định dạng structured payload với trường subagent_id cho phép coordinator duy trì ma trận nguồn gốc (provenance map), đảm bảo bất kỳ đoạn thông tin nào cũng được truy vết chính xác về subagent đã tạo ra nó.\n- Đáp án D sai vì chạy tuần tự và dồn transcript làm quá tải ngữ cảnh (context overload) và không mang lại cấu trúc định danh chuẩn hóa.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-012",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-012",
    "scenarioSignature": {
      "testedPrinciple": "Citation tracking and reference preservation in subagent aggregation",
      "failureMode": "Final synthesized summary completely lacks source citations despite subagents finding valid references",
      "rootCause": "Coordinator summarizes subagent prose output using a prompt that fails to extract and retain structured citation metadata",
      "requiredFix": "Enforce structured citation schemas from research subagents and require coordinator to aggregate and re-link citations in the final output"
    },
    "questionEN": "In a medical research platform, MedPharma-Intel-v3, the coordinator agent spawns 4 specialized subagents (oncology_trials, immunology_data, pharmacokinetics, adverse_effects). Each subagent collects 5 authoritative clinical citations with URLs and DOI identifiers. However, when the coordinator synthesizes these 4 subagent reports using the prompt 'Summarize these 4 research outputs into an executive overview', the coordinator's model rewrites the findings as plain prose and drops all 20 source citations. Which architectural change guarantees citation tracking from subagents to the final synthesized deliverable?",
    "question": "[d1-b03-B-012] Trong công cụ nghiên cứu y khoa MedPharma-Intel-v3, coordinator kích hoạt 4 subagent nghiên cứu chuyên sâu (oncology_trials, immunology_data, pharmacokinetics, adverse_effects). Mỗi subagent tìm kiếm và thu thập 5 nguồn tài liệu uy tín kèm URL và mã DOI (doi:10.1016/...). Tuy nhiên, khi coordinator nhận kết quả và dùng prompt 'Tóm tắt 4 báo cáo nghiên cứu này thành một tổng quan điều hành', LLM của coordinator đã viết lại toàn bộ thành văn bản xuôi và loại bỏ hoàn toàn 20 trích dẫn nguồn. Giải pháp kiến trúc nào đảm bảo việc theo dõi trích dẫn (citation tracking) xuyên suốt từ subagent đến báo cáo cuối cùng?",
    "optionsEN": [
      "A. Configure subagents to execute an HTML renderer tool that embeds hyperlink tags directly into raw markdown prose before sending it to the coordinator.",
      "B. Instruct research subagents to append a plain-text bibliography block at the end of their text, while keeping the coordinator prompt unchanged.",
      "C. Increase the maximum token parameter (max_tokens) of the coordinator agent to 16,384 tokens to give the model sufficient generation capacity for references.",
      "D. Require subagents to return structured JSON containing explicit citations arrays ([{ citation_id, source_url, doi, snippet }]), and direct the coordinator to merge and re-link these citation objects into a dedicated reference index in the output."
    ],
    "options": [
      "A. Cấu hình cho mỗi subagent trực tiếp chạy công cụ HTML renderer để chèn thẻ liên kết (hyperlink) vào văn bản markdown thô trước khi gửi cho coordinator.",
      "B. Hướng dẫn các subagent nghiên cứu nối thêm một danh mục tài liệu tham khảo dạng plain-text ở cuối đoạn văn bản, đồng thời giữ nguyên prompt của coordinator.",
      "C. Tăng giới hạn sinh tối đa (max_tokens) của coordinator agent lên 16,384 tokens để mô hình có đủ dung lượng chứa tài liệu tham khảo.",
      "D. Yêu cầu subagent trả về structured output chứa mảng citations rõ ràng ([{ citation_id, source_url, doi, snippet }]), đồng thời chỉ đạo coordinator hợp nhất và kiểm tra mảng citation này để gắn kèm vào báo cáo cuối."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Embedding HTML hyperlinks in raw markdown text fails because the coordinator's LLM summarization step strips or rewrites inline HTML markup during text re-generation.",
      "Option B is incorrect: Appending unstructured plain-text bibliographies is ineffective because summarization prompts treat text blocks holistically and frequently drop trailing reference lists.",
      "Option C is incorrect: Increasing max_tokens increases model generation capacity but does not fix the underlying summarization behavior that discards unstructured reference text.",
      "Option D is correct: Structuring citations as dedicated JSON array metadata allows the coordinator to extract, deduplicate, and programmatically bind citation objects to the final synthesized document."
    ],
    "rationale": "Relying on unstructured text for citation preservation fails during coordinator summarization because LLMs tend to drop inline references when synthesizing prose. Enforcing a structured JSON output schema with explicit citations metadata arrays enables deterministic collection, deduplication, and mapping of references by the coordinator.",
    "explanation": "Khi các subagent thu thập dữ liệu có trích dẫn nguồn (citations), việc chuyển giao dữ liệu dưới dạng văn bản tự do khiến bước tóm tắt của coordinator dễ làm thất lạc nguồn dẫn. Phân tích chi tiết:\n- Đáp án A sai vì việc chèn thẻ HTML vào văn bản thô vẫn sẽ bị LLM coordinator loại bỏ hoặc biến dạng trong quá trình sinh lại văn bản (re-generation).\n- Đáp án B sai vì danh mục tài liệu tham khảo dạng plain-text ở cuối đoạn văn không có cấu trúc cố định, dễ bị prompt tóm tắt của coordinator lờ đi hoặc cắt bỏ.\n- Đáp án C sai vì tăng max_tokens chỉ tăng giới hạn chiều dài đầu ra chứ không điều hướng mô hình giữ lại các trích dẫn.\n- Đáp án D đúng vì việc bắt buộc các subagent trả về mảng citations dạng JSON structured metadata cho phép coordinator thu thập, khử trùng lặp và liên kết chính xác các nguồn tham khảo vào chỉ mục (reference index) ở báo cáo cuối.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]