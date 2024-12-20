<template>
  <div id="company" class="about-us-container">
    <div class="text-card" ref="Card">
      <h5 class="about-tag" id="about_tag">{{title}}</h5>
      <h2 class="about-title" id="about-title" v-html="heading"></h2>
      <p class="about-description" id="about-description1" v-html="text"></p>
      <button ref="Button" class="learn-more-btn">Подробнее</button>
    </div>
    <div class="image-section">
      <img :src="`http://localhost:8000${Image}`" alt="Company Team" />
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from "axios";
const Card = ref(null);
const Button = ref(null);
const Image = ref(null);
const title = ref("");
const heading = ref("");
const text = ref("");
const fetchImages = async () => {
  try {
    const response = await axios.get('/get-images');
    const image = response.data.data.data.filter(img => img.type === 'company');
    Image.value = image.find(img =>img.id === 3 ).image;
    // console.log("Image:", Image.name);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
const fetchText = async () => {
  try {
    const response = await axios.get('/get-texts');
    const texts = response.data.data.filter(text => text.type === 'company')[0];
    title.value = texts.title;
    heading.value = texts.heading;
    text.value = texts.text;
    // console.log(texts);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      Button.value.classList.add('animate-btn');
    } else {
      Button.value.classList.remove('animate-btn');
    }
  });
},
    {threshold: 0.1}
)
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      Card.value.classList.add('animate-card');
    } else {
      Card.value.classList.remove('animate-card');
    }
  });
},
    {threshold: 0.1}
)

onMounted(() => {
  fetchImages();
  fetchText();
  if (Button.value) {
    observer1.observe(Button.value);
  }
  if (Card.value) {
    observer2.observe(Card.value);
  }
})

onUnmounted(() => {
  if (Button.value) {
    observer1.unobserve(Button.value);
  }
  if (Card.value) {
    observer2.unobserve(Card.value);
  }
})

</script>

<style scoped>
  .about-us-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
    padding: 70px;
    background-color: #f9fbfc;
    position: relative;
    overflow: hidden;
  }

  .text-card {
    background: white;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    z-index: 2;
    position: relative;
    opacity: 0;
    transition: opacity 1s ease-out, transform 0.5s ease-out;
    transform: translateX(100px);
  }
  .text-card.animate-card{
    opacity: 1;
    transform: translateX(0);
  }

  .about-tag {
    font-size: 14px;
    font-weight: bold;
    color: #8a8a8a;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .about-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  ::v-deep(.about-title span ){
    color: #007bff;
  }

  ::v-deep(.about-description) {
    font-size: 16px;
    line-height: 1.6;
    color: #444;
    margin-bottom: 15px;
  }

  .learn-more-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    opacity: 0;
    transition: opacity 1s ease-out, transform 1s ease-out;
    transform: translateX(-100px);
  }
  .learn-more-btn.animate-btn{
    opacity: 1;
    transform: translateX(0);
  }

  .learn-more-btn:hover {
    background-color: #0056b3;
  }

  .image-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
    position: relative;
  }

  .image-section img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Styles */
  @media (max-width: 1280px) {
    .about-us-container {
      grid-template-columns: 1fr;
    }

    .text-card {
      margin: 0 auto 30px;
    }

    .image-section {
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .text-card,
    .learn-more-btn {
      text-align: center;
    }
    .about-us-container{
      padding: 20px 10px;
    }
  }
  </style>