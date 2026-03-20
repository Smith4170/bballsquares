<template>
  <div class="game-result">
    <div class="round-badge">{{ game.round }}</div>
    <div class="teams">
      <div class="team">
        <span class="team-name">{{ game.winner.name }}</span>
        <span class="team-score">{{ game.winner.score }}</span>
      </div>
      <div class="team">
        <span class="team-name">{{ game.loser.name }}</span>
        <span class="team-score">{{ game.loser.score }}</span>
      </div>
    </div>
    <div class="digits">
      <span class="digit">{{ game.winner.score % 10 }}</span>
      <span class="digit">{{ game.loser.score % 10 }}</span>
    </div>
    <div
      v-if="matchedSquares.length"
      class="matches"
    >
      <p>Matched Squares:</p>
      <ul>
        <li
          v-for="square in matchedSquares"
          :key="square.id"
        >
          {{ square.label }} ({{ square.winDigit }}-{{ square.loseDigit }})
        </li>
      </ul>
    </div>
    <div
      v-else
      class="no-matches"
    >
      <p>No matches for this game.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  game: Object,
  matchedSquares: Array,
  pointsEarned: Number,
});
</script>

<style scoped>
.game-result {
  background-color: var(--color-court-line);
  border: 2px solid var(--color-led-inactive);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.round-badge {
  background: linear-gradient(
    90deg,
    var(--color-led-primary),
    var(--color-led-secondary)
  );
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-size: 1.25rem;
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
}

.teams {
  display: flex;
  justify-content: space-between;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-name {
  font-family: var(--font-body);
  color: var(--color-text-secondary);
}

.team-score {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-led-primary);
}

.digits {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.digit {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-led-active);
}

.matches {
  font-family: var(--font-body);
  color: var(--color-text-primary);
}

.no-matches {
  font-family: var(--font-body);
  color: var(--color-text-secondary);
  text-align: center;
}
</style>
