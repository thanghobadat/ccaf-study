[
  {
    "id": "d5-b12-5.7-005",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-005",
    "scenarioSignature": {
      "testedPrinciple": "epistemic modality preservation in text synthesis",
      "failureMode": "speculative hedging statements converted into definitive claims",
      "rootCause": "summarization prompt altering modal verbs during paraphrase",
      "requiredFix": "enforce modal certainty schema fields and verbatim hedge preservation"
    },
    "questionEN": "An enterprise security intelligence system VulnerabilityAuditPipeline processes multi-page threat reports to generate executive summaries. During synthesis of an advisory document, the source report states: 'CVE-2026-4401 may allow unauthorized access under specific race conditions.' However, the LLM synthesis module outputs: 'CVE-2026-4401 will allow unauthorized access,' triggering false-positive critical security alerts (alert_severity: CRITICAL) in the downstream SOC dashboard. Which architectural intervention prevents the synthesis layer from overstating source certainty during paraphrasing?",
    "question": "[d5-b12-5.7-005] Một hệ thống tình báo bảo mật doanh nghiệp VulnerabilityAuditPipeline xử lý các báo cáo mối đe dọa đa trang để tạo tóm tắt cho cấp quản lý. Trong quá trình tổng hợp một tài liệu khuyến cáo, báo cáo gốc ghi: 'CVE-2026-4401 may allow unauthorized access under specific race conditions.' Tuy nhiên, mô-đun tổng hợp LLM tạo đầu ra: 'CVE-2026-4401 will allow unauthorized access,' kích hoạt các cảnh báo bảo mật nghiêm trọng giả (alert_severity: CRITICAL) trên bảng điều khiển SOC hạ nguồn. Giải pháp kiến trúc nào ngăn chặn tầng tổng hợp khẳng định quá mức độ tin cậy của nguồn trong quá trình diễn giải (paraphrasing)?",
    "optionsEN": [
      "A. Include an epistemic_modality field in the extraction schema {claim, source_id, modality, confidence_score} and enforce system prompt directives that strictly map original hedge terms ('may', 'might', 'could') to non-definitive summary statements.",
      "B. Increase the LLM inference temperature parameter to 0.7 to encourage diverse natural language paraphrasing while omitting modal auxiliary verbs.",
      "C. Apply a post-processing filter that removes all modal auxiliary verbs ('may', 'might', 'will', 'could') from synthesized claim strings prior to database insertion.",
      "D. Implement semantic vector deduplication across synthesized claims using cosine similarity thresholds without validating certainty attributes."
    ],
    "options": [
      "A. Bổ sung trường epistemic_modality vào schema trích xuất {claim, source_id, modality, confidence_score} và áp dụng chỉ thị system prompt bắt buộc ánh xạ chính xác các từ giảm nhẹ gốc ('may', 'might', 'could') thành các câu tóm tắt không mang tính khẳng định tuyệt đối.",
      "B. Tăng tham số nhiệt độ suy luận (temperature) của LLM lên 0.7 để khuyến khích diễn giải ngôn ngữ tự nhiên đa dạng hơn đồng thời bỏ qua các trợ động từ tình thái.",
      "C. Áp dụng bộ lọc hậu xử lý để xóa tất cả các trợ động từ tình thái ('may', 'might', 'will', 'could') khỏi chuỗi khẳng định đã tổng hợp trước khi ghi vào cơ sở dữ liệu.",
      "D. Triển khai khử trùng lặp vectơ ngữ nghĩa (vector deduplication) trên các khẳng định được tổng hợp bằng ngưỡng độ tương đồng cosine mà không xác thực thuộc tính độ tin cậy."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because introducing an explicit epistemic_modality attribute into the extracted claim schema and enforcing modal preservation in prompt guidelines ensures speculative or hedged statements retain their non-definitive framing ('may') during synthesis, preventing false-positive alert escalation.",
      "Option B is incorrect because raising the inference temperature increases token sampling variance, which exacerbates subtle semantic shifts and hallucinated certainty rather than constraining modality.",
      "Option C is incorrect because stripping modal verbs entirely removes vital context about risk likelihood, turning nuanced technical findings into grammatically flawed or ambiguous assertions.",
      "Option D is incorrect because vector similarity deduplication merges semantically related assertions based on topic proximity but does not inspect or enforce modal certainty metadata."
    ],
    "rationale": "Enforcing explicit epistemic modality fields within the extraction schema and constraining prompt instructions prevents the synthesizer from mutating hedged assertions ('may') into absolute statements ('will'), preserving source certainty.",
    "explanation": "Đáp án A đúng vì việc đưa thuộc tính epistemic_modality vào schema trích xuất thông tin kết hợp với quy tắc prompt nghiêm ngặt bắt buộc LLM phải bảo lưu chính xác mức độ chắc chắn của câu gốc (như từ 'may' chuyển thành các cụm từ thể hiện khả năng thay vì đổi sang 'will' mang tính khẳng định tuyệt đối). Điều này ngăn chặn việc phóng đại rủi ro bảo mật và tránh kích hoạt cảnh báo sai ở hệ thống SOC hạ nguồn.\n\nĐáp án B sai vì việc tăng temperature lên 0.7 làm tăng tính ngẫu nhiên khi sinh từ, khiến LLM dễ suy diễn và biến đổi ngữ nghĩa của từ ngữ hơn thay vì duy trì tính chính xác của phương thức tình thái.\n\nĐáp án C sai vì việc loại bỏ toàn bộ trợ động từ tình thái bằng hậu xử lý regex làm mất thông tin quan trọng về xác suất xảy ra sự cố, khiến câu tóm tắt trở nên mơ hồ hoặc sai cú pháp.\n\nĐáp án D sai vì khử trùng lặp dựa trên độ tương đồng vectơ chỉ so sánh khoảng cách ngữ nghĩa giữa các văn bản chứ không kiểm tra hay ràng buộc các thuộc tính độ tin cậy/tình thái của thông tin.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  },
  {
    "id": "d5-b12-5.7-006",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-006",
    "scenarioSignature": {
      "testedPrinciple": "cross-chunk claim reconciliation and deduplication",
      "failureMode": "duplicate claims and repeated citations in synthesized report",
      "rootCause": "sliding window chunk overlap producing redundant extracted assertions",
      "requiredFix": "normalize and deduplicate extracted claims prior to report assembly"
    },
    "questionEN": "A financial research assistant RegulatoryReportGenerator ingests long PDF filings using a sliding window chunking strategy (1,000-token chunks with 200-token overlap). When synthesizing a multi-section industry risk assessment, overlapping text boundaries cause the LLM to extract identical factual assertions twice, resulting in duplicate summary bullets and duplicated citation footnotes (duplicate_citation_ratio: 0.38) in the final output. Which pipeline design pattern resolves this repetition?",
    "question": "[d5-b12-5.7-006] Một trợ lý nghiên cứu tài chính RegulatoryReportGenerator nạp các hồ sơ PDF dài bằng chiến lược chia nhỏ cửa sổ trượt (chunks 1.000 token với độ chồng lấp 200 token). Khi tổng hợp đánh giá rủi ro ngành đa mục, các biên bản bản văn bị chồng lấp khiến LLM trích xuất các khẳng định thực tế giống hệt nhau hai lần, dẫn đến các đầu dòng tóm tắt bị trùng lặp và các chú thích trích dẫn bị lặp lại (duplicate_citation_ratio: 0.38) trong kết quả cuối cùng. Mô hình thiết kế đường ống (pipeline design pattern) nào giải quyết hiện tượng lặp lại này?",
    "optionsEN": [
      "A. Increase chunk overlap size from 200 tokens to 500 tokens in the document ingestion pipeline to ensure no boundary sentences are missed.",
      "B. Implement a two-phase synthesis architecture where extracted claims are normalized and deduplicated by {normalized_claim, source_id} canonical keys before final report generation.",
      "C. Set the chunk max token limit to 128 tokens and process each chunk in isolation without maintaining source paragraph references.",
      "D. Instruct the downstream rendering template to suppress identical string citations based on exact regex matching of document URLs."
    ],
    "options": [
      "A. Tăng kích thước chồng lấp của chunk từ 200 token lên 500 token trong đường ống nạp tài liệu để đảm bảo không bỏ sót câu ranh giới nào.",
      "B. Triển khai kiến trúc tổng hợp hai giai đoạn, trong đó các khẳng định trích xuất được chuẩn hóa và khử trùng lặp theo các khóa định danh {normalized_claim, source_id} trước khi tạo báo cáo cuối cùng.",
      "C. Giới hạn kích thước token tối đa của chunk xuống 128 token và xử lý độc lập từng chunk mà không duy trì tham chiếu đoạn văn gốc.",
      "D. Chỉ thị cho template hiển thị hạ nguồn loại bỏ các trích dẫn chuỗi giống hệt nhau dựa trên khớp chuỗi chính xác regex của URL tài liệu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because increasing chunk overlap widens the boundary window, exacerbating content repetition and creating even more duplicate claims across adjacent chunks.",
      "Option B is correct because separating claim extraction from synthesis via a normalization and canonical deduplication pass merges identical claims and citations derived from overlapping chunk boundaries before generating the final report.",
      "Option C is incorrect because drastically reducing chunk size fragments semantic context and increases total chunk count without resolving boundary duplication.",
      "Option D is incorrect because exact regex URL suppression only hides duplicate footnote links while leaving duplicated text claims and redundant body content intact."
    ],
    "rationale": "Implementing a canonical normalization and deduplication phase on extracted {normalized_claim, source_id} tuples prior to report assembly eliminates redundant claims and duplicate citations caused by overlapping document chunks.",
    "explanation": "Đáp án B đúng vì hiện tượng trùng lặp thông tin và trích dẫn xảy ra do chiến lược chia chunk chồng lấp (sliding window chunking). Việc áp dụng quy trình tổng hợp 2 giai đoạn (tách riêng đoạn trích xuất claim và đoạn hợp nhất synthesis) cho phép hệ thống gom nhóm, chuẩn hóa và khử trùng lặp các claim trùng khớp thông qua bộ khóa định danh {normalized_claim, source_id} trước khi đưa vào văn bản tổng hợp cuối cùng.\n\nĐáp án A sai vì việc tăng độ chồng lấp token lên 500 càng làm gia tăng lượng thông tin trùng lặp giữa các chunk liền kề, làm tệ hơn tỷ lệ trích dẫn trùng lặp.\n\nĐáp án C sai vì giảm kích thước chunk quá nhỏ làm manh mún ngữ nghĩa của văn bản và tăng số lượng chunk xử lý mà không xử lý tận gốc vấn đề trùng lặp ở ranh giới.\n\nĐáp án D sai vì bộ lọc regex ở template hiển thị chỉ ẩn đi các đường link URL giống hệt nhau ở phần chú thích mà không loại bỏ các câu văn/đầu dòng tóm tắt bị lặp lại trong nội dung chính của báo cáo.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  }
]