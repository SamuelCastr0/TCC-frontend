<template>
  <div class="auth-container">
    <div class="auth-wrapper">
      <h1 class="auth-title">Pesquise</h1>
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
.auth-container {
  background: var(--bg);
  min-height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-wrapper {
  background: white;
  width: 30rem;
  min-width: 18.75rem;
  padding: 2.5rem;
  margin: 2rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.auth-title {
  font-weight: 700;
  font-size: 3rem;
  text-transform: capitalize;
}
</style>
