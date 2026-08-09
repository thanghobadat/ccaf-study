/* CCAF Learning Hub - 13 Complete Theory Chapters (English-First + Hidden Vietnamese Translation Accordions) */

const CHAPTERS_DATA = [
  {
    "id": 1,
    "title": "Chapter 1: Claude Messages API — Foundation, Request/Response Payload Struct & Context Window",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "estimatedMinutes": 30,
    "summary": "Master the structure of Claude Messages API request/response payloads, stateless nature, message roles, stop_reason fields, System Prompt design, and Context Window management.",
    "summaryVI": "Nắm vững cấu trúc Request/Response Payload của Claude Messages API, bản chất Stateless không lưu trạng thái, vai trò các message (user, assistant, tool), 4 giá trị stop_reason, thiết kế System Prompt và kỹ thuật quản lý Context Window.",
    "learningObjectives": [
      "Analyze all 8 primary request parameters: model, messages, system, max_tokens, temperature, stop_sequences, tools, tool_choice.",
      "Parse all 8 response fields: id, type, role, content, model, stop_reason, stop_sequence, usage.",
      "Understand why stop_reason functions as a client-side State Machine flag (end_turn, tool_use, max_tokens, stop_sequence).",
      "Design System Prompts with XML tag boundaries (<doc>...</doc>) while avoiding Over-Instruction traps.",
      "Calculate token consumption (~3-4 chars/token in EN) and mitigate Lost-in-the-Middle context degradation."
    ],
    "learningObjectivesVI": [
      "Phân tích chi tiết 8 tham số Request: model, messages, system, max_tokens, temperature, stop_sequences, tools, tool_choice.",
      "Phân tích 8 trường phản hồi Response: id, type, role, content, model, stop_reason, stop_sequence, usage.",
      "Hiểu tại sao stop_reason đóng vai trò cờ chuyển trạng thái phía Client (end_turn, tool_use, max_tokens, stop_sequence).",
      "Thiết kế System Prompt bọc ranh giới XML (<doc>...</doc>) và tránh bẫy Over-Instruction.",
      "Tính toán mức tiêu thụ Token (~3-4 char/token EN) và khắc phục suy giảm Attention (Lost-in-the-Middle)."
    ],
    "examTip": "⚡ CCAF Exam Tip: Claude API is Stateless. Always place critical directives at the very TOP or BOTTOM of long context payloads to prevent Lost-in-the-Middle degradation, and inspect stop_reason to drive client state transitions.",
    "examTipVI": "Mẹo thi CCAF: Claude API là Stateless. Luôn đặt các chỉ thị quan trọng ở ngay ĐẦU hoặc ĐUÔI payload context dài để tránh hiệu ứng Lost-in-the-Middle, và kiểm tra stop_reason để điều khiển luồng ứng dụng Backend.",
    "sections": [
      {
        "heading": "1.1 API Request Struct & Complete Parameter Specification",
        "content": "<div class=\"callout callout-title\" style=\"background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Visual Analogy:</strong> Think of Claude Messages API as a doctor who sees you for a brand new appointment every single time. The doctor has zero memory of past visits. Every time you consult, you must bring your entire medical history booklet (the <code>messages</code> array).</div><p>The Messages API at <code>/v1/messages</code> accepts a structured JSON payload. Below is the complete field specification:</p><div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Field Name</th><th>Type & Required</th><th>Description & Technical Role</th></tr></thead><tbody><tr><td><code>model</code></td><td>String (Required)</td><td>Model identifier (e.g. <code>claude-3-5-sonnet-20241022</code>). Dictates intelligence tier, context limit (200k), and pricing.</td></tr><tr><td><code>messages</code></td><td>Array (Required)</td><td>Conversation history <code>[{\"role\": \"user\"|\"assistant\", \"content\": ...}]</code>. Must be resent entirely on every call due to Stateless architecture.</td></tr><tr><td><code>system</code></td><td>String/Array (Optional)</td><td>System prompt establishing model persona, safety guidelines, XML boundaries, and conditional tool directives. Resides outside <code>messages</code>.</td></tr><tr><td><code>max_tokens</code></td><td>Integer (Required)</td><td>Mandatory ceiling for maximum tokens generated in output turn. Prevents infinite output loops and controls response cost.</td></tr><tr><td><code>temperature</code></td><td>Float 0.0-1.0 (Optional)</td><td>Controls output randomness. <code>0.0</code> = deterministic (code/extraction); <code>0.7-1.0</code> = creative writing. Default is 1.0.</td></tr><tr><td><code>stop_sequences</code></td><td>Array of Strings (Optional)</td><td>Custom strings that immediately halt generation when emitted by the model.</td></tr><tr><td><code>tools</code></td><td>Array of Objects (Optional)</td><td>Client tool definitions <code>[{\"name\": ..., \"description\": ..., \"input_schema\": ...}]</code> available for invocation.</td></tr><tr><td><code>tool_choice</code></td><td>Object (Optional)</td><td>Forces tool selection behavior (<code>{\"type\": \"auto\" | \"any\" | \"tool\", \"name\": ...}</code>).</td></tr></tbody></table></div>",
        "codeExample": "{\n  \"model\": \"claude-3-5-sonnet-20241022\",\n  \"max_tokens\": 1024,\n  \"temperature\": 0.0,\n  \"system\": \"You are a cloud architect. Return output strictly in JSON.\",\n  \"messages\": [\n    {\"role\": \"user\", \"content\": \"Analyze system latency.\"}\n  ]\n}",
        "contentVI": "<div class=\"callout callout-title\" style=\"background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Hình ảnh Ẩn dụ Trực quan:</strong> Hãy tưởng tượng Claude Messages API như một bác sĩ khám bệnh hoàn toàn mới cho bạn trong mỗi lần hẹn. Bác sĩ hoàn toàn không lưu giữ ký ức nào về các lần khám trước. Mỗi khi đến khám, bạn bắt buộc phải mang theo toàn bộ sổ hồ sơ bệnh án từ trước đến nay (mảng <code>messages</code>).</div><p>Messages API tại endpoint <code>/v1/messages</code> tiếp nhận một payload JSON có cấu trúc. Dưới đây là bảng thông số chi tiết của từng trường trong Request:</p><div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Tên trường (Field Name)</th><th>Kiểu dữ liệu & Yêu cầu</th><th>Mô tả & Bản chất kỹ thuật Backend</th></tr></thead><tbody><tr><td><code>model</code></td><td>String (Bắt buộc)</td><td>Định danh mô hình (vd: <code>claude-3-5-sonnet-20241022</code>). Quyết định cấp độ trí tuệ, giới hạn context (200k token) và chi phí.</td></tr><tr><td><code>messages</code></td><td>Mảng Array (Bắt buộc)</td><td>Lịch sử hội thoại <code>[{\"role\": \"user\"|\"assistant\", \"content\": ...}]</code>. Phải gửi lại toàn bộ trong mọi lần gọi do kiến trúc Stateless.</td></tr><tr><td><code>system</code></td><td>String/Array (Tùy chọn)</td><td>System prompt thiết lập tính cách mô hình, quy tắc an toàn, ranh giới thẻ XML và chỉ thị điều kiện cho Tool. Nằm ngoài mảng <code>messages</code>.</td></tr><tr><td><code>max_tokens</code></td><td>Số nguyên Integer (Bắt buộc)</td><td>Trần giới hạn số token tối đa phát ra trong lượt trả lời. Tránh vòng lặp phát trùng lặp vô tận và kiểm soát chi phí.</td></tr><tr><td><code>temperature</code></td><td>Số thực Float 0.0-1.0 (Tùy chọn)</td><td>Kiểm soát tính ngẫu nhiên đầu ra. <code>0.0</code> = nhất quán tuyệt đối (code/bốc tách dữ liệu); <code>0.7-1.0</code> = sáng tạo nội dung. Mặc định là 1.0.</td></tr><tr><td><code>stop_sequences</code></td><td>Mảng Chuỗi (Tùy chọn)</td><td>Các chuỗi ngắt ký tự tùy chỉnh khiến mô hình dừng sinh văn bản ngay lập tức khi phát hiện.</td></tr><tr><td><code>tools</code></td><td>Mảng Đối tượng (Tùy chọn)</td><td>Khai báo các công cụ Client <code>[{\"name\": ..., \"description\": ..., \"input_schema\": ...}]</code> sẵn sàng cho mô hình kích hoạt.</td></tr><tr><td><code>tool_choice</code></td><td>Đối tượng Object (Tùy chọn)</td><td>Ép buộc hành vi chọn công cụ (<code>{\"type\": \"auto\" | \"any\" | \"tool\", \"name\": ...}</code>).</td></tr></tbody></table></div>"
      },
      {
        "heading": "1.2 API Response Struct & The stop_reason State Machine",
        "content": "<p>The response payload from <code>/v1/messages</code> contains metadata and content generated by Claude. Crucially, the <code>stop_reason</code> field acts as a <strong>State Machine Control Flag</strong> driving client application execution:</p><div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>stop_reason Value</th><th>Meaning & Trigger</th><th>Client Backend State Transition Required</th></tr></thead><tbody><tr><td><code>\"end_turn\"</code></td><td>Claude completed generation naturally.</td><td>Render final answer to user. Turn completed.</td></tr><tr><td><code>\"tool_use\"</code></td><td>Claude generated a tool invocation call block.</td><td>Pause response rendering, parse tool call ID/args, execute code at Client Backend, wrap result in <code>tool_result</code>, and invoke API again.</td></tr><tr><td><code>\"max_tokens\"</code></td><td>Generation hit maximum token limit mid-sentence.</td><td>Response is truncated! Prompt continuation or resend with higher <code>max_tokens</code>.</td></tr><tr><td><code>\"stop_sequence\"</code></td><td>Claude encountered a custom stop sequence.</td><td>Intercept custom stop delimiter and execute custom domain parser.</td></tr></tbody></table></div><p>The response also includes <code>usage</code> tracking <code>input_tokens</code>, <code>output_tokens</code>, and Prompt Caching metrics (<code>cache_read_input_tokens</code>, <code>cache_creation_input_tokens</code>).</p>",
        "codeExample": "// API Response Payload\n{\n  \"id\": \"msg_01A8...\",\n  \"type\": \"message\",\n  \"role\": \"assistant\",\n  \"model\": \"claude-3-5-sonnet-20241022\",\n  \"stop_reason\": \"tool_use\",\n  \"stop_sequence\": null,\n  \"usage\": {\n    \"input_tokens\": 450,\n    \"output_tokens\": 85\n  },\n  \"content\": [\n    {\n      \"type\": \"tool_use\",\n      \"id\": \"toolu_01X...\",\n      \"name\": \"get_user\",\n      \"input\": {\"user_id\": \"usr_99\"}\n    }\n  ]\n}",
        "contentVI": "<p>Payload phản hồi từ <code>/v1/messages</code> chứa các metadata và nội dung do Claude sinh ra. Quan trọng nhất, trường <code>stop_reason</code> đóng vai trò là một <strong>Cờ điều khiển Máy trạng thái (State Machine Control Flag)</strong> thúc đẩy luồng thực thi của ứng dụng Backend ở Client:</p><div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Giá trị stop_reason</th><th>Ý nghĩa & Điều kiện kích hoạt</th><th>Chuyển đổi trạng thái yêu cầu tại Backend Client</th></tr></thead><tbody><tr><td><code>\"end_turn\"</code></td><td>Claude đã hoàn tất câu trả lời một cách tự nhiên.</td><td>Hiển thị câu trả lời cuối cùng cho người dùng. Kết thúc lượt hội thoại.</td></tr><tr><td><code>\"tool_use\"</code></td><td>Claude phát sinh một khối lệnh yêu cầu gọi Tool.</td><td>Tạm dừng hiển thị câu trả lời, đọc ID/tham số của Tool, thực thi hàm tại Backend Client, bọc kết quả trong khối <code>tool_result</code> và gọi lại API.</td></tr><tr><td><code>\"max_tokens\"</code></td><td>Quá trình sinh bị chạm trần giới hạn token giữa chừng.</td><td>Câu trả lời bị ngắt dở! Cần gửi tin nhắn yêu cầu tiếp tục hoặc gọi lại với <code>max_tokens</code> cao hơn.</td></tr><tr><td><code>\"stop_sequence\"</code></td><td>Claude bắt gặp một chuỗi ngắt ký tự tùy chỉnh.</td><td>Bắt chuỗi ngắt tùy chỉnh và chuyển tiếp cho bộ phân tích dữ liệu chuyên biệt.</td></tr></tbody></table></div><p>Phản hồi cũng bao gồm đối tượng <code>usage</code> theo dõi <code>input_tokens</code>, <code>output_tokens</code> và các chỉ số Prompt Caching (<code>cache_read_input_tokens</code>, <code>cache_creation_input_tokens</code>).</p>"
      },
      {
        "heading": "1.3 System Prompt Role & Over-Instruction Traps",
        "content": "<p>The <code>system</code> parameter defines overarching operational constraints. To protect system prompts from user prompt injection, encapsulate untrusted data in XML tags (e.g. <code>&lt;user_query&gt;...&lt;/user_query&gt;</code>).</p><div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 BAD PATTERN (Over-Instruction)</div><pre><code>\"system\": \"Always verify customer ID before answering any query.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Result: Triggers unnecessary get_customer tool calls even when user asks generic store hours!</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 GOOD PATTERN (Conditional Directive)</div><pre><code>\"system\": \"When account-specific details are requested, verify customer ID first.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Result: Tool is invoked only when relevant to account queries.</div></div></div>",
        "contentVI": "<p>Tham số <code>system</code> định nghĩa các ràng buộc vận hành cấp cao nhất. Để bảo vệ system prompt khỏi các cuộc tấn công Prompt Injection từ dữ liệu người dùng, hãy bọc dữ liệu không tin cậy trong các thẻ XML (ví dụ: <code>&lt;user_query&gt;...&lt;/user_query&gt;</code>).</p><div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 SAI LẦM (Over-Instruction - Chỉ thị quá đà)</div><pre><code>\"system\": \"Luôn luôn xác thực ID khách hàng trước khi trả lời bất kỳ câu hỏi nào.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Hậu quả: Kích hoạt tool get_customer vô cớ ngay cả khi người dùng chỉ hỏi giờ mở cửa cửa hàng!</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 CHUẨN KỸ THUẬT (Conditional Directive - Chỉ thị có điều kiện)</div><pre><code>\"system\": \"Khi người dùng yêu cầu thông tin cá nhân tài khoản, hãy xác thực ID khách hàng trước.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Kết quả: Tool chỉ được gọi khi thực sự liên quan đến truy vấn tài khoản.</div></div></div>"
      },
      {
        "heading": "1.4 Context Window Token Mechanics & Lost-in-the-Middle",
        "content": "<p>Claude 3.5/3.7 Sonnet supports a <strong>200,000 token Context Window</strong>. Token consumption is calculated as:</p><ul><li><strong>English Text:</strong> ~3.5 to 4 characters per token.</li><li><strong>Code & Vietnamese Text:</strong> ~1 to 2.5 characters per token.</li></ul><p><strong>Lost-in-the-Middle Effect:</strong> Attention weights in Transformer architectures decay when processing information located in the middle 60% of long contexts (100k+ tokens). Key instructions, schemas, or constraints must be placed at the very <strong>START</strong> (System Prompt) or <strong>END</strong> (latest User Turn) of the prompt payload.</p>",
        "contentVI": "<p>Claude 3.5/3.7 Sonnet hỗ trợ **Context Window lên tới 200,000 tokens**. Mức tiêu thụ token được tính toán như sau:</p><ul><li><strong>Văn bản Tiếng Anh:</strong> Khoảng ~3.5 đến 4 ký tự cho mỗi token.</li><li><strong>Mã nguồn Code & Tiếng Việt:</strong> Khoảng ~1 đến 2.5 ký tự cho mỗi token.</li></ul><p><strong>Hiệu ứng Lost-in-the-Middle (Bỏ quên thông tin ở giữa):</strong> Trọng số chú ý (Attention weights) trong kiến trúc Transformer bị suy giảm khi xử lý thông tin nằm ở khoảng 60% giữa của các đoạn context dài (100k+ tokens). Các chỉ thị, schema hoặc ràng buộc quan trọng bắt buộc phải được đặt ở ngay <strong>ĐẦU</strong> (System Prompt) hoặc <strong>ĐUÔI</strong> (Lượt tin nhắn User mới nhất) của payload prompt.</p>"
      },
      {
        "heading": "1.5 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 1</div><div class=\"kc-question\">Question: An application receives an API response with stop_reason = \"max_tokens\". What problem has occurred and what is the proper fix?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>- <strong>Problem:</strong> Claude's response was truncated mid-sentence because it hit the designated max_tokens limit.<br>- <strong>Fix:</strong> Increase the <code>max_tokens</code> parameter in the request or send a follow-up user turn asking Claude to continue from the last generated sentence.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 1</div><div class=\"kc-question\">Câu hỏi: Một ứng dụng nhận phản hồi API với stop_reason = \"max_tokens\". Vấn đề gì đã xảy ra và giải pháp xử lý chuẩn là gì?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>- <strong>Vấn đề:</strong> Phản hồi của Claude bị ngắt câu giữa chừng vì chạm giới hạn max_tokens đã khai báo.<br>- <strong>Khắc phục:</strong> Tăng tham số <code>max_tokens</code> trong Request hoặc gửi tin nhắn lượt kế tiếp yêu cầu Claude viết tiếp từ câu bị dở dang.</div></div>"
      }
    ],
    "coreMasteries": [
      "Stateless API: No session state is retained between API calls; client must maintain conversation state.",
      "Message Roles: user (input), assistant (model output), tool (tool execution output wrapped in tool_result).",
      "stop_reason = 'end_turn': Model has finished generating response.",
      "stop_reason = 'tool_use': Model demands tool execution at client before proceeding.",
      "stop_reason = 'max_tokens': Output truncated due to token limit.",
      "Lost-in-the-Middle: Information in middle of long prompts is easily overlooked; place critical items at top or bottom."
    ],
    "coreMasteriesVI": [
      "API Stateless: Không có session lưu giữa các lần gọi; client phải tự giữ lịch sử hội thoại.",
      "Message Roles: user (đầu vào), assistant (đầu ra mô hình), tool (kết quả tool gửi lại qua tool_result).",
      "stop_reason = end_turn: Mô hình hoàn thành xong câu trả lời.",
      "stop_reason = tool_use: Mô hình yêu cầu phía Client chạy tool trước khi tiếp tục.",
      "stop_reason = max_tokens: Phản hồi bị ngắt do chạm giới hạn token.",
      "Lost-in-the-Middle: Thông tin ở giữa tài liệu dài dễ bị bỏ qua; luôn đưa thông tin quan trọng lên ĐẦU hoặc ĐUÔI."
    ],
    "examTraps": [
      "⚠️ TRAP 1: Assuming Claude automatically retains memory across API calls without resending past messages.",
      "⚠️ TRAP 2: Using absolute System Directives like 'Always verify customer ID' which forces premature get_customer calls.",
      "⚠️ TRAP 3: Confusing 'end_turn' with 'max_tokens' when inspecting truncated responses."
    ],
    "examTrapsVI": [
      "⚠️ BẪY 1: Lầm tưởng Claude tự lưu trí nhớ qua các lần gọi API mà không cần gửi lại tin nhắn cũ.",
      "⚠️ BẪY 2: Dùng chỉ thị tuyệt đối trong System Prompt như 'Luôn luôn kiểm tra ID khách hàng' khiến Claude gọi tool get_customer vô cớ.",
      "⚠️ BẪY 3: Nhầm lẫn giữa end_turn và max_tokens khi phân tích câu trả lời bị ngắt."
    ]
  },
  {
    "id": 2,
    "title": "Chapter 2: Tools and tool_use — External Execution Loop",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "estimatedMinutes": 25,
    "summary": "Understand the 4-step Tool Use Execution Loop, Granular vs Monolithic Tool design patterns, tool_choice modes, and graceful error handling with is_error: true.",
    "summaryVI": "Hiểu rõ Vòng lặp Tool Use 4 bước, mẫu thiết kế Granular Tools vs Monolithic Tools, các chế độ tool_choice (auto, any, tool), và kỹ thuật xử lý lỗi mượt mà với is_error: true.",
    "learningObjectives": [
      "Master the 4 steps of the Tool Use Execution Loop.",
      "Design granular single-purpose tools instead of bloated monolithic tools.",
      "Differentiate tool_choice modes: auto, any, and tool.",
      "Return tool_result with is_error: true to prevent agent crashes."
    ],
    "learningObjectivesVI": [
      "Nắm vững 4 bước của Vòng lặp thực thi Tool Use.",
      "Thiết kế các công cụ đơn nhiệm Granular Tools thay vì Monolithic Tools cồng kềnh.",
      "Phân biệt các chế độ tool_choice: auto, any, và tool.",
      "Trả về tool_result chứa is_error: true để ngăn Agent bị crash."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always decompose complex multi-action tools into dedicated Granular Tools for maximum execution reliability.",
    "examTipVI": "Mẹo thi CCAF: Luôn chia nhỏ các công cụ phức tạp thành các Granular Tools đơn nhiệm để đạt độ tin cậy tối đa khi mô hình chọn tool.",
    "sections": [
      {
        "heading": "2.1 The 4-Step Tool Use Execution Loop",
        "content": "<div class=\"callout callout-title\" style=\"background: rgba(14, 165, 233, 0.08); border-left: 4px solid var(--accent-blue); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Visual Analogy:</strong> Claude is like a specialist doctor issuing a lab order. The doctor does not perform the blood test themselves. They output a lab order (<code>stop_reason: tool_use</code>). The lab technician (your client application) performs the test and feeds the lab results back (<code>tool_result</code>).</div><div class=\"diagram-flow\"><div class=\"flow-step\"><div class=\"flow-number\">1</div><div class=\"flow-content\"><div class=\"flow-title\">1. Tool Definition</div><div class=\"flow-desc\">Client passes array of available tools with name, description, and JSON schema.</div></div></div><div class=\"flow-step\"><div class=\"flow-number\">2</div><div class=\"flow-content\"><div class=\"flow-title\">2. Model Decision (stop_reason: \"tool_use\")</div><div class=\"flow-desc\">Claude outputs tool_use content block with call ID and JSON parameters.</div></div></div><div class=\"flow-step\"><div class=\"flow-number\">3</div><div class=\"flow-content\"><div class=\"flow-title\">3. Backend Execution</div><div class=\"flow-desc\">Client application catches call ID, executes local code/API, and gets raw response.</div></div></div><div class=\"flow-step\"><div class=\"flow-number\">4</div><div class=\"flow-content\"><div class=\"flow-title\">4. tool_result Feedback</div><div class=\"flow-desc\">Client appends tool_result content block to messages array and calls API again.</div></div></div></div>",
        "contentVI": "<div class=\"callout callout-title\" style=\"background: rgba(14, 165, 233, 0.08); border-left: 4px solid var(--accent-blue); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Hình ảnh Ẩn dụ Trực quan:</strong> Claude giống như một bác sĩ chuyên khoa phát lệnh xét nghiệm. Bác sĩ không tự mình lấy máu thử nghiệm. Họ xuất một chỉ định (<code>stop_reason: tool_use</code>). Kỹ thuật viên phòng lab (ứng dụng Client của bạn) tiến hành xét nghiệm và gửi lại kết quả (<code>tool_result</code>).</div><div class=\"diagram-flow\"><div class=\"flow-step\"><div class=\"flow-number\">1</div><div class=\"flow-content\"><div class=\"flow-title\">1. Định nghĩa Công cụ (Tool Definition)</div><div class=\"flow-desc\">Client truyền mảng danh sách công cụ sẵn có kèm tên, mô tả và JSON schema.</div></div></div><div class=\"flow-step\"><div class=\"flow-number\">2</div><div class=\"flow-content\"><div class=\"flow-title\">2. Quyết định của Mô hình (stop_reason: \"tool_use\")</div><div class=\"flow-desc\">Claude trả về khối nội dung tool_use chứa ID cuộc gọi và các tham số JSON.</div></div></div><div class=\"flow-step\"><div class=\"flow-number\">3</div><div class=\"flow-content\"><div class=\"flow-title\">3. Thực thi tại Backend Client</div><div class=\"flow-desc\">Ứng dụng Client bắt ID cuộc gọi, chạy đoạn mã địa phương/API và lấy kết quả thô.</div></div></div><div class=\"flow-step\"><div class=\"flow-number\">4</div><div class=\"flow-content\"><div class=\"flow-title\">4. Phản hồi tool_result</div><div class=\"flow-desc\">Client nối thêm khối nội dung tool_result vào mảng messages và gọi lại API.</div></div></div></div>"
      },
      {
        "heading": "2.2 Granular Tools vs Monolithic Tools",
        "content": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 MONOLITHIC TOOL (Bad Pattern)</div><p style=\"font-size: 0.85rem;\">Single tool with 12 parameters trying to handle create, update, delete, search:</p><pre><code>{\"name\": \"manage_users\", \"input_schema\": {...12_fields...}}</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ High risk of parameter confusion and validation failure.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 GRANULAR TOOLS (Good Pattern)</div><p style=\"font-size: 0.85rem;\">Dedicated single-purpose tools with tight schemas:</p><pre><code>{\"name\": \"get_user\"}, {\"name\": \"update_user_email\"}</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Highly reliable tool selection and execution.</div></div></div>",
        "contentVI": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 MONOLITHIC TOOL (Công cụ cồng kềnh - Anti-Pattern)</div><p style=\"font-size: 0.85rem;\">Một công cụ đơn lẻ chứa tới 12 tham số cố gắng gộp chung cả tạo, sửa, xóa, tìm kiếm:</p><pre><code>{\"name\": \"manage_users\", \"input_schema\": {...12_truong...}}</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Nguy cơ cao gây nhầm lẫn tham số và thất bại khi validate dữ liệu.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 GRANULAR TOOLS (Công cụ đơn nhiệm - Mẫu chuẩn)</div><p style=\"font-size: 0.85rem;\">Các công cụ chuyên biệt đơn nhiệm với schema chặt chẽ:</p><pre><code>{\"name\": \"get_user\"}, {\"name\": \"update_user_email\"}</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Mô hình nhận diện và kích hoạt chính xác 100%.</div></div></div>"
      },
      {
        "heading": "2.3 tool_choice Modes & Graceful Error Handling",
        "content": "<p>The <code>tool_choice</code> parameter controls tool invocation enforcement:</p><ul><li><code>\"auto\"</code>: Default mode. Claude decides whether to call a tool or reply with text.</li><li><code>\"any\"</code>: Forces Claude to execute at least one tool turn.</li><li><code>\"tool\"</code>: Forces Claude to execute a specific named tool (e.g. <code>{\"type\": \"tool\", \"name\": \"get_user\"}</code>).</li></ul><p><strong>Graceful Failure:</strong> When external tools encounter network errors or 500 exceptions, return a <code>tool_result</code> with <code>\"is_error\": true</code> rather than throwing an uncaught backend exception!</p>",
        "codeExample": "// Returning Graceful Error in tool_result\n{\n  \"role\": \"user\",\n  \"content\": [\n    {\n      \"type\": \"tool_result\",\n      \"tool_use_id\": \"toolu_01X...\",\n      \"is_error\": true,\n      \"content\": \"Database Connection Timeout (Error 500)\"\n    }\n  ]\n}",
        "contentVI": "<p>Tham số <code>tool_choice</code> kiểm soát quy định bắt buộc khi gọi công cụ:</p><ul><li><code>\"auto\"</code>: Chế độ mặc định. Claude tự quyết định nên gọi tool hay trả lời bằng văn bản.</li><li><code>\"any\"</code>: Ép buộc Claude phải phát sinh ít nhất một lượt gọi tool.</li><li><code>\"tool\"</code>: Ép buộc Claude phải gọi chính xác một tool chỉ định sẵn (vd: <code>{\"type\": \"tool\", \"name\": \"get_user\"}</code>).</li></ul><p><strong>Xử lý lỗi mượt mà (Graceful Failure):</strong> Khi các tool bên ngoài gặp lỗi kết nối mạng hoặc ngoại lệ 500, hãy trả về khối <code>tool_result</code> chứa <code>\"is_error\": true</code> thay vì văng Exception chưa được bắt làm ngắt ứng dụng Backend!</p>"
      },
      {
        "heading": "2.4 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 2</div><div class=\"kc-question\">Question: An external weather API tool experiences a 500 Network Error. How should the client app respond to Claude?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Return a <code>tool_result</code> content block containing <code>\"is_error\": true</code> and the raw error text. Do not throw uncaught exceptions or return empty strings!</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 2</div><div class=\"kc-question\">Câu hỏi: Một tool API thời tiết bên ngoài gặp lỗi mạng 500. Ứng dụng Client nên phản hồi như thế nào với Claude?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Trả về khối nội dung <code>tool_result</code> chứa <code>\"is_error\": true</code> kèm văn bản thông báo lỗi thô. Tuyệt đối không ném văng Exception chưa xử lý hoặc trả về chuỗi rỗng!</div></div>"
      }
    ],
    "coreMasteries": [
      "Tool Execution Loop: Tools Definition -> stop_reason: tool_use -> Client Execution -> tool_result Feedback.",
      "Granular Tools: Single-purpose focused tools dramatically outperform monolithic multi-argument tools.",
      "tool_choice = 'auto': Default mode where model decides whether to invoke tools.",
      "tool_choice = 'any': Forces model to execute at least one tool.",
      "tool_choice = 'tool': Forces model to execute one specific designated tool.",
      "Graceful Errors: Return is_error: true in tool_result content block instead of throwing unhandled exceptions."
    ],
    "coreMasteriesVI": [
      "Tool Execution Loop: Khai báo Tools -> stop_reason: tool_use -> Backend thực thi -> Phản hồi tool_result.",
      "Granular Tools: Các tool đơn nhiệm vượt trội hơn hẳn so với tool cồng kềnh đa tham số.",
      "tool_choice = auto: Chế độ mặc định để Claude tự quyết định có dùng tool hay không.",
      "tool_choice = any: Ép mô hình bắt buộc phải chọn ít nhất một tool.",
      "tool_choice = tool: Ép mô hình chọn đúng một tool chỉ định sẵn.",
      "Xử lý lỗi mượt: Trả về is_error: true trong tool_result thay vì ném Exception."
    ],
    "examTraps": [
      "⚠️ TRAP 1: Believing Claude executes tool code internally. Client backend must execute code and return tool_result.",
      "⚠️ TRAP 2: Writing ambiguous tool descriptions leading to incorrect tool selection or bash fallback."
    ],
    "examTrapsVI": [
      "⚠️ BẪY 1: Tin rằng Claude tự chạy code tool bên trong server của Anthropic. Client backend của bạn mới là nơi thực thi code.",
      "⚠️ BẪY 2: Viết mô tả tool mơ hồ dẫn đến việc chọn sai tool hoặc quay sang chạy lệnh bash thô."
    ]
  },
  {
    "id": 3,
    "title": "Chapter 3: Claude Agent SDK — Building Agentic Systems",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "estimatedMinutes": 30,
    "summary": "Orchestrator-Worker pattern, Hub-and-Spoke topology, Context Isolation, Agentic Loop 4 steps, AgentDefinition SDK, Task Tool patterns, and Hooks system (PreToolUse/PostToolUse).",
    "summaryVI": "Kiến trúc Orchestrator-Worker, topology Hub-and-Spoke, Context Isolation cô lập ngữ cảnh, Vòng lặp Agentic 4 bước, SDK AgentDefinition, mẫu Task Tool và hệ thống Hooks (PreToolUse/PostToolUse).",
    "learningObjectives": [
      "Master the Orchestrator-Worker architecture and Hub-and-Spoke topology.",
      "Understand Context Isolation: Subagents maintain independent conversation context.",
      "Define agents programmatically using AgentDefinition SDK.",
      "Differentiate Task tool input patterns: lean prompt vs bloated context.",
      "Enforce 100% deterministic safety policies using PreToolUse Hooks instead of probabilistic system prompts."
    ],
    "learningObjectivesVI": [
      "Nắm vững kiến trúc Orchestrator-Worker và topology Hub-and-Spoke.",
      "Hiểu rõ Context Isolation: Mỗi Subagent duy trì một không gian nhớ hội thoại độc lập.",
      "Định nghĩa các Agent bằng SDK AgentDefinition.",
      "Phân biệt mẫu truyền input cho Task tool: prompt tinh gọn vs prompt phình to.",
      "Thực thi chính sách an toàn 100% Deterministic bằng PreToolUse Hooks thay vì System Prompt xác suất."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always use PreToolUse Hooks for strict security policies and emit multiple Task calls in a single turn for parallel subagent execution.",
    "examTipVI": "Mẹo thi CCAF: Luôn dùng PreToolUse Hooks cho các chính sách bảo mật tuyệt đối và phát ra nhiều Task call trong cùng 1 turn để chạy song song.",
    "sections": [
      {
        "heading": "3.1 Orchestrator-Worker & Hub-and-Spoke Topology",
        "content": "<div class=\"callout callout-title\" style=\"background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Visual Analogy:</strong> The Coordinator is a Project Lead. When assigned a massive project, the Project Lead delegates tasks to 3 specialists (Frontend Subagent, Backend Subagent, QA Subagent). Each specialist works in their own room (isolated context) and submits final reports back.</div><div style=\"background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; margin: 1.25rem 0; text-align: center;\"><div style=\"font-weight: 700; font-size: 0.9rem; color: var(--accent-purple); margin-bottom: 0.75rem;\">HUB-AND-SPOKE ARCHITECTURE TOPOLOGY</div><div style=\"display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap;\"><div style=\"background: rgba(139, 92, 246, 0.15); border: 1px solid var(--accent-purple); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: var(--accent-purple);\">👑 Coordinator Agent<br><span style=\"font-weight:400; font-size:0.75rem;\">(Plan & Synthesize)</span></div><div style=\"font-size: 1.5rem; color: var(--text-muted);\">➔</div><div style=\"display: flex; flex-direction: column; gap: 0.5rem;\"><div style=\"background: rgba(14, 165, 233, 0.15); border: 1px solid var(--accent-blue); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-blue);\">🛠️ Subagent 1: Research (Context A)</div><div style=\"background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-emerald); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-emerald);\">💻 Subagent 2: Coder (Context B)</div></div></div></div>",
        "contentVI": "<div class=\"callout callout-title\" style=\"background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Hình ảnh Ẩn dụ Trực quan:</strong> Coordinator giống như một Quản lý Dự án (Project Lead). Khi được giao một dự án lớn, Quản lý giao nhiệm vụ cho 3 chuyên gia (Subagent Frontend, Subagent Backend, Subagent QA). Mỗi chuyên gia làm việc trong phòng riêng của mình (Context Isolation - Ngữ cảnh cô lập) và nộp lại báo cáo cuối cùng.</div><div style=\"background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; margin: 1.25rem 0; text-align: center;\"><div style=\"font-weight: 700; font-size: 0.9rem; color: var(--accent-purple); margin-bottom: 0.75rem;\">TOPOLOGY KIẾN TRÚC HUB-AND-SPOKE</div><div style=\"display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap;\"><div style=\"background: rgba(139, 92, 246, 0.15); border: 1px solid var(--accent-purple); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: var(--accent-purple);\">👑 Coordinator Agent<br><span style=\"font-weight:400; font-size:0.75rem;\">(Lập kế hoạch & Tổng hợp)</span></div><div style=\"font-size: 1.5rem; color: var(--text-muted);\">➔</div><div style=\"display: flex; flex-direction: column; gap: 0.5rem;\"><div style=\"background: rgba(14, 165, 233, 0.15); border: 1px solid var(--accent-blue); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-blue);\">🛠️ Subagent 1: Nghiên cứu (Context A)</div><div style=\"background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-emerald); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-emerald);\">💻 Subagent 2: Lập trình (Context B)</div></div></div></div>"
      },
      {
        "heading": "3.2 Subagent Declaration with AgentDefinition SDK",
        "content": "<p>In Claude Agent SDK, Subagents are programmatically defined using <code>AgentDefinition</code>:</p>",
        "codeExample": "# AgentDefinition SDK Structure (Python / TypeScript)\nfrom claude_agent_sdk import AgentDefinition, Tool\n\ncode_reviewer_agent = AgentDefinition(\n    name=\"CodeReviewer\",\n    description=\"Security reviewer specializing in static analysis\",\n    tools=[\n        Tool(name=\"read_file\", description=\"Read file contents\"),\n        Tool(name=\"run_linter\", description=\"Run static linter\")\n    ],\n    prompt=\"You are a Senior Code Reviewer. Analyze assigned code files for security vulnerabilities.\"\n)",
        "contentVI": "<p>Trong Claude Agent SDK, các Subagent được khai báo bằng cấu trúc lập trình <code>AgentDefinition</code> chuẩn:</p>"
      },
      {
        "heading": "3.3 Task Tool Input: BAD vs GOOD Pattern",
        "content": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 BAD PATTERN (Context Bloat)</div><pre><code>// ❌ BAD: Injecting 50 codebase files into prompt\n\"tools\": [{\n  \"name\": \"Task\",\n  \"input\": {\n    \"subagent\": \"CodeReviewer\",\n    \"prompt\": \"Review main.js. Here is full project source: [50_FILES_TEXT...]\"\n  }\n}]</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Result: Wastes tokens, instantly overflows Subagent context window.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 GOOD PATTERN (Lean Directives)</div><pre><code>// ✅ GOOD: Passing lean instruction & file path\n\"tools\": [{\n  \"name\": \"Task\",\n  \"input\": {\n    \"subagent\": \"CodeReviewer\",\n    \"prompt\": \"Use read_file tool to inspect 'src/main.js' and report top 3 security flaws.\"\n  }\n}]</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Result: Subagent autonomously invokes read_file tool as needed.</div></div></div>",
        "contentVI": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 SAI LẦM (Nhồi nhét Context phình to)</div><pre><code>// ❌ SAI: Nhét 50 file mã nguồn dự án vào prompt\n\"tools\": [{\n  \"name\": \"Task\",\n  \"input\": {\n    \"subagent\": \"CodeReviewer\",\n    \"prompt\": \"Review main.js. Đây là toàn bộ source code: [50_FILES_TEXT...]\"\n  }\n}]</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Hậu quả: Lãng phí token, làm tràn ngay lập tức Context Window của Subagent.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 CHUẨN KỸ THUẬT (Chỉ thị tinh gọn)</div><pre><code>// ✅ ĐÚNG: Chỉ truyền chỉ thị gọn kèm đường dẫn file\n\"tools\": [{\n  \"name\": \"Task\",\n  \"input\": {\n    \"subagent\": \"CodeReviewer\",\n    \"prompt\": \"Dùng tool read_file kiểm tra file 'src/main.js' và báo cáo 3 lỗi bảo mật hàng đầu.\"\n  }\n}]</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Kết quả: Subagent tự động gọi tool read_file đọc khi thực sự cần.</div></div></div>"
      },
      {
        "heading": "3.4 Hooks System vs System Prompt Matrix",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Evaluation Criteria</th><th>🛡️ PreToolUse / PostToolUse Hooks</th><th>💬 System Prompt Instructions</th></tr></thead><tbody><tr><td><strong>Determinism Guarantee</strong></td><td><span class=\"status-badge yes\">✅ 100% Deterministic</span></td><td><span class=\"status-badge warn\">⚠️ Probabilistic (~95-98%)</span></td></tr><tr><td><strong>Prompt Injection Defense</strong></td><td><span class=\"status-badge yes\">✅ 100% Secure (Server-side)</span></td><td><span class=\"status-badge no\">❌ Vulnerable to adversarial prompts</span></td></tr><tr><td><strong>Execution Layer</strong></td><td>Client Application / Server Code</td><td>LLM Context Window Memory</td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Tiêu chí Đánh giá</th><th>🛡️ PreToolUse / PostToolUse Hooks</th><th>💬 Chỉ thị trong System Prompt</th></tr></thead><tbody><tr><td><strong>Mức độ Đảm bảo (Determinism)</strong></td><td><span class=\"status-badge yes\">✅ 100% Nhất quán (Deterministic)</span></td><td><span class=\"status-badge warn\">⚠️ Mang tính Xác suất (~95-98%)</span></td></tr><tr><td><strong>Phòng chống Prompt Injection</strong></td><td><span class=\"status-badge yes\">✅ An toàn 100% (Phía Server)</span></td><td><span class=\"status-badge no\">❌ Có rủi ro bị vượt rào qua tấn công</span></td></tr><tr><td><strong>Tầng thực thi (Execution Layer)</strong></td><td>Mã ứng dụng Client / Code Server Backend</td><td>Bộ nhớ Context Window của LLM</td></tr></tbody></table></div>"
      },
      {
        "heading": "3.5 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 3</div><div class=\"kc-question\">Question: Coordinator needs 3 Subagents to analyze 3 files in parallel, but they run sequentially. What is the root technical cause?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>- <strong>Cause:</strong> Coordinator emitted Task tool_use calls across multiple separate API response turns.<br>- <strong>Fix:</strong> Ensure Coordinator emits multiple <code>Task</code> tool_use call blocks within the <strong>SAME API response message turn</strong>.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 3</div><div class=\"kc-question\">Câu hỏi: Coordinator cần 3 Subagent phân tích 3 file song song, nhưng chúng lại chạy tuần tự từng cái một. Nguyên nhân kỹ thuật gốc là gì?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>- <strong>Nguyên nhân:</strong> Coordinator phát ra các lệnh gọi tool Task nằm rải rác trên nhiều lượt phản hồi API riêng biệt.<br>- <strong>Khắc phục:</strong> Đảm bảo Coordinator phát ra nhiều khối gọi tool <code>Task</code> nằm trong <strong>CÙNG MỘT lượt tin nhắn phản hồi API</strong>.</div></div>"
      }
    ],
    "coreMasteries": [
      "Orchestrator-Worker: Lead agent coordinates specialized Subagents to perform single-purpose tasks.",
      "Context Isolation: Each Subagent maintains a clean messages array, protecting Lead Agent context window.",
      "allowedTools = ['Task']: Lead Agent requires 'Task' in allowedTools array to spawn Subagents.",
      "Parallel Execution: Requires Lead Agent to emit multiple Task tool_use calls in the SAME API response turn.",
      "Hooks > System Prompt: PreToolUse Hooks intercept execution at client 100% deterministically."
    ],
    "coreMasteriesVI": [
      "Orchestrator-Worker: Lead Agent điều phối các Subagents chuyên biệt để thực hiện tác vụ đơn nhiệm.",
      "Context Isolation: Mỗi Subagent giữ mảng messages riêng, bảo vệ Context Window của Lead Agent.",
      "allowedTools = [Task]: Lead Agent cần có Task trong allowedTools để khởi tạo Subagent.",
      "Chạy song song: Yêu cầu Lead Agent phát ra nhiều thẻ gọi tool Task trong CÙNG MỘT message phản hồi API.",
      "Hooks > System Prompt: PreToolUse Hooks chặn lệnh ở tầng Client đảm bảo chính xác 100%."
    ],
    "examTraps": [
      "⚠️ TRAP 1: Omitting 'Task' from allowedTools array causing Coordinator to describe delegation without executing it.",
      "⚠️ TRAP 2: Believing Subagents automatically inherit Coordinator message history.",
      "⚠️ TRAP 3: Relying on System Prompt 'Do not run rm -rf' for safety instead of PreToolUse Hooks."
    ],
    "examTrapsVI": [
      "⚠️ BẪY 1: Quên cấp phép tool Task trong allowedTools khiến Coordinator chỉ mô tả việc giao việc chứ không thể thực thi.",
      "⚠️ BẪY 2: Lầm tưởng Subagent tự động thừa hưởng toàn bộ lịch sử tin nhắn của Coordinator.",
      "⚠️ BẪY 3: Dùng System Prompt 'Không được chạy rm -rf' để bảo mật thay vì dùng PreToolUse Hooks."
    ]
  },
  {
    "id": 4,
    "title": "Chapter 4: Model Context Protocol (MCP) — Standardized Integration",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "estimatedMinutes": 25,
    "summary": "Master the Model Context Protocol (MCP) open standard, MCP Server vs MCP Client roles, permission boundaries, and the 3 core MCP primitives (Tools, Resources, Prompts).",
    "summaryVI": "Nắm vững chuẩn mở Model Context Protocol (MCP), vai trò MCP Server vs MCP Client, ranh giới quyền hạn, và 3 thành phần cốt lõi của MCP (Tools, Resources, Prompts).",
    "learningObjectives": [
      "Understand MCP Server vs MCP Client architecture.",
      "Master permission boundaries for read/write resource access.",
      "Distinguish between 3 core MCP primitives: Tools, Resources, and Prompts."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ kiến trúc MCP Server vs MCP Client.",
      "Quản lý ranh giới cấp quyền đọc/ghi tài nguyên.",
      "Phân biệt 3 thành phần cốt lõi của MCP: Tools, Resources, và Prompts."
    ],
    "examTip": "⚡ CCAF Exam Tip: Provide rich descriptions for MCP tools to ensure Claude prefers structured server tools over raw terminal commands.",
    "examTipVI": "Mẹo thi CCAF: Cung cấp mô tả chi tiết cho MCP tools để Claude không quay sang dùng lệnh Terminal thô.",
    "sections": [
      {
        "heading": "4.1 Architecture & USB-C Analogy",
        "content": "<div class=\"callout callout-title\" style=\"background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--accent-emerald); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Visual Analogy:</strong> MCP is like a USB-C port for AI models. Instead of custom proprietary cables for every peripheral, MCP defines a single open standard port connecting Claude (Client) to any Database or GitHub repo (MCP Server).</div><p>MCP consists of <strong>MCP Server</strong> (exposes tools & resources) and <strong>MCP Client</strong> (Claude Code / Claude Desktop).</p>",
        "contentVI": "<div class=\"callout callout-title\" style=\"background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--accent-emerald); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Hình ảnh Ẩn dụ Trực quan:</strong> MCP giống như một cổng cắm USB-C dành riêng cho các mô hình AI. Thay vì phải dùng các dây cáp tùy biến riêng cho từng thiết bị ngoại vi, MCP định nghĩa một cổng chuẩn mở duy nhất kết nối Claude (MCP Client) tới bất kỳ CSDL hay repository GitHub nào (MCP Server).</div><p>MCP bao gồm <strong>MCP Server</strong> (cung cấp công cụ & tài nguyên) và <strong>MCP Client</strong> (Claude Code / Claude Desktop).</p>"
      },
      {
        "heading": "4.2 The 3 MCP Core Primitives",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>MCP Primitive</th><th>Technical Nature</th><th>Example Use Case</th></tr></thead><tbody><tr><td><strong>Tools</strong></td><td>Executable side-effecting functions.</td><td><code>create_issue</code>, <code>execute_query</code></td></tr><tr><td><strong>Resources</strong></td><td>Read-only state, schemas, or file logs.</td><td><code>file:///logs/app.log</code>, DB Schema</td></tr><tr><td><strong>Prompts</strong></td><td>Parameterized instruction templates.</td><td>PR review prompt template</td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Thành phần MCP (Primitive)</th><th>Bản chất Kỹ thuật</th><th>Ví dụ Sử dụng Thực tế</th></tr></thead><tbody><tr><td><strong>Tools</strong></td><td>Hàm thực thi phát sinh tác động ngoài.</td><td><code>create_issue</code>, <code>execute_query</code></td></tr><tr><td><strong>Resources</strong></td><td>Trạng thái, schema hoặc log đọc (Read-only).</td><td><code>file:///logs/app.log</code>, DB Schema</td></tr><tr><td><strong>Prompts</strong></td><td>Mẫu chỉ thị chứa tham số truyền vào.</td><td>Mẫu prompt kiểm tra PR code</td></tr></tbody></table></div>"
      },
      {
        "heading": "4.3 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 4</div><div class=\"kc-question\">Question: Why must MCP Tool descriptions be exceptionally detailed and explicit?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Ambiguous MCP descriptions cause Claude to fail to recognize the custom server capabilities, causing it to fall back to executing risky raw terminal commands (bash/sed).</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 4</div><div class=\"kc-question\">Câu hỏi: Tại sao các mô tả công cụ MCP Tool lại bắt buộc phải cực kỳ chi tiết và rõ ràng?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Các mô tả MCP mơ hồ khiến Claude không nhận diện được khả năng của server tùy chỉnh, dẫn đến việc mô hình tự động quay sang chạy các lệnh Terminal thô tiềm ẩn rủi ro (bash/sed).</div></div>"
      }
    ],
    "coreMasteries": [
      "MCP Open Protocol: Standardized connection specification for AI models to external systems.",
      "MCP Primitives: Tools (executable functions), Resources (read-only state/files), Prompts (parameterized templates).",
      "Ambiguity Prevention: Detailed tool descriptions prevent fallback to raw bash/sed commands."
    ],
    "coreMasteriesVI": [
      "MCP Open Protocol: Chuẩn kết nối mở giữa AI và các hệ thống bên ngoài.",
      "MCP Primitives: Tools (thực thi), Resources (đọc), Prompts (mẫu hướng dẫn).",
      "Mô tả chi tiết: Tránh việc Claude quay sang dùng lệnh bash thô rủi ro."
    ],
    "examTraps": [
      "⚠️ TRAP 1: Confusing MCP with custom REST APIs. MCP is an open specification standard.",
      "⚠️ TRAP 2: Omitting explicit tool descriptions causing model to bypass MCP Server in favor of raw shell commands."
    ],
    "examTrapsVI": [
      "⚠️ BẪY 1: Nhầm lẫn MCP với custom REST API thông thường. MCP là chuẩn mở.",
      "⚠️ BẪY 2: Bỏ qua mô tả tool làm Claude không nhận diện được MCP Server."
    ]
  },
  {
    "id": 5,
    "title": "Chapter 5: Claude Code — Configuration & Workflows",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "estimatedMinutes": 20,
    "summary": "Claude Code CLI workflows, CLAUDE.md project configuration, CLI permission flags, and automated CI/CD PR review pipelines.",
    "summaryVI": "Quy trình CLI Claude Code, cấu hình dự án CLAUDE.md, các cờ phân quyền CLI, và quy trình duyệt PR tự động trong CI/CD.",
    "learningObjectives": [
      "Master the purpose and lean contents of CLAUDE.md.",
      "Understand --dangerously-skip-permissions flag risks and CI/CD use cases.",
      "Enforce Glob/Grep First workflow before reading files."
    ],
    "learningObjectivesVI": [
      "Nắm vững mục đích và nội dung tinh gọn của CLAUDE.md.",
      "Hiểu rủi ro của cờ --dangerously-skip-permissions và ứng dụng trong CI/CD.",
      "Tuân thủ quy trình Glob/Grep First trước khi đọc file."
    ],
    "examTip": "⚡ CCAF Exam Tip: Keep CLAUDE.md lean with essential build/test commands and use --dangerously-skip-permissions only in non-interactive CI/CD sandboxes.",
    "examTipVI": "Mẹo thi CCAF: Giữ CLAUDE.md tinh gọn với các lệnh test/build cốt lõi và chỉ dùng cờ --dangerously-skip-permissions trong CI/CD tự động.",
    "sections": [
      {
        "heading": "5.1 Lean CLAUDE.md Configuration Pattern",
        "content": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 BLOATED CLAUDE.MD (Bad Pattern)</div><p style=\"font-size: 0.85rem;\">2,000 lines of architecture documentation and tutorials.</p><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Wastes massive token context every session launch!</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 LEAN CLAUDE.MD (Good Pattern)</div><p style=\"font-size: 0.85rem;\">Concise instructions: <code>npm test</code>, <code>npm run build</code>, 2-line code style.</p><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Minimal token usage, maximum adherence.</div></div></div>",
        "contentVI": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 BLOATED CLAUDE.MD (CLAUDE.md phình to - Anti-Pattern)</div><p style=\"font-size: 0.85rem;\">Nhồi 2,000 dòng tài liệu kiến trúc và hướng dẫn sử dụng vào file:</p><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Lãng phí cực lớn dung lượng Context Window mỗi khi khởi chạy phiên làm việc!</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 LEAN CLAUDE.MD (CLAUDE.md tinh gọn - Mẫu chuẩn)</div><p style=\"font-size: 0.85rem;\">Chỉ chứa các chỉ thị ngắn gọn: <code>npm test</code>, <code>npm run build</code>, 2 dòng quy chuẩn code style:</p><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Tối giản token tiêu thụ, đạt mức độ tuân thủ quy tắc cao nhất.</div></div></div>"
      },
      {
        "heading": "5.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 5</div><div class=\"kc-question\">Question: Which CLI flag is required when running Claude Code in automated GitHub Actions PR review pipelines?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Use <code>--dangerously-skip-permissions</code> because GitHub Actions runners are non-interactive isolated sandbox environments.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 5</div><div class=\"kc-question\">Câu hỏi: Cờ CLI nào là bắt buộc khi chạy Claude Code tự động trong quy trình duyệt PR của GitHub Actions?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Dùng <code>--dangerously-skip-permissions</code> vì các runner của GitHub Actions là các môi trường sandbox tự động không có tương tác người dùng.</div></div>"
      }
    ],
    "coreMasteries": [
      "CLAUDE.md: Project guide containing core build, test, and style commands.",
      "--dangerously-skip-permissions: Bypasses prompt confirmations; strictly for isolated CI/CD runners.",
      "Glob/Grep First: Search files and keywords before reading content into context."
    ],
    "coreMasteriesVI": [
      "CLAUDE.md: File hướng dẫn chứa các lệnh build/test ngắn gọn.",
      "--dangerously-skip-permissions: Dành riêng cho runner CI/CD tự động.",
      "Glob/Grep First: Tìm file và từ khóa trước khi nạp nội dung vào context."
    ],
    "examTraps": [
      "⚠️ TRAP 1: Stuffing 2,000 lines of documentation into CLAUDE.md (keep it lean: build/test commands only).",
      "⚠️ TRAP 2: Running --dangerously-skip-permissions on production developer workstations."
    ],
    "examTrapsVI": [
      "⚠️ BẪY 1: Nhồi 2,000 dòng tài liệu vào CLAUDE.md gây lãng phí token.",
      "⚠️ BẪY 2: Lạm dụng cờ --dangerously-skip-permissions trên máy cá nhân."
    ]
  },
  {
    "id": 6,
    "title": "Chapter 6: Advanced Prompt Engineering & Structured Output",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 6: Advanced Prompt Engineering & Structured Output.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 6: Advanced Prompt Engineering & Structured Output.",
    "learningObjectives": [
      "Understand the fundamental technical principles of Chapter 6: Advanced Prompt Engineering & Structured Output.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 6: Advanced Prompt Engineering & Structured Output.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 6: Advanced Prompt Engineering & Structured Output.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "6.1 XML Boundaries & Few-Shot Engineering",
        "content": "<div class=\"callout callout-title\" style=\"background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Visual Analogy:</strong> XML tags are like labeled envelopes in a mailroom. Without envelopes, documents get mixed up. Bounding user input in <code>&lt;user_input&gt;...&lt;/user_input&gt;</code> prevents Prompt Injection attacks.</div><p>Few-shot prompting provides concrete input/output canonical examples inside XML blocks before issuing the final user query:</p><div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 AMBIGUOUS PROMPT (Anti-Pattern)</div><pre><code>\"Extract customer sentiment from text.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Inconsistent formats and loose adjectives.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 FEW-SHOT XML STRUCTURED (Good Pattern)</div><pre><code>\"<example>\n<input>Great service!</input>\n<output>{\"sentiment\": \"POSITIVE\"}</output>\n</example>\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Deterministic 100% JSON output parsing.</div></div></div>",
        "contentVI": "<div class=\"callout callout-title\" style=\"background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;\">💡 <strong>Hình ảnh Ẩn dụ Trực quan:</strong> Thẻ XML giống như các phong bì có dán nhãn trong phòng văn thư. Nếu không có phong bì, tài liệu sẽ bị lẫn lộn. Bọc dữ liệu người dùng trong <code>&lt;user_input&gt;...&lt;/user_input&gt;</code> giúp ngăn chặn các cuộc tấn công Prompt Injection.</div><p>Kỹ thuật Few-shot prompting cung cấp các ví dụ mẫu chuẩn dạng Input/Output bên trong các thẻ XML trước khi đưa ra câu hỏi thực tế:</p><div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 PROMPT MƠ HỒ (Anti-Pattern)</div><pre><code>\"Hãy trích xuất cảm xúc khách hàng từ đoạn văn.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Kết quả trả về không đồng nhất, định dạng bị vỡ.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 FEW-SHOT XML CÓ CẤU TRÚC (Mẫu chuẩn)</div><pre><code>\"<example>\n<input>Dịch vụ tuyệt vời!</input>\n<output>{\"sentiment\": \"POSITIVE\"}</output>\n</example>\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Bốc tách JSON chuẩn xác nhất quán 100%.</div></div></div>"
      },
      {
        "heading": "6.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 6</div><div class=\"kc-question\">Question: What is the most effective way to prevent untrusted user inputs from overriding system instructions?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Encapsulate untrusted user text inside XML tags (e.g. <code>&lt;user_query&gt;...&lt;/user_query&gt;</code>) and instruct Claude in system prompt to treat content within those tags strictly as data.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 6</div><div class=\"kc-question\">Câu hỏi: Phương pháp hiệu quả nhất để ngăn văn bản người dùng không tin cậy ghi đè chỉ thị hệ thống là gì?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Bọc văn bản không tin cậy trong các thẻ XML (vd: <code>&lt;user_query&gt;...&lt;/user_query&gt;</code>) và chỉ thị Claude trong system prompt xử lý nội dung trong thẻ đó thuần túy là dữ liệu.</div></div>"
      }
    ],
    "coreMasteries": [
      "XML Boundaries: Tags isolate untrusted data and protect against prompt injection.",
      "Few-shot Examples: Providing 2-3 canonical XML examples dramatically improves output consistency."
    ],
    "coreMasteriesVI": [
      "Thẻ ranh giới XML: Cô lập dữ liệu không tin cậy và chống tấn công prompt injection.",
      "Ví dụ Few-shot: Cung cấp 2-3 ví dụ XML mẫu giúp chuẩn hóa kết quả đầu ra vượt trội."
    ],
    "examTraps": [
      "⚠️ TRAP: Passing raw un-escaped user text directly into system prompts without XML boundaries."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Nhét văn bản thô của người dùng trực tiếp vào System Prompt mà không dùng thẻ bọc XML."
    ]
  },
  {
    "id": 7,
    "title": "Chapter 7: Advanced Schema Design & Resilient Enums",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 7: Advanced Schema Design & Resilient Enums.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 7: Advanced Schema Design & Resilient Enums.",
    "learningObjectives": [
      "Master Resilient Enum design strategies (UNKNOWN fallback value).",
      "Enforce strict JSON schema validation at Client Backend.",
      "Handle unexpected model output properties gracefully."
    ],
    "learningObjectivesVI": [
      "Nắm vững chiến lược thiết kế Resilient Enum (giá trị dự phòng UNKNOWN).",
      "Thực thi kiểm tra JSON schema nghiêm ngặt ở Client Backend.",
      "Xử lý mượt mà khi mô hình trả về các trường ngoài dự kiến."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always include an 'UNKNOWN' or 'OTHER' value in Enum arrays to prevent JSON validation crashes when encountering out-of-vocabulary terms.",
    "examTipVI": "Mẹo thi CCAF: Luôn thêm giá trị 'UNKNOWN' hoặc 'OTHER' vào mảng Enum để tránh vỡ JSON Schema khi gặp thuật ngữ ngoài từ điển.",
    "sections": [
      {
        "heading": "7.1 Resilient Enums & Fallback Design Pattern",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Enum Strategy</th><th>Schema Definition</th><th>Backend Impact</th></tr></thead><tbody><tr><td>🔴 <strong>Strict Enum (Fragile)</strong></td><td><code>[\"LOW\", \"MEDIUM\", \"HIGH\"]</code></td><td><span class=\"status-badge no\">❌ Crashes if model returns \"CRITICAL\"</span></td></tr><tr><td>🟢 <strong>Resilient Enum (Production)</strong></td><td><code>[\"LOW\", \"MEDIUM\", \"HIGH\", \"UNKNOWN\"]</code></td><td><span class=\"status-badge yes\">✅ Safely routes to manual triage</span></td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Chiến lược Enum</th><th>Định nghĩa Schema JSON</th><th>Tác động tới Backend Client</th></tr></thead><tbody><tr><td>🔴 <strong>Enum Cứng (Dễ vỡ)</strong></td><td><code>[\"LOW\", \"MEDIUM\", \"HIGH\"]</code></td><td><span class=\"status-badge no\">❌ Văng lỗi Parser nếu mô hình trả về \"CRITICAL\"</span></td></tr><tr><td>🟢 <strong>Enum Bền vững (Chuẩn Production)</strong></td><td><code>[\"LOW\", \"MEDIUM\", \"HIGH\", \"UNKNOWN\"]</code></td><td><span class=\"status-badge yes\">✅ An toàn chuyển hướng về phân loại thủ công</span></td></tr></tbody></table></div>"
      },
      {
        "heading": "7.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 7</div><div class=\"kc-question\">Question: Why should Enum schemas in production tool calls always include an UNKNOWN fallback?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Real-world inputs often contain unexpected categories. An UNKNOWN fallback allows Claude to complete schema validation successfully without throwing parsing exceptions.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 7</div><div class=\"kc-question\">Câu hỏi: Tại sao các Enum schema trong tool call sản xuất lại bắt buộc phải chứa giá trị dự phòng UNKNOWN?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Dữ liệu thực tế thường phát sinh các phân loại ngoài dự kiến. Giá trị UNKNOWN giúp Claude hoàn tất kiểm tra schema thành công mà không gây văng Exception.</div></div>"
      }
    ],
    "coreMasteries": [
      "Resilient Enums: Always include UNKNOWN or OTHER in schema enum arrays.",
      "Schema Validation: Client must validate output JSON against JSON schema specs."
    ],
    "coreMasteriesVI": [
      "Enum Bền vững: Luôn bổ sung UNKNOWN hoặc OTHER trong mảng enum của schema.",
      "Kiểm tra Schema: Client phải validate lại JSON đầu ra với JSON schema chỉ định."
    ],
    "examTraps": [
      "⚠️ TRAP: Defining strict enums without fallback options leading to runtime parser crashes."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Định nghĩa Enum cứng không có phương án dự phòng dẫn đến ngắt ứng dụng khi parse."
    ]
  },
  {
    "id": 8,
    "title": "Chapter 8: Cost Routing & SLA — Messages vs Batch API",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
    "learningObjectives": [
      "Differentiate Messages API (Real-time) vs Message Batches API (Async 24h SLA).",
      "Capitalize on 50% cost discount for bulk asynchronous processing tasks.",
      "Implement cost-optimized routing architecture."
    ],
    "learningObjectivesVI": [
      "Phân biệt Messages API (Thời gian thực) vs Message Batches API (Bất đồng bộ 24h SLA).",
      "Tận dụng mức chiết khấu 50% chi phí cho các tác vụ xử lý lô bất đồng bộ.",
      "Thiết kế kiến trúc điều hướng tối ưu hóa chi phí."
    ],
    "examTip": "⚡ CCAF Exam Tip: Route non-urgent bulk workloads (nightly summaries, document indexing) to Message Batches API for 50% cost savings with 24h SLA.",
    "examTipVI": "Mẹo thi CCAF: Chuyển các tác vụ lớn không gấp (tóm tắt đêm, đánh chỉ mục) sang Message Batches API để giảm 50% chi phí với SLA 24h.",
    "sections": [
      {
        "heading": "8.1 Messages API vs Message Batches API SLA Matrix",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>API Endpoint</th><th>Latency SLA</th><th>Cost Discount</th><th>Best Use Case</th></tr></thead><tbody><tr><td>⚡ <strong>Messages API</strong> (<code>/v1/messages</code>)</td><td>Real-time (Seconds)</td><td>Standard Price (100%)</td><td>Interactive chatbots, live UI agent turns</td></tr><tr><td>📦 <strong>Message Batches API</strong> (<code>/v1/messages/batches</code>)</td><td>Async (24-Hour SLA)</td><td><span class=\"status-badge yes\">💰 50% DISCOUNT</span></td><td>Nightly document processing, bulk offline evaluations</td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Endpoint API</th><th>SLA Độ trễ (Latency)</th><th>Mức Ưu đãi Chi phí</th><th>Trường hợp Sử dụng Tối ưu</th></tr></thead><tbody><tr><td>⚡ <strong>Messages API</strong> (<code>/v1/messages</code>)</td><td>Thời gian thực (Vài giây)</td><td>Giá tiêu chuẩn (100%)</td><td>Chatbot tương tác, luồng UI live agent</td></tr><tr><td>📦 <strong>Message Batches API</strong> (<code>/v1/messages/batches</code>)</td><td>Bất đồng bộ (SLA 24 Giờ)</td><td><span class=\"status-badge yes\">💰 GIẢM 50% CHI PHÍ</span></td>['Tóm tắt tài liệu ban đêm, chấm điểm lô offline']</td></tr></tbody></table></div>"
      },
      {
        "heading": "8.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 8</div><div class=\"kc-question\">Question: A company processes 100,000 PDF invoices overnight for accounting reports due the next morning. Which API should they use?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Use Message Batches API. Since the output is needed next morning (within 24 hours), Message Batches API cuts total API cost by 50% compared to Messages API.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 8</div><div class=\"kc-question\">Câu hỏi: Một công ty xử lý 100,000 hóa đơn PDF qua đêm cho báo cáo kế toán sáng hôm sau. Họ nên dùng API nào?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Dùng Message Batches API. Vì kết quả chỉ cần vào sáng hôm sau (trong vòng 24 giờ), Message Batches API giúp tiết kiệm đúng 50% chi phí API so với Messages API.</div></div>"
      }
    ],
    "coreMasteries": [
      "Message Batches API: 50% cost reduction for async batch requests with 24-hour completion SLA.",
      "Cost Routing: Real-time queries -> Messages API; Asynchronous bulk -> Message Batches API."
    ],
    "coreMasteriesVI": [
      "Message Batches API: Giảm 50% chi phí cho tác vụ lô bất đồng bộ với cam kết SLA 24 giờ.",
      "Cost Routing: Truy vấn live -> Messages API; Xử lý lô offline -> Message Batches API."
    ],
    "examTraps": [
      "⚠️ TRAP: Using expensive Messages API for non-urgent offline batch extraction jobs."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Dùng Messages API đắt đỏ cho các công việc trích xuất dữ liệu lô không gấp."
    ]
  },
  {
    "id": 9,
    "title": "Chapter 9: Escalation & Human-in-the-Loop",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 9: Escalation & Human-in-the-Loop.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 9: Escalation & Human-in-the-Loop.",
    "learningObjectives": [
      "Implement Human-in-the-Loop (HITL) confirmation flows for high-risk tools.",
      "Design escalation thresholds based on agent confidence metrics.",
      "Protect production data from destructive autonomous agent actions."
    ],
    "learningObjectivesVI": [
      "Thiết lập luồng xác nhận Human-in-the-Loop (HITL) cho các tool có rủi ro cao.",
      "Thiết kế ngưỡng leo thang dựa trên chỉ số tin cậy của Agent.",
      "Bảo vệ dữ liệu sản xuất khỏi các hành động tự phá hoại của Agent tự vận hành."
    ],
    "examTip": "⚡ CCAF Exam Tip: Require explicit Human-in-the-Loop confirmation before executing high-impact side-effect tools (e.g. database deletes, wire transfers).",
    "examTipVI": "Mẹo thi CCAF: Bắt buộc phải có sự xác nhận của con người (HITL) trước khi thực thi các tool có tác động lớn (vd: xóa CSDL, chuyển tiền).",
    "sections": [
      {
        "heading": "9.1 HITL Approval Matrix & Escalation Flow",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Action Impact Level</th><th>Execution Mode</th><th>Architectural Mechanism</th></tr></thead><tbody><tr><td>🟢 <strong>Low Risk (Read-only)</strong></td><td>Autonomous Execution</td><td>Direct tool execution (e.g. <code>read_file</code>, <code>grep</code>)</td></tr><tr><td>🔴 <strong>High Risk (Destructive/Financial)</strong></td><td><span class=\"status-badge warn\">⚠️ Human-in-the-Loop (HITL)</span></td><td>Pause execution, await explicit user confirmation token before calling backend tool</td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Cấp độ Tác động của Hành động</th><th>Chế độ Thực thi Backend</th><th>Cơ chế Kiến trúc Kiểm soát</th></tr></thead><tbody><tr><td>🟢 <strong>Rủi ro thấp (Chỉ đọc)</strong></td><td>Tự vận hành (Autonomous)</td><td>Thực thi tool trực tiếp (vd: <code>read_file</code>, <code>grep</code>)</td></tr><tr><td>🔴 <strong>Rủi ro cao (Phá hoại/Tài chính)</strong></td><td><span class=\"status-badge warn\">⚠️ Human-in-the-Loop (HITL)</span></td><td>Tạm dừng thực thi, chờ token xác nhận trực tiếp từ con người trước khi chạy tool Backend</td></tr></tbody></table></div>"
      },
      {
        "heading": "9.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 9</div><div class=\"kc-question\">Question: What architectural pattern ensures an autonomous agent cannot accidentally wipe a production database?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Implement Human-in-the-Loop (HITL) authorization hooks at the client backend level for all destructive write/delete tool definitions.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 9</div><div class=\"kc-question\">Câu hỏi: Mẫu kiến trúc nào đảm bảo Agent tự vận hành không thể vô tình xóa sạch CSDL sản xuất?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Thực thi các hook phê duyệt Human-in-the-Loop (HITL) ở tầng Backend Client đối với tất cả các định nghĩa công cụ ghi/xóa có tính chất phá hoại.</div></div>"
      }
    ],
    "coreMasteries": [
      "HITL Authorization: High-impact actions require explicit human confirmation.",
      "Confidence Thresholds: Fall back to human agents when confidence falls below target score."
    ],
    "coreMasteriesVI": [
      "Ủy quyền HITL: Các hành động có tác động lớn bắt buộc phải có sự xác nhận của con người.",
      "Ngưỡng tin cậy: Chuyển giao cho nhân viên hỗ trợ khi độ tin cậy của Agent giảm xuống dưới mức trần."
    ],
    "examTraps": [
      "⚠️ TRAP: Allowing fully autonomous agents to execute database delete or financial transfer tools without HITL hooks."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Cho phép Agent tự vận hành thực thi các tool xóa CSDL hoặc chuyển tiền mà không có hook HITL."
    ]
  },
  {
    "id": 10,
    "title": "Chapter 10: Multi-Agent Reliability & Error Recovery",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "estimatedMinutes": 20,
    "summary": "Master state recovery, turn limits, and resilient fallback loops in multi-agent orchestration.",
    "summaryVI": "Nắm vững kỹ thuật phục hồi trạng thái (State Recovery), giới hạn lượt hội thoại (Turn Limits) và các vòng lặp dự phòng trong điều phối Multi-Agent.",
    "learningObjectives": [
      "Implement maximum turn limits to prevent infinite execution loops.",
      "Persist agent state to durable storage for recovery after system crashes.",
      "Design resilient fallback subagent strategies."
    ],
    "learningObjectivesVI": [
      "Thiết lập giới hạn lượt (Turn Limits) để ngăn vòng lặp thực thi vô tận.",
      "Lưu trữ trạng thái Agent vào cơ sở dữ liệu để phục hồi sau sự cố crash.",
      "Thiết kế các chiến lược Subagent dự phòng bền vững."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always enforce a hard ceiling on max turns (e.g. 10-15 turns) and persist agent state to DB after every tool execution.",
    "examTipVI": "Mẹo thi CCAF: Luôn đặt giới hạn cứng cho số turn (vd: 10-15 turns) và lưu trạng thái Agent vào CSDL sau mỗi lần chạy tool.",
    "sections": [
      {
        "heading": "10.1 Multi-Agent State Recovery Matrix",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Reliability Strategy</th><th>Implementation</th><th>System Impact</th></tr></thead><tbody><tr><td>🔄 <strong>State Persistence</strong></td><td>Save message array & tool outputs to DB after each turn</td><td><span class=\"status-badge yes\">✅ Resumes seamlessly after crash</span></td></tr><tr><td>🛑 <strong>Max Turn Ceiling</strong></td><td>Enforce hard limit (e.g. max 15 turns) in loop</td><td><span class=\"status-badge yes\">✅ Prevents runaway API cost loops</span></td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Chiến lược Bền vững</th><th>Cách thức Triển khai</th><th>Tác động Hệ thống</th></tr></thead><tbody><tr><td>🔄 <strong>Lưu trữ Trạng thái (Persistence)</strong></td><td>Lưu mảng messages & kết quả tool vào CSDL sau mỗi turn</td><td><span class=\"status-badge yes\">✅ Phục hồi mượt mà ngay khi server khôi phục sau crash</span></td></tr><tr><td>🛑 <strong>Trần Giới hạn Turn (Turn Ceiling)</strong></td><td>Ép giới hạn cứng (vd: tối đa 15 turns) trong vòng lặp</td><td><span class=\"status-badge yes\">✅ Ngăn chặn vòng lặp chạy ngầm làm bùng nổ chi phí API</span></td></tr></tbody></table></div>"
      },
      {
        "heading": "10.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 10</div><div class=\"kc-question\">Question: An autonomous agent enters a loop repeatedly attempting a failing tool call. What two safeguards must be added?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>1. Enforce a hard maximum turn limit (e.g., 10 turns).<br>2. Track consecutive identical tool failures and break the loop to return a graceful error to user.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 10</div><div class=\"kc-question\">Câu hỏi: Một Agent tự vận hành bị rơi vào vòng lặp liên tục gọi lại một tool đang bị lỗi. Hai cơ chế bảo vệ bắt buộc phải thêm vào là gì?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>1. Ép một giới hạn cứng số lượt tối đa (vd: 10 turns).<br>2. Theo dõi các lần thất bại liên tiếp của cùng một tool và ngắt vòng lặp để trả lỗi mượt mà cho người dùng.</div></div>"
      }
    ],
    "coreMasteries": [
      "Turn Limits: Hard ceiling on max loop iterations prevents runaway API billing.",
      "State Persistence: Store full message payload in database after every turn for crash resilience."
    ],
    "coreMasteriesVI": [
      "Giới hạn Turn: Đặt trần số vòng lặp tối đa để tránh bùng nổ hóa đơn API.",
      "Lưu trữ Trạng thái: Lưu toàn bộ payload tin nhắn vào CSDL sau mỗi turn để chống sự cố crash."
    ],
    "examTraps": [
      "⚠️ TRAP: Running infinite while(true) agent loops without max turn limits or retry backoff."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Chạy vòng lặp while(true) vô tận mà không có giới hạn turn tối đa hay cơ chế ngắt đệm."
    ]
  },
  {
    "id": 11,
    "title": "Chapter 11: Advanced Context Management & Context Pruning",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "estimatedMinutes": 20,
    "summary": "Master Context Pruning, Summarization Compaction, and Selective Memory Retention.",
    "summaryVI": "Nắm vững kỹ thuật Cắt tỉa Ngữ cảnh (Context Pruning), Tóm tắt Nén dung lượng (Compaction) và Lưu giữ Trí nhớ Có chọn lọc.",
    "learningObjectives": [
      "Apply Context Pruning to remove stale tool_result payload blocks.",
      "Implement Summarization Compaction when conversation exceeds 100k tokens.",
      "Mitigate Lost-in-the-middle context degradation."
    ],
    "learningObjectivesVI": [
      "Áp dụng Cắt tỉa Ngữ cảnh để loại bỏ các khối payload tool_result đã cũ.",
      "Thực hiện Tóm tắt Nén dung lượng khi hội thoại vượt quá 100k tokens.",
      "Khắc phục suy giảm chú ý do hiệu ứng Lost-in-the-middle."
    ],
    "examTip": "⚡ CCAF Exam Tip: Replace old verbose tool_result blocks with lean summary placeholders to keep context clean without losing conversation flow.",
    "examTipVI": "Mẹo thi CCAF: Thay thế các khối tool_result cũ rườm rà bằng các gạch đầu dòng tóm tắt tinh gọn để giữ context sạch sẽ.",
    "sections": [
      {
        "heading": "11.1 Context Management Techniques Matrix",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Technique</th><th>Mechanism</th><th>Token Savings</th></tr></thead><tbody><tr><td>✂️ <strong>Context Pruning</strong></td><td>Strip historical <code>tool_result</code> payloads while retaining agent decisions</td><td><span class=\"status-badge yes\">⚡ 40-60% Reduction</span></td></tr><tr><td>📦 <strong>Summarization Compaction</strong></td><td>Summarize turns 1-20 into a single systemic recap turn</td><td><span class=\"status-badge yes\">⚡ 70-80% Reduction</span></td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Kỹ thuật Quản lý</th><th>Cơ chế Hoạt động</th><th>Mức Tiết kiệm Token</th></tr></thead><tbody><tr><td>✂️ <strong>Cắt tỉa Ngữ cảnh (Pruning)</strong></td><td>Tước bỏ các payload <code>tool_result</code> cũ trong lịch sử nhưng giữ lại các quyết định của Agent</td><td><span class=\"status-badge yes\">⚡ Giảm 40-60% Token</span></td></tr><tr><td>📦 <strong>Tóm tắt Nén (Compaction)</strong></td><td>Tóm tắt các lượt từ 1-20 thành một lượt ghi nhớ tổng quan duy nhất</td><td><span class=\"status-badge yes\">⚡ Giảm 70-80% Token</span></td></tr></tbody></table></div>"
      },
      {
        "heading": "11.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 11</div><div class=\"kc-question\">Question: A multi-turn coding agent session reaches 150k tokens and runs slowly. What is the best optimization?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Prune past large file tool_results and replace them with lean summary text tags while preserving user system instructions.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 11</div><div class=\"kc-question\">Câu hỏi: Một phiên làm việc lập trình qua nhiều lượt đạt 150k tokens và phản hồi chậm. Phương án tối ưu tốt nhất là gì?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Cắt tỉa các tool_result đọc file lớn trong quá khứ và thay thế chúng bằng thẻ tóm tắt tinh gọn trong khi vẫn giữ nguyên System Prompt của người dùng.</div></div>"
      }
    ],
    "coreMasteries": [
      "Context Pruning: Strip heavy tool results from historical turns.",
      "Summarization Compaction: Compress long chat histories into structured system summaries."
    ],
    "coreMasteriesVI": [
      "Cắt tỉa Context: Tước bỏ kết quả tool nặng trong các lượt lịch sử quá khứ.",
      "Tóm tắt Nén: Nén lịch sử hội thoại dài thành bản tóm tắt hệ thống có cấu trúc."
    ],
    "examTraps": [
      "⚠️ TRAP: Resending un-pruned 100k+ token histories with raw file outputs on every single turn."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Gửi lại toàn bộ lịch sử 100k+ token chứa kết quả đọc file thô trong mỗi lượt gọi API."
    ]
  },
  {
    "id": 12,
    "title": "Chapter 12: Provenance Preservation & Source Citation",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "estimatedMinutes": 20,
    "summary": "Master Claim-Source Mapping, URL Grounding, and Audit Trail Preservation.",
    "summaryVI": "Nắm vững kỹ thuật Ánh xạ Tuyên bố - Nguồn (Claim-Source Mapping), Kiểm chứng URL và Lưu giữ Vết Kiểm toán (Audit Trail).",
    "learningObjectives": [
      "Implement Claim-Source Mapping to link generated claims to verified source documents.",
      "Enforce mandatory source citations in system prompts.",
      "Maintain unbroken audit trails for compliance."
    ],
    "learningObjectivesVI": [
      "Thực thi Ánh xạ Tuyên bố - Nguồn để liên kết các kết luận với tài liệu nguồn gốc đã xác minh.",
      "Bắt buộc trích dẫn nguồn tài liệu trong System Prompt.",
      "Duy trì vết kiểm toán (Audit Trail) liền mạch cho tính tuân thủ."
    ],
    "examTip": "⚡ CCAF Exam Tip: Require Claude to cite exact XML document IDs or line ranges when extracting facts from multi-document contexts.",
    "examTipVI": "Mẹo thi CCAF: Yêu cầu Claude trích dẫn chính xác ID tài liệu XML hoặc khoảng dòng khi bốc tách dữ liệu từ nhiều văn bản.",
    "sections": [
      {
        "heading": "12.1 Provenance Preservation Architecture",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Requirement</th><th>System Prompt Constraint</th><th>Output Citation Format</th></tr></thead><tbody><tr><td>📌 <strong>Strict Provenance</strong></td><td>\"Every claim must reference a valid <code>doc_id</code> inside <code>&lt;doc id=\"...\"&gt;</code>\"</td><td><code>\"According to [Doc 2, L45]...\"</code></td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Yêu cầu Nguồn gốc</th><th>Ràng buộc trong System Prompt</th><th>Định dạng Trích dẫn Đầu ra</th></tr></thead><tbody><tr><td>📌 <strong>Nguồn gốc Chặt chẽ</strong></td><td>\"Mọi kết luận bắt buộc phải trích dẫn <code>doc_id</code> hợp lệ bên trong thẻ <code>&lt;doc id=\"...\"&gt;</code>\"</td><td><code>\"Theo nguồn [Doc 2, L45]...\"</code></td></tr></tbody></table></div>"
      },
      {
        "heading": "12.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 12</div><div class=\"kc-question\">Question: How do you prevent an AI research agent from fabricating unverified claims in legal reports?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Enforce Claim-Source Mapping in system prompt: require every statement to include an explicit inline XML citation linking directly to a retrieved source document ID.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 12</div><div class=\"kc-question\">Câu hỏi: Làm thế nào để ngăn chặn một Agent nghiên cứu AI tự bịa ra các kết luận chưa được xác minh trong báo cáo pháp lý?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>Thực thi Ánh xạ Tuyên bố - Nguồn (Claim-Source Mapping) trong system prompt: bắt buộc mỗi câu khẳng định phải chứa trích dẫn XML liên kết trực tiếp tới ID tài liệu nguồn đã đọc.</div></div>"
      }
    ],
    "coreMasteries": [
      "Claim-Source Mapping: Link statements directly to source document identifiers.",
      "Auditability: Preserve raw retrieval context for legal compliance."
    ],
    "coreMasteriesVI": [
      "Ánh xạ Nguồn: Liên kết trực tiếp từng câu khẳng định với mã tài liệu nguồn.",
      "Tính Kiểm toán: Lưu giữ context bốc tách thô cho tính tuân thủ pháp lý."
    ],
    "examTraps": [
      "⚠️ TRAP: Allowing model to output summary claims without mandatory document citation tags."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Cho phép mô hình đưa ra các khẳng định tóm tắt mà không có thẻ trích dẫn tài liệu bắt buộc."
    ]
  },
  {
    "id": 13,
    "title": "Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "estimatedMinutes": 20,
    "summary": "Master GlobTool, GrepTool, FileReadTool, and efficient codebase search workflows.",
    "summaryVI": "Nắm vững cách sử dụng GlobTool, GrepTool, FileReadTool và quy trình tìm kiếm mã nguồn hiệu quả trong Claude Code.",
    "learningObjectives": [
      "Enforce Glob/Grep First search workflow before inspecting file contents.",
      "Understand built-in tool boundaries vs raw terminal bash commands.",
      "Optimize codebase search speed and token efficiency."
    ],
    "learningObjectivesVI": [
      "Tuân thủ quy trình tìm kiếm Glob/Grep First trước khi đọc chi tiết nội dung file.",
      "Hiểu ranh giới giữa Built-in Tools chuyên biệt vs lệnh bash thô.",
      "Tối ưu tốc độ tìm kiếm mã nguồn và hiệu quả tiêu thụ token."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always use GlobTool to find file paths and GrepTool to locate function symbols before calling FileReadTool.",
    "examTipVI": "Mẹo thi CCAF: Luôn dùng GlobTool để tìm đường dẫn file và GrepTool để định vị từ khóa hàm trước khi gọi FileReadTool.",
    "sections": [
      {
        "heading": "13.1 Efficient Codebase Search Tool Hierarchy",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Search Stage</th><th>Recommended Built-in Tool</th><th>Architectural Benefit</th></tr></thead><tbody><tr><td>1. Locate Files</td><td><code>GlobTool</code> (e.g. <code>*.js</code>)</td><td>Finds paths without reading file bytes</td></tr><tr><td>2. Locate Symbols</td><td><code>GrepTool</code> (e.g. <code>pattern</code>)</td><td>Finds line numbers without loading whole files</td></tr><tr><td>3. Inspect Target</td><td><code>FileReadTool</code> (with start/end lines)</td><td>Loads targeted snippet into context efficiently</td></tr></tbody></table></div>",
        "contentVI": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Giai đoạn Tìm kiếm</th><th>Built-in Tool Được Khuyên dùng</th><th>Lợi ích Kiến trúc</th></tr></thead><tbody><tr><td>1. Định vị Đường dẫn File</td><td><code>GlobTool</code> (vd: <code>*.js</code>)</td><td>Tìm file theo mẫu đường dẫn mà không tốn token đọc file</td></tr><tr><td>2. Định vị Từ khóa / Hàm</td><td><code>GrepTool</code> (vd: <code>pattern</code>)</td><td>Tìm chính xác số dòng mà không cần nạp toàn bộ file</td></tr><tr><td>3. Đọc Chi tiết Đối tượng</td><td><code>FileReadTool</code> (truyền dòng đầu/dòng cuối)</td><td>Nạp chính xác đoạn code cần thiết vào context cực kỳ tiết kiệm</td></tr></tbody></table></div>"
      },
      {
        "heading": "13.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 13</div><div class=\"kc-question\">Question: What is the correct 3-step tool execution sequence for fixing a bug in a large codebase?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>1. Use <code>GlobTool</code> to locate file structure.<br>2. Use <code>GrepTool</code> to pin-point error string/function line numbers.<br>3. Use <code>FileReadTool</code> to view specific lines before editing.</div></div>",
        "contentVI": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KIỂM TRA KIẾN THỨC — CHƯƠNG 13</div><div class=\"kc-question\">Câu hỏi: Quy trình 3 bước thực thi tool chuẩn xác nhất để sửa lỗi trong một dự án mã nguồn lớn là gì?</div><button class=\"kc-toggle-btn\">💡 Bấm để xem đáp án & giải thích chuẩn từ Anthropic</button><div class=\"kc-answer\"><strong>Đáp án chuẩn Anthropic:</strong><br>1. Dùng <code>GlobTool</code> để định vị cấu trúc file.<br>2. Dùng <code>GrepTool</code> để tìm chính xác số dòng chứa chuỗi lỗi/hàm.<br>3. Dùng <code>FileReadTool</code> để đọc các dòng cụ thể trước khi sửa code.</div></div>"
      }
    ],
    "coreMasteries": [
      "Glob/Grep First: Always filter file paths and search symbols before reading content.",
      "Line-range Reads: Pass specific start/end line parameters to FileReadTool."
    ],
    "coreMasteriesVI": [
      "Glob/Grep First: Luôn lọc đường dẫn file và tìm từ khóa trước khi đọc nội dung.",
      "Đọc theo khoảng dòng: Truyền tham số dòng bắt đầu/kết thúc cho FileReadTool."
    ],
    "examTraps": [
      "⚠️ TRAP: Reading entire 5,000-line codebase files into context using raw cat commands without using Glob/Grep first."
    ],
    "examTrapsVI": [
      "⚠️ BẪY: Đọc toàn bộ file 5,000 dòng vào context bằng lệnh cat thô mà không dùng Glob/Grep trước."
    ]
  }
];
