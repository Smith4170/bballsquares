<template>
  <div class="my-squares">
    <div
      v-if="squares.length === 0"
      class="empty-state"
    >
      <p>No squares yet. Add your first square below!</p>
    </div>
    <div
      v-else
      class="squares-grid"
    >
      <SquareCard
        v-for="square in squares"
        :key="square.id"
        :square="square"
        :editable="true"
        @edit="editSquare"
        @delete="deleteSquare"
      />
    </div>
    <AddSquareForm @add="addSquare" />
  </div>
</template>

<script setup>
import { useSquares } from "../composables/useSquares";
import SquareCard from "../components/SquareCard.vue";
import AddSquareForm from "../components/AddSquareForm.vue";

const { squares, addSquare, removeSquare, updateSquare } = useSquares();

function editSquare(id) {
  const newLabel = prompt("Enter new label:");
  if (newLabel) {
    updateSquare(id, { label: newLabel });
  }
}

function deleteSquare(id) {
  if (confirm("Are you sure you want to delete this square?")) {
    removeSquare(id);
  }
}
</script>

<style scoped>
.my-squares {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
}

.empty-state {
  text-align: center;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}

.squares-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
