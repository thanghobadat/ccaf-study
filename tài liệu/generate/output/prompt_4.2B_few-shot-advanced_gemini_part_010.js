[
  {
    "id": "d4-b08-B-019",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-19",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-019",
    "scenarioSignature": {
      "testedPrinciple": "negative example boundary calibration",
      "failureMode": "severe recall drop on critical classification category",
      "rootCause": "overly restrictive negative instruction in prompt example anchoring model decision boundary",
      "requiredFix": "rebalance prompt with positive boundary examples demonstrating valid trigger criteria"
    },
    "questionEN": "In an IT incident dispatch service, gemini-2.5-flash classifies incoming support tickets into priority_level (CRITICAL, URGENT, ROUTINE). To stop the model from misclassifying routine password reset requests as URGENT, the team added a negative example featuring explicit negative constraints: 'DO NOT classify as URGENT unless all system services are completely offline across multiple regions.' Following this change, production evaluation shows the recall for valid URGENT tickets (such as database degradation and latency spikes) dropped from 89% to 12%. What is the primary cause of this performance drop, and how should it be remediated?",
    "question": "[d4-b08-B-019] Trong một dịch vụ điều phối sự cố IT, gemini-2.5-flash phân loại các yêu cầu hỗ trợ vào trường priority_level (CRITICAL, URGENT, ROUTINE). Để ngăn mô hình phân loại nhầm các yêu cầu cấp lại mật khẩu thông thường thành URGENT, nhóm phát triển đã thêm một ví dụ tiêu cực kèm câu lệnh cấm: 'DO NOT classify as URGENT unless all system services are completely offline across multiple regions.' Sau thay đổi này, đánh giá thực tế cho thấy tỷ lệ thu hồi (recall) của các vé URGENT hợp lệ (như suy giảm hiệu năng cơ sở dữ liệu và tăng độ trễ) giảm từ 89% xuống 12%. Nguyên nhân chính của sự sụt giảm này là gì và làm thế nào để khắc phục?",
    "optionsEN": [
      "A. The model context window is saturated by negative rule tokens; remove all negative constraint syntax and increase temperature to 0.7 to restore sensitivity.",
      "B. Negative examples trigger XML schema validation failures; convert the prompt to dynamic RAG retrieval to fetch routine tickets dynamically.",
      "C. The restrictive negative example shifted the model's decision boundary to an overly extreme threshold; replace the strict negative rule with balanced positive examples showing valid URGENT edge cases.",
      "D. The system prompt lacks explicit JSON field constraints; add strict regex pattern matching to the priority_level schema definitions."
    ],
    "options": [
      "A. Cửa sổ ngữ cảnh bị quá tải bởi các token quy tắc tiêu cực; xóa tất cả cú pháp ràng buộc tiêu cực và tăng temperature lên 0.7 để khôi phục độ nhạy.",
      "B. Các ví dụ tiêu cực gây ra lỗi xác thực cấu trúc XML; chuyển đổi prompt sang truy xuất RAG động để lấy các vé hỗ trợ thông thường.",
      "C. Ví dụ tiêu cực quá thắt chặt đã dịch chuyển ranh giới quyết định của mô hình sang ngưỡng cực đoan; thay thế quy tắc tiêu cực ngặt nghèo bằng các ví dụ tích cực cân bằng thể hiện các trường hợp URGENT hợp lệ.",
      "D. System prompt thiếu các ràng buộc trường JSON rõ ràng; thêm khớp mẫu regex nghiêm ngặt vào định nghĩa schema priority_level."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Context saturation is not the issue, and raising temperature increases randomness without fixing boundary anchoring.",
      "Option B is incorrect: Negative examples do not break XML schema validation, and dynamic retrieval without proper prompt calibration will not fix the boundary shift.",
      "Option C is correct: Overly restrictive negative directives in few-shot examples cause LLMs to over-generalize the exclusion criteria, severely shifting the decision threshold and suppressing valid URGENT classifications.",
      "Option D is incorrect: Schema regex validation enforces field formats, not semantic classification decision logic."
    ],
    "rationale": "Overly strict negative guidance ('DO NOT classify as X unless [extreme condition]') anchors the model's decision boundary to an excessively high threshold, suppressing true positive classifications for standard valid cases. The correct remediation is providing positive examples that clearly illustrate valid boundary conditions for the URGENT class.",
    "explanation": "Lựa chọn C đúng vì khi đưa vào các hướng dẫn phủ định quá ngặt nghèo trong các ví dụ (như chỉ được coi là URGENT khi toàn bộ hệ thống sập đa vùng), mô hình ngôn ngữ sẽ bị neo ranh giới quyết định (decision boundary) vào một tiêu chuẩn cực đoan. Điều này dẫn đến việc bỏ sót (under-classification/low recall) các trường hợp URGENT hợp lệ khác. Giải pháp là loại bỏ câu lệnh phủ định quá mức và bổ sung các ví dụ tích cực bao phủ đúng ranh giới của phân loại URGENT.\n\nCác lựa chọn khác không chính xác:\n- A sai vì tràn cửa sổ ngữ cảnh không phải nguyên nhân, và tăng temperature chỉ làm tăng tính ngẫu nhiên chứ không giải quyết ranh giới quyết định.\n- B sai vì quy tắc phủ định không liên quan đến lỗi XML hay RAG retrieval.\n- D sai vì regex schema chỉ kiểm tra định dạng chuỗi trả về, không điều chỉnh được logic phân loại ngữ nghĩa của mô hình.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-B-020",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-20",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-020",
    "scenarioSignature": {
      "testedPrinciple": "few-shot example distribution alignment with task priorities",
      "failureMode": "omission of critical security findings during automated code review",
      "rootCause": "few-shot examples exclusively demonstrating cosmetic formatting fixes steer model focus away from security vulnerability detection",
      "requiredFix": "restructure few-shot dataset to emphasize severe vulnerability detection patterns over minor style rules"
    },
    "questionEN": "In an automated CI/CD code audit pipeline, gemini-2.5-flash is deployed to inspect pull requests and generate JSON reports in security_findings (severity, vulnerability_type, line_number). The prompt includes 6 few-shot examples that demonstrate correcting minor code formatting issues, variable renaming, and documentation typos. During security benchmark evaluations, the pipeline missed 85% of critical SQL injection and hardcoded API key vulnerabilities. What is the root cause of this failure, and how should the few-shot context be redesigned?",
    "question": "[d4-b08-B-020] Trong đường ống tự động kiểm tra mã nguồn CI/CD, gemini-2.5-flash được triển khai để quét các pull request và tạo báo cáo JSON trong trường security_findings (severity, vulnerability_type, line_number). Prompt chứa 6 ví dụ few-shot minh họa việc sửa các lỗi định dạng nhỏ, đổi tên biến và lỗi chính tả trong tài liệu. Khi đánh giá theo bộ kiểm thử bảo mật, đường ống đã bỏ sót 85% các lỗ hổng nghiêm trọng như SQL injection và lộ khóa API. Nguyên nhân gốc rễ của thất bại này là gì và ngữ cảnh few-shot nên được thiết kế lại như thế nào?",
    "optionsEN": [
      "A. The model context length was exceeded by code snippets; shorten the prompt by removing system instructions and enforcing low temperature.",
      "B. Code review tasks require fine-tuning models; few-shot prompting is inherently incapable of syntax error detection.",
      "C. The JSON output schema lacks regex validation for severity strings; update the JSON schema definition to require CRITICAL values.",
      "D. The example distribution primed the model to focus exclusively on cosmetic style issues; rebalance the few-shot set to prioritize complex security vulnerability detection examples."
    ],
    "options": [
      "A. Độ dài ngữ cảnh của mô hình bị vượt quá bởi các đoạn mã; rút ngắn prompt bằng cách xóa các hướng dẫn hệ thống và áp dụng temperature thấp.",
      "B. Nhiệm vụ kiểm tra mã nguồn bắt buộc phải fine-tune mô hình; few-shot prompting bản chất không thể phát hiện lỗi cú pháp.",
      "C. Schema đầu ra JSON thiếu xác thực regex cho các chuỗi mức độ nghiêm trọng; cập nhật định nghĩa JSON schema để bắt buộc giá trị CRITICAL.",
      "D. Phân bố ví dụ đã định hướng mô hình tập trung hoàn toàn vào các lỗi trình bày nhỏ; tái cân bằng tập few-shot để ưu tiên các ví dụ phát hiện lỗ hổng bảo mật phức tạp."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Token length is not the cause, and removing system instructions degrades task specification.",
      "Option B is incorrect: Gemini Flash can effectively detect vulnerabilities via prompt engineering when provided proper contextual examples.",
      "Option C is incorrect: Enforcing schema regex validation ensures output formatting compliance but cannot force the model to identify missed semantic security bugs.",
      "Option D is correct: Few-shot examples heavily anchor model attention and pattern recognition. When examples focus solely on minor cosmetic edits, the model adopts a low-severity inspection pattern and ignores deep security vulnerabilities."
    ],
    "rationale": "Models infer the operational task objective and attention priority from the demonstrated patterns in few-shot examples. If all examples show trivial style fixes, the model's feature extraction anchors on superficial edits rather than deep vulnerability analysis. Rebalancing the dataset with security flaw examples re-aligns the model's focus.",
    "explanation": "Lựa chọn D đúng vì các ví dụ few-shot đóng vai trò định hướng sự chú ý (attention/task objective) của mô hình. Khi toàn bộ 6 ví dụ chỉ minh họa các sửa đổi nhỏ về trình bày/định dạng, mô hình học được mẫu hành vi là 'tìm và báo cáo các lỗi vặt', từ đó bỏ qua việc phân tích sâu các nguy cơ bảo mật nghiêm trọng. Cần tái cân bằng tập ví dụ để tập trung vào phát hiện lỗ hổng bảo mật.\n\nCác lựa chọn khác không chính xác:\n- A sai vì vấn đề không nằm ở giới hạn token hay temperature.\n- B sai vì Gemini Flash hoàn toàn có khả năng phát hiện lỗ hổng nếu prompt được cung cấp đúng ví dụ.\n- C sai vì JSON schema chỉ kiểm soát kiểu dữ liệu và định dạng chuỗi trả về, không thể giúp mô hình phát hiện được lỗ hổng đã bị bỏ sót trong quá trình đọc hiểu mã."
  }
]