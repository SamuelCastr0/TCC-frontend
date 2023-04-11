import fetcher from "..";

export interface ObjectProgressionProps {
  learningObject: number;
  isCompleted: boolean;
}

const retrieveObjectsProgression = async (courseId: number) => {
  const response = await fetcher("get")<ObjectProgressionProps[]>(
    `course-objects-progression/${courseId}/`
  );

  return response;
};

export default retrieveObjectsProgression;
