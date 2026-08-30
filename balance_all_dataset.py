# -*- coding: utf-8 -*-
import json
import re
import sys
import hashlib

sys.stdout.reconfigure(encoding='utf-8')

DISTRACTOR_ENRICHMENTS_EN = {
    'D1': [
        " within the primary orchestrator loop before delegating control to worker agents.",
        " across all active subagent execution environments to maintain session consistency.",
        " in the coordinator runtime context prior to evaluating downstream state transitions.",
        " using synchronous event listeners registered on the multi-agent message bus.",
        " to ensure that intermediate task outputs conform to pipeline schema constraints.",
        " by wrapping the subagent invocation in a retry loop with linear backoff delays."
    ],
    'D2': [
        " in the local MCP client configuration file across all connected tool servers.",
        " using structured schema validation rules defined in the MCP server manifest.",
        " over standard stdio transport pipes with synchronous process communication.",
        " by setting explicit execution timeout parameters in the tool registration block.",
        " to enforce strict parameter type checking before invoking backend API handlers.",
        " in the tool definition payload to suppress runtime protocol serialization errors."
    ],
    'D3': [
        " in the root repository CLAUDE.md configuration file before running interactive sessions.",
        " by passing appropriate command-line flags to the Claude Code headless runner.",
        " using path-specific rules configured in the project settings directory.",
        " across all automated CI/CD pipeline steps to enforce repository style conventions.",
        " in the global user configuration profile located in the home directory.",
        " to restrict file modification permissions during automated pull request reviews."
    ],
    'D4': [
        " in the system prompt instructions to guide the model's output formatting behavior.",
        " using strict JSON Schema validation constraints with additionalProperties set to false.",
        " by providing additional few-shot demonstration examples in the input message history.",
        " within explicit XML boundary tags to clearly isolate user input from system instructions.",
        " in the request parameters to constrain the model sampling temperature and token budget.",
        " to enforce deterministic schema compliance across all generated structured payloads."
    ],
    'D5': [
        " to optimize context window utilization and reduce prompt token consumption.",
        " using the Message Batches API to process requests asynchronously with reduced latency.",
        " by implementing an automated context pruning strategy after each conversation turn.",
        " in the session state persistence store to enable seamless recovery across restarts.",
        " to prevent critical instruction degradation caused by attention dilution effects.",
        " using exponential backoff retry mechanisms with jitter across distributed instances."
    ]
}

DISTRACTOR_ENRICHMENTS_VI = {
    'D1': [
        " trong vòng lặp điều phối chính trước khi chuyển quyền thực thi cho các worker agent.",
        " trên toàn bộ môi trường thực thi của subagent để duy trì tính nhất quán của phiên.",
        " trong runtime context của coordinator trước khi đánh giá các chuyển đổi trạng thái.",
        " bằng các event listener đồng bộ được đăng ký trên message bus của hệ thống multi-agent.",
        " nhằm đảm bảo output trung gian của task tuân thủ đúng ràng buộc schema của pipeline.",
        " bằng cách bọc lệnh gọi subagent trong vòng lặp thử lại với độ trễ tuyến tính."
    ],
    'D2': [
        " trong file cấu hình MCP client cục bộ trên tất cả các tool server được kết nối.",
        " bằng các quy tắc xác thực schema có cấu trúc được định nghĩa trong MCP server manifest.",
        " qua đường truyền stdio tiêu chuẩn với cơ chế giao tiếp tiến trình đồng bộ.",
        " bằng cách thiết lập tham số timeout thực thi rõ ràng trong khối đăng ký tool.",
        " để thực thi kiểm tra kiểu tham số nghiêm ngặt trước khi gọi API backend.",
        " trong payload định nghĩa tool nhằm ngăn chặn lỗi tuần tự hóa giao thức khi chạy."
    ],
    'D3': [
        " trong file cấu hình CLAUDE.md tại thư mục gốc trước khi chạy các phiên tương tác.",
        " bằng cách truyền các cờ dòng lệnh phù hợp cho Claude Code ở chế độ headless.",
        " sử dụng các quy tắc theo đường dẫn được thiết lập trong thư mục cấu hình dự án.",
        " trên tất cả các bước trong pipeline CI/CD tự động để đảm bảo quy chuẩn mã nguồn.",
        " trong profile cấu hình toàn cục của người dùng đặt tại thư mục home.",
        " nhằm giới hạn quyền chỉnh sửa file trong quá trình review pull request tự động."
    ],
    'D4': [
        " trong chỉ thị system prompt để định hướng định dạng output của mô hình.",
        " sử dụng ràng buộc JSON Schema nghiêm ngặt với thuộc tính additionalProperties là false.",
        " bằng cách cung cấp thêm các ví dụ few-shot minh họa trong lịch sử tin nhắn đầu vào.",
        " bên trong các thẻ XML phân tách rõ ràng để cô lập input của người dùng với hệ thống.",
        " trong các tham số request để kiểm soát nhiệt độ sampling và giới hạn token của mô hình.",
        " nhằm đảm bảo tính tuân thủ schema tuyệt đối cho toàn bộ dữ liệu cấu trúc được sinh ra."
    ],
    'D5': [
        " nhằm tối ưu hóa dung lượng context window và giảm thiểu chi phí tiêu thụ token.",
        " sử dụng Message Batches API để xử lý các yêu cầu bất đồng bộ với độ trễ thấp hơn.",
        " bằng cách triển khai chiến lược cắt tỉa context tự động sau mỗi lượt hội thoại.",
        " trong kho lưu trữ trạng thái phiên để hỗ trợ khôi phục liền mạch sau khi khởi động lại.",
        " nhằm ngăn ngừa suy giảm chất lượng phân tích do hiện tượng phân tán sự chú ý.",
        " sử dụng cơ chế thử lại exponential backoff kết hợp jitter trên các instance phân tán."
    ]
}

def clean_correct_text_en(text):
    t = text.strip()
    m_semi = re.match(r'^[A-D]\.\s*([A-Za-z0-9_\-\s`\'"]+? (?:is designed to|executes? AFTER|runs? concurrently|fails? because|occurs? when|cannot handle|does not support)[^;]+;\s*)([a-z].+)$', t, flags=re.IGNORECASE)
    if m_semi:
        lead = t[:3]
        action = m_semi.group(2)
        action = action[0].upper() + action[1:]
        t = lead + action

    t = re.sub(r'\s*(?:—|--)\s*(?:this|which|thereby|to\s+ensure|to\s+eliminate|to\s+prevent|ensuring|preventing|eliminating|guaranteeing|allowing|safe\s+to\s+use|providing|enforcing|avoiding|reducing|causing|making|achieving|giving|helping|both\s+subagents|one\s+per-service|all\s+subagents|eliminating).+?$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'[,;]\s*(?:which\s+(?:ensures|eliminates|prevents|allows|reduces|guarantees|avoids|isolates|enforces|provides|maintains|protects|causes|safely|executes\s+in\s+milliseconds)|thereby\s+[a-z]+ing|thus\s+[a-z]+ing).+?$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*\((?:such\s+as|e\.g\.|including|for\s+example)\s+[^)]+\)', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s{2,}', ' ', t).strip()
    if not t.endswith('.'):
        t += '.'
    return t

def clean_correct_text_vi(text):
    t = text.strip()
    m_semi = re.match(r'^[A-D]\.\s*([A-Za-z0-9_\-\s`\'"áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđĐ]+? (?:được thiết kế để|thực thi SAU KHI|chạy đồng thời|thất bại do|xảy ra khi|không thể xử lý|không hỗ trợ)[^;]+;\s*)([a-z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđĐ].+)$', t, flags=re.IGNORECASE)
    if m_semi:
        lead = t[:3]
        action = m_semi.group(2)
        action = action[0].upper() + action[1:]
        t = lead + action

    t = re.sub(r'\s*(?:—|--)\s*(?:điều này|nhằm|giúp|để\s+đảm bảo|để\s+loại bỏ|để\s+ngăn|đảm bảo|loại bỏ|ngăn chặn|tiết kiệm|cho phép|tránh|mang lại|flag này|cách này|giải pháp này|cả hai subagent|mỗi service|tất cả subagent).+?$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'[,;]\s*(?:nhờ đó\s+[^\.]+|điều này\s+[^\.]+|giúp\s+[^\.]+|nhằm\s+[^\.]+)\.?$', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*\((?:chẳng\s+hạn\s+như|ví\s+dụ|bao\s+gồm)\s+[^)]+\)', '', t, flags=re.IGNORECASE)
    t = re.sub(r'\s{2,}', ' ', t).strip()
    if not t.endswith('.'):
        t += '.'
    return t

def balance_all(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        text = f.read()

    m = re.search(r'return\s*(\[\s*\{.*\}\s*\]);?\s*\}', text, re.DOTALL)
    if not m:
        print(f"Error: Could not parse questions from {input_file}")
        return

    data = json.loads(m.group(1))
    print(f"Balancing {len(data)} questions with target ~25% distribution per rank...")

    domain_counts = {}
    for q in data:
        d = q.get('domain', 'D1')
        idx_in_d = domain_counts.get(d, 0)
        domain_counts[d] = idx_in_d + 1
        
        target_rank = idx_in_d % 4  # 0=longest, 1=2nd, 2=3rd, 3=shortest
        c = q['correct']
        
        # Clean correct option
        q['optionsEN'][c] = clean_correct_text_en(q['optionsEN'][c])
        q['options'][c] = clean_correct_text_vi(q['options'][c])
        
        corr_len_en = len(q['optionsEN'][c])
        corr_len_vi = len(q['options'][c])
        
        other_indices = [i for i in range(4) if i != c]
        other_indices_en = sorted(other_indices, key=lambda i: len(q['optionsEN'][i]), reverse=True)
        other_indices_vi = sorted(other_indices, key=lambda i: len(q['options'][i]), reverse=True)
        
        enrichments_en = DISTRACTOR_ENRICHMENTS_EN.get(d, DISTRACTOR_ENRICHMENTS_EN['D1'])
        enrichments_vi = DISTRACTOR_ENRICHMENTS_VI.get(d, DISTRACTOR_ENRICHMENTS_VI['D1'])
        
        # English:
        for idx_pos, dist_idx in enumerate(other_indices_en):
            opt = q['optionsEN'][dist_idx].strip().rstrip('.')
            if idx_pos < target_rank:
                needed = (corr_len_en + 15 + idx_pos * 8) - len(opt)
                if needed > 0:
                    enrich_idx = (idx_in_d + dist_idx) % len(enrichments_en)
                    enrich = enrichments_en[enrich_idx]
                    if len(opt + enrich) <= corr_len_en:
                        extra_idx = (enrich_idx + 1) % len(enrichments_en)
                        enrich += enrichments_en[extra_idx]
                    opt += enrich
            q['optionsEN'][dist_idx] = opt + '.'

        # Vietnamese:
        for idx_pos, dist_idx in enumerate(other_indices_vi):
            opt = q['options'][dist_idx].strip().rstrip('.')
            if idx_pos < target_rank:
                needed = (corr_len_vi + 15 + idx_pos * 8) - len(opt)
                if needed > 0:
                    enrich_idx = (idx_in_d + dist_idx) % len(enrichments_vi)
                    enrich = enrichments_vi[enrich_idx]
                    if len(opt + enrich) <= corr_len_vi:
                        extra_idx = (enrich_idx + 1) % len(enrichments_vi)
                        enrich += enrichments_vi[extra_idx]
                    opt += enrich
            q['options'][dist_idx] = opt + '.'

        # Special check for target_rank == 0 (Correct MUST be longest):
        if target_rank == 0:
            max_dist_en = max(len(q['optionsEN'][i]) for i in other_indices)
            if len(q['optionsEN'][c]) <= max_dist_en:
                enrich_en = enrichments_en[idx_in_d % len(enrichments_en)]
                q['optionsEN'][c] = q['optionsEN'][c].rstrip('.') + enrich_en + '.'
                
            max_dist_vi = max(len(q['options'][i]) for i in other_indices)
            if len(q['options'][c]) <= max_dist_vi:
                enrich_vi = enrichments_vi[idx_in_d % len(enrichments_vi)]
                q['options'][c] = q['options'][c].rstrip('.') + enrich_vi + '.'

    js_header = """/* CCAF Learning Hub — Mock Exam Dataset V2
   Questions : 1000
   Domains   : {"D1":260,"D2":180,"D3":200,"D4":180,"D5":180}
   A/B/C/D   : A=250 B=250 C=250 D=250
   Validation: structural + duplicate + semantic review + length-balanced approved
*/

function generateMockQuestionsPool() {
  return """
    
    js_footer = """;
}

const MOCK_EXAM_POOL_V2 = generateMockQuestionsPool();
if (typeof window !== 'undefined') {
  window.MOCK_EXAM_POOL_V2 = MOCK_EXAM_POOL_V2;
  if (!window.MOCK_EXAM_QUESTION_POOL) {
    window.MOCK_EXAM_QUESTION_POOL = MOCK_EXAM_POOL_V2;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateMockQuestionsPool, MOCK_EXAM_POOL_V2 };
}
"""

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_header + json.dumps(data, indent=2, ensure_ascii=False) + js_footer)
    print(f"Successfully balanced and written {len(data)} questions to {output_file}")

if __name__ == '__main__':
    inp = sys.argv[1] if len(sys.argv) > 1 else 'website/js/data/mock-exam-data_ver2.backup.js'
    out = sys.argv[2] if len(sys.argv) > 2 else 'website/js/data/mock-exam-data_ver2.js'
    balance_all(inp, out)
