[
  {
    "id": "d4-b08-new-017",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-17",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-017",
    "scenarioSignature": {
      "testedPrinciple": "temporal input distribution coverage in few-shot prompt sets",
      "failureMode": "accuracy degradation on seasonal production data",
      "rootCause": "few-shot prompt examples biased toward single quarter baseline patterns",
      "requiredFix": "re-balance few-shot example set across all fiscal quarters"
    },
    "questionEN": "In the DemandPlannerService automated inventory pipeline, gemini-2.5-flash classifies incoming retail items into the quarterly_forecast_category schema field (HIGH_DEMAND, STABLE, LOW_DEMAND). Production metrics show that classification accuracy fell from 94% during Q1 baseline testing to 58% during the Q3 summer surge. Prompt inspection reveals that all six static few-shot prompt examples were collected exclusively from Q1 winter historical sales logs, omitting Q3 back-to-school and summer promotion patterns. What is the most effective prompt engineering fix to restore accuracy during summer months?",
    "question": "[d4-b08-new-017] Trong đường ống tự động hóa kho hàng DemandPlannerService, gemini-2.5-flash phân loại các mặt hàng bán lẻ vào trường schema quarterly_forecast_category (HIGH_DEMAND, STABLE, LOW_DEMAND). Chỉ số sản xuất cho thấy độ chính xác phân loại đã giảm từ 94% trong đợt kiểm thử cơ sở Q1 xuống còn 58% trong đợt tăng cao điểm Q3 mùa hè. Kiểm tra prompt cho thấy tất cả sáu ví dụ few-shot tĩnh đều được thu thập duy nhất từ nhật ký bán hàng lịch sử Q1 mùa đông, bỏ qua các mẫu hình Q3 như tựu trường và khuyến mãi hè. Giải pháp kỹ thuật prompt hiệu quả nhất để khôi phục độ chính xác trong các tháng mùa hè là gì?",
    "optionsEN": [
      "A. Balance and refresh the few-shot prompt dataset by sampling historical inputs across all four fiscal quarters (Q1 to Q4) to capture seasonal demand variations.",
      "B. Increase the model temperature parameter from 0.2 to 0.9 during summer months so the model can hallucinate non-Q1 patterns dynamically.",
      "C. Add a negative system instruction explicitly directing the model to ignore Q1 winter purchasing rules when processing summer input dates.",
      "D. Reformat the existing Q1 few-shot examples using strict XML tags (<example_input>, <example_output>) to enforce cleaner structural parsing."
    ],
    "options": [
      "A. Cân bằng và làm mới tập dữ liệu ví dụ few-shot bằng cách lấy mẫu các đầu vào lịch sử trên cả bốn quý tài chính (Q1 đến Q4) để bao phủ sự biến động nhu cầu theo mùa.",
      "B. Tăng tham số temperature của mô hình từ 0.2 lên 0.9 trong các tháng mùa hè để mô hình tự suy luận động các mẫu hình ngoài Q1.",
      "C. Thêm một chỉ dẫn hệ thống phủ định (negative instruction) chỉ đạo rõ ràng mô hình bỏ qua các quy tắc mua sắm Q1 mùa đông khi xử lý các ngày đầu vào mùa hè.",
      "D. Định dạng lại các ví dụ few-shot Q1 hiện có bằng các thẻ XML nghiêm ngặt (<example_input>, <example_output>) để áp đặt việc phân tích cấu trúc sạch hơn."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because few-shot examples must represent the full operational distribution of real production data; updating the prompt set with multi-quarter historical samples ensures the model learns seasonal variance like Q3 summer spikes.",
      "Option B is incorrect because raising temperature increases sampling randomness rather than providing missing seasonal pattern context, leading to higher output hallucination.",
      "Option C is incorrect because prose negative instructions cannot compensate for structural example distribution gaps when the model lacks concrete input-output demonstrations of summer peak behaviors.",
      "Option D is incorrect because modifying XML tag formatting improves parsing structure but does not resolve the temporal data skew of missing Q3 seasonal examples."
    ],
    "rationale": "Few-shot prompting relies on representative data coverage. When prompt examples are sampled from a single temporal window (Q1), the model overfits to baseline off-peak features and fails when real production inputs exhibit seasonal shifts (Q3). Re-balancing the example set across all quarters restores coverage across the entire input distribution.",
    "explanation": "Lựa chọn A là đáp án đúng vì nguyên tắc cốt lõi của few-shot prompting là tập ví dụ phải đại diện cho toàn bộ phân phối dữ liệu thực tế trong sản xuất. Khi tất cả ví dụ chỉ lấy từ Q1, mô hình bị lệch (skewed) theo các mẫu hình mua sắm mùa đông và thất bại khi gặp các đợt biến động theo mùa vào Q3. Việc lấy mẫu lại ví dụ qua cả 4 quý giúp mô hình nắm bắt đầy đủ bối cảnh biến động.\n\nLựa chọn B sai vì việc tăng temperature chỉ làm tăng tính ngẫu nhiên của đầu ra chứ không cung cấp tri thức bối cảnh còn thiếu về các đợt tăng trưởng mùa hè.\n\nLựa chọn C sai vì các câu hướng dẫn phủ định bằng văn xuôi không thể thay thế cho các mẫu ví dụ đầu vào-đầu ra cụ thể khi mô hình thiếu dữ liệu minh họa thực tế.\n\nLựa chọn D sai vì việc thay đổi thẻ XML chỉ hỗ trợ cấu trúc cú pháp phân tích, hoàn toàn không khắc phục được sự thiếu hụt phân phối dữ liệu theo mùa.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  },
  {
    "id": "d4-b08-new-018",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-18",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-new-018",
    "scenarioSignature": {
      "testedPrinciple": "real-world input distribution alignment in few-shot prompting",
      "failureMode": "classification accuracy drop when deploying from synthetic tests to noisy production",
      "rootCause": "few-shot examples constructed from hand-crafted ideal synthetic inputs",
      "requiredFix": "replace synthetic prompt examples with real anonymized production payloads"
    },
    "questionEN": "In the LogAnomalyAnalyzer microservice, gemini-2.5-flash parses unstructured application logs and extracts diagnostic details into the severity_level output schema field (CRITICAL, WARNING, INFO). In staging tests using clean hand-crafted synthetic JSON log samples, classification accuracy reached 98%. However, in production execution on live server logs, accuracy dropped to 61% because real inputs contain multi-line stack traces, unescaped control characters, and truncated strings. Why did this accuracy drop occur, and how should the few-shot prompt be corrected?",
    "question": "[d4-b08-new-018] Trong dịch vụ vi mô LogAnomalyAnalyzer, gemini-2.5-flash phân tích log ứng dụng phi cấu trúc và trích xuất chi tiết chẩn đoán vào trường schema đầu ra severity_level (CRITICAL, WARNING, INFO). Trong các bài kiểm thử staging sử dụng các mẫu log JSON tổng hợp thủ công sạch sẽ, độ chính xác phân loại đạt 98%. Tuy nhiên, khi chạy thực tế trên log máy chủ live, độ chính xác giảm xuống 61% do đầu vào thực tế chứa các vết vết ngăn xếp (stack trace) nhiều dòng, các ký tự điều khiển chưa được escape và các chuỗi bị cắt ngắn. Tại sao sự sụt giảm độ chính xác này lại xảy ra và nên sửa prompt few-shot như thế nào?",
    "optionsEN": [
      "A. Synthetic inputs lacked complex JSON nested tags; add 10 more synthetic ideal examples with deeper JSON nesting.",
      "B. Synthetic examples did not match real input distribution; replace hand-crafted synthetic samples with anonymized real production log payloads containing messy formatting and truncations.",
      "C. The model lacked retry logic; implement a backend validation wrapper to re-prompt the model upon JSON schema extraction failure.",
      "D. Raw logs were unparsed; add a pre-processing regex pipeline to strip all multi-line stack traces and unescaped characters before prompt insertion."
    ],
    "options": [
      "A. Các đầu vào tổng hợp thiếu các thẻ JSON lồng nhau phức tạp; hãy thêm 10 ví dụ lý tưởng tổng hợp nữa với mức độ lồng JSON sâu hơn.",
      "B. Các ví dụ tổng hợp không khớp với phân phối đầu vào thực tế; hãy thay thế các mẫu tổng hợp thủ công bằng các payload log sản xuất thực tế đã ẩn danh chứa định dạng nhiễu và vết cắt ngắn.",
      "C. Mô hình thiếu logic thử lại; hãy triển khai một bộ bọc xác thực backend để re-prompt mô hình khi việc trích xuất JSON schema thất bại.",
      "D. Log thô chưa được phân tích; hãy thêm một đường ống regex tiền xử lý để loại bỏ tất cả các stack trace nhiều dòng và ký tự chưa escape trước khi đưa vào prompt."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because adding more ideal synthetic examples amplifies the distribution mismatch between clean prompt examples and noisy production payloads.",
      "Option B is correct because few-shot prompting requires examples drawn directly from real production input distributions so the model learns to generalize across messy, noisy, and incomplete real-world inputs.",
      "Option C is incorrect because backend retries address malformed output JSON syntax but do not fix incorrect classification predictions caused by input distribution drift.",
      "Option D is incorrect because regex scrubbing alters or strips critical diagnostic context (such as raw stack trace lines) that the model needs for accurate severity classification."
    ],
    "rationale": "Hand-crafted synthetic few-shot examples present an idealized 'happy-path' representation that fails to train the model on real production noise (such as stack traces, unescaped characters, or truncations). Replacing synthetic prompt examples with actual production payloads conditions the LLM to handle real-world irregularities accurately.",
    "explanation": "Lựa chọn B là đáp án đúng vì các ví dụ few-shot tổng hợp (synthetic) được viết tay bởi kỹ sư thường quá sạch sẽ và lý tưởng, không phản ánh đúng phân phối nhiễu của môi trường sản xuất (thực tế chứa stack trace nhiều dòng, chuỗi bị cắt, ký tự lạ). Để mô hình phân loại chính xác trong thực tế, các ví dụ few-shot phải được trích xuất từ dữ liệu sản xuất thực (sau khi đã ẩn danh hóa).\n\nLựa chọn A sai vì việc bổ sung thêm các ví dụ tổng hợp lý tưởng chỉ làm tăng khoảng cách lệch phân phối giữa prompt và dữ liệu thực.\n\nLựa chọn C sai vì vòng lặp retry ở backend xử lý lỗi cú pháp đầu ra chứ không giải quyết được căn nguyên làm mô hình dự đoán sai phân loại do lệch đầu vào.\n\nLựa chọn D sai vì việc dùng regex xóa stack trace sẽ loại bỏ chính thông tin ngữ cảnh quan trọng mà mô hình cần để đánh giá mức độ nghiêm trọng (severity_level).",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]