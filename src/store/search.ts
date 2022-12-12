import { reactive } from "vue";
import searchLearningObjects, { PaginationResponseProps } from '../api/learningObjects/search';

export interface StoreProps {
  search: string,
  page: number,
  result: PaginationResponseProps | null,
  fetchResult: (query: string) => void,
  deleteStore: () => void
}

const store = reactive<StoreProps>({
  search: '',
  page: 1,
  result: null,
  async fetchResult (query: string) {
    const { data } = await searchLearningObjects(query);
    this.result = data;
  },
  deleteStore() {
    this.search = '';
    this.page = 1;
    this.result = null;
  }
});

export default store;