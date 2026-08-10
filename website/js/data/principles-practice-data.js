/* CCAF Learning Hub - 3,350 Complete Diverse Scenario Questions Engine (50 Distinct Scenarios / Principle)
   Bilingual English & Vietnamese Scenario-Based Questions mapped to 67 Principles (IDs 1 to 67)
*/

function generatePrinciplesPracticePool() {
  const pool = [];
  let currentId = 5000;

  if (typeof PRINCIPLES_DATA === 'undefined') {
    return pool;
  }

  const DOMAINS_SCENARIOS = [{'domainName': 'E-Commerce Payment Gateway', 'templates': ['Tích hợp Stripe/PayPal Checkout API xử lý giao dịch tài chính cho 50.000 user/phút.', 'Refactor module tính thuế VAT và giảm giá voucher tự động trong file payment.ts.', 'Xử lý lỗi rò rỉ bộ nhớ session token khi gọi Webhook xác nhận thanh toán ngân hàng.', 'Đồng bộ trạng thái đơn hàng giữa Microservice Order và Microservice Billing qua gRPC.', 'Kiểm tra bảo mật và cấp quyền truy cập bảng dữ liệu thẻ tín dụng PCI-DSS.']}, {'domainName': 'FinTech Banking Microservices', 'templates': ['Hệ thống chuyển tiền liên ngân hàng yêu cầu độ chính xác 100% Deterministic và log audit trail.', 'Phân tích báo cáo tài chính hàng quý dung lượng 100.000 trang bất đồng bộ qua Message Batches API.', 'Khôi phục trạng thái Agent Coordinator sau sự cố crash server giữa chừng khi đang chạy giao dịch.', 'Xử lý lỗi nghẽn mạng HTTP 429 Rate Limit khi gọi API tra cứu tỷ giá ngoại tệ.', 'Bảo mật thông tin khách hàng và mã hóa dữ liệu cá nhân theo chuẩn GDPR/Banking Security.']}, {'domainName': 'HealthCare Cloud API & Medical Records', 'templates': ['Trích xuất thông tin bệnh án điện tử EHR từ các file scan PDF/Image dung lượng lớn.', 'Tổng hợp dữ liệu xét nghiệm máu từ 3 bệnh viện mâu thuẫn con số (8% vs 12%).', 'Thiết kế Agent tìm kiếm tri thức y khoa IC-10 trên cây thư mục 10.000 tài liệu.', 'Cô lập bộ nhớ hội thoại bệnh nhân để bảo vệ quyền riêng tư HIPAA.', 'Tự động gửi thông báo nhắc lịch tái khám cho 20.000 bệnh nhân qua SMS Gateway.']}, {'domainName': 'Claude Code CI/CD & Automated PR Review', 'templates': ['Thiết lập GitHub Actions Runner tự động review PR và chạy unit test cho 300 tệp mã nguồn.', 'Cấu hình cờ lệnh --dangerously-skip-permissions trong môi trường Sandbox Docker cô lập.', 'Tối ưu hóa file CLAUDE.md dưới 100 dòng tập trung vào lệnh build/test.', 'Phát hiện và ngăn chặn lệnh Bash dangerous (như rm -rf hay DROP DATABASE) bằng PreToolUse Hook.', 'Tự động đọc log lỗi build TypeScript và tạo FileEdit patch khắc phục cục bộ.']}, {'domainName': 'React Frontend & Enterprise UI Design System', 'templates': ['Chuyển đổi 50 Class Components legacy sang React Functional Hooks và Context API.', 'Định vị nơi gọi hàm useAuthToken() bị lỗi ngầm trong 400 tệp UI component.', 'Tối ưu hóa tốc độ tải trang dashboard bằng cách lười nạp (Lazy Loading) các module nặng.', 'Sửa lỗi xung đột z-index và layout shift trên giao diện người dùng.', 'Đồng bộ bộ nhớ localState của UI với backend REST API.']}, {'domainName': 'Multi-Agent Research & Data Synthesis', 'templates': ['Lead Coordinator điều phối 5 Subagent nghiên cứu thị trường công nghệ AI song song.', 'Tách mảng messages giữa Coordinator và Worker để tránh làm ngợp Context Window 200K.', 'Sử dụng file Scratchpad (notes.md) để ghi vết phát hiện quan trọng trước khi nén context (/compact).', 'Bảo tồn nguồn gốc trích dẫn URL và ngày xuất bản khi tổng hợp báo cáo.', 'Khởi chạy các Subagent bằng lệnh gọi tool Task đồng thời trong 1 turn.']}, {'domainName': 'DevOps Infrastructure & MCP Tooling', 'templates': ['Xây dựng MCP Server cho phép Claude thao tác với hạ tầng AWS Kubernetes Cluster.', "Tách công cụ monolithic cồng kềnh 'manage_cloud' thành các Granular Tools đơn nhiệm.", "Bắt buộc khai báo thuộc tính 'required' trong JSON Schema của input_schema.", 'Xử lý lỗi Permission Error 403 khi Agent truy cập bucket S3 thiếu IAM role.', 'Tối ưu hóa chi phí gọi API bằng cách cắt tỉa payload kết quả tool cũ (Context Pruning).']}, {'domainName': 'C++ High-Performance Game Engine', 'templates': ['Định vị vị trí rò rỉ bộ nhớ con trỏ giữa TextureManager.cpp và SceneNode.cpp trong 2.000 file C++.', 'Dùng GlobTool và GrepTool tìm từ khóa struct RenderPass trước khi đọc file.', 'Sửa lỗi biên dịch g++ linker do thiếu file header include.', 'Tối ưu hóa vòng lặp render 60 FPS bằng cách tránh tạo mới object ngẫu nhiên.', 'Kiểm tra tính an toàn bộ nhớ thread safety trong môi trường đa luồng.']}, {'domainName': 'OCR Data Extraction & Document Parser', 'templates': ['Ép Claude trích xuất bảng hóa đơn bán hàng thành JSON Schema chuẩn bằng tool_choice.', 'Bóc tách thông tin từ tệp PDF scan bị mờ văn bản bằng CoT suy luận trong thẻ <thinking>.', 'Trích xuất dữ liệu đa ngôn ngữ Anh-Việt bảo toàn cấu trúc bảng.', 'Phân loại 10.000 chứng từ kế toán tự động dựa trên quy tắc doanh nghiệp.', 'Xử lý trường dữ liệu bị thiếu bằng cách trả về null tường minh thay vì bịa ra con số.']}, {'domainName': 'Customer Support Resolution Desk', 'templates': ['Xử lý yêu cầu hoàn tiền hàng $800 tự động bằng PreToolUse Hook chờ con người phê duyệt (HITL).', 'Tra cứu lịch sử khiếu nại của khách hàng trên CRM trong 50.000 log cũ.', 'Tự động phân loại 1.000 email khiếu nại theo mức độ khẩn cấp.', 'Cung cấp hướng dẫn xử lý lỗi thiết bị IoT cho khách hàng theo quy trình 5 bước.', 'Đánh giá chỉ số hài lòng CSAT và tóm tắt cuộc hội thoại ngắn gọn.']}];

  PRINCIPLES_DATA.forEach((p) => {
    let scenarioCounter = 1;

    DOMAINS_SCENARIOS.forEach((dom) => {
      dom.templates.forEach((tmpl) => {
        const idx = scenarioCounter++;
        const qId = currentId++;

        const questionTextVI = `${tmpl} Phương án kiến trúc nào dưới đây là quyết định chuẩn xác nhất để xử lý tình huống này theo chứng chỉ Anthropic CCAF?`;
        const questionTextEN = `${tmpl} Which architectural decision below is most accurate to resolve this scenario according to the Anthropic CCAF exam?`;

        const correctOptVI = `A. ${p.correctPattern}`;
        const wrongOpt1VI = `B. ${p.antiPattern}`;
        const wrongOpt2VI = `C. Tải toàn bộ log hội thoại thô 150K token vào mảng messages mà không tước bỏ.`;
        const wrongOpt3VI = `D. Bỏ qua kiểm tra Schema và đặt temperature = 0.9.`;

        const correctOptEN = `A. ${p.correctPattern}`;
        const wrongOpt1EN = `B. ${p.antiPattern}`;
        const wrongOpt2EN = `C. Reload the entire raw 150K conversation log directly into messages array.`;
        const wrongOpt3EN = `D. Disable schema validation and set temperature to 0.9.`;

        const rawOptsVI = [correctOptVI, wrongOpt1VI, wrongOpt2VI, wrongOpt3VI];
        const rawOptsEN = [correctOptEN, wrongOpt1EN, wrongOpt2EN, wrongOpt3EN];

        // Shuffle shift based on (p.id + idx)
        const shift = (p.id + idx) % 4;

        const optionsVI = [];
        const optionsEN = [];
        let correctIndex = 0;

        for (let j = 0; j < 4; j++) {
          const targetIdx = (j + shift) % 4;
          if (targetIdx === 0) correctIndex = j;

          const letter = String.fromCharCode(65 + j);
          const cleanVI = rawOptsVI[targetIdx].replace(/^[A-D]\.\s*/, '');
          const cleanEN = rawOptsEN[targetIdx].replace(/^[A-D]\.\s*/, '');

          optionsVI.push(`${letter}. ${cleanVI}`);
          optionsEN.push(`${letter}. ${cleanEN}`);
        }

        const expText = `EXPLANATION FOR PRINCIPLE #${p.id} (${p.domain}):\n- ✅ Correct Pattern: ${p.correctPattern}\n- ❌ Anti-Pattern: ${p.antiPattern}\n- Technical Rationale: ${p.bodyVI}`;

        pool.push({
          id: qId,
          principleId: p.id,
          domain: p.domain,
          domainTitle: p.domainTitle,
          principleTitle: p.titleVI,
          principleTitleEN: p.title,
          question: questionTextVI,
          questionEN: questionTextEN,
          options: optionsVI,
          optionsEN: optionsEN,
          correct: correctIndex,
          explanation: expText,
          antiPattern: p.antiPattern,
          correctPattern: p.correctPattern
        });
      });
    });
  });

  return pool;
}

const PRINCIPLES_PRACTICE_POOL = generatePrinciplesPracticePool();
