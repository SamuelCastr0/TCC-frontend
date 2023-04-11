<template>
  <div class="container">
    <div class="search">
      <input
        id="search"
        v-model="courseStore.search"
        v-on:input="handleSearch"
        type="text"
        placeholder="Procure por seu curso"
      />
      <fa icon="fa-magnifying-glass" />
    </div>
    <ul class="list">
      <Course
        v-for="course in courseStore.data?.results"
        :key="course.id"
        :course="course"
      />
    </ul>
    <Pagination
      v-if="courseStore.data.results"
      :page="courseStore.page"
      :count="courseStore.data.page_count"
      :handler="navigationCallback"
    />
  </div>
  <DeleteModal @update-list="() => courseStore.fetchCourses()" />
  <RetrieveModal @update-list="() => courseStore.fetchCourses()" />
</template>
<script lang="ts" setup>
import Pagination from "@/components/Pagination.vue";
import { onMounted } from "vue";
import Course from "./components/Course.vue";
import DeleteModal from "@/pages/Courses/components/DeleteModal.vue";
import RetrieveModal from "@/pages/Courses/components/RetrieveModal.vue";
import {
  LocationQueryRaw,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";
import debounce from "@/utils/debounce";
import { courseStore } from "@/store/course";

export interface QueryParamsProps extends LocationQueryRaw {
  page: number;
  search?: string;
}

const router = useRouter();
const route = useRoute();

const updateRoute = () => {
  const query: QueryParamsProps = {
    search: courseStore.search,
    page: courseStore.search ? 1 : courseStore.page,
  };
  if (!courseStore.search) delete query?.search;
  router.push({
    path: "courses",
    query,
    force: true,
  });
};

const debouncedSearch = debounce(updateRoute, 800);

const handleSearch = () => debouncedSearch();

const navigationCallback = (pageNum) => {
  courseStore.page = Number(pageNum);
  updateRoute();
};

onMounted(async () => {
  courseStore.search = route.query.search as any as string;
  courseStore.page = Number(route.query.page || 1) as any as number;
  updateRoute();
});

onBeforeRouteUpdate(async () => {
  courseStore.fetchCourses();
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
h2 {
  font-size: 2rem;
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
</style>
