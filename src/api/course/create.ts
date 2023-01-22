import fetcher from "..";

export interface RequestProps {
  name: string;
  objects: Array<any>;
}

const create = async (data: RequestProps) => {
  const response = await fetcher("post")(`course/`, data);

  return response;
};

export default create;
