import fetcher from "..";
import type { LearningObject } from "./retrieve";

const publishLearningObject = async (id: number) => {
  const response = await fetcher("put")<LearningObject>(
    `toggle-publish/${id}/`
  );

  return response;
};

export default publishLearningObject;
