<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import ObjectIndex from "./ObjectIndex.vue";
import { modalRetrieve } from "@/store/coursesModals";
import { watch, ref } from "vue";
import retrieveObjectsProgression, {
  ObjectProgressionProps,
} from "@/api/course/retrieveObjectsProgression";

const objectsProgression = ref<ObjectProgressionProps[]>([]);
watch(
  () => modalRetrieve.isModalOpen,
  async () => {
    if (modalRetrieve.isModalOpen) {
      const { data } = await retrieveObjectsProgression(modalRetrieve.data.id);
      objectsProgression.value = data;
    }
  }
);
</script>

<template>
  <Modal
    v-model="modalRetrieve.isModalOpen"
    @close-modal="() => modalRetrieve.closeModal()"
    :title="modalRetrieve.data.name"
    description="Visualize os objetos de aprendizagem abaixo"
  >
    <ul class="objects-list">
      <ObjectIndex
        v-for="object in modalRetrieve.objects"
        :key="object.id"
        :name="object.name"
        :id="object.id"
        :is-completed="
          objectsProgression.some(
            (progression) =>
              progression.learningObject === object.id &&
              progression.isCompleted
          )
        "
      />
    </ul>
    <button class="close-button" @click="() => modalRetrieve.closeModal()">
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
</style>
