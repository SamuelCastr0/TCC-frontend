import fetcher from "..";
import type { LearningObject } from "./retrieve";

const createLearningObject = async (objectData: LearningObject) => {
  const response = await fetcher("post")<LearningObject>(
    `learning-objects/`,
    objectData
  );

  return response;
};

export default createLearningObject;
