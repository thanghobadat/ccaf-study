[
  {
    "id": "d4-b10-4.7-005",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-05",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-005",
    "scenarioSignature": {
      "testedPrinciple": "bounded retry loop with failure escalation context",
      "failureMode": "repeated schema validation failure across multiple retries",
      "rootCause": "unbounded retry loop without structural termination or error payload propagation",
      "requiredFix": "halt retry attempts after maximum count and escalate with cumulative error context"
    },
    "questionEN": "A financial data extraction system uses Pydantic to validate extracted JSON payloads containing tax_identification_number and gross_taxable_amount from vendor invoices. When extracted payloads fail regex validation on tax_identification_number, the system sends the rejected JSON and Pydantic error details back to the LLM for correction. In production, 3% of invoices fail validation on two consecutive correction attempts, causing workers to timeout after reaching the global HTTP timeout. What is the correct architectural pattern to handle these persistent validation failures?",
    "question": "[d4-b10-4.7-005] Một hệ thống trích xuất dữ liệu tài chính sử dụng Pydantic để kiểm tra tính hợp lệ (validate) của JSON payload chứa các trường tax_identification_number và gross_taxable_amount từ hóa đơn nhà cung cấp. Khi payload không vượt qua được regex validation ở trường tax_identification_number, hệ thống sẽ gửi JSON bị từ chối cùng chi tiết lỗi Pydantic quay lại LLM để sửa. Trong môi trường production, 3% hóa đơn tiếp tục thất bại sau 2 lần thử sửa liên tiếp, khiến công việc xử lý bị quá giờ (timeout) do chạm ngưỡng HTTP timeout toàn cục. Mô hình kiến trúc nào là chính xác để xử lý các thất bại validation dai dẳng này?",
    "optionsEN": [
      "A. Enforce a maximum limit of 2 retry attempts; upon the second failure, abort retries and publish the record to a dead-letter queue alongside the cumulative attempt log and Pydantic validation errors.",
      "B. Clear the prompt history after the second failed attempt and issue a fresh extraction prompt without error feedback to bypass invalid context contamination.",
      "C. Catch the Pydantic ValidationError on the second attempt and replace invalid tax_identification_number values with null so the record can be written to the database.",
      "D. Dynamically relax the Pydantic regex pattern on the third attempt to allow non-standard string formats and prevent pipeline blocking."
    ],
    "options": [
      "A. Giới hạn tối đa 2 lần thử lại (retry); khi thất bại ở lần thứ hai, dừng retry và đẩy bản ghi vào dead-letter queue cùng với log quá trình thử và thông báo lỗi Pydantic.",
      "B. Xóa lịch sử prompt sau lần thử thất bại thứ hai và gửi prompt trích xuất mới không kèm phản hồi lỗi để tránh làm ô nhiễm ngữ cảnh.",
      "C. Bắt ngoại lệ Pydantic ValidationError ở lần thử thứ hai và thay thế giá trị tax_identification_number không hợp lệ bằng null để bản ghi có thể ghi vào cơ sở dữ liệu.",
      "D. Nới lỏng động mẫu Pydantic regex ở lần thử thứ ba để chấp nhận các định dạng chuỗi không chuẩn và tránh làm nghẽn pipeline."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because capping retries (e.g., at 2 attempts) prevents resource starvation and infinite loops. Passing the full error context and attempt logs to a dead-letter queue preserves diagnostic visibility for debugging non-conforming inputs.",
      "Option B is incorrect because clearing error feedback removes critical diagnostic signals that tell the model what failed, leading to repeated extraction mistakes without convergence.",
      "Option C is incorrect because silently inserting null into a mandatory database field causes downstream data corruption and bypasses business logic constraints.",
      "Option D is incorrect because weakening schema validation rules dynamically accepts malformed data into production databases, undermining system reliability."
    ],
    "rationale": "Bounding correction attempts to 2-3 iterations and escalating unresolved failures to a fallback pipeline with complete diagnostic error traces prevents unbounded execution while maintaining system auditability.",
    "explanation": "A là đáp án đúng vì việc giới hạn số lần retry (2 lần) ngăn chặn vòng lặp vô tận và lãng phí tài nguyên. Đẩy dữ liệu thất bại kèm toàn bộ vết lỗi Pydantic vào dead-letter queue giúp đội ngũ vận hành có đầy đủ thông tin để kiểm tra và xử lý các trường hợp ngoại lệ.\nB sai vì việc xóa lịch sử và thông báo lỗi sẽ làm mất ngữ cảnh sửa lỗi, khiến mô hình lặp lại chính lỗi trích xuất ban đầu.\nC sai vì việc tự động ghi đè null vào trường bắt buộc sẽ làm sai lệch dữ liệu tài chính trong cơ sở dữ liệu downstream.\nD sai vì hạ thấp tiêu chuẩn validation để cho qua dữ liệu hỏng sẽ làm hỏng tính toàn vẹn của hệ thống dữ liệu.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  },
  {
    "id": "d4-b10-4.7-006",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-06",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-006",
    "scenarioSignature": {
      "testedPrinciple": "schema nullability for unmentioned context fields",
      "failureMode": "runaway retry loop costs from extracting non-existent document properties",
      "rootCause": "mandatory schema constraint on data physically absent from source text",
      "requiredFix": "configure schema fields as nullable to permit valid null extraction without retrying"
    },
    "questionEN": "An automated customs document processing pipeline ShipTrace Core extracts export_license_id and hs_code into a strict JSON schema where all fields are required non-nullable strings. When processing legacy bills of lading that do not issue an export_license_id, Pydantic raises a validation error for the missing field. The system automatically retries by feeding the validation error back to the LLM, causing an infinite retry loop that spent $12,000 in redundant API tokens over one weekend. Which design change prevents this runaway retry cost?",
    "question": "[d4-b10-4.7-006] Pipeline xử lý chứng từ hải quan tự động ShipTrace Core trích xuất export_license_id và hs_code vào một JSON schema nghiêm ngặt trong đó mọi trường đều bắt buộc là chuỗi không được phép null. Khi xử lý các vận đơn (bill of lading) cũ không cấp export_license_id, Pydantic báo lỗi validation vì thiếu trường bắt buộc. Hệ thống tự động thử lại bằng cách gửi thông báo lỗi validation ngược về LLM, dẫn đến vòng lặp retry vô tận tiêu tốn $12,000 token API trong một dịp cuối tuần. Thay đổi thiết kế nào ngăn chặn chi phí retry bùng nổ này?",
    "optionsEN": [
      "A. Increase the LLM temperature parameter to 0.9 during retry requests so the model infers a plausible export_license_id from other manifest fields.",
      "B. Define export_license_id as Optional[str] = None in the Pydantic schema and prompt the model to explicitly output null when the license is absent from the source document.",
      "C. Increase the retry limit from 3 to 10 attempts while appending strict system warnings emphasizing that missing export_license_id fields are unacceptable.",
      "D. Catch the missing field validation error in the retry handler and copy the export_license_id value from the preceding processed document."
    ],
    "options": [
      "A. Tăng tham số temperature của LLM lên 0.9 trong các yêu cầu retry để mô hình suy luận một export_license_id hợp lý từ các trường khác của bản kê khai.",
      "B. Khai báo export_license_id thành Optional[str] = None trong Pydantic schema và hướng dẫn mô hình xuất ra null một cách rõ ràng khi không có số giấy phép trong tài liệu nguồn.",
      "C. Tăng giới hạn retry từ 3 lên 10 lần thử đồng thời bổ sung các cảnh báo hệ thống nghiêm ngặt nhấn mạnh rằng việc thiếu trường export_license_id là không thể chấp nhận.",
      "D. Bắt lỗi validation thiếu trường trong trình xử lý retry và sao chép giá trị export_license_id từ chứng từ vừa được xử lý trước đó."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because raising temperature causes hallucinated license IDs, corrupting database records with fabricated compliance numbers.",
      "Option B is correct because changing non-existent fields to nullable (Optional[str] = None) allows the model to validly represent absent data, passing validation on the first attempt without triggering retries.",
      "Option C is incorrect because increasing retry limits for data that does not exist in the source document escalates token spend without ever succeeding.",
      "Option D is incorrect because copying data from unrelated prior documents introduces cross-tenant data leakage and compliance violations."
    ],
    "rationale": "Permitting nullable values in schemas for optional source attributes allows the model to cleanly report absent information without triggering costly, doomed-to-fail retry loops.",
    "explanation": "A sai vì tăng temperature khiến mô hình bị ảo giác và tự tạo ra mã giấy phép giả, làm sai lệch dữ liệu hải quan.\nB là đáp án đúng vì việc cho phép trường dữ liệu mang giá trị null (Optional[str] = None) khi tài liệu nguồn không chứa thông tin sẽ giúp payload đạt validation ngay lần đầu tiên, loại bỏ hoàn toàn các vòng lặp retry lãng phí.\nC sai vì tăng số lần retry đối với thông tin không tồn tại chỉ làm tăng chi phí API mà không bao giờ thành công.\nD sai vì sao chép dữ liệu từ chứng từ khác gây ra lỗi rò rỉ dữ liệu giữa các lô hàng và vi phạm quy định tuân thủ.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  }
]