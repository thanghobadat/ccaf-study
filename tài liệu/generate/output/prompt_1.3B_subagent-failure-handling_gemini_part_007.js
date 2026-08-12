[
  {
    "id": "d1-b03-B-013",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-13",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-013",
    "scenarioSignature": {
      "testedPrinciple": "Subagent context payload minimization",
      "failureMode": "High token latency and context window exhaustion from bloated payload forwarding",
      "rootCause": "Passing complete raw subagent JSON output directly to downstream subagent context",
      "requiredFix": "Extract only necessary target fields from upstream JSON prior to subagent invocation"
    },
    "questionEN": "An enterprise procurement analysis system, ProcureTrack-v3, uses a multi-subagent orchestration architecture. A supplier audit subagent generates a 200KB structured JSON result containing thousands of raw telemetry logs, compliance histories, and line items. The coordinator forwards this raw 200KB JSON payload directly into the prompt context of a downstream RiskAssessmentSubagent. Consequently, the downstream subagent experiences high token latency (15s), context window exhaustion, and misses critical sanction warnings buried in the payload. What architectural adjustment should the coordinator implement before invoking the downstream subagent?",
    "question": "[d1-b03-B-013] Nền tảng phân tích mua sắm doanh nghiệp ProcureTrack-v3 sử dụng hệ thống điều phối đa subagent. Subagent kiểm toán nhà cung cấp tạo ra một JSON phản hồi 200KB chứa hàng ngàn nhật ký đo kiểm, lịch sử tuân thủ và dòng hóa đơn. Coordinator truyền trực tiếp JSON 200KB thô này vào prompt payload của RiskAssessmentSubagent tiếp theo. Kết quả là subagent hạ nguồn gặp hiện tượng vượt quá giới hạn ngữ cảnh, độ trễ token tăng cao (15 giây) và thường xuyên bỏ sót các cảnh báo tuân thủ quan trọng. Thay đổi kiến trúc nào coordinator nên thực hiện trước khi gọi subagent hạ nguồn?",
    "optionsEN": [
      "A. Parse the 200KB JSON payload in the coordinator and extract only the 3 essential fields (vendor_id, risk_score, sanction_flag) to include in the downstream subagent's prompt context.",
      "B. Wrap the 200KB JSON string inside a base64 encoded block within the prompt payload to compress token length before passing it to RiskAssessmentSubagent.",
      "C. Convert the subagent orchestration into an asynchronous polling model where RiskAssessmentSubagent directly queries the coordinator's internal database via SQL.",
      "D. Pass the raw 200KB JSON object directly to RiskAssessmentSubagent, but increase the model's max output tokens parameter from 1024 to 4096 to prevent truncation."
    ],
    "options": [
      "A. Phân tích payload JSON 200KB tại coordinator và chỉ trích xuất 3 trường thiết yếu (vendor_id, risk_score, sanction_flag) để đưa vào prompt context của subagent hạ nguồn.",
      "B. Mã hóa chuỗi JSON 200KB thành khối base64 trong prompt để nén độ dài token trước khi truyền cho RiskAssessmentSubagent.",
      "C. Chuyển đổi mô hình điều phối subagent sang cơ chế bất đồng bộ nơi RiskAssessmentSubagent tự truy vấn cơ sở dữ liệu của coordinator qua SQL.",
      "D. Truyền trực tiếp đối tượng JSON 200KB thô cho RiskAssessmentSubagent nhưng tăng tham số max output tokens của mô hình từ 1024 lên 4096 để tránh cắt gọt."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A (Correct): Extracting only the three relevant fields removes context noise, reduces latency, and guarantees the downstream subagent receives precise data.",
      "Option B is incorrect: Base64 encoding does not reduce token count and makes text unreadable to LLM context.",
      "Option C is incorrect: Subagents should be invoked with isolated context payloads via tools, not directly access the coordinator database.",
      "Option D is incorrect: Increasing output tokens does not reduce input context overload or mitigate latency and attention degradation caused by a 200KB payload."
    ],
    "rationale": "Passing raw 200KB JSON outputs into downstream subagents overloads context and degrades LLM focus. The coordinator must filter and extract only the relevant target fields required by the downstream subagent.",
    "explanation": "Trong kiến trúc điều phối subagent, coordinator đóng vai trò làm bộ lọc ngữ cảnh (context filter). Khi một subagent tạo ra phản hồi lớn (như JSON 200KB chứa hàng ngàn dòng nhật ký), coordinator không nên chuyển tiếp toàn bộ payload thô sang subagent tiếp theo. Việc truyền ngữ cảnh dư thừa làm tăng độ trễ token, tăng chi phí và giảm độ chính xác do nhiễu thông tin (attention degradation). Giải pháp chuẩn kiến trúc là coordinator chỉ trích xuất đúng 3 trường dữ liệu cần thiết (vendor_id, risk_score, sanction_flag) để truyền cho RiskAssessmentSubagent.\n\n- Phương án A đúng vì trích xuất đúng các trường cần thiết, tối ưu hóa ngữ cảnh và độ trễ.\n- Phương án B sai vì mã hóa Base64 không làm giảm số lượng token và khiến mô hình LLM không hiểu được ngữ cảnh.\n- Phương án C sai vì phá vỡ nguyên tắc đóng gói ngữ cảnh subagent thông qua tham số công cụ.\n- Phương án D sai vì tăng max output tokens chỉ mở rộng giới hạn đầu ra, không giải quyết được vấn đề quá tải input context.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-014",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-14",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-014",
    "questionEN": "An enterprise multi-region infrastructure deployment tool, CloudDeploy-v4, uses a three-level hierarchical orchestration model: Top-Level MasterDeploymentCoordinator → Level-2 RegionCoordinator (e.g., us-east-1) → Level-3 ResourceWorker (e.g., K8sClusterWorker). During a deployment, K8sClusterWorker encounters an unrecoverable APIQuotaExceededException failure. However, RegionCoordinator swallows the exception and returns a generic success JSON payload ({\"status\": \"completed\", \"details\": \"processed\"}) to MasterDeploymentCoordinator. Consequently, MasterDeploymentCoordinator triggers global DNS traffic routing to a failed cluster, leading to production downtime. How should failure reporting be structured across this three-level hierarchy?",
    "question": "[d1-b03-B-014] Công cụ triển khai hạ tầng đa vùng CloudDeploy-v4 sử dụng mô hình điều phối phân cấp 3 cấp: Top Level MasterDeploymentCoordinator → Level 2 RegionCoordinator (ví dụ: us-east-1) → Level 3 ResourceWorker (ví dụ: K8sClusterWorker). Trong quá trình triển khai, K8sClusterWorker gặp lỗi không thể phục hồi APIQuotaExceededException. Tuy nhiên, RegionCoordinator lại nuốt ngoại lệ này và trả về JSON thành công chung chung {\"status\": \"completed\", \"details\": \"processed\"} cho MasterDeploymentCoordinator. Kết quả là MasterDeploymentCoordinator tiếp tục chuyển hướng DNS toàn cầu sang cụm bị lỗi, gây gián đoạn hệ thống. Báo cáo lỗi nên được cấu trúc như thế nào qua mô hình 3 cấp này?",
    "optionsEN": [
      "A. Configure MasterDeploymentCoordinator to bypass RegionCoordinator and execute periodic status polling directly against ResourceWorker instances via RPC.",
      "B. Require RegionCoordinator to capture low-level worker exceptions, wrap them into a standardized structured error payload ({\"status\": \"failed\", \"worker_id\": \"k8s-us-east-01\", \"error\": \"APIQuotaExceededException\"}), and bubble it up to MasterDeploymentCoordinator to halt downstream steps.",
      "C. Modify ResourceWorker to automatically trigger global rollback commands directly on MasterDeploymentCoordinator bypassing the intermediate domain level.",
      "D. Implement an exponential backoff retry loop inside K8sClusterWorker that retries indefinitely until the API quota resets without notifying parent coordinators."
    ],
    "options": [
      "A. Cấu hình MasterDeploymentCoordinator bỏ qua RegionCoordinator và thực hiện thăm dò trạng thái định kỳ trực tiếp tới các ResourceWorker qua RPC.",
      "B. Yêu cầu RegionCoordinator bắt các ngoại lệ cấp thấp của worker, đóng gói thành đối tượng lỗi chuẩn hóa ({\"status\": \"failed\", \"worker_id\": \"k8s-us-east-01\", \"error\": \"APIQuotaExceededException\"}) và truyền lên cho MasterDeploymentCoordinator để dừng các bước tiếp theo.",
      "C. Sửa đổi ResourceWorker để tự động kích hoạt lệnh khôi phục (rollback) toàn cầu trực tiếp trên MasterDeploymentCoordinator bỏ qua cấp domain trung gian.",
      "D. Triển khai vòng lặp thử lại lũy thừa (exponential backoff) bên trong K8sClusterWorker để thử lại vô hạn cho đến khi hạn ngạch API được làm mới mà không thông báo cho coordinator cha."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Bypassing intermediate coordinators breaks the hierarchical encapsulation and causes coordination overhead.",
      "Option B (Correct): Capturing low-level errors and propagating structured failure status up the two-level hierarchy ensures the master coordinator has full visibility to halt invalid workflows.",
      "Option C is incorrect: Worker agents should not bypass their immediate domain coordinator or trigger top-level global actions directly.",
      "Option D is incorrect: Infinite retries block execution indefinitely without surfacing critical quota failures to top-level decision makers."
    ],
    "rationale": "In hierarchical multi-level orchestration, exceptions occurring at worker levels must bubble up through intermediate domain coordinators to the master coordinator as structured failure payloads so global decision-making can stop or rollback.",
    "explanation": "Trong mô hình điều phối phân cấp 3 cấp (Master Coordinator → Domain Coordinator → Worker Subagent), việc giấu lỗi (error swallowing) ở cấp trung gian sẽ ngăn cản cấp điều phối cao nhất đưa ra quyết định chính xác. Khi một worker ở Level 3 gặp sự cố nghiêm trọng không thể tự phục hồi (APIQuotaExceededException), cấp trung gian Level 2 (RegionCoordinator) phải bắt ngoại lệ đó, chuyển đổi thành một đối tượng lỗi có cấu trúc chuẩn (status: failed, chi tiết lỗi) và truyền ngược lại lên 2 cấp cho MasterDeploymentCoordinator ở Level 1 để dừng ngay quy trình chuyển hướng lưu lượng DNS toàn cầu.\\n\\n- Phương án A sai vì việc bỏ qua cấp trung gian vi phạm nguyên tắc đóng gói mô hình phân cấp.\\n- Phương án B đúng vì đảm bảo lỗi được đóng gói chuẩn hóa và lan truyền ngược đúng phân cấp 2 tầng lên đến cấp master.\\n- Phương án C sai vì worker cấp 3 không được tự ý gọi trực tiếp lên master coordinator để kích hoạt các hành động toàn cầu.\\n- Phương án D sai vì thử lại vô tận gây treo hệ thống và không thông báo lỗi cho các cấp quản lý cha.",
    "scenarioSignature": {
      "testedPrinciple": "Hierarchical subagent error propagation",
      "failureMode": "Top-level coordinator executing downstream actions on failed infrastructure due to error swallowing",
      "rootCause": "Intermediate domain coordinator catching low-level worker exceptions and returning success status",
      "requiredFix": "Propagate structured failure payload across intermediate coordinator levels up to master coordinator"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]