# March Madness Squares — Agent Context Document

## Project Overview

A two-part web application for tracking a March Madness “squares” challenge. A **Python scraper** pulls live NCAA tournament scores from ESPN and writes them to a JSON file. A **Vue.js + Tailwind CSS frontend** reads that JSON, accepts user-defined squares (digit pairs with labels), and calculates points won across all tournament games.

-----

## Tech Stack

|Layer                    |Technology                                              |
|-------------------------|--------------------------------------------------------|
|Frontend framework       |Vue 3 (Composition API)                                 |
|Frontend build tool      |Vite                                                    |
|CSS framework            |Tailwind CSS                                            |
|Routing                  |Vue Router                                              |
|Scraper language         |Python 3                                                |
|Scraper libraries        |`requests`, `BeautifulSoup4` (or ESPN internal JSON API)|
|Data persistence (user)  |Browser `localStorage`                                  |
|Data persistence (scores)|Flat JSON file (`scores.json`)                          |
|Data persistence (config)|Flat JSON file (`points.json`)                          |
|Scheduling               |Cron job (every 5 minutes)                              |

-----

## How the Squares Challenge Works

- Each square has a **label** (e.g. owner name), a **winning digit** (0–9), and a **losing digit** (0–9).
- For every completed NCAA tournament game, take the **last digit of the winning team’s score** and the **last digit of the losing team’s score**.
- If those two digits match a user’s square, that square earns points for that game.
- Points depend on which round the game was played in (see `points.json` below).
- A user may have multiple squares. Each square is evaluated independently against every game.

-----

## Project Structure

```
/
├── scraper/
│   └── scraper.py               # ESPN scraper, writes to public/scores.json
├── public/
│   ├── scores.json              # Written by scraper, read by frontend at runtime
│   └── points.json              # Static config for points per round
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── MySquares.vue        # Add/remove/edit squares
│   │   └── Results.vue          # Game results and points summary
│   ├── components/
│   │   ├── SquareCard.vue       # Displays a single square with its label and digits
│   │   └── GameResult.vue       # Displays a single game result with match highlight
│   └── composables/
│       └── useSquares.js        # localStorage read/write logic for squares
├── package.json
└── vite.config.js
```

-----

## JSON File Schemas

### `public/scores.json`

Written by the Python scraper. Updated every 5 minutes via cron.

```json
{
  "last_updated": "2026-03-20T18:00:00",
  "games": [
    {
      "id": "401234567",
      "round": "Round of 64",
      "winner": {
        "team": "Duke",
        "score": 82
      },
      "loser": {
        "team": "UNC",
        "score": 74
      },
      "status": "final"
    }
  ]
}
```

**Field notes:**

- `round` must be one of the exact strings: `"First Four"`, `"Round of 64"`, `"Round of 32"`, `"Sweet 16"`, `"Elite 8"`, `"Final Four"`, `"Championship"`
- `status` values: `"final"` | `"in_progress"` | `"upcoming"`
- Only games with `status: "final"` are used for points calculation
- `winner` is always the higher-scoring team; `loser` is the lower-scoring team

-----

### `public/points.json`

Static config file. Should be easy to update without touching code.

```json
{
  "First Four": 30,
  "Round of 64": 5,
  "Round of 32": 25,
  "Sweet 16": 75,
  "Elite 8": 100,
  "Final Four": 160,
  "Championship": 500
}
```

-----

## Python Scraper (`scraper/scraper.py`)

### Data Source

Use the ESPN internal scoreboard API endpoint — this is more reliable than HTML scraping and does not require Selenium:

```
https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=100&limit=100
```

- `groups=100` filters for NCAA Tournament games
- Parse the JSON response — no HTML parsing needed
- May need to paginate or call per-day depending on ESPN’s response shape

### Scraper Responsibilities

1. Fetch the ESPN scoreboard JSON
1. For each game, extract:
- Game ID
- Round name (map from ESPN’s `season.slug` or `notes` field to the canonical round names above)
- Home and away team names and scores
- Game status (final / in progress / upcoming)
- Determine winner and loser from scores
1. Write output to `public/scores.json` using the schema above
1. Always overwrite the full file (not append)
1. Log errors gracefully — if the fetch fails, do not overwrite the existing `scores.json`

### Round Name Mapping

ESPN may return round names differently. Normalize them to these exact strings:

|ESPN value (example)                        |Canonical name  |
|--------------------------------------------|----------------|
|`"First Four"` / play-in                    |`"First Four"`  |
|`"First Round"`                             |`"Round of 64"` |
|`"Second Round"`                            |`"Round of 32"` |
|`"Sweet Sixteen"` / `"Sweet 16"`            |`"Sweet 16"`    |
|`"Elite Eight"` / `"Elite 8"`               |`"Elite 8"`     |
|`"Final Four"`                              |`"Final Four"`  |
|`"National Championship"` / `"Championship"`|`"Championship"`|

### Cron Job

Run every 5 minutes. Example crontab entry:

```
*/5 * * * * /usr/bin/python3 /path/to/scraper/scraper.py >> /path/to/scraper/scraper.log 2>&1
```

-----

## Frontend — Vue 3 + Tailwind CSS

### Routing

|Route     |View           |Description                        |
|----------|---------------|-----------------------------------|
|`/`       |`MySquares.vue`|Manage squares (add/edit/remove)   |
|`/results`|`Results.vue`  |View matched games and total points|

-----

### `MySquares.vue` — Square Management

**Behavior:**

- Display all saved squares as cards
- Each square has:
  - A text label (e.g. “John’s Square”)
  - A winning digit selector (0–9)
  - A losing digit selector (0–9)
- User can add a new square (blank form at bottom or modal)
- User can delete any existing square
- User can edit an existing square’s label or digits
- All changes are saved to `localStorage` immediately on change
- No save button required — auto-save on input

**localStorage key:** `mm_squares`

**localStorage shape:**

```json
[
  {
    "id": "uuid-or-timestamp",
    "label": "John's Square",
    "winDigit": 2,
    "loseDigit": 7
  }
]
```

-----

### `Results.vue` — Points Summary

**Behavior:**

- Fetch `public/scores.json` and `public/points.json` on mount
- Fetch `mm_squares` from `localStorage`
- For each game with `status: "final"`:
  - Compute `winDigit = winner.score % 10`
  - Compute `loseDigit = loser.score % 10`
  - Check each user square: if `square.winDigit === winDigit && square.loseDigit === loseDigit`, it’s a match
- Display:
  - A summary section at the top: total points across all squares
  - Per-square breakdown: label, total points, list of matched games
  - Per-game detail: round, teams, score, points earned
- Show `last_updated` timestamp from `scores.json`
- Games with no matches should still be visible (collapsed or muted) so the user can see the full tournament bracket context

-----

### `useSquares.js` Composable

Encapsulates all `localStorage` interaction:

```js
// Exports:
const { squares, addSquare, removeSquare, updateSquare } = useSquares()
```

- `squares` — reactive array of square objects
- `addSquare(label, winDigit, loseDigit)` — generates a unique ID, pushes to array, saves to localStorage
- `removeSquare(id)` — removes by ID, saves to localStorage
- `updateSquare(id, fields)` — merges fields into matching square, saves to localStorage

-----

### `SquareCard.vue` Component

Props:

- `square` — the square object `{ id, label, winDigit, loseDigit }`
- `editable` — boolean, shows edit/delete controls when true (used on MySquares view)
- `points` — optional number, total points earned (used on Results view)

-----

### `GameResult.vue` Component

Props:

- `game` — game object from `scores.json`
- `matchedSquares` — array of squares that matched this game (may be empty)
- `pointsEarned` — number (0 if no match)

Displays: round badge, team names, final score, points earned (highlighted if matched).

-----

## Hosting Notes

The scraper and frontend are intentionally decoupled — the scraper writes a flat JSON file and the frontend fetches it statically. This means:

- **Frontend** can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.)
- **Scraper** can run on any machine with Python 3 and cron (local machine, VPS, GitHub Actions scheduled workflow, etc.)
- The only coupling is the path to `public/scores.json` — ensure the scraper writes to the same directory that the frontend serves from, or configure the frontend’s fetch URL accordingly

-----

## Agent Instructions

1. Scaffold the Vite + Vue 3 project first, installing Tailwind CSS per the official Vite integration guide
1. Create `public/points.json` with the values above — this file should never be auto-generated
1. Build `useSquares.js` composable before building any views that depend on it
1. Build `MySquares.vue` and verify localStorage read/write works before building `Results.vue`
1. Build the Python scraper last — stub `scores.json` with sample data during frontend development so the Results view can be built and tested independently
1. When building the scraper, handle ESPN API failures gracefully — never overwrite `scores.json` with empty or malformed data
1. All round name strings in the frontend should be read from `points.json` keys — do not hardcode round names in Vue components
1. Do not use `<form>` tags — use Vue event handlers (`@click`, `@input`) for all interactions