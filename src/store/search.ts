import { reactive } from "vue";

export interface SearchProps {
  value: string;
}

const search = reactive<SearchProps>({
  value: "",
});

export default search;
