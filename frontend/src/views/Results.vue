<template>
  <div class="results-view">
    <StatsSummary
      :totalPoints="totalPoints"
      :squareCount="squares.length"
      :matchCount="matchCount"
    />

    <div
      v-if="games.length === 0"
      class="empty-state"
    >
      <p>No games available.</p>
    </div>

    <div
      v-else
      class="games-list"
    >
      <GameResult
        v-for="game in games"
        :key="game.id"
        :game="game"
        :matchedSquares="getMatchedSquares(game)"
        :pointsEarned="calculatePoints(game)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatsSummary from "../components/StatsSummary.vue";
import GameResult from "../components/GameResult.vue";
import { useSquares } from "../composables/useSquares";

const { squares } = useSquares();
const games = ref([]);
const totalPoints = ref(0);
const matchCount = ref(0);

async function fetchGames() {
  try {
    const response = await fetch("/scores.json");
    games.value = await response.json();
    calculateStats();
  } catch (error) {
    console.error("Failed to fetch games:", error);
  }
}

function calculateStats() {
  totalPoints.value = games.value.reduce(
    (sum, game) => sum + calculatePoints(game),
    0,
  );
  matchCount.value = games.value.reduce(
    (count, game) => count + getMatchedSquares(game).length,
    0,
  );
}

function calculatePoints(game) {
  const roundPoints = {
    "First Four": 30,
    "Round of 64": 5,
    "Round of 32": 25,
    "Sweet 16": 75,
    "Elite 8": 100,
    "Final Four": 160,
    Championship: 500,
  };
  const matchedSquares = getMatchedSquares(game);
  return matchedSquares.length * (roundPoints[game.round] || 0);
}

function getMatchedSquares(game) {
  const winDigit = game.winner.score % 10;
  const loseDigit = game.loser.score % 10;
  return squares.value.filter(
    (square) => square.winDigit === winDigit && square.loseDigit === loseDigit,
  );
}

onMounted(fetchGames);
</script>

<style scoped>
.results-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.empty-state {
  text-align: center;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}

.games-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
