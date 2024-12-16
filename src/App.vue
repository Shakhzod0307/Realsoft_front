<template>
  <div>
    <Spinner v-if="isLoading" />
    <HomePage/>
  </div>
</template>

<script setup>
import HomePage from "@/views/HomePage.vue";
import { ref, onMounted } from 'vue';
import Spinner from './components/Spinner.vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<style scoped>

</style>
