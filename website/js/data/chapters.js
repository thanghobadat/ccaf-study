/* CCAF Learning Hub - Complete & Unabridged 13 Chapters Theory Data (Song ngữ Anh - Việt 100% Đầy Đủ & Dễ Hiểu Vượt Trội) */

const CHAPTERS_DATA = [
  {
    id: 1,
    title: "Chương 1: Claude API — Nền tảng tương tác với Model",
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    estimatedMinutes: 25,
    summary: "Hiểu sâu sắc cấu trúc Request/Response của Claude Messages API, tính chất Stateless, các vai trò message, trường stop_reason, System Prompt và các thách thức của Context Window.",
    learningObjectives: [
      "Giải thích được lý do Claude API là Stateless và hậu quả nếu không gửi lại toàn bộ lịch sử tin nhắn.",
      "Phân biệt rõ 3 vai trò trong message: user, assistant, và tool (tool_result).",
      "Nhận biết và xử lý đúng 4 giá trị của trường stop_reason (end_turn, tool_use, max_tokens, stop_sequence).",
      "Nắm vững đặc điểm của System Prompt và bẫy câu chữ khiến mô hình gọi thừa tool get_customer.",
      "Phân tích 3 vấn đề lớn của Context Window: Hiệu ứng Lost-in-the-middle, Tích lũy kết quả tool thừa, và Mất mát khi tóm tắt lũy tiến."
    ],
    coreMasteries: [
      "Stateless API: Mô hình không lưu trạng thái giữa các lần gọi, bắt buộc phải gửi lại toàn bộ mảng messages.",
      "Message Roles: user (người dùng), assistant (phản hồi của Claude), tool (kết quả thực thi tool dưới dạng content block tool_result).",
      "stop_reason = 'end_turn': Mô hình đã hoàn thành câu trả lời.",
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
        heading: "1.1 Cấu trúc yêu cầu API (API Request Structure) & Tính chất Stateless",
        content: `
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Hãy tưởng tượng Claude API như một bác sĩ khám bệnh hoàn toàn mới mỗi lần bạn bước vào phòng. Bác sĩ không lưu bất kỳ hồ sơ nào trong đầu. Mỗi lần tái khám, bạn phải mang theo toàn bộ cuốn sổ khám bệnh (lịch sử hội thoại mảng <code>messages</code>). Nếu bạn quên mang sổ cũ, bác sĩ sẽ không thể biết lần trước đã chẩn đoán tới đâu!
          </div>
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
        heading: "1.4 System Prompt & Bẫy Chỉ Thị Quá Mức",
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
    estimatedMinutes: 25,
    summary: "Cơ chế cho phép Claude gọi các hàm/tool bên ngoài để tra cứu dữ liệu, thực thi code hoặc thao tác hệ thống.",
    learningObjectives: [
      "Nắm chắc 4 bước trong vòng lặp Tool Use (The Tool Use Loop).",
      "Biết cách thiết kế trường description chuẩn để Claude gọi tool đúng lúc.",
      "Hiểu rõ sự khác biệt của 3 chế độ trong tool_choice (auto, any, tool)."
    ],
    coreMasteries: [
      "Tool Loop: Định nghĩa tools → Mô hình trả tool_use → Client chạy hàm → Client gửi tool_result.",
      "Granular Tools: Chia nhỏ tool đơn nhiệm tốt hơn 1 tool đa năng cồng kềnh (Monolithic Tool).",
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
        heading: "2.1 Vòng lặp Tool Use 4 bước (The Tool Use Loop)",
        content: `
          <div class="callout callout-title" style="background: rgba(14, 165, 233, 0.08); border-left: 4px solid var(--accent-blue); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Claude đóng vai trò như một vị bác sĩ kê đơn thuốc, nhưng Claude không tự mở tủ thuốc lấy thuốc. Claude viết đơn: <em>"Cần kiểm tra nhiệt độ bệnh nhân bằng nhiệt kế"</em> (trả về <code>stop_reason: tool_use</code>). Y tá (là ứng dụng backend của bạn) sẽ thực hiện thao tác đó ở phòng thí nghiệm, lấy kết quả đo được rồi nộp lại cho bác sĩ (gửi lại <code>tool_result</code>).
          </div>
          <p>Claude không thể tự truy cập Internet hay tự chạy code trên máy tính của bạn. Tuy nhiên, nó có thể thông báo: <em>"Tôi muốn bạn chạy hàm này với các tham số sau"</em>. Đó chính là cơ chế <strong>tool_use</strong>.</p>
          <p>Vòng lặp diễn ra theo 4 bước chuẩn:</p>
          <ol>
            <li><strong>Định nghĩa:</strong> Bạn gửi mảng <code>tools</code> chứa tên, mô tả và JSON Schema các tham số đầu vào.</li>
            <li><strong>Kích hoạt:</strong> Mô hình phân tích và trả về <code>stop_reason: "tool_use"</code> kèm tên tool và JSON input.</li>
            <li><strong>Thực thi:</strong> Backend của bạn nhận lệnh, tự thực thi hàm/API bên ngoài đó.</li>
            <li><strong>Trả về:</strong> Backend của bạn đóng gói kết quả dưới dạng content block <code>tool_result</code> và gửi lại cho Claude.</li>
          </ol>
        `,
        codeExample: `// Định nghĩa tool gửi trong API
"tools": [
  {
    "name": "get_weather",
    "description": "Lấy nhiệt độ hiện tại của một thành phố cụ thể",
    "input_schema": {
      "type": "object",
      "properties": {
        "location": {"type": "string", "description": "Tên thành phố, ví dụ: Hanoi"}
      },
      "required": ["location"]
    }
  }
]`
      },
      {
        heading: "2.2 Granular Tools vs Monolithic Tools",
        content: `
          <p>Trong thiết kế hệ thống thực tế:</p>
          <ul>
            <li><strong>Monolithic Tools (Công cụ cồng kềnh):</strong> Một tool nhận hàng chục tham số phức tạp để làm nhiều việc một lúc. Điều này khiến mô hình dễ nhầm lẫn và gọi lỗi.</li>
            <li><strong>Granular Tools (Công cụ đơn nhiệm tinh gọn):</strong> Chia nhỏ thành các tool đơn giản, mỗi tool chỉ giải quyết đúng 1 chức năng (Ví dụ: <code>search_users</code>, <code>get_user_details</code>, <code>update_user_status</code>). Mô hình dễ dàng chọn đúng công cụ thích hợp.</li>
          </ul>
        `
      },
      {
        heading: "2.3 Tham số tool_choice",
        content: `
          <p>Bạn có thể điều khiển cách Claude chọn tool thông qua tham số <code>tool_choice</code>:</p>
          <ul>
            <li><code>{"type": "auto"}</code> (Mặc định): Mô hình tự quyết định có dùng tool hay chỉ trả lời bằng văn bản.</li>
            <li><code>{"type": "any"}</code>: Bắt buộc mô hình phải gọi ít nhất 1 tool (nhưng do mô hình tự chọn tool nào).</li>
            <li><code>{"type": "tool", "name": "get_weather"}</code>: Bắt buộc mô hình phải gọi đúng 1 tool chỉ định.</li>
          </ul>
        `
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
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Coordinator giống như Trưởng Phòng Dự Án. Khi có một nhiệm vụ lớn (như xây dựng tính năng mới), Trưởng phòng không tự mình viết hết code và thiết kế giao diện. Trưởng phòng phân chia việc và gọi 3 chuyên viên (Subagents): Chuyên viên Frontend, Chuyên viên Backend, Chuyên viên Tester. Mỗi chuyên viên làm việc độc lập trong phòng riêng của mình (Context riêng), sau đó báo cáo kết quả về cho Trưởng phòng tổng hợp!
          </div>
          <p>Khi giải quyết các bài toán lớn (như đọc 200 file code hoặc phân tích hợp đồng pháp lý), việc dùng một agent duy nhất sẽ làm cồng kềnh bộ nhớ context. Mô hình <strong>Orchestrator-Worker</strong> giải quyết bằng cách:</p>
          <ul>
            <li><strong>Coordinator (Agent chính):</strong> Lập kế hoạch, phân chia công việc, spawn (tạo) các agent con và tổng hợp kết quả cuối cùng.</li>
            <li><strong>Subagents (Agent con):</strong> Mỗi agent con có bộ nhớ context riêng biệt và tập tool riêng để thực hiện 1 nhiệm vụ nhỏ.</li>
          </ul>
        `
      },
      {
        heading: "3.2 Bẫy allowedTools = ['Task'] & Parallel Execution",
        content: `
          <p>Để Coordinator có thể phân công nhiệm vụ cho Subagent, điều kiện tiên quyết là mảng <code>allowedTools</code> của Coordinator phải khai báo công cụ <code>"Task"</code>.</p>
          <p><strong>Cảnh báo bẫy đề thi Anthropic CCAF:</strong></p>
          <ul>
            <li>Nếu thiếu <code>"Task"</code> trong <code>allowedTools</code>, Coordinator chỉ có thể xuất văn bản tự do mô tả dự định ủy quyền chứ không khởi chạy được Subagent.</li>
            <li>Để các Subagents chạy **song song thật sự (Parallel Execution)**, Coordinator phải phát ra **nhiều lệnh gọi tool Task trong CÙNG MỘT message phản hồi API**. Việc dặn trong prompt "hãy chạy song song" hoàn toàn không có hiệu lực kỹ thuật nếu API xuất từng thẻ rải rác.</li>
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
    estimatedMinutes: 25,
    summary: "Chuẩn giao tiếp mở giúp kết nối Claude bảo mật với các nguồn dữ liệu bên ngoài (Database, GitHub, File System).",
    learningObjectives: [
      "Hiểu khái niệm MCP Server & MCP Client.",
      "Biết cơ chế cấp quyền và bảo mật của MCP đối với các thao tác đọc/ghi dữ liệu.",
      "Phân biệt 3 thành phần chính trong MCP: Tools, Resources, Prompts."
    ],
    coreMasteries: [
      "MCP là chuẩn mở kết nối Claude an toàn với Database, GitHub, File System.",
      "MCP Server cung cấp tài nguyên & công cụ; Client (Claude Code/Desktop) kết nối và thực thi.",
      "3 thành phần MCP: Tools (Hàm gọi), Resources (Dữ liệu tĩnh/File), Prompts (Mẫu hướng dẫn sẵn)."
    ],
    examTraps: [
      "⚠️ BẪY 1: Nhầm lẫn MCP với API thông thường. MCP là giao thức tiêu chuẩn mở (Open Protocol).",
      "⚠️ BẪY 2: Cung cấp mô tả MCP thiếu rõ ràng khiến mô hình ưu tiên chạy lệnh bash/sed thô thay vì gọi MCP Server."
    ],
    selfChecklist: [
      "Tôi hiểu MCP đóng vai trò như chuẩn kết nối mở cho AI.",
      "Tôi phân biệt được MCP Server và MCP Client.",
      "Tôi thuộc 3 thành phần của MCP (Tools, Resources, Prompts)."
    ],
    sections: [
      {
        heading: "4.1 Khái niệm Model Context Protocol (MCP)",
        content: `
          <div class="callout callout-title" style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid var(--accent-emerald); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Hãy tưởng tượng MCP như cổng cắm USB-C tiêu chuẩn trên máy tính. Trước đây, mỗi thiết bị (bàn phím, chuột, màn hình) cần một dây cáp và cổng cắm riêng biệt. MCP định nghĩa một cổng chuẩn hóa giúp Claude (Client) cắm thẳng vào bất kỳ Cơ sở dữ liệu, GitHub, Slack hay File System (MCP Servers) mà không phải viết lại code tùy chỉnh từ đầu!
          </div>
          <p><strong>Model Context Protocol (MCP)</strong> là một giao thức chuẩn mở được Anthropic thiết kế. Gồm 2 thành phần chính:</p>
          <ul>
            <li><strong>MCP Server:</strong> Nơi chứa dữ liệu thực tế (PostgreSQL, GitHub API, Local Directory) và cung cấp các endpoint an toàn.</li>
            <li><strong>MCP Client:</strong> Ứng dụng như Claude Desktop hoặc Claude Code CLI kết nối tới Server để gửi yêu cầu và nhận dữ liệu.</li>
          </ul>
        `
      },
      {
        heading: "4.2 3 Thành phần chính của MCP Protocol",
        content: `
          <p>Một MCP Server có thể cung cấp 3 loại tài nguyên cho Claude:</p>
          <ol>
            <li><strong>Tools (Công cụ):</strong> Các hàm thực thi hành động (vd: <code>create_issue</code>, <code>query_sql</code>).</li>
            <li><strong>Resources (Tài nguyên):</strong> Các tệp dữ liệu đọc tĩnh hoặc luồng dữ liệu (vd: <code>file:///logs/app.log</code>).</li>
            <li><strong>Prompts (Mẫu chỉ thị):</strong> Các template prompt được chuẩn hóa sẵn giúp người dùng thực hiện nhiệm vụ nhanh.</li>
          </ol>
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
      "Hiểu cờ CLI `--dangerously-skip-permissions` và rủi ro an toàn.",
      "Biết cách thiết lập quy trình CI/CD PR Review tự động với Claude Code."
    ],
    coreMasteries: [
      "CLAUDE.md: File cấu hình dự án ghi các lệnh build/test và coding style cốt lõi.",
      "--dangerously-skip-permissions: Bỏ qua bước hỏi cấp quyền, chỉ dùng trong Sandbox/CI-CD an toàn.",
      "Glob/Grep trước View: Định vị file trước khi tải nội dung vào context."
    ],
    examTraps: [
      "⚠️ BẪY 1: Nhét toàn bộ tài liệu dự án dài dòng vào CLAUDE.md (chỉ nên ghi quy tắc & lệnh thiết yếu).",
      "⚠️ BẪY 2: Chạy cờ `--dangerously-skip-permissions` trên môi trường Production thực tế."
    ],
    selfChecklist: [
      "Tôi biết mục đích của file CLAUDE.md.",
      "Tôi hiểu khi nào nên dùng cờ bỏ qua quyền hạn CLI.",
      "Tôi nắm quy trình làm việc chuẩn trong Claude Code CLI."
    ],
    sections: [
      {
        heading: "5.1 Vai trò của file CLAUDE.md",
        content: `
          <div class="callout callout-title" style="background: rgba(245, 158, 11, 0.08); border-left: 4px solid var(--accent-amber); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> File <code>CLAUDE.md</code> giống như "Tờ ghi chú dán trên màn hình" dành cho lập trình viên mới nhận việc. Nó chỉ chứa đúng những lệnh quan trọng nhất (Lệnh chạy test là gì? Lệnh build là gì? Quy tắc đặt tên biến là gì?). Nếu dán một cuốn sách 500 trang lên màn hình, lập trình viên sẽ bị ngợp và lãng phí thời gian đọc!
          </div>
          <p><strong>CLAUDE.md</strong> là file cấu hình hướng dẫn dành riêng cho dự án khi bạn làm việc với Claude Code CLI. Khi Claude Code khởi chạy trong một thư mục, nó sẽ tự động đọc file này trước tiên.</p>
          <p><strong>Quy tắc ghi CLAUDE.md:</strong> Chỉ ghi các thông tin ngắn gọn như lệnh test (<code>npm test</code>), lệnh lint, quy tắc code style cốt lõi. Tránh ghi tài liệu dài dòng vì sẽ gây lãng phí token context.</p>
        `
      },
      {
        heading: "5.2 Cờ lệnh --dangerously-skip-permissions",
        content: `
          <p>Mặc định, Claude Code CLI sẽ hỏi xin xác nhận của bạn trước khi thực thi lệnh Terminal nguy hại hoặc chỉnh sửa file. Cờ <code>--dangerously-skip-permissions</code> cho phép tự động duyệt toàn bộ lệnh.</p>
          <p><strong>Quy tắc an toàn CCAF:</strong> Chỉ sử dụng cờ này trong môi trường <strong>Isolated Container / CI-CD Pipeline Sandbox</strong>. Không bao giờ chạy cờ này trên máy tính cá nhân chứa dữ liệu quan trọng.</p>
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
      "Viết chỉ thị chống Hallucination (trả về null khi thiếu thông tin).",
      "Dùng thẻ XML để phân tách ranh giới dữ liệu an toàn."
    ],
    coreMasteries: [
      "Few-shot Examples: Đưa 2-3 ví dụ mẫu cụ thể là cách tốt nhất để ép định dạng đầu ra.",
      "Explicit Null: Yêu cầu 'trả về null nếu không tìm thấy' để tránh mô hình bịa số liệu.",
      "XML Boundaries: Dùng thẻ <doc>...</doc> phân tách prompt chỉ thị và văn bản đầu vào."
    ],
    examTraps: [
      "⚠️ BẪY 1: Nhầm tưởng để temperature = 0 là đủ chuẩn hóa định dạng mà không cần Few-shot.",
      "⚠️ BẪY 2: Không yêu cầu Explicit Null khiến mô hình bịa ra số liệu plausible giả khi thiếu thông tin."
    ],
    selfChecklist: [
      "Tôi biết cách dùng Few-shot ví dụ mẫu.",
      "Tôi viết được câu lệnh bắt buộc Explicit Null.",
      "Tôi biết cách bao bọc dữ liệu bằng thẻ XML."
    ],
    sections: [
      {
        heading: "6.1 Few-Shot Prompting & Chuẩn hóa định dạng",
        content: `
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Nếu bạn yêu cầu thợ làm bánh "Hãy làm cho tôi một chiếc bánh", thợ sẽ làm theo ý họ. Nhưng nếu bạn đưa 3 bức ảnh mẫu chiếc bánh thực tế (Few-shot examples), thợ sẽ làm đúng 100% kiểu dáng bạn mong muốn. Đưa ví dụ mẫu luôn hiệu quả hơn trăm lời giải thích!
          </div>
          <p>Để đảm bảo Claude xuất đúng định dạng JSON hoặc phong cách văn bản mong muốn, phương pháp hiệu quả nhất là đưa 2-3 ví dụ đầu vào và đầu ra mẫu (Few-shot examples) ngay trong prompt.</p>
        `
      },
      {
        heading: "6.2 Kỹ thuật Explicit Null chống Bịa thông tin (Hallucination)",
        content: `
          <p>Khi trích xuất dữ liệu từ văn bản thiếu thông tin (ví dụ: tìm số điện thoại trong email nhưng email không có số điện thoại), mô hình có xu hướng bịa ra một số ngẫu nhiên plausible (có vẻ hợp lý).</p>
          <p><strong>Giải pháp Anthropic:</strong> Luôn thêm chỉ thị rõ ràng: <em>"Nếu thông tin không xuất hiện trong văn bản, bắt buộc trả về giá trị null"</em>.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn dùng Few-shot ví dụ mẫu kết hợp chỉ thị Explicit Null để có kết quả trích xuất dữ liệu chuẩn xác nhất."
  },
  {
    id: 7,
    title: "Chương 7: Thiết kế Schema nâng cao & Resilient Enums",
    domain: "D4",
    domainTitle: "Prompt Engineering & Structured Output",
    estimatedMinutes: 25,
    summary: "Xây dựng JSON Schema bền vững chống vỡ dữ liệu với Resilient Catch-Alls, Data Evolution và Schema Redundancy.",
    learningObjectives: [
      "Áp dụng mẫu Resilient Catch-All Enum để xử lý trường hợp dữ liệu lạ.",
      "Thiết kế Schema Redundancy để phát hiện lỗi tính toán/OCR và đẩy sang duyệt thủ công.",
      "Quản lý sự thay đổi dữ liệu theo thời gian (Data Evolution Rule)."
    ],
    coreMasteries: [
      "Resilient Catch-All: Thêm giá trị 'other' vào enum kết hợp trường 'other_detail'.",
      "Schema Redundancy: Yêu cầu cả 'calculated_total' và 'stated_total' để phát hiện sai lệch.",
      "Data Evolution Rule: Lưu vết dữ liệu thay đổi gồm giá trị, nguồn và ngày có hiệu lực."
    ],
    examTraps: [
      "⚠️ BẪY 1: Giới hạn cứng enum khiến JSON Schema báo lỗi Validation Error khi gặp loại dữ liệu mới.",
      "⚠️ BẪY 2: Ghi đè dữ liệu cũ khi có phụ lục hợp đồng sửa đổi thay vì lưu vết đa giá trị kèm ngày hiệu lực."
    ],
    selfChecklist: [
      "Tôi thiết kế được Resilient Catch-All Enum trong JSON Schema.",
      "Tôi giải thích được nguyên lý Schema Redundancy để bắt lỗi OCR.",
      "Tôi biết cách lưu vết dữ liệu hợp đồng theo thời gian."
    ],
    sections: [
      {
        heading: "7.1 Anti-Pattern: Fragile Expansion & Giải pháp Resilient Catch-Alls",
        content: `
          <div class="callout callout-title" style="background: rgba(244, 63, 94, 0.08); border-left: 4px solid var(--accent-rose); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Hãy tưởng tượng một tủ phân loại thư chỉ có 3 ngăn: [Nhà riêng, Căn hộ, Biệt thự]. Khi có một lá thư gửi tới "Studio" hoặc "Nhà kho cải tạo", người đưa thư sẽ vứt lá thư đi vì không có ngăn phù hợp (Validation Error). Mẫu **Resilient Catch-All** thêm một ngăn thứ 4: [Khác (other)] kèm một ô ghi chú chi tiết bên cạnh!
          </div>
          <p>Trong thực tế Production, nếu bạn chỉ giới hạn enum cứng như <code>["house", "apartment", "condo"]</code>, khi văn bản xuất hiện loại hình "studio", hệ thống API sẽ báo lỗi Validation Error và thất bại.</p>
          <p><strong>Cấu trúc JSON Schema chuẩn Resilient Catch-All:</strong></p>
        `,
        codeExample: `{
  "type": "object",
  "properties": {
    "property_type": {
      "type": "string",
      "enum": ["house", "apartment", "condo", "other"]
    },
    "property_type_detail": {
      "type": "string",
      "description": "Chi tiết cụ thể nếu property_type là 'other'"
    }
  },
  "required": ["property_type"]
}`
      },
      {
        heading: "7.2 Schema Redundancy — Phát hiện lỗi OCR & Đẩy Human Review",
        content: `
          <p>Khi trích xuất hóa đơn bị mờ (OCR kém), 18% trường hợp dòng hàng (line items) không khớp với tổng tiền trên hóa đơn.</p>
          <p><strong>Giải pháp Schema Redundancy của Anthropic:</strong> Yêu cầu mô hình trích xuất cả 2 trường:</p>
          <ul>
            <li><code>stated_total</code>: Tổng tiền ghi trực tiếp trên hóa đơn.</li>
            <li><code>calculated_total</code>: Tổng tiền do mô hình tự cộng từ các dòng hàng.</li>
          </ul>
          <p>Ở tầng code ứng dụng: Nếu <code>stated_total != calculated_total</code>, tự động đánh cờ đẩy vào hàng chờ <strong>Human Review Queue (Duyệt thủ công)</strong>.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn thêm 'other' + trường detail vào Enum và dùng Schema Redundancy để tự động phát hiện lỗi sai lệch dữ liệu."
  },
  {
    id: 8,
    title: "Chương 8: Phân tuyến Chi phí & SLA — Messages vs Batch API",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 20,
    summary: "Tối ưu hóa chi phí vận hành với Message Batches API (Tiết kiệm 50% chi phí) và điều hướng SLA phù hợp.",
    learningObjectives: [
      "Phân biệt khi nào dùng Messages API (Real-time) vs Message Batches API (Async 24h).",
      "Tận dụng mức giảm giá 50% chi phí của Batch API cho các tác vụ không thời gian thực."
    ],
    coreMasteries: [
      "Messages API: Dành cho tương tác thời gian thực (Real-time), chi phí cao nhất.",
      "Message Batches API: Tiết kiệm 50% chi phí, hoàn thành trong 24 giờ, phù hợp tác vụ xử lý lô bất đồng bộ.",
      "Rule: Không bao giờ mặc định dùng Real-time API cho các nhu cầu xử lý bất đồng bộ."
    ],
    examTraps: [
      "⚠️ BẪY 1: Dùng Messages API thời gian thực để tổng hợp 50.000 tài liệu đêm gây lãng phí 50% chi phí ngân sách."
    ],
    selfChecklist: [
      "Tôi phân biệt được ưu/nhược điểm của Batch API.",
      "Tôi áp dụng được quy tắc lựa chọn API theo SLA."
    ],
    sections: [
      {
        heading: "8.1 Quy tắc Routing theo SLA & Chi phí",
        content: `
          <div class="callout callout-title" style="background: rgba(14, 165, 233, 0.08); border-left: 4px solid var(--accent-blue); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Messages API như dịch vụ Giao hàng Hỏa tốc trong 15 phút (đắt tiền, cần dùng ngay). Message Batches API như dịch vụ Giao hàng Tiết kiệm trong ngày (giảm 50% giá cước). Nếu khách hàng đồng ý nhận tài liệu sau 6-12 tiếng, sử dụng Giao hàng Hỏa tốc là sự lãng phí ngân sách doanh nghiệp!
          </div>
          <p><strong>Message Batches API</strong> là tính năng gửi hàng loạt yêu cầu của Anthropic. Đặc điểm cốt lõi:</p>
          <ul>
            <li><strong>Giảm 50% chi phí</strong> so với cuộc gọi API thời gian thực thông thường.</li>
            <li>Hoàn thành và trả kết quả trong vòng 24 giờ.</li>
            <li>Rất thích hợp cho tác vụ: OCR hàng ngàn hóa đơn, đánh giá bài thi định kỳ, phân tích sentiment hàng tuần.</li>
          </ul>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Với các tác vụ bất đồng bộ không yêu cầu trả lời ngay lập tức, luôn chọn Message Batches API để tiết kiệm 50% chi phí."
  },
  {
    id: 9,
    title: "Chương 9: Escalation và Human-in-the-Loop (Duyệt thủ công)",
    domain: "D5",
    domainTitle: "Context Management & Reliability",
    estimatedMinutes: 20,
    summary: "Kết hợp trí tuệ nhân tạo và sự giám sát của con người cho các hành động rủi ro cao.",
    learningObjectives: [
      "Hiểu cơ chế duyệt thủ công dựa trên điểm tin cậy (Confidence Score) và ngưỡng giá trị.",
      "Sử dụng Application Intercept Hooks để chặn các hành vi rủi ro cao ở tầng code server."
    ],
    coreMasteries: [
      "Confidence > 90%: Tự động hóa hoàn toàn.",
      "Confidence < 90% hoặc giao dịch > $500: Đẩy sang Human Review Queue.",
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
          <div class="callout callout-title" style="background: rgba(245, 158, 11, 0.08); border-left: 4px solid var(--accent-amber); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Hệ thống bảo mật ngân hàng tự động duyệt các giao dịch nhỏ $10. Tuy nhiên khi có giao dịch chuyển tiền $10.000 sang tài khoản lạ, hệ thống sẽ dừng lại và yêu cầu nhân viên xác minh OTP/gọi điện cho chủ tài khoản (Human-in-the-loop).
          </div>
          <p>Trong các hệ thống thực tế (như duyệt hoàn tiền ngân hàng), hệ thống tự động xử lý khi độ tin cậy mô hình $>90\%$. Nếu $<90\%$ hoặc giá trị giao dịch vượt ngưỡng an toàn (vd $>500$), hệ thống sẽ đẩy vào hàng chờ duyệt của con người (Human Review Queue).</p>
          <p><strong>Application Intercept Hooks:</strong> Luôn thực hiện chặn các quy tắc chính sách (policy constraints) ở tầng code backend của ứng dụng chứ không chỉ trông đợi vào System Prompt.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Dùng Application Intercept Hooks để chặn các hành vi nguy hiểm server-side thay vì chỉ tin vào System Prompt."
  },
  {
    id: 10,
    title: "Chương 10: Xử lý lỗi & Phục hồi trong Hệ thống Đa Agent",
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    estimatedMinutes: 20,
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
        heading: "10.1 Graceful Tool Failures với isError: true",
        content: `
          <p>Khi công cụ bên ngoài bị lỗi (vd API tra cứu thời tiết sập mạng), backend của bạn không được ném ra Exception làm vỡ ứng dụng.</p>
          <p><strong>Giải pháp Anthropic:</strong> Đóng gói thông báo lỗi dưới dạng content block <code>tool_result</code> có thuộc tính <code>"isError": true</code>. Claude sẽ đọc thông báo lỗi này và tự điều chỉnh phương án khác mượt mà.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn trả về isError: true trong kết quả tool thay vì ném exception hoặc trả về chuỗi rỗng."
  },
  {
    id: 11,
    title: "Chương 11: Quản lý Context nâng cao & Context Pruning",
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
        heading: "11.1 Kỹ thuật Context Pruning",
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
    estimatedMinutes: 20,
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
    title: "Chương 13: Các công cụ tích hợp trong Claude Code",
    domain: "D3",
    domainTitle: "Claude Code Configuration & Workflows",
    estimatedMinutes: 20,
    summary: "Hiểu sâu các công cụ tích hợp như Grep, Glob, View, Edit, Bash trong Claude Code CLI.",
    learningObjectives: [
      "Dùng Glob và Grep để định vị code trước khi nạp file vào context."
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
        heading: "13.1 Quy tắc Glob/Grep First",
        content: `
          <p>Khi khám phá một codebase lớn (hàng trăm file), việc đọc toàn bộ từng file là lãng phí context. Hãy dùng Glob để tìm cấu trúc file và Grep để định vị các từ khóa quan trọng trước.</p>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn ưu tiên dùng Glob/Grep để định vị code quan trọng trước khi đọc nội dung file."
  }
];
