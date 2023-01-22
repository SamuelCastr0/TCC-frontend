<template>
  <div class="container">
    <div class="search">
      <input
        id="search"
        v-model="search"
        v-on:input="handleSearch"
        type="text"
        placeholder="Procure por seu curso"
      />
      <fa icon="fa-magnifying-glass" />
    </div>
    <ul class="list">
      <Course
        v-for="course in courses?.results"
        :key="course.id"
        :course="course"
      />
    </ul>
    <Paginate
      style="align-self: center"
      v-if="courses"
      v-model="page"
      :page-count="courses.page_count"
      :page-range="3"
      :margin-pages="2"
      :click-handler="navigationCallback"
      :prev-text="'Anterior'"
      :next-text="'Próxima'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    />
  </div>
  <DeleteModal @update-list="fetchCourses" />
  <RetrieveModal @update-list="fetchCourses" />
</template>
<script lang="ts" setup>
import Paginate from "vuejs-paginate-next";
import retrieve, { CourseProps, Paginated } from "@/api/course/retrieve";
import { onMounted, ref } from "vue";
import Course from "./components/Course.vue";
import DeleteModal from "@/pages/Courses/components/DeleteModal.vue";
import RetrieveModal from "@/pages/Courses/components/RetrieveModal.vue";
import {
  LocationQueryRaw,
  onBeforeRouteUpdate,
  stringifyQuery,
  useRoute,
  useRouter,
} from "vue-router";
import debounce from "@/utils/debounce";

export interface QueryParamsProps extends LocationQueryRaw {
  page: number;
  search?: string;
}

const courses = ref<Paginated<CourseProps>>();
const page = ref<number>(1);
const search = ref<string>("");
const router = useRouter();
const route = useRoute();

const fetchCourses = async () => {
  const query = { page: page.value, search: search.value };
  const queryStringfyed = stringifyQuery(query);
  const { data } = await retrieve(queryStringfyed);
  courses.value = data;
};

const updateRoute = () => {
  const query: QueryParamsProps = {
    search: search.value,
    page: search.value ? 1 : page.value,
  };
  if (!search.value) delete query?.search;
  router.push({
    path: "courses",
    query,
    force: true,
  });
};

const debouncedSearch = debounce(updateRoute, 800);

const handleSearch = () => debouncedSearch();

const navigationCallback = (pageNum) => {
  page.value = Number(pageNum);
  updateRoute();
};

onMounted(async () => {
  search.value = route.query.search as any as string;
  page.value = Number(route.query.page || 1) as any as number;
  updateRoute();
});

onBeforeRouteUpdate(async () => {
  fetchCourses();
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
