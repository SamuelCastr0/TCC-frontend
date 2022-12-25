<template>
  <Form
    class="form"
    @submit="handleSubmit"
    :validation-schema="schema"
    v-slot="{ meta, isSubmitting }"
  >
    <Input label="Nome*" name="name" type="text" placeholder="Nome Completo" />
    <Input
      label="Email*"
      name="email"
      type="email"
      placeholder="email@exemplo.com"
    />
    <Input
      label="Senha*"
      name="password"
      type="password"
      placeholder="suasenhasegura123"
    />
    <Input
      label="Confirmar senha*"
      name="confirmPassword"
      type="password"
      placeholder="suasenhasegura123"
    />
    <Input
      label="Lattes"
      name="lattes"
      type="text"
      placeholder="Url do seu Lattes"
    />
    <Input
      label="Google Scholar"
      name="googleScholar"
      type="text"
      placeholder="Url do seu Google Scholar"
    />
    <Input
      label="Research Gate"
      name="researchGate"
      type="text"
      placeholder="Url do seu Research Gate"
    />
    <Input
      label="Linkedin"
      name="linkedin"
      type="text"
      placeholder="Url do seu Linkedin"
    />
    <Input
      label="Orcid"
      name="orcid"
      type="text"
      placeholder="Url do seu Orcid"
    />
    <Input
      label="Github"
      name="github"
      type="text"
      placeholder="Url do seu Github"
    />
    <Input
      label="Curso*"
      name="course"
      type="text"
      placeholder="Curso que você faz parte"
    />
    <Select name="category" label="Categoria*">
      <option value="">Selecionar Categoria</option>
      <option selected value="GRADUATE">Aluno de Graduação</option>
      <option value="MASTERING">Aluno de Mestrado</option>
      <option value="PHD">Aluno de Doutorado</option>
      <option value="PROFESSOR">Professor</option>
    </Select>
    <Checkbox name="oia" label="Pertence ao OIA?" />
    <Button :disabled="!meta.valid || isSubmitting" :is-loading="isSubmitting"
      >Cadastrar</Button
    >
    <router-link class="link" to="/signin">Entrar</router-link>
  </Form>
</template>
<script setup lang="ts">
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import signIn from "@/api/auth/signIn";
import session from "@/store/session";
import { useRouter } from "vue-router";
import * as yup from "yup";
import create from "@/api/auth/create";
import { Form } from "vee-validate";
import { useToast } from "vue-toastification";
import type { AxiosError } from "axios";
import type { ApiErrorProps } from "@/api";
import Checkbox from "@/components/Checkbox.vue";
import Select from "@/components/Select.vue";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(8, "Precisa ter no mínimo 8 caracteres")
    .required("Senha é obrigatório"),
  confirmPassword: yup
    .string()
    .required("Confirmar senha é obrigatório")
    .oneOf([yup.ref("password")], "Senhas não são iguais"),
  lattes: yup.string().url("Url inválida"),
  googleScholar: yup.string().url("Url inválida"),
  researchGate: yup.string().url("Url inválida"),
  linkedin: yup.string().url("Url inválida"),
  orcid: yup.string().url("Url inválida"),
  github: yup.string().url("Url inválida"),
  course: yup.string().required("Curso é obrigatório"),
  category: yup.string().required("Categoria é obrigatória"),
  oia: yup.bool(),
});

const router = useRouter();
const toast = useToast();

const handleSubmit = async (values) => {
  try {
    await create({ ...values, oia: !!values.oia });
    const { data } = await signIn(values.email, values.password);
    session.setSession(data.access_token, data.refresh_token);
    router.push({ name: "LearningObjects" });
  } catch (error) {
    toast.error(
      ((error as AxiosError).response?.data as ApiErrorProps).detail ||
        "Alguma coisa deu errado"
    );
  }
};
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
.form button {
  margin-top: 1.5rem;
}
.link {
  font-size: 1rem;
  text-decoration: none;
  color: black;
}
.link:hover {
  text-decoration: underline;
}
</style>
