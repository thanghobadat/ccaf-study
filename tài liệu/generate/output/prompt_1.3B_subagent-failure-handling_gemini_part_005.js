[
  {
    "id": "d1-b03-B-009",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-09",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-009",
    "scenarioSignature": {
      "testedPrinciple": "Subagent system prompt configuration",
      "failureMode": "Subagent applies invalid evaluation rules to subtask payload",
      "rootCause": "Coordinator passes mismatched prompt template during subagent invocation payload creation",
      "requiredFix": "Bind task-specific prompt templates dynamically in coordinator dispatch payload"
    },
    "questionEN": "A financial compliance orchestrator, FinAudit-v2, routes incoming compliance review tasks to specialized subagents. During a refactoring of the dispatcher logic, the coordinator agent instantiates a tax withholding verification subagent but inadvertently injects system_prompt_template=\"KYC_VERIFICATION_V2\" (an identity verification prompt enforcing strict ID regex validation) instead of system_prompt_template=\"TAX_AUDIT_V1\" (a tax calculation verification prompt). Consequently, the subagent evaluates tax withholding entries using identity document rules, rejecting 94% of valid filings with ERR_INVALID_ID_FORMAT. Which architectural root cause and remediation best address this subagent failure?",
    "question": "[d1-b03-B-009] Một hệ thống tuân thủ tài chính FinAudit-v2 sử dụng bộ điều phối (coordinator) để phân loại và xử lý các hồ sơ tuân thủ. Trong quá trình tái cấu trúc logic dispatch, bộ điều phối khởi tạo một subagent kiểm tra thuế nhưng vô tình nạp system_prompt_template=\"KYC_VERIFICATION_V2\" (mẫu xác thực danh tính với quy tắc kiểm tra regex ID nghiêm ngặt) thay vì system_prompt_template=\"TAX_AUDIT_V1\" (mẫu kiểm tra tính toán thuế). Kết quả là subagent áp dụng các quy tắc giấy tờ danh tính vào hồ sơ khấu trừ thuế, từ chối 94% hồ sơ hợp lệ với lỗi ERR_INVALID_ID_FORMAT. Nguyên nhân kiến trúc cốt lõi và giải pháp khắc phục nào sau đây là chính xác nhất?",
    "optionsEN": [
      "A. The coordinator passed an incorrect system prompt template (KYC_VERIFICATION_V2 instead of TAX_AUDIT_V1) in the subagent payload; update dispatch logic to bind task-specific prompt templates dynamically based on subtask type.",
      "B. The subagent model parameter temperature was set to 0.0, causing overly rigid rule execution; increase temperature to 0.7 so the model dynamically adapts to tax log structures.",
      "C. The subagent failed because it lacked authorization to query the external tax database; add read access for tax_records_db into the subagent's allowedTools manifest.",
      "D. The coordinator passed uncompressed conversation history from prior KYC audits; clear the coordinator session transcript before dispatching the tax audit subagent."
    ],
    "options": [
      "A. Bộ điều phối đã truyền sai mẫu prompt hệ thống (KYC_VERIFICATION_V2 thay vì TAX_AUDIT_V1) trong payload khởi tạo subagent; cần cập nhật logic dispatch để liên kết động mẫu prompt tương ứng với từng loại subtask.",
      "B. Tham số temperature của subagent bị đặt thành 0.0 dẫn đến việc thực thi quy tắc quá cứng nhắc; cần tăng temperature lên 0.7 để mô hình tự điều chỉnh theo cấu trúc nhật ký thuế.",
      "C. Subagent thất bại do thiếu quyền truy cập cơ sở dữ liệu kiểm tra thuế ngoài; cần bổ sung quyền đọc tax_records_db vào danh sách allowedTools của subagent.",
      "D. Bộ điều phối đã truyền lịch sử hội thoại chưa nén của các phiên kiểm tra KYC trước đó; cần xóa bộ nhớ đệm hội thoại của coordinator trước khi gọi subagent kiểm tra thuế."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct: The root cause is prompt template misconfiguration during subagent instantiation (KYC_VERIFICATION_V2 instead of TAX_AUDIT_V1), which forces the subagent to evaluate tax records against identity validation rules; fixing the dispatcher payload ensures proper instruction binding.",
      "Option B is incorrect: Increasing model temperature will not fix an incorrect system prompt persona/instructions and will introduce non-deterministic hallucinations into compliance auditing.",
      "Option C is incorrect: The failure is driven by incorrect system instructions causing validation rule mismatches (ERR_INVALID_ID_FORMAT), not missing database read permissions in allowedTools.",
      "Option D is incorrect: While context pollution can degrade performance, the specific failure mechanism here is an explicit system prompt template mismatch injected into the subagent's task configuration."
    ],
    "rationale": "The scenario describes a coordinator passing a mismatched system prompt template (KYC_VERIFICATION_V2) when spawning a tax audit subagent. Because a subagent's behavior is dictated by its system prompt, passing instructions from a different domain causes it to apply irrelevant validation logic (identity format checks on tax numbers). The correct architectural fix is ensuring the coordinator dynamically binds the correct prompt template (TAX_AUDIT_V1) for the assigned subtask.",
    "explanation": "Phân tích chi tiết từng phương án:\n- Phương án A (Đúng): Nguyên nhân trực tiếp là bộ điều phối đã nạp nhầm system_prompt_template của quy trình KYC cho subagent kiểm tra thuế. Điều này khiến subagent thực thi sai tập quy tắc chỉ dẫn hệ thống. Giải pháp đúng là sửa logic dispatch để ánh xạ đúng template prompt tương ứng với loại công việc.\n- Phương án B (Sai): Tăng temperature không giải quyết được việc subagent đang nhận sai chỉ dẫn hệ thống, đồng thời còn gây ra tính không ổn định trong quy trình kiểm toán.\n- Phương án C (Sai): Lỗi ERR_INVALID_ID_FORMAT phát sinh do quy tắc validation trong prompt hệ thống bị sai, không phải do thiếu quyền truy cập công cụ hay cơ sở dữ liệu tax_records_db.\n- Phương án D (Sai): Nguyên nhân không phải do nhiễu ngữ cảnh từ lịch sử hội thoại (context overload), mà do payload khởi tạo subagent chỉ định sai system_prompt_template.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  },
  {
    "id": "d1-b03-B-010",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.3 subagent-invocation-context / angle-10",
    "difficulty": "application",
    "scenarioId": "g-d1-b03-B-010",
    "scenarioSignature": {
      "testedPrinciple": "Subagent invocation input completeness",
      "failureMode": "Subagent generates hallucinated summary relying solely on parametric knowledge",
      "rootCause": "Coordinator omits required source document content payload in Task tool call",
      "requiredFix": "Pass explicit target document content or document reference ID in Task tool input payload"
    },
    "questionEN": "In an enterprise document processing system, ReportGen-Orchestrator, a coordinator agent spawns a summarization subagent to condense 100-page quarterly financial filings. The coordinator executes Task(subagent_type=\"summarizer\", instruction=\"Generate a 3-paragraph executive summary highlighting revenue growth and risk factors\"), but omits the document_content parameter from the input payload. The subagent returns a convincing executive summary containing fabricated financial metrics (\"revenue increased by 14.2% driven by cloud growth\"). What is the technical root cause of this hallucinated output, and how should the subagent invocation be rectified?",
    "question": "[d1-b03-B-010] Trong hệ thống xử lý tài liệu doanh nghiệp ReportGen-Orchestrator, bộ điều phối (coordinator) có nhiệm vụ gọi subagent tóm tắt để xử lý các báo cáo tài chính quý dài 100 trang. Bộ điều phối đã thực thi lệnh Task(subagent_type=\"summarizer\", instruction=\"Tóm tắt 3 đoạn về tăng trưởng doanh thu và yếu tố rủi ro\") nhưng bỏ quên việc truyền dữ liệu vào trường document_content trong payload đầu vào. Subagent trả về một bản tóm tắt có vẻ rất thuyết phục nhưng chứa các số liệu thêu dệt (\"doanh thu tăng 14.2% nhờ mảng cloud\"). Nguyên nhân kỹ thuật cốt lõi của hiện tượng hallucination này là gì và lệnh gọi subagent cần được điều chỉnh như thế nào?",
    "optionsEN": [
      "A. The summarization subagent lacked filesystem write access; grant WriteFile in allowedTools so the subagent can output its analysis.",
      "B. The coordinator omitted source document content (document_content) from the subagent's Task input parameters; update the invocation payload to explicitly pass document text or a document ID reference.",
      "C. The subagent suffered context window overflow from receiving an uncompressed 100-page document; slice document text into 500-token chunks prior to subagent delegation.",
      "D. The coordinator launched the summarization subagent before document ingestion completed; convert execution flow from parallel to sequential."
    ],
    "options": [
      "A. Subagent tóm tắt thiếu quyền ghi vào hệ thống tập tin; bổ sung công cụ WriteFile vào danh sách allowedTools của subagent để ghi kết quả phân tích.",
      "B. Bộ điều phối đã bỏ sót nội dung tài liệu nguồn (document_content) trong tham số đầu vào của lệnh Task; cần cập nhật payload để truyền trực tiếp nội dung văn bản hoặc ID tham chiếu tài liệu cho subagent.",
      "C. Subagent bị tràn cửa sổ ngữ cảnh (context overflow) do nhận toàn bộ văn bản 100 trang chưa nén; cần chia nhỏ tài liệu thành các đoạn 500 token trước khi chuyển giao cho subagent.",
      "D. Bộ điều phối đã kích hoạt subagent tóm tắt song song trước khi quá trình thu thập tài liệu hoàn tất; chuyển đổi mô hình thực thi từ song song sang tuần tự."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect: Adding WriteFile to allowedTools enables file persistence but does not supply the missing source document text needed for factual summarization.",
      "Option B is correct: The subagent hallucinated because the coordinator omitted document_content from the Task input, forcing the model to generate content from generic parametric memory; supplying the source document payload rectifies the issue.",
      "Option C is incorrect: The problem is the complete absence of source text in the subagent payload, not context window overflow or chunking issues.",
      "Option D is incorrect: While dependency ordering is critical in multi-agent workflows, the root cause specified is a missing input parameter (document_content) in the coordinator's subagent tool invocation."
    ],
    "rationale": "When a coordinator spawns an isolated subagent for document processing, the subagent only receives what is explicitly passed in its Task input payload. By omitting document_content, the summarizer subagent receives instructions without source text. LLMs given a task without input context will often hallucinate plausible output based on their training parameters. Explicitly including the source document text or reference ID in the Task call ensures ground-truth context is available.",
    "explanation": "Phân tích chi tiết từng phương án:\n- Phương án A (Sai): Cấp quyền WriteFile trong allowedTools chỉ cho phép subagent ghi file ra đĩa, hoàn toàn không giải quyết được việc thiếu dữ liệu văn bản đầu vào để tóm tắt.\n- Phương án B (Đúng): Subagent sinh ra thông tin ảo (hallucination) do bộ điều phối bỏ quên tham số document_content trong lệnh Task. Subagent chỉ nhận được yêu cầu tóm tắt mà không có văn bản nguồn, dẫn đến việc tự bịa ra thông tin dựa trên tri thức có sẵn. Cần truyền văn bản nguồn hoặc ID tham chiếu tài liệu trong payload gọi subagent.\n- Phương án C (Sai): Lỗi không đến từ việc vượt quá context window hay tài liệu chưa chia nhỏ, mà do dữ liệu nguồn bị bỏ trống hoàn toàn.\n- Phương án D (Sai): Mặc dù thứ tự thực thi rất quan trọng, nhưng trong kịch bản này lỗi trực tiếp được xác định là coordinator quên nạp tham số dữ liệu nguồn vào payload của công cụ Task.",
    "sources": [
      {
        "label": "Lesson 1.3: Subagent Invocation",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-3-subagent-invocation-context"
      }
    ]
  }
]