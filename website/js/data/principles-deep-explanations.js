/* CCAF Learning Hub - 67 Core Principles Deep Explanation Dictionary */

function generatePrinciplesDeepExplanations() {
  const data = {};

  if (typeof PRINCIPLES_DATA === 'undefined') {
    return data;
  }

  PRINCIPLES_DATA.forEach(p => {
    data[p.id] = {
      id: p.id,
      domain: p.domain,
      domainTitle: p.domainTitle,
      titleEN: p.title,
      titleVI: p.titleVI,
      
      // 1. Problem Scenario
      problemScenario: `Giả sử ứng dụng của bạn gặp tình huống liên quan đến '${p.titleVI}'. Khi làm việc trong hệ thống lớn, mô hình AI thiếu thông tin ngữ cảnh hoặc xử lý không đúng nguyên tắc ${p.domainTitle}.`,
      
      // 2. Anti-Pattern Analysis
      antiPatternAnalysis: `❌ SAU LẦM PHỔ BIẾN (ANTI-PATTERN): ${p.antiPattern}\n\n👉 Hậu quả: Làm suy giảm độ chính xác của Agent, gây lãng phí bộ nhớ Context Window hoặc bùng nổ chi phí API vô ích.`,
      
      // 3. Correct Pattern Breakdown
      correctPatternBreakdown: `✅ GIẢI PHÁP KIẾN TRÚC CHUẨN ANTHROPIC: ${p.correctPattern}\n\n👉 Chi tiết kỹ thuật: ${p.bodyVI}`,
      
      // 4. Exam Mnemonics
      examMnemonic: `🎯 MẸO LÀM BÀI THI CCAF:\n- Chọn phương án: Tuân thủ pattern '${p.correctPattern}'\n- Tránh phương án bẫy: '${p.antiPattern}'`
    };
  });

  // Custom deep breakdowns for key principles
  data[1] = {
    id: 1,
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    titleEN: "Agentic search over static context",
    titleVI: "Dùng Agentic search thay vì truyền ngữ cảnh tĩnh",
    problemScenario: "Giả sử bạn yêu cầu AI sửa hàm updateUserProfile(). AI sửa xong nhưng khi chạy test lại bị lỗi, vì hàm này được gọi ở file checkout.js chưa hề nạp vào prompt ban đầu (Lỗi Missing-Context).",
    antiPatternAnalysis: "❌ SAU LẦM PHỔ BIẾN (ANTI-PATTERN):\n1. Thêm chỉ thị Chain-of-Thought 'Hãy suy luận xem hàm được gọi ở đâu'. (AI không có phép thuật để biết nội dung file chưa đưa vào prompt!).\n2. Nạp toàn bộ 500 file vào Prompt tĩnh (gây quá tải Context Window 200K tokens và lãng phí tiền API).",
    correctPatternBreakdown: "✅ GIẢI PHÁP KIẾN TRÚC CHUẨN ANTHROPIC:\nBiến công việc thành Agentic Task bằng cách cấp cho AI các công cụ chủ động: GlobTool (tìm file), GrepTool (tìm từ khóa), FileReadTool (đọc file). AI sẽ tự Grep -> phát hiện checkout.js -> đọc file -> sửa mượt mà 100%.",
    examMnemonic: "🎯 MẸO LÀM BÀI THI CCAF:\n- Chọn phương án: Cấp công cụ Glob/Grep/View cho Agent tự tra cứu tự chủ.\n- Tránh phương án bẫy: Thêm hướng dẫn Chain-of-Thought hoặc nhồi thêm dữ liệu tĩnh vào prompt."
  };

  data[6] = {
    id: 6,
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    titleEN: "True parallel subagent execution",
    titleVI: "Thực thi subagent song song thực sự",
    problemScenario: "Hệ thống support agent cần thực thi 3 Subagent song song để tra cứu hóa đơn, kiểm tra vận chuyển và đánh giá lịch sử hỗ trợ cùng một lúc.",
    antiPatternAnalysis: "❌ SAU LẦM PHỔ BIẾN (ANTI-PATTERN):\nDặn mô hình trong system prompt 'Hãy chạy song song nhé' hoặc đổi sang mô hình Haiku rẻ hơn. Việc dặn bằng văn bản không đảm bảo SDK sẽ chạy song song thực sự.",
    correctPatternBreakdown: "✅ GIẢI PHÁP KIẾN TRÚC CHUẨN ANTHROPIC:\nCoordinator phải phát ra NHIỀU LỆNH GỌI TOOL 'Task' trong CÙNG MỘT MESSAGE turn của assistant. Đây là cơ chế duy nhất khiến Anthropic SDK khởi chạy các subagent song song thực sự.",
    examMnemonic: "🎯 MẸO LÀM BÀI THI CCAF:\n- Chọn phương án: Phát ra nhiều thẻ tool_use Task trong CÙNG 1 turn phản hồi.\n- Tránh phương án bẫy: Chỉ dặn 'hãy chạy song song' trong prompt."
  };

  data[7] = {
    id: 7,
    domain: "D1",
    domainTitle: "Agent Architecture & Orchestration",
    titleEN: "'Task' must be in allowedTools",
    titleVI: "Công cụ 'Task' phải có trong danh sách allowedTools",
    problemScenario: "Lead Coordinator liên tục suy luận về việc ủy quyền nhiệm vụ nhưng không có Subagent nào thực sự được khởi tạo và không có log lỗi.",
    antiPatternAnalysis: "❌ SAU LẦM PHỔ BIẾN (ANTI-PATTERN):\nCấu hình danh sách AgentDefinitions nhưng quên không thêm 'Task' vào thuộc tính allowedTools của Coordinator.",
    correctPatternBreakdown: "✅ GIẢI PHÁP KIẾN TRÚC CHUẨN ANTHROPIC:\nLuôn thêm 'Task' vào mảng allowedTools của Coordinator. Mô hình cần công cụ 'Task' như một cơ chế thực thi để kích hoạt Subagent.",
    examMnemonic: "🎯 MẸO LÀM BÀI THI CCAF:\n- Chọn phương án: Khai báo 'Task' trong allowedTools của Coordinator."
  };

  data[10] = {
    id: 10,
    domain: "D2",
    domainTitle: "Tool Design & MCP Integration",
    titleEN: "Granular tools over monolithic tools",
    titleVI: "Tách tool đơn nhiệm thay vì tool đa năng Monolithic",
    problemScenario: "Tạo một tool cồng kềnh 'manage_database' làm tất cả việc: query, insert, update, drop. Mô hình thường xuyên truyền sai tham số hoặc tự chạy lệnh terminal thô.",
    antiPatternAnalysis: "❌ SAU LẦM PHỔ BIẾN (ANTI-PATTERN):\nTạo một tool đa năng chứa 12 tham số phức tạp và đưa toàn bộ tài liệu hướng dẫn vào prompt.",
    correctPatternBreakdown: "✅ GIẢI PHÁP KIẾN TRÚC CHUẨN ANTHROPIC:\nTách tool cồng kềnh thành các công cụ đơn nhiệm Granular (vd: query_records, update_record) với input schema tường minh.",
    examMnemonic: "🎯 MẸO LÀM BÀI THI CCAF:\n- Chọn phương án: Tách thành các Granular Single-Purpose Tools."
  };

  return data;
}

const PRINCIPLES_DEEP_DATA = generatePrinciplesDeepExplanations();
