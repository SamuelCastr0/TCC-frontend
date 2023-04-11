import fetcher from "..";

export interface ObjectProgressionProps {
  learningObject: number;
  isCompleted: boolean;
}

const toogleObjectProgression = async (courseId: number, objectId: number) => {
  const response = await fetcher("post")(`course-toogle-object/`, {
    course: courseId,
    object: objectId,
  });

  return response;
};

export default toogleObjectProgression;
