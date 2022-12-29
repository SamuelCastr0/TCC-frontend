<template>
  <LoadingPage v-if="user.isFetching" />
  <div v-else class="container">
    <div>
      <Header />
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "@/components/Header.vue";
import user from "@/store/user";
import { onMounted } from "vue";
import LoadingPage from "@/components/LoadingPage.vue";

onMounted(() => {
  if (user.isUserIn) user.retrieveUser();
});
</script>
<style scoped>
.container {
  box-sizing: border-box;
  background: #f0f0f0;
  width: 100%;
  padding: 0 6.25rem 0 6.25rem;
}
.wrapper {
  max-width: 67.5rem;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto 0 auto;
  padding-top: calc(4.5rem + 80px);
  padding-bottom: 4.5rem;
}
</style>
