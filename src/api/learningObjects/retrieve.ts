import fetcher from "..";

export interface LearningObject {
  id: number;
  title: string;
  description: string;
  keywords: string;
  link: string;
  durationMin: number;
  language: string;
  isPublished: boolean;
}

export interface PaginationResponseProps {
  results: Array<LearningObject>;
  count: number;
  page: number;
  page_count: number;
}

const getLearningObjects = async (query: string) => {
  const response = await fetcher("get")<PaginationResponseProps>(
    `learning-objects/?${query}`
  );

  return response;
};

export default getLearningObjects;
