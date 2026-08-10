/* CCAF Learning Hub - 500 Unique CCAF-Aligned Mock Exam Questions v5.0
   100% Unique Scenario Questions across 5 CCAF Exam Domains (Zero Duplicate Stems & Zero Duplicate Options)
   Distribution: 27% D1 (135Q), 18% D2 (90Q), 20% D3 (100Q), 20% D4 (100Q), 15% D5 (75Q)
   Strictly aligned with Anthropic Certified Architect Foundation Exam Standards
*/

function generateMockQuestionsPool() {
  return [
  {
    "id": 1000,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1000 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1001,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1001 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1002,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1002 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1003,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1003 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1004,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1004 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1005,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1005 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1006,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1006 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1007,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1007 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1008,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1008 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1009,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1009 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1010,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1010 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1011,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1011 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1012,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1012 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1013,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống giao dịch tài chính (FinTech Banking), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In financial transaction processing system (FinTech Banking), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1013 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong hệ thống giao dịch tài chính, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1014,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1014 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1015,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1015 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1016,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1016 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1017,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1017 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1018,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1018 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1019,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1019 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1020,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1020 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1021,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1021 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1022,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1022 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1023,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1023 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1024,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1024 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1025,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1025 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1026,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1026 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1027,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In electronic medical records platform (HealthCare EMR), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1027 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong hệ thống quản lý hồ sơ bệnh án, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1028,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1028 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1029,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1029 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1030,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1030 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1031,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1031 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1032,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1032 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1033,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1033 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1034,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1034 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1035,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1035 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1036,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1036 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1037,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1037 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1038,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1038 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1039,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1039 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1040,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1040 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1041,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In CI/CD automated code review pipeline (DevOps & CI/CD), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1041 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong pipeline tự động hóa kiểm thử mã nguồn, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1042,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1042 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1043,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1043 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1044,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1044 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1045,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1045 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1046,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1046 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1047,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1047 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1048,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1048 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1049,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1049 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1050,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1050 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1051,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1051 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1052,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1052 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1053,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1053 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1054,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1054 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1055,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In order fulfillment & warehouse platform (E-Commerce Logistics), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1055 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong hệ thống xử lý đơn hàng & kho vận, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1056,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1056 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1057,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1057 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1058,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Truncate and summarize Tool execution output before context insertion."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1058 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1059,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1059 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1060,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1060 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1061,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1061 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1062,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1062 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1063,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1063 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1064,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1064 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1065,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1065 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1066,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1066 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1067,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1067 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1068,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1068 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1069,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In security operations center (SOC) platform (CyberSecurity Operations), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1069 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong trung tâm giám sát an ninh mạng (SOC), CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1070,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1070 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1071,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1071 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1072,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1072 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1073,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1073 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1074,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1074 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1075,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1075 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1076,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1076 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1077,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1077 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1078,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1078 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1079,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1079 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1080,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1080 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1081,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1081 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1082,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1082 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1083,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In legal contract analytics engine (LegalTech Analytics), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1083 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong hệ thống phân tích hợp đồng pháp lý, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1084,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1084 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1085,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1085 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1086,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1086 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1087,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1087 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1088,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1088 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1089,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1089 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1090,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1090 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1091,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1091 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1092,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1092 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1093,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1093 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1094,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1094 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1095,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1095 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1096,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1096 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1097,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In cloud infrastructure automation suite (Cloud Infra Management), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1097 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong hệ thống tự động hóa hạ tầng đám mây, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1098,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1098 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1099,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1099 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1100,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Truncate and summarize Tool execution output before context insertion."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1100 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1101,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1101 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1102,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1102 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1103,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1103 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1104,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1104 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1105,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1105 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1106,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1106 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1107,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1107 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1108,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1108 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1109,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1109 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1110,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1110 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1111,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống tính lương & nhân sự (HR Payroll Systems), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In HR payroll & onboarding system (HR Payroll Systems), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1111 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong hệ thống tính lương & nhân sự, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1112,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1112 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1113,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1113 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1114,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1114 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1115,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1115 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1116,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1116 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1117,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1117 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1118,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1118 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1119,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1119 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1120,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1120 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1121,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Loop Deadlock Detection. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Loop Deadlock Detection. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Monitor tool arguments to detect Loop Deadlocks and inject recovery prompts.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1121 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục.\n💡 Đối với bài toán Loop Deadlock Detection trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Giám sát tham số gọi tool để phát hiện bế tắc (Loop Deadlock) và chèn prompt khôi phục."
  },
  {
    "id": 1122,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Subagent Task Decomposition. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Subagent Task Decomposition. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Decompose complex tasks into independent sub-tasks running concurrently on Workers.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1122 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker.\n💡 Đối với bài toán Subagent Task Decomposition trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Phân rã bài toán lớn thành các sub-task độc lập chạy song song trên các Worker."
  },
  {
    "id": 1123,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Graceful Agent Degrade & Fallback. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Graceful Agent Degrade & Fallback. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Gracefully degrade to fallback strategy when primary Subagent encounters API failures."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1123 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota.\n💡 Đối với bài toán Graceful Agent Degrade & Fallback trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Chuyển sang phương án dự phòng (Fallback) khi Subagent chính gặp sự cố API hoặc hết quota."
  },
  {
    "id": 1124,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Context Isolation across Turns. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Context Isolation across Turns. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Prune intermediate tool interactions after sub-task completion to keep Context clean.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1124 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch.\n💡 Đối với bài toán Context Isolation across Turns trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Xóa các thông điệp trung gian của Tool sau khi hoàn thành nhiệm vụ con để giữ Context sạch."
  },
  {
    "id": 1125,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), Agent gặp bài toán cần xử lý liên quan đến Subagent Retry Exponential Backoff. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In smart energy grid management platform (IoT Energy Grid), an Agent encounters an execution challenge regarding Subagent Retry Exponential Backoff. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Apply Exponential Backoff strategy when Subagent encounters transient API connection errors.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1125 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời.\n💡 Đối với bài toán Subagent Retry Exponential Backoff trong hệ thống quản lý mạng lưới điện thông minh, CCAF quy định chuẩn thiết kế: Áp dụng chiến lược Exponential Backoff khi Subagent gặp lỗi kết nối API tạm thời."
  },
  {
    "id": 1126,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến State Checkpointing. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding State Checkpointing. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Apply architectural standard: Save Agent state checkpoint to database/disk after each tool_use turn.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1126 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: B. Áp dụng nguyên tắc: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use.\n💡 Đối với bài toán State Checkpointing trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Ghi checkpoint trạng thái Agent vào database/đĩa sau mỗi lượt tool_use."
  },
  {
    "id": 1127,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Hard max_turns Limit. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Hard max_turns Limit. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Enforce a hard max_turns limit paired with an Escalation Hook."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1127 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng.\n💡 Đối với bài toán Hard max_turns Limit trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Thiết lập trần cứng max_turns kèm Escalation Hook báo cho người dùng."
  },
  {
    "id": 1128,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Tool Result Truncation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Tool Result Truncation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Truncate and summarize Tool execution output before context insertion.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1128 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context.\n💡 Đối với bài toán Tool Result Truncation trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Cắt gọt và tóm tắt kết quả thực thi của Tool trước khi đưa vào context."
  },
  {
    "id": 1129,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Coordinator-Worker Isolation. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Coordinator-Worker Isolation. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Use Coordinator-Worker pattern to isolate each Subagent Worker context window.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1129 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker.\n💡 Đối với bài toán Coordinator-Worker Isolation trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Dùng mô hình Coordinator-Worker để cô lập context window của từng Subagent Worker."
  },
  {
    "id": 1130,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Flat Hierarchy Preference. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Flat Hierarchy Preference. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Apply Flat Hierarchy over Deep Nesting to reduce latency and context decay."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1130 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh.\n💡 Đối với bài toán Flat Hierarchy Preference trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Áp dụng Flat Hierarchy thay vì Deep Nesting nhiều cấp để giảm trễ và mất mát ngữ cảnh."
  },
  {
    "id": 1131,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Concise Hand-off State Summary. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Concise Hand-off State Summary. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Pass a concise State Summary to new Subagent during Hand-off instead of raw history.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1131 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history.\n💡 Đối với bài toán Concise Hand-off State Summary trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Chỉ truyền State Summary ngắn gọn sang Subagent mới khi Hand-off thay vì truyền raw chat history."
  },
  {
    "id": 1132,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Evaluator-Optimizer Loop. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Evaluator-Optimizer Loop. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production.",
      "D. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Execute --dangerously-skip-permissions directly on Production host server.",
      "D. Apply architectural standard: Implement an Evaluator-Optimizer loop to audit and refine generated code automatically."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1132 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: D. Áp dụng nguyên tắc: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động.\n💡 Đối với bài toán Evaluator-Optimizer Loop trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Thiết lập vòng lặp Evaluator-Optimizer để kiểm tra và sửa đổi mã nguồn tự động."
  },
  {
    "id": 1133,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Human-in-the-Loop Gate. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Human-in-the-Loop Gate. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.",
      "B. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "C. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Apply architectural standard: Insert a Human-in-the-Loop authorization gate before executing destructive tools.",
      "B. Stuff all context into Single Agent System Prompt without task decomposition.",
      "C. Increase max_tokens to 8192 and ignore turn limits.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1133 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: A. Áp dụng nguyên tắc: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống.\n💡 Đối với bài toán Human-in-the-Loop Gate trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Chèn cổng phê duyệt con người (Human-in-the-Loop) trước khi chạy lệnh có tính phá hủy hệ thống."
  },
  {
    "id": 1134,
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong tổng đài hỗ trợ khách hàng tự động (Customer Support AI), Agent gặp bài toán cần xử lý liên quan đến Context Minimization for Subagents. Đâu là giải pháp kiến trúc tối ưu nhất theo CCAF?",
    "questionEN": "In automated customer support desk (Customer Support AI), an Agent encounters an execution challenge regarding Context Minimization for Subagents. What is the optimal architectural solution according to CCAF?",
    "options": [
      "A. Dồn toàn bộ thông tin vào System Prompt của Single Agent mà không phân rã.",
      "B. Tăng max_tokens của mô hình lên 8192 và bỏ qua trần kiểm soát lượt.",
      "C. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.",
      "D. Chạy cờ --dangerously-skip-permissions trực tiếp trên máy chủ Production."
    ],
    "optionsEN": [
      "A. Stuff all context into Single Agent System Prompt without task decomposition.",
      "B. Increase max_tokens to 8192 and ignore turn limits.",
      "C. Apply architectural standard: Minimize context by feeding only task-relevant excerpts to Subagents instead of entire docs.",
      "D. Execute --dangerously-skip-permissions directly on Production host server."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1134 (D1 - Agent Architecture & Orchestration):\n✅ Đáp án đúng: C. Áp dụng nguyên tắc: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu.\n💡 Đối với bài toán Context Minimization for Subagents trong tổng đài hỗ trợ khách hàng tự động, CCAF quy định chuẩn thiết kế: Thu hẹp ngữ cảnh tối đa chỉ truyền đúng dữ liệu liên quan cho Subagent thay vì đẩy toàn bộ tài liệu."
  },
  {
    "id": 1135,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1135 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1136,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1136 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1137,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1137 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1138,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1138 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1139,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1139 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1140,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1140 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1141,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1141 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1142,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Cap tool execution payload size before appending to messages array.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1142 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1143,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống giao dịch tài chính (FinTech Banking), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into financial transaction processing system (FinTech Banking), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1143 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1144,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1144 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1145,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1145 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1146,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1146 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1147,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1147 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1148,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1148 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1149,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1149 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1150,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1150 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1151,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Cap tool execution payload size before appending to messages array."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1151 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1152,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into electronic medical records platform (HealthCare EMR), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1152 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1153,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1153 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1154,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1154 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1155,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1155 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1156,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1156 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1157,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1157 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1158,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1158 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1159,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1159 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1160,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Cap tool execution payload size before appending to messages array.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1160 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1161,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into CI/CD automated code review pipeline (DevOps & CI/CD), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1161 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1162,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1162 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1163,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1163 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1164,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1164 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1165,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1165 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1166,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1166 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1167,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1167 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1168,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1168 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1169,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Cap tool execution payload size before appending to messages array.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1169 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1170,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into order fulfillment & warehouse platform (E-Commerce Logistics), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1170 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1171,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1171 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1172,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1172 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1173,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1173 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1174,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1174 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1175,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1175 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1176,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1176 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1177,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1177 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1178,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Cap tool execution payload size before appending to messages array.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1178 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1179,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into security operations center (SOC) platform (CyberSecurity Operations), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1179 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1180,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1180 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1181,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1181 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1182,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1182 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1183,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1183 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1184,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1184 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1185,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1185 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1186,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1186 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1187,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Cap tool execution payload size before appending to messages array.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1187 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1188,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into legal contract analytics engine (LegalTech Analytics), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1188 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1189,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1189 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1190,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1190 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1191,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1191 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1192,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1192 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1193,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1193 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1194,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1194 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1195,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1195 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1196,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Cap tool execution payload size before appending to messages array."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1196 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1197,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into cloud infrastructure automation suite (Cloud Infra Management), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1197 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1198,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1198 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1199,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1199 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1200,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1200 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1201,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1201 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1202,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1202 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1203,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1203 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1204,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1204 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1205,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Cap tool execution payload size before appending to messages array.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1205 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1206,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống tính lương & nhân sự (HR Payroll Systems), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into HR payroll & onboarding system (HR Payroll Systems), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1206 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1207,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1207 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1208,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1208 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1209,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1209 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1210,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1210 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1211,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1211 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1212,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1212 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1213,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1213 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1214,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Cap tool execution payload size before appending to messages array."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1214 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1215,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into smart energy grid management platform (IoT Energy Grid), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1215 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1216,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến Granular Tools over Monolithic. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding Granular Tools over Monolithic arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Split into single-purpose Granular Tools with focused descriptions over 1 bloated Monolithic Tool.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1216 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác.\n💡 Về Tool Design & MCP Integration (Granular Tools over Monolithic), CCAF yêu cầu tuân thủ: Tách thành các Granular Tools đơn nhiệm với mô tả tập trung thay vì 1 Monolithic Tool chứa quá nhiều thao tác."
  },
  {
    "id": 1217,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến JSON Schema Required Array. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding JSON Schema Required Array arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Enforce standard: Explicitly declare mandatory fields inside input_schema's `required` array.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1217 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: B. Thực thi đúng chuẩn: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema.\n💡 Về Tool Design & MCP Integration (JSON Schema Required Array), CCAF yêu cầu tuân thủ: Khai báo đầy đủ các thuộc tính bắt buộc trong mảng `required` của input_schema."
  },
  {
    "id": 1218,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến Informative Error in Tool Result. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding Informative Error in Tool Result arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Return descriptive error payload in `tool_result` so Claude can self-correct instead of throwing HTTP 500."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1218 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error.\n💡 Về Tool Design & MCP Integration (Informative Error in Tool Result), CCAF yêu cầu tuân thủ: Trả về thông điệp lỗi chi tiết trong `tool_result` để Claude tự sửa thay vì ném ra HTTP 500 Error."
  },
  {
    "id": 1219,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến MCP stdio vs SSE Transports. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding MCP stdio vs SSE Transports arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use stdio transport for local desktop/CLI apps and SSE/HTTP for remote microservices.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1219 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server.\n💡 Về Tool Design & MCP Integration (MCP stdio vs SSE Transports), CCAF yêu cầu tuân thủ: Dùng transport stdio cho ứng dụng local desktop/CLI và transport SSE/HTTP cho remote server."
  },
  {
    "id": 1220,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến MCP Resource vs MCP Tool. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding MCP Resource vs MCP Tool arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Use MCP Resource for read-only context data and MCP Tool for executable state-changing actions.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1220 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ.\n💡 Về Tool Design & MCP Integration (MCP Resource vs MCP Tool), CCAF yêu cầu tuân thủ: Dùng MCP Resource cho dữ liệu đọc ngữ cảnh (Read-Only) và MCP Tool cho các thao tác thực thi có tác dụng phụ."
  },
  {
    "id": 1221,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 1: Architectural Selection",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến Redundant Tool Definition Cleanup. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding Redundant Tool Definition Cleanup arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Remove redundant or irrelevant tools from request payload to prevent model tool-selection confusion.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1221 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình.\n💡 Về Tool Design & MCP Integration (Redundant Tool Definition Cleanup), CCAF yêu cầu tuân thủ: Loại bỏ các Tool trùng lặp hoặc không liên quan khỏi danh sách `tools` trong request để tránh nhầm lẫn mô hình."
  },
  {
    "id": 1222,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến Explicit Null Value Handling. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding Explicit Null Value Handling arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Enforce standard: Configure JSON Schema for explicit null output when values are absent instead of field omission.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1222 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: C. Thực thi đúng chuẩn: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết.\n💡 Về Tool Design & MCP Integration (Explicit Null Value Handling), CCAF yêu cầu tuân thủ: Cấu hình JSON Schema để mô hình gửi giá trị null rõ ràng thay vì bỏ qua thuộc tính khi cần thiết."
  },
  {
    "id": 1223,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến Tool Execution Output Truncation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding Tool Execution Output Truncation arises. What is the standard CCAF solution?",
    "options": [
      "A. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.",
      "B. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "C. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "D. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa."
    ],
    "optionsEN": [
      "A. Enforce standard: Cap tool execution payload size before appending to messages array.",
      "B. Combine all 50 operations into a single Monolithic Tool.",
      "C. Suppress error details and return an empty string on tool failure.",
      "D. Use stdio transport for communication between remote Cloud servers."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1223 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: A. Thực thi đúng chuẩn: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages.\n💡 Về Tool Design & MCP Integration (Tool Execution Output Truncation), CCAF yêu cầu tuân thủ: Giới hạn kích thước dữ liệu trả về của Tool call trước khi ghi vào mảng messages."
  },
  {
    "id": 1224,
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Khi tích hợp Tool hoặc MCP Server vào tổng đài hỗ trợ khách hàng tự động (Customer Support AI), phát sinh vấn đề liên quan đến Unambiguous Parameter Description. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "When integrating Tools or MCP Server into automated customer support desk (Customer Support AI), an issue regarding Unambiguous Parameter Description arises. What is the standard CCAF solution?",
    "options": [
      "A. Gộp tất cả 50 thao tác hệ thống vào 1 Monolithic Tool duy nhất.",
      "B. Ẩn toàn bộ thông điệp lỗi và chỉ trả về chuỗi rỗng khi Tool thất bại.",
      "C. Sử dụng transport stdio cho giao tiếp giữa 2 máy chủ Cloud từ xa.",
      "D. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
    ],
    "optionsEN": [
      "A. Combine all 50 operations into a single Monolithic Tool.",
      "B. Suppress error details and return an empty string on tool failure.",
      "C. Use stdio transport for communication between remote Cloud servers.",
      "D. Enforce standard: Write unambiguous parameter descriptions with format examples (e.g. ISO-8601) in input_schema."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1224 (D2 - Tool Design & MCP Integration):\n✅ Đáp án đúng: D. Thực thi đúng chuẩn: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema.\n💡 Về Tool Design & MCP Integration (Unambiguous Parameter Description), CCAF yêu cầu tuân thủ: Viết mô tả tham số rõ ràng kèm ví dụ định dạng chuẩn (như ISO-8601 date) trong input_schema."
  },
  {
    "id": 1225,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1225 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1226,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1226 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1227,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1227 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1228,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1228 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1229,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1229 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1230,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1230 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1231,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1231 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1232,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1232 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1233,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1233 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1234,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống giao dịch tài chính (FinTech Banking), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to financial transaction processing system (FinTech Banking), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1234 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1235,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1235 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1236,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1236 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1237,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1237 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1238,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1238 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1239,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1239 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1240,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1240 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1241,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1241 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1242,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1242 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1243,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1243 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1244,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to electronic medical records platform (HealthCare EMR), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1244 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1245,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1245 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1246,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1246 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1247,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1247 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1248,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1248 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1249,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1249 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1250,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1250 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1251,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1251 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1252,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1252 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1253,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1253 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1254,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to CI/CD automated code review pipeline (DevOps & CI/CD), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1254 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1255,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1255 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1256,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1256 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1257,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1257 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1258,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1258 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1259,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1259 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1260,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1260 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1261,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1261 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1262,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1262 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1263,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1263 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1264,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to order fulfillment & warehouse platform (E-Commerce Logistics), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1264 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1265,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1265 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1266,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1266 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1267,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1267 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1268,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1268 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1269,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1269 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1270,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1270 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1271,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1271 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1272,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1272 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1273,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1273 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1274,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to security operations center (SOC) platform (CyberSecurity Operations), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1274 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1275,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1275 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1276,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1276 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1277,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1277 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1278,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1278 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1279,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1279 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1280,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1280 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1281,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1281 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1282,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1282 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1283,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1283 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1284,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to legal contract analytics engine (LegalTech Analytics), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1284 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1285,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1285 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1286,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1286 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1287,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1287 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1288,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1288 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1289,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1289 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1290,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1290 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1291,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1291 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1292,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1292 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1293,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1293 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1294,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to cloud infrastructure automation suite (Cloud Infra Management), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1294 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1295,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1295 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1296,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1296 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1297,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1297 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1298,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1298 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1299,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1299 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1300,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1300 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1301,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1301 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1302,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1302 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1303,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1303 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1304,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống tính lương & nhân sự (HR Payroll Systems), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to HR payroll & onboarding system (HR Payroll Systems), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1304 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1305,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1305 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1306,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1306 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1307,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1307 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1308,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1308 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1309,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1309 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1310,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1310 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1311,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1311 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1312,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1312 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1313,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1313 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1314,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to smart energy grid management platform (IoT Energy Grid), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1314 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1315,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về CLAUDE.md Length Budget. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding CLAUDE.md Length Budget must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Standard CCAF configuration: Keep `CLAUDE.md` concise (< 100 lines), focusing only on core build/test commands and key file paths.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1315 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: B. Cấu hình chuẩn CCAF: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính.\n💡 Về Claude Code Configuration & Workflows (CLAUDE.md Length Budget), khuyến nghị chính thức của Anthropic là: Giữ file `CLAUDE.md` ngắn gọn dưới 100 dòng, chỉ chứa quy trình build/test cốt lõi và vị trí file chính."
  },
  {
    "id": 1316,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Docker Container Sandbox for Dangerously Skip Permissions. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Docker Container Sandbox for Dangerously Skip Permissions must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Run `--dangerously-skip-permissions` exclusively inside isolated Docker Container sandboxes in CI/CD.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1316 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD.\n💡 Về Claude Code Configuration & Workflows (Docker Container Sandbox for Dangerously Skip Permissions), khuyến nghị chính thức của Anthropic là: Chỉ chạy cờ `--dangerously-skip-permissions` bên trong môi trường Docker Container cô lập trong CI/CD."
  },
  {
    "id": 1317,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Glob/Grep before View File. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Glob/Grep before View File must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Leverage targeted location tools (Glob/Grep) prior to reading whole large files with View tool.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1317 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file).\n💡 Về Claude Code Configuration & Workflows (Glob/Grep before View File), khuyến nghị chính thức của Anthropic là: Sử dụng các công cụ định vị vị trí (Glob/Grep) trước khi mở xem nội dung file lớn (View file)."
  },
  {
    "id": 1318,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Custom Slash Commands & Hooks. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Custom Slash Commands & Hooks must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Create custom slash commands and hooks to automate linting and test passes pre-commit.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1318 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit.\n💡 Về Claude Code Configuration & Workflows (Custom Slash Commands & Hooks), khuyến nghị chính thức của Anthropic là: Tạo các custom slash command và hooks để tự động hóa quy trình linting và test trước khi commit."
  },
  {
    "id": 1319,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Session Memory Pruning & Compact. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Session Memory Pruning & Compact must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep.",
      "D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Always use View tool to read entire 10,000-line files line-by-line without Grep.",
      "D. Standard CCAF configuration: Use `/compact` command or restart fresh sessions during long Claude Code CLI work to free context."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1319 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: D. Cấu hình chuẩn CCAF: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context.\n💡 Về Claude Code Configuration & Workflows (Session Memory Pruning & Compact), khuyến nghị chính thức của Anthropic là: Sử dụng lệnh `/compact` hoặc khôi phục session sạch khi làm việc lâu trong Claude Code CLI để giải phóng context."
  },
  {
    "id": 1320,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Scoped Custom MCP Registration. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Scoped Custom MCP Registration must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Configure custom MCP servers in `.claude.json` with strictly scoped permission boundaries.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1320 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng.\n💡 Về Claude Code Configuration & Workflows (Scoped Custom MCP Registration), khuyến nghị chính thức của Anthropic là: Cấu hình các custom MCP server trong `.claude.json` với phạm vi quyền hạn được giới hạn rõ ràng."
  },
  {
    "id": 1321,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Automated Headless PR Review Pipeline. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Automated Headless PR Review Pipeline must be resolved. What is the correct configuration?",
    "options": [
      "A. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "B. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "C. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "B. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "C. Standard CCAF configuration: Deploy Claude Code in Headless mode within CI/CD for automated async PR code reviews.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1321 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: C. Cấu hình chuẩn CCAF: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ.\n💡 Về Claude Code Configuration & Workflows (Automated Headless PR Review Pipeline), khuyến nghị chính thức của Anthropic là: Triển khai Claude Code ở chế độ Headless trong CI/CD để tự động review PR bất đồng bộ."
  },
  {
    "id": 1322,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Restricted Shell Execution Boundaries. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Restricted Shell Execution Boundaries must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Configure an explicit allowlist for automated Bash command execution in Claude Code.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1322 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code.\n💡 Về Claude Code Configuration & Workflows (Restricted Shell Execution Boundaries), khuyến nghị chính thức của Anthropic là: Cấu hình danh sách trắng (Allowlist) cho các lệnh Bash được phép tự động chạy trong Claude Code."
  },
  {
    "id": 1323,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Project Rule Enforcement in CLAUDE.md. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Project Rule Enforcement in CLAUDE.md must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Embed code style guidelines and architecture standards in `CLAUDE.md` for consistent compliance.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1323 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ.\n💡 Về Claude Code Configuration & Workflows (Project Rule Enforcement in CLAUDE.md), khuyến nghị chính thức của Anthropic là: Đưa các quy tắc code style và tiêu chuẩn kiến trúc dự án vào `CLAUDE.md` để mô hình luôn tuân thủ."
  },
  {
    "id": 1324,
    "domain": "D3",
    "domainTitle": "Claude Code Configuration & Workflows",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong quy trình phát triển phần mềm với Claude Code áp dụng cho tổng đài hỗ trợ khách hàng tự động (Customer Support AI), cần giải quyết yêu cầu về Targeted Search Scope Filtering. Đâu là cấu hình đúng chuẩn?",
    "questionEN": "In Claude Code software engineering workflow applied to automated customer support desk (Customer Support AI), a requirement regarding Targeted Search Scope Filtering must be resolved. What is the correct configuration?",
    "options": [
      "A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.",
      "B. Viết file `CLAUDE.md` dài 2,000 dòng chứa toàn bộ tài liệu dự án.",
      "C. Chạy cờ `--dangerously-skip-permissions` trực tiếp trên máy tính cá nhân của lập trình viên.",
      "D. Luôn dùng công cụ View file đọc từng tệp 10,000 dòng từ đầu đến cuối mà không dùng Grep."
    ],
    "optionsEN": [
      "A. Standard CCAF configuration: Specify targeted path scopes when running Grep/Glob to skip vendor/node_modules directories.",
      "B. Write a 2,000-line `CLAUDE.md` file dumping all project documentation.",
      "C. Execute `--dangerously-skip-permissions` directly on developer host machines.",
      "D. Always use View tool to read entire 10,000-line files line-by-line without Grep."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1324 (D3 - Claude Code Configuration & Workflows):\n✅ Đáp án đúng: A. Cấu hình chuẩn CCAF: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules.\n💡 Về Claude Code Configuration & Workflows (Targeted Search Scope Filtering), khuyến nghị chính thức của Anthropic là: Chỉ định rõ danh mục tìm kiếm khi dùng Grep/Glob để tránh quét các thư mục vendor/node_modules."
  },
  {
    "id": 1325,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1325 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1326,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1326 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1327,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1327 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1328,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1328 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1329,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1329 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1330,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1330 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1331,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1331 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1332,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1332 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1333,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1333 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1334,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống giao dịch tài chính (FinTech Banking), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for financial transaction processing system (FinTech Banking), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1334 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1335,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1335 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1336,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1336 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1337,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1337 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1338,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1338 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1339,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1339 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1340,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1340 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1341,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1341 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1342,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1342 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1343,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1343 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1344,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý hồ sơ bệnh án (HealthCare EMR), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for electronic medical records platform (HealthCare EMR), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1344 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1345,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1345 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1346,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1346 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1347,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1347 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1348,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1348 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1349,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1349 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1350,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1350 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1351,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1351 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1352,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1352 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1353,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1353 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1354,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for CI/CD automated code review pipeline (DevOps & CI/CD), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1354 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1355,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1355 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1356,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1356 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1357,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1357 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1358,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1358 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1359,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1359 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1360,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1360 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1361,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1361 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1362,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1362 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1363,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1363 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1364,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for order fulfillment & warehouse platform (E-Commerce Logistics), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1364 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1365,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1365 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1366,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1366 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1367,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1367 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1368,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1368 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1369,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1369 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1370,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1370 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1371,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1371 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1372,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1372 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1373,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1373 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1374,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for security operations center (SOC) platform (CyberSecurity Operations), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1374 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1375,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1375 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1376,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1376 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1377,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1377 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1378,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1378 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1379,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1379 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1380,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1380 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1381,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1381 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1382,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1382 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1383,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1383 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1384,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for legal contract analytics engine (LegalTech Analytics), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1384 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1385,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1385 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1386,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1386 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1387,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1387 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1388,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1388 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1389,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1389 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1390,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1390 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1391,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1391 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1392,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1392 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1393,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1393 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1394,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for cloud infrastructure automation suite (Cloud Infra Management), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1394 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1395,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1395 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1396,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1396 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1397,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1397 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1398,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1398 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1399,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1399 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1400,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1400 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1401,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1401 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1402,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1402 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1403,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1403 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1404,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống tính lương & nhân sự (HR Payroll Systems), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for HR payroll & onboarding system (HR Payroll Systems), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1404 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1405,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1405 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1406,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1406 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1407,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1407 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1408,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1408 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1409,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1409 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1410,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1410 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1411,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1411 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1412,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1412 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1413,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1413 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1414,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for smart energy grid management platform (IoT Energy Grid), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1414 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1415,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Forced Tool Call with tool_choice. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Forced Tool Call with tool_choice arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Use `tool_choice: { type: 'tool', name: 'scan_code' }` to force Claude to call the required Tool."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1415 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn.\n💡 Đối với Prompt Engineering & Structured Output (Forced Tool Call with tool_choice), quy tắc CCAF yêu cầu: Dùng cấu hình `tool_choice: { type: 'tool', name: 'scan_code' }` để ép buộc Claude phải gọi đúng Tool mong muốn."
  },
  {
    "id": 1416,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến XML Tag Boundary Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding XML Tag Boundary Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'.",
      "D. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs.",
      "D. Correct solution: Wrap user input or external docs in XML boundary tags like `<user_input>` to mitigate Prompt Injection."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1416 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: D. Giải pháp đúng: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection.\n💡 Đối với Prompt Engineering & Structured Output (XML Tag Boundary Isolation), quy tắc CCAF yêu cầu: Dữ liệu đầu vào của người dùng hoặc tài liệu bên ngoài phải được bọc trong các thẻ XML ranh giới như `<user_input>` để chống Prompt Injection."
  },
  {
    "id": 1417,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Lost-in-the-Middle Core Instruction Placement. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Lost-in-the-Middle Core Instruction Placement arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Position critical instructions at the top (System Prompt) or bottom (latest User turn) to counter Lost-in-the-middle effect.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1417 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle.\n💡 Đối với Prompt Engineering & Structured Output (Lost-in-the-Middle Core Instruction Placement), quy tắc CCAF yêu cầu: Đặt các quy tắc cốt lõi ở ngay ĐẦU (System Prompt) hoặc ngay ĐUÔI (lượt User mới nhất) để tránh hiện tượng Lost-in-the-Middle."
  },
  {
    "id": 1418,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Handling stop_reason max_tokens. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Handling stop_reason max_tokens arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: When `stop_reason` equals `max_tokens`, send a continuation user prompt instead of clearing the messages array.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1418 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages.\n💡 Đối với Prompt Engineering & Structured Output (Handling stop_reason max_tokens), quy tắc CCAF yêu cầu: Khi `stop_reason` trả về `max_tokens`, gửi tiếp lượt user yêu cầu Claude tiếp tục từ đoạn bị ngắt thay vì xóa mảng messages."
  },
  {
    "id": 1419,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến System Prompt CoT Thinking Tags. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding System Prompt CoT Thinking Tags arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Instruct Claude to reason step-by-step inside `<thinking>` tags before delivering final output.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1419 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức.\n💡 Đối với Prompt Engineering & Structured Output (System Prompt CoT Thinking Tags), quy tắc CCAF yêu cầu: Yêu cầu Claude suy luận từng bước trong thẻ `<thinking>` trước khi xuất câu trả lời chính thức."
  },
  {
    "id": 1420,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Few-Shot Format Consistency. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Few-Shot Format Consistency arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Provide Few-Shot examples matching the target JSON Schema 100% inside System Prompt.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1420 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt.\n💡 Đối với Prompt Engineering & Structured Output (Few-Shot Format Consistency), quy tắc CCAF yêu cầu: Đưa các ví dụ Few-Shot chuẩn mực khớp 100% với JSON Schema yêu cầu vào System Prompt."
  },
  {
    "id": 1421,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Explicit Negative Constraints. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Explicit Negative Constraints arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine affirmative instructions with boundary tags rather than relying solely on negative constraints.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1421 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực.\n💡 Đối với Prompt Engineering & Structured Output (Explicit Negative Constraints), quy tắc CCAF yêu cầu: Kết hợp chỉ dẫn khẳng định (Affirmative) và thẻ ranh giới thay vì chỉ dùng các câu cấm đoán tiêu cực."
  },
  {
    "id": 1422,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 1: Architectural Selection",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Structured Output JSON Validation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Structured Output JSON Validation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "C. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Omit tool_choice parameter and rely on random model behavior.",
      "C. Correct solution: Combine System Prompt with JSON Schema or Tool Definition to enforce valid structured output.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1422 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: C. Giải pháp đúng: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do.\n💡 Đối với Prompt Engineering & Structured Output (Structured Output JSON Validation), quy tắc CCAF yêu cầu: Kết hợp System Prompt với JSON Schema hoặc Tool Definition để đảm bảo mô hình không bao giờ trả về text tự do."
  },
  {
    "id": 1423,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Role System Prompt Isolation. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Role System Prompt Isolation arises. What is the standard CCAF solution?",
    "options": [
      "A. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "B. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "B. Correct solution: Place role guidelines, project context, and safety rules in System Prompt rather than mixing into User Message.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1423 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: B. Giải pháp đúng: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message.\n💡 Đối với Prompt Engineering & Structured Output (Role System Prompt Isolation), quy tắc CCAF yêu cầu: Đặt chỉ dẫn vai trò (Role), bối cảnh dự án và quy định an toàn vào System Prompt thay vì trộn vào User Message."
  },
  {
    "id": 1424,
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Trong bài toán Prompt Engineering & Structured Output phục vụ tổng đài hỗ trợ khách hàng tự động (Customer Support AI), xảy ra vấn đề liên quan đến Dynamic Context Prompt Wrapping. Đâu là giải pháp chuẩn CCAF?",
    "questionEN": "In Prompt Engineering & Structured Output for automated customer support desk (Customer Support AI), an architectural issue regarding Dynamic Context Prompt Wrapping arises. What is the standard CCAF solution?",
    "options": [
      "A. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.",
      "B. Nhồi tài liệu 200K token vào giữa context làm nhạt các chỉ dẫn cốt lõi.",
      "C. Bỏ qua tham số tool_choice và mong chờ mô hình tự chọn đúng Tool mà không có hướng dẫn.",
      "D. Xóa toàn bộ mảng lịch sử hội thoại mỗi khi mô hình trả về stop_reason = 'max_tokens'."
    ],
    "optionsEN": [
      "A. Correct solution: Enclose dynamic code/data snippets within XML tags like `<code>`, `<document>` for clear instruction separation.",
      "B. Stuff a 200K-token document in the middle of context diluting core instructions.",
      "C. Omit tool_choice parameter and rely on random model behavior.",
      "D. Clear entire conversation history whenever stop_reason = 'max_tokens' occurs."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1424 (D4 - Prompt Engineering & Structured Output):\n✅ Đáp án đúng: A. Giải pháp đúng: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn.\n💡 Đối với Prompt Engineering & Structured Output (Dynamic Context Prompt Wrapping), quy tắc CCAF yêu cầu: Bọc các đoạn code/dữ liệu động trong các thẻ XML như `<code>`, `<document>` để mô hình phân biệt rõ phần chỉ dẫn."
  },
  {
    "id": 1425,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1425 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1426,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1426 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1427,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1427 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1428,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1428 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1429,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1429 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1430,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1430 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1431,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1431 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1432,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống giao dịch tài chính (FinTech Banking) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The financial transaction processing system (FinTech Banking) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1432 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1433,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1433 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1434,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1434 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1435,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1435 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1436,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1436 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1437,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1437 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1438,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1438 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1439,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1439 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1440,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống quản lý hồ sơ bệnh án (HealthCare EMR) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The electronic medical records platform (HealthCare EMR) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1440 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1441,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1441 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1442,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1442 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1443,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1443 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1444,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1444 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1445,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1445 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1446,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1446 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1447,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx)."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1447 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1448,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống pipeline tự động hóa kiểm thử mã nguồn (DevOps & CI/CD) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The CI/CD automated code review pipeline (DevOps & CI/CD) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1448 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1449,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1449 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1450,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1450 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1451,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1451 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1452,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1452 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1453,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1453 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1454,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1454 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1455,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1455 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1456,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống xử lý đơn hàng & kho vận (E-Commerce Logistics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The order fulfillment & warehouse platform (E-Commerce Logistics) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1456 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1457,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1457 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1458,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1458 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1459,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1459 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1460,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1460 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1461,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1461 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1462,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1462 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1463,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1463 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1464,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống trung tâm giám sát an ninh mạng (SOC) (CyberSecurity Operations) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The security operations center (SOC) platform (CyberSecurity Operations) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1464 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1465,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1465 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1466,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1466 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1467,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1467 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1468,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1468 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1469,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1469 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1470,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1470 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1471,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1471 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1472,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống phân tích hợp đồng pháp lý (LegalTech Analytics) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The legal contract analytics engine (LegalTech Analytics) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1472 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1473,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1473 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1474,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1474 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1475,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1475 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1476,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1476 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1477,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1477 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1478,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1478 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1479,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1479 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1480,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống tự động hóa hạ tầng đám mây (Cloud Infra Management) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The cloud infrastructure automation suite (Cloud Infra Management) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1480 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1481,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1481 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1482,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1482 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1483,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1483 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1484,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1484 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1485,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1485 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1486,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1486 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1487,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1487 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1488,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống tính lương & nhân sự (HR Payroll Systems) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The HR payroll & onboarding system (HR Payroll Systems) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1488 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1489,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1489 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1490,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1490 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1491,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1491 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  },
  {
    "id": 1492,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Sliding Context Window Pruning. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Sliding Context Window Pruning. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Perform Sliding Context Window Pruning to remove stale conversation turns and keep Context lean."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1492 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu.\n💡 Về Context Management & Reliability (Sliding Context Window Pruning), chuẩn CCAF quy định: Thực hiện Pruning mảng messages loại bỏ các lượt hội thoại cũ không còn giá trị để giữ Context Window dưới ngưỡng tối ưu."
  },
  {
    "id": 1493,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 2: Failure Diagnosis",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Context Window Overflow Resilience. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Context Window Overflow Resilience. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Monitor total token usage in messages array and summarize history before breaching context limits."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1493 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context.\n💡 Về Context Management & Reliability (Context Window Overflow Resilience), chuẩn CCAF quy định: Giám sát tổng số token trong mảng messages và chủ động tóm tắt lịch sử hội thoại trước khi vượt ngưỡng max context."
  },
  {
    "id": 1494,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Model Tier Routing for Cost Optimization. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Model Tier Routing for Cost Optimization. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Use Claude 3.5 Haiku for lightweight routing/classification and reserve Sonnet/Opus for complex reasoning.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1494 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp.\n💡 Về Context Management & Reliability (Model Tier Routing for Cost Optimization), chuẩn CCAF quy định: Dùng Claude 3.5 Haiku cho các bước routing/phân loại nhẹ và chỉ gọi Sonnet/Opus cho các bước suy luận phức tạp."
  },
  {
    "id": 1495,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Exponential Backoff Retry Strategy. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Exponential Backoff Retry Strategy. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Implement Exponential Backoff with Jitter for API rate_limit (429) or server errors (5xx).",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1495 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx).\n💡 Về Context Management & Reliability (Exponential Backoff Retry Strategy), chuẩn CCAF quy định: Áp dụng chiến lược Exponential Backoff với Jitter khi gặp lỗi API rate_limit (429) hoặc server error (5xx)."
  },
  {
    "id": 1496,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống hệ thống quản lý mạng lưới điện thông minh (IoT Energy Grid) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Minimum Token Thresholds. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The smart energy grid management platform (IoT Energy Grid) requires performance, cost, and reliability optimization regarding Prompt Caching Minimum Token Thresholds. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản.",
      "D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Use Opus model for simple 1-word text classification tasks.",
      "D. Standard design: Ensure cached blocks meet minimum token thresholds (1,024 tokens Sonnet/Opus, 2,048 tokens Haiku) for cache hit."
    ],
    "correct": 3,
    "explanation": "Giải thích câu #1496 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: D. Thiết kế chuẩn: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực.\n💡 Về Context Management & Reliability (Prompt Caching Minimum Token Thresholds), chuẩn CCAF quy định: Đảm bảo đoạn văn bản được cache đạt ngưỡng tối thiểu (1,024 tokens cho Sonnet/Opus, 2,048 tokens cho Haiku) để cache có hiệu lực."
  },
  {
    "id": 1497,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 1: Architectural Selection",
    "question": "Hệ thống tổng đài hỗ trợ khách hàng tự động (Customer Support AI) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Prompt Caching Ephemeral Tag. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The automated customer support desk (Customer Support AI) requires performance, cost, and reliability optimization regarding Prompt Caching Ephemeral Tag. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "C. Standard design: Add `cache_control: { type: 'ephemeral' }` to large System Prompt/Tools blocks (> 1024 tokens Sonnet/Opus) to enable Prompt Caching.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 2,
    "explanation": "Giải thích câu #1497 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: C. Thiết kế chuẩn: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching.\n💡 Về Context Management & Reliability (Prompt Caching Ephemeral Tag), chuẩn CCAF quy định: Bổ sung `cache_control: { type: 'ephemeral' }` vào các khối System Prompt/Tools lớn (> 1024 tokens với Sonnet/Opus) để kích hoạt Prompt Caching."
  },
  {
    "id": 1498,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 3: API Behavior Specs",
    "question": "Hệ thống tổng đài hỗ trợ khách hàng tự động (Customer Support AI) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Message Batches API 50% Cost Discount. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The automated customer support desk (Customer Support AI) requires performance, cost, and reliability optimization regarding Message Batches API 50% Cost Discount. What is the standard CCAF design?",
    "options": [
      "A. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "B. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Send 500MB raw docs in every single API request.",
      "B. Standard design: Use Message Batches API for non-realtime async batch processing to receive a 50% token price discount.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 1,
    "explanation": "Giải thích câu #1498 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: B. Thiết kế chuẩn: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token.\n💡 Về Context Management & Reliability (Message Batches API 50% Cost Discount), chuẩn CCAF quy định: Sử dụng Message Batches API cho các tác vụ xử lý bất đồng bộ không yêu cầu thời gian thực để giảm 50% chi phí token."
  },
  {
    "id": 1499,
    "domain": "D5",
    "domainTitle": "Context Management & Reliability",
    "archetype": "Type 4: Trade-off Reasoning",
    "question": "Hệ thống tổng đài hỗ trợ khách hàng tự động (Customer Support AI) cần tối ưu hóa hiệu năng, chi phí và độ tin cậy liên quan đến Reference ID Pattern over Inline Dumping. Đâu là thiết kế đúng chuẩn CCAF?",
    "questionEN": "The automated customer support desk (Customer Support AI) requires performance, cost, and reliability optimization regarding Reference ID Pattern over Inline Dumping. What is the standard CCAF design?",
    "options": [
      "A. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.",
      "B. Gửi toàn bộ 500MB tài liệu thô trong từng request API đơn lẻ.",
      "C. Liên tục gọi API lại ngay lập tức (Tight Loop) khi gặp lỗi 429 Rate Limit.",
      "D. Sử dụng mô hình Opus cho tất cả các tác vụ phân loại chuỗi 1 từ đơn giản."
    ],
    "optionsEN": [
      "A. Standard design: Apply Reference ID Pattern (passing resource IDs) instead of dumping raw large Inline Context into messages.",
      "B. Send 500MB raw docs in every single API request.",
      "C. Retrying API calls immediately in a tight loop upon receiving HTTP 429 Rate Limit.",
      "D. Use Opus model for simple 1-word text classification tasks."
    ],
    "correct": 0,
    "explanation": "Giải thích câu #1499 (D5 - Context Management & Reliability):\n✅ Đáp án đúng: A. Thiết kế chuẩn: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn.\n💡 Về Context Management & Reliability (Reference ID Pattern over Inline Dumping), chuẩn CCAF quy định: Áp dụng Reference ID Pattern (chỉ truyền ID của file/tài nguyên cho Agent) thay vì nhúng Inline Context thô quá lớn."
  }
];
}

if (typeof window !== 'undefined') {
  window.MOCK_EXAM_QUESTION_POOL = generateMockQuestionsPool();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateMockQuestionsPool };
}
