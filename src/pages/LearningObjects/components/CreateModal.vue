<script setup lang="ts">
import type { LearningObject } from "@/api/learningObjects/retrieve";
import createLearningObject from "@/api/learningObjects/create";
import Modal from "@/components/Modal.vue";
import { modalCreate } from "@/store/learningObjectsModals";
import * as yup from "yup";
import { Form } from "vee-validate";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import type { ApiErrorProps } from "@/api";

const emit = defineEmits(["updateList"]);
const toast = useToast();

const schema = yup.object({
  title: yup.string().required("Nome é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  keywords: yup.string().required("Palavras chaves são obrigatórias"),
  link: yup.string().url("Link inválido").required("Link é obrigatório"),
  durationMin: yup
    .number()
    .typeError("Duração é obrigatória")
    .positive("Duração precisa ser positiva")
    .integer("Duração precisa ser inteira")
    .required("Duração em minutos é obrigatória"),
  language: yup.string().required("Idioma é obrigatório"),
});

const onSubmit = async (values) => {
  try {
    await createLearningObject(values as any as LearningObject);
    emit("updateList");
    modalCreate.closeModal();
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
    v-model="modalCreate.isModalOpen"
    @close-modal="() => modalCreate.closeModal()"
    title="Adicionar Objeto"
    description="Insira os metadados pra criar um Objeto de aprendizagem"
  >
    <Form
      class="form"
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ meta, isSubmitting }"
    >
      <Input
        name="title"
        type="text"
        label="Título"
        placeholder="Nome do Objeto"
      />
      <Input
        name="description"
        type="textarea"
        label="Descrição"
        placeholder="Descrição do objeto..."
      />
      <Input
        name="keywords"
        type="text"
        label="Palavras chaves"
        placeholder="Palavras, Chave, Do Objeto"
      />
      <Input
        name="link"
        type="text"
        label="Link"
        placeholder="https://www.sitedoobjeto.com/algum-link"
      />
      <Input
        name="durationMin"
        type="number"
        min="1"
        label="Duração (min)"
        placeholder="7"
      />
      <Select name="language" label="Idioma">
        <option value="">Selecionar Idioma</option>
        <option selected value="PORTUGUESE">Português</option>
        <option value="ENGLISH">Inglês</option>
      </Select>
      <div class="button-group">
        <button class="close-button" @click="modalCreate.closeModal">
          Cancelar
        </button>
        <Button
          :disabled="!meta.valid || isSubmitting"
          :is-loading="isSubmitting"
          >Adicionar</Button
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
  gap: 1rem;
}
.button-group {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin-top: 0.5rem;
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
