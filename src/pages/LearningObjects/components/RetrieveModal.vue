<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { modalRetrieve } from "@/store/learningObjectsModals";
</script>
<template>
  <Modal
    v-model="modalRetrieve.isModalOpen"
    @close-modal="() => modalRetrieve.closeModal()"
    title="Visualizar dados"
    description="Metadados do Objeto de Aprendizagem"
  >
    <ul class="list">
      <li
        class="meta-data"
        v-for="data in Object.entries(modalRetrieve.data)"
        :key="data[0]"
      >
        <span>{{ data[0] }}:</span>
        <p>{{ data[1] }}</p>
      </li>
    </ul>
  </Modal>
</template>
<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.meta-data {
  display: flex;
  gap: 0.5rem;
}
.meta-data span {
  font-weight: 700;
}
</style>
