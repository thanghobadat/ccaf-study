[
  {
    "id": "d1-b03-B-005",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-005",
    "scenarioSignature": {
      "testedPrinciple": "explicit shared context injection across isolated subagent invocations",
      "failureMode": "aggregate API rate limit exceeded by parallel subagents",
      "rootCause": "coordinator fails to pass shared rate limit constraints to subagents",
      "requiredFix": "inject shared rate limit and concurrency bounds into subagent system instructions"
    },
    "questionEN": "An enterprise data processing coordinator spawns 5 parallel subagents to query a vendor API endpoint (https://api.enrichment.internal/v1/lookup). The coordinator system prompt defines a strict rate limit of 100 requests per minute (X-RateLimit-Limit: 100). However, the coordinator invokes each subagent without passing this rate limit constraint in the task prompt context. Consequently, all 5 subagents execute 25 concurrent API calls simultaneously (125 requests total within 10 seconds), triggering HTTP 429 Rate Limit Exceeded errors across all subagents. What is the root cause of this failure?",
    "question": "[d1-b03-B-005] Một coordinator xử lý dữ liệu doanh nghiệp khởi tạo 5 subagent song song để truy vấn endpoint API của nhà cung cấp (https://api.enrichment.internal/v1/lookup). System prompt của coordinator quy định giới hạn tốc độ nghiêm ngặt là 100 yêu cầu/phút (X-RateLimit-Limit: 100). Tuy nhiên, coordinator gọi từng subagent mà không truyền ràng buộc rate limit này vào ngữ cảnh task prompt. Kết quả là cả 5 subagent đồng thời thực hiện 25 lời gọi API song song (tổng cộng 125 yêu cầu trong 10 giây), làm kích hoạt lỗi HTTP 429 Rate Limit Exceeded trên toàn bộ các subagent. Nguyên nhân gốc rễ của thất bại này là gì?",
    "optionsEN": [
      "A. The coordinator spawned subagents without injecting the shared rate limit constraint into their task contexts, preventing subagents from pacing or allocating outbound API requests within the 100 req/min limit.",
      "B. The subagents lacked the Task tool in their allowedTools array, causing them to execute raw HTTP requests without passing required API authentication credentials.",
      "C. The coordinator failed to monitor HTTP response headers in real time, causing the socket pool to close connections whenever HTTP 429 codes were returned.",
      "D. The coordinator executed the subagents sequentially across multiple rounds, accumulating network latency and exceeding the server idle timeout."
    ],
    "options": [
      "A. Coordinator khởi tạo các subagent mà không inject ràng buộc rate limit dùng chung vào ngữ cảnh nhiệm vụ của chúng, khiến các subagent không thể điều tiết hoặc phân bổ số lượng yêu cầu API trong giới hạn 100 yêu cầu/phút.",
      "B. Các subagent thiếu công cụ Task trong mảng allowedTools, khiến chúng thực hiện các yêu cầu HTTP thô mà không truyền các thông tin xác thực API bắt buộc.",
      "C. Coordinator không theo dõi các HTTP response header theo thời gian thực, dẫn đến socket pool đóng kết nối mỗi khi nhận được mã HTTP 429.",
      "D. Coordinator thực thi các subagent một cách tuần tự qua nhiều vòng, làm tích tụ độ trễ mạng và vượt quá thời gian chờ rảnh (idle timeout) của máy chủ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because subagents execute in isolated context windows; failing to pass the coordinator's shared rate limit constraint prevents workers from pacing their 25 API requests within the global 100 req/min ceiling.",
      "Option B is incorrect because missing the Task tool prevents subagents from creating sub-tasks, but does not cause an aggregate rate limit breach across direct API calls.",
      "Option C is incorrect because HTTP header monitoring and socket management relate to network connection handling rather than missing operational constraints in the subagent prompt context.",
      "Option D is incorrect because sequential execution would spread out API requests over time, reducing peak concurrency rather than causing a burst of 125 simultaneous requests."
    ],
    "rationale": "Subagents execute with isolated context windows and do not implicitly share the coordinator's environment or prompt instructions. When multiple subagents share an external resource quota (such as an API rate limit of 100 req/min), the coordinator must explicitly inject these constraints into each subagent's invocation context (or assign individual rate quotas) to prevent aggregate threshold breaches.",
    "explanation": "Subagent hoạt động trong các cửa sổ ngữ cảnh hoàn toàn cô lập và không tự động kế thừa các thông tin hay quy tắc từ coordinator. Khi nhiều subagent cùng truy vấn một tài nguyên ngoài có giới hạn tốc độ (như 100 yêu cầu/phút), coordinator phải truyền một cách tường minh các ràng buộc này vào prompt khởi tạo của từng subagent (hoặc chia nhỏ quota cho từng subagent).\n- Option A đúng: Coordinator đã không truyền thông tin rate limit vào ngữ cảnh của subagent, khiến 5 subagent tạo ra 125 yêu cầu đồng thời và làm quá tải API.\n- Option B sai: Việc thiếu công cụ Task làm subagent không thể gọi subagent con, không liên quan trực tiếp đến việc vượt giới hạn rate limit API.\n- Option C sai: Theo dõi HTTP header hay socket pool là vấn đề xử lý hạ tầng mạng, không giải quyết việc thiếu ràng buộc ngữ cảnh ban đầu.\n- Option D sai: Thực thi tuần tự sẽ làm giảm số lượng yêu cầu đồng thời chứ không tạo ra đợt bùng nổ 125 yêu cầu gây lỗi HTTP 429.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-006",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-006",
    "scenarioSignature": {
      "testedPrinciple": "sequential multi-round invocation for dependent subagent tasks",
      "failureMode": "downstream subagent executes prematurely with missing dependency data",
      "rootCause": "coordinator spawns dependent subagent in parallel before upstream task completes",
      "requiredFix": "enforce sequential round dependency waiting for upstream subagent completion"
    },
    "questionEN": "An automated financial audit system uses a coordinator agent to process earnings reports. Subagent A is designed to extract key metrics into a financial_summary.json schema, while Subagent B requires financial_summary.json as input to perform risk modeling. The coordinator erroneously invokes both Subagent A and Subagent B in parallel during the initial execution round. As a result, Subagent B executes immediately, fails to find financial_summary.json, and crashes with a missing parameter error before Subagent A completes. Which orchestration defect caused this failure?",
    "question": "[d1-b03-B-006] Một hệ thống kiểm toán tài chính tự động sử dụng coordinator agent để xử lý các báo cáo doanh thu. Subagent A có nhiệm vụ trích xuất các chỉ số chính vào schema financial_summary.json, trong khi Subagent B bắt buộc cần file financial_summary.json làm đầu vào để thực hiện mô hình hóa rủi ro. Coordinator đã khởi tạo nhầm cả Subagent A và Subagent B song song trong vòng thực thi ban đầu. Kết quả là Subagent B chạy ngay lập tức, không tìm thấy financial_summary.json, và bị lỗi thiếu tham số trước khi Subagent A hoàn thành. Khuyết điểm điều phối (orchestration defect) nào đã gây ra thất bại này?",
    "optionsEN": [
      "A. Subagent B failed to acquire a table-level database lock, creating a data race condition during concurrent schema writes.",
      "B. The coordinator spawned Subagent B concurrently with Subagent A instead of waiting for Subagent A to finish and passing its generated output to Subagent B.",
      "C. Subagent A converted the structured JSON output into unstructured text, causing Subagent B to fail its schema validation check.",
      "D. The coordinator injected its full past chat trajectory into Subagent B, exceeding context limits and truncating the input arguments."
    ],
    "options": [
      "A. Subagent B không lấy được khóa cơ sở dữ liệu cấp bảng (table-level lock), tạo ra điều kiện tranh chấp dữ liệu (data race) khi ghi schema đồng thời.",
      "B. Coordinator đã khởi tạo Subagent B đồng thời với Subagent A thay vì chờ Subagent A hoàn thành để lấy kết quả đầu ra truyền vào Subagent B.",
      "C. Subagent A chuyển đổi đầu ra JSON có cấu trúc thành văn bản không cấu trúc, khiến Subagent B thất bại trong bước kiểm tra validation schema.",
      "D. Coordinator đã truyền toàn bộ lịch sử trò chuyện quá khứ vào Subagent B, làm quá tải giới hạn ngữ cảnh và cắt bỏ các tham số đầu vào."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because database locking issues concern database concurrency, not coordinator-level execution dependencies where Subagent B ran before Subagent A finished.",
      "Option B is correct because downstream subagents dependent on upstream outputs must be invoked sequentially in a subsequent round after the prerequisite data is generated and passed.",
      "Option C is incorrect because Subagent A had not yet completed execution when Subagent B failed, so output format formatting was not the root cause.",
      "Option D is incorrect because full history injection causes token limit or context window truncation errors rather than premature execution of dependent workers."
    ],
    "rationale": "When subagent workflows exhibit data dependencies (Subagent B requires output from Subagent A), the coordinator must enforce strict sequential round execution. Spawning dependent subagents concurrently causes the downstream worker to execute without its prerequisite context, leading to execution failures or hallucinated data.",
    "explanation": "Khi một quy trình làm việc giữa các subagent có phụ thuộc dữ liệu (Subagent B cần đầu ra từ Subagent A), coordinator phải áp dụng mô hình điều phối tuần tự theo vòng (multi-round orchestration). Việc kích hoạt các subagent có phụ thuộc một cách song song sẽ khiến subagent phía sau chạy ngay khi dữ liệu tiền đề chưa tồn tại.\n- Option A sai: Khóa cơ sở dữ liệu không phải là nguyên nhân khiến subagent B bị gọi khi chưa có dữ liệu đầu vào từ subagent A.\n- Option B đúng: Coordinator đã chạy song song hai subagent thay vì chờ Subagent A hoàn thành để lấy kết quả truyền cho Subagent B.\n- Option C sai: Subagent A còn chưa hoàn thành nhiệm vụ thì Subagent B đã thất bại, nên đây không phải lỗi định dạng dữ liệu của Subagent A.\n- Option D sai: Việc tràn ngữ cảnh do truyền toàn bộ history sẽ gây ra lỗi token limit hoặc mất ngữ cảnh chung, không phải lỗi thiếu tham số file do chạy sớm.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]