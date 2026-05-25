# Karpathy Coding Guidelines

Four rules for writing code that is correct, minimal, and maintainable.
Apply these to every task, every time.

---

## Rule 1 — Think Before Coding

State your assumptions explicitly before writing any code.

If a task has multiple valid interpretations:
- List all interpretations you see
- Ask which one to proceed with
- Never silently pick one and run with it

If something is unclear, ambiguous, or missing context:
- Stop
- Ask a specific question
- Do not guess and do not proceed on assumptions

**Wrong:** Start coding immediately, figure out the details later.
**Right:** "I see two ways to interpret this — do you want X or Y?"

---

## Rule 2 — Simplicity First

Write the minimum amount of code that correctly solves the problem.

- No extra features beyond what was asked
- No speculative abstractions ("we might need this later")
- No unused flexibility or configuration options
- No helper functions that are only called once
- No layers of indirection that don't simplify anything

If your solution is 200 lines and it could be 50 — rewrite it to 50.
Prefer flat, boring, readable code over clever, elegant code.

**Wrong:** Build a generic system that handles all possible future cases.
**Right:** Solve exactly this case, in the simplest way possible.

---

## Rule 3 — Surgical Changes

Touch only what the task requires. Nothing more.

- Do not refactor code adjacent to the change
- Do not rename variables that are not part of the task
- Do not reorganize file structure unless explicitly asked
- Do not "improve" things that are not broken
- Do not add error handling for cases not mentioned in the task

Every line you change must trace directly to a requirement in the task description.
If you cannot explain why a line was changed — revert it.

**Wrong:** "While I was in this file, I also cleaned up a few things."
**Right:** Change exactly what was asked, leave everything else byte-for-byte identical.

---

## Rule 4 — Goal-Driven Execution

Define what "done" looks like before you write the first line.

For every task:
1. State the success criteria explicitly ("this is done when X works")
2. For multi-step tasks: write a short numbered plan first, then execute
3. After implementing: verify against the success criteria — not just "it compiles"
4. If verification fails: fix the issue and re-verify
5. Never hand off a state where you know something is broken

**Wrong:** Implement the feature, assume it works, move on.
**Right:** "Done means: user can register, session is saved, and redirect to homepage works. Let me verify each one."

---

## Summary

| Rule | One line |
|---|---|
| Think Before Coding | Assumptions and ambiguities first, code second |
| Simplicity First | Minimum code that solves the problem |
| Surgical Changes | Touch only what the task requires |
| Goal-Driven Execution | Define done, implement, verify, repeat |
