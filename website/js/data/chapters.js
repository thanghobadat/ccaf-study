/* CCAF Learning Hub - Complete & Unabridged 13 Chapters Theory Data (Song ngữ Anh - Việt 100% Đầy Đủ) */

const CHAPTERS_DATA = [
  {
    id: 1,
    title: "Chương 1: Claude API — Nền tảng tương tác với Model",
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    estimatedMinutes: 20,
    summary: "Hiểu sâu sắc cấu trúc Request/Response của Claude Messages API, các tham số bắt buộc, cơ chế Stateless, các vai trò message, trường stop_reason, System Prompt và các thách thức của Context Window.",
    learningObjectives: [
      "Giải thích được lý do Claude API là Stateless và hậu quả nếu không gửi lại toàn bộ lịch sử tin nhắn.",
      "Phân biệt rõ 3 vai trò trong message: user, assistant, và tool (tool_result).",
      "Nhận biết và xử lý đúng 4 giá trị của trường stop_reason (end_turn, tool_use, max_tokens, stop_sequence).",
      "Nắm vững đặc điểm của System Prompt và cảnh báo câu chữ khiến mô hình gọi thừa tool get_customer.",
      "Phân tích 3 vấn đề lớn của Context Window: Hiệu ứng Lost-in-the-middle, Tích lũy kết quả tool thừa, và Mất mát khi tóm tắt lũy tiến."
    ],
    coreMasteries: [
      "Stateless API: Mô hình không lưu trạng thái giữa các lần gọi, bắt buộc phải gửi lại toàn bộ mảng messages.",
      "Message Roles: user (người dùng), assistant (phản hồi của Claude), tool (kết quả thực thi tool dưới dạng content block tool_result).",
      "stop_reason = 'end_turn': Mô hình hoàn thành câu trả lời.",
      "stop_reason = 'tool_use': Mô hình muốn gọi một công cụ và chờ kết quả từ client.",
      "stop_reason = 'max_tokens': Phản hồi bị cắt ngang do thiếu token, cần tăng max_tokens.",
      "System Prompt: Được gửi ở trường 'system' riêng biệt, có độ ưu tiên cao hơn tin nhắn user.",
      "Lost-in-the-middle: Mô hình xử lý tốt thông tin ở đầu và cuối đầu vào dài nhưng dễ bỏ qua chi tiết ở giữa."
    ],
    examTraps: [
      "⚠️ BẪY 1: Nhầm tưởng Claude tự lưu bộ nhớ phiên làm việc mà không cần truyền lại mảng messages cũ.",
      "⚠️ BẪY 2: Viết câu chữ trong System Prompt như 'Luôn xác minh thông tin khách hàng' khiến mô hình lạm dụng gọi tool get_customer ngay cả khi không cần thiết.",
      "⚠️ BẪY 3: Nhầm lẫn giữa stop_reason = 'end_turn' và 'max_tokens' khi phản hồi bị cắt dở dang."
    ],
    selfChecklist: [
      "Tôi giải thích được tại sao phải truyền lại toàn bộ lịch sử hội thoại trong mỗi request.",
      "Tôi phân biệt được 3 vai trò trong mảng messages và cách truyền tool_result.",
      "Tôi thuộc bảng 4 giá trị của stop_reason và hành động tương ứng ở Client.",
      "Tôi hiểu sự nguy hiểm của chỉ thị quá mức trong System Prompt.",
      "Tôi biết cách xử lý 3 vấn đề của Context Window (đặc biệt là Lost-in-the-middle)."
    ],
    sections: [
      {
        heading: "1.1 Cấu trúc yêu cầu API (API Request Structure)",
        content: `
          <p>Claude API hoạt động theo mô hình <strong>Request – Response (Yêu cầu & Phản hồi)</strong>. Mỗi yêu cầu gửi tới endpoint <code>/v1/messages</code> bắt buộc phải tuân theo cấu trúc JSON chuẩn.</p>
          <p>Điểm cốt lõi cần ghi nhớ: <strong>Claude API là Stateless (Không lưu trạng thái)</strong>. Mô hình không lưu giữ bất kỳ thông tin nào từ các cuộc gọi API trước đó. Để tiếp tục cuộc hội thoại, ứng dụng của bạn bắt buộc phải gửi lại toàn bộ lịch sử tin nhắn trong mảng <code>messages</code>.</p>
        `,
        codeExample: `{
  "model": "claude-sonnet-4-6",
  "max_tokens": 1024,
  "system": "Bạn là một trợ lý kiến trúc sư phần mềm chuyên nghiệp.",
  "messages": [
    {"role": "user", "content": "Chào bạn!"},
    {"role": "assistant", "content": "Xin chào! Tôi có thể giúp gì cho bạn?"},
    {"role": "user", "content": "Hãy giải thích về Claude API."}
  ],
  "tools": [...],
  "tool_choice": {"type": "auto"}
}`,
        keyPoints: [
          "model: Lựa chọn mô hình (claude-opus-4-6, claude-sonnet-4-6, claude-haiku-4-5).",
          "max_tokens: Số lượng token tối đa trong phản hồi sinh ra.",
          "system: System prompt xác định vai trò và ràng buộc chung của mô hình.",
          "messages: Mảng chứa lịch sử tin nhắn hội thoại."
        ]
      },
      {
        heading: "1.2 Các vai trò trong Message (Message Roles)",
        content: `
          <p>Mảng <code>messages</code> sử dụng ba vai trò chính:</p>
          <ul>
            <li><code>user</code> — Tin nhắn gửi từ phía người dùng.</li>
            <li><code>assistant</code> — Phản hồi được sinh ra từ mô hình Claude (được đưa vào mảng khi gửi lại lịch sử hội thoại).</li>
            <li><code>tool</code> (kết quả tool) — Kết quả thực thi công cụ ở phía client, xuất hiện dưới dạng content block <code>tool_result</code>.</li>
          </ul>
          <p><strong>Cực kỳ quan trọng cho kỳ thi:</strong> Mô hình không có bộ nhớ phiên (session memory). Mỗi lần gọi API là một xử lý độc lập hoàn toàn.</p>
        `
      },
      {
        heading: "1.3 Trường stop_reason trong phản hồi",
        content: `
          <p>Phản hồi của Claude API luôn bao gồm trường <code>stop_reason</code> cho biết lý do chính xác mô hình dừng sinh nội dung:</p>
          <div style="overflow-x: auto; margin: 1rem 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; border: 1px solid var(--border-color);">
              <thead style="background: var(--bg-tertiary);">
                <tr>
                  <th style="padding: 0.6rem; text-align: left; border: 1px solid var(--border-color);">Giá trị</th>
                  <th style="padding: 0.6rem; text-align: left; border: 1px solid var(--border-color);">Mô tả lý do dừng</th>
                  <th style="padding: 0.6rem; text-align: left; border: 1px solid var(--border-color);">Hành động cần thiết ở Client</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);"><code>"end_turn"</code></td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Mô hình đã hoàn thành toàn bộ phản hồi.</td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Hiển thị kết quả cuối cùng cho người dùng.</td>
                </tr>
                <tr>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);"><code>"tool_use"</code></td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Mô hình muốn thực thi một công cụ (Tool).</td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Thực thi tool ở backend và gửi lại tool_result.</td>
                </tr>
                <tr>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);"><code>"max_tokens"</code></td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Đã chạm trần giới hạn token quy định.</td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Phản hồi bị dở dang; cần tăng tham số max_tokens.</td>
                </tr>
                <tr>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);"><code>"stop_sequence"</code></td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Gặp chuỗi ký tự dừng do bạn quy định.</td>
                  <td style="padding: 0.6rem; border: 1px solid var(--border-color);">Xử lý ngắt hội thoại theo logic ứng dụng.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "1.4 System Prompt",
        content: `
          <p>System prompt là chỉ thị đặc biệt định nghĩa ngữ cảnh và các quy tắc hành vi cho Claude:</p>
          <ul>
            <li>Không nằm trong mảng <code>messages</code>; được truyền riêng biệt ở trường <code>system</code>.</li>
            <li>Có độ ưu tiên chỉ thị cao hơn tin nhắn của người dùng.</li>
            <li>Được dùng để xác định vai trò, ràng buộc an toàn và định dạng đầu ra.</li>
          </ul>
          <p><strong>Cảnh báo bẫy thi CCAF:</strong> Cách diễn đạt quá mức trong system prompt có thể tạo ra liên kết gọi tool không mong muốn. Ví dụ, chỉ thị <em>"Luôn luôn xác minh thông tin tài khoản khách hàng trước khi trả lời"</em> sẽ khiến mô hình tự động gọi tool <code>get_customer</code> liên tục ngay cả khi câu hỏi của khách chỉ là một thắc mắc chung chung không liên quan đến tài khoản.</p>
        `
      },
      {
        heading: "1.5 Context Window và Các vấn đề Production",
        content: `
          <p>Context window là tổng lượng văn bản (tính bằng token) mà mô hình có thể xử lý trong một lần gọi API. Nó bao gồm: System prompt + Lịch sử messages + Định nghĩa tools + Kết quả tool_result.</p>
          <p><strong>3 vấn đề quan trọng cần nắm chắc cho kỳ thi:</strong></p>
          <ol>
            <li><strong>Hiệu ứng "Lost-in-the-middle":</strong> Mô hình xử lý rất đáng tin cậy các thông tin nằm ở ĐẦU và ĐUÔI của prompt dài, nhưng có nguy cơ bỏ qua các chi tiết nằm ở GIỮA. <em>Cách khắc phục: Đặt thông tin quan trọng nhất ở đầu hoặc cuối prompt.</em></li>
            <li><strong>Tích lũy kết quả Tool (Tool Accumulation):</strong> Mỗi lần gọi tool đều chèn toàn bộ output vào context. Nếu một tool trả về 40+ trường nhưng chỉ có 5 trường thực sự cần thiết, phần lớn context đã bị lãng phí. <em>Cách khắc phục: Thực hiện Context Pruning (cắt tỉa trường thừa) ở client.</em></li>
            <li><strong>Mất mát khi Tóm tắt lũy tiến (Progressive Summarization Loss):</strong> Khi nén lịch sử hội thoại dài, các con số cụ thể, tỷ lệ % và ngày tháng chính xác thường bị mờ nhạt thành các từ ước lệ ("khoảng", "xấp xỉ").</li>
          </ol>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn nhớ rằng Claude API là Stateless. Đặt thông tin quan trọng ở đầu hoặc cuối prompt để tránh hiệu ứng lost-in-the-middle và lọc bỏ trường thừa bằng Context Pruning."
  },
  {
    id: 2,
    title: "Chương 2: Tools và tool_use (Gọi công cụ bên ngoài)",
    domain: "D2",
    domainTitle: "Tool Design & MCP Integration",
    estimatedMinutes: 20,
    summary: "Cơ chế cho phép Claude gọi các hàm/tool bên ngoài để tra cứu dữ liệu, thực thi code hoặc thao tác hệ thống.",
    learningObjectives: [
      "Nắm chắc 4 bước trong vòng lặp Tool Use (The Tool Use Loop).",
      "Biết cách thiết kế trường description chuẩn để Claude gọi tool đúng lúc.",
      "Hiểu rõ sự khác biệt của 3 chế độ trong tool_choice (auto, any, tool)."
    ],
    coreMasteries: [
      "Tool Loop: Định nghĩa tools → Mô hình trả tool_use → Client chạy hàm → Client gửi tool_result.",
      "Granular Tools: Chia nhỏ tool đơn nhiệm tốt hơn 1 tool đa năng cồng kềnh.",
      "tool_choice = 'auto': Mặc định, mô hình tự quyết định có dùng tool hay không.",
      "tool_choice = 'any': Bắt buộc mô hình phải chọn ít nhất 1 tool bất kỳ.",
      "tool_choice = 'tool': Bắt buộc mô hình phải gọi đúng 1 tool chỉ định."
    ],
    examTraps: [
      "⚠️ BẪY 1: Nghĩ rằng Claude tự thực thi code/API bên thứ 3 (thực tế client của bạn phải tự chạy code rồi gửi lại tool_result).",
      "⚠️ BẪY 2: Viết mô tả tool chung chung khiến Claude gọi nhầm hoặc dùng lệnh shell thô."
    ],
    selfChecklist: [
      "Tôi giải thích được 4 bước của vòng lặp Tool Use.",
      "Tôi phân biệt được khi nào dùng tool_choice = 'auto' vs 'any' vs 'tool'.",
      "Tôi hiểu tại sao nên chia nhỏ công cụ thành Granular Tools."
    ],
    sections: [
      {
        heading: "2.1 Vòng lặp Tool Use (The Tool Use Loop)",
        content: `
          <p>Claude không thể tự truy cập Internet hay tự chạy code trên máy tính của bạn. Tuy nhiên, nó có thể thông báo: <em>"Tôi muốn bạn chạy hàm này với các tham số sau"</em>. Đó chính là cơ chế <strong>tool_use</strong>.</p>
          <p>Vòng lặp diễn ra theo 4 bước:</p>
          <ol>
            <li>Bạn định nghĩa danh sách công cụ trong tham số <code>tools</code> khi gửi API.</li>
            <li>Claude phân tích và trả về <code>stop_reason: "tool_use"</code> kèm thông tin hàm cần gọi.</li>
            <li>Ứng dụng của bạn tự chạy hàm đó ở phía backend của bạn.</li>
            <li>Bạn gửi lại kết quả chạy hàm cho Claude dưới dạng <code>tool_result</code>.</li>
          </ol>
        `,
        codeExample: `// Định nghĩa tool gửi trong API
"tools": [
  {
    "name": "get_weather",
    "description": "Lấy nhiệt độ hiện tại của một thành phố",
    "input_schema": {
      "type": "object",
      "properties": {
        "location": {"type": "string", "description": "Tên thành phố, ví dụ: Hanoi"}
      },
      "required": ["location"]
    }
  }
]`
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Đừng viết mô tả Tool chung chung (monolithic tool). Hãy chia nhỏ thành các tool có nhiệm vụ rõ ràng (granular tools)."
  },
  {
    id: 3,
    title: "Chương 3: Claude Agent SDK — Xây dựng hệ thống Agentic",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 25,
    summary: "Mô hình Coordinator - Subagent, lập kế hoạch nhiệm vụ, điều phối và xử lý song song với Claude Agent SDK.",
    learningObjectives: [
      "Hiểu kiến trúc Orchestrator-Worker (Lead & Subagents) và khi nào nên áp dụng.",
      "Nắm quy tắc bắt buộc thêm 'Task' vào allowedTools của Coordinator.",
      "Biết cách khởi chạy Subagents thực sự song song (Parallel Execution)."
    ],
    coreMasteries: [
      "Orchestrator-Worker: Agent chính (Coordinator) điều phối các Agent con (Subagents).",
      "Flat Hierarchy: Phân cấp phẳng (Coordinator gọi trực tiếp Subagent song song), tránh lồng nhau quá sâu.",
      "allowedTools = ['Task']: Nếu thiếu 'Task', Coordinator chỉ nói về việc ủy quyền mà không thể spawn subagent.",
      "Parallel Execution: Chạy song song thật sự khi Coordinator phát ra nhiều thẻ Task tool_use trong CÙNG 1 message."
    ],
    examTraps: [
      "⚠️ BẪY 1: Quên thêm 'Task' vào allowedTools làm Coordinator chỉ nói mồm mà không chạy subagent.",
      "⚠️ BẪY 2: Nhầm tưởng dặn 'Hãy chạy song song nhé' trong system prompt là đủ (thực tế phải gửi nhiều Task tool trong cùng 1 message)."
    ],
    selfChecklist: [
      "Tôi giải thích được vai trò của Coordinator và Subagent.",
      "Tôi biết lý do phải thêm 'Task' vào allowedTools.",
      "Tôi nắm chắc điều kiện để các Subagent chạy song song thực sự."
    ],
    sections: [
      {
        heading: "3.1 Mô hình Coordinator - Worker (Lead & Subagents)",
        content: `
          <p>Khi giải quyết các bài toán lớn (như đọc 200 file code hoặc phân tích hợp đồng pháp lý), việc dùng một agent duy nhất sẽ làm cồng kềnh bộ nhớ context. Mô hình <strong>Orchestrator-Worker</strong> giải quyết bằng cách:</p>
          <ul>
            <li><strong>Coordinator (Agent chính):</strong> Lập kế hoạch, phân chia công việc, spawn (tạo) các agent con và tổng hợp kết quả cuối cùng.</li>
            <li><strong>Subagents (Agent con):</strong> Mỗi agent con có bộ nhớ context riêng biệt và tập tool riêng để thực hiện 1 nhiệm vụ nhỏ.</li>
          </ul>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Để chạy song song nhiều Subagent thật sự, Coordinator phải phát ra nhiều lệnh gọi tool 'Task' trong CÙNG MỘT message phản hồi."
  },
  {
    id: 4,
    title: "Chương 4: Model Context Protocol (MCP)",
    domain: "D2",
    domainTitle: "Tool Design & MCP Integration",
    estimatedMinutes: 20,
    summary: "Chuẩn giao tiếp mở giúp kết nối Claude bảo mật với các nguồn dữ liệu bên ngoài (Database, GitHub, File System).",
    learningObjectives: [
      "Hiểu khái niệm MCP Server & MCP Client.",
      "Biết cơ chế cấp quyền và bảo mật của MCP đối với các thao tác đọc/ghi dữ liệu."
    ],
    coreMasteries: [
      "MCP là chuẩn mở kết nối Claude an toàn với Database, GitHub, File System.",
      "MCP Server cung cấp tài nguyên & công cụ; Client (Claude Code/Desktop) kết nối và thực thi."
    ],
    examTraps: [
      "⚠️ BẪY 1: Nhầm lẫn MCP với API thông thường. MCP là giao thức tiêu chuẩn mở (Open Protocol)."
    ],
    selfChecklist: [
      "Tôi hiểu MCP đóng vai trò như chuẩn kết nối mở cho AI.",
      "Tôi phân biệt được MCP Server và MCP Client."
    ],
    sections: [
      {
        heading: "4.1 MCP là gì?",
        content: `
          <p><strong>Model Context Protocol (MCP)</strong> là một chuẩn kết nối mở do Anthropic phát triển. Hãy tưởng tượng MCP như cổng USB-C dành cho AI: nó cho phép Claude kết nối an toàn với mọi cơ sở dữ liệu, công cụ hoặc ứng dụng doanh nghiệp mà không cần viết lại code tích hợp riêng cho từng hệ thống.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Cung cấp mô tả MCP chi tiết rõ ràng để mô hình ưu tiên dùng MCP Server tùy chỉnh hơn là các thao tác bash/sed thô."
  },
  {
    id: 5,
    title: "Chương 5: Claude Code — Cấu hình và Quy trình làm việc",
    domain: "D3",
    domainTitle: "Claude Code Configuration & Workflows",
    estimatedMinutes: 20,
    summary: "Sử dụng công cụ Claude Code CLI trong Terminal, cấu hình CLAUDE.md, quản lý quyền hạn và session.",
    learningObjectives: [
      "Nắm vững vai trò và nội dung nên ghi trong file CLAUDE.md.",
      "Hiểu cờ CLI `--dangerously-skip-permissions` và rủi ro an toàn."
    ],
    coreMasteries: [
      "CLAUDE.md: File cấu hình dự án ghi các lệnh build/test và coding style cốt lõi.",
      "--dangerously-skip-permissions: Bỏ qua bước hỏi cấp quyền, chỉ dùng trong Sandbox an toàn."
    ],
    examTraps: [
      "⚠️ BẪY 1: Nhét toàn bộ tài liệu dự án dài dòng vào CLAUDE.md (chỉ nên ghi quy tắc & lệnh thiết yếu)."
    ],
    selfChecklist: [
      "Tôi biết mục đích của file CLAUDE.md.",
      "Tôi hiểu khi nào nên dùng cờ bỏ qua quyền hạn CLI."
    ],
    sections: [
      {
        heading: "5.1 Vai trò của file CLAUDE.md",
        content: `
          <p><strong>CLAUDE.md</strong> là file cấu hình hướng dẫn dành riêng cho dự án khi bạn làm việc với Claude Code CLI. Khi Claude Code khởi chạy trong một thư mục, nó sẽ tự động đọc file này trước tiên.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Cờ lệnh CLI và file CLAUDE.md giúp tự động hóa quy trình làm việc cho lập trình viên mà không cần gõ lại prompt mỗi phiên."
  },
  {
    id: 6,
    title: "Chương 6: Prompt Engineering — Các kỹ thuật nâng cao",
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    estimatedMinutes: 20,
    summary: "Tối ưu hóa prompt với Few-shot examples, JSON Schema, và kiểm soát định dạng đầu ra chuẩn xác.",
    learningObjectives: [
      "Sử dụng Few-shot Prompting để chuẩn hóa định dạng đầu ra.",
      "Viết chỉ thị chống Hallucination (trả về null khi thiếu thông tin)."
    ],
    coreMasteries: [
      "Few-shot Examples: Đưa 2-3 ví dụ mẫu cụ thể là cách tốt nhất để ép định dạng đầu ra.",
      "Explicit Null: Yêu cầu 'trả về null nếu không tìm thấy' để tránh mô hình bịa số liệu."
    ],
    examTraps: [
      "⚠️ BẪY 1: Chỉ đặt temperature = 0 mà không cung cấp Few-shot hay JSON Schema."
    ],
    selfChecklist: [
      "Tôi biết cách dùng Few-shot ví dụ mẫu.",
      "Tôi biết câu dặn 'trả về null' giúp chống hallucination."
    ],
    sections: [
      {
        heading: "6.1 Few-Shot Prompting & Chuẩn hóa định dạng",
        content: `
          <p>Để đảm bảo Claude luôn trả về kết quả đúng định dạng (ví dụ: ngày tháng YYYY-MM-DD hoặc cấu hình JSON chính xác), phương pháp hiệu quả nhất không phải là dặn đi dặn lại bằng lời mà là <strong>cung cấp các ví dụ mẫu (Few-shot examples)</strong> trực tiếp trong prompt.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Đừng chỉ đặt temperature = 0. Để chuẩn hóa định dạng dữ liệu nhất quán 100%, hãy kết hợp Few-shot examples và JSON Schema."
  },
  {
    id: 7,
    title: "Chương 7: Message Batches API (Xử lý hàng loạt)",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 15,
    summary: "Giảm 50% chi phí API cho các tác vụ xử lý tài liệu không yêu cầu thời gian thực bằng Batches API.",
    learningObjectives: [
      "Nhận biết khi nào nên dùng Message Batches API thay vì Real-time API.",
      "Hiểu lợi ích về chi phí (giảm 50%) và SLA (24h) của Batches API."
    ],
    coreMasteries: [
      "Batches API: Giảm 50% giá API cho xử lý hàng loạt bất đồng bộ trong 24 giờ."
    ],
    examTraps: [
      "⚠️ BẪY 1: Dùng Real-time API cho công việc xử lý dữ liệu hàng đêm không cần gấp."
    ],
    selfChecklist: [
      "Tôi biết Batches API giúp tiết kiệm 50% chi phí.",
      "Tôi biết trường hợp sử dụng phù hợp cho Batches API."
    ],
    sections: [
      {
        heading: "7.1 Tiết kiệm chi phí với Batches API",
        content: `
          <p>Nếu bạn có 10.000 tài liệu cần trích xuất thông tin và không cần kết quả ngay lập tức trong vài giây, hãy dùng <strong>Message Batches API</strong>. Bạn gửi một tập hợp các yêu cầu, Claude sẽ xử lý bất đồng bộ trong vòng 24 giờ với <strong>giá rẻ hơn 50%</strong> so với API thông thường.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Quy tắc định tuyến chi phí: Đừng bao giờ dùng Real-time Messages API cho các nhu cầu xử lý bất đồng bộ không gấp."
  },
  {
    id: 8,
    title: "Chương 8: Chiến lược Phân rã Tác vụ (Task Decomposition)",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 20,
    summary: "Ba mô hình phân rã công việc: Prompt Chaining, Routing, và Orchestrator-Workers.",
    learningObjectives: [
      "Phân biệt 3 mô hình: Prompt Chaining vs Routing vs Orchestrator-Workers."
    ],
    coreMasteries: [
      "Prompt Chaining: Chuỗi các bước cố định tuần tự.",
      "Routing: Phân loại đầu vào thành các nhóm rồi chuyển hướng.",
      "Orchestrator-Workers: Phân công linh hoạt dựa trên LLM trung tâm."
    ],
    examTraps: [
      "⚠️ BẪY 1: Chọn Orchestrator-Workers cho quy trình cố định giống hệt nhau mỗi lần."
    ],
    selfChecklist: [
      "Tôi phân biệt được 3 mô hình phân rã tác vụ."
    ],
    sections: [
      {
        heading: "8.1 Chọn đúng mẫu phân rã",
        content: `
          <ul>
            <li><strong>Prompt Chaining (Chuỗi Prompt):</strong> Dùng khi quy trình cố định, bước 1 $\\rightarrow$ bước 2 $\\rightarrow$ bước 3 giống hệt nhau cho mọi đầu vào.</li>
            <li><strong>Routing (Định tuyến):</strong> Dùng khi đầu vào chia làm các nhóm rõ ràng và mỗi nhóm cần một cách xử lý riêng.</li>
            <li><strong>Orchestrator-Workers:</strong> Dùng khi công việc mở, không đoán trước được số lượng bước nhỏ, cần LLM linh hoạt phân công.</li>
          </ul>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Nhớ kỹ sự khác biệt giữa Chaining (cố định), Routing (phân loại), và Orchestrator-Workers (linh hoạt)."
  },
  {
    id: 9,
    title: "Chương 9: Escalation và Human-in-the-Loop (Duyệt thủ công)",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 15,
    summary: "Kết hợp trí tuệ nhân tạo và sự giám sát của con người cho các hành động rủi ro cao.",
    learningObjectives: [
      "Hiểu cơ chế duyệt thủ công dựa trên điểm tin cậy (Confidence Score) và ngưỡng giá trị.",
      "Sử dụng Application Intercept Hooks để chặn các hành vi rủi ro cao ở tầng code server."
    ],
    coreMasteries: [
      "Confidence > 90%: Tự động hóa.",
      "Confidence < 90% hoặc giá trị vượt ngưỡng: Đẩy sang Human Review Queue.",
      "Application Intercept Hooks: Chặn giao dịch nguy hiểm server-side thay vì phụ thuộc System Prompt."
    ],
    examTraps: [
      "⚠️ BẪY 1: Tin hoàn toàn vào System Prompt 'Cấm giao dịch quá 500$' (thực tế vẫn có 3% tỷ lệ thất bại)."
    ],
    selfChecklist: [
      "Tôi biết khi nào cần đẩy vào hàng chờ Human Review.",
      "Tôi hiểu vai trò của Application Intercept Hooks."
    ],
    sections: [
      {
        heading: "9.1 Ngưỡng tự động hóa & Can thiệp của con người",
        content: `
          <p>Trong các hệ thống thực tế (như duyệt hoàn tiền ngân hàng), hệ thống tự động xử lý khi độ tin cậy mô hình $>90\%$. Nếu $<90\%$ hoặc giá trị giao dịch vượt ngưỡng an toàn (vd $>500$), hệ thống sẽ đẩy vào hàng chờ duyệt của con người (Human Review Queue).</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Dùng Application Intercept Hooks để chặn các hành vi nguy hiểm server-side thay vì chỉ tin vào System Prompt."
  },
  {
    id: 10,
    title: "Chương 10: Xử lý lỗi trong hệ thống Đa Agent",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 15,
    summary: "Xử lý sự cố mạng, tràn bộ nhớ context và phục hồi trạng thái khi agent bị crash.",
    learningObjectives: [
      "Trả về kết quả tool chứa `isError: true` thay vì ném Exception.",
      "Khôi phục trạng thái hệ thống sau crash bằng tệp manifest có cấu trúc."
    ],
    coreMasteries: [
      "Graceful Tool Failure: Trả về `isError: true` để mô hình biết và xử lý mượt mà.",
      "Crash Recovery: Dùng tệp manifest xuất có cấu trúc và tiêm lại phần state liên quan."
    ],
    examTraps: [
      "⚠️ BẪY 1: Ném Exception làm sập agent hoặc trả về chuỗi rỗng khi tool lỗi."
    ],
    selfChecklist: [
      "Tôi biết cách xử lý lỗi tool bằng isError: true.",
      "Tôi biết cách khôi phục state bằng manifest."
    ],
    sections: [
      {
        heading: "10.1 Xử lý lỗi Tool mượt mà",
        content: `
          <p>Khi tool gặp lỗi (vd API bên thứ 3 bị sập), đừng ném ra Exception làm sập agent. Hãy trả về kết quả tool chứa thuộc tính <code>"isError": true</code> để Claude biết và xử lý mượt mà.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn trả về isError: true trong kết quả tool thay vì ném exception hoặc trả về chuỗi rỗng."
  },
  {
    id: 11,
    title: "Chương 11: Quản lý Context trong Hệ thống Production",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 20,
    summary: "Cắt tỉa bộ nhớ (Context Pruning), Prompt Caching và chống trôi ngữ cảnh (Lost-in-the-middle).",
    learningObjectives: [
      "Thực hiện Context Pruning để lọc bỏ trường dữ liệu rườm rà trước khi đưa vào context.",
      "Khắc phục hiệu ứng Lost-in-the-middle bằng cách đặt thông tin quan trọng ở đầu hoặc cuối prompt."
    ],
    coreMasteries: [
      "Context Pruning: Lọc bỏ trường thừa từ kết quả API rườm rà.",
      "Lost-in-the-middle: Đặt thông tin quan trọng ở đầu hoặc cuối prompt."
    ],
    examTraps: [
      "⚠️ BẪY 1: Đưa toàn bộ 40+ trường API vào context khiến lãng phí token."
    ],
    selfChecklist: [
      "Tôi hiểu phương pháp Context Pruning.",
      "Tôi biết cách tránh hiệu ứng Lost-in-the-middle."
    ],
    sections: [
      {
        heading: "11.1 Context Pruning",
        content: `
          <p>Khi gọi các API trả về 40+ trường dữ liệu rườm rà, ứng dụng nên tự lọc bớt chỉ giữ lại 4-5 trường cần thiết trước khi chèn vào hội thoại của Claude để tiết kiệm không gian context.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Đặt thông tin quan trọng nhất ở đầu hoặc cuối prompt để tránh hiệu ứng 'lost-in-the-middle'."
  },
  {
    id: 12,
    title: "Chương 12: Bảo toàn Provenance (Nguồn gốc Trích dẫn)",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 15,
    summary: "Giữ nguyên nguồn gốc tài liệu và trích dẫn qua các tầng tổng hợp đa agent.",
    learningObjectives: [
      "Sử dụng Structured Claim-Source Mapping để giữ nguồn trích dẫn khi tổng hợp báo cáo."
    ],
    coreMasteries: [
      "Structured Claim-Source Mapping: Yêu cầu Subagent xuất dữ liệu có cấu trúc ánh xạ Claim-Source."
    ],
    examTraps: [
      "⚠️ BẪY 1: Dùng văn bản tự do khiến agent tổng hợp làm mất trích dẫn nguồn."
    ],
    selfChecklist: [
      "Tôi biết cách bảo toàn trích dẫn nguồn bằng dữ liệu có cấu trúc."
    ],
    sections: [
      {
        heading: "12.1 Structured Claim-Source Mapping",
        content: `
          <p>Để báo cáo cuối cùng không bị mất trích dẫn nguồn, bắt buộc các subagent phải xuất ra dữ liệu có cấu trúc ánh xạ rõ ràng giữa Khẳng định (Claim) và Nguồn (Source URL/Document).</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Dùng dữ liệu có cấu trúc ánh xạ Claim-Source end-to-end thay vì thêm prefix thủ công trong văn bản."
  },
  {
    id: 13,
    title: "Chương 13: Các công cụ tích hợp của Claude Code",
    domain: "D3",
    domainTitle: "Claude Code Configuration & Workflows",
    estimatedMinutes: 15,
    summary: "Hiểu sâu các công cụ tích hợp như Grep, Glob, View, Edit, Bash trong Claude Code.",
    learningObjectives: [
      "Dùng Glob và Grep để định vị code thay vì đọc từng file một."
    ],
    coreMasteries: [
      "Glob/Grep First: Tìm kiếm cấu trúc và từ khóa trước khi tải nội dung file vào context."
    ],
    examTraps: [
      "⚠️ BẪY 1: Đọc tuần tự hàng trăm file code gây quá tải context."
    ],
    selfChecklist: [
      "Tôi biết tại sao nên dùng Glob/Grep trước khi đọc nội dung file."
    ],
    sections: [
      {
        heading: "13.1 Glob và Grep vs Đọc toàn bộ File",
        content: `
          <p>Khi khám phá một codebase lớn (hàng trăm file), việc đọc toàn bộ từng file là lãng phí context. Hãy dùng Glob để tìm cấu trúc file và Grep để định vị các từ khóa quan trọng trước.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn ưu tiên dùng Glob/Grep để định vị code quan trọng trước khi đọc nội dung file."
  }
];
