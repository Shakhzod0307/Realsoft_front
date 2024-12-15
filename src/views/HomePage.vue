<template>
  <div>
  <main>
    <Navbar :currentLanguage="currentLanguage"  @languageChange="handleLanguageChange"/>
  </main>
<!--    <h1>Current language {{currentLanguage}}</h1>-->
  <Service/>
  <Portfolio/>
  <Company/>
  <Statistika/>
  <Sector/>
  <Advantage/>
  <Form/>
  <TeamMember/>
  <Blog :currentLanguage="currentLanguage"/>
  <Partner/>
  <Footer/>
  <button
      v-if="showBackToNavbar"
      @click="scrollToNavbar"
      class="back-to-navbar-btn">
    <i class="fa-solid fa-angle-up"></i>
  </button>
  </div>
</template>
<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from "vue";
import TeamMember from "@/components/TeamMember.vue";
import Form from "@/components/Form.vue";
import Partner from "@/components/Partner.vue";
import Service from "@/components/Service.vue";
import Company from "@/components/Company.vue";
import Sector from "@/components/Sector.vue";
import Portfolio from "@/components/Portfolio.vue";
import Footer from "@/components/Footer.vue";
import Statistika from "@/components/Statistika.vue";
import Advantage from "@/components/Advantage.vue";
import Blog from "@/components/Blog.vue";
import Navbar from "@/components/Navbar.vue";
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const currentLanguage =ref(route.params.lang || 'en');

const handleLanguageChange = (lang) => {
  if (currentLanguage.value !== lang) {
    currentLanguage.value = lang;
    router.push({ path: `/${lang}` });
  }
};

const showBackToNavbar = ref(true);
const scrollToNavbar = () => {
  const navbar = document.querySelector("header");
  if (navbar) {
    navbar.scrollIntoView({ behavior: "smooth" });
  }
};
const handleScroll = () => {
  showBackToNavbar.value = window.scrollY > 200;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // if (!route.params.lang) {
  //   router.replace({ path: `/${currentLanguage.value}` });
  // }
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
watch(
    () => route.params.lang,
    (newLang) => {
      currentLanguage.value = newLang || 'en';
    },
    { immediate: true }
);
</script>

<style>
.back-to-navbar-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #1d519f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  z-index: 9999;
  opacity: 1;
}

.back-to-navbar-btn:hover {
  background-color: #007bfc;
}

.back-to-navbar-btn.show {
  opacity: 1;
  visibility: visible;
}

</style>