<template>
  <div id="partner" class="partner-section">
    <div class="partner-header">
      <p class="title" ref="Title">{{title}}</p>
      <p class="text" ref="Text" v-html="heading"></p>
    </div>
    <div class="partner-grid"  >
      <img ref="Partners" v-for="(partner, index) in images"
           :key="index"
           :src="`http://localhost:8000${partner.image}`" alt="...">
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted,onUnmounted} from "vue";
import axios from "axios";
const Title = ref(null);
const Text = ref(null);
const title = ref("");
const heading = ref("");
const Partners = ref([]);
const images = ref([]);

const GetAllPartners = async () => {
  try{
    const response = await axios.get('/get-partners')
    images.value= response.data.data;
    // console.log(response.data.data);
  }catch (error) {
    console.log("Error fetching partners:",error)
  }
}

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
      }
  )
}
const fetchText = async () => {
  try {
    const response = await axios.get('/get-texts');
    const texts = response.data.data.filter(text => text.type === 'partner')[0];
    title.value = texts.title;
    heading.value = texts.heading;
    // console.log(texts);
  } catch (error) {
    console.error(error);
  }
};

onMounted(()=>{
  GetAllPartners();
  fetchText();
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
  if (images.value) {
    images.value.forEach((image) => {
      if (image) {
        const observerPartner = createObserver(image, "animate-partners");
        observerPartner.observe(image);
        observers.push(observerPartner);
      }
    })
  }
})

onUnmounted(()=>{
  observers.forEach((observer) => observer.disconnect());
})

</script>

<style scoped>
.partner-section {
  padding: 60px 90px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.partner-header {
  text-align: start;
}

.title {
  text-transform: uppercase;
  color: #778191;
  display: inline-flex;
  padding: 6px 12px;
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
.title.animate-title{
  opacity: 1;
  transform: translateX(0);
}

.text {
  color: #010B1B;
  font-family: "Museo Sans Cyrl",Arial, sans-serif;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;
  transform: translateX(90px);
}
.text.animate-text{
  opacity: 1;
  transform: translateX(0);
}

::v-deep(.text span) {
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

/* Partner Grid Styling */
.partner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  align-items: center;
}

.partner-grid img {
  width: 250px;
  max-height: 100px;
  object-fit: contain;
  /*opacity: 1;
  transition: opacity 1s ease-out, transform 1s ease-out;
  transform: translateX(-90px);*/
}
.partner-grid img.animate-partners{
  opacity: 1;
  transform: translateX(0);
}
/*
.partner-grid img:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

 */

/* Responsive Design */
@media (max-width: 768px) {
  .partner-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
  .partner-grid img {
    width: 80px;
  }
  .title,
  .text,
  ::v-deep(.text span){
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .partner-section {
    padding: 20px;
  }
  .title,
  .text,
  ::v-deep(.text span){
    font-size: 16px;
  }
  .partner-grid img {
    width: 90px;
  }
}
</style>
