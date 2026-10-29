/* List of tests shown on the home page. To add a test: add a file exams/<id>.js and a line here. category: "full" or "short". */
window.CATALOG = [
 {
  "id": "mock1",
  "category": "full",
  "title": "Full Mock Test 1",
  "intro": "A full-length mock in the format of the real exam: 60 scenario-based questions across four production scenarios, 2 hours if timed.",
  "count": 60,
  "minutes": 120,
  "scenarios": 4
 },
 {
  "id": "mock2",
  "category": "full",
  "title": "Full Mock Test 2",
  "intro": "A second full-length mock with no repeats from Mock Test 1. It covers the two scenarios Mock Test 1 leaves out.",
  "count": 60,
  "minutes": 120,
  "scenarios": 4
 },
 {
  "id": "mock3",
  "category": "full",
  "title": "Full Mock Test 3",
  "intro": "A third full-length mock: 60 new questions across four scenarios, weighted like the real exam.",
  "count": 60,
  "minutes": 120,
  "scenarios": 4
 },
 {
  "id": "focus",
  "category": "short",
  "title": "Focus Test: Commonly Missed Topics",
  "intro": "30 questions on topics that trip people up most: escalation, path rules, human review, sessions, MCP, explicit criteria, built-in tools and iterative refinement.",
  "count": 30,
  "minutes": 60,
  "scenarios": 3
 },
 {
  "id": "warmup",
  "category": "short",
  "title": "Quick Warm-Up",
  "intro": "A short warm-up: 20 questions, 40 minutes if timed. Good for exam morning or a quick check-in.",
  "count": 20,
  "minutes": 40,
  "scenarios": 3
 }
];
