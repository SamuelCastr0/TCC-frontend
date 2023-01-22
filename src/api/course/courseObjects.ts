import fetcher from "..";
import { LearningObject } from "../learningObjects/retrieve";

const getObjects = async (id: number) => {
  const response = await fetcher("get")<Array<LearningObject>>(
    `course-objects/${id}`
  );

  return response;
};

export default getObjects;
