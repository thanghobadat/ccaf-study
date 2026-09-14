# -*- coding: utf-8 -*-
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 1. Load V1
with open('website/js/data/mock-exam-data.js', 'r', encoding='utf-8') as f:
    v1 = json.loads(re.search(r'return\s*(\[\s*\{.*\}\s*\]);?\s*\}', f.read(), re.DOTALL).group(1))

# 2. Load V2
with open('tài liệu/data_ccaf_master_533.json', 'r', encoding='utf-8') as f:
    v2 = json.load(f)

# Comprehensive Technical Patterns for Level 1 (Khó nhất) & Level 2 (Khó)
L1_PATTERNS = [
    # Multi-agent, Concurrency, State Machine & Failure Cascades
    r'race\s+condition', r'deadlock', r'concurren', r'cascading\s+failure',
    r'state\s+machine', r'\bfsm\b', r'attention\s+dilution', r'multi-pass',
    r'crash\s+recover', r'recover\w*\s+after\s+crash', r'external\s+storage.*persist',
    r'persist.*external\s+storage', r'external\s+state\s+store', r'shared\s+memory\s+store',
    r'shared\s+memory', r'reference\s+identifier',
    
    # Hooks & Lifecycle
    r'precompact', r'pretooluse', r'transcript.*compact', r'compact.*transcript',
    
    # Reliability & Circuit Breaker & Provenance
    r'circuit\s+breaker', r'half-open', r'provenance', r'claim-to-source',
    r'claim-source', r'source\s+attribution', r'attribution',
    r'claim_id.*source_id', r'citation\s+chaining', r'lost-in-the-middle',
    r'lost\s+in\s+the\s+middle', r'escalation\s+payload'
]

L2_PATTERNS = [
    # Production Trade-offs & Architecture Patterns
    r'trade-off', r'tradeoff', r'latency\s+vs', r'cost\s+vs', r'p99\s+latency',
    r'token\s+bloat', r'output\s+projection', r'context\s+pruning',
    r'batch\s+api', r'message\s+batches', r'evaluator-optimizer',
    r'closed\s+loop', r'dynamic\s+routing', r'routing\s+classifier',
    
    # Tool schemas & MCP
    r'least-privilege', r'least\s+privilege', r'resilient\s+schema',
    r'nullable.*required', r'required.*nullable', r'purpose-specific\s+tool',
    r'split.*generic\s+tool', r'granular\s+tool', r'monolithic\s+tool',
    r'stdio\s+vs\s+sse', r'sse\s+transport', r'mcp\s+server.*token', r'mcp.*sandbox',
    
    # Claude Code & Prompting
    r'distribution\s+bias', r'few-shot\s+bias', r'recency\s+bias',
    r'path-specific\s+rule', r'\.claude/rules', r'tdd\s+verification',
    r'coordinator-worker.*task\s+tool', r'task\s+tool.*coordinator',
    r'flat\s+hierarchy', r'depth\s+limit', r'turn\s+limit'
]

EXCLUDE_EASY = [
    r'^what\s+does\s+the\s+--?[a-z0-9_-]+\s+flag',
    r'^which\s+cli\s+flag',
    r'^which\s+xml\s+tag',
    r'^what\s+is\s+the\s+primary\s+purpose\s+of\s+xml',
    r'^which\s+role\s+in\s+the\s+messages\s+api',
    r'^what\s+file\s+in\s+the\s+project\s+root\s+contains'
]

def is_hard(q):
    # 1. Multi-select is automatically Level 1
    if q.get('multiple') or isinstance(q.get('correct'), list):
        return True
        
    stem = q.get('questionEN', '')
    opts = q.get('optionsEN', [])
    rationale = q.get('rationale', '') or q.get('explanation', '')
    full_text = (stem + ' ' + rationale + ' ' + ' '.join(opts)).lower()
    
    # Exclude trivial basic recall
    for ep in EXCLUDE_EASY:
        if re.search(ep, stem.lower().strip()):
            return False
            
    # Check L1 patterns
    for p in L1_PATTERNS:
        if re.search(p, full_text):
            return True
            
    # Check L2 patterns
    for p in L2_PATTERNS:
        if re.search(p, full_text):
            return True
            
    # Check complex failure/incident scenario
    if len(stem) > 350 and ('subagent' in full_text or 'mcp' in full_text or 'schema' in full_text or 'pipeline' in full_text):
        if 'error' in full_text or 'fail' in full_text or 'incident' in full_text or 'timeout' in full_text or 'production' in full_text:
            return True
            
    return False

v1_hard = [q for q in v1 if is_hard(q)]
v2_hard = [q for q in v2 if is_hard(q)]

# In order: put V2 first (official authentic questions), then V1 (expanded scenario questions)
all_hard = v2_hard + v1_hard

print(f"Filtered V2 Hard: {len(v2_hard)} / {len(v2)}")
print(f"Filtered V1 Hard: {len(v1_hard)} / {len(v1)}")
print(f"Total Hard Pool: {len(all_hard)}")

from collections import Counter
c = Counter(q['domain'] for q in all_hard)
print("Domain breakdown:", sorted(c.items()))

# Write JSON file
json_output = 'tài liệu/data_ccaf_hard.json'
with open(json_output, 'w', encoding='utf-8') as f:
    json.dump(all_hard, f, ensure_ascii=False, indent=2)
print(f"Wrote JSON to {json_output}")

# Write JS file for website
js_header = f"""/* CCAF Learning Hub - Hard Scenario Questions Dataset (Level 1 & Level 2)
   Total: {len(all_hard)} Hard Scenario Questions extracted from Pool V1 (644Q) and Master V2 (533Q)
   Covering Domains: D1 ({c.get('D1', 0)}), D2 ({c.get('D2', 0)}), D3 ({c.get('D3', 0)}), D4 ({c.get('D4', 0)}), D5 ({c.get('D5', 0)})
   Criteria: Multi-select, Concurrency, State Machines, Cascading Failures, Production Trade-offs, Resilient Schemas, Context Pruning
*/

function generateMockQuestionsPoolHard() {{
  return """

js_footer = """;
}

const MOCK_EXAM_POOL_HARD = generateMockQuestionsPoolHard();

if (typeof window !== 'undefined') {
  window.MOCK_EXAM_POOL_HARD = MOCK_EXAM_POOL_HARD;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMockQuestionsPoolHard,
    MOCK_EXAM_POOL_HARD
  };
}
"""

js_output = 'website/js/data/mock-exam-data_hard.js'
with open(js_output, 'w', encoding='utf-8') as f:
    f.write(js_header + json.dumps(all_hard, ensure_ascii=False, indent=2) + js_footer)
print(f"Wrote JS file to {js_output}")
