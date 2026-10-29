/* Quick Warm-Up — question data. Each question: s=scenario index, d=domain, t=task, q=question, o=options, a=correct index (array for "select two"), e=explanation. */
window.EXAM = {
"id": "warmup",
"title": "Quick Warm-Up",
"intro": "A short warm-up: 20 questions, 40 minutes if timed. Good for exam morning or a quick check-in.",
"scenarios": [
{
"name": "Customer Support Resolution Agent",
"text": "An online furniture retailer runs a support agent built with the Claude Agent SDK. It handles returns, refunds, delivery problems and order changes through tools such as lookup_order, process_refund, update_order and escalate_to_human. Human agents pick up escalated cases from a queue and can't see the chat transcript."
},
{
"name": "Code Generation with Claude Code",
"text": "A platform team of 25 engineers uses Claude Code on a TypeScript services repository with a Terraform infra/ folder. You maintain the team's shared Claude Code configuration: CLAUDE.md, rules, skills, commands and MCP servers."
},
{
"name": "Structured Data Extraction",
"text": "A finance operations team extracts data from supplier invoices, receipts and credit notes into the accounting system. Extraction uses Claude with JSON-schema tools, followed by validation in code. Some documents are scanned and incomplete."
}
],
"questions": [
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "A customer's first message is: \"My sofa is two weeks late and I want to talk to a real person.\" What should the agent do?",
"o": [
"Ask why they want a person before deciding whether to escalate",
"Offer a discount on the order so the customer stays in the chat",
"Escalate to a human right away, as the customer asked",
"Look up the order first, then offer a human if it can't help"
],
"a": 2,
"e": "An explicit request for a human is honored immediately, without first trying to resolve the issue or asking for justification."
},
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 2,
"q": "Select two. The team wants escalation to be triggered reliably. Which triggers should they use?",
"o": [
"The customer explicitly asks for a human agent",
"The request falls outside what the policy covers, such as a price match the policy doesn't mention",
"A sentiment score shows the customer is very angry",
"The conversation has gone on for more than ten turns",
"The agent's self-reported confidence drops below 0.7"
],
"a": [
0,
1
],
"e": "Explicit requests and policy gaps are reliable triggers. Sentiment scores and self-reported confidence don't track case complexity, and turn counts are an arbitrary proxy."
},
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "A customer is clearly annoyed that they received the wrong colour of cushion, but hasn't asked for a person. The policy covers a free exchange. What should the agent do?",
"o": [
"Acknowledge it, offer the exchange, and escalate only if they ask for a person",
"Offer the exchange straight away, without acknowledging how the customer feels",
"Escalate to a human immediately, since the customer is clearly upset about it",
"Ask the customer to rate their frustration before deciding what to do"
],
"a": 0,
"e": "A straightforward, in-policy issue is resolved directly, with the frustration acknowledged; escalate if the customer then asks for a human."
},
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "The agent escalates a damaged-delivery case. Human agents pick cases up from a queue and can't see the transcript. What should the escalation contain?",
"o": [
"A link to the chat transcript, so the human agent can read the full conversation themselves",
"A structured summary: order and customer IDs, the problem, steps tried, and a recommendation",
"Nothing beyond the customer ID, since the human agent will ask the customer for the details",
"The single line \"Customer needs help with a damaged delivery\", so the queue stays easy to scan"
],
"a": 1,
"e": "Humans who can't see the transcript need a structured handoff with the IDs, the issue, the steps taken and a recommendation."
},
{
"s": 0,
"d": "D1",
"t": "1.4",
"k": 1,
"q": "Policy says refunds over $500 need a manager's approval. The prompt states this, yet the agent occasionally processes $600 refunds directly. What is the best fix?",
"o": [
"Have a second Claude instance review every refund the agent processes, after it's issued",
"Restate the $500 rule in capital letters at both the start and the end of the system prompt",
"A hook on process_refund that blocks amounts over $500 and routes them to manager approval",
"Add five examples of refunds over $500 being escalated to a manager to the system prompt"
],
"a": 2,
"e": "A rule with financial consequences that must always hold is enforced in code before the action, not by stronger prompting or review after the fact."
},
{
"s": 0,
"d": "D2",
"t": "2.2",
"k": 1,
"q": "lookup_order returns an empty list both when no order matches and when the order database times out. After timeouts, the agent tells customers their order doesn't exist. What is the fix?",
"o": [
"Return an error in both cases, so the agent never tells a customer an order doesn't exist",
"Retry every empty result three times before the agent tells the customer anything at all",
"Have the agent always ask customers to double-check their order number when nothing is found",
"A retryable transient error on timeouts; an empty result only when no order matches"
],
"a": 3,
"e": "A failed lookup and a valid empty result need different responses, so the tool must distinguish them."
},
{
"s": 0,
"d": "D5",
"t": "5.1",
"k": 1,
"q": "A customer raises three issues in one chat: a refund for order 1182, a new address for order 1190, and a missing screw kit. After a long exchange, the agent mixes up the order numbers. What is the best fix?",
"o": [
"Ask the customer to open three separate chats, one for each of the issues they want to raise",
"Summarize the conversation more often, so that the agent's context window stays short and clear",
"Keep each issue's order number, request and status in a structured block that isn't summarized",
"Remind the agent in its system prompt to read order numbers carefully before acting on them"
],
"a": 2,
"e": "Per-issue facts extracted into a persistent structured block survive long conversations and summarization."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "Terraform conventions should apply to every .tf file anywhere under infra/, which has nested module folders. What should the rule's paths be?",
"o": [
"paths: [\"**/infra.tf\"]",
"paths: [\"infra/*.tf\"]",
"paths: [\"*.tf\"]",
"paths: [\"infra/**/*.tf\"]"
],
"a": 3,
"e": "infra/**/*.tf matches .tf files at any depth under infra/. infra/*.tf only matches files directly in infra/, and *.tf only the root."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "When does a rule in .claude/rules/ with a paths glob get loaded into Claude's context?",
"o": [
"Only when Claude is in plan mode exploring the code",
"When Claude works with a file that matches the glob",
"At the start of every session, along with CLAUDE.md",
"Only when a developer runs the rule as a slash command"
],
"a": 1,
"e": "Path-scoped rules load on demand, when Claude reads or edits matching files, which keeps unrelated standards out of context."
},
{
"s": 1,
"d": "D3",
"t": "3.2",
"k": 1,
"q": "A dependency-audit skill produces hundreds of lines of output, which fill the main conversation and push out earlier context. What should change?",
"o": [
"Split the skill into five smaller skills, so each one produces less output",
"Set context: fork in the skill's frontmatter so it runs in an isolated subagent",
"Ask developers to run /compact every time after they use the audit skill",
"Move the skill's instructions into CLAUDE.md, so they're loaded more efficiently"
],
"a": 1,
"e": "context: fork runs the skill in an isolated subagent, so verbose output stays out of the main conversation."
},
{
"s": 1,
"d": "D3",
"t": "3.2",
"k": 1,
"q": "The team wants a /new-service command that every engineer gets automatically when they clone the repository. Where should it be defined?",
"o": [
"In each engineer's ~/.claude/commands/",
"In a section of the root README.md",
"In .claude/commands/ in the repository",
"In CLAUDE.local.md at the project root"
],
"a": 2,
"e": "Project-scoped commands in .claude/commands/ are version-controlled and shared; ~/.claude/commands/ is personal."
},
{
"s": 1,
"d": "D2",
"t": "2.4",
"k": 1,
"q": "The team wants everyone to use the same Jira MCP server in this repository, but each engineer's API token must not be committed. What is the right setup?",
"o": [
"A user-scoped server that each engineer adds by hand in ~/.claude.json",
"A local-scoped server that one engineer adds and then shares with others",
"A project-scoped .mcp.json with one shared team token written into it",
"A project-scoped .mcp.json that references the token as ${JIRA_TOKEN}"
],
"a": 3,
"e": "Project scope (.mcp.json) is shared through the repository, and environment-variable expansion keeps secrets out of it."
},
{
"s": 1,
"d": "D2",
"t": "2.5",
"k": 1,
"q": "Claude's Edit call fails because the text it wants to replace appears in several places in the file. What is the right next step?",
"o": [
"Use Grep to replace every occurrence of the text across the whole file",
"Read the file, then retry Edit with a unique anchor or fall back to Write",
"Delete the file and ask Claude to regenerate it from memory",
"Retry the same Edit call again, since the failure was most likely only transient"
],
"a": 1,
"e": "Edit needs a unique anchor. Read the file to choose one, and use Read plus Write when no unique anchor exists."
},
{
"s": 1,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "A developer resumes yesterday's session that analyzed the auth module. Overnight, a teammate refactored two of the files Claude had read. What is the best way to continue?",
"o": [
"Resume, and tell Claude which two files changed so it re-reads them",
"Start a fresh session and redo the full analysis of the module",
"Resume and carry on, since Claude will notice the changes by itself",
"Fork yesterday's session, so that the old analysis stays available"
],
"a": 0,
"e": "When a resumed session's context is mostly valid, tell it what changed so it can re-analyze just those files. Start fresh only if most of the earlier context is stale."
},
{
"s": 2,
"d": "D4",
"t": "4.3",
"k": 1,
"q": "There are three extraction tools: extract_invoice, extract_receipt and extract_credit_note. The document type isn't known in advance, and sometimes Claude replies with text instead of calling a tool. How should tool_choice be set?",
"o": [
"\"any\"",
"\"auto\"",
"\"none\"",
"Force extract_invoice"
],
"a": 0,
"e": "\"any\" guarantees a tool call while letting Claude choose the right schema. Forcing one tool would misclassify receipts and credit notes."
},
{
"s": 2,
"d": "D4",
"t": "4.4",
"k": 1,
"q": "Validation flags that the purchase order number is missing. Two retries with the error message don't help, and the document turns out to contain no PO number at all. What should the pipeline do?",
"o": [
"Fill in the PO number from the most recent invoice by the same supplier",
"Record the field as null, and route the document for review if the PO is required",
"Drop the document from the batch and leave it out of the accounting system",
"Keep retrying with stronger wording until the model produces a PO number"
],
"a": 1,
"e": "Retries help with format or structure errors, not with information that isn't in the source. Missing data is recorded as null and handled explicitly."
},
{
"s": 2,
"d": "D5",
"t": "5.5",
"k": 1,
"q": "The team wants to stop human review of extractions that Claude marks as high-confidence. What should they do first?",
"o": [
"Turn off review for every document type once the overall accuracy reaches 97%",
"Ask Claude to explain its confidence on each field before the team trusts the scores",
"Calibrate confidence on labeled data, check accuracy per document type, keep sampling",
"Turn off review for anything above 0.9 confidence, since the model says it is sure"
],
"a": 2,
"e": "Confidence is only useful once it's calibrated against labeled data and checked by segment, with ongoing sampling to catch drift."
},
{
"s": 2,
"d": "D4",
"t": "4.5",
"k": 1,
"q": "The team needs to re-extract 40,000 archived invoices. Nobody needs the results before next week. Which approach fits?",
"o": [
"The Message Batches API, for lower cost",
"Synchronous calls, run as fast as allowed",
"A batch that's polled every few seconds",
"Synchronous calls with a 40,000-item loop"
],
"a": 0,
"e": "Large, non-urgent jobs suit the Message Batches API (about 50% lower cost, results within 24 hours). Polling frequency doesn't change that."
},
{
"s": 2,
"d": "D1",
"t": "1.6",
"k": 1,
"q": "A 120-page loan packet contains a contract, two bank statements and a payslip. One extraction pass over the whole packet misses fields and confuses figures between documents. What is the best approach?",
"o": [
"Extract only the contract, since it should restate all the important figures",
"Run the same single pass three times and keep the most common value per field",
"Ask Claude to read the packet more carefully, with the important fields in bold",
"Extract each document in its own pass, then run a separate pass to reconcile them"
],
"a": 3,
"e": "Splitting a large job into focused per-document passes, plus a cross-document integration pass, avoids attention dilution."
},
{
"s": 2,
"d": "D1",
"t": "1.1",
"k": 1,
"q": "In the extraction agent's loop, the developer sends each tool result back to Claude in a new conversation containing only that result. Claude keeps repeating lookups it has already done. What is wrong?",
"o": [
"Tool results must be appended to the existing history so Claude sees what it did",
"The loop should stop after every tool call and ask a human what the next step should be",
"Claude needs a higher max_tokens setting so that it can remember its earlier lookups",
"The system prompt should list every lookup Claude is allowed to make, in the right order"
],
"a": 0,
"e": "The agentic loop appends each tool result to the conversation, so the model can reason about the next step with the full history."
}
]
};
