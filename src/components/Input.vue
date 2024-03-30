<template>
  <div class="input-container">
    <label :for="name" class="label">{{ label }}</label>
    <div v-if="type === 'password'" class="password-input">
      <input
        @keydown.prevent.enter
        :name="name"
        :id="name"
        :value="inputValue"
        :type="isVisible ? 'text' : 'password'"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
      />
      <fa
        @click="isVisible = !isVisible"
        :icon="isVisible ? 'fa-eye-slash' : 'fa-eye'"
      />
    </div>
    <textarea
      v-else-if="type === 'textarea'"
      @keydown.prevent.enter
      :name="name"
      :id="name"
      :value="inputValue"
      :type="type"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="textarea"
    ></textarea>
    <input
      v-else
      @keydown.prevent.enter
      :name="name"
      :id="name"
      :value="inputValue"
      :type="type"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="input"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, toRef } from "vue";
import { useField } from "vee-validate";

const isVisible = ref(false);

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>
<style scoped>
.input {
  width: 100%;
  height: 3rem;
  border: 2px solid rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  padding: 1rem;
}
.textarea {
  width: 100%;
  resize: vertical;
  border: 2px solid rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  padding: 1rem;
}
.password-input {
  width: 100%;
  height: 3rem;
  border: 2px solid rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  display: flex;
  align-items: center;
}
.password-input input {
  height: calc(3rem - 4px);
  padding: 1rem;
  border-radius: 7px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  border: none;
}
.password-input svg {
  color: var(--purple-400);
  height: 1.1rem;
  padding: 1rem;
  cursor: pointer;
}
.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.error-message {
  font-size: 0.8rem;
  color: red;
  margin: 0;
}
</style>
