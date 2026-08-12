[
  {
    "id": "d4-b08-new-021",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-21",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-021",
    "scenarioSignature": {
      "testedPrinciple": "multi-step extraction example coverage",
      "failureMode": "skipping downstream extraction steps in multi-step task",
      "rootCause": "few-shot example demonstrates only initial extraction step",
      "requiredFix": "provide end-to-end few-shot examples demonstrating all sequential extraction steps"
    },
    "questionEN": "In the InvoiceProcessorService pipeline using gemini-2.5-flash to extract multi-step invoice data into the output schema fields extracted_line_items, tax_reconciliation, and payment_terms, production batch evaluation shows that 78% of responses populate only extracted_line_items while leaving tax_reconciliation and payment_terms as empty or null. Prompt analysis reveals that the single few-shot example illustrates line item extraction from a single-page receipt and ends immediately after extracted_line_items. What is the root cause of this step-skipping behavior and the most effective prompt engineering fix?",
    "question": "[d4-b08-new-021] trong dịch vụ InvoiceProcessorService sử dụng gemini-2.5-flash để thực hiện trích xuất dữ liệu hóa đơn đa bước vào các trường schema extracted_line_items, tax_reconciliation, và payment_terms. Trong quá trình xử lý lô sản xuất, 78% phản hồi chỉ điền dữ liệu vào extracted_line_items trong khi bỏ trống hoặc để null ở hai trường tax_reconciliation và payment_terms. Phân tích prompt cho thấy ví dụ few-shot duy nhất chỉ minh họa việc trích xuất các mục dòng từ hóa đơn đơn giản và kết thúc ngay sau extracted_line_items. Nguyên nhân gốc rễ và giải pháp kỹ thuật hiệu quả nhất cho hiện tượng bỏ qua các bước phía sau này là gì?",
    "optionsEN": [
      "A. The single few-shot example truncates after the first extraction step, causing the model to learn an incomplete task completion pattern; updating the prompt to include end-to-end examples demonstrating all sequential extraction steps (extracted_line_items, tax_reconciliation, payment_terms) fixes the behavior.",
      "B. The system prompt lacks explicit JSON Schema definitions for tax_reconciliation; adding string validation constraints to the JSON Schema will force the model to execute steps 2 and 3 sequentially.",
      "C. The gemini-2.5-flash context window is exhausting tokens during line item parsing; reducing the max output token limit will force the model to skip detailed line items and complete payment_terms.",
      "D. Multi-step extraction requires dynamic few-shot retrieval; setting up a vector database to select examples based on invoice similarity at runtime is required to extract downstream steps."
    ],
    "options": [
      "A. Ví dụ few-shot duy nhất bị ngắt đoạn sau bước trích xuất đầu tiên, làm mô hình học theo mẫu hoàn thành tác vụ không đầy đủ; cần cập nhật prompt để cung cấp các ví dụ đầu-cuối (end-to-end) minh họa đầy đủ các bước trích xuất tuần tự (extracted_line_items, tax_reconciliation, payment_terms).",
      "B. System prompt thiếu định nghĩa JSON Schema chi tiết cho tax_reconciliation; việc thêm ràng buộc kiểm tra kiểu dữ liệu chuỗi vào JSON Schema sẽ buộc mô hình thực hiện bước 2 và 3 theo thứ tự.",
      "C. Cửa sổ ngữ cảnh của gemini-2.5-flash bị kiệt sức token khi phân tích các mục dòng; việc giảm giới hạn max output token sẽ buộc mô hình bỏ qua chi tiết các mục dòng để hoàn thành payment_terms.",
      "D. Trích xuất đa bước bắt buộc phải áp dụng dynamic few-shot retrieval; việc thiết lập cơ sở dữ liệu vector để truy vấn ví dụ dựa trên độ tương đồng của hóa đơn tại thời điểm chạy là giải pháp duy nhất để trích xuất các bước phía sau."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: Few-shot examples define the behavioral sequence for the model. When an example demonstrates only the first step of a multi-step extraction task, the model learns that task completion occurs immediately after that first step, causing it to skip downstream steps (tax_reconciliation and payment_terms). Providing comprehensive end-to-end examples that clearly demonstrate all sequential extraction steps aligns the model's output pattern with the full schema requirements.",
      "Option B is incorrect: While JSON Schema enforces structural syntax, it cannot guide the reasoning process or multi-step execution flow if the model has been conditioned by an incomplete few-shot example to stop processing early.",
      "Option C is incorrect: Reducing the max output token limit would truncate the response earlier, exacerbating the omission of downstream fields rather than fixing the extraction logic.",
      "Option D is incorrect: Dynamic RAG retrieval selects relevant examples dynamically, but if the underlying examples still omit steps 2 and 3, retrieval mechanism will not solve the missing step coverage problem."
    ],
    "rationale": "In multi-step extraction tasks, few-shot examples serve as workflow demonstrations. If an example only covers the first step, the model learns to stop prematurely after that step. Providing complete end-to-end examples showing all required extraction steps ensures the model executes all steps consistently across the input document.",
    "explanation": "Trong các tác vụ trích xuất dữ liệu đa bước (multi-step extraction), ví dụ few-shot đóng vai trò là quy trình minh họa hành vi cho mô hình LLM. Nếu ví dụ trong prompt chỉ dừng lại ở bước 1 (extracted_line_items), mô hình sẽ học được mẫu hành vi rằng tác vụ đã hoàn thành và bỏ qua các bước xử lý phía sau (tax_reconciliation và payment_terms).\n\n- Lựa chọn A chính xác vì cập nhật các ví dụ few-shot hoàn chỉnh từ đầu đến cuối (end-to-end) cho thấy toàn bộ các bước trích xuất tuần tự giúp định hình đúng luồng suy luận và đầu ra cho mô hình.\n- Lựa chọn B không chính xác vì JSON Schema chỉ kiểm soát cú pháp dữ liệu đầu ra, không thể thay thế các ví dụ vài lượt minh họa luồng thực thi các bước phức tạp.\n- Lựa chọn C không chính xác vì việc giảm max_output_tokens sẽ khiến mô hình bị ngắt lời sớm hơn nữa chứ không giải quyết được việc trích xuất thiếu trường.\n- Lựa chọn D không chính xác vì dynamic few-shot retrieval chỉ giúp tìm kiếm ví dụ phù hợp ngữ cảnh chứ không sửa được lỗi thiếu bước trong bản thân các ví dụ.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-022",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-22",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-022",
    "scenarioSignature": {
      "testedPrinciple": "balanced label distribution in few-shot classification examples",
      "failureMode": "severe output label bias toward over-represented class",
      "rootCause": "all few-shot prompt examples use identical target label",
      "requiredFix": "rebalance few-shot prompt examples with equal representation of all valid target labels"
    },
    "questionEN": "In the FraudGuardWorker service using gemini-2.5-flash to classify financial transactions into the output schema field transaction_verdict (values: ACTION_REQUIRED vs ALLOW), production evaluation records a 94% false positive rate by assigning transaction_verdict = \"ACTION_REQUIRED\" to almost all transactions. Prompt audit reveals that the developer provided 8 high-complexity few-shot examples to illustrate fraud patterns, but all 8 examples have transaction_verdict set to ACTION_REQUIRED with zero examples of ALLOW. Why does this failure occur and what is the proper fix?",
    "question": "[d4-b08-new-022] trong hệ thống FraudGuardWorker sử dụng gemini-2.5-flash để phân loại giao dịch tài chính vào trường schema transaction_verdict (nhận giá trị ACTION_REQUIRED hoặc ALLOW). Kết quả đánh giá sản xuất ghi nhận tỷ lệ báo động giả (false positive rate) lên tới 94%, khi mô hình gán transaction_verdict = \"ACTION_REQUIRED\" cho hầu hết mọi giao dịch kể cả giao dịch rủi ro thấp. Kiểm tra prompt cho thấy kỹ sư đã cung cấp 8 ví dụ few-shot phức tạp để minh họa hành vi gian lận, nhưng cả 8 ví dụ này đều có kết quả transaction_verdict là ACTION_REQUIRED và không có ví dụ nào chứa nhãn ALLOW. Lý do xảy ra lỗi này và giải pháp khắc phục đúng đắn là gì?",
    "optionsEN": [
      "A. Providing 8 examples exceeds Gemini Flash's optimal context length for classification; reducing the prompt to 2 examples of ACTION_REQUIRED will eliminate the prediction bias.",
      "B. Selecting all 8 few-shot examples from the ACTION_REQUIRED class introduces severe answer label bias; rebalancing the prompt to include an equal distribution of both ACTION_REQUIRED and ALLOW examples restores classification accuracy.",
      "C. Binary classification in prompt engineering requires setting temperature = 0.0 to prevent label drift; adjusting temperature overrides the example frequency distribution.",
      "D. The model requires negative prompt instructions specifying not to output ACTION_REQUIRED; adding a system directive like 'Do not choose ACTION_REQUIRED unless certainty is 100%' resolves the bias."
    ],
    "options": [
      "A. Việc cung cấp 8 ví dụ vượt quá chiều dài ngữ cảnh tối ưu của Gemini Flash đối với tác vụ phân loại; giảm xuống còn 2 ví dụ ACTION_REQUIRED sẽ loại bỏ thiên vị dự đoán.",
      "B. Việc chọn toàn bộ 8 ví dụ few-shot từ lớp ACTION_REQUIRED đã gây ra sự thiên vị nhãn đáp án (answer label bias); việc tái cân bằng các ví dụ few-shot để bao gồm tỷ lệ đồng đều giữa cả hai nhãn ACTION_REQUIRED và ALLOW sẽ khôi phục độ chính xác phân loại.",
      "C. Phân loại nhị phân trong prompt engineering yêu cầu đặt temperature = 0.0 để tránh lệch nhãn; việc điều chỉnh temperature sẽ đè lên phân phối tần suất ví dụ.",
      "D. Mô hình yêu cầu các chỉ dẫn phủ định chỉ định không xuất nhãn ACTION_REQUIRED; thêm quy tắc hệ thống như 'Không chọn ACTION_REQUIRED trừ khi độ tin cậy là 100%' sẽ xử lý được thiên vị."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Having 8 examples is well within Gemini Flash's context capacity. The issue is not the count of examples, but their label distribution imbalance.",
      "Option B is correct: LLMs are highly sensitive to label frequency in few-shot prompts. When all 8 examples output ACTION_REQUIRED, the model develops strong answer label bias toward that option regardless of input content. Balancing the examples evenly between ACTION_REQUIRED and ALLOW grounds the model's baseline class distribution correctly.",
      "Option C is incorrect: Lowering temperature to 0.0 makes model outputs deterministic but does not fix label prior bias induced by identical target labels in few-shot examples.",
      "Option D is incorrect: Adding negative system prompt rules creates conflicting instructions and threshold distortion rather than fixing the underlying label distribution bias in the prompt examples."
    ],
    "rationale": "LLMs exhibit strong label bias when few-shot examples disproportionately represent one output class. Providing 8 examples of only one target class anchors the model to over-predict that label. Rebalancing the few-shot set to cover all valid output labels equally eliminates this bias.",
    "explanation": "Mô hình ngôn ngữ lớn (LLM) rất nhạy cảm với tần suất xuất hiện của các nhãn đầu ra trong các ví dụ few-shot (gọi là hiện tượng Answer Label Bias / Majority Label Bias). Khi tất cả 8 ví dụ few-shot đều có nhãn đầu ra là ACTION_REQUIRED, mô hình bị định kiến và tăng xác suất dự đoán nhãn này cho hầu như mọi đầu vào tiếp theo, dẫn đến tỷ lệ báo động giả 94%.\n\n- Lựa chọn B chính xác vì giải quyết đúng nguyên nhân bằng cách tái cân bằng tập ví dụ few-shot, đảm bảo đại diện đầy đủ cho cả hai lớp nhãn ACTION_REQUIRED và ALLOW với số lượng tương đương.\n- Lựa chọn A không chính xác vì 8 ví dụ không quá dài đối với Gemini Flash, và giữ lại 2 ví dụ cùng 1 nhãn vẫn gây thiên vị nhãn.\n- Lựa chọn C không chính xác vì tham số temperature điều chỉnh độ ngẫu nhiên của mẫu phân phối chứ không làm thay đổi hay triệt tiêu được thiên vị tần suất nhãn trong few-shot.\n- Lựa chọn D không chính xác vì sử dụng chỉ dẫn phủ định hoặc ép ngưỡng tin cậy sẽ tạo ra các xung đột chỉ dẫn thay vì sửa gốc rễ của phân phối nhãn.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]