<template>
  <li class="object" :key="props.object.id">
    <h3 class="title">
      <a :href="props.object.link" target="_blank">{{ props.object.title }}</a>
    </h3>
    <p class="description">
      {{ props.object.description }}
    </p>
    <button
      v-if="cart.value.find((item) => item.id === props.object.id)"
      v-on:click="cart.remove(props.object)"
      class="btn"
    >
      Remover do carrinho
    </button>
    <button v-else v-on:click="cart.add(props.object)" class="btn">
      Adicionar ao carrinho
    </button>
  </li>
</template>
<script setup lang="ts">
import { LearningObject } from "@/api/learningObjects/retrieve";
import cart from "@/store/cart";

interface Props {
  object: LearningObject;
}

const props = defineProps<Props>();
</script>
<style scoped>
.object {
  position: relative;
  width: 100%;
  height: 14rem;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  border-radius: 1.5rem;
  padding: 2rem;
  padding-bottom: 1.5rem;
  color: black;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.title {
  font-size: 2rem;
}
.title a {
  color: black;
  text-decoration: none;
}
.title a:hover {
  color: var(--purple-400);
  text-decoration: underline;
}
.btn {
  background: transparent;
  color: var(--purple-400);
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem;
  border: none;
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
}
.description {
  height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
