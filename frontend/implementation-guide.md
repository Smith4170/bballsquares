# March Madness Squares — Frontend Implementation Guide

## Overview

This document provides step-by-step instructions for building the March Madness Squares frontend application. Follow these steps in order, testing each component before moving to the next.

**Tech Stack:**
- Vue 3 with Composition API and `<script setup>` syntax
- Vite (build tool)
- Tailwind CSS (styling)
- Vue Router (navigation)
- lucide-vue-next (icons)

**Design Aesthetic:**
- Retro-Futuristic Scoreboard theme
- Dark mode with LED-style glowing elements
- Bold orange-red, yellow, and green accent colors
- Chakra Petch font for numbers/headers
- Space Mono font for body text

---

## Phase 1: Project Setup

### Step 1.1: Create Vite + Vue Project

```bash
npm create vite@latest . -- --template vue
npm install
```

### Step 1.2: Install Dependencies

```bash
npm install vue-router tailwindcss postcss autoprefixer lucide-vue-next
npx tailwindcss init -p
```

### Step 1.3: Configure Tailwind CSS

**File: `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'court-dark': '#0a0e16',
        'court-mid': '#1a2332',
        'court-line': '#2a3d5c',
        'led-primary': '#ff3d00',
        'led-secondary': '#ffd600',
        'led-active': '#00ff88',
        'led-inactive': '#6b7785',
        'winner': '#00ff88',
        'loser': '#ff6b6b',
        'text-primary': '#e8edf4',
        'text-secondary': '#9dabc0',
      },
      fontFamily: {
        'display': ['Chakra Petch', 'sans-serif'],
        'body': ['Space Mono', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4.5rem',
      },
      animation: {
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderLeftColor: '#00ff88' },
          '50%': { borderLeftColor: 'rgba(0, 255, 136, 0.3)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 61, 0, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 61, 0, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

### Step 1.4: Create Base CSS File

**File: `src/assets/base.css`**

```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&family=Space+Mono:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables */
:root {
  /* Background & Structure */
  --color-court-dark: #0a0e16;
  --color-court-mid: #1a2332;
  --color-court-line: #2a3d5c;
  
  /* LED Scoreboard Colors */
  --color-led-primary: #ff3d00;
  --color-led-secondary: #ffd600;
  --color-led-active: #00ff88;
  --color-led-inactive: #6b7785;
  
  /* Functional Colors */
  --color-winner: #00ff88;
  --color-loser: #ff6b6b;
  --color-text-primary: #e8edf4;
  --color-text-secondary: #9dabc0;
  
  /* Typography */
  --font-display: 'Chakra Petch', sans-serif;
  --font-body: 'Space Mono', monospace;
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-court-dark);
  color: var(--color-text-primary);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Noise Texture Overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}

/* Number Font Styling */
.font-numbers {
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
}

/* Utility Classes */
.container-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

@media (max-width: 768px) {
  .container-main {
    padding: 1rem;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-court-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--color-court-line);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-led-primary);
}
```

### Step 1.5: Create Static Data Files

**File: `public/points.json`**

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

**File: `public/scores.json` (stub data for development)**

See the full stub data in the actual implementation - includes 5 sample games.

---

## Phase 2: Router Setup

### Step 2.1: Create Router Configuration

**File: `src/router/index.js`**

```js
import { createRouter, createWebHistory } from 'vue-router'
import MySquares from '../views/MySquares.vue'
import Results from '../views/Results.vue'

const routes = [
  {
    path: '/',
    name: 'MySquares',
    component: MySquares
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### Step 2.2: Update Main Entry Point

**File: `src/main.js`**

```js
import { createApp } from 'vue'
import './assets/base.css'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')
```

---

## Phase 3: Core Composables

### Step 3.1: Create useSquares Composable

This composable manages all localStorage operations for user squares.

**File: `src/composables/useSquares.js`**

**Key Functions:**
- `loadSquares()`: Reads existing squares from browser storage
- `saveSquares()`: Writes the current squares array to localStorage
- `addSquare(label, winDigit, loseDigit)`: Creates a new square with unique ID
- `removeSquare(id)`: Deletes a square by ID
- `updateSquare(id, fields)`: Modifies an existing square

### Step 3.2: Create useCountUp Composable

Animates numbers counting up from 0 to target value.

**File: `src/composables/useCountUp.js`**

Uses `requestAnimationFrame` for smooth 60fps animation with ease-out timing.

---

## Phase 4: Components Overview

### Component Hierarchy

```
App.vue
├── AppHeader.vue
└── router-view
    ├── MySquares.vue
    │   ├── SquareCard.vue (editable)
    │   └── AddSquareForm.vue
    └── Results.vue
        ├── StatsSummary.vue
        ├── SquareCard.vue (read-only with points)
        └── GameResult.vue
```

---

## Phase 5: AppHeader Component

**File: `src/components/AppHeader.vue`**

**Features:**
- Fixed positioning at top
- Logo, navigation links, last updated timestamp
- Active route indicator with underline
- Responsive mobile layout

---

## Phase 6: SquareCard Component

**File: `src/components/SquareCard.vue`**

**Props:**
- `square` (Object, required): Square data
- `editable` (Boolean): Shows edit/delete buttons
- `points` (Number): Total points for this square

**Features:**
- Toggle between view and edit modes
- Glowing digit displays (80x80px boxes)
- Edit/delete icon buttons using lucide-vue-next
- Hover animation (lift + border glow)
- Responsive sizing for mobile

---

## Phase 7: AddSquareForm Component

**File: `src/components/AddSquareForm.vue`**

**Features:**
- Three inputs: label text, win digit dropdown (0-9), lose digit dropdown (0-9)
- Validates label is not empty
- Emits 'add' event with form data
- Resets form after submission
- Dashed border styling to differentiate from cards
- Gradient button with hover effects

---

## Phase 8: MySquares View

**File: `src/views/MySquares.vue`**

**Features:**
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Empty state when no squares exist
- Uses useSquares composable
- Staggered entrance animations
- AddSquareForm at bottom

**Flow:**
1. Load squares from localStorage
2. Display in grid or show empty state
3. Handle add/edit/delete operations
4. Auto-save to localStorage

---

## Phase 9: GameResult Component

**File: `src/components/GameResult.vue`**

**Props:**
- `game` (Object): Game data from scores.json
- `matchedSquares` (Array): Squares that matched this game
- `pointsEarned` (Number): Points for this game

**Features:**
- Round badge with gradient
- Team names and scores
- Last digits display
- Green pulsing border for matches
- Matched squares indicator

---

## Phase 10: StatsSummary Component

**File: `src/components/StatsSummary.vue`**

**Props:**
- `totalPoints` (Number)
- `squareCount` (Number)
- `matchCount` (Number)

**Features:**
- Animated count-up for total points
- Three stat cards: squares, matches, avg/win
- Court line pattern overlay
- Large glowing number display
- Responsive mobile stacking

---

## Phase 11: Results View

**File: `src/views/Results.vue`**

**Data Flow:**
1. Fetch `/scores.json` and `/points.json` on mount
2. Filter for completed games (status: "final")
3. For each game, calculate win/lose digits
4. Match against user squares
5. Calculate points based on round
6. Aggregate total points and statistics

**Features:**
- Loading state while fetching
- Error state if fetch fails
- StatsSummary at top
- Square performance section (sorted by points)
- All games list with match highlights
- Warning when no squares exist

---

## Phase 12: App Component

**File: `src/App.vue`**

**Features:**
- Renders AppHeader with last updated prop
- Router-view for page content
- Watches route changes to fetch last updated time

---

## Testing Checklist

### MySquares View Tests
- [ ] Add new square
- [ ] Edit square label and digits
- [ ] Delete square with confirmation
- [ ] Squares persist after reload
- [ ] Empty state displays correctly
- [ ] Form validation works
- [ ] Responsive layout

### Results View Tests
- [ ] Summary stats correct
- [ ] Count-up animation plays
- [ ] Squares sorted by points
- [ ] Matched games highlighted
- [ ] Points calculations accurate
- [ ] Last updated shows
- [ ] Loading/error states work

### General Tests
- [ ] Navigation works
- [ ] Fonts load correctly
- [ ] Colors match design
- [ ] Animations smooth
- [ ] No console errors
- [ ] Mobile responsive

---

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

---

## Common Issues & Solutions

**Fonts not loading:** Check Google Fonts import in base.css

**Colors not working:** Verify Tailwind config custom colors

**Router blank page:** Check view imports in router/index.js

**LocalStorage not persisting:** Check browser console and privacy mode

**JSON files not loading:** Must be in public/ folder, not src/

**Animations not playing:** Check Tailwind keyframes config

---

## File Structure

```
/
├── public/
│   ├── scores.json
│   └── points.json
├── src/
│   ├── assets/
│   │   └── base.css
│   ├── components/
│   │   ├── AppHeader.vue
│   │   ├── SquareCard.vue
│   │   ├── AddSquareForm.vue
│   │   ├── GameResult.vue
│   │   └── StatsSummary.vue
│   ├── composables/
│   │   ├── useSquares.js
│   │   └── useCountUp.js
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── MySquares.vue
│   │   └── Results.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## Implementation Order

1. **Setup** (Phase 1-2): Project, dependencies, router, base styles
2. **Composables** (Phase 3): useSquares, useCountUp
3. **Basic Components** (Phase 4-7): Header, SquareCard, AddSquareForm
4. **MySquares View** (Phase 8): First complete page
5. **Results Components** (Phase 9-10): GameResult, StatsSummary
6. **Results View** (Phase 11): Second complete page
7. **Integration** (Phase 12): App.vue, final testing

---

## Key Concepts for Entry-Level Developers

### Vue 3 Composition API
- Use `<script setup>` syntax (simpler than Options API)
- `ref()` creates reactive values
- `computed()` creates derived values
- `watch()` reacts to changes

### Component Communication
- **Props**: Parent → Child data flow
- **Emits**: Child → Parent event flow
- **Composables**: Shared reactive logic

### LocalStorage
- Browser storage that persists data
- Use JSON.stringify() to save objects
- Use JSON.parse() to read objects back

### Responsive Design
- Mobile-first approach
- CSS Grid for layouts
- Tailwind breakpoints: sm (640px), md (768px), lg (1024px)

### Animations
- CSS transitions for smooth state changes
- CSS animations for repeating effects
- requestAnimationFrame for JavaScript animations

---

## Next Steps After Frontend

1. Build Python scraper
2. Deploy to static host (Netlify/Vercel)
3. Set up scraper cron job
4. Test with live tournament data

---

## Summary

This guide provides everything needed to build the March Madness Squares frontend:
- ✅ Complete setup instructions
- ✅ All component specifications
- ✅ Code structure and organization
- ✅ Testing procedures
- ✅ Troubleshooting help

Follow phases in order, test each component thoroughly, and you'll have a production-ready application with a distinctive retro-futuristic scoreboard design.
