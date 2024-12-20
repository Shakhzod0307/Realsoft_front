<template>
  <div class="hero row container">
    <div class="hero-content">
      <h1 id="nav_title" class="anim">{{heading}}</h1>
      <div class="buttons anim">
        <button>
          <img src="/images/site-alt.svg" alt="Веб-разработка">
          Веб-разработка
        </button>
        <button>
          <img src="/images/mobile-notch.svg" alt="Мобильные приложения">
          Мобильные приложения
        </button>
        <button>
          <img src="/images/browser.svg" alt="Фронтенд веб-приложений">
          Фронтенд веб-приложений
        </button>
        <button>
          <img src="/images/system-cloud.svg" alt="Инжиниринг программных продуктов">
          Инжиниринг программных продуктов
        </button>
      </div>
      <p id="nav_text" class="text" v-html="text"></p>
    </div>
    <div class="hero-visuals row anim">
      <img class="circle" :src="`http://localhost:8000${Circle}`"  alt="Circle">
      <img class="mini-circle" :src="`http://localhost:8000${MiniCircle}`" alt="Mini Circle">
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const Circle = ref(null);
const MiniCircle = ref(null);
const heading = ref(null);
const text = ref(null);

const fetchImages = async () => {
  try {
    const response = await axios.get('/get-images');
    const image = response.data.data.data.filter(img => img.type === 'hero');
    Circle.value = image.find(img => img.id === 1).image;
    MiniCircle.value = image.find(img => img.id === 2).image;
    // console.log("Hero Image:", image);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
const fetchText = async () => {
  try {
    const response = await axios.get('/get-texts');
    const texts = response.data.data.filter(text => text.type === 'hero')[0];
    heading.value = texts.heading;
    text.value = texts.text;
    // console.log(texts);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

onMounted(() => {
  fetchImages();
  fetchText();
});
</script>


<style scoped>


.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: calc(100vh - 60px);
  background: linear-gradient(145deg, #1a73e8, #4285f4);
  color: white;
  padding: 40px 90px;
  gap: 32px;
}

.container {
  margin: 0 auto;
}

.hero-content {
  flex: 1 1 40%;
}

.hero h1 {
  font-size: clamp(40px, 5vw, 60px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  font-family: "Google Sans", sans-serif;
  color: #fff;
  text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
}

.hero p {
  font-size: 20px;
  margin-top: 20px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 350px;
}
.text{
  align-items: center;
  text-align: center;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

button img {
  width: 20px;
  height: 20px;
}

button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.hero-visuals {
  flex: 1 1 40%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-bottom: 100px;
}

.circle {
  width: 100%;
  max-width: 400px;
}

.mini-circle {
  width: 150px;
  position: absolute;
  top: calc(100% - 175px);
  right: 9%;
  transform: translate(-50%, 0);
}


img {
  max-width: 100%;
  height: auto;
}



/* Responsive Design */
@media (max-width: 1024px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    padding: 40px 50px 0 50px;
  }

  .hero-content,
  .hero-visuals {
    flex: 1 1 100%;
  }
  .hero-content{
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .hero h1 {
    font-size: 36px;
  }

  .buttons {
    justify-content: center;
  }
}

@media (max-width: 768px) {

  .circle {
    max-width: 300px;
  }

  .mini-circle {
    width: 120px;
    top: calc(100% - 150px);
    right: 10%;
  }

  button {
    font-size: 14px;
  }
  .hero-content{
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 20px;
  }
  .hero h1 {
    font-size: 28px;
  }
  .hero-visuals{
    padding-bottom:10px;
  }

  .buttons {
    gap: 8px;
  }
  .circle {
    max-width: 200px;
  }

  .mini-circle {
    width: 80px;
    top: calc(100% - 50px);
  }


}
</style>
