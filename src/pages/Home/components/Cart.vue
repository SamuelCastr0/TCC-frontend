<template>
  <div>
    <div v-if="isOpen" class="list-container">
      <div v-on:click="() => (isOpen = false)" class="background"></div>
      <div class="list">
        <div class="header">
          <div>
            <input
              type="text"
              :style="{ width: `${name.length + 1}ch` }"
              v-model="name"
            />
            <fa icon="fa-pen-to-square" v-on:click="handleFocus" />
          </div>
          <span>Araste os objetos para alterar a ordem</span>
        </div>
        <Draggable
          v-if="cart.value.length"
          v-model="cart.value"
          tag="transition-group"
          item-key="id"
        >
          <template v-slot:item="{ item }">
            <div v-if="item.id === cart.value[0].id" class="separator"></div>
            <li :key="item.id">
              <div>
                <h4>{{ item.title }}</h4>
                <p>
                  {{ item.description }}
                </p>
              </div>
              <fa
                v-on:click="(event) => handleDelete(event, item)"
                icon="fa-trash"
              />
            </li>
            <div class="separator"></div>
          </template>
        </Draggable>
        <h4 class="empty" v-else>Adicione objetos para criar um curso</h4>
        <div v-if="cart.value.length" class="footer">
          <Button v-if="user.isUserIn" v-on:click="handleCreate"
            >Salvar Curso</Button
          >
          <RouterLink v-else to="/signin">Entre para salvar o curso</RouterLink>
        </div>
      </div>
    </div>
    <button class="open" v-on:click="handleOpen">
      <span>{{ cart.value.length }}</span>
      <fa icon="fa-cart-shopping" />
    </button>
  </div>
</template>
<script setup lang="ts">
import Draggable from "vue3-draggable";
import { ref, onBeforeMount, watch } from "vue";
import cart from "@/store/cart";
import Button from "@/components/Button.vue";
import user from "@/store/user";
import createCourse from "@/api/course/create";
import { useToast } from "vue-toastification";
import { ApiErrorProps } from "@/api";
import { AxiosError } from "axios";
import { RouterLink } from "vue-router";
import { LearningObject } from "@/api/learningObjects/retrieve";

const isOpen = ref<boolean>(false);
const name = ref<string>("Nome do curso");
const toast = useToast();

const handleCreate = () => {
  try {
    createCourse({ name: name.value, objects: cart.value });
    cart.clear();
    name.value = "Nome do curso";
    toast.success("Curso salvo com sucesso!");
  } catch (error) {
    toast.error(
      ((error as AxiosError).response?.data as ApiErrorProps).detail ||
        "Alguma coisa deu errado"
    );
  }
};

const handleFocus = ({ currentTarget }: Event) => {
  (currentTarget as HTMLInputElement).parentElement
    ?.querySelector("input")
    ?.focus();
};

const handleOpen = (event: Event) => {
  event.stopPropagation();
  isOpen.value = true;
};

const handleDelete = ({ currentTarget }: Event, item: LearningObject) => {
  cart.remove(item);
  const itemList = (currentTarget as HTMLButtonElement).parentElement;
  const separator = itemList?.nextElementSibling;
  itemList?.remove();
  separator?.remove();
};

onBeforeMount(() => {
  cart.init();
});

watch(
  () => cart.value,
  () => cart.save()
);
</script>
<style scoped>
.open {
  width: 3rem;
  height: 3rem;
  background: var(--purple-400);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
}
.open svg {
  height: 1rem;
}
.empty {
  width: 100%;
  margin: auto;
  font-weight: 400 !important;
  text-align: center;
}
.open span {
  position: absolute;
  top: 0rem;
  right: 0rem;
  background-color: white;
  color: var(--purple-400);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: black;
  opacity: 0.8;
  z-index: 100;
}
.header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.header input {
  font-size: 1.5rem;
  font-weight: 700;
}
.header span {
  font-size: 0.875rem;
}
.header div {
  display: flex;
  flex-direction: row !important;
  justify-content: left !important;
  align-items: center;
  gap: 0.5rem;
}
.list {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1.5rem;
  width: 30rem;
  height: 100vh;
  background: white;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1000;
  animation: slidein 0.3s;
  overflow: auto;
  margin-bottom: auto;
}
.list li {
  width: 100%;
  height: 3.5rem;
  box-sizing: border-box;
  list-style: none;
  color: black;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.list div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list h4 {
  font-weight: 700;
}
.list p {
  font-size: 0.875rem;
  line-height: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 27rem;
}
.list svg {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  color: var(--purple-400);
}
.header svg {
  position: initial;
}
.separator {
  height: 1px;
  background-color: var(--purple-400);
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.footer {
  margin-top: auto;
}
.footer a {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--purple-400);
  height: 3rem;
  padding: 0.5rem;
  width: 100%;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  color: white;
  transition: 0.3s;
  text-decoration: none;
}
.footer a:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
@keyframes slidein {
  from {
    right: -30rem;
  }

  to {
    margin-left: 0;
  }
}
</style>
