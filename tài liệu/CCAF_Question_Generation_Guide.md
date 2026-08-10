# 📋 CCAF MOCK EXAM — GENERATION GUIDE v2.0
> **Mục đích:** AI model đọc file này và sinh câu hỏi CCAF đúng tiêu chuẩn Gold Standard ngay lập tức.
> **Nguồn chuẩn:** Dựa trên bộ 254 câu hỏi từ `claudecertificationguide.com` (đã xác nhận đạt chuẩn Pearson VUE).

---

## 🚨 PHẦN QUAN TRỌNG NHẤT — ĐỌC TRƯỚC KHI LÀM BẤT CỨ ĐIỀU GÌ

### ❌ LỖI NGHIÊM TRỌNG CẦN TRÁNH TUYỆT ĐỐI

**LỖI #1 — Stem câu hỏi là template chung chung:**
```
❌ SAI: "In a production system for Agentic Loops, an agent encounters an issue
related to stop_reason. The engineering team observes that under workload
scenario #1, the current setup fails. What is the optimal solution?"
```
→ Không có tình huống thực tế, không có code cụ thể, không có hành vi quan sát được.

```
✅ ĐÚNG: "A developer's customer support agent sometimes terminates prematurely
because they check if response.content[0].type == 'text' to determine completion.
The agent stops even when Claude has more tools to call. What is the bug and how
should they fix it?"
```
→ Code cụ thể (`response.content[0].type == 'text'`), hành vi quan sát được ("stops even when Claude has more tools"), câu hỏi rõ ràng.

---

**LỖI #2 — Distractor không liên quan đến chủ đề câu hỏi:**
```
❌ SAI (câu hỏi về stop_reason nhưng option D lại là):
"D. Execute the operations with elevated permissions to bypass authorization checks."
```
→ Elevated permissions không liên quan gì đến agentic loops hay stop_reason.

```
✅ ĐÚNG (tất cả 4 options đều liên quan đến cùng chủ đề agentic loops):
"A. Add an iteration cap of 15 loops and treat reaching the cap as the signal..."
"B. Check the stop_reason field instead of content type: continue on 'tool_use'..."
"C. Parse the assistant's text for phrases like 'I have completed'..."
"D. Set tool_choice to 'any' so Claude always calls a tool instead of returning text"
```

---

**LỖI #3 — Explanation không match với câu hỏi:**
```
❌ SAI (câu hỏi về premature-termination nhưng explanation đúng lại là):
"Option C ✅: Multi-pass decomposition prevents attention dilution..."
```
→ Multi-pass decomposition không liên quan đến premature termination.

```
✅ ĐÚNG:
"Option B ✅ (CORRECT): The stop_reason field is the deterministic, authoritative
signal for loop control. Claude can return text alongside tool_use blocks, so
checking content type is unreliable."
```
→ Explanation trả lời trực tiếp tại sao đây là giải pháp đúng cho đúng vấn đề đang hỏi.

---

**LỖI #4 — Đáp án đúng không phải giải pháp thực sự tối ưu:**
```
❌ SAI: Câu hỏi về AML compliance nhưng đáp án đúng là "Add instructions to system prompt"
```

```
✅ ĐÚNG: Câu hỏi về AML compliance → đáp án đúng là PreToolUse hook (deterministic guarantee)
vì Anthropic luôn ưu tiên programmatic enforcement > prompt instructions cho critical operations.
```

---

## 📐 JSON SCHEMA — CẤU TRÚC BẮT BUỘC

```json
{
  "id": "d1-b01-001",
  "domain": "D1",
  "domainTitle": "Agent Architecture & Orchestration",
  "taskStatement": "1.1 agentic-loops / stop_reason",
  "difficulty": "application",
  "scenarioId": "s1",
  "question": "Bản dịch tiếng Việt của questionEN...",
  "questionEN": "Scenario stem tiếng Anh — tình huống production cụ thể với code/số liệu/hành vi quan sát được...",
  "options": [
    "A. [VI] Lựa chọn A bằng tiếng Việt",
    "B. [VI] Lựa chọn B bằng tiếng Việt",
    "C. [VI] Lựa chọn C bằng tiếng Việt",
    "D. [VI] Lựa chọn D bằng tiếng Việt"
  ],
  "optionsEN": [
    "A. [EN] English option A",
    "B. [EN] English option B",
    "C. [EN] English option C",
    "D. [EN] English option D"
  ],
  "correct": 1,
  "optionExplanations": [
    "Option A ❌ (INCORRECT): Giải thích cụ thể tại sao A thất bại — failure mode thực tế.",
    "Option B ✅ (CORRECT): Giải thích tại sao B là giải pháp tối ưu theo Anthropic principles.",
    "Option C ❌ (INCORRECT): Giải thích cụ thể tại sao C thất bại — failure mode thực tế.",
    "Option D ❌ (INCORRECT): Giải thích cụ thể tại sao D thất bại — failure mode thực tế."
  ],
  "rationale": "Nguyên tắc Anthropic cốt lõi: [1-2 câu ngắn gọn].",
  "explanation": "✅ Đáp án đúng: B\n\n💡 Rationale: [copy từ rationale]\n\n🔍 Phân tích Anti-Pattern:\n- Option A ❌: ...\n- Option B ✅: ...\n- Option C ❌: ...\n- Option D ❌: ...",
  "sources": [
    {
      "label": "Anthropic: Building Effective Agents",
      "url": "https://www.anthropic.com/research/building-effective-agents"
    }
  ]
}
```

**Quy tắc `correct`:** Index 0-based (`0`=A, `1`=B, `2`=C, `3`=D). Phân bổ đều trong batch: ~25% mỗi vị trí.

---

## 🎯 3 NGUYÊN TẮC GOLD STANDARD (BẮT BUỘC ĐẠT ĐỦ 3)

### Nguyên tắc 1: SCENARIO CỤ THỂ — Không phải lý thuyết

Mỗi stem **PHẢI** có ít nhất 2 trong 3 yếu tố sau:
- **Code/API cụ thể:** `stop_reason`, `response.content[0].type`, `PreToolUse`, `tool_choice='any'`, `mcp.json`, `CLAUDE.md`, `.claudeignore`...
- **Số liệu quan sát được:** "terminates prematurely", "8% of cases", "files 10-14 are missed", "20 seconds total latency"
- **Tình huống có tên hệ thống:** "customer support agent", "PR review pipeline", "multi-agent research system", "AML compliance system"

### Nguyên tắc 2: 4 DISTRACTORS CÙNG CHỦ ĐỀ

Tất cả 4 options phải là **cách tiếp cận cùng lĩnh vực kỹ thuật**:
- Câu hỏi về loop termination → 4 options đều là cách terminate/control loops
- Câu hỏi về context passing → 4 options đều là cách pass context giữa agents
- Câu hỏi về enforcement → 4 options đều là enforcement mechanisms (hooks, prompts, few-shot, routing)

**KHÔNG ĐƯỢC** mix: câu hỏi về agentic loops + option về permissions bypass.

### Nguyên tắc 3: EXPLANATION PHẢI TRẢ LỜI ĐÚNG CÂU HỎI

Mỗi explanation phải:
1. Bắt đầu bằng việc địa chỉ hóa vấn đề được hỏi trong stem
2. Chỉ ra failure mode cụ thể (không phải generic "this is bad")
3. Đối với đáp án đúng: giải thích TẠI SAO đây là Anthropic best practice

---

## 🗂️ PHÂN BỔ 500 CÂU — 10 BATCH

| Batch | Domain | Câu | Subtopics | Prefix `id` |
|:---:|:---|:---:|:---|:---|
| B01 | D1 Agentic Architecture | 45 | `1.1 agentic-loops` | `d1-b01-001` đến `d1-b01-045` |
| B02 | D1 Agentic Architecture | 45 | `1.2 orchestration-patterns` | `d1-b02-001` đến `d1-b02-045` |
| B03 | D1 Agentic Architecture | 45 | `1.3` → `1.7` (subagent-context, workflow, sdk-hooks, task-decomp, session-state) | `d1-b03-001` đến `d1-b03-045` |
| B04 | D2 Tool Design | 45 | `2.1 tool-schema-design`, `2.2 error-responses`, `2.3 tool-distribution` | `d2-b04-001` đến `d2-b04-045` |
| B05 | D2 Tool Design | 45 | `2.4 mcp-server-integration`, `2.5 built-in-tools`, `2.6 tool-chaining` | `d2-b05-001` đến `d2-b05-045` |
| B06 | D3 Claude Code | 50 | `3.1 claude-md-hierarchy`, `3.2 slash-commands-skills`, `3.3 path-specific-rules` | `d3-b06-001` đến `d3-b06-050` |
| B07 | D3 Claude Code | 50 | `3.4 plan-mode-execution`, `3.5 headless-automation`, `3.6 ci-cd-integration`, `3.7 permissions-flags` | `d3-b07-001` đến `d3-b07-050` |
| B08 | D4 Prompt Engineering | 50 | `4.1 system-prompts`, `4.2 few-shot-prompting`, `4.3 xml-boundaries`, `4.4 chain-of-thought` | `d4-b08-001` đến `d4-b08-050` |
| B09 | D4 Prompt Engineering | 50 | `4.5 structured-output`, `4.6 nullable-fields`, `4.7 validation-retry`, `4.8 json-schema` | `d4-b09-001` đến `d4-b09-050` |
| B10 | D5 Context & Reliability | 75 | `5.1` → `5.7` (context-window, pruning, escalation, error-propagation, batch-api, codebase-exploration, synthesis) | `d5-b10-001` đến `d5-b10-075` |

---

## 📝 PROMPT TEMPLATE — COPY NGUYÊN VĂN VÀO AI MODEL

> Điền `[...]` trước khi gửi. Phần `[PASTE KỸ THUẬT]` xem Section tiếp theo.

```
You are an expert CCAF (Claude Certified Architect - Foundations) exam question writer.
The exam is administered by Pearson VUE and tests mastery of Anthropic's official agent architecture principles.

## YOUR TASK
Generate [SỐ CÂU] original multiple-choice questions for:
- Domain: [TÊN DOMAIN]
- Subtopics: [DANH SÁCH SUBTOPICS]
- Batch ID prefix: [PREFIX, ví dụ: d1-b01]

## CRITICAL QUALITY RULES — EVERY QUESTION MUST PASS ALL 3:

### RULE 1: CONCRETE PRODUCTION SCENARIO STEM
The scenario MUST include at least 2 of:
(a) Specific API field or code reference (e.g. response.content[0].type, stop_reason, PreToolUse hook, mcp.json, CLAUDE.md, tool_choice='any')
(b) Observable behavior with metrics (e.g. "terminates prematurely", "8% of cases fail", "files 10-14 are missed", "20 seconds total latency")
(c) Named system with real context (e.g. "customer support agent", "PR review pipeline", "AML compliance system")

FORBIDDEN stem patterns:
- "In a production system for X, an agent encounters an issue related to Y..."
- "What is the best approach for handling Z?"
- "Which of the following best describes...?"
- Any generic template that doesn't name a specific production context

### RULE 2: ALL 4 OPTIONS MUST BE ON THE SAME TECHNICAL TOPIC
If the question is about loop termination → ALL 4 options must be about loop termination strategies.
If the question is about context passing → ALL 4 options must be about context passing mechanisms.
If the question is about enforcement → ALL 4 options must be enforcement mechanisms (hooks, prompts, few-shot, routing).

FORBIDDEN: Mixing unrelated technical domains in a single question's options.

### RULE 3: EXPLANATIONS MUST ADDRESS THE SPECIFIC QUESTION
Each optionExplanation must:
1. Name the specific failure mode (not generic "this is bad")
2. Explain WHY it fails for THIS specific scenario in the stem
3. For the correct answer: state the specific Anthropic principle it applies

## ANSWER DISTRIBUTION
Spread correct answers evenly: approximately [N/4] questions each for positions A(0), B(1), C(2), D(3).
Plan your answer distribution BEFORE writing questions.

## REFERENCE EXAMPLES OF GOLD-STANDARD QUALITY

### ✅ GOLD EXAMPLE 1 (D1, 1.1 agentic-loops):
Stem: "A developer's customer support agent sometimes terminates prematurely because they check if response.content[0].type == 'text' to determine completion. The agent stops even when Claude has more tools to call. What is the bug and how should they fix it?"
Options: A. Add an iteration cap of 15 loops and treat reaching the cap as the signal. B. Check the stop_reason field instead of content type: continue on 'tool_use', terminate on 'end_turn'. C. Parse the assistant's text for phrases like 'I have completed'. D. Set tool_choice to 'any' so Claude always calls a tool.
Correct: B (index 1)
Why A fails: "Arbitrary caps do not address the root cause. Using the cap as a completion signal is itself an anti-pattern."
Why B correct: "stop_reason is the deterministic, authoritative signal for loop control. Claude can return text alongside tool_use blocks, so checking content type is unreliable."
Why C fails: "Natural language parsing is ambiguous. stop_reason already provides an unambiguous signal."
Why D fails: "This forces tool use even when the agent is genuinely finished, creating an infinite loop."

### ✅ GOLD EXAMPLE 2 (D1, 1.4 workflow-enforcement):
Stem: "Production data shows that in 8% of cases, a customer support agent processes refunds without verifying account ownership, occasionally leading to refunds on wrong accounts. What is the most appropriate fix?"
Options: A. Implement a programmatic prerequisite gate blocking process_refund until get_customer returns a verified customer ID. B. Add stronger instructions to the system prompt emphasising verification before refunds. C. Add few-shot examples showing the correct verification-then-refund workflow. D. Implement a routing classifier that sends refund requests to a specialised verification pipeline.
Correct: A (index 0)
Key principle: "Financial operations require deterministic enforcement. A prerequisite gate physically prevents the refund tool from executing until identity verification is complete."

### ✅ GOLD EXAMPLE 3 (D1, 1.6 task-decomposition):
Stem: "A code review agent processes 14 files and produces detailed feedback for the first 5 files but misses obvious bugs in files 10-14. It also flags a pattern as problematic in one file while approving identical code in another. What is the root cause and solution?"
Options: A. The model's context window is too small — upgrade to a model with a larger context window. B. Split the review into per-file local analysis passes plus a separate cross-file integration pass. C. Add a stronger system prompt emphasising the importance of reviewing all files equally. D. Reduce the number of files reviewed per run to 5 and process in batches.
Correct: B (index 1)
Key principle: "Attention dilution — not context window size — causes inconsistency. Multi-pass architecture (local + integration) is the structural fix."

## KEY TECHNICAL PRINCIPLES FOR [DOMAIN]:

[PASTE KỸ THUẬT — xem Section dưới]

## OUTPUT FORMAT
Output a valid JSON array ONLY. No markdown, no extra text, no code fences.
Start with [ and end with ].
Each object must use the exact schema provided.
Numbers of questions: exactly [SỐ CÂU].
```

---

## 📚 KỸ THUẬT THEO DOMAIN — PASTE VÀO PROMPT

### D1 — Agent Architecture & Orchestration (Subtopics 1.1 → 1.7)

```
### 1.1 Agentic Loops
- stop_reason (not content type, not text parsing) is the authoritative loop termination signal
- 'end_turn' = agent finished; 'tool_use' = continue loop; never use iteration cap as primary signal
- Anti-patterns: text parsing for completion, max_iterations as stop signal, tool_choice='any' to force tools
- Correct pattern: if stop_reason == 'end_turn': break; if stop_reason == 'tool_use': process and continue

### 1.2 Orchestration Patterns
- Prompt chaining: fixed sequential steps for predictable workflows (code review style→security→docs)
- Routing: classify input FIRST, then dispatch to specialized subagent (not always full pipeline)
- Orchestrator-workers: coordinator dynamically selects which subagents to invoke per request
- Evaluator-optimizer: generator + evaluator loop until quality threshold is met
- Parallel spawning: emit MULTIPLE Task tool calls in a SINGLE response turn for independent subagents
- Hub-and-spoke: all communication via coordinator, NEVER direct subagent-to-subagent communication
- Flat hierarchy for debuggability: avoid nested/recursive agent hierarchies

### 1.3 Subagent Invocation Context
- Pass structured metadata (source URLs, document names) as separate fields, NOT embedded in prose
- Stripping metadata = loss of attribution downstream (synthesis agent cannot cite sources it never received)
- Fresh context per subagent invocation — don't pass entire conversation history
- Scoped tool access per subagent: web-search agent only gets web tools, not file write tools

### 1.4 Workflow Enforcement
- Prerequisite gate: programmatic code block that physically prevents tool B until tool A succeeds
- Enforcement spectrum: prompt instructions (probabilistic) → few-shot (better) → routing → code gate (deterministic)
- For financial/medical/legal operations: ALWAYS use deterministic code enforcement, not prompt-based
- System prompt instructions for 8% failure rate → gate reduces to 0% failure rate

### 1.5 Agent SDK Hooks
- PreToolUse hook: intercepts BEFORE tool executes → use for compliance/AML/authorization
- PostToolUse hook: runs AFTER tool executes → use for logging/normalization (NOT for prevention)
- Key distinction: PostToolUse cannot prevent an action already taken
- Hooks provide deterministic enforcement beyond what prompt instructions can guarantee

### 1.6 Task Decomposition
- Attention dilution: processing too many items in one pass → inconsistent quality across items
- Multi-pass: local analysis pass (per-file) → cross-file integration pass → NOT single monolithic pass
- Use Glob/Grep to map structure first, then selectively read high-impact files
- Never read all N files before starting work — use tools to prioritize

### 1.7 Session State & Resumption
- Stale context: resumed session has tool results from BEFORE files changed → contradictory advice
- Fix: fresh session + injected summary + targeted re-read of changed files only
- fork_session: for divergent exploration paths (NOT for handling stale context)
- Re-reading all N files on resume is wasteful — inject summary and re-read only what changed
```

### D2 — Tool Design & MCP Integration (Subtopics 2.1 → 2.6)

```
### 2.1 Tool Schema Design
- Tool descriptions must clearly state WHAT the tool does, WHEN to use it, WHAT it returns
- Granular single-purpose tools > monolithic multi-action tools (better reasoning, safer)
- Parameter names and descriptions guide model to use correct types
- Overly broad descriptions cause incorrect tool selection in multi-tool environments

### 2.2 Structured Error Responses
- NEVER return empty array/null for both "permission denied" and "no results found"
- Permission error: { "error": "ACCESS_DENIED", "retryable": false, "message": "..." }
- No results: { "results": [], "count": 0, "message": "No matching records" }
- Retryable boolean: model uses this to decide whether to retry or escalate
- Structured errors > unstructured strings (model cannot parse "Error: permission denied")

### 2.3 Tool Distribution
- Subagents must only receive tools relevant to their task (scoped access)
- web-search subagent: gets WebSearch, NOT file_write
- synthesis subagent: gets read tools, NOT action/write tools
- Giving all tools to all agents violates principle of minimal privilege

### 2.4 MCP Server Integration
- mcp.json at project root: available to all developers on the project
- mcp.json at user level (~/.config): personal tools only visible to that developer
- stdio transport: for local CLI-based tools (git, filesystem)
- SSE transport: for remote API-based tools (Slack, Jira, external services)
- MCP config must specify: command, args, env, transport type

### 2.5 Built-in Tools
- Glob: finds files by PATH PATTERN (e.g., *.test.ts, src/**/*.py) — NOT for searching content
- Grep: searches FILE CONTENT by text pattern — NOT for finding files by name
- Bash: executes shell commands — must be sandboxed in CI/CD (--dangerously-skip-permissions only safe in CI)
- WebSearch: fetches live web content — results should be validated before agent acts on them

### 2.6 Tool Chaining
- Tool A output → Tool B input: explicit dependency, must be sequential
- Tools with no dependency → emit in same turn for parallel execution
- Always handle "no results" from Tool A before calling Tool B that depends on it
```

### D3 — Claude Code Configuration & Workflows (Subtopics 3.1 → 3.7)

```
### 3.1 CLAUDE.md Hierarchy
- Global: ~/.claude/CLAUDE.md — applies to all projects for that user
- Project root: {project}/.claude/CLAUDE.md or CLAUDE.md — overrides global for the project
- Subdirectory: {project}/src/api/CLAUDE.md — scoped only to that directory and below
- Precedence: subdirectory > project root > global
- @import: use @path/to/file to import another CLAUDE.md's rules

### 3.2 Slash Commands & Skills
- Project slash commands: .agents/commands/{name}.md — available to all on the project
- Personal slash commands: ~/.claude/commands/{name}.md — personal only
- Skills (SKILL.md): structured reusable capabilities with frontmatter, not just text commands
- Skill triggers: name and description in frontmatter match user intent

### 3.3 Path-Specific Rules
- Glob patterns in CLAUDE.md: [rules for "**/*.test.ts"] → test-file specific behavior
- Subdirectory CLAUDE.md: place in the subdirectory for scoped rules
- Pattern: colocated test files need different rules than source files

### 3.4 Plan Mode
- Plan Mode (Shift+Tab or /plan): agent drafts changes and lists edits, DOES NOT execute
- User reviews and approves plan before execution begins
- Use for irreversible or large-scale changes
- Auto-approve mode skips plan review (only for CI/automated contexts)

### 3.5 Headless Automation
- claude -p "prompt": non-interactive single-turn execution
- claude -p --output-format json: structured JSON output for CI parsing
- Headless mode: no TTY, reads from stdin, writes to stdout/stderr
- --max-turns N: limit turns in headless mode

### 3.6 CI/CD Integration
- --dangerously-skip-permissions: bypasses all permission prompts (ONLY safe in sandboxed CI)
- CI pipeline: claude -p "review this PR" --output-format json | jq '.result'
- Asynchronous review: post result as PR comment without blocking merge

### 3.7 Permissions & Safety Flags
- .claudeignore: exclude files from Claude's view (like .gitignore but for Claude)
- Always exclude: .env, secrets/, private-keys/
- --allowedTools: whitelist specific tools for Claude to use
- --disallowedTools: blacklist specific tools
```

### D4 — Prompt Engineering & Structured Output (Subtopics 4.1 → 4.8)

```
### 4.1 System Prompts
- System prompt sets persona, scope, constraints for the ENTIRE conversation
- False positive reduction: explicit criteria for what constitutes a finding (reduces noise)
- Scope limiting: "Only report issues that affect production security, not style" → fewer irrelevant results
- Persona: "You are a senior security engineer" → more consistent, appropriate tone

### 4.2 Few-Shot Prompting
- Few-shot examples must cover the DISTRIBUTION of real inputs (not just happy path)
- Include edge cases: empty fields, missing data, ambiguous formats
- Format examples as: [input] → [output] pairs, separated clearly
- For classification: include examples of EACH class, not just the common one

### 4.3 XML Boundaries
- <thinking>...</thinking>: Chain-of-Thought reasoning before output (reduces hallucination)
- <context>...</context>: Wrap injected documents to prevent prompt injection
- <output>...</output>: Delimit the expected output section
- XML tags prevent model from confusing system content with user content

### 4.4 Chain-of-Thought
- Always place <thinking> before <output> tags
- CoT improves accuracy for multi-step reasoning and complex classification
- Extended thinking: budget_tokens controls depth of reasoning
- For simple tasks: CoT adds latency without benefit

### 4.5 Structured Output
- tool_use with schema enforcement: model MUST return valid JSON schema (NOT raw text parsing)
- Schema validation on the receiving side: always validate model output against schema
- Use required fields + additionalProperties: false for strict schemas
- Never rely on "the model will always return valid JSON" without schema enforcement

### 4.6 Nullable Fields
- Optional field not present vs. explicitly null: schema must distinguish
- { "field": null } ≠ {} (field absent)
- Use oneOf: [{ "type": "string" }, { "type": "null" }] for nullable fields
- Model should return null explicitly when field is absent, not omit the key

### 4.7 Validation & Retry
- Validate immediately on receipt, before using the output
- Retry with error feedback: "Your output was: [bad output]. The schema requires: [schema]. Try again."
- Max retry boundary: 2-3 retries, then fallback path (human escalation or default value)
- Never retry indefinitely; cost and latency compound with each retry

### 4.8 JSON Schema
- $schema, type, properties, required, additionalProperties: false
- Enum for fixed value sets: "status": { "enum": ["active", "inactive", "pending"] }
- Array with minItems/maxItems for controlled lists
- descriptions on each property guide model output quality
```

### D5 — Context Management & Reliability (Subtopics 5.1 → 5.7)

```
### 5.1 Context Window Management
- Lost-in-the-middle: model accuracy drops for content in the MIDDLE of a long context
- Fix: place critical information at START or END of context (not buried in middle)
- Key-facts block: maintain a persistent summary of essential facts at the start of context
- Prune old tool results before they consume context budget

### 5.2 Context Pruning
- Prune: remove old tool calls and results that are no longer needed
- Summarize: condense conversation history into key-facts block
- Never prune: user intent, critical decisions, error history
- Context budget: leave 20% for model response, 80% for context

### 5.3 Escalation & Ambiguity
- Explicit thresholds: "If confidence < 0.7, escalate to human"
- Never guess when uncertain: surface ambiguity explicitly to user
- Escalation paths: error log, human review queue, or structured fallback response
- Anti-pattern: silently proceeding with low-confidence output

### 5.4 Error Propagation
- Structured errors between agents: { error_type, message, retryable, context }
- Agent should not swallow errors — propagate to coordinator with full context
- Coordinator decides: retry, escalate, or use fallback
- Error context includes: which tool failed, what input caused failure, attempts made

### 5.5 Message Batches API
- Use for large-scale async processing: 50% cost reduction vs. synchronous API
- Batch size: up to 10,000 requests per batch
- Not suitable for real-time interactive use cases
- Poll for completion or use webhook notification
- Results available for 29 days after batch completion

### 5.6 Codebase Exploration
- Scratchpad files: write intermediate notes during complex investigations (don't rely on context alone)
- Glob → Grep → Read: structure → search → read specific files (never read all files)
- Build dependency graphs before making changes across files
- Test before commit: run tests after each change, not at the end

### 5.7 Long-Form Synthesis
- Claim-to-source attribution: every claim in a report must link to its source document
- Structure output as JSON with { claim, source_id, confidence } tuples
- Never paraphrase without preserving provenance
- Chunked synthesis: synthesize per-section, then merge (not one monolithic synthesis call)
```

---

## 💻 CÁCH PASTE VÀO `mock-exam-data.js`

File skeleton có cấu trúc:
```javascript
function generateMockQuestionsPool() {
  return [
    // AI output JSON objects here, separated by commas
    { "id": "d1-b01-001", ... },
    { "id": "d1-b01-002", ... }
    // Dấu phẩy sau mỗi object TRỪ object cuối cùng trong toàn bộ array
  ];
}
const MOCK_EXAM_QUESTION_POOL = generateMockQuestionsPool();
```

**Workflow:**
1. Chạy prompt cho batch → nhận JSON array từ AI
2. Copy nội dung BÊN TRONG `[...]` (không lấy dấu ngoặc vuông)
3. Paste vào đúng vị trí batch trong file, đảm bảo dấu phẩy đúng

---

## ✅ CHECKLIST KIỂM TRA TỪNG CÂU (Self-Review Before Output)

Trước khi output mỗi câu, AI phải tự hỏi:

- [ ] Stem có **code/API field cụ thể** hoặc **số liệu quan sát được** không?
- [ ] Cả 4 options có **cùng lĩnh vực kỹ thuật** không (không có option "off-topic")?
- [ ] Mỗi explanation có **gọi tên failure mode cụ thể** không (không phải "this is suboptimal")?
- [ ] Đáp án đúng có **áp dụng đúng Anthropic principle** cho subtopic đang test không?
- [ ] Stem có theo **mẫu template generic** ("In a system for X, an agent encounters Y...") không? → Nếu có, VIẾT LẠI.

---

## 🔍 SCRIPT KIỂM TRA SAU KHI HOÀN THÀNH

```python
import json, re
from collections import Counter

with open(r"d:\AI\CCAF\website\js\data\mock-exam-data.js", 'r', encoding='utf-8') as f:
    code = f.read()

match = re.search(r'return\s*(\[[\s\S]*?\]);?\s*\}', code)
qs = json.loads(match.group(1))

print(f"Total: {len(qs)}")                                    # Phải là 500
print("Domains:", dict(Counter(q['domain'] for q in qs)))     # D1:135, D2:90, D3:100, D4:100, D5:75
print("Correct dist:", dict(Counter(q['correct'] for q in qs)))  # ~125 mỗi vị trí
print("Unique stems:", len(set(q['questionEN'] for q in qs))) # Phải là 500
missing = [q['id'] for q in qs if not q.get('taskStatement') or len(q.get('optionExplanations', [])) != 4]
print(f"Missing fields: {len(missing)}")                       # Phải là 0
```
