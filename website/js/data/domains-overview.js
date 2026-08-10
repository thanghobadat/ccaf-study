/* CCAF Learning Hub - Complete 5 Domain Technical Overview Data (Unabridged Architecture & Schemas) */

const DOMAINS_OVERVIEW_DATA = [
  {
    id: "D1",
    code: "D1",
    weight: "27%",
    title: "Domain 1: Agent Architecture & Orchestration",
    titleVI: "Lĩnh vực 1: Kiến trúc Agent & Phối hợp Hệ thống",
    badgeColor: "d1",
    description: "Multi-agent orchestration, coordinator-worker patterns, task decomposition, context isolation, state recovery, and human-in-the-loop escalation.",
    descriptionVI: "Quản lý phối hợp đa agent, mô hình Coordinator-Worker, phân rã bài toán, cách ly ngữ cảnh, thực thi song song, phục hồi trạng thái sau sập và phanh an toàn Human-in-the-Loop.",
    architecturalCore: `
      <p>Domain 1 chiếm <strong>27% điểm số đề thi (trọng số lớn nhất)</strong>. Tập trung vào kiến trúc hệ thống AI tự chủ (Agentic Systems) chạy trên Messages API tại endpoint <code>/v1/messages</code>.</p>
      
      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">1. Bản chất Messages API Stateless & Cờ điều khiển <code>stop_reason</code>:</h4>
      <p>Mỗi cuộc gọi API là độc lập hoàn toàn. Trường <code>stop_reason</code> trong Response đóng vai trò là <strong>Cờ điều khiển Máy trạng thái (State Machine Control Flag)</strong> ở Client Backend:</p>
      <ul>
        <li><code>"end_turn"</code>: Claude đã trả lời hoàn tất. Render câu trả lời cuối cho User.</li>
        <li><code>"tool_use"</code>: Claude phát ra khối gọi Tool. Backend tạm dừng render, đọc ID/tham số Tool, chạy mã code địa phương, bọc kết quả trong <code>tool_result</code> và gọi lại API.</li>
        <li><code>"max_tokens"</code>: Phản hồi bị cụt giữa chừng do chạm trần token. Cần gửi tin nhắn yêu cầu viết tiếp hoặc tăng <code>max_tokens</code>.</li>
        <li><code>"stop_sequence"</code>: Claude bắt gặp chuỗi ngắt ký tự tùy chỉnh để kích hoạt parser chuyên biệt.</li>
      </ul>

      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">2. Mô hình Coordinator-Worker & Flat Hierarchy:</h4>
      <ul>
        <li><strong>Coordinator (Trưởng nhóm):</strong> Chỉ lập kế hoạch và phân rã bài toán qua <code>Task</code> tool. Không tự mở đọc file hay chạy lệnh nặng.</li>
        <li><strong>Worker Subagents (Chuyên gia):</strong> Được khởi tạo để xử lý tác vụ chuyên biệt (ví dụ: <code>CodeReviewer</code>, <code>Researcher</code>).</li>
        <li><strong>Flat Hierarchy (Hệ thống Phẳng):</strong> Giới hạn độ sâu phân cấp ở mức 1-2 tầng (<code>Coordinator ➔ Worker</code>). Cấm đẻ Sub-sub-subagent lồng nhau gây dead-lock và bùng nổ chi phí token.</li>
      </ul>

      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">3. Cơ chế Context Isolation (Cô lập Ngữ cảnh):</h4>
      <p>Mỗi Subagent giữ một mảng <code>messages</code> riêng biệt. Khi Subagent hoàn thành, nó chỉ trả về <strong>bản tổng hợp kết quả (summary report)</strong> cho Coordinator qua <code>tool_result</code>. Toàn bộ log trung gian (ví dụ 100k token đọc file thô) nằm lại ở Subagent context, giúp Context Window của Coordinator luôn sạch sẽ.</p>

      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">4. Phanh an toàn bằng Code Hooks (Deterministic Safety):</h4>
      <p>Dùng <code>PreToolUse Hook</code> ở tầng Code Server Backend để chặn đứng hành vi nguy hiểm (cấm <code>rm -rf</code>, cấm chuyển tiền > $500) đảm bảo <strong>100% Deterministic (chắc chắn)</strong>, tuyệt đối không tin tưởng vào văn bản System Prompt (xác suất 95-98%). Dùng <code>PostToolUse Hook</code> để cắt tỉa bớt dữ liệu rác từ tool trước khi đưa cho Claude đọc.</p>
    `,
    specsAndSchemas: [
      {
        topic: "Messages API & stop_reason State Machine",
        details: "Mảng `messages` chứa các role `user`, `assistant`, và `tool`. Giá trị `stop_reason` trong Response (`end_turn`, `tool_use`, `max_tokens`, `stop_sequence`) điều khiển luồng chuyển trạng thái Backend."
      },
      {
        topic: "Claude Agent SDK AgentDefinition",
        details: "Khai báo Subagent qua SDK: `AgentDefinition(name='CodeReviewer', description='...', tools=[...], prompt='...')`. Bắt buộc Coordinator phải có `allowedTools = ['Task']` để đẻ Subagent."
      },
      {
        topic: "Task Tool Input Rules (Lean Directives)",
        details: "Truyền prompt tinh gọn kèm đường dẫn file: `{'subagent': 'CodeReviewer', 'prompt': 'Dùng read_file đọc src/main.js'}`. Không nhét 50 file code vào prompt của Task làm phình context."
      },
      {
        topic: "Subagent Parallel Execution",
        details: "Phát ra nhiều khối gọi tool `Task` trong CÙNG MỘT lượt tin nhắn phản hồi API (`same response turn`). Phía Backend dùng `Promise.allSettled()` để gom kết quả song song."
      },
      {
        topic: "PreToolUse & PostToolUse Hooks",
        details: "Chặn trực tiếp tại Backend trước khi Tool thực thi (`PreToolUse`) và cắt tỉa dữ liệu thô sau khi Tool thực thi xong (`PostToolUse`)."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Dùng Promise.allSettled() gom kết quả từ 3 Subagent chạy song song trong cùng 1 turn response. Nếu 1 Subagent fail, 2 Subagent kia vẫn trả kết quả bình thường.",
        bad: "❌ Dùng Promise.all() hoặc gọi Task rải rác qua nhiều turn API riêng biệt làm sập luồng và chạy tuần tự chậm chạp."
      },
      {
        good: "🟢 Đặt phanh an toàn Escalation/Security tại PreToolUse Hook trong Code Server Backend (đảm bảo 100% Deterministic).",
        bad: "❌ Tin tưởng 100% vào văn bản System Prompt ('Không bao giờ được xóa database') vì vẫn có nguy cơ bị vượt rào qua Prompt Injection."
      },
      {
        good: "🟢 Chỉ truyền lệnh tinh gọn kèm đường dẫn file cho Subagent qua Task tool prompt để Subagent tự mở đọc.",
        bad: "❌ Nhồi nhét toàn bộ 50 file mã nguồn dự án vào tham số prompt của Task tool làm bùng nổ token."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Nhầm lẫn giữa `stop_reason = 'end_turn'` và `'max_tokens'` khi phân tích phản hồi bị ngắt cụt giữa chừng.",
      "⚠️ BẪY 2: Quên cấp phép 'Task' trong mảng `allowedTools` của Coordinator khiến Coordinator chỉ mô tả việc giao việc chứ không thể thực thi đẻ Subagent.",
      "⚠️ BẪY 3: Đẻ Subagent phân cấp lồng nhau quá 2 tầng (Sub-sub-subagent) gây dead-lock và bùng nổ chi phí token.",
      "⚠️ BẪY 4: Bắt Subagent thử lại (Retry) vô hạn khi gặp lỗi cấm truy cập (Permission Error) thay vì dừng lại hoặc escalate."
    ],
    productionArchetype: "Mô hình 3: Multi-Agent Research & Synthesis System (Nghiên cứu & Tổng hợp Đa Agent)"
  },
  {
    id: "D2",
    code: "D2",
    weight: "18%",
    title: "Domain 2: Tool Design & MCP Integration",
    titleVI: "Lĩnh vực 2: Thiết kế Công cụ & Tích hợp Giao thức MCP",
    badgeColor: "d2",
    description: "Granular tool schemas, JSON schema validation, resilient enums, Model Context Protocol (MCP) servers, clients, resources, prompts, tools, and stdio/SSE transports.",
    descriptionVI: "Thiết kế Schema công cụ tinh gọn, xác thực JSON Schema, Resilient Enums chống sập, giao thức MCP Protocol (Server, Client, Resources, Prompts, Tools), và 2 chuẩn truyền tải stdio/SSE.",
    architecturalCore: `
      <p>Domain 2 chiếm <strong>18% điểm số đề thi</strong>, tập trung vào cách thiết kế các giao diện công cụ (Tool Schemas) và tích hợp chuẩn kết nối chuẩn hóa <strong>Model Context Protocol (MCP)</strong>.</p>
      
      <h4 style="color: var(--accent-blue); margin: 0.8rem 0 0.4rem 0;">1. Vòng lặp Thực thi Tool Use 4 Bước (Tool Execution Loop):</h4>
      <ol style="padding-left: 1.2rem; margin: 0.4rem 0;">
        <li><strong>Client Tool Definition:</strong> Client truyền mảng danh sách công cụ sẵn có kèm tên, mô tả và JSON Schema.</li>
        <li><strong>Model Decision:</strong> Claude trả về <code>stop_reason: "tool_use"</code> chứa ID cuộc gọi và tham số JSON.</li>
        <li><strong>Backend Execution:</strong> Client application bắt ID cuộc gọi, chạy code địa phương/API thô.</li>
        <li><strong>tool_result Feedback:</strong> Client nối khối <code>tool_result</code> vào mảng messages và gọi lại API.</li>
      </ol>

      <h4 style="color: var(--accent-blue); margin: 0.8rem 0 0.4rem 0;">2. Granular Tools vs Monolithic Tools:</h4>
      <p>Thiết kế các tool đơn nhiệm tinh gọn (<code>get_user_by_id</code>, <code>update_user_email</code>) thay vì tạo tool "khổng lồ" gộp 12 tham số CRUD (<code>manage_user_system</code>) gây nhầm lẫn tham số và thất bại khi validate.</p>

      <h4 style="color: var(--accent-blue); margin: 0.8rem 0 0.4rem 0;">3. Resilient Enums & Graceful Error Handling:</h4>
      <ul>
        <li><strong>Resilient Enum:</strong> Trong mảng <code>enum</code> của JSON Schema, luôn bổ sung giá trị dự phòng <code>UNKNOWN</code> hoặc <code>OTHER</code> (ví dụ: <code>enum: ["LOW", "MEDIUM", "HIGH", "UNKNOWN"]</code>) để tránh vỡ JSON Parser khi AI phát sinh giá trị ngoài danh mục.</li>
        <li><strong>Graceful Error:</strong> Khi tool API bên ngoài gặp lỗi 500 hoặc timeout, trả về khối <code>tool_result</code> chứa <code>"is_error": true</code> kèm thông báo lỗi thô, không ném Exception chưa xử lý làm sập ứng dụng Backend.</li>
      </ul>

      <h4 style="color: var(--accent-blue); margin: 0.8rem 0 0.4rem 0;">4. Kiến trúc MCP (Model Context Protocol):</h4>
      <p>Chuẩn mở kết nối như "cổng USB-C" giữa AI Client (Claude Desktop/CLI) và Server qua 3 Primitives cốt lõi:</p>
      <ul>
        <li><code>Tools</code>: Hàm thực thi phát sinh tác động ngoài (Read/Write).</li>
        <li><code>Resources</code>: Dữ liệu/tài liệu đọc (Read-only, ví dụ <code>file:///logs/app.log</code>).</li>
        <li><code>Prompts</code>: Mẫu câu hỏi hướng dẫn bọc tham số chuẩn.</li>
      </ul>
      <p>Truyền tải qua 2 chuẩn Transport: <code>stdio</code> (chạy local CLI) và <code>SSE</code> (Server-Sent Events qua HTTP/HTTPS cho môi trường remote).</p>
    `,
    specsAndSchemas: [
      {
        topic: "Tool Declaration & JSON Schema",
        details: "Mỗi Tool gồm `name`, `description` (cực kỳ chi tiết về KHI NÀO nên gọi), và `input_schema` (khai báo kiểu dữ liệu và mảng `required`)."
      },
      {
        topic: "tool_choice Behavior Control",
        details: "`'auto'` (mặc định AI tự chọn), `'any'` (bắt buộc gọi ít nhất 1 tool bất kỳ), hoặc `{'type': 'tool', 'name': 'get_user'}` (bắt buộc gọi đúng 1 tool chỉ định)."
      },
      {
        topic: "tool_result with is_error Flag",
        details: "Phản hồi lỗi mượt: `{'role': 'user', 'content': [{'type': 'tool_result', 'tool_use_id': '...', 'is_error': true, 'content': 'Error 500'}]}`."
      },
      {
        topic: "MCP 3 Primitives Specification",
        details: "`Tools` (giao diện hàm thực thi), `Resources` (dữ liệu tĩnh Read-only URI), `Prompts` (mẫu câu lệnh chứa tham số)."
      },
      {
        topic: "MCP Transport Layers (stdio vs SSE)",
        details: "`stdio` giao tiếp qua luồng chuẩn Input/Output của hệ điều hành cho local tools. `SSE` dùng HTTP/HTTPS Server-Sent Events cho remote servers."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Định nghĩa Enum kháng lỗi có giá trị dự phòng UNKNOWN: enum: ['PENDING', 'PAID', 'REFUNDED', 'UNKNOWN'].",
        bad: "❌ Định nghĩa Enum cứng: enum: ['PENDING', 'PAID']. Khi API trả về 'PROCESSING', JSON Parser vỡ và sập ứng dụng Backend."
      },
      {
        good: "🟢 Trả về khối tool_result chứa is_error: true và văn bản thông báo lỗi khi API bên ngoài gặp lỗi 500.",
        bad: "❌ Ném văng Exception chưa xử lý khiến cả quy trình Agentic loop bị hủy bỏ ngắt đứt."
      },
      {
        good: "🟢 Viết mô tả Tool (description) cực kỳ chi tiết kèm điều kiện ranh giới KHI NÀO nên gọi.",
        bad: "❌ Để mô tả Tool ngắn ngủn mơ hồ như 'Do user operation' khiến Claude quay sang dùng lệnh Terminal thô rủi ro."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Dùng MCP `Resources` để thực thi code tác động ghi/xóa thay vì dùng MCP `Tools` (Resources thuần túy là Read-only).",
      "⚠️ BẪY 2: Gom 10 chức năng CRUD vào chung 1 Monolithic Tool duy nhất làm AI nhầm lẫn tham số.",
      "⚠️ BẪY 3: Quên khai báo mảng `required` trong JSON Schema khiến Claude truyền thiếu các tham số bắt buộc.",
      "⚠️ BẪY 4: Tin rằng Claude tự động chạy code tool bên trong server của Anthropic (Thực tế Client Backend của bạn mới là nơi thực thi code)."
    ],
    productionArchetype: "Mô hình 4: Developer Productivity Tools (MCP Infrastructure & API Connectors)"
  },
  {
    id: "D3",
    code: "D3",
    weight: "20%",
    title: "Domain 3: Claude Code Configuration & Workflows",
    titleVI: "Lĩnh vực 3: Cấu hình Claude Code & Quy trình Làm việc CLI",
    badgeColor: "d3",
    description: "Claude Code CLI flags, permissions, CLAUDE.md hierarchy, custom rules, built-in tools, codebase navigation, and CI/CD automated workflows.",
    descriptionVI: "Các cờ CLI lệnh Claude Code, quản lý quyền hạn, hệ thống tệp quy tắc CLAUDE.md, quy tắc tùy chỉnh, 6 built-in tools tích hợp, và tự động hóa CI/CD.",
    architecturalCore: `
      <p>Domain 3 chiếm <strong>20% điểm số đề thi</strong>, đánh giá khả năng vận hành và cấu hình công cụ lập trình tự động <strong>Claude Code (CLI Agent)</strong> trong môi trường thực tế.</p>

      <h4 style="color: var(--accent-emerald); margin: 0.8rem 0 0.4rem 0;">1. Hệ thống Tệp Cấu hình CLAUDE.md & Hierarchy:</h4>
      <p>Đặt ở gốc dự án để hướng dẫn Claude Code về phong cách code, lệnh build, lệnh test và quy tắc dự án. Thứ tự ưu tiên nạp quy tắc:</p>
      <ol style="padding-left: 1.2rem; margin: 0.4rem 0;">
        <li>Thư mục con tại vị trí hiện tại (<code>./src/CLAUDE.md</code>)</li>
        <li>Gốc dự án (<code>./CLAUDE.md</code>)</li>
        <li>Quy tắc toàn cục User (<code>~/.claude/CLAUDE.md</code>)</li>
      </ol>
      <p><strong>Quy tắc Vàng (Lean Pattern):</strong> Giữ <code>CLAUDE.md</code> ngắn gọn (&lt;100 dòng), chỉ chứa lệnh build/test cốt lõi. Không nhồi nhét 2,000 dòng tài liệu làm lãng phí Context Window.</p>

      <h4 style="color: var(--accent-emerald); margin: 0.8rem 0 0.4rem 0;">2. Cơ chế Phân quyền & CLI Flags:</h4>
      <ul>
        <li><code>--dangerously-skip-permissions</code>: Bỏ qua toàn bộ câu hỏi xác nhận Yes/No. **Chỉ dùng trong môi trường Container/CI/CD Sandbox tự động không có người giám sát**. Cấm dùng trên máy cá nhân sản xuất.</li>
        <li><code>-p "prompt"</code>: Truyền câu lệnh trực tiếp ở chế độ Headless không tương tác.</li>
      </ul>

      <h4 style="color: var(--accent-emerald); margin: 0.8rem 0 0.4rem 0;">3. Quy trình Khám phá Codebase (Glob/Grep First Workflow):</h4>
      <p>Luôn tuân thủ quy trình 3 bước tối ưu Token:</p>
      <ol style="padding-left: 1.2rem; margin: 0.4rem 0;">
        <li><code>GlobTool</code>: Định vị đường dẫn file mà không nạp nội dung file.</li>
        <li><code>GrepTool</code>: Tìm chính xác số dòng chứa từ khóa/hàm cần kiểm tra.</li>
        <li><code>FileReadTool</code>: Chỉ nạp khoảng dòng mục tiêu (start/end lines) vào Context.</li>
      </ol>
    `,
    specsAndSchemas: [
      {
        topic: "CLAUDE.md Location Hierarchy",
        details: "Thứ tự ưu tiên: Current Subdirectory (`./src/CLAUDE.md`) ➔ Project Root (`./CLAUDE.md`) ➔ Global User (`~/.claude/CLAUDE.md`)."
      },
      {
        topic: "Claude Code 6 Built-in Tools Specification",
        details: "`GlobTool` (tìm path), `GrepTool` (tìm symbol/từ khóa), `FileReadTool` (đọc file theo dòng), `FileWriteTool` (tạo file mới), `FileEditTool` (sửa đoạn code cụ thể), `BashTool` (chạy lệnh shell)."
      },
      {
        topic: "CLI Permission Flags",
        details: "Cờ `--dangerously-skip-permissions` cho phép chạy tự động 100% không dừng hỏi Yes/No trong CI/CD Runners."
      },
      {
        topic: "CI/CD Headless PR Review Pipeline",
        details: "Chạy trong GitHub Actions với câu lệnh: `claude -p 'Review PR' --dangerously-skip-permissions`."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Dùng GlobTool tìm file rồi GrepTool tìm chính xác số dòng trước khi dùng FileReadTool đọc đoạn code cụ thể.",
        bad: "❌ Dùng FileReadTool/cat đọc toàn bộ 30 file code 5,000 dòng từ đầu đến cuối làm tràn ngập bộ nhớ Context."
      },
      {
        good: "🟢 Viết hướng dẫn tinh gọn <100 dòng trong CLAUDE.md tập trung vào lệnh build/test.",
        bad: "❌ Biến CLAUDE.md thành cuốn sách 2,000 dòng tài liệu làm lãng phí token mỗi khi khởi chạy phiên làm việc."
      },
      {
        good: "🟢 Dùng FileEditTool khi cần sửa đổi một đoạn hàm cụ thể trong file mã nguồn có sẵn.",
        bad: "❌ Dùng FileWriteTool ghi đè toàn bộ nội dung file khi chỉ cần thay đổi 2 dòng code."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Chạy lệnh CLI thiếu cờ `--dangerously-skip-permissions` trong môi trường CI/CD tự động khiến GitHub Actions runner bị treo vô tận chờ bấm Yes/No.",
      "⚠️ BẪY 2: Lạm dụng cờ `--dangerously-skip-permissions` trên máy cá nhân của lập trình viên gây nguy cơ mất an toàn hệ thống.",
      "⚠️ BẪY 3: Lầm tưởng `CLAUDE.md` có thể thay thế hoàn toàn System Prompt trong API.",
      "⚠️ BẪY 4: Dùng `FileWriteTool` ghi đè toàn bộ file thay vì dùng `FileEditTool` để sửa đổi cục bộ."
    ],
    productionArchetype: "Mô hình 2 & 5: Code Generation with Claude Code & CI/CD Automated PR Review"
  },
  {
    id: "D4",
    code: "D4",
    weight: "20%",
    title: "Domain 4: Prompt Engineering & Structured Output",
    titleVI: "Lĩnh vực 4: Kỹ thuật Prompt Nâng cao & Đầu ra Cấu trúc",
    badgeColor: "d4",
    description: "Few-shot prompting, XML tag boundaries, Chain-of-Thought (<thinking>), prompt chaining, Message Batches API (50% discount), and prompt injection defense.",
    descriptionVI: "Kỹ thuật Few-shot, ranh giới thẻ XML, Chain-of-Thought suy luận, Prompt Chaining dây chuyền, Message Batches API (giảm 50% chi phí), và phòng thủ Prompt Injection.",
    architecturalCore: `
      <p>Domain 4 chiếm <strong>20% điểm số đề thi</strong>, đi sâu vào kỹ thuật tối ưu Prompt để điều khiển Claude tạo ra kết quả chính xác 100% và tiết kiệm chi phí vận hành.</p>

      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">1. Ranh giới thẻ XML & Phòng thủ Prompt Injection:</h4>
      <p>Bọc tất cả dữ liệu người dùng không tin cậy trong các thẻ XML (ví dụ: <code>&lt;user_query&gt;...&lt;/user_query&gt;</code> hoặc <code>&lt;document&gt;...&lt;/document&gt;</code>). Chỉ thị Claude trong System Prompt xử lý nội dung trong thẻ thuần túy là dữ liệu, loại bỏ hoàn toàn nguy cơ bị ghi đè chỉ thị (Prompt Injection).</p>

      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">2. Kỹ thuật Few-Shot Engineering:</h4>
      <p>Cung cấp 2-3 mẫu ví dụ chuẩn dạng Input/Output bên trong các thẻ XML <code>&lt;example&gt;</code> trước khi đưa ra câu hỏi thực tế. Đây là phương pháp hiệu quả nhất để ép Claude tuân thủ cấu trúc JSON phức tạp.</p>

      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">3. Chain-of-Thought (Suy luận từng bước trong <code>&lt;thinking&gt;</code>):</h4>
      <p>Yêu cầu Claude thực hiện suy luận từng bước bên trong thẻ <code>&lt;thinking&gt;</code> trước khi phát ra câu trả lời JSON cuối cùng. Tăng độ chính xác khi bốc tách dữ liệu phức tạp lên tới 40%.</p>

      <h4 style="color: var(--accent-purple); margin: 0.8rem 0 0.4rem 0;">4. Message Batches API (Giảm 50% chi phí API):</h4>
      <p>Dành riêng cho các tác vụ bất đồng bộ khối lượng lớn không cần thời gian thực (như tóm tắt ban đêm 100,000 hóa đơn PDF) với <strong>chiết khấu đúng 50% chi phí</strong> và cam kết SLA hoàn thành trong 24 giờ qua endpoint <code>/v1/messages/batches</code>.</p>
    `,
    specsAndSchemas: [
      {
        topic: "XML Tag Boundaries Schema",
        details: "Phân định rõ ràng: `<system_instructions>` ➔ `<context>` ➔ `<user_query>` ➔ `<output_format>`."
      },
      {
        topic: "Few-shot XML Format",
        details: "`<example><input>Dịch vụ tốt</input><output>{'sentiment': 'POSITIVE'}</output></example>`."
      },
      {
        topic: "Message Batches API 4-Step Flow",
        details: "1. Tạo Batch Request kèm `custom_id` ➔ 2. Nhận `batch_id` ➔ 3. Poll kiểm tra status `in_progress/ended` ➔ 4. Tải kết quả JSONL."
      },
      {
        topic: "Structured JSON via tool_choice",
        details: "Ép Claude trả về JSON chuẩn 100% bằng cách khai báo Tool Schema và đặt `tool_choice: {'type': 'tool', 'name': 'extractor'}`."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Dùng Message Batches API cho công việc xử lý lô hóa đơn ban đêm để tiết kiệm đúng 50% chi phí API.",
        bad: "❌ Gọi API thời gian thực từng request một cho 100,000 hóa đơn ban đêm gây quá tải rate limit và tốn gấp đôi tiền."
      },
      {
        good: "🟢 Bọc dữ liệu đầu vào người dùng trong thẻ XML <user_input>...",
        bad: "❌ Nối thẳng chuỗi nhập của người dùng vào Prompt câu lệnh mà không có ranh giới bảo vệ."
      },
      {
        good: "🟢 Đưa 2-3 mẫu Few-shot chuẩn mực vào prompt để định hình cấu trúc JSON đầu ra.",
        bad: "❌ Đưa quá nhiều mẫu Few-shot (15+ mẫu) làm tràn bộ nhớ Context không cần thiết."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Dùng Message Batches API cho tính năng Chatbot thời gian thực cần trả lời ngay lập tức (Batch API có SLA 24h).",
      "⚠️ BẪY 2: Bỏ qua trường `custom_id` trong Batch API làm mất khả năng đối chiếu kết quả khi xử lý lô dữ liệu lớn.",
      "⚠️ BẪY 3: Nhét văn bản thô của người dùng vào System Prompt mà không dùng thẻ bọc XML.",
      "⚠️ BẪY 4: Lầm tưởng `temperature = 0.0` sẽ đảm bảo 100% JSON chuẩn mà không cần khai báo JSON Schema hay tool_choice."
    ],
    productionArchetype: "Mô hình 6: Structured Data Extraction & OCR Processing at Scale"
  },
  {
    id: "D5",
    code: "D5",
    weight: "15%",
    title: "Domain 5: Context Management & Reliability",
    titleVI: "Lĩnh vực 5: Quản lý Context & Độ Tin Cậy Hệ Thống",
    badgeColor: "d5",
    description: "200k context window mechanics, lost-in-the-middle mitigation, context pruning, summarization compaction, scratchpad files, provenance preservation, and crash recovery manifests.",
    descriptionVI: "Động lực học Context 200k token, khắc phục hiệu ứng Lost-in-the-middle, cắt tỉa Context, tóm tắt nén dung lượng, file nháp Scratchpad, bảo toàn Nguồn gốc Provenance, và manifest phục hồi khi sập server.",
    architecturalCore: `
      <p>Domain 5 chiếm <strong>15% điểm số đề thi</strong>, là tổng hợp các kỹ thuật quản lý bộ nhớ (Context Window) giúp hệ thống AI chạy nhanh, sạch sẽ, không bị ngợp dữ liệu và có thể khôi phục khi sập Server.</p>

      <h4 style="color: var(--accent-rose); margin: 0.8rem 0 0.4rem 0;">1. Tính toán Token & Khắc phục hiệu ứng Lost-in-the-Middle:</h4>
      <ul>
        <li><strong>Định mức Token:</strong> Văn bản Tiếng Anh tốn ~3.5 - 4 ký tự/token. Code và Tiếng Việt tốn ~1 - 2.5 ký tự/token.</li>
        <li><strong>Lost-in-the-Middle Effect:</strong> Trọng số Chú ý (Attention weights) giảm mạnh ở 60% khoảng giữa của tài liệu dài (100k+ token). Luôn đặt chỉ thị quan trọng nhất ở <strong>ĐẦU (System Prompt)</strong> hoặc <strong>ĐUÔI (Lượt User mới nhất)</strong> của payload prompt.</li>
      </ul>

      <h4 style="color: var(--accent-rose); margin: 0.8rem 0 0.4rem 0;">2. Context Pruning & Summarization Compaction:</h4>
      <ul>
        <li><strong>Context Pruning (Cắt tỉa):</strong> Dùng <code>PostToolUse</code> Hook lọc bỏ các khối <code>tool_result</code> cũ rườm rà trong lịch sử nhưng giữ lại các quyết định phản hồi của Agent (giảm 40-60% token).</li>
        <li><strong>Summarization Compaction (Nén tóm tắt):</strong> Tóm tắt 20 lượt hội thoại cũ thành một bản tổng quan hệ thống duy nhất khi dung lượng vượt quá 100k token (giảm 70-80% token).</li>
      </ul>

      <h4 style="color: var(--accent-rose); margin: 0.8rem 0 0.4rem 0;">3. Scratchpad Files & State Manifests:</h4>
      <p>Ghi các phát hiện tạm thời ra file nháp đĩa (<code>notes.md</code>) và lưu tiến độ vào file <code>agent-state/manifest.json</code>. Giúp Agent khôi phục tiến độ chính xác sau khi nén bộ nhớ hoặc bị ngắt điện đột ngột.</p>

      <h4 style="color: var(--accent-rose); margin: 0.8rem 0 0.4rem 0;">4. Preserving Provenance (Bảo toàn Nguồn gốc khi Mâu thuẫn):</h4>
      <p>Khi 2 nguồn tin cho con số mâu thuẫn (ví dụ 8% và 12%), Agent **KHÔNG ĐƯỢC tự ý xóa bỏ 1 nguồn**, mà phải giữ lại cả 2 nguồn kèm URL, ngày khảo sát và bật cờ cảnh báo <code>conflict_detected: true</code>.</p>
    `,
    specsAndSchemas: [
      {
        topic: "Position-aware Layout Specification",
        details: "Cấu trúc Prompt chuẩn: `[KEY DIRECTIVES - ĐẦU]` ➔ `[RAW LOGS CONTEXT - GIỮA]` ➔ `[OUTPUT FORMAT & QUERY - ĐUÔI]`."
      },
      {
        topic: "Pruned tool_result Placeholder Schema",
        details: "Thay thế kết quả đọc file 50k token cũ bằng: `[tool_result pruned: Read file src/main.js - 3 flaws found]`."
      },
      {
        topic: "State Manifest JSON Structure",
        details: "`{'session_id': '...', 'completed_steps': ['step1', 'step2'], 'pending_step': 'step3', 'scratchpad_path': 'notes.md'}`."
      },
      {
        topic: "Attribution Schema with Conflict Flag",
        details: "`{'claim': '...', 'sources': [{'url': '...', 'date': '...'}], 'conflict_detected': true}`."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Cắt tỉa các khối tool_result cũ nặng nề trong lịch sử và thay bằng thẻ tóm tắt tinh gọn.",
        bad: "❌ Gửi lại toàn bộ 150k token chứa kết quả đọc file thô trong từng lượt gọi API liên tiếp."
      },
      {
        good: "🟢 Khi 2 nguồn tin nói 8% và 12%, giữ lại cả 2 nguồn kèm ngày tháng khảo sát và cờ cảnh báo mâu thuẫn.",
        bad: "❌ Tự tiện chọn con số 12% và xóa bỏ hoàn toàn con số 8% của nguồn tin kia."
      },
      {
        good: "🟢 Đặt các chỉ thị ràng buộc quan trọng nhất ở ngay ĐẦU (System Prompt) hoặc ĐUÔI (User Query mới nhất).",
        bad: "❌ Nhét chỉ thị quan trọng vào vị trí 50% giữa của tài liệu context dài 100,000 tokens."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Đặt chỉ thị quan trọng ở khoảng giữa 60% của tài liệu dài khiến Claude bỏ qua chỉ thị do hiệu ứng Lost-in-the-Middle.",
      "⚠️ BẪY 2: Gửi lại toàn bộ log đọc file 100k token thô trong mỗi lượt API mà không thực hiện Context Pruning.",
      "⚠️ BẪY 3: Lầm tưởng nén lịch sử bằng văn xuôi mơ hồ tốt hơn việc lưu trạng thái có cấu trúc vào JSON Manifest.",
      "⚠️ BẪY 4: Tự ý xóa bỏ dữ liệu mâu thuẫn thay vì trích dẫn minh bạch cả 2 nguồn kèm cờ cảnh báo."
    ],
    productionArchetype: "Mô hình 1: Customer Support Resolution Agent & Long-running Workflow Systems"
  }
];
