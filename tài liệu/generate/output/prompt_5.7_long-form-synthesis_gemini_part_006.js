[
  {
    "id": "d5-b12-5.7-011",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-011",
    "questionEN": "An asynchronous document synthesis pipeline (LongDocSynthesizer) delegates sub-topic extraction across 8 parallel worker processes (SectionSynthesisWorker). Each worker extracts insights from distinct document sections and assigns ad-hoc local identifiers to citations (for example, Worker A labels a reference as source_id: \"sec_4_pdf\", while Worker B labels the exact same primary document as source_id: \"doc_vol2_p14\"). When ReportAggregator merges the section JSON outputs containing {claim, source_id, confidence}, cross-referencing fails, producing duplicate citation entries and broken provenance chains in the final synthesis. Which architectural enhancement resolves this inconsistent citation identity across parallel workers?",
    "question": "[d5-b12-5.7-011] Một pipeline tổng hợp tài liệu bất đồng bộ (LongDocSynthesizer) phân chia việc trích xuất chủ đề phụ cho 8 tiến trình công nhân song song (SectionSynthesisWorker). Mỗi worker trích xuất thông tin từ các phần tài liệu khác nhau và tự gán các định danh cục bộ tự phát cho các trích dẫn (ví dụ: Worker A gắn nhãn một tham chiếu là source_id: \"sec_4_pdf\", trong khi Worker B gắn nhãn cùng một tài liệu gốc đó là source_id: \"doc_vol2_p14\"). Khi ReportAggregator hợp nhất các đầu ra JSON dạng {claim, source_id, confidence}, việc đối chiếu chéo thất bại, tạo ra các mục trích dẫn trùng lặp và làm đứt gãy chuỗi nguồn gốc (provenance chain) trong báo cáo tổng hợp cuối cùng. Cải tiến kiến trúc nào giải quyết triệt để sự bất nhất về định danh trích dẫn này giữa các worker song song?",
    "optionsEN": [
      "A. Implement a post-synthesis string clustering algorithm in ReportAggregator using Levenshtein edit distance on source_id strings to consolidate citation entries prior to final rendering.",
      "B. Instruct each SectionSynthesisWorker via system prompt to generate a random UUID for source_id to guarantee uniqueness before emitting section claim tuples.",
      "C. Pass a shared, immutable SourceRegistry containing canonical source mappings to all SectionSynthesisWorker instances and require resolving section citations to canonical IDs before output.",
      "D. Configure ReportAggregator to strip source_id attributes from intermediate section tuples and replace them with sequential integer footnotes matching the final section order."
    ],
    "options": [
      "A. Triển khai thuật toán gom nhóm chuỗi post-synthesis trong ReportAggregator sử dụng khoảng cách Levenshtein trên các chuỗi source_id để hợp nhất các mục trích dẫn trước khi xuất báo cáo.",
      "B. Hướng dẫn mỗi SectionSynthesisWorker qua system prompt tự tạo một chuỗi UUID ngẫu nhiên cho source_id nhằm đảm bảo tính duy nhất trước khi phát ra các tuple khẳng định.",
      "C. Truyền một SourceRegistry bất biến dùng chung chứa ánh xạ nguồn chuẩn hóa cho tất cả các bản thể SectionSynthesisWorker và bắt buộc quy đổi trích dẫn phần thành ID chuẩn hóa trước khi xuất dữ liệu.",
      "D. Cấu hình ReportAggregator để loại bỏ thuộc tính source_id khỏi các tuple phần trung gian và thay thế chúng bằng các chú thích số nguyên nối tiếp theo thứ tự phần cuối cùng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Post-hoc fuzzy string matching using Levenshtein distance on arbitrary identifiers like 'sec_4_pdf' and 'doc_vol2_p14' fails because distinct string formats will not cluster correctly, leading to misaligned or missed source merges.",
      "Option B is incorrect: Generating random UUIDs independently in each worker guarantees that identical source documents receive completely different IDs, preventing cross-section citation deduplication.",
      "Option C is correct: Providing a central SourceRegistry ensures all parallel SectionSynthesisWorker instances map section-level citations to canonical source IDs prior to output, allowing ReportAggregator to accurately aggregate and deduplicate provenance links.",
      "Option D is incorrect: Stripping source_id fields removes essential evidentiary metadata, preventing readers and automated systems from tracing synthesized claims back to authoritative source materials."
    ],
    "rationale": "Normalizing source references against a shared, pre-populated SourceRegistry before parallel section workers emit JSON tuples guarantees that identical documents share canonical source_id values across all synthesized sections, enabling exact deduplication and reliable provenance tracking.",
    "explanation": "Option A sai: Việc khớp chuỗi mờ bằng khoảng cách Levenshtein trên các định danh tự phát như 'sec_4_pdf' và 'doc_vol2_p14' thất bại do khác biệt cấu trúc chuỗi, dẫn đến việc gom nhóm sai hoặc bỏ sót trích dẫn. Option B sai: Việc tạo UUID ngẫu nhiên độc lập khiến cùng một tài liệu gốc bị gán các ID hoàn toàn khác nhau ở mỗi worker, triệt tiêu khả năng trùng khớp nguồn. Option C đúng: Việc cung cấp SourceRegistry dùng chung đảm bảo tất cả worker quy đổi trích dẫn về ID chuẩn hóa thống nhất trước khi xuất dữ liệu, giúp ReportAggregator tổng hợp và khử trùng lặp chính xác. Option D sai: Việc loại bỏ trường source_id làm đứt gãy hoàn toàn thông tin nguồn gốc (provenance), khiến các khẳng định trong báo cáo không thể truy xuất về tài liệu ban đầu.",
    "scenarioSignature": {
      "testedPrinciple": "canonical source identifier normalization in distributed synthesis",
      "failureMode": "duplicate conflicting source entries and broken provenance links",
      "rootCause": "parallel workers generating ad-hoc local source identifiers independently",
      "requiredFix": "resolve local section citations against centralized canonical source registry"
    },
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  },
  {
    "id": "d5-b12-5.7-012",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-012",
    "questionEN": "During multi-document synthesis in ReportReconciliationEngine, a section worker generates a critical strategic conclusion: claim: \"The enterprise customer churn rate increased by 4.2% following the v3.0 billing platform migration\". However, during graph reconciliation, the validation module detects that no ingested source document in the context window contains evidence or data supporting this specific claim (source_id: null). What is the correct architectural pipeline behavior when encountering an unbacked synthesized assertion?",
    "question": "[d5-b12-5.7-012] Trong quá trình tổng hợp đa tài liệu tại ReportReconciliationEngine, một worker xử lý phân đoạn tạo ra một kết luận chiến lược quan trọng: claim: \"Tỷ lệ rời bỏ khách hàng doanh nghiệp tăng 4.2% sau khi di chuyển sang nền tảng thanh toán v3.0\". Tuy nhiên, trong quá trình hòa giải đồ thị, module xác thực phát hiện không có tài liệu nguồn nào được nạp vào context window chứa bằng chứng hoặc dữ liệu hỗ trợ khẳng định này (source_id: null). Hành vi pipeline kiến trúc nào là chính xác khi gặp một khẳng định tổng hợp không có bằng chứng hỗ trợ?",
    "optionsEN": [
      "A. Prompt the reconciliation model to fabricate a plausible document reference tag (e.g., source_id: \"doc_internal_inferred\") with a low confidence score to preserve the claim in the final report.",
      "B. Assign the claim to the primary document source with the highest overall similarity score regardless of whether that document mentions the specific metric.",
      "C. Flag the unbacked claim as a high-priority warning in the output schema and prompt the user to manually verify its accuracy after report generation completes.",
      "D. Execute targeted retrieval against the vector store for corroborating evidence, and omit the claim entirely if no supporting source is found."
    ],
    "options": [
      "A. Yêu cầu mô hình hòa giải tự tạo một thẻ tham chiếu tài liệu có vẻ hợp lý (ví dụ: source_id: \"doc_internal_inferred\") kèm điểm tin cậy thấp để duy trì khẳng định trong báo cáo cuối cùng.",
      "B. Gán khẳng định đó cho tài liệu nguồn chính có điểm tương đồng tổng thể cao nhất bất kể tài liệu đó có đề cập đến chỉ số cụ thể đó hay không.",
      "C. Đánh dấu khẳng định không bằng chứng là cảnh báo ưu tiên cao trong schema đầu ra và yêu cầu người dùng tự xác minh tính chính xác sau khi tạo xong báo cáo.",
      "D. Thực hiện truy vấn có mục tiêu vào vector store để tìm bằng chứng xác thực, và loại bỏ hoàn toàn khẳng định đó nếu không tìm thấy nguồn hỗ trợ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Fabricating a placeholder source ID creates hallucinated citations and directly violates the strict evidentiary grounding requirement of synthesis systems.",
      "Option B is incorrect: Assigning unbacked assertions to unrelated high-similarity documents creates false provenance and corrupts audit trails with inaccurate citations.",
      "Option C is incorrect: Retaining unbacked claims in the output offloads verification to users and allows unverified or hallucinated facts to contaminate the synthesized report.",
      "Option D is correct: Executing targeted vector retrieval checks if supporting evidence exists in the wider repository; if unverified, omitting the claim guarantees that every statement in the report maintains strict provenance."
    ],
    "rationale": "Strict long-form synthesis principles dictate that every assertion in a synthesized report must link directly to verifiable source evidence; unbacked claims must trigger targeted evidence retrieval, and if no support is found, they must be omitted rather than assigned invented or misattributed citations.",
    "explanation": "Option A sai: Việc tự tạo thẻ nguồn giả lập ('doc_internal_inferred') làm phát sinh trích dẫn ảo và vi phạm nghiêm trọng nguyên tắc xác thực bằng chứng. Option B sai: Việc gán ngẫu nhiên cho tài liệu có độ tương đồng cao tạo ra provenance giả, gây sai lệch nguồn vết kiểm toán. Option C sai: Việc giữ lại câu không có bằng chứng và chỉ đánh dấu cảnh báo đẩy trách nhiệm kiểm tra cho người dùng, làm giảm độ tin cậy của hệ thống. Option D đúng: Việc thực hiện truy vấn mục tiêu vào vector store để tìm tài liệu bổ sung và chủ động loại bỏ khẳng định nếu vẫn không tìm thấy bằng chứng giúp đảm bảo mọi câu trong báo cáo đều có nguồn gốc trích dẫn chính xác 100%.",
    "scenarioSignature": {
      "testedPrinciple": "strict evidence grounding and retrieval fallback for unbacked assertions",
      "failureMode": "hallucinated source citations or fabricated evidence in synthesis output",
      "rootCause": "forcing worker models to generate source citations for unsupported claims",
      "requiredFix": "trigger vector search retrieval for backing evidence or omit unsupported assertions"
    },
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  }
]