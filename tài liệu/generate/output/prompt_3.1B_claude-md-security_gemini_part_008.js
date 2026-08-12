[
  {
    "id": "d3-b06-B-015",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-15",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-015",
    "scenarioSignature": {
      "testedPrinciple": "separation of prompt documentation in claudemd from tool execution governance in mcp configuration",
      "failureMode": "tool execution failure when documentation conflicts with runtime server config",
      "rootCause": "relying on claudemd text documentation to control mcp tool availability rather than mcp json configuration",
      "requiredFix": "configure mcp server registrations in mcp json and keep claudemd documentation synchronized as reference only"
    },
    "questionEN": "A DevOps team manages the payments-service repository and updates /repo/CLAUDE.md to list available Model Context Protocol (MCP) tools, including db-query, stripe-refund, and slack-notify. To restrict administrative privileges, an engineer removes the stripe-refund server configuration from .claude/mcp.json, but leaves the documentation in /repo/CLAUDE.md untouched. During a session, a user asks Claude Code to process a refund. What happens, and how does Claude Code process these configuration sources?",
    "question": "[d3-b06-B-015] Một đội ngũ DevOps quản lý kho lưu trữ payments-service và cập nhật /repo/CLAUDE.md để liệt kê các công cụ Model Context Protocol (MCP) khả dụng, bao gồm db-query, stripe-refund và slack-notify. Để hạn chế quyền quản trị, một kỹ sư xóa cấu hình máy chủ stripe-refund khỏi .claude/mcp.json, nhưng vẫn giữ nguyên tài liệu hướng dẫn trong /repo/CLAUDE.md. Trong một phiên làm việc, người dùng yêu cầu Claude Code xử lý khoản hoàn tiền. Điều gì xảy ra và Claude Code xử lý các nguồn cấu hình này như thế nào?",
    "optionsEN": [
      "A. Claude Code reads stripe-refund from /repo/CLAUDE.md and automatically re-injects the missing server definition into .claude/mcp.json before tool execution.",
      "B. Claude Code halts initialization with a configuration mismatch error because documented tools in /repo/CLAUDE.md must strictly match .claude/mcp.json.",
      "C. Claude Code references /repo/CLAUDE.md for context but fails to execute the tool because actual MCP tool availability is strictly controlled by mcp.json.",
      "D. Claude Code falls back to executing stripe-refund via system shell commands since CLAUDE.md grants implicit execution permissions."
    ],
    "options": [
      "A. Claude Code đọc stripe-refund từ /repo/CLAUDE.md và tự động thêm lại định nghĩa máy chủ bị thiếu vào .claude/mcp.json trước khi thực thi công cụ.",
      "B. Claude Code dừng khởi tạo với lỗi bất đồng cấu hình vì các công cụ được ghi trong tài liệu /repo/CLAUDE.md phải khớp chính xác với .claude/mcp.json.",
      "C. Claude Code tham chiếu /repo/CLAUDE.md để lấy bối cảnh nhưng thất bại khi thực thi công cụ vì khả năng dụng thực tế của công cụ MCP được kiểm soát nghiêm ngặt bởi mcp.json.",
      "D. Claude Code chuyển sang thực thi stripe-refund thông qua các lệnh shell hệ thống vì CLAUDE.md cấp quyền thực thi ngầm định."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because CLAUDE.md is non-enforcing context documentation and cannot auto-populate or modify runtime infrastructure configurations like mcp.json.",
      "Option B is incorrect because Claude Code does not validate CLAUDE.md text against mcp.json on startup or throw initialization error gates.",
      "Option C is correct because CLAUDE.md serves as reference text for the model prompt, whereas tool registration and runtime capability binding are strictly governed by mcp.json.",
      "Option D is incorrect because CLAUDE.md documentation does not grant execution privileges or bypass MCP runtime tool requirements."
    ],
    "rationale": "CLAUDE.md provides behavioral guidance and prompt reference context for Claude Code, but actual MCP tool availability, connection details, and execution capabilities are controlled exclusively by mcp.json configuration files. Removing a tool from mcp.json renders it unavailable for invocation regardless of what is documented in CLAUDE.md.",
    "explanation": "Tệp CLAUDE.md đóng vai trò cung cấp ngữ cảnh và hướng dẫn hành vi cho mô hình ngôn ngữ, nhưng không có khả năng kích hoạt hay quản lý các công cụ phần mềm thực tế. Khả năng tích hợp và thực thi các công cụ MCP (Model Context Protocol) hoàn toàn do tệp cấu hình mcp.json (hoặc cấu hình MCP toàn cục) chi phối. Khi một công cụ bị xóa khỏi mcp.json, Claude Code không thể gọi công cụ đó ngay cả khi nó vẫn được mô tả trong /repo/CLAUDE.md.\n- Lựa chọn A sai vì CLAUDE.md không thể tự động sửa đổi hoặc khôi phục cấu hình hạ tầng mcp.json.\n- Lựa chọn B sai vì Claude Code không đối soát văn bản trong CLAUDE.md với mcp.json để chặn khởi tạo phiên.\n- Lựa chọn C đúng vì CLAUDE.md chỉ là tài liệu tham khảo cho prompt, trong khi quyền và khả năng thực thi công cụ MCP thực tế bắt buộc phải qua mcp.json.\n- Lựa chọn D sai vì văn bản trong CLAUDE.md không thể cấp quyền truy cập hoặc tự động chuyển đổi công cụ MCP thành lệnh shell.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  },
  {
    "id": "d3-b06-B-016",
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "taskStatement": "3.1 claude-md-hierarchy / angle-16",
    "difficulty": "application",
    "scenarioId": "g-d3-b06-B-016",
    "scenarioSignature": {
      "testedPrinciple": "context window optimization and selective importing in claudemd architecture",
      "failureMode": "excessive token consumption and instruction degradation from context bloat",
      "rootCause": "importing massive documentation files into system prompt via claudemd import directive",
      "requiredFix": "remove import directive for large documents and instruct model to read reference files on demand"
    },
    "questionEN": "In the enterprise-core repository, /repo/CLAUDE.md contains the line '@import ./architecture.md' to incorporate project design guidelines. However, architecture.md is an exhaustive 50,000-token document. Developers notice high token costs, slower response times, and frequent instruction-following failures even for simple file edits. Is this configuration pattern effective, and what is its impact on Claude Code?",
    "question": "[d3-b06-B-016] Trong kho lưu trữ enterprise-core, /repo/CLAUDE.md có chứa dòng '@import ./architecture.md' để tích hợp các hướng dẫn thiết kế dự án. Tuy nhiên, architecture.md là một tài liệu đồ sộ lên tới 50.000 token. Các nhà phát triển nhận thấy chi phí token tăng cao, thời gian phản hồi chậm hơn và Claude Code thường xuyên bỏ sót chỉ dẫn ngay cả với các tác vụ chỉnh sửa tệp đơn giản. Mẫu cấu hình này có hiệu quả không và tác động của nó đối với Claude Code là gì?",
    "optionsEN": [
      "A. It is an effective pattern because Claude Code automatically compresses files larger than 10,000 tokens into semantic embeddings before injecting them into the system prompt.",
      "B. It is an invalid pattern because @import directives are restricted to loading configuration files inside .claude/ directories and throw a path resolution error for root-level files.",
      "C. It is an effective pattern because loading 50,000 tokens into CLAUDE.md ensures Claude Code retains global system knowledge without performing manual file read calls.",
      "D. It is an antipattern because @import eagerly loads all 50,000 tokens into the prompt context for every request, causing severe context bloat and instruction degradation."
    ],
    "options": [
      "A. Đây là mẫu hiệu quả vì Claude Code tự động nén các tệp lớn hơn 10.000 token thành các nhúng ngữ nghĩa (semantic embeddings) trước khi chèn vào system prompt.",
      "B. Đây là mẫu không hợp lệ vì các chỉ thị @import bị giới hạn chỉ được tải các tệp cấu hình bên trong thư mục .claude/ và sẽ báo lỗi đường dẫn đối với các tệp ở cấp gốc.",
      "C. Đây là mẫu hiệu quả vì việc tải 50.000 token vào CLAUDE.md đảm bảo Claude Code duy trì kiến thức hệ thống toàn cục mà không cần thực hiện các cuộc gọi đọc tệp thủ công.",
      "D. Đây là mẫu vi phạm (antipattern) vì @import nạp trực tiếp toàn bộ 50.000 token vào context prompt trong mọi yêu cầu, gây lãng phí bối cảnh nghiêm trọng và làm giảm khả năng tuân thủ chỉ dẫn."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because Claude Code does not perform automatic semantic compression or vector summaries on @imported files.",
      "Option B is incorrect because @import supports relative file paths anywhere in the repository, not just within .claude/ directories.",
      "Option C is incorrect because eager-loading large amounts of static documentation bloats the prompt context and increases latency/cost unnecessarily.",
      "Option D is correct because @import forces the entire target file into the system prompt context on every user interaction, causing lost-in-the-middle degradation and wasting token budget."
    ],
    "rationale": "Using @import in CLAUDE.md to load large documentation files (such as 50,000-token design specs) is an antipattern. The @import directive directly expands file contents into the prompt context for every conversation step. Large imports bloat context overhead, increase token latency and cost, and dilute critical operational instructions. Best practice is to keep CLAUDE.md concise and instruct the agent to read large architecture files on demand via file view tools.",
    "explanation": "Việc sử dụng chỉ thị @import trong CLAUDE.md để nạp các tệp tài liệu dung lượng lớn (như tệp kiến trúc 50.000 token) là một mẫu vi phạm (antipattern). Chỉ thị @import sẽ mở rộng và nạp toàn bộ nội dung của tệp được chỉ định trực tiếp vào system prompt context ở mỗi yêu cầu người dùng.\nViệc này làm bùng nổ dung lượng token (context bloat), gia tăng chi phí và độ trễ phản hồi, đồng thời làm suy giảm khả năng tuân thủ các quy tắc quan trọng khác (hiệu ứng lost-in-the-middle). Thực hành chuẩn là giữ CLAUDE.md tinh gọn và hướng dẫn mô hình chủ động đọc các tệp tài liệu lớn bằng công cụ view khi cần thiết.\n- Lựa chọn A sai vì Claude Code không nén ngữ nghĩa tự động đối với các tệp được nạp qua @import.\n- Lựa chọn B sai vì @import hỗ trợ tất cả các đường dẫn tương đối hợp lệ trong kho lưu trữ, không chỉ giới hạn trong thư mục .claude/.\n- Lựa chọn C sai vì nạp sẵn 50.000 token gây lãng phí tài nguyên bối cảnh không cần thiết cho mọi tác vụ nhỏ.\n- Lựa chọn D đúng vì @import làm phình context prompt, gia tăng chi phí và suy giảm chất lượng xử lý chỉ dẫn.",
    "sources": [
      {
        "label": "Lesson 3.1: CLAUDE.md Hierarchy",
        "url": "https://claudecertificationguide.com/learn/3-claude-code-config/3-1-claude-md-hierarchy"
      }
    ]
  }
]