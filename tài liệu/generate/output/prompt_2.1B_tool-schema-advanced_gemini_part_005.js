[
  {
    "id": "d2-b04-B-009",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-009",
    "scenarioSignature": {
      "testedPrinciple": "data freshness and source authority in tool descriptions",
      "failureMode": "model selects cached pricing tool for real-time checkout transaction",
      "rootCause": "tool descriptions lack data latency and authoritative source specifications",
      "requiredFix": "document data freshness latency and real-time checkout applicability in tool descriptions"
    },
    "questionEN": "An e-commerce checkout agent integrates two pricing tools: get_price(sku: string) which returns cached catalog prices updated hourly, and get_quote(sku: string) which queries the live inventory engine for real-time checkout pricing including dynamic surcharges. Neither tool description specifies data latency or freshness constraints. During peak sales, when users attempt to complete checkout, the agent repeatedly calls get_price() instead of get_quote(), resulting in a $15.00 price discrepancy error at payment gateway execution. How should the tool schemas be modified to ensure the agent selects the authoritative real-time price?",
    "question": "[d2-b04-B-009] Một agent thanh toán thương mại điện tử tích hợp hai công cụ định giá: get_price(sku: string) trả về giá danh mục được bộ nhớ đệm (cache) cập nhật hàng giờ, và get_quote(sku: string) truy vấn công cụ kho hàng trực tiếp để lấy giá thanh toán thời gian thực bao gồm cả phụ phí động. Không có mô tả công cụ nào nêu rõ độ trễ dữ liệu hoặc ràng buộc độ tươi (data freshness). Trong các đợt bán hàng cao điểm, khi người dùng hoàn tất thanh toán, agent liên tục gọi get_price() thay vì get_quote(), dẫn đến lỗi lệch giá $15.00 khi thực thi cổng thanh toán. Cần sửa đổi schema công cụ như thế nào để đảm bảo agent chọn đúng nguồn giá thời gian thực có thẩm quyền?",
    "optionsEN": [
      "A. Update the get_quote tool description to explicitly state it returns real-time authoritative prices required for checkout, while updating get_price description to specify it returns cached catalog estimates for display only.",
      "B. Add a required boolean parameter force_refresh to get_price so the model can toggle between cached and live price sources within the same tool call.",
      "C. Change the return field name in get_quote from price to realtime_price so the model distinguishes output fields during context evaluation.",
      "D. Deprecate get_quote and modify get_price to automatically fallback to live pricing when the user query mentions the word checkout."
    ],
    "options": [
      "A. Cập nhật mô tả công cụ get_quote để nêu rõ nó trả về giá thời gian thực bắt buộc cho thanh toán, đồng thời cập nhật mô tả get_price để chỉ rõ nó trả về giá ước tính từ cache chỉ dùng cho hiển thị danh mục.",
      "B. Thêm tham số boolean bắt buộc force_refresh vào get_price để model có thể chuyển đổi giữa nguồn giá cache và thời gian thực trong cùng một cuộc gọi công cụ.",
      "C. Thay đổi tên trường trả về trong get_quote từ price thành realtime_price để model phân biệt các trường đầu ra trong quá trình đánh giá ngữ cảnh.",
      "D. Bỏ get_quote và sửa đổi get_price để tự động chuyển sang giá thời gian thực khi truy vấn của người dùng chứa từ checkout."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Explicitly documenting data freshness, source authority, and operational context (checkout vs. browsing) in tool descriptions provides the semantic clarity required for the LLM to select get_quote during checkout tasks.",
      "Option B: Adding a force_refresh parameter to get_price does not solve the root cause because the model still lacks description guidance on when real-time freshness is required versus cached data.",
      "Option C: Renaming the return field in get_quote does not guide the model's pre-execution tool selection process, as tool choice relies on tool descriptions rather than output field naming.",
      "Option D: Relying on keyword matching (checkout) in the backend implementation creates brittle behavior and fails to resolve tool selection ambiguity in the tool schema definitions exposed to the model."
    ],
    "rationale": "Tool descriptions must clearly define data freshness, latency, and operational applicability (such as transactional checkout vs. catalog display) so the LLM can differentiate between tools returning similar domain entities from different underlying data sources.",
    "explanation": "Đáp án đúng là A. Khi hai công cụ trả về dữ liệu giá tương tự nhưng khác nhau về nguồn dữ liệu (cache so với thời gian thực), việc mô tả rõ độ tươi của dữ liệu (data freshness), thẩm quyền nguồn và bối cảnh hoạt động (thanh toán giao dịch so với hiển thị danh mục) trong mô tả công cụ là yếu tố quyết định giúp LLM lựa chọn đúng công cụ get_quote cho tác vụ thanh toán.\n- Lựa chọn B sai vì việc thêm tham số force_refresh không giải quyết được nguyên nhân gốc rễ là LLM thiếu hướng dẫn trong mô tả để biết khi nào cần dữ liệu thời gian thực.\n- Lựa chọn C sai vì việc đổi tên trường trả về chỉ ảnh hưởng đến dữ liệu đầu ra sau khi thực thi, không giúp ích cho quá trình lựa chọn công cụ ban đầu của LLM.\n- Lựa chọn D sai vì việc dựa vào khớp từ khóa phía backend gây giòn gãy và không xử lý được sự mơ hồ trong định nghĩa schema của công cụ.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  },
  {
    "id": "d2-b04-B-010",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.1 tool-schema-design / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-B-010",
    "scenarioSignature": {
      "testedPrinciple": "tool chaining field name compatibility",
      "failureMode": "tool chain execution failure due to parameter name mismatch",
      "rootCause": "output field schema of upstream tool uses snake_case while downstream input parameter uses camelCase",
      "requiredFix": "align parameter naming conventions across tool output schemas and input parameters"
    },
    "questionEN": "An e-commerce catalog agent performs a multi-tool chain where search_products(query: string) returns a JSON array of objects containing product_id (snake_case). The subsequent tool get_product_details(productId: string) defines its required input parameter as productId (camelCase). When the agent attempts to fetch details for a retrieved product, it passes product_id into get_product_details(), causing the tool execution to fail with HTTP 400 Missing required parameter: productId. What schema design change ensures seamless tool chaining?",
    "question": "[d2-b04-B-010] Một agent danh mục thương mại điện tử thực hiện chuỗi nhiều công cụ (tool chain), trong đó search_products(query: string) trả về một mảng JSON chứa các đối tượng có trường product_id (dạng snake_case). Công cụ tiếp theo get_product_details(productId: string) định nghĩa tham số đầu vào bắt buộc là productId (dạng camelCase). Khi agent cố gắng lấy chi tiết cho sản phẩm đã tìm thấy, nó truyền product_id vào get_product_details(), làm cho việc thực thi công cụ thất bại với lỗi HTTP 400 Missing required parameter: productId. Thay đổi thiết kế schema nào đảm bảo chuỗi công cụ hoạt động mượt mà?",
    "optionsEN": [
      "A. Modify the search_products return schema description to instruct the model to perform client-side string transformation on output keys before tool invocation.",
      "B. Standardize parameter naming conventions across all tools in the chain so get_product_details accepts product_id matching the output schema of search_products.",
      "C. Add a fallback default string value in get_product_details schema so execution proceeds when productId is omitted.",
      "D. Update search_products to return an unformatted string array of product identifiers instead of structured JSON objects."
    ],
    "options": [
      "A. Sửa đổi mô tả schema trả về của search_products để hướng dẫn model thực hiện chuyển đổi chuỗi tên khóa trước khi gọi công cụ tiếp theo.",
      "B. Chuẩn hóa quy ước đặt tên tham số trên tất cả các công cụ trong chuỗi để get_product_details chấp nhận product_id khớp với schema đầu ra của search_products.",
      "C. Thêm một giá trị chuỗi mặc định dự phòng vào schema của get_product_details để việc thực thi vẫn tiếp tục khi thiếu productId.",
      "D. Cập nhật search_products để trả về một mảng chuỗi mã định danh sản phẩm không định dạng thay vì các đối tượng JSON có cấu trúc."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A: Expecting the LLM to perform runtime string transformation between tool calls adds unnecessary reasoning overhead and frequently leads to missing parameter errors during chaining.",
      "Option B (Correct): Standardizing field names (e.g. product_id) across upstream output schemas and downstream input parameters ensures compatible tool chaining, allowing the model to pass output fields directly into input parameters without key transformation errors.",
      "Option C: Adding a default value to productId masks missing required input data and causes get_product_details to return incorrect default product data rather than resolving the key mismatch.",
      "Option D: Returning raw string arrays removes structured metadata from search_products and reduces schema clarity without guaranteeing parameter alignment in downstream tools."
    ],
    "rationale": "Tool chaining requires compatible schemas where the output key names of upstream tools directly match the input parameter names expected by downstream tools, eliminating key mapping friction and parameter mismatch errors during multi-step tool execution.",
    "explanation": "Đáp án đúng là B. Khi thiết kế chuỗi công cụ (tool chain), các tên trường đầu ra của công cụ phía trước (upstream) phải khớp chính xác với tên tham số đầu vào của công cụ phía sau (downstream). Việc chuẩn hóa quy ước đặt tên (ví dụ: dùng thống nhất product_id) giúp LLM dễ dàng truyền kết quả từ công cụ này sang công cụ khác mà không gặp lỗi thiếu tham số do lệch tên khóa.\n- Lựa chọn A sai vì việc bắt LLM tự chuyển đổi kiểu đặt tên khóa giữa các bước gọi công cụ làm tăng tải suy luận và dễ gây ra lỗi thực thi.\n- Lựa chọn C sai vì giá trị mặc định chỉ che đậy lỗi thiếu tham số chứ không giải quyết được vấn đề truyền đúng ID sản phẩm cần truy vấn.\n- Lựa chọn D sai vì việc trả về mảng chuỗi đơn thuần làm mất đi dữ liệu cấu trúc hữu ích và không phải là giải pháp chuẩn hóa schema cho chuỗi công cụ.",
    "sources": [
      {
        "label": "Lesson 2.1: Tool Schema Design",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-1-tool-schema-design"
      }
    ]
  }
]