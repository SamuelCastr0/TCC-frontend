<template>
  <li class="course">
    <div class="header">
      <input
        :style="{ width: `${title.length + 1}ch` }"
        v-model="title"
        v-on:keydown="
          ({ key }) => {
            if (key === 'Enter' && title.length) handleSave();
          }
        "
        valu
        type="text"
      />
      <button @click="handleFocus" class="btn">
        <fa icon="fa-pen-to-square" />
      </button>
    </div>
    <div class="footer">
      <ProgressBar :progress="course.progression * 100" />
      <div class="btn-group">
        <button @click="() => modalRetrieve.openModal(course)" class="btn">
          <fa icon="fa-eye" />
        </button>
        <button @click="() => modalDelete.openModal(course)" class="btn">
          <fa icon="fa-trash" />
        </button>
      </div>
    </div>
  </li>
</template>
<script setup lang="ts">
import { CourseProps } from "@/api/course/retrieve";
import changeName from "@/api/course/changeName";
import { modalDelete, modalRetrieve } from "@/store/coursesModals";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { ApiErrorProps } from "@/api";
import { AxiosError } from "axios";
import ProgressBar from "./ProgressBar.vue";

interface Props {
  course: CourseProps;
}

const props = defineProps<Props>();
const title = ref("");
const toast = useToast();

const handleFocus = ({ currentTarget }: Event) => {
  (currentTarget as HTMLInputElement).parentElement
    ?.querySelector("input")
    ?.focus();
};
const handleSave = async () => {
  try {
    await changeName(props.course.id, title.value);
    toast.success("Curso salvo com sucesso!");
  } catch (error) {
    toast.error(
      ((error as AxiosError).response?.data as ApiErrorProps).detail ||
        "Alguma coisa deu errado"
    );
  }
};

onMounted(() => {
  title.value = props.course.name;
});
</script>
<style scoped>
.course {
  position: relative;
  width: 100%;
  height: 14rem;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  border-radius: 1.5rem;
  padding: 2rem;
  padding-bottom: 1.5rem;
  color: black;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.header input {
  font-size: 1.5rem;
  font-weight: bold;
}
.header {
  display: flex;
}
.show-objects {
  border: none;
  background: none;
  padding: 1rem;
  color: var(--purple-400);
  display: flex;
  gap: 0.5rem;
  align-self: flex-end;
  margin-top: auto;
}
.footer {
  display: flex;
  flex-wrap: nowrap;
  margin-top: auto;
}
.progress-bar {
  width: 80%;
  background: #f0f0f0;
  border-radius: 2rem;
}
.btn-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  margin-left: auto;
}
.btn {
  color: var(--purple-400);
  background: none;
  border: none;
}
.btn svg {
  height: 1.25rem;
}
</style>
