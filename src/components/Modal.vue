<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
defineEmits(["closeModal"]);
</script>
<template>
  <div v-if="modelValue" class="container">
    <div class="wrapper">
      <div class="header">
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </div>
      <button @click="$emit('closeModal')" class="close-button">
        <fa icon="fa-xmark"></fa>
      </button>
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(128, 128, 128, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.wrapper {
  opacity: 1;
  margin: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 14px;
  min-width: 18.75rem;
  max-width: 31.25rem;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 2rem;
}
.header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.title {
  font-size: 2rem;
}
.description {
  font-size: 1rem;
}
.close-button {
  background: var(--purple-400);
  width: 2rem;
  height: 2rem;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  position: absolute;
  top: -12px;
  right: -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.close-button svg {
  height: 1.25rem;
}
</style>
