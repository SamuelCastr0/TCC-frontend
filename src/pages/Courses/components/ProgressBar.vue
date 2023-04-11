<script setup lang="ts">
import { computed } from "vue";

interface ProgressBarProps {
  progress: number;
}

const props = defineProps<ProgressBarProps>();
const style = computed(() => {
  return {
    width: `${props.progress}%`,
  };
});
</script>
<template>
  <div class="container">
    <div class="progress-bar" :style="style">
      <span class="info"> {{ progress }}% </span>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 1.5rem;
  width: 100%;
  background: #f0f0f0;
  border-radius: 2rem;
  margin-right: 1.5rem;
}
.progress-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: var(--bg);
  height: inherit;
  border-radius: 2rem;
  padding: 0 0.5rem;
  transition: width 1s ease-in-out;
}
.info {
  color: white;
  font-size: 0.875rem;
}
</style>
