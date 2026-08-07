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
}`
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
        `
      },
      {
        heading: "1.3 Trường stop_reason trong phản hồi",
        content: `
          <p>Phản hồi của Claude API luôn bao gồm trường <code>stop_reason</code> cho biết lý do chính xác mô hình dừng sinh nội dung:</p>
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Giá trị stop_reason</th>
                  <th>Ý nghĩa phản hồi</th>
                  <th>Hành động cần xử lý ở Client</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>"end_turn"</code></td>
                  <td>Mô hình hoàn thành câu trả lời.</td>
                  <td>Hiển thị câu trả lời cuối cùng cho người dùng.</td>
                </tr>
                <tr>
                  <td><code>"tool_use"</code></td>
                  <td>Mô hình muốn gọi một công cụ (Tool).</td>
                  <td>Chạy hàm ở backend và gửi lại tool_result.</td>
                </tr>
                <tr>
                  <td><code>"max_tokens"</code></td>
                  <td>Phản hồi bị cắt ngang do chạm trần token.</td>
                  <td>Tăng tham số max_tokens hoặc gửi yêu cầu nối tiếp.</td>
                </tr>
                <tr>
                  <td><code>"stop_sequence"</code></td>
                  <td>Gặp chuỗi ngắt ký tự do bạn chỉ định.</td>
                  <td>Xử lý ngắt dòng theo logic ứng dụng.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "1.4 System Prompt & Bẫy Câu Chữ Quá Mức",
        content: `
          <p>System prompt là chỉ thị định nghĩa vai trò và ràng buộc hành vi chung cho Claude:</p>
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 BAD PATTERN (Chỉ thị quá mức)</div>
              <pre><code>"system": "Luôn luôn xác minh thông tin tài khoản khách hàng trước khi trả lời bất kỳ câu hỏi nào."</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600; margin-top: 0.5rem;">
                ❌ Hậu quả: Mô hình sẽ tự động gọi tool get_customer liên tục ngay cả khi khách chỉ hỏi giờ mở cửa!
              </div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GOOD PATTERN (Chỉ thị có điều kiện)</div>
              <pre><code>"system": "Khi người dùng hỏi thông tin cá nhân hoặc tài khoản, hãy xác minh tài khoản trước khi truy xuất dữ liệu."</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600; margin-top: 0.5rem;">
                ✅ Ưu điểm: Mô hình chỉ gọi tool get_customer đúng lúc có thắc mắc tài khoản.
              </div>
            </div>
          </div>
        `
      },
      {
        heading: "1.5 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 1</div>
            <div class="kc-question">
              Tình huống: Khi gửi prompt dài 100.000 tokens, Claude thường bỏ qua thông tin quan trọng nằm ở giữa tài liệu. Đây là hiệu ứng gì và làm sao khắc phục?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              - <strong>Hiện tượng:</strong> Hiệu ứng <strong>Lost-in-the-middle</strong> (do cơ chế Attention Mechanism của Transformer ưu tiên đầu và đuôi prompt).<br>
              - <strong>Cách khắc phục:</strong> Đặt các chỉ thị quan trọng hoặc dữ liệu cốt lõi ở ngay <strong>ĐẦU hoặc ĐUÔI</strong> của prompt.
            </div>
          </div>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn nhớ rằng Claude API là Stateless. Đặt thông tin quan trọng ở đầu hoặc cuối prompt để tránh hiệu ứng lost-in-the-middle."
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
            💡 <strong>Ẩn dụ trực quan:</strong> Claude đóng vai trò như một vị bác sĩ kê đơn thuốc, nhưng Claude không tự mở tủ lấy thuốc. Claude viết đơn: <em>"Cần kiểm tra nhiệt độ bệnh nhân"</em> (trả về <code>stop_reason: tool_use</code>). Y tá (ứng dụng backend của bạn) thực hiện lấy kết quả đo nộp lại cho bác sĩ (gửi <code>tool_result</code>).
          </div>

          <div class="diagram-flow">
            <div class="flow-step">
              <div class="flow-number">1</div>
              <div class="flow-content">
                <div class="flow-title">1. Gửi Định Nghĩa Tools</div>
                <div class="flow-desc">Client gửi mảng <code>tools</code> chứa name, description và JSON schema các tham số.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">2</div>
              <div class="flow-content">
                <div class="flow-title">2. Phản Hồi Gọi Tool</div>
                <div class="flow-desc">Claude dừng sinh văn bản và trả về <code>stop_reason: "tool_use"</code> kèm ID lệnh và tên hàm.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">3</div>
              <div class="flow-content">
                <div class="flow-title">3. Chạy Hàm Ở Backend</div>
                <div class="flow-desc">Backend ứng dụng của bạn nhận thông tin, tự thực thi API/hàm thực tế ở server.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">4</div>
              <div class="flow-content">
                <div class="flow-title">4. Trả Kết Quả tool_result</div>
                <div class="flow-desc">Backend gửi lại kết quả chạy cho Claude dưới dạng content block <code>tool_result</code>.</div>
              </div>
            </div>
          </div>
        `
      },
      {
        heading: "2.2 Granular Tools vs Monolithic Tools",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 MONOLITHIC TOOL (Cách Sai)</div>
              <p style="font-size: 0.85rem;">Một tool gom 10 tham số quản lý người dùng, vừa tạo, vừa sửa, vừa xóa:</p>
              <pre><code>{"name": "manage_user", "input_schema": {...10_fields...}}</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Mô hình dễ nhầm lẫn tham số.</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GRANULAR TOOLS (Cách Chuẩn)</div>
              <p style="font-size: 0.85rem;">Chia nhỏ thành các tool đơn nhiệm tinh gọn:</p>
              <pre><code>{"name": "get_user"}, {"name": "update_user_email"}</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Mô hình gọi chính xác 100%.</div>
            </div>
          </div>
        `
      },
      {
        heading: "2.3 Chế độ tool_choice",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Chế độ tool_choice</th>
                  <th>Hành vi của Claude</th>
                  <th>Trường hợp sử dụng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>{"type": "auto"}</code></td>
                  <td>Mô hình tự quyết định dùng tool hay trả văn bản.</td>
                  <td>Mặc định cho trợ lý hội thoại linh hoạt.</td>
                </tr>
                <tr>
                  <td><code>{"type": "any"}</code></td>
                  <td>Bắt buộc mô hình phải chọn ít nhất 1 tool bất kỳ.</td>
                  <td>Ép mô hình tra cứu dữ liệu trước khi trả lời.</td>
                </tr>
                <tr>
                  <td><code>{"type": "tool", "name": "get_weather"}</code></td>
                  <td>Bắt buộc mô hình phải gọi đúng tool chỉ định.</td>
                  <td>Ép mô hình trích xuất dữ liệu có cấu trúc.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "2.4 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 2</div>
            <div class="kc-question">
              Tình huống: Tool bên thứ 3 của bạn bị lỗi sập mạng API. Làm cách nào để thông báo cho Claude mà không làm sập ứng dụng?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Trả về content block <code>tool_result</code> chứa thuộc tính <code>"isError": true</code> và thông báo lỗi dạng văn bản. Không được ném Exception hay trả về chuỗi rỗng!
            </div>
          </div>
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
    estimatedMinutes: 30,
    summary: "Mô hình Orchestrator - Worker, lập kế hoạch nhiệm vụ, Context Isolation, vòng lặp Agentic Loop 4 bước, AgentDefinition SDK, mẫu Task Tool chuẩn và hệ thống Hooks (PreToolUse/PostToolUse).",
    learningObjectives: [
      "Hiểu kiến trúc Orchestrator-Worker (Lead & Subagents) và quy tắc Hub-and-Spoke.",
      "Giải thích nguyên tắc Context Isolation: Subagent sở hữu bộ nhớ riêng, không tự động kế thừa mảng messages của Coordinator.",
      "Nắm vững 4 bước trong vòng lặp Agentic Loop và các Anti-patterns khiến agent vòng lặp vô hạn.",
      "Sử dụng AgentDefinition SDK để khai báo tên, mô tả, tools và prompt cho từng Subagent.",
      "Phân biệt mẫu Task Tool BAD (truyền thừa context) vs GOOD (truyền prompt tinh gọn).",
      "Vận dụng Hooks (PreToolUse/PostToolUse) để chặn lệnh nguy hiểm 100% Deterministic thay vì phụ thuộc System Prompt."
    ],
    coreMasteries: [
      "Orchestrator-Worker: Agent chính (Coordinator) lập kế hoạch, điều phối các Agent con (Subagents) xử lý đơn nhiệm.",
      "Context Isolation: Mỗi Subagent có mảng messages riêng biệt, giúp giải phóng Context Window cho Coordinator.",
      "Agentic Loop 4 bước: Định nghĩa tools → Mô hình phát tool_use → Client chạy hàm → Client gửi lại tool_result.",
      "allowedTools = ['Task']: Coordinator bắt buộc phải có tool 'Task' trong mảng allowedTools mới spawn được Subagent.",
      "Parallel Execution: Chạy song song thật sự khi Coordinator phát ra nhiều thẻ Task tool_use trong CÙNG 1 API message.",
      "Hooks > System Prompt: Hooks (PreToolUse) chặn lệnh sai ở tầng client 100% chắc chắn, còn System Prompt chỉ mang tính xác suất."
    ],
    examTraps: [
      "⚠️ BẪY 1: Quên thêm 'Task' vào allowedTools làm Coordinator chỉ nói mồm mà không thể spawn được Subagent con.",
      "⚠️ BẪY 2: Nghĩ rằng Subagent tự động thấy toàn bộ lịch sử trò chuyện của Coordinator (Thực tế Subagent chỉ thấy thông tin được truyền qua tham số prompt của Task tool).",
      "⚠️ BẪY 3: Dùng System Prompt 'Cấm chạy lệnh rm -rf' để bảo mật thay vì dùng PreToolUse Hook (Prompt vẫn có xác suất bị bẫy Prompt Injection qua mặt)."
    ],
    selfChecklist: [
      "Tôi giải thích được tại sao Subagent giúp giải quyết bài toán sập Context Window.",
      "Tôi hiểu nguyên tắc Context Isolation giữa Coordinator và các Subagents.",
      "Tôi thuộc 4 bước của Agentic Loop và nhận diện được Anti-pattern vòng lặp vô hạn.",
      "Tôi viết được code khởi tạo Subagent bằng AgentDefinition SDK.",
      "Tôi phân biệt được khi nào dùng PreToolUse Hook vs System Prompt."
    ],
    sections: [
      {
        heading: "3.1 Mô hình Orchestrator - Worker & Hub-and-Spoke Architecture",
        content: `
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Coordinator giống như Trưởng Phòng Dự Án. Khi có một nhiệm vụ lớn, Trưởng phòng phân chia việc và gọi 3 chuyên viên (Subagents): Chuyên viên Frontend, Chuyên viên Backend, Chuyên viên Tester. Mỗi chuyên viên làm việc độc lập trong phòng riêng của mình (Context riêng), sau đó báo cáo kết quả về cho Trưởng phòng tổng hợp!
          </div>
          <p>Khi giải quyết các bài toán lớn, việc dùng một agent duy nhất sẽ làm cồng kềnh bộ nhớ context. Mô hình <strong>Orchestrator-Worker (Hub-and-Spoke)</strong> giải quyết bằng cách:</p>
          <ul>
            <li><strong>Coordinator (Agent chính):</strong> Lập kế hoạch, phân chia công việc, spawn (tạo) các agent con và tổng hợp kết quả cuối cùng.</li>
            <li><strong>Subagents (Agent con):</strong> Mỗi agent con có bộ nhớ context riêng biệt và tập tool riêng để thực hiện 1 nhiệm vụ nhỏ.</li>
          </ul>

          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 10px; padding: 1.25rem; margin: 1.25rem 0; text-align: center;">
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--accent-purple); margin-bottom: 0.75rem;">SƠ ĐỒ KIẾN TRÚC HUB-AND-SPOKE (COORDINATOR & SUBAGENTS)</div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap;">
              <div style="background: rgba(139, 92, 246, 0.15); border: 1px solid var(--accent-purple); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: var(--accent-purple);">
                👑 Coordinator Agent<br><span style="font-weight:400; font-size:0.75rem;">(Lập kế hoạch & Tổng hợp)</span>
              </div>
              <div style="font-size: 1.5rem; color: var(--text-muted);">➔</div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="background: rgba(14, 165, 233, 0.15); border: 1px solid var(--accent-blue); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-blue);">
                  🛠️ Subagent 1: Research (Context A)
                </div>
                <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-emerald); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-emerald);">
                  💻 Subagent 2: Coder (Context B)
                </div>
                <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid var(--accent-amber); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600; color: var(--accent-amber);">
                  🧪 Subagent 3: Tester (Context C)
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        heading: "3.2 Nguyên tắc Cô Lập Ngữ Cảnh (Context Isolation)",
        content: `
          <p><strong>Context Isolation (Cô lập ngữ cảnh)</strong> là nguyên tắc quan trọng nhất của hệ thống Multi-Agent:</p>
          <ul>
            <li><strong>Không kế thừa tự động:</strong> Subagent được khởi tạo với một không gian nhớ hoàn toàn sạch. Subagent <strong>KHÔNG</strong> tự động đọc hay thấy lịch sử trò chuyện cũ của Coordinator.</li>
            <li><strong>Truyền dữ liệu chủ động:</strong> Mọi ngữ cảnh cần thiết phải được Coordinator truyền trực tiếp vào thuộc tính <code>prompt</code> khi gọi tool <code>Task</code>.</li>
            <li><strong>Tiết kiệm Token tối đa:</strong> Khi Subagent hoàn thành công việc, nó chỉ trả lại kết quả tóm tắt cuối cùng cho Coordinator.</li>
          </ul>
        `
      },
      {
        heading: "3.3 Vòng Lặp Agentic Loop 4 Bước (The 4-Step Tool Loop)",
        content: `
          <div class="diagram-flow">
            <div class="flow-step">
              <div class="flow-number">1</div>
              <div class="flow-content">
                <div class="flow-title">1. Khai Báo (Tool Definition)</div>
                <div class="flow-desc">Client gửi danh sách các tools có sẵn kèm mảng messages tới Claude API.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">2</div>
              <div class="flow-content">
                <div class="flow-title">2. Kích Hoạch (Model Decision & stop_reason: "tool_use")</div>
                <div class="flow-desc">Claude phản hồi về Client với <code>stop_reason: "tool_use"</code> kèm ID lệnh và tên hàm cần gọi.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">3</div>
              <div class="flow-content">
                <div class="flow-title">3. Thực Thi Tại Client (Backend Tool Execution)</div>
                <div class="flow-desc">Ứng dụng Backend tự chạy hàm/API/lệnh shell tương ứng ở máy chủ của bạn.</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">4</div>
              <div class="flow-content">
                <div class="flow-title">4. Trả Kết Quả (Tool Result Feedback)</div>
                <div class="flow-desc">Client gửi lại kết quả dạng <code>tool_result</code> cho đến khi nhận được <code>stop_reason: "end_turn"</code>.</div>
              </div>
            </div>
          </div>
        `
      },
      {
        heading: "3.4 Khai Báo Subagent Bằng AgentDefinition SDK",
        content: `
          <p>Trong Claude Agent SDK, mỗi Subagent được khai báo thông qua cấu trúc <code>AgentDefinition</code> chuẩn:</p>
        `,
        codeExample: `# Cấu trúc khai báo Subagent trong Agent SDK
from claude_agent_sdk import AgentDefinition, Tool

code_reviewer_agent = AgentDefinition(
    name="CodeReviewer",
    description="Chuyên gia kiểm tra mã nguồn, tìm lỗi bảo mật và tối ưu hiệu năng",
    tools=[
        Tool(name="read_file", description="Đọc nội dung file"),
        Tool(name="run_linter", description="Chạy linter tĩnh")
    ],
    prompt="""Bạn là một Senior Code Reviewer. 
Nhiệm vụ của bạn là phân tích mã nguồn được giao và tìm các lỗi bảo mật."""
)`
      },
      {
        heading: "3.5 Bẫy Mẫu Task Tool: BAD (Truyền Thừa) vs GOOD (Prompt Tinh Gọn)",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 BAD PATTERN (Cách Sai - Tràn Context)</div>
              <pre><code>// ❌ SAI: Nhét toàn bộ tài liệu dự án vào prompt
"tools": [{
  "name": "Task",
  "input": {
    "subagent": "CodeReviewer",
    "prompt": "Hãy review file main.js. Đây là toàn bộ 50 file code..."
  }
}]</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Hậu quả: Lãng phí token, sập Context Window ngay lần gọi đầu!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GOOD PATTERN (Cách Chuẩn Anthropic)</div>
              <pre><code>// ✅ ĐÚNG: Chỉ truyền chỉ thị ngắn & file path
"tools": [{
  "name": "Task",
  "input": {
    "subagent": "CodeReviewer",
    "prompt": "Hãy dùng tool read_file để đọc 'src/main.js' và báo cáo 3 lỗi bảo mật."
  }
}]</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Ưu điểm: Subagent tự dùng tool tra cứu chính xác!</div>
            </div>
          </div>
        `
      },
      {
        heading: "3.6 Hệ Thống Hooks (PreToolUse & PostToolUse) & Decision Matrix",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Tiêu chí so sánh</th>
                  <th>🛡️ PreToolUse / PostToolUse Hooks</th>
                  <th>💬 System Prompt Instructions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Mức độ chắc chắn</strong></td>
                  <td><span class="status-badge yes">✅ 100% Deterministic (Tuyệt đối)</span></td>
                  <td><span class="status-badge warn">⚠️ Probabilistic (~95-98% Có xác suất lỗi)</span></td>
                </tr>
                <tr>
                  <td><strong>Chống Prompt Injection</strong></td>
                  <td><span class="status-badge yes">✅ An toàn 100% (Chặn ở Server)</span></td>
                  <td><span class="status-badge no">❌ Có thể bị bẫy lừa bởi hacker</span></td>
                </tr>
                <tr>
                  <td><strong>Vị trí thực thi</strong></td>
                  <td>Tầng Code Client / Server Backend</td>
                  <td>Bên trong bộ nhớ LLM Context</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "3.7 Thẻ Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 3</div>
            <div class="kc-question">
              Tình huống: Coordinator Agent của bạn cần gọi 3 Subagents cùng lúc nhưng chúng lại chạy nối tiếp (Sequential). Làm sao sửa?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Đảm bảo Coordinator phát ra <strong>nhiều lệnh gọi tool <code>Task</code> trong CÙNG MỘT message phản hồi API</strong> để kích hoạt Parallel Execution!
            </div>
          </div>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn dùng PreToolUse Hook để chặn lệnh nguy hiểm 100% chắc chắn, và đảm bảo phát ra nhiều thẻ Task tool trong cùng 1 message để chạy song song thực sự."
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
            💡 <strong>Ẩn dụ trực quan:</strong> Hãy tưởng tượng MCP như cổng cắm USB-C tiêu chuẩn trên máy tính. Trước đây mỗi thiết bị cần một loại cáp riêng. MCP định nghĩa một cổng chuẩn hóa giúp Claude (Client) cắm thẳng vào bất kỳ Cơ sở dữ liệu hay GitHub (MCP Server) mà không cần viết lại code tùy chỉnh!
          </div>
          <p><strong>Model Context Protocol (MCP)</strong> gồm 2 thành phần chính:</p>
          <ul>
            <li><strong>MCP Server:</strong> Chứa dữ liệu thực tế (PostgreSQL, GitHub API) và cung cấp endpoint an toàn.</li>
            <li><strong>MCP Client:</strong> Ứng dụng như Claude Desktop hay Claude Code CLI kết nối tới Server.</li>
          </ul>
        `
      },
      {
        heading: "4.2 3 Thành phần chính của MCP Protocol",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Thành phần MCP</th>
                  <th>Bản chất kỹ thuật</th>
                  <th>Ví dụ thực tế</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Tools (Công cụ)</strong></td>
                  <td>Hàm thực thi thao tác có tác động.</td>
                  <td><code>create_github_issue</code>, <code>query_database</code></td>
                </tr>
                <tr>
                  <td><strong>Resources (Tài nguyên)</strong></td>
                  <td>Dữ liệu tĩnh hoặc luồng log chỉ đọc.</td>
                  <td><code>file:///logs/app.log</code>, DB Table Scheme</td>
                </tr>
                <tr>
                  <td><strong>Prompts (Mẫu chỉ thị)</strong></td>
                  <td>Mẫu hướng dẫn prompt có tham số sẵn.</td>
                  <td>Template review code, template phân tích log</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "4.3 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 4</div>
            <div class="kc-question">
              Tình huống: Tại sao bạn nên viết description cho MCP Tools cực kỳ rõ ràng thay vì chung chung?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Nếu description quá chung chung, Claude sẽ không nhận diện được sức mạnh của MCP Server và sẽ tự động fallback về chạy các lệnh Terminal thô (bash/sed) gây rủi ro an toàn!
            </div>
          </div>
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
            💡 <strong>Ẩn dụ trực quan:</strong> File <code>CLAUDE.md</code> giống như "Tờ ghi chú dán trên màn hình" dành cho lập trình viên mới. Nó chỉ chứa các lệnh quan trọng nhất (Lệnh test là gì? Lệnh build là gì?). Nếu dán một cuốn sách 500 trang, lập trình viên sẽ bị ngợp và lãng phí thời gian đọc!
          </div>
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 BAD CLAUDE.MD</div>
              <p style="font-size: 0.85rem;">Nhét toàn bộ tài liệu kiến trúc dài 2.000 dòng vào file.</p>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Lãng phí token context mỗi phiên!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GOOD CLAUDE.MD</div>
              <p style="font-size: 0.85rem;">Chỉ ghi các lệnh cốt lõi: <code>npm test</code>, <code>npm run build</code>, style guide 2 dòng.</p>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Tinh gọn, mô hình nạp nhanh 100%.</div>
            </div>
          </div>
        `
      },
      {
        heading: "5.2 Cờ CLI --dangerously-skip-permissions",
        content: `
          <p>Cờ <code>--dangerously-skip-permissions</code> cho phép tự động duyệt toàn bộ lệnh Terminal mà không dừng lại hỏi ý kiến con người.</p>
          <p><strong>Quy tắc an toàn CCAF:</strong> Chỉ dùng trong **Isolated Sandbox / CI-CD Pipeline**. Không bao giờ dùng trên máy tính cá nhân!</p>
        `
      },
      {
        heading: "5.3 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 5</div>
            <div class="kc-question">
              Tình huống: Bạn muốn chạy Claude Code trong GitHub Actions để review PR tự động. Cờ CLI nào bắt buộc sử dụng?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Cử dụng cờ <code>--dangerously-skip-permissions</code> vì môi trường Runner của GitHub Actions là một Sandbox cô lập không có tương tác trực tiếp của con người.
            </div>
          </div>
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
        heading: "6.1 Few-Shot Prompting & Kỹ thuật Explicit Null",
        content: `
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Đưa 3 bức ảnh mẫu bánh thực tế (Few-shot) giúp thợ làm đúng 100% kiểu dáng. Và dặn thợ: <em>"Nếu không có dâu tây tươi, hãy để trống ô đó (null) chứ đừng lấy dâu nhựa thay thế!"</em> (Explicit Null).
          </div>
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 THIẾU EXPLICIT NULL (Dễ Bịa)</div>
              <p style="font-size: 0.85rem;">Prompt: "Hãy trích xuất số điện thoại khách hàng."</p>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Khi văn bản không có số, mô hình sẽ tự bịa ra số giả hợp lý!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 CÓ EXPLICIT NULL (An Toàn)</div>
              <p style="font-size: 0.85rem;">Prompt: "Trích xuất số điện thoại. Nếu không đề cập trong văn bản, bắt buộc trả về null."</p>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Mô hình trả về null chính xác 100%.</div>
            </div>
          </div>
        `
      },
      {
        heading: "6.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 6</div>
            <div class="kc-question">
              Tình huống: Đặt temperature = 0.0 có đảm bảo 100% định dạng chuỗi văn bản trích xuất được chuẩn hóa không?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Không! Temperature = 0.0 chỉ làm phản hồi mang tính xác định hơn, nhưng để chuẩn hóa định dạng chuỗi văn bản hoàn hảo, bắt buộc phải kết hợp đưa 2-3 ví dụ mẫu (Few-shot examples).
            </div>
          </div>
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
        heading: "7.1 Resilient Catch-All Enums & Schema Redundancy",
        content: `
          <div class="callout callout-title" style="background: rgba(244, 63, 94, 0.08); border-left: 4px solid var(--accent-rose); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Thêm ô "Khác (other)" vào tủ thư giúp thư không bị vứt bỏ khi gặp loại căn hộ lạ. Và dùng <strong>Schema Redundancy</strong> (so sánh <code>calculated_total</code> do mô hình tự cộng vs <code>stated_total</code> ghi trên hóa đơn) để tự động phát hiện hóa đơn mờ!
          </div>
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 FRAGILE ENUM (Dễ Vỡ)</div>
              <pre><code>"enum": ["house", "apartment", "condo"]</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Gặp 'studio' là báo lỗi Validation Error sập ngay!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 RESILIENT CATCH-ALL (Bền Vững)</div>
              <pre><code>"enum": ["house", "apartment", "condo", "other"],
"other_detail": {"type": "string"}</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Bắt trọn 100% dữ liệu lạ không báo lỗi!</div>
            </div>
          </div>
        `
      },
      {
        heading: "7.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 7</div>
            <div class="kc-question">
              Tình huống: Khi trích xuất hóa đơn bị mờ, làm sao phát hiện lỗi lệch tổng tiền tự động?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Dùng <strong>Schema Redundancy</strong>: yêu cầu trích xuất cả <code>stated_total</code> và <code>calculated_total</code>. Nếu <code>stated_total != calculated_total</code>, tự động đẩy sang hàng chờ Human Review Queue!
            </div>
          </div>
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
        heading: "8.1 Ma trận Phân Tuyến Chi Phí & SLA",
        content: `
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Tiêu chí so sánh</th>
                  <th>⚡ Messages API (Real-time)</th>
                  <th>📦 Message Batches API (Asynchronous)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Chi phí sử dụng</strong></td>
                  <td><span class="status-badge warn">⚠️ Giá gốc 100%</span></td>
                  <td><span class="status-badge yes">✅ Giảm 50% Chi Phí</span></td>
                </tr>
                <tr>
                  <td><strong>Thời gian phản hồi (SLA)</strong></td>
                  <td>Tức thì (vài giây)</td>
                  <td>Bất đồng bộ trong vòng 24 giờ</td>
                </tr>
                <tr>
                  <td><strong>Tác vụ phù hợp</strong></td>
                  <td>Chatbot tương tác, gọi tool thời gian thực</td>
                  <td>Đánh giá bài thi đêm, OCR 10.000 hóa đơn</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "8.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 8</div>
            <div class="kc-question">
              Tình huống: Công ty bạn cần phân tích cảm xúc của 50.000 bình luận mỗi đêm (không cần gấp trong ngày). Phương án nào tối ưu ngân sách nhất?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Tạo Batch Job bất đồng bộ gửi qua **Message Batches API** để hưởng ưu đãi cắt giảm 50% ngân sách API với cam kết SLA 24h.
            </div>
          </div>
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
        heading: "9.1 Ngưỡng Tự Động Hóa & Human Review Queue",
        content: `
          <div class="callout callout-title" style="background: rgba(245, 158, 11, 0.08); border-left: 4px solid var(--accent-amber); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Hệ thống ngân hàng tự động duyệt chuyển khoản $10. Nhưng khi giao dịch lên tới $10.000, hệ thống tự động ngắt và yêu cầu nhân viên gọi điện xác minh (Human-in-the-loop).
          </div>
          <div class="decision-matrix-wrap">
            <table class="decision-matrix">
              <thead>
                <tr>
                  <th>Ngưỡng giao dịch / Điểm tin cậy</th>
                  <th>Hành động hệ thống</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Confidence Score > 90% & Giao dịch < $500</td>
                  <td><span class="status-badge yes">✅ Tự động hóa 100%</span></td>
                </tr>
                <tr>
                  <td>Confidence Score < 90% hoặc Giao dịch > $500</td>
                  <td><span class="status-badge warn">⚠️ Chuyển sang Human Review Queue</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        heading: "9.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 9</div>
            <div class="kc-question">
              Tình huống: Làm thế nào để đảm bảo 100% không bao giờ xảy ra lệnh chuyển tiền vượt quá $500?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Sử dụng **Application Intercept Hooks** kiểm tra quy định ở tầng code backend Server, thay vì chỉ tin vào câu cấm trong System Prompt.
            </div>
          </div>
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
        heading: "10.1 Graceful Tool Failure & Crash Recovery Manifest",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 UNHANDLED EXCEPTION (Sập App)</div>
              <pre><code>try { run_tool() } catch (err) { throw err; } // ❌ sập agent</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Sập toàn bộ quy trình multi-agent!</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 GRACEFUL ERROR HANDLER (Chuẩn)</div>
              <pre><code>return {"isError": true, "content": "API sập mạng 500"};</code></pre>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Claude đọc lỗi và chọn phương án dự phòng mượt mà.</div>
            </div>
          </div>
        `
      },
      {
        heading: "10.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 10</div>
            <div class="kc-question">
              Tình huống: Khi một Subagent bị crash giữa chừng do mất mạng, làm sao Coordinator khôi phục lại trạng thái công việc?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Định kỳ xuất tệp **Manifest có cấu trúc** ghi nhận tiến độ công việc, sau đó tiêm lại đoạn state dở dang vào Subagent mới được spawn lại.
            </div>
          </div>
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
        heading: "11.1 Context Pruning (Cắt Tỉa Ngữ Cảnh)",
        content: `
          <div class="comparison-grid">
            <div class="card-bad">
              <div class="card-header-bad">🔴 NẠP TOÀN BỘ JSON (Lãng phí)</div>
              <p style="font-size: 0.85rem;">Nạp nguyên 40+ trường dữ liệu dư thừa từ API vào context.</p>
              <div style="font-size: 0.82rem; color: var(--accent-rose); font-weight: 600;">❌ Tràn Context Window, tăng 80% chi phí token.</div>
            </div>
            <div class="card-good">
              <div class="card-header-good">🟢 CONTEXT PRUNING (Tinh Gọn)</div>
              <p style="font-size: 0.85rem;">Lọc ở Client chỉ giữ lại 4 trường thực sự cần thiết.</p>
              <div style="font-size: 0.82rem; color: var(--accent-emerald); font-weight: 600;">✅ Ngữ cảnh tinh gọn, mô hình xử lý nhanh sắc bén.</div>
            </div>
          </div>
        `
      },
      {
        heading: "11.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 11</div>
            <div class="kc-question">
              Tình huống: Khi tóm tắt đoạn hội thoại dài lũy tiến (Progressive Summarization), loại dữ liệu nào dễ bị biến dạng nhất?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Các **con số chính xác, ngày tháng năm và tỷ lệ %** thường bị biến dạng thành các từ ước lệ ("khoảng", "xấp xỉ").
            </div>
          </div>
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
          <div class="callout callout-title" style="background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--accent-purple); padding: 1rem; margin-bottom: 1rem;">
            💡 <strong>Ẩn dụ trực quan:</strong> Khi viết luận văn pháp lý, mỗi khẳng định đưa ra bắt buộc phải ghi kèm mã trích dẫn nguồn sách (Claim ➔ Source). Nếu chỉ viết văn bản thô, khi tổng hợp nhiều trang sẽ bị mất dấu trích dẫn gốc!
          </div>
          <p>Yêu cầu Subagent xuất dữ liệu dưới dạng JSON ánh xạ rõ ràng giữa thuộc tính <code>claim</code> và <code>source_url</code>.</p>
        `
      },
      {
        heading: "12.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 12</div>
            <div class="kc-question">
              Tình huống: Làm sao để báo cáo cuối cùng của hệ thống Multi-Agent không bao giờ bị rụng mất nguồn trích dẫn?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Sử dụng **Structured Claim-Source Mapping** truyền dữ liệu có cấu trúc end-to-end giữa các Subagents thay vì văn bản tự do.
            </div>
          </div>
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
        heading: "13.1 Quy tắc Glob/Grep First Workflow",
        content: `
          <div class="diagram-flow">
            <div class="flow-step">
              <div class="flow-number">1</div>
              <div class="flow-content">
                <div class="flow-title">1. Dùng Glob Tìm Cấu Trúc</div>
                <div class="flow-desc">Tìm danh sách file khớp pattern (vd: <code>Glob("src/**/*.js")</code>).</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">2</div>
              <div class="flow-content">
                <div class="flow-title">2. Dùng Grep Định Vị Ký Tự</div>
                <div class="flow-desc">Tìm chính xác dòng chứa hàm (vd: <code>Grep("calculateTotal")</code>).</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="flow-number">3</div>
              <div class="flow-content">
                <div class="flow-title">3. Dùng View Đọc Đúng File Cần Sửa</div>
                <div class="flow-desc">Chỉ tải đúng file đích vào Context Window giúp tiết kiệm 95% token!</div>
              </div>
            </div>
          </div>
        `
      },
      {
        heading: "13.2 Thử Tài Kiến Thức Nhanh (Knowledge Check)",
        content: `
          <div class="knowledge-check">
            <div class="kc-title">🧠 THỬ TÀI KIỂM TRA KIẾN THỨC BÀI 13</div>
            <div class="kc-question">
              Tình huống: Khi khám phá codebase lớn 200 files, thói quen nào của Agent sẽ làm sập bộ nhớ Context nhanh nhất?
            </div>
            <button class="kc-toggle-btn">💡 Bấm để xem giải thích & đáp án chuẩn</button>
            <div class="kc-answer">
              <strong>Đáp án chuẩn Anthropic:</strong><br>
              Thói quen đọc lần lượt từng file một (Sequential View). Hãy dùng **Glob và Grep trước** để định vị chính xác vị trí cần đọc!
            </div>
          </div>
        `
      }
    ],
    examTip: "⚡ Mẹo thi CCAF: Luôn ưu tiên dùng Glob/Grep để định vị code quan trọng trước khi đọc nội dung file."
  }
];
