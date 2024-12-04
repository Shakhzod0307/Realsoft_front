<template>
  <div>
  <main>
    <Navbar/>
  </main>
  <Service/>
  <Portfolio/>
  <Company/>
  <Statistika/>
  <Sector/>
  <Advantage/>
  <Form/>
  <TeamMember/>
  <Blog/>
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
import { ref, onMounted, onBeforeUnmount } from "vue";

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
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
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