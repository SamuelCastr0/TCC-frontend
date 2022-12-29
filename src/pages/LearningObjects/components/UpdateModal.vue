<script setup lang="ts">
import type { LearningObject } from "@/api/learningObjects/retrieve";
import updateLearningObject from "@/api/learningObjects/update";
import Modal from "@/components/Modal.vue";
import { modalUpdate } from "@/store/learningObjectsModals";
import { Form } from "vee-validate";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import type { ApiErrorProps } from "@/api";

const emit = defineEmits(["updateList"]);
const toast = useToast();

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});

const onSubmit = async (values) => {
  try {
    await updateLearningObject(
      modalUpdate.data.id,
      values as any as LearningObject
    );
    emit("updateList");
    modalUpdate.closeModal();
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
    v-model="modalUpdate.isModalOpen"
    @close-modal="() => modalUpdate.closeModal()"
    title="Alterar dados"
    description="Altere os dados do Objeto"
  >
    <Form
      class="form"
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="modalUpdate.data"
      v-slot="{ meta, isSubmitting }"
    >
      <Input
        name="name"
        type="text"
        label="Nome"
        placeholder="Nome do Objeto"
      />
      <div class="button-group">
        <button class="close-button" @click="modalUpdate.closeModal">
          Cancelar
        </button>
        <Button
          :disabled="!meta.dirty || isSubmitting"
          :is-loading="isSubmitting"
          >Salvar</Button
        >
      </div>
    </Form>
  </Modal>
</template>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}
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
