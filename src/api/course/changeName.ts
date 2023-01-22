import fetcher from "..";

const changeName = async (id: number, name: string) => {
  const response = await fetcher("patch")(`course/${id}/`, { name });

  return response;
};

export default changeName;
