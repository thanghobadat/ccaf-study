[
  {
    "id": "d5-b12-5.7-001",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-001",
    "scenarioSignature": {
      "testedPrinciple": "context chunking and section wise synthesis",
      "failureMode": "shallow coverage and omission of later document sections",
      "rootCause": "monolithic prompt processing of long context document",
      "requiredFix": "decompose document into per section extraction workers before merging"
    },
    "questionEN": "An enterprise document pipeline, PolicyAnalyzerService, processes a 120-page regulatory compliance manual in a single prompt call to summarize section-by-section requirements. During execution, the model hits context limits, resulting in detailed coverage for the first 20 pages but superficial summaries and missing compliance obligations for sections past page 80. How should the pipeline architecture be modified to ensure uniform coverage across all sections?",
    "question": "[d5-b12-5.7-001] Hệ thống phân tích tài liệu enterprise, PolicyAnalyzerService, xử lý sổ tay tuân thủ quy định 120 trang trong một lệnh gọi prompt đơn lẻ để tóm tắt các yêu cầu theo từng phần. Trong quá trình thực thi, mô hình gặp giới hạn ngữ cảnh, dẫn đến việc phân tích chi tiết cho 20 trang đầu nhưng tóm tắt hời hợt và bỏ sót các nghĩa vụ tuân thủ đối với các phần sau trang 80. Kiến trúc pipeline nên được điều chỉnh như thế nào để đảm bảo độ bao phủ đồng đều trên tất cả các phần?",
    "optionsEN": [
      "A. Decompose the manual into section-level chunk tasks assigned to parallel extraction workers, then aggregate section summaries using a reconciliation merge step.",
      "B. Increase the completion token limit max_tokens parameter on the monolithic API call to allow longer generation length.",
      "C. Re-prompt the monolithic model with a strict system prompt instruction instructing equal word count distribution across all pages.",
      "D. Convert the input document from PDF to plain text formatting to reduce input token overhead."
    ],
    "options": [
      "A. Phân chia sổ tay thành các tác vụ phân đoạn cấp mục cho các worker trích xuất song song, sau đó tổng hợp các tóm tắt thành phần bằng bước hợp nhất đối soát.",
      "B. Tăng tham số giới hạn token hoàn tất max_tokens trên lệnh gọi API đơn khối để cho phép độ dài tạo văn bản lớn hơn.",
      "C. Gửi lại prompt cho mô hình đơn khối với hướng dẫn system prompt nghiêm ngặt yêu cầu phân bổ số lượng từ đồng đều trên tất cả các trang.",
      "D. Chuyển đổi tài liệu đầu vào từ định dạng PDF sang văn bản thuần (plain text) để giảm chi phí token đầu vào."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Splitting long-form documents into isolated section-level extraction tasks prevents context attenuation and ensures each segment receives full model attention before reconciliation.",
      "Option B is incorrect: Increasing max_tokens increases output ceiling but does not fix attention degradation and context compression issues over a 120-page input window.",
      "Option C is incorrect: System prompt instructions cannot override fundamental context window degradation or attention decay over extreme prompt lengths.",
      "Option D is incorrect: Converting PDF to plain text slightly reduces token count but does not solve monolithic context degradation across 120 pages of dense policy text."
    ],
    "rationale": "Monolithic long-form synthesis suffers from context attenuation where later sections receive degraded attention. Decomposing the document into section-level extraction tasks processed by dedicated workers guarantees deep, uniform coverage across all sections before final aggregation.",
    "explanation": "Lựa chọn A đúng vì việc phân chia tài liệu dài thành các tác vụ trích xuất độc lập ở cấp phần giúp tránh hiện tượng suy giảm chú ý (attention decay) và đảm bảo mọi mục đều được phân tích sâu trước khi đối soát hợp nhất.\nLựa chọn B sai vì tăng max_tokens chỉ cho phép chuỗi đầu ra dài hơn chứ không giải quyết được hiện tượng mô hình bỏ qua chi tiết ở cuối ngữ cảnh đầu vào.\nLựa chọn C sai vì chỉ thị prompt không thể vượt qua giới hạn vật lý về khả năng duy trì chú ý trên ngữ cảnh quá lớn.\nLựa chọn D sai vì việc chuyển đổi định dạng chỉ giảm nhẹ dung lượng token nhưng không giải quyết gốc rễ vấn đề xử lý đơn khối.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  },
  {
    "id": "d5-b12-5.7-002",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.7 long-form-synthesis / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d5-b12-5.7-002",
    "scenarioSignature": {
      "testedPrinciple": "structured data tuples for provenance preservation",
      "failureMode": "loss of source attribution during text synthesis merge",
      "rootCause": "unstructured prose citations stripped during final document aggregation",
      "requiredFix": "enforce structured claim source confidence schema across worker outputs"
    },
    "questionEN": "An automated research generator, MarketReportPipeline, deploys sub-agents to summarize individual industry sectors. Each sub-agent produces section drafts containing inline prose citations like '(Source: Q3 Earnings Call, p. 14)'. However, when the master synthesis agent merges these section drafts into a unified executive report, the inline prose citations are omitted or altered into uncited assertions. What architectural change prevents attribution loss during synthesis?",
    "question": "[d5-b12-5.7-002] Hệ thống tạo báo cáo nghiên cứu tự động, MarketReportPipeline, triển khai các agent con để tóm tắt từng ngành công nghiệp riêng biệt. Mỗi agent con tạo ra bản thảo phần chứa các trích dẫn dạng văn bản xuôi như '(Nguồn: Q3 Earnings Call, tr. 14)'. Tuy nhiên, khi agent tổng hợp chính hợp nhất các bản thảo này thành một báo cáo điều hành thống nhất, các trích dẫn văn bản xuôi bị bỏ sót hoặc bị biến đổi thành các khẳng định thiếu nguồn. Thay đổi kiến trúc nào ngăn chặn sự mất mát thuộc tính trích dẫn trong quá trình tổng hợp?",
    "optionsEN": [
      "A. Configure the master synthesis agent to run with a lower temperature setting to preserve original text verbatim.",
      "B. Require section workers to output structured {claim, source_id, confidence} JSON objects, enforcing attribution tracking through the final merge phase.",
      "C. Append a raw list of all source documents to the end of the final synthesized document without linking them to specific claims.",
      "D. Instruct sub-agents to replace prose citations with bold markdown text formatting before sending drafts to the master agent."
    ],
    "options": [
      "A. Cấu hình agent tổng hợp chính chạy với thiết lập temperature thấp hơn để giữ nguyên văn bản gốc.",
      "B. Yêu cầu các worker phân đoạn đầu ra đối tượng JSON cấu trúc {claim, source_id, confidence}, bắt buộc theo dõi thuộc tính trích dẫn qua giai đoạn hợp nhất cuối cùng.",
      "C. Đính kèm danh sách thô tất cả các tài liệu nguồn vào cuối tài liệu tổng hợp cuối cùng mà không liên kết chúng với các khẳng định cụ thể.",
      "D. Hướng dẫn các agent con thay thế trích dẫn văn bản xuôi bằng định dạng văn bản markdown in đậm trước khi gửi bản thảo cho agent chính."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Lowering temperature reduces sampling randomness but does not prevent an LLM from paraphrasing or dropping unstructured inline text strings during text summarization.",
      "Option B is correct: Structured tuples {claim, source_id, confidence} separate facts from text representation, ensuring provenance attributes are strictly preserved and validated programmatically during merging.",
      "Option C is incorrect: Adding a disconnected source list creates a generic bibliography but fails to maintain granular claim-to-source attribution throughout the report text.",
      "Option D is incorrect: Text formatting changes like bolding remain unstructured prose and are still subject to deletion or modification during master aggregation."
    ],
    "rationale": "Unstructured inline text citations are easily stripped or summarized away when a master synthesis model rewrites section drafts. Enforcing structured {claim, source_id, confidence} data payloads ensures provenance is maintained as explicit metadata throughout aggregation.",
    "explanation": "Lựa chọn B đúng vì cấu trúc dữ liệu JSON {claim, source_id, confidence} tách biệt thông tin thực tế khỏi định dạng văn bản, giúp quy trình hợp nhất theo dõi và bảo toàn chính xác nguồn gốc từng khẳng định.\nLựa chọn A sai vì giảm temperature chỉ giảm tính ngẫu nhiên của từ ngữ chứ không ngăn mô hình tổng hợp tự động viết lại và loại bỏ văn bản trích dẫn tự do.\nLựa chọn C sai vì đính kèm danh sách tài liệu ở cuối không giải quyết được việc liên kết chính xác giữa từng luận điểm cụ thể và nguồn trích dẫn của nó.\nLựa chọn D sai vì thay đổi định dạng markdown vẫn là văn bản không cấu trúc và tiếp tục bị mất trong quá trình tổng hợp của mô hình chính.",
    "sources": [
      {
        "label": "Lesson 5.7: Long-Form Synthesis",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-7-long-form-synthesis"
      }
    ]
  }
]