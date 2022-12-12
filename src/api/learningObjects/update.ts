import api from "..";
import type { LearningObject } from "./retrieve";

const updateLearningObject = async (id: number, objectData: LearningObject) => {
  const { data, status } = await api('put')<LearningObject>(`learning-objects/${id}/`, objectData);

  return {
    data,
    status,
  };
};

export default updateLearningObject;
