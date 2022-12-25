<template>
  <label class="check-container" :for="name">
    {{ label }}
    <Field
      :id="name"
      :name="name"
      type="checkbox"
      :value="true"
      class="checkbox"
    />
    <span class="checkmark"></span>
  </label>
</template>
<script setup>
import { Field } from "vee-validate";
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
</script>
<style scoped>
.check-container {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  position: relative;
  padding-right: 25px;
  margin: auto 0 auto 0;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 16px;
  width: 16px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.check-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked ~ .checkmark {
  background-color: var(--purple-400);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.check-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.check-container .checkmark:after {
  left: 5px;
  top: 2px;
  width: 3px;
  height: 7px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
