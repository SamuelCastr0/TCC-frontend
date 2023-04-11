import retrieve, { CourseProps, Paginated } from "@/api/course/retrieve";
import { reactive } from "vue";
import { stringifyQuery } from "vue-router";

const courseStore = reactive({
  data: {} as Paginated<CourseProps>,
  page: 1,
  search: "",
  async fetchCourses() {
    const query = { page: this.page, search: this.search };
    const queryStringfyed = stringifyQuery(query);
    const { data } = await retrieve(queryStringfyed);
    this.data = data;
  },
});

export { courseStore };
