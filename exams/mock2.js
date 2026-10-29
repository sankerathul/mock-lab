/* Full Mock Test 2 — question data. Each question: s=scenario index, d=domain, t=task, q=question, o=options, a=correct index (array for "select two"), e=explanation. */
window.EXAM = {
"id": "mock2",
"title": "Full Mock Test 2",
"intro": "A second full-length mock with no repeats from Mock Test 1. It covers the two scenarios Mock Test 1 leaves out.",
"scenarios": [
{
"name": "Multi-Agent Research System",
"text": "Your team runs a multi-agent research system built with the Claude Agent SDK for a market-intelligence group. A coordinator breaks each research question into subtasks and delegates to subagents: a web-search agent, a document-analysis agent that reads the firm's internal reports, and a synthesis agent that writes cited briefings. Analysts use the briefings to advise clients, so accuracy and traceable sources matter more than speed."
},
{
"name": "Code Generation with Claude Code",
"text": "A 25-person product team uses Claude Code every day on a TypeScript monorepo with web, api and shared packages. You own the team's Claude Code setup: CLAUDE.md files, rules, custom commands and skills, and the workflows engineers follow for generation, refactoring, debugging and documentation."
},
{
"name": "Customer Support Resolution Agent",
"text": "A subscription software company runs a customer support agent built with the Claude Agent SDK. A coordinator handles each conversation and delegates to billing, returns and account specialist subagents. Tools come from MCP servers: get_customer, lookup_subscription, lookup_invoice, process_refund, update_account, log_action and escalate_to_human. The target is high first-contact resolution with correct escalation."
},
{
"name": "Structured Data Extraction",
"text": "A freight-forwarding company uses Claude to extract structured data from shipping documents (bills of lading, commercial invoices, packing lists and customs declarations) that arrive as scans and PDFs from carriers worldwide. Extracted records are validated against JSON schemas and posted to a customs and ERP system. Volume is about 30,000 documents a day."
}
],
"questions": [
{
"s": 0,
"d": "D1",
"t": "1.2",
"k": 1,
"q": "For a question about the EV battery supply chain, the coordinator spawns two web-search subagents with the scopes \"battery raw materials\" and \"lithium and cobalt sourcing\". Their results overlap by about 60%, and the briefing cites the same sources twice. What is the best fix?",
"o": [
"Have the coordinator partition the question into non-overlapping subtopics and tell each subagent what falls outside its scope",
"Keep the scopes and have the synthesis agent deduplicate overlapping sources before it writes the briefing, so nothing is cited twice",
"Give both subagents the same scope but different search engines, so that the overlap between their results naturally goes down",
"Use a single web-search subagent for every question, so overlapping coverage between search subagents can't happen in the first place"
],
"a": 0,
"e": "The duplication comes from overlapping assignments, so fix it where scopes are set. Deduplicating at synthesis hides wasted work, one agent gives up parallelism, and different engines still return overlapping sources."
},
{
"s": 0,
"d": "D1",
"t": "1.1",
"k": 1,
"q": "In the coordinator's custom loop, after the code executes a Task call for a subagent, it sends the next request to the model with the original messages only. The model then issues the same Task call again, over and over. What is wrong?",
"o": [
"The coordinator's system prompt needs an instruction never to call the same subagent twice for a single research question",
"The loop must append the assistant's tool_use turn and a user turn carrying the matching tool_result before calling the model again",
"Task should be removed from allowedTools after its first use in a conversation, so the model can't call it a second time",
"The loop should stop when the same tool call appears twice in a row and return the last available result to the analyst as the final answer"
],
"a": 1,
"e": "Tool results have to be appended to the conversation between iterations, or the model never sees them and asks again. The other options suppress the symptom and would also block legitimate repeat calls."
},
{
"s": 0,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "After a shared landscape analysis of the semiconductor market, analysts want to develop two competing explanations for a price spike (demand-driven and supply-driven) in depth, without one line of reasoning influencing the other. What is the best approach?",
"o": [
"Resume the analysis session twice at the same time, giving each copy a different explanation to pursue",
"Develop both explanations one after the other in the same session, then ask the model to compare them at the end",
"Use fork_session from the analysis session to create two branches, one for each explanation",
"Start two fresh sessions and repeat the full landscape analysis in each before developing its explanation"
],
"a": 2,
"e": "fork_session branches independent lines of work from a shared baseline. Working sequentially in one session cross-contaminates the reasoning, and fresh sessions redo the analysis."
},
{
"s": 0,
"d": "D5",
"t": "5.1",
"k": 1,
"q": "Web-search subagents return long transcripts of their reasoning along with what they found. With eight subagents running, the synthesis agent runs short of context and drops findings. What is the best fix?",
"o": [
"Have each search subagent return structured findings (claim, source, date, excerpt) instead of its reasoning transcript",
"Give the synthesis agent a model with a larger context window, so that all eight full transcripts fit at once",
"Run synthesis in two halves over four transcripts each, then concatenate the two drafts into a single briefing",
"Ask the synthesis agent to skim each transcript quickly and concentrate only on the parts that look most important"
],
"a": 0,
"e": "When the downstream context is tight, upstream agents should return structured data rather than verbose reasoning. A bigger window or split drafts treat the symptom, and splitting also breaks cross-source synthesis."
},
{
"s": 0,
"d": "D5",
"t": "5.1",
"k": 1,
"q": "The synthesis agent receives about 40 findings in one long input. Briefings consistently cover the first and last findings well but miss important ones from the middle. What is the most effective change to the input?",
"o": [
"Shuffle the order of the findings on every run, so that different findings land in the middle each time",
"Keep only the 15 most recent findings, so the input is short enough for the model to read evenly",
"Repeat the full set of findings twice in the input, so that each one appears in more than one position",
"Open the input with a short summary of the key findings and organize the rest under explicit section headers"
],
"a": 3,
"e": "Position effects are countered by surfacing key findings up front and structuring the rest with headers. Shuffling only moves the problem, truncating drops information, and repetition doubles the length."
},
{
"s": 0,
"d": "D5",
"t": "5.3",
"k": 1,
"q": "During one run, sources for one of the four regions in the question were paywalled, and the search subagent returned very little for it. The briefing presented its conclusions as covering all four regions equally. What should change?",
"o": [
"Have the coordinator stop the run and return an error whenever any region has noticeably fewer results than the others",
"Leave the briefing as it is and record the paywall problem in the system logs for the engineering team",
"Have the synthesis agent fill that region's gap from its general knowledge, so the briefing stays balanced",
"Have the synthesis output state its coverage for each section, flagging the region where sources were unavailable"
],
"a": 3,
"e": "Coverage annotations tell analysts which conclusions rest on thin evidence. Stopping the run is too drastic, model knowledge isn't traceable, and logs hide the gap from the people relying on the briefing."
},
{
"s": 0,
"d": "D5",
"t": "5.3",
"k": 1,
"q": "The web-search subagent reports every transient HTTP 503 from the search API straight to the coordinator, which then replans the whole research task. Most 503s clear within seconds. What is the best fix?",
"o": [
"Let the subagent retry transient errors itself, and escalate only failures it can't resolve, with partial results and what it tried",
"Have the coordinator ignore error reports from subagents entirely and simply wait for their final results to arrive, however long that takes",
"Stop the research task at the first 503 and ask the analyst to run it again later, once the search API has been stable for at least an hour",
"Switch the subagent to a different search provider whenever it sees a 503, without telling the coordinator"
],
"a": 0,
"e": "Subagents recover locally from transient failures and propagate only what they can't fix, with context. Ignoring every report and failing the whole task are opposite extremes, and a silent provider switch hides a change in provenance."
},
{
"s": 0,
"d": "D5",
"t": "5.6",
"k": 2,
"q": "Select two. For a question on a drug's effectiveness, the sources are a large meta-analysis, a single small study with the opposite result, and two news articles summarizing them. How should the synthesis handle this?",
"o": [
"Keep each source's characterization and methodology (meta-analysis, small study, news summary) next to the claims it supports",
"Report only the meta-analysis, since one small study can't outweigh it and mentioning it would only confuse readers",
"Separate well-established findings from contested ones, rather than presenting all four sources as equally strong",
"Count the sources on each side and present whichever result has more sources supporting it as the conclusion",
"Average the effect sizes from the meta-analysis and the small study and report the result as one estimate"
],
"a": [
0,
2
],
"e": "Synthesis should preserve uncertainty and source quality: say what is established, what is contested and why. Dropping the dissenting study, counting sources (news summaries aren't independent evidence) or averaging hides that."
},
{
"s": 0,
"d": "D2",
"t": "2.3",
"k": 1,
"q": "The document-analysis agent has a generic fetch_url tool. While reading an internal report it followed a link to an external blog and included unvetted claims in its findings. All internal reports live in one document repository. What is the best fix?",
"o": [
"Have the synthesis agent remove any finding whose source URL isn't on the internal domain before writing the briefing",
"Replace fetch_url with a load_document tool that only loads documents from the internal repository and rejects other URLs",
"Keep fetch_url, but add a system prompt rule that the agent must never follow links pointing outside the company",
"Also give the document agent the web-search agent's tools, so it can verify external claims before it uses them"
],
"a": 1,
"e": "Replace a broad tool with a constrained one that enforces the boundary itself. A prompt rule is probabilistic, filtering at synthesis is late, and more tools widen the agent's role."
},
{
"s": 0,
"d": "D2",
"t": "2.1",
"k": 1,
"q": "The search_news tool takes a date_range parameter. Claude often passes values like \"last quarter\" or \"since March\", and the tool returns validation errors. Its description says only \"date_range: the period to search.\" What is the best fix?",
"o": [
"Add a system prompt rule to always search the last 90 days unless the analyst explicitly names a date",
"Retry the call automatically with a default range whenever the date_range value fails validation",
"Document the required format (ISO 8601 start and end dates) in the description, with examples",
"Change the tool to accept any free-text date phrase and have the server guess the intended range from it"
],
"a": 2,
"e": "Descriptions should state input formats, give examples and cover edge cases. Server-side guessing, blanket defaults and silent retries all return results for a period the analyst didn't ask about."
},
{
"s": 0,
"d": "D4",
"t": "4.2",
"k": 1,
"q": "Citations in the briefings are inconsistent: some give only a URL, some only a title, and some a publisher and date. The prompt says \"cite sources properly.\" What is the most effective fix?",
"o": [
"Drop citations from the briefing body and append a list of every URL the subagents visited at the end of each briefing",
"Replace \"cite sources properly\" with \"cite all sources carefully and consistently, in a professional style\"",
"Let analysts fix the citations by hand during review, since the preferred format varies by client anyway",
"Add two or three examples showing the exact citation format (title, publisher, date, URL) for different source types"
],
"a": 3,
"e": "Examples are the most reliable way to demonstrate an output format. Rewording a vague instruction keeps it vague, and a list of visited URLs loses the mapping between claims and sources."
},
{
"s": 0,
"d": "D4",
"t": "4.6",
"k": 2,
"q": "Select two. The synthesis agent checks its own briefing before delivery and almost never finds problems, yet analysts keep finding statistics attributed to the wrong source. How should a fact-check pass be set up?",
"o": [
"Run it in a separate instance that did not write the briefing",
"Give it the briefing together with the source excerpts each claim cites, so it can check every claim against its source",
"Run it as a final instruction in the same synthesis session, asking the model to be especially critical",
"Give it the synthesis agent's full reasoning, so it understands why each claim was worded the way it was",
"Give it only the finished briefing, so it judges the text exactly as a client would read it"
],
"a": [
0,
1
],
"e": "An independent instance without the author's reasoning catches more, and it needs the cited excerpts to verify each claim. The author's reasoning anchors the reviewer, and the briefing alone gives it nothing to check against."
},
{
"s": 0,
"d": "D5",
"t": "5.6",
"k": 1,
"q": "Analysts say briefings are hard to use: revenue and margin comparisons across six companies are written as long paragraphs, while a short list of regulatory events is crammed into a dense table. What should the synthesis prompt specify?",
"o": [
"Let the synthesis agent choose any format it likes, as long as each section stays under 300 words",
"Match format to content: financial comparisons as tables, news and narrative as prose, technical findings as lists",
"Use tables for every section, so that all of the content in a briefing shares one consistent and easily scanned format",
"Use prose for every section, since clients read briefings as narrative documents rather than as collections of data"
],
"a": 1,
"e": "Format should follow the type of content. One format for everything is either hard to scan or hard to read, and leaving it open produces the inconsistency analysts complain about."
},
{
"s": 0,
"d": "D1",
"t": "1.4",
"k": 1,
"q": "Policy: no briefing may be published to the client portal until a human analyst has approved it. The synthesis agent has a publish_briefing tool, and twice it published drafts before approval. What is the best fix?",
"o": [
"Check the client portal every morning and unpublish any briefing that went out without an approval on record",
"Have the synthesis agent ask the analyst for approval in its final message before it calls publish_briefing",
"State the approval rule in the synthesis agent's system prompt and repeat it in the publish_briefing tool description",
"Block publish_briefing in code unless an analyst approval is recorded for that briefing, whatever the agent decides"
],
"a": 3,
"e": "A rule that must always hold needs a programmatic prerequisite on the action. Prompt rules and asking in a message are probabilistic, and cleaning up after publication is too late."
},
{
"s": 0,
"d": "D2",
"t": "2.4",
"k": 1,
"q": "The firm has 1,200 internal reports. The document-analysis agent spends many tool calls running searches just to discover which reports exist on a topic before it reads anything. What is the most effective change to the reports MCP server?",
"o": [
"Add a list_all_reports tool that returns the full text of all 1,200 reports in a single call",
"Expose the report catalog (titles, topics, dates) as an MCP resource the agent can read up front",
"Raise the agent's tool-call limit so that its exploratory searches always have room to finish",
"Paste the titles of all 1,200 reports into the document agent's system prompt and refresh it monthly"
],
"a": 1,
"e": "Content catalogs belong in MCP resources, so agents can see what exists without exploratory calls. Full text in one call is enormous, a higher limit pays for the problem, and a hardcoded list goes stale."
},
{
"s": 1,
"d": "D3",
"t": "3.1",
"k": 2,
"q": "Select two. Which of these belong in the project's committed CLAUDE.md?",
"o": [
"The 40-step quarterly release procedure, including its rollback script",
"Explain your changes to me in Portuguese, since it's my first language",
"The staging API token, so Claude can call staging during integration tests",
"Use named exports; don't add default exports in the shared packages",
"Run pnpm test for the affected package before proposing a commit"
],
"a": [
3,
4
],
"e": "The project CLAUDE.md holds team standards that apply in every session. Personal preferences go in user-level memory, occasional procedures belong in a skill, and secrets never go in CLAUDE.md."
},
{
"s": 1,
"d": "D3",
"t": "3.2",
"k": 1,
"q": "The team's /review command lives in .claude/commands/review.md. One engineer wants a variant that also checks accessibility, just for themselves, without changing what teammates get. What should they do?",
"o": [
"Create a personal command with its own name, such as ~/.claude/commands/review-a11y.md",
"Edit .claude/commands/review.md in their working copy and take care never to commit the change",
"Add an accessibility section to the project CLAUDE.md, so that /review picks it up automatically",
"Ask the team to add an accessibility option to the shared /review command that everyone uses"
],
"a": 0,
"e": "Personal commands in the user directory work across your projects without affecting teammates, and a distinct name avoids clashing with the team command. Uncommitted edits to a shared file are fragile, and changing CLAUDE.md or the shared command affects everyone."
},
{
"s": 1,
"d": "D3",
"t": "3.2",
"k": 1,
"q": "The root CLAUDE.md contains a 40-step release checklist that's used about once a week. It loads into every session and takes up context during everyday coding. What is the best change?",
"o": [
"Cut the checklist down to the ten most important steps so it takes less room in CLAUDE.md",
"Move the checklist into each engineer's ~/.claude/CLAUDE.md so it loads only for them",
"Move the checklist into a project skill that engineers invoke when they cut a release",
"Keep it in CLAUDE.md but label the section as optional so that Claude can skip it"
],
"a": 2,
"e": "CLAUDE.md is for standards that apply in every session; on-demand workflows belong in skills, which load only when used."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "A rule file in .claude/rules/ has paths: [\"src/*.test.tsx\"] in its frontmatter. It doesn't load when Claude edits packages/web/src/components/Button.test.tsx. Which pattern should the rule use?",
"o": [
"**/*.test.tsx",
"src/**/*.test.tsx",
"packages/*/src/*.test.tsx",
"**/*.tsx"
],
"a": 0,
"e": "** matches any number of directories, so **/*.test.tsx finds test files anywhere. The anchored patterns miss files outside src/ at the root or in nested folders, and **/*.tsx would load the test conventions for every component."
},
{
"s": 1,
"d": "D3",
"t": "3.4",
"k": 1,
"q": "A unit test fails with a stack trace pointing to an off-by-one error on line 42 of dateRange.ts. The fix is a one-line change and the expected behavior is clear. How should the engineer proceed?",
"o": [
"Enter plan mode to explore the date utilities and agree on an approach first",
"Use direct execution: ask Claude to fix the bug and run the test",
"Ask Claude for three alternative fixes, then compare them and pick one",
"Have the Explore subagent map every use of dateRange.ts before editing it"
],
"a": 1,
"e": "Small, well-understood, single-file fixes go straight to direct execution; planning and exploration add cost without reducing risk here."
},
{
"s": 1,
"d": "D3",
"t": "3.5",
"k": 1,
"q": "Claude has rewritten a slugify helper three times from a prose description, and each version treats accented letters, emoji and repeated hyphens differently. What is the most effective next step?",
"o": [
"Ask Claude to research common slug conventions online and follow the most popular one",
"Give two or three concrete input and expected-output pairs that cover those cases",
"Rewrite the prose description in more detail, defining every character class precisely",
"Switch to plan mode and have Claude plan the helper before it writes the code again"
],
"a": 1,
"e": "When prose produces inconsistent results, concrete input/output examples remove the ambiguity."
},
{
"s": 1,
"d": "D3",
"t": "3.5",
"k": 1,
"q": "An engineer is adding audit logging to a healthcare feature and isn't familiar with the compliance requirements, such as retention periods and what counts as protected data. What is the best way to start with Claude?",
"o": [
"Copy the audit logger from another service and ask Claude to adapt its field names to this feature",
"Ask Claude to log every field of every request, so that nothing a regulator needs can be missing",
"Ask Claude to interview them about requirements and constraints before proposing an implementation",
"Ask Claude to implement a standard audit logger and then iterate based on code review comments"
],
"a": 2,
"e": "In an unfamiliar domain, the interview pattern surfaces design considerations before code exists. Iterating through review or copying skips that step, and logging everything would itself capture protected data."
},
{
"s": 1,
"d": "D2",
"t": "2.5",
"k": 1,
"q": "Claude needs to understand how feature flags are evaluated across the monorepo, which has about 4,000 source files. What is the most effective approach?",
"o": [
"Read every file in the shared package first, then the web and api packages, to build a complete picture",
"Ask the engineer to paste the relevant files into the chat, since searching 4,000 files is too slow",
"Glob for all files with \"flag\" in their names and Read each of them from top to bottom",
"Grep for the flag-evaluation entry points and call sites, then Read those files and follow their imports"
],
"a": 3,
"e": "Build understanding incrementally: find entry points with Grep, then Read and follow imports. Reading everything wastes context, and file names don't reveal where the logic lives."
},
{
"s": 1,
"d": "D1",
"t": "1.6",
"k": 1,
"q": "The team wants Claude to add tests to an untested legacy billing module of about 80 files. What approach fits best?",
"o": [
"Ask Claude to reach 100% line coverage in a single pass and fix whatever fails afterwards",
"Map the module, test the riskiest areas first, and adapt the plan as you learn",
"Write one large end-to-end test that exercises the whole module through its public API",
"Generate tests file by file in alphabetical order until every file in the module has at least one test"
],
"a": 1,
"e": "Open-ended work on unfamiliar code calls for mapping, prioritizing by impact and adapting. Alphabetical order and coverage targets spread effort evenly instead of where the risk is."
},
{
"s": 1,
"d": "D5",
"t": "5.4",
"k": 1,
"q": "After two hours exploring the payments package, an engineer's session is close to its context limit. They want to keep working in the same session without losing the knowledge it has built up. What should they do?",
"o": [
"Keep going, since older content is dropped automatically with no loss",
"Run /clear and re-explain what they were working on from memory",
"Start a new session and ask Claude to re-read the whole payments package",
"Run /compact, optionally telling it which findings and decisions to keep"
],
"a": 3,
"e": "/compact summarizes the conversation to free context while keeping the important state. /clear and a new session throw that state away."
},
{
"s": 1,
"d": "D4",
"t": "4.2",
"k": 1,
"q": "When engineers ask Claude to review a change, its comments vary: some are a sentence, some a paragraph, and they rarely say where the issue is or how to fix it. What is the most effective fix?",
"o": [
"Limit each review comment to a single sentence so that comments are consistent in length",
"Ask Claude to return the review as one paragraph that summarizes all of the problems it found",
"Tell Claude to be more thorough and more structured in every code review comment it writes",
"Add a few example comments that show the format: file and line, issue, severity and a suggested fix"
],
"a": 3,
"e": "Few-shot examples demonstrate the exact output format. Vague instructions and length limits don't produce the fields reviewers need."
},
{
"s": 1,
"d": "D3",
"t": "3.1",
"k": 1,
"q": "The root CLAUDE.md has long sections on testing, API design and styling. Several teams edit it every week, which causes merge conflicts and makes it hard to see which rules apply. What is the best restructuring?",
"o": [
"Delete the older rules so the file stays under a few hundred lines in total",
"Move each team's section into the ~/.claude/CLAUDE.md files of that team's engineers, so each team owns its rules",
"Split the sections into topic files under .claude/rules/, such as testing.md, api.md and styling.md",
"Keep a single file, but route every edit through one owner who reviews and merges all of the changes"
],
"a": 2,
"e": "Topic files under .claude/rules/ keep the configuration modular and reduce conflicts while staying shared. User-level files aren't shared, and deleting rules loses real conventions."
},
{
"s": 1,
"d": "D3",
"t": "3.4",
"k": 1,
"q": "In plan mode, Claude's investigation of the auth system reads dozens of files into the conversation before it proposes a plan, and the plan misses decisions discussed earlier in the session. What is the best change?",
"o": [
"Ask Claude to read fewer files and infer the rest of the system from the file names",
"Paste the earlier decisions into the chat again once the investigation has finished, before the plan is written",
"Skip plan mode and let Claude discover the code as it goes, while it is already making the changes",
"Have the Explore subagent do the discovery, so only its summary returns to the main conversation"
],
"a": 3,
"e": "The Explore subagent isolates verbose discovery, so the main context keeps the earlier decisions and receives a concise summary."
},
{
"s": 1,
"d": "D3",
"t": "3.6",
"k": 1,
"q": "The team wants Claude's local /review and the automated CI review to apply exactly the same standards: what counts as a blocking issue, which patterns are acceptable, and how to rate severity. Where should those standards live?",
"o": [
"In the project CLAUDE.md, or a rules file it loads, which both local sessions and CI runs read",
"In each developer's ~/.claude/CLAUDE.md, kept in sync from a shared template",
"In the CI job's prompt, with developers asked to paste the same text when they review locally",
"In the pull request template, so authors read the standards before asking for review"
],
"a": 0,
"e": "Project memory is loaded by local sessions and by claude -p in CI alike, so one definition serves both. Copies in prompts or personal files drift apart."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 2,
"q": "Select two. When are .claude/rules/ files with paths globs a better choice than CLAUDE.md files in subdirectories?",
"o": [
"When the convention is a personal preference that shouldn't be shared with the team",
"When the convention applies to every file in the repository, whatever its type",
"When a formatting script must run automatically, every time, before Claude edits a matching file",
"When one rule file should cover the same pattern in every package without being copied",
"When a convention applies to one file type spread across many directories, such as test files"
],
"a": [
3,
4
],
"e": "Path rules follow file patterns wherever they live, from a single file. Personal preferences go in user memory, repo-wide standards in the root CLAUDE.md, and running a script is a job for a hook."
},
{
"s": 2,
"d": "D1",
"t": "1.4",
"k": 2,
"q": "Select two. Which of these requirements should be enforced in code rather than through the system prompt?",
"o": [
"update_account may change an email address only after a one-time code is confirmed",
"process_refund may run only after get_customer has returned a verified customer",
"The agent should suggest a relevant help article whenever one exists",
"Replies should be friendly and address the customer by their first name",
"Each reply should end by asking the customer whether there is anything else the agent can help with today"
],
"a": [
0,
1
],
"e": "Ordering and security requirements that must always hold need programmatic gates. Tone and helpful habits are judgment calls that belong in the prompt."
},
{
"s": 2,
"d": "D1",
"t": "1.5",
"k": 1,
"q": "A third-party billing MCP server, which you can't modify, returns full card numbers in lookup_invoice results. Card numbers must never reach the model's context or the conversation logs. What is the best fix?",
"o": [
"A system prompt rule telling the agent never to repeat, quote or store any card number that appears in a tool result",
"Removing lookup_invoice and asking customers to read out their invoice details instead",
"A nightly job that scans every conversation log and redacts any card numbers it finds before the logs are archived",
"A PostToolUse hook that masks card numbers in lookup_invoice results before they are added to the conversation"
],
"a": 3,
"e": "A PostToolUse hook transforms tool output deterministically before the model sees it. A prompt rule still puts the data in context, and nightly redaction happens after the exposure."
},
{
"s": 2,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "A customer's chat disconnects in the middle of a billing conversation, and they reconnect 15 minutes later. Nothing on their account has changed since, and the SDK session still exists. What is the best way to continue?",
"o": [
"Start a fresh session seeded with a summary of the case facts, then look up all of the account data again",
"Resume the existing session, so the agent continues with the full context of the conversation",
"Fork the existing session, so the original conversation is preserved unchanged for later audit",
"Start a fresh session and ask the customer to explain the issue again from the beginning"
],
"a": 1,
"e": "Resume when the earlier context is still valid. Starting fresh is for stale tool results; here it only throws away good context or makes the customer repeat themselves."
},
{
"s": 2,
"d": "D1",
"t": "1.3",
"k": 1,
"q": "The coordinator delegates \"check the duplicate charge\" to the billing subagent. The subagent then asks the customer for their email and invoice number, which the coordinator already has. What is the fix?",
"o": [
"Let the billing subagent message the customer directly whenever it needs more information",
"Have the billing subagent call get_customer again at the start of every task it receives",
"Pass the needed context in the delegation: customer ID, invoices, the complaint",
"Give the billing subagent the full conversation history of every customer it is asked to help"
],
"a": 2,
"e": "Subagents only know what the coordinator passes them. Pass the specific context the task needs, rather than everything, and don't make the customer repeat themselves."
},
{
"s": 2,
"d": "D1",
"t": "1.6",
"k": 1,
"q": "A nightly QA job reviews resolved conversations for policy compliance, factual accuracy of what the agent told the customer, and tone. One prompt covering all three gives shallow results. What approach fits best?",
"o": [
"Checking compliance only, since accuracy and tone matter much less to the business",
"A fixed chain of focused passes (compliance, then accuracy, then tone), with the results combined into one report",
"An adaptive agent that decides, conversation by conversation, which of the three aspects are worth checking in depth",
"The same single prompt, with the instructions for each of the three aspects repeated in capitals so none are skipped"
],
"a": 1,
"e": "Predictable multi-aspect reviews suit prompt chaining with focused passes. Adaptive decomposition is for open-ended investigations."
},
{
"s": 2,
"d": "D1",
"t": "1.5",
"k": 1,
"q": "Compliance requires every refund attempt, including denied ones, to be recorded with the amount and the decision. The agent is instructed to call log_action after process_refund, but forgets about 5% of the time. What is the best fix?",
"o": [
"Few-shot examples that show log_action being called after every single refund attempt",
"A nightly job that compares refunds with the audit log and emails the team about any gaps",
"A hook on process_refund that writes the audit record automatically every time the tool is called",
"Moving the logging instruction to the top of the system prompt and repeating it in the tool description"
],
"a": 2,
"e": "When an action must happen every time, enforce it in a hook. Prompts and examples are probabilistic, and nightly reconciliation finds the gaps after the fact."
},
{
"s": 2,
"d": "D1",
"t": "1.2",
"k": 1,
"q": "The billing subagent times out while the coordinator is resolving a three-part request: a refund, a plan change and an address update. The coordinator currently tells the customer \"We're having system problems, please try later\" and ends the chat. What should it do instead?",
"o": [
"Roll back the changes that already succeeded, so the account is left in a consistent state for a later retry",
"Tell the customer everything is complete and finish the billing part quietly in the background later",
"Keep what succeeded, retry or escalate the billing part, and tell the customer what's pending",
"Retry the billing subagent in a tight loop until it responds, keeping the customer waiting in the meantime"
],
"a": 2,
"e": "The coordinator owns error handling: keep the work that succeeded, recover or escalate the failed part with context, and be honest with the customer."
},
{
"s": 2,
"d": "D2",
"t": "2.1",
"k": 1,
"q": "The agent has lookup_subscription and get_plan_details, described as \"Gets subscription info\" and \"Gets plan info\". It alternates between them for the same kinds of questions. What is the best fix?",
"o": [
"Add a rule that lookup_subscription must always be called before get_plan_details",
"Rename and re-describe them: the current subscription vs a plan's catalog terms",
"Merge them into one tool that returns everything about the subscription and the plan on every call",
"Remove get_plan_details and copy the plan catalog into the system prompt instead"
],
"a": 1,
"e": "Overlapping tools are fixed by renaming and rewriting descriptions so each one's purpose and boundary is clear. Merging bloats every call, an ordering rule doesn't remove the ambiguity, and a catalog in the prompt goes stale."
},
{
"s": 2,
"d": "D2",
"t": "2.2",
"k": 1,
"q": "process_refund fails because the agent's service account lacks refund permission for enterprise customers. The tool returns a generic error; the agent retries five times and then tells the customer the refund went through. What should the tool return?",
"o": [
"An error with errorCategory \"transient\" and isRetryable true, so the agent tries a few more times before telling the customer anything",
"A success response with refunded set to 0, so the conversation can continue without an error",
"An error with errorCategory \"permission\" and isRetryable false, explaining that this account type needs a human to process refunds",
"An error with errorCategory \"validation\", telling the agent to check the refund amount and account type, then resend the request"
],
"a": 2,
"e": "Permission failures aren't fixed by retrying. A categorized, non-retryable error tells the agent to stop and escalate, and lets it explain the situation honestly."
},
{
"s": 2,
"d": "D2",
"t": "2.3",
"k": 1,
"q": "The returns subagent often needs to know whether a charge is still pending. Today it routes those questions through the coordinator to the billing subagent, adding latency. About 80% are simple status checks; the rest involve disputes. What is the best design?",
"o": [
"Batch the status questions and send them to the billing subagent once, at the end of each conversation",
"Give the returns subagent all of the billing subagent's tools, so it can answer any billing question without involving the coordinator",
"Give the returns subagent a narrow, read-only check_charge_status tool, and keep routing disputes through the coordinator",
"Merge the returns and billing subagents into a single subagent that handles both kinds of request"
],
"a": 2,
"e": "A scoped cross-role tool covers the frequent simple case while complex cases keep their routing. Full tool access breaks the roles, merging loses specialization, and batching delays answers the customer needs now."
},
{
"s": 2,
"d": "D2",
"t": "2.4",
"k": 2,
"q": "Select two. The agent must create and update tickets in Zendesk and run the company's own refund-approval workflow, which no public tool supports. Which choices are right?",
"o": [
"Skip MCP and have the agent call the Zendesk REST API through a Bash tool",
"Use an existing, maintained Zendesk MCP server for the ticket operations",
"Describe the approval workflow in the system prompt and let the agent follow it",
"Build a small custom MCP server only for the in-house refund-approval workflow",
"Build one custom MCP server that also reimplements the Zendesk API from scratch"
],
"a": [
1,
3
],
"e": "Prefer existing servers for standard integrations and build custom ones only for team-specific workflows. Shelling out and prompt-described workflows lose the tool contract and its enforcement."
},
{
"s": 2,
"d": "D4",
"t": "4.2",
"k": 1,
"q": "Your few-shot examples show only the final decision for each case (\"Refund approved\", \"Escalated\"). The agent copies surface features, such as escalating whenever a message mentions a lawyer, even when the issue is simple. What is the best improvement?",
"o": [
"Add twenty more examples that show only the final decision, so the agent sees a much wider range of cases",
"Remove the examples entirely and rely on the written policy in the system prompt instead",
"Rewrite the examples to include a short line of reasoning for each decision, showing which facts led to it",
"Add a rule that the word \"lawyer\" on its own should never lead to an escalation"
],
"a": 2,
"e": "Examples that show the reasoning teach the decision rule rather than surface patterns. More decision-only examples reinforce pattern matching, and a keyword rule patches one symptom."
},
{
"s": 2,
"d": "D4",
"t": "4.3",
"k": 1,
"q": "The agent writes escalation summaries as JSON inside its text reply, and engineers parse them with a regex that breaks whenever it adds a sentence before the JSON. What is the best fix?",
"o": [
"Define escalate_to_human with an input schema for the handoff fields, and read the summary from the tool_use block's input",
"Tell the agent to put the JSON at the very end of its reply, and have the pipeline parse from the last opening brace onward",
"Keep the regex but retry the request whenever parsing fails, up to three attempts",
"Ask the agent to wrap the JSON in a code fence, and have the pipeline extract whatever is inside the first fence it finds"
],
"a": 0,
"e": "Structured output comes from tool_use with a schema; the result is the tool call's input, not text. Parsing conventions inside prose stay fragile."
},
{
"s": 2,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "A customer wants to return opened software. The policy says \"opened items may be returned at our discretion.\" The agent is technically able to issue the refund. What should it do?",
"o": [
"Approve the refund, since the policy explicitly allows opened items to be returned and the agent has the authority",
"Escalate to a human, since the policy leaves the decision to a discretion the agent hasn't been given",
"Deny the refund, since the item has been opened and the return isn't guaranteed",
"Offer store credit as a compromise, since it satisfies the customer without committing to a refund either way"
],
"a": 1,
"e": "When policy is ambiguous about the request, escalate rather than inventing a decision either way."
},
{
"s": 2,
"d": "D5",
"t": "5.5",
"k": 1,
"q": "Leadership wants the agent to resolve more billing disputes on its own, because overall customer satisfaction is 4.6 out of 5. What should you check first?",
"o": [
"Overall customer satisfaction over a longer period, to confirm that the 4.6 score is stable and not a one-off",
"The agent's self-reported confidence on the billing disputes it has already handled",
"How many billing disputes were escalated last month compared with other issue types",
"Resolution accuracy for billing disputes specifically, from a sample of conversations reviewed by humans"
],
"a": 3,
"e": "Aggregate satisfaction can hide weak segments. Check accuracy for the specific issue type against human review before reducing oversight."
},
{
"s": 3,
"d": "D4",
"t": "4.3",
"k": 1,
"q": "Many customs declarations don't include an HS tariff code. The schema makes hs_code a required string, and Claude fills in plausible-looking codes. What is the best change?",
"o": [
"Make hs_code nullable and add a flag recording that the code wasn't present in the document",
"Keep hs_code required and tell Claude to use the most common code for that type of goods",
"Lower the temperature so that Claude invents fewer codes when the field is missing",
"Remove hs_code from the schema and have staff look up every code by hand after extraction"
],
"a": 0,
"e": "Required fields push the model to fabricate. A nullable field with a missing flag gives it an honest option."
},
{
"s": 3,
"d": "D4",
"t": "4.4",
"k": 1,
"q": "A bill of lading shows a gross weight of 12,400 kg on page 1 and 14,200 kg on page 3. The extraction picks one value without comment. What should the schema and prompt do?",
"o": [
"Average the two values and explain the averaging in a free-text comments field",
"Capture both values with their page locations and set conflict_detected so the record goes to review",
"Take the larger value, since understating the weight causes the bigger customs problems",
"Always take the value on the first page, since that is usually the summary page of the document"
],
"a": 1,
"e": "Contradictions within a document should be surfaced rather than resolved by a heuristic: keep both values with their locations and flag the conflict."
},
{
"s": 3,
"d": "D4",
"t": "4.4",
"k": 2,
"q": "Select two. Extraction now uses tool_use with a strict JSON schema. Which of these problems will the schema NOT catch, so they need semantic validation in code?",
"o": [
"incoterm has a value that isn't one of the schema's allowed enum values",
"A required field such as container_number is missing from the output",
"The extracted arrival date is earlier than the departure date",
"gross_weight comes back as the string \"12,400 kg\" where the schema expects a number",
"The line-item amounts don't add up to the invoice's stated total"
],
"a": [
2,
4
],
"e": "Schemas eliminate structural errors (missing required fields, wrong types, invalid enum values) but not semantic ones. Totals that don't reconcile and impossible date orders need checks in code."
},
{
"s": 3,
"d": "D4",
"t": "4.5",
"k": 1,
"q": "You're about to run 40,000 archived documents through the Message Batches API with a new extraction prompt. What should you do first?",
"o": [
"Split the archive into 40 batches of 1,000 documents and submit all of them at once",
"Run the whole archive synchronously first to prove the prompt works, then use batches for future documents",
"Submit the full batch now and correct any problems with a second full batch afterwards",
"Run the prompt on a representative sample, check the results and refine it, then submit the full batch"
],
"a": 3,
"e": "Refining the prompt on a sample before a large batch avoids paying to process tens of thousands of documents with a flawed prompt."
},
{
"s": 3,
"d": "D4",
"t": "4.5",
"k": 2,
"q": "Select two. In a batch of 10,000 documents, 180 requests failed; most were documents too large for a single request. How should you handle the failures?",
"o": [
"Match results to documents by their position in the results file",
"Identify the failed requests by custom_id and resubmit only those",
"Resubmit the entire batch, since partial results are harder to reconcile",
"Process all future documents synchronously so batches can't fail",
"Split the oversized documents into smaller chunks before resubmitting them"
],
"a": [
1,
4
],
"e": "custom_id correlates results with inputs, so only failures are resubmitted, and oversized documents need chunking. Result order isn't guaranteed to match submission order."
},
{
"s": 3,
"d": "D4",
"t": "4.2",
"k": 1,
"q": "Commercial invoices come from about 40 carriers with different layouts. For some layouts the required fuel_surcharge field comes back empty, although the charge is on the document, often in an appendix table. What is the most effective fix?",
"o": [
"Ask every carrier to send its invoices in one standard layout from now on, and reject invoices that don't follow it",
"Make fuel_surcharge optional, so that invoices with these layouts pass schema validation and stop failing in the pipeline",
"Add a few examples showing correct extraction from the failing layouts, including a surcharge found in an appendix",
"Tell Claude to look much harder for surcharges in every document it extracts from"
],
"a": 2,
"e": "Examples of correct extraction from varied structures fix empty required fields. Making the field optional hides real data, and \"look harder\" is vague."
},
{
"s": 3,
"d": "D4",
"t": "4.1",
"k": 1,
"q": "A review step flags \"anything unusual\" in customs declarations. It flags 40% of documents, mostly for harmless differences like abbreviations, and reviewers have stopped reading the flags. What is the best fix?",
"o": [
"Spell out what to flag and what to ignore, such as abbreviations",
"Flag only the 10% of documents with the highest anomaly scores each day",
"Ask Claude to flag only the things that are very unusual rather than anything unusual",
"Show reviewers only the flags raised on documents above a certain declared value"
],
"a": 0,
"e": "Precision comes from explicit criteria for what to report and what to skip. Vague intensifiers, quotas and value cut-offs don't define what matters."
},
{
"s": 3,
"d": "D1",
"t": "1.3",
"k": 1,
"q": "The coordinator sends each specialist subagent the full 80-page shipment bundle, although each one needs only its own document. The customs subagent often runs out of context. What is the best fix?",
"o": [
"Pass each subagent only its document's pages, with type and page range",
"Ask each subagent to skip any pages that don't look relevant to its own task",
"Give the customs subagent a model with a larger context window so the whole bundle fits",
"Send the bundle to the subagents one at a time instead of to all of them in parallel"
],
"a": 0,
"e": "Pass each subagent what it needs, with metadata that keeps attribution. Larger windows and self-skimming waste context, and sequencing doesn't change what each one receives."
},
{
"s": 3,
"d": "D1",
"t": "1.4",
"k": 1,
"q": "Records must not be posted to the customs system unless schema validation passed and no conflicts are open. The agent has a post_to_customs tool and occasionally posts records with open conflicts. What is the best fix?",
"o": [
"Make post_to_customs reject any record whose validation hasn't passed or that still has an open conflict",
"Have reviewers check the customs system each day and withdraw any incorrect records",
"Ask the agent to confirm in its reply that validation passed before it posts a record",
"Add a system prompt rule that records with open conflicts must never be posted to customs"
],
"a": 0,
"e": "Preconditions that must always hold belong in a programmatic gate on the action."
},
{
"s": 3,
"d": "D1",
"t": "1.2",
"k": 1,
"q": "To speed up a 500-page customs archive, the coordinator splits it across five subagents in page ranges of 100. Documents that cross a range boundary come back half-extracted or extracted twice. What is the best fix?",
"o": [
"Give each subagent a 10-page overlap with its neighbors and deduplicate the records afterwards",
"Process the archive with a single subagent, so there are no boundaries to cross at all",
"Increase each range to 150 pages so that fewer documents end up crossing a boundary",
"Partition the archive by document boundaries, so each subagent receives whole documents"
],
"a": 3,
"e": "Partition work along natural units so scopes neither overlap nor split items. Overlaps create duplicates to clean up, one agent loses parallelism, and bigger ranges just move the boundaries."
},
{
"s": 3,
"d": "D1",
"t": "1.6",
"k": 1,
"q": "A shipment has a bill of lading, a commercial invoice and a packing list. Each must be extracted, and then quantities and weights must be checked for agreement across them. What approach fits best?",
"o": [
"Extract each document in its own focused pass, then run a separate reconciliation pass across the three results",
"Let an adaptive agent decide for each shipment which documents are worth extracting",
"Extract all three documents in one prompt, so the model can compare quantities and weights while it extracts them",
"Extract only the invoice, and derive the other two documents' values from it"
],
"a": 0,
"e": "Focused per-document passes plus a cross-document pass give each pass full attention, and the reconciliation pass catches inconsistencies between documents."
},
{
"s": 3,
"d": "D2",
"t": "2.3",
"k": 1,
"q": "The extraction agent writes records to a staging database through a generic run_sql tool. Once, while \"cleaning up duplicates\", it ran a DELETE. What is the best fix?",
"o": [
"Log every SQL statement the agent runs and have someone review the log weekly",
"Keep run_sql and add a system prompt rule forbidding DELETE and UPDATE statements",
"Replace run_sql with a constrained insert_extraction_record tool that accepts one validated record",
"Take a database backup every hour so that any deletions can be undone quickly"
],
"a": 2,
"e": "Replace generic tools with constrained ones whose contract allows only the intended action."
},
{
"s": 3,
"d": "D2",
"t": "2.1",
"k": 1,
"q": "The lookup_hs_code tool finds tariff codes from product descriptions, but only for English text. Claude often calls it with German and Chinese descriptions, gets no matches, and reports that no code exists. What is the best first fix?",
"o": [
"Tell Claude to report \"no code found\" only after it has tried three differently worded descriptions of the same product",
"State in the tool description that it accepts English descriptions only and that other languages must be translated first",
"Remove lookup_hs_code and have reviewers assign every tariff code by hand",
"Add a PostToolUse hook that retries any lookup that returns no results up to three times before Claude sees the empty result"
],
"a": 1,
"e": "Descriptions should state boundaries and edge cases so the model uses the tool correctly. Retries repeat the same failing input."
},
{
"s": 3,
"d": "D2",
"t": "2.2",
"k": 1,
"q": "lookup_port returns \"Invalid input\" when Claude passes \"Rotterdam\", because it expects UN/LOCODE codes such as NLRTM. Claude gives up and leaves the port empty. What should the tool return?",
"o": [
"A validation error stating the expected format, with an example",
"A permission error, so that the record is escalated to a human reviewer",
"An empty result marked as a success, so the extraction can continue without a port",
"A transient error marked as retryable, so Claude retries the same input a little later"
],
"a": 0,
"e": "A validation error with actionable detail lets the agent fix its input. Marking it transient just repeats the same failure."
},
{
"s": 3,
"d": "D3",
"t": "3.4",
"k": 1,
"q": "The team is moving the extraction schemas from version 3 to version 4. The change touches prompts, validators and the customs mapper (about 25 files) and needs a decision on backward compatibility for records already in flight. How should they work with Claude?",
"o": [
"Have Claude write the version 4 schema first and decide on compatibility after deployment",
"Ask Claude to update all 25 files in one direct-execution pass and then run the tests",
"Use direct execution file by file, starting with the schemas and fixing whatever breaks next",
"Start in plan mode to explore the impact and agree on the compatibility approach, then implement it"
],
"a": 3,
"e": "Multi-file changes that hinge on a design decision belong in plan mode first; direct execution risks rework if the compatibility choice turns out wrong."
}
]
};
