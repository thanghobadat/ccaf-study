[
  {
    "id": "d4-b10-4.7-013",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-013",
    "scenarioSignature": {
      "testedPrinciple": "distinguishing domain context safety in fallback defaults",
      "failureMode": "silent financial discrepancy from default value insertion",
      "rootCause": "applying uniform fallback values to critical numeric schema fields",
      "requiredFix": "routing validation failures on critical fields to fallback review while allowing non-critical default substitution"
    },
    "questionEN": "An invoice extraction pipeline uses Gemini 1.5 Flash with Pydantic output validation to process vendor receipts into InvoiceData(vendor_name: str, display_category: str = \"General\", total_amount: float = 0.0). When extraction or JSON validation fails after 3 retry attempts, the service triggers a global fallback handler that applies schema default values (display_category = \"General\", total_amount = 0.0) to persist incomplete records into PostgreSQL. While defaulting display_category causes no operational risk in the UI, defaulting total_amount to 0.0 causes invalid $0 ledger entries in the accounting database. Which validation and fallback architecture should the team implement to handle retry exhaustion safely?",
    "question": "[d4-b10-4.7-013] Một đường ống trích xuất hóa đơn sử dụng Gemini 1.5 Flash với Pydantic để kiểm định đầu ra thành InvoiceData(vendor_name: str, display_category: str = \"General\", total_amount: float = 0.0). Khi việc trích xuất hoặc kiểm định JSON thất bại sau 3 lần thử lại, dịch vụ kích hoạt một trình xử lý fallback toàn cục áp dụng các giá trị mặc định của schema (display_category = \"General\", total_amount = 0.0) để lưu bản ghi chưa hoàn chỉnh vào PostgreSQL. Trong khi việc gán mặc định cho display_category không gây rủi ro vận hành trên giao diện, việc gán total_amount thành 0.0 gây ra các bút toán sổ sách 0 USD không hợp lệ trong cơ sở dữ liệu kế toán. Kiến trúc kiểm định và fallback nào đội ngũ nên triển khai để xử lý việc cạn kệt số lần thử lại một cách an toàn?",
    "optionsEN": [
      "A. Implement field-level fallback strategies where non-critical fields like display_category accept safe defaults, while critical financial fields like total_amount trigger human-in-the-loop review upon retry exhaustion.",
      "B. Apply global schema default values across all failed fields to ensure 100% automated database ingestion without manual intervention.",
      "C. Increase max retry attempts from 3 to 10 for financial fields while retaining zero-dollar fallback values when all retries fail.",
      "D. Replace the Pydantic schema validation with a regex post-processor that automatically converts empty financial strings to 0.0 before persistence."
    ],
    "options": [
      "A. Triển khai chiến lược fallback theo từng trường, trong đó các trường không quan trọng như display_category chấp nhận giá trị mặc định an toàn, còn các trường tài chính quan trọng như total_amount sẽ kích hoạt quy trình xem xét của con người khi hết lượt thử lại.",
      "B. Áp dụng giá trị mặc định schema toàn cục cho tất cả các trường bị lỗi để đảm bảo nạp dữ liệu tự động 100% vào cơ sở dữ liệu mà không cần can thiệp thủ công.",
      "C. Tăng số lần thử lại tối đa từ 3 lên 10 cho các trường tài chính trong khi vẫn giữ nguyên giá trị fallback 0 USD khi tất cả các lần thử lại đều thất bại.",
      "D. Thay thế việc kiểm định schema Pydantic bằng một bộ xử lý sau dùng regex để tự động chuyển đổi các chuỗi tài chính rỗng thành 0.0 trước khi lưu trữ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because fallback defaults are context-dependent: non-critical metadata (like UI labels) can safely use default strings, whereas critical numeric fields (like financial totals) risk silent corruptions when defaulted to zero and must be escalated for human review upon retry exhaustion.",
      "Option B is incorrect because applying global defaults uniformly across financial fields writes invalid $0 invoice amounts directly into accounting ledgers, breaking financial integrity.",
      "Option C is incorrect because increasing retry limits does not eliminate the core risk of persisting $0 fallbacks when model extractions permanently fail after the 10th attempt.",
      "Option D is incorrect because converting unextracted or missing financial fields to 0.0 via regex bypasses valid data extraction entirely and guarantees incorrect accounting entries."
    ],
    "rationale": "Fallback safety depends on the business impact of default values. Non-critical display labels tolerate low-risk fallback values, but high-consequence numeric fields like invoice amounts must never fail open with zero or arbitrary defaults. Upon retry exhaustion, critical fields must trigger alternative workflows such as human verification.",
    "explanation": "Lựa chọn A là đáp án đúng vì an toàn của giá trị mặc định phụ thuộc vào ngữ cảnh nghiệp vụ: các trường không quan trọng (như nhãn hiển thị UI) có thể sử dụng giá trị mặc định an toàn, trong khi các trường tài chính quan trọng (như tổng tiền hóa đơn) có nguy cơ làm sai lệch dữ liệu nếu gán bằng 0 và phải chuyển cho con người xem xét khi hết lượt thử lại.\nLựa chọn B sai vì việc áp dụng mặc định toàn cục cho các trường tài chính sẽ ghi trực tiếp số tiền 0 USD sai lệch vào sổ sách kế toán, vi phạm tính toàn vẹn dữ liệu.\nLựa chọn C sai vì việc tăng số lần thử lại không giải quyết được rủi ro cốt lõi khi mô hình vẫn thất bại sau 10 lần và tiếp tục ghi đè giá trị fallback 0 USD.\nLựa chọn D sai vì việc tự động biến đổi chuỗi rỗng thành 0.0 bằng regex sẽ bỏ qua quá trình kiểm định dữ liệu và bảo đảm tạo ra các bản ghi kế toán sai sự thật.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  },
  {
    "id": "d4-b10-4.7-014",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-014",
    "scenarioSignature": {
      "testedPrinciple": "context window optimization in validation retry loops",
      "failureMode": "exponential token growth and latency accumulation during retries",
      "rootCause": "appending complete model outputs and raw schemas across all retry turns",
      "requiredFix": "truncating past attempts to retain only the latest rejected output and specific validator error"
    },
    "questionEN": "An automated claim processing agent calls Gemini Flash in a structured loop to extract ClaimReport JSON objects. When JSonschema validation fails, the retry handler appends the full previous conversation history—including full prompt context, verbose JSON responses, and stack traces—to the next prompt request. By retry attempt 3, prompt tokens increase from 1,200 to 18,500 tokens, causing p99 latency to jump from 850ms to 6,200ms and exceeding API token limits. How should the engineering team refactor the retry prompt context management?",
    "question": "[d4-b10-4.7-014] Một tác vụ xử lý yêu cầu bồi thường tự động gọi Gemini Flash trong một vòng lặp cấu trúc để trích xuất đối tượng JSON ClaimReport. Khi kiểm định JSONSchema thất bại, trình xử lý thử lại nối toàn bộ lịch sử trò chuyện trước đó—bao gồm ngữ cảnh prompt đầy đủ, phản hồi JSON chi tiết và stack trace—vào yêu cầu prompt tiếp theo. Đến lần thử lại thứ 3, số lượng token của prompt tăng từ 1.200 lên 18.500 token, khiến độ trễ p99 tăng từ 850ms lên 6.200ms và vượt quá giới hạn token của API. Đội ngũ kỹ thuật nên tái cấu trúc việc quản lý ngữ cảnh prompt thử lại như thế nào?",
    "optionsEN": [
      "A. Append all historical raw JSON responses and full stack traces sequentially into the system prompt to maximize model self-correction context.",
      "B. Truncate previous dialogue turns and provide only the initial user prompt along with the most recent failed JSON output and exact schema validation error message.",
      "C. Clear all context on validation failure and re-issue the original prompt from scratch without passing rejected outputs or error messages.",
      "D. Compress the full multi-turn conversation into a single summarized paragraph using an auxiliary LLM before sending each retry attempt."
    ],
    "options": [
      "A. Nối tất cả các phản hồi JSON thô lịch sử và stack trace đầy đủ theo thứ tự vào system prompt để tối đa hóa ngữ cảnh tự sửa lỗi của mô hình.",
      "B. Cắt bỏ các lượt trò chuyện trước đó và chỉ cung cấp prompt ban đầu của người dùng cùng với đầu ra JSON thất bại gần nhất và thông báo lỗi kiểm định schema chính xác.",
      "C. Xóa toàn bộ ngữ cảnh khi thất bại kiểm định và gửi lại prompt ban đầu từ đầu mà không truyền các đầu ra bị từ chối hoặc thông báo lỗi.",
      "D. Nén toàn bộ cuộc trò chuyện nhiều lượt thành một đoạn tóm tắt duy nhất bằng một LLM phụ trước khi gửi mỗi lần thử lại."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because keeping all past attempts and verbose stack traces rapidly inflates prompt tokens and latency without improving model correction fidelity.",
      "Option B is correct because concise retry history (retaining only the original instruction, the immediate failing output, and the specific validation error) provides necessary self-correction signals while bounding token count and execution latency.",
      "Option C is incorrect because dropping the failed output and validation error deprives the LLM of feedback on what went wrong, often causing it to repeat identical generation mistakes.",
      "Option D is incorrect because calling a secondary LLM summarizer on every retry attempt introduces unnecessary API call overhead, added latency, and potential loss of specific structural error details."
    ],
    "rationale": "Accumulating complete retry histories in LLM prompts causes exponential token growth and severe latency penalties. The optimal retry strategy maintains a minimal context window containing only the original prompt, the most recent bad output, and the explicit validation failure error.",
    "explanation": "Lựa chọn B là đáp án đúng vì lịch sử thử lại ngắn gọn (chỉ giữ lại chỉ dẫn ban đầu, đầu ra lỗi gần nhất và lỗi kiểm định cụ thể) cung cấp đủ tín hiệu để mô hình tự sửa lỗi trong khi kiểm soát số lượng token và độ trễ thực thi.\nLựa chọn A sai vì việc giữ lại tất cả các lần thử trước đó và stack trace làm tăng nhanh chóng token và độ trễ mà không mang lại hiệu quả sửa lỗi tốt hơn.\nLựa chọn C sai vì việc xóa bỏ đầu ra bị lỗi và thông báo lỗi sẽ làm mất tín hiệu phản hồi, khiến mô hình dễ lặp lại chính xác lỗi ban đầu.\nLựa chọn D sai vì việc gọi một LLM phụ để tóm tắt ở mỗi lần thử lại tạo ra chi phí cuộc gọi API không cần thiết, làm tăng độ trễ và có thể làm thất lạc các chi tiết lỗi cấu trúc cụ thể.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  }
]