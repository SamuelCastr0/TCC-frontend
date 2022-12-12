<template>
<button v-if="!isPublishing" 
    @click="() => handlePublish(id)"
    class="btn-publish">
    <span>{{isPublished ? 'Publicado' : 'Publicar'}}</span>
</button>
<Loading v-else color="#4b1aff" />
</template>
<script lang="ts" setup>
import type { ApiErrorProps } from '@/api';
import publishLearningObject from '@/api/learningObjects/publish';
import Loading from '@/components/Loading.vue';
import type { AxiosError } from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

defineProps({
    isPublished: {
        type: Boolean,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    }
})

const emit = defineEmits(["updateList"]);

const isPublishing = ref<boolean>(false);
const toast = useToast()

const handlePublish = async (id: number) => {
  try {
    isPublishing.value = true;
    await publishLearningObject(id);
    emit('updateList')
  } catch (error) {
    toast.error(((error as AxiosError).response?.data as ApiErrorProps).detail || 'Alguma coisa deu errado');
  } finally {
    isPublishing.value = false;
  }
};
</script>
<style scoped>
.btn-publish {
    background: transparent;
    color: var(--purple-400);
    font-size: 1rem;
    font-weight: bold;
    padding: .5rem;
    border: none;
    display: flex;
  }
</style>