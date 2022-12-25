<template>
  <div>
    <div v-if="isOpen" class="list-container">
      <div v-on:click="() => (isOpen = false)" class="background"></div>
      <div class="list">
        <div class="header">
          <h3>Monte seu Curso</h3>
          <span>Araste os objetos para alterar a ordem</span>
        </div>
        <Draggable
          v-if="cartStore.value.length"
          v-model="cartStore.value"
          tag="transition-group"
          item-key="id"
        >
          <template v-slot:item="{ item }">
            <div
              v-if="item.id === cartStore.value[0].id"
              class="separator"
            ></div>
            <li :key="item.id">
              <div>
                <h4>{{ item.name }}</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley.
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
        <div v-if="cartStore.value.length" class="footer">
          <Button v-if="userStore.isUserIn">Salvar Curso</Button>
          <RouterLink v-else to="/signin">Entre para salvar o curso</RouterLink>
        </div>
      </div>
    </div>
    <button class="open" v-on:click="handleOpen">
      <span>{{ cartStore.value.length }}</span>
      <fa icon="fa-cart-shopping" />
    </button>
  </div>
</template>
<script setup lang="ts">
import Draggable from "vue3-draggable";
import { ref, onBeforeMount, watch } from "vue";
import cartStore from "@/store/cart";
import Button from "@/components/Button.vue";
import { LearningObject } from "@/api/learningObjects/search";
import userStore from "@/store/user";

const isOpen = ref<boolean>(false);

const handleOpen = (event: Event) => {
  event.stopPropagation();
  isOpen.value = true;
};

const handleDelete = ({ currentTarget }: Event, item: LearningObject) => {
  cartStore.remove(item);
  const itemList = (currentTarget as HTMLButtonElement).parentElement;
  const separator = itemList?.nextElementSibling;
  itemList?.remove();
  separator?.remove();
};

onBeforeMount(() => {
  cartStore.init();
});

watch(
  () => cartStore.value,
  () => cartStore.save()
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
.header h3 {
  font-size: 1.5rem;
  font-weight: 700;
}
.header span {
  font-size: 0.875rem;
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
