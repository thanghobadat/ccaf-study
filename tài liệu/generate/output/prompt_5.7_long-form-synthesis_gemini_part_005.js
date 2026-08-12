[
  {
    "id": "d5-b12-5.7-009",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-009",
    "scenarioSignature": {
      "testedPrinciple": "fine-grained claim-level confidence scoring",
      "failureMode": "document-level metric masks low-confidence claims",
      "rootCause": "aggregating confidence scores across multi-section documents",
      "requiredFix": "attach granular claim-level confidence tuples to individual assertions"
    },
    "questionEN": "An enterprise intelligence pipeline SynthesisReportEngine synthesizes multi-document market research into executive briefings. The system outputs a single document-level metric overall_confidence_score: 0.92 calculated as an average across all extracted statements. During downstream compliance auditing, several speculative claims regarding regulatory fines (individual claim_confidence: 0.35) were included in the summary because high-confidence background facts inflated the overall document score. What architectural refinement prevents weak individual assertions from being obscured by high aggregate document confidence scores?",
    "question": "[d5-b12-5.7-009] Một pipeline phân tích thị trường doanh nghiệp SynthesisReportEngine tổng hợp nghiên cứu từ nhiều tài liệu thành các bản tóm tắt cho ban quản lý. Hệ thống xuất ra một chỉ số cấp tài liệu duy nhất overall_confidence_score: 0.92 được tính bằng trung bình cộng của tất cả câu được trích xuất. Trong quá trình kiểm toán tuân thủ, một số tuyên bố mang tính suy đoán về các khoản phạt pháp lý (có claim_confidence: 0.35 cá thể) vẫn được đưa vào bản tóm tắt vì các sự thật nền tảng có độ tin cậy cao đã làm tăng điểm tổng thể của tài liệu. Cải tiến kiến trúc nào ngăn chặn các khẳng định cá thể yếu bị che khuất bởi điểm tin cậy tổng thể cao của tài liệu?",
    "optionsEN": [
      "A. Replace single document-level confidence metrics with granular {claim, source_id, claim_confidence} tuples for every synthesized statement and enforce assertion-level confidence filtering before summary inclusion.",
      "B. Increase the document-level cutoff threshold for overall_confidence_score from 0.92 to 0.98 to automatically filter low-confidence documents before synthesis.",
      "C. Implement a secondary LLM verification pass that re-evaluates the full executive briefing and outputs a unified document-level validity badge.",
      "D. Truncate low-confidence source documents prior to synthesis so that only high-confidence raw text enters the context window of SynthesisReportEngine."
    ],
    "options": [
      "A. Thay thế chỉ số tin cậy cấp tài liệu duy nhất bằng các tuple {claim, source_id, claim_confidence} chi tiết cho từng tuyên bố tổng hợp và áp dụng bộ lọc độ tin cậy cấp khẳng định trước khi đưa vào bản tóm tắt.",
      "B. Tăng ngưỡng lọc cấp tài liệu cho overall_confidence_score từ 0.92 lên 0.98 để tự động lọc các tài liệu có độ tin cậy thấp trước khi tổng hợp.",
      "C. Triển khai một bước xác minh bằng LLM phụ để đánh giá lại toàn bộ bản tóm tắt và xuất ra một nhãn hợp lệ cấp tài liệu thống nhất.",
      "D. Cắt bỏ các tài liệu nguồn có độ tin cậy thấp trước khi tổng hợp để chỉ có văn bản thô có độ tin cậy cao mới đi vào context window của SynthesisReportEngine."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Attaching structured {claim, source_id, claim_confidence} tuples to each synthesized assertion ensures low-confidence individual claims (e.g., 0.35) are filtered or flagged regardless of high aggregate report confidence.",
      "Option B is incorrect: Raising the overall document confidence threshold to 0.98 still relies on document-level averaging, which can still pass weak internal claims if the rest of the report scores high.",
      "Option C is incorrect: Adding a secondary full-briefing check produces another document-level score or badge, failing to isolate and evaluate individual low-confidence assertions within the synthesized report.",
      "Option D is incorrect: Truncating raw input documents before context ingestion strips valid background facts and does not provide claim-level confidence tracking during long-form synthesis."
    ],
    "rationale": "Using granular {claim, source_id, claim_confidence} tuples for each assertion prevents low-confidence claims from hiding behind high document-level averages.",
    "explanation": "Option A đúng: Việc đính kèm tuple {claim, source_id, claim_confidence} cho từng khẳng định giúp lọc hoặc đánh dấu các tuyên bố cá thể có độ tin cậy thấp (như 0.35) bất kể điểm trung bình tổng thể của báo cáo cao. Option B sai: Việc tăng ngưỡng điểm tổng thể lên 0.98 vẫn dựa vào điểm trung bình cấp tài liệu, do đó vẫn có thể bỏ sót các tuyên bố yếu nếu phần còn lại của báo cáo có điểm rất cao. Option C sai: Thêm bước kiểm tra toàn bộ bản tóm tắt chỉ tạo ra thêm một nhãn/điểm cấp tài liệu khác, không giúp cô lập và đánh giá từng tuyên bố riêng lẻ. Option D sai: Cắt bỏ tài liệu đầu vào trước khi tổng hợp sẽ làm mất các thông tin nền tảng hợp lệ và không giải quyết được việc theo dõi độ tin cậy cấp tuyên bố trong quá trình tổng hợp dài.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  },
  {
    "id": "d5-b12-5.7-010",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-010",
    "scenarioSignature": {
      "testedPrinciple": "temporal and version provenance tracking for long-running synthesis",
      "failureMode": "synthesized report includes stale claims superseded during multi-day generation workflow",
      "rootCause": "omitting version identifiers and retrieval timestamps from source evidence tuples",
      "requiredFix": "embed source version and retrieval timestamp metadata into synthesis claims"
    },
    "questionEN": "An asynchronous synthesis pipeline LongFormSynthWorkflow executes multi-stage summarization over a week-long execution window to build an enterprise security policy manual. During synthesis, upstream source document sec_policy_v1.pdf is updated to sec_policy_v2.pdf in KnowledgeBaseRegistry. The final generated report contains claims referencing outdated compliance rules without indicating when the source text was fetched, leading to downstream validation failures during audit comparison against the live database. Which architectural fix ensures source temporal status and version lineage are preserved in the synthesized document?",
    "question": "[d5-b12-5.7-010] Một pipeline tổng hợp bất đồng bộ LongFormSynthWorkflow thực hiện tóm tắt nhiều giai đoạn trong khoảng thời gian chạy kéo dài một tuần để xây dựng sổ tay chính sách bảo mật doanh nghiệp. Trong quá trình tổng hợp, tài liệu nguồn ban đầu sec_policy_v1.pdf được cập nhật lên sec_policy_v2.pdf trong KnowledgeBaseRegistry. Báo cáo cuối cùng chứa các tuyên bố tham chiếu đến các quy tắc tuân thủ cũ mà không chỉ ra thời điểm lấy dữ liệu nguồn, gây ra lỗi xác thực khi đối chiếu kiểm toán với cơ sở dữ liệu thực tế. Giải pháp kiến trúc nào đảm bảo trạng thái thời gian và dòng lịch sử phiên bản nguồn được bảo toàn trong tài liệu tổng hợp?",
    "optionsEN": [
      "A. Re-run the entire LongFormSynthWorkflow every 24 hours to overwrite the final report whenever any source file modifications are detected in KnowledgeBaseRegistry.",
      "B. Record structured {claim, source_id, source_version, retrieval_timestamp} metadata for each extracted statement to explicitly track document versioning and temporal freshness during merge reconciliation.",
      "C. Enforce strict optimistic concurrency locking on KnowledgeBaseRegistry to prevent updates to source documents until the week-long synthesis job completes.",
      "D. Strip all document version numbers and source IDs from the intermediate synthesis state to prevent mismatched version strings in the final report."
    ],
    "options": [
      "A. Chạy lại toàn bộ LongFormSynthWorkflow mỗi 24 giờ để ghi đè báo cáo cuối cùng bất kỳ khi nào phát hiện sửa đổi tệp nguồn trong KnowledgeBaseRegistry.",
      "B. Ghi lại metadata cấu trúc dạng {claim, source_id, source_version, retrieval_timestamp} cho mỗi tuyên bố được trích xuất để theo dõi rõ ràng phiên bản tài liệu và độ mới theo thời gian trong quá trình hòa giải hợp nhất.",
      "C. Áp dụng khóa đối sánh lạc quan (optimistic concurrency locking) nghiêm ngặt trên KnowledgeBaseRegistry để ngăn cập nhật tài liệu nguồn cho đến khi tác vụ tổng hợp kéo dài một tuần hoàn tất.",
      "D. Loại bỏ tất cả số phiên bản tài liệu và ID nguồn khỏi trạng thái trung gian của quá trình tổng hợp để tránh chuỗi phiên bản không khớp trong báo cáo cuối cùng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Re-running the multi-day job every 24 hours creates excessive compute overhead and does not guarantee that in-flight synthesis steps will avoid mixing claims from different document versions fetched at different times.",
      "Option B is correct: Capturing {claim, source_id, source_version, retrieval_timestamp} metadata for every extracted claim explicitly records which exact document version and point-in-time state were used, enabling accurate reconciliation and auditability.",
      "Option C is incorrect: Blocking source document updates for an entire week via concurrency locks severely disrupts active operational updates across the enterprise knowledge base.",
      "Option D is incorrect: Removing version metadata completely destroys provenance tracking and makes it impossible to detect or reconcile superseded claims."
    ],
    "rationale": "Including explicit source_version and retrieval_timestamp fields in claim tuples ensures that multi-stage long-running synthesis jobs maintain complete temporal lineage and version transparency for every synthesized claim.",
    "explanation": "Option A sai: Việc chạy lại tác vụ kéo dài nhiều ngày mỗi 24 giờ gây tốn kém tài nguyên tính toán và không đảm bảo các bước tổng hợp đang diễn ra tránh được việc trộn lẫn dữ liệu từ các phiên bản khác nhau. Option B đúng: Việc lưu giữ thông tin {claim, source_id, source_version, retrieval_timestamp} cho từng tuyên bố trích xuất giúp ghi nhận chính xác phiên bản tài liệu và mốc thời gian lấy dữ liệu, phục vụ tốt cho việc hòa giải và kiểm toán. Option C sai: Khóa việc cập nhật tài liệu nguồn trong suốt một tuần gây gián đoạn nghiêm trọng đến các hoạt động cập nhật tri thức hàng ngày của doanh nghiệp. Option D sai: Việc xóa bỏ hoàn toàn thông tin phiên bản sẽ làm mất dấu nguồn gốc (provenance) và khiến việc phát hiện các tuyên bố bị lỗi thời trở nên không thể.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  }
]