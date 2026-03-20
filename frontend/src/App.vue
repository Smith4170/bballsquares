<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background-color: var(--color-court-dark);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: 4rem; /* Account for fixed header */
}
</style>
