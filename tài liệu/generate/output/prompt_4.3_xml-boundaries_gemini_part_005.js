[
  {
    "id": "d4-b08-4.3-009",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.3 xml-boundaries / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.3-009",
    "scenarioSignature": {
      "testedPrinciple": "delimiter scheme consistency across prompt tiers",
      "failureMode": "parsing ambiguity and instruction bleeding across mixed markup boundaries",
      "rootCause": "system prompt using XML delimiters while user payload uses markdown backticks without XML wrappers",
      "requiredFix": "standardize on unified XML tags by wrapping user payloads in matching XML delimiters"
    },
    "questionEN": "In the DocuParseEngine pipeline using gemini-2.5-flash, the system prompt establishes structural boundaries using XML tags (, , ), instructing the model to extract metadata only from content inside . However, the client application formats user-submitted inputs using Markdown code fences (markdown ... ) without wrapping them in XML tags. Production evaluation reveals a 27% parsing failure rate where the model mixes user text with system instructions or misinterprets embedded code blocks. What is the root cause and required fix for this parsing ambiguity?",
    "question": "[d4-b08-4.3-009] Trong đường ống DocuParseEngine sử dụng gemini-2.5-flash, system prompt thiết lập các ranh giới cấu trúc bằng thẻ XML (, , ), yêu cầu mô hình chỉ trích xuất dữ liệu từ nội dung bên trong . Tuy nhiên, ứng dụng client lại định dạng đầu vào do người dùng gửi bằng các khối Markdown code fence (markdown ... ) mà không bọc chúng trong thẻ XML . Đánh giá sản xuất ghi nhận tỷ lệ lỗi phân tách 27% khi mô hình lẫn lộn văn bản người dùng với chỉ dẫn hệ thống. Nguyên nhân gốc rễ và giải pháp khắc phục cho sự mơ hồ phân tách này là gì?",
    "optionsEN": [
      "A. Inconsistent delimiter scheme across prompt tiers; enforce a single XML delimiter standard by wrapping user inputs in tags to maintain boundary isolation.",
      "B. Insufficient model context length for code blocks; upgrade the API call from gemini-2.5-flash to gemini-2.5-pro to resolve triple backtick parsing.",
      "C. Markdown backtick syntax overwhelming the attention mechanism; replace all Markdown formatting in user inputs with base64 encoded strings.",
      "D. Lack of system prompt priority flags; add priority=high attributes to the XML system prompt tags to override user-level Markdown delimiters."
    ],
    "options": [
      "A. Không nhất quán về phương thức phân tách giữa các cấp prompt; bắt buộc áp dụng chuẩn phân tách XML đồng nhất bằng cách bọc đầu vào người dùng trong thẻ để duy trì phân tách ranh giới.",
      "B. Độ dài ngữ cảnh của mô hình không đủ cho các khối code; nâng cấp cuộc gọi API từ gemini-2.5-flash lên gemini-2.5-pro để xử lý phân tích gạch ngược triple backtick.",
      "C. Cú pháp gạch ngược Markdown làm quá tải cơ chế attention; thay thế toàn bộ định dạng Markdown trong đầu vào người dùng bằng chuỗi mã hóa base64.",
      "D. Thiếu cờ ưu tiên trong system prompt; thêm thuộc tính priority=high vào các thẻ XML trong system prompt để ghi đè lên phân tách Markdown ở cấp người dùng."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because mixing XML tags in the system prompt with Markdown triple backticks in the user input creates ambiguous structural boundaries. Enforcing a unified XML schema (e.g., wrapping user input in ...) ensures the model consistently distinguishes instructions from user content.",
      "Option B is incorrect because context length is not the issue; switching to gemini-2.5-pro does not fix structural parsing ambiguities caused by mixed delimiter schemes.",
      "Option C is incorrect because base64 encoding hides text from LLM semantic reasoning and is unnecessary; adhering to a consistent XML delimiter standard resolves the parsing ambiguity directly.",
      "Option D is incorrect because Gemini prompt parsers do not recognize arbitrary priority=high XML attributes to resolve delimiter schema mismatches between system and user prompt tiers."
    ],
    "rationale": "Mixing XML delimiters in system prompts with Markdown delimiters in user inputs causes parsing ambiguity because the model cannot reliably determine structural precedence. Enforcing a single XML scheme across all prompt tiers resolves boundary confusion.",
    "explanation": "Lựa chọn A đúng vì việc trộn lẫn các thẻ XML trong system prompt với các khối gạch ngược Markdown (triple backtick) trong user input tạo ra các ranh giới cấu trúc mơ hồ. Áp dụng chuẩn XML đồng nhất (bọc nội dung người dùng trong ...) giúp mô hình phân biệt chính xác chỉ dẫn hệ thống và dữ liệu người dùng.\n\nLựa chọn B sai vì độ dài ngữ cảnh không phải là nguyên nhân; việc đổi sang gemini-2.5-pro không khắc phục được sự bất đồng về lược đồ phân tách ranh giới.\n\nLựa chọn C sai vì mã hóa base64 sẽ làm ẩn văn bản khỏi khả năng đọc hiểu ngữ nghĩa của LLM và không cần thiết.\n\nLựa chọn D sai vì các bộ phân tách prompt không hỗ trợ các thuộc tính ưu tiên tùy chỉnh như priority=high để ghi đè ranh giới cấu trúc.",
    "sources": [
      {
        "label": "Lesson 4.3: XML Boundaries",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-3-xml-boundaries"
      }
    ]
  },
  {
    "id": "d4-b08-4.3-010",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.3 xml-boundaries / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.3-010",
    "questionEN": "In the CustomerSupportBot API using gemini-2.5-flash, the prompt template dynamically populates <user_query>{user_text}</user_query>. When a user submits an empty request string (\"\"), the rendered prompt contains empty tags <user_query></user_query>. In production, this causes the model to hallucinate synthesized user queries or process trailing system instructions as the missing query. What causes this behavior, and how should empty tag scenarios be handled?",
    "question": "[d4-b08-4.3-010] Trong API CustomerSupportBot sử dụng gemini-2.5-flash, mẫu prompt điền động giá trị <user_query>{user_text}</user_query>. Khi người dùng gửi một chuỗi yêu cầu rỗng (\"\"), prompt được tạo ra chứa các thẻ rỗng <user_query></user_query>. Trong môi trường sản xuất, điều này khiến mô hình suy đoán tự tạo ra câu hỏi người dùng giả định hoặc xử lý các chỉ dẫn hệ thống phía sau như nội dung câu hỏi bị thiếu. Điều gì gây ra hành vi này và các kịch bản thẻ rỗng nên được xử lý như thế nào?",
    "optionsEN": [
      "A. Empty XML tags trigger an immediate API schema validation exception in gemini-2.5-flash; handle this by wrapping the prompt in a try-catch block to suppress the 400 Bad Request response.",
      "B. Empty tags create an ambiguous structural gap that degrades model attention alignment; resolve this by programmatically inserting an explicit placeholder (e.g., None provided) or omitting empty XML blocks before LLM invocation.",
      "C. Empty tags cause model memory allocation leaks in the kv-cache; resolve this by replacing open/close tags with self-closing <user_query/> tags in the prompt payload.",
      "D. Empty XML tags automatically inherit prompt text from preceding API requests; resolve this by setting temperature=0.0 to wipe the request buffer."
    ],
    "options": [
      "A. Thẻ XML rỗng kích hoạt ngoại lệ xác thực schema API ngay lập tức trong gemini-2.5-flash; xử lý bằng cách bọc cuộc gọi prompt trong khối try-catch để bỏ qua phản hồi 400 Bad Request.",
      "B. Thẻ rỗng tạo ra khoảng trống cấu trúc mơ hồ làm suy giảm căn chỉnh attention của mô hình; giải quyết bằng cách chèn một giá trị giữ chỗ rõ ràng (ví dụ: None provided) hoặc loại bỏ các khối XML rỗng trước khi gọi LLM.",
      "C. Thẻ rỗng gây rò rỉ phân bổ bộ nhớ trong kv-cache; giải quyết bằng cách thay thế cặp thẻ đóng/mở bằng thẻ tự đóng <user_query/> trong payload prompt.",
      "D. Thẻ XML rỗng tự động kế thừa văn bản prompt từ các yêu cầu API trước đó; giải quyết bằng cách đặt temperature=0.0 để xóa bộ đệm yêu cầu."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because passing empty XML tags inside a prompt string does not violate API payload schemas or throw HTTP 400 errors.",
      "Option B is correct because empty XML tags present an ambiguous prompt structure where the model may hallucinate content to complete the empty space or misinterpret adjacent instructions. Providing an explicit fallback string or conditionally omitting the tag block ensures predictable execution.",
      "Option C is incorrect because empty XML tags do not trigger memory leaks in the KV-cache, and switching to self-closing syntax <user_query/> does not provide the model with explicit input status.",
      "Option D is incorrect because stateless API requests do not carry over context from previous calls into empty tags, and temperature tuning does not fix structural prompt ambiguity."
    ],
    "rationale": "Empty XML tags introduce boundary ambiguity, prompting LLMs to hallucinate missing text or misattribute surrounding context to fill the void. Programmatically supplying explicit placeholder content or conditionally dropping empty tag blocks ensures deterministic behavior.",
    "explanation": "Lựa chọn B đúng vì các thẻ XML rỗng tạo ra khoảng trống ranh giới không xác định, khiến LLM có xu hướng tự tạo ra văn bản còn thiếu hoặc nhầm lẫn chỉ dẫn hệ thống xung quanh là nội dung đầu vào. Xử lý bằng cách điền văn bản giữ chỗ rõ ràng hoặc bỏ qua toàn bộ khối thẻ rỗng trước khi gửi prompt giúp đảm bảo hành vi nhất quán.\\n\\nLựa chọn A sai vì việc truyền thẻ XML rỗng trong chuỗi prompt không vi phạm schema API hay trả về lỗi 400 Bad Request.\\n\\nLựa chọn C sai vì thẻ rỗng không gây rò rỉ bộ nhớ KV-cache và thẻ tự đóng <user_query/> vẫn không cung cấp giá trị nội dung rõ ràng cho mô hình.\\n\\nLựa chọn D sai vì các API phi trạng thái (stateless) không tự động kế thừa dữ liệu từ các request trước đó vào thẻ rỗng.",
    "scenarioSignature": {
      "testedPrinciple": "empty tag boundary handling in prompt templates",
      "failureMode": "hallucination and instruction misattribution due to empty delimiter tags",
      "rootCause": "dynamic prompt interpolation creating empty XML tags when input variables are empty strings",
      "requiredFix": "populate explicit placeholder values or conditionally omit empty XML tag blocks prior to prompt submission"
    },
    "sources": [
      {
        "label": "Lesson 4.3: XML Boundaries",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-3-xml-boundaries"
      }
    ]
  }
]