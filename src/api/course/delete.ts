import fetcher from "..";

const deleteCourse = async (id: number) => {
  const response = await fetcher("delete")(`course/${id}/`);

  return response;
};

export default deleteCourse;
