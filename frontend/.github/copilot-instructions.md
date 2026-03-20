# March Madness Squares - Workspace Instructions

## Project Overview

A Vue 3 + Tailwind CSS frontend for tracking March Madness "squares" betting challenge, with a Python scraper that fetches live NCAA tournament scores from ESPN. Users define squares (win/lose digit pairs), and the app calculates points based on game outcomes.

**Status**: Fresh project - planning complete, ready for implementation

## Architecture

### Frontend

- Vue 3 + Vite + Tailwind CSS
- Design: Retro-futuristic LED scoreboard aesthetic
- Views: MySquares (manage squares), Results (show points)
- Data: localStorage for user squares, fetch from public/scores.json

### Backend

- Python scraper fetches ESPN API every 5 minutes via GitHub Actions
- Normalizes round names and writes to public/scores.json

## Build Commands

npm run dev # Development server
npm run build # Production build
npm run preview # Preview production build

## Implementation Order

Follow `_plan/implementation-guide.md` phases in order:

1. Project setup (Vite, Tailwind, base CSS)
2. Router and composables
3. Components (AppHeader, SquareCard, AddSquareForm)
4. Views (MySquares, Results)
5. Python scraper and GitHub Actions

## Code Style

### Vue 3 Composition API

- Use `<script setup>` syntax
- `ref()` for reactive values, `computed()` for derived state
- No `<form>` tags - use `@click`, `@input` event handlers

### Design System (Strictly Follow)

- **Colors**: LED primary #ff3d00, LED secondary #ffd600, LED active #00ff88
- **Fonts**: Chakra Petch (display), Space Mono (body)
- **Animations**: Stagger entrances, pulse matches, glow on hover
- **Responsive**: 3-col desktop → 2-col tablet → 1-col mobile

### Data Management

- localStorage key: `mm_squares`
- Square shape: `{ id, label, winDigit, loseDigit }`
- Never hardcode round names - read from `public/points.json`

## Key Conventions

**Round names**: "First Four", "Round of 64", "Round of 32", "Sweet 16", "Elite 8", "Final Four", "Championship"

**Points calculation**:
winDigit = game.winner.score % 10
loseDigit = game.loser.score % 10
// Match when square.winDigit === winDigit AND square.loseDigit === loseDigit

## Common Pitfalls

- JSON files must be in `public/`, not `src/`
- Tailwind classes use dashes: `bg-court-dark` not `bg-courtDark`
- Import fonts in CSS before Tailwind directives
- Wrap localStorage in try-catch (fails in private mode)
- Use inline style for animation delays: `:style="{ animationDelay: ... }"`

## References

- Implementation guide: `_plan/implementation-guide.md`
- Design system: `_plan/design-specification.md`
- Data schemas: `_plan/march-madness-squares-context.md`
- Deployment: `_plan/github-actions-deploy.md`
