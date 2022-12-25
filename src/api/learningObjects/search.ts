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

const searchLearningObjects = async (query: string) => {
  const response = await fetcher("get")<PaginationResponseProps>(
    `search-objects/?${query}`
  );

  return response;
};

export default searchLearningObjects;
