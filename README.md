# Mock Lab

Free practice tests for the **Claude Certified Architect – Foundations (CCA-F)** exam.
A static site: plain HTML and JavaScript, no build step and no server.

## Tests

| Category | Test | Questions | Time |
| --- | --- | --- | --- |
| Full mock tests | Full Mock Test 1 | 60 | 2 hrs |
| Full mock tests | Full Mock Test 2 | 60 | 2 hrs |
| Full mock tests | Full Mock Test 3 | 60 | 2 hrs |
| Short practice tests | Focus Test: Commonly Missed Topics | 30 | 1 hr |
| Short practice tests | Quick Warm-Up | 20 | 40 min |

## Features

- Timed mode (2 min per question, auto-submits) or untimed practice mode
- Strike out answers: right-click an option (on phones, tap the ✕), or press Shift+A–E
- Mark for review, question navigator, review screen before submitting
- Results by domain and scenario, pacing stats and an explanation for every question
- Progress and results are saved in the browser only (localStorage)

## Publish on GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `mock-lab`.
2. Click **Add file → Upload files**, drag in everything from this folder
   (`index.html`, `exam.html`, `README.md` and the `exams` folder), then **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to
   **Deploy from a branch**, Branch to **main** and folder to **/ (root)**, then **Save**.
4. After a minute or two your site is live at
   `https://<your-username>.github.io/mock-lab/`.

## Adding a test

1. Copy one of the files in `exams/` (for example `warmup.js`) to a new name, e.g. `mock4.js`,
   and change its `id`, `title`, `intro`, `scenarios` and `questions`.
2. Add a matching entry to `exams/catalog.js` with the same `id` and `category` set to
   `"full"` or `"short"`.

Question format: `s` scenario index, `d` domain (D1–D5), `t` task, `q` question text,
`o` options, `a` correct option index (an array of two for "select two" questions), `e` explanation.

## Disclaimer

Unofficial practice material, not affiliated with or endorsed by Anthropic.
The questions are original, written from the public exam guide; they are not real exam questions.
