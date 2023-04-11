<script setup lang="ts">
import getLearningObjects from "@/api/learningObjects/retrieve";
import type { PaginationResponseProps } from "@/api/learningObjects/retrieve";
import debounce from "@/utils/debounce";
import { onMounted, ref } from "vue";
import {
  useRouter,
  useRoute,
  stringifyQuery,
  onBeforeRouteUpdate,
} from "vue-router";
import type { LocationQueryRaw } from "vue-router";
import {
  CreateModal,
  DeleteModal,
  RetrieveModal,
  UpdateModal,
  PublishButton,
} from "./components";
import Pagination from "@/components/Pagination.vue";
import {
  modalCreate,
  modalRetrieve,
  modalUpdate,
  modalDelete,
} from "@/store/learningObjectsModals";
import user from "@/store/user";

export interface QueryParamsProps extends LocationQueryRaw {
  page: number;
  search?: string;
}

const result = ref({} as PaginationResponseProps);
const search = ref<string>("");
const page = ref<number>(1);
const filter = ref<string>("");
const router = useRouter();
const route = useRoute();

const updateLearningObjects = async () => {
  const query = { search: search.value, page: page.value };
  if (filter.value) query["filter"] = filter.value;

  const queryStringfyed = stringifyQuery(query);
  const { data } = await getLearningObjects(queryStringfyed);
  result.value = data;
};

const updateRoute = () => {
  const query: QueryParamsProps = {
    search: search.value,
    page: search.value ? 1 : page.value,
    filter: filter.value,
  };
  if (!search.value) delete query?.search;
  if (!filter.value) delete query?.filter;
  router.push({
    path: "learning-objects",
    query,
    force: true,
  });
};

const debouncedSearch = debounce(updateRoute, 800);

const handleSearch = () => debouncedSearch();

const handleFilter = ({ target }: Event) => {
  filter.value = (target as any).value;
  updateRoute();
};

const navigationCallback = (pageNum) => {
  page.value = Number(pageNum);
  updateRoute();
};

onMounted(() => {
  search.value = route.query.search as any as string;
  filter.value = (route.query.filter as any as string) || "";
  page.value = Number(route.query.page || 1) as any as number;
  updateRoute();
});

onBeforeRouteUpdate(async () => {
  updateLearningObjects();
});
</script>
<template>
  <div class="crud-container">
    <div class="crud-wrapper">
      <div class="object-list-header">
        <div v-if="user.value?.is_superuser" class="filters">
          <div>
            <input
              @focus="handleFilter"
              name="radio-group"
              type="radio"
              id="default"
              value=""
              v-model="filter"
            />
            <label for="default">Sem filtro</label>
          </div>
          <div>
            <input
              @focus="handleFilter"
              name="radio-group"
              type="radio"
              id="published"
              value="published"
              v-model="filter"
            />
            <label for="published">Publicados</label>
          </div>
          <div>
            <input
              @focus="handleFilter"
              name="radio-group"
              type="radio"
              id="not-published"
              value="not-published"
              v-model="filter"
            />
            <label for="not-published">Não publicados</label>
          </div>
        </div>
        <div class="top-header">
          <div class="search">
            <input
              id="search"
              v-model="search"
              v-on:input="handleSearch"
              type="text"
              placeholder="Digite os metadados do objeto"
            />
            <fa icon="fa-magnifying-glass" />
          </div>
          <button @click="() => modalCreate.openModal()" class="btn-add">
            Adicionar
            <fa icon="fa-plus-circle" />
          </button>
        </div>
      </div>
      <ul class="object-list">
        <li class="object" v-for="item in result.results" :key="item.id">
          <div class="object-info">
            <h3 class="title">{{ item.name }}</h3>
            <p class="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley.
            </p>
          </div>
          <div class="object-footer">
            <PublishButton
              v-if="user.value?.is_superuser"
              @update-list="updateLearningObjects"
              :id="item.id"
              :is-published="item.isPublished"
            />
            <div class="btn-group">
              <button @click="() => modalRetrieve.openModal(item)" class="btn">
                <fa icon="fa-eye" />
              </button>
              <button
                v-if="user.value?.is_superuser"
                @click="() => modalUpdate.openModal(item)"
                class="btn"
              >
                <fa icon="fa-pen-to-square" />
              </button>
              <button
                v-if="user.value?.is_superuser"
                @click="() => modalDelete.openModal(item)"
                class="btn"
              >
                <fa icon="fa-trash" />
              </button>
            </div>
          </div>
        </li>
      </ul>
      <Pagination
        :page="page"
        :count="result.page_count"
        :handler="navigationCallback"
      />
    </div>
  </div>
  <CreateModal @update-list="updateLearningObjects" />
  <RetrieveModal />
  <UpdateModal @update-list="updateLearningObjects" />
  <DeleteModal @update-list="updateLearningObjects" />
</template>

<style scoped lang="css">
.crud-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.crud-wrapper {
  width: 100%;
  display: flex;
  gap: 2.5rem;
  flex-direction: column;
  align-items: center;
}
.object-list-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.top-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.search {
  background: white;
  border-radius: 14px;
  display: flex;
  width: 25rem;
  margin-right: 0.5rem;
  align-items: center;
  border: 1px rgba(0, 0, 0, 0.25) solid;
  border-radius: 14px;
  font-size: 1rem;
  color: black;
}
.search input {
  width: 100%;
  border-radius: 14px;
  height: 3rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
.search svg {
  padding-right: 1rem;
}
.btn {
  color: var(--purple-400);
  background: none;
  border: none;
}
.btn svg {
  height: 1.25rem;
}
.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--purple-400);
  height: 3rem;
  padding: 1rem;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  color: white;
  transition: 0.3s;
}
.btn-add:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.btn-add svg {
  height: 1.25rem;
}
.break {
  flex-basis: 100%;
  height: 0;
}
.filters {
  display: flex;
  gap: 1.5rem;
}
.filters div {
  display: flex;
  gap: 0.5rem;
}
.filters input,
.filters label {
  cursor: pointer;
}
.filters input {
  accent-color: var(--purple-400);
}
.object-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
}
.object {
  width: 100%;
  height: 14rem;
  background: white;
  display: flex;
  flex-direction: column;
  gap: auto;
  box-sizing: border-box;
  justify-content: space-between;
  border-radius: 1.5rem;
  padding: 2rem;
  padding-bottom: 1.5rem;
  color: black;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.object-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.object-footer {
  display: flex;
  align-items: center;
}
.btn-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  margin-left: auto;
}
.title {
  font-size: 2rem;
}
</style>
