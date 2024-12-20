<template>
  <div id="portfolio" class="portfolio-section">
    <div class="portfolio">
      <div class="portfolio-item" v-for="project in projects" :key="project.id">
        <img :src="`http://localhost:8000${project.image}`" alt="....">
        <div class="overlay">
          <p class="text-white">{{ project.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref,onMounted } from "vue";
const projects = ref([]);

const projectsData = async ()=>{
  try{
    const response =  await axios.get('/get-projects');
    projects.value = response.data.data;
    // console.log(response.data.data);
  }catch (error){
    console.log('error',error);
  }
}

onMounted(()=>{
    projectsData();
})

</script>

<style scoped>

.portfolio-section {
  padding: 40px 0;
}

.portfolio {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
}

@media (min-width: 768px) {
  .portfolio {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .portfolio {
    grid-template-columns: repeat(3, 1fr);
  }
}

.portfolio-item {
  position: relative;
  overflow: hidden;
}

.portfolio-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.portfolio-item:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .overlay {
  opacity: 1;
}

.text-white {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
}
</style>