[
  {
    "id": "d2-b05-B-003",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-003",
    "scenarioSignature": {
      "testedPrinciple": "MCP server startup health validation and log inspection",
      "failureMode": "silent omission of tools due to unhandled MCP server startup crash",
      "rootCause": "MCP server process exits immediately during initialization before stdio transport handshake completes",
      "requiredFix": "inspect MCP server logs and execute server health check prior to session startup"
    },
    "questionEN": "A developer configures a Node.js stdio MCP server named db-analytics inside .claude/mcp.json with command node ./dist/server.js. Upon starting a Claude Code session, db-analytics crashes immediately during startup due to an unhandled missing DB_HOST environment variable exception. Claude Code starts up successfully without surfacing any error to the developer CLI interface, but tools from db-analytics are missing from the session. How should the engineering team diagnose the root cause and prevent silent MCP tool unavailability?",
    "question": "[d2-b05-B-003] Một nhà phát triển cấu hình MCP server stdio bằng Node.js tên là db-analytics trong file .claude/mcp.json với câu lệnh node ./dist/server.js. Khi bắt đầu phiên làm việc Claude Code, db-analytics bị crash ngay lập tức trong quá trình khởi chạy do ngoại lệ chưa xử lý từ việc thiếu biến môi trường DB_HOST. Claude Code vẫn khởi động thành công mà không hiển thị bất kỳ lỗi nào trên giao diện CLI của nhà phát triển, nhưng các công cụ từ db-analytics bị loại bỏ âm thầm khỏi phiên làm việc. Đội ngũ kỹ thuật nên làm gì để chẩn đoán nguyên nhân gốc rễ và ngăn chặn tình trạng công cụ MCP bị thiếu một cách âm thầm?",
    "optionsEN": [
      "A. Increase toolTimeoutMs in .claude/mcp.json to 60000ms to allow the process additional time to complete the stdio handshake.",
      "B. Wrap the server execution command with an --ignore-errors flag in .claude/mcp.json so Claude Code automatically restarts crashed child processes.",
      "C. Inspect Claude Code's MCP log files located at ~/.claude/logs/mcp*.log to view the server stderr output, and implement startup health checks before running developer workflows.",
      "D. Reconfigure the server transport in .claude/mcp.json from stdio to sse to prevent child process termination when environment variables are missing."
    ],
    "options": [
      "A. Tăng toolTimeoutMs trong .claude/mcp.json lên 60000ms để cho phép tiến trình có thêm thời gian hoàn thành bắt tay stdio.",
      "B. Bọc câu lệnh thực thi server với cờ --ignore-errors trong .claude/mcp.json để Claude Code tự động khởi động lại các tiến trình con bị crash.",
      "C. Kiểm tra các file log MCP của Claude Code tại ~/.claude/logs/mcp*.log để xem đầu ra stderr của server, và triển khai kiểm tra sức khỏe khởi động trước khi chạy quy trình làm việc.",
      "D. Cấu hình lại transport của server trong .claude/mcp.json từ stdio sang sse để ngăn tiến trình con bị chấm dứt khi thiếu biến môi trường."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because increasing toolTimeoutMs only extends the execution window of running tool calls; it does not resolve or report process crashes that occur immediately during startup.",
      "Option B is incorrect because mcp.json command configuration does not support an --ignore-errors flag, and hiding startup errors prevents developers from correcting missing configuration dependencies.",
      "Option C is correct because Claude Code captures stdio stderr streams from background MCP servers into dedicated log files (~/.claude/logs/mcp*.log), enabling developers to view crash traces and establish pre-flight startup validation.",
      "Option D is incorrect because changing transport configuration to sse does not fix an unhandled Node.js startup exception and will cause connection failures if no HTTP SSE server is listening."
    ],
    "rationale": "Claude Code isolates MCP server stdio stderr output into background log files (~/.claude/logs/mcp*.log). When an MCP server crashes at startup (such as from a missing environment variable), Claude Code continues operating silently without that server's tools. Inspecting the MCP log files reveals the unhandled exception, and implementing startup validation ensures MCP server readiness prior to developer sessions.",
    "explanation": "Khi một MCP server dạng stdio gặp lỗi nghiêm trọng lúc khởi chạy (chẳng hạn như thiếu biến môi trường DB_HOST), tiến trình con bị thoát ngay lập tức. Claude Code không chặn toàn bộ phiên làm việc mà bỏ qua các công cụ của server đó mà không hiển thị lỗi trực tiếp ra giao diện CLI. Đầu ra stderr của server MCP được Claude Code ghi lại trong thư mục log riêng (~/.claude/logs/mcp*.log). Do đó, phương án đúng là xem các file log này để tìm dấu vết lỗi crash và thêm quy trình kiểm tra sức khỏe (health check) trước khi khởi động phiên làm việc.\n\n- Phương án A sai vì toolTimeoutMs quản lý thời gian chờ của lượt gọi tool đang chạy chứ không giải quyết lỗi crash lúc startup.\n- Phương án B sai vì cờ --ignore-errors không tồn tại trong cấu hình mcp.json và việc che giấu lỗi khiến không thể phát hiện nguyên nhân thiếu biến môi trường.\n- Phương án C đúng vì kiểm tra log tại ~/.claude/logs/mcp*.log giúp thấy được đầu ra stderr bị crash và từ đó xây dựng kịch bản kiểm tra sức khỏe khởi tạo.\n- Phương án D sai vì đổi transport sang sse không sửa được lỗi crash của Node.js khi thiếu biến môi trường và sẽ thất bại nếu server không lắng nghe kết nối HTTP SSE.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  },
  {
    "id": "d2-b05-B-004",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.4 mcp-server-integration / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d2-b05-B-004",
    "scenarioSignature": {
      "testedPrinciple": "per-server execution timeout configuration in MCP client settings",
      "failureMode": "tool execution termination after short default client timeout",
      "rootCause": "long-running backend operation exceeds default five-second client tool timeout boundary",
      "requiredFix": "configure custom server-level timeout setting in client configuration file"
    },
    "questionEN": "A database engineering team configures an MCP server named analytics-db inside .claude/mcp.json to execute analytical PostgreSQL queries. While running complex aggregate queries in Claude Code, tool calls requiring large dataset scans fail consistently after exactly 5000ms with a Tool execution timed out after 5000ms error, even though the database queries legitimately require up to 30 seconds to complete. How should the team configure Claude Code to accommodate these long-running queries for analytics-db?",
    "question": "[d2-b05-B-004] Một đội ngũ kỹ thuật cơ sở dữ liệu cấu hình một MCP server tên là analytics-db trong file .claude/mcp.json để thực thi các câu truy vấn phân tích PostgreSQL. Khi chạy các câu truy vấn tổng hợp phức tạp trong Claude Code, các lượt gọi công cụ yêu cầu quét tập dữ liệu lớn liên tục thất bại chính xác sau 5000ms với lỗi Tool execution timed out after 5000ms, mặc dù câu truy vấn cơ sở dữ liệu thực tế hợp lệ cần tới 30 giây để hoàn thành. Đội ngũ nên cấu hình Claude Code như thế nào để đáp ứng các câu truy vấn chạy lâu này cho analytics-db?",
    "optionsEN": [
      "A. Append ?statement_timeout=5000 to the PostgreSQL connection string in mcp.json so the database forces query completion within 5 seconds.",
      "B. Change the transport configuration for analytics-db in mcp.json from stdio to sse, which disables client-side tool execution timeouts.",
      "C. Prompt the model to automatically divide complex aggregate SQL queries into 5-second execution chunks within the interactive chat session.",
      "D. Add an explicit timeout setting (such as timeout: 45000) inside the analytics-db server entry in .claude/mcp.json to override the default tool timeout."
    ],
    "options": [
      "A. Thêm ?statement_timeout=5000 vào chuỗi kết nối PostgreSQL trong mcp.json để cơ sở dữ liệu ép hoàn thành truy vấn trong 5 giây.",
      "B. Thay đổi cấu hình transport cho analytics-db trong mcp.json từ stdio sang sse nhằm vô hiệu hóa thời gian chờ gọi công cụ ở phía client.",
      "C. Yêu cầu mô hình tự động chia nhỏ các câu truy vấn SQL tổng hợp phức tạp thành các khối thực thi 5 giây trong phiên trò chuyện.",
      "D. Thêm cài đặt thời gian chờ tùy chỉnh (như timeout: 45000) bên trong khối server analytics-db trong file .claude/mcp.json để ghi đè thời gian chờ mặc định."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because setting statement_timeout=5000 on PostgreSQL forces the database engine to cancel queries that exceed 5 seconds, preventing legitimate 30-second queries from executing.",
      "Option B is incorrect because changing to SSE transport maintains network connectivity but does not eliminate or disable client-side MCP tool execution timeouts.",
      "Option C is incorrect because attempting to chunk SQL aggregations via prompt instructions is unreliable, consumes excessive context, and does not alter the client-side tool timeout mechanism.",
      "Option D is correct because configuring a server-specific timeout property (e.g. timeout: 45000) in .claude/mcp.json extends the execution limit specifically for analytics-db tools without impacting other MCP servers."
    ],
    "rationale": "Claude Code allows configuring execution timeouts on a per-server basis within mcp.json (such as setting timeout to 45000ms for a specific server). When tools perform inherently long-running operations like 30-second database analytics, overriding the default 5-second client timeout for that specific MCP server ensures queries complete successfully while maintaining standard limits for fast local tools.",
    "explanation": "Claude Code cho phép thiết lập thời gian chờ (timeout) tùy chỉnh cho từng MCP server cụ thể trong file cấu hình .claude/mcp.json. Khi các công cụ thuộc server analytics-db cần thực thi các truy vấn dữ liệu lớn kéo dài 30 giây, việc bổ sung thuộc tính timeout (ví dụ timeout: 45000) cho khối server đó sẽ giúp ghi đè hạn mức 5000ms mặc định của client, cho phép câu truy vấn hoàn thành bình thường mà không ảnh hưởng tới các server MCP khác.\n\n- Phương án A sai vì đặt statement_timeout=5000 ở cấp PostgreSQL sẽ hủy câu truy vấn phía database khi vượt quá 5 giây, khiến các câu truy vấn hợp lệ kéo dài 30 giây không thể chạy được.\n- Phương án B sai vì transport sse không hủy bỏ cơ chế kiểm tra timeout phía client đối với lượt gọi công cụ.\n- Phương án C sai vì chia nhỏ truy vấn bằng prompt không đáng tin cậy, gây tốn context token và không can thiệp vào cơ chế timeout của client.\n- Phương án D đúng vì cấu hình timeout riêng cho server analytics-db trong .claude/mcp.json giải quyết đúng nguyên nhân gốc rễ và mở rộng hạn mức thời gian chờ lên mức phù hợp.",
    "sources": [
      {
        "label": "Lesson 2.4: MCP Server Integration",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-4-mcp-server-integration"
      }
    ]
  }
]