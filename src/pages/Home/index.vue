<template>
  <div class="container">
    <h2 :class="route.query.search ? 'title hidden' : 'title'">
      Pesquise por <span id="search-terms"></span>
    </h2>
    <div :class="route.query.search ? 'search active' : 'search'">
      <input
        :disabled="loading ? true : false"
        v-model="searchStore.value"
        v-on:keypress="handleKeypress"
        id="search"
        type="text"
        placeholder="Pesquise por temas que deseje aprender"
      />
      <Loading
        v-if="loading"
        color="var(--purple-400)"
        style="padding-right: 1rem"
      />
      <fa v-else v-on:click="updateRoute" icon="fa-magnifying-glass" />
    </div>
    <ul class="objct-list" v-if="result && route.query.search">
      <Item v-for="item in result.results" :object="item" :key="item.id" />
    </ul>
    <Pagination
      v-if="result?.results && route.query.search"
      :page="page"
      :count="result.page_count"
      :handler="navigationCallback"
    />
  </div>
  <Cart />
</template>
<script lang="ts" setup>
import Pagination from "@/components/Pagination.vue";
import { onMounted, onUnmounted, ref } from "vue";
import {
  LocationQueryRaw,
  stringifyQuery,
  useRoute,
  useRouter,
} from "vue-router";
import TypeWriter from "@/animations/TypeWriter";
import searchLearningObjects, {
  PaginationResponseProps,
} from "@/api/learningObjects/search";
import searchStore from "@/store/search";
import Cart from "./components/Cart.vue";
import Item from "./components/Object.vue";
import Loading from "@/components/Loading.vue";

export interface QueryParamsProps extends LocationQueryRaw {
  page?: number;
  search?: string;
}

const router = useRouter();
const route = useRoute();
const page = ref<number>(1);
const loading = ref<boolean>(false);
const result = ref<PaginationResponseProps | null>();
const sentences = [
  "Desenvolvimento Web",
  "Front End",
  "Back End",
  "Redes de Computadores",
  "Banco de Dados",
];
const writer = new TypeWriter(sentences);

const animate = () => {
  const span = document.querySelector("#search-terms") as Element;

  writer.start(span);
};

const updateLearningObjects = async () => {
  loading.value = true;
  if (searchStore.value) {
    const query = { search: searchStore.value, page: page.value };
    const queryStringfyed = stringifyQuery(query);
    const { data } = await searchLearningObjects(queryStringfyed);
    result.value = data;
  } else {
    result.value = null;
  }
  loading.value = false;
};

const updateRoute = () => {
  if (searchStore.value) {
    const query: QueryParamsProps = {
      search: searchStore.value,
      page: page.value,
    };
    router.push({
      path: "/",
      query,
    });
    updateLearningObjects();
  }
};

const handleKeypress = ({ key }: KeyboardEvent) => {
  if (key === "Enter") updateRoute();
};

const navigationCallback = (pageNum) => {
  page.value = Number(pageNum);
  updateRoute();
};

const onPopstate = () => {
  const hasSearch = window.history.state.current !== "/";
  if (hasSearch) {
    searchStore.value = route.query.search as string;
    updateLearningObjects();
  } else {
    searchStore.value = "";
    result.value = null;
  }
};

onMounted(() => {
  searchStore.value = route.query.search as any as string;
  page.value = Number(route.query.page || 1) as any as number;
  updateLearningObjects();
  animate();
  window.addEventListener("popstate", onPopstate);
});

onUnmounted(() => {
  writer.stop();
  window.removeEventListener("popstate", onPopstate);
});
</script>
<style scoped>
.container {
  width: 100%;
  padding: 0 !important;
  display: flex;
  gap: 2.5rem;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.search {
  background: white;
  display: flex;
  width: 100%;
  max-width: 35rem;
  align-items: center;
  border: 1px rgba(0, 0, 0, 0.25) solid;
  border-radius: 28px;
  font-size: 1rem;
  color: black;
  margin: 7rem 0 4.5rem 0;
  transition: 0.3s;
}
.search.active {
  margin: 0 auto 0 auto;
}
.search input {
  width: 100%;
  border-radius: 28px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 3rem;
  padding: 0.5rem 0 0.5rem 1.5rem;
}
.search svg {
  padding: 1rem;
  padding-right: 1.5rem;
  border-top-right-radius: 28px;
  border-bottom-right-radius: 28px;
  cursor: pointer;
}
.objct-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.title {
  margin-top: 4rem;
  font-size: 2rem;
  text-align: center;
  transition: 0.3s;
}
.title span {
  background-image: var(--bg);
  border-right: 0.15em solid var(--purple-400);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
.title.hidden {
  margin-top: -2.5rem;
  font-size: 0;
}
</style>
