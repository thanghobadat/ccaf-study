[
  {
    "id": "d4-b08-new-007",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-007",
    "scenarioSignature": {
      "testedPrinciple": "few-shot example ordering impact on model anchoring",
      "failureMode": "high false positive rate from early edge case anchoring",
      "rootCause": "placing obscure edge cases first in few-shot prompt context",
      "requiredFix": "reorder few-shot list with representative baseline cases first"
    },
    "questionEN": "In the IncidentSeverityRouter microservice, gemini-2.5-flash classifies incoming PagerDuty alert payloads into the severity field (CRITICAL, MAJOR, MINOR, INFO). Evaluation reveals a 41% false escalation rate where routine warnings are misclassified as CRITICAL. Inspection of the prompt shows that six few-shot examples are provided, but the first three examples feature rare, complex edge cases (e.g., multi-node kernel panics with corrupted log headers) to ensure they were handled. Why is the model misclassifying routine alerts, and how should the prompt structure be modified?",
    "question": "[d4-b08-new-007] Trong microservice IncidentSeverityRouter, gemini-2.5-flash phân loại dữ liệu cảnh báo PagerDuty vào trường severity (CRITICAL, MAJOR, MINOR, INFO). Đánh giá thực tế ghi nhận tỷ lệ leo thang sai 41% khi các cảnh báo thông thường bị phân loại nhầm thành CRITICAL. Kiểm tra prompt cho thấy prompt cung cấp 6 ví dụ few-shot, nhưng 3 ví dụ đầu tiên lại là các trường hợp biên hiếm gặp và phức tạp (ví dụ: lỗi kernel panic đa nút kèm hỏng log header) để đảm bảo mô hình xử lý được chúng. Vì sao mô hình lại phân loại nhầm các cảnh báo thông thường, và cấu trúc prompt nên được sửa đổi thế nào?",
    "optionsEN": [
      "A. The model lacks negative constraints; add prose rules in the user prompt explicitly listing alerts that must never be assigned CRITICAL.",
      "B. The example volume is insufficient for edge case representation; append ten additional rare failure payloads at the top of the prompt list.",
      "C. The model exhibits primacy bias by anchoring on the unusual edge cases listed first; reorder the few-shot list to place clear, high-frequency baseline examples at the beginning before edge cases.",
      "D. The prompt delimiter style is invalid; encapsulate all six examples into a raw JSON string block inside system prompt instructions."
    ],
    "options": [
      "A. Mô hình thiếu các ràng buộc phủ định; hãy thêm quy tắc văn bản trong user prompt liệt kê rõ các cảnh báo không bao giờ được gán nhãn CRITICAL.",
      "B. Số lượng ví dụ không đủ để đại diện cho các trường hợp biên; hãy bổ sung thêm 10 dữ liệu lỗi hiếm gặp vào đầu danh sách prompt.",
      "C. Mô hình gặp hiệu ứng ưu tiên (primacy bias) khi bám chặt vào các trường hợp biên bất thường nằm ở đầu; hãy sắp xếp lại danh sách few-shot để đặt các ví dụ cơ sở phổ biến lên đầu trước các trường hợp biên.",
      "D. Định dạng phân cách prompt không hợp lệ; hãy đóng gói cả 6 ví dụ thành một chuỗi JSON thô bên trong khối hướng dẫn của system prompt."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Adding prose constraints does not eliminate the primacy anchoring caused by early complex examples and risks suppressing legitimate CRITICAL escalations for complex disk events.",
      "Option B is incorrect: Prepending more rare edge cases worsens model anchoring on unusual patterns and increases prompt context bloat without establishing the baseline distribution.",
      "Option C is correct: LLMs display strong primacy bias, anchoring on the first few-shot examples to establish typical input-output mappings; placing standard high-frequency cases first calibrates the baseline while keeping edge cases later for nuance.",
      "Option D is incorrect: Changing the formatting container to a raw JSON string does not change positional sequence bias, so early edge cases will still distort classification probability."
    ],
    "rationale": "Few-shot example sequence order heavily influences LLM output distribution due to primacy bias. When rare or highly complex edge cases are placed at the top of the example sequence, the model anchors on those structural patterns as the default operational state, leading to severe false escalation rates on normal inputs. Structuring the prompt with high-frequency canonical baseline examples first establishes the true baseline classification before introducing edge cases for boundary refinement.",
    "explanation": "Lựa chọn C là đáp án đúng. Các mô hình ngôn ngữ lớn (LLM) thể hiện hiệu ứng ưu tiên (primacy bias) rất mạnh, theo đó các ví dụ few-shot xuất hiện đầu tiên trong ngữ cảnh sẽ định hình cách mô hình hiểu cấu trúc và phân bổ nhãn mặc định. Việc đưa các trường hợp biên phức tạp lên đầu khiến mô hình coi đó là mẫu hình tiêu chuẩn và gán nhãn nghiêm trọng quá mức cho các cảnh báo thông thường. Sắp xếp các ví dụ chuẩn mực, tần suất cao ở đầu danh sách giúp thiết lập phân bổ nền tảng chính xác, trong khi vẫn giữ các trường hợp biên phía sau để hỗ trợ tinh chỉnh.\n\nLựa chọn A sai vì việc bổ sung quy tắc phủ định bằng văn bản không giải quyết được hiện tượng ưu tiên mẫu hình từ ví dụ few-shot và có nguy cơ bỏ sót các sự cố đĩa thực sự nghiêm trọng.\nLựa chọn B sai vì việc chèn thêm các trường hợp biên hiếm gặp vào đầu danh sách sẽ làm trầm trọng hơn hiện tượng thiên vị điểm đầu và gây lãng phí ngữ cảnh.\nLựa chọn D sai vì việc đổi định dạng sang chuỗi JSON thô không làm thay đổi thứ tự xuất hiện của thông tin, nên các trường hợp biên ở đầu vẫn gây lệch kết quả.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-008",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-008",
    "scenarioSignature": {
      "testedPrinciple": "positional attention management in few-shot example blocks",
      "failureMode": "underweighting canonical examples buried in prompt middle",
      "rootCause": "placing high confidence representative examples in central positions",
      "requiredFix": "reposition canonical examples to primacy and recency context boundaries"
    },
    "questionEN": "In the ClaimProcessingPipeline, gemini-2.5-flash categorizes insurance text into claim_type (HEALTH, AUTO, PROPERTY, LIABILITY). The prompt contains 12 few-shot examples. However, the most confident, canonical examples for standard claims are buried in positions 5 through 8 in the middle of the example block, flanked by edge cases at the beginning and end. Production metrics show a 28% accuracy drop on routine claims. What is the root cause of this failure and how should the few-shot prompt be structured?",
    "question": "[d4-b08-new-008] Trong hệ thống ClaimProcessingPipeline, gemini-2.5-flash phân loại văn bản yêu cầu bồi thường bảo hiểm vào claim_type (HEALTH, AUTO, PROPERTY, LIABILITY). Prompt chứa 12 ví dụ few-shot. Tuy nhiên, các ví dụ chuẩn mực và rõ ràng nhất cho các yêu cầu bồi thường thông thường lại nằm ở vị trí thứ 5 đến 8 ở giữa khối ví dụ, bị kẹp giữa các trường hợp biên ở đầu và cuối. Chỉ số sản xuất cho thấy độ chính xác giảm 28% đối với các yêu cầu bồi thường thông thường. Nguyên nhân gốc rễ của lỗi này là gì và prompt few-shot nên được tái cấu trúc ra sao?",
    "optionsEN": [
      "A. The model context length is saturated; raise temperature to 0.9 to force uniform sampling across all central example embeddings.",
      "B. The prompt contains too many examples; prune the list down to 2 examples total placed exclusively at the top of the system prompt.",
      "C. The model ignores mid-prompt content; duplicate the central examples and append them as a separate user prompt at the end of the chat session.",
      "D. The model underweights information in the middle of long contexts (lost-in-middle effect); reposition high-confidence canonical examples to the start and end of the few-shot block, placing edge cases in between."
    ],
    "options": [
      "A. Chiều dài ngữ cảnh mô hình bị bão hòa; hãy tăng tham số temperature lên 0.9 để ép mô hình lấy mẫu đồng đều trên tất cả vector nhúng của ví dụ nằm ở giữa.",
      "B. Prompt chứa quá nhiều ví dụ; hãy cắt giảm danh sách xuống chỉ còn 2 ví dụ tổng cộng và đặt duy nhất ở đầu system prompt.",
      "C. Mô hình bỏ qua nội dung ở giữa prompt; hãy nhân bản các ví dụ ở giữa và đính kèm thành một câu lệnh người dùng riêng biệt ở cuối phiên hội thoại.",
      "D. Mô hình giảm chú ý đối với thông tin ở giữa ngữ cảnh dài (hiệu ứng lost-in-middle); hãy chuyển các ví dụ chuẩn mực có độ tin cậy cao lên đầu và cuối khối few-shot, đặt các trường hợp biên ở giữa."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Increasing temperature increases output sampling randomness and hallucination risk; it does not resolve positional attention attenuation in LLMs.",
      "Option B is incorrect: Reducing the total example count to 2 leaves two of the four required claim classes completely unrepresented, causing severe label imbalance.",
      "Option C is incorrect: Appending duplicate examples as user turns pollutes conversation history and wastes context tokens without fixing the prompt sequence architecture.",
      "Option D is correct: LLMs suffer from the lost-in-middle phenomenon, paying higher attention to the start (primacy) and end (recency) of context blocks; placing canonical baseline examples at these boundaries ensures strong anchor weighting."
    ],
    "rationale": "LLMs demonstrate U-shaped attention distribution curves across long input contexts (the lost-in-middle phenomenon), where information placed in central positions receives significantly lower attention weights than information placed near the prompt start (primacy) or prompt end (recency). Placing primary canonical examples in the middle of a 12-example sequence causes the model to under-attend to standard classification boundaries. Reorganizing the example list to place core canonical examples at the primacy and recency positions maximizes positional attention efficiency.",
    "explanation": "Lựa chọn D là đáp án đúng. Các mô hình ngôn ngữ lớn gặp phải hiện tượng 'lost-in-middle' (lãng quên ở giữa), trong đó khả năng chú ý (attention) đạt mức cao nhất ở đầu (primacy) và cuối (recency) của ngữ cảnh prompt, nhưng suy giảm đáng kể ở phần giữa. Việc đặt các ví dụ chuẩn mực trọng tâm vào giữa làm cho mô hình coi nhẹ chúng, dẫn đến giảm độ chính xác trên các dữ liệu phổ biến. Đặt các ví dụ cơ sở ở các vị trí biên (đầu và cuối) đảm bảo mô hình tiếp nhận trọng số chú ý tối đa.\n\nLựa chọn A sai vì việc tăng temperature chỉ làm tăng tính ngẫu nhiên và nguy cơ ảo giác của đầu ra chứ không khắc phục được sự suy giảm chú ý theo vị trí.\nLựa chọn B sai vì cắt giảm xuống 2 ví dụ sẽ khiến ít nhất 2 phân lớp bảo hiểm không có ví dụ đại diện, gây ra hiện tượng mất cân bằng nhãn nghiêm trọng.\nLựa chọn C sai vì việc nhân bản ví dụ thành các lượt hội thoại người dùng làm ô nhiễm lịch sử trò chuyện và lãng phí token mà không giải quyết đúng kiến trúc chuỗi prompt.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]