<template>
  <div id="service" class="services">
    <p class="main-title" id="uslugi" ref="mainTitle">{{title}}</p>
    <p class="main-text" id="uslugi_text" ref="mainText" v-html="heading"></p>
    <div class="row">
      <div
          class="service"
          v-for="(service, index) in services"
          :key="index"
          :ref="(el) => (rowRefs[index] = el)"
      >
        <p class="number">0{{ index + 1 }}</p>
        <p class="title">{{ service.title }}</p>
        <p class="description">{{ service.text }}</p>
      </div>
    </div>
    <p class="portfolio-title"  id="portfolio-title" ref="portfolioTitle">{{portfoliotitle}}</p>
    <div class="portfolio-container" ref="portfolioContainer">
      <p class="portfolio-text" id="portfolio-text" v-html="portfolioHeading"></p>
      <p class="article">Все статьи<i class="fa-solid fa-angle-right"></i></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const services = ref([]);
const mainTitle = ref(null);
const mainText = ref(null);
const rowRefs = ref([]);
const portfolioTitle = ref(null);
const portfolioContainer = ref(null);
const title = ref("");
const heading = ref("");
const portfoliotitle = ref("");
const portfolioHeading = ref("");
const fetchText = async () => {
  try {
    const response = await axios.get('/get-texts');
    const texts = response.data.data.filter(text => text.type === 'service')[0];
    const portfolios = response.data.data.filter(portfolio => portfolio.type === 'portfolio')[0];
    title.value = texts.title;
    heading.value = texts.heading;
    portfoliotitle.value = portfolios.title;
    portfolioHeading.value = portfolios.heading;
    // console.log(texts);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
let observers = [];
const fetchServices = async () => {
  try {
    const response = await axios.get('/get-services');
    services.value = response.data.data.data;
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

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

onMounted(async () => {
  await fetchServices();
  await fetchText();
  if (mainTitle.value) {
    const titleObserver = createObserver(mainTitle.value, 'animate-title');
    titleObserver.observe(mainTitle.value);
    observers.push(titleObserver);
  }
  if (mainText.value) {
    const textObserver = createObserver(mainText.value, 'animate-text');
    textObserver.observe(mainText.value);
    observers.push(textObserver);
  }
  rowRefs.value.forEach((row) => {
    if (row) {
      const rowObserver = createObserver(row, 'animate-row');
      rowObserver.observe(row);
      observers.push(rowObserver);
    }
  });

  if (portfolioTitle.value) {
    const portfolioTitleObserver = createObserver(
        portfolioTitle.value,
        'animate-portfolio-title'
    );
    portfolioTitleObserver.observe(portfolioTitle.value);
    observers.push(portfolioTitleObserver);
  }

  if (portfolioContainer.value) {
    const portfolioContainerObserver = createObserver(
        portfolioContainer.value,
        'animate-container'
    );
    portfolioContainerObserver.observe(portfolioContainer.value);
    observers.push(portfolioContainerObserver);
  }
});

onUnmounted(() => {
  observers.forEach((observer) => observer.disconnect());
});
</script>



<style scoped>

.main-title,
::v-deep(.main-text),
.service,
.portfolio-title,
.portfolio-container {
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
}


.main-title {
  transform: translateX(-50px);
}

.animate-title {
  opacity: 1;
  transform: translateX(0);
}


::v-deep(.main-text) {
  transform: translateX(-50px);
}

.animate-text {
  opacity: 1;
  transform: translateX(0);
}


.service {
  transform: translateX(50px);
}

.animate-row {
  opacity: 1;
  transform: translateX(0);
}

.portfolio-title {
  opacity: 0;
  transform: translateX(100px);
}

.animate-portfolio-title {
  opacity: 1;
  transform: translateX(0);
}


.portfolio-container {
  opacity: 0;
  transform: translateY(100px);
}

.animate-container {
  opacity: 1;
  transform: translateY(0);
}


/*end of animations part */


.services{
  height: auto;
  width: 100%;
  padding: 70px;

}

.main-title{
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

.portfolio-title{
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
  margin: 100px 0 20px;
}

.main-text{
  color: #010B1B;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
::v-deep(.main-text span) {
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
  .portfolio-text{
  color: #010B1B;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
::v-deep(.portfolio-text span){
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
.number{
  color:#010B1B;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  width: 30px;
  transform: rotate(-90deg);
  border-left: 1px solid #025fff;
  padding-left: 15px;
}

.title{
  color: #007BFC;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  padding-top: 25px;
}
.description{
  color:#475262;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
}
.services .row{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 25px;
  padding-top: 30px;
}
.services .row .service{
  padding: 25px 0 ;
  color: #fff;
  text-align: start;
}
.portfolio-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.article{
  text-align: center;
  align-items: center;
  font-family: "Museo Sans Cyrl", Arial, sans-serif;
  color: #969FAD;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}
.article i{
  padding: 10px;
  margin-left: 10px;
  border: 1px solid;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
}
.article i:hover{
  background: #969ea5;
  color: #fff;
  transition: 0.3s ease-in-out;
}
@media (max-width:1024px ) {
  .portfolio-container{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-flow: dense;
    row-gap: 10px;
  }
  .article{
    text-align: start;
  }

}
@media (max-width: 768px) {
  .main-title,
  ::v-deep(.main-text),
  ::v-deep(.main-text span){
    font-size: 16px;
  }
}

@media (max-width: 480px){

  .services{
    padding: 20px 15px;
    align-items: start;
    text-align: start;
  }
  .article{
    text-align: start;
  }

}
</style>