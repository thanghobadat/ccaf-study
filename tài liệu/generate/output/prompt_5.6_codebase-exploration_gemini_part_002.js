[
  {
    "id": "d5-b10-5.6-003",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-003",
    "questionEN": "An autonomous AI agent spent 4 hours analyzing a complex microservices repository PaymentGatewayCore across 45 sequential prompt turns to diagnose a race condition in TransactionProcessor.java. Because all intermediate findings, dependency paths, and dead-end hypotheses were stored solely in the active conversation context window, older context was truncated at turn 30. As a result, the agent lost critical structural observations recorded early in the investigation and had to re-execute grep and file read commands from scratch. How should the exploration workflow be structured to prevent context loss during extended investigations?",
    "question": "[d5-b10-5.6-003] Một AI agent tự động dành 4 giờ phân tích kho mã nguồn vi dịch vụ phức tạp PaymentGatewayCore qua 45 lượt prompt liên tiếp để chẩn đoán lỗi race condition trong TransactionProcessor.java. Do toàn bộ phát hiện trung gian, đường dẫn phụ thuộc và giả thuyết thất bại chỉ được lưu trong cửa sổ ngữ cảnh trò chuyện hiện tại, ngữ cảnh cũ hơn đã bị cắt tỉa ở lượt thứ 30. Kết quả là agent đánh mất các quan sát cấu trúc quan trọng ghi nhận ban đầu và phải thực thi lại từ đầu các lệnh grep và đọc file. Workflow khám phá nên được cấu trúc như thế nào để ngăn mất ngữ cảnh trong các cuộc điều tra kéo dài?",
    "optionsEN": [
      "A. Expand the conversation context window limit from 128k to 1M tokens so all 45 interaction turns fit into memory without truncation.",
      "B. Execute a single massive combined shell command grep -r \"TransactionProcessor\" . at the start to dump all codebase references into prompt history at once.",
      "C. Maintain a dedicated markdown scratchpad file in the repository (e.g., investigation_notes.md) to write down call graphs, target files, and verified hypotheses after each discovery turn.",
      "D. Run git diff after every file inspection turn to auto-commit temporary debug comments added into source files."
    ],
    "options": [
      "A. Tăng giới hạn cửa sổ ngữ cảnh trò chuyện từ 128k lên 1M token để tất cả 45 lượt tương tác nằm gọn trong bộ nhớ mà không bị cắt tỉa.",
      "B. Thực thi một lệnh shell kết hợp duy nhất grep -r \"TransactionProcessor\" . ngay từ đầu để xả toàn bộ tham chiếu mã nguồn vào lịch sử prompt cùng lúc.",
      "C. Duy trì một file scratchpad markdown riêng trong repository (ví dụ: investigation_notes.md) để ghi lại đồ thị gọi hàm, file mục tiêu và giả thuyết đã xác minh sau mỗi lượt phát hiện.",
      "D. Chạy git diff sau mỗi lượt kiểm tra file để tự động commit các chú thích debug tạm thời được thêm vào file nguồn."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Increasing the token window size merely postpones context saturation and increases latency and cost without eliminating the vulnerability of critical findings being lost upon context pruning.",
      "Option B is incorrect: Dumping massive unparsed grep outputs into conversation history rapidly consumes token capacity with noise and accelerates truncation.",
      "Option C is correct: Writing key discoveries, dependency graphs, and hypothesis statuses continuously to a persistent workspace file (scratchpad) ensures structural context survives prompt window truncation and avoids costly re-exploration.",
      "Option D is incorrect: Polluting production source code files with temporary debug comments creates code churn and clutter rather than an organized structural summary of investigation findings."
    ],
    "rationale": "Maintaining a dedicated scratchpad file (e.g., investigation_notes.md) in the workspace allows the agent to offload structural findings and hypothesis verification state from the volatile prompt context to persistent storage, guaranteeing continuity even when context truncation occurs.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n\\n- Đáp án A sai: Tăng kích thước cửa sổ context chỉ trì hoãn việc quá tải token chứ không giải quyết tận gốc nguy cơ mất dữ liệu khi context bị prune hoặc quá dài.\\n- Đáp án B sai: Xả toàn bộ kết quả grep thô vào lịch sử trò chuyện sẽ gây ô nhiễm context với lượng lớn thông tin nhiễu, làm tăng tốc độ cán mốc giới hạn token.\\n- Đáp án C đúng (Đáp án phân công: C): Việc liên tục ghi chép các phát hiện, đồ thị phụ thuộc và trạng thái giả thuyết vào file scratchpad trên đĩa (như investigation_notes.md) giúp thông tin bền vững ngoài bộ nhớ prompt, bảo toàn kiến thức ngay cả khi context bị cắt tỉa.\\n- Đáp án D sai: Chèn các comment debug tạm thời vào file mã nguồn gốc tạo ra rác mã nguồn và nguy cơ lỗi commit, không tạo ra được bản tóm tắt cấu trúc có hệ thống.",
    "scenarioSignature": {
      "testedPrinciple": "persistent scratchpad documentation during multi-hour investigations",
      "failureMode": "context window truncation causing loss of intermediate research findings",
      "rootCause": "relying exclusively on conversation context memory for long exploration sessions",
      "requiredFix": "write intermediate findings to dedicated workspace file continuously"
    },
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  },
  {
    "id": "d5-b10-5.6-004",
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "taskStatement": "5.6 codebase-exploration / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d5-b10-5.6-004",
    "scenarioSignature": {
      "testedPrinciple": "incremental single-file test verification during multi-file refactoring",
      "failureMode": "multiple test regressions with unidentifiable root cause files",
      "rootCause": "deferring test suite execution until after batch modifying all target files",
      "requiredFix": "execute targeted test suite after refactoring each individual file"
    },
    "questionEN": "An AI coding assistant performs a large-scale API refactoring on OrderFulfillmentService across 25 TypeScript files to update the OrderPayload interface. The agent modifies all 25 files in a single prompt execution batch before triggering npm test. When jest runs, 6 unit test failures occur across BillingModule and InventoryGateway, but because all 25 files were mutated at once, the exact file that introduced each regression is unknown, forcing a manual line-by-line diff audit. How should the agent structure its refactoring and verification loop to prevent unassigned regressions?",
    "question": "[d5-b10-5.6-004] Một AI coding assistant thực hiện refactor API diện rộng trên OrderFulfillmentService trên 25 file TypeScript để cập nhật interface OrderPayload. Agent chỉnh sửa cả 25 file trong một đợt thực thi prompt duy nhất trước khi kích hoạt npm test. Khi bộ test jest chạy, 6 unit test bị thất bại trên BillingModule và InventoryGateway, nhưng vì cả 25 file bị thay đổi cùng lúc, file chính xác gây ra từng lỗi regression không thể xác định, buộc phải kiểm tra diff thủ công từng dòng. Agent nên cấu trúc vòng lặp refactor và kiểm tra như thế nào để ngăn chặn lỗi regression không rõ nguồn gốc?",
    "optionsEN": [
      "A. Increase pytest execution timeout and re-run test suite 3 times in parallel to isolate non-deterministic test failures.",
      "B. Revert all 25 files using git reset --hard and re-apply the exact same edits in a single prompt block with verbose logging enabled.",
      "C. Disable test execution during refactoring and rely on static type checking via tsc --noEmit at the end to catch all functional regressions.",
      "D. Adopt an incremental workflow: modify one file, run relevant unit tests immediately via npm test -- , verify pass state, and commit before proceeding to the next file."
    ],
    "options": [
      "A. Tăng thời gian chờ (timeout) thực thi test và chạy lại bộ test 3 lần song song để cô lập các test thất bại không định hạn (non-deterministic).",
      "B. Revert cả 25 file bằng git reset --hard và áp dụng lại chính xác các chỉnh sửa đó trong một khối prompt duy nhất với logging chi tiết được bật.",
      "C. Tắt thực thi test trong quá trình refactor và chỉ dựa vào kiểm tra kiểu tĩnh qua tsc --noEmit ở cuối để bắt tất cả các lỗi regression chức năng.",
      "D. Áp dụng workflow tiệm tiến: chỉnh sửa một file, chạy các unit test liên quan ngay lập tức qua npm test -- , xác nhận trạng thái pass và commit trước khi chuyển sang file tiếp theo."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Retrying tests and extending timeouts does not address logic regressions introduced by multi-file code modifications.",
      "Option B is incorrect: Re-running batch modifications with verbose logs still leaves 25 mutated files simultaneously, failing to localize which edit broke which test.",
      "Option C is incorrect: Static type checking only validates interface types and syntax; it cannot detect logical edge-case failures or runtime behavior regressions.",
      "Option D is correct: Executing targeted unit tests immediately after modifying each individual file creates a tight feedback loop, isolating any regression to the exact file edit that caused it."
    ],
    "rationale": "Executing tests incrementally after modifying each single file guarantees that any failure is instantly linked to the most recent edit, eliminating ambiguity and avoiding costly multi-file debugging sessions.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\n\n- Đáp án A sai: Việc thử lại test hoặc tăng timeout không khắc phục được các lỗi logic phát sinh do việc sửa đổi đồng thời 25 file mã nguồn.\n- Đáp án B sai: Áp dụng lại toàn bộ các chỉnh sửa hàng loạt cùng lúc với bổ sung log vẫn giữ nguyên tình trạng 25 file bị biến đổi đồng thời, không thể cô lập file nào làm hỏng test nào.\n- Đáp án C sai: Kiểm tra kiểu tĩnh (static type checking) chỉ xác minh kiểu dữ liệu và cú pháp, không thể phát hiện các lỗi hỏng chức năng hoặc sai lệch logic mà unit test kiểm tra.\n- Đáp án D đúng (Đáp án phân công: D): Chạy unit test ngay sau khi chỉnh sửa từng file duy nhất tạo vòng phản hồi ngắn, cô lập chính xác lỗi regression vào duy nhất thay đổi vừa thực hiện, giúp khắc phục sự cố tức thì mà không cần audit hàng loạt.",
    "sources": [
      {
        "label": "Lesson 5.6: Codebase Exploration",
        "url": "https://claudecertificationguide.com/learn/5-context-management/5-6-codebase-exploration"
      }
    ]
  }
]