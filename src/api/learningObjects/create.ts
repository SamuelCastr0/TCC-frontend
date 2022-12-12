import fetcher from "..";
import session from '@/store/session';
import type { LearningObject } from "./retrieve";

const createLearningObject = async (objectData: LearningObject) => {
  const { data, status } = await fetcher('post')<LearningObject>(`learning-objects/`, objectData)

  return {
    data,
    status,
  };
};

export default createLearningObject;
