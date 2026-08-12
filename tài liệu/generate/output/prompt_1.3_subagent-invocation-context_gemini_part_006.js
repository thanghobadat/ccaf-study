[
  {
    "id": "d1-b03-new-011",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-011",
    "scenarioSignature": {
      "testedPrinciple": "least-privilege tool scoping for read-only subagents",
      "failureMode": "unauthorized database record modification during auditing",
      "rootCause": "granting database write privileges to a read-only compliance subagent",
      "requiredFix": "restrict subagent allowed tools to read-only database interfaces"
    },
    "questionEN": "In an automated financial auditing platform named FinReg-Auditor, the coordinator invokes a specialized pci_compliance_checker subagent via the Task tool to scan transaction logs for regulatory compliance. The subagent definition grants access to read_database, write_database, and format_report. During an automated run, the subagent hallucinated a remediation routine and executed write_database to alter transaction status flags from PENDING to FLAGGED_EXPIRED, corrupting audit logs. What architectural change prevents this unauthorized record modification?",
    "question": "[d1-b03-new-011] Trong nền tảng kiểm toán tài chính tự động có tên FinReg-Auditor, điều phối viên gọi subagent chuyên biệt pci_compliance_checker thông qua tool Task để quét nhật ký giao dịch nhằm kiểm tra việc tuân thủ quy định. Định nghĩa subagent cấp quyền truy cập vào read_database, write_database và format_report. Trong một đợt chạy tự động, subagent bị ảo giác về một quy trình khắc phục và đã thực thi write_database để sửa đổi cờ trạng thái giao dịch từ PENDING thành FLAGGED_EXPIRED, làm sai lệch nhật ký kiểm toán. Thay đổi kiến trúc nào ngăn chặn sự sửa đổi bản ghi trái phép này?",
    "optionsEN": [
      "A. Update the pci_compliance_checker system prompt with a strict negative constraint forbidding write queries.",
      "B. Add a post-execution database rollback listener in the coordinator agent to revert mutations made by subagents.",
      "C. Omit write_database from the subagent's allowedTools scope when invoking it via the Task tool, exposing only read_database and format_report.",
      "D. Reconfigure the compliance subagent to communicate directly with a database manager agent over a peer-to-peer bus."
    ],
    "options": [
      "A. Cập nhật system prompt của pci_compliance_checker với ràng buộc phủ định nghiêm ngặt cấm các truy vấn ghi.",
      "B. Thêm một bộ lắng nghe khôi phục (rollback) cơ sở dữ liệu sau thực thi trong agent điều phối viên để hoàn tác các biến đổi do subagent thực hiện.",
      "C. Loại bỏ write_database khỏi phạm vi allowedTools của subagent khi gọi nó thông qua tool Task, chỉ cung cấp read_database và format_report.",
      "D. Cấu hình lại subagent kiểm toán để giao tiếp trực tiếp với agent quản lý cơ sở dữ liệu qua bus ngang hàng."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect because relying on system prompt instructions for security boundaries is non-deterministic and fails to prevent accidental tool execution when models hallucinate.",
      "Option B is incorrect because post-execution transaction rollbacks create database locks, race conditions, and side effects instead of proactively preventing unauthorized write access.",
      "Option C is correct because restricting the subagent's allowedTools parameter to read-only database tools enforces least-privilege security boundaries and structurally prevents unauthorized record modifications.",
      "Option D is incorrect because peer-to-peer inter-subagent communication violates hub-and-spoke design principles and fails to enforce centralized tool permission boundaries."
    ],
    "rationale": "Subagents must be scoped with the minimum tools necessary for their task. Granting write capabilities to a read-only compliance subagent creates severe security risks. Restricting the subagent's allowedTools array in the Task tool invocation structurally prevents write operations.",
    "explanation": "Lựa chọn A sai vì việc bổ sung hướng dẫn cấm trong system prompt mang tính không chắc chắn (non-deterministic) và không ngăn chặn được mô hình gọi tool khi bị ảo giác.\n\nLựa chọn B sai vì việc roll back giao dịch sau khi đã thực thi tạo ra nguy cơ race condition, khóa cơ sở dữ liệu và không chủ động ngăn chặn được hành vi ghi trái phép ngay từ đầu.\n\nLựa chọn C là đáp án đúng vì áp dụng nguyên tắc đặc quyền tối thiểu (least privilege) bằng cách giới hạn danh sách allowedTools của subagent chỉ chứa các tool đọc (read_database, format_report), từ đó ngăn chặn về mặt cấu trúc khả năng ghi dữ liệu.\n\nLựa chọn D sai vì việc giao tiếp ngang hàng giữa các subagent vi phạm kiến trúc Hub-and-Spoke và làm mất khả năng kiểm soát phân quyền công cụ từ điều phối viên trung tâm.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-new-012",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-new-012",
    "questionEN": "An enterprise document platform named DocVault-Indexer deploys an archive_indexer subagent to scan legacy storage buckets, extract metadata, and index PDF contents. The subagent is initialized with allowedTools: [\"read_file\", \"list_directory\", \"delete_file\"]. During a large batch run, after encountering permission errors on corrupt files, the subagent invoked delete_file to remove the unreadable files, resulting in the unintended loss of 1,200 original documents. How should the system architecture be modified to guarantee data safety during indexing?",
    "question": "[d1-b03-new-012] Một nền tảng tài liệu doanh nghiệp có tên DocVault-Indexer triển khai một subagent archive_indexer để quét các storage bucket cũ, trích xuất metadata và đánh chỉ mục nội dung PDF. Subagent được khởi tạo với allowedTools: [\"read_file\", \"list_directory\", \"delete_file\"]. Trong một đợt chạy hàng loạt lớn, sau khi gặp lỗi phân quyền trên các file hỏng, subagent đã gọi delete_file để xóa các file không đọc được, dẫn đến việc mất mát ngoài ý muốn 1,200 tài liệu gốc. Kiến trúc hệ thống nên được sửa đổi như thế nào để đảm bảo an toàn dữ liệu trong quá trình đánh chỉ mục?",
    "optionsEN": [
      "A. Expand the context window of archive_indexer to prevent memory exhaustion from triggering error handling routines.",
      "B. Implement a log-monitoring guardrail in the coordinator to intercept and cancel tool execution if delete_file is emitted in stdout.",
      "C. Configure archive_indexer to request a human approval token via a global state variable prior to executing any file system tool.",
      "D. Remove delete_file from the subagent's allowedTools specification, scoping the environment strictly to read_file and list_directory."
    ],
    "options": [
      "A. Mở rộng cửa sổ ngữ cảnh của archive_indexer để tránh tình trạng cạn kiệt bộ nhớ kích hoạt các quy trình xử lý lỗi.",
      "B. Triển khai guardrail giám sát log trong điều phối viên để chặn và hủy thực thi tool nếu delete_file xuất hiện trên stdout.",
      "C. Cấu hình archive_indexer để yêu cầu token phê duyệt từ con người thông qua biến trạng thái toàn cục trước khi thực thi bất kỳ tool hệ thống file nào.",
      "D. Xóa delete_file khỏi thông số allowedTools của subagent, giới hạn môi trường chỉ nghiêm ngặt gồm read_file và list_directory."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect because increasing context size does not eliminate security vulnerabilities caused by over-provisioned destructive tools.",
      "Option B is incorrect because reactive output monitoring is non-deterministic and cannot reliably block tool execution prior to file deletion.",
      "Option C is incorrect because forcing global state confirmation tokens violates subagent autonomy and fails to enforce tool-level access control.",
      "Option D is correct because removing delete_file from the subagent's allowedTools array enforces least-privilege tool isolation, eliminating safety risks in read-only tasks."
    ],
    "rationale": "A read-only archival subagent only requires read access to files and directories. Providing destructive tools like delete_file creates severe data security risks. Restricting allowedTools to read-only capabilities ensures safety by preventing file deletion regardless of subagent reasoning errors or hallucinations.",
    "explanation": "Lựa chọn A sai vì việc tăng dung lượng bộ nhớ/ngữ cảnh không giải quyết được căn nguyên an ninh của việc cấp thừa công cụ có tính phá hủy.\\n\\nLựa chọn B sai vì việc giám sát log để chặn tool mang tính thụ động, bất đồng bộ và không thể đảm bảo ngăn chặn được lệnh xóa trước khi nó tác động lên file system.\\n\\nLựa chọn C sai vì việc bắt buộc xác nhận qua biến toàn cục làm phá vỡ tính tự động của subagent và không đúng với nguyên tắc phân quyền cấp tool.\\n\\nLựa chọn D là đáp án đúng vì tuân thủ nguyên tắc giới hạn phạm vi công cụ (tool scoping) cho các tác vụ chỉ đọc. Việc xóa delete_file khỏi allowedTools sẽ loại bỏ hoàn toàn rủi ro mất mát dữ liệu do ảo giác hoặc lỗi xử lý của subagent.",
    "scenarioSignature": {
      "testedPrinciple": "strict tool authorization boundaries for background archive workers",
      "failureMode": "catastrophic data loss during read-only file archival tasks",
      "rootCause": "over-provisioning file deletion tools to a read-only subagent",
      "requiredFix": "remove destructive file system tools from subagent scope"
    },
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation and Context Passing",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]