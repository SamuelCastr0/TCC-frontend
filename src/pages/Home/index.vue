<template>
  <div class="container">
      <div :class="store.result ? 'search active' : 'search'">
        <input
          v-model="store.search"
          v-on:keypress="handleKeypress"
          id="search"
          type="text"
          placeholder="Pesquise por temas que deseje aprender"
        >
        <fa v-on:click="updateRoute" icon="fa-magnifying-glass" />
      </div>
      <ul class="objct-list" v-if="store.result">
        <li class="object" v-for="object in store.result.results">
          <h3 class="title">{{ object.name }}</h3>
          <p class="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </li>
      </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { LocationQueryRaw, stringifyQuery, useRoute, useRouter } from 'vue-router';
import store from '@/store/search';

export interface QueryParamsProps extends LocationQueryRaw {
  page?: number;
  search?: string;
}

const router = useRouter();
const route = useRoute();

const updateLearningObjects = async () => {
  const query = { search: store.search, page: store.page }
  const queryStringfyed = stringifyQuery(query);
  store.fetchResult(queryStringfyed);
};

const updateRoute = () => {
  if(store.search) {
    const query: QueryParamsProps = {
      search: store.search,
      page: store.page
    };
    router.push({
      path: "/",
      query,
      force: true,
    });
    updateLearningObjects()
  }
};

const handleKeypress = ({key}: KeyboardEvent) => {
  if(key==='Enter') {
    updateRoute()
  }
};

const navigationCallback = (pageNum) => {
  store.page = Number(pageNum);
  updateRoute();
};

onMounted(() => {
  store.search = route.query.search as any as string;
  store.page = Number(route.query.page || 1) as any as number;
  updateRoute();
});

</script>
<style scoped>
.container {
  width: 100%;
  padding: 0!important;
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
  margin: 25vh auto 4.5rem auto;
  transition: .3s;
}
.search.active {
  margin: 0 auto 4.5rem auto;
}
.search input {
  width: 100%;
  border-radius: 28px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 3rem;
  padding: .5rem 0 .5rem 1.5rem;
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
.object {
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
.object h3 {
  font-size: 2rem;
}
.object p {

}
</style>