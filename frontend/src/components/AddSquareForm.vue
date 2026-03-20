<template>
  <form
    class="add-square-form"
    @submit.prevent="handleSubmit"
  >
    <input
      v-model="label"
      type="text"
      placeholder="Label"
      required
    />
    <select v-model.number="winDigit">
      <option
        v-for="n in 10"
        :key="n"
        :value="n - 1"
      >
        {{ n - 1 }}
      </option>
    </select>
    <select v-model.number="loseDigit">
      <option
        v-for="n in 10"
        :key="n"
        :value="n - 1"
      >
        {{ n - 1 }}
      </option>
    </select>
    <button type="submit">Add Square</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

defineEmits(["add"]);

const label = ref("");
const winDigit = ref(0);
const loseDigit = ref(0);

function handleSubmit() {
  if (label.value.trim()) {
    const square = {
      label: label.value,
      winDigit: winDigit.value,
      loseDigit: loseDigit.value,
    };
    label.value = "";
    winDigit.value = 0;
    loseDigit.value = 0;
    emit("add", square);
  }
}
</script>

<style scoped>
.add-square-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--color-court-line);
  padding: 1rem;
  border: 2px dashed var(--color-led-inactive);
  border-radius: 8px;
}

.add-square-form input,
.add-square-form select,
.add-square-form button {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid var(--color-court-mid);
  border-radius: 4px;
}

.add-square-form button {
  background-color: var(--color-led-primary);
  color: var(--color-text-primary);
  cursor: pointer;
}

.add-square-form button:hover {
  background-color: var(--color-led-secondary);
}
</style>
