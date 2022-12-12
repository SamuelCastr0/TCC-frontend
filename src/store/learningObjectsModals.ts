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

const modalCreateStore = reactive({ ...store });
const modalRetrieveStore = reactive({ ...store });
const modalUpdateStore = reactive({ ...store });
const modalDeleteStore = reactive({ ...store });

export {
  modalRetrieveStore,
  modalUpdateStore,
  modalDeleteStore,
  modalCreateStore,
};
