# March Madness Squares — Design Specification

## Design Philosophy

**Aesthetic Direction**: **Retro-Futuristic Scoreboard**

A bold visual system inspired by LED scoreboards, broadcast sports graphics, and basketball court geometry. High-contrast, energetic, and unmistakably sports-focused. Think: if a 1980s arena scoreboard collided with modern motion design.

**Core Differentiator**: Live scoreboard energy meets digital precision. Every interaction should feel like watching a live game unfold—numbers flip, scores update, wins light up.

**Tone Keywords**: Electric, Bold, Kinetic, Precise, Nostalgic-Modern

---

## Color System

### Primary Palette

```css
:root {
  /* Background & Structure */
  --color-court-dark: #0a0e16; /* Deep navy, like night game courts */
  --color-court-mid: #1a2332; /* Darker sections/cards */
  --color-court-line: #2a3d5c; /* Subtle borders, court lines */

  /* LED Scoreboard Colors */
  --color-led-primary: #ff3d00; /* Hot orange-red, main accent */
  --color-led-secondary: #ffd600; /* Bright yellow, secondary accent */
  --color-led-active: #00ff88; /* Neon green, success/active states */
  --color-led-inactive: #6b7785; /* Muted gray, inactive text */

  /* Functional Colors */
  --color-winner: #00ff88; /* Match green */
  --color-loser: #ff6b6b; /* Loss red (softer than primary) */
  --color-text-primary: #e8edf4; /* Off-white, high contrast */
  --color-text-secondary: #9dabc0; /* Muted blue-gray */

  /* Gradients */
  --gradient-court: linear-gradient(135deg, #0a0e16 0%, #1a2332 100%);
  --gradient-score: linear-gradient(90deg, #ff3d00 0%, #ff6b00 100%);
  --gradient-active: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
}
```

**Theme Strategy**: Dark mode only. The scoreboard aesthetic demands dark backgrounds with bright, glowing accents. No light mode toggle needed—this is intentional constraint for visual cohesion.

---

## Typography

### Font Pairing

**Display Font**: [**Chakra Petch**](https://fonts.google.com/specimen/Chakra+Petch) (Bold, 700)

- Geometric, angular, tech-forward
- Perfect for scores, headers, digit displays
- Used for: Main headings, numbers, round badges, score displays

**Body Font**: [**Space Mono**](https://fonts.google.com/specimen/Space+Mono) (Regular 400, Bold 700)

- Monospaced, technical, readable
- Maintains the digital/LED aesthetic without sacrificing legibility
- Used for: Team names, labels, body text, timestamps

**Implementation**:

```css
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&family=Space+Mono:wght@400;700&display=swap");

:root {
  --font-display: "Chakra Petch", sans-serif;
  --font-body: "Space Mono", monospace;
}

/* Typography Scale */
--text-xs: 0.75rem; /* 12px - timestamps, meta */
--text-sm: 0.875rem; /* 14px - labels, secondary text */
--text-base: 1rem; /* 16px - body text */
--text-lg: 1.125rem; /* 18px - card headers */
--text-xl: 1.5rem; /* 24px - section headers */
--text-2xl: 2rem; /* 32px - page titles */
--text-3xl: 3rem; /* 48px - hero numbers, scores */
--text-4xl: 4.5rem; /* 72px - massive point totals */
```

### Typography Usage Rules

- All numbers (scores, points, digits) MUST use `--font-display` with `font-variant-numeric: tabular-nums` for alignment
- Team names use `--font-body` with `text-transform: uppercase` for broadcast feel
- Labels use `--font-body` regular weight
- Headers use `--font-display` exclusively

---

## Layout & Composition

### Global Layout Structure

```
┌─────────────────────────────────────┐
│  HEADER (fixed)                     │
│  Logo │ Nav │ Last Updated          │
├─────────────────────────────────────┤
│                                     │
│                                     │
│      MAIN CONTENT AREA              │
│      (view-specific)                │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Header**:

- Fixed position, height: 80px
- Background: `rgba(10, 14, 22, 0.95)` with `backdrop-filter: blur(12px)`
- Logo: "MM SQUARES" in Chakra Petch, LED primary color, 24px
- Nav links with active indicator (LED active color underline, 3px thick)
- Last updated timestamp (if on Results page): small, right-aligned, pulsing green indicator

**Container**:

- Max width: 1400px
- Padding: 2rem horizontal, 1.5rem vertical
- Content should breathe—generous spacing between sections

### Grid System

Use CSS Grid with basketball court-inspired proportions:

- 12-column grid base
- Gap: 1.5rem (24px)
- Cards span 4 columns on desktop (3-up), 6 on tablet (2-up), 12 on mobile (full)

---

## Component Design Specifications

### 1. SquareCard Component

**Layout**:

```
┌────────────────────────────────┐
│  ┌──────────────┐              │
│  │ LABEL        │   [Edit] [×] │
│  └──────────────┘              │
│                                │
│     ┌─────┐    ┌─────┐        │
│     │ WIN │    │LOSE │        │
│     │  2  │  × │  7  │        │
│     └─────┘    └─────┘        │
│                                │
│     TOTAL: 325 PTS             │
└────────────────────────────────┘
```

**Visual Specifications**:

- Background: `--color-court-mid`
- Border: 2px solid `--color-court-line`
- Border radius: 12px
- Padding: 1.5rem
- Box shadow: `0 4px 20px rgba(0, 0, 0, 0.4)`
- Hover state: Border color shifts to `--color-led-primary`, subtle lift (translateY(-4px)), box shadow intensifies

**Label Section**:

- Background: `rgba(42, 61, 92, 0.5)`
- Padding: 0.5rem 0.75rem
- Border radius: 6px
- Font: Space Mono, 14px, uppercase
- Color: `--color-text-primary`

**Digit Displays**:

- Each digit in a square container: 80px × 80px
- Background: `--color-court-dark`
- Border: 3px solid `--color-led-primary`
- Border radius: 8px
- Digit font: Chakra Petch, 48px, bold
- Center aligned
- Color: `--color-led-secondary` (glowing yellow)
- Text shadow: `0 0 20px rgba(255, 214, 0, 0.6)` (glow effect)
- Space between WIN and LOSE boxes: 1rem with a × symbol in Space Mono

**Points Display** (on Results view):

- Font: Chakra Petch, 24px
- Color: `--color-led-active` if points > 0, else `--color-led-inactive`
- Text align: center
- Margin top: 1rem

**Edit/Delete Buttons**:

- Icon buttons (use lucide-vue-next icons)
- Size: 32px × 32px
- Background: transparent → `rgba(255, 61, 0, 0.2)` on hover
- Border radius: 6px
- Color: `--color-text-secondary` → `--color-led-primary` on hover
- Transition: all 200ms ease

**Animations**:

- On mount: Stagger fade-in + slide up (100ms delay between cards)
- On hover: Lift and glow border
- On delete: Scale down to 0 + fade out (300ms)
- On add: Scale up from 0.8 + fade in (400ms)

---

### 2. GameResult Component

**Layout**:

```
┌──────────────────────────────────────────┐
│  [ROUND OF 64]              +5 PTS       │
│                                          │
│  DUKE (82) vs UNC (74)                   │
│  Win: 2  Lose: 4                         │
│                                          │
│  ★ Matched: John's Square                │
└──────────────────────────────────────────┘
```

**Visual Specifications**:

- Background: `--color-court-mid`
- Border left: 4px solid (color varies by match state)
  - Matched: `--color-led-active` (green)
  - No match: `--color-court-line` (muted)
- Padding: 1rem 1.5rem
- Border radius: 8px
- Margin bottom: 1rem

**Round Badge**:

- Display: inline-block
- Background: `--gradient-score`
- Padding: 0.25rem 0.75rem
- Border radius: 20px (pill shape)
- Font: Space Mono, 11px, uppercase, bold
- Color: white
- Letter spacing: 0.05em

**Points Badge** (if matched):

- Float right
- Font: Chakra Petch, 20px, bold
- Color: `--color-led-active`
- Text shadow: `0 0 12px rgba(0, 255, 136, 0.5)`

**Team Score Display**:

- Font: Space Mono, 16px
- Winner team name: bold, `--color-winner`
- Loser team name: regular, `--color-text-secondary`
- Scores in parentheses: Chakra Petch

**Last Digits Line**:

- Font: Space Mono, 14px
- Color: `--color-text-secondary`
- Format: "Win: 2 Lose: 4"

**Matched Square Indicator**:

- Only visible if matched
- Icon: Star (★) in `--color-led-active`
- Font: Space Mono, 14px
- Background: `rgba(0, 255, 136, 0.1)`
- Padding: 0.5rem
- Border radius: 6px
- Margin top: 0.75rem

**Animations**:

- On results page load: Stagger fade-in (50ms delay between games)
- Matched games: Pulse animation on the left border (2s infinite)

---

### 3. Input Components

**Square Input Form** (on MySquares view):

```
┌────────────────────────────────┐
│  ADD NEW SQUARE                │
│                                │
│  Label: [_______________]      │
│                                │
│  Win Digit:  [0-9 dropdown]   │
│  Lose Digit: [0-9 dropdown]   │
│                                │
│           [+ ADD SQUARE]       │
└────────────────────────────────┘
```

**Visual Specifications**:

- Background: `rgba(42, 61, 92, 0.3)`
- Border: 2px dashed `--color-court-line`
- Border radius: 12px
- Padding: 2rem
- Margin top: 2rem

**Text Input**:

- Background: `--color-court-dark`
- Border: 2px solid `--color-court-line`
- Border radius: 8px
- Padding: 0.75rem 1rem
- Font: Space Mono, 16px
- Color: `--color-text-primary`
- Focus state: Border color → `--color-led-primary`, outline glow

**Select/Dropdown**:

- Same styling as text input
- Custom arrow icon (chevron down in LED primary color)
- Options: 0-9 displayed in Chakra Petch

**Add Button**:

- Background: `--gradient-score`
- Border: none
- Border radius: 8px
- Padding: 0.875rem 2rem
- Font: Chakra Petch, 16px, uppercase
- Color: white
- Cursor: pointer
- Hover: Scale 1.05, brightness 1.1
- Active: Scale 0.98
- Transition: all 200ms ease

---

### 4. Summary Statistics (Results View)

**Layout**:

```
┌────────────────────────────────────────┐
│                                        │
│        TOTAL POINTS EARNED             │
│                                        │
│              1,250                     │
│                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │ 5       │ │ 25      │ │ 160     │ │
│  │ Squares │ │ Matches │ │ Avg/Win │ │
│  └─────────┘ └─────────┘ └─────────┘ │
└────────────────────────────────────────┘
```

**Visual Specifications**:

- Background: `--gradient-court` with noise texture overlay
- Border: 3px solid `--color-led-primary`
- Border radius: 16px
- Padding: 3rem 2rem
- Text align: center
- Box shadow: `0 8px 32px rgba(255, 61, 0, 0.2)`
- Margin bottom: 3rem

**Main Total**:

- Font: Chakra Petch, 72px (--text-4xl), bold
- Color: `--color-led-secondary`
- Text shadow: `0 0 40px rgba(255, 214, 0, 0.7)` (strong glow)
- Animation: Count up on page load (use smooth number transitions)

**Stat Cards** (3 inline):

- Display: inline-block
- Width: ~30% each
- Padding: 1rem
- Border right: 1px solid `--color-court-line` (except last)

**Stat Values**:

- Font: Chakra Petch, 32px, bold
- Color: `--color-led-active`

**Stat Labels**:

- Font: Space Mono, 12px, uppercase
- Color: `--color-text-secondary`
- Letter spacing: 0.05em

---

## Motion & Animation System

### Global Animation Principles

- **Entrance**: Stagger + slide up + fade in
- **Exit**: Scale down + fade out
- **Hover**: Lift + glow
- **Interaction**: Snap, precise (no sluggish easing)
- **Live Updates**: Flash + pulse for new data

### Specific Animations

**Page Load Sequence** (Results View):

1. Summary stats: Fade in + scale from 0.95 (400ms)
2. Total number: Count up animation (800ms, ease-out)
3. Game results: Stagger fade-in, 50ms delay each (starting at 500ms)

**Page Load Sequence** (MySquares View):

1. Header text: Slide in from left (300ms)
2. Square cards: Stagger up + fade, 100ms delay each
3. Add form: Fade in last (600ms delay)

**Pulse Animation** (for matched games):

```css
@keyframes pulse-border {
  0%,
  100% {
    border-left-color: var(--color-led-active);
  }
  50% {
    border-left-color: rgba(0, 255, 136, 0.3);
  }
}

.game-matched {
  animation: pulse-border 2s ease-in-out infinite;
}
```

**Glow Animation** (for active elements):

```css
@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(255, 61, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 61, 0, 0.8);
  }
}

.button-primary:hover {
  animation: glow 1.5s ease-in-out infinite;
}
```

**Digit Flip** (when editing squares):

- Use CSS transforms to rotate Y-axis 180° and swap content mid-flip
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Confetti Burst** (optional, when high score is achieved):

- Use canvas-confetti library
- Trigger when total points cross certain thresholds (500, 1000, 2000)
- Colors: LED primary, secondary, active
- Duration: 2 seconds, heavy spread

---

## Backgrounds & Visual Details

### Noise Texture Overlay

Add subtle grain to prevent flat digital look:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}
```

### Court Line Pattern

Add subtle diagonal lines to large background areas (like summary stats):

```css
.stats-summary {
  background-image: linear-gradient(
    135deg,
    transparent 48%,
    rgba(255, 61, 0, 0.05) 49%,
    rgba(255, 61, 0, 0.05) 51%,
    transparent 52%
  );
  background-size: 40px 40px;
}
```

### Glowing Dividers

Replace standard `<hr>` with glowing gradient lines:

```css
.section-divider {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-led-primary) 50%,
    transparent 100%
  );
  margin: 3rem 0;
  box-shadow: 0 0 12px rgba(255, 61, 0, 0.5);
}
```

### Custom Cursor (optional enhancement):

- Crosshair cursor for interactive elements
- Change color on hover over clickable items

---

## Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px; /* Large phones */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Desktops */
--breakpoint-xl: 1400px; /* Large screens */
```

### Mobile Adjustments (<768px)

- Header: Shrink logo, stack nav vertically (hamburger menu optional)
- Square cards: Full width (12 columns)
- Digit displays: Reduce to 60px × 60px, font 36px
- Summary stats: Stack stat cards vertically
- Main total: Reduce to 48px (--text-3xl)
- Padding: Reduce to 1rem horizontal

### Tablet Adjustments (768px - 1024px)

- Square cards: 2-up (6 columns each)
- Keep most desktop styling, slightly reduced spacing

---

## Accessibility Considerations

While maintaining bold aesthetic:

- All interactive elements have 44px minimum touch target
- Focus states use same glow effect as hover (keyboard accessible)
- Color contrast meets WCAG AA for text (high contrast on dark bg)
- Announce score updates with `aria-live="polite"` regions
- All buttons have descriptive aria-labels
- Number displays use `aria-label` for screen readers (e.g., "Winning digit: 2")

---

## Technical Implementation Notes

### Tailwind Configuration

Extend Tailwind config with custom colors and animations:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "court-dark": "#0a0e16",
        "court-mid": "#1a2332",
        "court-line": "#2a3d5c",
        "led-primary": "#ff3d00",
        "led-secondary": "#ffd600",
        "led-active": "#00ff88",
        // ... etc
      },
      fontFamily: {
        display: ["Chakra Petch", "sans-serif"],
        body: ["Space Mono", "monospace"],
      },
      animation: {
        "pulse-border": "pulse-border 2s ease-in-out infinite",
        glow: "glow 1.5s ease-in-out infinite",
        "count-up": "count-up 800ms ease-out",
      },
      // ... keyframes definitions
    },
  },
};
```

### Vue Composition Patterns

- Use `TransitionGroup` for list animations (squares, games)
- Create `useCountUp` composable for number animations
- Create `useStaggerAnimation` composable for sequential entrance effects
- Use `watchEffect` to trigger animations on data changes

### Performance Optimizations

- Lazy load game results (virtual scrolling if >100 games)
- Use CSS containment for card components
- Debounce input handlers (300ms)
- Memoize computed scores and matches
- Use `v-memo` for static game result cards

---

## Component File Checklist

When implementing, create these files:

**Views**:

- `src/views/MySquares.vue` - Square management page
- `src/views/Results.vue` - Results and points summary

**Components**:

- `src/components/SquareCard.vue` - Individual square display
- `src/components/GameResult.vue` - Game result line item
- `src/components/StatsSummary.vue` - Top points summary section
- `src/components/AddSquareForm.vue` - New square input form
- `src/components/AppHeader.vue` - Fixed header with nav

**Composables**:

- `src/composables/useSquares.js` - localStorage management (per spec)
- `src/composables/useCountUp.js` - Number animation utility
- `src/composables/useStaggerAnimation.js` - List animation utility

**Styles**:

- `src/assets/animations.css` - Keyframe definitions
- `src/assets/base.css` - Global resets and CSS variables

---

## Final Notes for Implementation Agent

1. **Start with the color system and typography** - Set up CSS variables first, import fonts in `index.html` or main CSS
2. **Build components in order**: AppHeader → SquareCard → AddSquareForm → MySquares view → StatsSummary → GameResult → Results view
3. **Test animations as you go** - Each component should have smooth entrance/exit before moving to next
4. **Use placeholder data** initially - Stub `scores.json` with 10-15 games across different rounds for visual testing
5. **Mobile test early** - Verify responsive behavior on SquareCard before building other components
6. **Commit to the aesthetic** - Don't water down the bold choices. If something feels "too much," lean into it harder.

This design will make the app instantly recognizable and memorable—a true scoreboard experience that users will want to check compulsively during the tournament.
