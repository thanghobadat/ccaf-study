[
  {
    "id": "d4-b09-B-013",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-013",
    "questionEN": "An e-commerce catalog pipeline uses Claude 3.5 Sonnet to extract product metadata into JSON. Products can either have applicable search tags (e.g., [\"wireless\", \"noise - canceling\"]) or be in a category where tagging is not applicable (e.g., raw hardware items). When processing a product without applicable tags, the catalog service needs to differentiate between 'tagging not applicable for this item' versus 'tagging applicable but zero tags assigned'. Which JSON schema definition correctly enforces null for non-applicable items while allowing an empty or populated array when tagging is applicable?",
    "question": "[d4-b09-B-013] Một đường ống danh mục thương mại điện tử sử dụng Claude 3.5 Sonnet để trích xuất siêu dữ liệu sản phẩm thành JSON. Sản phẩm có thể có các thẻ tìm kiếm phù hợp (ví dụ: [\"wireless\", \"noise - canceling\"]) hoặc thuộc danh mục không áp dụng gắn thẻ (ví dụ: linh kiện phần cứng thô). Khi xử lý sản phẩm không áp dụng gắn thẻ, dịch vụ danh mục cần phân biệt giữa 'gắn thẻ không áp dụng cho mặt hàng này' với 'gắn thẻ có áp dụng nhưng chưa gán thẻ nào'. Định nghĩa JSON schema nào phản ánh chính xác null cho mặt hàng không áp dụng trong khi vẫn cho phép mảng rỗng hoặc có dữ liệu khi việc gắn thẻ có áp dụng?",
    "optionsEN": [
      "A. Define \"tags\": {\"type\": [\"array\", \"null\"], \"items\": {\"type\": \"string\"}} and include \"tags\" in the required array.",
      "B. Define \"tags\": {\"type\": \"array\", \"items\": {\"type\": [\"string\", \"null\"]}} and include \"tags\" in the required array.",
      "C. Define \"tags\": {\"type\": \"array\", \"items\": {\"type\": \"string\"}} and omit \"tags\" from the required array.",
      "D. Define \"tags\": {\"type\": \"array\", \"items\": {\"type\": \"string\"}, \"default\": []} and retain \"tags\" in the required array."
    ],
    "options": [
      "A. Định nghĩa \"tags\": {\"type\": [\"array\", \"null\"], \"items\": {\"type\": \"string\"}} và đưa \"tags\" vào mảng required.",
      "B. Định nghĩa \"tags\": {\"type\": \"array\", \"items\": {\"type\": [\"string\", \"null\"]}} và đưa \"tags\" vào mảng required.",
      "C. Định nghĩa \"tags\": {\"type\": \"array\", \"items\": {\"type\": \"string\"}} và loại bỏ \"tags\" khỏi mảng required.",
      "D. Định nghĩa \"tags\": {\"type\": \"array\", \"items\": {\"type\": \"string\"}, \"default \": []} và giữ nguyên trong mảng required."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because specifying \"type\": [\"array\", \"null\"] allows the root tags key to accept explicit null when tagging does not apply to the item type, while permitting string arrays (including empty []) when tagging applies. Listing tags in required mandates an explicit null signal.",
      "Option B is incorrect because placing null in the items type array permits individual null elements within an array (e.g., [\"wireless\", null]) but forces the tags property itself to always be an array, making tags: null impossible.",
      "Option C is incorrect because omitting tags from required makes the key optional, causing unpredictable field omission by the model, while strictly prohibiting tags: null during validation since the root type remains array.",
      "Option D is incorrect because providing default: [] forces unassigned tagging to collapse into an empty array [], destroying the semantic distinction between 'not applicable' and 'assigned zero tags'."
    ],
    "rationale": "To distinguish between a non-applicable field and an empty selection for an array-typed field, JSON Schema must declare the field itself as nullable via \"type\": [\"array\", \"null\"] and require it in the required list. This forces the LLM to output null when tagging is not applicable and an array (which may be empty []) when tagging applies.",
    "explanation": "Để phân biệt giữa một trường không áp dụng và một lựa chọn rỗng cho một trường dạng mảng, JSON Schema phải khai báo chính thuộc tính đó là nullable thông qua \"type\": [\"array\", \"null\"] và bắt buộc nó trong mảng required.\\n- Đáp án A đúng vì cho phép thuộc tính tags nhận giá trị null trực tiếp khi sản phẩm không thể gắn thẻ, đồng thời vẫn chấp nhận mảng chuỗi (kể cả mảng rỗng []) khi sản phẩm có áp dụng gắn thẻ.\\n- Đáp án B sai vì đưa null vào danh mục kiểu dữ liệu của items chỉ cho phép các phần tử bên trong mảng nhận giá trị null, trong khi bản thân trường tags vẫn bị bắt buộc là một mảng.\\n- Đáp án C sai vì loại bỏ tags khỏi required khiến trường này có thể bị mô hình bỏ qua tùy ý, nhưng nếu mô hình trả về null thì validator vẫn báo lỗi vì kiểu của trường chỉ khai báo là array.\\n- Đáp án D sai vì đặt default: [] làm cho trường mặc định là mảng rỗng [], xóa bỏ sự phân biệt giữa 'không áp dụng gắn thẻ' và 'áp dụng nhưng chưa chọn thẻ nào'.",
    "scenarioSignature": {
      "testedPrinciple": "array field nullability versus empty array representation",
      "failureMode": "downstream service misinterpreting missing classification as active empty filter",
      "rootCause": "schema defining tag list without explicit null option for non-applicable items",
      "requiredFix": "define tag field as nullable array to distinguish non-applicable state from empty selection"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  },
  {
    "id": "d4-b09-B-014",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.6 nullable-fields / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-B-014",
    "questionEN": "A retail checkout engine uses Claude 3.5 Sonnet to parse customer receipts into structured JSON. The schema defines discount_amount as \"type\": [\"number\", \"null\"] and includes it in required. During evaluation, when receipts contain no promotional code, the model occasionally hallucinates 0.0 or fabricates arbitrary numeric values instead of emitting null. The lead engineer updates the schema property to include \"description\": \"The monetary discount applied.When no discount applies to this transaction, output null.\" How does adding this explicit field description impact model output accuracy and behavior?",
    "question": "[d4-b09-B-014] Một động cơ thanh toán bán lẻ sử dụng Claude 3.5 Sonnet để phân tích hóa đơn của khách hàng thành JSON có cấu trúc. Schema định nghĩa discount_amount là \"type\": [\"number\", \"null\"] và đưa vào mảng required. Trong quá trình đánh giá, khi hóa đơn không có mã khuyến mãi, mô hình thỉnh thoảng tự tạo 0.0 hoặc bịa ra giá trị số tùy ý thay vì xuất null. Kỹ sư trưởng cập nhật thuộc tính schema để thêm \"description\": \"Số tiền giảm giá được áp dụng.Khi không có giảm giá nào áp dụng cho giao dịch này, xuất null.\" Việc thêm mô tả trường rõ ràng này ảnh hưởng như thế nào đến độ chính xác và hành vi đầu ra của mô hình?",
    "optionsEN": [
      "A. It has no effect because LLMs ignore JSON schema description properties, reading only type and enum keys during structured JSON generation.",
      "B. It significantly improves accuracy by providing explicit in-context semantics for when the null token should be generated instead of numeric fallbacks like 0.0.",
      "C. It causes JSON validation failures because JSON Schema specification forbids text descriptions on nullable numeric types.",
      "D. It forces the API to automatically substitute null in place of 0.0 at the JSON parser layer without changing model generation behavior."
    ],
    "options": [
      "A. Nó không có tác động nào vì các LLM bỏ qua thuộc tính description trong JSON schema, chỉ đọc các khóa type và enum trong quá trình sinh JSON.",
      "B. Nó cải thiện đáng kể độ chính xác bằng cách cung cấp ngữ nghĩa chi tiết trong bối cảnh về thời điểm cần tạo token null thay vì các giá trị số dự phòng như 0.0.",
      "C. Nó gây ra lỗi xác thực JSON schema vì chuẩn JSON Schema cấm thuộc tính mô tả văn bản trên các kiểu số có thể null.",
      "D. Nó ép buộc API tự động thay thế null vào vị trí của 0.0 tại tầng bộ phân tích JSON mà không làm thay đổi hành vi sinh của mô hình."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because LLMs actively parse the description metadata within JSON schemas to guide generation context and clarify ambiguity.",
      "Option B is correct because providing an explicit description specifying when to output null directly guides the model's semantic reasoning, preventing fallback hallucinations such as 0.0 or fabricated numbers.",
      "Option C is incorrect because JSON Schema standard fully supports description properties across all field types, including nullable primitives.",
      "Option D is incorrect because schema descriptions influence the model's token output generation during inference, rather than acting as a post-generation parser substitution filter."
    ],
    "rationale": "JSON Schema description annotations are actively leveraged by LLMs during constrained decoding and prompt construction. Documenting the specific business logic for when a nullable field should evaluate to null (versus 0.0 or default numbers) resolves ambiguity and eliminates fallback hallucination errors.",
    "explanation": "Thuộc tính description trong JSON Schema được LLM đọc và sử dụng làm chỉ dẫn ngữ nghĩa trực tiếp trong quá trình sinh token.\\n- Đáp án A sai vì mô hình ngôn ngữ lớn đọc toàn bộ siêu dữ liệu của schema, bao gồm cả description, để hiểu bối cảnh của từng trường.\\n- Đáp án B đúng vì việc cung cấp chỉ dẫn rõ ràng về điều kiện kích hoạt giá trị null giúp mô hình loại bỏ sự mơ hồ, từ đó không tự động điền các giá trị mặc định như 0.0 hay số ngẫu nhiên.\\n- Đáp án C sai vì chuẩn JSON Schema hoàn toàn cho phép thuộc tính description ở bất kỳ kiểu dữ liệu nào.\\n- Đáp án D sai vì mô tả thuộc tính tác động vào quá trình suy luận và sinh dữ liệu của mô hình chứ không phải bộ lọc thay thế ở tầng parser sau khi sinh.",
    "scenarioSignature": {
      "testedPrinciple": "schema description guidelines for model nullable output disambiguation",
      "failureMode": "model outputting zero or empty string instead of null when contextual criteria are missing",
      "rootCause": "schema field definition lacking clear condition criteria in description property",
      "requiredFix": "annotate description property with explicit triggers for outputting null versus active value"
    },
    "sources": [
      {
        "label": "Lesson 4.6: Nullable Fields",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-6-nullable-fields"
      }
    ]
  }
]