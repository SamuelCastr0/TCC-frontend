<script setup lang="ts">
import { computed } from "vue";
import toogleObjectProgression from "@/api/course/toogleObjectProgression";
import { modalRetrieve } from "@/store/coursesModals";
import { courseStore } from "@/store/course";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

const checked = computed(() => {
  return props.isCompleted;
});

const handleToogle = async () => {
  await toogleObjectProgression(modalRetrieve.data.id, props.id);
  await courseStore.fetchCourses();
};
</script>
<template>
  <li class="object">
    <label class="check-container">
      <input
        :id="props.title"
        :name="props.title"
        type="checkbox"
        :value="true"
        :checked="checked"
      />
      <span class="checkmark" v-on:click="() => handleToogle()"></span>
    </label>
    <a :href="props.link" target="_blank">{{ props.title }}</a>
  </li>
</template>
<style scoped>
.object {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.object a {
  margin-left: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: black;
}
.object a:hover {
  text-decoration: underline;
}
.check-container {
  display: flex;
  align-self: flex-start;
  justify-content: center;
  position: relative;
  margin: auto 0 auto 0;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: -8px;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: #eee;
}
.check-container:hover input ~ .checkmark {
  background-color: #ccc;
}
.check-container input:checked ~ .checkmark {
  background-color: var(--purple-400);
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.check-container input:checked ~ .checkmark:after {
  display: block;
}
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
