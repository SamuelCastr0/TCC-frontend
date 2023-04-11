<script setup lang="ts">
import Paginate from "vuejs-paginate-next";

interface PaginateProps {
  count: number;
  handler: (pageNum: number) => void;
  page: any;
}

const props = defineProps<PaginateProps>();
</script>
<template>
  <Paginate
    v-if="props.count >= 2"
    :v-model="props.page"
    :page-count="props.count"
    :page-range="3"
    :margin-pages="2"
    :click-handler="props.handler"
    :prev-text="'Anterior'"
    :next-text="'Próxima'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  />
</template>
<style>
.pagination {
  height: 100%;
  display: flex;
  gap: 0.5rem;
}
.page-item {
  display: flex;
}
.page-item a {
  cursor: pointer;
  color: var(--purple-400);
  background: white;
  border-radius: 14px;
  border: 1px rgba(0, 0, 0, 0.25) solid;
  padding: 0.75rem;
}
.page-item.active a {
  color: white;
  background: var(--purple-400);
  cursor: default;
}
.page-item.disabled a {
  color: rgba(0, 0, 0, 0.25);
  cursor: default;
}
</style>
