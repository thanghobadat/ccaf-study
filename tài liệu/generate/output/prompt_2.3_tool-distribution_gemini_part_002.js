[
  {
    "id": "d2-b04-2.3-003",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.3 tool-distribution / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.3-003",
    "scenarioSignature": {
      "testedPrinciple": "role-scoped tool distribution to prevent tool explosion",
      "failureMode": "high tool selection error rate due to bloated tool context",
      "rootCause": "all subagents initialized with complete global toolset",
      "requiredFix": "bind minimal role-specific tool subsets to subagent clients"
    },
    "questionEN": "An automated CloudOps orchestrator platform utilizes 5 specialized AI subagents (Provisioning, Database, IAM, Monitoring, and Storage). During setup, all 5 subagents were registered with the entire system catalog of 40 MCP tools (including ec2_create_instance, rds_restore_db_cluster, iam_attach_role_policy, and s3_put_bucket_policy). Metrics show that during multi-step provisioning workflows, subagents choose a contextually inappropriate tool 23% of the time. What architectural modification directly resolves this high tool selection error rate?",
    "question": "[d2-b04-2.3-003] Một nền tảng tự động hóa CloudOps sử dụng 5 subagent AI chuyên biệt (Provisioning, Database, IAM, Monitoring và Storage). Trong quá trình cấu hình, cả 5 subagent đều được đăng ký với toàn bộ danh mục 40 công cụ MCP của hệ thống (bao gồm ec2_create_instance, rds_restore_db_cluster, iam_attach_role_policy và s3_put_bucket_policy). Dữ liệu giám sát cho thấy trong các quy trình cung cấp tài nguyên đa bước, các subagent chọn sai công cụ không phù hợp với ngữ cảnh trong 23% số lần gọi. Thay đổi kiến trúc nào trực tiếp khắc phục tỷ lệ lỗi lựa chọn công cụ cao này?",
    "optionsEN": [
      "A. Compress the tool JSON schema descriptions and enforce strict token limits on the system prompt context before passing tools to subagents.",
      "B. Wrap all subagent tool calls in an automated retry handler that catches invalid_tool_choice exceptions and retries with exponential backoff.",
      "C. Partition the global 40 MCP tools into role-scoped subsets and register only the relevant tools with each subagent's execution context.",
      "D. Route all subagent tool execution requests through a single meta-tool that parses the target function name and redirects parameter payloads."
    ],
    "options": [
      "A. Nén mô tả JSON schema của công cụ và áp dụng giới hạn token nghiêm ngặt đối với context prompt hệ thống trước khi truyền công cụ cho các subagent.",
      "B. Bọc tất cả các lời gọi công cụ của subagent trong handler tự động thử lại để bắt ngoại lệ invalid_tool_choice và thử lại với bồi hoàn lũy thừa.",
      "C. Phân chia 40 công cụ MCP toàn cục thành các tập hợp con theo phạm vi vai trò và chỉ đăng ký các công cụ phù hợp với ngữ cảnh thực thi của từng subagent.",
      "D. Định tuyến tất cả yêu cầu thực thi công cụ của subagent qua một meta-tool đơn lẻ để phân tích tên hàm mục tiêu và chuyển tiếp payload tham số."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Truncating system prompt context or compressing docstrings does not remove irrelevant tools from the subagent schema array, leaving the model susceptible to choosing wrong function calls.",
      "Option B is incorrect: Adding execution retries on invalid_tool_choice errors consumes extra latency and API tokens without resolving the root cause of tool distraction from a 40-tool catalog.",
      "Option C is correct: Partitioning tools into role-scoped subsets reduces the choices per agent from 40 to only relevant tools (e.g., 5-8 tools), enforcing the Principle of Least Privilege, eliminating tool explosion, and drastically reducing mis-selection rates.",
      "Option D is incorrect: Adding a middleman meta-tool introduces extra tool layer complexity and latent loops without preventing the subagents from initially selecting invalid tools from their oversized schema set."
    ],
    "rationale": "Providing all 40 MCP tools to every subagent causes 'tool explosion', overloading the model's context with irrelevant functions and causing a 23% error rate. Applying the Principle of Least Privilege by scoping tools strictly to each subagent's specific domain (e.g., only DB tools for Database Agent) eliminates choice ambiguity and resolves the selection errors.",
    "explanation": "Lỗi 23% chọn sai công cụ xuất phát từ hiện tượng bùng nổ công cụ (tool explosion) khi cả 5 subagent đều nhận tất cả 40 công cụ MCP. Theo nguyên tắc đặc quyền tối thiểu (Principle of Least Privilege), mỗi subagent chỉ nên nhận tập hợp con các công cụ cần thiết cho vai trò của nó.\n\n- Option A sai: Việc nén mô tả hoặc giới hạn token không loại bỏ được các schema công cụ thừa khỏi ngữ cảnh của mô hình, do đó mô hình vẫn bị nhầm lẫn khi lựa chọn.\n- Option B sai: Cơ chế thử lại tự động (retry) chỉ tốn thêm chi phí token và độ trễ mà không giải quyết được nguyên nhân gốc rễ là danh mục công cụ quá tải.\n- Option C đúng: Phân chia 40 công cụ thành các tập hợp nhỏ theo phạm vi vai trò (ví dụ: subagent IAM chỉ nhận các công cụ IAM) sẽ loại bỏ sự mơ hồ, giúp mô hình chọn chính xác công cụ.\n- Option D sai: Thêm một meta-tool trung gian làm tăng độ phức tạp kiến trúc và không ngăn được việc subagent ban đầu chọn sai tên hàm.",
    "sources": [
      {
        "label": "Lesson 2.3: Tool Distribution",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-3-tool-distribution"
      }
    ]
  },
  {
    "id": "d2-b04-2.3-004",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.3 tool-distribution / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d2-b04-2.3-004",
    "questionEN": "A medical data processing system uses an ingestion subagent (patient_ingestion_agent) to process incoming record updates. The subagent's tool manifest includes both create_patient_record(patient_id: string, metadata: object) and delete_patient_record(patient_id: string, hard_delete: boolean). During a batch import failure retry, the subagent hallucinated a cleanup step and invoked delete_patient_record(patient_id: \"P- 88421\", hard_delete=true), permanently purging active production records. Which architectural tool distribution change prevents this catastrophic data loss?",
    "question": "[d2-b04-2.3-004] Một hệ thống xử lý dữ liệu y tế sử dụng một subagent nạp dữ liệu (patient_ingestion_agent) để xử lý các cập nhật hồ sơ đến. Danh mục công cụ của subagent bao gồm cả create_patient_record(patient_id: string, metadata: object) và delete_patient_record(patient_id: string, hard_delete: boolean). Trong quá trình xử lý lại một đợt nhập thất bại, subagent đã bị ảo giác về một bước dọn dẹp và gọi delete_patient_record(patient_id: \"P - 88421\", hard_delete=true), xóa vĩnh viễn dữ liệu bệnh nhân đang hoạt động trên môi trường production. Thay đổi kiến trúc phân phối công cụ nào sẽ ngăn chặn sự cố mất dữ liệu nghiêm trọng này?",
    "optionsEN": [
      "A. Insert a system prompt instruction directing the subagent to strictly avoid calling deletion tools unless explicit user approval is present in the context.",
      "B. Add a required boolean parameter confirm_delete: true to delete_patient_record so the tool schema mandates explicit intent.",
      "C. Set the subagent LLM inference temperature to 0.0 to eliminate non-deterministic tool selection during batch error retries.",
      "D. Remove delete_patient_record from the ingestion subagent's tool manifest and isolate destructive deletion tools to a separate administrative subagent."
    ],
    "options": [
      "A. Chèn hướng dẫn system prompt yêu cầu subagent nghiêm ngặt tránh gọi các công cụ xóa trừ khi có sự phê duyệt rõ ràng của người dùng trong context.",
      "B. Thêm một tham số boolean bắt buộc confirm_delete: true vào delete_patient_record để schema công cụ yêu cầu xác nhận ý định rõ ràng.",
      "C. Thiết lập nhiệt độ suy luận LLM của subagent về 0.0 để loại bỏ việc chọn công cụ không định hình trong quá trình thử lại lỗi đợt.",
      "D. Tách delete_patient_record khỏi danh mục công cụ của subagent nạp dữ liệu và cô lập các công cụ xóa mang tính phá hủy sang một subagent quản trị riêng biệt."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Adding prompt instructions urging the model not to call delete tools relies on non-deterministic model compliance and does not eliminate the physical capability to execute destructive operations.",
      "Option B is incorrect: Adding a confirmation flag parameter to the tool schema does not prevent a hallucinating model from supplying confirm_delete: true when constructing the tool call payload.",
      "Option C is incorrect: Setting temperature to zero reduces sampling randomness but does not guarantee prevention of hallucinations or incorrect tool selection when high-risk destructive tools are exposed.",
      "Option D is correct: Enforcing the Principle of Least Privilege by stripping destructive deletion tools from the standard write/ingestion subagent's tool manifest structurally prevents hallucinated data deletion and minimizes the blast radius."
    ],
    "rationale": "Granting destructive tools (like delete_patient_record) to a routine data ingestion subagent violates the Principle of Least Privilege and expands the system's blast radius. If the ingestion agent hallucinates, it can permanently erase production data. Separating destructive write operations into a dedicated administrative agent ensures ingestion agents cannot physically execute deletes regardless of model behavior.",
    "explanation": "Cấp công cụ xóa phá hủy (delete_patient_record) cho một subagent chỉ có nhiệm vụ nạp dữ liệu là vi phạm nghiêm trọng Nguyên tắc Đặc quyền Tối thiểu (Principle of Least Privilege) và làm tăng bán kính thiệt hại (blast radius).\\n\\n- Option A sai: Hướng dẫn bằng prompt không thể đảm bảo 100% tính tuân thủ của LLM khi mô hình bị ảo giác và vẫn duy trì khả năng thực thi lệnh xóa thực tế.\\n- Option B sai: Việc thêm tham số confirm_delete: true vào schema không ngăn được mô hình khi ảo giác tự điền giá trị true vào payload.\\n- Option C sai: Nhiệt độ (temperature) bằng 0 làm giảm tính ngẫu nhiên nhưng không loại bỏ hoàn toàn khả năng mô hình suy luận sai và chọn công cụ nguy hiểm nếu công cụ đó vẫn tồn tại trong danh mục.\\n- Option D đúng: Loại bỏ công cụ xóa khỏi danh mục của subagent nạp dữ liệu và cô lập nó ở một subagent quản trị riêng biệt giúp chặn đứng nguy cơ xóa dữ liệu từ cấu trúc kiến trúc.",
    "scenarioSignature": {
      "testedPrinciple": "least privilege segregation of destructive write operations",
      "failureMode": "unintended data loss caused by agent hallucinating destructive tool call",
      "rootCause": "ingestion agent granted overly permissive destructive write tool",
      "requiredFix": "revoke destructive tool access and segregate to administrative role manifest"
    },
    "sources": [
      {
        "label": "Lesson 2.3: Tool Distribution",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-3-tool-distribution"
      }
    ]
  }
]