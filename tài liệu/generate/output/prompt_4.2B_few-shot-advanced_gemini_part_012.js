[
  {
    "id": "d4-b08-B-023",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.2 few-shot-prompting / angle-23",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-B-023",
    "scenarioSignature": {
      "testedPrinciple": "interaction between prompt caching and dynamic few-shot retrieval",
      "failureMode": "excessive API billing cost spike and cache hit rate degradation",
      "rootCause": "runtime insertion of variable retrieved examples invalidates prefix prompt cache",
      "requiredFix": "isolate static prompt components into a cached prefix and pass dynamic elements separately"
    },
    "questionEN": "The microservice ClaimReviewService processes customer support claims using gemini-2.5-flash. Originally, a static set of 8 few-shot examples was included in the system prompt block wrapped with prompt caching metadata (ttl: 300s), achieving a 94% cache hit rate and predictable API billing. To improve edge-case coverage, the team implemented RAG-based dynamic few-shot retrieval that selects 5 highly relevant examples per incoming request and injects them into the system prompt block. Following this deployment, accuracy on edge cases improved slightly, but monthly API token costs spiked by 500% (a 5× increase) and the cache hit rate dropped to 0%. What is the technical cause of this cost spike, and how should the prompt architecture be restructured?",
    "question": "[d4-b08-B-023] Microservice ClaimReviewService xử lý các yêu cầu khiếu nại của khách hàng bằng gemini-2.5-flash. Ban đầu, một tập hợp cố định gồm 8 ví dụ few-shot được đưa vào khối system prompt đi kèm cấu hình prompt caching (ttl: 300s), đạt tỷ lệ cache hit 94% và chi phí API ổn định. Để cải thiện khả năng xử lý các trường hợp ngoại lệ (edge cases), nhóm phát triển đã triển khai truy xuất few-shot động dựa trên RAG nhằm chọn 5 ví dụ phù hợp nhất cho mỗi yêu cầu và chèn trực tiếp vào khối system prompt. Sau khi triển khai, độ chính xác trên edge cases tăng nhẹ nhưng chi phí token API hàng tháng tăng vọt 500% (gấp 5 lần) và tỷ lệ cache hit giảm về 0%. Nguyên nhân kỹ thuật của đợt tăng chi phí này là gì và kiến trúc prompt nên được tái cấu trúc như thế nào?",
    "optionsEN": [
      "A. The vector database retriever is returning malformed JSON schemas in the retrieved examples, causing the model to retry requests repeatedly and multiply input token consumption.",
      "B. The dynamic few-shot examples exceed the context window threshold for prompt caching, causing the API gateway to fall back to uncompressed embedding execution.",
      "C. Injecting variable dynamic examples into the system prompt changes the prefix content on every request, completely invalidating the cached prompt prefix; the fix is to keep a static core few-shot prompt cached in the system block while passing dynamic user inputs separately or using fixed static examples.",
      "D. Prompt caching requires exact match on output tokens rather than input tokens, so dynamic example retrieval alters the model's generation seeds and disables caching."
    ],
    "options": [
      "A. Retriever của cơ sở dữ liệu vector trả về các schema JSON bị lỗi trong các ví dụ được truy xuất, khiến mô hình phải thử lại (retry) nhiều lần và làm nhân bản số lượng token đầu vào.",
      "B. Các ví dụ few-shot động vượt quá ngưỡng cửa sổ ngữ cảnh quy định cho prompt caching, khiến API gateway phải chuyển sang cơ chế thực thi embedding không nén.",
      "C. Việc chèn các ví dụ động biến đổi vào system prompt làm thay đổi nội dung phần tiền tố (prefix) trong mỗi yêu cầu, làm mất hiệu lực hoàn toàn bộ nhớ đệm tiền tố (prompt cache prefix); giải pháp là giữ tập few-shot nòng cốt cố định trong khối system được cache và tách biệt phần dữ liệu động.",
      "D. Prompt caching yêu cầu khớp chính xác trên các token đầu ra thay vì token đầu vào, do đó việc truy xuất ví dụ động làm thay đổi seed sinh dữ liệu của mô hình và vô hiệu hóa cache."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because retries due to malformed schemas would produce explicit client-side retry logs and schema validation errors, rather than a clean 0% prompt cache hit rate across all successful single-pass API calls.",
      "Option B is incorrect because API gateways do not convert prompts to uncompressed embedding execution due to prompt length; cache failure occurs strictly because the prompt prefix differs across requests.",
      "Option C is correct because LLM prompt caching operates on exact prefix matching from the beginning of the prompt. Modifying the system prompt dynamically on every request breaks the prefix match, causing a 0% cache hit rate and billing full input tokens every call (a 5× cost increase). Restructuring the prompt to maintain a static cached prefix resolves the issue.",
      "Option D is incorrect because prompt caching mechanisms evaluate prefix similarity on input prompt tokens during prefill, not on generated output tokens or random seed parameters."
    ],
    "rationale": "Prompt caching algorithms evaluate input tokens from the start of the request (prefix matching). When dynamic few-shot retrieval alters the contents of the cached system prompt on every call, the prefix no longer matches previous requests, causing cache misses on 100% of calls and billing all input tokens at full price instead of cached rates.",
    "explanation": "Phân tích chi tiết các lựa chọn:\n- Option A sai vì các lỗi retry do schema không hợp lệ sẽ gây ra ngoại lệ (exception) hoặc log lỗi ở client, không phải là nguyên nhân khiến tỷ lệ hit cache của các request thành công giảm xuống 0%.\n- Option B sai vì prompt caching không tự động chuyển sang 'không nén embedding' khi số lượng ví dụ thay đổi; vi phạm cache xảy ra hoàn toàn do sự thay đổi của chuỗi token tiền tố.\n- Option C đúng vì cơ chế prompt caching hoạt động dựa trên sự trùng khớp tuyệt đối của chuỗi token tiền tố (prefix matching). Khi chèn các ví dụ dynamic vào system prompt, tiền tố này thay đổi theo từng request khiến hệ thống không thể tìm thấy cache, buộc mô hình phải xử lý lại toàn bộ context với chi phí token đầy đủ (tăng 5 lần). Giải pháp là duy trì một khối system prompt cố định chứa các ví dụ tĩnh để được cache, và chuyển các thông tin động sang phần user message hoặc cấu trúc riêng biệt.\n- Option D sai vì prompt caching so khớp các token đầu vào (input tokens) ở giai đoạn prefill, chứ không liên quan đến token đầu ra hay seed sinh ngẫu nhiên.",
    "sources": [
      {
        "label": "Lesson 4.2: Few-Shot Prompting",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-2-few-shot-prompting"
      }
    ]
  }
]