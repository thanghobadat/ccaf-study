[
  {
    "id": "d4-b08-4.1-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-003",
    "questionEN": "A DevSecOps team deploys an automated security-reviewer microservice using the Claude API (claude-3-7-sonnet) to review Infrastructure-as-Code Terraform pull requests. The system prompt is configured as: \"You are a helpful programming assistant eager to assist developers with their code.\" During security reviews of S3 bucket definitions, the agent flags unencrypted buckets but marks missing public access blocks as PASS with comments like \"This looks fine for testing purposes, but consider blocking public access in production, \" resulting in 0 critical severity findings recorded for 14 insecure Terraform modules merged into main. What is the root cause and required fix for this lenient evaluation behavior?",
    "question": "[d4-b08-4.1-003] Một đội ngũ DevSecOps triển khai microservice security-reviewer sử dụng Claude API (claude-3-7-sonnet) để kiểm tra các file Terraform Infrastructure-as-Code trong pull request. System prompt được cấu hình: \"You are a helpful programming assistant eager to assist developers with their code.\" Trong đợt kiểm tra các cấu hình S3 bucket, agent phát hiện các bucket chưa bật mã hóa nhưng lại đánh dấu các rào cản truy cập công cộng (public access block) bị thiếu là PASS kèm ghi chú \"Cấu hình này tạm ổn cho môi trường test, nhưng nên chặn truy cập công cộng ở production, \" dẫn đến 0 phát hiện mức độ nghiêm trọng được ghi nhận cho 14 module Terraform không an toàn đã hợp nhất vào nhánh main. Nguyên nhân gốc rễ và giải pháp khắc phục cho hành vi đánh giá quá lỏng lẻo này là gì?",
    "optionsEN": [
      "A. Increase the model temperature parameter from 0.2 to 0.8 so the model generates a broader range of security vulnerability types during Terraform analysis.",
      "B. Add a user prompt instruction requesting the assistant to output security findings structured strictly as JSON objects instead of markdown text blocks.",
      "C. Replace the \"helpful assistant\" system prompt persona with a strict DevSecOps auditor role that enforces zero-tolerance compliance criteria regardless of developer intent.",
      "D. Configure the Claude API call with max_tokens set to 4096 to ensure response generation completes without early output truncation."
    ],
    "options": [
      "A. Tăng tham số temperature của model từ 0.2 lên 0.8 để model tạo ra nhiều loại lỗ hổng bảo mật đa dạng hơn trong quá trình phân tích Terraform.",
      "B. Thêm hướng dẫn vào user prompt yêu cầu assistant xuất kết quả phát hiện bảo mật dưới dạng đối tượng JSON thay vì các khối văn bản markdown.",
      "C. Thay thế persona \"helpful assistant\" trong system prompt bằng vai trò kiểm toán viên DevSecOps nghiêm ngặt, tuân thủ các tiêu chí tuân thủ không ngoại lệ bất kể ý định của lập trình viên.",
      "D. Cấu hình lời gọi Claude API với max_tokens bằng 4096 để đảm bảo quá trình tạo phản hồi hoàn tất mà không bị cắt ngắn sớm."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Increasing temperature introduces output randomness but does not alter the underlying lenient persona or compel strict security compliance enforcement.",
      "Option B is incorrect: Structuring the output as JSON facilitates downstream parsing but leaves the agent's permissive security evaluation criteria completely unchanged.",
      "Option C is correct: Changing the system prompt persona from a helpful assistant to a strict DevSecOps auditor re-aligns the model's core instruction framing, ensuring non-compliant Terraform configurations are flagged as severe policy violations without permissive assumptions.",
      "Option D is incorrect: Increasing max_tokens prevents response truncation during long outputs but does not resolve the agent's lenient decision-making logic."
    ],
    "rationale": "System prompts set the persona, tone, and operational boundaries for an LLM agent. A persona configured as a helpful assistant naturally prioritizes constructive feedback and developer convenience, leading to overly permissive evaluations. Re-framing the persona as a strict DevSecOps auditor enforces zero-tolerance compliance criteria.",
    "explanation": "Option A sai vì tăng temperature chỉ làm tăng tính ngẫu nhiên của câu trả lời chứ không làm thay đổi tư duy hay vai trò thân thiện, linh hoạt của persona \"helpful assistant\". Option B sai vì định dạng đầu ra JSON giúp hệ thống phía sau dễ parse dữ liệu hơn nhưng không giải quyết được tiêu chí đánh giá quá lỏng lẻo của model. Option C đúng vì system prompt định hình vai trò và mục tiêu cho model. Việc chuyển từ persona \"trợ lý hỗ trợ\" sang \"kiểm toán viên bảo mật nghiêm ngặt\" sẽ buộc model áp dụng tiêu chí tuân thủ chặt chẽ và không đưa ra giả định thông cảm cho mã không an toàn. Option D sai vì tăng max_tokens giải quyết việc phản hồi bị cắt đứt do giới hạn độ dài token, không ảnh hưởng đến logic phân tích bảo mật của model.",
    "scenarioSignature": {
      "testedPrinciple": "system prompt persona alignment for security enforcement",
      "failureMode": "security audit agent approves non compliant code due to lenient tone",
      "rootCause": "system prompt configures general helpful assistant persona instead of strict auditor role",
      "requiredFix": "reframe system prompt persona as adversarial security compliance auditor"
    },
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  },
  {
    "id": "d4-b08-4.1-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.1 system-prompts / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b08-4.1-004",
    "questionEN": "A security engineering team integrates a code-guard CLI tool into their GitHub Actions pull request workflow (.github/workflows/security-scan.yml) for automated code auditing. The system prompt contains the restrictive scope constraint: \"Your sole task is to identify SQL injection vulnerabilities(CWE- 89) in database query strings; ignore all other code issues.\" During an audit of a Python FastAPI backend pull request, the agent successfully flags 2 SQL injection flaws in db/queries.py but fails to report 8 other critical security vulnerabilities including hardcoded JWT secrets, unvalidated CORS origins, and Command Injection (os.system) calls in api/routes.py. Which modification resolves this omission failure?",
    "question": "[d4-b08-4.1-004] Đội ngũ kỹ thuật bảo mật tích hợp công cụ code-guard CLI vào GitHub Actions workflow (.github/workflows/security-scan.yml) để tự động kiểm toán mã nguồn trong PR. System prompt chứa ràng buộc thu hẹp phạm vi: \"Your sole task is to identify SQL injection vulnerabilities(CWE - 89) in database query strings; ignore all other code issues.\" Trong đợt kiểm toán một PR backend Python FastAPI, agent gắn cờ chính xác 2 lỗi SQL injection trong db/queries.py nhưng bỏ qua hoàn toàn 8 lỗ hổng nghiêm trọng khác bao gồm hardcoded JWT secrets, cấu hình CORS không hợp lệ và lỗi Command Injection (os.system) trong api/routes.py. Thay đổi nào sẽ giải quyết triệt để sự cố bỏ sót này?",
    "optionsEN": [
      "A. Add a top_p sampling parameter of 0.1 to the API request payload to force deterministic vulnerability scanning across all codebase files.",
      "B. Duplicate the SQL injection detection rule inside the user prompt role array to increase system instruction priority.",
      "C. Change the API model parameter from claude-3-7-sonnet to claude-3-5-haiku to allow executing multiple fast scanning passes per pull request.",
      "D. Revise the system prompt evaluation scope to analyze code against comprehensive vulnerability frameworks like OWASP Top 10 rather than restricting analysis solely to SQL injection."
    ],
    "options": [
      "A. Thêm tham số lấy mẫu top_p bằng 0.1 vào API request payload để ép buộc việc quét lỗ hổng diễn ra mang tính xác định trên mọi tập tin mã nguồn.",
      "B. Tăng ưu tiên của hướng dẫn bằng cách lặp lại quy tắc phát hiện SQL injection hai lần bên trong mảng vai trò user prompt.",
      "C. Thay đổi tham số model API từ claude-3-7-sonnet sang claude-3-5-haiku để cho phép thực hiện nhiều lượt quét nhanh trên mỗi pull request.",
      "D. Sửa đổi phạm vi đánh giá của system prompt để phân tích mã nguồn dựa trên các khuôn khổ lỗ hổng toàn diện như OWASP Top 10 thay vì giới hạn phân tích duy nhất vào SQL injection."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Adjusting top_p alters sampling probability distribution but cannot override the prompt constraint explicitly telling the model to ignore non-SQL injection issues.",
      "Option B is incorrect: Duplicating rules in the user prompt reinforces existing narrow constraints rather than expanding detection boundaries to cover missing risk vectors.",
      "Option C is incorrect: Switching to a faster model reduces latency and cost but maintains the restrictive scope instruction programmed into the system prompt.",
      "Option D is correct: Expanding the system prompt scope to encompass broader security frameworks like OWASP Top 10 enables the LLM to inspect and flag multiple vulnerability categories (Command Injection, Secret exposure, CORS misconfigurations) alongside SQL injection."
    ],
    "rationale": "System prompts define the operational scope and boundary limits for LLM tasks. Restricting the prompt scope exclusively to a single flaw category prevents the model from inspecting or reporting other critical vulnerabilities. Expanding the system prompt criteria to comprehensive standards (e.g., OWASP Top 10) resolves the omission failure.",
    "explanation": "Option A sai vì thay đổi top_p chỉ điều chỉnh phân phối xác suất sinh token, không thể ghi đè lệnh cấm quét các loại lỗ hổng khác đã ghi trong system prompt. Option B sai vì lặp lại hướng dẫn trong user prompt chỉ củng cố thêm quy tắc thu hẹp phạm vi hiện tại chứ không mở rộng được khả năng phát hiện lỗ hổng. Option C sai vì đổi sang model nhỏ hơn chỉ cải thiện tốc độ và chi phí, nhưng với system prompt bị giới hạn phạm vi thì model mới vẫn sẽ bỏ qua 8 lỗ hổng kia. Option D đúng vì phạm vi trong system prompt đang bị thu hẹp quá mức (\"Your sole task is to identify SQL injection...\"). Việc mở rộng scope sang các tiêu chuẩn như OWASP Top 10 giúp agent phân tích và phát hiện đầy đủ các loại lỗ hổng nghiêm trọng khác như Command Injection và rò rỉ JWT secret.",
    "scenarioSignature": {
      "testedPrinciple": "system prompt scope boundaries for comprehensive detection",
      "failureMode": "security audit agent ignores critical vulnerability types due to narrow focus",
      "rootCause": "system prompt restricts detection scope exclusively to single vulnerability pattern",
      "requiredFix": "broaden system prompt security evaluation criteria across comprehensive vulnerability categories"
    },
    "sources": [
      {
        "label": "Lesson 4.1: System Prompts",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-1-system-prompts"
      }
    ]
  }
]