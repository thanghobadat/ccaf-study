[
  {
    "id": "d5-b12-5.7-013",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-013",
    "scenarioSignature": {
      "testedPrinciple": "preservation of conflicting attributed positions",
      "failureMode": "averaging contrasting conclusions into false consensus",
      "rootCause": "semantic aggregation of opposing findings into single middle ground assertion",
      "requiredFix": "preserve distinct context-attributed claims rather than blending opposing metrics"
    },
    "questionEN": "An enterprise architecture evaluation pipeline ArchBenchSynthesizer aggregates multi-agent benchmark reports for the PostgreSQL 16 database engine. Agent A evaluates write throughput under high lock contention and reports a 45% latency surge due to lock escalation. Agent B evaluates the same engine under parallel read-heavy workloads and reports a 5% latency increase. The long-form synthesis module merges these findings into a single summary statement: 'PostgreSQL 16 experiences a mild ~25% average latency increase under generic concurrent workloads,' creating a false consensus that hides the write-contention performance bottleneck. How should the system architect modify the synthesis pipeline to properly handle these conflicting findings?",
    "question": "[d5-b12-5.7-013] Một pipeline đánh giá kiến trúc doanh nghiệp (ArchBenchSynthesizer) tổng hợp các báo cáo kiểm thử hiệu năng giữa các agent cho cơ sở dữ liệu PostgreSQL 16. Agent A đánh giá hiệu năng ghi dưới điều kiện tranh chấp khóa (lock contention) cao và báo cáo độ trễ tăng 45% do nâng cấp khóa (lock escalation). Agent B đánh giá cùng phiên bản dưới khối lượng công việc chỉ đọc (read-only) song song và báo cáo độ trễ tăng 5%. Module tổng hợp văn bản dài đã hợp nhất hai kết quả này thành một câu tóm tắt duy nhất: 'PostgreSQL 16 có độ trễ tăng trung bình khoảng 25% dưới các khối lượng công việc đồng thời tổng quát', dẫn đến kết luận đồng thuận giả tạo (false consensus) che giấu nghẽn hiệu năng khi ghi dữ liệu. Kiến trúc sư hệ thống nên điều chỉnh pipeline tổng hợp như thế nào để xử lý đúng các kết luận mâu thuẫn này?",
    "optionsEN": [
      "A. Preserve both findings as distinct, attributed claims with their respective workload_type context fields, explicitly representing the divergence between write-contention lock escalation (45%) and read-heavy isolation (5%).",
      "B. Apply a weighted confidence scoring algorithm ConfidenceWeightingAggregator to reweight Agent A and Agent B's scores based on document sample sizes, computing a unified 22% latency impact metric.",
      "C. Execute a tie-breaking LLM judge step DisambiguationJudge to select the lower latency variance result as the single canonical performance claim.",
      "D. Filter out the 45% latency surge report using a standard anomaly detection threshold OutlierRemovalFilter before passing claims to the final synthesis prompt."
    ],
    "options": [
      "A. Bảo tồn cả hai phát hiện dưới dạng các tuyên bố riêng biệt có gắn thuộc tính tác giả (attributed claims) cùng với các trường ngữ cảnh workload_type tương ứng, phản ánh rõ ràng sự khác biệt giữa tranh chấp khóa (45%) và tải chỉ đọc (5%).",
      "B. Áp dụng thuật toán tính điểm tin cậy có trọng số (ConfidenceWeightingAggregator) để tính lại điểm số của Agent A và Agent B dựa trên kích thước mẫu tài liệu nhằm tính ra một chỉ số tác động độ trễ hợp nhất 22%.",
      "C. Thực thi một bước LLM judge phân xử (DisambiguationJudge) để chọn kết quả có độ biến động độ trễ thấp hơn làm tuyên bố hiệu năng chính thức duy nhất.",
      "D. Lọc bỏ báo cáo độ trễ tăng 45% bằng ngưỡng phát hiện bất thường tiêu chuẩn (OutlierRemovalFilter) trước khi truyền các tuyên bố vào prompt tổng hợp cuối cùng."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Explicitly preserving both claims alongside their specific workload_type context attributes maintains evidentiary fidelity and prevents the synthesizer from smoothing out critical write-contention bottlenecks into a misleading middle ground.",
      "Option B is incorrect: Weighting and mathematically averaging opposing metrics creates a false consensus, masking the severe 45% write-contention latency surge behind a single diluted metric.",
      "Option C is incorrect: Selecting a single winning finding via a tie-breaking judge discards valid performance degradation observed under write contention, producing an incomplete evaluation report.",
      "Option D is incorrect: Removing high-latency reports as statistical outliers discards real system stress data, hiding critical production vulnerabilities under concurrent write operations."
    ],
    "rationale": "When long-form synthesis encounters contradictory empirical findings derived from differing contextual conditions (e.g., write-contention vs. read-only workloads), combining or averaging the metrics produces a false consensus that obfuscates critical domain insights. The synthesis pipeline must preserve contradictory claims alongside their source attributions and operational contexts (workload_type) to present an accurate, multi-faceted summary.",
    "explanation": "Trong tổng hợp văn bản dài (long-form synthesis), khi các agent thu thập các phát hiện thực nghiệm mâu thuẫn nhau do điều kiện ngữ cảnh khác nhau (như tải ghi gây tranh chấp khóa 45% so với tải chỉ đọc 5%), việc tính trung bình hoặc hợp nhất các con số sẽ tạo ra một kết luận đồng thuận giả tạo (false consensus). Điều này làm mất đi thông tin kiến trúc quan trọng về nghẽn hiệu năng.\n\n- Đáp án A đúng: Giữ nguyên hai luồng thông tin mâu thuẫn kèm theo thuộc tính tác giả (attribution) và ngữ cảnh khối lượng công việc (workload_type) tương ứng giúp báo cáo tổng hợp phản ánh chính xác bức tranh hiệu năng mà không làm biến dạng dữ liệu gốc.\n- Đáp án B sai: Việc tính trung bình trọng số hòa tan con số 45% thành 22%, trực tiếp tạo ra false consensus và che giấu sự cố khi ghi dữ liệu.\n- Đáp án C sai: Dùng LLM judge để chọn một trong hai phát hiện sẽ loại bỏ hoàn toàn dữ liệu kiểm thử thực tế dưới điều kiện ghi dữ liệu.\n- Đáp án D sai: Coi báo cáo độ trễ 45% là ngoại lệ (outlier) để xóa bỏ sẽ làm mất thông tin cảnh báo rủi ro sản xuất quan trọng.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  },
  {
    "id": "d5-b12-5.7-014",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-014",
    "scenarioSignature": {
      "testedPrinciple": "preservation of machine-readable provenance via sidecar artifacts",
      "failureMode": "loss of structured evidentiary tuples during final prose formatting",
      "rootCause": "rendering clean human readable text strips inline metadata required by downstream consumers",
      "requiredFix": "generate a machine-readable provenance sidecar alongside formatted prose"
    },
    "questionEN": "An automated compliance audit pipeline ComplianceReportGenerator synthesizes multi-cloud security findings into an executive PDF/Markdown report. Upstream extraction agents generate structured tuples of {claim_id, source_id, confidence, rule_id}. However, when rendering human-readable prose for executive presentations, the formatting template strips out all inline JSON metadata and bracketed footnotes to maintain a clean layout. Downstream automated risk evaluation services RiskScoreCalculator consuming the final report lose all machine-readable evidence links, causing audit verification checks to fail with ERR_PROVENANCE_MISSING. How should the pipeline be refactored to maintain machine-readable auditability without cluttering human-oriented prose?",
    "question": "[d5-b12-5.7-014] Một pipeline kiểm toán tuân thủ tự động (ComplianceReportGenerator) tổng hợp các phát hiện bảo mật hạ tầng đa đám mây thành báo cáo định dạng PDF/Markdown cho cấp quản lý. Các agent trích xuất phía trước tạo ra các tuple cấu trúc {claim_id, source_id, confidence, rule_id}. Tuy nhiên, khi định dạng văn bản xuôi (prose) cho ban điều hành, template định dạng loại bỏ tất cả JSON nội dòng và chú thích trong ngoặc để báo cáo sạch đẹp. Kết quả là dịch vụ đánh giá rủi ro tự động (RiskScoreCalculator) tiêu thụ báo cáo cuối cùng bị mất toàn bộ liên kết bằng chứng và điểm tin cậy dạng máy đọc được, gây ra lỗi ERR_PROVENANCE_MISSING. Pipeline nên được tái cấu trúc như thế nào để giữ nguyên khả năng kiểm toán dạng máy đọc được mà không làm hỏng định dạng văn bản cho con người?",
    "optionsEN": [
      "A. Inject raw JSON schema blocks directly into every paragraph of the rendered executive PDF document to force human readers and automated systems to parse the exact same string.",
      "B. Output the clean human-readable executive prose document alongside a companion machine-readable provenance_manifest.json sidecar preserving all {claim_id, source_id, confidence, rule_id} tuples linked by anchor IDs.",
      "C. Re-run the extraction agent with a higher temperature setting so that the LLM embeds source IDs directly into document header metadata tags.",
      "D. Replace structured tuples with regex string patterns inside the prose text and instruct downstream services to extract evidence using pattern matching."
    ],
    "options": [
      "A. Chèn trực tiếp các khối JSON schema thô vào từng đoạn văn của tài liệu PDF được tạo ra để bắt buộc người đọc và hệ thống tự động đều phải parse cùng một chuỗi ký tự.",
      "B. Xuất tệp văn bản xuôi sạch dành cho ban điều hành kèm theo một tệp sidecar companion dạng máy đọc được provenance_manifest.json lưu giữ đầy đủ các tuple {claim_id, source_id, confidence, rule_id} được liên kết qua các ID mỏ neo (anchor IDs).",
      "C. Chạy lại agent trích xuất với thiết lập temperature cao hơn để LLM nhúng trực tiếp các source ID vào metadata của tiêu đề tài liệu.",
      "D. Thay thế các tuple cấu trúc bằng các biểu thức chính quy (regex string patterns) bên trong văn bản xuôi và hướng dẫn dịch vụ hạ nguồn trích xuất bằng chứng bằng pattern matching."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Embedding raw JSON schema blocks directly inside executive prose ruins visual readability for human stakeholders without providing a standard machine-readable schema interface.",
      "Option B is correct: Generating a machine-readable sidecar file (provenance_manifest.json) alongside the clean executive text preserves complete structured metadata for automated tooling while maintaining uncluttered document formatting for human readers.",
      "Option C is incorrect: Increasing temperature introduces non-deterministic text generation and header metadata tags do not prevent metadata loss during prose rendering.",
      "Option D is incorrect: Relying on regex pattern matching over unstructured prose text is fragile, error-prone, and loses structured confidence scores and rule attribution tuples."
    ],
    "rationale": "Long-form synthesis requires serving two distinct consumers: human stakeholders who need clean, readable prose, and downstream automated systems that require structured, machine-readable provenance ({claim_id, source_id, confidence, rule_id}). Stripping tuples during formatting breaks automated pipelines. The correct architectural pattern is to decouple representation by outputting clean prose alongside a machine-readable provenance sidecar file (e.g., provenance_manifest.json) linked via anchor identifiers.",
    "explanation": "Trong quá trình tổng hợp văn bản dài (long-form synthesis), báo cáo đầu ra thường phục vụ hai đối tượng tiêu thụ khác nhau: con người (cần văn bản xuôi sạch sẽ, dễ đọc) và hệ thống tự động hạ nguồn (cần các tuple nguồn gốc dữ liệu dạng máy đọc được {claim_id, source_id, confidence, rule_id}). Việc xóa bỏ các tuple khi định dạng văn bản sẽ làm đứt gãy quy trình kiểm toán tự động.\n\n- Đáp án B đúng: Việc tách biệt hình thức hiển thị bằng cách xuất văn bản xuôi sạch cho người đọc kèm theo một tệp sidecar (provenance_manifest.json) giữ nguyên toàn bộ thông tin nguồn gốc dạng máy đọc được liên kết bằng anchor IDs giúp đáp ứng hoàn hảo cả hai yêu cầu.\n- Đáp án A sai: Chèn JSON thô vào giữa các đoạn văn làm hỏng trải nghiệm đọc của con người và tạo ra cấu trúc tài liệu rối rắm.\n- Đáp án C sai: Tăng temperature gây ra tính không định hình (non-deterministic) và không giải quyết được vấn đề mất metadata khi render prose.\n- Đáp án D sai: Trích xuất bằng chứng từ văn bản xuôi bằng regex rất dễ lỗi, không bền vững và làm mất các trường dữ liệu cấu trúc như confidence hay rule_id.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  }
]