[
  {
    "id": "d4-b09-4.5-003",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-03",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-003",
    "scenarioSignature": {
      "testedPrinciple": "mandatory field enforcement in tool schemas",
      "failureMode": "silent omission of critical output attributes",
      "rootCause": "missing required array declaration in json schema",
      "requiredFix": "define mandatory attributes in top level schema required list"
    },
    "questionEN": "A medical invoice processing pipeline uses a tool schema named extract_invoice_details to extract financial records. The schema defines properties for patient_id, provider_tax_id, line_items, and total_amount. During production evaluation, the model silently omits provider_tax_id in 8% of extractions when the tax ID formatting is ambiguous. Which schema modification guarantees that the model includes provider_tax_id in every tool call payload?",
    "question": "[d4-b09-4.5-003] Một hệ thống xử lý hóa đơn y tế sử dụng schema công cụ có tên extract_invoice_details để trích xuất hồ sơ tài chính. Schema định nghĩa các thuộc tính patient_id, provider_tax_id, line_items và total_amount. Trong quá trình đánh giá sản xuất, mô hình lặng lẽ bỏ qua provider_tax_id trong 8% số lần trích xuất khi định dạng mã số thuế không rõ ràng. Thay đổi schema nào đảm bảo mô hình luôn bao gồm provider_tax_id trong mọi tải dữ liệu gọi công cụ (tool call payload)?",
    "optionsEN": [
      "A. Increase temperature to 0.7 and implement client-side retries when provider_tax_id is null.",
      "B. Wrap provider_tax_id inside a nested object schema configured with additionalProperties set to false.",
      "C. Add provider_tax_id to the top-level required array within the tool_use schema definition.",
      "D. Apply format: email to the provider_tax_id property definition in the tool schema."
    ],
    "options": [
      "A. Tăng temperature lên 0.7 và triển khai thử lại ở phía client khi provider_tax_id bị null.",
      "B. Bọc provider_tax_id bên trong một schema đối tượng lồng nhau được cấu hình với additionalProperties bằng false.",
      "C. Thêm provider_tax_id vào mảng required ở cấp cao nhất trong khai báo schema tool_use.",
      "D. Áp dụng format: email cho định nghĩa thuộc tính provider_tax_id trong schema của tool."
    ],
    "correct": 2,
    "optionExplanations": [
      "Option A is incorrect: Adjusting temperature and adding client-side retries does not alter schema structural validation rules and adds unpredictable latency without guaranteeing field generation.",
      "Option B is incorrect: Wrapping a string property inside a nested object schema increases nesting complexity but does not mandate the presence of the field at the top level.",
      "Option C is correct: Declaring provider_tax_id inside the JSON schema required array forces the tool execution engine to validate that provider_tax_id is present in every tool call output.",
      "Option D is incorrect: Setting format validation like email evaluates string patterns when present but does not enforce field inclusion if the model omits the key entirely."
    ],
    "rationale": "In JSON Schema enforcement for tool_use, properties listed under the top-level required array must be included in the generated tool arguments. Without provider_tax_id in required, the model treats it as optional and may omit it when source text is ambiguous.",
    "explanation": "Trong việc thực thi JSON Schema cho tool_use, các thuộc tính được liệt kê trong mảng required ở cấp cao nhất bắt buộc phải xuất hiện trong các đối số do mô hình tạo ra. Nếu thiếu provider_tax_id trong danh sách required, mô hình coi thuộc tính này là tùy chọn và có thể lặng lẽ bỏ qua nó khi văn bản đầu vào không rõ ràng.\n\n- Option A sai: Tăng temperature và thử lại ở client không thay đổi quy tắc kiểm định của schema và gây ra độ trễ không cần thiết mà không đảm bảo trường sẽ xuất hiện.\n- Option B sai: Bọc trường trong đối tượng lồng nhau chỉ làm tăng độ phức tạp của schema chứ không bắt buộc sự hiện diện của trường ở cấp gốc.\n- Option C đúng: Thêm provider_tax_id vào mảng required của schema công cụ sẽ buộc trình thực thi tool call từ chối các phản hồi thiếu trường này, đảm bảo mô hình luôn cung cấp nó.\n- Option D sai: Ràng buộc format chỉ áp dụng định dạng cho giá trị chuỗi khi nó tồn tại, không thể bắt buộc mô hình phải tạo ra khóa đó nếu bị bỏ qua.",
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  },
  {
    "id": "d4-b09-4.5-004",
    "domain": "D4",
    "domainTitle": "Prompt Engineering & Structured Output",
    "taskStatement": "4.5 structured-output / angle-04",
    "difficulty": "application",
    "scenarioId": "g-d4-b09-4.5-004",
    "questionEN": "An automated support ticket classification service invokes an update_ticket_status tool. The schema defines a string property named ticket_status with a natural language description asking for snake_case values. During high-volume processing, the model generates \"In Progress\" instead of \"in_progress\", triggering database write exceptions in a strict PostgreSQL enum column. Which schema definition fix ensures valid status string output?",
    "question": "[d4-b09-4.5-004] Một dịch vụ phân loại vé hỗ trợ tự động gọi công cụ update_ticket_status. Schema định nghĩa một thuộc tính chuỗi có tên ticket_status với mô tả bằng ngôn ngữ tự nhiên yêu cầu các giá trị dạng snake_case. Trong quá trình xử lý lưu lượng lớn, mô hình tạo ra \"In Progress\" thay vì \"in_progress\", gây ra ngoại lệ ghi cơ sở dữ liệu trong cột enum nghiêm ngặt của PostgreSQL. Sửa đổi định nghĩa schema nào đảm bảo đầu ra chuỗi trạng thái luôn hợp lệ?",
    "optionsEN": [
      "A. Set additionalProperties to false on the root schema object to enforce property casing.",
      "B. Prefill the assistant message turn with {\"ticket_status\": \"in_progress\" to direct output token casing.",
      "C. Add a regular expression pattern: \" ^ [a - z_] + $\" to the ticket_status string property schema.",
      "D. Define an explicit enum array [\"open\", \"in_progress\", \"resolved\", \"escalated\"] under the ticket_status schema."
    ],
    "options": [
      "A. Đặt additionalProperties thành false trên đối tượng schema gốc để bắt buộc kiểu chữ của thuộc tính.",
      "B. Điền trước (prefill) lượt tin nhắn của assistant với {\"ticket_status\": \"in_progress\" để định hướng kiểu chữ của token đầu ra.",
      "C. Thêm một biểu thức chính quy pattern: \" ^ [a - z_] + $\" vào schema thuộc tính chuỗi ticket_status.",
      "D. Khai báo một mảng enum rõ ràng [\"open\", \"in_progress\", \"resolved\", \"escalated\"] bên dưới schema ticket_status."
    ],
    "correct": 3,
    "optionExplanations": [
      "Option A is incorrect: Setting additionalProperties to false prevents undeclared fields from being added to the JSON object but does not constrain the value domain of defined string properties.",
      "Option B is incorrect: Assistant turn prefilling forces an initial prompt string prefix but cannot restrict or normalize dynamic enum string generation within tool calls.",
      "Option C is incorrect: Adding a regex pattern restricts allowed characters to lowercase letters and underscores but does not restrict output strictly to the allowed domain values required by the database.",
      "Option D is correct: Adding an explicit enum array under ticket_status constrains the model's token sampling to the exact allowed identifiers, preventing unnormalized outputs like \"In Progress\"."
    ],
    "rationale": "Natural language instructions in field descriptions are soft constraints that models can violate under varied inputs. Using the JSON schema enum attribute explicitly restricts valid outputs to predefined string literals, guaranteeing database compatibility.",
    "explanation": "Các hướng dẫn bằng ngôn ngữ tự nhiên trong phần mô tả trường chỉ là ràng buộc mềm mà mô hình có thể vi phạm khi gặp đầu vào đa dạng. Việc sử dụng thuộc tính enum trong JSON schema sẽ giới hạn các đầu ra hợp lệ vào đúng danh sách chuỗi được định nghĩa trước, đảm bảo tính tương thích với cơ sở dữ liệu.\\n\\n- Option A sai: Đặt additionalProperties thành false chỉ ngăn chặn việc thêm các trường không được khai báo vào đối tượng JSON chứ không giới hạn tập giá trị của thuộc tính chuỗi.\\n- Option B sai: Điền trước (prefill) lượt của assistant ép kiểu cho phần đầu chuỗi phản hồi nhưng không thể ràng buộc hoặc chuẩn hóa việc tạo enum động trong gọi công cụ.\\n- Option C sai: Thêm regex pattern chỉ giới hạn các ký tự cho phép (chữ thường và dấu gạch dưới) chứ không bắt buộc mô hình phải chọn chính xác một trong các giá trị danh mục hợp lệ.\\n- Option D đúng: Việc khai báo một mảng enum rõ ràng bên dưới ticket_status sẽ ràng buộc lấy mẫu token của mô hình vào đúng các định danh cho phép, ngăn chặn các đầu ra không chuẩn hóa như \"In Progress\".",
    "scenarioSignature": {
      "testedPrinciple": "strict value domain restriction via enum constraints",
      "failureMode": "unnormalized string output breaching system validation",
      "rootCause": "omission of enum property specification in string schema",
      "requiredFix": "add explicit enum array to property definition"
    },
    "sources": [
      {
        "label": "Lesson 4.5: Structured Output",
        "url": "https://claudecertificationguide.com/learn/4-prompt-engineering/4-5-structured-output"
      }
    ]
  }
]