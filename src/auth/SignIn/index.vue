<template>
  <Form
    class="form"
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ meta, isSubmitting }"
  >
    <Input
      name="email"
      type="email"
      label="Email"
      placeholder="your@email.com"
    />
    <Input
      name="password"
      type="password"
      label="Senha"
      placeholder="suaSenhaSecreta123"
    />
    <Button :disabled="!meta.valid || isSubmitting" :is-loading="isSubmitting"
      >Entrar</Button
    >
    <GoogleLogin :callback="googleCallback" />
    <router-link class="link" to="/signup">Cadastrar</router-link>
  </Form>
</template>
<script setup lang="ts">
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import signIn from "@/api/auth/signIn";
import { useRouter } from "vue-router";
import type { AxiosError } from "axios";
import { useToast } from "vue-toastification";
import { Form } from "vee-validate";
import * as yup from "yup";
import type { ApiErrorProps } from "@/api/index";
import { decodeCredential } from "vue3-google-login";
import type { CallbackTypes } from "vue3-google-login";
import googleSignIn from "@/api/auth/googleSignIn";
import user from "@/store/user";
import session from "@/store/session";

const schema = yup.object({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "Precisa ter no mínimo 8 caracteres"),
});

const router = useRouter();
const toast = useToast();

const googleCallback: CallbackTypes.CredentialCallback = async (response) => {
  try {
    const { data } = await googleSignIn(response.credential);
    session.setSession(data.access_token, data.refresh_token);
    user.setSocialUser(decodeCredential(response.credential));
    router.push({ name: "Home" });
  } catch (error) {
    toast.error(
      ((error as AxiosError).response?.data as ApiErrorProps).detail ||
        "Alguma coisa deu errado"
    );
  }
};

async function onSubmit(values) {
  try {
    const { data } = await signIn(values.email, values.password);
    session.setSession(data.access_token, data.refresh_token);
    router.push({ name: "LearningObjects" });
  } catch (error) {
    toast.error(
      ((error as AxiosError).response?.data as ApiErrorProps).detail ||
        "Alguma coisa deu errado"
    );
  }
}
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}
.form button {
  margin-top: 1rem;
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
