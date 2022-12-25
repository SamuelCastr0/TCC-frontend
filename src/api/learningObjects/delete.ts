import fetcher from "..";
import type { LearningObject } from "./retrieve";

const deleteLearningObject = async (id: number) => {
  const response = await fetcher("delete")<LearningObject>(
    `learning-objects/${id}/`
  );

  return response;
};

export default deleteLearningObject;
