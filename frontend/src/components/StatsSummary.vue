<template>
  <div class="stats-summary">
    <div class="stat-card">
      <p class="stat-label">Total Points</p>
      <p class="stat-value">{{ totalPoints }}</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Squares</p>
      <p class="stat-value">{{ squareCount }}</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Matches</p>
      <p class="stat-value">{{ matchCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  totalPoints: Number,
  squareCount: Number,
  matchCount: Number,
});
</script>

<style scoped>
.stats-summary {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--color-court-line);
  border-radius: 8px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-court-mid);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-family: var(--font-body);
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.stat-value {
  font-family: var(--font-display);
  color: var(--color-led-primary);
  font-size: 2rem;
}
</style>
