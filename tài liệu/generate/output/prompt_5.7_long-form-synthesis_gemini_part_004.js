[
  {
    "id": "d5-b12-5.7-007",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-007",
    "scenarioSignature": {
      "testedPrinciple": "context window overlap during text chunking for synthesis",
      "failureMode": "extraction of unqualified factual claims from split text segments",
      "rootCause": "non-overlapping chunking splitting core definitions from qualifying conditions",
      "requiredFix": "apply chunk overlapping or semantic boundary splitting across chunk windows"
    },
    "questionEN": "An enterprise document analysis service SLAAnalyzer processes multi-page vendor contracts by splitting text into fixed chunks using chunk_size: 2048 tokens and chunk_overlap: 0 tokens. In Chunk 14, the contract states that the database infrastructure guarantees 99.99% monthly availability; however, Chunk 15 starts with the qualification 'provided primary-region multi-AZ replication remains active, falling to 99.0% for single-AZ deployments.' During section-wise synthesis, the model extracts an absolute availability SLA of 99.99% without qualifications into synthesis_report.json, causing audit compliance failures. What is the root architectural cause and proper fix for this synthesis error?",
    "question": "[d5-b12-5.7-007] Một dịch vụ phân tích tài liệu doanh nghiệp SLAAnalyzer xử lý các hợp đồng nhà cung cấp nhiều trang bằng cách chia nhỏ văn bản thành các đoạn cố định sử dụng chunk_size: 2048 token và chunk_overlap: 0 token. Trong Chunk 14, hợp đồng ghi rằng hạ tầng cơ sở dữ liệu bảo đảm độ sẵn sàng hàng tháng 99.99%; tuy nhiên, Chunk 15 bắt đầu bằng điều kiện ràng buộc 'với điều kiện sao chép multi-AZ vùng chính vẫn hoạt động, giảm xuống 99.0% đối với triển khai single-AZ.' Trong quá trình tổng hợp theo từng phần, mô hình trích xuất SLA độ sẵn sàng tuyệt đối 99.99% mà không có điều kiện đi kèm vào synthesis_report.json, gây ra lỗi tuân thủ kiểm toán. Nguyên nhân kiến trúc gốc và giải pháp khắc phục phù hợp cho lỗi tổng hợp này là gì?",
    "optionsEN": [
      "A. The extraction prompt lacks JSON schema constraints for SLA metrics, allowing the model to format unstructured free text instead of structured key-value pairs.",
      "B. The vector database index uses cosine similarity instead of dot product for embedding retrieval, causing Chunk 15 to be excluded during semantic query matching.",
      "C. Non-overlapping chunk boundaries severed the main claim in Chunk 14 from its qualifying constraint in Chunk 15; implementing overlapping chunk windows or sentence-boundary aware preservation ensures scope qualifications remain attached to core definitions during chunk synthesis.",
      "D. The model context window was truncated because total prompt length exceeded 8192 tokens during final report aggregation."
    ],
    "options": [
      "A. Prompt trích xuất thiếu các ràng buộc JSON schema cho các chỉ số SLA, cho phép mô hình định dạng văn bản tự do thay vì các cặp key-value có cấu trúc.",
      "B. Chỉ mục cơ sở dữ liệu vector sử dụng cosine similarity thay vì dot product để truy xuất embedding, khiến Chunk 15 bị loại khỏi kết quả khớp truy vấn ngữ nghĩa.",
      "C. Ranh giới chia đoạn không chồng lấp đã tách rời tuyên bố chính trong Chunk 14 khỏi điều kiện ràng buộc trong Chunk 15; việc triển khai cửa sổ đoạn chồng lấp (overlapping chunk windows) hoặc bảo toàn ranh giới câu đảm bảo các điều kiện phạm vi vẫn đi kèm với định nghĩa cốt lõi trong quá trình tổng hợp đoạn.",
      "D. Cửa sổ ngữ cảnh của mô hình bị cắt ngắn do tổng độ dài prompt vượt quá 8192 token trong quá trình gom gộp báo cáo cuối cùng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because missing JSON schema constraints affect data formatting and validation, not the loss of contextual qualifications split across physical chunk boundaries.",
      "Option B is incorrect because vector distance metrics apply to embedding similarity retrieval, whereas this issue occurs during sequential chunk-wise extraction and synthesis.",
      "Option C is correct because zero chunk overlap (chunk_overlap: 0) creates arbitrary split points that separate core propositions from their essential qualifying clauses, producing misleadingly absolute claims during independent chunk synthesis.",
      "Option D is incorrect because context window truncation drops trailing tokens during generation or prompt submission, rather than omitting qualifying context located in adjacent chunks."
    ],
    "rationale": "Non-overlapping chunking (chunk_overlap: 0) cuts context at arbitrary character/token bounds. When a statement's premise is in one chunk and its qualifying clause is in the next, chunk-wise synthesis generates incomplete claims. Introducing chunk overlap or semantic sentence splitting preserves necessary context across chunk boundaries.",
    "explanation": "Lựa chọn C là đáp án đúng vì việc sử dụng ranh giới đoạn không chồng lấp (chunk_overlap: 0) làm phân mảnh các câu phức, cắt đứt tuyên bố chính ở đoạn này khỏi điều kiện loại trừ hoặc phạm vi giới hạn nằm ở đoạn tiếp theo. Khi mỗi đoạn được tổng hợp độc lập, mô hình tạo ra các thông tin sai lệch do thiếu ngữ cảnh ràng buộc. Giải pháp là áp dụng cửa sổ đoạn chồng lấp hoặc phân đoạn dựa trên ranh giới ngữ nghĩa/câu.\n\nLựa chọn A sai vì việc thiếu JSON schema chỉ ảnh hưởng tới cấu trúc định dạng đầu ra, không giúp khôi phục thông tin bị chia cắt ở hai đoạn khác nhau.\nLựa chọn B sai vì chỉ số đo khoảng cách vector (cosine/dot product) liên quan đến tìm kiếm ngữ nghĩa trong cơ sở dữ liệu vector, không phải quy trình xử lý tuần tự từng chunk trong long-form synthesis.\nLựa chọn D sai vì cắt ngắn ngữ cảnh (truncation) làm mất các token ở cuối tài liệu/prompt, không phải nguyên nhân tách rời điều kiện ràng buộc ngay ở hai chunk liền kề.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  },
  {
    "id": "d5-b12-5.7-008",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-008",
    "scenarioSignature": {
      "testedPrinciple": "provenance tracking during multi-stage text consolidation",
      "failureMode": "hallucination of unsupported transitional claims in merged output",
      "rootCause": "merger prompt optimizing stylistic fluency without source verification",
      "requiredFix": "validate merged claims against source tuples and drop unsupported assertions"
    },
    "questionEN": "An automated documentation pipeline TechAuditAggregator uses a multi-stage process where 10 section outputs (section_1.json through section_10.json) are combined by a final merger module (merge_sections()) to build an executive report. To maintain narrative flow, the merger prompt instructs the model to create seamless transitions between distinct section topics. During audit evaluation of executive_summary.md, reviewers detect a newly introduced claim stating 'Cloud infrastructure costs decreased by 30% following containerization', which does not appear in any of the 10 source section files. What is the root cause of this hallucination and how should the system architecture be updated?",
    "question": "[d5-b12-5.7-008] Một pipeline tài liệu tự động TechAuditAggregator sử dụng quy trình đa giai đoạn trong đó 10 đầu ra phần (section_1.json đến section_10.json) được kết hợp bởi một module hợp nhất cuối cùng (merge_sections()) để xây dựng báo cáo điều hành. Để duy trì luồng dẫn dắt, prompt hợp nhất hướng dẫn mô hình tạo các đoạn chuyển tiếp mượt mà giữa các chủ đề phần riêng biệt. Trong quá trình đánh giá kiểm toán executive_summary.md, các nhà kiểm duyệt phát hiện một tuyên bố mới xuất hiện ghi rằng 'Chi phí hạ tầng đám mây đã giảm 30% sau khi container hóa', điều này không xuất hiện trong bất kỳ tệp phần nguồn nào trong số 10 tệp. Nguyên nhân gốc rễ của hiện tượng ảo giác này là gì và kiến trúc hệ thống nên được cập nhật như thế nào?",
    "optionsEN": [
      "A. The initial chunk extraction phase relied on greedy decoding with temperature: 0.0, preventing the model from capturing cross-chunk semantic dependencies during section summary generation.",
      "B. The merger step used an undersized context window that dropped trailing sections section_8.json through section_10.json, forcing the model to estimate missing section content.",
      "C. Section outputs were saved as unformatted markdown strings instead of vector embeddings, preventing the merger module from calculating semantic similarity scores prior to concatenation.",
      "D. The final merger prompt prioritized stylistic transition fluency without enforcing strict provenance verification; updating the merger to validate every merged assertion against a structured tuple {claim, source_id, confidence} and dropping unsupported claims prevents invented narrative transitions."
    ],
    "options": [
      "A. Giai đoạn trích xuất đoạn ban đầu dựa vào greedy decoding với temperature: 0.0, ngăn mô hình nắm bắt các phụ thuộc ngữ nghĩa giữa các đoạn trong quá trình tạo tóm tắt phần.",
      "B. Bước hợp nhất đã sử dụng cửa sổ ngữ cảnh quá nhỏ làm rơi mất các phần đuôi section_8.json đến section_10.json, buộc mô hình phải ước tính nội dung phần bị thiếu.",
      "C. Đầu ra các phần được lưu dưới dạng chuỗi markdown không có cấu trúc thay vì vector embedding, ngăn module hợp nhất tính toán điểm tương đồng ngữ nghĩa trước khi nối văn bản.",
      "D. Prompt hợp nhất cuối cùng ưu tiên sự mượt mà của câu chuyển tiếp mang tính văn phong mà không thực thi xác thực nguồn gốc (provenance verification) nghiêm ngặt; việc cập nhật bước hợp nhất để xác thực mọi khẳng định được hợp nhất dựa trên bộ giá trị có cấu trúc {claim, source_id, confidence} và loại bỏ các tuyên bố không được hỗ trợ sẽ ngăn chặn các chuyển tiếp tự tạo ra."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because greedy decoding (temperature: 0.0) reduces sampling randomness and does not introduce hallucinated transitional claims during the final merge step.",
      "Option B is incorrect because context truncation results in omitted section summaries, rather than the generation of completely new factual assertions absent from all inputs.",
      "Option C is incorrect because converting text to vector embeddings is used for retrieval tasks, not for maintaining textual provenance during report consolidation.",
      "Option D is correct because encouraging smooth narrative transitions without enforcing provenance constraints causes the model to invent bridge assertions; requiring strict provenance checks ({claim, source_id, confidence}) ensures only supported claims are retained during synthesis."
    ],
    "rationale": "When merging synthesized sections into a unified report, prompts that prioritize narrative smoothness over factual strictness lead the model to hallucinate transitional claims. Implementing structured provenance verification ({claim, source_id, confidence}) forces the merger to verify every assertion against upstream section outputs and reject unsupported bridge statements.",
    "explanation": "Lựa chọn D là đáp án đúng vì khi yêu cầu mô hình tạo các câu chuyển tiếp mượt mà (smooth transitions) mà không cài đặt cơ chế xác thực nguồn gốc nghiêm ngặt, mô hình sẽ tự bịa ra các tuyên bố bắc cầu (bridge claims) không hề có trong các văn bản gốc. Việc áp dụng cơ chế theo dõi nguồn gốc bằng bộ giá trị có cấu trúc {claim, source_id, confidence} và tự động loại bỏ tuyên bố không có nguồn gốc sẽ ngăn chặn ảo giác này.\n\nLựa chọn A sai vì greedy decoding (temperature: 0.0) làm giảm tính ngẫu nhiên, không phải nguyên nhân trực tiếp sinh ra các câu chuyển tiếp ảo giác ở bước hợp nhất cuối.\nLựa chọn B sai vì việc tràn cửa sổ ngữ cảnh khiến nội dung bị bỏ sót (omission), chứ không sinh ra thông tin bịa đặt hoàn toàn mới.\nLựa chọn C sai vì lưu trữ dạng vector embedding phục vụ cho tìm kiếm (RAG), không giải quyết vấn đề kiểm tra nguồn gốc phát ngôn trong khâu tổng hợp văn bản.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  }
]