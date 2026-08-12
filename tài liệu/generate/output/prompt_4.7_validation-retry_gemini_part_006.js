[
  {
    "id": "d4-b10-4.7-011",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-011",
    "questionEN": "An automated medical credentialing service calls an external microservice MasterNPIValidator to verify the extracted npi_number field before persisting records. During network congestion, calls to MasterNPIValidator fail with an HTTP 504 Gateway Timeout. The pipeline's exception handler catches this timeout and appends \"Error: MasterNPIValidator timeout after 5000ms\" to the LLM retry prompt. Consequently, the model assumes its extracted npi_number was invalid and hallucinates a different NPI number during the retry loop. What architectural correction prevents this hallucination?",
    "question": "[d4-b10-4.7-011] Một dịch vụ xác minh chứng chỉ y tế tự động gọi microservice bên ngoài MasterNPIValidator để kiểm tra trường npi_number được trích xuất trước khi lưu bản ghi. Trong đợt nghẽn mạng, các cuộc gọi đến MasterNPIValidator bị lỗi HTTP 504 Gateway Timeout. Trình xử lý ngoại lệ của pipeline bắt lấy timeout này và nối chuỗi \"Error: MasterNPIValidator timeout after 5000ms\" vào prompt retry của LLM. Kết quả là mô hình cho rằng npi_number đã trích xuất bị sai và tạo ra (hallucinate) một số NPI khác trong vòng lặp retry. Sửa đổi kiến trúc nào sẽ ngăn chặn hiện tượng hallucination này?",
    "optionsEN": [
      "A. Add a rule to the retry prompt instructing the model to leave npi_number blank whenever MasterNPIValidator times out.",
      "B. Increase the model generation temperature to 0.7 during retry requests to encourage novel NPI candidates.",
      "C. Distinguish transient validator infrastructure timeouts from schema validation errors, routing service timeouts to an infrastructure HTTP retry handler without invoking LLM feedback retries.",
      "D. Catch the HTTP 504 timeout and automatically fall back to regex extraction for the npi_number without validating against MasterNPIValidator."
    ],
    "options": [
      "A. Thêm quy tắc vào prompt retry hướng dẫn mô hình để trống trường npi_number bất cứ khi nào MasterNPIValidator bị timeout.",
      "B. Tăng tham số temperature phát sinh của mô hình lên 0.7 trong các yêu cầu retry để khuyến khích tạo ra các ứng viên NPI mới.",
      "C. Phân biệt lỗi timeout hạ tầng của dịch vụ validator với lỗi xác thực schema/dữ liệu, chuyển hướng timeout dịch vụ sang trình xử lý retry HTTP hạ tầng mà không kích hoạt retry phản hồi cho LLM.",
      "D. Bắt lỗi HTTP 504 timeout và tự động chuyển sang trích xuất npi_number bằng regex mà không cần xác thực lại với MasterNPIValidator."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Leaving npi_number blank mutates valid extracted data based on transient external service downtime.",
      "Option B is incorrect: Increasing temperature exacerbates hallucination when the original extracted NPI was actually valid.",
      "Option C is correct: Correctly isolates transient infrastructure failures from payload errors, retrying the validator request directly without misleading the LLM into mutating valid output.",
      "Option D is incorrect: Falling back to regex extraction bypasses external verification entirely and does not resolve the root cause of treating timeout errors as prompt retries."
    ],
    "rationale": "Transient validator failures (such as HTTP 504 timeouts) reflect external infrastructure unavailability, not invalid model outputs. Feeding infrastructure error messages into the LLM correction prompt tricks the model into thinking its extracted data was incorrect, causing unnecessary hallucinations. Infrastructure retries must be handled at the network/service client layer without altering the prompt context or triggering model re-generation.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Option A không phù hợp vì việc xóa trống dữ liệu npi_number khi hệ thống ngoài gặp sự cố mạng sẽ làm mất thông tin chính xác đã trích xuất ban đầu.\\n- Option B không phù hợp vì tăng temperature khi retry càng khiến mô hình ảo tưởng ra nhiều số NPI sai lệch hơn trong khi dữ liệu ban đầu có thể đã đúng.\\n- Option C là đáp án đúng vì lỗi timeout của MasterNPIValidator là sự cố hạ tầng tạm thời, không phải lỗi logic/schema của dữ liệu đầu ra mô hình. Cần tách biệt hai loại lỗi này để retry ở tầng mạng/HTTP client thay vì gửi thông báo lỗi hạ tầng vào prompt retry của LLM.\\n- Option D không phù hợp vì bỏ qua bước xác thực ngoài bằng cách fallback sang regex không giải quyết gốc rễ của việc nhầm lẫn sự cố hạ tầng với lỗi dữ liệu.",
    "scenarioSignature": {
      "testedPrinciple": "Distinction between infrastructure exceptions and model payload validation errors",
      "failureMode": "Model hallucinates replacement values upon receiving timeout errors in feedback prompt",
      "rootCause": "Transient validator service timeouts treated as schema or domain validation failures",
      "requiredFix": "Isolate infrastructure retry loops from LLM self-correction retry loops"
    },
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  },
  {
    "id": "d4-b10-4.7-012",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-012",
    "scenarioSignature": {
      "testedPrinciple": "Independent per-record validation in batch structured output pipelines",
      "failureMode": "Discarding entire valid dataset due to single record schema violation",
      "rootCause": "All-or-nothing array schema validation applied to batch output",
      "requiredFix": "Validate each array element independently and target retries to failed records"
    },
    "questionEN": "An enterprise ingestion service LogisticsBatchProcessor extracts shipping records into a JSON array manifest_records. When processing 50 records in a single call, if 1 record has an invalid weight_kg schema field, the application's root JSON Schema validator rejects the entire array. This causes all 49 valid records to be discarded and triggers a full 50-record model retry, causing high latency and API token exhaustion. How should the validation pipeline be redesigned?",
    "question": "[d4-b10-4.7-012] Một dịch vụ nạp dữ liệu doanh nghiệp LogisticsBatchProcessor trích xuất các bản ghi vận chuyển thành một mảng JSON manifest_records. Khi xử lý 50 bản ghi trong một lời gọi, nếu có 1 bản ghi vi phạm schema trường weight_kg, trình xác thực JSON Schema ở cấp gốc của ứng dụng sẽ từ chối toàn bộ mảng. Điều này khiến cả 49 bản ghi hợp lệ còn lại bị loại bỏ và kích hoạt retry toàn bộ 50 bản ghi với mô hình, gây ra độ trễ cao và cạn kiệt token API. Pipeline xác thực nên được thiết kế lại như thế nào?",
    "optionsEN": [
      "A. Discard the entire batch immediately when a schema failure occurs to ensure strict transactional atomic persistence across all 50 records.",
      "B. Expand the model's context window limit so the full 50-record payload can be retried continuously without truncation.",
      "C. Set additionalProperties to false on the root array definition so invalid records are auto-purged by the JSON parser.",
      "D. Validate each object inside manifest_records independently, saving valid records to storage while routing only malformed records to an isolated correction or fallback queue."
    ],
    "options": [
      "A. Loại bỏ toàn bộ lô dữ liệu ngay khi xảy ra lỗi schema để đảm bảo tính nguyên tố (transactional atomic) trên cả 50 bản ghi.",
      "B. Mở rộng giới hạn context window của mô hình để payload toàn bộ 50 bản ghi có thể được retry liên tục mà không bị cắt ngắn.",
      "C. Thiết lập additionalProperties thành false trên định nghĩa mảng gốc để các bản ghi không hợp lệ tự động bị bộ phân tích JSON loại bỏ.",
      "D. Xác thực độc lập từng đối tượng bên trong manifest_records, lưu các bản ghi hợp lệ vào cơ sở dữ liệu và chỉ chuyển các bản ghi lỗi vào hàng đợi xử lý/retry riêng biệt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Atomically discarding the entire batch wastes computational resources and drops 49 valid records due to a single isolated error.",
      "Option B is incorrect: Expanding context length does not solve the root cause of re-processing 49 already valid records during retry loops.",
      "Option C is incorrect: additionalProperties: false applies to object properties, not array item validation, and will not sanitize invalid property types like weight_kg.",
      "Option D is correct: Correctly isolates item-level validation failures so valid records are safely persisted and retry overhead is restricted strictly to the malformed records."
    ],
    "rationale": "In batch extraction tasks, validating output objects individually prevents a single malformed record from invalidating the entire batch payload. Isolating invalid records allows valid data to be persisted immediately while restricting retry overhead exclusively to the failed items.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n- Option A không phù hợp vì việc hủy bỏ toàn bộ 49 bản ghi hợp lệ chỉ vì 1 bản ghi lỗi gây lãng phí tài nguyên tính toán và làm giảm hiệu suất đường ống xử lý dữ liệu.\n- Option B không phù hợp vì mở rộng context window chỉ giải quyết triệu chứng hết token chứ không khắc phục nguyên nhân gốc rễ là retry thừa 49 bản ghi đã đúng.\n- Option C không phù hợp vì additionalProperties: false là thuộc tính kiểm tra các field thừa trong object, không áp dụng cho việc loại bỏ phần tử lỗi kiểu dữ liệu trong mảng.\n- Option D là đáp án đúng vì phân tách validation theo từng bản ghi độc lập giúp bảo vệ dữ liệu hợp lệ đã được trích xuất thành công, đồng thời tối ưu hóa chi phí retry bằng cách chỉ gửi lại các bản ghi không đạt yêu cầu.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  }
]