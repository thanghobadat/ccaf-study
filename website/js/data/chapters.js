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
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong></p><p>Claude API tại endpoint <code>/v1/messages</code> vận hành theo mô hình Request-Response Stateless. Yêu cầu JSON bao gồm 8 tham số cốt lõi:</p><ul><li><code>model</code>: Định danh mô hình (vd: <code>claude-3-5-sonnet-20241022</code>).</li><li><code>messages</code>: Mảng lịch sử hội thoại <code>user</code> và <code>assistant</code>. Phải gửi lại toàn bộ trong mỗi lần gọi.</li><li><code>system</code>: Chỉ thị cấp hệ thống nằm ngoài mảng messages.</li><li><code>max_tokens</code>: Giới hạn token đầu ra bắt buộc phải khai báo.</li><li><code>temperature</code>: Mức độ sáng tạo (0.0 cho code/JSON, 0.7-1.0 cho sáng tạo).</li><li><code>stop_sequences</code>: Chuỗi ngắt ký tự tùy chỉnh.</li><li><code>tools</code> & <code>tool_choice</code>: Danh sách công cụ và chế độ kích hoạt tool.</li></ul>"
      },
      {
        "heading": "1.2 API Response Struct & The stop_reason State Machine",
        "content": "<p>The response payload from <code>/v1/messages</code> contains metadata and content generated by Claude. Crucially, the <code>stop_reason</code> field acts as a <strong>State Machine Control Flag</strong> driving client application execution:</p><div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>stop_reason Value</th><th>Meaning & Trigger</th><th>Client Backend State Transition Required</th></tr></thead><tbody><tr><td><code>\"end_turn\"</code></td><td>Claude completed generation naturally.</td><td>Render final answer to user. Turn completed.</td></tr><tr><td><code>\"tool_use\"</code></td><td>Claude generated a tool invocation call block.</td><td>Pause response rendering, parse tool call ID/args, execute code at Client Backend, wrap result in <code>tool_result</code>, and invoke API again.</td></tr><tr><td><code>\"max_tokens\"</code></td><td>Generation hit maximum token limit mid-sentence.</td><td>Response is truncated! Prompt continuation or resend with higher <code>max_tokens</code>.</td></tr><tr><td><code>\"stop_sequence\"</code></td><td>Claude encountered a custom stop sequence.</td><td>Intercept custom stop delimiter and execute custom domain parser.</td></tr></tbody></table></div><p>The response also includes <code>usage</code> tracking <code>input_tokens</code>, <code>output_tokens</code>, and Prompt Caching metrics (<code>cache_read_input_tokens</code>, <code>cache_creation_input_tokens</code>).</p>",
        "codeExample": "// API Response Payload\n{\n  \"id\": \"msg_01A8...\",\n  \"type\": \"message\",\n  \"role\": \"assistant\",\n  \"model\": \"claude-3-5-sonnet-20241022\",\n  \"stop_reason\": \"tool_use\",\n  \"stop_sequence\": null,\n  \"usage\": {\n    \"input_tokens\": 450,\n    \"output_tokens\": 85\n  },\n  \"content\": [\n    {\n      \"type\": \"tool_use\",\n      \"id\": \"toolu_01X...\",\n      \"name\": \"get_user\",\n      \"input\": {\"user_id\": \"usr_99\"}\n    }\n  ]\n}",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong></p><p>Phản hồi API chứa trường <code>stop_reason</code> đóng vai trò cờ điều khiển luồng (State Machine Flag) cho ứng dụng Backend ở Client:</p><ul><li><code>\"end_turn\"</code>: Kết thúc lượt trả lời tự nhiên.</li><li><code>\"tool_use\"</code>: Claude phát lệnh gọi tool, Backend cần thực thi hàm và gửi lại <code>tool_result</code>.</li><li><code>\"max_tokens\"</code>: Câu trả lời bị ngắt giữa chừng do đụng trần token, cần tăng <code>max_tokens</code> hoặc bắt tiếp tục.</li><li><code>\"stop_sequence\"</code>: Gặp chuỗi ngắt tùy chỉnh.</li></ul>"
      },
      {
        "heading": "1.3 System Prompt Role & Over-Instruction Traps",
        "content": "<p>The <code>system</code> parameter defines overarching operational constraints. To protect system prompts from user prompt injection, encapsulate untrusted data in XML tags (e.g. <code>&lt;user_query&gt;...&lt;/user_query&gt;</code>).</p><div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 BAD PATTERN (Over-Instruction)</div><pre><code>\"system\": \"Always verify customer ID before answering any query.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Result: Triggers unnecessary get_customer tool calls even when user asks generic store hours!</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 GOOD PATTERN (Conditional Directive)</div><pre><code>\"system\": \"When account-specific details are requested, verify customer ID first.\"</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Result: Tool is invoked only when relevant to account queries.</div></div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Tránh chỉ thị tuyệt đối vô lý trong System Prompt. Sử dụng các câu lệnh điều kiện để tránh việc Claude tự động gọi tool dư thừa.</p>"
      },
      {
        "heading": "1.4 Context Window Token Mechanics & Lost-in-the-Middle",
        "content": "<p>Claude 3.5/3.7 Sonnet supports a <strong>200,000 token Context Window</strong>. Token consumption is calculated as:</p><ul><li><strong>English Text:</strong> ~3.5 to 4 characters per token.</li><li><strong>Code & Vietnamese Text:</strong> ~1 to 2.5 characters per token.</li></ul><p><strong>Lost-in-the-Middle Effect:</strong> Attention weights in Transformer architectures decay when processing information located in the middle 60% of long contexts (100k+ tokens). Key instructions, schemas, or constraints must be placed at the very <strong>START</strong> (System Prompt) or <strong>END</strong> (latest User Turn) of the prompt payload.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Quản lý Context Window 200,000 tokens. Hiệu ứng Lost-in-the-Middle làm suy giảm khả năng chú ý ở giữa tài liệu dài. Luôn đặt chỉ thị quan trọng ở ngay ĐẦU hoặc ĐUÔI context payload.</p>"
      },
      {
        "heading": "1.5 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 1</div><div class=\"kc-question\">Question: An application receives an API response with stop_reason = \"max_tokens\". What problem has occurred and what is the proper fix?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>- <strong>Problem:</strong> Claude's response was truncated mid-sentence because it hit the designated max_tokens limit.<br>- <strong>Fix:</strong> Increase the <code>max_tokens</code> parameter in the request or send a follow-up user turn asking Claude to continue from the last generated sentence.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Khi stop_reason = \"max_tokens\", phản hồi bị ngắt câu giữa chừng. Khắc phục bằng cách tăng max_tokens hoặc gửi tin nhắn tiếp tục.</p>"
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
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong></p><p>Vòng lặp Tool Use diễn ra qua 4 bước chuẩn: Định nghĩa Tools ➔ Mô hình trả <code>tool_use</code> ➔ Client tự chạy code ở Backend ➔ Client gửi lại <code>tool_result</code> cho Claude.</p>"
      },
      {
        "heading": "2.2 Granular Tools vs Monolithic Tools",
        "content": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 MONOLITHIC TOOL (Bad Pattern)</div><p style=\"font-size: 0.85rem;\">Single tool with 12 parameters trying to handle create, update, delete, search:</p><pre><code>{\"name\": \"manage_users\", \"input_schema\": {...12_fields...}}</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ High risk of parameter confusion and validation failure.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 GRANULAR TOOLS (Good Pattern)</div><p style=\"font-size: 0.85rem;\">Dedicated single-purpose tools with tight schemas:</p><pre><code>{\"name\": \"get_user\"}, {\"name\": \"update_user_email\"}</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Highly reliable tool selection and execution.</div></div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Tránh thiết kế tool cồng kềnh chứa hàng chục tham số (Monolithic Tools). Hãy chia nhỏ thành các công cụ đơn nhiệm tinh gọn (Granular Tools) để mô hình chọn chính xác 100%.</p>"
      },
      {
        "heading": "2.3 tool_choice Modes & Graceful Error Handling",
        "content": "<p>The <code>tool_choice</code> parameter controls tool invocation enforcement:</p><ul><li><code>\"auto\"</code>: Default mode. Claude decides whether to call a tool or reply with text.</li><li><code>\"any\"</code>: Forces Claude to execute at least one tool turn.</li><li><code>\"tool\"</code>: Forces Claude to execute a specific named tool (e.g. <code>{\"type\": \"tool\", \"name\": \"get_user\"}</code>).</li></ul><p><strong>Graceful Failure:</strong> When external tools encounter network errors or 500 exceptions, return a <code>tool_result</code> with <code>\"is_error\": true</code> rather than throwing an uncaught backend exception!</p>",
        "codeExample": "// Returning Graceful Error in tool_result\n{\n  \"role\": \"user\",\n  \"content\": [\n    {\n      \"type\": \"tool_result\",\n      \"tool_use_id\": \"toolu_01X...\",\n      \"is_error\": true,\n      \"content\": \"Database Connection Timeout (Error 500)\"\n    }\n  ]\n}",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Các chế độ tool_choice gồm auto, any và tool. Khi tool bị lỗi, trả về is_error: true để Claude biết và xử lý mượt mà.</p>"
      },
      {
        "heading": "2.4 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 2</div><div class=\"kc-question\">Question: An external weather API tool experiences a 500 Network Error. How should the client app respond to Claude?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Return a <code>tool_result</code> content block containing <code>\"is_error\": true</code> and the raw error text. Do not throw uncaught exceptions or return empty strings!</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Khi tool bị lỗi, luôn trả về tool_result chứa is_error: true để Claude biết và chọn phương án dự phòng khác.</p>"
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
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Mô hình Orchestrator-Worker (Hub-and-Spoke) giúp chia nhỏ bài toán lớn. Coordinator đóng vai trò lập kế hoạch và tổng hợp, trong khi các Subagents thực hiện tác vụ trong không gian nhớ cô lập (Context Isolation).</p>"
      },
      {
        "heading": "3.2 Subagent Declaration with AgentDefinition SDK",
        "content": "<p>In Claude Agent SDK, Subagents are programmatically defined using <code>AgentDefinition</code>:</p>",
        "codeExample": "# AgentDefinition SDK Structure (Python / TypeScript)\nfrom claude_agent_sdk import AgentDefinition, Tool\n\ncode_reviewer_agent = AgentDefinition(\n    name=\"CodeReviewer\",\n    description=\"Security reviewer specializing in static analysis\",\n    tools=[\n        Tool(name=\"read_file\", description=\"Read file contents\"),\n        Tool(name=\"run_linter\", description=\"Run static linter\")\n    ],\n    prompt=\"You are a Senior Code Reviewer. Analyze assigned code files for security vulnerabilities.\"\n)",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Mỗi Subagent được định nghĩa bằng cấu trúc AgentDefinition gồm tên, mô tả, danh sách tool được cấp phép và system prompt riêng.</p>"
      },
      {
        "heading": "3.3 Task Tool Input: BAD vs GOOD Pattern",
        "content": "<div class=\"comparison-grid\"><div class=\"card-bad\"><div class=\"card-header-bad\">🔴 BAD PATTERN (Context Bloat)</div><pre><code>// ❌ BAD: Injecting 50 codebase files into prompt\n\"tools\": [{\n  \"name\": \"Task\",\n  \"input\": {\n    \"subagent\": \"CodeReviewer\",\n    \"prompt\": \"Review main.js. Here is full project source: [50_FILES_TEXT...]\"\n  }\n}]</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;\">❌ Result: Wastes tokens, instantly overflows Subagent context window.</div></div><div class=\"card-good\"><div class=\"card-header-good\">🟢 GOOD PATTERN (Lean Directives)</div><pre><code>// ✅ GOOD: Passing lean instruction & file path\n\"tools\": [{\n  \"name\": \"Task\",\n  \"input\": {\n    \"subagent\": \"CodeReviewer\",\n    \"prompt\": \"Use read_file tool to inspect 'src/main.js' and report top 3 security flaws.\"\n  }\n}]</code></pre><div style=\"font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;\">✅ Result: Subagent autonomously invokes read_file tool as needed.</div></div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Đừng nhét toàn bộ tài liệu dự án vào prompt của Task tool. Hãy chỉ truyền chỉ thị tinh gọn kèm đường dẫn file để Subagent tự dùng tool đọc khi cần.</p>"
      },
      {
        "heading": "3.4 Hooks System vs System Prompt Matrix",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>Evaluation Criteria</th><th>🛡️ PreToolUse / PostToolUse Hooks</th><th>💬 System Prompt Instructions</th></tr></thead><tbody><tr><td><strong>Determinism Guarantee</strong></td><td><span class=\"status-badge yes\">✅ 100% Deterministic</span></td><td><span class=\"status-badge warn\">⚠️ Probabilistic (~95-98%)</span></td></tr><tr><td><strong>Prompt Injection Defense</strong></td><td><span class=\"status-badge yes\">✅ 100% Secure (Server-side)</span></td><td><span class=\"status-badge no\">❌ Vulnerable to adversarial prompts</span></td></tr><tr><td><strong>Execution Layer</strong></td><td>Client Application / Server Code</td><td>LLM Context Window Memory</td></tr></tbody></table></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Hooks (PreToolUse) chặn lệnh sai ở tầng Client chắc chắn 100% (Deterministic), trong khi System Prompt chỉ mang tính xác suất (Probabilistic).</p>"
      },
      {
        "heading": "3.5 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 3</div><div class=\"kc-question\">Question: Coordinator needs 3 Subagents to analyze 3 files in parallel, but they run sequentially. What is the root technical cause?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>- <strong>Cause:</strong> Coordinator emitted Task tool_use calls across multiple separate API response turns.<br>- <strong>Fix:</strong> Ensure Coordinator emits multiple <code>Task</code> tool_use call blocks within the <strong>SAME API response message turn</strong>.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Để Subagents chạy song song thật sự (Parallel Execution), Coordinator phải phát ra nhiều thẻ gọi tool Task trong CÙNG MỘT message phản hồi API.</p>"
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
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> MCP đóng vai trò như chuẩn USB-C mở giúp Claude (MCP Client) kết nối an toàn với Cơ sở dữ liệu hay GitHub (MCP Server).</p>"
      },
      {
        "heading": "4.2 The 3 MCP Core Primitives",
        "content": "<div class=\"decision-matrix-wrap\"><table class=\"decision-matrix\"><thead><tr><th>MCP Primitive</th><th>Technical Nature</th><th>Example Use Case</th></tr></thead><tbody><tr><td><strong>Tools</strong></td><td>Executable side-effecting functions.</td><td><code>create_issue</code>, <code>execute_query</code></td></tr><tr><td><strong>Resources</strong></td><td>Read-only state, schemas, or file logs.</td><td><code>file:///logs/app.log</code>, DB Schema</td></tr><tr><td><strong>Prompts</strong></td><td>Parameterized instruction templates.</td><td>PR review prompt template</td></tr></tbody></table></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> 3 thành phần cốt lõi của MCP: Tools (Hàm thực thi), Resources (Tài nguyên đọc), và Prompts (Mẫu hướng dẫn có tham số).</p>"
      },
      {
        "heading": "4.3 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 4</div><div class=\"kc-question\">Question: Why must MCP Tool descriptions be exceptionally detailed and explicit?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Ambiguous MCP descriptions cause Claude to fail to recognize the custom server capabilities, causing it to fall back to executing risky raw terminal commands (bash/sed).</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Mô tả MCP Tool phải chi tiết để tránh trường hợp Claude không nhận diện được và quay sang dùng lệnh Terminal thô rủi ro.</p>"
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
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> File <code>CLAUDE.md</code> chỉ nên chứa các lệnh test/build ngắn gọn cốt lõi, tránh nhét hàng ngàn dòng tài liệu rườm rà làm phình context.</p>"
      },
      {
        "heading": "5.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 5</div><div class=\"kc-question\">Question: Which CLI flag is required when running Claude Code in automated GitHub Actions PR review pipelines?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Use <code>--dangerously-skip-permissions</code> because GitHub Actions runners are non-interactive isolated sandbox environments.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Dùng cờ <code>--dangerously-skip-permissions</code> khi chạy Claude Code tự động trong GitHub Actions CI/CD.</p>"
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
        "heading": "6.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 6: Advanced Prompt Engineering & Structured Output</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 6: Advanced Prompt Engineering & Structured Output</em>.</p>"
      },
      {
        "heading": "6.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 6</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 6: Advanced Prompt Engineering & Structured Output?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 6: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 6: Advanced Prompt Engineering & Structured Output.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 6: Advanced Prompt Engineering & Structured Output.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
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
      "Understand the fundamental technical principles of Chapter 7: Advanced Schema Design & Resilient Enums.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 7: Advanced Schema Design & Resilient Enums.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 7: Advanced Schema Design & Resilient Enums.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "7.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 7: Advanced Schema Design & Resilient Enums</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 7: Advanced Schema Design & Resilient Enums</em>.</p>"
      },
      {
        "heading": "7.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 7</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 7: Advanced Schema Design & Resilient Enums?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 7: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 7: Advanced Schema Design & Resilient Enums.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 7: Advanced Schema Design & Resilient Enums.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
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
      "Understand the fundamental technical principles of Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "8.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 8: Cost Routing & SLA — Messages vs Batch API</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 8: Cost Routing & SLA — Messages vs Batch API</em>.</p>"
      },
      {
        "heading": "8.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 8</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 8: Cost Routing & SLA — Messages vs Batch API?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 8: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
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
      "Understand the fundamental technical principles of Chapter 9: Escalation & Human-in-the-Loop.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 9: Escalation & Human-in-the-Loop.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 9: Escalation & Human-in-the-Loop.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "9.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 9: Escalation & Human-in-the-Loop</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 9: Escalation & Human-in-the-Loop</em>.</p>"
      },
      {
        "heading": "9.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 9</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 9: Escalation & Human-in-the-Loop?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 9: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 9: Escalation & Human-in-the-Loop.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 9: Escalation & Human-in-the-Loop.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
    ]
  },
  {
    "id": 10,
    "title": "Chapter 10: Multi-Agent Reliability & Error Recovery",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 10: Multi-Agent Reliability & Error Recovery.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 10: Multi-Agent Reliability & Error Recovery.",
    "learningObjectives": [
      "Understand the fundamental technical principles of Chapter 10: Multi-Agent Reliability & Error Recovery.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 10: Multi-Agent Reliability & Error Recovery.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 10: Multi-Agent Reliability & Error Recovery.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "10.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 10: Multi-Agent Reliability & Error Recovery</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 10: Multi-Agent Reliability & Error Recovery</em>.</p>"
      },
      {
        "heading": "10.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 10</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 10: Multi-Agent Reliability & Error Recovery?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 10: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 10: Multi-Agent Reliability & Error Recovery.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 10: Multi-Agent Reliability & Error Recovery.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
    ]
  },
  {
    "id": 11,
    "title": "Chapter 11: Advanced Context Management & Context Pruning",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 11: Advanced Context Management & Context Pruning.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 11: Advanced Context Management & Context Pruning.",
    "learningObjectives": [
      "Understand the fundamental technical principles of Chapter 11: Advanced Context Management & Context Pruning.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 11: Advanced Context Management & Context Pruning.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 11: Advanced Context Management & Context Pruning.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "11.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 11: Advanced Context Management & Context Pruning</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 11: Advanced Context Management & Context Pruning</em>.</p>"
      },
      {
        "heading": "11.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 11</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 11: Advanced Context Management & Context Pruning?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 11: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 11: Advanced Context Management & Context Pruning.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 11: Advanced Context Management & Context Pruning.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
    ]
  },
  {
    "id": 12,
    "title": "Chapter 12: Provenance Preservation & Source Citation",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 12: Provenance Preservation & Source Citation.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 12: Provenance Preservation & Source Citation.",
    "learningObjectives": [
      "Understand the fundamental technical principles of Chapter 12: Provenance Preservation & Source Citation.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 12: Provenance Preservation & Source Citation.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 12: Provenance Preservation & Source Citation.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "12.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 12: Provenance Preservation & Source Citation</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 12: Provenance Preservation & Source Citation</em>.</p>"
      },
      {
        "heading": "12.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 12</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 12: Provenance Preservation & Source Citation?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 12: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 12: Provenance Preservation & Source Citation.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 12: Provenance Preservation & Source Citation.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
    ]
  },
  {
    "id": 13,
    "title": "Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "estimatedMinutes": 20,
    "summary": "Master the core technical architecture and exam requirements for Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
    "summaryVI": "Nắm vững bản chất kỹ thuật sâu và các dạng câu hỏi tình huống trong Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
    "learningObjectives": [
      "Understand the fundamental technical principles of Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
      "Apply production design patterns recommended by Anthropic architects.",
      "Avoid common anti-pattern traps in CCAF exam scenarios."
    ],
    "learningObjectivesVI": [
      "Hiểu rõ các nguyên tắc kỹ thuật cốt lõi của Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
      "Áp dụng các mẫu thiết kế thực tế theo chuẩn Anthropic.",
      "Phòng tránh các bẫy câu hỏi anti-pattern trong đề thi CCAF."
    ],
    "examTip": "⚡ CCAF Exam Tip: Always obey strict safety policies, minimize token context bloat, and prefer deterministic server controls for Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
    "examTipVI": "Mẹo thi CCAF: Luôn tuân thủ nguyên tắc tối giản context, xử lý lỗi an toàn và kiểm soát bằng server backend.",
    "sections": [
      {
        "heading": "13.1 Technical Overview & Architecture Patterns",
        "content": "<p>Deep technical overview and design patterns for <strong>Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search</strong> according to Anthropic production benchmarks.</p>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Phân tích bản chất kỹ thuật chuyên sâu và các mẫu thiết kế kiến trúc chuẩn Anthropic cho <em>Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search</em>.</p>"
      },
      {
        "heading": "13.2 Knowledge Check",
        "content": "<div class=\"knowledge-check\"><div class=\"kc-title\">🧠 KNOWLEDGE CHECK — CHAPTER 13</div><div class=\"kc-question\">Question: What is the recommended architectural solution for Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search?</div><button class=\"kc-toggle-btn\">💡 Click to reveal official Anthropic answer</button><div class=\"kc-answer\"><strong>Official Anthropic Answer:</strong><br>Follow the production guidelines established in Anthropic's Architect Playbook: use deterministic server-side controls and lean context boundaries.</div></div>",
        "contentVI": "<p><strong>Bản dịch Tiếng Việt:</strong> Giải pháp kiến trúc chuẩn Anthropic cho Chương 13: kiểm soát chắc chắn bằng server backend và tối ưu context window.</p>"
      }
    ],
    "coreMasteries": [
      "Mastery of key concepts in Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
      "Optimization of token usage and latency SLAs."
    ],
    "coreMasteriesVI": [
      "Làm chủ các khái niệm cốt lõi của Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
      "Tối ưu hóa token và SLA độ trễ."
    ],
    "examTraps": [
      "⚠️ Avoid over-complicated architectures and unhandled exceptions."
    ],
    "examTrapsVI": [
      "⚠️ Tránh các kiến trúc quá phức tạp và các lỗi không được bắt xử lý mượt mà."
    ]
  }
];
