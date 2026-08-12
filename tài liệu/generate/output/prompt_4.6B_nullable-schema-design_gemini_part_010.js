[
  {
    "id": "d4-b09-B-019",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-019",
    "questionEN": "In an enterprise CRM ticket auditing workflow, the LLM processes user support logs into structured JSON adhering to a schema where resolution_summary has \"type\": [\"string\", \"null\"]. When an agent leaves the resolution text empty (\"\"), Claude emits \"resolution_summary\": null. The schema validator accepts null, but downstream business logic treats null as \"unprocessed audit pending\" and \"\" as \"processed with no text\", leading to infinite re-queuing of blank tickets. What is the root cause and proper solution?",
    "question": "[d4-b09-B-019] Trong quy trình kiểm toán phiếu hỗ trợ khách hàng của doanh nghiệp, LLM xử lý nhật ký hỗ trợ thành JSON có cấu trúc tuân theo schema trong đó resolution_summary có \"type\": [\"string\", \"null\"]. Khi nhân viên để trống văn bản giải quyết (\"\"), Claude xuất ra \"resolution_summary\": null. Trình xác thực schema chấp nhận null, nhưng logic nghiệp vụ hạ nguồn lại coi null là \"đang chờ xử lý kiểm toán\" và \"\" là \"đã xử lý nhưng không có văn bản\", dẫn đến việc các phiếu trống bị đưa vào hàng đợi lại vô hạn. Nguyên nhân gốc rễ và giải pháp phù hợp là gì?",
    "optionsEN": [
      "A. The JSON schema validator failed because \"type\": [\"string\", \"null\"] rejects empty strings; change the field definition to \"type\": \"string\" without nullability to force the model to output \"\".",
      "B. Claude hallucinates null due to a syntax bug in JSON schema parsing; replace \"type\": [\"string\", \"null\"] with \"anyOf\": [{\"type\": \"string\"}] to eliminate the null emission.",
      "C. The schema validates null successfully because null is a permitted type, but null (\"not provided\") and \"\" (\"provided as empty\") are semantically distinct; add a clear field description instructing Claude when to return \"\" versus null.",
      "D. Downstream business logic requires additionalProperties: false at the root level so that empty string fields automatically default to \"NONE\" instead of null."
    ],
    "options": [
      "A. Trình xác thực JSON schema bị lỗi vì \"type\": [\"string\", \"null\"] từ chối chuỗi rỗng; thay đổi định nghĩa trường thành \"type\": \"string\" không cho phép null để bắt buộc mô hình xuất ra \"\".",
      "B. Claude ảo tưởng ra null do lỗi cú pháp trong việc phân tích JSON schema; thay thế \"type\": [\"string\", \"null\"] bằng \"anyOf\": [{\"type\": \"string\"}] để loại bỏ việc xuất ra null.",
      "C. Schema xác thực null thành công vì null là kiểu hợp lệ được phép, nhưng null (\"không cung cấp\") và \"\" (\"cung cấp nhưng để rỗng\") có ý nghĩa ngữ nghĩa khác nhau; thêm description rõ ràng cho trường để hướng dẫn Claude khi nào nên trả về \"\" so với null.",
      "D. Logic nghiệp vụ hạ nguồn yêu cầu additionalProperties: false ở cấp gốc để các trường chuỗi rỗng tự động chuyển mặc định thành \"NONE\" thay vì null."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: \"type\": [\"string\", \"null\"] permits both strings (including \"\") and null, so schema validation did not fail; removing null would break valid cases where resolution data is truly missing.",
      "Option B is incorrect: \"type\": [\"string\", \"null\"] is standard valid JSON Schema syntax and not a syntax bug; using anyOf without null would fail on missing data.",
      "Option C is correct: null and \"\" carry different semantic meanings in business logic; since the schema accepts null, schema validation passes, but Claude requires explicit field description guidance to distinguish between an absent summary (null) and an intentionally blank summary (\"\").",
      "Option D is incorrect: additionalProperties: false restricts undeclared properties in the JSON object and has no effect on transforming null values to string defaults."
    ],
    "rationale": "Option C correctly identifies that null and empty string \"\" are semantically distinct in business systems. Because \"type\": [\"string\", \"null\"] allows null, the schema validator does not catch the semantic substitution. Adding a precise description in the schema clarifies to the model when a field is missing/untracked (null) versus explicitly present but empty (\"\").",
    "explanation": "Lựa chọn C là đáp án đúng.\\n- A sai vì schema validator không hề thất bại; \"type\": [\"string\", \"null\"] cho phép cả chuỗi rỗng và null. Loại bỏ null sẽ làm hỏng các trường hợp thực sự thiếu dữ liệu.\\n- B sai vì \"type\": [\"string\", \"null\"] là cú pháp tiêu chuẩn hoàn toàn hợp lệ của JSON Schema, không phải lỗi parser.\\n- C đúng vì null (không có dữ liệu) và \"\" (có dữ liệu nhưng để rỗng) mang ý nghĩa ngữ nghĩa khác nhau trong hệ thống hạ nguồn. Vì schema chấp nhận null nên bước validate vẫn vượt qua, nhưng mô hình cần được hướng dẫn bằng trường description rõ ràng để phân biệt khi nào trả về null và khi nào trả về chuỗi rỗng \"\".\\n- D sai vì additionalProperties: false chỉ ngăn chặn các thuộc tính chưa được khai báo chứ không tự động gán giá trị mặc định cho trường null.",
    "scenarioSignature": {
      "testedPrinciple": "null vs empty string semantic distinction in schema vs business logic",
      "failureMode": "schema validation succeeds but downstream business logic misinterprets empty input as missing data",
      "rootCause": "model emits null for empty string input because schema allows null without explicit instructions on empty strings",
      "requiredFix": "add clear schema description and system instructions defining null as missing data and empty string as blank entry"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-020",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-020",
    "scenarioSignature": {
      "testedPrinciple": "multi-type union schema validity versus ambiguity in LLM structured output",
      "failureMode": "model emits inconsistent primitive types for the same field across extractions",
      "rootCause": "defining a broad 3-type union without restrictive formatting rules introduces prompt ambiguity for numeric vs string representations",
      "requiredFix": "restrict union types to required domain semantics or split into distinct typed fields with clear schema instructions"
    },
    "questionEN": "In a Smart Grid telemetry extraction pipeline, an engineer configures the JSON Schema field meter_reading as \"type\": [\"number\", \"string\", \"null\"] to handle numeric values, text error codes (e.g., \"ERR_LOW_VOLTAGE\"), and offline states (null). During execution, Claude inconsistently emits numeric measurements as either numbers (240.5) or numeric strings (\"240.5\"), causing downstream type errors in mathematical aggregations. Which statement accurately evaluates this 3-type union pattern?",
    "question": "[d4-b09-B-020] Trong đường ống trích xuất dữ liệu đo xa của Lưới điện thông minh, một kỹ sư cấu hình trường JSON Schema meter_reading là \"type\": [\"number\", \"string\", \"null\"] để xử lý các giá trị số, mã lỗi dạng văn bản (ví dụ: \"ERR_LOW_VOLTAGE\"), và trạng thái ngoại tuyến (null). Trong quá trình thực thi, Claude xuất các số đo không đồng nhất dưới dạng số (240.5) hoặc chuỗi số (\"240.5\"), gây ra lỗi kiểu dữ liệu ở hệ thống hạ nguồn khi tổng hợp toán học. Phát biểu nào đánh giá chính xác mô hình union 3 kiểu này?",
    "optionsEN": [
      "A. The schema is invalid draft JSON Schema standard because primitive union arrays are strictly capped at two types ([\"type1\", \"type2\"]), causing API runtime rejection.",
      "B. The schema is valid, but Claude automatically converts numeric strings to numbers internally, so downstream aggregation errors are caused by database driver serialization bugs rather than schema design.",
      "C. The schema causes prompt syntax errors because combining number and string in an inline array disables JSON schema validation, forcing the model into unformatted markdown output mode.",
      "D. The 3-type union is syntactically valid JSON Schema, but semantically ambiguous for LLMs; without explicit field descriptions separating raw numbers from text codes, Claude randomly chooses between string and number representations for numeric data."
    ],
    "options": [
      "A. Schema này không hợp lệ theo chuẩn JSON Schema vì mảng union kiểu cơ bản bị giới hạn nghiêm ngặt tối đa 2 kiểu ([\"type1\", \"type2\"]), dẫn đến việc API từ chối lúc runtime.",
      "B. Schema hợp lệ, nhưng Claude tự động chuyển đổi chuỗi số thành số ở bên trong, do đó lỗi tổng hợp hạ nguồn là do bug tuần tự hóa của trình điều khiển cơ sở dữ liệu chứ không phải do thiết kế schema.",
      "C. Schema gây ra lỗi cú pháp prompt vì việc kết hợp number và string trong mảng nội dòng sẽ vô hiệu hóa việc xác thực JSON schema, buộc mô hình chuyển sang chế độ đầu ra markdown không định dạng.",
      "D. Union 3 kiểu là hợp lệ về mặt cú pháp JSON Schema, nhưng mơ hồ về mặt ngữ nghĩa đối với LLM; nếu không có mô tả trường rõ ràng phân biệt số thuần túy với mã văn bản, Claude sẽ chọn ngẫu nhiên giữa biểu diễn chuỗi và số cho dữ liệu số."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: JSON Schema specs allow primitive type arrays with any number of valid type strings (e.g. [\"number\", \"string\", \"null\"] is syntactically valid).",
      "Option B is incorrect: Claude outputs JSON tokens verbatim as structured; it does not perform automatic internal type conversions or alter downstream DB drivers.",
      "Option C is incorrect: Multi-type union arrays do not cause syntax errors or crash JSON schema validation mode.",
      "Option D is correct: While syntactically legal in JSON Schema, a 3-type union without clear rules creates semantic ambiguity for LLMs, leading to unpredictable type selection for numbers unless constrained by detailed descriptions or schema narrowing."
    ],
    "rationale": "Option D correctly identifies that while \"type\": [\"number\", \"string\", \"null\"] is syntactically valid in JSON Schema, broad union types create semantic ambiguity for LLMs. When numeric data can satisfy both number and string, model output becomes non-deterministic without explicit schema description guidelines or structural separation into dedicated fields.",
    "explanation": "Lựa chọn D là đáp án đúng.\n- A sai vì chuẩn JSON Schema hoàn toàn cho phép mảng union có nhiều hơn 2 kiểu dữ liệu nguyên thủy.\n- B sai vì Claude không tự động ép kiểu dữ liệu bên trong; mô hình trả về đúng kiểu dữ liệu JSON token như nó đã trích xuất.\n- C sai vì hợp nhất number và string không gây lỗi cú pháp prompt hay vô hiệu hóa chế độ xác thực JSON Schema.\n- D đúng vì cú pháp union 3 kiểu [\"number\", \"string\", \"null\"] tuy hợp lệ về mặt JSON Schema nhưng lại tạo ra sự mơ hồ ngữ nghĩa đối với mô hình ngôn ngữ lớn. Khi một con số có thể khớp với cả kiểu number lẫn kiểu string, Claude sẽ chọn ngẫu nhiên kiểu dữ liệu trừ khi có câu mô tả description rõ ràng quy định khi nào dùng số và khi nào dùng chuỗi văn bản.",
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]