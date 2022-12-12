import fetcher from "..";
import type { LearningObject } from "./retrieve";

const publishLearningObject = async (id: number) => {
  const { data, status } = await fetcher('put')<LearningObject>(`toggle-publish/${id}/`);

  return {
    data,
    status,
  };
};

export default publishLearningObject;
