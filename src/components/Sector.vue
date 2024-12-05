<template>
  <div id="sector" class="sectors-section">
    <div>
      <p class="sector" id="sector_title" ref="Title">{{title}}</p>
      <p class="sector-text" id="sector_text" ref="Text" v-html="heading"></p>
    </div>
    <div class="sectors-row">
      <div
          class="sector-item"
          v-for="(item, index) in sectors"
          :key="index"
          ref="SectorCards"
      >
        <img :src="`http://localhost:8000${item.image}`" :alt="item.title" />
        <h4 :id="`sector-title-${index+1}`">{{ item.title }}</h4>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const Title = ref(null);
const Text = ref(null);
const title = ref("");
const heading = ref("");
const SectorCards = ref([]);
const sectors = ref([]);
let observers = [];
const getSectors = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/get-sectors");
    sectors.value = response.data.data.data;
  } catch (error) {
    console.error("Error fetching sectors:", error);
  }
};
const fetchText = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/get-texts');
    const texts = response.data.data.filter(text => text.type === 'sector')[0];
    title.value = texts.title;
    heading.value = texts.heading;
    // console.log(texts);
  } catch (error) {
    console.error(error);
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
  await getSectors();
  await fetchText();
  if (Title.value) {
    const observerTitle = createObserver(Title.value, "animate-title");
    observerTitle.observe(Title.value);
    observers.push(observerTitle);
  }

  if (Text.value) {
    const observerText = createObserver(Text.value, "animate-text");
    observerText.observe(Text.value);
    observers.push(observerText);
  }

  if (SectorCards.value) {
    SectorCards.value.forEach((card) => {
      if (card) {
        const observerCard = createObserver(card, "animate-sector-card");
        observerCard.observe(card);
        observers.push(observerCard);
      }
    });
  }
});


onUnmounted(() => {
  observers.forEach((observer) => observer.disconnect());
});
</script>

<style scoped>
.sectors-section {
  padding: 50px 90px;
  background-color: #f9fbfc;
  text-align: start;
}

.sector {
  text-transform: uppercase;
  color: #778191;
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  border: 1px solid #DFE4ED;
  background: #EFF3F9;
  backdrop-filter: blur(5px);
  margin-bottom: 20px;
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(90px);
}
.sector.animate-title{
  opacity: 1;
  transform: translateX(0);
}

.sector-text {
  color: black;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  padding-bottom: 10px;
  opacity: 0;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(90px);
}
.sector-text.animate-text{
  opacity: 1;
  transform: translateX(0);
}

::v-deep(.sector-text span) {
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

/* Grid Layout for Items */
.sectors-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 20px;
}

.sector-item {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: start;
  opacity: 0;
  transition: opacity 1s ease-out, transform 0.5s ease-out;
  transform: translateX(50px);
}
.sector-item.animate-sector-card{
  opacity: 1;
  transform: translateX(0);
}

.sector-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Icon Styling */
.sector-item img {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
  display: flex;
  padding: 13px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0px 0px 10px 0px rgba(5, 23, 42, 0.10);

}

/* Text Styling */
.sector-item h4 {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.sector-item p {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {

  .sector,
  .sector-text,
  .sector-text span{
    font-size: 16px;
  }

  .sectors-section{
    padding: 10px;
  }

  .sector-item h4 {
    font-size: 14px;
  }

  .sector-item p {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .sectors-section{
    padding: 20px 15px;
  }

}
</style>
