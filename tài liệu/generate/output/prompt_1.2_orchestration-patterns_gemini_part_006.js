[
  {
    "id": "d1-b02-1.2-011",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-11",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-011",
    "scenarioSignature": {
      "testedPrinciple": "evaluator optimizer loop termination criteria",
      "failureMode": "unbounded API token consumption and infinite loop",
      "rootCause": "missing quality score threshold and iteration cap",
      "requiredFix": "enforce maximum iteration limit and minimum quality score gate"
    },
    "questionEN": "An engineering team builds a code refactoring pipeline using an Evaluator-Optimizer loop where a Generator LLM improves code quality and an Evaluator LLM scores the output from 1 to 100. During production, a PR refactoring task runs continuously for over 45 minutes, submitting minor whitespace and docstring edits across 120 iterations while keeping the evaluator score around 84/100. Inspecting the architecture reveals that the optimizer loop continues as long as evaluator_score < target_score (set to 95/100), but never reaches 95 due to subjective style preferences. How should the team modify the orchestration pattern to prevent runaway execution costs while maintaining code quality?",
    "question": "[d1-b02-1.2-011] Một đội ngũ kỹ thuật xây dựng đường ống tối ưu hóa mã nguồn bằng vòng lặp Evaluator-Optimizer, trong đó Generator LLM cải thiện mã nguồn và Evaluator LLM chấm điểm đầu ra từ 1 đến 100. Trong môi trường sản xuất, một tác vụ tái cấu trúc PR chạy liên tục trong hơn 45 phút, gửi các chỉnh sửa nhỏ về khoảng trắng và docstring qua 120 vòng lặp trong khi điểm số của evaluator duy trì ở mức khoảng 84/100. Kiểm tra kiến trúc cho thấy vòng lặp tối ưu hóa tiếp tục miễn là evaluator_score < target_score (được đặt là 95/100), nhưng không bao giờ đạt đến 95 do các sở thích định dạng mang tính chủ quan. Đội ngũ nên sửa đổi mô hình điều phối như thế nào để ngăn chặn chi phí thực thi leo thang trong khi vẫn đảm bảo chất lượng mã nguồn?",
    "optionsEN": [
      "A. Replace the Evaluator LLM with a static deterministic linter to automatically fix docstrings without executing an optimizer loop.",
      "B. Increase the Generator LLM prompt temperature to force diverse refactoring strategies when the score stagnates.",
      "C. Implement a strict maximum iteration cap (e.g., N=5) and a delta-improvement threshold to terminate early if progress plateaus.",
      "D. Lower the target evaluator score to 80/100 so that all refactoring tasks terminate after the initial evaluation pass."
    ],
    "options": [
      "A. Thay thế Evaluator LLM bằng một linter tĩnh để tự động sửa docstring mà không cần chạy vòng lặp tối ưu hóa.",
      "B. Tăng nhiệt độ (temperature) trong prompt của Generator LLM để ép buộc các chiến lược tái cấu trúc đa dạng hơn khi điểm số bị đình trệ.",
      "C. Triển khai giới hạn số vòng lặp tối đa (ví dụ: N=5) và ngưỡng cải thiện chênh lệch (delta-improvement) để dừng sớm nếu tiến trình bị chững lại.",
      "D. Hạ điểm số mục tiêu của evaluator xuống 80/100 để tất cả các tác vụ tái cấu trúc dừng lại ngay sau lần đánh giá đầu tiên."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Replacing the LLM evaluator entirely with a static linter eliminates the semantic code refactoring capabilities of the optimizer pattern rather than properly governing loop convergence.",
      "Option B is incorrect: Increasing temperature increases output randomness, which can further destabilize evaluation scores and exacerbate non-convergence in the loop.",
      "Option C is correct: Establishing both a hard cap on iterations and a minimum improvement delta guarantees bounded cost and prevents infinite loops when scores plateau.",
      "Option D is incorrect: Arbitrarily lowering the static target threshold may pass low-quality outputs prematurely and does not address the underlying lack of loop control mechanisms."
    ],
    "rationale": "An Evaluator-Optimizer loop must include deterministic stopping conditions such as a maximum iteration limit and a delta convergence threshold to prevent infinite loops and runaway API costs when subjective or marginal feedback causes score stagnation.",
    "explanation": "Trong mô hình Evaluator-Optimizer, việc phụ thuộc hoàn toàn vào một ngưỡng điểm tuyệt đối có thể dẫn đến vòng lặp vô tận (infinite loop) và gia tăng chi phí API ngoài kiểm soát nếu LLM không thể đạt đến mốc điểm đó do tiêu chuẩn chủ quan.\n\n- Option A không hợp lý vì việc thay thế hoàn toàn bằng linter tĩnh sẽ làm mất đi khả năng tối ưu hóa ngữ nghĩa nâng cao của mô hình Evaluator-Optimizer.\n- Option B không giải quyết được vấn đề vì tăng temperature làm tăng tính ngẫu nhiên, có thể làm cho vòng lặp càng khó hội tụ.\n- Option C là đáp án đúng. Việc thêm giới hạn số lần lặp tối đa (max iterations cap) kết hợp với ngưỡng cải thiện tối thiểu giữa các vòng (delta improvement threshold) là giải pháp tiêu chuẩn để kiểm soát vòng lặp, đảm bảo tiến trình luôn kết thúc trong ngân sách token cho phép.\n- Option D chỉ là biện pháp tạm thời, không khắc phục được lỗi thiết kế thiếu cơ chế kiểm soát giới hạn của vòng lặp.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  },
  {
    "id": "d1-b02-1.2-012",
    "domain": "D1",
    "domainTitle": "Agent Architecture & Orchestration",
    "taskStatement": "1.2 orchestration-patterns / angle-12",
    "difficulty": "application",
    "scenarioId": "g-d1-b02-1.2-012",
    "scenarioSignature": {
      "testedPrinciple": "orchestrator retry isolation and scope tracking",
      "failureMode": "entire task pipeline rerun upon single worker failure",
      "rootCause": "lack of state persistence for successful worker subtasks",
      "requiredFix": "cache completed subtask outputs and re-delegate failed worker scope only"
    },
    "questionEN": "An agentic orchestration pipeline processes multi-region data compliance reports by delegating 4 independent tasks (US, EU, APAC, LATAM) to parallel Worker agents. During a run, US, EU, and LATAM workers complete successfully and return their validated structured JSON payloads to the Coordinator within 10 seconds, but the APAC worker fails due to an external API rate limit HTTP 429 error. Currently, the Coordinator catches the exception and restarts the entire orchestrator routine, throwing away the 3 successful worker results and re-invoking all 4 workers from scratch. Which architectural update should be applied to optimize latency and resource utilization?",
    "question": "[d1-b02-1.2-012] Một đường ống điều phối đa agent xử lý báo cáo tuân thủ dữ liệu đa quốc gia bằng cách giao 4 tác vụ độc lập (US, EU, APAC, LATAM) cho các Worker agent chạy song song. Trong một lượt chạy, các worker US, EU và LATAM hoàn thành thành công và trả kết quả JSON đã xác thực về cho Coordinator trong 10 giây, nhưng worker APAC thất bại do lỗi giới hạn tần suất HTTP 429 từ API bên ngoài. Hiện tại, Coordinator bắt ngoại lệ và khởi động lại toàn bộ quy trình điều phối, hủy bỏ kết quả của 3 worker thành công và gọi lại cả 4 worker từ đầu. Cập nhật kiến trúc nào nên được áp dụng để tối ưu hóa độ trễ và sử dụng tài nguyên?",
    "optionsEN": [
      "A. Convert the parallel orchestrator into a sequential pipeline so workers run one by one, stopping immediately on the first failure.",
      "B. Increase the execution timeout of the LATAM and EU workers to allow the APAC worker extra processing buffer.",
      "C. Implement a global retry loop on the Coordinator that re-executes all four workers concurrently until all return success.",
      "D. Persist successful worker outputs in state and configure the Coordinator to re-delegate only the failed APAC worker subtask."
    ],
    "options": [
      "A. Chuyển đổi mô hình điều phối song song thành đường ống tuần tự để các worker chạy lần lượt, dừng lại ngay khi có thất bại đầu tiên.",
      "B. Tăng thời gian chờ (timeout) của các worker LATAM và EU để cung cấp thêm vùng đệm xử lý cho worker APAC.",
      "C. Triển khai một vòng lặp thử lại (retry) toàn cục trên Coordinator để thực thi lại đồng thời cả bốn worker cho đến khi tất cả thành công.",
      "D. Lưu trữ kết quả của các worker thành công vào trạng thái (state) và cấu hình Coordinator chỉ phân công lại phần việc thất bại của worker APAC."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Converting parallel executions to sequential degrades overall system throughput and does not isolate failure handling efficiently.",
      "Option B is incorrect: Modifying timeouts of unaffected workers does not resolve rate-limiting failures occurring in a separate worker.",
      "Option C is incorrect: Re-running all workers redundantly wastes computing tokens and increases API load on endpoints that already succeeded.",
      "Option D is correct: Retaining completed subtask outputs in state memory and retrying only the unfulfilled subtask ensures resilience and prevents unnecessary duplicate work."
    ],
    "rationale": "When delegating independent subtasks across parallel workers, the coordinator should track subtask completion state, cache successful results, and selectively retry or re-assign only the failed worker's scope to avoid duplicate execution and minimize latency.",
    "explanation": "Trong mô hình điều phối Orchestrator-Workers với các tác vụ độc lập song song, việc quản lý trạng thái (state tracking) là rất quan trọng để đảm bảo tính chịu lỗi (fault tolerance).\n\n- Option A không hợp lý vì chuyển sang tuần tự làm tăng tổng thời gian thực thi và làm mất đi ưu điểm của xử lý song song.\n- Option B không đúng vì thay đổi timeout của các worker khác không giúp giải quyết lỗi rate limit HTTP 429 của worker APAC.\n- Option C gây lãng phí tài nguyên và chi phí vì gọi lại tất cả worker thành công làm trùng lặp công việc và có nguy cơ gây quá tải API.\n- Option D là đáp án đúng. Cấu hình Coordinator duy trì trạng thái đã hoàn thành của các worker trước đó và chỉ phân công lại (re-delegate) phạm vi tác vụ bị thất bại giúp tối ưu hóa hiệu năng, giảm thời gian phản hồi và tiết kiệm chi phí token.",
    "sources": [
      {
        "label": "Lesson 1.2: Orchestration Patterns",
        "url": "https://claudecertificationguide.com/learn/1-agentic-architecture/1-2-orchestration-patterns"
      }
    ]
  }
]