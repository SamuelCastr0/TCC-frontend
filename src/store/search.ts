import { reactive } from "vue";

export interface SearchStoreProps {
  value: string;
}

const searchStore = reactive<SearchStoreProps>({
  value: "",
});

export default searchStore;
