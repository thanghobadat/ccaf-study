[
  {
    "id": "d5-b10-5.1-007",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-007",
    "scenarioSignature": {
      "testedPrinciple": "context overflow token pre flight validation",
      "failureMode": "unhandled api error crash on oversize request",
      "rootCause": "input payload exceeds context window limit without client side token check",
      "requiredFix": "count tokens before request and dynamic input pruning"
    },
    "questionEN": "An automated document analysis worker, DocAnalyzerService, constructs prompts by stitching together raw PDF text extracts and user history before calling the anthropic.messages.create API. During a large batch job, a document payload generates prompt_tokens: 210000, exceeding the model's 200,000-token context limit. Because no input length validation exists, the API throws an unhandled 400 BadRequestError (invalid_request_error), causing the Kubernetes worker pod to crash repeatedly. How should the architecture be refactored to prevent this crash?",
    "question": "[d5-b10-5.1-007] Một tiến trình tự động phân tích tài liệu, DocAnalyzerService, xây dựng prompt bằng cách ghép nối văn bản trích xuất từ file PDF và lịch sử người dùng trước khi gọi API anthropic.messages.create. Trong một đợt xử lý hàng loạt lớn, một tài liệu tạo ra prompt_tokens: 210000, vượt quá giới hạn ngữ cảnh 200.000 token của mô hình. Do không có bước kiểm tra độ dài đầu vào, API trả về lỗi không được xử lý 400 BadRequestError (invalid_request_error), khiến worker pod trong Kubernetes bị crash liên tục. Kiến trúc cần được cải tổ như thế nào để ngăn chặn sự cố crash này?",
    "optionsEN": [
      "A. Wrap the API client call in an exponential backoff retry loop configured to capture HTTP 500 and 400 status codes.",
      "B. Increase the max_tokens request parameter to 250,000 to expand the allowed context processing capacity.",
      "C. Implement a pre-flight token check using /v1/messages/count_tokens to detect oversized payloads and dynamically prune older context turns before sending the request.",
      "D. Add a system prompt instruction directing the LLM to ignore input content beyond 200,000 tokens when generating its response."
    ],
    "options": [
      "A. Bọc lời gọi API client trong vòng lặp thử lại với độ trễ lũy thừa (exponential backoff) được cấu hình để bắt các mã trạng thái HTTP 500 và 400.",
      "B. Tăng tham số yêu cầu max_tokens lên 250.000 để mở rộng dung lượng xử lý ngữ cảnh được cho phép.",
      "C. Triển khai kiểm tra số lượng token trước (pre-flight check) bằng endpoint /v1/messages/count_tokens để phát hiện dữ liệu vượt ngưỡng và cắt tỉa động các lượt ngữ cảnh cũ trước khi gửi yêu cầu.",
      "D. Thêm hướng dẫn vào system prompt yêu cầu LLM bỏ qua nội dung đầu vào vượt quá 200.000 token khi tạo phản hồi."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Context overflow returns a client-side HTTP 400 invalid_request_error. Retrying the identical 210,000-token request will repeatedly fail and exhaust retry limits without fixing the payload size.",
      "Option B is incorrect: The max_tokens parameter specifies the maximum number of output tokens the model can generate, not the input context window limit.",
      "Option C is correct: Pre-flight token calculation via /v1/messages/count_tokens allows the application to proactively detect context overflow before invoking the completion endpoint, enabling dynamic pruning or summarization to stay within token limits.",
      "Option D is incorrect: System prompt instructions operate within the LLM during generation; they cannot intercept or bypass HTTP 400 API rejection errors triggered at the client/gateway transport layer."
    ],
    "rationale": "The root cause of the unhandled crash is sending a prompt that exceeds the context window limit (210,000 > 200,000 tokens), causing a client-side HTTP 400 error. The correct architectural fix is performing a pre-flight token check using /v1/messages/count_tokens before API invocation. If the counted tokens exceed the safe context threshold, the client proactively prunes or summarizes input tokens, preventing API errors and worker pod crashes.",
    "explanation": "Trong kịch bản này, hệ thống bị crash do gửi yêu cầu có prompt_tokens: 210000 vượt quá giới hạn context window 200.000 token của mô hình LLM, dẫn đến lỗi HTTP 400 BadRequestError (invalid_request_error).\n\n- Option A sai vì lỗi 400 do dữ liệu đầu vào vượt quá giới hạn sẽ không thể tự sửa nếu thử lại (retry) với cùng payload.\n- Option B sai vì max_tokens là tham số giới hạn số lượng token đầu ra (output tokens) mà mô hình sinh ra, không phải giới hạn bộ nhớ đầu vào (input context window).\n- Option C đúng vì kiểm tra trước bằng endpoint /v1/messages/count_tokens giúp ứng dụng phát hiện tải vượt ngưỡng trước khi gọi API chính, từ đó chủ động cắt tỉa (prune) hoặc tóm tắt dữ liệu đầu vào để bảo đảm an toàn.\n- Option D sai vì prompt hướng dẫn LLM chỉ có hiệu lực sau khi mô hình bắt đầu xử lý, không thể can thiệp vào tầng API gateway vốn đã từ chối yêu cầu ngay từ đầu.",
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  },
  {
    "id": "d5-b10-5.1-008",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.1 context-window-management / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.1-008",
    "questionEN": "A conversational code assistant, CodeRefactorBot, manages multi-turn user interactions using the anthropic.messages.create API. In turn 1, the user specifies a critical compliance requirement: \"All generated code must maintain strict backwards compatibility with Python 3.8\". By turn 22, after appending 80,000 tokens of raw terminal logs and tool execution outputs into the context history, the LLM outputs Python 3.10 match / case syntax, breaking downstream deployment pipelines. What architectural flaw allowed this constraint loss, and how should it be fixed?",
    "question": "[d5-b10-5.1-008] Một trợ lý lập trình dạng hội thoại, CodeRefactorBot, quản lý các tương tác nhiều lượt của người dùng bằng API anthropic.messages.create. Ở lượt 1, người dùng đưa ra một yêu cầu tuân thủ quan trọng: \"Mọi mã nguồn được tạo phải bảo đảm tương thích ngược nghiêm ngặt với Python 3.8\". Đến lượt 22, sau khi nối thêm 80.000 token nhật ký terminal thô và kết quả thực thi công cụ vào lịch sử ngữ cảnh, LLM sinh ra cú pháp match / case của Python 3.10, làm gãy pipeline triển khai phía sau. Khuyết điểm kiến trúc nào đã khiến ràng buộc này bị mất và nên khắc phục như thế nào?",
    "optionsEN": [
      "A. Append a system reminder to the user prompt in turn 22 instructing the model to review all past conversation messages.",
      "B. Set temperature: 0.0 in the messages.create API request to force deterministic recall of early conversational turns.",
      "C. Condense the entire conversation history into a single 100-word unstructured summary string every 5 turns.",
      "D. Maintain a structured key-facts block at the very beginning of the prompt context that explicitly preserves active constraints across turns."
    ],
    "options": [
      "A. Nối thêm một lời nhắc hệ thống vào prompt của người dùng ở lượt 22 yêu cầu mô hình xem lại tất cả các tin nhắn trong quá khứ.",
      "B. Đặt temperature: 0.0 trong yêu cầu API messages.create để bắt buộc mô hình tái hiện chính xác các lượt hội thoại ban đầu.",
      "C. Tóm tắt toàn bộ lịch sử hội thoại thành một chuỗi tóm tắt không cấu trúc 100 từ sau mỗi 5 lượt.",
      "D. Duy trì một khối thông tin cốt lõi (key-facts block) có cấu trúc ở ngay đầu ngữ cảnh prompt để bảo tồn rõ ràng các ràng buộc đang hoạt động qua các lượt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Appending a generic reminder at turn 22 does not recover explicit constraints if they have already been pushed out of the context budget or buried deep in context history without structural highlighting.",
      "Option B is incorrect: Setting temperature to 0.0 controls decoding randomness but cannot restore attention to constraints that are diluted or lost due to context growth.",
      "Option C is incorrect: Unstructured 100-word periodic summarization drops fine-grained technical rules such as explicit language version constraints unless they are systematically categorized.",
      "Option D is correct: Placing a persistent key-facts block at the start of the context ensures critical user constraints (e.g., Python 3.8 compatibility) remain visible in the high-attention zone at the beginning of the context window throughout multi-turn context expansion."
    ],
    "rationale": "As multi-turn conversations expand, early user constraints risk getting buried under large volumes of tool outputs and intermediate turns (constraint decay / lost-in-the-middle). Maintaining a persistent key-facts block anchored at the beginning of the context window ensures essential rules (such as Python 3.8 compatibility) survive multi-turn context growth and remain in the model's high-attention region.",
    "explanation": "Trong kịch bản này, hệ thống gặp hiện tượng suy giảm ràng buộc (constraint decay) khi lịch sử hội thoại nhiều lượt tích tụ lượng lớn dữ liệu thô (80.000 token log và kết quả tool), đẩy yêu cầu quan trọng ở lượt 1 (\"Python 3.8\") vào vùng bị lãng quên hoặc suy giảm chú ý.\\n\\n- Option A sai vì nhắc nhở chung chung ở lượt 22 không thể khôi phục hiệu quả các ràng buộc cụ thể đã bị pha loãng bởi lượng lớn ngữ cảnh chèn giữa.\\n- Option B sai vì temperature: 0.0 chỉ giảm tính ngẫu nhiên khi sinh câu trả lời, không giúp mô hình nhớ lại các thông tin đã bị vùi lấp trong ngữ cảnh lớn.\\n- Option C sai vì tóm tắt định kỳ không cấu trúc 100 từ sẽ làm thất lạc các chi tiết kỹ thuật tinh vi như phiên bản ngôn ngữ chính xác trừ khi chúng được lưu trữ trong một cấu trúc dành riêng.\\n- Option D đúng vì duy trì một khối key-facts block cố định ở đầu ngữ cảnh giúp các ràng buộc quan trọng nhất luôn nằm ở vùng có trọng số chú ý cao (beginning of context window) và không bị suy giảm theo thời gian.",
    "scenarioSignature": {
      "testedPrinciple": "persistent key facts block maintenance",
      "failureMode": "system directive decay in long multi turn conversation",
      "rootCause": "initial user constraints buried or truncated as message history grows",
      "requiredFix": "prepend structured key facts block at context start"
    },
    "sources": [
      {
        "label": "Lesson 5.1: Context Window Management",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-1-context-window-management"
      }
    ]
  }
]