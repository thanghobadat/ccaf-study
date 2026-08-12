[
  {
    "id": "d4-b10-4.7-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-007",
    "scenarioSignature": {
      "testedPrinciple": "domain validation feedback retry",
      "failureMode": "schema valid payload violating domain range rules",
      "rootCause": "structural validation passing while domain safety rules fail",
      "requiredFix": "feed rejected payload and domain error message back to model for correction"
    },
    "questionEN": "A healthcare integration service uses Gemini Flash to extract prescription details from clinical intake notes into a JSON object conforming to PrescriptionOrder (medication_name, dosage_mg, daily_frequency). Pydantic structural validation passes because dosage_mg is a valid integer. However, MedicationSafetyValidator rejects the object because dosage_mg: 5000 exceeds the maximum safe limit of 1000 mg for the requested drug. What is the recommended retry architecture to handle this domain validation failure?",
    "question": "[d4-b10-4.7-007] Một dịch vụ tích hợp y tế sử dụng Gemini Flash để trích xuất chi tiết đơn thuốc từ ghi chú lâm sàng thành một đối tượng JSON tuân theo PrescriptionOrder (medication_name, dosage_mg, daily_frequency). Kiểm tra cấu trúc Pydantic vượt qua vì dosage_mg là một số nguyên hợp lệ. Tuy nhiên, MedicationSafetyValidator từ chối đối tượng vì dosage_mg: 5000 vượt quá giới hạn an toàn tối đa 1000 mg của thuốc được yêu cầu. Kiến trúc thử lại (retry) được khuyến nghị để xử lý lỗi xác thực miền (domain validation) này là gì?",
    "optionsEN": [
      "A. Update the Pydantic schema to change dosage_mg to a string type so that numeric range checks are bypassed during execution.",
      "B. Terminate the process immediately and drop the intake payload, treating domain validation failures as unrecoverable API connection errors.",
      "C. Capture the domain validator failure, append the rejected JSON payload and error message to the context, and re-prompt the model for a corrected object.",
      "D. Bypass MedicationSafetyValidator when structural JSON parsing succeeds and persist dosage_mg directly into the database."
    ],
    "options": [
      "A. Cập nhật schema Pydantic để đổi dosage_mg sang kiểu chuỗi (string) nhằm bỏ qua các kiểm tra khoảng giá trị số trong quá trình thực thi.",
      "B. Chấm dứt quy trình ngay lập tức và hủy payload đầu vào, coi lỗi xác thực miền là lỗi kết nối API không thể phục hồi.",
      "C. Bắt lỗi từ dịch vụ xác thực miền, đính kèm payload JSON bị từ chối cùng thông báo lỗi vào ngữ cảnh, và yêu cầu mô hình tạo lại đối tượng đã sửa.",
      "D. Bỏ qua MedicationSafetyValidator khi phân tích cú pháp JSON cấu trúc thành công và lưu trực tiếp dosage_mg vào cơ sở dữ liệu."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Changing the field type to string bypasses numeric schema validation without addressing the underlying unsafe dosage value extracted by the model.",
      "Option B is incorrect: Treating domain validation rejections as unrecoverable connection failures causes valid user requests to drop unnecessarily instead of recovering via prompt retries.",
      "Option C is correct: Capturing domain validation failures and presenting the rejected JSON alongside the specific safety violation error provides the model with necessary feedback to return a safe dosage within bounds.",
      "Option D is incorrect: Bypassing domain safety checks allows potentially dangerous medication dosages to persist directly into downstream medical database systems."
    ],
    "rationale": "Domain validation failures occur when structured JSON passes syntax/type checks but violates business domain rules. The correct retry pattern captures the domain error (e.g. dosage limit exceeded) and feeds both the invalid payload and the domain error message back to the model for correction.",
    "explanation": "Khi JSON vượt qua kiểm tra cấu trúc (Pydantic schema) nhưng vi phạm quy tắc nghiệp vụ/miền (như liều lượng thuốc vượt mức an toàn), hệ thống cần thực hiện retry có ngữ cảnh. Đáp án C đúng vì nó bắt lấy lỗi xác thực miền, cung cấp JSON bị lỗi cùng thông báo lỗi cụ thể back lại cho mô hình để nó sửa giá trị. Đáp án A sai vì thay đổi kiểu dữ liệu chỉ lách qua kiểm tra schema chứ không sửa được lỗi giá trị nguy hiểm. Đáp án B sai vì lỗi miền có thể khắc phục được qua retry, không phải lỗi mạng không thể phục hồi. Đáp án D sai vì bỏ qua validator sẽ ghi nhận dữ liệu liều lượng thuốc nguy hiểm vào cơ sở dữ liệu.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  },
  {
    "id": "d4-b10-4.7-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.7 validation-retry / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b10-4.7-008",
    "scenarioSignature": {
      "testedPrinciple": "cardinality validation feedback retry",
      "failureMode": "array payload underflowing requested item count",
      "rootCause": "model stopping generation before meeting required schema array length",
      "requiredFix": "retry with rejected payload and explicit array length error message"
    },
    "questionEN": "An e-commerce personalization microservice (RecommendEngine) requests Gemini Flash to extract exactly 5 tailored product items into a JSON response schema containing the items array. The JSON structure parses successfully, but a post-parsing validation check fails with CardinalityError: expected 5 items, found 2. How should the system handle this constraint failure to fulfill the recommendation contract?",
    "question": "[d4-b10-4.7-008] Một microservice cá nhân hóa thương mại điện tử (RecommendEngine) yêu cầu Gemini Flash trích xuất chính xác 5 sản phẩm đề xuất vào một JSON schema chứa mảng items. Cấu trúc JSON phân tích cú pháp thành công, nhưng kiểm tra xác thực sau phân tích cú pháp thất bại với CardinalityError: expected 5 items, found 2. Hệ thống nên xử lý vi phạm ràng buộc này như thế nào để đáp ứng hợp đồng đề xuất?",
    "optionsEN": [
      "A. Accept the 2 generated items and pad the remaining 3 array slots with empty strings to force cardinality compliance.",
      "B. Disable cardinality validation in RecommendEngine and rely on the client frontend interface to render dynamic array lengths.",
      "C. Resend the original prompt to the model without including the rejected 2-item output or the cardinality error detail.",
      "D. Re-prompt the model by attaching the truncated 2-item JSON output alongside the explicit cardinality error message requesting all 5 items."
    ],
    "options": [
      "A. Chấp nhận 2 mục đã tạo và chèn các chuỗi rỗng vào 3 vị trí còn lại trong mảng để ép buộc tuân thủ số lượng.",
      "B. Vô hiệu hóa kiểm tra số lượng trong RecommendEngine và dựa vào giao diện frontend của khách hàng để hiển thị độ dài mảng linh hoạt.",
      "C. Gửi lại prompt ban đầu cho mô hình mà không đính kèm kết quả 2 mục bị từ chối hoặc chi tiết lỗi số lượng.",
      "D. Yêu cầu mô hình tạo lại bằng cách đính kèm kết quả JSON 2 mục bị thiếu cùng thông báo lỗi số lượng rõ ràng để yêu cầu đủ 5 mục."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Padding arrays with empty strings introduces corrupted data into recommendation features and violates item object schemas.",
      "Option B is incorrect: Disabling cardinality validation shifts backend structural enforcement responsibilities onto downstream frontend clients.",
      "Option C is incorrect: Retrying without providing the rejected response and validation error context risks repeating the exact same under-generation failure.",
      "Option D is correct: Supplying the partial output and explicit cardinality feedback ('expected 5 items, found 2') gives the model precise context to generate the complete set of requested items."
    ],
    "rationale": "When a model output satisfies syntax rules but fails array length/cardinality requirements, the retry loop must feed the undersized output and the specific cardinality constraint violation back into the prompt so the model can complete the array.",
    "explanation": "Khi mô hình tạo JSON đúng cú pháp nhưng thiếu số lượng phần tử theo yêu cầu (cardinality failure), quy trình thử lại cần phản hồi chính xác lỗi này. Đáp án D đúng vì việc gửi lại JSON 2 phần tử bị thiếu kèm thông báo lỗi cụ thể (yêu cầu 5 mục nhưng chỉ có 2) giúp mô hình nhận biết thiếu sót và hoàn thành đủ 5 mục. Đáp án A sai vì chèn chuỗi rỗng làm bẩn dữ liệu hệ thống. Đáp án B sai vì đẩy trách nhiệm xử lý dữ liệu thiếu sang frontend. Đáp án C sai vì gửi lại prompt cũ mà không có feedback sẽ khiến mô hình lặp lại lỗi cũ.",
    "sources": [
      {
        "label": "Lesson 4.7: Validation & Retry",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-7-validation-retry"
      }
    ]
  }
]