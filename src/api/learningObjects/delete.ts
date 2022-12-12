import fetcher from "..";
import session from '@/store/session';
import type { LearningObject } from "./retrieve";

const deleteLearningObject = async (id: number) => {
  const { data, status } = await fetcher('delete')<LearningObject>(`learning-objects/${id}/`);

  return {
    data,
    status,
  };
};

export default deleteLearningObject;
