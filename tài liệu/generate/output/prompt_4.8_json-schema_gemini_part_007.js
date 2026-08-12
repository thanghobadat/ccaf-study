[
  {
    "id": "d4-b11-4.8-013",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-013",
    "scenarioSignature": {
      "testedPrinciple": "array cardinality schema specification for optional evidence collections",
      "failureMode": "schema validation failure when no supporting evidence exists",
      "rootCause": "over-constrained minimum item count rejecting valid empty list outputs",
      "requiredFix": "allow zero minimum array items and clarify empty list output behavior in property description"
    },
    "questionEN": "A medical document extraction service uses Claude structured output (tool_use) to extract clinical evidence into a citations array. When a document contains no supporting evidence for a claim, the system expects citations to be an empty array []. However, the current JSON schema enforces \"minItems\": 1 on \"citations\", causing API validation failures (ValidationError: [] is too short) whenever no evidence is present. How should the engineering team update the JSON Schema to handle cases with zero evidence without causing validation errors?",
    "question": "[d4-b11-4.8-013] Một dịch vụ trích xuất tài liệu y khoa sử dụng đầu ra định dạng cấu trúc của Claude (tool_use) để trích xuất bằng chứng lâm sàng vào mảng citations. Khi một tài liệu không chứa bằng chứng hỗ trợ cho tuyên bố, hệ thống kỳ vọng citations là một mảng rỗng []. Tuy nhiên, JSON schema hiện tại áp đặt \"minItems\": 1 trên \"citations\", gây ra lỗi xác thực API (ValidationError: [] is too short) bất cứ khi nào không có bằng chứng. Đội ngũ kỹ thuật nên cập nhật JSON Schema như thế nào để xử lý các trường hợp không có bằng chứng mà không gây ra lỗi xác thực?",
    "optionsEN": [
      "A. Remove minItems: 1 (or set minItems: 0) from the citations array schema, and update the property description to state that an empty array [] must be returned when no evidence is found.",
      "B. Maintain minItems: 1 and add nullable: true to the citations schema so that the model returns null when evidence is missing.",
      "C. Retain minItems: 1 and instruct the model in the system prompt to generate a placeholder citation object with empty string values when evidence is absent.",
      "D. Change the citations field type from \"array\" to \"object\" with optional properties to bypass array length constraints."
    ],
    "options": [
      "A. Loại bỏ minItems: 1 (hoặc đặt minItems: 0) khỏi schema của mảng citations, và cập nhật description của thuộc tính để nêu rõ phải trả về mảng rỗng [] khi không tìm thấy bằng chứng.",
      "B. Giữ lại minItems: 1 và thêm nullable: true vào schema của citations để mô hình trả về null khi thiếu bằng chứng.",
      "C. Giữ nguyên minItems: 1 và hướng dẫn mô hình trong system prompt tạo một đối tượng citation giữ chỗ với các giá trị chuỗi rỗng khi vắng mặt bằng chứng.",
      "D. Thay đổi type của trường citations từ \"array\" thành \"object\" với các thuộc tính tùy chọn để bỏ qua các ràng buộc về độ dài mảng."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because omitting minItems (or setting it to 0) permits valid empty arrays [] when no evidence exists in the source text, while clear property descriptions instruct the model to populate objects when evidence is present.",
      "Option B is incorrect because adding nullable: true allows null but does not allow [] when minItems: 1 is retained; downstream parsers expecting an array type will fail or encounter type errors on null.",
      "Option C is incorrect because forcing placeholder objects with empty string values pollutes database records with dummy data and violates clean structured extraction patterns.",
      "Option D is incorrect because changing an array collection into an object fundamentally alters the JSON contract schema and complicates downstream processing of multiple citations."
    ],
    "rationale": "Removing minItems: 1 (or allowing minItems: 0) allows the JSON validator to accept valid empty arrays [] when no evidence is present in the source document. Combining this schema adjustment with explicit property description guidance ensures the model outputs empty arrays when appropriate without inventing dummy citation objects or failing schema validation.",
    "explanation": "Lựa chọn A là đáp án chính xác vì loại bỏ minItems: 1 (hoặc đặt thành 0) cho phép trình xác thực JSON chấp nhận mảng rỗng [] hợp lệ khi không có bằng chứng nào trong văn bản gốc. Kết hợp điều này với description rõ ràng giúp mô hình hiểu khi nào cần trả về [] thay vì bị ép buộc sinh ra đối tượng giả.\n\nLựa chọn B sai vì việc thêm nullable: true cho phép giá trị null nhưng không giải quyết được vấn đề mảng rỗng [] khi minItems: 1 vẫn còn hiệu lực; điều này gây ra lỗi kiểu dữ liệu ở hệ thống tiếp nhận phía sau.\n\nLựa chọn C sai vì việc sinh dữ liệu rác (placeholder object) để làm hài lòng validator sẽ làm ô nhiễm cơ sở dữ liệu và làm giảm chất lượng dữ liệu trích xuất.\n\nLựa chọn D sai vì việc chuyển đổi kiểu dữ liệu từ mảng (array) sang đối tượng (object) phá vỡ hợp đồng dữ liệu API và cấu trúc của mảng chứa nhiều trích dẫn.",
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  },
  {
    "id": "d4-b11-4.8-014",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.8 json-schema / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d4-b11-4.8-014",
    "scenarioSignature": {
      "testedPrinciple": "semantic unit disambiguation in JSON schema property descriptions",
      "failureMode": "downstream scale misinterpretation from ambiguous numeric fraction vs percentage representation",
      "rootCause": "numeric schema bounds allowing both fraction and percentage representations without explicit unit descriptions",
      "requiredFix": "specify exact scale range and concrete examples in the schema property description"
    },
    "questionEN": "A risk assessment pipeline uses Claude structured output to compute a churn_risk_score property of type: \"number\". The downstream decision engine expects a percentage value scaled from 0.0 to 100.0 (e.g., 85.5 for 85.5%). However, Claude frequently returns decimal fractions like 0.855 because the JSON schema only defined \"minimum\": 0, \"maximum\": 100 with \"description\": \"Risk score\". As a result, the decision engine evaluates 0.855 as 0.855% risk, improperly approving high-risk accounts. Which JSON Schema modification correctly resolves this scale ambiguity?",
    "question": "[d4-b11-4.8-014] Một đường ống đánh giá rủi ro sử dụng đầu ra định dạng cấu trúc của Claude để tính toán thuộc tính churn_risk_score có type: \"number\". Động cơ quyết định phía sau kỳ vọng một giá trị phần trăm được tỷ lệ từ 0.0 đến 100.0 (ví dụ: 85.5 cho 85.5%). Tuy nhiên, Claude thường xuyên trả về các phân số thập phân như 0.855 vì JSON schema chỉ định nghĩa \"minimum\": 0, \"maximum\": 100 với \"description\": \"Risk score\". Kết quả là động cơ quyết định đánh giá 0.855 thành 0.855% rủi ro, phê duyệt sai các tài khoản có rủi ro cao. Sự thay đổi JSON Schema nào giải quyết chính xác sự mơ hồ về tỷ lệ này?",
    "optionsEN": [
      "A. Change type: \"number\" to type: \"integer\" and set \"minimum\": 1, \"maximum\": 100 to force integer outputs.",
      "B. Update the property description to explicitly specify scale requirements: 'Risk score expressed as a percentage value between 0.0 and 100.0 (e.g., 85.5 for 85.5%), not a decimal fraction from 0.0 to 1.0.'",
      "C. Add \"multipleOf\": 1.0 to the property schema to restrict numeric values to whole percentage numbers.",
      "D. Replace \"minimum\": 0, \"maximum\": 100 with \"exclusiveMinimum\": 0.0, \"exclusiveMaximum\": 1.0 to normalize the value range."
    ],
    "options": [
      "A. Thay đổi type: \"number\" thành type: \"integer\" và đặt \"minimum\": 1, \"maximum\": 100 để bắt buộc đầu ra là số nguyên.",
      "B. Cập nhật description của thuộc tính để chỉ định rõ ràng yêu cầu về tỷ lệ: 'Điểm rủi ro được biểu diễn dưới dạng giá trị phần trăm từ 0.0 đến 100.0 (ví dụ: 85.5 đại diện cho 85.5%), không phải phân số thập phân từ 0.0 đến 1.0.'",
      "C. Thêm \"multipleOf\": 1.0 vào schema thuộc tính để giới hạn các giá trị số thành số phần trăm nguyên.",
      "D. Thay thế \"minimum\": 0, \"maximum\": 100 bằng \"exclusiveMinimum\": 0.0, \"exclusiveMaximum\": 1.0 để chuẩn hóa khoảng giá trị."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because changing the type to \"integer\" eliminates decimal precision (e.g., losing fractional values like 85.5%) and does not prevent the model from outputting small integers like 0 or 1.",
      "Option B is correct because numeric schema constraints (minimum: 0, maximum: 100) permit both 0.855 and 85.5. Providing explicit unit and scale instructions inside the property description gives the LLM the semantic context needed to emit numbers on the 0–100 percentage scale rather than 0–1 fractions.",
      "Option C is incorrect because \"multipleOf\": 1.0 restricts outputs to integers, destroying fractional percentage precision without clarifying scale semantics to the model.",
      "Option D is incorrect because setting limits to 0.0–1.0 forces outputs into the fraction range, which contradicts the downstream engine's requirement for a 0–100 percentage range."
    ],
    "rationale": "JSON Schema numeric bounds (minimum: 0, maximum: 100) validly accept both 0.855 (fraction) and 85.5 (percentage). Because LLMs rely on semantic context to determine output formatting, adding explicit scale instructions in the property description clarifies whether values should be formatted as fractions (0–1) or percentages (0–100).",
    "explanation": "Lựa chọn B là đáp án chính xác vì các giới hạn số của JSON Schema (minimum: 0, maximum: 100) đều chấp nhận cả 0.855 và 85.5 là hợp lệ. Do các mô hình ngôn ngữ lớn dựa vào ngữ cảnh ngữ nghĩa để xác định định dạng đầu ra, việc thêm hướng dẫn về tỷ lệ và đơn vị đo rõ ràng trong description giúp mô hình hiểu chính xác cần xuất ra giá trị phần trăm (0–100) thay vì phân số thập phân (0–1).\n\nLựa chọn A sai vì việc chuyển sang integer làm mất đi độ chính xác của số thập phân (như 85.5%) và không ngăn mô hình trả về các số nguyên nhỏ như 0 hoặc 1.\n\nLựa chọn C sai vì \"multipleOf\": 1.0 bắt buộc giá trị phải là số nguyên, làm hỏng các phần trăm có phần thập phân mà không giải quyết được gốc rễ sự mơ hồ về đơn vị.\n\nLựa chọn D sai vì việc đặt giới hạn từ 0.0 đến 1.0 ép mô hình xuất ra dạng phân số, đi ngược lại yêu cầu của hệ thống phía sau là tỷ lệ phần trăm từ 0.0 đến 100.0.",
    "sources": [
      {
        "label": "Lesson 4.8: JSON Schema",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-8-json-schema"
      }
    ]
  }
]