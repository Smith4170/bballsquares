<template>
  <div
    class="square-card"
    :class="{ editable: editable }"
  >
    <div class="digits">
      <span class="digit">{{ square.winDigit }}</span>
      <span class="digit">{{ square.loseDigit }}</span>
    </div>
    <div class="label">{{ square.label }}</div>
    <div
      v-if="editable"
      class="actions"
    >
      <button @click="$emit('edit', square.id)">Edit</button>
      <button @click="$emit('delete', square.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  square: Object,
  editable: Boolean,
});

defineEmits(["edit", "delete"]);
</script>

<style scoped>
.square-card {
  background-color: var(--color-court-line);
  border: 2px solid var(--color-led-inactive);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition:
    transform 0.2s,
    border-color 0.2s;
}

.square-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-led-primary);
}

.digits {
  display: flex;
  gap: 0.5rem;
}

.digit {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-led-primary);
}

.label {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-primary);
}

.actions button {
  background: none;
  border: none;
  color: var(--color-led-primary);
  cursor: pointer;
}

.actions button:hover {
  color: var(--color-led-secondary);
}
</style>
