

<!-- Start of picture text -->
xX<br>ENTERPRISE SE <a<br>LLM : ger"<br>°<br>ARCHITECTURE =<. >  "<br>Design Patterns, Anti-Patterns,<br>system and TNS <SQ ZgBion<br> Workflows for Production : SS KS Zeger<br>Deployments | ahs ro<br>The Architect's Playbook oN ( SS. SS 3<br>SS ») Nea. Zag<br><!-- End of picture text -->

###### Four Domains of Al Architecture 

Structured Data Extraction High Volume, Strict Schemas, Batch Pipelines S&S "entity": "Order", "id": 101,<sup>["A","B°]</sup> \<sup>"items":</sup> ict "status": "confirmed", 



<!-- Start of picture text -->
Customer Support Orchestration<br>Stateful, Human-in-the-Loop, Policy Constraints<br>ALAGENT || consTRAINT_CHECK<br>ORCHESTRATOR e) oon<br>POLICY_VIOLATION Gay<br>HUMAN REVIEWER<br><!-- End of picture text -->



<!-- Start of picture text -->
Developer Productivity Multi-Agent Systems<br>Dynamic Tasks, Iterative Context, Advanced Parallel Processing, Shared Memory, SYNTHESTS_EXCHANGE<br>Tool Use<br>;<br>& | Cross-Agent Synthesis ee<br>preject/ a ENT F<br>& sre/ Se ci apeDNEHORY_WRITE ——<br>[oooSala , [Sfe components/ utits/ ,. Sw ye ~%, 9<br>ott Bi styles/ SHARED_MEMORY_WRITE<br>}<br>A index.js || | = | ||SYNTHESTS_EXCHANGE<br>>| D package. json iN2 » ° wegSHARED _NEMORY_READ!' ‘¢Si<br>SYNTHESIS. EXCHANGE<br><!-- End of picture text -->

###### The Architect's Hierarchy of Constraints 



<!-- Start of picture text -->
Mitigated by Latency<br>Parallelization ———<br>& Caching ; | |<br>Enforced by | a \ Mitigated by<br>Application-Layer : | he kh oN Structured<br>Intercepts Compliance | (22 Accuracy Intermediates &<br>(Not Prompts) \ x Li | Few-Shot Prompts<br>ee ee Mitigated by<br>Cost Batch APls &<br>Context Pruning<br><!-- End of picture text -->

Routing for Cost and SLA Rule: Never default to real-time for asynchronous needs. 



<!-- Start of picture text -->
sega<br>-, urgentti Eee Standardt<br>(2 ae Af<br>Real-time<br>Messages API<br><!-- End of picture text -->

Urgent Real-time Messages API Exceptions | (High Cost, Instant Latency) Standard Message BatchesF API Workflows (50% Cost Savings) Continuous | Submit batches every 6 hours Arrival containing documents from (30h SLA) that window. 

###### Designing Resilient Schemas 

###### Anti-Pattern: Fragile Expansion 

Continuously expanding enums as edge cases arise. 

Architectural Pattern: Resilient Catch-Alls Add an other value to the enum, paired with a detail string field. 

// Fragile Schema with Restricted Enum { "type": "object", "properties": { “property_type": { "type": "string", "enum": ("house", "apartment", "condo", "townhouse"] } I; "required": ["property_type"] } 

////// Fails"property_type":“property_type":validation: "studio""converted warehouse" : VALIDATION Unexpected Types 



<!-- Start of picture text -->
// Resilient Schema with Catch-ALL<br>{<br>"type": "object",<br>"properties": {<br>"property_type": {<br>"type": "string",<br>"enum": ["house", "apartment", "condo", "townhouse", "“other"]<br>},<br>"property_type_detail": {<br>"type": "string",<br>"description": "Specifics for ‘other’ types" -<br>} },"required": ["property_type"| -|aloe<br>ff Successfully processes: VALIDATION<br>// “property_type_detail": "studio" Data Captured<br><!-- End of picture text -->

###### Data Evolution Rule 

For amended documents, redesign schemas so amended fields capture multiple values, each with a source location and effective date, rather than overwriting original terms. Validate this approach against the problem of extracting both original and amended contract clauses. 

Hy te beds -seerlaba { “value”: “30 days”, “source”: "Original Contract, Clause 4.1", “effective.date": "2023-01-01" }, POLLS LS) EET 2 EOSOE Ed are eG 

###### Enforcing Mathematical Consistency 

The Problem: 18% of invoice extractions show line items that don't match the grand total due to OCR or extraction errors. 

###### Schema Solution: Redundancy 



<!-- Start of picture text -->
nae | Invoice #12345<br>Ss Date: 2023-10-27<br>;<br>we erie<br>pe| a = ane<br>(OCR error: : :; | ,<br>$120.50) Description | Quantity | UnitPrice | Total |<br>Line eR as<br> Item 2: |_| |p|<br>$ 85.00<br>{++<br>fine [tara | |__| ___l|___]<br>(Extraction error: |<br>$4,525) |<br>$45.25 i i Mismatch<br>| Grand<br>[pe iemnasc= coor Total on<br>| eee Document<br>eee a Ree pe og SE<br><!-- End of picture text -->

{ "Line_items": [ { "description": "Item 1", "amount": 120.50 }, { "description": "Item 2", "amount": 85.00 }, { "description": "Item 3", "amount": 4.525 } Derived by model "calculated_total": 210.025, <— summing items. r stated_total”:We 268:60,<— _ extracted directly "currency": "USD" from page } The Solution:i Schema Redundancy IJ Routing Action: Flag the record for human review ONLY when calculated_total != stated_total. 

#### Normalization and Null Handling 



<!-- Start of picture text -->
Base Prompt —>  NullHandling Instruction<br>Input: Problem: Plausible Hallucinations<br>Extract attendee count and materials. When fields are nullable, models may invent<br>Model ; plausible data (e.g., attendee count: 500) if not<br> Output (Problematic): explicitly instructed.<br>{<br>i ". "cage ; Pattern: Add explicit prompt instructions to<br>attendee_count’: "506", // Plausible Halluci :<br>tater inden icnEroniblendmn Ineenemetent et return null if not directly stated.<br>} x Updated Prompt:<br>Extract attendee count and materials. If attendee<br>count or materials are not mentioned in the text,<br>return “null’.<br>Corrected<br> Output:<br>—_—— { /<br>"attendee_count": null, // Correctly Handled<br>"materials": "cotton blend"<br>MN a }<br>, a<br><!-- End of picture text -->



<!-- Start of picture text -->
—><br><!-- End of picture text -->

###### Format Normalization 

###### Problem: Inconsistent Formats 

For materials ("cotton blend" vs "Cotton/Polyester mix"), provide few-shot examples showing 2-3 complete input-output pairs with standardized formats. Do not rely on temperature 0 alone. 



<!-- Start of picture text -->
Solution: Few-Shot Standardization<br>Final Prompt with Examples:<br>Extract attendee count and materials. If not<br>mentioned, return "null’. Materials must be<br>standardized.<br>Examples:<br>Input: "Made of cotton blend." -> Output:<br>{\"materials": \"Cotton Blend"}<br>Input: ‘Cotton/Polyester mix” -> Output: |<br>{\"materials": \"Cotton/Polyester Mix"}<br>Final Output:<br>{<br>"attendee_count"; null, “<br>"materials": "Cotton Blend” // Standardized<br>}<br><!-- End of picture text -->

The Limitsa oe of Automated Retry The Pattern: Appending specific validation errors to the prompt and retrying resolves most failures in 2-3 attempts. 

V) Effective: Formatting Errors 

< Ineffective: Missing Information 



<!-- Start of picture text -->
Generation<br>Prompt with nae<br>Error Feedback Validayey w.<br>i> Successful<br>Prompt Output<br>with Error Validation<br>appended the ex Failure<br>error message<br><!-- End of picture text -->

Fixing nested objects vs flat arrays. Resolving locale-formatted strings. 



<!-- Start of picture text -->
» ‘F \Generation<br>~s<br>i<br>Prompt with ae Seat<br>Error mrin® Validate »e<br>LN Max Retries<br>‘. Exceeded<br>~ Validation<br>Failure<br>The Exception: Retries are least effective for missing<br>information (e.g., trying to extract full author lists when<br>the source says “et al.” and points to an unprovided<br>external document). Recognize when to fail fast.<br><!-- End of picture text -->

##### Calibrating Human-in-the-Loop 

Requirement: 

###### Implementation: 

###### Automate extractions with model confidence >90%. 

Have the model output fieLd-Level confidence scores. Ground this implementation detail in the solution for reducing semantic errors. 

Human Review Queue =~ 

Queue =~ =~ | Automated Downstream , as Processing 0% 90% 90% 100% Extraction Confidence Scores (0% to 100%) 

/\ Critical Validation Step: Analyze accuracy by document type and field to verify high-confidence extractions perform consistently across all segments, not just in aggregate, before deploying. 

Zero- Tolerance Compliance The Trap: Relying on emphatic system prompts ("CRITICAL POLICY: NEVER process >$500") still yields a 3% failure rate. 

The Architectural Standard: 

Implement an application-layer hook to intercept tool calls. 

Al ager Agent ee Yer Intercept O Human aga Escalation 

When the process amount exceeds the threshold, block it server-side and invoke escalation. 

Model discretion is removed. 

###### Resuming Asynchronous Sessions 

The Problem: Resuming a session hours later leads to the model confidently stating outdated status (e.g., "Expected resolution: 24h" from a previous tool call). 



<!-- Start of picture text -->
Turn 1-32 (4 hours ago) Asynchronous Delay Turn 33 (Resumption)<br>, "“expected_resoLution": “24h"} hee ee<br>Filter<br>3 "expected_resolution": "24h"}<br>‘tool_result” { , Pere<br>| Assistanta ——_—_——— Turn : — - | , "“expected_resetutien": "Gh"<br>The Solution: Resume with full conversation history, but programmatically filter out previous ‘tool_resuLt™<br>messages. Keep only human/assistant turns so the agent is forced to re-fetch needed data upon resumption. This<br>ensures returning customers always receive fresh, current information, preventing the use of stale data.<br><!-- End of picture text -->

### Tool Context Pruning 

The Bloat: Repeatedly calling Lookup_order fills the context window with verbose shipping and payment data when only the return status is needed. 



<!-- Start of picture text -->
a: Application-Side Filter<br>: oy, )<br>i npg Y |<br>fee, | C9<br>a oj) SS BIS NS<br>a es ee = sy es Wt<br> aegis é Vy, |<br>rt al | eee la<br>‘gtatl®<br>aa<br>Raw API Response<br>(40+ fields)<br><!-- End of picture text -->

The Pattern: Applicationside filtering. Extract only relevant fields (items, purchase data, return window, status) from each existing order response, removing verbose details before the conversation to proceed. This strategy aligns with managing multiple extensive tool responses in a support session. 

## Graceful Tool Failure 



<!-- Start of picture text -->
Tool Call (e.g., Lookup_order)<br>{<br>"1sError": true,<br>"“errorCategory": "transient", amssseso<br>"isRetryable": true<br>}<br><!-- End of picture text -->

Polite Response (e.g., "I'm experiencing a delay, please try again Later.") @ Anti-Pattern: Throwing application exceptions that crash the agent, or returning empty strings. ® Correct Pattern: Return the error message in the tool result content with the “isError’ flag set to true. 

###### The Escalation Handoff 

. 

: 

| 



<!-- Start of picture text -->
| want a human NOW. Complex Policy Issue<br>escalate_to_human Context Gathering<br>Immediateediate EscalationEscalatio (get_customer)<br><!-- End of picture text -->

Honor it immediately. Do not ask for more clarification. 

###### First ensure account context 



<!-- Start of picture text -->
tools are called.<br><!-- End of picture text -->

Payload Data Flow 

###### The Payload: Structured Summary 



<!-- Start of picture text -->
Bt<br><!-- End of picture text -->

Do not dump raw transcripts. Pass a structured summary: Customer ID, Root Cause, Amount, Recommended Action. 

{ 

"customer_id": "CUST-847392", 

"root_cause": "DupLicate charges due to gateway timeout.", 

"amount": "847.G0 USD", 

"recommended_action": "Approve refund for 847.00 USD and notify customer." 

} 

- Compressing Long Sessions 

The Challenge: A single session covers a refund inquiry, a subscription question, and a payment update across 48 turns. Context limits approach. 

neeeeeeeattemmemeeeeaaeRatene nn RREe RRR Context Window eee 

Narrative Summary of Resolved Issues 



<!-- Start of picture text -->
Full Verbatim Message History<br><!-- End of picture text -->



<!-- Start of picture text -->
Active Issue<br><!-- End of picture text -->

e The Strategy: Summarize earlier, resolved turns into a narrative description, preserving the full message history verbatim only for the active, unresolved issue. Correct Pattern: Return the error message in the tool result content with the isError’ flag set to true. 

The Trap: Providing a broad custom tool (analyze_dependencies) alongside built-in tools like Grep. The agent defaults to Grep. 

Anti-Pattern: Monolithic Tool 

Architect's Pattern: Granular Tools 

eee 

eeo 

$ Agent execution... 

$ Agent execution... 

Agent uses built-in Grep to search imports. - 

{name: analyze_dependencies} 

Agent uses custom tool for dependencies. - List_imports - resolve_transitive_deps - detect_circular_deps 

###### ‘The Fixes” 

Split broad tools into highly granular, single-purpose tools. Enhance MCP tool descriptions to explicitly detail capabilities, expected outputs, and when to prefer them over text manipulation. This applies similarly to adopting custom refactoring tools over standard Bash/sed. 



<!-- Start of picture text -->
t o<br>Directed Codebase Exploration<br>Anti-Pattern: Using the Read tool to sequentially load thousands of lines of code.<br><!-- End of picture text -->



<!-- Start of picture text -->
| Dynamic Investigation Process<br>LZ. ,<br>0!<br>oA,bt ) Zo‘—_  # # 8 a eT _ i.<br>| ;Zh ofa) | | | Analyze” = | ee | Dynamically<br>Wo : | , | — = = — —— J ~ ; ,<br>al I WL eS » AR er».<br>1 |e |e | en’ rel | y<br>| g ,et" ‘| @- <p Ede Sl-Fa ‘ee |<br>tl | | : ~~baile<br>:<br>“ ! (— |<br>“> Datab<br>Inefficient ‘ (ateareil”<br> & Context-Heavy: | Middleware<br>Overloads context window with _ RRsA Eee<br>unrelated data.<br><!-- End of picture text -->

then pinpoint. The Strategy: Start broad, For Architecture (New S Engineer, 800+ Files): . first, then ask the human engineer for priority files. For Intermittent Bugs Py (Tracing Errors): Q « Have the agent dynamically iaati discovers at each step, adapting the plan as new errors emerge. 

The Problem: Exploring two distinct refactoring approaches or testing strategies in a single thread confuses the agent and mixes context. 



<!-- Start of picture text -->
Branch A: Microservice Extraction<br><!-- End of picture text -->



<!-- Start of picture text -->
Extract Core Define API Create<br>Logic Interface Microservice<br>R Yesterday's<br>-Q. Analysis Branch B: In-Place Refactor<br>Simplify Optimize Data Refactor<br>Methods Flow Authentication<br><!-- End of picture text -->

###### The Command: 

Use fork_session to create two separate branches from a foundational analysis. This allows independent, deep exploration of A/B scenarios without context contamination. 

| | 



<!-- Start of picture text -->
The Decay: In extended exploration sessions (30+ mins), accumulated token bloat causes the agentto give - —<br>__ inconsistent answers about early discoveries. Engineers report having to repeat module information. =<br>ae er) c<br>ee SOUNCe Rie ee ee ee ee eo bh “ae eo eae<br>Pie eer sea e cere oe . ee 2 ee ee ees ae . Architectural Map: . . +. . .§ Subsequent Questions - .<br>eee eee e = | E rscsaarilce Patera _. . . ./) Continuous Reference for. .<br>ee S| OTIC ce rs eee a) Ce a eeee<br>: . . . ' ' . 1 1 1 source File B . 2 Py 2 . . : . ' 1 1 . 2 1. 2 . . . : . eC ache 1 2 1 1 : . . . ' ' . . ' 1 1 2<br>aera ere ais eee eee ee ne ee ee eee RaW Message MIStOLV:. t) yor- ae ee ee ee ee ee ee ae<br><!-- End of picture text -->

| The Pattern: Have the agent actively maintaina scratchpad file recording key findings, architectural maps, and | decisions. It references this dense, structured file for subsequent questions. 

The Scenario: An engineer resumes an exploration session, but 3 of the 12 files the agent read yesterday have been altered by a teammate's PR. 

###### Session Transcripts (Yesterday) 

###### Resumed Session (Today) 



<!-- Start of picture text -->
[ File A |<br>[ File B<br>[ File C (Original) FA N :<br>[BD 0 ovina 7 —, R<br>Zz a Agent Context<br>[4 PEFile Lae) (Yesterday) oog<br><!-- End of picture text -->



<!-- Start of picture text -->
[ File A<br>[ File B<br>ian ——<br>FleTT SN<br>File F Agent Context<br>[ (Modified)File L (Updated Today)7 7<br><!-- End of picture text -->

###### The Action 

Resume the session from its previous transcript, but explicitly inform the agent which specific files or functions changed for targeted reanalysis. Do not force a complete re-read, and do not pretend nothing changed. 

resume_session --update_context={files:['File C', 'File D', 

‘File E'], changes:'renamed utility functions'} 

Anti-Pattern: Daisy-chaining full conversation logs between subagents. This scales token costs exponentially. eo N= Re = ng?Pg io? : Seg,.98i] , Shared Vector Store Y SP oS < 2 Sets a 42a,<sup>“x</sup> The Architect's Pattern: Decouple state from invocation. Have > -_ subagents index their outputs into a shared vector store. When <j 

The Architect's Pattern: Decouple state from invocation. Have subagents index their outputs into a shared vector store. When executing, subsequent agents use semantic search to retrieve only relevant prior findings. This architecture prevents state loss when a multi-agent pipeline crashes mid-processing. 

###### Forcing Execution Order 

Ul cele)lliiee An agent needs to extract metadata before calling enrichment tools, but occasionally calls enrichment tools first, leading to failures. 



<!-- Start of picture text -->
Pee<br>2 "model": “claude-35-opus-20240229",<br>5 “max_tokens": 1024,<br>d "messages": [<br>5 {"role": "user", "content": "Extract metadata from this paper and then Look up its DOI."}<br>6 IF<br>7 Loge= a:<br>8 {"name": "extract_metadata", "description": "..."},<br>9 {"name": "Lookup_citations", "description": "..."}<br>10 I<br>11<br>LZ<br><!-- End of picture text -->

WS Sire TIN) Do not rely on prompt begging. Use the API's constraints. Set tool_choice for the first API call to guarantee the pipeline executes in the required order. This ensures structured metadata extraction happens before any DOI lookup or enrichment. 

structured Intermediate Representations The Loss: Passing raw text from financial and news agents to a synthesis agent results in tables losing clarity and news losing narrative flow. 



<!-- Start of picture text -->
Financial | |<br>~ Conversion Sey te, =<br>Agent (Prose Summaries) Standardizes outputsto a SOUPCE s aee y ys<br>S| common intermediate "Confidence": ... Agent (Executive Briefings)<br>| representation }<br>Patent }<br>Agent (Structured Lists)<br><!-- End of picture text -->

cia it ll Citation Rule: To prevent lost attributions, require all subagents to output structured claim-source mappings that the synthesis agent is instructed to preserve. 

###### Parallelization & Caching 

###### Serial Processing 



<!-- Start of picture text -->
| ———-- -— § —— eg Sf gf ef 4 if si<br>TG T+205 T+40s T+605 T+80s T+100s T+120s T+140s T+160s T+180s<br>The Problem: Processing each precedent sequentially in a complex legal case takes over 3 minutes, creating unacceptable latency.<br>Parallel Execution<br>Parallel Subagent [1]<br>Parallel Subagent [2]<br>Parallel Subagent [3]<br>Parallel Subagent [4]<br>Coordinator f liu Parallel Subagent [5] _\ \ Synthesis<br>Faia Parallel Subagent [4] ON<br>‘\ ~ Parallel Subagent [7] —F ff (a Prompt Caching<br>Parallel Subagent [8]<br>Parallel Subagent [9]<br>Parallel Subagent [1]<br>Parallel Subagent [2]<br>[a<br>Te T+Ss T+10siT+15s T+20s T+25s T+30s<br><!-- End of picture text -->



<!-- Start of picture text -->
Parallel Execution<br><!-- End of picture text -->

###### Subagent Parallelism 

When processing independent data (e.g., 12 legal precedents), the coordinator must spawn parallel subagents, each handling a subset, then aggregate results. 

###### Prompt Caching 

When follow-up summaries consistently take 40+ seconds passing 80K+ tokens of accumulated findings, enable prompt caching on the synthesis subagent to drastically reduce transfer overhead. 

The Trap: Giving a web search subagent detailed step-by-step procedural instructions causes it to fail rigidly on emerging topics or miss tangential sources. 

###### Procedural Micromanagement 

###### Goal-Oriented Delegation 



<!-- Start of picture text -->
Web Search Subagent<br>oordinator > Step 1: Search X.<br>Agen > Step 9: Read Y.<br>> Step 3: Extract Z.<br>Failure/Missed Value<br>Rigid, Not Adaptable<br><!-- End of picture text -->



<!-- Start of picture text -->
ysf te<br>oordainatof Agen<br><!-- End of picture text -->



<!-- Start of picture text -->
Web Search Subagent<br>SS « Target: Coverage Breadth.<br>g<br>« Criteria: Recency.<br><!-- End of picture text -->

Adaptable, High-Value Results Seif-Directed Strategy 

###### The Architect's Approach: 

: 

Specify research goals and quality criteria rather than procedural steps. Let the specialized subagent determine its own search strategy. Keep tool interfaces generic but add enum parameters (e.g., analysis_type: extraction | summarization) to guide behavior. 

tool: 'analyze_document', params: { | analysis_type: ‘extraction’ | ‘summarization’ } 

The Architect’s Reference Matrix 

# oe ete 

_I 

el 

The Production Architecture Blueprint 



<!-- Start of picture text -->
Intelligence at Execution Layer<br>the edges.<br>Granular Application<br>:<br>>» | Real-time | Tools Intercepts synthasie<br>Tool A | Validation Guardrails . | Result Aggregation<br><a<br>Router [e Tool Bo | Policy Enforcement Formatting<br>a Schema Checks Delivery<br>,<br>Batch | Avstal [Ce<br>Strict typing in-) ia Application intercepts<br>the middle. guarding the core.<br>a LL ae<br>\ State Management (Pruning + Shared Vector) i<br>| Pruning Logic Shared Vector Store<br>| (pruning) (data) Ge<br>© hey ON<br>(| Context Window Manago e ment )A AMEIN<br>Shared memory 7 N CERTIFIED }<br>sustaining the lifecycle. CN,<br>sie<br><!-- End of picture text -->

