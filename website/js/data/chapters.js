/* CCAF Learning Hub - 13 Complete Theory Chapters (English-First + Hidden Vietnamese Translation Accordions) */

const CHAPTERS_DATA = [
  {
    id: 1,
    title: "Chapter 1: Claude Messages API — Foundation & Request Lifecycle",
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    estimatedMinutes: 25,
    summary: "Master the structure of Claude Messages API request/response payloads, stateless nature, message roles, stop_reason fields, System Prompt design, and Context Window management.",
  summaryVI: "Nắm vững cấu trúc Request/Response Payload của Claude Messages API, bản chất Stateless không lưu trạng thái, vai trò các message (user, assistant, tool), 4 giá trị stop_reason, thiết kế System Prompt và kỹ thuật quản lý Context Window.",
  learningObjectivesVI: [
    "Hiểu tại sao Claude API là Stateless và tại sao bắt buộc resend lại toàn bộ lịch sử trong mỗi lần gọi.",
    "Phân biệt 3 vai trò message: user, assistant, và tool (tool_result content block).",
    "Xử lý chuẩn xác 4 giá trị stop_reason: end_turn, tool_use, max_tokens, và stop_sequence.",
    "Nhận biết bẫy over-instruction trong System Prompt gây gọi tool thừa vãi.",
    "Khắc phục thách thức Context Window: Lost-in-the-middle, phình tool result và mất mát khi tóm tắt lũy tiến."
  ],
  examTipVI: "Mẹo thi CCAF: Claude API là Stateless. Luôn đặt các chỉ thị quan trọng ở ngay ĐẦU hoặc ĐUÔI payload context để tránh hiệu ứng Lost-in-the-middle.",
  coreMasteriesVI: [
    "API Stateless: Không có session lưu giữa các lần gọi; client phải tự giữ lịch sử hội thoại.",
    "Message Roles: user (đầu vào), assistant (đầu ra mô hình), tool (kết quả tool gửi lại qua tool_result).",
    "stop_reason = end_turn: Mô hình hoàn thành xong câu trả lời.",
    "stop_reason = tool_use: Mô hình yêu cầu phía Client chạy tool trước khi tiếp tục.",
    "stop_reason = max_tokens: Phản hồi bị ngắt do chạm giới hạn token.",
    "Lost-in-the-middle: Thông tin ở giữa tài liệu dài dễ bị bỏ qua; luôn đưa thông tin quan trọng lên ĐẦU hoặc ĐUÔI."
  ],
  examTrapsVI: [
    "⚠️ BẪY 1: Lầm tưởng Claude tự lưu trí nhớ qua các lần gọi API mà không cần gửi lại tin nhắn cũ.",
    "⚠️ BẪY 2: Dùng chỉ thị tuyệt đối trong System Prompt như 'Luôn luôn kiểm tra ID khách hàng' khiến Claude gọi tool get_customer vô cớ.",
    "⚠️ BẪY 3: Nhầm lẫn giữa end_turn và max_tokens khi phân tích câu trả lời bị ngắt."
  ],
    learningObjectives: [
      "Understand why Claude API is Stateless and why complete message history must be resent in every call.",
      "Distinguish between message roles: user, assistant, and tool (tool_result content block).",
      "Correctly parse and handle all 4 stop_reason values: end_turn, tool_use, max_tokens, and stop_sequence.",
      "Identify over-instruction traps in System Prompts that cause unwarranted tool execution.",
      "Mitigate Context Window challenges: Lost-in-the-middle, tool result bloat, and progressive summarization loss."
    ],
    coreMasteries: [
      "Stateless API: No session state is retained between API calls; client must maintain conversation state.",
      "Message Roles: user (input), assistant (model output), tool (tool execution output wrapped in tool_result).",
      "stop_reason = 'end_turn': Model has finished generating response.",
      "stop_reason = 'tool_use': Model demands tool execution at client before proceeding.",
      "stop_reason = 'max_tokens': Output truncated due to token limit.",
      "Lost-in-the-middle: Information in middle of long prompts is easily overlooked; place critical items at top or bottom."
    ],
    examTraps: [
      "⚠️ TRAP 1: Assuming Claude automatically retains memory across API calls without resending past messages.",
      "⚠️ TRAP 2: Using absolute System Directives like 'Always verify customer ID' which forces premature get_customer calls.",
      "⚠️ TRAP 3: Confusing 'end_turn' with 'max_tokens' when inspecting truncated responses."
    ],
    selfChecklist: [
      "I can explain why full conversation history is required in every API request.",
      "I can handle all 4 stop_reason values programmatically at the client side.",
      "I can prevent System Prompt over-instruction bugs."
    ],
    sections: [
      {
        heading: "1.1 API Request Payload & Stateless Architecture",
        content: `
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Visual Analogy:</strong> Think of Claude Messages API as a doctor who sees you for a brand new appointment every single time. The doctor has zero memory of past visits. Every time you consult, you must bring your entire medical history booklet (the <code>messages</code> array).
          </div>
          <p>Claude API operates on a strict <strong>Stateless Request-Response Lifecycle</strong> via <code>/v1/messages</code>. The API retains no conversation state on server side. To maintain context, client applications must append past interactions to the <code>messages</code> payload.</p>
        `,
        codeExample: `{
  "model": "claude-sonnet-4-6",
  "max_tokens": 1024,
  "system": "You are an expert cloud architect assistant.",
  "messages": [
    {"role": "user", "content": "Hello!"},
    {"role": "assistant", "content": "Hello! How can I assist you today?"},
    {"role": "user", "content": "Explain Claude API architecture."}
  ]
}`,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong></p>
          <p>Claude API vận hành theo mô hình <strong>Request-Response Stateless (Không lưu trạng thái)</strong> tại endpoint <code>/v1/messages</code>. Máy chủ Claude không tự ghi nhớ lịch sử trò chuyện. Để duy trì ngữ cảnh hội thoại, ứng dụng của bạn ở phía Client bắt buộc phải gửi lại toàn bộ mảng <code>messages</code> chứa tất cả các tin nhắn cũ trong mỗi lần gọi API.</p>
        `
      },
      {
        heading: "1.2 Understanding stop_reason Payload Field",
        content: `
          <p>The <code>stop_reason</code> field in the API response dictates client control flow:</p>
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>stop_reason Value</th>
                  <th>Meaning</th>
                  <th>Client Action Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>"end_turn"</code></td>
                  <td>Model completed turn naturally.</td>
                  <td>Display response to end user.</td>
                </tr>
                <tr>
                  <td><code>"tool_use"</code></td>
                  <td>Model generated tool call block.</td>
                  <td>Execute tool at client and return tool_result.</td>
                </tr>
                <tr>
                  <td><code>"max_tokens"</code></td>
                  <td>Truncated due to token limit.</td>
                  <td>Increase max_tokens or prompt continuation.</td>
                </tr>
                <tr>
                  <td><code>"stop_sequence"</code></td>
                  <td>Matched custom stop pattern.</td>
                  <td>Handle custom application logic.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong></p>
          <p>Trường <code>stop_reason</code> phản hồi từ API chỉ định chính xác lý do Claude dừng sinh văn bản và quyết định luồng xử lý ở phía Client:</p>
          <ul>
            <li><code>"end_turn"</code>: Mô hình đã hoàn thành xong câu trả lời.</li>
            <li><code>"tool_use"</code>: Mô hình yêu cầu gọi công cụ, Backend của bạn phải thực thi hàm và gửi lại <code>tool_result</code>.</li>
            <li><code>"max_tokens"</code>: Phản hồi bị chạm trần token tối đa, cần tăng <code>max_tokens</code>.</li>
            <li><code>"stop_sequence"</code>: Gặp chuỗi ngắt ký tự tùy chỉnh.</li>
          </ul>
        `
      },
      {
        heading: "1.3 System Prompt Over-Instruction Traps",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 BAD PATTERN (Over-Instruction)</div>
              <pre><code>"system": "Always verify customer ID before answering any query."</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">
                ❌ Result: Triggers unnecessary get_customer tool calls even when user asks generic store hours!
              </div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GOOD PATTERN (Conditional Directive)</div>
              <pre><code>"system": "When account specific details are requested, verify customer ID first."</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">
                ✅ Result: Tool is invoked only when relevant to account queries.
              </div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong></p>
          <p>Tránh viết chỉ thị tuyệt đối quá mức trong System Prompt như <em>"Luôn luôn kiểm tra ID khách hàng"</em>. Điều này khiến Claude tự động gọi tool <code>get_customer</code> liên tục ngay cả đối với các thắc mắc thông thường như hỏi giờ mở cửa!</p>
        `
      },
      {
        heading: "1.4 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 1</div>
            <div class="kc-question">
              Question: When prompt size reaches 100,000 tokens, Claude occasionally ignores key constraints placed in the middle of document. What is this phenomenon and how to fix it?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              - <strong>Phenomenon:</strong> <strong>Lost-in-the-middle</strong> effect inherent in Transformer attention mechanisms.<br>
              - <strong>Mitigation:</strong> Place critical instructions, system rules, or target schemas at the very <strong>TOP or BOTTOM</strong> of the context payload.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Hiệu ứng Lost-in-the-middle xảy ra khi tài liệu quá dài. Giải pháp chuẩn Anthropic là đặt thông tin quan trọng nhất ở ngay ĐẦU hoặc ĐUÔI của prompt.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Claude API is Stateless. Always place critical directives at top/bottom of long context payloads to prevent Lost-in-the-middle issues."
  },
  {
    id: 2,
    title: "Chapter 2: Tools and tool_use — External Execution Loop",
    domain: "D2",
    domainTitle: "Tool Design & MCP Integration",
    estimatedMinutes: 25,
    summary: "Understand the 4-step Tool Use Loop, Granular vs Monolithic Tool design patterns, tool_choice modes, and graceful error handling with isError: true.",
  summaryVI: "Hiểu rõ Vòng lặp Tool Use 4 bước, mẫu thiết kế Granular Tools vs Monolithic Tools, các chế độ tool_choice (auto, any, tool), và kỹ thuật xử lý lỗi mượt mà với isError: true.",
  learningObjectivesVI: [
    "Nắm vững 4 bước của Vòng lặp thực thi Tool Use.",
    "Thiết kế các công cụ đơn nhiệm Granular Tools thay vì Monolithic Tools cồng kềnh.",
    "Phân biệt các chế độ tool_choice: auto, any, và tool.",
    "Trả về tool_result chứa isError: true để ngăn Agent bị crash."
  ],
  examTipVI: "Mẹo thi CCAF: Luôn chia nhỏ các công cụ phức tạp thành các Granular Tools đơn nhiệm để đạt độ tin cậy tối đa khi mô hình chọn tool.",
  coreMasteriesVI: [
    "Tool Execution Loop: Khai báo Tools -> stop_reason: tool_use -> Backend thực thi -> Phản hồi tool_result.",
    "Granular Tools: Các tool đơn nhiệm vượt trội hơn hẳn so với tool cồng kềnh đa tham số.",
    "tool_choice = auto: Chế độ mặc định để Claude tự quyết định có dùng tool hay không.",
    "tool_choice = any: Ép mô hình bắt buộc phải chọn ít nhất một tool.",
    "tool_choice = tool: Ép mô hình chọn đúng một tool chỉ định sẵn.",
    "Xử lý lỗi mượt: Trả về isError: true trong tool_result thay vì ném Exception."
  ],
  examTrapsVI: [
    "⚠️ BẪY 1: Tin rằng Claude tự chạy code tool bên trong server của Anthropic. Client backend của bạn mới là nơi thực thi code.",
    "⚠️ BẪY 2: Viết mô tả tool mơ hồ dẫn đến việc chọn sai tool hoặc quay sang chạy lệnh bash thô."
  ],
    learningObjectives: [
      "Master the 4 steps of the Tool Use Execution Loop.",
      "Design granular single-purpose tools instead of bloated monolithic tools.",
      "Differentiate tool_choice modes: auto, any, and tool.",
      "Return tool_result with isError: true to prevent agent crashes."
    ],
    coreMasteries: [
      "Tool Execution Loop: Tools Definition -> stop_reason: tool_use -> Client Execution -> tool_result Feedback.",
      "Granular Tools: Single-purpose focused tools dramatically outperform monolithic multi-argument tools.",
      "tool_choice = 'auto': Default mode where model decides whether to invoke tools.",
      "tool_choice = 'any': Forces model to execute at least one tool.",
      "tool_choice = 'tool': Forces model to execute one specific designated tool.",
      "Graceful Errors: Return isError: true in tool_result content block instead of throwing unhandled exceptions."
    ],
    examTraps: [
      "⚠️ TRAP 1: Believing Claude executes tool code internally. Client backend must execute code and return tool_result.",
      "⚠️ TRAP 2: Writing ambiguous tool descriptions leading to incorrect tool selection or bash fallback."
    ],
    selfChecklist: [
      "I can explain all 4 steps of the Tool Use Execution Loop.",
      "I know when to set tool_choice = auto vs any vs tool.",
      "I use isError: true to handle external tool failures."
    ],
    sections: [
      {
        heading: "2.1 The 4-Step Tool Use Execution Loop",
        content: `
          <div class="callout callout-title" style="background: rgba(14, 165, 233, 0.08); border-left: 4px solid var(--accent-blue); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Visual Analogy:</strong> Claude is like a specialist doctor issuing a lab order. The doctor does not perform the blood test themselves. They output a lab order (<code>stop_reason: tool_use</code>). The lab technician (your client application) performs the test and feeds the lab results back (<code>tool_result</code>).
          </div>
          <div class="diagram-flow">
            <div class="flow-step">
              <div class="flow-number">1</div>
              <div class="flow-content">
                <div class="flow-title">1. Tool Definition</div>
                <div class="flow-desc">Client passes array of available tools with name, description, and JSON schema.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">2</div>
              <div class="flow-content">
                <div class="flow-title">2. Model Decision (stop_reason: "tool_use")</div>
                <div class="flow-desc">Claude outputs tool_use content block with call ID and JSON parameters.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">3</div>
              <div class="flow-content">
                <div class="flow-title">3. Backend Execution</div>
                <div class="flow-desc">Client application catches call ID, executes local code/API, and gets raw response.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">4</div>
              <div class="flow-content">
                <div class="flow-title">4. tool_result Feedback</div>
                <div class="flow-desc">Client appends tool_result content block to messages array and calls API again.</div>
              </div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong></p>
          <p>Vòng lặp Tool Use diễn ra qua 4 bước chuẩn: Định nghĩa Tools ➔ Mô hình trả <code>tool_use</code> ➔ Client tự chạy code ở Backend ➔ Client gửi lại <code>tool_result</code> cho Claude.</p>
        `
      },
      {
        heading: "2.2 Granular Tools vs Monolithic Tools",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 MONOLITHIC TOOL (Bad Pattern)</div>
              <p style="font-size: 0.85rem;">Single tool with 12 parameters trying to handle create, update, delete, search:</p>
              <pre><code>{"name": "manage_users", "input_schema": {...12_fields...}}</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ High risk of parameter confusion and validation failure.</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GRANULAR TOOLS (Good Pattern)</div>
              <p style="font-size: 0.85rem;">Dedicated single-purpose tools with tight schemas:</p>
              <pre><code>{"name": "get_user"}, {"name": "update_user_email"}</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Highly reliable tool selection and execution.</div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Tránh thiết kế tool cồng kềnh chứa hàng chục tham số (Monolithic Tools). Hãy chia nhỏ thành các công cụ đơn nhiệm tinh gọn (Granular Tools) để mô hình chọn chính xác 100%.</p>
        `
      },
      {
        heading: "2.3 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 2</div>
            <div class="kc-question">
              Question: An external weather API tool experiences a 500 Network Error. How should the client app respond to Claude?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Return a <code>tool_result</code> content block containing <code>"isError": true</code> and the raw error text. Do not throw uncaught exceptions or return empty strings!
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Khi tool bị lỗi, luôn trả về <code>tool_result</code> chứa <code>"isError": true</code> để Claude biết và chọn phương án dự phòng khác thay vì ném Exception làm sập ứng dụng.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Always decompose complex multi-action tools into dedicated Granular Tools for maximum execution reliability."
  },
  {
    id: 3,
    title: "Chapter 3: Claude Agent SDK — Building Agentic Systems",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 30,
    summary: "Orchestrator-Worker pattern, Hub-and-Spoke topology, Context Isolation, Agentic Loop 4 steps, AgentDefinition SDK, Task Tool patterns, and Hooks system (PreToolUse/PostToolUse).",
  summaryVI: "Kiến trúc Orchestrator-Worker, topology Hub-and-Spoke, Context Isolation cô lập ngữ cảnh, Vòng lặp Agentic 4 bước, SDK AgentDefinition, mẫu Task Tool và hệ thống Hooks (PreToolUse/PostToolUse).",
  learningObjectivesVI: [
    "Nắm vững kiến trúc Orchestrator-Worker và topology Hub-and-Spoke.",
    "Hiểu rõ Context Isolation: Mỗi Subagent duy trì một không gian nhớ hội thoại độc lập.",
    "Định nghĩa các Agent bằng SDK AgentDefinition.",
    "Phân biệt mẫu truyền input cho Task tool: prompt tinh gọn vs prompt phình to.",
    "Thực thi chính sách an toàn 100% Deterministic bằng PreToolUse Hooks thay vì System Prompt xác suất."
  ],
  examTipVI: "Mẹo thi CCAF: Luôn dùng PreToolUse Hooks cho các chính sách bảo mật tuyệt đối và phát ra nhiều Task call trong cùng 1 turn để chạy song song.",
  coreMasteriesVI: [
    "Orchestrator-Worker: Lead Agent điều phối các Subagents chuyên biệt để thực hiện tác vụ đơn nhiệm.",
    "Context Isolation: Mỗi Subagent giữ mảng messages riêng, bảo vệ Context Window của Lead Agent.",
    "allowedTools = [Task]: Lead Agent cần có Task trong allowedTools để khởi tạo Subagent.",
    "Chạy song song: Yêu cầu Lead Agent phát ra nhiều thẻ gọi tool Task trong CÙNG MỘT message phản hồi API.",
    "Hooks > System Prompt: PreToolUse Hooks chặn lệnh ở tầng Client đảm bảo chính xác 100%."
  ],
  examTrapsVI: [
    "⚠️ BẪY 1: Quên cấp phép tool Task trong allowedTools khiến Coordinator chỉ mô tả việc giao việc chứ không thể thực thi.",
    "⚠️ BẪY 2: Lầm tưởng Subagent tự động thừa hưởng toàn bộ lịch sử tin nhắn của Coordinator.",
    "⚠️ BẪY 3: Dùng System Prompt 'Không được chạy rm -rf' để bảo mật thay vì dùng PreToolUse Hooks."
  ],
    learningObjectives: [
      "Master the Orchestrator-Worker architecture and Hub-and-Spoke topology.",
      "Understand Context Isolation: Subagents maintain independent conversation context.",
      "Define agents programmatically using AgentDefinition SDK.",
      "Differentiate Task tool input patterns: lean prompt vs bloated context.",
      "Enforce 100% deterministic safety policies using PreToolUse Hooks instead of probabilistic system prompts."
    ],
    coreMasteries: [
      "Orchestrator-Worker: Lead agent coordinates specialized Subagents to perform single-purpose tasks.",
      "Context Isolation: Each Subagent maintains a clean messages array, protecting Lead Agent context window.",
      "allowedTools = ['Task']: Lead Agent requires 'Task' in allowedTools array to spawn Subagents.",
      "Parallel Execution: Requires Lead Agent to emit multiple Task tool_use calls in the SAME API response turn.",
      "Hooks > System Prompt: PreToolUse Hooks intercept execution at client 100% deterministically."
    ],
    examTraps: [
      "⚠️ TRAP 1: Omitting 'Task' from allowedTools array causing Coordinator to describe delegation without executing it.",
      "⚠️ TRAP 2: Believing Subagents automatically inherit Coordinator message history.",
      "⚠️ TRAP 3: Relying on System Prompt 'Do not run rm -rf' for safety instead of PreToolUse Hooks."
    ],
    selfChecklist: [
      "I can explain why Subagents solve Context Window overflow.",
      "I understand Context Isolation between Coordinator and Subagents.",
      "I know the exact criteria for true Parallel Execution.",
      "I can write PreToolUse Hooks for safety enforcement."
    ],
    sections: [
      {
        heading: "3.1 Orchestrator-Worker & Hub-and-Spoke Topology",
        content: `
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Visual Analogy:</strong> The Coordinator is a Project Lead. When assigned a massive project, the Project Lead delegates tasks to 3 specialists (Frontend Subagent, Backend Subagent, QA Subagent). Each specialist works in their own room (isolated context) and submits final reports back.
          </div>
          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; margin: 1.25rem 0; text-align: center;">
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--accent-purple); margin-bottom: 0.75rem;">HUB-AND-SPOKE ARCHITECTURE TOPOLOGY</div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap;">
              <div style="background: rgba(139, 92, 246, 0.15); border: 1px solid var(--accent-purple); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: var(--accent-purple);">
                👑 Coordinator Agent<br><span style="font-weight:400; font-size:0.75rem;">(Plan & Synthesize)</span>
              </div>
              <div style="font-size: 1.5rem; color: var(--text-muted);">➔</div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="background: rgba(14, 165, 233, 0.15); border: 1px solid var(--accent-blue); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-blue);">
                  🛠️ Subagent 1: Research (Context A)
                </div>
                <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-emerald); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-emerald);">
                  💻 Subagent 2: Coder (Context B)
                </div>
              </div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong></p>
          <p>Mô hình Orchestrator-Worker (Hub-and-Spoke) giúp chia nhỏ bài toán lớn. Coordinator đóng vai trò lập kế hoạch và tổng hợp, trong khi các Subagents thực hiện tác vụ trong không gian nhớ cô lập (Context Isolation).</p>
        `
      },
      {
        heading: "3.2 Subagent Declaration with AgentDefinition SDK",
        content: `
          <p>In Claude Agent SDK, Subagents are programmatically defined using <code>AgentDefinition</code>:</p>
        `,
        codeExample: `# AgentDefinition SDK Structure (Python / TypeScript)
from claude_agent_sdk import AgentDefinition, Tool

code_reviewer_agent = AgentDefinition(
    name="CodeReviewer",
    description="Security reviewer specializing in static analysis",
    tools=[
        Tool(name="read_file", description="Read file contents"),
        Tool(name="run_linter", description="Run static linter")
    ],
    prompt="""You are a Senior Code Reviewer. 
Analyze assigned code files for security vulnerabilities."""
)`,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Mỗi Subagent được định nghĩa bằng cấu trúc <code>AgentDefinition</code> gồm tên, mô tả, danh sách tool được cấp phép và system prompt riêng.</p>
        `
      },
      {
        heading: "3.3 Task Tool Input: BAD vs GOOD Pattern",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 BAD PATTERN (Context Bloat)</div>
              <pre><code>// ❌ BAD: Injecting 50 codebase files into prompt
"tools": [{
  "name": "Task",
  "input": {
    "subagent": "CodeReviewer",
    "prompt": "Review main.js. Here is full project source: [50_FILES_TEXT...]"
  }
}]</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Result: Wastes tokens, instantly overflows Subagent context window.</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GOOD PATTERN (Lean Directives)</div>
              <pre><code>// ✅ GOOD: Passing lean instruction & file path
"tools": [{
  "name": "Task",
  "input": {
    "subagent": "CodeReviewer",
    "prompt": "Use read_file tool to inspect 'src/main.js' and report top 3 security flaws."
  }
}]</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Result: Subagent autonomously invokes read_file tool as needed.</div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Đừng nhét toàn bộ tài liệu dự án vào prompt của Task tool. Hãy chỉ truyền chỉ thị tinh gọn kèm đường dẫn file để Subagent tự dùng tool đọc khi cần.</p>
        `
      },
      {
        heading: "3.4 Hooks System vs System Prompt Matrix",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Evaluation Criteria</th>
                  <th>🛡️ PreToolUse / PostToolUse Hooks</th>
                  <th>💬 System Prompt Instructions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Determinism Guarantee</strong></td>
                  <td><span class="status-badge yes">✅ 100% Deterministic</span></td>
                  <td><span class="status-badge warn">⚠️ Probabilistic (~95-98%)</span></td>
                </tr>
                <tr>
                  <td><strong>Prompt Injection Defense</strong></td>
                  <td><span class="status-badge yes">✅ 100% Secure (Server-side)</span></td>
                  <td><span class="status-badge no">❌ Vulnerable to adversarial prompts</span></td>
                </tr>
                <tr>
                  <td><strong>Execution Layer</strong></td>
                  <td>Client Application / Server Code</td>
                  <td>LLM Context Window Memory</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Hooks (PreToolUse) chặn lệnh sai ở tầng Client chắc chắn 100% (Deterministic), trong khi System Prompt chỉ mang tính xác suất (Probabilistic).</p>
        `
      },
      {
        heading: "3.5 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 3</div>
            <div class="kc-question">
              Question: Coordinator needs 3 Subagents to analyze 3 files in parallel, but they run sequentially. What is the root technical cause?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              - <strong>Cause:</strong> Coordinator emitted Task tool_use calls across multiple separate API response turns.<br>
              - <strong>Fix:</strong> Ensure Coordinator emits multiple <code>Task</code> tool_use call blocks within the <strong>SAME API response message turn</strong>.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Để Subagents chạy song song thật sự (Parallel Execution), Coordinator phải phát ra nhiều thẻ gọi tool <code>Task</code> trong CÙNG MỘT message phản hồi API.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Always use PreToolUse Hooks for strict security policies and emit multiple Task calls in a single turn for parallel subagent execution."
  },
  {
    id: 4,
    title: "Chapter 4: Model Context Protocol (MCP) — Standardized Integration",
    domain: "D2",
    domainTitle: "Tool Design & MCP Integration",
    estimatedMinutes: 25,
    summary: "Open protocol standard connecting Claude securely to external data sources (Databases, GitHub, Local Filesystem).",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 4: Model Context Protocol (MCP) — Standardized Integration</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 4: Model Context Protocol (MCP) — Standardized Integration.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 4: Model Context Protocol (MCP) — Standardized Integration: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 4: Model Context Protocol (MCP) — Standardized Integration.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Understand MCP Server vs MCP Client architecture.",
      "Master permission boundaries for read/write resource access.",
      "Distinguish between 3 core MCP primitives: Tools, Resources, and Prompts."
    ],
    coreMasteries: [
      "MCP Open Protocol: Standardized connection specification for AI models to external systems.",
      "MCP Primitives: Tools (executable functions), Resources (read-only state/files), Prompts (parameterized templates).",
      "Ambiguity Prevention: Detailed tool descriptions prevent fallback to raw bash/sed commands."
    ],
    examTraps: [
      "⚠️ TRAP 1: Confusing MCP with custom REST APIs. MCP is an open specification standard.",
      "⚠️ TRAP 2: Omitting explicit tool descriptions causing model to bypass MCP Server in favor of raw shell commands."
    ],
    selfChecklist: [
      "I can explain MCP Server vs MCP Client responsibilities.",
      "I know the 3 core MCP primitives (Tools, Resources, Prompts)."
    ],
    sections: [
      {
        heading: "4.1 Architecture & USB-C Analogy",
        content: `
          <div class="callout callout-title" style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--accent-emerald); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Visual Analogy:</strong> MCP is like a USB-C port for AI models. Instead of custom proprietary cables for every peripheral, MCP defines a single open standard port connecting Claude (Client) to any Database or GitHub repo (MCP Server).
          </div>
          <p>MCP consists of <strong>MCP Server</strong> (exposes tools & resources) and <strong>MCP Client</strong> (Claude Code / Claude Desktop).</p>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> MCP đóng vai trò như chuẩn USB-C mở giúp Claude (MCP Client) kết nối an toàn với Cơ sở dữ liệu hay GitHub (MCP Server).</p>
        `
      },
      {
        heading: "4.2 The 3 MCP Core Primitives",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>MCP Primitive</th>
                  <th>Technical Nature</th>
                  <th>Example Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Tools</strong></td>
                  <td>Executable side-effecting functions.</td>
                  <td><code>create_issue</code>, <code>execute_query</code></td>
                </tr>
                <tr>
                  <td><strong>Resources</strong></td>
                  <td>Read-only state, schemas, or file logs.</td>
                  <td><code>file:///logs/app.log</code>, DB Schema</td>
                </tr>
                <tr>
                  <td><strong>Prompts</strong></td>
                  <td>Parameterized instruction templates.</td>
                  <td>PR review prompt template</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> 3 thành phần cốt lõi của MCP: Tools (Hàm thực thi), Resources (Tài nguyên đọc), và Prompts (Mẫu hướng dẫn có tham số).</p>
        `
      },
      {
        heading: "4.3 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 4</div>
            <div class="kc-question">
              Question: Why must MCP Tool descriptions be exceptionally detailed and explicit?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Ambiguous MCP descriptions cause Claude to fail to recognize the custom server capabilities, causing it to fall back to executing risky raw terminal commands (bash/sed).
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Mô tả MCP Tool phải chi tiết để tránh trường hợp Claude không nhận diện được và quay sang dùng lệnh Terminal thô rủi ro.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Provide rich descriptions for MCP tools to ensure Claude prefers structured server tools over raw terminal commands."
  },
  {
    id: 5,
    title: "Chapter 5: Claude Code — Configuration & Workflows",
    domain: "D3",
    domainTitle: "Claude Code Configuration & Workflows",
    estimatedMinutes: 20,
    summary: "Claude Code CLI workflows, CLAUDE.md project configuration, CLI permission flags, and automated CI/CD PR review pipelines.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 5: Claude Code — Configuration & Workflows</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 5: Claude Code — Configuration & Workflows.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 5: Claude Code — Configuration & Workflows: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 5: Claude Code — Configuration & Workflows.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Master the purpose and lean contents of CLAUDE.md.",
      "Understand --dangerously-skip-permissions flag risks and CI/CD use cases.",
      "Enforce Glob/Grep First workflow before reading files."
    ],
    coreMasteries: [
      "CLAUDE.md: Project guide containing core build, test, and style commands.",
      "--dangerously-skip-permissions: Bypasses prompt confirmations; strictly for isolated CI/CD runners.",
      "Glob/Grep First: Search files and keywords before reading content into context."
    ],
    examTraps: [
      "⚠️ TRAP 1: Stuffing 2,000 lines of documentation into CLAUDE.md (keep it lean: build/test commands only).",
      "⚠️ TRAP 2: Running --dangerously-skip-permissions on production developer workstations."
    ],
    selfChecklist: [
      "I know what goes into a lean CLAUDE.md file.",
      "I know when --dangerously-skip-permissions is appropriate."
    ],
    sections: [
      {
        heading: "5.1 Lean CLAUDE.md Configuration Pattern",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 BLOATED CLAUDE.MD (Bad Pattern)</div>
              <p style="font-size: 0.85rem;">2,000 lines of architecture documentation and tutorials.</p>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Wastes massive token context every session launch!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 LEAN CLAUDE.MD (Good Pattern)</div>
              <p style="font-size: 0.85rem;">Concise instructions: <code>npm test</code>, <code>npm run build</code>, 2-line code style.</p>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Minimal token usage, maximum adherence.</div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> File <code>CLAUDE.md</code> chỉ nên chứa các lệnh test/build ngắn gọn cốt lõi, tránh nhét hàng ngàn dòng tài liệu rườm rà làm phình context.</p>
        `
      },
      {
        heading: "5.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 5</div>
            <div class="kc-question">
              Question: Which CLI flag is required when running Claude Code in automated GitHub Actions PR review pipelines?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Use <code>--dangerously-skip-permissions</code> because GitHub Actions runners are non-interactive isolated sandbox environments.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Dùng cờ <code>--dangerously-skip-permissions</code> khi chạy Claude Code tự động trong GitHub Actions CI/CD.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Keep CLAUDE.md lean with essential build/test commands and use --dangerously-skip-permissions only in non-interactive CI/CD sandboxes."
  },
  {
    id: 6,
    title: "Chapter 6: Advanced Prompt Engineering & Structured Output",
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    estimatedMinutes: 20,
    summary: "Few-shot prompting, JSON Schema formatting, Explicit Null directives, Chain-of-Thought (<thinking>), and XML boundary isolation.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 6: Advanced Prompt Engineering & Structured Output</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 6: Advanced Prompt Engineering & Structured Output.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 6: Advanced Prompt Engineering & Structured Output: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 6: Advanced Prompt Engineering & Structured Output.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Use Few-shot examples for deterministic formatting.",
      "Enforce Explicit Null directives to prevent hallucinated data.",
      "Wrap user data in XML tags (<doc>...</doc>) to prevent prompt injection."
    ],
    coreMasteries: [
      "Few-shot Prompting: Providing 2-3 input/output examples is the single most effective formatting technique.",
      "Explicit Null: Instructing 'return null if not found' eliminates plausible hallucinated figures.",
      "XML Isolation: Wrapping untrusted user input inside XML tags prevents prompt injection attacks."
    ],
    examTraps: [
      "⚠️ TRAP 1: Relying solely on temperature = 0.0 for formatting without providing Few-shot examples.",
      "⚠️ TRAP 2: Missing Explicit Null instructions when extracting absent fields."
    ],
    selfChecklist: [
      "I use Few-shot examples for structured outputs.",
      "I enforce Explicit Null for missing fields."
    ],
    sections: [
      {
        heading: "6.1 Few-Shot Examples & Explicit Null Directives",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 MISSING EXPLICIT NULL</div>
              <p style="font-size: 0.85rem;">Prompt: "Extract customer phone number from transcript."</p>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Model hallucinates plausible fake phone numbers when absent!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 EXPLICIT NULL ENFORCED</div>
              <p style="font-size: 0.85rem;">Prompt: "Extract phone number. If absent from transcript, output null."</p>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Model reliably returns null when information is missing.</div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Bắt buộc thêm chỉ thị Explicit Null <em>"Nếu không tìm thấy, trả về null"</em> kết hợp 2-3 ví dụ mẫu (Few-shot) để loại bỏ hoàn toàn số liệu bịa đặt.</p>
        `
      },
      {
        heading: "6.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 6</div>
            <div class="kc-question">
              Question: Does setting temperature = 0.0 guarantee 100% strict string formatting compliance?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              No. Temperature = 0.0 increases determinism but does not enforce formatting structure. Providing 2-3 <strong>Few-shot examples</strong> is required for strict formatting adherence.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Temperature = 0.0 không thay thế được Few-shot. Cần đưa 2-3 ví dụ mẫu để ép định dạng chuẩn tuyệt đối.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Pair Few-shot examples with Explicit Null instructions for bulletproof JSON extraction."
  },
  {
    id: 7,
    title: "Chapter 7: Advanced Schema Design & Resilient Enums",
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    estimatedMinutes: 25,
    summary: "Build resilient JSON Schemas with Resilient Catch-All Enums, Schema Redundancy, and Data Evolution rules.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 7: Advanced Schema Design & Resilient Enums</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 7: Advanced Schema Design & Resilient Enums.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 7: Advanced Schema Design & Resilient Enums: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 7: Advanced Schema Design & Resilient Enums.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Design Resilient Catch-All Enums using 'other' + 'other_detail'.",
      "Implement Schema Redundancy to detect OCR/extraction errors.",
      "Handle temporal data modifications with Data Evolution rules."
    ],
    coreMasteries: [
      "Resilient Catch-Alls: Include 'other' in enum definitions paired with an 'other_detail' text field.",
      "Schema Redundancy: Request both 'stated_total' and 'calculated_total' to trigger Human Review on discrepancy."
    ],
    examTraps: [
      "⚠️ TRAP 1: Using strict closed enums that crash JSON schema validation on novel input categories.",
      "⚠️ TRAP 2: Overwriting historic contract data when processing amendments instead of tracking multi-value temporal states."
    ],
    selfChecklist: [
      "I add 'other' + 'other_detail' to JSON enums.",
      "I use Schema Redundancy to detect OCR errors."
    ],
    sections: [
      {
        heading: "7.1 Resilient Catch-All Enums & Schema Redundancy",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 FRAGILE ENUM (Bad Pattern)</div>
              <pre><code>"enum": ["house", "apartment", "condo"]</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Crashes validation when encountering 'studio' or 'townhouse'!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 RESILIENT CATCH-ALL (Good Pattern)</div>
              <pre><code>"enum": ["house", "apartment", "condo", "other"],
"other_detail": {"type": "string"}</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Gracefully handles novel property types without validation crashes.</div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Thêm giá trị <code>other</code> vào Enum kèm trường <code>other_detail</code> để tránh vỡ JSON Schema khi xuất hiện loại dữ liệu mới.</p>
        `
      },
      {
        heading: "7.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 7</div>
            <div class="kc-question">
              Question: How can Schema Redundancy automatically catch extraction discrepancy in blurry invoice OCR processing?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Request both <code>stated_total</code> (printed text) and <code>calculated_total</code> (sum of line items). If <code>stated_total != calculated_total</code>, automatically route to Human Review Queue.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Dùng Schema Redundancy trích xuất cả <code>stated_total</code> và <code>calculated_total</code> để phát hiện lệch tổng tiền và đẩy sang Human Review Queue.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Always include 'other' in enums and use Schema Redundancy to catch OCR discrepancy automatically."
  },
  {
    id: 8,
    title: "Chapter 8: Cost Routing & SLA — Messages vs Batch API",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 20,
    summary: "Optimize operational costs with Message Batches API (50% discount) and route workloads according to latency SLA requirements.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 8: Cost Routing & SLA — Messages vs Batch API</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 8: Cost Routing & SLA — Messages vs Batch API: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 8: Cost Routing & SLA — Messages vs Batch API.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Route real-time interactive traffic to Messages API.",
      "Route non-urgent asynchronous batch workloads to Message Batches API to save 50% on API costs."
    ],
    coreMasteries: [
      "Messages API: Real-time latency, standard API pricing.",
      "Message Batches API: 50% discount, 24-hour asynchronous completion SLA.",
      "Routing Strategy: Never use real-time API endpoints for overnight batch workloads."
    ],
    examTraps: [
      "⚠️ TRAP 1: Using Real-Time Messages API for batch processing 50,000 overnight documents, wasting 50% budget."
    ],
    selfChecklist: [
      "I use Message Batches API for async workloads.",
      "I understand the 50% discount and 24h SLA."
    ],
    sections: [
      {
        heading: "8.1 Cost Routing & SLA Decision Matrix",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Evaluation Feature</th>
                  <th>⚡ Messages API (Real-Time)</th>
                  <th>📦 Message Batches API (Async)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Pricing Discount</strong></td>
                  <td><span class="status-badge warn">⚠️ Standard Price (100%)</span></td>
                  <td><span class="status-badge yes">✅ 50% Cost Discount</span></td>
                </tr>
                <tr>
                  <td><strong>Response SLA</strong></td>
                  <td>Immediate (seconds)</td>
                  <td>Asynchronous (within 24 hours)</td>
                </tr>
                <tr>
                  <td><strong>Primary Workload</strong></td>
                  <td>Interactive chat, real-time tool loops</td>
                  <td>Overnight OCR, batch sentiment analysis</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Sử dụng Message Batches API cho các tác vụ xử lý hàng loạt không cần gấp để tiết kiệm 50% chi phí API với SLA 24h.</p>
        `
      },
      {
        heading: "8.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 8</div>
            <div class="kc-question">
              Question: Your system needs to analyze sentiment on 50,000 user comments nightly. Which API endpoint optimizes budget?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Create an asynchronous job via <strong>Message Batches API</strong> to receive 50% cost discount under 24-hour SLA.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Với tác vụ bất đồng bộ đêm, chọn Message Batches API để tiết kiệm 50% chi phí.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Always select Message Batches API for non-urgent batch tasks to save 50% on operational API budget."
  },
  {
    id: 9,
    title: "Chapter 9: Escalation & Human-in-the-Loop",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 20,
    summary: "Integrate Human-in-the-Loop approval workflows for high-risk operations based on Confidence Scores and monetary thresholds.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 9: Escalation & Human-in-the-Loop</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 9: Escalation & Human-in-the-Loop.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 9: Escalation & Human-in-the-Loop: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 9: Escalation & Human-in-the-Loop.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Implement Human Review Queue routing for low-confidence or high-value actions.",
      "Use Application Intercept Hooks to enforce hard policy constraints server-side."
    ],
    coreMasteries: [
      "Confidence > 90% & Value < $500: Full automation.",
      "Confidence < 90% or Value > $500: Route to Human Review Queue.",
      "Server-side Hooks: Enforce security rules in code rather than system prompts."
    ],
    examTraps: [
      "⚠️ TRAP 1: Relying on System Prompt 'Do not transfer > $500' for policy compliance."
    ],
    selfChecklist: [
      "I route low confidence or high value actions to Human Review.",
      "I enforce policy constraints in server-side code."
    ],
    sections: [
      {
        heading: "9.1 Automation Thresholds & Human Review Queue",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Condition Threshold</th>
                  <th>System Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Confidence Score > 90% AND Value < $500</td>
                  <td><span class="status-badge yes">✅ Full Automated Execution</span></td>
                </tr>
                <tr>
                  <td>Confidence Score < 90% OR Value > $500</td>
                  <td><span class="status-badge warn">⚠️ Route to Human Review Queue</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Khi độ tin cậy dưới 90% hoặc giá trị lớn hơn $500, tự động đẩy vào hàng chờ Human Review Queue cho con người duyệt.</p>
        `
      },
      {
        heading: "9.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 9</div>
            <div class="kc-question">
              Question: How can you 100% guarantee that money transfer amounts over $500 are never processed automatically?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Enforce rule checks using <strong>Application Intercept Hooks</strong> in server backend code rather than relying on LLM System Prompts.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Dùng Application Intercept Hooks ở Backend Server để đảm bảo 100% không chuyển tiền quá $500.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Enforce strict monetary thresholds and safety policy constraints using server-side Application Intercept Hooks."
  },
  {
    id: 10,
    title: "Chapter 10: Multi-Agent Reliability & Error Recovery",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 20,
    summary: "Handle network failures, tool execution errors, and crash state recovery in multi-agent orchestration systems.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 10: Multi-Agent Reliability & Error Recovery</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 10: Multi-Agent Reliability & Error Recovery.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 10: Multi-Agent Reliability & Error Recovery: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 10: Multi-Agent Reliability & Error Recovery.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Return tool_result with `isError: true` on tool failure.",
      "Recover agent state after crashes using structured state manifests."
    ],
    coreMasteries: [
      "Graceful Tool Failure: Return `isError: true` to allow Claude to self-correct.",
      "Crash Recovery: Persist structured state manifest to resume crashed subagents."
    ],
    examTraps: [
      "⚠️ TRAP 1: Throwing unhandled exceptions or returning empty strings on tool execution errors."
    ],
    selfChecklist: [
      "I handle tool errors gracefully using isError: true.",
      "I use state manifests for crash recovery."
    ],
    sections: [
      {
        heading: "10.1 Graceful Failure & State Manifests",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 UNHANDLED EXCEPTION (Crash)</div>
              <pre><code>try { run_tool() } catch (err) { throw err; } // ❌ crashes agent</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Crashes entire multi-agent workflow turn!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GRACEFUL TOOL FAILURE (Good)</div>
              <pre><code>return {"isError": true, "content": "API 500 Network Timeout"};</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Claude inspects error and attempts alternative strategy.</div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Luôn trả về <code>isError: true</code> trong <code>tool_result</code> để Claude xử lý sự cố mượt mà thay vì ném Exception làm sập agent.</p>
        `
      },
      {
        heading: "10.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 10</div>
            <div class="kc-question">
              Question: When a Subagent crashes mid-execution due to container reboot, how can the Coordinator resume progress?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Periodically persist a <strong>Structured State Manifest</strong> and inject the pending manifest state into a newly spawned replacement Subagent.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Lưu vết tệp Manifest có cấu trúc để tiêm lại trạng thái và khôi phục Subagent mới khi bị crash.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Always return isError: true in tool_result for graceful error handling and use state manifests for crash recovery."
  },
  {
    id: 11,
    title: "Chapter 11: Advanced Context Management & Context Pruning",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 20,
    summary: "Context Pruning techniques, Prompt Caching, and Lost-in-the-middle positioning strategies.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 11: Advanced Context Management & Context Pruning</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 11: Advanced Context Management & Context Pruning.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 11: Advanced Context Management & Context Pruning: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 11: Advanced Context Management & Context Pruning.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Filter bloated API responses using Context Pruning before appending to context.",
      "Place critical directives at prompt boundaries to prevent Lost-in-the-middle degradation."
    ],
    coreMasteries: [
      "Context Pruning: Strip unneeded API properties at client side.",
      "Progressive Summarization Risk: Exact numerical values and dates are lost when summarizing."
    ],
    examTraps: [
      "⚠️ TRAP 1: Appending raw 40+ property API JSON payloads directly into conversation context."
    ],
    selfChecklist: [
      "I apply Context Pruning to external API results.",
      "I place key rules at top or bottom of prompt payloads."
    ],
    sections: [
      {
        heading: "11.1 Context Pruning Pattern",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 UNPRUNED API PAYLOAD</div>
              <p style="font-size: 0.85rem;">Injecting full 40-field API JSON into conversation history.</p>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Inflates token costs by 80% with irrelevant data.</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 CONTEXT PRUNED PAYLOAD</div>
              <p style="font-size: 0.85rem;">Filtering payload at client to retain only 4 essential fields.</p>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Maintains lean context window and fast processing speed.</div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Lọc bỏ các trường dư thừa từ kết quả API (Context Pruning) trước khi đưa vào context để tiết kiệm 80% token.</p>
        `
      },
      {
        heading: "11.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 11</div>
            <div class="kc-question">
              Question: During Progressive Summarization of long conversations, which data types suffer the highest degradation loss?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              <strong>Exact numerical figures, specific dates, and percentage metrics</strong> are frequently degraded into approximate qualitative phrases ("around", "approx").
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Khi tóm tắt lũy tiến, các con số chính xác và ngày tháng dễ bị suy giảm thành các từ ước lệ.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Always prune external API responses down to essential fields before adding them to messages history."
  },
  {
    id: 12,
    title: "Chapter 12: Provenance Preservation & Source Citation",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 20,
    summary: "Preserve source citations and document provenance across multi-agent synthesis pipelines.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 12: Provenance Preservation & Source Citation</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 12: Provenance Preservation & Source Citation.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 12: Provenance Preservation & Source Citation: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 12: Provenance Preservation & Source Citation.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Use Structured Claim-Source Mapping to preserve source references across agent layers."
    ],
    coreMasteries: [
      "Structured Claim-Source Mapping: Requiring subagents to output structured JSON mapping claims to sources."
    ],
    examTraps: [
      "⚠️ TRAP 1: Using unstructured free-form text causing downstream synthesis agents to drop citations."
    ],
    selfChecklist: [
      "I use structured Claim-Source mapping for citation preservation."
    ],
    sections: [
      {
        heading: "12.1 Structured Claim-Source Mapping",
        content: `
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Visual Analogy:</strong> When writing a legal brief, every claim must carry an explicit footnote reference ID (Claim ➔ Source). If written as raw unformatted text, subsequent editors will lose track of citation sources!
          </div>
          <p>Require Subagents to output structured JSON mapping <code>claim</code> properties directly to <code>source_url</code> properties.</p>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Yêu cầu Subagents xuất dữ liệu JSON có cấu trúc ánh xạ giữa <code>claim</code> và <code>source_url</code> để không làm rơi trích dẫn nguồn khi tổng hợp báo cáo.</p>
        `
      },
      {
        heading: "12.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 12</div>
            <div class="kc-question">
              Question: How can a Multi-Agent synthesis system guarantee that source citations are never lost during final report generation?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Enforce <strong>Structured Claim-Source Mapping</strong> data structures end-to-end between subagent communication turns instead of free-form text.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Truyền dữ liệu có cấu trúc ánh xạ Claim-Source end-to-end để bảo toàn trích dẫn nguồn tuyệt đối.</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Enforce end-to-end Structured Claim-Source Mapping data structures to preserve source citations in multi-agent pipelines."
  },
  {
    id: 13,
    title: "Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search",
    domain: "D3",
    domainTitle: "Claude Code Configuration & Workflows",
    estimatedMinutes: 20,
    summary: "Master built-in tools (Glob, Grep, View, Edit, Bash) and enforce Glob/Grep First search workflow.",
  summaryVI: "Bản dịch Tiếng Việt: Tóm tắt nội dung bài học <em>Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search</em> hướng dẫn phân tích chuyên sâu các nguyên tắc kỹ thuật cốt lõi theo tiêu chuẩn Anthropic CCAF.",
  learningObjectivesVI: [
    "Hiểu rõ các khái niệm kỹ thuật cốt lõi trong Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
    "Áp dụng các mẫu thiết kế kiến trúc chuẩn Anthropic vào ứng dụng thực tế.",
    "Phòng tránh các bẫy câu hỏi tình huống trong bài thi CCAF."
  ],
  examTipVI: "Mẹo thi CCAF cho Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search: Luôn tuân thủ các nguyên tắc thiết kế tối giản, kiểm soát context window và xử lý lỗi an toàn.",
  coreMasteriesVI: [
    "Nắm vững bản chất kỹ thuật của Chapter 13: Claude Code Built-in Tools & Efficient Codebase Search.",
    "Kiểm soát luồng dữ liệu và tối ưu chi phí vận hành."
  ],
  examTrapsVI: [
    "⚠️ Tránh các thiết kế rủi ro không có cơ chế xử lý lỗi dự phòng.",
    "⚠️ Không nhồi nhét quá nhiều dữ liệu thô vào context window."
  ],
    learningObjectives: [
      "Use Glob and Grep to locate target files before reading contents into context window."
    ],
    coreMasteries: [
      "Glob/Grep First Workflow: Search file paths and symbols first before loading file contents."
    ],
    examTraps: [
      "⚠️ TRAP 1: Sequential file reading (View) across hundreds of codebase files, rapidly overflowing context window."
    ],
    selfChecklist: [
      "I use Glob/Grep first before reading file contents."
    ],
    sections: [
      {
        heading: "13.1 Glob/Grep First Search Workflow",
        content: `
          <div class="diagram-flow">
            <div class="flow-step">
              <div class="flow-number">1</div>
              <div class="flow-content">
                <div class="flow-title">1. Glob File Pattern Search</div>
                <div class="flow-desc">Find matching file paths (e.g. <code>Glob("src/**/*.js")</code>).</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">2</div>
              <div class="flow-content">
                <div class="flow-title">2. Grep Symbol Search</div>
                <div class="flow-desc">Locate exact line numbers containing target function (e.g. <code>Grep("calculateTotal")</code>).</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">3</div>
              <div class="flow-content">
                <div class="flow-title">3. View Target File Range</div>
                <div class="flow-desc">Load only the specific target file lines into context, saving 95% token budget!</div>
              </div>
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Luôn tuân theo quy trình Glob/Grep First: Dùng Glob tìm file, Grep tìm từ khóa trước rồi mới dùng View để đọc đúng file cần sửa, tiết kiệm 95% token.</p>
        `
      },
      {
        heading: "13.2 Knowledge Check",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 KNOWLEDGE CHECK — CHAPTER 13</div>
            <div class="kc-question">
              Question: When exploring a 200-file codebase, which agent behavior causes immediate context window overflow?
            </div>
            <button class="kc-toggle-btn">💡 Click to reveal official Anthropic answer</button>
            <div class="kc-answer">
              <strong>Official Anthropic Answer:</strong><br>
              Sequential file reading (invoking View tool on file after file). Always adopt <strong>Glob and Grep First</strong> workflow to target exact files.
            </div>
          </div>
        `,
        contentVI: `
          <p><strong>Bản dịch Tiếng Việt:</strong> Đọc lần lượt từng file (Sequential View) sẽ làm sập context. Hãy luôn dùng Glob và Grep trước để định vị chính xác file!</p>
        `
      }
    ],
    examTip: "⚡ CCAF Exam Tip: Always use Glob and Grep to locate relevant code before using View to read file contents."
  }
];
