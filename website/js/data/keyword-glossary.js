/* CCAF Learning Hub - Interactive Technical Keyword Glossary Dictionary */

const KEYWORD_GLOSSARY_DATA = {
  "allowedTools": {
    name: "allowedTools",
    category: "SDK / Agent Configuration",
    descEN: "An explicit array property defining which specific tools an agent or coordinator is authorized to execute.",
    descVI: "Danh sách các công cụ (Tools) mà Agent được phép dùng. Nếu một công cụ (như lệnh xóa file hay công cụ 'Task') không nằm trong danh sách này, Agent sẽ bị cấm sử dụng công cụ đó.",
    example: "allowedTools: ['FileReadTool', 'FileEditTool', 'Task']",
    examGotcha: "🚨 BẪY THI CCAF: Nếu bạn khai báo Subagents cho Lead Coordinator nhưng QUÊN thêm 'Task' vào mảng allowedTools của Coordinator, Coordinator sẽ bị kẹt (chỉ có thể nói về việc delegate chứ không bao giờ khởi tạo được Subagent).",
    tip: "Luôn kiểm tra mảng 'allowedTools' chứa 'Task' khi thiết kế hệ thống Đa Agent."
  },
  "Task": {
    name: "Task",
    category: "Built-in SDK Tool",
    descEN: "The built-in SDK tool used by a Lead Coordinator to spawn and delegate tasks to subagents.",
    descVI: "Công cụ khởi chạy Subagent con. Lead Coordinator sử dụng công cụ 'Task' để tạo mới một phiên làm việc riêng biệt cho Subagent và giao việc cho nó.",
    example: "Task({ subagent: 'Researcher', prompt: 'Tìm tài liệu API' })",
    examGotcha: "Để chạy các Subagent song song thực sự, Coordinator phải phát ra nhiều thẻ gọi tool Task trong CÙNG MỘT message turn của assistant.",
    tip: "Phát nhiều thẻ tool_use 'Task' trong 1 turn = Thực thi song song thực sự."
  },
  "PreToolUse": {
    name: "PreToolUse Hook",
    category: "Server Event & Security",
    descEN: "A backend server-side interceptor triggered strictly before a tool call executes.",
    descVI: "Lớp phanh bảo vệ chạy ở Backend Server, tự động kích hoạt NGAY TRƯỚC KHI Agent chạy một công cụ. Dùng để dừng lại xin phép con người (vd: 'Bạn có chắc muốn chuyển $500?') hoặc chặn đứng các lệnh nguy hiểm với độ chính xác 100%.",
    example: "PreToolUseHook(toolName, args) => if (toolName === 'delete_db') return block();",
    examGotcha: "PreToolUse Hook mang tính 100% Deterministic (chắc chắn 100%), là giải pháp duy nhất để đảm bảo Human-in-the-Loop hoặc chặn lệnh nguy hiểm. System Prompt chỉ mang tính xác suất (~95%).",
    tip: "Yêu cầu an toàn 100% ➔ Chọn PreToolUse Hook ở Backend Server."
  },
  "PostToolUse": {
    name: "PostToolUse Hook",
    category: "Server Event & Context Management",
    descEN: "A backend server-side interceptor triggered right after a tool returns its output payload.",
    descVI: "Lớp xử lý chạy ở Backend Server NGAY SAU KHI một công cụ chạy xong và trả về kết quả. Dùng để lọc bớt dữ liệu thô quá dài trước khi đưa vào bộ nhớ hội thoại.",
    example: "PostToolUseHook(result) => stripVerboseLogs(result)",
    examGotcha: "Dùng PostToolUse Hook để thực hiện Context Pruning (cắt tỉa bớt payload kết quả thô rườm rà trước khi đưa vào mảng messages chính), giúp tiết kiệm 40-60% token.",
    tip: "Rửa sạch log rác sau khi gọi tool ➔ Dùng PostToolUse Hook."
  },
  "GlobTool": {
    name: "GlobTool / Glob",
    category: "Claude Code Built-in Tool",
    descEN: "A pattern-matching file search tool used to map project directory structures without loading file content.",
    descVI: "Công cụ tìm kiếm vị trí tệp theo đường dẫn hoặc định dạng đuôi tệp (vd: tìm tất cả tệp *.js hoặc src/components/*.tsx) mà KHÔNG CẦN MỞ ĐỌC NỘI DUNG TỆP. Giúp quét nhanh cấu trúc dự án mà không tốn token.",
    example: "GlobTool({ pattern: '**/*.test.ts' }) ➔ Trả về danh sách file test",
    examGotcha: "Nguyên tắc Vàng Anthropic: Luôn dùng Glob và Grep TRƯỚC KHI mở xem nội dung tệp (View) để bảo vệ bộ nhớ Context Window.",
    tip: "Tìm cấu trúc dự án lớn ➔ Dùng Glob trước tiên."
  },
  "Glob": {
    name: "Glob",
    category: "Claude Code Built-in Tool",
    descEN: "A pattern-matching file search tool used to map project directory structures without loading file content.",
    descVI: "Công cụ tìm kiếm vị trí tệp theo tên hoặc đuôi tệp (vd: tìm tất cả tệp *.js) mà KHÔNG CẦN MỞ ĐỌC NỘI DUNG TỆP. Giúp quét nhanh cây thư mục dự án mà không làm tốn bộ nhớ context.",
    example: "Glob('src/**/*.ts')",
    examGotcha: "Luôn dùng Glob để quét cấu trúc cây thư mục trước khi đọc tệp.",
    tip: "Định vị vị trí tệp ➔ Dùng Glob."
  },
  "GrepTool": {
    name: "GrepTool / Grep",
    category: "Claude Code Built-in Tool",
    descEN: "A fast text search tool used to locate exact keyword matches or regex across codebase files.",
    descVI: "Công cụ quét tìm TỪ KHÓA hoặc ĐOẠN MÃ xuất hiện ở đâu trong toàn bộ dự án (vd: tìm xem hàm calculateTax() hay biến userToken xuất hiện ở những tệp nào và dòng bao nhiêu).",
    example: "GrepTool({ query: 'calculateTax' }) ➔ File src/tax.js: Line 42",
    examGotcha: "Khi cần định vị nơi gọi một hàm cụ thể trong 300 tệp, dùng GrepTool định vị dòng code trước khi dùng FileReadTool mở tệp đó.",
    tip: "Tìm vị trí hàm/biến trong dự án ➔ Dùng GrepTool."
  },
  "Grep": {
    name: "Grep",
    category: "Claude Code Built-in Tool",
    descEN: "A fast text search tool used to locate exact keyword matches or regex across codebase files.",
    descVI: "Công cụ quét tìm từ khóa hoặc đoạn mã chính xác trong các tệp dự án.",
    example: "Grep('import React')",
    examGotcha: "Dùng Grep để tìm chính xác tên hàm trước khi mở tệp xem.",
    tip: "Tìm từ khóa trong code ➔ Dùng Grep."
  },
  "FileReadTool": {
    name: "FileReadTool / View",
    category: "Claude Code Built-in Tool",
    descEN: "A tool used to inspect the text content of a specific file or line range.",
    descVI: "Công cụ mở đọc nội dung văn bản của một tệp cụ thể (hoặc một khoảng dòng chỉ định từ dòng X đến dòng Y).",
    example: "FileReadTool({ path: 'src/app.js', startLine: 1, endLine: 50 })",
    examGotcha: "Tránh gọi View/FileReadTool đọc tràn lan các tệp không liên quan vì sẽ gây quá tải bộ nhớ Context Window.",
    tip: "Chỉ mở đọc tệp sau khi đã thu hẹp phạm vi bằng Glob & Grep."
  },
  "View": {
    name: "View Tool",
    category: "Claude Code Built-in Tool",
    descEN: "A tool used to inspect the text content of a specific file or line range.",
    descVI: "Công cụ mở đọc nội dung tệp mã nguồn.",
    example: "View('src/main.js')",
    examGotcha: "Không dùng View để tìm kiếm tệp ngẫu nhiên trong dự án lớn.",
    tip: "Dùng View sau Glob và Grep."
  },
  "FileEditTool": {
    name: "FileEditTool",
    category: "Claude Code Built-in Tool",
    descEN: "A targeted file editing tool that modifies specific line ranges via exact pattern replacement.",
    descVI: "Công cụ sửa tệp cục bộ (thay thế một đoạn mã cũ bằng đoạn mã mới). Dùng khi bạn chỉ muốn thay đổi một vài dòng code trong tệp có sẵn.",
    example: "FileEditTool({ path: 'app.js', oldString: 'var x = 1', newString: 'const x = 1' })",
    examGotcha: "Khi chỉ cần sửa 5 dòng code trong tệp 3.000 dòng, dùng FileEditTool tiết kiệm token và an toàn hơn nhiều so với ghi đè toàn bộ tệp bằng FileWriteTool.",
    tip: "Sửa tệp có sẵn ➔ Ưu tiên FileEditTool."
  },
  "FileWriteTool": {
    name: "FileWriteTool",
    category: "Claude Code Built-in Tool",
    descEN: "A tool used to create new files or completely overwrite existing files with fresh content.",
    descVI: "Công cụ tạo tệp mới hoặc ghi đè toàn bộ nội dung tệp cũ từ đầu đến cuối.",
    example: "FileWriteTool({ path: 'new_file.js', content: '// code mới' })",
    examGotcha: "Ghi đè tệp lớn bằng FileWriteTool gây lãng phí token lớn và nguy cơ hỏng cấu trúc tệp cũ nếu không cần thiết.",
    tip: "Chỉ dùng FileWriteTool khi tạo tệp mới hoàn toàn."
  },
  "BashTool": {
    name: "BashTool",
    category: "Claude Code Built-in Tool",
    descEN: "A terminal shell execution tool for running system commands (git, npm, tests, builds).",
    descVI: "Công cụ chạy lệnh Terminal/Shell trên máy tính (như lệnh git commit, npm test, python build).",
    example: "BashTool({ command: 'npm test' })",
    examGotcha: "Ưu tiên dùng các công cụ tích hợp sẵn (Glob/Grep/FileEdit) hơn là dùng lệnh Bash thô (find/grep/sed) vì các công cụ tích hợp được tối ưu hóa cho LLM.",
    tip: "Chỉ dùng BashTool cho lệnh build/test hoặc lệnh terminal không có tool thay thế."
  },
  "--dangerously-skip-permissions": {
    name: "--dangerously-skip-permissions",
    category: "CLI Flag & Security",
    descEN: "A CLI flag enabling Claude Code to run all tools autonomously without user confirmation prompts.",
    descVI: "Cờ lệnh tắt toàn bộ câu hỏi xin phép của Claude Code. Bình thường khi Claude Code muốn sửa file hay chạy lệnh terminal, nó sẽ dừng lại hỏi bạn [y/n]. Khi bật cờ này, nó sẽ tự động chạy luôn không hỏi nữa.",
    example: "claude -p 'Review PR' --dangerously-skip-permissions",
    examGotcha: "🚨 BẪY THI CCAF: Cờ này CHỈ ĐƯỢC PHÉP DÙNG trong môi trường Sandbox CI/CD cô lập (như GitHub Actions runner tự động), NGHIÊM CẤM dùng trên máy cá nhân dev vì nguy cơ bảo mật.",
    tip: "CI/CD Sandbox ➔ Được dùng cờ này. Máy cá nhân ➔ Không được dùng."
  },
  "stop_reason": {
    name: "stop_reason",
    category: "Messages API Response State",
    descEN: "A response flag indicating why the model stopped generating output tokens.",
    descVI: "Cờ báo lý do tại sao mô hình dừng phát ra văn bản. Cho biết câu trả lời đã xong hoàn chỉnh hay bị cắt đứt giữa chừng do thiếu dung lượng token.",
    example: "response.stop_reason === 'end_turn' | 'max_tokens'",
    examGotcha: "Nếu stop_reason là 'max_tokens', nghĩa là phản hồi bị cắt đứt giữa chừng do chạm trần token output. Client Backend cần phát request nối tiếp để lấy nốt dữ liệu.",
    tip: "'end_turn' = xong bình thường. 'max_tokens' = bị ngắt do tràn trần."
  },
  "max_tokens": {
    name: "max_tokens",
    category: "Messages API Parameter",
    descEN: "The ceiling limit of output tokens allowed per response turn.",
    descVI: "Số lượng token đầu ra tối đa mô hình được phép phát ra trong một lượt trả lời.",
    example: "max_tokens: 4096",
    examGotcha: "max_tokens là tham số BẮT BỘC trong mọi Claude Messages API request (vd: max_tokens: 4096 cho Sonnet/Opus, 8192 cho Haiku 3.5).",
    tip: "Luôn khai báo max_tokens trong payload request."
  },
  "end_turn": {
    name: "end_turn",
    category: "Messages API Stop Reason",
    descEN: "The natural stop code indicating the model completed its response payload gracefully.",
    descVI: "Trạng thái hoàn thành tự nhiên khi mô hình phát xong toàn bộ phản hồi mượt mà.",
    example: "stop_reason === 'end_turn'",
    examGotcha: "Khi stop_reason == 'end_turn' và không có tool_use, vòng lặp Agent Loop được coi là hoàn tất thành công.",
    tip: "Trạng thái lý tưởng của phản hồi API."
  },
  "tool_choice": {
    name: "tool_choice",
    category: "Messages API Parameter",
    descEN: "A parameter forcing or guiding how the model selects tools ('auto', 'any', or specific tool object).",
    descVI: "Công tắc điều khiển cách mô hình gọi công cụ. Có thể để tự động ('auto'), ép gọi ít nhất 1 tool bất kỳ ('any'), hoặc ép mô hình bắt buộc gọi ĐÚNG 1 TOOL CHỈ ĐỊNH.",
    example: "tool_choice: { type: 'tool', name: 'extract_data' }",
    examGotcha: "Để ép buộc Claude trích xuất JSON có cấu trúc bằng tool mà không trả lời bằng văn bản xuôi, đặt tool_choice: {'type': 'tool', 'name': 'extract_schema'}.",
    tip: "Ép trả về JSON chuẩn ➔ Dùng tool_choice dạng object chỉ định tên tool."
  },
  "CLAUDE.md": {
    name: "CLAUDE.md",
    category: "Claude Code Configuration",
    descEN: "A project configuration markdown file containing build/test commands, style guides, and codebase rules.",
    descVI: "Tệp quy tắc hướng dẫn dự án. Chứa các lệnh build, test, quy định viết code và chỉ thị cho Claude Code khi hoạt động trong thư mục đó.",
    example: "Nội dung CLAUDE.md: 'Lệnh test: npm test. Lệnh build: npm run build'",
    examGotcha: "Thứ tự ưu tiên nạp CLAUDE.md: Subdirectory hiện tại (./src/CLAUDE.md) ➔ Project Root (./CLAUDE.md) ➔ Global User (~/.claude/CLAUDE.md). Giữ file ngắn gọn (<100 dòng) để tránh lãng phí context.",
    tip: "Nguyên tắc Vàng: Lean CLAUDE.md (<100 dòng tập trung vào lệnh build/test)."
  },
  "~/.claude/CLAUDE.md": {
    name: "~/.claude/CLAUDE.md",
    category: "Global Configuration",
    descEN: "The global user-level config file applied across all repositories on a developer's machine.",
    descVI: "Tệp quy tắc dùng chung toàn cục trên máy tính cá nhân. Áp dụng cho mọi dự án mở bằng Claude Code trên máy đó.",
    example: "Đường dẫn: C:\Users\Admin\.claude\CLAUDE.md",
    examGotcha: "File toàn cục có độ ưu tiên THẤP NHẤT, bị ghi đè bởi file CLAUDE.md ở gốc dự án hoặc thư mục con.",
    tip: "Cấu hình cá nhân dùng chung ➔ Đặt ở ~/.claude/CLAUDE.md."
  },
  "Message Batches API": {
    name: "Message Batches API",
    category: "API Feature & Cost Savings",
    descEN: "An asynchronous batching endpoint (/v1/messages/batches) offering 50% discount for bulk non-realtime tasks.",
    descVI: "Tính năng gửi yêu cầu xử lý hàng loạt bất đồng bộ (/v1/messages/batches). Giúp GIẢM 50% CHI PHÍ API với cam kết trả kết quả trong 24 giờ.",
    example: "POST /v1/messages/batches ➔ Xử lý 50.000 hồ sơ ban đêm",
    examGotcha: "Dành riêng cho các tác vụ xử lý hàng chục nghìn hồ sơ ban đêm không cần phản hồi lập tức vài giây.",
    tip: "Xử lý hàng loạt không gấp ban đêm ➔ Chọn Message Batches API để tiết kiệm 50%."
  },
  "JSON Schema": {
    name: "JSON Schema",
    category: "Structured Output Standard",
    descEN: "A formal schema specification defining property types, required fields, and enum restrictions.",
    descVI: "Khuôn mẫu định dạng dữ liệu JSON. Khai báo rõ kiểu dữ liệu của các trường (string, number, boolean), thuộc tính bắt buộc (required) và danh sách giá trị cố định (enum).",
    example: "{ type: 'object', properties: { age: { type: 'number' } }, required: ['age'] }",
    examGotcha: "Bắt buộc khai báo mảng 'required' trong JSON Schema. Nếu thiếu, mô hình có thể tự ý bỏ qua các tham số quan trọng khi gọi tool.",
    tip: "Đảm bảo đầy đủ thuộc tính 'required' trong mọi input_schema."
  },
  "Coordinator-Worker": {
    name: "Coordinator-Worker Architecture",
    category: "Multi-Agent Architecture Pattern",
    descEN: "A centralized multi-agent design where a Lead Coordinator delegates dynamic subtasks to parallel workers.",
    descVI: "Mô hình quản lý Đa Agent trung tâm: 1 Agent Trưởng (Coordinator) đứng ra phân tích yêu cầu lớn, chia nhỏ việc và phân công cho các Agent Con (Workers) xử lý song song.",
    example: "Coordinator ➔ phân công Worker 1 đọc file A, Worker 2 đọc file B",
    examGotcha: "Giữ cấu trúc phẳng (Flat Hierarchy <= 2 tầng). Tránh cho phép Worker tự spawn thêm Worker cháu vì làm suy giảm nghiêm trọng khả năng quan sát và debug.",
    tip: "Coordinator làm trung tâm điều phối ➔ Đảm bảo observability tốt nhất."
  },
  "Context Isolation": {
    name: "Context Isolation",
    category: "Reliability & Context Management",
    descEN: "Maintaining separate message arrays for subagents to prevent verbose intermediate logs from polluting main context.",
    descVI: "Cô lập bộ nhớ giữa các Agent: Mỗi Agent con tự duy trì một lịch sử hội thoại (messages) riêng. Kết quả đọc file rác của Agent con không bị đổ vào bộ nhớ của Agent Trưởng.",
    example: "Worker đọc 50 file log rác ➔ Chỉ gửi 1 dòng kết quả tóm tắt về cho Coordinator",
    examGotcha: "Nếu không cô lập context, log đọc 50 file của Worker sẽ làm ngợp Context Window 200K của Coordinator chỉ sau 2 lượt hội thoại.",
    tip: "Cô lập mảng messages giữa Coordinator và Workers."
  },
  "Context Window": {
    name: "Context Window",
    category: "LLM Memory Capacity",
    descEN: "The maximum limit of input tokens (200,000 tokens for Claude 3.5/3.7) processed in a single prompt.",
    descVI: "Dung lượng bộ nhớ làm việc tối đa của mô hình trong 1 lượt (200.000 tokens cho Claude 3.5/3.7). Chứa tất cả System Prompt, lịch sử hội thoại và kết quả tool.",
    example: "Context Window 200.000 tokens ~ 150.000 từ Tiếng Anh",
    examGotcha: "Tiếng Anh đạt ~3.5-4 ký tự/token, còn mã nguồn và Tiếng Việt tốn ~1-2.5 ký tự/token. Cần quản lý context cẩn thận.",
    tip: "Luôn tối ưu hóa context không để chạm trần 200K token."
  },
  "Context Pruning": {
    name: "Context Pruning",
    category: "Context Management Technique",
    descEN: "Stripping stale or heavy tool_result payloads from message history at the client backend to save tokens.",
    descVI: "Kỹ thuật lau dọn bộ nhớ: Server Backend chủ động xóa bỏ các đoạn dữ liệu thô cũ nặng nề (như nội dung file đã đọc từ 10 lượt trước) trong mảng messages để tiết kiệm token.",
    example: "Xóa khối tool_result 50.000 token cũ ➔ Thay bằng thẻ [Nội dung file đã đọc]",
    examGotcha: "Context Pruning giúp tiết kiệm 40-60% token mà vẫn giữ nguyên được System Prompt và các quyết định quan trọng của mô hình.",
    tip: "Tước bỏ payload tool_result cũ ➔ Tiết kiệm token hiệu quả."
  },
  "Lost-in-the-Middle": {
    name: "Lost-in-the-Middle Effect",
    category: "Transformer Attention Failure",
    descEN: "A phenomenon where LLM attention decays by ~60% in the middle region of long context documents (>100K tokens).",
    descVI: "Hiệu ứng lãng quên ở giữa: Khi tài liệu quá dài (>100K tokens), mô hình AI thường chú ý rất tốt ở ĐẦU và ĐUÔI văn bản, nhưng bị suy giảm đến 60% sự chú ý ở ĐOẠN GIỮA.",
    example: "Đặt quy tắc quan trọng ở dòng 50.000 trong file 100.000 dòng ➔ AI dễ bị bỏ sót",
    examGotcha: "Khắc phục: Luôn đặt các chỉ thị và quy tắc quan trọng ở ĐẦU (System Prompt) hoặc ĐUÔI (User Turn), tránh giấu ở giữa tài liệu.",
    tip: "Chỉ thị quan trọng ➔ Đặt ở ĐẦU hoặc ĐUÔI context."
  },
  "Scratchpad": {
    name: "Scratchpad (notes.md)",
    category: "Agent State Persistence",
    descEN: "A file-based working memory pattern where agents write intermediate findings to disk to survive session resets.",
    descVI: "Sổ ghi nháp ra đĩa: Agent tự ghi các ghi chú và phát hiện trung gian ra một file đĩa (như notes.md). Khi bộ nhớ bị nén (/compact) hay ngắt phiên, Agent vẫn mở file ra đọc lại được.",
    example: "Agent lưu tiến độ refactor vào file notes.md ➔ Khi restart phiên vẫn đọc lại được",
    examGotcha: "Scratchpad đặc biệt hiệu quả cho các phiên refactor kéo dài nhiều ngày hoặc khi nén bộ nhớ (/compact).",
    tip: "Ghi vết phát hiện ra đĩa (notes.md) ➔ Giữ state qua các phiên làm việc."
  },
  "Preserving Provenance": {
    name: "Preserving Provenance",
    category: "Data Integrity & Attribution",
    descEN: "Retaining exact source URLs, publication dates, and conflict warnings when synthesizing multi-source data.",
    descVI: "Bảo tồn nguồn gốc trích dẫn: Khi tổng hợp dữ liệu từ nhiều nguồn, Agent phải giữ nguyên link gốc, ngày xuất bản và cờ cảnh báo nếu thấy dữ liệu mâu thuẫn.",
    example: "Nguồn A nói tăng trưởng 8%, Nguồn B nói 12% ➔ Trích dẫn cả 2 nguồn + cờ conflict_detected: true",
    examGotcha: "Khi 2 nguồn thông tin cho 2 con số mâu thuẫn (8% và 12%), Agent PHẢI giữ lại cả 2 kèm trích dẫn nguồn và cờ conflict_detected: true (cấm tự ý xóa bỏ hay lấy trung bình).",
    tip: "Giữ lại cả 2 con số mâu thuẫn + cờ conflict_detected: true."
  },
  "State Manifest": {
    name: "State Manifest (manifest.json)",
    category: "Crash Recovery Pattern",
    descEN: "A structured state summary file exported by agents allowing clean system restoration after a crash.",
    descVI: "File nhật ký khôi phục hệ thống: Mỗi Agent liên tục xuất file tóm tắt tiến độ (manifest.json). Khi server bị sập nguồn ngột ngột, hệ thống chỉ cần đọc file này để chạy tiếp.",
    example: "Server crash ➔ Đọc manifest.json để biết Worker 1 đã xong việc, Worker 2 chưa xong",
    examGotcha: "Khi resume sau crash, Coordinator chỉ đọc manifest và tiêm phần state liên quan vào prompt từng worker (không tải lại toàn bộ log thô 100K token).",
    tip: "Khôi phục sau sập nguồn ➔ Dùng State Manifest."
  },
  "Human-in-the-Loop": {
    name: "Human-in-the-Loop (HITL)",
    category: "Safety & Escalation Pattern",
    descEN: "A security architecture requiring explicit human approval before executing sensitive financial or deletion actions.",
    descVI: "Cơ chế con người duyệt: Thiết kế bắt buộc Agent phải tạm dừng và chờ con người bấm xác nhận trước khi thực hiện các hành động nguy hiểm (giao dịch tiền mặt lớn, xóa dữ liệu).",
    example: "Chuyển tiền > $500 ➔ Tạm dừng chờ con người nhập mã OTP/Xác nhận",
    examGotcha: "Thực thi bằng PreToolUse Hook hoặc ngắt vòng lặp Agentic để chờ token xác nhận từ con người khi chạm ngưỡng rủi ro (vd: giao dịch > $500).",
    tip: "Giao dịch lớn / Lệnh nguy hiểm ➔ Cần Human-in-the-Loop."
  },
  "Exponential Backoff": {
    name: "Exponential Backoff",
    category: "API Error Handling",
    descEN: "A retry strategy where waiting time doubles between retries to handle transient rate limits (429/500).",
    descVI: "Chiến lược thử lại thông minh: Khi bị lỗi nghẽn mạng (429 Too Many Requests hoặc 500 Server Error), hệ thống chờ 1s ➔ 2s ➔ 4s ➔ 8s mới thử lại để tránh làm sập server.",
    example: "Retry 1: chờ 1s ➔ Retry 2: chờ 2s ➔ Retry 3: chờ 4s",
    examGotcha: "Chỉ áp dụng Exponential Backoff cho Transient Errors (lỗi tạm thời). Nếu gặp Permission Error (403/401) hoặc Business Error, PHẢI ngắt thử lại ngay lập tức.",
    tip: "Lỗi 429/500 ➔ Retry với Exponential Backoff. Lỗi 403 ➔ Dừng ngay."
  },
  "Permission Error": {
    name: "Permission Error",
    category: "Error Classification",
    descEN: "A permanent failure caused by insufficient access rights or missing authorization credentials.",
    descVI: "Lỗi bị cấm truy cập (HTTP 403 / Permission Denied). Xảy ra khi Agent không có quyền đọc/ghi file hoặc thiếu API key xác thực.",
    example: "Error 403: Forbidden - Access Denied to /etc/shadow",
    examGotcha: "Lỗi Permission Error không bao giờ tự hết khi retry. Cần ngắt vòng lặp, bắt lỗi is_error: true và chuyển giao cho người dùng xử lý.",
    tip: "Gặp Permission Error ➔ Ngắt ngay, cấm Retry vô hạn."
  },
  "Chain-of-Thought": {
    name: "Chain-of-Thought (CoT) / <thinking>",
    category: "Prompt Engineering Technique",
    descEN: "Instructing the model to reason step-by-step inside <thinking> tags prior to generating final output.",
    descVI: "Kỹ thuật suy luận từng bước: Ép mô hình AI phải nháp suy luận chi tiết bên trong thẻ <thinking> trước khi đưa ra câu trả lời hay kết quả JSON cuối cùng.",
    example: "Prompt: 'Hãy suy luận trong thẻ <thinking> trước khi trả lời'",
    examGotcha: "Chain-of-Thought inside <thinking> tags giúp tăng độ chính xác khi bóc tách dữ liệu phức tạp lên tới 40%.",
    tip: "Suy luận từng bước trong <thinking> ➔ Tăng 40% độ chính xác."
  }
};
