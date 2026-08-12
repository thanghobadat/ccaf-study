[
  {
    "id": "d5-b12-5.7-003",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-003",
    "questionEN": "An intelligence synthesis system DocSynthesizer generates regulatory compliance summaries using structured JSON outputs. A core claim in a generated compliance report is backed by three distinct source documents (doc_101, doc_102, and doc_103), but the output JSON schema limits attribution to a single string field source_id. Consequently, the pipeline forces the model to pick only doc_101, causing DocSynthesizer to drop 66% of evidentiary citations during audit validation. How should the schema and pipeline be refactored to preserve full multi-document provenance?",
    "question": "[d5-b12-5.7-003] Một hệ thống tổng hợp thông tin DocSynthesizer tạo báo cáo tuân thủ quy định bằng đầu ra JSON có cấu trúc. Một khẳng định cốt lõi trong báo cáo tuân thủ được hỗ trợ bởi ba tài liệu nguồn riêng biệt (doc_101, doc_102 và doc_103), nhưng schema JSON đầu ra giới hạn nguồn trích dẫn ở một trường chuỗi đơn source_id. Do đó, pipeline buộc mô hình chỉ chọn doc_101, làm DocSynthesizer làm mất 66% trích dẫn bằng chứng trong quá trình kiểm tra audit. Schema và pipeline nên được tái cấu trúc như thế nào để bảo toàn đầy đủ nguồn gốc từ nhiều tài liệu?",
    "optionsEN": [
      "A. Duplicate the claim three times in the JSON array, attaching doc_101, doc_102, and doc_103 respectively to individual single-source objects.",
      "B. Concatenate the document identifiers into a single delimited string like \"doc_101, doc_102, doc_103\" within the scalar source_id field.",
      "C. Refactor the schema property to an array source_ids: [] or list of source attribution objects, allowing the model to link multiple supporting document IDs to a single claim.",
      "D. Instruct the LLM in the system prompt to synthesize only claims that originate from a single document to prevent schema validation mismatches."
    ],
    "options": [
      "A. Nhân bản khẳng định thành ba bản ghi trong mảng JSON, gắn lần lượt doc_101, doc_102 và doc_103 vào từng đối tượng nguồn đơn lẻ.",
      "B. Nối các mã định danh tài liệu thành một chuỗi phân cách như \"doc_101, doc_102, doc_103\" bên trong trường source_id dạng chuỗi đơn.",
      "C. Tái cấu trúc thuộc tính schema thành một mảng source_ids: [] hoặc danh sách các đối tượng trích dẫn nguồn, cho phép mô hình liên kết nhiều ID tài liệu hỗ trợ với một khẳng định duy nhất.",
      "D. Hướng dẫn LLM trong system prompt chỉ tổng hợp các khẳng định bắt nguồn từ một tài liệu duy nhất để tránh xung đột kiểm tra schema."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Duplicating the claim creates redundant assertions in downstream reports and breaks deduplication logic in long-form synthesis.",
      "Option B is incorrect: String concatenation breaks schema validation against structured document databases and prevents clean SQL/NoSQL foreign key indexing on individual document IDs.",
      "Option C is correct: Updating the JSON schema to support an array of source identifiers (e.g., source_ids or an array of source objects) natively captures multi-document evidentiary backing for a single synthesized claim without data loss.",
      "Option D is incorrect: Filtering out multi-document claims degrades report quality and ignores critical synthesized insights that span multiple source materials."
    ],
    "rationale": "Refactoring the schema from a scalar source_id field to an array source_ids (or a structured list of source tuples) enables the model to preserve complete multi-document provenance for synthesized claims, solving the 66% citation loss issue during audit validation without creating duplicate claim records or string parsing hacks.",
    "explanation": "Để giải quyết vấn đề mất mát trích dẫn bằng chứng khi một khẳng định tổng hợp được hỗ trợ bởi nhiều tài liệu nguồn:\\n\\n- Option A không phù hợp vì việc nhân bản cùng một khẳng định tạo ra dữ liệu dư thừa và làm hỏng logic khử trùng lặp (deduplication) trong báo cáo tổng hợp.\\n- Option B không phù hợp vì việc nối chuỗi khiến schema không thể truy vấn hoặc kiểm tra ràng buộc khóa ngoại (foreign key) với cơ sở dữ liệu tài liệu có cấu trúc.\\n- Option C là đáp án đúng vì việc chuyển trường source_id thành mảng source_ids: [] hoặc danh sách đối tượng nguồn cho phép mô hình lưu trữ chính xác mối quan hệ 1-nhiều giữa một khẳng định và nhiều tài liệu nguồn hỗ trợ, đảm bảo toàn vẹn provenance khi kiểm toán.\\n- Option D không phù hợp vì việc bỏ qua thông tin tổng hợp từ nhiều tài liệu làm giảm nghiêm trọng chất lượng báo cáo và mất đi các góc nhìn đa chiều.",
    "scenarioSignature": {
      "testedPrinciple": "multi-source evidence schema representation",
      "failureMode": "loss of supporting document citations during synthesis",
      "rootCause": "single scalar source identifier constraint in output schema",
      "requiredFix": "refactor schema to accept array of source identifiers with confidence scores"
    },
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  },
  {
    "id": "d5-b12-5.7-004",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-004",
    "questionEN": "An enterprise reporting service ExecutiveReporter generates long-form summaries by taking atomic claims from individual documents and combining them. In one execution, the pipeline fuses Claim 1 (\"Q3 revenue grew by 15% \", source doc_fin_q3.pdf) and Claim 2 (\"Customer churn decreased by 4% \", source doc_ops_q3.pdf) into a single summary sentence: \"In Q3, revenue grew by 15% while customer churn dropped by 4% \". However, the downstream pipeline retains only source_id: \"doc_fin_q3.pdf\" for the merged sentence, causing an audit failure where doc_ops_q3.pdf attribution is lost. What architectural change prevents this attribution drop during sentence fusion?",
    "question": "[d5-b12-5.7-004] Một dịch vụ báo cáo doanh nghiệp ExecutiveReporter tạo các tóm tắt dài bằng cách lấy các khẳng định nguyên tử (atomic claims) từ các tài liệu riêng lẻ và kết hợp chúng. Trong một lần thực thi, pipeline hợp nhất Khẳng định 1 (\"Doanh thu Q3 tăng 15% \", nguồn doc_fin_q3.pdf) và Khẳng định 2 (\"Tỷ lệ mất khách hàng giảm 4% \", nguồn doc_ops_q3.pdf) thành một câu tóm tắt duy nhất: \"Trong Q3, doanh thu tăng 15% trong khi tỷ lệ mất khách hàng giảm 4% \". Tuy nhiên, pipeline phía sau chỉ giữ lại source_id: \"doc_fin_q3.pdf\" cho câu đã hợp nhất, làm thất bại kiểm toán audit do mất trích dẫn doc_ops_q3.pdf. Thay đổi kiến trúc nào ngăn chặn việc mất trích dẫn này trong quá trình hợp nhất câu?",
    "optionsEN": [
      "A. Split the multi-claim sentence using a regex heuristic on conjunction words like \"while\" and assign the first source to all resulting fragments.",
      "B. Require the model to write separate paragraphs for each source document so that sentence fusion is strictly prohibited.",
      "C. Remove source_id metadata from summary sentences and rely exclusively on section-level bibliographies at the end of the report.",
      "D. Structure the synthesis step to maintain a mapping from each constituent atomic claim to its original source_id, ensuring merged output sentences inherit all supporting source IDs."
    ],
    "options": [
      "A. Tách câu chứa nhiều khẳng định bằng phương pháp regex dựa trên từ nối như \"trong khi\" và gán nguồn đầu tiên cho tất cả các đoạn thu được.",
      "B. Yêu cầu mô hình viết các đoạn văn riêng biệt cho từng tài liệu nguồn để cấm tuyệt đối việc hợp nhất câu.",
      "C. Loại bỏ thuộc tính source_id khỏi các câu tóm tắt và chỉ dựa vào danh mục tài liệu tham khảo ở cuối báo cáo.",
      "D. Cấu trúc bước tổng hợp để duy trì ánh xạ từ mỗi khẳng định nguyên tử cấu thành đến source_id ban đầu của nó, đảm bảo các câu đầu ra được hợp nhất thừa hưởng tất cả các ID nguồn hỗ trợ."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Splitting sentences via regex heuristics is fragile and re-assigns doc_fin_q3.pdf to the churn fragment, resulting in false attribution.",
      "Option B is incorrect: Prohibiting sentence fusion prevents concise executive summarization and ruins the readability of long-form synthesis.",
      "Option C is incorrect: Moving to document-level bibliographies destroys sentence-level and claim-level auditability required by compliance frameworks.",
      "Option D is correct: Tracking fine-grained atomic claim attribution prior to sentence fusion and propagating all constituent source_id references to the synthesized sentence guarantees that both doc_fin_q3.pdf and doc_ops_q3.pdf are preserved in downstream metadata."
    ],
    "rationale": "When sentence fusion combines multiple atomic claims into a single sentence, fine-grained claim tracking must be maintained so that the resulting synthesized sentence maps to all constituent source_id entries (doc_fin_q3.pdf and doc_ops_q3.pdf), preventing attribution loss during audit validation.",
    "explanation": "Khi tổng hợp văn bản dài và hợp nhất nhiều câu/khẳng định từ các tài liệu khác nhau thành một câu tóm tắt súc tích:\\n\\n- Option A không phù hợp vì quy tắc regex tách câu không thể xử lý ngữ nghĩa phức tạp và việc gán nguồn đầu tiên cho câu thứ hai sẽ gây ra lỗi gán sai trích dẫn (false attribution).\\n- Option B không phù hợp vì việc cấm hợp nhất câu khiến báo cáo tóm tắt trở nên rời rạc, lặp đi lặp lại và giảm trải nghiệm đọc của cấp quản lý.\\n- Option C không phù hợp vì việc bỏ source_id ở cấp câu/khẳng định và chuyển sang danh mục tài liệu tổng hợp ở cuối trang sẽ làm mất khả năng kiểm toán chính xác đến từng dòng (claim-level provenance).\\n- Option D là đáp án đúng vì việc duy trì ánh xạ trích dẫn ở cấp khẳng định nguyên tử và cho phép câu được hợp nhất kế thừa mảng danh sách source_id từ tất cả các khẳng định thành phần sẽ đảm bảo không làm mất trích dẫn của bất kỳ tài liệu nguồn nào.",
    "scenarioSignature": {
      "testedPrinciple": "fused claim provenance preservation",
      "failureMode": "unattributed secondary assertion in synthesized summary",
      "rootCause": "retaining single source identifier during multi-claim sentence fusion",
      "requiredFix": "map merged synthesis output sentences back to all constituent atomic claim sources"
    },
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  }
]