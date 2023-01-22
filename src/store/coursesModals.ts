import getObjects from "@/api/course/courseObjects";
import { CourseProps } from "@/api/course/retrieve";
import { LearningObject } from "@/api/learningObjects/retrieve";
import { reactive } from "vue";

const store = {
  data: {} as CourseProps,
  isModalOpen: false,
  closeModal() {
    this.isModalOpen = false;
  },
  openModal(course: CourseProps) {
    if (course) this.data = course;
    this.isModalOpen = true;
  },
};

const modalDelete = reactive({ ...store });
const modalRetrieve = reactive({
  ...store,
  objects: [] as Array<LearningObject>,
  async openModal(course: CourseProps) {
    if (course) this.data = course;
    this.isModalOpen = true;
    const { data } = await getObjects(course.id);
    this.objects = data;
  },
});

export { modalDelete, modalRetrieve };
