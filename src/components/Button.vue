<template>
  <button type="submit" class="button">
    <slot v-if="!isLoading" />
    <Loading v-else />
  </button>
</template>
<script setup>
import Loading from "./Loading.vue";
defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--purple-400);
  height: 3rem;
  padding: 0.5rem;
  width: 100%;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  color: white;
  transition: 0.3s;
}
.button:hover:hover:not([disabled]) {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.button:disabled {
  cursor: not-allowed;
}
</style>
