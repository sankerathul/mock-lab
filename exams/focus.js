/* Focus Test: Commonly Missed Topics — question data. Each question: s=scenario index, d=domain, t=task, q=question, o=options, a=correct index (array for "select two"), e=explanation. */
window.EXAM = {
"id": "focus",
"title": "Focus Test: Commonly Missed Topics",
"intro": "30 questions on topics that trip people up most: escalation, path rules, human review, sessions, MCP, explicit criteria, built-in tools and iterative refinement.",
"scenarios": [
{
"name": "Customer Support Resolution Agent",
"text": "A telecom company runs a customer support agent built with the Claude Agent SDK. It handles billing questions, plan changes and outage complaints using MCP tools: get_account, lookup_bill, apply_credit, change_plan and escalate_to_human. Policy lets the agent apply credits of up to $75 on its own; anything larger needs a supervisor."
},
{
"name": "Developer Tooling with Claude Code",
"text": "A 60-engineer company uses Claude Code in a Python and TypeScript monorepo with services/, web/, infra/ and libs/ folders. You maintain the team's Claude Code setup: CLAUDE.md files, rules, skills and MCP servers, and the way engineers work with Claude day to day."
},
{
"name": "Loan Document Review",
"text": "A bank uses Claude to extract data from loan applications and supporting documents (pay stubs, bank statements and tax forms) and to flag issues for underwriters. Extracted data feeds automatic approval for small personal loans, so accuracy and auditability matter."
}
],
"questions": [
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "A customer writes in all capitals: \"YOUR NETWORK WAS DOWN FOR THREE DAYS. I WANT A $40 CREDIT.\" The outage is confirmed on their account, and outage credits up to $75 are within the agent's authority. What should the agent do?",
"o": [
"Escalate to a human, because the customer's tone shows they are angry and may churn",
"Acknowledge the disruption, apply the $40 credit, and confirm it to the customer",
"Offer a $20 credit first and raise it to $40 only if the customer pushes back",
"Ask a supervisor to approve the credit first, since the customer is clearly upset"
],
"a": 1,
"e": "Anger is not an escalation trigger when the request is within policy and the agent's authority. Resolve it. Asking for approval that isn't required, or haggling, hurts first-contact resolution."
},
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "A customer asks for a $120 credit after a week-long outage. The outage is confirmed. Policy lets the agent apply up to $75; larger credits need a supervisor. What should the agent do?",
"o": [
"Apply two separate credits of $60 each, so each one stays under the $75 limit",
"Escalate to a supervisor with the case details and the amount requested, and tell the customer what happens next",
"Apply the full $120, since the outage is confirmed on the account and the customer's request is reasonable for a week-long outage",
"Apply the full $75 the agent is allowed to give right now, and tell the customer that this is the most they can receive for the outage"
],
"a": 1,
"e": "The request is beyond the agent's authority, so it goes to a human with a proper handoff. Settling for $75 decides the outcome for the customer, and splitting the credit games the limit."
},
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "The agent has spent several turns explaining a confusing bill. The customer replies: \"Forget it. Get me a manager.\" The agent believes one more explanation would resolve the confusion. What should it do?",
"o": [
"Ask the customer to rate their frustration from 1 to 10 before deciding whether to escalate",
"Try one final, simpler explanation, and escalate only if the customer is still confused afterwards",
"Escalate to a human now, passing along the bill details and what has been explained so far",
"Apologize, summarize the bill again in plain language, and ask whether that helps"
],
"a": 2,
"e": "An explicit request for a human is honored immediately, with context passed along. Another attempt, however well meant, overrides what the customer asked for."
},
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "A customer asks to transfer their account to their adult son, who will take over the bills. The policy documents cover billing, plan changes and cancellations but say nothing about transferring ownership. The agent's tools could change the account holder's name. What should it do?",
"o": [
"Tell the customer to cancel and have the son open a new account instead",
"Make the change, since the customer is verified and the tool allows it",
"Refuse, since anything not listed in the policy documents is not allowed",
"Escalate to a human, since the policy doesn't cover ownership transfers"
],
"a": 3,
"e": "When policy is silent on a request, escalate rather than inventing a decision either way. The tool being able to do something doesn't mean the agent is authorized to."
},
{
"s": 0,
"d": "D5",
"t": "5.2",
"k": 2,
"q": "Select two. Which of these situations should trigger escalation to a human?",
"o": [
"The customer writes \"I need to speak to a supervisor\" in their first message",
"The customer types in all capitals, but wants a standard plan change the agent can make",
"The customer asks for something the policy documents don't address at all",
"The agent rates its own confidence in its answer at 6 out of 10",
"The conversation has reached twelve turns without the customer saying goodbye"
],
"a": [
0,
2
],
"e": "Explicit requests for a human and policy gaps are escalation triggers. Tone, self-rated confidence and turn counts are unreliable signals."
},
{
"s": 0,
"d": "D5",
"t": "5.5",
"k": 1,
"q": "The agent has auto-approved credits under $20 for six months, and audits found 99% of those decisions correct. Leadership wants it to auto-approve credits up to $75. What should you check first?",
"o": [
"Nothing further, since 99% accuracy over six months is strong evidence the agent applies the policy correctly",
"The agent's self-reported confidence on the larger credits it has recommended so far",
"Accuracy on $20 to $75 credits, checked against a human-reviewed sample",
"Customer satisfaction scores for conversations in which the agent issued a credit"
],
"a": 2,
"e": "Accuracy on small credits says little about larger ones, which involve different judgment. Check the segment you're about to automate against human review."
},
{
"s": 0,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "Partway through a billing conversation, a customer leaves to find a PIN and comes back to the same chat five minutes later. Nothing on the account has changed. How should the agent continue?",
"o": [
"Fork the session so the first half of the conversation stays unchanged",
"Start a fresh session and look up the account and bill again from scratch",
"Start a fresh session seeded with a summary of the conversation so far",
"Resume the same session, with all the context it already has"
],
"a": 3,
"e": "When the earlier context is still valid, resume. Starting fresh discards good context, and forking is for exploring separate branches."
},
{
"s": 0,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "The team wants to compare how the agent would handle two different retention offers for the same customer, starting from an identical analysis of their account and usage. Each offer should be explored without the other affecting it. What should they use?",
"o": [
"Fork the session after the account analysis, one branch per offer",
"Run both offers one after the other in the same session and compare",
"Resume the session twice at once, with a different offer in each",
"Start two fresh sessions and repeat the account analysis in each one"
],
"a": 0,
"e": "Fork when the shared baseline is valid and you want independent branches. Sequential work in one session cross-contaminates, and fresh sessions repeat the analysis."
},
{
"s": 0,
"d": "D1",
"t": "1.4",
"k": 1,
"q": "Credits over $75 are occasionally applied without a supervisor. A teammate proposes adding a second Claude instance that reviews each apply_credit call and blocks any that break policy. What is the better fix?",
"o": [
"A PreToolUse hook on apply_credit that blocks amounts over $75 and routes them to escalate_to_human",
"A nightly report of credits over $75 so supervisors can reverse the ones they disagree with",
"The second Claude reviewer, since an independent instance catches the mistakes that the first instance makes",
"A stronger rule in the system prompt, with examples of credits that need a supervisor"
],
"a": 0,
"e": "A numeric threshold is something code can check with certainty, so enforce it in a hook. Independent Claude review is for judgment calls, not for limits code can verify."
},
{
"s": 0,
"d": "D1",
"t": "1.3",
"k": 1,
"q": "The coordinator passes a plan-change request to the plan subagent with only \"customer wants to downgrade\". The subagent then asks the customer for their account number and current plan, which the coordinator already verified. What is the best fix?",
"o": [
"Give the plan subagent the full transcript of every conversation the coordinator handles",
"Have the plan subagent call get_account again at the start of every task it receives",
"Pass the verified account ID, current plan and the customer's stated goal in the delegation",
"Let the plan subagent message the customer directly whenever it needs any details"
],
"a": 2,
"e": "Subagents only know what they're given. Pass the specific context the task needs rather than the full history, and don't make the customer repeat themselves."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "Handler conventions should apply to every Python file under any handlers folder in services/, including nested ones such as services/billing/handlers/v2/refund.py. Which paths pattern does that?",
"o": [
"services/*/handlers/*.py",
"services/**/handlers/**/*.py",
"services/handlers/**/*.py",
"**/handlers/*.py"
],
"a": 1,
"e": "** crosses any number of folders, so both the service name and nested subfolders like v2/ are covered. A single * stays inside one folder, so the other patterns miss nested files or the per-service folder."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "A rule meant for SQL migrations has paths: [\"*.sql\"]. It never loads when Claude edits services/ledger/migrations/0042_add_index.sql. Why?",
"o": [
"*.sql only matches .sql files in the project root, not files in subfolders",
"Path rules can only target code files, not SQL or other data files",
"The paths list needs absolute file paths rather than glob patterns",
"Path rules load only after Claude Code is restarted in the project"
],
"a": 0,
"e": "A pattern without ** matches only at the root. **/migrations/*.sql or **/*.sql would match the file."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 2,
"q": "Select two. Which of these belong in .claude/rules/ files with paths globs?",
"o": [
"Migration conventions that apply to the migrations folder in each of 14 services",
"Running the black formatter automatically after every edit Claude makes to a Python file",
"\"I prefer detailed explanations of every change\" for one engineer",
"The company's commit message format, used for every change",
"Pytest conventions for every test_*.py file across the repository"
],
"a": [
0,
4
],
"e": "Path rules suit conventions tied to a file pattern spread across folders. Repo-wide standards go in the root CLAUDE.md, personal preferences in user memory, and automatic actions in hooks."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "A rule file has paths: [\"**/*.tf\"]. When does Claude Code load it?",
"o": [
"Only when Claude runs a Bash command inside infra/",
"At the start of every session, along with CLAUDE.md",
"Only when the user runs a slash command that names it",
"When Claude reads or edits a file matching **/*.tf"
],
"a": 3,
"e": "Path-scoped rules load on demand, when Claude works with a matching file. Rules without paths load unconditionally."
},
{
"s": 1,
"d": "D2",
"t": "2.4",
"k": 2,
"q": "Select two. The team's internal MCP server will expose several capabilities. Which are best exposed as MCP resources?",
"o": [
"restart_service, which restarts a deployment when Claude decides it's needed",
"create_ticket, which files a ticket in the tracker",
"An incident postmortem template that engineers pick from the slash menu",
"The on-call runbook library, about 300 pages Claude should be able to consult",
"The service ownership catalog showing which team owns each service"
],
"a": [
3,
4
],
"e": "Resources are content to read: runbooks and catalogs. Actions Claude decides to take are tools, and templates users pick from the / menu are prompts."
},
{
"s": 1,
"d": "D2",
"t": "2.4",
"k": 1,
"q": "A teammate committed .mcp.json with a PagerDuty API key written into it, reasoning that the repository is internal-only. What should you do?",
"o": [
"Use ${PAGERDUTY_TOKEN} in .mcp.json and rotate the exposed key",
"Add .mcp.json to .gitignore, so the configuration and the key stay off the repository",
"Leave it as it is, since only employees can read the internal repository",
"Move the PagerDuty server to the teammate's user scope so the key stays on one machine"
],
"a": 0,
"e": "Secrets never go in .mcp.json; environment-variable expansion keeps the shared config while each person supplies their own key, and a committed key must be rotated. Ignoring the file or moving it to user scope stops the team getting the server."
},
{
"s": 1,
"d": "D2",
"t": "2.4",
"k": 1,
"q": "An engineer wants their personal Notion MCP server available in every repository they work in, without adding it to any shared configuration. How should they add it?",
"o": [
"In each repository's .mcp.json, marked so that teammates can ignore it",
"With the default scope, which makes it available in all of their projects",
"In the root CLAUDE.md of each repository they work in",
"With user scope (claude mcp add --scope user), stored in ~/.claude.json"
],
"a": 3,
"e": "User scope applies across all of your projects and isn't shared. The default (local) scope applies only to the current project, and .mcp.json is shared with the team."
},
{
"s": 1,
"d": "D2",
"t": "2.5",
"k": 1,
"q": "Claude needs to find every place the STRIPE_WEBHOOK_SECRET environment variable is read across 40 services. Which built-in tool fits best?",
"o": [
"Grep",
"Read",
"Glob",
"Write"
],
"a": 0,
"e": "Grep searches file contents, such as where a variable name appears. Glob matches file names and paths."
},
{
"s": 1,
"d": "D2",
"t": "2.5",
"k": 1,
"q": "Claude needs to change a six-line block that appears identically in two functions of the same file, but only in the second function. Edit fails because the anchor isn't unique, even with the whole block included. What should it do?",
"o": [
"Stop and ask the engineer to make the change by hand, since Edit can't target it",
"Edit both copies of the block, since identical code should stay consistent anyway",
"Read the file and Write the corrected version, changing only the second function",
"Use Bash with sed to replace both copies of the block, then revert the first one"
],
"a": 2,
"e": "Widen the anchor first; when no unique anchor exists, fall back to Read plus Write. Giving up or changing code you weren't asked to change are both wrong."
},
{
"s": 1,
"d": "D3",
"t": "3.5",
"k": 1,
"q": "Claude has written a date-parsing helper three times from a detailed prose spec. Each version mishandles \"03/04/2026\" from UK users and empty strings, in different ways. What is the most effective next step?",
"o": [
"Ask Claude to explain its interpretation of the spec before writing a fourth version",
"Give concrete input and expected-output pairs, such as \"03/04/2026\" (UK) giving 2026-04-03 and an empty string giving null",
"Add more detail to the prose spec, describing every supported date format, every locale and how empty values should be treated",
"Switch to plan mode and have Claude plan the parser's structure and its date-format handling before it writes any code again"
],
"a": 1,
"e": "When prose keeps producing inconsistent results, concrete input/output examples remove the ambiguity."
},
{
"s": 1,
"d": "D3",
"t": "3.5",
"k": 1,
"q": "A 40-line pricing function now fails 3 of 20 edge-case tests that the engineer wrote first. The engineer is considering switching to plan mode to rethink the approach. What is the better next step?",
"o": [
"Share the failing test output with Claude and iterate until all the tests pass",
"Ask Claude to rewrite the function in a completely different style",
"Switch to plan mode and have Claude design the function again from the start",
"Delete the three failing tests, since 17 of 20 passing is good enough"
],
"a": 0,
"e": "With tests already in place, iterate on the specific failures. Plan mode is for large or architectural changes with design choices."
},
{
"s": 1,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "An engineer resumes yesterday's named debugging session. Overnight, a teammate merged a fix that touched 3 of the 25 files the session analyzed. What should the engineer do?",
"o": [
"Start a fresh session and have it re-analyze all 25 files from the beginning",
"Resume the session and tell it which three files changed, so it re-reads only those",
"Fork the session and analyze the three changed files only in the fork",
"Resume the session without mentioning the merge; it will see the changes itself"
],
"a": 1,
"e": "Most of the context is still valid, so resume, and name the changed files. A resumed session won't notice changes on its own, because its earlier reads look current."
},
{
"s": 2,
"d": "D5",
"t": "5.5",
"k": 1,
"q": "Overall extraction accuracy is 98%. Underwriters propose skipping review for any extraction where the model reports confidence of 0.9 or higher. What should happen first?",
"o": [
"Adopt the 0.9 threshold, since 98% overall accuracy already shows the model is reliable across documents",
"Ask the model to report its confidence more carefully before using the threshold",
"Calibrate field-level confidence against a labeled validation set, separately for each document type",
"Raise the threshold to 0.95 to be safe, and then skip review above it"
],
"a": 2,
"e": "Self-reported confidence is only useful once it's checked against labeled data, by document type and field. Overall accuracy doesn't show whether 0.9 means the same thing for pay stubs and tax forms."
},
{
"s": 2,
"d": "D5",
"t": "5.5",
"k": 2,
"q": "Select two. Underwriters can review 200 of the 5,000 extractions processed each day. How should that capacity be used?",
"o": [
"Skip review entirely for loans above a certain amount, since those get manual checks later",
"Split the 200 reviews evenly across the bank's branches, whatever their confidence",
"Keep part of the capacity for a random sample of auto-approved extractions, to catch new error patterns",
"Review the first 200 extractions that arrive each morning",
"Send extractions with low calibrated confidence or a detected conflict to reviewers first"
],
"a": [
2,
4
],
"e": "Spend scarce review on likely errors, and keep sampling high-confidence output to detect drift. Even splits and arrival order ignore risk."
},
{
"s": 2,
"d": "D5",
"t": "5.5",
"k": 1,
"q": "The error dashboard shows 1.5% of extracted fields wrong overall. A breakdown shows bank statements from one regional bank have a 12% error rate. What does this mean for automatic approval?",
"o": [
"Nothing changes, since 1.5% overall is well within the bank's tolerance",
"Ask the model to be more careful with documents from that regional bank",
"Pause all automatic approval until the overall error rate falls below 1%",
"Keep that bank's statements under human review until they improve"
],
"a": 3,
"e": "An aggregate rate can hide a segment that fails badly. Treat the weak segment on its own terms."
},
{
"s": 2,
"d": "D4",
"t": "4.1",
"k": 1,
"q": "The prompt asks Claude to flag \"suspicious income\". Underwriters dismiss most flags as harmless, such as a one-off bonus. What is the best fix?",
"o": [
"Flag only the 5% of applications with the highest suspicion scores",
"Ask Claude to report a confidence level with each flag, and show underwriters only the flags with high confidence",
"Change the instruction to \"flag only clearly suspicious income\", so that borderline cases are no longer raised to underwriters",
"Define what to flag (income over 10% above bank deposits) and what to ignore (documented one-off bonuses)"
],
"a": 3,
"e": "Precision comes from explicit criteria for what to report and what to skip. Stricter-sounding wording, quotas and confidence filters don't define what counts."
},
{
"s": 2,
"d": "D4",
"t": "4.1",
"k": 1,
"q": "One flag category, \"formatting inconsistencies\", is dismissed 80% of the time, and underwriters have started ignoring all flags, including real income mismatches. What is the best immediate step?",
"o": [
"Keep every category active, but add \"only flag important formatting issues\" to the prompt so fewer minor ones are raised",
"Turn off the formatting category for now, and rewrite its criteria with concrete examples before turning it back on",
"Lower the severity of every flag category, so underwriters feel less overwhelmed and look at each flag more calmly",
"Show underwriters only one flag per application, chosen at random"
],
"a": 1,
"e": "A noisy category erodes trust in every flag. Disable it temporarily while you define it properly."
},
{
"s": 2,
"d": "D4",
"t": "4.1",
"k": 1,
"q": "Claude flags \"missing documents\" on many complete applications. The prompt says \"flag any application that appears to be missing documents.\" What change will most reduce false flags?",
"o": [
"Require two separate Claude passes to agree before any missing-document flag is raised to underwriters",
"Remove the missing-document check, since underwriters review the files anyway",
"List the required documents for each loan type, and flag only when a listed document is absent",
"Tell Claude to flag missing documents only when it is completely certain"
],
"a": 2,
"e": "Explicit criteria (a checklist per loan type) define the boundary. Certainty wording and voting don't tell the model what \"complete\" means."
},
{
"s": 2,
"d": "D1",
"t": "1.2",
"k": 1,
"q": "To speed things up, the pipeline splits 300-page application bundles into 50-page chunks for parallel subagents. Bank statements that span two chunks get counted twice. A teammate proposes overlapping the chunks by 5 pages and deduplicating afterwards. What is the better fix?",
"o": [
"Use the 5-page overlap and deduplicate statements by matching their totals",
"Split the bundle at document boundaries, so each subagent receives whole documents",
"Increase the chunk size to 100 pages so fewer statements cross a boundary",
"Process each bundle in a single subagent, so there are no chunk boundaries"
],
"a": 1,
"e": "Fix the partitioning at its source: split along natural units. Overlap-and-deduplicate treats the symptom, one subagent loses parallelism, and bigger chunks only move the boundaries."
},
{
"s": 2,
"d": "D5",
"t": "5.6",
"k": 1,
"q": "A recent pay stub shows monthly income of $6,200. The applicant's tax form shows annual income of $68,000, about $5,667 a month, but it's for the previous year. A summary for the underwriter reported an \"income conflict\". How should the output handle this?",
"o": [
"Report both, with sources and dates; it may reflect a raise",
"Report only the pay stub, since it's the most recent document",
"Report the average of the two monthly figures as the applicant's income",
"Report only the tax form, since it's an official government document"
],
"a": 0,
"e": "Dates distinguish change over time from contradiction. Keep both values with sources and dates and let the underwriter judge; choosing or averaging hides information."
}
]
};
