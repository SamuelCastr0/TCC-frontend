<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { modalRetrieve } from "@/store/coursesModals";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import type { ApiErrorProps } from "@/api";

const toast = useToast();
</script>

<template>
  <Modal
    v-model="modalRetrieve.isModalOpen"
    @close-modal="() => modalRetrieve.closeModal()"
    :title="modalRetrieve.data.name"
    description="Visualize os objetos de aprendizagem abaixo"
  >
    <ul class="objects-list">
      <li v-for="object in modalRetrieve.objects" :key="object.id">
        {{ object.name }}
      </li>
    </ul>
    <button class="close-button" @click="modalRetrieve.closeModal">
      Fechar
    </button>
  </Modal>
</template>
<style scoped>
.button-group {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
}
.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  height: 3rem;
  padding: 0.5rem;
  width: 100%;
  border: 2px var(--purple-400) solid;
  border-radius: 14px;
  font-size: 1rem;
  color: var(--purple-400);
  transition: 0.3s;
}
.objects-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.objects-list li {
  font-weight: bold;
  cursor: pointer;
}
.objects-list li:hover {
  text-decoration: underline;
}
</style>
