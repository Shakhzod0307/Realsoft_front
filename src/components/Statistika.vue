<template>
  <div id="statistics" class="statistics-section">
    <div class="statistics-content">
      <div class="text-center">
        <p class="subheading" id="statistika" ref="Title">СТАТИСТИКА</p>
        <p class="heading" id="stat_text" ref="Heading">
          REALSOFT - ЭТО МИРОВОЙ <span class="highlight">ПОСТАВЩИК</span> ИТ-РЕШЕНИЙ
        </p>
        <p class="description" id="stat_description" ref="Description">
          RealSoft - это мировой поставщик ИТ-решений и услуг с производственными центрами в Узбекистане и филиалами в Великобритании, Соединенных Штатах, Малайзии и Объединенных Арабских Эмиратах. Наш экосистема услуг по технологиям от конечной разработки программного обеспечения до конечных услуг тестирования и обеспечения качества включает в себя:
        </p>
      </div>
      <div class="statistics-grid">
        <div
            v-for="(item, index) in statItems"
            :key="index"
            class="stat-item"
            ref="StatItems"
        >
          <img :src="`http://localhost:8000${item.image}`" :alt="`Icon ${index + 1}`" />
          <h4>{{ item.number }}</h4>
          <p>{{ item.title }}</p>
        </div>
      </div>
      <img :src="`http://localhost:8000${Image}`" alt="World Map" class="world-map" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
const Title = ref(null);
const Heading = ref(null);
const Description = ref(null);
const statItems = ref([]);
const Image = ref(null);
const fetchImages = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-images');
    const image = response.data.data.filter(img => img.type === 'statistic');
    Image.value = image.find(img =>img.id === 4 ).name;
    // console.log("Image:", Image.value);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
const fetchStatistics = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-statistics');
    statItems.value = response.data.data.data;
    // console.log(response.data.data.data);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

let observers = [];
const createObserver = (element, className) => {
  return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
          } else {
            entry.target.classList.remove(className);
          }
        });
      },
      { threshold: 0.1 }
  );
};

onMounted(() => {
  fetchImages();
  fetchStatistics();
  if (Title.value) {
    const observerTitle = createObserver(Title.value, 'animate-title');
    observerTitle.observe(Title.value);
    observers.push(observerTitle);
  }
  if (Heading.value) {
    const observerHeading = createObserver(Heading.value, 'animate-heading');
    observerHeading.observe(Heading.value);
    observers.push(observerHeading);
  }
  if (Description.value) {
    const observerDescription = createObserver(Description.value, 'animate-description');
    observerDescription.observe(Description.value);
    observers.push(observerDescription);
  }

  statItems.value.forEach((_, index) => {
    const item = document.querySelectorAll('.stat-item')[index];
    const observerStatItem = createObserver(item, 'animate-stat-item');
    observerStatItem.observe(item);
    observers.push(observerStatItem);
  });
});

onUnmounted(() => {
  observers.forEach((observer) => observer.disconnect());
});
</script>


<style scoped>
.statistics-section {
  background-color: #0a2553;
  color: #ffffff;
  padding: 50px 60px 0;
  text-align: center;
}

.text-center {
  margin-bottom: 2rem;
}

.subheading,
.heading,
.description{
  opacity: 1;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateY(50px);
}

.subheading.animate-title,
.heading.animate-heading,
.description.animate-description{
  opacity: 1;
  transform: translateY(0);
}

.subheading {
  text-transform: uppercase;
  color: #778191;
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  border: 1px solid #DFE4ED;
  background:  #EFF3F9;
  backdrop-filter: blur(5px);
  margin-bottom: 20px;
}

.heading {
  color: #fff;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  padding-bottom: 10px;
}

.heading span {
  color:  #007BFC;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  text-transform: uppercase;
}

.description {
  color: #BECADD;
  text-align: center;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 300;
  padding: 10px;
  line-height: 140%;
}

.statistics-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
}

.stat-item {
  padding: 1rem;
  text-align: center;
  opacity: 1;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(50px);
}

.stat-item.animate-stat-item{
  opacity: 1;
  transform: translateX(0);
}
/*
.stat-item:hover {
  transform: scale(1.05);
}
*/

.stat-item img {
  width: 50px;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
/*
.stat-item img:hover {
  transform: scale(1.1);
}*/

.stat-item h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-item p {
  font-size: 0.875rem;
  margin: 0;
}

.world-map {
  margin-top: 2rem;
  max-width: 100%;
}

@media (max-width: 1024px) {
  .statistics-grid{
    gap: 10px;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .heading {
    font-size: 2rem;
  }

  .subheading {
    font-size: 1.25rem;
  }

  .description {
    font-size: 0.875rem;
  }

  .stat-item {
    flex: 0 0 calc(100% / 2 - 1rem);
    max-width: 170px;
  }

  .stat-item h4 {
    font-size: 1.25rem;
  }
  .statistics-grid{
    gap: 0;
    padding: 0;
    text-align: start;
  }
}
@media (max-width: 480px) {
  .statistics-section{
    padding: 20px 10px;
  }
  .statistics-grid{
    gap: 10px;
  }
  .subheading,
  .heading,
  .heading span{
    font-size: 16px;
  }
}
</style>