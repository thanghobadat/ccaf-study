[
  {
    "id": "d4-b09-new-017",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-017",
    "questionEN": "An automated payroll processing system uses Claude 3.5 Sonnet to parse unstructured employee timesheets into structured JSON for payroll compliance checks. The JSON Schema includes overtime_hours, defined as a required number type. For exempt employees or timesheets with no overtime record, the model outputs \"overtime_hours\": 0 instead of distinguishing between 0 hours worked and non-applicability. Downstream audit logs misinterpret these entries, skewing exempt employee reporting metrics. How should the JSON Schema be updated to resolve this ambiguity?",
    "question": "[d4-b09-new-017] Một hệ thống xử lý bảng lương tự động sử dụng Claude 3.5 Sonnet để phân tích bảng chấm công không cấu trúc thành JSON nhằm kiểm tra tuân thủ. JSON Schema bao gồm trường overtime_hours, được định nghĩa dưới dạng kiểu number bắt buộc. Đối với nhân viên miễn trừ tăng ca hoặc bảng chấm công không đề cập tăng ca, mô hình xuất ra \"overtime_hours\": 0 thay vì phân biệt giữa 0 giờ làm việc và tính không áp dụng. Nhật ký kiểm toán hạ nguồn hiểu sai các mục này, làm lệch báo cáo nhân viên miễn trừ. Cần cập nhật JSON Schema như thế nào để giải quyết sự mơ hồ này?",
    "optionsEN": [
      "A. Make overtime_hours explicitly nullable using {\"type\": [\"number\", \"null\"]} while keeping it in the required array, forcing the model to output null for non-applicable cases and 0 only when zero overtime hours were explicitly logged.",
      "B. Remove overtime_hours from the required array so the model omits the key when no overtime is mentioned, relying on downstream JSON parsers to substitute default values.",
      "C. Add a system prompt instruction directing the model to set overtime_hours to -1 whenever overtime is not applicable for the employee.",
      "D. Set additionalProperties: true in the root JSON Schema to allow the model to dynamically inject an is_overtime_eligible boolean tag next to overtime_hours."
    ],
    "options": [
      "A. Cấu hình overtime_hours thành kiểu nullable dạng {\"type\": [\"number\", \"null\"]} và giữ nó trong mảng required, buộc mô hình xuất null cho trường hợp không áp dụng và chỉ xuất 0 khi 0 giờ tăng ca được ghi nhận rõ ràng.",
      "B. Loại bỏ overtime_hours khỏi mảng required để mô hình bỏ qua khóa này khi không có tăng ca, dựa vào trình phân tích JSON hạ nguồn để tự điền giá trị mặc định.",
      "C. Thêm hướng dẫn vào system prompt yêu cầu mô hình gán overtime_hours thành -1 bất kỳ khi nào tăng ca không áp dụng cho nhân viên.",
      "D. Đặt additionalProperties: true trong root JSON Schema để mô hình tự động chèn thêm thẻ boolean is_overtime_eligible bên cạnh overtime_hours."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because configuring overtime_hours with type [\"number\", \"null\"] and enforcing it in required forces the model to emit null for exempt/non-applicable timesheets, accurately distinguishing them from explicit 0-hour entries.",
      "Option B is incorrect because omitting overtime_hours from required leads to unpredictable key omission, leaving downstream systems unable to differentiate between unparsed missing data and non-applicability.",
      "Option C is incorrect because using magic numeric sentinels like -1 violates JSON Schema typing semantics and causes validation failures against number type constraints.",
      "Option D is incorrect because additionalProperties: true permits arbitrary extra fields without enforcing structured nullability for the overtime_hours field itself."
    ],
    "rationale": "Making a numeric field nullable while maintaining its presence in the required array forces the LLM to output null when data is not applicable, avoiding semantic ambiguity with explicit zero values.",
    "explanation": "Phân tích chi tiết từng lựa chọn trong ngữ cảnh xử lý bảng lương:\\n- Lựa chọn A đúng vì việc định nghĩa kiểu [\"number\", \"null\"] và giữ trường trong mảng required buộc mô hình xuất ra null đối với trường hợp không áp dụng (nhân viên miễn trừ), phân biệt rõ ràng với giá trị 0 khi ghi nhận thực tế 0 giờ tăng ca.\\n- Lựa chọn B sai vì việc xóa khỏi required khiến khóa bị thiếu ngẫu nhiên, hệ thống hạ nguồn không thể biết là dữ liệu bị sót hay không áp dụng.\\n- Lựa chọn C sai vì sử dụng cờ số đặc biệt như -1 vi phạm ngữ nghĩa dữ liệu và gây lỗi nếu schema có ràng buộc minimum: 0.\\n- Lựa chọn D sai vì additionalProperties: true cho phép chèn các trường không mong muốn chứ không giải quyết được kiểu dữ liệu của overtime_hours.",
    "scenarioSignature": {
      "testedPrinciple": "explicit nullability vs numeric zero distinction",
      "failureMode": "semantic confusion between zero value and field non-applicability",
      "rootCause": "numeric schema type forcing model to output zero when data is inapplicable",
      "requiredFix": "define field as nullable type and keep it in required array"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-018",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-018",
    "questionEN": "A CRM data ingestion pipeline uses Claude 3.5 Sonnet to extract customer profile details from support tickets into JSON. The schema defines primary_email and secondary_email as required string fields. When processing tickets for contacts who only supply one email address, the model duplicates the primary_email value into secondary_email to satisfy schema constraints. This triggers duplicate automated email campaigns in downstream marketing systems. Which schema modification prevents this field duplication?",
    "question": "[d4-b09-new-018] Một pipeline nạp dữ liệu CRM sử dụng Claude 3.5 Sonnet để trích xuất chi tiết hồ sơ khách hàng từ phiếu hỗ trợ thành JSON. Schema định nghĩa primary_email và secondary_email là các trường string bắt buộc. Khi xử lý các phiếu cho khách hàng chỉ cung cấp một địa chỉ email, mô hình nhân bản giá trị primary_email vào secondary_email để thỏa mãn ràng buộc schema. Điều này kích hoạt các chiến dịch email tự động trùng lặp trong hệ thống tiếp thị hạ nguồn. Thay đổi schema nào sẽ ngăn chặn sự trùng lặp dữ liệu này?",
    "optionsEN": [
      "A. Change secondary_email to an optional string field by removing it from the required array, allowing the model to omit the property entirely when only one email is present.",
      "B. Define secondary_email as nullable using {\"type\": [\"string\", \"null\"]} while retaining it in required, prompting the model to explicitly output null when no secondary address exists.",
      "C. Add a JSON Schema pattern regex constraint to secondary_email that rejects values matching the string currently extracted for primary_email.",
      "D. Configure default: \"\" for secondary_email in the schema so that the model populates an empty string instead of duplicating the primary email address."
    ],
    "options": [
      "A. Thay đổi secondary_email thành trường chuỗi tùy chọn bằng cách xóa nó khỏi mảng required, cho phép mô hình bỏ qua hoàn toàn thuộc tính này khi chỉ có một email.",
      "B. Định nghĩa secondary_email thành kiểu nullable bằng {\"type\": [\"string\", \"null\"]} trong khi vẫn giữ nó trong required, yêu cầu mô hình xuất ra null một cách rõ ràng khi không có địa chỉ thứ hai.",
      "C. Thêm biểu thức chính quy (regex pattern) vào secondary_email trong JSON Schema để từ chối các giá trị trùng khớp với chuỗi được trích xuất cho primary_email.",
      "D. Cấu hình default: \"\" cho secondary_email trong schema để mô hình điền chuỗi rỗng thay vì nhân bản địa chỉ email chính."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because removing secondary_email from required leads to unpredictable key omission, making schema validation inconsistent across different contact records.",
      "Option B is correct because defining secondary_email with type [\"string\", \"null\"] and keeping it in required forces the model to emit null when only one email exists, preventing data duplication.",
      "Option C is incorrect because JSON Schema regex patterns validate format statically and cannot cross-reference or dynamically compare against another JSON field's generated value.",
      "Option D is incorrect because schema default annotations are not enforced by LLM generation engines, and empty strings still create ambiguous email records in downstream CRM systems."
    ],
    "rationale": "Making secondary_email explicitly nullable while maintaining it in required provides a valid null output path, preventing the model from hallucinating duplicate primary email values to satisfy non-null constraints.",
    "explanation": "Phân tích chi tiết từng lựa chọn trong ngữ cảnh trích xuất dữ liệu CRM:\\n- Lựa chọn A sai vì việc xóa khỏi required khiến thuộc tính có thể bị bỏ qua bất định, làm cho hạ nguồn khó xử lý cấu trúc JSON không nhất quán.\\n- Lựa chọn B đúng vì cấu hình kiểu [\"string\", \"null\"] kết hợp giữ trường trong required buộc mô hình phải xuất ra giá trị null khi không có email thứ hai, thay vì tự ý sao chép primary_email để thỏa mãn ràng buộc không được null.\\n- Lựa chọn C sai vì quy tắc regex của JSON Schema chỉ kiểm tra định dạng tĩnh và không thể tham chiếu chéo động tới giá trị của một trường JSON khác (primary_email).\\n- Lựa chọn D sai vì thuộc tính default trong schema không được các mô hình ngôn ngữ tuân thủ tin cậy trong quá trình sinh dữ liệu và chuỗi rỗng vẫn tạo ra dữ liệu mơ hồ cho CRM.",
    "scenarioSignature": {
      "testedPrinciple": "field duplication prevention via schema nullability",
      "failureMode": "model copying primary field value into required secondary field",
      "rootCause": "non-nullable required string constraint forcing model to hallucinate duplicated value when data is absent",
      "requiredFix": "define secondary field as nullable type while retaining it in required array"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]