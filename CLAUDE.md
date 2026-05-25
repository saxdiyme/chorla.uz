# CLAUDE.md — Chorla.uz

## Project

Chorla.uz — classifieds + auction marketplace for Uzbekistan.
Stack: Next.js 14 (App Router), Supabase (PostgreSQL + Auth + Storage + Realtime), Vercel.
Language: JavaScript only. No TypeScript.

---

## Karpathy Coding Guidelines

Apply these to every task, every time.

**1. Think Before Coding**
State assumptions explicitly before writing any code.
If a task has multiple interpretations — list them and ask, never pick silently.
If something is unclear — stop and ask. Do not guess.

**2. Simplicity First**
Write the minimum code that correctly solves the problem.
No extra features. No speculative abstractions. No unused flexibility.
If a solution is 200 lines and could be 50 — rewrite it to 50.

**3. Surgical Changes**
Touch only files and lines required by the current task.
Do not refactor adjacent code. Do not improve things that are not broken.
Every changed line must trace directly to the task.

**4. Goal-Driven Execution**
Before writing code — state what "done" looks like.
For multi-step tasks — write a short numbered plan, then execute step by step.
After finishing — verify against success criteria, not just "it compiles".
If verification fails — fix and re-verify. Never hand off a broken state.

---

## Output Rules

- No inline comments inside code — ever
- No explanatory text inside functions or components
- After each task provide a short final report only:
  - What was done
  - What files were created or changed
  - What to manually check or test

---

## File Structure

```
app/
  (auth)/login/
  (auth)/register/
  (main)/browse/
  (main)/listing/[id]/
  (main)/sell/
  (main)/auctions/
  api/listings/
  api/auctions/
  api/bids/
lib/
  supabase/client.js
  supabase/server.js
components/
```

---

## Protected Files — Do Not Touch Unless Task Explicitly Targets Them

- `app/page.jsx`
- `app/globals.css`
- `components/Navbar.jsx`
- `components/ProductCard.jsx`
- `components/AuctionCard.jsx`
- `lib/data.js`

---

## Supabase Rules

- Use `lib/supabase/server.js` inside Server Components and API routes
- Use `lib/supabase/client.js` inside Client Components
- Never call Supabase directly — always go through these helpers
- Never use service role key on the client side
- All mutations must respect RLS policies

---

## Auction Rules — Critical

- Auction end time (`ends_at`) lives in the database — never trust the client
- Bid placement must use a database transaction or RPC to prevent race conditions
- Current price on the client must update via Supabase Realtime subscription

---

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` — public
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public
- `SUPABASE_SERVICE_ROLE_KEY` — server only, never expose to client
- Never hardcode any keys or URLs in code

---

## Styling Rules

- Use existing CSS classes from `globals.css` — do not create new ones unless necessary
- Use CSS variables: `--green`, `--muted`, `--radius`, etc.
- No Tailwind. No CSS-in-JS. No new CSS frameworks.

---

## Form Rules

- No `<form>` HTML element in JSX — use `onClick` and `onChange` handlers
- Validate on client before sending to Supabase
- Show error messages inline, near the relevant field

---

## Images

- Store in Supabase Storage bucket `listings`
- Save only the public URL in `listings.images` array
- Max 5 images per listing

---

## Prices

- Always stored as integers in UZS in the database
- Display format: `1 500 000 so'm`

---

## Stack Reference

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14, App Router, React 18    |
| Styling    | Custom CSS (globals.css)            |
| Icons      | lucide-react                        |
| Backend    | Next.js API Routes                  |
| Database   | Supabase PostgreSQL                 |
| Auth       | Supabase Auth                       |
| Storage    | Supabase Storage                    |
| Realtime   | Supabase Realtime                   |
| Deploy     | Vercel                              |
| Mobile     | Expo / React Native (later)         |
