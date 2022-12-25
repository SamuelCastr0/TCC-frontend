<template>
  <div class="container">
    <label :for="name">{{ label }}</label>
    <Field :name="name" as="select">
      <slot></slot>
    </Field>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
<script setup>
import { Field, useField } from "vee-validate";
import { toRef } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const name = toRef(props, "name");

const { errorMessage } = useField(name);
</script>
<style scoped>
.container {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  flex-direction: column;
}
select {
  width: 100%;
  height: 3rem;
  border: 2px solid rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
}
.error-message {
  font-size: 0.8rem;
  color: red;
  margin: 0;
}
</style>
