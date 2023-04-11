import fetcher from "..";

export interface Paginated<Type> {
  results: Array<Type>;
  count: number;
  page: number;
  page_count: number;
}

export interface CourseProps {
  id: number;
  name: string;
  user: number;
  progression: number;
}

const retrieve = async (query: string) => {
  const response = await fetcher("get")<Paginated<CourseProps>>(
    `course/?${query}`
  );

  return response;
};

export default retrieve;
