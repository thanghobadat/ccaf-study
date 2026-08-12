[
  {
    "id": "d4-b09-B-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-009",
    "scenarioSignature": {
      "testedPrinciple": "top-level required nullable field enforcement",
      "failureMode": "downstream schema validation cascade on missing top-level key",
      "rootCause": "model misplaces nullable field into nested sub-object instead of root level",
      "requiredFix": "define field at root level in required array as nullable with explicit description"
    },
    "questionEN": "An e-commerce order API (OrderProcessingPipeline) calls Claude 3.5 Sonnet to parse customer checkout notes into structured JSON. The JSON schema specifies a required top-level nullable field \"coupon_code\": {\"type\": [\"string\", \"null\"]} alongside an \"order\" object. For non-discount orders, Claude frequently outputs {\"order\": {\"coupon\": null}} while omitting \"coupon_code\" at the root level. This triggers an API validation cascade with HTTP 422 errors for 18% of non-discount transactions. How should the engineering team adjust the JSON schema and prompt to resolve this validation cascade?",
    "question": "[d4-b09-B-009] Một API đơn hàng thương mại điện tử (OrderProcessingPipeline) gọi Claude 3.5 Sonnet để phân tích cú pháp ghi chú thanh toán của khách hàng thành JSON có cấu trúc. JSON schema chỉ định một trường nullable cấp cao nhất bắt buộc \"coupon_code\": {\"type\": [\"string\", \"null\"]} cùng với đối tượng \"order\". Đối với các đơn hàng không có giảm giá, Claude thường xuyên xuất ra {\"order\": {\"coupon\": null}} trong khi bỏ qua \"coupon_code\" ở cấp gốc. Điều này kích hoạt một chuỗi thất bại xác thực (validation cascade) với lỗi HTTP 422 cho 18% giao dịch không có giảm giá. Đội ngũ kỹ thuật nên điều chỉnh JSON schema và prompt như thế nào để giải quyết chuỗi thất bại xác thực này?",
    "optionsEN": [
      "A. Ensure \"coupon_code\" is explicitly listed in the root schema's required array with \"type\": [\"string\", \"null\"], add a detailed field description specifying null when no coupon exists, and eliminate ambiguous nested coupon fields.",
      "B. Remove \"coupon_code\" from the root schema's required array so the JSON validator permits payloads where the top-level key is omitted entirely.",
      "C. Change \"coupon_code\" definition to \"type\": \"string\" with a default property \"default\": \"\" so missing keys fall back to empty strings.",
      "D. Wrap the schema in a oneOf construct allowing either root-level coupon_code or nested order.coupon to pass validation."
    ],
    "options": [
      "A. Đảm bảo \"coupon_code\" được liệt kê rõ ràng trong mảng required của schema gốc với \"type\": [\"string\", \"null\"], thêm mô tả trường chi tiết chỉ định giá trị null khi không có mã giảm giá và loại bỏ các trường coupon lồng nhau mơ hồ.",
      "B. Xóa \"coupon_code\" khỏi mảng required của schema gốc để trình xác thực JSON cho phép các payload bỏ qua hoàn toàn khóa cấp cao nhất.",
      "C. Thay đổi định nghĩa \"coupon_code\" thành \"type\": \"string\" với thuộc tính mặc định \"default\": \"\" để các khóa bị thiếu tự động chuyển thành chuỗi rỗng.",
      "D. Bọc schema trong cấu trúc oneOf cho phép coupon_code cấp gốc hoặc order.coupon lồng nhau vượt qua xác thực."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Listing coupon_code in the root required array with type: [\"string\", \"null\"] and an explicit description forces Claude to output \"coupon_code\": null at the root level, resolving the validation cascade in OrderProcessingPipeline.",
      "Option B is incorrect: Removing coupon_code from required allows Claude to omit the field ({}), which causes downstream microservices expecting an explicit null signal to fail or receive missing keys.",
      "Option C is incorrect: Restricting the type to non-nullable string causes model hallucinations or type errors, and schema defaults are not natively enforced by Claude.",
      "Option D is incorrect: Allowing loose nested alternatives via oneOf creates ambiguous schemas, encourages model drift, and complicates downstream payload parsing."
    ],
    "rationale": "To resolve a validation cascade caused by misplaced or missing nullable fields, the field must be explicitly listed in the root object's required array and defined with type: [\"string\", \"null\"]. Combined with a clear prompt/field description, this forces Claude to generate \"coupon_code\": null at the exact expected root path.",
    "explanation": "Trong thiết kế JSON Schema cho Claude, khi một trường có thể mang giá trị rỗng hoặc không áp dụng (như mã giảm giá cho đơn hàng không được giảm giá), giải pháp chuẩn kỹ thuật là kết hợp cả hai yếu tố: liệt kê trường đó trong mảng required của đối tượng gốc VÀ định nghĩa kiểu dữ liệu là \"type\": [\"string\", \"null\"].\n\n- Phương án A đúng vì việc đưa coupon_code vào mảng required cấp gốc ngăn Claude bỏ qua khóa này hoặc lồng nó sai vị trí vào các đối tượng con. Định nghĩa type: [\"string\", \"null\"] cùng với mô tả rõ ràng ép mô hình xuất ra giá trị null tường minh khi không có mã coupon, giải quyết triệt để lỗi xác thực HTTP 422 trong OrderProcessingPipeline.\n- Phương án B sai vì xóa trường khỏi mảng required sẽ khiến Claude bỏ qua hoàn toàn khóa ({}), làm cho hệ thống xử lý phía sau không thể phân biệt giữa việc thiếu dữ liệu và không áp dụng coupon.\n- Phương án C sai vì việc bỏ null và dùng chuỗi rỗng \"\" với default không được hỗ trợ áp dụng tự động bởi Claude, đồng thời làm mất đi ý nghĩa ngữ nghĩa của null (không có coupon).\n- Phương án D sai vì việc dùng oneOf để chấp nhận cả hai cấu trúc chỉ làm tăng tính mơ hồ của schema, khiến mô hình dễ tạo ra output không đồng nhất và gây khó khăn cho việc parse dữ liệu ở phía backend.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-010",
    "scenarioSignature": {
      "testedPrinciple": "schema error feedback in prompt retry loops",
      "failureMode": "model hallucinates dummy string on generic validation retry",
      "rootCause": "vague error message fails to communicate nullable constraint to model",
      "requiredFix": "pass explicit field name and nullable type constraint in retry prompt"
    },
    "questionEN": "An invoice extraction service (InvoiceExtractionService) uses Claude 3.5 Sonnet to parse receipts into a JSON schema with a nullable field \"tax_exemption_id\": {\"type\": [\"string\", \"null\"]}. When Claude occasionally omits \"tax_exemption_id\" from the JSON payload, an automated retry handler sends back a validation error. Sending a vague retry prompt such as \"Validation failed: Missing required field tax_exemption_id\" causes a 45% retry failure rate because Claude responds by hallucinating dummy strings like \"N/A\" or \"NONE\". How should the engineering team re-architect the retry feedback prompt to ensure high validation success?",
    "question": "[d4-b09-B-010] Một dịch vụ trích xuất hóa đơn (InvoiceExtractionService) sử dụng Claude 3.5 Sonnet để phân tích biên lai thành JSON schema với trường nullable \"tax_exemption_id\": {\"type\": [\"string\", \"null\"]}. Khi Claude thỉnh thoảng bỏ qua \"tax_exemption_id\" khỏi JSON payload, một trình xử lý thử lại (retry handler) tự động sẽ gửi lại lỗi xác thực. Việc gửi một prompt thử lại mơ hồ như \"Validation failed: Missing required field tax_exemption_id\" dẫn đến tỷ lệ thử lại thất bại 45% vì Claude phản hồi bằng cách bịa ra các chuỗi giả như \"N/A\" hoặc \"NONE\". Đội ngũ kỹ thuật nên tái thiết kế prompt phản hồi thử lại như thế nào để đảm bảo tỷ lệ xác thực thành công cao?",
    "optionsEN": [
      "A. Re-send the entire JSON schema specification in the retry prompt without altering the validation error text.",
      "B. Format the retry error message to state the exact field path and precise type requirements: \"Field 'tax_exemption_id' is required and must be either a valid string or explicit null (type: ['string', 'null'])\".",
      "C. Program the retry loop to inject \"tax_exemption_id\": \"\" directly into the raw text completion prior to schema validation.",
      "D. Modify the retry prompt to instruct the model to omit any non-matching fields from the final JSON output."
    ],
    "options": [
      "A. Gửi lại toàn bộ quy cách JSON schema trong prompt thử lại mà không thay đổi văn bản lỗi xác thực.",
      "B. Định dạng thông báo lỗi thử lại để nêu rõ đường dẫn trường chính xác và yêu cầu kiểu dữ liệu cụ thể: \"Field 'tax_exemption_id' is required and must be either a valid string or explicit null (type: ['string', 'null'])\".",
      "C. Lập trình vòng lặp thử lại để chèn \"tax_exemption_id\": \"\" trực tiếp vào văn bản hoàn thành thô trước khi xác thực schema.",
      "D. Sửa đổi prompt thử lại để hướng dẫn mô hình bỏ qua bất kỳ trường nào không khớp khỏi JSON output cuối cùng."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Re-sending the full schema without specifying the nullable type constraint fails to clarify why \"N/A\" is invalid, leading to repeated retry failures.",
      "Option B is correct: Providing explicit schema feedback indicating that tax_exemption_id allows null directly addresses the root cause and prevents Claude from hallucinating dummy placeholder strings in InvoiceExtractionService.",
      "Option C is incorrect: Automatically injecting an empty string \"\" corrupts domain semantics by replacing tax-exempt status (null) with a blank tax ID string.",
      "Option D is incorrect: Instructing the model to omit fields causes downstream schema validation failures since tax_exemption_id is a required field."
    ],
    "rationale": "When schema validation fails due to a missing nullable field, the retry prompt must explicitly state both the required field name and its allowed types (type: ['string', 'null']). Vague error messages cause models to invent dummy string values like 'N/A' instead of supplying an explicit null.",
    "explanation": "Khi xảy ra lỗi xác thực JSON schema do mô hình bỏ qua một trường nullable, việc phản hồi thông báo lỗi thử lại (retry prompt) đóng vai trò quyết định để mô hình sửa lỗi chính xác.\n\n- Phương án B đúng vì thông báo lỗi thử lại nêu rõ tên trường và kiểu dữ liệu cho phép type: ['string', 'null'] sẽ hướng dẫn Claude hiểu rằng trường này bắt buộc phải xuất hiện nhưng có thể mang giá trị null trực tiếp. Điều này loại bỏ hoàn toàn việc mô hình tự bịa ra các giá trị chuỗi giả như \"N/A\" hoặc \"NONE\" trong InvoiceExtractionService.\n- Phương án A sai vì việc gửi lại toàn bộ schema mà không giải thích rõ ràng lỗi vi phạm loại dữ liệu sẽ không giúp mô hình nhận ra lý do tại sao các chuỗi giả lại không hợp lệ.\n- Phương án C sai vì tự động chèn chuỗi rỗng \"\" sẽ làm sai lệch bản chất dữ liệu (miễn thuế mang giá trị null khác với có mã số thuế nhưng là chuỗi rỗng).\n- Phương án D sai vì hướng dẫn mô hình bỏ qua trường sẽ làm vi phạm hợp đồng schema bắt buộc, khiến các dịch vụ xử lý phía sau thất bại.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]