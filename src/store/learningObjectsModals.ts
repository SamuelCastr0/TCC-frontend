import type { LearningObject } from "@/api/learningObjects/retrieve";
import { reactive } from "vue";

const store = {
  data: {} as LearningObject,
  isModalOpen: false,
  id: 0,
  closeModal() {
    this.id = 0;
    this.isModalOpen = false;
  },
  openModal(learningObject?: LearningObject) {
    if (learningObject) this.data = learningObject;
    this.isModalOpen = true;
  },
};

const modalCreate = reactive({ ...store });
const modalRetrieve = reactive({ ...store });
const modalUpdate = reactive({ ...store });
const modalDelete = reactive({ ...store });

export { modalRetrieve, modalUpdate, modalDelete, modalCreate };
