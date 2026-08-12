[
  {
    "id": "d4-b08-4.1-001",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-01",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-001",
    "scenarioSignature": {
      "testedPrinciple": "explicit evaluation criteria definition",
      "failureMode": "high false positive rate in automated code audit",
      "rootCause": "vague evaluation instruction in system prompt",
      "requiredFix": "define precise multi-condition criteria and severity threshold"
    },
    "questionEN": "A platform team at CloudScale deploys an automated PR security audit bot using Claude 3.5 Sonnet. The system prompt is configured with: 'You are a static analysis assistant. Review the provided code diff and flag all potential issues.' During benchmark evaluation across 200 pull requests, the bot exhibits a 60% false positive rate, flagging standard logging statements and harmless variable assignments as high-severity vulnerabilities. Which system prompt modification most effectively resolves this failure mode?",
    "question": "[d4-b08-4.1-001] Đội ngũ nền tảng tại CloudScale triển khai bot kiểm toán bảo mật PR tự động sử dụng Claude 3.5 Sonnet. System prompt được cấu hình: 'You are a static analysis assistant. Review the provided code diff and flag all potential issues.' Trong quá trình đánh giá benchmark trên 200 pull request, bot ghi nhận tỷ lệ báo động giả 60%, đánh dấu các câu lệnh logging tiêu chuẩn và việc gán biến vô hại là lỗ hổng nghiêm trọng. Sự điều chỉnh system prompt nào sau đây giải quyết hiệu quả nhất lỗi này?",
    "optionsEN": [
      "A. Update the system prompt to explicitly define exact criteria: 'Flag security findings only if unescaped user input flows into a database query or shell command without validation.'",
      "B. Append a reminder to the end of each user prompt requesting the model to double-check its confidence before returning findings.",
      "C. Switch the system prompt role to 'You are an aggressive penetration tester who identifies even theoretical vulnerabilities.'",
      "D. Increase the temperature parameter from 0.0 to 0.7 to encourage more diverse reasoning across edge cases."
    ],
    "options": [
      "A. Cập nhật system prompt để định nghĩa rõ ràng các tiêu chí cụ thể: 'Chỉ báo cáo phát hiện bảo mật nếu dữ liệu nhập từ người dùng chưa được escape đi vào truy vấn cơ sở dữ liệu hoặc lệnh shell mà không qua kiểm tra.'",
      "B. Thêm lời nhắc vào cuối mỗi user prompt yêu cầu mô hình kiểm tra lại độ tin cậy trước khi trả về kết quả phát hiện.",
      "C. Đổi vai trò trong system prompt thành 'Bạn là một chuyên gia kiểm thử xâm nhập quyết liệt, người tìm kiếm cả những lỗ hổng lý thuyết.'",
      "D. Tăng tham số temperature từ 0.0 lên 0.7 để khuyến khích lý giải đa dạng hơn trên các trường hợp biên."
    ],
    "correct": 0,
    "optionExplanations": [
      "Option A is correct because replacing vague instructions ('flag all potential issues') with explicit, multi-condition filtering criteria grounds the model on precise vulnerability vectors, eliminating noise and reducing the 60% false positive rate.",
      "Option B is incorrect because adding a generic user prompt suffix does not remedy the ambiguous system evaluation criteria that caused the model to treat benign code as vulnerable.",
      "Option C is incorrect because directing the model to act as an aggressive penetration tester will increase, rather than decrease, the generation of theoretical and low-signal false positives.",
      "Option D is incorrect because raising temperature increases output randomness, which exacerbates false positives rather than standardizing strict criterion matching."
    ],
    "rationale": "Vague system prompt directives like 'flag all potential issues' force the model to adopt an overly broad interpretation of risk. Supplying explicit system criteria (defining inputs, sinks, and required missing controls) constrains the evaluation boundary and directly resolves high false positive rates.",
    "explanation": "Lựa chọn A đúng vì việc thay thế chỉ thị mơ hồ ('flag all potential issues') bằng các tiêu chí đánh giá rõ ràng (luồng dữ liệu người dùng không qua kiểm tra đi vào sink nguy hiểm) giúp mô hình giới hạn chính xác phạm vi phát hiện, trực tiếp hạ thấp tỷ lệ báo động giả 60%.\nLựa chọn B sai vì lời nhắc bổ sung ở user prompt không khắc phục được tiêu chí đánh giá mơ hồ vốn có ở cấp độ system prompt.\nLựa chọn C sai vì đóng vai penetration tester quyết liệt sẽ khiến mô hình đưa ra nhiều cảnh báo giả mang tính lý thuyết hơn.\nLựa chọn D sai vì tăng temperature làm tăng độ ngẫu nhiên của kết quả, không giúp chuẩn hóa tiêu chí kiểm tra.",
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  },
  {
    "id": "d4-b08-4.1-002",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-02",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-002",
    "scenarioSignature": {
      "testedPrinciple": "negative evaluation criteria specification",
      "failureMode": "incorrect flag of test mocks as production defects",
      "rootCause": "absence of explicit exclusion rules for test files in system prompt",
      "requiredFix": "add explicit negative criteria excluding test code and mock patterns"
    },
    "questionEN": "An automated code reviewer uses a system prompt: 'Identify functions that lack try-catch blocks or exception handling wrapper calls.' During execution against the repository PaymentGateway-Service, the reviewer flags 45 valid test mock files (e.g., mock_payment_client.py) as critical defects due to unhandled synthetic errors. How should the system prompt be modified to correct this behavior without breaking production code checks?",
    "question": "[d4-b08-4.1-002] Một hệ thống đánh giá mã nguồn tự động sử dụng system prompt: 'Identify functions that lack try-catch blocks or exception handling wrapper calls.' Khi chạy trên kho lưu trữ PaymentGateway-Service, hệ thống báo cáo 45 tệp test mock hợp lệ (ví dụ: mock_payment_client.py) là lỗi nghiêm trọng do chứa lỗi giả lập không được xử lý. System prompt nên được điều chỉnh thế nào để khắc phục hành vi này mà không ảnh hưởng tới việc kiểm tra mã nguồn sản xuất?",
    "optionsEN": [
      "A. Add a dynamic user prompt prefix asking the user to manually filter out test files before submitting code diffs.",
      "B. Add explicit negative criteria to the system prompt: 'Do NOT flag functions inside test directories (test.py, mock.py) or methods intentionally throwing synthetic test exceptions.'",
      "C. Modify the prompt to instruct the model to wrap all unhandled exceptions in dummy try-catch blocks automatically.",
      "D. Lower the model max_tokens parameter so that long test mock files are truncated before evaluation."
    ],
    "options": [
      "A. Thêm tiền tố động ở user prompt yêu cầu người dùng tự lọc thủ công các tệp test trước khi gửi diff mã nguồn.",
      "B. Thêm các tiêu chí phủ định (negative criteria) rõ ràng vào system prompt: 'KHÔNG báo cáo các hàm nằm trong thư mục test (test.py, mock.py) hoặc các phương thức cố tình ném ngoại lệ giả lập cho mục đích kiểm thử.'",
      "C. Sửa đổi prompt để hướng dẫn mô hình tự động bọc tất cả ngoại lệ chưa xử lý vào các khối try-catch giả.",
      "D. Giảm tham số max_tokens của mô hình để các tệp test mock dài bị cắt ngắn trước khi đánh giá."
    ],
    "correct": 1,
    "optionExplanations": [
      "Option A is incorrect because requiring human pre-filtering bypasses the system prompt engineering objective and ruins automation.",
      "Option B is correct because adding explicit negative criteria ('Do NOT flag...') instructs the model on what scope/patterns to ignore, preventing test mocks from triggering missing-error-handling alerts.",
      "Option C is incorrect because automatically inserting dummy try-catch blocks mutates code semantics incorrectly rather than refining evaluation criteria.",
      "Option D is incorrect because truncating tokens causes incomplete reviews and unpredicted parsing errors rather than scope filtering."
    ],
    "rationale": "System prompts require negative criteria (explicit rules specifying what NOT to flag) alongside positive rules. Explicitly excluding test files and synthetic mock exceptions prevents valid test constructs from being misidentified as error-handling defects.",
    "explanation": "Lựa chọn A sai vì việc bắt người dùng lọc thủ công làm mất đi tính tự động hóa của quy trình kiểm toán.\nLựa chọn B đúng vì bổ sung tiêu chí phủ định (negative criteria) trực tiếp ra lệnh cho mô hình bỏ qua các tệp test và mock ngoại lệ cố ý, ngăn ngừa việc báo lỗi sai trên mã kiểm thử.\nLựa chọn C sai vì tự động bọc try-catch rỗng làm thay đổi ngữ nghĩa của mã nguồn thay vì cải thiện tiêu chí kiểm toán.\nLựa chọn D sai vì giảm max_tokens gây đứt đoạn dữ liệu đầu vào và phát sinh lỗi không dự đoán được.",
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  }
]