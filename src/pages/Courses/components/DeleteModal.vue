<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { modalDelete } from "@/store/coursesModals";
import { Form } from "vee-validate";
import Button from "@/components/Button.vue";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import type { ApiErrorProps } from "@/api";
import deleteCourse from "@/api/course/delete";

const emit = defineEmits(["updateList"]);
const toast = useToast();

const onSubmit = async () => {
  try {
    await deleteCourse(modalDelete.data.id);
    emit("updateList");
    modalDelete.closeModal();
  } catch (error) {
    toast.error(
      ((error as AxiosError).response?.data as ApiErrorProps).detail ||
        "Alguma coisa deu errado"
    );
  }
};
</script>

<template>
  <Modal
    v-model="modalDelete.isModalOpen"
    @close-modal="() => modalDelete.closeModal()"
    title="Deletar curso"
    description="Tem creteza que deseja deletar esse Curso?"
  >
    <Form class="button-group" @submit="onSubmit" v-slot="{ isSubmitting }">
      <button class="close-button" @click="modalDelete.closeModal">
        Cancelar
      </button>
      <Button :is-loading="isSubmitting">Deletar</Button>
    </Form>
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
</style>
