import fetcher from "..";

export interface LearningObject {
  id: number;
  name: string;
  isPublished: boolean;
}

export interface PaginationResponseProps {
  results: Array<LearningObject>;
  count: number;
  page: number;
  page_count: number;
}

const getLearningObjects = async (query: string) => {
  const { data, status } = await fetcher('get')<PaginationResponseProps>(`learning-objects/?${query}`)

  return {
    data,
    status,
  };
};

export default getLearningObjects;
