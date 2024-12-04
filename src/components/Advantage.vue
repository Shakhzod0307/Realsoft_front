<template>
  <div id="advantage" class="advantage-section">
    <div class="advantage-header">
      <p class="advantage" id="advantage" ref="Title">преимущества</p>
      <p class="advantage-text" id="advantage-text" ref="Text">Почему <span>REALSOFT?</span></p>
    </div>
    <div class="advantage-grid">
      <div class="advantage-part" ref="Cards" v-for="(item, index) in advantages" :key="index">
        <img :src="item.image" alt="...">
        <p :id="`advantage-title-${index+1}`">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, nextTick} from "vue";
import axios from "axios";
const Title = ref(null);
const Text = ref(null);
const Cards = ref([]);
const advantages = ref([]);

let observers = [];
const GetAllAdvantages = async () => {
  try{
    const response = await axios.get('http://localhost:8000/api/get-advantages')
    advantages.value = response.data.data.data;
    // console.log(response.data.data.data)
  }catch (error) {
    console.error("Error fetching advantages:", error);
  }

}

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
  await nextTick();
  await GetAllAdvantages();
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
  if (Cards.value) {
    Cards.value.forEach((card) => {
      if (card) {
        const observerCard = createObserver(card, "animate-card");
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
.advantage-section {
  padding: 40px 90px;
  background-color: #f8f9fa;
  text-align: center;
}

.advantage-header {
  margin-bottom: 20px;
}

.advantage {
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
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(90px);
}
.advantage.animate-title{
  opacity: 1;
  transform: translateX(0);
}

.advantage-text {
  color: #555;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  padding-bottom: 10px;
  opacity: 0;
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;
  transform: translateX(90px);
}
.advantage-text.animate-text{
  opacity: 1;
  transform: translateX(0);
}

.advantage-text span{
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

.advantage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
}

.advantage-part {
  padding: 20px 0;
 /* border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;  */
  text-align: center;
  opacity: 0;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(-90px);
}
.advantage-part.animate-card{
  opacity: 1;
  transform: translateX(0);
}

.advantage-part img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.advantage-part p {
  font-size: 1rem;
  color: #444;
}
/*
.advantage-part:hover {
  transform: scale(1.05);
}
*/

@media (max-width: 768px) {
  .advantage,
  .advantage-text,
  .advantage-text span{
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .advantage,
  .advantage-text,
  .advantage-text span{
    font-size: 16px;
  }
}

</style>