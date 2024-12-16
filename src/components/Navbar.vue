<template>
<div id="navbar" class="container">
  <header>
    <div class="navbar">
      <div class="logo">
        <img src="/images/homepage.svg" alt="logo">
      </div>
      <div class="vector">
        <img src="/images/Vector.svg" alt="Vector">
      </div>
      <ul class="links">
        <div class="dropdown">
          <button class="dropdown-toggle" @click="toggleDropdown1">
            Услуги<i class="fa-solid fa-caret-down"></i>
          </button>
          <ul class="dropdown-menu1" v-if="isOpen1">
            <li><a href="#">Веб-разработка</a></li><hr>
            <li><a href="#">Разработка мобильных приложени</a></li><hr>
            <li><a href="#">Разработка фронтенда</a></li><hr>
            <li><a href="#">Инжиниринг программных продуктов</a></li>
          </ul>
        </div>
        <li><a href="#">Технологии</a></li>
        <div class="dropdown">
          <button class="dropdown-toggle" @click="toggleDropdown2">
            Отрасли<i class="fa-solid fa-caret-down"></i>
          </button>
          <ul class="dropdown-menu1" v-if="isOpen2">
            <li><a href="#">Офис и продуктивность</a></li><hr>
            <li><a href="#">Банки и финансы</a></li><hr>
            <li><a href="#">Электронная коммерция и розничная торговля</a></li><hr>
            <li><a href="#">Логистика и цепочка поставок</a></li><hr>
            <li><a href="#">Образование</a></li><hr>
            <li><a href="#">Финтех</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <button class="dropdown-toggle" @click="toggleDropdown3">
            Компания<i class="fa-solid fa-caret-down"></i>
          </button>
          <ul class="dropdown-menu1" v-if="isOpen3">
            <li><a href="#">О нас</a></li><hr>
            <li><a href="#">Сотрудники</a></li><hr>
            <li><a href="#">Карьера</a></li>
          </ul>
        </div>
        <li><a href="#">Наши проекты</a></li>
        <li><a href="#">Блог</a></li>
      </ul>
      <div class="action_icons">
        <template v-if="!isSearchActive">
          <a
              v-for="(icon, index) in socialIcons"
              :key="index"
              :href="icon.url"
              target="_blank"
              :title="icon.name"
          >
            <i :class="icon.class"></i>
          </a>
          <div class="dropdown_lang">
            <button class="dropdown-toggle_lang" @click="toggleDropdown4">
              <img style="height: 16px;" src="/images/globe.svg" alt="Globe">
              {{ props.currentLanguage.toUpperCase() }}
              <img src="/images/angle-small-right.svg" alt="Angle">
            </button>
            <ul class="dropdown-menu1" v-if="isOpen4">
              <li><button  @click="changelanguage('en')"><img src="/images/en.svg" alt="En">English </button></li>
              <hr>
              <li><button @click="changelanguage('uz')"><img src="/images/uz.svg" alt="Uz">Uzbek</button></li><hr>
              <li><button  @click="changelanguage('ru')"><img src="/images/ru.svg" alt="Ru">Russian</button>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="search-container">
            <input
                type="text"
                placeholder="Search..."
                v-model="searchQuery"
                @input="performSearch"
                class="search-input"
            />
            <ul v-if="searchResults.length > 0" class="search-results">
              <li
                  v-for="(result, index) in searchResults"
                  :key="index"
                  @click="handleSearchResultClick(result.item)"
                  class="search-result-item"
              >
                {{ result.item.title }}
              </li>
            </ul>
            <ul v-if="searchQuery && searchResults.length === 0" style="padding: 10px" class="search-results">
              No results found.
            </ul>
            <a href="#" @click.prevent="toggleSearch" style="padding: 5px"><i class="fa-solid fa-xmark"></i></a>
          </div>
        </template>

        <a href="#" class="action_btn">Обсудить проект</a>
      </div>
      <div class="toggle-btn" @click="toggleDropdown">
        <i :class="dropdownIcon"></i>
      </div>
    </div>
    <div class="dropdown_menu" :class="{ open: isDropdownOpen }">
      <li><a href="#">Услуги</a></li>
      <li><a href="#">Технологии</a></li>
      <li><a href="#">Отрасли</a></li>
      <li><a href="#">Компания</a></li>
      <li><a href="#">Наши проекты</a></li>
      <li><a href="#">Блог</a></li>
      <li><a href="#" class="action_btn">Обсудить проект</a></li>
    </div>
  </header>
  <HeroSection/>
</div>
</template>

<script setup>
import {computed, ref, defineEmits, onMounted, watch} from "vue";
import Fuse from "fuse.js";
import HeroSection from "@/components/HeroSection.vue";
import {data} from "@/data/data.js";
import axios from "axios";
import { useRouter } from 'vue-router';
const router = useRouter();
const socialIcons = ref([]);
const isDropdownOpen = ref(false);
const isOpen1 = ref(false);
const isOpen2 = ref(false);
const isOpen3 = ref(false);
const isOpen4 = ref(false);
const isSearchActive = ref(false);
const searchQuery = ref("");
const searchResults = ref([]);
const emit = defineEmits(["languageChange"]);
const props = defineProps({
  currentLanguage: {
    type: String,
    required: true,
  },
});
const localLanguage = ref(props.currentLanguage);
const changelanguage = async (lang) => {
  if (localLanguage.value !== lang) {
    localLanguage.value = lang;
    emit("languageChange", lang);
    // console.log("Language changed to:", lang);
    await router.push({ path: `/${lang}` });
    isOpen4.value = false;
  }
};
const GetIcons = async ()=>{
  try{
    const response = await axios.get('http://localhost:8000/api/get-social-media')
    // console.log(response.data.data);
    socialIcons.value = response.data.data;
  }catch (error){
    console.log('error',error);
  }
}
const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
  searchQuery.value = '';
};
const fuseOptions = {
  keys: ["title", "text"],
  threshold: 0.3,
};
const fuse = new Fuse(data, fuseOptions);
const performSearch = () => {
  if (searchQuery.value.trim() === "") {
    searchResults.value = [];
    return;
  }
  searchResults.value = fuse.search(searchQuery.value);
};
const handleSearchResultClick = (item) => {
  if (item.url) {
    const section = document.querySelector(item.url);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = item.url;
    }
  } else {
    console.log("Item clicked:", item);
  }
  searchQuery.value = '';
  searchResults.value = [];
  // isSearchActive.value = false;
};
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const dropdownIcon = computed(() =>
    isDropdownOpen.value ? "fa-solid fa-xmark" : "fa-solid fa-bars"
);
const toggleDropdown1 = () => {
  isOpen1.value = !isOpen1.value;
  isOpen2.value=false;
  isOpen3.value=false;
  isOpen4.value=false;
};
const toggleDropdown2 = () => {
  isOpen2.value = !isOpen2.value;
  isOpen1.value=false;
  isOpen3.value=false;
  isOpen4.value=false;
};
const toggleDropdown3 = () => {
  isOpen3.value = !isOpen3.value;
  isOpen1.value=false;
  isOpen2.value=false;
  isOpen4.value=false;
};
const toggleDropdown4 = () => {
  isOpen4.value = !isOpen4.value;
  isOpen1.value=false;
  isOpen2.value=false;
  isOpen3.value=false;
};
watch(() => props.currentLanguage, (newLang) => {
  localLanguage.value = newLang;
});
onMounted(()=>{
  // GetSearchData();
  GetIcons();
})

</script>

<style scoped>
.search-container {
  position: relative;
  max-width: 600px;
  margin: auto;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-results {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.search-result-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.container{
  background-color:  #102C57;
  background-image: url("/images/Group19.png");
  background-size: cover;
  background-position: center;
}
.action_icons{
  display: flex;
  gap: 5px;
}
.action_icons i{
  color: #95C6F9;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #1d519f;

}
.action_icons i:hover{
  scale: 1.05;
}
.search-input {
  width: 350px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown_lang {
  position: relative;
  display: inline-block;
}
.dropdown-toggle_lang {
  color: white;
  border: none;
  cursor: pointer;
  font-size:16px;
  display: flex;
  gap: 5px;
  padding: 7px;
  border-radius: 10px;
  background-color: #1d519f;
}
.dropdown-toggle {
  background-color: unset;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 7px;
  font-size:16px;
}
.dropdown-toggle i{
  color: blue;
}

.dropdown-menu1 {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px 0;
  margin: 7px 0 0 0 ;
  z-index: 1000;
}

.dropdown-menu1 li {
  display: flex;
  padding: 10px 15px;
  gap: 10px;
}

.dropdown-menu1 li button {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  background: none;
}
.dropdown-menu1 li button:hover {
  color: blue;
}
.dropdown-menu1 li a {
  color: black;
}
.dropdown-menu1 li:hover {
  background-color: #f5f5f5;
}
.dropdown button:hover{
  color: orange;
  cursor: pointer;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
  color: #fff;
  font-size:16px;
}
a:hover{
  color: orange;
}
header{
  display: flex;
  padding: 0;
}

.navbar{
  width: 95%;
  height: 60px;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar .logo img{
  font-size: 1.5rem;
  justify-content: start;
}
.navbar .links{
  display: flex;
  gap: .75rem;
}

.navbar .toggle-btn{
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
}

.action_btn{
  background: linear-gradient(360deg, #006DE0 0%, #007BFC 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
  transition: scale 0.2s ease;
  margin-right: 5px;

}
.action_btn:hover{
  scale: 1.05;
  color: white;
}
.action_btn:active{
  scale: 0.95;
}

.dropdown_menu{
  display: none;
  height: 0;
  position: absolute;
  top: 60px;
  right: 2rem;
  width: 300px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  overflow: hidden;
  transition: height 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 99;
}
.dropdown_menu.open{
  height: auto;
}
.dropdown_menu li{
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown_menu .action_btn{
  display: flex;
  width: 100%;
  justify-content: center;
}
@media(max-width: 1285px){
  .navbar .links,
  .navbar .vector,
  .navbar .action_btn,
  .dropdown_lang
  {
    display: none;
  }
  .action_icons{
    gap: 20px;
  }
  .navbar .toggle-btn{
    display: block;
    padding: 0 30px;
  }
  .action_btn:hover{
    scale: 1.05;
    color: white;
  }
  .action_btn:active{
    scale: 0.95;
  }
  .dropdown_menu{
    display: block;
    margin-top: 20px;
    left: 2rem;
    width: unset;
    background: #1d519f;
  }
  .dropdown_menu li a:hover{
    color: orange;
  }

}

@media(max-width: 768px){
  .action_btn:hover{
    scale: 1.05;
    color: white;
  }
  .action_btn:active{
    scale: 0.95;
  }
  .dropdown_menu{
    left: 2rem;
    width: unset;
  }
  .action_icons{
    display: none;
  }
  .logo img{
    width: 200px;
  }
  .dropdown_menu  a:hover{
    color: orange;
    cursor: pointer;
  }
}


</style>
