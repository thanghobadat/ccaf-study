[
  {
    "id": "d2-b06-2.6-007",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-07",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-007",
    "questionEN": "An AI e-commerce assistant executing a checkout tool chain calls reserve_inventory(sku=\"SKU- 8821\", qty=2, lock_token=\"LOCK - 9912\"), which returns {\"status\": \"reserved\", \"expires_in_sec\": 600}. Next, the agent calls process_payment(order_id=\"ORD - 4401\", amount=150.00, payment_method_id=\"pm_declined\"), which fails with HTTP 402 PAYMENT_FAILED. Which workflow design correctly handles this partial failure state?",
    "question": "[d2-b06-2.6-007] Một trợ lý e-commerce AI đang thực thi chuỗi công cụ thanh toán gọi reserve_inventory(sku=\"SKU - 8821\", qty=2, lock_token=\"LOCK - 9912\"), trả về {\"status\": \"reserved\", \"expires_in_sec\": 600}. Tiếp theo, agent gọi process_payment(order_id=\"ORD - 4401\", amount=150.00, payment_method_id=\"pm_declined\"), nhưng gặp lỗi HTTP 402 PAYMENT_FAILED. Thiết kế luồng xử lý nào xử lý đúng trạng thái thất bại một phần này?",
    "optionsEN": [
      "A. Retry process_payment with exponential backoff until the payment succeeds or maximum retries are reached.",
      "B. Abort the workflow and return the payment error directly to the user, allowing the inventory lock to expire naturally via its 600-second TTL.",
      "C. Execute a compensating tool call release_inventory_reservation(lock_token=\"LOCK - 9912\") to release the stock before returning the payment error.",
      "D. Re-invoke reserve_inventory with qty=1 to lower the order total, then re-attempt process_payment."
    ],
    "options": [
      "A. Thử lại process_payment với thuật toán exponential backoff cho đến khi thanh toán thành công hoặc đạt số lần thử tối đa.",
      "B. Hủy luồng công việc và trả lỗi thanh toán trực tiếp cho người dùng, để khóa kho tự hết hạn thông qua TTL 600 giây.",
      "C. Thực thi lệnh gọi công cụ bù trừ release_inventory_reservation(lock_token=\"LOCK - 9912\") để giải phóng hàng tồn kho trước khi trả về lỗi thanh toán.",
      "D. Gọi lại reserve_inventory với qty=1 để giảm tổng giá trị đơn hàng, sau đó thử lại process_payment."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A (retry payment) is incorrect because an authentication or fund decline failure (HTTP 402) will consistently fail regardless of retry backoff, while keeping inventory reserved unnecessarily.",
      "Option B (passive TTL expiration) is incorrect because leaving reserved stock locked for 10 minutes degrades inventory availability for other buyers when the failure is already known.",
      "Option C (compensating release) is correct because transactional tool chains executing multi-step operations must execute an explicit compensating transaction to undo upstream side effects when a downstream step fails.",
      "Option D (lower quantity retry) is incorrect because modifying order parameters without customer consent violates transaction integrity and does not fix the underlying payment decline."
    ],
    "rationale": "In transactional tool chaining, when an upstream tool produces side effects (reserving inventory) and a downstream tool fails (payment decline), the orchestrator must execute a compensating transaction (releasing the reservation) to maintain system consistency.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A sai vì lỗi thanh toán bị từ chối (HTTP 402) do thẻ/tài khoản không thể thử lại là lỗi cố định; việc thử lại không giải quyết được nguyên nhân và khiến tài nguyên kho bị giữ vô ích.\\n- Lựa chọn B sai vì thụ động chờ TTL (600 giây) hết hạn sẽ giữ giữ chỗ hàng tồn kho bất cần thiết, làm giảm lượng hàng có sẵn cho các khách hàng khác.\\n- Lựa chọn C đúng vì trong kiến trúc chuỗi công cụ có giao dịch (transactional tool chains), nếu một bước phía sau (thanh toán) thất bại sau khi bước phía trước (giữ kho) đã tạo tác dụng phụ, hệ thống phải thực thi giao dịch bù trừ (compensating transaction) release_inventory_reservation để hoàn tác tác dụng phụ, giữ cho dữ liệu hệ thống nhất quán.\\n- Lựa chọn D sai vì việc tự ý thay đổi số lượng đơn hàng mà không có sự đồng ý của khách hàng làm vi phạm tính toàn vẹn của giao dịch và không giải quyết được lỗi thanh toán.",
    "scenarioSignature": {
      "testedPrinciple": "compensating action execution for partial failure in sequential transactional tool chains",
      "failureMode": "downstream payment tool failure leaving upstream reserved inventory locked",
      "rootCause": "lack of automated compensation mechanism to roll back upstream side effects upon downstream execution failure",
      "requiredFix": "call compensating tool to release inventory reservation prior to raising failure state to user"
    },
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  },
  {
    "id": "d2-b06-2.6-008",
    "domain": "D2",
    "domainTitle": "Tool Design & MCP Integration",
    "taskStatement": "2.6 tool-chaining / angle-08",
    "difficulty": "application",
    "scenarioId": "g-d2-b06-2.6-008",
    "questionEN": "An AI workspace assistant calls get_customer_profile(customer_id=\"CUST- 1049\"), returning {\"version\": 4, \"email\": \"\n\nuser@old.com\n\"}. Before the assistant executes update_customer_email(customer_id=\"CUST - 1049\", new_email=\"\n\nuser@new.com\n\", expected_version=4), an external service updates the record, bumping its DB version to 5. The update call fails with HTTP 409 Conflict (VERSION_MISMATCH). What is the correct tool-chain recovery pattern?",
    "question": "[d2-b06-2.6-008] Một trợ lý workspace AI gọi get_customer_profile(customer_id=\"CUST - 1049\"), trả về {\"version\": 4, \"email\": \"\n\nuser@old.com\n\"}. Trước khi assistant thực thi update_customer_email(customer_id=\"CUST - 1049\", new_email=\"\n\nuser@new.com\n\", expected_version=4), một dịch vụ bên ngoài đã cập nhật bản ghi, nâng phiên bản DB lên 5. Lệnh gọi cập nhật thất bại với lỗi HTTP 409 Conflict (VERSION_MISMATCH). Mẫu phục hồi chuỗi công cụ (tool-chain recovery pattern) nào là đúng?",
    "optionsEN": [
      "A. Execute force_update_customer_email(customer_id=\"CUST - 1049\", new_email=\"\n\nuser@new.com\n\") to bypass version checking.",
      "B. Immediately retry update_customer_email using expected_version=5 without re-querying the customer profile.",
      "C. Increment the expected_version parameter locally in memory to 5 and loop the update call until accepted.",
      "D. Re-invoke get_customer_profile to retrieve the latest state (version 5), verify update preconditions, and call update_customer_email with expected_version=5."
    ],
    "options": [
      "A. Thực thi force_update_customer_email(customer_id=\"CUST - 1049\", new_email=\"\n\nuser@new.com\n\") để bỏ qua kiểm tra phiên bản.",
      "B. Thử lại ngay lập tức update_customer_email với expected_version=5 mà không cần truy vấn lại hồ sơ khách hàng.",
      "C. Tự tăng tham số expected_version trong bộ nhớ lên 5 và lặp lại lệnh gọi cập nhật cho đến khi được chấp nhận.",
      "D. Gọi lại get_customer_profile để lấy trạng thái mới nhất (version 5), xác minh lại điều kiện cập nhật và gọi update_customer_email với expected_version=5."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A (force update) is incorrect because bypassing version control overwrites concurrent updates performed by external services, causing silent data loss.",
      "Option B (blind version increment retry) is incorrect because assuming only the version changed without reading the updated payload risks applying modifications onto invalid underlying state.",
      "Option C (local memory increment loop) is incorrect because blindly guessing or auto-incrementing version numbers violates optimistic concurrency control guarantees.",
      "Option D (re-fetch current state before retry) is correct because optimistic locking recovery requires re-reading the latest source-of-truth state via get_customer_profile to obtain the updated version (5) and validate that the proposed modification remains safe before retrying."
    ],
    "rationale": "Optimistic locking validation ensures concurrent update safety. When a downstream write tool fails with a version mismatch conflict (HTTP 409), the tool chain must re-read entity state to acquire the fresh version and verify state consistency before re-issuing the update.",
    "explanation": "Phân tích chi tiết từng lựa chọn:\\n- Lựa chọn A sai vì việc ép buộc cập nhật bỏ qua kiểm tra phiên bản sẽ ghi đè lên các thay đổi đồng thời của hệ thống khác, dẫn đến mất dữ liệu ẩn (silent data corruption/lost update).\\n- Lựa chọn B sai vì tự ý tăng expected_version=5 mà không đọc lại dữ liệu mới có thể dẫn đến việc ghi đè lên dữ liệu vừa bị thay đổi bởi giao dịch khác mà agent không hề hay biết.\\n- Lựa chọn C sai vì việc lặp lại tăng số phiên bản trong bộ nhớ vi phạm nguyên tắc của khóa lạc quan (optimistic locking), biến cơ chế bảo vệ thành một phán đoán mù quáng.\\n- Lựa chọn D đúng vì quy trình phục hồi khóa lạc quan chuẩn yêu cầu agent đọc lại bản ghi từ nguồn sự thật (source of truth) bằng get_customer_profile để lấy phiên bản mới nhất (version 5), kiểm tra lại tính hợp lệ của dữ liệu trước khi thực thi update_customer_email với expected_version=5.",
    "scenarioSignature": {
      "testedPrinciple": "optimistic locking version validation in sequential read-write tool chains",
      "failureMode": "downstream mutation tool rejection due to concurrent modification version mismatch",
      "rootCause": "stale version reference in downstream payload resulting from concurrent update after initial read tool call",
      "requiredFix": "re-invoke read tool to fetch current entity state and updated version prior to retrying write tool call"
    },
    "sources": [
      {
        "label": "Lesson 2.6: Tool Chaining",
        "url": "https://claudecertificationguide.com/learn/2-tool-design-mcp/2-6-tool-chaining"
      }
    ]
  }
]