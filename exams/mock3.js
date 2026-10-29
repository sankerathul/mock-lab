/* Full Mock Test 3 — question data. Each question: s=scenario index, d=domain, t=task, q=question, o=options, a=correct index (array for "select two"), e=explanation. */
window.EXAM = {
"id": "mock3",
"title": "Full Mock Test 3",
"intro": "A third full-length mock: 60 new questions across four scenarios, weighted like the real exam.",
"scenarios": [
{
"name": "Multi-Agent Research System",
"text": "A law firm's compliance practice runs a multi-agent research system built with the Claude Agent SDK. A coordinator delegates to a search agent (public regulations, court decisions and news), a document agent (the firm's library of past legal memos) and a synthesis agent that drafts cited research memos. Lawyers rely on the memos for client advice, so every claim must be traceable."
},
{
"name": "Code Generation with Claude Code",
"text": "A 40-person team builds a Go backend and a React frontend in one monorepo and uses Claude Code daily for new features, refactoring, debugging and documentation. You own the team's Claude Code setup: CLAUDE.md files, rules, skills, hooks and the team's working conventions."
},
{
"name": "Claude Code in CI/CD",
"text": "Claude Code runs in the company's GitLab CI pipeline. It reviews every merge request, generates missing tests and drafts release notes. Results are posted back to merge requests automatically, and the team has asked for fewer, more accurate comments."
},
{
"name": "Developer Productivity Tools",
"text": "The platform team built an engineering assistant with the Claude Agent SDK. On-call engineers use it to investigate incidents and explore legacy services. It uses the built-in tools plus MCP servers for logs, metrics, deployments and the ticket tracker, and it can delegate focused questions to subagents."
}
],
"questions": [
{
"s": 0,
"d": "D1",
"t": "1.2",
"k": 1,
"q": "For a narrow question (\"Has the SEC changed the Form ADV filing deadline this year?\"), the coordinator spawned twelve search subagents covering overlapping angles. The run cost twenty times the usual amount and produced duplicate findings. What is the best fix?",
"o": [
"Cap every run at three subagents, so that cost stays predictable whatever kind of question the lawyers ask",
"Route narrow factual questions directly to the synthesis agent, which can answer them from its own knowledge",
"Keep the twelve subagents, but have the synthesis agent deduplicate their findings before drafting the memo",
"Let the coordinator size the subagent count to the question: one or two for a narrow fact"
],
"a": 3,
"e": "The coordinator chooses subagents according to what each query needs. A fixed cap is too blunt for broad questions, deduplicating hides wasted work, and answering from model knowledge loses traceable sources."
},
{
"s": 0,
"d": "D1",
"t": "1.3",
"k": 1,
"q": "A lawyer asks about data-transfer rules for EU clients since 2023. The coordinator delegates \"research data-transfer rules\" to the search agent, which returns mostly US material from 2018 to 2021. What should change?",
"o": [
"Put the goal, the EU and post-2023 constraints and acceptable sources into the delegation",
"The coordinator should run the same delegation three times and keep the most relevant results",
"The synthesis agent should filter out non-EU and pre-2023 material before it drafts the memo",
"The search agent should be given a longer system prompt about being careful and thorough with legal research"
],
"a": 0,
"e": "Subagents know only what the delegation tells them. State the goal, constraints and quality criteria up front rather than filtering afterwards or repeating a vague request."
},
{
"s": 0,
"d": "D1",
"t": "1.3",
"k": 1,
"q": "The coordinator asks the synthesis agent to \"draft the memo\" and passes it the search agent's findings, but not the document agent's findings from the firm's past memos. The memos miss the firm's own prior positions. What is the fix?",
"o": [
"Run the document agent after synthesis, and append its findings to the end of the drafted memo",
"Tell the synthesis agent in its prompt to remember the firm's prior positions on these topics",
"Pass every subagent's complete findings, with source metadata, to the synthesis agent",
"Let the synthesis agent call the document agent directly whenever it thinks it needs past memos"
],
"a": 2,
"e": "Subagents have isolated context, so the coordinator must pass complete prior findings with their metadata. Direct subagent-to-subagent calls bypass the coordinator, and appending afterwards loses the integration."
},
{
"s": 0,
"d": "D1",
"t": "1.1",
"k": 1,
"q": "Some long memos end mid-sentence, and the coordinator delivers them to lawyers as finished. Logs show stop_reason was \"max_tokens\" on those responses. What should the coordinator's loop do?",
"o": [
"Add an instruction to the synthesis prompt telling the model to keep every memo under 1,000 words",
"Treat it as incomplete: continue the generation or raise the limit, never deliver it as is",
"Treat max_tokens the same as end_turn, since the model chose to stop writing at that point in the memo",
"Deliver the memo, and append a note asking the lawyer to request the rest if anything seems missing"
],
"a": 1,
"e": "Branch on every stop_reason explicitly. max_tokens means the output was cut off, so it must never be presented as complete. A length instruction doesn't fix the control flow."
},
{
"s": 0,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "Yesterday a lawyer ran a long named session, \"gdpr-transfers\", that analyzed 30 sources. Today she wants to ask follow-up questions, and none of the sources have changed. What is the best way to continue?",
"o": [
"Start a fresh session and re-run the full research",
"Start a fresh session seeded with yesterday's memo",
"Fork the session so yesterday's analysis stays intact",
"Resume the \"gdpr-transfers\" session by name"
],
"a": 3,
"e": "When the earlier context is still valid, resume it. Starting fresh repeats work or throws away detail, and forking is for exploring separate branches."
},
{
"s": 0,
"d": "D1",
"t": "1.6",
"k": 1,
"q": "A partner asks: \"How exposed are our fintech clients to the new EU AI Act obligations?\" Which approach should the research system take?",
"o": [
"Ask the synthesis agent to estimate each client's exposure from what it already knows about the regulation",
"A fixed chain of three steps: summarize the Act, list every client, then mark each client as exposed or not exposed",
"Map which obligations could apply, then research the highest-exposure areas first and adapt",
"Search for every article that mentions the AI Act and summarize all of them in the order they were published"
],
"a": 2,
"e": "Open-ended questions need adaptive decomposition that prioritizes by impact and adjusts to findings. A fixed chain assumes the shape of the answer before the research starts."
},
{
"s": 0,
"d": "D2",
"t": "2.1",
"k": 1,
"q": "The search_case_law tool only covers decisions from 2015 onward, but its description doesn't say so. The agent searched for a 2009 precedent, got no results, and the memo stated that no such precedent exists. What is the best fix?",
"o": [
"Replace search_case_law with a general web search tool that has no date restriction",
"Add a rule to the synthesis prompt never to claim that a precedent doesn't exist",
"State the 2015 coverage limit in the tool description and how to find older cases",
"Have the agent retry any search that returns nothing, using broader keywords each time"
],
"a": 2,
"e": "Tool descriptions should state boundaries and edge cases so the agent can interpret empty results correctly. Retrying the same corpus can't find what it doesn't contain."
},
{
"s": 0,
"d": "D2",
"t": "2.2",
"k": 2,
"q": "Select two. The search agent's fetch_source tool can fail in several ways. Which error responses would let the agent act correctly?",
"o": [
"A paywalled journal: an empty result marked as success, so the run continues without interruption",
"A paywalled journal: errorCategory \"permission\", isRetryable false, noting a subscription is needed",
"A court website that timed out: errorCategory \"transient\", isRetryable true",
"Any failure: the single message \"fetch failed\", so the agent treats every error the same way",
"A malformed citation: errorCategory \"transient\", isRetryable true, so the agent tries again later"
],
"a": [
1,
2
],
"e": "Categorized errors tell the agent whether to retry, fix the input or route around the problem. A paywall is a permission problem, a timeout is transient, a malformed citation is a validation error, and an empty success hides the failure."
},
{
"s": 0,
"d": "D2",
"t": "2.3",
"k": 1,
"q": "To save setup time, the synthesis agent was given all 14 tools in the system, including send_email. It emailed a draft memo directly to a client before any lawyer had reviewed it. What is the best fix?",
"o": [
"Give the synthesis agent a different email account that only sends to the firm's internal addresses",
"Keep all 14 tools, but add a system prompt rule that drafts must never be sent to clients without review",
"Give it only the tools its drafting role needs, removing send_email and other outbound tools",
"Add a PostToolUse hook that logs every email the synthesis agent sends, so mistakes are caught quickly"
],
"a": 2,
"e": "Scope tools to each agent's role. A prompt rule is probabilistic, logging finds the problem afterwards, and an internal-only account still lets a drafting agent take actions outside its job."
},
{
"s": 0,
"d": "D4",
"t": "4.3",
"k": 1,
"q": "The synthesis agent expects findings as structured data, but the search agent sometimes returns prose paragraphs and sometimes JSON with different field names. What is the best fix?",
"o": [
"Require the search agent to call a return_findings tool whose input follows a JSON schema",
"Parse the search agent's output with regular expressions and discard any finding that doesn't parse",
"Have the synthesis agent accept any format and work out what each finding means as it drafts",
"Add \"always respond in JSON\" to the search agent's prompt, together with one example of the format"
],
"a": 0,
"e": "tool_use with a schema gives reliable structure, and requiring the tool call removes prose replies. Prompting for JSON stays fragile, and discarding unparsed findings silently loses evidence."
},
{
"s": 0,
"d": "D4",
"t": "4.3",
"k": 1,
"q": "The findings schema has a required effective_date field. For proposed rules that haven't been adopted yet, the agent fills in plausible-looking dates. What is the best change?",
"o": [
"Keep effective_date required and tell the agent to use the expected adoption date for proposed rules",
"Lower the temperature for the search agent so that it invents dates less often",
"Make effective_date nullable, and add a status field: proposed, adopted or unclear",
"Remove effective_date from the schema entirely, and have lawyers look up the dates themselves"
],
"a": 2,
"e": "Required fields push the model to fabricate. A nullable field plus an explicit status with an \"unclear\" option gives it an honest way to report what the source says."
},
{
"s": 0,
"d": "D4",
"t": "4.4",
"k": 1,
"q": "A draft memo cited \"Section 12(4)\" of a regulation, but that section doesn't appear in the source text the search agent fetched. How should the pipeline catch and handle this?",
"o": [
"Have a second synthesis run draft the memo again from scratch, and keep whichever draft looks better",
"Check in code that each cited section is in its source excerpt; retry once with the error, then flag it",
"Remove all section numbers from memos, so lawyers look up the relevant sections themselves",
"Ask the synthesis agent to double-check its citations carefully before it returns each memo"
],
"a": 1,
"e": "Semantic checks that code can do, such as whether a cited section exists in the source, belong in validation. Feed the specific error back for a retry, then escalate what still fails."
},
{
"s": 0,
"d": "D5",
"t": "5.1",
"k": 1,
"q": "In a long research chat, the lawyer set constraints early on: EU law only, decisions since 2023, and no reliance on blog sources. After the conversation is summarized to save context, later answers start citing 2019 US blog posts. What is the best fix?",
"o": [
"Increase the context window so that the conversation never needs to be summarized",
"Keep the lawyer's constraints in a persistent brief that is never summarized and goes with every request",
"Summarize the conversation less often, so that the early constraints stay in the context for longer",
"Ask the lawyer to repeat the constraints whenever the answers start to drift"
],
"a": 1,
"e": "Constraints and key facts belong in a persistent block outside the summarized history. Summarizing less often, or a bigger window, only delays the loss."
},
{
"s": 0,
"d": "D5",
"t": "5.3",
"k": 1,
"q": "The document agent couldn't open 3 of the 20 past memos because of access restrictions. The final memo says \"the firm has no prior position on this issue.\" What should have happened?",
"o": [
"Report the 3 access failures, and have the memo state that 3 of the 20 past memos couldn't be reviewed",
"The document agent should retry the restricted memos until access is granted, then continue the run",
"The memo is acceptable, since the 17 memos the agent could read contained no prior position",
"The coordinator should stop the whole run and ask IT for access before producing any memo"
],
"a": 0,
"e": "An access failure is not an empty result. Report it with context and annotate coverage, so the memo doesn't present a gap as a finding."
},
{
"s": 0,
"d": "D5",
"t": "5.6",
"k": 1,
"q": "The synthesis agent merges findings from several sources into flowing paragraphs. Lawyers can no longer tell which claim came from which source, and some citations disappear entirely. What is the best fix?",
"o": [
"Have lawyers ask the system again whenever they need to know where a particular claim came from",
"Ask the synthesis agent to write shorter paragraphs, so each one is more likely to come from a single source",
"Put a list of every source consulted at the end of the memo, so lawyers can check them on their own",
"Require claim-to-source mappings and keep each citation attached to its claim through synthesis"
],
"a": 3,
"e": "Provenance has to survive synthesis: claim-to-source mappings from subagents, preserved through drafting. A bibliography at the end doesn't tell lawyers which source supports which claim."
},
{
"s": 1,
"d": "D3",
"t": "3.1",
"k": 2,
"q": "Select two. Which statements about where Claude Code instructions live are correct?",
"o": [
"Files pulled in with @path imports load only when Claude edits a file in the imported file's folder",
"A path-scoped rule in .claude/rules/ loads at the start of every session, like CLAUDE.md",
"CLAUDE.local.md is the place for team standards that every developer must follow",
"A project's committed CLAUDE.md is shared with everyone who clones the repository",
"~/.claude/CLAUDE.md applies to that developer in every project and isn't shared with the team"
],
"a": [
3,
4
],
"e": "User-level memory is personal and global; the project CLAUDE.md is shared through the repo. @path imports load at launch with the file that imports them, path-scoped rules load on demand, and CLAUDE.local.md is for personal, project-specific notes that aren't committed."
},
{
"s": 1,
"d": "D3",
"t": "3.1",
"k": 1,
"q": "The root CLAUDE.md @imports eight large standards documents (Go style, React patterns, SQL, accessibility and others). Every session uses a lot of context on standards that are unrelated to the task at hand. What is the best change?",
"o": [
"Move every one of the standards into each developer's ~/.claude/CLAUDE.md file instead",
"Delete the standards that seem least important, until the context use falls to an acceptable level",
"Split the eight documents into sixteen smaller @imported files, so that each file is easier to read",
"Convert them to path-scoped rules in .claude/rules/ that load only for matching files"
],
"a": 3,
"e": "@path imports load at launch, so splitting them doesn't reduce context. Path-scoped rules load only when Claude works with matching files."
},
{
"s": 1,
"d": "D3",
"t": "3.1",
"k": 1,
"q": "A developer wants personal notes for this repository only, such as their local database port and preferred test flags. They shouldn't apply to other projects or be committed for the team. Where should the notes go?",
"o": [
"The project's root CLAUDE.md",
"CLAUDE.local.md in the project",
"~/.claude/CLAUDE.md for the user",
"A rule file in .claude/rules/"
],
"a": 1,
"e": "CLAUDE.local.md holds personal, project-specific instructions that aren't committed. The user-level file applies to every project, and the root CLAUDE.md and rules are shared."
},
{
"s": 1,
"d": "D3",
"t": "3.2",
"k": 1,
"q": "The team wrote a skill for generating new API endpoints, but Claude never uses it unless someone types its slash command, even when asked to \"add an endpoint for refunds\". Its description is \"API helper.\" What is the best fix?",
"o": [
"Add an instruction to CLAUDE.md telling Claude to always check for skills before writing any code",
"Say in the description what the skill does and when to use it, e.g. adding an HTTP endpoint",
"Move the skill's instructions into the root CLAUDE.md, so they are loaded in every single session",
"Rename the skill folder to \"endpoints\" so that its name matches the words developers use"
],
"a": 1,
"e": "Claude decides when to load a skill from its description, so the description should state what it does and when to use it. Moving it into CLAUDE.md makes an on-demand workflow always-on."
},
{
"s": 1,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "GraphQL schema conventions should apply to every .graphql file in the monorepo, across nine services. What should the rule file's paths frontmatter be?",
"o": [
"paths: [\"**/*.graphql\"]",
"paths: [\"*.graphql\"]",
"paths: [\"graphql/**\"]",
"paths: [\"services/*.graphql\"]"
],
"a": 0,
"e": "** matches any number of folders. *.graphql matches only root files, services/*.graphql only files directly in services/, and graphql/** only a root graphql folder."
},
{
"s": 1,
"d": "D3",
"t": "3.4",
"k": 1,
"q": "A developer needs to add an optional \"currency\" field to one API response struct and update its unit test. The change is clear and touches two files. How should they work with Claude?",
"o": [
"A separate session per file",
"Direct execution",
"Plan mode first",
"Explore subagent first"
],
"a": 1,
"e": "Small, clear, well-scoped changes go straight to direct execution."
},
{
"s": 1,
"d": "D3",
"t": "3.4",
"k": 1,
"q": "Claude has finished investigating a large refactor in plan mode, and the team has approved the plan. What should happen next?",
"o": [
"Stay in plan mode and have Claude produce an even more detailed plan before starting",
"Ask Claude to implement several alternative versions of the plan and compare them",
"Start a new session and ask Claude to investigate the code again before implementing",
"Switch to direct execution and implement the approved plan, in stages if it's large"
],
"a": 3,
"e": "Plan mode is for investigation and choosing an approach; once a plan is agreed, implementation happens in direct execution."
},
{
"s": 1,
"d": "D3",
"t": "3.5",
"k": 1,
"q": "Claude's generated Go function panics in production on nil and empty slices, although its tests pass. What is the most effective next step?",
"o": [
"Switch to plan mode and have Claude redesign the function's overall structure",
"Add a recover() call around the function so that the panics stop reaching users",
"Ask Claude to review its own function carefully for any possible nil-handling bugs",
"Add test cases for nil and empty slices, then iterate with Claude until all of them pass"
],
"a": 3,
"e": "Specific edge-case tests give Claude a concrete, verifiable target. Recovering from panics hides the bug."
},
{
"s": 1,
"d": "D1",
"t": "1.6",
"k": 1,
"q": "Every new endpoint follows the same steps: write the handler, add unit tests, update the OpenAPI spec, then write the changelog entry. Doing everything in one request gives inconsistent quality. What approach fits best?",
"o": [
"Do only the handler with Claude, and leave the other three steps to developers",
"An adaptive agent that decides, endpoint by endpoint, which of the four steps it actually needs to do",
"A fixed chain of focused steps, one per task, each building on the previous step's output",
"One request containing all four tasks, with each of them marked as required in capital letters"
],
"a": 2,
"e": "A predictable, repeated sequence of distinct tasks suits prompt chaining with focused steps."
},
{
"s": 1,
"d": "D1",
"t": "1.5",
"k": 1,
"q": "Files ending in .pb.go are generated by protoc and must never be edited by hand. Claude occasionally edits them while fixing compile errors. What is the most reliable fix?",
"o": [
"A line in CLAUDE.md explaining that .pb.go files are generated and shouldn't be edited",
"A path-scoped rule for **/*.pb.go asking Claude not to change these files",
"A CI check that rejects merge requests containing hand edits to .pb.go files",
"A PreToolUse hook or a permission deny rule that blocks Edit and Write on **/*.pb.go"
],
"a": 3,
"e": "A rule that must always hold is enforced at the tool level. CLAUDE.md and path rules are guidance, and a CI check catches the problem only after the edit."
},
{
"s": 1,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "Halfway through a long refactoring session, a developer wants to try a riskier alternative design without losing the current approach, so they can compare the two. What should they do?",
"o": [
"Fork the session and try the alternative in the fork",
"Continue in the same session and undo it if it fails",
"Start a fresh session and describe the alternative design",
"Resume the session in a second terminal window"
],
"a": 0,
"e": "Fork branches from the current, valid context and leaves the original line of work untouched."
},
{
"s": 1,
"d": "D2",
"t": "2.5",
"k": 1,
"q": "Claude needs to find every test file belonging to the payments package, which is spread across several nested folders. The files follow the naming pattern *_test.go. Which built-in tool fits best?",
"o": [
"Glob",
"Edit",
"Grep",
"Read"
],
"a": 0,
"e": "Glob matches file names and paths, such as **/payments/**/*_test.go. Grep searches file contents."
},
{
"s": 1,
"d": "D2",
"t": "2.4",
"k": 1,
"q": "The team has GitHub, Sentry and Linear MCP servers configured. A developer wants to add a fourth server for the internal feature-flag service, but worries it will replace one of the others. What is true?",
"o": [
"Only one MCP server can be active per session, so developers have to choose which one to enable",
"Claude can use only the server added most recently, until the session is restarted",
"They're all available together; clear descriptions matter more as servers are added",
"Adding a server replaces the oldest one, unless the configuration lists a priority order"
],
"a": 2,
"e": "All configured MCP servers' tools are available together; with more tools, distinct names and descriptions keep selection accurate."
},
{
"s": 1,
"d": "D4",
"t": "4.2",
"k": 1,
"q": "Claude's Go doc comments vary in structure: some describe parameters, some don't, and few mention errors. The team's format is described in prose in CLAUDE.md. What is the most effective fix?",
"o": [
"Add two or three examples in the exact team format, one documenting returned errors",
"Rewrite the prose description of the format in more detail, listing every part a comment needs",
"Ask Claude to be consistent and thorough in every doc comment it writes from now on",
"Run a linter that rejects any comment shorter than three lines, and let Claude fix them"
],
"a": 0,
"e": "Concrete examples convey an output format more reliably than prose descriptions or instructions to be thorough."
},
{
"s": 1,
"d": "D5",
"t": "5.4",
"k": 1,
"q": "During a day-long investigation of a legacy billing service, a developer keeps asking related questions, and Claude rediscovers the same facts (entry points, data flow, key tables) each time. What is the best practice?",
"o": [
"Ask Claude to re-read the whole billing service at the start of each new question",
"Have Claude keep a scratchpad file of key findings and check it before each new question",
"Paste the earlier answers into each new question as part of the prompt by hand",
"Start a new session for each question, so the context window stays as small as possible"
],
"a": 1,
"e": "A scratchpad of findings persists across questions and context pressure, so Claude builds on what it already knows."
},
{
"s": 2,
"d": "D3",
"t": "3.6",
"k": 1,
"q": "The pipeline needs each review finding as a structured object (file, line, severity, message) to post inline comments on the merge request. What should the CI job use?",
"o": [
"An interactive session started by the CI runner, with output captured from the terminal",
"claude -p with a prompt asking for findings in a markdown table, parsed afterwards",
"claude -p with --output-format json and a --json-schema describing a finding",
"claude -p with plain text output, parsed with a set of regular expressions"
],
"a": 2,
"e": "Non-interactive mode plus JSON output with a schema gives machine-parseable findings reliably."
},
{
"s": 2,
"d": "D3",
"t": "3.6",
"k": 1,
"q": "Tests generated in CI often use fixtures and helpers that exist only on developers' machines, so they fail in the pipeline. What is the best fix?",
"o": [
"Run the generated tests only on developers' machines and skip them in the pipeline",
"Document the available fixtures, helpers and test environment in the project CLAUDE.md, which CI reads",
"Delete any generated test that fails in CI, and keep only the ones that pass",
"Ask Claude in the CI prompt to avoid using fixtures, and to build all test data inline in each test"
],
"a": 1,
"e": "Testing standards and available fixtures belong in CLAUDE.md, which both local and CI runs load."
},
{
"s": 2,
"d": "D3",
"t": "3.3",
"k": 1,
"q": "Database migration files need extra review rules (no destructive changes without a backfill plan). Migrations live in a migrations folder inside each of 12 services. How should the CI review pick up these rules?",
"o": [
"The migration rules added to the CI job's prompt for every merge request",
"A separate CLAUDE.md copied into each of the 12 migrations folders",
"A rule file with paths: [\"migrations/*\"] in .claude/rules/",
"A rule file in .claude/rules/ with paths: [\"**/migrations/**\"]"
],
"a": 3,
"e": "A path-scoped rule with ** applies wherever migrations live, from one file. migrations/* matches only a root migrations folder, copies drift, and prompt text applies to every merge request."
},
{
"s": 2,
"d": "D3",
"t": "3.1",
"k": 1,
"q": "Developers see Claude follow the team's error-handling standards locally, but the CI review ignores them. The standards turn out to be in each developer's ~/.claude/CLAUDE.md. What is the fix?",
"o": [
"Paste the standards into the CI job's prompt and keep the developers' copies as they are",
"Move the standards into the project's CLAUDE.md and commit it, so that CI runs load them too",
"Ask each developer to commit their personal CLAUDE.md into the repository",
"Copy one developer's ~/.claude/CLAUDE.md onto the CI runner's home directory by hand"
],
"a": 1,
"e": "Team standards belong in the project CLAUDE.md, which everyone and every CI run shares. User-level files are personal and don't travel with the repository."
},
{
"s": 2,
"d": "D4",
"t": "4.1",
"k": 1,
"q": "Developers complain that reviews flag problems in old code that the merge request didn't touch. What is the best change to the review prompt?",
"o": [
"Ask Claude to report a confidence score with each finding, and drop the low-confidence ones",
"Lower the number of comments allowed per review to five, so old issues get crowded out",
"Say explicitly that only issues this merge request introduces or changes should be reported",
"Ask Claude to be more selective, and to focus on the issues that matter most to the team"
],
"a": 2,
"e": "Precision comes from explicit criteria; here, the scope of what counts. Vague selectivity, caps and confidence filters don't define the boundary."
},
{
"s": 2,
"d": "D4",
"t": "4.1",
"k": 2,
"q": "Select two. Reviewers disagree about what Claude's \"critical\" and \"minor\" labels mean. Which changes will make the severity labels consistent?",
"o": [
"Have Claude assign severity based on how confident it is in each finding",
"Define each level with concrete criteria, e.g. data loss or security exposure for critical",
"Remove severity labels entirely and leave developers to decide what matters",
"Include a short code example of a typical finding at each severity level",
"Ask Claude to think harder about severity before it assigns each label"
],
"a": [
1,
3
],
"e": "Explicit criteria plus concrete examples make labels consistent. Thinking harder or using confidence as a proxy doesn't define what each level means."
},
{
"s": 2,
"d": "D4",
"t": "4.2",
"k": 1,
"q": "Claude flags SQL built by string concatenation inconsistently. Concatenating constant table names is safe in this codebase; concatenating user input is a real injection risk. What is the most effective fix?",
"o": [
"Add a few examples contrasting the safe and the unsafe patterns, each with a one-line reason",
"Ask Claude to flag SQL concatenation only when it is highly confident of a real problem",
"Tell Claude never to flag string concatenation in SQL, since the team reviews queries anyway",
"Tell Claude to flag all string concatenation in SQL, since some of it might be unsafe"
],
"a": 0,
"e": "Few-shot examples that contrast acceptable patterns with genuine issues, with the reasoning, teach the boundary."
},
{
"s": 2,
"d": "D4",
"t": "4.5",
"k": 1,
"q": "A nightly license audit across 300 repositories will use the Message Batches API, which can take up to 24 hours. Policy requires each repository's report within 26 hours of a new commit. How often must batches be submitted?",
"o": [
"Once a day",
"Every 2 hours",
"Every 6 hours",
"Every 12 hours"
],
"a": 1,
"e": "Worst case is the wait for the next submission plus up to 24 hours of processing, so the interval must be at most 2 hours (26 minus 24)."
},
{
"s": 2,
"d": "D4",
"t": "4.5",
"k": 1,
"q": "The team maps batch results back to repositories by their line position in the results file, and some reports end up attached to the wrong repository. What is the fix?",
"o": [
"Sort the results file alphabetically before mapping it back to the list of repositories",
"Tag each request with a custom_id such as the repo name, and match results on it",
"Switch the audit to synchronous calls so that the results come back in order",
"Submit a separate batch for each repository so that every result file has one line"
],
"a": 1,
"e": "Batch results aren't guaranteed to come back in submission order; custom_id is how results are correlated with requests."
},
{
"s": 2,
"d": "D4",
"t": "4.6",
"k": 1,
"q": "Before posting, each finding goes through a verification pass by a second Claude instance. What context should the verifier receive?",
"o": [
"The entire repository, so it can check the finding against every other file",
"Only the finding's one-line summary, so it judges without being biased by the code",
"The finding together with the first reviewer's full reasoning, so it understands the logic",
"The finding, the diff and surrounding code, but not the first reviewer's reasoning"
],
"a": 3,
"e": "An independent verifier needs the evidence (diff and code) but not the original reasoning, which would anchor it."
},
{
"s": 2,
"d": "D1",
"t": "1.5",
"k": 1,
"q": "The review job sometimes quotes code containing API keys in its merge request comments. Comments are posted through a post_mr_comment tool. How do you make sure no secret is ever posted?",
"o": [
"A weekly job that searches merge request comments for secrets and deletes any it finds",
"Asking developers to report any comment that contains a secret so it can be removed",
"A prompt instruction telling Claude never to include secrets or keys in its comments",
"A PreToolUse hook on post_mr_comment that redacts secrets or blocks the comment"
],
"a": 3,
"e": "When something must never happen, enforce it deterministically before the action, at the tool boundary."
},
{
"s": 2,
"d": "D1",
"t": "1.4",
"k": 1,
"q": "Release notes must not be published until every merge request they reference has been merged. Claude drafts the notes and calls publish_release_notes. What is the best enforcement?",
"o": [
"Have a second Claude instance confirm every merge status before publishing",
"Tell Claude in its prompt to check each merge request's status before it publishes",
"Make publish_release_notes reject the call unless every referenced merge request is merged",
"Unpublish any notes found to reference open merge requests the next day"
],
"a": 2,
"e": "A precondition that code can verify belongs in a programmatic gate on the action, not in a prompt or a second model's judgment."
},
{
"s": 2,
"d": "D1",
"t": "1.1",
"k": 1,
"q": "The CI review agent's loop ends when the model's text contains \"Review complete\". Sometimes it says that and then still requests a tool call, which never runs. What is the correct fix?",
"o": [
"Loop while stop_reason is \"tool_use\"; stop on \"end_turn\", whatever the text says",
"Tell the model in its prompt to call all of its tools before writing \"Review complete\"",
"Run any pending tool calls after the loop ends, and then post the review as it is",
"Change the phrase the loop checks for to \"REVIEW FINISHED\", in capitals, so it's unambiguous"
],
"a": 0,
"e": "stop_reason is the control signal. Parsing the model's text for a completion phrase is fragile, whatever the phrase."
},
{
"s": 2,
"d": "D2",
"t": "2.2",
"k": 1,
"q": "The run_tests tool returns {\"status\": \"error\"} both when tests fail and when the test infrastructure is down. Claude sometimes rewrites working code to \"fix\" tests that never ran. What should the tool return?",
"o": [
"The same error in both cases, but with the full console log attached so Claude can tell them apart",
"Return a retryable infra error when tests couldn't run, and the failing tests when they fail",
"A permission error when the infrastructure is down, so the job is escalated to a human",
"A success response whenever the infrastructure is down, so the review can continue without delay"
],
"a": 1,
"e": "The tool must distinguish \"couldn't run\" from \"ran and failed\"; they lead to opposite actions."
},
{
"s": 2,
"d": "D5",
"t": "5.5",
"k": 1,
"q": "Claude's risk ratings agree with senior reviewers 95% of the time overall. Leadership wants to auto-merge merge requests that Claude rates low-risk. What should be checked first?",
"o": [
"Nothing further, since 95% agreement is higher than the agreement between two human reviewers",
"Claude's self-reported confidence on the merge requests it rated low-risk last month",
"Agreement by change type (migrations, auth, config) on a human-reviewed sample",
"How many merge requests per week would be auto-merged, to estimate the time saved"
],
"a": 2,
"e": "Overall agreement can hide weak segments, such as risky change types. Validate by segment against human review before removing oversight."
},
{
"s": 3,
"d": "D1",
"t": "1.3",
"k": 1,
"q": "During an incident, the coordinator checks logs, then metrics, then recent deployments, one subagent after another. The three checks are independent. How can it cut the time to an answer?",
"o": [
"Give each subagent a smaller, faster model so that each check finishes sooner",
"Skip the deployment check unless the logs and metrics both look normal",
"Emit three Task calls in a single response, so that the three subagents run in parallel",
"Use one subagent that checks the logs, metrics and deployments in a sequence"
],
"a": 2,
"e": "Independent subtasks are spawned in parallel by emitting multiple Task calls in one coordinator response."
},
{
"s": 3,
"d": "D1",
"t": "1.2",
"k": 1,
"q": "The logs subagent concludes the database is the cause; the metrics subagent concludes it's the network. The coordinator currently reports whichever finding arrived first. What should it do instead?",
"o": [
"Present both findings with their evidence and send a targeted check to settle it",
"Report the database finding, since database problems cause most of the team's incidents",
"Ask both subagents to repeat their analysis until they reach the same conclusion",
"Report that the cause is unknown and close the investigation"
],
"a": 0,
"e": "The coordinator owns aggregation: surface conflicts with evidence and route a focused follow-up rather than picking arbitrarily."
},
{
"s": 3,
"d": "D1",
"t": "1.5",
"k": 1,
"q": "One metrics MCP server reports latency in milliseconds and another in seconds. The agent compared 0.8 (seconds) with 450 (milliseconds) and concluded latency had dropped. What is the most reliable fix, without changing either server?",
"o": [
"Removing one of the two metrics servers so that all values come in the same unit",
"Asking the agent to check the units carefully every time it compares two values",
"A note in the system prompt explaining which of the two servers reports which unit",
"A PostToolUse hook that converts every latency value to milliseconds first"
],
"a": 3,
"e": "Normalize heterogeneous tool output deterministically in a PostToolUse hook rather than relying on the model to convert units every time."
},
{
"s": 3,
"d": "D1",
"t": "1.7",
"k": 1,
"q": "Yesterday's session investigated a payment-service incident. Today a new, unrelated incident starts in the search service. How should the on-call engineer start?",
"o": [
"Start a new session for the search incident",
"Resume yesterday's session and summarize it first",
"Resume yesterday's payment-service session",
"Fork yesterday's session for the new incident"
],
"a": 0,
"e": "An unrelated investigation gets its own session; carrying another incident's context forward only adds noise."
},
{
"s": 3,
"d": "D2",
"t": "2.1",
"k": 2,
"q": "Select two. The assistant has one generic ops_action tool that takes {action, target, args} for restarts, scaling and rollbacks. Calls are often malformed and hard to audit. Which changes help?",
"o": [
"Keep ops_action, but add many more example actions to its description",
"Keep ops_action, but automatically retry any malformed call with the same arguments",
"Split it into purpose-specific tools such as restart_pod and rollback_release",
"Give each new tool its own input schema and a description saying when to use it",
"Replace ops_action with a Bash tool so that the agent can run kubectl itself"
],
"a": [
2,
3
],
"e": "Purpose-specific tools with clear contracts are easier to select, validate and audit. More examples on a generic tool, blind retries and raw shell access don't fix that."
},
{
"s": 3,
"d": "D2",
"t": "2.2",
"k": 1,
"q": "query_logs rejects any query spanning more than 24 hours with \"Bad request\". The agent keeps resending the same 72-hour query. What should the tool return?",
"o": [
"The first 24 hours of results without comment, so the agent always gets some data back",
"A transient error marked as retryable, so the agent tries the same query again a little later",
"An empty result marked as success, so the agent moves on to the next step of the investigation",
"A validation error that explains the 24-hour limit and suggests splitting the query"
],
"a": 3,
"e": "An actionable validation error lets the agent fix its input. Silently truncating looks like a complete answer."
},
{
"s": 3,
"d": "D2",
"t": "2.3",
"k": 1,
"q": "Every investigation must start by loading the incident ticket with get_incident, and after that the agent should choose its own tools. How should tool_choice be set?",
"o": [
"Use \"auto\" throughout, and name get_incident in the system prompt as step one",
"Force {\"type\": \"tool\", \"name\": \"get_incident\"} on the first request, then \"auto\"",
"Use \"any\" on every request, so that the agent always calls some tool",
"Force get_incident on every request of the investigation, start to finish"
],
"a": 1,
"e": "Force the specific tool that must run first, then let the agent choose freely."
},
{
"s": 3,
"d": "D2",
"t": "2.4",
"k": 1,
"q": "On-call engineers want reusable investigation templates, such as \"Investigate elevated 5xx errors for <service>\", that they pick from the slash menu. Which MCP primitive fits?",
"o": [
"A prompt",
"A tool",
"A hook",
"A resource"
],
"a": 0,
"e": "User-picked, parameterized templates are MCP prompts; they appear as slash commands."
},
{
"s": 3,
"d": "D2",
"t": "2.5",
"k": 1,
"q": "The engineer asks which services still call the deprecated /v1/charge endpoint. The services live in 30 repositories checked out side by side. Which built-in tool should the agent start with?",
"o": [
"Glob for \"*charge*\"",
"Bash to list each directory",
"Grep for \"/v1/charge\"",
"Read every service's main file"
],
"a": 2,
"e": "Finding where a string is used is a content search: Grep. File names don't reveal which code calls an endpoint."
},
{
"s": 3,
"d": "D4",
"t": "4.3",
"k": 1,
"q": "The assistant writes incident summaries as free text, but the status page and ticket tracker need specific fields: affected services, start time, impact and current status. What is the best approach?",
"o": [
"Define a record_incident_summary tool whose JSON schema has those fields",
"Keep the free text and have an engineer copy the fields into each system by hand",
"Ask for the summary as JSON in the prompt, and parse the response text with a JSON parser",
"Ask for each field on a separate line in plain text, and split the response by line"
],
"a": 0,
"e": "tool_use with a schema gives reliable structured output; the fields come from the tool call's input."
},
{
"s": 3,
"d": "D4",
"t": "4.2",
"k": 1,
"q": "The assistant rates alert severity inconsistently for borderline cases, such as a 2% error rate on an internal-only service. The severity definitions are already written out. What is the most effective addition?",
"o": [
"Twenty examples of obvious high-severity and low-severity alerts from last year",
"A confidence score with each rating, shown only when high",
"An instruction to always choose the higher severity whenever in any doubt",
"Two to four borderline examples, each with the chosen severity and why"
],
"a": 3,
"e": "Few-shot examples help most on ambiguous cases when they show the reasoning. Obvious examples don't teach the boundary, and \"pick the higher one\" inflates severity."
},
{
"s": 3,
"d": "D5",
"t": "5.4",
"k": 1,
"q": "Exploring a legacy service, the assistant fills its own context by reading dozens of files to answer narrow questions such as \"where are refunds persisted?\", and loses track of the overall picture. What is the best approach?",
"o": [
"Have the main agent read every file in the service once at the start, so later questions are faster",
"Hand each narrow question to an exploring subagent that returns only a short answer",
"Answer each narrow question in a brand-new session, so that the context window always starts empty",
"Raise the main agent's context window so that dozens more files fit into a single session"
],
"a": 1,
"e": "Subagents isolate verbose exploration; the main agent keeps coordination and receives concise results."
},
{
"s": 3,
"d": "D5",
"t": "5.1",
"k": 1,
"q": "In a long incident session, the agent's summaries lose the exact facts: the incident ID, the start time, the affected regions and the customer-impact numbers. Later updates contain wrong figures. What is the best fix?",
"o": [
"Keep them in a persistent facts block that is never summarized and always sent",
"Use a model with a larger context window and turn off summarization entirely",
"Ask the engineer to restate the incident facts every time they request an update",
"Summarize less often, so that the exact facts stay in the conversation for longer"
],
"a": 0,
"e": "Exact transactional facts belong in a persistent structured block outside summarized history."
},
{
"s": 3,
"d": "D5",
"t": "5.3",
"k": 1,
"q": "The metrics subagent couldn't reach the Prometheus instance for the EU region, so it reported \"no anomalies found\" for all regions. What should it have returned?",
"o": [
"Nothing at all, until every regional instance could be reached",
"An estimate for the EU region based on the metrics from the other regions",
"Results for the regions it reached, plus an explicit error for the EU region",
"\"No anomalies found\", since every region it was able to check looked normal"
],
"a": 2,
"e": "Distinguish access failures from valid empty results, and return partial results with the failure, so the coordinator doesn't treat a gap as a finding."
},
{
"s": 3,
"d": "D5",
"t": "5.2",
"k": 1,
"q": "An on-call engineer asks the assistant to restart the production database during business hours. The runbook covers restarts during maintenance windows but says nothing about business hours. The assistant has permission to run the restart. What should it do?",
"o": [
"Run the restart, since the engineer asked for it and the assistant has the permission",
"Refuse permanently, since anything not covered by the runbook is forbidden",
"Schedule the restart for the next maintenance window without telling the engineer",
"Ask a human to confirm first, since the runbook doesn't cover business hours"
],
"a": 3,
"e": "When policy is silent on a high-impact action, escalate for a human decision rather than inventing one either way."
}
]
};
