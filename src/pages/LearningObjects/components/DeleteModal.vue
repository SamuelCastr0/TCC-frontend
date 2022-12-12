<script setup lang="ts">
import deleteLearningObject from "@/api/learningObjects/delete";
import Modal from "@/components/Modal.vue";
import { modalDeleteStore } from "@/store/learningObjectsModals";
import { Form } from "vee-validate";
import Button from "@/components/Button.vue";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import type { ApiErrorProps } from "@/api";

const emit = defineEmits(["updateList"]);
const toast = useToast();

const onSubmit = async () => {
  try {
    await deleteLearningObject(modalDeleteStore.data.id);
    emit("updateList");
    modalDeleteStore.closeModal();
  }  catch (error) {
    toast.error(((error as AxiosError).response?.data as ApiErrorProps).detail || 'Alguma coisa deu errado');
  }
};
</script>

<template>
  <Modal
    v-model="modalDeleteStore.isModalOpen"
    @close-modal="() => modalDeleteStore.closeModal()"
    title="Deletar dados"
    description="Tem creteza que deseja deletar esse Objeto?"
  >
    <Form class="button-group" @submit="onSubmit" v-slot="{ isSubmitting }">
      <button class="close-button" @click="modalDeleteStore.closeModal">Cancelar</button>
      <Button :is-loading="isSubmitting">Deletar</Button>
    </Form>
  </Modal>
</template>
<style scoped>
.button-group {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: .5rem;
}
.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  height: 3rem;
  padding: .5rem;
  width: 100%;
  border: 2px var(--purple-400) solid;
  border-radius: 14px;
  font-size: 1rem;
  color: var(--purple-400);
  transition: .3s;
}
</style>