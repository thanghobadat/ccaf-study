[
  {
    "id": "d4-b08-new-013",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-013",
    "scenarioSignature": {
      "testedPrinciple": "context footprint efficiency in few-shot prompting",
      "failureMode": "latency spike and accuracy degradation from excessive examples",
      "rootCause": "over-reliance on redundant few-shot examples causing context bloat",
      "requiredFix": "prune example count to a minimal high-signal set"
    },
    "questionEN": "The AdComplianceGuard service uses gemini-2.5-flash to evaluate digital ad copy against policy rules, returning a boolean is_violating field within the JSON output schema. To ensure high compliance, developers included 25 full ad copy few-shot example pairs in the prompt. In production, this bloated the prompt to over 14,000 input tokens per call, causing p95 latency to jump to 2.8 seconds and classification accuracy to drop from 94% to 73% due to model attention dilution across repetitive examples. Which prompt engineering modification resolves this issue?",
    "question": "[d4-b08-new-013] Dịch vụ AdComplianceGuard sử dụng gemini-2.5-flash để đánh giá nội dung quảng cáo dựa trên quy định chính sách, trả về trường boolean is_violating trong JSON output schema. Để đảm bảo tính tuân thủ cao, các nhà phát triển đã đưa 25 cặp ví dụ few-shot hoàn chỉnh vào prompt. Trong môi trường production, điều này khiến prompt phình to lên hơn 14,000 input token cho mỗi cuộc gọi, làm p95 latency tăng lên 2.8 giây và độ chính xác phân loại giảm từ 94% xuống 73% do sự chú ý của mô hình bị loãng qua các ví dụ lặp lại. Thay đổi prompt engineering nào giải quyết được vấn đề này?",
    "optionsEN": [
      "A. Reduce the few-shot set to 3-5 concise, high-signal examples covering core policy categories and edge cases to eliminate context bloat while retaining structural guidance.",
      "B. Transfer all 25 few-shot examples into synthetic JSON-schema property descriptions inside the response_schema parameter to enforce policy constraints.",
      "C. Append a negative instruction at the end of the prompt demanding that the model allocate equal attention weight across all 25 example pairs.",
      "D. Partition the prompt into 5 parallel API calls containing 5 examples each and aggregate the boolean flags via an ensemble majority vote."
    ],
    "options": [
      "A. Giảm tập ví dụ few-shot xuống còn 3-5 ví dụ ngắn gọn, chất lượng cao bao phủ các nhóm chính sách cốt lõi và trường hợp biên để loại bỏ phình ngữ cảnh trong khi vẫn giữ định hướng cấu trúc.",
      "B. Chuyển toàn bộ 25 ví dụ few-shot thành các mô tả thuộc tính JSON-schema tổng hợp bên trong tham số response_schema để ép buộc các ràng buộc chính sách.",
      "C. Thêm một chỉ dẫn tiêu cực ở cuối prompt yêu cầu mô hình phân bổ trọng số chú ý đều nhau trên toàn bộ 25 cặp ví dụ.",
      "D. Chia nhỏ prompt thành 5 lệnh gọi API song song chứa 5 ví dụ cho mỗi lệnh và tổng hợp các cờ boolean thông qua cơ chế bỏ phiếu đa số ensemble."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Pruning the example set to 3-5 high-signal representative pairs drastically reduces context overhead, restores model attention focus, and resolves latency issues while preserving high accuracy.",
      "Option B: Moving example text into JSON schema field descriptions alters metadata syntax rather than reducing token load, failing to address context bloat or attention degradation.",
      "Option C: Adding instruction constraints cannot overcome fundamental transformer attention limits caused by tens of thousands of redundant input tokens.",
      "Option D: Executing 5 redundant API calls multiplies system latency and inference cost by 5x without fixing the underlying example redundancy."
    ],
    "rationale": "For simple classification tasks, supplying an excessive number of few-shot examples (e.g., 25 pairs) leads to severe context bloat and model attention dilution. Reducing the example count to a calibrated set of 3-5 high-signal examples recovers performance while significantly reducing token footprint and latency.",
    "explanation": "Trong phân loại văn bản đơn giản, việc lạm dụng quá nhiều ví dụ few-shot (như 25 ví dụ) gây ra hiện tượng phình ngữ cảnh (context bloat) và làm loãng sự chú ý của mô hình (attention dilution), khiến latency tăng cao và độ chính xác bị suy giảm. Đáp án A chính xác vì việc tinh gọn tập ví dụ xuống 3-5 câu mẫu chất lượng cao (bao gồm cả trường hợp tiêu chuẩn và trường hợp biên) cung cấp đầy đủ định hướng định dạng mà không gây quá tải ngữ cảnh. Đáp án B sai vì việc đẩy ví dụ vào schema description không làm giảm lượng token. Đáp án C sai vì prompt instruction không thể khắc phục giới hạn chú ý vật lý của cơ chế self-attention khi prompt chứa quá nhiều token thừa. Đáp án D sai vì việc chia nhỏ thành 5 API call song song sẽ làm tăng chi phí và độ trễ lên gấp 5 lần.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-014",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-014",
    "scenarioSignature": {
      "testedPrinciple": "few-shot example count optimization and calibration",
      "failureMode": "diminishing accuracy returns with linear token cost escalation",
      "rootCause": "adding examples past accuracy saturation threshold",
      "requiredFix": "cap few-shot prompt at point of accuracy saturation"
    },
    "questionEN": "The engineering team building SupportTicketRouter is calibrating few-shot prompts for gemini-2.5-flash to output the routing_queue enum field. Benchmarking yields: 0-shot achieves 64% accuracy; 3-shot achieves 82%; 5-shot achieves 91%; and 8-shot achieves 91.3% while increasing input token overhead and API costs by 55%. Following few-shot prompt calibration best practices, which configuration strategy should the team deploy to production?",
    "question": "[d4-b08-new-014] Đội ngũ kỹ sư phát triển SupportTicketRouter đang căn chỉnh prompt few-shot cho gemini-2.5-flash để xuất ra trường enum routing_queue. Kết quả đánh giá benchmark ghi nhận: 0-shot đạt độ chính xác 64%; 3-shot đạt 82%; 5-shot đạt 91%; và 8-shot đạt 91.3% nhưng làm tăng 55% chi phí API và lượng token đầu vào. Theo các thực hành tốt nhất về căn chỉnh prompt few-shot, chiến lược cấu hình nào đội ngũ nên triển khai lên production?",
    "optionsEN": [
      "A. Deploy the 8-shot prompt configuration to ensure maximum raw benchmark accuracy, prioritizing the 0.3% gain over operational token efficiency.",
      "B. Standardize on the 5-shot prompt configuration, as accuracy gains saturate beyond 5 examples while additional shots linearly inflate latency and cost.",
      "C. Revert to a 0-shot prompt configuration and increase the temperature parameter to 0.9 to encourage diverse classification outputs.",
      "D. Implement a dynamic 12-shot RAG retrieval pipeline to force maximum contextual example density for every incoming ticket."
    ],
    "options": [
      "A. Triển khai cấu hình prompt 8-shot để đảm bảo độ chính xác benchmark thô tối đa, ưu tiên mức tăng 0.3% so với hiệu quả chi phí token vận hành.",
      "B. Chuẩn hóa ở cấu hình prompt 5-shot, vì mức tăng độ chính xác bão hòa sau 5 ví dụ trong khi các ví dụ bổ sung làm tăng tuyến tính độ trễ và chi phí.",
      "C. Quay trở lại cấu hình prompt 0-shot và tăng tham số temperature lên 0.9 để khuyến khích các đầu ra phân loại đa dạng.",
      "D. Triển khai pipeline RAG truy xuất 12-shot động để ép mật độ ví dụ ngữ cảnh tối đa cho mọi yêu cầu gửi đến."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A: Choosing 8-shot for a negligible 0.3% performance improvement causes a 55% increase in token cost and latency, failing cost-benefit trade-offs.",
      "Option B (Correct): Empirical few-shot calibration highlights diminishing returns beyond 5 examples; capping at 5 captures optimal accuracy (91%) while avoiding unnecessary context inflation.",
      "Option C: Dropping to 0-shot causes accuracy to collapse to 64%, and raising temperature increases non-deterministic variance without improving output formatting.",
      "Option D: Expanding retrieval to 12 examples exacerbates context bloat and cost without resolving the underlying accuracy saturation curve."
    ],
    "rationale": "Few-shot calibration requires finding the inflection point where additional examples yield diminishing accuracy returns relative to token cost. In this evaluation curve, moving from 5 to 8 shots yields only a 0.3% accuracy bump at a 55% cost penalty, making 5 examples the optimal production choice.",
    "explanation": "Căn chỉnh few-shot (few-shot calibration) đòi hỏi việc tìm ra điểm ngọt (sweet spot) trong mối tương quan giữa độ chính xác và chi phí token. Khi tăng từ 5 lên 8 ví dụ, độ chính xác chỉ tăng nhẹ 0.3% (từ 91% lên 91.3%) nhưng chi phí token và độ trễ tăng tới 55%, cho thấy ngưỡng hiệu năng đã bị bão hòa. Đáp án B đúng vì cấu hình 5-shot đạt điểm cân bằng tối ưu. Đáp án A sai vì lãng phí tài nguyên cho mức tăng không đáng kể. Đáp án C sai vì làm giảm mạnh độ chính xác xuống 64%. Đáp án D sai vì 12 ví dụ chỉ làm trầm trọng thêm vấn đề lãng phí ngữ cảnh.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]