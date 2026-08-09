/* CCAF Learning Hub - Complete 5 Domain Technical Overview Data */

const DOMAINS_OVERVIEW_DATA = [
  {
    id: "D1",
    code: "D1",
    weight: "27%",
    title: "Domain 1: Agent Architecture & Orchestration",
    titleVI: "Lĩnh vực 1: Kiến trúc Agent & Phối hợp Hệ thống",
    badgeColor: "d1",
    description: "Multi-agent orchestration, coordinator-worker patterns, task decomposition, parallel execution, state recovery, and human-in-the-loop escalation.",
    descriptionVI: "Quản lý phối hợp đa agent, mô hình Coordinator-Worker, phân rã bài toán, thực thi song song, phục hồi trạng thái sau sập và phanh an toàn Human-in-the-Loop.",
    architecturalCore: `
      <p>Domain 1 chiếm <strong>27% điểm số đề thi (trọng số lớn nhất)</strong>. Bản chất cốt lõi của Domain này nằm ở cách thiết kế hệ thống AI tự chủ (Agentic Systems) có khả năng thực thi tác vụ phức tạp nhiều bước.</p>
      <ul>
        <li><strong>Coordinator-Worker Pattern:</strong> Agent chính (Coordinator) không tự làm tất cả công việc rác, mà đẻ ra các Subagent chuyên biệt (Worker) để thực thi từng nhiệm vụ nhỏ (đọc file, tìm kiếm, review code) và gom kết quả lại.</li>
        <li><strong>Flat Hierarchy (Hệ thống Phẳng):</strong> Giới hạn độ sâu phân cấp Subagent ở mức 1-2 tầng. Tránh đẻ Subagent lồng nhau quá sâu (Sub-sub-subagent) gây dead-lock và bùng nổ chi phí token.</li>
        <li><strong>Agentic Loop (Vòng lặp Agent):</strong> Vòng lặp <code>Think → Tool Call → Execute Tool → Return Result → Think</code>. Luôn phải có giới hạn số lượt (<code>max_turns</code>) để tránh vòng lặp vô tận.</li>
        <li><strong>Fault Recovery (Phục hồi Lỗi):</strong> Phân loại lỗi thành 4 nhóm (Transient, Validation, Business, Permission) để chọn phương án Thử lại (Retry) hay Dừng lại đúng đắn.</li>
      </ul>
    `,
    specsAndSchemas: [
      {
        topic: "Message Roles & State Machine",
        details: "Mảng `messages` chứa các role `user`, `assistant`, và `tool`. Giá trị `stop_reason` trong Response đóng vai trò Cờ điều khiển Máy trạng thái (`end_turn`, `tool_use`, `max_tokens`, `stop_sequence`)."
      },
      {
        topic: "Claude Agent SDK Primitives",
        details: "Hỗ trợ các Hook can thiệp luồng: `PreToolUseHook` (phanh an toàn trước khi gọi tool) và `PostToolUseHook` (cắt tỉa dữ liệu thừa trả về từ tool)."
      },
      {
        topic: "Human-in-the-Loop Triggers",
        details: "Kích hoạt Escalation bằng Code Hooks khi: Yêu cầu trực tiếp từ người dùng, chạm ngưỡng tài chính ($500+), hoặc phát hiện lỗ hổng chính sách (Policy Gap)."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Dùng Promise.allSettled() để gom kết quả từ 3 Subagent song song. Nếu 1 Subagent fail, 2 Subagent kia vẫn trả kết quả bình thường.",
        bad: "❌ Dùng Promise.all() khiến 1 Subagent lỗi rớt mạng làm sập và hủy bỏ toàn bộ báo cáo của các Subagent thành công."
      },
      {
        good: "🟢 Đặt phanh an toàn Escalation tại PreToolUse Hook trong Code Backend.",
        bad: "❌ Tin tưởng 100% vào văn bản System Prompt để ngăn AI không thực hiện giao dịch tài chính lớn."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Lầm tưởng Sentiment Analysis (phân tích cảm xúc) hoặc AI Confidence score (độ tự tin của AI) là cờ kích hoạt Escalation tin cậy.",
      "⚠️ BẪY 2: Bắt Subagent thử lại (Retry) vô tận khi gặp lỗi cấm truy cập (Permission Error).",
      "⚠️ BẪY 3: Đẻ Subagent phân cấp quá 3 tầng gây mất kiểm soát luồng điều khiển."
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
    description: "Granular tool schemas, JSON schema validation, resilient enums, Model Context Protocol (MCP) servers, clients, resources, prompts, and tools.",
    descriptionVI: "Thiết kế Schema công cụ tinh gọn, xác thực JSON Schema, Resilient Enums chống sập, giao thức MCP Protocol (Server, Client, Resources, Prompts, Tools).",
    architecturalCore: `
      <p>Domain 2 chiếm <strong>18% điểm số đề thi</strong>, tập trung vào cách thiết kế các giao diện công cụ (Tool Schemas) và tích hợp chuẩn kết nối chuẩn hóa MCP (Model Context Protocol).</p>
      <ul>
        <li><strong>Granular Tools (Công cụ Đơn nhiệm):</strong> Thiết kế mỗi Tool làm đúng 1 việc nhỏ xuất sắc (<code>get_user_by_id</code>, <code>update_email</code>) thay vì tạo 1 Tool "khổng lồ" ôm đồm mọi việc (<code>manage_user_system</code>).</li>
        <li><strong>Resilient Enum (Enum Kháng Lỗi):</strong> Trong mảng <code>enum</code> của JSON Schema, luôn bổ sung giá trị dự phòng <code>UNKNOWN</code> hoặc <code>OTHER</code> để tránh sập JSON Parser khi AI phát sinh giá trị ngoài danh mục.</li>
        <li><strong>MCP Architecture:</strong> Chuẩn hóa kết nối giữa Client (Claude Desktop/CLI) và Server qua 3 Primitives: <code>Tools</code> (hàm thực thi), <code>Resources</code> (dữ liệu/file đọc), và <code>Prompts</code> (mẫu câu hỏi chuẩn).</li>
      </ul>
    `,
    specsAndSchemas: [
      {
        topic: "Tool Declaration Schema",
        details: "Mỗi Tool gồm `name`, `description` (cực kỳ quan trọng để AI hiểu khi nào cần gọi), và `input_schema` (chuẩn JSON Schema)."
      },
      {
        topic: "MCP Transport Layers",
        details: "Hỗ trợ 2 chuẩn truyền tải: `stdio` (chạy local qua dòng lệnh) và `SSE` (Server-Sent Events qua HTTP/HTTPS cho môi trường remote)."
      },
      {
        topic: "Explicit Null vs Omitted",
        details: "Quy định rõ ràng giữa việc truyền `null` và bỏ qua trường (Omitted) trong JSON Schema để AI không bị nhầm lẫn dữ liệu."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Luôn thêm 'UNKNOWN' vào enum: enum: ['PENDING', 'PAID', 'REFUNDED', 'UNKNOWN'].",
        bad: "❌ Định nghĩa enum cứng: enum: ['PENDING', 'PAID']. Khi API trả về 'PROCESSING', ứng dụng sập ngay lập tức."
      },
      {
        good: "🟢 Viết mô tả Tool (description) cực kỳ cụ thể kèm điều kiện KHI NÀO nên gọi.",
        bad: "❌ Để mô tả Tool ngắn ngủn hoặc mơ hồ như 'Do user operation'."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Dùng MCP Resources để thực thi code thay vì dùng MCP Tools.",
      "⚠️ BẪY 2: Gom 10 chức năng CRUD vào chung 1 Tool duy nhất làm AI bị nhầm lẫn tham số.",
      "⚠️ BẪY 3: Quên khai báo các trường bắt buộc trong mảng `required` của JSON Schema."
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
    description: "Claude Code CLI flags, permissions, CLAUDE.md hierarchy, custom rules, subagents, codebase navigation, and CI/CD automated workflows.",
    descriptionVI: "Các cờ CLI lệnh Claude Code, quản lý quyền hạn, hệ thống tệp quy tắc CLAUDE.md, quy tắc tùy chỉnh, subagent tích hợp, và tự động hóa CI/CD.",
    architecturalCore: `
      <p>Domain 3 chiếm <strong>20% điểm số đề thi</strong>, đánh giá khả năng vận hành và cấu hình công cụ lập trình tự động <strong>Claude Code (CLI Agent)</strong> trong môi trường thực tế.</p>
      <ul>
        <li><strong>Hệ thống File Cấu hình CLAUDE.md:</strong> Đặt ở gốc dự án để hướng dẫn Claude Code về phong cách code, lệnh build, lệnh test và quy tắc dự án. Hỗ trợ kế thừa từ thư mục <code>.claude/rules/</code>.</li>
        <li><strong>Cơ chế Phân quyền & CLI Flags:</strong> Sử dụng <code>--dangerously-skip-permissions</code> trong môi trường Container/CI/CD không có người giám sát, và kiểm soát quyền đọc/ghi bằng file cấu hình.</li>
        <li><strong>Chiến lược Khám phá Codebase:</strong> Luôn khuyến khích dùng <code>Glob</code> (tìm file) và <code>Grep</code> (tìm từ khóa) trước khi dùng <code>Read</code> (đọc toàn bộ file) để không tốn bộ nhớ Context.</li>
      </ul>
    `,
    specsAndSchemas: [
      {
        topic: "CLAUDE.md Location Hierarchy",
        details: "Thứ tự ưu tiên: Project Root (`./CLAUDE.md`) ➔ Subdirectory (`./src/CLAUDE.md`) ➔ Global User (`~/.claude/CLAUDE.md`)."
      },
      {
        topic: "Claude Code Built-in Tools",
        details: "6 công cụ tích hợp sẵn: `GlobTool`, `GrepTool`, `ReadTool`, `WriteTool`, `EditTool`, `BashTool`."
      },
      {
        topic: "CI/CD & Headless Execution",
        details: "Chạy Claude Code tự động trong GitHub Actions/GitLab CI với cờ `-p` (prompt) và `--dangerously-skip-permissions`."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Dùng Grep tìm chính xác định nghĩa hàm trước khi mở file đọc.",
        bad: "❌ Dùng Tool Read đọc 30 file code từ đầu đến cuối làm ngập rác bộ nhớ Context."
      },
      {
        good: "🟢 Viết hướng dẫn ngắn gọn, xúc tích trong CLAUDE.md (<100 dòng).",
        bad: "❌ Biến CLAUDE.md thành cuốn sách 2,000 dòng khiến Claude Code bị ngợp thông tin."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Chạy lệnh CLI thiếu cờ `--dangerously-skip-permissions` trong môi trường CI/CD tự động khiến pipeline treo chờ bấm Yes/No.",
      "⚠️ BẪY 2: Lầm tưởng `CLAUDE.md` có thể thay thế hoàn toàn System Prompt trong API.",
      "⚠️ BẪY 3: Dùng Tool `Edit` thay thế cho `Write` khi tạo một file mới hoàn toàn."
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
      <ul>
        <li><strong>Few-Shot Examples (2-4 Mẫu):</strong> Phương pháp hiệu quả nhất để ép Claude tuân thủ định dạng output phức tạp. Đặt các mẫu ví dụ trong thẻ XML <code>&lt;example&gt;</code>.</li>
        <li><strong>Thẻ XML Ranh giới:</strong> Sử dụng các thẻ XML như <code>&lt;document&gt;</code>, <code>&lt;user_query&gt;</code>, <code>&lt;instructions&gt;</code> để tách biệt dữ liệu không tin cậy khỏi câu lệnh, phòng chống các cuộc tấn công Prompt Injection.</li>
        <li><strong>Message Batches API (Tiết kiệm 50% tiền):</strong> Sử dụng cho các tác vụ bất đồng bộ không cần thời gian thực (như phân tích hàng loạt 10,000 hóa đơn) với chi phí rẻ một nửa và trả kết quả trong 24h.</li>
      </ul>
    `,
    specsAndSchemas: [
      {
        topic: "Message Batches API Flow",
        details: "4 bước: 1. Tạo Batch Request với `custom_id` ➔ 2. Nhận `batch_id` ➔ 3. Poll kiểm tra status `in_progress/ended` ➔ 4. Tải kết quả JSONL."
      },
      {
        topic: "Chain-of-Thought (<thinking>)",
        details: "Yêu cầu Claude suy luận từng bước bên trong thẻ `<thinking>` trước khi đưa ra câu trả lời cuối cùng để tăng độ chính xác lên 40%."
      },
      {
        topic: "Strict Output Format",
        details: "Ép Claude trả về JSON sạch bằng cách dùng `tool_choice` hoặc đưa mẫu ví dụ cụ thể vào Few-shot."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Dùng Message Batches API cho công việc xử lý dữ liệu đêm (Batch jobs) để giảm 50% chi phí API.",
        bad: "❌ Gọi API thời gian thực từng request một cho 50,000 file báo cáo gây quá tải rate limit và tốn gấp đôi tiền."
      },
      {
        good: "🟢 Bọc dữ liệu đầu vào người dùng trong thẻ XML <user_input>...",
        bad: "❌ Nối thẳng chuỗi nhập của người dùng vào Prompt câu lệnh mà không có ranh giới bảo vệ."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Dùng Message Batches API cho tính năng Chatbot thời gian thực cần trả lời ngay lập tức.",
      "⚠️ BẪY 2: Bỏ qua trường `custom_id` trong Batch API làm mất khả năng đối chiếu kết quả khi xử lý lỗi.",
      "⚠️ BẪY 3: Đưa quá nhiều mẫu Few-shot (10+ mẫu) làm tràn bộ nhớ Context không cần thiết."
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
    description: "Context pruning, lost-in-the-middle mitigation, position-aware input, scratchpad files, subagent context isolation, provenance preservation, and crash recovery.",
    descriptionVI: "Cắt tỉa Context, khắc phục hiệu ứng Lost-in-the-middle, đầu vào có ý thức vị trí, file nháp Scratchpad, cách ly Context bằng Subagent, bảo toàn Nguồn gốc Provenance, và phục hồi khi sập server.",
    architecturalCore: `
      <p>Domain 5 chiếm <strong>15% điểm số đề thi</strong>, là tổng hợp các kỹ thuật quản lý bộ nhớ (Context Window) giúp hệ thống AI chạy nhanh, sạch sẽ, không bị ngợp dữ liệu và có thể khôi phục khi sập Server.</p>
      <ul>
        <li><strong>Lost-in-the-Middle Mitigation:</strong> Trọng số Chú ý của AI giảm mạnh ở 60% khoảng giữa tài liệu dài. Luôn đặt chỉ thị quan trọng nhất ở ĐẦU (System Prompt) hoặc ĐUÔI (Tin nhắn User mới nhất).</li>
        <li><strong>Context Pruning (Cắt tỉa dữ liệu):</strong> Dùng <code>PostToolUse</code> Hook lọc bỏ 35 trường rác trong JSON 40 trường từ Tool trả về trước khi nhồi vào Context cho AI đọc.</li>
        <li><strong>Scratchpad Files:</strong> Ghi các phát hiện điều trị tạm thời ra file nháp đĩa (<code>notes.md</code>) để khi nén bộ nhớ (<code>/compact</code>) hoặc ngắt phiên, AI vẫn mở ra đọc lại được.</li>
        <li><strong>Preserving Provenance (Bảo toàn Nguồn gốc):</strong> Khi tổng hợp từ nhiều nguồn tin mâu thuẫn nhau, AI KHÔNG ĐƯỢC tự tiện xóa số liệu, mà phải giữ lại cả 2 nguồn kèm URL/Ngày tháng và bật cờ <code>conflict_detected: true</code>.</li>
      </ul>
    `,
    specsAndSchemas: [
      {
        topic: "Position-aware Layout",
        details: "Cấu trúc Prompt chuẩn: `[KEY FINDINGS - ĐẦU]` ➔ `[RAW LOGS - GIỮA]` ➔ `[ACTION ITEMS - ĐUÔI]`."
      },
      {
        topic: "Structured State Manifest",
        details: "Lưu tiến độ ra file `agent-state/manifest.json`: `{\"step1\": \"completed\", \"step2\": \"in_progress\"}` để khôi phục khi cúp điện."
      },
      {
        topic: "Attribution JSON Schema",
        details: "Khung trích dẫn nguồn chuẩn: `claim`, `source_url`, `source_name`, `publication_date`, `confidence`."
      }
    ],
    goodVsBadPatterns: [
      {
        good: "🟢 Đẻ Subagent phụ đọc 20 file code rồi nén lại thành 1 câu kết quả trả về cho Main Agent để bảo vệ 99% bộ nhớ Main Agent.",
        bad: "❌ Bắt Main Agent tự mở đọc 20 file code làm ngập rác bộ nhớ Context của Main Agent."
      },
      {
        good: "🟢 Khi 2 nguồn tin nói 8% và 12%, giữ lại cả 2 nguồn kèm ngày tháng khảo sát và cờ cảnh báo mâu thuẫn.",
        bad: "❌ Tự tiện chọn con số 12% và xóa bỏ hoàn toàn con số 8% của nguồn tin kia."
      }
    ],
    examTraps: [
      "⚠️ BẪY 1: Lầm tưởng nén toàn bộ lịch sử bằng văn xuôi sẽ tốt hơn việc lưu trạng thái có cấu trúc vào JSON Manifest.",
      "⚠️ BẪY 2: Đặt các chỉ thị ràng buộc quan trọng ở vị trí 50% giữa của tài liệu 100,000 token.",
      "⚠️ BẪY 3: Xóa bỏ dữ liệu mâu thuẫn thay vì trích dẫn nguồn rõ ràng kèm ngày tháng."
    ],
    productionArchetype: "Mô hình 1: Customer Support Resolution Agent & Long-running Workflow Systems"
  }
];
