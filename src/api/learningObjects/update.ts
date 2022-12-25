import api from "..";
import type { LearningObject } from "./retrieve";

const updateLearningObject = async (id: number, objectData: LearningObject) => {
  const response = await api("put")<LearningObject>(
    `learning-objects/${id}/`,
    objectData
  );

  return response;
};

export default updateLearningObject;
