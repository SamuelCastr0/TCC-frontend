import fetcher from "..";

export interface RequestProps {
  name: string;
  objects: Array<any>;
}

const createCourse = async (data: RequestProps) => {
  const response = await fetcher("post")(`course/`, data);

  return response;
};

export default createCourse;
