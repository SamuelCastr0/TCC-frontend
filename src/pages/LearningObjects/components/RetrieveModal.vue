<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { modalRetrieveStore } from "@/store/learningObjectsModals";
</script>
<template>
  <Modal
    v-model="modalRetrieveStore.isModalOpen"
    @close-modal="() => modalRetrieveStore.closeModal()"
    title="Visualizar dados"
    description="Metadados do Objeto de Aprendizagem"
    >
    <ul class="list">
      <li class="meta-data" v-for="metaData in Object.entries(modalRetrieveStore.data)">
        <span>{{metaData[0]}}:</span>
        <p>{{metaData[1]}}</p>
      </li>
    </ul>
  </Modal
  >
</template>
<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.meta-data {
  display: flex;
  gap: .5rem;
}
.meta-data span {
  font-weight: 700;
}
</style>