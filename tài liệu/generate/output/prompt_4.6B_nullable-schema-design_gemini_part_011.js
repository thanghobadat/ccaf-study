[
  {
    "id": "d4-b09-B-021",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-21",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-021",
    "questionEN": "An enterprise SOC incident management pipeline uses Claude's tool_use feature with record_security_alert to structure incoming threat reports into a database schema. For misconfiguration alerts where no CVE identifier exists, the downstream database requires an explicit JSON {\"cve_id\": null} key rather than an omitted property. How should the developer configure the tool definition and API call to guarantee Claude returns null for cve_id?",
    "question": "[d4-b09-B-021] Một đường ống quản lý sự cố SOC doanh nghiệp sử dụng tính năng tool_use của Claude với công cụ record_security_alert để cấu trúc hóa các báo cáo mối đe dọa vào lược đồ cơ sở dữ liệu. Đối với các cảnh báo lỗi cấu hình không có mã định danh CVE, cơ sở dữ liệu phía hạ nguồn yêu cầu khóa JSON rõ ràng {\"cve_id\": null} thay vì bỏ qua thuộc tính này. Lập trình viên nên cấu hình định nghĩa công cụ và lời gọi API như thế nào để đảm bảo Claude luôn trả về null cho cve_id?",
    "optionsEN": [
      "A. Define cve_id with \"type\": [\"string\", \"null\"], list \"cve_id\" in the tool schema's required array, and set tool_choice: {\"type\": \"tool\", \"name\": \"record_security_alert\"}.",
      "B. Omit \"cve_id\" from the required array and set tool_choice: {\"type\": \"auto\"}, allowing the model to choose whether to include the property based on prompt context.",
      "C. Set cve_id with \"type\": \"string\" and specify in the system prompt that missing CVEs should default to the string \"NONE\".",
      "D. Set cve_id with \"type\": \"string\" and set additionalProperties: true on the tool schema so the model can dynamically emit null values without schema validation errors."
    ],
    "options": [
      "A. Định nghĩa cve_id với \"type\": [\"string\", \"null\"], đưa \"cve_id\" vào mảng required của lược đồ công cụ, và đặt tool_choice: {\"type\": \"tool\", \"name\": \"record_security_alert\"}.",
      "B. Bỏ \"cve_id\" ra khỏi mảng required và đặt tool_choice: {\"type\": \"auto\"}, cho phép mô hình tự chọn có bao gồm thuộc tính hay không dựa vào ngữ cảnh prompt.",
      "C. Thiết lập cve_id với \"type\": \"string\" và chỉ định trong system prompt rằng các CVE bị thiếu nên mặc định thành chuỗi \"NONE\".",
      "D. Thiết lập cve_id với \"type\": \"string\" và đặt additionalProperties: true trên lược đồ công cụ để mô hình có thể tự động phát ra giá trị null mà không bị lỗi xác thực lược đồ."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Combining explicit tool enforcement via tool_choice, nullable type declaration [\"string\", \"null\"], and mandatory inclusion in the required array forces Claude to execute the tool and supply explicit null when cve_id is non-existent.",
      "Option B is incorrect: Omitting cve_id from the required array allows Claude to leave the field completely absent from the JSON object {}, failing the downstream database requirement for explicit null.",
      "Option C is incorrect: Setting type to string forces string values like \"NONE\", which breaks downstream database queries expecting a true JSON null primitive.",
      "Option D is incorrect: Setting type to string without including null in the type array causes a JSON Schema validation failure if Claude attempts to pass null, and additionalProperties does not alter type constraints."
    ],
    "rationale": "To guarantee an explicit JSON null output during tool use, the field must be both marked as nullable (\"type\": [\"string\", \"null\"]) and placed in the schema's required array. Combining this with explicit tool_choice forces the model to call the specified tool and supply null for missing contextual data rather than omitting the field or raising a schema error.",
    "explanation": "Trong Claude tool_use, để đảm bảo mô hình luôn xuất ra thuộc tính JSON với giá trị null rõ ràng (ví dụ: {\"cve_id\": null}) thay vì bỏ qua trường (object rỗng {}) hoặc tạo chuỗi giả:\\n- Đưa thuộc tính vào mảng required để bắt buộc mô hình phải xuất ra khóa này.\\n- Định nghĩa kiểu dữ liệu là \"type\": [\"string\", \"null\"] để cho phép nhận giá trị null hợp lệ.\\n- Sử dụng tool_choice: {\"type\": \"tool\", \"name\": \"record_security_alert\"} để bắt buộc Claude phải gọi đúng công cụ này.\\n\\nPhân tích các phương án còn lại:\\n- Phương án B: Nếu bỏ cve_id khỏi required, Claude sẽ bỏ qua trường này khi không có CVE, trả về đối tượng không có khóa cve_id, vi phạm yêu cầu của cơ sở dữ liệu.\\n- Phương án C: Chuỗi \"NONE\" không tương đương với giá trị null trong JSON và sẽ làm sai lệch dữ liệu hạ nguồn.\\n- Phương án D: Khai báo \"type\": \"string\" nhưng truyền null sẽ gây lỗi validation lược đồ; additionalProperties không giải quyết được xung đột kiểu này.",
    "scenarioSignature": {
      "testedPrinciple": "forced tool use with mandatory nullable schema properties guarantees explicit null output",
      "failureMode": "omitted fields or hallucinated default strings when contextual values are missing in tool invocations",
      "rootCause": "tool schema properties omitted from required array allow model to skip outputting missing fields entirely",
      "requiredFix": "include nullable fields in required array and set explicit tool choice mode"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]