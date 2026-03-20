<template>
  <header class="app-header">
    <nav class="container-main">
      <h1 class="text-led-primary font-display text-3xl">
        March Madness Squares
      </h1>
      <ul class="nav-links">
        <li>
          <router-link
            to="/"
            class="nav-link"
            >My Squares</router-link
          >
        </li>
        <li>
          <router-link
            to="/results"
            class="nav-link"
            >Results</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// No additional logic needed for now
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--color-court-mid);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.nav-link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 1rem;
}

.nav-link:hover {
  color: var(--color-led-primary);
}
</style>
