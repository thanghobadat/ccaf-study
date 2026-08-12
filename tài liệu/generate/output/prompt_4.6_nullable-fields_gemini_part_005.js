[
  {
    "id": "d4-b09-new-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-009",
    "questionEN": "An automated tax parsing service processes IRS Form 1040 documents into JSON output via Claude 3.5 Sonnet tool calling. For single filers, the spouse_ssn field is absent in the source document. The JSON schema currently sets \"spouse_ssn\": {\"type\": \"string\"} inside required: [\"taxpayer_ssn\", \"spouse_ssn\"]. As a result, when single filers submit forms, Claude hallucinates a valid-looking 9-digit Social Security Number for spouse_ssn to satisfy schema validation, causing IRS e-file rejection rates to spike by 14%. How should the schema be updated to eliminate fake SSN generation?",
    "question": "[d4-b09-new-009] Một dịch vụ xử lý thuế tự động chuyển đổi các tài liệu IRS Form 1040 thành đầu ra JSON thông qua tool calling của Claude 3.5 Sonnet. Đối với người nộp thuế độc thân, trường spouse_ssn không tồn tại trong tài liệu gốc. JSON schema hiện tại cấu hình \"spouse_ssn\": {\"type\": \"string\"} bên trong required: [\"taxpayer_ssn\", \"spouse_ssn\"]. Kết quả là khi người độc thân nộp biểu mẫu, Claude tự bịa ra một số An sinh Xã hội 9 chữ số có vẻ hợp lệ cho spouse_ssn để đáp ứng kiểm tra schema, khiến tỷ lệ từ chối e-file của IRS tăng 14%. Schema cần được cập nhật như thế nào để loại bỏ việc tạo SSN giả?",
    "optionsEN": [
      "A. Include \"spouse_ssn\" in the required array and define its schema type as {\"type\": [\"string\", \"null\"]} so the model explicitly returns null for single filers.",
      "B. Remove \"spouse_ssn\" from the required array while keeping its type as {\"type\": \"string\"} so the model omits the key entirely when processing single filers.",
      "C. Add \"default\": \"000-00-0000\" to the \"spouse_ssn\" property schema so the model replaces missing values with a standardized placeholder string.",
      "D. Set \"additionalProperties\": true on the root object schema so the model can insert an auxiliary field like \"is_single\": true instead of spouse_ssn."
    ],
    "options": [
      "A. Đưa \"spouse_ssn\" vào mảng required và định nghĩa kiểu schema của nó là {\"type\": [\"string\", \"null\"]} để mô hình trả về null một cách rõ ràng cho người độc thân.",
      "B. Loại bỏ \"spouse_ssn\" khỏi mảng required trong khi vẫn giữ kiểu của nó là {\"type\": \"string\"} để mô hình bỏ qua khóa này hoàn toàn khi xử lý người độc thân.",
      "C. Thêm \"default \": \"000-00-0000\" vào schema thuộc tính \"spouse_ssn\" để mô hình thay thế các giá trị thiếu bằng một chuỗi giữ chỗ chuẩn hóa.",
      "D. Thiết lập \"additionalProperties\": true trên root object schema để mô hình có thể chèn một trường phụ như \"is_single\": true thay vì spouse_ssn."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Requiring \"spouse_ssn\" while defining its type as [\"string\", \"null\"] forces Claude to emit {\"spouse_ssn\": null} when the information is absent in the source document, preventing hallucinated SSNs and satisfying schema validation.",
      "Option B is incorrect: Removing \"spouse_ssn\" from the required array allows the model to omit the key, but missing keys lead to unpredictable model behavior and make it impossible for downstream IRS submission code to distinguish between an OCR extraction failure and a single filer.",
      "Option C is incorrect: Claude does not reliably enforce default schema properties during tool output generation, and placing a hardcoded fake SSN placeholder like \"000-00-0000\" still fails IRS e-file syntax validation.",
      "Option D is incorrect: Enabling additionalProperties allows arbitrary unmapped JSON fields but leaves the required non-nullable constraint on spouse_ssn unaddressed, failing to prevent fake SSN generation."
    ],
    "rationale": "When an optional contextual field is mandatory in the schema's required list but marked purely as a string, Claude is forced to generate a string value, leading to hallucination. Retaining the field in required while expanding its JSON schema type to [\"string\", \"null\"] provides an explicit structural path for the model to signal non-applicability via explicit null without resorting to fabricated numbers.",
    "explanation": "Đáp án đúng là A:\\nKhi một trường không áp dụng cho ngữ cảnh (như spouse_ssn cho người nộp thuế độc thân) được đánh dấu là bắt buộc (required) nhưng chỉ chấp nhận kiểu chuỗi (string), Claude bị ép phải tạo ra một giá trị chuỗi để vượt qua ràng buộc schema, dẫn đến việc ảo giác ra số SSN giả. Việc giữ trường trong mảng required và mở rộng kiểu dữ liệu thành [\"string\", \"null\"] cho phép mô hình xuất ra {\"spouse_ssn\": null} một cách tường minh.\\n\\nPhân tích các phương án còn lại:\\n- B sai: Loại bỏ khỏi required khiến mô hình bỏ qua thuộc tính, dẫn đến định dạng JSON không đồng nhất và hệ thống phía sau không thể phân biệt giữa lỗi trích xuất OCR và việc không có người phối ngẫu.\\n- C sai: Giá trị default không được Claude thực thi nhất quán trong tool calling, và việc chèn chuỗi giữ chỗ giả vẫn sẽ bị cơ quan thuế từ chối do vi phạm định dạng SSN.\\n- D sai: Cho phép additionalProperties chỉ cho phép chèn các trường không khai báo, không giải quyết được ràng buộc kiểu không-null của spouse_ssn.",
    "scenarioSignature": {
      "testedPrinciple": "explicit nullability for missing required context",
      "failureMode": "model hallucinates fabricated numeric identifier",
      "rootCause": "non-nullable schema type specified for missing input field in required list",
      "requiredFix": "include property in required array and specify union string null type"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-new-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-new-010",
    "questionEN": "A global logistics dispatch platform uses Claude 3.5 Sonnet to convert unstructured bill-of-lading documents into JSON structured output for automated routing. For domestic shipments within the United States, no customs broker is assigned, so customs_broker_id is non-existent in the input text. Because the schema defines \"customs_broker_id\": {\"type\": \"string\"} inside required: [\"shipment_id\", \"customs_broker_id\"], Claude generates plausible 8-character random broker alphanumeric codes. This causes domestic shipments to trigger false international customs clearance holds, resulting in a 22% delay metric. Which schema modification resolves this issue?",
    "question": "[d4-b09-new-010] Một nền tảng điều phối lô hàng toàn cầu sử dụng Claude 3.5 Sonnet để chuyển đổi các tài liệu vận đơn không cấu trúc thành đầu ra JSON có cấu trúc nhằm tự động hóa định tuyến. Đối với các lô hàng nội địa, không có môi giới hải quan nào được chỉ định, do đó customs_broker_id không tồn tại trong văn bản đầu vào. Vì schema định nghĩa \"customs_broker_id\": {\"type\": \"string\"} bên trong required: [\"shipment_id\", \"customs_broker_id\"], Claude tự tạo ra các mã đại lý hải quan ngẫu nhiên 8 ký tự trông có vẻ hợp lệ. Điều này khiến các lô hàng nội địa bị giữ lại kiểm tra hải quan quốc tế một cách nhầm lẫn, dẫn đến chỉ số trễ tăng 22%. Sửa đổi schema nào sẽ giải quyết vấn đề này?",
    "optionsEN": [
      "A. Set \"default \": null in the schema for \"customs_broker_id\" while keeping its type strictly set to {\"type\": \"string\"} without altering the required list.",
      "B. Keep \"customs_broker_id\" in the required list and change its schema type definition to {\"type\": [\"string\", \"null\"]} to force explicit null generation.",
      "C. Remove \"customs_broker_id\" from the required array so the model omits the property from the JSON payload when processing domestic shipments.",
      "D. Add an enum constraint listing valid broker codes [\"CRK-01\", \"CRK-02\"] without modifying the required array or adding a null type."
    ],
    "options": [
      "A. Đặt \"default \": null trong schema cho \"customs_broker_id\" trong khi vẫn giữ kiểu của nó là {\"type\": \"string\"} mà không thay đổi danh sách required.",
      "B. Giữ \"customs_broker_id\" trong danh sách required và thay đổi định nghĩa kiểu schema của nó thành {\"type\": [\"string\", \"null\"]} để ép buộc tạo null tường minh.",
      "C. Xóa \"customs_broker_id\" khỏi mảng required để mô hình bỏ qua thuộc tính khỏi JSON payload khi xử lý các lô hàng nội địa.",
      "D. Thêm ràng buộc enum liệt kê các mã môi giới hợp lệ [\"CRK-01\", \"CRK-02\"] mà không sửa đổi mảng required hoặc thêm kiểu null."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Specifying default: null while leaving type: \"string\" creates an invalid JSON Schema type definition mismatch and does not allow null values, causing schema validation errors or continued string generation.",
      "Option B is correct: Retaining \"customs_broker_id\" in required while expanding its type to [\"string\", \"null\"] explicitly instructs Claude to output null when a domestic bill of lading lacks customs broker info, stopping code fabrication and avoiding customs holds.",
      "Option C is incorrect: Removing the field from required allows Claude to omit the key entirely, leading to non-deterministic JSON payloads where downstream services cannot distinguish missing OCR data from domestic status.",
      "Option D is incorrect: Restricting values to an enum of valid broker codes without allowing null forces Claude to arbitrarily select one of the valid codes from the enum for domestic shipments, worsening routing errors."
    ],
    "rationale": "Forcing a field to be required while restricting its JSON Schema type strictly to string causes Claude to generate dummy string values (such as random broker codes) when processing documents where that field is not applicable. Maintaining the field as required and setting its type to [\"string\", \"null\"] allows the model to reliably return null, cleanly signalling non-applicability to routing services.",
    "explanation": "Đáp án đúng là B:\\nKhi một trường bắt buộc trong schema chỉ cho phép kiểu string nhưng tài liệu đầu vào là vận đơn nội địa không có thông tin môi giới hải quan, mô hình bị ép phải tự bịa ra một mã định danh ngẫu nhiên. Việc giữ customs_broker_id trong mảng required và đổi kiểu dữ liệu thành [\"string\", \"null\"] sẽ tạo điều kiện cho mô hình xuất ra giá trị null một cách chính xác và nhất quán.\\n\\nPhân tích các phương án còn lại:\\n- A sai: Khai báo default: null trong khi kiểu dữ liệu vẫn chỉ là string gây mâu thuẫn trong JSON schema và không hợp lệ.\\n- C sai: Việc chỉ loại bỏ khỏi mảng required dẫn đến phản hồi JSON không đồng nhất, hệ thống tiếp nhận không thể biết là chưa trích xuất được hay lô hàng là nội địa.\\n- D sai: Thêm danh sách enum các mã hợp lệ mà không cho phép null càng khiến mô hình chọn ngẫu nhiên một mã trong danh sách, gây ra lỗi định tuyến nghiêm trọng hơn.",
    "scenarioSignature": {
      "testedPrinciple": "explicit nullability for non-applicable logistics attributes",
      "failureMode": "model hallucinates random alphanumeric code",
      "rootCause": "non-nullable type specified for non-applicable contextual field in required list",
      "requiredFix": "keep property in required list and specify union string null type"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]